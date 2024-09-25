import { Euler, Matrix4, Vector3 } from 'three';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from '../../types';
import RemoteThree from '@/core/remote/RemoteThree';
import { setItemProps } from '../../utils';

export function InspectTransform(object: RemoteObject, three: RemoteThree) {
  const matrix = new Matrix4();
  matrix.elements = object.matrix;
  const position = new Vector3();
  const rotation = new Euler();
  const scale = new Vector3();
  if (object.uuid.length > 0) {
    position.setFromMatrixPosition(matrix);
    rotation.setFromRotationMatrix(matrix);
    scale.setFromMatrixScale(matrix);
  }

  const updateTransform = (prop: string, value: any) => {
    const realValue = prop === 'rotation' ? { x: value._x, y: value._y, z: value._z } : value;

    // App
    three.updateObject(object.uuid, prop, realValue);

    // Editor
    const scene = three.getScene(object.uuid);
    if (scene !== null) {
      const child = scene.getObjectByProperty('uuid', object.uuid);
      setItemProps(child, prop, realValue);
    }
  };

  return (
    <InspectorGroup
      title='Transform'
      items={[
        {
          title: 'Position',
          prop: 'position',
          type: 'grid3',
          step: 0.1,
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
        {
          title: 'Visible',
          prop: 'visible',
          type: 'boolean',
          value: object.visible,
          onChange: updateTransform,
        },
      ]}
    />
  );
}
