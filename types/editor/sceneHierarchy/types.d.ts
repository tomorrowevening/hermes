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
    alphaHash: boolean;
    alphaToCoverage: boolean;
    colorWrite: boolean;
    dithering: boolean;
    forceSinglePass: boolean;
    name: string;
    opacity: number;
    premultipliedAlpha: boolean;
    side: number;
    toneMapped: boolean;
    transparent: boolean;
    type: string;
    uuid: string;
    vertexColors: boolean;
    color?: Color;
    attenuationColor?: Color;
    sheenColor?: Color;
    specularColor?: Color;
}
export interface RemoteObject {
    name: string;
    uuid: string;
    type: string;
    visible: boolean;
    matrix: number[];
    material?: RemoteMaterial | RemoteMaterial[];
}