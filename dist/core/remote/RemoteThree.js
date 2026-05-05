import { Color as l, ColorManagement as p, WebGPURenderer as g, RenderTarget as v, WebGLRenderTarget as f } from "three/webgpu";
import E from "./BaseRemote.js";
import { clamp as S } from "../../utils/math.js";
import { dispose as u, hierarchyUUID as o, ExportTexture as h, resetThreeObjects as c } from "../../utils/three.js";
var b = /* @__PURE__ */ ((a) => (a.CUSTOM = "ToolEvents::custom", a.SELECT_DROPDOWN = "ToolEvents::selectDropdown", a.DRAG_UPDATE = "ToolEvents::dragUpdate", a.ADD_SCENE = "ToolEvents::addScene", a.REFRESH_SCENE = "ToolEvents::refreshScene", a.REMOVE_SCENE = "ToolEvents::removeScene", a.SET_SCENE = "ToolEvents::setScene", a.SET_OBJECT = "ToolEvents::setObject", a.CLEAR_OBJECT = "ToolEvents::clearObject", a.ADD_CAMERA = "ToolEvents::addCamera", a.REMOVE_CAMERA = "ToolEvents::removeCamera", a.ADD_GROUP = "ToolEvents::addGroup", a.REMOVE_GROUP = "ToolEvents::removeGroup", a.ADD_SPLINE = "ToolEvents::addSpline", a.ADD_RENDERER = "ToolEvents::addRenderer", a.UPDATE_RENDERER = "ToolEvents::updateRenderer", a))(b || {});
class O extends E {
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
  editorUtils;
  constructor(e, t = !1, r = !1) {
    super("RemoteThree", t, r), this.name = e;
  }
  setEditorUtils(e) {
    this.editorUtils = e;
  }
  dispose() {
    this.scenes.forEach((e) => {
      u(e);
    }), this.scenes.clear(), this.scene && u(this.scene), this.renderTargets.forEach((e) => {
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
      for (let i = 0, n = d.length; i < n; i++)
        d[i].call(this, s);
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
    this.renderer !== void 0 && (h.renderer = this.renderer);
    const t = this.getObjectByUUID(e);
    t && this.setObject(t);
  }
  setObject(e) {
    if (!this.editorUtils) return;
    this.renderer !== void 0 && (h.renderer = this.renderer);
    const t = this.editorUtils.stripObject(e);
    this.dispatchEvent({ type: "ToolEvents::setObject", value: t });
  }
  requestMethod(e, t, r, s) {
    const d = this.getObjectByUUID(e);
    if (d)
      try {
        if (s !== void 0) {
          const i = this.editorUtils?.getSubItem(d, s);
          i !== void 0 && i[t](r);
        } else
          d[t](r);
      } catch (i) {
        console.log("Hermes - Error requesting method:", e, t, r), console.log(i);
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
    s && this.editorUtils?.setItemProps(s, t, r);
  }
  onCreateTexture(e, t, r) {
    if (!this.editorUtils) return;
    const s = this.getObjectByUUID(e);
    if (s) {
      const d = (i) => {
        const n = t.split(".");
        switch (n.length) {
          case 1:
            s[n[0]] = i;
            break;
          case 2:
            s[n[0]][n[1]] = i;
            break;
          case 3:
            s[n[0]][n[1]][n[2]] = i;
            break;
          case 4:
            s[n[0]][n[1]][n[2]][n[3]] = i;
            break;
          case 5:
            s[n[0]][n[1]][n[2]][n[3]][n[4]] = i;
            break;
        }
        s.material.needsUpdate = !0;
      };
      r.src.length > 0 ? this.editorUtils.textureFromSrc(r.src).then((i) => {
        i.offset.set(r.offset[0], r.offset[1]), i.repeat.set(r.repeat[0], r.repeat[1]), d(i);
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
    const r = `#${e.getClearColor(new l()).getHexString()}`;
    this.send({
      event: "addRenderer",
      target: "editor",
      data: {
        autoClearColor: e.autoClearColor,
        outputColorSpace: e.outputColorSpace,
        clearColor: r,
        clearAlpha: e.getClearAlpha(),
        colorManagement: p.enabled,
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
    if (e === void 0 || (this.scenes.set(e.name, e), !this.debug || !this.editorUtils)) return;
    c(), o(e);
    const t = this.editorUtils.stripScene(e);
    this.send({
      event: "addScene",
      target: "editor",
      data: t
    });
  }
  refreshScene(e) {
    if (!this.debug || !this.editorUtils) return;
    const t = this.scenes.get(e);
    if (t !== void 0) {
      const r = this.editorUtils.stripScene(t);
      this.send({
        event: "refreshScene",
        target: "app",
        data: r
      });
    }
  }
  removeScene(e) {
    if (e === void 0 || (this.scenes.delete(e.name), !this.debug || !this.editorUtils)) return;
    const t = this.editorUtils.stripScene(e);
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
    if (e === void 0 || (this.scene = e, !this.debug || !this.editorUtils)) return;
    this.renderer !== void 0 && (h.renderer = this.renderer), c(), o(e);
    const t = this.editorUtils.stripScene(e);
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
    if (!this.debug || !this.editorUtils) return;
    const t = this.editorUtils.stripObject(e);
    this.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.debug || !this.editorUtils) return;
    const t = this.editorUtils.stripObject(e);
    this.send({
      event: "removeCamera",
      target: "editor",
      data: t
    });
  }
  handleApp(e) {
    switch (e.event) {
      case "refreshScene":
        this.editorUtils && this.send({
          event: "refreshScene",
          target: "editor",
          data: this.editorUtils.stripScene(this.scenes.get(e.data.name))
        });
        break;
      case "updateRenderer":
        this.renderer && (this.renderer.autoClearColor = e.data.autoClearColor, this.renderer.outputColorSpace = e.data.outputColorSpace, this.renderer.setClearColor(e.data.clearColor, e.data.clearAlpha), this.renderer.toneMapping = e.data.toneMapping, this.renderer.toneMappingExposure = e.data.toneMappingExposure, p.enabled = e.data.colorManagement);
        break;
      case "requestRenderer":
        if (this.renderer !== void 0) {
          const t = `#${this.renderer.getClearColor(new l()).getHexString()}`;
          this.send({
            event: "addRenderer",
            target: "editor",
            data: {
              autoClearColor: this.renderer.autoClearColor,
              outputColorSpace: this.renderer.outputColorSpace,
              clearColor: t,
              clearAlpha: this.renderer.getClearAlpha(),
              colorManagement: p.enabled,
              toneMapping: this.renderer.toneMapping,
              toneMappingExposure: this.renderer.toneMappingExposure,
              type: this.renderer.isWebGLRenderer ? "WebGLRenderer" : "WebGPURenderer"
            }
          });
        }
        break;
      case "requestScene":
        this.editorUtils && (this.scenes.forEach((t) => {
          c(), o(t), this.send({
            event: "addScene",
            target: "editor",
            data: this.editorUtils.stripScene(t)
          });
        }), this.scene !== void 0 && (this.renderer !== void 0 && (h.renderer = this.renderer), c(), o(this.scene), this.send({
          event: "setScene",
          target: "editor",
          data: this.editorUtils.stripScene(this.scene)
        })));
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
    this.renderer instanceof g ? s = new v(32, 32, r) : s = new f(32, 32, r), s.texture.name = e, this.renderTargets.set(e, s), this.renderTargetsResize.set(e, t);
  }
  removeRT(e) {
    this.renderTargets.delete(e), this.renderTargetsResize.delete(e);
  }
  resize(e, t) {
    const r = this.dpr;
    this.renderTargets.forEach((d, i) => {
      this.renderTargetsResize.get(i) && d.setSize(e * r, t * r);
    });
    const s = !(this.renderer?.domElement instanceof OffscreenCanvas);
    this.renderer?.setSize(e, t, s);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(S(1, 2, e));
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
  b as ToolEvents,
  O as default
};
