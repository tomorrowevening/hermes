import { AddEquation, AlwaysStencilFunc, Color, FrontSide, KeepStencilOp, LessEqualDepth, Material, Mesh, NormalBlending, Object3D, OneMinusSrcAlphaFactor, SrcAlphaFactor } from 'three';
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

function stripMaterialData(material: Material): RemoteMaterial {
  const materialData = material.toJSON();
      
  // Blending
  if (materialData.blending === undefined) materialData.blending = NormalBlending;
  if (materialData.blendSrc === undefined) materialData.blendSrc = SrcAlphaFactor;
  if (materialData.blendDst === undefined) materialData.blendDst = OneMinusSrcAlphaFactor;
  if (materialData.blendEquation === undefined) materialData.blendEquation = AddEquation;
  if (materialData.blendColor === undefined) materialData.blendColor = new Color(0, 0, 0);
  if (materialData.blendAlpha === undefined) materialData.blendAlpha = 0;

  // Clipping
  if (materialData.clipIntersection === undefined) materialData.clipIntersection = false;
  if (materialData.clipShadows === undefined) materialData.clipShadows = false;
  
  // Depth
  if (materialData.depthFunc === undefined) materialData.depthFunc = LessEqualDepth;
  if (materialData.depthTest === undefined) materialData.depthTest = true;
  if (materialData.depthWrite === undefined) materialData.depthWrite = true;
  
  // Polygon
  if (materialData.polygonOffset === undefined) materialData.polygonOffset = false;
  if (materialData.polygonOffsetFactor === undefined) materialData.polygonOffsetFactor = 0;
  if (materialData.polygonOffsetUnits === undefined) materialData.polygonOffsetUnits = 0;
  
  // Stencil
  if (materialData.stencilWriteMask === undefined) materialData.stencilWriteMask = 0xff;
  if (materialData.stencilFunc === undefined) materialData.stencilFunc = AlwaysStencilFunc;
  if (materialData.stencilRef === undefined) materialData.stencilRef = 0;
  if (materialData.stencilFuncMask === undefined) materialData.stencilFuncMask = 0xff;
  if (materialData.stencilFail === undefined) materialData.stencilFail = KeepStencilOp;
  if (materialData.stencilZFail === undefined) materialData.stencilZFail = KeepStencilOp;
  if (materialData.stencilZPass === undefined) materialData.stencilZPass = KeepStencilOp;
  if (materialData.stencilWrite === undefined) materialData.stencilWrite = false;

  // Other
  if (materialData.alphaHash === undefined) materialData.alphaHash = false;
  if (materialData.alphaToCoverage === undefined) materialData.alphaToCoverage = false;
  if (materialData.colorWrite === undefined) materialData.colorWrite = true;
  if (materialData.dithering === undefined) materialData.dithering = false;
  if (materialData.forceSinglePass === undefined) materialData.forceSinglePass = false;
  if (materialData.name === undefined) materialData.name = '';
  if (materialData.opacity === undefined) materialData.opacity = 1;
  if (materialData.premultipliedAlpha === undefined) materialData.premultipliedAlpha = false;
  if (materialData.side === undefined) materialData.side = FrontSide;
  if (materialData.toneMapped === undefined) materialData.toneMapped = true;
  if (materialData.transparent === undefined) materialData.transparent = false;
  if (materialData.vertexColors === undefined) materialData.vertexColors = false;

  return materialData;
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
