import { Color, Object3D } from 'three';
export interface CoreComponentProps {
    class?: string;
}
export interface ChildObjectProps extends CoreComponentProps {
    child: Object3D;
}
export interface SceneHierarchyState {
    scene: Object3D | null;
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
    color?: Color;
    attenuationColor?: Color;
    sheenColor?: Color;
    specularColor?: Color;
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
export interface RemoteObject {
    name: string;
    uuid: string;
    type: string;
    visible: boolean;
    matrix: number[];
    material?: RemoteMaterial | RemoteMaterial[];
    perspectiveCameraInfo?: PerspectiveCameraInfo;
    orthographicCameraInfo?: OrthographicCameraInfo;
}
