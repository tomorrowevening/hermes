import { AnimationClip, Object3DJSON } from 'three';
export type FileType = 'audio' | 'blob' | 'buffer' | 'fbx' | 'gltf' | 'image' | 'json' | 'video';
export type File = {
    name: string;
    file: string;
    type: FileType;
};
export type ModelInfo = {
    animations: AnimationClip[];
    cameras?: Object3DJSON[];
    scene: Object3DJSON;
};
export type ModelLite = {
    animations: AnimationClip[];
    cameras?: Object3DJSON[];
    scene: Object3DJSON;
};
export type Assets = {
    audio: Map<string, ArrayBuffer>;
    blob: Map<string, Blob>;
    buffer: Map<string, ArrayBuffer>;
    image: Map<string, ImageBitmap>;
    json: Map<string, any>;
    model: Map<string, ModelInfo>;
    video: Map<string, Blob>;
};
