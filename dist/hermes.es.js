import { PositionalAudio as zn, EventDispatcher as ln, Texture as cn, CubeTexture as Yn, RepeatWrapping as Wt, ShaderMaterial as un, GLSL3 as Gn, DoubleSide as dn, Color as Ot, Mesh as Vn, PlaneGeometry as Hn, FrontSide as Wn, BackSide as Xn, NoBlending as Kn, NormalBlending as qn, AdditiveBlending as Zn, SubtractiveBlending as Jn, MultiplyBlending as Qn, CustomBlending as ea, AddEquation as ta, SubtractEquation as na, ReverseSubtractEquation as aa, MinEquation as ia, MaxEquation as ra, ZeroFactor as fn, OneFactor as pn, SrcColorFactor as hn, OneMinusSrcColorFactor as mn, SrcAlphaFactor as vn, OneMinusSrcAlphaFactor as gn, DstAlphaFactor as bn, OneMinusDstAlphaFactor as yn, DstColorFactor as En, OneMinusDstColorFactor as Cn, SrcAlphaSaturateFactor as oa, ConstantColorFactor as xn, OneMinusConstantColorFactor as wn, ConstantAlphaFactor as Sn, OneMinusConstantAlphaFactor as On, Matrix4 as sa, Vector3 as q, Euler as la, Ray as ca, Plane as ua, MathUtils as da, MOUSE as Ge, TOUCH as Ve, Quaternion as Xt, Spherical as Kt, Vector2 as ue, PerspectiveCamera as Bt, MeshDepthMaterial as fa, MeshNormalMaterial as pa, MeshBasicMaterial as ha, OrthographicCamera as Mn, Scene as Tn, Group as ma, AxesHelper as Rn, WebGLRenderer as va, Raycaster as ga, CameraHelper as ba } from "three";
import "@theatre/studio";
import { Pane as ya } from "tweakpane";
import * as Ea from "@tweakpane/plugin-essentials";
import _n, { useState as ae, useRef as ye, useEffect as Se, forwardRef as Ca } from "react";
import { Reorder as An } from "framer-motion";
const xa = () => {
}, Si = () => {
};
function st(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Oi(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Mi(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function wa() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ti(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Sa(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (u) => {
    const p = u.toString(16);
    return p.length === 1 ? "0" + p : p;
  }, l = o(n), m = o(a), s = o(e);
  return "#" + l + m + s;
}
function It(t, n = 1) {
  return Number(t.toFixed(n));
}
let Ut = 0;
const Oa = () => {
  Ut = 0;
}, Pn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Ut}`, Ut++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    Pn(a);
  });
}, Ri = (t) => {
  t?.dispose();
}, Ma = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, kn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n instanceof zn ? (n.pause(), n.parent && n.parent.remove(n)) : kn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), Ma(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class _i {
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
const k = new ln(), D = {
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
class Yt {
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
class Ai extends Yt {
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
        k.dispatchEvent({ type: D.SELECT_DROPDOWN, value: n.data });
        break;
      case "draggableListUpdate":
        k.dispatchEvent({ type: D.DRAG_UPDATE, value: n.data });
        break;
    }
  }
}
let He;
function Pi(t, n, a) {
  if (t.editor) {
    a.ui.restore(), a.onSelectionChange((m) => {
      m.length < 1 || m.forEach((s) => {
        let u = s.address.sheetId, p = "setSheet", v = {};
        switch (s.type) {
          case "Theatre_Sheet_PublicAPI":
            p = "setSheet", v = {
              sheet: s.address.sheetId
            }, He = n.sheets.get(s.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            p = "setSheetObject", u += `_${s.address.objectKey}`, v = {
              id: u,
              sheet: s.address.sheetId,
              key: s.address.objectKey
            }, He = n.sheets.get(s.address.sheetId);
            break;
        }
        t.send({ event: p, target: "app", data: v });
      });
    });
    let e = -1;
    const o = () => {
      if (He !== void 0 && e !== He.sequence.position) {
        e = He.sequence.position;
        const m = He;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: e,
            sheet: m.address.sheetId
          }
        });
      }
    }, l = () => {
      o(), requestAnimationFrame(l);
    };
    o(), l();
  } else
    a.ui.hide();
}
function Ta(t) {
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
function Ra(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function _a(t) {
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
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || _a(a))
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
            if (o instanceof cn) {
              const l = o.source.toJSON();
              n[a] = { src: l.url };
            } else
              o instanceof Yn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Ra(n[a]));
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
      e.material.forEach((l) => {
        o.push(We(l));
      }), n.material = o;
    } else
      n.material = We(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((l) => {
        o.push(We(l));
      }), n.material = o;
    } else
      n.material = We(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((l) => {
        o.push(We(l));
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
function Aa(t, n) {
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
      const o = new cn(e);
      o.wrapS = Wt, o.wrapT = Wt, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class ki extends Yt {
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
    Oa(), Pn(this.scene);
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
        k.dispatchEvent({ type: D.GET_OBJECT, value: n.data });
        break;
      case "updateObject":
        k.dispatchEvent({ type: D.UPDATE_OBJECT, value: n.data });
        break;
      case "createTexture":
        k.dispatchEvent({ type: D.CREATE_TEXTURE, value: n.data });
        break;
      case "requestMethod":
        k.dispatchEvent({ type: D.REQUEST_METHOD, value: n.data });
        break;
    }
  }
  // Receives Editor events
  handleEditor(n) {
    switch (n.event) {
      case "setObject":
        k.dispatchEvent({ type: D.SET_OBJECT, value: n.data });
        break;
      case "setScene":
        k.dispatchEvent({ type: D.SET_SCENE, value: n.data });
        break;
      case "addCamera":
        k.dispatchEvent({ type: D.ADD_CAMERA, value: n.data });
        break;
      case "removeCamera":
        k.dispatchEvent({ type: D.REMOVE_CAMERA, value: n.data });
        break;
    }
  }
}
class Di extends Yt {
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
    this.pane = new ya({ title: "GUI" }), this.pane.registerPlugin(Ea);
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
    const l = this.bindID, m = e.onChange !== void 0 ? e.onChange : xa;
    this.bindCBs.set(l, m), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addBinding(n, a, e).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: l,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: l,
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
var zt = { exports: {} }, at = {};
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
function Pa() {
  if (qt)
    return at;
  qt = 1;
  var t = _n, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(s, u, p) {
    var v, b = {}, E = null, x = null;
    p !== void 0 && (E = "" + p), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (v in u)
      e.call(u, v) && !l.hasOwnProperty(v) && (b[v] = u[v]);
    if (s && s.defaultProps)
      for (v in u = s.defaultProps, u)
        b[v] === void 0 && (b[v] = u[v]);
    return { $$typeof: n, type: s, key: E, ref: x, props: b, _owner: o.current };
  }
  return at.Fragment = a, at.jsx = m, at.jsxs = m, at;
}
var it = {};
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
function ka() {
  return Zt || (Zt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = _n, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), M = Symbol.iterator, P = "@@iterator";
    function H(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = M && i[M] || i[P];
      return typeof f == "function" ? f : null;
    }
    var B = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(i) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), C = 1; C < f; C++)
          g[C - 1] = arguments[C];
        z("error", i, g);
      }
    }
    function z(i, f, g) {
      {
        var C = B.ReactDebugCurrentFrame, j = C.getStackAddendum();
        j !== "" && (f += "%s", g = g.concat([j]));
        var F = g.map(function(A) {
          return String(A);
        });
        F.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, F);
      }
    }
    var Ee = !1, ce = !1, se = !1, d = !1, h = !1, S;
    S = Symbol.for("react.module.reference");
    function _(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === l || h || i === o || i === p || i === v || d || i === x || Ee || ce || se || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === b || i.$$typeof === m || i.$$typeof === s || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === S || i.getModuleId !== void 0));
    }
    function Y(i, f, g) {
      var C = i.displayName;
      if (C)
        return C;
      var j = f.displayName || f.name || "";
      return j !== "" ? g + "(" + j + ")" : g;
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
        case l:
          return "Profiler";
        case o:
          return "StrictMode";
        case p:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case s:
            var f = i;
            return U(f) + ".Consumer";
          case m:
            var g = i;
            return U(g._context) + ".Provider";
          case u:
            return Y(i, i.render, "ForwardRef");
          case b:
            var C = i.displayName || null;
            return C !== null ? C : $(i.type) || "Memo";
          case E: {
            var j = i, F = j._payload, A = j._init;
            try {
              return $(A(F));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, W = 0, X, T, N, J, me, Ce, ut;
    function Ke() {
    }
    Ke.__reactDisabledLog = !0;
    function Tt() {
      {
        if (W === 0) {
          X = console.log, T = console.info, N = console.warn, J = console.error, me = console.group, Ce = console.groupCollapsed, ut = console.groupEnd;
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
              value: X
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
              value: ut
            })
          });
        }
        W < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var qe = B.ReactCurrentDispatcher, Ze;
    function Ue(i, f, g) {
      {
        if (Ze === void 0)
          try {
            throw Error();
          } catch (j) {
            var C = j.stack.trim().match(/\n( *(at )?)/);
            Ze = C && C[1] || "";
          }
        return `
` + Ze + i;
      }
    }
    var $e = !1, Oe;
    {
      var dt = typeof WeakMap == "function" ? WeakMap : Map;
      Oe = new dt();
    }
    function ft(i, f) {
      if (!i || $e)
        return "";
      {
        var g = Oe.get(i);
        if (g !== void 0)
          return g;
      }
      var C;
      $e = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = qe.current, qe.current = null, Tt();
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
`), le = C.stack.split(`
`), Z = R.length - 1, Q = le.length - 1; Z >= 1 && Q >= 0 && R[Z] !== le[Q]; )
            Q--;
          for (; Z >= 1 && Q >= 0; Z--, Q--)
            if (R[Z] !== le[Q]) {
              if (Z !== 1 || Q !== 1)
                do
                  if (Z--, Q--, Q < 0 || R[Z] !== le[Q]) {
                    var pe = `
` + R[Z].replace(" at new ", " at ");
                    return i.displayName && pe.includes("<anonymous>") && (pe = pe.replace("<anonymous>", i.displayName)), typeof i == "function" && Oe.set(i, pe), pe;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        $e = !1, qe.current = F, Rt(), Error.prepareStackTrace = j;
      }
      var Ye = i ? i.displayName || i.name : "", Ht = Ye ? Ue(Ye) : "";
      return typeof i == "function" && Oe.set(i, Ht), Ht;
    }
    function _t(i, f, g) {
      return ft(i, !1);
    }
    function pt(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function Me(i, f, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ft(i, pt(i));
      if (typeof i == "string")
        return Ue(i);
      switch (i) {
        case p:
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
            var C = i, j = C._payload, F = C._init;
            try {
              return Me(F(j), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Te = Object.prototype.hasOwnProperty, ht = {}, mt = B.ReactDebugCurrentFrame;
    function Re(i) {
      if (i) {
        var f = i._owner, g = Me(i.type, i._source, f ? f.type : null);
        mt.setExtraStackFrame(g);
      } else
        mt.setExtraStackFrame(null);
    }
    function Je(i, f, g, C, j) {
      {
        var F = Function.call.bind(Te);
        for (var A in i)
          if (F(i, A)) {
            var R = void 0;
            try {
              if (typeof i[A] != "function") {
                var le = Error((C || "React class") + ": " + g + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw le.name = "Invariant Violation", le;
              }
              R = i[A](f, A, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              R = Z;
            }
            R && !(R instanceof Error) && (Re(j), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, A, typeof R), Re(null)), R instanceof Error && !(R.message in ht) && (ht[R.message] = !0, Re(j), w("Failed %s type: %s", g, R.message), Re(null));
          }
      }
    }
    var _e = Array.isArray;
    function Qe(i) {
      return _e(i);
    }
    function At(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function vt(i) {
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
      if (vt(i))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", At(i)), gt(i);
    }
    var xe = B.ReactCurrentOwner, et = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, tt, yt, ze;
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
    function Et(i, f) {
      if (typeof i.ref == "string" && xe.current && f && xe.current.stateNode !== f) {
        var g = $(xe.current.type);
        ze[g] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(xe.current.type), i.ref), ze[g] = !0);
      }
    }
    function we(i, f) {
      {
        var g = function() {
          tt || (tt = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Vt(i, f) {
      {
        var g = function() {
          yt || (yt = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var r = function(i, f, g, C, j, F, A) {
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
        value: j
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function y(i, f, g, C, j) {
      {
        var F, A = {}, R = null, le = null;
        g !== void 0 && (bt(g), R = "" + g), kt(f) && (bt(f.key), R = "" + f.key), Pt(f) && (le = f.ref, Et(f, j));
        for (F in f)
          Te.call(f, F) && !et.hasOwnProperty(F) && (A[F] = f[F]);
        if (i && i.defaultProps) {
          var Z = i.defaultProps;
          for (F in Z)
            A[F] === void 0 && (A[F] = Z[F]);
        }
        if (R || le) {
          var Q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          R && we(A, Q), le && Vt(A, Q);
        }
        return r(i, R, le, j, C, xe.current, A);
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
    function Dt() {
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
    function jt(i) {
      {
        if (i !== void 0) {
          var f = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var nt = {};
    function he(i) {
      {
        var f = Dt();
        if (!f) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function fe(i, f) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = he(f);
        if (nt[g])
          return;
        nt[g] = !0;
        var C = "";
        i && i._owner && i._owner !== O.current && (C = " It was passed a child from " + $(i._owner.type) + "."), K(i), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), K(null);
      }
    }
    function Ae(i, f) {
      {
        if (typeof i != "object")
          return;
        if (Qe(i))
          for (var g = 0; g < i.length; g++) {
            var C = i[g];
            ie(C) && fe(C, f);
          }
        else if (ie(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var j = H(i);
          if (typeof j == "function" && j !== i.entries)
            for (var F = j.call(i), A; !(A = F.next()).done; )
              ie(A.value) && fe(A.value, f);
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
          Je(g, i.props, "prop", C, i);
        } else if (f.PropTypes !== void 0 && !de) {
          de = !0;
          var j = $(f);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(i) {
      {
        for (var f = Object.keys(i.props), g = 0; g < f.length; g++) {
          var C = f[g];
          if (C !== "children" && C !== "key") {
            K(i), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), K(null);
            break;
          }
        }
        i.ref !== null && (K(i), w("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function De(i, f, g, C, j, F) {
      {
        var A = _(i);
        if (!A) {
          var R = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var le = jt(j);
          le ? R += le : R += Dt();
          var Z;
          i === null ? Z = "null" : Qe(i) ? Z = "array" : i !== void 0 && i.$$typeof === n ? (Z = "<" + ($(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof i, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
        }
        var Q = y(i, f, g, j, F);
        if (Q == null)
          return Q;
        if (A) {
          var pe = f.children;
          if (pe !== void 0)
            if (C)
              if (Qe(pe)) {
                for (var Ye = 0; Ye < pe.length; Ye++)
                  Ae(pe[Ye], i);
                Object.freeze && Object.freeze(pe);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ae(pe, i);
        }
        return i === e ? ke(Q) : Pe(Q), Q;
      }
    }
    function Fn(i, f, g) {
      return De(i, f, g, !0);
    }
    function Bn(i, f, g) {
      return De(i, f, g, !1);
    }
    var Un = Bn, $n = Fn;
    it.Fragment = e, it.jsx = Un, it.jsxs = $n;
  }()), it;
}
process.env.NODE_ENV === "production" ? zt.exports = Pa() : zt.exports = ka();
var c = zt.exports;
function jn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ c.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ c.jsx("button", { children: t.title });
}
const Da = /* @__PURE__ */ c.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ c.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), ja = /* @__PURE__ */ c.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ c.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Ia(t) {
  return /* @__PURE__ */ c.jsx(An.Item, { value: t.title, children: /* @__PURE__ */ c.jsxs("div", { children: [
    ja,
    /* @__PURE__ */ c.jsx("span", { children: t.title }),
    /* @__PURE__ */ c.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Da })
  ] }) }, t.title);
}
function La(t) {
  const [n, a] = ae(!1), [e, o] = ae(t.options), l = (p) => {
    t.onDragComplete(p), o(p);
  }, m = (p) => {
    const v = [...e];
    v.splice(p, 1), l(v);
  }, s = [];
  e.forEach((p, v) => {
    s.push(/* @__PURE__ */ c.jsx(Ia, { index: v, title: p, onDelete: m }, p));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ c.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ c.jsx(jn, { title: t.title }),
    /* @__PURE__ */ c.jsx(An.Group, { axis: "y", values: e, onReorder: l, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function Na(t) {
  const [n, a] = ae(!1), e = [];
  t.options.map((l, m) => {
    t.onSelect !== void 0 && (l.onSelect = t.onSelect), e.push(/* @__PURE__ */ c.jsx(Fa, { option: l }, m));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ c.jsx(jn, { title: t.title }),
        /* @__PURE__ */ c.jsx(
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
function Fa(t) {
  const { option: n } = t, [a, e] = ae("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ c.jsx(
        La,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (l) => {
            n.onDragComplete !== void 0 && n.onDragComplete(l);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      o = /* @__PURE__ */ c.jsx(
        Na,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      o = /* @__PURE__ */ c.jsx(
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
  return /* @__PURE__ */ c.jsx("li", { className: a === n.title ? "selected" : "", children: o }, wa());
}
function ji(t) {
  function n(e) {
    switch (t.components.forEach((o) => {
      o.handleApp(e);
    }), e.event) {
      case "custom":
        k.dispatchEvent({ type: D.CUSTOM, value: e.data });
        break;
    }
  }
  function a(e) {
    switch (t.components.forEach((o) => {
      o.handleEditor(e);
    }), e.event) {
      case "custom":
        k.dispatchEvent({ type: D.CUSTOM, value: e.data });
        break;
    }
  }
  t.listen = (e) => {
    e.target === "editor" ? a(e) : n(e);
  };
}
const Ba = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Ua = `out vec4 fragColor;
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
class $a extends un {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Gn,
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
          value: n?.color !== void 0 ? n?.color : new Ot(16777215)
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
      vertexShader: Ba,
      fragmentShader: Ua,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class za extends Vn {
  gridMaterial;
  constructor() {
    const n = new $a();
    super(new Hn(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ya = `#include <common>
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
}`, Ga = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Va extends un {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ya,
      fragmentShader: Ga
    });
  }
}
function Gt(t) {
  const [n, a] = ae(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ c.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const o = !n;
          t.onToggle !== void 0 && t.onToggle(o), a(o);
        },
        children: [
          /* @__PURE__ */ c.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ c.jsx("p", { className: "label", children: st(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { children: t.children }) })
  ] });
}
function In(t) {
  const [n, a] = ae(!1), e = t.child !== void 0 && t.child.children.length > 0, o = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((l) => {
    o.push(/* @__PURE__ */ c.jsx(In, { child: l, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsx(c.Fragment, { children: t.child !== void 0 && /* @__PURE__ */ c.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsx("div", { className: `icon ${Ta(t.child)}` })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { className: "container", children: o }) })
  ] }, Math.random()) });
}
function Ha(t) {
  const n = [];
  return t.child?.children.map((a) => {
    n.push(/* @__PURE__ */ c.jsx(In, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Wa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Xa(t) {
  return "items" in t;
}
function Fe(t) {
  const n = [];
  return t.items.forEach((a) => {
    Xa(a) ? n.push(
      /* @__PURE__ */ c.jsx(Fe, { title: st(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ c.jsx(
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
          options: a.options,
          onChange: (e, o) => {
            a.onChange !== void 0 && a.onChange(e, o);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ c.jsx(Gt, { label: t.title, open: t.expanded === !0, children: n });
}
function Ka(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function je(t) {
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
function qa(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Za() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], o = new FileReader();
        o.onload = function(l) {
          n(l.target.result);
        }, o.readAsDataURL(e);
      }
    }), t.click();
  });
}
const Ja = [
  {
    title: "Front",
    value: Wn
  },
  {
    title: "Back",
    value: Xn
  },
  {
    title: "Double",
    value: dn
  }
], Qa = [
  {
    title: "No Blending",
    value: Kn
  },
  {
    title: "Normal",
    value: qn
  },
  {
    title: "Additive",
    value: Zn
  },
  {
    title: "Subtractive",
    value: Jn
  },
  {
    title: "Multiply",
    value: Qn
  },
  {
    title: "Custom",
    value: ea
  }
], ei = [
  {
    title: "Add",
    value: ta
  },
  {
    title: "Subtract",
    value: na
  },
  {
    title: "Reverse Subtract",
    value: aa
  },
  {
    title: "Min",
    value: ia
  },
  {
    title: "Max",
    value: ra
  }
], ti = [
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
    valye: hn
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
    valye: oa
  },
  {
    title: "Constant Color",
    valye: xn
  },
  {
    title: "One Minus Constant Color",
    valye: wn
  },
  {
    title: "Constant Alpha",
    valye: Sn
  },
  {
    title: "One Minus Constant Alpha",
    valye: On
  }
], ni = [
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
    valye: hn
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
    valye: xn
  },
  {
    title: "One Minus Constant Color",
    valye: wn
  },
  {
    title: "Constant Alpha",
    valye: Sn
  },
  {
    title: "One Minus Constant Alpha",
    valye: On
  }
];
function rt(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Jt(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!Ka(o))
      continue;
    const l = typeof t[o], m = t[o];
    if (l === "boolean" || l === "number" || l === "string") {
      const s = {
        title: je(o),
        prop: o,
        type: l,
        value: m,
        min: void 0,
        max: void 0,
        needsUpdate: l === "boolean",
        onChange: (p, v) => {
          a.updateObject(n.uuid, `material.${p}`, v), s.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${p}`, v);
        }
      };
      switch (o) {
        case "blending":
          rt(s, Qa);
          break;
        case "blendDst":
          rt(s, ni);
          break;
        case "blendEquation":
          rt(s, ei);
          break;
        case "blendSrc":
          rt(s, ti);
          break;
        case "side":
          rt(s, Ja);
          break;
      }
      qa(o) && (s.value = Number(m), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01);
      const u = l === "string" && (o === "vertexShader" || o === "fragmentShader");
      u && (s.disabled = !1, s.latest = s.value, s.onChange = (p, v) => {
        s.latest = v;
      }), e.push(s), u && e.push({
        title: `${st(o)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${o}`, s.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const p = a.scene?.getObjectByProperty("uuid", n.uuid);
          p !== void 0 && (ee(p, `material.${o}`, s.latest), p.material.needsUpdate = !0);
        }
      });
    } else if (l === "object")
      if (m.isColor)
        e.push({
          title: je(o),
          prop: o,
          type: "color",
          value: m,
          onChange: (s, u) => {
            const p = new Ot(u);
            a.updateObject(n.uuid, `material.${s}`, p);
            const v = a.scene?.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && ee(v, `material.${s}`, p);
          }
        });
      else if (Array.isArray(m)) {
        const s = [];
        for (const u in m)
          s.push({
            title: `${u}`,
            type: `${typeof m[u]}`,
            value: m[u],
            onChange: (p, v) => {
              a.updateObject(n.uuid, `material.${o}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${o}`, v);
            }
          });
        e.push({
          title: je(o),
          items: s
        });
      } else {
        const s = [];
        for (const u in m) {
          const p = m[u];
          switch (typeof p) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: je(o),
                type: "image",
                value: p,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${o}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && $t(E).then((M) => {
                    ee(x, `material.${o}`, M), ee(x, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${je(u)}`,
                prop: `material.${o}.${u}`,
                type: `${typeof t[o][u]}`,
                value: m[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${o}.${u}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && ee(x, `material.${o}.${u}`, E);
                }
              });
              break;
            case "object":
              if (p.value !== void 0 && p.value.src !== void 0)
                s.push({
                  title: je(u),
                  type: "image",
                  value: p.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${o}.${u}.value`, m);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && $t(E).then((M) => {
                      ee(x, `material.${o}.${u}.value`, M);
                    });
                  }
                });
              else if (o === "uniforms") {
                const b = p.value, E = (x, M, P) => ({
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
                if (typeof p.value == "number")
                  s.push({
                    title: u,
                    type: "number",
                    value: p.value,
                    onChange: (x, M) => {
                      const P = `material.${o}.${x}.value`;
                      a.updateObject(n.uuid, P, M);
                      const H = a.scene?.getObjectByProperty("uuid", n.uuid);
                      H !== void 0 && ee(H, P, M);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  s.push({
                    title: u,
                    type: "color",
                    value: p.value,
                    onChange: (x, M) => {
                      const P = new Ot(M), H = `material.${o}.${x}.value`;
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
                        E("X", "x", p.value.x),
                        E("Y", "y", p.value.y)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w === void 0)
                  s.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", p.value.x),
                        E("Y", "y", p.value.y),
                        E("Z", "z", p.value.z)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w !== void 0)
                  s.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", p.value.x),
                        E("Y", "y", p.value.y),
                        E("Z", "z", p.value.z),
                        E("W", "w", p.value.w)
                      ]
                    }
                  );
                else if (b.elements !== void 0) {
                  const x = b.elements, M = [];
                  for (let P = 0; P < x.length; P++)
                    M.push(E(P.toString(), P.toString(), x[P]));
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
                  type: `${typeof p.value}`,
                  value: p.value,
                  onChange: (b, E) => {
                    a.updateObject(n.uuid, `material.${o}.${u}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && ee(x, `material.${o}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        s.length > 0 && e.push({
          title: je(o),
          items: s
        });
      }
    else
      m !== void 0 && console.log("other:", o, l, m);
  }
  return e.sort((o, l) => o.title < l.title ? -1 : o.title > l.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function ai(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let l = 0; l < o; l++)
      e.push(
        /* @__PURE__ */ c.jsx(
          Fe,
          {
            title: `Material ${l}`,
            items: Jt(a[l], t, n)
          },
          `Material ${l}`
        )
      );
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: e });
  } else
    return /* @__PURE__ */ c.jsx(
      Fe,
      {
        title: "Material",
        items: Jt(a, t, n)
      }
    );
}
function ot(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Sa(t.value));
  const [a, e] = ae(n), o = ye(null), l = ye(null), m = ye(null);
  Se(() => {
    let v = !1, b = -1, E = 0, x = Number(a);
    const M = (z) => {
      v = !0, E = x, b = z.clientX;
    }, P = (z) => {
      if (!v)
        return;
      const Ee = t.step !== void 0 ? t.step : 1, ce = (z.clientX - b) * Ee;
      x = Number((E + ce).toFixed(4)), l.current !== null && (l.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, H = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, w = t.type === "number";
    return w && (o.current?.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", H, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", B, !1)), () => {
      w && (o.current?.removeEventListener("mousedown", M), document.removeEventListener("mouseup", H), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const s = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = s || t.type === "image", p = (v) => {
    let b = v.target.value;
    t.type === "boolean" ? b = v.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ c.jsx("label", { ref: o, children: st(t.title) }, "fieldLabel"),
    t.type === "string" && !s && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: p,
        value: a
      }
    ),
    t.type === "string" && s && /* @__PURE__ */ c.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: p,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: p,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: l,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        disabled: t.disabled,
        onChange: p
      }
    ),
    t.type === "range" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("input", { type: "text", value: a.toString(), onChange: p, disabled: t.disabled, className: "min" }),
      /* @__PURE__ */ c.jsx(
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
    t.type === "color" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("input", { type: "text", value: a.toString(), onChange: p, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ c.jsx("input", { type: "color", value: a, onChange: p, disabled: t.disabled })
    ] }),
    t.type === "button" && /* @__PURE__ */ c.jsx(
      "button",
      {
        disabled: t.disabled,
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ c.jsx("img", { ref: m, onClick: () => {
      Za().then((v) => {
        m.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : Wa }),
    t.type === "option" && /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx("select", { onChange: p, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((v, b) => /* @__PURE__ */ c.jsx("option", { value: v.value, children: st(v.title) }, b)) }) })
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
function ii(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Qt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, l) => {
          n.updateObject(t.uuid, o, l), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const m = n.scene?.getObjectByProperty("uuid", t.uuid);
          m !== void 0 && (ee(m, o, l), m.updateProjectionMatrix());
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
        onChange: (o, l) => {
          n.updateObject(t.uuid, o, l), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const m = n.scene?.getObjectByProperty("uuid", t.uuid);
          m !== void 0 && (ee(m, o, l), m.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ c.jsx(
    Fe,
    {
      title: "Camera",
      items: a
    }
  );
}
const ri = Math.PI / 180, oi = 180 / Math.PI;
function Xe(t, n, a, e, o) {
  return e + (t - n) * (o - e) / (a - n);
}
function si(t) {
  return t * ri;
}
function Nt(t) {
  return t * oi;
}
function li(t, n) {
  const a = new sa();
  a.elements = t.matrix;
  const e = new q(), o = new la(), l = new q();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), l.setFromMatrixScale(a));
  const m = (u, p) => {
    n.updateObject(t.uuid, u, p);
    const v = n.scene?.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && ee(v, u, p);
  }, s = (u, p) => {
    m(u, si(p));
  };
  return /* @__PURE__ */ c.jsx(
    Fe,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: m
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: m
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: m
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
          value: l.x,
          step: 0.01,
          onChange: m
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: l.y,
          step: 0.01,
          onChange: m
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: l.z,
          step: 0.01,
          onChange: m
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
function ci(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: en(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (l, m) => {
          const s = new Ot(m);
          n.updateObject(t.uuid, l, s);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && ee(u, l, s);
        }
      }) : a.push({
        title: en(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (l, m) => {
          n.updateObject(t.uuid, l, m);
          const s = n.scene?.getObjectByProperty("uuid", t.uuid);
          s !== void 0 && ee(s, l, m);
        }
      }));
    }
  return /* @__PURE__ */ c.jsx(
    Fe,
    {
      title: "Light",
      items: a
    }
  );
}
function ui(t, n) {
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
  const l = n.scene?.getObjectByProperty("uuid", t.uuid);
  let m = !1;
  if (l !== void 0) {
    const s = l.mixer;
    if (m = s !== void 0, m) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: s.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (p, v) => {
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
  return /* @__PURE__ */ c.jsx(Fe, { title: "Animation", items: a });
}
const Ln = {
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
let te = { ...Ln };
function di(t) {
  const [n, a] = ae(-1);
  Se(() => {
    function m(u) {
      te = { ...u.value }, a(Date.now());
    }
    function s() {
      te = { ...Ln }, a(Date.now());
    }
    return k.addEventListener(D.SET_SCENE, s), k.addEventListener(D.SET_OBJECT, m), () => {
      k.removeEventListener(D.SET_SCENE, s), k.removeEventListener(D.SET_OBJECT, m);
    };
  }, []);
  const e = te.type.toLowerCase(), o = te.animations.length > 0 || te.mixer !== void 0, l = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ c.jsx(Gt, { label: "Inspector", children: /* @__PURE__ */ c.jsx("div", { id: "Inspector", className: t.class, children: te.uuid.length > 0 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(
        ot,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: te.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        ot,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: te.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        ot,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: te.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        ot,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: te.visible,
          onChange: (m, s) => {
            t.three.updateObject(te.uuid, m, s);
            const u = t.three.scene?.getObjectByProperty("uuid", te.uuid);
            u !== void 0 && ee(u, m, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      li(te, t.three),
      o ? ui(te, t.three) : null,
      e.search("camera") > -1 ? ii(te, t.three) : null,
      e.search("light") > -1 ? ci(te, t.three) : null,
      l ? ai(te, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ii(t) {
  const [n, a] = ae(t.scene);
  Se(() => {
    const l = (m) => {
      a(m.value);
    };
    return k.addEventListener(D.SET_SCENE, l), () => {
      k.removeEventListener(D.SET_SCENE, l);
    };
  }, []);
  const e = n !== null, o = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ c.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ c.jsx(Gt, { label: o, open: !0, children: /* @__PURE__ */ c.jsx(c.Fragment, { children: e && /* @__PURE__ */ c.jsx(Ha, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ c.jsx(di, { three: t.three })
  ] }, "SidePanel");
}
function Li(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (s) => {
    if (!n())
      return;
    const u = t.three.scene?.getObjectByProperty("uuid", s.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (s, u, p) => {
    if (!n())
      return;
    const v = t.three.scene?.getObjectByProperty("uuid", s);
    v !== void 0 && ee(v, u, p);
  }, o = (s) => {
    if (!n())
      return;
    const u = s.value, { key: p, value: v, uuid: b } = u;
    e(b, p, v);
  }, l = (s) => {
    if (!n())
      return;
    const u = s.value;
    $t(u.value).then((p) => {
      e(u.uuid, u.key, p), e(u.uuid, "material.needsUpdate", !0);
    });
  }, m = (s) => {
    if (!n())
      return;
    const { key: u, uuid: p, value: v, subitem: b } = s.value, E = t.three.scene?.getObjectByProperty("uuid", p);
    if (E !== void 0)
      try {
        b !== void 0 ? Aa(E, b)[u](v) : E[u](v);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(v);
      }
  };
  return Se(() => (k.addEventListener(D.GET_OBJECT, a), k.addEventListener(D.UPDATE_OBJECT, o), k.addEventListener(D.CREATE_TEXTURE, l), k.addEventListener(D.REQUEST_METHOD, m), () => {
    k.removeEventListener(D.GET_OBJECT, a), k.removeEventListener(D.UPDATE_OBJECT, o), k.removeEventListener(D.CREATE_TEXTURE, l), k.removeEventListener(D.REQUEST_METHOD, m);
  }), []), null;
}
const tn = { type: "change" }, Ft = { type: "start" }, nn = { type: "end" }, Ct = new ca(), an = new ua(), fi = Math.cos(70 * da.DEG2RAD);
class pi extends ln {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new q(), this.cursor = new q(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ge.ROTATE, MIDDLE: Ge.DOLLY, RIGHT: Ge.PAN }, this.touches = { ONE: Ve.ROTATE, TWO: Ve.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(r) {
      r.addEventListener("keydown", et), this._domElementKeyEvents = r;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", et), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(tn), e.update(), l = o.NONE;
    }, this.update = function() {
      const r = new q(), y = new Xt().setFromUnitVectors(n.up, new q(0, 1, 0)), O = y.clone().invert(), L = new q(), K = new Xt(), de = new q(), ie = 2 * Math.PI;
      return function(jt = null) {
        const nt = e.object.position;
        r.copy(nt).sub(e.target), r.applyQuaternion(y), s.setFromVector3(r), e.autoRotate && l === o.NONE && U(_(jt)), e.enableDamping ? (s.theta += u.theta * e.dampingFactor, s.phi += u.phi * e.dampingFactor) : (s.theta += u.theta, s.phi += u.phi);
        let he = e.minAzimuthAngle, fe = e.maxAzimuthAngle;
        isFinite(he) && isFinite(fe) && (he < -Math.PI ? he += ie : he > Math.PI && (he -= ie), fe < -Math.PI ? fe += ie : fe > Math.PI && (fe -= ie), he <= fe ? s.theta = Math.max(he, Math.min(fe, s.theta)) : s.theta = s.theta > (he + fe) / 2 ? Math.max(he, s.theta) : Math.min(fe, s.theta)), s.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, s.phi)), s.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && se || e.object.isOrthographicCamera ? s.radius = me(s.radius) : s.radius = me(s.radius * p), r.setFromSpherical(s), r.applyQuaternion(O), nt.copy(e.target).add(r), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), v.set(0, 0, 0));
        let Ae = !1;
        if (e.zoomToCursor && se) {
          let Pe = null;
          if (e.object.isPerspectiveCamera) {
            const ke = r.length();
            Pe = me(ke * p);
            const De = ke - Pe;
            e.object.position.addScaledVector(Ee, De), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const ke = new q(ce.x, ce.y, 0);
            ke.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), Ae = !0;
            const De = new q(ce.x, ce.y, 0);
            De.unproject(e.object), e.object.position.sub(De).add(ke), e.object.updateMatrixWorld(), Pe = r.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Pe !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Pe).add(e.object.position) : (Ct.origin.copy(e.object.position), Ct.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Ct.direction)) < fi ? n.lookAt(e.target) : (an.setFromNormalAndCoplanarPoint(e.object.up, e.target), Ct.intersectPlane(an, e.target))));
        } else
          e.object.isOrthographicCamera && (Ae = p !== 1, Ae && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix()));
        return p = 1, se = !1, Ae || L.distanceToSquared(e.object.position) > m || 8 * (1 - K.dot(e.object.quaternion)) > m || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(tn), L.copy(e.object.position), K.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", ze), e.domElement.removeEventListener("pointerdown", Re), e.domElement.removeEventListener("pointercancel", _e), e.domElement.removeEventListener("wheel", vt), e.domElement.removeEventListener("pointermove", Je), e.domElement.removeEventListener("pointerup", _e), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", et), e._domElementKeyEvents = null);
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
    let l = o.NONE;
    const m = 1e-6, s = new Kt(), u = new Kt();
    let p = 1;
    const v = new q(), b = new ue(), E = new ue(), x = new ue(), M = new ue(), P = new ue(), H = new ue(), B = new ue(), w = new ue(), z = new ue(), Ee = new q(), ce = new ue();
    let se = !1;
    const d = [], h = {};
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
      const r = new q();
      return function(O, L) {
        r.setFromMatrixColumn(L, 0), r.multiplyScalar(-O), v.add(r);
      };
    }(), W = function() {
      const r = new q();
      return function(O, L) {
        e.screenSpacePanning === !0 ? r.setFromMatrixColumn(L, 1) : (r.setFromMatrixColumn(L, 0), r.crossVectors(e.object.up, r)), r.multiplyScalar(O), v.add(r);
      };
    }(), X = function() {
      const r = new q();
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
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function J(r, y) {
      if (!e.zoomToCursor)
        return;
      se = !0;
      const O = e.domElement.getBoundingClientRect(), L = r - O.left, K = y - O.top, de = O.width, ie = O.height;
      ce.x = L / de * 2 - 1, ce.y = -(K / ie) * 2 + 1, Ee.set(ce.x, ce.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function me(r) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, r));
    }
    function Ce(r) {
      b.set(r.clientX, r.clientY);
    }
    function ut(r) {
      J(r.clientX, r.clientX), B.set(r.clientX, r.clientY);
    }
    function Ke(r) {
      M.set(r.clientX, r.clientY);
    }
    function Tt(r) {
      E.set(r.clientX, r.clientY), x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E), e.update();
    }
    function Rt(r) {
      w.set(r.clientX, r.clientY), z.subVectors(w, B), z.y > 0 ? T(Y(z.y)) : z.y < 0 && N(Y(z.y)), B.copy(w), e.update();
    }
    function qe(r) {
      P.set(r.clientX, r.clientY), H.subVectors(P, M).multiplyScalar(e.panSpeed), X(H.x, H.y), M.copy(P), e.update();
    }
    function Ze(r) {
      J(r.clientX, r.clientY), r.deltaY < 0 ? N(Y(r.deltaY)) : r.deltaY > 0 && T(Y(r.deltaY)), e.update();
    }
    function Ue(r) {
      let y = !1;
      switch (r.code) {
        case e.keys.UP:
          r.ctrlKey || r.metaKey || r.shiftKey ? $(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : X(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          r.ctrlKey || r.metaKey || r.shiftKey ? $(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : X(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          r.ctrlKey || r.metaKey || r.shiftKey ? U(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : X(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          r.ctrlKey || r.metaKey || r.shiftKey ? U(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : X(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (r.preventDefault(), e.update());
    }
    function $e(r) {
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
    function dt(r) {
      const y = we(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      B.set(0, K);
    }
    function ft(r) {
      e.enableZoom && dt(r), e.enablePan && Oe(r);
    }
    function _t(r) {
      e.enableZoom && dt(r), e.enableRotate && $e(r);
    }
    function pt(r) {
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
      H.subVectors(P, M).multiplyScalar(e.panSpeed), X(H.x, H.y), M.copy(P);
    }
    function Te(r) {
      const y = we(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      w.set(0, K), z.set(0, Math.pow(w.y / B.y, e.zoomSpeed)), T(z.y), B.copy(w);
      const de = (r.pageX + y.x) * 0.5, ie = (r.pageY + y.y) * 0.5;
      J(de, ie);
    }
    function ht(r) {
      e.enableZoom && Te(r), e.enablePan && Me(r);
    }
    function mt(r) {
      e.enableZoom && Te(r), e.enableRotate && pt(r);
    }
    function Re(r) {
      e.enabled !== !1 && (d.length === 0 && (e.domElement.setPointerCapture(r.pointerId), e.domElement.addEventListener("pointermove", Je), e.domElement.addEventListener("pointerup", _e)), Pt(r), r.pointerType === "touch" ? tt(r) : Qe(r));
    }
    function Je(r) {
      e.enabled !== !1 && (r.pointerType === "touch" ? yt(r) : At(r));
    }
    function _e(r) {
      switch (kt(r), d.length) {
        case 0:
          e.domElement.releasePointerCapture(r.pointerId), e.domElement.removeEventListener("pointermove", Je), e.domElement.removeEventListener("pointerup", _e), e.dispatchEvent(nn), l = o.NONE;
          break;
        case 1:
          const y = d[0], O = h[y];
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
        case Ge.DOLLY:
          if (e.enableZoom === !1)
            return;
          ut(r), l = o.DOLLY;
          break;
        case Ge.ROTATE:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enablePan === !1)
              return;
            Ke(r), l = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Ce(r), l = o.ROTATE;
          }
          break;
        case Ge.PAN:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Ce(r), l = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Ke(r), l = o.PAN;
          }
          break;
        default:
          l = o.NONE;
      }
      l !== o.NONE && e.dispatchEvent(Ft);
    }
    function At(r) {
      switch (l) {
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
          qe(r);
          break;
      }
    }
    function vt(r) {
      e.enabled === !1 || e.enableZoom === !1 || l !== o.NONE || (r.preventDefault(), e.dispatchEvent(Ft), Ze(gt(r)), e.dispatchEvent(nn));
    }
    function gt(r) {
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
    function bt(r) {
      r.key === "Control" && (S = !0, e.domElement.getRootNode().addEventListener("keyup", xe, { passive: !0, capture: !0 }));
    }
    function xe(r) {
      r.key === "Control" && (S = !1, e.domElement.getRootNode().removeEventListener("keyup", xe, { passive: !0, capture: !0 }));
    }
    function et(r) {
      e.enabled === !1 || e.enablePan === !1 || Ue(r);
    }
    function tt(r) {
      switch (Et(r), d.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ve.ROTATE:
              if (e.enableRotate === !1)
                return;
              $e(r), l = o.TOUCH_ROTATE;
              break;
            case Ve.PAN:
              if (e.enablePan === !1)
                return;
              Oe(r), l = o.TOUCH_PAN;
              break;
            default:
              l = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ve.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              ft(r), l = o.TOUCH_DOLLY_PAN;
              break;
            case Ve.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              _t(r), l = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              l = o.NONE;
          }
          break;
        default:
          l = o.NONE;
      }
      l !== o.NONE && e.dispatchEvent(Ft);
    }
    function yt(r) {
      switch (Et(r), l) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          pt(r), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Me(r), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          ht(r), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          mt(r), e.update();
          break;
        default:
          l = o.NONE;
      }
    }
    function ze(r) {
      e.enabled !== !1 && r.preventDefault();
    }
    function Pt(r) {
      d.push(r.pointerId);
    }
    function kt(r) {
      delete h[r.pointerId];
      for (let y = 0; y < d.length; y++)
        if (d[y] == r.pointerId) {
          d.splice(y, 1);
          return;
        }
    }
    function Et(r) {
      let y = h[r.pointerId];
      y === void 0 && (y = new ue(), h[r.pointerId] = y), y.set(r.pageX, r.pageY);
    }
    function we(r) {
      const y = r.pointerId === d[0] ? d[1] : d[0];
      return h[y];
    }
    e.domElement.addEventListener("contextmenu", ze), e.domElement.addEventListener("pointerdown", Re), e.domElement.addEventListener("pointercancel", _e), e.domElement.addEventListener("wheel", vt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", bt, { passive: !0, capture: !0 }), this.update();
  }
}
const St = (t) => {
  const [n, a] = ae(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, o = (l) => {
    l !== n && (t.onSelect(l), a(l)), t.onToggle(!1);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ c.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ c.jsx("ul", { className: "dropdown-menu", children: t.options.map((l) => /* @__PURE__ */ c.jsx("li", { onClick: () => o(l), children: l }, l)) })
  ] });
}, Ie = Ca(function(n, a) {
  const [e, o] = ae(!1), l = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ c.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ c.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && o(!1);
    } }),
    /* @__PURE__ */ c.jsx(
      St,
      {
        index: l,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (m) => {
          o(m);
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
Be("Top", new q(0, 1e3, 0));
Be("Bottom", new q(0, -1e3, 0));
Be("Left", new q(-1e3, 0, 0));
Be("Right", new q(1e3, 0, 0));
Be("Front", new q(0, 0, 1e3));
Be("Back", new q(0, 0, -1e3));
Be("Orthographic", new q(1e3, 1e3, 1e3));
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
], hi = new fa(), mi = new pa(), vi = new Va(), gi = new ha({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let xt = "Renderer";
const V = new Tn();
V.name = "Debug Scene";
let be = new Tn();
V.add(be);
const ct = new ma();
ct.name = "helpers";
V.add(ct);
const bi = new za();
ct.add(bi);
const Nn = new Rn(500);
Nn.name = "axisHelper";
ct.add(Nn);
const lt = new Rn(100);
lt.name = "interactionHelper";
ct.add(lt);
lt.visible = !1;
let wt = !1, G = ne.get("Debug"), oe = ne.get("Orthographic"), Le = ne.get("Front"), Ne = ne.get("Top"), sn = !1;
function Ni(t) {
  const [n, a] = ae(t.mode !== void 0 ? t.mode : "Single"), [e, o] = ae(null), [l, m] = ae(!1), [s, u] = ae(!1), [p, v] = ae(!1), [, b] = ae(Date.now()), E = ye(null), x = ye(null), M = ye(null), P = ye(null), H = ye(null), B = ye(null), w = (d, h) => {
    const S = re.get(d.name);
    S !== void 0 && S.dispose(), re.delete(d.name);
    const _ = ge.get(d.name);
    _ !== void 0 && (V.remove(_), _.dispose()), ge.delete(d.name);
    const Y = new pi(d, h);
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
    if (re.set(d.name, Y), d instanceof Bt) {
      const U = new ba(d);
      ge.set(d.name, U), V.add(U);
    }
  }, z = (d) => {
    const h = ge.get(d.name);
    h !== void 0 && (V.remove(h), h.dispose(), ge.delete(d.name));
    const S = re.get(d.name);
    S !== void 0 && (S.dispose(), re.delete(d.name));
  }, Ee = () => {
    re.forEach((d, h) => {
      d.dispose();
      const S = ge.get(h);
      S !== void 0 && (V.remove(S), S.dispose()), ge.delete(h), re.delete(h);
    }), re.clear(), ge.clear();
  }, ce = () => {
    switch (n) {
      case "Single":
        w(G, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        w(G, M.current), w(oe, P.current);
        break;
      case "Quad":
        w(G, M.current), w(oe, P.current), w(Le, H.current), w(Ne, B.current);
        break;
    }
  };
  Se(() => {
    const d = new va({
      canvas: E.current,
      stencil: !1
    });
    d.autoClear = !1, d.shadowMap.enabled = !0, d.setPixelRatio(devicePixelRatio), d.setClearColor(0), o(d);
  }, []), Se(() => {
    const d = (_) => {
      kn(be), V.remove(be);
      const Y = t.scenes.get(_.value.name);
      if (Y !== void 0) {
        const U = new Y();
        t.onSceneSet !== void 0 && t.onSceneSet(U), be = U, t.three.scene = be, V.add(be), sn = !0;
      }
    }, h = (_) => {
      const Y = _.value, U = t.three.scene?.getObjectByProperty("uuid", Y.uuid);
      U !== void 0 && ne.set(Y.name, U), b(Date.now());
    }, S = (_) => {
      ne.delete(_.value.name), b(Date.now());
    };
    return k.addEventListener(D.SET_SCENE, d), k.addEventListener(D.ADD_CAMERA, h), k.addEventListener(D.REMOVE_CAMERA, S), () => {
      k.removeEventListener(D.SET_SCENE, d), k.removeEventListener(D.ADD_CAMERA, h), k.removeEventListener(D.REMOVE_CAMERA, S);
    };
  }, []), Se(() => {
    if (e === null)
      return;
    let d = window.innerWidth, h = window.innerHeight, S = Math.floor(d / 2), _ = Math.floor(h / 2), Y = -1;
    const U = () => {
      d = window.innerWidth - 300, h = window.innerHeight, S = Math.floor(d / 2), _ = Math.floor(h / 2), e.setSize(d, h);
      let T = d, N = h;
      switch (n) {
        case "Side by Side":
          T = S, N = h;
          break;
        case "Stacked":
          T = d, N = _;
          break;
        case "Quad":
          T = S, N = _;
          break;
      }
      ne.forEach((J) => {
        J instanceof Mn ? (J.left = T / -2, J.right = T / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof Bt && (J.aspect = T / N, J.updateProjectionMatrix(), ge.get(J.name)?.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, d, h), e.setScissor(0, 0, d, h), e.render(V, G);
    }, I = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, S, h), e.setScissor(0, 0, S, h), e.render(V, G), e.setViewport(S, 0, S, h), e.setScissor(S, 0, S, h), e.render(V, oe);
      else {
        const T = h - _;
        e.setViewport(0, T, d, _), e.setScissor(0, T, d, _), e.render(V, G), e.setViewport(0, 0, d, _), e.setScissor(0, 0, d, _), e.render(V, oe);
      }
    }, W = () => {
      let T = 0, N = 0;
      N = h - _, T = 0, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, G), T = S, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, oe), N = 0, T = 0, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, Le), T = S, e.setViewport(T, N, S, _), e.setScissor(T, N, S, _), e.render(V, Ne);
    }, X = () => {
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
      Y = requestAnimationFrame(X);
    };
    return ce(), window.addEventListener("resize", U), U(), X(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(Y), Y = -1;
    };
  }, [n, e]), Se(() => {
    if (e !== null) {
      const d = new ga(), h = new ue(), S = ($, I, W, X) => {
        switch (n) {
          case "Quad":
            $ < W ? I < X ? d.setFromCamera(h, G) : d.setFromCamera(h, Le) : I < X ? d.setFromCamera(h, oe) : d.setFromCamera(h, Ne);
            break;
          case "Side by Side":
            $ < W ? d.setFromCamera(h, G) : d.setFromCamera(h, oe);
            break;
          case "Single":
            d.setFromCamera(h, G);
            break;
          case "Stacked":
            I < X ? d.setFromCamera(h, G) : d.setFromCamera(h, oe);
            break;
        }
      }, _ = ($) => {
        if (!wt)
          return;
        const I = new ue();
        e.getSize(I);
        const W = Math.min($.clientX, I.x), X = Math.min($.clientY, I.y);
        h.x = Xe(W, 0, I.x, -1, 1), h.y = Xe(X, 0, I.y, 1, -1);
        const T = I.x / 2, N = I.y / 2, J = () => {
          W < T ? h.x = Xe(W, 0, T, -1, 1) : h.x = Xe(W, T, I.x, -1, 1);
        }, me = () => {
          X < N ? h.y = Xe(X, 0, N, 1, -1) : h.y = Xe(X, N, I.y, 1, -1);
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
        S(W, X, T, N);
        const Ce = d.intersectObjects(be.children);
        Ce.length > 0 && lt.position.copy(Ce[0].point);
      }, Y = ($) => {
        if (!wt)
          return;
        const I = new ue();
        if (e.getSize(I), $.clientX >= I.x)
          return;
        _($);
        const W = d.intersectObjects(be.children);
        W.length > 0 && t.three.getObject(W[0].object.uuid);
      }, U = x.current;
      return U.addEventListener("mousemove", _, !1), U.addEventListener("click", Y, !1), () => {
        U.removeEventListener("mousemove", _), U.removeEventListener("click", Y);
      };
    }
  }, [n, e]);
  const se = [];
  return ne.forEach((d, h) => {
    se.push(h);
  }), /* @__PURE__ */ c.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ c.jsx("canvas", { ref: E }),
    /* @__PURE__ */ c.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: x, children: [
      n === "Single" && /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(Ie, { camera: G, options: se, ref: M, onSelect: (d) => {
        re.get(G.name)?.dispose();
        const h = ne.get(d);
        h !== void 0 && (z(G), G = h, w(h, M.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ie, { camera: G, options: se, ref: M, onSelect: (d) => {
          re.get(G.name)?.dispose();
          const h = ne.get(d);
          h !== void 0 && (z(G), G = h, w(h, M.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: oe, options: se, ref: P, onSelect: (d) => {
          re.get(oe.name)?.dispose();
          const h = ne.get(d);
          h !== void 0 && (z(oe), oe = h, w(h, P.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ie, { camera: G, options: se, ref: M, onSelect: (d) => {
          re.get(G.name)?.dispose();
          const h = ne.get(d);
          h !== void 0 && (z(G), G = h, w(h, M.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: oe, options: se, ref: P, onSelect: (d) => {
          re.get(oe.name)?.dispose();
          const h = ne.get(d);
          h !== void 0 && (z(oe), oe = h, w(h, P.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: Le, options: se, ref: H, onSelect: (d) => {
          re.get(Le.name)?.dispose();
          const h = ne.get(d);
          h !== void 0 && (z(Le), Le = h, w(h, H.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: Ne, options: se, ref: B, onSelect: (d) => {
          re.get(Ne.name)?.dispose();
          const h = ne.get(d);
          h !== void 0 && (z(Ne), Ne = h, w(h, B.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ c.jsx(
        St,
        {
          index: rn.indexOf(n),
          options: rn,
          onSelect: (d) => {
            d !== n && (Ee(), a(d));
          },
          open: l,
          onToggle: (d) => {
            m(d), s && u(!1), p && v(!1);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        St,
        {
          index: on.indexOf(xt),
          options: on,
          onSelect: (d) => {
            if (d !== xt)
              switch (xt = d, xt) {
                case "Depth":
                  V.overrideMaterial = hi;
                  break;
                case "Normals":
                  V.overrideMaterial = mi;
                  break;
                default:
                case "Renderer":
                  V.overrideMaterial = null;
                  break;
                case "Wireframe":
                  V.overrideMaterial = gi;
                  break;
                case "UVs":
                  V.overrideMaterial = vi;
                  break;
              }
          },
          open: s,
          onToggle: (d) => {
            l && m(!1), u(d), p && v(!1);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        St,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (d) => {
            wt = d === "Selection Mode", lt.visible = wt;
          },
          open: p,
          onToggle: (d) => {
            l && m(!1), s && u(!1), v(d);
          }
        }
      )
    ] })
  ] });
}
function Fi(t) {
  return /* @__PURE__ */ c.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ c.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ c.jsx("footer", { children: t.footer })
  ] });
}
export {
  Gt as Accordion,
  _i as Application,
  Yt as BaseRemote,
  In as ChildObject,
  Ha as ContainerObject,
  La as Draggable,
  Ia as DraggableItem,
  Na as Dropdown,
  Fa as DropdownItem,
  Fi as Editor,
  za as InfiniteGridHelper,
  di as Inspector,
  Ni as MultiView,
  jn as NavButton,
  Ai as RemoteComponents,
  ji as RemoteController,
  ki as RemoteThree,
  Di as RemoteTweakpane,
  Li as SceneInspector,
  Ii as SidePanel,
  D as ToolEvents,
  Va as UVMaterial,
  st as capitalize,
  Oi as clamp,
  Sa as colorToHex,
  k as debugDispatcher,
  Si as defaultTheatreCallback,
  kn as dispose,
  Ma as disposeMaterial,
  Ri as disposeTexture,
  Mi as distance,
  Pn as hierarchyUUID,
  Ti as isColor,
  xa as noop,
  wa as randomID,
  Oa as resetThreeObjects,
  It as round,
  Pi as theatreEditorApp,
  Ut as totalThreeObjects
};
