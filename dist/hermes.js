var Sn = Object.defineProperty;
var On = (t, n, a) => n in t ? Sn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var Z = (t, n, a) => (On(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as Tn, EventDispatcher as nn, Texture as an, CubeTexture as Mn, RepeatWrapping as Gt, ShaderMaterial as rn, GLSL3 as Rn, DoubleSide as Pn, Color as Lt, Mesh as jn, PlaneGeometry as _n, Matrix4 as kn, Vector3 as Y, Euler as Dn, Ray as An, Plane as In, MathUtils as Ln, MOUSE as Ve, TOUCH as ze, Quaternion as Vt, Spherical as zt, Vector2 as ue, PerspectiveCamera as kt, MeshDepthMaterial as Nn, MeshNormalMaterial as Fn, MeshBasicMaterial as Un, OrthographicCamera as on, Scene as sn, Group as Bn, AxesHelper as cn, WebGLRenderer as $n, Raycaster as Gn, CameraHelper as Vn } from "three";
import { getProject as zn } from "@theatre/core";
import { Pane as Yn } from "tweakpane";
import * as Wn from "@tweakpane/plugin-essentials";
import ln, { useState as ae, useRef as xe, useEffect as Le, Component as Hn, forwardRef as Kn } from "react";
import { Reorder as un } from "framer-motion";
import et from "@theatre/studio";
function Wa(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Ha(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function Xn() {
  return Math.round(Math.random() * 1e6).toString();
}
function qn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Zn(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (d) => {
    const p = d.toString(16);
    return p.length === 1 ? "0" + p : p;
  }, s = o(n), c = o(a), u = o(e);
  return "#" + s + c + u;
}
function Rt(t, n = 1) {
  return Number(t.toFixed(n));
}
let Dt = 0;
const Jn = () => {
  Dt = 0;
}, dn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Dt}`, Dt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    dn(a);
  });
}, Ka = (t) => {
  t == null || t.dispose();
}, Qn = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, fn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof Tn ? (a.pause(), a.parent && a.parent.remove(a)) : fn(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), Qn(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Xa {
  constructor(n, a, e) {
    Z(this, "channel");
    Z(this, "components", /* @__PURE__ */ new Map());
    // Protected
    Z(this, "_mode", "app");
    this.editor = a && document.location.hash.search(e) > -1, a && (this.channel = new BroadcastChannel(n));
  }
  addComponent(n, a) {
    this.components.set(n, a);
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
    this.channel !== void 0 && (this.channel.onmessage = (a) => {
      n(a.data);
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
const k = new nn(), D = {
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
class xt {
  constructor(n) {
    Z(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class qa extends xt {
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
const hn = () => {
};
class Za extends xt {
  constructor(a, e, o) {
    super(a);
    Z(this, "project");
    Z(this, "sheets");
    Z(this, "sheetObjects");
    Z(this, "sheetObjectCBs");
    Z(this, "sheetObjectUnsubscribe");
    this.project = zn(e, o), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(a) {
    var o;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let e = this.sheets.get(a);
    return e !== void 0 || (e = (o = this.project) == null ? void 0 : o.sheet(a), this.sheets.set(a, e)), e;
  }
  sheetObject(a, e, o, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheets.get(a);
    if (c === void 0)
      return;
    const u = `${a}_${e}`;
    let d = this.sheetObjects.get(u);
    if (d !== void 0)
      return d = c.object(e, { ...o, ...d.value }, { reconfigure: !0 }), d;
    d = c.object(e, o), this.sheetObjects.set(u, d), this.sheetObjectCBs.set(u, s !== void 0 ? s : hn);
    const p = d.onValuesChange((g) => {
      if (this.app.editor) {
        for (const b in g) {
          const x = g[b];
          typeof x == "object" && qn(x) && (g[b] = {
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
            sheetObject: u,
            values: g
          }
        });
      } else {
        const b = this.sheetObjectCBs.get(u);
        b !== void 0 && b(g);
      }
    });
    return this.sheetObjectUnsubscribe.set(u, p), d;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = `${a.address.sheetId}_${a.address.objectKey}`, o = this.sheetObjectUnsubscribe.get(e);
    o !== void 0 && o();
  }
}
function ea(t) {
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
function pn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(pn(a));
  }), n;
}
function ta(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function na(t) {
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
function Yt(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || na(a))
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
            if (o instanceof an) {
              const s = o.source.toJSON();
              n[a] = { src: s.url };
            } else
              o instanceof Mn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = ta(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Pt(t) {
  t.updateMatrix();
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    visible: t.visible,
    matrix: t.matrix.elements,
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0
  }, a = t.type.toLowerCase();
  if (a.search("mesh") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((s) => {
        o.push(Yt(s));
      }), n.material = o;
    } else
      n.material = Yt(e.material);
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
function se(t, n, a) {
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
function At(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const o = new an(e);
      o.wrapS = Gt, o.wrapT = Gt, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class Ja extends xt {
  constructor() {
    super(...arguments);
    Z(this, "scene");
  }
  getObject(a) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = Pt(a);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(a, e, o) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: o
      }
    });
  }
  updateObject(a, e, o) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: o
      }
    });
  }
  createTexture(a, e, o) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: o
      }
    });
  }
  setScene(a) {
    if (a === void 0)
      return;
    this.scene = a, Jn(), dn(this.scene);
    const e = pn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(a) {
    const e = Pt(a);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(a) {
    const e = Pt(a);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
class Qa extends xt {
  constructor(a) {
    super(a);
    Z(this, "bindCBs");
    Z(this, "buttonCBs");
    Z(this, "pane");
    Z(this, "appCallbacks", 0);
    Z(this, "editorCallbacks", 0);
    Z(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Yn({ title: "GUI" }), this.pane.registerPlugin(Wn);
  }
  dispose() {
    var a;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((a = this.pane) == null || a.dispose(), this.pane = void 0);
  }
  addFolder(a, e = void 0, o = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addFolder({
        title: a,
        ...e
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: a,
        params: e,
        parent: o
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(a, e, o, s = void 0) {
    const c = this.bindID, u = o.onChange !== void 0 ? o.onChange : hn;
    this.bindCBs.set(c, u), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(a, e, o).on("change", (p) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: p.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: c,
        name: e,
        params: o,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(a, e) {
    const o = this.bindCBs.get(a);
    o !== void 0 ? o(e) : console.warn(`No callback for: ${a}`, e);
  }
  // Buttons
  button(a, e, o = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addButton({ title: a }).on("click", () => {
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
        parent: o
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
var It = { exports: {} }, tt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wt;
function aa() {
  if (Wt)
    return tt;
  Wt = 1;
  var t = ln, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(u, d, p) {
    var g, b = {}, x = null, C = null;
    p !== void 0 && (x = "" + p), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (C = d.ref);
    for (g in d)
      e.call(d, g) && !s.hasOwnProperty(g) && (b[g] = d[g]);
    if (u && u.defaultProps)
      for (g in d = u.defaultProps, d)
        b[g] === void 0 && (b[g] = d[g]);
    return { $$typeof: n, type: u, key: x, ref: C, props: b, _owner: o.current };
  }
  return tt.Fragment = a, tt.jsx = c, tt.jsxs = c, tt;
}
var nt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ht;
function ra() {
  return Ht || (Ht = 1, process.env.NODE_ENV !== "production" && function() {
    var t = ln, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), S = Symbol.iterator, F = "@@iterator";
    function Q(r) {
      if (r === null || typeof r != "object")
        return null;
      var h = S && r[S] || r[F];
      return typeof h == "function" ? h : null;
    }
    var H = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function O(r) {
      {
        for (var h = arguments.length, v = new Array(h > 1 ? h - 1 : 0), w = 1; w < h; w++)
          v[w - 1] = arguments[w];
        K("error", r, v);
      }
    }
    function K(r, h, v) {
      {
        var w = H.ReactDebugCurrentFrame, j = w.getStackAddendum();
        j !== "" && (h += "%s", v = v.concat([j]));
        var N = v.map(function(P) {
          return String(P);
        });
        N.unshift("Warning: " + h), Function.prototype.apply.call(console[r], console, N);
      }
    }
    var de = !1, ce = !1, ee = !1, f = !1, m = !1, y;
    y = Symbol.for("react.module.reference");
    function T(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === s || m || r === o || r === p || r === g || f || r === C || de || ce || ee || typeof r == "object" && r !== null && (r.$$typeof === x || r.$$typeof === b || r.$$typeof === c || r.$$typeof === u || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === y || r.getModuleId !== void 0));
    }
    function V(r, h, v) {
      var w = r.displayName;
      if (w)
        return w;
      var j = h.displayName || h.name || "";
      return j !== "" ? v + "(" + j + ")" : v;
    }
    function z(r) {
      return r.displayName || "Context";
    }
    function U(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && O("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case s:
          return "Profiler";
        case o:
          return "StrictMode";
        case p:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case u:
            var h = r;
            return z(h) + ".Consumer";
          case c:
            var v = r;
            return z(v._context) + ".Provider";
          case d:
            return V(r, r.render, "ForwardRef");
          case b:
            var w = r.displayName || null;
            return w !== null ? w : U(r.type) || "Memo";
          case x: {
            var j = r, N = j._payload, P = j._init;
            try {
              return U(P(N));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, B = 0, J, R, I, X, pe, Oe, He;
    function ot() {
    }
    ot.__reactDisabledLog = !0;
    function Ct() {
      {
        if (B === 0) {
          J = console.log, R = console.info, I = console.warn, X = console.error, pe = console.group, Oe = console.groupCollapsed, He = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: ot,
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
        B++;
      }
    }
    function St() {
      {
        if (B--, B === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, r, {
              value: J
            }),
            info: A({}, r, {
              value: R
            }),
            warn: A({}, r, {
              value: I
            }),
            error: A({}, r, {
              value: X
            }),
            group: A({}, r, {
              value: pe
            }),
            groupCollapsed: A({}, r, {
              value: Oe
            }),
            groupEnd: A({}, r, {
              value: He
            })
          });
        }
        B < 0 && O("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ke = H.ReactCurrentDispatcher, Xe;
    function Te(r, h, v) {
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
    var Fe = !1, Me;
    {
      var Ot = typeof WeakMap == "function" ? WeakMap : Map;
      Me = new Ot();
    }
    function st(r, h) {
      if (!r || Fe)
        return "";
      {
        var v = Me.get(r);
        if (v !== void 0)
          return v;
      }
      var w;
      Fe = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var N;
      N = Ke.current, Ke.current = null, Ct();
      try {
        if (h) {
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
          for (var M = ye.stack.split(`
`), oe = w.stack.split(`
`), W = M.length - 1, q = oe.length - 1; W >= 1 && q >= 0 && M[W] !== oe[q]; )
            q--;
          for (; W >= 1 && q >= 0; W--, q--)
            if (M[W] !== oe[q]) {
              if (W !== 1 || q !== 1)
                do
                  if (W--, q--, q < 0 || M[W] !== oe[q]) {
                    var me = `
` + M[W].replace(" at new ", " at ");
                    return r.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", r.displayName)), typeof r == "function" && Me.set(r, me), me;
                  }
                while (W >= 1 && q >= 0);
              break;
            }
        }
      } finally {
        Fe = !1, Ke.current = N, St(), Error.prepareStackTrace = j;
      }
      var Ge = r ? r.displayName || r.name : "", $t = Ge ? Te(Ge) : "";
      return typeof r == "function" && Me.set(r, $t), $t;
    }
    function ct(r, h, v) {
      return st(r, !1);
    }
    function lt(r) {
      var h = r.prototype;
      return !!(h && h.isReactComponent);
    }
    function Re(r, h, v) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return st(r, lt(r));
      if (typeof r == "string")
        return Te(r);
      switch (r) {
        case p:
          return Te("Suspense");
        case g:
          return Te("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return ct(r.render);
          case b:
            return Re(r.type, h, v);
          case x: {
            var w = r, j = w._payload, N = w._init;
            try {
              return Re(N(j), h, v);
            } catch {
            }
          }
        }
      return "";
    }
    var Ue = Object.prototype.hasOwnProperty, ut = {}, qe = H.ReactDebugCurrentFrame;
    function we(r) {
      if (r) {
        var h = r._owner, v = Re(r.type, r._source, h ? h.type : null);
        qe.setExtraStackFrame(v);
      } else
        qe.setExtraStackFrame(null);
    }
    function Pe(r, h, v, w, j) {
      {
        var N = Function.call.bind(Ue);
        for (var P in r)
          if (N(r, P)) {
            var M = void 0;
            try {
              if (typeof r[P] != "function") {
                var oe = Error((w || "React class") + ": " + v + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw oe.name = "Invariant Violation", oe;
              }
              M = r[P](h, P, w, v, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (W) {
              M = W;
            }
            M && !(M instanceof Error) && (we(j), O("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", v, P, typeof M), we(null)), M instanceof Error && !(M.message in ut) && (ut[M.message] = !0, we(j), O("Failed %s type: %s", v, M.message), we(null));
          }
      }
    }
    var Tt = Array.isArray;
    function Ze(r) {
      return Tt(r);
    }
    function dt(r) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, v = h && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return v;
      }
    }
    function Je(r) {
      try {
        return ft(r), !1;
      } catch {
        return !0;
      }
    }
    function ft(r) {
      return "" + r;
    }
    function ht(r) {
      if (Je(r))
        return O("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", dt(r)), ft(r);
    }
    var Ce = H.ReactCurrentOwner, Mt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pt, Qe, ge;
    ge = {};
    function i(r) {
      if (Ue.call(r, "ref")) {
        var h = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function E(r) {
      if (Ue.call(r, "key")) {
        var h = Object.getOwnPropertyDescriptor(r, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function _(r, h) {
      if (typeof r.ref == "string" && Ce.current && h && Ce.current.stateNode !== h) {
        var v = U(Ce.current.type);
        ge[v] || (O('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', U(Ce.current.type), r.ref), ge[v] = !0);
      }
    }
    function L(r, h) {
      {
        var v = function() {
          pt || (pt = !0, O("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        v.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: v,
          configurable: !0
        });
      }
    }
    function te(r, h) {
      {
        var v = function() {
          Qe || (Qe = !0, O("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        v.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: v,
          configurable: !0
        });
      }
    }
    var ve = function(r, h, v, w, j, N, P) {
      var M = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: h,
        ref: v,
        props: P,
        // Record the component responsible for creating this element.
        _owner: N
      };
      return M._store = {}, Object.defineProperty(M._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(M, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(M, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.freeze && (Object.freeze(M.props), Object.freeze(M)), M;
    };
    function le(r, h, v, w, j) {
      {
        var N, P = {}, M = null, oe = null;
        v !== void 0 && (ht(v), M = "" + v), E(h) && (ht(h.key), M = "" + h.key), i(h) && (oe = h.ref, _(h, j));
        for (N in h)
          Ue.call(h, N) && !Mt.hasOwnProperty(N) && (P[N] = h[N]);
        if (r && r.defaultProps) {
          var W = r.defaultProps;
          for (N in W)
            P[N] === void 0 && (P[N] = W[N]);
        }
        if (M || oe) {
          var q = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          M && L(P, q), oe && te(P, q);
        }
        return ve(r, M, oe, j, w, Ce.current, P);
      }
    }
    var mt = H.ReactCurrentOwner, gt = H.ReactDebugCurrentFrame;
    function be(r) {
      if (r) {
        var h = r._owner, v = Re(r.type, r._source, h ? h.type : null);
        gt.setExtraStackFrame(v);
      } else
        gt.setExtraStackFrame(null);
    }
    var fe;
    fe = !1;
    function he(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function Be() {
      {
        if (mt.current) {
          var r = U(mt.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function je(r) {
      {
        if (r !== void 0) {
          var h = r.fileName.replace(/^.*[\\\/]/, ""), v = r.lineNumber;
          return `

Check your code at ` + h + ":" + v + ".";
        }
        return "";
      }
    }
    var Se = {};
    function $e(r) {
      {
        var h = Be();
        if (!h) {
          var v = typeof r == "string" ? r : r.displayName || r.name;
          v && (h = `

Check the top-level render call using <` + v + ">.");
        }
        return h;
      }
    }
    function Ft(r, h) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var v = $e(h);
        if (Se[v])
          return;
        Se[v] = !0;
        var w = "";
        r && r._owner && r._owner !== mt.current && (w = " It was passed a child from " + U(r._owner.type) + "."), be(r), O('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', v, w), be(null);
      }
    }
    function Ut(r, h) {
      {
        if (typeof r != "object")
          return;
        if (Ze(r))
          for (var v = 0; v < r.length; v++) {
            var w = r[v];
            he(w) && Ft(w, h);
          }
        else if (he(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var j = Q(r);
          if (typeof j == "function" && j !== r.entries)
            for (var N = j.call(r), P; !(P = N.next()).done; )
              he(P.value) && Ft(P.value, h);
        }
      }
    }
    function bn(r) {
      {
        var h = r.type;
        if (h == null || typeof h == "string")
          return;
        var v;
        if (typeof h == "function")
          v = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === b))
          v = h.propTypes;
        else
          return;
        if (v) {
          var w = U(h);
          Pe(v, r.props, "prop", w, r);
        } else if (h.PropTypes !== void 0 && !fe) {
          fe = !0;
          var j = U(h);
          O("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && O("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function yn(r) {
      {
        for (var h = Object.keys(r.props), v = 0; v < h.length; v++) {
          var w = h[v];
          if (w !== "children" && w !== "key") {
            be(r), O("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), be(null);
            break;
          }
        }
        r.ref !== null && (be(r), O("Invalid attribute `ref` supplied to `React.Fragment`."), be(null));
      }
    }
    function Bt(r, h, v, w, j, N) {
      {
        var P = T(r);
        if (!P) {
          var M = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (M += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var oe = je(j);
          oe ? M += oe : M += Be();
          var W;
          r === null ? W = "null" : Ze(r) ? W = "array" : r !== void 0 && r.$$typeof === n ? (W = "<" + (U(r.type) || "Unknown") + " />", M = " Did you accidentally export a JSX literal instead of a component?") : W = typeof r, O("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", W, M);
        }
        var q = le(r, h, v, j, N);
        if (q == null)
          return q;
        if (P) {
          var me = h.children;
          if (me !== void 0)
            if (w)
              if (Ze(me)) {
                for (var Ge = 0; Ge < me.length; Ge++)
                  Ut(me[Ge], r);
                Object.freeze && Object.freeze(me);
              } else
                O("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ut(me, r);
        }
        return r === e ? yn(q) : bn(q), q;
      }
    }
    function En(r, h, v) {
      return Bt(r, h, v, !0);
    }
    function xn(r, h, v) {
      return Bt(r, h, v, !1);
    }
    var wn = xn, Cn = En;
    nt.Fragment = e, nt.jsx = wn, nt.jsxs = Cn;
  }()), nt;
}
process.env.NODE_ENV === "production" ? It.exports = aa() : It.exports = ra();
var l = It.exports;
function mn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const ia = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), oa = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function sa(t) {
  return /* @__PURE__ */ l.jsx(un.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    oa,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: ia })
  ] }) }, t.title);
}
function ca(t) {
  const [n, a] = ae(!1), [e, o] = ae(t.options), s = (p) => {
    t.onDragComplete(p), o(p);
  }, c = (p) => {
    const g = [...e];
    g.splice(p, 1), s(g);
  }, u = [];
  e.forEach((p, g) => {
    u.push(/* @__PURE__ */ l.jsx(sa, { index: g, title: p, onDelete: c }, p));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(mn, { title: t.title }),
    /* @__PURE__ */ l.jsx(un.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: u })
  ] });
}
function la(t) {
  const [n, a] = ae(!1), e = [];
  t.options.map((s, c) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(ua, { option: s }, c));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(mn, { title: t.title }),
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
function ua(t) {
  const { option: n } = t, [a, e] = ae("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        ca,
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
        la,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: o }, Xn());
}
function er(t) {
  let n;
  function a(c) {
    var d, p, g, b, x, C, S, F, Q;
    let u;
    switch (c.event) {
      case "custom":
        k.dispatchEvent({ type: D.CUSTOM, value: c.data });
        break;
      case "selectComponent":
        k.dispatchEvent({ type: D.SELECT_DROPDOWN, value: c.data });
        break;
      case "draggableListUpdate":
        k.dispatchEvent({ type: D.DRAG_UPDATE, value: c.data });
        break;
      case "addFolder":
        (d = t.components.get("debug")) == null || d.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (p = t.components.get("debug")) == null || p.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (g = t.components.get("debug")) == null || g.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (b = t.components.get("debug")) == null || b.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (x = t.components.get("debug")) == null || x.triggerButton(c.data.id);
        break;
      case "setSheet":
        u = (C = t.components.get("theatre")) == null ? void 0 : C.sheets.get(c.data.sheet), u !== void 0 && (n = u, et.setSelection([u]));
        break;
      case "setSheetObject":
        u = (S = t.components.get("theatre")) == null ? void 0 : S.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), u !== void 0 && et.setSelection([u]);
        break;
      case "updateSheetObject":
        u = (F = t.components.get("theatre")) == null ? void 0 : F.sheetObjectCBs.get(c.data.sheetObject), u !== void 0 && u(c.data.values);
        break;
      case "updateTimeline":
        n = (Q = t.components.get("theatre")) == null ? void 0 : Q.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
        break;
      case "getObject":
        k.dispatchEvent({ type: D.GET_OBJECT, value: c.data });
        break;
      case "updateObject":
        k.dispatchEvent({ type: D.UPDATE_OBJECT, value: c.data });
        break;
      case "createTexture":
        k.dispatchEvent({ type: D.CREATE_TEXTURE, value: c.data });
        break;
      case "requestMethod":
        k.dispatchEvent({ type: D.REQUEST_METHOD, value: c.data });
        break;
    }
  }
  function e(c) {
    switch (c.event) {
      case "custom":
        k.dispatchEvent({ type: D.CUSTOM, value: c.data });
        break;
      case "setObject":
        k.dispatchEvent({ type: D.SET_OBJECT, value: c.data });
        break;
      case "setScene":
        k.dispatchEvent({ type: D.SET_SCENE, value: c.data });
        break;
      case "addCamera":
        k.dispatchEvent({ type: D.ADD_CAMERA, value: c.data });
        break;
      case "removeCamera":
        k.dispatchEvent({ type: D.REMOVE_CAMERA, value: c.data });
        break;
    }
  }
  function o() {
    et.ui.hide();
  }
  function s() {
    et.ui.restore(), et.onSelectionChange((p) => {
      p.length < 1 || p.forEach((g) => {
        var S;
        let b = g.address.sheetId, x = "setSheet", C = {};
        switch (g.type) {
          case "Theatre_Sheet_PublicAPI":
            x = "setSheet", C = {
              sheet: g.address.sheetId
            }, n = (S = t.components.get("theatre")) == null ? void 0 : S.sheets.get(g.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            x = "setSheetObject", b += `_${g.address.objectKey}`, C = {
              id: b,
              sheet: g.address.sheetId,
              key: g.address.objectKey
            };
            break;
        }
        t.send({ event: x, target: "app", data: C });
      });
    });
    let c = 0;
    const u = () => {
      if (n !== void 0 && c !== n.sequence.position) {
        c = n.sequence.position;
        const p = n;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: c,
            sheet: p.address.sheetId
          }
        });
      }
    }, d = () => {
      u(), requestAnimationFrame(d);
    };
    u(), d();
  }
  t.listen((c) => {
    t.editor ? e(c) : a(c);
  }), t.editor ? s() : o();
}
const da = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, fa = `out vec4 fragColor;
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
class ha extends rn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Rn,
      side: Pn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Lt(16777215)
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
      vertexShader: da,
      fragmentShader: fa,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class pa extends jn {
  constructor() {
    const a = new ha();
    super(new _n(2, 2), a);
    Z(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ma = `#include <common>
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
}`, ga = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class va extends rn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ma,
      fragmentShader: ga
    });
  }
}
function Nt(t) {
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
          /* @__PURE__ */ l.jsx("p", { className: "label", children: t.label })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function gn(t) {
  const [n, a] = ae(!1), e = t.child.children.length > 0, o = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    o.push(/* @__PURE__ */ l.jsx(gn, { child: s, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${ea(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random());
}
function ba(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(gn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const ya = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Ea(t) {
  return "items" in t;
}
function We(t) {
  function n(e, o) {
    console.log("onChange:", e, o);
  }
  const a = [];
  return t.items.forEach((e) => {
    Ea(e) ? a.push(
      /* @__PURE__ */ l.jsx(We, { title: e.title, items: e.items }, Math.random())
    ) : a.push(
      /* @__PURE__ */ l.jsx(
        at,
        {
          title: e.title,
          prop: e.prop,
          value: e.value,
          type: e.type,
          min: e.min,
          max: e.max,
          step: e.step,
          disabled: e.disabled,
          onChange: (o, s) => {
            e.onChange !== void 0 ? e.onChange(o, s) : n(o, s);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Nt, { label: t.title, open: !1, children: a });
}
function xa(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function _e(t) {
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
function wa(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Ca() {
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
function Kt(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!xa(o))
      continue;
    const s = typeof t[o], c = t[o];
    if (s === "boolean" || s === "number" || s === "string") {
      const u = {
        title: _e(o),
        prop: o,
        type: s,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (d, p) => {
          var b;
          a.updateObject(n.uuid, `material.${d}`, p), s === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const g = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
          g !== void 0 && se(g, `material.${d}`, p);
        }
      };
      wa(o) && (u.value = Number(c), u.type = "range", u.min = 0, u.max = 1, u.step = 0.01), e.push(u);
    } else if (s === "object")
      if (c.isColor)
        e.push({
          title: _e(o),
          prop: o,
          type: "color",
          value: c,
          onChange: (u, d) => {
            var b;
            const p = new Lt(d);
            a.updateObject(n.uuid, `material.${u}`, p);
            const g = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
            g !== void 0 && se(g, `material.${u}`, p);
          }
        });
      else if (Array.isArray(c)) {
        const u = [];
        for (const d in c)
          u.push({
            title: `${d}`,
            type: `${typeof c[d]}`,
            value: c[d],
            onChange: (p, g) => {
              var x;
              a.updateObject(n.uuid, `material.${o}`, g);
              const b = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && se(b, `material.${o}`, g);
            }
          });
        e.push({
          title: _e(o),
          items: u
        });
      } else {
        const u = [];
        for (const d in c) {
          const p = c[d];
          switch (typeof p) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: _e(o),
                type: "image",
                value: p,
                onChange: (b, x) => {
                  var S;
                  a.createTexture(n.uuid, `material.${o}`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && At(x).then((F) => {
                    se(C, `material.${o}`, F), se(C, "material.needsUpdate", !0);
                  });
                }
              }) : u.push({
                title: `${_e(d)}`,
                prop: `material.${o}.${d}`,
                type: `${typeof t[o][d]}`,
                value: c[d],
                onChange: (b, x) => {
                  var S;
                  a.updateObject(n.uuid, `material.${o}.${d}`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && se(C, `material.${o}.${d}`, x);
                }
              });
              break;
            case "object":
              p.value !== void 0 && p.value.src !== void 0 ? u.push({
                title: _e(d),
                type: "image",
                value: p.value.src,
                onChange: (b, x) => {
                  var S;
                  a.createTexture(n.uuid, `material.${o}.${d}.value`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && At(x).then((F) => {
                    se(C, `material.${o}.${d}.value`, F);
                  });
                }
              }) : u.push({
                title: d,
                type: `${typeof p.value}`,
                value: p.value,
                onChange: (b, x) => {
                  var S;
                  a.updateObject(n.uuid, `material.${o}.${d}.value`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && se(C, `material.${o}.${d}.value`, x);
                }
              });
              break;
          }
        }
        u.length > 0 && e.push({
          title: _e(o),
          items: u
        });
      }
    else
      c !== void 0 && console.log("other:", o, s, c);
  }
  return e.sort((o, s) => o.title < s.title ? -1 : o.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Sa(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let s = 0; s < o; s++)
      e.push(
        /* @__PURE__ */ l.jsx(
          We,
          {
            title: `Material ${s}`,
            items: Kt(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      We,
      {
        title: "Material",
        items: Kt(a, t, n)
      }
    );
}
function at(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Zn(t.value));
  const [a, e] = ae(n), o = xe(null), s = xe(null), c = xe(null);
  Le(() => {
    var K;
    let g = !1, b = -1, x = 0, C = Number(a);
    const S = (de) => {
      g = !0, x = C, b = de.clientX;
    }, F = (de) => {
      if (!g)
        return;
      const ce = t.step !== void 0 ? t.step : 1, ee = (de.clientX - b) * ce;
      C = Number((x + ee).toFixed(4)), s.current !== null && (s.current.value = C.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, C);
    }, Q = () => {
      g = !1;
    }, H = () => {
      g = !1;
    }, O = t.type === "number";
    return O && ((K = o.current) == null || K.addEventListener("mousedown", S, !1), document.addEventListener("mouseup", Q, !1), document.addEventListener("mousemove", F, !1), document.addEventListener("contextmenu", H, !1)), () => {
      var de;
      O && ((de = o.current) == null || de.removeEventListener("mousedown", S), document.removeEventListener("mouseup", Q), document.removeEventListener("mousemove", F), document.removeEventListener("contextmenu", H));
    };
  }, [a]);
  const u = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = u || t.type === "image", p = (g) => {
    let b = g.target.value;
    t.type === "boolean" && (b = g.target.checked), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: t.title }, "fieldLabel"),
    t.type === "string" && !u && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: p,
        value: a
      }
    ),
    t.type === "string" && u && /* @__PURE__ */ l.jsx(
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
    t.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: c, onClick: () => {
      Ca().then((g) => {
        c.current.src = g, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, g);
      });
    }, src: a.length > 0 ? a : ya })
  ] });
}
function Xt(t) {
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
function Oa(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Xt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          var u;
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (u = n.scene) == null ? void 0 : u.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (se(c, o, s), c.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: Xt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          var u;
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (u = n.scene) == null ? void 0 : u.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (se(c, o, s), c.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    We,
    {
      title: "Camera",
      items: a
    }
  );
}
const Ta = Math.PI / 180, Ma = 180 / Math.PI;
function Ye(t, n, a, e, o) {
  return e + (t - n) * (o - e) / (a - n);
}
function Ra(t) {
  return t * Ta;
}
function jt(t) {
  return t * Ma;
}
function Pa(t, n) {
  const a = new kn();
  a.elements = t.matrix;
  const e = new Y(), o = new Dn(), s = new Y();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const c = (d, p) => {
    var b;
    n.updateObject(t.uuid, d, p);
    const g = (b = n.scene) == null ? void 0 : b.getObjectByProperty("uuid", t.uuid);
    g !== void 0 && se(g, d, p);
  }, u = (d, p) => {
    c(d, Ra(p));
  };
  return /* @__PURE__ */ l.jsx(
    We,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: c
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: c
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: c
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: Rt(jt(o.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: u
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Rt(jt(o.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: u
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Rt(jt(o.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: u
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: s.x,
          step: 0.01,
          onChange: c
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: c
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: c
        }
      ]
    }
  );
}
function qt(t) {
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
function ja(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: qt(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (s, c) => {
          var p;
          const u = new Lt(c);
          n.updateObject(t.uuid, s, u);
          const d = (p = n.scene) == null ? void 0 : p.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && se(d, s, u);
        }
      }) : a.push({
        title: qt(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (s, c) => {
          var d;
          n.updateObject(t.uuid, s, c);
          const u = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && se(u, s, c);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    We,
    {
      title: "Light",
      items: a
    }
  );
}
function _a(t) {
  const [n, a] = ae(-1), [e, o] = ae({
    name: "",
    uuid: "",
    type: "",
    visible: !1,
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0
  });
  Le(() => {
    function c(u) {
      const d = u.value;
      o(d), a(Date.now());
    }
    return k.addEventListener(D.SET_OBJECT, c), () => {
      k.removeEventListener(D.SET_OBJECT, c);
    };
  }, []);
  const s = e.type.toLowerCase();
  return /* @__PURE__ */ l.jsx(Nt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: e.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        at,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: e.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        at,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: e.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        at,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: e.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        at,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: e.visible,
          onChange: (c, u) => {
            var p;
            t.three.updateObject(e.uuid, c, u);
            const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", e.uuid);
            d !== void 0 && se(d, c, u);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Pa(e, t.three),
      s.search("camera") > -1 ? Oa(e, t.three) : null,
      s.search("light") > -1 ? ja(e, t.three) : null,
      s.search("mesh") > -1 ? Sa(e, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class tr extends Hn {
  constructor(a) {
    super(a);
    Z(this, "three");
    // Private
    Z(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      scene: a.scene !== void 0 ? a.scene : null
    }, this.three = a.three, k.addEventListener(D.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    k.removeEventListener(D.SET_SCENE, this.setScene);
  }
  render() {
    var o;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(o = this.componentState.scene) == null ? void 0 : o.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(Nt, { label: e, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: a && /* @__PURE__ */ l.jsx(ba, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(_a, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function nr(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (u) => {
    var p;
    if (!n())
      return;
    const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", u.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (u, d, p) => {
    var b;
    if (!n())
      return;
    const g = (b = t.three.scene) == null ? void 0 : b.getObjectByProperty("uuid", u);
    g !== void 0 && se(g, d, p);
  }, o = (u) => {
    if (!n())
      return;
    const d = u.value, { key: p, value: g, uuid: b } = d;
    e(b, p, g);
  }, s = (u) => {
    if (!n())
      return;
    const d = u.value;
    At(d.value).then((p) => {
      e(d.uuid, d.key, p), e(d.uuid, "material.needsUpdate", !0);
    });
  }, c = (u) => {
    var x;
    if (!n())
      return;
    const { key: d, uuid: p, value: g } = u.value, b = (x = t.three.scene) == null ? void 0 : x.getObjectByProperty("uuid", p);
    if (b !== void 0)
      try {
        b[d](g);
      } catch (C) {
        console.log("Error requesting method:"), console.log(C), console.log(d), console.log(g);
      }
  };
  return Le(() => (k.addEventListener(D.GET_OBJECT, a), k.addEventListener(D.UPDATE_OBJECT, o), k.addEventListener(D.CREATE_TEXTURE, s), k.addEventListener(D.REQUEST_METHOD, c), () => {
    k.removeEventListener(D.GET_OBJECT, a), k.removeEventListener(D.UPDATE_OBJECT, o), k.removeEventListener(D.CREATE_TEXTURE, s), k.removeEventListener(D.REQUEST_METHOD, c);
  }), []), null;
}
const Zt = { type: "change" }, _t = { type: "start" }, Jt = { type: "end" }, vt = new An(), Qt = new In(), ka = Math.cos(70 * Ln.DEG2RAD);
class Da extends nn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Y(), this.cursor = new Y(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ve.ROTATE, MIDDLE: Ve.DOLLY, RIGHT: Ve.PAN }, this.touches = { ONE: ze.ROTATE, TWO: ze.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return u.phi;
    }, this.getAzimuthalAngle = function() {
      return u.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(i) {
      i.addEventListener("keydown", Je), this._domElementKeyEvents = i;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Je), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Zt), e.update(), s = o.NONE;
    }, this.update = function() {
      const i = new Y(), E = new Vt().setFromUnitVectors(n.up, new Y(0, 1, 0)), _ = E.clone().invert(), L = new Y(), te = new Vt(), ve = new Y(), le = 2 * Math.PI;
      return function(gt = null) {
        const be = e.object.position;
        i.copy(be).sub(e.target), i.applyQuaternion(E), u.setFromVector3(i), e.autoRotate && s === o.NONE && V(y(gt)), e.enableDamping ? (u.theta += d.theta * e.dampingFactor, u.phi += d.phi * e.dampingFactor) : (u.theta += d.theta, u.phi += d.phi);
        let fe = e.minAzimuthAngle, he = e.maxAzimuthAngle;
        isFinite(fe) && isFinite(he) && (fe < -Math.PI ? fe += le : fe > Math.PI && (fe -= le), he < -Math.PI ? he += le : he > Math.PI && (he -= le), fe <= he ? u.theta = Math.max(fe, Math.min(he, u.theta)) : u.theta = u.theta > (fe + he) / 2 ? Math.max(fe, u.theta) : Math.min(he, u.theta)), u.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, u.phi)), u.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(g, e.dampingFactor) : e.target.add(g), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && ee || e.object.isOrthographicCamera ? u.radius = X(u.radius) : u.radius = X(u.radius * p), i.setFromSpherical(u), i.applyQuaternion(_), be.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, g.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), g.set(0, 0, 0));
        let Be = !1;
        if (e.zoomToCursor && ee) {
          let je = null;
          if (e.object.isPerspectiveCamera) {
            const Se = i.length();
            je = X(Se * p);
            const $e = Se - je;
            e.object.position.addScaledVector(de, $e), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Se = new Y(ce.x, ce.y, 0);
            Se.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), Be = !0;
            const $e = new Y(ce.x, ce.y, 0);
            $e.unproject(e.object), e.object.position.sub($e).add(Se), e.object.updateMatrixWorld(), je = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          je !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(je).add(e.object.position) : (vt.origin.copy(e.object.position), vt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(vt.direction)) < ka ? n.lookAt(e.target) : (Qt.setFromNormalAndCoplanarPoint(e.object.up, e.target), vt.intersectPlane(Qt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), Be = !0);
        return p = 1, ee = !1, Be || L.distanceToSquared(e.object.position) > c || 8 * (1 - te.dot(e.object.quaternion)) > c || ve.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Zt), L.copy(e.object.position), te.copy(e.object.quaternion), ve.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ce), e.domElement.removeEventListener("pointerdown", qe), e.domElement.removeEventListener("pointercancel", Pe), e.domElement.removeEventListener("wheel", dt), e.domElement.removeEventListener("pointermove", we), e.domElement.removeEventListener("pointerup", Pe), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Je), e._domElementKeyEvents = null);
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
    const c = 1e-6, u = new zt(), d = new zt();
    let p = 1;
    const g = new Y(), b = new ue(), x = new ue(), C = new ue(), S = new ue(), F = new ue(), Q = new ue(), H = new ue(), O = new ue(), K = new ue(), de = new Y(), ce = new ue();
    let ee = !1;
    const f = [], m = {};
    function y(i) {
      return i !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function T(i) {
      const E = Math.abs(i) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * E);
    }
    function V(i) {
      d.theta -= i;
    }
    function z(i) {
      d.phi -= i;
    }
    const U = function() {
      const i = new Y();
      return function(_, L) {
        i.setFromMatrixColumn(L, 0), i.multiplyScalar(-_), g.add(i);
      };
    }(), A = function() {
      const i = new Y();
      return function(_, L) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(L, 1) : (i.setFromMatrixColumn(L, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(_), g.add(i);
      };
    }(), B = function() {
      const i = new Y();
      return function(_, L) {
        const te = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const ve = e.object.position;
          i.copy(ve).sub(e.target);
          let le = i.length();
          le *= Math.tan(e.object.fov / 2 * Math.PI / 180), U(2 * _ * le / te.clientHeight, e.object.matrix), A(2 * L * le / te.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (U(_ * (e.object.right - e.object.left) / e.object.zoom / te.clientWidth, e.object.matrix), A(L * (e.object.top - e.object.bottom) / e.object.zoom / te.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function J(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function R(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function I(i, E) {
      if (!e.zoomToCursor)
        return;
      ee = !0;
      const _ = e.domElement.getBoundingClientRect(), L = i - _.left, te = E - _.top, ve = _.width, le = _.height;
      ce.x = L / ve * 2 - 1, ce.y = -(te / le) * 2 + 1, de.set(ce.x, ce.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function X(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function pe(i) {
      b.set(i.clientX, i.clientY);
    }
    function Oe(i) {
      I(i.clientX, i.clientX), H.set(i.clientX, i.clientY);
    }
    function He(i) {
      S.set(i.clientX, i.clientY);
    }
    function ot(i) {
      x.set(i.clientX, i.clientY), C.subVectors(x, b).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      V(2 * Math.PI * C.x / E.clientHeight), z(2 * Math.PI * C.y / E.clientHeight), b.copy(x), e.update();
    }
    function Ct(i) {
      O.set(i.clientX, i.clientY), K.subVectors(O, H), K.y > 0 ? J(T(K.y)) : K.y < 0 && R(T(K.y)), H.copy(O), e.update();
    }
    function St(i) {
      F.set(i.clientX, i.clientY), Q.subVectors(F, S).multiplyScalar(e.panSpeed), B(Q.x, Q.y), S.copy(F), e.update();
    }
    function Ke(i) {
      I(i.clientX, i.clientY), i.deltaY < 0 ? R(T(i.deltaY)) : i.deltaY > 0 && J(T(i.deltaY)), e.update();
    }
    function Xe(i) {
      let E = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? z(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(0, e.keyPanSpeed), E = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? z(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(0, -e.keyPanSpeed), E = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? V(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(e.keyPanSpeed, 0), E = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? V(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(-e.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (i.preventDefault(), e.update());
    }
    function Te(i) {
      if (f.length === 1)
        b.set(i.pageX, i.pageY);
      else {
        const E = ge(i), _ = 0.5 * (i.pageX + E.x), L = 0.5 * (i.pageY + E.y);
        b.set(_, L);
      }
    }
    function Fe(i) {
      if (f.length === 1)
        S.set(i.pageX, i.pageY);
      else {
        const E = ge(i), _ = 0.5 * (i.pageX + E.x), L = 0.5 * (i.pageY + E.y);
        S.set(_, L);
      }
    }
    function Me(i) {
      const E = ge(i), _ = i.pageX - E.x, L = i.pageY - E.y, te = Math.sqrt(_ * _ + L * L);
      H.set(0, te);
    }
    function Ot(i) {
      e.enableZoom && Me(i), e.enablePan && Fe(i);
    }
    function st(i) {
      e.enableZoom && Me(i), e.enableRotate && Te(i);
    }
    function ct(i) {
      if (f.length == 1)
        x.set(i.pageX, i.pageY);
      else {
        const _ = ge(i), L = 0.5 * (i.pageX + _.x), te = 0.5 * (i.pageY + _.y);
        x.set(L, te);
      }
      C.subVectors(x, b).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      V(2 * Math.PI * C.x / E.clientHeight), z(2 * Math.PI * C.y / E.clientHeight), b.copy(x);
    }
    function lt(i) {
      if (f.length === 1)
        F.set(i.pageX, i.pageY);
      else {
        const E = ge(i), _ = 0.5 * (i.pageX + E.x), L = 0.5 * (i.pageY + E.y);
        F.set(_, L);
      }
      Q.subVectors(F, S).multiplyScalar(e.panSpeed), B(Q.x, Q.y), S.copy(F);
    }
    function Re(i) {
      const E = ge(i), _ = i.pageX - E.x, L = i.pageY - E.y, te = Math.sqrt(_ * _ + L * L);
      O.set(0, te), K.set(0, Math.pow(O.y / H.y, e.zoomSpeed)), J(K.y), H.copy(O);
      const ve = (i.pageX + E.x) * 0.5, le = (i.pageY + E.y) * 0.5;
      I(ve, le);
    }
    function Ue(i) {
      e.enableZoom && Re(i), e.enablePan && lt(i);
    }
    function ut(i) {
      e.enableZoom && Re(i), e.enableRotate && ct(i);
    }
    function qe(i) {
      e.enabled !== !1 && (f.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", we), e.domElement.addEventListener("pointerup", Pe)), Mt(i), i.pointerType === "touch" ? ft(i) : Tt(i));
    }
    function we(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? ht(i) : Ze(i));
    }
    function Pe(i) {
      pt(i), f.length === 0 && (e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", we), e.domElement.removeEventListener("pointerup", Pe)), e.dispatchEvent(Jt), s = o.NONE;
    }
    function Tt(i) {
      let E;
      switch (i.button) {
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
        case Ve.DOLLY:
          if (e.enableZoom === !1)
            return;
          Oe(i), s = o.DOLLY;
          break;
        case Ve.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enablePan === !1)
              return;
            He(i), s = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            pe(i), s = o.ROTATE;
          }
          break;
        case Ve.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enableRotate === !1)
              return;
            pe(i), s = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            He(i), s = o.PAN;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent(_t);
    }
    function Ze(i) {
      switch (s) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          ot(i);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ct(i);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          St(i);
          break;
      }
    }
    function dt(i) {
      e.enabled === !1 || e.enableZoom === !1 || s !== o.NONE || (i.preventDefault(), e.dispatchEvent(_t), Ke(i), e.dispatchEvent(Jt));
    }
    function Je(i) {
      e.enabled === !1 || e.enablePan === !1 || Xe(i);
    }
    function ft(i) {
      switch (Qe(i), f.length) {
        case 1:
          switch (e.touches.ONE) {
            case ze.ROTATE:
              if (e.enableRotate === !1)
                return;
              Te(i), s = o.TOUCH_ROTATE;
              break;
            case ze.PAN:
              if (e.enablePan === !1)
                return;
              Fe(i), s = o.TOUCH_PAN;
              break;
            default:
              s = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case ze.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              Ot(i), s = o.TOUCH_DOLLY_PAN;
              break;
            case ze.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              st(i), s = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = o.NONE;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent(_t);
    }
    function ht(i) {
      switch (Qe(i), s) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ct(i), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          lt(i), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Ue(i), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          ut(i), e.update();
          break;
        default:
          s = o.NONE;
      }
    }
    function Ce(i) {
      e.enabled !== !1 && i.preventDefault();
    }
    function Mt(i) {
      f.push(i.pointerId);
    }
    function pt(i) {
      delete m[i.pointerId];
      for (let E = 0; E < f.length; E++)
        if (f[E] == i.pointerId) {
          f.splice(E, 1);
          return;
        }
    }
    function Qe(i) {
      let E = m[i.pointerId];
      E === void 0 && (E = new ue(), m[i.pointerId] = E), E.set(i.pageX, i.pageY);
    }
    function ge(i) {
      const E = i.pointerId === f[0] ? f[1] : f[0];
      return m[E];
    }
    e.domElement.addEventListener("contextmenu", Ce), e.domElement.addEventListener("pointerdown", qe), e.domElement.addEventListener("pointercancel", Pe), e.domElement.addEventListener("wheel", dt, { passive: !1 }), this.update();
  }
}
const Et = (t) => {
  const [n, a] = ae(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, o = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => o(s), children: s }, s)) })
  ] });
}, ke = Kn(function(n, a) {
  const [e, o] = ae(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && o(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Et,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (c) => {
          o(c);
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
], ne = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map();
function Ne(t, n) {
  const a = new on(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ne.set(t, a), a;
}
Ne("Top", new Y(0, 1e3, 0));
Ne("Bottom", new Y(0, -1e3, 0));
Ne("Left", new Y(-1e3, 0, 0));
Ne("Right", new Y(1e3, 0, 0));
Ne("Front", new Y(0, 0, 1e3));
Ne("Back", new Y(0, 0, -1e3));
Ne("Orthographic", new Y(1e3, 1e3, 1e3));
const wt = new kt(60, 1, 50, 3e3);
wt.name = "Debug";
wt.position.set(500, 500, 500);
wt.lookAt(0, 0, 0);
ne.set("Debug", wt);
const tn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Aa = new Nn(), Ia = new Fn(), La = new va(), Na = new Un({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let bt = "Renderer";
const G = new sn();
G.name = "Debug Scene";
let Ie = new sn();
G.add(Ie);
const it = new Bn();
it.name = "helpers";
G.add(it);
const Fa = new pa();
it.add(Fa);
const vn = new cn(500);
vn.name = "axisHelper";
it.add(vn);
const rt = new cn(100);
rt.name = "interactionHelper";
it.add(rt);
rt.visible = !1;
let yt = !1, $ = ne.get("Debug"), ie = ne.get("Orthographic"), De = ne.get("Front"), Ae = ne.get("Top");
function ar(t) {
  const [n, a] = ae(t.mode !== void 0 ? t.mode : "Quad"), [e, o] = ae(null), [s, c] = ae(!1), [u, d] = ae(!1), [p, g] = ae(!1), [, b] = ae(Date.now()), x = xe(null), C = xe(null), S = xe(null), F = xe(null), Q = xe(null), H = xe(null), O = (f, m) => {
    const y = re.get(f.name);
    y !== void 0 && y.dispose(), re.delete(f.name);
    const T = Ee.get(f.name);
    T !== void 0 && (G.remove(T), T.dispose()), Ee.delete(f.name);
    const V = new Da(f, m);
    switch (V.enableDamping = !0, V.dampingFactor = 0.05, f.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        V.enableRotate = !1;
        break;
    }
    if (re.set(f.name, V), f instanceof kt) {
      const z = new Vn(f);
      Ee.set(f.name, z), G.add(z);
    }
  }, K = (f) => {
    const m = Ee.get(f.name);
    m !== void 0 && (G.remove(m), m.dispose(), Ee.delete(f.name));
    const y = re.get(f.name);
    y !== void 0 && (y.dispose(), re.delete(f.name));
  }, de = () => {
    re.forEach((f, m) => {
      f.dispose();
      const y = Ee.get(m);
      y !== void 0 && (G.remove(y), y.dispose()), Ee.delete(m), re.delete(m);
    }), re.clear(), Ee.clear();
  }, ce = () => {
    switch (n) {
      case "Single":
        O($, S.current);
        break;
      case "Side by Side":
      case "Stacked":
        O($, S.current), O(ie, F.current);
        break;
      case "Quad":
        O($, S.current), O(ie, F.current), O(De, Q.current), O(Ae, H.current);
        break;
    }
  };
  Le(() => {
    const f = new $n({
      canvas: x.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), o(f);
  }, []), Le(() => {
    const f = () => {
      fn(Ie), G.remove(Ie), t.three.scene !== void 0 && (Ie = t.three.scene, G.add(Ie));
    }, m = (T) => {
      var U;
      const V = T.value, z = (U = t.three.scene) == null ? void 0 : U.getObjectByProperty("uuid", V.uuid);
      z !== void 0 && ne.set(V.name, z), b(Date.now());
    }, y = (T) => {
      ne.delete(T.value.name), b(Date.now());
    };
    return k.addEventListener(D.SET_SCENE, f), k.addEventListener(D.ADD_CAMERA, m), k.addEventListener(D.REMOVE_CAMERA, y), () => {
      k.removeEventListener(D.SET_SCENE, f), k.removeEventListener(D.ADD_CAMERA, m), k.removeEventListener(D.REMOVE_CAMERA, y);
    };
  }, []), Le(() => {
    if (e === null)
      return;
    let f = window.innerWidth, m = window.innerHeight, y = Math.floor(f / 2), T = Math.floor(m / 2), V = -1;
    const z = () => {
      f = window.innerWidth - 300, m = window.innerHeight, y = Math.floor(f / 2), T = Math.floor(m / 2), e.setSize(f, m);
      let R = f, I = m;
      switch (n) {
        case "Side by Side":
          R = y, I = m;
          break;
        case "Stacked":
          R = f, I = T;
          break;
        case "Quad":
          R = y, I = T;
          break;
      }
      ne.forEach((X) => {
        var pe;
        X instanceof on ? (X.left = R / -2, X.right = R / 2, X.top = I / 2, X.bottom = I / -2, X.updateProjectionMatrix()) : X instanceof kt && (X.aspect = R / I, X.updateProjectionMatrix(), (pe = Ee.get(X.name)) == null || pe.update());
      });
    }, U = () => {
      e.setViewport(0, 0, f, m), e.setScissor(0, 0, f, m), e.render(G, $);
    }, A = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, y, m), e.setScissor(0, 0, y, m), e.render(G, $), e.setViewport(y, 0, y, m), e.setScissor(y, 0, y, m), e.render(G, ie);
      else {
        const R = m - T;
        e.setViewport(0, R, f, T), e.setScissor(0, R, f, T), e.render(G, $), e.setViewport(0, 0, f, T), e.setScissor(0, 0, f, T), e.render(G, ie);
      }
    }, B = () => {
      let R = 0, I = 0;
      I = m - T, R = 0, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, $), R = y, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, ie), I = 0, R = 0, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, De), R = y, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, Ae);
    }, J = () => {
      switch (re.forEach((R) => {
        R.update();
      }), e.clear(), n) {
        case "Single":
          U();
          break;
        case "Side by Side":
        case "Stacked":
          A();
          break;
        case "Quad":
          B();
          break;
      }
      V = requestAnimationFrame(J);
    };
    return ce(), window.addEventListener("resize", z), z(), J(), () => {
      window.removeEventListener("resize", z), cancelAnimationFrame(V), V = -1;
    };
  }, [n, e]), Le(() => {
    if (e !== null) {
      const f = new Gn(), m = new ue(), y = (U, A, B, J) => {
        switch (n) {
          case "Quad":
            U < B ? A < J ? f.setFromCamera(m, $) : f.setFromCamera(m, De) : A < J ? f.setFromCamera(m, ie) : f.setFromCamera(m, Ae);
            break;
          case "Side by Side":
            U < B ? f.setFromCamera(m, $) : f.setFromCamera(m, ie);
            break;
          case "Single":
            f.setFromCamera(m, $);
            break;
          case "Stacked":
            A < J ? f.setFromCamera(m, $) : f.setFromCamera(m, ie);
            break;
        }
      }, T = (U) => {
        if (!yt)
          return;
        const A = new ue();
        e.getSize(A);
        const B = Math.min(U.clientX, A.x), J = Math.min(U.clientY, A.y);
        m.x = Ye(B, 0, A.x, -1, 1), m.y = Ye(J, 0, A.y, 1, -1);
        const R = A.x / 2, I = A.y / 2, X = () => {
          B < R ? m.x = Ye(B, 0, R, -1, 1) : m.x = Ye(B, R, A.x, -1, 1);
        }, pe = () => {
          J < I ? m.y = Ye(J, 0, I, 1, -1) : m.y = Ye(J, I, A.y, 1, -1);
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
        y(B, J, R, I);
        const Oe = f.intersectObjects(Ie.children);
        Oe.length > 0 && rt.position.copy(Oe[0].point);
      }, V = (U) => {
        if (!yt)
          return;
        const A = new ue();
        if (e.getSize(A), U.clientX >= A.x)
          return;
        T(U);
        const B = f.intersectObjects(Ie.children);
        B.length > 0 && t.three.getObject(B[0].object.uuid);
      }, z = C.current;
      return z.addEventListener("mousemove", T, !1), z.addEventListener("click", V, !1), () => {
        z.removeEventListener("mousemove", T), z.removeEventListener("click", V);
      };
    }
  }, [n, e]);
  const ee = [];
  return ne.forEach((f, m) => {
    ee.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: x }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: C, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(ke, { camera: $, options: ee, ref: S, onSelect: (f) => {
        var y;
        (y = re.get($.name)) == null || y.dispose();
        const m = ne.get(f);
        m !== void 0 && (K($), $ = m, O(m, S.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(ke, { camera: $, options: ee, ref: S, onSelect: (f) => {
          var y;
          (y = re.get($.name)) == null || y.dispose();
          const m = ne.get(f);
          m !== void 0 && (K($), $ = m, O(m, S.current));
        } }),
        /* @__PURE__ */ l.jsx(ke, { camera: ie, options: ee, ref: F, onSelect: (f) => {
          var y;
          (y = re.get(ie.name)) == null || y.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(ie), ie = m, O(m, F.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(ke, { camera: $, options: ee, ref: S, onSelect: (f) => {
          var y;
          (y = re.get($.name)) == null || y.dispose();
          const m = ne.get(f);
          m !== void 0 && (K($), $ = m, O(m, S.current));
        } }),
        /* @__PURE__ */ l.jsx(ke, { camera: ie, options: ee, ref: F, onSelect: (f) => {
          var y;
          (y = re.get(ie.name)) == null || y.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(ie), ie = m, O(m, F.current));
        } }),
        /* @__PURE__ */ l.jsx(ke, { camera: De, options: ee, ref: Q, onSelect: (f) => {
          var y;
          (y = re.get(De.name)) == null || y.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(De), De = m, O(m, Q.current));
        } }),
        /* @__PURE__ */ l.jsx(ke, { camera: Ae, options: ee, ref: H, onSelect: (f) => {
          var y;
          (y = re.get(Ae.name)) == null || y.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(Ae), Ae = m, O(m, H.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Et,
        {
          index: en.indexOf(n),
          options: en,
          onSelect: (f) => {
            f !== n && (de(), a(f));
          },
          open: s,
          onToggle: (f) => {
            c(f), u && d(!1), p && g(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Et,
        {
          index: tn.indexOf(bt),
          options: tn,
          onSelect: (f) => {
            if (f !== bt)
              switch (bt = f, bt) {
                case "Depth":
                  G.overrideMaterial = Aa;
                  break;
                case "Normals":
                  G.overrideMaterial = Ia;
                  break;
                default:
                case "Renderer":
                  G.overrideMaterial = null;
                  break;
                case "Wireframe":
                  G.overrideMaterial = Na;
                  break;
                case "UVs":
                  G.overrideMaterial = La;
                  break;
              }
          },
          open: u,
          onToggle: (f) => {
            s && c(!1), d(f), p && g(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Et,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (f) => {
            yt = f === "Selection Mode", rt.visible = yt;
          },
          open: p,
          onToggle: (f) => {
            s && c(!1), u && d(!1), g(f);
          }
        }
      )
    ] })
  ] });
}
function rr(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Nt as Accordion,
  Xa as Application,
  xt as BaseRemote,
  gn as ChildObject,
  ba as ContainerObject,
  ca as Draggable,
  sa as DraggableItem,
  la as Dropdown,
  ua as DropdownItem,
  rr as Editor,
  pa as InfiniteGridHelper,
  _a as Inspector,
  ar as MultiView,
  mn as NavButton,
  qa as RemoteComponents,
  er as RemoteController,
  Za as RemoteTheatre,
  Ja as RemoteThree,
  Qa as RemoteTweakpane,
  nr as SceneInspector,
  tr as SidePanel,
  D as ToolEvents,
  va as UVMaterial,
  Wa as clamp,
  Zn as colorToHex,
  k as debugDispatcher,
  fn as dispose,
  Qn as disposeMaterial,
  Ka as disposeTexture,
  Ha as distance,
  dn as hierarchyUUID,
  qn as isColor,
  Xn as randomID,
  Jn as resetThreeObjects,
  Rt as round,
  Dt as totalThreeObjects
};
