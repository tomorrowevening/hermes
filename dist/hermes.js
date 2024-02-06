var jn = Object.defineProperty;
var kn = (t, n, a) => n in t ? jn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var F = (t, n, a) => (kn(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as An, EventDispatcher as cn, Texture as ln, CubeTexture as Dn, RepeatWrapping as Wt, ShaderMaterial as un, GLSL3 as In, DoubleSide as Ln, Color as Tt, Mesh as Nn, PlaneGeometry as Fn, Matrix4 as Un, Vector3 as X, Euler as Bn, Ray as $n, Plane as zn, MathUtils as Gn, MOUSE as We, TOUCH as Ke, Quaternion as Kt, Spherical as Xt, Vector2 as fe, PerspectiveCamera as Ft, MeshDepthMaterial as Hn, MeshNormalMaterial as Vn, MeshBasicMaterial as Yn, OrthographicCamera as dn, Scene as fn, Group as Wn, AxesHelper as hn, WebGLRenderer as Kn, Raycaster as Xn, CameraHelper as qn } from "three";
import { getProject as Zn, createRafDriver as Jn } from "@theatre/core";
import ct from "@theatre/studio";
import { Pane as Qn } from "tweakpane";
import * as ea from "@tweakpane/plugin-essentials";
import pn, { useState as ce, useRef as Ce, useEffect as Fe, Component as ta, forwardRef as na } from "react";
import { Reorder as mn } from "framer-motion";
function ui(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function di(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function aa() {
  return Math.round(Math.random() * 1e6).toString();
}
function ia(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function ra(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), r = (u) => {
    const p = u.toString(16);
    return p.length === 1 ? "0" + p : p;
  }, s = r(n), d = r(a), c = r(e);
  return "#" + s + d + c;
}
function Dt(t, n = 1) {
  return Number(t.toFixed(n));
}
let Ut = 0;
const oa = () => {
  Ut = 0;
}, vn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Ut}`, Ut++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    vn(a);
  });
}, fi = (t) => {
  t == null || t.dispose();
}, sa = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, gn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof An ? (a.pause(), a.parent && a.parent.remove(a)) : gn(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), sa(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class hi {
  constructor(n, a, e = !0, r = "editor") {
    F(this, "components", /* @__PURE__ */ new Map());
    F(this, "listen");
    // Protected
    F(this, "_debugEnabled");
    F(this, "broadcastChannel");
    F(this, "webSocket");
    F(this, "_mode", "app");
    F(this, "_connected", !1);
    F(this, "useBC", !1);
    F(this, "messageHandler", (n) => {
      this.listen !== void 0 && (this.useBC ? this.listen(n.data) : this.listen(JSON.parse(n.data)));
    });
    F(this, "openHandler", () => {
      this._connected = !0;
    });
    F(this, "closeHandler", () => {
      this._connected = !1;
    });
    this.editor = a && document.location.hash.search(r) > -1, this._debugEnabled = a, a && (this.useBC = e, e ? (this.broadcastChannel = new BroadcastChannel(n), this.broadcastChannel.addEventListener("message", this.messageHandler)) : (this.webSocket = new WebSocket(n), this.webSocket.addEventListener("open", this.openHandler), this.webSocket.addEventListener("close", this.closeHandler), this.webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(n, a) {
    this.components.set(n, a);
  }
  dispose() {
    this.broadcastChannel !== void 0 && this.broadcastChannel.removeEventListener("message", this.messageHandler), this.webSocket !== void 0 && (this.webSocket.removeEventListener("open", this.openHandler), this.webSocket.removeEventListener("close", this.closeHandler), this.webSocket.removeEventListener("message", this.messageHandler)), this.components.forEach((n) => {
      n.dispose();
    }), this.components.clear();
  }
  // Remote
  send(n) {
    var a, e;
    this._mode !== n.target && (this.useBC ? (a = this.broadcastChannel) == null || a.postMessage(n) : this._connected && ((e = this.webSocket) == null || e.send(JSON.stringify(n))));
  }
  // Getters / Setters
  get connected() {
    return this._connected;
  }
  get debugEnabled() {
    return this._debugEnabled;
  }
  get mode() {
    return this._mode;
  }
  get isApp() {
    return this._mode === "app";
  }
  get editor() {
    return this._mode === "editor";
  }
  set editor(n) {
    n && (this._mode = "editor", document.title += " - Editor");
  }
}
const j = new cn(), k = {
  CUSTOM: "ToolEvents::custom",
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  SET_SCENE: "ToolEvents::setScene",
  GET_OBJECT: "ToolEvents::getObject",
  SET_OBJECT: "ToolEvents::setObject",
  UPDATE_OBJECT: "ToolEvents::updateObject",
  CREATE_TEXTURE: "ToolEvents::createTexture",
  REQUEST_METHOD: "ToolEvents::requestMethod",
  // MultiView
  ADD_CAMERA: "ToolEvents::addCamera",
  REMOVE_CAMERA: "ToolEvents::removeCamera"
};
class Mt {
  constructor(n) {
    F(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class ca extends Mt {
  selectDropdown(n, a) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: n,
        value: a
      }
    });
  }
  updateDropdown(n, a) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: n,
        value: a
      }
    });
  }
}
function la(t, n) {
  switch (n.event) {
    case "selectComponent":
      j.dispatchEvent({ type: k.SELECT_DROPDOWN, value: n.data });
      break;
    case "draggableListUpdate":
      j.dispatchEvent({ type: k.DRAG_UPDATE, value: n.data });
      break;
  }
}
const bn = () => {
}, Ze = class Ze extends Mt {
  constructor() {
    super(...arguments);
    F(this, "project");
    F(this, "sheets", /* @__PURE__ */ new Map());
    F(this, "sheetObjects", /* @__PURE__ */ new Map());
    F(this, "sheetObjectCBs", /* @__PURE__ */ new Map());
    F(this, "sheetObjectUnsubscribe", /* @__PURE__ */ new Map());
  }
  init(a, e) {
    return this.project = Zn(a, e), this.project.ready;
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(a) {
    var r;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let e = this.sheets.get(a);
    return e !== void 0 || (e = (r = this.project) == null ? void 0 : r.sheet(a), this.sheets.set(a, e)), e;
  }
  playSheet(a, e) {
    var r;
    (r = this.sheet(a)) == null || r.sequence.play(e), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: a,
        value: e
      }
    });
  }
  pauseSheet(a) {
    var e;
    (e = this.sheet(a)) == null || e.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: a
      }
    });
  }
  clearSheetObjects(a) {
    this.sheetObjects.forEach((e, r) => {
      r.search(`${a}_`) > -1 && this.unsubscribe(e);
    });
  }
  sheetObject(a, e, r, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const d = this.sheet(a);
    if (d === void 0)
      return;
    const c = `${a}_${e}`;
    let u = this.sheetObjects.get(c);
    u !== void 0 ? u = d.object(e, { ...r, ...u.value }, { reconfigure: !0 }) : u = d.object(e, r), this.sheetObjects.set(c, u), this.sheetObjectCBs.set(c, s !== void 0 ? s : bn);
    const p = u.onValuesChange((b) => {
      if (this.app.editor) {
        for (const w in b) {
          const x = b[w];
          typeof x == "object" && ia(x) && (b[w] = {
            r: x.r,
            g: x.g,
            b: x.b,
            a: x.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: a,
            sheetObject: c,
            values: b
          }
        });
      }
      const v = this.sheetObjectCBs.get(c);
      v !== void 0 && v(b);
    });
    return this.sheetObjectUnsubscribe.set(c, p), u;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = a.address.sheetId, r = a.address.objectKey, s = this.sheets.get(e);
    s == null || s.detachObject(r);
    const d = `${e}_${r}`, c = this.sheetObjectUnsubscribe.get(d);
    c !== void 0 && (this.sheetObjects.delete(d), this.sheetObjectCBs.delete(d), this.sheetObjectUnsubscribe.delete(d), c());
  }
  static getRafDriver() {
    return Ze.rafDriver || (Ze.rafDriver = Jn()), Ze.rafDriver;
  }
};
F(Ze, "rafDriver", null);
let Ue = Ze, Me;
function ua(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Ue) {
      let e;
      const r = a;
      switch (n.event) {
        case "setSheet":
          e = r.sheets.get(n.data.sheet), e !== void 0 && (Me = e, ct.setSelection([e]));
          break;
        case "setSheetObject":
          e = r.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), e !== void 0 && ct.setSelection([e]);
          break;
        case "updateSheetObject":
          e = r.sheets.get(n.data.sheet), e !== void 0 && e.sequence.pause(), e = r.sheetObjectCBs.get(n.data.sheetObject), e !== void 0 && e(n.data.values);
          break;
        case "updateTimeline":
          e = r.sheets.get(n.data.sheet), Me !== void 0 && (Me.sequence.position = n.data.position);
          break;
      }
    }
  });
}
function da(t) {
  if (t.editor) {
    let n;
    t.components.forEach((s) => {
      s instanceof Ue && (n = s);
    }), ct.ui.restore(), ct.onSelectionChange((s) => {
      s.length < 1 || s.forEach((d) => {
        let c = d.address.sheetId, u = "setSheet", p = {};
        switch (d.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", p = {
              sheet: d.address.sheetId
            }, Me = n.sheets.get(d.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", c += `_${d.address.objectKey}`, p = {
              id: c,
              sheet: d.address.sheetId,
              key: d.address.objectKey
            };
            break;
        }
        t.send({ event: u, target: "app", data: p });
      });
    });
    let a = 0;
    const e = () => {
      if (Ue.getRafDriver().tick(performance.now()), Me !== void 0 && a !== Me.sequence.position) {
        a = Me.sequence.position;
        const s = Me;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: a,
            sheet: s.address.sheetId
          }
        });
      }
    }, r = () => {
      e(), requestAnimationFrame(r);
    };
    e(), r();
  } else
    ct.ui.hide();
}
function fa(t, n) {
  t.editor && t.components.forEach((a) => {
    var e, r;
    if (a instanceof Ue) {
      const s = a;
      switch (n.event) {
        case "playSheet":
          (e = s.sheet(n.data.sheet)) == null || e.sequence.play(n.data.value);
          break;
        case "pauseSheet":
          (r = s.sheet(n.data.sheet)) == null || r.sequence.pause();
          break;
      }
      return;
    }
  });
}
function ha(t) {
  if (t.name === "cameras")
    return "camera";
  if (t.name === "interactive")
    return "interactive";
  if (t.name === "lights")
    return "light";
  if (t.name === "ui")
    return "ui";
  if (t.name === "utils")
    return "utils";
  const n = t.type;
  return n.search("Helper") > -1 ? "icon_utils" : n.search("Camera") > -1 ? "camera" : n.search("Light") > -1 ? "light" : "obj3D";
}
function yn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(yn(a));
  }), n;
}
function pa(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function ma(t) {
  switch (t) {
    case "blendSrcAlpha":
    case "blendDstAlpha":
    case "blendEquationAlpha":
    case "clippingPlanes":
    case "shadowSide":
    case "precision":
      return !0;
  }
  return !1;
}
function Xe(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || ma(a))
      continue;
    const e = typeof t[a], r = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = r;
        break;
      case "object":
        if (r !== null)
          if (n[a] = r, r.isTexture)
            if (r instanceof ln) {
              const s = r.source.toJSON();
              n[a] = { src: s.url };
            } else
              r instanceof Dn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = pa(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function It(t) {
  t.updateMatrix();
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    visible: t.visible,
    matrix: t.matrix.elements,
    animations: [],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0
  };
  t.animations.forEach((e) => {
    n.animations.push({
      name: e.name,
      duration: e.duration,
      blendMode: e.blendMode
    });
  });
  const a = t.type.toLowerCase();
  if (a.search("mesh") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((s) => {
        r.push(Xe(s));
      }), n.material = r;
    } else
      n.material = Xe(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((s) => {
        r.push(Xe(s));
      }), n.material = r;
    } else
      n.material = Xe(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((s) => {
        r.push(Xe(s));
      }), n.material = r;
    } else
      n.material = Xe(e.material);
  } else
    a.search("camera") > -1 ? t.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
      fov: t.fov,
      zoom: t.zoom,
      near: t.near,
      far: t.far,
      focus: t.focus,
      aspect: t.aspect,
      filmGauge: t.filmGauge,
      filmOffset: t.filmOffset
    } : t.type === "OrthographicCamera" && (n.orthographicCameraInfo = {
      zoom: t.zoom,
      near: t.near,
      far: t.far,
      left: t.left,
      right: t.right,
      top: t.top,
      bottom: t.bottom
    }) : a.search("light") > -1 && (n.lightInfo = {
      color: t.color,
      intensity: t.intensity,
      decay: t.decay,
      distance: t.distance,
      angle: t.angle,
      penumbra: t.penumbra,
      groundColor: t.groundColor
    });
  return n;
}
function Z(t, n, a) {
  const e = n.split(".");
  switch (e.length) {
    case 1:
      t[e[0]] = a;
      break;
    case 2:
      t[e[0]][e[1]] = a;
      break;
    case 3:
      t[e[0]][e[1]][e[2]] = a;
      break;
    case 4:
      t[e[0]][e[1]][e[2]][e[3]] = a;
      break;
    case 5:
      t[e[0]][e[1]][e[2]][e[3]][e[4]] = a;
      break;
  }
}
function Bt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const r = new ln(e);
      r.wrapS = Wt, r.wrapT = Wt, r.needsUpdate = !0, n(r);
    }, e.onerror = a, e.src = t;
  });
}
class va extends Mt {
  constructor() {
    super(...arguments);
    F(this, "scene");
  }
  getObject(a) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = It(a);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(a, e, r) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r
      }
    });
  }
  updateObject(a, e, r) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r
      }
    });
  }
  createTexture(a, e, r) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r
      }
    });
  }
  setScene(a) {
    if (a === void 0 || (this.scene = a, !this.app.debugEnabled))
      return;
    oa(), vn(this.scene);
    const e = yn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(a) {
    if (!this.app.debugEnabled)
      return;
    const e = It(a);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(a) {
    if (!this.app.debugEnabled)
      return;
    const e = It(a);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
function ga(t, n) {
  switch (n.event) {
    case "getObject":
      j.dispatchEvent({ type: k.GET_OBJECT, value: n.data });
      break;
    case "updateObject":
      j.dispatchEvent({ type: k.UPDATE_OBJECT, value: n.data });
      break;
    case "createTexture":
      j.dispatchEvent({ type: k.CREATE_TEXTURE, value: n.data });
      break;
    case "requestMethod":
      j.dispatchEvent({ type: k.REQUEST_METHOD, value: n.data });
      break;
  }
}
function ba(t, n) {
  switch (n.event) {
    case "setObject":
      j.dispatchEvent({ type: k.SET_OBJECT, value: n.data });
      break;
    case "setScene":
      j.dispatchEvent({ type: k.SET_SCENE, value: n.data });
      break;
    case "addCamera":
      j.dispatchEvent({ type: k.ADD_CAMERA, value: n.data });
      break;
    case "removeCamera":
      j.dispatchEvent({ type: k.REMOVE_CAMERA, value: n.data });
      break;
  }
}
class En extends Mt {
  constructor(a) {
    super(a);
    F(this, "bindCBs");
    F(this, "buttonCBs");
    F(this, "pane");
    F(this, "appCallbacks", 0);
    F(this, "editorCallbacks", 0);
    F(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Qn({ title: "GUI" }), this.pane.registerPlugin(ea);
  }
  dispose() {
    var a;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((a = this.pane) == null || a.dispose(), this.pane = void 0);
  }
  addFolder(a, e = void 0, r = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addFolder({
        title: a,
        ...e
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: a,
        params: e,
        parent: r
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(a, e, r, s = void 0) {
    const d = this.bindID, c = r.onChange !== void 0 ? r.onChange : bn;
    this.bindCBs.set(d, c), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(a, e, r).on("change", (p) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: d,
          value: p.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: d,
        name: e,
        params: r,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(a, e) {
    const r = this.bindCBs.get(a);
    r !== void 0 ? r(e) : console.warn(`No callback for: ${a}`, e);
  }
  // Buttons
  button(a, e, r = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addButton({ title: a }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: s
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: s,
        name: a,
        callback: e,
        parent: r
      }
    }), this.appCallbacks++);
  }
  triggerButton(a) {
    const e = this.buttonCBs.get(a);
    e !== void 0 && e();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const a = this.inspectorFolder.children.length - 1;
    for (let e = a; e > -1; --e)
      this.inspectorFolder.remove(this.inspectorFolder.children[e]);
  }
}
function ya(t, n) {
  t.components.forEach((a) => {
    if (a instanceof En) {
      const e = a;
      switch (n.event) {
        case "addFolder":
          e.addFolder(n.data.name, n.data.params, n.data.parent);
          break;
        case "bindObject":
          e.bind(n.data.name, n.data.params, n.data.parent);
          break;
        case "updateBind":
          e.triggerBind(n.data.id, n.data.value);
          break;
        case "addButton":
          e.button(n.data.name, n.data.callback, n.data.parent);
          break;
        case "clickButton":
          e.triggerButton(n.data.id);
          break;
      }
      return;
    }
  });
}
var $t = { exports: {} }, rt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qt;
function Ea() {
  if (qt)
    return rt;
  qt = 1;
  var t = pn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(c, u, p) {
    var b, v = {}, w = null, x = null;
    p !== void 0 && (w = "" + p), u.key !== void 0 && (w = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (b in u)
      e.call(u, b) && !s.hasOwnProperty(b) && (v[b] = u[b]);
    if (c && c.defaultProps)
      for (b in u = c.defaultProps, u)
        v[b] === void 0 && (v[b] = u[b]);
    return { $$typeof: n, type: c, key: w, ref: x, props: v, _owner: r.current };
  }
  return rt.Fragment = a, rt.jsx = d, rt.jsxs = d, rt;
}
var ot = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zt;
function wa() {
  return Zt || (Zt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = pn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), O = Symbol.iterator, M = "@@iterator";
    function K(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = O && i[O] || i[M];
      return typeof h == "function" ? h : null;
    }
    var I = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(i) {
      {
        for (var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), S = 1; S < h; S++)
          g[S - 1] = arguments[S];
        V("error", i, g);
      }
    }
    function V(i, h, g) {
      {
        var S = I.ReactDebugCurrentFrame, A = S.getStackAddendum();
        A !== "" && (h += "%s", g = g.concat([A]));
        var B = g.map(function(_) {
          return String(_);
        });
        B.unshift("Warning: " + h), Function.prototype.apply.call(console[i], console, B);
      }
    }
    var ie = !1, ue = !1, te = !1, f = !1, m = !1, y;
    y = Symbol.for("react.module.reference");
    function T(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || m || i === r || i === p || i === b || f || i === x || ie || ue || te || typeof i == "object" && i !== null && (i.$$typeof === w || i.$$typeof === v || i.$$typeof === d || i.$$typeof === c || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === y || i.getModuleId !== void 0));
    }
    function G(i, h, g) {
      var S = i.displayName;
      if (S)
        return S;
      var A = h.displayName || h.name || "";
      return A !== "" ? g + "(" + A + ")" : g;
    }
    function H(i) {
      return i.displayName || "Context";
    }
    function $(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case s:
          return "Profiler";
        case r:
          return "StrictMode";
        case p:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case c:
            var h = i;
            return H(h) + ".Consumer";
          case d:
            var g = i;
            return H(g._context) + ".Provider";
          case u:
            return G(i, i.render, "ForwardRef");
          case v:
            var S = i.displayName || null;
            return S !== null ? S : $(i.type) || "Memo";
          case w: {
            var A = i, B = A._payload, _ = A._init;
            try {
              return $(_(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, z = 0, ee, P, N, J, me, Re, Je;
    function dt() {
    }
    dt.__reactDisabledLog = !0;
    function Pt() {
      {
        if (z === 0) {
          ee = console.log, P = console.info, N = console.warn, J = console.error, me = console.group, Re = console.groupCollapsed, Je = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: dt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: i,
            log: i,
            warn: i,
            error: i,
            group: i,
            groupCollapsed: i,
            groupEnd: i
          });
        }
        z++;
      }
    }
    function _t() {
      {
        if (z--, z === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, i, {
              value: ee
            }),
            info: L({}, i, {
              value: P
            }),
            warn: L({}, i, {
              value: N
            }),
            error: L({}, i, {
              value: J
            }),
            group: L({}, i, {
              value: me
            }),
            groupCollapsed: L({}, i, {
              value: Re
            }),
            groupEnd: L({}, i, {
              value: Je
            })
          });
        }
        z < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Qe = I.ReactCurrentDispatcher, et;
    function Pe(i, h, g) {
      {
        if (et === void 0)
          try {
            throw Error();
          } catch (A) {
            var S = A.stack.trim().match(/\n( *(at )?)/);
            et = S && S[1] || "";
          }
        return `
` + et + i;
      }
    }
    var ze = !1, _e;
    {
      var jt = typeof WeakMap == "function" ? WeakMap : Map;
      _e = new jt();
    }
    function ft(i, h) {
      if (!i || ze)
        return "";
      {
        var g = _e.get(i);
        if (g !== void 0)
          return g;
      }
      var S;
      ze = !0;
      var A = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = Qe.current, Qe.current = null, Pt();
      try {
        if (h) {
          var _ = function() {
            throw Error();
          };
          if (Object.defineProperty(_.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(_, []);
            } catch (Ee) {
              S = Ee;
            }
            Reflect.construct(i, [], _);
          } else {
            try {
              _.call();
            } catch (Ee) {
              S = Ee;
            }
            i.call(_.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ee) {
            S = Ee;
          }
          i();
        }
      } catch (Ee) {
        if (Ee && S && typeof Ee.stack == "string") {
          for (var R = Ee.stack.split(`
`), le = S.stack.split(`
`), q = R.length - 1, Q = le.length - 1; q >= 1 && Q >= 0 && R[q] !== le[Q]; )
            Q--;
          for (; q >= 1 && Q >= 0; q--, Q--)
            if (R[q] !== le[Q]) {
              if (q !== 1 || Q !== 1)
                do
                  if (q--, Q--, Q < 0 || R[q] !== le[Q]) {
                    var ve = `
` + R[q].replace(" at new ", " at ");
                    return i.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", i.displayName)), typeof i == "function" && _e.set(i, ve), ve;
                  }
                while (q >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        ze = !1, Qe.current = B, _t(), Error.prepareStackTrace = A;
      }
      var Ye = i ? i.displayName || i.name : "", Yt = Ye ? Pe(Ye) : "";
      return typeof i == "function" && _e.set(i, Yt), Yt;
    }
    function ht(i, h, g) {
      return ft(i, !1);
    }
    function pt(i) {
      var h = i.prototype;
      return !!(h && h.isReactComponent);
    }
    function je(i, h, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ft(i, pt(i));
      if (typeof i == "string")
        return Pe(i);
      switch (i) {
        case p:
          return Pe("Suspense");
        case b:
          return Pe("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case u:
            return ht(i.render);
          case v:
            return je(i.type, h, g);
          case w: {
            var S = i, A = S._payload, B = S._init;
            try {
              return je(B(A), h, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Ge = Object.prototype.hasOwnProperty, mt = {}, tt = I.ReactDebugCurrentFrame;
    function Se(i) {
      if (i) {
        var h = i._owner, g = je(i.type, i._source, h ? h.type : null);
        tt.setExtraStackFrame(g);
      } else
        tt.setExtraStackFrame(null);
    }
    function ke(i, h, g, S, A) {
      {
        var B = Function.call.bind(Ge);
        for (var _ in i)
          if (B(i, _)) {
            var R = void 0;
            try {
              if (typeof i[_] != "function") {
                var le = Error((S || "React class") + ": " + g + " type `" + _ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[_] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw le.name = "Invariant Violation", le;
              }
              R = i[_](h, _, S, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (q) {
              R = q;
            }
            R && !(R instanceof Error) && (Se(A), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", g, _, typeof R), Se(null)), R instanceof Error && !(R.message in mt) && (mt[R.message] = !0, Se(A), C("Failed %s type: %s", g, R.message), Se(null));
          }
      }
    }
    var kt = Array.isArray;
    function nt(i) {
      return kt(i);
    }
    function vt(i) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, g = h && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function at(i) {
      try {
        return gt(i), !1;
      } catch {
        return !0;
      }
    }
    function gt(i) {
      return "" + i;
    }
    function bt(i) {
      if (at(i))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", vt(i)), gt(i);
    }
    var Oe = I.ReactCurrentOwner, At = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, yt, it, ge;
    ge = {};
    function o(i) {
      if (Ge.call(i, "ref")) {
        var h = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function E(i) {
      if (Ge.call(i, "key")) {
        var h = Object.getOwnPropertyDescriptor(i, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function D(i, h) {
      if (typeof i.ref == "string" && Oe.current && h && Oe.current.stateNode !== h) {
        var g = $(Oe.current.type);
        ge[g] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(Oe.current.type), i.ref), ge[g] = !0);
      }
    }
    function U(i, h) {
      {
        var g = function() {
          yt || (yt = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function ne(i, h) {
      {
        var g = function() {
          it || (it = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var be = function(i, h, g, S, A, B, _) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: h,
        ref: g,
        props: _,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return R._store = {}, Object.defineProperty(R._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(R, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: S
      }), Object.defineProperty(R, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: A
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function de(i, h, g, S, A) {
      {
        var B, _ = {}, R = null, le = null;
        g !== void 0 && (bt(g), R = "" + g), E(h) && (bt(h.key), R = "" + h.key), o(h) && (le = h.ref, D(h, A));
        for (B in h)
          Ge.call(h, B) && !At.hasOwnProperty(B) && (_[B] = h[B]);
        if (i && i.defaultProps) {
          var q = i.defaultProps;
          for (B in q)
            _[B] === void 0 && (_[B] = q[B]);
        }
        if (R || le) {
          var Q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          R && U(_, Q), le && ne(_, Q);
        }
        return be(i, R, le, A, S, Oe.current, _);
      }
    }
    var Et = I.ReactCurrentOwner, wt = I.ReactDebugCurrentFrame;
    function ye(i) {
      if (i) {
        var h = i._owner, g = je(i.type, i._source, h ? h.type : null);
        wt.setExtraStackFrame(g);
      } else
        wt.setExtraStackFrame(null);
    }
    var he;
    he = !1;
    function pe(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function He() {
      {
        if (Et.current) {
          var i = $(Et.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Ae(i) {
      {
        if (i !== void 0) {
          var h = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + h + ":" + g + ".";
        }
        return "";
      }
    }
    var Te = {};
    function Ve(i) {
      {
        var h = He();
        if (!h) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (h = `

Check the top-level render call using <` + g + ">.");
        }
        return h;
      }
    }
    function Gt(i, h) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = Ve(h);
        if (Te[g])
          return;
        Te[g] = !0;
        var S = "";
        i && i._owner && i._owner !== Et.current && (S = " It was passed a child from " + $(i._owner.type) + "."), ye(i), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, S), ye(null);
      }
    }
    function Ht(i, h) {
      {
        if (typeof i != "object")
          return;
        if (nt(i))
          for (var g = 0; g < i.length; g++) {
            var S = i[g];
            pe(S) && Gt(S, h);
          }
        else if (pe(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var A = K(i);
          if (typeof A == "function" && A !== i.entries)
            for (var B = A.call(i), _; !(_ = B.next()).done; )
              pe(_.value) && Gt(_.value, h);
        }
      }
    }
    function On(i) {
      {
        var h = i.type;
        if (h == null || typeof h == "string")
          return;
        var g;
        if (typeof h == "function")
          g = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === v))
          g = h.propTypes;
        else
          return;
        if (g) {
          var S = $(h);
          ke(g, i.props, "prop", S, i);
        } else if (h.PropTypes !== void 0 && !he) {
          he = !0;
          var A = $(h);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", A || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Tn(i) {
      {
        for (var h = Object.keys(i.props), g = 0; g < h.length; g++) {
          var S = h[g];
          if (S !== "children" && S !== "key") {
            ye(i), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), ye(null);
            break;
          }
        }
        i.ref !== null && (ye(i), C("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    function Vt(i, h, g, S, A, B) {
      {
        var _ = T(i);
        if (!_) {
          var R = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var le = Ae(A);
          le ? R += le : R += He();
          var q;
          i === null ? q = "null" : nt(i) ? q = "array" : i !== void 0 && i.$$typeof === n ? (q = "<" + ($(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : q = typeof i, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", q, R);
        }
        var Q = de(i, h, g, A, B);
        if (Q == null)
          return Q;
        if (_) {
          var ve = h.children;
          if (ve !== void 0)
            if (S)
              if (nt(ve)) {
                for (var Ye = 0; Ye < ve.length; Ye++)
                  Ht(ve[Ye], i);
                Object.freeze && Object.freeze(ve);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ht(ve, i);
        }
        return i === e ? Tn(Q) : On(Q), Q;
      }
    }
    function Mn(i, h, g) {
      return Vt(i, h, g, !0);
    }
    function Rn(i, h, g) {
      return Vt(i, h, g, !1);
    }
    var Pn = Rn, _n = Mn;
    ot.Fragment = e, ot.jsx = Pn, ot.jsxs = _n;
  }()), ot;
}
process.env.NODE_ENV === "production" ? $t.exports = Ea() : $t.exports = wa();
var l = $t.exports;
function wn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const xa = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ca = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Sa(t) {
  return /* @__PURE__ */ l.jsx(mn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ca,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: xa })
  ] }) }, t.title);
}
function Oa(t) {
  const [n, a] = ce(!1), [e, r] = ce(t.options), s = (p) => {
    t.onDragComplete(p), r(p);
  }, d = (p) => {
    const b = [...e];
    b.splice(p, 1), s(b);
  }, c = [];
  e.forEach((p, b) => {
    c.push(/* @__PURE__ */ l.jsx(Sa, { index: b, title: p, onDelete: d }, p));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(wn, { title: t.title }),
    /* @__PURE__ */ l.jsx(mn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Ta(t) {
  const [n, a] = ce(!1), e = [];
  t.options.map((s, d) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Ma, { option: s }, d));
  });
  let r = "dropdown";
  return t.subdropdown && (r += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(wn, { title: t.title }),
        /* @__PURE__ */ l.jsx(
          "ul",
          {
            style: { visibility: n ? "visible" : "hidden" },
            children: e
          }
        )
      ]
    }
  );
}
function Ma(t) {
  const { option: n } = t, [a, e] = ce("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ l.jsx(
        Oa,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (s) => {
            n.onDragComplete !== void 0 && n.onDragComplete(s);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      r = /* @__PURE__ */ l.jsx(
        Ta,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      r = /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: () => {
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (a !== n.title ? e(n.title) : e(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: r }, aa());
}
function pi(t) {
  const n = [], a = [];
  t.components.forEach((s) => {
    s instanceof ca ? n.push(la) : s instanceof Ue ? (n.push(ua), a.push(fa), da(t)) : s instanceof va ? (n.push(ga), a.push(ba)) : s instanceof En && n.push(ya);
  });
  function e(s) {
    switch (n.forEach((d) => d(t, s)), s.event) {
      case "custom":
        j.dispatchEvent({ type: k.CUSTOM, value: s.data });
        break;
    }
  }
  function r(s) {
    switch (a.forEach((d) => d(t, s)), s.event) {
      case "custom":
        j.dispatchEvent({ type: k.CUSTOM, value: s.data });
        break;
    }
  }
  t.listen = (s) => {
    s.target === "editor" ? r(s) : e(s);
  };
}
const Ra = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Pa = `out vec4 fragColor;
in vec3 worldPosition;

uniform float uDivisions;
uniform float uScale;
uniform vec3 uColor;
uniform float uDistance;
uniform float uSubgridOpacity;
uniform float uGridOpacity;

float getGrid(float gapSize) {
  vec2 worldPositionByDivision = worldPosition.xz / gapSize;

  // Inverted, 0 where line, >1 where there's no line
  // We use the worldPosition (which in this case we use similarly to UVs) differential to control the anti-aliasing
  // We need to do the -0.5)-0.5 trick because the result fades out from 0 to 1, and we want both
  // worldPositionByDivision == 0.3 and worldPositionByDivision == 0.7 to result in the same fade, i.e. 0.3,
  // otherwise only one side of the line will be anti-aliased
  vec2 grid = abs(fract(worldPositionByDivision-0.5)-0.5) / fwidth(worldPositionByDivision) / 2.0;
  float gridLine = min(grid.x, grid.y);

  // Uninvert and clamp
  return 1.0 - min(gridLine, 1.0);
}

void main() {
  float cameraDistanceToGridPlane = distance(cameraPosition.y, worldPosition.y);
  float cameraDistanceToFragmentOnGridPlane = distance(cameraPosition.xz, worldPosition.xz);

  // The size of the grid and subgrid are powers of each other and they are determined based on camera distance.
  // The current grid will become the next subgrid when it becomes too small, and its next power becomes the new grid.
  float subGridPower = pow(uDivisions, floor(log(cameraDistanceToGridPlane) / log(uDivisions)));
  float gridPower = subGridPower * uDivisions;

  // If we want to fade both the grid and its subgrid, we need to displays 3 different opacities, with the next grid being the third
  float nextGridPower = gridPower * uDivisions;

  // 1 where grid, 0 where no grid
  float subgrid = getGrid(subGridPower * uScale);
  float grid = getGrid(gridPower * uScale);
  float nextGrid = getGrid(nextGridPower * uScale);

  // Where we are between the introduction of the current grid power and when we switch to the next grid power
  float stepPercentage = (cameraDistanceToGridPlane - subGridPower)/(gridPower - subGridPower);

  // The last x percentage of the current step over which we want to fade
  float fadeRange = 0.3;

  // We calculate the fade percentage from the step percentage and the fade range
  float fadePercentage = max(stepPercentage - 1.0 + fadeRange, 0.0) / fadeRange;

  // Set base opacity based on how close we are to the drawing distance, with a cubic falloff
  float baseOpacity = subgrid * pow(1.0 - min(cameraDistanceToFragmentOnGridPlane / uDistance, 1.0), 3.0);

  // Shade the subgrid
  fragColor = vec4(uColor.rgb, (baseOpacity - fadePercentage) * uSubgridOpacity);

  // Somewhat arbitrary additional fade coefficient to counter anti-aliasing popping when switching between grid powers
  float fadeCoefficient = 0.5;

  // Shade the grid
  fragColor.a = mix(fragColor.a, baseOpacity * uGridOpacity - fadePercentage * (uGridOpacity - uSubgridOpacity) * fadeCoefficient, grid);

  // Shade the next grid
  fragColor.a = mix(fragColor.a, baseOpacity * uGridOpacity, nextGrid);

  if (fragColor.a <= 0.0) discard;
}`;
class _a extends un {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: In,
      side: Ln,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Tt(16777215)
        },
        uDistance: {
          value: (n == null ? void 0 : n.distance) !== void 0 ? n == null ? void 0 : n.distance : 1e4
        },
        uSubgridOpacity: {
          value: (n == null ? void 0 : n.subgridOpacity) !== void 0 ? n == null ? void 0 : n.subgridOpacity : 0.15
        },
        uGridOpacity: {
          value: (n == null ? void 0 : n.gridOpacity) !== void 0 ? n == null ? void 0 : n.gridOpacity : 0.25
        }
      },
      vertexShader: Ra,
      fragmentShader: Pa,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ja extends Nn {
  constructor() {
    const a = new _a();
    super(new Fn(2, 2), a);
    F(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ka = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
}`, Aa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Da extends un {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ka,
      fragmentShader: Aa
    });
  }
}
function zt(t) {
  const [n, a] = ce(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          t.onToggle !== void 0 && t.onToggle(r), a(r);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: t.label })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function xn(t) {
  const [n, a] = ce(!1), e = t.child.children.length > 0, r = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    r.push(/* @__PURE__ */ l.jsx(xn, { child: s, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            a(!n);
          }
        }
      ) : null,
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "name",
          style: {
            left: e ? "20px" : "5px"
          },
          onClick: () => {
            t.three.getObject(t.child.uuid);
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${ha(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: r }) })
  ] }, Math.random());
}
function Ia(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(xn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const La = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Na(t) {
  return "items" in t;
}
function Be(t) {
  const n = [];
  return t.items.forEach((a) => {
    Na(a) ? n.push(
      /* @__PURE__ */ l.jsx(Be, { title: a.title, items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        st,
        {
          title: a.title,
          prop: a.prop,
          value: a.value,
          type: a.type,
          min: a.min,
          max: a.max,
          step: a.step,
          disabled: a.disabled,
          onChange: (e, r) => {
            a.onChange !== void 0 && a.onChange(e, r);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(zt, { label: t.title, open: t.expanded === !0, children: n });
}
function Fa(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function De(t) {
  switch (t) {
    case "alphaMap":
      return "Alpha Map";
    case "anisotropyMap":
      return "Anisotropy Map";
    case "anisotropyRotation":
      return "Anisotropy Rotation";
    case "aoMap":
      return "AO Map";
    case "aoMapIntensity":
      return "AO Map Intensity";
    case "attenuationColor":
      return "Attenuation Color";
    case "bumpMap":
      return "Bump Map";
    case "bumpScale":
      return "Bump Scale";
    case "clearcoatMap":
      return "Clearcoat Map";
    case "clearcoatNormalMap":
      return "Clearcoat Normal Map";
    case "clearcoatNormalScale":
      return "Clearcoat Normal Scale";
    case "clearcoatRoughness":
      return "Clearcoat Roughness";
    case "clearcoatRoughnessMap":
      return "Clearcoat Roughness Map";
    case "color":
      return "Color";
    case "defines":
      return "Defines";
    case "depthTest":
      return "Depth Test";
    case "depthWrite":
      return "Depth Write";
    case "displacementBias":
      return "Displacement Bias";
    case "displacementMap":
      return "Displacement Map";
    case "displacementScale":
      return "Displacement Scale";
    case "dithering":
      return "Dithering";
    case "emissive":
      return "Emissive";
    case "emissiveMap":
      return "Emissive Map";
    case "emissiveIntensity":
      return "Emissive Intensity";
    case "envMap":
      return "Environment Map";
    case "envMapIntensity":
      return "Environment Map Intensity";
    case "extensions":
      return "Extensions";
    case "flatShading":
      return "Flat Shading";
    case "fragmentShader":
      return "Fragment Shader";
    case "fog":
      return "Fog";
    case "gradientMap":
      return "Gradient Map";
    case "ior":
      return "IOR";
    case "iridescenceIOR":
      return "Iridescence IOR";
    case "iridescenceMap":
      return "Iridescence Map";
    case "iridescenceThicknessMap":
      return "Iridescence Thickness Map";
    case "iridescenceThicknessRange":
      return "Iridescence Thickness Range";
    case "lights":
      return "Lights";
    case "lightMap":
      return "Light Map";
    case "lightMapIntensity":
      return "Light Map Intensity";
    case "map":
      return "Map";
    case "matcap":
      return "Matcap";
    case "metalness":
      return "Metalness";
    case "metalnessMap":
      return "Metalness Map";
    case "name":
      return "Name";
    case "normalMap":
      return "Normal Map";
    case "normalScale":
      return "Normal Scale";
    case "opacity":
      return "Opacity";
    case "reflectivity":
      return "Reflectivity";
    case "refractionRatio":
      return "Refraction Ratio";
    case "roughness":
      return "Roughness";
    case "roughnessMap":
      return "Roughness Map";
    case "sheenColor":
      return "Sheen Color";
    case "sheenColorMap":
      return "Sheen Color Map";
    case "sheenRoughness":
      return "Sheen Roughness";
    case "sheenRoughnessMap":
      return "Sheen Roughness Map";
    case "shininess":
      return "Shininess";
    case "size":
      return "Size";
    case "sizeAttenuation":
      return "Size Attenuation";
    case "specular":
      return "Specular";
    case "specularColor":
      return "Specular Color";
    case "specularColorMap":
      return "Specular Color Map";
    case "specularIntensity":
      return "Specular Intensity";
    case "specularIntensityMap":
      return "Specular Map Intensity";
    case "thickness":
      return "Thickness";
    case "thicknessMap":
      return "Thickness Map";
    case "transmission":
      return "Transmission";
    case "transmissionMap":
      return "Transmission Map";
    case "transparent":
      return "Transparent";
    case "type":
      return "Type";
    case "uuid":
      return "UUID";
    case "uniforms":
      return "Uniforms";
    case "vertexShader":
      return "Vertex Shader";
    case "visible":
      return "Visible";
    case "wireframe":
      return "Wireframe";
  }
  return t;
}
function Ua(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Ba() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], r = new FileReader();
        r.onload = function(s) {
          n(s.target.result);
        }, r.readAsDataURL(e);
      }
    }), t.click();
  });
}
function Jt(t, n, a) {
  const e = [];
  for (const r in t) {
    if (!Fa(r))
      continue;
    const s = typeof t[r], d = t[r];
    if (s === "boolean" || s === "number" || s === "string") {
      const c = {
        title: De(r),
        prop: r,
        type: s,
        value: d,
        min: void 0,
        max: void 0,
        onChange: (u, p) => {
          var v;
          a.updateObject(n.uuid, `material.${u}`, p), s === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = (v = a.scene) == null ? void 0 : v.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && Z(b, `material.${u}`, p);
        }
      };
      Ua(r) && (c.value = Number(d), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01), e.push(c);
    } else if (s === "object")
      if (d.isColor)
        e.push({
          title: De(r),
          prop: r,
          type: "color",
          value: d,
          onChange: (c, u) => {
            var v;
            const p = new Tt(u);
            a.updateObject(n.uuid, `material.${c}`, p);
            const b = (v = a.scene) == null ? void 0 : v.getObjectByProperty("uuid", n.uuid);
            b !== void 0 && Z(b, `material.${c}`, p);
          }
        });
      else if (Array.isArray(d)) {
        const c = [];
        for (const u in d)
          c.push({
            title: `${u}`,
            type: `${typeof d[u]}`,
            value: d[u],
            onChange: (p, b) => {
              var w;
              a.updateObject(n.uuid, `material.${r}`, b);
              const v = (w = a.scene) == null ? void 0 : w.getObjectByProperty("uuid", n.uuid);
              v !== void 0 && Z(v, `material.${r}`, b);
            }
          });
        e.push({
          title: De(r),
          items: c
        });
      } else {
        const c = [];
        for (const u in d) {
          const p = d[u];
          switch (typeof p) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: De(r),
                type: "image",
                value: p,
                onChange: (v, w) => {
                  var O;
                  a.createTexture(n.uuid, `material.${r}`, w);
                  const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && Bt(w).then((M) => {
                    Z(x, `material.${r}`, M), Z(x, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${De(u)}`,
                prop: `material.${r}.${u}`,
                type: `${typeof t[r][u]}`,
                value: d[u],
                onChange: (v, w) => {
                  var O;
                  a.updateObject(n.uuid, `material.${r}.${u}`, w);
                  const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && Z(x, `material.${r}.${u}`, w);
                }
              });
              break;
            case "object":
              if (p.value !== void 0 && p.value.src !== void 0)
                c.push({
                  title: De(u),
                  type: "image",
                  value: p.value.src,
                  onChange: (v, w) => {
                    var O;
                    a.createTexture(n.uuid, `material.${r}.${u}.value`, d);
                    const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && Bt(w).then((M) => {
                      Z(x, `material.${r}.${u}.value`, M);
                    });
                  }
                });
              else if (r === "uniforms") {
                const v = p.value, w = (x, O, M) => ({
                  title: x,
                  type: "number",
                  value: M,
                  onChange: (K, I) => {
                    var ie;
                    const C = `material.uniforms.${u}.value.${O}`;
                    a.updateObject(n.uuid, C, I);
                    const V = (ie = a.scene) == null ? void 0 : ie.getObjectByProperty("uuid", n.uuid);
                    V !== void 0 && Z(V, C, I);
                  }
                });
                if (typeof p.value == "number")
                  c.push({
                    title: u,
                    type: "number",
                    value: p.value,
                    onChange: (x, O) => {
                      var I;
                      const M = `material.${r}.${x}.value`;
                      a.updateObject(n.uuid, M, O);
                      const K = (I = a.scene) == null ? void 0 : I.getObjectByProperty("uuid", n.uuid);
                      K !== void 0 && Z(K, M, O);
                    }
                  });
                else if (v.r !== void 0 && v.g !== void 0 && v.b !== void 0)
                  c.push({
                    title: u,
                    type: "color",
                    value: p.value,
                    onChange: (x, O) => {
                      var C;
                      const M = new Tt(O), K = `material.${r}.${x}.value`;
                      a.updateObject(n.uuid, K, M);
                      const I = (C = a.scene) == null ? void 0 : C.getObjectByProperty("uuid", n.uuid);
                      I !== void 0 && Z(I, K, M);
                    }
                  });
                else if (v.x !== void 0 && v.y !== void 0 && v.z === void 0 && v.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        w("X", "x", p.value.x),
                        w("Y", "y", p.value.y)
                      ]
                    }
                  );
                else if (v.x !== void 0 && v.y !== void 0 && v.z !== void 0 && v.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        w("X", "x", p.value.x),
                        w("Y", "y", p.value.y),
                        w("Z", "z", p.value.z)
                      ]
                    }
                  );
                else if (v.x !== void 0 && v.y !== void 0 && v.z !== void 0 && v.w !== void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        w("X", "x", p.value.x),
                        w("Y", "y", p.value.y),
                        w("Z", "z", p.value.z),
                        w("W", "w", p.value.w)
                      ]
                    }
                  );
                else if (v.elements !== void 0) {
                  const x = v.elements, O = [];
                  for (let M = 0; M < x.length; M++)
                    O.push(w(M.toString(), M.toString(), x[M]));
                  c.push(
                    {
                      title: u,
                      items: O
                    }
                  );
                } else
                  console.log(">>> need to add this format:", u, v);
              } else
                c.push({
                  title: u,
                  type: `${typeof p.value}`,
                  value: p.value,
                  onChange: (v, w) => {
                    var O;
                    a.updateObject(n.uuid, `material.${r}.${u}.value`, w);
                    const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && Z(x, `material.${r}.${u}.value`, w);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: De(r),
          items: c
        });
      }
    else
      d !== void 0 && console.log("other:", r, s, d);
  }
  return e.sort((r, s) => r.title < s.title ? -1 : r.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function $a(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], r = a.length;
    for (let s = 0; s < r; s++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Be,
          {
            title: `Material ${s}`,
            items: Jt(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Be,
      {
        title: "Material",
        items: Jt(a, t, n)
      }
    );
}
function st(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = ra(t.value));
  const [a, e] = ce(n), r = Ce(null), s = Ce(null), d = Ce(null);
  Fe(() => {
    var V;
    let b = !1, v = -1, w = 0, x = Number(a);
    const O = (ie) => {
      b = !0, w = x, v = ie.clientX;
    }, M = (ie) => {
      if (!b)
        return;
      const ue = t.step !== void 0 ? t.step : 1, te = (ie.clientX - v) * ue;
      x = Number((w + te).toFixed(4)), s.current !== null && (s.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, K = () => {
      b = !1;
    }, I = () => {
      b = !1;
    }, C = t.type === "number";
    return C && ((V = r.current) == null || V.addEventListener("mousedown", O, !1), document.addEventListener("mouseup", K, !1), document.addEventListener("mousemove", M, !1), document.addEventListener("contextmenu", I, !1)), () => {
      var ie;
      C && ((ie = r.current) == null || ie.removeEventListener("mousedown", O), document.removeEventListener("mouseup", K), document.removeEventListener("mousemove", M), document.removeEventListener("contextmenu", I));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = c || t.type === "image", p = (b) => {
    let v = b.target.value;
    t.type === "boolean" && (v = b.target.checked), e(v), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: r, children: t.title }, "fieldLabel"),
    t.type === "string" && !c && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: p,
        value: a
      }
    ),
    t.type === "string" && c && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: p,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: p,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: s,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: p
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: p, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: p
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: p, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: p })
    ] }),
    t.type === "button" && /* @__PURE__ */ l.jsx(
      "button",
      {
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: d, onClick: () => {
      Ba().then((b) => {
        d.current.src = b, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
      });
    }, src: a.length > 0 ? a : La })
  ] });
}
function Qt(t) {
  switch (t) {
    case "fov":
      return "FOV";
    case "zoom":
      return "Zoom";
    case "near":
      return "Near";
    case "far":
      return "Far";
    case "focus":
      return "Focus";
    case "aspect":
      return "Aspect";
    case "filmGauge":
      return "Film Gauge";
    case "filmOffset":
      return "Film Offset";
    case "left":
      return "Left";
    case "right":
      return "Right";
    case "top":
      return "Top";
    case "bottom":
      return "Bottom";
  }
  return t;
}
function za(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Qt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var c;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && (Z(d, r, s), d.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: Qt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var c;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && (Z(d, r, s), d.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Be,
    {
      title: "Camera",
      items: a
    }
  );
}
const Ga = Math.PI / 180, Ha = 180 / Math.PI;
function qe(t, n, a, e, r) {
  return e + (t - n) * (r - e) / (a - n);
}
function Va(t) {
  return t * Ga;
}
function Lt(t) {
  return t * Ha;
}
function Ya(t, n) {
  const a = new Un();
  a.elements = t.matrix;
  const e = new X(), r = new Bn(), s = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), r.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const d = (u, p) => {
    var v;
    n.updateObject(t.uuid, u, p);
    const b = (v = n.scene) == null ? void 0 : v.getObjectByProperty("uuid", t.uuid);
    b !== void 0 && Z(b, u, p);
  }, c = (u, p) => {
    d(u, Va(p));
  };
  return /* @__PURE__ */ l.jsx(
    Be,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: d
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: d
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: d
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: Dt(Lt(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Dt(Lt(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Dt(Lt(r.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: s.x,
          step: 0.01,
          onChange: d
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: d
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: d
        }
      ]
    }
  );
}
function en(t) {
  switch (t) {
    case "color":
      return "Color";
    case "intensity":
      return "Intensity";
    case "decay":
      return "Decay";
    case "distance":
      return "Distance";
    case "angle":
      return "Angle";
    case "penumbra":
      return "Penumbra";
    case "groundColor":
      return "Ground Color";
  }
  return t;
}
function Wa(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const r = t.lightInfo[e];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: en(e),
        prop: e,
        type: "color",
        value: r,
        onChange: (s, d) => {
          var p;
          const c = new Tt(d);
          n.updateObject(t.uuid, s, c);
          const u = (p = n.scene) == null ? void 0 : p.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && Z(u, s, c);
        }
      }) : a.push({
        title: en(e),
        prop: e,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (s, d) => {
          var u;
          n.updateObject(t.uuid, s, d);
          const c = (u = n.scene) == null ? void 0 : u.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && Z(c, s, d);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Be,
    {
      title: "Light",
      items: a
    }
  );
}
function Ka(t, n) {
  const a = [];
  return t.animations.forEach((e) => {
    a.push({
      title: "Name",
      type: "string",
      prop: "name",
      value: e.name,
      disabled: !0,
      onChange: (r, s) => {
        var c;
        n.updateObject(t.uuid, r, s);
        const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
        d !== void 0 && Z(d, r, s);
      }
    }), a.push({
      title: "Duration",
      type: "number",
      prop: "duration",
      value: e.duration,
      disabled: !0,
      onChange: (r, s) => {
        var c;
        n.updateObject(t.uuid, r, s);
        const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
        d !== void 0 && Z(d, r, s);
      }
    }), a.push({
      title: "Blend Mode",
      type: "number",
      prop: "blendMode",
      value: e.blendMode,
      disabled: !0,
      onChange: (r, s) => {
        var c;
        n.updateObject(t.uuid, r, s);
        const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
        d !== void 0 && Z(d, r, s);
      }
    });
  }), /* @__PURE__ */ l.jsx(Be, { title: "Animations", items: a });
}
const Cn = {
  name: "",
  uuid: "",
  type: "",
  visible: !1,
  matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  animations: [],
  material: void 0,
  perspectiveCameraInfo: void 0,
  orthographicCameraInfo: void 0,
  lightInfo: void 0
};
let re = { ...Cn };
function Xa(t) {
  const [n, a] = ce(-1);
  Fe(() => {
    function s(c) {
      re = { ...c.value }, a(Date.now());
    }
    function d() {
      re = { ...Cn }, a(Date.now());
    }
    return j.addEventListener(k.SET_SCENE, d), j.addEventListener(k.SET_OBJECT, s), () => {
      j.removeEventListener(k.SET_SCENE, d), j.removeEventListener(k.SET_OBJECT, s);
    };
  }, []);
  const e = re.type.toLowerCase(), r = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(zt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: re.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: re.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: re.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: re.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: re.visible,
          onChange: (s, d) => {
            var u;
            t.three.updateObject(re.uuid, s, d);
            const c = (u = t.three.scene) == null ? void 0 : u.getObjectByProperty("uuid", re.uuid);
            c !== void 0 && Z(c, s, d);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Ya(re, t.three),
      re.animations.length > 0 ? Ka(re, t.three) : null,
      e.search("camera") > -1 ? za(re, t.three) : null,
      e.search("light") > -1 ? Wa(re, t.three) : null,
      r ? $a(re, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class mi extends ta {
  constructor(a) {
    super(a);
    F(this, "three");
    // Private
    F(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      scene: a.scene !== void 0 ? a.scene : null
    }, this.three = a.three, j.addEventListener(k.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    j.removeEventListener(k.SET_SCENE, this.setScene);
  }
  render() {
    var r;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(r = this.componentState.scene) == null ? void 0 : r.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(zt, { label: e, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: a && /* @__PURE__ */ l.jsx(Ia, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(Xa, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function vi(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (c) => {
    var p;
    if (!n())
      return;
    const u = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", c.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (c, u, p) => {
    var v;
    if (!n())
      return;
    const b = (v = t.three.scene) == null ? void 0 : v.getObjectByProperty("uuid", c);
    b !== void 0 && Z(b, u, p);
  }, r = (c) => {
    if (!n())
      return;
    const u = c.value, { key: p, value: b, uuid: v } = u;
    e(v, p, b);
  }, s = (c) => {
    if (!n())
      return;
    const u = c.value;
    Bt(u.value).then((p) => {
      e(u.uuid, u.key, p), e(u.uuid, "material.needsUpdate", !0);
    });
  }, d = (c) => {
    var w;
    if (!n())
      return;
    const { key: u, uuid: p, value: b } = c.value, v = (w = t.three.scene) == null ? void 0 : w.getObjectByProperty("uuid", p);
    if (v !== void 0)
      try {
        v[u](b);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(b);
      }
  };
  return Fe(() => (j.addEventListener(k.GET_OBJECT, a), j.addEventListener(k.UPDATE_OBJECT, r), j.addEventListener(k.CREATE_TEXTURE, s), j.addEventListener(k.REQUEST_METHOD, d), () => {
    j.removeEventListener(k.GET_OBJECT, a), j.removeEventListener(k.UPDATE_OBJECT, r), j.removeEventListener(k.CREATE_TEXTURE, s), j.removeEventListener(k.REQUEST_METHOD, d);
  }), []), null;
}
const tn = { type: "change" }, Nt = { type: "start" }, nn = { type: "end" }, xt = new $n(), an = new zn(), qa = Math.cos(70 * Gn.DEG2RAD);
class Za extends cn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: We.ROTATE, MIDDLE: We.DOLLY, RIGHT: We.PAN }, this.touches = { ONE: Ke.ROTATE, TWO: Ke.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", at), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", at), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(tn), e.update(), s = r.NONE;
    }, this.update = function() {
      const o = new X(), E = new Kt().setFromUnitVectors(n.up, new X(0, 1, 0)), D = E.clone().invert(), U = new X(), ne = new Kt(), be = new X(), de = 2 * Math.PI;
      return function(wt = null) {
        const ye = e.object.position;
        o.copy(ye).sub(e.target), o.applyQuaternion(E), c.setFromVector3(o), e.autoRotate && s === r.NONE && G(y(wt)), e.enableDamping ? (c.theta += u.theta * e.dampingFactor, c.phi += u.phi * e.dampingFactor) : (c.theta += u.theta, c.phi += u.phi);
        let he = e.minAzimuthAngle, pe = e.maxAzimuthAngle;
        isFinite(he) && isFinite(pe) && (he < -Math.PI ? he += de : he > Math.PI && (he -= de), pe < -Math.PI ? pe += de : pe > Math.PI && (pe -= de), he <= pe ? c.theta = Math.max(he, Math.min(pe, c.theta)) : c.theta = c.theta > (he + pe) / 2 ? Math.max(he, c.theta) : Math.min(pe, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(b, e.dampingFactor) : e.target.add(b), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && te || e.object.isOrthographicCamera ? c.radius = J(c.radius) : c.radius = J(c.radius * p), o.setFromSpherical(c), o.applyQuaternion(D), ye.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, b.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), b.set(0, 0, 0));
        let He = !1;
        if (e.zoomToCursor && te) {
          let Ae = null;
          if (e.object.isPerspectiveCamera) {
            const Te = o.length();
            Ae = J(Te * p);
            const Ve = Te - Ae;
            e.object.position.addScaledVector(ie, Ve), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Te = new X(ue.x, ue.y, 0);
            Te.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), He = !0;
            const Ve = new X(ue.x, ue.y, 0);
            Ve.unproject(e.object), e.object.position.sub(Ve).add(Te), e.object.updateMatrixWorld(), Ae = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ae !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ae).add(e.object.position) : (xt.origin.copy(e.object.position), xt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(xt.direction)) < qa ? n.lookAt(e.target) : (an.setFromNormalAndCoplanarPoint(e.object.up, e.target), xt.intersectPlane(an, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), He = !0);
        return p = 1, te = !1, He || U.distanceToSquared(e.object.position) > d || 8 * (1 - ne.dot(e.object.quaternion)) > d || be.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(tn), U.copy(e.object.position), ne.copy(e.object.quaternion), be.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Oe), e.domElement.removeEventListener("pointerdown", tt), e.domElement.removeEventListener("pointercancel", ke), e.domElement.removeEventListener("wheel", vt), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", at), e._domElementKeyEvents = null);
    };
    const e = this, r = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let s = r.NONE;
    const d = 1e-6, c = new Xt(), u = new Xt();
    let p = 1;
    const b = new X(), v = new fe(), w = new fe(), x = new fe(), O = new fe(), M = new fe(), K = new fe(), I = new fe(), C = new fe(), V = new fe(), ie = new X(), ue = new fe();
    let te = !1;
    const f = [], m = {};
    function y(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function T(o) {
      const E = Math.abs(o) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * E);
    }
    function G(o) {
      u.theta -= o;
    }
    function H(o) {
      u.phi -= o;
    }
    const $ = function() {
      const o = new X();
      return function(D, U) {
        o.setFromMatrixColumn(U, 0), o.multiplyScalar(-D), b.add(o);
      };
    }(), L = function() {
      const o = new X();
      return function(D, U) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(U, 1) : (o.setFromMatrixColumn(U, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(D), b.add(o);
      };
    }(), z = function() {
      const o = new X();
      return function(D, U) {
        const ne = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const be = e.object.position;
          o.copy(be).sub(e.target);
          let de = o.length();
          de *= Math.tan(e.object.fov / 2 * Math.PI / 180), $(2 * D * de / ne.clientHeight, e.object.matrix), L(2 * U * de / ne.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? ($(D * (e.object.right - e.object.left) / e.object.zoom / ne.clientWidth, e.object.matrix), L(U * (e.object.top - e.object.bottom) / e.object.zoom / ne.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function ee(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function P(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(o, E) {
      if (!e.zoomToCursor)
        return;
      te = !0;
      const D = e.domElement.getBoundingClientRect(), U = o - D.left, ne = E - D.top, be = D.width, de = D.height;
      ue.x = U / be * 2 - 1, ue.y = -(ne / de) * 2 + 1, ie.set(ue.x, ue.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function J(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function me(o) {
      v.set(o.clientX, o.clientY);
    }
    function Re(o) {
      N(o.clientX, o.clientX), I.set(o.clientX, o.clientY);
    }
    function Je(o) {
      O.set(o.clientX, o.clientY);
    }
    function dt(o) {
      w.set(o.clientX, o.clientY), x.subVectors(w, v).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      G(2 * Math.PI * x.x / E.clientHeight), H(2 * Math.PI * x.y / E.clientHeight), v.copy(w), e.update();
    }
    function Pt(o) {
      C.set(o.clientX, o.clientY), V.subVectors(C, I), V.y > 0 ? ee(T(V.y)) : V.y < 0 && P(T(V.y)), I.copy(C), e.update();
    }
    function _t(o) {
      M.set(o.clientX, o.clientY), K.subVectors(M, O).multiplyScalar(e.panSpeed), z(K.x, K.y), O.copy(M), e.update();
    }
    function Qe(o) {
      N(o.clientX, o.clientY), o.deltaY < 0 ? P(T(o.deltaY)) : o.deltaY > 0 && ee(T(o.deltaY)), e.update();
    }
    function et(o) {
      let E = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? H(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(0, e.keyPanSpeed), E = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? H(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(0, -e.keyPanSpeed), E = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? G(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(e.keyPanSpeed, 0), E = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? G(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(-e.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (o.preventDefault(), e.update());
    }
    function Pe(o) {
      if (f.length === 1)
        v.set(o.pageX, o.pageY);
      else {
        const E = ge(o), D = 0.5 * (o.pageX + E.x), U = 0.5 * (o.pageY + E.y);
        v.set(D, U);
      }
    }
    function ze(o) {
      if (f.length === 1)
        O.set(o.pageX, o.pageY);
      else {
        const E = ge(o), D = 0.5 * (o.pageX + E.x), U = 0.5 * (o.pageY + E.y);
        O.set(D, U);
      }
    }
    function _e(o) {
      const E = ge(o), D = o.pageX - E.x, U = o.pageY - E.y, ne = Math.sqrt(D * D + U * U);
      I.set(0, ne);
    }
    function jt(o) {
      e.enableZoom && _e(o), e.enablePan && ze(o);
    }
    function ft(o) {
      e.enableZoom && _e(o), e.enableRotate && Pe(o);
    }
    function ht(o) {
      if (f.length == 1)
        w.set(o.pageX, o.pageY);
      else {
        const D = ge(o), U = 0.5 * (o.pageX + D.x), ne = 0.5 * (o.pageY + D.y);
        w.set(U, ne);
      }
      x.subVectors(w, v).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      G(2 * Math.PI * x.x / E.clientHeight), H(2 * Math.PI * x.y / E.clientHeight), v.copy(w);
    }
    function pt(o) {
      if (f.length === 1)
        M.set(o.pageX, o.pageY);
      else {
        const E = ge(o), D = 0.5 * (o.pageX + E.x), U = 0.5 * (o.pageY + E.y);
        M.set(D, U);
      }
      K.subVectors(M, O).multiplyScalar(e.panSpeed), z(K.x, K.y), O.copy(M);
    }
    function je(o) {
      const E = ge(o), D = o.pageX - E.x, U = o.pageY - E.y, ne = Math.sqrt(D * D + U * U);
      C.set(0, ne), V.set(0, Math.pow(C.y / I.y, e.zoomSpeed)), ee(V.y), I.copy(C);
      const be = (o.pageX + E.x) * 0.5, de = (o.pageY + E.y) * 0.5;
      N(be, de);
    }
    function Ge(o) {
      e.enableZoom && je(o), e.enablePan && pt(o);
    }
    function mt(o) {
      e.enableZoom && je(o), e.enableRotate && ht(o);
    }
    function tt(o) {
      e.enabled !== !1 && (f.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", Se), e.domElement.addEventListener("pointerup", ke)), At(o), o.pointerType === "touch" ? gt(o) : kt(o));
    }
    function Se(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? bt(o) : nt(o));
    }
    function ke(o) {
      yt(o), f.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke)), e.dispatchEvent(nn), s = r.NONE;
    }
    function kt(o) {
      let E;
      switch (o.button) {
        case 0:
          E = e.mouseButtons.LEFT;
          break;
        case 1:
          E = e.mouseButtons.MIDDLE;
          break;
        case 2:
          E = e.mouseButtons.RIGHT;
          break;
        default:
          E = -1;
      }
      switch (E) {
        case We.DOLLY:
          if (e.enableZoom === !1)
            return;
          Re(o), s = r.DOLLY;
          break;
        case We.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            Je(o), s = r.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            me(o), s = r.ROTATE;
          }
          break;
        case We.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            me(o), s = r.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Je(o), s = r.PAN;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(Nt);
    }
    function nt(o) {
      switch (s) {
        case r.ROTATE:
          if (e.enableRotate === !1)
            return;
          dt(o);
          break;
        case r.DOLLY:
          if (e.enableZoom === !1)
            return;
          Pt(o);
          break;
        case r.PAN:
          if (e.enablePan === !1)
            return;
          _t(o);
          break;
      }
    }
    function vt(o) {
      e.enabled === !1 || e.enableZoom === !1 || s !== r.NONE || (o.preventDefault(), e.dispatchEvent(Nt), Qe(o), e.dispatchEvent(nn));
    }
    function at(o) {
      e.enabled === !1 || e.enablePan === !1 || et(o);
    }
    function gt(o) {
      switch (it(o), f.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ke.ROTATE:
              if (e.enableRotate === !1)
                return;
              Pe(o), s = r.TOUCH_ROTATE;
              break;
            case Ke.PAN:
              if (e.enablePan === !1)
                return;
              ze(o), s = r.TOUCH_PAN;
              break;
            default:
              s = r.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ke.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              jt(o), s = r.TOUCH_DOLLY_PAN;
              break;
            case Ke.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              ft(o), s = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = r.NONE;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(Nt);
    }
    function bt(o) {
      switch (it(o), s) {
        case r.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ht(o), e.update();
          break;
        case r.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          pt(o), e.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Ge(o), e.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          mt(o), e.update();
          break;
        default:
          s = r.NONE;
      }
    }
    function Oe(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function At(o) {
      f.push(o.pointerId);
    }
    function yt(o) {
      delete m[o.pointerId];
      for (let E = 0; E < f.length; E++)
        if (f[E] == o.pointerId) {
          f.splice(E, 1);
          return;
        }
    }
    function it(o) {
      let E = m[o.pointerId];
      E === void 0 && (E = new fe(), m[o.pointerId] = E), E.set(o.pageX, o.pageY);
    }
    function ge(o) {
      const E = o.pointerId === f[0] ? f[1] : f[0];
      return m[E];
    }
    e.domElement.addEventListener("contextmenu", Oe), e.domElement.addEventListener("pointerdown", tt), e.domElement.addEventListener("pointercancel", ke), e.domElement.addEventListener("wheel", vt, { passive: !1 }), this.update();
  }
}
const Ot = (t) => {
  const [n, a] = ce(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, r = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => r(s), children: s }, s)) })
  ] });
}, Ie = na(function(n, a) {
  const [e, r] = ce(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && r(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Ot,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (d) => {
          r(d);
        },
        up: !0
      }
    )
  ] });
}), rn = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ae = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function $e(t, n) {
  const a = new dn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ae.set(t, a), a;
}
$e("Top", new X(0, 1e3, 0));
$e("Bottom", new X(0, -1e3, 0));
$e("Left", new X(-1e3, 0, 0));
$e("Right", new X(1e3, 0, 0));
$e("Front", new X(0, 0, 1e3));
$e("Back", new X(0, 0, -1e3));
$e("Orthographic", new X(1e3, 1e3, 1e3));
const Rt = new Ft(60, 1, 50, 3e3);
Rt.name = "Debug";
Rt.position.set(500, 500, 500);
Rt.lookAt(0, 0, 0);
ae.set("Debug", Rt);
const on = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ja = new Hn(), Qa = new Vn(), ei = new Da(), ti = new Yn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let Ct = "Renderer";
const W = new fn();
W.name = "Debug Scene";
let xe = new fn();
W.add(xe);
const ut = new Wn();
ut.name = "helpers";
W.add(ut);
const ni = new ja();
ut.add(ni);
const Sn = new hn(500);
Sn.name = "axisHelper";
ut.add(Sn);
const lt = new hn(100);
lt.name = "interactionHelper";
ut.add(lt);
lt.visible = !1;
let St = !1, Y = ae.get("Debug"), se = ae.get("Orthographic"), Le = ae.get("Front"), Ne = ae.get("Top"), sn = !1;
function gi(t) {
  const [n, a] = ce(t.mode !== void 0 ? t.mode : "Single"), [e, r] = ce(null), [s, d] = ce(!1), [c, u] = ce(!1), [p, b] = ce(!1), [, v] = ce(Date.now()), w = Ce(null), x = Ce(null), O = Ce(null), M = Ce(null), K = Ce(null), I = Ce(null), C = (f, m) => {
    const y = oe.get(f.name);
    y !== void 0 && y.dispose(), oe.delete(f.name);
    const T = we.get(f.name);
    T !== void 0 && (W.remove(T), T.dispose()), we.delete(f.name);
    const G = new Za(f, m);
    switch (G.enableDamping = !0, G.dampingFactor = 0.05, f.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        G.enableRotate = !1;
        break;
    }
    if (oe.set(f.name, G), f instanceof Ft) {
      const H = new qn(f);
      we.set(f.name, H), W.add(H);
    }
  }, V = (f) => {
    const m = we.get(f.name);
    m !== void 0 && (W.remove(m), m.dispose(), we.delete(f.name));
    const y = oe.get(f.name);
    y !== void 0 && (y.dispose(), oe.delete(f.name));
  }, ie = () => {
    oe.forEach((f, m) => {
      f.dispose();
      const y = we.get(m);
      y !== void 0 && (W.remove(y), y.dispose()), we.delete(m), oe.delete(m);
    }), oe.clear(), we.clear();
  }, ue = () => {
    switch (n) {
      case "Single":
        C(Y, O.current);
        break;
      case "Side by Side":
      case "Stacked":
        C(Y, O.current), C(se, M.current);
        break;
      case "Quad":
        C(Y, O.current), C(se, M.current), C(Le, K.current), C(Ne, I.current);
        break;
    }
  };
  Fe(() => {
    const f = new Kn({
      canvas: w.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), r(f);
  }, []), Fe(() => {
    const f = (T) => {
      gn(xe), W.remove(xe);
      const G = t.scenes.get(T.value.name);
      if (G !== void 0) {
        const H = new G();
        t.onSceneSet !== void 0 && t.onSceneSet(H), xe = H, t.three.scene = xe, W.add(xe), sn = !0;
      }
    }, m = (T) => {
      var $;
      const G = T.value, H = ($ = t.three.scene) == null ? void 0 : $.getObjectByProperty("uuid", G.uuid);
      H !== void 0 && ae.set(G.name, H), v(Date.now());
    }, y = (T) => {
      ae.delete(T.value.name), v(Date.now());
    };
    return j.addEventListener(k.SET_SCENE, f), j.addEventListener(k.ADD_CAMERA, m), j.addEventListener(k.REMOVE_CAMERA, y), () => {
      j.removeEventListener(k.SET_SCENE, f), j.removeEventListener(k.ADD_CAMERA, m), j.removeEventListener(k.REMOVE_CAMERA, y);
    };
  }, []), Fe(() => {
    if (e === null)
      return;
    let f = window.innerWidth, m = window.innerHeight, y = Math.floor(f / 2), T = Math.floor(m / 2), G = -1;
    const H = () => {
      f = window.innerWidth - 300, m = window.innerHeight, y = Math.floor(f / 2), T = Math.floor(m / 2), e.setSize(f, m);
      let P = f, N = m;
      switch (n) {
        case "Side by Side":
          P = y, N = m;
          break;
        case "Stacked":
          P = f, N = T;
          break;
        case "Quad":
          P = y, N = T;
          break;
      }
      ae.forEach((J) => {
        var me;
        J instanceof dn ? (J.left = P / -2, J.right = P / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof Ft && (J.aspect = P / N, J.updateProjectionMatrix(), (me = we.get(J.name)) == null || me.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, f, m), e.setScissor(0, 0, f, m), e.render(W, Y);
    }, L = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, y, m), e.setScissor(0, 0, y, m), e.render(W, Y), e.setViewport(y, 0, y, m), e.setScissor(y, 0, y, m), e.render(W, se);
      else {
        const P = m - T;
        e.setViewport(0, P, f, T), e.setScissor(0, P, f, T), e.render(W, Y), e.setViewport(0, 0, f, T), e.setScissor(0, 0, f, T), e.render(W, se);
      }
    }, z = () => {
      let P = 0, N = 0;
      N = m - T, P = 0, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, Y), P = y, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, se), N = 0, P = 0, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, Le), P = y, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, Ne);
    }, ee = () => {
      switch (oe.forEach((P) => {
        P.update();
      }), t.onSceneUpdate !== void 0 && sn && t.onSceneUpdate(xe), e.clear(), n) {
        case "Single":
          $();
          break;
        case "Side by Side":
        case "Stacked":
          L();
          break;
        case "Quad":
          z();
          break;
      }
      G = requestAnimationFrame(ee);
    };
    return ue(), window.addEventListener("resize", H), H(), ee(), () => {
      window.removeEventListener("resize", H), cancelAnimationFrame(G), G = -1;
    };
  }, [n, e]), Fe(() => {
    if (e !== null) {
      const f = new Xn(), m = new fe(), y = ($, L, z, ee) => {
        switch (n) {
          case "Quad":
            $ < z ? L < ee ? f.setFromCamera(m, Y) : f.setFromCamera(m, Le) : L < ee ? f.setFromCamera(m, se) : f.setFromCamera(m, Ne);
            break;
          case "Side by Side":
            $ < z ? f.setFromCamera(m, Y) : f.setFromCamera(m, se);
            break;
          case "Single":
            f.setFromCamera(m, Y);
            break;
          case "Stacked":
            L < ee ? f.setFromCamera(m, Y) : f.setFromCamera(m, se);
            break;
        }
      }, T = ($) => {
        if (!St)
          return;
        const L = new fe();
        e.getSize(L);
        const z = Math.min($.clientX, L.x), ee = Math.min($.clientY, L.y);
        m.x = qe(z, 0, L.x, -1, 1), m.y = qe(ee, 0, L.y, 1, -1);
        const P = L.x / 2, N = L.y / 2, J = () => {
          z < P ? m.x = qe(z, 0, P, -1, 1) : m.x = qe(z, P, L.x, -1, 1);
        }, me = () => {
          ee < N ? m.y = qe(ee, 0, N, 1, -1) : m.y = qe(ee, N, L.y, 1, -1);
        };
        switch (n) {
          case "Quad":
            J(), me();
            break;
          case "Side by Side":
            J();
            break;
          case "Stacked":
            me(), me();
            break;
        }
        y(z, ee, P, N);
        const Re = f.intersectObjects(xe.children);
        Re.length > 0 && lt.position.copy(Re[0].point);
      }, G = ($) => {
        if (!St)
          return;
        const L = new fe();
        if (e.getSize(L), $.clientX >= L.x)
          return;
        T($);
        const z = f.intersectObjects(xe.children);
        z.length > 0 && t.three.getObject(z[0].object.uuid);
      }, H = x.current;
      return H.addEventListener("mousemove", T, !1), H.addEventListener("click", G, !1), () => {
        H.removeEventListener("mousemove", T), H.removeEventListener("click", G);
      };
    }
  }, [n, e]);
  const te = [];
  return ae.forEach((f, m) => {
    te.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: w }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: x, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ie, { camera: Y, options: te, ref: O, onSelect: (f) => {
        var y;
        (y = oe.get(Y.name)) == null || y.dispose();
        const m = ae.get(f);
        m !== void 0 && (V(Y), Y = m, C(m, O.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: Y, options: te, ref: O, onSelect: (f) => {
          var y;
          (y = oe.get(Y.name)) == null || y.dispose();
          const m = ae.get(f);
          m !== void 0 && (V(Y), Y = m, C(m, O.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: se, options: te, ref: M, onSelect: (f) => {
          var y;
          (y = oe.get(se.name)) == null || y.dispose();
          const m = ae.get(f);
          m !== void 0 && (V(se), se = m, C(m, M.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: Y, options: te, ref: O, onSelect: (f) => {
          var y;
          (y = oe.get(Y.name)) == null || y.dispose();
          const m = ae.get(f);
          m !== void 0 && (V(Y), Y = m, C(m, O.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: se, options: te, ref: M, onSelect: (f) => {
          var y;
          (y = oe.get(se.name)) == null || y.dispose();
          const m = ae.get(f);
          m !== void 0 && (V(se), se = m, C(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Le, options: te, ref: K, onSelect: (f) => {
          var y;
          (y = oe.get(Le.name)) == null || y.dispose();
          const m = ae.get(f);
          m !== void 0 && (V(Le), Le = m, C(m, K.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Ne, options: te, ref: I, onSelect: (f) => {
          var y;
          (y = oe.get(Ne.name)) == null || y.dispose();
          const m = ae.get(f);
          m !== void 0 && (V(Ne), Ne = m, C(m, I.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: rn.indexOf(n),
          options: rn,
          onSelect: (f) => {
            f !== n && (ie(), a(f));
          },
          open: s,
          onToggle: (f) => {
            d(f), c && u(!1), p && b(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: on.indexOf(Ct),
          options: on,
          onSelect: (f) => {
            if (f !== Ct)
              switch (Ct = f, Ct) {
                case "Depth":
                  W.overrideMaterial = Ja;
                  break;
                case "Normals":
                  W.overrideMaterial = Qa;
                  break;
                default:
                case "Renderer":
                  W.overrideMaterial = null;
                  break;
                case "Wireframe":
                  W.overrideMaterial = ti;
                  break;
                case "UVs":
                  W.overrideMaterial = ei;
                  break;
              }
          },
          open: c,
          onToggle: (f) => {
            s && d(!1), u(f), p && b(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (f) => {
            St = f === "Selection Mode", lt.visible = St;
          },
          open: p,
          onToggle: (f) => {
            s && d(!1), c && u(!1), b(f);
          }
        }
      )
    ] })
  ] });
}
function bi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  zt as Accordion,
  hi as Application,
  Mt as BaseRemote,
  xn as ChildObject,
  Ia as ContainerObject,
  Oa as Draggable,
  Sa as DraggableItem,
  Ta as Dropdown,
  Ma as DropdownItem,
  bi as Editor,
  ja as InfiniteGridHelper,
  Xa as Inspector,
  gi as MultiView,
  wn as NavButton,
  ca as RemoteComponents,
  pi as RemoteController,
  Ue as RemoteTheatre,
  va as RemoteThree,
  En as RemoteTweakpane,
  vi as SceneInspector,
  mi as SidePanel,
  k as ToolEvents,
  Da as UVMaterial,
  ui as clamp,
  ra as colorToHex,
  j as debugDispatcher,
  gn as dispose,
  sa as disposeMaterial,
  fi as disposeTexture,
  di as distance,
  vn as hierarchyUUID,
  ia as isColor,
  aa as randomID,
  oa as resetThreeObjects,
  Dt as round,
  Ut as totalThreeObjects
};
