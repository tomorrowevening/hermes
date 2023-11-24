import { Object3D } from 'three';

export interface CoreComponentProps {
  class?: string
}

export interface ChildObjectProps extends CoreComponentProps {
  child: Object3D
}

export type SceneModes = 'Hierarchy' | 'Inspector'

export type SceneHierarchyState = {
  mode: SceneModes
  open: boolean
  scene: Object3D | null
}

export type MinimumObject = {
  name: string
  uuid: string
  type: string
  children: MinimumObject[]
}
