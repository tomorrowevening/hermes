import { Object3D, Texture } from 'three';
import { MinimumObject, RemoteObject } from './types';
export declare function determineIcon(obj: RemoteObject): string;
export declare function stripScene(obj: Object3D): MinimumObject;
export declare function convertImageToBase64(imgElement: HTMLImageElement): string;
export declare function stripObject(obj: Object3D): RemoteObject;
export declare function getSubItem(child: any, key: string): any;
export declare function setItemProps(child: any, key: string, value: any): void;
export declare function textureFromSrc(imgSource: string): Promise<Texture>;
