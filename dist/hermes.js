var kn = Object.defineProperty;
var An = (t, n, a) => n in t ? kn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var F = (t, n, a) => (An(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as Dn, EventDispatcher as ln, Texture as un, CubeTexture as In, RepeatWrapping as Kt, ShaderMaterial as dn, GLSL3 as Ln, DoubleSide as Nn, Color as Tt, Mesh as Fn, PlaneGeometry as Un, Matrix4 as Bn, Vector3 as X, Euler as $n, Ray as zn, Plane as Gn, MathUtils as Hn, MOUSE as We, TOUCH as Ke, Quaternion as Xt, Spherical as qt, Vector2 as fe, PerspectiveCamera as Ut, MeshDepthMaterial as Vn, MeshNormalMaterial as Yn, MeshBasicMaterial as Wn, OrthographicCamera as fn, Scene as hn, Group as Kn, AxesHelper as pn, WebGLRenderer as Xn, Raycaster as qn, CameraHelper as Zn } from "three";
import { getProject as Jn, createRafDriver as Qn } from "@theatre/core";
import ct from "@theatre/studio";
import { Pane as ea } from "tweakpane";
import * as ta from "@tweakpane/plugin-essentials";
import mn, { useState as ce, useRef as Ce, useEffect as Fe, Component as na, forwardRef as aa } from "react";
import { Reorder as vn } from "framer-motion";
function Mt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function di(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function fi(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function ia() {
  return Math.round(Math.random() * 1e6).toString();
}
function ra(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function sa(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (u) => {
    const f = u.toString(16);
    return f.length === 1 ? "0" + f : f;
  }, o = i(n), d = i(a), c = i(e);
  return "#" + o + d + c;
}
function It(t, n = 1) {
  return Number(t.toFixed(n));
}
let Bt = 0;
const oa = () => {
  Bt = 0;
}, gn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Bt}`, Bt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    gn(a);
  });
}, hi = (t) => {
  t == null || t.dispose();
}, ca = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, bn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof Dn ? (a.pause(), a.parent && a.parent.remove(a)) : bn(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), ca(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class pi {
  constructor(n, a, e = !0, i = "editor") {
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
    this.editor = a && document.location.hash.search(i) > -1, this._debugEnabled = a, a && (this.useBC = e, e ? (this.broadcastChannel = new BroadcastChannel(n), this.broadcastChannel.addEventListener("message", this.messageHandler)) : (this.webSocket = new WebSocket(n), this.webSocket.addEventListener("open", this.openHandler), this.webSocket.addEventListener("close", this.closeHandler), this.webSocket.addEventListener("message", this.messageHandler)));
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
const j = new ln(), k = {
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
class Rt {
  constructor(n) {
    F(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class la extends Rt {
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
function ua(t, n) {
  switch (n.event) {
    case "selectComponent":
      j.dispatchEvent({ type: k.SELECT_DROPDOWN, value: n.data });
      break;
    case "draggableListUpdate":
      j.dispatchEvent({ type: k.DRAG_UPDATE, value: n.data });
      break;
  }
}
const yn = () => {
}, Ze = class Ze extends Rt {
  constructor() {
    super(...arguments);
    F(this, "project");
    F(this, "sheets", /* @__PURE__ */ new Map());
    F(this, "sheetObjects", /* @__PURE__ */ new Map());
    F(this, "sheetObjectCBs", /* @__PURE__ */ new Map());
    F(this, "sheetObjectUnsubscribe", /* @__PURE__ */ new Map());
  }
  init(a, e) {
    return this.project = Jn(a, e), this.project.ready;
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(a) {
    var i;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let e = this.sheets.get(a);
    return e !== void 0 || (e = (i = this.project) == null ? void 0 : i.sheet(a), this.sheets.set(a, e)), e;
  }
  playSheet(a, e) {
    var i;
    (i = this.sheet(a)) == null || i.sequence.play(e), this.app.send({
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
    this.sheetObjects.forEach((e, i) => {
      i.search(`${a}_`) > -1 && this.unsubscribe(e);
    });
  }
  sheetObject(a, e, i, o) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const d = this.sheet(a);
    if (d === void 0)
      return;
    const c = `${a}_${e}`;
    let u = this.sheetObjects.get(c);
    u !== void 0 ? u = d.object(e, { ...i, ...u.value }, { reconfigure: !0 }) : u = d.object(e, i), this.sheetObjects.set(c, u), this.sheetObjectCBs.set(c, o !== void 0 ? o : yn);
    const f = u.onValuesChange((b) => {
      if (this.app.editor) {
        for (const w in b) {
          const x = b[w];
          typeof x == "object" && ra(x) && (b[w] = {
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
    return this.sheetObjectUnsubscribe.set(c, f), u;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = a.address.sheetId, i = a.address.objectKey, o = this.sheets.get(e);
    o == null || o.detachObject(i);
    const d = `${e}_${i}`, c = this.sheetObjectUnsubscribe.get(d);
    c !== void 0 && (this.sheetObjects.delete(d), this.sheetObjectCBs.delete(d), this.sheetObjectUnsubscribe.delete(d), c());
  }
  static getRafDriver() {
    return Ze.rafDriver || (Ze.rafDriver = Qn()), Ze.rafDriver;
  }
};
F(Ze, "rafDriver", null);
let Ue = Ze, Me;
function da(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Ue) {
      let e;
      const i = a;
      switch (n.event) {
        case "setSheet":
          e = i.sheets.get(n.data.sheet), e !== void 0 && (Me = e, ct.setSelection([e]));
          break;
        case "setSheetObject":
          e = i.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), e !== void 0 && ct.setSelection([e]);
          break;
        case "updateSheetObject":
          e = i.sheets.get(n.data.sheet), e !== void 0 && e.sequence.pause(), e = i.sheetObjectCBs.get(n.data.sheetObject), e !== void 0 && e(n.data.values);
          break;
        case "updateTimeline":
          e = i.sheets.get(n.data.sheet), Me !== void 0 && (Me.sequence.position = n.data.position);
          break;
      }
    }
  });
}
function fa(t) {
  if (t.editor) {
    let n;
    t.components.forEach((o) => {
      o instanceof Ue && (n = o);
    }), ct.ui.restore(), ct.onSelectionChange((o) => {
      o.length < 1 || o.forEach((d) => {
        let c = d.address.sheetId, u = "setSheet", f = {};
        switch (d.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", f = {
              sheet: d.address.sheetId
            }, Me = n.sheets.get(d.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", c += `_${d.address.objectKey}`, f = {
              id: c,
              sheet: d.address.sheetId,
              key: d.address.objectKey
            };
            break;
        }
        t.send({ event: u, target: "app", data: f });
      });
    });
    let a = 0;
    const e = () => {
      if (Ue.getRafDriver().tick(performance.now()), Me !== void 0 && a !== Me.sequence.position) {
        a = Me.sequence.position;
        const o = Me;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: a,
            sheet: o.address.sheetId
          }
        });
      }
    }, i = () => {
      e(), requestAnimationFrame(i);
    };
    e(), i();
  } else
    ct.ui.hide();
}
function ha(t, n) {
  t.editor && t.components.forEach((a) => {
    var e, i;
    if (a instanceof Ue) {
      const o = a;
      switch (n.event) {
        case "playSheet":
          (e = o.sheet(n.data.sheet)) == null || e.sequence.play(n.data.value);
          break;
        case "pauseSheet":
          (i = o.sheet(n.data.sheet)) == null || i.sequence.pause();
          break;
      }
      return;
    }
  });
}
function pa(t) {
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
function En(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(En(a));
  }), n;
}
function ma(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function va(t) {
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
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || va(a))
      continue;
    const e = typeof t[a], i = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = i;
        break;
      case "object":
        if (i !== null)
          if (n[a] = i, i.isTexture)
            if (i instanceof un) {
              const o = i.source.toJSON();
              n[a] = { src: o.url };
            } else
              i instanceof In && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = ma(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Lt(t) {
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
      const i = [];
      e.material.forEach((o) => {
        i.push(Xe(o));
      }), n.material = i;
    } else
      n.material = Xe(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((o) => {
        i.push(Xe(o));
      }), n.material = i;
    } else
      n.material = Xe(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((o) => {
        i.push(Xe(o));
      }), n.material = i;
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
function q(t, n, a) {
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
function $t(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const i = new un(e);
      i.wrapS = Kt, i.wrapT = Kt, i.needsUpdate = !0, n(i);
    }, e.onerror = a, e.src = t;
  });
}
class ga extends Rt {
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
    const e = Lt(a);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(a, e, i) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: i
      }
    });
  }
  updateObject(a, e, i) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: i
      }
    });
  }
  createTexture(a, e, i) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: i
      }
    });
  }
  setScene(a) {
    if (a === void 0 || (this.scene = a, !this.app.debugEnabled))
      return;
    oa(), gn(this.scene);
    const e = En(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(a) {
    if (!this.app.debugEnabled)
      return;
    const e = Lt(a);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(a) {
    if (!this.app.debugEnabled)
      return;
    const e = Lt(a);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
function ba(t, n) {
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
function ya(t, n) {
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
class wn extends Rt {
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
    this.pane = new ea({ title: "GUI" }), this.pane.registerPlugin(ta);
  }
  dispose() {
    var a;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((a = this.pane) == null || a.dispose(), this.pane = void 0);
  }
  addFolder(a, e = void 0, i = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addFolder({
        title: a,
        ...e
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: a,
        params: e,
        parent: i
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(a, e, i, o = void 0) {
    const d = this.bindID, c = i.onChange !== void 0 ? i.onChange : yn;
    this.bindCBs.set(d, c), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addBinding(a, e, i).on("change", (f) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: d,
          value: f.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: d,
        name: e,
        params: i,
        parent: o
      }
    }), this.appCallbacks++);
  }
  triggerBind(a, e) {
    const i = this.bindCBs.get(a);
    i !== void 0 ? i(e) : console.warn(`No callback for: ${a}`, e);
  }
  // Buttons
  button(a, e, i = void 0) {
    const o = this.bindID;
    this.buttonCBs.set(o, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addButton({ title: a }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: o
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: o,
        name: a,
        callback: e,
        parent: i
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
function Ea(t, n) {
  t.components.forEach((a) => {
    if (a instanceof wn) {
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
var zt = { exports: {} }, rt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zt;
function wa() {
  if (Zt)
    return rt;
  Zt = 1;
  var t = mn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(c, u, f) {
    var b, v = {}, w = null, x = null;
    f !== void 0 && (w = "" + f), u.key !== void 0 && (w = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (b in u)
      e.call(u, b) && !o.hasOwnProperty(b) && (v[b] = u[b]);
    if (c && c.defaultProps)
      for (b in u = c.defaultProps, u)
        v[b] === void 0 && (v[b] = u[b]);
    return { $$typeof: n, type: c, key: w, ref: x, props: v, _owner: i.current };
  }
  return rt.Fragment = a, rt.jsx = d, rt.jsxs = d, rt;
}
var st = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jt;
function xa() {
  return Jt || (Jt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = mn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), O = Symbol.iterator, M = "@@iterator";
    function K(r) {
      if (r === null || typeof r != "object")
        return null;
      var p = O && r[O] || r[M];
      return typeof p == "function" ? p : null;
    }
    var I = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(r) {
      {
        for (var p = arguments.length, g = new Array(p > 1 ? p - 1 : 0), S = 1; S < p; S++)
          g[S - 1] = arguments[S];
        V("error", r, g);
      }
    }
    function V(r, p, g) {
      {
        var S = I.ReactDebugCurrentFrame, A = S.getStackAddendum();
        A !== "" && (p += "%s", g = g.concat([A]));
        var B = g.map(function(_) {
          return String(_);
        });
        B.unshift("Warning: " + p), Function.prototype.apply.call(console[r], console, B);
      }
    }
    var ie = !1, ue = !1, te = !1, h = !1, m = !1, y;
    y = Symbol.for("react.module.reference");
    function T(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === o || m || r === i || r === f || r === b || h || r === x || ie || ue || te || typeof r == "object" && r !== null && (r.$$typeof === w || r.$$typeof === v || r.$$typeof === d || r.$$typeof === c || r.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === y || r.getModuleId !== void 0));
    }
    function G(r, p, g) {
      var S = r.displayName;
      if (S)
        return S;
      var A = p.displayName || p.name || "";
      return A !== "" ? g + "(" + A + ")" : g;
    }
    function H(r) {
      return r.displayName || "Context";
    }
    function $(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case o:
          return "Profiler";
        case i:
          return "StrictMode";
        case f:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case c:
            var p = r;
            return H(p) + ".Consumer";
          case d:
            var g = r;
            return H(g._context) + ".Provider";
          case u:
            return G(r, r.render, "ForwardRef");
          case v:
            var S = r.displayName || null;
            return S !== null ? S : $(r.type) || "Memo";
          case w: {
            var A = r, B = A._payload, _ = A._init;
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
    function _t() {
      {
        if (z === 0) {
          ee = console.log, P = console.info, N = console.warn, J = console.error, me = console.group, Re = console.groupCollapsed, Je = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: dt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        z++;
      }
    }
    function jt() {
      {
        if (z--, z === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, r, {
              value: ee
            }),
            info: L({}, r, {
              value: P
            }),
            warn: L({}, r, {
              value: N
            }),
            error: L({}, r, {
              value: J
            }),
            group: L({}, r, {
              value: me
            }),
            groupCollapsed: L({}, r, {
              value: Re
            }),
            groupEnd: L({}, r, {
              value: Je
            })
          });
        }
        z < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Qe = I.ReactCurrentDispatcher, et;
    function Pe(r, p, g) {
      {
        if (et === void 0)
          try {
            throw Error();
          } catch (A) {
            var S = A.stack.trim().match(/\n( *(at )?)/);
            et = S && S[1] || "";
          }
        return `
` + et + r;
      }
    }
    var ze = !1, _e;
    {
      var kt = typeof WeakMap == "function" ? WeakMap : Map;
      _e = new kt();
    }
    function ft(r, p) {
      if (!r || ze)
        return "";
      {
        var g = _e.get(r);
        if (g !== void 0)
          return g;
      }
      var S;
      ze = !0;
      var A = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = Qe.current, Qe.current = null, _t();
      try {
        if (p) {
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
            Reflect.construct(r, [], _);
          } else {
            try {
              _.call();
            } catch (Ee) {
              S = Ee;
            }
            r.call(_.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ee) {
            S = Ee;
          }
          r();
        }
      } catch (Ee) {
        if (Ee && S && typeof Ee.stack == "string") {
          for (var R = Ee.stack.split(`
`), le = S.stack.split(`
`), Z = R.length - 1, Q = le.length - 1; Z >= 1 && Q >= 0 && R[Z] !== le[Q]; )
            Q--;
          for (; Z >= 1 && Q >= 0; Z--, Q--)
            if (R[Z] !== le[Q]) {
              if (Z !== 1 || Q !== 1)
                do
                  if (Z--, Q--, Q < 0 || R[Z] !== le[Q]) {
                    var ve = `
` + R[Z].replace(" at new ", " at ");
                    return r.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", r.displayName)), typeof r == "function" && _e.set(r, ve), ve;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        ze = !1, Qe.current = B, jt(), Error.prepareStackTrace = A;
      }
      var Ye = r ? r.displayName || r.name : "", Wt = Ye ? Pe(Ye) : "";
      return typeof r == "function" && _e.set(r, Wt), Wt;
    }
    function ht(r, p, g) {
      return ft(r, !1);
    }
    function pt(r) {
      var p = r.prototype;
      return !!(p && p.isReactComponent);
    }
    function je(r, p, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return ft(r, pt(r));
      if (typeof r == "string")
        return Pe(r);
      switch (r) {
        case f:
          return Pe("Suspense");
        case b:
          return Pe("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case u:
            return ht(r.render);
          case v:
            return je(r.type, p, g);
          case w: {
            var S = r, A = S._payload, B = S._init;
            try {
              return je(B(A), p, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Ge = Object.prototype.hasOwnProperty, mt = {}, tt = I.ReactDebugCurrentFrame;
    function Se(r) {
      if (r) {
        var p = r._owner, g = je(r.type, r._source, p ? p.type : null);
        tt.setExtraStackFrame(g);
      } else
        tt.setExtraStackFrame(null);
    }
    function ke(r, p, g, S, A) {
      {
        var B = Function.call.bind(Ge);
        for (var _ in r)
          if (B(r, _)) {
            var R = void 0;
            try {
              if (typeof r[_] != "function") {
                var le = Error((S || "React class") + ": " + g + " type `" + _ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[_] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw le.name = "Invariant Violation", le;
              }
              R = r[_](p, _, S, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              R = Z;
            }
            R && !(R instanceof Error) && (Se(A), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", g, _, typeof R), Se(null)), R instanceof Error && !(R.message in mt) && (mt[R.message] = !0, Se(A), C("Failed %s type: %s", g, R.message), Se(null));
          }
      }
    }
    var At = Array.isArray;
    function nt(r) {
      return At(r);
    }
    function vt(r) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, g = p && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g;
      }
    }
    function at(r) {
      try {
        return gt(r), !1;
      } catch {
        return !0;
      }
    }
    function gt(r) {
      return "" + r;
    }
    function bt(r) {
      if (at(r))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", vt(r)), gt(r);
    }
    var Oe = I.ReactCurrentOwner, Dt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, yt, it, ge;
    ge = {};
    function s(r) {
      if (Ge.call(r, "ref")) {
        var p = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function E(r) {
      if (Ge.call(r, "key")) {
        var p = Object.getOwnPropertyDescriptor(r, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function D(r, p) {
      if (typeof r.ref == "string" && Oe.current && p && Oe.current.stateNode !== p) {
        var g = $(Oe.current.type);
        ge[g] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(Oe.current.type), r.ref), ge[g] = !0);
      }
    }
    function U(r, p) {
      {
        var g = function() {
          yt || (yt = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function ne(r, p) {
      {
        var g = function() {
          it || (it = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var be = function(r, p, g, S, A, B, _) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: p,
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
    function de(r, p, g, S, A) {
      {
        var B, _ = {}, R = null, le = null;
        g !== void 0 && (bt(g), R = "" + g), E(p) && (bt(p.key), R = "" + p.key), s(p) && (le = p.ref, D(p, A));
        for (B in p)
          Ge.call(p, B) && !Dt.hasOwnProperty(B) && (_[B] = p[B]);
        if (r && r.defaultProps) {
          var Z = r.defaultProps;
          for (B in Z)
            _[B] === void 0 && (_[B] = Z[B]);
        }
        if (R || le) {
          var Q = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          R && U(_, Q), le && ne(_, Q);
        }
        return be(r, R, le, A, S, Oe.current, _);
      }
    }
    var Et = I.ReactCurrentOwner, wt = I.ReactDebugCurrentFrame;
    function ye(r) {
      if (r) {
        var p = r._owner, g = je(r.type, r._source, p ? p.type : null);
        wt.setExtraStackFrame(g);
      } else
        wt.setExtraStackFrame(null);
    }
    var he;
    he = !1;
    function pe(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function He() {
      {
        if (Et.current) {
          var r = $(Et.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Ae(r) {
      {
        if (r !== void 0) {
          var p = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + p + ":" + g + ".";
        }
        return "";
      }
    }
    var Te = {};
    function Ve(r) {
      {
        var p = He();
        if (!p) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (p = `

Check the top-level render call using <` + g + ">.");
        }
        return p;
      }
    }
    function Ht(r, p) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = Ve(p);
        if (Te[g])
          return;
        Te[g] = !0;
        var S = "";
        r && r._owner && r._owner !== Et.current && (S = " It was passed a child from " + $(r._owner.type) + "."), ye(r), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, S), ye(null);
      }
    }
    function Vt(r, p) {
      {
        if (typeof r != "object")
          return;
        if (nt(r))
          for (var g = 0; g < r.length; g++) {
            var S = r[g];
            pe(S) && Ht(S, p);
          }
        else if (pe(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var A = K(r);
          if (typeof A == "function" && A !== r.entries)
            for (var B = A.call(r), _; !(_ = B.next()).done; )
              pe(_.value) && Ht(_.value, p);
        }
      }
    }
    function Tn(r) {
      {
        var p = r.type;
        if (p == null || typeof p == "string")
          return;
        var g;
        if (typeof p == "function")
          g = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === v))
          g = p.propTypes;
        else
          return;
        if (g) {
          var S = $(p);
          ke(g, r.props, "prop", S, r);
        } else if (p.PropTypes !== void 0 && !he) {
          he = !0;
          var A = $(p);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", A || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Mn(r) {
      {
        for (var p = Object.keys(r.props), g = 0; g < p.length; g++) {
          var S = p[g];
          if (S !== "children" && S !== "key") {
            ye(r), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), ye(null);
            break;
          }
        }
        r.ref !== null && (ye(r), C("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    function Yt(r, p, g, S, A, B) {
      {
        var _ = T(r);
        if (!_) {
          var R = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var le = Ae(A);
          le ? R += le : R += He();
          var Z;
          r === null ? Z = "null" : nt(r) ? Z = "array" : r !== void 0 && r.$$typeof === n ? (Z = "<" + ($(r.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof r, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
        }
        var Q = de(r, p, g, A, B);
        if (Q == null)
          return Q;
        if (_) {
          var ve = p.children;
          if (ve !== void 0)
            if (S)
              if (nt(ve)) {
                for (var Ye = 0; Ye < ve.length; Ye++)
                  Vt(ve[Ye], r);
                Object.freeze && Object.freeze(ve);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Vt(ve, r);
        }
        return r === e ? Mn(Q) : Tn(Q), Q;
      }
    }
    function Rn(r, p, g) {
      return Yt(r, p, g, !0);
    }
    function Pn(r, p, g) {
      return Yt(r, p, g, !1);
    }
    var _n = Pn, jn = Rn;
    st.Fragment = e, st.jsx = _n, st.jsxs = jn;
  }()), st;
}
process.env.NODE_ENV === "production" ? zt.exports = wa() : zt.exports = xa();
var l = zt.exports;
function xn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const Ca = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Sa = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Oa(t) {
  return /* @__PURE__ */ l.jsx(vn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Sa,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ca })
  ] }) }, t.title);
}
function Ta(t) {
  const [n, a] = ce(!1), [e, i] = ce(t.options), o = (f) => {
    t.onDragComplete(f), i(f);
  }, d = (f) => {
    const b = [...e];
    b.splice(f, 1), o(b);
  }, c = [];
  e.forEach((f, b) => {
    c.push(/* @__PURE__ */ l.jsx(Oa, { index: b, title: f, onDelete: d }, f));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(xn, { title: t.title }),
    /* @__PURE__ */ l.jsx(vn.Group, { axis: "y", values: e, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Ma(t) {
  const [n, a] = ce(!1), e = [];
  t.options.map((o, d) => {
    t.onSelect !== void 0 && (o.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Ra, { option: o }, d));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(xn, { title: t.title }),
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
function Ra(t) {
  const { option: n } = t, [a, e] = ce("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        Ta,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (o) => {
            n.onDragComplete !== void 0 && n.onDragComplete(o);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      i = /* @__PURE__ */ l.jsx(
        Ma,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      i = /* @__PURE__ */ l.jsx(
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: i }, ia());
}
function mi(t) {
  const n = [], a = [];
  t.components.forEach((o) => {
    o instanceof la ? n.push(ua) : o instanceof Ue ? (n.push(da), a.push(ha), fa(t)) : o instanceof ga ? (n.push(ba), a.push(ya)) : o instanceof wn && n.push(Ea);
  });
  function e(o) {
    switch (n.forEach((d) => d(t, o)), o.event) {
      case "custom":
        j.dispatchEvent({ type: k.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((d) => d(t, o)), o.event) {
      case "custom":
        j.dispatchEvent({ type: k.CUSTOM, value: o.data });
        break;
    }
  }
  t.listen = (o) => {
    o.target === "editor" ? i(o) : e(o);
  };
}
const Pa = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, _a = `out vec4 fragColor;
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
class ja extends dn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Ln,
      side: Nn,
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
      vertexShader: Pa,
      fragmentShader: _a,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ka extends Fn {
  constructor() {
    const a = new ja();
    super(new Un(2, 2), a);
    F(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Aa = `#include <common>
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
}`, Da = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Ia extends dn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Aa,
      fragmentShader: Da
    });
  }
}
function Gt(t) {
  const [n, a] = ce(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const i = !n;
          t.onToggle !== void 0 && t.onToggle(i), a(i);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: Mt(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function Cn(t) {
  const [n, a] = ce(!1), e = t.child.children.length > 0, i = [];
  return t.child.children.length > 0 && t.child.children.map((o) => {
    i.push(/* @__PURE__ */ l.jsx(Cn, { child: o, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${pa(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: i }) })
  ] }, Math.random());
}
function La(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Cn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Na = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Fa(t) {
  return "items" in t;
}
function Be(t) {
  const n = [];
  return t.items.forEach((a) => {
    Fa(a) ? n.push(
      /* @__PURE__ */ l.jsx(Be, { title: Mt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        ot,
        {
          title: a.title,
          prop: a.prop,
          value: a.value,
          type: a.type,
          min: a.min,
          max: a.max,
          step: a.step,
          disabled: a.disabled,
          onChange: (e, i) => {
            a.onChange !== void 0 && a.onChange(e, i);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Gt, { label: t.title, open: t.expanded === !0, children: n });
}
function Ua(t) {
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
function Ba(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function $a() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], i = new FileReader();
        i.onload = function(o) {
          n(o.target.result);
        }, i.readAsDataURL(e);
      }
    }), t.click();
  });
}
function Qt(t, n, a) {
  const e = [];
  for (const i in t) {
    if (!Ua(i))
      continue;
    const o = typeof t[i], d = t[i];
    if (o === "boolean" || o === "number" || o === "string") {
      const c = {
        title: De(i),
        prop: i,
        type: o,
        value: d,
        min: void 0,
        max: void 0,
        onChange: (f, b) => {
          var w;
          a.updateObject(n.uuid, `material.${f}`, b), o === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const v = (w = a.scene) == null ? void 0 : w.getObjectByProperty("uuid", n.uuid);
          v !== void 0 && q(v, `material.${f}`, b);
        }
      };
      Ba(i) && (c.value = Number(d), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const u = o === "string" && (i === "vertexShader" || i === "fragmentShader");
      u && (c.disabled = !1, c.latest = c.value, c.onChange = (f, b) => {
        c.latest = b;
      }), e.push(c), u && e.push({
        title: `${Mt(i)} - Update`,
        type: "button",
        onChange: () => {
          var b;
          a.updateObject(n.uuid, `material.${i}`, c.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const f = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
          f !== void 0 && (q(f, `material.${i}`, c.latest), f.material.needsUpdate = !0);
        }
      });
    } else if (o === "object")
      if (d.isColor)
        e.push({
          title: De(i),
          prop: i,
          type: "color",
          value: d,
          onChange: (c, u) => {
            var v;
            const f = new Tt(u);
            a.updateObject(n.uuid, `material.${c}`, f);
            const b = (v = a.scene) == null ? void 0 : v.getObjectByProperty("uuid", n.uuid);
            b !== void 0 && q(b, `material.${c}`, f);
          }
        });
      else if (Array.isArray(d)) {
        const c = [];
        for (const u in d)
          c.push({
            title: `${u}`,
            type: `${typeof d[u]}`,
            value: d[u],
            onChange: (f, b) => {
              var w;
              a.updateObject(n.uuid, `material.${i}`, b);
              const v = (w = a.scene) == null ? void 0 : w.getObjectByProperty("uuid", n.uuid);
              v !== void 0 && q(v, `material.${i}`, b);
            }
          });
        e.push({
          title: De(i),
          items: c
        });
      } else {
        const c = [];
        for (const u in d) {
          const f = d[u];
          switch (typeof f) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: De(i),
                type: "image",
                value: f,
                onChange: (v, w) => {
                  var O;
                  a.createTexture(n.uuid, `material.${i}`, w);
                  const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && $t(w).then((M) => {
                    q(x, `material.${i}`, M), q(x, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${De(u)}`,
                prop: `material.${i}.${u}`,
                type: `${typeof t[i][u]}`,
                value: d[u],
                onChange: (v, w) => {
                  var O;
                  a.updateObject(n.uuid, `material.${i}.${u}`, w);
                  const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && q(x, `material.${i}.${u}`, w);
                }
              });
              break;
            case "object":
              if (f.value !== void 0 && f.value.src !== void 0)
                c.push({
                  title: De(u),
                  type: "image",
                  value: f.value.src,
                  onChange: (v, w) => {
                    var O;
                    a.createTexture(n.uuid, `material.${i}.${u}.value`, d);
                    const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && $t(w).then((M) => {
                      q(x, `material.${i}.${u}.value`, M);
                    });
                  }
                });
              else if (i === "uniforms") {
                const v = f.value, w = (x, O, M) => ({
                  title: x,
                  type: "number",
                  value: M,
                  step: 0.01,
                  onChange: (K, I) => {
                    var ie;
                    const C = `material.uniforms.${u}.value.${O}`;
                    a.updateObject(n.uuid, C, I);
                    const V = (ie = a.scene) == null ? void 0 : ie.getObjectByProperty("uuid", n.uuid);
                    V !== void 0 && q(V, C, I);
                  }
                });
                if (typeof f.value == "number")
                  c.push({
                    title: u,
                    type: "number",
                    value: f.value,
                    onChange: (x, O) => {
                      var I;
                      const M = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, M, O);
                      const K = (I = a.scene) == null ? void 0 : I.getObjectByProperty("uuid", n.uuid);
                      K !== void 0 && q(K, M, O);
                    }
                  });
                else if (v.r !== void 0 && v.g !== void 0 && v.b !== void 0)
                  c.push({
                    title: u,
                    type: "color",
                    value: f.value,
                    onChange: (x, O) => {
                      var C;
                      const M = new Tt(O), K = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, K, M);
                      const I = (C = a.scene) == null ? void 0 : C.getObjectByProperty("uuid", n.uuid);
                      I !== void 0 && q(I, K, M);
                    }
                  });
                else if (v.x !== void 0 && v.y !== void 0 && v.z === void 0 && v.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        w("X", "x", f.value.x),
                        w("Y", "y", f.value.y)
                      ]
                    }
                  );
                else if (v.x !== void 0 && v.y !== void 0 && v.z !== void 0 && v.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        w("X", "x", f.value.x),
                        w("Y", "y", f.value.y),
                        w("Z", "z", f.value.z)
                      ]
                    }
                  );
                else if (v.x !== void 0 && v.y !== void 0 && v.z !== void 0 && v.w !== void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        w("X", "x", f.value.x),
                        w("Y", "y", f.value.y),
                        w("Z", "z", f.value.z),
                        w("W", "w", f.value.w)
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
                  type: `${typeof f.value}`,
                  value: f.value,
                  onChange: (v, w) => {
                    var O;
                    a.updateObject(n.uuid, `material.${i}.${u}.value`, w);
                    const x = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && q(x, `material.${i}.${u}.value`, w);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: De(i),
          items: c
        });
      }
    else
      d !== void 0 && console.log("other:", i, o, d);
  }
  return e.sort((i, o) => i.title < o.title ? -1 : i.title > o.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function za(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], i = a.length;
    for (let o = 0; o < i; o++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Be,
          {
            title: `Material ${o}`,
            items: Qt(a[o], t, n)
          },
          `Material ${o}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Be,
      {
        title: "Material",
        items: Qt(a, t, n)
      }
    );
}
function ot(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = sa(t.value));
  const [a, e] = ce(n), i = Ce(null), o = Ce(null), d = Ce(null);
  Fe(() => {
    var V;
    let b = !1, v = -1, w = 0, x = Number(a);
    const O = (ie) => {
      b = !0, w = x, v = ie.clientX;
    }, M = (ie) => {
      if (!b)
        return;
      const ue = t.step !== void 0 ? t.step : 1, te = (ie.clientX - v) * ue;
      x = Number((w + te).toFixed(4)), o.current !== null && (o.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, K = () => {
      b = !1;
    }, I = () => {
      b = !1;
    }, C = t.type === "number";
    return C && ((V = i.current) == null || V.addEventListener("mousedown", O, !1), document.addEventListener("mouseup", K, !1), document.addEventListener("mousemove", M, !1), document.addEventListener("contextmenu", I, !1)), () => {
      var ie;
      C && ((ie = i.current) == null || ie.removeEventListener("mousedown", O), document.removeEventListener("mouseup", K), document.removeEventListener("mousemove", M), document.removeEventListener("contextmenu", I));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = c || t.type === "image", f = (b) => {
    let v = b.target.value;
    t.type === "boolean" && (v = b.target.checked), e(v), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Mt(t.title) }, "fieldLabel"),
    t.type === "string" && !c && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: f,
        value: a
      }
    ),
    t.type === "string" && c && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: f,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: f,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: o,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: f
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: f, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: f
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: f, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: f })
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
      $a().then((b) => {
        d.current.src = b, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
      });
    }, src: a.length > 0 ? a : Na })
  ] });
}
function en(t) {
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
function Ga(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: en(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, o) => {
          var c;
          n.updateObject(t.uuid, i, o), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && (q(d, i, o), d.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: en(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, o) => {
          var c;
          n.updateObject(t.uuid, i, o), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && (q(d, i, o), d.updateProjectionMatrix());
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
const Ha = Math.PI / 180, Va = 180 / Math.PI;
function qe(t, n, a, e, i) {
  return e + (t - n) * (i - e) / (a - n);
}
function Ya(t) {
  return t * Ha;
}
function Nt(t) {
  return t * Va;
}
function Wa(t, n) {
  const a = new Bn();
  a.elements = t.matrix;
  const e = new X(), i = new $n(), o = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const d = (u, f) => {
    var v;
    n.updateObject(t.uuid, u, f);
    const b = (v = n.scene) == null ? void 0 : v.getObjectByProperty("uuid", t.uuid);
    b !== void 0 && q(b, u, f);
  }, c = (u, f) => {
    d(u, Ya(f));
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
          value: It(Nt(i.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: It(Nt(i.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: It(Nt(i.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: o.x,
          step: 0.01,
          onChange: d
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: o.y,
          step: 0.01,
          onChange: d
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: o.z,
          step: 0.01,
          onChange: d
        }
      ]
    }
  );
}
function tn(t) {
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
function Ka(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const i = t.lightInfo[e];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: tn(e),
        prop: e,
        type: "color",
        value: i,
        onChange: (o, d) => {
          var f;
          const c = new Tt(d);
          n.updateObject(t.uuid, o, c);
          const u = (f = n.scene) == null ? void 0 : f.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && q(u, o, c);
        }
      }) : a.push({
        title: tn(e),
        prop: e,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (o, d) => {
          var u;
          n.updateObject(t.uuid, o, d);
          const c = (u = n.scene) == null ? void 0 : u.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && q(c, o, d);
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
function Xa(t, n) {
  const a = [];
  return t.animations.forEach((e) => {
    a.push({
      title: "Name",
      type: "string",
      prop: "name",
      value: e.name,
      disabled: !0,
      onChange: (i, o) => {
        var c;
        n.updateObject(t.uuid, i, o);
        const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
        d !== void 0 && q(d, i, o);
      }
    }), a.push({
      title: "Duration",
      type: "number",
      prop: "duration",
      value: e.duration,
      disabled: !0,
      onChange: (i, o) => {
        var c;
        n.updateObject(t.uuid, i, o);
        const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
        d !== void 0 && q(d, i, o);
      }
    }), a.push({
      title: "Blend Mode",
      type: "number",
      prop: "blendMode",
      value: e.blendMode,
      disabled: !0,
      onChange: (i, o) => {
        var c;
        n.updateObject(t.uuid, i, o);
        const d = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
        d !== void 0 && q(d, i, o);
      }
    });
  }), /* @__PURE__ */ l.jsx(Be, { title: "Animations", items: a });
}
const Sn = {
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
let re = { ...Sn };
function qa(t) {
  const [n, a] = ce(-1);
  Fe(() => {
    function o(c) {
      re = { ...c.value }, a(Date.now());
    }
    function d() {
      re = { ...Sn }, a(Date.now());
    }
    return j.addEventListener(k.SET_SCENE, d), j.addEventListener(k.SET_OBJECT, o), () => {
      j.removeEventListener(k.SET_SCENE, d), j.removeEventListener(k.SET_OBJECT, o);
    };
  }, []);
  const e = re.type.toLowerCase(), i = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Gt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: re.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        ot,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: re.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ot,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: re.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ot,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: re.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ot,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: re.visible,
          onChange: (o, d) => {
            var u;
            t.three.updateObject(re.uuid, o, d);
            const c = (u = t.three.scene) == null ? void 0 : u.getObjectByProperty("uuid", re.uuid);
            c !== void 0 && q(c, o, d);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Wa(re, t.three),
      re.animations.length > 0 ? Xa(re, t.three) : null,
      e.search("camera") > -1 ? Ga(re, t.three) : null,
      e.search("light") > -1 ? Ka(re, t.three) : null,
      i ? za(re, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class vi extends na {
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
    var i;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(i = this.componentState.scene) == null ? void 0 : i.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(Gt, { label: e, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: a && /* @__PURE__ */ l.jsx(La, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(qa, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function gi(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (c) => {
    var f;
    if (!n())
      return;
    const u = (f = t.three.scene) == null ? void 0 : f.getObjectByProperty("uuid", c.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (c, u, f) => {
    var v;
    if (!n())
      return;
    const b = (v = t.three.scene) == null ? void 0 : v.getObjectByProperty("uuid", c);
    b !== void 0 && q(b, u, f);
  }, i = (c) => {
    if (!n())
      return;
    const u = c.value, { key: f, value: b, uuid: v } = u;
    e(v, f, b);
  }, o = (c) => {
    if (!n())
      return;
    const u = c.value;
    $t(u.value).then((f) => {
      e(u.uuid, u.key, f), e(u.uuid, "material.needsUpdate", !0);
    });
  }, d = (c) => {
    var w;
    if (!n())
      return;
    const { key: u, uuid: f, value: b } = c.value, v = (w = t.three.scene) == null ? void 0 : w.getObjectByProperty("uuid", f);
    if (v !== void 0)
      try {
        v[u](b);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(b);
      }
  };
  return Fe(() => (j.addEventListener(k.GET_OBJECT, a), j.addEventListener(k.UPDATE_OBJECT, i), j.addEventListener(k.CREATE_TEXTURE, o), j.addEventListener(k.REQUEST_METHOD, d), () => {
    j.removeEventListener(k.GET_OBJECT, a), j.removeEventListener(k.UPDATE_OBJECT, i), j.removeEventListener(k.CREATE_TEXTURE, o), j.removeEventListener(k.REQUEST_METHOD, d);
  }), []), null;
}
const nn = { type: "change" }, Ft = { type: "start" }, an = { type: "end" }, xt = new zn(), rn = new Gn(), Za = Math.cos(70 * Hn.DEG2RAD);
class Ja extends ln {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: We.ROTATE, MIDDLE: We.DOLLY, RIGHT: We.PAN }, this.touches = { ONE: Ke.ROTATE, TWO: Ke.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", at), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", at), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(nn), e.update(), o = i.NONE;
    }, this.update = function() {
      const s = new X(), E = new Xt().setFromUnitVectors(n.up, new X(0, 1, 0)), D = E.clone().invert(), U = new X(), ne = new Xt(), be = new X(), de = 2 * Math.PI;
      return function(wt = null) {
        const ye = e.object.position;
        s.copy(ye).sub(e.target), s.applyQuaternion(E), c.setFromVector3(s), e.autoRotate && o === i.NONE && G(y(wt)), e.enableDamping ? (c.theta += u.theta * e.dampingFactor, c.phi += u.phi * e.dampingFactor) : (c.theta += u.theta, c.phi += u.phi);
        let he = e.minAzimuthAngle, pe = e.maxAzimuthAngle;
        isFinite(he) && isFinite(pe) && (he < -Math.PI ? he += de : he > Math.PI && (he -= de), pe < -Math.PI ? pe += de : pe > Math.PI && (pe -= de), he <= pe ? c.theta = Math.max(he, Math.min(pe, c.theta)) : c.theta = c.theta > (he + pe) / 2 ? Math.max(he, c.theta) : Math.min(pe, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(b, e.dampingFactor) : e.target.add(b), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && te || e.object.isOrthographicCamera ? c.radius = J(c.radius) : c.radius = J(c.radius * f), s.setFromSpherical(c), s.applyQuaternion(D), ye.copy(e.target).add(s), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, b.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), b.set(0, 0, 0));
        let He = !1;
        if (e.zoomToCursor && te) {
          let Ae = null;
          if (e.object.isPerspectiveCamera) {
            const Te = s.length();
            Ae = J(Te * f);
            const Ve = Te - Ae;
            e.object.position.addScaledVector(ie, Ve), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Te = new X(ue.x, ue.y, 0);
            Te.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), He = !0;
            const Ve = new X(ue.x, ue.y, 0);
            Ve.unproject(e.object), e.object.position.sub(Ve).add(Te), e.object.updateMatrixWorld(), Ae = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ae !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ae).add(e.object.position) : (xt.origin.copy(e.object.position), xt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(xt.direction)) < Za ? n.lookAt(e.target) : (rn.setFromNormalAndCoplanarPoint(e.object.up, e.target), xt.intersectPlane(rn, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), He = !0);
        return f = 1, te = !1, He || U.distanceToSquared(e.object.position) > d || 8 * (1 - ne.dot(e.object.quaternion)) > d || be.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(nn), U.copy(e.object.position), ne.copy(e.object.quaternion), be.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Oe), e.domElement.removeEventListener("pointerdown", tt), e.domElement.removeEventListener("pointercancel", ke), e.domElement.removeEventListener("wheel", vt), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", at), e._domElementKeyEvents = null);
    };
    const e = this, i = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let o = i.NONE;
    const d = 1e-6, c = new qt(), u = new qt();
    let f = 1;
    const b = new X(), v = new fe(), w = new fe(), x = new fe(), O = new fe(), M = new fe(), K = new fe(), I = new fe(), C = new fe(), V = new fe(), ie = new X(), ue = new fe();
    let te = !1;
    const h = [], m = {};
    function y(s) {
      return s !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function T(s) {
      const E = Math.abs(s) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * E);
    }
    function G(s) {
      u.theta -= s;
    }
    function H(s) {
      u.phi -= s;
    }
    const $ = function() {
      const s = new X();
      return function(D, U) {
        s.setFromMatrixColumn(U, 0), s.multiplyScalar(-D), b.add(s);
      };
    }(), L = function() {
      const s = new X();
      return function(D, U) {
        e.screenSpacePanning === !0 ? s.setFromMatrixColumn(U, 1) : (s.setFromMatrixColumn(U, 0), s.crossVectors(e.object.up, s)), s.multiplyScalar(D), b.add(s);
      };
    }(), z = function() {
      const s = new X();
      return function(D, U) {
        const ne = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const be = e.object.position;
          s.copy(be).sub(e.target);
          let de = s.length();
          de *= Math.tan(e.object.fov / 2 * Math.PI / 180), $(2 * D * de / ne.clientHeight, e.object.matrix), L(2 * U * de / ne.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? ($(D * (e.object.right - e.object.left) / e.object.zoom / ne.clientWidth, e.object.matrix), L(U * (e.object.top - e.object.bottom) / e.object.zoom / ne.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function ee(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function P(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(s, E) {
      if (!e.zoomToCursor)
        return;
      te = !0;
      const D = e.domElement.getBoundingClientRect(), U = s - D.left, ne = E - D.top, be = D.width, de = D.height;
      ue.x = U / be * 2 - 1, ue.y = -(ne / de) * 2 + 1, ie.set(ue.x, ue.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function J(s) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, s));
    }
    function me(s) {
      v.set(s.clientX, s.clientY);
    }
    function Re(s) {
      N(s.clientX, s.clientX), I.set(s.clientX, s.clientY);
    }
    function Je(s) {
      O.set(s.clientX, s.clientY);
    }
    function dt(s) {
      w.set(s.clientX, s.clientY), x.subVectors(w, v).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      G(2 * Math.PI * x.x / E.clientHeight), H(2 * Math.PI * x.y / E.clientHeight), v.copy(w), e.update();
    }
    function _t(s) {
      C.set(s.clientX, s.clientY), V.subVectors(C, I), V.y > 0 ? ee(T(V.y)) : V.y < 0 && P(T(V.y)), I.copy(C), e.update();
    }
    function jt(s) {
      M.set(s.clientX, s.clientY), K.subVectors(M, O).multiplyScalar(e.panSpeed), z(K.x, K.y), O.copy(M), e.update();
    }
    function Qe(s) {
      N(s.clientX, s.clientY), s.deltaY < 0 ? P(T(s.deltaY)) : s.deltaY > 0 && ee(T(s.deltaY)), e.update();
    }
    function et(s) {
      let E = !1;
      switch (s.code) {
        case e.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? H(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(0, e.keyPanSpeed), E = !0;
          break;
        case e.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? H(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(0, -e.keyPanSpeed), E = !0;
          break;
        case e.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? G(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(e.keyPanSpeed, 0), E = !0;
          break;
        case e.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? G(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : z(-e.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (s.preventDefault(), e.update());
    }
    function Pe(s) {
      if (h.length === 1)
        v.set(s.pageX, s.pageY);
      else {
        const E = ge(s), D = 0.5 * (s.pageX + E.x), U = 0.5 * (s.pageY + E.y);
        v.set(D, U);
      }
    }
    function ze(s) {
      if (h.length === 1)
        O.set(s.pageX, s.pageY);
      else {
        const E = ge(s), D = 0.5 * (s.pageX + E.x), U = 0.5 * (s.pageY + E.y);
        O.set(D, U);
      }
    }
    function _e(s) {
      const E = ge(s), D = s.pageX - E.x, U = s.pageY - E.y, ne = Math.sqrt(D * D + U * U);
      I.set(0, ne);
    }
    function kt(s) {
      e.enableZoom && _e(s), e.enablePan && ze(s);
    }
    function ft(s) {
      e.enableZoom && _e(s), e.enableRotate && Pe(s);
    }
    function ht(s) {
      if (h.length == 1)
        w.set(s.pageX, s.pageY);
      else {
        const D = ge(s), U = 0.5 * (s.pageX + D.x), ne = 0.5 * (s.pageY + D.y);
        w.set(U, ne);
      }
      x.subVectors(w, v).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      G(2 * Math.PI * x.x / E.clientHeight), H(2 * Math.PI * x.y / E.clientHeight), v.copy(w);
    }
    function pt(s) {
      if (h.length === 1)
        M.set(s.pageX, s.pageY);
      else {
        const E = ge(s), D = 0.5 * (s.pageX + E.x), U = 0.5 * (s.pageY + E.y);
        M.set(D, U);
      }
      K.subVectors(M, O).multiplyScalar(e.panSpeed), z(K.x, K.y), O.copy(M);
    }
    function je(s) {
      const E = ge(s), D = s.pageX - E.x, U = s.pageY - E.y, ne = Math.sqrt(D * D + U * U);
      C.set(0, ne), V.set(0, Math.pow(C.y / I.y, e.zoomSpeed)), ee(V.y), I.copy(C);
      const be = (s.pageX + E.x) * 0.5, de = (s.pageY + E.y) * 0.5;
      N(be, de);
    }
    function Ge(s) {
      e.enableZoom && je(s), e.enablePan && pt(s);
    }
    function mt(s) {
      e.enableZoom && je(s), e.enableRotate && ht(s);
    }
    function tt(s) {
      e.enabled !== !1 && (h.length === 0 && (e.domElement.setPointerCapture(s.pointerId), e.domElement.addEventListener("pointermove", Se), e.domElement.addEventListener("pointerup", ke)), Dt(s), s.pointerType === "touch" ? gt(s) : At(s));
    }
    function Se(s) {
      e.enabled !== !1 && (s.pointerType === "touch" ? bt(s) : nt(s));
    }
    function ke(s) {
      yt(s), h.length === 0 && (e.domElement.releasePointerCapture(s.pointerId), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke)), e.dispatchEvent(an), o = i.NONE;
    }
    function At(s) {
      let E;
      switch (s.button) {
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
          Re(s), o = i.DOLLY;
          break;
        case We.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enablePan === !1)
              return;
            Je(s), o = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            me(s), o = i.ROTATE;
          }
          break;
        case We.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enableRotate === !1)
              return;
            me(s), o = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Je(s), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && e.dispatchEvent(Ft);
    }
    function nt(s) {
      switch (o) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          dt(s);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          _t(s);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          jt(s);
          break;
      }
    }
    function vt(s) {
      e.enabled === !1 || e.enableZoom === !1 || o !== i.NONE || (s.preventDefault(), e.dispatchEvent(Ft), Qe(s), e.dispatchEvent(an));
    }
    function at(s) {
      e.enabled === !1 || e.enablePan === !1 || et(s);
    }
    function gt(s) {
      switch (it(s), h.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ke.ROTATE:
              if (e.enableRotate === !1)
                return;
              Pe(s), o = i.TOUCH_ROTATE;
              break;
            case Ke.PAN:
              if (e.enablePan === !1)
                return;
              ze(s), o = i.TOUCH_PAN;
              break;
            default:
              o = i.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ke.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              kt(s), o = i.TOUCH_DOLLY_PAN;
              break;
            case Ke.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              ft(s), o = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = i.NONE;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && e.dispatchEvent(Ft);
    }
    function bt(s) {
      switch (it(s), o) {
        case i.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ht(s), e.update();
          break;
        case i.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          pt(s), e.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Ge(s), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          mt(s), e.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function Oe(s) {
      e.enabled !== !1 && s.preventDefault();
    }
    function Dt(s) {
      h.push(s.pointerId);
    }
    function yt(s) {
      delete m[s.pointerId];
      for (let E = 0; E < h.length; E++)
        if (h[E] == s.pointerId) {
          h.splice(E, 1);
          return;
        }
    }
    function it(s) {
      let E = m[s.pointerId];
      E === void 0 && (E = new fe(), m[s.pointerId] = E), E.set(s.pageX, s.pageY);
    }
    function ge(s) {
      const E = s.pointerId === h[0] ? h[1] : h[0];
      return m[E];
    }
    e.domElement.addEventListener("contextmenu", Oe), e.domElement.addEventListener("pointerdown", tt), e.domElement.addEventListener("pointercancel", ke), e.domElement.addEventListener("wheel", vt, { passive: !1 }), this.update();
  }
}
const Ot = (t) => {
  const [n, a] = ce(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, i = (o) => {
    o !== n && (t.onSelect(o), a(o)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, Ie = aa(function(n, a) {
  const [e, i] = ce(!1), o = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Ot,
      {
        index: o,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (d) => {
          i(d);
        },
        up: !0
      }
    )
  ] });
}), sn = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ae = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function $e(t, n) {
  const a = new fn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ae.set(t, a), a;
}
$e("Top", new X(0, 1e3, 0));
$e("Bottom", new X(0, -1e3, 0));
$e("Left", new X(-1e3, 0, 0));
$e("Right", new X(1e3, 0, 0));
$e("Front", new X(0, 0, 1e3));
$e("Back", new X(0, 0, -1e3));
$e("Orthographic", new X(1e3, 1e3, 1e3));
const Pt = new Ut(60, 1, 50, 3e3);
Pt.name = "Debug";
Pt.position.set(500, 500, 500);
Pt.lookAt(0, 0, 0);
ae.set("Debug", Pt);
const on = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Qa = new Vn(), ei = new Yn(), ti = new Ia(), ni = new Wn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let Ct = "Renderer";
const W = new hn();
W.name = "Debug Scene";
let xe = new hn();
W.add(xe);
const ut = new Kn();
ut.name = "helpers";
W.add(ut);
const ai = new ka();
ut.add(ai);
const On = new pn(500);
On.name = "axisHelper";
ut.add(On);
const lt = new pn(100);
lt.name = "interactionHelper";
ut.add(lt);
lt.visible = !1;
let St = !1, Y = ae.get("Debug"), oe = ae.get("Orthographic"), Le = ae.get("Front"), Ne = ae.get("Top"), cn = !1;
function bi(t) {
  const [n, a] = ce(t.mode !== void 0 ? t.mode : "Single"), [e, i] = ce(null), [o, d] = ce(!1), [c, u] = ce(!1), [f, b] = ce(!1), [, v] = ce(Date.now()), w = Ce(null), x = Ce(null), O = Ce(null), M = Ce(null), K = Ce(null), I = Ce(null), C = (h, m) => {
    const y = se.get(h.name);
    y !== void 0 && y.dispose(), se.delete(h.name);
    const T = we.get(h.name);
    T !== void 0 && (W.remove(T), T.dispose()), we.delete(h.name);
    const G = new Ja(h, m);
    switch (G.enableDamping = !0, G.dampingFactor = 0.05, h.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        G.enableRotate = !1;
        break;
    }
    if (se.set(h.name, G), h instanceof Ut) {
      const H = new Zn(h);
      we.set(h.name, H), W.add(H);
    }
  }, V = (h) => {
    const m = we.get(h.name);
    m !== void 0 && (W.remove(m), m.dispose(), we.delete(h.name));
    const y = se.get(h.name);
    y !== void 0 && (y.dispose(), se.delete(h.name));
  }, ie = () => {
    se.forEach((h, m) => {
      h.dispose();
      const y = we.get(m);
      y !== void 0 && (W.remove(y), y.dispose()), we.delete(m), se.delete(m);
    }), se.clear(), we.clear();
  }, ue = () => {
    switch (n) {
      case "Single":
        C(Y, O.current);
        break;
      case "Side by Side":
      case "Stacked":
        C(Y, O.current), C(oe, M.current);
        break;
      case "Quad":
        C(Y, O.current), C(oe, M.current), C(Le, K.current), C(Ne, I.current);
        break;
    }
  };
  Fe(() => {
    const h = new Xn({
      canvas: w.current,
      stencil: !1
    });
    h.autoClear = !1, h.shadowMap.enabled = !0, h.setPixelRatio(devicePixelRatio), h.setClearColor(0), i(h);
  }, []), Fe(() => {
    const h = (T) => {
      bn(xe), W.remove(xe);
      const G = t.scenes.get(T.value.name);
      if (G !== void 0) {
        const H = new G();
        t.onSceneSet !== void 0 && t.onSceneSet(H), xe = H, t.three.scene = xe, W.add(xe), cn = !0;
      }
    }, m = (T) => {
      var $;
      const G = T.value, H = ($ = t.three.scene) == null ? void 0 : $.getObjectByProperty("uuid", G.uuid);
      H !== void 0 && ae.set(G.name, H), v(Date.now());
    }, y = (T) => {
      ae.delete(T.value.name), v(Date.now());
    };
    return j.addEventListener(k.SET_SCENE, h), j.addEventListener(k.ADD_CAMERA, m), j.addEventListener(k.REMOVE_CAMERA, y), () => {
      j.removeEventListener(k.SET_SCENE, h), j.removeEventListener(k.ADD_CAMERA, m), j.removeEventListener(k.REMOVE_CAMERA, y);
    };
  }, []), Fe(() => {
    if (e === null)
      return;
    let h = window.innerWidth, m = window.innerHeight, y = Math.floor(h / 2), T = Math.floor(m / 2), G = -1;
    const H = () => {
      h = window.innerWidth - 300, m = window.innerHeight, y = Math.floor(h / 2), T = Math.floor(m / 2), e.setSize(h, m);
      let P = h, N = m;
      switch (n) {
        case "Side by Side":
          P = y, N = m;
          break;
        case "Stacked":
          P = h, N = T;
          break;
        case "Quad":
          P = y, N = T;
          break;
      }
      ae.forEach((J) => {
        var me;
        J instanceof fn ? (J.left = P / -2, J.right = P / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof Ut && (J.aspect = P / N, J.updateProjectionMatrix(), (me = we.get(J.name)) == null || me.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, h, m), e.setScissor(0, 0, h, m), e.render(W, Y);
    }, L = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, y, m), e.setScissor(0, 0, y, m), e.render(W, Y), e.setViewport(y, 0, y, m), e.setScissor(y, 0, y, m), e.render(W, oe);
      else {
        const P = m - T;
        e.setViewport(0, P, h, T), e.setScissor(0, P, h, T), e.render(W, Y), e.setViewport(0, 0, h, T), e.setScissor(0, 0, h, T), e.render(W, oe);
      }
    }, z = () => {
      let P = 0, N = 0;
      N = m - T, P = 0, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, Y), P = y, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, oe), N = 0, P = 0, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, Le), P = y, e.setViewport(P, N, y, T), e.setScissor(P, N, y, T), e.render(W, Ne);
    }, ee = () => {
      switch (se.forEach((P) => {
        P.update();
      }), t.onSceneUpdate !== void 0 && cn && t.onSceneUpdate(xe), e.clear(), n) {
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
      const h = new qn(), m = new fe(), y = ($, L, z, ee) => {
        switch (n) {
          case "Quad":
            $ < z ? L < ee ? h.setFromCamera(m, Y) : h.setFromCamera(m, Le) : L < ee ? h.setFromCamera(m, oe) : h.setFromCamera(m, Ne);
            break;
          case "Side by Side":
            $ < z ? h.setFromCamera(m, Y) : h.setFromCamera(m, oe);
            break;
          case "Single":
            h.setFromCamera(m, Y);
            break;
          case "Stacked":
            L < ee ? h.setFromCamera(m, Y) : h.setFromCamera(m, oe);
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
        const Re = h.intersectObjects(xe.children);
        Re.length > 0 && lt.position.copy(Re[0].point);
      }, G = ($) => {
        if (!St)
          return;
        const L = new fe();
        if (e.getSize(L), $.clientX >= L.x)
          return;
        T($);
        const z = h.intersectObjects(xe.children);
        z.length > 0 && t.three.getObject(z[0].object.uuid);
      }, H = x.current;
      return H.addEventListener("mousemove", T, !1), H.addEventListener("click", G, !1), () => {
        H.removeEventListener("mousemove", T), H.removeEventListener("click", G);
      };
    }
  }, [n, e]);
  const te = [];
  return ae.forEach((h, m) => {
    te.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: w }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: x, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ie, { camera: Y, options: te, ref: O, onSelect: (h) => {
        var y;
        (y = se.get(Y.name)) == null || y.dispose();
        const m = ae.get(h);
        m !== void 0 && (V(Y), Y = m, C(m, O.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: Y, options: te, ref: O, onSelect: (h) => {
          var y;
          (y = se.get(Y.name)) == null || y.dispose();
          const m = ae.get(h);
          m !== void 0 && (V(Y), Y = m, C(m, O.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: oe, options: te, ref: M, onSelect: (h) => {
          var y;
          (y = se.get(oe.name)) == null || y.dispose();
          const m = ae.get(h);
          m !== void 0 && (V(oe), oe = m, C(m, M.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: Y, options: te, ref: O, onSelect: (h) => {
          var y;
          (y = se.get(Y.name)) == null || y.dispose();
          const m = ae.get(h);
          m !== void 0 && (V(Y), Y = m, C(m, O.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: oe, options: te, ref: M, onSelect: (h) => {
          var y;
          (y = se.get(oe.name)) == null || y.dispose();
          const m = ae.get(h);
          m !== void 0 && (V(oe), oe = m, C(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Le, options: te, ref: K, onSelect: (h) => {
          var y;
          (y = se.get(Le.name)) == null || y.dispose();
          const m = ae.get(h);
          m !== void 0 && (V(Le), Le = m, C(m, K.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Ne, options: te, ref: I, onSelect: (h) => {
          var y;
          (y = se.get(Ne.name)) == null || y.dispose();
          const m = ae.get(h);
          m !== void 0 && (V(Ne), Ne = m, C(m, I.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: sn.indexOf(n),
          options: sn,
          onSelect: (h) => {
            h !== n && (ie(), a(h));
          },
          open: o,
          onToggle: (h) => {
            d(h), c && u(!1), f && b(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: on.indexOf(Ct),
          options: on,
          onSelect: (h) => {
            if (h !== Ct)
              switch (Ct = h, Ct) {
                case "Depth":
                  W.overrideMaterial = Qa;
                  break;
                case "Normals":
                  W.overrideMaterial = ei;
                  break;
                default:
                case "Renderer":
                  W.overrideMaterial = null;
                  break;
                case "Wireframe":
                  W.overrideMaterial = ni;
                  break;
                case "UVs":
                  W.overrideMaterial = ti;
                  break;
              }
          },
          open: c,
          onToggle: (h) => {
            o && d(!1), u(h), f && b(!1);
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
          onSelect: (h) => {
            St = h === "Selection Mode", lt.visible = St;
          },
          open: f,
          onToggle: (h) => {
            o && d(!1), c && u(!1), b(h);
          }
        }
      )
    ] })
  ] });
}
function yi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Gt as Accordion,
  pi as Application,
  Rt as BaseRemote,
  Cn as ChildObject,
  La as ContainerObject,
  Ta as Draggable,
  Oa as DraggableItem,
  Ma as Dropdown,
  Ra as DropdownItem,
  yi as Editor,
  ka as InfiniteGridHelper,
  qa as Inspector,
  bi as MultiView,
  xn as NavButton,
  la as RemoteComponents,
  mi as RemoteController,
  Ue as RemoteTheatre,
  ga as RemoteThree,
  wn as RemoteTweakpane,
  gi as SceneInspector,
  vi as SidePanel,
  k as ToolEvents,
  Ia as UVMaterial,
  Mt as capitalize,
  di as clamp,
  sa as colorToHex,
  j as debugDispatcher,
  bn as dispose,
  ca as disposeMaterial,
  hi as disposeTexture,
  fi as distance,
  gn as hierarchyUUID,
  ra as isColor,
  ia as randomID,
  oa as resetThreeObjects,
  It as round,
  Bt as totalThreeObjects
};
