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

export function inspectMaterialItems(material: RemoteMaterial, object: RemoteObject, three: RemoteThree): any[] {
  const items: any[] = [];
  for (const i in material) {
    if (!acceptedMaterialNames(i)) continue;

    const propType = typeof material[i];
    const value = material[i];
    if (propType === 'boolean' || propType === 'number' || propType === 'string') {
      const newField = {
        title: prettyName(i),
        prop: i,
        type: propType,
        value: value,
        min: undefined,
        max: undefined,
        needsUpdate: propType === 'boolean',
        onChange: (prop: string, value: any) => {
          three.updateObject(object.uuid, `material.${prop}`, value);
          if (newField.needsUpdate) three.updateObject(object.uuid, 'material.needsUpdate', true);
          // Local update
          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) setItemProps(child, `material.${prop}`, value);
        },
      };

      switch (i) {
        case 'blending':
          updateFieldOptions(newField, blendingOpts);
          break;
        case 'blendDst':
          updateFieldOptions(newField, blendDestinationOpts);
          break;
        case 'blendEquation':
          updateFieldOptions(newField, blendingEquationOpts);
          break;
        case 'blendSrc':
          updateFieldOptions(newField, blendSourceOpts);
          break;
        case 'side':
          updateFieldOptions(newField, materialSideOpts);
          break;
      }

      if (clampedNames(i)) {
        newField.value = Number(value);
        // @ts-ignore
        newField.type = 'range';
        // @ts-ignore
        newField.min = 0;
        // @ts-ignore
        newField.max = 1;
        // @ts-ignore
        newField.step = 0.01;
      }

      const isShader = propType === 'string' && (i === 'vertexShader' || i === 'fragmentShader');
      if (isShader) {
        newField['disabled'] = false;
        newField['latest'] = newField.value;
        newField.onChange = (_: string, updatedValue: string) => {
          newField['latest'] = updatedValue;
        };
      }
      items.push(newField);

      if (isShader) {
        items.push({
          title: `${capitalize(i)} - Update`,
          type: 'button',
          onChange: () => {
            three.updateObject(object.uuid, `material.${i}`, newField['latest']);
            three.updateObject(object.uuid, 'material.needsUpdate', true);
            // Local update
            const child = three.scene?.getObjectByProperty('uuid', object.uuid);
            if (child !== undefined) {
              setItemProps(child, `material.${i}`, newField['latest']);
              child['material'].needsUpdate = true;
            }
          },
        });
      }
    } else if (propType === 'object') {
      if (value.isColor) {
        items.push({
          title: prettyName(i),
          prop: i,
          type: 'color',
          value: value,
          onChange: (prop: string, value: any) => {
            const newValue = new Color(value);
            three.updateObject(object.uuid, `material.${prop}`, newValue);
            // Local update
            const child = three.scene?.getObjectByProperty('uuid', object.uuid);
            if (child !== undefined) setItemProps(child, `material.${prop}`, newValue);
          },
        });
      } else if (Array.isArray(value)) {
        const subChildren: any[] = [];
        for (const index in value) {
          subChildren.push({
            title: `${index}`,
            type: `${typeof value[index]}`,
            value: value[index],
            onChange: (prop: string, value: any) => {
              three.updateObject(object.uuid, `material.${i}`, value);
              // Local update
              const child = three.scene?.getObjectByProperty('uuid', object.uuid);
              if (child !== undefined) setItemProps(child, `material.${i}`, value);
            },
          });
        }
        items.push({
          title: prettyName(i),
          items: subChildren,
        });
      } else if (value.x !== undefined && value.y !== undefined && value.z === undefined) {
        items.push({
          title: prettyName(i),
          prop: i,
          type: 'vector',
          value: value,
          onChange: (prop: string, value: any) => {
            three.updateObject(object.uuid, `material.${prop}`, value);
            // Local update
            const child = three.scene?.getObjectByProperty('uuid', object.uuid);
            if (child !== undefined) setItemProps(child, `material.${prop}`, value);
          },
        });
      } else {
        const subChildren: any[] = [];
        for (const n in value) {
          const propValue = value[n];
          const propValueType = typeof propValue;
          switch (propValueType) {
            case 'boolean':
            case 'number':
            case 'string':
              if (n === 'src') {
                items.push({
                  title: prettyName(i),
                  type: 'image',
                  value: propValue,
                  onChange: (prop: string, value: any) => {
                    three.createTexture(object.uuid, `material.${i}`, value);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) {
                      textureFromSrc(value).then((texture: Texture) => {
                        setItemProps(child, `material.${i}`, texture);
                        setItemProps(child, `material.needsUpdate`, true);
                      });
                    }
                  },
                });
              } else {
                subChildren.push({
                  title: `${prettyName(n)}`,
                  prop: `material.${i}.${n}`,
                  type: `${typeof material[i][n]}`,
                  value: value[n],
                  onChange: (_: string, value: any) => {
                    three.updateObject(object.uuid, `material.${i}.${n}`, value);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `material.${i}.${n}`, value);
                  },
                });
              }
              break;
            case 'object':
              // Uniform textures
              if (propValue.value !== undefined && propValue.value.src !== undefined) {
                subChildren.push({
                  title: prettyName(n),
                  type: 'image',
                  value: propValue.value.src,
                  onChange: (_: string, newValue: any) => {
                    three.createTexture(object.uuid, `material.${i}.${n}.value`, value);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) {
                      textureFromSrc(newValue).then((texture: Texture) => {
                        setItemProps(child, `material.${i}.${n}.value`, texture);
                      });
                    }
                  },
                });
              } else if (i === 'uniforms') {
                const pv = propValue.value;
                // Probably in Uniforms
                const makeFloat = (vTitle: string, vProp: string, floatValue: number) => {
                  return {
                    title: vTitle,
                    type: 'number',
                    value: floatValue,
                    step: 0.01,
                    onChange: (_: string, updatedValue: any) => {
                      const id = `material.uniforms.${n}.value.${vProp}`;
                      three.updateObject(object.uuid, id, updatedValue);
                      // Local update
                      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                      if (child !== undefined) setItemProps(child, id, updatedValue);
                    },
                  };
                };
                if (typeof propValue.value === 'number') {
                  subChildren.push({
                    title: n,
                    type: 'number',
                    value: propValue.value,
                    step: 0.01,
                    onChange: (prop: string, value: any) => {
                      const id = `material.${i}.${prop}.value`;
                      three.updateObject(object.uuid, id, value);
                      // Local update
                      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                      if (child !== undefined) setItemProps(child, id, value);
                    },
                  });
                } else if (pv['r'] !== undefined && pv['g'] !== undefined && pv['b'] !== undefined) {
                  subChildren.push({
                    title: n,
                    type: 'color',
                    value: propValue.value,
                    onChange: (prop: string, value: any) => {
                      const newValue = new Color(value);
                      const id = `material.${i}.${prop}.value`;
                      three.updateObject(object.uuid, id, newValue);
                      // Local update
                      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                      if (child !== undefined) setItemProps(child, id, newValue);
                    },
                  });
                } else if (pv['x'] !== undefined && pv['y'] !== undefined && pv['z'] === undefined && pv['w'] === undefined) {
                  subChildren.push({
                    title: n,
                    type: 'vector',
                    value: propValue.value,
                    prop: `material.${i}.${n}.value`,
                    onChange: (prop: string, newValue: any) => {
                      three.updateObject(object.uuid, prop, newValue);
                      // Local update
                      const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                      if (child !== undefined) setItemProps(child, prop, newValue);
                    },
                  });
                } else if (pv['x'] !== undefined && pv['y'] !== undefined && pv['z'] !== undefined && pv['w'] === undefined) {
                  subChildren.push(
                    {
                      title: n,
                      items: [
                        makeFloat('X', 'x', propValue.value.x),
                        makeFloat('Y', 'y', propValue.value.y),
                        makeFloat('Z', 'z', propValue.value.z),
                      ]
                    }
                  );
                } else if (pv['x'] !== undefined && pv['y'] !== undefined && pv['z'] !== undefined && pv['w'] !== undefined) {
                  subChildren.push(
                    {
                      title: n,
                      items: [
                        makeFloat('X', 'x', propValue.value.x),
                        makeFloat('Y', 'y', propValue.value.y),
                        makeFloat('Z', 'z', propValue.value.z),
                        makeFloat('W', 'w', propValue.value.w),
                      ]
                    }
                  );
                } else if (pv['elements'] !== undefined) {
                  const matrix = pv.elements;
                  const matrixChildren: any[] = [];
                  for (let i = 0; i < matrix.length; i++) {
                    matrixChildren.push(makeFloat(i.toString(), i.toString(), matrix[i]));
                  }
                  subChildren.push(
                    {
                      title: n,
                      items: matrixChildren
                    }
                  );
                } else {
                  console.log('>>> need to add this format:', n, pv);
                }
              } else {
                subChildren.push({
                  title: n,
                  type: `${typeof propValue.value}`,
                  value: propValue.value,
                  onChange: (_: string, newValue: any) => {
                    three.updateObject(object.uuid, `material.${i}.${n}.value`, newValue);
                    // Local update
                    const child = three.scene?.getObjectByProperty('uuid', object.uuid);
                    if (child !== undefined) setItemProps(child, `material.${i}.${n}.value`, newValue);
                  },
                });
              }
              break;
          }
        }

        if (subChildren.length > 0) {
          items.push({
            title: prettyName(i),
            items: subChildren,
          });
        }
      }
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