import MeshBasicNodeMaterial from 'three/src/materials/nodes/MeshBasicNodeMaterial.js';
import { uv, vec4 } from 'three/src/nodes/TSL.js';

export default class UVNodeMaterial extends MeshBasicNodeMaterial {
  constructor() {
    super();
    this.colorNode = vec4(uv(), 0.0, 1.0);
  }
}