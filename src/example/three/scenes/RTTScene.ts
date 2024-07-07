import { Color, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, TorusKnotGeometry, Vector3, WebGLRenderTarget, WebGLRenderer } from 'three';
import { IS_DEV } from '../../constants';
import { hierarchyUUID } from '../../../editor/utils';

export default class RTTScene extends Scene {
  renderTarget: WebGLRenderTarget;
  camera: PerspectiveCamera;
  mesh: Mesh;

  constructor() {
    super();
    this.name = 'RTTScene';

    this.camera = new PerspectiveCamera(60, 1, 10, 2000);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new Vector3());

    const light = new DirectionalLight(new Color(0xff99ff), 1);
    light.name = 'sun';
    this.add(light);

    this.mesh = new Mesh(new TorusKnotGeometry(10, 3, 100, 6), new MeshPhongMaterial());
    this.mesh.name = 'normalMesh';
    this.add(this.mesh);

    this.renderTarget = new WebGLRenderTarget(512, 512, { depthBuffer: false });

    if (IS_DEV) hierarchyUUID(this);
  }

  draw(time: number, renderer: WebGLRenderer) {
    // Update
    this.mesh.position.x = Math.sin(time * 0.5) * 50;

    // Draw
    renderer.setRenderTarget(this.renderTarget);
    renderer.clear();
    renderer.render(this, this.camera);
    renderer.setRenderTarget(null);
  }
}
