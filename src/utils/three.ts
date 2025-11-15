import {
  AnimationClip,
  AnimationMixer,
  Audio,
  BufferGeometry,
  Float32BufferAttribute,
  LinearSRGBColorSpace,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Object3DEventMap,
  ObjectLoader,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
} from 'three';
import { ModelLite } from '../webworkers/types';

// Dispose

export const disposeTexture = (texture?: Texture): void => {
  texture?.dispose();
};

export const disposeMaterial = (material?: Material | Material[]): void => {
  if (!material) return;

  if (Array.isArray(material)) {
    material.forEach((mat: Material) => disposeMaterial(mat));
  } else {
    // Dispose Textures
    for (const i in material) {
      const prop = material[i];
      if (prop !== null) {
        if (prop instanceof Texture) {
          disposeTexture(prop as Texture);
        }
      }
    }

    // Shader Material
    if (material['isShaderMaterial'] === true) {
      const shaderMat = material as ShaderMaterial;
      for (const i in shaderMat.uniforms) {
        const uniform = shaderMat.uniforms[i];
        if (uniform.value !== null) {
          if (uniform.value instanceof Texture) {
            disposeTexture(uniform.value as Texture);
          }
        }
      }
    }
    material.dispose();
  }
};

export const dispose = (object: Object3D): void => {
  if (!object) return;

  // Dispose children
  while (object.children.length > 0) {
    const child = object.children[0];
    if (child.type === 'Audio') {
      (child as Audio).pause();
      if (child.parent) {
        child.parent.remove(child);
      }
    } else {
      dispose(child);
    }
  }

  // Dispose object
  if (object.parent) object.parent.remove(object);
  // @ts-ignore
  if (object.isMesh) {
    const mesh = object as Mesh;
    mesh.geometry?.dispose();
    disposeMaterial(mesh.material);
  }

  // @ts-ignore
  if (object.dispose !== undefined) object.dispose();
};

// Hierarchy

export let totalThreeObjects = 0;

export const resetThreeObjects = () => {
  totalThreeObjects = 0;
};

export const hierarchyUUID = (object: Object3D): void => {
  if (!object) return;

  let uuid = object.name.replaceAll(' ', '').replaceAll('/', '.');
  // fallback in case there's no name
  if (uuid.length === 0) {
    uuid = `obj_${totalThreeObjects}`;
    totalThreeObjects++;
  }
  // inherit parent's UUID for hierarchy
  if (object.parent !== null && object.parent.uuid.length > 0) {
    uuid = `${object.parent.uuid}.${uuid}`;
  }
  object.uuid = uuid;

  // Update material UUIDs
  if (object['isMesh'] !== undefined) {
    const mesh = object as Mesh;
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material: Material, index: number) => {
        material.uuid = `${uuid}.material.${index}`;
      });
    } else {
      const material = mesh.material as Material;
      material.uuid = `${uuid}.material`;
    }
  }

  // Iterate children
  object.children.forEach((child: Object3D) => hierarchyUUID(child));
};

// Export

export class ExportTexture {
  static renderer: WebGLRenderer;
  private static canvas: HTMLCanvasElement | OffscreenCanvas;
  private static context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;
  private static scene: Scene | null = null;
  private static camera: OrthographicCamera | null = null;
  private static material: MeshBasicMaterial | null = null;
  private static inited = false;
  private static width = 100;
  private static height = 100;

  private static init() {
    if (this.inited) return;

    // Check if we're in a web worker (no document) or main thread
    if (typeof document !== 'undefined') {
      // Main thread - use HTMLCanvasElement
      this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    } else {
      // Web worker - use OffscreenCanvas
      this.canvas = new OffscreenCanvas(this.width, this.height);
    }
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');

    this.inited = true;
  }

  static renderToBlob(texture: Texture): string | Promise<string> {
    this.init();

    // Textures
    const repeat = texture.repeat.clone();
    const offset = texture.offset.clone();
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);

    // Draw
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);

      const image = texture.image;
      if (image !== undefined && image !== null && image.width > 0) {
        // Set title only for HTMLCanvasElement
        if (this.canvas instanceof HTMLCanvasElement) {
          // @ts-ignore
          this.canvas.title = texture.sourceFile;
        }
        const scale = this.canvas.width / image.width;
        const canvas2 = this.renderToCanvas(texture);
        this.context!.drawImage(canvas2 as CanvasImageSource, 0, 0, image.width * scale, image.height * scale);
      }
    }

    // Reset
    texture.repeat.copy(repeat);
    texture.offset.copy(offset);

    // Handle different canvas types
    if (this.canvas instanceof HTMLCanvasElement) {
      return this.canvas.toDataURL('image/png');
    } else {
      // OffscreenCanvas - convert to blob then to data URL
      return this.canvas.convertToBlob({ type: 'image/png' }).then(blob => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      });
    }
  }

  private static renderToCanvas(texture: Texture): HTMLCanvasElement | OffscreenCanvas {
    if (this.material === null) {
      this.camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 100);
      this.scene = new Scene();

      this.material = new MeshBasicMaterial();

      const triangle = new BufferGeometry();
      triangle.setAttribute('position', new Float32BufferAttribute([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3));
      triangle.setAttribute('normal', new Float32BufferAttribute([0, 0, 1, 0, 0, 1], 3));
      triangle.setAttribute('uv', new Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
      
      const mesh = new Mesh(triangle, this.material);
      this.scene.add(mesh);
    }

    if (texture.isRenderTargetTexture) {
      this.material.map = texture;
      this.renderer.render(this.scene!, this.camera!);
    } else {
      const beforeRender = this.renderer.outputColorSpace;
      const beforeTex = texture.colorSpace;
      this.renderer.outputColorSpace = LinearSRGBColorSpace;
      texture.colorSpace = LinearSRGBColorSpace;
      this.material.map = texture;
      this.renderer.render(this.scene!, this.camera!);
      this.renderer.outputColorSpace = beforeRender;
      texture.colorSpace = beforeTex;
    }

    // Return the canvas used by the renderer
    return this.renderer.domElement instanceof HTMLCanvasElement 
      ? this.renderer.domElement 
      : this.canvas;
  }
}

// Webworkers

export type ParsedModel = {
  animations: AnimationClip[]
  cameras: Object3D[]
  model: Object3D<Object3DEventMap>
  mixer: AnimationMixer
}

export function parseModelLite(model: ModelLite): Promise<ParsedModel> {
  return new Promise((resolve) => {
    const loader = new ObjectLoader();
    loader.parseAsync(model.scene).then((scene: Object3D<Object3DEventMap>) => {
      // Load animations
      const mixer = new AnimationMixer(scene);
      if (model.animations.length > 0) {
        // @ts-ignore
        const animations = model.animations.map(data => AnimationClip.parse(data));
        // Play the first animation
        const action = mixer.clipAction(animations[0]);
        action.play();

        // Assign
        mixer.getRoot()['animations'] = model.animations;
        mixer.getRoot()['mixer'] = mixer;
      }

      const cameras: Object3D[] = [];
      if (model.cameras && model.cameras.length > 0) {
        model.cameras.forEach((value: unknown) => {
          const camera = loader.parse(value);
          cameras.push(camera);
        });
      }

      resolve({
        animations: model.animations,
        model: scene,
        mixer,
        cameras,
      });
    });
  });
}
