import { Euler, Matrix4, Vector3 } from 'three';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from "../../types";
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
    three.updateObject(obj.uuid, prop, value);
    const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
    if (child !== undefined) setItemProps(child, prop, value);
  };

  const items: any[] = [
    {
      title: 'Position',
      items: [
        {
          title: 'X',
          prop: 'position.x',
          type: 'number',
          value: position.x,
          onChange: updateTransform,
        },
        {
          title: 'Y',
          prop: 'position.y',
          type: 'number',
          value: position.y,
          onChange: updateTransform,
        },
        {
          title: 'Z',
          prop: 'position.z',
          type: 'number',
          value: position.z,
          onChange: updateTransform,
        },
      ],
    },
    {
      title: 'Rotation',
      items: [
        {
          title: 'X',
          prop: 'rotation.x',
          type: 'number',
          value: rotation.x,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: updateTransform,
        },
        {
          title: 'Y',
          prop: 'rotation.y',
          type: 'number',
          value: rotation.y,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: updateTransform,
        },
        {
          title: 'Z',
          prop: 'rotation.z',
          type: 'number',
          value: rotation.z,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: updateTransform,
        },
      ],
    },
    {
      title: 'Scale',
      items: [
        {
          title: 'X',
          prop: 'scale.x',
          type: 'number',
          value: scale.x,
          step: 0.01,
          onChange: updateTransform,
        },
        {
          title: 'Y',
          prop: 'scale.y',
          type: 'number',
          value: scale.y,
          step: 0.01,
          onChange: updateTransform,
        },
        {
          title: 'Z',
          prop: 'scale.z',
          type: 'number',
          value: scale.z,
          step: 0.01,
          onChange: updateTransform,
        },
      ],
    },
  ];

  return (
    <InspectorGroup
      title="Transform"
      items={items}
    />
  );
}
