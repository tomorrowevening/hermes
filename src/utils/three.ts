import {
  AddEquation,
  AlwaysStencilFunc,
  AnimationClip,
  AnimationMixer,
  Audio,
  BufferGeometry,
  Camera,
  CustomBlending,
  DstColorFactor,
  EqualStencilFunc,
  Float32BufferAttribute,
  KeepStencilOp,
  LinearSRGBColorSpace,
  Material,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  NotEqualStencilFunc,
  Object3D,
  Object3DEventMap,
  ObjectLoader,
  OneFactor,
  OneMinusDstColorFactor,
  OneMinusSrcAlphaFactor,
  OrthographicCamera,
  ReplaceStencilOp,
  Scene,
  ShaderMaterial,
  SrcAlphaFactor,
  Texture,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { ModelLite } from '../webworkers/types';

export const triangle = new BufferGeometry();
triangle.setAttribute('position', new Float32BufferAttribute([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3));
triangle.setAttribute('normal', new Float32BufferAttribute([0, 0, 1, 0, 0, 1], 3));
triangle.setAttribute('uv', new Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));

export const orthoCamera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 100);

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

/**
 * Requires document, won't work in a WebWorker
 */
export class ExportTexture {
  static renderer: WebGLRenderer;
  private static canvas: HTMLCanvasElement;
  private static context: CanvasRenderingContext2D | null = null;
  private static scene: Scene | null = null;
  private static camera: OrthographicCamera | null = null;
  private static material: MeshBasicMaterial | null = null;
  private static inited = false;
  private static width = 100;
  private static height = 100;

  private static init() {
    if (this.inited) return;

    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');

    this.inited = true;
  }

  static renderToBlob(texture: Texture): string {
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
        // @ts-ignore
        this.canvas.title = texture.sourceFile;
        const scale = this.canvas.width / image.width;
        const canvas2 = this.renderToCanvas(texture);
        this.context.drawImage( canvas2, 0, 0, image.width * scale, image.height * scale );
      }
    }

    // Reset
    texture.repeat.copy(repeat);
    texture.offset.copy(offset);

    return this.canvas.toDataURL('image/png');
  }

  private static renderToCanvas(texture: Texture): HTMLCanvasElement {
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

    return this.renderer.domElement;
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

// Utils

export const renderToTexture = (renderer: WebGLRenderer, scene: Object3D, camera: Camera, target: WebGLRenderTarget) => {
  renderer.setRenderTarget(target);
  renderer.clear();
  renderer.render(scene, camera);
};

export function anchorGeometry(geometry: BufferGeometry, x: number, y: number, z: number) {
  geometry.applyMatrix4(new Matrix4().makeTranslation(x, -y, -z));
}

export function anchorGeometryTL(geometry: BufferGeometry) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const x = (box.max.x - box.min.x) / 2;
  const y = (box.max.y - box.min.y) / 2;
  anchorGeometry(geometry, x, y, 0);
}

/**
 * Updates an Orthographic camera's view to fit pixel-perfect in view
 */
export function updateCameraOrtho(camera: OrthographicCamera, width: number, height: number): void {
  camera.left = width / -2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = height / -2;
  camera.position.x = width / 2;
  camera.position.y = height / -2;
  camera.updateProjectionMatrix();
}

/**
 * Updates an Orthographic camera to maintain 16:9 aspect ratio
 * The camera will letterbox/pillarbox to fit the viewport
 */
export function updateCameraOrtho16x9(camera: OrthographicCamera, width: number, height: number): void {
  const targetAspect = 16 / 9;
  const currentAspect = width / height;
  
  let viewWidth = width;
  let viewHeight = height;
  
  if (currentAspect > targetAspect) {
    // Viewport is wider than 16:9, pillarbox (letterbox on sides)
    viewWidth = height * targetAspect;
  } else {
    // Viewport is taller than 16:9, letterbox (letterbox on top/bottom)
    viewHeight = width / targetAspect;
  }
  
  camera.left = viewWidth / -2;
  camera.right = viewWidth / 2;
  camera.top = viewHeight / 2;
  camera.bottom = viewHeight / -2;
  camera.updateProjectionMatrix();
}

export function supportsOffscreenCanvas(): boolean {
  const canvas = document.createElement('canvas');
  let supportOffScreenWebGL = 'transferControlToOffscreen' in canvas;

  // If it's Safari, then check the version because Safari < 17 doesn't support OffscreenCanvas with a WebGL context.
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    const versionMatch = navigator.userAgent.match( /version\/(\d+)/i );
    const safariVersion = versionMatch ? parseInt( versionMatch[ 1 ] ) : 0;
    supportOffScreenWebGL = safariVersion >= 17;
  }

  return supportOffScreenWebGL;
}

//////////////////////////////////////////////////
// Materials

export function createMask(mesh: Mesh, id: number, colorWrite = true, depthWrite = false) {
  mesh.renderOrder = -id;
  const material = mesh.material;
  if (Array.isArray(material)) {
    material.forEach((mat: Material) => {
      mat.colorWrite = colorWrite;
      mat.depthWrite = depthWrite;
      mat.stencilWrite = true;
      mat.stencilRef = id;
      mat.stencilFunc = AlwaysStencilFunc;
      mat.stencilFail = ReplaceStencilOp;
      mat.stencilZFail = ReplaceStencilOp;
      mat.stencilZPass = ReplaceStencilOp;
    });
  } else {
    material.colorWrite = colorWrite;
    material.depthWrite = depthWrite;
    material.stencilWrite = true;
    material.stencilRef = id;
    material.stencilFunc = AlwaysStencilFunc;
    material.stencilFail = ReplaceStencilOp;
    material.stencilZFail = ReplaceStencilOp;
    material.stencilZPass = ReplaceStencilOp;
  }
}

/**
 * Based on:
 * https://github.com/pmndrs/drei/blob/master/src/core/Mask.tsx
 */
export function useMask(mesh: Mesh, id: number, inverse = false) {
  const material = mesh.material;
  if (Array.isArray(material)) {
    material.forEach((mat: Material) => {
      mat.stencilWrite = true;
      mat.stencilRef = id;
      mat.stencilFunc = inverse ? NotEqualStencilFunc : EqualStencilFunc;
      mat.stencilFail = KeepStencilOp;
      mat.stencilZFail = KeepStencilOp;
      mat.stencilZPass = KeepStencilOp;
    });
  } else {
    material.stencilWrite = true;
    material.stencilRef = id;
    material.stencilFunc = inverse ? NotEqualStencilFunc : EqualStencilFunc;
    material.stencilFail = KeepStencilOp;
    material.stencilZFail = KeepStencilOp;
    material.stencilZPass = KeepStencilOp;
  }
}

export function setMaterialBlendNormal(material: Material) {
  material.blending = NormalBlending;
  material.blendEquation = AddEquation;
  material.blendSrc = SrcAlphaFactor;
  material.blendDst = OneMinusSrcAlphaFactor;
  material.needsUpdate = true;
}

export function setMaterialBlendAdd(material: Material) {
  material.blending = CustomBlending;
  material.blendEquation = AddEquation;
  material.blendSrc = SrcAlphaFactor;
  material.blendDst = OneFactor;
  material.needsUpdate = true;
}

export function setMaterialBlendMultiply(material: Material) {
  material.blending = CustomBlending;
  material.blendEquation = AddEquation;
  material.blendSrc = DstColorFactor;
  material.blendDst = OneMinusSrcAlphaFactor;
  material.needsUpdate = true;
}

export function setMaterialBlendScreen(material: Material) {
  material.blending = CustomBlending;
  material.blendEquation = AddEquation;
  material.blendSrc = OneMinusDstColorFactor;
  material.blendDst = OneFactor;
  material.needsUpdate = true;
}
