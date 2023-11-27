import { Object3D } from 'three';
export interface CoreComponentProps {
    class?: string;
}
export interface ChildObjectProps extends CoreComponentProps {
    child: Object3D;
}
export type SceneModes = 'Hierarchy' | 'Inspector';
export interface SceneHierarchyState {
    mode: SceneModes;
    open: boolean;
    scene: Object3D | null;
}
export interface MinimumObject {
    name: string;
    uuid: string;
    type: string;
    children: MinimumObject[];
}
export interface RemoteMaterial {
    type: string;
    opacity: number;
    transparent: boolean;
    side: number;
}
export interface RemoteObject {
    name: string;
    uuid: string;
    type: string;
    visible: boolean;
    matrix: number[];
    material?: RemoteMaterial;
}
