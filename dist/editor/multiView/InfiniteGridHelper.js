import { Mesh as t, PlaneGeometry as e } from "three";
import a from "./InfiniteGridMaterial.js";
class g extends t {
  gridMaterial;
  constructor(i) {
    const r = new a(i);
    super(new e(), r), this.gridMaterial = r, this.frustumCulled = !1, this.name = "InfiniteGridHelper";
  }
  // Getters / Setters
  get color() {
    return this.gridMaterial.color;
  }
  set color(i) {
    this.gridMaterial.color = i;
  }
  get gridOpacity() {
    return this.gridMaterial.gridOpacity;
  }
  set gridOpacity(i) {
    this.gridMaterial.gridOpacity = i;
  }
  get subgridOpacity() {
    return this.gridMaterial.subgridOpacity;
  }
  set subgridOpacity(i) {
    this.gridMaterial.subgridOpacity = i;
  }
}
export {
  g as default
};
