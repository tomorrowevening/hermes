var On = Object.defineProperty;
var Tn = (t, n, i) => n in t ? On(t, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[n] = i;
var q = (t, n, i) => (Tn(t, typeof n != "symbol" ? n + "" : n, i), i);
import { PositionalAudio as Mn, EventDispatcher as rn, Texture as an, CubeTexture as Rn, RepeatWrapping as $t, ShaderMaterial as on, GLSL3 as Pn, DoubleSide as jn, Color as It, Mesh as _n, PlaneGeometry as Dn, Matrix4 as kn, Vector3 as G, Euler as An, Ray as In, Plane as Nn, MathUtils as Ln, MOUSE as ze, TOUCH as Ye, Quaternion as Vt, Spherical as Gt, Vector2 as ue, PerspectiveCamera as _t, MeshDepthMaterial as Fn, MeshNormalMaterial as Un, MeshBasicMaterial as Bn, OrthographicCamera as sn, Scene as cn, Group as $n, AxesHelper as ln, WebGLRenderer as Vn, Raycaster as Gn, CameraHelper as zn } from "three";
import { getProject as Yn } from "@theatre/core";
import "@theatre/studio";
import { Pane as Wn } from "tweakpane";
import * as Hn from "@tweakpane/plugin-essentials";
import un, { useState as ae, useRef as we, useEffect as Ne, Component as Kn, forwardRef as Xn } from "react";
import { Reorder as dn } from "framer-motion";
function Ki(t, n, i) {
  return Math.min(n, Math.max(t, i));
}
function Xi(t, n) {
  const i = t - n;
  return Math.sqrt(i * i);
}
function Zn() {
  return Math.round(Math.random() * 1e6).toString();
}
function qn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Qn(t) {
  const n = Math.round(t.r * 255), i = Math.round(t.g * 255), e = Math.round(t.b * 255), a = (d) => {
    const m = d.toString(16);
    return m.length === 1 ? "0" + m : m;
  }, s = a(n), h = a(i), l = a(e);
  return "#" + s + h + l;
}
function Mt(t, n = 1) {
  return Number(t.toFixed(n));
}
let Dt = 0;
const Jn = () => {
  Dt = 0;
}, fn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Dt}`, Dt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((i) => {
    fn(i);
  });
}, Zi = (t) => {
  t == null || t.dispose();
}, ei = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, hn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const i = t.children[0];
      i instanceof Mn ? (i.pause(), i.parent && i.parent.remove(i)) : hn(i);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const i = t;
      (n = i.geometry) == null || n.dispose(), ei(i.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class qi {
  constructor(n, i, e = "editor") {
    q(this, "channel");
    q(this, "components", /* @__PURE__ */ new Map());
    // Protected
    q(this, "_mode", "app");
    this.editor = i && document.location.hash.search(e) > -1, i && (this.channel = new BroadcastChannel(n));
  }
  addComponent(n, i) {
    this.components.set(n, i);
  }
  dispose() {
    this.components.forEach((n) => {
      n.dispose();
    }), this.components.clear();
  }
  // Remote
  send(n) {
    this.channel !== void 0 && this._mode !== n.target && this.channel.postMessage(n);
  }
  listen(n) {
    this.channel !== void 0 && (this.channel.onmessage = (i) => {
      n(i.data);
    });
  }
  // Getters / Setters
  get mode() {
    return this._mode;
  }
  get editor() {
    return this._mode === "editor";
  }
  set editor(n) {
    n && (this._mode = "editor", document.title += " - Editor");
  }
}
const z = new rn(), Y = {
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
class Et {
  constructor(n) {
    q(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class Qi extends Et {
  selectDropdown(n, i) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: n,
        value: i
      }
    });
  }
  updateDropdown(n, i) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: n,
        value: i
      }
    });
  }
}
const pn = () => {
};
class Ji extends Et {
  constructor(i, e, a) {
    super(i);
    q(this, "project");
    q(this, "sheets");
    q(this, "sheetObjects");
    q(this, "sheetObjectCBs");
    q(this, "sheetObjectUnsubscribe");
    this.project = Yn(e, a), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(i) {
    var a;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let e = this.sheets.get(i);
    return e !== void 0 || (e = (a = this.project) == null ? void 0 : a.sheet(i), this.sheets.set(i, e)), e;
  }
  sheetObject(i, e, a, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const h = this.sheets.get(i);
    if (h === void 0)
      return;
    const l = `${i}_${e}`;
    let d = this.sheetObjects.get(l);
    if (d !== void 0)
      return d = h.object(e, { ...a, ...d.value }, { reconfigure: !0 }), d;
    d = h.object(e, a), this.sheetObjects.set(l, d), this.sheetObjectCBs.set(l, s !== void 0 ? s : pn);
    const m = d.onValuesChange((v) => {
      if (this.app.editor) {
        for (const E in v) {
          const x = v[E];
          typeof x == "object" && qn(x) && (v[E] = {
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
            sheetObject: l,
            values: v
          }
        });
      } else {
        const E = this.sheetObjectCBs.get(l);
        E !== void 0 && E(v);
      }
    });
    return this.sheetObjectUnsubscribe.set(l, m), d;
  }
  unsubscribe(i) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = `${i.address.sheetId}_${i.address.objectKey}`, a = this.sheetObjectUnsubscribe.get(e);
    a !== void 0 && a();
  }
}
function ti(t) {
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
function mn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((i) => {
    n.children.push(mn(i));
  }), n;
}
function ni(t) {
  const n = {};
  for (const i in t) {
    const e = t[i].value;
    n[i] = { value: e }, e === null ? n[i].value = { src: "" } : e.isTexture && (n[i].value = { src: e.image.src });
  }
  return n;
}
function ii(t) {
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
function zt(t) {
  const n = {};
  for (const i in t) {
    if (i.substring(0, 1) === "_" || i.substring(0, 2) === "is" || ii(i))
      continue;
    const e = typeof t[i], a = t[i];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[i] = a;
        break;
      case "object":
        if (a !== null)
          if (n[i] = a, a.isTexture)
            if (a instanceof an) {
              const s = a.source.toJSON();
              n[i] = { src: s.url };
            } else
              a instanceof Rn && (console.log("env map"), console.log(a.source.data), console.log(a.source.toJSON()), n[i] = { src: "" });
          else
            i === "uniforms" && (n[i] = ni(n[i]));
        else
          n[i] = { src: "" };
        break;
    }
  }
  return n;
}
function Rt(t) {
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
  const i = t.type.toLowerCase();
  if (i.search("mesh") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const a = [];
      e.material.forEach((s) => {
        a.push(zt(s));
      }), n.material = a;
    } else
      n.material = zt(e.material);
  } else
    i.search("camera") > -1 ? t.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
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
    }) : i.search("light") > -1 && (n.lightInfo = {
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
function J(t, n, i) {
  const e = n.split(".");
  switch (e.length) {
    case 1:
      t[e[0]] = i;
      break;
    case 2:
      t[e[0]][e[1]] = i;
      break;
    case 3:
      t[e[0]][e[1]][e[2]] = i;
      break;
    case 4:
      t[e[0]][e[1]][e[2]][e[3]] = i;
      break;
    case 5:
      t[e[0]][e[1]][e[2]][e[3]][e[4]] = i;
      break;
  }
}
function kt(t) {
  return new Promise((n, i) => {
    const e = new Image();
    e.onload = () => {
      const a = new an(e);
      a.wrapS = $t, a.wrapT = $t, a.needsUpdate = !0, n(a);
    }, e.onerror = i, e.src = t;
  });
}
class er extends Et {
  constructor() {
    super(...arguments);
    q(this, "scene");
  }
  getObject(i) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: i
    });
  }
  setObject(i) {
    const e = Rt(i);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(i, e, a) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: i,
        key: e,
        value: a
      }
    });
  }
  updateObject(i, e, a) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: i,
        key: e,
        value: a
      }
    });
  }
  createTexture(i, e, a) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: i,
        key: e,
        value: a
      }
    });
  }
  setScene(i) {
    if (i === void 0)
      return;
    this.scene = i, Jn(), fn(this.scene);
    const e = mn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(i) {
    const e = Rt(i);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(i) {
    const e = Rt(i);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
class tr extends Et {
  constructor(i) {
    super(i);
    q(this, "bindCBs");
    q(this, "buttonCBs");
    q(this, "pane");
    q(this, "appCallbacks", 0);
    q(this, "editorCallbacks", 0);
    q(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), i.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Wn({ title: "GUI" }), this.pane.registerPlugin(Hn);
  }
  dispose() {
    var i;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((i = this.pane) == null || i.dispose(), this.pane = void 0);
  }
  addFolder(i, e = void 0, a = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (a !== void 0 ? a : this.pane).addFolder({
        title: i,
        ...e
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: i,
        params: e,
        parent: a
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(i, e, a, s = void 0) {
    const h = this.bindID, l = a.onChange !== void 0 ? a.onChange : pn;
    this.bindCBs.set(h, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(i, e, a).on("change", (m) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: h,
          value: m.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: h,
        name: e,
        params: a,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(i, e) {
    const a = this.bindCBs.get(i);
    a !== void 0 ? a(e) : console.warn(`No callback for: ${i}`, e);
  }
  // Buttons
  button(i, e, a = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (a !== void 0 ? a : this.pane).addButton({ title: i }).on("click", () => {
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
        name: i,
        callback: e,
        parent: a
      }
    }), this.appCallbacks++);
  }
  triggerButton(i) {
    const e = this.buttonCBs.get(i);
    e !== void 0 && e();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const i = this.inspectorFolder.children.length - 1;
    for (let e = i; e > -1; --e)
      this.inspectorFolder.remove(this.inspectorFolder.children[e]);
  }
}
var At = { exports: {} }, et = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yt;
function ri() {
  if (Yt)
    return et;
  Yt = 1;
  var t = un, n = Symbol.for("react.element"), i = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(l, d, m) {
    var v, E = {}, x = null, R = null;
    m !== void 0 && (x = "" + m), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (R = d.ref);
    for (v in d)
      e.call(d, v) && !s.hasOwnProperty(v) && (E[v] = d[v]);
    if (l && l.defaultProps)
      for (v in d = l.defaultProps, d)
        E[v] === void 0 && (E[v] = d[v]);
    return { $$typeof: n, type: l, key: x, ref: R, props: E, _owner: a.current };
  }
  return et.Fragment = i, et.jsx = h, et.jsxs = h, et;
}
var tt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wt;
function ai() {
  return Wt || (Wt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = un, n = Symbol.for("react.element"), i = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), R = Symbol.for("react.offscreen"), T = Symbol.iterator, B = "@@iterator";
    function oe(r) {
      if (r === null || typeof r != "object")
        return null;
      var f = T && r[T] || r[B];
      return typeof f == "function" ? f : null;
    }
    var H = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(r) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), w = 1; w < f; w++)
          g[w - 1] = arguments[w];
        K("error", r, g);
      }
    }
    function K(r, f, g) {
      {
        var w = H.ReactDebugCurrentFrame, j = w.getStackAddendum();
        j !== "" && (f += "%s", g = g.concat([j]));
        var I = g.map(function(P) {
          return String(P);
        });
        I.unshift("Warning: " + f), Function.prototype.apply.call(console[r], console, I);
      }
    }
    var de = !1, ce = !1, ee = !1, u = !1, p = !1, b;
    b = Symbol.for("react.module.reference");
    function S(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === s || p || r === a || r === m || r === v || u || r === R || de || ce || ee || typeof r == "object" && r !== null && (r.$$typeof === x || r.$$typeof === E || r.$$typeof === h || r.$$typeof === l || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === b || r.getModuleId !== void 0));
    }
    function F(r, f, g) {
      var w = r.displayName;
      if (w)
        return w;
      var j = f.displayName || f.name || "";
      return j !== "" ? g + "(" + j + ")" : g;
    }
    function U(r) {
      return r.displayName || "Context";
    }
    function N(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case e:
          return "Fragment";
        case i:
          return "Portal";
        case s:
          return "Profiler";
        case a:
          return "StrictMode";
        case m:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case l:
            var f = r;
            return U(f) + ".Consumer";
          case h:
            var g = r;
            return U(g._context) + ".Provider";
          case d:
            return F(r, r.render, "ForwardRef");
          case E:
            var w = r.displayName || null;
            return w !== null ? w : N(r.type) || "Memo";
          case x: {
            var j = r, I = j._payload, P = j._init;
            try {
              return N(P(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, L = 0, Q, M, k, X, pe, Te, He;
    function at() {
    }
    at.__reactDisabledLog = !0;
    function wt() {
      {
        if (L === 0) {
          Q = console.log, M = console.info, k = console.warn, X = console.error, pe = console.group, Te = console.groupCollapsed, He = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: at,
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
        L++;
      }
    }
    function Ct() {
      {
        if (L--, L === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, r, {
              value: Q
            }),
            info: D({}, r, {
              value: M
            }),
            warn: D({}, r, {
              value: k
            }),
            error: D({}, r, {
              value: X
            }),
            group: D({}, r, {
              value: pe
            }),
            groupCollapsed: D({}, r, {
              value: Te
            }),
            groupEnd: D({}, r, {
              value: He
            })
          });
        }
        L < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ke = H.ReactCurrentDispatcher, Xe;
    function Me(r, f, g) {
      {
        if (Xe === void 0)
          try {
            throw Error();
          } catch (j) {
            var w = j.stack.trim().match(/\n( *(at )?)/);
            Xe = w && w[1] || "";
          }
        return `
` + Xe + r;
      }
    }
    var Ue = !1, Re;
    {
      var St = typeof WeakMap == "function" ? WeakMap : Map;
      Re = new St();
    }
    function ot(r, f) {
      if (!r || Ue)
        return "";
      {
        var g = Re.get(r);
        if (g !== void 0)
          return g;
      }
      var w;
      Ue = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = Ke.current, Ke.current = null, wt();
      try {
        if (f) {
          var P = function() {
            throw Error();
          };
          if (Object.defineProperty(P.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(P, []);
            } catch (ye) {
              w = ye;
            }
            Reflect.construct(r, [], P);
          } else {
            try {
              P.call();
            } catch (ye) {
              w = ye;
            }
            r.call(P.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ye) {
            w = ye;
          }
          r();
        }
      } catch (ye) {
        if (ye && w && typeof ye.stack == "string") {
          for (var O = ye.stack.split(`
`), se = w.stack.split(`
`), W = O.length - 1, Z = se.length - 1; W >= 1 && Z >= 0 && O[W] !== se[Z]; )
            Z--;
          for (; W >= 1 && Z >= 0; W--, Z--)
            if (O[W] !== se[Z]) {
              if (W !== 1 || Z !== 1)
                do
                  if (W--, Z--, Z < 0 || O[W] !== se[Z]) {
                    var me = `
` + O[W].replace(" at new ", " at ");
                    return r.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", r.displayName)), typeof r == "function" && Re.set(r, me), me;
                  }
                while (W >= 1 && Z >= 0);
              break;
            }
        }
      } finally {
        Ue = !1, Ke.current = I, Ct(), Error.prepareStackTrace = j;
      }
      var Ge = r ? r.displayName || r.name : "", Bt = Ge ? Me(Ge) : "";
      return typeof r == "function" && Re.set(r, Bt), Bt;
    }
    function st(r, f, g) {
      return ot(r, !1);
    }
    function ct(r) {
      var f = r.prototype;
      return !!(f && f.isReactComponent);
    }
    function Pe(r, f, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return ot(r, ct(r));
      if (typeof r == "string")
        return Me(r);
      switch (r) {
        case m:
          return Me("Suspense");
        case v:
          return Me("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return st(r.render);
          case E:
            return Pe(r.type, f, g);
          case x: {
            var w = r, j = w._payload, I = w._init;
            try {
              return Pe(I(j), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Be = Object.prototype.hasOwnProperty, lt = {}, Ze = H.ReactDebugCurrentFrame;
    function Ce(r) {
      if (r) {
        var f = r._owner, g = Pe(r.type, r._source, f ? f.type : null);
        Ze.setExtraStackFrame(g);
      } else
        Ze.setExtraStackFrame(null);
    }
    function je(r, f, g, w, j) {
      {
        var I = Function.call.bind(Be);
        for (var P in r)
          if (I(r, P)) {
            var O = void 0;
            try {
              if (typeof r[P] != "function") {
                var se = Error((w || "React class") + ": " + g + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw se.name = "Invariant Violation", se;
              }
              O = r[P](f, P, w, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (W) {
              O = W;
            }
            O && !(O instanceof Error) && (Ce(j), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", g, P, typeof O), Ce(null)), O instanceof Error && !(O.message in lt) && (lt[O.message] = !0, Ce(j), C("Failed %s type: %s", g, O.message), Ce(null));
          }
      }
    }
    var Ot = Array.isArray;
    function qe(r) {
      return Ot(r);
    }
    function ut(r) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g;
      }
    }
    function Qe(r) {
      try {
        return dt(r), !1;
      } catch {
        return !0;
      }
    }
    function dt(r) {
      return "" + r;
    }
    function ft(r) {
      if (Qe(r))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ut(r)), dt(r);
    }
    var Se = H.ReactCurrentOwner, Tt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ht, Je, ge;
    ge = {};
    function o(r) {
      if (Be.call(r, "ref")) {
        var f = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function y(r) {
      if (Be.call(r, "key")) {
        var f = Object.getOwnPropertyDescriptor(r, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function _(r, f) {
      if (typeof r.ref == "string" && Se.current && f && Se.current.stateNode !== f) {
        var g = N(Se.current.type);
        ge[g] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N(Se.current.type), r.ref), ge[g] = !0);
      }
    }
    function A(r, f) {
      {
        var g = function() {
          ht || (ht = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function te(r, f) {
      {
        var g = function() {
          Je || (Je = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var ve = function(r, f, g, w, j, I, P) {
      var O = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: f,
        ref: g,
        props: P,
        // Record the component responsible for creating this element.
        _owner: I
      };
      return O._store = {}, Object.defineProperty(O._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(O, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(O, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    };
    function le(r, f, g, w, j) {
      {
        var I, P = {}, O = null, se = null;
        g !== void 0 && (ft(g), O = "" + g), y(f) && (ft(f.key), O = "" + f.key), o(f) && (se = f.ref, _(f, j));
        for (I in f)
          Be.call(f, I) && !Tt.hasOwnProperty(I) && (P[I] = f[I]);
        if (r && r.defaultProps) {
          var W = r.defaultProps;
          for (I in W)
            P[I] === void 0 && (P[I] = W[I]);
        }
        if (O || se) {
          var Z = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          O && A(P, Z), se && te(P, Z);
        }
        return ve(r, O, se, j, w, Se.current, P);
      }
    }
    var pt = H.ReactCurrentOwner, mt = H.ReactDebugCurrentFrame;
    function be(r) {
      if (r) {
        var f = r._owner, g = Pe(r.type, r._source, f ? f.type : null);
        mt.setExtraStackFrame(g);
      } else
        mt.setExtraStackFrame(null);
    }
    var fe;
    fe = !1;
    function he(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function $e() {
      {
        if (pt.current) {
          var r = N(pt.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function _e(r) {
      {
        if (r !== void 0) {
          var f = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var Oe = {};
    function Ve(r) {
      {
        var f = $e();
        if (!f) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function Lt(r, f) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = Ve(f);
        if (Oe[g])
          return;
        Oe[g] = !0;
        var w = "";
        r && r._owner && r._owner !== pt.current && (w = " It was passed a child from " + N(r._owner.type) + "."), be(r), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, w), be(null);
      }
    }
    function Ft(r, f) {
      {
        if (typeof r != "object")
          return;
        if (qe(r))
          for (var g = 0; g < r.length; g++) {
            var w = r[g];
            he(w) && Lt(w, f);
          }
        else if (he(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var j = oe(r);
          if (typeof j == "function" && j !== r.entries)
            for (var I = j.call(r), P; !(P = I.next()).done; )
              he(P.value) && Lt(P.value, f);
        }
      }
    }
    function yn(r) {
      {
        var f = r.type;
        if (f == null || typeof f == "string")
          return;
        var g;
        if (typeof f == "function")
          g = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === E))
          g = f.propTypes;
        else
          return;
        if (g) {
          var w = N(f);
          je(g, r.props, "prop", w, r);
        } else if (f.PropTypes !== void 0 && !fe) {
          fe = !0;
          var j = N(f);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function En(r) {
      {
        for (var f = Object.keys(r.props), g = 0; g < f.length; g++) {
          var w = f[g];
          if (w !== "children" && w !== "key") {
            be(r), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), be(null);
            break;
          }
        }
        r.ref !== null && (be(r), C("Invalid attribute `ref` supplied to `React.Fragment`."), be(null));
      }
    }
    function Ut(r, f, g, w, j, I) {
      {
        var P = S(r);
        if (!P) {
          var O = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (O += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var se = _e(j);
          se ? O += se : O += $e();
          var W;
          r === null ? W = "null" : qe(r) ? W = "array" : r !== void 0 && r.$$typeof === n ? (W = "<" + (N(r.type) || "Unknown") + " />", O = " Did you accidentally export a JSX literal instead of a component?") : W = typeof r, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", W, O);
        }
        var Z = le(r, f, g, j, I);
        if (Z == null)
          return Z;
        if (P) {
          var me = f.children;
          if (me !== void 0)
            if (w)
              if (qe(me)) {
                for (var Ge = 0; Ge < me.length; Ge++)
                  Ft(me[Ge], r);
                Object.freeze && Object.freeze(me);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ft(me, r);
        }
        return r === e ? En(Z) : yn(Z), Z;
      }
    }
    function xn(r, f, g) {
      return Ut(r, f, g, !0);
    }
    function wn(r, f, g) {
      return Ut(r, f, g, !1);
    }
    var Cn = wn, Sn = xn;
    tt.Fragment = e, tt.jsx = Cn, tt.jsxs = Sn;
  }()), tt;
}
process.env.NODE_ENV === "production" ? At.exports = ri() : At.exports = ai();
var c = At.exports;
function gn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ c.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ c.jsx("button", { children: t.title });
}
const oi = /* @__PURE__ */ c.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ c.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), si = /* @__PURE__ */ c.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ c.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function ci(t) {
  return /* @__PURE__ */ c.jsx(dn.Item, { value: t.title, children: /* @__PURE__ */ c.jsxs("div", { children: [
    si,
    /* @__PURE__ */ c.jsx("span", { children: t.title }),
    /* @__PURE__ */ c.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: oi })
  ] }) }, t.title);
}
function li(t) {
  const [n, i] = ae(!1), [e, a] = ae(t.options), s = (m) => {
    t.onDragComplete(m), a(m);
  }, h = (m) => {
    const v = [...e];
    v.splice(m, 1), s(v);
  }, l = [];
  e.forEach((m, v) => {
    l.push(/* @__PURE__ */ c.jsx(ci, { index: v, title: m, onDelete: h }, m));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ c.jsxs("div", { className: d, onMouseEnter: () => i(!0), onMouseLeave: () => i(!1), children: [
    /* @__PURE__ */ c.jsx(gn, { title: t.title }),
    /* @__PURE__ */ c.jsx(dn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: l })
  ] });
}
function ui(t) {
  const [n, i] = ae(!1), e = [];
  t.options.map((s, h) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ c.jsx(di, { option: s }, h));
  });
  let a = "dropdown";
  return t.subdropdown && (a += " subdropdown"), /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: a,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      children: [
        /* @__PURE__ */ c.jsx(gn, { title: t.title }),
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
function di(t) {
  const { option: n } = t, [i, e] = ae("");
  let a;
  switch (n.type) {
    case "draggable":
      a = /* @__PURE__ */ c.jsx(
        li,
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
      a = /* @__PURE__ */ c.jsx(
        ui,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      a = /* @__PURE__ */ c.jsx(
        "button",
        {
          onClick: () => {
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (i !== n.title ? e(n.title) : e(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ c.jsx("li", { className: i === n.title ? "selected" : "", children: a }, Zn());
}
function nr(t, n, i) {
  function e(s) {
    switch (n.forEach((h) => h(t, s)), s.event) {
      case "custom":
        z.dispatchEvent({ type: Y.CUSTOM, value: s.data });
        break;
    }
  }
  function a(s) {
    switch (i.forEach((h) => h(t, s)), s.event) {
      case "custom":
        z.dispatchEvent({ type: Y.CUSTOM, value: s.data });
        break;
    }
  }
  t.listen((s) => {
    t.editor ? a(s) : e(s);
  });
}
const fi = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, hi = `out vec4 fragColor;
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
class pi extends on {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Pn,
      side: jn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new It(16777215)
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
      vertexShader: fi,
      fragmentShader: hi,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class mi extends _n {
  constructor() {
    const i = new pi();
    super(new Dn(2, 2), i);
    q(this, "gridMaterial");
    this.gridMaterial = i, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const gi = `#include <common>
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
}`, vi = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class bi extends on {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: gi,
      fragmentShader: vi
    });
  }
}
function Nt(t) {
  const [n, i] = ae(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ c.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !n;
          t.onToggle !== void 0 && t.onToggle(a), i(a);
        },
        children: [
          /* @__PURE__ */ c.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ c.jsx("p", { className: "label", children: t.label })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { children: t.children }) })
  ] });
}
function vn(t) {
  const [n, i] = ae(!1), e = t.child.children.length > 0, a = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    a.push(/* @__PURE__ */ c.jsx(vn, { child: s, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ c.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            i(!n);
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
            t.three.getObject(t.child.uuid);
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ c.jsx("div", { className: `icon ${ti(t.child)}` })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { className: "container", children: a }) })
  ] }, Math.random());
}
function yi(t) {
  const n = [];
  return t.child.children.map((i) => {
    n.push(/* @__PURE__ */ c.jsx(vn, { child: i, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Ei = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function xi(t) {
  return "items" in t;
}
function Le(t) {
  function n(e, a) {
    console.log("onChange:", e, a);
  }
  const i = [];
  return t.items.forEach((e) => {
    xi(e) ? i.push(
      /* @__PURE__ */ c.jsx(Le, { title: e.title, items: e.items }, Math.random())
    ) : i.push(
      /* @__PURE__ */ c.jsx(
        nt,
        {
          title: e.title,
          prop: e.prop,
          value: e.value,
          type: e.type,
          min: e.min,
          max: e.max,
          step: e.step,
          disabled: e.disabled,
          onChange: (a, s) => {
            e.onChange !== void 0 ? e.onChange(a, s) : n(a, s);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ c.jsx(Nt, { label: t.title, open: !1, children: i });
}
function wi(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
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
function Ci(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Si() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, i) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        i();
      else {
        const e = t.files[0], a = new FileReader();
        a.onload = function(s) {
          n(s.target.result);
        }, a.readAsDataURL(e);
      }
    }), t.click();
  });
}
function Ht(t, n, i) {
  const e = [];
  for (const a in t) {
    if (!wi(a))
      continue;
    const s = typeof t[a], h = t[a];
    if (s === "boolean" || s === "number" || s === "string") {
      const l = {
        title: De(a),
        prop: a,
        type: s,
        value: h,
        min: void 0,
        max: void 0,
        onChange: (d, m) => {
          var E;
          i.updateObject(n.uuid, `material.${d}`, m), s === "boolean" && i.updateObject(n.uuid, "material.needsUpdate", !0);
          const v = (E = i.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
          v !== void 0 && J(v, `material.${d}`, m);
        }
      };
      Ci(a) && (l.value = Number(h), l.type = "range", l.min = 0, l.max = 1, l.step = 0.01), e.push(l);
    } else if (s === "object")
      if (h.isColor)
        e.push({
          title: De(a),
          prop: a,
          type: "color",
          value: h,
          onChange: (l, d) => {
            var E;
            const m = new It(d);
            i.updateObject(n.uuid, `material.${l}`, m);
            const v = (E = i.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && J(v, `material.${l}`, m);
          }
        });
      else if (Array.isArray(h)) {
        const l = [];
        for (const d in h)
          l.push({
            title: `${d}`,
            type: `${typeof h[d]}`,
            value: h[d],
            onChange: (m, v) => {
              var x;
              i.updateObject(n.uuid, `material.${a}`, v);
              const E = (x = i.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
              E !== void 0 && J(E, `material.${a}`, v);
            }
          });
        e.push({
          title: De(a),
          items: l
        });
      } else {
        const l = [];
        for (const d in h) {
          const m = h[d];
          switch (typeof m) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: De(a),
                type: "image",
                value: m,
                onChange: (E, x) => {
                  var T;
                  i.createTexture(n.uuid, `material.${a}`, x);
                  const R = (T = i.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && kt(x).then((B) => {
                    J(R, `material.${a}`, B), J(R, "material.needsUpdate", !0);
                  });
                }
              }) : l.push({
                title: `${De(d)}`,
                prop: `material.${a}.${d}`,
                type: `${typeof t[a][d]}`,
                value: h[d],
                onChange: (E, x) => {
                  var T;
                  i.updateObject(n.uuid, `material.${a}.${d}`, x);
                  const R = (T = i.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && J(R, `material.${a}.${d}`, x);
                }
              });
              break;
            case "object":
              m.value !== void 0 && m.value.src !== void 0 ? l.push({
                title: De(d),
                type: "image",
                value: m.value.src,
                onChange: (E, x) => {
                  var T;
                  i.createTexture(n.uuid, `material.${a}.${d}.value`, x);
                  const R = (T = i.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && kt(x).then((B) => {
                    J(R, `material.${a}.${d}.value`, B);
                  });
                }
              }) : l.push({
                title: d,
                type: `${typeof m.value}`,
                value: m.value,
                onChange: (E, x) => {
                  var T;
                  i.updateObject(n.uuid, `material.${a}.${d}.value`, x);
                  const R = (T = i.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && J(R, `material.${a}.${d}.value`, x);
                }
              });
              break;
          }
        }
        l.length > 0 && e.push({
          title: De(a),
          items: l
        });
      }
    else
      h !== void 0 && console.log("other:", a, s, h);
  }
  return e.sort((a, s) => a.title < s.title ? -1 : a.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      i.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Oi(t, n) {
  const i = t.material;
  if (Array.isArray(i)) {
    const e = [], a = i.length;
    for (let s = 0; s < a; s++)
      e.push(
        /* @__PURE__ */ c.jsx(
          Le,
          {
            title: `Material ${s}`,
            items: Ht(i[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: e });
  } else
    return /* @__PURE__ */ c.jsx(
      Le,
      {
        title: "Material",
        items: Ht(i, t, n)
      }
    );
}
function nt(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Qn(t.value));
  const [i, e] = ae(n), a = we(null), s = we(null), h = we(null);
  Ne(() => {
    var K;
    let v = !1, E = -1, x = 0, R = Number(i);
    const T = (de) => {
      v = !0, x = R, E = de.clientX;
    }, B = (de) => {
      if (!v)
        return;
      const ce = t.step !== void 0 ? t.step : 1, ee = (de.clientX - E) * ce;
      R = Number((x + ee).toFixed(4)), s.current !== null && (s.current.value = R.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, R);
    }, oe = () => {
      v = !1;
    }, H = () => {
      v = !1;
    }, C = t.type === "number";
    return C && ((K = a.current) == null || K.addEventListener("mousedown", T, !1), document.addEventListener("mouseup", oe, !1), document.addEventListener("mousemove", B, !1), document.addEventListener("contextmenu", H, !1)), () => {
      var de;
      C && ((de = a.current) == null || de.removeEventListener("mousedown", T), document.removeEventListener("mouseup", oe), document.removeEventListener("mousemove", B), document.removeEventListener("contextmenu", H));
    };
  }, [i]);
  const l = t.type === "string" && (i.length > 100 || i.search(`
`) > -1), d = l || t.type === "image", m = (v) => {
    let E = v.target.value;
    t.type === "boolean" && (E = v.target.checked), e(E), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, E);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ c.jsx("label", { ref: a, children: t.title }, "fieldLabel"),
    t.type === "string" && !l && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: m,
        value: i
      }
    ),
    t.type === "string" && l && /* @__PURE__ */ c.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: m,
        value: i
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: m,
        checked: i
      }
    ),
    t.type === "number" && /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: s,
        type: "number",
        value: i,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: m
      }
    ),
    t.type === "range" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("input", { type: "text", value: i.toString(), onChange: m, className: "min" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: i,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: m
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("input", { type: "text", value: i.toString(), onChange: m, className: "color" }),
      /* @__PURE__ */ c.jsx("input", { type: "color", value: i, onChange: m })
    ] }),
    t.type === "button" && /* @__PURE__ */ c.jsx(
      "button",
      {
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ c.jsx("img", { ref: h, onClick: () => {
      Si().then((v) => {
        h.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: i.length > 0 ? i : Ei })
  ] });
}
function Kt(t) {
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
function Ti(t, n) {
  const i = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      i.push({
        title: Kt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (a, s) => {
          var l;
          n.updateObject(t.uuid, a, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (J(h, a, s), h.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      i.push({
        title: Kt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (a, s) => {
          var l;
          n.updateObject(t.uuid, a, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (J(h, a, s), h.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ c.jsx(
    Le,
    {
      title: "Camera",
      items: i
    }
  );
}
const Mi = Math.PI / 180, Ri = 180 / Math.PI;
function We(t, n, i, e, a) {
  return e + (t - n) * (a - e) / (i - n);
}
function Pi(t) {
  return t * Mi;
}
function Pt(t) {
  return t * Ri;
}
function ji(t, n) {
  const i = new kn();
  i.elements = t.matrix;
  const e = new G(), a = new An(), s = new G();
  t.uuid.length > 0 && (e.setFromMatrixPosition(i), a.setFromRotationMatrix(i), s.setFromMatrixScale(i));
  const h = (d, m) => {
    var E;
    n.updateObject(t.uuid, d, m);
    const v = (E = n.scene) == null ? void 0 : E.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && J(v, d, m);
  }, l = (d, m) => {
    h(d, Pi(m));
  };
  return /* @__PURE__ */ c.jsx(
    Le,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: h
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: h
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: h
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: Mt(Pt(a.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Mt(Pt(a.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Mt(Pt(a.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: s.x,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: h
        }
      ]
    }
  );
}
function Xt(t) {
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
function _i(t, n) {
  const i = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const a = t.lightInfo[e];
      a !== void 0 && (a.isColor !== void 0 ? i.push({
        title: Xt(e),
        prop: e,
        type: "color",
        value: a,
        onChange: (s, h) => {
          var m;
          const l = new It(h);
          n.updateObject(t.uuid, s, l);
          const d = (m = n.scene) == null ? void 0 : m.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && J(d, s, l);
        }
      }) : i.push({
        title: Xt(e),
        prop: e,
        type: typeof a,
        value: a,
        step: typeof a == "number" ? 0.01 : void 0,
        onChange: (s, h) => {
          var d;
          n.updateObject(t.uuid, s, h);
          const l = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && J(l, s, h);
        }
      }));
    }
  return /* @__PURE__ */ c.jsx(
    Le,
    {
      title: "Light",
      items: i
    }
  );
}
function Di(t, n) {
  const i = [];
  return t.animations.forEach((e) => {
    i.push({
      title: "Name",
      type: "string",
      prop: "name",
      value: e.name,
      disabled: !0,
      onChange: (a, s) => {
        var l;
        n.updateObject(t.uuid, a, s);
        const h = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        h !== void 0 && J(h, a, s);
      }
    }), i.push({
      title: "Duration",
      type: "number",
      prop: "duration",
      value: e.duration,
      disabled: !0,
      onChange: (a, s) => {
        var l;
        n.updateObject(t.uuid, a, s);
        const h = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        h !== void 0 && J(h, a, s);
      }
    }), i.push({
      title: "Blend Mode",
      type: "number",
      prop: "blendMode",
      value: e.blendMode,
      disabled: !0,
      onChange: (a, s) => {
        var l;
        n.updateObject(t.uuid, a, s);
        const h = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        h !== void 0 && J(h, a, s);
      }
    });
  }), /* @__PURE__ */ c.jsx(Le, { title: "Animations", items: i });
}
const Zt = {
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
function ki(t) {
  const [n, i] = ae(Zt);
  Ne(() => {
    function a(h) {
      const l = h.value;
      i(l);
    }
    function s() {
      i(Zt);
    }
    return z.addEventListener(Y.SET_SCENE, s), z.addEventListener(Y.SET_OBJECT, a), () => {
      z.removeEventListener(Y.SET_SCENE, s), z.removeEventListener(Y.SET_OBJECT, a);
    };
  }, []);
  const e = n.type.toLowerCase();
  return /* @__PURE__ */ c.jsx(Nt, { label: "Inspector", children: /* @__PURE__ */ c.jsx("div", { id: "Inspector", className: t.class, children: n.uuid.length > 0 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(
        nt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: n.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        nt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: n.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        nt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: n.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        nt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: n.visible,
          onChange: (a, s) => {
            var l;
            t.three.updateObject(n.uuid, a, s);
            const h = (l = t.three.scene) == null ? void 0 : l.getObjectByProperty("uuid", n.uuid);
            h !== void 0 && J(h, a, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      ji(n, t.three),
      n.animations.length > 0 ? Di(n, t.three) : null,
      e.search("camera") > -1 ? Ti(n, t.three) : null,
      e.search("light") > -1 ? _i(n, t.three) : null,
      e.search("mesh") > -1 ? Oi(n, t.three) : null
    ] })
  ] }) }) }, "Inspector");
}
class ir extends Kn {
  constructor(i) {
    super(i);
    q(this, "three");
    // Private
    q(this, "setScene", (i) => {
      this.setState(() => ({
        scene: i.value
      }));
    });
    this.state = {
      scene: i.scene !== void 0 ? i.scene : null
    }, this.three = i.three, z.addEventListener(Y.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    z.removeEventListener(Y.SET_SCENE, this.setScene);
  }
  render() {
    var a;
    const i = this.componentState.scene !== null, e = "Hierarchy - " + (i ? `${(a = this.componentState.scene) == null ? void 0 : a.name}` : "No Scene");
    return /* @__PURE__ */ c.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(Nt, { label: e, open: !0, children: /* @__PURE__ */ c.jsx(c.Fragment, { children: i && /* @__PURE__ */ c.jsx(yi, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ c.jsx(ki, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function rr(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const i = (l) => {
    var m;
    if (!n())
      return;
    const d = (m = t.three.scene) == null ? void 0 : m.getObjectByProperty("uuid", l.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (l, d, m) => {
    var E;
    if (!n())
      return;
    const v = (E = t.three.scene) == null ? void 0 : E.getObjectByProperty("uuid", l);
    v !== void 0 && J(v, d, m);
  }, a = (l) => {
    if (!n())
      return;
    const d = l.value, { key: m, value: v, uuid: E } = d;
    e(E, m, v);
  }, s = (l) => {
    if (!n())
      return;
    const d = l.value;
    kt(d.value).then((m) => {
      e(d.uuid, d.key, m), e(d.uuid, "material.needsUpdate", !0);
    });
  }, h = (l) => {
    var x;
    if (!n())
      return;
    const { key: d, uuid: m, value: v } = l.value, E = (x = t.three.scene) == null ? void 0 : x.getObjectByProperty("uuid", m);
    if (E !== void 0)
      try {
        E[d](v);
      } catch (R) {
        console.log("Error requesting method:"), console.log(R), console.log(d), console.log(v);
      }
  };
  return Ne(() => (z.addEventListener(Y.GET_OBJECT, i), z.addEventListener(Y.UPDATE_OBJECT, a), z.addEventListener(Y.CREATE_TEXTURE, s), z.addEventListener(Y.REQUEST_METHOD, h), () => {
    z.removeEventListener(Y.GET_OBJECT, i), z.removeEventListener(Y.UPDATE_OBJECT, a), z.removeEventListener(Y.CREATE_TEXTURE, s), z.removeEventListener(Y.REQUEST_METHOD, h);
  }), []), null;
}
const qt = { type: "change" }, jt = { type: "start" }, Qt = { type: "end" }, gt = new In(), Jt = new Nn(), Ai = Math.cos(70 * Ln.DEG2RAD);
class Ii extends rn {
  constructor(n, i) {
    super(), this.object = n, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new G(), this.cursor = new G(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ze.ROTATE, MIDDLE: ze.DOLLY, RIGHT: ze.PAN }, this.touches = { ONE: Ye.ROTATE, TWO: Ye.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", Qe), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Qe), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(qt), e.update(), s = a.NONE;
    }, this.update = function() {
      const o = new G(), y = new Vt().setFromUnitVectors(n.up, new G(0, 1, 0)), _ = y.clone().invert(), A = new G(), te = new Vt(), ve = new G(), le = 2 * Math.PI;
      return function(mt = null) {
        const be = e.object.position;
        o.copy(be).sub(e.target), o.applyQuaternion(y), l.setFromVector3(o), e.autoRotate && s === a.NONE && F(b(mt)), e.enableDamping ? (l.theta += d.theta * e.dampingFactor, l.phi += d.phi * e.dampingFactor) : (l.theta += d.theta, l.phi += d.phi);
        let fe = e.minAzimuthAngle, he = e.maxAzimuthAngle;
        isFinite(fe) && isFinite(he) && (fe < -Math.PI ? fe += le : fe > Math.PI && (fe -= le), he < -Math.PI ? he += le : he > Math.PI && (he -= le), fe <= he ? l.theta = Math.max(fe, Math.min(he, l.theta)) : l.theta = l.theta > (fe + he) / 2 ? Math.max(fe, l.theta) : Math.min(he, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && ee || e.object.isOrthographicCamera ? l.radius = X(l.radius) : l.radius = X(l.radius * m), o.setFromSpherical(l), o.applyQuaternion(_), be.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), v.set(0, 0, 0));
        let $e = !1;
        if (e.zoomToCursor && ee) {
          let _e = null;
          if (e.object.isPerspectiveCamera) {
            const Oe = o.length();
            _e = X(Oe * m);
            const Ve = Oe - _e;
            e.object.position.addScaledVector(de, Ve), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Oe = new G(ce.x, ce.y, 0);
            Oe.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / m)), e.object.updateProjectionMatrix(), $e = !0;
            const Ve = new G(ce.x, ce.y, 0);
            Ve.unproject(e.object), e.object.position.sub(Ve).add(Oe), e.object.updateMatrixWorld(), _e = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          _e !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(_e).add(e.object.position) : (gt.origin.copy(e.object.position), gt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(gt.direction)) < Ai ? n.lookAt(e.target) : (Jt.setFromNormalAndCoplanarPoint(e.object.up, e.target), gt.intersectPlane(Jt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / m)), e.object.updateProjectionMatrix(), $e = !0);
        return m = 1, ee = !1, $e || A.distanceToSquared(e.object.position) > h || 8 * (1 - te.dot(e.object.quaternion)) > h || ve.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(qt), A.copy(e.object.position), te.copy(e.object.quaternion), ve.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Se), e.domElement.removeEventListener("pointerdown", Ze), e.domElement.removeEventListener("pointercancel", je), e.domElement.removeEventListener("wheel", ut), e.domElement.removeEventListener("pointermove", Ce), e.domElement.removeEventListener("pointerup", je), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Qe), e._domElementKeyEvents = null);
    };
    const e = this, a = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let s = a.NONE;
    const h = 1e-6, l = new Gt(), d = new Gt();
    let m = 1;
    const v = new G(), E = new ue(), x = new ue(), R = new ue(), T = new ue(), B = new ue(), oe = new ue(), H = new ue(), C = new ue(), K = new ue(), de = new G(), ce = new ue();
    let ee = !1;
    const u = [], p = {};
    function b(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function S(o) {
      const y = Math.abs(o) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function F(o) {
      d.theta -= o;
    }
    function U(o) {
      d.phi -= o;
    }
    const N = function() {
      const o = new G();
      return function(_, A) {
        o.setFromMatrixColumn(A, 0), o.multiplyScalar(-_), v.add(o);
      };
    }(), D = function() {
      const o = new G();
      return function(_, A) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(A, 1) : (o.setFromMatrixColumn(A, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(_), v.add(o);
      };
    }(), L = function() {
      const o = new G();
      return function(_, A) {
        const te = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const ve = e.object.position;
          o.copy(ve).sub(e.target);
          let le = o.length();
          le *= Math.tan(e.object.fov / 2 * Math.PI / 180), N(2 * _ * le / te.clientHeight, e.object.matrix), D(2 * A * le / te.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (N(_ * (e.object.right - e.object.left) / e.object.zoom / te.clientWidth, e.object.matrix), D(A * (e.object.top - e.object.bottom) / e.object.zoom / te.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Q(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? m /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function M(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? m *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function k(o, y) {
      if (!e.zoomToCursor)
        return;
      ee = !0;
      const _ = e.domElement.getBoundingClientRect(), A = o - _.left, te = y - _.top, ve = _.width, le = _.height;
      ce.x = A / ve * 2 - 1, ce.y = -(te / le) * 2 + 1, de.set(ce.x, ce.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function X(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function pe(o) {
      E.set(o.clientX, o.clientY);
    }
    function Te(o) {
      k(o.clientX, o.clientX), H.set(o.clientX, o.clientY);
    }
    function He(o) {
      T.set(o.clientX, o.clientY);
    }
    function at(o) {
      x.set(o.clientX, o.clientY), R.subVectors(x, E).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      F(2 * Math.PI * R.x / y.clientHeight), U(2 * Math.PI * R.y / y.clientHeight), E.copy(x), e.update();
    }
    function wt(o) {
      C.set(o.clientX, o.clientY), K.subVectors(C, H), K.y > 0 ? Q(S(K.y)) : K.y < 0 && M(S(K.y)), H.copy(C), e.update();
    }
    function Ct(o) {
      B.set(o.clientX, o.clientY), oe.subVectors(B, T).multiplyScalar(e.panSpeed), L(oe.x, oe.y), T.copy(B), e.update();
    }
    function Ke(o) {
      k(o.clientX, o.clientY), o.deltaY < 0 ? M(S(o.deltaY)) : o.deltaY > 0 && Q(S(o.deltaY)), e.update();
    }
    function Xe(o) {
      let y = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? U(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : L(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? U(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : L(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? F(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : L(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? F(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : L(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (o.preventDefault(), e.update());
    }
    function Me(o) {
      if (u.length === 1)
        E.set(o.pageX, o.pageY);
      else {
        const y = ge(o), _ = 0.5 * (o.pageX + y.x), A = 0.5 * (o.pageY + y.y);
        E.set(_, A);
      }
    }
    function Ue(o) {
      if (u.length === 1)
        T.set(o.pageX, o.pageY);
      else {
        const y = ge(o), _ = 0.5 * (o.pageX + y.x), A = 0.5 * (o.pageY + y.y);
        T.set(_, A);
      }
    }
    function Re(o) {
      const y = ge(o), _ = o.pageX - y.x, A = o.pageY - y.y, te = Math.sqrt(_ * _ + A * A);
      H.set(0, te);
    }
    function St(o) {
      e.enableZoom && Re(o), e.enablePan && Ue(o);
    }
    function ot(o) {
      e.enableZoom && Re(o), e.enableRotate && Me(o);
    }
    function st(o) {
      if (u.length == 1)
        x.set(o.pageX, o.pageY);
      else {
        const _ = ge(o), A = 0.5 * (o.pageX + _.x), te = 0.5 * (o.pageY + _.y);
        x.set(A, te);
      }
      R.subVectors(x, E).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      F(2 * Math.PI * R.x / y.clientHeight), U(2 * Math.PI * R.y / y.clientHeight), E.copy(x);
    }
    function ct(o) {
      if (u.length === 1)
        B.set(o.pageX, o.pageY);
      else {
        const y = ge(o), _ = 0.5 * (o.pageX + y.x), A = 0.5 * (o.pageY + y.y);
        B.set(_, A);
      }
      oe.subVectors(B, T).multiplyScalar(e.panSpeed), L(oe.x, oe.y), T.copy(B);
    }
    function Pe(o) {
      const y = ge(o), _ = o.pageX - y.x, A = o.pageY - y.y, te = Math.sqrt(_ * _ + A * A);
      C.set(0, te), K.set(0, Math.pow(C.y / H.y, e.zoomSpeed)), Q(K.y), H.copy(C);
      const ve = (o.pageX + y.x) * 0.5, le = (o.pageY + y.y) * 0.5;
      k(ve, le);
    }
    function Be(o) {
      e.enableZoom && Pe(o), e.enablePan && ct(o);
    }
    function lt(o) {
      e.enableZoom && Pe(o), e.enableRotate && st(o);
    }
    function Ze(o) {
      e.enabled !== !1 && (u.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", Ce), e.domElement.addEventListener("pointerup", je)), Tt(o), o.pointerType === "touch" ? dt(o) : Ot(o));
    }
    function Ce(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? ft(o) : qe(o));
    }
    function je(o) {
      ht(o), u.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", Ce), e.domElement.removeEventListener("pointerup", je)), e.dispatchEvent(Qt), s = a.NONE;
    }
    function Ot(o) {
      let y;
      switch (o.button) {
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
        case ze.DOLLY:
          if (e.enableZoom === !1)
            return;
          Te(o), s = a.DOLLY;
          break;
        case ze.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            He(o), s = a.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            pe(o), s = a.ROTATE;
          }
          break;
        case ze.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            pe(o), s = a.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            He(o), s = a.PAN;
          }
          break;
        default:
          s = a.NONE;
      }
      s !== a.NONE && e.dispatchEvent(jt);
    }
    function qe(o) {
      switch (s) {
        case a.ROTATE:
          if (e.enableRotate === !1)
            return;
          at(o);
          break;
        case a.DOLLY:
          if (e.enableZoom === !1)
            return;
          wt(o);
          break;
        case a.PAN:
          if (e.enablePan === !1)
            return;
          Ct(o);
          break;
      }
    }
    function ut(o) {
      e.enabled === !1 || e.enableZoom === !1 || s !== a.NONE || (o.preventDefault(), e.dispatchEvent(jt), Ke(o), e.dispatchEvent(Qt));
    }
    function Qe(o) {
      e.enabled === !1 || e.enablePan === !1 || Xe(o);
    }
    function dt(o) {
      switch (Je(o), u.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ye.ROTATE:
              if (e.enableRotate === !1)
                return;
              Me(o), s = a.TOUCH_ROTATE;
              break;
            case Ye.PAN:
              if (e.enablePan === !1)
                return;
              Ue(o), s = a.TOUCH_PAN;
              break;
            default:
              s = a.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ye.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              St(o), s = a.TOUCH_DOLLY_PAN;
              break;
            case Ye.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              ot(o), s = a.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = a.NONE;
          }
          break;
        default:
          s = a.NONE;
      }
      s !== a.NONE && e.dispatchEvent(jt);
    }
    function ft(o) {
      switch (Je(o), s) {
        case a.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          st(o), e.update();
          break;
        case a.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          ct(o), e.update();
          break;
        case a.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Be(o), e.update();
          break;
        case a.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          lt(o), e.update();
          break;
        default:
          s = a.NONE;
      }
    }
    function Se(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function Tt(o) {
      u.push(o.pointerId);
    }
    function ht(o) {
      delete p[o.pointerId];
      for (let y = 0; y < u.length; y++)
        if (u[y] == o.pointerId) {
          u.splice(y, 1);
          return;
        }
    }
    function Je(o) {
      let y = p[o.pointerId];
      y === void 0 && (y = new ue(), p[o.pointerId] = y), y.set(o.pageX, o.pageY);
    }
    function ge(o) {
      const y = o.pointerId === u[0] ? u[1] : u[0];
      return p[y];
    }
    e.domElement.addEventListener("contextmenu", Se), e.domElement.addEventListener("pointerdown", Ze), e.domElement.addEventListener("pointercancel", je), e.domElement.addEventListener("wheel", ut, { passive: !1 }), this.update();
  }
}
const yt = (t) => {
  const [n, i] = ae(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, a = (s) => {
    s !== n && (t.onSelect(s), i(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ c.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ c.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ c.jsx("li", { onClick: () => a(s), children: s }, s)) })
  ] });
}, ke = Xn(function(n, i) {
  const [e, a] = ae(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ c.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ c.jsx("div", { ref: i, className: "clickable", onClick: () => {
      e && a(!1);
    } }),
    /* @__PURE__ */ c.jsx(
      yt,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (h) => {
          a(h);
        },
        up: !0
      }
    )
  ] });
}), en = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ne = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map();
function Fe(t, n) {
  const i = new sn(-100, 100, 100, -100, 50, 3e3);
  return i.name = t, i.position.copy(n), i.lookAt(0, 0, 0), ne.set(t, i), i;
}
Fe("Top", new G(0, 1e3, 0));
Fe("Bottom", new G(0, -1e3, 0));
Fe("Left", new G(-1e3, 0, 0));
Fe("Right", new G(1e3, 0, 0));
Fe("Front", new G(0, 0, 1e3));
Fe("Back", new G(0, 0, -1e3));
Fe("Orthographic", new G(1e3, 1e3, 1e3));
const xt = new _t(60, 1, 50, 3e3);
xt.name = "Debug";
xt.position.set(500, 500, 500);
xt.lookAt(0, 0, 0);
ne.set("Debug", xt);
const tn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ni = new Fn(), Li = new Un(), Fi = new bi(), Ui = new Bn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let vt = "Renderer";
const V = new cn();
V.name = "Debug Scene";
let xe = new cn();
V.add(xe);
const rt = new $n();
rt.name = "helpers";
V.add(rt);
const Bi = new mi();
rt.add(Bi);
const bn = new ln(500);
bn.name = "axisHelper";
rt.add(bn);
const it = new ln(100);
it.name = "interactionHelper";
rt.add(it);
it.visible = !1;
let bt = !1, $ = ne.get("Debug"), re = ne.get("Orthographic"), Ae = ne.get("Front"), Ie = ne.get("Top"), nn = !1;
function ar(t) {
  const [n, i] = ae(t.mode !== void 0 ? t.mode : "Single"), [e, a] = ae(null), [s, h] = ae(!1), [l, d] = ae(!1), [m, v] = ae(!1), [, E] = ae(Date.now()), x = we(null), R = we(null), T = we(null), B = we(null), oe = we(null), H = we(null), C = (u, p) => {
    const b = ie.get(u.name);
    b !== void 0 && b.dispose(), ie.delete(u.name);
    const S = Ee.get(u.name);
    S !== void 0 && (V.remove(S), S.dispose()), Ee.delete(u.name);
    const F = new Ii(u, p);
    switch (F.enableDamping = !0, F.dampingFactor = 0.05, u.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        F.enableRotate = !1;
        break;
    }
    if (ie.set(u.name, F), u instanceof _t) {
      const U = new zn(u);
      Ee.set(u.name, U), V.add(U);
    }
  }, K = (u) => {
    const p = Ee.get(u.name);
    p !== void 0 && (V.remove(p), p.dispose(), Ee.delete(u.name));
    const b = ie.get(u.name);
    b !== void 0 && (b.dispose(), ie.delete(u.name));
  }, de = () => {
    ie.forEach((u, p) => {
      u.dispose();
      const b = Ee.get(p);
      b !== void 0 && (V.remove(b), b.dispose()), Ee.delete(p), ie.delete(p);
    }), ie.clear(), Ee.clear();
  }, ce = () => {
    switch (n) {
      case "Single":
        C($, T.current);
        break;
      case "Side by Side":
      case "Stacked":
        C($, T.current), C(re, B.current);
        break;
      case "Quad":
        C($, T.current), C(re, B.current), C(Ae, oe.current), C(Ie, H.current);
        break;
    }
  };
  Ne(() => {
    const u = new Vn({
      canvas: x.current,
      stencil: !1
    });
    u.autoClear = !1, u.shadowMap.enabled = !0, u.setPixelRatio(devicePixelRatio), u.setClearColor(0), a(u);
  }, []), Ne(() => {
    const u = (S) => {
      hn(xe), V.remove(xe);
      const F = t.scenes.get(S.value.name);
      if (F !== void 0) {
        const U = new F();
        t.onSceneSet !== void 0 && t.onSceneSet(U), xe = U, t.three.scene = xe, V.add(xe), nn = !0;
      }
    }, p = (S) => {
      var N;
      const F = S.value, U = (N = t.three.scene) == null ? void 0 : N.getObjectByProperty("uuid", F.uuid);
      U !== void 0 && ne.set(F.name, U), E(Date.now());
    }, b = (S) => {
      ne.delete(S.value.name), E(Date.now());
    };
    return z.addEventListener(Y.SET_SCENE, u), z.addEventListener(Y.ADD_CAMERA, p), z.addEventListener(Y.REMOVE_CAMERA, b), () => {
      z.removeEventListener(Y.SET_SCENE, u), z.removeEventListener(Y.ADD_CAMERA, p), z.removeEventListener(Y.REMOVE_CAMERA, b);
    };
  }, []), Ne(() => {
    if (e === null)
      return;
    let u = window.innerWidth, p = window.innerHeight, b = Math.floor(u / 2), S = Math.floor(p / 2), F = -1;
    const U = () => {
      u = window.innerWidth - 300, p = window.innerHeight, b = Math.floor(u / 2), S = Math.floor(p / 2), e.setSize(u, p);
      let M = u, k = p;
      switch (n) {
        case "Side by Side":
          M = b, k = p;
          break;
        case "Stacked":
          M = u, k = S;
          break;
        case "Quad":
          M = b, k = S;
          break;
      }
      ne.forEach((X) => {
        var pe;
        X instanceof sn ? (X.left = M / -2, X.right = M / 2, X.top = k / 2, X.bottom = k / -2, X.updateProjectionMatrix()) : X instanceof _t && (X.aspect = M / k, X.updateProjectionMatrix(), (pe = Ee.get(X.name)) == null || pe.update());
      });
    }, N = () => {
      e.setViewport(0, 0, u, p), e.setScissor(0, 0, u, p), e.render(V, $);
    }, D = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, b, p), e.setScissor(0, 0, b, p), e.render(V, $), e.setViewport(b, 0, b, p), e.setScissor(b, 0, b, p), e.render(V, re);
      else {
        const M = p - S;
        e.setViewport(0, M, u, S), e.setScissor(0, M, u, S), e.render(V, $), e.setViewport(0, 0, u, S), e.setScissor(0, 0, u, S), e.render(V, re);
      }
    }, L = () => {
      let M = 0, k = 0;
      k = p - S, M = 0, e.setViewport(M, k, b, S), e.setScissor(M, k, b, S), e.render(V, $), M = b, e.setViewport(M, k, b, S), e.setScissor(M, k, b, S), e.render(V, re), k = 0, M = 0, e.setViewport(M, k, b, S), e.setScissor(M, k, b, S), e.render(V, Ae), M = b, e.setViewport(M, k, b, S), e.setScissor(M, k, b, S), e.render(V, Ie);
    }, Q = () => {
      switch (ie.forEach((M) => {
        M.update();
      }), t.onSceneUpdate !== void 0 && nn && t.onSceneUpdate(xe), e.clear(), n) {
        case "Single":
          N();
          break;
        case "Side by Side":
        case "Stacked":
          D();
          break;
        case "Quad":
          L();
          break;
      }
      F = requestAnimationFrame(Q);
    };
    return ce(), window.addEventListener("resize", U), U(), Q(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(F), F = -1;
    };
  }, [n, e]), Ne(() => {
    if (e !== null) {
      const u = new Gn(), p = new ue(), b = (N, D, L, Q) => {
        switch (n) {
          case "Quad":
            N < L ? D < Q ? u.setFromCamera(p, $) : u.setFromCamera(p, Ae) : D < Q ? u.setFromCamera(p, re) : u.setFromCamera(p, Ie);
            break;
          case "Side by Side":
            N < L ? u.setFromCamera(p, $) : u.setFromCamera(p, re);
            break;
          case "Single":
            u.setFromCamera(p, $);
            break;
          case "Stacked":
            D < Q ? u.setFromCamera(p, $) : u.setFromCamera(p, re);
            break;
        }
      }, S = (N) => {
        if (!bt)
          return;
        const D = new ue();
        e.getSize(D);
        const L = Math.min(N.clientX, D.x), Q = Math.min(N.clientY, D.y);
        p.x = We(L, 0, D.x, -1, 1), p.y = We(Q, 0, D.y, 1, -1);
        const M = D.x / 2, k = D.y / 2, X = () => {
          L < M ? p.x = We(L, 0, M, -1, 1) : p.x = We(L, M, D.x, -1, 1);
        }, pe = () => {
          Q < k ? p.y = We(Q, 0, k, 1, -1) : p.y = We(Q, k, D.y, 1, -1);
        };
        switch (n) {
          case "Quad":
            X(), pe();
            break;
          case "Side by Side":
            X();
            break;
          case "Stacked":
            pe(), pe();
            break;
        }
        b(L, Q, M, k);
        const Te = u.intersectObjects(xe.children);
        Te.length > 0 && it.position.copy(Te[0].point);
      }, F = (N) => {
        if (!bt)
          return;
        const D = new ue();
        if (e.getSize(D), N.clientX >= D.x)
          return;
        S(N);
        const L = u.intersectObjects(xe.children);
        L.length > 0 && t.three.getObject(L[0].object.uuid);
      }, U = R.current;
      return U.addEventListener("mousemove", S, !1), U.addEventListener("click", F, !1), () => {
        U.removeEventListener("mousemove", S), U.removeEventListener("click", F);
      };
    }
  }, [n, e]);
  const ee = [];
  return ne.forEach((u, p) => {
    ee.push(p);
  }), /* @__PURE__ */ c.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ c.jsx("canvas", { ref: x }),
    /* @__PURE__ */ c.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: R, children: [
      n === "Single" && /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(ke, { camera: $, options: ee, ref: T, onSelect: (u) => {
        var b;
        (b = ie.get($.name)) == null || b.dispose();
        const p = ne.get(u);
        p !== void 0 && (K($), $ = p, C(p, T.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(ke, { camera: $, options: ee, ref: T, onSelect: (u) => {
          var b;
          (b = ie.get($.name)) == null || b.dispose();
          const p = ne.get(u);
          p !== void 0 && (K($), $ = p, C(p, T.current));
        } }),
        /* @__PURE__ */ c.jsx(ke, { camera: re, options: ee, ref: B, onSelect: (u) => {
          var b;
          (b = ie.get(re.name)) == null || b.dispose();
          const p = ne.get(u);
          p !== void 0 && (K(re), re = p, C(p, B.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(ke, { camera: $, options: ee, ref: T, onSelect: (u) => {
          var b;
          (b = ie.get($.name)) == null || b.dispose();
          const p = ne.get(u);
          p !== void 0 && (K($), $ = p, C(p, T.current));
        } }),
        /* @__PURE__ */ c.jsx(ke, { camera: re, options: ee, ref: B, onSelect: (u) => {
          var b;
          (b = ie.get(re.name)) == null || b.dispose();
          const p = ne.get(u);
          p !== void 0 && (K(re), re = p, C(p, B.current));
        } }),
        /* @__PURE__ */ c.jsx(ke, { camera: Ae, options: ee, ref: oe, onSelect: (u) => {
          var b;
          (b = ie.get(Ae.name)) == null || b.dispose();
          const p = ne.get(u);
          p !== void 0 && (K(Ae), Ae = p, C(p, oe.current));
        } }),
        /* @__PURE__ */ c.jsx(ke, { camera: Ie, options: ee, ref: H, onSelect: (u) => {
          var b;
          (b = ie.get(Ie.name)) == null || b.dispose();
          const p = ne.get(u);
          p !== void 0 && (K(Ie), Ie = p, C(p, H.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ c.jsx(
        yt,
        {
          index: en.indexOf(n),
          options: en,
          onSelect: (u) => {
            u !== n && (de(), i(u));
          },
          open: s,
          onToggle: (u) => {
            h(u), l && d(!1), m && v(!1);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        yt,
        {
          index: tn.indexOf(vt),
          options: tn,
          onSelect: (u) => {
            if (u !== vt)
              switch (vt = u, vt) {
                case "Depth":
                  V.overrideMaterial = Ni;
                  break;
                case "Normals":
                  V.overrideMaterial = Li;
                  break;
                default:
                case "Renderer":
                  V.overrideMaterial = null;
                  break;
                case "Wireframe":
                  V.overrideMaterial = Ui;
                  break;
                case "UVs":
                  V.overrideMaterial = Fi;
                  break;
              }
          },
          open: l,
          onToggle: (u) => {
            s && h(!1), d(u), m && v(!1);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        yt,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (u) => {
            bt = u === "Selection Mode", it.visible = bt;
          },
          open: m,
          onToggle: (u) => {
            s && h(!1), l && d(!1), v(u);
          }
        }
      )
    ] })
  ] });
}
function or(t) {
  return /* @__PURE__ */ c.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ c.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ c.jsx("footer", { children: t.footer })
  ] });
}
export {
  Nt as Accordion,
  qi as Application,
  Et as BaseRemote,
  vn as ChildObject,
  yi as ContainerObject,
  li as Draggable,
  ci as DraggableItem,
  ui as Dropdown,
  di as DropdownItem,
  or as Editor,
  mi as InfiniteGridHelper,
  ki as Inspector,
  ar as MultiView,
  gn as NavButton,
  Qi as RemoteComponents,
  nr as RemoteController,
  Ji as RemoteTheatre,
  er as RemoteThree,
  tr as RemoteTweakpane,
  rr as SceneInspector,
  ir as SidePanel,
  Y as ToolEvents,
  bi as UVMaterial,
  Ki as clamp,
  Qn as colorToHex,
  z as debugDispatcher,
  hn as dispose,
  ei as disposeMaterial,
  Zi as disposeTexture,
  Xi as distance,
  fn as hierarchyUUID,
  qn as isColor,
  Zn as randomID,
  Jn as resetThreeObjects,
  Mt as round,
  Dt as totalThreeObjects
};
