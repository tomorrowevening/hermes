import { Object3D, Texture, WebGLRenderer } from 'three';
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
