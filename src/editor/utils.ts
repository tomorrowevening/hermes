import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Camera,
  Float32BufferAttribute,
  LinearSRGBColorSpace,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Sphere,
  Texture,
  Vector3,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function capitalize(value: string): string {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

export function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalize(min: number, max: number, value: number) {
  return (value - min) / (max - min);
}

export function mix(min: number, max: number, value: number) {
  return min * (1 - value) + max * value;
}

export function distance(x: number, y: number): number {
  const d = x - y;
  return Math.sqrt(d * d);
}

export function randomID(): string {
  return Math.round(Math.random() * 1000000).toString();
}

export function isColor(obj: any) {
  return (
    obj.r !== undefined &&
    obj.g !== undefined &&
    obj.b !== undefined
  );
}

export function colorToHex(obj: any) {
  const r = Math.round(obj.r * 255);
  const g = Math.round(obj.g * 255);
  const b = Math.round(obj.b * 255);

  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const red = toHex(r);
  const green = toHex(g);
  const blue = toHex(b);

  return '#' + red + green + blue;
}

export function round(value: number, precision: number = 1): number {
  return Number(value.toFixed(precision));
}

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

// Dispose

export const disposeTexture = (texture?: Texture): void => {
  texture?.dispose();
};

// Dispose material
export const disposeMaterial = (material?: Material | Material[]): void => {
  if (!material) return;

  if (Array.isArray(material)) {
    material.forEach((mat: Material) => mat.dispose());
  } else {
    material.dispose();
  }
};

// Dispose object
export const dispose = (object: Object3D): void => {
  if (!object) return;

  // Dispose children
  while (object.children.length > 0) {
    const child = object.children[0];
    if (child.type === 'Audio') {
      // @ts-ignore
      child.pause();
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
