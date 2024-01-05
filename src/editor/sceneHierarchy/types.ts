import { Color, Object3D } from 'three';

export interface CoreComponentProps {
  class?: string
}

export interface ChildObjectProps extends CoreComponentProps {
  child: Object3D
}

export interface SceneHierarchyState {
  scene: Object3D | null
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

export interface RemoteObject {
  name: string
  uuid: string
  type: string
  visible: boolean
  matrix: number[] // based on Matrix4.elements
  material?: RemoteMaterial | RemoteMaterial[]
  perspectiveCameraInfo?: PerspectiveCameraInfo
  orthographicCameraInfo?: OrthographicCameraInfo
}
