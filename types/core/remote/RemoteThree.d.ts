import { Scene } from 'three';
import Application from '../Application';
import BaseRemote from './BaseRemote';
export default class RemoteThree extends BaseRemote {
    scene?: Scene | undefined;
    constructor(app: Application);
    getObject(uuid: string): void;
    setObject(value: any): void;
    updateObject(uuid: string, key: string, value: any): void;
    getScene(): void;
    setScene(value: any): void;
}
