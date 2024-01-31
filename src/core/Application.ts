import BaseRemote from './remote/BaseRemote';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';

export default class Application {
  connection?: WebSocket | undefined = undefined;
  components: Map<string, any> = new Map();
  debugEnabled: boolean;
  listen?: BroadcastCallback;

  // Protected
  protected _mode: ApplicationMode = 'app';
  protected _connected = false;

  constructor(url: string, debugEnabled: boolean, editorHashtag: string = 'editor') {
    this.editor = debugEnabled && document.location.hash.search(editorHashtag) > -1;
    this.debugEnabled = debugEnabled;
    if (debugEnabled) {
      this.connection = new WebSocket(url);
      this.connection.addEventListener('open', this.openHandler);
      this.connection.addEventListener('close', this.closeHandler);
      this.connection.addEventListener('message', this.messageHandler);
    }
  }

  addComponent(name: string, component: BaseRemote) {
    this.components.set(name, component);
  }

  dispose() {
    if (this.connection !== undefined) {
      this.connection.removeEventListener('open', this.openHandler);
      this.connection.removeEventListener('close', this.closeHandler);
      this.connection.removeEventListener('message', this.messageHandler);
    }
    this.components.forEach((value: BaseRemote) => {
      value.dispose();
    });
    this.components.clear();
  }

  // Remote

  send(data: BroadcastData) {
    if (this.connection !== undefined && this._connected && this._mode !== data.target) {
      this.connection.send(JSON.stringify(data));
    }
  }

  private messageHandler = (evt: MessageEvent) => {
    if (this.listen !== undefined) this.listen(JSON.parse(evt.data));
  };

  private openHandler = () => {
    this._connected = true;
  };

  private closeHandler = () => {
    this._connected = false;
  };

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
