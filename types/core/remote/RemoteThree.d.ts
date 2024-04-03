import { Camera, Scene, WebGLRenderer } from 'three';
import BaseRemote from './BaseRemote';
import Application from '../Application';
import { BroadcastData } from '../types';
export default class RemoteThree extends BaseRemote {
    scene?: Scene;
    renderer?: WebGLRenderer;
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
    resize(width: number, height: number): void;
    set dpr(value: number);
    get dpr(): number;
    get width(): number;
    get height(): number;
    get canvas(): HTMLCanvasElement | null;
}
