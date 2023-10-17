import BaseRemote from './remote/BaseRemote';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';

export default class Application {
  channel?: BroadcastChannel | undefined = undefined;
  components: Map<string, any> = new Map();

  // Protected
  protected _mode: ApplicationMode = 'app';

  constructor(name: string, debugEnabled: boolean, editorHashtag: string) {
    this.editor = debugEnabled && document.location.hash.search(editorHashtag) > -1;
    if (debugEnabled) this.channel = new BroadcastChannel(name);
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
    if (this.channel !== undefined) {
      if (this._mode !== data.target) {
        this.channel.postMessage(data);
      }
    }
  }

  listen(callback: BroadcastCallback) {
    if (this.channel !== undefined) {
      this.channel.onmessage = (event: MessageEvent) => {
        callback(event.data);
      };
    }
  }

  // Getters / Setters

  get mode(): ApplicationMode {
    return this._mode;
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
