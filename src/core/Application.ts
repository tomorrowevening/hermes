import { EventDispatcher } from 'three';
import BaseRemote from './remote/BaseRemote';
import { ApplicationMode, BroadcastData } from './types';
import { AppSettings, detectSettings } from '@/utils/detectSettings';

export enum ToolEvents {
  CUSTOM = 'ToolEvents::custom',
  REMOTE_CONNECTED = 'ToolEvents::remoteConnected',
  REMOTE_DISCONNECTED = 'ToolEvents::remoteDisconnected',
  // Components
  SELECT_DROPDOWN = 'ToolEvents::selectDropdown',
  DRAG_UPDATE = 'ToolEvents::dragUpdate',
  // SceneHierarchy
  ADD_SCENE = 'ToolEvents::addScene',
  REFRESH_SCENE = 'ToolEvents::refreshScene',
  REMOVE_SCENE = 'ToolEvents::removeScene',
  SET_SCENE = 'ToolEvents::setScene',
  GET_OBJECT = 'ToolEvents::getObject',
  SET_OBJECT = 'ToolEvents::setObject',
  CLEAR_OBJECT = 'ToolEvents::clearObject',
  UPDATE_OBJECT = 'ToolEvents::updateObject',
  CREATE_TEXTURE = 'ToolEvents::createTexture',
  REQUEST_METHOD = 'ToolEvents::requestMethod',
  // MultiView
  ADD_CAMERA = 'ToolEvents::addCamera',
  REMOVE_CAMERA = 'ToolEvents::removeCamera',
  // Custom
  ADD_GROUP = 'ToolEvents::addGroup',
  REMOVE_GROUP = 'ToolEvents::removeGroup',
  ADD_SPLINE = 'ToolEvents::addSpline',
  ADD_RENDERER = 'ToolEvents::addRenderer',
  UPDATE_RENDERER = 'ToolEvents::updateRenderer',
}

export type ToolEvent = {
  [key in ToolEvents]: { value?: unknown }
}

export type RemoteCallback = (msg: BroadcastData) => void;
export interface RemoteCall {
  remote: any;
  callback: RemoteCallback;
}

export class Application extends EventDispatcher<ToolEvent> {
  assets = {
    audio: new Map<string, any>(),
    image: new Map<string, ImageBitmap>(),
    json: new Map<string, any>(),
    model: new Map<string, any>(),
    video: new Map<string, any>(),
  };
  components: Map<string, any> = new Map();
  settings: AppSettings = {
    dpr: 1,
    fps: 30,
    width: 0,
    height: 0,
    mobile: false,
    supportOffScreenCanvas: false,
    supportWebGPU: false,
    quality: 'Low',
    dev: false,
    editor: false,
  };
  appHandlers: RemoteCall[] = [];
  editorHandlers: RemoteCall[] = [];
  onUpdateCallback?: () => void;
  
  // Protected
  protected _appID = '';
  protected _mode: ApplicationMode = 'app';
  protected _broadcastChannel?: BroadcastChannel | undefined = undefined;
  protected _webSocket?: WebSocket | undefined = undefined;
  protected _connected = false;
  protected _useBC = false;
  protected playing = false;
  protected rafID = -1;
  protected _pingInterval?: number;
  protected _lastPingTime = 0;
  protected _pingTimeout = 3000; // 5 seconds timeout
  protected _peerConnected = false;

  constructor(id: string) {
    super();
    this._appID = id;
  }

  dispose() {
    this.stopPing();
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

  detectSettings(dev: boolean = false, editor: boolean = false): Promise<void> {
    this._mode = editor ? 'editor' : 'app';
    return new Promise((resolve) => {
      detectSettings(dev, editor).then((settings: AppSettings) => {
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

  private onUpdate = () => {
    this.update();
    if (this.isApp) this.draw();
    if (this.onUpdateCallback) this.onUpdateCallback();
    this.rafID = requestAnimationFrame(this.onUpdate);
  };

  // Remote Components

  setupRemote(useBC = true) {
    if (!this.settings.dev) return;

    this._useBC = useBC;
    if (useBC) {
      this._broadcastChannel = new BroadcastChannel(this._appID);
      this._broadcastChannel.addEventListener('message', this.messageHandler);
      this.startPing();
    } else {
      this._webSocket = new WebSocket(this._appID);
      this._webSocket.addEventListener('open', this.openHandler);
      this._webSocket.addEventListener('close', this.closeHandler);
      this._webSocket.addEventListener('message', this.messageHandler);
    }
  }

  addComponent(name: string, component: BaseRemote) {
    this.components.set(name, component);
  }

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
    let data: BroadcastData = evt.data;
    if (!this._useBC) data = JSON.parse(evt.data);

    if (data.target === 'editor') {
      this.handleEditorBroadcast(data);
    } else {
      this.handleAppBroadcast(data);
    }
  };

  private handleAppBroadcast(msg: BroadcastData) {
    this.appHandlers.forEach((remoteCall: RemoteCall) => {
      remoteCall.callback(msg);
    });

    switch (msg.event) {
      case 'ping':
        this.handlePing(msg);
        break;
      case 'custom':
        this.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  private handleEditorBroadcast(msg: BroadcastData) {
    this.editorHandlers.forEach((remoteCall: RemoteCall) => {
      remoteCall.callback(msg);
    });

    switch (msg.event) {
      case 'ping':
        this.handlePing(msg);
        break;
      case 'custom':
        this.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  private openHandler = () => {
    this._connected = true;
    this.startPing();
  };

  private closeHandler = () => {
    this._connected = false;
    this._peerConnected = false;
    this.stopPing();
  };

  // Getters

  get appID(): string {
    return this._appID;
  }

  get connected(): boolean {
    return this._connected;
  }

  get debugEnabled(): boolean {
    return this.settings.dev;
  }

  get mode(): ApplicationMode {
    return this._mode;
  }

  set mode(value: ApplicationMode) {
    this._mode = value;
    this.settings.editor = value === 'editor';
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
    this._mode = value ? 'editor' : 'app';
  }

  get peerConnected(): boolean {
    return this._peerConnected;
  }

  // Ping system methods

  private startPing() {
    this.stopPing();
    this._pingInterval = setInterval(() => {
      // Only the app side sends pings to prevent infinite loops
      if (this._mode === 'app') this.sendPing();
      this.checkPingTimeout();
    }, 1000); // Send ping every second
  }

  private stopPing() {
    if (this._pingInterval !== undefined) {
      clearInterval(this._pingInterval);
      this._pingInterval = undefined;
    }
  }

  private sendPing() {
    const target: ApplicationMode = this._mode === 'app' ? 'editor' : 'app';
    this.send({
      target,
      event: 'ping',
      data: Date.now()
    });
  }

  private handlePing(msg: BroadcastData) {
    this._lastPingTime = Date.now();
    if (!this._peerConnected) {
      this.dispatchEvent({ type: ToolEvents.REMOTE_CONNECTED });
    }
    this._peerConnected = true;
    const target: ApplicationMode = this._mode === 'app' ? 'editor' : 'app';
    
    // Only send pong if this is a ping request (not a pong response)
    // We'll use the data field to distinguish: ping sends timestamp, pong sends 'pong'
    if (msg.data !== 'pong') {
      this.send({
        target,
        event: 'ping',
        data: 'pong'
      });
    }
  }

  private checkPingTimeout() {
    const now = Date.now();
    if (this._peerConnected && (now - this._lastPingTime) > this._pingTimeout) {
      const wasConnected = this._peerConnected;
      this._peerConnected = false;
      if (wasConnected) {
        // console.log(`>>> Connection lost to ${this._mode === 'app' ? 'editor' : 'app'}`);
        this.dispatchEvent({ type: ToolEvents.REMOTE_DISCONNECTED });
      }
    }
  }
}
