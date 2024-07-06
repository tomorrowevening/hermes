import { Object3D } from 'three';
import ChildObject from './ChildObject';
import { ChildObjectProps } from './types';

export default function ContainerObject(props: ChildObjectProps) {
  const children: Array<any> = [];
  props.child?.children.map((child: Object3D, index: number) => {
    children.push(<ChildObject child={child} scene={props.scene} key={index} three={props.three} />);
  });
  return <div className={`scene ${props.class !== undefined ? props.class : ''}`}>{children}</div>;
}
