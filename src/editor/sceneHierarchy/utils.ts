import { Object3D } from 'three';
import type { MinimumObject } from './types';

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
    uuid: obj.uuid,
    type: obj.type,
    children: [],
  };
  obj.children.forEach((child: Object3D) => {
    min.children.push(stripScene(child));
  });
  return min;
}
