import { EventDispatcher as r } from "three";
import { TransformControls as a } from "three/examples/jsm/controls/TransformControls.js";
import { ToolEvents as c } from "../../core/remote/RemoteThree.js";
import l from "../multiView/MultiView.js";
import { dispose as n } from "../../utils/three.js";
class s extends r {
  static DRAG_START = "Transform::dragStart";
  static DRAG_END = "Transform::dragEnd";
  static _instance;
  three;
  activeCamera;
  controls = /* @__PURE__ */ new Map();
  visibility = /* @__PURE__ */ new Map();
  setApp(t) {
    this.three = t, this.three.addEventListener(c.SET_SCENE, this.setScene);
  }
  clear() {
    for (const t of this.controls.values()) {
      t.detach(), t.disconnect();
      const e = t.getHelper();
      n(e);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(t) {
    let e = this.controls.get(t);
    if (e === void 0) {
      const i = document.querySelector(".clickable");
      e = new a(this.activeCamera, i), e.getHelper().name = t, e.setSize(0.5), e.setSpace("local"), this.controls.set(t, e), this.visibility.set(t, !0), e.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: s.DRAG_START });
      }), e.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: s.DRAG_END });
      }), e.addEventListener("dragging-changed", (o) => {
        l.instance?.toggleOrbitControls(o.value);
      });
    }
    return e;
  }
  get(t) {
    return this.controls.get(t);
  }
  remove(t) {
    const e = this.get(t);
    return e === void 0 ? !1 : (e.detach(), e.disconnect(), n(e.getHelper()), this.controls.delete(t), !0);
  }
  enabled(t) {
    this.controls.forEach((e) => {
      e.enabled = t;
    });
  }
  updateCamera(t, e) {
    this.activeCamera = t, this.controls.forEach((i) => {
      i.camera !== t && (i.camera = t, t.getWorldPosition(i.cameraPosition), t.getWorldQuaternion(i.cameraQuaternion)), i.domElement !== e && (i.disconnect(), i.domElement = e, i.connect(e));
    });
  }
  show() {
    this.controls.forEach((t) => {
      const e = t.getHelper(), i = this.visibility.get(e.name);
      i !== void 0 && (e.visible = i);
    });
  }
  hide() {
    this.controls.forEach((t) => {
      const e = t.getHelper();
      this.visibility.set(e.name, e.visible), e.visible = !1;
    });
  }
  setScene = () => {
    this.clear();
  };
  static get instance() {
    return s._instance || (s._instance = new s()), s._instance;
  }
}
export {
  s as default
};
