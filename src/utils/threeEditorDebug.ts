import {
  BufferGeometry,
  Float32BufferAttribute,
  LinearSRGBColorSpace,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  Scene,
  Texture,
  WebGLRenderer,
} from 'three';

let totalThreeObjects = 0;

export const resetThreeObjects = (): void => {
  totalThreeObjects = 0;
};

export const hierarchyUUID = (object: Object3D): void => {
  if (!object) return;

  let uuid = object.name.replaceAll(' ', '').replaceAll('/', '.');
  if (uuid.length === 0) {
    uuid = `obj_${totalThreeObjects}`;
    totalThreeObjects++;
  }

  if (object.parent !== null && object.parent.uuid.length > 0) {
    uuid = `${object.parent.uuid}.${uuid}`;
  }
  object.uuid = uuid;

  if ((object as any).isMesh !== undefined) {
    const mesh = object as Mesh;
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material: Material, index: number) => {
        (material as any).uuid = `${uuid}.material.${index}`;
      });
    } else {
      const material = mesh.material as Material;
      (material as any).uuid = `${uuid}.material`;
    }
  }

  object.children.forEach((child: Object3D) => hierarchyUUID(child));
};

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

    const repeat = texture.repeat.clone();
    const offset = texture.offset.clone();
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);

    if (this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);

      const image = texture.image;
      if (image !== undefined && image !== null && (image as any).width > 0) {
        this.canvas.title = (texture as any).sourceFile;
        const scale = this.canvas.width / (image as any).width;
        const canvas2 = this.renderToCanvas(texture);
        this.context.drawImage(canvas2, 0, 0, (image as any).width * scale, (image as any).height * scale);
      }
    }

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
