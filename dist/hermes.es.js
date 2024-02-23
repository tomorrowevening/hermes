import { PositionalAudio as Vn, EventDispatcher as ln, Texture as un, CubeTexture as Hn, RepeatWrapping as qt, ShaderMaterial as dn, GLSL3 as Wn, DoubleSide as hn, Color as Mt, Mesh as qn, PlaneGeometry as Kn, FrontSide as Xn, BackSide as Zn, NoBlending as Jn, NormalBlending as Qn, AdditiveBlending as ea, SubtractiveBlending as ta, MultiplyBlending as na, CustomBlending as aa, AddEquation as ia, SubtractEquation as ra, ReverseSubtractEquation as oa, MinEquation as sa, MaxEquation as ca, ZeroFactor as fn, OneFactor as pn, SrcColorFactor as mn, OneMinusSrcColorFactor as vn, SrcAlphaFactor as gn, OneMinusSrcAlphaFactor as bn, DstAlphaFactor as yn, OneMinusDstAlphaFactor as En, DstColorFactor as Cn, OneMinusDstColorFactor as xn, SrcAlphaSaturateFactor as la, ConstantColorFactor as wn, OneMinusConstantColorFactor as Sn, ConstantAlphaFactor as On, OneMinusConstantAlphaFactor as Mn, Matrix4 as ua, Vector3 as X, Euler as da, Ray as ha, Plane as fa, MathUtils as pa, MOUSE as Ve, TOUCH as He, Quaternion as Kt, Spherical as Xt, Vector2 as ue, PerspectiveCamera as $t, MeshDepthMaterial as ma, MeshNormalMaterial as va, MeshBasicMaterial as ga, OrthographicCamera as Tn, Scene as Rn, Group as ba, AxesHelper as _n, WebGLRenderer as ya, Raycaster as Ea, CameraHelper as Ca } from "three";
import at from "@theatre/studio";
import { Pane as xa } from "tweakpane";
import * as wa from "@tweakpane/plugin-essentials";
import An, { useState as ae, useRef as Ee, useEffect as Oe, forwardRef as Sa } from "react";
import { Reorder as Pn } from "framer-motion";
function ct(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Ti(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Ri(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function Oa() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ma(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Ta(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (u) => {
    const f = u.toString(16);
    return f.length === 1 ? "0" + f : f;
  }, s = o(n), p = o(a), c = o(e);
  return "#" + s + p + c;
}
function Nt(t, n = 1) {
  return Number(t.toFixed(n));
}
let zt = 0;
const Ra = () => {
  zt = 0;
}, kn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${zt}`, zt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    kn(a);
  });
}, _i = (t) => {
  t?.dispose();
}, _a = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, jn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n instanceof Vn ? (n.pause(), n.parent && n.parent.remove(n)) : jn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), _a(n.material);
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
const k = new ln(), j = {
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
class Tt {
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
class Pi extends Tt {
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
const Dn = () => {
};
let ge;
class In extends Tt {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
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
    const s = this.sheet(n);
    if (s === void 0)
      return;
    const p = `${n}_${a}`;
    let c = this.sheetObjects.get(p);
    c !== void 0 ? c = s.object(a, { ...e, ...c.value }, { reconfigure: !0 }) : c = s.object(a, e), this.sheetObjects.set(p, c), this.sheetObjectCBs.set(p, o !== void 0 ? o : Dn);
    const u = c.onValuesChange((f) => {
      if (this.app.editor) {
        for (const b in f) {
          const E = f[b];
          typeof E == "object" && Ma(E) && (f[b] = {
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
    const s = `${a}_${e}`, p = this.sheetObjectUnsubscribe.get(s);
    p !== void 0 && (this.sheetObjects.delete(s), this.sheetObjectCBs.delete(s), this.sheetObjectUnsubscribe.delete(s), p());
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
      at.ui.restore(), at.onSelectionChange((o) => {
        o.length < 1 || o.forEach((s) => {
          let p = s.address.sheetId, c = "setSheet", u = {};
          switch (s.type) {
            case "Theatre_Sheet_PublicAPI":
              c = "setSheet", u = {
                sheet: s.address.sheetId
              }, ge = this.sheets.get(s.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              c = "setSheetObject", p += `_${s.address.objectKey}`, u = {
                id: p,
                sheet: s.address.sheetId,
                key: s.address.objectKey
              }, ge = this.sheets.get(s.address.sheetId);
              break;
          }
          this.app.send({ event: c, target: "app", data: u });
        });
      });
      let n = -1;
      const a = () => {
        if (In.rafDriver?.tick(performance.now()), ge !== void 0 && n !== ge.sequence.position) {
          n = ge.sequence.position;
          const o = ge;
          this.app.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: n,
              sheet: o.address.sheetId
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
}
function Aa(t) {
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
function Pa(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function ka(t) {
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
function We(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || ka(a))
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
            if (o instanceof un) {
              const s = o.source.toJSON();
              n[a] = { src: s.url };
            } else
              o instanceof Hn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Pa(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Ft(t) {
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
      e.material.forEach((s) => {
        o.push(We(s));
      }), n.material = o;
    } else
      n.material = We(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((s) => {
        o.push(We(s));
      }), n.material = o;
    } else
      n.material = We(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((s) => {
        o.push(We(s));
      }), n.material = o;
    } else
      n.material = We(e.material);
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
function ja(t, n) {
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
function Yt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const o = new un(e);
      o.wrapS = qt, o.wrapT = qt, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class ki extends Tt {
  scene = void 0;
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = Ft(n);
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
    Ra(), kn(this.scene);
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
    const a = Ft(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Ft(n);
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
class ji extends Tt {
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
    this.pane = new xa({ title: "GUI" }), this.pane.registerPlugin(wa);
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
    const s = this.bindID, p = e.onChange !== void 0 ? e.onChange : Dn;
    this.bindCBs.set(s, p), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addBinding(n, a, e).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: s,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: s,
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
var Gt = { exports: {} }, it = {};
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
function Da() {
  if (Zt)
    return it;
  Zt = 1;
  var t = An, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(c, u, f) {
    var v, b = {}, E = null, x = null;
    f !== void 0 && (E = "" + f), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (v in u)
      e.call(u, v) && !s.hasOwnProperty(v) && (b[v] = u[v]);
    if (c && c.defaultProps)
      for (v in u = c.defaultProps, u)
        b[v] === void 0 && (b[v] = u[v]);
    return { $$typeof: n, type: c, key: E, ref: x, props: b, _owner: o.current };
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
var Jt;
function Ia() {
  return Jt || (Jt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = An, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), M = Symbol.iterator, P = "@@iterator";
    function H(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = M && i[M] || i[P];
      return typeof h == "function" ? h : null;
    }
    var B = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(i) {
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
    var Ce = !1, le = !1, se = !1, d = !1, m = !1, S;
    S = Symbol.for("react.module.reference");
    function _(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || m || i === o || i === f || i === v || d || i === x || Ce || le || se || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === b || i.$$typeof === p || i.$$typeof === c || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === S || i.getModuleId !== void 0));
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
      if (typeof i.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case o:
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
    var I = Object.assign, W = 0, q, T, N, J, me, xe, dt;
    function Ke() {
    }
    Ke.__reactDisabledLog = !0;
    function _t() {
      {
        if (W === 0) {
          q = console.log, T = console.info, N = console.warn, J = console.error, me = console.group, xe = console.groupCollapsed, dt = console.groupEnd;
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
        W++;
      }
    }
    function At() {
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
              value: xe
            }),
            groupEnd: I({}, i, {
              value: dt
            })
          });
        }
        W < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
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
    var ze = !1, Me;
    {
      var ht = typeof WeakMap == "function" ? WeakMap : Map;
      Me = new ht();
    }
    function ft(i, h) {
      if (!i || ze)
        return "";
      {
        var g = Me.get(i);
        if (g !== void 0)
          return g;
      }
      var C;
      ze = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = Xe.current, Xe.current = null, _t();
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
                    return i.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", i.displayName)), typeof i == "function" && Me.set(i, fe), fe;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        ze = !1, Xe.current = F, At(), Error.prepareStackTrace = D;
      }
      var Ge = i ? i.displayName || i.name : "", Wt = Ge ? $e(Ge) : "";
      return typeof i == "function" && Me.set(i, Wt), Wt;
    }
    function Pt(i, h, g) {
      return ft(i, !1);
    }
    function pt(i) {
      var h = i.prototype;
      return !!(h && h.isReactComponent);
    }
    function Te(i, h, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ft(i, pt(i));
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
            return Pt(i.render);
          case b:
            return Te(i.type, h, g);
          case E: {
            var C = i, D = C._payload, F = C._init;
            try {
              return Te(F(D), h, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Re = Object.prototype.hasOwnProperty, mt = {}, vt = B.ReactDebugCurrentFrame;
    function _e(i) {
      if (i) {
        var h = i._owner, g = Te(i.type, i._source, h ? h.type : null);
        vt.setExtraStackFrame(g);
      } else
        vt.setExtraStackFrame(null);
    }
    function Je(i, h, g, C, D) {
      {
        var F = Function.call.bind(Re);
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
            R && !(R instanceof Error) && (_e(D), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, A, typeof R), _e(null)), R instanceof Error && !(R.message in mt) && (mt[R.message] = !0, _e(D), w("Failed %s type: %s", g, R.message), _e(null));
          }
      }
    }
    var Ae = Array.isArray;
    function Qe(i) {
      return Ae(i);
    }
    function kt(i) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, g = h && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function gt(i) {
      try {
        return bt(i), !1;
      } catch {
        return !0;
      }
    }
    function bt(i) {
      return "" + i;
    }
    function yt(i) {
      if (gt(i))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kt(i)), bt(i);
    }
    var we = B.ReactCurrentOwner, et = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, tt, Et, Ye;
    Ye = {};
    function jt(i) {
      if (Re.call(i, "ref")) {
        var h = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Dt(i) {
      if (Re.call(i, "key")) {
        var h = Object.getOwnPropertyDescriptor(i, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Ct(i, h) {
      if (typeof i.ref == "string" && we.current && h && we.current.stateNode !== h) {
        var g = $(we.current.type);
        Ye[g] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(we.current.type), i.ref), Ye[g] = !0);
      }
    }
    function Se(i, h) {
      {
        var g = function() {
          tt || (tt = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
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
          Et || (Et = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
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
        g !== void 0 && (yt(g), R = "" + g), Dt(h) && (yt(h.key), R = "" + h.key), jt(h) && (ce = h.ref, Ct(h, D));
        for (F in h)
          Re.call(h, F) && !et.hasOwnProperty(F) && (A[F] = h[F]);
        if (i && i.defaultProps) {
          var Z = i.defaultProps;
          for (F in Z)
            A[F] === void 0 && (A[F] = Z[F]);
        }
        if (R || ce) {
          var Q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          R && Se(A, Q), ce && Ht(A, Q);
        }
        return r(i, R, ce, D, C, we.current, A);
      }
    }
    var O = B.ReactCurrentOwner, L = B.ReactDebugCurrentFrame;
    function K(i) {
      if (i) {
        var h = i._owner, g = Te(i.type, i._source, h ? h.type : null);
        L.setExtraStackFrame(g);
      } else
        L.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function ie(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function It() {
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
    function Lt(i) {
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
        var h = It();
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
        i && i._owner && i._owner !== O.current && (C = " It was passed a child from " + $(i._owner.type) + "."), K(i), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), K(null);
      }
    }
    function Pe(i, h) {
      {
        if (typeof i != "object")
          return;
        if (Qe(i))
          for (var g = 0; g < i.length; g++) {
            var C = i[g];
            ie(C) && he(C, h);
          }
        else if (ie(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var D = H(i);
          if (typeof D == "function" && D !== i.entries)
            for (var F = D.call(i), A; !(A = F.next()).done; )
              ie(A.value) && he(A.value, h);
        }
      }
    }
    function ke(i) {
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
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function je(i) {
      {
        for (var h = Object.keys(i.props), g = 0; g < h.length; g++) {
          var C = h[g];
          if (C !== "children" && C !== "key") {
            K(i), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), K(null);
            break;
          }
        }
        i.ref !== null && (K(i), w("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function De(i, h, g, C, D, F) {
      {
        var A = _(i);
        if (!A) {
          var R = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Lt(D);
          ce ? R += ce : R += It();
          var Z;
          i === null ? Z = "null" : Qe(i) ? Z = "array" : i !== void 0 && i.$$typeof === n ? (Z = "<" + ($(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof i, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
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
                  Pe(fe[Ge], i);
                Object.freeze && Object.freeze(fe);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Pe(fe, i);
        }
        return i === e ? je(Q) : ke(Q), Q;
      }
    }
    function $n(i, h, g) {
      return De(i, h, g, !0);
    }
    function zn(i, h, g) {
      return De(i, h, g, !1);
    }
    var Yn = zn, Gn = $n;
    rt.Fragment = e, rt.jsx = Yn, rt.jsxs = Gn;
  }()), rt;
}
process.env.NODE_ENV === "production" ? Gt.exports = Da() : Gt.exports = Ia();
var l = Gt.exports;
function Nn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const La = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Na = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Fa(t) {
  return /* @__PURE__ */ l.jsx(Pn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Na,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: La })
  ] }) }, t.title);
}
function Ba(t) {
  const [n, a] = ae(!1), [e, o] = ae(t.options), s = (f) => {
    t.onDragComplete(f), o(f);
  }, p = (f) => {
    const v = [...e];
    v.splice(f, 1), s(v);
  }, c = [];
  e.forEach((f, v) => {
    c.push(/* @__PURE__ */ l.jsx(Fa, { index: v, title: f, onDelete: p }, f));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Nn, { title: t.title }),
    /* @__PURE__ */ l.jsx(Pn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Ua(t) {
  const [n, a] = ae(!1), e = [];
  t.options.map((s, p) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx($a, { option: s }, p));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
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
function $a(t) {
  const { option: n } = t, [a, e] = ae("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        Ba,
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
      o = /* @__PURE__ */ l.jsx(
        Ua,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: o }, Oa());
}
function Di(t) {
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
const za = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Ya = `out vec4 fragColor;
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
class Ga extends dn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Wn,
      side: hn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new Mt(16777215)
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
      vertexShader: za,
      fragmentShader: Ya,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class Va extends qn {
  gridMaterial;
  constructor() {
    const n = new Ga();
    super(new Kn(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ha = `#include <common>
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
}`, Wa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class qa extends dn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ha,
      fragmentShader: Wa
    });
  }
}
function Vt(t) {
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
          /* @__PURE__ */ l.jsx("p", { className: "label", children: ct(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function Fn(t) {
  const [n, a] = ae(!1), e = t.child !== void 0 && t.child.children.length > 0, o = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((s) => {
    o.push(/* @__PURE__ */ l.jsx(Fn, { child: s, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Aa(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random()) });
}
function Ka(t) {
  const n = [];
  return t.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Fn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Xa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Za(t) {
  return "items" in t;
}
function Be(t) {
  const n = [];
  return t.items.forEach((a) => {
    Za(a) ? n.push(
      /* @__PURE__ */ l.jsx(Be, { title: ct(a.title), items: a.items }, Math.random())
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
          options: a.options,
          onChange: (e, o) => {
            a.onChange !== void 0 && a.onChange(e, o);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Vt, { label: t.title, open: t.expanded === !0, children: n });
}
function Ja(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Ie(t) {
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
function Qa(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function ei() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], o = new FileReader();
        o.onload = function(s) {
          n(s.target.result);
        }, o.readAsDataURL(e);
      }
    }), t.click();
  });
}
const ti = [
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
    value: hn
  }
], ni = [
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
], ai = [
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
    value: oa
  },
  {
    title: "Min",
    value: sa
  },
  {
    title: "Max",
    value: ca
  }
], ii = [
  {
    title: "Zero",
    valye: fn
  },
  {
    title: "One",
    valye: pn
  },
  {
    title: "Src Color",
    valye: mn
  },
  {
    title: "One Minus Src Color",
    valye: vn
  },
  {
    title: "Src Alpha",
    valye: gn
  },
  {
    title: "One Minus Src Alpha",
    valye: bn
  },
  {
    title: "Dst Alpha",
    valye: yn
  },
  {
    title: "One Minus Dst Alpha",
    valye: En
  },
  {
    title: "Dst Color",
    valye: Cn
  },
  {
    title: "One Minus Dst Color",
    valye: xn
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
    valye: Sn
  },
  {
    title: "Constant Alpha",
    valye: On
  },
  {
    title: "One Minus Constant Alpha",
    valye: Mn
  }
], ri = [
  {
    title: "Zero",
    valye: fn
  },
  {
    title: "One",
    valye: pn
  },
  {
    title: "Src Color",
    valye: mn
  },
  {
    title: "One Minus Src Color",
    valye: vn
  },
  {
    title: "Src Alpha",
    valye: gn
  },
  {
    title: "One Minus Src Alpha",
    valye: bn
  },
  {
    title: "Dst Alpha",
    valye: yn
  },
  {
    title: "One Minus Dst Alpha",
    valye: En
  },
  {
    title: "Dst Color",
    valye: Cn
  },
  {
    title: "One Minus Dst Color",
    valye: xn
  },
  {
    title: "Constant Color",
    valye: wn
  },
  {
    title: "One Minus Constant Color",
    valye: Sn
  },
  {
    title: "Constant Alpha",
    valye: On
  },
  {
    title: "One Minus Constant Alpha",
    valye: Mn
  }
];
function ot(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Qt(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!Ja(o))
      continue;
    const s = typeof t[o], p = t[o];
    if (s === "boolean" || s === "number" || s === "string") {
      const c = {
        title: Ie(o),
        prop: o,
        type: s,
        value: p,
        min: void 0,
        max: void 0,
        needsUpdate: s === "boolean",
        onChange: (f, v) => {
          a.updateObject(n.uuid, `material.${f}`, v), c.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${f}`, v);
        }
      };
      switch (o) {
        case "blending":
          ot(c, ni);
          break;
        case "blendDst":
          ot(c, ri);
          break;
        case "blendEquation":
          ot(c, ai);
          break;
        case "blendSrc":
          ot(c, ii);
          break;
        case "side":
          ot(c, ti);
          break;
      }
      Qa(o) && (c.value = Number(p), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const u = s === "string" && (o === "vertexShader" || o === "fragmentShader");
      u && (c.disabled = !1, c.latest = c.value, c.onChange = (f, v) => {
        c.latest = v;
      }), e.push(c), u && e.push({
        title: `${ct(o)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${o}`, c.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const f = a.scene?.getObjectByProperty("uuid", n.uuid);
          f !== void 0 && (ee(f, `material.${o}`, c.latest), f.material.needsUpdate = !0);
        }
      });
    } else if (s === "object")
      if (p.isColor)
        e.push({
          title: Ie(o),
          prop: o,
          type: "color",
          value: p,
          onChange: (c, u) => {
            const f = new Mt(u);
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
              a.updateObject(n.uuid, `material.${o}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${o}`, v);
            }
          });
        e.push({
          title: Ie(o),
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
                title: Ie(o),
                type: "image",
                value: f,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${o}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && Yt(E).then((M) => {
                    ee(x, `material.${o}`, M), ee(x, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${Ie(u)}`,
                prop: `material.${o}.${u}`,
                type: `${typeof t[o][u]}`,
                value: p[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${o}.${u}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && ee(x, `material.${o}.${u}`, E);
                }
              });
              break;
            case "object":
              if (f.value !== void 0 && f.value.src !== void 0)
                c.push({
                  title: Ie(u),
                  type: "image",
                  value: f.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${o}.${u}.value`, p);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && Yt(E).then((M) => {
                      ee(x, `material.${o}.${u}.value`, M);
                    });
                  }
                });
              else if (o === "uniforms") {
                const b = f.value, E = (x, M, P) => ({
                  title: x,
                  type: "number",
                  value: P,
                  step: 0.01,
                  onChange: (H, B) => {
                    const w = `material.uniforms.${u}.value.${M}`;
                    a.updateObject(n.uuid, w, B);
                    const z = a.scene?.getObjectByProperty("uuid", n.uuid);
                    z !== void 0 && ee(z, w, B);
                  }
                });
                if (typeof f.value == "number")
                  c.push({
                    title: u,
                    type: "number",
                    value: f.value,
                    onChange: (x, M) => {
                      const P = `material.${o}.${x}.value`;
                      a.updateObject(n.uuid, P, M);
                      const H = a.scene?.getObjectByProperty("uuid", n.uuid);
                      H !== void 0 && ee(H, P, M);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  c.push({
                    title: u,
                    type: "color",
                    value: f.value,
                    onChange: (x, M) => {
                      const P = new Mt(M), H = `material.${o}.${x}.value`;
                      a.updateObject(n.uuid, H, P);
                      const B = a.scene?.getObjectByProperty("uuid", n.uuid);
                      B !== void 0 && ee(B, H, P);
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
                    a.updateObject(n.uuid, `material.${o}.${u}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && ee(x, `material.${o}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: Ie(o),
          items: c
        });
      }
    else
      p !== void 0 && console.log("other:", o, s, p);
  }
  return e.sort((o, s) => o.title < s.title ? -1 : o.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function oi(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let s = 0; s < o; s++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Be,
          {
            title: `Material ${s}`,
            items: Qt(a[s], t, n)
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
        items: Qt(a, t, n)
      }
    );
}
function st(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Ta(t.value));
  const [a, e] = ae(n), o = Ee(null), s = Ee(null), p = Ee(null);
  Oe(() => {
    let v = !1, b = -1, E = 0, x = Number(a);
    const M = (z) => {
      v = !0, E = x, b = z.clientX;
    }, P = (z) => {
      if (!v)
        return;
      const Ce = t.step !== void 0 ? t.step : 1, le = (z.clientX - b) * Ce;
      x = Number((E + le).toFixed(4)), s.current !== null && (s.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, H = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, w = t.type === "number";
    return w && (o.current?.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", H, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", B, !1)), () => {
      w && (o.current?.removeEventListener("mousedown", M), document.removeEventListener("mouseup", H), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = c || t.type === "image", f = (v) => {
    let b = v.target.value;
    t.type === "boolean" ? b = v.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: ct(t.title) }, "fieldLabel"),
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
        ref: s,
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
      ei().then((v) => {
        p.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : Xa }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: f, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((v, b) => /* @__PURE__ */ l.jsx("option", { value: v.value, children: ct(v.title) }, b)) }) })
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
function si(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: en(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, o, s), p.updateProjectionMatrix());
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
        onChange: (o, s) => {
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, o, s), p.updateProjectionMatrix());
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
const ci = Math.PI / 180, li = 180 / Math.PI;
function qe(t, n, a, e, o) {
  return e + (t - n) * (o - e) / (a - n);
}
function ui(t) {
  return t * ci;
}
function Bt(t) {
  return t * li;
}
function di(t, n) {
  const a = new ua();
  a.elements = t.matrix;
  const e = new X(), o = new da(), s = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const p = (u, f) => {
    n.updateObject(t.uuid, u, f);
    const v = n.scene?.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && ee(v, u, f);
  }, c = (u, f) => {
    p(u, ui(f));
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
          value: Nt(Bt(o.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Nt(Bt(o.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Nt(Bt(o.z)),
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
          onChange: p
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: p
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
function hi(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: tn(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (s, p) => {
          const c = new Mt(p);
          n.updateObject(t.uuid, s, c);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && ee(u, s, c);
        }
      }) : a.push({
        title: tn(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (s, p) => {
          n.updateObject(t.uuid, s, p);
          const c = n.scene?.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && ee(c, s, p);
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
function fi(t, n) {
  const a = [], e = [];
  let o = 0;
  t.animations.forEach((c) => {
    o = Math.max(o, c.duration), c.duration > 0 && e.push({
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
  const s = n.scene?.getObjectByProperty("uuid", t.uuid);
  let p = !1;
  if (s !== void 0) {
    const c = s.mixer;
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
function pi(t) {
  const [n, a] = ae(-1);
  Oe(() => {
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
  const e = te.type.toLowerCase(), o = te.animations.length > 0 || te.mixer !== void 0, s = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Vt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: te.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: te.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: te.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: te.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
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
      di(te, t.three),
      o ? fi(te, t.three) : null,
      e.search("camera") > -1 ? si(te, t.three) : null,
      e.search("light") > -1 ? hi(te, t.three) : null,
      s ? oi(te, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ii(t) {
  const [n, a] = ae(t.scene);
  Oe(() => {
    const s = (p) => {
      a(p.value);
    };
    return k.addEventListener(j.SET_SCENE, s), () => {
      k.removeEventListener(j.SET_SCENE, s);
    };
  }, []);
  const e = n !== null, o = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Vt, { label: o, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: e && /* @__PURE__ */ l.jsx(Ka, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ l.jsx(pi, { three: t.three })
  ] }, "SidePanel");
}
function Li(t) {
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
  }, o = (c) => {
    if (!n())
      return;
    const u = c.value, { key: f, value: v, uuid: b } = u;
    e(b, f, v);
  }, s = (c) => {
    if (!n())
      return;
    const u = c.value;
    Yt(u.value).then((f) => {
      e(u.uuid, u.key, f), e(u.uuid, "material.needsUpdate", !0);
    });
  }, p = (c) => {
    if (!n())
      return;
    const { key: u, uuid: f, value: v, subitem: b } = c.value, E = t.three.scene?.getObjectByProperty("uuid", f);
    if (E !== void 0)
      try {
        b !== void 0 ? ja(E, b)[u](v) : E[u](v);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(v);
      }
  };
  return Oe(() => (k.addEventListener(j.GET_OBJECT, a), k.addEventListener(j.UPDATE_OBJECT, o), k.addEventListener(j.CREATE_TEXTURE, s), k.addEventListener(j.REQUEST_METHOD, p), () => {
    k.removeEventListener(j.GET_OBJECT, a), k.removeEventListener(j.UPDATE_OBJECT, o), k.removeEventListener(j.CREATE_TEXTURE, s), k.removeEventListener(j.REQUEST_METHOD, p);
  }), []), null;
}
const nn = { type: "change" }, Ut = { type: "start" }, an = { type: "end" }, xt = new ha(), rn = new fa(), mi = Math.cos(70 * pa.DEG2RAD);
class vi extends ln {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ve.ROTATE, MIDDLE: Ve.DOLLY, RIGHT: Ve.PAN }, this.touches = { ONE: He.ROTATE, TWO: He.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
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
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(nn), e.update(), s = o.NONE;
    }, this.update = function() {
      const r = new X(), y = new Kt().setFromUnitVectors(n.up, new X(0, 1, 0)), O = y.clone().invert(), L = new X(), K = new Kt(), de = new X(), ie = 2 * Math.PI;
      return function(Lt = null) {
        const nt = e.object.position;
        r.copy(nt).sub(e.target), r.applyQuaternion(y), c.setFromVector3(r), e.autoRotate && s === o.NONE && U(_(Lt)), e.enableDamping ? (c.theta += u.theta * e.dampingFactor, c.phi += u.phi * e.dampingFactor) : (c.theta += u.theta, c.phi += u.phi);
        let pe = e.minAzimuthAngle, he = e.maxAzimuthAngle;
        isFinite(pe) && isFinite(he) && (pe < -Math.PI ? pe += ie : pe > Math.PI && (pe -= ie), he < -Math.PI ? he += ie : he > Math.PI && (he -= ie), pe <= he ? c.theta = Math.max(pe, Math.min(he, c.theta)) : c.theta = c.theta > (pe + he) / 2 ? Math.max(pe, c.theta) : Math.min(he, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && se || e.object.isOrthographicCamera ? c.radius = me(c.radius) : c.radius = me(c.radius * f), r.setFromSpherical(c), r.applyQuaternion(O), nt.copy(e.target).add(r), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), v.set(0, 0, 0));
        let Pe = !1;
        if (e.zoomToCursor && se) {
          let ke = null;
          if (e.object.isPerspectiveCamera) {
            const je = r.length();
            ke = me(je * f);
            const De = je - ke;
            e.object.position.addScaledVector(Ce, De), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const je = new X(le.x, le.y, 0);
            je.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), Pe = !0;
            const De = new X(le.x, le.y, 0);
            De.unproject(e.object), e.object.position.sub(De).add(je), e.object.updateMatrixWorld(), ke = r.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          ke !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(ke).add(e.object.position) : (xt.origin.copy(e.object.position), xt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(xt.direction)) < mi ? n.lookAt(e.target) : (rn.setFromNormalAndCoplanarPoint(e.object.up, e.target), xt.intersectPlane(rn, e.target))));
        } else
          e.object.isOrthographicCamera && (Pe = f !== 1, Pe && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix()));
        return f = 1, se = !1, Pe || L.distanceToSquared(e.object.position) > p || 8 * (1 - K.dot(e.object.quaternion)) > p || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(nn), L.copy(e.object.position), K.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ye), e.domElement.removeEventListener("pointerdown", _e), e.domElement.removeEventListener("pointercancel", Ae), e.domElement.removeEventListener("wheel", gt), e.domElement.removeEventListener("pointermove", Je), e.domElement.removeEventListener("pointerup", Ae), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", et), e._domElementKeyEvents = null);
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
    let s = o.NONE;
    const p = 1e-6, c = new Xt(), u = new Xt();
    let f = 1;
    const v = new X(), b = new ue(), E = new ue(), x = new ue(), M = new ue(), P = new ue(), H = new ue(), B = new ue(), w = new ue(), z = new ue(), Ce = new X(), le = new ue();
    let se = !1;
    const d = [], m = {};
    let S = !1;
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
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function J(r, y) {
      if (!e.zoomToCursor)
        return;
      se = !0;
      const O = e.domElement.getBoundingClientRect(), L = r - O.left, K = y - O.top, de = O.width, ie = O.height;
      le.x = L / de * 2 - 1, le.y = -(K / ie) * 2 + 1, Ce.set(le.x, le.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function me(r) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, r));
    }
    function xe(r) {
      b.set(r.clientX, r.clientY);
    }
    function dt(r) {
      J(r.clientX, r.clientX), B.set(r.clientX, r.clientY);
    }
    function Ke(r) {
      M.set(r.clientX, r.clientY);
    }
    function _t(r) {
      E.set(r.clientX, r.clientY), x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E), e.update();
    }
    function At(r) {
      w.set(r.clientX, r.clientY), z.subVectors(w, B), z.y > 0 ? T(Y(z.y)) : z.y < 0 && N(Y(z.y)), B.copy(w), e.update();
    }
    function Xe(r) {
      P.set(r.clientX, r.clientY), H.subVectors(P, M).multiplyScalar(e.panSpeed), q(H.x, H.y), M.copy(P), e.update();
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
        const y = Se(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        b.set(O, L);
      }
    }
    function Me(r) {
      if (d.length === 1)
        M.set(r.pageX, r.pageY);
      else {
        const y = Se(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        M.set(O, L);
      }
    }
    function ht(r) {
      const y = Se(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      B.set(0, K);
    }
    function ft(r) {
      e.enableZoom && ht(r), e.enablePan && Me(r);
    }
    function Pt(r) {
      e.enableZoom && ht(r), e.enableRotate && ze(r);
    }
    function pt(r) {
      if (d.length == 1)
        E.set(r.pageX, r.pageY);
      else {
        const O = Se(r), L = 0.5 * (r.pageX + O.x), K = 0.5 * (r.pageY + O.y);
        E.set(L, K);
      }
      x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E);
    }
    function Te(r) {
      if (d.length === 1)
        P.set(r.pageX, r.pageY);
      else {
        const y = Se(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        P.set(O, L);
      }
      H.subVectors(P, M).multiplyScalar(e.panSpeed), q(H.x, H.y), M.copy(P);
    }
    function Re(r) {
      const y = Se(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      w.set(0, K), z.set(0, Math.pow(w.y / B.y, e.zoomSpeed)), T(z.y), B.copy(w);
      const de = (r.pageX + y.x) * 0.5, ie = (r.pageY + y.y) * 0.5;
      J(de, ie);
    }
    function mt(r) {
      e.enableZoom && Re(r), e.enablePan && Te(r);
    }
    function vt(r) {
      e.enableZoom && Re(r), e.enableRotate && pt(r);
    }
    function _e(r) {
      e.enabled !== !1 && (d.length === 0 && (e.domElement.setPointerCapture(r.pointerId), e.domElement.addEventListener("pointermove", Je), e.domElement.addEventListener("pointerup", Ae)), jt(r), r.pointerType === "touch" ? tt(r) : Qe(r));
    }
    function Je(r) {
      e.enabled !== !1 && (r.pointerType === "touch" ? Et(r) : kt(r));
    }
    function Ae(r) {
      switch (Dt(r), d.length) {
        case 0:
          e.domElement.releasePointerCapture(r.pointerId), e.domElement.removeEventListener("pointermove", Je), e.domElement.removeEventListener("pointerup", Ae), e.dispatchEvent(an), s = o.NONE;
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
          dt(r), s = o.DOLLY;
          break;
        case Ve.ROTATE:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enablePan === !1)
              return;
            Ke(r), s = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            xe(r), s = o.ROTATE;
          }
          break;
        case Ve.PAN:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enableRotate === !1)
              return;
            xe(r), s = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Ke(r), s = o.PAN;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent(Ut);
    }
    function kt(r) {
      switch (s) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          _t(r);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          At(r);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          Xe(r);
          break;
      }
    }
    function gt(r) {
      e.enabled === !1 || e.enableZoom === !1 || s !== o.NONE || (r.preventDefault(), e.dispatchEvent(Ut), Ze(bt(r)), e.dispatchEvent(an));
    }
    function bt(r) {
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
      return r.ctrlKey && !S && (O.deltaY *= 10), O;
    }
    function yt(r) {
      r.key === "Control" && (S = !0, e.domElement.getRootNode().addEventListener("keyup", we, { passive: !0, capture: !0 }));
    }
    function we(r) {
      r.key === "Control" && (S = !1, e.domElement.getRootNode().removeEventListener("keyup", we, { passive: !0, capture: !0 }));
    }
    function et(r) {
      e.enabled === !1 || e.enablePan === !1 || $e(r);
    }
    function tt(r) {
      switch (Ct(r), d.length) {
        case 1:
          switch (e.touches.ONE) {
            case He.ROTATE:
              if (e.enableRotate === !1)
                return;
              ze(r), s = o.TOUCH_ROTATE;
              break;
            case He.PAN:
              if (e.enablePan === !1)
                return;
              Me(r), s = o.TOUCH_PAN;
              break;
            default:
              s = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case He.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              ft(r), s = o.TOUCH_DOLLY_PAN;
              break;
            case He.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Pt(r), s = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = o.NONE;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent(Ut);
    }
    function Et(r) {
      switch (Ct(r), s) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          pt(r), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Te(r), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          mt(r), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          vt(r), e.update();
          break;
        default:
          s = o.NONE;
      }
    }
    function Ye(r) {
      e.enabled !== !1 && r.preventDefault();
    }
    function jt(r) {
      d.push(r.pointerId);
    }
    function Dt(r) {
      delete m[r.pointerId];
      for (let y = 0; y < d.length; y++)
        if (d[y] == r.pointerId) {
          d.splice(y, 1);
          return;
        }
    }
    function Ct(r) {
      let y = m[r.pointerId];
      y === void 0 && (y = new ue(), m[r.pointerId] = y), y.set(r.pageX, r.pageY);
    }
    function Se(r) {
      const y = r.pointerId === d[0] ? d[1] : d[0];
      return m[y];
    }
    e.domElement.addEventListener("contextmenu", Ye), e.domElement.addEventListener("pointerdown", _e), e.domElement.addEventListener("pointercancel", Ae), e.domElement.addEventListener("wheel", gt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", yt, { passive: !0, capture: !0 }), this.update();
  }
}
const Ot = (t) => {
  const [n, a] = ae(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, o = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => o(s), children: s }, s)) })
  ] });
}, Le = Sa(function(n, a) {
  const [e, o] = ae(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && o(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Ot,
      {
        index: s,
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
}), on = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ne = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Map(), be = /* @__PURE__ */ new Map();
function Ue(t, n) {
  const a = new Tn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ne.set(t, a), a;
}
Ue("Top", new X(0, 1e3, 0));
Ue("Bottom", new X(0, -1e3, 0));
Ue("Left", new X(-1e3, 0, 0));
Ue("Right", new X(1e3, 0, 0));
Ue("Front", new X(0, 0, 1e3));
Ue("Back", new X(0, 0, -1e3));
Ue("Orthographic", new X(1e3, 1e3, 1e3));
const Rt = new $t(60, 1, 50, 3e3);
Rt.name = "Debug";
Rt.position.set(500, 500, 500);
Rt.lookAt(0, 0, 0);
ne.set("Debug", Rt);
const sn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], gi = new ma(), bi = new va(), yi = new qa(), Ei = new ga({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let wt = "Renderer";
const V = new Rn();
V.name = "Debug Scene";
let ye = new Rn();
V.add(ye);
const ut = new ba();
ut.name = "helpers";
V.add(ut);
const Ci = new Va();
ut.add(Ci);
const Un = new _n(500);
Un.name = "axisHelper";
ut.add(Un);
const lt = new _n(100);
lt.name = "interactionHelper";
ut.add(lt);
lt.visible = !1;
let St = !1, G = ne.get("Debug"), oe = ne.get("Orthographic"), Ne = ne.get("Front"), Fe = ne.get("Top"), cn = !1;
function Ni(t) {
  const [n, a] = ae(t.mode !== void 0 ? t.mode : "Single"), [e, o] = ae(null), [s, p] = ae(!1), [c, u] = ae(!1), [f, v] = ae(!1), [, b] = ae(Date.now()), E = Ee(null), x = Ee(null), M = Ee(null), P = Ee(null), H = Ee(null), B = Ee(null), w = (d, m) => {
    const S = re.get(d.name);
    S !== void 0 && S.dispose(), re.delete(d.name);
    const _ = be.get(d.name);
    _ !== void 0 && (V.remove(_), _.dispose()), be.delete(d.name);
    const Y = new vi(d, m);
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
    if (re.set(d.name, Y), d instanceof $t) {
      const U = new Ca(d);
      be.set(d.name, U), V.add(U);
    }
  }, z = (d) => {
    const m = be.get(d.name);
    m !== void 0 && (V.remove(m), m.dispose(), be.delete(d.name));
    const S = re.get(d.name);
    S !== void 0 && (S.dispose(), re.delete(d.name));
  }, Ce = () => {
    re.forEach((d, m) => {
      d.dispose();
      const S = be.get(m);
      S !== void 0 && (V.remove(S), S.dispose()), be.delete(m), re.delete(m);
    }), re.clear(), be.clear();
  }, le = () => {
    switch (n) {
      case "Single":
        w(G, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        w(G, M.current), w(oe, P.current);
        break;
      case "Quad":
        w(G, M.current), w(oe, P.current), w(Ne, H.current), w(Fe, B.current);
        break;
    }
  };
  Oe(() => {
    const d = new ya({
      canvas: E.current,
      stencil: !1
    });
    d.autoClear = !1, d.shadowMap.enabled = !0, d.setPixelRatio(devicePixelRatio), d.setClearColor(0), o(d);
  }, []), Oe(() => {
    const d = (_) => {
      jn(ye), V.remove(ye);
      const Y = t.scenes.get(_.value.name);
      if (Y !== void 0) {
        const U = new Y();
        t.onSceneSet !== void 0 && t.onSceneSet(U), ye = U, t.three.scene = ye, V.add(ye), cn = !0;
      }
    }, m = (_) => {
      const Y = _.value, U = t.three.scene?.getObjectByProperty("uuid", Y.uuid);
      U !== void 0 && ne.set(Y.name, U), b(Date.now());
    }, S = (_) => {
      ne.delete(_.value.name), b(Date.now());
    };
    return k.addEventListener(j.SET_SCENE, d), k.addEventListener(j.ADD_CAMERA, m), k.addEventListener(j.REMOVE_CAMERA, S), () => {
      k.removeEventListener(j.SET_SCENE, d), k.removeEventListener(j.ADD_CAMERA, m), k.removeEventListener(j.REMOVE_CAMERA, S);
    };
  }, []), Oe(() => {
    if (e === null)
      return;
    let d = window.innerWidth, m = window.innerHeight, S = Math.floor(d / 2), _ = Math.floor(m / 2), Y = -1;
    const U = () => {
      d = window.innerWidth - 300, m = window.innerHeight, S = Math.floor(d / 2), _ = Math.floor(m / 2), e.setSize(d, m);
      let T = d, N = m;
      switch (n) {
        case "Side by Side":
          T = S, N = m;
          break;
        case "Stacked":
          T = d, N = _;
          break;
        case "Quad":
          T = S, N = _;
          break;
      }
      ne.forEach((J) => {
        J instanceof Tn ? (J.left = T / -2, J.right = T / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof $t && (J.aspect = T / N, J.updateProjectionMatrix(), be.get(J.name)?.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, d, m), e.setScissor(0, 0, d, m), e.render(V, G);
    }, I = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, S, m), e.setScissor(0, 0, S, m), e.render(V, G), e.setViewport(S, 0, S, m), e.setScissor(S, 0, S, m), e.render(V, oe);
      else {
        const T = m - _;
        e.setViewport(0, T, d, _), e.setScissor(0, T, d, _), e.render(V, G), e.setViewport(0, 0, d, _), e.setScissor(0, 0, d, _), e.render(V, oe);
      }
    }, W = () => {
      let T = 0, N = 0;
      N = m - _, T = 0, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, G), T = S, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, oe), N = 0, T = 0, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, Ne), T = S, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, Fe);
    }, q = () => {
      switch (re.forEach((T) => {
        T.update();
      }), t.onSceneUpdate !== void 0 && cn && t.onSceneUpdate(ye), e.clear(), n) {
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
  }, [n, e]), Oe(() => {
    if (e !== null) {
      const d = new Ea(), m = new ue(), S = ($, I, W, q) => {
        switch (n) {
          case "Quad":
            $ < W ? I < q ? d.setFromCamera(m, G) : d.setFromCamera(m, Ne) : I < q ? d.setFromCamera(m, oe) : d.setFromCamera(m, Fe);
            break;
          case "Side by Side":
            $ < W ? d.setFromCamera(m, G) : d.setFromCamera(m, oe);
            break;
          case "Single":
            d.setFromCamera(m, G);
            break;
          case "Stacked":
            I < q ? d.setFromCamera(m, G) : d.setFromCamera(m, oe);
            break;
        }
      }, _ = ($) => {
        if (!St)
          return;
        const I = new ue();
        e.getSize(I);
        const W = Math.min($.clientX, I.x), q = Math.min($.clientY, I.y);
        m.x = qe(W, 0, I.x, -1, 1), m.y = qe(q, 0, I.y, 1, -1);
        const T = I.x / 2, N = I.y / 2, J = () => {
          W < T ? m.x = qe(W, 0, T, -1, 1) : m.x = qe(W, T, I.x, -1, 1);
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
        S(W, q, T, N);
        const xe = d.intersectObjects(ye.children);
        xe.length > 0 && lt.position.copy(xe[0].point);
      }, Y = ($) => {
        if (!St)
          return;
        const I = new ue();
        if (e.getSize(I), $.clientX >= I.x)
          return;
        _($);
        const W = d.intersectObjects(ye.children);
        W.length > 0 && t.three.getObject(W[0].object.uuid);
      }, U = x.current;
      return U.addEventListener("mousemove", _, !1), U.addEventListener("click", Y, !1), () => {
        U.removeEventListener("mousemove", _), U.removeEventListener("click", Y);
      };
    }
  }, [n, e]);
  const se = [];
  return ne.forEach((d, m) => {
    se.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: E }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: x, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Le, { camera: G, options: se, ref: M, onSelect: (d) => {
        re.get(G.name)?.dispose();
        const m = ne.get(d);
        m !== void 0 && (z(G), G = m, w(m, M.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Le, { camera: G, options: se, ref: M, onSelect: (d) => {
          re.get(G.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(G), G = m, w(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: oe, options: se, ref: P, onSelect: (d) => {
          re.get(oe.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(oe), oe = m, w(m, P.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Le, { camera: G, options: se, ref: M, onSelect: (d) => {
          re.get(G.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(G), G = m, w(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: oe, options: se, ref: P, onSelect: (d) => {
          re.get(oe.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(oe), oe = m, w(m, P.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: Ne, options: se, ref: H, onSelect: (d) => {
          re.get(Ne.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(Ne), Ne = m, w(m, H.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: Fe, options: se, ref: B, onSelect: (d) => {
          re.get(Fe.name)?.dispose();
          const m = ne.get(d);
          m !== void 0 && (z(Fe), Fe = m, w(m, B.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: on.indexOf(n),
          options: on,
          onSelect: (d) => {
            d !== n && (Ce(), a(d));
          },
          open: s,
          onToggle: (d) => {
            p(d), c && u(!1), f && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ot,
        {
          index: sn.indexOf(wt),
          options: sn,
          onSelect: (d) => {
            if (d !== wt)
              switch (wt = d, wt) {
                case "Depth":
                  V.overrideMaterial = gi;
                  break;
                case "Normals":
                  V.overrideMaterial = bi;
                  break;
                default:
                case "Renderer":
                  V.overrideMaterial = null;
                  break;
                case "Wireframe":
                  V.overrideMaterial = Ei;
                  break;
                case "UVs":
                  V.overrideMaterial = yi;
                  break;
              }
          },
          open: c,
          onToggle: (d) => {
            s && p(!1), u(d), f && v(!1);
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
          onSelect: (d) => {
            St = d === "Selection Mode", lt.visible = St;
          },
          open: f,
          onToggle: (d) => {
            s && p(!1), c && u(!1), v(d);
          }
        }
      )
    ] })
  ] });
}
function Fi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Vt as Accordion,
  Ai as Application,
  Tt as BaseRemote,
  Fn as ChildObject,
  Ka as ContainerObject,
  Ba as Draggable,
  Fa as DraggableItem,
  Ua as Dropdown,
  $a as DropdownItem,
  Fi as Editor,
  Va as InfiniteGridHelper,
  pi as Inspector,
  Ni as MultiView,
  Nn as NavButton,
  Pi as RemoteComponents,
  Di as RemoteController,
  In as RemoteTheatre,
  ki as RemoteThree,
  ji as RemoteTweakpane,
  Li as SceneInspector,
  Ii as SidePanel,
  j as ToolEvents,
  qa as UVMaterial,
  ct as capitalize,
  Ti as clamp,
  Ta as colorToHex,
  k as debugDispatcher,
  jn as dispose,
  _a as disposeMaterial,
  _i as disposeTexture,
  Ri as distance,
  kn as hierarchyUUID,
  Ma as isColor,
  Oa as randomID,
  Ra as resetThreeObjects,
  Nt as round,
  zt as totalThreeObjects
};
