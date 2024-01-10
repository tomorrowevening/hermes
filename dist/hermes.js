var rn = Object.defineProperty;
var on = (t, n, r) => n in t ? rn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[n] = r;
var $ = (t, n, r) => (on(t, typeof n != "symbol" ? n + "" : n, r), r);
import { EventDispatcher as Gt, Mesh as Yt, Camera as sn, PerspectiveCamera as lt, OrthographicCamera as Ct, Light as cn, Texture as Vt, CubeTexture as ln, RepeatWrapping as jt, Color as St, Matrix4 as un, Vector3 as G, Euler as dn, Ray as fn, Plane as hn, MathUtils as mn, MOUSE as De, TOUCH as _e, Quaternion as Mt, Spherical as kt, Vector2 as ae, ShaderMaterial as pn, GLSL3 as gn, DoubleSide as vn, PlaneGeometry as bn, MeshNormalMaterial as yn, MeshBasicMaterial as En, Scene as wn, AxesHelper as xn, CameraHelper as Cn } from "three";
import { getProject as Sn } from "@theatre/core";
import { Pane as On } from "tweakpane";
import * as Tn from "@tweakpane/plugin-essentials";
import zt, { useState as re, useRef as Se, useEffect as qe, Component as Pn, forwardRef as Rn } from "react";
import { Reorder as Wt } from "framer-motion";
import We from "@theatre/studio";
class va {
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
const I = new Gt(), N = {
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
class ut {
  constructor(n) {
    $(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class ba extends ut {
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
function jn() {
  return Math.round(Math.random() * 1e6).toString();
}
function Mn(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function kn(t) {
  const n = Math.round(t.r * 255), r = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (c) => {
    const f = c.toString(16);
    return f.length === 1 ? "0" + f : f;
  }, l = i(n), h = i(r), s = i(e);
  return "#" + l + h + s;
}
const Ht = () => {
};
class ya extends ut {
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
  sheetObject(r, e, i, l) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const h = this.sheets.get(r);
    if (h === void 0)
      return;
    const s = `${r}_${e}`;
    let c = this.sheetObjects.get(s);
    if (c !== void 0)
      return c = h.object(e, { ...i, ...c.value }, { reconfigure: !0 }), c;
    c = h.object(e, i), this.sheetObjects.set(s, c), this.sheetObjectCBs.set(s, l !== void 0 ? l : Ht);
    const f = c.onValuesChange((m) => {
      if (this.app.editor) {
        for (const p in m) {
          const E = m[p];
          typeof E == "object" && Mn(E) && (m[p] = {
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
            values: m
          }
        });
      } else {
        const p = this.sheetObjectCBs.get(s);
        p !== void 0 && p(m);
      }
    });
    return this.sheetObjectUnsubscribe.set(s, f), c;
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
function Kt(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((r) => {
    n.children.push(Kt(r));
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
function An(t) {
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
    if (r.substring(0, 1) === "_" || r.substring(0, 2) === "is" || An(r))
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
            if (i instanceof Vt) {
              const l = i.source.toJSON();
              n[r] = { src: l.url };
            } else
              i instanceof ln && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[r] = { src: "" });
          else
            r === "uniforms" && (n[r] = _n(n[r]));
        else
          n[r] = { src: "" };
        break;
    }
  }
  return n;
}
function In(t) {
  t.updateMatrix();
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    visible: t.visible,
    matrix: t.matrix.elements
  };
  if (t instanceof Yt) {
    const r = t;
    if (Array.isArray(r.material)) {
      const e = [];
      r.material.forEach((i) => {
        e.push(Dt(i));
      }), n.material = e;
    } else
      n.material = Dt(r.material);
  } else
    t instanceof sn ? t instanceof lt ? n.perspectiveCameraInfo = {
      fov: t.fov,
      zoom: t.zoom,
      near: t.near,
      far: t.far,
      focus: t.focus,
      aspect: t.aspect,
      filmGauge: t.filmGauge,
      filmOffset: t.filmOffset
    } : t instanceof Ct && (n.orthographicCameraInfo = {
      zoom: t.zoom,
      near: t.near,
      far: t.far,
      left: t.left,
      right: t.right,
      top: t.top,
      bottom: t.bottom
    }) : t instanceof cn && (n.lightInfo = {
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
      const i = new Vt(e);
      i.wrapS = jt, i.wrapT = jt, i.needsUpdate = !0, n(i);
    }, e.onerror = r, e.src = t;
  });
}
class Ea extends ut {
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
    const e = In(r);
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
    this.scene = r;
    const e = Kt(r);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
}
class wa extends ut {
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
  bind(r, e, i, l = void 0) {
    const h = this.bindID, s = i.onChange !== void 0 ? i.onChange : Ht;
    this.bindCBs.set(h, s), this.app.editor ? (this.pane === void 0 && this.createGUI(), (l !== void 0 ? l : this.pane).addBinding(r, e, i).on("change", (f) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: h,
          value: f.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: h,
        name: e,
        params: i,
        parent: l
      }
    }), this.appCallbacks++);
  }
  triggerBind(r, e) {
    const i = this.bindCBs.get(r);
    i !== void 0 ? i(e) : console.warn(`No callback for: ${r}`, e);
  }
  // Buttons
  button(r, e, i = void 0) {
    const l = this.bindID;
    this.buttonCBs.set(l, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addButton({ title: r }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: l
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: l,
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
  var t = zt, n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(s, c, f) {
    var m, p = {}, E = null, C = null;
    f !== void 0 && (E = "" + f), c.key !== void 0 && (E = "" + c.key), c.ref !== void 0 && (C = c.ref);
    for (m in c)
      e.call(c, m) && !l.hasOwnProperty(m) && (p[m] = c[m]);
    if (s && s.defaultProps)
      for (m in c = s.defaultProps, c)
        p[m] === void 0 && (p[m] = c[m]);
    return { $$typeof: n, type: s, key: E, ref: C, props: p, _owner: i.current };
  }
  return He.Fragment = r, He.jsx = h, He.jsxs = h, He;
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
var At;
function Ln() {
  return At || (At = 1, process.env.NODE_ENV !== "production" && function() {
    var t = zt, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), O = Symbol.iterator, k = "@@iterator";
    function y(a) {
      if (a === null || typeof a != "object")
        return null;
      var d = O && a[O] || a[k];
      return typeof d == "function" ? d : null;
    }
    var v = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(a) {
      {
        for (var d = arguments.length, g = new Array(d > 1 ? d - 1 : 0), x = 1; x < d; x++)
          g[x - 1] = arguments[x];
        T("error", a, g);
      }
    }
    function T(a, d, g) {
      {
        var x = v.ReactDebugCurrentFrame, D = x.getStackAddendum();
        D !== "" && (d += "%s", g = g.concat([D]));
        var _ = g.map(function(R) {
          return String(R);
        });
        _.unshift("Warning: " + d), Function.prototype.apply.call(console[a], console, _);
      }
    }
    var j = !1, z = !1, ee = !1, P = !1, le = !1, Te;
    Te = Symbol.for("react.module.reference");
    function oe(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === e || a === l || le || a === i || a === f || a === m || P || a === C || j || z || ee || typeof a == "object" && a !== null && (a.$$typeof === E || a.$$typeof === p || a.$$typeof === h || a.$$typeof === s || a.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === Te || a.getModuleId !== void 0));
    }
    function M(a, d, g) {
      var x = a.displayName;
      if (x)
        return x;
      var D = d.displayName || d.name || "";
      return D !== "" ? g + "(" + D + ")" : g;
    }
    function A(a) {
      return a.displayName || "Context";
    }
    function L(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case e:
          return "Fragment";
        case r:
          return "Portal";
        case l:
          return "Profiler";
        case i:
          return "StrictMode";
        case f:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case s:
            var d = a;
            return A(d) + ".Consumer";
          case h:
            var g = a;
            return A(g._context) + ".Provider";
          case c:
            return M(a, a.render, "ForwardRef");
          case p:
            var x = a.displayName || null;
            return x !== null ? x : L(a.type) || "Memo";
          case E: {
            var D = a, _ = D._payload, R = D._init;
            try {
              return L(R(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, te = 0, Pe, Ie, Ne, Re, Le, Ze, Fe;
    function Je() {
    }
    Je.__reactDisabledLog = !0;
    function ft() {
      {
        if (te === 0) {
          Pe = console.log, Ie = console.info, Ne = console.warn, Re = console.error, Le = console.group, Ze = console.groupCollapsed, Fe = console.groupEnd;
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
    function ht() {
      {
        if (te--, te === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, a, {
              value: Pe
            }),
            info: J({}, a, {
              value: Ie
            }),
            warn: J({}, a, {
              value: Ne
            }),
            error: J({}, a, {
              value: Re
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
        te < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ue = v.ReactCurrentDispatcher, Be;
    function pe(a, d, g) {
      {
        if (Be === void 0)
          try {
            throw Error();
          } catch (D) {
            var x = D.stack.trim().match(/\n( *(at )?)/);
            Be = x && x[1] || "";
          }
        return `
` + Be + a;
      }
    }
    var je = !1, ge;
    {
      var mt = typeof WeakMap == "function" ? WeakMap : Map;
      ge = new mt();
    }
    function Qe(a, d) {
      if (!a || je)
        return "";
      {
        var g = ge.get(a);
        if (g !== void 0)
          return g;
      }
      var x;
      je = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = Ue.current, Ue.current = null, ft();
      try {
        if (d) {
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
            } catch (se) {
              x = se;
            }
            Reflect.construct(a, [], R);
          } else {
            try {
              R.call();
            } catch (se) {
              x = se;
            }
            a.call(R.prototype);
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
        je = !1, Ue.current = _, ht(), Error.prepareStackTrace = D;
      }
      var ke = a ? a.displayName || a.name : "", Rt = ke ? pe(ke) : "";
      return typeof a == "function" && ge.set(a, Rt), Rt;
    }
    function et(a, d, g) {
      return Qe(a, !1);
    }
    function tt(a) {
      var d = a.prototype;
      return !!(d && d.isReactComponent);
    }
    function ve(a, d, g) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Qe(a, tt(a));
      if (typeof a == "string")
        return pe(a);
      switch (a) {
        case f:
          return pe("Suspense");
        case m:
          return pe("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case c:
            return et(a.render);
          case p:
            return ve(a.type, d, g);
          case E: {
            var x = a, D = x._payload, _ = x._init;
            try {
              return ve(_(D), d, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Me = Object.prototype.hasOwnProperty, nt = {}, $e = v.ReactDebugCurrentFrame;
    function ue(a) {
      if (a) {
        var d = a._owner, g = ve(a.type, a._source, d ? d.type : null);
        $e.setExtraStackFrame(g);
      } else
        $e.setExtraStackFrame(null);
    }
    function be(a, d, g, x, D) {
      {
        var _ = Function.call.bind(Me);
        for (var R in a)
          if (_(a, R)) {
            var S = void 0;
            try {
              if (typeof a[R] != "function") {
                var X = Error((x || "React class") + ": " + g + " type `" + R + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[R] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw X.name = "Invariant Violation", X;
              }
              S = a[R](d, R, x, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (B) {
              S = B;
            }
            S && !(S instanceof Error) && (ue(D), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", g, R, typeof S), ue(null)), S instanceof Error && !(S.message in nt) && (nt[S.message] = !0, ue(D), b("Failed %s type: %s", g, S.message), ue(null));
          }
      }
    }
    var pt = Array.isArray;
    function Ge(a) {
      return pt(a);
    }
    function at(a) {
      {
        var d = typeof Symbol == "function" && Symbol.toStringTag, g = d && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return g;
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
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", at(a)), rt(a);
    }
    var de = v.ReactCurrentOwner, gt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ot, Ve, ye;
    ye = {};
    function o(a) {
      if (Me.call(a, "ref")) {
        var d = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function w(a) {
      if (Me.call(a, "key")) {
        var d = Object.getOwnPropertyDescriptor(a, "key").get;
        if (d && d.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function F(a, d) {
      if (typeof a.ref == "string" && de.current && d && de.current.stateNode !== d) {
        var g = L(de.current.type);
        ye[g] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', L(de.current.type), a.ref), ye[g] = !0);
      }
    }
    function U(a, d) {
      {
        var g = function() {
          ot || (ot = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        g.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function K(a, d) {
      {
        var g = function() {
          Ve || (Ve = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", d));
        };
        g.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var fe = function(a, d, g, x, D, _, R) {
      var S = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: a,
        key: d,
        ref: g,
        props: R,
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
        value: D
      }), Object.freeze && (Object.freeze(S.props), Object.freeze(S)), S;
    };
    function ie(a, d, g, x, D) {
      {
        var _, R = {}, S = null, X = null;
        g !== void 0 && (it(g), S = "" + g), w(d) && (it(d.key), S = "" + d.key), o(d) && (X = d.ref, F(d, D));
        for (_ in d)
          Me.call(d, _) && !gt.hasOwnProperty(_) && (R[_] = d[_]);
        if (a && a.defaultProps) {
          var B = a.defaultProps;
          for (_ in B)
            R[_] === void 0 && (R[_] = B[_]);
        }
        if (S || X) {
          var Y = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          S && U(R, Y), X && K(R, Y);
        }
        return fe(a, S, X, D, x, de.current, R);
      }
    }
    var st = v.ReactCurrentOwner, ze = v.ReactDebugCurrentFrame;
    function W(a) {
      if (a) {
        var d = a._owner, g = ve(a.type, a._source, d ? d.type : null);
        ze.setExtraStackFrame(g);
      } else
        ze.setExtraStackFrame(null);
    }
    var Q;
    Q = !1;
    function he(a) {
      return typeof a == "object" && a !== null && a.$$typeof === n;
    }
    function me() {
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
          var d = a.fileName.replace(/^.*[\\\/]/, ""), g = a.lineNumber;
          return `

Check your code at ` + d + ":" + g + ".";
        }
        return "";
      }
    }
    var we = {};
    function Zt(a) {
      {
        var d = me();
        if (!d) {
          var g = typeof a == "string" ? a : a.displayName || a.name;
          g && (d = `

Check the top-level render call using <` + g + ">.");
        }
        return d;
      }
    }
    function Ot(a, d) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var g = Zt(d);
        if (we[g])
          return;
        we[g] = !0;
        var x = "";
        a && a._owner && a._owner !== st.current && (x = " It was passed a child from " + L(a._owner.type) + "."), W(a), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, x), W(null);
      }
    }
    function Tt(a, d) {
      {
        if (typeof a != "object")
          return;
        if (Ge(a))
          for (var g = 0; g < a.length; g++) {
            var x = a[g];
            he(x) && Ot(x, d);
          }
        else if (he(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var D = y(a);
          if (typeof D == "function" && D !== a.entries)
            for (var _ = D.call(a), R; !(R = _.next()).done; )
              he(R.value) && Ot(R.value, d);
        }
      }
    }
    function Jt(a) {
      {
        var d = a.type;
        if (d == null || typeof d == "string")
          return;
        var g;
        if (typeof d == "function")
          g = d.propTypes;
        else if (typeof d == "object" && (d.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        d.$$typeof === p))
          g = d.propTypes;
        else
          return;
        if (g) {
          var x = L(d);
          be(g, a.props, "prop", x, a);
        } else if (d.PropTypes !== void 0 && !Q) {
          Q = !0;
          var D = L(d);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof d.getDefaultProps == "function" && !d.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Qt(a) {
      {
        for (var d = Object.keys(a.props), g = 0; g < d.length; g++) {
          var x = d[g];
          if (x !== "children" && x !== "key") {
            W(a), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), W(null);
            break;
          }
        }
        a.ref !== null && (W(a), b("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    function Pt(a, d, g, x, D, _) {
      {
        var R = oe(a);
        if (!R) {
          var S = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var X = Ee(D);
          X ? S += X : S += me();
          var B;
          a === null ? B = "null" : Ge(a) ? B = "array" : a !== void 0 && a.$$typeof === n ? (B = "<" + (L(a.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : B = typeof a, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", B, S);
        }
        var Y = ie(a, d, g, D, _);
        if (Y == null)
          return Y;
        if (R) {
          var ne = d.children;
          if (ne !== void 0)
            if (x)
              if (Ge(ne)) {
                for (var ke = 0; ke < ne.length; ke++)
                  Tt(ne[ke], a);
                Object.freeze && Object.freeze(ne);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Tt(ne, a);
        }
        return a === e ? Qt(Y) : Jt(Y), Y;
      }
    }
    function en(a, d, g) {
      return Pt(a, d, g, !0);
    }
    function tn(a, d, g) {
      return Pt(a, d, g, !1);
    }
    var nn = tn, an = en;
    Ke.Fragment = e, Ke.jsx = nn, Ke.jsxs = an;
  }()), Ke;
}
process.env.NODE_ENV === "production" ? Et.exports = Nn() : Et.exports = Ln();
var u = Et.exports;
function Xt(t) {
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
  const [n, r] = re(!1), [e, i] = re(t.options), l = (f) => {
    t.onDragComplete(f), i(f);
  }, h = (f) => {
    const m = [...e];
    m.splice(f, 1), l(m);
  }, s = [];
  e.forEach((f, m) => {
    s.push(/* @__PURE__ */ u.jsx(Bn, { index: m, title: f, onDelete: h }, f));
  });
  let c = "dropdown draggable";
  return t.subdropdown && (c += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: c, onMouseEnter: () => r(!0), onMouseLeave: () => r(!1), children: [
    /* @__PURE__ */ u.jsx(Xt, { title: t.title }),
    /* @__PURE__ */ u.jsx(Wt.Group, { axis: "y", values: e, onReorder: l, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function Gn(t) {
  const [n, r] = re(!1), e = [];
  t.options.map((l, h) => {
    t.onSelect !== void 0 && (l.onSelect = t.onSelect), e.push(/* @__PURE__ */ u.jsx(Yn, { option: l }, h));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => r(!0),
      onMouseLeave: () => r(!1),
      children: [
        /* @__PURE__ */ u.jsx(Xt, { title: t.title }),
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
          onDragComplete: (l) => {
            n.onDragComplete !== void 0 && n.onDragComplete(l);
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
  return /* @__PURE__ */ u.jsx("li", { className: r === n.title ? "selected" : "", children: i }, jn());
}
function xa(t) {
  let n;
  const r = t.editor ? "editor" : "app";
  function e(s) {
    var f, m, p, E, C, O, k, y, v;
    let c;
    switch (s.event) {
      case "custom":
        I.dispatchEvent({ type: N.CUSTOM, value: s.data });
        break;
      case "selectComponent":
        I.dispatchEvent({ type: N.SELECT_DROPDOWN, value: s.data });
        break;
      case "draggableListUpdate":
        I.dispatchEvent({ type: N.DRAG_UPDATE, value: s.data });
        break;
      case "addFolder":
        (f = t.components.get("debug")) == null || f.addFolder(s.data.name, s.data.params, s.data.parent);
        break;
      case "bindObject":
        (m = t.components.get("debug")) == null || m.bind(s.data.name, s.data.params, s.data.parent);
        break;
      case "updateBind":
        (p = t.components.get("debug")) == null || p.triggerBind(s.data.id, s.data.value);
        break;
      case "addButton":
        (E = t.components.get("debug")) == null || E.button(s.data.name, s.data.callback, s.data.parent);
        break;
      case "clickButton":
        (C = t.components.get("debug")) == null || C.triggerButton(s.data.id);
        break;
      case "setSheet":
        c = (O = t.components.get("theatre")) == null ? void 0 : O.sheets.get(s.data.sheet), c !== void 0 && (n = c, We.setSelection([c]));
        break;
      case "setSheetObject":
        c = (k = t.components.get("theatre")) == null ? void 0 : k.sheetObjects.get(`${s.data.sheet}_${s.data.key}`), c !== void 0 && We.setSelection([c]);
        break;
      case "updateSheetObject":
        c = (y = t.components.get("theatre")) == null ? void 0 : y.sheetObjectCBs.get(s.data.sheetObject), c !== void 0 && c(s.data.values);
        break;
      case "updateTimeline":
        n = (v = t.components.get("theatre")) == null ? void 0 : v.sheets.get(s.data.sheet), n !== void 0 && (n.sequence.position = s.data.position);
        break;
      case "getScene":
        I.dispatchEvent({ type: N.GET_SCENE });
        break;
      case "getObject":
        I.dispatchEvent({ type: N.GET_OBJECT, value: s.data });
        break;
      case "updateObject":
        I.dispatchEvent({ type: N.UPDATE_OBJECT, value: s.data });
        break;
      case "createTexture":
        I.dispatchEvent({ type: N.CREATE_TEXTURE, value: s.data });
        break;
      case "requestMethod":
        I.dispatchEvent({ type: N.REQUEST_METHOD, value: s.data });
        break;
    }
  }
  function i(s) {
    switch (s.event) {
      case "custom":
        I.dispatchEvent({ type: N.CUSTOM, value: s.data });
        break;
      case "setObject":
        I.dispatchEvent({ type: N.SET_OBJECT, value: s.data });
        break;
      case "setScene":
        I.dispatchEvent({ type: N.SET_SCENE, value: s.data });
        break;
    }
  }
  function l() {
    We.ui.hide();
  }
  function h() {
    We.ui.restore(), We.onSelectionChange((m) => {
      m.length < 1 || m.forEach((p) => {
        var k;
        let E = p.address.sheetId, C = "setSheet", O = {};
        switch (p.type) {
          case "Theatre_Sheet_PublicAPI":
            C = "setSheet", O = {
              sheet: p.address.sheetId
            }, n = (k = t.components.get("theatre")) == null ? void 0 : k.sheets.get(p.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            C = "setSheetObject", E += `_${p.address.objectKey}`, O = {
              id: E,
              sheet: p.address.sheetId,
              key: p.address.objectKey
            };
            break;
        }
        t.send({ event: C, target: "app", data: O });
      });
    });
    let s = 0;
    const c = () => {
      if (n !== void 0 && s !== n.sequence.position) {
        s = n.sequence.position;
        const m = n;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: s,
            sheet: m.address.sheetId
          }
        });
      }
    }, f = () => {
      c(), requestAnimationFrame(f);
    };
    c(), f();
  }
  t.listen((s) => {
    r === "app" ? e(s) : i(s);
  }), t.editor ? h() : l();
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
function qt(t) {
  const [n, r] = re(t.child.children.length > 0), e = t.child.children.length > 0, i = [];
  return t.child.children.length > 0 && t.child.children.map((l) => {
    i.push(/* @__PURE__ */ u.jsx(qt, { child: l, three: t.three }, Math.random()));
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
    n.push(/* @__PURE__ */ u.jsx(qt, { child: r, three: t.three }, Math.random()));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const zn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Wn(t) {
  return "items" in t;
}
function Ae(t) {
  function n(e, i) {
    console.log("onChange:", e, i);
  }
  const r = [];
  return t.items.forEach((e) => {
    Wn(e) ? r.push(
      /* @__PURE__ */ u.jsx(Ae, { title: e.title, items: e.items }, Math.random())
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
          onChange: (i, l) => {
            e.onChange !== void 0 ? e.onChange(i, l) : n(i, l);
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
    case "clearcoatNormalScale":
      return "Clearcoat Normal Scale";
    case "clearcoatRoughness":
      return "Clearcoat Roughness";
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
    case "sheenColor":
      return "Sheen Color";
    case "sheenRoughness":
      return "Sheen Roughness";
    case "shininess":
      return "Shininess";
    case "specular":
      return "Specular";
    case "specularColor":
      return "Specular Color";
    case "specularIntensity":
      return "Specular Intensity";
    case "thickness":
      return "Thickness";
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
        i.onload = function(l) {
          n(l.target.result);
        }, i.readAsDataURL(e);
      }
    }), t.click();
  });
}
function It(t, n, r) {
  const e = [];
  for (const i in t) {
    if (!Hn(i))
      continue;
    const l = typeof t[i], h = t[i];
    if (l === "boolean" || l === "number" || l === "string") {
      const s = {
        title: xe(i),
        prop: i,
        type: l,
        value: h,
        min: void 0,
        max: void 0,
        onChange: (c, f) => {
          var p;
          r.updateObject(n.uuid, `material.${c}`, f), l === "boolean" && r.updateObject(n.uuid, "material.needsUpdate", !0);
          const m = (p = r.scene) == null ? void 0 : p.getObjectByProperty("uuid", n.uuid);
          m !== void 0 && Z(m, `material.${c}`, f);
        }
      };
      Kn(i) && (s.value = Number(h), s.type = "range", s.min = 0, s.max = 1, s.step = 0.01), e.push(s);
    } else if (l === "object")
      if (h.isColor)
        e.push({
          title: xe(i),
          prop: i,
          type: "color",
          value: h,
          onChange: (s, c) => {
            var p;
            const f = new St(c);
            r.updateObject(n.uuid, `material.${s}`, f);
            const m = (p = r.scene) == null ? void 0 : p.getObjectByProperty("uuid", n.uuid);
            m !== void 0 && Z(m, `material.${s}`, f);
          }
        });
      else if (Array.isArray(h)) {
        const s = [];
        for (const c in h)
          s.push({
            title: `${c}`,
            type: `${typeof h[c]}`,
            value: h[c],
            onChange: (f, m) => {
              var E;
              r.updateObject(n.uuid, `material.${i}`, m);
              const p = (E = r.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
              p !== void 0 && Z(p, `material.${i}`, m);
            }
          });
        e.push({
          title: xe(i),
          items: s
        });
      } else {
        const s = [];
        for (const c in h) {
          const f = h[c];
          switch (typeof f) {
            case "boolean":
            case "number":
            case "string":
              c === "src" ? e.push({
                title: xe(i),
                type: "image",
                value: f,
                onChange: (p, E) => {
                  var O;
                  r.createTexture(n.uuid, `material.${i}`, E);
                  const C = (O = r.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && yt(E).then((k) => {
                    Z(C, `material.${i}`, k), Z(C, "material.needsUpdate", !0);
                  });
                }
              }) : s.push({
                title: `${xe(c)}`,
                prop: `material.${i}.${c}`,
                type: `${typeof t[i][c]}`,
                value: h[c],
                onChange: (p, E) => {
                  var O;
                  r.updateObject(n.uuid, `material.${i}.${c}`, E);
                  const C = (O = r.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Z(C, `material.${i}.${c}`, E);
                }
              });
              break;
            case "object":
              f.value !== void 0 && f.value.src !== void 0 ? s.push({
                title: xe(c),
                type: "image",
                value: f.value.src,
                onChange: (p, E) => {
                  var O;
                  r.createTexture(n.uuid, `material.${i}.${c}.value`, E);
                  const C = (O = r.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && yt(E).then((k) => {
                    Z(C, `material.${i}.${c}.value`, k);
                  });
                }
              }) : s.push({
                title: c,
                type: `${typeof f.value}`,
                value: f.value,
                onChange: (p, E) => {
                  var O;
                  r.updateObject(n.uuid, `material.${i}.${c}.value`, E);
                  const C = (O = r.scene) == null ? void 0 : O.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Z(C, `material.${i}.${c}.value`, E);
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
      h !== void 0 && console.log("other:", i, l, h);
  }
  return e.sort((i, l) => i.title < l.title ? -1 : i.title > l.title ? 1 : 0), e.push({
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
    for (let l = 0; l < i; l++)
      e.push(
        /* @__PURE__ */ u.jsx(
          Ae,
          {
            title: `Material ${l}`,
            items: It(r[l], t, n)
          }
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: e });
  } else
    return /* @__PURE__ */ u.jsx(
      Ae,
      {
        title: "Material",
        items: It(r, t, n)
      }
    );
}
function Xe(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = kn(t.value));
  const [r, e] = re(n), i = Se(null), l = Se(null), h = Se(null);
  qe(() => {
    var T;
    let m = !1, p = -1, E = 0, C = Number(r);
    const O = (j) => {
      m = !0, E = C, p = j.clientX;
    }, k = (j) => {
      if (!m)
        return;
      const z = t.step !== void 0 ? t.step : 1, ee = (j.clientX - p) * z;
      C = Number((E + ee).toFixed(4)), l.current !== null && (l.current.value = C.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, C);
    }, y = () => {
      m = !1;
    }, v = () => {
      m = !1;
    }, b = t.type === "number";
    return b && ((T = i.current) == null || T.addEventListener("mousedown", O, !1), document.addEventListener("mouseup", y, !1), document.addEventListener("mousemove", k, !1), document.addEventListener("contextmenu", v, !1)), () => {
      var j;
      b && ((j = i.current) == null || j.removeEventListener("mousedown", O), document.removeEventListener("mouseup", y), document.removeEventListener("mousemove", k), document.removeEventListener("contextmenu", v));
    };
  }, [r]);
  const s = t.type === "string" && (r.length > 100 || r.search(`
`) > -1), c = s || t.type === "image", f = (m) => {
    let p = m.target.value;
    t.type === "boolean" && (p = m.target.checked), e(p), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, p);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${c ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: i, children: t.title }, "fieldLabel"),
    t.type === "string" && !s && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: f,
        value: r
      }
    ),
    t.type === "string" && s && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: f,
        value: r
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: f,
        checked: r
      }
    ),
    t.type === "number" && /* @__PURE__ */ u.jsx(
      "input",
      {
        ref: l,
        type: "number",
        value: r,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: f
      }
    ),
    t.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: r.toString(), onChange: f, className: "min" }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: r,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: f
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: r.toString(), onChange: f, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: r, onChange: f })
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
    t.type === "image" && /* @__PURE__ */ u.jsx("img", { ref: h, onClick: () => {
      Xn().then((m) => {
        h.current.src = m, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, m);
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
        onChange: (i, l) => {
          var s;
          n.updateObject(t.uuid, i, l), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (Z(h, i, l), h.updateProjectionMatrix());
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
        onChange: (i, l) => {
          var s;
          n.updateObject(t.uuid, i, l), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = (s = n.scene) == null ? void 0 : s.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (Z(h, i, l), h.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ u.jsx(
    Ae,
    {
      title: "Camera",
      items: r
    }
  );
}
function Jn(t, n) {
  const r = new un();
  r.elements = t.matrix;
  const e = new G(), i = new dn(), l = new G();
  t.uuid.length > 0 && (e.setFromMatrixPosition(r), i.setFromRotationMatrix(r), l.setFromMatrixScale(r));
  const h = (c, f) => {
    var p;
    n.updateObject(t.uuid, c, f);
    const m = (p = n.scene) == null ? void 0 : p.getObjectByProperty("uuid", t.uuid);
    m !== void 0 && Z(m, c, f);
  }, s = [
    {
      title: "Position",
      items: [
        {
          title: "X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: h
        },
        {
          title: "Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: h
        },
        {
          title: "Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: h
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
          onChange: h
        },
        {
          title: "Y",
          prop: "rotation.y",
          type: "number",
          value: i.y,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: h
        },
        {
          title: "Z",
          prop: "rotation.z",
          type: "number",
          value: i.z,
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
          onChange: h
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
          value: l.x,
          step: 0.01,
          onChange: h
        },
        {
          title: "Y",
          prop: "scale.y",
          type: "number",
          value: l.y,
          step: 0.01,
          onChange: h
        },
        {
          title: "Z",
          prop: "scale.z",
          type: "number",
          value: l.z,
          step: 0.01,
          onChange: h
        }
      ]
    }
  ];
  return /* @__PURE__ */ u.jsx(
    Ae,
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
        onChange: (l, h) => {
          var f;
          const s = new St(h);
          n.updateObject(t.uuid, l, s);
          const c = (f = n.scene) == null ? void 0 : f.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && Z(c, l, s);
        }
      }) : r.push({
        title: Lt(e),
        prop: e,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (l, h) => {
          var c;
          n.updateObject(t.uuid, l, h);
          const s = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          s !== void 0 && Z(s, l, h);
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Ae,
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
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  });
  return qe(() => {
    function l(h) {
      const s = h.value;
      i(s), r(Date.now());
    }
    return I.addEventListener(N.SET_OBJECT, l), () => {
      I.removeEventListener(N.SET_OBJECT, l);
    };
  }, []), /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: t.class, children: e.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
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
        onChange: (l, h) => {
          t.three.updateObject(e.uuid, l, h);
        }
      }
    ),
    Jn(e, t.three),
    e.type.search("Camera") > -1 ? Zn(e, t.three) : null,
    e.type.search("Light") > -1 ? Qn(e, t.three) : null,
    e.material !== void 0 ? qn(e, t.three) : null
  ] }) }, n);
}
class Ca extends Pn {
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
    }, this.three = r.three, I.addEventListener(N.SET_SCENE, this.setScene);
  }
  componentDidMount() {
    this.onRefresh();
  }
  componentWillUnmount() {
    I.removeEventListener(N.SET_SCENE, this.setScene);
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
function Sa(t) {
  const n = (s) => {
    const c = t.scene.getObjectByProperty("uuid", s.value);
    c !== void 0 && t.three.setObject(c);
  }, r = (s, c, f) => {
    const m = t.scene.getObjectByProperty("uuid", s);
    m !== void 0 && Z(m, c, f);
  }, e = (s) => {
    const c = s.value, { key: f, value: m, uuid: p } = c;
    r(p, f, m);
  }, i = (s) => {
    const c = s.value;
    yt(c.value).then((f) => {
      r(c.uuid, c.key, f), r(c.uuid, "material.needsUpdate", !0);
    });
  }, l = () => {
    t.three.setScene(t.scene);
  }, h = (s) => {
    const { key: c, uuid: f, value: m } = s.value, p = t.scene.getObjectByProperty("uuid", f);
    if (p !== void 0)
      try {
        p[c](m);
      } catch (E) {
        console.log("Error requesting method:"), console.log(E), console.log(c), console.log(m);
      }
  };
  return qe(() => (I.addEventListener(N.GET_OBJECT, n), I.addEventListener(N.GET_SCENE, l), I.addEventListener(N.UPDATE_OBJECT, e), I.addEventListener(N.CREATE_TEXTURE, i), I.addEventListener(N.REQUEST_METHOD, h), () => {
    I.removeEventListener(N.GET_OBJECT, n), I.removeEventListener(N.GET_SCENE, l), I.removeEventListener(N.UPDATE_OBJECT, e), I.removeEventListener(N.CREATE_TEXTURE, i), I.removeEventListener(N.REQUEST_METHOD, h);
  }), []), null;
}
const Ft = { type: "change" }, vt = { type: "start" }, Ut = { type: "end" }, ct = new fn(), Bt = new hn(), ta = Math.cos(70 * mn.DEG2RAD);
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
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Ft), e.update(), l = i.NONE;
    }, this.update = function() {
      const o = new G(), w = new Mt().setFromUnitVectors(n.up, new G(0, 1, 0)), F = w.clone().invert(), U = new G(), K = new Mt(), fe = new G(), ie = 2 * Math.PI;
      return function() {
        const ze = e.object.position;
        o.copy(ze).sub(e.target), o.applyQuaternion(w), s.setFromVector3(o), e.autoRotate && l === i.NONE && M(Te()), e.enableDamping ? (s.theta += c.theta * e.dampingFactor, s.phi += c.phi * e.dampingFactor) : (s.theta += c.theta, s.phi += c.phi);
        let W = e.minAzimuthAngle, Q = e.maxAzimuthAngle;
        isFinite(W) && isFinite(Q) && (W < -Math.PI ? W += ie : W > Math.PI && (W -= ie), Q < -Math.PI ? Q += ie : Q > Math.PI && (Q -= ie), W <= Q ? s.theta = Math.max(W, Math.min(Q, s.theta)) : s.theta = s.theta > (W + Q) / 2 ? Math.max(W, s.theta) : Math.min(Q, s.theta)), s.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, s.phi)), s.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(m, e.dampingFactor) : e.target.add(m), e.zoomToCursor && ee || e.object.isOrthographicCamera ? s.radius = Re(s.radius) : s.radius = Re(s.radius * f), o.setFromSpherical(s), o.applyQuaternion(F), ze.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (c.theta *= 1 - e.dampingFactor, c.phi *= 1 - e.dampingFactor, m.multiplyScalar(1 - e.dampingFactor)) : (c.set(0, 0, 0), m.set(0, 0, 0));
        let he = !1;
        if (e.zoomToCursor && ee) {
          let me = null;
          if (e.object.isPerspectiveCamera) {
            const Ee = o.length();
            me = Re(Ee * f);
            const we = Ee - me;
            e.object.position.addScaledVector(j, we), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Ee = new G(z.x, z.y, 0);
            Ee.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), he = !0;
            const we = new G(z.x, z.y, 0);
            we.unproject(e.object), e.object.position.sub(we).add(Ee), e.object.updateMatrixWorld(), me = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          me !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(me).add(e.object.position) : (ct.origin.copy(e.object.position), ct.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(ct.direction)) < ta ? n.lookAt(e.target) : (Bt.setFromNormalAndCoplanarPoint(e.object.up, e.target), ct.intersectPlane(Bt, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / f)), e.object.updateProjectionMatrix(), he = !0);
        return f = 1, ee = !1, he || U.distanceToSquared(e.object.position) > h || 8 * (1 - K.dot(e.object.quaternion)) > h || fe.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Ft), U.copy(e.object.position), K.copy(e.object.quaternion), fe.copy(e.target), he = !1, !0) : !1;
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
    let l = i.NONE;
    const h = 1e-6, s = new kt(), c = new kt();
    let f = 1;
    const m = new G(), p = new ae(), E = new ae(), C = new ae(), O = new ae(), k = new ae(), y = new ae(), v = new ae(), b = new ae(), T = new ae(), j = new G(), z = new ae();
    let ee = !1;
    const P = [], le = {};
    function Te() {
      return 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function oe() {
      return Math.pow(0.95, e.zoomSpeed);
    }
    function M(o) {
      c.theta -= o;
    }
    function A(o) {
      c.phi -= o;
    }
    const L = function() {
      const o = new G();
      return function(F, U) {
        o.setFromMatrixColumn(U, 0), o.multiplyScalar(-F), m.add(o);
      };
    }(), J = function() {
      const o = new G();
      return function(F, U) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(U, 1) : (o.setFromMatrixColumn(U, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(F), m.add(o);
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
    function Pe(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ie(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? f *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ne(o) {
      if (!e.zoomToCursor)
        return;
      ee = !0;
      const w = e.domElement.getBoundingClientRect(), F = o.clientX - w.left, U = o.clientY - w.top, K = w.width, fe = w.height;
      z.x = F / K * 2 - 1, z.y = -(U / fe) * 2 + 1, j.set(z.x, z.y, 1).unproject(n).sub(n.position).normalize();
    }
    function Re(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function Le(o) {
      p.set(o.clientX, o.clientY);
    }
    function Ze(o) {
      Ne(o), v.set(o.clientX, o.clientY);
    }
    function Fe(o) {
      O.set(o.clientX, o.clientY);
    }
    function Je(o) {
      E.set(o.clientX, o.clientY), C.subVectors(E, p).multiplyScalar(e.rotateSpeed);
      const w = e.domElement;
      M(2 * Math.PI * C.x / w.clientHeight), A(2 * Math.PI * C.y / w.clientHeight), p.copy(E), e.update();
    }
    function ft(o) {
      b.set(o.clientX, o.clientY), T.subVectors(b, v), T.y > 0 ? Pe(oe()) : T.y < 0 && Ie(oe()), v.copy(b), e.update();
    }
    function ht(o) {
      k.set(o.clientX, o.clientY), y.subVectors(k, O).multiplyScalar(e.panSpeed), te(y.x, y.y), O.copy(k), e.update();
    }
    function Ue(o) {
      Ne(o), o.deltaY < 0 ? Ie(oe()) : o.deltaY > 0 && Pe(oe()), e.update();
    }
    function Be(o) {
      let w = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? A(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(0, e.keyPanSpeed), w = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? A(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(0, -e.keyPanSpeed), w = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? M(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(e.keyPanSpeed, 0), w = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? M(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : te(-e.keyPanSpeed, 0), w = !0;
          break;
      }
      w && (o.preventDefault(), e.update());
    }
    function pe() {
      if (P.length === 1)
        p.set(P[0].pageX, P[0].pageY);
      else {
        const o = 0.5 * (P[0].pageX + P[1].pageX), w = 0.5 * (P[0].pageY + P[1].pageY);
        p.set(o, w);
      }
    }
    function je() {
      if (P.length === 1)
        O.set(P[0].pageX, P[0].pageY);
      else {
        const o = 0.5 * (P[0].pageX + P[1].pageX), w = 0.5 * (P[0].pageY + P[1].pageY);
        O.set(o, w);
      }
    }
    function ge() {
      const o = P[0].pageX - P[1].pageX, w = P[0].pageY - P[1].pageY, F = Math.sqrt(o * o + w * w);
      v.set(0, F);
    }
    function mt() {
      e.enableZoom && ge(), e.enablePan && je();
    }
    function Qe() {
      e.enableZoom && ge(), e.enableRotate && pe();
    }
    function et(o) {
      if (P.length == 1)
        E.set(o.pageX, o.pageY);
      else {
        const F = ye(o), U = 0.5 * (o.pageX + F.x), K = 0.5 * (o.pageY + F.y);
        E.set(U, K);
      }
      C.subVectors(E, p).multiplyScalar(e.rotateSpeed);
      const w = e.domElement;
      M(2 * Math.PI * C.x / w.clientHeight), A(2 * Math.PI * C.y / w.clientHeight), p.copy(E);
    }
    function tt(o) {
      if (P.length === 1)
        k.set(o.pageX, o.pageY);
      else {
        const w = ye(o), F = 0.5 * (o.pageX + w.x), U = 0.5 * (o.pageY + w.y);
        k.set(F, U);
      }
      y.subVectors(k, O).multiplyScalar(e.panSpeed), te(y.x, y.y), O.copy(k);
    }
    function ve(o) {
      const w = ye(o), F = o.pageX - w.x, U = o.pageY - w.y, K = Math.sqrt(F * F + U * U);
      b.set(0, K), T.set(0, Math.pow(b.y / v.y, e.zoomSpeed)), Pe(T.y), v.copy(b);
    }
    function Me(o) {
      e.enableZoom && ve(o), e.enablePan && tt(o);
    }
    function nt(o) {
      e.enableZoom && ve(o), e.enableRotate && et(o);
    }
    function $e(o) {
      e.enabled !== !1 && (P.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", ue), e.domElement.addEventListener("pointerup", be)), gt(o), o.pointerType === "touch" ? rt(o) : pt(o));
    }
    function ue(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? it(o) : Ge(o));
    }
    function be(o) {
      ot(o), P.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", ue), e.domElement.removeEventListener("pointerup", be)), e.dispatchEvent(Ut), l = i.NONE;
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
          Ze(o), l = i.DOLLY;
          break;
        case De.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            Fe(o), l = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Le(o), l = i.ROTATE;
          }
          break;
        case De.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Le(o), l = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Fe(o), l = i.PAN;
          }
          break;
        default:
          l = i.NONE;
      }
      l !== i.NONE && e.dispatchEvent(vt);
    }
    function Ge(o) {
      switch (l) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          Je(o);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          ft(o);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          ht(o);
          break;
      }
    }
    function at(o) {
      e.enabled === !1 || e.enableZoom === !1 || l !== i.NONE || (o.preventDefault(), e.dispatchEvent(vt), Ue(o), e.dispatchEvent(Ut));
    }
    function Ye(o) {
      e.enabled === !1 || e.enablePan === !1 || Be(o);
    }
    function rt(o) {
      switch (Ve(o), P.length) {
        case 1:
          switch (e.touches.ONE) {
            case _e.ROTATE:
              if (e.enableRotate === !1)
                return;
              pe(), l = i.TOUCH_ROTATE;
              break;
            case _e.PAN:
              if (e.enablePan === !1)
                return;
              je(), l = i.TOUCH_PAN;
              break;
            default:
              l = i.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case _e.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              mt(), l = i.TOUCH_DOLLY_PAN;
              break;
            case _e.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Qe(), l = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              l = i.NONE;
          }
          break;
        default:
          l = i.NONE;
      }
      l !== i.NONE && e.dispatchEvent(vt);
    }
    function it(o) {
      switch (Ve(o), l) {
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
          Me(o), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          nt(o), e.update();
          break;
        default:
          l = i.NONE;
      }
    }
    function de(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function gt(o) {
      P.push(o);
    }
    function ot(o) {
      delete le[o.pointerId];
      for (let w = 0; w < P.length; w++)
        if (P[w].pointerId == o.pointerId) {
          P.splice(w, 1);
          return;
        }
    }
    function Ve(o) {
      let w = le[o.pointerId];
      w === void 0 && (w = new ae(), le[o.pointerId] = w), w.set(o.pageX, o.pageY);
    }
    function ye(o) {
      const w = o.pointerId === P[0].pointerId ? P[1] : P[0];
      return le[w.pointerId];
    }
    e.domElement.addEventListener("contextmenu", de), e.domElement.addEventListener("pointerdown", $e), e.domElement.addEventListener("pointercancel", be), e.domElement.addEventListener("wheel", at, { passive: !1 }), this.update();
  }
}
const xt = (t) => {
  const [n, r] = re(!1), [e, i] = re(t.options[t.index]), l = () => {
    r(!n);
  }, h = (s) => {
    s !== e && (t.onSelect(s), i(s)), r(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: l, children: e }),
    n && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ u.jsx("li", { onClick: () => h(s), children: s }, s)) })
  ] });
}, Ce = Rn(function(n, r) {
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
      glslVersion: gn,
      side: vn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new St(16777215)
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
class oa extends Yt {
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
  const r = new Ct(-100, 100, 100, -100, 50, 3e3);
  return r.name = t, r.position.copy(n), r.lookAt(0, 0, 0), q.set(t, r), r;
}
Oe("Top", new G(0, 1e3, 0));
Oe("Bottom", new G(0, -1e3, 0));
Oe("Left", new G(-1e3, 0, 0));
Oe("Right", new G(1e3, 0, 0));
Oe("Front", new G(0, 0, 1e3));
Oe("Back", new G(0, 0, -1e3));
Oe("Orthographic", new G(1e3, 1e3, 1e3));
const dt = new lt(60, 1, 50, 3e3);
dt.name = "Debug";
dt.position.set(500, 500, 500);
dt.lookAt(0, 0, 0);
q.set("Debug", dt);
let bt = "Default";
const sa = [
  "Default",
  "Normals",
  "Wireframe"
], ca = new yn(), la = new En({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
}), V = new wn();
function Oa(t) {
  const [n, r] = re(t.mode !== void 0 ? t.mode : "Quad"), e = Se(null), i = Se(null), l = Se(null), h = Se(null);
  let s = q.get("Debug"), c = q.get("Orthographic"), f = q.get("Front"), m = q.get("Top");
  const p = (y, v) => {
    const b = H.get(y.name);
    b !== void 0 && b.dispose(), H.delete(y.name);
    const T = ce.get(y.name);
    T !== void 0 && (V.remove(T), T.dispose()), ce.delete(y.name);
    const j = new na(y, v);
    switch (y.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        j.enableRotate = !1;
        break;
    }
    if (H.set(y.name, j), y instanceof lt) {
      const z = new Cn(y);
      ce.set(y.name, z), V.add(z);
    }
  }, E = (y) => {
    const v = ce.get(y.name);
    v !== void 0 && (V.remove(v), v.dispose(), ce.delete(y.name));
    const b = H.get(y.name);
    b !== void 0 && (b.dispose(), H.delete(y.name));
  }, C = () => {
    H.forEach((y, v) => {
      y.dispose();
      const b = ce.get(v);
      b !== void 0 && (V.remove(b), b.dispose()), ce.delete(v), H.delete(v);
    }), H.clear(), ce.clear();
  }, O = () => {
    switch (n) {
      case "Single":
        p(s, e.current);
        break;
      case "Side by Side":
      case "Stacked":
        p(s, e.current), p(c, i.current);
        break;
      case "Quad":
        p(s, e.current), p(c, i.current), p(f, l.current), p(m, h.current);
        break;
    }
  };
  qe(() => {
    V.name = "Debug Scene", V.add(t.scene);
    const y = new oa();
    V.add(y);
    const v = new xn(500);
    v.name = "axisHelper", V.add(v);
  }, []), qe(() => {
    const y = t.renderer.getSize(new ae());
    let v = y.x, b = y.y, T = Math.floor(v / 2), j = Math.floor(b / 2), z = -1;
    const ee = () => {
      v = window.innerWidth - 300, b = window.innerHeight, T = Math.floor(v / 2), j = Math.floor(b / 2);
      let M = v, A = b;
      switch (n) {
        case "Side by Side":
          M = T, A = b;
          break;
        case "Stacked":
          M = v, A = j;
          break;
        case "Quad":
          M = T, A = j;
          break;
      }
      q.forEach((L) => {
        var J;
        L instanceof Ct ? (L.left = M / -2, L.right = M / 2, L.top = A / 2, L.bottom = A / -2, L.updateProjectionMatrix()) : L instanceof lt && (L.aspect = M / A, L.updateProjectionMatrix(), (J = ce.get(L.name)) == null || J.update());
      });
    }, P = () => {
      t.renderer.setViewport(0, 0, v, b), t.renderer.setScissor(0, 0, v, b), t.renderer.render(V, s);
    }, le = () => {
      if (n === "Side by Side")
        t.renderer.setViewport(0, 0, T, b), t.renderer.setScissor(0, 0, T, b), t.renderer.render(V, s), t.renderer.setViewport(T, 0, T, b), t.renderer.setScissor(T, 0, T, b), t.renderer.render(V, c);
      else {
        const M = b - j;
        t.renderer.setViewport(0, M, v, j), t.renderer.setScissor(0, M, v, j), t.renderer.render(V, s), t.renderer.setViewport(0, 0, v, j), t.renderer.setScissor(0, 0, v, j), t.renderer.render(V, c);
      }
    }, Te = () => {
      let M = 0, A = 0;
      A = b - j, M = 0, t.renderer.setViewport(M, A, T, j), t.renderer.setScissor(M, A, T, j), t.renderer.render(V, s), M = T, t.renderer.setViewport(M, A, T, j), t.renderer.setScissor(M, A, T, j), t.renderer.render(V, c), A = 0, M = 0, t.renderer.setViewport(M, A, T, j), t.renderer.setScissor(M, A, T, j), t.renderer.render(V, f), M = T, t.renderer.setViewport(M, A, T, j), t.renderer.setScissor(M, A, T, j), t.renderer.render(V, m);
    }, oe = () => {
      switch (H.forEach((M) => {
        M.update();
      }), t.scene.update(), t.renderer.clear(), n) {
        case "Single":
          P();
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
    return O(), window.addEventListener("resize", ee), ee(), oe(), () => {
      window.removeEventListener("resize", ee), cancelAnimationFrame(z), z = -1;
    };
  }, [n]);
  const k = [
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
    q.set(y.name, y), k.push(y.name);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, children: [
      n === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(Ce, { camera: s, options: k, ref: e, onSelect: (y) => {
        var b;
        (b = H.get(s.name)) == null || b.dispose();
        const v = q.get(y);
        v !== void 0 && (E(s), s = v, p(v, e.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Ce, { camera: s, options: k, ref: e, onSelect: (y) => {
          var b;
          (b = H.get(s.name)) == null || b.dispose();
          const v = q.get(y);
          v !== void 0 && (E(s), s = v, p(v, e.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: c, options: k, ref: i, onSelect: (y) => {
          var b;
          (b = H.get(c.name)) == null || b.dispose();
          const v = q.get(y);
          v !== void 0 && (E(c), c = v, p(v, i.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Ce, { camera: s, options: k, ref: e, onSelect: (y) => {
          var b;
          (b = H.get(s.name)) == null || b.dispose();
          const v = q.get(y);
          v !== void 0 && (E(s), s = v, p(v, e.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: c, options: k, ref: i, onSelect: (y) => {
          var b;
          (b = H.get(c.name)) == null || b.dispose();
          const v = q.get(y);
          v !== void 0 && (E(c), c = v, p(v, i.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: f, options: k, ref: l, onSelect: (y) => {
          var b;
          (b = H.get(f.name)) == null || b.dispose();
          const v = q.get(y);
          v !== void 0 && (E(f), f = v, p(v, l.current));
        } }),
        /* @__PURE__ */ u.jsx(Ce, { camera: m, options: k, ref: h, onSelect: (y) => {
          var b;
          (b = H.get(m.name)) == null || b.dispose();
          const v = q.get(y);
          v !== void 0 && (E(m), m = v, p(v, h.current));
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
            if (y !== bt)
              switch (bt = y, bt) {
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
function Ta(t) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ u.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ u.jsx("footer", { children: t.footer })
  ] });
}
export {
  wt as Accordion,
  va as Application,
  ut as BaseRemote,
  qt as ChildObject,
  Vn as ContainerObject,
  $n as Draggable,
  Bn as DraggableItem,
  Gn as Dropdown,
  Yn as DropdownItem,
  Ta as Editor,
  oa as InfiniteGridHelper,
  ea as Inspector,
  Oa as MultiView,
  Xt as NavButton,
  ba as RemoteComponents,
  xa as RemoteController,
  ya as RemoteTheatre,
  Ea as RemoteThree,
  wa as RemoteTweakpane,
  Ca as SceneHierarchy,
  Sa as SceneInspector,
  N as ToolEvents,
  I as debugDispatcher
};
