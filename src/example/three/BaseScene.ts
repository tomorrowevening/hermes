import { Clock, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { app } from "../constants";

export default class BaseScene extends Scene {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  clock: Clock;

  constructor(renderer: WebGLRenderer) {
    super();
    this.renderer = renderer;
    this.clock = new Clock();
    this.clock.start();

    const cameras = new Object3D();
    cameras.name = 'cameras';
    this.add(cameras);

    this.camera = new PerspectiveCamera(90, 1, 10, 1000);
    this.camera.name = 'Main';
    this.camera.position.set(0, 100, 125);
    this.camera.lookAt(0, 50, 0);
    cameras.add(this.camera);
  }

  dispose() {
    app.theatre.clearSheetObjects(this.name);
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
