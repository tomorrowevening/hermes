import { Object3D } from 'three';
export type ChildObjectProps = {
    class?: string;
    child: Object3D;
};
export type SceneModes = 'Hierarchy' | 'Inspector';
export type SceneHierarchyState = {
    mode: SceneModes;
    open: boolean;
    scene: Object3D | null;
};
export type MinimumObject = {
    name: string;
    uuid: string;
    type: string;
    children: MinimumObject[];
};
