import { Object3D } from 'three';
import ChildObject from './ChildObject';
import type { ChildObjectProps } from './types';

export default function ContainerObject(props: ChildObjectProps) {
  const children: Array<any> = [];
  props.child.children.map((child: Object3D) => {
    children.push(<ChildObject child={child} key={Math.random()} />);
  });
  return <div className={`scene ${props.class}`}>{children}</div>;
}
