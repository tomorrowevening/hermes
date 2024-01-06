import { Object3D } from 'three';
import { MinimumObject, RemoteObject } from './types';
export declare function determineIcon(obj: Object3D): string;
export declare function stripScene(obj: Object3D): MinimumObject;
export declare function convertImageToBase64(imgElement: HTMLImageElement): string;
export declare function stripObject(obj: Object3D): RemoteObject;
export declare function setItemProps(child: any, key: string, value: any): void;
