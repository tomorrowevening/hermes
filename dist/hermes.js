var fn = Object.defineProperty;
var hn = (t, n, a) => n in t ? fn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var L = (t, n, a) => (hn(t, typeof n != "symbol" ? n + "" : n, a), a);
import { EventDispatcher as Kt, Texture as Xt, CubeTexture as pn, RepeatWrapping as It, ShaderMaterial as qt, GLSL3 as mn, DoubleSide as gn, Color as Pt, Mesh as vn, PlaneGeometry as bn, Matrix4 as yn, Vector3 as I, Euler as En, Ray as xn, Plane as wn, MathUtils as Cn, MOUSE as Le, TOUCH as Fe, Quaternion as At, Spherical as Nt, Vector2 as ae, PerspectiveCamera as St, MeshNormalMaterial as Sn, MeshBasicMaterial as Tn, OrthographicCamera as Zt, Scene as On, AxesHelper as Mn, CameraHelper as Rn } from "three";
import { getProject as Pn } from "@theatre/core";
import { Pane as jn } from "tweakpane";
import * as _n from "@tweakpane/plugin-essentials";
import Jt, { useState as ie, useRef as Oe, useEffect as tt, Component as kn, forwardRef as Dn } from "react";
import { Reorder as Qt } from "framer-motion";
import Ze from "@theatre/studio";
function Or(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Mr(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function In() {
  return Math.round(Math.random() * 1e6).toString();
}
function An(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Nn(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (d) => {
    const m = d.toString(16);
    return m.length === 1 ? "0" + m : m;
  }, u = o(n), c = o(a), s = o(e);
  return "#" + u + c + s;
}
let Lt = 0;
const en = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Lt}`), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, Lt++, t.children.forEach((a) => {
    en(a);
  });
};
class Rr {
  constructor(n, a, e) {
    L(this, "channel");
    L(this, "components", /* @__PURE__ */ new Map());
    // Protected
    L(this, "_mode", "app");
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
const k = new Kt(), D = {
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
class mt {
  constructor(n) {
    L(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class Pr extends mt {
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
const tn = () => {
};
class jr extends mt {
  constructor(a, e, o) {
    super(a);
    L(this, "project");
    L(this, "sheets");
    L(this, "sheetObjects");
    L(this, "sheetObjectCBs");
    L(this, "sheetObjectUnsubscribe");
    this.project = Pn(e, o), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
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
  sheetObject(a, e, o, u) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheets.get(a);
    if (c === void 0)
      return;
    const s = `${a}_${e}`;
    let d = this.sheetObjects.get(s);
    if (d !== void 0)
      return d = c.object(e, { ...o, ...d.value }, { reconfigure: !0 }), d;
    d = c.object(e, o), this.sheetObjects.set(s, d), this.sheetObjectCBs.set(s, u !== void 0 ? u : tn);
    const m = d.onValuesChange((v) => {
      if (this.app.editor) {
        for (const f in v) {
          const h = v[f];
          typeof h == "object" && An(h) && (v[f] = {
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
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = `${a.address.sheetId}_${a.address.objectKey}`, o = this.sheetObjectUnsubscribe.get(e);
    o !== void 0 && o();
  }
}
function Ln(t) {
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
function nn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(nn(a));
  }), n;
}
function Fn(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Un(t) {
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
function Ft(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Un(a))
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
            if (o instanceof Xt) {
              const u = o.source.toJSON();
              n[a] = { src: u.url };
            } else
              o instanceof pn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Fn(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Bn(t) {
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
      e.material.forEach((u) => {
        o.push(Ft(u));
      }), n.material = o;
    } else
      n.material = Ft(e.material);
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
function K(t, n, a) {
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
function Tt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const o = new Xt(e);
      o.wrapS = It, o.wrapT = It, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class _r extends mt {
  constructor() {
    super(...arguments);
    L(this, "scene");
  }
  getObject(a) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = Bn(a);
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
  getScene() {
    this.app.send({
      event: "getScene",
      target: "app"
    });
  }
  setScene(a) {
    this.scene = a, en(a);
    const e = nn(a);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
}
class kr extends mt {
  constructor(a) {
    super(a);
    L(this, "bindCBs");
    L(this, "buttonCBs");
    L(this, "pane");
    L(this, "appCallbacks", 0);
    L(this, "editorCallbacks", 0);
    L(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new jn({ title: "GUI" }), this.pane.registerPlugin(_n);
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
  bind(a, e, o, u = void 0) {
    const c = this.bindID, s = o.onChange !== void 0 ? o.onChange : tn;
    this.bindCBs.set(c, s), this.app.editor ? (this.pane === void 0 && this.createGUI(), (u !== void 0 ? u : this.pane).addBinding(a, e, o).on("change", (m) => {
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
        name: e,
        params: o,
        parent: u
      }
    }), this.appCallbacks++);
  }
  triggerBind(a, e) {
    const o = this.bindCBs.get(a);
    o !== void 0 ? o(e) : console.warn(`No callback for: ${a}`, e);
  }
  // Buttons
  button(a, e, o = void 0) {
    const u = this.bindID;
    this.buttonCBs.set(u, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addButton({ title: a }).on("click", () => {
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
var Ot = { exports: {} }, Je = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ut;
function $n() {
  if (Ut)
    return Je;
  Ut = 1;
  var t = Jt, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(s, d, m) {
    var v, f = {}, h = null, g = null;
    m !== void 0 && (h = "" + m), d.key !== void 0 && (h = "" + d.key), d.ref !== void 0 && (g = d.ref);
    for (v in d)
      e.call(d, v) && !u.hasOwnProperty(v) && (f[v] = d[v]);
    if (s && s.defaultProps)
      for (v in d = s.defaultProps, d)
        f[v] === void 0 && (f[v] = d[v]);
    return { $$typeof: n, type: s, key: h, ref: g, props: f, _owner: o.current };
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
var Bt;
function Gn() {
  return Bt || (Bt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Jt, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), E = Symbol.iterator, w = "@@iterator";
    function A(r) {
      if (r === null || typeof r != "object")
        return null;
      var p = E && r[E] || r[w];
      return typeof p == "function" ? p : null;
    }
    var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(r) {
      {
        for (var p = arguments.length, b = new Array(p > 1 ? p - 1 : 0), x = 1; x < p; x++)
          b[x - 1] = arguments[x];
        X("error", r, b);
      }
    }
    function X(r, p, b) {
      {
        var x = U.ReactDebugCurrentFrame, M = x.getStackAddendum();
        M !== "" && (p += "%s", b = b.concat([M]));
        var _ = b.map(function(T) {
          return String(T);
        });
        _.unshift("Warning: " + p), Function.prototype.apply.call(console[r], console, _);
      }
    }
    var Z = !1, z = !1, O = !1, S = !1, G = !1, ge;
    ge = Symbol.for("react.module.reference");
    function Re(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === u || G || r === o || r === m || r === v || S || r === g || Z || z || O || typeof r == "object" && r !== null && (r.$$typeof === h || r.$$typeof === f || r.$$typeof === c || r.$$typeof === s || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === ge || r.getModuleId !== void 0));
    }
    function ve(r, p, b) {
      var x = r.displayName;
      if (x)
        return x;
      var M = p.displayName || p.name || "";
      return M !== "" ? b + "(" + M + ")" : b;
    }
    function be(r) {
      return r.displayName || "Context";
    }
    function te(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case e:
          return "Fragment";
        case a:
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
      if (typeof r == "object")
        switch (r.$$typeof) {
          case s:
            var p = r;
            return be(p) + ".Consumer";
          case c:
            var b = r;
            return be(b._context) + ".Provider";
          case d:
            return ve(r, r.render, "ForwardRef");
          case f:
            var x = r.displayName || null;
            return x !== null ? x : te(r.type) || "Memo";
          case h: {
            var M = r, _ = M._payload, T = M._init;
            try {
              return te(T(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var oe = Object.assign, ne = 0, Pe, Ge, je, _e, Ve, nt, Ye;
    function rt() {
    }
    rt.__reactDisabledLog = !0;
    function vt() {
      {
        if (ne === 0) {
          Pe = console.log, Ge = console.info, je = console.warn, _e = console.error, Ve = console.group, nt = console.groupCollapsed, Ye = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: rt,
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
        ne++;
      }
    }
    function bt() {
      {
        if (ne--, ne === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: oe({}, r, {
              value: Pe
            }),
            info: oe({}, r, {
              value: Ge
            }),
            warn: oe({}, r, {
              value: je
            }),
            error: oe({}, r, {
              value: _e
            }),
            group: oe({}, r, {
              value: Ve
            }),
            groupCollapsed: oe({}, r, {
              value: nt
            }),
            groupEnd: oe({}, r, {
              value: Ye
            })
          });
        }
        ne < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ze = U.ReactCurrentDispatcher, We;
    function ye(r, p, b) {
      {
        if (We === void 0)
          try {
            throw Error();
          } catch (M) {
            var x = M.stack.trim().match(/\n( *(at )?)/);
            We = x && x[1] || "";
          }
        return `
` + We + r;
      }
    }
    var ke = !1, Ee;
    {
      var yt = typeof WeakMap == "function" ? WeakMap : Map;
      Ee = new yt();
    }
    function at(r, p) {
      if (!r || ke)
        return "";
      {
        var b = Ee.get(r);
        if (b !== void 0)
          return b;
      }
      var x;
      ke = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = ze.current, ze.current = null, vt();
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
            Reflect.construct(r, [], T);
          } else {
            try {
              T.call();
            } catch (ue) {
              x = ue;
            }
            r.call(T.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ue) {
            x = ue;
          }
          r();
        }
      } catch (ue) {
        if (ue && x && typeof ue.stack == "string") {
          for (var C = ue.stack.split(`
`), W = x.stack.split(`
`), N = C.length - 1, B = W.length - 1; N >= 1 && B >= 0 && C[N] !== W[B]; )
            B--;
          for (; N >= 1 && B >= 0; N--, B--)
            if (C[N] !== W[B]) {
              if (N !== 1 || B !== 1)
                do
                  if (N--, B--, B < 0 || C[N] !== W[B]) {
                    var re = `
` + C[N].replace(" at new ", " at ");
                    return r.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", r.displayName)), typeof r == "function" && Ee.set(r, re), re;
                  }
                while (N >= 1 && B >= 0);
              break;
            }
        }
      } finally {
        ke = !1, ze.current = _, bt(), Error.prepareStackTrace = M;
      }
      var Ne = r ? r.displayName || r.name : "", Dt = Ne ? ye(Ne) : "";
      return typeof r == "function" && Ee.set(r, Dt), Dt;
    }
    function it(r, p, b) {
      return at(r, !1);
    }
    function ot(r) {
      var p = r.prototype;
      return !!(p && p.isReactComponent);
    }
    function xe(r, p, b) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return at(r, ot(r));
      if (typeof r == "string")
        return ye(r);
      switch (r) {
        case m:
          return ye("Suspense");
        case v:
          return ye("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return it(r.render);
          case f:
            return xe(r.type, p, b);
          case h: {
            var x = r, M = x._payload, _ = x._init;
            try {
              return xe(_(M), p, b);
            } catch {
            }
          }
        }
      return "";
    }
    var De = Object.prototype.hasOwnProperty, st = {}, He = U.ReactDebugCurrentFrame;
    function fe(r) {
      if (r) {
        var p = r._owner, b = xe(r.type, r._source, p ? p.type : null);
        He.setExtraStackFrame(b);
      } else
        He.setExtraStackFrame(null);
    }
    function we(r, p, b, x, M) {
      {
        var _ = Function.call.bind(De);
        for (var T in r)
          if (_(r, T)) {
            var C = void 0;
            try {
              if (typeof r[T] != "function") {
                var W = Error((x || "React class") + ": " + b + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw W.name = "Invariant Violation", W;
              }
              C = r[T](p, T, x, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              C = N;
            }
            C && !(C instanceof Error) && (fe(M), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", b, T, typeof C), fe(null)), C instanceof Error && !(C.message in st) && (st[C.message] = !0, fe(M), j("Failed %s type: %s", b, C.message), fe(null));
          }
      }
    }
    var Et = Array.isArray;
    function Ke(r) {
      return Et(r);
    }
    function ct(r) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, b = p && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return b;
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
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ct(r)), lt(r);
    }
    var he = U.ReactCurrentOwner, xt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, dt, qe, se;
    se = {};
    function i(r) {
      if (De.call(r, "ref")) {
        var p = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function y(r) {
      if (De.call(r, "key")) {
        var p = Object.getOwnPropertyDescriptor(r, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function R(r, p) {
      if (typeof r.ref == "string" && he.current && p && he.current.stateNode !== p) {
        var b = te(he.current.type);
        se[b] || (j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(he.current.type), r.ref), se[b] = !0);
      }
    }
    function P(r, p) {
      {
        var b = function() {
          dt || (dt = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function V(r, p) {
      {
        var b = function() {
          qe || (qe = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var ce = function(r, p, b, x, M, _, T) {
      var C = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
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
        value: M
      }), Object.freeze && (Object.freeze(C.props), Object.freeze(C)), C;
    };
    function q(r, p, b, x, M) {
      {
        var _, T = {}, C = null, W = null;
        b !== void 0 && (ut(b), C = "" + b), y(p) && (ut(p.key), C = "" + p.key), i(p) && (W = p.ref, R(p, M));
        for (_ in p)
          De.call(p, _) && !xt.hasOwnProperty(_) && (T[_] = p[_]);
        if (r && r.defaultProps) {
          var N = r.defaultProps;
          for (_ in N)
            T[_] === void 0 && (T[_] = N[_]);
        }
        if (C || W) {
          var B = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          C && P(T, B), W && V(T, B);
        }
        return ce(r, C, W, M, x, he.current, T);
      }
    }
    var ft = U.ReactCurrentOwner, ht = U.ReactDebugCurrentFrame;
    function le(r) {
      if (r) {
        var p = r._owner, b = xe(r.type, r._source, p ? p.type : null);
        ht.setExtraStackFrame(b);
      } else
        ht.setExtraStackFrame(null);
    }
    var J;
    J = !1;
    function Q(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function Ie() {
      {
        if (ft.current) {
          var r = te(ft.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Ce(r) {
      {
        if (r !== void 0) {
          var p = r.fileName.replace(/^.*[\\\/]/, ""), b = r.lineNumber;
          return `

Check your code at ` + p + ":" + b + ".";
        }
        return "";
      }
    }
    var pe = {};
    function Ae(r) {
      {
        var p = Ie();
        if (!p) {
          var b = typeof r == "string" ? r : r.displayName || r.name;
          b && (p = `

Check the top-level render call using <` + b + ">.");
        }
        return p;
      }
    }
    function jt(r, p) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var b = Ae(p);
        if (pe[b])
          return;
        pe[b] = !0;
        var x = "";
        r && r._owner && r._owner !== ft.current && (x = " It was passed a child from " + te(r._owner.type) + "."), le(r), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, x), le(null);
      }
    }
    function _t(r, p) {
      {
        if (typeof r != "object")
          return;
        if (Ke(r))
          for (var b = 0; b < r.length; b++) {
            var x = r[b];
            Q(x) && jt(x, p);
          }
        else if (Q(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var M = A(r);
          if (typeof M == "function" && M !== r.entries)
            for (var _ = M.call(r), T; !(T = _.next()).done; )
              Q(T.value) && jt(T.value, p);
        }
      }
    }
    function on(r) {
      {
        var p = r.type;
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
          we(b, r.props, "prop", x, r);
        } else if (p.PropTypes !== void 0 && !J) {
          J = !0;
          var M = te(p);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sn(r) {
      {
        for (var p = Object.keys(r.props), b = 0; b < p.length; b++) {
          var x = p[b];
          if (x !== "children" && x !== "key") {
            le(r), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), le(null);
            break;
          }
        }
        r.ref !== null && (le(r), j("Invalid attribute `ref` supplied to `React.Fragment`."), le(null));
      }
    }
    function kt(r, p, b, x, M, _) {
      {
        var T = Re(r);
        if (!T) {
          var C = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var W = Ce(M);
          W ? C += W : C += Ie();
          var N;
          r === null ? N = "null" : Ke(r) ? N = "array" : r !== void 0 && r.$$typeof === n ? (N = "<" + (te(r.type) || "Unknown") + " />", C = " Did you accidentally export a JSX literal instead of a component?") : N = typeof r, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, C);
        }
        var B = q(r, p, b, M, _);
        if (B == null)
          return B;
        if (T) {
          var re = p.children;
          if (re !== void 0)
            if (x)
              if (Ke(re)) {
                for (var Ne = 0; Ne < re.length; Ne++)
                  _t(re[Ne], r);
                Object.freeze && Object.freeze(re);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _t(re, r);
        }
        return r === e ? sn(B) : on(B), B;
      }
    }
    function cn(r, p, b) {
      return kt(r, p, b, !0);
    }
    function ln(r, p, b) {
      return kt(r, p, b, !1);
    }
    var un = ln, dn = cn;
    Qe.Fragment = e, Qe.jsx = un, Qe.jsxs = dn;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? Ot.exports = $n() : Ot.exports = Gn();
var l = Ot.exports;
function rn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const Vn = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Yn = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function zn(t) {
  return /* @__PURE__ */ l.jsx(Qt.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Yn,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Vn })
  ] }) }, t.title);
}
function Wn(t) {
  const [n, a] = ie(!1), [e, o] = ie(t.options), u = (m) => {
    t.onDragComplete(m), o(m);
  }, c = (m) => {
    const v = [...e];
    v.splice(m, 1), u(v);
  }, s = [];
  e.forEach((m, v) => {
    s.push(/* @__PURE__ */ l.jsx(zn, { index: v, title: m, onDelete: c }, m));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(rn, { title: t.title }),
    /* @__PURE__ */ l.jsx(Qt.Group, { axis: "y", values: e, onReorder: u, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function Hn(t) {
  const [n, a] = ie(!1), e = [];
  t.options.map((u, c) => {
    t.onSelect !== void 0 && (u.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Kn, { option: u }, c));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(rn, { title: t.title }),
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
function Kn(t) {
  const { option: n } = t, [a, e] = ie("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        Wn,
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
        Hn,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: o }, In());
}
function Dr(t) {
  let n;
  function a(c) {
    var d, m, v, f, h, g, E, w, A;
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
        (d = t.components.get("debug")) == null || d.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (m = t.components.get("debug")) == null || m.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (v = t.components.get("debug")) == null || v.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (f = t.components.get("debug")) == null || f.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (h = t.components.get("debug")) == null || h.triggerButton(c.data.id);
        break;
      case "setSheet":
        s = (g = t.components.get("theatre")) == null ? void 0 : g.sheets.get(c.data.sheet), s !== void 0 && (n = s, Ze.setSelection([s]));
        break;
      case "setSheetObject":
        s = (E = t.components.get("theatre")) == null ? void 0 : E.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), s !== void 0 && Ze.setSelection([s]);
        break;
      case "updateSheetObject":
        s = (w = t.components.get("theatre")) == null ? void 0 : w.sheetObjectCBs.get(c.data.sheetObject), s !== void 0 && s(c.data.values);
        break;
      case "updateTimeline":
        n = (A = t.components.get("theatre")) == null ? void 0 : A.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
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
            }, n = (E = t.components.get("theatre")) == null ? void 0 : E.sheets.get(v.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            h = "setSheetObject", f += `_${v.address.objectKey}`, g = {
              id: f,
              sheet: v.address.sheetId,
              key: v.address.objectKey
            };
            break;
        }
        t.send({ event: h, target: "app", data: g });
      });
    });
    let c = 0;
    const s = () => {
      if (n !== void 0 && c !== n.sequence.position) {
        c = n.sequence.position;
        const m = n;
        t.send({
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
  t.listen((c) => {
    t.editor ? e(c) : a(c);
  }), t.editor ? u() : o();
}
const Xn = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, qn = `out vec4 fragColor;
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
class Zn extends qt {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: mn,
      side: gn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Pt(16777215)
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
      vertexShader: Xn,
      fragmentShader: qn,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class Jn extends vn {
  constructor() {
    const a = new Zn();
    super(new bn(2, 2), a);
    L(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Qn = `#include <common>
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
}`, er = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class tr extends qt {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Qn,
      fragmentShader: er
    });
  }
}
function Mt(t) {
  const [n, a] = ie(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
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
function an(t) {
  const [n, a] = ie(!1), e = t.child.children.length > 0, o = [];
  return t.child.children.length > 0 && t.child.children.map((u) => {
    o.push(/* @__PURE__ */ l.jsx(an, { child: u, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Ln(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random());
}
function nr(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(an, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const rr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function ar(t) {
  return "items" in t;
}
function $e(t) {
  function n(e, o) {
    console.log("onChange:", e, o);
  }
  const a = [];
  return t.items.forEach((e) => {
    ar(e) ? a.push(
      /* @__PURE__ */ l.jsx($e, { title: e.title, items: e.items }, Math.random())
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
          onChange: (o, u) => {
            e.onChange !== void 0 ? e.onChange(o, u) : n(o, u);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Mt, { label: t.title, open: !1, children: a });
}
function ir(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Se(t) {
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
function or(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function sr() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], o = new FileReader();
        o.onload = function(u) {
          n(u.target.result);
        }, o.readAsDataURL(e);
      }
    }), t.click();
  });
}
function $t(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!ir(o))
      continue;
    const u = typeof t[o], c = t[o];
    if (u === "boolean" || u === "number" || u === "string") {
      const s = {
        title: Se(o),
        prop: o,
        type: u,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (d, m) => {
          var f;
          a.updateObject(n.uuid, `material.${d}`, m), u === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const v = (f = a.scene) == null ? void 0 : f.getObjectByProperty("uuid", n.uuid);
          v !== void 0 && K(v, `material.${d}`, m);
        }
      };
      or(o) && (s.value = Number(c), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01), e.push(s);
    } else if (u === "object")
      if (c.isColor)
        e.push({
          title: Se(o),
          prop: o,
          type: "color",
          value: c,
          onChange: (s, d) => {
            var f;
            const m = new Pt(d);
            a.updateObject(n.uuid, `material.${s}`, m);
            const v = (f = a.scene) == null ? void 0 : f.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && K(v, `material.${s}`, m);
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
              a.updateObject(n.uuid, `material.${o}`, v);
              const f = (h = a.scene) == null ? void 0 : h.getObjectByProperty("uuid", n.uuid);
              f !== void 0 && K(f, `material.${o}`, v);
            }
          });
        e.push({
          title: Se(o),
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
              d === "src" ? e.push({
                title: Se(o),
                type: "image",
                value: m,
                onChange: (f, h) => {
                  var E;
                  a.createTexture(n.uuid, `material.${o}`, h);
                  const g = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && Tt(h).then((w) => {
                    K(g, `material.${o}`, w), K(g, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${Se(d)}`,
                prop: `material.${o}.${d}`,
                type: `${typeof t[o][d]}`,
                value: c[d],
                onChange: (f, h) => {
                  var E;
                  a.updateObject(n.uuid, `material.${o}.${d}`, h);
                  const g = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && K(g, `material.${o}.${d}`, h);
                }
              });
              break;
            case "object":
              m.value !== void 0 && m.value.src !== void 0 ? s.push({
                title: Se(d),
                type: "image",
                value: m.value.src,
                onChange: (f, h) => {
                  var E;
                  a.createTexture(n.uuid, `material.${o}.${d}.value`, h);
                  const g = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && Tt(h).then((w) => {
                    K(g, `material.${o}.${d}.value`, w);
                  });
                }
              }) : s.push({
                title: d,
                type: `${typeof m.value}`,
                value: m.value,
                onChange: (f, h) => {
                  var E;
                  a.updateObject(n.uuid, `material.${o}.${d}.value`, h);
                  const g = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
                  g !== void 0 && K(g, `material.${o}.${d}.value`, h);
                }
              });
              break;
          }
        }
        s.length > 0 && e.push({
          title: Se(o),
          items: s
        });
      }
    else
      c !== void 0 && console.log("other:", o, u, c);
  }
  return e.sort((o, u) => o.title < u.title ? -1 : o.title > u.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function cr(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let u = 0; u < o; u++)
      e.push(
        /* @__PURE__ */ l.jsx(
          $e,
          {
            title: `Material ${u}`,
            items: $t(a[u], t, n)
          }
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      $e,
      {
        title: "Material",
        items: $t(a, t, n)
      }
    );
}
function et(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Nn(t.value));
  const [a, e] = ie(n), o = Oe(null), u = Oe(null), c = Oe(null);
  tt(() => {
    var X;
    let v = !1, f = -1, h = 0, g = Number(a);
    const E = (Z) => {
      v = !0, h = g, f = Z.clientX;
    }, w = (Z) => {
      if (!v)
        return;
      const z = t.step !== void 0 ? t.step : 1, O = (Z.clientX - f) * z;
      g = Number((h + O).toFixed(4)), u.current !== null && (u.current.value = g.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, g);
    }, A = () => {
      v = !1;
    }, U = () => {
      v = !1;
    }, j = t.type === "number";
    return j && ((X = o.current) == null || X.addEventListener("mousedown", E, !1), document.addEventListener("mouseup", A, !1), document.addEventListener("mousemove", w, !1), document.addEventListener("contextmenu", U, !1)), () => {
      var Z;
      j && ((Z = o.current) == null || Z.removeEventListener("mousedown", E), document.removeEventListener("mouseup", A), document.removeEventListener("mousemove", w), document.removeEventListener("contextmenu", U));
    };
  }, [a]);
  const s = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = s || t.type === "image", m = (v) => {
    let f = v.target.value;
    t.type === "boolean" && (f = v.target.checked), e(f), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, f);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: t.title }, "fieldLabel"),
    t.type === "string" && !s && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: m,
        value: a
      }
    ),
    t.type === "string" && s && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: m,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: m,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: u,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: m
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: m, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: m
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: m, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: m })
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
      sr().then((v) => {
        c.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : rr })
  ] });
}
function Gt(t) {
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
function lr(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Gt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, u) => {
          var s;
          n.updateObject(t.uuid, o, u), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (K(c, o, u), c.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: Gt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, u) => {
          var s;
          n.updateObject(t.uuid, o, u), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (K(c, o, u), c.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    $e,
    {
      title: "Camera",
      items: a
    }
  );
}
function ur(t, n) {
  const a = new yn();
  a.elements = t.matrix;
  const e = new I(), o = new En(), u = new I();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), u.setFromMatrixScale(a));
  const c = (d, m) => {
    var f;
    n.updateObject(t.uuid, d, m);
    const v = (f = n.scene) == null ? void 0 : f.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && K(v, d, m);
  }, s = [
    {
      title: "Position",
      items: [
        {
          title: "X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: c
        },
        {
          title: "Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: c
        },
        {
          title: "Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: c
        }
      ]
    },
    {
      title: "Rotation",
      items: [
        {
          title: "X",
          prop: "rotation.x",
          type: "number",
          value: o.x,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: c
        },
        {
          title: "Y",
          prop: "rotation.y",
          type: "number",
          value: o.y,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: c
        },
        {
          title: "Z",
          prop: "rotation.z",
          type: "number",
          value: o.z,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: c
        }
      ]
    },
    {
      title: "Scale",
      items: [
        {
          title: "X",
          prop: "scale.x",
          type: "number",
          value: u.x,
          step: 0.01,
          onChange: c
        },
        {
          title: "Y",
          prop: "scale.y",
          type: "number",
          value: u.y,
          step: 0.01,
          onChange: c
        },
        {
          title: "Z",
          prop: "scale.z",
          type: "number",
          value: u.z,
          step: 0.01,
          onChange: c
        }
      ]
    }
  ];
  return /* @__PURE__ */ l.jsx(
    $e,
    {
      title: "Transform",
      items: s
    }
  );
}
function Vt(t) {
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
function dr(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: Vt(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (u, c) => {
          var m;
          const s = new Pt(c);
          n.updateObject(t.uuid, u, s);
          const d = (m = n.scene) == null ? void 0 : m.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && K(d, u, s);
        }
      }) : a.push({
        title: Vt(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (u, c) => {
          var d;
          n.updateObject(t.uuid, u, c);
          const s = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          s !== void 0 && K(s, u, c);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    $e,
    {
      title: "Light",
      items: a
    }
  );
}
function fr(t) {
  const [n, a] = ie(-1), [e, o] = ie({
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
  tt(() => {
    function c(s) {
      const d = s.value;
      o(d), a(Date.now());
    }
    return k.addEventListener(D.SET_OBJECT, c), () => {
      k.removeEventListener(D.SET_OBJECT, c);
    };
  }, []);
  const u = e.type.toLowerCase();
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
          onChange: (c, s) => {
            var m;
            t.three.updateObject(e.uuid, c, s);
            const d = (m = t.three.scene) == null ? void 0 : m.getObjectByProperty("uuid", e.uuid);
            d !== void 0 && K(d, c, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      ur(e, t.three),
      u.search("camera") > -1 ? lr(e, t.three) : null,
      u.search("light") > -1 ? dr(e, t.three) : null,
      u.search("mesh") > -1 ? cr(e, t.three) : null
    ] })
  ] }) }, n);
}
class Ir extends kn {
  constructor(a) {
    super(a);
    L(this, "three");
    // Private
    L(this, "onRefresh", () => {
      this.three.getScene();
    });
    L(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      scene: a.scene !== void 0 ? a.scene : null
    }, this.three = a.three, k.addEventListener(D.SET_SCENE, this.setScene);
  }
  componentDidMount() {
    this.onRefresh();
  }
  componentWillUnmount() {
    k.removeEventListener(D.SET_SCENE, this.setScene);
  }
  render() {
    var o;
    const a = this.componentState.scene !== null, e = "Hierarchy" + (a ? `: ${(o = this.componentState.scene) == null ? void 0 : o.name}` : "");
    return /* @__PURE__ */ l.jsx("div", { id: "SceneHierarchy", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      a && /* @__PURE__ */ l.jsx(
        Mt,
        {
          label: e,
          button: /* @__PURE__ */ l.jsx("button", { className: "icon refresh hideText", onClick: this.onRefresh, children: "Refresh" }),
          open: !0,
          children: /* @__PURE__ */ l.jsx(nr, { child: this.componentState.scene, three: this.three })
        }
      ),
      /* @__PURE__ */ l.jsx(Mt, { label: "Inspector", children: /* @__PURE__ */ l.jsx(fr, { three: this.three }, "Inspector") })
    ] }) }, "SceneHierarchy");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Ar(t) {
  const n = (s) => {
    const d = t.scene.getObjectByProperty("uuid", s.value);
    d !== void 0 && t.three.setObject(d);
  }, a = (s, d, m) => {
    const v = t.scene.getObjectByProperty("uuid", s);
    v !== void 0 && K(v, d, m);
  }, e = (s) => {
    const d = s.value, { key: m, value: v, uuid: f } = d;
    a(f, m, v);
  }, o = (s) => {
    const d = s.value;
    Tt(d.value).then((m) => {
      a(d.uuid, d.key, m), a(d.uuid, "material.needsUpdate", !0);
    });
  }, u = () => {
    t.three.setScene(t.scene);
  }, c = (s) => {
    const { key: d, uuid: m, value: v } = s.value, f = t.scene.getObjectByProperty("uuid", m);
    if (f !== void 0)
      try {
        f[d](v);
      } catch (h) {
        console.log("Error requesting method:"), console.log(h), console.log(d), console.log(v);
      }
  };
  return tt(() => (k.addEventListener(D.GET_OBJECT, n), k.addEventListener(D.GET_SCENE, u), k.addEventListener(D.UPDATE_OBJECT, e), k.addEventListener(D.CREATE_TEXTURE, o), k.addEventListener(D.REQUEST_METHOD, c), () => {
    k.removeEventListener(D.GET_OBJECT, n), k.removeEventListener(D.GET_SCENE, u), k.removeEventListener(D.UPDATE_OBJECT, e), k.removeEventListener(D.CREATE_TEXTURE, o), k.removeEventListener(D.REQUEST_METHOD, c);
  }), []), null;
}
const Yt = { type: "change" }, wt = { type: "start" }, zt = { type: "end" }, pt = new xn(), Wt = new wn(), hr = Math.cos(70 * Cn.DEG2RAD);
class pr extends Kt {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new I(), this.cursor = new I(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Le.ROTATE, MIDDLE: Le.DOLLY, RIGHT: Le.PAN }, this.touches = { ONE: Fe.ROTATE, TWO: Fe.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
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
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Yt), e.update(), u = o.NONE;
    }, this.update = function() {
      const i = new I(), y = new At().setFromUnitVectors(n.up, new I(0, 1, 0)), R = y.clone().invert(), P = new I(), V = new At(), ce = new I(), q = 2 * Math.PI;
      return function(ht = null) {
        const le = e.object.position;
        i.copy(le).sub(e.target), i.applyQuaternion(y), s.setFromVector3(i), e.autoRotate && u === o.NONE && ve(ge(ht)), e.enableDamping ? (s.theta += d.theta * e.dampingFactor, s.phi += d.phi * e.dampingFactor) : (s.theta += d.theta, s.phi += d.phi);
        let J = e.minAzimuthAngle, Q = e.maxAzimuthAngle;
        isFinite(J) && isFinite(Q) && (J < -Math.PI ? J += q : J > Math.PI && (J -= q), Q < -Math.PI ? Q += q : Q > Math.PI && (Q -= q), J <= Q ? s.theta = Math.max(J, Math.min(Q, s.theta)) : s.theta = s.theta > (J + Q) / 2 ? Math.max(J, s.theta) : Math.min(Q, s.theta)), s.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, s.phi)), s.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && O || e.object.isOrthographicCamera ? s.radius = _e(s.radius) : s.radius = _e(s.radius * m), i.setFromSpherical(s), i.applyQuaternion(R), le.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), v.set(0, 0, 0));
        let Ie = !1;
        if (e.zoomToCursor && O) {
          let Ce = null;
          if (e.object.isPerspectiveCamera) {
            const pe = i.length();
            Ce = _e(pe * m);
            const Ae = pe - Ce;
            e.object.position.addScaledVector(Z, Ae), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const pe = new I(z.x, z.y, 0);
            pe.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / m)), e.object.updateProjectionMatrix(), Ie = !0;
            const Ae = new I(z.x, z.y, 0);
            Ae.unproject(e.object), e.object.position.sub(Ae).add(pe), e.object.updateMatrixWorld(), Ce = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ce !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ce).add(e.object.position) : (pt.origin.copy(e.object.position), pt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(pt.direction)) < hr ? n.lookAt(e.target) : (Wt.setFromNormalAndCoplanarPoint(e.object.up, e.target), pt.intersectPlane(Wt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / m)), e.object.updateProjectionMatrix(), Ie = !0);
        return m = 1, O = !1, Ie || P.distanceToSquared(e.object.position) > c || 8 * (1 - V.dot(e.object.quaternion)) > c || ce.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Yt), P.copy(e.object.position), V.copy(e.object.quaternion), ce.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", he), e.domElement.removeEventListener("pointerdown", He), e.domElement.removeEventListener("pointercancel", we), e.domElement.removeEventListener("wheel", ct), e.domElement.removeEventListener("pointermove", fe), e.domElement.removeEventListener("pointerup", we), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Xe), e._domElementKeyEvents = null);
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
    let u = o.NONE;
    const c = 1e-6, s = new Nt(), d = new Nt();
    let m = 1;
    const v = new I(), f = new ae(), h = new ae(), g = new ae(), E = new ae(), w = new ae(), A = new ae(), U = new ae(), j = new ae(), X = new ae(), Z = new I(), z = new ae();
    let O = !1;
    const S = [], G = {};
    function ge(i) {
      return i !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Re(i) {
      const y = Math.abs(i) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function ve(i) {
      d.theta -= i;
    }
    function be(i) {
      d.phi -= i;
    }
    const te = function() {
      const i = new I();
      return function(R, P) {
        i.setFromMatrixColumn(P, 0), i.multiplyScalar(-R), v.add(i);
      };
    }(), oe = function() {
      const i = new I();
      return function(R, P) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(P, 1) : (i.setFromMatrixColumn(P, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(R), v.add(i);
      };
    }(), ne = function() {
      const i = new I();
      return function(R, P) {
        const V = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const ce = e.object.position;
          i.copy(ce).sub(e.target);
          let q = i.length();
          q *= Math.tan(e.object.fov / 2 * Math.PI / 180), te(2 * R * q / V.clientHeight, e.object.matrix), oe(2 * P * q / V.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (te(R * (e.object.right - e.object.left) / e.object.zoom / V.clientWidth, e.object.matrix), oe(P * (e.object.top - e.object.bottom) / e.object.zoom / V.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Pe(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? m /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ge(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? m *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function je(i, y) {
      if (!e.zoomToCursor)
        return;
      O = !0;
      const R = e.domElement.getBoundingClientRect(), P = i - R.left, V = y - R.top, ce = R.width, q = R.height;
      z.x = P / ce * 2 - 1, z.y = -(V / q) * 2 + 1, Z.set(z.x, z.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function _e(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function Ve(i) {
      f.set(i.clientX, i.clientY);
    }
    function nt(i) {
      je(i.clientX, i.clientX), U.set(i.clientX, i.clientY);
    }
    function Ye(i) {
      E.set(i.clientX, i.clientY);
    }
    function rt(i) {
      h.set(i.clientX, i.clientY), g.subVectors(h, f).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      ve(2 * Math.PI * g.x / y.clientHeight), be(2 * Math.PI * g.y / y.clientHeight), f.copy(h), e.update();
    }
    function vt(i) {
      j.set(i.clientX, i.clientY), X.subVectors(j, U), X.y > 0 ? Pe(Re(X.y)) : X.y < 0 && Ge(Re(X.y)), U.copy(j), e.update();
    }
    function bt(i) {
      w.set(i.clientX, i.clientY), A.subVectors(w, E).multiplyScalar(e.panSpeed), ne(A.x, A.y), E.copy(w), e.update();
    }
    function ze(i) {
      je(i.clientX, i.clientY), i.deltaY < 0 ? Ge(Re(i.deltaY)) : i.deltaY > 0 && Pe(Re(i.deltaY)), e.update();
    }
    function We(i) {
      let y = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? be(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ne(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? be(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ne(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? ve(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ne(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? ve(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ne(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (i.preventDefault(), e.update());
    }
    function ye(i) {
      if (S.length === 1)
        f.set(i.pageX, i.pageY);
      else {
        const y = se(i), R = 0.5 * (i.pageX + y.x), P = 0.5 * (i.pageY + y.y);
        f.set(R, P);
      }
    }
    function ke(i) {
      if (S.length === 1)
        E.set(i.pageX, i.pageY);
      else {
        const y = se(i), R = 0.5 * (i.pageX + y.x), P = 0.5 * (i.pageY + y.y);
        E.set(R, P);
      }
    }
    function Ee(i) {
      const y = se(i), R = i.pageX - y.x, P = i.pageY - y.y, V = Math.sqrt(R * R + P * P);
      U.set(0, V);
    }
    function yt(i) {
      e.enableZoom && Ee(i), e.enablePan && ke(i);
    }
    function at(i) {
      e.enableZoom && Ee(i), e.enableRotate && ye(i);
    }
    function it(i) {
      if (S.length == 1)
        h.set(i.pageX, i.pageY);
      else {
        const R = se(i), P = 0.5 * (i.pageX + R.x), V = 0.5 * (i.pageY + R.y);
        h.set(P, V);
      }
      g.subVectors(h, f).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      ve(2 * Math.PI * g.x / y.clientHeight), be(2 * Math.PI * g.y / y.clientHeight), f.copy(h);
    }
    function ot(i) {
      if (S.length === 1)
        w.set(i.pageX, i.pageY);
      else {
        const y = se(i), R = 0.5 * (i.pageX + y.x), P = 0.5 * (i.pageY + y.y);
        w.set(R, P);
      }
      A.subVectors(w, E).multiplyScalar(e.panSpeed), ne(A.x, A.y), E.copy(w);
    }
    function xe(i) {
      const y = se(i), R = i.pageX - y.x, P = i.pageY - y.y, V = Math.sqrt(R * R + P * P);
      j.set(0, V), X.set(0, Math.pow(j.y / U.y, e.zoomSpeed)), Pe(X.y), U.copy(j);
      const ce = (i.pageX + y.x) * 0.5, q = (i.pageY + y.y) * 0.5;
      je(ce, q);
    }
    function De(i) {
      e.enableZoom && xe(i), e.enablePan && ot(i);
    }
    function st(i) {
      e.enableZoom && xe(i), e.enableRotate && it(i);
    }
    function He(i) {
      e.enabled !== !1 && (S.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", fe), e.domElement.addEventListener("pointerup", we)), xt(i), i.pointerType === "touch" ? lt(i) : Et(i));
    }
    function fe(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? ut(i) : Ke(i));
    }
    function we(i) {
      dt(i), S.length === 0 && (e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", fe), e.domElement.removeEventListener("pointerup", we)), e.dispatchEvent(zt), u = o.NONE;
    }
    function Et(i) {
      let y;
      switch (i.button) {
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
        case Le.DOLLY:
          if (e.enableZoom === !1)
            return;
          nt(i), u = o.DOLLY;
          break;
        case Le.ROTATE:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enablePan === !1)
              return;
            Ye(i), u = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Ve(i), u = o.ROTATE;
          }
          break;
        case Le.PAN:
          if (i.ctrlKey || i.metaKey || i.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Ve(i), u = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Ye(i), u = o.PAN;
          }
          break;
        default:
          u = o.NONE;
      }
      u !== o.NONE && e.dispatchEvent(wt);
    }
    function Ke(i) {
      switch (u) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          rt(i);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          vt(i);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          bt(i);
          break;
      }
    }
    function ct(i) {
      e.enabled === !1 || e.enableZoom === !1 || u !== o.NONE || (i.preventDefault(), e.dispatchEvent(wt), ze(i), e.dispatchEvent(zt));
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
              ye(i), u = o.TOUCH_ROTATE;
              break;
            case Fe.PAN:
              if (e.enablePan === !1)
                return;
              ke(i), u = o.TOUCH_PAN;
              break;
            default:
              u = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Fe.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              yt(i), u = o.TOUCH_DOLLY_PAN;
              break;
            case Fe.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              at(i), u = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              u = o.NONE;
          }
          break;
        default:
          u = o.NONE;
      }
      u !== o.NONE && e.dispatchEvent(wt);
    }
    function ut(i) {
      switch (qe(i), u) {
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
          u = o.NONE;
      }
    }
    function he(i) {
      e.enabled !== !1 && i.preventDefault();
    }
    function xt(i) {
      S.push(i.pointerId);
    }
    function dt(i) {
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
    e.domElement.addEventListener("contextmenu", he), e.domElement.addEventListener("pointerdown", He), e.domElement.addEventListener("pointercancel", we), e.domElement.addEventListener("wheel", ct, { passive: !1 }), this.update();
  }
}
const Rt = (t) => {
  const [n, a] = ie(!1), [e, o] = ie(t.options[t.index]), u = () => {
    a(!n);
  }, c = (s) => {
    s !== e && (t.onSelect(s), o(s)), a(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: u, children: e }),
    n && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => c(s), children: s }, s)) })
  ] });
}, Te = Dn(function(n, a) {
  const e = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable" }),
    /* @__PURE__ */ l.jsx(Rt, { index: e, options: n.options, onSelect: n.onSelect, up: !0 })
  ] });
}), Ht = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], H = /* @__PURE__ */ new Map(), Y = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Map(), me = [
  "Top",
  "Bottom",
  "Left",
  "Right",
  "Front",
  "Back",
  "Orthographic",
  "Debug"
];
function Me(t, n) {
  const a = new Zt(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), H.set(t, a), a;
}
Me("Top", new I(0, 1e3, 0));
Me("Bottom", new I(0, -1e3, 0));
Me("Left", new I(-1e3, 0, 0));
Me("Right", new I(1e3, 0, 0));
Me("Front", new I(0, 0, 1e3));
Me("Back", new I(0, 0, -1e3));
Me("Orthographic", new I(1e3, 1e3, 1e3));
const gt = new St(60, 1, 50, 3e3);
gt.name = "Debug";
gt.position.set(500, 500, 500);
gt.lookAt(0, 0, 0);
H.set("Debug", gt);
const mr = [
  "Default",
  "Normals",
  "Wireframe",
  "UVs"
], gr = new Sn(), vr = new Tn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
}), br = new tr();
let Ct = "Default";
const F = new On();
let $ = H.get("Debug"), ee = H.get("Orthographic"), Ue = H.get("Front"), Be = H.get("Top");
function Nr(t) {
  const [n, a] = ie(t.mode !== void 0 ? t.mode : "Quad"), e = Oe(null), o = Oe(null), u = Oe(null), c = Oe(null), s = (f, h) => {
    const g = Y.get(f.name);
    g !== void 0 && g.dispose(), Y.delete(f.name);
    const E = de.get(f.name);
    E !== void 0 && (F.remove(E), E.dispose()), de.delete(f.name);
    const w = new pr(f, h);
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
    if (Y.set(f.name, w), f instanceof St) {
      const A = new Rn(f);
      de.set(f.name, A), F.add(A);
    }
  }, d = (f) => {
    const h = de.get(f.name);
    h !== void 0 && (F.remove(h), h.dispose(), de.delete(f.name));
    const g = Y.get(f.name);
    g !== void 0 && (g.dispose(), Y.delete(f.name));
  }, m = () => {
    Y.forEach((f, h) => {
      f.dispose();
      const g = de.get(h);
      g !== void 0 && (F.remove(g), g.dispose()), de.delete(h), Y.delete(h);
    }), Y.clear(), de.clear();
  }, v = () => {
    switch (n) {
      case "Single":
        s($, e.current);
        break;
      case "Side by Side":
      case "Stacked":
        s($, e.current), s(ee, o.current);
        break;
      case "Quad":
        s($, e.current), s(ee, o.current), s(Ue, u.current), s(Be, c.current);
        break;
    }
  };
  return tt(() => {
    F.name = "Debug Scene", F.add(t.scene);
    const f = new Jn();
    F.add(f);
    const h = new Mn(500);
    h.name = "axisHelper", F.add(h);
  }, []), tt(() => {
    const f = t.renderer.getSize(new ae());
    let h = f.x, g = f.y, E = Math.floor(h / 2), w = Math.floor(g / 2), A = -1;
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
      H.forEach((G) => {
        var ge;
        G instanceof Zt ? (G.left = O / -2, G.right = O / 2, G.top = S / 2, G.bottom = S / -2, G.updateProjectionMatrix()) : G instanceof St && (G.aspect = O / S, G.updateProjectionMatrix(), (ge = de.get(G.name)) == null || ge.update());
      });
    }, j = () => {
      t.renderer.setViewport(0, 0, h, g), t.renderer.setScissor(0, 0, h, g), t.renderer.render(F, $);
    }, X = () => {
      if (n === "Side by Side")
        t.renderer.setViewport(0, 0, E, g), t.renderer.setScissor(0, 0, E, g), t.renderer.render(F, $), t.renderer.setViewport(E, 0, E, g), t.renderer.setScissor(E, 0, E, g), t.renderer.render(F, ee);
      else {
        const O = g - w;
        t.renderer.setViewport(0, O, h, w), t.renderer.setScissor(0, O, h, w), t.renderer.render(F, $), t.renderer.setViewport(0, 0, h, w), t.renderer.setScissor(0, 0, h, w), t.renderer.render(F, ee);
      }
    }, Z = () => {
      let O = 0, S = 0;
      S = g - w, O = 0, t.renderer.setViewport(O, S, E, w), t.renderer.setScissor(O, S, E, w), t.renderer.render(F, $), O = E, t.renderer.setViewport(O, S, E, w), t.renderer.setScissor(O, S, E, w), t.renderer.render(F, ee), S = 0, O = 0, t.renderer.setViewport(O, S, E, w), t.renderer.setScissor(O, S, E, w), t.renderer.render(F, Ue), O = E, t.renderer.setViewport(O, S, E, w), t.renderer.setScissor(O, S, E, w), t.renderer.render(F, Be);
    }, z = () => {
      switch (Y.forEach((O) => {
        O.update();
      }), t.scene.update(), t.renderer.clear(), n) {
        case "Single":
          j();
          break;
        case "Side by Side":
        case "Stacked":
          X();
          break;
        case "Quad":
          Z();
          break;
      }
      A = requestAnimationFrame(z);
    };
    return v(), window.addEventListener("resize", U), U(), z(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(A), A = -1;
    };
  }, [n]), t.cameras.forEach((f) => {
    H.set(f.name, f), me.push(f.name);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Te, { camera: $, options: me, ref: e, onSelect: (f) => {
        var g;
        (g = Y.get($.name)) == null || g.dispose();
        const h = H.get(f);
        h !== void 0 && (d($), $ = h, s(h, e.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Te, { camera: $, options: me, ref: e, onSelect: (f) => {
          var g;
          (g = Y.get($.name)) == null || g.dispose();
          const h = H.get(f);
          h !== void 0 && (d($), $ = h, s(h, e.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: ee, options: me, ref: o, onSelect: (f) => {
          var g;
          (g = Y.get(ee.name)) == null || g.dispose();
          const h = H.get(f);
          h !== void 0 && (d(ee), ee = h, s(h, o.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Te, { camera: $, options: me, ref: e, onSelect: (f) => {
          var g;
          (g = Y.get($.name)) == null || g.dispose();
          const h = H.get(f);
          h !== void 0 && (d($), $ = h, s(h, e.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: ee, options: me, ref: o, onSelect: (f) => {
          var g;
          (g = Y.get(ee.name)) == null || g.dispose();
          const h = H.get(f);
          h !== void 0 && (d(ee), ee = h, s(h, o.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: Ue, options: me, ref: u, onSelect: (f) => {
          var g;
          (g = Y.get(Ue.name)) == null || g.dispose();
          const h = H.get(f);
          h !== void 0 && (d(Ue), Ue = h, s(h, u.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: Be, options: me, ref: c, onSelect: (f) => {
          var g;
          (g = Y.get(Be.name)) == null || g.dispose();
          const h = H.get(f);
          h !== void 0 && (d(Be), Be = h, s(h, c.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Rt,
        {
          index: Ht.indexOf(n),
          options: Ht,
          onSelect: (f) => {
            f !== n && (m(), a(f));
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Rt,
        {
          index: 0,
          options: mr,
          onSelect: (f) => {
            if (f !== Ct)
              switch (Ct = f, Ct) {
                case "Default":
                  F.overrideMaterial = null;
                  break;
                case "Normals":
                  F.overrideMaterial = gr;
                  break;
                case "Wireframe":
                  F.overrideMaterial = vr;
                  break;
                case "UVs":
                  F.overrideMaterial = br;
                  break;
              }
          }
        }
      )
    ] })
  ] });
}
function Lr(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Mt as Accordion,
  Rr as Application,
  mt as BaseRemote,
  an as ChildObject,
  nr as ContainerObject,
  Wn as Draggable,
  zn as DraggableItem,
  Hn as Dropdown,
  Kn as DropdownItem,
  Lr as Editor,
  Jn as InfiniteGridHelper,
  fr as Inspector,
  Nr as MultiView,
  rn as NavButton,
  Pr as RemoteComponents,
  Dr as RemoteController,
  jr as RemoteTheatre,
  _r as RemoteThree,
  kr as RemoteTweakpane,
  Ir as SceneHierarchy,
  Ar as SceneInspector,
  D as ToolEvents,
  tr as UVMaterial,
  Or as clamp,
  Nn as colorToHex,
  k as debugDispatcher,
  Mr as distance,
  en as hierarchyUUID,
  An as isColor,
  In as randomID
};
