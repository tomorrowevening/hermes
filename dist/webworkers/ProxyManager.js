import { EventDispatcher as r } from "three";
import { noop as e } from "../core/types.js";
class n extends r {
  style = {};
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  ownerDocument = void 0;
  constructor() {
    super(), this.ownerDocument = this;
  }
  get clientWidth() {
    return this.width;
  }
  set clientWidth(t) {
    this.width = t;
  }
  get clientHeight() {
    return this.height;
  }
  set clientHeight(t) {
    this.height = t;
  }
  // OrbitControls call these as of r132. Implementing as no-ops
  setPointerCapture() {
  }
  releasePointerCapture() {
  }
  getBoundingClientRect() {
    return {
      x: this.left,
      y: this.top,
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
      right: this.left + this.width,
      bottom: this.top + this.height,
      toJSON: () => ({})
      // Satisfies the DOMRect interface
    };
  }
  handleEvent(t) {
    if (t.type === "size") {
      this.left = t.left, this.top = t.top, this.width = t.width, this.height = t.height;
      return;
    }
    t.preventDefault = e, t.stopPropagation = e, this.dispatchEvent(t);
  }
  focus() {
  }
  getRootNode() {
    return this;
  }
}
class l {
  targets = {};
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }
  makeProxy(t) {
    const { id: h } = t, s = new n();
    this.targets[h] = s;
  }
  getProxy(t) {
    return this.targets[t];
  }
  handleEvent(t) {
    this.targets[t.id]?.handleEvent(t.data);
  }
}
export {
  n as ElementProxyReceiver,
  l as ProxyManager
};
