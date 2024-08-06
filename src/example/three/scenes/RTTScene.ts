import { Color, DirectionalLight, Mesh, MeshPhysicalMaterial, PerspectiveCamera, Scene, TorusKnotGeometry, Vector3, WebGLRenderTarget, WebGLRenderer } from 'three';
import { IS_DEV } from '../../constants';
import { hierarchyUUID } from '../../../editor/utils';
import { cubeTextures } from '../loader';

const zero3 = new Vector3();

export default class RTTScene extends Scene {
  renderTarget: WebGLRenderTarget;
  camera: PerspectiveCamera;
  mesh: Mesh;

  constructor() {
    super();
    this.name = 'RTTScene';

    const envMap = cubeTextures.get('environment')!;
    this.background = envMap;

    this.camera = new PerspectiveCamera(60, 1, 10, 2000);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(zero3);

    const light = new DirectionalLight(new Color(0xffffff), 0.125);
    light.name = 'sun';
    this.add(light);

    this.mesh = new Mesh(new TorusKnotGeometry(10, 3, 100, 6), new MeshPhysicalMaterial({ envMap: envMap, envMapIntensity: 10 }));
    this.mesh.name = 'normalMesh';
    this.add(this.mesh);

    this.renderTarget = new WebGLRenderTarget(512, 512);

    if (IS_DEV) hierarchyUUID(this);
  }

  draw(time: number, renderer: WebGLRenderer) {
    const radius = 100;
    const angle = time * 0.05 * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    this.camera.position.set(x, 0, z);
    this.camera.lookAt(zero3);

    // Draw
    renderer.setRenderTarget(this.renderTarget);
    renderer.clear();
    renderer.render(this, this.camera);
    renderer.setRenderTarget(null);
  }
}
