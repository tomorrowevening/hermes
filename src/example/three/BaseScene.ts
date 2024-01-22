import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export default class BaseScene extends Scene {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  constructor(renderer: WebGLRenderer) {
    super();
    this.renderer = renderer;

    const cameras = new Object3D();
    cameras.name = 'cameras';
    this.add(cameras);

    this.camera = new PerspectiveCamera(90, 1, 10, 1000);
    this.camera.name = 'Main';
    this.camera.position.set(0, 100, 125);
    this.camera.lookAt(0, 50, 0);
    cameras.add(this.camera);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    //
  }

  draw() {
    this.renderer.render(this, this.camera);
  }
}
