import { Object3D } from "three";
export declare function clamp(min: number, max: number, value: number): number;
export declare function distance(x: number, y: number): number;
export declare function randomID(): string;
export declare function isColor(obj: any): boolean;
export declare function colorToHex(obj: any): string;
export declare const hierarchyUUID: (object: Object3D) => void;
