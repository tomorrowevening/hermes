import { PositionalAudio as jn, EventDispatcher as tn, Texture as nn, CubeTexture as Dn, RepeatWrapping as Ut, Color as St, FrontSide as In, BackSide as Ln, DoubleSide as an, NoBlending as Nn, NormalBlending as Fn, AdditiveBlending as Bn, SubtractiveBlending as Un, MultiplyBlending as $n, CustomBlending as zn, AddEquation as Yn, SubtractEquation as Gn, ReverseSubtractEquation as Vn, MinEquation as Hn, MaxEquation as Wn, ZeroFactor as rn, OneFactor as sn, SrcColorFactor as on, OneMinusSrcColorFactor as cn, SrcAlphaFactor as ln, OneMinusSrcAlphaFactor as un, DstAlphaFactor as dn, OneMinusDstAlphaFactor as fn, DstColorFactor as hn, OneMinusDstColorFactor as pn, SrcAlphaSaturateFactor as qn, ConstantColorFactor as mn, OneMinusConstantColorFactor as vn, ConstantAlphaFactor as gn, OneMinusConstantAlphaFactor as bn, Matrix4 as Kn, Vector3 as W, Euler as Xn, Ray as Zn, Plane as Jn, MathUtils as Qn, MOUSE as Xe, TOUCH as Ze, Quaternion as $t, Spherical as zt, Vector2 as he, ShaderMaterial as yn, GLSL3 as ea, Mesh as ta, PlaneGeometry as na, Scene as aa, Group as ia, AxesHelper as Yt, MeshDepthMaterial as ra, MeshNormalMaterial as sa, MeshBasicMaterial as oa, PerspectiveCamera as Rt, WebGLRenderer as ca, Raycaster as la, OrthographicCamera as Gt, CameraHelper as ua } from "three";
import Vt from "@theatre/studio";
import { Pane as da } from "tweakpane";
import * as fa from "@tweakpane/plugin-essentials";
import En, { useState as oe, useRef as _e, useEffect as Re, forwardRef as ha, useMemo as Ce } from "react";
import { Reorder as Cn } from "framer-motion";
const Sn = () => {
}, ui = () => {
};
function ut(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function di(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function fi(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function pa() {
  return Math.round(Math.random() * 1e6).toString();
}
function ma(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function va(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), r = (u) => {
    const d = u.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, c = r(n), p = r(a), o = r(t);
  return "#" + c + p + o;
}
function At(e, n = 1) {
  return Number(e.toFixed(n));
}
let Dt = 0;
const ga = () => {
  Dt = 0;
}, xn = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Dt}`, Dt++), e.parent !== null && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((a) => {
    xn(a);
  });
}, hi = (e) => {
  e?.dispose();
}, ba = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, wn = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n instanceof jn ? (n.pause(), n.parent && n.parent.remove(n)) : wn(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), ba(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class pi {
  components = /* @__PURE__ */ new Map();
  listen;
  // Protected
  _debugEnabled;
  _broadcastChannel = void 0;
  _webSocket = void 0;
  _mode = "app";
  _connected = !1;
  _useBC = !1;
  constructor(n, a, t = !0) {
    this._debugEnabled = a, a && (this._useBC = t, t ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(n, a) {
    this.components.set(n, a);
  }
  dispose() {
    this._broadcastChannel !== void 0 && this._broadcastChannel.removeEventListener("message", this.messageHandler), this._webSocket !== void 0 && (this._webSocket.removeEventListener("open", this.openHandler), this._webSocket.removeEventListener("close", this.closeHandler), this._webSocket.removeEventListener("message", this.messageHandler)), this.components.forEach((n) => {
      n.dispose();
    }), this.components.clear();
  }
  // Remote
  send(n) {
    this._mode !== n.target && (this._useBC ? this._broadcastChannel?.postMessage(n) : this._connected && this._webSocket?.send(JSON.stringify(n)));
  }
  messageHandler = (n) => {
    this.listen !== void 0 && (this._useBC ? this.listen(n.data) : this.listen(JSON.parse(n.data)));
  };
  openHandler = () => {
    this._connected = !0;
  };
  closeHandler = () => {
    this._connected = !1;
  };
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
    n && (this._mode = "editor");
  }
}
const P = new tn(), k = {
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
class xt {
  app;
  constructor(n) {
    this.app = n;
  }
  dispose() {
  }
}
class mi extends xt {
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
function vi(e, n, a) {
  switch (a.event) {
    case "selectComponent":
      P.dispatchEvent({ type: k.SELECT_DROPDOWN, value: a.data });
      break;
    case "draggableListUpdate":
      P.dispatchEvent({ type: k.DRAG_UPDATE, value: a.data });
      break;
  }
}
function gi(e, n, a) {
  let t;
  switch (a.event) {
    case "setSheet":
      t = n.sheets.get(a.data.sheet), t !== void 0 && (n.activeSheet = t, Vt.setSelection([t]));
      break;
    case "setSheetObject":
      t = n.sheetObjects.get(`${a.data.sheet}_${a.data.key}`), t !== void 0 && Vt.setSelection([t]);
      break;
    case "updateSheetObject":
      t = n.sheets.get(a.data.sheet), t !== void 0 && t.sequence.pause(), t = n.sheetObjectCBs.get(a.data.sheetObject), t !== void 0 && t(a.data.values);
      break;
    case "updateTimeline":
      t = n.sheets.get(a.data.sheet), n.activeSheet !== void 0 && (n.activeSheet.sequence.position = a.data.position);
      break;
  }
}
function bi(e, n, a) {
  if (e.editor)
    switch (a.event) {
      case "playSheet":
        n.sheet(a.data.sheet)?.sequence.play(a.data.value);
        break;
      case "pauseSheet":
        n.sheet(a.data.sheet)?.sequence.pause();
        break;
    }
}
function yi(e, n, a) {
  switch (a.event) {
    case "getObject":
      P.dispatchEvent({ type: k.GET_OBJECT, value: a.data });
      break;
    case "updateObject":
      P.dispatchEvent({ type: k.UPDATE_OBJECT, value: a.data });
      break;
    case "createTexture":
      P.dispatchEvent({ type: k.CREATE_TEXTURE, value: a.data });
      break;
    case "requestMethod":
      P.dispatchEvent({ type: k.REQUEST_METHOD, value: a.data });
      break;
  }
}
function Ei(e, n, a) {
  switch (a.event) {
    case "setObject":
      P.dispatchEvent({ type: k.SET_OBJECT, value: a.data });
      break;
    case "setScene":
      P.dispatchEvent({ type: k.SET_SCENE, value: a.data });
      break;
    case "addCamera":
      P.dispatchEvent({ type: k.ADD_CAMERA, value: a.data });
      break;
    case "removeCamera":
      P.dispatchEvent({ type: k.REMOVE_CAMERA, value: a.data });
      break;
  }
}
function Ci(e, n, a) {
  switch (a.event) {
    case "addFolder":
      n.addFolder(a.data.name, a.data.params, a.data.parent);
      break;
    case "bindObject":
      n.bind(a.data.name, a.data.params, a.data.parent);
      break;
    case "updateBind":
      n.triggerBind(a.data.id, a.data.value);
      break;
    case "addButton":
      n.button(a.data.name, a.data.callback, a.data.parent);
      break;
    case "clickButton":
      n.triggerButton(a.data.id);
      break;
  }
}
class ya extends xt {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  static rafDriver = void 0;
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  sheet(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    let a = this.sheets.get(n);
    return a !== void 0 || (a = this.project?.sheet(n), this.sheets.set(n, a)), a;
  }
  playSheet(n, a) {
    this.sheet(n)?.sequence.play(a), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: n,
        value: a
      }
    });
  }
  pauseSheet(n) {
    this.sheet(n)?.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: n
      }
    });
  }
  clearSheetObjects(n) {
    this.sheetObjects.forEach((a, t) => {
      t.search(`${n}_`) > -1 && this.unsubscribe(a);
    });
  }
  sheetObject(n, a, t, r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheet(n);
    if (c === void 0)
      return;
    const p = `${n}_${a}`;
    let o = this.sheetObjects.get(p);
    o !== void 0 ? o = c.object(a, { ...t, ...o.value }, { reconfigure: !0 }) : o = c.object(a, t), this.sheetObjects.set(p, o), this.sheetObjectCBs.set(p, r !== void 0 ? r : Sn);
    const u = o.onValuesChange((d) => {
      if (this.app.editor) {
        for (const b in d) {
          const E = d[b];
          typeof E == "object" && ma(E) && (d[b] = {
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
            sheet: n,
            sheetObject: p,
            values: d
          }
        });
      }
      const v = this.sheetObjectCBs.get(p);
      v !== void 0 && v(d);
    });
    return this.sheetObjectUnsubscribe.set(p, u), o;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(a)?.detachObject(t);
    const c = `${a}_${t}`, p = this.sheetObjectUnsubscribe.get(c);
    p !== void 0 && (this.sheetObjects.delete(c), this.sheetObjectCBs.delete(c), this.sheetObjectUnsubscribe.delete(c), p());
  }
}
function Si(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((p) => {
      p.length < 1 || p.forEach((o) => {
        let u = o.address.sheetId, d = "setSheet", v = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", v = {
              sheet: o.address.sheetId
            }, n.activeSheet = n.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", u += `_${o.address.objectKey}`, v = {
              id: u,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, n.activeSheet = n.sheets.get(o.address.sheetId);
            break;
        }
        e.send({ event: d, target: "app", data: v });
      });
    });
    let t = -1;
    const r = () => {
      if (ya.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
        t = n.activeSheet.sequence.position;
        const p = n.activeSheet;
        e.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: t,
            sheet: p.address.sheetId
          }
        });
      }
    }, c = () => {
      r(), requestAnimationFrame(c);
    };
    r(), c();
  } else
    a.ui.hide();
}
function Ea(e) {
  if (e.name === "cameras")
    return "camera";
  if (e.name === "interactive")
    return "interactive";
  if (e.name === "lights")
    return "light";
  if (e.name === "ui")
    return "ui";
  if (e.name === "utils")
    return "utils";
  const n = e.type;
  return n.search("Helper") > -1 ? "icon_utils" : n.search("Camera") > -1 ? "camera" : n.search("Light") > -1 ? "light" : "obj3D";
}
function On(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((a) => {
    n.children.push(On(a));
  }), n;
}
function Ca(e) {
  const n = {};
  for (const a in e) {
    const t = e[a].value;
    n[a] = { value: t }, t === null ? n[a].value = { src: "" } : t.isTexture && (n[a].value = { src: t.image.src });
  }
  return n;
}
function Sa(e) {
  switch (e) {
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
function Je(e) {
  const n = {};
  for (const a in e) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Sa(a))
      continue;
    const t = typeof e[a], r = e[a];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        n[a] = r;
        break;
      case "object":
        if (r !== null)
          if (n[a] = r, r.isTexture)
            if (r instanceof nn) {
              const c = r.source.toJSON();
              n[a] = { src: c.url };
            } else
              r instanceof Dn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Ca(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Pt(e) {
  e.updateMatrix();
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    visible: e.visible,
    matrix: e.matrix.elements,
    animations: [],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0
  };
  e.animations.forEach((t) => {
    n.animations.push({
      name: t.name,
      duration: t.duration,
      blendMode: t.blendMode
    });
  });
  const a = e.type.toLowerCase();
  if (a.search("mesh") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const r = [];
      t.material.forEach((c) => {
        r.push(Je(c));
      }), n.material = r;
    } else
      n.material = Je(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const r = [];
      t.material.forEach((c) => {
        r.push(Je(c));
      }), n.material = r;
    } else
      n.material = Je(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const r = [];
      t.material.forEach((c) => {
        r.push(Je(c));
      }), n.material = r;
    } else
      n.material = Je(t.material);
  } else
    a.search("camera") > -1 ? e.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
      fov: e.fov,
      zoom: e.zoom,
      near: e.near,
      far: e.far,
      focus: e.focus,
      aspect: e.aspect,
      filmGauge: e.filmGauge,
      filmOffset: e.filmOffset
    } : e.type === "OrthographicCamera" && (n.orthographicCameraInfo = {
      zoom: e.zoom,
      near: e.near,
      far: e.far,
      left: e.left,
      right: e.right,
      top: e.top,
      bottom: e.bottom
    }) : a.search("light") > -1 && (n.lightInfo = {
      color: e.color,
      intensity: e.intensity,
      decay: e.decay,
      distance: e.distance,
      angle: e.angle,
      penumbra: e.penumbra,
      groundColor: e.groundColor
    });
  return n;
}
function xa(e, n) {
  const a = n.split(".");
  switch (a.length) {
    case 1:
      return e[a[0]];
    case 2:
      return e[a[0]][a[1]];
    case 3:
      return e[a[0]][a[1]][a[2]];
    case 4:
      return e[a[0]][a[1]][a[2]][a[3]];
    case 5:
      return e[a[0]][a[1]][a[2]][a[3]][a[4]];
    case 6:
      return e[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]];
  }
}
function ee(e, n, a) {
  const t = n.split(".");
  switch (t.length) {
    case 1:
      e[t[0]] = a;
      break;
    case 2:
      e[t[0]][t[1]] = a;
      break;
    case 3:
      e[t[0]][t[1]][t[2]] = a;
      break;
    case 4:
      e[t[0]][t[1]][t[2]][t[3]] = a;
      break;
    case 5:
      e[t[0]][t[1]][t[2]][t[3]][t[4]] = a;
      break;
  }
}
function It(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const r = new nn(t);
      r.wrapS = Ut, r.wrapT = Ut, r.needsUpdate = !0, n(r);
    }, t.onerror = a, t.src = e;
  });
}
class xi extends xt {
  scene = void 0;
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = Pt(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: a
    });
  }
  requestMethod(n, a, t, r) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: t,
        subitem: r
      }
    });
  }
  updateObject(n, a, t) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: t
      }
    });
  }
  createTexture(n, a, t) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: t
      }
    });
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    ga(), xn(this.scene);
    const a = On(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Pt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Pt(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
}
class wi extends xt {
  bindCBs;
  buttonCBs;
  pane = void 0;
  appCallbacks = 0;
  editorCallbacks = 0;
  inspectorFolder = void 0;
  constructor(n) {
    super(n), this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), n.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new da({ title: "GUI" }), this.pane.registerPlugin(fa);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(n, a = void 0, t = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addFolder({
        title: n,
        ...a
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: n,
        params: a,
        parent: t
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(n, a, t, r = void 0) {
    const c = this.bindID, p = t.onChange !== void 0 ? t.onChange : Sn;
    this.bindCBs.set(c, p), this.app.editor ? (this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addBinding(n, a, t).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: c,
        name: a,
        params: t,
        parent: r
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, a) {
    const t = this.bindCBs.get(n);
    t !== void 0 ? t(a) : console.warn(`No callback for: ${n}`, a);
  }
  // Buttons
  button(n, a, t = void 0) {
    const r = this.bindID;
    this.buttonCBs.set(r, a), this.app.editor ? (this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addButton({ title: n }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: r
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: r,
        name: n,
        callback: a,
        parent: t
      }
    }), this.appCallbacks++);
  }
  triggerButton(n) {
    const a = this.buttonCBs.get(n);
    a !== void 0 && a();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const n = this.inspectorFolder.children.length - 1;
    for (let a = n; a > -1; --a)
      this.inspectorFolder.remove(this.inspectorFolder.children[a]);
  }
}
var Lt = { exports: {} }, rt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ht;
function wa() {
  if (Ht)
    return rt;
  Ht = 1;
  var e = En, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(o, u, d) {
    var v, b = {}, E = null, C = null;
    d !== void 0 && (E = "" + d), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (C = u.ref);
    for (v in u)
      t.call(u, v) && !c.hasOwnProperty(v) && (b[v] = u[v]);
    if (o && o.defaultProps)
      for (v in u = o.defaultProps, u)
        b[v] === void 0 && (b[v] = u[v]);
    return { $$typeof: n, type: o, key: E, ref: C, props: b, _owner: r.current };
  }
  return rt.Fragment = a, rt.jsx = p, rt.jsxs = p, rt;
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
var Wt;
function Oa() {
  return Wt || (Wt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = En, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), o = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), D = Symbol.iterator, I = "@@iterator";
    function q(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = D && i[D] || i[I];
      return typeof f == "function" ? f : null;
    }
    var B = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function M(i) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), S = 1; S < f; S++)
          g[S - 1] = arguments[S];
        z("error", i, g);
      }
    }
    function z(i, f, g) {
      {
        var S = B.ReactDebugCurrentFrame, j = S.getStackAddendum();
        j !== "" && (f += "%s", g = g.concat([j]));
        var N = g.map(function(A) {
          return String(A);
        });
        N.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, N);
      }
    }
    var we = !1, ce = !1, Y = !1, Q = !1, x = !1, Ae;
    Ae = Symbol.for("react.module.reference");
    function Fe(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === t || i === c || x || i === r || i === d || i === v || Q || i === C || we || ce || Y || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === b || i.$$typeof === p || i.$$typeof === o || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Ae || i.getModuleId !== void 0));
    }
    function Oe(i, f, g) {
      var S = i.displayName;
      if (S)
        return S;
      var j = f.displayName || f.name || "";
      return j !== "" ? g + "(" + j + ")" : g;
    }
    function me(i) {
      return i.displayName || "Context";
    }
    function te(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && M("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case t:
          return "Fragment";
        case a:
          return "Portal";
        case c:
          return "Profiler";
        case r:
          return "StrictMode";
        case d:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case o:
            var f = i;
            return me(f) + ".Consumer";
          case p:
            var g = i;
            return me(g._context) + ".Provider";
          case u:
            return Oe(i, i.render, "ForwardRef");
          case b:
            var S = i.displayName || null;
            return S !== null ? S : te(i.type) || "Memo";
          case E: {
            var j = i, N = j._payload, A = j._init;
            try {
              return te(A(N));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var de = Object.assign, ve = 0, ge, K, pe, Pe, ke, fe, h;
    function m() {
    }
    m.__reactDisabledLog = !0;
    function w() {
      {
        if (ve === 0) {
          ge = console.log, K = console.info, pe = console.warn, Pe = console.error, ke = console.group, fe = console.groupCollapsed, h = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: m,
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
        ve++;
      }
    }
    function _() {
      {
        if (ve--, ve === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: de({}, i, {
              value: ge
            }),
            info: de({}, i, {
              value: K
            }),
            warn: de({}, i, {
              value: pe
            }),
            error: de({}, i, {
              value: Pe
            }),
            group: de({}, i, {
              value: ke
            }),
            groupCollapsed: de({}, i, {
              value: fe
            }),
            groupEnd: de({}, i, {
              value: h
            })
          });
        }
        ve < 0 && M("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = B.ReactCurrentDispatcher, V;
    function ae(i, f, g) {
      {
        if (V === void 0)
          try {
            throw Error();
          } catch (j) {
            var S = j.stack.trim().match(/\n( *(at )?)/);
            V = S && S[1] || "";
          }
        return `
` + V + i;
      }
    }
    var U = !1, X;
    {
      var ie = typeof WeakMap == "function" ? WeakMap : Map;
      X = new ie();
    }
    function R(i, f) {
      if (!i || U)
        return "";
      {
        var g = X.get(i);
        if (g !== void 0)
          return g;
      }
      var S;
      U = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var N;
      N = G.current, G.current = null, w();
      try {
        if (f) {
          var A = function() {
            throw Error();
          };
          if (Object.defineProperty(A.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(A, []);
            } catch (Te) {
              S = Te;
            }
            Reflect.construct(i, [], A);
          } else {
            try {
              A.call();
            } catch (Te) {
              S = Te;
            }
            i.call(A.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Te) {
            S = Te;
          }
          i();
        }
      } catch (Te) {
        if (Te && S && typeof Te.stack == "string") {
          for (var T = Te.stack.split(`
`), ue = S.stack.split(`
`), Z = T.length - 1, J = ue.length - 1; Z >= 1 && J >= 0 && T[Z] !== ue[J]; )
            J--;
          for (; Z >= 1 && J >= 0; Z--, J--)
            if (T[Z] !== ue[J]) {
              if (Z !== 1 || J !== 1)
                do
                  if (Z--, J--, J < 0 || T[Z] !== ue[J]) {
                    var Ee = `
` + T[Z].replace(" at new ", " at ");
                    return i.displayName && Ee.includes("<anonymous>") && (Ee = Ee.replace("<anonymous>", i.displayName)), typeof i == "function" && X.set(i, Ee), Ee;
                  }
                while (Z >= 1 && J >= 0);
              break;
            }
        }
      } finally {
        U = !1, G.current = N, _(), Error.prepareStackTrace = j;
      }
      var Ke = i ? i.displayName || i.name : "", Bt = Ke ? ae(Ke) : "";
      return typeof i == "function" && X.set(i, Bt), Bt;
    }
    function F(i, f, g) {
      return R(i, !1);
    }
    function ne(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function Se(i, f, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return R(i, ne(i));
      if (typeof i == "string")
        return ae(i);
      switch (i) {
        case d:
          return ae("Suspense");
        case v:
          return ae("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case u:
            return F(i.render);
          case b:
            return Se(i.type, f, g);
          case E: {
            var S = i, j = S._payload, N = S._init;
            try {
              return Se(N(j), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Me = Object.prototype.hasOwnProperty, dt = {}, ft = B.ReactDebugCurrentFrame;
    function Be(i) {
      if (i) {
        var f = i._owner, g = Se(i.type, i._source, f ? f.type : null);
        ft.setExtraStackFrame(g);
      } else
        ft.setExtraStackFrame(null);
    }
    function et(i, f, g, S, j) {
      {
        var N = Function.call.bind(Me);
        for (var A in i)
          if (N(i, A)) {
            var T = void 0;
            try {
              if (typeof i[A] != "function") {
                var ue = Error((S || "React class") + ": " + g + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ue.name = "Invariant Violation", ue;
              }
              T = i[A](f, A, S, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              T = Z;
            }
            T && !(T instanceof Error) && (Be(j), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", g, A, typeof T), Be(null)), T instanceof Error && !(T.message in dt) && (dt[T.message] = !0, Be(j), M("Failed %s type: %s", g, T.message), Be(null));
          }
      }
    }
    var Ue = Array.isArray;
    function tt(i) {
      return Ue(i);
    }
    function wt(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function ht(i) {
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
      if (ht(i))
        return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wt(i)), pt(i);
    }
    var je = B.ReactCurrentOwner, nt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, at, vt, qe;
    qe = {};
    function Ot(i) {
      if (Me.call(i, "ref")) {
        var f = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Mt(i) {
      if (Me.call(i, "key")) {
        var f = Object.getOwnPropertyDescriptor(i, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function gt(i, f) {
      if (typeof i.ref == "string" && je.current && f && je.current.stateNode !== f) {
        var g = te(je.current.type);
        qe[g] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(je.current.type), i.ref), qe[g] = !0);
      }
    }
    function De(i, f) {
      {
        var g = function() {
          at || (at = !0, M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Ft(i, f) {
      {
        var g = function() {
          vt || (vt = !0, M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var s = function(i, f, g, S, j, N, A) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: g,
        props: A,
        // Record the component responsible for creating this element.
        _owner: N
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
        value: S
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function y(i, f, g, S, j) {
      {
        var N, A = {}, T = null, ue = null;
        g !== void 0 && (mt(g), T = "" + g), Mt(f) && (mt(f.key), T = "" + f.key), Ot(f) && (ue = f.ref, gt(f, j));
        for (N in f)
          Me.call(f, N) && !nt.hasOwnProperty(N) && (A[N] = f[N]);
        if (i && i.defaultProps) {
          var Z = i.defaultProps;
          for (N in Z)
            A[N] === void 0 && (A[N] = Z[N]);
        }
        if (T || ue) {
          var J = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          T && De(A, J), ue && Ft(A, J);
        }
        return s(i, T, ue, j, S, je.current, A);
      }
    }
    var O = B.ReactCurrentOwner, L = B.ReactDebugCurrentFrame;
    function H(i) {
      if (i) {
        var f = i._owner, g = Se(i.type, i._source, f ? f.type : null);
        L.setExtraStackFrame(g);
      } else
        L.setExtraStackFrame(null);
    }
    var be;
    be = !1;
    function le(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function Tt() {
      {
        if (O.current) {
          var i = te(O.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function _t(i) {
      {
        if (i !== void 0) {
          var f = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var it = {};
    function xe(i) {
      {
        var f = Tt();
        if (!f) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function ye(i, f) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = xe(f);
        if (it[g])
          return;
        it[g] = !0;
        var S = "";
        i && i._owner && i._owner !== O.current && (S = " It was passed a child from " + te(i._owner.type) + "."), H(i), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, S), H(null);
      }
    }
    function $e(i, f) {
      {
        if (typeof i != "object")
          return;
        if (tt(i))
          for (var g = 0; g < i.length; g++) {
            var S = i[g];
            le(S) && ye(S, f);
          }
        else if (le(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var j = q(i);
          if (typeof j == "function" && j !== i.entries)
            for (var N = j.call(i), A; !(A = N.next()).done; )
              le(A.value) && ye(A.value, f);
        }
      }
    }
    function ze(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var g;
        if (typeof f == "function")
          g = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === b))
          g = f.propTypes;
        else
          return;
        if (g) {
          var S = te(f);
          et(g, i.props, "prop", S, i);
        } else if (f.PropTypes !== void 0 && !be) {
          be = !0;
          var j = te(f);
          M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ye(i) {
      {
        for (var f = Object.keys(i.props), g = 0; g < f.length; g++) {
          var S = f[g];
          if (S !== "children" && S !== "key") {
            H(i), M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), H(null);
            break;
          }
        }
        i.ref !== null && (H(i), M("Invalid attribute `ref` supplied to `React.Fragment`."), H(null));
      }
    }
    function Ge(i, f, g, S, j, N) {
      {
        var A = Fe(i);
        if (!A) {
          var T = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ue = _t(j);
          ue ? T += ue : T += Tt();
          var Z;
          i === null ? Z = "null" : tt(i) ? Z = "array" : i !== void 0 && i.$$typeof === n ? (Z = "<" + (te(i.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof i, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, T);
        }
        var J = y(i, f, g, j, N);
        if (J == null)
          return J;
        if (A) {
          var Ee = f.children;
          if (Ee !== void 0)
            if (S)
              if (tt(Ee)) {
                for (var Ke = 0; Ke < Ee.length; Ke++)
                  $e(Ee[Ke], i);
                Object.freeze && Object.freeze(Ee);
              } else
                M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              $e(Ee, i);
        }
        return i === t ? Ye(J) : ze(J), J;
      }
    }
    function Rn(i, f, g) {
      return Ge(i, f, g, !0);
    }
    function An(i, f, g) {
      return Ge(i, f, g, !1);
    }
    var Pn = An, kn = Rn;
    st.Fragment = t, st.jsx = Pn, st.jsxs = kn;
  }()), st;
}
process.env.NODE_ENV === "production" ? Lt.exports = wa() : Lt.exports = Oa();
var l = Lt.exports;
function Mn(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ l.jsx("button", { children: e.title });
}
const Ma = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ta = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function _a(e) {
  return /* @__PURE__ */ l.jsx(Cn.Item, { value: e.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ta,
    /* @__PURE__ */ l.jsx("span", { children: e.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Ma })
  ] }) }, e.title);
}
function Ra(e) {
  const [n, a] = oe(!1), [t, r] = oe(e.options), c = (d) => {
    e.onDragComplete(d), r(d);
  }, p = (d) => {
    const v = [...t];
    v.splice(d, 1), c(v);
  }, o = [];
  t.forEach((d, v) => {
    o.push(/* @__PURE__ */ l.jsx(_a, { index: v, title: d, onDelete: p }, d));
  });
  let u = "dropdown draggable";
  return e.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Mn, { title: e.title }),
    /* @__PURE__ */ l.jsx(Cn.Group, { axis: "y", values: t, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: o })
  ] });
}
function Aa(e) {
  const [n, a] = oe(!1), t = [];
  e.options.map((c, p) => {
    e.onSelect !== void 0 && (c.onSelect = e.onSelect), t.push(/* @__PURE__ */ l.jsx(Pa, { option: c }, p));
  });
  let r = "dropdown";
  return e.subdropdown && (r += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Mn, { title: e.title }),
        /* @__PURE__ */ l.jsx(
          "ul",
          {
            style: { visibility: n ? "visible" : "hidden" },
            children: t
          }
        )
      ]
    }
  );
}
function Pa(e) {
  const { option: n } = e, [a, t] = oe("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ l.jsx(
        Ra,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (c) => {
            n.onDragComplete !== void 0 && n.onDragComplete(c);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      r = /* @__PURE__ */ l.jsx(
        Aa,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      r = /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: () => {
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (a !== n.title ? t(n.title) : t(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: r }, pa());
}
class ct {
  appHandlers = [];
  editorHandlers = [];
  _app;
  static _instance;
  handleAppBroadcast = (n) => {
    switch (this.appHandlers.forEach((a) => {
      a.callback(this._app, a.remote, n);
    }), n.event) {
      case "custom":
        P.dispatchEvent({ type: k.CUSTOM, value: n.data });
        break;
    }
  };
  handleEditorBroadcast = (n) => {
    switch (this.editorHandlers.forEach((a) => {
      a.callback(this._app, a.remote, n);
    }), n.event) {
      case "custom":
        P.dispatchEvent({ type: k.CUSTOM, value: n.data });
        break;
    }
  };
  set app(n) {
    this._app = n, n.listen = (a) => {
      a.target === "editor" ? this.handleEditorBroadcast(a) : this.handleAppBroadcast(a);
    };
  }
  // Singleton
  static get instance() {
    return ct._instance === void 0 && (ct._instance = new ct()), ct._instance;
  }
}
function Nt(e) {
  const [n, a] = oe(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          e.onToggle !== void 0 && e.onToggle(r), a(r);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: ut(e.label) })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: e.children }) })
  ] });
}
function Tn(e) {
  const [n, a] = oe(!1), t = e.child !== void 0 && e.child.children.length > 0, r = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((c) => {
    r.push(/* @__PURE__ */ l.jsx(Tn, { child: c, three: e.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx(l.Fragment, { children: e.child !== void 0 && /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "child", children: [
      t ? /* @__PURE__ */ l.jsx(
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
            left: t ? "20px" : "5px"
          },
          onClick: () => {
            e.child !== void 0 && (e.three.getObject(e.child.uuid), n || a(!0));
          },
          children: e.child.name.length > 0 ? `${e.child.name} (${e.child.type})` : `${e.child.type}::${e.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Ea(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function ka(e) {
  const n = [];
  return e.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Tn, { child: a, three: e.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const ja = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Da(e) {
  return "items" in e;
}
function We(e) {
  const n = [];
  return e.items.forEach((a) => {
    Da(a) ? n.push(
      /* @__PURE__ */ l.jsx(We, { title: ut(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
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
          onChange: (t, r) => {
            a.onChange !== void 0 && a.onChange(t, r);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Nt, { label: e.title, open: e.expanded === !0, children: n });
}
function Ia(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "blendDstAlpha" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function Ve(e) {
  switch (e) {
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
  return e;
}
function La(e) {
  return e.toLowerCase().search("intensity") > -1 || e === "anisotropyRotation" || e === "blendAlpha" || e === "bumpScale" || e === "clearcoatRoughness" || e === "displacementBias" || e === "displacementScale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionRatio" || e === "roughness" || e === "sheenRoughness" || e === "thickness";
}
function Na() {
  const e = document.createElement("input");
  return e.type = "file", new Promise((n, a) => {
    e.addEventListener("change", function() {
      if (e.files === null)
        a();
      else {
        const t = e.files[0], r = new FileReader();
        r.onload = function(c) {
          n(c.target.result);
        }, r.readAsDataURL(t);
      }
    }), e.click();
  });
}
const Fa = [
  {
    title: "Front",
    value: In
  },
  {
    title: "Back",
    value: Ln
  },
  {
    title: "Double",
    value: an
  }
], Ba = [
  {
    title: "No Blending",
    value: Nn
  },
  {
    title: "Normal",
    value: Fn
  },
  {
    title: "Additive",
    value: Bn
  },
  {
    title: "Subtractive",
    value: Un
  },
  {
    title: "Multiply",
    value: $n
  },
  {
    title: "Custom",
    value: zn
  }
], Ua = [
  {
    title: "Add",
    value: Yn
  },
  {
    title: "Subtract",
    value: Gn
  },
  {
    title: "Reverse Subtract",
    value: Vn
  },
  {
    title: "Min",
    value: Hn
  },
  {
    title: "Max",
    value: Wn
  }
], $a = [
  {
    title: "Zero",
    valye: rn
  },
  {
    title: "One",
    valye: sn
  },
  {
    title: "Src Color",
    valye: on
  },
  {
    title: "One Minus Src Color",
    valye: cn
  },
  {
    title: "Src Alpha",
    valye: ln
  },
  {
    title: "One Minus Src Alpha",
    valye: un
  },
  {
    title: "Dst Alpha",
    valye: dn
  },
  {
    title: "One Minus Dst Alpha",
    valye: fn
  },
  {
    title: "Dst Color",
    valye: hn
  },
  {
    title: "One Minus Dst Color",
    valye: pn
  },
  {
    title: "Src Alpha Saturate",
    valye: qn
  },
  {
    title: "Constant Color",
    valye: mn
  },
  {
    title: "One Minus Constant Color",
    valye: vn
  },
  {
    title: "Constant Alpha",
    valye: gn
  },
  {
    title: "One Minus Constant Alpha",
    valye: bn
  }
], za = [
  {
    title: "Zero",
    valye: rn
  },
  {
    title: "One",
    valye: sn
  },
  {
    title: "Src Color",
    valye: on
  },
  {
    title: "One Minus Src Color",
    valye: cn
  },
  {
    title: "Src Alpha",
    valye: ln
  },
  {
    title: "One Minus Src Alpha",
    valye: un
  },
  {
    title: "Dst Alpha",
    valye: dn
  },
  {
    title: "One Minus Dst Alpha",
    valye: fn
  },
  {
    title: "Dst Color",
    valye: hn
  },
  {
    title: "One Minus Dst Color",
    valye: pn
  },
  {
    title: "Constant Color",
    valye: mn
  },
  {
    title: "One Minus Constant Color",
    valye: vn
  },
  {
    title: "Constant Alpha",
    valye: gn
  },
  {
    title: "One Minus Constant Alpha",
    valye: bn
  }
];
function ot(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function qt(e, n, a) {
  const t = [];
  for (const r in e) {
    if (!Ia(r))
      continue;
    const c = typeof e[r], p = e[r];
    if (c === "boolean" || c === "number" || c === "string") {
      const o = {
        title: Ve(r),
        prop: r,
        type: c,
        value: p,
        min: void 0,
        max: void 0,
        needsUpdate: c === "boolean",
        onChange: (d, v) => {
          a.updateObject(n.uuid, `material.${d}`, v), o.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${d}`, v);
        }
      };
      switch (r) {
        case "blending":
          ot(o, Ba);
          break;
        case "blendDst":
          ot(o, za);
          break;
        case "blendEquation":
          ot(o, Ua);
          break;
        case "blendSrc":
          ot(o, $a);
          break;
        case "side":
          ot(o, Fa);
          break;
      }
      La(r) && (o.value = Number(p), o.type = "range", o.min = 0, o.max = 1, o.step = 0.01);
      const u = c === "string" && (r === "vertexShader" || r === "fragmentShader");
      u && (o.disabled = !1, o.latest = o.value, o.onChange = (d, v) => {
        o.latest = v;
      }), t.push(o), u && t.push({
        title: `${ut(r)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${r}`, o.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const d = a.scene?.getObjectByProperty("uuid", n.uuid);
          d !== void 0 && (ee(d, `material.${r}`, o.latest), d.material.needsUpdate = !0);
        }
      });
    } else if (c === "object")
      if (p.isColor)
        t.push({
          title: Ve(r),
          prop: r,
          type: "color",
          value: p,
          onChange: (o, u) => {
            const d = new St(u);
            a.updateObject(n.uuid, `material.${o}`, d);
            const v = a.scene?.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && ee(v, `material.${o}`, d);
          }
        });
      else if (Array.isArray(p)) {
        const o = [];
        for (const u in p)
          o.push({
            title: `${u}`,
            type: `${typeof p[u]}`,
            value: p[u],
            onChange: (d, v) => {
              a.updateObject(n.uuid, `material.${r}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${r}`, v);
            }
          });
        t.push({
          title: Ve(r),
          items: o
        });
      } else {
        const o = [];
        for (const u in p) {
          const d = p[u];
          switch (typeof d) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? t.push({
                title: Ve(r),
                type: "image",
                value: d,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${r}`, E);
                  const C = a.scene?.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && It(E).then((D) => {
                    ee(C, `material.${r}`, D), ee(C, "material.needsUpdate", !0);
                  });
                }
              }) : o.push({
                title: `${Ve(u)}`,
                prop: `material.${r}.${u}`,
                type: `${typeof e[r][u]}`,
                value: p[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${r}.${u}`, E);
                  const C = a.scene?.getObjectByProperty("uuid", n.uuid);
                  C !== void 0 && ee(C, `material.${r}.${u}`, E);
                }
              });
              break;
            case "object":
              if (d.value !== void 0 && d.value.src !== void 0)
                o.push({
                  title: Ve(u),
                  type: "image",
                  value: d.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${r}.${u}.value`, p);
                    const C = a.scene?.getObjectByProperty("uuid", n.uuid);
                    C !== void 0 && It(E).then((D) => {
                      ee(C, `material.${r}.${u}.value`, D);
                    });
                  }
                });
              else if (r === "uniforms") {
                const b = d.value, E = (C, D, I) => ({
                  title: C,
                  type: "number",
                  value: I,
                  step: 0.01,
                  onChange: (q, B) => {
                    const M = `material.uniforms.${u}.value.${D}`;
                    a.updateObject(n.uuid, M, B);
                    const z = a.scene?.getObjectByProperty("uuid", n.uuid);
                    z !== void 0 && ee(z, M, B);
                  }
                });
                if (typeof d.value == "number")
                  o.push({
                    title: u,
                    type: "number",
                    value: d.value,
                    onChange: (C, D) => {
                      const I = `material.${r}.${C}.value`;
                      a.updateObject(n.uuid, I, D);
                      const q = a.scene?.getObjectByProperty("uuid", n.uuid);
                      q !== void 0 && ee(q, I, D);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  o.push({
                    title: u,
                    type: "color",
                    value: d.value,
                    onChange: (C, D) => {
                      const I = new St(D), q = `material.${r}.${C}.value`;
                      a.updateObject(n.uuid, q, I);
                      const B = a.scene?.getObjectByProperty("uuid", n.uuid);
                      B !== void 0 && ee(B, q, I);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  o.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w === void 0)
                  o.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y),
                        E("Z", "z", d.value.z)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w !== void 0)
                  o.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y),
                        E("Z", "z", d.value.z),
                        E("W", "w", d.value.w)
                      ]
                    }
                  );
                else if (b.elements !== void 0) {
                  const C = b.elements, D = [];
                  for (let I = 0; I < C.length; I++)
                    D.push(E(I.toString(), I.toString(), C[I]));
                  o.push(
                    {
                      title: u,
                      items: D
                    }
                  );
                } else
                  console.log(">>> need to add this format:", u, b);
              } else
                o.push({
                  title: u,
                  type: `${typeof d.value}`,
                  value: d.value,
                  onChange: (b, E) => {
                    a.updateObject(n.uuid, `material.${r}.${u}.value`, E);
                    const C = a.scene?.getObjectByProperty("uuid", n.uuid);
                    C !== void 0 && ee(C, `material.${r}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        o.length > 0 && t.push({
          title: Ve(r),
          items: o
        });
      }
    else
      p !== void 0 && console.log("other:", r, c, p);
  }
  return t.sort((r, c) => r.title < c.title ? -1 : r.title > c.title ? 1 : 0), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), t;
}
function Ya(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], r = a.length;
    for (let c = 0; c < r; c++)
      t.push(
        /* @__PURE__ */ l.jsx(
          We,
          {
            title: `Material ${c}`,
            items: qt(a[c], e, n)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
  } else
    return /* @__PURE__ */ l.jsx(
      We,
      {
        title: "Material",
        items: qt(a, e, n)
      }
    );
}
function lt(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = va(e.value));
  const [a, t] = oe(n), r = _e(null), c = _e(null), p = _e(null);
  Re(() => {
    let v = !1, b = -1, E = 0, C = Number(a);
    const D = (z) => {
      v = !0, E = C, b = z.clientX;
    }, I = (z) => {
      if (!v)
        return;
      const we = e.step !== void 0 ? e.step : 1, ce = (z.clientX - b) * we;
      C = Number((E + ce).toFixed(4)), c.current !== null && (c.current.value = C.toString()), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, C);
    }, q = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, M = e.type === "number";
    return M && (r.current?.addEventListener("mousedown", D, !1), document.addEventListener("mouseup", q, !1), document.addEventListener("mousemove", I, !1), document.addEventListener("contextmenu", B, !1)), () => {
      M && (r.current?.removeEventListener("mousedown", D), document.removeEventListener("mouseup", q), document.removeEventListener("mousemove", I), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const o = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = o || e.type === "image", d = (v) => {
    let b = v.target.value;
    e.type === "boolean" ? b = v.target.checked : e.type === "option" && (b = e.options[b].value), t(b), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: r, children: ut(e.title) }, "fieldLabel"),
    e.type === "string" && !o && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: d,
        value: a
      }
    ),
    e.type === "string" && o && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: d,
        value: a
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: d,
        checked: a
      }
    ),
    e.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: c,
        type: "number",
        value: a,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        onChange: d
      }
    ),
    e.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: e.disabled, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: a,
          min: e.min,
          max: e.max,
          step: e.step,
          onChange: d
        }
      )
    ] }),
    e.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: d, disabled: e.disabled })
    ] }),
    e.type === "button" && /* @__PURE__ */ l.jsx(
      "button",
      {
        disabled: e.disabled,
        onClick: () => {
          e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, !0);
        },
        children: e.title
      }
    ),
    e.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: p, onClick: () => {
      Na().then((v) => {
        p.current.src = v, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, v);
      });
    }, src: a.length > 0 ? a : ja }),
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: d, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((v, b) => /* @__PURE__ */ l.jsx("option", { value: v.value, children: ut(v.title) }, b)) }) })
  ] });
}
function Kt(e) {
  switch (e) {
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
  return e;
}
function Ga(e, n) {
  const a = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      a.push({
        title: Kt(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (r, c) => {
          n.updateObject(e.uuid, r, c), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", e.uuid);
          p !== void 0 && (ee(p, r, c), p.updateProjectionMatrix());
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      a.push({
        title: Kt(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (r, c) => {
          n.updateObject(e.uuid, r, c), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", e.uuid);
          p !== void 0 && (ee(p, r, c), p.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    We,
    {
      title: "Camera",
      items: a
    }
  );
}
const Va = Math.PI / 180, Ha = 180 / Math.PI;
function Qe(e, n, a, t, r) {
  return t + (e - n) * (r - t) / (a - n);
}
function Wa(e) {
  return e * Va;
}
function kt(e) {
  return e * Ha;
}
function qa(e, n) {
  const a = new Kn();
  a.elements = e.matrix;
  const t = new W(), r = new Xn(), c = new W();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), r.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const p = (u, d) => {
    n.updateObject(e.uuid, u, d);
    const v = n.scene?.getObjectByProperty("uuid", e.uuid);
    v !== void 0 && ee(v, u, d);
  }, o = (u, d) => {
    p(u, Wa(d));
  };
  return /* @__PURE__ */ l.jsx(
    We,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: t.x,
          onChange: p
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: t.y,
          onChange: p
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: t.z,
          onChange: p
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: At(kt(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: At(kt(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: At(kt(r.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: c.x,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: c.y,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: c.z,
          step: 0.01,
          onChange: p
        }
      ]
    }
  );
}
function Xt(e) {
  switch (e) {
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
  return e;
}
function Ka(e, n) {
  const a = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const r = e.lightInfo[t];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: Xt(t),
        prop: t,
        type: "color",
        value: r,
        onChange: (c, p) => {
          const o = new St(p);
          n.updateObject(e.uuid, c, o);
          const u = n.scene?.getObjectByProperty("uuid", e.uuid);
          u !== void 0 && ee(u, c, o);
        }
      }) : a.push({
        title: Xt(t),
        prop: t,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (c, p) => {
          n.updateObject(e.uuid, c, p);
          const o = n.scene?.getObjectByProperty("uuid", e.uuid);
          o !== void 0 && ee(o, c, p);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    We,
    {
      title: "Light",
      items: a
    }
  );
}
function Xa(e, n) {
  const a = [], t = [];
  let r = 0;
  e.animations.forEach((o) => {
    r = Math.max(r, o.duration), o.duration > 0 && t.push({
      title: o.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: o.duration,
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
    items: t
  });
  const c = n.scene?.getObjectByProperty("uuid", e.uuid);
  let p = !1;
  if (c !== void 0) {
    const o = c.mixer;
    if (p = o !== void 0, p) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: o.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (d, v) => {
            o.timeScale = v, n.updateObject(e.uuid, "mixer.timeScale", v);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          o.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: u
      });
    }
  }
  return /* @__PURE__ */ l.jsx(We, { title: "Animation", items: a });
}
const _n = {
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
let re = { ..._n };
function Za(e) {
  const [n, a] = oe(-1);
  Re(() => {
    function p(u) {
      re = { ...u.value }, a(Date.now());
    }
    function o() {
      re = { ..._n }, a(Date.now());
    }
    return P.addEventListener(k.SET_SCENE, o), P.addEventListener(k.SET_OBJECT, p), () => {
      P.removeEventListener(k.SET_SCENE, o), P.removeEventListener(k.SET_OBJECT, p);
    };
  }, []);
  const t = re.type.toLowerCase(), r = re.animations.length > 0 || re.mixer !== void 0, c = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Nt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: re.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: re.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: re.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: re.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: re.visible,
          onChange: (p, o) => {
            e.three.updateObject(re.uuid, p, o);
            const u = e.three.scene?.getObjectByProperty("uuid", re.uuid);
            u !== void 0 && ee(u, p, o);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      qa(re, e.three),
      r ? Xa(re, e.three) : null,
      t.search("camera") > -1 ? Ga(re, e.three) : null,
      t.search("light") > -1 ? Ka(re, e.three) : null,
      c ? Ya(re, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Oi(e) {
  const [n, a] = oe(e.scene);
  Re(() => {
    const c = (p) => {
      a(p.value);
    };
    return P.addEventListener(k.SET_SCENE, c), () => {
      P.removeEventListener(k.SET_SCENE, c);
    };
  }, []);
  const t = n !== null, r = "Hierarchy - " + (t ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Nt, { label: r, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: t && /* @__PURE__ */ l.jsx(ka, { child: n, three: e.three }) }) }),
    /* @__PURE__ */ l.jsx(Za, { three: e.three })
  ] }, "SidePanel");
}
function Mi(e) {
  function n() {
    return e.three.scene === void 0 ? (console.log("No scene:", e.three), !1) : !0;
  }
  const a = (o) => {
    if (!n())
      return;
    const u = e.three.scene?.getObjectByProperty("uuid", o.value);
    u !== void 0 && e.three.setObject(u);
  }, t = (o, u, d) => {
    if (!n())
      return;
    const v = e.three.scene?.getObjectByProperty("uuid", o);
    v !== void 0 && ee(v, u, d);
  }, r = (o) => {
    if (!n())
      return;
    const u = o.value, { key: d, value: v, uuid: b } = u;
    t(b, d, v);
  }, c = (o) => {
    if (!n())
      return;
    const u = o.value;
    It(u.value).then((d) => {
      t(u.uuid, u.key, d), t(u.uuid, "material.needsUpdate", !0);
    });
  }, p = (o) => {
    if (!n())
      return;
    const { key: u, uuid: d, value: v, subitem: b } = o.value, E = e.three.scene?.getObjectByProperty("uuid", d);
    if (E !== void 0)
      try {
        b !== void 0 ? xa(E, b)[u](v) : E[u](v);
      } catch (C) {
        console.log("Error requesting method:"), console.log(C), console.log(u), console.log(v);
      }
  };
  return Re(() => (P.addEventListener(k.GET_OBJECT, a), P.addEventListener(k.UPDATE_OBJECT, r), P.addEventListener(k.CREATE_TEXTURE, c), P.addEventListener(k.REQUEST_METHOD, p), () => {
    P.removeEventListener(k.GET_OBJECT, a), P.removeEventListener(k.UPDATE_OBJECT, r), P.removeEventListener(k.CREATE_TEXTURE, c), P.removeEventListener(k.REQUEST_METHOD, p);
  }), []), null;
}
const Zt = { type: "change" }, jt = { type: "start" }, Jt = { type: "end" }, bt = new Zn(), Qt = new Jn(), Ja = Math.cos(70 * Qn.DEG2RAD);
class Qa extends tn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new W(), this.cursor = new W(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Xe.ROTATE, MIDDLE: Xe.DOLLY, RIGHT: Xe.PAN }, this.touches = { ONE: Ze.ROTATE, TWO: Ze.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return o.phi;
    }, this.getAzimuthalAngle = function() {
      return o.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", nt), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", nt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(Zt), t.update(), c = r.NONE;
    }, this.update = function() {
      const s = new W(), y = new $t().setFromUnitVectors(n.up, new W(0, 1, 0)), O = y.clone().invert(), L = new W(), H = new $t(), be = new W(), le = 2 * Math.PI;
      return function(_t = null) {
        const it = t.object.position;
        s.copy(it).sub(t.target), s.applyQuaternion(y), o.setFromVector3(s), t.autoRotate && c === r.NONE && me(Fe(_t)), t.enableDamping ? (o.theta += u.theta * t.dampingFactor, o.phi += u.phi * t.dampingFactor) : (o.theta += u.theta, o.phi += u.phi);
        let xe = t.minAzimuthAngle, ye = t.maxAzimuthAngle;
        isFinite(xe) && isFinite(ye) && (xe < -Math.PI ? xe += le : xe > Math.PI && (xe -= le), ye < -Math.PI ? ye += le : ye > Math.PI && (ye -= le), xe <= ye ? o.theta = Math.max(xe, Math.min(ye, o.theta)) : o.theta = o.theta > (xe + ye) / 2 ? Math.max(xe, o.theta) : Math.min(ye, o.theta)), o.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, o.phi)), o.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(v, t.dampingFactor) : t.target.add(v), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor), t.zoomToCursor && Y || t.object.isOrthographicCamera ? o.radius = ke(o.radius) : o.radius = ke(o.radius * d), s.setFromSpherical(o), s.applyQuaternion(O), it.copy(t.target).add(s), t.object.lookAt(t.target), t.enableDamping === !0 ? (u.theta *= 1 - t.dampingFactor, u.phi *= 1 - t.dampingFactor, v.multiplyScalar(1 - t.dampingFactor)) : (u.set(0, 0, 0), v.set(0, 0, 0));
        let $e = !1;
        if (t.zoomToCursor && Y) {
          let ze = null;
          if (t.object.isPerspectiveCamera) {
            const Ye = s.length();
            ze = ke(Ye * d);
            const Ge = Ye - ze;
            t.object.position.addScaledVector(we, Ge), t.object.updateMatrixWorld();
          } else if (t.object.isOrthographicCamera) {
            const Ye = new W(ce.x, ce.y, 0);
            Ye.unproject(t.object), t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), t.object.updateProjectionMatrix(), $e = !0;
            const Ge = new W(ce.x, ce.y, 0);
            Ge.unproject(t.object), t.object.position.sub(Ge).add(Ye), t.object.updateMatrixWorld(), ze = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          ze !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(ze).add(t.object.position) : (bt.origin.copy(t.object.position), bt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(bt.direction)) < Ja ? n.lookAt(t.target) : (Qt.setFromNormalAndCoplanarPoint(t.object.up, t.target), bt.intersectPlane(Qt, t.target))));
        } else
          t.object.isOrthographicCamera && ($e = d !== 1, $e && (t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), t.object.updateProjectionMatrix()));
        return d = 1, Y = !1, $e || L.distanceToSquared(t.object.position) > p || 8 * (1 - H.dot(t.object.quaternion)) > p || be.distanceToSquared(t.target) > 0 ? (t.dispatchEvent(Zt), L.copy(t.object.position), H.copy(t.object.quaternion), be.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", qe), t.domElement.removeEventListener("pointerdown", Be), t.domElement.removeEventListener("pointercancel", Ue), t.domElement.removeEventListener("wheel", ht), t.domElement.removeEventListener("pointermove", et), t.domElement.removeEventListener("pointerup", Ue), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", nt), t._domElementKeyEvents = null);
    };
    const t = this, r = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let c = r.NONE;
    const p = 1e-6, o = new zt(), u = new zt();
    let d = 1;
    const v = new W(), b = new he(), E = new he(), C = new he(), D = new he(), I = new he(), q = new he(), B = new he(), M = new he(), z = new he(), we = new W(), ce = new he();
    let Y = !1;
    const Q = [], x = {};
    let Ae = !1;
    function Fe(s) {
      return s !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function Oe(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, t.zoomSpeed * y);
    }
    function me(s) {
      u.theta -= s;
    }
    function te(s) {
      u.phi -= s;
    }
    const de = function() {
      const s = new W();
      return function(O, L) {
        s.setFromMatrixColumn(L, 0), s.multiplyScalar(-O), v.add(s);
      };
    }(), ve = function() {
      const s = new W();
      return function(O, L) {
        t.screenSpacePanning === !0 ? s.setFromMatrixColumn(L, 1) : (s.setFromMatrixColumn(L, 0), s.crossVectors(t.object.up, s)), s.multiplyScalar(O), v.add(s);
      };
    }(), ge = function() {
      const s = new W();
      return function(O, L) {
        const H = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const be = t.object.position;
          s.copy(be).sub(t.target);
          let le = s.length();
          le *= Math.tan(t.object.fov / 2 * Math.PI / 180), de(2 * O * le / H.clientHeight, t.object.matrix), ve(2 * L * le / H.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (de(O * (t.object.right - t.object.left) / t.object.zoom / H.clientWidth, t.object.matrix), ve(L * (t.object.top - t.object.bottom) / t.object.zoom / H.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function K(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function pe(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Pe(s, y) {
      if (!t.zoomToCursor)
        return;
      Y = !0;
      const O = t.domElement.getBoundingClientRect(), L = s - O.left, H = y - O.top, be = O.width, le = O.height;
      ce.x = L / be * 2 - 1, ce.y = -(H / le) * 2 + 1, we.set(ce.x, ce.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function ke(s) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, s));
    }
    function fe(s) {
      b.set(s.clientX, s.clientY);
    }
    function h(s) {
      Pe(s.clientX, s.clientX), B.set(s.clientX, s.clientY);
    }
    function m(s) {
      D.set(s.clientX, s.clientY);
    }
    function w(s) {
      E.set(s.clientX, s.clientY), C.subVectors(E, b).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      me(2 * Math.PI * C.x / y.clientHeight), te(2 * Math.PI * C.y / y.clientHeight), b.copy(E), t.update();
    }
    function _(s) {
      M.set(s.clientX, s.clientY), z.subVectors(M, B), z.y > 0 ? K(Oe(z.y)) : z.y < 0 && pe(Oe(z.y)), B.copy(M), t.update();
    }
    function G(s) {
      I.set(s.clientX, s.clientY), q.subVectors(I, D).multiplyScalar(t.panSpeed), ge(q.x, q.y), D.copy(I), t.update();
    }
    function V(s) {
      Pe(s.clientX, s.clientY), s.deltaY < 0 ? pe(Oe(s.deltaY)) : s.deltaY > 0 && K(Oe(s.deltaY)), t.update();
    }
    function ae(s) {
      let y = !1;
      switch (s.code) {
        case t.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? te(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ge(0, t.keyPanSpeed), y = !0;
          break;
        case t.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? te(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ge(0, -t.keyPanSpeed), y = !0;
          break;
        case t.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? me(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ge(t.keyPanSpeed, 0), y = !0;
          break;
        case t.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? me(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : ge(-t.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (s.preventDefault(), t.update());
    }
    function U(s) {
      if (Q.length === 1)
        b.set(s.pageX, s.pageY);
      else {
        const y = De(s), O = 0.5 * (s.pageX + y.x), L = 0.5 * (s.pageY + y.y);
        b.set(O, L);
      }
    }
    function X(s) {
      if (Q.length === 1)
        D.set(s.pageX, s.pageY);
      else {
        const y = De(s), O = 0.5 * (s.pageX + y.x), L = 0.5 * (s.pageY + y.y);
        D.set(O, L);
      }
    }
    function ie(s) {
      const y = De(s), O = s.pageX - y.x, L = s.pageY - y.y, H = Math.sqrt(O * O + L * L);
      B.set(0, H);
    }
    function R(s) {
      t.enableZoom && ie(s), t.enablePan && X(s);
    }
    function F(s) {
      t.enableZoom && ie(s), t.enableRotate && U(s);
    }
    function ne(s) {
      if (Q.length == 1)
        E.set(s.pageX, s.pageY);
      else {
        const O = De(s), L = 0.5 * (s.pageX + O.x), H = 0.5 * (s.pageY + O.y);
        E.set(L, H);
      }
      C.subVectors(E, b).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      me(2 * Math.PI * C.x / y.clientHeight), te(2 * Math.PI * C.y / y.clientHeight), b.copy(E);
    }
    function Se(s) {
      if (Q.length === 1)
        I.set(s.pageX, s.pageY);
      else {
        const y = De(s), O = 0.5 * (s.pageX + y.x), L = 0.5 * (s.pageY + y.y);
        I.set(O, L);
      }
      q.subVectors(I, D).multiplyScalar(t.panSpeed), ge(q.x, q.y), D.copy(I);
    }
    function Me(s) {
      const y = De(s), O = s.pageX - y.x, L = s.pageY - y.y, H = Math.sqrt(O * O + L * L);
      M.set(0, H), z.set(0, Math.pow(M.y / B.y, t.zoomSpeed)), K(z.y), B.copy(M);
      const be = (s.pageX + y.x) * 0.5, le = (s.pageY + y.y) * 0.5;
      Pe(be, le);
    }
    function dt(s) {
      t.enableZoom && Me(s), t.enablePan && Se(s);
    }
    function ft(s) {
      t.enableZoom && Me(s), t.enableRotate && ne(s);
    }
    function Be(s) {
      t.enabled !== !1 && (Q.length === 0 && (t.domElement.setPointerCapture(s.pointerId), t.domElement.addEventListener("pointermove", et), t.domElement.addEventListener("pointerup", Ue)), Ot(s), s.pointerType === "touch" ? at(s) : tt(s));
    }
    function et(s) {
      t.enabled !== !1 && (s.pointerType === "touch" ? vt(s) : wt(s));
    }
    function Ue(s) {
      switch (Mt(s), Q.length) {
        case 0:
          t.domElement.releasePointerCapture(s.pointerId), t.domElement.removeEventListener("pointermove", et), t.domElement.removeEventListener("pointerup", Ue), t.dispatchEvent(Jt), c = r.NONE;
          break;
        case 1:
          const y = Q[0], O = x[y];
          at({ pointerId: y, pageX: O.x, pageY: O.y });
          break;
      }
    }
    function tt(s) {
      let y;
      switch (s.button) {
        case 0:
          y = t.mouseButtons.LEFT;
          break;
        case 1:
          y = t.mouseButtons.MIDDLE;
          break;
        case 2:
          y = t.mouseButtons.RIGHT;
          break;
        default:
          y = -1;
      }
      switch (y) {
        case Xe.DOLLY:
          if (t.enableZoom === !1)
            return;
          h(s), c = r.DOLLY;
          break;
        case Xe.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enablePan === !1)
              return;
            m(s), c = r.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            fe(s), c = r.ROTATE;
          }
          break;
        case Xe.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enableRotate === !1)
              return;
            fe(s), c = r.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            m(s), c = r.PAN;
          }
          break;
        default:
          c = r.NONE;
      }
      c !== r.NONE && t.dispatchEvent(jt);
    }
    function wt(s) {
      switch (c) {
        case r.ROTATE:
          if (t.enableRotate === !1)
            return;
          w(s);
          break;
        case r.DOLLY:
          if (t.enableZoom === !1)
            return;
          _(s);
          break;
        case r.PAN:
          if (t.enablePan === !1)
            return;
          G(s);
          break;
      }
    }
    function ht(s) {
      t.enabled === !1 || t.enableZoom === !1 || c !== r.NONE || (s.preventDefault(), t.dispatchEvent(jt), V(pt(s)), t.dispatchEvent(Jt));
    }
    function pt(s) {
      const y = s.deltaMode, O = {
        clientX: s.clientX,
        clientY: s.clientY,
        deltaY: s.deltaY
      };
      switch (y) {
        case 1:
          O.deltaY *= 16;
          break;
        case 2:
          O.deltaY *= 100;
          break;
      }
      return s.ctrlKey && !Ae && (O.deltaY *= 10), O;
    }
    function mt(s) {
      s.key === "Control" && (Ae = !0, t.domElement.getRootNode().addEventListener("keyup", je, { passive: !0, capture: !0 }));
    }
    function je(s) {
      s.key === "Control" && (Ae = !1, t.domElement.getRootNode().removeEventListener("keyup", je, { passive: !0, capture: !0 }));
    }
    function nt(s) {
      t.enabled === !1 || t.enablePan === !1 || ae(s);
    }
    function at(s) {
      switch (gt(s), Q.length) {
        case 1:
          switch (t.touches.ONE) {
            case Ze.ROTATE:
              if (t.enableRotate === !1)
                return;
              U(s), c = r.TOUCH_ROTATE;
              break;
            case Ze.PAN:
              if (t.enablePan === !1)
                return;
              X(s), c = r.TOUCH_PAN;
              break;
            default:
              c = r.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case Ze.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              R(s), c = r.TOUCH_DOLLY_PAN;
              break;
            case Ze.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              F(s), c = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              c = r.NONE;
          }
          break;
        default:
          c = r.NONE;
      }
      c !== r.NONE && t.dispatchEvent(jt);
    }
    function vt(s) {
      switch (gt(s), c) {
        case r.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          ne(s), t.update();
          break;
        case r.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          Se(s), t.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          dt(s), t.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          ft(s), t.update();
          break;
        default:
          c = r.NONE;
      }
    }
    function qe(s) {
      t.enabled !== !1 && s.preventDefault();
    }
    function Ot(s) {
      Q.push(s.pointerId);
    }
    function Mt(s) {
      delete x[s.pointerId];
      for (let y = 0; y < Q.length; y++)
        if (Q[y] == s.pointerId) {
          Q.splice(y, 1);
          return;
        }
    }
    function gt(s) {
      let y = x[s.pointerId];
      y === void 0 && (y = new he(), x[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function De(s) {
      const y = s.pointerId === Q[0] ? Q[1] : Q[0];
      return x[y];
    }
    t.domElement.addEventListener("contextmenu", qe), t.domElement.addEventListener("pointerdown", Be), t.domElement.addEventListener("pointercancel", Ue), t.domElement.addEventListener("wheel", ht, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", mt, { passive: !0, capture: !0 }), this.update();
  }
}
const Ct = (e) => {
  const [n, a] = oe(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, r = (c) => {
    c !== n && (e.onSelect(c), a(c)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((c) => /* @__PURE__ */ l.jsx("li", { onClick: () => r(c), children: c }, c)) })
  ] });
}, He = ha(function(n, a) {
  const [t, r] = oe(!1), c = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      t && r(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Ct,
      {
        index: c,
        open: t,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (p) => {
          r(p);
        },
        up: !0
      }
    )
  ] });
});
class ei extends yn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: ea,
      side: an,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new St(16777215)
        },
        uDistance: {
          value: n?.distance !== void 0 ? n?.distance : 1e4
        },
        uSubgridOpacity: {
          value: n?.subgridOpacity !== void 0 ? n?.subgridOpacity : 0.15
        },
        uGridOpacity: {
          value: n?.gridOpacity !== void 0 ? n?.gridOpacity : 0.25
        }
      },
      vertexShader: `out vec3 worldPosition;
      uniform float uDistance;
      
      void main() {
        // Scale the plane by the drawing distance
        worldPosition = position.xzy * uDistance;
        worldPosition.xz += cameraPosition.xz;
      
        gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
      }`,
      fragmentShader: `out vec4 fragColor;
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
      }`,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ti extends ta {
  gridMaterial;
  constructor() {
    const n = new ei();
    super(new na(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ni = `#include <common>
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
}`, ai = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ii extends yn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ni,
      fragmentShader: ai
    });
  }
}
let yt = "Renderer", Ie, Et = !1, en = !1, $, se, Le, Ne;
function Ti(e) {
  const n = Ce(() => /* @__PURE__ */ new Map(), []), a = Ce(() => /* @__PURE__ */ new Map(), []), t = Ce(() => /* @__PURE__ */ new Map(), []), r = Ce(() => new aa(), []), c = Ce(() => new ia(), []), p = Ce(() => new ti(), []), o = Ce(() => new Yt(500), []), u = Ce(() => new Yt(100), []), d = Ce(() => new ra(), []), v = Ce(() => new sa(), []), b = Ce(() => new ii(), []), E = Ce(() => new oa({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function C(h, m) {
    const w = new Gt(-100, 100, 100, -100, 50, 3e3);
    return w.name = h, w.position.copy(m), w.lookAt(0, 0, 0), n.set(h, w), w;
  }
  const D = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], I = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ];
  Re(() => {
    r.name = "Debug Scene", c.name = "helpers", r.add(c), c.add(p), o.name = "axisHelper", c.add(o), u.name = "interactionHelper", c.add(u), u.visible = !1, C("Top", new W(0, 1e3, 0)), C("Bottom", new W(0, -1e3, 0)), C("Left", new W(-1e3, 0, 0)), C("Right", new W(1e3, 0, 0)), C("Front", new W(0, 0, 1e3)), C("Back", new W(0, 0, -1e3)), C("Orthographic", new W(1e3, 1e3, 1e3));
    const h = new Rt(60, 1, 50, 3e3);
    h.name = "Debug", h.position.set(500, 500, 500), h.lookAt(0, 0, 0), n.set("Debug", h), $ = n.get("Debug"), se = n.get("Orthographic"), Le = n.get("Front"), Ne = n.get("Top");
  }, []);
  const q = _e(null), B = _e(null), M = _e(null), z = _e(null), we = _e(null), ce = _e(null), [Y, Q] = oe(e.mode !== void 0 ? e.mode : "Single"), [x, Ae] = oe(null), [Fe, Oe] = oe(!1), [me, te] = oe(!1), [de, ve] = oe(!1), [, ge] = oe(Date.now()), K = (h, m) => {
    const w = a.get(h.name);
    w !== void 0 && w.dispose(), a.delete(h.name);
    const _ = t.get(h.name);
    _ !== void 0 && (r.remove(_), _.dispose()), t.delete(h.name);
    const G = new Qa(h, m);
    switch (G.enableDamping = !0, G.dampingFactor = 0.05, h.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        G.enableRotate = !1;
        break;
    }
    if (a.set(h.name, G), h instanceof Rt) {
      const V = new ua(h);
      t.set(h.name, V), r.add(V);
    }
  }, pe = (h) => {
    const m = t.get(h.name);
    m !== void 0 && (r.remove(m), m.dispose(), t.delete(h.name));
    const w = a.get(h.name);
    w !== void 0 && (w.dispose(), a.delete(h.name));
  }, Pe = () => {
    a.forEach((h, m) => {
      h.dispose();
      const w = t.get(m);
      w !== void 0 && (r.remove(w), w.dispose()), t.delete(m), a.delete(m);
    }), a.clear(), t.clear();
  }, ke = () => {
    switch (Y) {
      case "Single":
        K($, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        K($, M.current), K(se, z.current);
        break;
      case "Quad":
        K($, M.current), K(se, z.current), K(Le, we.current), K(Ne, ce.current);
        break;
    }
  };
  Re(() => {
    const h = new ca({
      canvas: q.current,
      stencil: !1
    });
    h.autoClear = !1, h.shadowMap.enabled = !0, h.setPixelRatio(devicePixelRatio), h.setClearColor(0), Ae(h);
  }, []), Re(() => {
    const h = (_) => {
      wn(Ie), r.remove(Ie);
      const G = e.scenes.get(_.value.name);
      if (G !== void 0) {
        const V = new G();
        e.onSceneSet !== void 0 && e.onSceneSet(V), Ie = V, e.three.scene = Ie, r.add(Ie), en = !0;
      }
    }, m = (_) => {
      const G = _.value, V = e.three.scene?.getObjectByProperty("uuid", G.uuid);
      V !== void 0 && n.set(G.name, V), ge(Date.now());
    }, w = (_) => {
      n.delete(_.value.name), ge(Date.now());
    };
    return P.addEventListener(k.SET_SCENE, h), P.addEventListener(k.ADD_CAMERA, m), P.addEventListener(k.REMOVE_CAMERA, w), () => {
      P.removeEventListener(k.SET_SCENE, h), P.removeEventListener(k.ADD_CAMERA, m), P.removeEventListener(k.REMOVE_CAMERA, w);
    };
  }, []), Re(() => {
    if (x === null)
      return;
    let h = window.innerWidth, m = window.innerHeight, w = Math.floor(h / 2), _ = Math.floor(m / 2), G = -1;
    const V = () => {
      h = window.innerWidth - 300, m = window.innerHeight, w = Math.floor(h / 2), _ = Math.floor(m / 2), x.setSize(h, m);
      let R = h, F = m;
      switch (Y) {
        case "Side by Side":
          R = w, F = m;
          break;
        case "Stacked":
          R = h, F = _;
          break;
        case "Quad":
          R = w, F = _;
          break;
      }
      n.forEach((ne) => {
        ne instanceof Gt ? (ne.left = R / -2, ne.right = R / 2, ne.top = F / 2, ne.bottom = F / -2, ne.updateProjectionMatrix()) : ne instanceof Rt && (ne.aspect = R / F, ne.updateProjectionMatrix(), t.get(ne.name)?.update());
      });
    }, ae = () => {
      x.setViewport(0, 0, h, m), x.setScissor(0, 0, h, m), x.render(r, $);
    }, U = () => {
      if (Y === "Side by Side")
        x.setViewport(0, 0, w, m), x.setScissor(0, 0, w, m), x.render(r, $), x.setViewport(w, 0, w, m), x.setScissor(w, 0, w, m), x.render(r, se);
      else {
        const R = m - _;
        x.setViewport(0, R, h, _), x.setScissor(0, R, h, _), x.render(r, $), x.setViewport(0, 0, h, _), x.setScissor(0, 0, h, _), x.render(r, se);
      }
    }, X = () => {
      let R = 0, F = 0;
      F = m - _, R = 0, x.setViewport(R, F, w, _), x.setScissor(R, F, w, _), x.render(r, $), R = w, x.setViewport(R, F, w, _), x.setScissor(R, F, w, _), x.render(r, se), F = 0, R = 0, x.setViewport(R, F, w, _), x.setScissor(R, F, w, _), x.render(r, Le), R = w, x.setViewport(R, F, w, _), x.setScissor(R, F, w, _), x.render(r, Ne);
    }, ie = () => {
      switch (a.forEach((R) => {
        R.update();
      }), e.onSceneUpdate !== void 0 && en && e.onSceneUpdate(Ie), x.clear(), Y) {
        case "Single":
          ae();
          break;
        case "Side by Side":
        case "Stacked":
          U();
          break;
        case "Quad":
          X();
          break;
      }
      G = requestAnimationFrame(ie);
    };
    return ke(), window.addEventListener("resize", V), V(), ie(), () => {
      window.removeEventListener("resize", V), cancelAnimationFrame(G), G = -1;
    };
  }, [Y, x]), Re(() => {
    if (x !== null) {
      const h = new la(), m = new he(), w = (ae, U, X, ie) => {
        switch (Y) {
          case "Quad":
            ae < X ? U < ie ? h.setFromCamera(m, $) : h.setFromCamera(m, Le) : U < ie ? h.setFromCamera(m, se) : h.setFromCamera(m, Ne);
            break;
          case "Side by Side":
            ae < X ? h.setFromCamera(m, $) : h.setFromCamera(m, se);
            break;
          case "Single":
            h.setFromCamera(m, $);
            break;
          case "Stacked":
            U < ie ? h.setFromCamera(m, $) : h.setFromCamera(m, se);
            break;
        }
      }, _ = (ae) => {
        if (!Et)
          return;
        const U = new he();
        x.getSize(U);
        const X = Math.min(ae.clientX, U.x), ie = Math.min(ae.clientY, U.y);
        m.x = Qe(X, 0, U.x, -1, 1), m.y = Qe(ie, 0, U.y, 1, -1);
        const R = U.x / 2, F = U.y / 2, ne = () => {
          X < R ? m.x = Qe(X, 0, R, -1, 1) : m.x = Qe(X, R, U.x, -1, 1);
        }, Se = () => {
          ie < F ? m.y = Qe(ie, 0, F, 1, -1) : m.y = Qe(ie, F, U.y, 1, -1);
        };
        switch (Y) {
          case "Quad":
            ne(), Se();
            break;
          case "Side by Side":
            ne();
            break;
          case "Stacked":
            Se(), Se();
            break;
        }
        w(X, ie, R, F);
        const Me = h.intersectObjects(Ie.children);
        Me.length > 0 && u.position.copy(Me[0].point);
      }, G = (ae) => {
        if (!Et)
          return;
        const U = new he();
        if (x.getSize(U), ae.clientX >= U.x)
          return;
        _(ae);
        const X = h.intersectObjects(Ie.children);
        X.length > 0 && e.three.getObject(X[0].object.uuid);
      }, V = B.current;
      return V.addEventListener("mousemove", _, !1), V.addEventListener("click", G, !1), () => {
        V.removeEventListener("mousemove", _), V.removeEventListener("click", G);
      };
    }
  }, [Y, x]);
  const fe = [];
  return n.forEach((h, m) => {
    fe.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: q }),
    x !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${Y === "Single" || Y === "Stacked" ? "single" : ""}`, ref: B, children: [
        Y === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(He, { camera: $, options: fe, ref: M, onSelect: (h) => {
          a.get($.name)?.dispose();
          const m = n.get(h);
          m !== void 0 && (pe($), $ = m, K(m, M.current));
        } }) }),
        (Y === "Side by Side" || Y === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(He, { camera: $, options: fe, ref: M, onSelect: (h) => {
            a.get($.name)?.dispose();
            const m = n.get(h);
            m !== void 0 && (pe($), $ = m, K(m, M.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: se, options: fe, ref: z, onSelect: (h) => {
            a.get(se.name)?.dispose();
            const m = n.get(h);
            m !== void 0 && (pe(se), se = m, K(m, z.current));
          } })
        ] }),
        Y === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(He, { camera: $, options: fe, ref: M, onSelect: (h) => {
            a.get($.name)?.dispose();
            const m = n.get(h);
            m !== void 0 && (pe($), $ = m, K(m, M.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: se, options: fe, ref: z, onSelect: (h) => {
            a.get(se.name)?.dispose();
            const m = n.get(h);
            m !== void 0 && (pe(se), se = m, K(m, z.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: Le, options: fe, ref: we, onSelect: (h) => {
            a.get(Le.name)?.dispose();
            const m = n.get(h);
            m !== void 0 && (pe(Le), Le = m, K(m, we.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: Ne, options: fe, ref: ce, onSelect: (h) => {
            a.get(Ne.name)?.dispose();
            const m = n.get(h);
            m !== void 0 && (pe(Ne), Ne = m, K(m, ce.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          Ct,
          {
            index: I.indexOf(Y),
            options: I,
            onSelect: (h) => {
              h !== Y && (Pe(), Q(h));
            },
            open: Fe,
            onToggle: (h) => {
              Oe(h), me && te(!1), de && ve(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Ct,
          {
            index: D.indexOf(yt),
            options: D,
            onSelect: (h) => {
              if (h !== yt)
                switch (yt = h, yt) {
                  case "Depth":
                    r.overrideMaterial = d;
                    break;
                  case "Normals":
                    r.overrideMaterial = v;
                    break;
                  default:
                  case "Renderer":
                    r.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    r.overrideMaterial = E;
                    break;
                  case "UVs":
                    r.overrideMaterial = b;
                    break;
                }
            },
            open: me,
            onToggle: (h) => {
              Fe && Oe(!1), te(h), de && ve(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Ct,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (h) => {
              Et = h === "Selection Mode", u.visible = Et;
            },
            open: de,
            onToggle: (h) => {
              Fe && Oe(!1), me && te(!1), ve(h);
            }
          }
        )
      ] })
    ] })
  ] });
}
function _i(e) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: e.header }),
    e.children,
    /* @__PURE__ */ l.jsx("footer", { children: e.footer })
  ] });
}
export {
  Nt as Accordion,
  pi as Application,
  xt as BaseRemote,
  Tn as ChildObject,
  ka as ContainerObject,
  Ra as Draggable,
  _a as DraggableItem,
  Aa as Dropdown,
  Pa as DropdownItem,
  _i as Editor,
  Za as Inspector,
  Ti as MultiView,
  Mn as NavButton,
  mi as RemoteComponents,
  ct as RemoteController,
  ya as RemoteTheatre,
  xi as RemoteThree,
  wi as RemoteTweakpane,
  Mi as SceneInspector,
  Oi as SidePanel,
  k as ToolEvents,
  ut as capitalize,
  di as clamp,
  va as colorToHex,
  vi as componentsApp,
  P as debugDispatcher,
  ui as defaultTheatreCallback,
  wn as dispose,
  ba as disposeMaterial,
  hi as disposeTexture,
  fi as distance,
  xn as hierarchyUUID,
  ma as isColor,
  Sn as noop,
  pa as randomID,
  ga as resetThreeObjects,
  At as round,
  gi as theatreApp,
  bi as theatreEditor,
  Si as theatreEditorApp,
  yi as threeApp,
  Ei as threeEditor,
  Dt as totalThreeObjects,
  Ci as tweakpaneApp
};
