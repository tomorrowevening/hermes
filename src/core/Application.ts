import BaseRemote from './remote/BaseRemote';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';

export default class Application {
  components: Map<string, any> = new Map();
  listen?: BroadcastCallback;
  
  // Protected
  protected _debugEnabled: boolean;
  protected broadcastChannel?: BroadcastChannel | undefined = undefined;
  protected webSocket?: WebSocket | undefined = undefined;
  protected _mode: ApplicationMode = 'app';
  protected _connected = false;
  protected useBC = false;

  constructor(id: string, debugEnabled: boolean, useBC:boolean = true, editorHashtag: string = 'editor') {
    this.editor = debugEnabled && document.location.hash.search(editorHashtag) > -1;
    this._debugEnabled = debugEnabled;

    if (debugEnabled) {
      this.useBC = useBC;
      if (useBC) {
        this.broadcastChannel = new BroadcastChannel(id);
        this.broadcastChannel.addEventListener('message', this.messageHandler);
      } else {
        this.webSocket = new WebSocket(id);
        this.webSocket.addEventListener('open', this.openHandler);
        this.webSocket.addEventListener('close', this.closeHandler);
        this.webSocket.addEventListener('message', this.messageHandler);
      }
    }
  }

  addComponent(name: string, component: BaseRemote) {
    this.components.set(name, component);
  }

  dispose() {
    if (this.broadcastChannel !== undefined) {
      this.broadcastChannel.removeEventListener('message', this.messageHandler);
    }
    if (this.webSocket !== undefined) {
      this.webSocket.removeEventListener('open', this.openHandler);
      this.webSocket.removeEventListener('close', this.closeHandler);
      this.webSocket.removeEventListener('message', this.messageHandler);
    }
    this.components.forEach((value: BaseRemote) => {
      value.dispose();
    });
    this.components.clear();
  }

  // Remote

  send(data: BroadcastData) {
    if (this._mode !== data.target) {
      if (this.useBC) {
        this.broadcastChannel?.postMessage(data);
      } else if (this._connected) {
        this.webSocket?.send(JSON.stringify(data));
      }
    }
  }

  private messageHandler = (evt: MessageEvent) => {
    if (this.listen !== undefined) {
      if (this.useBC) {
        this.listen(evt.data);
      } else {
        this.listen(JSON.parse(evt.data));
      }
    }
  };

  private openHandler = () => {
    this._connected = true;
  };

  private closeHandler = () => {
    this._connected = false;
  };

  // Getters / Setters

  get connected(): boolean {
    return this._connected;
  }

  get debugEnabled(): boolean {
    return this._debugEnabled;
  }

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
