import {
  AddEquation,
  AdditiveBlending,
  BackSide,
  Color,
  ConstantAlphaFactor,
  ConstantColorFactor,
  CustomBlending,
  DoubleSide,
  DstAlphaFactor,
  DstColorFactor,
  FrontSide,
  Material,
  MaxEquation,
  MinEquation,
  MultiplyBlending,
  NoBlending,
  NormalBlending,
  OneFactor,
  OneMinusConstantAlphaFactor,
  OneMinusConstantColorFactor,
  OneMinusDstAlphaFactor,
  OneMinusDstColorFactor,
  OneMinusSrcAlphaFactor,
  OneMinusSrcColorFactor,
  ReverseSubtractEquation,
  Source,
  SrcAlphaFactor,
  SrcAlphaSaturateFactor,
  SrcColorFactor,
  SubtractEquation,
  SubtractiveBlending,
  Texture,
  ZeroFactor,
} from 'three';
import InspectorGroup from '../InspectorGroup';
import { RemoteMaterial, RemoteObject } from '../../types';
import RemoteThree from '@/core/remote/RemoteThree';
import { setItemProps, textureFromSrc } from '../../utils';
import { KeyboardEvent } from 'react';

export function acceptedMaterialNames(name: string): boolean {
  return !(
    name === 'alphaHash' ||
    name === 'alphaToCoverage' ||
    name === 'attenuationDistance' ||
    name === 'blendAlpha' ||
    name === 'blendColor' ||
    name === 'blendDstAlpha' ||
    name === 'colorWrite' ||
    name === 'combine' ||
    name === 'defaultAttributeValues' ||
    name === 'depthFunc' ||
    name === 'forceSinglePass' ||
    name === 'glslVersion' ||
    name === 'linecap' ||
    name === 'linejoin' ||
    name === 'linewidth' ||
    name === 'normalMapType' ||
    name === 'precision' ||
    name === 'premultipliedAlpha' ||
    name === 'shadowSide' ||
    name === 'toneMapped' ||
    name === 'uniformsGroups' ||
    name === 'uniformsNeedUpdate' ||
    name === 'userData' ||
    name === 'vertexColors' ||
    name === 'version' ||
    name === 'wireframeLinecap' ||
    name === 'wireframeLinejoin' ||
    name === 'wireframeLinewidth' ||
    name.slice(0, 4) === 'clip' ||
    name.slice(0, 7) === 'polygon' ||
    name.slice(0, 7) === 'stencil' ||
    name.slice(0, 2) === 'is'
  );
}

export function imageNames(name: string): string {
  switch (name) {
    case 'Alpha Map': return 'alphaMap';
    case 'Anisotropy Map': return 'anisotropyMap';
    case 'AO Map': return 'aoMap';
    case 'Bump Map': return 'bumpMap';
    case 'Clearcoat Map': return 'clearcoatMap';
    case 'Clearcoat Normal Map': return 'clearcoatNormalMap';
    case 'Clearcoat Roughness Map': return 'clearcoatRoughnessMap';
    case 'Displacement Map': return 'displacementMap';
    case 'Emissive Map': return 'emissiveMap';
    case 'Iridescence Map': return 'iridescenceMap';
    case 'Iridescence Thickness Map': return 'iridescenceThicknessMap';
    case 'Map': return 'map';
    case 'Matcap': return 'matcap';
    case 'Normal Map': return 'normalMap';
    case 'Roughness Map': return 'roughnessMap';
    case 'Sheen Color Map': return 'sheenColorMap';
    case 'Sheen Roughness Map': return 'sheenRoughnessMap';
    case 'Specular Color Map': return 'specularColorMap';
    case 'Specular Map Intensity': return 'specularIntensityMap';
    case 'Thickness Map': return 'thicknessMap';
    case 'Transmission Map': return 'transmissionMap';
  }
  return name;
}

export function prettyName(name: string): string {
  switch (name) {
    case 'alphaMap': return 'Alpha Map';
    case 'anisotropyMap': return 'Anisotropy Map';
    case 'anisotropyRotation': return 'Anisotropy Rotation';
    case 'aoMap': return 'AO Map';
    case 'aoMapIntensity': return 'AO Map Intensity';
    case 'attenuationColor': return 'Attenuation Color';
    case 'blendAlpha': return 'Blend Alpha';
    case 'blendColor': return 'Blend Color';
    case 'blendDst': return 'Blend Dst';
    case 'blendDstAlpha': return 'Blend Dst Alha';
    case 'blendEquation': return 'Blend Equation';
    case 'blendEquationAlpha': return 'Blend Equation Alpha';
    case 'blending': return 'Blending';
    case 'blendSrc': return 'Blend Src';
    case 'blendSrcAlpha': return 'Blend Src Alpha';
    case 'bumpMap': return 'Bump Map';
    case 'bumpScale': return 'Bump Scale';
    case 'clearcoatMap': return 'Clearcoat Map';
    case 'clearcoatNormalMap': return 'Clearcoat Normal Map';
    case 'clearcoatNormalScale': return 'Clearcoat Normal Scale';
    case 'clearcoatRoughness': return 'Clearcoat Roughness';
    case 'clearcoatRoughnessMap': return 'Clearcoat Roughness Map';
    case 'color': return 'Color';
    case 'defines': return 'Defines';
    case 'depthTest': return 'Depth Test';
    case 'depthWrite': return 'Depth Write';
    case 'displacementBias': return 'Displacement Bias';
    case 'displacementMap': return 'Displacement Map';
    case 'displacementScale': return 'Displacement Scale';
    case 'dithering': return 'Dithering';
    case 'emissive': return 'Emissive';
    case 'emissiveMap': return 'Emissive Map';
    case 'emissiveIntensity': return 'Emissive Intensity';
    case 'envMap': return 'Environment Map';
    case 'envMapIntensity': return 'Environment Map Intensity';
    case 'extensions': return 'Extensions';
    case 'flatShading': return 'Flat Shading';
    case 'fragmentShader': return 'Fragment Shader';
    case 'fog': return 'Fog';
    case 'gradientMap': return 'Gradient Map';
    case 'ior': return 'IOR';
    case 'iridescenceIOR': return 'Iridescence IOR';
    case 'iridescenceMap': return 'Iridescence Map';
    case 'iridescenceThicknessMap': return 'Iridescence Thickness Map';
    case 'iridescenceThicknessRange': return 'Iridescence Thickness Range';
    case 'lights': return 'Lights';
    case 'lightMap': return 'Light Map';
    case 'lightMapIntensity': return 'Light Map Intensity';
    case 'map': return 'Map';
    case 'matcap': return 'Matcap';
    case 'metalness': return 'Metalness';
    case 'metalnessMap': return 'Metalness Map';
    case 'name': return 'Name';
    case 'normalMap': return 'Normal Map';
    case 'normalScale': return 'Normal Scale';
    case 'opacity': return 'Opacity';
    case 'reflectivity': return 'Reflectivity';
    case 'refractionRatio': return 'Refraction Ratio';
    case 'roughness': return 'Roughness';
    case 'roughnessMap': return 'Roughness Map';
    case 'sheenColor': return 'Sheen Color';
    case 'sheenColorMap': return 'Sheen Color Map';
    case 'sheenRoughness': return 'Sheen Roughness';
    case 'sheenRoughnessMap': return 'Sheen Roughness Map';
    case 'shininess': return 'Shininess';
    case 'side': return 'Side';
    case 'size': return 'Size';
    case 'sizeAttenuation': return 'Size Attenuation';
    case 'specular': return 'Specular';
    case 'specularColor': return 'Specular Color';
    case 'specularColorMap': return 'Specular Color Map';
    case 'specularIntensity': return 'Specular Intensity';
    case 'specularIntensityMap': return 'Specular Map Intensity';
    case 'thickness': return 'Thickness';
    case 'thicknessMap': return 'Thickness Map';
    case 'transmission': return 'Transmission';
    case 'transmissionMap': return 'Transmission Map';
    case 'transparent': return 'Transparent';
    case 'type': return 'Type';
    case 'uuid': return 'UUID';
    case 'uniforms': return 'Uniforms';
    case 'vertexShader': return 'Vertex Shader';
    case 'visible': return 'Visible';
    case 'wireframe': return 'Wireframe';
  }
  return name;
}

export function clampedNames(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower.search('intensity') > -1 ||
    lower === 'anisotropyrotation' ||
    lower === 'blendalpha' ||
    lower === 'bumpscale' ||
    lower === 'clearcoatroughness' ||
    lower === 'displacementbias' ||
    lower === 'displacementscale' ||
    lower === 'metalness' ||
    lower === 'opacity' ||
    lower === 'reflectivity' ||
    lower === 'refractionratio' ||
    lower === 'roughness' ||
    lower === 'sheenroughness' ||
    lower === 'thickness'
  );
}

export function uploadLocalImage(): Promise<string> {
  const inputElement = document.createElement('input');
  inputElement.type = 'file';
  return new Promise((resolve: any, reject: any) => {
    inputElement.addEventListener('change', function() {
      if (inputElement.files  === null) {
        reject();
      } else {
        const selectedFile = inputElement.files[0];
        const reader = new FileReader();
        reader.onload = function(e: any) {
          resolve(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    });
    inputElement.click();
  });
}

// Material side

const materialSideOpts: any[] = [
  {
    title: 'Front',
    value: FrontSide,
  },
  {
    title: 'Back',
    value: BackSide,
  },
  {
    title: 'Double',
    value: DoubleSide,
  },
];

// Blending

const blendingOpts: any[] = [
  {
    title: 'No Blending',
    value: NoBlending,
  },
  {
    title: 'Normal',
    value: NormalBlending,
  },
  {
    title: 'Additive',
    value: AdditiveBlending,
  },
  {
    title: 'Subtractive',
    value: SubtractiveBlending,
  },
  {
    title: 'Multiply',
    value: MultiplyBlending,
  },
  {
    title: 'Custom',
    value: CustomBlending,
  }
];

const blendingEquationOpts: any[] = [
  {
    title: 'Add',
    value: AddEquation,
  }, 
  {
    title: 'Subtract',
    value: SubtractEquation,
  }, 
  {
    title: 'Reverse Subtract',
    value: ReverseSubtractEquation,
  },
  {
    title: 'Min',
    value: MinEquation,
  }, 
  {
    title: 'Max',
    value: MaxEquation,
  },
];

// Blending Equations (Source)
const blendSourceOpts: any[] = [
  {
    title: 'Zero',
    valye: ZeroFactor,
  },
  {
    title: 'One',
    valye: OneFactor,
  },
  {
    title: 'Src Color',
    valye: SrcColorFactor,
  },
  {
    title: 'One Minus Src Color',
    valye: OneMinusSrcColorFactor,
  },
  {
    title: 'Src Alpha',
    valye: SrcAlphaFactor,
  },
  {
    title: 'One Minus Src Alpha',
    valye: OneMinusSrcAlphaFactor,
  },
  {
    title: 'Dst Alpha',
    valye: DstAlphaFactor,
  },
  {
    title: 'One Minus Dst Alpha',
    valye: OneMinusDstAlphaFactor,
  },
  {
    title: 'Dst Color',
    valye: DstColorFactor,
  },
  {
    title: 'One Minus Dst Color',
    valye: OneMinusDstColorFactor,
  },
  {
    title: 'Src Alpha Saturate',
    valye: SrcAlphaSaturateFactor,
  },
  {
    title: 'Constant Color',
    valye: ConstantColorFactor,
  },
  {
    title: 'One Minus Constant Color',
    valye: OneMinusConstantColorFactor,
  },
  {
    title: 'Constant Alpha',
    valye: ConstantAlphaFactor,
  },
  {
    title: 'One Minus Constant Alpha',
    valye: OneMinusConstantAlphaFactor,
  },
];

// Blending Equations (Destination)
const blendDestinationOpts: any[] = [
  {
    title: 'Zero',
    valye: ZeroFactor,
  },
  {
    title: 'One',
    valye: OneFactor,
  },
  {
    title: 'Src Color',
    valye: SrcColorFactor,
  },
  {
    title: 'One Minus Src Color',
    valye: OneMinusSrcColorFactor,
  },
  {
    title: 'Src Alpha',
    valye: SrcAlphaFactor,
  },
  {
    title: 'One Minus Src Alpha',
    valye: OneMinusSrcAlphaFactor,
  },
  {
    title: 'Dst Alpha',
    valye: DstAlphaFactor,
  },
  {
    title: 'One Minus Dst Alpha',
    valye: OneMinusDstAlphaFactor,
  },
  {
    title: 'Dst Color',
    valye: DstColorFactor,
  },
  {
    title: 'One Minus Dst Color',
    valye: OneMinusDstColorFactor,
  },
  {
    title: 'Constant Color',
    valye: ConstantColorFactor,
  },
  {
    title: 'One Minus Constant Color',
    valye: OneMinusConstantColorFactor,
  },
  {
    title: 'Constant Alpha',
    valye: ConstantAlphaFactor,
  },
  {
    title: 'One Minus Constant Alpha',
    valye: OneMinusConstantAlphaFactor,
  },
];

function updateFieldOptions(obj: any, options: any[]) {
  obj.needsUpdate = true;
  obj.type = 'option';
  obj.options = options;
}

// Inspect Material types

function inspectBool(prop: string, value: boolean, object: RemoteObject, three: RemoteThree): any {
  return {
    type: 'boolean',
    title: prettyName(prop),
    prop: prop,
    value: value,
    needsUpdate: true,
    onChange: (_: string, value: any) => {
      // App
      three.updateObject(object.uuid, `material.${prop}`, value);
      three.updateObject(object.uuid, 'material.needsUpdate', true);

      // Editor
      const scene = three.getScene(object.uuid);
      if (scene !== null) {
        const child = scene.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.${prop}`, value);
      }
    },
  };
}

function inspecNumber(prop: string, value: number, object: RemoteObject, three: RemoteThree): any {
  const field = {
    type: 'number',
    title: prettyName(prop),
    prop: prop,
    value: value,
    min: undefined,
    max: undefined,
    step: 0.01,
    needsUpdate: true,
    onChange: (_: string, value: any) => {
      // App
      three.updateObject(object.uuid, `material.${prop}`, value);
      three.updateObject(object.uuid, 'material.needsUpdate', true);

      // Editor
      const scene = three.getScene(object.uuid);
      if (scene !== null) {
        const child = scene.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.${prop}`, value);
      }
    },
  };

  switch (prop) {
    case 'blending':
      updateFieldOptions(field, blendingOpts);
      break;
    case 'blendDst':
      updateFieldOptions(field, blendDestinationOpts);
      break;
    case 'blendEquation':
      updateFieldOptions(field, blendingEquationOpts);
      break;
    case 'blendSrc':
      updateFieldOptions(field, blendSourceOpts);
      break;
    case 'side':
      updateFieldOptions(field, materialSideOpts);
      break;
  }

  if (clampedNames(prop)) {
    field.value = Number(value);
    field.type = 'range';
    // @ts-ignore
    field.min = Math.min(0, field.value);
    // @ts-ignore
    field.max = Math.max(1, field.value);
    field.step = 0.01;
  }

  return field;
}

function inspectString(prop: string, value: boolean, object: RemoteObject, three: RemoteThree): any {
  const field = {
    type: 'string',
    title: prettyName(prop),
    prop: prop,
    value: value,
    needsUpdate: true,
    onChange: (_: string, value: any) => {
      // App
      three.updateObject(object.uuid, `material.${prop}`, value);
      three.updateObject(object.uuid, 'material.needsUpdate', true);

      // Editor
      const scene = three.getScene(object.uuid);
      if (scene !== null) {
        const child = scene.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.${prop}`, value);
      }
    },
    onKeyDown: (_: KeyboardEvent) => {
      //
    },
  };

  const isShader = prop === 'vertexShader' || prop === 'fragmentShader';
  if (isShader) {
    field['disabled'] = false;
    field['latest'] = field.value;
    field.onChange = (_: string, updatedValue: string) => {
      field['latest'] = updatedValue;

      // App
      three.updateObject(object.uuid, `material.${prop}`, updatedValue);
      
      // Editor
      const scene = three.getScene(object.uuid);
      if (scene !== null) {
        const child = scene.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.${prop}`, updatedValue);
      }
    };
    field.onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter' && (evt.altKey || evt.metaKey)) {
        // App
        three.updateObject(object.uuid, 'material.needsUpdate', true);

        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.needsUpdate`, true);
        }
      }
    };
  }

  return field;
}

function isVector2(obj: any) {
  return obj.x !== undefined && obj.y !== undefined && obj.z === undefined;
}

function isVector3(obj: any) {
  return obj.x !== undefined && obj.y !== undefined && obj.z !== undefined && obj.w === undefined;
}

function isVector4(obj: any) {
  return obj.x !== undefined && obj.y !== undefined && obj.z !== undefined && obj.w !== undefined;
}

function sortChildren(arr: any[]) {
  arr.sort((a: any, b: any) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
}

function inspectObject(prop: string, value: any, object: RemoteObject, three: RemoteThree, subprop = '', disabled = false): any {
  const propName = prettyName(prop).split('.')[0].replaceAll('[', '').replaceAll(']', '');
  const propPath = subprop.length > 0 ? `${subprop}.${prop}` : prop;
  const valueType = typeof value;

  if (valueType === 'boolean' || valueType === 'string') {
    return {
      title: propName,
      prop: propPath,
      type: valueType,
      value: value,
      disabled: disabled,
      onChange: (_: string, updatedValue: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, updatedValue);

        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, updatedValue);
        }
      },
    };
  } else if (valueType === 'number') {
    const numberOpt = {
      title: propName,
      prop: propPath,
      type: 'number',
      value: value,
      step: 0.01,
      disabled: disabled,
      onChange: (_: string, updatedValue: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, updatedValue);

        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, updatedValue);
        }
      },
    };
    if (clampedNames(propName)) {
      numberOpt.type = 'range';
      numberOpt['min'] = 0;
      numberOpt['max'] = 1;
    }
    return numberOpt;
  } else if (value.isColor) {
    return {
      title: propName,
      prop: propPath,
      type: 'color',
      value: value,
      disabled: disabled,
      onChange: (_: string, updatedValue: any) => {
        const newValue = new Color(updatedValue);

        // App
        three.updateObject(object.uuid, `material.${propPath}`, newValue);

        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, newValue);
        }
      },
    };
  } else if (Array.isArray(value)) {
    const children: any[] = [];
    for (const i in value) {
      const subvalue = value[i];
      const childName = `[${i.toString()}]`;
      if (subvalue.value !== undefined) {
        const subobj = inspectObject(`${childName}.value`, subvalue.value, object, three, propPath, disabled);
        if (subobj !== undefined) children.push(subobj);
      } else {
        const subobj = inspectObject(childName, subvalue, object, three, propPath, disabled);
        if (subobj !== undefined) children.push(subobj);
      }
    }
    if (children.length > 0) {
      sortChildren(children);
      return {
        title: propName,
        items: children,
      };
    }
  } else if (isVector2(value)) {
    return {
      title: propName,
      prop: propPath,
      type: 'vector2',
      value: value,
      disabled: disabled,
      onChange: (_: string, value: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, value);

        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, value);
        }
      },
    };
  } else if (isVector3(value)) {
    return {
      title: propName,
      prop: propPath,
      type: 'grid3',
      value: value,
      disabled: disabled,
      onChange: (_: string, value: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, value);
        
        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, value);
        }
      },
    };
  } else if (isVector4(value)) {
    return {
      title: propName,
      prop: propPath,
      type: 'grid4',
      value: value,
      disabled: disabled,
      onChange: (_: string, value: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, value);
        
        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, value);
        }
      },
    };
  } else if (value.isEuler) {
    return {
      title: propName,
      prop: propPath,
      type: 'euler',
      value: value,
      disabled: disabled,
      onChange: (_: string, value: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, value);
        
        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, value);
        }
      },
    };
  } else if (value.src !== undefined) {
    return {
      title: propName,
      type: 'image',
      value: value,
      disabled: disabled,
      onChange: (_: string, updatedValue: any) => {
        const imgName = imageNames(prop);
        const textName = subprop.length > 0 ? `${subprop}.${imgName}` : imgName;

        // App
        three.createTexture(object.uuid, `material.${textName}`, updatedValue);
        
        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) {
            textureFromSrc(updatedValue.src).then((texture: Texture) => {
              texture.offset.set(updatedValue.offset[0], updatedValue.offset[1]);
              texture.repeat.set(updatedValue.repeat[0], updatedValue.repeat[1]);

              const material = child['material'] as Material;
              const keys = textName.split('.');
              const total = keys.length;
              switch (total) {
                case 1:
                  material[keys[0]] = texture;
                  break;
                case 2:
                  material[keys[0]][keys[1]] = texture;
                  break;
                case 3:
                  material[keys[0]][keys[1]][keys[2]] = texture;
                  break;
                case 4:
                  material[keys[0]][keys[1]][keys[2]][keys[3]] = texture;
                  break;
                case 5:
                  material[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = texture;
                  break;
              }
              material.needsUpdate = true;
            });
          }
        }
      },
    };
  } else if (value.elements !== undefined) {
    return {
      title: propName,
      prop: propPath,
      type: value.elements.length > 9 ? 'grid4' : 'grid3',
      value: value,
      disabled: disabled,
      onChange: (_: string, updatedValue: any) => {
        // App
        three.updateObject(object.uuid, `material.${propPath}`, updatedValue);
        
        // Editor
        const scene = three.getScene(object.uuid);
        if (scene !== null) {
          const child = scene.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${propPath}`, updatedValue);
        }
      },
    };
  } else {
    const children: any[] = [];
    const childrenDisabled = prop === 'defines' || prop === 'extensions';
    try {
      for (const i in value) {
        const subvalue = value[i];
        if (subvalue !== undefined) {
          if (subvalue.value !== undefined) {
            const subobj = inspectObject(`${i}.value`, subvalue.value, object, three, propPath, childrenDisabled);
            if (subobj !== undefined) children.push(subobj);
          } else {
            const subobj = inspectObject(i, subvalue, object, three, propPath, childrenDisabled);
            if (subobj !== undefined) children.push(subobj);
          }
        }
      }
    } catch(_) {
      console.log('Issue cycling through material object:', prop, value);
    }
    if (children.length > 0) {
      sortChildren(children);
      return {
        title: propName,
        items: children,
      };
    }
  }

  return undefined;
}

export function inspectMaterialItems(material: RemoteMaterial, object: RemoteObject, three: RemoteThree): any[] {
  const items: any[] = [];
  for (const i in material) {
    if (!acceptedMaterialNames(i)) continue;

    const propType = typeof material[i];
    const value = material[i];
    if (propType === 'boolean') {
      items.push(inspectBool(i, value, object, three));
    } else if (propType === 'number') {
      items.push(inspecNumber(i, value, object, three));
    } else if (propType === 'string') {
      items.push(inspectString(i, value, object, three));
    } else if (propType === 'object') {
      const obj = inspectObject(i, value, object, three);
      if (obj !== undefined) items.push(obj);
    } else if (value !== undefined) {
      console.log('other:', i, propType, value);
    }
  }

  // Sort items
  sortChildren(items);

  items.push({
    title: 'Update Material',
    type: 'button',
    onChange: () => {
      // App
      three.updateObject(object.uuid, `material.needsUpdate`, true);

      // Editor
      const scene = three.getScene(object.uuid);
      if (scene !== null) {
        const child = scene.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.needsUpdate`, true);
      }
    },
  });

  return items;
}

// RemoteMaterial | RemoteMaterial[]
export function InspectMaterial(object: RemoteObject, three: RemoteThree): any {
  const material = object.material!;
  if (Array.isArray(material)) {
    const items: any[] = [];
    const total = material.length;
    for (let i = 0; i < total; i++) {
      items.push(
        <InspectorGroup
          title={`Material ${i}`}
          key={`Material ${i}`}
          items={inspectMaterialItems(material[i], object, three)}
        />
      );
    }
    return <>{items}</>;
  } else {
    return (
      <InspectorGroup
        title='Material'
        items={inspectMaterialItems(material, object, three)}
      />
    );
  }
  return null;
}