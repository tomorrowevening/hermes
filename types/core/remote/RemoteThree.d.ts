import { Camera, Curve, RenderTargetOptions, Scene, WebGLRenderTarget, WebGLRenderer } from 'three';
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData, GroupData } from '../types';
export default class RemoteThree extends BaseRemote {
    canvas: HTMLCanvasElement | null;
    inputElement: any;
    scene?: Scene;
    scenes: Map<string, Scene>;
    renderer?: WebGLRenderer;
    renderTargets: Map<string, WebGLRenderTarget>;
    private groups;
    dispose(): void;
    getObject(uuid: string): void;
    setObject(value: any): void;
    requestMethod(uuid: string, key: string, value?: any, subitem?: string): void;
    updateObject(uuid: string, key: string, value: any): void;
    createTexture(uuid: string, key: string, value: any): void;
    addGroup(data: GroupData): void;
    removeGroup(name: string): void;
    updateGroup(group: string, prop: string, value: any): void;
    removeAllGroups(): void;
    addSpline(spline: Curve<any>): void;
    setRenderer(value: WebGLRenderer, inputElement?: any): void;
    updateRenderer(data: any): void;
    addScene(value: Scene): void;
    refreshScene(value: string): void;
    removeScene(value: Scene): void;
    removeAllScenes(): void;
    getScene(uuid: string): Scene | null;
    setScene(value: Scene): void;
    addCamera(camera: Camera): void;
    removeCamera(camera: Camera): void;
    handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    addRT(name: string, params?: RenderTargetOptions): void;
    resize(width: number, height: number): void;
    set dpr(value: number);
    get dpr(): number;
    get width(): number;
    get height(): number;
}
