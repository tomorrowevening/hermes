var on = Object.defineProperty;
var sn = (t, n, r) => n in t ? on(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[n] = r;
var $ = (t, n, r) => (sn(t, typeof n != "symbol" ? n + "" : n, r), r);
import { EventDispatcher as Gt, Texture as Yt, CubeTexture as cn, RepeatWrapping as Pt, Color as Ct, Matrix4 as ln, Vector3 as G, Euler as un, Ray as dn, Plane as fn, MathUtils as hn, MOUSE as De, TOUCH as _e, Quaternion as Rt, Spherical as jt, Vector2 as ae, ShaderMaterial as pn, GLSL3 as mn, DoubleSide as gn, Mesh as vn, PlaneGeometry as bn, PerspectiveCamera as bt, MeshNormalMaterial as yn, MeshBasicMaterial as En, Scene as wn, AxesHelper as xn, OrthographicCamera as Vt, CameraHelper as Cn } from "three";
import { getProject as Sn } from "@theatre/core";
import { Pane as On } from "tweakpane";
import * as Tn from "@tweakpane/plugin-essentials";
import zt, { useState as re, useRef as Se, useEffect as qe, Component as Mn, forwardRef as Pn } from "react";
import { Reorder as Wt } from "framer-motion";
import We from "@theatre/studio";
function va(t, n, r) {
  return Math.min(n, Math.max(t, r));
}
function ba(t, n) {
  const r = t - n;
  return Math.sqrt(r * r);
}
function Rn() {
  return Math.round(Math.random() * 1e6).toString();
}
function jn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function kn(t) {
  const n = Math.round(t.r * 255), r = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (l) => {
    const h = l.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, d = i(n), c = i(r), s = i(e);
  return "#" + d + c + s;
}
let kt = 0;
const Ht = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${kt}`), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, kt++, t.children.forEach((r) => {
    Ht(r);
  });
};
class ya {
  constructor(n, r, e) {
    $(this, "channel");
    $(this, "components", /* @__PURE__ */ new Map());
    // Protected
    $(this, "_mode", "app");
    this.editor = r && document.location.hash.search(e) > -1, r && (this.channel = new BroadcastChannel(n));
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
const A = new Gt(), N = {
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
class lt {
  constructor(n) {
    $(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class Ea extends lt {
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
const Kt = () => {
};
class wa extends lt {
  constructor(r, e, i) {
    super(r);
    $(this, "project");
    $(this, "sheets");
    $(this, "sheetObjects");
    $(this, "sheetObjectCBs");
    $(this, "sheetObjectUnsubscribe");
    this.project = Sn(e, i), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(r) {
    var i;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let e = this.sheets.get(r);
    return e !== void 0 || (e = (i = this.project) == null ? void 0 : i.sheet(r), this.sheets.set(r, e)), e;
  }
  sheetObject(r, e, i, d) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheets.get(r);
    if (c === void 0)
      return;
    const s = `${r}_${e}`;
    let l = this.sheetObjects.get(s);
    if (l !== void 0)
      return l = c.object(e, { ...i, ...l.value }, { reconfigure: !0 }), l;
    l = c.object(e, i), this.sheetObjects.set(s, l), this.sheetObjectCBs.set(s, d !== void 0 ? d : Kt);
    const h = l.onValuesChange((p) => {
      if (this.app.editor) {
        for (const g in p) {
          const E = p[g];
          typeof E == "object" && jn(E) && (p[g] = {
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
            sheetObject: s,
            values: p
          }
        });
      } else {
        const g = this.sheetObjectCBs.get(s);
        g !== void 0 && g(p);
      }
    });
    return this.sheetObjectUnsubscribe.set(s, h), l;
  }
  unsubscribe(r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = `${r.address.sheetId}_${r.address.objectKey}`, i = this.sheetObjectUnsubscribe.get(e);
    i !== void 0 && i();
  }
}
function Dn(t) {
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
function Xt(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((r) => {
    n.children.push(Xt(r));
  }), n;
}
function _n(t) {
  const n = {};
  for (const r in t) {
    const e = t[r].value;
    n[r] = { value: e }, e === null ? n[r].value = { src: "" } : e.isTexture && (n[r].value = { src: e.image.src });
  }
  return n;
}
function In(t) {
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
function Dt(t) {
  const n = {};
  for (const r in t) {
    if (r.substring(0, 1) === "_" || r.substring(0, 2) === "is" || In(r))
      continue;
    const e = typeof t[r], i = t[r];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[r] = i;
        break;
      case "object":
        if (i !== null)
          if (n[r] = i, i.isTexture)
            if (i instanceof Yt) {
              const d = i.source.toJSON();
              n[r] = { src: d.url };
            } else
              i instanceof cn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[r] = { src: "" });
          else
            r === "uniforms" && (n[r] = _n(n[r]));
        else
          n[r] = { src: "" };
        break;
    }
  }
  return n;
}
function An(t) {
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
  }, r = t.type.toLowerCase();
  if (r.search("mesh") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((d) => {
        i.push(Dt(d));
      }), n.material = i;
    } else
      n.material = Dt(e.material);
  } else
    r.search("camera") > -1 ? t.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
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
    }) : r.search("light") > -1 && (n.lightInfo = {
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
function Z(t, n, r) {
  const e = n.split(".");
  switch (e.length) {
    case 1:
      t[e[0]] = r;
      break;
    case 2:
      t[e[0]][e[1]] = r;
      break;
    case 3:
      t[e[0]][e[1]][e[2]] = r;
      break;
    case 4:
      t[e[0]][e[1]][e[2]][e[3]] = r;
      break;
    case 5:
      t[e[0]][e[1]][e[2]][e[3]][e[4]] = r;
      break;
  }
}
function yt(t) {
  return new Promise((n, r) => {
    const e = new Image();
    e.onload = () => {
      const i = new Yt(e);
      i.wrapS = Pt, i.wrapT = Pt, i.needsUpdate = !0, n(i);
    }, e.onerror = r, e.src = t;
  });
}
class xa extends lt {
  constructor() {
    super(...arguments);
    $(this, "scene");
  }
  getObject(r) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: r
    });
  }
  setObject(r) {
    const e = An(r);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(r, e, i) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: r,
        key: e,
        value: i
      }
    });
  }
  updateObject(r, e, i) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: r,
        key: e,
        value: i
      }
    });
  }
  createTexture(r, e, i) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: r,
        key: e,
        value: i
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
    this.scene = r, Ht(r);
    const e = Xt(r);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
}
class Ca extends lt {
  constructor(r) {
    super(r);
    $(this, "bindCBs");
    $(this, "buttonCBs");
    $(this, "pane");
    $(this, "appCallbacks", 0);
    $(this, "editorCallbacks", 0);
    $(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), r.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new On({ title: "GUI" }), this.pane.registerPlugin(Tn);
  }
  dispose() {
    var r;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((r = this.pane) == null || r.dispose(), this.pane = void 0);
  }
  addFolder(r, e = void 0, i = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addFolder({
        title: r,
        ...e
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: r,
        params: e,
        parent: i
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(r, e, i, d = void 0) {
    const c = this.bindID, s = i.onChange !== void 0 ? i.onChange : Kt;
    this.bindCBs.set(c, s), this.app.editor ? (this.pane === void 0 && this.createGUI(), (d !== void 0 ? d : this.pane).addBinding(r, e, i).on("change", (h) => {
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
        params: i,
        parent: d
      }
    }), this.appCallbacks++);
  }
  triggerBind(r, e) {
    const i = this.bindCBs.get(r);
    i !== void 0 ? i(e) : console.warn(`No callback for: ${r}`, e);
  }
  // Buttons
  button(r, e, i = void 0) {
    const d = this.bindID;
    this.buttonCBs.set(d, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addButton({ title: r }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: d
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: d,
        name: r,
        callback: e,
        parent: i
      }
    }), this.appCallbacks++);
  }
  triggerButton(r) {
    const e = this.buttonCBs.get(r);
    e !== void 0 && e();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const r = this.inspectorFolder.children.length - 1;
    for (let e = r; e > -1; --e)
      this.inspectorFolder.remove(this.inspectorFolder.children[e]);
  }
}
var Et = { exports: {} }, He = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _t;
function Nn() {
  if (_t)
    return He;
  _t = 1;
  var t = zt, n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(s, l, h) {
    var p, g = {}, E = null, C = null;
    h !== void 0 && (E = "" + h), l.key !== void 0 && (E = "" + l.key), l.ref !== void 0 && (C = l.ref);
    for (p in l)
      e.call(l, p) && !d.hasOwnProperty(p) && (g[p] = l[p]);
    if (s && s.defaultProps)
      for (p in l = s.defaultProps, l)
        g[p] === void 0 && (g[p] = l[p]);
    return { $$typeof: n, type: s, key: E, ref: C, props: g, _owner: i.current };
  }
  return He.Fragment = r, He.jsx = c, He.jsxs = c, He;
}
var Ke = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var It;
function Ln() {
  return It || (It = 1, process.env.NODE_ENV !== "production" && function() {
    var t = zt, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), P = Symbol.iterator, D = "@@iterator";
    function y(a) {
      if (a === null || typeof a != "object")
        return null;
      var f = P && a[P] || a[D];
      return typeof f == "function" ? f : null;
    }
    var b = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(a) {
      {
        for (var f = arguments.length, m = new Array(f > 1 ? f - 1 : 0), x = 1; x < f; x++)
          m[x - 1] = arguments[x];
        O("error", a, m);
      }
    }
    function O(a, f, m) {
      {
        var x = b.ReactDebugCurrentFrame, k = x.getStackAddendum();
        k !== "" && (f += "%s", m = m.concat([k]));
        var _ = m.map(function(M) {
          return String(M);
        });
        _.unshift("Warning: " + f), Function.prototype.apply.call(console[a], console, _);
      }
    }
    var R = !1, z = !1, ee = !1, T = !1, le = !1, Te;
    Te = Symbol.for("react.module.reference");
    function oe(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === e || a === d || le || a === i || a === h || a === p || T || a === C || R || z || ee || typeof a == "object" && a !== null && (a.$$typeof === E || a.$$typeof === g || a.$$typeof === c || a.$$typeof === s || a.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === Te || a.getModuleId !== void 0));
    }
    function j(a, f, m) {
      var x = a.displayName;
      if (x)
        return x;
      var k = f.displayName || f.name || "";
      return k !== "" ? m + "(" + k + ")" : m;
    }
    function I(a) {
      return a.displayName || "Context";
    }
    function L(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case e:
          return "Fragment";
        case r:
          return "Portal";
        case d:
          return "Profiler";
        case i:
          return "StrictMode";
        case h:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case s:
            var f = a;
            return I(f) + ".Consumer";
          case c:
            var m = a;
            return I(m._context) + ".Provider";
          case l:
            return j(a, a.render, "ForwardRef");
          case g:
            var x = a.displayName || null;
            return x !== null ? x : L(a.type) || "Memo";
          case E: {
            var k = a, _ = k._payload, M = k._init;
            try {
              return L(M(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, te = 0, Me, Ae, Ne, Pe, Le, Ze, Fe;
    function Je() {
    }
    Je.__reactDisabledLog = !0;
    function dt() {
      {
        if (te === 0) {
          Me = console.log, Ae = console.info, Ne = console.warn, Pe = console.error, Le = console.group, Ze = console.groupCollapsed, Fe = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: Je,
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
        te++;
      }
    }
    function ft() {
      {
        if (te--, te === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, a, {
              value: Me
            }),
            info: J({}, a, {
              value: Ae
            }),
            warn: J({}, a, {
              value: Ne
            }),
            error: J({}, a, {
              value: Pe
            }),
            group: J({}, a, {
              value: Le
            }),
            groupCollapsed: J({}, a, {
              value: Ze
            }),
            groupEnd: J({}, a, {
              value: Fe
            })
          });
        }
        te < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ue = b.ReactCurrentDispatcher, Be;
    function me(a, f, m) {
      {
        if (Be === void 0)
          try {
            throw Error();
          } catch (k) {
            var x = k.stack.trim().match(/\n( *(at )?)/);
            Be = x && x[1] || "";
          }
        return `
` + Be + a;
      }
    }
    var Re = !1, ge;
    {
      var ht = typeof WeakMap == "function" ? WeakMap : Map;
      ge = new ht();
    }
    function Qe(a, f) {
      if (!a || Re)
        return "";
      {
        var m = ge.get(a);
        if (m !== void 0)
          return m;
      }
      var x;
      Re = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = Ue.current, Ue.current = null, dt();
      try {
        if (f) {
          var M = function() {
            throw Error();
          };
          if (Object.defineProperty(M.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(M, []);
            } catch (se) {
              x = se;
            }
            Reflect.construct(a, [], M);
          } else {
            try {
              M.call();
            } catch (se) {
              x = se;
            }
            a.call(M.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (se) {
            x = se;
          }
          a();
        }
      } catch (se) {
        if (se && x && typeof se.stack == "string") {
          for (var S = se.stack.split(`
`), X = x.stack.split(`
`), B = S.length - 1, Y = X.length - 1; B >= 1 && Y >= 0 && S[B] !== X[Y]; )
            Y--;
          for (; B >= 1 && Y >= 0; B--, Y--)
            if (S[B] !== X[Y]) {
              if (B !== 1 || Y !== 1)
                do
                  if (B--, Y--, Y < 0 || S[B] !== X[Y]) {
                    var ne = `
` + S[B].replace(" at new ", " at ");
                    return a.displayName && ne.includes("<anonymous>") && (ne = ne.replace("<anonymous>", a.displayName)), typeof a == "function" && ge.set(a, ne), ne;
                  }
                while (B >= 1 && Y >= 0);
              break;
            }
        }
      } finally {
        Re = !1, Ue.current = _, ft(), Error.prepareStackTrace = k;
      }
      var ke = a ? a.displayName || a.name : "", Mt = ke ? me(ke) : "";
      return typeof a == "function" && ge.set(a, Mt), Mt;
    }
    function et(a, f, m) {
      return Qe(a, !1);
    }
    function tt(a) {
      var f = a.prototype;
      return !!(f && f.isReactComponent);
    }
    function ve(a, f, m) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Qe(a, tt(a));
      if (typeof a == "string")
        return me(a);
      switch (a) {
        case h:
          return me("Suspense");
        case p:
          return me("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case l:
            return et(a.render);
          case g:
            return ve(a.type, f, m);
          case E: {
            var x = a, k = x._payload, _ = x._init;
            try {
              return ve(_(k), f, m);
            } catch {
            }
          }
        }
      return "";
    }
    var je = Object.prototype.hasOwnProperty, nt = {}, $e = b.ReactDebugCurrentFrame;
    function ue(a) {
      if (a) {
        var f = a._owner, m = ve(a.type, a._source, f ? f.type : null);
        $e.setExtraStackFrame(m);
      } else
        $e.setExtraStackFrame(null);
    }
    function be(a, f, m, x, k) {
      {
        var _ = Function.call.bind(je);
        for (var M in a)
          if (_(a, M)) {
            var S = void 0;
            try {
              if (typeof a[M] != "function") {
                var X = Error((x || "React class") + ": " + m + " type `" + M + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[M] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw X.name = "Invariant Violation", X;
              }
              S = a[M](f, M, x, m, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (B) {
              S = B;
            }
            S && !(S instanceof Error) && (ue(k), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", m, M, typeof S), ue(null)), S instanceof Error && !(S.message in nt) && (nt[S.message] = !0, ue(k), v("Failed %s type: %s", m, S.message), ue(null));
          }
      }
    }
    var pt = Array.isArray;
    function Ge(a) {
      return pt(a);
    }
    function at(a) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, m = f && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return m;
      }
    }
    function Ye(a) {
      try {
        return rt(a), !1;
      } catch {
        return !0;
      }
    }
    function rt(a) {
      return "" + a;
    }
    function it(a) {
      if (Ye(a))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", at(a)), rt(a);
    }
    var de = b.ReactCurrentOwner, mt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ot, Ve, ye;
    ye = {};
    function o(a) {
      if (je.call(a, "ref")) {
        var f = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function w(a) {
      if (je.call(a, "key")) {
        var f = Object.getOwnPropertyDescriptor(a, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function F(a, f) {
      if (typeof a.ref == "string" && de.current && f && de.current.stateNode !== f) {
        var m = L(de.current.type);
        ye[m] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', L(de.current.type), a.ref), ye[m] = !0);
      }
    }
    function U(a, f) {
      {
        var m = function() {
          ot || (ot = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        m.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: m,
          configurable: !0
        });
      }
    }
    function K(a, f) {
      {
        var m = function() {
          Ve || (Ve = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        m.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: m,
          configurable: !0
        });
      }
    }
    var fe = function(a, f, m, x, k, _, M) {
      var S = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: a,
        key: f,
        ref: m,
        props: M,
        // Record the component responsible for creating this element.
        _owner: _
      };
      return S._store = {}, Object.defineProperty(S._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(S, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.defineProperty(S, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(S.props), Object.freeze(S)), S;
    };
    function ie(a, f, m, x, k) {
      {
        var _, M = {}, S = null, X = null;
        m !== void 0 && (it(m), S = "" + m), w(f) && (it(f.key), S = "" + f.key), o(f) && (X = f.ref, F(f, k));
        for (_ in f)
          je.call(f, _) && !mt.hasOwnProperty(_) && (M[_] = f[_]);
        if (a && a.defaultProps) {
          var B = a.defaultProps;
          for (_ in B)
            M[_] === void 0 && (M[_] = B[_]);
        }
        if (S || X) {
          var Y = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          S && U(M, Y), X && K(M, Y);
        }
        return fe(a, S, X, k, x, de.current, M);
      }
    }
    var st = b.ReactCurrentOwner, ze = b.ReactDebugCurrentFrame;
    function W(a) {
      if (a) {
        var f = a._owner, m = ve(a.type, a._source, f ? f.type : null);
        ze.setExtraStackFrame(m);
      } else
        ze.setExtraStackFrame(null);
    }
    var Q;
    Q = !1;
    function he(a) {
      return typeof a == "object" && a !== null && a.$$typeof === n;
    }
    function pe() {
      {
        if (st.current) {
          var a = L(st.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function Ee(a) {
      {
        if (a !== void 0) {
          var f = a.fileName.replace(/^.*[\\\/]/, ""), m = a.lineNumber;
          return `

Check your code at ` + f + ":" + m + ".";
        }
        return "";
      }
    }
    var we = {};
    function Jt(a) {
      {
        var f = pe();
        if (!f) {
          var m = typeof a == "string" ? a : a.displayName || a.name;
          m && (f = `

Check the top-level render call using <` + m + ">.");
        }
        return f;
      }
    }
    function St(a, f) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var m = Jt(f);
        if (we[m])
          return;
        we[m] = !0;
        var x = "";
        a && a._owner && a._owner !== st.current && (x = " It was passed a child from " + L(a._owner.type) + "."), W(a), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', m, x), W(null);
      }
    }
    function Ot(a, f) {
      {
        if (typeof a != "object")
          return;
        if (Ge(a))
          for (var m = 0; m < a.length; m++) {
            var x = a[m];
            he(x) && St(x, f);
          }
        else if (he(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var k = y(a);
          if (typeof k == "function" && k !== a.entries)
            for (var _ = k.call(a), M; !(M = _.next()).done; )
              he(M.value) && St(M.value, f);
        }
      }
    }
    function Qt(a) {
      {
        var f = a.type;
        if (f == null || typeof f == "string")
          return;
        var m;
        if (typeof f == "function")
          m = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === g))
          m = f.propTypes;
        else
          return;
        if (m) {
          var x = L(f);
          be(m, a.props, "prop", x, a);
        } else if (f.PropTypes !== void 0 && !Q) {
          Q = !0;
          var k = L(f);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function en(a) {
      {
        for (var f = Object.keys(a.props), m = 0; m < f.length; m++) {
          var x = f[m];
          if (x !== "children" && x !== "key") {
            W(a), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), W(null);
            break;
          }
        }
        a.ref !== null && (W(a), v("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    function Tt(a, f, m, x, k, _) {
      {
        var M = oe(a);
        if (!M) {
          var S = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var X = Ee(k);
          X ? S += X : S += pe();
          var B;
          a === null ? B = "null" : Ge(a) ? B = "array" : a !== void 0 && a.$$typeof === n ? (B = "<" + (L(a.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : B = typeof a, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", B, S);
        }
        var Y = ie(a, f, m, k, _);
        if (Y == null)
          return Y;
        if (M) {
          var ne = f.children;
          if (ne !== void 0)
            if (x)
              if (Ge(ne)) {
                for (var ke = 0; ke < ne.length; ke++)
                  Ot(ne[ke], a);
                Object.freeze && Object.freeze(ne);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ot(ne, a);
        }
        return a === e ? en(Y) : Qt(Y), Y;
      }
    }
    function tn(a, f, m) {
      return Tt(a, f, m, !0);
    }
    function nn(a, f, m) {
      return Tt(a, f, m, !1);
    }
    var an = nn, rn = tn;
    Ke.Fragment = e, Ke.jsx = an, Ke.jsxs = rn;
  }()), Ke;
}
process.env.NODE_ENV === "production" ? Et.exports = Nn() : Et.exports = Ln();
var u = Et.exports;
function qt(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ u.jsx("button", { children: t.title });
}
const Fn = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Un = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Bn(t) {
  return /* @__PURE__ */ u.jsx(Wt.Item, { value: t.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    Un,
    /* @__PURE__ */ u.jsx("span", { children: t.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Fn })
  ] }) }, t.title);
}
function $n(t) {
  const [n, r] = re(!1), [e, i] = re(t.options), d = (h) => {
    t.onDragComplete(h), i(h);
  }, c = (h) => {
    const p = [...e];
    p.splice(h, 1), d(p);
  }, s = [];
  e.forEach((h, p) => {
    s.push(/* @__PURE__ */ u.jsx(Bn, { index: p, title: h, onDelete: c }, h));
  });
  let l = "dropdown draggable";
  return t.subdropdown && (l += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: l, onMouseEnter: () => r(!0), onMouseLeave: () => r(!1), children: [
    /* @__PURE__ */ u.jsx(qt, { title: t.title }),
    /* @__PURE__ */ u.jsx(Wt.Group, { axis: "y", values: e, onReorder: d, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function Gn(t) {
  const [n, r] = re(!1), e = [];
  t.options.map((d, c) => {
    t.onSelect !== void 0 && (d.onSelect = t.onSelect), e.push(/* @__PURE__ */ u.jsx(Yn, { option: d }, c));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => r(!0),
      onMouseLeave: () => r(!1),
      children: [
        /* @__PURE__ */ u.jsx(qt, { title: t.title }),
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
function Yn(t) {
  const { option: n } = t, [r, e] = re("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ u.jsx(
        $n,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (d) => {
            n.onDragComplete !== void 0 && n.onDragComplete(d);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      i = /* @__PURE__ */ u.jsx(
        Gn,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      i = /* @__PURE__ */ u.jsx(
        "button",
        {
          onClick: () => {
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (r !== n.title ? e(n.title) : e(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ u.jsx("li", { className: r === n.title ? "selected" : "", children: i }, Rn());
}
function Sa(t) {
  let n;
  function r(c) {
    var l, h, p, g, E, C, P, D, y;
    let s;
    switch (c.event) {
      case "custom":
        A.dispatchEvent({ type: N.CUSTOM, value: c.data });
        break;
      case "selectComponent":
        A.dispatchEvent({ type: N.SELECT_DROPDOWN, value: c.data });
        break;
      case "draggableListUpdate":
        A.dispatchEvent({ type: N.DRAG_UPDATE, value: c.data });
        break;
      case "addFolder":
        (l = t.components.get("debug")) == null || l.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (h = t.components.get("debug")) == null || h.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (p = t.components.get("debug")) == null || p.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (g = t.components.get("debug")) == null || g.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (E = t.components.get("debug")) == null || E.triggerButton(c.data.id);
        break;
      case "setSheet":
        s = (C = t.components.get("theatre")) == null ? void 0 : C.sheets.get(c.data.sheet), s !== void 0 && (n = s, We.setSelection([s]));
        break;
      case "setSheetObject":
        s = (P = t.components.get("theatre")) == null ? void 0 : P.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), s !== void 0 && We.setSelection([s]);
        break;
      case "updateSheetObject":
        s = (D = t.components.get("theatre")) == null ? void 0 : D.sheetObjectCBs.get(c.data.sheetObject), s !== void 0 && s(c.data.values);
        break;
      case "updateTimeline":
        n = (y = t.components.get("theatre")) == null ? void 0 : y.sheets.get(c.data.sheet), n !== void 0 && (n.sequence.position = c.data.position);
        break;
      case "getScene":
        A.dispatchEvent({ type: N.GET_SCENE });
        break;
      case "getObject":
        A.dispatchEvent({ type: N.GET_OBJECT, value: c.data });
        break;
      case "updateObject":
        A.dispatchEvent({ type: N.UPDATE_OBJECT, value: c.data });
        break;
      case "createTexture":
        A.dispatchEvent({ type: N.CREATE_TEXTURE, value: c.data });
        break;
      case "requestMethod":
        A.dispatchEvent({ type: N.REQUEST_METHOD, value: c.data });
        break;
    }
  }
  function e(c) {
    switch (c.event) {
      case "custom":
        A.dispatchEvent({ type: N.CUSTOM, value: c.data });
        break;
      case "setObject":
        A.dispatchEvent({ type: N.SET_OBJECT, value: c.data });
        break;
      case "setScene":
        A.dispatchEvent({ type: N.SET_SCENE, value: c.data });
        break;
    }
  }
  function i() {
    We.ui.hide();
  }
  function d() {
    We.ui.restore(), We.onSelectionChange((h) => {
      h.length < 1 || h.forEach((p) => {
        var P;
        let g = p.address.sheetId, E = "setSheet", C = {};
        switch (p.type) {
          case "Theatre_Sheet_PublicAPI":
            E = "setSheet", C = {
              sheet: p.address.sheetId
            }, n = (P = t.components.get("theatre")) == null ? void 0 : P.sheets.get(p.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            E = "setSheetObject", g += `_${p.address.objectKey}`, C = {
              id: g,
              sheet: p.address.sheetId,
              key: p.address.objectKey
            };
            break;
        }
        t.send({ event: E, target: "app", data: C });
      });
    });
    let c = 0;
    const s = () => {
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
    }, l = () => {
      s(), requestAnimationFrame(l);
    };
    s(), l();
  }
  t.listen((c) => {
    t.editor ? e(c) : r(c);
  }), t.editor ? d() : i();
}
function wt(t) {
  const [n, r] = re(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const i = !n;
          t.onToggle !== void 0 && t.onToggle(i), r(i);
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
function Zt(t) {
  const [n, r] = re(!1), e = t.child.children.length > 0, i = [];
  return t.child.children.length > 0 && t.child.children.map((d) => {
    i.push(/* @__PURE__ */ u.jsx(Zt, { child: d, three: t.three }, Math.random()));
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
            r(!n);
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
      /* @__PURE__ */ u.jsx("div", { className: `icon ${Dn(t.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: i }) })
  ] }, Math.random());
}
function Vn(t) {
  const n = [];
  return t.child.children.map((r) => {
    n.push(/* @__PURE__ */ u.jsx(Zt, { child: r, three: t.three }, Math.random()));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const zn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Wn(t) {
  return "items" in t;
}
function Ie(t) {
  function n(e, i) {
    console.log("onChange:", e, i);
  }
  const r = [];
  return t.items.forEach((e) => {
    Wn(e) ? r.push(
      /* @__PURE__ */ u.jsx(Ie, { title: e.title, items: e.items }, Math.random())
    ) : r.push(
      /* @__PURE__ */ u.jsx(
        Xe,
        {
          title: e.title,
          prop: e.prop,
          value: e.value,
          type: e.type,
          min: e.min,
          max: e.max,
          step: e.step,
          disabled: e.disabled,
          onChange: (i, d) => {
            e.onChange !== void 0 ? e.onChange(i, d) : n(i, d);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ u.jsx(wt, { label: t.title, open: !1, children: r });
}
function Hn(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function xe(t) {
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
function Kn(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Xn() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, r) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        r();
      else {
        const e = t.files[0], i = new FileReader();
        i.onload = function(d) {
          n(d.target.result);
        }, i.readAsDataURL(e);
      }
    }), t.click();
  });
}
function At(t, n, r) {
  const e = [];
  for (const i in t) {
    if (!Hn(i))
      continue;
    const d = typeof t[i], c = t[i];
    if (d === "boolean" || d === "number" || d === "string") {
      const s = {
        title: xe(i),
        prop: i,
        type: d,
        value: c,
        min: void 0,
        max: void 0,
        onChange: (l, h) => {
          var g;
          r.updateObject(n.uuid, `material.${l}`, h), d === "boolean" && r.updateObject(n.uuid, "material.needsUpdate", !0);
          const p = (g = r.scene) == null ? void 0 : g.getObjectByProperty("uuid", n.uuid);
          p !== void 0 && Z(p, `material.${l}`, h);
        }
      };
      Kn(i) && (s.value = Number(c), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01), e.push(s);
    } else if (d === "object")
      if (c.isColor)
        e.push({
          title: xe(i),
          prop: i,
          type: "color",
          value: c,
          onChange: (s, l) => {
            var g;
            const h = new Ct(l);
            r.updateObject(n.uuid, `material.${s}`, h);
            const p = (g = r.scene) == null ? void 0 : g.getObjectByProperty("uuid", n.uuid);
            p !== void 0 && Z(p, `material.${s}`, h);
          }
        });
      else if (Array.isArray(c)) {
        const s = [];
        for (const l in c)
          s.push({
            title: `${l}`,
            type: `${typeof c[l]}`,
            value: c[l],
            onChange: (h, p) => {
              var E;
              r.updateObject(n.uuid, `material.${i}`, p);
              const g = (E = r.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
              g !== void 0 && Z(g, `material.${i}`, p);
            }
          });
        e.push({
          title: xe(i),
          items: s
        });
      } else {
        const s = [];
        for (const l in c) {
          const h = c[l];
          switch (typeof h) {
            case "boolean":
            case "number":
            case "string":
              l === "src" ? e.push({
                title: xe(i),
                type: "image",
                value: h,
                onChange: (g, E) => {
                  var P;
                  r.createTexture(n.uuid, `material.${i}`, E);
                  const C = (P = r.scene) == null ? void 0 : P.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && yt(E).then((D) => {
                    Z(C, `material.${i}`, D), Z(C, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${xe(l)}`,
                prop: `material.${i}.${l}`,
                type: `${typeof t[i][l]}`,
                value: c[l],
                onChange: (g, E) => {
                  var P;
                  r.updateObject(n.uuid, `material.${i}.${l}`, E);
                  const C = (P = r.scene) == null ? void 0 : P.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Z(C, `material.${i}.${l}`, E);
                }
              });
              break;
            case "object":
              h.value !== void 0 && h.value.src !== void 0 ? s.push({
                title: xe(l),
                type: "image",
                value: h.value.src,
                onChange: (g, E) => {
                  var P;
                  r.createTexture(n.uuid, `material.${i}.${l}.value`, E);
                  const C = (P = r.scene) == null ? void 0 : P.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && yt(E).then((D) => {
                    Z(C, `material.${i}.${l}.value`, D);
                  });
                }
              }) : s.push({
                title: l,
                type: `${typeof h.value}`,
                value: h.value,
                onChange: (g, E) => {
                  var P;
                  r.updateObject(n.uuid, `material.${i}.${l}.value`, E);
                  const C = (P = r.scene) == null ? void 0 : P.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Z(C, `material.${i}.${l}.value`, E);
                }
              });
              break;
          }
        }
        s.length > 0 && e.push({
          title: xe(i),
          items: s
        });
      }
    else
      c !== void 0 && console.log("other:", i, d, c);
  }
  return e.sort((i, d) => i.title < d.title ? -1 : i.title > d.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      r.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function qn(t, n) {
  const r = t.material;
  if (Array.isArray(r)) {
    const e = [], i = r.length;
    for (let d = 0; d < i; d++)
      e.push(
        /* @__PURE__ */ u.jsx(
          Ie,
          {
            title: `Material ${d}`,
            items: At(r[d], t, n)
          }
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: e });
  } else
    return /* @__PURE__ */ u.jsx(
      Ie,
      {
        title: "Material",
        items: At(r, t, n)
      }
    );
}
function Xe(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = kn(t.value));
  const [r, e] = re(n), i = Se(null), d = Se(null), c = Se(null);
  qe(() => {
    var O;
    let p = !1, g = -1, E = 0, C = Number(r);
    const P = (R) => {
      p = !0, E = C, g = R.clientX;
    }, D = (R) => {
      if (!p)
        return;
      const z = t.step !== void 0 ? t.step : 1, ee = (R.clientX - g) * z;
      C = Number((E + ee).toFixed(4)), d.current !== null && (d.current.value = C.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, C);
    }, y = () => {
      p = !1;
    }, b = () => {
      p = !1;
    }, v = t.type === "number";
    return v && ((O = i.current) == null || O.addEventListener("mousedown", P, !1), document.addEventListener("mouseup", y, !1), document.addEventListener("mousemove", D, !1), document.addEventListener("contextmenu", b, !1)), () => {
      var R;
      v && ((R = i.current) == null || R.removeEventListener("mousedown", P), document.removeEventListener("mouseup", y), document.removeEventListener("mousemove", D), document.removeEventListener("contextmenu", b));
    };
  }, [r]);
  const s = t.type === "string" && (r.length > 100 || r.search(`
`) > -1), l = s || t.type === "image", h = (p) => {
    let g = p.target.value;
    t.type === "boolean" && (g = p.target.checked), e(g), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, g);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${l ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: i, children: t.title }, "fieldLabel"),
    t.type === "string" && !s && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: h,
        value: r
      }
    ),
    t.type === "string" && s && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: h,
        value: r
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: h,
        checked: r
      }
    ),
    t.type === "number" && /* @__PURE__ */ u.jsx(
      "input",
      {
        ref: d,
        type: "number",
        value: r,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: h
      }
    ),
    t.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: r.toString(), onChange: h, className: "min" }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: r,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: h
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: r.toString(), onChange: h, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: r, onChange: h })
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
      Xn().then((p) => {
        c.current.src = p, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, p);
      });
    }, src: r.length > 0 ? r : zn })
  ] });
}
function Nt(t) {
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
function Zn(t, n) {
  const r = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      r.push({
        title: Nt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, d) => {
          var s;
          n.updateObject(t.uuid, i, d), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (Z(c, i, d), c.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      r.push({
        title: Nt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, d) => {
          var s;
          n.updateObject(t.uuid, i, d), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const c = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && (Z(c, i, d), c.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ u.jsx(
    Ie,
    {
      title: "Camera",
      items: r
    }
  );
}
function Jn(t, n) {
  const r = new ln();
  r.elements = t.matrix;
  const e = new G(), i = new un(), d = new G();
  t.uuid.length > 0 && (e.setFromMatrixPosition(r), i.setFromRotationMatrix(r), d.setFromMatrixScale(r));
  const c = (l, h) => {
    var g;
    n.updateObject(t.uuid, l, h);
    const p = (g = n.scene) == null ? void 0 : g.getObjectByProperty("uuid", t.uuid);
    p !== void 0 && Z(p, l, h);
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
          value: i.x,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: c
        },
        {
          title: "Y",
          prop: "rotation.y",
          type: "number",
          value: i.y,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: c
        },
        {
          title: "Z",
          prop: "rotation.z",
          type: "number",
          value: i.z,
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
          value: d.x,
          step: 0.01,
          onChange: c
        },
        {
          title: "Y",
          prop: "scale.y",
          type: "number",
          value: d.y,
          step: 0.01,
          onChange: c
        },
        {
          title: "Z",
          prop: "scale.z",
          type: "number",
          value: d.z,
          step: 0.01,
          onChange: c
        }
      ]
    }
  ];
  return /* @__PURE__ */ u.jsx(
    Ie,
    {
      title: "Transform",
      items: s
    }
  );
}
function Lt(t) {
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
function Qn(t, n) {
  const r = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const i = t.lightInfo[e];
      i !== void 0 && (i.isColor !== void 0 ? r.push({
        title: Lt(e),
        prop: e,
        type: "color",
        value: i,
        onChange: (d, c) => {
          var h;
          const s = new Ct(c);
          n.updateObject(t.uuid, d, s);
          const l = (h = n.scene) == null ? void 0 : h.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && Z(l, d, s);
        }
      }) : r.push({
        title: Lt(e),
        prop: e,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (d, c) => {
          var l;
          n.updateObject(t.uuid, d, c);
          const s = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          s !== void 0 && Z(s, d, c);
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Ie,
    {
      title: "Light",
      items: r
    }
  );
}
function ea(t) {
  const [n, r] = re(-1), [e, i] = re({
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
  qe(() => {
    function c(s) {
      const l = s.value;
      i(l), r(Date.now());
    }
    return A.addEventListener(N.SET_OBJECT, c), () => {
      A.removeEventListener(N.SET_OBJECT, c);
    };
  }, []);
  const d = e.type.toLowerCase();
  return /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: t.class, children: e.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        Xe,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: e.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        Xe,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: e.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        Xe,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: e.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        Xe,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: e.visible,
          onChange: (c, s) => {
            var h;
            t.three.updateObject(e.uuid, c, s);
            const l = (h = t.three.scene) == null ? void 0 : h.getObjectByProperty("uuid", e.uuid);
            l !== void 0 && Z(l, c, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      Jn(e, t.three),
      d.search("camera") > -1 ? Zn(e, t.three) : null,
      d.search("light") > -1 ? Qn(e, t.three) : null,
      d.search("mesh") > -1 ? qn(e, t.three) : null
    ] })
  ] }) }, n);
}
class Oa extends Mn {
  constructor(r) {
    super(r);
    $(this, "three");
    // Private
    $(this, "onRefresh", () => {
      this.three.getScene();
    });
    $(this, "setScene", (r) => {
      this.setState(() => ({
        scene: r.value
      }));
    });
    this.state = {
      scene: r.scene !== void 0 ? r.scene : null
    }, this.three = r.three, A.addEventListener(N.SET_SCENE, this.setScene);
  }
  componentDidMount() {
    this.onRefresh();
  }
  componentWillUnmount() {
    A.removeEventListener(N.SET_SCENE, this.setScene);
  }
  render() {
    var i;
    const r = this.componentState.scene !== null, e = "Hierarchy" + (r ? `: ${(i = this.componentState.scene) == null ? void 0 : i.name}` : "");
    return /* @__PURE__ */ u.jsx("div", { id: "SceneHierarchy", children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      r && /* @__PURE__ */ u.jsx(
        wt,
        {
          label: e,
          button: /* @__PURE__ */ u.jsx("button", { className: "icon refresh hideText", onClick: this.onRefresh, children: "Refresh" }),
          open: !0,
          children: /* @__PURE__ */ u.jsx(Vn, { child: this.componentState.scene, three: this.three })
        }
      ),
      /* @__PURE__ */ u.jsx(wt, { label: "Inspector", children: /* @__PURE__ */ u.jsx(ea, { three: this.three }, "Inspector") })
    ] }) }, "SceneHierarchy");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Ta(t) {
  const n = (s) => {
    const l = t.scene.getObjectByProperty("uuid", s.value);
    l !== void 0 && t.three.setObject(l);
  }, r = (s, l, h) => {
    const p = t.scene.getObjectByProperty("uuid", s);
    p !== void 0 && Z(p, l, h);
  }, e = (s) => {
    const l = s.value, { key: h, value: p, uuid: g } = l;
    r(g, h, p);
  }, i = (s) => {
    const l = s.value;
    yt(l.value).then((h) => {
      r(l.uuid, l.key, h), r(l.uuid, "material.needsUpdate", !0);
    });
  }, d = () => {
    t.three.setScene(t.scene);
  }, c = (s) => {
    const { key: l, uuid: h, value: p } = s.value, g = t.scene.getObjectByProperty("uuid", h);
    if (g !== void 0)
      try {
        g[l](p);
      } catch (E) {
        console.log("Error requesting method:"), console.log(E), console.log(l), console.log(p);
      }
  };
  return qe(() => (A.addEventListener(N.GET_OBJECT, n), A.addEventListener(N.GET_SCENE, d), A.addEventListener(N.UPDATE_OBJECT, e), A.addEventListener(N.CREATE_TEXTURE, i), A.addEventListener(N.REQUEST_METHOD, c), () => {
    A.removeEventListener(N.GET_OBJECT, n), A.removeEventListener(N.GET_SCENE, d), A.removeEventListener(N.UPDATE_OBJECT, e), A.removeEventListener(N.CREATE_TEXTURE, i), A.removeEventListener(N.REQUEST_METHOD, c);
  }), []), null;
}
const Ft = { type: "change" }, gt = { type: "start" }, Ut = { type: "end" }, ct = new dn(), Bt = new fn(), ta = Math.cos(70 * hn.DEG2RAD);
class na extends Gt {
  constructor(n, r) {
    super(), this.object = n, this.domElement = r, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new G(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: De.ROTATE, MIDDLE: De.DOLLY, RIGHT: De.PAN }, this.touches = { ONE: _e.ROTATE, TWO: _e.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", Ye), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Ye), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Ft), e.update(), d = i.NONE;
    }, this.update = function() {
      const o = new G(), w = new Rt().setFromUnitVectors(n.up, new G(0, 1, 0)), F = w.clone().invert(), U = new G(), K = new Rt(), fe = new G(), ie = 2 * Math.PI;
      return function() {
        const ze = e.object.position;
        o.copy(ze).sub(e.target), o.applyQuaternion(w), s.setFromVector3(o), e.autoRotate && d === i.NONE && j(Te()), e.enableDamping ? (s.theta += l.theta * e.dampingFactor, s.phi += l.phi * e.dampingFactor) : (s.theta += l.theta, s.phi += l.phi);
        let W = e.minAzimuthAngle, Q = e.maxAzimuthAngle;
        isFinite(W) && isFinite(Q) && (W < -Math.PI ? W += ie : W > Math.PI && (W -= ie), Q < -Math.PI ? Q += ie : Q > Math.PI && (Q -= ie), W <= Q ? s.theta = Math.max(W, Math.min(Q, s.theta)) : s.theta = s.theta > (W + Q) / 2 ? Math.max(W, s.theta) : Math.min(Q, s.theta)), s.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, s.phi)), s.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(p, e.dampingFactor) : e.target.add(p), e.zoomToCursor && ee || e.object.isOrthographicCamera ? s.radius = Pe(s.radius) : s.radius = Pe(s.radius * h), o.setFromSpherical(s), o.applyQuaternion(F), ze.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (l.theta *= 1 - e.dampingFactor, l.phi *= 1 - e.dampingFactor, p.multiplyScalar(1 - e.dampingFactor)) : (l.set(0, 0, 0), p.set(0, 0, 0));
        let he = !1;
        if (e.zoomToCursor && ee) {
          let pe = null;
          if (e.object.isPerspectiveCamera) {
            const Ee = o.length();
            pe = Pe(Ee * h);
            const we = Ee - pe;
            e.object.position.addScaledVector(R, we), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Ee = new G(z.x, z.y, 0);
            Ee.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix(), he = !0;
            const we = new G(z.x, z.y, 0);
            we.unproject(e.object), e.object.position.sub(we).add(Ee), e.object.updateMatrixWorld(), pe = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          pe !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(pe).add(e.object.position) : (ct.origin.copy(e.object.position), ct.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(ct.direction)) < ta ? n.lookAt(e.target) : (Bt.setFromNormalAndCoplanarPoint(e.object.up, e.target), ct.intersectPlane(Bt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix(), he = !0);
        return h = 1, ee = !1, he || U.distanceToSquared(e.object.position) > c || 8 * (1 - K.dot(e.object.quaternion)) > c || fe.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Ft), U.copy(e.object.position), K.copy(e.object.quaternion), fe.copy(e.target), he = !1, !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", de), e.domElement.removeEventListener("pointerdown", $e), e.domElement.removeEventListener("pointercancel", be), e.domElement.removeEventListener("wheel", at), e.domElement.removeEventListener("pointermove", ue), e.domElement.removeEventListener("pointerup", be), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Ye), e._domElementKeyEvents = null);
    };
    const e = this, i = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let d = i.NONE;
    const c = 1e-6, s = new jt(), l = new jt();
    let h = 1;
    const p = new G(), g = new ae(), E = new ae(), C = new ae(), P = new ae(), D = new ae(), y = new ae(), b = new ae(), v = new ae(), O = new ae(), R = new G(), z = new ae();
    let ee = !1;
    const T = [], le = {};
    function Te() {
      return 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function oe() {
      return Math.pow(0.95, e.zoomSpeed);
    }
    function j(o) {
      l.theta -= o;
    }
    function I(o) {
      l.phi -= o;
    }
    const L = function() {
      const o = new G();
      return function(F, U) {
        o.setFromMatrixColumn(U, 0), o.multiplyScalar(-F), p.add(o);
      };
    }(), J = function() {
      const o = new G();
      return function(F, U) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(U, 1) : (o.setFromMatrixColumn(U, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(F), p.add(o);
      };
    }(), te = function() {
      const o = new G();
      return function(F, U) {
        const K = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const fe = e.object.position;
          o.copy(fe).sub(e.target);
          let ie = o.length();
          ie *= Math.tan(e.object.fov / 2 * Math.PI / 180), L(2 * F * ie / K.clientHeight, e.object.matrix), J(2 * U * ie / K.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (L(F * (e.object.right - e.object.left) / e.object.zoom / K.clientWidth, e.object.matrix), J(U * (e.object.top - e.object.bottom) / e.object.zoom / K.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Me(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ae(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ne(o) {
      if (!e.zoomToCursor)
        return;
      ee = !0;
      const w = e.domElement.getBoundingClientRect(), F = o.clientX - w.left, U = o.clientY - w.top, K = w.width, fe = w.height;
      z.x = F / K * 2 - 1, z.y = -(U / fe) * 2 + 1, R.set(z.x, z.y, 1).unproject(n).sub(n.position).normalize();
    }
    function Pe(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function Le(o) {
      g.set(o.clientX, o.clientY);
    }
    function Ze(o) {
      Ne(o), b.set(o.clientX, o.clientY);
    }
    function Fe(o) {
      P.set(o.clientX, o.clientY);
    }
    function Je(o) {
      E.set(o.clientX, o.clientY), C.subVectors(E, g).multiplyScalar(e.rotateSpeed);
      const w = e.domElement;
      j(2 * Math.PI * C.x / w.clientHeight), I(2 * Math.PI * C.y / w.clientHeight), g.copy(E), e.update();
    }
    function dt(o) {
      v.set(o.clientX, o.clientY), O.subVectors(v, b), O.y > 0 ? Me(oe()) : O.y < 0 && Ae(oe()), b.copy(v), e.update();
    }
    function ft(o) {
      D.set(o.clientX, o.clientY), y.subVectors(D, P).multiplyScalar(e.panSpeed), te(y.x, y.y), P.copy(D), e.update();
    }
    function Ue(o) {
      Ne(o), o.deltaY < 0 ? Ae(oe()) : o.deltaY > 0 && Me(oe()), e.update();
    }
    function Be(o) {
      let w = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? I(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(0, e.keyPanSpeed), w = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? I(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(0, -e.keyPanSpeed), w = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? j(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(e.keyPanSpeed, 0), w = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? j(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(-e.keyPanSpeed, 0), w = !0;
          break;
      }
      w && (o.preventDefault(), e.update());
    }
    function me() {
      if (T.length === 1)
        g.set(T[0].pageX, T[0].pageY);
      else {
        const o = 0.5 * (T[0].pageX + T[1].pageX), w = 0.5 * (T[0].pageY + T[1].pageY);
        g.set(o, w);
      }
    }
    function Re() {
      if (T.length === 1)
        P.set(T[0].pageX, T[0].pageY);
      else {
        const o = 0.5 * (T[0].pageX + T[1].pageX), w = 0.5 * (T[0].pageY + T[1].pageY);
        P.set(o, w);
      }
    }
    function ge() {
      const o = T[0].pageX - T[1].pageX, w = T[0].pageY - T[1].pageY, F = Math.sqrt(o * o + w * w);
      b.set(0, F);
    }
    function ht() {
      e.enableZoom && ge(), e.enablePan && Re();
    }
    function Qe() {
      e.enableZoom && ge(), e.enableRotate && me();
    }
    function et(o) {
      if (T.length == 1)
        E.set(o.pageX, o.pageY);
      else {
        const F = ye(o), U = 0.5 * (o.pageX + F.x), K = 0.5 * (o.pageY + F.y);
        E.set(U, K);
      }
      C.subVectors(E, g).multiplyScalar(e.rotateSpeed);
      const w = e.domElement;
      j(2 * Math.PI * C.x / w.clientHeight), I(2 * Math.PI * C.y / w.clientHeight), g.copy(E);
    }
    function tt(o) {
      if (T.length === 1)
        D.set(o.pageX, o.pageY);
      else {
        const w = ye(o), F = 0.5 * (o.pageX + w.x), U = 0.5 * (o.pageY + w.y);
        D.set(F, U);
      }
      y.subVectors(D, P).multiplyScalar(e.panSpeed), te(y.x, y.y), P.copy(D);
    }
    function ve(o) {
      const w = ye(o), F = o.pageX - w.x, U = o.pageY - w.y, K = Math.sqrt(F * F + U * U);
      v.set(0, K), O.set(0, Math.pow(v.y / b.y, e.zoomSpeed)), Me(O.y), b.copy(v);
    }
    function je(o) {
      e.enableZoom && ve(o), e.enablePan && tt(o);
    }
    function nt(o) {
      e.enableZoom && ve(o), e.enableRotate && et(o);
    }
    function $e(o) {
      e.enabled !== !1 && (T.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", ue), e.domElement.addEventListener("pointerup", be)), mt(o), o.pointerType === "touch" ? rt(o) : pt(o));
    }
    function ue(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? it(o) : Ge(o));
    }
    function be(o) {
      ot(o), T.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", ue), e.domElement.removeEventListener("pointerup", be)), e.dispatchEvent(Ut), d = i.NONE;
    }
    function pt(o) {
      let w;
      switch (o.button) {
        case 0:
          w = e.mouseButtons.LEFT;
          break;
        case 1:
          w = e.mouseButtons.MIDDLE;
          break;
        case 2:
          w = e.mouseButtons.RIGHT;
          break;
        default:
          w = -1;
      }
      switch (w) {
        case De.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ze(o), d = i.DOLLY;
          break;
        case De.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            Fe(o), d = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Le(o), d = i.ROTATE;
          }
          break;
        case De.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Le(o), d = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Fe(o), d = i.PAN;
          }
          break;
        default:
          d = i.NONE;
      }
      d !== i.NONE && e.dispatchEvent(gt);
    }
    function Ge(o) {
      switch (d) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          Je(o);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          dt(o);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          ft(o);
          break;
      }
    }
    function at(o) {
      e.enabled === !1 || e.enableZoom === !1 || d !== i.NONE || (o.preventDefault(), e.dispatchEvent(gt), Ue(o), e.dispatchEvent(Ut));
    }
    function Ye(o) {
      e.enabled === !1 || e.enablePan === !1 || Be(o);
    }
    function rt(o) {
      switch (Ve(o), T.length) {
        case 1:
          switch (e.touches.ONE) {
            case _e.ROTATE:
              if (e.enableRotate === !1)
                return;
              me(), d = i.TOUCH_ROTATE;
              break;
            case _e.PAN:
              if (e.enablePan === !1)
                return;
              Re(), d = i.TOUCH_PAN;
              break;
            default:
              d = i.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case _e.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              ht(), d = i.TOUCH_DOLLY_PAN;
              break;
            case _e.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Qe(), d = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              d = i.NONE;
          }
          break;
        default:
          d = i.NONE;
      }
      d !== i.NONE && e.dispatchEvent(gt);
    }
    function it(o) {
      switch (Ve(o), d) {
        case i.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          et(o), e.update();
          break;
        case i.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          tt(o), e.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          je(o), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          nt(o), e.update();
          break;
        default:
          d = i.NONE;
      }
    }
    function de(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function mt(o) {
      T.push(o);
    }
    function ot(o) {
      delete le[o.pointerId];
      for (let w = 0; w < T.length; w++)
        if (T[w].pointerId == o.pointerId) {
          T.splice(w, 1);
          return;
        }
    }
    function Ve(o) {
      let w = le[o.pointerId];
      w === void 0 && (w = new ae(), le[o.pointerId] = w), w.set(o.pageX, o.pageY);
    }
    function ye(o) {
      const w = o.pointerId === T[0].pointerId ? T[1] : T[0];
      return le[w.pointerId];
    }
    e.domElement.addEventListener("contextmenu", de), e.domElement.addEventListener("pointerdown", $e), e.domElement.addEventListener("pointercancel", be), e.domElement.addEventListener("wheel", at, { passive: !1 }), this.update();
  }
}
const xt = (t) => {
  const [n, r] = re(!1), [e, i] = re(t.options[t.index]), d = () => {
    r(!n);
  }, c = (s) => {
    s !== e && (t.onSelect(s), i(s)), r(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: d, children: e }),
    n && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ u.jsx("li", { onClick: () => c(s), children: s }, s)) })
  ] });
}, Ce = Pn(function(n, r) {
  const e = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: r, className: "clickable" }),
    /* @__PURE__ */ u.jsx(xt, { index: e, options: n.options, onSelect: n.onSelect, up: !0 })
  ] });
}), aa = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, ra = `out vec4 fragColor;
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
class ia extends pn {
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
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Ct(16777215)
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
      vertexShader: aa,
      fragmentShader: ra,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class oa extends vn {
  constructor() {
    const r = new ia();
    super(new bn(2, 2), r);
    $(this, "gridMaterial");
    this.gridMaterial = r, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const $t = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], q = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Map();
function Oe(t, n) {
  const r = new Vt(-100, 100, 100, -100, 50, 3e3);
  return r.name = t, r.position.copy(n), r.lookAt(0, 0, 0), q.set(t, r), r;
}
Oe("Top", new G(0, 1e3, 0));
Oe("Bottom", new G(0, -1e3, 0));
Oe("Left", new G(-1e3, 0, 0));
Oe("Right", new G(1e3, 0, 0));
Oe("Front", new G(0, 0, 1e3));
Oe("Back", new G(0, 0, -1e3));
Oe("Orthographic", new G(1e3, 1e3, 1e3));
const ut = new bt(60, 1, 50, 3e3);
ut.name = "Debug";
ut.position.set(500, 500, 500);
ut.lookAt(0, 0, 0);
q.set("Debug", ut);
let vt = "Default";
const sa = [
  "Default",
  "Normals",
  "Wireframe"
], ca = new yn(), la = new En({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
}), V = new wn();
function Ma(t) {
  const [n, r] = re(t.mode !== void 0 ? t.mode : "Quad"), e = Se(null), i = Se(null), d = Se(null), c = Se(null);
  let s = q.get("Debug"), l = q.get("Orthographic"), h = q.get("Front"), p = q.get("Top");
  const g = (y, b) => {
    const v = H.get(y.name);
    v !== void 0 && v.dispose(), H.delete(y.name);
    const O = ce.get(y.name);
    O !== void 0 && (V.remove(O), O.dispose()), ce.delete(y.name);
    const R = new na(y, b);
    switch (y.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        R.enableRotate = !1;
        break;
    }
    if (H.set(y.name, R), y instanceof bt) {
      const z = new Cn(y);
      ce.set(y.name, z), V.add(z);
    }
  }, E = (y) => {
    const b = ce.get(y.name);
    b !== void 0 && (V.remove(b), b.dispose(), ce.delete(y.name));
    const v = H.get(y.name);
    v !== void 0 && (v.dispose(), H.delete(y.name));
  }, C = () => {
    H.forEach((y, b) => {
      y.dispose();
      const v = ce.get(b);
      v !== void 0 && (V.remove(v), v.dispose()), ce.delete(b), H.delete(b);
    }), H.clear(), ce.clear();
  }, P = () => {
    switch (n) {
      case "Single":
        g(s, e.current);
        break;
      case "Side by Side":
      case "Stacked":
        g(s, e.current), g(l, i.current);
        break;
      case "Quad":
        g(s, e.current), g(l, i.current), g(h, d.current), g(p, c.current);
        break;
    }
  };
  qe(() => {
    V.name = "Debug Scene", V.add(t.scene);
    const y = new oa();
    V.add(y);
    const b = new xn(500);
    b.name = "axisHelper", V.add(b);
  }, []), qe(() => {
    const y = t.renderer.getSize(new ae());
    let b = y.x, v = y.y, O = Math.floor(b / 2), R = Math.floor(v / 2), z = -1;
    const ee = () => {
      b = window.innerWidth - 300, v = window.innerHeight, O = Math.floor(b / 2), R = Math.floor(v / 2);
      let j = b, I = v;
      switch (n) {
        case "Side by Side":
          j = O, I = v;
          break;
        case "Stacked":
          j = b, I = R;
          break;
        case "Quad":
          j = O, I = R;
          break;
      }
      q.forEach((L) => {
        var J;
        L instanceof Vt ? (L.left = j / -2, L.right = j / 2, L.top = I / 2, L.bottom = I / -2, L.updateProjectionMatrix()) : L instanceof bt && (L.aspect = j / I, L.updateProjectionMatrix(), (J = ce.get(L.name)) == null || J.update());
      });
    }, T = () => {
      t.renderer.setViewport(0, 0, b, v), t.renderer.setScissor(0, 0, b, v), t.renderer.render(V, s);
    }, le = () => {
      if (n === "Side by Side")
        t.renderer.setViewport(0, 0, O, v), t.renderer.setScissor(0, 0, O, v), t.renderer.render(V, s), t.renderer.setViewport(O, 0, O, v), t.renderer.setScissor(O, 0, O, v), t.renderer.render(V, l);
      else {
        const j = v - R;
        t.renderer.setViewport(0, j, b, R), t.renderer.setScissor(0, j, b, R), t.renderer.render(V, s), t.renderer.setViewport(0, 0, b, R), t.renderer.setScissor(0, 0, b, R), t.renderer.render(V, l);
      }
    }, Te = () => {
      let j = 0, I = 0;
      I = v - R, j = 0, t.renderer.setViewport(j, I, O, R), t.renderer.setScissor(j, I, O, R), t.renderer.render(V, s), j = O, t.renderer.setViewport(j, I, O, R), t.renderer.setScissor(j, I, O, R), t.renderer.render(V, l), I = 0, j = 0, t.renderer.setViewport(j, I, O, R), t.renderer.setScissor(j, I, O, R), t.renderer.render(V, h), j = O, t.renderer.setViewport(j, I, O, R), t.renderer.setScissor(j, I, O, R), t.renderer.render(V, p);
    }, oe = () => {
      switch (H.forEach((j) => {
        j.update();
      }), t.scene.update(), t.renderer.clear(), n) {
        case "Single":
          T();
          break;
        case "Side by Side":
        case "Stacked":
          le();
          break;
        case "Quad":
          Te();
          break;
      }
      z = requestAnimationFrame(oe);
    };
    return P(), window.addEventListener("resize", ee), ee(), oe(), () => {
      window.removeEventListener("resize", ee), cancelAnimationFrame(z), z = -1;
    };
  }, [n]);
  const D = [
    "Top",
    "Bottom",
    "Left",
    "Right",
    "Front",
    "Back",
    "Orthographic",
    "Debug"
  ];
  return t.cameras.forEach((y) => {
    q.set(y.name, y), D.push(y.name);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, children: [
      n === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(Ce, { camera: s, options: D, ref: e, onSelect: (y) => {
        var v;
        (v = H.get(s.name)) == null || v.dispose();
        const b = q.get(y);
        b !== void 0 && (E(s), s = b, g(b, e.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Ce, { camera: s, options: D, ref: e, onSelect: (y) => {
          var v;
          (v = H.get(s.name)) == null || v.dispose();
          const b = q.get(y);
          b !== void 0 && (E(s), s = b, g(b, e.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: l, options: D, ref: i, onSelect: (y) => {
          var v;
          (v = H.get(l.name)) == null || v.dispose();
          const b = q.get(y);
          b !== void 0 && (E(l), l = b, g(b, i.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Ce, { camera: s, options: D, ref: e, onSelect: (y) => {
          var v;
          (v = H.get(s.name)) == null || v.dispose();
          const b = q.get(y);
          b !== void 0 && (E(s), s = b, g(b, e.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: l, options: D, ref: i, onSelect: (y) => {
          var v;
          (v = H.get(l.name)) == null || v.dispose();
          const b = q.get(y);
          b !== void 0 && (E(l), l = b, g(b, i.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: h, options: D, ref: d, onSelect: (y) => {
          var v;
          (v = H.get(h.name)) == null || v.dispose();
          const b = q.get(y);
          b !== void 0 && (E(h), h = b, g(b, d.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: p, options: D, ref: c, onSelect: (y) => {
          var v;
          (v = H.get(p.name)) == null || v.dispose();
          const b = q.get(y);
          b !== void 0 && (E(p), p = b, g(b, c.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ u.jsx(
        xt,
        {
          index: $t.indexOf(n),
          options: $t,
          onSelect: (y) => {
            y !== n && (C(), r(y));
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        xt,
        {
          index: 0,
          options: sa,
          onSelect: (y) => {
            if (y !== vt)
              switch (vt = y, vt) {
                case "Default":
                  V.overrideMaterial = null;
                  break;
                case "Normals":
                  V.overrideMaterial = ca;
                  break;
                case "Wireframe":
                  V.overrideMaterial = la;
                  break;
              }
          }
        }
      )
    ] })
  ] });
}
function Pa(t) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ u.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ u.jsx("footer", { children: t.footer })
  ] });
}
export {
  wt as Accordion,
  ya as Application,
  lt as BaseRemote,
  Zt as ChildObject,
  Vn as ContainerObject,
  $n as Draggable,
  Bn as DraggableItem,
  Gn as Dropdown,
  Yn as DropdownItem,
  Pa as Editor,
  oa as InfiniteGridHelper,
  ea as Inspector,
  Ma as MultiView,
  qt as NavButton,
  Ea as RemoteComponents,
  Sa as RemoteController,
  wa as RemoteTheatre,
  xa as RemoteThree,
  Ca as RemoteTweakpane,
  Oa as SceneHierarchy,
  Ta as SceneInspector,
  N as ToolEvents,
  va as clamp,
  kn as colorToHex,
  A as debugDispatcher,
  ba as distance,
  Ht as hierarchyUUID,
  jn as isColor,
  Rn as randomID
};
