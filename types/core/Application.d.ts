import { EventDispatcher } from 'three';
import BaseRemote from './remote/BaseRemote';
import { ApplicationMode, BroadcastData } from './types';
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
    components: Map<string, any>;
    appHandlers: RemoteCall[];
    editorHandlers: RemoteCall[];
    protected _appID: string;
    protected _debugEnabled: boolean;
    protected _broadcastChannel?: BroadcastChannel | undefined;
    protected _webSocket?: WebSocket | undefined;
    protected _mode: ApplicationMode;
    protected _connected: boolean;
    protected _useBC: boolean;
    constructor(id: string, debugEnabled: boolean, editor: boolean, useBC?: boolean);
    addComponent(name: string, component: BaseRemote): void;
    dispose(): void;
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
    set editor(value: boolean);
}
