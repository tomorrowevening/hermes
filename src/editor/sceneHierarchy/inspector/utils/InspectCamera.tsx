// import { Euler, Matrix4, Vector3 } from 'three';
// import InspectorField from './InspectorField';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from "../../types";
import RemoteThree from '@/core/remote/RemoteThree';

export function InspectCamera(object: RemoteObject, three: RemoteThree): any {
  console.log('InspectCamera:', object);

  const items: any[] = [];
  return (
    <InspectorGroup
      title="Camera"
      items={items}
    />
  );
}
