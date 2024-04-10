import { AddEquation, AdditiveBlending, BackSide, Color, ConstantAlphaFactor, ConstantColorFactor, CustomBlending, DoubleSide, DstAlphaFactor, DstColorFactor, FrontSide, MaxEquation, MinEquation, MultiplyBlending, NoBlending, NormalBlending, OneFactor, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, ReverseSubtractEquation, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, SubtractEquation, SubtractiveBlending, Texture, ZeroFactor } from 'three';
import InspectorGroup from '../InspectorGroup';
import { RemoteMaterial, RemoteObject } from '../../types';
import RemoteThree from '@/core/remote/RemoteThree';
import { setItemProps, textureFromSrc } from '../../utils';
import { capitalize } from '@/editor/utils';

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
  return (
    name.toLowerCase().search('intensity') > -1 ||
    name === 'anisotropyRotation' ||
    name === 'blendAlpha' ||
    name === 'bumpScale' ||
    name === 'clearcoatRoughness' ||
    name === 'displacementBias' ||
    name === 'displacementScale' ||
    name === 'metalness' ||
    name === 'opacity' ||
    name === 'reflectivity' ||
    name === 'refractionRatio' ||
    name === 'roughness' ||
    name === 'sheenRoughness' ||
    name === 'thickness'
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
      three.updateObject(object.uuid, `material.${prop}`, value);
      three.updateObject(object.uuid, 'material.needsUpdate', true);
      // Local update
      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
      if (child !== undefined) setItemProps(child, `material.${prop}`, value);
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
      three.updateObject(object.uuid, `material.${prop}`, value);
      three.updateObject(object.uuid, 'material.needsUpdate', true);
      // Local update
      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
      if (child !== undefined) setItemProps(child, `material.${prop}`, value);
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
    field.min = 0;
    // @ts-ignore
    field.max = 1;
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
      three.updateObject(object.uuid, `material.${prop}`, value);
      three.updateObject(object.uuid, 'material.needsUpdate', true);
      // Local update
      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
      if (child !== undefined) setItemProps(child, `material.${prop}`, value);
    },
  };

  const isShader = prop === 'vertexShader' || prop === 'fragmentShader';
  if (isShader) {
    field['disabled'] = false;
    field['latest'] = field.value;
    field.onChange = (_: string, updatedValue: string) => {
      field['latest'] = updatedValue;
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

function inspectObject(prop: string, value: any, object: RemoteObject, three: RemoteThree): any {
  const subChildren: any[] = [];
  if (value.isColor) {
    return {
      title: prettyName(prop),
      prop: prop,
      type: 'color',
      value: value,
      onChange: (_: string, updatedValue: any) => {
        const newValue = new Color(updatedValue);
        three.updateObject(object.uuid, `material.${prop}`, newValue);
        // Local update
        const child = three.scene?.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.${prop}`, newValue);
      },
    };
  } else if (Array.isArray(value)) {
    for (const index in value) {
      subChildren.push({
        title: `${index}`,
        type: `${typeof value[index]}`,
        value: value[index],
        onChange: (_: string, updatedValue: any) => {
          three.updateObject(object.uuid, `material.${prop}`, updatedValue);
          // Local update
          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${prop}`, updatedValue);
        },
      });
    }
    return {
      title: prettyName(prop),
      items: subChildren,
    };
  } else if (isVector2(value)) {
    return {
      title: prettyName(prop),
      prop: prop,
      type: 'vector',
      value: value,
      onChange: (_: string, value: any) => {
        three.updateObject(object.uuid, `material.${prop}`, value);
        // Local update
        const child = three.scene?.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) setItemProps(child, `material.${prop}`, value);
      },
    };
  } else if (isVector3(value)) {
    const subkids: any = [
      {
        title: 'X',
        prop: prop,
        type: 'number',
        value: value,
        step: 0.01,
        onChange: (_: string, value: any) => {
          three.updateObject(object.uuid, `material.${prop}.x`, value);
          // Local update
          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${prop}.x`, value);
        },
      },
      {
        title: 'Y',
        prop: prop,
        type: 'number',
        value: value,
        step: 0.01,
        onChange: (_: string, value: any) => {
          three.updateObject(object.uuid, `material.${prop}.y`, value);
          // Local update
          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${prop}.y`, value);
        },
      },
      {
        title: 'Z',
        prop: prop,
        type: 'number',
        value: value,
        step: 0.01,
        onChange: (_: string, value: any) => {
          three.updateObject(object.uuid, `material.${prop}.z`, value);
          // Local update
          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${prop}.z`, value);
        },
      }
    ];
    subkids.sort((a: any, b: any) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    return {
      title: prettyName(prop),
      items: subkids,
    };
  } else if (value.src !== undefined) {
    return {
      title: prettyName(prop),
      type: 'image',
      value: value,
      onChange: (prop: string, updatedValue: any) => {
        three.createTexture(object.uuid, `material.${prop}`, updatedValue);
        // Local update
        const child = three.scene?.getObjectByProperty('uuid', object.uuid);
        if (child !== undefined) {
          textureFromSrc(updatedValue).then((texture: Texture) => {
            setItemProps(child, `material.${prop}`, texture);
            setItemProps(child, `material.needsUpdate`, true);
          });
        }
      },
    };
  } else {
    switch (prop) {
      case 'defines':
        for (const index in value) {
          subChildren.push({
            title: capitalize(`${index}`),
            type: 'string',
            value: value[index].toString(),
            disabled: true,
          });
        }
        if (subChildren.length > 0) {
          return {
            title: prettyName(prop),
            items: subChildren,
          };
        }
        break;
      case 'extensions':
        for (const index in value) {
          subChildren.push({
            title: capitalize(`${index}`),
            type: 'boolean',
            value: value[index],
            disabled: true,
          });
        }
        if (subChildren.length > 0) {
          return {
            title: prettyName(prop),
            items: subChildren,
          };
        }
        break;
      case 'uniforms':
        for (const index in value) {
          const subvalue = value[index].value;
          const subtype = typeof subvalue;
          if (subvalue.isColor) {
            subChildren.push({
              title: prettyName(index),
              prop: index,
              type: 'color',
              value: subvalue,
              onChange: (_: string, updatedValue: any) => {
                const newValue = new Color(updatedValue);
                three.updateObject(object.uuid, `material.uniforms.${index}.value`, newValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value`, newValue);
              },
            });
          } else if (Array.isArray(subvalue)) {
            const subitems: any[] = [];
            for (const a in subvalue) {
              subitems.push({
                title: `${a}`,
                type: `${typeof subvalue[a]}`,
                value: subvalue[a],
                onChange: (_: string, updatedValue: any) => {
                  three.updateObject(object.uuid, `material.uniforms.${index}.value.${a}`, updatedValue);
                  // Local update
                  const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                  if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.${a}`, updatedValue);
                },
              });
            }
            subChildren.push({
              title: prettyName(index),
              items: subitems,
            });
          } else if (isVector2(subvalue)) {
            subChildren.push({
              title: `${prettyName(index)}`,
              prop: index,
              type: 'vector',
              value: subvalue,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value`, updatedValue);
              },
            });
          } else if (isVector3(subvalue)) {
            const vector: any[] = [];
            vector.push({
              title: 'X',
              prop: index,
              type: 'number',
              value: subvalue.x,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.x`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.x`, updatedValue);
              },
            });
            vector.push({
              title: 'Y',
              prop: index,
              type: 'number',
              value: subvalue.y,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.y`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.y`, updatedValue);
              },
            });
            vector.push({
              title: 'Z',
              prop: index,
              type: 'number',
              value: subvalue.z,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.z`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.z`, updatedValue);
              },
            });
            subChildren.push({
              title: prettyName(index),
              items: vector,
            });
          } else if (isVector4(subvalue)) {
            const vector: any[] = [];
            vector.push({
              title: 'X',
              prop: index,
              type: 'number',
              value: subvalue.x,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.x`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.x`, updatedValue);
              },
            });
            vector.push({
              title: 'Y',
              prop: index,
              type: 'number',
              value: subvalue.y,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.y`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.y`, updatedValue);
              },
            });
            vector.push({
              title: 'Z',
              prop: index,
              type: 'number',
              value: subvalue.z,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.z`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.z`, updatedValue);
              },
            });
            vector.push({
              title: 'W',
              prop: index,
              type: 'number',
              value: subvalue.w,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value.w`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.w`, updatedValue);
              },
            });
            subChildren.push({
              title: prettyName(index),
              items: vector,
            });
          } else if (subtype === 'number') {
            subChildren.push({
              title: prettyName(index),
              prop: index,
              type: 'number',
              value: subvalue,
              step: 0.01,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value`, updatedValue);
              },
            });
          } else if (subtype === 'string') {
            subChildren.push({
              title: prettyName(index),
              prop: index,
              type: subtype,
              value: subvalue,
              onChange: (_: string, updatedValue: any) => {
                three.updateObject(object.uuid, `material.uniforms.${index}.value`, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value`, updatedValue);
              },
            });
          } else if (subvalue.src !== undefined) {
            subChildren.push({
              title: prettyName(index),
              type: 'image',
              value: subvalue.src,
              onChange: (_: string, updatedValue: any) => {
                const uniformName = `material.uniforms.${index}.value`;
                three.createTexture(object.uuid, uniformName, updatedValue);
                // Local update
                const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                if (child !== undefined) {
                  textureFromSrc(updatedValue).then((texture: Texture) => {
                    setItemProps(child, uniformName, texture);
                    setItemProps(child, `material.needsUpdate`, true);
                  });
                }
              },
            });
          } else if (subvalue.elements !== undefined) {
            const subitems: any[] = [];
            for (const a in subvalue.elements) {
              subitems.push({
                title: `${a}`,
                type: 'number',
                value: subvalue.elements[a],
                step: 0.01,
                onChange: (_: string, updatedValue: any) => {
                  three.updateObject(object.uuid, `material.uniforms.${index}.value.elements[${a}]`, updatedValue);
                  // Local update
                  const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                  if (child !== undefined) setItemProps(child, `material.uniforms.${index}.value.elements[${a}]`, updatedValue);
                },
              });
            }
            subChildren.push({
              title: prettyName(index),
              items: subitems,
            });
          } else {
            const subkids: any[] = [];
            const customUniform = subvalue;
            for (const n in customUniform) {
              const subkidName = n;
              const subkidValue = customUniform[n];
              const subkidType = typeof subkidValue;
              const path = `material.uniforms.${index}.value.${subkidName}`;
              if (subkidValue.isColor) {
                subkids.push({
                  title: prettyName(subkidName),
                  prop: subkidName,
                  type: 'color',
                  value: subkidValue,
                  onChange: (_: string, updatedValue: any) => {
                    const newValue = new Color(updatedValue);
                    three.updateObject(object.uuid, path, newValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, path, newValue);
                  },
                });
              } else if (isVector2(subkidValue)) {
                subkids.push({
                  title: `${prettyName(subkidName)}`,
                  prop: subkidName,
                  type: 'vector',
                  value: subkidValue,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, path, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, path, updatedValue);
                  },
                });
              } else if (isVector3(subkidValue)) {
                const vector: any[] = [];
                vector.push({
                  title: 'X',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.x,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.x`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.x`, updatedValue);
                  },
                });
                vector.push({
                  title: 'Y',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.y,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.y`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.y`, updatedValue);
                  },
                });
                vector.push({
                  title: 'Z',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.z,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.z`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.z`, updatedValue);
                  },
                });
                subkids.push({
                  title: prettyName(subkidName),
                  items: vector,
                });
              } else if (isVector4(subkidValue)) {
                const vector: any[] = [];
                vector.push({
                  title: 'X',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.x,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.x`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.x`, updatedValue);
                  },
                });
                vector.push({
                  title: 'Y',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.y,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.y`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.y`, updatedValue);
                  },
                });
                vector.push({
                  title: 'Z',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.z,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.z`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.z`, updatedValue);
                  },
                });
                vector.push({
                  title: 'W',
                  prop: subkidName,
                  type: 'number',
                  value: subvalue.w,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, `${path}.w`, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `${path}.w`, updatedValue);
                  },
                });
                subkids.push({
                  title: prettyName(subkidName),
                  items: vector,
                });
              } else if (subkidType === 'number') {
                subkids.push({
                  title: prettyName(subkidName),
                  prop: subkidName,
                  type: 'number',
                  value: subkidValue,
                  step: 0.01,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, path, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, path, updatedValue);
                  },
                });
              } else if (subkidType === 'string') {
                subkids.push({
                  title: prettyName(subkidName),
                  prop: subkidName,
                  type: 'string',
                  value: subkidValue,
                  onChange: (_: string, updatedValue: any) => {
                    three.updateObject(object.uuid, path, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, path, updatedValue);
                  },
                });
              } else if (subkidValue.src !== undefined) {
                subkids.push({
                  title: prettyName(subkidName),
                  type: 'image',
                  value: subkidValue.src,
                  onChange: (_: string, updatedValue: any) => {
                    three.createTexture(object.uuid, path, updatedValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) {
                      textureFromSrc(updatedValue).then((texture: Texture) => {
                        setItemProps(child, path, texture);
                        setItemProps(child, `material.needsUpdate`, true);
                      });
                    }
                  },
                });
              } else if (subkidValue.elements !== undefined) {
                //
              }
            }
            subkids.sort((a: any, b: any) => {
              if (a.title < b.title) return -1;
              if (a.title > b.title) return 1;
              return 0;
            });
            if (subkids.length > 0) {
              subChildren.push({
                title: capitalize(index),
                items: subkids,
              });
            }
          }
        }

        subChildren.sort((a: any, b: any) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });

        if (subChildren.length > 0) {
          return {
            title: prettyName(prop),
            items: subChildren,
          };
        }
        break;
      default:
        console.log('>>> other prop to add...', prop);
        break;
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
  items.sort((a: any, b: any) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  items.push({
    title: 'Update Material',
    type: 'button',
    onChange: () => {
      three.updateObject(object.uuid, `material.needsUpdate`, true);
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