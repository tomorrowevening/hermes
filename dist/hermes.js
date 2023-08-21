var ro = Object.defineProperty;
var oo = (t, e, n) => e in t ? ro(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var H = (t, e, n) => (oo(t, typeof e != "symbol" ? e + "" : e, n), n);
import { Pane as ao } from "tweakpane";
import * as co from "@tweakpane/plugin-essentials";
import { getProject as lo } from "@theatre/core";
import { EventDispatcher as uo } from "three";
import * as rs from "react";
import Ie, { createContext as Gt, useLayoutEffect as fo, useEffect as ae, useContext as X, useRef as _e, useInsertionEffect as ho, useCallback as po, useMemo as Ne, forwardRef as mo, createElement as go, useId as yo, useState as Dt, Component as vo } from "react";
import Zt from "@theatre/studio";
class mi {
  constructor(e) {
    H(this, "app");
    this.app = e;
  }
  dispose() {
  }
}
class bo extends mi {
  constructor(n) {
    super(n);
    H(this, "pane");
    H(this, "appTab");
    H(this, "systemTab");
    H(this, "utilsTab");
    if (n.editor) {
      this.pane = new ao({ title: "GUI" }), this.pane.registerPlugin(co);
      const s = this.pane.element.parentElement;
      s.style.left = "50%", s.style.top = "0", s.style.maxHeight = "100%", s.style.overflowX = "hidden", s.style.overflowY = "auto", s.style.transform = "translateX(-50%)", s.style.width = "300px", s.style.zIndex = "100";
      const i = this.pane.addTab({
        pages: [{ title: "App" }, { title: "System" }, { title: "Tools" }]
      });
      this.appTab = i.pages[0], this.systemTab = i.pages[1], this.utilsTab = i.pages[2];
    }
  }
  dispose() {
  }
}
function xo(t, e, n) {
  return Math.min(e, Math.max(t, n));
}
function os(t, e) {
  const n = t - e;
  return Math.sqrt(n * n);
}
function Po() {
  return Math.round(Math.random() * 1e6).toString();
}
function To(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
const So = () => {
};
class Co extends mi {
  constructor(n, s, i) {
    super(n);
    H(this, "project");
    H(this, "sheets");
    H(this, "sheetObjects");
    H(this, "sheetObjectCBs");
    H(this, "sheetObjectUnsubscribe");
    this.project = lo(s, i), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
  }
  sheet(n) {
    var i;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let s = this.sheets.get(n);
    return s !== void 0 || (s = (i = this.project) == null ? void 0 : i.sheet(n), this.sheets.set(n, s)), s;
  }
  sheetObject(n, s, i, o) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const r = this.sheets.get(n);
    if (r === void 0)
      return;
    const a = `${n}_${s}`;
    let c = this.sheetObjects.get(a);
    if (c !== void 0)
      return c = r.object(s, { ...i, ...c.value }, { reconfigure: !0 }), c;
    c = r.object(s, i), this.sheetObjects.set(a, c), this.sheetObjectCBs.set(a, o !== void 0 ? o : So);
    const l = c.onValuesChange((u) => {
      if (this.app.editor) {
        for (const h in u) {
          const d = u[h];
          typeof d == "object" && To(d) && (u[h] = {
            r: d.r,
            g: d.g,
            b: d.b,
            a: d.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          data: {
            sheetObject: a,
            values: u
          }
        });
      } else {
        const h = this.sheetObjectCBs.get(a);
        h !== void 0 && h(u);
      }
    });
    return this.sheetObjectUnsubscribe.set(a, l), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const s = `${n.address.sheetId}_${n.address.objectKey}`, i = this.sheetObjectUnsubscribe.get(s);
    i !== void 0 && i();
  }
}
class ef {
  constructor(e, n) {
    H(this, "debug");
    H(this, "theatre");
    // Protected
    H(this, "mode", "listener");
    H(this, "channel");
    this.editor = e && document.location.hash.search(n) > -1, e && (this.channel = new BroadcastChannel("theatre"));
  }
  setupGUI() {
    this.debug = new bo(this);
  }
  setupTheatre(e, n) {
    this.theatre = new Co(this, e, n);
  }
  dispose() {
    var e, n;
    (e = this.debug) == null || e.dispose(), (n = this.theatre) == null || n.dispose();
  }
  // Remote
  send(e) {
    this.mode === "editor" && this.channel !== void 0 && this.channel.postMessage(e);
  }
  listen(e) {
    this.mode === "listener" && this.channel !== void 0 && (this.channel.onmessage = (n) => {
      e(n.data);
    });
  }
  // Getters / Setters
  get editor() {
    return this.mode === "editor";
  }
  set editor(e) {
    e && (this.mode = "editor", document.title += " - Editor");
  }
}
const Bt = new uo(), It = {
  // Remote
  // SceneHierarchy
  INSPECT_ITEM: "ToolEvents::inspectItem",
  REFRESH_SCENE: "ToolEvents::refreshScene",
  SET_SCENE: "ToolEvents::setScene"
};
var hn = { exports: {} }, Jt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var as;
function wo() {
  if (as)
    return Jt;
  as = 1;
  var t = Ie, e = Symbol.for("react.element"), n = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(a, c, l) {
    var u, h = {}, d = null, p = null;
    l !== void 0 && (d = "" + l), c.key !== void 0 && (d = "" + c.key), c.ref !== void 0 && (p = c.ref);
    for (u in c)
      s.call(c, u) && !o.hasOwnProperty(u) && (h[u] = c[u]);
    if (a && a.defaultProps)
      for (u in c = a.defaultProps, c)
        h[u] === void 0 && (h[u] = c[u]);
    return { $$typeof: e, type: a, key: d, ref: p, props: h, _owner: i.current };
  }
  return Jt.Fragment = n, Jt.jsx = r, Jt.jsxs = r, Jt;
}
var Qt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cs;
function Vo() {
  return cs || (cs = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Ie, e = Symbol.for("react.element"), n = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), r = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = Symbol.iterator, b = "@@iterator";
    function T(f) {
      if (f === null || typeof f != "object")
        return null;
      var g = m && f[m] || f[b];
      return typeof g == "function" ? g : null;
    }
    var w = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(f) {
      {
        for (var g = arguments.length, v = new Array(g > 1 ? g - 1 : 0), C = 1; C < g; C++)
          v[C - 1] = arguments[C];
        x("error", f, v);
      }
    }
    function x(f, g, v) {
      {
        var C = w.ReactDebugCurrentFrame, M = C.getStackAddendum();
        M !== "" && (g += "%s", v = v.concat([M]));
        var j = v.map(function(D) {
          return String(D);
        });
        j.unshift("Warning: " + g), Function.prototype.apply.call(console[f], console, j);
      }
    }
    var S = !1, A = !1, z = !1, k = !1, E = !1, F;
    F = Symbol.for("react.module.reference");
    function et(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === s || f === o || E || f === i || f === l || f === u || k || f === p || S || A || z || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === h || f.$$typeof === r || f.$$typeof === a || f.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      f.$$typeof === F || f.getModuleId !== void 0));
    }
    function nt(f, g, v) {
      var C = f.displayName;
      if (C)
        return C;
      var M = g.displayName || g.name || "";
      return M !== "" ? v + "(" + M + ")" : v;
    }
    function st(f) {
      return f.displayName || "Context";
    }
    function G(f) {
      if (f == null)
        return null;
      if (typeof f.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof f == "function")
        return f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case s:
          return "Fragment";
        case n:
          return "Portal";
        case o:
          return "Profiler";
        case i:
          return "StrictMode";
        case l:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case a:
            var g = f;
            return st(g) + ".Consumer";
          case r:
            var v = f;
            return st(v._context) + ".Provider";
          case c:
            return nt(f, f.render, "ForwardRef");
          case h:
            var C = f.displayName || null;
            return C !== null ? C : G(f.type) || "Memo";
          case d: {
            var M = f, j = M._payload, D = M._init;
            try {
              return G(D(j));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, B = 0, it, ct, ge, zt, Yt, O, yt;
    function Kt() {
    }
    Kt.__reactDisabledLog = !0;
    function ye() {
      {
        if (B === 0) {
          it = console.log, ct = console.info, ge = console.warn, zt = console.error, Yt = console.group, O = console.groupCollapsed, yt = console.groupEnd;
          var f = {
            configurable: !0,
            enumerable: !0,
            value: Kt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: f,
            log: f,
            warn: f,
            error: f,
            group: f,
            groupCollapsed: f,
            groupEnd: f
          });
        }
        B++;
      }
    }
    function ve() {
      {
        if (B--, B === 0) {
          var f = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, f, {
              value: it
            }),
            info: L({}, f, {
              value: ct
            }),
            warn: L({}, f, {
              value: ge
            }),
            error: L({}, f, {
              value: zt
            }),
            group: L({}, f, {
              value: Yt
            }),
            groupCollapsed: L({}, f, {
              value: O
            }),
            groupEnd: L({}, f, {
              value: yt
            })
          });
        }
        B < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var lt = w.ReactCurrentDispatcher, Lt;
    function Ot(f, g, v) {
      {
        if (Lt === void 0)
          try {
            throw Error();
          } catch (M) {
            var C = M.stack.trim().match(/\n( *(at )?)/);
            Lt = C && C[1] || "";
          }
        return `
` + Lt + f;
      }
    }
    var wt = !1, ut;
    {
      var ft = typeof WeakMap == "function" ? WeakMap : Map;
      ut = new ft();
    }
    function qt(f, g) {
      if (!f || wt)
        return "";
      {
        var v = ut.get(f);
        if (v !== void 0)
          return v;
      }
      var C;
      wt = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var j;
      j = lt.current, lt.current = null, ye();
      try {
        if (g) {
          var D = function() {
            throw Error();
          };
          if (Object.defineProperty(D.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(D, []);
            } catch (ht) {
              C = ht;
            }
            Reflect.construct(f, [], D);
          } else {
            try {
              D.call();
            } catch (ht) {
              C = ht;
            }
            f.call(D.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ht) {
            C = ht;
          }
          f();
        }
      } catch (ht) {
        if (ht && C && typeof ht.stack == "string") {
          for (var R = ht.stack.split(`
`), K = C.stack.split(`
`), U = R.length - 1, $ = K.length - 1; U >= 1 && $ >= 0 && R[U] !== K[$]; )
            $--;
          for (; U >= 1 && $ >= 0; U--, $--)
            if (R[U] !== K[$]) {
              if (U !== 1 || $ !== 1)
                do
                  if (U--, $--, $ < 0 || R[U] !== K[$]) {
                    var Q = `
` + R[U].replace(" at new ", " at ");
                    return f.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", f.displayName)), typeof f == "function" && ut.set(f, Q), Q;
                  }
                while (U >= 1 && $ >= 0);
              break;
            }
        }
      } finally {
        wt = !1, lt.current = j, ve(), Error.prepareStackTrace = M;
      }
      var Ft = f ? f.displayName || f.name : "", is = Ft ? Ot(Ft) : "";
      return typeof f == "function" && ut.set(f, is), is;
    }
    function be(f, g, v) {
      return qt(f, !1);
    }
    function Ir(f) {
      var g = f.prototype;
      return !!(g && g.isReactComponent);
    }
    function xe(f, g, v) {
      if (f == null)
        return "";
      if (typeof f == "function")
        return qt(f, Ir(f));
      if (typeof f == "string")
        return Ot(f);
      switch (f) {
        case l:
          return Ot("Suspense");
        case u:
          return Ot("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case c:
            return be(f.render);
          case h:
            return xe(f.type, g, v);
          case d: {
            var C = f, M = C._payload, j = C._init;
            try {
              return xe(j(M), g, v);
            } catch {
            }
          }
        }
      return "";
    }
    var Pe = Object.prototype.hasOwnProperty, zn = {}, Yn = w.ReactDebugCurrentFrame;
    function Te(f) {
      if (f) {
        var g = f._owner, v = xe(f.type, f._source, g ? g.type : null);
        Yn.setExtraStackFrame(v);
      } else
        Yn.setExtraStackFrame(null);
    }
    function _r(f, g, v, C, M) {
      {
        var j = Function.call.bind(Pe);
        for (var D in f)
          if (j(f, D)) {
            var R = void 0;
            try {
              if (typeof f[D] != "function") {
                var K = Error((C || "React class") + ": " + v + " type `" + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[D] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              R = f[D](g, D, C, v, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (U) {
              R = U;
            }
            R && !(R instanceof Error) && (Te(M), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", v, D, typeof R), Te(null)), R instanceof Error && !(R.message in zn) && (zn[R.message] = !0, Te(M), y("Failed %s type: %s", v, R.message), Te(null));
          }
      }
    }
    var Nr = Array.isArray;
    function Ke(f) {
      return Nr(f);
    }
    function Ur(f) {
      {
        var g = typeof Symbol == "function" && Symbol.toStringTag, v = g && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return v;
      }
    }
    function $r(f) {
      try {
        return Kn(f), !1;
      } catch {
        return !0;
      }
    }
    function Kn(f) {
      return "" + f;
    }
    function qn(f) {
      if ($r(f))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ur(f)), Kn(f);
    }
    var Xt = w.ReactCurrentOwner, Wr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Xn, Zn, qe;
    qe = {};
    function Hr(f) {
      if (Pe.call(f, "ref")) {
        var g = Object.getOwnPropertyDescriptor(f, "ref").get;
        if (g && g.isReactWarning)
          return !1;
      }
      return f.ref !== void 0;
    }
    function Gr(f) {
      if (Pe.call(f, "key")) {
        var g = Object.getOwnPropertyDescriptor(f, "key").get;
        if (g && g.isReactWarning)
          return !1;
      }
      return f.key !== void 0;
    }
    function zr(f, g) {
      if (typeof f.ref == "string" && Xt.current && g && Xt.current.stateNode !== g) {
        var v = G(Xt.current.type);
        qe[v] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', G(Xt.current.type), f.ref), qe[v] = !0);
      }
    }
    function Yr(f, g) {
      {
        var v = function() {
          Xn || (Xn = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        v.isReactWarning = !0, Object.defineProperty(f, "key", {
          get: v,
          configurable: !0
        });
      }
    }
    function Kr(f, g) {
      {
        var v = function() {
          Zn || (Zn = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        v.isReactWarning = !0, Object.defineProperty(f, "ref", {
          get: v,
          configurable: !0
        });
      }
    }
    var qr = function(f, g, v, C, M, j, D) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: f,
        key: g,
        ref: v,
        props: D,
        // Record the component responsible for creating this element.
        _owner: j
      };
      return R._store = {}, Object.defineProperty(R._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(R, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(R, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function Xr(f, g, v, C, M) {
      {
        var j, D = {}, R = null, K = null;
        v !== void 0 && (qn(v), R = "" + v), Gr(g) && (qn(g.key), R = "" + g.key), Hr(g) && (K = g.ref, zr(g, M));
        for (j in g)
          Pe.call(g, j) && !Wr.hasOwnProperty(j) && (D[j] = g[j]);
        if (f && f.defaultProps) {
          var U = f.defaultProps;
          for (j in U)
            D[j] === void 0 && (D[j] = U[j]);
        }
        if (R || K) {
          var $ = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
          R && Yr(D, $), K && Kr(D, $);
        }
        return qr(f, R, K, M, C, Xt.current, D);
      }
    }
    var Xe = w.ReactCurrentOwner, Jn = w.ReactDebugCurrentFrame;
    function kt(f) {
      if (f) {
        var g = f._owner, v = xe(f.type, f._source, g ? g.type : null);
        Jn.setExtraStackFrame(v);
      } else
        Jn.setExtraStackFrame(null);
    }
    var Ze;
    Ze = !1;
    function Je(f) {
      return typeof f == "object" && f !== null && f.$$typeof === e;
    }
    function Qn() {
      {
        if (Xe.current) {
          var f = G(Xe.current.type);
          if (f)
            return `

Check the render method of \`` + f + "`.";
        }
        return "";
      }
    }
    function Zr(f) {
      {
        if (f !== void 0) {
          var g = f.fileName.replace(/^.*[\\\/]/, ""), v = f.lineNumber;
          return `

Check your code at ` + g + ":" + v + ".";
        }
        return "";
      }
    }
    var ts = {};
    function Jr(f) {
      {
        var g = Qn();
        if (!g) {
          var v = typeof f == "string" ? f : f.displayName || f.name;
          v && (g = `

Check the top-level render call using <` + v + ">.");
        }
        return g;
      }
    }
    function es(f, g) {
      {
        if (!f._store || f._store.validated || f.key != null)
          return;
        f._store.validated = !0;
        var v = Jr(g);
        if (ts[v])
          return;
        ts[v] = !0;
        var C = "";
        f && f._owner && f._owner !== Xe.current && (C = " It was passed a child from " + G(f._owner.type) + "."), kt(f), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', v, C), kt(null);
      }
    }
    function ns(f, g) {
      {
        if (typeof f != "object")
          return;
        if (Ke(f))
          for (var v = 0; v < f.length; v++) {
            var C = f[v];
            Je(C) && es(C, g);
          }
        else if (Je(f))
          f._store && (f._store.validated = !0);
        else if (f) {
          var M = T(f);
          if (typeof M == "function" && M !== f.entries)
            for (var j = M.call(f), D; !(D = j.next()).done; )
              Je(D.value) && es(D.value, g);
        }
      }
    }
    function Qr(f) {
      {
        var g = f.type;
        if (g == null || typeof g == "string")
          return;
        var v;
        if (typeof g == "function")
          v = g.propTypes;
        else if (typeof g == "object" && (g.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        g.$$typeof === h))
          v = g.propTypes;
        else
          return;
        if (v) {
          var C = G(g);
          _r(v, f.props, "prop", C, f);
        } else if (g.PropTypes !== void 0 && !Ze) {
          Ze = !0;
          var M = G(g);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof g.getDefaultProps == "function" && !g.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function to(f) {
      {
        for (var g = Object.keys(f.props), v = 0; v < g.length; v++) {
          var C = g[v];
          if (C !== "children" && C !== "key") {
            kt(f), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), kt(null);
            break;
          }
        }
        f.ref !== null && (kt(f), y("Invalid attribute `ref` supplied to `React.Fragment`."), kt(null));
      }
    }
    function ss(f, g, v, C, M, j) {
      {
        var D = et(f);
        if (!D) {
          var R = "";
          (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = Zr(M);
          K ? R += K : R += Qn();
          var U;
          f === null ? U = "null" : Ke(f) ? U = "array" : f !== void 0 && f.$$typeof === e ? (U = "<" + (G(f.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : U = typeof f, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", U, R);
        }
        var $ = Xr(f, g, v, M, j);
        if ($ == null)
          return $;
        if (D) {
          var Q = g.children;
          if (Q !== void 0)
            if (C)
              if (Ke(Q)) {
                for (var Ft = 0; Ft < Q.length; Ft++)
                  ns(Q[Ft], f);
                Object.freeze && Object.freeze(Q);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ns(Q, f);
        }
        return f === s ? to($) : Qr($), $;
      }
    }
    function eo(f, g, v) {
      return ss(f, g, v, !0);
    }
    function no(f, g, v) {
      return ss(f, g, v, !1);
    }
    var so = no, io = eo;
    Qt.Fragment = s, Qt.jsx = so, Qt.jsxs = io;
  }()), Qt;
}
process.env.NODE_ENV === "production" ? hn.exports = wo() : hn.exports = Vo();
var V = hn.exports;
function gi(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ V.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ V.jsx("button", { children: t.title });
}
const yi = Gt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
}), Ue = Gt({}), Vn = Gt(null), $e = typeof document < "u", ls = $e ? fo : ae, vi = Gt({ strict: !1 });
function Ao(t, e, n, s) {
  const { visualElement: i } = X(Ue), o = X(vi), r = X(Vn), a = X(yi).reducedMotion, c = _e();
  s = s || o.renderer, !c.current && s && (c.current = s(t, {
    visualState: e,
    parent: i,
    props: n,
    presenceContext: r,
    blockInitialAnimation: r ? r.initial === !1 : !1,
    reducedMotionConfig: a
  }));
  const l = c.current;
  return ho(() => {
    l && l.update(n, r);
  }), ls(() => {
    l && l.render();
  }), ae(() => {
    l && l.updateFeatures();
  }), (window.HandoffAppearAnimations ? ls : ae)(() => {
    l && l.animationState && l.animationState.animateChanges();
  }), l;
}
function _t(t) {
  return typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Eo(t, e, n) {
  return po(
    (s) => {
      s && t.mount && t.mount(s), e && (s ? e.mount(s) : e.unmount()), n && (typeof n == "function" ? n(s) : _t(n) && (n.current = s));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [e]
  );
}
function ce(t) {
  return typeof t == "string" || Array.isArray(t);
}
function We(t) {
  return typeof t == "object" && typeof t.start == "function";
}
const An = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], En = ["initial", ...An];
function He(t) {
  return We(t.animate) || En.some((e) => ce(t[e]));
}
function bi(t) {
  return !!(He(t) || t.variants);
}
function Ro(t, e) {
  if (He(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || ce(n) ? n : void 0,
      animate: ce(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function Do(t) {
  const { initial: e, animate: n } = Ro(t, X(Ue));
  return Ne(() => ({ initial: e, animate: n }), [us(e), us(n)]);
}
function us(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const fs = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, le = {};
for (const t in fs)
  le[t] = {
    isEnabled: (e) => fs[t].some((n) => !!e[n])
  };
function Mo(t) {
  for (const e in t)
    le[e] = {
      ...le[e],
      ...t[e]
    };
}
const xi = Gt({}), Pi = Gt({}), jo = Symbol.for("motionComponentSymbol");
function Lo({ preloadedFeatures: t, createVisualElement: e, useRender: n, useVisualState: s, Component: i }) {
  t && Mo(t);
  function o(a, c) {
    let l;
    const u = {
      ...X(yi),
      ...a,
      layoutId: Oo(a)
    }, { isStatic: h } = u, d = Do(a), p = s(a, h);
    if (!h && $e) {
      d.visualElement = Ao(i, p, u, e);
      const m = X(Pi), b = X(vi).strict;
      d.visualElement && (l = d.visualElement.loadFeatures(
        // Note: Pass the full new combined props to correctly re-render dynamic feature components.
        u,
        b,
        t,
        m
      ));
    }
    return rs.createElement(
      Ue.Provider,
      { value: d },
      l && d.visualElement ? rs.createElement(l, { visualElement: d.visualElement, ...u }) : null,
      n(i, a, Eo(p, d.visualElement, c), p, h, d.visualElement)
    );
  }
  const r = mo(o);
  return r[jo] = i, r;
}
function Oo({ layoutId: t }) {
  const e = X(xi).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function ko(t) {
  function e(s, i = {}) {
    return Lo(t(s, i));
  }
  if (typeof Proxy > "u")
    return e;
  const n = /* @__PURE__ */ new Map();
  return new Proxy(e, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (s, i) => (n.has(i) || n.set(i, e(i)), n.get(i))
  });
}
const Fo = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Rn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Fo.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/.test(t))
    )
  );
}
const De = {};
function Bo(t) {
  Object.assign(De, t);
}
const fe = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Mt = new Set(fe);
function Ti(t, { layout: e, layoutId: n }) {
  return Mt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!De[t] || t === "opacity");
}
const Z = (t) => !!(t && t.getVelocity), Io = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, _o = fe.length;
function No(t, { enableHardwareAcceleration: e = !0, allowTransformNone: n = !0 }, s, i) {
  let o = "";
  for (let r = 0; r < _o; r++) {
    const a = fe[r];
    if (t[a] !== void 0) {
      const c = Io[a] || a;
      o += `${c}(${t[a]}) `;
    }
  }
  return e && !t.z && (o += "translateZ(0)"), o = o.trim(), i ? o = i(t, s ? "" : o) : n && s && (o = "none"), o;
}
const Si = (t) => (e) => typeof e == "string" && e.startsWith(t), Ci = Si("--"), dn = Si("var(--"), Uo = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g, $o = (t, e) => e && typeof t == "number" ? e.transform(t) : t, Tt = (t, e, n) => Math.min(Math.max(n, t), e), jt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, se = {
  ...jt,
  transform: (t) => Tt(0, 1, t)
}, Se = {
  ...jt,
  default: 1
}, ie = (t) => Math.round(t * 1e5) / 1e5, Ge = /(-)?([\d]*\.?[\d])+/g, wi = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi, Wo = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function he(t) {
  return typeof t == "string";
}
const de = (t) => ({
  test: (e) => he(e) && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), vt = de("deg"), ot = de("%"), P = de("px"), Ho = de("vh"), Go = de("vw"), hs = {
  ...ot,
  parse: (t) => ot.parse(t) / 100,
  transform: (t) => ot.transform(t * 100)
}, ds = {
  ...jt,
  transform: Math.round
}, Vi = {
  // Border props
  borderWidth: P,
  borderTopWidth: P,
  borderRightWidth: P,
  borderBottomWidth: P,
  borderLeftWidth: P,
  borderRadius: P,
  radius: P,
  borderTopLeftRadius: P,
  borderTopRightRadius: P,
  borderBottomRightRadius: P,
  borderBottomLeftRadius: P,
  // Positioning props
  width: P,
  maxWidth: P,
  height: P,
  maxHeight: P,
  size: P,
  top: P,
  right: P,
  bottom: P,
  left: P,
  // Spacing props
  padding: P,
  paddingTop: P,
  paddingRight: P,
  paddingBottom: P,
  paddingLeft: P,
  margin: P,
  marginTop: P,
  marginRight: P,
  marginBottom: P,
  marginLeft: P,
  // Transform props
  rotate: vt,
  rotateX: vt,
  rotateY: vt,
  rotateZ: vt,
  scale: Se,
  scaleX: Se,
  scaleY: Se,
  scaleZ: Se,
  skew: vt,
  skewX: vt,
  skewY: vt,
  distance: P,
  translateX: P,
  translateY: P,
  translateZ: P,
  x: P,
  y: P,
  z: P,
  perspective: P,
  transformPerspective: P,
  opacity: se,
  originX: hs,
  originY: hs,
  originZ: P,
  // Misc
  zIndex: ds,
  // SVG
  fillOpacity: se,
  strokeOpacity: se,
  numOctaves: ds
};
function Dn(t, e, n, s) {
  const { style: i, vars: o, transform: r, transformOrigin: a } = t;
  let c = !1, l = !1, u = !0;
  for (const h in e) {
    const d = e[h];
    if (Ci(h)) {
      o[h] = d;
      continue;
    }
    const p = Vi[h], m = $o(d, p);
    if (Mt.has(h)) {
      if (c = !0, r[h] = m, !u)
        continue;
      d !== (p.default || 0) && (u = !1);
    } else
      h.startsWith("origin") ? (l = !0, a[h] = m) : i[h] = m;
  }
  if (e.transform || (c || s ? i.transform = No(t.transform, n, u, s) : i.transform && (i.transform = "none")), l) {
    const { originX: h = "50%", originY: d = "50%", originZ: p = 0 } = a;
    i.transformOrigin = `${h} ${d} ${p}`;
  }
}
const Mn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Ai(t, e, n) {
  for (const s in e)
    !Z(e[s]) && !Ti(s, n) && (t[s] = e[s]);
}
function zo({ transformTemplate: t }, e, n) {
  return Ne(() => {
    const s = Mn();
    return Dn(s, e, { enableHardwareAcceleration: !n }, t), Object.assign({}, s.vars, s.style);
  }, [e]);
}
function Yo(t, e, n) {
  const s = t.style || {}, i = {};
  return Ai(i, s, t), Object.assign(i, zo(t, e, n)), t.transformValues ? t.transformValues(i) : i;
}
function Ko(t, e, n) {
  const s = {}, i = Yo(t, e, n);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const qo = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "onLayoutAnimationStart",
  "onLayoutAnimationComplete",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "ignoreStrict",
  "viewport"
]);
function Me(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || qo.has(t);
}
let Ei = (t) => !Me(t);
function Xo(t) {
  t && (Ei = (e) => e.startsWith("on") ? !Me(e) : t(e));
}
try {
  Xo(require("@emotion/is-prop-valid").default);
} catch {
}
function Zo(t, e, n) {
  const s = {};
  for (const i in t)
    i === "values" && typeof t.values == "object" || (Ei(i) || n === !0 && Me(i) || !e && !Me(i) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
  return s;
}
function ps(t, e, n) {
  return typeof t == "string" ? t : P.transform(e + n * t);
}
function Jo(t, e, n) {
  const s = ps(e, t.x, t.width), i = ps(n, t.y, t.height);
  return `${s} ${i}`;
}
const Qo = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, ta = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function ea(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const o = i ? Qo : ta;
  t[o.offset] = P.transform(-s);
  const r = P.transform(e), a = P.transform(n);
  t[o.array] = `${r} ${a}`;
}
function jn(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  originX: i,
  originY: o,
  pathLength: r,
  pathSpacing: a = 1,
  pathOffset: c = 0,
  // This is object creation, which we try to avoid per-frame.
  ...l
}, u, h, d) {
  if (Dn(t, l, u, d), h) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: p, style: m, dimensions: b } = t;
  p.transform && (b && (m.transform = p.transform), delete p.transform), b && (i !== void 0 || o !== void 0 || m.transform) && (m.transformOrigin = Jo(b, i !== void 0 ? i : 0.5, o !== void 0 ? o : 0.5)), e !== void 0 && (p.x = e), n !== void 0 && (p.y = n), s !== void 0 && (p.scale = s), r !== void 0 && ea(p, r, a, c, !1);
}
const Ri = () => ({
  ...Mn(),
  attrs: {}
}), Ln = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function na(t, e, n, s) {
  const i = Ne(() => {
    const o = Ri();
    return jn(o, e, { enableHardwareAcceleration: !1 }, Ln(s), t.transformTemplate), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    Ai(o, t.style, t), i.style = { ...o, ...i.style };
  }
  return i;
}
function sa(t = !1) {
  return (n, s, i, { latestValues: o }, r) => {
    const c = (Rn(n) ? na : Ko)(s, o, r, n), u = {
      ...Zo(s, typeof n == "string", t),
      ...c,
      ref: i
    }, { children: h } = s, d = Ne(() => Z(h) ? h.get() : h, [h]);
    return go(n, {
      ...u,
      children: d
    });
  };
}
const On = (t) => t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function Di(t, { style: e, vars: n }, s, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(s));
  for (const o in n)
    t.style.setProperty(o, n[o]);
}
const Mi = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function ji(t, e, n, s) {
  Di(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(Mi.has(i) ? i : On(i), e.attrs[i]);
}
function kn(t, e) {
  const { style: n } = t, s = {};
  for (const i in n)
    (Z(n[i]) || e.style && Z(e.style[i]) || Ti(i, t)) && (s[i] = n[i]);
  return s;
}
function Li(t, e) {
  const n = kn(t, e);
  for (const s in t)
    if (Z(t[s]) || Z(e[s])) {
      const i = fe.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      n[i] = t[s];
    }
  return n;
}
function Fn(t, e, n, s = {}, i = {}) {
  return typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, s, i)), typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, s, i)), e;
}
function ia(t) {
  const e = _e(null);
  return e.current === null && (e.current = t()), e.current;
}
const je = (t) => Array.isArray(t), ra = (t) => !!(t && typeof t == "object" && t.mix && t.toValue), oa = (t) => je(t) ? t[t.length - 1] || 0 : t;
function Ee(t) {
  const e = Z(t) ? t.get() : t;
  return ra(e) ? e.toValue() : e;
}
function aa({ scrapeMotionValuesFromProps: t, createRenderState: e, onMount: n }, s, i, o) {
  const r = {
    latestValues: ca(s, i, o, t),
    renderState: e()
  };
  return n && (r.mount = (a) => n(s, a, r)), r;
}
const Oi = (t) => (e, n) => {
  const s = X(Ue), i = X(Vn), o = () => aa(t, e, s, i);
  return n ? o() : ia(o);
};
function ca(t, e, n, s) {
  const i = {}, o = s(t, {});
  for (const d in o)
    i[d] = Ee(o[d]);
  let { initial: r, animate: a } = t;
  const c = He(t), l = bi(t);
  e && l && !c && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || r === !1;
  const h = u ? a : r;
  return h && typeof h != "boolean" && !We(h) && (Array.isArray(h) ? h : [h]).forEach((p) => {
    const m = Fn(t, p);
    if (!m)
      return;
    const { transitionEnd: b, transition: T, ...w } = m;
    for (const y in w) {
      let x = w[y];
      if (Array.isArray(x)) {
        const S = u ? x.length - 1 : 0;
        x = x[S];
      }
      x !== null && (i[y] = x);
    }
    for (const y in b)
      i[y] = b[y];
  }), i;
}
const la = {
  useVisualState: Oi({
    scrapeMotionValuesFromProps: Li,
    createRenderState: Ri,
    onMount: (t, e, { renderState: n, latestValues: s }) => {
      try {
        n.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect();
      } catch {
        n.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      jn(n, s, { enableHardwareAcceleration: !1 }, Ln(e.tagName), t.transformTemplate), ji(e, n);
    }
  })
}, ua = {
  useVisualState: Oi({
    scrapeMotionValuesFromProps: kn,
    createRenderState: Mn
  })
};
function fa(t, { forwardMotionProps: e = !1 }, n, s) {
  return {
    ...Rn(t) ? la : ua,
    preloadedFeatures: n,
    useRender: sa(e),
    createVisualElement: s,
    Component: t
  };
}
function dt(t, e, n, s = { passive: !0 }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n);
}
const ki = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1;
function ze(t, e = "page") {
  return {
    point: {
      x: t[e + "X"],
      y: t[e + "Y"]
    }
  };
}
const ha = (t) => (e) => ki(e) && t(e, ze(e));
function pt(t, e, n, s) {
  return dt(t, e, ha(n), s);
}
const da = (t, e) => (n) => e(t(n)), xt = (...t) => t.reduce(da);
function Fi(t) {
  let e = null;
  return () => {
    const n = () => {
      e = null;
    };
    return e === null ? (e = t, n) : !1;
  };
}
const ms = Fi("dragHorizontal"), gs = Fi("dragVertical");
function Bi(t) {
  let e = !1;
  if (t === "y")
    e = gs();
  else if (t === "x")
    e = ms();
  else {
    const n = ms(), s = gs();
    n && s ? e = () => {
      n(), s();
    } : (n && n(), s && s());
  }
  return e;
}
function Ii() {
  const t = Bi(!0);
  return t ? (t(), !1) : !0;
}
class Ct {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
const N = (t) => t;
function pa(t) {
  let e = [], n = [], s = 0, i = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet(), a = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, l = !1, u = !1) => {
      const h = u && i, d = h ? e : n;
      return l && r.add(c), d.indexOf(c) === -1 && (d.push(c), h && i && (s = e.length)), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      const l = n.indexOf(c);
      l !== -1 && n.splice(l, 1), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (i) {
        o = !0;
        return;
      }
      if (i = !0, [e, n] = [n, e], n.length = 0, s = e.length, s)
        for (let l = 0; l < s; l++) {
          const u = e[l];
          u(c), r.has(u) && (a.schedule(u), t());
        }
      i = !1, o && (o = !1, a.process(c));
    }
  };
  return a;
}
const Ce = [
  "prepare",
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
], ma = 40;
function ga(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = Ce.reduce((h, d) => (h[d] = pa(() => n = !0), h), {}), r = (h) => o[h].process(i), a = () => {
    const h = performance.now();
    n = !1, i.delta = s ? 1e3 / 60 : Math.max(Math.min(h - i.timestamp, ma), 1), i.timestamp = h, i.isProcessing = !0, Ce.forEach(r), i.isProcessing = !1, n && e && (s = !1, t(a));
  }, c = () => {
    n = !0, s = !0, i.isProcessing || t(a);
  };
  return { schedule: Ce.reduce((h, d) => {
    const p = o[d];
    return h[d] = (m, b = !1, T = !1) => (n || c(), p.schedule(m, b, T)), h;
  }, {}), cancel: (h) => Ce.forEach((d) => o[d].cancel(h)), state: i, steps: o };
}
const { schedule: _, cancel: gt, state: Y, steps: Qe } = ga(typeof requestAnimationFrame < "u" ? requestAnimationFrame : N, !0);
function ys(t, e) {
  const n = "pointer" + (e ? "enter" : "leave"), s = "onHover" + (e ? "Start" : "End"), i = (o, r) => {
    if (o.type === "touch" || Ii())
      return;
    const a = t.getProps();
    t.animationState && a.whileHover && t.animationState.setActive("whileHover", e), a[s] && _.update(() => a[s](o, r));
  };
  return pt(t.current, n, i, {
    passive: !t.getProps()[s]
  });
}
class ya extends Ct {
  mount() {
    this.unmount = xt(ys(this.node, !0), ys(this.node, !1));
  }
  unmount() {
  }
}
class va extends Ct {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = xt(dt(this.node.current, "focus", () => this.onFocus()), dt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
const _i = (t, e) => e ? t === e ? !0 : _i(t, e.parentElement) : !1;
function tn(t, e) {
  if (!e)
    return;
  const n = new PointerEvent("pointer" + t);
  e(n, ze(n));
}
class ba extends Ct {
  constructor() {
    super(...arguments), this.removeStartListeners = N, this.removeEndListeners = N, this.removeAccessibleListeners = N, this.startPointerPress = (e, n) => {
      if (this.removeEndListeners(), this.isPressing)
        return;
      const s = this.node.getProps(), o = pt(window, "pointerup", (a, c) => {
        if (!this.checkPressEnd())
          return;
        const { onTap: l, onTapCancel: u } = this.node.getProps();
        _.update(() => {
          _i(this.node.current, a.target) ? l && l(a, c) : u && u(a, c);
        });
      }, { passive: !(s.onTap || s.onPointerUp) }), r = pt(window, "pointercancel", (a, c) => this.cancelPress(a, c), { passive: !(s.onTapCancel || s.onPointerCancel) });
      this.removeEndListeners = xt(o, r), this.startPress(e, n);
    }, this.startAccessiblePress = () => {
      const e = (o) => {
        if (o.key !== "Enter" || this.isPressing)
          return;
        const r = (a) => {
          a.key !== "Enter" || !this.checkPressEnd() || tn("up", (c, l) => {
            const { onTap: u } = this.node.getProps();
            u && _.update(() => u(c, l));
          });
        };
        this.removeEndListeners(), this.removeEndListeners = dt(this.node.current, "keyup", r), tn("down", (a, c) => {
          this.startPress(a, c);
        });
      }, n = dt(this.node.current, "keydown", e), s = () => {
        this.isPressing && tn("cancel", (o, r) => this.cancelPress(o, r));
      }, i = dt(this.node.current, "blur", s);
      this.removeAccessibleListeners = xt(n, i);
    };
  }
  startPress(e, n) {
    this.isPressing = !0;
    const { onTapStart: s, whileTap: i } = this.node.getProps();
    i && this.node.animationState && this.node.animationState.setActive("whileTap", !0), s && _.update(() => s(e, n));
  }
  checkPressEnd() {
    return this.removeEndListeners(), this.isPressing = !1, this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1), !Ii();
  }
  cancelPress(e, n) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel: s } = this.node.getProps();
    s && _.update(() => s(e, n));
  }
  mount() {
    const e = this.node.getProps(), n = pt(this.node.current, "pointerdown", this.startPointerPress, { passive: !(e.onTapStart || e.onPointerStart) }), s = dt(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = xt(n, s);
  }
  unmount() {
    this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners();
  }
}
const pn = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap(), xa = (t) => {
  const e = pn.get(t.target);
  e && e(t);
}, Pa = (t) => {
  t.forEach(xa);
};
function Ta({ root: t, ...e }) {
  const n = t || document;
  en.has(n) || en.set(n, {});
  const s = en.get(n), i = JSON.stringify(e);
  return s[i] || (s[i] = new IntersectionObserver(Pa, { root: t, ...e })), s[i];
}
function Sa(t, e, n) {
  const s = Ta(e);
  return pn.set(t, n), s.observe(t), () => {
    pn.delete(t), s.unobserve(t);
  };
}
const Ca = {
  some: 0,
  all: 1
};
class wa extends Ct {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: s,
      threshold: typeof i == "number" ? i : Ca[i]
    }, a = (c) => {
      const { isIntersecting: l } = c;
      if (this.isInView === l || (this.isInView = l, o && !l && this.hasEnteredView))
        return;
      l && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", l);
      const { onViewportEnter: u, onViewportLeave: h } = this.node.getProps(), d = l ? u : h;
      d && d(c);
    };
    return Sa(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Va(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Va({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Aa = {
  inView: {
    Feature: wa
  },
  tap: {
    Feature: ba
  },
  focus: {
    Feature: va
  },
  hover: {
    Feature: ya
  }
};
function Ni(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let s = 0; s < n; s++)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
function Ea(t) {
  const e = {};
  return t.values.forEach((n, s) => e[s] = n.get()), e;
}
function Ra(t) {
  const e = {};
  return t.values.forEach((n, s) => e[s] = n.getVelocity()), e;
}
function Ye(t, e, n) {
  const s = t.getProps();
  return Fn(s, e, n !== void 0 ? n : s.custom, Ea(t), Ra(t));
}
const Da = "framerAppearId", Ma = "data-" + On(Da);
let pe = N, at = N;
process.env.NODE_ENV !== "production" && (pe = (t, e) => {
  !t && typeof console < "u" && console.warn(e);
}, at = (t, e) => {
  if (!t)
    throw new Error(e);
});
const Pt = (t) => t * 1e3, mt = (t) => t / 1e3, ja = {
  current: !1
}, Ui = (t) => Array.isArray(t) && typeof t[0] == "number";
function $i(t) {
  return !!(!t || typeof t == "string" && Wi[t] || Ui(t) || Array.isArray(t) && t.every($i));
}
const ne = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, Wi = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: ne([0, 0.65, 0.55, 1]),
  circOut: ne([0.55, 0, 1, 0.45]),
  backIn: ne([0.31, 0.01, 0.66, -0.59]),
  backOut: ne([0.33, 1.53, 0.69, 0.99])
};
function Hi(t) {
  if (t)
    return Ui(t) ? ne(t) : Array.isArray(t) ? t.map(Hi) : Wi[t];
}
function La(t, e, n, { delay: s = 0, duration: i, repeat: o = 0, repeatType: r = "loop", ease: a, times: c } = {}) {
  const l = { [e]: n };
  c && (l.offset = c);
  const u = Hi(a);
  return Array.isArray(u) && (l.easing = u), t.animate(l, {
    delay: s,
    duration: i,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  });
}
function Oa(t, { repeat: e, repeatType: n = "loop" }) {
  const s = e && n !== "loop" && e % 2 === 1 ? 0 : t.length - 1;
  return t[s];
}
const Gi = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, ka = 1e-7, Fa = 12;
function Ba(t, e, n, s, i) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = Gi(r, s, i) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > ka && ++a < Fa);
  return r;
}
function me(t, e, n, s) {
  if (t === e && n === s)
    return N;
  const i = (o) => Ba(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : Gi(i(o), e, s);
}
const Ia = me(0.42, 0, 1, 1), _a = me(0, 0, 0.58, 1), zi = me(0.42, 0, 0.58, 1), Na = (t) => Array.isArray(t) && typeof t[0] != "number", Yi = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Ki = (t) => (e) => 1 - t(1 - e), qi = (t) => 1 - Math.sin(Math.acos(t)), Bn = Ki(qi), Ua = Yi(Bn), Xi = me(0.33, 1.53, 0.69, 0.99), In = Ki(Xi), $a = Yi(In), Wa = (t) => (t *= 2) < 1 ? 0.5 * In(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), vs = {
  linear: N,
  easeIn: Ia,
  easeInOut: zi,
  easeOut: _a,
  circIn: qi,
  circInOut: Ua,
  circOut: Bn,
  backIn: In,
  backInOut: $a,
  backOut: Xi,
  anticipate: Wa
}, bs = (t) => {
  if (Array.isArray(t)) {
    at(t.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [e, n, s, i] = t;
    return me(e, n, s, i);
  } else if (typeof t == "string")
    return at(vs[t] !== void 0, `Invalid easing type '${t}'`), vs[t];
  return t;
}, _n = (t, e) => (n) => !!(he(n) && Wo.test(n) && n.startsWith(t) || e && Object.prototype.hasOwnProperty.call(n, e)), Zi = (t, e, n) => (s) => {
  if (!he(s))
    return s;
  const [i, o, r, a] = s.match(Ge);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Ha = (t) => Tt(0, 255, t), nn = {
  ...jt,
  transform: (t) => Math.round(Ha(t))
}, Rt = {
  test: _n("rgb", "red"),
  parse: Zi("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + nn.transform(t) + ", " + nn.transform(e) + ", " + nn.transform(n) + ", " + ie(se.transform(s)) + ")"
};
function Ga(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const mn = {
  test: _n("#"),
  parse: Ga,
  transform: Rt.transform
}, Nt = {
  test: _n("hsl", "hue"),
  parse: Zi("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + ot.transform(ie(e)) + ", " + ot.transform(ie(n)) + ", " + ie(se.transform(s)) + ")"
}, q = {
  test: (t) => Rt.test(t) || mn.test(t) || Nt.test(t),
  parse: (t) => Rt.test(t) ? Rt.parse(t) : Nt.test(t) ? Nt.parse(t) : mn.parse(t),
  transform: (t) => he(t) ? t : t.hasOwnProperty("red") ? Rt.transform(t) : Nt.transform(t)
}, I = (t, e, n) => -n * t + n * e + t;
function sn(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function za({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, o = 0, r = 0;
  if (!e)
    i = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, c = 2 * n - a;
    i = sn(c, a, t + 1 / 3), o = sn(c, a, t), r = sn(c, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: s
  };
}
const rn = (t, e, n) => {
  const s = t * t;
  return Math.sqrt(Math.max(0, n * (e * e - s) + s));
}, Ya = [mn, Rt, Nt], Ka = (t) => Ya.find((e) => e.test(t));
function xs(t) {
  const e = Ka(t);
  at(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`);
  let n = e.parse(t);
  return e === Nt && (n = za(n)), n;
}
const Ji = (t, e) => {
  const n = xs(t), s = xs(e), i = { ...n };
  return (o) => (i.red = rn(n.red, s.red, o), i.green = rn(n.green, s.green, o), i.blue = rn(n.blue, s.blue, o), i.alpha = I(n.alpha, s.alpha, o), Rt.transform(i));
};
function qa(t) {
  var e, n;
  return isNaN(t) && he(t) && (((e = t.match(Ge)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(wi)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const Qi = {
  regex: Uo,
  countKey: "Vars",
  token: "${v}",
  parse: N
}, tr = {
  regex: wi,
  countKey: "Colors",
  token: "${c}",
  parse: q.parse
}, er = {
  regex: Ge,
  countKey: "Numbers",
  token: "${n}",
  parse: jt.parse
};
function on(t, { regex: e, countKey: n, token: s, parse: i }) {
  const o = t.tokenised.match(e);
  o && (t["num" + n] = o.length, t.tokenised = t.tokenised.replace(e, s), t.values.push(...o.map(i)));
}
function Le(t) {
  const e = t.toString(), n = {
    value: e,
    tokenised: e,
    values: [],
    numVars: 0,
    numColors: 0,
    numNumbers: 0
  };
  return n.value.includes("var(--") && on(n, Qi), on(n, tr), on(n, er), n;
}
function nr(t) {
  return Le(t).values;
}
function sr(t) {
  const { values: e, numColors: n, numVars: s, tokenised: i } = Le(t), o = e.length;
  return (r) => {
    let a = i;
    for (let c = 0; c < o; c++)
      c < s ? a = a.replace(Qi.token, r[c]) : c < s + n ? a = a.replace(tr.token, q.transform(r[c])) : a = a.replace(er.token, ie(r[c]));
    return a;
  };
}
const Xa = (t) => typeof t == "number" ? 0 : t;
function Za(t) {
  const e = nr(t);
  return sr(t)(e.map(Xa));
}
const St = {
  test: qa,
  parse: nr,
  createTransformer: sr,
  getAnimatableNone: Za
}, ir = (t, e) => (n) => `${n > 0 ? e : t}`;
function rr(t, e) {
  return typeof t == "number" ? (n) => I(t, e, n) : q.test(t) ? Ji(t, e) : t.startsWith("var(") ? ir(t, e) : ar(t, e);
}
const or = (t, e) => {
  const n = [...t], s = n.length, i = t.map((o, r) => rr(o, e[r]));
  return (o) => {
    for (let r = 0; r < s; r++)
      n[r] = i[r](o);
    return n;
  };
}, Ja = (t, e) => {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = rr(t[i], e[i]));
  return (i) => {
    for (const o in s)
      n[o] = s[o](i);
    return n;
  };
}, ar = (t, e) => {
  const n = St.createTransformer(e), s = Le(t), i = Le(e);
  return s.numVars === i.numVars && s.numColors === i.numColors && s.numNumbers >= i.numNumbers ? xt(or(s.values, i.values), n) : (pe(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), ir(t, e));
}, ue = (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
}, Ps = (t, e) => (n) => I(t, e, n);
function Qa(t) {
  return typeof t == "number" ? Ps : typeof t == "string" ? q.test(t) ? Ji : ar : Array.isArray(t) ? or : typeof t == "object" ? Ja : Ps;
}
function tc(t, e, n) {
  const s = [], i = n || Qa(t[0]), o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = i(t[r], t[r + 1]);
    if (e) {
      const c = Array.isArray(e) ? e[r] || N : e;
      a = xt(c, a);
    }
    s.push(a);
  }
  return s;
}
function cr(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const o = t.length;
  if (at(o === e.length, "Both input and output ranges must be the same length"), o === 1)
    return () => e[0];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const r = tc(e, s, i), a = r.length, c = (l) => {
    let u = 0;
    if (a > 1)
      for (; u < t.length - 2 && !(l < t[u + 1]); u++)
        ;
    const h = ue(t[u], t[u + 1], l);
    return r[u](h);
  };
  return n ? (l) => c(Tt(t[0], t[o - 1], l)) : c;
}
function ec(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = ue(0, e, s);
    t.push(I(n, 1, i));
  }
}
function nc(t) {
  const e = [0];
  return ec(e, t.length - 1), e;
}
function sc(t, e) {
  return t.map((n) => n * e);
}
function ic(t, e) {
  return t.map(() => e || zi).splice(0, t.length - 1);
}
function Oe({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = Na(s) ? s.map(bs) : bs(s), o = {
    done: !1,
    value: e[0]
  }, r = sc(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : nc(e),
    t
  ), a = cr(r, e, {
    ease: Array.isArray(i) ? i : ic(e, i)
  });
  return {
    calculatedDuration: t,
    next: (c) => (o.value = a(c), o.done = c >= t, o)
  };
}
function lr(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const rc = 5;
function ur(t, e, n) {
  const s = Math.max(e - rc, 0);
  return lr(n - t(s), e - s);
}
const an = 1e-3, oc = 0.01, Ts = 10, ac = 0.05, cc = 1;
function lc({ duration: t = 800, bounce: e = 0.25, velocity: n = 0, mass: s = 1 }) {
  let i, o;
  pe(t <= Pt(Ts), "Spring duration must be 10 seconds or less");
  let r = 1 - e;
  r = Tt(ac, cc, r), t = Tt(oc, Ts, mt(t)), r < 1 ? (i = (l) => {
    const u = l * r, h = u * t, d = u - n, p = gn(l, r), m = Math.exp(-h);
    return an - d / p * m;
  }, o = (l) => {
    const h = l * r * t, d = h * n + n, p = Math.pow(r, 2) * Math.pow(l, 2) * t, m = Math.exp(-h), b = gn(Math.pow(l, 2), r);
    return (-i(l) + an > 0 ? -1 : 1) * ((d - p) * m) / b;
  }) : (i = (l) => {
    const u = Math.exp(-l * t), h = (l - n) * t + 1;
    return -an + u * h;
  }, o = (l) => {
    const u = Math.exp(-l * t), h = (n - l) * (t * t);
    return u * h;
  });
  const a = 5 / t, c = fc(i, o, a);
  if (t = Pt(t), isNaN(c))
    return {
      stiffness: 100,
      damping: 10,
      duration: t
    };
  {
    const l = Math.pow(c, 2) * s;
    return {
      stiffness: l,
      damping: r * 2 * Math.sqrt(s * l),
      duration: t
    };
  }
}
const uc = 12;
function fc(t, e, n) {
  let s = n;
  for (let i = 1; i < uc; i++)
    s = s - t(s) / e(s);
  return s;
}
function gn(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const hc = ["duration", "bounce"], dc = ["stiffness", "damping", "mass"];
function Ss(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function pc(t) {
  let e = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Ss(t, dc) && Ss(t, hc)) {
    const n = lc(t);
    e = {
      ...e,
      ...n,
      velocity: 0,
      mass: 1
    }, e.isResolvedFromDuration = !0;
  }
  return e;
}
function fr({ keyframes: t, restDelta: e, restSpeed: n, ...s }) {
  const i = t[0], o = t[t.length - 1], r = { done: !1, value: i }, { stiffness: a, damping: c, mass: l, velocity: u, duration: h, isResolvedFromDuration: d } = pc(s), p = u ? -mt(u) : 0, m = c / (2 * Math.sqrt(a * l)), b = o - i, T = mt(Math.sqrt(a / l)), w = Math.abs(b) < 5;
  n || (n = w ? 0.01 : 2), e || (e = w ? 5e-3 : 0.5);
  let y;
  if (m < 1) {
    const x = gn(T, m);
    y = (S) => {
      const A = Math.exp(-m * T * S);
      return o - A * ((p + m * T * b) / x * Math.sin(x * S) + b * Math.cos(x * S));
    };
  } else if (m === 1)
    y = (x) => o - Math.exp(-T * x) * (b + (p + T * b) * x);
  else {
    const x = T * Math.sqrt(m * m - 1);
    y = (S) => {
      const A = Math.exp(-m * T * S), z = Math.min(x * S, 300);
      return o - A * ((p + m * T * b) * Math.sinh(z) + x * b * Math.cosh(z)) / x;
    };
  }
  return {
    calculatedDuration: d && h || null,
    next: (x) => {
      const S = y(x);
      if (d)
        r.done = x >= h;
      else {
        let A = p;
        x !== 0 && (m < 1 ? A = ur(y, x, S) : A = 0);
        const z = Math.abs(A) <= n, k = Math.abs(o - S) <= e;
        r.done = z && k;
      }
      return r.value = r.done ? o : S, r;
    }
  };
}
function Cs({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: c, restDelta: l = 0.5, restSpeed: u }) {
  const h = t[0], d = {
    done: !1,
    value: h
  }, p = (E) => a !== void 0 && E < a || c !== void 0 && E > c, m = (E) => a === void 0 ? c : c === void 0 || Math.abs(a - E) < Math.abs(c - E) ? a : c;
  let b = n * e;
  const T = h + b, w = r === void 0 ? T : r(T);
  w !== T && (b = w - h);
  const y = (E) => -b * Math.exp(-E / s), x = (E) => w + y(E), S = (E) => {
    const F = y(E), et = x(E);
    d.done = Math.abs(F) <= l, d.value = d.done ? w : et;
  };
  let A, z;
  const k = (E) => {
    p(d.value) && (A = E, z = fr({
      keyframes: [d.value, m(d.value)],
      velocity: ur(x, E, d.value),
      damping: i,
      stiffness: o,
      restDelta: l,
      restSpeed: u
    }));
  };
  return k(0), {
    calculatedDuration: null,
    next: (E) => {
      let F = !1;
      return !z && A === void 0 && (F = !0, S(E), k(E)), A !== void 0 && E > A ? z.next(E - A) : (!F && S(E), d);
    }
  };
}
const mc = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => _.update(e, !0),
    stop: () => gt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Y.isProcessing ? Y.timestamp : performance.now()
  };
}, ws = 2e4;
function Vs(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < ws; )
    e += n, s = t.next(e);
  return e >= ws ? 1 / 0 : e;
}
const gc = {
  decay: Cs,
  inertia: Cs,
  tween: Oe,
  keyframes: Oe,
  spring: fr
};
function ke({ autoplay: t = !0, delay: e = 0, driver: n = mc, keyframes: s, type: i = "keyframes", repeat: o = 0, repeatDelay: r = 0, repeatType: a = "loop", onPlay: c, onStop: l, onComplete: u, onUpdate: h, ...d }) {
  let p = 1, m = !1, b, T;
  const w = () => {
    T = new Promise((O) => {
      b = O;
    });
  };
  w();
  let y;
  const x = gc[i] || Oe;
  let S;
  x !== Oe && typeof s[0] != "number" && (S = cr([0, 100], s, {
    clamp: !1
  }), s = [0, 100]);
  const A = x({ ...d, keyframes: s });
  let z;
  a === "mirror" && (z = x({
    ...d,
    keyframes: [...s].reverse(),
    velocity: -(d.velocity || 0)
  }));
  let k = "idle", E = null, F = null, et = null;
  A.calculatedDuration === null && o && (A.calculatedDuration = Vs(A));
  const { calculatedDuration: nt } = A;
  let st = 1 / 0, G = 1 / 0;
  nt !== null && (st = nt + r, G = st * (o + 1) - r);
  let L = 0;
  const B = (O) => {
    if (F === null)
      return;
    p > 0 && (F = Math.min(F, O)), p < 0 && (F = Math.min(O - G / p, F)), E !== null ? L = E : L = Math.round(O - F) * p;
    const yt = L - e * (p >= 0 ? 1 : -1), Kt = p >= 0 ? yt < 0 : yt > G;
    L = Math.max(yt, 0), k === "finished" && E === null && (L = G);
    let ye = L, ve = A;
    if (o) {
      const wt = L / st;
      let ut = Math.floor(wt), ft = wt % 1;
      !ft && wt >= 1 && (ft = 1), ft === 1 && ut--, ut = Math.min(ut, o + 1);
      const qt = !!(ut % 2);
      qt && (a === "reverse" ? (ft = 1 - ft, r && (ft -= r / st)) : a === "mirror" && (ve = z));
      let be = Tt(0, 1, ft);
      L > G && (be = a === "reverse" && qt ? 1 : 0), ye = be * st;
    }
    const lt = Kt ? { done: !1, value: s[0] } : ve.next(ye);
    S && (lt.value = S(lt.value));
    let { done: Lt } = lt;
    !Kt && nt !== null && (Lt = p >= 0 ? L >= G : L <= 0);
    const Ot = E === null && (k === "finished" || k === "running" && Lt);
    return h && h(lt.value), Ot && ge(), lt;
  }, it = () => {
    y && y.stop(), y = void 0;
  }, ct = () => {
    k = "idle", it(), b(), w(), F = et = null;
  }, ge = () => {
    k = "finished", u && u(), it(), b();
  }, zt = () => {
    if (m)
      return;
    y || (y = n(B));
    const O = y.now();
    c && c(), E !== null ? F = O - E : (!F || k === "finished") && (F = O), k === "finished" && w(), et = F, E = null, k = "running", y.start();
  };
  t && zt();
  const Yt = {
    then(O, yt) {
      return T.then(O, yt);
    },
    get time() {
      return mt(L);
    },
    set time(O) {
      O = Pt(O), L = O, E !== null || !y || p === 0 ? E = O : F = y.now() - O / p;
    },
    get duration() {
      const O = A.calculatedDuration === null ? Vs(A) : A.calculatedDuration;
      return mt(O);
    },
    get speed() {
      return p;
    },
    set speed(O) {
      O === p || !y || (p = O, Yt.time = mt(L));
    },
    get state() {
      return k;
    },
    play: zt,
    pause: () => {
      k = "paused", E = L;
    },
    stop: () => {
      m = !0, k !== "idle" && (k = "idle", l && l(), ct());
    },
    cancel: () => {
      et !== null && B(et), ct();
    },
    complete: () => {
      k = "finished";
    },
    sample: (O) => (F = 0, B(O))
  };
  return Yt;
}
function yc(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const vc = yc(() => Object.hasOwnProperty.call(Element.prototype, "animate")), bc = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), we = 10, xc = 2e4, Pc = (t, e) => e.type === "spring" || t === "backgroundColor" || !$i(e.ease);
function Tc(t, e, { onUpdate: n, onComplete: s, ...i }) {
  if (!(vc() && bc.has(e) && !i.repeatDelay && i.repeatType !== "mirror" && i.damping !== 0 && i.type !== "inertia"))
    return !1;
  let r = !1, a, c;
  const l = () => {
    c = new Promise((y) => {
      a = y;
    });
  };
  l();
  let { keyframes: u, duration: h = 300, ease: d, times: p } = i;
  if (Pc(e, i)) {
    const y = ke({
      ...i,
      repeat: 0,
      delay: 0
    });
    let x = { done: !1, value: u[0] };
    const S = [];
    let A = 0;
    for (; !x.done && A < xc; )
      x = y.sample(A), S.push(x.value), A += we;
    p = void 0, u = S, h = A - we, d = "linear";
  }
  const m = La(t.owner.current, e, u, {
    ...i,
    duration: h,
    /**
     * This function is currently not called if ease is provided
     * as a function so the cast is safe.
     *
     * However it would be possible for a future refinement to port
     * in easing pregeneration from Motion One for browsers that
     * support the upcoming `linear()` easing function.
     */
    ease: d,
    times: p
  }), b = () => m.cancel(), T = () => {
    _.update(b), a(), l();
  };
  return m.onfinish = () => {
    t.set(Oa(u, i)), s && s(), T();
  }, {
    then(y, x) {
      return c.then(y, x);
    },
    attachTimeline(y) {
      return m.timeline = y, m.onfinish = null, N;
    },
    get time() {
      return mt(m.currentTime || 0);
    },
    set time(y) {
      m.currentTime = Pt(y);
    },
    get speed() {
      return m.playbackRate;
    },
    set speed(y) {
      m.playbackRate = y;
    },
    get duration() {
      return mt(h);
    },
    play: () => {
      r || (m.play(), gt(b));
    },
    pause: () => m.pause(),
    stop: () => {
      if (r = !0, m.playState === "idle")
        return;
      const { currentTime: y } = m;
      if (y) {
        const x = ke({
          ...i,
          autoplay: !1
        });
        t.setWithVelocity(x.sample(y - we).value, x.sample(y).value, we);
      }
      T();
    },
    complete: () => m.finish(),
    cancel: T
  };
}
function Sc({ keyframes: t, delay: e, onUpdate: n, onComplete: s }) {
  const i = () => (n && n(t[t.length - 1]), s && s(), {
    time: 0,
    speed: 1,
    duration: 0,
    play: N,
    pause: N,
    stop: N,
    then: (o) => (o(), Promise.resolve()),
    cancel: N,
    complete: N
  });
  return e ? ke({
    keyframes: [0, 1],
    duration: 0,
    delay: e,
    onComplete: i
  }) : i();
}
const Cc = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, wc = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Vc = {
  type: "keyframes",
  duration: 0.8
}, Ac = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Ec = (t, { keyframes: e }) => e.length > 2 ? Vc : Mt.has(t) ? t.startsWith("scale") ? wc(e[1]) : Cc : Ac, yn = (t, e) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(St.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url(")), Rc = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Dc(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(Ge) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let o = Rc.has(e) ? 1 : 0;
  return s !== n && (o *= 100), e + "(" + o + i + ")";
}
const Mc = /([a-z-]*)\(.*?\)/g, vn = {
  ...St,
  getAnimatableNone: (t) => {
    const e = t.match(Mc);
    return e ? e.map(Dc).join(" ") : t;
  }
}, jc = {
  ...Vi,
  // Color props
  color: q,
  backgroundColor: q,
  outlineColor: q,
  fill: q,
  stroke: q,
  // Border props
  borderColor: q,
  borderTopColor: q,
  borderRightColor: q,
  borderBottomColor: q,
  borderLeftColor: q,
  filter: vn,
  WebkitFilter: vn
}, Nn = (t) => jc[t];
function hr(t, e) {
  let n = Nn(t);
  return n !== vn && (n = St), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const dr = (t) => /^0[^.\s]+$/.test(t);
function Lc(t) {
  if (typeof t == "number")
    return t === 0;
  if (t !== null)
    return t === "none" || t === "0" || dr(t);
}
function Oc(t, e, n, s) {
  const i = yn(e, n);
  let o;
  Array.isArray(n) ? o = [...n] : o = [null, n];
  const r = s.from !== void 0 ? s.from : t.get();
  let a;
  const c = [];
  for (let l = 0; l < o.length; l++)
    o[l] === null && (o[l] = l === 0 ? r : o[l - 1]), Lc(o[l]) && c.push(l), typeof o[l] == "string" && o[l] !== "none" && o[l] !== "0" && (a = o[l]);
  if (i && c.length && a)
    for (let l = 0; l < c.length; l++) {
      const u = c[l];
      o[u] = hr(e, a);
    }
  return o;
}
function kc({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: o, repeatType: r, repeatDelay: a, from: c, elapsed: l, ...u }) {
  return !!Object.keys(u).length;
}
function pr(t, e) {
  return t[e] || t.default || t;
}
const Un = (t, e, n, s = {}) => (i) => {
  const o = pr(s, t) || {}, r = o.delay || s.delay || 0;
  let { elapsed: a = 0 } = s;
  a = a - Pt(r);
  const c = Oc(e, t, n, o), l = c[0], u = c[c.length - 1], h = yn(t, l), d = yn(t, u);
  pe(h === d, `You are trying to animate ${t} from "${l}" to "${u}". ${l} is not an animatable value - to enable this animation set ${l} to a value animatable to ${u} via the \`style\` property.`);
  let p = {
    keyframes: c,
    velocity: e.getVelocity(),
    ease: "easeOut",
    ...o,
    delay: -a,
    onUpdate: (m) => {
      e.set(m), o.onUpdate && o.onUpdate(m);
    },
    onComplete: () => {
      i(), o.onComplete && o.onComplete();
    }
  };
  if (kc(o) || (p = {
    ...p,
    ...Ec(t, p)
  }), p.duration && (p.duration = Pt(p.duration)), p.repeatDelay && (p.repeatDelay = Pt(p.repeatDelay)), !h || !d || ja.current || o.type === !1)
    return Sc(p);
  if (e.owner && e.owner.current instanceof HTMLElement && !e.owner.getProps().onUpdate) {
    const m = Tc(e, t, p);
    if (m)
      return m;
  }
  return ke(p);
};
function Fe(t) {
  return !!(Z(t) && t.add);
}
const mr = (t) => /^\-?\d*\.?\d+$/.test(t);
function $n(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Wn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
class Hn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return $n(this.subscriptions, e), () => Wn(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let o = 0; o < i; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const As = /* @__PURE__ */ new Set();
function Gn(t, e, n) {
  t || As.has(e) || (console.warn(e), n && console.warn(n), As.add(e));
}
const Fc = (t) => !isNaN(parseFloat(t));
class Bc {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(e, n = {}) {
    this.version = "10.16.0", this.timeDelta = 0, this.lastUpdated = 0, this.canTrackVelocity = !1, this.events = {}, this.updateAndNotify = (s, i = !0) => {
      this.prev = this.current, this.current = s;
      const { delta: o, timestamp: r } = Y;
      this.lastUpdated !== r && (this.timeDelta = o, this.lastUpdated = r, _.postRender(this.scheduleVelocityCheck)), this.prev !== this.current && this.events.change && this.events.change.notify(this.current), this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.scheduleVelocityCheck = () => _.postRender(this.velocityCheck), this.velocityCheck = ({ timestamp: s }) => {
      s !== this.lastUpdated && (this.prev = this.current, this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()));
    }, this.hasAnimated = !1, this.prev = this.current = e, this.canTrackVelocity = Fc(this.current), this.owner = n.owner;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && Gn(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new Hn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), _.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(e, n) : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = e, this.timeDelta = s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e) {
    this.updateAndNotify(e), this.prev = e, this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    return this.canTrackVelocity ? (
      // These casts could be avoided if parseFloat would be typed better
      lr(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
    ) : 0;
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Wt(t, e) {
  return new Bc(t, e);
}
const gr = (t) => (e) => e.test(t), Ic = {
  test: (t) => t === "auto",
  parse: (t) => t
}, yr = [jt, P, ot, vt, Go, Ho, Ic], te = (t) => yr.find(gr(t)), _c = [...yr, q, St], Nc = (t) => _c.find(gr(t));
function Uc(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Wt(n));
}
function $c(t, e) {
  const n = Ye(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...o } = n ? t.makeTargetAnimatable(n, !1) : {};
  o = { ...o, ...s };
  for (const r in o) {
    const a = oa(o[r]);
    Uc(t, r, a);
  }
}
function Wc(t, e, n) {
  var s, i;
  const o = Object.keys(e).filter((a) => !t.hasValue(a)), r = o.length;
  if (r)
    for (let a = 0; a < r; a++) {
      const c = o[a], l = e[c];
      let u = null;
      Array.isArray(l) && (u = l[0]), u === null && (u = (i = (s = n[c]) !== null && s !== void 0 ? s : t.readValue(c)) !== null && i !== void 0 ? i : e[c]), u != null && (typeof u == "string" && (mr(u) || dr(u)) ? u = parseFloat(u) : !Nc(u) && St.test(l) && (u = hr(c, l)), t.addValue(c, Wt(u, { owner: t })), n[c] === void 0 && (n[c] = u), u !== null && t.setBaseTarget(c, u));
    }
}
function Hc(t, e) {
  return e ? (e[t] || e.default || e).from : void 0;
}
function Gc(t, e, n) {
  const s = {};
  for (const i in t) {
    const o = Hc(i, e);
    if (o !== void 0)
      s[i] = o;
    else {
      const r = n.getValue(i);
      r && (s[i] = r.get());
    }
  }
  return s;
}
function zc({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function vr(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = t.makeTargetAnimatable(e);
  const c = t.getValue("willChange");
  s && (o = s);
  const l = [], u = i && t.animationState && t.animationState.getState()[i];
  for (const h in a) {
    const d = t.getValue(h), p = a[h];
    if (!d || p === void 0 || u && zc(u, h))
      continue;
    const m = { delay: n, elapsed: 0, ...o };
    if (window.HandoffAppearAnimations && !d.hasAnimated) {
      const T = t.getProps()[Ma];
      T && (m.elapsed = window.HandoffAppearAnimations(T, h, d, _));
    }
    d.start(Un(h, d, p, t.shouldReduceMotion && Mt.has(h) ? { type: !1 } : m));
    const b = d.animation;
    Fe(c) && (c.add(h), b.then(() => c.remove(h))), l.push(b);
  }
  return r && Promise.all(l).then(() => {
    r && $c(t, r);
  }), l;
}
function bn(t, e, n = {}) {
  const s = Ye(t, e, n.custom);
  let { transition: i = t.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = s ? () => Promise.all(vr(t, s, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (c = 0) => {
    const { delayChildren: l = 0, staggerChildren: u, staggerDirection: h } = i;
    return Yc(t, e, l + c, u, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [c, l] = a === "beforeChildren" ? [o, r] : [r, o];
    return c().then(() => l());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function Yc(t, e, n = 0, s = 0, i = 1, o) {
  const r = [], a = (t.variantChildren.size - 1) * s, c = i === 1 ? (l = 0) => l * s : (l = 0) => a - l * s;
  return Array.from(t.variantChildren).sort(Kc).forEach((l, u) => {
    l.notify("AnimationStart", e), r.push(bn(l, e, {
      ...o,
      delay: n + c(u)
    }).then(() => l.notify("AnimationComplete", e)));
  }), Promise.all(r);
}
function Kc(t, e) {
  return t.sortNodePosition(e);
}
function qc(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((o) => bn(t, o, n));
    s = Promise.all(i);
  } else if (typeof e == "string")
    s = bn(t, e, n);
  else {
    const i = typeof e == "function" ? Ye(t, e, n.custom) : e;
    s = Promise.all(vr(t, i, n));
  }
  return s.then(() => t.notify("AnimationComplete", e));
}
const Xc = [...An].reverse(), Zc = An.length;
function Jc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: s }) => qc(t, n, s)));
}
function Qc(t) {
  let e = Jc(t);
  const n = el();
  let s = !0;
  const i = (c, l) => {
    const u = Ye(t, l);
    if (u) {
      const { transition: h, transitionEnd: d, ...p } = u;
      c = { ...c, ...p, ...d };
    }
    return c;
  };
  function o(c) {
    e = c(t);
  }
  function r(c, l) {
    const u = t.getProps(), h = t.getVariantContext(!0) || {}, d = [], p = /* @__PURE__ */ new Set();
    let m = {}, b = 1 / 0;
    for (let w = 0; w < Zc; w++) {
      const y = Xc[w], x = n[y], S = u[y] !== void 0 ? u[y] : h[y], A = ce(S), z = y === l ? x.isActive : null;
      z === !1 && (b = w);
      let k = S === h[y] && S !== u[y] && A;
      if (k && s && t.manuallyAnimateOnMount && (k = !1), x.protectedKeys = { ...m }, // If it isn't active and hasn't *just* been set as inactive
      !x.isActive && z === null || // If we didn't and don't have any defined prop for this animation type
      !S && !x.prevProp || // Or if the prop doesn't define an animation
      We(S) || typeof S == "boolean")
        continue;
      const E = tl(x.prevProp, S);
      let F = E || // If we're making this variant active, we want to always make it active
      y === l && x.isActive && !k && A || // If we removed a higher-priority variant (i is in reverse order)
      w > b && A;
      const et = Array.isArray(S) ? S : [S];
      let nt = et.reduce(i, {});
      z === !1 && (nt = {});
      const { prevResolvedValues: st = {} } = x, G = {
        ...st,
        ...nt
      }, L = (B) => {
        F = !0, p.delete(B), x.needsAnimating[B] = !0;
      };
      for (const B in G) {
        const it = nt[B], ct = st[B];
        m.hasOwnProperty(B) || (it !== ct ? je(it) && je(ct) ? !Ni(it, ct) || E ? L(B) : x.protectedKeys[B] = !0 : it !== void 0 ? L(B) : p.add(B) : it !== void 0 && p.has(B) ? L(B) : x.protectedKeys[B] = !0);
      }
      x.prevProp = S, x.prevResolvedValues = nt, x.isActive && (m = { ...m, ...nt }), s && t.blockInitialAnimation && (F = !1), F && !k && d.push(...et.map((B) => ({
        animation: B,
        options: { type: y, ...c }
      })));
    }
    if (p.size) {
      const w = {};
      p.forEach((y) => {
        const x = t.getBaseTarget(y);
        x !== void 0 && (w[y] = x);
      }), d.push({ animation: w });
    }
    let T = !!d.length;
    return s && u.initial === !1 && !t.manuallyAnimateOnMount && (T = !1), s = !1, T ? e(d) : Promise.resolve();
  }
  function a(c, l, u) {
    var h;
    if (n[c].isActive === l)
      return Promise.resolve();
    (h = t.variantChildren) === null || h === void 0 || h.forEach((p) => {
      var m;
      return (m = p.animationState) === null || m === void 0 ? void 0 : m.setActive(c, l);
    }), n[c].isActive = l;
    const d = r(u, c);
    for (const p in n)
      n[p].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n
  };
}
function tl(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Ni(e, t) : !1;
}
function Vt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function el() {
  return {
    animate: Vt(!0),
    whileInView: Vt(),
    whileHover: Vt(),
    whileTap: Vt(),
    whileDrag: Vt(),
    whileFocus: Vt(),
    exit: Vt()
  };
}
class nl extends Ct {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Qc(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    this.unmount(), We(e) && (this.unmount = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
  }
}
let sl = 0;
class il extends Ct {
  constructor() {
    super(...arguments), this.id = sl++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n, custom: s } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i)
      return;
    const o = this.node.animationState.setActive("exit", !e, { custom: s ?? this.node.getProps().custom });
    n && !e && o.then(() => n(this.id));
  }
  mount() {
    const { register: e } = this.node.presenceContext || {};
    e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const rl = {
  animation: {
    Feature: nl
  },
  exit: {
    Feature: il
  }
}, Es = (t, e) => Math.abs(t - e);
function ol(t, e) {
  const n = Es(t.x, e.x), s = Es(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class br {
  constructor(e, n, { transformPagePoint: s } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const l = ln(this.lastMoveEventInfo, this.history), u = this.startEvent !== null, h = ol(l.offset, { x: 0, y: 0 }) >= 3;
      if (!u && !h)
        return;
      const { point: d } = l, { timestamp: p } = Y;
      this.history.push({ ...d, timestamp: p });
      const { onStart: m, onMove: b } = this.handlers;
      u || (m && m(this.lastMoveEvent, l), this.startEvent = this.lastMoveEvent), b && b(this.lastMoveEvent, l);
    }, this.handlePointerMove = (l, u) => {
      this.lastMoveEvent = l, this.lastMoveEventInfo = cn(u, this.transformPagePoint), _.update(this.updatePoint, !0);
    }, this.handlePointerUp = (l, u) => {
      if (this.end(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const { onEnd: h, onSessionEnd: d } = this.handlers, p = ln(l.type === "pointercancel" ? this.lastMoveEventInfo : cn(u, this.transformPagePoint), this.history);
      this.startEvent && h && h(l, p), d && d(l, p);
    }, !ki(e))
      return;
    this.handlers = n, this.transformPagePoint = s;
    const i = ze(e), o = cn(i, this.transformPagePoint), { point: r } = o, { timestamp: a } = Y;
    this.history = [{ ...r, timestamp: a }];
    const { onSessionStart: c } = n;
    c && c(e, ln(o, this.history)), this.removeListeners = xt(pt(window, "pointermove", this.handlePointerMove), pt(window, "pointerup", this.handlePointerUp), pt(window, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), gt(this.updatePoint);
  }
}
function cn(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Rs(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function ln({ point: t }, e) {
  return {
    point: t,
    delta: Rs(t, xr(e)),
    offset: Rs(t, al(e)),
    velocity: cl(e, 0.1)
  };
}
function al(t) {
  return t[0];
}
function xr(t) {
  return t[t.length - 1];
}
function cl(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, s = null;
  const i = xr(t);
  for (; n >= 0 && (s = t[n], !(i.timestamp - s.timestamp > Pt(e))); )
    n--;
  if (!s)
    return { x: 0, y: 0 };
  const o = mt(i.timestamp - s.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (i.x - s.x) / o,
    y: (i.y - s.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function J(t) {
  return t.max - t.min;
}
function xn(t, e = 0, n = 0.01) {
  return Math.abs(t - e) <= n;
}
function Ds(t, e, n, s = 0.5) {
  t.origin = s, t.originPoint = I(e.min, e.max, t.origin), t.scale = J(n) / J(e), (xn(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1), t.translate = I(n.min, n.max, t.origin) - t.originPoint, (xn(t.translate) || isNaN(t.translate)) && (t.translate = 0);
}
function re(t, e, n, s) {
  Ds(t.x, e.x, n.x, s ? s.originX : void 0), Ds(t.y, e.y, n.y, s ? s.originY : void 0);
}
function Ms(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + J(e);
}
function ll(t, e, n) {
  Ms(t.x, e.x, n.x), Ms(t.y, e.y, n.y);
}
function js(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + J(e);
}
function oe(t, e, n) {
  js(t.x, e.x, n.x), js(t.y, e.y, n.y);
}
function ul(t, { min: e, max: n }, s) {
  return e !== void 0 && t < e ? t = s ? I(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? I(n, t, s.max) : Math.min(t, n)), t;
}
function Ls(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function fl(t, { top: e, left: n, bottom: s, right: i }) {
  return {
    x: Ls(t.x, n, i),
    y: Ls(t.y, e, s)
  };
}
function Os(t, e) {
  let n = e.min - t.min, s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function hl(t, e) {
  return {
    x: Os(t.x, e.x),
    y: Os(t.y, e.y)
  };
}
function dl(t, e) {
  let n = 0.5;
  const s = J(t), i = J(e);
  return i > s ? n = ue(e.min, e.max - s, t.min) : s > i && (n = ue(t.min, t.max - i, e.min)), Tt(0, 1, n);
}
function pl(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const Pn = 0.35;
function ml(t = Pn) {
  return t === !1 ? t = 0 : t === !0 && (t = Pn), {
    x: ks(t, "left", "right"),
    y: ks(t, "top", "bottom")
  };
}
function ks(t, e, n) {
  return {
    min: Fs(t, e),
    max: Fs(t, n)
  };
}
function Fs(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Bs = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ut = () => ({
  x: Bs(),
  y: Bs()
}), Is = () => ({ min: 0, max: 0 }), W = () => ({
  x: Is(),
  y: Is()
});
function rt(t) {
  return [t("x"), t("y")];
}
function Pr({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function gl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function yl(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function un(t) {
  return t === void 0 || t === 1;
}
function Tn({ scale: t, scaleX: e, scaleY: n }) {
  return !un(t) || !un(e) || !un(n);
}
function At(t) {
  return Tn(t) || Tr(t) || t.z || t.rotate || t.rotateX || t.rotateY;
}
function Tr(t) {
  return _s(t.x) || _s(t.y);
}
function _s(t) {
  return t && t !== "0%";
}
function Be(t, e, n) {
  const s = t - n, i = e * s;
  return n + i;
}
function Ns(t, e, n, s, i) {
  return i !== void 0 && (t = Be(t, i, s)), Be(t, n, s) + e;
}
function Sn(t, e = 0, n = 1, s, i) {
  t.min = Ns(t.min, e, n, s, i), t.max = Ns(t.max, e, n, s, i);
}
function Sr(t, { x: e, y: n }) {
  Sn(t.x, e.translate, e.scale, e.originPoint), Sn(t.y, n.translate, n.scale, n.originPoint);
}
function vl(t, e, n, s = !1) {
  const i = n.length;
  if (!i)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < i; a++) {
    o = n[a], r = o.projectionDelta;
    const c = o.instance;
    c && c.style && c.style.display === "contents" || (s && o.options.layoutScroll && o.scroll && o !== o.root && $t(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, Sr(t, r)), s && At(o.latestValues) && $t(t, o.latestValues));
  }
  e.x = Us(e.x), e.y = Us(e.y);
}
function Us(t) {
  return Number.isInteger(t) || t > 1.0000000000001 || t < 0.999999999999 ? t : 1;
}
function bt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function $s(t, e, [n, s, i]) {
  const o = e[i] !== void 0 ? e[i] : 0.5, r = I(t.min, t.max, o);
  Sn(t, e[n], e[s], r, e.scale);
}
const bl = ["x", "scaleX", "originX"], xl = ["y", "scaleY", "originY"];
function $t(t, e) {
  $s(t.x, e, bl), $s(t.y, e, xl);
}
function Cr(t, e) {
  return Pr(yl(t.getBoundingClientRect(), e));
}
function Pl(t, e, n) {
  const s = Cr(t, n), { scroll: i } = e;
  return i && (bt(s.x, i.offset.x), bt(s.y, i.offset.y)), s;
}
const Tl = /* @__PURE__ */ new WeakMap();
class Sl {
  constructor(e) {
    this.openGlobalLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = W(), this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const i = (c) => {
      this.stopAnimation(), n && this.snapToCursor(ze(c, "page").point);
    }, o = (c, l) => {
      const { drag: u, dragPropagation: h, onDragStart: d } = this.getProps();
      if (u && !h && (this.openGlobalLock && this.openGlobalLock(), this.openGlobalLock = Bi(u), !this.openGlobalLock))
        return;
      this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), rt((m) => {
        let b = this.getAxisMotionValue(m).get() || 0;
        if (ot.test(b)) {
          const { projection: T } = this.visualElement;
          if (T && T.layout) {
            const w = T.layout.layoutBox[m];
            w && (b = J(w) * (parseFloat(b) / 100));
          }
        }
        this.originPoint[m] = b;
      }), d && _.update(() => d(c, l), !1, !0);
      const { animationState: p } = this.visualElement;
      p && p.setActive("whileDrag", !0);
    }, r = (c, l) => {
      const { dragPropagation: u, dragDirectionLock: h, onDirectionLock: d, onDrag: p } = this.getProps();
      if (!u && !this.openGlobalLock)
        return;
      const { offset: m } = l;
      if (h && this.currentDirection === null) {
        this.currentDirection = Cl(m), this.currentDirection !== null && d && d(this.currentDirection);
        return;
      }
      this.updateAxis("x", l.point, m), this.updateAxis("y", l.point, m), this.visualElement.render(), p && p(c, l);
    }, a = (c, l) => this.stop(c, l);
    this.panSession = new br(e, {
      onSessionStart: i,
      onStart: o,
      onMove: r,
      onSessionEnd: a
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  }
  stop(e, n) {
    const s = this.isDragging;
    if (this.cancel(), !s)
      return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: o } = this.getProps();
    o && _.update(() => o(e, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: s } = this.getProps();
    !s && this.openGlobalLock && (this.openGlobalLock(), this.openGlobalLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !Ve(e, i, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (r = ul(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), { layout: s } = this.visualElement.projection || {}, i = this.constraints;
    e && _t(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = fl(s.layoutBox, e) : this.constraints = !1, this.elastic = ml(n), i !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && rt((o) => {
      this.getAxisMotionValue(o) && (this.constraints[o] = pl(s.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !_t(e))
      return !1;
    const s = e.current;
    at(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const o = Pl(s, i.root, this.visualElement.getTransformPagePoint());
    let r = hl(i.layout.layoutBox, o);
    if (n) {
      const a = n(gl(r));
      this.hasMutatedConstraints = !!a, a && (r = Pr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), c = this.constraints || {}, l = rt((u) => {
      if (!Ve(u, n, this.currentDirection))
        return;
      let h = c && c[u] || {};
      r && (h = { min: 0, max: 0 });
      const d = i ? 200 : 1e6, p = i ? 40 : 1e7, m = {
        type: "inertia",
        velocity: s ? e[u] : 0,
        bounceStiffness: d,
        bounceDamping: p,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(u, m);
    });
    return Promise.all(l).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return s.start(Un(e, s, 0, n));
  }
  stopAnimation() {
    rt((e) => this.getAxisMotionValue(e).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = "_drag" + e.toUpperCase(), s = this.visualElement.getProps(), i = s[n];
    return i || this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    rt((n) => {
      const { drag: s } = this.getProps();
      if (!Ve(n, s, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: r, max: a } = i.layout.layoutBox[n];
        o.set(e[n] - I(r, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!_t(n) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    rt((r) => {
      const a = this.getAxisMotionValue(r);
      if (a) {
        const c = a.get();
        i[r] = dl({ min: c, max: c }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.resolveConstraints(), rt((r) => {
      if (!Ve(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: c, max: l } = this.constraints[r];
      a.set(I(c, l, i[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Tl.set(this.visualElement, this);
    const e = this.visualElement.current, n = pt(e, "pointerdown", (c) => {
      const { drag: l, dragListener: u = !0 } = this.getProps();
      l && u && this.start(c);
    }), s = () => {
      const { dragConstraints: c } = this.getProps();
      _t(c) && (this.constraints = this.resolveRefConstraints());
    }, { projection: i } = this.visualElement, o = i.addEventListener("measure", s);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), s();
    const r = dt(window, "resize", () => this.scalePositionWithinConstraints()), a = i.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: l }) => {
      this.isDragging && l && (rt((u) => {
        const h = this.getAxisMotionValue(u);
        h && (this.originPoint[u] += c[u].translate, h.set(h.get() + c[u].translate));
      }), this.visualElement.render());
    });
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: s = !1, dragPropagation: i = !1, dragConstraints: o = !1, dragElastic: r = Pn, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function Ve(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Cl(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class wl extends Ct {
  constructor(e) {
    super(e), this.removeGroupControls = N, this.removeListeners = N, this.controls = new Sl(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || N;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Ws = (t) => (e, n) => {
  t && _.update(() => t(e, n));
};
class Vl extends Ct {
  constructor() {
    super(...arguments), this.removePointerDownListener = N;
  }
  onPointerDown(e) {
    this.session = new br(e, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint() });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: Ws(e),
      onStart: Ws(n),
      onMove: s,
      onEnd: (o, r) => {
        delete this.session, i && _.update(() => i(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = pt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function Al() {
  const t = X(Vn);
  if (t === null)
    return [!0, null];
  const { isPresent: e, onExitComplete: n, register: s } = t, i = yo();
  return ae(() => s(i), []), !e && n ? [!1, () => n && n(i)] : [!0];
}
const Re = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function Hs(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const ee = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (P.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Hs(t, e.target.x), s = Hs(t, e.target.y);
    return `${n}% ${s}%`;
  }
}, El = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const s = t, i = St.parse(t);
    if (i.length > 5)
      return s;
    const o = St.createTransformer(t), r = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, c = n.y.scale * e.y;
    i[0 + r] /= a, i[1 + r] /= c;
    const l = I(a, c, 0.5);
    return typeof i[2 + r] == "number" && (i[2 + r] /= l), typeof i[3 + r] == "number" && (i[3 + r] /= l), o(i);
  }
};
class Rl extends Ie.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: o } = e;
    Bo(Dl), o && (n.group && n.group.add(o), s && s.register && i && s.register(o), o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), Re.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: o } = this.props, r = s.projection;
    return r && (r.isPresent = o, i || e.layoutDependency !== n || n === void 0 ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || _.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), queueMicrotask(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = e;
    i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function wr(t) {
  const [e, n] = Al(), s = X(xi);
  return Ie.createElement(Rl, { ...t, layoutGroup: s, switchLayoutGroup: X(Pi), isPresent: e, safeToRemove: n });
}
const Dl = {
  borderRadius: {
    ...ee,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: ee,
  borderTopRightRadius: ee,
  borderBottomLeftRadius: ee,
  borderBottomRightRadius: ee,
  boxShadow: El
}, Vr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Ml = Vr.length, Gs = (t) => typeof t == "string" ? parseFloat(t) : t, zs = (t) => typeof t == "number" || P.test(t);
function jl(t, e, n, s, i, o) {
  i ? (t.opacity = I(
    0,
    // TODO Reinstate this if only child
    n.opacity !== void 0 ? n.opacity : 1,
    Ll(s)
  ), t.opacityExit = I(e.opacity !== void 0 ? e.opacity : 1, 0, Ol(s))) : o && (t.opacity = I(e.opacity !== void 0 ? e.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, s));
  for (let r = 0; r < Ml; r++) {
    const a = `border${Vr[r]}Radius`;
    let c = Ys(e, a), l = Ys(n, a);
    if (c === void 0 && l === void 0)
      continue;
    c || (c = 0), l || (l = 0), c === 0 || l === 0 || zs(c) === zs(l) ? (t[a] = Math.max(I(Gs(c), Gs(l), s), 0), (ot.test(l) || ot.test(c)) && (t[a] += "%")) : t[a] = l;
  }
  (e.rotate || n.rotate) && (t.rotate = I(e.rotate || 0, n.rotate || 0, s));
}
function Ys(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const Ll = Ar(0, 0.5, Bn), Ol = Ar(0.5, 0.95, N);
function Ar(t, e, n) {
  return (s) => s < t ? 0 : s > e ? 1 : n(ue(t, e, s));
}
function Ks(t, e) {
  t.min = e.min, t.max = e.max;
}
function tt(t, e) {
  Ks(t.x, e.x), Ks(t.y, e.y);
}
function qs(t, e, n, s, i) {
  return t -= e, t = Be(t, 1 / n, s), i !== void 0 && (t = Be(t, 1 / i, s)), t;
}
function kl(t, e = 0, n = 1, s = 0.5, i, o = t, r = t) {
  if (ot.test(e) && (e = parseFloat(e), e = I(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = I(o.min, o.max, s);
  t === o && (a -= e), t.min = qs(t.min, e, n, a, i), t.max = qs(t.max, e, n, a, i);
}
function Xs(t, e, [n, s, i], o, r) {
  kl(t, e[n], e[s], e[i], e.scale, o, r);
}
const Fl = ["x", "scaleX", "originX"], Bl = ["y", "scaleY", "originY"];
function Zs(t, e, n, s) {
  Xs(t.x, e, Fl, n ? n.x : void 0, s ? s.x : void 0), Xs(t.y, e, Bl, n ? n.y : void 0, s ? s.y : void 0);
}
function Js(t) {
  return t.translate === 0 && t.scale === 1;
}
function Er(t) {
  return Js(t.x) && Js(t.y);
}
function Il(t, e) {
  return t.x.min === e.x.min && t.x.max === e.x.max && t.y.min === e.y.min && t.y.max === e.y.max;
}
function Rr(t, e) {
  return Math.round(t.x.min) === Math.round(e.x.min) && Math.round(t.x.max) === Math.round(e.x.max) && Math.round(t.y.min) === Math.round(e.y.min) && Math.round(t.y.max) === Math.round(e.y.max);
}
function Qs(t) {
  return J(t.x) / J(t.y);
}
class _l {
  constructor() {
    this.members = [];
  }
  add(e) {
    $n(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (Wn(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((i) => e === i);
    if (n === 0)
      return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        s = o;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(e, n) {
    const s = this.lead;
    if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
      s.instance && s.scheduleRender(), e.scheduleRender(), e.resumeFrom = s, n && (e.resumeFrom.preserveOpacity = !0), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: i } = e.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: s } = e;
      n.onExitComplete && n.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function ti(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x, o = t.y.translate / e.y;
  if ((i || o) && (s = `translate3d(${i}px, ${o}px, 0) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { rotate: c, rotateX: l, rotateY: u } = n;
    c && (s += `rotate(${c}deg) `), l && (s += `rotateX(${l}deg) `), u && (s += `rotateY(${u}deg) `);
  }
  const r = t.x.scale * e.x, a = t.y.scale * e.y;
  return (r !== 1 || a !== 1) && (s += `scale(${r}, ${a})`), s || "none";
}
const Nl = (t, e) => t.depth - e.depth;
class Ul {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    $n(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    Wn(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Nl), this.isDirty = !1, this.children.forEach(e);
  }
}
function $l(t, e) {
  const n = performance.now(), s = ({ timestamp: i }) => {
    const o = i - n;
    o >= e && (gt(s), t(o - e));
  };
  return _.read(s, !0), () => gt(s);
}
function Wl(t) {
  window.MotionDebug && window.MotionDebug.record(t);
}
function Hl(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
function Gl(t, e, n) {
  const s = Z(t) ? t : Wt(t);
  return s.start(Un("", s, e, n)), s.animation;
}
const ei = ["", "X", "Y", "Z"], ni = 1e3;
let zl = 0;
const Et = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function Dr({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(r = {}, a = e == null ? void 0 : e()) {
      this.id = zl++, this.animationId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        Et.totalNodes = Et.resolvedTargetDeltas = Et.recalculatedProjection = 0, this.nodes.forEach(ql), this.nodes.forEach(tu), this.nodes.forEach(eu), this.nodes.forEach(Xl), Wl(Et);
      }, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let c = 0; c < this.path.length; c++)
        this.path[c].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Ul());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new Hn()), this.eventHandlers.get(r).add(a);
    }
    notifyListeners(r, ...a) {
      const c = this.eventHandlers.get(r);
      c && c.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    /**
     * Lifecycles
     */
    mount(r, a = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = Hl(r), this.instance = r;
      const { layoutId: c, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), a && (l || c) && (this.isLayoutDirty = !0), t) {
        let h;
        const d = () => this.root.updateBlockedByResize = !1;
        t(r, () => {
          this.root.updateBlockedByResize = !0, h && h(), h = $l(d, 250), Re.hasAnimatedSinceResize && (Re.hasAnimatedSinceResize = !1, this.nodes.forEach(ii));
        });
      }
      c && this.root.registerSharedNode(c, this), this.options.animate !== !1 && u && (c || l) && this.addEventListener("didUpdate", ({ delta: h, hasLayoutChanged: d, hasRelativeTargetChanged: p, layout: m }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const b = this.options.transition || u.getDefaultTransition() || ou, { onLayoutAnimationStart: T, onLayoutAnimationComplete: w } = u.getProps(), y = !this.targetLayout || !Rr(this.targetLayout, m) || p, x = !d && p;
        if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || x || d && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(h, x);
          const S = {
            ...pr(b, "layout"),
            onPlay: T,
            onComplete: w
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (S.delay = 0, S.type = !1), this.startAnimation(S);
        } else
          d || ii(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = m;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, gt(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(nu), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        const h = this.path[u];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: c } = this.options;
      if (a === void 0 && !c)
        return;
      const l = this.getTransformTemplate();
      this.prevTransformTemplateValue = l ? l(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(si);
        return;
      }
      this.isUpdating || this.nodes.forEach(Jl), this.isUpdating = !1, this.nodes.forEach(Ql), this.nodes.forEach(Yl), this.nodes.forEach(Kl), this.clearAllSnapshots();
      const a = performance.now();
      Y.delta = Tt(0, 1e3 / 60, a - Y.timestamp), Y.timestamp = a, Y.isProcessing = !0, Qe.update.process(Y), Qe.preRender.process(Y), Qe.render.process(Y), Y.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, queueMicrotask(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Zl), this.sharedNodes.forEach(su);
    }
    scheduleUpdateProjection() {
      _.preRender(this.updateProjection, !1, !0);
    }
    scheduleCheckAfterUnmount() {
      _.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let c = 0; c < this.path.length; c++)
          this.path[c].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = W(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1), a && (this.scroll = {
        animationId: this.root.animationId,
        phase: r,
        isRoot: s(this.instance),
        offset: n(this.instance)
      });
    }
    resetTransform() {
      if (!i)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform, a = this.projectionDelta && !Er(this.projectionDelta), c = this.getTransformTemplate(), l = c ? c(this.latestValues, "") : void 0, u = l !== this.prevTransformTemplateValue;
      r && (a || At(this.latestValues) || u) && (i(this.instance, l), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let c = this.removeElementScroll(a);
      return r && (c = this.removeTransform(c)), au(c), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: c,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r)
        return W();
      const a = r.measureViewportBox(), { scroll: c } = this.root;
      return c && (bt(a.x, c.offset.x), bt(a.y, c.offset.y)), a;
    }
    removeElementScroll(r) {
      const a = W();
      tt(a, r);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c], { scroll: u, options: h } = l;
        if (l !== this.root && u && h.layoutScroll) {
          if (u.isRoot) {
            tt(a, r);
            const { scroll: d } = this.root;
            d && (bt(a.x, -d.offset.x), bt(a.y, -d.offset.y));
          }
          bt(a.x, u.offset.x), bt(a.y, u.offset.y);
        }
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const c = W();
      tt(c, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        !a && u.options.layoutScroll && u.scroll && u !== u.root && $t(c, {
          x: -u.scroll.offset.x,
          y: -u.scroll.offset.y
        }), At(u.latestValues) && $t(c, u.latestValues);
      }
      return At(this.latestValues) && $t(c, this.latestValues), c;
    }
    removeTransform(r) {
      const a = W();
      tt(a, r);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c];
        if (!l.instance || !At(l.latestValues))
          continue;
        Tn(l.latestValues) && l.updateSnapshot();
        const u = W(), h = l.measurePageBox();
        tt(u, h), Zs(a, l.latestValues, l.snapshot ? l.snapshot.layoutBox : void 0, u);
      }
      return At(this.latestValues) && Zs(a, this.latestValues), a;
    }
    setTargetDelta(r) {
      this.targetDelta = r, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Y.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      var a;
      const c = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = c.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = c.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = c.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== c;
      if (!(r || l && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null || a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget))
        return;
      const { layout: h, layoutId: d } = this.options;
      if (!(!this.layout || !(h || d))) {
        if (this.resolvedRelativeTargetAt = Y.timestamp, !this.targetDelta && !this.relativeTarget) {
          const p = this.getClosestProjectingParent();
          p && p.layout && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = W(), this.relativeTargetOrigin = W(), oe(this.relativeTargetOrigin, this.layout.layoutBox, p.layout.layoutBox), tt(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (this.target || (this.target = W(), this.targetWithTransforms = W()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), ll(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : tt(this.target, this.layout.layoutBox), Sr(this.target, this.targetDelta)) : tt(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
            this.attemptToResolveRelativeTarget = !1;
            const p = this.getClosestProjectingParent();
            p && !!p.resumingFrom == !!this.resumingFrom && !p.options.layoutScroll && p.target && this.animationProgress !== 1 ? (this.relativeParent = p, this.forceRelativeParentToResolveTarget(), this.relativeTarget = W(), this.relativeTargetOrigin = W(), oe(this.relativeTargetOrigin, this.target, p.target), tt(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
          }
          Et.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Tn(this.parent.latestValues) || Tr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var r;
      const a = this.getLead(), c = !!this.resumingFrom || this !== a;
      let l = !0;
      if ((this.isProjectionDirty || !((r = this.parent) === null || r === void 0) && r.isProjectionDirty) && (l = !1), c && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === Y.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: h } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || h))
        return;
      tt(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x, p = this.treeScale.y;
      vl(this.layoutCorrected, this.treeScale, this.path, c), a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox);
      const { target: m } = a;
      if (!m) {
        this.projectionTransform && (this.projectionDelta = Ut(), this.projectionTransform = "none", this.scheduleRender());
        return;
      }
      this.projectionDelta || (this.projectionDelta = Ut(), this.projectionDeltaWithTransform = Ut());
      const b = this.projectionTransform;
      re(this.projectionDelta, this.layoutCorrected, m, this.latestValues), this.projectionTransform = ti(this.projectionDelta, this.treeScale), (this.projectionTransform !== b || this.treeScale.x !== d || this.treeScale.y !== p) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", m)), Et.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if (this.options.scheduleRender && this.options.scheduleRender(), r) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    setAnimationOrigin(r, a = !1) {
      const c = this.snapshot, l = c ? c.latestValues : {}, u = { ...this.latestValues }, h = Ut();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = W(), p = c ? c.source : void 0, m = this.layout ? this.layout.source : void 0, b = p !== m, T = this.getStack(), w = !T || T.members.length <= 1, y = !!(b && !w && this.options.crossfade === !0 && !this.path.some(ru));
      this.animationProgress = 0;
      let x;
      this.mixTargetDelta = (S) => {
        const A = S / 1e3;
        ri(h.x, r.x, A), ri(h.y, r.y, A), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (oe(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), iu(this.relativeTarget, this.relativeTargetOrigin, d, A), x && Il(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = W()), tt(x, this.relativeTarget)), b && (this.animationValues = u, jl(u, l, this.latestValues, A, y, w)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = A;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (gt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = _.update(() => {
        Re.hasAnimatedSinceResize = !0, this.currentAnimation = Gl(0, ni, {
          ...r,
          onUpdate: (a) => {
            this.mixTargetDelta(a), r.onUpdate && r.onUpdate(a);
          },
          onComplete: () => {
            r.onComplete && r.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const r = this.getStack();
      r && r.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(ni), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: c, layout: l, latestValues: u } = r;
      if (!(!a || !c || !l)) {
        if (this !== r && this.layout && l && Mr(this.options.animationType, this.layout.layoutBox, l.layoutBox)) {
          c = this.target || W();
          const h = J(this.layout.layoutBox.x);
          c.x.min = r.target.x.min, c.x.max = c.x.min + h;
          const d = J(this.layout.layoutBox.y);
          c.y.min = r.target.y.min, c.y.max = c.y.min + d;
        }
        tt(a, c), $t(a, u), re(this.projectionDeltaWithTransform, this.layoutCorrected, a, u);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new _l()), this.sharedNodes.get(r).add(a);
      const l = a.options.initialPromotionConfig;
      a.promote({
        transition: l ? l.transition : void 0,
        preserveFollowOpacity: l && l.shouldPreserveFollowOpacity ? l.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      var r;
      const { layoutId: a } = this.options;
      return a ? ((r = this.getStack()) === null || r === void 0 ? void 0 : r.lead) || this : this;
    }
    getPrevLead() {
      var r;
      const { layoutId: a } = this.options;
      return a ? (r = this.getStack()) === null || r === void 0 ? void 0 : r.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r)
        return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: c } = {}) {
      const l = this.getStack();
      l && l.promote(this, c), r && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetRotation() {
      const { visualElement: r } = this.options;
      if (!r)
        return;
      let a = !1;
      const { latestValues: c } = r;
      if ((c.rotate || c.rotateX || c.rotateY || c.rotateZ) && (a = !0), !a)
        return;
      const l = {};
      for (let u = 0; u < ei.length; u++) {
        const h = "rotate" + ei[u];
        c[h] && (l[h] = c[h], r.setStaticValue(h, 0));
      }
      r.render();
      for (const u in l)
        r.setStaticValue(u, l[u]);
      r.scheduleRender();
    }
    getProjectionStyles(r = {}) {
      var a, c;
      const l = {};
      if (!this.instance || this.isSVG)
        return l;
      if (this.isVisible)
        l.visibility = "";
      else
        return { visibility: "hidden" };
      const u = this.getTransformTemplate();
      if (this.needsReset)
        return this.needsReset = !1, l.opacity = "", l.pointerEvents = Ee(r.pointerEvents) || "", l.transform = u ? u(this.latestValues, "") : "none", l;
      const h = this.getLead();
      if (!this.projectionDelta || !this.layout || !h.target) {
        const b = {};
        return this.options.layoutId && (b.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, b.pointerEvents = Ee(r.pointerEvents) || ""), this.hasProjected && !At(this.latestValues) && (b.transform = u ? u({}, "") : "none", this.hasProjected = !1), b;
      }
      const d = h.animationValues || h.latestValues;
      this.applyTransformsToTarget(), l.transform = ti(this.projectionDeltaWithTransform, this.treeScale, d), u && (l.transform = u(d, l.transform));
      const { x: p, y: m } = this.projectionDelta;
      l.transformOrigin = `${p.origin * 100}% ${m.origin * 100}% 0`, h.animationValues ? l.opacity = h === this ? (c = (a = d.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && c !== void 0 ? c : 1 : this.preserveOpacity ? this.latestValues.opacity : d.opacityExit : l.opacity = h === this ? d.opacity !== void 0 ? d.opacity : "" : d.opacityExit !== void 0 ? d.opacityExit : 0;
      for (const b in De) {
        if (d[b] === void 0)
          continue;
        const { correct: T, applyTo: w } = De[b], y = l.transform === "none" ? d[b] : T(d[b], h);
        if (w) {
          const x = w.length;
          for (let S = 0; S < x; S++)
            l[w[S]] = y;
        } else
          l[b] = y;
      }
      return this.options.layoutId && (l.pointerEvents = h === this ? Ee(r.pointerEvents) || "" : "none"), l;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => {
        var a;
        return (a = r.currentAnimation) === null || a === void 0 ? void 0 : a.stop();
      }), this.root.nodes.forEach(si), this.root.sharedNodes.clear();
    }
  };
}
function Yl(t) {
  t.updateLayout();
}
function Kl(t) {
  var e;
  const n = ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) || t.snapshot;
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: i } = t.layout, { animationType: o } = t.options, r = n.source !== t.layout.source;
    o === "size" ? rt((h) => {
      const d = r ? n.measuredBox[h] : n.layoutBox[h], p = J(d);
      d.min = s[h].min, d.max = d.min + p;
    }) : Mr(o, n.layoutBox, s) && rt((h) => {
      const d = r ? n.measuredBox[h] : n.layoutBox[h], p = J(s[h]);
      d.max = d.min + p, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[h].max = t.relativeTarget[h].min + p);
    });
    const a = Ut();
    re(a, s, n.layoutBox);
    const c = Ut();
    r ? re(c, t.applyTransform(i, !0), n.measuredBox) : re(c, s, n.layoutBox);
    const l = !Er(a);
    let u = !1;
    if (!t.resumeFrom) {
      const h = t.getClosestProjectingParent();
      if (h && !h.resumeFrom) {
        const { snapshot: d, layout: p } = h;
        if (d && p) {
          const m = W();
          oe(m, n.layoutBox, d.layoutBox);
          const b = W();
          oe(b, s, p.layoutBox), Rr(m, b) || (u = !0), h.options.layoutRoot && (t.relativeTarget = b, t.relativeTargetOrigin = m, t.relativeParent = h);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: s,
      snapshot: n,
      delta: c,
      layoutDelta: a,
      hasLayoutChanged: l,
      hasRelativeTargetChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: s } = t.options;
    s && s();
  }
  t.options.transition = void 0;
}
function ql(t) {
  Et.totalNodes++, t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Xl(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Zl(t) {
  t.clearSnapshot();
}
function si(t) {
  t.clearMeasurements();
}
function Jl(t) {
  t.isLayoutDirty = !1;
}
function Ql(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function ii(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function tu(t) {
  t.resolveTargetDelta();
}
function eu(t) {
  t.calcProjection();
}
function nu(t) {
  t.resetRotation();
}
function su(t) {
  t.removeLeadSnapshot();
}
function ri(t, e, n) {
  t.translate = I(e.translate, 0, n), t.scale = I(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function oi(t, e, n, s) {
  t.min = I(e.min, n.min, s), t.max = I(e.max, n.max, s);
}
function iu(t, e, n, s) {
  oi(t.x, e.x, n.x, s), oi(t.y, e.y, n.y, s);
}
function ru(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const ou = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ai = (t) => typeof navigator < "u" && navigator.userAgent.toLowerCase().includes(t), ci = ai("applewebkit/") && !ai("chrome/") ? Math.round : N;
function li(t) {
  t.min = ci(t.min), t.max = ci(t.max);
}
function au(t) {
  li(t.x), li(t.y);
}
function Mr(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !xn(Qs(e), Qs(n), 0.2);
}
const cu = Dr({
  attachResizeListener: (t, e) => dt(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), fn = {
  current: void 0
}, jr = Dr({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!fn.current) {
      const t = new cu({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), fn.current = t;
    }
    return fn.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), lu = {
  pan: {
    Feature: Vl
  },
  drag: {
    Feature: wl,
    ProjectionNode: jr,
    MeasureLayout: wr
  }
}, uu = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function fu(t) {
  const e = uu.exec(t);
  if (!e)
    return [,];
  const [, n, s] = e;
  return [n, s];
}
const hu = 4;
function Cn(t, e, n = 1) {
  at(n <= hu, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`);
  const [s, i] = fu(t);
  if (!s)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(s);
  if (o) {
    const r = o.trim();
    return mr(r) ? parseFloat(r) : r;
  } else
    return dn(i) ? Cn(i, e, n + 1) : i;
}
function du(t, { ...e }, n) {
  const s = t.current;
  if (!(s instanceof Element))
    return { target: e, transitionEnd: n };
  n && (n = { ...n }), t.values.forEach((i) => {
    const o = i.get();
    if (!dn(o))
      return;
    const r = Cn(o, s);
    r && i.set(r);
  });
  for (const i in e) {
    const o = e[i];
    if (!dn(o))
      continue;
    const r = Cn(o, s);
    r && (e[i] = r, n || (n = {}), n[i] === void 0 && (n[i] = o));
  }
  return { target: e, transitionEnd: n };
}
const pu = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y",
  "translateX",
  "translateY"
]), Lr = (t) => pu.has(t), mu = (t) => Object.keys(t).some(Lr), Ae = (t) => t === jt || t === P, ui = (t, e) => parseFloat(t.split(", ")[e]), fi = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const i = s.match(/^matrix3d\((.+)\)$/);
  if (i)
    return ui(i[1], e);
  {
    const o = s.match(/^matrix\((.+)\)$/);
    return o ? ui(o[1], t) : 0;
  }
}, gu = /* @__PURE__ */ new Set(["x", "y", "z"]), yu = fe.filter((t) => !gu.has(t));
function vu(t) {
  const e = [];
  return yu.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e.length && t.render(), e;
}
const Ht = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: fi(4, 13),
  y: fi(5, 14)
};
Ht.translateX = Ht.x;
Ht.translateY = Ht.y;
const bu = (t, e, n) => {
  const s = e.measureViewportBox(), i = e.current, o = getComputedStyle(i), { display: r } = o, a = {};
  r === "none" && e.setStaticValue("display", t.display || "block"), n.forEach((l) => {
    a[l] = Ht[l](s, o);
  }), e.render();
  const c = e.measureViewportBox();
  return n.forEach((l) => {
    const u = e.getValue(l);
    u && u.jump(a[l]), t[l] = Ht[l](c, o);
  }), t;
}, xu = (t, e, n = {}, s = {}) => {
  e = { ...e }, s = { ...s };
  const i = Object.keys(e).filter(Lr);
  let o = [], r = !1;
  const a = [];
  if (i.forEach((c) => {
    const l = t.getValue(c);
    if (!t.hasValue(c))
      return;
    let u = n[c], h = te(u);
    const d = e[c];
    let p;
    if (je(d)) {
      const m = d.length, b = d[0] === null ? 1 : 0;
      u = d[b], h = te(u);
      for (let T = b; T < m && d[T] !== null; T++)
        p ? at(te(d[T]) === p, "All keyframes must be of the same type") : (p = te(d[T]), at(p === h || Ae(h) && Ae(p), "Keyframes must be of the same dimension as the current value"));
    } else
      p = te(d);
    if (h !== p)
      if (Ae(h) && Ae(p)) {
        const m = l.get();
        typeof m == "string" && l.set(parseFloat(m)), typeof d == "string" ? e[c] = parseFloat(d) : Array.isArray(d) && p === P && (e[c] = d.map(parseFloat));
      } else
        h != null && h.transform && (p != null && p.transform) && (u === 0 || d === 0) ? u === 0 ? l.set(p.transform(u)) : e[c] = h.transform(d) : (r || (o = vu(t), r = !0), a.push(c), s[c] = s[c] !== void 0 ? s[c] : e[c], l.jump(d));
  }), a.length) {
    const c = a.indexOf("height") >= 0 ? window.pageYOffset : null, l = bu(e, t, a);
    return o.length && o.forEach(([u, h]) => {
      t.getValue(u).set(h);
    }), t.render(), $e && c !== null && window.scrollTo({ top: c }), { target: l, transitionEnd: s };
  } else
    return { target: e, transitionEnd: s };
};
function Pu(t, e, n, s) {
  return mu(e) ? xu(t, e, n, s) : { target: e, transitionEnd: s };
}
const Tu = (t, e, n, s) => {
  const i = du(t, e, s);
  return e = i.target, s = i.transitionEnd, Pu(t, e, n, s);
}, wn = { current: null }, Or = { current: !1 };
function Su() {
  if (Or.current = !0, !!$e)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => wn.current = t.matches;
      t.addListener(e), e();
    } else
      wn.current = !1;
}
function Cu(t, e, n) {
  const { willChange: s } = e;
  for (const i in e) {
    const o = e[i], r = n[i];
    if (Z(o))
      t.addValue(i, o), Fe(s) && s.add(i), process.env.NODE_ENV === "development" && Gn(o.version === "10.16.0", `Attempting to mix Framer Motion versions ${o.version} with 10.16.0 may not work as expected.`);
    else if (Z(r))
      t.addValue(i, Wt(o, { owner: t })), Fe(s) && s.remove(i);
    else if (r !== o)
      if (t.hasValue(i)) {
        const a = t.getValue(i);
        !a.hasAnimated && a.set(o);
      } else {
        const a = t.getStaticValue(i);
        t.addValue(i, Wt(a !== void 0 ? a : o, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const hi = /* @__PURE__ */ new WeakMap(), kr = Object.keys(le), wu = kr.length, di = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
], Vu = En.length;
class Au {
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, visualState: o }, r = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.scheduleRender = () => _.render(this.render, !1, !0);
    const { latestValues: a, renderState: c } = o;
    this.latestValues = a, this.baseTarget = { ...a }, this.initialValues = n.initial ? { ...a } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.options = r, this.isControllingVariants = He(n), this.isVariantNode = bi(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: l, ...u } = this.scrapeMotionValuesFromProps(n, {});
    for (const h in u) {
      const d = u[h];
      a[h] !== void 0 && Z(d) && (d.set(a[h], !1), Fe(l) && l.add(h));
    }
  }
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n) {
    return {};
  }
  mount(e) {
    this.current = e, hi.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), Or.current || Su(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : wn.current, process.env.NODE_ENV !== "production" && Gn(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    hi.delete(this.current), this.projection && this.projection.unmount(), gt(this.notifyUpdate), gt(this.render), this.valueSubscriptions.forEach((e) => e()), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features)
      this.features[e].unmount();
    this.current = null;
  }
  bindToMotionValue(e, n) {
    const s = Mt.has(e), i = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && _.update(this.notifyUpdate, !1, !0), s && this.projection && (this.projection.isTransformDirty = !0);
    }), o = n.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(e, () => {
      i(), o();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  loadFeatures({ children: e, ...n }, s, i, o) {
    let r, a;
    if (process.env.NODE_ENV !== "production" && i && s) {
      const c = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
      n.ignoreStrict ? pe(!1, c) : at(!1, c);
    }
    for (let c = 0; c < wu; c++) {
      const l = kr[c], { isEnabled: u, Feature: h, ProjectionNode: d, MeasureLayout: p } = le[l];
      d && (r = d), u(n) && (!this.features[l] && h && (this.features[l] = new h(this)), p && (a = p));
    }
    if (!this.projection && r) {
      this.projection = new r(this.latestValues, this.parent && this.parent.projection);
      const { layoutId: c, layout: l, drag: u, dragConstraints: h, layoutScroll: d, layoutRoot: p } = n;
      this.projection.setOptions({
        layoutId: c,
        layout: l,
        alwaysMeasureLayout: !!u || h && _t(h),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof l == "string" ? l : "both",
        initialPromotionConfig: o,
        layoutScroll: d,
        layoutRoot: p
      });
    }
    return a;
  }
  updateFeatures() {
    for (const e in this.features) {
      const n = this.features[e];
      n.isMounted ? n.update() : (n.mount(), n.isMounted = !0);
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : W();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Make a target animatable by Popmotion. For instance, if we're
   * trying to animate width from 100px to 100vw we need to measure 100vw
   * in pixels to determine what we really need to animate to. This is also
   * pluggable to support Framer's custom value types like Color,
   * and CSS variables.
   */
  makeTargetAnimatable(e, n = !0) {
    return this.makeTargetAnimatableFromInstance(e, this.props, n);
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < di.length; s++) {
      const i = di[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const o = e["on" + i];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Cu(this, this.scrapeMotionValuesFromProps(e, this.prevProps), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(e = !1) {
    if (e)
      return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const s = this.parent ? this.parent.getVariantContext() || {} : {};
      return this.props.initial !== void 0 && (s.initial = this.props.initial), s;
    }
    const n = {};
    for (let s = 0; s < Vu; s++) {
      const i = En[s], o = this.props[i];
      (ce(o) || o === !1) && (n[i] = o);
    }
    return n;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    n !== this.values.get(e) && (this.removeValue(e), this.bindToMotionValue(e, n)), this.values.set(e, n), this.latestValues[e] = n.get();
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = Wt(n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e) {
    var n;
    return this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (n = this.getBaseTargetFromProps(this.props, e)) !== null && n !== void 0 ? n : this.readValueFromInstance(this.current, e, this.options);
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var n;
    const { initial: s } = this.props, i = typeof s == "string" || typeof s == "object" ? (n = Fn(this.props, s)) === null || n === void 0 ? void 0 : n[e] : void 0;
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, e);
    return o !== void 0 && !Z(o) ? o : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Hn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class Fr extends Au {
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  makeTargetAnimatableFromInstance({ transition: e, transitionEnd: n, ...s }, { transformValues: i }, o) {
    let r = Gc(s, e || {}, this);
    if (i && (n && (n = i(n)), s && (s = i(s)), r && (r = i(r))), o) {
      Wc(this, s, r);
      const a = Tu(this, s, r, n);
      n = a.transitionEnd, s = a.target;
    }
    return {
      transition: e,
      transitionEnd: n,
      ...s
    };
  }
}
function Eu(t) {
  return window.getComputedStyle(t);
}
class Ru extends Fr {
  readValueFromInstance(e, n) {
    if (Mt.has(n)) {
      const s = Nn(n);
      return s && s.default || 0;
    } else {
      const s = Eu(e), i = (Ci(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Cr(e, n);
  }
  build(e, n, s, i) {
    Dn(e, n, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n) {
    return kn(e, n);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    Z(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
  renderInstance(e, n, s, i) {
    Di(e, n, s, i);
  }
}
class Du extends Fr {
  constructor() {
    super(...arguments), this.isSVGTag = !1;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Mt.has(n)) {
      const s = Nn(n);
      return s && s.default || 0;
    }
    return n = Mi.has(n) ? n : On(n), e.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return W();
  }
  scrapeMotionValuesFromProps(e, n) {
    return Li(e, n);
  }
  build(e, n, s, i) {
    jn(e, n, s, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(e, n, s, i) {
    ji(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = Ln(e.tagName), super.mount(e);
  }
}
const Mu = (t, e) => Rn(t) ? new Du(e, { enableHardwareAcceleration: !1 }) : new Ru(e, { enableHardwareAcceleration: !0 }), ju = {
  layout: {
    ProjectionNode: jr,
    MeasureLayout: wr
  }
}, Lu = {
  ...rl,
  ...Aa,
  ...lu,
  ...ju
}, Ou = /* @__PURE__ */ ko((t, e) => fa(t, e, Lu, Mu)), ku = /* @__PURE__ */ V.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ V.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ V.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ V.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Fu = /* @__PURE__ */ V.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ V.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Bu(t) {
  const e = _e(null);
  return ae(() => {
    var n, s;
    t({
      // @ts-ignore
      height: (n = e.current) == null ? void 0 : n.offsetHeight,
      // @ts-ignore
      top: (s = e.current) == null ? void 0 : s.offsetTop
    });
  }), e;
}
function Iu(t) {
  const [e, n] = Dt(!1), s = Bu((i) => t.updatePosition(t.index, i));
  return /* @__PURE__ */ V.jsx("li", { children: /* @__PURE__ */ V.jsxs(
    Ou.div,
    {
      style: {
        zIndex: e ? 2 : 1
      },
      dragConstraints: {
        top: 0,
        bottom: 0
      },
      dragElastic: 1,
      layout: !0,
      ref: s,
      onDragStart: () => n(!0),
      onDragEnd: () => {
        n(!1), t.onDragComplete();
      },
      animate: {
        scale: e ? 1.05 : 1
      },
      drag: "y",
      children: [
        Fu,
        /* @__PURE__ */ V.jsx("span", { children: t.title }),
        /* @__PURE__ */ V.jsx("button", { className: "closeIcon", onClick: t.onDelete, children: ku })
      ]
    }
  ) });
}
function _u(t, e, n) {
  const s = e < 0 ? t.length + e : e;
  if (s >= 0 && s < t.length) {
    const i = n < 0 ? t.length + n : n, [o] = t.splice(e, 1);
    t.splice(i, 0, o);
  }
}
function Nu(t, e, n) {
  return t = [...t], _u(t, e, n), t;
}
function Uu(t) {
  const [e, n] = Dt(t), s = _e([]).current;
  return [e, (r, a) => s[r] = a, (r, a) => {
    const c = $u(r, a, s);
    c !== r && n(Nu(e, r, c));
  }];
}
const pi = 5, $u = (t, e, n) => {
  let s = t;
  const { top: i, height: o } = n[t], r = i + o;
  if (e > 0) {
    const a = n[t + 1];
    if (a === void 0)
      return t;
    const c = os(r, a.top + a.height / 2) + pi;
    e > c && (s = t + 1);
  } else if (e < 0) {
    const a = n[t - 1];
    if (a === void 0)
      return t;
    const c = a.top + a.height, l = os(i, c - a.height / 2) + pi;
    e < -l && (s = t - 1);
  }
  return xo(0, n.length, s);
};
function Wu(t) {
  const [e, n] = Dt(!1), [s, i] = Dt(t.options), [o, r, a] = Uu(s), c = () => {
    t.onDragComplete(o);
  }, l = [];
  o.map(
    (h, d) => l.push(
      /* @__PURE__ */ V.jsx(
        Iu,
        {
          index: d,
          title: h,
          updateOrder: a,
          updatePosition: r,
          onDragComplete: c,
          onDelete: () => {
            i(o.splice(d, 1)), c();
          }
        },
        h
      )
    )
  );
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ V.jsxs("div", { className: u, onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
    /* @__PURE__ */ V.jsx(gi, { title: t.title }),
    /* @__PURE__ */ V.jsx("ul", { style: { visibility: e ? "visible" : "hidden" }, children: l })
  ] });
}
function Hu(t) {
  const [e, n] = Dt(!1), s = [];
  t.options.map((o, r) => {
    t.onSelect !== void 0 && (o.onSelect = t.onSelect), s.push(/* @__PURE__ */ V.jsx(Gu, { option: o }, r));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ V.jsxs("div", { className: i, onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
    /* @__PURE__ */ V.jsx(gi, { title: t.title }),
    /* @__PURE__ */ V.jsx("ul", { style: { visibility: e ? "visible" : "hidden" }, children: s })
  ] });
}
function Gu(t) {
  const { option: e } = t, [n, s] = Dt("");
  let i = null;
  switch (e.type) {
    case "draggable":
      i = /* @__PURE__ */ V.jsx(
        Wu,
        {
          title: e.title,
          options: e.value,
          onDragComplete: (o) => {
            e.onDragComplete !== void 0 && e.onDragComplete(o);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      i = /* @__PURE__ */ V.jsx(
        Hu,
        {
          title: e.title,
          options: e.value,
          onSelect: e.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      i = /* @__PURE__ */ V.jsx(
        "button",
        {
          onClick: () => {
            e.onSelect !== void 0 && e.onSelect(e.value), e.selectable && (n !== e.title ? s(e.title) : s(""));
          },
          children: e.title
        }
      );
      break;
  }
  return /* @__PURE__ */ V.jsx("li", { className: n === e.title ? "selected" : "", children: i }, Po());
}
function sf(t) {
  let e;
  const n = () => {
    Zt.ui.hide(), t.listen((i) => {
      var r, a, c, l;
      let o;
      switch (i.event) {
        case "setSheet":
          o = (r = t.theatre) == null ? void 0 : r.sheets.get(i.data.sheet), o !== void 0 && (e = o, Zt.setSelection([o]));
          break;
        case "setSheetObject":
          o = (a = t.theatre) == null ? void 0 : a.sheetObjects.get(`${i.data.sheet}_${i.data.key}`), o !== void 0 && Zt.setSelection([o]);
          break;
        case "updateSheetObject":
          o = (c = t.theatre) == null ? void 0 : c.sheetObjectCBs.get(i.data.sheetObject), o !== void 0 && o(i.data.values);
          break;
        case "updateTimeline":
          e = (l = t.theatre) == null ? void 0 : l.sheets.get(i.data.sheet), e !== void 0 && (e.sequence.position = i.data.position);
          break;
      }
    });
  }, s = () => {
    Zt.ui.restore(), Zt.onSelectionChange((a) => {
      a.length < 1 || a.forEach((c) => {
        var d;
        let l = c.address.sheetId, u = "setSheet", h = {};
        switch (c.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", h = {
              sheet: c.address.sheetId
            }, e = (d = t.theatre) == null ? void 0 : d.sheets.get(c.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", l += `_${c.address.objectKey}`, h = {
              id: l,
              sheet: c.address.sheetId,
              key: c.address.objectKey
            };
            break;
        }
        t.send({ event: u, data: h });
      });
    });
    let i = 0;
    const o = () => {
      if (e !== void 0 && i !== e.sequence.position) {
        i = e.sequence.position;
        const a = e;
        t.send({
          event: "updateTimeline",
          data: {
            position: i,
            sheet: a.address.sheetId
          }
        });
      }
    }, r = () => {
      o(), requestAnimationFrame(r);
    };
    o(), r();
  };
  t.editor ? s() : n();
}
function zu(t) {
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
  const e = t.type;
  return e.search("Helper") > -1 ? "icon_utils" : e.search("Camera") > -1 ? "camera" : e.search("Light") > -1 ? "light" : "obj3D";
}
function Br(t) {
  const [e, n] = Dt(!1);
  let s = null, i = !1;
  if (t.child.children.length > 0) {
    i = !0;
    const o = [];
    t.child.children.map((r) => {
      o.push(/* @__PURE__ */ V.jsx(Br, { child: r }, Math.random()));
    }), s = /* @__PURE__ */ V.jsx("div", { className: `container ${e ? "" : "closed"}`, children: o });
  }
  return /* @__PURE__ */ V.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ V.jsxs("div", { className: "child", children: [
      i ? /* @__PURE__ */ V.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: e ? "-14px" : "2px"
          },
          onClick: () => {
            n(!e);
          }
        }
      ) : null,
      /* @__PURE__ */ V.jsx(
        "button",
        {
          className: "name",
          style: {
            left: i ? "20px" : "5px"
          },
          onClick: () => {
            Bt.dispatchEvent({ type: It.INSPECT_ITEM, value: t.child });
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ V.jsx("div", { className: `icon ${zu(t.child)}` })
    ] }),
    s
  ] }, Math.random());
}
function Yu(t) {
  const e = [];
  return t.child.children.map((n) => {
    e.push(/* @__PURE__ */ V.jsx(Br, { child: n }, Math.random()));
  }), /* @__PURE__ */ V.jsx("div", { className: "scene", children: e });
}
class Ku extends vo {
  constructor(n) {
    super(n);
    // Private
    H(this, "onUpdate", () => {
    });
    H(this, "toggleOpen", () => {
      this.setState(() => ({
        open: !this.componentState.open
      }));
    });
    H(this, "onRefresh", () => {
      Bt.dispatchEvent({ type: It.INSPECT_ITEM, value: this.componentState.scene });
    });
    H(this, "onSetScene", (n) => {
      console.log("SceneHierarchy::onSetScene", n), this.setState(() => ({
        scene: n.value
      }));
    });
    this.state = {
      open: !1,
      scene: null
    }, Bt.addEventListener(It.REFRESH_SCENE, this.onUpdate), Bt.addEventListener(It.SET_SCENE, this.onSetScene);
  }
  componentWillUnmount() {
    Bt.removeEventListener(It.REFRESH_SCENE, this.onUpdate), Bt.removeEventListener(It.SET_SCENE, this.onSetScene);
  }
  render() {
    const n = this.componentState.scene !== null ? `Hierarchy: ${this.componentState.scene.name}` : "Hierarchy";
    return /* @__PURE__ */ V.jsxs("div", { id: "SceneHierarchy", children: [
      /* @__PURE__ */ V.jsxs("div", { className: "header", children: [
        /* @__PURE__ */ V.jsx(
          "button",
          {
            className: "status",
            style: {
              backgroundPositionX: this.componentState.open ? "-14px" : "2px"
            },
            onClick: this.toggleOpen
          }
        ),
        /* @__PURE__ */ V.jsx("span", { children: n }),
        /* @__PURE__ */ V.jsx("button", { className: "refresh hideText", onClick: this.onRefresh, children: "Refresh" })
      ] }),
      this.componentState.scene !== null && this.componentState.open ? /* @__PURE__ */ V.jsx(Yu, { child: this.componentState.scene }) : null
    ] });
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function rf(t) {
  return /* @__PURE__ */ V.jsxs("div", { className: "editor", children: [
    /* @__PURE__ */ V.jsx("div", { className: "navBar", children: t.children }),
    /* @__PURE__ */ V.jsx(Ku, {})
  ] });
}
export {
  ef as Application,
  Wu as Draggable,
  Iu as DraggableItem,
  Hu as Dropdown,
  Gu as DropdownItem,
  rf as Editor,
  gi as NavButton,
  sf as RemoteController,
  Ku as SceneHierarchy,
  It as ToolEvents,
  Bt as debugDispatcher
};
