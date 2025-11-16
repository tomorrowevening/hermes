import { Camera, Curve, EventDispatcher, EventListener, Object3D, RenderTargetOptions, Scene, WebGLRenderTarget } from 'three';
import BaseRemote from './BaseRemote';
import { BroadcastData, GroupData } from '../types';
export declare enum ToolEvents {
    CUSTOM = "ToolEvents::custom",
    SELECT_DROPDOWN = "ToolEvents::selectDropdown",
    DRAG_UPDATE = "ToolEvents::dragUpdate",
    ADD_SCENE = "ToolEvents::addScene",
    REFRESH_SCENE = "ToolEvents::refreshScene",
    REMOVE_SCENE = "ToolEvents::removeScene",
    SET_SCENE = "ToolEvents::setScene",
    SET_OBJECT = "ToolEvents::setObject",
    CLEAR_OBJECT = "ToolEvents::clearObject",
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
export default class RemoteThree extends BaseRemote implements EventDispatcher<ToolEvent> {
    name: string;
    canvas: HTMLCanvasElement | null;
    inputElement: any;
    scene?: Scene;
    scenes: Map<string, Scene>;
    renderer?: any;
    renderTargets: Map<string, WebGLRenderTarget>;
    private renderTargetsResize;
    private groups;
    private _listeners;
    constructor(name: string, debug?: boolean, editor?: boolean);
    dispose(): void;
    addEventListener<T extends ToolEvents>(type: T, listener: EventListener<ToolEvent[T], T, this>): void;
    hasEventListener<T extends ToolEvents>(type: T, listener: EventListener<ToolEvent[T], T, this>): boolean;
    removeEventListener<T extends ToolEvents>(type: T, listener: EventListener<ToolEvent[T], T, this>): void;
    dispatchEvent<T extends ToolEvents>(event: ToolEvent[T] & {
        type: T;
    }): void;
    getObjectByUUID(uuid: string): Object3D | undefined;
    getObject(uuid: string): void;
    setObject(value: any): void;
    requestMethod(uuid: string, key: string, value?: any, subitem?: string): void;
    updateObject(uuid: string, key: string, value: any): void;
    createTexture(uuid: string, key: string, value: any): void;
    private onUpdateObject;
    private onCreateTexture;
    addGroup(data: GroupData): void;
    removeGroup(name: string): void;
    updateGroup(group: string, prop: string, value: any): void;
    addSpline(spline: Curve<any>): void;
    setRenderer(value: any, inputElement?: any): void;
    updateRenderer(data: any): void;
    addScene(value: Scene): void;
    refreshScene(value: string): void;
    removeScene(value: Scene): void;
    removeAllScenes(): void;
    getScene(uuid: string): Scene | null;
    setScene(value: Scene): void;
    requestSize(): void;
    addCamera(camera: Camera): void;
    removeCamera(camera: Camera): void;
    handleApp(msg: BroadcastData): void;
    handleEditor(msg: BroadcastData): void;
    protected messageHandler(evt: MessageEvent): void;
    addRT(name: string, resize?: boolean, params?: RenderTargetOptions): void;
    removeRT(name: string): void;
    resize(width: number, height: number): void;
    set dpr(value: number);
    get dpr(): number;
    get width(): number;
    get height(): number;
}
