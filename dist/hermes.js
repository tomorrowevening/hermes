var Sn = Object.defineProperty;
var On = (t, n, a) => n in t ? Sn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var Z = (t, n, a) => (On(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as Tn, EventDispatcher as nn, Texture as an, CubeTexture as Mn, RepeatWrapping as Gt, ShaderMaterial as rn, GLSL3 as Rn, DoubleSide as Pn, Color as Nt, Mesh as jn, PlaneGeometry as _n, Matrix4 as kn, Vector3 as Y, Euler as An, AnimationMixer as Dn, Ray as In, Plane as Nn, MathUtils as Ln, MOUSE as ze, TOUCH as Ye, Quaternion as Vt, Spherical as zt, Vector2 as ue, PerspectiveCamera as kt, MeshDepthMaterial as Fn, MeshNormalMaterial as Un, MeshBasicMaterial as Bn, OrthographicCamera as on, Scene as sn, Group as $n, AxesHelper as cn, WebGLRenderer as Gn, Raycaster as Vn, CameraHelper as zn } from "three";
import { getProject as Yn } from "@theatre/core";
import { Pane as Wn } from "tweakpane";
import * as Hn from "@tweakpane/plugin-essentials";
import ln, { useState as ie, useRef as xe, useEffect as Ne, Component as Kn, forwardRef as Xn } from "react";
import { Reorder as un } from "framer-motion";
import et from "@theatre/studio";
function Ka(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Xa(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function qn() {
  return Math.round(Math.random() * 1e6).toString();
}
function Zn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Jn(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), r = (d) => {
    const p = d.toString(16);
    return p.length === 1 ? "0" + p : p;
  }, s = r(n), c = r(a), l = r(e);
  return "#" + s + c + l;
}
function Rt(t, n = 1) {
  return Number(t.toFixed(n));
}
let At = 0;
const Qn = () => {
  At = 0;
}, dn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${At}`, At++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    dn(a);
  });
}, qa = (t) => {
  t == null || t.dispose();
}, ea = (t) => {
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
      (n = a.geometry) == null || n.dispose(), ea(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Za {
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
const k = new nn(), A = {
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
class Ja extends xt {
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
class Qa extends xt {
  constructor(a, e, r) {
    super(a);
    Z(this, "project");
    Z(this, "sheets");
    Z(this, "sheetObjects");
    Z(this, "sheetObjectCBs");
    Z(this, "sheetObjectUnsubscribe");
    this.project = Yn(e, r), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
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
  sheetObject(a, e, r, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheets.get(a);
    if (c === void 0)
      return;
    const l = `${a}_${e}`;
    let d = this.sheetObjects.get(l);
    if (d !== void 0)
      return d = c.object(e, { ...r, ...d.value }, { reconfigure: !0 }), d;
    d = c.object(e, r), this.sheetObjects.set(l, d), this.sheetObjectCBs.set(l, s !== void 0 ? s : hn);
    const p = d.onValuesChange((m) => {
      if (this.app.editor) {
        for (const b in m) {
          const x = m[b];
          typeof x == "object" && Zn(x) && (m[b] = {
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
            values: m
          }
        });
      } else {
        const b = this.sheetObjectCBs.get(l);
        b !== void 0 && b(m);
      }
    });
    return this.sheetObjectUnsubscribe.set(l, p), d;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = `${a.address.sheetId}_${a.address.objectKey}`, r = this.sheetObjectUnsubscribe.get(e);
    r !== void 0 && r();
  }
}
function ta(t) {
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
function na(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function aa(t) {
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
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || aa(a))
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
            if (r instanceof an) {
              const s = r.source.toJSON();
              n[a] = { src: s.url };
            } else
              r instanceof Mn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = na(n[a]));
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
        r.push(Yt(s));
      }), n.material = r;
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
function Dt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const r = new an(e);
      r.wrapS = Gt, r.wrapT = Gt, r.needsUpdate = !0, n(r);
    }, e.onerror = a, e.src = t;
  });
}
class ei extends xt {
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
    if (a === void 0)
      return;
    this.scene = a, Qn(), dn(this.scene);
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
class ti extends xt {
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
    this.pane = new Wn({ title: "GUI" }), this.pane.registerPlugin(Hn);
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
    const c = this.bindID, l = r.onChange !== void 0 ? r.onChange : hn;
    this.bindCBs.set(c, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(a, e, r).on("change", (p) => {
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
function ia() {
  if (Wt)
    return tt;
  Wt = 1;
  var t = ln, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(l, d, p) {
    var m, b = {}, x = null, C = null;
    p !== void 0 && (x = "" + p), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (C = d.ref);
    for (m in d)
      e.call(d, m) && !s.hasOwnProperty(m) && (b[m] = d[m]);
    if (l && l.defaultProps)
      for (m in d = l.defaultProps, d)
        b[m] === void 0 && (b[m] = d[m]);
    return { $$typeof: n, type: l, key: x, ref: C, props: b, _owner: r.current };
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
    var t = ln, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), S = Symbol.iterator, F = "@@iterator";
    function Q(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = S && i[S] || i[F];
      return typeof h == "function" ? h : null;
    }
    var H = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function O(i) {
      {
        for (var h = arguments.length, v = new Array(h > 1 ? h - 1 : 0), w = 1; w < h; w++)
          v[w - 1] = arguments[w];
        K("error", i, v);
      }
    }
    function K(i, h, v) {
      {
        var w = H.ReactDebugCurrentFrame, j = w.getStackAddendum();
        j !== "" && (h += "%s", v = v.concat([j]));
        var L = v.map(function(P) {
          return String(P);
        });
        L.unshift("Warning: " + h), Function.prototype.apply.call(console[i], console, L);
      }
    }
    var de = !1, ce = !1, te = !1, f = !1, g = !1, y;
    y = Symbol.for("react.module.reference");
    function T(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || g || i === r || i === p || i === m || f || i === C || de || ce || te || typeof i == "object" && i !== null && (i.$$typeof === x || i.$$typeof === b || i.$$typeof === c || i.$$typeof === l || i.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === y || i.getModuleId !== void 0));
    }
    function V(i, h, v) {
      var w = i.displayName;
      if (w)
        return w;
      var j = h.displayName || h.name || "";
      return j !== "" ? v + "(" + j + ")" : v;
    }
    function z(i) {
      return i.displayName || "Context";
    }
    function U(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && O("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case m:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case l:
            var h = i;
            return z(h) + ".Consumer";
          case c:
            var v = i;
            return z(v._context) + ".Provider";
          case d:
            return V(i, i.render, "ForwardRef");
          case b:
            var w = i.displayName || null;
            return w !== null ? w : U(i.type) || "Memo";
          case x: {
            var j = i, L = j._payload, P = j._init;
            try {
              return U(P(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, B = 0, J, R, I, X, pe, Oe, He;
    function ot() {
    }
    ot.__reactDisabledLog = !0;
    function Ct() {
      {
        if (B === 0) {
          J = console.log, R = console.info, I = console.warn, X = console.error, pe = console.group, Oe = console.groupCollapsed, He = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: ot,
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
        B++;
      }
    }
    function St() {
      {
        if (B--, B === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, i, {
              value: J
            }),
            info: D({}, i, {
              value: R
            }),
            warn: D({}, i, {
              value: I
            }),
            error: D({}, i, {
              value: X
            }),
            group: D({}, i, {
              value: pe
            }),
            groupCollapsed: D({}, i, {
              value: Oe
            }),
            groupEnd: D({}, i, {
              value: He
            })
          });
        }
        B < 0 && O("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ke = H.ReactCurrentDispatcher, Xe;
    function Te(i, h, v) {
      {
        if (Xe === void 0)
          try {
            throw Error();
          } catch (j) {
            var w = j.stack.trim().match(/\n( *(at )?)/);
            Xe = w && w[1] || "";
          }
        return `
` + Xe + i;
      }
    }
    var Ue = !1, Me;
    {
      var Ot = typeof WeakMap == "function" ? WeakMap : Map;
      Me = new Ot();
    }
    function st(i, h) {
      if (!i || Ue)
        return "";
      {
        var v = Me.get(i);
        if (v !== void 0)
          return v;
      }
      var w;
      Ue = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = Ke.current, Ke.current = null, Ct();
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
            Reflect.construct(i, [], P);
          } else {
            try {
              P.call();
            } catch (ye) {
              w = ye;
            }
            i.call(P.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ye) {
            w = ye;
          }
          i();
        }
      } catch (ye) {
        if (ye && w && typeof ye.stack == "string") {
          for (var M = ye.stack.split(`
`), se = w.stack.split(`
`), W = M.length - 1, q = se.length - 1; W >= 1 && q >= 0 && M[W] !== se[q]; )
            q--;
          for (; W >= 1 && q >= 0; W--, q--)
            if (M[W] !== se[q]) {
              if (W !== 1 || q !== 1)
                do
                  if (W--, q--, q < 0 || M[W] !== se[q]) {
                    var me = `
` + M[W].replace(" at new ", " at ");
                    return i.displayName && me.includes("<anonymous>") && (me = me.replace("<anonymous>", i.displayName)), typeof i == "function" && Me.set(i, me), me;
                  }
                while (W >= 1 && q >= 0);
              break;
            }
        }
      } finally {
        Ue = !1, Ke.current = L, St(), Error.prepareStackTrace = j;
      }
      var Ve = i ? i.displayName || i.name : "", $t = Ve ? Te(Ve) : "";
      return typeof i == "function" && Me.set(i, $t), $t;
    }
    function ct(i, h, v) {
      return st(i, !1);
    }
    function lt(i) {
      var h = i.prototype;
      return !!(h && h.isReactComponent);
    }
    function Re(i, h, v) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return st(i, lt(i));
      if (typeof i == "string")
        return Te(i);
      switch (i) {
        case p:
          return Te("Suspense");
        case m:
          return Te("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case d:
            return ct(i.render);
          case b:
            return Re(i.type, h, v);
          case x: {
            var w = i, j = w._payload, L = w._init;
            try {
              return Re(L(j), h, v);
            } catch {
            }
          }
        }
      return "";
    }
    var Be = Object.prototype.hasOwnProperty, ut = {}, qe = H.ReactDebugCurrentFrame;
    function we(i) {
      if (i) {
        var h = i._owner, v = Re(i.type, i._source, h ? h.type : null);
        qe.setExtraStackFrame(v);
      } else
        qe.setExtraStackFrame(null);
    }
    function Pe(i, h, v, w, j) {
      {
        var L = Function.call.bind(Be);
        for (var P in i)
          if (L(i, P)) {
            var M = void 0;
            try {
              if (typeof i[P] != "function") {
                var se = Error((w || "React class") + ": " + v + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw se.name = "Invariant Violation", se;
              }
              M = i[P](h, P, w, v, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (W) {
              M = W;
            }
            M && !(M instanceof Error) && (we(j), O("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", v, P, typeof M), we(null)), M instanceof Error && !(M.message in ut) && (ut[M.message] = !0, we(j), O("Failed %s type: %s", v, M.message), we(null));
          }
      }
    }
    var Tt = Array.isArray;
    function Ze(i) {
      return Tt(i);
    }
    function dt(i) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, v = h && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return v;
      }
    }
    function Je(i) {
      try {
        return ft(i), !1;
      } catch {
        return !0;
      }
    }
    function ft(i) {
      return "" + i;
    }
    function ht(i) {
      if (Je(i))
        return O("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", dt(i)), ft(i);
    }
    var Ce = H.ReactCurrentOwner, Mt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pt, Qe, ge;
    ge = {};
    function o(i) {
      if (Be.call(i, "ref")) {
        var h = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function E(i) {
      if (Be.call(i, "key")) {
        var h = Object.getOwnPropertyDescriptor(i, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function _(i, h) {
      if (typeof i.ref == "string" && Ce.current && h && Ce.current.stateNode !== h) {
        var v = U(Ce.current.type);
        ge[v] || (O('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', U(Ce.current.type), i.ref), ge[v] = !0);
      }
    }
    function N(i, h) {
      {
        var v = function() {
          pt || (pt = !0, O("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        v.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: v,
          configurable: !0
        });
      }
    }
    function ne(i, h) {
      {
        var v = function() {
          Qe || (Qe = !0, O("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        v.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: v,
          configurable: !0
        });
      }
    }
    var ve = function(i, h, v, w, j, L, P) {
      var M = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: h,
        ref: v,
        props: P,
        // Record the component responsible for creating this element.
        _owner: L
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
    function le(i, h, v, w, j) {
      {
        var L, P = {}, M = null, se = null;
        v !== void 0 && (ht(v), M = "" + v), E(h) && (ht(h.key), M = "" + h.key), o(h) && (se = h.ref, _(h, j));
        for (L in h)
          Be.call(h, L) && !Mt.hasOwnProperty(L) && (P[L] = h[L]);
        if (i && i.defaultProps) {
          var W = i.defaultProps;
          for (L in W)
            P[L] === void 0 && (P[L] = W[L]);
        }
        if (M || se) {
          var q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          M && N(P, q), se && ne(P, q);
        }
        return ve(i, M, se, j, w, Ce.current, P);
      }
    }
    var mt = H.ReactCurrentOwner, gt = H.ReactDebugCurrentFrame;
    function be(i) {
      if (i) {
        var h = i._owner, v = Re(i.type, i._source, h ? h.type : null);
        gt.setExtraStackFrame(v);
      } else
        gt.setExtraStackFrame(null);
    }
    var fe;
    fe = !1;
    function he(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function $e() {
      {
        if (mt.current) {
          var i = U(mt.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function je(i) {
      {
        if (i !== void 0) {
          var h = i.fileName.replace(/^.*[\\\/]/, ""), v = i.lineNumber;
          return `

Check your code at ` + h + ":" + v + ".";
        }
        return "";
      }
    }
    var Se = {};
    function Ge(i) {
      {
        var h = $e();
        if (!h) {
          var v = typeof i == "string" ? i : i.displayName || i.name;
          v && (h = `

Check the top-level render call using <` + v + ">.");
        }
        return h;
      }
    }
    function Ft(i, h) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var v = Ge(h);
        if (Se[v])
          return;
        Se[v] = !0;
        var w = "";
        i && i._owner && i._owner !== mt.current && (w = " It was passed a child from " + U(i._owner.type) + "."), be(i), O('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', v, w), be(null);
      }
    }
    function Ut(i, h) {
      {
        if (typeof i != "object")
          return;
        if (Ze(i))
          for (var v = 0; v < i.length; v++) {
            var w = i[v];
            he(w) && Ft(w, h);
          }
        else if (he(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var j = Q(i);
          if (typeof j == "function" && j !== i.entries)
            for (var L = j.call(i), P; !(P = L.next()).done; )
              he(P.value) && Ft(P.value, h);
        }
      }
    }
    function bn(i) {
      {
        var h = i.type;
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
          Pe(v, i.props, "prop", w, i);
        } else if (h.PropTypes !== void 0 && !fe) {
          fe = !0;
          var j = U(h);
          O("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && O("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function yn(i) {
      {
        for (var h = Object.keys(i.props), v = 0; v < h.length; v++) {
          var w = h[v];
          if (w !== "children" && w !== "key") {
            be(i), O("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), be(null);
            break;
          }
        }
        i.ref !== null && (be(i), O("Invalid attribute `ref` supplied to `React.Fragment`."), be(null));
      }
    }
    function Bt(i, h, v, w, j, L) {
      {
        var P = T(i);
        if (!P) {
          var M = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (M += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var se = je(j);
          se ? M += se : M += $e();
          var W;
          i === null ? W = "null" : Ze(i) ? W = "array" : i !== void 0 && i.$$typeof === n ? (W = "<" + (U(i.type) || "Unknown") + " />", M = " Did you accidentally export a JSX literal instead of a component?") : W = typeof i, O("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", W, M);
        }
        var q = le(i, h, v, j, L);
        if (q == null)
          return q;
        if (P) {
          var me = h.children;
          if (me !== void 0)
            if (w)
              if (Ze(me)) {
                for (var Ve = 0; Ve < me.length; Ve++)
                  Ut(me[Ve], i);
                Object.freeze && Object.freeze(me);
              } else
                O("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ut(me, i);
        }
        return i === e ? yn(q) : bn(q), q;
      }
    }
    function En(i, h, v) {
      return Bt(i, h, v, !0);
    }
    function xn(i, h, v) {
      return Bt(i, h, v, !1);
    }
    var wn = xn, Cn = En;
    nt.Fragment = e, nt.jsx = wn, nt.jsxs = Cn;
  }()), nt;
}
process.env.NODE_ENV === "production" ? It.exports = ia() : It.exports = ra();
var u = It.exports;
function mn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ u.jsx("button", { children: t.title });
}
const oa = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), sa = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function ca(t) {
  return /* @__PURE__ */ u.jsx(un.Item, { value: t.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    sa,
    /* @__PURE__ */ u.jsx("span", { children: t.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: oa })
  ] }) }, t.title);
}
function la(t) {
  const [n, a] = ie(!1), [e, r] = ie(t.options), s = (p) => {
    t.onDragComplete(p), r(p);
  }, c = (p) => {
    const m = [...e];
    m.splice(p, 1), s(m);
  }, l = [];
  e.forEach((p, m) => {
    l.push(/* @__PURE__ */ u.jsx(ca, { index: m, title: p, onDelete: c }, p));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ u.jsx(mn, { title: t.title }),
    /* @__PURE__ */ u.jsx(un.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: l })
  ] });
}
function ua(t) {
  const [n, a] = ie(!1), e = [];
  t.options.map((s, c) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ u.jsx(da, { option: s }, c));
  });
  let r = "dropdown";
  return t.subdropdown && (r += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ u.jsx(mn, { title: t.title }),
        /* @__PURE__ */ u.jsx(
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
function da(t) {
  const { option: n } = t, [a, e] = ie("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ u.jsx(
        la,
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
      r = /* @__PURE__ */ u.jsx(
        ua,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      r = /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("li", { className: a === n.title ? "selected" : "", children: r }, qn());
}
function ni(t) {
  let n;
  function a(c) {
    var d, p, m, b, x, C, S, F, Q;
    let l;
    switch (c.event) {
      case "custom":
        k.dispatchEvent({ type: A.CUSTOM, value: c.data });
        break;
      case "selectComponent":
        k.dispatchEvent({ type: A.SELECT_DROPDOWN, value: c.data });
        break;
      case "draggableListUpdate":
        k.dispatchEvent({ type: A.DRAG_UPDATE, value: c.data });
        break;
      case "addFolder":
        (d = t.components.get("debug")) == null || d.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (p = t.components.get("debug")) == null || p.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (m = t.components.get("debug")) == null || m.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (b = t.components.get("debug")) == null || b.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (x = t.components.get("debug")) == null || x.triggerButton(c.data.id);
        break;
      case "setSheet":
        l = (C = t.components.get("theatre")) == null ? void 0 : C.sheets.get(c.data.sheet), l !== void 0 && (n = l, et.setSelection([l]));
        break;
      case "setSheetObject":
        l = (S = t.components.get("theatre")) == null ? void 0 : S.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), l !== void 0 && et.setSelection([l]);
        break;
      case "updateSheetObject":
        l = (F = t.components.get("theatre")) == null ? void 0 : F.sheetObjectCBs.get(c.data.sheetObject), l !== void 0 && l(c.data.values);
        break;
      case "updateTimeline":
        n = (Q = t.components.get("theatre")) == null ? void 0 : Q.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
        break;
      case "getObject":
        k.dispatchEvent({ type: A.GET_OBJECT, value: c.data });
        break;
      case "updateObject":
        k.dispatchEvent({ type: A.UPDATE_OBJECT, value: c.data });
        break;
      case "createTexture":
        k.dispatchEvent({ type: A.CREATE_TEXTURE, value: c.data });
        break;
      case "requestMethod":
        k.dispatchEvent({ type: A.REQUEST_METHOD, value: c.data });
        break;
    }
  }
  function e(c) {
    switch (c.event) {
      case "custom":
        k.dispatchEvent({ type: A.CUSTOM, value: c.data });
        break;
      case "setObject":
        k.dispatchEvent({ type: A.SET_OBJECT, value: c.data });
        break;
      case "setScene":
        k.dispatchEvent({ type: A.SET_SCENE, value: c.data });
        break;
      case "addCamera":
        k.dispatchEvent({ type: A.ADD_CAMERA, value: c.data });
        break;
      case "removeCamera":
        k.dispatchEvent({ type: A.REMOVE_CAMERA, value: c.data });
        break;
    }
  }
  function r() {
    et.ui.hide();
  }
  function s() {
    et.ui.restore(), et.onSelectionChange((p) => {
      p.length < 1 || p.forEach((m) => {
        var S;
        let b = m.address.sheetId, x = "setSheet", C = {};
        switch (m.type) {
          case "Theatre_Sheet_PublicAPI":
            x = "setSheet", C = {
              sheet: m.address.sheetId
            }, n = (S = t.components.get("theatre")) == null ? void 0 : S.sheets.get(m.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            x = "setSheetObject", b += `_${m.address.objectKey}`, C = {
              id: b,
              sheet: m.address.sheetId,
              key: m.address.objectKey
            };
            break;
        }
        t.send({ event: x, target: "app", data: C });
      });
    });
    let c = 0;
    const l = () => {
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
      l(), requestAnimationFrame(d);
    };
    l(), d();
  }
  t.listen((c) => {
    t.editor ? e(c) : a(c);
  }), t.editor ? s() : r();
}
const fa = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, ha = `out vec4 fragColor;
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
class pa extends rn {
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
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Nt(16777215)
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
      vertexShader: fa,
      fragmentShader: ha,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ma extends jn {
  constructor() {
    const a = new pa();
    super(new _n(2, 2), a);
    Z(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ga = `#include <common>
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
}`, va = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ba extends rn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ga,
      fragmentShader: va
    });
  }
}
function Lt(t) {
  const [n, a] = ie(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          t.onToggle !== void 0 && t.onToggle(r), a(r);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: t.label })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: t.children }) })
  ] });
}
function gn(t) {
  const [n, a] = ie(!1), e = t.child.children.length > 0, r = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    r.push(/* @__PURE__ */ u.jsx(gn, { child: s, three: t.three }, Math.random()));
  }), /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx("div", { className: `icon ${ta(t.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: r }) })
  ] }, Math.random());
}
function ya(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ u.jsx(gn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Ea = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function xa(t) {
  return "items" in t;
}
function Le(t) {
  function n(e, r) {
    console.log("onChange:", e, r);
  }
  const a = [];
  return t.items.forEach((e) => {
    xa(e) ? a.push(
      /* @__PURE__ */ u.jsx(Le, { title: e.title, items: e.items }, Math.random())
    ) : a.push(
      /* @__PURE__ */ u.jsx(
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
          onChange: (r, s) => {
            e.onChange !== void 0 ? e.onChange(r, s) : n(r, s);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ u.jsx(Lt, { label: t.title, open: !1, children: a });
}
function wa(t) {
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
function Ca(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Sa() {
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
function Kt(t, n, a) {
  const e = [];
  for (const r in t) {
    if (!wa(r))
      continue;
    const s = typeof t[r], c = t[r];
    if (s === "boolean" || s === "number" || s === "string") {
      const l = {
        title: _e(r),
        prop: r,
        type: s,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (d, p) => {
          var b;
          a.updateObject(n.uuid, `material.${d}`, p), s === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const m = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
          m !== void 0 && ee(m, `material.${d}`, p);
        }
      };
      Ca(r) && (l.value = Number(c), l.type = "range", l.min = 0, l.max = 1, l.step = 0.01), e.push(l);
    } else if (s === "object")
      if (c.isColor)
        e.push({
          title: _e(r),
          prop: r,
          type: "color",
          value: c,
          onChange: (l, d) => {
            var b;
            const p = new Nt(d);
            a.updateObject(n.uuid, `material.${l}`, p);
            const m = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
            m !== void 0 && ee(m, `material.${l}`, p);
          }
        });
      else if (Array.isArray(c)) {
        const l = [];
        for (const d in c)
          l.push({
            title: `${d}`,
            type: `${typeof c[d]}`,
            value: c[d],
            onChange: (p, m) => {
              var x;
              a.updateObject(n.uuid, `material.${r}`, m);
              const b = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${r}`, m);
            }
          });
        e.push({
          title: _e(r),
          items: l
        });
      } else {
        const l = [];
        for (const d in c) {
          const p = c[d];
          switch (typeof p) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: _e(r),
                type: "image",
                value: p,
                onChange: (b, x) => {
                  var S;
                  a.createTexture(n.uuid, `material.${r}`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Dt(x).then((F) => {
                    ee(C, `material.${r}`, F), ee(C, "material.needsUpdate", !0);
                  });
                }
              }) : l.push({
                title: `${_e(d)}`,
                prop: `material.${r}.${d}`,
                type: `${typeof t[r][d]}`,
                value: c[d],
                onChange: (b, x) => {
                  var S;
                  a.updateObject(n.uuid, `material.${r}.${d}`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && ee(C, `material.${r}.${d}`, x);
                }
              });
              break;
            case "object":
              p.value !== void 0 && p.value.src !== void 0 ? l.push({
                title: _e(d),
                type: "image",
                value: p.value.src,
                onChange: (b, x) => {
                  var S;
                  a.createTexture(n.uuid, `material.${r}.${d}.value`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Dt(x).then((F) => {
                    ee(C, `material.${r}.${d}.value`, F);
                  });
                }
              }) : l.push({
                title: d,
                type: `${typeof p.value}`,
                value: p.value,
                onChange: (b, x) => {
                  var S;
                  a.updateObject(n.uuid, `material.${r}.${d}.value`, x);
                  const C = (S = a.scene) == null ? void 0 : S.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && ee(C, `material.${r}.${d}.value`, x);
                }
              });
              break;
          }
        }
        l.length > 0 && e.push({
          title: _e(r),
          items: l
        });
      }
    else
      c !== void 0 && console.log("other:", r, s, c);
  }
  return e.sort((r, s) => r.title < s.title ? -1 : r.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Oa(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], r = a.length;
    for (let s = 0; s < r; s++)
      e.push(
        /* @__PURE__ */ u.jsx(
          Le,
          {
            title: `Material ${s}`,
            items: Kt(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: e });
  } else
    return /* @__PURE__ */ u.jsx(
      Le,
      {
        title: "Material",
        items: Kt(a, t, n)
      }
    );
}
function at(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Jn(t.value));
  const [a, e] = ie(n), r = xe(null), s = xe(null), c = xe(null);
  Ne(() => {
    var K;
    let m = !1, b = -1, x = 0, C = Number(a);
    const S = (de) => {
      m = !0, x = C, b = de.clientX;
    }, F = (de) => {
      if (!m)
        return;
      const ce = t.step !== void 0 ? t.step : 1, te = (de.clientX - b) * ce;
      C = Number((x + te).toFixed(4)), s.current !== null && (s.current.value = C.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, C);
    }, Q = () => {
      m = !1;
    }, H = () => {
      m = !1;
    }, O = t.type === "number";
    return O && ((K = r.current) == null || K.addEventListener("mousedown", S, !1), document.addEventListener("mouseup", Q, !1), document.addEventListener("mousemove", F, !1), document.addEventListener("contextmenu", H, !1)), () => {
      var de;
      O && ((de = r.current) == null || de.removeEventListener("mousedown", S), document.removeEventListener("mouseup", Q), document.removeEventListener("mousemove", F), document.removeEventListener("contextmenu", H));
    };
  }, [a]);
  const l = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = l || t.type === "image", p = (m) => {
    let b = m.target.value;
    t.type === "boolean" && (b = m.target.checked), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: r, children: t.title }, "fieldLabel"),
    t.type === "string" && !l && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: p,
        value: a
      }
    ),
    t.type === "string" && l && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: p,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: p,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ u.jsx(
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
    t.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: a.toString(), onChange: p, className: "min" }),
      /* @__PURE__ */ u.jsx(
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
    t.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: a.toString(), onChange: p, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: a, onChange: p })
    ] }),
    t.type === "button" && /* @__PURE__ */ u.jsx(
      "button",
      {
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ u.jsx("img", { ref: c, onClick: () => {
      Sa().then((m) => {
        c.current.src = m, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, m);
      });
    }, src: a.length > 0 ? a : Ea })
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
function Ta(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Xt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var l;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (ee(c, r, s), c.updateProjectionMatrix());
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
        onChange: (r, s) => {
          var l;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (ee(c, r, s), c.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ u.jsx(
    Le,
    {
      title: "Camera",
      items: a
    }
  );
}
const Ma = Math.PI / 180, Ra = 180 / Math.PI;
function We(t, n, a, e, r) {
  return e + (t - n) * (r - e) / (a - n);
}
function Pa(t) {
  return t * Ma;
}
function jt(t) {
  return t * Ra;
}
function ja(t, n) {
  const a = new kn();
  a.elements = t.matrix;
  const e = new Y(), r = new An(), s = new Y();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), r.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const c = (d, p) => {
    var b;
    n.updateObject(t.uuid, d, p);
    const m = (b = n.scene) == null ? void 0 : b.getObjectByProperty("uuid", t.uuid);
    m !== void 0 && ee(m, d, p);
  }, l = (d, p) => {
    c(d, Pa(p));
  };
  return /* @__PURE__ */ u.jsx(
    Le,
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
          value: Rt(jt(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Rt(jt(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Rt(jt(r.z)),
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
function _a(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const r = t.lightInfo[e];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: qt(e),
        prop: e,
        type: "color",
        value: r,
        onChange: (s, c) => {
          var p;
          const l = new Nt(c);
          n.updateObject(t.uuid, s, l);
          const d = (p = n.scene) == null ? void 0 : p.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && ee(d, s, l);
        }
      }) : a.push({
        title: qt(e),
        prop: e,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (s, c) => {
          var d;
          n.updateObject(t.uuid, s, c);
          const l = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && ee(l, s, c);
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Le,
    {
      title: "Light",
      items: a
    }
  );
}
function ka(t, n) {
  const a = [];
  return t.animations.forEach((e) => {
    a.push({
      title: "Name",
      type: "string",
      prop: "name",
      value: e.name,
      disabled: !0,
      onChange: (r, s) => {
        var l;
        n.updateObject(t.uuid, r, s);
        const c = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        c !== void 0 && ee(c, r, s);
      }
    }), a.push({
      title: "Duration",
      type: "number",
      prop: "duration",
      value: e.duration,
      disabled: !0,
      onChange: (r, s) => {
        var l;
        n.updateObject(t.uuid, r, s);
        const c = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        c !== void 0 && ee(c, r, s);
      }
    }), a.push({
      title: "Blend Mode",
      type: "number",
      prop: "blendMode",
      value: e.blendMode,
      disabled: !0,
      onChange: (r, s) => {
        var l;
        n.updateObject(t.uuid, r, s);
        const c = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        c !== void 0 && ee(c, r, s);
      }
    });
  }), /* @__PURE__ */ u.jsx(Le, { title: "Animations", items: a });
}
function Aa(t) {
  const [n, a] = ie(-1), [e, r] = ie({
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
  });
  Ne(() => {
    function c(l) {
      const d = l.value;
      if (r(d), a(Date.now()), t.three.scene !== void 0) {
        const p = t.three.scene.getObjectByProperty("uuid", d.uuid);
        if (p !== void 0 && p.animations.length > 0) {
          const m = new Dn(p);
          console.log(m), console.log(p.animations);
        }
      }
    }
    return k.addEventListener(A.SET_OBJECT, c), () => {
      k.removeEventListener(A.SET_OBJECT, c);
    };
  }, []);
  const s = e.type.toLowerCase();
  return /* @__PURE__ */ u.jsx(Lt, { label: "Inspector", children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: t.class, children: e.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        at,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: e.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        at,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: e.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        at,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: e.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        at,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: e.visible,
          onChange: (c, l) => {
            var p;
            t.three.updateObject(e.uuid, c, l);
            const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", e.uuid);
            d !== void 0 && ee(d, c, l);
          }
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      ja(e, t.three),
      e.animations.length > 0 ? ka(e, t.three) : null,
      s.search("camera") > -1 ? Ta(e, t.three) : null,
      s.search("light") > -1 ? _a(e, t.three) : null,
      s.search("mesh") > -1 ? Oa(e, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class ai extends Kn {
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
    }, this.three = a.three, k.addEventListener(A.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    k.removeEventListener(A.SET_SCENE, this.setScene);
  }
  render() {
    var r;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(r = this.componentState.scene) == null ? void 0 : r.name}` : "No Scene");
    return /* @__PURE__ */ u.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(Lt, { label: e, open: !0, children: /* @__PURE__ */ u.jsx(u.Fragment, { children: a && /* @__PURE__ */ u.jsx(ya, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ u.jsx(Aa, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function ii(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (l) => {
    var p;
    if (!n())
      return;
    const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", l.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (l, d, p) => {
    var b;
    if (!n())
      return;
    const m = (b = t.three.scene) == null ? void 0 : b.getObjectByProperty("uuid", l);
    m !== void 0 && ee(m, d, p);
  }, r = (l) => {
    if (!n())
      return;
    const d = l.value, { key: p, value: m, uuid: b } = d;
    e(b, p, m);
  }, s = (l) => {
    if (!n())
      return;
    const d = l.value;
    Dt(d.value).then((p) => {
      e(d.uuid, d.key, p), e(d.uuid, "material.needsUpdate", !0);
    });
  }, c = (l) => {
    var x;
    if (!n())
      return;
    const { key: d, uuid: p, value: m } = l.value, b = (x = t.three.scene) == null ? void 0 : x.getObjectByProperty("uuid", p);
    if (b !== void 0)
      try {
        b[d](m);
      } catch (C) {
        console.log("Error requesting method:"), console.log(C), console.log(d), console.log(m);
      }
  };
  return Ne(() => (k.addEventListener(A.GET_OBJECT, a), k.addEventListener(A.UPDATE_OBJECT, r), k.addEventListener(A.CREATE_TEXTURE, s), k.addEventListener(A.REQUEST_METHOD, c), () => {
    k.removeEventListener(A.GET_OBJECT, a), k.removeEventListener(A.UPDATE_OBJECT, r), k.removeEventListener(A.CREATE_TEXTURE, s), k.removeEventListener(A.REQUEST_METHOD, c);
  }), []), null;
}
const Zt = { type: "change" }, _t = { type: "start" }, Jt = { type: "end" }, vt = new In(), Qt = new Nn(), Da = Math.cos(70 * Ln.DEG2RAD);
class Ia extends nn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Y(), this.cursor = new Y(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ze.ROTATE, MIDDLE: ze.DOLLY, RIGHT: ze.PAN }, this.touches = { ONE: Ye.ROTATE, TWO: Ye.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", Je), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Je), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Zt), e.update(), s = r.NONE;
    }, this.update = function() {
      const o = new Y(), E = new Vt().setFromUnitVectors(n.up, new Y(0, 1, 0)), _ = E.clone().invert(), N = new Y(), ne = new Vt(), ve = new Y(), le = 2 * Math.PI;
      return function(gt = null) {
        const be = e.object.position;
        o.copy(be).sub(e.target), o.applyQuaternion(E), l.setFromVector3(o), e.autoRotate && s === r.NONE && V(y(gt)), e.enableDamping ? (l.theta += d.theta * e.dampingFactor, l.phi += d.phi * e.dampingFactor) : (l.theta += d.theta, l.phi += d.phi);
        let fe = e.minAzimuthAngle, he = e.maxAzimuthAngle;
        isFinite(fe) && isFinite(he) && (fe < -Math.PI ? fe += le : fe > Math.PI && (fe -= le), he < -Math.PI ? he += le : he > Math.PI && (he -= le), fe <= he ? l.theta = Math.max(fe, Math.min(he, l.theta)) : l.theta = l.theta > (fe + he) / 2 ? Math.max(fe, l.theta) : Math.min(he, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(m, e.dampingFactor) : e.target.add(m), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && te || e.object.isOrthographicCamera ? l.radius = X(l.radius) : l.radius = X(l.radius * p), o.setFromSpherical(l), o.applyQuaternion(_), be.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, m.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), m.set(0, 0, 0));
        let $e = !1;
        if (e.zoomToCursor && te) {
          let je = null;
          if (e.object.isPerspectiveCamera) {
            const Se = o.length();
            je = X(Se * p);
            const Ge = Se - je;
            e.object.position.addScaledVector(de, Ge), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Se = new Y(ce.x, ce.y, 0);
            Se.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), $e = !0;
            const Ge = new Y(ce.x, ce.y, 0);
            Ge.unproject(e.object), e.object.position.sub(Ge).add(Se), e.object.updateMatrixWorld(), je = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          je !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(je).add(e.object.position) : (vt.origin.copy(e.object.position), vt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(vt.direction)) < Da ? n.lookAt(e.target) : (Qt.setFromNormalAndCoplanarPoint(e.object.up, e.target), vt.intersectPlane(Qt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), $e = !0);
        return p = 1, te = !1, $e || N.distanceToSquared(e.object.position) > c || 8 * (1 - ne.dot(e.object.quaternion)) > c || ve.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Zt), N.copy(e.object.position), ne.copy(e.object.quaternion), ve.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ce), e.domElement.removeEventListener("pointerdown", qe), e.domElement.removeEventListener("pointercancel", Pe), e.domElement.removeEventListener("wheel", dt), e.domElement.removeEventListener("pointermove", we), e.domElement.removeEventListener("pointerup", Pe), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Je), e._domElementKeyEvents = null);
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
    const c = 1e-6, l = new zt(), d = new zt();
    let p = 1;
    const m = new Y(), b = new ue(), x = new ue(), C = new ue(), S = new ue(), F = new ue(), Q = new ue(), H = new ue(), O = new ue(), K = new ue(), de = new Y(), ce = new ue();
    let te = !1;
    const f = [], g = {};
    function y(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function T(o) {
      const E = Math.abs(o) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * E);
    }
    function V(o) {
      d.theta -= o;
    }
    function z(o) {
      d.phi -= o;
    }
    const U = function() {
      const o = new Y();
      return function(_, N) {
        o.setFromMatrixColumn(N, 0), o.multiplyScalar(-_), m.add(o);
      };
    }(), D = function() {
      const o = new Y();
      return function(_, N) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(N, 1) : (o.setFromMatrixColumn(N, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(_), m.add(o);
      };
    }(), B = function() {
      const o = new Y();
      return function(_, N) {
        const ne = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const ve = e.object.position;
          o.copy(ve).sub(e.target);
          let le = o.length();
          le *= Math.tan(e.object.fov / 2 * Math.PI / 180), U(2 * _ * le / ne.clientHeight, e.object.matrix), D(2 * N * le / ne.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (U(_ * (e.object.right - e.object.left) / e.object.zoom / ne.clientWidth, e.object.matrix), D(N * (e.object.top - e.object.bottom) / e.object.zoom / ne.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function J(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function R(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function I(o, E) {
      if (!e.zoomToCursor)
        return;
      te = !0;
      const _ = e.domElement.getBoundingClientRect(), N = o - _.left, ne = E - _.top, ve = _.width, le = _.height;
      ce.x = N / ve * 2 - 1, ce.y = -(ne / le) * 2 + 1, de.set(ce.x, ce.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function X(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function pe(o) {
      b.set(o.clientX, o.clientY);
    }
    function Oe(o) {
      I(o.clientX, o.clientX), H.set(o.clientX, o.clientY);
    }
    function He(o) {
      S.set(o.clientX, o.clientY);
    }
    function ot(o) {
      x.set(o.clientX, o.clientY), C.subVectors(x, b).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      V(2 * Math.PI * C.x / E.clientHeight), z(2 * Math.PI * C.y / E.clientHeight), b.copy(x), e.update();
    }
    function Ct(o) {
      O.set(o.clientX, o.clientY), K.subVectors(O, H), K.y > 0 ? J(T(K.y)) : K.y < 0 && R(T(K.y)), H.copy(O), e.update();
    }
    function St(o) {
      F.set(o.clientX, o.clientY), Q.subVectors(F, S).multiplyScalar(e.panSpeed), B(Q.x, Q.y), S.copy(F), e.update();
    }
    function Ke(o) {
      I(o.clientX, o.clientY), o.deltaY < 0 ? R(T(o.deltaY)) : o.deltaY > 0 && J(T(o.deltaY)), e.update();
    }
    function Xe(o) {
      let E = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? z(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(0, e.keyPanSpeed), E = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? z(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(0, -e.keyPanSpeed), E = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? V(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(e.keyPanSpeed, 0), E = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? V(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(-e.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (o.preventDefault(), e.update());
    }
    function Te(o) {
      if (f.length === 1)
        b.set(o.pageX, o.pageY);
      else {
        const E = ge(o), _ = 0.5 * (o.pageX + E.x), N = 0.5 * (o.pageY + E.y);
        b.set(_, N);
      }
    }
    function Ue(o) {
      if (f.length === 1)
        S.set(o.pageX, o.pageY);
      else {
        const E = ge(o), _ = 0.5 * (o.pageX + E.x), N = 0.5 * (o.pageY + E.y);
        S.set(_, N);
      }
    }
    function Me(o) {
      const E = ge(o), _ = o.pageX - E.x, N = o.pageY - E.y, ne = Math.sqrt(_ * _ + N * N);
      H.set(0, ne);
    }
    function Ot(o) {
      e.enableZoom && Me(o), e.enablePan && Ue(o);
    }
    function st(o) {
      e.enableZoom && Me(o), e.enableRotate && Te(o);
    }
    function ct(o) {
      if (f.length == 1)
        x.set(o.pageX, o.pageY);
      else {
        const _ = ge(o), N = 0.5 * (o.pageX + _.x), ne = 0.5 * (o.pageY + _.y);
        x.set(N, ne);
      }
      C.subVectors(x, b).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      V(2 * Math.PI * C.x / E.clientHeight), z(2 * Math.PI * C.y / E.clientHeight), b.copy(x);
    }
    function lt(o) {
      if (f.length === 1)
        F.set(o.pageX, o.pageY);
      else {
        const E = ge(o), _ = 0.5 * (o.pageX + E.x), N = 0.5 * (o.pageY + E.y);
        F.set(_, N);
      }
      Q.subVectors(F, S).multiplyScalar(e.panSpeed), B(Q.x, Q.y), S.copy(F);
    }
    function Re(o) {
      const E = ge(o), _ = o.pageX - E.x, N = o.pageY - E.y, ne = Math.sqrt(_ * _ + N * N);
      O.set(0, ne), K.set(0, Math.pow(O.y / H.y, e.zoomSpeed)), J(K.y), H.copy(O);
      const ve = (o.pageX + E.x) * 0.5, le = (o.pageY + E.y) * 0.5;
      I(ve, le);
    }
    function Be(o) {
      e.enableZoom && Re(o), e.enablePan && lt(o);
    }
    function ut(o) {
      e.enableZoom && Re(o), e.enableRotate && ct(o);
    }
    function qe(o) {
      e.enabled !== !1 && (f.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", we), e.domElement.addEventListener("pointerup", Pe)), Mt(o), o.pointerType === "touch" ? ft(o) : Tt(o));
    }
    function we(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? ht(o) : Ze(o));
    }
    function Pe(o) {
      pt(o), f.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", we), e.domElement.removeEventListener("pointerup", Pe)), e.dispatchEvent(Jt), s = r.NONE;
    }
    function Tt(o) {
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
        case ze.DOLLY:
          if (e.enableZoom === !1)
            return;
          Oe(o), s = r.DOLLY;
          break;
        case ze.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            He(o), s = r.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            pe(o), s = r.ROTATE;
          }
          break;
        case ze.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            pe(o), s = r.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            He(o), s = r.PAN;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(_t);
    }
    function Ze(o) {
      switch (s) {
        case r.ROTATE:
          if (e.enableRotate === !1)
            return;
          ot(o);
          break;
        case r.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ct(o);
          break;
        case r.PAN:
          if (e.enablePan === !1)
            return;
          St(o);
          break;
      }
    }
    function dt(o) {
      e.enabled === !1 || e.enableZoom === !1 || s !== r.NONE || (o.preventDefault(), e.dispatchEvent(_t), Ke(o), e.dispatchEvent(Jt));
    }
    function Je(o) {
      e.enabled === !1 || e.enablePan === !1 || Xe(o);
    }
    function ft(o) {
      switch (Qe(o), f.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ye.ROTATE:
              if (e.enableRotate === !1)
                return;
              Te(o), s = r.TOUCH_ROTATE;
              break;
            case Ye.PAN:
              if (e.enablePan === !1)
                return;
              Ue(o), s = r.TOUCH_PAN;
              break;
            default:
              s = r.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ye.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              Ot(o), s = r.TOUCH_DOLLY_PAN;
              break;
            case Ye.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              st(o), s = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = r.NONE;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(_t);
    }
    function ht(o) {
      switch (Qe(o), s) {
        case r.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ct(o), e.update();
          break;
        case r.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          lt(o), e.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Be(o), e.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          ut(o), e.update();
          break;
        default:
          s = r.NONE;
      }
    }
    function Ce(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function Mt(o) {
      f.push(o.pointerId);
    }
    function pt(o) {
      delete g[o.pointerId];
      for (let E = 0; E < f.length; E++)
        if (f[E] == o.pointerId) {
          f.splice(E, 1);
          return;
        }
    }
    function Qe(o) {
      let E = g[o.pointerId];
      E === void 0 && (E = new ue(), g[o.pointerId] = E), E.set(o.pageX, o.pageY);
    }
    function ge(o) {
      const E = o.pointerId === f[0] ? f[1] : f[0];
      return g[E];
    }
    e.domElement.addEventListener("contextmenu", Ce), e.domElement.addEventListener("pointerdown", qe), e.domElement.addEventListener("pointercancel", Pe), e.domElement.addEventListener("wheel", dt, { passive: !1 }), this.update();
  }
}
const Et = (t) => {
  const [n, a] = ie(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, r = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ u.jsx("li", { onClick: () => r(s), children: s }, s)) })
  ] });
}, ke = Xn(function(n, a) {
  const [e, r] = ie(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && r(!1);
    } }),
    /* @__PURE__ */ u.jsx(
      Et,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (c) => {
          r(c);
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
], ae = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map();
function Fe(t, n) {
  const a = new on(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ae.set(t, a), a;
}
Fe("Top", new Y(0, 1e3, 0));
Fe("Bottom", new Y(0, -1e3, 0));
Fe("Left", new Y(-1e3, 0, 0));
Fe("Right", new Y(1e3, 0, 0));
Fe("Front", new Y(0, 0, 1e3));
Fe("Back", new Y(0, 0, -1e3));
Fe("Orthographic", new Y(1e3, 1e3, 1e3));
const wt = new kt(60, 1, 50, 3e3);
wt.name = "Debug";
wt.position.set(500, 500, 500);
wt.lookAt(0, 0, 0);
ae.set("Debug", wt);
const tn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Na = new Fn(), La = new Un(), Fa = new ba(), Ua = new Bn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let bt = "Renderer";
const G = new sn();
G.name = "Debug Scene";
let Ie = new sn();
G.add(Ie);
const rt = new $n();
rt.name = "helpers";
G.add(rt);
const Ba = new ma();
rt.add(Ba);
const vn = new cn(500);
vn.name = "axisHelper";
rt.add(vn);
const it = new cn(100);
it.name = "interactionHelper";
rt.add(it);
it.visible = !1;
let yt = !1, $ = ae.get("Debug"), oe = ae.get("Orthographic"), Ae = ae.get("Front"), De = ae.get("Top");
function ri(t) {
  const [n, a] = ie(t.mode !== void 0 ? t.mode : "Quad"), [e, r] = ie(null), [s, c] = ie(!1), [l, d] = ie(!1), [p, m] = ie(!1), [, b] = ie(Date.now()), x = xe(null), C = xe(null), S = xe(null), F = xe(null), Q = xe(null), H = xe(null), O = (f, g) => {
    const y = re.get(f.name);
    y !== void 0 && y.dispose(), re.delete(f.name);
    const T = Ee.get(f.name);
    T !== void 0 && (G.remove(T), T.dispose()), Ee.delete(f.name);
    const V = new Ia(f, g);
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
      const z = new zn(f);
      Ee.set(f.name, z), G.add(z);
    }
  }, K = (f) => {
    const g = Ee.get(f.name);
    g !== void 0 && (G.remove(g), g.dispose(), Ee.delete(f.name));
    const y = re.get(f.name);
    y !== void 0 && (y.dispose(), re.delete(f.name));
  }, de = () => {
    re.forEach((f, g) => {
      f.dispose();
      const y = Ee.get(g);
      y !== void 0 && (G.remove(y), y.dispose()), Ee.delete(g), re.delete(g);
    }), re.clear(), Ee.clear();
  }, ce = () => {
    switch (n) {
      case "Single":
        O($, S.current);
        break;
      case "Side by Side":
      case "Stacked":
        O($, S.current), O(oe, F.current);
        break;
      case "Quad":
        O($, S.current), O(oe, F.current), O(Ae, Q.current), O(De, H.current);
        break;
    }
  };
  Ne(() => {
    const f = new Gn({
      canvas: x.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), r(f);
  }, []), Ne(() => {
    const f = () => {
      fn(Ie), G.remove(Ie), t.three.scene !== void 0 && (Ie = t.three.scene, G.add(Ie));
    }, g = (T) => {
      var U;
      const V = T.value, z = (U = t.three.scene) == null ? void 0 : U.getObjectByProperty("uuid", V.uuid);
      z !== void 0 && ae.set(V.name, z), b(Date.now());
    }, y = (T) => {
      ae.delete(T.value.name), b(Date.now());
    };
    return k.addEventListener(A.SET_SCENE, f), k.addEventListener(A.ADD_CAMERA, g), k.addEventListener(A.REMOVE_CAMERA, y), () => {
      k.removeEventListener(A.SET_SCENE, f), k.removeEventListener(A.ADD_CAMERA, g), k.removeEventListener(A.REMOVE_CAMERA, y);
    };
  }, []), Ne(() => {
    if (e === null)
      return;
    let f = window.innerWidth, g = window.innerHeight, y = Math.floor(f / 2), T = Math.floor(g / 2), V = -1;
    const z = () => {
      f = window.innerWidth - 300, g = window.innerHeight, y = Math.floor(f / 2), T = Math.floor(g / 2), e.setSize(f, g);
      let R = f, I = g;
      switch (n) {
        case "Side by Side":
          R = y, I = g;
          break;
        case "Stacked":
          R = f, I = T;
          break;
        case "Quad":
          R = y, I = T;
          break;
      }
      ae.forEach((X) => {
        var pe;
        X instanceof on ? (X.left = R / -2, X.right = R / 2, X.top = I / 2, X.bottom = I / -2, X.updateProjectionMatrix()) : X instanceof kt && (X.aspect = R / I, X.updateProjectionMatrix(), (pe = Ee.get(X.name)) == null || pe.update());
      });
    }, U = () => {
      e.setViewport(0, 0, f, g), e.setScissor(0, 0, f, g), e.render(G, $);
    }, D = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, y, g), e.setScissor(0, 0, y, g), e.render(G, $), e.setViewport(y, 0, y, g), e.setScissor(y, 0, y, g), e.render(G, oe);
      else {
        const R = g - T;
        e.setViewport(0, R, f, T), e.setScissor(0, R, f, T), e.render(G, $), e.setViewport(0, 0, f, T), e.setScissor(0, 0, f, T), e.render(G, oe);
      }
    }, B = () => {
      let R = 0, I = 0;
      I = g - T, R = 0, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, $), R = y, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, oe), I = 0, R = 0, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, Ae), R = y, e.setViewport(R, I, y, T), e.setScissor(R, I, y, T), e.render(G, De);
    }, J = () => {
      switch (re.forEach((R) => {
        R.update();
      }), e.clear(), n) {
        case "Single":
          U();
          break;
        case "Side by Side":
        case "Stacked":
          D();
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
  }, [n, e]), Ne(() => {
    if (e !== null) {
      const f = new Vn(), g = new ue(), y = (U, D, B, J) => {
        switch (n) {
          case "Quad":
            U < B ? D < J ? f.setFromCamera(g, $) : f.setFromCamera(g, Ae) : D < J ? f.setFromCamera(g, oe) : f.setFromCamera(g, De);
            break;
          case "Side by Side":
            U < B ? f.setFromCamera(g, $) : f.setFromCamera(g, oe);
            break;
          case "Single":
            f.setFromCamera(g, $);
            break;
          case "Stacked":
            D < J ? f.setFromCamera(g, $) : f.setFromCamera(g, oe);
            break;
        }
      }, T = (U) => {
        if (!yt)
          return;
        const D = new ue();
        e.getSize(D);
        const B = Math.min(U.clientX, D.x), J = Math.min(U.clientY, D.y);
        g.x = We(B, 0, D.x, -1, 1), g.y = We(J, 0, D.y, 1, -1);
        const R = D.x / 2, I = D.y / 2, X = () => {
          B < R ? g.x = We(B, 0, R, -1, 1) : g.x = We(B, R, D.x, -1, 1);
        }, pe = () => {
          J < I ? g.y = We(J, 0, I, 1, -1) : g.y = We(J, I, D.y, 1, -1);
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
        Oe.length > 0 && it.position.copy(Oe[0].point);
      }, V = (U) => {
        if (!yt)
          return;
        const D = new ue();
        if (e.getSize(D), U.clientX >= D.x)
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
  const te = [];
  return ae.forEach((f, g) => {
    te.push(g);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsx("canvas", { ref: x }),
    /* @__PURE__ */ u.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: C, children: [
      n === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(ke, { camera: $, options: te, ref: S, onSelect: (f) => {
        var y;
        (y = re.get($.name)) == null || y.dispose();
        const g = ae.get(f);
        g !== void 0 && (K($), $ = g, O(g, S.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(ke, { camera: $, options: te, ref: S, onSelect: (f) => {
          var y;
          (y = re.get($.name)) == null || y.dispose();
          const g = ae.get(f);
          g !== void 0 && (K($), $ = g, O(g, S.current));
        } }),
        /* @__PURE__ */ u.jsx(ke, { camera: oe, options: te, ref: F, onSelect: (f) => {
          var y;
          (y = re.get(oe.name)) == null || y.dispose();
          const g = ae.get(f);
          g !== void 0 && (K(oe), oe = g, O(g, F.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(ke, { camera: $, options: te, ref: S, onSelect: (f) => {
          var y;
          (y = re.get($.name)) == null || y.dispose();
          const g = ae.get(f);
          g !== void 0 && (K($), $ = g, O(g, S.current));
        } }),
        /* @__PURE__ */ u.jsx(ke, { camera: oe, options: te, ref: F, onSelect: (f) => {
          var y;
          (y = re.get(oe.name)) == null || y.dispose();
          const g = ae.get(f);
          g !== void 0 && (K(oe), oe = g, O(g, F.current));
        } }),
        /* @__PURE__ */ u.jsx(ke, { camera: Ae, options: te, ref: Q, onSelect: (f) => {
          var y;
          (y = re.get(Ae.name)) == null || y.dispose();
          const g = ae.get(f);
          g !== void 0 && (K(Ae), Ae = g, O(g, Q.current));
        } }),
        /* @__PURE__ */ u.jsx(ke, { camera: De, options: te, ref: H, onSelect: (f) => {
          var y;
          (y = re.get(De.name)) == null || y.dispose();
          const g = ae.get(f);
          g !== void 0 && (K(De), De = g, O(g, H.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ u.jsx(
        Et,
        {
          index: en.indexOf(n),
          options: en,
          onSelect: (f) => {
            f !== n && (de(), a(f));
          },
          open: s,
          onToggle: (f) => {
            c(f), l && d(!1), p && m(!1);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        Et,
        {
          index: tn.indexOf(bt),
          options: tn,
          onSelect: (f) => {
            if (f !== bt)
              switch (bt = f, bt) {
                case "Depth":
                  G.overrideMaterial = Na;
                  break;
                case "Normals":
                  G.overrideMaterial = La;
                  break;
                default:
                case "Renderer":
                  G.overrideMaterial = null;
                  break;
                case "Wireframe":
                  G.overrideMaterial = Ua;
                  break;
                case "UVs":
                  G.overrideMaterial = Fa;
                  break;
              }
          },
          open: l,
          onToggle: (f) => {
            s && c(!1), d(f), p && m(!1);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        Et,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (f) => {
            yt = f === "Selection Mode", it.visible = yt;
          },
          open: p,
          onToggle: (f) => {
            s && c(!1), l && d(!1), m(f);
          }
        }
      )
    ] })
  ] });
}
function oi(t) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ u.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ u.jsx("footer", { children: t.footer })
  ] });
}
export {
  Lt as Accordion,
  Za as Application,
  xt as BaseRemote,
  gn as ChildObject,
  ya as ContainerObject,
  la as Draggable,
  ca as DraggableItem,
  ua as Dropdown,
  da as DropdownItem,
  oi as Editor,
  ma as InfiniteGridHelper,
  Aa as Inspector,
  ri as MultiView,
  mn as NavButton,
  Ja as RemoteComponents,
  ni as RemoteController,
  Qa as RemoteTheatre,
  ei as RemoteThree,
  ti as RemoteTweakpane,
  ii as SceneInspector,
  ai as SidePanel,
  A as ToolEvents,
  ba as UVMaterial,
  Ka as clamp,
  Jn as colorToHex,
  k as debugDispatcher,
  fn as dispose,
  ea as disposeMaterial,
  qa as disposeTexture,
  Xa as distance,
  dn as hierarchyUUID,
  Zn as isColor,
  qn as randomID,
  Qn as resetThreeObjects,
  Rt as round,
  At as totalThreeObjects
};
