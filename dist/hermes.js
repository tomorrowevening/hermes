var _n = Object.defineProperty;
var jn = (t, n, a) => n in t ? _n(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var Z = (t, n, a) => (jn(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as kn, EventDispatcher as sn, Texture as cn, CubeTexture as An, RepeatWrapping as Yt, ShaderMaterial as ln, GLSL3 as Dn, DoubleSide as In, Color as Ft, Mesh as Nn, PlaneGeometry as Ln, Matrix4 as Fn, Vector3 as Y, Euler as Un, Ray as Bn, Plane as $n, MathUtils as Gn, MOUSE as We, TOUCH as He, Quaternion as Wt, Spherical as Ht, Vector2 as de, PerspectiveCamera as Dt, MeshDepthMaterial as Vn, MeshNormalMaterial as zn, MeshBasicMaterial as Yn, OrthographicCamera as un, Scene as dn, Group as Wn, AxesHelper as fn, WebGLRenderer as Hn, Raycaster as Kn, CameraHelper as Xn } from "three";
import { getProject as qn } from "@theatre/core";
import rt from "@theatre/studio";
import { Pane as Zn } from "tweakpane";
import * as Jn from "@tweakpane/plugin-essentials";
import hn, { useState as oe, useRef as Ce, useEffect as Fe, Component as Qn, forwardRef as ea } from "react";
import { Reorder as pn } from "framer-motion";
function si(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function ci(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function ta() {
  return Math.round(Math.random() * 1e6).toString();
}
function na(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function aa(t) {
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
const ia = () => {
  It = 0;
}, mn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${It}`, It++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    mn(a);
  });
}, li = (t) => {
  t == null || t.dispose();
}, ra = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, gn = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof kn ? (a.pause(), a.parent && a.parent.remove(a)) : gn(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), ra(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class ui {
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
  get isApp() {
    return this._mode === "app";
  }
  get editor() {
    return this._mode === "editor";
  }
  set editor(n) {
    n && (this._mode = "editor", document.title += " - Editor");
  }
}
const _ = new sn(), j = {
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
class oa extends Ct {
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
function sa(t, n) {
  switch (n.event) {
    case "selectComponent":
      _.dispatchEvent({ type: j.SELECT_DROPDOWN, value: n.data });
      break;
    case "draggableListUpdate":
      _.dispatchEvent({ type: j.DRAG_UPDATE, value: n.data });
      break;
  }
}
const vn = () => {
};
class Ut extends Ct {
  constructor() {
    super(...arguments);
    Z(this, "project");
    Z(this, "sheets", /* @__PURE__ */ new Map());
    Z(this, "sheetObjects", /* @__PURE__ */ new Map());
    Z(this, "sheetObjectCBs", /* @__PURE__ */ new Map());
    Z(this, "sheetObjectUnsubscribe", /* @__PURE__ */ new Map());
  }
  init(a, e) {
    this.project = qn(a, e);
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
    const u = this.sheet(a);
    if (u === void 0)
      return;
    const l = `${a}_${e}`;
    let d = this.sheetObjects.get(l);
    d !== void 0 ? d = u.object(e, { ...r, ...d.value }, { reconfigure: !0 }) : d = u.object(e, r), this.sheetObjects.set(l, d), this.sheetObjectCBs.set(l, s !== void 0 ? s : vn);
    const p = d.onValuesChange((v) => {
      if (this.app.editor) {
        for (const x in v) {
          const C = v[x];
          typeof C == "object" && na(C) && (v[x] = {
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
            sheetObject: l,
            values: v
          }
        });
      }
      const E = this.sheetObjectCBs.get(l);
      E !== void 0 && E(v);
    });
    return this.sheetObjectUnsubscribe.set(l, p), d;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = a.address.sheetId, r = a.address.objectKey, s = this.sheets.get(e);
    s == null || s.detachObject(r);
    const u = `${e}_${r}`, l = this.sheetObjectUnsubscribe.get(u);
    l !== void 0 && (this.sheetObjects.delete(u), this.sheetObjectCBs.delete(u), this.sheetObjectUnsubscribe.delete(u), l());
  }
}
let Me;
function ca(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Ut) {
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
function la(t) {
  if (t.editor) {
    let n;
    t.components.forEach((s) => {
      s instanceof Ut && (n = s);
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
function ua(t) {
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
function da(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function fa(t) {
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
function Kt(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || fa(a))
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
            if (r instanceof cn) {
              const s = r.source.toJSON();
              n[a] = { src: s.url };
            } else
              r instanceof An && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = da(n[a]));
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
        r.push(Kt(s));
      }), n.material = r;
    } else
      n.material = Kt(e.material);
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
      const r = new cn(e);
      r.wrapS = Yt, r.wrapT = Yt, r.needsUpdate = !0, n(r);
    }, e.onerror = a, e.src = t;
  });
}
class ha extends Ct {
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
    this.scene = a, ia(), mn(this.scene);
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
function pa(t, n) {
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
function ma(t, n) {
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
class yn extends Ct {
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
    this.pane = new Zn({ title: "GUI" }), this.pane.registerPlugin(Jn);
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
    const u = this.bindID, l = r.onChange !== void 0 ? r.onChange : vn;
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
function ga(t, n) {
  t.components.forEach((a) => {
    if (a instanceof yn) {
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
var Xt;
function va() {
  if (Xt)
    return nt;
  Xt = 1;
  var t = hn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(l, d, p) {
    var v, E = {}, x = null, C = null;
    p !== void 0 && (x = "" + p), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (C = d.ref);
    for (v in d)
      e.call(d, v) && !s.hasOwnProperty(v) && (E[v] = d[v]);
    if (l && l.defaultProps)
      for (v in d = l.defaultProps, d)
        E[v] === void 0 && (E[v] = d[v]);
    return { $$typeof: n, type: l, key: x, ref: C, props: E, _owner: r.current };
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
var qt;
function ba() {
  return qt || (qt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = hn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), M = Symbol.iterator, G = "@@iterator";
    function se(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = M && i[M] || i[G];
      return typeof h == "function" ? h : null;
    }
    var H = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(i) {
      {
        for (var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), w = 1; w < h; w++)
          g[w - 1] = arguments[w];
        K("error", i, g);
      }
    }
    function K(i, h, g) {
      {
        var w = H.ReactDebugCurrentFrame, k = w.getStackAddendum();
        k !== "" && (h += "%s", g = g.concat([k]));
        var L = g.map(function(P) {
          return String(P);
        });
        L.unshift("Warning: " + h), Function.prototype.apply.call(console[i], console, L);
      }
    }
    var fe = !1, le = !1, ee = !1, f = !1, m = !1, b;
    b = Symbol.for("react.module.reference");
    function O(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || m || i === r || i === p || i === v || f || i === C || fe || le || ee || typeof i == "object" && i !== null && (i.$$typeof === x || i.$$typeof === E || i.$$typeof === u || i.$$typeof === l || i.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === b || i.getModuleId !== void 0));
    }
    function B(i, h, g) {
      var w = i.displayName;
      if (w)
        return w;
      var k = h.displayName || h.name || "";
      return k !== "" ? g + "(" + k + ")" : g;
    }
    function $(i) {
      return i.displayName || "Context";
    }
    function F(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
            var w = i.displayName || null;
            return w !== null ? w : F(i.type) || "Memo";
          case x: {
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
    var D = Object.assign, U = 0, J, R, I, X, me, Re, Xe;
    function ct() {
    }
    ct.__reactDisabledLog = !0;
    function Ot() {
      {
        if (U === 0) {
          J = console.log, R = console.info, I = console.warn, X = console.error, me = console.group, Re = console.groupCollapsed, Xe = console.groupEnd;
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
              value: R
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
        U < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var qe = H.ReactCurrentDispatcher, Ze;
    function Pe(i, h, g) {
      {
        if (Ze === void 0)
          try {
            throw Error();
          } catch (k) {
            var w = k.stack.trim().match(/\n( *(at )?)/);
            Ze = w && w[1] || "";
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
      var w;
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
              w = Ee;
            }
            Reflect.construct(i, [], P);
          } else {
            try {
              P.call();
            } catch (Ee) {
              w = Ee;
            }
            i.call(P.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ee) {
            w = Ee;
          }
          i();
        }
      } catch (Ee) {
        if (Ee && w && typeof Ee.stack == "string") {
          for (var T = Ee.stack.split(`
`), ce = w.stack.split(`
`), W = T.length - 1, q = ce.length - 1; W >= 1 && q >= 0 && T[W] !== ce[q]; )
            q--;
          for (; W >= 1 && q >= 0; W--, q--)
            if (T[W] !== ce[q]) {
              if (W !== 1 || q !== 1)
                do
                  if (W--, q--, q < 0 || T[W] !== ce[q]) {
                    var ge = `
` + T[W].replace(" at new ", " at ");
                    return i.displayName && ge.includes("<anonymous>") && (ge = ge.replace("<anonymous>", i.displayName)), typeof i == "function" && _e.set(i, ge), ge;
                  }
                while (W >= 1 && q >= 0);
              break;
            }
        }
      } finally {
        $e = !1, qe.current = L, Tt(), Error.prepareStackTrace = k;
      }
      var Ye = i ? i.displayName || i.name : "", zt = Ye ? Pe(Ye) : "";
      return typeof i == "function" && _e.set(i, zt), zt;
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
          case x: {
            var w = i, k = w._payload, L = w._init;
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
    function ke(i, h, g, w, k) {
      {
        var L = Function.call.bind(Ge);
        for (var P in i)
          if (L(i, P)) {
            var T = void 0;
            try {
              if (typeof i[P] != "function") {
                var ce = Error((w || "React class") + ": " + g + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ce.name = "Invariant Violation", ce;
              }
              T = i[P](h, P, w, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (W) {
              T = W;
            }
            T && !(T instanceof Error) && (Se(k), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", g, P, typeof T), Se(null)), T instanceof Error && !(T.message in ft) && (ft[T.message] = !0, Se(k), S("Failed %s type: %s", g, T.message), Se(null));
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
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ht(i)), pt(i);
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
        ve[g] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F(Oe.current.type), i.ref), ve[g] = !0);
      }
    }
    function N(i, h) {
      {
        var g = function() {
          gt || (gt = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
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
          tt || (tt = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var be = function(i, h, g, w, k, L, P) {
      var T = {
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
      return T._store = {}, Object.defineProperty(T._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(T, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function ue(i, h, g, w, k) {
      {
        var L, P = {}, T = null, ce = null;
        g !== void 0 && (mt(g), T = "" + g), y(h) && (mt(h.key), T = "" + h.key), o(h) && (ce = h.ref, A(h, k));
        for (L in h)
          Ge.call(h, L) && !Pt.hasOwnProperty(L) && (P[L] = h[L]);
        if (i && i.defaultProps) {
          var W = i.defaultProps;
          for (L in W)
            P[L] === void 0 && (P[L] = W[L]);
        }
        if (T || ce) {
          var q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          T && N(P, q), ce && te(P, q);
        }
        return be(i, T, ce, k, w, Oe.current, P);
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
    function $t(i, h) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = ze(h);
        if (Te[g])
          return;
        Te[g] = !0;
        var w = "";
        i && i._owner && i._owner !== vt.current && (w = " It was passed a child from " + F(i._owner.type) + "."), ye(i), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, w), ye(null);
      }
    }
    function Gt(i, h) {
      {
        if (typeof i != "object")
          return;
        if (Qe(i))
          for (var g = 0; g < i.length; g++) {
            var w = i[g];
            pe(w) && $t(w, h);
          }
        else if (pe(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var k = se(i);
          if (typeof k == "function" && k !== i.entries)
            for (var L = k.call(i), P; !(P = L.next()).done; )
              pe(P.value) && $t(P.value, h);
        }
      }
    }
    function Sn(i) {
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
          var w = F(h);
          ke(g, i.props, "prop", w, i);
        } else if (h.PropTypes !== void 0 && !he) {
          he = !0;
          var k = F(h);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function On(i) {
      {
        for (var h = Object.keys(i.props), g = 0; g < h.length; g++) {
          var w = h[g];
          if (w !== "children" && w !== "key") {
            ye(i), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), ye(null);
            break;
          }
        }
        i.ref !== null && (ye(i), S("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    function Vt(i, h, g, w, k, L) {
      {
        var P = O(i);
        if (!P) {
          var T = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Ae(k);
          ce ? T += ce : T += Ve();
          var W;
          i === null ? W = "null" : Qe(i) ? W = "array" : i !== void 0 && i.$$typeof === n ? (W = "<" + (F(i.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : W = typeof i, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", W, T);
        }
        var q = ue(i, h, g, k, L);
        if (q == null)
          return q;
        if (P) {
          var ge = h.children;
          if (ge !== void 0)
            if (w)
              if (Qe(ge)) {
                for (var Ye = 0; Ye < ge.length; Ye++)
                  Gt(ge[Ye], i);
                Object.freeze && Object.freeze(ge);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Gt(ge, i);
        }
        return i === e ? On(q) : Sn(q), q;
      }
    }
    function Tn(i, h, g) {
      return Vt(i, h, g, !0);
    }
    function Mn(i, h, g) {
      return Vt(i, h, g, !1);
    }
    var Rn = Mn, Pn = Tn;
    at.Fragment = e, at.jsx = Rn, at.jsxs = Pn;
  }()), at;
}
process.env.NODE_ENV === "production" ? Lt.exports = va() : Lt.exports = ba();
var c = Lt.exports;
function En(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ c.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ c.jsx("button", { children: t.title });
}
const ya = /* @__PURE__ */ c.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ c.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ c.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ea = /* @__PURE__ */ c.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ c.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function wa(t) {
  return /* @__PURE__ */ c.jsx(pn.Item, { value: t.title, children: /* @__PURE__ */ c.jsxs("div", { children: [
    Ea,
    /* @__PURE__ */ c.jsx("span", { children: t.title }),
    /* @__PURE__ */ c.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: ya })
  ] }) }, t.title);
}
function xa(t) {
  const [n, a] = oe(!1), [e, r] = oe(t.options), s = (p) => {
    t.onDragComplete(p), r(p);
  }, u = (p) => {
    const v = [...e];
    v.splice(p, 1), s(v);
  }, l = [];
  e.forEach((p, v) => {
    l.push(/* @__PURE__ */ c.jsx(wa, { index: v, title: p, onDelete: u }, p));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ c.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ c.jsx(En, { title: t.title }),
    /* @__PURE__ */ c.jsx(pn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: l })
  ] });
}
function Ca(t) {
  const [n, a] = oe(!1), e = [];
  t.options.map((s, u) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ c.jsx(Sa, { option: s }, u));
  });
  let r = "dropdown";
  return t.subdropdown && (r += " subdropdown"), /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ c.jsx(En, { title: t.title }),
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
function Sa(t) {
  const { option: n } = t, [a, e] = oe("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ c.jsx(
        xa,
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
        Ca,
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
  return /* @__PURE__ */ c.jsx("li", { className: a === n.title ? "selected" : "", children: r }, ta());
}
function di(t) {
  const n = [], a = [];
  t.components.forEach((s) => {
    s instanceof oa ? n.push(sa) : s instanceof Ut ? (n.push(ca), la(t)) : s instanceof ha ? (n.push(pa), a.push(ma)) : s instanceof yn && n.push(ga);
  });
  function e(s) {
    switch (n.forEach((u) => u(t, s)), s.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: s.data });
        break;
    }
  }
  function r(s) {
    switch (a.forEach((u) => u(t, s)), s.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: s.data });
        break;
    }
  }
  t.listen((s) => {
    t.editor ? r(s) : e(s);
  });
}
const Oa = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Ta = `out vec4 fragColor;
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
class Ma extends ln {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Dn,
      side: In,
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
      vertexShader: Oa,
      fragmentShader: Ta,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class Ra extends Nn {
  constructor() {
    const a = new Ma();
    super(new Ln(2, 2), a);
    Z(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Pa = `#include <common>
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
}`, _a = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ja extends ln {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Pa,
      fragmentShader: _a
    });
  }
}
function Bt(t) {
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
function wn(t) {
  const [n, a] = oe(!1), e = t.child.children.length > 0, r = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    r.push(/* @__PURE__ */ c.jsx(wn, { child: s, three: t.three }, Math.random()));
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
      /* @__PURE__ */ c.jsx("div", { className: `icon ${ua(t.child)}` })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ c.jsx("div", { className: "container", children: r }) })
  ] }, Math.random());
}
function ka(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ c.jsx(wn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ c.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Aa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Da(t) {
  return "items" in t;
}
function Ue(t) {
  const n = [];
  return t.items.forEach((a) => {
    Da(a) ? n.push(
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
  }), /* @__PURE__ */ c.jsx(Bt, { label: t.title, open: t.expanded === !0, children: n });
}
function Ia(t) {
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
function Na(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function La() {
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
function Zt(t, n, a) {
  const e = [];
  for (const r in t) {
    if (!Ia(r))
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
      Na(r) && (l.value = Number(u), l.type = "range", l.min = 0, l.max = 1, l.step = 0.01), e.push(l);
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
              var x;
              a.updateObject(n.uuid, `material.${r}`, v);
              const E = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
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
                onChange: (E, x) => {
                  var M;
                  a.createTexture(n.uuid, `material.${r}`, x);
                  const C = (M = a.scene) == null ? void 0 : M.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Nt(x).then((G) => {
                    Q(C, `material.${r}`, G), Q(C, "material.needsUpdate", !0);
                  });
                }
              }) : l.push({
                title: `${De(d)}`,
                prop: `material.${r}.${d}`,
                type: `${typeof t[r][d]}`,
                value: u[d],
                onChange: (E, x) => {
                  var M;
                  a.updateObject(n.uuid, `material.${r}.${d}`, x);
                  const C = (M = a.scene) == null ? void 0 : M.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Q(C, `material.${r}.${d}`, x);
                }
              });
              break;
            case "object":
              p.value !== void 0 && p.value.src !== void 0 ? l.push({
                title: De(d),
                type: "image",
                value: p.value.src,
                onChange: (E, x) => {
                  var M;
                  a.createTexture(n.uuid, `material.${r}.${d}.value`, x);
                  const C = (M = a.scene) == null ? void 0 : M.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Nt(x).then((G) => {
                    Q(C, `material.${r}.${d}.value`, G);
                  });
                }
              }) : l.push({
                title: d,
                type: `${typeof p.value}`,
                value: p.value,
                onChange: (E, x) => {
                  var M;
                  a.updateObject(n.uuid, `material.${r}.${d}.value`, x);
                  const C = (M = a.scene) == null ? void 0 : M.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && Q(C, `material.${r}.${d}.value`, x);
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
function Fa(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], r = a.length;
    for (let s = 0; s < r; s++)
      e.push(
        /* @__PURE__ */ c.jsx(
          Ue,
          {
            title: `Material ${s}`,
            items: Zt(a[s], t, n)
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
        items: Zt(a, t, n)
      }
    );
}
function it(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = aa(t.value));
  const [a, e] = oe(n), r = Ce(null), s = Ce(null), u = Ce(null);
  Fe(() => {
    var K;
    let v = !1, E = -1, x = 0, C = Number(a);
    const M = (fe) => {
      v = !0, x = C, E = fe.clientX;
    }, G = (fe) => {
      if (!v)
        return;
      const le = t.step !== void 0 ? t.step : 1, ee = (fe.clientX - E) * le;
      C = Number((x + ee).toFixed(4)), s.current !== null && (s.current.value = C.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, C);
    }, se = () => {
      v = !1;
    }, H = () => {
      v = !1;
    }, S = t.type === "number";
    return S && ((K = r.current) == null || K.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", se, !1), document.addEventListener("mousemove", G, !1), document.addEventListener("contextmenu", H, !1)), () => {
      var fe;
      S && ((fe = r.current) == null || fe.removeEventListener("mousedown", M), document.removeEventListener("mouseup", se), document.removeEventListener("mousemove", G), document.removeEventListener("contextmenu", H));
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
      La().then((v) => {
        u.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : Aa })
  ] });
}
function Jt(t) {
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
function Ua(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Jt(e),
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
        title: Jt(e),
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
const Ba = Math.PI / 180, $a = 180 / Math.PI;
function Ke(t, n, a, e, r) {
  return e + (t - n) * (r - e) / (a - n);
}
function Ga(t) {
  return t * Ba;
}
function kt(t) {
  return t * $a;
}
function Va(t, n) {
  const a = new Fn();
  a.elements = t.matrix;
  const e = new Y(), r = new Un(), s = new Y();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), r.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const u = (d, p) => {
    var E;
    n.updateObject(t.uuid, d, p);
    const v = (E = n.scene) == null ? void 0 : E.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && Q(v, d, p);
  }, l = (d, p) => {
    u(d, Ga(p));
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
function Qt(t) {
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
function za(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const r = t.lightInfo[e];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: Qt(e),
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
        title: Qt(e),
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
function Ya(t, n) {
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
const xn = {
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
let ae = { ...xn };
function Wa(t) {
  const [n, a] = oe(-1);
  Fe(() => {
    function r(u) {
      ae = { ...u.value }, a(Date.now());
    }
    function s() {
      ae = { ...xn }, a(Date.now());
    }
    return _.addEventListener(j.SET_SCENE, s), _.addEventListener(j.SET_OBJECT, r), () => {
      _.removeEventListener(j.SET_SCENE, s), _.removeEventListener(j.SET_OBJECT, r);
    };
  }, []);
  const e = ae.type.toLowerCase();
  return /* @__PURE__ */ c.jsx(Bt, { label: "Inspector", children: /* @__PURE__ */ c.jsx("div", { id: "Inspector", className: t.class, children: ae.uuid.length > 0 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
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
      Va(ae, t.three),
      ae.animations.length > 0 ? Ya(ae, t.three) : null,
      e.search("camera") > -1 ? Ua(ae, t.three) : null,
      e.search("light") > -1 ? za(ae, t.three) : null,
      e.search("mesh") > -1 ? Fa(ae, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class fi extends Qn {
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
      /* @__PURE__ */ c.jsx(Bt, { label: e, open: !0, children: /* @__PURE__ */ c.jsx(c.Fragment, { children: a && /* @__PURE__ */ c.jsx(ka, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ c.jsx(Wa, { three: this.three })
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
    var x;
    if (!n())
      return;
    const { key: d, uuid: p, value: v } = l.value, E = (x = t.three.scene) == null ? void 0 : x.getObjectByProperty("uuid", p);
    if (E !== void 0)
      try {
        E[d](v);
      } catch (C) {
        console.log("Error requesting method:"), console.log(C), console.log(d), console.log(v);
      }
  };
  return Fe(() => (_.addEventListener(j.GET_OBJECT, a), _.addEventListener(j.UPDATE_OBJECT, r), _.addEventListener(j.CREATE_TEXTURE, s), _.addEventListener(j.REQUEST_METHOD, u), () => {
    _.removeEventListener(j.GET_OBJECT, a), _.removeEventListener(j.UPDATE_OBJECT, r), _.removeEventListener(j.CREATE_TEXTURE, s), _.removeEventListener(j.REQUEST_METHOD, u);
  }), []), null;
}
const en = { type: "change" }, At = { type: "start" }, tn = { type: "end" }, yt = new Bn(), nn = new $n(), Ha = Math.cos(70 * Gn.DEG2RAD);
class Ka extends sn {
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
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(en), e.update(), s = r.NONE;
    }, this.update = function() {
      const o = new Y(), y = new Wt().setFromUnitVectors(n.up, new Y(0, 1, 0)), A = y.clone().invert(), N = new Y(), te = new Wt(), be = new Y(), ue = 2 * Math.PI;
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
          Ae !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ae).add(e.object.position) : (yt.origin.copy(e.object.position), yt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(yt.direction)) < Ha ? n.lookAt(e.target) : (nn.setFromNormalAndCoplanarPoint(e.object.up, e.target), yt.intersectPlane(nn, e.target))));
        } else
          e.object.isOrthographicCamera && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / p)), e.object.updateProjectionMatrix(), Ve = !0);
        return p = 1, ee = !1, Ve || N.distanceToSquared(e.object.position) > u || 8 * (1 - te.dot(e.object.quaternion)) > u || be.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(en), N.copy(e.object.position), te.copy(e.object.quaternion), be.copy(e.target), !0) : !1;
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
    const u = 1e-6, l = new Ht(), d = new Ht();
    let p = 1;
    const v = new Y(), E = new de(), x = new de(), C = new de(), M = new de(), G = new de(), se = new de(), H = new de(), S = new de(), K = new de(), fe = new Y(), le = new de();
    let ee = !1;
    const f = [], m = {};
    function b(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function O(o) {
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
    function R(o) {
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
      M.set(o.clientX, o.clientY);
    }
    function ct(o) {
      x.set(o.clientX, o.clientY), C.subVectors(x, E).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      B(2 * Math.PI * C.x / y.clientHeight), $(2 * Math.PI * C.y / y.clientHeight), E.copy(x), e.update();
    }
    function Ot(o) {
      S.set(o.clientX, o.clientY), K.subVectors(S, H), K.y > 0 ? J(O(K.y)) : K.y < 0 && R(O(K.y)), H.copy(S), e.update();
    }
    function Tt(o) {
      G.set(o.clientX, o.clientY), se.subVectors(G, M).multiplyScalar(e.panSpeed), U(se.x, se.y), M.copy(G), e.update();
    }
    function qe(o) {
      I(o.clientX, o.clientY), o.deltaY < 0 ? R(O(o.deltaY)) : o.deltaY > 0 && J(O(o.deltaY)), e.update();
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
        M.set(o.pageX, o.pageY);
      else {
        const y = ve(o), A = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        M.set(A, N);
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
        x.set(o.pageX, o.pageY);
      else {
        const A = ve(o), N = 0.5 * (o.pageX + A.x), te = 0.5 * (o.pageY + A.y);
        x.set(N, te);
      }
      C.subVectors(x, E).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      B(2 * Math.PI * C.x / y.clientHeight), $(2 * Math.PI * C.y / y.clientHeight), E.copy(x);
    }
    function dt(o) {
      if (f.length === 1)
        G.set(o.pageX, o.pageY);
      else {
        const y = ve(o), A = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        G.set(A, N);
      }
      se.subVectors(G, M).multiplyScalar(e.panSpeed), U(se.x, se.y), M.copy(G);
    }
    function je(o) {
      const y = ve(o), A = o.pageX - y.x, N = o.pageY - y.y, te = Math.sqrt(A * A + N * N);
      S.set(0, te), K.set(0, Math.pow(S.y / H.y, e.zoomSpeed)), J(K.y), H.copy(S);
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
      gt(o), f.length === 0 && (e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", Se), e.domElement.removeEventListener("pointerup", ke)), e.dispatchEvent(tn), s = r.NONE;
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
      e.enabled === !1 || e.enableZoom === !1 || s !== r.NONE || (o.preventDefault(), e.dispatchEvent(At), qe(o), e.dispatchEvent(tn));
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
}, Ie = ea(function(n, a) {
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
}), an = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ne = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function Be(t, n) {
  const a = new un(-100, 100, 100, -100, 50, 3e3);
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
const rn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Xa = new Vn(), qa = new zn(), Za = new ja(), Ja = new Yn({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let Et = "Renderer";
const z = new dn();
z.name = "Debug Scene";
let xe = new dn();
z.add(xe);
const st = new Wn();
st.name = "helpers";
z.add(st);
const Qa = new Ra();
st.add(Qa);
const Cn = new fn(500);
Cn.name = "axisHelper";
st.add(Cn);
const ot = new fn(100);
ot.name = "interactionHelper";
st.add(ot);
ot.visible = !1;
let wt = !1, V = ne.get("Debug"), re = ne.get("Orthographic"), Ne = ne.get("Front"), Le = ne.get("Top"), on = !1;
function pi(t) {
  const [n, a] = oe(t.mode !== void 0 ? t.mode : "Single"), [e, r] = oe(null), [s, u] = oe(!1), [l, d] = oe(!1), [p, v] = oe(!1), [, E] = oe(Date.now()), x = Ce(null), C = Ce(null), M = Ce(null), G = Ce(null), se = Ce(null), H = Ce(null), S = (f, m) => {
    const b = ie.get(f.name);
    b !== void 0 && b.dispose(), ie.delete(f.name);
    const O = we.get(f.name);
    O !== void 0 && (z.remove(O), O.dispose()), we.delete(f.name);
    const B = new Ka(f, m);
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
      const $ = new Xn(f);
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
        S(V, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        S(V, M.current), S(re, G.current);
        break;
      case "Quad":
        S(V, M.current), S(re, G.current), S(Ne, se.current), S(Le, H.current);
        break;
    }
  };
  Fe(() => {
    const f = new Hn({
      canvas: x.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), r(f);
  }, []), Fe(() => {
    const f = (O) => {
      gn(xe), z.remove(xe);
      const B = t.scenes.get(O.value.name);
      if (B !== void 0) {
        const $ = new B();
        t.onSceneSet !== void 0 && t.onSceneSet($), xe = $, t.three.scene = xe, z.add(xe), on = !0;
      }
    }, m = (O) => {
      var F;
      const B = O.value, $ = (F = t.three.scene) == null ? void 0 : F.getObjectByProperty("uuid", B.uuid);
      $ !== void 0 && ne.set(B.name, $), E(Date.now());
    }, b = (O) => {
      ne.delete(O.value.name), E(Date.now());
    };
    return _.addEventListener(j.SET_SCENE, f), _.addEventListener(j.ADD_CAMERA, m), _.addEventListener(j.REMOVE_CAMERA, b), () => {
      _.removeEventListener(j.SET_SCENE, f), _.removeEventListener(j.ADD_CAMERA, m), _.removeEventListener(j.REMOVE_CAMERA, b);
    };
  }, []), Fe(() => {
    if (e === null)
      return;
    let f = window.innerWidth, m = window.innerHeight, b = Math.floor(f / 2), O = Math.floor(m / 2), B = -1;
    const $ = () => {
      f = window.innerWidth - 300, m = window.innerHeight, b = Math.floor(f / 2), O = Math.floor(m / 2), e.setSize(f, m);
      let R = f, I = m;
      switch (n) {
        case "Side by Side":
          R = b, I = m;
          break;
        case "Stacked":
          R = f, I = O;
          break;
        case "Quad":
          R = b, I = O;
          break;
      }
      ne.forEach((X) => {
        var me;
        X instanceof un ? (X.left = R / -2, X.right = R / 2, X.top = I / 2, X.bottom = I / -2, X.updateProjectionMatrix()) : X instanceof Dt && (X.aspect = R / I, X.updateProjectionMatrix(), (me = we.get(X.name)) == null || me.update());
      });
    }, F = () => {
      e.setViewport(0, 0, f, m), e.setScissor(0, 0, f, m), e.render(z, V);
    }, D = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, b, m), e.setScissor(0, 0, b, m), e.render(z, V), e.setViewport(b, 0, b, m), e.setScissor(b, 0, b, m), e.render(z, re);
      else {
        const R = m - O;
        e.setViewport(0, R, f, O), e.setScissor(0, R, f, O), e.render(z, V), e.setViewport(0, 0, f, O), e.setScissor(0, 0, f, O), e.render(z, re);
      }
    }, U = () => {
      let R = 0, I = 0;
      I = m - O, R = 0, e.setViewport(R, I, b, O), e.setScissor(R, I, b, O), e.render(z, V), R = b, e.setViewport(R, I, b, O), e.setScissor(R, I, b, O), e.render(z, re), I = 0, R = 0, e.setViewport(R, I, b, O), e.setScissor(R, I, b, O), e.render(z, Ne), R = b, e.setViewport(R, I, b, O), e.setScissor(R, I, b, O), e.render(z, Le);
    }, J = () => {
      switch (ie.forEach((R) => {
        R.update();
      }), t.onSceneUpdate !== void 0 && on && t.onSceneUpdate(xe), e.clear(), n) {
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
      const f = new Kn(), m = new de(), b = (F, D, U, J) => {
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
      }, O = (F) => {
        if (!wt)
          return;
        const D = new de();
        e.getSize(D);
        const U = Math.min(F.clientX, D.x), J = Math.min(F.clientY, D.y);
        m.x = Ke(U, 0, D.x, -1, 1), m.y = Ke(J, 0, D.y, 1, -1);
        const R = D.x / 2, I = D.y / 2, X = () => {
          U < R ? m.x = Ke(U, 0, R, -1, 1) : m.x = Ke(U, R, D.x, -1, 1);
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
        b(U, J, R, I);
        const Re = f.intersectObjects(xe.children);
        Re.length > 0 && ot.position.copy(Re[0].point);
      }, B = (F) => {
        if (!wt)
          return;
        const D = new de();
        if (e.getSize(D), F.clientX >= D.x)
          return;
        O(F);
        const U = f.intersectObjects(xe.children);
        U.length > 0 && t.three.getObject(U[0].object.uuid);
      }, $ = C.current;
      return $.addEventListener("mousemove", O, !1), $.addEventListener("click", B, !1), () => {
        $.removeEventListener("mousemove", O), $.removeEventListener("click", B);
      };
    }
  }, [n, e]);
  const ee = [];
  return ne.forEach((f, m) => {
    ee.push(m);
  }), /* @__PURE__ */ c.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ c.jsx("canvas", { ref: x }),
    /* @__PURE__ */ c.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: C, children: [
      n === "Single" && /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(Ie, { camera: V, options: ee, ref: M, onSelect: (f) => {
        var b;
        (b = ie.get(V.name)) == null || b.dispose();
        const m = ne.get(f);
        m !== void 0 && (K(V), V = m, S(m, M.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ie, { camera: V, options: ee, ref: M, onSelect: (f) => {
          var b;
          (b = ie.get(V.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(V), V = m, S(m, M.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: re, options: ee, ref: G, onSelect: (f) => {
          var b;
          (b = ie.get(re.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(re), re = m, S(m, G.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ie, { camera: V, options: ee, ref: M, onSelect: (f) => {
          var b;
          (b = ie.get(V.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(V), V = m, S(m, M.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: re, options: ee, ref: G, onSelect: (f) => {
          var b;
          (b = ie.get(re.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(re), re = m, S(m, G.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: Ne, options: ee, ref: se, onSelect: (f) => {
          var b;
          (b = ie.get(Ne.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(Ne), Ne = m, S(m, se.current));
        } }),
        /* @__PURE__ */ c.jsx(Ie, { camera: Le, options: ee, ref: H, onSelect: (f) => {
          var b;
          (b = ie.get(Le.name)) == null || b.dispose();
          const m = ne.get(f);
          m !== void 0 && (K(Le), Le = m, S(m, H.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ c.jsx(
        xt,
        {
          index: an.indexOf(n),
          options: an,
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
          index: rn.indexOf(Et),
          options: rn,
          onSelect: (f) => {
            if (f !== Et)
              switch (Et = f, Et) {
                case "Depth":
                  z.overrideMaterial = Xa;
                  break;
                case "Normals":
                  z.overrideMaterial = qa;
                  break;
                default:
                case "Renderer":
                  z.overrideMaterial = null;
                  break;
                case "Wireframe":
                  z.overrideMaterial = Ja;
                  break;
                case "UVs":
                  z.overrideMaterial = Za;
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
  Bt as Accordion,
  ui as Application,
  Ct as BaseRemote,
  wn as ChildObject,
  ka as ContainerObject,
  xa as Draggable,
  wa as DraggableItem,
  Ca as Dropdown,
  Sa as DropdownItem,
  mi as Editor,
  Ra as InfiniteGridHelper,
  Wa as Inspector,
  pi as MultiView,
  En as NavButton,
  oa as RemoteComponents,
  di as RemoteController,
  Ut as RemoteTheatre,
  ha as RemoteThree,
  yn as RemoteTweakpane,
  hi as SceneInspector,
  fi as SidePanel,
  j as ToolEvents,
  ja as UVMaterial,
  si as clamp,
  aa as colorToHex,
  _ as debugDispatcher,
  gn as dispose,
  ra as disposeMaterial,
  li as disposeTexture,
  ci as distance,
  mn as hierarchyUUID,
  na as isColor,
  ta as randomID,
  ia as resetThreeObjects,
  _t as round,
  It as totalThreeObjects
};
