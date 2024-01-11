var bn = Object.defineProperty;
var yn = (e, n, r) => n in e ? bn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var F = (e, n, r) => (yn(e, typeof n != "symbol" ? n + "" : n, r), r);
import { PositionalAudio as En, EventDispatcher as Zt, Texture as Jt, CubeTexture as xn, RepeatWrapping as Lt, ShaderMaterial as Qt, GLSL3 as wn, DoubleSide as Cn, Color as kt, Mesh as Sn, PlaneGeometry as Tn, Matrix4 as On, Vector3 as I, Euler as Rn, Ray as Mn, Plane as Pn, MathUtils as jn, MOUSE as Le, TOUCH as Fe, Quaternion as Ft, Spherical as Ut, Vector2 as ae, PerspectiveCamera as Rt, MeshNormalMaterial as _n, MeshBasicMaterial as kn, OrthographicCamera as en, Scene as tn, AxesHelper as Dn, CameraHelper as An } from "three";
import { getProject as In } from "@theatre/core";
import { Pane as Nn } from "tweakpane";
import * as Ln from "@tweakpane/plugin-essentials";
import nn, { useState as ie, useRef as Oe, useEffect as nt, Component as Fn, forwardRef as Un } from "react";
import { Reorder as rn } from "framer-motion";
import Ze from "@theatre/studio";
function Lr(e, n, r) {
  return Math.min(n, Math.max(e, r));
}
function Fr(e, n) {
  const r = e - n;
  return Math.sqrt(r * r);
}
function Bn() {
  return Math.round(Math.random() * 1e6).toString();
}
function $n(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Gn(e) {
  const n = Math.round(e.r * 255), r = Math.round(e.g * 255), t = Math.round(e.b * 255), o = (d) => {
    const m = d.toString(16);
    return m.length === 1 ? "0" + m : m;
  }, u = o(n), c = o(r), s = o(t);
  return "#" + u + c + s;
}
function Ct(e, n = 1) {
  return Number(e.toFixed(n));
}
let Bt = 0;
const an = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Bt}`), e.parent !== null && (n = `${e.parent.uuid}.${n}`), e.uuid = n, Bt++, e.children.forEach((r) => {
    an(r);
  });
}, Ur = (e) => {
  e == null || e.dispose();
}, Vn = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, on = (e) => {
  var n;
  if (e) {
    for (; e.children.length > 0; ) {
      const r = e.children[0];
      r instanceof En ? (r.pause(), r.parent && r.parent.remove(r)) : on(r);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const r = e;
      (n = r.geometry) == null || n.dispose(), Vn(r.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class Br {
  constructor(n, r, t) {
    F(this, "channel");
    F(this, "components", /* @__PURE__ */ new Map());
    // Protected
    F(this, "_mode", "app");
    this.editor = r && document.location.hash.search(t) > -1, r && (this.channel = new BroadcastChannel(n));
  }
  addComponent(n, r) {
    this.components.set(n, r);
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
    this.channel !== void 0 && (this.channel.onmessage = (r) => {
      n(r.data);
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
const k = new Zt(), D = {
  CUSTOM: "ToolEvents::custom",
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  GET_SCENE: "ToolEvents::getScene",
  SET_SCENE: "ToolEvents::setScene",
  GET_OBJECT: "ToolEvents::getObject",
  SET_OBJECT: "ToolEvents::setObject",
  UPDATE_OBJECT: "ToolEvents::updateObject",
  CREATE_TEXTURE: "ToolEvents::createTexture",
  REQUEST_METHOD: "ToolEvents::requestMethod"
};
class gt {
  constructor(n) {
    F(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class $r extends gt {
  selectDropdown(n, r) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: n,
        value: r
      }
    });
  }
  updateDropdown(n, r) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: n,
        value: r
      }
    });
  }
}
const sn = () => {
};
class Gr extends gt {
  constructor(r, t, o) {
    super(r);
    F(this, "project");
    F(this, "sheets");
    F(this, "sheetObjects");
    F(this, "sheetObjectCBs");
    F(this, "sheetObjectUnsubscribe");
    this.project = In(t, o), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(r) {
    var o;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let t = this.sheets.get(r);
    return t !== void 0 || (t = (o = this.project) == null ? void 0 : o.sheet(r), this.sheets.set(r, t)), t;
  }
  sheetObject(r, t, o, u) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheets.get(r);
    if (c === void 0)
      return;
    const s = `${r}_${t}`;
    let d = this.sheetObjects.get(s);
    if (d !== void 0)
      return d = c.object(t, { ...o, ...d.value }, { reconfigure: !0 }), d;
    d = c.object(t, o), this.sheetObjects.set(s, d), this.sheetObjectCBs.set(s, u !== void 0 ? u : sn);
    const m = d.onValuesChange((v) => {
      if (this.app.editor) {
        for (const f in v) {
          const h = v[f];
          typeof h == "object" && $n(h) && (v[f] = {
            r: h.r,
            g: h.g,
            b: h.b,
            a: h.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheetObject: s,
            values: v
          }
        });
      } else {
        const f = this.sheetObjectCBs.get(s);
        f !== void 0 && f(v);
      }
    });
    return this.sheetObjectUnsubscribe.set(s, m), d;
  }
  unsubscribe(r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = `${r.address.sheetId}_${r.address.objectKey}`, o = this.sheetObjectUnsubscribe.get(t);
    o !== void 0 && o();
  }
}
function Yn(e) {
  if (e.name === "cameras")
    return "camera";
  if (e.name === "interactive")
    return "interactive";
  if (e.name === "lights")
    return "light";
  if (e.name === "ui")
    return "ui";
  if (e.name === "utils")
    return "utils";
  const n = e.type;
  return n.search("Helper") > -1 ? "icon_utils" : n.search("Camera") > -1 ? "camera" : n.search("Light") > -1 ? "light" : "obj3D";
}
function cn(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((r) => {
    n.children.push(cn(r));
  }), n;
}
function zn(e) {
  const n = {};
  for (const r in e) {
    const t = e[r].value;
    n[r] = { value: t }, t === null ? n[r].value = { src: "" } : t.isTexture && (n[r].value = { src: t.image.src });
  }
  return n;
}
function Wn(e) {
  switch (e) {
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
function $t(e) {
  const n = {};
  for (const r in e) {
    if (r.substring(0, 1) === "_" || r.substring(0, 2) === "is" || Wn(r))
      continue;
    const t = typeof e[r], o = e[r];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        n[r] = o;
        break;
      case "object":
        if (o !== null)
          if (n[r] = o, o.isTexture)
            if (o instanceof Jt) {
              const u = o.source.toJSON();
              n[r] = { src: u.url };
            } else
              o instanceof xn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[r] = { src: "" });
          else
            r === "uniforms" && (n[r] = zn(n[r]));
        else
          n[r] = { src: "" };
        break;
    }
  }
  return n;
}
function Hn(e) {
  e.updateMatrix();
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    visible: e.visible,
    matrix: e.matrix.elements,
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0
  }, r = e.type.toLowerCase();
  if (r.search("mesh") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const o = [];
      t.material.forEach((u) => {
        o.push($t(u));
      }), n.material = o;
    } else
      n.material = $t(t.material);
  } else
    r.search("camera") > -1 ? e.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
      fov: e.fov,
      zoom: e.zoom,
      near: e.near,
      far: e.far,
      focus: e.focus,
      aspect: e.aspect,
      filmGauge: e.filmGauge,
      filmOffset: e.filmOffset
    } : e.type === "OrthographicCamera" && (n.orthographicCameraInfo = {
      zoom: e.zoom,
      near: e.near,
      far: e.far,
      left: e.left,
      right: e.right,
      top: e.top,
      bottom: e.bottom
    }) : r.search("light") > -1 && (n.lightInfo = {
      color: e.color,
      intensity: e.intensity,
      decay: e.decay,
      distance: e.distance,
      angle: e.angle,
      penumbra: e.penumbra,
      groundColor: e.groundColor
    });
  return n;
}
function H(e, n, r) {
  const t = n.split(".");
  switch (t.length) {
    case 1:
      e[t[0]] = r;
      break;
    case 2:
      e[t[0]][t[1]] = r;
      break;
    case 3:
      e[t[0]][t[1]][t[2]] = r;
      break;
    case 4:
      e[t[0]][t[1]][t[2]][t[3]] = r;
      break;
    case 5:
      e[t[0]][t[1]][t[2]][t[3]][t[4]] = r;
      break;
  }
}
function Mt(e) {
  return new Promise((n, r) => {
    const t = new Image();
    t.onload = () => {
      const o = new Jt(t);
      o.wrapS = Lt, o.wrapT = Lt, o.needsUpdate = !0, n(o);
    }, t.onerror = r, t.src = e;
  });
}
class Vr extends gt {
  constructor() {
    super(...arguments);
    F(this, "scene");
  }
  getObject(r) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: r
    });
  }
  setObject(r) {
    const t = Hn(r);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: t
    });
  }
  requestMethod(r, t, o) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: r,
        key: t,
        value: o
      }
    });
  }
  updateObject(r, t, o) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: r,
        key: t,
        value: o
      }
    });
  }
  createTexture(r, t, o) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: r,
        key: t,
        value: o
      }
    });
  }
  getScene() {
    this.app.send({
      event: "getScene",
      target: "app"
    });
  }
  setScene(r) {
    this.scene = r, an(this.scene);
    const t = cn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: t
    });
  }
}
class Yr extends gt {
  constructor(r) {
    super(r);
    F(this, "bindCBs");
    F(this, "buttonCBs");
    F(this, "pane");
    F(this, "appCallbacks", 0);
    F(this, "editorCallbacks", 0);
    F(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), r.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Nn({ title: "GUI" }), this.pane.registerPlugin(Ln);
  }
  dispose() {
    var r;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((r = this.pane) == null || r.dispose(), this.pane = void 0);
  }
  addFolder(r, t = void 0, o = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addFolder({
        title: r,
        ...t
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: r,
        params: t,
        parent: o
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(r, t, o, u = void 0) {
    const c = this.bindID, s = o.onChange !== void 0 ? o.onChange : sn;
    this.bindCBs.set(c, s), this.app.editor ? (this.pane === void 0 && this.createGUI(), (u !== void 0 ? u : this.pane).addBinding(r, t, o).on("change", (m) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: m.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: c,
        name: t,
        params: o,
        parent: u
      }
    }), this.appCallbacks++);
  }
  triggerBind(r, t) {
    const o = this.bindCBs.get(r);
    o !== void 0 ? o(t) : console.warn(`No callback for: ${r}`, t);
  }
  // Buttons
  button(r, t, o = void 0) {
    const u = this.bindID;
    this.buttonCBs.set(u, t), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addButton({ title: r }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: u
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: u,
        name: r,
        callback: t,
        parent: o
      }
    }), this.appCallbacks++);
  }
  triggerButton(r) {
    const t = this.buttonCBs.get(r);
    t !== void 0 && t();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const r = this.inspectorFolder.children.length - 1;
    for (let t = r; t > -1; --t)
      this.inspectorFolder.remove(this.inspectorFolder.children[t]);
  }
}
var Pt = { exports: {} }, Je = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gt;
function Kn() {
  if (Gt)
    return Je;
  Gt = 1;
  var e = nn, n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(s, d, m) {
    var v, f = {}, h = null, g = null;
    m !== void 0 && (h = "" + m), d.key !== void 0 && (h = "" + d.key), d.ref !== void 0 && (g = d.ref);
    for (v in d)
      t.call(d, v) && !u.hasOwnProperty(v) && (f[v] = d[v]);
    if (s && s.defaultProps)
      for (v in d = s.defaultProps, d)
        f[v] === void 0 && (f[v] = d[v]);
    return { $$typeof: n, type: s, key: h, ref: g, props: f, _owner: o.current };
  }
  return Je.Fragment = r, Je.jsx = c, Je.jsxs = c, Je;
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
var Vt;
function Xn() {
  return Vt || (Vt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = nn, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), E = Symbol.iterator, w = "@@iterator";
    function N(a) {
      if (a === null || typeof a != "object")
        return null;
      var p = E && a[E] || a[w];
      return typeof p == "function" ? p : null;
    }
    var U = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(a) {
      {
        for (var p = arguments.length, b = new Array(p > 1 ? p - 1 : 0), x = 1; x < p; x++)
          b[x - 1] = arguments[x];
        K("error", a, b);
      }
    }
    function K(a, p, b) {
      {
        var x = U.ReactDebugCurrentFrame, R = x.getStackAddendum();
        R !== "" && (p += "%s", b = b.concat([R]));
        var _ = b.map(function(T) {
          return String(T);
        });
        _.unshift("Warning: " + p), Function.prototype.apply.call(console[a], console, _);
      }
    }
    var Z = !1, z = !1, O = !1, S = !1, G = !1, me;
    me = Symbol.for("react.module.reference");
    function Me(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === t || a === u || G || a === o || a === m || a === v || S || a === g || Z || z || O || typeof a == "object" && a !== null && (a.$$typeof === h || a.$$typeof === f || a.$$typeof === c || a.$$typeof === s || a.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === me || a.getModuleId !== void 0));
    }
    function ge(a, p, b) {
      var x = a.displayName;
      if (x)
        return x;
      var R = p.displayName || p.name || "";
      return R !== "" ? b + "(" + R + ")" : b;
    }
    function ve(a) {
      return a.displayName || "Context";
    }
    function te(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case t:
          return "Fragment";
        case r:
          return "Portal";
        case u:
          return "Profiler";
        case o:
          return "StrictMode";
        case m:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case s:
            var p = a;
            return ve(p) + ".Consumer";
          case c:
            var b = a;
            return ve(b._context) + ".Provider";
          case d:
            return ge(a, a.render, "ForwardRef");
          case f:
            var x = a.displayName || null;
            return x !== null ? x : te(a.type) || "Memo";
          case h: {
            var R = a, _ = R._payload, T = R._init;
            try {
              return te(T(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var oe = Object.assign, ne = 0, Pe, Ge, je, _e, Ve, rt, Ye;
    function at() {
    }
    at.__reactDisabledLog = !0;
    function bt() {
      {
        if (ne === 0) {
          Pe = console.log, Ge = console.info, je = console.warn, _e = console.error, Ve = console.group, rt = console.groupCollapsed, Ye = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: at,
            writable: !0
          };
          Object.defineProperties(console, {
            info: a,
            log: a,
            warn: a,
            error: a,
            group: a,
            groupCollapsed: a,
            groupEnd: a
          });
        }
        ne++;
      }
    }
    function yt() {
      {
        if (ne--, ne === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: oe({}, a, {
              value: Pe
            }),
            info: oe({}, a, {
              value: Ge
            }),
            warn: oe({}, a, {
              value: je
            }),
            error: oe({}, a, {
              value: _e
            }),
            group: oe({}, a, {
              value: Ve
            }),
            groupCollapsed: oe({}, a, {
              value: rt
            }),
            groupEnd: oe({}, a, {
              value: Ye
            })
          });
        }
        ne < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ze = U.ReactCurrentDispatcher, We;
    function be(a, p, b) {
      {
        if (We === void 0)
          try {
            throw Error();
          } catch (R) {
            var x = R.stack.trim().match(/\n( *(at )?)/);
            We = x && x[1] || "";
          }
        return `
` + We + a;
      }
    }
    var ke = !1, ye;
    {
      var Et = typeof WeakMap == "function" ? WeakMap : Map;
      ye = new Et();
    }
    function it(a, p) {
      if (!a || ke)
        return "";
      {
        var b = ye.get(a);
        if (b !== void 0)
          return b;
      }
      var x;
      ke = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = ze.current, ze.current = null, bt();
      try {
        if (p) {
          var T = function() {
            throw Error();
          };
          if (Object.defineProperty(T.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(T, []);
            } catch (ue) {
              x = ue;
            }
            Reflect.construct(a, [], T);
          } else {
            try {
              T.call();
            } catch (ue) {
              x = ue;
            }
            a.call(T.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ue) {
            x = ue;
          }
          a();
        }
      } catch (ue) {
        if (ue && x && typeof ue.stack == "string") {
          for (var C = ue.stack.split(`
`), W = x.stack.split(`
`), L = C.length - 1, B = W.length - 1; L >= 1 && B >= 0 && C[L] !== W[B]; )
            B--;
          for (; L >= 1 && B >= 0; L--, B--)
            if (C[L] !== W[B]) {
              if (L !== 1 || B !== 1)
                do
                  if (L--, B--, B < 0 || C[L] !== W[B]) {
                    var re = `
` + C[L].replace(" at new ", " at ");
                    return a.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", a.displayName)), typeof a == "function" && ye.set(a, re), re;
                  }
                while (L >= 1 && B >= 0);
              break;
            }
        }
      } finally {
        ke = !1, ze.current = _, yt(), Error.prepareStackTrace = R;
      }
      var Ne = a ? a.displayName || a.name : "", Nt = Ne ? be(Ne) : "";
      return typeof a == "function" && ye.set(a, Nt), Nt;
    }
    function ot(a, p, b) {
      return it(a, !1);
    }
    function st(a) {
      var p = a.prototype;
      return !!(p && p.isReactComponent);
    }
    function Ee(a, p, b) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return it(a, st(a));
      if (typeof a == "string")
        return be(a);
      switch (a) {
        case m:
          return be("Suspense");
        case v:
          return be("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case d:
            return ot(a.render);
          case f:
            return Ee(a.type, p, b);
          case h: {
            var x = a, R = x._payload, _ = x._init;
            try {
              return Ee(_(R), p, b);
            } catch {
            }
          }
        }
      return "";
    }
    var De = Object.prototype.hasOwnProperty, ct = {}, He = U.ReactDebugCurrentFrame;
    function fe(a) {
      if (a) {
        var p = a._owner, b = Ee(a.type, a._source, p ? p.type : null);
        He.setExtraStackFrame(b);
      } else
        He.setExtraStackFrame(null);
    }
    function xe(a, p, b, x, R) {
      {
        var _ = Function.call.bind(De);
        for (var T in a)
          if (_(a, T)) {
            var C = void 0;
            try {
              if (typeof a[T] != "function") {
                var W = Error((x || "React class") + ": " + b + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw W.name = "Invariant Violation", W;
              }
              C = a[T](p, T, x, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (L) {
              C = L;
            }
            C && !(C instanceof Error) && (fe(R), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", b, T, typeof C), fe(null)), C instanceof Error && !(C.message in ct) && (ct[C.message] = !0, fe(R), j("Failed %s type: %s", b, C.message), fe(null));
          }
      }
    }
    var xt = Array.isArray;
    function Ke(a) {
      return xt(a);
    }
    function lt(a) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, b = p && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return b;
      }
    }
    function Xe(a) {
      try {
        return ut(a), !1;
      } catch {
        return !0;
      }
    }
    function ut(a) {
      return "" + a;
    }
    function dt(a) {
      if (Xe(a))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lt(a)), ut(a);
    }
    var he = U.ReactCurrentOwner, wt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ft, qe, se;
    se = {};
    function i(a) {
      if (De.call(a, "ref")) {
        var p = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function y(a) {
      if (De.call(a, "key")) {
        var p = Object.getOwnPropertyDescriptor(a, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function M(a, p) {
      if (typeof a.ref == "string" && he.current && p && he.current.stateNode !== p) {
        var b = te(he.current.type);
        se[b] || (j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(he.current.type), a.ref), se[b] = !0);
      }
    }
    function P(a, p) {
      {
        var b = function() {
          ft || (ft = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function V(a, p) {
      {
        var b = function() {
          qe || (qe = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var ce = function(a, p, b, x, R, _, T) {
      var C = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: a,
        key: p,
        ref: b,
        props: T,
        // Record the component responsible for creating this element.
        _owner: _
      };
      return C._store = {}, Object.defineProperty(C._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(C, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.defineProperty(C, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.freeze && (Object.freeze(C.props), Object.freeze(C)), C;
    };
    function X(a, p, b, x, R) {
      {
        var _, T = {}, C = null, W = null;
        b !== void 0 && (dt(b), C = "" + b), y(p) && (dt(p.key), C = "" + p.key), i(p) && (W = p.ref, M(p, R));
        for (_ in p)
          De.call(p, _) && !wt.hasOwnProperty(_) && (T[_] = p[_]);
        if (a && a.defaultProps) {
          var L = a.defaultProps;
          for (_ in L)
            T[_] === void 0 && (T[_] = L[_]);
        }
        if (C || W) {
          var B = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          C && P(T, B), W && V(T, B);
        }
        return ce(a, C, W, R, x, he.current, T);
      }
    }
    var ht = U.ReactCurrentOwner, pt = U.ReactDebugCurrentFrame;
    function le(a) {
      if (a) {
        var p = a._owner, b = Ee(a.type, a._source, p ? p.type : null);
        pt.setExtraStackFrame(b);
      } else
        pt.setExtraStackFrame(null);
    }
    var J;
    J = !1;
    function Q(a) {
      return typeof a == "object" && a !== null && a.$$typeof === n;
    }
    function Ae() {
      {
        if (ht.current) {
          var a = te(ht.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function we(a) {
      {
        if (a !== void 0) {
          var p = a.fileName.replace(/^.*[\\\/]/, ""), b = a.lineNumber;
          return `

Check your code at ` + p + ":" + b + ".";
        }
        return "";
      }
    }
    var pe = {};
    function Ie(a) {
      {
        var p = Ae();
        if (!p) {
          var b = typeof a == "string" ? a : a.displayName || a.name;
          b && (p = `

Check the top-level render call using <` + b + ">.");
        }
        return p;
      }
    }
    function Dt(a, p) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var b = Ie(p);
        if (pe[b])
          return;
        pe[b] = !0;
        var x = "";
        a && a._owner && a._owner !== ht.current && (x = " It was passed a child from " + te(a._owner.type) + "."), le(a), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, x), le(null);
      }
    }
    function At(a, p) {
      {
        if (typeof a != "object")
          return;
        if (Ke(a))
          for (var b = 0; b < a.length; b++) {
            var x = a[b];
            Q(x) && Dt(x, p);
          }
        else if (Q(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var R = N(a);
          if (typeof R == "function" && R !== a.entries)
            for (var _ = R.call(a), T; !(T = _.next()).done; )
              Q(T.value) && Dt(T.value, p);
        }
      }
    }
    function fn(a) {
      {
        var p = a.type;
        if (p == null || typeof p == "string")
          return;
        var b;
        if (typeof p == "function")
          b = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === f))
          b = p.propTypes;
        else
          return;
        if (b) {
          var x = te(p);
          xe(b, a.props, "prop", x, a);
        } else if (p.PropTypes !== void 0 && !J) {
          J = !0;
          var R = te(p);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function hn(a) {
      {
        for (var p = Object.keys(a.props), b = 0; b < p.length; b++) {
          var x = p[b];
          if (x !== "children" && x !== "key") {
            le(a), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), le(null);
            break;
          }
        }
        a.ref !== null && (le(a), j("Invalid attribute `ref` supplied to `React.Fragment`."), le(null));
      }
    }
    function It(a, p, b, x, R, _) {
      {
        var T = Me(a);
        if (!T) {
          var C = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var W = we(R);
          W ? C += W : C += Ae();
          var L;
          a === null ? L = "null" : Ke(a) ? L = "array" : a !== void 0 && a.$$typeof === n ? (L = "<" + (te(a.type) || "Unknown") + " />", C = " Did you accidentally export a JSX literal instead of a component?") : L = typeof a, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", L, C);
        }
        var B = X(a, p, b, R, _);
        if (B == null)
          return B;
        if (T) {
          var re = p.children;
          if (re !== void 0)
            if (x)
              if (Ke(re)) {
                for (var Ne = 0; Ne < re.length; Ne++)
                  At(re[Ne], a);
                Object.freeze && Object.freeze(re);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              At(re, a);
        }
        return a === t ? hn(B) : fn(B), B;
      }
    }
    function pn(a, p, b) {
      return It(a, p, b, !0);
    }
    function mn(a, p, b) {
      return It(a, p, b, !1);
    }
    var gn = mn, vn = pn;
    Qe.Fragment = t, Qe.jsx = gn, Qe.jsxs = vn;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? Pt.exports = Kn() : Pt.exports = Xn();
var l = Pt.exports;
function ln(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ l.jsx("button", { children: e.title });
}
const qn = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Zn = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Jn(e) {
  return /* @__PURE__ */ l.jsx(rn.Item, { value: e.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Zn,
    /* @__PURE__ */ l.jsx("span", { children: e.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: qn })
  ] }) }, e.title);
}
function Qn(e) {
  const [n, r] = ie(!1), [t, o] = ie(e.options), u = (m) => {
    e.onDragComplete(m), o(m);
  }, c = (m) => {
    const v = [...t];
    v.splice(m, 1), u(v);
  }, s = [];
  t.forEach((m, v) => {
    s.push(/* @__PURE__ */ l.jsx(Jn, { index: v, title: m, onDelete: c }, m));
  });
  let d = "dropdown draggable";
  return e.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => r(!0), onMouseLeave: () => r(!1), children: [
    /* @__PURE__ */ l.jsx(ln, { title: e.title }),
    /* @__PURE__ */ l.jsx(rn.Group, { axis: "y", values: t, onReorder: u, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function er(e) {
  const [n, r] = ie(!1), t = [];
  e.options.map((u, c) => {
    e.onSelect !== void 0 && (u.onSelect = e.onSelect), t.push(/* @__PURE__ */ l.jsx(tr, { option: u }, c));
  });
  let o = "dropdown";
  return e.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => r(!0),
      onMouseLeave: () => r(!1),
      children: [
        /* @__PURE__ */ l.jsx(ln, { title: e.title }),
        /* @__PURE__ */ l.jsx(
          "ul",
          {
            style: { visibility: n ? "visible" : "hidden" },
            children: t
          }
        )
      ]
    }
  );
}
function tr(e) {
  const { option: n } = e, [r, t] = ie("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        Qn,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (u) => {
            n.onDragComplete !== void 0 && n.onDragComplete(u);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      o = /* @__PURE__ */ l.jsx(
        er,
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
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (r !== n.title ? t(n.title) : t(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ l.jsx("li", { className: r === n.title ? "selected" : "", children: o }, Bn());
}
function zr(e) {
  let n;
  function r(c) {
    var d, m, v, f, h, g, E, w, N;
    let s;
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
        (d = e.components.get("debug")) == null || d.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (m = e.components.get("debug")) == null || m.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (v = e.components.get("debug")) == null || v.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (f = e.components.get("debug")) == null || f.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (h = e.components.get("debug")) == null || h.triggerButton(c.data.id);
        break;
      case "setSheet":
        s = (g = e.components.get("theatre")) == null ? void 0 : g.sheets.get(c.data.sheet), s !== void 0 && (n = s, Ze.setSelection([s]));
        break;
      case "setSheetObject":
        s = (E = e.components.get("theatre")) == null ? void 0 : E.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), s !== void 0 && Ze.setSelection([s]);
        break;
      case "updateSheetObject":
        s = (w = e.components.get("theatre")) == null ? void 0 : w.sheetObjectCBs.get(c.data.sheetObject), s !== void 0 && s(c.data.values);
        break;
      case "updateTimeline":
        n = (N = e.components.get("theatre")) == null ? void 0 : N.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
        break;
      case "getScene":
        k.dispatchEvent({ type: D.GET_SCENE });
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
  function t(c) {
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
    }
  }
  function o() {
    Ze.ui.hide();
  }
  function u() {
    Ze.ui.restore(), Ze.onSelectionChange((m) => {
      m.length < 1 || m.forEach((v) => {
        var E;
        let f = v.address.sheetId, h = "setSheet", g = {};
        switch (v.type) {
          case "Theatre_Sheet_PublicAPI":
            h = "setSheet", g = {
              sheet: v.address.sheetId
            }, n = (E = e.components.get("theatre")) == null ? void 0 : E.sheets.get(v.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            h = "setSheetObject", f += `_${v.address.objectKey}`, g = {
              id: f,
              sheet: v.address.sheetId,
              key: v.address.objectKey
            };
            break;
        }
        e.send({ event: h, target: "app", data: g });
      });
    });
    let c = 0;
    const s = () => {
      if (n !== void 0 && c !== n.sequence.position) {
        c = n.sequence.position;
        const m = n;
        e.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: c,
            sheet: m.address.sheetId
          }
        });
      }
    }, d = () => {
      s(), requestAnimationFrame(d);
    };
    s(), d();
  }
  e.listen((c) => {
    e.editor ? t(c) : r(c);
  }), e.editor ? u() : o();
}
const nr = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, rr = `out vec4 fragColor;
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
class ar extends Qt {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: wn,
      side: Cn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new kt(16777215)
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
      vertexShader: nr,
      fragmentShader: rr,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ir extends Sn {
  constructor() {
    const r = new ar();
    super(new Tn(2, 2), r);
    F(this, "gridMaterial");
    this.gridMaterial = r, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const or = `#include <common>
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
}`, sr = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class cr extends Qt {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: or,
      fragmentShader: sr
    });
  }
}
function jt(e) {
  const [n, r] = ie(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const o = !n;
          e.onToggle !== void 0 && e.onToggle(o), r(o);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: e.label })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: e.children }) })
  ] });
}
function un(e) {
  const [n, r] = ie(!1), t = e.child.children.length > 0, o = [];
  return e.child.children.length > 0 && e.child.children.map((u) => {
    o.push(/* @__PURE__ */ l.jsx(un, { child: u, three: e.three }, Math.random()));
  }), /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "child", children: [
      t ? /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            r(!n);
          }
        }
      ) : null,
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "name",
          style: {
            left: t ? "20px" : "5px"
          },
          onClick: () => {
            e.three.getObject(e.child.uuid);
          },
          children: e.child.name.length > 0 ? `${e.child.name} (${e.child.type})` : `${e.child.type}::${e.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Yn(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random());
}
function lr(e) {
  const n = [];
  return e.child.children.map((r) => {
    n.push(/* @__PURE__ */ l.jsx(un, { child: r, three: e.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const ur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function dr(e) {
  return "items" in e;
}
function $e(e) {
  function n(t, o) {
    console.log("onChange:", t, o);
  }
  const r = [];
  return e.items.forEach((t) => {
    dr(t) ? r.push(
      /* @__PURE__ */ l.jsx($e, { title: t.title, items: t.items }, Math.random())
    ) : r.push(
      /* @__PURE__ */ l.jsx(
        et,
        {
          title: t.title,
          prop: t.prop,
          value: t.value,
          type: t.type,
          min: t.min,
          max: t.max,
          step: t.step,
          disabled: t.disabled,
          onChange: (o, u) => {
            t.onChange !== void 0 ? t.onChange(o, u) : n(o, u);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(jt, { label: e.title, open: !1, children: r });
}
function fr(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "side" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 5) === "blend" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function Ce(e) {
  switch (e) {
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
  return e;
}
function hr(e) {
  return e.toLowerCase().search("intensity") > -1 || e === "anisotropyRotation" || e === "bumpScale" || e === "clearcoatRoughness" || e === "displacementBias" || e === "displacementScale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionRatio" || e === "roughness" || e === "sheenRoughness" || e === "thickness";
}
function pr() {
  const e = document.createElement("input");
  return e.type = "file", new Promise((n, r) => {
    e.addEventListener("change", function() {
      if (e.files === null)
        r();
      else {
        const t = e.files[0], o = new FileReader();
        o.onload = function(u) {
          n(u.target.result);
        }, o.readAsDataURL(t);
      }
    }), e.click();
  });
}
function Yt(e, n, r) {
  const t = [];
  for (const o in e) {
    if (!fr(o))
      continue;
    const u = typeof e[o], c = e[o];
    if (u === "boolean" || u === "number" || u === "string") {
      const s = {
        title: Ce(o),
        prop: o,
        type: u,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (d, m) => {
          var f;
          r.updateObject(n.uuid, `material.${d}`, m), u === "boolean" && r.updateObject(n.uuid, "material.needsUpdate", !0);
          const v = (f = r.scene) == null ? void 0 : f.getObjectByProperty("uuid", n.uuid);
          v !== void 0 && H(v, `material.${d}`, m);
        }
      };
      hr(o) && (s.value = Number(c), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01), t.push(s);
    } else if (u === "object")
      if (c.isColor)
        t.push({
          title: Ce(o),
          prop: o,
          type: "color",
          value: c,
          onChange: (s, d) => {
            var f;
            const m = new kt(d);
            r.updateObject(n.uuid, `material.${s}`, m);
            const v = (f = r.scene) == null ? void 0 : f.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && H(v, `material.${s}`, m);
          }
        });
      else if (Array.isArray(c)) {
        const s = [];
        for (const d in c)
          s.push({
            title: `${d}`,
            type: `${typeof c[d]}`,
            value: c[d],
            onChange: (m, v) => {
              var h;
              r.updateObject(n.uuid, `material.${o}`, v);
              const f = (h = r.scene) == null ? void 0 : h.getObjectByProperty("uuid", n.uuid);
              f !== void 0 && H(f, `material.${o}`, v);
            }
          });
        t.push({
          title: Ce(o),
          items: s
        });
      } else {
        const s = [];
        for (const d in c) {
          const m = c[d];
          switch (typeof m) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? t.push({
                title: Ce(o),
                type: "image",
                value: m,
                onChange: (f, h) => {
                  var E;
                  r.createTexture(n.uuid, `material.${o}`, h);
                  const g = (E = r.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && Mt(h).then((w) => {
                    H(g, `material.${o}`, w), H(g, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${Ce(d)}`,
                prop: `material.${o}.${d}`,
                type: `${typeof e[o][d]}`,
                value: c[d],
                onChange: (f, h) => {
                  var E;
                  r.updateObject(n.uuid, `material.${o}.${d}`, h);
                  const g = (E = r.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && H(g, `material.${o}.${d}`, h);
                }
              });
              break;
            case "object":
              m.value !== void 0 && m.value.src !== void 0 ? s.push({
                title: Ce(d),
                type: "image",
                value: m.value.src,
                onChange: (f, h) => {
                  var E;
                  r.createTexture(n.uuid, `material.${o}.${d}.value`, h);
                  const g = (E = r.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && Mt(h).then((w) => {
                    H(g, `material.${o}.${d}.value`, w);
                  });
                }
              }) : s.push({
                title: d,
                type: `${typeof m.value}`,
                value: m.value,
                onChange: (f, h) => {
                  var E;
                  r.updateObject(n.uuid, `material.${o}.${d}.value`, h);
                  const g = (E = r.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && H(g, `material.${o}.${d}.value`, h);
                }
              });
              break;
          }
        }
        s.length > 0 && t.push({
          title: Ce(o),
          items: s
        });
      }
    else
      c !== void 0 && console.log("other:", o, u, c);
  }
  return t.sort((o, u) => o.title < u.title ? -1 : o.title > u.title ? 1 : 0), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      r.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), t;
}
function mr(e, n) {
  const r = e.material;
  if (Array.isArray(r)) {
    const t = [], o = r.length;
    for (let u = 0; u < o; u++)
      t.push(
        /* @__PURE__ */ l.jsx(
          $e,
          {
            title: `Material ${u}`,
            items: Yt(r[u], e, n)
          }
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
  } else
    return /* @__PURE__ */ l.jsx(
      $e,
      {
        title: "Material",
        items: Yt(r, e, n)
      }
    );
}
function et(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Gn(e.value));
  const [r, t] = ie(n), o = Oe(null), u = Oe(null), c = Oe(null);
  nt(() => {
    var K;
    let v = !1, f = -1, h = 0, g = Number(r);
    const E = (Z) => {
      v = !0, h = g, f = Z.clientX;
    }, w = (Z) => {
      if (!v)
        return;
      const z = e.step !== void 0 ? e.step : 1, O = (Z.clientX - f) * z;
      g = Number((h + O).toFixed(4)), u.current !== null && (u.current.value = g.toString()), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, g);
    }, N = () => {
      v = !1;
    }, U = () => {
      v = !1;
    }, j = e.type === "number";
    return j && ((K = o.current) == null || K.addEventListener("mousedown", E, !1), document.addEventListener("mouseup", N, !1), document.addEventListener("mousemove", w, !1), document.addEventListener("contextmenu", U, !1)), () => {
      var Z;
      j && ((Z = o.current) == null || Z.removeEventListener("mousedown", E), document.removeEventListener("mouseup", N), document.removeEventListener("mousemove", w), document.removeEventListener("contextmenu", U));
    };
  }, [r]);
  const s = e.type === "string" && (r.length > 100 || r.search(`
`) > -1), d = s || e.type === "image", m = (v) => {
    let f = v.target.value;
    e.type === "boolean" && (f = v.target.checked), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: e.title }, "fieldLabel"),
    e.type === "string" && !s && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: m,
        value: r
      }
    ),
    e.type === "string" && s && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: m,
        value: r
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: m,
        checked: r
      }
    ),
    e.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: u,
        type: "number",
        value: r,
        min: e.min,
        max: e.max,
        step: e.step,
        onChange: m
      }
    ),
    e.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: r.toString(), onChange: m, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: r,
          min: e.min,
          max: e.max,
          step: e.step,
          onChange: m
        }
      )
    ] }),
    e.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: r.toString(), onChange: m, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: r, onChange: m })
    ] }),
    e.type === "button" && /* @__PURE__ */ l.jsx(
      "button",
      {
        onClick: () => {
          e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, !0);
        },
        children: e.title
      }
    ),
    e.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: c, onClick: () => {
      pr().then((v) => {
        c.current.src = v, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, v);
      });
    }, src: r.length > 0 ? r : ur })
  ] });
}
function zt(e) {
  switch (e) {
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
  return e;
}
function gr(e, n) {
  const r = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      r.push({
        title: zt(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (o, u) => {
          var s;
          n.updateObject(e.uuid, o, u), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && (H(c, o, u), c.updateProjectionMatrix());
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      r.push({
        title: zt(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (o, u) => {
          var s;
          n.updateObject(e.uuid, o, u), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && (H(c, o, u), c.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    $e,
    {
      title: "Camera",
      items: r
    }
  );
}
const vr = Math.PI / 180, br = 180 / Math.PI;
function yr(e) {
  return e * vr;
}
function St(e) {
  return e * br;
}
function Er(e, n) {
  const r = new On();
  r.elements = e.matrix;
  const t = new I(), o = new Rn(), u = new I();
  e.uuid.length > 0 && (t.setFromMatrixPosition(r), o.setFromRotationMatrix(r), u.setFromMatrixScale(r));
  const c = (d, m) => {
    var f;
    n.updateObject(e.uuid, d, m);
    const v = (f = n.scene) == null ? void 0 : f.getObjectByProperty("uuid", e.uuid);
    v !== void 0 && H(v, d, m);
  }, s = (d, m) => {
    c(d, yr(m));
  };
  return /* @__PURE__ */ l.jsx(
    $e,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: t.x,
          onChange: c
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: t.y,
          onChange: c
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: t.z,
          onChange: c
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: Ct(St(o.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: s
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Ct(St(o.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: s
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Ct(St(o.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: s
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: u.x,
          step: 0.01,
          onChange: c
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: u.y,
          step: 0.01,
          onChange: c
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: u.z,
          step: 0.01,
          onChange: c
        }
      ]
    }
  );
}
function Wt(e) {
  switch (e) {
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
  return e;
}
function xr(e, n) {
  const r = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const o = e.lightInfo[t];
      o !== void 0 && (o.isColor !== void 0 ? r.push({
        title: Wt(t),
        prop: t,
        type: "color",
        value: o,
        onChange: (u, c) => {
          var m;
          const s = new kt(c);
          n.updateObject(e.uuid, u, s);
          const d = (m = n.scene) == null ? void 0 : m.getObjectByProperty("uuid", e.uuid);
          d !== void 0 && H(d, u, s);
        }
      }) : r.push({
        title: Wt(t),
        prop: t,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (u, c) => {
          var d;
          n.updateObject(e.uuid, u, c);
          const s = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", e.uuid);
          s !== void 0 && H(s, u, c);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    $e,
    {
      title: "Light",
      items: r
    }
  );
}
function wr(e) {
  const [n, r] = ie(-1), [t, o] = ie({
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
  nt(() => {
    function c(s) {
      const d = s.value;
      o(d), r(Date.now());
    }
    return k.addEventListener(D.SET_OBJECT, c), () => {
      k.removeEventListener(D.SET_OBJECT, c);
    };
  }, []);
  const u = t.type.toLowerCase();
  return /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: t.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: t.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: t.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: t.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        et,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: t.visible,
          onChange: (c, s) => {
            var m;
            e.three.updateObject(t.uuid, c, s);
            const d = (m = e.three.scene) == null ? void 0 : m.getObjectByProperty("uuid", t.uuid);
            d !== void 0 && H(d, c, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Er(t, e.three),
      u.search("camera") > -1 ? gr(t, e.three) : null,
      u.search("light") > -1 ? xr(t, e.three) : null,
      u.search("mesh") > -1 ? mr(t, e.three) : null
    ] })
  ] }) }, n);
}
class Wr extends Fn {
  constructor(r) {
    super(r);
    F(this, "three");
    // Private
    F(this, "onRefresh", () => {
      this.three.getScene();
    });
    F(this, "setScene", (r) => {
      this.setState(() => ({
        scene: r.value
      }));
    });
    this.state = {
      scene: r.scene !== void 0 ? r.scene : null
    }, this.three = r.three, k.addEventListener(D.SET_SCENE, this.setScene);
  }
  componentDidMount() {
    this.onRefresh();
  }
  componentWillUnmount() {
    k.removeEventListener(D.SET_SCENE, this.setScene);
  }
  render() {
    var o;
    const r = this.componentState.scene !== null, t = "Hierarchy" + (r ? `: ${(o = this.componentState.scene) == null ? void 0 : o.name}` : "");
    return /* @__PURE__ */ l.jsx("div", { id: "SceneHierarchy", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      r && /* @__PURE__ */ l.jsx(
        jt,
        {
          label: t,
          button: /* @__PURE__ */ l.jsx("button", { className: "icon refresh hideText", onClick: this.onRefresh, children: "Refresh" }),
          open: !0,
          children: /* @__PURE__ */ l.jsx(lr, { child: this.componentState.scene, three: this.three })
        }
      ),
      /* @__PURE__ */ l.jsx(jt, { label: "Inspector", children: /* @__PURE__ */ l.jsx(wr, { three: this.three }, "Inspector") })
    ] }) }, "SceneHierarchy");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Hr(e) {
  const n = (c) => {
    var d;
    const s = (d = e.three.scene) == null ? void 0 : d.getObjectByProperty("uuid", c.value);
    s !== void 0 && e.three.setObject(s);
  }, r = (c, s, d) => {
    var v;
    const m = (v = e.three.scene) == null ? void 0 : v.getObjectByProperty("uuid", c);
    m !== void 0 && H(m, s, d);
  }, t = (c) => {
    const s = c.value, { key: d, value: m, uuid: v } = s;
    r(v, d, m);
  }, o = (c) => {
    const s = c.value;
    Mt(s.value).then((d) => {
      r(s.uuid, s.key, d), r(s.uuid, "material.needsUpdate", !0);
    });
  }, u = (c) => {
    var f;
    const { key: s, uuid: d, value: m } = c.value, v = (f = e.three.scene) == null ? void 0 : f.getObjectByProperty("uuid", d);
    if (v !== void 0)
      try {
        v[s](m);
      } catch (h) {
        console.log("Error requesting method:"), console.log(h), console.log(s), console.log(m);
      }
  };
  return nt(() => (k.addEventListener(D.GET_OBJECT, n), k.addEventListener(D.UPDATE_OBJECT, t), k.addEventListener(D.CREATE_TEXTURE, o), k.addEventListener(D.REQUEST_METHOD, u), () => {
    k.removeEventListener(D.GET_OBJECT, n), k.removeEventListener(D.UPDATE_OBJECT, t), k.removeEventListener(D.CREATE_TEXTURE, o), k.removeEventListener(D.REQUEST_METHOD, u);
  }), []), null;
}
const Ht = { type: "change" }, Tt = { type: "start" }, Kt = { type: "end" }, mt = new Mn(), Xt = new Pn(), Cr = Math.cos(70 * jn.DEG2RAD);
class Sr extends Zt {
  constructor(n, r) {
    super(), this.object = n, this.domElement = r, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new I(), this.cursor = new I(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Le.ROTATE, MIDDLE: Le.DOLLY, RIGHT: Le.PAN }, this.touches = { ONE: Fe.ROTATE, TWO: Fe.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(i) {
      i.addEventListener("keydown", Xe), this._domElementKeyEvents = i;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Xe), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(Ht), t.update(), u = o.NONE;
    }, this.update = function() {
      const i = new I(), y = new Ft().setFromUnitVectors(n.up, new I(0, 1, 0)), M = y.clone().invert(), P = new I(), V = new Ft(), ce = new I(), X = 2 * Math.PI;
      return function(pt = null) {
        const le = t.object.position;
        i.copy(le).sub(t.target), i.applyQuaternion(y), s.setFromVector3(i), t.autoRotate && u === o.NONE && ge(me(pt)), t.enableDamping ? (s.theta += d.theta * t.dampingFactor, s.phi += d.phi * t.dampingFactor) : (s.theta += d.theta, s.phi += d.phi);
        let J = t.minAzimuthAngle, Q = t.maxAzimuthAngle;
        isFinite(J) && isFinite(Q) && (J < -Math.PI ? J += X : J > Math.PI && (J -= X), Q < -Math.PI ? Q += X : Q > Math.PI && (Q -= X), J <= Q ? s.theta = Math.max(J, Math.min(Q, s.theta)) : s.theta = s.theta > (J + Q) / 2 ? Math.max(J, s.theta) : Math.min(Q, s.theta)), s.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, s.phi)), s.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(v, t.dampingFactor) : t.target.add(v), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor), t.zoomToCursor && O || t.object.isOrthographicCamera ? s.radius = _e(s.radius) : s.radius = _e(s.radius * m), i.setFromSpherical(s), i.applyQuaternion(M), le.copy(t.target).add(i), t.object.lookAt(t.target), t.enableDamping === !0 ? (d.theta *= 1 - t.dampingFactor, d.phi *= 1 - t.dampingFactor, v.multiplyScalar(1 - t.dampingFactor)) : (d.set(0, 0, 0), v.set(0, 0, 0));
        let Ae = !1;
        if (t.zoomToCursor && O) {
          let we = null;
          if (t.object.isPerspectiveCamera) {
            const pe = i.length();
            we = _e(pe * m);
            const Ie = pe - we;
            t.object.position.addScaledVector(Z, Ie), t.object.updateMatrixWorld();
          } else if (t.object.isOrthographicCamera) {
            const pe = new I(z.x, z.y, 0);
            pe.unproject(t.object), t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / m)), t.object.updateProjectionMatrix(), Ae = !0;
            const Ie = new I(z.x, z.y, 0);
            Ie.unproject(t.object), t.object.position.sub(Ie).add(pe), t.object.updateMatrixWorld(), we = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          we !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(we).add(t.object.position) : (mt.origin.copy(t.object.position), mt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(mt.direction)) < Cr ? n.lookAt(t.target) : (Xt.setFromNormalAndCoplanarPoint(t.object.up, t.target), mt.intersectPlane(Xt, t.target))));
        } else
          t.object.isOrthographicCamera && (t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / m)), t.object.updateProjectionMatrix(), Ae = !0);
        return m = 1, O = !1, Ae || P.distanceToSquared(t.object.position) > c || 8 * (1 - V.dot(t.object.quaternion)) > c || ce.distanceToSquared(t.target) > 0 ? (t.dispatchEvent(Ht), P.copy(t.object.position), V.copy(t.object.quaternion), ce.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", he), t.domElement.removeEventListener("pointerdown", He), t.domElement.removeEventListener("pointercancel", xe), t.domElement.removeEventListener("wheel", lt), t.domElement.removeEventListener("pointermove", fe), t.domElement.removeEventListener("pointerup", xe), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", Xe), t._domElementKeyEvents = null);
    };
    const t = this, o = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let u = o.NONE;
    const c = 1e-6, s = new Ut(), d = new Ut();
    let m = 1;
    const v = new I(), f = new ae(), h = new ae(), g = new ae(), E = new ae(), w = new ae(), N = new ae(), U = new ae(), j = new ae(), K = new ae(), Z = new I(), z = new ae();
    let O = !1;
    const S = [], G = {};
    function me(i) {
      return i !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function Me(i) {
      const y = Math.abs(i) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, t.zoomSpeed * y);
    }
    function ge(i) {
      d.theta -= i;
    }
    function ve(i) {
      d.phi -= i;
    }
    const te = function() {
      const i = new I();
      return function(M, P) {
        i.setFromMatrixColumn(P, 0), i.multiplyScalar(-M), v.add(i);
      };
    }(), oe = function() {
      const i = new I();
      return function(M, P) {
        t.screenSpacePanning === !0 ? i.setFromMatrixColumn(P, 1) : (i.setFromMatrixColumn(P, 0), i.crossVectors(t.object.up, i)), i.multiplyScalar(M), v.add(i);
      };
    }(), ne = function() {
      const i = new I();
      return function(M, P) {
        const V = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const ce = t.object.position;
          i.copy(ce).sub(t.target);
          let X = i.length();
          X *= Math.tan(t.object.fov / 2 * Math.PI / 180), te(2 * M * X / V.clientHeight, t.object.matrix), oe(2 * P * X / V.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (te(M * (t.object.right - t.object.left) / t.object.zoom / V.clientWidth, t.object.matrix), oe(P * (t.object.top - t.object.bottom) / t.object.zoom / V.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Pe(i) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? m /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ge(i) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? m *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function je(i, y) {
      if (!t.zoomToCursor)
        return;
      O = !0;
      const M = t.domElement.getBoundingClientRect(), P = i - M.left, V = y - M.top, ce = M.width, X = M.height;
      z.x = P / ce * 2 - 1, z.y = -(V / X) * 2 + 1, Z.set(z.x, z.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function _e(i) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, i));
    }
    function Ve(i) {
      f.set(i.clientX, i.clientY);
    }
    function rt(i) {
      je(i.clientX, i.clientX), U.set(i.clientX, i.clientY);
    }
    function Ye(i) {
      E.set(i.clientX, i.clientY);
    }
    function at(i) {
      h.set(i.clientX, i.clientY), g.subVectors(h, f).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      ge(2 * Math.PI * g.x / y.clientHeight), ve(2 * Math.PI * g.y / y.clientHeight), f.copy(h), t.update();
    }
    function bt(i) {
      j.set(i.clientX, i.clientY), K.subVectors(j, U), K.y > 0 ? Pe(Me(K.y)) : K.y < 0 && Ge(Me(K.y)), U.copy(j), t.update();
    }
    function yt(i) {
      w.set(i.clientX, i.clientY), N.subVectors(w, E).multiplyScalar(t.panSpeed), ne(N.x, N.y), E.copy(w), t.update();
    }
    function ze(i) {
      je(i.clientX, i.clientY), i.deltaY < 0 ? Ge(Me(i.deltaY)) : i.deltaY > 0 && Pe(Me(i.deltaY)), t.update();
    }
    function We(i) {
      let y = !1;
      switch (i.code) {
        case t.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? ve(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ne(0, t.keyPanSpeed), y = !0;
          break;
        case t.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? ve(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ne(0, -t.keyPanSpeed), y = !0;
          break;
        case t.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? ge(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ne(t.keyPanSpeed, 0), y = !0;
          break;
        case t.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? ge(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ne(-t.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (i.preventDefault(), t.update());
    }
    function be(i) {
      if (S.length === 1)
        f.set(i.pageX, i.pageY);
      else {
        const y = se(i), M = 0.5 * (i.pageX + y.x), P = 0.5 * (i.pageY + y.y);
        f.set(M, P);
      }
    }
    function ke(i) {
      if (S.length === 1)
        E.set(i.pageX, i.pageY);
      else {
        const y = se(i), M = 0.5 * (i.pageX + y.x), P = 0.5 * (i.pageY + y.y);
        E.set(M, P);
      }
    }
    function ye(i) {
      const y = se(i), M = i.pageX - y.x, P = i.pageY - y.y, V = Math.sqrt(M * M + P * P);
      U.set(0, V);
    }
    function Et(i) {
      t.enableZoom && ye(i), t.enablePan && ke(i);
    }
    function it(i) {
      t.enableZoom && ye(i), t.enableRotate && be(i);
    }
    function ot(i) {
      if (S.length == 1)
        h.set(i.pageX, i.pageY);
      else {
        const M = se(i), P = 0.5 * (i.pageX + M.x), V = 0.5 * (i.pageY + M.y);
        h.set(P, V);
      }
      g.subVectors(h, f).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      ge(2 * Math.PI * g.x / y.clientHeight), ve(2 * Math.PI * g.y / y.clientHeight), f.copy(h);
    }
    function st(i) {
      if (S.length === 1)
        w.set(i.pageX, i.pageY);
      else {
        const y = se(i), M = 0.5 * (i.pageX + y.x), P = 0.5 * (i.pageY + y.y);
        w.set(M, P);
      }
      N.subVectors(w, E).multiplyScalar(t.panSpeed), ne(N.x, N.y), E.copy(w);
    }
    function Ee(i) {
      const y = se(i), M = i.pageX - y.x, P = i.pageY - y.y, V = Math.sqrt(M * M + P * P);
      j.set(0, V), K.set(0, Math.pow(j.y / U.y, t.zoomSpeed)), Pe(K.y), U.copy(j);
      const ce = (i.pageX + y.x) * 0.5, X = (i.pageY + y.y) * 0.5;
      je(ce, X);
    }
    function De(i) {
      t.enableZoom && Ee(i), t.enablePan && st(i);
    }
    function ct(i) {
      t.enableZoom && Ee(i), t.enableRotate && ot(i);
    }
    function He(i) {
      t.enabled !== !1 && (S.length === 0 && (t.domElement.setPointerCapture(i.pointerId), t.domElement.addEventListener("pointermove", fe), t.domElement.addEventListener("pointerup", xe)), wt(i), i.pointerType === "touch" ? ut(i) : xt(i));
    }
    function fe(i) {
      t.enabled !== !1 && (i.pointerType === "touch" ? dt(i) : Ke(i));
    }
    function xe(i) {
      ft(i), S.length === 0 && (t.domElement.releasePointerCapture(i.pointerId), t.domElement.removeEventListener("pointermove", fe), t.domElement.removeEventListener("pointerup", xe)), t.dispatchEvent(Kt), u = o.NONE;
    }
    function xt(i) {
      let y;
      switch (i.button) {
        case 0:
          y = t.mouseButtons.LEFT;
          break;
        case 1:
          y = t.mouseButtons.MIDDLE;
          break;
        case 2:
          y = t.mouseButtons.RIGHT;
          break;
        default:
          y = -1;
      }
      switch (y) {
        case Le.DOLLY:
          if (t.enableZoom === !1)
            return;
          rt(i), u = o.DOLLY;
          break;
        case Le.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (t.enablePan === !1)
              return;
            Ye(i), u = o.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            Ve(i), u = o.ROTATE;
          }
          break;
        case Le.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (t.enableRotate === !1)
              return;
            Ve(i), u = o.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Ye(i), u = o.PAN;
          }
          break;
        default:
          u = o.NONE;
      }
      u !== o.NONE && t.dispatchEvent(Tt);
    }
    function Ke(i) {
      switch (u) {
        case o.ROTATE:
          if (t.enableRotate === !1)
            return;
          at(i);
          break;
        case o.DOLLY:
          if (t.enableZoom === !1)
            return;
          bt(i);
          break;
        case o.PAN:
          if (t.enablePan === !1)
            return;
          yt(i);
          break;
      }
    }
    function lt(i) {
      t.enabled === !1 || t.enableZoom === !1 || u !== o.NONE || (i.preventDefault(), t.dispatchEvent(Tt), ze(i), t.dispatchEvent(Kt));
    }
    function Xe(i) {
      t.enabled === !1 || t.enablePan === !1 || We(i);
    }
    function ut(i) {
      switch (qe(i), S.length) {
        case 1:
          switch (t.touches.ONE) {
            case Fe.ROTATE:
              if (t.enableRotate === !1)
                return;
              be(i), u = o.TOUCH_ROTATE;
              break;
            case Fe.PAN:
              if (t.enablePan === !1)
                return;
              ke(i), u = o.TOUCH_PAN;
              break;
            default:
              u = o.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case Fe.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              Et(i), u = o.TOUCH_DOLLY_PAN;
              break;
            case Fe.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              it(i), u = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              u = o.NONE;
          }
          break;
        default:
          u = o.NONE;
      }
      u !== o.NONE && t.dispatchEvent(Tt);
    }
    function dt(i) {
      switch (qe(i), u) {
        case o.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          ot(i), t.update();
          break;
        case o.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          st(i), t.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          De(i), t.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          ct(i), t.update();
          break;
        default:
          u = o.NONE;
      }
    }
    function he(i) {
      t.enabled !== !1 && i.preventDefault();
    }
    function wt(i) {
      S.push(i.pointerId);
    }
    function ft(i) {
      delete G[i.pointerId];
      for (let y = 0; y < S.length; y++)
        if (S[y] == i.pointerId) {
          S.splice(y, 1);
          return;
        }
    }
    function qe(i) {
      let y = G[i.pointerId];
      y === void 0 && (y = new ae(), G[i.pointerId] = y), y.set(i.pageX, i.pageY);
    }
    function se(i) {
      const y = i.pointerId === S[0] ? S[1] : S[0];
      return G[y];
    }
    t.domElement.addEventListener("contextmenu", he), t.domElement.addEventListener("pointerdown", He), t.domElement.addEventListener("pointercancel", xe), t.domElement.addEventListener("wheel", lt, { passive: !1 }), this.update();
  }
}
const _t = (e) => {
  const [n, r] = ie(!1), [t, o] = ie(e.options[e.index]), u = () => {
    r(!n);
  }, c = (s) => {
    s !== t && (e.onSelect(s), o(s)), r(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: u, children: t }),
    n && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => c(s), children: s }, s)) })
  ] });
}, Se = Un(function(n, r) {
  const t = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: r, className: "clickable" }),
    /* @__PURE__ */ l.jsx(_t, { index: t, options: n.options, onSelect: n.onSelect, up: !0 })
  ] });
}), qt = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], q = /* @__PURE__ */ new Map(), Y = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Map(), Te = [
  "Top",
  "Bottom",
  "Left",
  "Right",
  "Front",
  "Back",
  "Orthographic",
  "Debug"
];
function Re(e, n) {
  const r = new en(-100, 100, 100, -100, 50, 3e3);
  return r.name = e, r.position.copy(n), r.lookAt(0, 0, 0), q.set(e, r), r;
}
Re("Top", new I(0, 1e3, 0));
Re("Bottom", new I(0, -1e3, 0));
Re("Left", new I(-1e3, 0, 0));
Re("Right", new I(1e3, 0, 0));
Re("Front", new I(0, 0, 1e3));
Re("Back", new I(0, 0, -1e3));
Re("Orthographic", new I(1e3, 1e3, 1e3));
const vt = new Rt(60, 1, 50, 3e3);
vt.name = "Debug";
vt.position.set(500, 500, 500);
vt.lookAt(0, 0, 0);
q.set("Debug", vt);
const Tr = [
  "Default",
  "Normals",
  "UVs",
  "Wireframe"
], Or = new _n(), Rr = new kn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
}), Mr = new cr();
let Ot = "Default";
const A = new tn();
A.name = "Debug Scene";
let tt = new tn();
A.add(tt);
const Pr = new ir();
A.add(Pr);
const dn = new Dn(500);
dn.name = "axisHelper";
A.add(dn);
let $ = q.get("Debug"), ee = q.get("Orthographic"), Ue = q.get("Front"), Be = q.get("Top");
function Kr(e) {
  const [n, r] = ie(e.mode !== void 0 ? e.mode : "Quad"), t = Oe(null), o = Oe(null), u = Oe(null), c = Oe(null), s = (f, h) => {
    const g = Y.get(f.name);
    g !== void 0 && g.dispose(), Y.delete(f.name);
    const E = de.get(f.name);
    E !== void 0 && (A.remove(E), E.dispose()), de.delete(f.name);
    const w = new Sr(f, h);
    switch (f.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        w.enableRotate = !1;
        break;
    }
    if (Y.set(f.name, w), f instanceof Rt) {
      const N = new An(f);
      de.set(f.name, N), A.add(N);
    }
  }, d = (f) => {
    const h = de.get(f.name);
    h !== void 0 && (A.remove(h), h.dispose(), de.delete(f.name));
    const g = Y.get(f.name);
    g !== void 0 && (g.dispose(), Y.delete(f.name));
  }, m = () => {
    Y.forEach((f, h) => {
      f.dispose();
      const g = de.get(h);
      g !== void 0 && (A.remove(g), g.dispose()), de.delete(h), Y.delete(h);
    }), Y.clear(), de.clear();
  }, v = () => {
    switch (n) {
      case "Single":
        s($, t.current);
        break;
      case "Side by Side":
      case "Stacked":
        s($, t.current), s(ee, o.current);
        break;
      case "Quad":
        s($, t.current), s(ee, o.current), s(Ue, u.current), s(Be, c.current);
        break;
    }
  };
  return nt(() => {
    const f = () => {
      on(tt), A.remove(tt), e.three.scene !== void 0 && (tt = e.three.scene, A.add(tt));
    };
    return k.addEventListener(D.SET_SCENE, f), () => {
      k.removeEventListener(D.SET_SCENE, f);
    };
  }, []), nt(() => {
    const f = e.renderer.getSize(new ae());
    let h = f.x, g = f.y, E = Math.floor(h / 2), w = Math.floor(g / 2), N = -1;
    const U = () => {
      h = window.innerWidth - 300, g = window.innerHeight, E = Math.floor(h / 2), w = Math.floor(g / 2);
      let O = h, S = g;
      switch (n) {
        case "Side by Side":
          O = E, S = g;
          break;
        case "Stacked":
          O = h, S = w;
          break;
        case "Quad":
          O = E, S = w;
          break;
      }
      q.forEach((G) => {
        var me;
        G instanceof en ? (G.left = O / -2, G.right = O / 2, G.top = S / 2, G.bottom = S / -2, G.updateProjectionMatrix()) : G instanceof Rt && (G.aspect = O / S, G.updateProjectionMatrix(), (me = de.get(G.name)) == null || me.update());
      });
    }, j = () => {
      e.renderer.setViewport(0, 0, h, g), e.renderer.setScissor(0, 0, h, g), e.renderer.render(A, $);
    }, K = () => {
      if (n === "Side by Side")
        e.renderer.setViewport(0, 0, E, g), e.renderer.setScissor(0, 0, E, g), e.renderer.render(A, $), e.renderer.setViewport(E, 0, E, g), e.renderer.setScissor(E, 0, E, g), e.renderer.render(A, ee);
      else {
        const O = g - w;
        e.renderer.setViewport(0, O, h, w), e.renderer.setScissor(0, O, h, w), e.renderer.render(A, $), e.renderer.setViewport(0, 0, h, w), e.renderer.setScissor(0, 0, h, w), e.renderer.render(A, ee);
      }
    }, Z = () => {
      let O = 0, S = 0;
      S = g - w, O = 0, e.renderer.setViewport(O, S, E, w), e.renderer.setScissor(O, S, E, w), e.renderer.render(A, $), O = E, e.renderer.setViewport(O, S, E, w), e.renderer.setScissor(O, S, E, w), e.renderer.render(A, ee), S = 0, O = 0, e.renderer.setViewport(O, S, E, w), e.renderer.setScissor(O, S, E, w), e.renderer.render(A, Ue), O = E, e.renderer.setViewport(O, S, E, w), e.renderer.setScissor(O, S, E, w), e.renderer.render(A, Be);
    }, z = () => {
      switch (Y.forEach((O) => {
        O.update();
      }), e.renderer.clear(), n) {
        case "Single":
          j();
          break;
        case "Side by Side":
        case "Stacked":
          K();
          break;
        case "Quad":
          Z();
          break;
      }
      N = requestAnimationFrame(z);
    };
    return v(), window.addEventListener("resize", U), U(), z(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(N), N = -1;
    };
  }, [n]), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Se, { camera: $, options: Te, ref: t, onSelect: (f) => {
        var g;
        (g = Y.get($.name)) == null || g.dispose();
        const h = q.get(f);
        h !== void 0 && (d($), $ = h, s(h, t.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Se, { camera: $, options: Te, ref: t, onSelect: (f) => {
          var g;
          (g = Y.get($.name)) == null || g.dispose();
          const h = q.get(f);
          h !== void 0 && (d($), $ = h, s(h, t.current));
        } }),
        /* @__PURE__ */ l.jsx(Se, { camera: ee, options: Te, ref: o, onSelect: (f) => {
          var g;
          (g = Y.get(ee.name)) == null || g.dispose();
          const h = q.get(f);
          h !== void 0 && (d(ee), ee = h, s(h, o.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Se, { camera: $, options: Te, ref: t, onSelect: (f) => {
          var g;
          (g = Y.get($.name)) == null || g.dispose();
          const h = q.get(f);
          h !== void 0 && (d($), $ = h, s(h, t.current));
        } }),
        /* @__PURE__ */ l.jsx(Se, { camera: ee, options: Te, ref: o, onSelect: (f) => {
          var g;
          (g = Y.get(ee.name)) == null || g.dispose();
          const h = q.get(f);
          h !== void 0 && (d(ee), ee = h, s(h, o.current));
        } }),
        /* @__PURE__ */ l.jsx(Se, { camera: Ue, options: Te, ref: u, onSelect: (f) => {
          var g;
          (g = Y.get(Ue.name)) == null || g.dispose();
          const h = q.get(f);
          h !== void 0 && (d(Ue), Ue = h, s(h, u.current));
        } }),
        /* @__PURE__ */ l.jsx(Se, { camera: Be, options: Te, ref: c, onSelect: (f) => {
          var g;
          (g = Y.get(Be.name)) == null || g.dispose();
          const h = q.get(f);
          h !== void 0 && (d(Be), Be = h, s(h, c.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        _t,
        {
          index: qt.indexOf(n),
          options: qt,
          onSelect: (f) => {
            f !== n && (m(), r(f));
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        _t,
        {
          index: 0,
          options: Tr,
          onSelect: (f) => {
            if (f !== Ot)
              switch (Ot = f, Ot) {
                case "Default":
                  A.overrideMaterial = null;
                  break;
                case "Normals":
                  A.overrideMaterial = Or;
                  break;
                case "Wireframe":
                  A.overrideMaterial = Rr;
                  break;
                case "UVs":
                  A.overrideMaterial = Mr;
                  break;
              }
          }
        }
      )
    ] })
  ] });
}
function Xr(e) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: e.header }),
    e.children,
    /* @__PURE__ */ l.jsx("footer", { children: e.footer })
  ] });
}
export {
  jt as Accordion,
  Br as Application,
  gt as BaseRemote,
  un as ChildObject,
  lr as ContainerObject,
  Qn as Draggable,
  Jn as DraggableItem,
  er as Dropdown,
  tr as DropdownItem,
  Xr as Editor,
  ir as InfiniteGridHelper,
  wr as Inspector,
  Kr as MultiView,
  ln as NavButton,
  $r as RemoteComponents,
  zr as RemoteController,
  Gr as RemoteTheatre,
  Vr as RemoteThree,
  Yr as RemoteTweakpane,
  Wr as SceneHierarchy,
  Hr as SceneInspector,
  D as ToolEvents,
  cr as UVMaterial,
  Lr as clamp,
  Gn as colorToHex,
  k as debugDispatcher,
  on as dispose,
  Vn as disposeMaterial,
  Ur as disposeTexture,
  Fr as distance,
  an as hierarchyUUID,
  $n as isColor,
  Bn as randomID,
  Ct as round
};
