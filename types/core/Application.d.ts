import { EventDispatcher } from 'three';
import BaseRemote from './remote/BaseRemote';
import { ApplicationMode, BroadcastData } from './types';
import { AppSettings } from '@/utils/detectSettings';
export declare enum ToolEvents {
    CUSTOM = "ToolEvents::custom",
    SELECT_DROPDOWN = "ToolEvents::selectDropdown",
    DRAG_UPDATE = "ToolEvents::dragUpdate",
    ADD_SCENE = "ToolEvents::addScene",
    REFRESH_SCENE = "ToolEvents::refreshScene",
    REMOVE_SCENE = "ToolEvents::removeScene",
    SET_SCENE = "ToolEvents::setScene",
    GET_OBJECT = "ToolEvents::getObject",
    SET_OBJECT = "ToolEvents::setObject",
    UPDATE_OBJECT = "ToolEvents::updateObject",
    CREATE_TEXTURE = "ToolEvents::createTexture",
    REQUEST_METHOD = "ToolEvents::requestMethod",
    ADD_CAMERA = "ToolEvents::addCamera",
    REMOVE_CAMERA = "ToolEvents::removeCamera",
    ADD_GROUP = "ToolEvents::addGroup",
    REMOVE_GROUP = "ToolEvents::removeGroup",
    ADD_SPLINE = "ToolEvents::addSpline",
    ADD_RENDERER = "ToolEvents::addRenderer",
    UPDATE_RENDERER = "ToolEvents::updateRenderer"
}
export type ToolEvent = {
    [key in ToolEvents]: {
        value?: unknown;
    };
};
export type RemoteCallback = (msg: BroadcastData) => void;
export interface RemoteCall {
    remote: any;
    callback: RemoteCallback;
}
export declare class Application extends EventDispatcher<ToolEvent> {
    assets: {
        audio: Map<string, any>;
        image: Map<string, ImageBitmap>;
        json: Map<string, any>;
        model: Map<string, any>;
        video: Map<string, any>;
    };
    components: Map<string, any>;
    settings: AppSettings;
    appHandlers: RemoteCall[];
    editorHandlers: RemoteCall[];
    onUpdateCallback?: () => void;
    protected _appID: string;
    protected _mode: ApplicationMode;
    protected _broadcastChannel?: BroadcastChannel | undefined;
    protected _webSocket?: WebSocket | undefined;
    protected _connected: boolean;
    protected _useBC: boolean;
    protected playing: boolean;
    protected rafID: number;
    constructor(id: string, settings: AppSettings, useBC?: boolean);
    dispose(): void;
    update(): void;
    draw(): void;
    play: () => void;
    pause: () => void;
    private onUpdate;
    addComponent(name: string, component: BaseRemote): void;
    send(data: BroadcastData): void;
    private messageHandler;
    private handleAppBroadcast;
    private handleEditorBroadcast;
    private openHandler;
    private closeHandler;
    get appID(): string;
    get connected(): boolean;
    get debugEnabled(): boolean;
    get mode(): ApplicationMode;
    get isApp(): boolean;
    get editor(): boolean;
}
