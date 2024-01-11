import { Euler, Matrix4, Vector3 } from 'three';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from "../../types";
import RemoteThree from '@/core/remote/RemoteThree';
import { setItemProps } from '../../utils';
import { round } from '@/editor/utils';

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

  const updateRotation = (prop: string, value: any) => {
    updateTransform(prop, degToRad(value));
  };

  return (
    <InspectorGroup
      title="Transform"
      items={[
        {
          title: 'Position X',
          prop: 'position.x',
          type: 'number',
          value: position.x,
          onChange: updateTransform,
        },
        {
          title: 'Position Y',
          prop: 'position.y',
          type: 'number',
          value: position.y,
          onChange: updateTransform,
        },
        {
          title: 'Position Z',
          prop: 'position.z',
          type: 'number',
          value: position.z,
          onChange: updateTransform,
        },
        {
          title: 'Rotation X',
          prop: 'rotation.x',
          type: 'number',
          value: round(radToDeg(rotation.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: updateRotation,
        },
        {
          title: 'Rotation Y',
          prop: 'rotation.y',
          type: 'number',
          value: round(radToDeg(rotation.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: updateRotation,
        },
        {
          title: 'Rotation Z',
          prop: 'rotation.z',
          type: 'number',
          value: round(radToDeg(rotation.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: updateRotation,
        },
        {
          title: 'Scale X',
          prop: 'scale.x',
          type: 'number',
          value: scale.x,
          step: 0.01,
          onChange: updateTransform,
        },
        {
          title: 'Scale Y',
          prop: 'scale.y',
          type: 'number',
          value: scale.y,
          step: 0.01,
          onChange: updateTransform,
        },
        {
          title: 'Scale Z',
          prop: 'scale.z',
          type: 'number',
          value: scale.z,
          step: 0.01,
          onChange: updateTransform,
        },
      ]}
    />
  );
}
