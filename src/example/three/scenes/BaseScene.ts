import { Clock, Object3D, PerspectiveCamera, Scene } from 'three';
import { Application } from '../../../core/Application';
import RemoteTheatre from '../../../core/remote/RemoteTheatre';

export default class BaseScene extends Scene {
  app: Application;
  camera: PerspectiveCamera;
  renderer?: any;
  clock: Clock;

  constructor() {
    super();
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

  setup(app: Application, renderer?: any) {
    this.app = app;
    this.renderer = renderer;
  }

  init() {
    //
  }

  dispose() {
    const theatre = this.app.components.get('theatre') as RemoteTheatre;
    theatre.clearSheetObjects(this.name);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    //
  }

  draw() {
    if (this.renderer.isWebGLRenderer) {
      this.renderer.render(this, this.camera);
    } else {
      this.renderer.renderAsync(this, this.camera);
    }
  }
}
