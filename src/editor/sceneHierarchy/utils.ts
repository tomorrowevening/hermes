import { Object3D } from 'three';
import { MinimumObject, RemoteObject } from './types';

export function determineIcon(obj: Object3D): string {
  if (obj.name === 'cameras') {
    return 'camera';
  } else if (obj.name === 'interactive') {
    return 'interactive';
  } else if (obj.name === 'lights') {
    return 'light';
  } else if (obj.name === 'ui') {
    return 'ui';
  } else if (obj.name === 'utils') {
    return 'utils';
  }

  const type = obj.type;
  if (type.search('Helper') > -1) {
    return 'icon_utils';
  } else if (type.search('Camera') > -1) {
    return 'camera';
  } else if (type.search('Light') > -1) {
    return 'light';
  }
  return 'obj3D';
}

export function stripScene(obj: Object3D): MinimumObject {
  const min: MinimumObject = {
    name: obj.name,
    type: obj.type,
    uuid: obj.uuid,
    children: [],
  };
  obj.children.forEach((child: Object3D) => {
    min.children.push(stripScene(child));
  });
  return min;
}

export function stripObject(obj: Object3D): RemoteObject {
  obj.updateMatrix();
  return {
    name: obj.name,
    type: obj.type,
    uuid: obj.uuid,
    visible: obj.visible,
    matrix: obj.matrix.elements,
  };
}
