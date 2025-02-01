import { Application } from '@/core/Application';
import RemoteThree from '@/core/remote/RemoteThree';
import { Color } from 'three';
export interface CoreComponentProps {
    app: Application;
    class?: string;
    three: RemoteThree;
}
export interface ChildObjectProps extends CoreComponentProps {
    app: Application;
    child?: RemoteObject;
    scene?: RemoteObject;
    three: RemoteThree;
}
export interface SidePanelState {
    app: Application;
    scene?: RemoteObject;
    three: RemoteThree;
}
export interface MinimumObject {
    name: string;
    uuid: string;
    type: string;
    children: MinimumObject[];
}
export interface RemoteMaterial {
    blending: number;
    blendSrc: number;
    blendDst: number;
    blendEquation: number;
    blendColor: Color;
    blendAlpha: number;
    depthFunc: number;
    depthTest: boolean;
    depthWrite: boolean;
    stencilWriteMask: number;
    stencilFunc: number;
    stencilRef: number;
    stencilFuncMask: number;
    stencilFail: number;
    stencilZFail: number;
    stencilZPass: number;
    stencilWrite: boolean;
    clipIntersection: boolean;
    polygonOffset: boolean;
    polygonOffsetFactor: number;
    polygonOffsetUnits: number;
    dithering: boolean;
    name: string;
    opacity: number;
    premultipliedAlpha: boolean;
    side: number;
    toneMapped: boolean;
    transparent: boolean;
    type: string;
    uuid: string;
    vertexColors: boolean;
    defines: any;
    extensions: any;
    uniforms: any;
    anisotropy: number;
    attenuationDistance: number;
    clearcoat: number;
    dispersion: number;
    iridescence: number;
    sheen: number;
    gradientMap: any;
    color?: Color;
    attenuationColor?: Color;
    sheenColor?: Color;
    specularColor?: Color;
}
export interface AnimationClipInfo {
    name: string;
    duration: number;
    blendMode: number;
}
export interface PerspectiveCameraInfo {
    fov: number;
    zoom: number;
    near: number;
    far: number;
    focus: number;
    aspect: number;
    filmGauge: number;
    filmOffset: number;
}
export interface OrthographicCameraInfo {
    zoom: number;
    near: number;
    far: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface LightInfo {
    color: Color;
    intensity: number;
    decay?: number;
    distance?: number;
    width?: number;
    height?: number;
    angle?: number;
    penumbra?: number;
    groundColor?: Color;
}
export interface RemoteObject {
    name: string;
    uuid: string;
    type: string;
    visible: boolean;
    matrix: number[];
    animations: AnimationClipInfo[];
    material?: RemoteMaterial | RemoteMaterial[];
    perspectiveCameraInfo?: PerspectiveCameraInfo;
    orthographicCameraInfo?: OrthographicCameraInfo;
    lightInfo?: LightInfo;
    children: RemoteObject[];
}
