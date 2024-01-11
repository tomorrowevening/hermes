var bn = Object.defineProperty;
var yn = (t, n, a) => n in t ? bn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var $ = (t, n, a) => (yn(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as En, EventDispatcher as Zt, Texture as Jt, CubeTexture as xn, RepeatWrapping as Lt, ShaderMaterial as Qt, GLSL3 as wn, DoubleSide as Cn, Color as kt, Mesh as Sn, PlaneGeometry as On, Matrix4 as Tn, Vector3 as L, Euler as Rn, Ray as Mn, Plane as Pn, MathUtils as jn, MOUSE as Ne, TOUCH as Le, Quaternion as Ft, Spherical as Ut, Vector2 as oe, PerspectiveCamera as Tt, MeshDepthMaterial as _n, MeshNormalMaterial as kn, MeshBasicMaterial as Dn, OrthographicCamera as en, Scene as tn, AxesHelper as An, WebGLRenderer as In, CameraHelper as Nn } from "three";
import { getProject as Ln } from "@theatre/core";
import { Pane as Fn } from "tweakpane";
import * as Un from "@tweakpane/plugin-essentials";
import nn, { useState as ne, useRef as ye, useEffect as Be, Component as Bn, forwardRef as $n } from "react";
import { Reorder as an } from "framer-motion";
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
function Vn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Yn(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (d) => {
    const p = d.toString(16);
    return p.length === 1 ? "0" + p : p;
  }, u = o(n), c = o(a), s = o(e);
  return "#" + u + c + s;
}
function Ct(t, n = 1) {
  return Number(t.toFixed(n));
}
let Rt = 0;
const zn = () => {
  Rt = 0;
}, rn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Rt}`, Rt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    rn(a);
  });
}, Ga = (t) => {
  t == null || t.dispose();
}, Wn = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, on = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof En ? (a.pause(), a.parent && a.parent.remove(a)) : on(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), Wn(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Va {
  constructor(n, a, e) {
    $(this, "channel");
    $(this, "components", /* @__PURE__ */ new Map());
    // Protected
    $(this, "_mode", "app");
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
const I = new Zt(), N = {
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
  REQUEST_METHOD: "ToolEvents::requestMethod"
};
class gt {
  constructor(n) {
    $(this, "app");
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
const sn = () => {
};
class za extends gt {
  constructor(a, e, o) {
    super(a);
    $(this, "project");
    $(this, "sheets");
    $(this, "sheetObjects");
    $(this, "sheetObjectCBs");
    $(this, "sheetObjectUnsubscribe");
    this.project = Ln(e, o), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
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
    d = c.object(e, o), this.sheetObjects.set(s, d), this.sheetObjectCBs.set(s, u !== void 0 ? u : sn);
    const p = d.onValuesChange((h) => {
      if (this.app.editor) {
        for (const b in h) {
          const x = h[b];
          typeof x == "object" && Vn(x) && (h[b] = {
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
            sheetObject: s,
            values: h
          }
        });
      } else {
        const b = this.sheetObjectCBs.get(s);
        b !== void 0 && b(h);
      }
    });
    return this.sheetObjectUnsubscribe.set(s, p), d;
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
function Hn(t) {
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
function cn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(cn(a));
  }), n;
}
function Kn(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Xn(t) {
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
function Bt(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Xn(a))
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
            if (o instanceof Jt) {
              const u = o.source.toJSON();
              n[a] = { src: u.url };
            } else
              o instanceof xn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Kn(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function qn(t) {
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
        o.push(Bt(u));
      }), n.material = o;
    } else
      n.material = Bt(e.material);
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
function q(t, n, a) {
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
function Mt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const o = new Jt(e);
      o.wrapS = Lt, o.wrapT = Lt, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class Wa extends gt {
  constructor() {
    super(...arguments);
    $(this, "scene");
  }
  getObject(a) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = qn(a);
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
    this.scene = a, zn(), rn(this.scene);
    const e = cn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
}
class Ha extends gt {
  constructor(a) {
    super(a);
    $(this, "bindCBs");
    $(this, "buttonCBs");
    $(this, "pane");
    $(this, "appCallbacks", 0);
    $(this, "editorCallbacks", 0);
    $(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Fn({ title: "GUI" }), this.pane.registerPlugin(Un);
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
    const c = this.bindID, s = o.onChange !== void 0 ? o.onChange : sn;
    this.bindCBs.set(c, s), this.app.editor ? (this.pane === void 0 && this.createGUI(), (u !== void 0 ? u : this.pane).addBinding(a, e, o).on("change", (p) => {
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
var $t;
function Zn() {
  if ($t)
    return Je;
  $t = 1;
  var t = nn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(s, d, p) {
    var h, b = {}, x = null, S = null;
    p !== void 0 && (x = "" + p), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (S = d.ref);
    for (h in d)
      e.call(d, h) && !u.hasOwnProperty(h) && (b[h] = d[h]);
    if (s && s.defaultProps)
      for (h in d = s.defaultProps, d)
        b[h] === void 0 && (b[h] = d[h]);
    return { $$typeof: n, type: s, key: x, ref: S, props: b, _owner: o.current };
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
    var t = nn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), O = Symbol.iterator, m = "@@iterator";
    function v(r) {
      if (r === null || typeof r != "object")
        return null;
      var f = O && r[O] || r[m];
      return typeof f == "function" ? f : null;
    }
    var y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(r) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), C = 1; C < f; C++)
          g[C - 1] = arguments[C];
        F("error", r, g);
      }
    }
    function F(r, f, g) {
      {
        var C = y.ReactDebugCurrentFrame, M = C.getStackAddendum();
        M !== "" && (f += "%s", g = g.concat([M]));
        var k = g.map(function(R) {
          return String(R);
        });
        k.unshift("Warning: " + f), Function.prototype.apply.call(console[r], console, k);
      }
    }
    var V = !1, Z = !1, se = !1, Y = !1, fe = !1, j;
    j = Symbol.for("react.module.reference");
    function D(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === u || fe || r === o || r === p || r === h || Y || r === S || V || Z || se || typeof r == "object" && r !== null && (r.$$typeof === x || r.$$typeof === b || r.$$typeof === c || r.$$typeof === s || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === j || r.getModuleId !== void 0));
    }
    function z(r, f, g) {
      var C = r.displayName;
      if (C)
        return C;
      var M = f.displayName || f.name || "";
      return M !== "" ? g + "(" + M + ")" : g;
    }
    function ce(r) {
      return r.displayName || "Context";
    }
    function ae(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
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
        case p:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case s:
            var f = r;
            return ce(f) + ".Consumer";
          case c:
            var g = r;
            return ce(g._context) + ".Provider";
          case d:
            return z(r, r.render, "ForwardRef");
          case b:
            var C = r.displayName || null;
            return C !== null ? C : ae(r.type) || "Memo";
          case x: {
            var M = r, k = M._payload, R = M._init;
            try {
              return ae(R(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var le = Object.assign, re = 0, Me, Ge, Pe, je, Ve, nt, Ye;
    function at() {
    }
    at.__reactDisabledLog = !0;
    function bt() {
      {
        if (re === 0) {
          Me = console.log, Ge = console.info, Pe = console.warn, je = console.error, Ve = console.group, nt = console.groupCollapsed, Ye = console.groupEnd;
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
        re++;
      }
    }
    function yt() {
      {
        if (re--, re === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: le({}, r, {
              value: Me
            }),
            info: le({}, r, {
              value: Ge
            }),
            warn: le({}, r, {
              value: Pe
            }),
            error: le({}, r, {
              value: je
            }),
            group: le({}, r, {
              value: Ve
            }),
            groupCollapsed: le({}, r, {
              value: nt
            }),
            groupEnd: le({}, r, {
              value: Ye
            })
          });
        }
        re < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ze = y.ReactCurrentDispatcher, We;
    function Ee(r, f, g) {
      {
        if (We === void 0)
          try {
            throw Error();
          } catch (M) {
            var C = M.stack.trim().match(/\n( *(at )?)/);
            We = C && C[1] || "";
          }
        return `
` + We + r;
      }
    }
    var _e = !1, xe;
    {
      var Et = typeof WeakMap == "function" ? WeakMap : Map;
      xe = new Et();
    }
    function rt(r, f) {
      if (!r || _e)
        return "";
      {
        var g = xe.get(r);
        if (g !== void 0)
          return g;
      }
      var C;
      _e = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = ze.current, ze.current = null, bt();
      try {
        if (f) {
          var R = function() {
            throw Error();
          };
          if (Object.defineProperty(R.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(R, []);
            } catch (pe) {
              C = pe;
            }
            Reflect.construct(r, [], R);
          } else {
            try {
              R.call();
            } catch (pe) {
              C = pe;
            }
            r.call(R.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (pe) {
            C = pe;
          }
          r();
        }
      } catch (pe) {
        if (pe && C && typeof pe.stack == "string") {
          for (var T = pe.stack.split(`
`), K = C.stack.split(`
`), U = T.length - 1, B = K.length - 1; U >= 1 && B >= 0 && T[U] !== K[B]; )
            B--;
          for (; U >= 1 && B >= 0; U--, B--)
            if (T[U] !== K[B]) {
              if (U !== 1 || B !== 1)
                do
                  if (U--, B--, B < 0 || T[U] !== K[B]) {
                    var ie = `
` + T[U].replace(" at new ", " at ");
                    return r.displayName && ie.includes("<anonymous>") && (ie = ie.replace("<anonymous>", r.displayName)), typeof r == "function" && xe.set(r, ie), ie;
                  }
                while (U >= 1 && B >= 0);
              break;
            }
        }
      } finally {
        _e = !1, ze.current = k, yt(), Error.prepareStackTrace = M;
      }
      var Ie = r ? r.displayName || r.name : "", Nt = Ie ? Ee(Ie) : "";
      return typeof r == "function" && xe.set(r, Nt), Nt;
    }
    function it(r, f, g) {
      return rt(r, !1);
    }
    function ot(r) {
      var f = r.prototype;
      return !!(f && f.isReactComponent);
    }
    function we(r, f, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return rt(r, ot(r));
      if (typeof r == "string")
        return Ee(r);
      switch (r) {
        case p:
          return Ee("Suspense");
        case h:
          return Ee("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return it(r.render);
          case b:
            return we(r.type, f, g);
          case x: {
            var C = r, M = C._payload, k = C._init;
            try {
              return we(k(M), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var ke = Object.prototype.hasOwnProperty, st = {}, He = y.ReactDebugCurrentFrame;
    function ge(r) {
      if (r) {
        var f = r._owner, g = we(r.type, r._source, f ? f.type : null);
        He.setExtraStackFrame(g);
      } else
        He.setExtraStackFrame(null);
    }
    function Ce(r, f, g, C, M) {
      {
        var k = Function.call.bind(ke);
        for (var R in r)
          if (k(r, R)) {
            var T = void 0;
            try {
              if (typeof r[R] != "function") {
                var K = Error((C || "React class") + ": " + g + " type `" + R + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[R] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              T = r[R](f, R, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (U) {
              T = U;
            }
            T && !(T instanceof Error) && (ge(M), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, R, typeof T), ge(null)), T instanceof Error && !(T.message in st) && (st[T.message] = !0, ge(M), w("Failed %s type: %s", g, T.message), ge(null));
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
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ct(r)), lt(r);
    }
    var ve = y.ReactCurrentOwner, wt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, dt, qe, ue;
    ue = {};
    function i(r) {
      if (ke.call(r, "ref")) {
        var f = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function E(r) {
      if (ke.call(r, "key")) {
        var f = Object.getOwnPropertyDescriptor(r, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function P(r, f) {
      if (typeof r.ref == "string" && ve.current && f && ve.current.stateNode !== f) {
        var g = ae(ve.current.type);
        ue[g] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ae(ve.current.type), r.ref), ue[g] = !0);
      }
    }
    function _(r, f) {
      {
        var g = function() {
          dt || (dt = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function W(r, f) {
      {
        var g = function() {
          qe || (qe = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var de = function(r, f, g, C, M, k, R) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: f,
        ref: g,
        props: R,
        // Record the component responsible for creating this element.
        _owner: k
      };
      return T._store = {}, Object.defineProperty(T._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(T, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function J(r, f, g, C, M) {
      {
        var k, R = {}, T = null, K = null;
        g !== void 0 && (ut(g), T = "" + g), E(f) && (ut(f.key), T = "" + f.key), i(f) && (K = f.ref, P(f, M));
        for (k in f)
          ke.call(f, k) && !wt.hasOwnProperty(k) && (R[k] = f[k]);
        if (r && r.defaultProps) {
          var U = r.defaultProps;
          for (k in U)
            R[k] === void 0 && (R[k] = U[k]);
        }
        if (T || K) {
          var B = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          T && _(R, B), K && W(R, B);
        }
        return de(r, T, K, M, C, ve.current, R);
      }
    }
    var ft = y.ReactCurrentOwner, ht = y.ReactDebugCurrentFrame;
    function he(r) {
      if (r) {
        var f = r._owner, g = we(r.type, r._source, f ? f.type : null);
        ht.setExtraStackFrame(g);
      } else
        ht.setExtraStackFrame(null);
    }
    var Q;
    Q = !1;
    function ee(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function De() {
      {
        if (ft.current) {
          var r = ae(ft.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Se(r) {
      {
        if (r !== void 0) {
          var f = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var be = {};
    function Ae(r) {
      {
        var f = De();
        if (!f) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function Dt(r, f) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = Ae(f);
        if (be[g])
          return;
        be[g] = !0;
        var C = "";
        r && r._owner && r._owner !== ft.current && (C = " It was passed a child from " + ae(r._owner.type) + "."), he(r), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), he(null);
      }
    }
    function At(r, f) {
      {
        if (typeof r != "object")
          return;
        if (Ke(r))
          for (var g = 0; g < r.length; g++) {
            var C = r[g];
            ee(C) && Dt(C, f);
          }
        else if (ee(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var M = v(r);
          if (typeof M == "function" && M !== r.entries)
            for (var k = M.call(r), R; !(R = k.next()).done; )
              ee(R.value) && Dt(R.value, f);
        }
      }
    }
    function fn(r) {
      {
        var f = r.type;
        if (f == null || typeof f == "string")
          return;
        var g;
        if (typeof f == "function")
          g = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === b))
          g = f.propTypes;
        else
          return;
        if (g) {
          var C = ae(f);
          Ce(g, r.props, "prop", C, r);
        } else if (f.PropTypes !== void 0 && !Q) {
          Q = !0;
          var M = ae(f);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function hn(r) {
      {
        for (var f = Object.keys(r.props), g = 0; g < f.length; g++) {
          var C = f[g];
          if (C !== "children" && C !== "key") {
            he(r), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), he(null);
            break;
          }
        }
        r.ref !== null && (he(r), w("Invalid attribute `ref` supplied to `React.Fragment`."), he(null));
      }
    }
    function It(r, f, g, C, M, k) {
      {
        var R = D(r);
        if (!R) {
          var T = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = Se(M);
          K ? T += K : T += De();
          var U;
          r === null ? U = "null" : Ke(r) ? U = "array" : r !== void 0 && r.$$typeof === n ? (U = "<" + (ae(r.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : U = typeof r, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", U, T);
        }
        var B = J(r, f, g, M, k);
        if (B == null)
          return B;
        if (R) {
          var ie = f.children;
          if (ie !== void 0)
            if (C)
              if (Ke(ie)) {
                for (var Ie = 0; Ie < ie.length; Ie++)
                  At(ie[Ie], r);
                Object.freeze && Object.freeze(ie);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              At(ie, r);
        }
        return r === e ? hn(B) : fn(B), B;
      }
    }
    function pn(r, f, g) {
      return It(r, f, g, !0);
    }
    function mn(r, f, g) {
      return It(r, f, g, !1);
    }
    var gn = mn, vn = pn;
    Qe.Fragment = e, Qe.jsx = gn, Qe.jsxs = vn;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? Pt.exports = Zn() : Pt.exports = Jn();
var l = Pt.exports;
function ln(t) {
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
  return /* @__PURE__ */ l.jsx(an.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    ea,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Qn })
  ] }) }, t.title);
}
function na(t) {
  const [n, a] = ne(!1), [e, o] = ne(t.options), u = (p) => {
    t.onDragComplete(p), o(p);
  }, c = (p) => {
    const h = [...e];
    h.splice(p, 1), u(h);
  }, s = [];
  e.forEach((p, h) => {
    s.push(/* @__PURE__ */ l.jsx(ta, { index: h, title: p, onDelete: c }, p));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(ln, { title: t.title }),
    /* @__PURE__ */ l.jsx(an.Group, { axis: "y", values: e, onReorder: u, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function aa(t) {
  const [n, a] = ne(!1), e = [];
  t.options.map((u, c) => {
    t.onSelect !== void 0 && (u.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(ra, { option: u }, c));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(ln, { title: t.title }),
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
  const { option: n } = t, [a, e] = ne("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        na,
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
    var d, p, h, b, x, S, O, m, v;
    let s;
    switch (c.event) {
      case "custom":
        I.dispatchEvent({ type: N.CUSTOM, value: c.data });
        break;
      case "selectComponent":
        I.dispatchEvent({ type: N.SELECT_DROPDOWN, value: c.data });
        break;
      case "draggableListUpdate":
        I.dispatchEvent({ type: N.DRAG_UPDATE, value: c.data });
        break;
      case "addFolder":
        (d = t.components.get("debug")) == null || d.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (p = t.components.get("debug")) == null || p.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (h = t.components.get("debug")) == null || h.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (b = t.components.get("debug")) == null || b.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (x = t.components.get("debug")) == null || x.triggerButton(c.data.id);
        break;
      case "setSheet":
        s = (S = t.components.get("theatre")) == null ? void 0 : S.sheets.get(c.data.sheet), s !== void 0 && (n = s, Ze.setSelection([s]));
        break;
      case "setSheetObject":
        s = (O = t.components.get("theatre")) == null ? void 0 : O.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), s !== void 0 && Ze.setSelection([s]);
        break;
      case "updateSheetObject":
        s = (m = t.components.get("theatre")) == null ? void 0 : m.sheetObjectCBs.get(c.data.sheetObject), s !== void 0 && s(c.data.values);
        break;
      case "updateTimeline":
        n = (v = t.components.get("theatre")) == null ? void 0 : v.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
        break;
      case "getObject":
        I.dispatchEvent({ type: N.GET_OBJECT, value: c.data });
        break;
      case "updateObject":
        I.dispatchEvent({ type: N.UPDATE_OBJECT, value: c.data });
        break;
      case "createTexture":
        I.dispatchEvent({ type: N.CREATE_TEXTURE, value: c.data });
        break;
      case "requestMethod":
        I.dispatchEvent({ type: N.REQUEST_METHOD, value: c.data });
        break;
    }
  }
  function e(c) {
    switch (c.event) {
      case "custom":
        I.dispatchEvent({ type: N.CUSTOM, value: c.data });
        break;
      case "setObject":
        I.dispatchEvent({ type: N.SET_OBJECT, value: c.data });
        break;
      case "setScene":
        I.dispatchEvent({ type: N.SET_SCENE, value: c.data });
        break;
    }
  }
  function o() {
    Ze.ui.hide();
  }
  function u() {
    Ze.ui.restore(), Ze.onSelectionChange((p) => {
      p.length < 1 || p.forEach((h) => {
        var O;
        let b = h.address.sheetId, x = "setSheet", S = {};
        switch (h.type) {
          case "Theatre_Sheet_PublicAPI":
            x = "setSheet", S = {
              sheet: h.address.sheetId
            }, n = (O = t.components.get("theatre")) == null ? void 0 : O.sheets.get(h.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            x = "setSheetObject", b += `_${h.address.objectKey}`, S = {
              id: b,
              sheet: h.address.sheetId,
              key: h.address.objectKey
            };
            break;
        }
        t.send({ event: x, target: "app", data: S });
      });
    });
    let c = 0;
    const s = () => {
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
      s(), requestAnimationFrame(d);
    };
    s(), d();
  }
  t.listen((c) => {
    t.editor ? e(c) : a(c);
  }), t.editor ? u() : o();
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
class sa extends Qt {
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
      vertexShader: ia,
      fragmentShader: oa,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ca extends Sn {
  constructor() {
    const a = new sa();
    super(new On(2, 2), a);
    $(this, "gridMaterial");
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
class da extends Qt {
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
  const [n, a] = ne(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
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
function un(t) {
  const [n, a] = ne(!1), e = t.child.children.length > 0, o = [];
  return t.child.children.length > 0 && t.child.children.map((u) => {
    o.push(/* @__PURE__ */ l.jsx(un, { child: u, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Hn(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random());
}
function fa(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(un, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const ha = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function pa(t) {
  return "items" in t;
}
function $e(t) {
  function n(e, o) {
    console.log("onChange:", e, o);
  }
  const a = [];
  return t.items.forEach((e) => {
    pa(e) ? a.push(
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
  }), /* @__PURE__ */ l.jsx(jt, { label: t.title, open: !1, children: a });
}
function ma(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Oe(t) {
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
        o.onload = function(u) {
          n(u.target.result);
        }, o.readAsDataURL(e);
      }
    }), t.click();
  });
}
function Vt(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!ma(o))
      continue;
    const u = typeof t[o], c = t[o];
    if (u === "boolean" || u === "number" || u === "string") {
      const s = {
        title: Oe(o),
        prop: o,
        type: u,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (d, p) => {
          var b;
          a.updateObject(n.uuid, `material.${d}`, p), u === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const h = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
          h !== void 0 && q(h, `material.${d}`, p);
        }
      };
      ga(o) && (s.value = Number(c), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01), e.push(s);
    } else if (u === "object")
      if (c.isColor)
        e.push({
          title: Oe(o),
          prop: o,
          type: "color",
          value: c,
          onChange: (s, d) => {
            var b;
            const p = new kt(d);
            a.updateObject(n.uuid, `material.${s}`, p);
            const h = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
            h !== void 0 && q(h, `material.${s}`, p);
          }
        });
      else if (Array.isArray(c)) {
        const s = [];
        for (const d in c)
          s.push({
            title: `${d}`,
            type: `${typeof c[d]}`,
            value: c[d],
            onChange: (p, h) => {
              var x;
              a.updateObject(n.uuid, `material.${o}`, h);
              const b = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && q(b, `material.${o}`, h);
            }
          });
        e.push({
          title: Oe(o),
          items: s
        });
      } else {
        const s = [];
        for (const d in c) {
          const p = c[d];
          switch (typeof p) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: Oe(o),
                type: "image",
                value: p,
                onChange: (b, x) => {
                  var O;
                  a.createTexture(n.uuid, `material.${o}`, x);
                  const S = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && Mt(x).then((m) => {
                    q(S, `material.${o}`, m), q(S, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${Oe(d)}`,
                prop: `material.${o}.${d}`,
                type: `${typeof t[o][d]}`,
                value: c[d],
                onChange: (b, x) => {
                  var O;
                  a.updateObject(n.uuid, `material.${o}.${d}`, x);
                  const S = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && q(S, `material.${o}.${d}`, x);
                }
              });
              break;
            case "object":
              p.value !== void 0 && p.value.src !== void 0 ? s.push({
                title: Oe(d),
                type: "image",
                value: p.value.src,
                onChange: (b, x) => {
                  var O;
                  a.createTexture(n.uuid, `material.${o}.${d}.value`, x);
                  const S = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && Mt(x).then((m) => {
                    q(S, `material.${o}.${d}.value`, m);
                  });
                }
              }) : s.push({
                title: d,
                type: `${typeof p.value}`,
                value: p.value,
                onChange: (b, x) => {
                  var O;
                  a.updateObject(n.uuid, `material.${o}.${d}.value`, x);
                  const S = (O = a.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && q(S, `material.${o}.${d}.value`, x);
                }
              });
              break;
          }
        }
        s.length > 0 && e.push({
          title: Oe(o),
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
function ba(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let u = 0; u < o; u++)
      e.push(
        /* @__PURE__ */ l.jsx(
          $e,
          {
            title: `Material ${u}`,
            items: Vt(a[u], t, n)
          },
          `Material ${u}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      $e,
      {
        title: "Material",
        items: Vt(a, t, n)
      }
    );
}
function et(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Yn(t.value));
  const [a, e] = ne(n), o = ye(null), u = ye(null), c = ye(null);
  Be(() => {
    var F;
    let h = !1, b = -1, x = 0, S = Number(a);
    const O = (V) => {
      h = !0, x = S, b = V.clientX;
    }, m = (V) => {
      if (!h)
        return;
      const Z = t.step !== void 0 ? t.step : 1, se = (V.clientX - b) * Z;
      S = Number((x + se).toFixed(4)), u.current !== null && (u.current.value = S.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, S);
    }, v = () => {
      h = !1;
    }, y = () => {
      h = !1;
    }, w = t.type === "number";
    return w && ((F = o.current) == null || F.addEventListener("mousedown", O, !1), document.addEventListener("mouseup", v, !1), document.addEventListener("mousemove", m, !1), document.addEventListener("contextmenu", y, !1)), () => {
      var V;
      w && ((V = o.current) == null || V.removeEventListener("mousedown", O), document.removeEventListener("mouseup", v), document.removeEventListener("mousemove", m), document.removeEventListener("contextmenu", y));
    };
  }, [a]);
  const s = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = s || t.type === "image", p = (h) => {
    let b = h.target.value;
    t.type === "boolean" && (b = h.target.checked), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: t.title }, "fieldLabel"),
    t.type === "string" && !s && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: p,
        value: a
      }
    ),
    t.type === "string" && s && /* @__PURE__ */ l.jsx(
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
        ref: u,
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
      va().then((h) => {
        c.current.src = h, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, h);
      });
    }, src: a.length > 0 ? a : ha })
  ] });
}
function Yt(t) {
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
        title: Yt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, u) => {
          var s;
          n.updateObject(t.uuid, o, u), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (q(c, o, u), c.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: Yt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, u) => {
          var s;
          n.updateObject(t.uuid, o, u), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (q(c, o, u), c.updateProjectionMatrix());
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
const Ea = Math.PI / 180, xa = 180 / Math.PI;
function wa(t) {
  return t * Ea;
}
function St(t) {
  return t * xa;
}
function Ca(t, n) {
  const a = new Tn();
  a.elements = t.matrix;
  const e = new L(), o = new Rn(), u = new L();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), u.setFromMatrixScale(a));
  const c = (d, p) => {
    var b;
    n.updateObject(t.uuid, d, p);
    const h = (b = n.scene) == null ? void 0 : b.getObjectByProperty("uuid", t.uuid);
    h !== void 0 && q(h, d, p);
  }, s = (d, p) => {
    c(d, wa(p));
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
function zt(t) {
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
        title: zt(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (u, c) => {
          var p;
          const s = new kt(c);
          n.updateObject(t.uuid, u, s);
          const d = (p = n.scene) == null ? void 0 : p.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && q(d, u, s);
        }
      }) : a.push({
        title: zt(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (u, c) => {
          var d;
          n.updateObject(t.uuid, u, c);
          const s = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          s !== void 0 && q(s, u, c);
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
function Oa(t) {
  const [n, a] = ne(-1), [e, o] = ne({
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
  Be(() => {
    function c(s) {
      const d = s.value;
      o(d), a(Date.now());
    }
    return I.addEventListener(N.SET_OBJECT, c), () => {
      I.removeEventListener(N.SET_OBJECT, c);
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
            var p;
            t.three.updateObject(e.uuid, c, s);
            const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", e.uuid);
            d !== void 0 && q(d, c, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Ca(e, t.three),
      u.search("camera") > -1 ? ya(e, t.three) : null,
      u.search("light") > -1 ? Sa(e, t.three) : null,
      u.search("mesh") > -1 ? ba(e, t.three) : null
    ] })
  ] }) }, n);
}
class Xa extends Bn {
  constructor(a) {
    super(a);
    $(this, "three");
    // Private
    $(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      scene: a.scene !== void 0 ? a.scene : null
    }, this.three = a.three, I.addEventListener(N.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    I.removeEventListener(N.SET_SCENE, this.setScene);
  }
  render() {
    var o;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(o = this.componentState.scene) == null ? void 0 : o.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SceneHierarchy", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(jt, { label: e, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: a && /* @__PURE__ */ l.jsx(fa, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(jt, { label: "Inspector", children: /* @__PURE__ */ l.jsx(Oa, { three: this.three }, "Inspector") })
    ] }) }, "SceneHierarchy");
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
  const a = (s) => {
    var p;
    if (!n())
      return;
    const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", s.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (s, d, p) => {
    var b;
    if (!n())
      return;
    const h = (b = t.three.scene) == null ? void 0 : b.getObjectByProperty("uuid", s);
    h !== void 0 && q(h, d, p);
  }, o = (s) => {
    if (!n())
      return;
    const d = s.value, { key: p, value: h, uuid: b } = d;
    e(b, p, h);
  }, u = (s) => {
    if (!n())
      return;
    const d = s.value;
    Mt(d.value).then((p) => {
      e(d.uuid, d.key, p), e(d.uuid, "material.needsUpdate", !0);
    });
  }, c = (s) => {
    var x;
    if (!n())
      return;
    const { key: d, uuid: p, value: h } = s.value, b = (x = t.three.scene) == null ? void 0 : x.getObjectByProperty("uuid", p);
    if (b !== void 0)
      try {
        b[d](h);
      } catch (S) {
        console.log("Error requesting method:"), console.log(S), console.log(d), console.log(h);
      }
  };
  return Be(() => (I.addEventListener(N.GET_OBJECT, a), I.addEventListener(N.UPDATE_OBJECT, o), I.addEventListener(N.CREATE_TEXTURE, u), I.addEventListener(N.REQUEST_METHOD, c), () => {
    I.removeEventListener(N.GET_OBJECT, a), I.removeEventListener(N.UPDATE_OBJECT, o), I.removeEventListener(N.CREATE_TEXTURE, u), I.removeEventListener(N.REQUEST_METHOD, c);
  }), []), null;
}
const Wt = { type: "change" }, Ot = { type: "start" }, Ht = { type: "end" }, pt = new Mn(), Kt = new Pn(), Ta = Math.cos(70 * jn.DEG2RAD);
class Ra extends Zt {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new L(), this.cursor = new L(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ne.ROTATE, MIDDLE: Ne.DOLLY, RIGHT: Ne.PAN }, this.touches = { ONE: Le.ROTATE, TWO: Le.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
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
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Wt), e.update(), u = o.NONE;
    }, this.update = function() {
      const i = new L(), E = new Ft().setFromUnitVectors(n.up, new L(0, 1, 0)), P = E.clone().invert(), _ = new L(), W = new Ft(), de = new L(), J = 2 * Math.PI;
      return function(ht = null) {
        const he = e.object.position;
        i.copy(he).sub(e.target), i.applyQuaternion(E), s.setFromVector3(i), e.autoRotate && u === o.NONE && z(j(ht)), e.enableDamping ? (s.theta += d.theta * e.dampingFactor, s.phi += d.phi * e.dampingFactor) : (s.theta += d.theta, s.phi += d.phi);
        let Q = e.minAzimuthAngle, ee = e.maxAzimuthAngle;
        isFinite(Q) && isFinite(ee) && (Q < -Math.PI ? Q += J : Q > Math.PI && (Q -= J), ee < -Math.PI ? ee += J : ee > Math.PI && (ee -= J), Q <= ee ? s.theta = Math.max(Q, Math.min(ee, s.theta)) : s.theta = s.theta > (Q + ee) / 2 ? Math.max(Q, s.theta) : Math.min(ee, s.theta)), s.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, s.phi)), s.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(h, e.dampingFactor) : e.target.add(h), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && se || e.object.isOrthographicCamera ? s.radius = je(s.radius) : s.radius = je(s.radius * p), i.setFromSpherical(s), i.applyQuaternion(P), he.copy(e.target).add(i), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, h.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), h.set(0, 0, 0));
        let De = !1;
        if (e.zoomToCursor && se) {
          let Se = null;
          if (e.object.isPerspectiveCamera) {
            const be = i.length();
            Se = je(be * p);
            const Ae = be - Se;
            e.object.position.addScaledVector(V, Ae), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const be = new L(Z.x, Z.y, 0);
            be.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), De = !0;
            const Ae = new L(Z.x, Z.y, 0);
            Ae.unproject(e.object), e.object.position.sub(Ae).add(be), e.object.updateMatrixWorld(), Se = i.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Se !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Se).add(e.object.position) : (pt.origin.copy(e.object.position), pt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(pt.direction)) < Ta ? n.lookAt(e.target) : (Kt.setFromNormalAndCoplanarPoint(e.object.up, e.target), pt.intersectPlane(Kt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), De = !0);
        return p = 1, se = !1, De || _.distanceToSquared(e.object.position) > c || 8 * (1 - W.dot(e.object.quaternion)) > c || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Wt), _.copy(e.object.position), W.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", ve), e.domElement.removeEventListener("pointerdown", He), e.domElement.removeEventListener("pointercancel", Ce), e.domElement.removeEventListener("wheel", ct), e.domElement.removeEventListener("pointermove", ge), e.domElement.removeEventListener("pointerup", Ce), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Xe), e._domElementKeyEvents = null);
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
    const c = 1e-6, s = new Ut(), d = new Ut();
    let p = 1;
    const h = new L(), b = new oe(), x = new oe(), S = new oe(), O = new oe(), m = new oe(), v = new oe(), y = new oe(), w = new oe(), F = new oe(), V = new L(), Z = new oe();
    let se = !1;
    const Y = [], fe = {};
    function j(i) {
      return i !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * i : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function D(i) {
      const E = Math.abs(i) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * E);
    }
    function z(i) {
      d.theta -= i;
    }
    function ce(i) {
      d.phi -= i;
    }
    const ae = function() {
      const i = new L();
      return function(P, _) {
        i.setFromMatrixColumn(_, 0), i.multiplyScalar(-P), h.add(i);
      };
    }(), le = function() {
      const i = new L();
      return function(P, _) {
        e.screenSpacePanning === !0 ? i.setFromMatrixColumn(_, 1) : (i.setFromMatrixColumn(_, 0), i.crossVectors(e.object.up, i)), i.multiplyScalar(P), h.add(i);
      };
    }(), re = function() {
      const i = new L();
      return function(P, _) {
        const W = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const de = e.object.position;
          i.copy(de).sub(e.target);
          let J = i.length();
          J *= Math.tan(e.object.fov / 2 * Math.PI / 180), ae(2 * P * J / W.clientHeight, e.object.matrix), le(2 * _ * J / W.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (ae(P * (e.object.right - e.object.left) / e.object.zoom / W.clientWidth, e.object.matrix), le(_ * (e.object.top - e.object.bottom) / e.object.zoom / W.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Me(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ge(i) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= i : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Pe(i, E) {
      if (!e.zoomToCursor)
        return;
      se = !0;
      const P = e.domElement.getBoundingClientRect(), _ = i - P.left, W = E - P.top, de = P.width, J = P.height;
      Z.x = _ / de * 2 - 1, Z.y = -(W / J) * 2 + 1, V.set(Z.x, Z.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function je(i) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, i));
    }
    function Ve(i) {
      b.set(i.clientX, i.clientY);
    }
    function nt(i) {
      Pe(i.clientX, i.clientX), y.set(i.clientX, i.clientY);
    }
    function Ye(i) {
      O.set(i.clientX, i.clientY);
    }
    function at(i) {
      x.set(i.clientX, i.clientY), S.subVectors(x, b).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      z(2 * Math.PI * S.x / E.clientHeight), ce(2 * Math.PI * S.y / E.clientHeight), b.copy(x), e.update();
    }
    function bt(i) {
      w.set(i.clientX, i.clientY), F.subVectors(w, y), F.y > 0 ? Me(D(F.y)) : F.y < 0 && Ge(D(F.y)), y.copy(w), e.update();
    }
    function yt(i) {
      m.set(i.clientX, i.clientY), v.subVectors(m, O).multiplyScalar(e.panSpeed), re(v.x, v.y), O.copy(m), e.update();
    }
    function ze(i) {
      Pe(i.clientX, i.clientY), i.deltaY < 0 ? Ge(D(i.deltaY)) : i.deltaY > 0 && Me(D(i.deltaY)), e.update();
    }
    function We(i) {
      let E = !1;
      switch (i.code) {
        case e.keys.UP:
          i.ctrlKey || i.metaKey || i.shiftKey ? ce(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : re(0, e.keyPanSpeed), E = !0;
          break;
        case e.keys.BOTTOM:
          i.ctrlKey || i.metaKey || i.shiftKey ? ce(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : re(0, -e.keyPanSpeed), E = !0;
          break;
        case e.keys.LEFT:
          i.ctrlKey || i.metaKey || i.shiftKey ? z(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : re(e.keyPanSpeed, 0), E = !0;
          break;
        case e.keys.RIGHT:
          i.ctrlKey || i.metaKey || i.shiftKey ? z(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : re(-e.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (i.preventDefault(), e.update());
    }
    function Ee(i) {
      if (Y.length === 1)
        b.set(i.pageX, i.pageY);
      else {
        const E = ue(i), P = 0.5 * (i.pageX + E.x), _ = 0.5 * (i.pageY + E.y);
        b.set(P, _);
      }
    }
    function _e(i) {
      if (Y.length === 1)
        O.set(i.pageX, i.pageY);
      else {
        const E = ue(i), P = 0.5 * (i.pageX + E.x), _ = 0.5 * (i.pageY + E.y);
        O.set(P, _);
      }
    }
    function xe(i) {
      const E = ue(i), P = i.pageX - E.x, _ = i.pageY - E.y, W = Math.sqrt(P * P + _ * _);
      y.set(0, W);
    }
    function Et(i) {
      e.enableZoom && xe(i), e.enablePan && _e(i);
    }
    function rt(i) {
      e.enableZoom && xe(i), e.enableRotate && Ee(i);
    }
    function it(i) {
      if (Y.length == 1)
        x.set(i.pageX, i.pageY);
      else {
        const P = ue(i), _ = 0.5 * (i.pageX + P.x), W = 0.5 * (i.pageY + P.y);
        x.set(_, W);
      }
      S.subVectors(x, b).multiplyScalar(e.rotateSpeed);
      const E = e.domElement;
      z(2 * Math.PI * S.x / E.clientHeight), ce(2 * Math.PI * S.y / E.clientHeight), b.copy(x);
    }
    function ot(i) {
      if (Y.length === 1)
        m.set(i.pageX, i.pageY);
      else {
        const E = ue(i), P = 0.5 * (i.pageX + E.x), _ = 0.5 * (i.pageY + E.y);
        m.set(P, _);
      }
      v.subVectors(m, O).multiplyScalar(e.panSpeed), re(v.x, v.y), O.copy(m);
    }
    function we(i) {
      const E = ue(i), P = i.pageX - E.x, _ = i.pageY - E.y, W = Math.sqrt(P * P + _ * _);
      w.set(0, W), F.set(0, Math.pow(w.y / y.y, e.zoomSpeed)), Me(F.y), y.copy(w);
      const de = (i.pageX + E.x) * 0.5, J = (i.pageY + E.y) * 0.5;
      Pe(de, J);
    }
    function ke(i) {
      e.enableZoom && we(i), e.enablePan && ot(i);
    }
    function st(i) {
      e.enableZoom && we(i), e.enableRotate && it(i);
    }
    function He(i) {
      e.enabled !== !1 && (Y.length === 0 && (e.domElement.setPointerCapture(i.pointerId), e.domElement.addEventListener("pointermove", ge), e.domElement.addEventListener("pointerup", Ce)), wt(i), i.pointerType === "touch" ? lt(i) : xt(i));
    }
    function ge(i) {
      e.enabled !== !1 && (i.pointerType === "touch" ? ut(i) : Ke(i));
    }
    function Ce(i) {
      dt(i), Y.length === 0 && (e.domElement.releasePointerCapture(i.pointerId), e.domElement.removeEventListener("pointermove", ge), e.domElement.removeEventListener("pointerup", Ce)), e.dispatchEvent(Ht), u = o.NONE;
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
        case Ne.DOLLY:
          if (e.enableZoom === !1)
            return;
          nt(i), u = o.DOLLY;
          break;
        case Ne.ROTATE:
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
        case Ne.PAN:
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
      u !== o.NONE && e.dispatchEvent(Ot);
    }
    function Ke(i) {
      switch (u) {
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
      e.enabled === !1 || e.enableZoom === !1 || u !== o.NONE || (i.preventDefault(), e.dispatchEvent(Ot), ze(i), e.dispatchEvent(Ht));
    }
    function Xe(i) {
      e.enabled === !1 || e.enablePan === !1 || We(i);
    }
    function lt(i) {
      switch (qe(i), Y.length) {
        case 1:
          switch (e.touches.ONE) {
            case Le.ROTATE:
              if (e.enableRotate === !1)
                return;
              Ee(i), u = o.TOUCH_ROTATE;
              break;
            case Le.PAN:
              if (e.enablePan === !1)
                return;
              _e(i), u = o.TOUCH_PAN;
              break;
            default:
              u = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Le.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              Et(i), u = o.TOUCH_DOLLY_PAN;
              break;
            case Le.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              rt(i), u = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              u = o.NONE;
          }
          break;
        default:
          u = o.NONE;
      }
      u !== o.NONE && e.dispatchEvent(Ot);
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
          ke(i), e.update();
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
    function ve(i) {
      e.enabled !== !1 && i.preventDefault();
    }
    function wt(i) {
      Y.push(i.pointerId);
    }
    function dt(i) {
      delete fe[i.pointerId];
      for (let E = 0; E < Y.length; E++)
        if (Y[E] == i.pointerId) {
          Y.splice(E, 1);
          return;
        }
    }
    function qe(i) {
      let E = fe[i.pointerId];
      E === void 0 && (E = new oe(), fe[i.pointerId] = E), E.set(i.pageX, i.pageY);
    }
    function ue(i) {
      const E = i.pointerId === Y[0] ? Y[1] : Y[0];
      return fe[E];
    }
    e.domElement.addEventListener("contextmenu", ve), e.domElement.addEventListener("pointerdown", He), e.domElement.addEventListener("pointercancel", Ce), e.domElement.addEventListener("wheel", ct, { passive: !1 }), this.update();
  }
}
const _t = (t) => {
  const [n, a] = ne(!1), [e, o] = ne(t.options[t.index]), u = () => {
    a(!n);
  }, c = (s) => {
    s !== e && (t.onSelect(s), o(s)), a(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: u, children: e }),
    n && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => c(s), children: s }, s)) })
  ] });
}, Te = $n(function(n, a) {
  const e = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable" }),
    /* @__PURE__ */ l.jsx(_t, { index: e, options: n.options, onSelect: n.onSelect, up: !0 })
  ] });
}), Xt = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], X = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Map();
function Re(t, n) {
  const a = new en(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), X.set(t, a), a;
}
Re("Top", new L(0, 1e3, 0));
Re("Bottom", new L(0, -1e3, 0));
Re("Left", new L(-1e3, 0, 0));
Re("Right", new L(1e3, 0, 0));
Re("Front", new L(0, 0, 1e3));
Re("Back", new L(0, 0, -1e3));
Re("Orthographic", new L(1e3, 1e3, 1e3));
const vt = new Tt(60, 1, 50, 3e3);
vt.name = "Debug";
vt.position.set(500, 500, 500);
vt.lookAt(0, 0, 0);
X.set("Debug", vt);
const qt = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ma = new _n(), Pa = new kn(), ja = new da(), _a = new Dn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let mt = "Renderer";
const A = new tn();
A.name = "Debug Scene";
let tt = new tn();
A.add(tt);
const ka = new ca();
A.add(ka);
const dn = new An(500);
dn.name = "axisHelper";
A.add(dn);
let G = X.get("Debug"), te = X.get("Orthographic"), Fe = X.get("Front"), Ue = X.get("Top");
function Za(t) {
  const [n, a] = ne(t.mode !== void 0 ? t.mode : "Quad"), [e, o] = ne(null), u = ye(null), c = ye(null), s = ye(null), d = ye(null), p = ye(null), h = (m, v) => {
    const y = H.get(m.name);
    y !== void 0 && y.dispose(), H.delete(m.name);
    const w = me.get(m.name);
    w !== void 0 && (A.remove(w), w.dispose()), me.delete(m.name);
    const F = new Ra(m, v);
    switch (F.enableDamping = !0, F.dampingFactor = 0.05, m.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        F.enableRotate = !1;
        break;
    }
    if (H.set(m.name, F), m instanceof Tt) {
      const V = new Nn(m);
      me.set(m.name, V), A.add(V);
    }
  }, b = (m) => {
    const v = me.get(m.name);
    v !== void 0 && (A.remove(v), v.dispose(), me.delete(m.name));
    const y = H.get(m.name);
    y !== void 0 && (y.dispose(), H.delete(m.name));
  }, x = () => {
    H.forEach((m, v) => {
      m.dispose();
      const y = me.get(v);
      y !== void 0 && (A.remove(y), y.dispose()), me.delete(v), H.delete(v);
    }), H.clear(), me.clear();
  }, S = () => {
    switch (n) {
      case "Single":
        h(G, c.current);
        break;
      case "Side by Side":
      case "Stacked":
        h(G, c.current), h(te, s.current);
        break;
      case "Quad":
        h(G, c.current), h(te, s.current), h(Fe, d.current), h(Ue, p.current);
        break;
    }
  };
  Be(() => {
    const m = new In({
      canvas: u.current,
      stencil: !1
    });
    m.autoClear = !1, m.shadowMap.enabled = !0, m.setPixelRatio(devicePixelRatio), m.setClearColor(0), o(m);
  }, []), Be(() => {
    const m = () => {
      on(tt), A.remove(tt), t.three.scene !== void 0 && (tt = t.three.scene, A.add(tt));
    };
    return I.addEventListener(N.SET_SCENE, m), () => {
      I.removeEventListener(N.SET_SCENE, m);
    };
  }, []), Be(() => {
    if (e === null)
      return;
    let m = window.innerWidth, v = window.innerHeight, y = Math.floor(m / 2), w = Math.floor(v / 2), F = -1;
    const V = () => {
      m = window.innerWidth - 300, v = window.innerHeight, y = Math.floor(m / 2), w = Math.floor(v / 2), e.setSize(m, v);
      let j = m, D = v;
      switch (n) {
        case "Side by Side":
          j = y, D = v;
          break;
        case "Stacked":
          j = m, D = w;
          break;
        case "Quad":
          j = y, D = w;
          break;
      }
      X.forEach((z) => {
        var ce;
        z instanceof en ? (z.left = j / -2, z.right = j / 2, z.top = D / 2, z.bottom = D / -2, z.updateProjectionMatrix()) : z instanceof Tt && (z.aspect = j / D, z.updateProjectionMatrix(), (ce = me.get(z.name)) == null || ce.update());
      });
    }, Z = () => {
      e.setViewport(0, 0, m, v), e.setScissor(0, 0, m, v), e.render(A, G);
    }, se = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, y, v), e.setScissor(0, 0, y, v), e.render(A, G), e.setViewport(y, 0, y, v), e.setScissor(y, 0, y, v), e.render(A, te);
      else {
        const j = v - w;
        e.setViewport(0, j, m, w), e.setScissor(0, j, m, w), e.render(A, G), e.setViewport(0, 0, m, w), e.setScissor(0, 0, m, w), e.render(A, te);
      }
    }, Y = () => {
      let j = 0, D = 0;
      D = v - w, j = 0, e.setViewport(j, D, y, w), e.setScissor(j, D, y, w), e.render(A, G), j = y, e.setViewport(j, D, y, w), e.setScissor(j, D, y, w), e.render(A, te), D = 0, j = 0, e.setViewport(j, D, y, w), e.setScissor(j, D, y, w), e.render(A, Fe), j = y, e.setViewport(j, D, y, w), e.setScissor(j, D, y, w), e.render(A, Ue);
    }, fe = () => {
      switch (H.forEach((j) => {
        j.update();
      }), e.clear(), n) {
        case "Single":
          Z();
          break;
        case "Side by Side":
        case "Stacked":
          se();
          break;
        case "Quad":
          Y();
          break;
      }
      F = requestAnimationFrame(fe);
    };
    return S(), window.addEventListener("resize", V), V(), fe(), () => {
      window.removeEventListener("resize", V), cancelAnimationFrame(F), F = -1;
    };
  }, [n, e]);
  const O = [];
  return X.forEach((m, v) => {
    O.push(v);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: u }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Te, { camera: G, options: O, ref: c, onSelect: (m) => {
        var y;
        (y = H.get(G.name)) == null || y.dispose();
        const v = X.get(m);
        v !== void 0 && (b(G), G = v, h(v, c.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Te, { camera: G, options: O, ref: c, onSelect: (m) => {
          var y;
          (y = H.get(G.name)) == null || y.dispose();
          const v = X.get(m);
          v !== void 0 && (b(G), G = v, h(v, c.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: te, options: O, ref: s, onSelect: (m) => {
          var y;
          (y = H.get(te.name)) == null || y.dispose();
          const v = X.get(m);
          v !== void 0 && (b(te), te = v, h(v, s.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Te, { camera: G, options: O, ref: c, onSelect: (m) => {
          var y;
          (y = H.get(G.name)) == null || y.dispose();
          const v = X.get(m);
          v !== void 0 && (b(G), G = v, h(v, c.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: te, options: O, ref: s, onSelect: (m) => {
          var y;
          (y = H.get(te.name)) == null || y.dispose();
          const v = X.get(m);
          v !== void 0 && (b(te), te = v, h(v, s.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: Fe, options: O, ref: d, onSelect: (m) => {
          var y;
          (y = H.get(Fe.name)) == null || y.dispose();
          const v = X.get(m);
          v !== void 0 && (b(Fe), Fe = v, h(v, d.current));
        } }),
        /* @__PURE__ */ l.jsx(Te, { camera: Ue, options: O, ref: p, onSelect: (m) => {
          var y;
          (y = H.get(Ue.name)) == null || y.dispose();
          const v = X.get(m);
          v !== void 0 && (b(Ue), Ue = v, h(v, p.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        _t,
        {
          index: Xt.indexOf(n),
          options: Xt,
          onSelect: (m) => {
            m !== n && (x(), a(m));
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        _t,
        {
          index: qt.indexOf(mt),
          options: qt,
          onSelect: (m) => {
            if (m !== mt)
              switch (mt = m, mt) {
                case "Depth":
                  A.overrideMaterial = Ma;
                  break;
                case "Normals":
                  A.overrideMaterial = Pa;
                  break;
                default:
                case "Renderer":
                  A.overrideMaterial = null;
                  break;
                case "Wireframe":
                  A.overrideMaterial = _a;
                  break;
                case "UVs":
                  A.overrideMaterial = ja;
                  break;
              }
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
  Va as Application,
  gt as BaseRemote,
  un as ChildObject,
  fa as ContainerObject,
  na as Draggable,
  ta as DraggableItem,
  aa as Dropdown,
  ra as DropdownItem,
  Ja as Editor,
  ca as InfiniteGridHelper,
  Oa as Inspector,
  Za as MultiView,
  ln as NavButton,
  Ya as RemoteComponents,
  Ka as RemoteController,
  za as RemoteTheatre,
  Wa as RemoteThree,
  Ha as RemoteTweakpane,
  Xa as SceneHierarchy,
  qa as SceneInspector,
  N as ToolEvents,
  da as UVMaterial,
  Ba as clamp,
  Yn as colorToHex,
  I as debugDispatcher,
  on as dispose,
  Wn as disposeMaterial,
  Ga as disposeTexture,
  $a as distance,
  rn as hierarchyUUID,
  Vn as isColor,
  Gn as randomID,
  zn as resetThreeObjects,
  Ct as round,
  Rt as totalThreeObjects
};
