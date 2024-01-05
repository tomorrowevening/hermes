import { Color } from 'three';
import InspectorGroup from '../InspectorGroup';
import { RemoteMaterial, RemoteObject } from "../../types";
import RemoteThree from '@/core/remote/RemoteThree';
import { setItemProps } from '../../utils';

export function acceptedMaterialNames(name: string): boolean {
  return !(
    name === 'alphaHash' ||
    name === 'alphaToCoverage' ||
    name === 'attenuationDistance' ||
    name === 'colorWrite' ||
    name === 'combine' ||
    name === 'defaultAttributeValues' ||
    name === 'depthFunc' ||
    name === 'forceSinglePass' ||
    name === 'glslVersion' ||
    name === 'linewidth' ||
    name === 'normalMapType' ||
    name === 'precision' ||
    name === 'premultipliedAlpha' ||
    name === 'shadowSide' ||
    name === 'side' ||
    name === 'toneMapped' ||
    name === 'uniformsGroups' ||
    name === 'uniformsNeedUpdate' ||
    name === 'userData' ||
    name === 'vertexColors' ||
    name === 'version' ||
    name === 'wireframeLinecap' ||
    name === 'wireframeLinejoin' ||
    name === 'wireframeLinewidth' ||
    name.slice(0, 5) === 'blend' ||
    name.slice(0, 4) === 'clip' ||
    name.slice(0, 7) === 'polygon' ||
    name.slice(0, 7) === 'stencil' ||
    name.slice(0, 2) === 'is'
  );
}

export function niceMaterialNames(name: string): string {
  switch (name) {
    case 'anisotropyRotation': return 'Anisotropy Rotation';
    case 'aoMap': return 'AO Map';
    case 'aoMapIntensity': return 'AO Map Intensity';
    case 'attenuationColor': return 'Attenuation Color';
    case 'bumpScale': return 'Bump Scale';
    case 'clearcoatNormalScale': return 'Clearcoat Normal Scale';
    case 'clearcoatRoughness': return 'Clearcoat Roughness';
    case 'color': return 'Color';
    case 'defines': return 'Defines';
    case 'depthTest': return 'Depth Test';
    case 'depthWrite': return 'Depth Write';
    case 'displacementBias': return 'Displacement Bias';
    case 'displacementScale': return 'Displacement Scale';
    case 'dithering': return 'Dithering';
    case 'emissive': return 'Emissive';
    case 'emissiveIntensity': return 'Emissive Intensity';
    case 'envMap': return 'ENV Map';
    case 'envMapIntensity': return 'ENV Map Intensity';
    case 'extensions': return 'Extensions';
    case 'flatShading': return 'Flat Shading';
    case 'fragmentShader': return 'Fragment Shader';
    case 'fog': return 'Fog';
    case 'ior': return 'IOR';
    case 'iridescenceIOR': return 'Iridescence IOR';
    case 'iridescenceThicknessRange': return 'Iridescence Thickness Range';
    case 'lights': return 'Lights';
    case 'lightMapIntensity': return 'Light Map Intensity';
    case 'map': return 'Map';
    case 'metalness': return 'Metalness';
    case 'name': return 'Name';
    case 'normalScale': return 'Normal Scale';
    case 'opacity': return 'Opacity';
    case 'reflectivity': return 'Reflectivity';
    case 'refractionRatio': return 'Refraction Ratio';
    case 'roughness': return 'Roughness';
    case 'sheenColor': return 'Sheen Color';
    case 'sheenRoughness': return 'Sheen Roughness';
    case 'specularColor': return 'Specular Color';
    case 'specularIntensity': return 'Specular Intensity';
    case 'thickness': return 'Thickness';
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

export function inspectMaterialItems(material: RemoteMaterial, object: RemoteObject, three: RemoteThree): any[] {
  const items: any[] = [];
  for (const i in material) {
    if (!acceptedMaterialNames(i)) continue;

    // @ts-ignore
    const propType = typeof material[i];
    // @ts-ignore
    const value = material[i];
    if (propType === 'boolean' || propType === 'number' || propType === 'string') {
      const newField = {
        title: niceMaterialNames(i),
        prop: i,
        type: propType,
        value: value,
        min: undefined,
        max: undefined,
        onChange: (prop: string, value: any) => {
          three.updateObject(object.uuid, `material.${prop}`, value);
          if (propType === 'boolean') three.updateObject(object.uuid, 'material.needsUpdate', true);

          // const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          // if (child !== undefined) setItemProps(child, prop, value);
        },
      };
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
      items.push(newField);
    } else if (propType === 'object') {
      if (value.isColor) {
        items.push({
          title: niceMaterialNames(i),
          prop: i,
          type: 'color',
          value: value,
          onChange: (prop: string, value: any) => {
            const newValue = new Color(value);
            three.updateObject(object.uuid, `material.${prop}`, newValue);
            
            // const child = three.scene?.getObjectByProperty('uuid', object.uuid);
            // console.log('update color:', object.uuid, child, prop, newValue);
            // if (child !== undefined) setItemProps(child, prop, newValue);
          },
        });
      } else if (Array.isArray(value)) {
        const subChildren = [];
        for (const index in value) {
          subChildren.push({
            title: `${index}`,
            // @ts-ignore
            type: `${typeof value[index]}`,
            value: value[index],
            onChange: (prop: string, value: any) => {
              console.log('change!', prop, value);
              // three.updateObject(object.uuid, `material.${i}.${n}`, value);
            },
          });
        }
        items.push({
          title: niceMaterialNames(i),
          items: subChildren,
        });
      } else {
        const subChildren = [];
        for (const n in value) {
          const propValue = value[n];
          const propValueType = typeof propValue;
          switch (propValueType) {
            case 'boolean':
            case 'number':
            case 'string':
              if (n === 'src') {
                items.push({
                  title: niceMaterialNames(i),
                  type: 'image',
                  value: propValue,
                  onChange: (prop: string, value: any) => {
                    three.createTexture(object.uuid, `material.${i}`, value);
                  },
                });
              } else {
                subChildren.push({
                  title: `${niceMaterialNames(n)}`,
                  prop: `material.${i}.${n}`,
                  // @ts-ignore
                  type: `${typeof material[i][n]}`,
                  value: value[n],
                  onChange: (prop: string, value: any) => {
                    console.log('change!', prop, value);
                    // three.updateObject(object.uuid, `material.${i}.${n}`, value);
                  },
                });
              }
              break;
            case 'object':
              // @ts-ignore
              // console.log(' >> add this object:', i, n, propValue);
              // Uniform textures
              if (propValue.value.src !== undefined) {
                subChildren.push({
                  title: niceMaterialNames(n),
                  type: 'image',
                  value: propValue.value.src,
                  onChange: (prop: string, value: any) => {
                    three.createTexture(object.uuid, `material.${i}.${n}.value`, value);
                  },
                });
              } else {
                subChildren.push({
                  title: n,
                  // @ts-ignore
                  type: `${typeof propValue.value}`,
                  value: propValue.value,
                  onChange: (prop: string, value: any) => {
                    console.log('change!', prop, value);
                    // three.updateObject(object.uuid, `material.${i}.${n}`, value);
                  },
                });
              }
              break;
          }
        }

        if (subChildren.length > 0) {
          items.push({
            title: niceMaterialNames(i),
            items: subChildren,
          });
        }
      }
    } else if (value !== undefined) {
      // @ts-ignore
      console.log('other:', i, propType, value);
    }
  }
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
          items={inspectMaterialItems(material[i], object, three)}
        />
      );
    }
    return <>{items}</>;
  } else {
    return (
      <InspectorGroup
        title="Material"
        items={inspectMaterialItems(material, object, three)}
      />
    );
  }
  return null;
}