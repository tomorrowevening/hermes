import o from "three/src/materials/nodes/MeshBasicNodeMaterial.js";
import { remapClamp as r, linearDepth as t, vec4 as a } from "three/src/nodes/TSL.js";
class c extends o {
  constructor() {
    super();
    const e = r(t(), 0.1, 0.5, 0, 1).oneMinus();
    this.colorNode = a(e, e, e, 1);
  }
}
export {
  c as default
};
