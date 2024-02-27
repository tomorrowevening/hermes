import BaseRemote from './remote/BaseRemote';
import { ApplicationMode, BroadcastCallback, BroadcastData } from './types';

export default class Application {
  components: Map<string, any> = new Map();
  listen?: BroadcastCallback;
  
  // Protected
  protected _debugEnabled: boolean;
  protected _broadcastChannel?: BroadcastChannel | undefined = undefined;
  protected _webSocket?: WebSocket | undefined = undefined;
  protected _mode: ApplicationMode = 'app';
  protected _connected = false;
  protected _useBC = false;

  constructor(id: string, debugEnabled: boolean, useBC:boolean = true) {
    this._debugEnabled = debugEnabled;

    if (debugEnabled) {
      this._useBC = useBC;
      if (useBC) {
        this._broadcastChannel = new BroadcastChannel(id);
        this._broadcastChannel.addEventListener('message', this.messageHandler);
      } else {
        this._webSocket = new WebSocket(id);
        this._webSocket.addEventListener('open', this.openHandler);
        this._webSocket.addEventListener('close', this.closeHandler);
        this._webSocket.addEventListener('message', this.messageHandler);
      }
    }
  }

  addComponent(name: string, component: BaseRemote) {
    this.components.set(name, component);
  }

  dispose() {
    if (this._broadcastChannel !== undefined) {
      this._broadcastChannel.removeEventListener('message', this.messageHandler);
    }
    if (this._webSocket !== undefined) {
      this._webSocket.removeEventListener('open', this.openHandler);
      this._webSocket.removeEventListener('close', this.closeHandler);
      this._webSocket.removeEventListener('message', this.messageHandler);
    }
    this.components.forEach((value: BaseRemote) => {
      value.dispose();
    });
    this.components.clear();
  }

  // Remote

  send(data: BroadcastData) {
    if (this._mode !== data.target) {
      if (this._useBC) {
        this._broadcastChannel?.postMessage(data);
      } else if (this._connected) {
        this._webSocket?.send(JSON.stringify(data));
      }
    }
  }

  private messageHandler = (evt: MessageEvent) => {
    if (this.listen !== undefined) {
      if (this._useBC) {
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
    }
  }
}
