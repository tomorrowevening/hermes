import { Euler, Matrix4, Vector3 } from 'three';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from '../../types';
import RemoteThree from '@/core/remote/RemoteThree';
import { setItemProps } from '../../utils';

export function InspectTransform(obj: RemoteObject, three: RemoteThree) {
  const matrix = new Matrix4();
  matrix.elements = obj.matrix;
  const position = new Vector3();
  const rotation = new Euler();
  const scale = new Vector3();
  if (obj.uuid.length > 0) {
    position.setFromMatrixPosition(matrix);
    rotation.setFromRotationMatrix(matrix);
    scale.setFromMatrixScale(matrix);
  }

  const updateTransform = (prop: string, value: any) => {
    const realValue = prop === 'rotation' ? { x: value._x, y: value._y, z: value._z } : value;

    // App
    three.updateObject(obj.uuid, prop, realValue);

    // Editor
    const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
    if (child !== undefined) setItemProps(child, prop, realValue);
  };

  return (
    <InspectorGroup
      title='Transform'
      items={[
        {
          title: 'Position',
          prop: 'position',
          type: 'grid3',
          value: position,
          onChange: updateTransform,
        },
        {
          title: 'Rotation',
          prop: 'rotation',
          type: 'grid3',
          value: rotation,
          onChange: updateTransform,
        },
        {
          title: 'Scale',
          prop: 'scale',
          type: 'grid3',
          value: scale,
          onChange: updateTransform,
        },
      ]}
    />
  );
}
