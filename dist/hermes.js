var yt = Object.defineProperty;
var jt = (t, r, a) => r in t ? yt(t, r, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[r] = a;
var j = (t, r, a) => (jt(t, typeof r != "symbol" ? r + "" : r, a), a);
import { EventDispatcher as xt, Matrix4 as Ct, Vector3 as Ie, Euler as _t } from "three";
import { getProject as Tt } from "@theatre/core";
import { Pane as St } from "tweakpane";
import * as Rt from "@tweakpane/plugin-essentials";
import Be, { useState as N, useEffect as Ot, Component as wt } from "react";
import { Reorder as Me } from "framer-motion";
import W from "@theatre/studio";
class kt {
  constructor(r, a, i) {
    j(this, "channel");
    j(this, "components", /* @__PURE__ */ new Map());
    // Protected
    j(this, "_mode", "app");
    this.editor = a && document.location.hash.search(i) > -1, a && (this.channel = new BroadcastChannel(r));
  }
  addComponent(r, a) {
    this.components.set(r, a);
  }
  dispose() {
    this.components.forEach((r) => {
      r.dispose();
    }), this.components.clear();
  }
  // Remote
  send(r) {
    this.channel !== void 0 && this._mode !== r.target && this.channel.postMessage(r);
  }
  listen(r) {
    this.channel !== void 0 && (this.channel.onmessage = (a) => {
      r(a.data);
    });
  }
  // Getters / Setters
  get mode() {
    return this._mode;
  }
  get editor() {
    return this._mode === "editor";
  }
  set editor(r) {
    r && (this._mode = "editor", document.title += " - Editor");
  }
}
const R = new xt(), O = {
  CUSTOM: "ToolEvents::custom",
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  GET_SCENE: "ToolEvents::getScene",
  SET_SCENE: "ToolEvents::setScene",
  GET_OBJECT: "ToolEvents::getObject",
  SET_OBJECT: "ToolEvents::setObject",
  UPDATE_OBJECT: "ToolEvents::updateObject"
};
class oe {
  constructor(r) {
    j(this, "app");
    this.app = r;
  }
  dispose() {
  }
}
class en extends oe {
  selectDropdown(r, a) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: r,
        value: a
      }
    });
  }
  updateDropdown(r, a) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: r,
        value: a
      }
    });
  }
}
function Pt() {
  return Math.round(Math.random() * 1e6).toString();
}
function Dt(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
const Ae = () => {
};
class It extends oe {
  constructor(a, i, l) {
    super(a);
    j(this, "project");
    j(this, "sheets");
    j(this, "sheetObjects");
    j(this, "sheetObjectCBs");
    j(this, "sheetObjectUnsubscribe");
    this.project = Tt(i, l), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(a) {
    var l;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let i = this.sheets.get(a);
    return i !== void 0 || (i = (l = this.project) == null ? void 0 : l.sheet(a), this.sheets.set(a, i)), i;
  }
  sheetObject(a, i, l, f) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const y = this.sheets.get(a);
    if (y === void 0)
      return;
    const c = `${a}_${i}`;
    let d = this.sheetObjects.get(c);
    if (d !== void 0)
      return d = y.object(i, { ...l, ...d.value }, { reconfigure: !0 }), d;
    d = y.object(i, l), this.sheetObjects.set(c, d), this.sheetObjectCBs.set(c, f !== void 0 ? f : Ae);
    const g = d.onValuesChange((h) => {
      if (this.app.editor) {
        for (const b in h) {
          const C = h[b];
          typeof C == "object" && Dt(C) && (h[b] = {
            r: C.r,
            g: C.g,
            b: C.b,
            a: C.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheetObject: c,
            values: h
          }
        });
      } else {
        const b = this.sheetObjectCBs.get(c);
        b !== void 0 && b(h);
      }
    });
    return this.sheetObjectUnsubscribe.set(c, g), d;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const i = `${a.address.sheetId}_${a.address.objectKey}`, l = this.sheetObjectUnsubscribe.get(i);
    l !== void 0 && l();
  }
}
class tn extends oe {
  constructor(a) {
    super(a);
    j(this, "appTab");
    j(this, "systemTab");
    j(this, "utilsTab");
    j(this, "bindCBs");
    j(this, "buttonCBs");
    j(this, "pane");
    j(this, "appCallbacks", 0);
    j(this, "editorCallbacks", 0);
    j(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new St({ title: "GUI" }), this.pane.registerPlugin(Rt);
    const a = this.pane.addTab({
      pages: [{ title: "App" }, { title: "System" }, { title: "Tools" }]
    });
    this.appTab = a.pages[0], this.systemTab = a.pages[1], this.utilsTab = a.pages[2];
  }
  dispose() {
    var a, i, l, f;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((a = this.appTab) == null || a.dispose(), (i = this.systemTab) == null || i.dispose(), (l = this.utilsTab) == null || l.dispose(), (f = this.pane) == null || f.dispose(), this.appTab = void 0, this.systemTab = void 0, this.utilsTab = void 0, this.pane = void 0);
  }
  addFolder(a, i = void 0, l = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (l !== void 0 ? l : this.appTab).addFolder({
        title: a,
        ...i
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: a,
        params: i,
        parent: l
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(a, i, l, f = void 0) {
    const y = this.bindID, c = l.onChange !== void 0 ? l.onChange : Ae;
    this.bindCBs.set(y, c), this.app.editor ? (this.pane === void 0 && this.createGUI(), (f !== void 0 ? f : this.appTab).addBinding(a, i, l).on("change", (g) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: y,
          value: g.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: y,
        name: i,
        params: l,
        parent: f
      }
    }), this.appCallbacks++);
  }
  triggerBind(a, i) {
    const l = this.bindCBs.get(a);
    l !== void 0 ? l(i) : console.warn(`No callback for: ${a}`, i);
  }
  // Buttons
  button(a, i, l = void 0) {
    const f = this.bindID;
    this.buttonCBs.set(f, i), this.app.editor ? (this.pane === void 0 && this.createGUI(), (l !== void 0 ? l : this.appTab).addButton({ title: a }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: f
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: f,
        name: a,
        callback: i,
        parent: l
      }
    }), this.appCallbacks++);
  }
  triggerButton(a) {
    const i = this.buttonCBs.get(a);
    i !== void 0 && i();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.utilsTab);
  }
  clearInspector() {
    const a = this.inspectorFolder.children.length - 1;
    for (let i = a; i > -1; --i)
      this.inspectorFolder.remove(this.inspectorFolder.children[i]);
  }
}
var se = { exports: {} }, V = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function Ft() {
  if (Fe)
    return V;
  Fe = 1;
  var t = Be, r = Symbol.for("react.element"), a = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, l = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(c, d, g) {
    var h, b = {}, C = null, k = null;
    g !== void 0 && (C = "" + g), d.key !== void 0 && (C = "" + d.key), d.ref !== void 0 && (k = d.ref);
    for (h in d)
      i.call(d, h) && !f.hasOwnProperty(h) && (b[h] = d[h]);
    if (c && c.defaultProps)
      for (h in d = c.defaultProps, d)
        b[h] === void 0 && (b[h] = d[h]);
    return { $$typeof: r, type: c, key: C, ref: k, props: b, _owner: l.current };
  }
  return V.Fragment = a, V.jsx = y, V.jsxs = y, V;
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
var Ne;
function Nt() {
  return Ne || (Ne = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Be, r = Symbol.for("react.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), P = Symbol.iterator, B = "@@iterator";
    function G(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = P && e[P] || e[B];
      return typeof n == "function" ? n : null;
    }
    var D = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(e) {
      {
        for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++)
          s[u - 1] = arguments[u];
        Le("error", e, s);
      }
    }
    function Le(e, n, s) {
      {
        var u = D.ReactDebugCurrentFrame, m = u.getStackAddendum();
        m !== "" && (n += "%s", s = s.concat([m]));
        var E = s.map(function(p) {
          return String(p);
        });
        E.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, E);
      }
    }
    var We = !1, Ve = !1, Ye = !1, Ge = !1, He = !1, le;
    le = Symbol.for("react.module.reference");
    function Je(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === f || He || e === l || e === g || e === h || Ge || e === k || We || Ve || Ye || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === b || e.$$typeof === y || e.$$typeof === c || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === le || e.getModuleId !== void 0));
    }
    function qe(e, n, s) {
      var u = e.displayName;
      if (u)
        return u;
      var m = n.displayName || n.name || "";
      return m !== "" ? s + "(" + m + ")" : s;
    }
    function ue(e) {
      return e.displayName || "Context";
    }
    function I(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case i:
          return "Fragment";
        case a:
          return "Portal";
        case f:
          return "Profiler";
        case l:
          return "StrictMode";
        case g:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            var n = e;
            return ue(n) + ".Consumer";
          case y:
            var s = e;
            return ue(s._context) + ".Provider";
          case d:
            return qe(e, e.render, "ForwardRef");
          case b:
            var u = e.displayName || null;
            return u !== null ? u : I(e.type) || "Memo";
          case C: {
            var m = e, E = m._payload, p = m._init;
            try {
              return I(p(E));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, $ = 0, de, fe, he, ve, pe, be, me;
    function ge() {
    }
    ge.__reactDisabledLog = !0;
    function ze() {
      {
        if ($ === 0) {
          de = console.log, fe = console.info, he = console.warn, ve = console.error, pe = console.group, be = console.groupCollapsed, me = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ge,
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
    function Ke() {
      {
        if ($--, $ === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, e, {
              value: de
            }),
            info: M({}, e, {
              value: fe
            }),
            warn: M({}, e, {
              value: he
            }),
            error: M({}, e, {
              value: ve
            }),
            group: M({}, e, {
              value: pe
            }),
            groupCollapsed: M({}, e, {
              value: be
            }),
            groupEnd: M({}, e, {
              value: me
            })
          });
        }
        $ < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = D.ReactCurrentDispatcher, Q;
    function H(e, n, s) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (m) {
            var u = m.stack.trim().match(/\n( *(at )?)/);
            Q = u && u[1] || "";
          }
        return `
` + Q + e;
      }
    }
    var ee = !1, J;
    {
      var Xe = typeof WeakMap == "function" ? WeakMap : Map;
      J = new Xe();
    }
    function Ee(e, n) {
      if (!e || ee)
        return "";
      {
        var s = J.get(e);
        if (s !== void 0)
          return s;
      }
      var u;
      ee = !0;
      var m = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var E;
      E = Z.current, Z.current = null, ze();
      try {
        if (n) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (F) {
              u = F;
            }
            Reflect.construct(e, [], p);
          } else {
            try {
              p.call();
            } catch (F) {
              u = F;
            }
            e.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            u = F;
          }
          e();
        }
      } catch (F) {
        if (F && u && typeof F.stack == "string") {
          for (var v = F.stack.split(`
`), S = u.stack.split(`
`), x = v.length - 1, _ = S.length - 1; x >= 1 && _ >= 0 && v[x] !== S[_]; )
            _--;
          for (; x >= 1 && _ >= 0; x--, _--)
            if (v[x] !== S[_]) {
              if (x !== 1 || _ !== 1)
                do
                  if (x--, _--, _ < 0 || v[x] !== S[_]) {
                    var w = `
` + v[x].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && J.set(e, w), w;
                  }
                while (x >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        ee = !1, Z.current = E, Ke(), Error.prepareStackTrace = m;
      }
      var U = e ? e.displayName || e.name : "", De = U ? H(U) : "";
      return typeof e == "function" && J.set(e, De), De;
    }
    function Ze(e, n, s) {
      return Ee(e, !1);
    }
    function Qe(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function q(e, n, s) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ee(e, Qe(e));
      if (typeof e == "string")
        return H(e);
      switch (e) {
        case g:
          return H("Suspense");
        case h:
          return H("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Ze(e.render);
          case b:
            return q(e.type, n, s);
          case C: {
            var u = e, m = u._payload, E = u._init;
            try {
              return q(E(m), n, s);
            } catch {
            }
          }
        }
      return "";
    }
    var z = Object.prototype.hasOwnProperty, ye = {}, je = D.ReactDebugCurrentFrame;
    function K(e) {
      if (e) {
        var n = e._owner, s = q(e.type, e._source, n ? n.type : null);
        je.setExtraStackFrame(s);
      } else
        je.setExtraStackFrame(null);
    }
    function et(e, n, s, u, m) {
      {
        var E = Function.call.bind(z);
        for (var p in e)
          if (E(e, p)) {
            var v = void 0;
            try {
              if (typeof e[p] != "function") {
                var S = Error((u || "React class") + ": " + s + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw S.name = "Invariant Violation", S;
              }
              v = e[p](n, p, u, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              v = x;
            }
            v && !(v instanceof Error) && (K(m), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", s, p, typeof v), K(null)), v instanceof Error && !(v.message in ye) && (ye[v.message] = !0, K(m), T("Failed %s type: %s", s, v.message), K(null));
          }
      }
    }
    var tt = Array.isArray;
    function te(e) {
      return tt(e);
    }
    function nt(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, s = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return s;
      }
    }
    function rt(e) {
      try {
        return xe(e), !1;
      } catch {
        return !0;
      }
    }
    function xe(e) {
      return "" + e;
    }
    function Ce(e) {
      if (rt(e))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nt(e)), xe(e);
    }
    var L = D.ReactCurrentOwner, at = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _e, Te, ne;
    ne = {};
    function it(e) {
      if (z.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function st(e) {
      if (z.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ot(e, n) {
      if (typeof e.ref == "string" && L.current && n && L.current.stateNode !== n) {
        var s = I(L.current.type);
        ne[s] || (T('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(L.current.type), e.ref), ne[s] = !0);
      }
    }
    function ct(e, n) {
      {
        var s = function() {
          _e || (_e = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function lt(e, n) {
      {
        var s = function() {
          Te || (Te = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var ut = function(e, n, s, u, m, E, p) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: s,
        props: p,
        // Record the component responsible for creating this element.
        _owner: E
      };
      return v._store = {}, Object.defineProperty(v._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(v, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.defineProperty(v, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function dt(e, n, s, u, m) {
      {
        var E, p = {}, v = null, S = null;
        s !== void 0 && (Ce(s), v = "" + s), st(n) && (Ce(n.key), v = "" + n.key), it(n) && (S = n.ref, ot(n, m));
        for (E in n)
          z.call(n, E) && !at.hasOwnProperty(E) && (p[E] = n[E]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (E in x)
            p[E] === void 0 && (p[E] = x[E]);
        }
        if (v || S) {
          var _ = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && ct(p, _), S && lt(p, _);
        }
        return ut(e, v, S, m, u, L.current, p);
      }
    }
    var re = D.ReactCurrentOwner, Se = D.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var n = e._owner, s = q(e.type, e._source, n ? n.type : null);
        Se.setExtraStackFrame(s);
      } else
        Se.setExtraStackFrame(null);
    }
    var ae;
    ae = !1;
    function ie(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function Re() {
      {
        if (re.current) {
          var e = I(re.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ft(e) {
      {
        if (e !== void 0) {
          var n = e.fileName.replace(/^.*[\\\/]/, ""), s = e.lineNumber;
          return `

Check your code at ` + n + ":" + s + ".";
        }
        return "";
      }
    }
    var Oe = {};
    function ht(e) {
      {
        var n = Re();
        if (!n) {
          var s = typeof e == "string" ? e : e.displayName || e.name;
          s && (n = `

Check the top-level render call using <` + s + ">.");
        }
        return n;
      }
    }
    function we(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var s = ht(n);
        if (Oe[s])
          return;
        Oe[s] = !0;
        var u = "";
        e && e._owner && e._owner !== re.current && (u = " It was passed a child from " + I(e._owner.type) + "."), A(e), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, u), A(null);
      }
    }
    function ke(e, n) {
      {
        if (typeof e != "object")
          return;
        if (te(e))
          for (var s = 0; s < e.length; s++) {
            var u = e[s];
            ie(u) && we(u, n);
          }
        else if (ie(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var m = G(e);
          if (typeof m == "function" && m !== e.entries)
            for (var E = m.call(e), p; !(p = E.next()).done; )
              ie(p.value) && we(p.value, n);
        }
      }
    }
    function vt(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var s;
        if (typeof n == "function")
          s = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === b))
          s = n.propTypes;
        else
          return;
        if (s) {
          var u = I(n);
          et(s, e.props, "prop", u, e);
        } else if (n.PropTypes !== void 0 && !ae) {
          ae = !0;
          var m = I(n);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", m || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pt(e) {
      {
        for (var n = Object.keys(e.props), s = 0; s < n.length; s++) {
          var u = n[s];
          if (u !== "children" && u !== "key") {
            A(e), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), T("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    function Pe(e, n, s, u, m, E) {
      {
        var p = Je(e);
        if (!p) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var S = ft(m);
          S ? v += S : v += Re();
          var x;
          e === null ? x = "null" : te(e) ? x = "array" : e !== void 0 && e.$$typeof === r ? (x = "<" + (I(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, v);
        }
        var _ = dt(e, n, s, m, E);
        if (_ == null)
          return _;
        if (p) {
          var w = n.children;
          if (w !== void 0)
            if (u)
              if (te(w)) {
                for (var U = 0; U < w.length; U++)
                  ke(w[U], e);
                Object.freeze && Object.freeze(w);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(w, e);
        }
        return e === i ? pt(_) : vt(_), _;
      }
    }
    function bt(e, n, s) {
      return Pe(e, n, s, !0);
    }
    function mt(e, n, s) {
      return Pe(e, n, s, !1);
    }
    var gt = mt, Et = bt;
    Y.Fragment = i, Y.jsx = gt, Y.jsxs = Et;
  }()), Y;
}
process.env.NODE_ENV === "production" ? se.exports = Ft() : se.exports = Nt();
var o = se.exports;
function Ue(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ o.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ o.jsx("button", { children: t.title });
}
const Bt = /* @__PURE__ */ o.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ o.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ o.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ o.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Mt = /* @__PURE__ */ o.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ o.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function At(t) {
  return /* @__PURE__ */ o.jsx(Me.Item, { value: t.title, children: /* @__PURE__ */ o.jsxs("div", { children: [
    Mt,
    /* @__PURE__ */ o.jsx("span", { children: t.title }),
    /* @__PURE__ */ o.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Bt })
  ] }) }, t.title);
}
function Ut(t) {
  const [r, a] = N(!1), [i, l] = N(t.options), f = (g) => {
    t.onDragComplete(g), l(g);
  }, y = (g) => {
    const h = [...i];
    h.splice(g, 1), f(h);
  }, c = [];
  i.forEach((g, h) => {
    c.push(/* @__PURE__ */ o.jsx(At, { index: h, title: g, onDelete: y }, g));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ o.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ o.jsx(Ue, { title: t.title }),
    /* @__PURE__ */ o.jsx(Me.Group, { axis: "y", values: i, onReorder: f, style: { visibility: r ? "visible" : "hidden" }, children: c })
  ] });
}
function $t(t) {
  const [r, a] = N(!1), i = [];
  t.options.map((f, y) => {
    t.onSelect !== void 0 && (f.onSelect = t.onSelect), i.push(/* @__PURE__ */ o.jsx(Lt, { option: f }, y));
  });
  let l = "dropdown";
  return t.subdropdown && (l += " subdropdown"), /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: l,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ o.jsx(Ue, { title: t.title }),
        /* @__PURE__ */ o.jsx(
          "ul",
          {
            style: { visibility: r ? "visible" : "hidden" },
            children: i
          }
        )
      ]
    }
  );
}
function Lt(t) {
  const { option: r } = t, [a, i] = N("");
  let l = null;
  switch (r.type) {
    case "draggable":
      l = /* @__PURE__ */ o.jsx(
        Ut,
        {
          title: r.title,
          options: r.value,
          onDragComplete: (f) => {
            r.onDragComplete !== void 0 && r.onDragComplete(f);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      l = /* @__PURE__ */ o.jsx(
        $t,
        {
          title: r.title,
          options: r.value,
          onSelect: r.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      l = /* @__PURE__ */ o.jsx(
        "button",
        {
          onClick: () => {
            r.onSelect !== void 0 && r.onSelect(r.value), r.selectable && (a !== r.title ? i(r.title) : i(""));
          },
          children: r.title
        }
      );
      break;
  }
  return /* @__PURE__ */ o.jsx("li", { className: a === r.title ? "selected" : "", children: l }, Pt());
}
function nn(t) {
  let r;
  const a = t.editor ? "editor" : "app";
  function i(c) {
    var g, h, b, C, k, P, B, G, D;
    let d;
    switch (c.event) {
      case "custom":
        R.dispatchEvent({ type: O.CUSTOM, value: c.data });
        break;
      case "selectComponent":
        R.dispatchEvent({ type: O.SELECT_DROPDOWN, value: c.data });
        break;
      case "draggableListUpdate":
        R.dispatchEvent({ type: O.DRAG_UPDATE, value: c.data });
        break;
      case "addFolder":
        (g = t.components.get("debug")) == null || g.addFolder(c.data.name, c.data.params, c.data.parent);
        break;
      case "bindObject":
        (h = t.components.get("debug")) == null || h.bind(c.data.name, c.data.params, c.data.parent);
        break;
      case "updateBind":
        (b = t.components.get("debug")) == null || b.triggerBind(c.data.id, c.data.value);
        break;
      case "addButton":
        (C = t.components.get("debug")) == null || C.button(c.data.name, c.data.callback, c.data.parent);
        break;
      case "clickButton":
        (k = t.components.get("debug")) == null || k.triggerButton(c.data.id);
        break;
      case "setSheet":
        d = (P = t.components.get("theatre")) == null ? void 0 : P.sheets.get(c.data.sheet), d !== void 0 && (r = d, W.setSelection([d]));
        break;
      case "setSheetObject":
        d = (B = t.components.get("theatre")) == null ? void 0 : B.sheetObjects.get(`${c.data.sheet}_${c.data.key}`), d !== void 0 && W.setSelection([d]);
        break;
      case "updateSheetObject":
        d = (G = t.components.get("theatre")) == null ? void 0 : G.sheetObjectCBs.get(c.data.sheetObject), d !== void 0 && d(c.data.values);
        break;
      case "updateTimeline":
        r = (D = t.components.get("theatre")) == null ? void 0 : D.sheets.get(c.data.sheet), r !== void 0 && (r.sequence.position = c.data.position);
        break;
      case "getScene":
        R.dispatchEvent({ type: O.GET_SCENE });
        break;
      case "getObject":
        R.dispatchEvent({ type: O.GET_OBJECT, value: c.data });
        break;
      case "updateObject":
        R.dispatchEvent({ type: O.UPDATE_OBJECT, value: c.data });
        break;
    }
  }
  function l(c) {
    switch (c.event) {
      case "custom":
        R.dispatchEvent({ type: O.CUSTOM, value: c.data });
        break;
      case "setObject":
        R.dispatchEvent({ type: O.SET_OBJECT, value: c.data });
        break;
      case "setScene":
        R.dispatchEvent({ type: O.SET_SCENE, value: c.data });
        break;
    }
  }
  function f() {
    W.ui.hide();
  }
  function y() {
    W.ui.restore(), W.onSelectionChange((h) => {
      h.length < 1 || h.forEach((b) => {
        var B;
        let C = b.address.sheetId, k = "setSheet", P = {};
        switch (b.type) {
          case "Theatre_Sheet_PublicAPI":
            k = "setSheet", P = {
              sheet: b.address.sheetId
            }, r = (B = t.components.get("theatre")) == null ? void 0 : B.sheets.get(b.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            k = "setSheetObject", C += `_${b.address.objectKey}`, P = {
              id: C,
              sheet: b.address.sheetId,
              key: b.address.objectKey
            };
            break;
        }
        t.send({ event: k, target: "app", data: P });
      });
    });
    let c = 0;
    const d = () => {
      if (r !== void 0 && c !== r.sequence.position) {
        c = r.sequence.position;
        const h = r;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: c,
            sheet: h.address.sheetId
          }
        });
      }
    }, g = () => {
      d(), requestAnimationFrame(g);
    };
    d(), g();
  }
  t.listen((c) => {
    a === "app" ? i(c) : l(c);
  }), t.editor ? y() : f();
}
function Wt(t) {
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
  const r = t.type;
  return r.search("Helper") > -1 ? "icon_utils" : r.search("Camera") > -1 ? "camera" : r.search("Light") > -1 ? "light" : "obj3D";
}
const Vt = !1;
class Yt extends kt {
  constructor(r, a, i) {
    super(r, a, i), this.addComponent("theatre", new It(this, "RemoteApp"));
  }
  // Components
  get debug() {
    return this.components.get("debug");
  }
  get debugComponents() {
    return this.components.get("components");
  }
  get theatre() {
    return this.components.get("theatre");
  }
  get three() {
    return this.components.get("three");
  }
}
const ce = new Yt("Hermes", Vt, "editor");
function $e(t) {
  const [r, a] = N(!1);
  let i = null, l = !1;
  if (t.child.children.length > 0) {
    l = !0;
    const f = [];
    t.child.children.map((y) => {
      f.push(/* @__PURE__ */ o.jsx($e, { child: y }, Math.random()));
    }), i = /* @__PURE__ */ o.jsx("div", { className: `container ${r ? "" : "closed"}`, children: f });
  }
  return /* @__PURE__ */ o.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "child", children: [
      l ? /* @__PURE__ */ o.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: r ? "-14px" : "2px"
          },
          onClick: () => {
            a(!r);
          }
        }
      ) : null,
      /* @__PURE__ */ o.jsx(
        "button",
        {
          className: "name",
          style: {
            left: l ? "20px" : "5px"
          },
          onClick: () => {
            ce.three.getObject(t.child.uuid);
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ o.jsx("div", { className: `icon ${Wt(t.child)}` })
    ] }),
    i
  ] }, Math.random());
}
function Gt(t) {
  const r = [];
  return t.child.children.map((a) => {
    r.push(/* @__PURE__ */ o.jsx($e, { child: a }, Math.random()));
  }), /* @__PURE__ */ o.jsx("div", { className: `scene ${t.class}`, children: r });
}
function X(t) {
  const [r, a] = N(t.value), i = (l) => {
    const f = l.target.value;
    a(f), t.onChange !== void 0 && t.onChange(t.label, f);
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "field", children: [
    /* @__PURE__ */ o.jsx("label", { children: t.label }, "fieldLabel"),
    t.type === "string" && /* @__PURE__ */ o.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: i,
        value: r
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ o.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: i,
        checked: r
      }
    ),
    t.type === "number" && /* @__PURE__ */ o.jsx(
      "input",
      {
        type: "number",
        value: r,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: i
      }
    ),
    t.type === "range" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsx("input", { type: "text", value: r.toString(), onChange: i, className: "min" }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: r,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: i
        }
      )
    ] })
  ] });
}
function Ht(t) {
  const [r, a] = N(-1), [i, l] = N({
    name: "",
    uuid: "",
    type: "",
    visible: !1,
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  });
  Ot(() => {
    function g(h) {
      const b = h.value;
      l({
        name: b.name,
        type: b.type,
        uuid: b.uuid,
        visible: b.visible,
        matrix: b.matrix
      }), a(Date.now());
    }
    return R.addEventListener(O.SET_OBJECT, g), () => {
      R.removeEventListener(O.SET_OBJECT, g);
    };
  }, []);
  const f = new Ct();
  f.elements = i.matrix;
  const y = new Ie(), c = new _t(), d = new Ie();
  return i.uuid.length > 0 && (y.setFromMatrixPosition(f), c.setFromRotationMatrix(f), d.setFromMatrixScale(f)), i.type, /* @__PURE__ */ o.jsx("div", { id: "Inspector", className: t.class, children: i.uuid.length > 0 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsx(X, { type: "string", label: "Name", value: i.name, disabled: !0 }),
    /* @__PURE__ */ o.jsx(X, { type: "string", label: "Type", value: i.type, disabled: !0 }),
    /* @__PURE__ */ o.jsx(X, { type: "string", label: "UUID", value: i.uuid, disabled: !0 }),
    /* @__PURE__ */ o.jsx(
      X,
      {
        type: "boolean",
        label: "Visible",
        value: i.visible,
        onChange: (g, h) => {
          console.log("Send GUI change:", g, h), ce.three.updateObject(i.uuid, "visible", h);
        }
      }
    )
  ] }) }, r);
}
class rn extends wt {
  constructor(a) {
    super(a);
    // Private
    j(this, "onRefresh", () => {
      ce.three.getScene();
    });
    j(this, "toggleOpen", () => {
      this.setState(() => ({
        open: !this.componentState.open
      }));
    });
    j(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      mode: "Hierarchy",
      open: !1,
      scene: null
    }, R.addEventListener(O.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    R.removeEventListener(O.SET_SCENE, this.setScene);
  }
  render() {
    const a = this.componentState.scene !== null, i = this.componentState.open && this.mode === "Hierarchy";
    return /* @__PURE__ */ o.jsxs("div", { id: "SceneHierarchy", children: [
      /* @__PURE__ */ o.jsxs("ul", { id: "options", children: [
        a && /* @__PURE__ */ o.jsx("li", { className: "icon", children: /* @__PURE__ */ o.jsx(
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
        /* @__PURE__ */ o.jsx("li", { className: "icon", children: /* @__PURE__ */ o.jsx("button", { className: "refresh", onClick: this.onRefresh, children: "Refresh" }) }),
        /* @__PURE__ */ o.jsx("li", { className: this.mode === "Hierarchy" ? "selected" : "", children: /* @__PURE__ */ o.jsx("button", { onClick: () => {
          this.mode = "Hierarchy";
        }, children: "Hierarchy" }) }),
        /* @__PURE__ */ o.jsx("li", { className: this.mode === "Inspector" ? "selected" : "", children: /* @__PURE__ */ o.jsx("button", { onClick: () => {
          this.mode = "Inspector";
        }, children: "Inspector" }) })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { children: [
        a && /* @__PURE__ */ o.jsx(Gt, { class: i ? "" : "hidden", child: this.componentState.scene }),
        /* @__PURE__ */ o.jsx(Ht, { class: this.mode === "Inspector" ? "" : "hidden" }, "Inspector")
      ] })
    ] }, "SceneHierarchy");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
  get mode() {
    return this.componentState.mode;
  }
  set mode(a) {
    this.setState(() => ({ mode: a }));
  }
}
function an(t) {
  return /* @__PURE__ */ o.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ o.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ o.jsx("footer", { children: t.footer })
  ] });
}
export {
  kt as Application,
  oe as BaseRemote,
  Ut as Draggable,
  At as DraggableItem,
  $t as Dropdown,
  Lt as DropdownItem,
  an as Editor,
  Ue as NavButton,
  en as RemoteComponents,
  nn as RemoteController,
  It as RemoteTheatre,
  tn as RemoteTweakpane,
  rn as SceneHierarchy,
  O as ToolEvents,
  R as debugDispatcher
};
