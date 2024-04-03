import { EventDispatcher as sn, Texture as on, CubeTexture as $n, RepeatWrapping as Ut, Color as Ct, FrontSide as Un, BackSide as cn, DoubleSide as ln, NoBlending as zn, NormalBlending as Hn, AdditiveBlending as Yn, SubtractiveBlending as Gn, MultiplyBlending as Vn, CustomBlending as Wn, AddEquation as qn, SubtractEquation as Kn, ReverseSubtractEquation as Xn, MinEquation as Zn, MaxEquation as Jn, ZeroFactor as dn, OneFactor as un, SrcColorFactor as hn, OneMinusSrcColorFactor as fn, SrcAlphaFactor as pn, OneMinusSrcAlphaFactor as mn, DstAlphaFactor as vn, OneMinusDstAlphaFactor as gn, DstColorFactor as bn, OneMinusDstColorFactor as yn, SrcAlphaSaturateFactor as Qn, ConstantColorFactor as En, OneMinusConstantColorFactor as xn, ConstantAlphaFactor as Sn, OneMinusConstantAlphaFactor as Cn, Matrix4 as ea, Vector3 as X, Euler as ta, Line as na, BufferGeometry as zt, Float32BufferAttribute as Ht, LineBasicMaterial as aa, Mesh as wn, MeshBasicMaterial as On, Ray as ia, Plane as ra, MathUtils as sa, MOUSE as nt, TOUCH as at, Quaternion as Yt, Spherical as Gt, Vector2 as pe, ShaderMaterial as Mn, GLSL3 as oa, PlaneGeometry as ca, Scene as la, Group as da, AxesHelper as Vt, MeshDepthMaterial as ua, MeshNormalMaterial as ha, WebGLRenderer as fa, PerspectiveCamera as Pt, Raycaster as pa, OrthographicCamera as Wt, CameraHelper as ma, SpotLightHelper as va, PointLightHelper as ga, HemisphereLightHelper as ba, DirectionalLightHelper as ya } from "three";
import { Pane as Ea } from "tweakpane";
import * as xa from "@tweakpane/plugin-essentials";
import Tn, { useState as ne, useRef as fe, useEffect as ke, forwardRef as Sa, useMemo as ve } from "react";
import { Reorder as _n } from "framer-motion";
const Rn = () => {
}, Si = () => {
};
function wt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Ze(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function qt(t, n, a) {
  return (a - t) / (n - t);
}
function Kt(t, n, a) {
  return t * (1 - a) + n * a;
}
function Ci(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function Ca() {
  return Math.round(Math.random() * 1e6).toString();
}
function wa(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Oa(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (d) => {
    const u = d.toString(16);
    return u.length === 1 ? "0" + u : u;
  }, c = i(n), h = i(a), o = i(e);
  return "#" + c + h + o;
}
function ft(t, n = 1) {
  return Number(t.toFixed(n));
}
let jt = 0;
const Ma = () => {
  jt = 0;
}, Pn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${jt}`, jt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    Pn(a);
  });
}, wi = (t) => {
  t?.dispose();
}, Ta = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, An = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : An(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), Ta(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Oi {
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
const F = new sn(), B = {
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
class Ot {
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
class Mi extends Ot {
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
        F.dispatchEvent({ type: B.SELECT_DROPDOWN, value: e.data });
        break;
      case "draggableListUpdate":
        F.dispatchEvent({ type: B.DRAG_UPDATE, value: e.data });
        break;
    }
  }
}
class Nt extends Ot {
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
    o !== void 0 ? o = c.object(a, { ...e, ...o.value }, { reconfigure: !0 }) : o = c.object(a, e), this.sheetObjects.set(h, o), this.sheetObjectCBs.set(h, i !== void 0 ? i : Rn);
    const d = o.onValuesChange((u) => {
      if (this.app.editor) {
        for (const v in u) {
          const E = u[v];
          typeof E == "object" && wa(E) && (u[v] = {
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
            values: u
          }
        });
      }
      const g = this.sheetObjectCBs.get(h);
      g !== void 0 && g(u);
    });
    return this.sheetObjectUnsubscribe.set(h, d), o;
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
          let d = o.address.sheetId, u = "setSheet", g = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              u = "setSheet", g = {
                sheet: o.address.sheetId
              }, a.activeSheet = a.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              u = "setSheetObject", d += `_${o.address.objectKey}`, g = {
                id: d,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, a.activeSheet = a.sheets.get(o.address.sheetId);
              break;
          }
          n.send({ event: u, target: "app", data: g });
        });
      });
      let e = -1;
      const i = () => {
        if (Nt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && e !== a.activeSheet.sequence.position) {
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
function Ti(t, n, a) {
  if (t.editor) {
    a.ui.restore(), a.onSelectionChange((h) => {
      h.length < 1 || h.forEach((o) => {
        let d = o.address.sheetId, u = "setSheet", g = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", g = {
              sheet: o.address.sheetId
            }, n.activeSheet = n.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", d += `_${o.address.objectKey}`, g = {
              id: d,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, n.activeSheet = n.sheets.get(o.address.sheetId);
            break;
        }
        t.send({ event: u, target: "app", data: g });
      });
    });
    let e = -1;
    const i = () => {
      if (Nt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && e !== n.activeSheet.sequence.position) {
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
function _a(t) {
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
function kn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(kn(a));
  }), n;
}
function Ra(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function Pa(t) {
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
function it(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Pa(a))
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
            if (i instanceof on) {
              const c = i.source.toJSON();
              n[a] = { src: c.url };
            } else
              i instanceof $n && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Ra(n[a]));
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
        i.push(it(c));
      }), n.material = i;
    } else
      n.material = it(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((c) => {
        i.push(it(c));
      }), n.material = i;
    } else
      n.material = it(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((c) => {
        i.push(it(c));
      }), n.material = i;
    } else
      n.material = it(e.material);
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
function Aa(t, n) {
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
function Z(t, n, a) {
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
      const i = new on(e);
      i.wrapS = Ut, i.wrapT = Ut, i.needsUpdate = !0, n(i);
    }, e.onerror = a, e.src = t;
  });
}
class _i extends Ot {
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
    Ma(), Pn(this.scene);
    const a = kn(this.scene);
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
        F.dispatchEvent({ type: B.GET_OBJECT, value: e.data });
        break;
      case "updateObject":
        F.dispatchEvent({ type: B.UPDATE_OBJECT, value: e.data });
        break;
      case "createTexture":
        F.dispatchEvent({ type: B.CREATE_TEXTURE, value: e.data });
        break;
      case "requestMethod":
        F.dispatchEvent({ type: B.REQUEST_METHOD, value: e.data });
        break;
    }
  }
  handleEditor(n, a, e) {
    switch (e.event) {
      case "setObject":
        F.dispatchEvent({ type: B.SET_OBJECT, value: e.data });
        break;
      case "setScene":
        F.dispatchEvent({ type: B.SET_SCENE, value: e.data });
        break;
      case "addCamera":
        F.dispatchEvent({ type: B.ADD_CAMERA, value: e.data });
        break;
      case "removeCamera":
        F.dispatchEvent({ type: B.REMOVE_CAMERA, value: e.data });
        break;
    }
  }
  // Renderer
  resize(n, a) {
    this.renderer?.setSize(n, a);
  }
  set dpr(n) {
    this.renderer?.setPixelRatio(Ze(1, 2, n));
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
class Ri extends Ot {
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
    this.pane = new Ea({ title: "GUI" }), this.pane.registerPlugin(xa);
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
    const c = this.bindID, h = e.onChange !== void 0 ? e.onChange : Rn;
    this.bindCBs.set(c, h), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, e).on("change", (d) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: d.value
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
var Lt = { exports: {} }, lt = {};
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
function ka() {
  if (Xt)
    return lt;
  Xt = 1;
  var t = Tn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(o, d, u) {
    var g, v = {}, E = null, x = null;
    u !== void 0 && (E = "" + u), d.key !== void 0 && (E = "" + d.key), d.ref !== void 0 && (x = d.ref);
    for (g in d)
      e.call(d, g) && !c.hasOwnProperty(g) && (v[g] = d[g]);
    if (o && o.defaultProps)
      for (g in d = o.defaultProps, d)
        v[g] === void 0 && (v[g] = d[g]);
    return { $$typeof: n, type: o, key: E, ref: x, props: v, _owner: i.current };
  }
  return lt.Fragment = a, lt.jsx = h, lt.jsxs = h, lt;
}
var dt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zt;
function Da() {
  return Zt || (Zt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Tn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), o = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), R = Symbol.iterator, P = "@@iterator";
    function V(r) {
      if (r === null || typeof r != "object")
        return null;
      var f = R && r[R] || r[P];
      return typeof f == "function" ? f : null;
    }
    var Y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function I(r) {
      {
        for (var f = arguments.length, b = new Array(f > 1 ? f - 1 : 0), S = 1; S < f; S++)
          b[S - 1] = arguments[S];
        _("error", r, b);
      }
    }
    function _(r, f, b) {
      {
        var S = Y.ReactDebugCurrentFrame, $ = S.getStackAddendum();
        $ !== "" && (f += "%s", b = b.concat([$]));
        var H = b.map(function(D) {
          return String(D);
        });
        H.unshift("Warning: " + f), Function.prototype.apply.call(console[r], console, H);
      }
    }
    var q = !1, ee = !1, Se = !1, W = !1, me = !1, le;
    le = Symbol.for("react.module.reference");
    function Me(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === c || me || r === i || r === u || r === g || W || r === x || q || ee || Se || typeof r == "object" && r !== null && (r.$$typeof === E || r.$$typeof === v || r.$$typeof === h || r.$$typeof === o || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === le || r.getModuleId !== void 0));
    }
    function Te(r, f, b) {
      var S = r.displayName;
      if (S)
        return S;
      var $ = f.displayName || f.name || "";
      return $ !== "" ? b + "(" + $ + ")" : b;
    }
    function ge(r) {
      return r.displayName || "Context";
    }
    function L(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && I("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
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
        case u:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case o:
            var f = r;
            return ge(f) + ".Consumer";
          case h:
            var b = r;
            return ge(b._context) + ".Provider";
          case d:
            return Te(r, r.render, "ForwardRef");
          case v:
            var S = r.displayName || null;
            return S !== null ? S : L(r.type) || "Memo";
          case E: {
            var $ = r, H = $._payload, D = $._init;
            try {
              return L(D(H));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var be = Object.assign, C = 0, Ce, _e, De, Re, Pe, je, Fe;
    function Be() {
    }
    Be.__reactDisabledLog = !0;
    function ae() {
      {
        if (C === 0) {
          Ce = console.log, _e = console.info, De = console.warn, Re = console.error, Pe = console.group, je = console.groupCollapsed, Fe = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: Be,
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
        C++;
      }
    }
    function we() {
      {
        if (C--, C === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: be({}, r, {
              value: Ce
            }),
            info: be({}, r, {
              value: _e
            }),
            warn: be({}, r, {
              value: De
            }),
            error: be({}, r, {
              value: Re
            }),
            group: be({}, r, {
              value: Pe
            }),
            groupCollapsed: be({}, r, {
              value: je
            }),
            groupEnd: be({}, r, {
              value: Fe
            })
          });
        }
        C < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ye = Y.ReactCurrentDispatcher, Ge;
    function ue(r, f, b) {
      {
        if (Ge === void 0)
          try {
            throw Error();
          } catch ($) {
            var S = $.stack.trim().match(/\n( *(at )?)/);
            Ge = S && S[1] || "";
          }
        return `
` + Ge + r;
      }
    }
    var p = !1, m;
    {
      var w = typeof WeakMap == "function" ? WeakMap : Map;
      m = new w();
    }
    function j(r, f) {
      if (!r || p)
        return "";
      {
        var b = m.get(r);
        if (b !== void 0)
          return b;
      }
      var S;
      p = !0;
      var $ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var H;
      H = Ye.current, Ye.current = null, ae();
      try {
        if (f) {
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
            } catch (Le) {
              S = Le;
            }
            Reflect.construct(r, [], D);
          } else {
            try {
              D.call();
            } catch (Le) {
              S = Le;
            }
            r.call(D.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Le) {
            S = Le;
          }
          r();
        }
      } catch (Le) {
        if (Le && S && typeof Le.stack == "string") {
          for (var k = Le.stack.split(`
`), he = S.stack.split(`
`), Q = k.length - 1, te = he.length - 1; Q >= 1 && te >= 0 && k[Q] !== he[te]; )
            te--;
          for (; Q >= 1 && te >= 0; Q--, te--)
            if (k[Q] !== he[te]) {
              if (Q !== 1 || te !== 1)
                do
                  if (Q--, te--, te < 0 || k[Q] !== he[te]) {
                    var xe = `
` + k[Q].replace(" at new ", " at ");
                    return r.displayName && xe.includes("<anonymous>") && (xe = xe.replace("<anonymous>", r.displayName)), typeof r == "function" && m.set(r, xe), xe;
                  }
                while (Q >= 1 && te >= 0);
              break;
            }
        }
      } finally {
        p = !1, Ye.current = H, we(), Error.prepareStackTrace = $;
      }
      var tt = r ? r.displayName || r.name : "", $t = tt ? ue(tt) : "";
      return typeof r == "function" && m.set(r, $t), $t;
    }
    function ie(r, f, b) {
      return j(r, !1);
    }
    function M(r) {
      var f = r.prototype;
      return !!(f && f.isReactComponent);
    }
    function O(r, f, b) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return j(r, M(r));
      if (typeof r == "string")
        return ue(r);
      switch (r) {
        case u:
          return ue("Suspense");
        case g:
          return ue("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return ie(r.render);
          case v:
            return O(r.type, f, b);
          case E: {
            var S = r, $ = S._payload, H = S._init;
            try {
              return O(H($), f, b);
            } catch {
            }
          }
        }
      return "";
    }
    var N = Object.prototype.hasOwnProperty, re = {}, se = Y.ReactDebugCurrentFrame;
    function A(r) {
      if (r) {
        var f = r._owner, b = O(r.type, r._source, f ? f.type : null);
        se.setExtraStackFrame(b);
      } else
        se.setExtraStackFrame(null);
    }
    function z(r, f, b, S, $) {
      {
        var H = Function.call.bind(N);
        for (var D in r)
          if (H(r, D)) {
            var k = void 0;
            try {
              if (typeof r[D] != "function") {
                var he = Error((S || "React class") + ": " + b + " type `" + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[D] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              k = r[D](f, D, S, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              k = Q;
            }
            k && !(k instanceof Error) && (A($), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", b, D, typeof k), A(null)), k instanceof Error && !(k.message in re) && (re[k.message] = !0, A($), I("Failed %s type: %s", b, k.message), A(null));
          }
      }
    }
    var J = Array.isArray;
    function Ie(r) {
      return J(r);
    }
    function Qe(r) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, b = f && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return b;
      }
    }
    function pt(r) {
      try {
        return mt(r), !1;
      } catch {
        return !0;
      }
    }
    function mt(r) {
      return "" + r;
    }
    function vt(r) {
      if (pt(r))
        return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(r)), mt(r);
    }
    var $e = Y.ReactCurrentOwner, st = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ot, gt, et;
    et = {};
    function Mt(r) {
      if (N.call(r, "ref")) {
        var f = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Tt(r) {
      if (N.call(r, "key")) {
        var f = Object.getOwnPropertyDescriptor(r, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function bt(r, f) {
      if (typeof r.ref == "string" && $e.current && f && $e.current.stateNode !== f) {
        var b = L($e.current.type);
        et[b] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', L($e.current.type), r.ref), et[b] = !0);
      }
    }
    function Ue(r, f) {
      {
        var b = function() {
          ot || (ot = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function Bt(r, f) {
      {
        var b = function() {
          gt || (gt = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var s = function(r, f, b, S, $, H, D) {
      var k = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: f,
        ref: b,
        props: D,
        // Record the component responsible for creating this element.
        _owner: H
      };
      return k._store = {}, Object.defineProperty(k._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(k, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: S
      }), Object.defineProperty(k, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $
      }), Object.freeze && (Object.freeze(k.props), Object.freeze(k)), k;
    };
    function y(r, f, b, S, $) {
      {
        var H, D = {}, k = null, he = null;
        b !== void 0 && (vt(b), k = "" + b), Tt(f) && (vt(f.key), k = "" + f.key), Mt(f) && (he = f.ref, bt(f, $));
        for (H in f)
          N.call(f, H) && !st.hasOwnProperty(H) && (D[H] = f[H]);
        if (r && r.defaultProps) {
          var Q = r.defaultProps;
          for (H in Q)
            D[H] === void 0 && (D[H] = Q[H]);
        }
        if (k || he) {
          var te = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          k && Ue(D, te), he && Bt(D, te);
        }
        return s(r, k, he, $, S, $e.current, D);
      }
    }
    var T = Y.ReactCurrentOwner, U = Y.ReactDebugCurrentFrame;
    function K(r) {
      if (r) {
        var f = r._owner, b = O(r.type, r._source, f ? f.type : null);
        U.setExtraStackFrame(b);
      } else
        U.setExtraStackFrame(null);
    }
    var ye;
    ye = !1;
    function de(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function _t() {
      {
        if (T.current) {
          var r = L(T.current.type);
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
          var f = r.fileName.replace(/^.*[\\\/]/, ""), b = r.lineNumber;
          return `

Check your code at ` + f + ":" + b + ".";
        }
        return "";
      }
    }
    var ct = {};
    function Oe(r) {
      {
        var f = _t();
        if (!f) {
          var b = typeof r == "string" ? r : r.displayName || r.name;
          b && (f = `

Check the top-level render call using <` + b + ">.");
        }
        return f;
      }
    }
    function Ee(r, f) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var b = Oe(f);
        if (ct[b])
          return;
        ct[b] = !0;
        var S = "";
        r && r._owner && r._owner !== T.current && (S = " It was passed a child from " + L(r._owner.type) + "."), K(r), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, S), K(null);
      }
    }
    function Ve(r, f) {
      {
        if (typeof r != "object")
          return;
        if (Ie(r))
          for (var b = 0; b < r.length; b++) {
            var S = r[b];
            de(S) && Ee(S, f);
          }
        else if (de(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var $ = V(r);
          if (typeof $ == "function" && $ !== r.entries)
            for (var H = $.call(r), D; !(D = H.next()).done; )
              de(D.value) && Ee(D.value, f);
        }
      }
    }
    function We(r) {
      {
        var f = r.type;
        if (f == null || typeof f == "string")
          return;
        var b;
        if (typeof f == "function")
          b = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === v))
          b = f.propTypes;
        else
          return;
        if (b) {
          var S = L(f);
          z(b, r.props, "prop", S, r);
        } else if (f.PropTypes !== void 0 && !ye) {
          ye = !0;
          var $ = L(f);
          I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", $ || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qe(r) {
      {
        for (var f = Object.keys(r.props), b = 0; b < f.length; b++) {
          var S = f[b];
          if (S !== "children" && S !== "key") {
            K(r), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), K(null);
            break;
          }
        }
        r.ref !== null && (K(r), I("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function Ke(r, f, b, S, $, H) {
      {
        var D = Me(r);
        if (!D) {
          var k = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (k += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = Rt($);
          he ? k += he : k += _t();
          var Q;
          r === null ? Q = "null" : Ie(r) ? Q = "array" : r !== void 0 && r.$$typeof === n ? (Q = "<" + (L(r.type) || "Unknown") + " />", k = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof r, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, k);
        }
        var te = y(r, f, b, $, H);
        if (te == null)
          return te;
        if (D) {
          var xe = f.children;
          if (xe !== void 0)
            if (S)
              if (Ie(xe)) {
                for (var tt = 0; tt < xe.length; tt++)
                  Ve(xe[tt], r);
                Object.freeze && Object.freeze(xe);
              } else
                I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ve(xe, r);
        }
        return r === e ? qe(te) : We(te), te;
      }
    }
    function Ln(r, f, b) {
      return Ke(r, f, b, !0);
    }
    function Nn(r, f, b) {
      return Ke(r, f, b, !1);
    }
    var Fn = Nn, Bn = Ln;
    dt.Fragment = e, dt.jsx = Fn, dt.jsxs = Bn;
  }()), dt;
}
process.env.NODE_ENV === "production" ? Lt.exports = ka() : Lt.exports = Da();
var l = Lt.exports;
function Dn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const ja = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ia = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function La(t) {
  return /* @__PURE__ */ l.jsx(_n.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ia,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: ja })
  ] }) }, t.title);
}
function Na(t) {
  const [n, a] = ne(!1), [e, i] = ne(t.options), c = (u) => {
    t.onDragComplete(u), i(u);
  }, h = (u) => {
    const g = [...e];
    g.splice(u, 1), c(g);
  }, o = [];
  e.forEach((u, g) => {
    o.push(/* @__PURE__ */ l.jsx(La, { index: g, title: u, onDelete: h }, u));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Dn, { title: t.title }),
    /* @__PURE__ */ l.jsx(_n.Group, { axis: "y", values: e, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: o })
  ] });
}
function Fa(t) {
  const [n, a] = ne(!1), e = [];
  t.options.map((c, h) => {
    t.onSelect !== void 0 && (c.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Ba, { option: c }, h));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Dn, { title: t.title }),
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
function Ba(t) {
  const { option: n } = t, [a, e] = ne("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        Na,
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
        Fa,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: i }, Ca());
}
function Pi(t, n, a) {
  function e(c) {
    switch (n.forEach((h) => {
      h.callback(t, h.remote, c);
    }), c.event) {
      case "custom":
        F.dispatchEvent({ type: B.CUSTOM, value: c.data });
        break;
    }
  }
  function i(c) {
    switch (a.forEach((h) => {
      h.callback(t, h.remote, c);
    }), c.event) {
      case "custom":
        F.dispatchEvent({ type: B.CUSTOM, value: c.data });
        break;
    }
  }
  t.listen = (c) => {
    c.target === "editor" ? i(c) : e(c);
  };
}
function Ft(t) {
  const [n, a] = ne(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
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
          /* @__PURE__ */ l.jsx("p", { className: "label", children: wt(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function jn(t) {
  const [n, a] = ne(!1), e = t.child !== void 0 && t.child.children.length > 0, i = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((c) => {
    i.push(/* @__PURE__ */ l.jsx(jn, { child: c, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${_a(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: i }) })
  ] }, Math.random()) });
}
function $a(t) {
  const n = [];
  return t.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(jn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Ua = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function za(t) {
  return "items" in t;
}
function Je(t) {
  const n = [];
  return t.items.forEach((a) => {
    za(a) ? n.push(
      /* @__PURE__ */ l.jsx(Je, { title: wt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        ht,
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
function Ha(t) {
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
function Ya(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Ga() {
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
const Va = [
  {
    title: "Front",
    value: Un
  },
  {
    title: "Back",
    value: cn
  },
  {
    title: "Double",
    value: ln
  }
], Wa = [
  {
    title: "No Blending",
    value: zn
  },
  {
    title: "Normal",
    value: Hn
  },
  {
    title: "Additive",
    value: Yn
  },
  {
    title: "Subtractive",
    value: Gn
  },
  {
    title: "Multiply",
    value: Vn
  },
  {
    title: "Custom",
    value: Wn
  }
], qa = [
  {
    title: "Add",
    value: qn
  },
  {
    title: "Subtract",
    value: Kn
  },
  {
    title: "Reverse Subtract",
    value: Xn
  },
  {
    title: "Min",
    value: Zn
  },
  {
    title: "Max",
    value: Jn
  }
], Ka = [
  {
    title: "Zero",
    valye: dn
  },
  {
    title: "One",
    valye: un
  },
  {
    title: "Src Color",
    valye: hn
  },
  {
    title: "One Minus Src Color",
    valye: fn
  },
  {
    title: "Src Alpha",
    valye: pn
  },
  {
    title: "One Minus Src Alpha",
    valye: mn
  },
  {
    title: "Dst Alpha",
    valye: vn
  },
  {
    title: "One Minus Dst Alpha",
    valye: gn
  },
  {
    title: "Dst Color",
    valye: bn
  },
  {
    title: "One Minus Dst Color",
    valye: yn
  },
  {
    title: "Src Alpha Saturate",
    valye: Qn
  },
  {
    title: "Constant Color",
    valye: En
  },
  {
    title: "One Minus Constant Color",
    valye: xn
  },
  {
    title: "Constant Alpha",
    valye: Sn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Cn
  }
], Xa = [
  {
    title: "Zero",
    valye: dn
  },
  {
    title: "One",
    valye: un
  },
  {
    title: "Src Color",
    valye: hn
  },
  {
    title: "One Minus Src Color",
    valye: fn
  },
  {
    title: "Src Alpha",
    valye: pn
  },
  {
    title: "One Minus Src Alpha",
    valye: mn
  },
  {
    title: "Dst Alpha",
    valye: vn
  },
  {
    title: "One Minus Dst Alpha",
    valye: gn
  },
  {
    title: "Dst Color",
    valye: bn
  },
  {
    title: "One Minus Dst Color",
    valye: yn
  },
  {
    title: "Constant Color",
    valye: En
  },
  {
    title: "One Minus Constant Color",
    valye: xn
  },
  {
    title: "Constant Alpha",
    valye: Sn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Cn
  }
];
function ut(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Za(t, n, a, e) {
  return {
    type: "boolean",
    title: Ae(t),
    prop: t,
    value: n,
    needsUpdate: !0,
    onChange: (i, c) => {
      e.updateObject(a.uuid, `material.${t}`, c), e.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = e.scene?.getObjectByProperty("uuid", a.uuid);
      h !== void 0 && Z(h, `material.${t}`, c);
    }
  };
}
function Ja(t, n, a, e) {
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
      o !== void 0 && Z(o, `material.${t}`, h);
    }
  };
  switch (t) {
    case "blending":
      ut(i, Wa);
      break;
    case "blendDst":
      ut(i, Xa);
      break;
    case "blendEquation":
      ut(i, qa);
      break;
    case "blendSrc":
      ut(i, Ka);
      break;
    case "side":
      ut(i, Va);
      break;
  }
  return Ya(t) && (i.value = Number(n), i.type = "range", i.min = 0, i.max = 1, i.step = 0.01), i;
}
function Qa(t, n, a, e) {
  const i = {
    type: "string",
    title: Ae(t),
    prop: t,
    value: n,
    needsUpdate: !0,
    onChange: (h, o) => {
      e.updateObject(a.uuid, `material.${t}`, o), e.updateObject(a.uuid, "material.needsUpdate", !0);
      const d = e.scene?.getObjectByProperty("uuid", a.uuid);
      d !== void 0 && Z(d, `material.${t}`, o);
    }
  };
  return (t === "vertexShader" || t === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (h, o) => {
    i.latest = o;
  }), i;
}
function Jt(t, n, a) {
  const e = [];
  for (const i in t) {
    if (!Ha(i))
      continue;
    const c = typeof t[i], h = t[i];
    if (c === "boolean")
      e.push(Za(i, h, n, a));
    else if (c === "number")
      e.push(Ja(i, h, n, a));
    else if (c === "string")
      e.push(Qa(i, h, n, a));
    else if (c === "object")
      if (h.isColor)
        e.push({
          title: Ae(i),
          prop: i,
          type: "color",
          value: h,
          onChange: (o, d) => {
            const u = new Ct(d);
            a.updateObject(n.uuid, `material.${o}`, u);
            const g = a.scene?.getObjectByProperty("uuid", n.uuid);
            g !== void 0 && Z(g, `material.${o}`, u);
          }
        });
      else if (Array.isArray(h)) {
        const o = [];
        for (const d in h)
          o.push({
            title: `${d}`,
            type: `${typeof h[d]}`,
            value: h[d],
            onChange: (u, g) => {
              a.updateObject(n.uuid, `material.${i}`, g);
              const v = a.scene?.getObjectByProperty("uuid", n.uuid);
              v !== void 0 && Z(v, `material.${i}`, g);
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
          onChange: (o, d) => {
            a.updateObject(n.uuid, `material.${o}`, d);
            const u = a.scene?.getObjectByProperty("uuid", n.uuid);
            u !== void 0 && Z(u, `material.${o}`, d);
          }
        });
      else {
        const o = [];
        for (const d in h) {
          const u = h[d];
          switch (typeof u) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: Ae(i),
                type: "image",
                value: u,
                onChange: (v, E) => {
                  a.createTexture(n.uuid, `material.${i}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && It(E).then((R) => {
                    Z(x, `material.${i}`, R), Z(x, "material.needsUpdate", !0);
                  });
                }
              }) : o.push({
                title: `${Ae(d)}`,
                prop: `material.${i}.${d}`,
                type: `${typeof t[i][d]}`,
                value: h[d],
                onChange: (v, E) => {
                  a.updateObject(n.uuid, `material.${i}.${d}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && Z(x, `material.${i}.${d}`, E);
                }
              });
              break;
            case "object":
              if (u.value !== void 0 && u.value.src !== void 0)
                o.push({
                  title: Ae(d),
                  type: "image",
                  value: u.value.src,
                  onChange: (v, E) => {
                    a.createTexture(n.uuid, `material.${i}.${d}.value`, h);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && It(E).then((R) => {
                      Z(x, `material.${i}.${d}.value`, R);
                    });
                  }
                });
              else if (i === "uniforms") {
                const v = u.value, E = (x, R, P) => ({
                  title: x,
                  type: "number",
                  value: P,
                  step: 0.01,
                  onChange: (V, Y) => {
                    const I = `material.uniforms.${d}.value.${R}`;
                    a.updateObject(n.uuid, I, Y);
                    const _ = a.scene?.getObjectByProperty("uuid", n.uuid);
                    _ !== void 0 && Z(_, I, Y);
                  }
                });
                if (typeof u.value == "number")
                  o.push({
                    title: d,
                    type: "number",
                    value: u.value,
                    step: 0.01,
                    onChange: (x, R) => {
                      const P = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, P, R);
                      const V = a.scene?.getObjectByProperty("uuid", n.uuid);
                      V !== void 0 && Z(V, P, R);
                    }
                  });
                else if (v.r !== void 0 && v.g !== void 0 && v.b !== void 0)
                  o.push({
                    title: d,
                    type: "color",
                    value: u.value,
                    onChange: (x, R) => {
                      const P = new Ct(R), V = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, V, P);
                      const Y = a.scene?.getObjectByProperty("uuid", n.uuid);
                      Y !== void 0 && Z(Y, V, P);
                    }
                  });
                else if (v.x !== void 0 && v.y !== void 0 && v.z === void 0 && v.w === void 0)
                  o.push({
                    title: d,
                    type: "vector",
                    value: u.value,
                    prop: `material.${i}.${d}.value`,
                    onChange: (x, R) => {
                      a.updateObject(n.uuid, x, R);
                      const P = a.scene?.getObjectByProperty("uuid", n.uuid);
                      P !== void 0 && Z(P, x, R);
                    }
                  });
                else if (v.x !== void 0 && v.y !== void 0 && v.z !== void 0 && v.w === void 0)
                  o.push(
                    {
                      title: d,
                      items: [
                        E("X", "x", u.value.x),
                        E("Y", "y", u.value.y),
                        E("Z", "z", u.value.z)
                      ]
                    }
                  );
                else if (v.x !== void 0 && v.y !== void 0 && v.z !== void 0 && v.w !== void 0)
                  o.push(
                    {
                      title: d,
                      items: [
                        E("X", "x", u.value.x),
                        E("Y", "y", u.value.y),
                        E("Z", "z", u.value.z),
                        E("W", "w", u.value.w)
                      ]
                    }
                  );
                else if (v.elements !== void 0) {
                  const x = v.elements, R = [];
                  for (let P = 0; P < x.length; P++)
                    R.push(E(P.toString(), P.toString(), x[P]));
                  o.push(
                    {
                      title: d,
                      items: R
                    }
                  );
                } else
                  console.log(">>> need to add this format:", d, v);
              } else
                o.push({
                  title: d,
                  type: `${typeof u.value}`,
                  value: u.value,
                  onChange: (v, E) => {
                    a.updateObject(n.uuid, `material.${i}.${d}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && Z(x, `material.${i}.${d}.value`, E);
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
function ei(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], i = a.length;
    for (let c = 0; c < i; c++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Je,
          {
            title: `Material ${c}`,
            items: Jt(a[c], t, n)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Je,
      {
        title: "Material",
        items: Jt(a, t, n)
      }
    );
}
function ti(t) {
  const n = fe(null), a = fe(null), e = fe(null), i = fe(null), c = fe(null), h = fe(null), [o, d] = ne(t.value), [u, g] = ne({ min: t.min, max: t.max }), [v, E] = ne(!1);
  function x() {
    v || (window.addEventListener("mousemove", P), window.addEventListener("mouseup", R), window.addEventListener("mouseup", R), E(!0));
  }
  function R() {
    window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", R), E(!1);
  }
  function P(_) {
    const q = c.current.getBoundingClientRect(), ee = Ze(0, 99, _.clientX - q.left) / 99, Se = Ze(0, 99, _.clientY - q.top) / 99, W = ft(Kt(u.min, u.max, ee), 3), me = ft(Kt(u.min, u.max, Se), 3);
    t.onChange({ target: { value: { x: W, y: me } } }), d({ x: W, y: me });
  }
  function V(_) {
    let q = o.x, ee = o.y;
    _.target === n.current ? q = Number(_.target.value) : ee = Number(_.target.value), d({ x: q, y: ee });
  }
  function Y() {
    const _ = Number(e.current.value);
    g({ min: _, max: u.max }), (o.x < _ || o.y < _) && d({ x: Ze(_, u.max, o.x), y: Ze(_, u.max, o.y) });
  }
  function I() {
    const _ = Number(i.current.value);
    g({ min: u.min, max: _ }), (o.x > _ || o.y > _) && d({ x: Ze(u.min, _, o.x), y: Ze(u.min, _, o.y) });
  }
  return ke(() => {
    const _ = qt(u.min, u.max, o.x), q = qt(u.min, u.max, o.y);
    h.current.style.left = `${_ * 100}%`, h.current.style.top = `${q * 100}%`;
  }, [u, o]), /* @__PURE__ */ l.jsxs("div", { className: "vector", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: o.x,
            min: u.min,
            max: u.max,
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
            min: u.min,
            max: u.max,
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
            value: u.min,
            step: 0.01,
            onChange: Y
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
            value: u.max,
            step: 0.01,
            onChange: I
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: c, onMouseDown: x, onMouseUp: R, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: h })
    ] })
  ] });
}
function ht(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Oa(t.value));
  const [a, e] = ne(n), i = fe(null), c = fe(null), h = fe(null);
  ke(() => {
    let g = !1, v = -1, E = 0, x = Number(a);
    const R = (_) => {
      g = !0, E = x, v = _.clientX;
    }, P = (_) => {
      if (!g)
        return;
      const q = t.step !== void 0 ? t.step : 1, ee = (_.clientX - v) * q;
      x = Number((E + ee).toFixed(4)), c.current !== null && (c.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, V = () => {
      g = !1;
    }, Y = () => {
      g = !1;
    }, I = t.type === "number";
    return I && (i.current?.addEventListener("mousedown", R, !1), document.addEventListener("mouseup", V, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", Y, !1)), () => {
      I && (i.current?.removeEventListener("mousedown", R), document.removeEventListener("mouseup", V), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", Y));
    };
  }, [a]);
  const o = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = o || t.type === "image" || t.type === "vector", u = (g) => {
    let v = g.target.value;
    t.type === "boolean" ? v = g.target.checked : t.type === "option" && (v = t.options[v].value), e(v), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: wt(t.title) }, "fieldLabel"),
    t.type === "string" && !o && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: u,
        value: a
      }
    ),
    t.type === "string" && o && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: u,
        value: a
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: u,
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
        onChange: u
      }
    ),
    t.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: u, disabled: t.disabled, className: "min" }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: a,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: u
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: u, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: u, disabled: t.disabled })
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
      Ga().then((g) => {
        h.current.src = g, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, g);
      });
    }, src: a.length > 0 ? a : Ua }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: u, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((g, v) => /* @__PURE__ */ l.jsx("option", { value: g.value, children: wt(g.title) }, v)) }) }),
    t.type === "vector" && /* @__PURE__ */ l.jsx(ti, { value: a, min: -1, max: 1, onChange: u })
  ] });
}
function Qt(t) {
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
function ni(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Qt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, c) => {
          n.updateObject(t.uuid, i, c), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = n.scene?.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (Z(h, i, c), h.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: Qt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, c) => {
          n.updateObject(t.uuid, i, c), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = n.scene?.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (Z(h, i, c), h.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Je,
    {
      title: "Camera",
      items: a
    }
  );
}
const ai = Math.PI / 180, ii = 180 / Math.PI;
function rt(t, n, a, e, i) {
  return e + (t - n) * (i - e) / (a - n);
}
function ri(t) {
  return t * ai;
}
function kt(t) {
  return t * ii;
}
function si(t, n) {
  const a = new ea();
  a.elements = t.matrix;
  const e = new X(), i = new ta(), c = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), i.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const h = (d, u) => {
    n.updateObject(t.uuid, d, u);
    const g = n.scene?.getObjectByProperty("uuid", t.uuid);
    g !== void 0 && Z(g, d, u);
  }, o = (d, u) => {
    h(d, ri(u));
  };
  return /* @__PURE__ */ l.jsx(
    Je,
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
          value: ft(kt(i.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: ft(kt(i.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: o
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: ft(kt(i.z)),
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
function en(t) {
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
function oi(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const i = t.lightInfo[e];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: en(e),
        prop: e,
        type: "color",
        value: i,
        onChange: (c, h) => {
          const o = new Ct(h);
          n.updateObject(t.uuid, c, o);
          const d = n.scene?.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && Z(d, c, o);
        }
      }) : a.push({
        title: en(e),
        prop: e,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (c, h) => {
          n.updateObject(t.uuid, c, h);
          const o = n.scene?.getObjectByProperty("uuid", t.uuid);
          o !== void 0 && Z(o, c, h);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Je,
    {
      title: "Light",
      items: a
    }
  );
}
function ci(t, n) {
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
      const d = [
        {
          title: "Time Scale",
          type: "range",
          value: o.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (u, g) => {
            o.timeScale = g, n.updateObject(t.uuid, "mixer.timeScale", g);
          }
        }
      ];
      d.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          o.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: d
      });
    }
  }
  return /* @__PURE__ */ l.jsx(Je, { title: "Animation", items: a });
}
const In = {
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
let oe = { ...In };
function li(t) {
  const [n, a] = ne(-1);
  ke(() => {
    function h(d) {
      oe = { ...d.value }, a(Date.now());
    }
    function o() {
      oe = { ...In }, a(Date.now());
    }
    return F.addEventListener(B.SET_SCENE, o), F.addEventListener(B.SET_OBJECT, h), () => {
      F.removeEventListener(B.SET_SCENE, o), F.removeEventListener(B.SET_OBJECT, h);
    };
  }, []);
  const e = oe.type.toLowerCase(), i = oe.animations.length > 0 || oe.mixer !== void 0, c = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Ft, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: oe.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        ht,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: oe.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ht,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: oe.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ht,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: oe.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ht,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: oe.visible,
          onChange: (h, o) => {
            t.three.updateObject(oe.uuid, h, o);
            const d = t.three.scene?.getObjectByProperty("uuid", oe.uuid);
            d !== void 0 && Z(d, h, o);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      si(oe, t.three),
      i ? ci(oe, t.three) : null,
      e.search("camera") > -1 ? ni(oe, t.three) : null,
      e.search("light") > -1 ? oi(oe, t.three) : null,
      c ? ei(oe, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ai(t) {
  const [n, a] = ne(t.scene);
  ke(() => {
    const c = (h) => {
      a(h.value);
    };
    return F.addEventListener(B.SET_SCENE, c), () => {
      F.removeEventListener(B.SET_SCENE, c);
    };
  }, []);
  const e = n !== null, i = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Ft, { label: i, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: e && /* @__PURE__ */ l.jsx($a, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ l.jsx(li, { three: t.three })
  ] }, "SidePanel");
}
function ki(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (o) => {
    if (!n())
      return;
    const d = t.three.scene?.getObjectByProperty("uuid", o.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (o, d, u) => {
    if (!n())
      return;
    const g = t.three.scene?.getObjectByProperty("uuid", o);
    g !== void 0 && Z(g, d, u);
  }, i = (o) => {
    if (!n())
      return;
    const d = o.value, { key: u, value: g, uuid: v } = d;
    e(v, u, g);
  }, c = (o) => {
    if (!n())
      return;
    const d = o.value;
    It(d.value).then((u) => {
      e(d.uuid, d.key, u), e(d.uuid, "material.needsUpdate", !0);
    });
  }, h = (o) => {
    if (!n())
      return;
    const { key: d, uuid: u, value: g, subitem: v } = o.value, E = t.three.scene?.getObjectByProperty("uuid", u);
    if (E !== void 0)
      try {
        v !== void 0 ? Aa(E, v)[d](g) : E[d](g);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(d), console.log(g);
      }
  };
  return ke(() => (F.addEventListener(B.GET_OBJECT, a), F.addEventListener(B.UPDATE_OBJECT, i), F.addEventListener(B.CREATE_TEXTURE, c), F.addEventListener(B.REQUEST_METHOD, h), () => {
    F.removeEventListener(B.GET_OBJECT, a), F.removeEventListener(B.UPDATE_OBJECT, i), F.removeEventListener(B.CREATE_TEXTURE, c), F.removeEventListener(B.REQUEST_METHOD, h);
  }), []), null;
}
class di extends na {
  constructor(n, a) {
    const e = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new zt();
    i.setAttribute("position", new Ht(e, 3)), i.computeBoundingSphere();
    const c = new aa({ fog: !1 });
    super(i, c), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const h = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new zt();
    o.setAttribute("position", new Ht(h, 3)), o.computeBoundingSphere(), this.add(new wn(o, new On({ side: cn, fog: !1 })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const n = this.material.color, a = Math.max(n.r, n.g, n.b);
      a > 1 && n.multiplyScalar(1 / a), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const tn = { type: "change" }, Dt = { type: "start" }, nn = { type: "end" }, yt = new ia(), an = new ra(), ui = Math.cos(70 * sa.DEG2RAD);
class hi extends sn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: nt.ROTATE, MIDDLE: nt.DOLLY, RIGHT: nt.PAN }, this.touches = { ONE: at.ROTATE, TWO: at.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return o.phi;
    }, this.getAzimuthalAngle = function() {
      return o.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", st), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", st), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(tn), e.update(), c = i.NONE;
    }, this.update = function() {
      const s = new X(), y = new Yt().setFromUnitVectors(n.up, new X(0, 1, 0)), T = y.clone().invert(), U = new X(), K = new Yt(), ye = new X(), de = 2 * Math.PI;
      return function(Rt = null) {
        const ct = e.object.position;
        s.copy(ct).sub(e.target), s.applyQuaternion(y), o.setFromVector3(s), e.autoRotate && c === i.NONE && ge(Me(Rt)), e.enableDamping ? (o.theta += d.theta * e.dampingFactor, o.phi += d.phi * e.dampingFactor) : (o.theta += d.theta, o.phi += d.phi);
        let Oe = e.minAzimuthAngle, Ee = e.maxAzimuthAngle;
        isFinite(Oe) && isFinite(Ee) && (Oe < -Math.PI ? Oe += de : Oe > Math.PI && (Oe -= de), Ee < -Math.PI ? Ee += de : Ee > Math.PI && (Ee -= de), Oe <= Ee ? o.theta = Math.max(Oe, Math.min(Ee, o.theta)) : o.theta = o.theta > (Oe + Ee) / 2 ? Math.max(Oe, o.theta) : Math.min(Ee, o.theta)), o.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, o.phi)), o.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(g, e.dampingFactor) : e.target.add(g), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && Se || e.object.isOrthographicCamera ? o.radius = Pe(o.radius) : o.radius = Pe(o.radius * u), s.setFromSpherical(o), s.applyQuaternion(T), ct.copy(e.target).add(s), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, g.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), g.set(0, 0, 0));
        let Ve = !1;
        if (e.zoomToCursor && Se) {
          let We = null;
          if (e.object.isPerspectiveCamera) {
            const qe = s.length();
            We = Pe(qe * u);
            const Ke = qe - We;
            e.object.position.addScaledVector(q, Ke), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const qe = new X(ee.x, ee.y, 0);
            qe.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / u)), e.object.updateProjectionMatrix(), Ve = !0;
            const Ke = new X(ee.x, ee.y, 0);
            Ke.unproject(e.object), e.object.position.sub(Ke).add(qe), e.object.updateMatrixWorld(), We = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          We !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(We).add(e.object.position) : (yt.origin.copy(e.object.position), yt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(yt.direction)) < ui ? n.lookAt(e.target) : (an.setFromNormalAndCoplanarPoint(e.object.up, e.target), yt.intersectPlane(an, e.target))));
        } else
          e.object.isOrthographicCamera && (Ve = u !== 1, Ve && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / u)), e.object.updateProjectionMatrix()));
        return u = 1, Se = !1, Ve || U.distanceToSquared(e.object.position) > h || 8 * (1 - K.dot(e.object.quaternion)) > h || ye.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(tn), U.copy(e.object.position), K.copy(e.object.quaternion), ye.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", et), e.domElement.removeEventListener("pointerdown", A), e.domElement.removeEventListener("pointercancel", J), e.domElement.removeEventListener("wheel", pt), e.domElement.removeEventListener("pointermove", z), e.domElement.removeEventListener("pointerup", J), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", st), e._domElementKeyEvents = null);
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
    const h = 1e-6, o = new Gt(), d = new Gt();
    let u = 1;
    const g = new X(), v = new pe(), E = new pe(), x = new pe(), R = new pe(), P = new pe(), V = new pe(), Y = new pe(), I = new pe(), _ = new pe(), q = new X(), ee = new pe();
    let Se = !1;
    const W = [], me = {};
    let le = !1;
    function Me(s) {
      return s !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Te(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function ge(s) {
      d.theta -= s;
    }
    function L(s) {
      d.phi -= s;
    }
    const be = function() {
      const s = new X();
      return function(T, U) {
        s.setFromMatrixColumn(U, 0), s.multiplyScalar(-T), g.add(s);
      };
    }(), C = function() {
      const s = new X();
      return function(T, U) {
        e.screenSpacePanning === !0 ? s.setFromMatrixColumn(U, 1) : (s.setFromMatrixColumn(U, 0), s.crossVectors(e.object.up, s)), s.multiplyScalar(T), g.add(s);
      };
    }(), Ce = function() {
      const s = new X();
      return function(T, U) {
        const K = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const ye = e.object.position;
          s.copy(ye).sub(e.target);
          let de = s.length();
          de *= Math.tan(e.object.fov / 2 * Math.PI / 180), be(2 * T * de / K.clientHeight, e.object.matrix), C(2 * U * de / K.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (be(T * (e.object.right - e.object.left) / e.object.zoom / K.clientWidth, e.object.matrix), C(U * (e.object.top - e.object.bottom) / e.object.zoom / K.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function _e(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? u /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function De(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? u *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Re(s, y) {
      if (!e.zoomToCursor)
        return;
      Se = !0;
      const T = e.domElement.getBoundingClientRect(), U = s - T.left, K = y - T.top, ye = T.width, de = T.height;
      ee.x = U / ye * 2 - 1, ee.y = -(K / de) * 2 + 1, q.set(ee.x, ee.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function Pe(s) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, s));
    }
    function je(s) {
      v.set(s.clientX, s.clientY);
    }
    function Fe(s) {
      Re(s.clientX, s.clientX), Y.set(s.clientX, s.clientY);
    }
    function Be(s) {
      R.set(s.clientX, s.clientY);
    }
    function ae(s) {
      E.set(s.clientX, s.clientY), x.subVectors(E, v).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      ge(2 * Math.PI * x.x / y.clientHeight), L(2 * Math.PI * x.y / y.clientHeight), v.copy(E), e.update();
    }
    function we(s) {
      I.set(s.clientX, s.clientY), _.subVectors(I, Y), _.y > 0 ? _e(Te(_.y)) : _.y < 0 && De(Te(_.y)), Y.copy(I), e.update();
    }
    function Ye(s) {
      P.set(s.clientX, s.clientY), V.subVectors(P, R).multiplyScalar(e.panSpeed), Ce(V.x, V.y), R.copy(P), e.update();
    }
    function Ge(s) {
      Re(s.clientX, s.clientY), s.deltaY < 0 ? De(Te(s.deltaY)) : s.deltaY > 0 && _e(Te(s.deltaY)), e.update();
    }
    function ue(s) {
      let y = !1;
      switch (s.code) {
        case e.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? L(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ce(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? L(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ce(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? ge(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ce(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? ge(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ce(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (s.preventDefault(), e.update());
    }
    function p(s) {
      if (W.length === 1)
        v.set(s.pageX, s.pageY);
      else {
        const y = Ue(s), T = 0.5 * (s.pageX + y.x), U = 0.5 * (s.pageY + y.y);
        v.set(T, U);
      }
    }
    function m(s) {
      if (W.length === 1)
        R.set(s.pageX, s.pageY);
      else {
        const y = Ue(s), T = 0.5 * (s.pageX + y.x), U = 0.5 * (s.pageY + y.y);
        R.set(T, U);
      }
    }
    function w(s) {
      const y = Ue(s), T = s.pageX - y.x, U = s.pageY - y.y, K = Math.sqrt(T * T + U * U);
      Y.set(0, K);
    }
    function j(s) {
      e.enableZoom && w(s), e.enablePan && m(s);
    }
    function ie(s) {
      e.enableZoom && w(s), e.enableRotate && p(s);
    }
    function M(s) {
      if (W.length == 1)
        E.set(s.pageX, s.pageY);
      else {
        const T = Ue(s), U = 0.5 * (s.pageX + T.x), K = 0.5 * (s.pageY + T.y);
        E.set(U, K);
      }
      x.subVectors(E, v).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      ge(2 * Math.PI * x.x / y.clientHeight), L(2 * Math.PI * x.y / y.clientHeight), v.copy(E);
    }
    function O(s) {
      if (W.length === 1)
        P.set(s.pageX, s.pageY);
      else {
        const y = Ue(s), T = 0.5 * (s.pageX + y.x), U = 0.5 * (s.pageY + y.y);
        P.set(T, U);
      }
      V.subVectors(P, R).multiplyScalar(e.panSpeed), Ce(V.x, V.y), R.copy(P);
    }
    function N(s) {
      const y = Ue(s), T = s.pageX - y.x, U = s.pageY - y.y, K = Math.sqrt(T * T + U * U);
      I.set(0, K), _.set(0, Math.pow(I.y / Y.y, e.zoomSpeed)), _e(_.y), Y.copy(I);
      const ye = (s.pageX + y.x) * 0.5, de = (s.pageY + y.y) * 0.5;
      Re(ye, de);
    }
    function re(s) {
      e.enableZoom && N(s), e.enablePan && O(s);
    }
    function se(s) {
      e.enableZoom && N(s), e.enableRotate && M(s);
    }
    function A(s) {
      e.enabled !== !1 && (W.length === 0 && (e.domElement.setPointerCapture(s.pointerId), e.domElement.addEventListener("pointermove", z), e.domElement.addEventListener("pointerup", J)), Mt(s), s.pointerType === "touch" ? ot(s) : Ie(s));
    }
    function z(s) {
      e.enabled !== !1 && (s.pointerType === "touch" ? gt(s) : Qe(s));
    }
    function J(s) {
      switch (Tt(s), W.length) {
        case 0:
          e.domElement.releasePointerCapture(s.pointerId), e.domElement.removeEventListener("pointermove", z), e.domElement.removeEventListener("pointerup", J), e.dispatchEvent(nn), c = i.NONE;
          break;
        case 1:
          const y = W[0], T = me[y];
          ot({ pointerId: y, pageX: T.x, pageY: T.y });
          break;
      }
    }
    function Ie(s) {
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
        case nt.DOLLY:
          if (e.enableZoom === !1)
            return;
          Fe(s), c = i.DOLLY;
          break;
        case nt.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enablePan === !1)
              return;
            Be(s), c = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            je(s), c = i.ROTATE;
          }
          break;
        case nt.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enableRotate === !1)
              return;
            je(s), c = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Be(s), c = i.PAN;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && e.dispatchEvent(Dt);
    }
    function Qe(s) {
      switch (c) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          ae(s);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          we(s);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          Ye(s);
          break;
      }
    }
    function pt(s) {
      e.enabled === !1 || e.enableZoom === !1 || c !== i.NONE || (s.preventDefault(), e.dispatchEvent(Dt), Ge(mt(s)), e.dispatchEvent(nn));
    }
    function mt(s) {
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
      return s.ctrlKey && !le && (T.deltaY *= 10), T;
    }
    function vt(s) {
      s.key === "Control" && (le = !0, e.domElement.getRootNode().addEventListener("keyup", $e, { passive: !0, capture: !0 }));
    }
    function $e(s) {
      s.key === "Control" && (le = !1, e.domElement.getRootNode().removeEventListener("keyup", $e, { passive: !0, capture: !0 }));
    }
    function st(s) {
      e.enabled === !1 || e.enablePan === !1 || ue(s);
    }
    function ot(s) {
      switch (bt(s), W.length) {
        case 1:
          switch (e.touches.ONE) {
            case at.ROTATE:
              if (e.enableRotate === !1)
                return;
              p(s), c = i.TOUCH_ROTATE;
              break;
            case at.PAN:
              if (e.enablePan === !1)
                return;
              m(s), c = i.TOUCH_PAN;
              break;
            default:
              c = i.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case at.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              j(s), c = i.TOUCH_DOLLY_PAN;
              break;
            case at.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              ie(s), c = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              c = i.NONE;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && e.dispatchEvent(Dt);
    }
    function gt(s) {
      switch (bt(s), c) {
        case i.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          M(s), e.update();
          break;
        case i.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          O(s), e.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          re(s), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          se(s), e.update();
          break;
        default:
          c = i.NONE;
      }
    }
    function et(s) {
      e.enabled !== !1 && s.preventDefault();
    }
    function Mt(s) {
      W.push(s.pointerId);
    }
    function Tt(s) {
      delete me[s.pointerId];
      for (let y = 0; y < W.length; y++)
        if (W[y] == s.pointerId) {
          W.splice(y, 1);
          return;
        }
    }
    function bt(s) {
      let y = me[s.pointerId];
      y === void 0 && (y = new pe(), me[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function Ue(s) {
      const y = s.pointerId === W[0] ? W[1] : W[0];
      return me[y];
    }
    e.domElement.addEventListener("contextmenu", et), e.domElement.addEventListener("pointerdown", A), e.domElement.addEventListener("pointercancel", J), e.domElement.addEventListener("wheel", pt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", vt, { passive: !0, capture: !0 }), this.update();
  }
}
const St = (t) => {
  const [n, a] = ne(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, i = (c) => {
    c !== n && (t.onSelect(c), a(c)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((c) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(c), children: c }, c)) })
  ] });
}, Xe = Sa(function(n, a) {
  const [e, i] = ne(!1), c = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      St,
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
class fi extends Mn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: oa,
      side: ln,
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
class pi extends wn {
  gridMaterial;
  constructor() {
    const n = new fi();
    super(new ca(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const mi = `#include <common>
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
}`, vi = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class gi extends Mn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: mi,
      fragmentShader: vi
    });
  }
}
let Et = "Renderer", Ne, xt = !1, rn = !1, G = null, ce = null, ze = null, He = null;
function Di(t) {
  const n = t.three.app.appID, a = localStorage.getItem(`${n}_mode`), e = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", c = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", h = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", o = ve(() => /* @__PURE__ */ new Map(), []), d = ve(() => /* @__PURE__ */ new Map(), []), u = ve(() => /* @__PURE__ */ new Map(), []), g = ve(() => /* @__PURE__ */ new Map(), []), v = ve(() => new la(), []), E = ve(() => new da(), []), x = ve(() => new pi(), []), R = ve(() => new Vt(500), []), P = ve(() => new Vt(100), []), V = ve(() => new ua(), []), Y = ve(() => new ha(), []), I = ve(() => new gi(), []), _ = ve(() => new On({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function q(p, m) {
    const w = new Wt(-100, 100, 100, -100, 50, 3e3);
    return w.name = p, w.position.copy(m), w.lookAt(0, 0, 0), o.set(p, w), w;
  }
  const ee = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], Se = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], W = fe(null), me = fe(null), le = fe(null), Me = fe(null), Te = fe(null), ge = fe(null), [L, be] = ne(a !== null ? a : "Single"), [C, Ce] = ne(null), [_e, De] = ne(!1), [Re, Pe] = ne(!1), [je, Fe] = ne(!1), [, Be] = ne(Date.now());
  localStorage.setItem(`${n}_mode`, L), localStorage.setItem(`${n}_tlCam`, e), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, c), localStorage.setItem(`${n}_brCam`, h);
  const ae = (p, m) => {
    const w = d.get(p.name);
    w !== void 0 && w.dispose(), d.delete(p.name);
    const j = u.get(p.name);
    j !== void 0 && (v.remove(j), j.dispose()), u.delete(p.name);
    const ie = new hi(p, m);
    switch (ie.enableDamping = !0, ie.dampingFactor = 0.05, p.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        ie.enableRotate = !1;
        break;
    }
    if (d.set(p.name, ie), p instanceof Pt) {
      const M = new ma(p);
      u.set(p.name, M), v.add(M);
    }
  }, we = (p) => {
    const m = u.get(p.name);
    m !== void 0 && (v.remove(m), m.dispose(), u.delete(p.name));
    const w = d.get(p.name);
    w !== void 0 && (w.dispose(), d.delete(p.name));
  }, Ye = () => {
    d.forEach((p, m) => {
      p.dispose();
      const w = u.get(m);
      w !== void 0 && (v.remove(w), w.dispose()), u.delete(m), d.delete(m);
    }), d.clear(), u.clear();
  }, Ge = () => {
    switch (L) {
      case "Single":
        ae(G, le.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(G, le.current), ae(ce, Me.current);
        break;
      case "Quad":
        ae(G, le.current), ae(ce, Me.current), ae(ze, Te.current), ae(He, ge.current);
        break;
    }
  };
  ke(() => {
    const p = new fa({
      canvas: W.current,
      stencil: !1
    });
    p.autoClear = !1, p.shadowMap.enabled = !0, p.setPixelRatio(devicePixelRatio), p.setClearColor(0), t.three.renderer = p, Ce(p);
  }, []), ke(() => {
    v.name = "Debug Scene", E.name = "helpers", v.add(E), E.add(x), R.name = "axisHelper", E.add(R), P.name = "interactionHelper", E.add(P), P.visible = !1, q("Top", new X(0, 1e3, 0)), q("Bottom", new X(0, -1e3, 0)), q("Left", new X(-1e3, 0, 0)), q("Right", new X(1e3, 0, 0)), q("Front", new X(0, 0, 1e3)), q("Back", new X(0, 0, -1e3)), q("Orthographic", new X(1e3, 1e3, 1e3));
    const p = new Pt(60, 1, 50, 3e3);
    p.name = "Debug", p.position.set(500, 500, 500), p.lookAt(0, 0, 0), o.set("Debug", p), G = o.get(localStorage.getItem(`${n}_tlCam`)), ce = o.get(localStorage.getItem(`${n}_trCam`)), ze = o.get(localStorage.getItem(`${n}_blCam`)), He = o.get(localStorage.getItem(`${n}_brCam`));
  }, []), ke(() => {
    const p = () => {
      g.forEach((M) => {
        E.remove(M), M.dispose();
      }), g.clear();
    }, m = () => {
      Ne.traverse((M) => {
        if (M.type.search("Light") > -1) {
          let O;
          switch (M.type) {
            case "DirectionalLight":
              O = new ya(M, 100), O.name = `${M.name}Helper`, g.set(M.name, O), E.add(O);
              break;
            case "HemisphereLight":
              O = new ba(M, 100), O.name = `${M.name}Helper`, g.set(M.name, O), E.add(O);
              break;
            case "RectAreaLight":
              O = new di(M, 100), O.name = `${M.name}Helper`, g.set(M.name, O), E.add(O);
              break;
            case "PointLight":
              O = new ga(M, 100), O.name = `${M.name}Helper`, g.set(M.name, O), E.add(O);
              break;
            case "SpotLight":
              O = new va(M, 100), O.name = `${M.name}Helper`, g.set(M.name, O), E.add(O);
              break;
          }
        }
      });
    }, w = (M) => {
      p(), An(Ne), v.remove(Ne);
      const O = t.scenes.get(M.value.name);
      if (O !== void 0) {
        const N = new O();
        t.onSceneSet !== void 0 && t.onSceneSet(N), Ne = N, t.three.scene = Ne, v.add(Ne), rn = !0, m();
      }
    }, j = (M) => {
      const O = M.value, N = t.three.scene?.getObjectByProperty("uuid", O.uuid);
      N !== void 0 && o.set(O.name, N), Be(Date.now());
    }, ie = (M) => {
      o.delete(M.value.name), Be(Date.now());
    };
    return F.addEventListener(B.SET_SCENE, w), F.addEventListener(B.ADD_CAMERA, j), F.addEventListener(B.REMOVE_CAMERA, ie), () => {
      F.removeEventListener(B.SET_SCENE, w), F.removeEventListener(B.ADD_CAMERA, j), F.removeEventListener(B.REMOVE_CAMERA, ie);
    };
  }, []), ke(() => {
    if (C === null)
      return;
    let p = window.innerWidth, m = window.innerHeight, w = Math.floor(p / 2), j = Math.floor(m / 2), ie = -1;
    const M = () => {
      p = window.innerWidth - 300, m = window.innerHeight, w = Math.floor(p / 2), j = Math.floor(m / 2), C.setSize(p, m);
      let A = p, z = m;
      switch (L) {
        case "Side by Side":
          A = w, z = m;
          break;
        case "Stacked":
          A = p, z = j;
          break;
        case "Quad":
          A = w, z = j;
          break;
      }
      o.forEach((J) => {
        J instanceof Wt ? (J.left = A / -2, J.right = A / 2, J.top = z / 2, J.bottom = z / -2, J.updateProjectionMatrix()) : J instanceof Pt && (J.aspect = A / z, J.updateProjectionMatrix(), u.get(J.name)?.update());
      });
    }, O = () => {
      C.setViewport(0, 0, p, m), C.setScissor(0, 0, p, m), C.render(v, G);
    }, N = () => {
      if (L === "Side by Side")
        C.setViewport(0, 0, w, m), C.setScissor(0, 0, w, m), C.render(v, G), C.setViewport(w, 0, w, m), C.setScissor(w, 0, w, m), C.render(v, ce);
      else {
        const A = m - j;
        C.setViewport(0, A, p, j), C.setScissor(0, A, p, j), C.render(v, G), C.setViewport(0, 0, p, j), C.setScissor(0, 0, p, j), C.render(v, ce);
      }
    }, re = () => {
      let A = 0, z = 0;
      z = m - j, A = 0, C.setViewport(A, z, w, j), C.setScissor(A, z, w, j), C.render(v, G), A = w, C.setViewport(A, z, w, j), C.setScissor(A, z, w, j), C.render(v, ce), z = 0, A = 0, C.setViewport(A, z, w, j), C.setScissor(A, z, w, j), C.render(v, ze), A = w, C.setViewport(A, z, w, j), C.setScissor(A, z, w, j), C.render(v, He);
    }, se = () => {
      switch (d.forEach((A) => {
        A.update();
      }), t.onSceneUpdate !== void 0 && rn && t.onSceneUpdate(Ne), C.clear(), L) {
        case "Single":
          O();
          break;
        case "Side by Side":
        case "Stacked":
          N();
          break;
        case "Quad":
          re();
          break;
      }
      ie = requestAnimationFrame(se);
    };
    return Ge(), window.addEventListener("resize", M), M(), se(), () => {
      window.removeEventListener("resize", M), cancelAnimationFrame(ie), ie = -1;
    };
  }, [L, C]), ke(() => {
    if (C !== null) {
      const p = new pa(), m = new pe(), w = (O, N, re, se) => {
        switch (L) {
          case "Quad":
            O < re ? N < se ? p.setFromCamera(m, G) : p.setFromCamera(m, ze) : N < se ? p.setFromCamera(m, ce) : p.setFromCamera(m, He);
            break;
          case "Side by Side":
            O < re ? p.setFromCamera(m, G) : p.setFromCamera(m, ce);
            break;
          case "Single":
            p.setFromCamera(m, G);
            break;
          case "Stacked":
            N < se ? p.setFromCamera(m, G) : p.setFromCamera(m, ce);
            break;
        }
      }, j = (O) => {
        if (!xt)
          return;
        const N = new pe();
        C.getSize(N);
        const re = Math.min(O.clientX, N.x), se = Math.min(O.clientY, N.y);
        m.x = rt(re, 0, N.x, -1, 1), m.y = rt(se, 0, N.y, 1, -1);
        const A = N.x / 2, z = N.y / 2, J = () => {
          re < A ? m.x = rt(re, 0, A, -1, 1) : m.x = rt(re, A, N.x, -1, 1);
        }, Ie = () => {
          se < z ? m.y = rt(se, 0, z, 1, -1) : m.y = rt(se, z, N.y, 1, -1);
        };
        switch (L) {
          case "Quad":
            J(), Ie();
            break;
          case "Side by Side":
            J();
            break;
          case "Stacked":
            Ie(), Ie();
            break;
        }
        w(re, se, A, z);
        const Qe = p.intersectObjects(Ne.children);
        Qe.length > 0 && P.position.copy(Qe[0].point);
      }, ie = (O) => {
        if (!xt)
          return;
        const N = new pe();
        if (C.getSize(N), O.clientX >= N.x)
          return;
        j(O);
        const re = p.intersectObjects(Ne.children);
        re.length > 0 && t.three.getObject(re[0].object.uuid);
      }, M = me.current;
      return M.addEventListener("mousemove", j, !1), M.addEventListener("click", ie, !1), () => {
        M.removeEventListener("mousemove", j), M.removeEventListener("click", ie);
      };
    }
  }, [L, C]);
  const ue = [];
  return o.forEach((p, m) => {
    ue.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: W }),
    C !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${L === "Single" || L === "Stacked" ? "single" : ""}`, ref: me, children: [
        L === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Xe, { camera: G, options: ue, ref: le, onSelect: (p) => {
          d.get(G.name)?.dispose();
          const m = o.get(p);
          m !== void 0 && (we(G), G = m, localStorage.setItem(`${n}_tlCam`, m.name), ae(m, le.current));
        } }) }),
        (L === "Side by Side" || L === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Xe, { camera: G, options: ue, ref: le, onSelect: (p) => {
            d.get(G.name)?.dispose();
            const m = o.get(p);
            m !== void 0 && (we(G), G = m, localStorage.setItem(`${n}_tlCam`, m.name), ae(m, le.current));
          } }),
          /* @__PURE__ */ l.jsx(Xe, { camera: ce, options: ue, ref: Me, onSelect: (p) => {
            d.get(ce.name)?.dispose();
            const m = o.get(p);
            m !== void 0 && (we(ce), ce = m, localStorage.setItem(`${n}_trCam`, m.name), ae(m, Me.current));
          } })
        ] }),
        L === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Xe, { camera: G, options: ue, ref: le, onSelect: (p) => {
            d.get(G.name)?.dispose();
            const m = o.get(p);
            m !== void 0 && (we(G), G = m, localStorage.setItem(`${n}_tlCam`, m.name), ae(m, le.current));
          } }),
          /* @__PURE__ */ l.jsx(Xe, { camera: ce, options: ue, ref: Me, onSelect: (p) => {
            d.get(ce.name)?.dispose();
            const m = o.get(p);
            m !== void 0 && (we(ce), ce = m, localStorage.setItem(`${n}_trCam`, m.name), ae(m, Me.current));
          } }),
          /* @__PURE__ */ l.jsx(Xe, { camera: ze, options: ue, ref: Te, onSelect: (p) => {
            d.get(ze.name)?.dispose();
            const m = o.get(p);
            m !== void 0 && (we(ze), ze = m, localStorage.setItem(`${n}_blCam`, m.name), ae(m, Te.current));
          } }),
          /* @__PURE__ */ l.jsx(Xe, { camera: He, options: ue, ref: ge, onSelect: (p) => {
            d.get(He.name)?.dispose();
            const m = o.get(p);
            m !== void 0 && (we(He), He = m, localStorage.setItem(`${n}_brCam`, m.name), ae(m, ge.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          St,
          {
            index: Se.indexOf(L),
            options: Se,
            onSelect: (p) => {
              p !== L && (Ye(), be(p));
            },
            open: _e,
            onToggle: (p) => {
              De(p), Re && Pe(!1), je && Fe(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          St,
          {
            index: ee.indexOf(Et),
            options: ee,
            onSelect: (p) => {
              if (p !== Et)
                switch (Et = p, Et) {
                  case "Depth":
                    v.overrideMaterial = V;
                    break;
                  case "Normals":
                    v.overrideMaterial = Y;
                    break;
                  default:
                  case "Renderer":
                    v.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    v.overrideMaterial = _;
                    break;
                  case "UVs":
                    v.overrideMaterial = I;
                    break;
                }
            },
            open: Re,
            onToggle: (p) => {
              _e && De(!1), Pe(p), je && Fe(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          St,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (p) => {
              xt = p === "Selection Mode", P.visible = xt;
            },
            open: je,
            onToggle: (p) => {
              _e && De(!1), Re && Pe(!1), Fe(p);
            }
          }
        )
      ] })
    ] })
  ] });
}
function ji(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: t.footer })
  ] });
}
export {
  Ft as Accordion,
  Oi as Application,
  Ot as BaseRemote,
  jn as ChildObject,
  $a as ContainerObject,
  Na as Draggable,
  La as DraggableItem,
  Fa as Dropdown,
  Ba as DropdownItem,
  ji as Editor,
  li as Inspector,
  Di as MultiView,
  Dn as NavButton,
  Mi as RemoteComponents,
  Pi as RemoteController,
  Nt as RemoteTheatre,
  _i as RemoteThree,
  Ri as RemoteTweakpane,
  ki as SceneInspector,
  Ai as SidePanel,
  B as ToolEvents,
  wt as capitalize,
  Ze as clamp,
  Oa as colorToHex,
  F as debugDispatcher,
  Si as defaultTheatreCallback,
  An as dispose,
  Ta as disposeMaterial,
  wi as disposeTexture,
  Ci as distance,
  Pn as hierarchyUUID,
  wa as isColor,
  Kt as mix,
  Rn as noop,
  qt as normalize,
  Ca as randomID,
  Ma as resetThreeObjects,
  ft as round,
  Ti as theatreEditorApp,
  jt as totalThreeObjects
};
