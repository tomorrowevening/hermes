import { PositionalAudio as Vn, EventDispatcher as un, Texture as dn, CubeTexture as Wn, RepeatWrapping as Kt, ShaderMaterial as hn, GLSL3 as Hn, DoubleSide as fn, Color as Tt, Mesh as qn, PlaneGeometry as Kn, FrontSide as Xn, BackSide as Zn, NoBlending as Jn, NormalBlending as Qn, AdditiveBlending as ea, SubtractiveBlending as ta, MultiplyBlending as na, CustomBlending as aa, AddEquation as ia, SubtractEquation as ra, ReverseSubtractEquation as sa, MinEquation as oa, MaxEquation as ca, ZeroFactor as pn, OneFactor as mn, SrcColorFactor as vn, OneMinusSrcColorFactor as gn, SrcAlphaFactor as bn, OneMinusSrcAlphaFactor as yn, DstAlphaFactor as En, OneMinusDstAlphaFactor as Cn, DstColorFactor as xn, OneMinusDstColorFactor as Sn, SrcAlphaSaturateFactor as la, ConstantColorFactor as wn, OneMinusConstantColorFactor as On, ConstantAlphaFactor as Mn, OneMinusConstantAlphaFactor as Tn, Matrix4 as ua, Vector3 as X, Euler as da, Ray as ha, Plane as fa, MathUtils as pa, MOUSE as Ve, TOUCH as We, Quaternion as Xt, Spherical as Zt, Vector2 as ue, PerspectiveCamera as zt, MeshDepthMaterial as ma, MeshNormalMaterial as va, MeshBasicMaterial as ga, OrthographicCamera as Rn, Scene as _n, Group as ba, AxesHelper as An, WebGLRenderer as ya, Raycaster as Ea, CameraHelper as Ca } from "three";
import { getProject as xa, createRafDriver as Sa } from "@theatre/core";
import at from "@theatre/studio";
import { Pane as wa } from "tweakpane";
import * as Oa from "@tweakpane/plugin-essentials";
import Pn, { useState as se, useRef as Ee, useEffect as Fe, Component as Ma, forwardRef as Ta } from "react";
import { Reorder as kn } from "framer-motion";
function lt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Pi(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function ki(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function Ra() {
  return Math.round(Math.random() * 1e6).toString();
}
function _a(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Aa(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), s = (u) => {
    const f = u.toString(16);
    return f.length === 1 ? "0" + f : f;
  }, o = s(n), p = s(a), c = s(e);
  return "#" + o + p + c;
}
function Ft(t, n = 1) {
  return Number(t.toFixed(n));
}
let Yt = 0;
const Pa = () => {
  Yt = 0;
}, jn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Yt}`, Yt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    jn(a);
  });
}, ji = (t) => {
  t?.dispose();
}, ka = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, Dn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n instanceof Vn ? (n.pause(), n.parent && n.parent.remove(n)) : Dn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), ka(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Di {
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
      this.components.forEach((a) => {
        a.handleEditorApp();
      }), n();
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
const k = new un(), j = {
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
  // Runs only in-editor
  handleEditorApp() {
  }
}
class Ii extends Rt {
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
const In = () => {
};
let ge;
class ot extends Rt {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  static rafDriver = null;
  init(n, a) {
    return this.project = xa(n, a), this.project.ready;
  }
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
  sheetObject(n, a, e, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const o = this.sheet(n);
    if (o === void 0)
      return;
    const p = `${n}_${a}`;
    let c = this.sheetObjects.get(p);
    c !== void 0 ? c = o.object(a, { ...e, ...c.value }, { reconfigure: !0 }) : c = o.object(a, e), this.sheetObjects.set(p, c), this.sheetObjectCBs.set(p, s !== void 0 ? s : In);
    const u = c.onValuesChange((f) => {
      if (this.app.editor) {
        for (const b in f) {
          const E = f[b];
          typeof E == "object" && _a(E) && (f[b] = {
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
            values: f
          }
        });
      }
      const v = this.sheetObjectCBs.get(p);
      v !== void 0 && v(f);
    });
    return this.sheetObjectUnsubscribe.set(p, u), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, e = n.address.objectKey;
    this.sheets.get(a)?.detachObject(e);
    const o = `${a}_${e}`, p = this.sheetObjectUnsubscribe.get(o);
    p !== void 0 && (this.sheetObjects.delete(o), this.sheetObjectCBs.delete(o), this.sheetObjectUnsubscribe.delete(o), p());
  }
  // Remote Controller
  // Receives App events
  handleApp(n) {
    let a;
    switch (n.event) {
      case "setSheet":
        a = this.sheets.get(n.data.sheet), a !== void 0 && (ge = a, at.setSelection([a]));
        break;
      case "setSheetObject":
        a = this.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), a !== void 0 && at.setSelection([a]);
        break;
      case "updateSheetObject":
        a = this.sheets.get(n.data.sheet), a !== void 0 && a.sequence.pause(), a = this.sheetObjectCBs.get(n.data.sheetObject), a !== void 0 && a(n.data.values);
        break;
      case "updateTimeline":
        a = this.sheets.get(n.data.sheet), ge !== void 0 && (ge.sequence.position = n.data.position);
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
  // Runs only in-editor
  handleEditorApp() {
    if (this.app.editor) {
      at.ui.restore(), at.onSelectionChange((s) => {
        s.length < 1 || s.forEach((o) => {
          let p = o.address.sheetId, c = "setSheet", u = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              c = "setSheet", u = {
                sheet: o.address.sheetId
              }, ge = this.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              c = "setSheetObject", p += `_${o.address.objectKey}`, u = {
                id: p,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, ge = this.sheets.get(o.address.sheetId);
              break;
          }
          this.app.send({ event: c, target: "app", data: u });
        });
      });
      let n = -1;
      const a = () => {
        if (ot.getRafDriver().tick(performance.now()), ge !== void 0 && n !== ge.sequence.position) {
          n = ge.sequence.position;
          const s = ge;
          this.app.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: n,
              sheet: s.address.sheetId
            }
          });
        }
      }, e = () => {
        a(), requestAnimationFrame(e);
      };
      a(), e();
    } else
      at.ui.hide();
  }
  static getRafDriver() {
    return ot.rafDriver || (ot.rafDriver = Sa()), ot.rafDriver;
  }
}
function ja(t) {
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
function Ln(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(Ln(a));
  }), n;
}
function Da(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Ia(t) {
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
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Ia(a))
      continue;
    const e = typeof t[a], s = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = s;
        break;
      case "object":
        if (s !== null)
          if (n[a] = s, s.isTexture)
            if (s instanceof dn) {
              const o = s.source.toJSON();
              n[a] = { src: o.url };
            } else
              s instanceof Wn && (console.log("env map"), console.log(s.source.data), console.log(s.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Da(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Bt(t) {
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
      const s = [];
      e.material.forEach((o) => {
        s.push(He(o));
      }), n.material = s;
    } else
      n.material = He(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const s = [];
      e.material.forEach((o) => {
        s.push(He(o));
      }), n.material = s;
    } else
      n.material = He(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const s = [];
      e.material.forEach((o) => {
        s.push(He(o));
      }), n.material = s;
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
function La(t, n) {
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
function Gt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const s = new dn(e);
      s.wrapS = Kt, s.wrapT = Kt, s.needsUpdate = !0, n(s);
    }, e.onerror = a, e.src = t;
  });
}
class Li extends Rt {
  scene = void 0;
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = Bt(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: a
    });
  }
  requestMethod(n, a, e, s) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e,
        subitem: s
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
    Pa(), jn(this.scene);
    const a = Ln(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Bt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Bt(n);
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
class Ni extends Rt {
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
    this.pane = new wa({ title: "GUI" }), this.pane.registerPlugin(Oa);
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
  bind(n, a, e, s = void 0) {
    const o = this.bindID, p = e.onChange !== void 0 ? e.onChange : In;
    this.bindCBs.set(o, p), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(n, a, e).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: o,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: o,
        name: a,
        params: e,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, a) {
    const e = this.bindCBs.get(n);
    e !== void 0 ? e(a) : console.warn(`No callback for: ${n}`, a);
  }
  // Buttons
  button(n, a, e = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, a), this.app.editor ? (this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addButton({ title: n }).on("click", () => {
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
var Vt = { exports: {} }, it = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jt;
function Na() {
  if (Jt)
    return it;
  Jt = 1;
  var t = Pn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(c, u, f) {
    var v, b = {}, E = null, x = null;
    f !== void 0 && (E = "" + f), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (v in u)
      e.call(u, v) && !o.hasOwnProperty(v) && (b[v] = u[v]);
    if (c && c.defaultProps)
      for (v in u = c.defaultProps, u)
        b[v] === void 0 && (b[v] = u[v]);
    return { $$typeof: n, type: c, key: E, ref: x, props: b, _owner: s.current };
  }
  return it.Fragment = a, it.jsx = p, it.jsxs = p, it;
}
var rt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qt;
function Fa() {
  return Qt || (Qt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Pn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), M = Symbol.iterator, P = "@@iterator";
    function W(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = M && i[M] || i[P];
      return typeof h == "function" ? h : null;
    }
    var B = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(i) {
      {
        for (var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), C = 1; C < h; C++)
          g[C - 1] = arguments[C];
        z("error", i, g);
      }
    }
    function z(i, h, g) {
      {
        var C = B.ReactDebugCurrentFrame, D = C.getStackAddendum();
        D !== "" && (h += "%s", g = g.concat([D]));
        var F = g.map(function(A) {
          return String(A);
        });
        F.unshift("Warning: " + h), Function.prototype.apply.call(console[i], console, F);
      }
    }
    var Ce = !1, le = !1, oe = !1, d = !1, m = !1, w;
    w = Symbol.for("react.module.reference");
    function _(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === o || m || i === s || i === f || i === v || d || i === x || Ce || le || oe || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === b || i.$$typeof === p || i.$$typeof === c || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === w || i.getModuleId !== void 0));
    }
    function Y(i, h, g) {
      var C = i.displayName;
      if (C)
        return C;
      var D = h.displayName || h.name || "";
      return D !== "" ? g + "(" + D + ")" : g;
    }
    function U(i) {
      return i.displayName || "Context";
    }
    function $(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case o:
          return "Profiler";
        case s:
          return "StrictMode";
        case f:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case c:
            var h = i;
            return U(h) + ".Consumer";
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
    var I = Object.assign, H = 0, q, T, N, J, me, xe, ht;
    function Ke() {
    }
    Ke.__reactDisabledLog = !0;
    function At() {
      {
        if (H === 0) {
          q = console.log, T = console.info, N = console.warn, J = console.error, me = console.group, xe = console.groupCollapsed, ht = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Ke,
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
        H++;
      }
    }
    function Pt() {
      {
        if (H--, H === 0) {
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
              value: xe
            }),
            groupEnd: I({}, i, {
              value: ht
            })
          });
        }
        H < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Xe = B.ReactCurrentDispatcher, Ze;
    function $e(i, h, g) {
      {
        if (Ze === void 0)
          try {
            throw Error();
          } catch (D) {
            var C = D.stack.trim().match(/\n( *(at )?)/);
            Ze = C && C[1] || "";
          }
        return `
` + Ze + i;
      }
    }
    var ze = !1, Oe;
    {
      var ft = typeof WeakMap == "function" ? WeakMap : Map;
      Oe = new ft();
    }
    function pt(i, h) {
      if (!i || ze)
        return "";
      {
        var g = Oe.get(i);
        if (g !== void 0)
          return g;
      }
      var C;
      ze = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = Xe.current, Xe.current = null, At();
      try {
        if (h) {
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
        ze = !1, Xe.current = F, Pt(), Error.prepareStackTrace = D;
      }
      var Ge = i ? i.displayName || i.name : "", qt = Ge ? $e(Ge) : "";
      return typeof i == "function" && Oe.set(i, qt), qt;
    }
    function kt(i, h, g) {
      return pt(i, !1);
    }
    function mt(i) {
      var h = i.prototype;
      return !!(h && h.isReactComponent);
    }
    function Me(i, h, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return pt(i, mt(i));
      if (typeof i == "string")
        return $e(i);
      switch (i) {
        case f:
          return $e("Suspense");
        case v:
          return $e("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case u:
            return kt(i.render);
          case b:
            return Me(i.type, h, g);
          case E: {
            var C = i, D = C._payload, F = C._init;
            try {
              return Me(F(D), h, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Te = Object.prototype.hasOwnProperty, vt = {}, gt = B.ReactDebugCurrentFrame;
    function Re(i) {
      if (i) {
        var h = i._owner, g = Me(i.type, i._source, h ? h.type : null);
        gt.setExtraStackFrame(g);
      } else
        gt.setExtraStackFrame(null);
    }
    function Je(i, h, g, C, D) {
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
              R = i[A](h, A, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              R = Z;
            }
            R && !(R instanceof Error) && (Re(D), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, A, typeof R), Re(null)), R instanceof Error && !(R.message in vt) && (vt[R.message] = !0, Re(D), S("Failed %s type: %s", g, R.message), Re(null));
          }
      }
    }
    var _e = Array.isArray;
    function Qe(i) {
      return _e(i);
    }
    function jt(i) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, g = h && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function bt(i) {
      try {
        return yt(i), !1;
      } catch {
        return !0;
      }
    }
    function yt(i) {
      return "" + i;
    }
    function Et(i) {
      if (bt(i))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jt(i)), yt(i);
    }
    var Se = B.ReactCurrentOwner, et = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, tt, Ct, Ye;
    Ye = {};
    function Dt(i) {
      if (Te.call(i, "ref")) {
        var h = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function It(i) {
      if (Te.call(i, "key")) {
        var h = Object.getOwnPropertyDescriptor(i, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function xt(i, h) {
      if (typeof i.ref == "string" && Se.current && h && Se.current.stateNode !== h) {
        var g = $(Se.current.type);
        Ye[g] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(Se.current.type), i.ref), Ye[g] = !0);
      }
    }
    function we(i, h) {
      {
        var g = function() {
          tt || (tt = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Ht(i, h) {
      {
        var g = function() {
          Ct || (Ct = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var r = function(i, h, g, C, D, F, A) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: h,
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
    function y(i, h, g, C, D) {
      {
        var F, A = {}, R = null, ce = null;
        g !== void 0 && (Et(g), R = "" + g), It(h) && (Et(h.key), R = "" + h.key), Dt(h) && (ce = h.ref, xt(h, D));
        for (F in h)
          Te.call(h, F) && !et.hasOwnProperty(F) && (A[F] = h[F]);
        if (i && i.defaultProps) {
          var Z = i.defaultProps;
          for (F in Z)
            A[F] === void 0 && (A[F] = Z[F]);
        }
        if (R || ce) {
          var Q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          R && we(A, Q), ce && Ht(A, Q);
        }
        return r(i, R, ce, D, C, Se.current, A);
      }
    }
    var O = B.ReactCurrentOwner, L = B.ReactDebugCurrentFrame;
    function K(i) {
      if (i) {
        var h = i._owner, g = Me(i.type, i._source, h ? h.type : null);
        L.setExtraStackFrame(g);
      } else
        L.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function ae(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function Lt() {
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
    function Nt(i) {
      {
        if (i !== void 0) {
          var h = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + h + ":" + g + ".";
        }
        return "";
      }
    }
    var nt = {};
    function pe(i) {
      {
        var h = Lt();
        if (!h) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (h = `

Check the top-level render call using <` + g + ">.");
        }
        return h;
      }
    }
    function he(i, h) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = pe(h);
        if (nt[g])
          return;
        nt[g] = !0;
        var C = "";
        i && i._owner && i._owner !== O.current && (C = " It was passed a child from " + $(i._owner.type) + "."), K(i), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), K(null);
      }
    }
    function Ae(i, h) {
      {
        if (typeof i != "object")
          return;
        if (Qe(i))
          for (var g = 0; g < i.length; g++) {
            var C = i[g];
            ae(C) && he(C, h);
          }
        else if (ae(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var D = W(i);
          if (typeof D == "function" && D !== i.entries)
            for (var F = D.call(i), A; !(A = F.next()).done; )
              ae(A.value) && he(A.value, h);
        }
      }
    }
    function Pe(i) {
      {
        var h = i.type;
        if (h == null || typeof h == "string")
          return;
        var g;
        if (typeof h == "function")
          g = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === b))
          g = h.propTypes;
        else
          return;
        if (g) {
          var C = $(h);
          Je(g, i.props, "prop", C, i);
        } else if (h.PropTypes !== void 0 && !de) {
          de = !0;
          var D = $(h);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(i) {
      {
        for (var h = Object.keys(i.props), g = 0; g < h.length; g++) {
          var C = h[g];
          if (C !== "children" && C !== "key") {
            K(i), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), K(null);
            break;
          }
        }
        i.ref !== null && (K(i), S("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function je(i, h, g, C, D, F) {
      {
        var A = _(i);
        if (!A) {
          var R = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Nt(D);
          ce ? R += ce : R += Lt();
          var Z;
          i === null ? Z = "null" : Qe(i) ? Z = "array" : i !== void 0 && i.$$typeof === n ? (Z = "<" + ($(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof i, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
        }
        var Q = y(i, h, g, D, F);
        if (Q == null)
          return Q;
        if (A) {
          var fe = h.children;
          if (fe !== void 0)
            if (C)
              if (Qe(fe)) {
                for (var Ge = 0; Ge < fe.length; Ge++)
                  Ae(fe[Ge], i);
                Object.freeze && Object.freeze(fe);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ae(fe, i);
        }
        return i === e ? ke(Q) : Pe(Q), Q;
      }
    }
    function $n(i, h, g) {
      return je(i, h, g, !0);
    }
    function zn(i, h, g) {
      return je(i, h, g, !1);
    }
    var Yn = zn, Gn = $n;
    rt.Fragment = e, rt.jsx = Yn, rt.jsxs = Gn;
  }()), rt;
}
process.env.NODE_ENV === "production" ? Vt.exports = Na() : Vt.exports = Fa();
var l = Vt.exports;
function Nn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const Ba = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ua = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function $a(t) {
  return /* @__PURE__ */ l.jsx(kn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ua,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ba })
  ] }) }, t.title);
}
function za(t) {
  const [n, a] = se(!1), [e, s] = se(t.options), o = (f) => {
    t.onDragComplete(f), s(f);
  }, p = (f) => {
    const v = [...e];
    v.splice(f, 1), o(v);
  }, c = [];
  e.forEach((f, v) => {
    c.push(/* @__PURE__ */ l.jsx($a, { index: v, title: f, onDelete: p }, f));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Nn, { title: t.title }),
    /* @__PURE__ */ l.jsx(kn.Group, { axis: "y", values: e, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Ya(t) {
  const [n, a] = se(!1), e = [];
  t.options.map((o, p) => {
    t.onSelect !== void 0 && (o.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Ga, { option: o }, p));
  });
  let s = "dropdown";
  return t.subdropdown && (s += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: s,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Nn, { title: t.title }),
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
function Ga(t) {
  const { option: n } = t, [a, e] = se("");
  let s;
  switch (n.type) {
    case "draggable":
      s = /* @__PURE__ */ l.jsx(
        za,
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
      s = /* @__PURE__ */ l.jsx(
        Ya,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      s = /* @__PURE__ */ l.jsx(
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: s }, Ra());
}
function Fi(t) {
  function n(e) {
    switch (t.components.forEach((s) => {
      s.handleApp(e);
    }), e.event) {
      case "custom":
        k.dispatchEvent({ type: j.CUSTOM, value: e.data });
        break;
    }
  }
  function a(e) {
    switch (t.components.forEach((s) => {
      s.handleEditor(e);
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
const Va = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Wa = `out vec4 fragColor;
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
class Ha extends hn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Hn,
      side: fn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new Tt(16777215)
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
      vertexShader: Va,
      fragmentShader: Wa,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class qa extends qn {
  gridMaterial;
  constructor() {
    const n = new Ha();
    super(new Kn(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ka = `#include <common>
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
}`, Xa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Za extends hn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ka,
      fragmentShader: Xa
    });
  }
}
function Wt(t) {
  const [n, a] = se(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const s = !n;
          t.onToggle !== void 0 && t.onToggle(s), a(s);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: lt(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function Fn(t) {
  const [n, a] = se(!1), e = t.child.children.length > 0, s = [];
  return t.child.children.length > 0 && t.child.children.map((o) => {
    s.push(/* @__PURE__ */ l.jsx(Fn, { child: o, three: t.three }, Math.random()));
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
            t.three.getObject(t.child.uuid), n || a(!0);
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${ja(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: s }) })
  ] }, Math.random());
}
function Ja(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Fn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Qa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function ei(t) {
  return "items" in t;
}
function Be(t) {
  const n = [];
  return t.items.forEach((a) => {
    ei(a) ? n.push(
      /* @__PURE__ */ l.jsx(Be, { title: lt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        ct,
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
          onChange: (e, s) => {
            a.onChange !== void 0 && a.onChange(e, s);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Wt, { label: t.title, open: t.expanded === !0, children: n });
}
function ti(t) {
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
function ni(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function ai() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], s = new FileReader();
        s.onload = function(o) {
          n(o.target.result);
        }, s.readAsDataURL(e);
      }
    }), t.click();
  });
}
const ii = [
  {
    title: "Front",
    value: Xn
  },
  {
    title: "Back",
    value: Zn
  },
  {
    title: "Double",
    value: fn
  }
], ri = [
  {
    title: "No Blending",
    value: Jn
  },
  {
    title: "Normal",
    value: Qn
  },
  {
    title: "Additive",
    value: ea
  },
  {
    title: "Subtractive",
    value: ta
  },
  {
    title: "Multiply",
    value: na
  },
  {
    title: "Custom",
    value: aa
  }
], si = [
  {
    title: "Add",
    value: ia
  },
  {
    title: "Subtract",
    value: ra
  },
  {
    title: "Reverse Subtract",
    value: sa
  },
  {
    title: "Min",
    value: oa
  },
  {
    title: "Max",
    value: ca
  }
], oi = [
  {
    title: "Zero",
    valye: pn
  },
  {
    title: "One",
    valye: mn
  },
  {
    title: "Src Color",
    valye: vn
  },
  {
    title: "One Minus Src Color",
    valye: gn
  },
  {
    title: "Src Alpha",
    valye: bn
  },
  {
    title: "One Minus Src Alpha",
    valye: yn
  },
  {
    title: "Dst Alpha",
    valye: En
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
  },
  {
    title: "Dst Color",
    valye: xn
  },
  {
    title: "One Minus Dst Color",
    valye: Sn
  },
  {
    title: "Src Alpha Saturate",
    valye: la
  },
  {
    title: "Constant Color",
    valye: wn
  },
  {
    title: "One Minus Constant Color",
    valye: On
  },
  {
    title: "Constant Alpha",
    valye: Mn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Tn
  }
], ci = [
  {
    title: "Zero",
    valye: pn
  },
  {
    title: "One",
    valye: mn
  },
  {
    title: "Src Color",
    valye: vn
  },
  {
    title: "One Minus Src Color",
    valye: gn
  },
  {
    title: "Src Alpha",
    valye: bn
  },
  {
    title: "One Minus Src Alpha",
    valye: yn
  },
  {
    title: "Dst Alpha",
    valye: En
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
  },
  {
    title: "Dst Color",
    valye: xn
  },
  {
    title: "One Minus Dst Color",
    valye: Sn
  },
  {
    title: "Constant Color",
    valye: wn
  },
  {
    title: "One Minus Constant Color",
    valye: On
  },
  {
    title: "Constant Alpha",
    valye: Mn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Tn
  }
];
function st(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function en(t, n, a) {
  const e = [];
  for (const s in t) {
    if (!ti(s))
      continue;
    const o = typeof t[s], p = t[s];
    if (o === "boolean" || o === "number" || o === "string") {
      const c = {
        title: De(s),
        prop: s,
        type: o,
        value: p,
        min: void 0,
        max: void 0,
        needsUpdate: o === "boolean",
        onChange: (f, v) => {
          a.updateObject(n.uuid, `material.${f}`, v), c.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${f}`, v);
        }
      };
      switch (s) {
        case "blending":
          st(c, ri);
          break;
        case "blendDst":
          st(c, ci);
          break;
        case "blendEquation":
          st(c, si);
          break;
        case "blendSrc":
          st(c, oi);
          break;
        case "side":
          st(c, ii);
          break;
      }
      ni(s) && (c.value = Number(p), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const u = o === "string" && (s === "vertexShader" || s === "fragmentShader");
      u && (c.disabled = !1, c.latest = c.value, c.onChange = (f, v) => {
        c.latest = v;
      }), e.push(c), u && e.push({
        title: `${lt(s)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${s}`, c.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const f = a.scene?.getObjectByProperty("uuid", n.uuid);
          f !== void 0 && (ee(f, `material.${s}`, c.latest), f.material.needsUpdate = !0);
        }
      });
    } else if (o === "object")
      if (p.isColor)
        e.push({
          title: De(s),
          prop: s,
          type: "color",
          value: p,
          onChange: (c, u) => {
            const f = new Tt(u);
            a.updateObject(n.uuid, `material.${c}`, f);
            const v = a.scene?.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && ee(v, `material.${c}`, f);
          }
        });
      else if (Array.isArray(p)) {
        const c = [];
        for (const u in p)
          c.push({
            title: `${u}`,
            type: `${typeof p[u]}`,
            value: p[u],
            onChange: (f, v) => {
              a.updateObject(n.uuid, `material.${s}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${s}`, v);
            }
          });
        e.push({
          title: De(s),
          items: c
        });
      } else {
        const c = [];
        for (const u in p) {
          const f = p[u];
          switch (typeof f) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: De(s),
                type: "image",
                value: f,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${s}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && Gt(E).then((M) => {
                    ee(x, `material.${s}`, M), ee(x, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${De(u)}`,
                prop: `material.${s}.${u}`,
                type: `${typeof t[s][u]}`,
                value: p[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${s}.${u}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && ee(x, `material.${s}.${u}`, E);
                }
              });
              break;
            case "object":
              if (f.value !== void 0 && f.value.src !== void 0)
                c.push({
                  title: De(u),
                  type: "image",
                  value: f.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${s}.${u}.value`, p);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && Gt(E).then((M) => {
                      ee(x, `material.${s}.${u}.value`, M);
                    });
                  }
                });
              else if (s === "uniforms") {
                const b = f.value, E = (x, M, P) => ({
                  title: x,
                  type: "number",
                  value: P,
                  step: 0.01,
                  onChange: (W, B) => {
                    const S = `material.uniforms.${u}.value.${M}`;
                    a.updateObject(n.uuid, S, B);
                    const z = a.scene?.getObjectByProperty("uuid", n.uuid);
                    z !== void 0 && ee(z, S, B);
                  }
                });
                if (typeof f.value == "number")
                  c.push({
                    title: u,
                    type: "number",
                    value: f.value,
                    onChange: (x, M) => {
                      const P = `material.${s}.${x}.value`;
                      a.updateObject(n.uuid, P, M);
                      const W = a.scene?.getObjectByProperty("uuid", n.uuid);
                      W !== void 0 && ee(W, P, M);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  c.push({
                    title: u,
                    type: "color",
                    value: f.value,
                    onChange: (x, M) => {
                      const P = new Tt(M), W = `material.${s}.${x}.value`;
                      a.updateObject(n.uuid, W, P);
                      const B = a.scene?.getObjectByProperty("uuid", n.uuid);
                      B !== void 0 && ee(B, W, P);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", f.value.x),
                        E("Y", "y", f.value.y)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", f.value.x),
                        E("Y", "y", f.value.y),
                        E("Z", "z", f.value.z)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w !== void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", f.value.x),
                        E("Y", "y", f.value.y),
                        E("Z", "z", f.value.z),
                        E("W", "w", f.value.w)
                      ]
                    }
                  );
                else if (b.elements !== void 0) {
                  const x = b.elements, M = [];
                  for (let P = 0; P < x.length; P++)
                    M.push(E(P.toString(), P.toString(), x[P]));
                  c.push(
                    {
                      title: u,
                      items: M
                    }
                  );
                } else
                  console.log(">>> need to add this format:", u, b);
              } else
                c.push({
                  title: u,
                  type: `${typeof f.value}`,
                  value: f.value,
                  onChange: (b, E) => {
                    a.updateObject(n.uuid, `material.${s}.${u}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && ee(x, `material.${s}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: De(s),
          items: c
        });
      }
    else
      p !== void 0 && console.log("other:", s, o, p);
  }
  return e.sort((s, o) => s.title < o.title ? -1 : s.title > o.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function li(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], s = a.length;
    for (let o = 0; o < s; o++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Be,
          {
            title: `Material ${o}`,
            items: en(a[o], t, n)
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
        items: en(a, t, n)
      }
    );
}
function ct(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Aa(t.value));
  const [a, e] = se(n), s = Ee(null), o = Ee(null), p = Ee(null);
  Fe(() => {
    let v = !1, b = -1, E = 0, x = Number(a);
    const M = (z) => {
      v = !0, E = x, b = z.clientX;
    }, P = (z) => {
      if (!v)
        return;
      const Ce = t.step !== void 0 ? t.step : 1, le = (z.clientX - b) * Ce;
      x = Number((E + le).toFixed(4)), o.current !== null && (o.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, W = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, S = t.type === "number";
    return S && (s.current?.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", W, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", B, !1)), () => {
      S && (s.current?.removeEventListener("mousedown", M), document.removeEventListener("mouseup", W), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = c || t.type === "image", f = (v) => {
    let b = v.target.value;
    t.type === "boolean" ? b = v.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: s, children: lt(t.title) }, "fieldLabel"),
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
        disabled: t.disabled,
        onChange: f
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: f, disabled: t.disabled, className: "min" }),
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
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: f, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: f, disabled: t.disabled })
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
      ai().then((v) => {
        p.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : Qa }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: f, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((v, b) => /* @__PURE__ */ l.jsx("option", { value: v.value, children: lt(v.title) }, b)) }) })
  ] });
}
function tn(t) {
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
function ui(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: tn(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (s, o) => {
          n.updateObject(t.uuid, s, o), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, s, o), p.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: tn(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (s, o) => {
          n.updateObject(t.uuid, s, o), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, s, o), p.updateProjectionMatrix());
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
const di = Math.PI / 180, hi = 180 / Math.PI;
function qe(t, n, a, e, s) {
  return e + (t - n) * (s - e) / (a - n);
}
function fi(t) {
  return t * di;
}
function Ut(t) {
  return t * hi;
}
function pi(t, n) {
  const a = new ua();
  a.elements = t.matrix;
  const e = new X(), s = new da(), o = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), s.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const p = (u, f) => {
    n.updateObject(t.uuid, u, f);
    const v = n.scene?.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && ee(v, u, f);
  }, c = (u, f) => {
    p(u, fi(f));
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
          value: Ft(Ut(s.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Ft(Ut(s.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Ft(Ut(s.z)),
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
          onChange: p
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: o.y,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: o.z,
          step: 0.01,
          onChange: p
        }
      ]
    }
  );
}
function nn(t) {
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
function mi(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const s = t.lightInfo[e];
      s !== void 0 && (s.isColor !== void 0 ? a.push({
        title: nn(e),
        prop: e,
        type: "color",
        value: s,
        onChange: (o, p) => {
          const c = new Tt(p);
          n.updateObject(t.uuid, o, c);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && ee(u, o, c);
        }
      }) : a.push({
        title: nn(e),
        prop: e,
        type: typeof s,
        value: s,
        step: typeof s == "number" ? 0.01 : void 0,
        onChange: (o, p) => {
          n.updateObject(t.uuid, o, p);
          const c = n.scene?.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && ee(c, o, p);
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
function vi(t, n) {
  const a = [], e = [];
  let s = 0;
  t.animations.forEach((c) => {
    s = Math.max(s, c.duration), c.duration > 0 && e.push({
      title: c.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: c.duration,
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
  const o = n.scene?.getObjectByProperty("uuid", t.uuid);
  let p = !1;
  if (o !== void 0) {
    const c = o.mixer;
    if (p = c !== void 0, p) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: c.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (f, v) => {
            c.timeScale = v, n.updateObject(t.uuid, "mixer.timeScale", v);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          c.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: u
      });
    }
  }
  return /* @__PURE__ */ l.jsx(Be, { title: "Animation", items: a });
}
const Bn = {
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
let te = { ...Bn };
function gi(t) {
  const [n, a] = se(-1);
  Fe(() => {
    function p(u) {
      te = { ...u.value }, a(Date.now());
    }
    function c() {
      te = { ...Bn }, a(Date.now());
    }
    return k.addEventListener(j.SET_SCENE, c), k.addEventListener(j.SET_OBJECT, p), () => {
      k.removeEventListener(j.SET_SCENE, c), k.removeEventListener(j.SET_OBJECT, p);
    };
  }, []);
  const e = te.type.toLowerCase(), s = te.animations.length > 0 || te.mixer !== void 0, o = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Wt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: te.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: te.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: te.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: te.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: te.visible,
          onChange: (p, c) => {
            t.three.updateObject(te.uuid, p, c);
            const u = t.three.scene?.getObjectByProperty("uuid", te.uuid);
            u !== void 0 && ee(u, p, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      pi(te, t.three),
      s ? vi(te, t.three) : null,
      e.search("camera") > -1 ? ui(te, t.three) : null,
      e.search("light") > -1 ? mi(te, t.three) : null,
      o ? li(te, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class Bi extends Ma {
  three;
  constructor(n) {
    super(n), this.state = {
      scene: n.scene !== void 0 ? n.scene : null
    }, this.three = n.three, k.addEventListener(j.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    k.removeEventListener(j.SET_SCENE, this.setScene);
  }
  render() {
    const n = this.componentState.scene !== null, a = "Hierarchy - " + (n ? `${this.componentState.scene?.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(Wt, { label: a, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: n && /* @__PURE__ */ l.jsx(Ja, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(gi, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Private
  setScene = (n) => {
    this.setState(() => ({
      scene: n.value
    }));
  };
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Ui(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (c) => {
    if (!n())
      return;
    const u = t.three.scene?.getObjectByProperty("uuid", c.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (c, u, f) => {
    if (!n())
      return;
    const v = t.three.scene?.getObjectByProperty("uuid", c);
    v !== void 0 && ee(v, u, f);
  }, s = (c) => {
    if (!n())
      return;
    const u = c.value, { key: f, value: v, uuid: b } = u;
    e(b, f, v);
  }, o = (c) => {
    if (!n())
      return;
    const u = c.value;
    Gt(u.value).then((f) => {
      e(u.uuid, u.key, f), e(u.uuid, "material.needsUpdate", !0);
    });
  }, p = (c) => {
    if (!n())
      return;
    const { key: u, uuid: f, value: v, subitem: b } = c.value, E = t.three.scene?.getObjectByProperty("uuid", f);
    if (E !== void 0)
      try {
        b !== void 0 ? La(E, b)[u](v) : E[u](v);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(v);
      }
  };
  return Fe(() => (k.addEventListener(j.GET_OBJECT, a), k.addEventListener(j.UPDATE_OBJECT, s), k.addEventListener(j.CREATE_TEXTURE, o), k.addEventListener(j.REQUEST_METHOD, p), () => {
    k.removeEventListener(j.GET_OBJECT, a), k.removeEventListener(j.UPDATE_OBJECT, s), k.removeEventListener(j.CREATE_TEXTURE, o), k.removeEventListener(j.REQUEST_METHOD, p);
  }), []), null;
}
const an = { type: "change" }, $t = { type: "start" }, rn = { type: "end" }, St = new ha(), sn = new fa(), bi = Math.cos(70 * pa.DEG2RAD);
class yi extends un {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ve.ROTATE, MIDDLE: Ve.DOLLY, RIGHT: Ve.PAN }, this.touches = { ONE: We.ROTATE, TWO: We.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(r) {
      r.addEventListener("keydown", et), this._domElementKeyEvents = r;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", et), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(an), e.update(), o = s.NONE;
    }, this.update = function() {
      const r = new X(), y = new Xt().setFromUnitVectors(n.up, new X(0, 1, 0)), O = y.clone().invert(), L = new X(), K = new Xt(), de = new X(), ae = 2 * Math.PI;
      return function(Nt = null) {
        const nt = e.object.position;
        r.copy(nt).sub(e.target), r.applyQuaternion(y), c.setFromVector3(r), e.autoRotate && o === s.NONE && U(_(Nt)), e.enableDamping ? (c.theta += u.theta * e.dampingFactor, c.phi += u.phi * e.dampingFactor) : (c.theta += u.theta, c.phi += u.phi);
        let pe = e.minAzimuthAngle, he = e.maxAzimuthAngle;
        isFinite(pe) && isFinite(he) && (pe < -Math.PI ? pe += ae : pe > Math.PI && (pe -= ae), he < -Math.PI ? he += ae : he > Math.PI && (he -= ae), pe <= he ? c.theta = Math.max(pe, Math.min(he, c.theta)) : c.theta = c.theta > (pe + he) / 2 ? Math.max(pe, c.theta) : Math.min(he, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && oe || e.object.isOrthographicCamera ? c.radius = me(c.radius) : c.radius = me(c.radius * f), r.setFromSpherical(c), r.applyQuaternion(O), nt.copy(e.target).add(r), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), v.set(0, 0, 0));
        let Ae = !1;
        if (e.zoomToCursor && oe) {
          let Pe = null;
          if (e.object.isPerspectiveCamera) {
            const ke = r.length();
            Pe = me(ke * f);
            const je = ke - Pe;
            e.object.position.addScaledVector(Ce, je), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const ke = new X(le.x, le.y, 0);
            ke.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), Ae = !0;
            const je = new X(le.x, le.y, 0);
            je.unproject(e.object), e.object.position.sub(je).add(ke), e.object.updateMatrixWorld(), Pe = r.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Pe !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Pe).add(e.object.position) : (St.origin.copy(e.object.position), St.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(St.direction)) < bi ? n.lookAt(e.target) : (sn.setFromNormalAndCoplanarPoint(e.object.up, e.target), St.intersectPlane(sn, e.target))));
        } else
          e.object.isOrthographicCamera && (Ae = f !== 1, Ae && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix()));
        return f = 1, oe = !1, Ae || L.distanceToSquared(e.object.position) > p || 8 * (1 - K.dot(e.object.quaternion)) > p || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(an), L.copy(e.object.position), K.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ye), e.domElement.removeEventListener("pointerdown", Re), e.domElement.removeEventListener("pointercancel", _e), e.domElement.removeEventListener("wheel", bt), e.domElement.removeEventListener("pointermove", Je), e.domElement.removeEventListener("pointerup", _e), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", et), e._domElementKeyEvents = null);
    };
    const e = this, s = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let o = s.NONE;
    const p = 1e-6, c = new Zt(), u = new Zt();
    let f = 1;
    const v = new X(), b = new ue(), E = new ue(), x = new ue(), M = new ue(), P = new ue(), W = new ue(), B = new ue(), S = new ue(), z = new ue(), Ce = new X(), le = new ue();
    let oe = !1;
    const d = [], m = {};
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
    }(), H = function() {
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
          let ae = r.length();
          ae *= Math.tan(e.object.fov / 2 * Math.PI / 180), I(2 * O * ae / K.clientHeight, e.object.matrix), H(2 * L * ae / K.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (I(O * (e.object.right - e.object.left) / e.object.zoom / K.clientWidth, e.object.matrix), H(L * (e.object.top - e.object.bottom) / e.object.zoom / K.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function T(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function J(r, y) {
      if (!e.zoomToCursor)
        return;
      oe = !0;
      const O = e.domElement.getBoundingClientRect(), L = r - O.left, K = y - O.top, de = O.width, ae = O.height;
      le.x = L / de * 2 - 1, le.y = -(K / ae) * 2 + 1, Ce.set(le.x, le.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function me(r) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, r));
    }
    function xe(r) {
      b.set(r.clientX, r.clientY);
    }
    function ht(r) {
      J(r.clientX, r.clientX), B.set(r.clientX, r.clientY);
    }
    function Ke(r) {
      M.set(r.clientX, r.clientY);
    }
    function At(r) {
      E.set(r.clientX, r.clientY), x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E), e.update();
    }
    function Pt(r) {
      S.set(r.clientX, r.clientY), z.subVectors(S, B), z.y > 0 ? T(Y(z.y)) : z.y < 0 && N(Y(z.y)), B.copy(S), e.update();
    }
    function Xe(r) {
      P.set(r.clientX, r.clientY), W.subVectors(P, M).multiplyScalar(e.panSpeed), q(W.x, W.y), M.copy(P), e.update();
    }
    function Ze(r) {
      J(r.clientX, r.clientY), r.deltaY < 0 ? N(Y(r.deltaY)) : r.deltaY > 0 && T(Y(r.deltaY)), e.update();
    }
    function $e(r) {
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
    function ze(r) {
      if (d.length === 1)
        b.set(r.pageX, r.pageY);
      else {
        const y = we(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        b.set(O, L);
      }
    }
    function Oe(r) {
      if (d.length === 1)
        M.set(r.pageX, r.pageY);
      else {
        const y = we(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        M.set(O, L);
      }
    }
    function ft(r) {
      const y = we(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      B.set(0, K);
    }
    function pt(r) {
      e.enableZoom && ft(r), e.enablePan && Oe(r);
    }
    function kt(r) {
      e.enableZoom && ft(r), e.enableRotate && ze(r);
    }
    function mt(r) {
      if (d.length == 1)
        E.set(r.pageX, r.pageY);
      else {
        const O = we(r), L = 0.5 * (r.pageX + O.x), K = 0.5 * (r.pageY + O.y);
        E.set(L, K);
      }
      x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E);
    }
    function Me(r) {
      if (d.length === 1)
        P.set(r.pageX, r.pageY);
      else {
        const y = we(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        P.set(O, L);
      }
      W.subVectors(P, M).multiplyScalar(e.panSpeed), q(W.x, W.y), M.copy(P);
    }
    function Te(r) {
      const y = we(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      S.set(0, K), z.set(0, Math.pow(S.y / B.y, e.zoomSpeed)), T(z.y), B.copy(S);
      const de = (r.pageX + y.x) * 0.5, ae = (r.pageY + y.y) * 0.5;
      J(de, ae);
    }
    function vt(r) {
      e.enableZoom && Te(r), e.enablePan && Me(r);
    }
    function gt(r) {
      e.enableZoom && Te(r), e.enableRotate && mt(r);
    }
    function Re(r) {
      e.enabled !== !1 && (d.length === 0 && (e.domElement.setPointerCapture(r.pointerId), e.domElement.addEventListener("pointermove", Je), e.domElement.addEventListener("pointerup", _e)), Dt(r), r.pointerType === "touch" ? tt(r) : Qe(r));
    }
    function Je(r) {
      e.enabled !== !1 && (r.pointerType === "touch" ? Ct(r) : jt(r));
    }
    function _e(r) {
      switch (It(r), d.length) {
        case 0:
          e.domElement.releasePointerCapture(r.pointerId), e.domElement.removeEventListener("pointermove", Je), e.domElement.removeEventListener("pointerup", _e), e.dispatchEvent(rn), o = s.NONE;
          break;
        case 1:
          const y = d[0], O = m[y];
          tt({ pointerId: y, pageX: O.x, pageY: O.y });
          break;
      }
    }
    function Qe(r) {
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
        case Ve.DOLLY:
          if (e.enableZoom === !1)
            return;
          ht(r), o = s.DOLLY;
          break;
        case Ve.ROTATE:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enablePan === !1)
              return;
            Ke(r), o = s.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            xe(r), o = s.ROTATE;
          }
          break;
        case Ve.PAN:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enableRotate === !1)
              return;
            xe(r), o = s.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Ke(r), o = s.PAN;
          }
          break;
        default:
          o = s.NONE;
      }
      o !== s.NONE && e.dispatchEvent($t);
    }
    function jt(r) {
      switch (o) {
        case s.ROTATE:
          if (e.enableRotate === !1)
            return;
          At(r);
          break;
        case s.DOLLY:
          if (e.enableZoom === !1)
            return;
          Pt(r);
          break;
        case s.PAN:
          if (e.enablePan === !1)
            return;
          Xe(r);
          break;
      }
    }
    function bt(r) {
      e.enabled === !1 || e.enableZoom === !1 || o !== s.NONE || (r.preventDefault(), e.dispatchEvent($t), Ze(yt(r)), e.dispatchEvent(rn));
    }
    function yt(r) {
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
    function Et(r) {
      r.key === "Control" && (w = !0, e.domElement.getRootNode().addEventListener("keyup", Se, { passive: !0, capture: !0 }));
    }
    function Se(r) {
      r.key === "Control" && (w = !1, e.domElement.getRootNode().removeEventListener("keyup", Se, { passive: !0, capture: !0 }));
    }
    function et(r) {
      e.enabled === !1 || e.enablePan === !1 || $e(r);
    }
    function tt(r) {
      switch (xt(r), d.length) {
        case 1:
          switch (e.touches.ONE) {
            case We.ROTATE:
              if (e.enableRotate === !1)
                return;
              ze(r), o = s.TOUCH_ROTATE;
              break;
            case We.PAN:
              if (e.enablePan === !1)
                return;
              Oe(r), o = s.TOUCH_PAN;
              break;
            default:
              o = s.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case We.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              pt(r), o = s.TOUCH_DOLLY_PAN;
              break;
            case We.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              kt(r), o = s.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = s.NONE;
          }
          break;
        default:
          o = s.NONE;
      }
      o !== s.NONE && e.dispatchEvent($t);
    }
    function Ct(r) {
      switch (xt(r), o) {
        case s.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          mt(r), e.update();
          break;
        case s.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Me(r), e.update();
          break;
        case s.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          vt(r), e.update();
          break;
        case s.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          gt(r), e.update();
          break;
        default:
          o = s.NONE;
      }
    }
    function Ye(r) {
      e.enabled !== !1 && r.preventDefault();
    }
    function Dt(r) {
      d.push(r.pointerId);
    }
    function It(r) {
      delete m[r.pointerId];
      for (let y = 0; y < d.length; y++)
        if (d[y] == r.pointerId) {
          d.splice(y, 1);
          return;
        }
    }
    function xt(r) {
      let y = m[r.pointerId];
      y === void 0 && (y = new ue(), m[r.pointerId] = y), y.set(r.pageX, r.pageY);
    }
    function we(r) {
      const y = r.pointerId === d[0] ? d[1] : d[0];
      return m[y];
    }
    e.domElement.addEventListener("contextmenu", Ye), e.domElement.addEventListener("pointerdown", Re), e.domElement.addEventListener("pointercancel", _e), e.domElement.addEventListener("wheel", bt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", Et, { passive: !0, capture: !0 }), this.update();
  }
}
const Mt = (t) => {
  const [n, a] = se(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, s = (o) => {
    o !== n && (t.onSelect(o), a(o)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => s(o), children: o }, o)) })
  ] });
}, Ie = Ta(function(n, a) {
  const [e, s] = se(!1), o = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && s(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Mt,
      {
        index: o,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (p) => {
          s(p);
        },
        up: !0
      }
    )
  ] });
}), on = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ne = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), be = /* @__PURE__ */ new Map();
function Ue(t, n) {
  const a = new Rn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ne.set(t, a), a;
}
Ue("Top", new X(0, 1e3, 0));
Ue("Bottom", new X(0, -1e3, 0));
Ue("Left", new X(-1e3, 0, 0));
Ue("Right", new X(1e3, 0, 0));
Ue("Front", new X(0, 0, 1e3));
Ue("Back", new X(0, 0, -1e3));
Ue("Orthographic", new X(1e3, 1e3, 1e3));
const _t = new zt(60, 1, 50, 3e3);
_t.name = "Debug";
_t.position.set(500, 500, 500);
_t.lookAt(0, 0, 0);
ne.set("Debug", _t);
const cn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ei = new ma(), Ci = new va(), xi = new Za(), Si = new ga({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let wt = "Renderer";
const V = new _n();
V.name = "Debug Scene";
let ye = new _n();
V.add(ye);
const dt = new ba();
dt.name = "helpers";
V.add(dt);
const wi = new qa();
dt.add(wi);
const Un = new An(500);
Un.name = "axisHelper";
dt.add(Un);
const ut = new An(100);
ut.name = "interactionHelper";
dt.add(ut);
ut.visible = !1;
let Ot = !1, G = ne.get("Debug"), re = ne.get("Orthographic"), Le = ne.get("Front"), Ne = ne.get("Top"), ln = !1;
function $i(t) {
  const [n, a] = se(t.mode !== void 0 ? t.mode : "Single"), [e, s] = se(null), [o, p] = se(!1), [c, u] = se(!1), [f, v] = se(!1), [, b] = se(Date.now()), E = Ee(null), x = Ee(null), M = Ee(null), P = Ee(null), W = Ee(null), B = Ee(null), S = (d, m) => {
    const w = ie.get(d.name);
    w !== void 0 && w.dispose(), ie.delete(d.name);
    const _ = be.get(d.name);
    _ !== void 0 && (V.remove(_), _.dispose()), be.delete(d.name);
    const Y = new yi(d, m);
    switch (Y.enableDamping = !0, Y.dampingFactor = 0.05, d.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        Y.enableRotate = !1;
        break;
    }
    if (ie.set(d.name, Y), d instanceof zt) {
      const U = new Ca(d);
      be.set(d.name, U), V.add(U);
    }
  }, z = (d) => {
    const m = be.get(d.name);
    m !== void 0 && (V.remove(m), m.dispose(), be.delete(d.name));
    const w = ie.get(d.name);
    w !== void 0 && (w.dispose(), ie.delete(d.name));
  }, Ce = () => {
    ie.forEach((d, m) => {
      d.dispose();
      const w = be.get(m);
      w !== void 0 && (V.remove(w), w.dispose()), be.delete(m), ie.delete(m);
    }), ie.clear(), be.clear();
  }, le = () => {
    switch (n) {
      case "Single":
        S(G, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        S(G, M.current), S(re, P.current);
        break;
      case "Quad":
        S(G, M.current), S(re, P.current), S(Le, W.current), S(Ne, B.current);
        break;
    }
  };
  Fe(() => {
    const d = new ya({
      canvas: E.current,
      stencil: !1
    });
    d.autoClear = !1, d.shadowMap.enabled = !0, d.setPixelRatio(devicePixelRatio), d.setClearColor(0), s(d);
  }, []), Fe(() => {
    const d = (_) => {
      Dn(ye), V.remove(ye);
      const Y = t.scenes.get(_.value.name);
      if (Y !== void 0) {
        const U = new Y();
        t.onSceneSet !== void 0 && t.onSceneSet(U), ye = U, t.three.scene = ye, V.add(ye), ln = !0;
      }
    }, m = (_) => {
      const Y = _.value, U = t.three.scene?.getObjectByProperty("uuid", Y.uuid);
      U !== void 0 && ne.set(Y.name, U), b(Date.now());
    }, w = (_) => {
      ne.delete(_.value.name), b(Date.now());
    };
    return k.addEventListener(j.SET_SCENE, d), k.addEventListener(j.ADD_CAMERA, m), k.addEventListener(j.REMOVE_CAMERA, w), () => {
      k.removeEventListener(j.SET_SCENE, d), k.removeEventListener(j.ADD_CAMERA, m), k.removeEventListener(j.REMOVE_CAMERA, w);
    };
  }, []), Fe(() => {
    if (e === null)
      return;
    let d = window.innerWidth, m = window.innerHeight, w = Math.floor(d / 2), _ = Math.floor(m / 2), Y = -1;
    const U = () => {
      d = window.innerWidth - 300, m = window.innerHeight, w = Math.floor(d / 2), _ = Math.floor(m / 2), e.setSize(d, m);
      let T = d, N = m;
      switch (n) {
        case "Side by Side":
          T = w, N = m;
          break;
        case "Stacked":
          T = d, N = _;
          break;
        case "Quad":
          T = w, N = _;
          break;
      }
      ne.forEach((J) => {
        J instanceof Rn ? (J.left = T / -2, J.right = T / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof zt && (J.aspect = T / N, J.updateProjectionMatrix(), be.get(J.name)?.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, d, m), e.setScissor(0, 0, d, m), e.render(V, G);
    }, I = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, w, m), e.setScissor(0, 0, w, m), e.render(V, G), e.setViewport(w, 0, w, m), e.setScissor(w, 0, w, m), e.render(V, re);
      else {
        const T = m - _;
        e.setViewport(0, T, d, _), e.setScissor(0, T, d, _), e.render(V, G), e.setViewport(0, 0, d, _), e.setScissor(0, 0, d, _), e.render(V, re);
      }
    }, H = () => {
      let T = 0, N = 0;
      N = m - _, T = 0, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, G), T = w, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, re), N = 0, T = 0, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, Le), T = w, e.setViewport(T, N, w, _), e.setScissor(T, N, w, _), e.render(V, Ne);
    }, q = () => {
      switch (ie.forEach((T) => {
        T.update();
      }), t.onSceneUpdate !== void 0 && ln && t.onSceneUpdate(ye), e.clear(), n) {
        case "Single":
          $();
          break;
        case "Side by Side":
        case "Stacked":
          I();
          break;
        case "Quad":
          H();
          break;
      }
      Y = requestAnimationFrame(q);
    };
    return le(), window.addEventListener("resize", U), U(), q(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(Y), Y = -1;
    };
  }, [n, e]), Fe(() => {
    if (e !== null) {
      const d = new Ea(), m = new ue(), w = ($, I, H, q) => {
        switch (n) {
          case "Quad":
            $ < H ? I < q ? d.setFromCamera(m, G) : d.setFromCamera(m, Le) : I < q ? d.setFromCamera(m, re) : d.setFromCamera(m, Ne);
            break;
          case "Side by Side":
            $ < H ? d.setFromCamera(m, G) : d.setFromCamera(m, re);
            break;
          case "Single":
            d.setFromCamera(m, G);
            break;
          case "Stacked":
            I < q ? d.setFromCamera(m, G) : d.setFromCamera(m, re);
            break;
        }
      }, _ = ($) => {
        if (!Ot)
          return;
        const I = new ue();
        e.getSize(I);
        const H = Math.min($.clientX, I.x), q = Math.min($.clientY, I.y);
        m.x = qe(H, 0, I.x, -1, 1), m.y = qe(q, 0, I.y, 1, -1);
        const T = I.x / 2, N = I.y / 2, J = () => {
          H < T ? m.x = qe(H, 0, T, -1, 1) : m.x = qe(H, T, I.x, -1, 1);
        }, me = () => {
          q < N ? m.y = qe(q, 0, N, 1, -1) : m.y = qe(q, N, I.y, 1, -1);
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
        w(H, q, T, N);
        const xe = d.intersectObjects(ye.children);
        xe.length > 0 && ut.position.copy(xe[0].point);
      }, Y = ($) => {
        if (!Ot)
          return;
        const I = new ue();
        if (e.getSize(I), $.clientX >= I.x)
          return;
        _($);
        const H = d.intersectObjects(ye.children);
        H.length > 0 && t.three.getObject(H[0].object.uuid);
      }, U = x.current;
      return U.addEventListener("mousemove", _, !1), U.addEventListener("click", Y, !1), () => {
        U.removeEventListener("mousemove", _), U.removeEventListener("click", Y);
      };
    }
  }, [n, e]);
  const oe = [];
  return ne.forEach((d, m) => {
    oe.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: E }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: x, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ie, { camera: G, options: oe, ref: M, onSelect: (d) => {
        ie.get(G.name)?.dispose();
        const m = ne.get(d);
        m !== void 0 && (z(G), G = m, S(m, M.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: G, options: oe, ref: M, onSelect: (d) => {
          ie.get(G.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(G), G = m, S(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: re, options: oe, ref: P, onSelect: (d) => {
          ie.get(re.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(re), re = m, S(m, P.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Ie, { camera: G, options: oe, ref: M, onSelect: (d) => {
          ie.get(G.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(G), G = m, S(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: re, options: oe, ref: P, onSelect: (d) => {
          ie.get(re.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(re), re = m, S(m, P.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Le, options: oe, ref: W, onSelect: (d) => {
          ie.get(Le.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(Le), Le = m, S(m, W.current));
        } }),
        /* @__PURE__ */ l.jsx(Ie, { camera: Ne, options: oe, ref: B, onSelect: (d) => {
          ie.get(Ne.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(Ne), Ne = m, S(m, B.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Mt,
        {
          index: on.indexOf(n),
          options: on,
          onSelect: (d) => {
            d !== n && (Ce(), a(d));
          },
          open: o,
          onToggle: (d) => {
            p(d), c && u(!1), f && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Mt,
        {
          index: cn.indexOf(wt),
          options: cn,
          onSelect: (d) => {
            if (d !== wt)
              switch (wt = d, wt) {
                case "Depth":
                  V.overrideMaterial = Ei;
                  break;
                case "Normals":
                  V.overrideMaterial = Ci;
                  break;
                default:
                case "Renderer":
                  V.overrideMaterial = null;
                  break;
                case "Wireframe":
                  V.overrideMaterial = Si;
                  break;
                case "UVs":
                  V.overrideMaterial = xi;
                  break;
              }
          },
          open: c,
          onToggle: (d) => {
            o && p(!1), u(d), f && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Mt,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (d) => {
            Ot = d === "Selection Mode", ut.visible = Ot;
          },
          open: f,
          onToggle: (d) => {
            o && p(!1), c && u(!1), v(d);
          }
        }
      )
    ] })
  ] });
}
function zi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Wt as Accordion,
  Di as Application,
  Rt as BaseRemote,
  Fn as ChildObject,
  Ja as ContainerObject,
  za as Draggable,
  $a as DraggableItem,
  Ya as Dropdown,
  Ga as DropdownItem,
  zi as Editor,
  qa as InfiniteGridHelper,
  gi as Inspector,
  $i as MultiView,
  Nn as NavButton,
  Ii as RemoteComponents,
  Fi as RemoteController,
  ot as RemoteTheatre,
  Li as RemoteThree,
  Ni as RemoteTweakpane,
  Ui as SceneInspector,
  Bi as SidePanel,
  j as ToolEvents,
  Za as UVMaterial,
  lt as capitalize,
  Pi as clamp,
  Aa as colorToHex,
  k as debugDispatcher,
  Dn as dispose,
  ka as disposeMaterial,
  ji as disposeTexture,
  ki as distance,
  jn as hierarchyUUID,
  _a as isColor,
  Ra as randomID,
  Pa as resetThreeObjects,
  Ft as round,
  Yt as totalThreeObjects
};
