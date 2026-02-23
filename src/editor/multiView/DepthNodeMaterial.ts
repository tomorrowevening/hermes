import { MeshBasicNodeMaterial } from 'three/webgpu';
import { linearDepth, vec4, remapClamp } from 'three/tsl';

export default class DepthNodeMaterial extends MeshBasicNodeMaterial {
  constructor() {
    super();
    // Remap so 0.1–0.5 of the camera range fills the 0–1 gradient
    const d = remapClamp(linearDepth(), 0.1, 0.5, 0.0, 1.0).oneMinus();
    this.colorNode = vec4(d, d, d, 1.0);
  }
}