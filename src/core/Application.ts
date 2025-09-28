import { EventDispatcher } from 'three';
import BaseRemote from './remote/BaseRemote';
import { ApplicationMode, BroadcastData } from './types';
import { AppSettings, detectSettings } from '@/utils/detectSettings';

export enum ToolEvents {
  CUSTOM = 'ToolEvents::custom',
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
  assets =  {
    audio: new Map<string, any>(),
    image: new Map<string, ImageBitmap>(),
    json: new Map<string, any>(),
    model: new Map<string, any>(),
    video: new Map<string, any>(),
  };
  components: Map<string, any> = new Map();
  settings: AppSettings;
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

  constructor(id: string, settings: AppSettings, useBC:boolean = true) {
    super();
    this._appID = id;
    this.settings = settings;

    if (settings.dev) {
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

  static detectSettings(dev: boolean = false, editor: boolean = false): Promise<AppSettings> {
    return detectSettings(dev, editor);
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
      case 'custom':
        this.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  private openHandler = () => {
    this._connected = true;
  };

  private closeHandler = () => {
    this._connected = false;
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

  get isApp(): boolean {
    return this._mode === 'app';
  }

  get editor(): boolean {
    return this.settings.editor;
  }
}
