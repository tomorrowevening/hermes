import { AppSettings } from '../utils/detectSettings';

export default class AppRunner {
  canvas: HTMLCanvasElement;
  inputElement: any;
  settings: AppSettings;

  protected playing = false;
  protected rafID = -1;

  constructor(canvas: HTMLCanvasElement, inputElement: any, settings: AppSettings) {
    this.canvas = canvas;
    this.inputElement = inputElement;
    this.settings = settings;
  }

  dispose() {
    this.stop();
  }

  play() {
    if (this.playing) return;
    this.playing = true;
    this.onUpdate();
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;
    cancelAnimationFrame(this.rafID);
    this.rafID = -1;
  }

  update() {
    //
  }

  draw() {
    //
  }

  resize(width: number, height: number) {
    if (this.settings.supportOffScreenCanvas) {
      this.inputElement.clientWidth = width;
      this.inputElement.clientHeight = height;
      this.inputElement.width = width;
      this.inputElement.height = height;
    }
  }

  // Events

  protected onResize = (evt: any) => {
    this.resize(evt.width, evt.height);
  };

  protected onUpdate = () => {
    this.update();
    this.draw();
    this.rafID = requestAnimationFrame(this.onUpdate);
  };
}
