import { Camera, Scene } from 'three';
import BaseRemote from './BaseRemote';
import { BroadcastData } from '../types';
export default class RemoteThree extends BaseRemote {
    scene?: Scene;
    getObject(uuid: string): void;
    setObject(value: any): void;
    requestMethod(uuid: string, key: string, value?: any, subitem?: string): void;
    updateObject(uuid: string, key: string, value: any): void;
    createTexture(uuid: string, key: string, value: any): void;
    setScene(value: Scene): void;
    addCamera(camera: Camera): void;
    removeCamera(camera: Camera): void;
    handleApp(msg: BroadcastData): void;
    handleEditor(msg: BroadcastData): void;
}
