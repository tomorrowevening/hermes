var Pn = Object.defineProperty;
var _n = (t, n, a) => n in t ? Pn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var Z = (t, n, a) => (_n(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as jn, EventDispatcher as on, Texture as sn, CubeTexture as kn, RepeatWrapping as zt, ShaderMaterial as cn, GLSL3 as An, DoubleSide as Dn, Color as Ft, Mesh as In, PlaneGeometry as Nn, Matrix4 as Ln, Vector3 as Y, Euler as Fn, Ray as Un, Plane as Bn, MathUtils as $n, MOUSE as We, TOUCH as He, Quaternion as Yt, Spherical as Wt, Vector2 as de, PerspectiveCamera as Dt, MeshDepthMaterial as Gn, MeshNormalMaterial as Vn, MeshBasicMaterial as zn, OrthographicCamera as ln, Scene as un, Group as Yn, AxesHelper as dn, WebGLRenderer as Wn, Raycaster as Hn, CameraHelper as Kn } from "three";
import { getProject as Xn } from "@theatre/core";
import rt from "@theatre/studio";
import { Pane as qn } from "tweakpane";
import * as Zn from "@tweakpane/plugin-essentials";
import fn, { useState as oe, useRef as Ce, useEffect as Fe, Component as Jn, forwardRef as Qn } from "react";
import { Reorder as hn } from "framer-motion";
function ri(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function oi(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function ea() {
  return Math.round(Math.random() * 1e6).toString();
}
function ta(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function na(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), r = (d) => {
    const p = d.toString(16);
    return p.length === 1 ? "0" + p : p;
  }, s = r(n), u = r(a), l = r(e);
  return "#" + s + u + l;
}
function _t(t, n = 1) {
  return Number(t.toFixed(n));
}
let It = 0;
const aa = () => {
  It = 0;
}, pn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${It}`, It++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    pn(a);
  });
}, si = (t) => {
  t == null || t.dispose();
}, ia = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, mn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof jn ? (a.pause(), a.parent && a.parent.remove(a)) : mn(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), ia(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class ci {
  constructor(n, a, e = "editor") {
    Z(this, "channel");
    Z(this, "components", /* @__PURE__ */ new Map());
    // Protected
    Z(this, "_mode", "app");
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
const _ = new on(), j = {
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
class Ct {
  constructor(n) {
    Z(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class li extends Ct {
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
function ra(t, n) {
  switch (n.event) {
    case "selectComponent":
      _.dispatchEvent({ type: j.SELECT_DROPDOWN, value: n.data });
      break;
    case "draggableListUpdate":
      _.dispatchEvent({ type: j.DRAG_UPDATE, value: n.data });
      break;
  }
}
const gn = () => {
};
class vn extends Ct {
  constructor(a, e, r) {
    super(a);
    Z(this, "project");
    Z(this, "sheets");
    Z(this, "sheetObjects");
    Z(this, "sheetObjectCBs");
    Z(this, "sheetObjectUnsubscribe");
    this.project = Xn(e, r), this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(a) {
    var r;
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let e = this.sheets.get(a);
    return e !== void 0 || (e = (r = this.project) == null ? void 0 : r.sheet(a), this.sheets.set(a, e)), e;
  }
  sheetObject(a, e, r, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const u = this.sheets.get(a);
    if (u === void 0)
      return;
    const l = `${a}_${e}`;
    let d = this.sheetObjects.get(l);
    if (d !== void 0)
      return d = u.object(e, { ...r, ...d.value }, { reconfigure: !0 }), d;
    d = u.object(e, r), this.sheetObjects.set(l, d), this.sheetObjectCBs.set(l, s !== void 0 ? s : gn);
    const p = d.onValuesChange((v) => {
      if (this.app.editor) {
        for (const E in v) {
          const w = v[E];
          typeof w == "object" && ta(w) && (v[E] = {
            r: w.r,
            g: w.g,
            b: w.b,
            a: w.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheetObject: l,
            values: v
          }
        });
      } else {
        const E = this.sheetObjectCBs.get(l);
        E !== void 0 && E(v);
      }
    });
    return this.sheetObjectUnsubscribe.set(l, p), d;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = `${a.address.sheetId}_${a.address.objectKey}`, r = this.sheetObjectUnsubscribe.get(e);
    r !== void 0 && r();
  }
}
let Me;
function oa(t, n) {
  t.components.forEach((a) => {
    if (a instanceof vn) {
      let e;
      const r = a;
      switch (n.event) {
        case "setSheet":
          e = r.sheets.get(n.data.sheet), e !== void 0 && (Me = e, rt.setSelection([e]));
          break;
        case "setSheetObject":
          e = r.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), e !== void 0 && rt.setSelection([e]);
          break;
        case "updateSheetObject":
          e = r.sheetObjectCBs.get(n.data.sheetObject), e !== void 0 && e(n.data.values);
          break;
        case "updateTimeline":
          e = r.sheets.get(n.data.sheet), Me !== void 0 && (Me.sequence.position = n.data.position);
          break;
      }
    }
  });
}
function sa(t) {
  if (t.editor) {
    let n;
    t.components.forEach((s) => {
      s instanceof vn && (n = s);
    }), rt.ui.restore(), rt.onSelectionChange((s) => {
      s.length < 1 || s.forEach((u) => {
        let l = u.address.sheetId, d = "setSheet", p = {};
        switch (u.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", p = {
              sheet: u.address.sheetId
            }, Me = n.sheets.get(u.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", l += `_${u.address.objectKey}`, p = {
              id: l,
              sheet: u.address.sheetId,
              key: u.address.objectKey
            };
            break;
        }
        t.send({ event: d, target: "app", data: p });
      });
    });
    let a = 0;
    const e = () => {
      if (Me !== void 0 && a !== Me.sequence.position) {
        a = Me.sequence.position;
        const s = Me;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: a,
            sheet: s.address.sheetId
          }
        });
      }
    }, r = () => {
      e(), requestAnimationFrame(r);
    };
    e(), r();
  } else
    rt.ui.hide();
}
function ca(t) {
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
function bn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(bn(a));
  }), n;
}
function la(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function ua(t) {
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
function Ht(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || ua(a))
      continue;
    const e = typeof t[a], r = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = r;
        break;
      case "object":
        if (r !== null)
          if (n[a] = r, r.isTexture)
            if (r instanceof sn) {
              const s = r.source.toJSON();
              n[a] = { src: s.url };
            } else
              r instanceof kn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = la(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function jt(t) {
  t.updateMatrix();
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    visible: t.visible,
    matrix: t.matrix.elements,
    animations: [],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0
  };
  t.animations.forEach((e) => {
    n.animations.push({
      name: e.name,
      duration: e.duration,
      blendMode: e.blendMode
    });
  });
  const a = t.type.toLowerCase();
  if (a.search("mesh") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((s) => {
        r.push(Ht(s));
      }), n.material = r;
    } else
      n.material = Ht(e.material);
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
function Q(t, n, a) {
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
function Nt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const r = new sn(e);
      r.wrapS = zt, r.wrapT = zt, r.needsUpdate = !0, n(r);
    }, e.onerror = a, e.src = t;
  });
}
class ui extends Ct {
  constructor() {
    super(...arguments);
    Z(this, "scene");
  }
  getObject(a) {
    this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = jt(a);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(a, e, r) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r
      }
    });
  }
  updateObject(a, e, r) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r
      }
    });
  }
  createTexture(a, e, r) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r
      }
    });
  }
  setScene(a) {
    if (a === void 0)
      return;
    this.scene = a, aa(), pn(this.scene);
    const e = bn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(a) {
    const e = jt(a);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(a) {
    const e = jt(a);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
function da(t, n) {
  switch (n.event) {
    case "getObject":
      _.dispatchEvent({ type: j.GET_OBJECT, value: n.data });
      break;
    case "updateObject":
      _.dispatchEvent({ type: j.UPDATE_OBJECT, value: n.data });
      break;
    case "createTexture":
      _.dispatchEvent({ type: j.CREATE_TEXTURE, value: n.data });
      break;
    case "requestMethod":
      _.dispatchEvent({ type: j.REQUEST_METHOD, value: n.data });
      break;
  }
}
function fa(t, n) {
  switch (n.event) {
    case "setObject":
      _.dispatchEvent({ type: j.SET_OBJECT, value: n.data });
      break;
    case "setScene":
      _.dispatchEvent({ type: j.SET_SCENE, value: n.data });
      break;
    case "addCamera":
      _.dispatchEvent({ type: j.ADD_CAMERA, value: n.data });
      break;
    case "removeCamera":
      _.dispatchEvent({ type: j.REMOVE_CAMERA, value: n.data });
      break;
  }
}
class ha extends Ct {
  constructor(a) {
    super(a);
    Z(this, "bindCBs");
    Z(this, "buttonCBs");
    Z(this, "pane");
    Z(this, "appCallbacks", 0);
    Z(this, "editorCallbacks", 0);
    Z(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new qn({ title: "GUI" }), this.pane.registerPlugin(Zn);
  }
  dispose() {
    var a;
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && ((a = this.pane) == null || a.dispose(), this.pane = void 0);
  }
  addFolder(a, e = void 0, r = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addFolder({
        title: a,
        ...e
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: a,
        params: e,
        parent: r
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(a, e, r, s = void 0) {
    const u = this.bindID, l = r.onChange !== void 0 ? r.onChange : gn;
    this.bindCBs.set(u, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(a, e, r).on("change", (p) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: u,
          value: p.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: u,
        name: e,
        params: r,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(a, e) {
    const r = this.bindCBs.get(a);
    r !== void 0 ? r(e) : console.warn(`No callback for: ${a}`, e);
  }
  // Buttons
  button(a, e, r = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, e), this.app.editor ? (this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addButton({ title: a }).on("click", () => {
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
        parent: r
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
function pa(t, n) {
  t.components.forEach((a) => {
    if (a instanceof ha) {
      const e = a;
      switch (n.event) {
        case "addFolder":
          e.addFolder(n.data.name, n.data.params, n.data.parent);
          break;
        case "bindObject":
          e.bind(n.data.name, n.data.params, n.data.parent);
          break;
        case "updateBind":
          e.triggerBind(n.data.id, n.data.value);
          break;
        case "addButton":
          e.button(n.data.name, n.data.callback, n.data.parent);
          break;
        case "clickButton":
          e.triggerButton(n.data.id);
          break;
      }
      return;
    }
  });
}
var Lt = { exports: {} }, nt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kt;
function ma() {
  if (Kt)
    return nt;
  Kt = 1;
  var t = fn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(l, d, p) {
    var v, E = {}, w = null, R = null;
    p !== void 0 && (w = "" + p), d.key !== void 0 && (w = "" + d.key), d.ref !== void 0 && (R = d.ref);
    for (v in d)
      e.call(d, v) && !s.hasOwnProperty(v) && (E[v] = d[v]);
    if (l && l.defaultProps)
      for (v in d = l.defaultProps, d)
        E[v] === void 0 && (E[v] = d[v]);
    return { $$typeof: n, type: l, key: w, ref: R, props: E, _owner: r.current };
  }
  return nt.Fragment = a, nt.jsx = u, nt.jsxs = u, nt;
}
var at = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xt;
function ga() {
  return Xt || (Xt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = fn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), R = Symbol.for("react.offscreen"), T = Symbol.iterator, G = "@@iterator";
    function se(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = T && i[T] || i[G];
      return typeof h == "function" ? h : null;
    }
    var H = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(i) {
      {
        for (var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), x = 1; x < h; x++)
          g[x - 1] = arguments[x];
        K("error", i, g);
      }
    }
    function K(i, h, g) {
      {
        var x = H.ReactDebugCurrentFrame, k = x.getStackAddendum();
        k !== "" && (h += "%s", g = g.concat([k]));
        var L = g.map(function(P) {
          return String(P);
        });
        L.unshift("Warning: " + h), Function.prototype.apply.call(console[i], console, L);
      }
    }
    var fe = !1, le = !1, ee = !1, f = !1, m = !1, b;
    b = Symbol.for("react.module.reference");
    function S(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || m || i === r || i === p || i === v || f || i === R || fe || le || ee || typeof i == "object" && i !== null && (i.$$typeof === w || i.$$typeof === E || i.$$typeof === u || i.$$typeof === l || i.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === b || i.getModuleId !== void 0));
    }
    function B(i, h, g) {
      var x = i.displayName;
      if (x)
        return x;
      var k = h.displayName || h.name || "";
      return k !== "" ? g + "(" + k + ")" : g;
    }
    function $(i) {
      return i.displayName || "Context";
    }
    function F(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case s:
          return "Profiler";
        case r:
          return "StrictMode";
        case p:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case l:
            var h = i;
            return $(h) + ".Consumer";
          case u:
            var g = i;
            return $(g._context) + ".Provider";
          case d:
            return B(i, i.render, "ForwardRef");
          case E:
            var x = i.displayName || null;
            return x !== null ? x : F(i.type) || "Memo";
          case w: {
            var k = i, L = k._payload, P = k._init;
            try {
              return F(P(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, U = 0, J, M, I, X, me, Re, Xe;
    function ct() {
    }
    ct.__reactDisabledLog = !0;
    function Ot() {
      {
        if (U === 0) {
          J = console.log, M = console.info, I = console.warn, X = console.error, me = console.group, Re = console.groupCollapsed, Xe = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: ct,
            writable: !0
          };
          Object.defineProperties(console, {
            info: i,
            log: i,
            warn: i,
            error: i,
            group: i,
            groupCollapsed: i,
            groupEnd: i
          });
        }
        U++;
      }
    }
    function Tt() {
      {
        if (U--, U === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, i, {
              value: J
            }),
            info: D({}, i, {
              value: M
            }),
            warn: D({}, i, {
              value: I
            }),
            error: D({}, i, {
              value: X
            }),
            group: D({}, i, {
              value: me
            }),
            groupCollapsed: D({}, i, {
              value: Re
            }),
            groupEnd: D({}, i, {
              value: Xe
            })
          });
        }
        U < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var qe = H.ReactCurrentDispatcher, Ze;
    function Pe(i, h, g) {
      {
        if (Ze === void 0)
          try {
            throw Error();
          } catch (k) {
            var x = k.stack.trim().match(/\n( *(at )?)/);
            Ze = x && x[1] || "";
          }
        return `
` + Ze + i;
      }
    }
    var $e = !1, _e;
    {
      var Mt = typeof WeakMap == "function" ? WeakMap : Map;
      _e = new Mt();
    }
    function lt(i, h) {
      if (!i || $e)
        return "";
      {
        var g = _e.get(i);
        if (g !== void 0)
          return g;
      }
      var x;
      $e = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = qe.current, qe.current = null, Ot();
      try {
        if (h) {
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
            } catch (Ee) {
              x = Ee;
            }
            Reflect.construct(i, [], P);
          } else {
            try {
              P.call();
            } catch (Ee) {
              x = Ee;
            }
            i.call(P.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ee) {
            x = Ee;
          }
          i();
        }
      } catch (Ee) {
        if (Ee && x && typeof Ee.stack == "string") {
          for (var O = Ee.stack.split(`
`), ce = x.stack.split(`
`), W = O.length - 1, q = ce.length - 1; W >= 1 && q >= 0 && O[W] !== ce[q]; )
            q--;
          for (; W >= 1 && q >= 0; W--, q--)
            if (O[W] !== ce[q]) {
              if (W !== 1 || q !== 1)
                do
                  if (W--, q--, q < 0 || O[W] !== ce[q]) {
                    var ge = `
` + O[W].replace(" at new ", " at ");
                    return i.displayName && ge.includes("<anonymous>") && (ge = ge.replace("<anonymous>", i.displayName)), typeof i == "function" && _e.set(i, ge), ge;
                  }
                while (W >= 1 && q >= 0);
              break;
            }
        }
      } finally {
        $e = !1, qe.current = L, Tt(), Error.prepareStackTrace = k;
      }
      var Ye = i ? i.displayName || i.name : "", Vt = Ye ? Pe(Ye) : "";
      return typeof i == "function" && _e.set(i, Vt), Vt;
    }
    function ut(i, h, g) {
      return lt(i, !1);
    }
    function dt(i) {
      var h = i.prototype;
      return !!(h && h.isReactComponent);
    }
    function je(i, h, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return lt(i, dt(i));
      if (typeof i == "string")
        return Pe(i);
      switch (i) {
        case p:
          return Pe("Suspense");
        case v:
          return Pe("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case d:
            return ut(i.render);
          case E:
            return je(i.type, h, g);
          case w: {
            var x = i, k = x._payload, L = x._init;
            try {
              return je(L(k), h, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Ge = Object.prototype.hasOwnProperty, ft = {}, Je = H.ReactDebugCurrentFrame;
    function Se(i) {
      if (i) {
        var h = i._owner, g = je(i.type, i._source, h ? h.type : null);
        Je.setExtraStackFrame(g);
      } else
        Je.setExtraStackFrame(null);
    }
    function ke(i, h, g, x, k) {
      {
        var L = Function.call.bind(Ge);
        for (var P in i)
          if (L(i, P)) {
            var O = void 0;
            try {
              if (typeof i[P] != "function") {
                var ce = Error((x || "React class") + ": " + g + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ce.name = "Invariant Violation", ce;
              }
              O = i[P](h, P, x, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (W) {
              O = W;
            }
            O && !(O instanceof Error) && (Se(k), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", g, P, typeof O), Se(null)), O instanceof Error && !(O.message in ft) && (ft[O.message] = !0, Se(k), C("Failed %s type: %s", g, O.message), Se(null));
          }
      }
    }
    var Rt = Array.isArray;
    function Qe(i) {
      return Rt(i);
    }
    function ht(i) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, g = h && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function et(i) {
      try {
        return pt(i), !1;
      } catch {
        return !0;
      }
    }
    function pt(i) {
      return "" + i;
    }
    function mt(i) {
      if (et(i))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ht(i)), pt(i);
    }
    var Oe = H.ReactCurrentOwner, Pt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, gt, tt, ve;
    ve = {};
    function o(i) {
      if (Ge.call(i, "ref")) {
        var h = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function y(i) {
      if (Ge.call(i, "key")) {
        var h = Object.getOwnPropertyDescriptor(i, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function A(i, h) {
      if (typeof i.ref == "string" && Oe.current && h && Oe.current.stateNode !== h) {
        var g = F(Oe.current.type);
        ve[g] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F(Oe.current.type), i.ref), ve[g] = !0);
      }
    }
    function N(i, h) {
      {
        var g = function() {
          gt || (gt = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function te(i, h) {
      {
        var g = function() {
          tt || (tt = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var be = function(i, h, g, x, k, L, P) {
      var O = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: h,
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
        value: x
      }), Object.defineProperty(O, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    };
    function ue(i, h, g, x, k) {
      {
        var L, P = {}, O = null, ce = null;
        g !== void 0 && (mt(g), O = "" + g), y(h) && (mt(h.key), O = "" + h.key), o(h) && (ce = h.ref, A(h, k));
        for (L in h)
          Ge.call(h, L) && !Pt.hasOwnProperty(L) && (P[L] = h[L]);
        if (i && i.defaultProps) {
          var W = i.defaultProps;
          for (L in W)
            P[L] === void 0 && (P[L] = W[L]);
        }
        if (O || ce) {
          var q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          O && N(P, q), ce && te(P, q);
        }
        return be(i, O, ce, k, x, Oe.current, P);
      }
    }
    var vt = H.ReactCurrentOwner, bt = H.ReactDebugCurrentFrame;
    function ye(i) {
      if (i) {
        var h = i._owner, g = je(i.type, i._source, h ? h.type : null);
        bt.setExtraStackFrame(g);
      } else
        bt.setExtraStackFrame(null);
    }
    var he;
    he = !1;
    function pe(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function Ve() {
      {
        if (vt.current) {
          var i = F(vt.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Ae(i) {
      {
        if (i !== void 0) {
          var h = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + h + ":" + g + ".";
        }
        return "";
      }
    }
    var Te = {};
    function ze(i) {
      {
        var h = Ve();
        if (!h) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (h = `

Check the top-level render call using <` + g + ">.");
        }
        return h;
      }
    }
    function Bt(i, h) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = ze(h);
        if (Te[g])
          return;
        Te[g] = !0;
        var x = "";
        i && i._owner && i._owner !== vt.current && (x = " It was passed a child from " + F(i._owner.type) + "."), ye(i), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, x), ye(null);
      }
    }
    function $t(i, h) {
      {
        if (typeof i != "object")
          return;
        if (Qe(i))
          for (var g = 0; g < i.length; g++) {
            var x = i[g];
            pe(x) && Bt(x, h);
          }
        else if (pe(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var k = se(i);
          if (typeof k == "function" && k !== i.entries)
            for (var L = k.call(i), P; !(P = L.next()).done; )
              pe(P.value) && Bt(P.value, h);
        }
      }
    }
    function Cn(i) {
      {
        var h = i.type;
        if (h == null || typeof h == "string")
          return;
        var g;
        if (typeof h == "function")
          g = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === E))
          g = h.propTypes;
        else
          return;
        if (g) {
          var x = F(h);
          ke(g, i.props, "prop", x, i);
        } else if (h.PropTypes !== void 0 && !he) {
          he = !0;
          var k = F(h);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Sn(i) {
      {
        for (var h = Object.keys(i.props), g = 0; g < h.length; g++) {
          var x = h[g];
          if (x !== "children" && x !== "key") {
            ye(i), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), ye(null);
            break;
          }
        }
        i.ref !== null && (ye(i), C("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    function Gt(i, h, g, x, k, L) {
      {
        var P = S(i);
        if (!P) {
          var O = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (O += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Ae(k);
          ce ? O += ce : O += Ve();
          var W;
          i === null ? W = "null" : Qe(i) ? W = "array" : i !== void 0 && i.$$typeof === n ? (W = "<" + (F(i.type) || "Unknown") + " />", O = " Did you accidentally export a JSX literal instead of a component?") : W = typeof i, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", W, O);
        }
        var q = ue(i, h, g, k, L);
        if (q == null)
          return q;
        if (P) {
          var ge = h.children;
          if (ge !== void 0)
            if (x)
              if (Qe(ge)) {
                for (var Ye = 0; Ye < ge.length; Ye++)
                  $t(ge[Ye], i);
                Object.freeze && Object.freeze(ge);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              $t(ge, i);
        }
        return i === e ? Sn(q) : Cn(q), q;
      }
    }
    function On(i, h, g) {
      return Gt(i, h, g, !0);
    }
    function Tn(i, h, g) {
      return Gt(i, h, g, !1);
    }
    var Mn = Tn, Rn = On;
    at.Fragment = e, at.jsx = Mn, at.jsxs = Rn;
  }()), at;
}
process.env.NODE_ENV === "production" ? Lt.exports = ma() : Lt.exports = ga();
var c = Lt.exports;
function yn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ c.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ c.jsx("button", { children: t.title });
}
const va = /* @__PURE__ */ c.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ c.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), ba = /* @__PURE__ */ c.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ c.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function ya(t) {
  return /* @__PURE__ */ c.jsx(hn.Item, { value: t.title, children: /* @__PURE__ */ c.jsxs("div", { children: [
    ba,
    /* @__PURE__ */ c.jsx("span", { children: t.title }),
    /* @__PURE__ */ c.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: va })
  ] }) }, t.title);
}
function Ea(t) {
  const [n, a] = oe(!1), [e, r] = oe(t.options), s = (p) => {
    t.onDragComplete(p), r(p);
  }, u = (p) => {
    const v = [...e];
    v.splice(p, 1), s(v);
  }, l = [];
  e.forEach((p, v) => {
    l.push(/* @__PURE__ */ c.jsx(ya, { index: v, title: p, onDelete: u }, p));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ c.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ c.jsx(yn, { title: t.title }),
    /* @__PURE__ */ c.jsx(hn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: l })
  ] });
}
function wa(t) {
  const [n, a] = oe(!1), e = [];
  t.options.map((s, u) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ c.jsx(xa, { option: s }, u));
  });
  let r = "dropdown";
  return t.subdropdown && (r += " subdropdown"), /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ c.jsx(yn, { title: t.title }),
        /* @__PURE__ */ c.jsx(
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
function xa(t) {
  const { option: n } = t, [a, e] = oe("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ c.jsx(
        Ea,
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
      r = /* @__PURE__ */ c.jsx(
        wa,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      r = /* @__PURE__ */ c.jsx(
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
  return /* @__PURE__ */ c.jsx("li", { className: a === n.title ? "selected" : "", children: r }, ea());
}
function di(t, n) {
  const a = [], e = [];
  n.components && a.push(ra), n.theatre && (a.push(oa), sa(t)), n.three && (a.push(da), e.push(fa)), n.tweakpane && a.push(pa);
  function r(u) {
    switch (a.forEach((l) => l(t, u)), u.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: u.data });
        break;
    }
  }
  function s(u) {
    switch (e.forEach((l) => l(t, u)), u.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: u.data });
        break;
    }
  }
  t.listen((u) => {
    t.editor ? s(u) : r(u);
  });
}
const Ca = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Sa = `out vec4 fragColor;
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
class Oa extends cn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: An,
      side: Dn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: (n == null ? void 0 : n.scale) !== void 0 ? n == null ? void 0 : n.scale : 0.1
        },
        uDivisions: {
          value: (n == null ? void 0 : n.divisions) !== void 0 ? n == null ? void 0 : n.divisions : 10
        },
        uColor: {
          value: (n == null ? void 0 : n.color) !== void 0 ? n == null ? void 0 : n.color : new Ft(16777215)
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
      vertexShader: Ca,
      fragmentShader: Sa,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class Ta extends In {
  constructor() {
    const a = new Oa();
    super(new Nn(2, 2), a);
    Z(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ma = `#include <common>
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
}`, Ra = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Pa extends cn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ma,
      fragmentShader: Ra
    });
  }
}
function Ut(t) {
  const [n, a] = oe(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ c.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          t.onToggle !== void 0 && t.onToggle(r), a(r);
        },
        children: [
          /* @__PURE__ */ c.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ c.jsx("p", { className: "label", children: t.label })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { children: t.children }) })
  ] });
}
function En(t) {
  const [n, a] = oe(!1), e = t.child.children.length > 0, r = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    r.push(/* @__PURE__ */ c.jsx(En, { child: s, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsx("div", { className: `icon ${ca(t.child)}` })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { className: "container", children: r }) })
  ] }, Math.random());
}
function _a(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ c.jsx(En, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const ja = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function ka(t) {
  return "items" in t;
}
function Ue(t) {
  const n = [];
  return t.items.forEach((a) => {
    ka(a) ? n.push(
      /* @__PURE__ */ c.jsx(Ue, { title: a.title, items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ c.jsx(
        it,
        {
          title: a.title,
          prop: a.prop,
          value: a.value,
          type: a.type,
          min: a.min,
          max: a.max,
          step: a.step,
          disabled: a.disabled,
          onChange: (e, r) => {
            a.onChange !== void 0 && a.onChange(e, r);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ c.jsx(Ut, { label: t.title, open: t.expanded === !0, children: n });
}
function Aa(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "side" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 5) === "blend" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function De(t) {
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
function Da(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Ia() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], r = new FileReader();
        r.onload = function(s) {
          n(s.target.result);
        }, r.readAsDataURL(e);
      }
    }), t.click();
  });
}
function qt(t, n, a) {
  const e = [];
  for (const r in t) {
    if (!Aa(r))
      continue;
    const s = typeof t[r], u = t[r];
    if (s === "boolean" || s === "number" || s === "string") {
      const l = {
        title: De(r),
        prop: r,
        type: s,
        value: u,
        min: void 0,
        max: void 0,
        onChange: (d, p) => {
          var E;
          a.updateObject(n.uuid, `material.${d}`, p), s === "boolean" && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const v = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
          v !== void 0 && Q(v, `material.${d}`, p);
        }
      };
      Da(r) && (l.value = Number(u), l.type = "range", l.min = 0, l.max = 1, l.step = 0.01), e.push(l);
    } else if (s === "object")
      if (u.isColor)
        e.push({
          title: De(r),
          prop: r,
          type: "color",
          value: u,
          onChange: (l, d) => {
            var E;
            const p = new Ft(d);
            a.updateObject(n.uuid, `material.${l}`, p);
            const v = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && Q(v, `material.${l}`, p);
          }
        });
      else if (Array.isArray(u)) {
        const l = [];
        for (const d in u)
          l.push({
            title: `${d}`,
            type: `${typeof u[d]}`,
            value: u[d],
            onChange: (p, v) => {
              var w;
              a.updateObject(n.uuid, `material.${r}`, v);
              const E = (w = a.scene) == null ? void 0 : w.getObjectByProperty("uuid", n.uuid);
              E !== void 0 && Q(E, `material.${r}`, v);
            }
          });
        e.push({
          title: De(r),
          items: l
        });
      } else {
        const l = [];
        for (const d in u) {
          const p = u[d];
          switch (typeof p) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: De(r),
                type: "image",
                value: p,
                onChange: (E, w) => {
                  var T;
                  a.createTexture(n.uuid, `material.${r}`, w);
                  const R = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && Nt(w).then((G) => {
                    Q(R, `material.${r}`, G), Q(R, "material.needsUpdate", !0);
                  });
                }
              }) : l.push({
                title: `${De(d)}`,
                prop: `material.${r}.${d}`,
                type: `${typeof t[r][d]}`,
                value: u[d],
                onChange: (E, w) => {
                  var T;
                  a.updateObject(n.uuid, `material.${r}.${d}`, w);
                  const R = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && Q(R, `material.${r}.${d}`, w);
                }
              });
              break;
            case "object":
              p.value !== void 0 && p.value.src !== void 0 ? l.push({
                title: De(d),
                type: "image",
                value: p.value.src,
                onChange: (E, w) => {
                  var T;
                  a.createTexture(n.uuid, `material.${r}.${d}.value`, w);
                  const R = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && Nt(w).then((G) => {
                    Q(R, `material.${r}.${d}.value`, G);
                  });
                }
              }) : l.push({
                title: d,
                type: `${typeof p.value}`,
                value: p.value,
                onChange: (E, w) => {
                  var T;
                  a.updateObject(n.uuid, `material.${r}.${d}.value`, w);
                  const R = (T = a.scene) == null ? void 0 : T.getObjectByProperty("uuid", n.uuid);
                  R !== void 0 && Q(R, `material.${r}.${d}.value`, w);
                }
              });
              break;
          }
        }
        l.length > 0 && e.push({
          title: De(r),
          items: l
        });
      }
    else
      u !== void 0 && console.log("other:", r, s, u);
  }
  return e.sort((r, s) => r.title < s.title ? -1 : r.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Na(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], r = a.length;
    for (let s = 0; s < r; s++)
      e.push(
        /* @__PURE__ */ c.jsx(
          Ue,
          {
            title: `Material ${s}`,
            items: qt(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: e });
  } else
    return /* @__PURE__ */ c.jsx(
      Ue,
      {
        title: "Material",
        items: qt(a, t, n)
      }
    );
}
function it(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = na(t.value));
  const [a, e] = oe(n), r = Ce(null), s = Ce(null), u = Ce(null);
  Fe(() => {
    var K;
    let v = !1, E = -1, w = 0, R = Number(a);
    const T = (fe) => {
      v = !0, w = R, E = fe.clientX;
    }, G = (fe) => {
      if (!v)
        return;
      const le = t.step !== void 0 ? t.step : 1, ee = (fe.clientX - E) * le;
      R = Number((w + ee).toFixed(4)), s.current !== null && (s.current.value = R.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, R);
    }, se = () => {
      v = !1;
    }, H = () => {
      v = !1;
    }, C = t.type === "number";
    return C && ((K = r.current) == null || K.addEventListener("mousedown", T, !1), document.addEventListener("mouseup", se, !1), document.addEventListener("mousemove", G, !1), document.addEventListener("contextmenu", H, !1)), () => {
      var fe;
      C && ((fe = r.current) == null || fe.removeEventListener("mousedown", T), document.removeEventListener("mouseup", se), document.removeEventListener("mousemove", G), document.removeEventListener("contextmenu", H));
    };
  }, [a]);
  const l = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = l || t.type === "image", p = (v) => {
    let E = v.target.value;
    t.type === "boolean" && (E = v.target.checked), e(E), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, E);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ c.jsx("label", { ref: r, children: t.title }, "fieldLabel"),
    t.type === "string" && !l && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: p,
        value: a
      }
    ),
    t.type === "string" && l && /* @__PURE__ */ c.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: !0,
        onChange: p,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: p,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: s,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        onChange: p
      }
    ),
    t.type === "range" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("input", { type: "text", value: a.toString(), onChange: p, className: "min" }),
      /* @__PURE__ */ c.jsx(
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
    t.type === "color" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("input", { type: "text", value: a.toString(), onChange: p, className: "color" }),
      /* @__PURE__ */ c.jsx("input", { type: "color", value: a, onChange: p })
    ] }),
    t.type === "button" && /* @__PURE__ */ c.jsx(
      "button",
      {
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ c.jsx("img", { ref: u, onClick: () => {
      Ia().then((v) => {
        u.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : ja })
  ] });
}
function Zt(t) {
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
function La(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Zt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var l;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const u = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && (Q(u, r, s), u.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: Zt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var l;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const u = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && (Q(u, r, s), u.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ c.jsx(
    Ue,
    {
      title: "Camera",
      items: a
    }
  );
}
const Fa = Math.PI / 180, Ua = 180 / Math.PI;
function Ke(t, n, a, e, r) {
  return e + (t - n) * (r - e) / (a - n);
}
function Ba(t) {
  return t * Fa;
}
function kt(t) {
  return t * Ua;
}
function $a(t, n) {
  const a = new Ln();
  a.elements = t.matrix;
  const e = new Y(), r = new Fn(), s = new Y();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), r.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const u = (d, p) => {
    var E;
    n.updateObject(t.uuid, d, p);
    const v = (E = n.scene) == null ? void 0 : E.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && Q(v, d, p);
  }, l = (d, p) => {
    u(d, Ba(p));
  };
  return /* @__PURE__ */ c.jsx(
    Ue,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: u
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: u
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: u
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: _t(kt(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: _t(kt(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: _t(kt(r.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: s.x,
          step: 0.01,
          onChange: u
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: u
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: u
        }
      ]
    }
  );
}
function Jt(t) {
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
function Ga(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const r = t.lightInfo[e];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: Jt(e),
        prop: e,
        type: "color",
        value: r,
        onChange: (s, u) => {
          var p;
          const l = new Ft(u);
          n.updateObject(t.uuid, s, l);
          const d = (p = n.scene) == null ? void 0 : p.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && Q(d, s, l);
        }
      }) : a.push({
        title: Jt(e),
        prop: e,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (s, u) => {
          var d;
          n.updateObject(t.uuid, s, u);
          const l = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && Q(l, s, u);
        }
      }));
    }
  return /* @__PURE__ */ c.jsx(
    Ue,
    {
      title: "Light",
      items: a
    }
  );
}
function Va(t, n) {
  const a = [];
  return t.animations.forEach((e) => {
    a.push({
      title: "Name",
      type: "string",
      prop: "name",
      value: e.name,
      disabled: !0,
      onChange: (r, s) => {
        var l;
        n.updateObject(t.uuid, r, s);
        const u = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        u !== void 0 && Q(u, r, s);
      }
    }), a.push({
      title: "Duration",
      type: "number",
      prop: "duration",
      value: e.duration,
      disabled: !0,
      onChange: (r, s) => {
        var l;
        n.updateObject(t.uuid, r, s);
        const u = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        u !== void 0 && Q(u, r, s);
      }
    }), a.push({
      title: "Blend Mode",
      type: "number",
      prop: "blendMode",
      value: e.blendMode,
      disabled: !0,
      onChange: (r, s) => {
        var l;
        n.updateObject(t.uuid, r, s);
        const u = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
        u !== void 0 && Q(u, r, s);
      }
    });
  }), /* @__PURE__ */ c.jsx(Ue, { title: "Animations", items: a });
}
const wn = {
  name: "",
  uuid: "",
  type: "",
  visible: !1,
  matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  animations: [],
  material: void 0,
  perspectiveCameraInfo: void 0,
  orthographicCameraInfo: void 0,
  lightInfo: void 0
};
let ae = { ...wn };
function za(t) {
  const [n, a] = oe(-1);
  Fe(() => {
    function r(u) {
      ae = { ...u.value }, a(Date.now());
    }
    function s() {
      ae = { ...wn }, a(Date.now());
    }
    return _.addEventListener(j.SET_SCENE, s), _.addEventListener(j.SET_OBJECT, r), () => {
      _.removeEventListener(j.SET_SCENE, s), _.removeEventListener(j.SET_OBJECT, r);
    };
  }, []);
  const e = ae.type.toLowerCase();
  return /* @__PURE__ */ c.jsx(Ut, { label: "Inspector", children: /* @__PURE__ */ c.jsx("div", { id: "Inspector", className: t.class, children: ae.uuid.length > 0 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(
        it,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ae.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        it,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ae.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        it,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ae.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        it,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: ae.visible,
          onChange: (r, s) => {
            var l;
            t.three.updateObject(ae.uuid, r, s);
            const u = (l = t.three.scene) == null ? void 0 : l.getObjectByProperty("uuid", ae.uuid);
            u !== void 0 && Q(u, r, s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      $a(ae, t.three),
      ae.animations.length > 0 ? Va(ae, t.three) : null,
      e.search("camera") > -1 ? La(ae, t.three) : null,
      e.search("light") > -1 ? Ga(ae, t.three) : null,
      e.search("mesh") > -1 ? Na(ae, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class fi extends Jn {
  constructor(a) {
    super(a);
    Z(this, "three");
    // Private
    Z(this, "setScene", (a) => {
      this.setState(() => ({
        scene: a.value
      }));
    });
    this.state = {
      scene: a.scene !== void 0 ? a.scene : null
    }, this.three = a.three, _.addEventListener(j.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    _.removeEventListener(j.SET_SCENE, this.setScene);
  }
  render() {
    var r;
    const a = this.componentState.scene !== null, e = "Hierarchy - " + (a ? `${(r = this.componentState.scene) == null ? void 0 : r.name}` : "No Scene");
    return /* @__PURE__ */ c.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(Ut, { label: e, open: !0, children: /* @__PURE__ */ c.jsx(c.Fragment, { children: a && /* @__PURE__ */ c.jsx(_a, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ c.jsx(za, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function hi(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (l) => {
    var p;
    if (!n())
      return;
    const d = (p = t.three.scene) == null ? void 0 : p.getObjectByProperty("uuid", l.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (l, d, p) => {
    var E;
    if (!n())
      return;
    const v = (E = t.three.scene) == null ? void 0 : E.getObjectByProperty("uuid", l);
    v !== void 0 && Q(v, d, p);
  }, r = (l) => {
    if (!n())
      return;
    const d = l.value, { key: p, value: v, uuid: E } = d;
    e(E, p, v);
  }, s = (l) => {
    if (!n())
      return;
    const d = l.value;
    Nt(d.value).then((p) => {
      e(d.uuid, d.key, p), e(d.uuid, "material.needsUpdate", !0);
    });
  }, u = (l) => {
    var w;
    if (!n())
      return;
    const { key: d, uuid: p, value: v } = l.value, E = (w = t.three.scene) == null ? void 0 : w.getObjectByProperty("uuid", p);
    if (E !== void 0)
      try {
        E[d](v);
      } catch (R) {
        console.log("Error requesting method:"), console.log(R), console.log(d), console.log(v);
      }
  };
  return Fe(() => (_.addEventListener(j.GET_OBJECT, a), _.addEventListener(j.UPDATE_OBJECT, r), _.addEventListener(j.CREATE_TEXTURE, s), _.addEventListener(j.REQUEST_METHOD, u), () => {
    _.removeEventListener(j.GET_OBJECT, a), _.removeEventListener(j.UPDATE_OBJECT, r), _.removeEventListener(j.CREATE_TEXTURE, s), _.removeEventListener(j.REQUEST_METHOD, u);
  }), []), null;
}
const Qt = { type: "change" }, At = { type: "start" }, en = { type: "end" }, yt = new Un(), tn = new Bn(), Ya = Math.cos(70 * $n.DEG2RAD);
class Wa extends on {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Y(), this.cursor = new Y(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: We.ROTATE, MIDDLE: We.DOLLY, RIGHT: We.PAN }, this.touches = { ONE: He.ROTATE, TWO: He.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", et), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", et), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Qt), e.update(), s = r.NONE;
    }, this.update = function() {
      const o = new Y(), y = new Yt().setFromUnitVectors(n.up, new Y(0, 1, 0)), A = y.clone().invert(), N = new Y(), te = new Yt(), be = new Y(), ue = 2 * Math.PI;
      return function(bt = null) {
        const ye = e.object.position;
        o.copy(ye).sub(e.target), o.applyQuaternion(y), l.setFromVector3(o), e.autoRotate && s === r.NONE && B(b(bt)), e.enableDamping ? (l.theta += d.theta * e.dampingFactor, l.phi += d.phi * e.dampingFactor) : (l.theta += d.theta, l.phi += d.phi);
        let he = e.minAzimuthAngle, pe = e.maxAzimuthAngle;
        isFinite(he) && isFinite(pe) && (he < -Math.PI ? he += ue : he > Math.PI && (he -= ue), pe < -Math.PI ? pe += ue : pe > Math.PI && (pe -= ue), he <= pe ? l.theta = Math.max(he, Math.min(pe, l.theta)) : l.theta = l.theta > (he + pe) / 2 ? Math.max(he, l.theta) : Math.min(pe, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && ee || e.object.isOrthographicCamera ? l.radius = X(l.radius) : l.radius = X(l.radius * p), o.setFromSpherical(l), o.applyQuaternion(A), ye.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), v.set(0, 0, 0));
        let Ve = !1;
        if (e.zoomToCursor && ee) {
          let Ae = null;
          if (e.object.isPerspectiveCamera) {
            const Te = o.length();
            Ae = X(Te * p);
            const ze = Te - Ae;
            e.object.position.addScaledVector(fe, ze), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Te = new Y(le.x, le.y, 0);
            Te.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), Ve = !0;
            const ze = new Y(le.x, le.y, 0);
            ze.unproject(e.object), e.object.position.sub(ze).add(Te), e.object.updateMatrixWorld(), Ae = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ae !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ae).add(e.object.position) : (yt.origin.copy(e.object.position), yt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(yt.direction)) < Ya ? n.lookAt(e.target) : (tn.setFromNormalAndCoplanarPoint(e.object.up, e.target), yt.intersectPlane(tn, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), Ve = !0);
        return p = 1, ee = !1, Ve || N.distanceToSquared(e.object.position) > u || 8 * (1 - te.dot(e.object.quaternion)) > u || be.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Qt), N.copy(e.object.position), te.copy(e.object.quaternion), be.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Oe), e.domElement.removeEventListener("pointerdown", Je), e.domElement.removeEventListener("pointercancel", ke), e.domElement.removeEventListener("wheel", ht), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", et), e._domElementKeyEvents = null);
    };
    const e = this, r = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let s = r.NONE;
    const u = 1e-6, l = new Wt(), d = new Wt();
    let p = 1;
    const v = new Y(), E = new de(), w = new de(), R = new de(), T = new de(), G = new de(), se = new de(), H = new de(), C = new de(), K = new de(), fe = new Y(), le = new de();
    let ee = !1;
    const f = [], m = {};
    function b(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function S(o) {
      const y = Math.abs(o) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function B(o) {
      d.theta -= o;
    }
    function $(o) {
      d.phi -= o;
    }
    const F = function() {
      const o = new Y();
      return function(A, N) {
        o.setFromMatrixColumn(N, 0), o.multiplyScalar(-A), v.add(o);
      };
    }(), D = function() {
      const o = new Y();
      return function(A, N) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(N, 1) : (o.setFromMatrixColumn(N, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(A), v.add(o);
      };
    }(), U = function() {
      const o = new Y();
      return function(A, N) {
        const te = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const be = e.object.position;
          o.copy(be).sub(e.target);
          let ue = o.length();
          ue *= Math.tan(e.object.fov / 2 * Math.PI / 180), F(2 * A * ue / te.clientHeight, e.object.matrix), D(2 * N * ue / te.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (F(A * (e.object.right - e.object.left) / e.object.zoom / te.clientWidth, e.object.matrix), D(N * (e.object.top - e.object.bottom) / e.object.zoom / te.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function J(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function M(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? p *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function I(o, y) {
      if (!e.zoomToCursor)
        return;
      ee = !0;
      const A = e.domElement.getBoundingClientRect(), N = o - A.left, te = y - A.top, be = A.width, ue = A.height;
      le.x = N / be * 2 - 1, le.y = -(te / ue) * 2 + 1, fe.set(le.x, le.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function X(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function me(o) {
      E.set(o.clientX, o.clientY);
    }
    function Re(o) {
      I(o.clientX, o.clientX), H.set(o.clientX, o.clientY);
    }
    function Xe(o) {
      T.set(o.clientX, o.clientY);
    }
    function ct(o) {
      w.set(o.clientX, o.clientY), R.subVectors(w, E).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      B(2 * Math.PI * R.x / y.clientHeight), $(2 * Math.PI * R.y / y.clientHeight), E.copy(w), e.update();
    }
    function Ot(o) {
      C.set(o.clientX, o.clientY), K.subVectors(C, H), K.y > 0 ? J(S(K.y)) : K.y < 0 && M(S(K.y)), H.copy(C), e.update();
    }
    function Tt(o) {
      G.set(o.clientX, o.clientY), se.subVectors(G, T).multiplyScalar(e.panSpeed), U(se.x, se.y), T.copy(G), e.update();
    }
    function qe(o) {
      I(o.clientX, o.clientY), o.deltaY < 0 ? M(S(o.deltaY)) : o.deltaY > 0 && J(S(o.deltaY)), e.update();
    }
    function Ze(o) {
      let y = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? $(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : U(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? $(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : U(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? B(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : U(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? B(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : U(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (o.preventDefault(), e.update());
    }
    function Pe(o) {
      if (f.length === 1)
        E.set(o.pageX, o.pageY);
      else {
        const y = ve(o), A = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        E.set(A, N);
      }
    }
    function $e(o) {
      if (f.length === 1)
        T.set(o.pageX, o.pageY);
      else {
        const y = ve(o), A = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        T.set(A, N);
      }
    }
    function _e(o) {
      const y = ve(o), A = o.pageX - y.x, N = o.pageY - y.y, te = Math.sqrt(A * A + N * N);
      H.set(0, te);
    }
    function Mt(o) {
      e.enableZoom && _e(o), e.enablePan && $e(o);
    }
    function lt(o) {
      e.enableZoom && _e(o), e.enableRotate && Pe(o);
    }
    function ut(o) {
      if (f.length == 1)
        w.set(o.pageX, o.pageY);
      else {
        const A = ve(o), N = 0.5 * (o.pageX + A.x), te = 0.5 * (o.pageY + A.y);
        w.set(N, te);
      }
      R.subVectors(w, E).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      B(2 * Math.PI * R.x / y.clientHeight), $(2 * Math.PI * R.y / y.clientHeight), E.copy(w);
    }
    function dt(o) {
      if (f.length === 1)
        G.set(o.pageX, o.pageY);
      else {
        const y = ve(o), A = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        G.set(A, N);
      }
      se.subVectors(G, T).multiplyScalar(e.panSpeed), U(se.x, se.y), T.copy(G);
    }
    function je(o) {
      const y = ve(o), A = o.pageX - y.x, N = o.pageY - y.y, te = Math.sqrt(A * A + N * N);
      C.set(0, te), K.set(0, Math.pow(C.y / H.y, e.zoomSpeed)), J(K.y), H.copy(C);
      const be = (o.pageX + y.x) * 0.5, ue = (o.pageY + y.y) * 0.5;
      I(be, ue);
    }
    function Ge(o) {
      e.enableZoom && je(o), e.enablePan && dt(o);
    }
    function ft(o) {
      e.enableZoom && je(o), e.enableRotate && ut(o);
    }
    function Je(o) {
      e.enabled !== !1 && (f.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", Se), e.domElement.addEventListener("pointerup", ke)), Pt(o), o.pointerType === "touch" ? pt(o) : Rt(o));
    }
    function Se(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? mt(o) : Qe(o));
    }
    function ke(o) {
      gt(o), f.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke)), e.dispatchEvent(en), s = r.NONE;
    }
    function Rt(o) {
      let y;
      switch (o.button) {
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
        case We.DOLLY:
          if (e.enableZoom === !1)
            return;
          Re(o), s = r.DOLLY;
          break;
        case We.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            Xe(o), s = r.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            me(o), s = r.ROTATE;
          }
          break;
        case We.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            me(o), s = r.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Xe(o), s = r.PAN;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(At);
    }
    function Qe(o) {
      switch (s) {
        case r.ROTATE:
          if (e.enableRotate === !1)
            return;
          ct(o);
          break;
        case r.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ot(o);
          break;
        case r.PAN:
          if (e.enablePan === !1)
            return;
          Tt(o);
          break;
      }
    }
    function ht(o) {
      e.enabled === !1 || e.enableZoom === !1 || s !== r.NONE || (o.preventDefault(), e.dispatchEvent(At), qe(o), e.dispatchEvent(en));
    }
    function et(o) {
      e.enabled === !1 || e.enablePan === !1 || Ze(o);
    }
    function pt(o) {
      switch (tt(o), f.length) {
        case 1:
          switch (e.touches.ONE) {
            case He.ROTATE:
              if (e.enableRotate === !1)
                return;
              Pe(o), s = r.TOUCH_ROTATE;
              break;
            case He.PAN:
              if (e.enablePan === !1)
                return;
              $e(o), s = r.TOUCH_PAN;
              break;
            default:
              s = r.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case He.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              Mt(o), s = r.TOUCH_DOLLY_PAN;
              break;
            case He.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              lt(o), s = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = r.NONE;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(At);
    }
    function mt(o) {
      switch (tt(o), s) {
        case r.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ut(o), e.update();
          break;
        case r.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          dt(o), e.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Ge(o), e.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          ft(o), e.update();
          break;
        default:
          s = r.NONE;
      }
    }
    function Oe(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function Pt(o) {
      f.push(o.pointerId);
    }
    function gt(o) {
      delete m[o.pointerId];
      for (let y = 0; y < f.length; y++)
        if (f[y] == o.pointerId) {
          f.splice(y, 1);
          return;
        }
    }
    function tt(o) {
      let y = m[o.pointerId];
      y === void 0 && (y = new de(), m[o.pointerId] = y), y.set(o.pageX, o.pageY);
    }
    function ve(o) {
      const y = o.pointerId === f[0] ? f[1] : f[0];
      return m[y];
    }
    e.domElement.addEventListener("contextmenu", Oe), e.domElement.addEventListener("pointerdown", Je), e.domElement.addEventListener("pointercancel", ke), e.domElement.addEventListener("wheel", ht, { passive: !1 }), this.update();
  }
}
const xt = (t) => {
  const [n, a] = oe(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, r = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ c.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ c.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ c.jsx("li", { onClick: () => r(s), children: s }, s)) })
  ] });
}, Ie = Qn(function(n, a) {
  const [e, r] = oe(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ c.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ c.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && r(!1);
    } }),
    /* @__PURE__ */ c.jsx(
      xt,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (u) => {
          r(u);
        },
        up: !0
      }
    )
  ] });
}), nn = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ne = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function Be(t, n) {
  const a = new ln(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ne.set(t, a), a;
}
Be("Top", new Y(0, 1e3, 0));
Be("Bottom", new Y(0, -1e3, 0));
Be("Left", new Y(-1e3, 0, 0));
Be("Right", new Y(1e3, 0, 0));
Be("Front", new Y(0, 0, 1e3));
Be("Back", new Y(0, 0, -1e3));
Be("Orthographic", new Y(1e3, 1e3, 1e3));
const St = new Dt(60, 1, 50, 3e3);
St.name = "Debug";
St.position.set(500, 500, 500);
St.lookAt(0, 0, 0);
ne.set("Debug", St);
const an = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ha = new Gn(), Ka = new Vn(), Xa = new Pa(), qa = new zn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let Et = "Renderer";
const z = new un();
z.name = "Debug Scene";
let xe = new un();
z.add(xe);
const st = new Yn();
st.name = "helpers";
z.add(st);
const Za = new Ta();
st.add(Za);
const xn = new dn(500);
xn.name = "axisHelper";
st.add(xn);
const ot = new dn(100);
ot.name = "interactionHelper";
st.add(ot);
ot.visible = !1;
let wt = !1, V = ne.get("Debug"), re = ne.get("Orthographic"), Ne = ne.get("Front"), Le = ne.get("Top"), rn = !1;
function pi(t) {
  const [n, a] = oe(t.mode !== void 0 ? t.mode : "Single"), [e, r] = oe(null), [s, u] = oe(!1), [l, d] = oe(!1), [p, v] = oe(!1), [, E] = oe(Date.now()), w = Ce(null), R = Ce(null), T = Ce(null), G = Ce(null), se = Ce(null), H = Ce(null), C = (f, m) => {
    const b = ie.get(f.name);
    b !== void 0 && b.dispose(), ie.delete(f.name);
    const S = we.get(f.name);
    S !== void 0 && (z.remove(S), S.dispose()), we.delete(f.name);
    const B = new Wa(f, m);
    switch (B.enableDamping = !0, B.dampingFactor = 0.05, f.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        B.enableRotate = !1;
        break;
    }
    if (ie.set(f.name, B), f instanceof Dt) {
      const $ = new Kn(f);
      we.set(f.name, $), z.add($);
    }
  }, K = (f) => {
    const m = we.get(f.name);
    m !== void 0 && (z.remove(m), m.dispose(), we.delete(f.name));
    const b = ie.get(f.name);
    b !== void 0 && (b.dispose(), ie.delete(f.name));
  }, fe = () => {
    ie.forEach((f, m) => {
      f.dispose();
      const b = we.get(m);
      b !== void 0 && (z.remove(b), b.dispose()), we.delete(m), ie.delete(m);
    }), ie.clear(), we.clear();
  }, le = () => {
    switch (n) {
      case "Single":
        C(V, T.current);
        break;
      case "Side by Side":
      case "Stacked":
        C(V, T.current), C(re, G.current);
        break;
      case "Quad":
        C(V, T.current), C(re, G.current), C(Ne, se.current), C(Le, H.current);
        break;
    }
  };
  Fe(() => {
    const f = new Wn({
      canvas: w.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), r(f);
  }, []), Fe(() => {
    const f = (S) => {
      mn(xe), z.remove(xe);
      const B = t.scenes.get(S.value.name);
      if (B !== void 0) {
        const $ = new B();
        t.onSceneSet !== void 0 && t.onSceneSet($), xe = $, t.three.scene = xe, z.add(xe), rn = !0;
      }
    }, m = (S) => {
      var F;
      const B = S.value, $ = (F = t.three.scene) == null ? void 0 : F.getObjectByProperty("uuid", B.uuid);
      $ !== void 0 && ne.set(B.name, $), E(Date.now());
    }, b = (S) => {
      ne.delete(S.value.name), E(Date.now());
    };
    return _.addEventListener(j.SET_SCENE, f), _.addEventListener(j.ADD_CAMERA, m), _.addEventListener(j.REMOVE_CAMERA, b), () => {
      _.removeEventListener(j.SET_SCENE, f), _.removeEventListener(j.ADD_CAMERA, m), _.removeEventListener(j.REMOVE_CAMERA, b);
    };
  }, []), Fe(() => {
    if (e === null)
      return;
    let f = window.innerWidth, m = window.innerHeight, b = Math.floor(f / 2), S = Math.floor(m / 2), B = -1;
    const $ = () => {
      f = window.innerWidth - 300, m = window.innerHeight, b = Math.floor(f / 2), S = Math.floor(m / 2), e.setSize(f, m);
      let M = f, I = m;
      switch (n) {
        case "Side by Side":
          M = b, I = m;
          break;
        case "Stacked":
          M = f, I = S;
          break;
        case "Quad":
          M = b, I = S;
          break;
      }
      ne.forEach((X) => {
        var me;
        X instanceof ln ? (X.left = M / -2, X.right = M / 2, X.top = I / 2, X.bottom = I / -2, X.updateProjectionMatrix()) : X instanceof Dt && (X.aspect = M / I, X.updateProjectionMatrix(), (me = we.get(X.name)) == null || me.update());
      });
    }, F = () => {
      e.setViewport(0, 0, f, m), e.setScissor(0, 0, f, m), e.render(z, V);
    }, D = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, b, m), e.setScissor(0, 0, b, m), e.render(z, V), e.setViewport(b, 0, b, m), e.setScissor(b, 0, b, m), e.render(z, re);
      else {
        const M = m - S;
        e.setViewport(0, M, f, S), e.setScissor(0, M, f, S), e.render(z, V), e.setViewport(0, 0, f, S), e.setScissor(0, 0, f, S), e.render(z, re);
      }
    }, U = () => {
      let M = 0, I = 0;
      I = m - S, M = 0, e.setViewport(M, I, b, S), e.setScissor(M, I, b, S), e.render(z, V), M = b, e.setViewport(M, I, b, S), e.setScissor(M, I, b, S), e.render(z, re), I = 0, M = 0, e.setViewport(M, I, b, S), e.setScissor(M, I, b, S), e.render(z, Ne), M = b, e.setViewport(M, I, b, S), e.setScissor(M, I, b, S), e.render(z, Le);
    }, J = () => {
      switch (ie.forEach((M) => {
        M.update();
      }), t.onSceneUpdate !== void 0 && rn && t.onSceneUpdate(xe), e.clear(), n) {
        case "Single":
          F();
          break;
        case "Side by Side":
        case "Stacked":
          D();
          break;
        case "Quad":
          U();
          break;
      }
      B = requestAnimationFrame(J);
    };
    return le(), window.addEventListener("resize", $), $(), J(), () => {
      window.removeEventListener("resize", $), cancelAnimationFrame(B), B = -1;
    };
  }, [n, e]), Fe(() => {
    if (e !== null) {
      const f = new Hn(), m = new de(), b = (F, D, U, J) => {
        switch (n) {
          case "Quad":
            F < U ? D < J ? f.setFromCamera(m, V) : f.setFromCamera(m, Ne) : D < J ? f.setFromCamera(m, re) : f.setFromCamera(m, Le);
            break;
          case "Side by Side":
            F < U ? f.setFromCamera(m, V) : f.setFromCamera(m, re);
            break;
          case "Single":
            f.setFromCamera(m, V);
            break;
          case "Stacked":
            D < J ? f.setFromCamera(m, V) : f.setFromCamera(m, re);
            break;
        }
      }, S = (F) => {
        if (!wt)
          return;
        const D = new de();
        e.getSize(D);
        const U = Math.min(F.clientX, D.x), J = Math.min(F.clientY, D.y);
        m.x = Ke(U, 0, D.x, -1, 1), m.y = Ke(J, 0, D.y, 1, -1);
        const M = D.x / 2, I = D.y / 2, X = () => {
          U < M ? m.x = Ke(U, 0, M, -1, 1) : m.x = Ke(U, M, D.x, -1, 1);
        }, me = () => {
          J < I ? m.y = Ke(J, 0, I, 1, -1) : m.y = Ke(J, I, D.y, 1, -1);
        };
        switch (n) {
          case "Quad":
            X(), me();
            break;
          case "Side by Side":
            X();
            break;
          case "Stacked":
            me(), me();
            break;
        }
        b(U, J, M, I);
        const Re = f.intersectObjects(xe.children);
        Re.length > 0 && ot.position.copy(Re[0].point);
      }, B = (F) => {
        if (!wt)
          return;
        const D = new de();
        if (e.getSize(D), F.clientX >= D.x)
          return;
        S(F);
        const U = f.intersectObjects(xe.children);
        U.length > 0 && t.three.getObject(U[0].object.uuid);
      }, $ = R.current;
      return $.addEventListener("mousemove", S, !1), $.addEventListener("click", B, !1), () => {
        $.removeEventListener("mousemove", S), $.removeEventListener("click", B);
      };
    }
  }, [n, e]);
  const ee = [];
  return ne.forEach((f, m) => {
    ee.push(m);
  }), /* @__PURE__ */ c.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ c.jsx("canvas", { ref: w }),
    /* @__PURE__ */ c.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: R, children: [
      n === "Single" && /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(Ie, { camera: V, options: ee, ref: T, onSelect: (f) => {
        var b;
        (b = ie.get(V.name)) == null || b.dispose();
        const m = ne.get(f);
        m !== void 0 && (K(V), V = m, C(m, T.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ie, { camera: V, options: ee, ref: T, onSelect: (f) => {
          var b;
          (b = ie.get(V.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(V), V = m, C(m, T.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: re, options: ee, ref: G, onSelect: (f) => {
          var b;
          (b = ie.get(re.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(re), re = m, C(m, G.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ie, { camera: V, options: ee, ref: T, onSelect: (f) => {
          var b;
          (b = ie.get(V.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(V), V = m, C(m, T.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: re, options: ee, ref: G, onSelect: (f) => {
          var b;
          (b = ie.get(re.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(re), re = m, C(m, G.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: Ne, options: ee, ref: se, onSelect: (f) => {
          var b;
          (b = ie.get(Ne.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(Ne), Ne = m, C(m, se.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: Le, options: ee, ref: H, onSelect: (f) => {
          var b;
          (b = ie.get(Le.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(Le), Le = m, C(m, H.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ c.jsx(
        xt,
        {
          index: nn.indexOf(n),
          options: nn,
          onSelect: (f) => {
            f !== n && (fe(), a(f));
          },
          open: s,
          onToggle: (f) => {
            u(f), l && d(!1), p && v(!1);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        xt,
        {
          index: an.indexOf(Et),
          options: an,
          onSelect: (f) => {
            if (f !== Et)
              switch (Et = f, Et) {
                case "Depth":
                  z.overrideMaterial = Ha;
                  break;
                case "Normals":
                  z.overrideMaterial = Ka;
                  break;
                default:
                case "Renderer":
                  z.overrideMaterial = null;
                  break;
                case "Wireframe":
                  z.overrideMaterial = qa;
                  break;
                case "UVs":
                  z.overrideMaterial = Xa;
                  break;
              }
          },
          open: l,
          onToggle: (f) => {
            s && u(!1), d(f), p && v(!1);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        xt,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (f) => {
            wt = f === "Selection Mode", ot.visible = wt;
          },
          open: p,
          onToggle: (f) => {
            s && u(!1), l && d(!1), v(f);
          }
        }
      )
    ] })
  ] });
}
function mi(t) {
  return /* @__PURE__ */ c.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ c.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ c.jsx("footer", { children: t.footer })
  ] });
}
export {
  Ut as Accordion,
  ci as Application,
  Ct as BaseRemote,
  En as ChildObject,
  _a as ContainerObject,
  Ea as Draggable,
  ya as DraggableItem,
  wa as Dropdown,
  xa as DropdownItem,
  mi as Editor,
  Ta as InfiniteGridHelper,
  za as Inspector,
  pi as MultiView,
  yn as NavButton,
  li as RemoteComponents,
  di as RemoteController,
  vn as RemoteTheatre,
  ui as RemoteThree,
  ha as RemoteTweakpane,
  hi as SceneInspector,
  fi as SidePanel,
  j as ToolEvents,
  Pa as UVMaterial,
  ri as clamp,
  na as colorToHex,
  _ as debugDispatcher,
  mn as dispose,
  ia as disposeMaterial,
  si as disposeTexture,
  oi as distance,
  pn as hierarchyUUID,
  ta as isColor,
  ea as randomID,
  aa as resetThreeObjects,
  _t as round,
  It as totalThreeObjects
};
