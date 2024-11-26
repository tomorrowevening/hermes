import { AnimationClip, Object3DJSON } from 'three';

export type FileType = 'audio' | 'blob' | 'buffer' | 'fbx' | 'gltf' | 'image' | 'json' | 'video';

export type File = {
  name: string
  file: string
  type: FileType
}

export type Assets = {
  audio: any
  blob: any
  buffer: any
  images: any
  json: any
  models: any
  video: any
}

export type ModelLite = {
  animations: AnimationClip[]
  cameras?: Object3DJSON[]
  scene: Object3DJSON
}
