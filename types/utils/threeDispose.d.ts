import { Material, Object3D, Texture } from 'three';
export declare const disposeTexture: (texture?: Texture) => void;
export declare const disposeMaterial: (material?: Material | Material[]) => void;
export declare const dispose: (object: Object3D) => void;
