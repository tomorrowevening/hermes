import { Material, Mesh, Object3D } from 'three';
import { MinimumObject, RemoteMaterial, RemoteObject } from './types';

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

function cleanUniforms(obj: any) {
  const newObj = {};
  for (const i in obj) {
    const value = obj[i].value;
    // @ts-ignore
    newObj[i] = { value: value };
    if (value.isTexture) {
      // @ts-ignore
      newObj[i].value = {
        src: value.image.src,
      };
    }
  }
  return newObj;
}

function stripMaterialData(material: Material): RemoteMaterial {
  const materialData = {};
  for (const i in material) {
    if (i.substring(0, 1) === '_' || i.substring(0, 2) === 'is') continue;

    // @ts-ignore
    const type = typeof material[i];
    // @ts-ignore
    const value = material[i];
    switch (type) {
      case 'boolean':
      case 'number':
      case 'string':
        // @ts-ignore
        materialData[i] = value;
        break;
      case 'object':
        if (value !== null) {
          // @ts-ignore
          materialData[i] = value;
          if (i === 'uniforms') {
            // @ts-ignore
            materialData[i] = cleanUniforms(materialData[i]);
          }
        }
        break;
    }
  }

  return materialData as RemoteMaterial;
}

export function stripObject(obj: Object3D): RemoteObject {
  obj.updateMatrix();

  const stripped: RemoteObject = {
    name: obj.name,
    type: obj.type,
    uuid: obj.uuid,
    visible: obj.visible,
    matrix: obj.matrix.elements,
  };

  if (obj instanceof Mesh) {
    const mesh = obj as Mesh;
    if (Array.isArray(mesh.material)) {
      const data: RemoteMaterial[] = [];
      mesh.material.forEach((material: Material) => {
        data.push(stripMaterialData(material));
      });
      stripped.material = data;
    } else {
      stripped.material = stripMaterialData(mesh.material);
    }
  }
  return stripped;
}
