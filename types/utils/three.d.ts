import { AnimationClip, AnimationMixer, Material, Object3D, Object3DEventMap, Texture, WebGLRenderer } from 'three';
import { ModelLite } from '../webworkers/types';
export declare const disposeTexture: (texture?: Texture) => void;
export declare const disposeMaterial: (material?: Material | Material[]) => void;
export declare const dispose: (object: Object3D) => void;
export declare let totalThreeObjects: number;
export declare const resetThreeObjects: () => void;
export declare const hierarchyUUID: (object: Object3D) => void;
export declare class ExportTexture {
    static renderer: WebGLRenderer;
    private static canvas;
    private static context;
    private static scene;
    private static camera;
    private static material;
    private static inited;
    private static width;
    private static height;
    private static init;
    static renderToBlob(texture: Texture): string;
    private static renderToCanvas;
}
export type ParsedModel = {
    animations: AnimationClip[];
    cameras: Object3D[];
    model: Object3D<Object3DEventMap>;
    mixer: AnimationMixer;
};
export declare function parseModelLite(model: ModelLite): Promise<ParsedModel>;
