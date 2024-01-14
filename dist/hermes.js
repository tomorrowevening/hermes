var yn = Object.defineProperty;
var En = (t, n, a) => n in t ? yn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var Y = (t, n, a) => (En(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as xn, EventDispatcher as Jt, Texture as Qt, CubeTexture as wn, RepeatWrapping as Ft, ShaderMaterial as en, GLSL3 as Cn, DoubleSide as Sn, Color as Dt, Mesh as On, PlaneGeometry as Tn, Matrix4 as Mn, Vector3 as B, Euler as Rn, Ray as Pn, Plane as _n, MathUtils as jn, MOUSE as Le, TOUCH as Fe, Quaternion as Ut, Spherical as Bt, Vector2 as le, PerspectiveCamera as Mt, MeshDepthMaterial as kn, MeshNormalMaterial as Dn, MeshBasicMaterial as An, OrthographicCamera as tn, Scene as nn, AxesHelper as In, WebGLRenderer as Nn, CameraHelper as Ln } from "three";
import { getProject as Fn } from "@theatre/core";
import { Pane as Un } from "tweakpane";
import * as Bn from "@tweakpane/plugin-essentials";
import an, { useState as J, useRef as xe, useEffect as $e, Component as $n, forwardRef as Vn } from "react";
import { Reorder as rn } from "framer-motion";
import Ze from "@theatre/studio";
function Ba(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function $a(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function Gn() {
  return Math.round(Math.random() * 1e6).toString();
}
function Yn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function zn(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (d) => {
    const h = d.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, s = o(n), c = o(a), u = o(e);
  return "#" + s + c + u;
}
function Ct(t, n = 1) {
  return Number(t.toFixed(n));
}
let Rt = 0;
const Wn = () => {
  Rt = 0;
}, on = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Rt}`, Rt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    on(a);
  });
}, Va = (t) => {
  t == null || t.dispose();
}, Hn = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, sn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof xn ? (a.pause(), a.parent && a.parent.remove(a)) : sn(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), Hn(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Ga {
  constructor(n, a, e) {
    Y(this, "channel");
    Y(this, "components", /* @__PURE__ */ new Map());
    // Protected
    Y(this, "_mode", "app");
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
const D = new Jt(), A = {
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
class gt {
  constructor(n) {
    Y(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class Ya extends gt {
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
const cn = () => {
};
class za extends gt {
  constructor(a, e, o) {
    super(a);
    Y(this, "project");
    Y(this, "sheets");
    Y(this, "sheetObjects");
    Y(this, "sheetObjectCBs");
    Y(this, "sheetObjectUnsubscribe");
    this.project = Fn(e, o), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
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
    d = c.object(e, o), this.sheetObjects.set(u, d), this.sheetObjectCBs.set(u, s !== void 0 ? s : cn);
    const h = d.onValuesChange((p) => {
      if (this.app.editor) {
        for (const v in p) {
          const x = p[v];
          typeof x == "object" && Yn(x) && (p[v] = {
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
            values: p
          }
        });
      } else {
        const v = this.sheetObjectCBs.get(u);
        v !== void 0 && v(p);
      }
    });
    return this.sheetObjectUnsubscribe.set(u, h), d;
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
function Kn(t) {
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
function ln(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(ln(a));
  }), n;
}
function Xn(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function qn(t) {
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
function $t(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || qn(a))
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
            if (o instanceof Qt) {
              const s = o.source.toJSON();
              n[a] = { src: s.url };
            } else
              o instanceof wn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Xn(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function St(t) {
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
        o.push($t(s));
      }), n.material = o;
    } else
      n.material = $t(e.material);
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
function te(t, n, a) {
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
function Pt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const o = new Qt(e);
      o.wrapS = Ft, o.wrapT = Ft, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class Wa extends gt {
  constructor() {
    super(...arguments);
    Y(this, "scene");
  }
  getObject(a) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = St(a);
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
    this.scene = a, Wn(), on(this.scene);
    const e = ln(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(a) {
    const e = St(a);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(a) {
    const e = St(a);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
class Ha extends gt {
  constructor(a) {
    super(a);
    Y(this, "bindCBs");
    Y(this, "buttonCBs");
    Y(this, "pane");
    Y(this, "appCallbacks", 0);
    Y(this, "editorCallbacks", 0);
    Y(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Un({ title: "GUI" }), this.pane.registerPlugin(Bn);
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
    const c = this.bindID, u = o.onChange !== void 0 ? o.onChange : cn;
    this.bindCBs.set(c, u), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(a, e, o).on("change", (h) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: h.value
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
var _t = { exports: {} }, Je = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function Zn() {
  if (Vt)
    return Je;
  Vt = 1;
  var t = an, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(u, d, h) {
    var p, v = {}, x = null, C = null;
    h !== void 0 && (x = "" + h), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (C = d.ref);
    for (p in d)
      e.call(d, p) && !s.hasOwnProperty(p) && (v[p] = d[p]);
    if (u && u.defaultProps)
      for (p in d = u.defaultProps, d)
        v[p] === void 0 && (v[p] = d[p]);
    return { $$typeof: n, type: u, key: x, ref: C, props: v, _owner: o.current };
  }
  return Je.Fragment = a, Je.jsx = c, Je.jsxs = c, Je;
}
var Qe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gt;
function Jn() {
  return Gt || (Gt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = an, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), T = Symbol.iterator, R = "@@iterator";
    function U(r) {
      if (r === null || typeof r != "object")
        return null;
      var f = T && r[T] || r[R];
      return typeof f == "function" ? f : null;
    }
    var W = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function N(r) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), w = 1; w < f; w++)
          g[w - 1] = arguments[w];
        $("error", r, g);
      }
    }
    function $(r, f, g) {
      {
        var w = W.ReactDebugCurrentFrame, _ = w.getStackAddendum();
        _ !== "" && (f += "%s", g = g.concat([_]));
        var L = g.map(function(P) {
          return String(P);
        });
        L.unshift("Warning: " + f), Function.prototype.apply.call(console[r], console, L);
      }
    }
    var m = !1, b = !1, y = !1, S = !1, H = !1, ne;
    ne = Symbol.for("react.module.reference");
    function ce(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === s || H || r === o || r === h || r === p || S || r === C || m || b || y || typeof r == "object" && r !== null && (r.$$typeof === x || r.$$typeof === v || r.$$typeof === c || r.$$typeof === u || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === ne || r.getModuleId !== void 0));
    }
    function fe(r, f, g) {
      var w = r.displayName;
      if (w)
        return w;
      var _ = f.displayName || f.name || "";
      return _ !== "" ? g + "(" + _ + ")" : g;
    }
    function he(r) {
      return r.displayName || "Context";
    }
    function Q(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && N("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
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
        case h:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case u:
            var f = r;
            return he(f) + ".Consumer";
          case c:
            var g = r;
            return he(g._context) + ".Provider";
          case d:
            return fe(r, r.render, "ForwardRef");
          case v:
            var w = r.displayName || null;
            return w !== null ? w : Q(r.type) || "Memo";
          case x: {
            var _ = r, L = _._payload, P = _._init;
            try {
              return Q(P(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, j = 0, K, ve, _e, je, Ge, nt, Ye;
    function at() {
    }
    at.__reactDisabledLog = !0;
    function bt() {
      {
        if (j === 0) {
          K = console.log, ve = console.info, _e = console.warn, je = console.error, Ge = console.group, nt = console.groupCollapsed, Ye = console.groupEnd;
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
        j++;
      }
    }
    function yt() {
      {
        if (j--, j === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, r, {
              value: K
            }),
            info: M({}, r, {
              value: ve
            }),
            warn: M({}, r, {
              value: _e
            }),
            error: M({}, r, {
              value: je
            }),
            group: M({}, r, {
              value: Ge
            }),
            groupCollapsed: M({}, r, {
              value: nt
            }),
            groupEnd: M({}, r, {
              value: Ye
            })
          });
        }
        j < 0 && N("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ze = W.ReactCurrentDispatcher, We;
    function we(r, f, g) {
      {
        if (We === void 0)
          try {
            throw Error();
          } catch (_) {
            var w = _.stack.trim().match(/\n( *(at )?)/);
            We = w && w[1] || "";
          }
        return `
` + We + r;
      }
    }
    var ke = !1, Ce;
    {
      var Et = typeof WeakMap == "function" ? WeakMap : Map;
      Ce = new Et();
    }
    function rt(r, f) {
      if (!r || ke)
        return "";
      {
        var g = Ce.get(r);
        if (g !== void 0)
          return g;
      }
      var w;
      ke = !0;
      var _ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = ze.current, ze.current = null, bt();
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
            } catch (me) {
              w = me;
            }
            Reflect.construct(r, [], P);
          } else {
            try {
              P.call();
            } catch (me) {
              w = me;
            }
            r.call(P.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (me) {
            w = me;
          }
          r();
        }
      } catch (me) {
        if (me && w && typeof me.stack == "string") {
          for (var O = me.stack.split(`
`), ee = w.stack.split(`
`), V = O.length - 1, G = ee.length - 1; V >= 1 && G >= 0 && O[V] !== ee[G]; )
            G--;
          for (; V >= 1 && G >= 0; V--, G--)
            if (O[V] !== ee[G]) {
              if (V !== 1 || G !== 1)
                do
                  if (V--, G--, G < 0 || O[V] !== ee[G]) {
                    var se = `
` + O[V].replace(" at new ", " at ");
                    return r.displayName && se.includes("<anonymous>") && (se = se.replace("<anonymous>", r.displayName)), typeof r == "function" && Ce.set(r, se), se;
                  }
                while (V >= 1 && G >= 0);
              break;
            }
        }
      } finally {
        ke = !1, ze.current = L, yt(), Error.prepareStackTrace = _;
      }
      var Ne = r ? r.displayName || r.name : "", Lt = Ne ? we(Ne) : "";
      return typeof r == "function" && Ce.set(r, Lt), Lt;
    }
    function it(r, f, g) {
      return rt(r, !1);
    }
    function ot(r) {
      var f = r.prototype;
      return !!(f && f.isReactComponent);
    }
    function Se(r, f, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return rt(r, ot(r));
      if (typeof r == "string")
        return we(r);
      switch (r) {
        case h:
          return we("Suspense");
        case p:
          return we("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return it(r.render);
          case v:
            return Se(r.type, f, g);
          case x: {
            var w = r, _ = w._payload, L = w._init;
            try {
              return Se(L(_), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var De = Object.prototype.hasOwnProperty, st = {}, He = W.ReactDebugCurrentFrame;
    function be(r) {
      if (r) {
        var f = r._owner, g = Se(r.type, r._source, f ? f.type : null);
        He.setExtraStackFrame(g);
      } else
        He.setExtraStackFrame(null);
    }
    function Oe(r, f, g, w, _) {
      {
        var L = Function.call.bind(De);
        for (var P in r)
          if (L(r, P)) {
            var O = void 0;
            try {
              if (typeof r[P] != "function") {
                var ee = Error((w || "React class") + ": " + g + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ee.name = "Invariant Violation", ee;
              }
              O = r[P](f, P, w, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (V) {
              O = V;
            }
            O && !(O instanceof Error) && (be(_), N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", g, P, typeof O), be(null)), O instanceof Error && !(O.message in st) && (st[O.message] = !0, be(_), N("Failed %s type: %s", g, O.message), be(null));
          }
      }
    }
    var xt = Array.isArray;
    function Ke(r) {
      return xt(r);
    }
    function ct(r) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g;
      }
    }
    function Xe(r) {
      try {
        return lt(r), !1;
      } catch {
        return !0;
      }
    }
    function lt(r) {
      return "" + r;
    }
    function ut(r) {
      if (Xe(r))
        return N("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ct(r)), lt(r);
    }
    var ye = W.ReactCurrentOwner, wt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, dt, qe, ue;
    ue = {};
    function i(r) {
      if (De.call(r, "ref")) {
        var f = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function E(r) {
      if (De.call(r, "key")) {
        var f = Object.getOwnPropertyDescriptor(r, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function k(r, f) {
      if (typeof r.ref == "string" && ye.current && f && ye.current.stateNode !== f) {
        var g = Q(ye.current.type);
        ue[g] || (N('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(ye.current.type), r.ref), ue[g] = !0);
      }
    }
    function I(r, f) {
      {
        var g = function() {
          dt || (dt = !0, N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function X(r, f) {
      {
        var g = function() {
          qe || (qe = !0, N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var de = function(r, f, g, w, _, L, P) {
      var O = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: f,
        ref: g,
        props: P,
        // Record the component responsible for creating this element.
        _owner: L
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
        value: _
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    };
    function ae(r, f, g, w, _) {
      {
        var L, P = {}, O = null, ee = null;
        g !== void 0 && (ut(g), O = "" + g), E(f) && (ut(f.key), O = "" + f.key), i(f) && (ee = f.ref, k(f, _));
        for (L in f)
          De.call(f, L) && !wt.hasOwnProperty(L) && (P[L] = f[L]);
        if (r && r.defaultProps) {
          var V = r.defaultProps;
          for (L in V)
            P[L] === void 0 && (P[L] = V[L]);
        }
        if (O || ee) {
          var G = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          O && I(P, G), ee && X(P, G);
        }
        return de(r, O, ee, _, w, ye.current, P);
      }
    }
    var ft = W.ReactCurrentOwner, ht = W.ReactDebugCurrentFrame;
    function pe(r) {
      if (r) {
        var f = r._owner, g = Se(r.type, r._source, f ? f.type : null);
        ht.setExtraStackFrame(g);
      } else
        ht.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ie(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function Ae() {
      {
        if (ft.current) {
          var r = Q(ft.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Te(r) {
      {
        if (r !== void 0) {
          var f = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var Ee = {};
    function Ie(r) {
      {
        var f = Ae();
        if (!f) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function At(r, f) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = Ie(f);
        if (Ee[g])
          return;
        Ee[g] = !0;
        var w = "";
        r && r._owner && r._owner !== ft.current && (w = " It was passed a child from " + Q(r._owner.type) + "."), pe(r), N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, w), pe(null);
      }
    }
    function It(r, f) {
      {
        if (typeof r != "object")
          return;
        if (Ke(r))
          for (var g = 0; g < r.length; g++) {
            var w = r[g];
            ie(w) && At(w, f);
          }
        else if (ie(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var _ = U(r);
          if (typeof _ == "function" && _ !== r.entries)
            for (var L = _.call(r), P; !(P = L.next()).done; )
              ie(P.value) && At(P.value, f);
        }
      }
    }
    function hn(r) {
      {
        var f = r.type;
        if (f == null || typeof f == "string")
          return;
        var g;
        if (typeof f == "function")
          g = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === v))
          g = f.propTypes;
        else
          return;
        if (g) {
          var w = Q(f);
          Oe(g, r.props, "prop", w, r);
        } else if (f.PropTypes !== void 0 && !re) {
          re = !0;
          var _ = Q(f);
          N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _ || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pn(r) {
      {
        for (var f = Object.keys(r.props), g = 0; g < f.length; g++) {
          var w = f[g];
          if (w !== "children" && w !== "key") {
            pe(r), N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), pe(null);
            break;
          }
        }
        r.ref !== null && (pe(r), N("Invalid attribute `ref` supplied to `React.Fragment`."), pe(null));
      }
    }
    function Nt(r, f, g, w, _, L) {
      {
        var P = ce(r);
        if (!P) {
          var O = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (O += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ee = Te(_);
          ee ? O += ee : O += Ae();
          var V;
          r === null ? V = "null" : Ke(r) ? V = "array" : r !== void 0 && r.$$typeof === n ? (V = "<" + (Q(r.type) || "Unknown") + " />", O = " Did you accidentally export a JSX literal instead of a component?") : V = typeof r, N("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", V, O);
        }
        var G = ae(r, f, g, _, L);
        if (G == null)
          return G;
        if (P) {
          var se = f.children;
          if (se !== void 0)
            if (w)
              if (Ke(se)) {
                for (var Ne = 0; Ne < se.length; Ne++)
                  It(se[Ne], r);
                Object.freeze && Object.freeze(se);
              } else
                N("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              It(se, r);
        }
        return r === e ? pn(G) : hn(G), G;
      }
    }
    function mn(r, f, g) {
      return Nt(r, f, g, !0);
    }
    function gn(r, f, g) {
      return Nt(r, f, g, !1);
    }
    var vn = gn, bn = mn;
    Qe.Fragment = e, Qe.jsx = vn, Qe.jsxs = bn;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? _t.exports = Zn() : _t.exports = Jn();
var l = _t.exports;
function un(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const Qn = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), ea = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function ta(t) {
  return /* @__PURE__ */ l.jsx(rn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    ea,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Qn })
  ] }) }, t.title);
}
function na(t) {
  const [n, a] = J(!1), [e, o] = J(t.options), s = (h) => {
    t.onDragComplete(h), o(h);
  }, c = (h) => {
    const p = [...e];
    p.splice(h, 1), s(p);
  }, u = [];
  e.forEach((h, p) => {
    u.push(/* @__PURE__ */ l.jsx(ta, { index: p, title: h, onDelete: c }, h));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(un, { title: t.title }),
    /* @__PURE__ */ l.jsx(rn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: u })
  ] });
}
function aa(t) {
  const [n, a] = J(!1), e = [];
  t.options.map((s, c) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(ra, { option: s }, c));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(un, { title: t.title }),
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
function ra(t) {
  const { option: n } = t, [a, e] = J("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        na,
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
        aa,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: o }, Gn());
}
function Ka(t) {
  let n;
  function a(c) {
    var d, h, p, v, x, C, T, R, U;
    let u;
    switch (c.event) {
      case "custom":
        D.dispatchEvent({ type: A.CUSTOM, value: c.data });
        break;
      case "selectComponent":
        D.dispatchEvent({ type: A.SELECT_DROPDOWN, value: c.data });
        break;
      case "draggableListUpdate":
        D.dispatchEvent({ type: A.DRAG_UPDATE, value: c.data });
        break;
      case "addFolder":
        (d = t.components.get("debug")) == null || d.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (h = t.components.get("debug")) == null || h.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (p = t.components.get("debug")) == null || p.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (v = t.components.get("debug")) == null || v.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (x = t.components.get("debug")) == null || x.triggerButton(c.data.id);
        break;
      case "setSheet":
        u = (C = t.components.get("theatre")) == null ? void 0 : C.sheets.get(c.data.sheet), u !== void 0 && (n = u, Ze.setSelection([u]));
        break;
      case "setSheetObject":
        u = (T = t.components.get("theatre")) == null ? void 0 : T.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), u !== void 0 && Ze.setSelection([u]);
        break;
      case "updateSheetObject":
        u = (R = t.components.get("theatre")) == null ? void 0 : R.sheetObjectCBs.get(c.data.sheetObject), u !== void 0 && u(c.data.values);
        break;
      case "updateTimeline":
        n = (U = t.components.get("theatre")) == null ? void 0 : U.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
        break;
      case "getObject":
        D.dispatchEvent({ type: A.GET_OBJECT, value: c.data });
        break;
      case "updateObject":
        D.dispatchEvent({ type: A.UPDATE_OBJECT, value: c.data });
        break;
      case "createTexture":
        D.dispatchEvent({ type: A.CREATE_TEXTURE, value: c.data });
        break;
      case "requestMethod":
        D.dispatchEvent({ type: A.REQUEST_METHOD, value: c.data });
        break;
    }
  }
  function e(c) {
    switch (c.event) {
      case "custom":
        D.dispatchEvent({ type: A.CUSTOM, value: c.data });
        break;
      case "setObject":
        D.dispatchEvent({ type: A.SET_OBJECT, value: c.data });
        break;
      case "setScene":
        D.dispatchEvent({ type: A.SET_SCENE, value: c.data });
        break;
      case "addCamera":
        D.dispatchEvent({ type: A.ADD_CAMERA, value: c.data });
        break;
      case "removeCamera":
        D.dispatchEvent({ type: A.REMOVE_CAMERA, value: c.data });
        break;
    }
  }
  function o() {
    Ze.ui.hide();
  }
  function s() {
    Ze.ui.restore(), Ze.onSelectionChange((h) => {
      h.length < 1 || h.forEach((p) => {
        var T;
        let v = p.address.sheetId, x = "setSheet", C = {};
        switch (p.type) {
          case "Theatre_Sheet_PublicAPI":
            x = "setSheet", C = {
              sheet: p.address.sheetId
            }, n = (T = t.components.get("theatre")) == null ? void 0 : T.sheets.get(p.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            x = "setSheetObject", v += `_${p.address.objectKey}`, C = {
              id: v,
              sheet: p.address.sheetId,
              key: p.address.objectKey
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
        const h = n;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: c,
            sheet: h.address.sheetId
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
const ia = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, oa = `out vec4 fragColor;
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
class sa extends en {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Cn,
      side: Sn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Dt(16777215)
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
      vertexShader: ia,
      fragmentShader: oa,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ca extends On {
  constructor() {
    const a = new sa();
    super(new Tn(2, 2), a);
    Y(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const la = `#include <common>
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
}`, ua = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class da extends en {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: la,
      fragmentShader: ua
    });
  }
}
function jt(t) {
  const [n, a] = J(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
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
function dn(t) {
  const [n, a] = J(!1), e = t.child.children.length > 0, o = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    o.push(/* @__PURE__ */ l.jsx(dn, { child: s, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Kn(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random());
}
function fa(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(dn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const ha = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function pa(t) {
  return "items" in t;
}
function Ve(t) {
  function n(e, o) {
    console.log("onChange:", e, o);
  }
  const a = [];
  return t.items.forEach((e) => {
    pa(e) ? a.push(
      /* @__PURE__ */ l.jsx(Ve, { title: e.title, items: e.items }, Math.random())
    ) : a.push(
      /* @__PURE__ */ l.jsx(
        et,
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
  }), /* @__PURE__ */ l.jsx(jt, { label: t.title, open: !1, children: a });
}
function ma(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Me(t) {
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
function ga(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function va() {
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
function Yt(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!ma(o))
      continue;
    const s = typeof t[o], c = t[o];
    if (s === "boolean" || s === "number" || s === "string") {
      const u = {
        title: Me(o),
        prop: o,
        type: s,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (d, h) => {
          var v;
          a.updateObject(n.uuid, `material.${d}`, h), s === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const p = (v = a.scene) == null ? void 0 : v.getObjectByProperty("uuid", n.uuid);
          p !== void 0 && te(p, `material.${d}`, h);
        }
      };
      ga(o) && (u.value = Number(c), u.type = "range", u.min = 0, u.max = 1, u.step = 0.01), e.push(u);
    } else if (s === "object")
      if (c.isColor)
        e.push({
          title: Me(o),
          prop: o,
          type: "color",
          value: c,
          onChange: (u, d) => {
            var v;
            const h = new Dt(d);
            a.updateObject(n.uuid, `material.${u}`, h);
            const p = (v = a.scene) == null ? void 0 : v.getObjectByProperty("uuid", n.uuid);
            p !== void 0 && te(p, `material.${u}`, h);
          }
        });
      else if (Array.isArray(c)) {
        const u = [];
        for (const d in c)
          u.push({
            title: `${d}`,
            type: `${typeof c[d]}`,
            value: c[d],
            onChange: (h, p) => {
              var x;
              a.updateObject(n.uuid, `material.${o}`, p);
              const v = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
              v !== void 0 && te(v, `material.${o}`, p);
            }
          });
        e.push({
          title: Me(o),
          items: u
        });
      } else {
        const u = [];
        for (const d in c) {
          const h = c[d];
          switch (typeof h) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: Me(o),
                type: "image",
                value: h,
                onChange: (v, x) => {
                  var T;
                  a.createTexture(n.uuid, `material.${o}`, x);
                  const C = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Pt(x).then((R) => {
                    te(C, `material.${o}`, R), te(C, "material.needsUpdate", !0);
                  });
                }
              }) : u.push({
                title: `${Me(d)}`,
                prop: `material.${o}.${d}`,
                type: `${typeof t[o][d]}`,
                value: c[d],
                onChange: (v, x) => {
                  var T;
                  a.updateObject(n.uuid, `material.${o}.${d}`, x);
                  const C = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && te(C, `material.${o}.${d}`, x);
                }
              });
              break;
            case "object":
              h.value !== void 0 && h.value.src !== void 0 ? u.push({
                title: Me(d),
                type: "image",
                value: h.value.src,
                onChange: (v, x) => {
                  var T;
                  a.createTexture(n.uuid, `material.${o}.${d}.value`, x);
                  const C = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Pt(x).then((R) => {
                    te(C, `material.${o}.${d}.value`, R);
                  });
                }
              }) : u.push({
                title: d,
                type: `${typeof h.value}`,
                value: h.value,
                onChange: (v, x) => {
                  var T;
                  a.updateObject(n.uuid, `material.${o}.${d}.value`, x);
                  const C = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && te(C, `material.${o}.${d}.value`, x);
                }
              });
              break;
          }
        }
        u.length > 0 && e.push({
          title: Me(o),
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
function ba(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let s = 0; s < o; s++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Ve,
          {
            title: `Material ${s}`,
            items: Yt(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Ve,
      {
        title: "Material",
        items: Yt(a, t, n)
      }
    );
}
function et(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = zn(t.value));
  const [a, e] = J(n), o = xe(null), s = xe(null), c = xe(null);
  $e(() => {
    var $;
    let p = !1, v = -1, x = 0, C = Number(a);
    const T = (m) => {
      p = !0, x = C, v = m.clientX;
    }, R = (m) => {
      if (!p)
        return;
      const b = t.step !== void 0 ? t.step : 1, y = (m.clientX - v) * b;
      C = Number((x + y).toFixed(4)), s.current !== null && (s.current.value = C.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, C);
    }, U = () => {
      p = !1;
    }, W = () => {
      p = !1;
    }, N = t.type === "number";
    return N && (($ = o.current) == null || $.addEventListener("mousedown", T, !1), document.addEventListener("mouseup", U, !1), document.addEventListener("mousemove", R, !1), document.addEventListener("contextmenu", W, !1)), () => {
      var m;
      N && ((m = o.current) == null || m.removeEventListener("mousedown", T), document.removeEventListener("mouseup", U), document.removeEventListener("mousemove", R), document.removeEventListener("contextmenu", W));
    };
  }, [a]);
  const u = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = u || t.type === "image", h = (p) => {
    let v = p.target.value;
    t.type === "boolean" && (v = p.target.checked), e(v), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: t.title }, "fieldLabel"),
    t.type === "string" && !u && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: h,
        value: a
      }
    ),
    t.type === "string" && u && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: h,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: h,
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
        onChange: h
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: h, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: h
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: h, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: h })
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
      va().then((p) => {
        c.current.src = p, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, p);
      });
    }, src: a.length > 0 ? a : ha })
  ] });
}
function zt(t) {
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
function ya(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: zt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          var u;
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (u = n.scene) == null ? void 0 : u.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (te(c, o, s), c.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: zt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          var u;
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (u = n.scene) == null ? void 0 : u.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (te(c, o, s), c.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Ve,
    {
      title: "Camera",
      items: a
    }
  );
}
const Ea = Math.PI / 180, xa = 180 / Math.PI;
function wa(t) {
  return t * Ea;
}
function Ot(t) {
  return t * xa;
}
function Ca(t, n) {
  const a = new Mn();
  a.elements = t.matrix;
  const e = new B(), o = new Rn(), s = new B();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const c = (d, h) => {
    var v;
    n.updateObject(t.uuid, d, h);
    const p = (v = n.scene) == null ? void 0 : v.getObjectByProperty("uuid", t.uuid);
    p !== void 0 && te(p, d, h);
  }, u = (d, h) => {
    c(d, wa(h));
  };
  return /* @__PURE__ */ l.jsx(
    Ve,
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
          value: Ct(Ot(o.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: u
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Ct(Ot(o.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: u
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Ct(Ot(o.z)),
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
function Wt(t) {
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
function Sa(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: Wt(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (s, c) => {
          var h;
          const u = new Dt(c);
          n.updateObject(t.uuid, s, u);
          const d = (h = n.scene) == null ? void 0 : h.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && te(d, s, u);
        }
      }) : a.push({
        title: Wt(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (s, c) => {
          var d;
          n.updateObject(t.uuid, s, c);
          const u = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && te(u, s, c);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Ve,
    {
      title: "Light",
      items: a
    }
  );
}
function Oa(t) {
  const [n, a] = J(-1), [e, o] = J({
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
  $e(() => {
    function c(u) {
      const d = u.value;
      o(d), a(Date.now());
    }
    return D.addEventListener(A.SET_OBJECT, c), () => {
      D.removeEventListener(A.SET_OBJECT, c);
    };
  }, []);
  const s = e.type.toLowerCase();
  return /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: e.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: e.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: e.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: e.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: e.visible,
          onChange: (c, u) => {
            var h;
            t.three.updateObject(e.uuid, c, u);
            const d = (h = t.three.scene) == null ? void 0 : h.getObjectByProperty("uuid", e.uuid);
            d !== void 0 && te(d, c, u);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Ca(e, t.three),
      s.search("camera") > -1 ? ya(e, t.three) : null,
      s.search("light") > -1 ? Sa(e, t.three) : null,
      s.search("mesh") > -1 ? ba(e, t.three) : null
    ] })
  ] }) }, n);
}
class Xa extends $n {
  constructor(a) {
    super(a);
    Y(this, "three");
    // Private
    Y(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      scene: a.scene !== void 0 ? a.scene : null
    }, this.three = a.three, D.addEventListener(A.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    D.removeEventListener(A.SET_SCENE, this.setScene);
  }
  render() {
    var o;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(o = this.componentState.scene) == null ? void 0 : o.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(jt, { label: e, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: a && /* @__PURE__ */ l.jsx(fa, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(jt, { label: "Inspector", children: /* @__PURE__ */ l.jsx(Oa, { three: this.three }, "Inspector") })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function qa(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (u) => {
    var h;
    if (!n())
      return;
    const d = (h = t.three.scene) == null ? void 0 : h.getObjectByProperty("uuid", u.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (u, d, h) => {
    var v;
    if (!n())
      return;
    const p = (v = t.three.scene) == null ? void 0 : v.getObjectByProperty("uuid", u);
    p !== void 0 && te(p, d, h);
  }, o = (u) => {
    if (!n())
      return;
    const d = u.value, { key: h, value: p, uuid: v } = d;
    e(v, h, p);
  }, s = (u) => {
    if (!n())
      return;
    const d = u.value;
    Pt(d.value).then((h) => {
      e(d.uuid, d.key, h), e(d.uuid, "material.needsUpdate", !0);
    });
  }, c = (u) => {
    var x;
    if (!n())
      return;
    const { key: d, uuid: h, value: p } = u.value, v = (x = t.three.scene) == null ? void 0 : x.getObjectByProperty("uuid", h);
    if (v !== void 0)
      try {
        v[d](p);
      } catch (C) {
        console.log("Error requesting method:"), console.log(C), console.log(d), console.log(p);
      }
  };
  return $e(() => (D.addEventListener(A.GET_OBJECT, a), D.addEventListener(A.UPDATE_OBJECT, o), D.addEventListener(A.CREATE_TEXTURE, s), D.addEventListener(A.REQUEST_METHOD, c), () => {
    D.removeEventListener(A.GET_OBJECT, a), D.removeEventListener(A.UPDATE_OBJECT, o), D.removeEventListener(A.CREATE_TEXTURE, s), D.removeEventListener(A.REQUEST_METHOD, c);
  }), []), null;
}
const Ht = { type: "change" }, Tt = { type: "start" }, Kt = { type: "end" }, pt = new Pn(), Xt = new _n(), Ta = Math.cos(70 * jn.DEG2RAD);
class Ma extends Jt {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new B(), this.cursor = new B(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Le.ROTATE, MIDDLE: Le.DOLLY, RIGHT: Le.PAN }, this.touches = { ONE: Fe.ROTATE, TWO: Fe.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return u.phi;
    }, this.getAzimuthalAngle = function() {
      return u.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(i) {
      i.addEventListener("keydown", Xe), this._domElementKeyEvents = i;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Xe), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Ht), e.update(), s = o.NONE;
    }, this.update = function() {
      const i = new B(), E = new Ut().setFromUnitVectors(n.up, new B(0, 1, 0)), k = E.clone().invert(), I = new B(), X = new Ut(), de = new B(), ae = 2 * Math.PI;
      return function(ht = null) {
        const pe = e.object.position;
        i.copy(pe).sub(e.target), i.applyQuaternion(E), u.setFromVector3(i), e.autoRotate && s === o.NONE && fe(ne(ht)), e.enableDamping ? (u.theta += d.theta * e.dampingFactor, u.phi += d.phi * e.dampingFactor) : (u.theta += d.theta, u.phi += d.phi);
        let re = e.minAzimuthAngle, ie = e.maxAzimuthAngle;
        isFinite(re) && isFinite(ie) && (re < -Math.PI ? re += ae : re > Math.PI && (re -= ae), ie < -Math.PI ? ie += ae : ie > Math.PI && (ie -= ae), re <= ie ? u.theta = Math.max(re, Math.min(ie, u.theta)) : u.theta = u.theta > (re + ie) / 2 ? Math.max(re, u.theta) : Math.min(ie, u.theta)), u.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, u.phi)), u.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(p, e.dampingFactor) : e.target.add(p), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && y || e.object.isOrthographicCamera ? u.radius = je(u.radius) : u.radius = je(u.radius * h), i.setFromSpherical(u), i.applyQuaternion(k), pe.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, p.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), p.set(0, 0, 0));
        let Ae = !1;
        if (e.zoomToCursor && y) {
          let Te = null;
          if (e.object.isPerspectiveCamera) {
            const Ee = i.length();
            Te = je(Ee * h);
            const Ie = Ee - Te;
            e.object.position.addScaledVector(m, Ie), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Ee = new B(b.x, b.y, 0);
            Ee.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix(), Ae = !0;
            const Ie = new B(b.x, b.y, 0);
            Ie.unproject(e.object), e.object.position.sub(Ie).add(Ee), e.object.updateMatrixWorld(), Te = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Te !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Te).add(e.object.position) : (pt.origin.copy(e.object.position), pt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(pt.direction)) < Ta ? n.lookAt(e.target) : (Xt.setFromNormalAndCoplanarPoint(e.object.up, e.target), pt.intersectPlane(Xt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix(), Ae = !0);
        return h = 1, y = !1, Ae || I.distanceToSquared(e.object.position) > c || 8 * (1 - X.dot(e.object.quaternion)) > c || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Ht), I.copy(e.object.position), X.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", ye), e.domElement.removeEventListener("pointerdown", He), e.domElement.removeEventListener("pointercancel", Oe), e.domElement.removeEventListener("wheel", ct), e.domElement.removeEventListener("pointermove", be), e.domElement.removeEventListener("pointerup", Oe), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Xe), e._domElementKeyEvents = null);
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
    const c = 1e-6, u = new Bt(), d = new Bt();
    let h = 1;
    const p = new B(), v = new le(), x = new le(), C = new le(), T = new le(), R = new le(), U = new le(), W = new le(), N = new le(), $ = new le(), m = new B(), b = new le();
    let y = !1;
    const S = [], H = {};
    function ne(i) {
      return i !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function ce(i) {
      const E = Math.abs(i) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * E);
    }
    function fe(i) {
      d.theta -= i;
    }
    function he(i) {
      d.phi -= i;
    }
    const Q = function() {
      const i = new B();
      return function(k, I) {
        i.setFromMatrixColumn(I, 0), i.multiplyScalar(-k), p.add(i);
      };
    }(), M = function() {
      const i = new B();
      return function(k, I) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(I, 1) : (i.setFromMatrixColumn(I, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(k), p.add(i);
      };
    }(), j = function() {
      const i = new B();
      return function(k, I) {
        const X = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const de = e.object.position;
          i.copy(de).sub(e.target);
          let ae = i.length();
          ae *= Math.tan(e.object.fov / 2 * Math.PI / 180), Q(2 * k * ae / X.clientHeight, e.object.matrix), M(2 * I * ae / X.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (Q(k * (e.object.right - e.object.left) / e.object.zoom / X.clientWidth, e.object.matrix), M(I * (e.object.top - e.object.bottom) / e.object.zoom / X.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function K(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ve(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function _e(i, E) {
      if (!e.zoomToCursor)
        return;
      y = !0;
      const k = e.domElement.getBoundingClientRect(), I = i - k.left, X = E - k.top, de = k.width, ae = k.height;
      b.x = I / de * 2 - 1, b.y = -(X / ae) * 2 + 1, m.set(b.x, b.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function je(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function Ge(i) {
      v.set(i.clientX, i.clientY);
    }
    function nt(i) {
      _e(i.clientX, i.clientX), W.set(i.clientX, i.clientY);
    }
    function Ye(i) {
      T.set(i.clientX, i.clientY);
    }
    function at(i) {
      x.set(i.clientX, i.clientY), C.subVectors(x, v).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      fe(2 * Math.PI * C.x / E.clientHeight), he(2 * Math.PI * C.y / E.clientHeight), v.copy(x), e.update();
    }
    function bt(i) {
      N.set(i.clientX, i.clientY), $.subVectors(N, W), $.y > 0 ? K(ce($.y)) : $.y < 0 && ve(ce($.y)), W.copy(N), e.update();
    }
    function yt(i) {
      R.set(i.clientX, i.clientY), U.subVectors(R, T).multiplyScalar(e.panSpeed), j(U.x, U.y), T.copy(R), e.update();
    }
    function ze(i) {
      _e(i.clientX, i.clientY), i.deltaY < 0 ? ve(ce(i.deltaY)) : i.deltaY > 0 && K(ce(i.deltaY)), e.update();
    }
    function We(i) {
      let E = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? he(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : j(0, e.keyPanSpeed), E = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? he(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : j(0, -e.keyPanSpeed), E = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? fe(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : j(e.keyPanSpeed, 0), E = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? fe(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : j(-e.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (i.preventDefault(), e.update());
    }
    function we(i) {
      if (S.length === 1)
        v.set(i.pageX, i.pageY);
      else {
        const E = ue(i), k = 0.5 * (i.pageX + E.x), I = 0.5 * (i.pageY + E.y);
        v.set(k, I);
      }
    }
    function ke(i) {
      if (S.length === 1)
        T.set(i.pageX, i.pageY);
      else {
        const E = ue(i), k = 0.5 * (i.pageX + E.x), I = 0.5 * (i.pageY + E.y);
        T.set(k, I);
      }
    }
    function Ce(i) {
      const E = ue(i), k = i.pageX - E.x, I = i.pageY - E.y, X = Math.sqrt(k * k + I * I);
      W.set(0, X);
    }
    function Et(i) {
      e.enableZoom && Ce(i), e.enablePan && ke(i);
    }
    function rt(i) {
      e.enableZoom && Ce(i), e.enableRotate && we(i);
    }
    function it(i) {
      if (S.length == 1)
        x.set(i.pageX, i.pageY);
      else {
        const k = ue(i), I = 0.5 * (i.pageX + k.x), X = 0.5 * (i.pageY + k.y);
        x.set(I, X);
      }
      C.subVectors(x, v).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      fe(2 * Math.PI * C.x / E.clientHeight), he(2 * Math.PI * C.y / E.clientHeight), v.copy(x);
    }
    function ot(i) {
      if (S.length === 1)
        R.set(i.pageX, i.pageY);
      else {
        const E = ue(i), k = 0.5 * (i.pageX + E.x), I = 0.5 * (i.pageY + E.y);
        R.set(k, I);
      }
      U.subVectors(R, T).multiplyScalar(e.panSpeed), j(U.x, U.y), T.copy(R);
    }
    function Se(i) {
      const E = ue(i), k = i.pageX - E.x, I = i.pageY - E.y, X = Math.sqrt(k * k + I * I);
      N.set(0, X), $.set(0, Math.pow(N.y / W.y, e.zoomSpeed)), K($.y), W.copy(N);
      const de = (i.pageX + E.x) * 0.5, ae = (i.pageY + E.y) * 0.5;
      _e(de, ae);
    }
    function De(i) {
      e.enableZoom && Se(i), e.enablePan && ot(i);
    }
    function st(i) {
      e.enableZoom && Se(i), e.enableRotate && it(i);
    }
    function He(i) {
      e.enabled !== !1 && (S.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", be), e.domElement.addEventListener("pointerup", Oe)), wt(i), i.pointerType === "touch" ? lt(i) : xt(i));
    }
    function be(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? ut(i) : Ke(i));
    }
    function Oe(i) {
      dt(i), S.length === 0 && (e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", be), e.domElement.removeEventListener("pointerup", Oe)), e.dispatchEvent(Kt), s = o.NONE;
    }
    function xt(i) {
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
        case Le.DOLLY:
          if (e.enableZoom === !1)
            return;
          nt(i), s = o.DOLLY;
          break;
        case Le.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enablePan === !1)
              return;
            Ye(i), s = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Ge(i), s = o.ROTATE;
          }
          break;
        case Le.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Ge(i), s = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Ye(i), s = o.PAN;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent(Tt);
    }
    function Ke(i) {
      switch (s) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          at(i);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          bt(i);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          yt(i);
          break;
      }
    }
    function ct(i) {
      e.enabled === !1 || e.enableZoom === !1 || s !== o.NONE || (i.preventDefault(), e.dispatchEvent(Tt), ze(i), e.dispatchEvent(Kt));
    }
    function Xe(i) {
      e.enabled === !1 || e.enablePan === !1 || We(i);
    }
    function lt(i) {
      switch (qe(i), S.length) {
        case 1:
          switch (e.touches.ONE) {
            case Fe.ROTATE:
              if (e.enableRotate === !1)
                return;
              we(i), s = o.TOUCH_ROTATE;
              break;
            case Fe.PAN:
              if (e.enablePan === !1)
                return;
              ke(i), s = o.TOUCH_PAN;
              break;
            default:
              s = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Fe.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              Et(i), s = o.TOUCH_DOLLY_PAN;
              break;
            case Fe.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              rt(i), s = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = o.NONE;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent(Tt);
    }
    function ut(i) {
      switch (qe(i), s) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          it(i), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          ot(i), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          De(i), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          st(i), e.update();
          break;
        default:
          s = o.NONE;
      }
    }
    function ye(i) {
      e.enabled !== !1 && i.preventDefault();
    }
    function wt(i) {
      S.push(i.pointerId);
    }
    function dt(i) {
      delete H[i.pointerId];
      for (let E = 0; E < S.length; E++)
        if (S[E] == i.pointerId) {
          S.splice(E, 1);
          return;
        }
    }
    function qe(i) {
      let E = H[i.pointerId];
      E === void 0 && (E = new le(), H[i.pointerId] = E), E.set(i.pageX, i.pageY);
    }
    function ue(i) {
      const E = i.pointerId === S[0] ? S[1] : S[0];
      return H[E];
    }
    e.domElement.addEventListener("contextmenu", ye), e.domElement.addEventListener("pointerdown", He), e.domElement.addEventListener("pointercancel", Oe), e.domElement.addEventListener("wheel", ct, { passive: !1 }), this.update();
  }
}
const kt = (t) => {
  const [n, a] = J(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, o = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => o(s), children: s }, s)) })
  ] });
}, Re = Vn(function(n, a) {
  const [e, o] = J(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && o(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      kt,
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
}), qt = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], q = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Map();
function Pe(t, n) {
  const a = new tn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), q.set(t, a), a;
}
Pe("Top", new B(0, 1e3, 0));
Pe("Bottom", new B(0, -1e3, 0));
Pe("Left", new B(-1e3, 0, 0));
Pe("Right", new B(1e3, 0, 0));
Pe("Front", new B(0, 0, 1e3));
Pe("Back", new B(0, 0, -1e3));
Pe("Orthographic", new B(1e3, 1e3, 1e3));
const vt = new Mt(60, 1, 50, 3e3);
vt.name = "Debug";
vt.position.set(500, 500, 500);
vt.lookAt(0, 0, 0);
q.set("Debug", vt);
const Zt = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ra = new kn(), Pa = new Dn(), _a = new da(), ja = new An({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let mt = "Renderer";
const F = new nn();
F.name = "Debug Scene";
let tt = new nn();
F.add(tt);
const ka = new ca();
F.add(ka);
const fn = new In(500);
fn.name = "axisHelper";
F.add(fn);
let z = q.get("Debug"), oe = q.get("Orthographic"), Ue = q.get("Front"), Be = q.get("Top");
function Za(t) {
  const [n, a] = J(t.mode !== void 0 ? t.mode : "Quad"), [e, o] = J(null), [s, c] = J(!1), [u, d] = J(!1), [, h] = J(Date.now()), p = xe(null), v = xe(null), x = xe(null), C = xe(null), T = xe(null), R = (m, b) => {
    const y = Z.get(m.name);
    y !== void 0 && y.dispose(), Z.delete(m.name);
    const S = ge.get(m.name);
    S !== void 0 && (F.remove(S), S.dispose()), ge.delete(m.name);
    const H = new Ma(m, b);
    switch (H.enableDamping = !0, H.dampingFactor = 0.05, m.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        H.enableRotate = !1;
        break;
    }
    if (Z.set(m.name, H), m instanceof Mt) {
      const ne = new Ln(m);
      ge.set(m.name, ne), F.add(ne);
    }
  }, U = (m) => {
    const b = ge.get(m.name);
    b !== void 0 && (F.remove(b), b.dispose(), ge.delete(m.name));
    const y = Z.get(m.name);
    y !== void 0 && (y.dispose(), Z.delete(m.name));
  }, W = () => {
    Z.forEach((m, b) => {
      m.dispose();
      const y = ge.get(b);
      y !== void 0 && (F.remove(y), y.dispose()), ge.delete(b), Z.delete(b);
    }), Z.clear(), ge.clear();
  }, N = () => {
    switch (n) {
      case "Single":
        R(z, v.current);
        break;
      case "Side by Side":
      case "Stacked":
        R(z, v.current), R(oe, x.current);
        break;
      case "Quad":
        R(z, v.current), R(oe, x.current), R(Ue, C.current), R(Be, T.current);
        break;
    }
  };
  $e(() => {
    const m = new Nn({
      canvas: p.current,
      stencil: !1
    });
    m.autoClear = !1, m.shadowMap.enabled = !0, m.setPixelRatio(devicePixelRatio), m.setClearColor(0), o(m);
  }, []), $e(() => {
    const m = () => {
      sn(tt), F.remove(tt), t.three.scene !== void 0 && (tt = t.three.scene, F.add(tt));
    }, b = (S) => {
      var ce;
      const H = S.value, ne = (ce = t.three.scene) == null ? void 0 : ce.getObjectByProperty("uuid", H.uuid);
      ne !== void 0 && q.set(H.name, ne), h(Date.now());
    }, y = (S) => {
      q.delete(S.value.name), h(Date.now());
    };
    return D.addEventListener(A.SET_SCENE, m), D.addEventListener(A.ADD_CAMERA, b), D.addEventListener(A.REMOVE_CAMERA, y), () => {
      D.removeEventListener(A.SET_SCENE, m), D.removeEventListener(A.ADD_CAMERA, b), D.removeEventListener(A.REMOVE_CAMERA, y);
    };
  }, []), $e(() => {
    if (e === null)
      return;
    let m = window.innerWidth, b = window.innerHeight, y = Math.floor(m / 2), S = Math.floor(b / 2), H = -1;
    const ne = () => {
      m = window.innerWidth - 300, b = window.innerHeight, y = Math.floor(m / 2), S = Math.floor(b / 2), e.setSize(m, b);
      let M = m, j = b;
      switch (n) {
        case "Side by Side":
          M = y, j = b;
          break;
        case "Stacked":
          M = m, j = S;
          break;
        case "Quad":
          M = y, j = S;
          break;
      }
      q.forEach((K) => {
        var ve;
        K instanceof tn ? (K.left = M / -2, K.right = M / 2, K.top = j / 2, K.bottom = j / -2, K.updateProjectionMatrix()) : K instanceof Mt && (K.aspect = M / j, K.updateProjectionMatrix(), (ve = ge.get(K.name)) == null || ve.update());
      });
    }, ce = () => {
      e.setViewport(0, 0, m, b), e.setScissor(0, 0, m, b), e.render(F, z);
    }, fe = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, y, b), e.setScissor(0, 0, y, b), e.render(F, z), e.setViewport(y, 0, y, b), e.setScissor(y, 0, y, b), e.render(F, oe);
      else {
        const M = b - S;
        e.setViewport(0, M, m, S), e.setScissor(0, M, m, S), e.render(F, z), e.setViewport(0, 0, m, S), e.setScissor(0, 0, m, S), e.render(F, oe);
      }
    }, he = () => {
      let M = 0, j = 0;
      j = b - S, M = 0, e.setViewport(M, j, y, S), e.setScissor(M, j, y, S), e.render(F, z), M = y, e.setViewport(M, j, y, S), e.setScissor(M, j, y, S), e.render(F, oe), j = 0, M = 0, e.setViewport(M, j, y, S), e.setScissor(M, j, y, S), e.render(F, Ue), M = y, e.setViewport(M, j, y, S), e.setScissor(M, j, y, S), e.render(F, Be);
    }, Q = () => {
      switch (Z.forEach((M) => {
        M.update();
      }), e.clear(), n) {
        case "Single":
          ce();
          break;
        case "Side by Side":
        case "Stacked":
          fe();
          break;
        case "Quad":
          he();
          break;
      }
      H = requestAnimationFrame(Q);
    };
    return N(), window.addEventListener("resize", ne), ne(), Q(), () => {
      window.removeEventListener("resize", ne), cancelAnimationFrame(H), H = -1;
    };
  }, [n, e]);
  const $ = [];
  return q.forEach((m, b) => {
    $.push(b);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: p }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Re, { camera: z, options: $, ref: v, onSelect: (m) => {
        var y;
        (y = Z.get(z.name)) == null || y.dispose();
        const b = q.get(m);
        b !== void 0 && (U(z), z = b, R(b, v.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Re, { camera: z, options: $, ref: v, onSelect: (m) => {
          var y;
          (y = Z.get(z.name)) == null || y.dispose();
          const b = q.get(m);
          b !== void 0 && (U(z), z = b, R(b, v.current));
        } }),
        /* @__PURE__ */ l.jsx(Re, { camera: oe, options: $, ref: x, onSelect: (m) => {
          var y;
          (y = Z.get(oe.name)) == null || y.dispose();
          const b = q.get(m);
          b !== void 0 && (U(oe), oe = b, R(b, x.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Re, { camera: z, options: $, ref: v, onSelect: (m) => {
          var y;
          (y = Z.get(z.name)) == null || y.dispose();
          const b = q.get(m);
          b !== void 0 && (U(z), z = b, R(b, v.current));
        } }),
        /* @__PURE__ */ l.jsx(Re, { camera: oe, options: $, ref: x, onSelect: (m) => {
          var y;
          (y = Z.get(oe.name)) == null || y.dispose();
          const b = q.get(m);
          b !== void 0 && (U(oe), oe = b, R(b, x.current));
        } }),
        /* @__PURE__ */ l.jsx(Re, { camera: Ue, options: $, ref: C, onSelect: (m) => {
          var y;
          (y = Z.get(Ue.name)) == null || y.dispose();
          const b = q.get(m);
          b !== void 0 && (U(Ue), Ue = b, R(b, C.current));
        } }),
        /* @__PURE__ */ l.jsx(Re, { camera: Be, options: $, ref: T, onSelect: (m) => {
          var y;
          (y = Z.get(Be.name)) == null || y.dispose();
          const b = q.get(m);
          b !== void 0 && (U(Be), Be = b, R(b, T.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        kt,
        {
          index: qt.indexOf(n),
          options: qt,
          onSelect: (m) => {
            m !== n && (W(), a(m));
          },
          open: s,
          onToggle: (m) => {
            c(m), d(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        kt,
        {
          index: Zt.indexOf(mt),
          options: Zt,
          onSelect: (m) => {
            if (m !== mt)
              switch (mt = m, mt) {
                case "Depth":
                  F.overrideMaterial = Ra;
                  break;
                case "Normals":
                  F.overrideMaterial = Pa;
                  break;
                default:
                case "Renderer":
                  F.overrideMaterial = null;
                  break;
                case "Wireframe":
                  F.overrideMaterial = ja;
                  break;
                case "UVs":
                  F.overrideMaterial = _a;
                  break;
              }
          },
          open: u,
          onToggle: (m) => {
            c(!1), d(m);
          }
        }
      )
    ] })
  ] });
}
function Ja(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  jt as Accordion,
  Ga as Application,
  gt as BaseRemote,
  dn as ChildObject,
  fa as ContainerObject,
  na as Draggable,
  ta as DraggableItem,
  aa as Dropdown,
  ra as DropdownItem,
  Ja as Editor,
  ca as InfiniteGridHelper,
  Oa as Inspector,
  Za as MultiView,
  un as NavButton,
  Ya as RemoteComponents,
  Ka as RemoteController,
  za as RemoteTheatre,
  Wa as RemoteThree,
  Ha as RemoteTweakpane,
  qa as SceneInspector,
  Xa as SidePanel,
  A as ToolEvents,
  da as UVMaterial,
  Ba as clamp,
  zn as colorToHex,
  D as debugDispatcher,
  sn as dispose,
  Hn as disposeMaterial,
  Va as disposeTexture,
  $a as distance,
  on as hierarchyUUID,
  Yn as isColor,
  Gn as randomID,
  Wn as resetThreeObjects,
  Ct as round,
  Rt as totalThreeObjects
};
