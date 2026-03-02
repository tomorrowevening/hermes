import { Object3D, PerspectiveCamera, Scene, Timer } from 'three/webgpu';
import Application from '../../../core/Application';
import RemoteTheatre from '../../../core/remote/RemoteTheatre';

export default class BaseScene extends Scene {
  app!: Application;
  camera: PerspectiveCamera;
  renderer?: any;
  clock: Timer;

  constructor() {
    super();
    this.clock = new Timer();
    this.clock.connect(document);

    const cameras = new Object3D();
    cameras.name = 'cameras';
    this.add(cameras);

    this.camera = new PerspectiveCamera(90, 1, 10, 1000);
    this.camera.name = 'SceneCamera';
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
    this.clock.disconnect();
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
