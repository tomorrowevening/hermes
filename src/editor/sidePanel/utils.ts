import { AnimationClip, CubeTexture, Line, Material, Mesh, Object3D, Points, RepeatWrapping, Texture } from 'three';
import { MinimumObject, RemoteMaterial, RemoteObject } from './types';
import { ExportTexture } from '../utils';

export function determineIcon(obj: RemoteObject): string {
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
    newObj[i] = { value: value };
    if (value === null) {
      newObj[i].value = {
        src: '',
        offset: [0, 0],
        repeat: [1, 1],
      };
    } else if (value !== undefined && value.isTexture) {
      newObj[i].value = {
        src: value.image.src,
        offset: [value.offset.x, value.offset.y],
        repeat: [value.repeat.x, value.repeat.y],
      };
    }
  }
  return newObj;
}

function skipPropertyName(value: string): boolean {
  switch (value) {
    case 'blendSrcAlpha':
    case 'blendDstAlpha':
    case 'blendEquationAlpha':
    case 'clippingPlanes':
    case 'shadowSide':
    case 'precision':
      return true;
  }
  return false;
}

function stripMaterialData(material: Material): RemoteMaterial {
  const materialData = {};
  for (const i in material) {
    if (i.substring(0, 1) === '_' || i.substring(0, 2) === 'is') continue;
    if (skipPropertyName(i)) continue;

    const type = typeof material[i];
    const value = material[i];
    switch (type) {
      case 'boolean':
      case 'number':
      case 'string':
        materialData[i] = value;
        break;
      case 'object':
        if (value !== null) {
          materialData[i] = value;
          if (value.isTexture) {
            materialData[i] = {
              src: ExportTexture.renderToBlob(value),
              offset: [value.offset.x, value.offset.y],
              repeat: [value.repeat.x, value.repeat.y],
            };
          } else if (i === 'uniforms') {
            materialData[i] = cleanUniforms(materialData[i]);
          }
        } else {
          if (i === 'glslVersion') {
            materialData[i] = '';
          } else {
            materialData[i] = {
              src: '',
              offset: [0, 0],
              repeat: [1, 1],
            };
          }
        }
        break;
    }
  }

  return materialData as RemoteMaterial;
}

export function convertImageToBase64(imgElement: HTMLImageElement): string {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set the canvas dimensions to match the image
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;

  // Draw the image onto the canvas
  ctx!.drawImage(imgElement, 0, 0);

  // Get the Base64 representation of the image from the canvas
  return canvas.toDataURL('image/png');
}

export function stripObject(obj: Object3D): RemoteObject {
  obj.updateMatrix();

  const stripped: RemoteObject = {
    name: obj.name,
    type: obj.type,
    uuid: obj.uuid,
    visible: obj.visible,
    matrix: obj.matrix.elements,
    animations: [],
    material: undefined,
    perspectiveCameraInfo: undefined,
    orthographicCameraInfo: undefined,
    lightInfo: undefined,
    children: [],
  };

  // Animations
  obj.animations.forEach((clip: AnimationClip) => {
    stripped.animations.push({
      name: clip.name,
      duration: clip.duration,
      blendMode: clip.blendMode,
    });
  });

  const type = obj.type.toLowerCase();
  if (type.search('mesh') > -1) {
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
  } else if (type.search('points') > -1) {
    const mesh = obj as Points;
    if (Array.isArray(mesh.material)) {
      const data: RemoteMaterial[] = [];
      mesh.material.forEach((material: Material) => {
        data.push(stripMaterialData(material));
      });
      stripped.material = data;
    } else {
      stripped.material = stripMaterialData(mesh.material);
    }
  } else if (type.search('line') > -1) {
    const mesh = obj as Line;
    if (Array.isArray(mesh.material)) {
      const data: RemoteMaterial[] = [];
      mesh.material.forEach((material: Material) => {
        data.push(stripMaterialData(material));
      });
      stripped.material = data;
    } else {
      stripped.material = stripMaterialData(mesh.material);
    }
  } else if (type.search('camera') > -1) {
    if (obj.type === 'PerspectiveCamera') {
      stripped.perspectiveCameraInfo = {
        fov: obj['fov'],
        zoom: obj['zoom'],
        near: obj['near'],
        far: obj['far'],
        focus: obj['focus'],
        aspect: obj['aspect'],
        filmGauge: obj['filmGauge'],
        filmOffset: obj['filmOffset'],
      };
    } else if (obj.type === 'OrthographicCamera') {
      stripped.orthographicCameraInfo = {
        zoom: obj['zoom'],
        near: obj['near'],
        far: obj['far'],
        left: obj['left'],
        right: obj['right'],
        top: obj['top'],
        bottom: obj['bottom'],
      };
    }
  } else if (type.search('light') > -1) {
    stripped.lightInfo = {
      color: obj['color'],
      intensity: obj['intensity'],
      decay: obj['decay'],
      distance: obj['distance'],
      angle: obj['angle'],
      penumbra: obj['penumbra'],
      groundColor: obj['groundColor'],
      width: obj['width'],
      height: obj['height'],
    };
  }

  return stripped;
}

export function getSubItem(child: any, key: string): any {
  const keys = key.split('.');
  const total = keys.length;
  switch (total) {
    case 1:
      return child[keys[0]];
    case 2:
      return child[keys[0]][keys[1]];
    case 3:
      return child[keys[0]][keys[1]][keys[2]];
    case 4:
      return child[keys[0]][keys[1]][keys[2]][keys[3]];
    case 5:
      return child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]];
    case 6:
      return child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]];
  }
  return undefined;
}

function cycleObject(obj: any, value: any) {
  for (const i in value) obj[i] = value[i];
}

export function setItemProps(child: any, key: string, value: any) {
  if (child === undefined) {
    // console.log(`Hermes - Can't set props: ${key}`, value);
    return;
  }

  const keys = key.split('.');
  const total = keys.length;
  const setValue = typeof value !== 'object';
  if (setValue) {
    switch (total) {
      case 1:
        child[keys[0]] = value;
        break;
      case 2:
        child[keys[0]][keys[1]] = value;
        break;
      case 3:
        child[keys[0]][keys[1]][keys[2]] = value;
        break;
      case 4:
        child[keys[0]][keys[1]][keys[2]][keys[3]] = value;
        break;
      case 5:
        child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value;
        break;
    }
  } else {
    let target = undefined;
    switch (total) {
      case 1:
        target = child[keys[0]];
        break;
      case 2:
        target = child[keys[0]][keys[1]];
        break;
      case 3:
        target = child[keys[0]][keys[1]][keys[2]];
        break;
      case 4:
        target = child[keys[0]][keys[1]][keys[2]][keys[3]];
        break;
      case 5:
        target = child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]];
        break;
    }
    if (target !== undefined && target !== null) {
      cycleObject(target, value);
    }
  }
}

export function textureFromSrc(imgSource: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const texture = new Texture(img);
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.needsUpdate = true;
      resolve(texture);
    };
    img.onerror = reject;
    img.src = imgSource;
  });
}
