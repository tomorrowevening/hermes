import RemoteThree from '@/core/remote/RemoteThree';
import { Color, Object3D } from 'three';

export interface CoreComponentProps {
  class?: string
  three: RemoteThree
}

export interface ChildObjectProps extends CoreComponentProps {
  child?: Object3D
  three: RemoteThree
}

export interface SidePanelState {
  scene?: Object3D
  three: RemoteThree
}

export interface MinimumObject {
  name: string
  uuid: string
  type: string
  children: MinimumObject[]
}

export interface RemoteMaterial {
  // Blending
  blending: number
  blendSrc: number
  blendDst: number
  blendEquation: number
  blendColor: Color
  blendAlpha: number
  // Depth
  depthFunc: number
  depthTest: boolean
  depthWrite: boolean
  // Stencil
  stencilWriteMask: number
  stencilFunc: number
  stencilRef: number
  stencilFuncMask: number
  stencilFail: number
  stencilZFail: number
  stencilZPass: number
  stencilWrite: boolean
  // Clipping
  clipIntersection: boolean
  // Polygon
  polygonOffset: boolean
  polygonOffsetFactor: number
  polygonOffsetUnits: number
  // ETC
  dithering: boolean
  name: string
  opacity: number
  premultipliedAlpha: boolean
  side: number
  toneMapped: boolean
  transparent: boolean
  type: string
  uuid: string
  vertexColors: boolean
  defines: any
  extensions: any
  uniforms: any
  // Colors
  color?: Color
  attenuationColor?: Color
  sheenColor?: Color
  specularColor?: Color
}

// Animation Info

export interface AnimationClipInfo {
  name: string;
  duration: number;
  blendMode: number;
}

// Camera Info

export interface PerspectiveCameraInfo {
  fov: number
  zoom: number
  near: number
  far: number
  focus: number
  aspect: number
  filmGauge: number
  filmOffset: number
}

export interface OrthographicCameraInfo {
  zoom: number
  near: number
  far: number
  left: number
  right: number
  top: number
  bottom: number
}

// Light Info
export interface LightInfo {
  color: Color
  intensity: number
  // Point
  decay?: number
  distance?: number
  // Rect
  width?: number
  height?: number
  // Spot
  angle?: number
  penumbra?: number
  // Hemisphere 
  groundColor?: Color
}

export interface RemoteObject {
  name: string
  uuid: string
  type: string
  visible: boolean
  matrix: number[] // based on Matrix4.elements
  animations: AnimationClipInfo[]
  material?: RemoteMaterial | RemoteMaterial[]
  perspectiveCameraInfo?: PerspectiveCameraInfo
  orthographicCameraInfo?: OrthographicCameraInfo
  lightInfo?: LightInfo
}
