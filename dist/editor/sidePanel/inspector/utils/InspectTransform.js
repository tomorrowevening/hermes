import { jsx as h } from "react/jsx-runtime";
import { Matrix4 as l, Vector3 as a, Euler as d } from "three";
import { Component as c } from "react";
import m from "../InspectorGroup.js";
import { setItemProps as u } from "../../utils.js";
import n from "../../../multiView/MultiView.js";
import { roundTo as i } from "../../../../utils/math.js";
class r extends c {
  static instance;
  matrix = new l();
  position = new a();
  rotation = new d();
  scale = new a();
  open = !1;
  constructor(t) {
    super(t);
    const e = localStorage.getItem(this.expandedName), o = e !== null ? e === "open" : !1;
    this.open = o, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: o
    }, this.matrix.elements = t.object.matrix, t.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), r.instance = this;
  }
  update() {
    if (n.instance) {
      const t = n.instance.selectedItem;
      if (t === void 0) return;
      this.position.x = i(t.position.x, 3), this.position.y = i(t.position.y, 3), this.position.z = i(t.position.z, 3), this.rotation.copy(t.rotation), this.scale.x = i(t.scale.x, 3), this.scale.y = i(t.scale.y, 3), this.scale.z = i(t.scale.z, 3), this.setState({ lastUpdated: Date.now() });
    }
  }
  render() {
    return /* @__PURE__ */ h(
      m,
      {
        three: this.props.three,
        title: "Transform",
        expanded: this.open,
        items: [
          {
            title: "Position",
            prop: "position",
            type: "grid3",
            step: 0.1,
            value: this.position,
            onChange: this.updateTransform
          },
          {
            title: "Rotation",
            prop: "rotation",
            type: "euler",
            value: this.rotation,
            onChange: this.updateTransform
          },
          {
            title: "Scale",
            prop: "scale",
            type: "grid3",
            value: this.scale,
            onChange: this.updateTransform
          },
          {
            title: "Visible",
            prop: "visible",
            type: "boolean",
            value: this.props.object.visible,
            onChange: this.updateTransform
          }
        ],
        onToggle: (t) => {
          this.open = t, this.saveExpanded();
        }
      },
      this.state.lastUpdated
    );
  }
  updateTransform = (t, e) => {
    const o = t === "rotation" ? { x: e._x, y: e._y, z: e._z } : e;
    this.props.three.updateObject(this.props.object.uuid, t, o);
    const s = this.props.three.getScene(this.props.object.uuid);
    if (s) {
      const p = s.getObjectByProperty("uuid", this.props.object.uuid);
      u(p, t, o);
    }
  };
  saveExpanded() {
    localStorage.setItem(this.expandedName, this.open ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.name}_transform`;
  }
}
export {
  r as InspectTransform
};
