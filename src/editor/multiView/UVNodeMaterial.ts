import { MeshBasicNodeMaterial } from 'three/webgpu';
import { uv, vec4 } from 'three/tsl';

export default class UVNodeMaterial extends MeshBasicNodeMaterial {
  constructor() {
    super();
    this.colorNode = vec4(uv(), 0.0, 1.0);
  }
}