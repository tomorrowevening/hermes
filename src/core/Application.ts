import BaseRemote from './remote/BaseRemote';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';

export default class Application {
  connection?: BroadcastChannel | undefined = undefined;
  components: Map<string, any> = new Map();
  debugEnabled: boolean;

  // Protected
  protected _mode: ApplicationMode = 'app';

  constructor(name: string, debugEnabled: boolean, editorHashtag: string = 'editor') {
    this.editor = debugEnabled && document.location.hash.search(editorHashtag) > -1;
    this.debugEnabled = debugEnabled;
    if (debugEnabled) this.connection = new BroadcastChannel(name);
  }

  addComponent(name: string, component: BaseRemote) {
    this.components.set(name, component);
  }

  dispose() {
    this.components.forEach((value: BaseRemote) => {
      value.dispose();
    });
    this.components.clear();
  }

  // Remote

  send(data: BroadcastData) {
    if (this.connection !== undefined) {
      if (this._mode !== data.target) {
        this.connection.postMessage(data);
      }
    }
  }

  listen(callback: BroadcastCallback) {
    if (this.connection !== undefined) {
      this.connection.onmessage = (event: MessageEvent) => {
        callback(event.data);
      };
    }
  }

  // Getters / Setters

  get mode(): ApplicationMode {
    return this._mode;
  }

  get isApp(): boolean {
    return this._mode === 'app';
  }

  get editor(): boolean {
    return this._mode === 'editor';
  }

  set editor(value: boolean) {
    if (value) {
      this._mode = 'editor';
      document.title += ' - Editor';
    }
  }
}
