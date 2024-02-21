var qn = Object.defineProperty;
var Kn = (t, n, a) => n in t ? qn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var F = (t, n, a) => (Kn(t, typeof n != "symbol" ? n + "" : n, a), a);
import { PositionalAudio as Xn, EventDispatcher as fn, Texture as hn, CubeTexture as Zn, RepeatWrapping as Zt, ShaderMaterial as pn, GLSL3 as Jn, DoubleSide as mn, Color as Pt, Mesh as Qn, PlaneGeometry as ea, FrontSide as ta, BackSide as na, NoBlending as aa, NormalBlending as ia, AdditiveBlending as ra, SubtractiveBlending as oa, MultiplyBlending as sa, CustomBlending as ca, AddEquation as la, SubtractEquation as ua, ReverseSubtractEquation as da, MinEquation as fa, MaxEquation as ha, ZeroFactor as vn, OneFactor as gn, SrcColorFactor as bn, OneMinusSrcColorFactor as yn, SrcAlphaFactor as En, OneMinusSrcAlphaFactor as Cn, DstAlphaFactor as xn, OneMinusDstAlphaFactor as Sn, DstColorFactor as wn, OneMinusDstColorFactor as On, SrcAlphaSaturateFactor as pa, ConstantColorFactor as Mn, OneMinusConstantColorFactor as Tn, ConstantAlphaFactor as Rn, OneMinusConstantAlphaFactor as Pn, Matrix4 as ma, Vector3 as Z, Euler as va, Ray as ga, Plane as ba, MathUtils as ya, MOUSE as He, TOUCH as We, Quaternion as Jt, Spherical as Qt, Vector2 as de, PerspectiveCamera as Gt, MeshDepthMaterial as Ea, MeshNormalMaterial as Ca, MeshBasicMaterial as xa, OrthographicCamera as An, Scene as kn, Group as Sa, AxesHelper as _n, WebGLRenderer as wa, Raycaster as Oa, CameraHelper as Ma } from "three";
import { getProject as Ta, createRafDriver as Ra } from "@theatre/core";
import ut from "@theatre/studio";
import { Pane as Pa } from "tweakpane";
import * as Aa from "@tweakpane/plugin-essentials";
import jn, { useState as le, useRef as Ce, useEffect as Be, Component as ka, forwardRef as _a } from "react";
import { Reorder as Dn } from "framer-motion";
function dt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Hi(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Wi(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function ja() {
  return Math.round(Math.random() * 1e6).toString();
}
function Da(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Ia(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), r = (l) => {
    const d = l.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, s = r(n), h = r(a), c = r(e);
  return "#" + s + h + c;
}
function Ut(t, n = 1) {
  return Number(t.toFixed(n));
}
let Vt = 0;
const La = () => {
  Vt = 0;
}, In = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Vt}`, Vt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    In(a);
  });
}, qi = (t) => {
  t == null || t.dispose();
}, Na = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, Ln = (t) => {
  var n;
  if (t) {
    for (; t.children.length > 0; ) {
      const a = t.children[0];
      a instanceof Xn ? (a.pause(), a.parent && a.parent.remove(a)) : Ln(a);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const a = t;
      (n = a.geometry) == null || n.dispose(), Na(a.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Ki {
  constructor(n, a, e = !0, r = "editor") {
    F(this, "components", /* @__PURE__ */ new Map());
    F(this, "listen");
    // Protected
    F(this, "_debugEnabled");
    F(this, "broadcastChannel");
    F(this, "webSocket");
    F(this, "_mode", "app");
    F(this, "_connected", !1);
    F(this, "useBC", !1);
    F(this, "messageHandler", (n) => {
      this.listen !== void 0 && (this.useBC ? this.listen(n.data) : this.listen(JSON.parse(n.data)));
    });
    F(this, "openHandler", () => {
      this._connected = !0;
    });
    F(this, "closeHandler", () => {
      this._connected = !1;
    });
    this.editor = a && document.location.hash.search(r) > -1, this._debugEnabled = a, a && (this.useBC = e, e ? (this.broadcastChannel = new BroadcastChannel(n), this.broadcastChannel.addEventListener("message", this.messageHandler)) : (this.webSocket = new WebSocket(n), this.webSocket.addEventListener("open", this.openHandler), this.webSocket.addEventListener("close", this.closeHandler), this.webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(n, a) {
    this.components.set(n, a);
  }
  dispose() {
    this.broadcastChannel !== void 0 && this.broadcastChannel.removeEventListener("message", this.messageHandler), this.webSocket !== void 0 && (this.webSocket.removeEventListener("open", this.openHandler), this.webSocket.removeEventListener("close", this.closeHandler), this.webSocket.removeEventListener("message", this.messageHandler)), this.components.forEach((n) => {
      n.dispose();
    }), this.components.clear();
  }
  // Remote
  send(n) {
    var a, e;
    this._mode !== n.target && (this.useBC ? (a = this.broadcastChannel) == null || a.postMessage(n) : this._connected && ((e = this.webSocket) == null || e.send(JSON.stringify(n))));
  }
  // Getters / Setters
  get connected() {
    return this._connected;
  }
  get debugEnabled() {
    return this._debugEnabled;
  }
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
const _ = new fn(), j = {
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
class At {
  constructor(n) {
    F(this, "app");
    this.app = n;
  }
  dispose() {
  }
}
class Fa extends At {
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
function Ba(t, n) {
  switch (n.event) {
    case "selectComponent":
      _.dispatchEvent({ type: j.SELECT_DROPDOWN, value: n.data });
      break;
    case "draggableListUpdate":
      _.dispatchEvent({ type: j.DRAG_UPDATE, value: n.data });
      break;
  }
}
const Nn = () => {
}, Xe = class Xe extends At {
  constructor() {
    super(...arguments);
    F(this, "project");
    F(this, "sheets", /* @__PURE__ */ new Map());
    F(this, "sheetObjects", /* @__PURE__ */ new Map());
    F(this, "sheetObjectCBs", /* @__PURE__ */ new Map());
    F(this, "sheetObjectUnsubscribe", /* @__PURE__ */ new Map());
  }
  init(a, e) {
    return this.project = Ta(a, e), this.project.ready;
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
  playSheet(a, e) {
    var r;
    (r = this.sheet(a)) == null || r.sequence.play(e), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: a,
        value: e
      }
    });
  }
  pauseSheet(a) {
    var e;
    (e = this.sheet(a)) == null || e.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: a
      }
    });
  }
  clearSheetObjects(a) {
    this.sheetObjects.forEach((e, r) => {
      r.search(`${a}_`) > -1 && this.unsubscribe(e);
    });
  }
  sheetObject(a, e, r, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const h = this.sheet(a);
    if (h === void 0)
      return;
    const c = `${a}_${e}`;
    let l = this.sheetObjects.get(c);
    l !== void 0 ? l = h.object(e, { ...r, ...l.value }, { reconfigure: !0 }) : l = h.object(e, r), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, s !== void 0 ? s : Nn);
    const d = l.onValuesChange((b) => {
      if (this.app.editor) {
        for (const E in b) {
          const S = b[E];
          typeof S == "object" && Da(S) && (b[E] = {
            r: S.r,
            g: S.g,
            b: S.b,
            a: S.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: a,
            sheetObject: c,
            values: b
          }
        });
      }
      const m = this.sheetObjectCBs.get(c);
      m !== void 0 && m(b);
    });
    return this.sheetObjectUnsubscribe.set(c, d), l;
  }
  unsubscribe(a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = a.address.sheetId, r = a.address.objectKey, s = this.sheets.get(e);
    s == null || s.detachObject(r);
    const h = `${e}_${r}`, c = this.sheetObjectUnsubscribe.get(h);
    c !== void 0 && (this.sheetObjects.delete(h), this.sheetObjectCBs.delete(h), this.sheetObjectUnsubscribe.delete(h), c());
  }
  static getRafDriver() {
    return Xe.rafDriver || (Xe.rafDriver = Ra()), Xe.rafDriver;
  }
};
F(Xe, "rafDriver", null);
let Ze = Xe, Oe;
function Ua(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Ze) {
      let e;
      const r = a;
      switch (n.event) {
        case "setSheet":
          e = r.sheets.get(n.data.sheet), e !== void 0 && (Oe = e, ut.setSelection([e]));
          break;
        case "setSheetObject":
          e = r.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), e !== void 0 && ut.setSelection([e]);
          break;
        case "updateSheetObject":
          e = r.sheets.get(n.data.sheet), e !== void 0 && e.sequence.pause(), e = r.sheetObjectCBs.get(n.data.sheetObject), e !== void 0 && e(n.data.values);
          break;
        case "updateTimeline":
          e = r.sheets.get(n.data.sheet), Oe !== void 0 && (Oe.sequence.position = n.data.position);
          break;
      }
    }
  });
}
function $a(t) {
  if (t.editor) {
    let n;
    t.components.forEach((s) => {
      s instanceof Ze && (n = s);
    }), ut.ui.restore(), ut.onSelectionChange((s) => {
      s.length < 1 || s.forEach((h) => {
        let c = h.address.sheetId, l = "setSheet", d = {};
        switch (h.type) {
          case "Theatre_Sheet_PublicAPI":
            l = "setSheet", d = {
              sheet: h.address.sheetId
            }, Oe = n.sheets.get(h.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            l = "setSheetObject", c += `_${h.address.objectKey}`, d = {
              id: c,
              sheet: h.address.sheetId,
              key: h.address.objectKey
            };
            break;
        }
        t.send({ event: l, target: "app", data: d });
      });
    });
    let a = 0;
    const e = () => {
      if (Oe !== void 0 && a !== Oe.sequence.position) {
        a = Oe.sequence.position;
        const s = Oe;
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
    ut.ui.hide();
}
function za(t, n) {
  t.editor && t.components.forEach((a) => {
    var e, r;
    if (a instanceof Ze) {
      const s = a;
      switch (n.event) {
        case "playSheet":
          (e = s.sheet(n.data.sheet)) == null || e.sequence.play(n.data.value);
          break;
        case "pauseSheet":
          (r = s.sheet(n.data.sheet)) == null || r.sequence.pause();
          break;
      }
      return;
    }
  });
}
function Ya(t) {
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
function Fn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(Fn(a));
  }), n;
}
function Ga(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Va(t) {
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
function qe(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Va(a))
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
            if (r instanceof hn) {
              const s = r.source.toJSON();
              n[a] = { src: s.url };
            } else
              r instanceof Zn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Ga(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function $t(t) {
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
        r.push(qe(s));
      }), n.material = r;
    } else
      n.material = qe(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((s) => {
        r.push(qe(s));
      }), n.material = r;
    } else
      n.material = qe(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((s) => {
        r.push(qe(s));
      }), n.material = r;
    } else
      n.material = qe(e.material);
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
function Ha(t, n) {
  const a = n.split(".");
  switch (a.length) {
    case 1:
      return t[a[0]];
    case 2:
      return t[a[0]][a[1]];
    case 3:
      return t[a[0]][a[1]][a[2]];
    case 4:
      return t[a[0]][a[1]][a[2]][a[3]];
    case 5:
      return t[a[0]][a[1]][a[2]][a[3]][a[4]];
    case 6:
      return t[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]];
  }
}
function ne(t, n, a) {
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
function Ht(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const r = new hn(e);
      r.wrapS = Zt, r.wrapT = Zt, r.needsUpdate = !0, n(r);
    }, e.onerror = a, e.src = t;
  });
}
class Wa extends At {
  constructor() {
    super(...arguments);
    F(this, "scene");
  }
  getObject(a) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: a
    });
  }
  setObject(a) {
    const e = $t(a);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: e
    });
  }
  requestMethod(a, e, r, s) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: a,
        key: e,
        value: r,
        subitem: s
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
    if (a === void 0 || (this.scene = a, !this.app.debugEnabled))
      return;
    La(), In(this.scene);
    const e = Fn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: e
    });
  }
  addCamera(a) {
    if (!this.app.debugEnabled)
      return;
    const e = $t(a);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: e
    });
  }
  removeCamera(a) {
    if (!this.app.debugEnabled)
      return;
    const e = $t(a);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: e
    });
  }
}
function qa(t, n) {
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
function Ka(t, n) {
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
class Bn extends At {
  constructor(a) {
    super(a);
    F(this, "bindCBs");
    F(this, "buttonCBs");
    F(this, "pane");
    F(this, "appCallbacks", 0);
    F(this, "editorCallbacks", 0);
    F(this, "inspectorFolder");
    this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), a.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Pa({ title: "GUI" }), this.pane.registerPlugin(Aa);
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
    const h = this.bindID, c = r.onChange !== void 0 ? r.onChange : Nn;
    this.bindCBs.set(h, c), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(a, e, r).on("change", (d) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: h,
          value: d.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: h,
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
function Xa(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Bn) {
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
var Wt = { exports: {} }, ot = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var en;
function Za() {
  if (en)
    return ot;
  en = 1;
  var t = jn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(c, l, d) {
    var b, m = {}, E = null, S = null;
    d !== void 0 && (E = "" + d), l.key !== void 0 && (E = "" + l.key), l.ref !== void 0 && (S = l.ref);
    for (b in l)
      e.call(l, b) && !s.hasOwnProperty(b) && (m[b] = l[b]);
    if (c && c.defaultProps)
      for (b in l = c.defaultProps, l)
        m[b] === void 0 && (m[b] = l[b]);
    return { $$typeof: n, type: c, key: E, ref: S, props: m, _owner: r.current };
  }
  return ot.Fragment = a, ot.jsx = h, ot.jsxs = h, ot;
}
var st = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tn;
function Ja() {
  return tn || (tn = 1, process.env.NODE_ENV !== "production" && function() {
    var t = jn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), x = Symbol.iterator, T = "@@iterator";
    function W(i) {
      if (i === null || typeof i != "object")
        return null;
      var p = x && i[x] || i[T];
      return typeof p == "function" ? p : null;
    }
    var I = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(i) {
      {
        for (var p = arguments.length, g = new Array(p > 1 ? p - 1 : 0), O = 1; O < p; O++)
          g[O - 1] = arguments[O];
        G("error", i, g);
      }
    }
    function G(i, p, g) {
      {
        var O = I.ReactDebugCurrentFrame, D = O.getStackAddendum();
        D !== "" && (p += "%s", g = g.concat([D]));
        var $ = g.map(function(k) {
          return String(k);
        });
        $.unshift("Warning: " + p), Function.prototype.apply.call(console[i], console, $);
      }
    }
    var he = !1, te = !1, ae = !1, f = !1, v = !1, C;
    C = Symbol.for("react.module.reference");
    function A(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || v || i === r || i === d || i === b || f || i === S || he || te || ae || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === m || i.$$typeof === h || i.$$typeof === c || i.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === C || i.getModuleId !== void 0));
    }
    function Y(i, p, g) {
      var O = i.displayName;
      if (O)
        return O;
      var D = p.displayName || p.name || "";
      return D !== "" ? g + "(" + D + ")" : g;
    }
    function z(i) {
      return i.displayName || "Context";
    }
    function B(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case d:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case c:
            var p = i;
            return z(p) + ".Consumer";
          case h:
            var g = i;
            return z(g._context) + ".Provider";
          case l:
            return Y(i, i.render, "ForwardRef");
          case m:
            var O = i.displayName || null;
            return O !== null ? O : B(i.type) || "Memo";
          case E: {
            var D = i, $ = D._payload, k = D._init;
            try {
              return B(k($));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, q = 0, K, R, U, Q, fe, xe, pt;
    function Je() {
    }
    Je.__reactDisabledLog = !0;
    function _t() {
      {
        if (q === 0) {
          K = console.log, R = console.info, U = console.warn, Q = console.error, fe = console.group, xe = console.groupCollapsed, pt = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Je,
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
        q++;
      }
    }
    function jt() {
      {
        if (q--, q === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, i, {
              value: K
            }),
            info: L({}, i, {
              value: R
            }),
            warn: L({}, i, {
              value: U
            }),
            error: L({}, i, {
              value: Q
            }),
            group: L({}, i, {
              value: fe
            }),
            groupCollapsed: L({}, i, {
              value: xe
            }),
            groupEnd: L({}, i, {
              value: pt
            })
          });
        }
        q < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Qe = I.ReactCurrentDispatcher, et;
    function ze(i, p, g) {
      {
        if (et === void 0)
          try {
            throw Error();
          } catch (D) {
            var O = D.stack.trim().match(/\n( *(at )?)/);
            et = O && O[1] || "";
          }
        return `
` + et + i;
      }
    }
    var Ye = !1, Me;
    {
      var mt = typeof WeakMap == "function" ? WeakMap : Map;
      Me = new mt();
    }
    function vt(i, p) {
      if (!i || Ye)
        return "";
      {
        var g = Me.get(i);
        if (g !== void 0)
          return g;
      }
      var O;
      Ye = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $;
      $ = Qe.current, Qe.current = null, _t();
      try {
        if (p) {
          var k = function() {
            throw Error();
          };
          if (Object.defineProperty(k.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(k, []);
            } catch (be) {
              O = be;
            }
            Reflect.construct(i, [], k);
          } else {
            try {
              k.call();
            } catch (be) {
              O = be;
            }
            i.call(k.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (be) {
            O = be;
          }
          i();
        }
      } catch (be) {
        if (be && O && typeof be.stack == "string") {
          for (var P = be.stack.split(`
`), ue = O.stack.split(`
`), J = P.length - 1, ee = ue.length - 1; J >= 1 && ee >= 0 && P[J] !== ue[ee]; )
            ee--;
          for (; J >= 1 && ee >= 0; J--, ee--)
            if (P[J] !== ue[ee]) {
              if (J !== 1 || ee !== 1)
                do
                  if (J--, ee--, ee < 0 || P[J] !== ue[ee]) {
                    var ve = `
` + P[J].replace(" at new ", " at ");
                    return i.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", i.displayName)), typeof i == "function" && Me.set(i, ve), ve;
                  }
                while (J >= 1 && ee >= 0);
              break;
            }
        }
      } finally {
        Ye = !1, Qe.current = $, jt(), Error.prepareStackTrace = D;
      }
      var Ve = i ? i.displayName || i.name : "", Xt = Ve ? ze(Ve) : "";
      return typeof i == "function" && Me.set(i, Xt), Xt;
    }
    function Dt(i, p, g) {
      return vt(i, !1);
    }
    function gt(i) {
      var p = i.prototype;
      return !!(p && p.isReactComponent);
    }
    function Te(i, p, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return vt(i, gt(i));
      if (typeof i == "string")
        return ze(i);
      switch (i) {
        case d:
          return ze("Suspense");
        case b:
          return ze("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case l:
            return Dt(i.render);
          case m:
            return Te(i.type, p, g);
          case E: {
            var O = i, D = O._payload, $ = O._init;
            try {
              return Te($(D), p, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Re = Object.prototype.hasOwnProperty, bt = {}, yt = I.ReactDebugCurrentFrame;
    function Pe(i) {
      if (i) {
        var p = i._owner, g = Te(i.type, i._source, p ? p.type : null);
        yt.setExtraStackFrame(g);
      } else
        yt.setExtraStackFrame(null);
    }
    function tt(i, p, g, O, D) {
      {
        var $ = Function.call.bind(Re);
        for (var k in i)
          if ($(i, k)) {
            var P = void 0;
            try {
              if (typeof i[k] != "function") {
                var ue = Error((O || "React class") + ": " + g + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ue.name = "Invariant Violation", ue;
              }
              P = i[k](p, k, O, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (J) {
              P = J;
            }
            P && !(P instanceof Error) && (Pe(D), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", g, k, typeof P), Pe(null)), P instanceof Error && !(P.message in bt) && (bt[P.message] = !0, Pe(D), w("Failed %s type: %s", g, P.message), Pe(null));
          }
      }
    }
    var Ae = Array.isArray;
    function nt(i) {
      return Ae(i);
    }
    function It(i) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, g = p && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function Et(i) {
      try {
        return Ct(i), !1;
      } catch {
        return !0;
      }
    }
    function Ct(i) {
      return "" + i;
    }
    function xt(i) {
      if (Et(i))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", It(i)), Ct(i);
    }
    var Se = I.ReactCurrentOwner, at = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, it, St, Ge;
    Ge = {};
    function Lt(i) {
      if (Re.call(i, "ref")) {
        var p = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Nt(i) {
      if (Re.call(i, "key")) {
        var p = Object.getOwnPropertyDescriptor(i, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function wt(i, p) {
      if (typeof i.ref == "string" && Se.current && p && Se.current.stateNode !== p) {
        var g = B(Se.current.type);
        Ge[g] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', B(Se.current.type), i.ref), Ge[g] = !0);
      }
    }
    function we(i, p) {
      {
        var g = function() {
          it || (it = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Kt(i, p) {
      {
        var g = function() {
          St || (St = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var o = function(i, p, g, O, D, $, k) {
      var P = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: p,
        ref: g,
        props: k,
        // Record the component responsible for creating this element.
        _owner: $
      };
      return P._store = {}, Object.defineProperty(P._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(P, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: O
      }), Object.defineProperty(P, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: D
      }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
    };
    function y(i, p, g, O, D) {
      {
        var $, k = {}, P = null, ue = null;
        g !== void 0 && (xt(g), P = "" + g), Nt(p) && (xt(p.key), P = "" + p.key), Lt(p) && (ue = p.ref, wt(p, D));
        for ($ in p)
          Re.call(p, $) && !at.hasOwnProperty($) && (k[$] = p[$]);
        if (i && i.defaultProps) {
          var J = i.defaultProps;
          for ($ in J)
            k[$] === void 0 && (k[$] = J[$]);
        }
        if (P || ue) {
          var ee = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          P && we(k, ee), ue && Kt(k, ee);
        }
        return o(i, P, ue, D, O, Se.current, k);
      }
    }
    var M = I.ReactCurrentOwner, N = I.ReactDebugCurrentFrame;
    function X(i) {
      if (i) {
        var p = i._owner, g = Te(i.type, i._source, p ? p.type : null);
        N.setExtraStackFrame(g);
      } else
        N.setExtraStackFrame(null);
    }
    var pe;
    pe = !1;
    function oe(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function Ft() {
      {
        if (M.current) {
          var i = B(M.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Bt(i) {
      {
        if (i !== void 0) {
          var p = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + p + ":" + g + ".";
        }
        return "";
      }
    }
    var rt = {};
    function ge(i) {
      {
        var p = Ft();
        if (!p) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (p = `

Check the top-level render call using <` + g + ">.");
        }
        return p;
      }
    }
    function me(i, p) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = ge(p);
        if (rt[g])
          return;
        rt[g] = !0;
        var O = "";
        i && i._owner && i._owner !== M.current && (O = " It was passed a child from " + B(i._owner.type) + "."), X(i), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, O), X(null);
      }
    }
    function ke(i, p) {
      {
        if (typeof i != "object")
          return;
        if (nt(i))
          for (var g = 0; g < i.length; g++) {
            var O = i[g];
            oe(O) && me(O, p);
          }
        else if (oe(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var D = W(i);
          if (typeof D == "function" && D !== i.entries)
            for (var $ = D.call(i), k; !(k = $.next()).done; )
              oe(k.value) && me(k.value, p);
        }
      }
    }
    function _e(i) {
      {
        var p = i.type;
        if (p == null || typeof p == "string")
          return;
        var g;
        if (typeof p == "function")
          g = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === m))
          g = p.propTypes;
        else
          return;
        if (g) {
          var O = B(p);
          tt(g, i.props, "prop", O, i);
        } else if (p.PropTypes !== void 0 && !pe) {
          pe = !0;
          var D = B(p);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function je(i) {
      {
        for (var p = Object.keys(i.props), g = 0; g < p.length; g++) {
          var O = p[g];
          if (O !== "children" && O !== "key") {
            X(i), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), X(null);
            break;
          }
        }
        i.ref !== null && (X(i), w("Invalid attribute `ref` supplied to `React.Fragment`."), X(null));
      }
    }
    function De(i, p, g, O, D, $) {
      {
        var k = A(i);
        if (!k) {
          var P = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ue = Bt(D);
          ue ? P += ue : P += Ft();
          var J;
          i === null ? J = "null" : nt(i) ? J = "array" : i !== void 0 && i.$$typeof === n ? (J = "<" + (B(i.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : J = typeof i, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, P);
        }
        var ee = y(i, p, g, D, $);
        if (ee == null)
          return ee;
        if (k) {
          var ve = p.children;
          if (ve !== void 0)
            if (O)
              if (nt(ve)) {
                for (var Ve = 0; Ve < ve.length; Ve++)
                  ke(ve[Ve], i);
                Object.freeze && Object.freeze(ve);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(ve, i);
        }
        return i === e ? je(ee) : _e(ee), ee;
      }
    }
    function Gn(i, p, g) {
      return De(i, p, g, !0);
    }
    function Vn(i, p, g) {
      return De(i, p, g, !1);
    }
    var Hn = Vn, Wn = Gn;
    st.Fragment = e, st.jsx = Hn, st.jsxs = Wn;
  }()), st;
}
process.env.NODE_ENV === "production" ? Wt.exports = Za() : Wt.exports = Ja();
var u = Wt.exports;
function Un(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ u.jsx("button", { children: t.title });
}
const Qa = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), ei = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function ti(t) {
  return /* @__PURE__ */ u.jsx(Dn.Item, { value: t.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    ei,
    /* @__PURE__ */ u.jsx("span", { children: t.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Qa })
  ] }) }, t.title);
}
function ni(t) {
  const [n, a] = le(!1), [e, r] = le(t.options), s = (d) => {
    t.onDragComplete(d), r(d);
  }, h = (d) => {
    const b = [...e];
    b.splice(d, 1), s(b);
  }, c = [];
  e.forEach((d, b) => {
    c.push(/* @__PURE__ */ u.jsx(ti, { index: b, title: d, onDelete: h }, d));
  });
  let l = "dropdown draggable";
  return t.subdropdown && (l += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: l, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ u.jsx(Un, { title: t.title }),
    /* @__PURE__ */ u.jsx(Dn.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function ai(t) {
  const [n, a] = le(!1), e = [];
  t.options.map((s, h) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ u.jsx(ii, { option: s }, h));
  });
  let r = "dropdown";
  return t.subdropdown && (r += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ u.jsx(Un, { title: t.title }),
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
function ii(t) {
  const { option: n } = t, [a, e] = le("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ u.jsx(
        ni,
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
      r = /* @__PURE__ */ u.jsx(
        ai,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      r = /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("li", { className: a === n.title ? "selected" : "", children: r }, ja());
}
function Xi(t) {
  const n = [], a = [];
  t.components.forEach((s) => {
    s instanceof Fa ? n.push(Ba) : s instanceof Ze ? (n.push(Ua), a.push(za), $a(t)) : s instanceof Wa ? (n.push(qa), a.push(Ka)) : s instanceof Bn && n.push(Xa);
  });
  function e(s) {
    switch (n.forEach((h) => h(t, s)), s.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: s.data });
        break;
    }
  }
  function r(s) {
    switch (a.forEach((h) => h(t, s)), s.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: s.data });
        break;
    }
  }
  t.listen = (s) => {
    s.target === "editor" ? r(s) : e(s);
  };
}
const ri = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, oi = `out vec4 fragColor;
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
class si extends pn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Jn,
      side: mn,
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
      vertexShader: ri,
      fragmentShader: oi,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ci extends Qn {
  constructor() {
    const a = new si();
    super(new ea(2, 2), a);
    F(this, "gridMaterial");
    this.gridMaterial = a, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const li = `#include <common>
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
}`, ui = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class di extends pn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: li,
      fragmentShader: ui
    });
  }
}
function qt(t) {
  const [n, a] = le(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          t.onToggle !== void 0 && t.onToggle(r), a(r);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: dt(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: t.children }) })
  ] });
}
function $n(t) {
  const [n, a] = le(!1), e = t.child.children.length > 0, r = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    r.push(/* @__PURE__ */ u.jsx($n, { child: s, three: t.three }, Math.random()));
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
            a(!n);
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
            t.three.getObject(t.child.uuid), n || a(!0);
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${Ya(t.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: r }) })
  ] }, Math.random());
}
function fi(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ u.jsx($n, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const hi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function pi(t) {
  return "items" in t;
}
function Ue(t) {
  const n = [];
  return t.items.forEach((a) => {
    pi(a) ? n.push(
      /* @__PURE__ */ u.jsx(Ue, { title: dt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ u.jsx(
        lt,
        {
          title: a.title,
          prop: a.prop,
          value: a.value,
          type: a.type,
          min: a.min,
          max: a.max,
          step: a.step,
          disabled: a.disabled,
          options: a.options,
          onChange: (e, r) => {
            a.onChange !== void 0 && a.onChange(e, r);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ u.jsx(qt, { label: t.title, open: t.expanded === !0, children: n });
}
function mi(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Ie(t) {
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
    case "blendAlpha":
      return "Blend Alpha";
    case "blendColor":
      return "Blend Color";
    case "blendDst":
      return "Blend Dst";
    case "blendDstAlpha":
      return "Blend Dst Alha";
    case "blendEquation":
      return "Blend Equation";
    case "blendEquationAlpha":
      return "Blend Equation Alpha";
    case "blending":
      return "Blending";
    case "blendSrc":
      return "Blend Src";
    case "blendSrcAlpha":
      return "Blend Src Alpha";
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
    case "side":
      return "Side";
    case "size":
      return "Size";
    case "sizeAttenuation":
      return "Size Attenuation";
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
function vi(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function gi() {
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
const bi = [
  {
    title: "Front",
    value: ta
  },
  {
    title: "Back",
    value: na
  },
  {
    title: "Double",
    value: mn
  }
], yi = [
  {
    title: "No Blending",
    value: aa
  },
  {
    title: "Normal",
    value: ia
  },
  {
    title: "Additive",
    value: ra
  },
  {
    title: "Subtractive",
    value: oa
  },
  {
    title: "Multiply",
    value: sa
  },
  {
    title: "Custom",
    value: ca
  }
], Ei = [
  {
    title: "Add",
    value: la
  },
  {
    title: "Subtract",
    value: ua
  },
  {
    title: "Reverse Subtract",
    value: da
  },
  {
    title: "Min",
    value: fa
  },
  {
    title: "Max",
    value: ha
  }
], Ci = [
  {
    title: "Zero",
    valye: vn
  },
  {
    title: "One",
    valye: gn
  },
  {
    title: "Src Color",
    valye: bn
  },
  {
    title: "One Minus Src Color",
    valye: yn
  },
  {
    title: "Src Alpha",
    valye: En
  },
  {
    title: "One Minus Src Alpha",
    valye: Cn
  },
  {
    title: "Dst Alpha",
    valye: xn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Sn
  },
  {
    title: "Dst Color",
    valye: wn
  },
  {
    title: "One Minus Dst Color",
    valye: On
  },
  {
    title: "Src Alpha Saturate",
    valye: pa
  },
  {
    title: "Constant Color",
    valye: Mn
  },
  {
    title: "One Minus Constant Color",
    valye: Tn
  },
  {
    title: "Constant Alpha",
    valye: Rn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Pn
  }
], xi = [
  {
    title: "Zero",
    valye: vn
  },
  {
    title: "One",
    valye: gn
  },
  {
    title: "Src Color",
    valye: bn
  },
  {
    title: "One Minus Src Color",
    valye: yn
  },
  {
    title: "Src Alpha",
    valye: En
  },
  {
    title: "One Minus Src Alpha",
    valye: Cn
  },
  {
    title: "Dst Alpha",
    valye: xn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Sn
  },
  {
    title: "Dst Color",
    valye: wn
  },
  {
    title: "One Minus Dst Color",
    valye: On
  },
  {
    title: "Constant Color",
    valye: Mn
  },
  {
    title: "One Minus Constant Color",
    valye: Tn
  },
  {
    title: "Constant Alpha",
    valye: Rn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Pn
  }
];
function ct(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function nn(t, n, a) {
  const e = [];
  for (const r in t) {
    if (!mi(r))
      continue;
    const s = typeof t[r], h = t[r];
    if (s === "boolean" || s === "number" || s === "string") {
      const c = {
        title: Ie(r),
        prop: r,
        type: s,
        value: h,
        min: void 0,
        max: void 0,
        needsUpdate: s === "boolean",
        onChange: (d, b) => {
          var E;
          a.updateObject(n.uuid, `material.${d}`, b), c.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const m = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
          m !== void 0 && ne(m, `material.${d}`, b);
        }
      };
      switch (r) {
        case "blending":
          ct(c, yi);
          break;
        case "blendDst":
          ct(c, xi);
          break;
        case "blendEquation":
          ct(c, Ei);
          break;
        case "blendSrc":
          ct(c, Ci);
          break;
        case "side":
          ct(c, bi);
          break;
      }
      vi(r) && (c.value = Number(h), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const l = s === "string" && (r === "vertexShader" || r === "fragmentShader");
      l && (c.disabled = !1, c.latest = c.value, c.onChange = (d, b) => {
        c.latest = b;
      }), e.push(c), l && e.push({
        title: `${dt(r)} - Update`,
        type: "button",
        onChange: () => {
          var b;
          a.updateObject(n.uuid, `material.${r}`, c.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const d = (b = a.scene) == null ? void 0 : b.getObjectByProperty("uuid", n.uuid);
          d !== void 0 && (ne(d, `material.${r}`, c.latest), d.material.needsUpdate = !0);
        }
      });
    } else if (s === "object")
      if (h.isColor)
        e.push({
          title: Ie(r),
          prop: r,
          type: "color",
          value: h,
          onChange: (c, l) => {
            var m;
            const d = new Pt(l);
            a.updateObject(n.uuid, `material.${c}`, d);
            const b = (m = a.scene) == null ? void 0 : m.getObjectByProperty("uuid", n.uuid);
            b !== void 0 && ne(b, `material.${c}`, d);
          }
        });
      else if (Array.isArray(h)) {
        const c = [];
        for (const l in h)
          c.push({
            title: `${l}`,
            type: `${typeof h[l]}`,
            value: h[l],
            onChange: (d, b) => {
              var E;
              a.updateObject(n.uuid, `material.${r}`, b);
              const m = (E = a.scene) == null ? void 0 : E.getObjectByProperty("uuid", n.uuid);
              m !== void 0 && ne(m, `material.${r}`, b);
            }
          });
        e.push({
          title: Ie(r),
          items: c
        });
      } else {
        const c = [];
        for (const l in h) {
          const d = h[l];
          switch (typeof d) {
            case "boolean":
            case "number":
            case "string":
              l === "src" ? e.push({
                title: Ie(r),
                type: "image",
                value: d,
                onChange: (m, E) => {
                  var x;
                  a.createTexture(n.uuid, `material.${r}`, E);
                  const S = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && Ht(E).then((T) => {
                    ne(S, `material.${r}`, T), ne(S, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${Ie(l)}`,
                prop: `material.${r}.${l}`,
                type: `${typeof t[r][l]}`,
                value: h[l],
                onChange: (m, E) => {
                  var x;
                  a.updateObject(n.uuid, `material.${r}.${l}`, E);
                  const S = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && ne(S, `material.${r}.${l}`, E);
                }
              });
              break;
            case "object":
              if (d.value !== void 0 && d.value.src !== void 0)
                c.push({
                  title: Ie(l),
                  type: "image",
                  value: d.value.src,
                  onChange: (m, E) => {
                    var x;
                    a.createTexture(n.uuid, `material.${r}.${l}.value`, h);
                    const S = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
                    S !== void 0 && Ht(E).then((T) => {
                      ne(S, `material.${r}.${l}.value`, T);
                    });
                  }
                });
              else if (r === "uniforms") {
                const m = d.value, E = (S, x, T) => ({
                  title: S,
                  type: "number",
                  value: T,
                  step: 0.01,
                  onChange: (W, I) => {
                    var he;
                    const w = `material.uniforms.${l}.value.${x}`;
                    a.updateObject(n.uuid, w, I);
                    const G = (he = a.scene) == null ? void 0 : he.getObjectByProperty("uuid", n.uuid);
                    G !== void 0 && ne(G, w, I);
                  }
                });
                if (typeof d.value == "number")
                  c.push({
                    title: l,
                    type: "number",
                    value: d.value,
                    onChange: (S, x) => {
                      var I;
                      const T = `material.${r}.${S}.value`;
                      a.updateObject(n.uuid, T, x);
                      const W = (I = a.scene) == null ? void 0 : I.getObjectByProperty("uuid", n.uuid);
                      W !== void 0 && ne(W, T, x);
                    }
                  });
                else if (m.r !== void 0 && m.g !== void 0 && m.b !== void 0)
                  c.push({
                    title: l,
                    type: "color",
                    value: d.value,
                    onChange: (S, x) => {
                      var w;
                      const T = new Pt(x), W = `material.${r}.${S}.value`;
                      a.updateObject(n.uuid, W, T);
                      const I = (w = a.scene) == null ? void 0 : w.getObjectByProperty("uuid", n.uuid);
                      I !== void 0 && ne(I, W, T);
                    }
                  });
                else if (m.x !== void 0 && m.y !== void 0 && m.z === void 0 && m.w === void 0)
                  c.push(
                    {
                      title: l,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y)
                      ]
                    }
                  );
                else if (m.x !== void 0 && m.y !== void 0 && m.z !== void 0 && m.w === void 0)
                  c.push(
                    {
                      title: l,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y),
                        E("Z", "z", d.value.z)
                      ]
                    }
                  );
                else if (m.x !== void 0 && m.y !== void 0 && m.z !== void 0 && m.w !== void 0)
                  c.push(
                    {
                      title: l,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y),
                        E("Z", "z", d.value.z),
                        E("W", "w", d.value.w)
                      ]
                    }
                  );
                else if (m.elements !== void 0) {
                  const S = m.elements, x = [];
                  for (let T = 0; T < S.length; T++)
                    x.push(E(T.toString(), T.toString(), S[T]));
                  c.push(
                    {
                      title: l,
                      items: x
                    }
                  );
                } else
                  console.log(">>> need to add this format:", l, m);
              } else
                c.push({
                  title: l,
                  type: `${typeof d.value}`,
                  value: d.value,
                  onChange: (m, E) => {
                    var x;
                    a.updateObject(n.uuid, `material.${r}.${l}.value`, E);
                    const S = (x = a.scene) == null ? void 0 : x.getObjectByProperty("uuid", n.uuid);
                    S !== void 0 && ne(S, `material.${r}.${l}.value`, E);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: Ie(r),
          items: c
        });
      }
    else
      h !== void 0 && console.log("other:", r, s, h);
  }
  return e.sort((r, s) => r.title < s.title ? -1 : r.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Si(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], r = a.length;
    for (let s = 0; s < r; s++)
      e.push(
        /* @__PURE__ */ u.jsx(
          Ue,
          {
            title: `Material ${s}`,
            items: nn(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: e });
  } else
    return /* @__PURE__ */ u.jsx(
      Ue,
      {
        title: "Material",
        items: nn(a, t, n)
      }
    );
}
function lt(t) {
  var b;
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Ia(t.value));
  const [a, e] = le(n), r = Ce(null), s = Ce(null), h = Ce(null);
  Be(() => {
    var he;
    let m = !1, E = -1, S = 0, x = Number(a);
    const T = (te) => {
      m = !0, S = x, E = te.clientX;
    }, W = (te) => {
      if (!m)
        return;
      const ae = t.step !== void 0 ? t.step : 1, f = (te.clientX - E) * ae;
      x = Number((S + f).toFixed(4)), s.current !== null && (s.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, I = () => {
      m = !1;
    }, w = () => {
      m = !1;
    }, G = t.type === "number";
    return G && ((he = r.current) == null || he.addEventListener("mousedown", T, !1), document.addEventListener("mouseup", I, !1), document.addEventListener("mousemove", W, !1), document.addEventListener("contextmenu", w, !1)), () => {
      var te;
      G && ((te = r.current) == null || te.removeEventListener("mousedown", T), document.removeEventListener("mouseup", I), document.removeEventListener("mousemove", W), document.removeEventListener("contextmenu", w));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), l = c || t.type === "image", d = (m) => {
    let E = m.target.value;
    t.type === "boolean" ? E = m.target.checked : t.type === "option" && (E = t.options[E].value), e(E), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, E);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${l ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: r, children: dt(t.title) }, "fieldLabel"),
    t.type === "string" && !c && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: d,
        value: a
      }
    ),
    t.type === "string" && c && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: d,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: d,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ u.jsx(
      "input",
      {
        ref: s,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        disabled: t.disabled,
        onChange: d
      }
    ),
    t.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: t.disabled, className: "min" }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: d
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: a, onChange: d, disabled: t.disabled })
    ] }),
    t.type === "button" && /* @__PURE__ */ u.jsx(
      "button",
      {
        disabled: t.disabled,
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ u.jsx("img", { ref: h, onClick: () => {
      gi().then((m) => {
        h.current.src = m, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, m);
      });
    }, src: a.length > 0 ? a : hi }),
    t.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: d, disabled: t.disabled, defaultValue: t.value, children: (b = t.options) == null ? void 0 : b.map((m, E) => /* @__PURE__ */ u.jsx("option", { value: m.value, children: dt(m.title) }, E)) }) })
  ] });
}
function an(t) {
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
function wi(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: an(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var c;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (ne(h, r, s), h.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: an(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, s) => {
          var c;
          n.updateObject(t.uuid, r, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (ne(h, r, s), h.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ u.jsx(
    Ue,
    {
      title: "Camera",
      items: a
    }
  );
}
const Oi = Math.PI / 180, Mi = 180 / Math.PI;
function Ke(t, n, a, e, r) {
  return e + (t - n) * (r - e) / (a - n);
}
function Ti(t) {
  return t * Oi;
}
function zt(t) {
  return t * Mi;
}
function Ri(t, n) {
  const a = new ma();
  a.elements = t.matrix;
  const e = new Z(), r = new va(), s = new Z();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), r.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const h = (l, d) => {
    var m;
    n.updateObject(t.uuid, l, d);
    const b = (m = n.scene) == null ? void 0 : m.getObjectByProperty("uuid", t.uuid);
    b !== void 0 && ne(b, l, d);
  }, c = (l, d) => {
    h(l, Ti(d));
  };
  return /* @__PURE__ */ u.jsx(
    Ue,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: h
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: h
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: h
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: Ut(zt(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Ut(zt(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Ut(zt(r.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: s.x,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: h
        }
      ]
    }
  );
}
function rn(t) {
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
function Pi(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const r = t.lightInfo[e];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: rn(e),
        prop: e,
        type: "color",
        value: r,
        onChange: (s, h) => {
          var d;
          const c = new Pt(h);
          n.updateObject(t.uuid, s, c);
          const l = (d = n.scene) == null ? void 0 : d.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && ne(l, s, c);
        }
      }) : a.push({
        title: rn(e),
        prop: e,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (s, h) => {
          var l;
          n.updateObject(t.uuid, s, h);
          const c = (l = n.scene) == null ? void 0 : l.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && ne(c, s, h);
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Ue,
    {
      title: "Light",
      items: a
    }
  );
}
function Ai(t, n) {
  var c;
  const a = [], e = [];
  let r = 0;
  t.animations.forEach((l) => {
    r = Math.max(r, l.duration), l.duration > 0 && e.push({
      title: l.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: l.duration,
          disabled: !0
        },
        {
          title: "Blend Mode",
          type: "option",
          disabled: !0,
          options: [
            {
              title: "Normal",
              value: 2500
            },
            {
              title: "Additive",
              value: 2501
            }
          ]
        }
      ]
    });
  }), a.push({
    title: "Animations",
    items: e
  });
  const s = (c = n.scene) == null ? void 0 : c.getObjectByProperty("uuid", t.uuid);
  let h = !1;
  if (s !== void 0) {
    const l = s.mixer;
    if (h = l !== void 0, h) {
      const d = [
        {
          title: "Time Scale",
          type: "range",
          value: l.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (b, m) => {
            l.timeScale = m, n.updateObject(t.uuid, "mixer.timeScale", m);
          }
        }
      ];
      d.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          l.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: d
      });
    }
  }
  return /* @__PURE__ */ u.jsx(Ue, { title: "Animation", items: a });
}
const zn = {
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
let ie = { ...zn };
function ki(t) {
  const [n, a] = le(-1);
  Be(() => {
    function h(l) {
      ie = { ...l.value }, a(Date.now());
    }
    function c() {
      ie = { ...zn }, a(Date.now());
    }
    return _.addEventListener(j.SET_SCENE, c), _.addEventListener(j.SET_OBJECT, h), () => {
      _.removeEventListener(j.SET_SCENE, c), _.removeEventListener(j.SET_OBJECT, h);
    };
  }, []);
  const e = ie.type.toLowerCase(), r = ie.animations.length > 0 || ie.mixer !== void 0, s = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ u.jsx(qt, { label: "Inspector", children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: t.class, children: ie.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        lt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ie.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        lt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ie.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        lt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ie.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        lt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: ie.visible,
          onChange: (h, c) => {
            var d;
            t.three.updateObject(ie.uuid, h, c);
            const l = (d = t.three.scene) == null ? void 0 : d.getObjectByProperty("uuid", ie.uuid);
            l !== void 0 && ne(l, h, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      Ri(ie, t.three),
      r ? Ai(ie, t.three) : null,
      e.search("camera") > -1 ? wi(ie, t.three) : null,
      e.search("light") > -1 ? Pi(ie, t.three) : null,
      s ? Si(ie, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class Zi extends ka {
  constructor(a) {
    super(a);
    F(this, "three");
    // Private
    F(this, "setScene", (a) => {
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
    return /* @__PURE__ */ u.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(qt, { label: e, open: !0, children: /* @__PURE__ */ u.jsx(u.Fragment, { children: a && /* @__PURE__ */ u.jsx(fi, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ u.jsx(ki, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Ji(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (c) => {
    var d;
    if (!n())
      return;
    const l = (d = t.three.scene) == null ? void 0 : d.getObjectByProperty("uuid", c.value);
    l !== void 0 && t.three.setObject(l);
  }, e = (c, l, d) => {
    var m;
    if (!n())
      return;
    const b = (m = t.three.scene) == null ? void 0 : m.getObjectByProperty("uuid", c);
    b !== void 0 && ne(b, l, d);
  }, r = (c) => {
    if (!n())
      return;
    const l = c.value, { key: d, value: b, uuid: m } = l;
    e(m, d, b);
  }, s = (c) => {
    if (!n())
      return;
    const l = c.value;
    Ht(l.value).then((d) => {
      e(l.uuid, l.key, d), e(l.uuid, "material.needsUpdate", !0);
    });
  }, h = (c) => {
    var S;
    if (!n())
      return;
    const { key: l, uuid: d, value: b, subitem: m } = c.value, E = (S = t.three.scene) == null ? void 0 : S.getObjectByProperty("uuid", d);
    if (E !== void 0)
      try {
        m !== void 0 ? Ha(E, m)[l](b) : E[l](b);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(l), console.log(b);
      }
  };
  return Be(() => (_.addEventListener(j.GET_OBJECT, a), _.addEventListener(j.UPDATE_OBJECT, r), _.addEventListener(j.CREATE_TEXTURE, s), _.addEventListener(j.REQUEST_METHOD, h), () => {
    _.removeEventListener(j.GET_OBJECT, a), _.removeEventListener(j.UPDATE_OBJECT, r), _.removeEventListener(j.CREATE_TEXTURE, s), _.removeEventListener(j.REQUEST_METHOD, h);
  }), []), null;
}
const on = { type: "change" }, Yt = { type: "start" }, sn = { type: "end" }, Ot = new ga(), cn = new ba(), _i = Math.cos(70 * ya.DEG2RAD);
class ji extends fn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Z(), this.cursor = new Z(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: He.ROTATE, MIDDLE: He.DOLLY, RIGHT: He.PAN }, this.touches = { ONE: We.ROTATE, TWO: We.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", at), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", at), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(on), e.update(), s = r.NONE;
    }, this.update = function() {
      const o = new Z(), y = new Jt().setFromUnitVectors(n.up, new Z(0, 1, 0)), M = y.clone().invert(), N = new Z(), X = new Jt(), pe = new Z(), oe = 2 * Math.PI;
      return function(Bt = null) {
        const rt = e.object.position;
        o.copy(rt).sub(e.target), o.applyQuaternion(y), c.setFromVector3(o), e.autoRotate && s === r.NONE && z(A(Bt)), e.enableDamping ? (c.theta += l.theta * e.dampingFactor, c.phi += l.phi * e.dampingFactor) : (c.theta += l.theta, c.phi += l.phi);
        let ge = e.minAzimuthAngle, me = e.maxAzimuthAngle;
        isFinite(ge) && isFinite(me) && (ge < -Math.PI ? ge += oe : ge > Math.PI && (ge -= oe), me < -Math.PI ? me += oe : me > Math.PI && (me -= oe), ge <= me ? c.theta = Math.max(ge, Math.min(me, c.theta)) : c.theta = c.theta > (ge + me) / 2 ? Math.max(ge, c.theta) : Math.min(me, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(b, e.dampingFactor) : e.target.add(b), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && ae || e.object.isOrthographicCamera ? c.radius = fe(c.radius) : c.radius = fe(c.radius * d), o.setFromSpherical(c), o.applyQuaternion(M), rt.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (l.theta *= 1 - e.dampingFactor, l.phi *= 1 - e.dampingFactor, b.multiplyScalar(1 - e.dampingFactor)) : (l.set(0, 0, 0), b.set(0, 0, 0));
        let ke = !1;
        if (e.zoomToCursor && ae) {
          let _e = null;
          if (e.object.isPerspectiveCamera) {
            const je = o.length();
            _e = fe(je * d);
            const De = je - _e;
            e.object.position.addScaledVector(he, De), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const je = new Z(te.x, te.y, 0);
            je.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix(), ke = !0;
            const De = new Z(te.x, te.y, 0);
            De.unproject(e.object), e.object.position.sub(De).add(je), e.object.updateMatrixWorld(), _e = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          _e !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(_e).add(e.object.position) : (Ot.origin.copy(e.object.position), Ot.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Ot.direction)) < _i ? n.lookAt(e.target) : (cn.setFromNormalAndCoplanarPoint(e.object.up, e.target), Ot.intersectPlane(cn, e.target))));
        } else
          e.object.isOrthographicCamera && (ke = d !== 1, ke && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix()));
        return d = 1, ae = !1, ke || N.distanceToSquared(e.object.position) > h || 8 * (1 - X.dot(e.object.quaternion)) > h || pe.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(on), N.copy(e.object.position), X.copy(e.object.quaternion), pe.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ge), e.domElement.removeEventListener("pointerdown", Pe), e.domElement.removeEventListener("pointercancel", Ae), e.domElement.removeEventListener("wheel", Et), e.domElement.removeEventListener("pointermove", tt), e.domElement.removeEventListener("pointerup", Ae), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", at), e._domElementKeyEvents = null);
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
    const h = 1e-6, c = new Qt(), l = new Qt();
    let d = 1;
    const b = new Z(), m = new de(), E = new de(), S = new de(), x = new de(), T = new de(), W = new de(), I = new de(), w = new de(), G = new de(), he = new Z(), te = new de();
    let ae = !1;
    const f = [], v = {};
    let C = !1;
    function A(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Y(o) {
      const y = Math.abs(o * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function z(o) {
      l.theta -= o;
    }
    function B(o) {
      l.phi -= o;
    }
    const L = function() {
      const o = new Z();
      return function(M, N) {
        o.setFromMatrixColumn(N, 0), o.multiplyScalar(-M), b.add(o);
      };
    }(), q = function() {
      const o = new Z();
      return function(M, N) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(N, 1) : (o.setFromMatrixColumn(N, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(M), b.add(o);
      };
    }(), K = function() {
      const o = new Z();
      return function(M, N) {
        const X = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const pe = e.object.position;
          o.copy(pe).sub(e.target);
          let oe = o.length();
          oe *= Math.tan(e.object.fov / 2 * Math.PI / 180), L(2 * M * oe / X.clientHeight, e.object.matrix), q(2 * N * oe / X.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (L(M * (e.object.right - e.object.left) / e.object.zoom / X.clientWidth, e.object.matrix), q(N * (e.object.top - e.object.bottom) / e.object.zoom / X.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function R(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function U(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Q(o, y) {
      if (!e.zoomToCursor)
        return;
      ae = !0;
      const M = e.domElement.getBoundingClientRect(), N = o - M.left, X = y - M.top, pe = M.width, oe = M.height;
      te.x = N / pe * 2 - 1, te.y = -(X / oe) * 2 + 1, he.set(te.x, te.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function fe(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function xe(o) {
      m.set(o.clientX, o.clientY);
    }
    function pt(o) {
      Q(o.clientX, o.clientX), I.set(o.clientX, o.clientY);
    }
    function Je(o) {
      x.set(o.clientX, o.clientY);
    }
    function _t(o) {
      E.set(o.clientX, o.clientY), S.subVectors(E, m).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      z(2 * Math.PI * S.x / y.clientHeight), B(2 * Math.PI * S.y / y.clientHeight), m.copy(E), e.update();
    }
    function jt(o) {
      w.set(o.clientX, o.clientY), G.subVectors(w, I), G.y > 0 ? R(Y(G.y)) : G.y < 0 && U(Y(G.y)), I.copy(w), e.update();
    }
    function Qe(o) {
      T.set(o.clientX, o.clientY), W.subVectors(T, x).multiplyScalar(e.panSpeed), K(W.x, W.y), x.copy(T), e.update();
    }
    function et(o) {
      Q(o.clientX, o.clientY), o.deltaY < 0 ? U(Y(o.deltaY)) : o.deltaY > 0 && R(Y(o.deltaY)), e.update();
    }
    function ze(o) {
      let y = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? B(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : K(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? B(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : K(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? z(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : K(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? z(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : K(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (o.preventDefault(), e.update());
    }
    function Ye(o) {
      if (f.length === 1)
        m.set(o.pageX, o.pageY);
      else {
        const y = we(o), M = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        m.set(M, N);
      }
    }
    function Me(o) {
      if (f.length === 1)
        x.set(o.pageX, o.pageY);
      else {
        const y = we(o), M = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        x.set(M, N);
      }
    }
    function mt(o) {
      const y = we(o), M = o.pageX - y.x, N = o.pageY - y.y, X = Math.sqrt(M * M + N * N);
      I.set(0, X);
    }
    function vt(o) {
      e.enableZoom && mt(o), e.enablePan && Me(o);
    }
    function Dt(o) {
      e.enableZoom && mt(o), e.enableRotate && Ye(o);
    }
    function gt(o) {
      if (f.length == 1)
        E.set(o.pageX, o.pageY);
      else {
        const M = we(o), N = 0.5 * (o.pageX + M.x), X = 0.5 * (o.pageY + M.y);
        E.set(N, X);
      }
      S.subVectors(E, m).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      z(2 * Math.PI * S.x / y.clientHeight), B(2 * Math.PI * S.y / y.clientHeight), m.copy(E);
    }
    function Te(o) {
      if (f.length === 1)
        T.set(o.pageX, o.pageY);
      else {
        const y = we(o), M = 0.5 * (o.pageX + y.x), N = 0.5 * (o.pageY + y.y);
        T.set(M, N);
      }
      W.subVectors(T, x).multiplyScalar(e.panSpeed), K(W.x, W.y), x.copy(T);
    }
    function Re(o) {
      const y = we(o), M = o.pageX - y.x, N = o.pageY - y.y, X = Math.sqrt(M * M + N * N);
      w.set(0, X), G.set(0, Math.pow(w.y / I.y, e.zoomSpeed)), R(G.y), I.copy(w);
      const pe = (o.pageX + y.x) * 0.5, oe = (o.pageY + y.y) * 0.5;
      Q(pe, oe);
    }
    function bt(o) {
      e.enableZoom && Re(o), e.enablePan && Te(o);
    }
    function yt(o) {
      e.enableZoom && Re(o), e.enableRotate && gt(o);
    }
    function Pe(o) {
      e.enabled !== !1 && (f.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", tt), e.domElement.addEventListener("pointerup", Ae)), Lt(o), o.pointerType === "touch" ? it(o) : nt(o));
    }
    function tt(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? St(o) : It(o));
    }
    function Ae(o) {
      switch (Nt(o), f.length) {
        case 0:
          e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", tt), e.domElement.removeEventListener("pointerup", Ae), e.dispatchEvent(sn), s = r.NONE;
          break;
        case 1:
          const y = f[0], M = v[y];
          it({ pointerId: y, pageX: M.x, pageY: M.y });
          break;
      }
    }
    function nt(o) {
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
        case He.DOLLY:
          if (e.enableZoom === !1)
            return;
          pt(o), s = r.DOLLY;
          break;
        case He.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            Je(o), s = r.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            xe(o), s = r.ROTATE;
          }
          break;
        case He.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            xe(o), s = r.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Je(o), s = r.PAN;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(Yt);
    }
    function It(o) {
      switch (s) {
        case r.ROTATE:
          if (e.enableRotate === !1)
            return;
          _t(o);
          break;
        case r.DOLLY:
          if (e.enableZoom === !1)
            return;
          jt(o);
          break;
        case r.PAN:
          if (e.enablePan === !1)
            return;
          Qe(o);
          break;
      }
    }
    function Et(o) {
      e.enabled === !1 || e.enableZoom === !1 || s !== r.NONE || (o.preventDefault(), e.dispatchEvent(Yt), et(Ct(o)), e.dispatchEvent(sn));
    }
    function Ct(o) {
      const y = o.deltaMode, M = {
        clientX: o.clientX,
        clientY: o.clientY,
        deltaY: o.deltaY
      };
      switch (y) {
        case 1:
          M.deltaY *= 16;
          break;
        case 2:
          M.deltaY *= 100;
          break;
      }
      return o.ctrlKey && !C && (M.deltaY *= 10), M;
    }
    function xt(o) {
      o.key === "Control" && (C = !0, e.domElement.getRootNode().addEventListener("keyup", Se, { passive: !0, capture: !0 }));
    }
    function Se(o) {
      o.key === "Control" && (C = !1, e.domElement.getRootNode().removeEventListener("keyup", Se, { passive: !0, capture: !0 }));
    }
    function at(o) {
      e.enabled === !1 || e.enablePan === !1 || ze(o);
    }
    function it(o) {
      switch (wt(o), f.length) {
        case 1:
          switch (e.touches.ONE) {
            case We.ROTATE:
              if (e.enableRotate === !1)
                return;
              Ye(o), s = r.TOUCH_ROTATE;
              break;
            case We.PAN:
              if (e.enablePan === !1)
                return;
              Me(o), s = r.TOUCH_PAN;
              break;
            default:
              s = r.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case We.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              vt(o), s = r.TOUCH_DOLLY_PAN;
              break;
            case We.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Dt(o), s = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = r.NONE;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && e.dispatchEvent(Yt);
    }
    function St(o) {
      switch (wt(o), s) {
        case r.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          gt(o), e.update();
          break;
        case r.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Te(o), e.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          bt(o), e.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          yt(o), e.update();
          break;
        default:
          s = r.NONE;
      }
    }
    function Ge(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function Lt(o) {
      f.push(o.pointerId);
    }
    function Nt(o) {
      delete v[o.pointerId];
      for (let y = 0; y < f.length; y++)
        if (f[y] == o.pointerId) {
          f.splice(y, 1);
          return;
        }
    }
    function wt(o) {
      let y = v[o.pointerId];
      y === void 0 && (y = new de(), v[o.pointerId] = y), y.set(o.pageX, o.pageY);
    }
    function we(o) {
      const y = o.pointerId === f[0] ? f[1] : f[0];
      return v[y];
    }
    e.domElement.addEventListener("contextmenu", Ge), e.domElement.addEventListener("pointerdown", Pe), e.domElement.addEventListener("pointercancel", Ae), e.domElement.addEventListener("wheel", Et, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", xt, { passive: !0, capture: !0 }), this.update();
  }
}
const Rt = (t) => {
  const [n, a] = le(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, r = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ u.jsx("li", { onClick: () => r(s), children: s }, s)) })
  ] });
}, Le = _a(function(n, a) {
  const [e, r] = le(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && r(!1);
    } }),
    /* @__PURE__ */ u.jsx(
      Rt,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (h) => {
          r(h);
        },
        up: !0
      }
    )
  ] });
}), ln = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], re = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map();
function $e(t, n) {
  const a = new An(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), re.set(t, a), a;
}
$e("Top", new Z(0, 1e3, 0));
$e("Bottom", new Z(0, -1e3, 0));
$e("Left", new Z(-1e3, 0, 0));
$e("Right", new Z(1e3, 0, 0));
$e("Front", new Z(0, 0, 1e3));
$e("Back", new Z(0, 0, -1e3));
$e("Orthographic", new Z(1e3, 1e3, 1e3));
const kt = new Gt(60, 1, 50, 3e3);
kt.name = "Debug";
kt.position.set(500, 500, 500);
kt.lookAt(0, 0, 0);
re.set("Debug", kt);
const un = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Di = new Ea(), Ii = new Ca(), Li = new di(), Ni = new xa({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let Mt = "Renderer";
const H = new kn();
H.name = "Debug Scene";
let Ee = new kn();
H.add(Ee);
const ht = new Sa();
ht.name = "helpers";
H.add(ht);
const Fi = new ci();
ht.add(Fi);
const Yn = new _n(500);
Yn.name = "axisHelper";
ht.add(Yn);
const ft = new _n(100);
ft.name = "interactionHelper";
ht.add(ft);
ft.visible = !1;
let Tt = !1, V = re.get("Debug"), ce = re.get("Orthographic"), Ne = re.get("Front"), Fe = re.get("Top"), dn = !1;
function Qi(t) {
  const [n, a] = le(t.mode !== void 0 ? t.mode : "Single"), [e, r] = le(null), [s, h] = le(!1), [c, l] = le(!1), [d, b] = le(!1), [, m] = le(Date.now()), E = Ce(null), S = Ce(null), x = Ce(null), T = Ce(null), W = Ce(null), I = Ce(null), w = (f, v) => {
    const C = se.get(f.name);
    C !== void 0 && C.dispose(), se.delete(f.name);
    const A = ye.get(f.name);
    A !== void 0 && (H.remove(A), A.dispose()), ye.delete(f.name);
    const Y = new ji(f, v);
    switch (Y.enableDamping = !0, Y.dampingFactor = 0.05, f.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        Y.enableRotate = !1;
        break;
    }
    if (se.set(f.name, Y), f instanceof Gt) {
      const z = new Ma(f);
      ye.set(f.name, z), H.add(z);
    }
  }, G = (f) => {
    const v = ye.get(f.name);
    v !== void 0 && (H.remove(v), v.dispose(), ye.delete(f.name));
    const C = se.get(f.name);
    C !== void 0 && (C.dispose(), se.delete(f.name));
  }, he = () => {
    se.forEach((f, v) => {
      f.dispose();
      const C = ye.get(v);
      C !== void 0 && (H.remove(C), C.dispose()), ye.delete(v), se.delete(v);
    }), se.clear(), ye.clear();
  }, te = () => {
    switch (n) {
      case "Single":
        w(V, x.current);
        break;
      case "Side by Side":
      case "Stacked":
        w(V, x.current), w(ce, T.current);
        break;
      case "Quad":
        w(V, x.current), w(ce, T.current), w(Ne, W.current), w(Fe, I.current);
        break;
    }
  };
  Be(() => {
    const f = new wa({
      canvas: E.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), r(f);
  }, []), Be(() => {
    const f = (A) => {
      Ln(Ee), H.remove(Ee);
      const Y = t.scenes.get(A.value.name);
      if (Y !== void 0) {
        const z = new Y();
        t.onSceneSet !== void 0 && t.onSceneSet(z), Ee = z, t.three.scene = Ee, H.add(Ee), dn = !0;
      }
    }, v = (A) => {
      var B;
      const Y = A.value, z = (B = t.three.scene) == null ? void 0 : B.getObjectByProperty("uuid", Y.uuid);
      z !== void 0 && re.set(Y.name, z), m(Date.now());
    }, C = (A) => {
      re.delete(A.value.name), m(Date.now());
    };
    return _.addEventListener(j.SET_SCENE, f), _.addEventListener(j.ADD_CAMERA, v), _.addEventListener(j.REMOVE_CAMERA, C), () => {
      _.removeEventListener(j.SET_SCENE, f), _.removeEventListener(j.ADD_CAMERA, v), _.removeEventListener(j.REMOVE_CAMERA, C);
    };
  }, []), Be(() => {
    if (e === null)
      return;
    let f = window.innerWidth, v = window.innerHeight, C = Math.floor(f / 2), A = Math.floor(v / 2), Y = -1;
    const z = () => {
      f = window.innerWidth - 300, v = window.innerHeight, C = Math.floor(f / 2), A = Math.floor(v / 2), e.setSize(f, v);
      let R = f, U = v;
      switch (n) {
        case "Side by Side":
          R = C, U = v;
          break;
        case "Stacked":
          R = f, U = A;
          break;
        case "Quad":
          R = C, U = A;
          break;
      }
      re.forEach((Q) => {
        var fe;
        Q instanceof An ? (Q.left = R / -2, Q.right = R / 2, Q.top = U / 2, Q.bottom = U / -2, Q.updateProjectionMatrix()) : Q instanceof Gt && (Q.aspect = R / U, Q.updateProjectionMatrix(), (fe = ye.get(Q.name)) == null || fe.update());
      });
    }, B = () => {
      e.setViewport(0, 0, f, v), e.setScissor(0, 0, f, v), e.render(H, V);
    }, L = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, C, v), e.setScissor(0, 0, C, v), e.render(H, V), e.setViewport(C, 0, C, v), e.setScissor(C, 0, C, v), e.render(H, ce);
      else {
        const R = v - A;
        e.setViewport(0, R, f, A), e.setScissor(0, R, f, A), e.render(H, V), e.setViewport(0, 0, f, A), e.setScissor(0, 0, f, A), e.render(H, ce);
      }
    }, q = () => {
      let R = 0, U = 0;
      U = v - A, R = 0, e.setViewport(R, U, C, A), e.setScissor(R, U, C, A), e.render(H, V), R = C, e.setViewport(R, U, C, A), e.setScissor(R, U, C, A), e.render(H, ce), U = 0, R = 0, e.setViewport(R, U, C, A), e.setScissor(R, U, C, A), e.render(H, Ne), R = C, e.setViewport(R, U, C, A), e.setScissor(R, U, C, A), e.render(H, Fe);
    }, K = () => {
      switch (se.forEach((R) => {
        R.update();
      }), t.onSceneUpdate !== void 0 && dn && t.onSceneUpdate(Ee), e.clear(), n) {
        case "Single":
          B();
          break;
        case "Side by Side":
        case "Stacked":
          L();
          break;
        case "Quad":
          q();
          break;
      }
      Y = requestAnimationFrame(K);
    };
    return te(), window.addEventListener("resize", z), z(), K(), () => {
      window.removeEventListener("resize", z), cancelAnimationFrame(Y), Y = -1;
    };
  }, [n, e]), Be(() => {
    if (e !== null) {
      const f = new Oa(), v = new de(), C = (B, L, q, K) => {
        switch (n) {
          case "Quad":
            B < q ? L < K ? f.setFromCamera(v, V) : f.setFromCamera(v, Ne) : L < K ? f.setFromCamera(v, ce) : f.setFromCamera(v, Fe);
            break;
          case "Side by Side":
            B < q ? f.setFromCamera(v, V) : f.setFromCamera(v, ce);
            break;
          case "Single":
            f.setFromCamera(v, V);
            break;
          case "Stacked":
            L < K ? f.setFromCamera(v, V) : f.setFromCamera(v, ce);
            break;
        }
      }, A = (B) => {
        if (!Tt)
          return;
        const L = new de();
        e.getSize(L);
        const q = Math.min(B.clientX, L.x), K = Math.min(B.clientY, L.y);
        v.x = Ke(q, 0, L.x, -1, 1), v.y = Ke(K, 0, L.y, 1, -1);
        const R = L.x / 2, U = L.y / 2, Q = () => {
          q < R ? v.x = Ke(q, 0, R, -1, 1) : v.x = Ke(q, R, L.x, -1, 1);
        }, fe = () => {
          K < U ? v.y = Ke(K, 0, U, 1, -1) : v.y = Ke(K, U, L.y, 1, -1);
        };
        switch (n) {
          case "Quad":
            Q(), fe();
            break;
          case "Side by Side":
            Q();
            break;
          case "Stacked":
            fe(), fe();
            break;
        }
        C(q, K, R, U);
        const xe = f.intersectObjects(Ee.children);
        xe.length > 0 && ft.position.copy(xe[0].point);
      }, Y = (B) => {
        if (!Tt)
          return;
        const L = new de();
        if (e.getSize(L), B.clientX >= L.x)
          return;
        A(B);
        const q = f.intersectObjects(Ee.children);
        q.length > 0 && t.three.getObject(q[0].object.uuid);
      }, z = S.current;
      return z.addEventListener("mousemove", A, !1), z.addEventListener("click", Y, !1), () => {
        z.removeEventListener("mousemove", A), z.removeEventListener("click", Y);
      };
    }
  }, [n, e]);
  const ae = [];
  return re.forEach((f, v) => {
    ae.push(v);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsx("canvas", { ref: E }),
    /* @__PURE__ */ u.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: S, children: [
      n === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(Le, { camera: V, options: ae, ref: x, onSelect: (f) => {
        var C;
        (C = se.get(V.name)) == null || C.dispose();
        const v = re.get(f);
        v !== void 0 && (G(V), V = v, w(v, x.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Le, { camera: V, options: ae, ref: x, onSelect: (f) => {
          var C;
          (C = se.get(V.name)) == null || C.dispose();
          const v = re.get(f);
          v !== void 0 && (G(V), V = v, w(v, x.current));
        } }),
        /* @__PURE__ */ u.jsx(Le, { camera: ce, options: ae, ref: T, onSelect: (f) => {
          var C;
          (C = se.get(ce.name)) == null || C.dispose();
          const v = re.get(f);
          v !== void 0 && (G(ce), ce = v, w(v, T.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx(Le, { camera: V, options: ae, ref: x, onSelect: (f) => {
          var C;
          (C = se.get(V.name)) == null || C.dispose();
          const v = re.get(f);
          v !== void 0 && (G(V), V = v, w(v, x.current));
        } }),
        /* @__PURE__ */ u.jsx(Le, { camera: ce, options: ae, ref: T, onSelect: (f) => {
          var C;
          (C = se.get(ce.name)) == null || C.dispose();
          const v = re.get(f);
          v !== void 0 && (G(ce), ce = v, w(v, T.current));
        } }),
        /* @__PURE__ */ u.jsx(Le, { camera: Ne, options: ae, ref: W, onSelect: (f) => {
          var C;
          (C = se.get(Ne.name)) == null || C.dispose();
          const v = re.get(f);
          v !== void 0 && (G(Ne), Ne = v, w(v, W.current));
        } }),
        /* @__PURE__ */ u.jsx(Le, { camera: Fe, options: ae, ref: I, onSelect: (f) => {
          var C;
          (C = se.get(Fe.name)) == null || C.dispose();
          const v = re.get(f);
          v !== void 0 && (G(Fe), Fe = v, w(v, I.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ u.jsx(
        Rt,
        {
          index: ln.indexOf(n),
          options: ln,
          onSelect: (f) => {
            f !== n && (he(), a(f));
          },
          open: s,
          onToggle: (f) => {
            h(f), c && l(!1), d && b(!1);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        Rt,
        {
          index: un.indexOf(Mt),
          options: un,
          onSelect: (f) => {
            if (f !== Mt)
              switch (Mt = f, Mt) {
                case "Depth":
                  H.overrideMaterial = Di;
                  break;
                case "Normals":
                  H.overrideMaterial = Ii;
                  break;
                default:
                case "Renderer":
                  H.overrideMaterial = null;
                  break;
                case "Wireframe":
                  H.overrideMaterial = Ni;
                  break;
                case "UVs":
                  H.overrideMaterial = Li;
                  break;
              }
          },
          open: c,
          onToggle: (f) => {
            s && h(!1), l(f), d && b(!1);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        Rt,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (f) => {
            Tt = f === "Selection Mode", ft.visible = Tt;
          },
          open: d,
          onToggle: (f) => {
            s && h(!1), c && l(!1), b(f);
          }
        }
      )
    ] })
  ] });
}
function er(t) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ u.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ u.jsx("footer", { children: t.footer })
  ] });
}
export {
  qt as Accordion,
  Ki as Application,
  At as BaseRemote,
  $n as ChildObject,
  fi as ContainerObject,
  ni as Draggable,
  ti as DraggableItem,
  ai as Dropdown,
  ii as DropdownItem,
  er as Editor,
  ci as InfiniteGridHelper,
  ki as Inspector,
  Qi as MultiView,
  Un as NavButton,
  Fa as RemoteComponents,
  Xi as RemoteController,
  Ze as RemoteTheatre,
  Wa as RemoteThree,
  Bn as RemoteTweakpane,
  Ji as SceneInspector,
  Zi as SidePanel,
  j as ToolEvents,
  di as UVMaterial,
  dt as capitalize,
  Hi as clamp,
  Ia as colorToHex,
  _ as debugDispatcher,
  Ln as dispose,
  Na as disposeMaterial,
  qi as disposeTexture,
  Wi as distance,
  In as hierarchyUUID,
  Da as isColor,
  ja as randomID,
  La as resetThreeObjects,
  Ut as round,
  Vt as totalThreeObjects
};
