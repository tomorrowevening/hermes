import { Clock, Group, Scene, WebGLRenderTarget } from 'three';

export default class BaseScene extends Scene {
  clock: Clock;

  protected cameras: Group;
  protected lights: Group;
  protected world: Group;

  constructor(name: string) {
    super();
    this.name = name;
    this.clock = new Clock();

    this.lights = new Group();
    this.lights.name = 'lights';
    this.add(this.lights);

    this.cameras = new Group();
    this.cameras.name = 'cameras';
    this.add(this.cameras);

    this.world = new Group();
    this.world.name = 'world';
    this.add(this.world);
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.setupLights()
        .then(() => this.setupCameras())
        .then(() => this.setupWorld())
        .then(() => this.setupPost())
        .then(() => this.setupAnimation())
        .then(() => this.setupDebug())
        .then(() => resolve());
    });
  }

  protected setupLights(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  protected setupCameras(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  protected setupWorld(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  protected setupPost(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  protected setupAnimation(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  protected setupDebug(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  dispose() {
    //
  }

  update() {
    //
  }

  draw(renderTarget: WebGLRenderTarget | null): void {
    //
  }

  postDraw() {
    //
  }

  resize(width: number, height: number, updateStyle: boolean) {
    //
  }

  show() {
    this.clock.start();
    this.showComplete();
  }

  protected showComplete() {
    this.enable();
  }

  hide() {
    this.disable();
    this.hideComplete();
  }

  protected hideComplete() {
    this.clock.stop();
  }

  protected enable() {
    //
  }

  protected disable() {
    //
  }

  // Getters

  get deltaTime(): number {
    return Math.min(this.clock.getDelta(), 1 / 30);
  }
}
