import BaseRemote from './remote/BaseRemote';
import { AppSettings, detectSettings } from '../utils/detectSettings';

export default class Application {
  assets = {
    audio: new Map<string, any>(),
    image: new Map<string, ImageBitmap>(),
    json: new Map<string, any>(),
    model: new Map<string, any>(),
    video: new Map<string, any>(),
  };
  components: Map<string, BaseRemote> = new Map();
  settings: AppSettings = {
    dpr: 1,
    width: 0,
    height: 0,
    mobile: false,
    supportOffScreenCanvas: false,
    supportWebGPU: false,
    quality: 'Low',
    dev: false,
    editor: false,
  };
  onUpdateCallback?: () => void;

  // Protected
  protected playing = false;
  protected rafID = -1;

  constructor(dev: boolean, editor: boolean = false) {
    this.settings.dev = dev;
    this.settings.editor = editor;
  }

  dispose() {
    this.pause();
    this.components.forEach((value: BaseRemote) => value.dispose());
    this.components.clear();
  }

  detectSettings(): Promise<void> {
    return new Promise((resolve) => {
      detectSettings(this.settings.dev, this.settings.editor).then((settings: AppSettings) => {
        this.settings = settings;
        resolve();
      });
    });
  }

  // Playback

  update() {
    // 
  }

  draw() {
    // 
  }

  play = () => {
    if (this.playing) return;
    this.playing = true;
    this.onUpdate();
  };

  pause = () => {
    if (!this.playing) return;
    this.playing = false;
    cancelAnimationFrame(this.rafID);
    this.rafID = -1;
  };

  protected onUpdate = () => {
    this.update();
    if (this.isApp) this.draw();
    if (this.onUpdateCallback) this.onUpdateCallback();
    this.rafID = requestAnimationFrame(this.onUpdate);
  };

  // Remote Components

  addComponent(name: string, component: BaseRemote) {
    this.components.set(name, component);
  }

  // Getters

  get debugEnabled(): boolean {
    return this.settings.dev;
  }

  get isApp(): boolean {
    return !this.editor;
  }

  set isApp(value: boolean) {
    this.editor = !value;
  }

  get editor(): boolean {
    return this.settings.editor;
  }

  set editor(value: boolean) {
    this.settings.editor = value;
  }
}
