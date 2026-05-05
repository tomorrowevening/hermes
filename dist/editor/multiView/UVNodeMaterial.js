import e from "three/src/materials/nodes/MeshBasicNodeMaterial.js";
import { vec4 as o, uv as r } from "three/src/nodes/TSL.js";
class c extends e {
  constructor() {
    super(), this.colorNode = o(r(), 0, 1);
  }
}
export {
  c as default
};
