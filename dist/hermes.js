var mt = Object.defineProperty;
var gt = (a, n, r) => n in a ? mt(a, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : a[n] = r;
var y = (a, n, r) => (gt(a, typeof n != "symbol" ? n + "" : n, r), r);
import { Pane as Et } from "tweakpane";
import * as yt from "@tweakpane/plugin-essentials";
import { getProject as Ct } from "@theatre/core";
import { EventDispatcher as _t } from "three";
import Pe, { useState as Y, Component as St } from "react";
import { Reorder as De } from "framer-motion";
import U from "@theatre/studio";
const Ie = () => {
};
class ae {
  constructor(n) {
    y(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class Rt extends ae {
  constructor(n) {
    super(n);
  }
  selectDropdown(n, r) {
    this.app.send({
      event: "dropdownSelect",
      data: {
        dropdown: n,
        value: r
      }
    });
  }
  updateDropdown(n, r) {
    this.app.send({
      event: "draggableListUpdate",
      data: {
        dropdown: n,
        value: r
      }
    });
  }
}
class jt extends ae {
  constructor(r) {
    super(r);
    y(this, "appTab");
    y(this, "systemTab");
    y(this, "utilsTab");
    y(this, "bindCBs");
    y(this, "buttonCBs");
    y(this, "pane");
    y(this, "appCallbacks", 0);
    y(this, "editorCallbacks", 0);
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), r.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Et({ title: "GUI" }), this.pane.registerPlugin(yt);
    const r = this.pane.element.parentElement;
    r.style.left = "50%", r.style.top = "0", r.style.maxHeight = "100%", r.style.overflowX = "hidden", r.style.overflowY = "auto", r.style.transform = "translateX(-50%)", r.style.width = "300px", r.style.zIndex = "100";
    const o = this.pane.addTab({
      pages: [{ title: "App" }, { title: "System" }, { title: "Tools" }]
    });
    this.appTab = o.pages[0], this.systemTab = o.pages[1], this.utilsTab = o.pages[2];
  }
  dispose() {
    var r, o, i, l;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((r = this.appTab) == null || r.dispose(), (o = this.systemTab) == null || o.dispose(), (i = this.utilsTab) == null || i.dispose(), (l = this.pane) == null || l.dispose(), this.appTab = void 0, this.systemTab = void 0, this.utilsTab = void 0, this.pane = void 0);
  }
  addFolder(r, o = void 0, i = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.appTab).addFolder({
        title: r,
        ...o
      });
    this.app.send({
      event: "addFolder",
      data: {
        name: r,
        params: o,
        parent: i
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(r, o, i, l = void 0) {
    const g = this.bindID, b = i.onChange !== void 0 ? i.onChange : Ie;
    this.bindCBs.set(g, b), this.app.editor ? (this.pane === void 0 && this.createGUI(), (l !== void 0 ? l : this.appTab).addBinding(r, o, i).on("change", (E) => {
      this.app.send({
        event: "updateBind",
        data: {
          id: g,
          value: E.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      data: {
        id: g,
        name: o,
        params: i,
        parent: l
      }
    }), this.appCallbacks++);
  }
  triggerBind(r, o) {
    const i = this.bindCBs.get(r);
    i !== void 0 ? i(o) : console.warn(`No callback for: ${r}`, o);
  }
  // Buttons
  button(r, o, i = void 0) {
    const l = this.bindID;
    this.buttonCBs.set(l, o), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.appTab).addButton({ title: r }).on("click", () => {
      this.app.send({
        event: "clickButton",
        data: {
          id: l
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      data: {
        id: l,
        name: r,
        callback: o,
        parent: i
      }
    }), this.appCallbacks++);
  }
  triggerButton(r) {
    const o = this.buttonCBs.get(r);
    o !== void 0 && o();
  }
}
function xt() {
  return Math.round(Math.random() * 1e6).toString();
}
function Tt(a) {
  return a.r !== void 0 && a.g !== void 0 && a.b !== void 0;
}
class wt extends ae {
  constructor(r, o, i) {
    super(r);
    y(this, "project");
    y(this, "sheets");
    y(this, "sheetObjects");
    y(this, "sheetObjectCBs");
    y(this, "sheetObjectUnsubscribe");
    this.project = Ct(o, i), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
  }
  sheet(r) {
    var i;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let o = this.sheets.get(r);
    return o !== void 0 || (o = (i = this.project) == null ? void 0 : i.sheet(r), this.sheets.set(r, o)), o;
  }
  sheetObject(r, o, i, l) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const g = this.sheets.get(r);
    if (g === void 0)
      return;
    const b = `${r}_${o}`;
    let d = this.sheetObjects.get(b);
    if (d !== void 0)
      return d = g.object(o, { ...i, ...d.value }, { reconfigure: !0 }), d;
    d = g.object(o, i), this.sheetObjects.set(b, d), this.sheetObjectCBs.set(b, l !== void 0 ? l : Ie);
    const E = d.onValuesChange((v) => {
      if (this.app.editor) {
        for (const C in v) {
          const S = v[C];
          typeof S == "object" && Tt(S) && (v[C] = {
            r: S.r,
            g: S.g,
            b: S.b,
            a: S.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          data: {
            sheetObject: b,
            values: v
          }
        });
      } else {
        const C = this.sheetObjectCBs.get(b);
        C !== void 0 && C(v);
      }
    });
    return this.sheetObjectUnsubscribe.set(b, E), d;
  }
  unsubscribe(r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const o = `${r.address.sheetId}_${r.address.objectKey}`, i = this.sheetObjectUnsubscribe.get(o);
    i !== void 0 && i();
  }
}
class Gt {
  constructor(n, r) {
    y(this, "components");
    y(this, "debug");
    y(this, "theatre");
    // Protected
    y(this, "mode", "listener");
    y(this, "channel");
    this.editor = n && document.location.hash.search(r) > -1, n && (this.channel = new BroadcastChannel("theatre"));
  }
  setupComponents() {
    this.components = new Rt(this);
  }
  setupGUI() {
    this.debug = new jt(this);
  }
  setupTheatre(n, r) {
    this.theatre = new wt(this, n, r);
  }
  dispose() {
    var n, r;
    (n = this.debug) == null || n.dispose(), (r = this.theatre) == null || r.dispose();
  }
  // Remote
  send(n) {
    this.mode === "editor" && this.channel !== void 0 && this.channel.postMessage(n);
  }
  listen(n) {
    this.mode === "listener" && this.channel !== void 0 && (this.channel.onmessage = (r) => {
      n(r.data);
    });
  }
  // Getters / Setters
  get editor() {
    return this.mode === "editor";
  }
  set editor(n) {
    n && (this.mode = "editor", document.title += " - Editor");
  }
}
const k = new _t(), P = {
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  INSPECT_ITEM: "ToolEvents::inspectItem",
  REFRESH_SCENE: "ToolEvents::refreshScene",
  SET_SCENE: "ToolEvents::setScene"
};
var ne = { exports: {} }, L = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function Ot() {
  if (Oe)
    return L;
  Oe = 1;
  var a = Pe, n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, i = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(b, d, E) {
    var v, C = {}, S = null, D = null;
    E !== void 0 && (S = "" + E), d.key !== void 0 && (S = "" + d.key), d.ref !== void 0 && (D = d.ref);
    for (v in d)
      o.call(d, v) && !l.hasOwnProperty(v) && (C[v] = d[v]);
    if (b && b.defaultProps)
      for (v in d = b.defaultProps, d)
        C[v] === void 0 && (C[v] = d[v]);
    return { $$typeof: n, type: b, key: S, ref: D, props: C, _owner: i.current };
  }
  return L.Fragment = r, L.jsx = g, L.jsxs = g, L;
}
var W = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function kt() {
  return ke || (ke = 1, process.env.NODE_ENV !== "production" && function() {
    var a = Pe, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), b = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), $ = Symbol.iterator, Ae = "@@iterator";
    function $e(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = $ && e[$] || e[Ae];
      return typeof t == "function" ? t : null;
    }
    var N = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(e) {
      {
        for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), c = 1; c < t; c++)
          s[c - 1] = arguments[c];
        Be("error", e, s);
      }
    }
    function Be(e, t, s) {
      {
        var c = N.ReactDebugCurrentFrame, p = c.getStackAddendum();
        p !== "" && (t += "%s", s = s.concat([p]));
        var m = s.map(function(h) {
          return String(h);
        });
        m.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, m);
      }
    }
    var Me = !1, Ue = !1, Le = !1, We = !1, Ye = !1, ie;
    ie = Symbol.for("react.module.reference");
    function Ve(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === o || e === l || Ye || e === i || e === E || e === v || We || e === D || Me || Ue || Le || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === C || e.$$typeof === g || e.$$typeof === b || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function He(e, t, s) {
      var c = e.displayName;
      if (c)
        return c;
      var p = t.displayName || t.name || "";
      return p !== "" ? s + "(" + p + ")" : s;
    }
    function se(e) {
      return e.displayName || "Context";
    }
    function w(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case o:
          return "Fragment";
        case r:
          return "Portal";
        case l:
          return "Profiler";
        case i:
          return "StrictMode";
        case E:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case b:
            var t = e;
            return se(t) + ".Consumer";
          case g:
            var s = e;
            return se(s._context) + ".Provider";
          case d:
            return He(e, e.render, "ForwardRef");
          case C:
            var c = e.displayName || null;
            return c !== null ? c : w(e.type) || "Memo";
          case S: {
            var p = e, m = p._payload, h = p._init;
            try {
              return w(h(m));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, B = 0, oe, ce, le, ue, de, fe, he;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function Ge() {
      {
        if (B === 0) {
          oe = console.log, ce = console.info, le = console.warn, ue = console.error, de = console.group, fe = console.groupCollapsed, he = console.groupEnd;
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
        B++;
      }
    }
    function qe() {
      {
        if (B--, B === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, e, {
              value: oe
            }),
            info: I({}, e, {
              value: ce
            }),
            warn: I({}, e, {
              value: le
            }),
            error: I({}, e, {
              value: ue
            }),
            group: I({}, e, {
              value: de
            }),
            groupCollapsed: I({}, e, {
              value: fe
            }),
            groupEnd: I({}, e, {
              value: he
            })
          });
        }
        B < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = N.ReactCurrentDispatcher, K;
    function V(e, t, s) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (p) {
            var c = p.stack.trim().match(/\n( *(at )?)/);
            K = c && c[1] || "";
          }
        return `
` + K + e;
      }
    }
    var X = !1, H;
    {
      var ze = typeof WeakMap == "function" ? WeakMap : Map;
      H = new ze();
    }
    function pe(e, t) {
      if (!e || X)
        return "";
      {
        var s = H.get(e);
        if (s !== void 0)
          return s;
      }
      var c;
      X = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var m;
      m = J.current, J.current = null, Ge();
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
            } catch (O) {
              c = O;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (O) {
              c = O;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            c = O;
          }
          e();
        }
      } catch (O) {
        if (O && c && typeof O.stack == "string") {
          for (var f = O.stack.split(`
`), x = c.stack.split(`
`), _ = f.length - 1, R = x.length - 1; _ >= 1 && R >= 0 && f[_] !== x[R]; )
            R--;
          for (; _ >= 1 && R >= 0; _--, R--)
            if (f[_] !== x[R]) {
              if (_ !== 1 || R !== 1)
                do
                  if (_--, R--, R < 0 || f[_] !== x[R]) {
                    var T = `
` + f[_].replace(" at new ", " at ");
                    return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && H.set(e, T), T;
                  }
                while (_ >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        X = !1, J.current = m, qe(), Error.prepareStackTrace = p;
      }
      var A = e ? e.displayName || e.name : "", we = A ? V(A) : "";
      return typeof e == "function" && H.set(e, we), we;
    }
    function Je(e, t, s) {
      return pe(e, !1);
    }
    function Ke(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function G(e, t, s) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, Ke(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case E:
          return V("Suspense");
        case v:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Je(e.render);
          case C:
            return G(e.type, t, s);
          case S: {
            var c = e, p = c._payload, m = c._init;
            try {
              return G(m(p), t, s);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, be = {}, me = N.ReactDebugCurrentFrame;
    function z(e) {
      if (e) {
        var t = e._owner, s = G(e.type, e._source, t ? t.type : null);
        me.setExtraStackFrame(s);
      } else
        me.setExtraStackFrame(null);
    }
    function Xe(e, t, s, c, p) {
      {
        var m = Function.call.bind(q);
        for (var h in e)
          if (m(e, h)) {
            var f = void 0;
            try {
              if (typeof e[h] != "function") {
                var x = Error((c || "React class") + ": " + s + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw x.name = "Invariant Violation", x;
              }
              f = e[h](t, h, c, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              f = _;
            }
            f && !(f instanceof Error) && (z(p), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", c || "React class", s, h, typeof f), z(null)), f instanceof Error && !(f.message in be) && (be[f.message] = !0, z(p), j("Failed %s type: %s", s, f.message), z(null));
          }
      }
    }
    var Ze = Array.isArray;
    function Z(e) {
      return Ze(e);
    }
    function Qe(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, s = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return s;
      }
    }
    function et(e) {
      try {
        return ge(e), !1;
      } catch {
        return !0;
      }
    }
    function ge(e) {
      return "" + e;
    }
    function Ee(e) {
      if (et(e))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), ge(e);
    }
    var M = N.ReactCurrentOwner, tt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ye, Ce, Q;
    Q = {};
    function rt(e) {
      if (q.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function nt(e) {
      if (q.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function at(e, t) {
      if (typeof e.ref == "string" && M.current && t && M.current.stateNode !== t) {
        var s = w(M.current.type);
        Q[s] || (j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', w(M.current.type), e.ref), Q[s] = !0);
      }
    }
    function it(e, t) {
      {
        var s = function() {
          ye || (ye = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function st(e, t) {
      {
        var s = function() {
          Ce || (Ce = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var ot = function(e, t, s, c, p, m, h) {
      var f = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: s,
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
        value: c
      }), Object.defineProperty(f, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(f.props), Object.freeze(f)), f;
    };
    function ct(e, t, s, c, p) {
      {
        var m, h = {}, f = null, x = null;
        s !== void 0 && (Ee(s), f = "" + s), nt(t) && (Ee(t.key), f = "" + t.key), rt(t) && (x = t.ref, at(t, p));
        for (m in t)
          q.call(t, m) && !tt.hasOwnProperty(m) && (h[m] = t[m]);
        if (e && e.defaultProps) {
          var _ = e.defaultProps;
          for (m in _)
            h[m] === void 0 && (h[m] = _[m]);
        }
        if (f || x) {
          var R = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          f && it(h, R), x && st(h, R);
        }
        return ot(e, f, x, p, c, M.current, h);
      }
    }
    var ee = N.ReactCurrentOwner, _e = N.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var t = e._owner, s = G(e.type, e._source, t ? t.type : null);
        _e.setExtraStackFrame(s);
      } else
        _e.setExtraStackFrame(null);
    }
    var te;
    te = !1;
    function re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function Se() {
      {
        if (ee.current) {
          var e = w(ee.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function lt(e) {
      {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), s = e.lineNumber;
          return `

Check your code at ` + t + ":" + s + ".";
        }
        return "";
      }
    }
    var Re = {};
    function ut(e) {
      {
        var t = Se();
        if (!t) {
          var s = typeof e == "string" ? e : e.displayName || e.name;
          s && (t = `

Check the top-level render call using <` + s + ">.");
        }
        return t;
      }
    }
    function je(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var s = ut(t);
        if (Re[s])
          return;
        Re[s] = !0;
        var c = "";
        e && e._owner && e._owner !== ee.current && (c = " It was passed a child from " + w(e._owner.type) + "."), F(e), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, c), F(null);
      }
    }
    function xe(e, t) {
      {
        if (typeof e != "object")
          return;
        if (Z(e))
          for (var s = 0; s < e.length; s++) {
            var c = e[s];
            re(c) && je(c, t);
          }
        else if (re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = $e(e);
          if (typeof p == "function" && p !== e.entries)
            for (var m = p.call(e), h; !(h = m.next()).done; )
              re(h.value) && je(h.value, t);
        }
      }
    }
    function dt(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var s;
        if (typeof t == "function")
          s = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === C))
          s = t.propTypes;
        else
          return;
        if (s) {
          var c = w(t);
          Xe(s, e.props, "prop", c, e);
        } else if (t.PropTypes !== void 0 && !te) {
          te = !0;
          var p = w(t);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ft(e) {
      {
        for (var t = Object.keys(e.props), s = 0; s < t.length; s++) {
          var c = t[s];
          if (c !== "children" && c !== "key") {
            F(e), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", c), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), j("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    function Te(e, t, s, c, p, m) {
      {
        var h = Ve(e);
        if (!h) {
          var f = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var x = lt(p);
          x ? f += x : f += Se();
          var _;
          e === null ? _ = "null" : Z(e) ? _ = "array" : e !== void 0 && e.$$typeof === n ? (_ = "<" + (w(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof e, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, f);
        }
        var R = ct(e, t, s, p, m);
        if (R == null)
          return R;
        if (h) {
          var T = t.children;
          if (T !== void 0)
            if (c)
              if (Z(T)) {
                for (var A = 0; A < T.length; A++)
                  xe(T[A], e);
                Object.freeze && Object.freeze(T);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              xe(T, e);
        }
        return e === o ? ft(R) : dt(R), R;
      }
    }
    function ht(e, t, s) {
      return Te(e, t, s, !0);
    }
    function vt(e, t, s) {
      return Te(e, t, s, !1);
    }
    var pt = vt, bt = ht;
    W.Fragment = o, W.jsx = pt, W.jsxs = bt;
  }()), W;
}
process.env.NODE_ENV === "production" ? ne.exports = Ot() : ne.exports = kt();
var u = ne.exports;
function Ne(a) {
  return a.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: a.title } }) : /* @__PURE__ */ u.jsx("button", { children: a.title });
}
const Pt = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Dt = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function It(a) {
  return /* @__PURE__ */ u.jsx(De.Item, { value: a.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    Dt,
    /* @__PURE__ */ u.jsx("span", { children: a.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      a.onDelete(a.index);
    }, children: Pt })
  ] }) }, a.title);
}
function Nt(a) {
  const [n, r] = Y(!1), [o, i] = Y(a.options), l = (E) => {
    a.onDragComplete(E), i(E);
  }, g = (E) => {
    const v = [...o];
    v.splice(E, 1), l(v);
  }, b = [];
  o.forEach((E, v) => {
    b.push(/* @__PURE__ */ u.jsx(It, { index: v, title: E, onDelete: g }, E));
  });
  let d = "dropdown draggable";
  return a.subdropdown && (d += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: d, onMouseEnter: () => r(!0), onMouseLeave: () => r(!1), children: [
    /* @__PURE__ */ u.jsx(Ne, { title: a.title }),
    /* @__PURE__ */ u.jsx(De.Group, { axis: "y", values: o, onReorder: l, style: { visibility: n ? "visible" : "hidden" }, children: b })
  ] });
}
function Ft(a) {
  const [n, r] = Y(!1), o = [];
  a.options.map((l, g) => {
    a.onSelect !== void 0 && (l.onSelect = a.onSelect), o.push(/* @__PURE__ */ u.jsx(At, { option: l }, g));
  });
  let i = "dropdown";
  return a.subdropdown && (i += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: i, onMouseEnter: () => r(!0), onMouseLeave: () => r(!1), children: [
    /* @__PURE__ */ u.jsx(Ne, { title: a.title }),
    /* @__PURE__ */ u.jsx("ul", { style: { visibility: n ? "visible" : "hidden" }, children: o })
  ] });
}
function At(a) {
  const { option: n } = a, [r, o] = Y("");
  let i = null;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ u.jsx(
        Nt,
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
        Ft,
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
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (r !== n.title ? o(n.title) : o(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ u.jsx("li", { className: r === n.title ? "selected" : "", children: i }, xt());
}
function qt(a) {
  let n;
  const r = () => {
    U.ui.hide(), a.listen((i) => {
      var g, b, d, E, v, C, S, D, $;
      let l;
      switch (i.event) {
        case "dropdownSelect":
          k.dispatchEvent({ type: P.SELECT_DROPDOWN, value: i.data });
          break;
        case "draggableListUpdate":
          k.dispatchEvent({ type: P.DRAG_UPDATE, value: i.data });
          break;
        case "addFolder":
          (g = a.debug) == null || g.addFolder(i.data.name, i.data.params, i.data.parent);
          break;
        case "bindObject":
          (b = a.debug) == null || b.bind(i.data.name, i.data.params, i.data.parent);
          break;
        case "updateBind":
          (d = a.debug) == null || d.triggerBind(i.data.id, i.data.value);
          break;
        case "addButton":
          (E = a.debug) == null || E.button(i.data.name, i.data.callback, i.data.parent);
          break;
        case "clickButton":
          (v = a.debug) == null || v.triggerButton(i.data.id);
          break;
        case "setSheet":
          l = (C = a.theatre) == null ? void 0 : C.sheets.get(i.data.sheet), l !== void 0 && (n = l, U.setSelection([l]));
          break;
        case "setSheetObject":
          l = (S = a.theatre) == null ? void 0 : S.sheetObjects.get(`${i.data.sheet}_${i.data.key}`), l !== void 0 && U.setSelection([l]);
          break;
        case "updateSheetObject":
          l = (D = a.theatre) == null ? void 0 : D.sheetObjectCBs.get(i.data.sheetObject), l !== void 0 && l(i.data.values);
          break;
        case "updateTimeline":
          n = ($ = a.theatre) == null ? void 0 : $.sheets.get(i.data.sheet), n !== void 0 && (n.sequence.position = i.data.position);
          break;
      }
    });
  }, o = () => {
    U.ui.restore(), U.onSelectionChange((b) => {
      b.length < 1 || b.forEach((d) => {
        var S;
        let E = d.address.sheetId, v = "setSheet", C = {};
        switch (d.type) {
          case "Theatre_Sheet_PublicAPI":
            v = "setSheet", C = {
              sheet: d.address.sheetId
            }, n = (S = a.theatre) == null ? void 0 : S.sheets.get(d.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            v = "setSheetObject", E += `_${d.address.objectKey}`, C = {
              id: E,
              sheet: d.address.sheetId,
              key: d.address.objectKey
            };
            break;
        }
        a.send({ event: v, data: C });
      });
    });
    let i = 0;
    const l = () => {
      if (n !== void 0 && i !== n.sequence.position) {
        i = n.sequence.position;
        const b = n;
        a.send({
          event: "updateTimeline",
          data: {
            position: i,
            sheet: b.address.sheetId
          }
        });
      }
    }, g = () => {
      l(), requestAnimationFrame(g);
    };
    l(), g();
  };
  a.editor ? o() : r();
}
function $t(a) {
  if (a.name === "cameras")
    return "camera";
  if (a.name === "interactive")
    return "interactive";
  if (a.name === "lights")
    return "light";
  if (a.name === "ui")
    return "ui";
  if (a.name === "utils")
    return "utils";
  const n = a.type;
  return n.search("Helper") > -1 ? "icon_utils" : n.search("Camera") > -1 ? "camera" : n.search("Light") > -1 ? "light" : "obj3D";
}
function Fe(a) {
  const [n, r] = Y(!1);
  let o = null, i = !1;
  if (a.child.children.length > 0) {
    i = !0;
    const l = [];
    a.child.children.map((g) => {
      l.push(/* @__PURE__ */ u.jsx(Fe, { child: g }, Math.random()));
    }), o = /* @__PURE__ */ u.jsx("div", { className: `container ${n ? "" : "closed"}`, children: l });
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      i ? /* @__PURE__ */ u.jsx(
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
            left: i ? "20px" : "5px"
          },
          onClick: () => {
            k.dispatchEvent({ type: P.INSPECT_ITEM, value: a.child });
          },
          children: a.child.name.length > 0 ? `${a.child.name} (${a.child.type})` : `${a.child.type}::${a.child.uuid}`
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${$t(a.child)}` })
    ] }),
    o
  ] }, Math.random());
}
function Bt(a) {
  const n = [];
  return a.child.children.map((r) => {
    n.push(/* @__PURE__ */ u.jsx(Fe, { child: r }, Math.random()));
  }), /* @__PURE__ */ u.jsx("div", { className: "scene", children: n });
}
class zt extends St {
  constructor(r) {
    super(r);
    // Private
    y(this, "onUpdate", () => {
    });
    y(this, "toggleOpen", () => {
      this.setState(() => ({
        open: !this.componentState.open
      }));
    });
    y(this, "onRefresh", () => {
      k.dispatchEvent({ type: P.INSPECT_ITEM, value: this.componentState.scene });
    });
    y(this, "onSetScene", (r) => {
      console.log("SceneHierarchy::onSetScene", r), this.setState(() => ({
        scene: r.value
      }));
    });
    this.state = {
      open: !1,
      scene: null
    }, k.addEventListener(P.REFRESH_SCENE, this.onUpdate), k.addEventListener(P.SET_SCENE, this.onSetScene);
  }
  componentWillUnmount() {
    k.removeEventListener(P.REFRESH_SCENE, this.onUpdate), k.removeEventListener(P.SET_SCENE, this.onSetScene);
  }
  render() {
    const r = this.componentState.scene !== null ? `Hierarchy: ${this.componentState.scene.name}` : "Hierarchy";
    return /* @__PURE__ */ u.jsxs("div", { id: "SceneHierarchy", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "header", children: [
        /* @__PURE__ */ u.jsx(
          "button",
          {
            className: "status",
            style: {
              backgroundPositionX: this.componentState.open ? "-14px" : "2px"
            },
            onClick: this.toggleOpen
          }
        ),
        /* @__PURE__ */ u.jsx("span", { children: r }),
        /* @__PURE__ */ u.jsx("button", { className: "refresh hideText", onClick: this.onRefresh, children: "Refresh" })
      ] }),
      this.componentState.scene !== null && this.componentState.open ? /* @__PURE__ */ u.jsx(Bt, { child: this.componentState.scene }) : null
    ] });
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Jt(a) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", children: [
    /* @__PURE__ */ u.jsx("div", { className: "navBar", children: a.children }),
    a.components
  ] });
}
export {
  Gt as Application,
  Nt as Draggable,
  It as DraggableItem,
  Ft as Dropdown,
  At as DropdownItem,
  Jt as Editor,
  Ne as NavButton,
  qt as RemoteController,
  zt as SceneHierarchy,
  P as ToolEvents,
  k as debugDispatcher
};
