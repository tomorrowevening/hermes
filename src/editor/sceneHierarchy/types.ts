import { Object3D } from 'three'

export type ChildObjectProps = {
  child: Object3D
}

export type SceneHierarchyState = {
  open: boolean
  scene: Object3D | null
}
