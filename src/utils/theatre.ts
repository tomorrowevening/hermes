import { types } from '@tomorrowevening/theatre-core';
import { useEffect, useState } from 'react';
import RemoteTheatre from '../core/remote/RemoteTheatre';

let studioPackage;

export function useStudio() {
  const [studio, setStudio] = useState(studioPackage);

  useEffect(() => {
    if (!studioPackage) {
      import('@tomorrowevening/theatre-studio').then((pkg) => {
        studioPackage = pkg.default;
        studioPackage.initialize();
        studioPackage.ui.hide();
        setStudio(studioPackage);
      });
    }
  }, []);

  return studio;
}

// Call this after the Theatre's studio has inited (onload is good)
export async function customizeTheatreElements() {
  // Wait until it's loaded
  while (!document.getElementById('theatrejs-studio-root')) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  // Should exist
  const root = document.getElementById('theatrejs-studio-root');
  if (root === null) return;
  
  if (root.shadowRoot === null) return;
  
  const pointerRoot = root.shadowRoot.getElementById('pointer-root');
  if (pointerRoot === null) return;
  
  const theatreEl = pointerRoot.children[0];
  if (theatreEl === null) return;

  try {
    const headerEl = theatreEl.children[1] as HTMLDivElement;
    const rightBtns = headerEl.children[1] as HTMLDivElement;
    rightBtns.parentElement?.removeChild(rightBtns);
  } catch (_) {
    //
  }

  try {
    const exportEl = theatreEl.children[3] as HTMLDivElement;
    exportEl.style.top = '0';
    exportEl.style.right = '300px';
  } catch (_) {
    //
  }
}

export function animateObjectTransform(sheet: string, key: string, obj: any, theatre: RemoteTheatre) {
  theatre.sheetObject(sheet, key, {
    transform: {
      position: {
        x: obj.position.x,
        y: obj.position.y,
        z: obj.position.z,
      },
      rotation: {
        x: obj.rotation.x,
        y: obj.rotation.y,
        z: obj.rotation.z,
      },
      scale: {
        x: obj.scale.x,
        y: obj.scale.y,
        z: obj.scale.z,
      },
      visible: obj.visible,
    },
  }, (values: any) => {
    const transform = values.transform;
    obj.position.copy(transform.position);
    obj.rotation.copy(transform.rotation);
    obj.scale.copy(transform.scale);
    obj.visible = transform.visible;
  });
}

const ignoreMaterialProps = [
  'allowOverride',
  'alphaHash',
  'alphaTest',
  'alphaToCoverage',
  'blendAlpha',
  'blendColor',
  'blendDst',
  'blendDstAlpha',
  'blendEquation',
  'blendEquationAlpha',
  'blendSrc',
  'blendSrcAlpha',
  'blending',
  'clipIntersection',
  'clipShadows',
  'clipping',
  'clippingPlanes',
  'colorWrite',
  'combine',
  'defaultAttributeValues',
  'defines',
  'depthFunc',
  'depthTest',
  'depthWrite',
  'dithering',
  'extensions',
  'fog',
  'forceSinglePass',
  'fragmentShader',
  'glslVersion',
  'id',
  'index0AttributeName',
  'index1AttributeName',
  'index2AttributeName',
  'index3AttributeName',
  'index4AttributeName',
  'isMaterial',
  'lights',
  'linewidth',
  'name',
  'needsUpdate',
  'polygonOffset',
  'polygonOffsetFactor',
  'polygonOffsetUnits',
  'precision',
  'premultipliedAlpha',
  'shadowSide',
  'side',
  'stencilFail',
  'stencilFunc',
  'stencilFuncMask',
  'stencilRef',
  'stencilWrite',
  'stencilWriteMask',
  'stencilZFail',
  'stencilZPass',
  'toneMapped',
  'transparent',
  'type',
  'uniformsGroups',
  'uniformsNeedUpdate',
  'userData',
  'uuid',
  'version',
  'vertexColors',
  'vertexShader',
  'visible',
  'wireframe',
  'wireframeLinewidth',
  'wireframeLinecap',
  'wireframeLinejoin',
];

type PropType = 'array'
  | 'boolean'
  | 'color'
  | 'euler'
  | 'matrix2'
  | 'matrix3'
  | 'matrix4'
  | 'number'
  | 'object'
  | 'string'
  | 'texture'
  | 'vector2'
  | 'vector3'
  | 'vector4'

function getPropType(value: any): PropType {
  const type = typeof value;
  if (value === null || value['isTexture']) {
    return 'texture';
  } else if (type === 'boolean') {
    return 'boolean';
  } else if (type === 'number') {
    return 'number';
  } else if (type === 'string') {
    return 'string';
  } else if (type === 'object') {
    if (value['isColor']) {
      return 'color';
    } else if (value['isVector2']) {
      return 'vector2';
    } else if (value['isVector3']) {
      return 'vector3';
    } else if (value['isVector4']) {
      return 'vector4';
    } else if (value['isMatrix2']) {
      return 'matrix2';
    } else if (value['isMatrix3']) {
      return 'matrix3';
    } else if (value['isMatrix4']) {
      return 'matrix4';
    } else if (value['isEuler']) {
      return 'euler';
    } else if (Array.isArray(value)) {
      return 'array';
    }
  }
  return 'object';
}

type PropToAdd = {
  name: string
  type: PropType
  value: any
};

export function getObjectMaterialProps(material: any): PropToAdd[] {
  const propsToAdd: PropToAdd[] = [];
  for (const prop in material) {
    // Skip props we don't want to animate
    const inList = ignoreMaterialProps.find((value) => value === prop);
    const passProp = prop.indexOf('_') === 0 || prop.indexOf('is') === 0;
    const ignore = inList || passProp;
    if (ignore) continue;

    // Uniforms
    if (prop === 'uniforms') {
      const uniforms = material.uniforms;
      for (const uniform in uniforms) {
        const uniformValue = uniforms[uniform].value;
        const type = getPropType(uniformValue);
        if (type === 'array' || type === 'object') {
          // TODO: Cycle through these
          // Skip for now...
        } else {
          propsToAdd.push({
            name: `uniforms.${uniform}.value`,
            type: type,
            value: uniformValue,
          });
        }
      }
    } else {
      // Material props
      const type = getPropType(material[prop]);
      propsToAdd.push({
        name: prop,
        type: type,
        value: material[prop],
      });
    }
  }

  // Refine list: Remove items with type array, object, or texture
  const filteredPropsToAdd = propsToAdd.filter(prop => 
    prop.type !== 'array' && prop.type !== 'object' && prop.type !== 'texture'
  );

  return filteredPropsToAdd;
}

export function getObjectMaterialObject(props: PropToAdd[]) {
  const materialProps = {};
  const numParams = { nudgeMultiplier: 0.01 };
  props.forEach((prop: PropToAdd) => {
    let value = prop.value;
    switch (prop.type) {
      case 'color':
        value = types.rgba({ r: value.r, g: value.g, b: value.b, a: 1 });
        break;
      case 'number':
        value = types.number(value, numParams);
        break;
      case 'euler':
      case 'vector3':
        value = {
          x: types.number(value.x, numParams),
          y: types.number(value.y, numParams),
          z: types.number(value.z, numParams),
        };
        break;
      case 'vector2':
        value = {
          x: types.number(value.x, numParams),
          y: types.number(value.y, numParams),
        };
        break;
      case 'vector4':
        value = {
          x: types.number(value.x, numParams),
          y: types.number(value.y, numParams),
          z: types.number(value.z, numParams),
          w: types.number(value.w, numParams),
        };
        break;
      case 'matrix2':
        value = {
          '0': types.number(value.elements[0], numParams),
          '1': types.number(value.elements[1], numParams),
          '2': types.number(value.elements[2], numParams),
          '3': types.number(value.elements[3], numParams),
        };
        break;
      case 'matrix3':
        value = {
          '0': types.number(value.elements[0], numParams),
          '1': types.number(value.elements[1], numParams),
          '2': types.number(value.elements[2], numParams),
          '3': types.number(value.elements[3], numParams),
          '4': types.number(value.elements[4], numParams),
          '5': types.number(value.elements[5], numParams),
          '6': types.number(value.elements[6], numParams),
          '7': types.number(value.elements[7], numParams),
          '8': types.number(value.elements[8], numParams),
        };
        break;
      case 'matrix4':
        value = {
          '0': types.number(value.elements[0], numParams),
          '1': types.number(value.elements[1], numParams),
          '2': types.number(value.elements[2], numParams),
          '3': types.number(value.elements[3], numParams),
          '4': types.number(value.elements[4], numParams),
          '5': types.number(value.elements[5], numParams),
          '6': types.number(value.elements[6], numParams),
          '7': types.number(value.elements[7], numParams),
          '8': types.number(value.elements[8], numParams),
          '9': types.number(value.elements[9], numParams),
          '10': types.number(value.elements[10], numParams),
          '11': types.number(value.elements[11], numParams),
          '12': types.number(value.elements[12], numParams),
          '13': types.number(value.elements[13], numParams),
          '14': types.number(value.elements[14], numParams),
          '15': types.number(value.elements[15], numParams),
        };
        break;
    }

    if (prop.name.includes('.')) {
      const parts = prop.name.split('.');
      let current = materialProps;
      
      // Navigate/create nested structure
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      
      // Set the final value
      current[parts[parts.length - 1]] = value;
    } else {
      // Simple property assignment
      materialProps[prop.name] = value;
    }
  });
  return materialProps;
}

export function applyObjectMaterial(material: any, props: PropToAdd[], values: any) {
  props.forEach((prop: PropToAdd) => {
    if (material[prop.name] !== undefined) {
      switch (prop.type) {
        case 'boolean':
        case 'number':
          material[prop.name] = values.material[prop.name];
          break;
        case 'color':
        case 'euler':
        case 'matrix2':
        case 'matrix3':
        case 'matrix4':
        case 'vector2':
        case 'vector3':
        case 'vector4':
          material[prop.name].copy(values.material[prop.name]);
          break;
      }
    }
  });
}

export function animateObjectMaterial(sheet: string, key: string, material: any, theatre: RemoteTheatre) {
  if (!material.isMaterial) return;

  const props = getObjectMaterialProps(material);
  const materialObj = getObjectMaterialObject(props);
  theatre.sheetObject(sheet, key, {
    material: materialObj,
  }, (values: any) => {
    applyObjectMaterial(material, props, values);
  });
}
