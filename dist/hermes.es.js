import { PositionalAudio as Yn, EventDispatcher as cn, Texture as ln, CubeTexture as Gn, RepeatWrapping as Ht, ShaderMaterial as un, GLSL3 as Vn, DoubleSide as dn, Color as wt, Mesh as Hn, PlaneGeometry as Wn, FrontSide as qn, BackSide as Kn, NoBlending as Xn, NormalBlending as Zn, AdditiveBlending as Jn, SubtractiveBlending as Qn, MultiplyBlending as ea, CustomBlending as ta, AddEquation as na, SubtractEquation as aa, ReverseSubtractEquation as ia, MinEquation as ra, MaxEquation as oa, ZeroFactor as hn, OneFactor as fn, SrcColorFactor as pn, OneMinusSrcColorFactor as mn, SrcAlphaFactor as vn, OneMinusSrcAlphaFactor as gn, DstAlphaFactor as bn, OneMinusDstAlphaFactor as yn, DstColorFactor as En, OneMinusDstColorFactor as Cn, SrcAlphaSaturateFactor as sa, ConstantColorFactor as Sn, OneMinusConstantColorFactor as xn, ConstantAlphaFactor as wn, OneMinusConstantAlphaFactor as On, Matrix4 as ca, Vector3 as X, Euler as la, Ray as ua, Plane as da, MathUtils as ha, MOUSE as Ge, TOUCH as Ve, Quaternion as Wt, Spherical as qt, Vector2 as ue, PerspectiveCamera as Bt, MeshDepthMaterial as fa, MeshNormalMaterial as pa, MeshBasicMaterial as ma, OrthographicCamera as Mn, Scene as Tn, Group as va, AxesHelper as Rn, WebGLRenderer as ga, Raycaster as ba, CameraHelper as ya } from "three";
import Kt from "@theatre/studio";
import { Pane as Ea } from "tweakpane";
import * as Ca from "@tweakpane/plugin-essentials";
import _n, { useState as ae, useRef as ye, useEffect as we, forwardRef as Sa } from "react";
import { Reorder as An } from "framer-motion";
const Pn = () => {
}, Mi = () => {
};
function ot(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Ti(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Ri(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function xa() {
  return Math.round(Math.random() * 1e6).toString();
}
function wa(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Oa(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (u) => {
    const d = u.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, c = o(n), p = o(a), s = o(e);
  return "#" + c + p + s;
}
function It(t, n = 1) {
  return Number(t.toFixed(n));
}
let Ut = 0;
const Ma = () => {
  Ut = 0;
}, kn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Ut}`, Ut++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    kn(a);
  });
}, _i = (t) => {
  t?.dispose();
}, Ta = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, jn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n instanceof Yn ? (n.pause(), n.parent && n.parent.remove(n)) : jn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), Ta(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Ai {
  components = /* @__PURE__ */ new Map();
  listen;
  // Protected
  _debugEnabled;
  _broadcastChannel = void 0;
  _webSocket = void 0;
  _mode = "app";
  _connected = !1;
  _useBC = !1;
  constructor(n, a, e = !0) {
    this._debugEnabled = a, a && (this._useBC = e, e ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
  }
  // Set editor and add components here
  init() {
    return new Promise((n) => {
      n();
    });
  }
  addComponent(n, a) {
    this.components.set(n, a);
  }
  dispose() {
    this._broadcastChannel !== void 0 && this._broadcastChannel.removeEventListener("message", this.messageHandler), this._webSocket !== void 0 && (this._webSocket.removeEventListener("open", this.openHandler), this._webSocket.removeEventListener("close", this.closeHandler), this._webSocket.removeEventListener("message", this.messageHandler)), this.components.forEach((n) => {
      n.dispose();
    }), this.components.clear();
  }
  // Remote
  send(n) {
    this._mode !== n.target && (this._useBC ? this._broadcastChannel?.postMessage(n) : this._connected && this._webSocket?.send(JSON.stringify(n)));
  }
  messageHandler = (n) => {
    this.listen !== void 0 && (this._useBC ? this.listen(n.data) : this.listen(JSON.parse(n.data)));
  };
  openHandler = () => {
    this._connected = !0;
  };
  closeHandler = () => {
    this._connected = !1;
  };
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
    n && (this._mode = "editor");
  }
}
const k = new cn(), j = {
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
class Ot {
  app;
  constructor(n) {
    this.app = n;
  }
  dispose() {
  }
  // Remote Controller
  // Receives App events
  handleApp(n) {
  }
  // Receives Editor events
  handleEditor(n) {
  }
}
class Pi extends Ot {
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
  // Remote Controller
  // Receives App events
  handleApp(n) {
    switch (n.event) {
      case "selectComponent":
        k.dispatchEvent({ type: j.SELECT_DROPDOWN, value: n.data });
        break;
      case "draggableListUpdate":
        k.dispatchEvent({ type: j.DRAG_UPDATE, value: n.data });
        break;
    }
  }
}
class Ra extends Ot {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  static rafDriver = void 0;
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let a = this.sheets.get(n);
    return a !== void 0 || (a = this.project?.sheet(n), this.sheets.set(n, a)), a;
  }
  playSheet(n, a) {
    this.sheet(n)?.sequence.play(a), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: n,
        value: a
      }
    });
  }
  pauseSheet(n) {
    this.sheet(n)?.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: n
      }
    });
  }
  clearSheetObjects(n) {
    this.sheetObjects.forEach((a, e) => {
      e.search(`${n}_`) > -1 && this.unsubscribe(a);
    });
  }
  sheetObject(n, a, e, o) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheet(n);
    if (c === void 0)
      return;
    const p = `${n}_${a}`;
    let s = this.sheetObjects.get(p);
    s !== void 0 ? s = c.object(a, { ...e, ...s.value }, { reconfigure: !0 }) : s = c.object(a, e), this.sheetObjects.set(p, s), this.sheetObjectCBs.set(p, o !== void 0 ? o : Pn);
    const u = s.onValuesChange((d) => {
      if (this.app.editor) {
        for (const b in d) {
          const E = d[b];
          typeof E == "object" && wa(E) && (d[b] = {
            r: E.r,
            g: E.g,
            b: E.b,
            a: E.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: n,
            sheetObject: p,
            values: d
          }
        });
      }
      const v = this.sheetObjectCBs.get(p);
      v !== void 0 && v(d);
    });
    return this.sheetObjectUnsubscribe.set(p, u), s;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, e = n.address.objectKey;
    this.sheets.get(a)?.detachObject(e);
    const c = `${a}_${e}`, p = this.sheetObjectUnsubscribe.get(c);
    p !== void 0 && (this.sheetObjects.delete(c), this.sheetObjectCBs.delete(c), this.sheetObjectUnsubscribe.delete(c), p());
  }
  // Remote Controller
  // Receives App events
  handleApp(n) {
    let a;
    switch (n.event) {
      case "setSheet":
        a = this.sheets.get(n.data.sheet), a !== void 0 && (this.activeSheet = a, Kt.setSelection([a]));
        break;
      case "setSheetObject":
        a = this.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), a !== void 0 && Kt.setSelection([a]);
        break;
      case "updateSheetObject":
        a = this.sheets.get(n.data.sheet), a !== void 0 && a.sequence.pause(), a = this.sheetObjectCBs.get(n.data.sheetObject), a !== void 0 && a(n.data.values);
        break;
      case "updateTimeline":
        a = this.sheets.get(n.data.sheet), this.activeSheet !== void 0 && (this.activeSheet.sequence.position = n.data.position);
        break;
    }
  }
  // Receives Editor events
  handleEditor(n) {
    if (this.app.editor)
      switch (n.event) {
        case "playSheet":
          this.sheet(n.data.sheet)?.sequence.play(n.data.value);
          break;
        case "pauseSheet":
          this.sheet(n.data.sheet)?.sequence.pause();
          break;
      }
  }
}
function ki(t, n, a) {
  if (t.editor) {
    a.ui.restore(), a.onSelectionChange((p) => {
      p.length < 1 || p.forEach((s) => {
        let u = s.address.sheetId, d = "setSheet", v = {};
        switch (s.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", v = {
              sheet: s.address.sheetId
            }, n.activeSheet = n.sheets.get(s.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", u += `_${s.address.objectKey}`, v = {
              id: u,
              sheet: s.address.sheetId,
              key: s.address.objectKey
            }, n.activeSheet = n.sheets.get(s.address.sheetId);
            break;
        }
        t.send({ event: d, target: "app", data: v });
      });
    });
    let e = -1;
    const o = () => {
      if (Ra.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && e !== n.activeSheet.sequence.position) {
        e = n.activeSheet.sequence.position;
        const p = n.activeSheet;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: e,
            sheet: p.address.sheetId
          }
        });
      }
    }, c = () => {
      o(), requestAnimationFrame(c);
    };
    o(), c();
  } else
    a.ui.hide();
}
function _a(t) {
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
function Dn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(Dn(a));
  }), n;
}
function Aa(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Pa(t) {
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
function He(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Pa(a))
      continue;
    const e = typeof t[a], o = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = o;
        break;
      case "object":
        if (o !== null)
          if (n[a] = o, o.isTexture)
            if (o instanceof ln) {
              const c = o.source.toJSON();
              n[a] = { src: c.url };
            } else
              o instanceof Gn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Aa(n[a]));
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
      const o = [];
      e.material.forEach((c) => {
        o.push(He(c));
      }), n.material = o;
    } else
      n.material = He(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((c) => {
        o.push(He(c));
      }), n.material = o;
    } else
      n.material = He(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((c) => {
        o.push(He(c));
      }), n.material = o;
    } else
      n.material = He(e.material);
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
function ka(t, n) {
  const a = n.split(".");
  switch (a.length) {
    case 1:
      return t[a[0]];
    case 2:
      return t[a[0]][a[1]];
    case 3:
      return t[a[0]][a[1]][a[2]];
    case 4:
      return t[a[0]][a[1]][a[2]][a[3]];
    case 5:
      return t[a[0]][a[1]][a[2]][a[3]][a[4]];
    case 6:
      return t[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]];
  }
}
function ee(t, n, a) {
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
      const o = new ln(e);
      o.wrapS = Ht, o.wrapT = Ht, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class ji extends Ot {
  scene = void 0;
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = Lt(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: a
    });
  }
  requestMethod(n, a, e, o) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e,
        subitem: o
      }
    });
  }
  updateObject(n, a, e) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e
      }
    });
  }
  createTexture(n, a, e) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e
      }
    });
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    Ma(), kn(this.scene);
    const a = Dn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Lt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Lt(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
  // Remote Controller
  // Receives App events
  handleApp(n) {
    switch (n.event) {
      case "getObject":
        k.dispatchEvent({ type: j.GET_OBJECT, value: n.data });
        break;
      case "updateObject":
        k.dispatchEvent({ type: j.UPDATE_OBJECT, value: n.data });
        break;
      case "createTexture":
        k.dispatchEvent({ type: j.CREATE_TEXTURE, value: n.data });
        break;
      case "requestMethod":
        k.dispatchEvent({ type: j.REQUEST_METHOD, value: n.data });
        break;
    }
  }
  // Receives Editor events
  handleEditor(n) {
    switch (n.event) {
      case "setObject":
        k.dispatchEvent({ type: j.SET_OBJECT, value: n.data });
        break;
      case "setScene":
        k.dispatchEvent({ type: j.SET_SCENE, value: n.data });
        break;
      case "addCamera":
        k.dispatchEvent({ type: j.ADD_CAMERA, value: n.data });
        break;
      case "removeCamera":
        k.dispatchEvent({ type: j.REMOVE_CAMERA, value: n.data });
        break;
    }
  }
}
class Di extends Ot {
  bindCBs;
  buttonCBs;
  pane = void 0;
  appCallbacks = 0;
  editorCallbacks = 0;
  inspectorFolder = void 0;
  constructor(n) {
    super(n), this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), n.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Ea({ title: "GUI" }), this.pane.registerPlugin(Ca);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(n, a = void 0, e = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addFolder({
        title: n,
        ...a
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: n,
        params: a,
        parent: e
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(n, a, e, o = void 0) {
    const c = this.bindID, p = e.onChange !== void 0 ? e.onChange : Pn;
    this.bindCBs.set(c, p), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addBinding(n, a, e).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: c,
        name: a,
        params: e,
        parent: o
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, a) {
    const e = this.bindCBs.get(n);
    e !== void 0 ? e(a) : console.warn(`No callback for: ${n}`, a);
  }
  // Buttons
  button(n, a, e = void 0) {
    const o = this.bindID;
    this.buttonCBs.set(o, a), this.app.editor ? (this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addButton({ title: n }).on("click", () => {
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
        name: n,
        callback: a,
        parent: e
      }
    }), this.appCallbacks++);
  }
  triggerButton(n) {
    const a = this.buttonCBs.get(n);
    a !== void 0 && a();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const n = this.inspectorFolder.children.length - 1;
    for (let a = n; a > -1; --a)
      this.inspectorFolder.remove(this.inspectorFolder.children[a]);
  }
  // Remote Controller
  // Receives App events
  handleApp(n) {
    switch (n.event) {
      case "addFolder":
        this.addFolder(n.data.name, n.data.params, n.data.parent);
        break;
      case "bindObject":
        this.bind(n.data.name, n.data.params, n.data.parent);
        break;
      case "updateBind":
        this.triggerBind(n.data.id, n.data.value);
        break;
      case "addButton":
        this.button(n.data.name, n.data.callback, n.data.parent);
        break;
      case "clickButton":
        this.triggerButton(n.data.id);
        break;
    }
  }
}
var zt = { exports: {} }, nt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xt;
function ja() {
  if (Xt)
    return nt;
  Xt = 1;
  var t = _n, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(s, u, d) {
    var v, b = {}, E = null, S = null;
    d !== void 0 && (E = "" + d), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (S = u.ref);
    for (v in u)
      e.call(u, v) && !c.hasOwnProperty(v) && (b[v] = u[v]);
    if (s && s.defaultProps)
      for (v in u = s.defaultProps, u)
        b[v] === void 0 && (b[v] = u[v]);
    return { $$typeof: n, type: s, key: E, ref: S, props: b, _owner: o.current };
  }
  return nt.Fragment = a, nt.jsx = p, nt.jsxs = p, nt;
}
var at = {};
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
function Da() {
  return Zt || (Zt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = _n, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), M = Symbol.iterator, P = "@@iterator";
    function H(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = M && i[M] || i[P];
      return typeof f == "function" ? f : null;
    }
    var B = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(i) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), C = 1; C < f; C++)
          g[C - 1] = arguments[C];
        z("error", i, g);
      }
    }
    function z(i, f, g) {
      {
        var C = B.ReactDebugCurrentFrame, D = C.getStackAddendum();
        D !== "" && (f += "%s", g = g.concat([D]));
        var F = g.map(function(A) {
          return String(A);
        });
        F.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, F);
      }
    }
    var Ee = !1, le = !1, se = !1, h = !1, m = !1, w;
    w = Symbol.for("react.module.reference");
    function _(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === c || m || i === o || i === d || i === v || h || i === S || Ee || le || se || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === b || i.$$typeof === p || i.$$typeof === s || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === w || i.getModuleId !== void 0));
    }
    function Y(i, f, g) {
      var C = i.displayName;
      if (C)
        return C;
      var D = f.displayName || f.name || "";
      return D !== "" ? g + "(" + D + ")" : g;
    }
    function U(i) {
      return i.displayName || "Context";
    }
    function $(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case c:
          return "Profiler";
        case o:
          return "StrictMode";
        case d:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case s:
            var f = i;
            return U(f) + ".Consumer";
          case p:
            var g = i;
            return U(g._context) + ".Provider";
          case u:
            return Y(i, i.render, "ForwardRef");
          case b:
            var C = i.displayName || null;
            return C !== null ? C : $(i.type) || "Memo";
          case E: {
            var D = i, F = D._payload, A = D._init;
            try {
              return $(A(F));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, W = 0, q, T, N, J, me, Ce, lt;
    function qe() {
    }
    qe.__reactDisabledLog = !0;
    function Tt() {
      {
        if (W === 0) {
          q = console.log, T = console.info, N = console.warn, J = console.error, me = console.group, Ce = console.groupCollapsed, lt = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: qe,
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
        W++;
      }
    }
    function Rt() {
      {
        if (W--, W === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, i, {
              value: q
            }),
            info: I({}, i, {
              value: T
            }),
            warn: I({}, i, {
              value: N
            }),
            error: I({}, i, {
              value: J
            }),
            group: I({}, i, {
              value: me
            }),
            groupCollapsed: I({}, i, {
              value: Ce
            }),
            groupEnd: I({}, i, {
              value: lt
            })
          });
        }
        W < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ke = B.ReactCurrentDispatcher, Xe;
    function Ue(i, f, g) {
      {
        if (Xe === void 0)
          try {
            throw Error();
          } catch (D) {
            var C = D.stack.trim().match(/\n( *(at )?)/);
            Xe = C && C[1] || "";
          }
        return `
` + Xe + i;
      }
    }
    var $e = !1, Oe;
    {
      var ut = typeof WeakMap == "function" ? WeakMap : Map;
      Oe = new ut();
    }
    function dt(i, f) {
      if (!i || $e)
        return "";
      {
        var g = Oe.get(i);
        if (g !== void 0)
          return g;
      }
      var C;
      $e = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = Ke.current, Ke.current = null, Tt();
      try {
        if (f) {
          var A = function() {
            throw Error();
          };
          if (Object.defineProperty(A.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(A, []);
            } catch (ve) {
              C = ve;
            }
            Reflect.construct(i, [], A);
          } else {
            try {
              A.call();
            } catch (ve) {
              C = ve;
            }
            i.call(A.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ve) {
            C = ve;
          }
          i();
        }
      } catch (ve) {
        if (ve && C && typeof ve.stack == "string") {
          for (var R = ve.stack.split(`
`), ce = C.stack.split(`
`), Z = R.length - 1, Q = ce.length - 1; Z >= 1 && Q >= 0 && R[Z] !== ce[Q]; )
            Q--;
          for (; Z >= 1 && Q >= 0; Z--, Q--)
            if (R[Z] !== ce[Q]) {
              if (Z !== 1 || Q !== 1)
                do
                  if (Z--, Q--, Q < 0 || R[Z] !== ce[Q]) {
                    var fe = `
` + R[Z].replace(" at new ", " at ");
                    return i.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", i.displayName)), typeof i == "function" && Oe.set(i, fe), fe;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        $e = !1, Ke.current = F, Rt(), Error.prepareStackTrace = D;
      }
      var Ye = i ? i.displayName || i.name : "", Vt = Ye ? Ue(Ye) : "";
      return typeof i == "function" && Oe.set(i, Vt), Vt;
    }
    function _t(i, f, g) {
      return dt(i, !1);
    }
    function ht(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function Me(i, f, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return dt(i, ht(i));
      if (typeof i == "string")
        return Ue(i);
      switch (i) {
        case d:
          return Ue("Suspense");
        case v:
          return Ue("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case u:
            return _t(i.render);
          case b:
            return Me(i.type, f, g);
          case E: {
            var C = i, D = C._payload, F = C._init;
            try {
              return Me(F(D), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Te = Object.prototype.hasOwnProperty, ft = {}, pt = B.ReactDebugCurrentFrame;
    function Re(i) {
      if (i) {
        var f = i._owner, g = Me(i.type, i._source, f ? f.type : null);
        pt.setExtraStackFrame(g);
      } else
        pt.setExtraStackFrame(null);
    }
    function Ze(i, f, g, C, D) {
      {
        var F = Function.call.bind(Te);
        for (var A in i)
          if (F(i, A)) {
            var R = void 0;
            try {
              if (typeof i[A] != "function") {
                var ce = Error((C || "React class") + ": " + g + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ce.name = "Invariant Violation", ce;
              }
              R = i[A](f, A, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              R = Z;
            }
            R && !(R instanceof Error) && (Re(D), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, A, typeof R), Re(null)), R instanceof Error && !(R.message in ft) && (ft[R.message] = !0, Re(D), x("Failed %s type: %s", g, R.message), Re(null));
          }
      }
    }
    var _e = Array.isArray;
    function Je(i) {
      return _e(i);
    }
    function At(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function mt(i) {
      try {
        return vt(i), !1;
      } catch {
        return !0;
      }
    }
    function vt(i) {
      return "" + i;
    }
    function gt(i) {
      if (mt(i))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", At(i)), vt(i);
    }
    var Se = B.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, et, bt, ze;
    ze = {};
    function Pt(i) {
      if (Te.call(i, "ref")) {
        var f = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function kt(i) {
      if (Te.call(i, "key")) {
        var f = Object.getOwnPropertyDescriptor(i, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function yt(i, f) {
      if (typeof i.ref == "string" && Se.current && f && Se.current.stateNode !== f) {
        var g = $(Se.current.type);
        ze[g] || (x('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(Se.current.type), i.ref), ze[g] = !0);
      }
    }
    function xe(i, f) {
      {
        var g = function() {
          et || (et = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Gt(i, f) {
      {
        var g = function() {
          bt || (bt = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var r = function(i, f, g, C, D, F, A) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: g,
        props: A,
        // Record the component responsible for creating this element.
        _owner: F
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
        value: C
      }), Object.defineProperty(R, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: D
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function y(i, f, g, C, D) {
      {
        var F, A = {}, R = null, ce = null;
        g !== void 0 && (gt(g), R = "" + g), kt(f) && (gt(f.key), R = "" + f.key), Pt(f) && (ce = f.ref, yt(f, D));
        for (F in f)
          Te.call(f, F) && !Qe.hasOwnProperty(F) && (A[F] = f[F]);
        if (i && i.defaultProps) {
          var Z = i.defaultProps;
          for (F in Z)
            A[F] === void 0 && (A[F] = Z[F]);
        }
        if (R || ce) {
          var Q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          R && xe(A, Q), ce && Gt(A, Q);
        }
        return r(i, R, ce, D, C, Se.current, A);
      }
    }
    var O = B.ReactCurrentOwner, L = B.ReactDebugCurrentFrame;
    function K(i) {
      if (i) {
        var f = i._owner, g = Me(i.type, i._source, f ? f.type : null);
        L.setExtraStackFrame(g);
      } else
        L.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function ie(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function jt() {
      {
        if (O.current) {
          var i = $(O.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Dt(i) {
      {
        if (i !== void 0) {
          var f = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var tt = {};
    function pe(i) {
      {
        var f = jt();
        if (!f) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function he(i, f) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = pe(f);
        if (tt[g])
          return;
        tt[g] = !0;
        var C = "";
        i && i._owner && i._owner !== O.current && (C = " It was passed a child from " + $(i._owner.type) + "."), K(i), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), K(null);
      }
    }
    function Ae(i, f) {
      {
        if (typeof i != "object")
          return;
        if (Je(i))
          for (var g = 0; g < i.length; g++) {
            var C = i[g];
            ie(C) && he(C, f);
          }
        else if (ie(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var D = H(i);
          if (typeof D == "function" && D !== i.entries)
            for (var F = D.call(i), A; !(A = F.next()).done; )
              ie(A.value) && he(A.value, f);
        }
      }
    }
    function Pe(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var g;
        if (typeof f == "function")
          g = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === b))
          g = f.propTypes;
        else
          return;
        if (g) {
          var C = $(f);
          Ze(g, i.props, "prop", C, i);
        } else if (f.PropTypes !== void 0 && !de) {
          de = !0;
          var D = $(f);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(i) {
      {
        for (var f = Object.keys(i.props), g = 0; g < f.length; g++) {
          var C = f[g];
          if (C !== "children" && C !== "key") {
            K(i), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), K(null);
            break;
          }
        }
        i.ref !== null && (K(i), x("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function je(i, f, g, C, D, F) {
      {
        var A = _(i);
        if (!A) {
          var R = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Dt(D);
          ce ? R += ce : R += jt();
          var Z;
          i === null ? Z = "null" : Je(i) ? Z = "array" : i !== void 0 && i.$$typeof === n ? (Z = "<" + ($(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof i, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
        }
        var Q = y(i, f, g, D, F);
        if (Q == null)
          return Q;
        if (A) {
          var fe = f.children;
          if (fe !== void 0)
            if (C)
              if (Je(fe)) {
                for (var Ye = 0; Ye < fe.length; Ye++)
                  Ae(fe[Ye], i);
                Object.freeze && Object.freeze(fe);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ae(fe, i);
        }
        return i === e ? ke(Q) : Pe(Q), Q;
      }
    }
    function Bn(i, f, g) {
      return je(i, f, g, !0);
    }
    function Un(i, f, g) {
      return je(i, f, g, !1);
    }
    var $n = Un, zn = Bn;
    at.Fragment = e, at.jsx = $n, at.jsxs = zn;
  }()), at;
}
process.env.NODE_ENV === "production" ? zt.exports = ja() : zt.exports = Da();
var l = zt.exports;
function In(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const Ia = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), La = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Na(t) {
  return /* @__PURE__ */ l.jsx(An.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    La,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ia })
  ] }) }, t.title);
}
function Fa(t) {
  const [n, a] = ae(!1), [e, o] = ae(t.options), c = (d) => {
    t.onDragComplete(d), o(d);
  }, p = (d) => {
    const v = [...e];
    v.splice(d, 1), c(v);
  }, s = [];
  e.forEach((d, v) => {
    s.push(/* @__PURE__ */ l.jsx(Na, { index: v, title: d, onDelete: p }, d));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(In, { title: t.title }),
    /* @__PURE__ */ l.jsx(An.Group, { axis: "y", values: e, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function Ba(t) {
  const [n, a] = ae(!1), e = [];
  t.options.map((c, p) => {
    t.onSelect !== void 0 && (c.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Ua, { option: c }, p));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(In, { title: t.title }),
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
function Ua(t) {
  const { option: n } = t, [a, e] = ae("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        Fa,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (c) => {
            n.onDragComplete !== void 0 && n.onDragComplete(c);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      o = /* @__PURE__ */ l.jsx(
        Ba,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      o = /* @__PURE__ */ l.jsx(
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: o }, xa());
}
function Ii(t) {
  function n(e) {
    switch (t.components.forEach((o) => {
      o.handleApp(e);
    }), e.event) {
      case "custom":
        k.dispatchEvent({ type: j.CUSTOM, value: e.data });
        break;
    }
  }
  function a(e) {
    switch (t.components.forEach((o) => {
      o.handleEditor(e);
    }), e.event) {
      case "custom":
        k.dispatchEvent({ type: j.CUSTOM, value: e.data });
        break;
    }
  }
  t.listen = (e) => {
    e.target === "editor" ? a(e) : n(e);
  };
}
const $a = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, za = `out vec4 fragColor;
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
class Ya extends un {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Vn,
      side: dn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new wt(16777215)
        },
        uDistance: {
          value: n?.distance !== void 0 ? n?.distance : 1e4
        },
        uSubgridOpacity: {
          value: n?.subgridOpacity !== void 0 ? n?.subgridOpacity : 0.15
        },
        uGridOpacity: {
          value: n?.gridOpacity !== void 0 ? n?.gridOpacity : 0.25
        }
      },
      vertexShader: $a,
      fragmentShader: za,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class Ga extends Hn {
  gridMaterial;
  constructor() {
    const n = new Ya();
    super(new Wn(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Va = `#include <common>
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
}`, Ha = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Wa extends un {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Va,
      fragmentShader: Ha
    });
  }
}
function Yt(t) {
  const [n, a] = ae(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const o = !n;
          t.onToggle !== void 0 && t.onToggle(o), a(o);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: ot(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function Ln(t) {
  const [n, a] = ae(!1), e = t.child !== void 0 && t.child.children.length > 0, o = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((c) => {
    o.push(/* @__PURE__ */ l.jsx(Ln, { child: c, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx(l.Fragment, { children: t.child !== void 0 && /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
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
            t.child !== void 0 && (t.three.getObject(t.child.uuid), n || a(!0));
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${_a(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random()) });
}
function qa(t) {
  const n = [];
  return t.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Ln, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Ka = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Xa(t) {
  return "items" in t;
}
function Fe(t) {
  const n = [];
  return t.items.forEach((a) => {
    Xa(a) ? n.push(
      /* @__PURE__ */ l.jsx(Fe, { title: ot(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        rt,
        {
          title: a.title,
          prop: a.prop,
          value: a.value,
          type: a.type,
          min: a.min,
          max: a.max,
          step: a.step,
          disabled: a.disabled,
          options: a.options,
          onChange: (e, o) => {
            a.onChange !== void 0 && a.onChange(e, o);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Yt, { label: t.title, open: t.expanded === !0, children: n });
}
function Za(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
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
    case "blendAlpha":
      return "Blend Alpha";
    case "blendColor":
      return "Blend Color";
    case "blendDst":
      return "Blend Dst";
    case "blendDstAlpha":
      return "Blend Dst Alha";
    case "blendEquation":
      return "Blend Equation";
    case "blendEquationAlpha":
      return "Blend Equation Alpha";
    case "blending":
      return "Blending";
    case "blendSrc":
      return "Blend Src";
    case "blendSrcAlpha":
      return "Blend Src Alpha";
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
    case "side":
      return "Side";
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
function Ja(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Qa() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], o = new FileReader();
        o.onload = function(c) {
          n(c.target.result);
        }, o.readAsDataURL(e);
      }
    }), t.click();
  });
}
const ei = [
  {
    title: "Front",
    value: qn
  },
  {
    title: "Back",
    value: Kn
  },
  {
    title: "Double",
    value: dn
  }
], ti = [
  {
    title: "No Blending",
    value: Xn
  },
  {
    title: "Normal",
    value: Zn
  },
  {
    title: "Additive",
    value: Jn
  },
  {
    title: "Subtractive",
    value: Qn
  },
  {
    title: "Multiply",
    value: ea
  },
  {
    title: "Custom",
    value: ta
  }
], ni = [
  {
    title: "Add",
    value: na
  },
  {
    title: "Subtract",
    value: aa
  },
  {
    title: "Reverse Subtract",
    value: ia
  },
  {
    title: "Min",
    value: ra
  },
  {
    title: "Max",
    value: oa
  }
], ai = [
  {
    title: "Zero",
    valye: hn
  },
  {
    title: "One",
    valye: fn
  },
  {
    title: "Src Color",
    valye: pn
  },
  {
    title: "One Minus Src Color",
    valye: mn
  },
  {
    title: "Src Alpha",
    valye: vn
  },
  {
    title: "One Minus Src Alpha",
    valye: gn
  },
  {
    title: "Dst Alpha",
    valye: bn
  },
  {
    title: "One Minus Dst Alpha",
    valye: yn
  },
  {
    title: "Dst Color",
    valye: En
  },
  {
    title: "One Minus Dst Color",
    valye: Cn
  },
  {
    title: "Src Alpha Saturate",
    valye: sa
  },
  {
    title: "Constant Color",
    valye: Sn
  },
  {
    title: "One Minus Constant Color",
    valye: xn
  },
  {
    title: "Constant Alpha",
    valye: wn
  },
  {
    title: "One Minus Constant Alpha",
    valye: On
  }
], ii = [
  {
    title: "Zero",
    valye: hn
  },
  {
    title: "One",
    valye: fn
  },
  {
    title: "Src Color",
    valye: pn
  },
  {
    title: "One Minus Src Color",
    valye: mn
  },
  {
    title: "Src Alpha",
    valye: vn
  },
  {
    title: "One Minus Src Alpha",
    valye: gn
  },
  {
    title: "Dst Alpha",
    valye: bn
  },
  {
    title: "One Minus Dst Alpha",
    valye: yn
  },
  {
    title: "Dst Color",
    valye: En
  },
  {
    title: "One Minus Dst Color",
    valye: Cn
  },
  {
    title: "Constant Color",
    valye: Sn
  },
  {
    title: "One Minus Constant Color",
    valye: xn
  },
  {
    title: "Constant Alpha",
    valye: wn
  },
  {
    title: "One Minus Constant Alpha",
    valye: On
  }
];
function it(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Jt(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!Za(o))
      continue;
    const c = typeof t[o], p = t[o];
    if (c === "boolean" || c === "number" || c === "string") {
      const s = {
        title: De(o),
        prop: o,
        type: c,
        value: p,
        min: void 0,
        max: void 0,
        needsUpdate: c === "boolean",
        onChange: (d, v) => {
          a.updateObject(n.uuid, `material.${d}`, v), s.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${d}`, v);
        }
      };
      switch (o) {
        case "blending":
          it(s, ti);
          break;
        case "blendDst":
          it(s, ii);
          break;
        case "blendEquation":
          it(s, ni);
          break;
        case "blendSrc":
          it(s, ai);
          break;
        case "side":
          it(s, ei);
          break;
      }
      Ja(o) && (s.value = Number(p), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01);
      const u = c === "string" && (o === "vertexShader" || o === "fragmentShader");
      u && (s.disabled = !1, s.latest = s.value, s.onChange = (d, v) => {
        s.latest = v;
      }), e.push(s), u && e.push({
        title: `${ot(o)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${o}`, s.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const d = a.scene?.getObjectByProperty("uuid", n.uuid);
          d !== void 0 && (ee(d, `material.${o}`, s.latest), d.material.needsUpdate = !0);
        }
      });
    } else if (c === "object")
      if (p.isColor)
        e.push({
          title: De(o),
          prop: o,
          type: "color",
          value: p,
          onChange: (s, u) => {
            const d = new wt(u);
            a.updateObject(n.uuid, `material.${s}`, d);
            const v = a.scene?.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && ee(v, `material.${s}`, d);
          }
        });
      else if (Array.isArray(p)) {
        const s = [];
        for (const u in p)
          s.push({
            title: `${u}`,
            type: `${typeof p[u]}`,
            value: p[u],
            onChange: (d, v) => {
              a.updateObject(n.uuid, `material.${o}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${o}`, v);
            }
          });
        e.push({
          title: De(o),
          items: s
        });
      } else {
        const s = [];
        for (const u in p) {
          const d = p[u];
          switch (typeof d) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: De(o),
                type: "image",
                value: d,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${o}`, E);
                  const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && $t(E).then((M) => {
                    ee(S, `material.${o}`, M), ee(S, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${De(u)}`,
                prop: `material.${o}.${u}`,
                type: `${typeof t[o][u]}`,
                value: p[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${o}.${u}`, E);
                  const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && ee(S, `material.${o}.${u}`, E);
                }
              });
              break;
            case "object":
              if (d.value !== void 0 && d.value.src !== void 0)
                s.push({
                  title: De(u),
                  type: "image",
                  value: d.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${o}.${u}.value`, p);
                    const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                    S !== void 0 && $t(E).then((M) => {
                      ee(S, `material.${o}.${u}.value`, M);
                    });
                  }
                });
              else if (o === "uniforms") {
                const b = d.value, E = (S, M, P) => ({
                  title: S,
                  type: "number",
                  value: P,
                  step: 0.01,
                  onChange: (H, B) => {
                    const x = `material.uniforms.${u}.value.${M}`;
                    a.updateObject(n.uuid, x, B);
                    const z = a.scene?.getObjectByProperty("uuid", n.uuid);
                    z !== void 0 && ee(z, x, B);
                  }
                });
                if (typeof d.value == "number")
                  s.push({
                    title: u,
                    type: "number",
                    value: d.value,
                    onChange: (S, M) => {
                      const P = `material.${o}.${S}.value`;
                      a.updateObject(n.uuid, P, M);
                      const H = a.scene?.getObjectByProperty("uuid", n.uuid);
                      H !== void 0 && ee(H, P, M);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  s.push({
                    title: u,
                    type: "color",
                    value: d.value,
                    onChange: (S, M) => {
                      const P = new wt(M), H = `material.${o}.${S}.value`;
                      a.updateObject(n.uuid, H, P);
                      const B = a.scene?.getObjectByProperty("uuid", n.uuid);
                      B !== void 0 && ee(B, H, P);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  s.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w === void 0)
                  s.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y),
                        E("Z", "z", d.value.z)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w !== void 0)
                  s.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y),
                        E("Z", "z", d.value.z),
                        E("W", "w", d.value.w)
                      ]
                    }
                  );
                else if (b.elements !== void 0) {
                  const S = b.elements, M = [];
                  for (let P = 0; P < S.length; P++)
                    M.push(E(P.toString(), P.toString(), S[P]));
                  s.push(
                    {
                      title: u,
                      items: M
                    }
                  );
                } else
                  console.log(">>> need to add this format:", u, b);
              } else
                s.push({
                  title: u,
                  type: `${typeof d.value}`,
                  value: d.value,
                  onChange: (b, E) => {
                    a.updateObject(n.uuid, `material.${o}.${u}.value`, E);
                    const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                    S !== void 0 && ee(S, `material.${o}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        s.length > 0 && e.push({
          title: De(o),
          items: s
        });
      }
    else
      p !== void 0 && console.log("other:", o, c, p);
  }
  return e.sort((o, c) => o.title < c.title ? -1 : o.title > c.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function ri(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let c = 0; c < o; c++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Fe,
          {
            title: `Material ${c}`,
            items: Jt(a[c], t, n)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Fe,
      {
        title: "Material",
        items: Jt(a, t, n)
      }
    );
}
function rt(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Oa(t.value));
  const [a, e] = ae(n), o = ye(null), c = ye(null), p = ye(null);
  we(() => {
    let v = !1, b = -1, E = 0, S = Number(a);
    const M = (z) => {
      v = !0, E = S, b = z.clientX;
    }, P = (z) => {
      if (!v)
        return;
      const Ee = t.step !== void 0 ? t.step : 1, le = (z.clientX - b) * Ee;
      S = Number((E + le).toFixed(4)), c.current !== null && (c.current.value = S.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, S);
    }, H = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, x = t.type === "number";
    return x && (o.current?.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", H, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", B, !1)), () => {
      x && (o.current?.removeEventListener("mousedown", M), document.removeEventListener("mouseup", H), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const s = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = s || t.type === "image", d = (v) => {
    let b = v.target.value;
    t.type === "boolean" ? b = v.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: ot(t.title) }, "fieldLabel"),
    t.type === "string" && !s && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: d,
        value: a
      }
    ),
    t.type === "string" && s && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: d,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: d,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: c,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        disabled: t.disabled,
        onChange: d
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: t.disabled, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: d
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: d, disabled: t.disabled })
    ] }),
    t.type === "button" && /* @__PURE__ */ l.jsx(
      "button",
      {
        disabled: t.disabled,
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: p, onClick: () => {
      Qa().then((v) => {
        p.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : Ka }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: d, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((v, b) => /* @__PURE__ */ l.jsx("option", { value: v.value, children: ot(v.title) }, b)) }) })
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
function oi(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Qt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, c) => {
          n.updateObject(t.uuid, o, c), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, o, c), p.updateProjectionMatrix());
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
        onChange: (o, c) => {
          n.updateObject(t.uuid, o, c), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, o, c), p.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Fe,
    {
      title: "Camera",
      items: a
    }
  );
}
const si = Math.PI / 180, ci = 180 / Math.PI;
function We(t, n, a, e, o) {
  return e + (t - n) * (o - e) / (a - n);
}
function li(t) {
  return t * si;
}
function Nt(t) {
  return t * ci;
}
function ui(t, n) {
  const a = new ca();
  a.elements = t.matrix;
  const e = new X(), o = new la(), c = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const p = (u, d) => {
    n.updateObject(t.uuid, u, d);
    const v = n.scene?.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && ee(v, u, d);
  }, s = (u, d) => {
    p(u, li(d));
  };
  return /* @__PURE__ */ l.jsx(
    Fe,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: p
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: p
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: p
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: It(Nt(o.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: s
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: It(Nt(o.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: s
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: It(Nt(o.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: s
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: c.x,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: c.y,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: c.z,
          step: 0.01,
          onChange: p
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
function di(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: en(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (c, p) => {
          const s = new wt(p);
          n.updateObject(t.uuid, c, s);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && ee(u, c, s);
        }
      }) : a.push({
        title: en(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (c, p) => {
          n.updateObject(t.uuid, c, p);
          const s = n.scene?.getObjectByProperty("uuid", t.uuid);
          s !== void 0 && ee(s, c, p);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Fe,
    {
      title: "Light",
      items: a
    }
  );
}
function hi(t, n) {
  const a = [], e = [];
  let o = 0;
  t.animations.forEach((s) => {
    o = Math.max(o, s.duration), s.duration > 0 && e.push({
      title: s.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: s.duration,
          disabled: !0
        },
        {
          title: "Blend Mode",
          type: "option",
          disabled: !0,
          options: [
            {
              title: "Normal",
              value: 2500
            },
            {
              title: "Additive",
              value: 2501
            }
          ]
        }
      ]
    });
  }), a.push({
    title: "Animations",
    items: e
  });
  const c = n.scene?.getObjectByProperty("uuid", t.uuid);
  let p = !1;
  if (c !== void 0) {
    const s = c.mixer;
    if (p = s !== void 0, p) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: s.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (d, v) => {
            s.timeScale = v, n.updateObject(t.uuid, "mixer.timeScale", v);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          s.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: u
      });
    }
  }
  return /* @__PURE__ */ l.jsx(Fe, { title: "Animation", items: a });
}
const Nn = {
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
let te = { ...Nn };
function fi(t) {
  const [n, a] = ae(-1);
  we(() => {
    function p(u) {
      te = { ...u.value }, a(Date.now());
    }
    function s() {
      te = { ...Nn }, a(Date.now());
    }
    return k.addEventListener(j.SET_SCENE, s), k.addEventListener(j.SET_OBJECT, p), () => {
      k.removeEventListener(j.SET_SCENE, s), k.removeEventListener(j.SET_OBJECT, p);
    };
  }, []);
  const e = te.type.toLowerCase(), o = te.animations.length > 0 || te.mixer !== void 0, c = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Yt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: te.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        rt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: te.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        rt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: te.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        rt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: te.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        rt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: te.visible,
          onChange: (p, s) => {
            t.three.updateObject(te.uuid, p, s);
            const u = t.three.scene?.getObjectByProperty("uuid", te.uuid);
            u !== void 0 && ee(u, p, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      ui(te, t.three),
      o ? hi(te, t.three) : null,
      e.search("camera") > -1 ? oi(te, t.three) : null,
      e.search("light") > -1 ? di(te, t.three) : null,
      c ? ri(te, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Li(t) {
  const [n, a] = ae(t.scene);
  we(() => {
    const c = (p) => {
      a(p.value);
    };
    return k.addEventListener(j.SET_SCENE, c), () => {
      k.removeEventListener(j.SET_SCENE, c);
    };
  }, []);
  const e = n !== null, o = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Yt, { label: o, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: e && /* @__PURE__ */ l.jsx(qa, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ l.jsx(fi, { three: t.three })
  ] }, "SidePanel");
}
function Ni(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (s) => {
    if (!n())
      return;
    const u = t.three.scene?.getObjectByProperty("uuid", s.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (s, u, d) => {
    if (!n())
      return;
    const v = t.three.scene?.getObjectByProperty("uuid", s);
    v !== void 0 && ee(v, u, d);
  }, o = (s) => {
    if (!n())
      return;
    const u = s.value, { key: d, value: v, uuid: b } = u;
    e(b, d, v);
  }, c = (s) => {
    if (!n())
      return;
    const u = s.value;
    $t(u.value).then((d) => {
      e(u.uuid, u.key, d), e(u.uuid, "material.needsUpdate", !0);
    });
  }, p = (s) => {
    if (!n())
      return;
    const { key: u, uuid: d, value: v, subitem: b } = s.value, E = t.three.scene?.getObjectByProperty("uuid", d);
    if (E !== void 0)
      try {
        b !== void 0 ? ka(E, b)[u](v) : E[u](v);
      } catch (S) {
        console.log("Error requesting method:"), console.log(S), console.log(u), console.log(v);
      }
  };
  return we(() => (k.addEventListener(j.GET_OBJECT, a), k.addEventListener(j.UPDATE_OBJECT, o), k.addEventListener(j.CREATE_TEXTURE, c), k.addEventListener(j.REQUEST_METHOD, p), () => {
    k.removeEventListener(j.GET_OBJECT, a), k.removeEventListener(j.UPDATE_OBJECT, o), k.removeEventListener(j.CREATE_TEXTURE, c), k.removeEventListener(j.REQUEST_METHOD, p);
  }), []), null;
}
const tn = { type: "change" }, Ft = { type: "start" }, nn = { type: "end" }, Et = new ua(), an = new da(), pi = Math.cos(70 * ha.DEG2RAD);
class mi extends cn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ge.ROTATE, MIDDLE: Ge.DOLLY, RIGHT: Ge.PAN }, this.touches = { ONE: Ve.ROTATE, TWO: Ve.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(r) {
      r.addEventListener("keydown", Qe), this._domElementKeyEvents = r;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Qe), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(tn), e.update(), c = o.NONE;
    }, this.update = function() {
      const r = new X(), y = new Wt().setFromUnitVectors(n.up, new X(0, 1, 0)), O = y.clone().invert(), L = new X(), K = new Wt(), de = new X(), ie = 2 * Math.PI;
      return function(Dt = null) {
        const tt = e.object.position;
        r.copy(tt).sub(e.target), r.applyQuaternion(y), s.setFromVector3(r), e.autoRotate && c === o.NONE && U(_(Dt)), e.enableDamping ? (s.theta += u.theta * e.dampingFactor, s.phi += u.phi * e.dampingFactor) : (s.theta += u.theta, s.phi += u.phi);
        let pe = e.minAzimuthAngle, he = e.maxAzimuthAngle;
        isFinite(pe) && isFinite(he) && (pe < -Math.PI ? pe += ie : pe > Math.PI && (pe -= ie), he < -Math.PI ? he += ie : he > Math.PI && (he -= ie), pe <= he ? s.theta = Math.max(pe, Math.min(he, s.theta)) : s.theta = s.theta > (pe + he) / 2 ? Math.max(pe, s.theta) : Math.min(he, s.theta)), s.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, s.phi)), s.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && se || e.object.isOrthographicCamera ? s.radius = me(s.radius) : s.radius = me(s.radius * d), r.setFromSpherical(s), r.applyQuaternion(O), tt.copy(e.target).add(r), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), v.set(0, 0, 0));
        let Ae = !1;
        if (e.zoomToCursor && se) {
          let Pe = null;
          if (e.object.isPerspectiveCamera) {
            const ke = r.length();
            Pe = me(ke * d);
            const je = ke - Pe;
            e.object.position.addScaledVector(Ee, je), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const ke = new X(le.x, le.y, 0);
            ke.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix(), Ae = !0;
            const je = new X(le.x, le.y, 0);
            je.unproject(e.object), e.object.position.sub(je).add(ke), e.object.updateMatrixWorld(), Pe = r.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Pe !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Pe).add(e.object.position) : (Et.origin.copy(e.object.position), Et.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Et.direction)) < pi ? n.lookAt(e.target) : (an.setFromNormalAndCoplanarPoint(e.object.up, e.target), Et.intersectPlane(an, e.target))));
        } else
          e.object.isOrthographicCamera && (Ae = d !== 1, Ae && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix()));
        return d = 1, se = !1, Ae || L.distanceToSquared(e.object.position) > p || 8 * (1 - K.dot(e.object.quaternion)) > p || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(tn), L.copy(e.object.position), K.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", ze), e.domElement.removeEventListener("pointerdown", Re), e.domElement.removeEventListener("pointercancel", _e), e.domElement.removeEventListener("wheel", mt), e.domElement.removeEventListener("pointermove", Ze), e.domElement.removeEventListener("pointerup", _e), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Qe), e._domElementKeyEvents = null);
    };
    const e = this, o = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let c = o.NONE;
    const p = 1e-6, s = new qt(), u = new qt();
    let d = 1;
    const v = new X(), b = new ue(), E = new ue(), S = new ue(), M = new ue(), P = new ue(), H = new ue(), B = new ue(), x = new ue(), z = new ue(), Ee = new X(), le = new ue();
    let se = !1;
    const h = [], m = {};
    let w = !1;
    function _(r) {
      return r !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * r : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Y(r) {
      const y = Math.abs(r * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function U(r) {
      u.theta -= r;
    }
    function $(r) {
      u.phi -= r;
    }
    const I = function() {
      const r = new X();
      return function(O, L) {
        r.setFromMatrixColumn(L, 0), r.multiplyScalar(-O), v.add(r);
      };
    }(), W = function() {
      const r = new X();
      return function(O, L) {
        e.screenSpacePanning === !0 ? r.setFromMatrixColumn(L, 1) : (r.setFromMatrixColumn(L, 0), r.crossVectors(e.object.up, r)), r.multiplyScalar(O), v.add(r);
      };
    }(), q = function() {
      const r = new X();
      return function(O, L) {
        const K = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const de = e.object.position;
          r.copy(de).sub(e.target);
          let ie = r.length();
          ie *= Math.tan(e.object.fov / 2 * Math.PI / 180), I(2 * O * ie / K.clientHeight, e.object.matrix), W(2 * L * ie / K.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (I(O * (e.object.right - e.object.left) / e.object.zoom / K.clientWidth, e.object.matrix), W(L * (e.object.top - e.object.bottom) / e.object.zoom / K.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function T(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d /= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d *= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function J(r, y) {
      if (!e.zoomToCursor)
        return;
      se = !0;
      const O = e.domElement.getBoundingClientRect(), L = r - O.left, K = y - O.top, de = O.width, ie = O.height;
      le.x = L / de * 2 - 1, le.y = -(K / ie) * 2 + 1, Ee.set(le.x, le.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function me(r) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, r));
    }
    function Ce(r) {
      b.set(r.clientX, r.clientY);
    }
    function lt(r) {
      J(r.clientX, r.clientX), B.set(r.clientX, r.clientY);
    }
    function qe(r) {
      M.set(r.clientX, r.clientY);
    }
    function Tt(r) {
      E.set(r.clientX, r.clientY), S.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * S.x / y.clientHeight), $(2 * Math.PI * S.y / y.clientHeight), b.copy(E), e.update();
    }
    function Rt(r) {
      x.set(r.clientX, r.clientY), z.subVectors(x, B), z.y > 0 ? T(Y(z.y)) : z.y < 0 && N(Y(z.y)), B.copy(x), e.update();
    }
    function Ke(r) {
      P.set(r.clientX, r.clientY), H.subVectors(P, M).multiplyScalar(e.panSpeed), q(H.x, H.y), M.copy(P), e.update();
    }
    function Xe(r) {
      J(r.clientX, r.clientY), r.deltaY < 0 ? N(Y(r.deltaY)) : r.deltaY > 0 && T(Y(r.deltaY)), e.update();
    }
    function Ue(r) {
      let y = !1;
      switch (r.code) {
        case e.keys.UP:
          r.ctrlKey || r.metaKey || r.shiftKey ? $(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          r.ctrlKey || r.metaKey || r.shiftKey ? $(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          r.ctrlKey || r.metaKey || r.shiftKey ? U(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          r.ctrlKey || r.metaKey || r.shiftKey ? U(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (r.preventDefault(), e.update());
    }
    function $e(r) {
      if (h.length === 1)
        b.set(r.pageX, r.pageY);
      else {
        const y = xe(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        b.set(O, L);
      }
    }
    function Oe(r) {
      if (h.length === 1)
        M.set(r.pageX, r.pageY);
      else {
        const y = xe(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        M.set(O, L);
      }
    }
    function ut(r) {
      const y = xe(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      B.set(0, K);
    }
    function dt(r) {
      e.enableZoom && ut(r), e.enablePan && Oe(r);
    }
    function _t(r) {
      e.enableZoom && ut(r), e.enableRotate && $e(r);
    }
    function ht(r) {
      if (h.length == 1)
        E.set(r.pageX, r.pageY);
      else {
        const O = xe(r), L = 0.5 * (r.pageX + O.x), K = 0.5 * (r.pageY + O.y);
        E.set(L, K);
      }
      S.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * S.x / y.clientHeight), $(2 * Math.PI * S.y / y.clientHeight), b.copy(E);
    }
    function Me(r) {
      if (h.length === 1)
        P.set(r.pageX, r.pageY);
      else {
        const y = xe(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        P.set(O, L);
      }
      H.subVectors(P, M).multiplyScalar(e.panSpeed), q(H.x, H.y), M.copy(P);
    }
    function Te(r) {
      const y = xe(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      x.set(0, K), z.set(0, Math.pow(x.y / B.y, e.zoomSpeed)), T(z.y), B.copy(x);
      const de = (r.pageX + y.x) * 0.5, ie = (r.pageY + y.y) * 0.5;
      J(de, ie);
    }
    function ft(r) {
      e.enableZoom && Te(r), e.enablePan && Me(r);
    }
    function pt(r) {
      e.enableZoom && Te(r), e.enableRotate && ht(r);
    }
    function Re(r) {
      e.enabled !== !1 && (h.length === 0 && (e.domElement.setPointerCapture(r.pointerId), e.domElement.addEventListener("pointermove", Ze), e.domElement.addEventListener("pointerup", _e)), Pt(r), r.pointerType === "touch" ? et(r) : Je(r));
    }
    function Ze(r) {
      e.enabled !== !1 && (r.pointerType === "touch" ? bt(r) : At(r));
    }
    function _e(r) {
      switch (kt(r), h.length) {
        case 0:
          e.domElement.releasePointerCapture(r.pointerId), e.domElement.removeEventListener("pointermove", Ze), e.domElement.removeEventListener("pointerup", _e), e.dispatchEvent(nn), c = o.NONE;
          break;
        case 1:
          const y = h[0], O = m[y];
          et({ pointerId: y, pageX: O.x, pageY: O.y });
          break;
      }
    }
    function Je(r) {
      let y;
      switch (r.button) {
        case 0:
          y = e.mouseButtons.LEFT;
          break;
        case 1:
          y = e.mouseButtons.MIDDLE;
          break;
        case 2:
          y = e.mouseButtons.RIGHT;
          break;
        default:
          y = -1;
      }
      switch (y) {
        case Ge.DOLLY:
          if (e.enableZoom === !1)
            return;
          lt(r), c = o.DOLLY;
          break;
        case Ge.ROTATE:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enablePan === !1)
              return;
            qe(r), c = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Ce(r), c = o.ROTATE;
          }
          break;
        case Ge.PAN:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Ce(r), c = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            qe(r), c = o.PAN;
          }
          break;
        default:
          c = o.NONE;
      }
      c !== o.NONE && e.dispatchEvent(Ft);
    }
    function At(r) {
      switch (c) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          Tt(r);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          Rt(r);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          Ke(r);
          break;
      }
    }
    function mt(r) {
      e.enabled === !1 || e.enableZoom === !1 || c !== o.NONE || (r.preventDefault(), e.dispatchEvent(Ft), Xe(vt(r)), e.dispatchEvent(nn));
    }
    function vt(r) {
      const y = r.deltaMode, O = {
        clientX: r.clientX,
        clientY: r.clientY,
        deltaY: r.deltaY
      };
      switch (y) {
        case 1:
          O.deltaY *= 16;
          break;
        case 2:
          O.deltaY *= 100;
          break;
      }
      return r.ctrlKey && !w && (O.deltaY *= 10), O;
    }
    function gt(r) {
      r.key === "Control" && (w = !0, e.domElement.getRootNode().addEventListener("keyup", Se, { passive: !0, capture: !0 }));
    }
    function Se(r) {
      r.key === "Control" && (w = !1, e.domElement.getRootNode().removeEventListener("keyup", Se, { passive: !0, capture: !0 }));
    }
    function Qe(r) {
      e.enabled === !1 || e.enablePan === !1 || Ue(r);
    }
    function et(r) {
      switch (yt(r), h.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ve.ROTATE:
              if (e.enableRotate === !1)
                return;
              $e(r), c = o.TOUCH_ROTATE;
              break;
            case Ve.PAN:
              if (e.enablePan === !1)
                return;
              Oe(r), c = o.TOUCH_PAN;
              break;
            default:
              c = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ve.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              dt(r), c = o.TOUCH_DOLLY_PAN;
              break;
            case Ve.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              _t(r), c = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              c = o.NONE;
          }
          break;
        default:
          c = o.NONE;
      }
      c !== o.NONE && e.dispatchEvent(Ft);
    }
    function bt(r) {
      switch (yt(r), c) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ht(r), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Me(r), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          ft(r), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          pt(r), e.update();
          break;
        default:
          c = o.NONE;
      }
    }
    function ze(r) {
      e.enabled !== !1 && r.preventDefault();
    }
    function Pt(r) {
      h.push(r.pointerId);
    }
    function kt(r) {
      delete m[r.pointerId];
      for (let y = 0; y < h.length; y++)
        if (h[y] == r.pointerId) {
          h.splice(y, 1);
          return;
        }
    }
    function yt(r) {
      let y = m[r.pointerId];
      y === void 0 && (y = new ue(), m[r.pointerId] = y), y.set(r.pageX, r.pageY);
    }
    function xe(r) {
      const y = r.pointerId === h[0] ? h[1] : h[0];
      return m[y];
    }
    e.domElement.addEventListener("contextmenu", ze), e.domElement.addEventListener("pointerdown", Re), e.domElement.addEventListener("pointercancel", _e), e.domElement.addEventListener("wheel", mt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", gt, { passive: !0, capture: !0 }), this.update();
  }
}
const xt = (t) => {
  const [n, a] = ae(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, o = (c) => {
    c !== n && (t.onSelect(c), a(c)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((c) => /* @__PURE__ */ l.jsx("li", { onClick: () => o(c), children: c }, c)) })
  ] });
}, Ie = Sa(function(n, a) {
  const [e, o] = ae(!1), c = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && o(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      xt,
      {
        index: c,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (p) => {
          o(p);
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
], ne = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Map();
function Be(t, n) {
  const a = new Mn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ne.set(t, a), a;
}
Be("Top", new X(0, 1e3, 0));
Be("Bottom", new X(0, -1e3, 0));
Be("Left", new X(-1e3, 0, 0));
Be("Right", new X(1e3, 0, 0));
Be("Front", new X(0, 0, 1e3));
Be("Back", new X(0, 0, -1e3));
Be("Orthographic", new X(1e3, 1e3, 1e3));
const Mt = new Bt(60, 1, 50, 3e3);
Mt.name = "Debug";
Mt.position.set(500, 500, 500);
Mt.lookAt(0, 0, 0);
ne.set("Debug", Mt);
const on = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], vi = new fa(), gi = new pa(), bi = new Wa(), yi = new ma({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let Ct = "Renderer";
const V = new Tn();
V.name = "Debug Scene";
let be = new Tn();
V.add(be);
const ct = new va();
ct.name = "helpers";
V.add(ct);
const Ei = new Ga();
ct.add(Ei);
const Fn = new Rn(500);
Fn.name = "axisHelper";
ct.add(Fn);
const st = new Rn(100);
st.name = "interactionHelper";
ct.add(st);
st.visible = !1;
let St = !1, G = ne.get("Debug"), oe = ne.get("Orthographic"), Le = ne.get("Front"), Ne = ne.get("Top"), sn = !1;
function Fi(t) {
  const [n, a] = ae(t.mode !== void 0 ? t.mode : "Single"), [e, o] = ae(null), [c, p] = ae(!1), [s, u] = ae(!1), [d, v] = ae(!1), [, b] = ae(Date.now()), E = ye(null), S = ye(null), M = ye(null), P = ye(null), H = ye(null), B = ye(null), x = (h, m) => {
    const w = re.get(h.name);
    w !== void 0 && w.dispose(), re.delete(h.name);
    const _ = ge.get(h.name);
    _ !== void 0 && (V.remove(_), _.dispose()), ge.delete(h.name);
    const Y = new mi(h, m);
    switch (Y.enableDamping = !0, Y.dampingFactor = 0.05, h.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        Y.enableRotate = !1;
        break;
    }
    if (re.set(h.name, Y), h instanceof Bt) {
      const U = new ya(h);
      ge.set(h.name, U), V.add(U);
    }
  }, z = (h) => {
    const m = ge.get(h.name);
    m !== void 0 && (V.remove(m), m.dispose(), ge.delete(h.name));
    const w = re.get(h.name);
    w !== void 0 && (w.dispose(), re.delete(h.name));
  }, Ee = () => {
    re.forEach((h, m) => {
      h.dispose();
      const w = ge.get(m);
      w !== void 0 && (V.remove(w), w.dispose()), ge.delete(m), re.delete(m);
    }), re.clear(), ge.clear();
  }, le = () => {
    switch (n) {
      case "Single":
        x(G, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        x(G, M.current), x(oe, P.current);
        break;
      case "Quad":
        x(G, M.current), x(oe, P.current), x(Le, H.current), x(Ne, B.current);
        break;
    }
  };
  we(() => {
    const h = new ga({
      canvas: E.current,
      stencil: !1
    });
    h.autoClear = !1, h.shadowMap.enabled = !0, h.setPixelRatio(devicePixelRatio), h.setClearColor(0), o(h);
  }, []), we(() => {
    const h = (_) => {
      jn(be), V.remove(be);
      const Y = t.scenes.get(_.value.name);
      if (Y !== void 0) {
        const U = new Y();
        t.onSceneSet !== void 0 && t.onSceneSet(U), be = U, t.three.scene = be, V.add(be), sn = !0;
      }
    }, m = (_) => {
      const Y = _.value, U = t.three.scene?.getObjectByProperty("uuid", Y.uuid);
      U !== void 0 && ne.set(Y.name, U), b(Date.now());
    }, w = (_) => {
      ne.delete(_.value.name), b(Date.now());
    };
    return k.addEventListener(j.SET_SCENE, h), k.addEventListener(j.ADD_CAMERA, m), k.addEventListener(j.REMOVE_CAMERA, w), () => {
      k.removeEventListener(j.SET_SCENE, h), k.removeEventListener(j.ADD_CAMERA, m), k.removeEventListener(j.REMOVE_CAMERA, w);
    };
  }, []), we(() => {
    if (e === null)
      return;
    let h = window.innerWidth, m = window.innerHeight, w = Math.floor(h / 2), _ = Math.floor(m / 2), Y = -1;
    const U = () => {
      h = window.innerWidth - 300, m = window.innerHeight, w = Math.floor(h / 2), _ = Math.floor(m / 2), e.setSize(h, m);
      let T = h, N = m;
      switch (n) {
        case "Side by Side":
          T = w, N = m;
          break;
        case "Stacked":
          T = h, N = _;
          break;
        case "Quad":
          T = w, N = _;
          break;
      }
      ne.forEach((J) => {
        J instanceof Mn ? (J.left = T / -2, J.right = T / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof Bt && (J.aspect = T / N, J.updateProjectionMatrix(), ge.get(J.name)?.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, h, m), e.setScissor(0, 0, h, m), e.render(V, G);
    }, I = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, w, m), e.setScissor(0, 0, w, m), e.render(V, G), e.setViewport(w, 0, w, m), e.setScissor(w, 0, w, m), e.render(V, oe);
      else {
        const T = m - _;
        e.setViewport(0, T, h, _), e.setScissor(0, T, h, _), e.render(V, G), e.setViewport(0, 0, h, _), e.setScissor(0, 0, h, _), e.render(V, oe);
      }
    }, W = () => {
      let T = 0, N = 0;
      N = m - _, T = 0, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, G), T = w, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, oe), N = 0, T = 0, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, Le), T = w, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, Ne);
    }, q = () => {
      switch (re.forEach((T) => {
        T.update();
      }), t.onSceneUpdate !== void 0 && sn && t.onSceneUpdate(be), e.clear(), n) {
        case "Single":
          $();
          break;
        case "Side by Side":
        case "Stacked":
          I();
          break;
        case "Quad":
          W();
          break;
      }
      Y = requestAnimationFrame(q);
    };
    return le(), window.addEventListener("resize", U), U(), q(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(Y), Y = -1;
    };
  }, [n, e]), we(() => {
    if (e !== null) {
      const h = new ba(), m = new ue(), w = ($, I, W, q) => {
        switch (n) {
          case "Quad":
            $ < W ? I < q ? h.setFromCamera(m, G) : h.setFromCamera(m, Le) : I < q ? h.setFromCamera(m, oe) : h.setFromCamera(m, Ne);
            break;
          case "Side by Side":
            $ < W ? h.setFromCamera(m, G) : h.setFromCamera(m, oe);
            break;
          case "Single":
            h.setFromCamera(m, G);
            break;
          case "Stacked":
            I < q ? h.setFromCamera(m, G) : h.setFromCamera(m, oe);
            break;
        }
      }, _ = ($) => {
        if (!St)
          return;
        const I = new ue();
        e.getSize(I);
        const W = Math.min($.clientX, I.x), q = Math.min($.clientY, I.y);
        m.x = We(W, 0, I.x, -1, 1), m.y = We(q, 0, I.y, 1, -1);
        const T = I.x / 2, N = I.y / 2, J = () => {
          W < T ? m.x = We(W, 0, T, -1, 1) : m.x = We(W, T, I.x, -1, 1);
        }, me = () => {
          q < N ? m.y = We(q, 0, N, 1, -1) : m.y = We(q, N, I.y, 1, -1);
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
        w(W, q, T, N);
        const Ce = h.intersectObjects(be.children);
        Ce.length > 0 && st.position.copy(Ce[0].point);
      }, Y = ($) => {
        if (!St)
          return;
        const I = new ue();
        if (e.getSize(I), $.clientX >= I.x)
          return;
        _($);
        const W = h.intersectObjects(be.children);
        W.length > 0 && t.three.getObject(W[0].object.uuid);
      }, U = S.current;
      return U.addEventListener("mousemove", _, !1), U.addEventListener("click", Y, !1), () => {
        U.removeEventListener("mousemove", _), U.removeEventListener("click", Y);
      };
    }
  }, [n, e]);
  const se = [];
  return ne.forEach((h, m) => {
    se.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: E }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: S, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ie, { camera: G, options: se, ref: M, onSelect: (h) => {
        re.get(G.name)?.dispose();
        const m = ne.get(h);
        m !== void 0 && (z(G), G = m, x(m, M.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: G, options: se, ref: M, onSelect: (h) => {
          re.get(G.name)?.dispose();
          const m = ne.get(h);
          m !== void 0 && (z(G), G = m, x(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: oe, options: se, ref: P, onSelect: (h) => {
          re.get(oe.name)?.dispose();
          const m = ne.get(h);
          m !== void 0 && (z(oe), oe = m, x(m, P.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: G, options: se, ref: M, onSelect: (h) => {
          re.get(G.name)?.dispose();
          const m = ne.get(h);
          m !== void 0 && (z(G), G = m, x(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: oe, options: se, ref: P, onSelect: (h) => {
          re.get(oe.name)?.dispose();
          const m = ne.get(h);
          m !== void 0 && (z(oe), oe = m, x(m, P.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Le, options: se, ref: H, onSelect: (h) => {
          re.get(Le.name)?.dispose();
          const m = ne.get(h);
          m !== void 0 && (z(Le), Le = m, x(m, H.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Ne, options: se, ref: B, onSelect: (h) => {
          re.get(Ne.name)?.dispose();
          const m = ne.get(h);
          m !== void 0 && (z(Ne), Ne = m, x(m, B.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        xt,
        {
          index: rn.indexOf(n),
          options: rn,
          onSelect: (h) => {
            h !== n && (Ee(), a(h));
          },
          open: c,
          onToggle: (h) => {
            p(h), s && u(!1), d && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        xt,
        {
          index: on.indexOf(Ct),
          options: on,
          onSelect: (h) => {
            if (h !== Ct)
              switch (Ct = h, Ct) {
                case "Depth":
                  V.overrideMaterial = vi;
                  break;
                case "Normals":
                  V.overrideMaterial = gi;
                  break;
                default:
                case "Renderer":
                  V.overrideMaterial = null;
                  break;
                case "Wireframe":
                  V.overrideMaterial = yi;
                  break;
                case "UVs":
                  V.overrideMaterial = bi;
                  break;
              }
          },
          open: s,
          onToggle: (h) => {
            c && p(!1), u(h), d && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        xt,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (h) => {
            St = h === "Selection Mode", st.visible = St;
          },
          open: d,
          onToggle: (h) => {
            c && p(!1), s && u(!1), v(h);
          }
        }
      )
    ] })
  ] });
}
function Bi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Yt as Accordion,
  Ai as Application,
  Ot as BaseRemote,
  Ln as ChildObject,
  qa as ContainerObject,
  Fa as Draggable,
  Na as DraggableItem,
  Ba as Dropdown,
  Ua as DropdownItem,
  Bi as Editor,
  Ga as InfiniteGridHelper,
  fi as Inspector,
  Fi as MultiView,
  In as NavButton,
  Pi as RemoteComponents,
  Ii as RemoteController,
  Ra as RemoteTheatre,
  ji as RemoteThree,
  Di as RemoteTweakpane,
  Ni as SceneInspector,
  Li as SidePanel,
  j as ToolEvents,
  Wa as UVMaterial,
  ot as capitalize,
  Ti as clamp,
  Oa as colorToHex,
  k as debugDispatcher,
  Mi as defaultTheatreCallback,
  jn as dispose,
  Ta as disposeMaterial,
  _i as disposeTexture,
  Ri as distance,
  kn as hierarchyUUID,
  wa as isColor,
  Pn as noop,
  xa as randomID,
  Ma as resetThreeObjects,
  It as round,
  ki as theatreEditorApp,
  Ut as totalThreeObjects
};
