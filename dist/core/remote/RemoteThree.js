import { Color as g, ColorManagement as l, WebGPURenderer as f, RenderTarget as E, WebGLRenderTarget as S } from "three/webgpu";
import b from "./BaseRemote.js";
import { stripObject as u, getSubItem as C, setItemProps as R, textureFromSrc as m, stripScene as o } from "../../editor/sidePanel/utils.js";
import { clamp as T } from "../../utils/math.js";
import { dispose as v, hierarchyUUID as h, ExportTexture as c, resetThreeObjects as p } from "../../utils/three.js";
var O = /* @__PURE__ */ ((i) => (i.CUSTOM = "ToolEvents::custom", i.SELECT_DROPDOWN = "ToolEvents::selectDropdown", i.DRAG_UPDATE = "ToolEvents::dragUpdate", i.ADD_SCENE = "ToolEvents::addScene", i.REFRESH_SCENE = "ToolEvents::refreshScene", i.REMOVE_SCENE = "ToolEvents::removeScene", i.SET_SCENE = "ToolEvents::setScene", i.SET_OBJECT = "ToolEvents::setObject", i.CLEAR_OBJECT = "ToolEvents::clearObject", i.ADD_CAMERA = "ToolEvents::addCamera", i.REMOVE_CAMERA = "ToolEvents::removeCamera", i.ADD_GROUP = "ToolEvents::addGroup", i.REMOVE_GROUP = "ToolEvents::removeGroup", i.ADD_SPLINE = "ToolEvents::addSpline", i.ADD_RENDERER = "ToolEvents::addRenderer", i.UPDATE_RENDERER = "ToolEvents::updateRenderer", i))(O || {});
class A extends b {
  name;
  canvas = null;
  // Canvas or OffscreenCanvas
  inputElement = null;
  // reference this to receive events
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  // scene instances
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  renderTargetsResize = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  _listeners = {};
  constructor(e, t = !1, r = !1) {
    super("RemoteThree", t, r), this.name = e;
  }
  dispose() {
    this.scenes.forEach((e) => {
      v(e);
    }), this.scenes.clear(), this.scene && v(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  // Event Dispatching (used for editor only)
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const r = this._listeners;
    r[e] === void 0 && (r[e] = []), r[e].indexOf(t) === -1 && r[e].push(t);
  }
  hasEventListener(e, t) {
    const r = this._listeners;
    return r === void 0 ? !1 : r[e] !== void 0 && r[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const r = this._listeners;
    if (r === void 0) return;
    const s = r[e];
    if (s !== void 0) {
      const d = s.indexOf(t);
      d !== -1 && s.splice(d, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const r = t[e.type];
    if (r !== void 0) {
      const s = { ...e, target: this }, d = r.slice(0);
      for (let a = 0, n = d.length; a < n; a++)
        d[a].call(this, s);
    }
  }
  // Objects
  /**
   * Searches ALL active scenes
   */
  getObjectByUUID(e) {
    const t = e.split(".")[0], r = this.scenes.get(t);
    if (r !== void 0)
      return r.getObjectByProperty("uuid", e);
  }
  getObject(e) {
    if (!this.debug) return;
    this.renderer !== void 0 && (c.renderer = this.renderer);
    const t = this.getObjectByUUID(e);
    t && this.setObject(t);
  }
  setObject(e) {
    this.renderer !== void 0 && (c.renderer = this.renderer);
    const t = u(e);
    this.dispatchEvent({ type: "ToolEvents::setObject", value: t });
  }
  requestMethod(e, t, r, s) {
    const d = this.getObjectByUUID(e);
    if (d)
      try {
        s !== void 0 ? C(d, s)[t](r) : d[t](r);
      } catch (a) {
        console.log("Hermes - Error requesting method:", e, t, r), console.log(a);
      }
  }
  updateObject(e, t, r) {
    this.send({
      event: "updateObject",
      target: "app",
      // used by both
      data: {
        uuid: e,
        key: t,
        value: r
      }
    });
  }
  createTexture(e, t, r) {
    this.send({
      event: "createTexture",
      target: "app",
      // used by both
      data: {
        uuid: e,
        key: t,
        value: r
      }
    });
  }
  onUpdateObject(e, t, r) {
    const s = this.getObjectByUUID(e);
    s && R(s, t, r);
  }
  onCreateTexture(e, t, r) {
    const s = this.getObjectByUUID(e);
    if (s) {
      const d = (a) => {
        const n = t.split(".");
        switch (n.length) {
          case 1:
            s[n[0]] = a;
            break;
          case 2:
            s[n[0]][n[1]] = a;
            break;
          case 3:
            s[n[0]][n[1]][n[2]] = a;
            break;
          case 4:
            s[n[0]][n[1]][n[2]][n[3]] = a;
            break;
          case 5:
            s[n[0]][n[1]][n[2]][n[3]][n[4]] = a;
            break;
        }
        s.material.needsUpdate = !0;
      };
      r.src.length > 0 ? m(r.src).then((a) => {
        a.offset.set(r.offset[0], r.offset[1]), a.repeat.set(r.repeat[0], r.repeat[1]), d(a);
      }) : d(null);
    }
  }
  // Groups
  addGroup(e) {
    this.groups.get(e.title) === void 0 && (this.groups.set(e.title, {
      title: e.title,
      onUpdate: e.onUpdate
    }), this.send({
      event: "addGroup",
      target: "editor",
      data: JSON.stringify(e)
    }));
  }
  removeGroup(e) {
    this.groups.get(e) !== void 0 && (this.groups.delete(e), this.send({
      event: "removeGroup",
      target: "editor",
      data: e
    }));
  }
  updateGroup(e, t, r) {
    this.send({
      event: "updateGroup",
      target: "app",
      data: JSON.stringify({ group: e, prop: t, value: r })
    });
  }
  addSplineCurve(e) {
    setTimeout(() => {
      this.send({
        event: "addSpline",
        target: "editor",
        data: JSON.stringify(e.toJSON())
      });
    }, 1);
  }
  addSplineObject(e) {
    setTimeout(() => {
      this.send({
        event: "addSpline",
        target: "editor",
        data: JSON.stringify(e)
      });
    }, 1);
  }
  // Renderer
  setRenderer(e, t = null) {
    if (this.renderer = e, this.canvas = e.domElement, this.inputElement = t !== null ? t : this.canvas, !this.debug) return;
    const r = `#${e.getClearColor(new g()).getHexString()}`;
    this.send({
      event: "addRenderer",
      target: "editor",
      data: {
        autoClearColor: e.autoClearColor,
        outputColorSpace: e.outputColorSpace,
        clearColor: r,
        clearAlpha: e.getClearAlpha(),
        colorManagement: l.enabled,
        toneMapping: e.toneMapping,
        toneMappingExposure: e.toneMappingExposure,
        type: e.isWebGLRenderer ? "WebGLRenderer" : "WebGPURenderer"
      }
    });
  }
  updateRenderer(e) {
    this.send({
      event: "updateRenderer",
      target: "app",
      data: e
    });
  }
  // Scenes
  addScene(e) {
    if (e === void 0 || (this.scenes.set(e.name, e), !this.debug)) return;
    p(), h(e);
    const t = o(e);
    this.send({
      event: "addScene",
      target: "editor",
      data: t
    });
  }
  refreshScene(e) {
    if (!this.debug) return;
    const t = this.scenes.get(e);
    if (t !== void 0) {
      const r = o(t);
      this.send({
        event: "refreshScene",
        target: "app",
        data: r
      });
    }
  }
  removeScene(e) {
    if (e === void 0 || (this.scenes.delete(e.name), !this.debug)) return;
    const t = o(e);
    this.send({
      event: "removeScene",
      target: "editor",
      data: t
    });
  }
  removeAllScenes() {
    this.scenes.forEach((e) => this.removeScene(e));
  }
  getScene(e) {
    let t = null;
    return this.scene !== void 0 && this.scene.uuid.search(e) > -1 ? this.scene : (this.scenes.forEach((r, s) => {
      e.search(s) > -1 && (t = r);
    }), t);
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.debug)) return;
    this.renderer !== void 0 && (c.renderer = this.renderer), p(), h(e);
    const t = o(e);
    this.send({
      event: "setScene",
      target: "editor",
      data: t
    });
  }
  requestSize() {
    this.send({
      event: "requestSize",
      target: "app"
    });
  }
  requestRenderer() {
    this.send({
      event: "requestRenderer",
      target: "app"
    });
  }
  requestScene() {
    this.send({
      event: "requestScene",
      target: "app"
    });
  }
  // Cameras
  addCamera(e) {
    if (!this.debug) return;
    const t = u(e);
    this.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.debug) return;
    const t = u(e);
    this.send({
      event: "removeCamera",
      target: "editor",
      data: t
    });
  }
  handleApp(e) {
    switch (e.event) {
      case "refreshScene":
        this.send({
          event: "refreshScene",
          target: "editor",
          data: o(this.scenes.get(e.data.name))
        });
        break;
      case "updateRenderer":
        this.renderer && (this.renderer.autoClearColor = e.data.autoClearColor, this.renderer.outputColorSpace = e.data.outputColorSpace, this.renderer.setClearColor(e.data.clearColor, e.data.clearAlpha), this.renderer.toneMapping = e.data.toneMapping, this.renderer.toneMappingExposure = e.data.toneMappingExposure, l.enabled = e.data.colorManagement);
        break;
      case "requestRenderer":
        if (this.renderer !== void 0) {
          const t = `#${this.renderer.getClearColor(new g()).getHexString()}`;
          this.send({
            event: "addRenderer",
            target: "editor",
            data: {
              autoClearColor: this.renderer.autoClearColor,
              outputColorSpace: this.renderer.outputColorSpace,
              clearColor: t,
              clearAlpha: this.renderer.getClearAlpha(),
              colorManagement: l.enabled,
              toneMapping: this.renderer.toneMapping,
              toneMappingExposure: this.renderer.toneMappingExposure,
              type: this.renderer.isWebGLRenderer ? "WebGLRenderer" : "WebGPURenderer"
            }
          });
        }
        break;
      case "requestScene":
        this.scenes.forEach((t) => {
          p(), h(t), this.send({
            event: "addScene",
            target: "editor",
            data: o(t)
          });
        }), this.scene !== void 0 && (this.renderer !== void 0 && (c.renderer = this.renderer), p(), h(this.scene), this.send({
          event: "setScene",
          target: "editor",
          data: o(this.scene)
        }));
        break;
    }
    if (e.event === "updateGroup") {
      const t = JSON.parse(e.data);
      this.groups.get(t.group)?.onUpdate(t.prop, t.value);
    }
  }
  handleEditor(e) {
    switch (e.event) {
      case "addScene":
        this.dispatchEvent({ type: "ToolEvents::addScene", value: e.data });
        break;
      case "refreshScene":
        this.dispatchEvent({ type: "ToolEvents::refreshScene", value: e.data });
        break;
      case "removeScene":
        this.dispatchEvent({ type: "ToolEvents::removeScene", value: e.data });
        break;
      case "setScene":
        this.dispatchEvent({ type: "ToolEvents::setScene", value: e.data });
        break;
      case "addCamera":
        this.dispatchEvent({ type: "ToolEvents::addCamera", value: e.data });
        break;
      case "removeCamera":
        this.dispatchEvent({ type: "ToolEvents::removeCamera", value: e.data });
        break;
      case "addGroup":
        this.dispatchEvent({ type: "ToolEvents::addGroup", value: e.data });
        break;
      case "removeGroup":
        this.dispatchEvent({ type: "ToolEvents::removeGroup", value: e.data });
        break;
      case "addSpline":
        this.dispatchEvent({ type: "ToolEvents::addSpline", value: e.data });
        break;
      case "addRenderer":
        this.dispatchEvent({ type: "ToolEvents::addRenderer", value: e.data });
    }
  }
  messageHandler(e) {
    const t = e.data;
    if (t.event === "updateObject") {
      this.onUpdateObject(t.data.uuid, t.data.key, t.data.value);
      return;
    } else if (t.event === "createTexture") {
      this.onCreateTexture(t.data.uuid, t.data.key, t.data.value);
      return;
    } else if (t.event === "requestSize") {
      t.target === "app" ? this.send({
        event: "requestSize",
        target: "editor",
        data: {
          width: this.width,
          height: this.height
        }
      }) : this.scenes.forEach((r) => {
        r.resize !== void 0 && r.resize(t.data.width, t.data.height);
      });
      return;
    }
    t.target === "app" ? this.handleApp(t) : this.handleEditor(t);
  }
  // Renderer
  addRT(e, t = !0, r) {
    if (!this.renderer) return;
    let s;
    this.renderer instanceof f ? s = new E(32, 32, r) : s = new S(32, 32, r), s.texture.name = e, this.renderTargets.set(e, s), this.renderTargetsResize.set(e, t);
  }
  removeRT(e) {
    this.renderTargets.delete(e), this.renderTargetsResize.delete(e);
  }
  resize(e, t) {
    const r = this.dpr;
    this.renderTargets.forEach((d, a) => {
      this.renderTargetsResize.get(a) && d.setSize(e * r, t * r);
    });
    const s = !(this.renderer?.domElement instanceof OffscreenCanvas);
    this.renderer?.setSize(e, t, s);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(T(1, 2, e));
  }
  get dpr() {
    return this.renderer !== void 0 ? this.renderer?.getPixelRatio() : 1;
  }
  get width() {
    return this.renderer !== void 0 ? this.renderer.domElement.width / this.dpr : 0;
  }
  get height() {
    return this.renderer !== void 0 ? this.renderer.domElement.height / this.dpr : 0;
  }
}
export {
  O as ToolEvents,
  A as default
};
