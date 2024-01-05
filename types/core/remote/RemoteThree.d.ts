import BaseRemote from './BaseRemote';
export default class RemoteThree extends BaseRemote {
    getObject(uuid: string): void;
    setObject(value: any): void;
    requestMethod(uuid: string, key: string, value?: any): void;
    updateObject(uuid: string, key: string, value: any): void;
    createTexture(uuid: string, key: string, value: any): void;
    getScene(): void;
    setScene(value: any): void;
}
