var gt = Object.defineProperty;
var Et = (r, a, n) => a in r ? gt(r, a, { enumerable: !0, configurable: !0, writable: !0, value: n }) : r[a] = n;
var C = (r, a, n) => (Et(r, typeof a != "symbol" ? a + "" : a, n), n);
import { EventDispatcher as yt } from "three";
import { getProject as Ct } from "@theatre/core";
import { Pane as jt } from "tweakpane";
import * as _t from "@tweakpane/plugin-essentials";
import De, { useState as V, Component as Tt } from "react";
import { Reorder as Ie } from "framer-motion";
import L from "@theatre/studio";
class Vt {
  constructor(a, n, o) {
    C(this, "channel");
    C(this, "components", /* @__PURE__ */ new Map());
    // Protected
    C(this, "_mode", "app");
    this.editor = n && document.location.hash.search(o) > -1, n && (this.channel = new BroadcastChannel(a));
  }
  addComponent(a, n) {
    this.components.set(a, n);
  }
  dispose() {
    this.components.forEach((a) => {
      a.dispose();
    }), this.components.clear();
  }
  // Remote
  send(a) {
    this.channel !== void 0 && this._mode !== a.target && this.channel.postMessage(a);
  }
  listen(a) {
    this.channel !== void 0 && (this.channel.onmessage = (n) => {
      a(n.data);
    });
  }
  // Getters / Setters
  get mode() {
    return this._mode;
  }
  get editor() {
    return this._mode === "editor";
  }
  set editor(a) {
    a && (this._mode = "editor", document.title += " - Editor");
  }
}
const D = new yt(), I = {
  CUSTOM: "ToolEvents::custom",
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  SET_SCENE: "ToolEvents::setScene",
  GET_OBJECT: "ToolEvents::getObject",
  SET_OBJECT: "ToolEvents::setObject"
};
class ie {
  constructor(a) {
    C(this, "app");
    this.app = a;
  }
  dispose() {
  }
}
function xt(r) {
  if (r.name === "cameras")
    return "camera";
  if (r.name === "interactive")
    return "interactive";
  if (r.name === "lights")
    return "light";
  if (r.name === "ui")
    return "ui";
  if (r.name === "utils")
    return "utils";
  const a = r.type;
  return a.search("Helper") > -1 ? "icon_utils" : a.search("Camera") > -1 ? "camera" : a.search("Light") > -1 ? "light" : "obj3D";
}
function Ne(r) {
  const a = {
    name: r.name,
    uuid: r.uuid,
    type: r.type,
    children: []
  };
  return r.children.forEach((n) => {
    a.children.push(Ne(n));
  }), a;
}
class Gt extends ie {
  constructor(a) {
    super(a);
  }
  selectDropdown(a, n) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: a,
        value: n
      }
    });
  }
  setScene(a) {
    const n = Ne(a);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: n
    });
  }
  updateDropdown(a, n) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: a,
        value: n
      }
    });
  }
}
function St() {
  return Math.round(Math.random() * 1e6).toString();
}
function Rt(r) {
  return r.r !== void 0 && r.g !== void 0 && r.b !== void 0;
}
const Fe = () => {
};
class Ht extends ie {
  constructor(n, o, c) {
    super(n);
    C(this, "project");
    C(this, "sheets");
    C(this, "sheetObjects");
    C(this, "sheetObjectCBs");
    C(this, "sheetObjectUnsubscribe");
    this.project = Ct(o, c), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(n) {
    var c;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let o = this.sheets.get(n);
    return o !== void 0 || (o = (c = this.project) == null ? void 0 : c.sheet(n), this.sheets.set(n, o)), o;
  }
  sheetObject(n, o, c, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const g = this.sheets.get(n);
    if (g === void 0)
      return;
    const E = `${n}_${o}`;
    let u = this.sheetObjects.get(E);
    if (u !== void 0)
      return u = g.object(o, { ...c, ...u.value }, { reconfigure: !0 }), u;
    u = g.object(o, c), this.sheetObjects.set(E, u), this.sheetObjectCBs.set(E, s !== void 0 ? s : Fe);
    const b = u.onValuesChange((v) => {
      if (this.app.editor) {
        for (const y in v) {
          const j = v[y];
          typeof j == "object" && Rt(j) && (v[y] = {
            r: j.r,
            g: j.g,
            b: j.b,
            a: j.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheetObject: E,
            values: v
          }
        });
      } else {
        const y = this.sheetObjectCBs.get(E);
        y !== void 0 && y(v);
      }
    });
    return this.sheetObjectUnsubscribe.set(E, b), u;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const o = `${n.address.sheetId}_${n.address.objectKey}`, c = this.sheetObjectUnsubscribe.get(o);
    c !== void 0 && c();
  }
}
class qt extends ie {
  constructor(n) {
    super(n);
    C(this, "appTab");
    C(this, "systemTab");
    C(this, "utilsTab");
    C(this, "bindCBs");
    C(this, "buttonCBs");
    C(this, "pane");
    C(this, "appCallbacks", 0);
    C(this, "editorCallbacks", 0);
    C(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), n.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new jt({ title: "GUI" }), this.pane.registerPlugin(_t);
    const n = this.pane.addTab({
      pages: [{ title: "App" }, { title: "System" }, { title: "Tools" }]
    });
    this.appTab = n.pages[0], this.systemTab = n.pages[1], this.utilsTab = n.pages[2];
  }
  dispose() {
    var n, o, c, s;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((n = this.appTab) == null || n.dispose(), (o = this.systemTab) == null || o.dispose(), (c = this.utilsTab) == null || c.dispose(), (s = this.pane) == null || s.dispose(), this.appTab = void 0, this.systemTab = void 0, this.utilsTab = void 0, this.pane = void 0);
  }
  addFolder(n, o = void 0, c = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (c !== void 0 ? c : this.appTab).addFolder({
        title: n,
        ...o
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: n,
        params: o,
        parent: c
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(n, o, c, s = void 0) {
    const g = this.bindID, E = c.onChange !== void 0 ? c.onChange : Fe;
    this.bindCBs.set(g, E), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.appTab).addBinding(n, o, c).on("change", (b) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: g,
          value: b.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: g,
        name: o,
        params: c,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, o) {
    const c = this.bindCBs.get(n);
    c !== void 0 ? c(o) : console.warn(`No callback for: ${n}`, o);
  }
  // Buttons
  button(n, o, c = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, o), this.app.editor ? (this.pane === void 0 && this.createGUI(), (c !== void 0 ? c : this.appTab).addButton({ title: n }).on("click", () => {
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
        name: n,
        callback: o,
        parent: c
      }
    }), this.appCallbacks++);
  }
  triggerButton(n) {
    const o = this.buttonCBs.get(n);
    o !== void 0 && o();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.utilsTab);
  }
  clearInspector() {
    const n = this.inspectorFolder.children.length - 1;
    for (let o = n; o > -1; --o)
      this.inspectorFolder.remove(this.inspectorFolder.children[o]);
  }
}
var ae = { exports: {} }, W = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function Ot() {
  if (ke)
    return W;
  ke = 1;
  var r = De, a = Symbol.for("react.element"), n = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(E, u, b) {
    var v, y = {}, j = null, w = null;
    b !== void 0 && (j = "" + b), u.key !== void 0 && (j = "" + u.key), u.ref !== void 0 && (w = u.ref);
    for (v in u)
      o.call(u, v) && !s.hasOwnProperty(v) && (y[v] = u[v]);
    if (E && E.defaultProps)
      for (v in u = E.defaultProps, u)
        y[v] === void 0 && (y[v] = u[v]);
    return { $$typeof: a, type: E, key: j, ref: w, props: y, _owner: c.current };
  }
  return W.Fragment = n, W.jsx = g, W.jsxs = g, W;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function wt() {
  return Pe || (Pe = 1, process.env.NODE_ENV !== "production" && function() {
    var r = De, a = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), E = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), B = Symbol.iterator, R = "@@iterator";
    function Be(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = B && e[B] || e[R];
      return typeof t == "function" ? t : null;
    }
    var F = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(e) {
      {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), d = 1; d < t; d++)
          i[d - 1] = arguments[d];
        $e("error", e, i);
      }
    }
    function $e(e, t, i) {
      {
        var d = F.ReactDebugCurrentFrame, p = d.getStackAddendum();
        p !== "" && (t += "%s", i = i.concat([p]));
        var m = i.map(function(h) {
          return String(h);
        });
        m.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, m);
      }
    }
    var Ue = !1, Le = !1, We = !1, Ye = !1, Ve = !1, se;
    se = Symbol.for("react.module.reference");
    function Ge(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === o || e === s || Ve || e === c || e === b || e === v || Ye || e === w || Ue || Le || We || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === y || e.$$typeof === g || e.$$typeof === E || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === se || e.getModuleId !== void 0));
    }
    function He(e, t, i) {
      var d = e.displayName;
      if (d)
        return d;
      var p = t.displayName || t.name || "";
      return p !== "" ? i + "(" + p + ")" : i;
    }
    function oe(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case o:
          return "Fragment";
        case n:
          return "Portal";
        case s:
          return "Profiler";
        case c:
          return "StrictMode";
        case b:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            var t = e;
            return oe(t) + ".Consumer";
          case g:
            var i = e;
            return oe(i._context) + ".Provider";
          case u:
            return He(e, e.render, "ForwardRef");
          case y:
            var d = e.displayName || null;
            return d !== null ? d : k(e.type) || "Memo";
          case j: {
            var p = e, m = p._payload, h = p._init;
            try {
              return k(h(m));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var N = Object.assign, $ = 0, ce, le, de, ue, fe, he, pe;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function qe() {
      {
        if ($ === 0) {
          ce = console.log, le = console.info, de = console.warn, ue = console.error, fe = console.group, he = console.groupCollapsed, pe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        $++;
      }
    }
    function Je() {
      {
        if ($--, $ === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: N({}, e, {
              value: ce
            }),
            info: N({}, e, {
              value: le
            }),
            warn: N({}, e, {
              value: de
            }),
            error: N({}, e, {
              value: ue
            }),
            group: N({}, e, {
              value: fe
            }),
            groupCollapsed: N({}, e, {
              value: he
            }),
            groupEnd: N({}, e, {
              value: pe
            })
          });
        }
        $ < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var K = F.ReactCurrentDispatcher, X;
    function G(e, t, i) {
      {
        if (X === void 0)
          try {
            throw Error();
          } catch (p) {
            var d = p.stack.trim().match(/\n( *(at )?)/);
            X = d && d[1] || "";
          }
        return `
` + X + e;
      }
    }
    var Z = !1, H;
    {
      var ze = typeof WeakMap == "function" ? WeakMap : Map;
      H = new ze();
    }
    function be(e, t) {
      if (!e || Z)
        return "";
      {
        var i = H.get(e);
        if (i !== void 0)
          return i;
      }
      var d;
      Z = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var m;
      m = K.current, K.current = null, qe();
      try {
        if (t) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (P) {
              d = P;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (P) {
              d = P;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (P) {
            d = P;
          }
          e();
        }
      } catch (P) {
        if (P && d && typeof P.stack == "string") {
          for (var f = P.stack.split(`
`), S = d.stack.split(`
`), _ = f.length - 1, T = S.length - 1; _ >= 1 && T >= 0 && f[_] !== S[T]; )
            T--;
          for (; _ >= 1 && T >= 0; _--, T--)
            if (f[_] !== S[T]) {
              if (_ !== 1 || T !== 1)
                do
                  if (_--, T--, T < 0 || f[_] !== S[T]) {
                    var O = `
` + f[_].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && H.set(e, O), O;
                  }
                while (_ >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        Z = !1, K.current = m, Je(), Error.prepareStackTrace = p;
      }
      var A = e ? e.displayName || e.name : "", we = A ? G(A) : "";
      return typeof e == "function" && H.set(e, we), we;
    }
    function Ke(e, t, i) {
      return be(e, !1);
    }
    function Xe(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function q(e, t, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return be(e, Xe(e));
      if (typeof e == "string")
        return G(e);
      switch (e) {
        case b:
          return G("Suspense");
        case v:
          return G("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return Ke(e.render);
          case y:
            return q(e.type, t, i);
          case j: {
            var d = e, p = d._payload, m = d._init;
            try {
              return q(m(p), t, i);
            } catch {
            }
          }
        }
      return "";
    }
    var J = Object.prototype.hasOwnProperty, me = {}, ge = F.ReactDebugCurrentFrame;
    function z(e) {
      if (e) {
        var t = e._owner, i = q(e.type, e._source, t ? t.type : null);
        ge.setExtraStackFrame(i);
      } else
        ge.setExtraStackFrame(null);
    }
    function Ze(e, t, i, d, p) {
      {
        var m = Function.call.bind(J);
        for (var h in e)
          if (m(e, h)) {
            var f = void 0;
            try {
              if (typeof e[h] != "function") {
                var S = Error((d || "React class") + ": " + i + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw S.name = "Invariant Violation", S;
              }
              f = e[h](t, h, d, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              f = _;
            }
            f && !(f instanceof Error) && (z(p), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", i, h, typeof f), z(null)), f instanceof Error && !(f.message in me) && (me[f.message] = !0, z(p), x("Failed %s type: %s", i, f.message), z(null));
          }
      }
    }
    var Qe = Array.isArray;
    function Q(e) {
      return Qe(e);
    }
    function et(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, i = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function tt(e) {
      try {
        return Ee(e), !1;
      } catch {
        return !0;
      }
    }
    function Ee(e) {
      return "" + e;
    }
    function ye(e) {
      if (tt(e))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", et(e)), Ee(e);
    }
    var U = F.ReactCurrentOwner, rt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, je, ee;
    ee = {};
    function nt(e) {
      if (J.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function at(e) {
      if (J.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function it(e, t) {
      if (typeof e.ref == "string" && U.current && t && U.current.stateNode !== t) {
        var i = k(U.current.type);
        ee[i] || (x('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(U.current.type), e.ref), ee[i] = !0);
      }
    }
    function st(e, t) {
      {
        var i = function() {
          Ce || (Ce = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
    }
    function ot(e, t) {
      {
        var i = function() {
          je || (je = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
    }
    var ct = function(e, t, i, d, p, m, h) {
      var f = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: i,
        props: h,
        // Record the component responsible for creating this element.
        _owner: m
      };
      return f._store = {}, Object.defineProperty(f._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(f, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(f, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(f.props), Object.freeze(f)), f;
    };
    function lt(e, t, i, d, p) {
      {
        var m, h = {}, f = null, S = null;
        i !== void 0 && (ye(i), f = "" + i), at(t) && (ye(t.key), f = "" + t.key), nt(t) && (S = t.ref, it(t, p));
        for (m in t)
          J.call(t, m) && !rt.hasOwnProperty(m) && (h[m] = t[m]);
        if (e && e.defaultProps) {
          var _ = e.defaultProps;
          for (m in _)
            h[m] === void 0 && (h[m] = _[m]);
        }
        if (f || S) {
          var T = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          f && st(h, T), S && ot(h, T);
        }
        return ct(e, f, S, p, d, U.current, h);
      }
    }
    var te = F.ReactCurrentOwner, _e = F.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var t = e._owner, i = q(e.type, e._source, t ? t.type : null);
        _e.setExtraStackFrame(i);
      } else
        _e.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ne(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function Te() {
      {
        if (te.current) {
          var e = k(te.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function dt(e) {
      {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), i = e.lineNumber;
          return `

Check your code at ` + t + ":" + i + ".";
        }
        return "";
      }
    }
    var xe = {};
    function ut(e) {
      {
        var t = Te();
        if (!t) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (t = `

Check the top-level render call using <` + i + ">.");
        }
        return t;
      }
    }
    function Se(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var i = ut(t);
        if (xe[i])
          return;
        xe[i] = !0;
        var d = "";
        e && e._owner && e._owner !== te.current && (d = " It was passed a child from " + k(e._owner.type) + "."), M(e), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, d), M(null);
      }
    }
    function Re(e, t) {
      {
        if (typeof e != "object")
          return;
        if (Q(e))
          for (var i = 0; i < e.length; i++) {
            var d = e[i];
            ne(d) && Se(d, t);
          }
        else if (ne(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = Be(e);
          if (typeof p == "function" && p !== e.entries)
            for (var m = p.call(e), h; !(h = m.next()).done; )
              ne(h.value) && Se(h.value, t);
        }
      }
    }
    function ft(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var i;
        if (typeof t == "function")
          i = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === y))
          i = t.propTypes;
        else
          return;
        if (i) {
          var d = k(t);
          Ze(i, e.props, "prop", d, e);
        } else if (t.PropTypes !== void 0 && !re) {
          re = !0;
          var p = k(t);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ht(e) {
      {
        for (var t = Object.keys(e.props), i = 0; i < t.length; i++) {
          var d = t[i];
          if (d !== "children" && d !== "key") {
            M(e), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), x("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    function Oe(e, t, i, d, p, m) {
      {
        var h = Ge(e);
        if (!h) {
          var f = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var S = dt(p);
          S ? f += S : f += Te();
          var _;
          e === null ? _ = "null" : Q(e) ? _ = "array" : e !== void 0 && e.$$typeof === a ? (_ = "<" + (k(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof e, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, f);
        }
        var T = lt(e, t, i, p, m);
        if (T == null)
          return T;
        if (h) {
          var O = t.children;
          if (O !== void 0)
            if (d)
              if (Q(O)) {
                for (var A = 0; A < O.length; A++)
                  Re(O[A], e);
                Object.freeze && Object.freeze(O);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Re(O, e);
        }
        return e === o ? ht(T) : ft(T), T;
      }
    }
    function pt(e, t, i) {
      return Oe(e, t, i, !0);
    }
    function vt(e, t, i) {
      return Oe(e, t, i, !1);
    }
    var bt = vt, mt = pt;
    Y.Fragment = o, Y.jsx = bt, Y.jsxs = mt;
  }()), Y;
}
process.env.NODE_ENV === "production" ? ae.exports = Ot() : ae.exports = wt();
var l = ae.exports;
function Me(r) {
  return r.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: r.title } }) : /* @__PURE__ */ l.jsx("button", { children: r.title });
}
const kt = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Pt = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Dt(r) {
  return /* @__PURE__ */ l.jsx(Ie.Item, { value: r.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Pt,
    /* @__PURE__ */ l.jsx("span", { children: r.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      r.onDelete(r.index);
    }, children: kt })
  ] }) }, r.title);
}
function It(r) {
  const [a, n] = V(!1), [o, c] = V(r.options), s = (b) => {
    r.onDragComplete(b), c(b);
  }, g = (b) => {
    const v = [...o];
    v.splice(b, 1), s(v);
  }, E = [];
  o.forEach((b, v) => {
    E.push(/* @__PURE__ */ l.jsx(Dt, { index: v, title: b, onDelete: g }, b));
  });
  let u = "dropdown draggable";
  return r.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
    /* @__PURE__ */ l.jsx(Me, { title: r.title }),
    /* @__PURE__ */ l.jsx(Ie.Group, { axis: "y", values: o, onReorder: s, style: { visibility: a ? "visible" : "hidden" }, children: E })
  ] });
}
function Nt(r) {
  const [a, n] = V(!1), o = [];
  r.options.map((s, g) => {
    r.onSelect !== void 0 && (s.onSelect = r.onSelect), o.push(/* @__PURE__ */ l.jsx(Ft, { option: s }, g));
  });
  let c = "dropdown";
  return r.subdropdown && (c += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: c,
      onMouseEnter: () => n(!0),
      onMouseLeave: () => n(!1),
      children: [
        /* @__PURE__ */ l.jsx(Me, { title: r.title }),
        /* @__PURE__ */ l.jsx(
          "ul",
          {
            style: { visibility: a ? "visible" : "hidden" },
            children: o
          }
        )
      ]
    }
  );
}
function Ft(r) {
  const { option: a } = r, [n, o] = V("");
  let c = null;
  switch (a.type) {
    case "draggable":
      c = /* @__PURE__ */ l.jsx(
        It,
        {
          title: a.title,
          options: a.value,
          onDragComplete: (s) => {
            a.onDragComplete !== void 0 && a.onDragComplete(s);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      c = /* @__PURE__ */ l.jsx(
        Nt,
        {
          title: a.title,
          options: a.value,
          onSelect: a.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      c = /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: () => {
            a.onSelect !== void 0 && a.onSelect(a.value), a.selectable && (n !== a.title ? o(a.title) : o(""));
          },
          children: a.title
        }
      );
      break;
  }
  return /* @__PURE__ */ l.jsx("li", { className: n === a.title ? "selected" : "", children: c }, St());
}
function Jt(r) {
  let a;
  const n = r.editor ? "editor" : "app";
  console.log("RemoteController:", n), r.listen((s) => {
    var g, E, u, b, v, y, j, w, B;
    if (n === "app") {
      let R;
      switch (s.event) {
        case "custom":
          D.dispatchEvent({ type: I.CUSTOM, value: s.data });
          break;
        case "setSheet":
          R = (g = r.components.get("theatre")) == null ? void 0 : g.sheets.get(s.data.sheet), R !== void 0 && (a = R, L.setSelection([R]));
          break;
        case "setSheetObject":
          R = (E = r.components.get("theatre")) == null ? void 0 : E.sheetObjects.get(`${s.data.sheet}_${s.data.key}`), R !== void 0 && L.setSelection([R]);
          break;
        case "updateSheetObject":
          R = (u = r.components.get("theatre")) == null ? void 0 : u.sheetObjectCBs.get(s.data.sheetObject), R !== void 0 && R(s.data.values);
          break;
        case "updateTimeline":
          a = (b = r.components.get("theatre")) == null ? void 0 : b.sheets.get(s.data.sheet), a !== void 0 && (a.sequence.position = s.data.position);
          break;
        case "addFolder":
          (v = r.components.get("debug")) == null || v.addFolder(s.data.name, s.data.params, s.data.parent);
          break;
        case "bindObject":
          (y = r.components.get("debug")) == null || y.bind(s.data.name, s.data.params, s.data.parent);
          break;
        case "updateBind":
          (j = r.components.get("debug")) == null || j.triggerBind(s.data.id, s.data.value);
          break;
        case "addButton":
          (w = r.components.get("debug")) == null || w.button(s.data.name, s.data.callback, s.data.parent);
          break;
        case "clickButton":
          (B = r.components.get("debug")) == null || B.triggerButton(s.data.id);
          break;
        case "selectComponent":
          D.dispatchEvent({ type: I.SELECT_DROPDOWN, value: s.data });
          break;
        case "draggableListUpdate":
          D.dispatchEvent({ type: I.DRAG_UPDATE, value: s.data });
          break;
      }
    } else
      switch (s.event) {
        case "custom":
          D.dispatchEvent({ type: I.CUSTOM, value: s.data });
          break;
        case "setScene":
          D.dispatchEvent({ type: I.SET_SCENE, value: s.data });
          break;
      }
  });
  function o() {
    L.ui.hide();
  }
  function c() {
    L.ui.restore(), L.onSelectionChange((u) => {
      u.length < 1 || u.forEach((b) => {
        var w;
        let v = b.address.sheetId, y = "setSheet", j = {};
        switch (b.type) {
          case "Theatre_Sheet_PublicAPI":
            y = "setSheet", j = {
              sheet: b.address.sheetId
            }, a = (w = r.components.get("theatre")) == null ? void 0 : w.sheets.get(b.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            y = "setSheetObject", v += `_${b.address.objectKey}`, j = {
              id: v,
              sheet: b.address.sheetId,
              key: b.address.objectKey
            };
            break;
        }
        r.send({ event: y, target: "app", data: j });
      });
    });
    let s = 0;
    const g = () => {
      if (a !== void 0 && s !== a.sequence.position) {
        s = a.sequence.position;
        const u = a;
        r.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: s,
            sheet: u.address.sheetId
          }
        });
      }
    }, E = () => {
      g(), requestAnimationFrame(E);
    };
    g(), E();
  }
  r.editor ? c() : o();
}
function Ae(r) {
  const [a, n] = V(!1);
  let o = null, c = !1;
  if (r.child.children.length > 0) {
    c = !0;
    const s = [];
    r.child.children.map((g) => {
      s.push(/* @__PURE__ */ l.jsx(Ae, { child: g }, Math.random()));
    }), o = /* @__PURE__ */ l.jsx("div", { className: `container ${a ? "" : "closed"}`, children: s });
  }
  return /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "child", children: [
      c ? /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: a ? "-14px" : "2px"
          },
          onClick: () => {
            n(!a);
          }
        }
      ) : null,
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "name",
          style: {
            left: c ? "20px" : "5px"
          },
          onClick: () => {
            D.dispatchEvent({ type: I.GET_OBJECT, value: r.child });
          },
          children: r.child.name.length > 0 ? `${r.child.name} (${r.child.type})` : `${r.child.type}::${r.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${xt(r.child)}` })
    ] }),
    o
  ] }, Math.random());
}
function Mt(r) {
  const a = [];
  return r.child.children.map((n) => {
    a.push(/* @__PURE__ */ l.jsx(Ae, { child: n }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${r.class}`, children: a });
}
class zt extends Tt {
  constructor(n) {
    super(n);
    // Private
    C(this, "onRefresh", () => {
      D.dispatchEvent({ type: I.SET_SCENE, value: this.componentState.scene });
    });
    C(this, "toggleOpen", () => {
      this.setState(() => ({
        open: !this.componentState.open
      }));
    });
    C(this, "setScene", (n) => {
      this.setState(() => ({
        scene: n.value
      }));
    });
    this.state = {
      mode: "Hierarchy",
      open: !1,
      scene: null
    }, D.addEventListener(I.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    D.removeEventListener(I.SET_SCENE, this.setScene);
  }
  render() {
    const n = this.componentState.scene !== null;
    return /* @__PURE__ */ l.jsx("div", { id: "SceneHierarchy", className: n ? "" : "hidden", children: n && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("ul", { id: "options", children: [
        /* @__PURE__ */ l.jsx("li", { className: "icon", children: /* @__PURE__ */ l.jsx(
          "button",
          {
            className: "status",
            onClick: this.toggleOpen,
            style: {
              backgroundPositionX: this.componentState.open ? "-14px" : "2px"
            },
            children: "Toggle"
          }
        ) }),
        /* @__PURE__ */ l.jsx("li", { className: "icon", children: /* @__PURE__ */ l.jsx("button", { className: "refresh", onClick: this.onRefresh, children: "Refresh" }) }),
        /* @__PURE__ */ l.jsx("li", { className: this.mode === "Hierarchy" ? "selected" : "", children: /* @__PURE__ */ l.jsx("button", { onClick: () => {
          this.mode = "Hierarchy";
        }, children: "Hierarchy" }) }),
        /* @__PURE__ */ l.jsx("li", { className: this.mode === "Inspector" ? "selected" : "", children: /* @__PURE__ */ l.jsx("button", { onClick: () => {
          this.mode = "Inspector";
        }, children: "Inspector" }) })
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: this.componentState.open ? "" : "hidden", children: /* @__PURE__ */ l.jsx(Mt, { class: this.mode === "Hierarchy" ? "" : "hidden", child: this.componentState.scene }) })
    ] }) });
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
  get mode() {
    return this.componentState.mode;
  }
  set mode(n) {
    this.setState(() => ({ mode: n }));
  }
}
function Kt(r) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: r.ref, style: r.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: r.header }),
    r.children,
    /* @__PURE__ */ l.jsx("footer", { children: r.footer })
  ] });
}
export {
  Vt as Application,
  ie as BaseRemote,
  It as Draggable,
  Dt as DraggableItem,
  Nt as Dropdown,
  Ft as DropdownItem,
  Kt as Editor,
  Me as NavButton,
  Gt as RemoteComponents,
  Jt as RemoteController,
  Ht as RemoteTheatre,
  qt as RemoteTweakpane,
  zt as SceneHierarchy,
  I as ToolEvents,
  D as debugDispatcher
};
