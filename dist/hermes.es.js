import { EventDispatcher as an, Texture as rn, CubeTexture as In, RepeatWrapping as $t, Color as Ct, FrontSide as Nn, BackSide as Ln, DoubleSide as sn, NoBlending as Fn, NormalBlending as Bn, AdditiveBlending as Un, SubtractiveBlending as $n, MultiplyBlending as zn, CustomBlending as Yn, AddEquation as Vn, SubtractEquation as Gn, ReverseSubtractEquation as Hn, MinEquation as Wn, MaxEquation as qn, ZeroFactor as on, OneFactor as cn, SrcColorFactor as ln, OneMinusSrcColorFactor as un, SrcAlphaFactor as dn, OneMinusSrcAlphaFactor as hn, DstAlphaFactor as fn, OneMinusDstAlphaFactor as pn, DstColorFactor as mn, OneMinusDstColorFactor as vn, SrcAlphaSaturateFactor as Kn, ConstantColorFactor as gn, OneMinusConstantColorFactor as bn, ConstantAlphaFactor as yn, OneMinusConstantAlphaFactor as En, Matrix4 as Xn, Vector3 as q, Euler as Zn, Ray as Jn, Plane as Qn, MathUtils as ea, MOUSE as et, TOUCH as tt, Quaternion as zt, Spherical as Yt, Vector2 as me, ShaderMaterial as xn, GLSL3 as ta, Mesh as na, PlaneGeometry as aa, Scene as ia, Group as ra, AxesHelper as Vt, MeshDepthMaterial as sa, MeshNormalMaterial as oa, MeshBasicMaterial as ca, WebGLRenderer as la, PerspectiveCamera as Pt, Raycaster as ua, OrthographicCamera as Gt, CameraHelper as da } from "three";
import { Pane as ha } from "tweakpane";
import * as fa from "@tweakpane/plugin-essentials";
import Cn, { useState as ae, useRef as fe, useEffect as ke, forwardRef as pa, useMemo as xe } from "react";
import { Reorder as Sn } from "framer-motion";
const wn = () => {
}, fi = () => {
};
function St(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Xe(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Ht(t, n, a) {
  return (a - t) / (n - t);
}
function Wt(t, n, a) {
  return t * (1 - a) + n * a;
}
function pi(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function ma() {
  return Math.round(Math.random() * 1e6).toString();
}
function va(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function ga(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (u) => {
    const d = u.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, c = i(n), h = i(a), o = i(e);
  return "#" + c + h + o;
}
function ht(t, n = 1) {
  return Number(t.toFixed(n));
}
let Dt = 0;
const ba = () => {
  Dt = 0;
}, On = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Dt}`, Dt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    On(a);
  });
}, mi = (t) => {
  t?.dispose();
}, ya = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, Mn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : Mn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), ya(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class vi {
  components = /* @__PURE__ */ new Map();
  listen;
  // Protected
  _appID = "";
  _debugEnabled;
  _broadcastChannel = void 0;
  _webSocket = void 0;
  _mode = "app";
  _connected = !1;
  _useBC = !1;
  constructor(n, a, e = !0) {
    this._appID = n, this._debugEnabled = a, a && (this._useBC = e, e ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
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
  get appID() {
    return this._appID;
  }
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
const D = new an(), I = {
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
class wt {
  app;
  constructor(n) {
    this.app = n;
  }
  dispose() {
  }
  handleApp(n, a, e) {
  }
  handleEditor(n, a, e) {
  }
}
class gi extends wt {
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
  handleApp(n, a, e) {
    switch (e.event) {
      case "selectComponent":
        D.dispatchEvent({ type: I.SELECT_DROPDOWN, value: e.data });
        break;
      case "draggableListUpdate":
        D.dispatchEvent({ type: I.DRAG_UPDATE, value: e.data });
        break;
    }
  }
}
class Lt extends wt {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  studio = void 0;
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
    this.sheetObjects.forEach((a, e) => {
      e.search(`${n}_`) > -1 && this.unsubscribe(a);
    });
  }
  sheetObject(n, a, e, i) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const c = this.sheet(n);
    if (c === void 0)
      return;
    const h = `${n}_${a}`;
    let o = this.sheetObjects.get(h);
    o !== void 0 ? o = c.object(a, { ...e, ...o.value }, { reconfigure: !0 }) : o = c.object(a, e), this.sheetObjects.set(h, o), this.sheetObjectCBs.set(h, i !== void 0 ? i : wn);
    const u = o.onValuesChange((d) => {
      if (this.app.editor) {
        for (const b in d) {
          const E = d[b];
          typeof E == "object" && va(E) && (d[b] = {
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
            sheetObject: h,
            values: d
          }
        });
      }
      const f = this.sheetObjectCBs.get(h);
      f !== void 0 && f(d);
    });
    return this.sheetObjectUnsubscribe.set(h, u), o;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, e = n.address.objectKey;
    this.sheets.get(a)?.detachObject(e);
    const c = `${a}_${e}`, h = this.sheetObjectUnsubscribe.get(c);
    h !== void 0 && (this.sheetObjects.delete(c), this.sheetObjectCBs.delete(c), this.sheetObjectUnsubscribe.delete(c), h());
  }
  handleApp(n, a, e) {
    const i = a;
    let c;
    switch (e.event) {
      case "setSheet":
        c = i.sheets.get(e.data.sheet), c !== void 0 && (i.activeSheet = c, this.studio?.setSelection([c]));
        break;
      case "setSheetObject":
        c = i.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), c !== void 0 && this.studio?.setSelection([c]);
        break;
      case "updateSheetObject":
        c = i.sheets.get(e.data.sheet), c !== void 0 && c.sequence.pause(), c = i.sheetObjectCBs.get(e.data.sheetObject), c !== void 0 && c(e.data.values);
        break;
      case "updateTimeline":
        c = i.sheets.get(e.data.sheet), i.activeSheet !== void 0 && (i.activeSheet.sequence.position = e.data.position);
        break;
    }
  }
  handleEditor(n, a, e) {
    if (n.editor) {
      const i = a;
      switch (e.event) {
        case "playSheet":
          i.sheet(e.data.sheet)?.sequence.play(e.data.value);
          break;
        case "pauseSheet":
          i.sheet(e.data.sheet)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(n, a) {
    if (n.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((h) => {
        h.length < 1 || h.forEach((o) => {
          let u = o.address.sheetId, d = "setSheet", f = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              d = "setSheet", f = {
                sheet: o.address.sheetId
              }, a.activeSheet = a.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              d = "setSheetObject", u += `_${o.address.objectKey}`, f = {
                id: u,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, a.activeSheet = a.sheets.get(o.address.sheetId);
              break;
          }
          n.send({ event: d, target: "app", data: f });
        });
      });
      let e = -1;
      const i = () => {
        if (Lt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && e !== a.activeSheet.sequence.position) {
          e = a.activeSheet.sequence.position;
          const h = a.activeSheet;
          n.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: e,
              sheet: h.address.sheetId
            }
          });
        }
      }, c = () => {
        i(), requestAnimationFrame(c);
      };
      i(), c();
    } else
      this.studio?.ui.hide();
  }
}
function bi(t, n, a) {
  if (t.editor) {
    a.ui.restore(), a.onSelectionChange((h) => {
      h.length < 1 || h.forEach((o) => {
        let u = o.address.sheetId, d = "setSheet", f = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", f = {
              sheet: o.address.sheetId
            }, n.activeSheet = n.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", u += `_${o.address.objectKey}`, f = {
              id: u,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, n.activeSheet = n.sheets.get(o.address.sheetId);
            break;
        }
        t.send({ event: d, target: "app", data: f });
      });
    });
    let e = -1;
    const i = () => {
      if (Lt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && e !== n.activeSheet.sequence.position) {
        e = n.activeSheet.sequence.position;
        const h = n.activeSheet;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: e,
            sheet: h.address.sheetId
          }
        });
      }
    }, c = () => {
      i(), requestAnimationFrame(c);
    };
    i(), c();
  } else
    a.ui.hide();
}
function Ea(t) {
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
function Tn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(Tn(a));
  }), n;
}
function xa(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Ca(t) {
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
function nt(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Ca(a))
      continue;
    const e = typeof t[a], i = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = i;
        break;
      case "object":
        if (i !== null)
          if (n[a] = i, i.isTexture)
            if (i instanceof rn) {
              const c = i.source.toJSON();
              n[a] = { src: c.url };
            } else
              i instanceof In && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = xa(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function At(t) {
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
      const i = [];
      e.material.forEach((c) => {
        i.push(nt(c));
      }), n.material = i;
    } else
      n.material = nt(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((c) => {
        i.push(nt(c));
      }), n.material = i;
    } else
      n.material = nt(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((c) => {
        i.push(nt(c));
      }), n.material = i;
    } else
      n.material = nt(e.material);
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
function Sa(t, n) {
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
function K(t, n, a) {
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
function It(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const i = new rn(e);
      i.wrapS = $t, i.wrapT = $t, i.needsUpdate = !0, n(i);
    }, e.onerror = a, e.src = t;
  });
}
class yi extends wt {
  scene = void 0;
  renderer = void 0;
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = At(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: a
    });
  }
  requestMethod(n, a, e, i) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e,
        subitem: i
      }
    });
  }
  updateObject(n, a, e) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e
      }
    });
  }
  createTexture(n, a, e) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e
      }
    });
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    ba(), On(this.scene);
    const a = Tn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = At(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = At(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
  handleApp(n, a, e) {
    switch (e.event) {
      case "getObject":
        D.dispatchEvent({ type: I.GET_OBJECT, value: e.data });
        break;
      case "updateObject":
        D.dispatchEvent({ type: I.UPDATE_OBJECT, value: e.data });
        break;
      case "createTexture":
        D.dispatchEvent({ type: I.CREATE_TEXTURE, value: e.data });
        break;
      case "requestMethod":
        D.dispatchEvent({ type: I.REQUEST_METHOD, value: e.data });
        break;
    }
  }
  handleEditor(n, a, e) {
    switch (e.event) {
      case "setObject":
        D.dispatchEvent({ type: I.SET_OBJECT, value: e.data });
        break;
      case "setScene":
        D.dispatchEvent({ type: I.SET_SCENE, value: e.data });
        break;
      case "addCamera":
        D.dispatchEvent({ type: I.ADD_CAMERA, value: e.data });
        break;
      case "removeCamera":
        D.dispatchEvent({ type: I.REMOVE_CAMERA, value: e.data });
        break;
    }
  }
  // Renderer
  resize(n, a) {
    this.renderer?.setSize(n, a);
  }
  set dpr(n) {
    this.renderer?.setPixelRatio(Xe(1, 2, n));
  }
  get dpr() {
    return this.renderer !== void 0 ? this.renderer?.getPixelRatio() : 1;
  }
  get width() {
    return this.renderer !== void 0 ? this.renderer?.domElement.width / this.dpr : 0;
  }
  get height() {
    return this.renderer !== void 0 ? this.renderer?.domElement.height / this.dpr : 0;
  }
  get canvas() {
    return this.renderer !== void 0 ? this.renderer?.domElement : null;
  }
}
class Ei extends wt {
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
    this.pane = new ha({ title: "GUI" }), this.pane.registerPlugin(fa);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(n, a = void 0, e = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addFolder({
        title: n,
        ...a
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: n,
        params: a,
        parent: e
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(n, a, e, i = void 0) {
    const c = this.bindID, h = e.onChange !== void 0 ? e.onChange : wn;
    this.bindCBs.set(c, h), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, e).on("change", (u) => {
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
        params: e,
        parent: i
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, a) {
    const e = this.bindCBs.get(n);
    e !== void 0 ? e(a) : console.warn(`No callback for: ${n}`, a);
  }
  // Buttons
  button(n, a, e = void 0) {
    const i = this.bindID;
    this.buttonCBs.set(i, a), this.app.editor ? (this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addButton({ title: n }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: i
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: i,
        name: n,
        callback: a,
        parent: e
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
  handleApp(n, a, e) {
    const i = a;
    switch (e.event) {
      case "addFolder":
        i.addFolder(e.data.name, e.data.params, e.data.parent);
        break;
      case "bindObject":
        i.bind(e.data.name, e.data.params, e.data.parent);
        break;
      case "updateBind":
        i.triggerBind(e.data.id, e.data.value);
        break;
      case "addButton":
        i.button(e.data.name, e.data.callback, e.data.parent);
        break;
      case "clickButton":
        i.triggerButton(e.data.id);
        break;
    }
  }
}
var Nt = { exports: {} }, ct = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qt;
function wa() {
  if (qt)
    return ct;
  qt = 1;
  var t = Cn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(o, u, d) {
    var f, b = {}, E = null, x = null;
    d !== void 0 && (E = "" + d), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (f in u)
      e.call(u, f) && !c.hasOwnProperty(f) && (b[f] = u[f]);
    if (o && o.defaultProps)
      for (f in u = o.defaultProps, u)
        b[f] === void 0 && (b[f] = u[f]);
    return { $$typeof: n, type: o, key: E, ref: x, props: b, _owner: i.current };
  }
  return ct.Fragment = a, ct.jsx = h, ct.jsxs = h, ct;
}
var lt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kt;
function Oa() {
  return Kt || (Kt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Cn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), o = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), M = Symbol.iterator, P = "@@iterator";
    function V(r) {
      if (r === null || typeof r != "object")
        return null;
      var m = M && r[M] || r[P];
      return typeof m == "function" ? m : null;
    }
    var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(r) {
      {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
          g[w - 1] = arguments[w];
        O("error", r, g);
      }
    }
    function O(r, m, g) {
      {
        var w = U.ReactDebugCurrentFrame, N = w.getStackAddendum();
        N !== "" && (m += "%s", g = g.concat([N]));
        var B = g.map(function(k) {
          return String(k);
        });
        B.unshift("Warning: " + m), Function.prototype.apply.call(console[r], console, B);
      }
    }
    var re = !1, Q = !1, Ce = !1, G = !1, ee = !1, ve;
    ve = Symbol.for("react.module.reference");
    function ze(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === c || ee || r === i || r === d || r === f || G || r === x || re || Q || Ce || typeof r == "object" && r !== null && (r.$$typeof === E || r.$$typeof === b || r.$$typeof === h || r.$$typeof === o || r.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === ve || r.getModuleId !== void 0));
    }
    function Me(r, m, g) {
      var w = r.displayName;
      if (w)
        return w;
      var N = m.displayName || m.name || "";
      return N !== "" ? g + "(" + N + ")" : g;
    }
    function $(r) {
      return r.displayName || "Context";
    }
    function le(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case c:
          return "Profiler";
        case i:
          return "StrictMode";
        case d:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case o:
            var m = r;
            return $(m) + ".Consumer";
          case h:
            var g = r;
            return $(g._context) + ".Provider";
          case u:
            return Me(r, r.render, "ForwardRef");
          case b:
            var w = r.displayName || null;
            return w !== null ? w : le(r.type) || "Memo";
          case E: {
            var N = r, B = N._payload, k = N._init;
            try {
              return le(k(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var S = Object.assign, Te = 0, ge, _e, je, Re, Pe, De, Ye;
    function te() {
    }
    te.__reactDisabledLog = !0;
    function Se() {
      {
        if (Te === 0) {
          ge = console.log, _e = console.info, je = console.warn, Re = console.error, Pe = console.group, De = console.groupCollapsed, Ye = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: te,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        Te++;
      }
    }
    function it() {
      {
        if (Te--, Te === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: S({}, r, {
              value: ge
            }),
            info: S({}, r, {
              value: _e
            }),
            warn: S({}, r, {
              value: je
            }),
            error: S({}, r, {
              value: Re
            }),
            group: S({}, r, {
              value: Pe
            }),
            groupCollapsed: S({}, r, {
              value: De
            }),
            groupEnd: S({}, r, {
              value: Ye
            })
          });
        }
        Te < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ve = U.ReactCurrentDispatcher, pe;
    function p(r, m, g) {
      {
        if (pe === void 0)
          try {
            throw Error();
          } catch (N) {
            var w = N.stack.trim().match(/\n( *(at )?)/);
            pe = w && w[1] || "";
          }
        return `
` + pe + r;
      }
    }
    var v = !1, C;
    {
      var _ = typeof WeakMap == "function" ? WeakMap : Map;
      C = new _();
    }
    function H(r, m) {
      if (!r || v)
        return "";
      {
        var g = C.get(r);
        if (g !== void 0)
          return g;
      }
      var w;
      v = !0;
      var N = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = Ve.current, Ve.current = null, Se();
      try {
        if (m) {
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
            } catch (Ie) {
              w = Ie;
            }
            Reflect.construct(r, [], k);
          } else {
            try {
              k.call();
            } catch (Ie) {
              w = Ie;
            }
            r.call(k.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ie) {
            w = Ie;
          }
          r();
        }
      } catch (Ie) {
        if (Ie && w && typeof Ie.stack == "string") {
          for (var R = Ie.stack.split(`
`), he = w.stack.split(`
`), J = R.length - 1, ne = he.length - 1; J >= 1 && ne >= 0 && R[J] !== he[ne]; )
            ne--;
          for (; J >= 1 && ne >= 0; J--, ne--)
            if (R[J] !== he[ne]) {
              if (J !== 1 || ne !== 1)
                do
                  if (J--, ne--, ne < 0 || R[J] !== he[ne]) {
                    var Ee = `
` + R[J].replace(" at new ", " at ");
                    return r.displayName && Ee.includes("<anonymous>") && (Ee = Ee.replace("<anonymous>", r.displayName)), typeof r == "function" && C.set(r, Ee), Ee;
                  }
                while (J >= 1 && ne >= 0);
              break;
            }
        }
      } finally {
        v = !1, Ve.current = B, it(), Error.prepareStackTrace = N;
      }
      var Qe = r ? r.displayName || r.name : "", Ut = Qe ? p(Qe) : "";
      return typeof r == "function" && C.set(r, Ut), Ut;
    }
    function X(r, m, g) {
      return H(r, !1);
    }
    function de(r) {
      var m = r.prototype;
      return !!(m && m.isReactComponent);
    }
    function z(r, m, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return H(r, de(r));
      if (typeof r == "string")
        return p(r);
      switch (r) {
        case d:
          return p("Suspense");
        case f:
          return p("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case u:
            return X(r.render);
          case b:
            return z(r.type, m, g);
          case E: {
            var w = r, N = w._payload, B = w._init;
            try {
              return z(B(N), m, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Z = Object.prototype.hasOwnProperty, se = {}, A = U.ReactDebugCurrentFrame;
    function L(r) {
      if (r) {
        var m = r._owner, g = z(r.type, r._source, m ? m.type : null);
        A.setExtraStackFrame(g);
      } else
        A.setExtraStackFrame(null);
    }
    function ie(r, m, g, w, N) {
      {
        var B = Function.call.bind(Z);
        for (var k in r)
          if (B(r, k)) {
            var R = void 0;
            try {
              if (typeof r[k] != "function") {
                var he = Error((w || "React class") + ": " + g + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              R = r[k](m, k, w, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (J) {
              R = J;
            }
            R && !(R instanceof Error) && (L(N), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", g, k, typeof R), L(null)), R instanceof Error && !(R.message in se) && (se[R.message] = !0, L(N), j("Failed %s type: %s", g, R.message), L(null));
          }
      }
    }
    var we = Array.isArray;
    function Ne(r) {
      return we(r);
    }
    function Ot(r) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, g = m && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g;
      }
    }
    function ft(r) {
      try {
        return pt(r), !1;
      } catch {
        return !0;
      }
    }
    function pt(r) {
      return "" + r;
    }
    function mt(r) {
      if (ft(r))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ot(r)), pt(r);
    }
    var Le = U.ReactCurrentOwner, rt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, st, vt, Je;
    Je = {};
    function Mt(r) {
      if (Z.call(r, "ref")) {
        var m = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Tt(r) {
      if (Z.call(r, "key")) {
        var m = Object.getOwnPropertyDescriptor(r, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function gt(r, m) {
      if (typeof r.ref == "string" && Le.current && m && Le.current.stateNode !== m) {
        var g = le(Le.current.type);
        Je[g] || (j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', le(Le.current.type), r.ref), Je[g] = !0);
      }
    }
    function Fe(r, m) {
      {
        var g = function() {
          st || (st = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Bt(r, m) {
      {
        var g = function() {
          vt || (vt = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var s = function(r, m, g, w, N, B, k) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: m,
        ref: g,
        props: k,
        // Record the component responsible for creating this element.
        _owner: B
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
        value: w
      }), Object.defineProperty(R, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: N
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function y(r, m, g, w, N) {
      {
        var B, k = {}, R = null, he = null;
        g !== void 0 && (mt(g), R = "" + g), Tt(m) && (mt(m.key), R = "" + m.key), Mt(m) && (he = m.ref, gt(m, N));
        for (B in m)
          Z.call(m, B) && !rt.hasOwnProperty(B) && (k[B] = m[B]);
        if (r && r.defaultProps) {
          var J = r.defaultProps;
          for (B in J)
            k[B] === void 0 && (k[B] = J[B]);
        }
        if (R || he) {
          var ne = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          R && Fe(k, ne), he && Bt(k, ne);
        }
        return s(r, R, he, N, w, Le.current, k);
      }
    }
    var T = U.ReactCurrentOwner, F = U.ReactDebugCurrentFrame;
    function W(r) {
      if (r) {
        var m = r._owner, g = z(r.type, r._source, m ? m.type : null);
        F.setExtraStackFrame(g);
      } else
        F.setExtraStackFrame(null);
    }
    var be;
    be = !1;
    function ue(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function _t() {
      {
        if (T.current) {
          var r = le(T.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Rt(r) {
      {
        if (r !== void 0) {
          var m = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + m + ":" + g + ".";
        }
        return "";
      }
    }
    var ot = {};
    function Oe(r) {
      {
        var m = _t();
        if (!m) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (m = `

Check the top-level render call using <` + g + ">.");
        }
        return m;
      }
    }
    function ye(r, m) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = Oe(m);
        if (ot[g])
          return;
        ot[g] = !0;
        var w = "";
        r && r._owner && r._owner !== T.current && (w = " It was passed a child from " + le(r._owner.type) + "."), W(r), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, w), W(null);
      }
    }
    function Ge(r, m) {
      {
        if (typeof r != "object")
          return;
        if (Ne(r))
          for (var g = 0; g < r.length; g++) {
            var w = r[g];
            ue(w) && ye(w, m);
          }
        else if (ue(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var N = V(r);
          if (typeof N == "function" && N !== r.entries)
            for (var B = N.call(r), k; !(k = B.next()).done; )
              ue(k.value) && ye(k.value, m);
        }
      }
    }
    function He(r) {
      {
        var m = r.type;
        if (m == null || typeof m == "string")
          return;
        var g;
        if (typeof m == "function")
          g = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === b))
          g = m.propTypes;
        else
          return;
        if (g) {
          var w = le(m);
          ie(g, r.props, "prop", w, r);
        } else if (m.PropTypes !== void 0 && !be) {
          be = !0;
          var N = le(m);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", N || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function We(r) {
      {
        for (var m = Object.keys(r.props), g = 0; g < m.length; g++) {
          var w = m[g];
          if (w !== "children" && w !== "key") {
            W(r), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), W(null);
            break;
          }
        }
        r.ref !== null && (W(r), j("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    function qe(r, m, g, w, N, B) {
      {
        var k = ze(r);
        if (!k) {
          var R = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = Rt(N);
          he ? R += he : R += _t();
          var J;
          r === null ? J = "null" : Ne(r) ? J = "array" : r !== void 0 && r.$$typeof === n ? (J = "<" + (le(r.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : J = typeof r, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, R);
        }
        var ne = y(r, m, g, N, B);
        if (ne == null)
          return ne;
        if (k) {
          var Ee = m.children;
          if (Ee !== void 0)
            if (w)
              if (Ne(Ee)) {
                for (var Qe = 0; Qe < Ee.length; Qe++)
                  Ge(Ee[Qe], r);
                Object.freeze && Object.freeze(Ee);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ge(Ee, r);
        }
        return r === e ? We(ne) : He(ne), ne;
      }
    }
    function An(r, m, g) {
      return qe(r, m, g, !0);
    }
    function kn(r, m, g) {
      return qe(r, m, g, !1);
    }
    var jn = kn, Dn = An;
    lt.Fragment = e, lt.jsx = jn, lt.jsxs = Dn;
  }()), lt;
}
process.env.NODE_ENV === "production" ? Nt.exports = wa() : Nt.exports = Oa();
var l = Nt.exports;
function _n(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
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
function _a(t) {
  return /* @__PURE__ */ l.jsx(Sn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ta,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ma })
  ] }) }, t.title);
}
function Ra(t) {
  const [n, a] = ae(!1), [e, i] = ae(t.options), c = (d) => {
    t.onDragComplete(d), i(d);
  }, h = (d) => {
    const f = [...e];
    f.splice(d, 1), c(f);
  }, o = [];
  e.forEach((d, f) => {
    o.push(/* @__PURE__ */ l.jsx(_a, { index: f, title: d, onDelete: h }, d));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(_n, { title: t.title }),
    /* @__PURE__ */ l.jsx(Sn.Group, { axis: "y", values: e, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: o })
  ] });
}
function Pa(t) {
  const [n, a] = ae(!1), e = [];
  t.options.map((c, h) => {
    t.onSelect !== void 0 && (c.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Aa, { option: c }, h));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(_n, { title: t.title }),
        /* @__PURE__ */ l.jsx(
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
function Aa(t) {
  const { option: n } = t, [a, e] = ae("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
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
      i = /* @__PURE__ */ l.jsx(
        Pa,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      i = /* @__PURE__ */ l.jsx(
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: i }, ma());
}
function xi(t, n, a) {
  function e(c) {
    switch (n.forEach((h) => {
      h.callback(t, h.remote, c);
    }), c.event) {
      case "custom":
        D.dispatchEvent({ type: I.CUSTOM, value: c.data });
        break;
    }
  }
  function i(c) {
    switch (a.forEach((h) => {
      h.callback(t, h.remote, c);
    }), c.event) {
      case "custom":
        D.dispatchEvent({ type: I.CUSTOM, value: c.data });
        break;
    }
  }
  t.listen = (c) => {
    c.target === "editor" ? i(c) : e(c);
  };
}
function Ft(t) {
  const [n, a] = ae(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const i = !n;
          t.onToggle !== void 0 && t.onToggle(i), a(i);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: St(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function Rn(t) {
  const [n, a] = ae(!1), e = t.child !== void 0 && t.child.children.length > 0, i = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((c) => {
    i.push(/* @__PURE__ */ l.jsx(Rn, { child: c, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx(l.Fragment, { children: t.child !== void 0 && /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ l.jsx(
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
            left: e ? "20px" : "5px"
          },
          onClick: () => {
            t.child !== void 0 && (t.three.getObject(t.child.uuid), n || a(!0));
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Ea(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: i }) })
  ] }, Math.random()) });
}
function ka(t) {
  const n = [];
  return t.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Rn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const ja = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Da(t) {
  return "items" in t;
}
function Ze(t) {
  const n = [];
  return t.items.forEach((a) => {
    Da(a) ? n.push(
      /* @__PURE__ */ l.jsx(Ze, { title: St(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        dt,
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
          onChange: (e, i) => {
            a.onChange !== void 0 && a.onChange(e, i);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Ft, { label: t.title, open: t.expanded === !0, children: n });
}
function Ia(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Ae(t) {
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
function Na(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function La() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], i = new FileReader();
        i.onload = function(c) {
          n(c.target.result);
        }, i.readAsDataURL(e);
      }
    }), t.click();
  });
}
const Fa = [
  {
    title: "Front",
    value: Nn
  },
  {
    title: "Back",
    value: Ln
  },
  {
    title: "Double",
    value: sn
  }
], Ba = [
  {
    title: "No Blending",
    value: Fn
  },
  {
    title: "Normal",
    value: Bn
  },
  {
    title: "Additive",
    value: Un
  },
  {
    title: "Subtractive",
    value: $n
  },
  {
    title: "Multiply",
    value: zn
  },
  {
    title: "Custom",
    value: Yn
  }
], Ua = [
  {
    title: "Add",
    value: Vn
  },
  {
    title: "Subtract",
    value: Gn
  },
  {
    title: "Reverse Subtract",
    value: Hn
  },
  {
    title: "Min",
    value: Wn
  },
  {
    title: "Max",
    value: qn
  }
], $a = [
  {
    title: "Zero",
    valye: on
  },
  {
    title: "One",
    valye: cn
  },
  {
    title: "Src Color",
    valye: ln
  },
  {
    title: "One Minus Src Color",
    valye: un
  },
  {
    title: "Src Alpha",
    valye: dn
  },
  {
    title: "One Minus Src Alpha",
    valye: hn
  },
  {
    title: "Dst Alpha",
    valye: fn
  },
  {
    title: "One Minus Dst Alpha",
    valye: pn
  },
  {
    title: "Dst Color",
    valye: mn
  },
  {
    title: "One Minus Dst Color",
    valye: vn
  },
  {
    title: "Src Alpha Saturate",
    valye: Kn
  },
  {
    title: "Constant Color",
    valye: gn
  },
  {
    title: "One Minus Constant Color",
    valye: bn
  },
  {
    title: "Constant Alpha",
    valye: yn
  },
  {
    title: "One Minus Constant Alpha",
    valye: En
  }
], za = [
  {
    title: "Zero",
    valye: on
  },
  {
    title: "One",
    valye: cn
  },
  {
    title: "Src Color",
    valye: ln
  },
  {
    title: "One Minus Src Color",
    valye: un
  },
  {
    title: "Src Alpha",
    valye: dn
  },
  {
    title: "One Minus Src Alpha",
    valye: hn
  },
  {
    title: "Dst Alpha",
    valye: fn
  },
  {
    title: "One Minus Dst Alpha",
    valye: pn
  },
  {
    title: "Dst Color",
    valye: mn
  },
  {
    title: "One Minus Dst Color",
    valye: vn
  },
  {
    title: "Constant Color",
    valye: gn
  },
  {
    title: "One Minus Constant Color",
    valye: bn
  },
  {
    title: "Constant Alpha",
    valye: yn
  },
  {
    title: "One Minus Constant Alpha",
    valye: En
  }
];
function ut(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Ya(t, n, a, e) {
  return {
    type: "boolean",
    title: Ae(t),
    prop: t,
    value: n,
    needsUpdate: !0,
    onChange: (i, c) => {
      e.updateObject(a.uuid, `material.${t}`, c), e.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = e.scene?.getObjectByProperty("uuid", a.uuid);
      h !== void 0 && K(h, `material.${t}`, c);
    }
  };
}
function Va(t, n, a, e) {
  const i = {
    type: "number",
    title: Ae(t),
    prop: t,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (c, h) => {
      e.updateObject(a.uuid, `material.${t}`, h), e.updateObject(a.uuid, "material.needsUpdate", !0);
      const o = e.scene?.getObjectByProperty("uuid", a.uuid);
      o !== void 0 && K(o, `material.${t}`, h);
    }
  };
  switch (t) {
    case "blending":
      ut(i, Ba);
      break;
    case "blendDst":
      ut(i, za);
      break;
    case "blendEquation":
      ut(i, Ua);
      break;
    case "blendSrc":
      ut(i, $a);
      break;
    case "side":
      ut(i, Fa);
      break;
  }
  return Na(t) && (i.value = Number(n), i.type = "range", i.min = 0, i.max = 1, i.step = 0.01), i;
}
function Ga(t, n, a, e) {
  const i = {
    type: "string",
    title: Ae(t),
    prop: t,
    value: n,
    needsUpdate: !0,
    onChange: (h, o) => {
      e.updateObject(a.uuid, `material.${t}`, o), e.updateObject(a.uuid, "material.needsUpdate", !0);
      const u = e.scene?.getObjectByProperty("uuid", a.uuid);
      u !== void 0 && K(u, `material.${t}`, o);
    }
  };
  return (t === "vertexShader" || t === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (h, o) => {
    i.latest = o;
  }), i;
}
function Xt(t, n, a) {
  const e = [];
  for (const i in t) {
    if (!Ia(i))
      continue;
    const c = typeof t[i], h = t[i];
    if (c === "boolean")
      e.push(Ya(i, h, n, a));
    else if (c === "number")
      e.push(Va(i, h, n, a));
    else if (c === "string")
      e.push(Ga(i, h, n, a));
    else if (c === "object")
      if (h.isColor)
        e.push({
          title: Ae(i),
          prop: i,
          type: "color",
          value: h,
          onChange: (o, u) => {
            const d = new Ct(u);
            a.updateObject(n.uuid, `material.${o}`, d);
            const f = a.scene?.getObjectByProperty("uuid", n.uuid);
            f !== void 0 && K(f, `material.${o}`, d);
          }
        });
      else if (Array.isArray(h)) {
        const o = [];
        for (const u in h)
          o.push({
            title: `${u}`,
            type: `${typeof h[u]}`,
            value: h[u],
            onChange: (d, f) => {
              a.updateObject(n.uuid, `material.${i}`, f);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && K(b, `material.${i}`, f);
            }
          });
        e.push({
          title: Ae(i),
          items: o
        });
      } else if (h.x !== void 0 && h.y !== void 0 && h.z === void 0)
        e.push({
          title: Ae(i),
          prop: i,
          type: "vector",
          value: h,
          onChange: (o, u) => {
            a.updateObject(n.uuid, `material.${o}`, u);
            const d = a.scene?.getObjectByProperty("uuid", n.uuid);
            d !== void 0 && K(d, `material.${o}`, u);
          }
        });
      else {
        const o = [];
        for (const u in h) {
          const d = h[u];
          switch (typeof d) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: Ae(i),
                type: "image",
                value: d,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${i}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && It(E).then((M) => {
                    K(x, `material.${i}`, M), K(x, "material.needsUpdate", !0);
                  });
                }
              }) : o.push({
                title: `${Ae(u)}`,
                prop: `material.${i}.${u}`,
                type: `${typeof t[i][u]}`,
                value: h[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${i}.${u}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && K(x, `material.${i}.${u}`, E);
                }
              });
              break;
            case "object":
              if (d.value !== void 0 && d.value.src !== void 0)
                o.push({
                  title: Ae(u),
                  type: "image",
                  value: d.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${i}.${u}.value`, h);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && It(E).then((M) => {
                      K(x, `material.${i}.${u}.value`, M);
                    });
                  }
                });
              else if (i === "uniforms") {
                const b = d.value, E = (x, M, P) => ({
                  title: x,
                  type: "number",
                  value: P,
                  step: 0.01,
                  onChange: (V, U) => {
                    const j = `material.uniforms.${u}.value.${M}`;
                    a.updateObject(n.uuid, j, U);
                    const O = a.scene?.getObjectByProperty("uuid", n.uuid);
                    O !== void 0 && K(O, j, U);
                  }
                });
                if (typeof d.value == "number")
                  o.push({
                    title: u,
                    type: "number",
                    value: d.value,
                    step: 0.01,
                    onChange: (x, M) => {
                      const P = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, P, M);
                      const V = a.scene?.getObjectByProperty("uuid", n.uuid);
                      V !== void 0 && K(V, P, M);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  o.push({
                    title: u,
                    type: "color",
                    value: d.value,
                    onChange: (x, M) => {
                      const P = new Ct(M), V = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, V, P);
                      const U = a.scene?.getObjectByProperty("uuid", n.uuid);
                      U !== void 0 && K(U, V, P);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  o.push({
                    title: u,
                    type: "vector",
                    value: d.value,
                    prop: `material.${i}.${u}.value`,
                    onChange: (x, M) => {
                      a.updateObject(n.uuid, x, M);
                      const P = a.scene?.getObjectByProperty("uuid", n.uuid);
                      P !== void 0 && K(P, x, M);
                    }
                  });
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
                  const x = b.elements, M = [];
                  for (let P = 0; P < x.length; P++)
                    M.push(E(P.toString(), P.toString(), x[P]));
                  o.push(
                    {
                      title: u,
                      items: M
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
                    a.updateObject(n.uuid, `material.${i}.${u}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && K(x, `material.${i}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        o.length > 0 && e.push({
          title: Ae(i),
          items: o
        });
      }
    else
      h !== void 0 && console.log("other:", i, c, h);
  }
  return e.sort((i, c) => i.title < c.title ? -1 : i.title > c.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Ha(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], i = a.length;
    for (let c = 0; c < i; c++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Ze,
          {
            title: `Material ${c}`,
            items: Xt(a[c], t, n)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Ze,
      {
        title: "Material",
        items: Xt(a, t, n)
      }
    );
}
function Wa(t) {
  const n = fe(null), a = fe(null), e = fe(null), i = fe(null), c = fe(null), h = fe(null), [o, u] = ae(t.value), [d, f] = ae({ min: t.min, max: t.max }), [b, E] = ae(!1);
  function x() {
    b || (window.addEventListener("mousemove", P), window.addEventListener("mouseup", M), window.addEventListener("mouseup", M), E(!0));
  }
  function M() {
    window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", M), E(!1);
  }
  function P(O) {
    const re = c.current.getBoundingClientRect(), Q = Xe(0, 99, O.clientX - re.left) / 99, Ce = Xe(0, 99, O.clientY - re.top) / 99, G = ht(Wt(d.min, d.max, Q), 3), ee = ht(Wt(d.min, d.max, Ce), 3);
    t.onChange({ target: { value: { x: G, y: ee } } }), u({ x: G, y: ee });
  }
  function V(O) {
    let re = o.x, Q = o.y;
    O.target === n.current ? re = Number(O.target.value) : Q = Number(O.target.value), u({ x: re, y: Q });
  }
  function U() {
    const O = Number(e.current.value);
    f({ min: O, max: d.max }), (o.x < O || o.y < O) && u({ x: Xe(O, d.max, o.x), y: Xe(O, d.max, o.y) });
  }
  function j() {
    const O = Number(i.current.value);
    f({ min: d.min, max: O }), (o.x > O || o.y > O) && u({ x: Xe(d.min, O, o.x), y: Xe(d.min, O, o.y) });
  }
  return ke(() => {
    const O = Ht(d.min, d.max, o.x), re = Ht(d.min, d.max, o.y);
    h.current.style.left = `${O * 100}%`, h.current.style.top = `${re * 100}%`;
  }, [d, o]), /* @__PURE__ */ l.jsxs("div", { className: "vector", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: o.x,
            min: d.min,
            max: d.max,
            step: 0.01,
            onChange: V
          }
        )
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: o.y,
            min: d.min,
            max: d.max,
            step: 0.01,
            onChange: V
          }
        )
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: d.min,
            step: 0.01,
            onChange: U
          }
        )
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: d.max,
            step: 0.01,
            onChange: j
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: c, onMouseDown: x, onMouseUp: M, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: h })
    ] })
  ] });
}
function dt(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = ga(t.value));
  const [a, e] = ae(n), i = fe(null), c = fe(null), h = fe(null);
  ke(() => {
    let f = !1, b = -1, E = 0, x = Number(a);
    const M = (O) => {
      f = !0, E = x, b = O.clientX;
    }, P = (O) => {
      if (!f)
        return;
      const re = t.step !== void 0 ? t.step : 1, Q = (O.clientX - b) * re;
      x = Number((E + Q).toFixed(4)), c.current !== null && (c.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, V = () => {
      f = !1;
    }, U = () => {
      f = !1;
    }, j = t.type === "number";
    return j && (i.current?.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", V, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", U, !1)), () => {
      j && (i.current?.removeEventListener("mousedown", M), document.removeEventListener("mouseup", V), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", U));
    };
  }, [a]);
  const o = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = o || t.type === "image" || t.type === "vector", d = (f) => {
    let b = f.target.value;
    t.type === "boolean" ? b = f.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: St(t.title) }, "fieldLabel"),
    t.type === "string" && !o && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: d,
        value: a
      }
    ),
    t.type === "string" && o && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: d,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: d,
        checked: a
      }
    ),
    t.type === "number" && /* @__PURE__ */ l.jsx(
      "input",
      {
        ref: c,
        type: "number",
        value: a,
        min: t.min,
        max: t.max,
        step: t.step,
        disabled: t.disabled,
        onChange: d
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: t.disabled, className: "min" }),
      /* @__PURE__ */ l.jsx(
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
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: d, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: d, disabled: t.disabled })
    ] }),
    t.type === "button" && /* @__PURE__ */ l.jsx(
      "button",
      {
        disabled: t.disabled,
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: h, onClick: () => {
      La().then((f) => {
        h.current.src = f, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, f);
      });
    }, src: a.length > 0 ? a : ja }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: d, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((f, b) => /* @__PURE__ */ l.jsx("option", { value: f.value, children: St(f.title) }, b)) }) }),
    t.type === "vector" && /* @__PURE__ */ l.jsx(Wa, { value: a, min: -1, max: 1, onChange: d })
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
function qa(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Zt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, c) => {
          n.updateObject(t.uuid, i, c), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = n.scene?.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (K(h, i, c), h.updateProjectionMatrix());
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
        onChange: (i, c) => {
          n.updateObject(t.uuid, i, c), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = n.scene?.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (K(h, i, c), h.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Ze,
    {
      title: "Camera",
      items: a
    }
  );
}
const Ka = Math.PI / 180, Xa = 180 / Math.PI;
function at(t, n, a, e, i) {
  return e + (t - n) * (i - e) / (a - n);
}
function Za(t) {
  return t * Ka;
}
function kt(t) {
  return t * Xa;
}
function Ja(t, n) {
  const a = new Xn();
  a.elements = t.matrix;
  const e = new q(), i = new Zn(), c = new q();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), i.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const h = (u, d) => {
    n.updateObject(t.uuid, u, d);
    const f = n.scene?.getObjectByProperty("uuid", t.uuid);
    f !== void 0 && K(f, u, d);
  }, o = (u, d) => {
    h(u, Za(d));
  };
  return /* @__PURE__ */ l.jsx(
    Ze,
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
          value: ht(kt(i.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: ht(kt(i.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: ht(kt(i.z)),
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
          onChange: h
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: c.y,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: c.z,
          step: 0.01,
          onChange: h
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
function Qa(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const i = t.lightInfo[e];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: Jt(e),
        prop: e,
        type: "color",
        value: i,
        onChange: (c, h) => {
          const o = new Ct(h);
          n.updateObject(t.uuid, c, o);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && K(u, c, o);
        }
      }) : a.push({
        title: Jt(e),
        prop: e,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (c, h) => {
          n.updateObject(t.uuid, c, h);
          const o = n.scene?.getObjectByProperty("uuid", t.uuid);
          o !== void 0 && K(o, c, h);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Ze,
    {
      title: "Light",
      items: a
    }
  );
}
function ei(t, n) {
  const a = [], e = [];
  let i = 0;
  t.animations.forEach((o) => {
    i = Math.max(i, o.duration), o.duration > 0 && e.push({
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
    items: e
  });
  const c = n.scene?.getObjectByProperty("uuid", t.uuid);
  let h = !1;
  if (c !== void 0) {
    const o = c.mixer;
    if (h = o !== void 0, h) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: o.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (d, f) => {
            o.timeScale = f, n.updateObject(t.uuid, "mixer.timeScale", f);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          o.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: u
      });
    }
  }
  return /* @__PURE__ */ l.jsx(Ze, { title: "Animation", items: a });
}
const Pn = {
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
let oe = { ...Pn };
function ti(t) {
  const [n, a] = ae(-1);
  ke(() => {
    function h(u) {
      oe = { ...u.value }, a(Date.now());
    }
    function o() {
      oe = { ...Pn }, a(Date.now());
    }
    return D.addEventListener(I.SET_SCENE, o), D.addEventListener(I.SET_OBJECT, h), () => {
      D.removeEventListener(I.SET_SCENE, o), D.removeEventListener(I.SET_OBJECT, h);
    };
  }, []);
  const e = oe.type.toLowerCase(), i = oe.animations.length > 0 || oe.mixer !== void 0, c = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Ft, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: oe.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        dt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: oe.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        dt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: oe.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        dt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: oe.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        dt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: oe.visible,
          onChange: (h, o) => {
            t.three.updateObject(oe.uuid, h, o);
            const u = t.three.scene?.getObjectByProperty("uuid", oe.uuid);
            u !== void 0 && K(u, h, o);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Ja(oe, t.three),
      i ? ei(oe, t.three) : null,
      e.search("camera") > -1 ? qa(oe, t.three) : null,
      e.search("light") > -1 ? Qa(oe, t.three) : null,
      c ? Ha(oe, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ci(t) {
  const [n, a] = ae(t.scene);
  ke(() => {
    const c = (h) => {
      a(h.value);
    };
    return D.addEventListener(I.SET_SCENE, c), () => {
      D.removeEventListener(I.SET_SCENE, c);
    };
  }, []);
  const e = n !== null, i = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Ft, { label: i, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: e && /* @__PURE__ */ l.jsx(ka, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ l.jsx(ti, { three: t.three })
  ] }, "SidePanel");
}
function Si(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (o) => {
    if (!n())
      return;
    const u = t.three.scene?.getObjectByProperty("uuid", o.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (o, u, d) => {
    if (!n())
      return;
    const f = t.three.scene?.getObjectByProperty("uuid", o);
    f !== void 0 && K(f, u, d);
  }, i = (o) => {
    if (!n())
      return;
    const u = o.value, { key: d, value: f, uuid: b } = u;
    e(b, d, f);
  }, c = (o) => {
    if (!n())
      return;
    const u = o.value;
    It(u.value).then((d) => {
      e(u.uuid, u.key, d), e(u.uuid, "material.needsUpdate", !0);
    });
  }, h = (o) => {
    if (!n())
      return;
    const { key: u, uuid: d, value: f, subitem: b } = o.value, E = t.three.scene?.getObjectByProperty("uuid", d);
    if (E !== void 0)
      try {
        b !== void 0 ? Sa(E, b)[u](f) : E[u](f);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(f);
      }
  };
  return ke(() => (D.addEventListener(I.GET_OBJECT, a), D.addEventListener(I.UPDATE_OBJECT, i), D.addEventListener(I.CREATE_TEXTURE, c), D.addEventListener(I.REQUEST_METHOD, h), () => {
    D.removeEventListener(I.GET_OBJECT, a), D.removeEventListener(I.UPDATE_OBJECT, i), D.removeEventListener(I.CREATE_TEXTURE, c), D.removeEventListener(I.REQUEST_METHOD, h);
  }), []), null;
}
const Qt = { type: "change" }, jt = { type: "start" }, en = { type: "end" }, bt = new Jn(), tn = new Qn(), ni = Math.cos(70 * ea.DEG2RAD);
class ai extends an {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new q(), this.cursor = new q(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: et.ROTATE, MIDDLE: et.DOLLY, RIGHT: et.PAN }, this.touches = { ONE: tt.ROTATE, TWO: tt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return o.phi;
    }, this.getAzimuthalAngle = function() {
      return o.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", rt), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", rt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Qt), e.update(), c = i.NONE;
    }, this.update = function() {
      const s = new q(), y = new zt().setFromUnitVectors(n.up, new q(0, 1, 0)), T = y.clone().invert(), F = new q(), W = new zt(), be = new q(), ue = 2 * Math.PI;
      return function(Rt = null) {
        const ot = e.object.position;
        s.copy(ot).sub(e.target), s.applyQuaternion(y), o.setFromVector3(s), e.autoRotate && c === i.NONE && $(ze(Rt)), e.enableDamping ? (o.theta += u.theta * e.dampingFactor, o.phi += u.phi * e.dampingFactor) : (o.theta += u.theta, o.phi += u.phi);
        let Oe = e.minAzimuthAngle, ye = e.maxAzimuthAngle;
        isFinite(Oe) && isFinite(ye) && (Oe < -Math.PI ? Oe += ue : Oe > Math.PI && (Oe -= ue), ye < -Math.PI ? ye += ue : ye > Math.PI && (ye -= ue), Oe <= ye ? o.theta = Math.max(Oe, Math.min(ye, o.theta)) : o.theta = o.theta > (Oe + ye) / 2 ? Math.max(Oe, o.theta) : Math.min(ye, o.theta)), o.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, o.phi)), o.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(f, e.dampingFactor) : e.target.add(f), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && Ce || e.object.isOrthographicCamera ? o.radius = Pe(o.radius) : o.radius = Pe(o.radius * d), s.setFromSpherical(o), s.applyQuaternion(T), ot.copy(e.target).add(s), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, f.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), f.set(0, 0, 0));
        let Ge = !1;
        if (e.zoomToCursor && Ce) {
          let He = null;
          if (e.object.isPerspectiveCamera) {
            const We = s.length();
            He = Pe(We * d);
            const qe = We - He;
            e.object.position.addScaledVector(re, qe), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const We = new q(Q.x, Q.y, 0);
            We.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix(), Ge = !0;
            const qe = new q(Q.x, Q.y, 0);
            qe.unproject(e.object), e.object.position.sub(qe).add(We), e.object.updateMatrixWorld(), He = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          He !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(He).add(e.object.position) : (bt.origin.copy(e.object.position), bt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(bt.direction)) < ni ? n.lookAt(e.target) : (tn.setFromNormalAndCoplanarPoint(e.object.up, e.target), bt.intersectPlane(tn, e.target))));
        } else
          e.object.isOrthographicCamera && (Ge = d !== 1, Ge && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix()));
        return d = 1, Ce = !1, Ge || F.distanceToSquared(e.object.position) > h || 8 * (1 - W.dot(e.object.quaternion)) > h || be.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Qt), F.copy(e.object.position), W.copy(e.object.quaternion), be.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Je), e.domElement.removeEventListener("pointerdown", L), e.domElement.removeEventListener("pointercancel", we), e.domElement.removeEventListener("wheel", ft), e.domElement.removeEventListener("pointermove", ie), e.domElement.removeEventListener("pointerup", we), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", rt), e._domElementKeyEvents = null);
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
    let c = i.NONE;
    const h = 1e-6, o = new Yt(), u = new Yt();
    let d = 1;
    const f = new q(), b = new me(), E = new me(), x = new me(), M = new me(), P = new me(), V = new me(), U = new me(), j = new me(), O = new me(), re = new q(), Q = new me();
    let Ce = !1;
    const G = [], ee = {};
    let ve = !1;
    function ze(s) {
      return s !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Me(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function $(s) {
      u.theta -= s;
    }
    function le(s) {
      u.phi -= s;
    }
    const S = function() {
      const s = new q();
      return function(T, F) {
        s.setFromMatrixColumn(F, 0), s.multiplyScalar(-T), f.add(s);
      };
    }(), Te = function() {
      const s = new q();
      return function(T, F) {
        e.screenSpacePanning === !0 ? s.setFromMatrixColumn(F, 1) : (s.setFromMatrixColumn(F, 0), s.crossVectors(e.object.up, s)), s.multiplyScalar(T), f.add(s);
      };
    }(), ge = function() {
      const s = new q();
      return function(T, F) {
        const W = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const be = e.object.position;
          s.copy(be).sub(e.target);
          let ue = s.length();
          ue *= Math.tan(e.object.fov / 2 * Math.PI / 180), S(2 * T * ue / W.clientHeight, e.object.matrix), Te(2 * F * ue / W.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (S(T * (e.object.right - e.object.left) / e.object.zoom / W.clientWidth, e.object.matrix), Te(F * (e.object.top - e.object.bottom) / e.object.zoom / W.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function _e(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function je(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Re(s, y) {
      if (!e.zoomToCursor)
        return;
      Ce = !0;
      const T = e.domElement.getBoundingClientRect(), F = s - T.left, W = y - T.top, be = T.width, ue = T.height;
      Q.x = F / be * 2 - 1, Q.y = -(W / ue) * 2 + 1, re.set(Q.x, Q.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function Pe(s) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, s));
    }
    function De(s) {
      b.set(s.clientX, s.clientY);
    }
    function Ye(s) {
      Re(s.clientX, s.clientX), U.set(s.clientX, s.clientY);
    }
    function te(s) {
      M.set(s.clientX, s.clientY);
    }
    function Se(s) {
      E.set(s.clientX, s.clientY), x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      $(2 * Math.PI * x.x / y.clientHeight), le(2 * Math.PI * x.y / y.clientHeight), b.copy(E), e.update();
    }
    function it(s) {
      j.set(s.clientX, s.clientY), O.subVectors(j, U), O.y > 0 ? _e(Me(O.y)) : O.y < 0 && je(Me(O.y)), U.copy(j), e.update();
    }
    function Ve(s) {
      P.set(s.clientX, s.clientY), V.subVectors(P, M).multiplyScalar(e.panSpeed), ge(V.x, V.y), M.copy(P), e.update();
    }
    function pe(s) {
      Re(s.clientX, s.clientY), s.deltaY < 0 ? je(Me(s.deltaY)) : s.deltaY > 0 && _e(Me(s.deltaY)), e.update();
    }
    function p(s) {
      let y = !1;
      switch (s.code) {
        case e.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? le(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? le(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? $(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? $(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (s.preventDefault(), e.update());
    }
    function v(s) {
      if (G.length === 1)
        b.set(s.pageX, s.pageY);
      else {
        const y = Fe(s), T = 0.5 * (s.pageX + y.x), F = 0.5 * (s.pageY + y.y);
        b.set(T, F);
      }
    }
    function C(s) {
      if (G.length === 1)
        M.set(s.pageX, s.pageY);
      else {
        const y = Fe(s), T = 0.5 * (s.pageX + y.x), F = 0.5 * (s.pageY + y.y);
        M.set(T, F);
      }
    }
    function _(s) {
      const y = Fe(s), T = s.pageX - y.x, F = s.pageY - y.y, W = Math.sqrt(T * T + F * F);
      U.set(0, W);
    }
    function H(s) {
      e.enableZoom && _(s), e.enablePan && C(s);
    }
    function X(s) {
      e.enableZoom && _(s), e.enableRotate && v(s);
    }
    function de(s) {
      if (G.length == 1)
        E.set(s.pageX, s.pageY);
      else {
        const T = Fe(s), F = 0.5 * (s.pageX + T.x), W = 0.5 * (s.pageY + T.y);
        E.set(F, W);
      }
      x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      $(2 * Math.PI * x.x / y.clientHeight), le(2 * Math.PI * x.y / y.clientHeight), b.copy(E);
    }
    function z(s) {
      if (G.length === 1)
        P.set(s.pageX, s.pageY);
      else {
        const y = Fe(s), T = 0.5 * (s.pageX + y.x), F = 0.5 * (s.pageY + y.y);
        P.set(T, F);
      }
      V.subVectors(P, M).multiplyScalar(e.panSpeed), ge(V.x, V.y), M.copy(P);
    }
    function Z(s) {
      const y = Fe(s), T = s.pageX - y.x, F = s.pageY - y.y, W = Math.sqrt(T * T + F * F);
      j.set(0, W), O.set(0, Math.pow(j.y / U.y, e.zoomSpeed)), _e(O.y), U.copy(j);
      const be = (s.pageX + y.x) * 0.5, ue = (s.pageY + y.y) * 0.5;
      Re(be, ue);
    }
    function se(s) {
      e.enableZoom && Z(s), e.enablePan && z(s);
    }
    function A(s) {
      e.enableZoom && Z(s), e.enableRotate && de(s);
    }
    function L(s) {
      e.enabled !== !1 && (G.length === 0 && (e.domElement.setPointerCapture(s.pointerId), e.domElement.addEventListener("pointermove", ie), e.domElement.addEventListener("pointerup", we)), Mt(s), s.pointerType === "touch" ? st(s) : Ne(s));
    }
    function ie(s) {
      e.enabled !== !1 && (s.pointerType === "touch" ? vt(s) : Ot(s));
    }
    function we(s) {
      switch (Tt(s), G.length) {
        case 0:
          e.domElement.releasePointerCapture(s.pointerId), e.domElement.removeEventListener("pointermove", ie), e.domElement.removeEventListener("pointerup", we), e.dispatchEvent(en), c = i.NONE;
          break;
        case 1:
          const y = G[0], T = ee[y];
          st({ pointerId: y, pageX: T.x, pageY: T.y });
          break;
      }
    }
    function Ne(s) {
      let y;
      switch (s.button) {
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
        case et.DOLLY:
          if (e.enableZoom === !1)
            return;
          Ye(s), c = i.DOLLY;
          break;
        case et.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enablePan === !1)
              return;
            te(s), c = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            De(s), c = i.ROTATE;
          }
          break;
        case et.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enableRotate === !1)
              return;
            De(s), c = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            te(s), c = i.PAN;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && e.dispatchEvent(jt);
    }
    function Ot(s) {
      switch (c) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          Se(s);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          it(s);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          Ve(s);
          break;
      }
    }
    function ft(s) {
      e.enabled === !1 || e.enableZoom === !1 || c !== i.NONE || (s.preventDefault(), e.dispatchEvent(jt), pe(pt(s)), e.dispatchEvent(en));
    }
    function pt(s) {
      const y = s.deltaMode, T = {
        clientX: s.clientX,
        clientY: s.clientY,
        deltaY: s.deltaY
      };
      switch (y) {
        case 1:
          T.deltaY *= 16;
          break;
        case 2:
          T.deltaY *= 100;
          break;
      }
      return s.ctrlKey && !ve && (T.deltaY *= 10), T;
    }
    function mt(s) {
      s.key === "Control" && (ve = !0, e.domElement.getRootNode().addEventListener("keyup", Le, { passive: !0, capture: !0 }));
    }
    function Le(s) {
      s.key === "Control" && (ve = !1, e.domElement.getRootNode().removeEventListener("keyup", Le, { passive: !0, capture: !0 }));
    }
    function rt(s) {
      e.enabled === !1 || e.enablePan === !1 || p(s);
    }
    function st(s) {
      switch (gt(s), G.length) {
        case 1:
          switch (e.touches.ONE) {
            case tt.ROTATE:
              if (e.enableRotate === !1)
                return;
              v(s), c = i.TOUCH_ROTATE;
              break;
            case tt.PAN:
              if (e.enablePan === !1)
                return;
              C(s), c = i.TOUCH_PAN;
              break;
            default:
              c = i.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case tt.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              H(s), c = i.TOUCH_DOLLY_PAN;
              break;
            case tt.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              X(s), c = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              c = i.NONE;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && e.dispatchEvent(jt);
    }
    function vt(s) {
      switch (gt(s), c) {
        case i.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          de(s), e.update();
          break;
        case i.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          z(s), e.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          se(s), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          A(s), e.update();
          break;
        default:
          c = i.NONE;
      }
    }
    function Je(s) {
      e.enabled !== !1 && s.preventDefault();
    }
    function Mt(s) {
      G.push(s.pointerId);
    }
    function Tt(s) {
      delete ee[s.pointerId];
      for (let y = 0; y < G.length; y++)
        if (G[y] == s.pointerId) {
          G.splice(y, 1);
          return;
        }
    }
    function gt(s) {
      let y = ee[s.pointerId];
      y === void 0 && (y = new me(), ee[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function Fe(s) {
      const y = s.pointerId === G[0] ? G[1] : G[0];
      return ee[y];
    }
    e.domElement.addEventListener("contextmenu", Je), e.domElement.addEventListener("pointerdown", L), e.domElement.addEventListener("pointercancel", we), e.domElement.addEventListener("wheel", ft, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", mt, { passive: !0, capture: !0 }), this.update();
  }
}
const xt = (t) => {
  const [n, a] = ae(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, i = (c) => {
    c !== n && (t.onSelect(c), a(c)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((c) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(c), children: c }, c)) })
  ] });
}, Ke = pa(function(n, a) {
  const [e, i] = ae(!1), c = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      xt,
      {
        index: c,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (h) => {
          i(h);
        },
        up: !0
      }
    )
  ] });
});
class ii extends xn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: ta,
      side: sn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new Ct(16777215)
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
class ri extends na {
  gridMaterial;
  constructor() {
    const n = new ii();
    super(new aa(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const si = `#include <common>
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
}`, oi = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ci extends xn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: si,
      fragmentShader: oi
    });
  }
}
let yt = "Renderer", Be, Et = !1, nn = !1, Y = null, ce = null, Ue = null, $e = null;
function wi(t) {
  const n = t.three.app.appID, a = localStorage.getItem(`${n}_mode`), e = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", c = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", h = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", o = xe(() => /* @__PURE__ */ new Map(), []), u = xe(() => /* @__PURE__ */ new Map(), []), d = xe(() => /* @__PURE__ */ new Map(), []), f = xe(() => new ia(), []), b = xe(() => new ra(), []), E = xe(() => new ri(), []), x = xe(() => new Vt(500), []), M = xe(() => new Vt(100), []), P = xe(() => new sa(), []), V = xe(() => new oa(), []), U = xe(() => new ci(), []), j = xe(() => new ca({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function O(p, v) {
    const C = new Gt(-100, 100, 100, -100, 50, 3e3);
    return C.name = p, C.position.copy(v), C.lookAt(0, 0, 0), o.set(p, C), C;
  }
  const re = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], Q = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], Ce = fe(null), G = fe(null), ee = fe(null), ve = fe(null), ze = fe(null), Me = fe(null), [$, le] = ae(a !== null ? a : "Single"), [S, Te] = ae(null), [ge, _e] = ae(!1), [je, Re] = ae(!1), [Pe, De] = ae(!1), [, Ye] = ae(Date.now());
  localStorage.setItem(`${n}_mode`, $), localStorage.setItem(`${n}_tlCam`, e), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, c), localStorage.setItem(`${n}_brCam`, h);
  const te = (p, v) => {
    const C = u.get(p.name);
    C !== void 0 && C.dispose(), u.delete(p.name);
    const _ = d.get(p.name);
    _ !== void 0 && (f.remove(_), _.dispose()), d.delete(p.name);
    const H = new ai(p, v);
    switch (H.enableDamping = !0, H.dampingFactor = 0.05, p.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        H.enableRotate = !1;
        break;
    }
    if (u.set(p.name, H), p instanceof Pt) {
      const X = new da(p);
      d.set(p.name, X), f.add(X);
    }
  }, Se = (p) => {
    const v = d.get(p.name);
    v !== void 0 && (f.remove(v), v.dispose(), d.delete(p.name));
    const C = u.get(p.name);
    C !== void 0 && (C.dispose(), u.delete(p.name));
  }, it = () => {
    u.forEach((p, v) => {
      p.dispose();
      const C = d.get(v);
      C !== void 0 && (f.remove(C), C.dispose()), d.delete(v), u.delete(v);
    }), u.clear(), d.clear();
  }, Ve = () => {
    switch ($) {
      case "Single":
        te(Y, ee.current);
        break;
      case "Side by Side":
      case "Stacked":
        te(Y, ee.current), te(ce, ve.current);
        break;
      case "Quad":
        te(Y, ee.current), te(ce, ve.current), te(Ue, ze.current), te($e, Me.current);
        break;
    }
  };
  ke(() => {
    const p = new la({
      canvas: Ce.current,
      stencil: !1
    });
    p.autoClear = !1, p.shadowMap.enabled = !0, p.setPixelRatio(devicePixelRatio), p.setClearColor(0), t.three.renderer = p, Te(p);
  }, []), ke(() => {
    f.name = "Debug Scene", b.name = "helpers", f.add(b), b.add(E), x.name = "axisHelper", b.add(x), M.name = "interactionHelper", b.add(M), M.visible = !1, O("Top", new q(0, 1e3, 0)), O("Bottom", new q(0, -1e3, 0)), O("Left", new q(-1e3, 0, 0)), O("Right", new q(1e3, 0, 0)), O("Front", new q(0, 0, 1e3)), O("Back", new q(0, 0, -1e3)), O("Orthographic", new q(1e3, 1e3, 1e3));
    const p = new Pt(60, 1, 50, 3e3);
    p.name = "Debug", p.position.set(500, 500, 500), p.lookAt(0, 0, 0), o.set("Debug", p), Y = o.get(localStorage.getItem(`${n}_tlCam`)), ce = o.get(localStorage.getItem(`${n}_trCam`)), Ue = o.get(localStorage.getItem(`${n}_blCam`)), $e = o.get(localStorage.getItem(`${n}_brCam`));
  }, []), ke(() => {
    const p = (_) => {
      Mn(Be), f.remove(Be);
      const H = t.scenes.get(_.value.name);
      if (H !== void 0) {
        const X = new H();
        t.onSceneSet !== void 0 && t.onSceneSet(X), Be = X, t.three.scene = Be, f.add(Be), nn = !0;
      }
    }, v = (_) => {
      const H = _.value, X = t.three.scene?.getObjectByProperty("uuid", H.uuid);
      X !== void 0 && o.set(H.name, X), Ye(Date.now());
    }, C = (_) => {
      o.delete(_.value.name), Ye(Date.now());
    };
    return D.addEventListener(I.SET_SCENE, p), D.addEventListener(I.ADD_CAMERA, v), D.addEventListener(I.REMOVE_CAMERA, C), () => {
      D.removeEventListener(I.SET_SCENE, p), D.removeEventListener(I.ADD_CAMERA, v), D.removeEventListener(I.REMOVE_CAMERA, C);
    };
  }, []), ke(() => {
    if (S === null)
      return;
    let p = window.innerWidth, v = window.innerHeight, C = Math.floor(p / 2), _ = Math.floor(v / 2), H = -1;
    const X = () => {
      p = window.innerWidth - 300, v = window.innerHeight, C = Math.floor(p / 2), _ = Math.floor(v / 2), S.setSize(p, v);
      let A = p, L = v;
      switch ($) {
        case "Side by Side":
          A = C, L = v;
          break;
        case "Stacked":
          A = p, L = _;
          break;
        case "Quad":
          A = C, L = _;
          break;
      }
      o.forEach((ie) => {
        ie instanceof Gt ? (ie.left = A / -2, ie.right = A / 2, ie.top = L / 2, ie.bottom = L / -2, ie.updateProjectionMatrix()) : ie instanceof Pt && (ie.aspect = A / L, ie.updateProjectionMatrix(), d.get(ie.name)?.update());
      });
    }, de = () => {
      S.setViewport(0, 0, p, v), S.setScissor(0, 0, p, v), S.render(f, Y);
    }, z = () => {
      if ($ === "Side by Side")
        S.setViewport(0, 0, C, v), S.setScissor(0, 0, C, v), S.render(f, Y), S.setViewport(C, 0, C, v), S.setScissor(C, 0, C, v), S.render(f, ce);
      else {
        const A = v - _;
        S.setViewport(0, A, p, _), S.setScissor(0, A, p, _), S.render(f, Y), S.setViewport(0, 0, p, _), S.setScissor(0, 0, p, _), S.render(f, ce);
      }
    }, Z = () => {
      let A = 0, L = 0;
      L = v - _, A = 0, S.setViewport(A, L, C, _), S.setScissor(A, L, C, _), S.render(f, Y), A = C, S.setViewport(A, L, C, _), S.setScissor(A, L, C, _), S.render(f, ce), L = 0, A = 0, S.setViewport(A, L, C, _), S.setScissor(A, L, C, _), S.render(f, Ue), A = C, S.setViewport(A, L, C, _), S.setScissor(A, L, C, _), S.render(f, $e);
    }, se = () => {
      switch (u.forEach((A) => {
        A.update();
      }), t.onSceneUpdate !== void 0 && nn && t.onSceneUpdate(Be), S.clear(), $) {
        case "Single":
          de();
          break;
        case "Side by Side":
        case "Stacked":
          z();
          break;
        case "Quad":
          Z();
          break;
      }
      H = requestAnimationFrame(se);
    };
    return Ve(), window.addEventListener("resize", X), X(), se(), () => {
      window.removeEventListener("resize", X), cancelAnimationFrame(H), H = -1;
    };
  }, [$, S]), ke(() => {
    if (S !== null) {
      const p = new ua(), v = new me(), C = (de, z, Z, se) => {
        switch ($) {
          case "Quad":
            de < Z ? z < se ? p.setFromCamera(v, Y) : p.setFromCamera(v, Ue) : z < se ? p.setFromCamera(v, ce) : p.setFromCamera(v, $e);
            break;
          case "Side by Side":
            de < Z ? p.setFromCamera(v, Y) : p.setFromCamera(v, ce);
            break;
          case "Single":
            p.setFromCamera(v, Y);
            break;
          case "Stacked":
            z < se ? p.setFromCamera(v, Y) : p.setFromCamera(v, ce);
            break;
        }
      }, _ = (de) => {
        if (!Et)
          return;
        const z = new me();
        S.getSize(z);
        const Z = Math.min(de.clientX, z.x), se = Math.min(de.clientY, z.y);
        v.x = at(Z, 0, z.x, -1, 1), v.y = at(se, 0, z.y, 1, -1);
        const A = z.x / 2, L = z.y / 2, ie = () => {
          Z < A ? v.x = at(Z, 0, A, -1, 1) : v.x = at(Z, A, z.x, -1, 1);
        }, we = () => {
          se < L ? v.y = at(se, 0, L, 1, -1) : v.y = at(se, L, z.y, 1, -1);
        };
        switch ($) {
          case "Quad":
            ie(), we();
            break;
          case "Side by Side":
            ie();
            break;
          case "Stacked":
            we(), we();
            break;
        }
        C(Z, se, A, L);
        const Ne = p.intersectObjects(Be.children);
        Ne.length > 0 && M.position.copy(Ne[0].point);
      }, H = (de) => {
        if (!Et)
          return;
        const z = new me();
        if (S.getSize(z), de.clientX >= z.x)
          return;
        _(de);
        const Z = p.intersectObjects(Be.children);
        Z.length > 0 && t.three.getObject(Z[0].object.uuid);
      }, X = G.current;
      return X.addEventListener("mousemove", _, !1), X.addEventListener("click", H, !1), () => {
        X.removeEventListener("mousemove", _), X.removeEventListener("click", H);
      };
    }
  }, [$, S]);
  const pe = [];
  return o.forEach((p, v) => {
    pe.push(v);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: Ce }),
    S !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${$ === "Single" || $ === "Stacked" ? "single" : ""}`, ref: G, children: [
        $ === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ke, { camera: Y, options: pe, ref: ee, onSelect: (p) => {
          u.get(Y.name)?.dispose();
          const v = o.get(p);
          v !== void 0 && (Se(Y), Y = v, localStorage.setItem(`${n}_tlCam`, v.name), te(v, ee.current));
        } }) }),
        ($ === "Side by Side" || $ === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Ke, { camera: Y, options: pe, ref: ee, onSelect: (p) => {
            u.get(Y.name)?.dispose();
            const v = o.get(p);
            v !== void 0 && (Se(Y), Y = v, localStorage.setItem(`${n}_tlCam`, v.name), te(v, ee.current));
          } }),
          /* @__PURE__ */ l.jsx(Ke, { camera: ce, options: pe, ref: ve, onSelect: (p) => {
            u.get(ce.name)?.dispose();
            const v = o.get(p);
            v !== void 0 && (Se(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), te(v, ve.current));
          } })
        ] }),
        $ === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Ke, { camera: Y, options: pe, ref: ee, onSelect: (p) => {
            u.get(Y.name)?.dispose();
            const v = o.get(p);
            v !== void 0 && (Se(Y), Y = v, localStorage.setItem(`${n}_tlCam`, v.name), te(v, ee.current));
          } }),
          /* @__PURE__ */ l.jsx(Ke, { camera: ce, options: pe, ref: ve, onSelect: (p) => {
            u.get(ce.name)?.dispose();
            const v = o.get(p);
            v !== void 0 && (Se(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), te(v, ve.current));
          } }),
          /* @__PURE__ */ l.jsx(Ke, { camera: Ue, options: pe, ref: ze, onSelect: (p) => {
            u.get(Ue.name)?.dispose();
            const v = o.get(p);
            v !== void 0 && (Se(Ue), Ue = v, localStorage.setItem(`${n}_blCam`, v.name), te(v, ze.current));
          } }),
          /* @__PURE__ */ l.jsx(Ke, { camera: $e, options: pe, ref: Me, onSelect: (p) => {
            u.get($e.name)?.dispose();
            const v = o.get(p);
            v !== void 0 && (Se($e), $e = v, localStorage.setItem(`${n}_brCam`, v.name), te(v, Me.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          xt,
          {
            index: Q.indexOf($),
            options: Q,
            onSelect: (p) => {
              p !== $ && (it(), le(p));
            },
            open: ge,
            onToggle: (p) => {
              _e(p), je && Re(!1), Pe && De(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          xt,
          {
            index: re.indexOf(yt),
            options: re,
            onSelect: (p) => {
              if (p !== yt)
                switch (yt = p, yt) {
                  case "Depth":
                    f.overrideMaterial = P;
                    break;
                  case "Normals":
                    f.overrideMaterial = V;
                    break;
                  default:
                  case "Renderer":
                    f.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    f.overrideMaterial = j;
                    break;
                  case "UVs":
                    f.overrideMaterial = U;
                    break;
                }
            },
            open: je,
            onToggle: (p) => {
              ge && _e(!1), Re(p), Pe && De(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          xt,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (p) => {
              Et = p === "Selection Mode", M.visible = Et;
            },
            open: Pe,
            onToggle: (p) => {
              ge && _e(!1), je && Re(!1), De(p);
            }
          }
        )
      ] })
    ] })
  ] });
}
function Oi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: t.footer })
  ] });
}
export {
  Ft as Accordion,
  vi as Application,
  wt as BaseRemote,
  Rn as ChildObject,
  ka as ContainerObject,
  Ra as Draggable,
  _a as DraggableItem,
  Pa as Dropdown,
  Aa as DropdownItem,
  Oi as Editor,
  ti as Inspector,
  wi as MultiView,
  _n as NavButton,
  gi as RemoteComponents,
  xi as RemoteController,
  Lt as RemoteTheatre,
  yi as RemoteThree,
  Ei as RemoteTweakpane,
  Si as SceneInspector,
  Ci as SidePanel,
  I as ToolEvents,
  St as capitalize,
  Xe as clamp,
  ga as colorToHex,
  D as debugDispatcher,
  fi as defaultTheatreCallback,
  Mn as dispose,
  ya as disposeMaterial,
  mi as disposeTexture,
  pi as distance,
  On as hierarchyUUID,
  va as isColor,
  Wt as mix,
  wn as noop,
  Ht as normalize,
  ma as randomID,
  ba as resetThreeObjects,
  ht as round,
  bi as theatreEditorApp,
  Dt as totalThreeObjects
};
