import { Camera, RenderTargetOptions, Scene, WebGLRenderTarget, WebGLRenderer } from 'three';
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData } from '../types';
export default class RemoteThree extends BaseRemote {
    scene?: Scene;
    renderer?: WebGLRenderer;
    renderTargets: Map<string, WebGLRenderTarget>;
    dispose(): void;
    getObject(uuid: string): void;
    setObject(value: any): void;
    requestMethod(uuid: string, key: string, value?: any, subitem?: string): void;
    updateObject(uuid: string, key: string, value: any): void;
    createTexture(uuid: string, key: string, value: any): void;
    setScene(value: Scene): void;
    addCamera(camera: Camera): void;
    removeCamera(camera: Camera): void;
    handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    private rendererWidth;
    private rendererHeight;
    addRT(name: string, params?: RenderTargetOptions): void;
    resize(width: number, height: number): void;
    set dpr(value: number);
    get dpr(): number;
    get width(): number;
    get height(): number;
    get canvas(): HTMLCanvasElement | null;
}
