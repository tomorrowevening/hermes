import { EventDispatcher as ln, Texture as un, CubeTexture as Yn, RepeatWrapping as Yt, Color as pt, FrontSide as Hn, BackSide as dn, DoubleSide as hn, NoBlending as Gn, NormalBlending as Wn, AdditiveBlending as Vn, SubtractiveBlending as qn, MultiplyBlending as Xn, CustomBlending as Kn, AddEquation as Zn, SubtractEquation as Jn, ReverseSubtractEquation as Qn, MinEquation as ei, MaxEquation as ti, ZeroFactor as fn, OneFactor as pn, SrcColorFactor as mn, OneMinusSrcColorFactor as gn, SrcAlphaFactor as vn, OneMinusSrcAlphaFactor as yn, DstAlphaFactor as bn, OneMinusDstAlphaFactor as xn, DstColorFactor as En, OneMinusDstColorFactor as Cn, SrcAlphaSaturateFactor as ni, ConstantColorFactor as Sn, OneMinusConstantColorFactor as wn, ConstantAlphaFactor as On, OneMinusConstantAlphaFactor as _n, Matrix4 as ii, Vector3 as J, Euler as ai, Line as ri, BufferGeometry as Ht, Float32BufferAttribute as Gt, LineBasicMaterial as si, Mesh as Mn, MeshBasicMaterial as Tn, Ray as oi, Plane as ci, MathUtils as li, MOUSE as it, TOUCH as at, Quaternion as Wt, Spherical as Vt, Vector2 as me, ShaderMaterial as Pn, GLSL3 as ui, PlaneGeometry as di, Scene as hi, Group as fi, AxesHelper as qt, MeshDepthMaterial as pi, MeshNormalMaterial as mi, WebGLRenderer as gi, PerspectiveCamera as At, Raycaster as vi, OrthographicCamera as Xt, CameraHelper as yi, SpotLightHelper as bi, PointLightHelper as xi, HemisphereLightHelper as Ei, DirectionalLightHelper as Ci } from "three";
import { Pane as Si } from "tweakpane";
import * as wi from "@tweakpane/plugin-essentials";
import Rn, { useState as ie, useRef as pe, useEffect as ke, forwardRef as Oi, useMemo as ye } from "react";
import { Reorder as An } from "framer-motion";
const kn = () => {
}, _a = () => {
};
function Je(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Ze(t, n, i) {
  return Math.min(n, Math.max(t, i));
}
function Kt(t, n, i) {
  return (i - t) / (n - t);
}
function Zt(t, n, i) {
  return t * (1 - i) + n * i;
}
function Ma(t, n) {
  const i = t - n;
  return Math.sqrt(i * i);
}
function _i() {
  return Math.round(Math.random() * 1e6).toString();
}
function Mi(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function Ti(t) {
  const n = Math.round(t.r * 255), i = Math.round(t.g * 255), e = Math.round(t.b * 255), r = (u) => {
    const h = u.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, a = r(n), l = r(i), c = r(e);
  return "#" + a + l + c;
}
function mt(t, n = 1) {
  return Number(t.toFixed(n));
}
let Nt = 0;
const Pi = () => {
  Nt = 0;
}, Dn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Nt}`, Nt++), t.parent !== null && t.parent.uuid.length > 0 && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((i) => {
    Dn(i);
  });
}, Ta = (t) => {
  t?.dispose();
}, Ri = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, jn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : jn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), Ri(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Pa {
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
  constructor(n, i, e = !0) {
    this._appID = n, this._debugEnabled = i, i && (this._useBC = e, e ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(n, i) {
    this.components.set(n, i);
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
const F = new ln(), U = {
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
class _t {
  app;
  constructor(n) {
    this.app = n;
  }
  dispose() {
  }
  handleApp(n, i, e) {
  }
  handleEditor(n, i, e) {
  }
}
class Ra extends _t {
  selectDropdown(n, i) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: n,
        value: i
      }
    });
  }
  updateDropdown(n, i) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: n,
        value: i
      }
    });
  }
  handleApp(n, i, e) {
    switch (e.event) {
      case "selectComponent":
        F.dispatchEvent({ type: U.SELECT_DROPDOWN, value: e.data });
        break;
      case "draggableListUpdate":
        F.dispatchEvent({ type: U.DRAG_UPDATE, value: e.data });
        break;
    }
  }
}
class Bt extends _t {
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
    let i = this.sheets.get(n);
    return i !== void 0 || (i = this.project?.sheet(n), this.sheets.set(n, i)), i;
  }
  playSheet(n, i) {
    this.sheet(n)?.sequence.play(i), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: n,
        value: i
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
    this.sheetObjects.forEach((i, e) => {
      e.search(`${n}_`) > -1 && this.unsubscribe(i);
    });
  }
  sheetObject(n, i, e, r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = this.sheet(n);
    if (a === void 0)
      return;
    const l = `${n}_${i}`;
    let c = this.sheetObjects.get(l);
    c !== void 0 ? c = a.object(i, { ...e, ...c.value }, { reconfigure: !0 }) : c = a.object(i, e), this.sheetObjects.set(l, c), this.sheetObjectCBs.set(l, r !== void 0 ? r : kn);
    const u = c.onValuesChange((h) => {
      if (this.app.editor) {
        for (const f in h) {
          const y = h[f];
          typeof y == "object" && Mi(y) && (h[f] = {
            r: y.r,
            g: y.g,
            b: y.b,
            a: y.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: n,
            sheetObject: l,
            values: h
          }
        });
      }
      const p = this.sheetObjectCBs.get(l);
      p !== void 0 && p(h);
    });
    return this.sheetObjectUnsubscribe.set(l, u), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const i = n.address.sheetId, e = n.address.objectKey;
    this.sheets.get(i)?.detachObject(e);
    const a = `${i}_${e}`, l = this.sheetObjectUnsubscribe.get(a);
    l !== void 0 && (this.sheetObjects.delete(a), this.sheetObjectCBs.delete(a), this.sheetObjectUnsubscribe.delete(a), l());
  }
  handleApp(n, i, e) {
    const r = i;
    let a;
    switch (e.event) {
      case "setSheet":
        a = r.sheets.get(e.data.sheet), a !== void 0 && (r.activeSheet = a, this.studio?.setSelection([a]));
        break;
      case "setSheetObject":
        a = r.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), a !== void 0 && this.studio?.setSelection([a]);
        break;
      case "updateSheetObject":
        a = r.sheets.get(e.data.sheet), a !== void 0 && a.sequence.pause(), a = r.sheetObjectCBs.get(e.data.sheetObject), a !== void 0 && a(e.data.values);
        break;
      case "updateTimeline":
        a = r.sheets.get(e.data.sheet), r.activeSheet !== void 0 && (r.activeSheet.sequence.position = e.data.position);
        break;
    }
  }
  handleEditor(n, i, e) {
    if (n.editor) {
      const r = i;
      switch (e.event) {
        case "playSheet":
          r.sheet(e.data.sheet)?.sequence.play(e.data.value);
          break;
        case "pauseSheet":
          r.sheet(e.data.sheet)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(n, i) {
    if (n.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((l) => {
        l.length < 1 || l.forEach((c) => {
          let u = c.address.sheetId, h = "setSheet", p = {};
          switch (c.type) {
            case "Theatre_Sheet_PublicAPI":
              h = "setSheet", p = {
                sheet: c.address.sheetId
              }, i.activeSheet = i.sheets.get(c.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              h = "setSheetObject", u += `_${c.address.objectKey}`, p = {
                id: u,
                sheet: c.address.sheetId,
                key: c.address.objectKey
              }, i.activeSheet = i.sheets.get(c.address.sheetId);
              break;
          }
          n.send({ event: h, target: "app", data: p });
        });
      });
      let e = -1;
      const r = () => {
        if (Bt.rafDriver?.tick(performance.now()), i.activeSheet !== void 0 && e !== i.activeSheet.sequence.position) {
          e = i.activeSheet.sequence.position;
          const l = i.activeSheet;
          n.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: e,
              sheet: l.address.sheetId
            }
          });
        }
      }, a = () => {
        r(), requestAnimationFrame(a);
      };
      r(), a();
    } else
      this.studio?.ui.hide();
  }
}
function Aa(t, n, i) {
  if (t.editor) {
    i.ui.restore(), i.onSelectionChange((l) => {
      l.length < 1 || l.forEach((c) => {
        let u = c.address.sheetId, h = "setSheet", p = {};
        switch (c.type) {
          case "Theatre_Sheet_PublicAPI":
            h = "setSheet", p = {
              sheet: c.address.sheetId
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            h = "setSheetObject", u += `_${c.address.objectKey}`, p = {
              id: u,
              sheet: c.address.sheetId,
              key: c.address.objectKey
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
        }
        t.send({ event: h, target: "app", data: p });
      });
    });
    let e = -1;
    const r = () => {
      if (Bt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && e !== n.activeSheet.sequence.position) {
        e = n.activeSheet.sequence.position;
        const l = n.activeSheet;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: e,
            sheet: l.address.sheetId
          }
        });
      }
    }, a = () => {
      r(), requestAnimationFrame(a);
    };
    r(), a();
  } else
    i.ui.hide();
}
function Ai(t) {
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
function In(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((i) => {
    n.children.push(In(i));
  }), n;
}
function ki(t) {
  const n = {};
  for (const i in t) {
    const e = t[i].value;
    n[i] = { value: e }, e === null ? n[i].value = { src: "" } : e.isTexture && (n[i].value = { src: e.image.src });
  }
  return n;
}
function Di(t) {
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
function rt(t) {
  const n = {};
  for (const i in t) {
    if (i.substring(0, 1) === "_" || i.substring(0, 2) === "is" || Di(i))
      continue;
    const e = typeof t[i], r = t[i];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[i] = r;
        break;
      case "object":
        if (r !== null)
          if (n[i] = r, r.isTexture)
            if (r instanceof un) {
              const a = r.source.toJSON();
              n[i] = { src: a.url };
            } else
              r instanceof Yn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[i] = { src: "" });
          else
            i === "uniforms" && (n[i] = ki(n[i]));
        else
          n[i] = { src: "" };
        break;
    }
  }
  return n;
}
function kt(t) {
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
  const i = t.type.toLowerCase();
  if (i.search("mesh") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((a) => {
        r.push(rt(a));
      }), n.material = r;
    } else
      n.material = rt(e.material);
  } else if (i.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((a) => {
        r.push(rt(a));
      }), n.material = r;
    } else
      n.material = rt(e.material);
  } else if (i.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const r = [];
      e.material.forEach((a) => {
        r.push(rt(a));
      }), n.material = r;
    } else
      n.material = rt(e.material);
  } else
    i.search("camera") > -1 ? t.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
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
    }) : i.search("light") > -1 && (n.lightInfo = {
      color: t.color,
      intensity: t.intensity,
      decay: t.decay,
      distance: t.distance,
      angle: t.angle,
      penumbra: t.penumbra,
      groundColor: t.groundColor,
      width: t.width,
      height: t.height
    });
  return n;
}
function ji(t, n) {
  const i = n.split(".");
  switch (i.length) {
    case 1:
      return t[i[0]];
    case 2:
      return t[i[0]][i[1]];
    case 3:
      return t[i[0]][i[1]][i[2]];
    case 4:
      return t[i[0]][i[1]][i[2]][i[3]];
    case 5:
      return t[i[0]][i[1]][i[2]][i[3]][i[4]];
    case 6:
      return t[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]];
  }
}
function O(t, n, i) {
  const e = n.split(".");
  switch (e.length) {
    case 1:
      t[e[0]] = i;
      break;
    case 2:
      t[e[0]][e[1]] = i;
      break;
    case 3:
      t[e[0]][e[1]][e[2]] = i;
      break;
    case 4:
      t[e[0]][e[1]][e[2]][e[3]] = i;
      break;
    case 5:
      t[e[0]][e[1]][e[2]][e[3]][e[4]] = i;
      break;
  }
}
function wt(t) {
  return new Promise((n, i) => {
    const e = new Image();
    e.onload = () => {
      const r = new un(e);
      r.wrapS = Yt, r.wrapT = Yt, r.needsUpdate = !0, n(r);
    }, e.onerror = i, e.src = t;
  });
}
class ka extends _t {
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
    const i = kt(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: i
    });
  }
  requestMethod(n, i, e, r) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: i,
        value: e,
        subitem: r
      }
    });
  }
  updateObject(n, i, e) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: n,
        key: i,
        value: e
      }
    });
  }
  createTexture(n, i, e) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: n,
        key: i,
        value: e
      }
    });
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    Pi(), Dn(this.scene);
    const i = In(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: i
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const i = kt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: i
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const i = kt(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: i
    });
  }
  handleApp(n, i, e) {
    switch (e.event) {
      case "getObject":
        F.dispatchEvent({ type: U.GET_OBJECT, value: e.data });
        break;
      case "updateObject":
        F.dispatchEvent({ type: U.UPDATE_OBJECT, value: e.data });
        break;
      case "createTexture":
        F.dispatchEvent({ type: U.CREATE_TEXTURE, value: e.data });
        break;
      case "requestMethod":
        F.dispatchEvent({ type: U.REQUEST_METHOD, value: e.data });
        break;
    }
  }
  handleEditor(n, i, e) {
    switch (e.event) {
      case "setObject":
        F.dispatchEvent({ type: U.SET_OBJECT, value: e.data });
        break;
      case "setScene":
        F.dispatchEvent({ type: U.SET_SCENE, value: e.data });
        break;
      case "addCamera":
        F.dispatchEvent({ type: U.ADD_CAMERA, value: e.data });
        break;
      case "removeCamera":
        F.dispatchEvent({ type: U.REMOVE_CAMERA, value: e.data });
        break;
    }
  }
  // Renderer
  resize(n, i) {
    this.renderer?.setSize(n, i);
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
class Da extends _t {
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
    this.pane = new Si({ title: "GUI" }), this.pane.registerPlugin(wi);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(n, i = void 0, e = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addFolder({
        title: n,
        ...i
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: n,
        params: i,
        parent: e
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(n, i, e, r = void 0) {
    const a = this.bindID, l = e.onChange !== void 0 ? e.onChange : kn;
    this.bindCBs.set(a, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addBinding(n, i, e).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: a,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: a,
        name: i,
        params: e,
        parent: r
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, i) {
    const e = this.bindCBs.get(n);
    e !== void 0 ? e(i) : console.warn(`No callback for: ${n}`, i);
  }
  // Buttons
  button(n, i, e = void 0) {
    const r = this.bindID;
    this.buttonCBs.set(r, i), this.app.editor ? (this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addButton({ title: n }).on("click", () => {
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
        callback: i,
        parent: e
      }
    }), this.appCallbacks++);
  }
  triggerButton(n) {
    const i = this.buttonCBs.get(n);
    i !== void 0 && i();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const n = this.inspectorFolder.children.length - 1;
    for (let i = n; i > -1; --i)
      this.inspectorFolder.remove(this.inspectorFolder.children[i]);
  }
  handleApp(n, i, e) {
    const r = i;
    switch (e.event) {
      case "addFolder":
        r.addFolder(e.data.name, e.data.params, e.data.parent);
        break;
      case "bindObject":
        r.bind(e.data.name, e.data.params, e.data.parent);
        break;
      case "updateBind":
        r.triggerBind(e.data.id, e.data.value);
        break;
      case "addButton":
        r.button(e.data.name, e.data.callback, e.data.parent);
        break;
      case "clickButton":
        r.triggerButton(e.data.id);
        break;
    }
  }
}
var $t = { exports: {} }, ut = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jt;
function Ii() {
  if (Jt)
    return ut;
  Jt = 1;
  var t = Rn, n = Symbol.for("react.element"), i = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(c, u, h) {
    var p, f = {}, y = null, V = null;
    h !== void 0 && (y = "" + h), u.key !== void 0 && (y = "" + u.key), u.ref !== void 0 && (V = u.ref);
    for (p in u)
      e.call(u, p) && !a.hasOwnProperty(p) && (f[p] = u[p]);
    if (c && c.defaultProps)
      for (p in u = c.defaultProps, u)
        f[p] === void 0 && (f[p] = u[p]);
    return { $$typeof: n, type: c, key: y, ref: V, props: f, _owner: r.current };
  }
  return ut.Fragment = i, ut.jsx = l, ut.jsxs = l, ut;
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
var Qt;
function Li() {
  return Qt || (Qt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Rn, n = Symbol.for("react.element"), i = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), S = Symbol.iterator, A = "@@iterator";
    function k(s) {
      if (s === null || typeof s != "object")
        return null;
      var m = S && s[S] || s[A];
      return typeof m == "function" ? m : null;
    }
    var E = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(s) {
      {
        for (var m = arguments.length, b = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
          b[w - 1] = arguments[w];
        I("error", s, b);
      }
    }
    function I(s, m, b) {
      {
        var w = E.ReactDebugCurrentFrame, z = w.getStackAddendum();
        z !== "" && (m += "%s", b = b.concat([z]));
        var G = b.map(function(L) {
          return String(L);
        });
        G.unshift("Warning: " + m), Function.prototype.apply.call(console[s], console, G);
      }
    }
    var q = !1, te = !1, ge = !1, K = !1, ve = !1, ue;
    ue = Symbol.for("react.module.reference");
    function Me(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === e || s === a || ve || s === r || s === h || s === p || K || s === V || q || te || ge || typeof s == "object" && s !== null && (s.$$typeof === y || s.$$typeof === f || s.$$typeof === l || s.$$typeof === c || s.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === ue || s.getModuleId !== void 0));
    }
    function Te(s, m, b) {
      var w = s.displayName;
      if (w)
        return w;
      var z = m.displayName || m.name || "";
      return z !== "" ? b + "(" + z + ")" : b;
    }
    function be(s) {
      return s.displayName || "Context";
    }
    function $(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case e:
          return "Fragment";
        case i:
          return "Portal";
        case a:
          return "Profiler";
        case r:
          return "StrictMode";
        case h:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case c:
            var m = s;
            return be(m) + ".Consumer";
          case l:
            var b = s;
            return be(b._context) + ".Provider";
          case u:
            return Te(s, s.render, "ForwardRef");
          case f:
            var w = s.displayName || null;
            return w !== null ? w : $(s.type) || "Memo";
          case y: {
            var z = s, G = z._payload, L = z._init;
            try {
              return $(L(G));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var xe = Object.assign, _ = 0, we, Pe, De, Re, Ae, je, $e;
    function Be() {
    }
    Be.__reactDisabledLog = !0;
    function ae() {
      {
        if (_ === 0) {
          we = console.log, Pe = console.info, De = console.warn, Re = console.error, Ae = console.group, je = console.groupCollapsed, $e = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: Be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        _++;
      }
    }
    function Oe() {
      {
        if (_--, _ === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: xe({}, s, {
              value: we
            }),
            info: xe({}, s, {
              value: Pe
            }),
            warn: xe({}, s, {
              value: De
            }),
            error: xe({}, s, {
              value: Re
            }),
            group: xe({}, s, {
              value: Ae
            }),
            groupCollapsed: xe({}, s, {
              value: je
            }),
            groupEnd: xe({}, s, {
              value: $e
            })
          });
        }
        _ < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var He = E.ReactCurrentDispatcher, Ge;
    function he(s, m, b) {
      {
        if (Ge === void 0)
          try {
            throw Error();
          } catch (z) {
            var w = z.stack.trim().match(/\n( *(at )?)/);
            Ge = w && w[1] || "";
          }
        return `
` + Ge + s;
      }
    }
    var g = !1, v;
    {
      var M = typeof WeakMap == "function" ? WeakMap : Map;
      v = new M();
    }
    function N(s, m) {
      if (!s || g)
        return "";
      {
        var b = v.get(s);
        if (b !== void 0)
          return b;
      }
      var w;
      g = !0;
      var z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var G;
      G = He.current, He.current = null, ae();
      try {
        if (m) {
          var L = function() {
            throw Error();
          };
          if (Object.defineProperty(L.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(L, []);
            } catch (Le) {
              w = Le;
            }
            Reflect.construct(s, [], L);
          } else {
            try {
              L.call();
            } catch (Le) {
              w = Le;
            }
            s.call(L.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Le) {
            w = Le;
          }
          s();
        }
      } catch (Le) {
        if (Le && w && typeof Le.stack == "string") {
          for (var j = Le.stack.split(`
`), fe = w.stack.split(`
`), ee = j.length - 1, ne = fe.length - 1; ee >= 1 && ne >= 0 && j[ee] !== fe[ne]; )
            ne--;
          for (; ee >= 1 && ne >= 0; ee--, ne--)
            if (j[ee] !== fe[ne]) {
              if (ee !== 1 || ne !== 1)
                do
                  if (ee--, ne--, ne < 0 || j[ee] !== fe[ne]) {
                    var Se = `
` + j[ee].replace(" at new ", " at ");
                    return s.displayName && Se.includes("<anonymous>") && (Se = Se.replace("<anonymous>", s.displayName)), typeof s == "function" && v.set(s, Se), Se;
                  }
                while (ee >= 1 && ne >= 0);
              break;
            }
        }
      } finally {
        g = !1, He.current = G, Oe(), Error.prepareStackTrace = z;
      }
      var nt = s ? s.displayName || s.name : "", zt = nt ? he(nt) : "";
      return typeof s == "function" && v.set(s, zt), zt;
    }
    function re(s, m, b) {
      return N(s, !1);
    }
    function P(s) {
      var m = s.prototype;
      return !!(m && m.isReactComponent);
    }
    function T(s, m, b) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return N(s, P(s));
      if (typeof s == "string")
        return he(s);
      switch (s) {
        case h:
          return he("Suspense");
        case p:
          return he("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case u:
            return re(s.render);
          case f:
            return T(s.type, m, b);
          case y: {
            var w = s, z = w._payload, G = w._init;
            try {
              return T(G(z), m, b);
            } catch {
            }
          }
        }
      return "";
    }
    var B = Object.prototype.hasOwnProperty, se = {}, oe = E.ReactDebugCurrentFrame;
    function D(s) {
      if (s) {
        var m = s._owner, b = T(s.type, s._source, m ? m.type : null);
        oe.setExtraStackFrame(b);
      } else
        oe.setExtraStackFrame(null);
    }
    function H(s, m, b, w, z) {
      {
        var G = Function.call.bind(B);
        for (var L in s)
          if (G(s, L)) {
            var j = void 0;
            try {
              if (typeof s[L] != "function") {
                var fe = Error((w || "React class") + ": " + b + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw fe.name = "Invariant Violation", fe;
              }
              j = s[L](m, L, w, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ee) {
              j = ee;
            }
            j && !(j instanceof Error) && (D(z), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", b, L, typeof j), D(null)), j instanceof Error && !(j.message in se) && (se[j.message] = !0, D(z), C("Failed %s type: %s", b, j.message), D(null));
          }
      }
    }
    var Q = Array.isArray;
    function Ie(s) {
      return Q(s);
    }
    function et(s) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, b = m && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return b;
      }
    }
    function gt(s) {
      try {
        return vt(s), !1;
      } catch {
        return !0;
      }
    }
    function vt(s) {
      return "" + s;
    }
    function yt(s) {
      if (gt(s))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", et(s)), vt(s);
    }
    var Fe = E.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ct, bt, tt;
    tt = {};
    function Mt(s) {
      if (B.call(s, "ref")) {
        var m = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Tt(s) {
      if (B.call(s, "key")) {
        var m = Object.getOwnPropertyDescriptor(s, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function xt(s, m) {
      if (typeof s.ref == "string" && Fe.current && m && Fe.current.stateNode !== m) {
        var b = $(Fe.current.type);
        tt[b] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(Fe.current.type), s.ref), tt[b] = !0);
      }
    }
    function Ue(s, m) {
      {
        var b = function() {
          ct || (ct = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        b.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function Ut(s, m) {
      {
        var b = function() {
          bt || (bt = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        b.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var o = function(s, m, b, w, z, G, L) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: m,
        ref: b,
        props: L,
        // Record the component responsible for creating this element.
        _owner: G
      };
      return j._store = {}, Object.defineProperty(j._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(j, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(j, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    };
    function x(s, m, b, w, z) {
      {
        var G, L = {}, j = null, fe = null;
        b !== void 0 && (yt(b), j = "" + b), Tt(m) && (yt(m.key), j = "" + m.key), Mt(m) && (fe = m.ref, xt(m, z));
        for (G in m)
          B.call(m, G) && !ot.hasOwnProperty(G) && (L[G] = m[G]);
        if (s && s.defaultProps) {
          var ee = s.defaultProps;
          for (G in ee)
            L[G] === void 0 && (L[G] = ee[G]);
        }
        if (j || fe) {
          var ne = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          j && Ue(L, ne), fe && Ut(L, ne);
        }
        return o(s, j, fe, z, w, Fe.current, L);
      }
    }
    var R = E.ReactCurrentOwner, Y = E.ReactDebugCurrentFrame;
    function Z(s) {
      if (s) {
        var m = s._owner, b = T(s.type, s._source, m ? m.type : null);
        Y.setExtraStackFrame(b);
      } else
        Y.setExtraStackFrame(null);
    }
    var Ee;
    Ee = !1;
    function de(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function Pt() {
      {
        if (R.current) {
          var s = $(R.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function Rt(s) {
      {
        if (s !== void 0) {
          var m = s.fileName.replace(/^.*[\\\/]/, ""), b = s.lineNumber;
          return `

Check your code at ` + m + ":" + b + ".";
        }
        return "";
      }
    }
    var lt = {};
    function _e(s) {
      {
        var m = Pt();
        if (!m) {
          var b = typeof s == "string" ? s : s.displayName || s.name;
          b && (m = `

Check the top-level render call using <` + b + ">.");
        }
        return m;
      }
    }
    function Ce(s, m) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var b = _e(m);
        if (lt[b])
          return;
        lt[b] = !0;
        var w = "";
        s && s._owner && s._owner !== R.current && (w = " It was passed a child from " + $(s._owner.type) + "."), Z(s), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, w), Z(null);
      }
    }
    function We(s, m) {
      {
        if (typeof s != "object")
          return;
        if (Ie(s))
          for (var b = 0; b < s.length; b++) {
            var w = s[b];
            de(w) && Ce(w, m);
          }
        else if (de(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var z = k(s);
          if (typeof z == "function" && z !== s.entries)
            for (var G = z.call(s), L; !(L = G.next()).done; )
              de(L.value) && Ce(L.value, m);
        }
      }
    }
    function Ve(s) {
      {
        var m = s.type;
        if (m == null || typeof m == "string")
          return;
        var b;
        if (typeof m == "function")
          b = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === f))
          b = m.propTypes;
        else
          return;
        if (b) {
          var w = $(m);
          H(b, s.props, "prop", w, s);
        } else if (m.PropTypes !== void 0 && !Ee) {
          Ee = !0;
          var z = $(m);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", z || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qe(s) {
      {
        for (var m = Object.keys(s.props), b = 0; b < m.length; b++) {
          var w = m[b];
          if (w !== "children" && w !== "key") {
            Z(s), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), Z(null);
            break;
          }
        }
        s.ref !== null && (Z(s), C("Invalid attribute `ref` supplied to `React.Fragment`."), Z(null));
      }
    }
    function Xe(s, m, b, w, z, G) {
      {
        var L = Me(s);
        if (!L) {
          var j = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var fe = Rt(z);
          fe ? j += fe : j += Pt();
          var ee;
          s === null ? ee = "null" : Ie(s) ? ee = "array" : s !== void 0 && s.$$typeof === n ? (ee = "<" + ($(s.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : ee = typeof s, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ee, j);
        }
        var ne = x(s, m, b, z, G);
        if (ne == null)
          return ne;
        if (L) {
          var Se = m.children;
          if (Se !== void 0)
            if (w)
              if (Ie(Se)) {
                for (var nt = 0; nt < Se.length; nt++)
                  We(Se[nt], s);
                Object.freeze && Object.freeze(Se);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              We(Se, s);
        }
        return s === e ? qe(ne) : Ve(ne), ne;
      }
    }
    function Bn(s, m, b) {
      return Xe(s, m, b, !0);
    }
    function Fn(s, m, b) {
      return Xe(s, m, b, !1);
    }
    var Un = Fn, zn = Bn;
    dt.Fragment = e, dt.jsx = Un, dt.jsxs = zn;
  }()), dt;
}
process.env.NODE_ENV === "production" ? $t.exports = Ii() : $t.exports = Li();
var d = $t.exports;
function Ln(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ d.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ d.jsx("button", { children: t.title });
}
const Ni = /* @__PURE__ */ d.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ d.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), $i = /* @__PURE__ */ d.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ d.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Bi(t) {
  return /* @__PURE__ */ d.jsx(An.Item, { value: t.title, children: /* @__PURE__ */ d.jsxs("div", { children: [
    $i,
    /* @__PURE__ */ d.jsx("span", { children: t.title }),
    /* @__PURE__ */ d.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ni })
  ] }) }, t.title);
}
function Fi(t) {
  const [n, i] = ie(!1), [e, r] = ie(t.options), a = (h) => {
    t.onDragComplete(h), r(h);
  }, l = (h) => {
    const p = [...e];
    p.splice(h, 1), a(p);
  }, c = [];
  e.forEach((h, p) => {
    c.push(/* @__PURE__ */ d.jsx(Bi, { index: p, title: h, onDelete: l }, h));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ d.jsxs("div", { className: u, onMouseEnter: () => i(!0), onMouseLeave: () => i(!1), children: [
    /* @__PURE__ */ d.jsx(Ln, { title: t.title }),
    /* @__PURE__ */ d.jsx(An.Group, { axis: "y", values: e, onReorder: a, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Ui(t) {
  const [n, i] = ie(!1), e = [];
  t.options.map((a, l) => {
    t.onSelect !== void 0 && (a.onSelect = t.onSelect), e.push(/* @__PURE__ */ d.jsx(zi, { option: a }, l));
  });
  let r = "dropdown";
  return t.subdropdown && (r += " subdropdown"), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      children: [
        /* @__PURE__ */ d.jsx(Ln, { title: t.title }),
        /* @__PURE__ */ d.jsx(
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
function zi(t) {
  const { option: n } = t, [i, e] = ie("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ d.jsx(
        Fi,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (a) => {
            n.onDragComplete !== void 0 && n.onDragComplete(a);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      r = /* @__PURE__ */ d.jsx(
        Ui,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      r = /* @__PURE__ */ d.jsx(
        "button",
        {
          onClick: () => {
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (i !== n.title ? e(n.title) : e(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ d.jsx("li", { className: i === n.title ? "selected" : "", children: r }, _i());
}
function ja(t, n, i) {
  function e(a) {
    switch (n.forEach((l) => {
      l.callback(t, l.remote, a);
    }), a.event) {
      case "custom":
        F.dispatchEvent({ type: U.CUSTOM, value: a.data });
        break;
    }
  }
  function r(a) {
    switch (i.forEach((l) => {
      l.callback(t, l.remote, a);
    }), a.event) {
      case "custom":
        F.dispatchEvent({ type: U.CUSTOM, value: a.data });
        break;
    }
  }
  t.listen = (a) => {
    a.target === "editor" ? r(a) : e(a);
  };
}
function Ft(t) {
  const [n, i] = ie(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ d.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          t.onToggle !== void 0 && t.onToggle(r), i(r);
        },
        children: [
          /* @__PURE__ */ d.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "label", children: Je(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ d.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { children: t.children }) })
  ] });
}
function Nn(t) {
  const [n, i] = ie(!1), e = t.child !== void 0 && t.child.children.length > 0, r = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((a) => {
    r.push(/* @__PURE__ */ d.jsx(Nn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ d.jsx(d.Fragment, { children: t.child !== void 0 && /* @__PURE__ */ d.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "child", children: [
      e ? /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            i(!n);
          }
        }
      ) : null,
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "name",
          style: {
            left: e ? "20px" : "5px"
          },
          onClick: () => {
            t.child !== void 0 && (t.three.getObject(t.child.uuid), n || i(!0));
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: `icon ${Ai(t.child)}` })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function Yi(t) {
  const n = [];
  return t.child?.children.map((i) => {
    n.push(/* @__PURE__ */ d.jsx(Nn, { child: i, three: t.three }, Math.random()));
  }), /* @__PURE__ */ d.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Hi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Gi(t) {
  return "items" in t;
}
function Qe(t) {
  const n = [];
  return t.items.forEach((i) => {
    Gi(i) ? n.push(
      /* @__PURE__ */ d.jsx(Qe, { title: Je(i.title), items: i.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ d.jsx(
        ft,
        {
          title: i.title,
          prop: i.prop,
          value: i.value,
          type: i.type,
          min: i.min,
          max: i.max,
          step: i.step,
          disabled: i.disabled,
          options: i.options,
          onChange: (e, r) => {
            i.onChange !== void 0 && i.onChange(e, r);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ d.jsx(Ft, { label: t.title, open: t.expanded === !0, children: n });
}
function Wi(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendAlpha" || t === "blendColor" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function W(t) {
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
function Vi(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function qi() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, i) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        i();
      else {
        const e = t.files[0], r = new FileReader();
        r.onload = function(a) {
          n(a.target.result);
        }, r.readAsDataURL(e);
      }
    }), t.click();
  });
}
const Xi = [
  {
    title: "Front",
    value: Hn
  },
  {
    title: "Back",
    value: dn
  },
  {
    title: "Double",
    value: hn
  }
], Ki = [
  {
    title: "No Blending",
    value: Gn
  },
  {
    title: "Normal",
    value: Wn
  },
  {
    title: "Additive",
    value: Vn
  },
  {
    title: "Subtractive",
    value: qn
  },
  {
    title: "Multiply",
    value: Xn
  },
  {
    title: "Custom",
    value: Kn
  }
], Zi = [
  {
    title: "Add",
    value: Zn
  },
  {
    title: "Subtract",
    value: Jn
  },
  {
    title: "Reverse Subtract",
    value: Qn
  },
  {
    title: "Min",
    value: ei
  },
  {
    title: "Max",
    value: ti
  }
], Ji = [
  {
    title: "Zero",
    valye: fn
  },
  {
    title: "One",
    valye: pn
  },
  {
    title: "Src Color",
    valye: mn
  },
  {
    title: "One Minus Src Color",
    valye: gn
  },
  {
    title: "Src Alpha",
    valye: vn
  },
  {
    title: "One Minus Src Alpha",
    valye: yn
  },
  {
    title: "Dst Alpha",
    valye: bn
  },
  {
    title: "One Minus Dst Alpha",
    valye: xn
  },
  {
    title: "Dst Color",
    valye: En
  },
  {
    title: "One Minus Dst Color",
    valye: Cn
  },
  {
    title: "Src Alpha Saturate",
    valye: ni
  },
  {
    title: "Constant Color",
    valye: Sn
  },
  {
    title: "One Minus Constant Color",
    valye: wn
  },
  {
    title: "Constant Alpha",
    valye: On
  },
  {
    title: "One Minus Constant Alpha",
    valye: _n
  }
], Qi = [
  {
    title: "Zero",
    valye: fn
  },
  {
    title: "One",
    valye: pn
  },
  {
    title: "Src Color",
    valye: mn
  },
  {
    title: "One Minus Src Color",
    valye: gn
  },
  {
    title: "Src Alpha",
    valye: vn
  },
  {
    title: "One Minus Src Alpha",
    valye: yn
  },
  {
    title: "Dst Alpha",
    valye: bn
  },
  {
    title: "One Minus Dst Alpha",
    valye: xn
  },
  {
    title: "Dst Color",
    valye: En
  },
  {
    title: "One Minus Dst Color",
    valye: Cn
  },
  {
    title: "Constant Color",
    valye: Sn
  },
  {
    title: "One Minus Constant Color",
    valye: wn
  },
  {
    title: "Constant Alpha",
    valye: On
  },
  {
    title: "One Minus Constant Alpha",
    valye: _n
  }
];
function ht(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function ea(t, n, i, e) {
  return {
    type: "boolean",
    title: W(t),
    prop: t,
    value: n,
    needsUpdate: !0,
    onChange: (r, a) => {
      e.updateObject(i.uuid, `material.${t}`, a), e.updateObject(i.uuid, "material.needsUpdate", !0);
      const l = e.scene?.getObjectByProperty("uuid", i.uuid);
      l !== void 0 && O(l, `material.${t}`, a);
    }
  };
}
function ta(t, n, i, e) {
  const r = {
    type: "number",
    title: W(t),
    prop: t,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (a, l) => {
      e.updateObject(i.uuid, `material.${t}`, l), e.updateObject(i.uuid, "material.needsUpdate", !0);
      const c = e.scene?.getObjectByProperty("uuid", i.uuid);
      c !== void 0 && O(c, `material.${t}`, l);
    }
  };
  switch (t) {
    case "blending":
      ht(r, Ki);
      break;
    case "blendDst":
      ht(r, Qi);
      break;
    case "blendEquation":
      ht(r, Zi);
      break;
    case "blendSrc":
      ht(r, Ji);
      break;
    case "side":
      ht(r, Xi);
      break;
  }
  return Vi(t) && (r.value = Number(n), r.type = "range", r.min = 0, r.max = 1, r.step = 0.01), r;
}
function na(t, n, i, e) {
  const r = {
    type: "string",
    title: W(t),
    prop: t,
    value: n,
    needsUpdate: !0,
    onChange: (l, c) => {
      e.updateObject(i.uuid, `material.${t}`, c), e.updateObject(i.uuid, "material.needsUpdate", !0);
      const u = e.scene?.getObjectByProperty("uuid", i.uuid);
      u !== void 0 && O(u, `material.${t}`, c);
    }
  };
  return (t === "vertexShader" || t === "fragmentShader") && (r.disabled = !1, r.latest = r.value, r.onChange = (l, c) => {
    r.latest = c;
  }), r;
}
function Dt(t) {
  return t.x !== void 0 && t.y !== void 0 && t.z === void 0;
}
function jt(t) {
  return t.x !== void 0 && t.y !== void 0 && t.z !== void 0 && t.w === void 0;
}
function en(t) {
  return t.x !== void 0 && t.y !== void 0 && t.z !== void 0 && t.w !== void 0;
}
function ia(t, n, i, e) {
  const r = [];
  if (n.isColor)
    return {
      title: W(t),
      prop: t,
      type: "color",
      value: n,
      onChange: (a, l) => {
        const c = new pt(l);
        e.updateObject(i.uuid, `material.${t}`, c);
        const u = e.scene?.getObjectByProperty("uuid", i.uuid);
        u !== void 0 && O(u, `material.${t}`, c);
      }
    };
  if (Array.isArray(n)) {
    for (const a in n)
      r.push({
        title: `${a}`,
        type: `${typeof n[a]}`,
        value: n[a],
        onChange: (l, c) => {
          e.updateObject(i.uuid, `material.${t}`, c);
          const u = e.scene?.getObjectByProperty("uuid", i.uuid);
          u !== void 0 && O(u, `material.${t}`, c);
        }
      });
    return {
      title: W(t),
      items: r
    };
  } else {
    if (Dt(n))
      return {
        title: W(t),
        prop: t,
        type: "vector",
        value: n,
        onChange: (a, l) => {
          e.updateObject(i.uuid, `material.${t}`, l);
          const c = e.scene?.getObjectByProperty("uuid", i.uuid);
          c !== void 0 && O(c, `material.${t}`, l);
        }
      };
    if (jt(n)) {
      const a = [
        {
          title: "X",
          prop: t,
          type: "number",
          value: n,
          step: 0.01,
          onChange: (l, c) => {
            e.updateObject(i.uuid, `material.${t}.x`, c);
            const u = e.scene?.getObjectByProperty("uuid", i.uuid);
            u !== void 0 && O(u, `material.${t}.x`, c);
          }
        },
        {
          title: "Y",
          prop: t,
          type: "number",
          value: n,
          step: 0.01,
          onChange: (l, c) => {
            e.updateObject(i.uuid, `material.${t}.y`, c);
            const u = e.scene?.getObjectByProperty("uuid", i.uuid);
            u !== void 0 && O(u, `material.${t}.y`, c);
          }
        },
        {
          title: "Z",
          prop: t,
          type: "number",
          value: n,
          step: 0.01,
          onChange: (l, c) => {
            e.updateObject(i.uuid, `material.${t}.z`, c);
            const u = e.scene?.getObjectByProperty("uuid", i.uuid);
            u !== void 0 && O(u, `material.${t}.z`, c);
          }
        }
      ];
      return a.sort((l, c) => l.title < c.title ? -1 : l.title > c.title ? 1 : 0), {
        title: W(t),
        items: a
      };
    } else {
      if (n.src !== void 0)
        return {
          title: W(t),
          type: "image",
          value: n,
          onChange: (a, l) => {
            e.createTexture(i.uuid, `material.${a}`, l);
            const c = e.scene?.getObjectByProperty("uuid", i.uuid);
            c !== void 0 && wt(l).then((u) => {
              O(c, `material.${a}`, u), O(c, "material.needsUpdate", !0);
            });
          }
        };
      switch (t) {
        case "defines":
          for (const a in n)
            r.push({
              title: Je(`${a}`),
              type: "string",
              value: n[a].toString(),
              disabled: !0
            });
          if (r.length > 0)
            return {
              title: W(t),
              items: r
            };
          break;
        case "extensions":
          for (const a in n)
            r.push({
              title: Je(`${a}`),
              type: "boolean",
              value: n[a],
              disabled: !0
            });
          if (r.length > 0)
            return {
              title: W(t),
              items: r
            };
          break;
        case "uniforms":
          for (const a in n) {
            const l = n[a].value, c = typeof l;
            if (l.isColor)
              r.push({
                title: W(a),
                prop: a,
                type: "color",
                value: l,
                onChange: (u, h) => {
                  const p = new pt(h);
                  e.updateObject(i.uuid, `material.uniforms.${a}.value`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value`, p);
                }
              });
            else if (Array.isArray(l)) {
              const u = [];
              for (const h in l)
                u.push({
                  title: `${h}`,
                  type: `${typeof l[h]}`,
                  value: l[h],
                  onChange: (p, f) => {
                    e.updateObject(i.uuid, `material.uniforms.${a}.value.${h}`, f);
                    const y = e.scene?.getObjectByProperty("uuid", i.uuid);
                    y !== void 0 && O(y, `material.uniforms.${a}.value.${h}`, f);
                  }
                });
              r.push({
                title: W(a),
                items: u
              });
            } else if (Dt(l))
              r.push({
                title: `${W(a)}`,
                prop: a,
                type: "vector",
                value: l,
                onChange: (u, h) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value`, h);
                  const p = e.scene?.getObjectByProperty("uuid", i.uuid);
                  p !== void 0 && O(p, `material.uniforms.${a}.value`, h);
                }
              });
            else if (jt(l)) {
              const u = [];
              u.push({
                title: "X",
                prop: a,
                type: "number",
                value: l.x,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.x`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.x`, p);
                }
              }), u.push({
                title: "Y",
                prop: a,
                type: "number",
                value: l.y,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.y`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.y`, p);
                }
              }), u.push({
                title: "Z",
                prop: a,
                type: "number",
                value: l.z,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.z`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.z`, p);
                }
              }), r.push({
                title: W(a),
                items: u
              });
            } else if (en(l)) {
              const u = [];
              u.push({
                title: "X",
                prop: a,
                type: "number",
                value: l.x,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.x`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.x`, p);
                }
              }), u.push({
                title: "Y",
                prop: a,
                type: "number",
                value: l.y,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.y`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.y`, p);
                }
              }), u.push({
                title: "Z",
                prop: a,
                type: "number",
                value: l.z,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.z`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.z`, p);
                }
              }), u.push({
                title: "W",
                prop: a,
                type: "number",
                value: l.w,
                step: 0.01,
                onChange: (h, p) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value.w`, p);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && O(f, `material.uniforms.${a}.value.w`, p);
                }
              }), r.push({
                title: W(a),
                items: u
              });
            } else if (c === "number")
              r.push({
                title: W(a),
                prop: a,
                type: "number",
                value: l,
                step: 0.01,
                onChange: (u, h) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value`, h);
                  const p = e.scene?.getObjectByProperty("uuid", i.uuid);
                  p !== void 0 && O(p, `material.uniforms.${a}.value`, h);
                }
              });
            else if (c === "string")
              r.push({
                title: W(a),
                prop: a,
                type: c,
                value: l,
                onChange: (u, h) => {
                  e.updateObject(i.uuid, `material.uniforms.${a}.value`, h);
                  const p = e.scene?.getObjectByProperty("uuid", i.uuid);
                  p !== void 0 && O(p, `material.uniforms.${a}.value`, h);
                }
              });
            else if (l.src !== void 0)
              r.push({
                title: W(a),
                type: "image",
                value: l.src,
                onChange: (u, h) => {
                  const p = `material.uniforms.${a}.value`;
                  e.createTexture(i.uuid, p, h);
                  const f = e.scene?.getObjectByProperty("uuid", i.uuid);
                  f !== void 0 && wt(h).then((y) => {
                    O(f, p, y), O(f, "material.needsUpdate", !0);
                  });
                }
              });
            else if (l.elements !== void 0) {
              const u = [];
              for (const h in l.elements)
                u.push({
                  title: `${h}`,
                  type: "number",
                  value: l.elements[h],
                  step: 0.01,
                  onChange: (p, f) => {
                    e.updateObject(i.uuid, `material.uniforms.${a}.value.elements[${h}]`, f);
                    const y = e.scene?.getObjectByProperty("uuid", i.uuid);
                    y !== void 0 && O(y, `material.uniforms.${a}.value.elements[${h}]`, f);
                  }
                });
              r.push({
                title: W(a),
                items: u
              });
            } else {
              const u = [], h = l;
              for (const p in h) {
                const f = p, y = h[p], V = typeof y, S = `material.uniforms.${a}.value.${f}`;
                if (y.isColor)
                  u.push({
                    title: W(f),
                    prop: f,
                    type: "color",
                    value: y,
                    onChange: (A, k) => {
                      const E = new pt(k);
                      e.updateObject(i.uuid, S, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, S, E);
                    }
                  });
                else if (Dt(y))
                  u.push({
                    title: `${W(f)}`,
                    prop: f,
                    type: "vector",
                    value: y,
                    onChange: (A, k) => {
                      e.updateObject(i.uuid, S, k);
                      const E = e.scene?.getObjectByProperty("uuid", i.uuid);
                      E !== void 0 && O(E, S, k);
                    }
                  });
                else if (jt(y)) {
                  const A = [];
                  A.push({
                    title: "X",
                    prop: f,
                    type: "number",
                    value: l.x,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.x`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.x`, E);
                    }
                  }), A.push({
                    title: "Y",
                    prop: f,
                    type: "number",
                    value: l.y,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.y`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.y`, E);
                    }
                  }), A.push({
                    title: "Z",
                    prop: f,
                    type: "number",
                    value: l.z,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.z`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.z`, E);
                    }
                  }), u.push({
                    title: W(f),
                    items: A
                  });
                } else if (en(y)) {
                  const A = [];
                  A.push({
                    title: "X",
                    prop: f,
                    type: "number",
                    value: l.x,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.x`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.x`, E);
                    }
                  }), A.push({
                    title: "Y",
                    prop: f,
                    type: "number",
                    value: l.y,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.y`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.y`, E);
                    }
                  }), A.push({
                    title: "Z",
                    prop: f,
                    type: "number",
                    value: l.z,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.z`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.z`, E);
                    }
                  }), A.push({
                    title: "W",
                    prop: f,
                    type: "number",
                    value: l.w,
                    step: 0.01,
                    onChange: (k, E) => {
                      e.updateObject(i.uuid, `${S}.w`, E);
                      const C = e.scene?.getObjectByProperty("uuid", i.uuid);
                      C !== void 0 && O(C, `${S}.w`, E);
                    }
                  }), u.push({
                    title: W(f),
                    items: A
                  });
                } else
                  V === "number" ? u.push({
                    title: W(f),
                    prop: f,
                    type: "number",
                    value: y,
                    step: 0.01,
                    onChange: (A, k) => {
                      e.updateObject(i.uuid, S, k);
                      const E = e.scene?.getObjectByProperty("uuid", i.uuid);
                      E !== void 0 && O(E, S, k);
                    }
                  }) : V === "string" ? u.push({
                    title: W(f),
                    prop: f,
                    type: "string",
                    value: y,
                    onChange: (A, k) => {
                      e.updateObject(i.uuid, S, k);
                      const E = e.scene?.getObjectByProperty("uuid", i.uuid);
                      E !== void 0 && O(E, S, k);
                    }
                  }) : y.src !== void 0 ? u.push({
                    title: W(f),
                    type: "image",
                    value: y.src,
                    onChange: (A, k) => {
                      e.createTexture(i.uuid, S, k);
                      const E = e.scene?.getObjectByProperty("uuid", i.uuid);
                      E !== void 0 && wt(k).then((C) => {
                        O(E, S, C), O(E, "material.needsUpdate", !0);
                      });
                    }
                  }) : y.elements;
              }
              u.sort((p, f) => p.title < f.title ? -1 : p.title > f.title ? 1 : 0), u.length > 0 && r.push({
                title: Je(a),
                items: u
              });
            }
          }
          if (r.sort((a, l) => a.title < l.title ? -1 : a.title > l.title ? 1 : 0), r.length > 0)
            return {
              title: W(t),
              items: r
            };
          break;
        default:
          console.log(">>> other prop to add...", t);
          break;
      }
    }
  }
}
function tn(t, n, i) {
  const e = [];
  for (const r in t) {
    if (!Wi(r))
      continue;
    const a = typeof t[r], l = t[r];
    if (a === "boolean")
      e.push(ea(r, l, n, i));
    else if (a === "number")
      e.push(ta(r, l, n, i));
    else if (a === "string")
      e.push(na(r, l, n, i));
    else if (a === "object") {
      const c = ia(r, l, n, i);
      c !== void 0 && e.push(c);
    } else
      l !== void 0 && console.log("other:", r, a, l);
  }
  return e.sort((r, a) => r.title < a.title ? -1 : r.title > a.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      i.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function aa(t, n) {
  const i = t.material;
  if (Array.isArray(i)) {
    const e = [], r = i.length;
    for (let a = 0; a < r; a++)
      e.push(
        /* @__PURE__ */ d.jsx(
          Qe,
          {
            title: `Material ${a}`,
            items: tn(i[a], t, n)
          },
          `Material ${a}`
        )
      );
    return /* @__PURE__ */ d.jsx(d.Fragment, { children: e });
  } else
    return /* @__PURE__ */ d.jsx(
      Qe,
      {
        title: "Material",
        items: tn(i, t, n)
      }
    );
}
function ra(t) {
  const n = pe(null), i = pe(null), e = pe(null), r = pe(null), a = pe(null), l = pe(null), [c, u] = ie(t.value), [h, p] = ie({ min: t.min, max: t.max }), [f, y] = ie(!1);
  function V() {
    f || (window.addEventListener("mousemove", A), window.addEventListener("mouseup", S), window.addEventListener("mouseup", S), y(!0));
  }
  function S() {
    window.removeEventListener("mousemove", A), window.removeEventListener("mouseup", S), y(!1);
  }
  function A(I) {
    const q = a.current.getBoundingClientRect(), te = Ze(0, 99, I.clientX - q.left) / 99, ge = Ze(0, 99, I.clientY - q.top) / 99, K = mt(Zt(h.min, h.max, te), 3), ve = mt(Zt(h.min, h.max, ge), 3);
    t.onChange({ target: { value: { x: K, y: ve } } }), u({ x: K, y: ve });
  }
  function k(I) {
    let q = c.x, te = c.y;
    I.target === n.current ? q = Number(I.target.value) : te = Number(I.target.value), u({ x: q, y: te });
  }
  function E() {
    const I = Number(e.current.value);
    p({ min: I, max: h.max }), (c.x < I || c.y < I) && u({ x: Ze(I, h.max, c.x), y: Ze(I, h.max, c.y) });
  }
  function C() {
    const I = Number(r.current.value);
    p({ min: h.min, max: I }), (c.x > I || c.y > I) && u({ x: Ze(h.min, I, c.x), y: Ze(h.min, I, c.y) });
  }
  return ke(() => {
    const I = Kt(h.min, h.max, c.x), q = Kt(h.min, h.max, c.y);
    l.current.style.left = `${I * 100}%`, l.current.style.top = `${q * 100}%`;
  }, [h, c]), /* @__PURE__ */ d.jsxs("div", { className: "vector", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "X:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: c.x,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: k
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: c.y,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: k
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: h.min,
            step: 0.01,
            onChange: E
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: r,
            type: "number",
            value: h.max,
            step: 0.01,
            onChange: C
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "input", ref: a, onMouseDown: V, onMouseUp: S, children: [
      /* @__PURE__ */ d.jsx("div", { className: "x" }),
      /* @__PURE__ */ d.jsx("div", { className: "y" }),
      /* @__PURE__ */ d.jsx("div", { className: "pt", ref: l })
    ] })
  ] });
}
function ft(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = Ti(t.value));
  const [i, e] = ie(n), r = pe(null), a = pe(null), l = pe(null);
  ke(() => {
    let f = !1, y = -1, V = 0, S = Number(i);
    const A = (q) => {
      f = !0, V = S, y = q.clientX;
    }, k = (q) => {
      if (!f)
        return;
      const te = t.step !== void 0 ? t.step : 1, ge = (q.clientX - y) * te;
      S = Number((V + ge).toFixed(4)), a.current !== null && (a.current.value = S.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, S);
    }, E = () => {
      f = !1;
    }, C = () => {
      f = !1;
    }, I = t.type === "number";
    return I && (r.current?.addEventListener("mousedown", A, !1), document.addEventListener("mouseup", E, !1), document.addEventListener("mousemove", k, !1), document.addEventListener("contextmenu", C, !1)), () => {
      I && (r.current?.removeEventListener("mousedown", A), document.removeEventListener("mouseup", E), document.removeEventListener("mousemove", k), document.removeEventListener("contextmenu", C));
    };
  }, [i]);
  const c = t.type === "string" && (i.length > 100 || i.search(`
`) > -1), u = c || t.type === "image" || t.type === "vector", h = (f) => {
    let y = f.target.value;
    t.type === "boolean" ? y = f.target.checked : t.type === "option" && (y = t.options[y].value), e(y), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, y);
  }, p = {};
  return t.disabled && (p.opacity = 0.8), /* @__PURE__ */ d.jsxs("div", { className: `field ${u ? "block" : ""}`, style: p, children: [
    t.type !== "button" && /* @__PURE__ */ d.jsx("label", { ref: r, children: Je(t.title) }, "fieldLabel"),
    t.type === "string" && !c && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: h,
        value: i
      }
    ),
    t.type === "string" && c && /* @__PURE__ */ d.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: t.disabled !== void 0 ? t.disabled : !0,
        onChange: h,
        value: i
      }
    ),
    t.type === "boolean" && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "checkbox",
        disabled: t.disabled,
        onChange: h,
        checked: i
      }
    ),
    t.type === "number" && /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: a,
        type: "number",
        value: i,
        min: t.min,
        max: t.max,
        step: t.step,
        disabled: t.disabled,
        onChange: h
      }
    ),
    t.type === "range" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: i.toString(), onChange: h, disabled: t.disabled, className: "min" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          disabled: t.disabled,
          type: "range",
          value: i,
          min: t.min,
          max: t.max,
          step: t.step,
          onChange: h
        }
      )
    ] }),
    t.type === "color" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: i.toString(), onChange: h, disabled: t.disabled, className: "color" }),
      /* @__PURE__ */ d.jsx("input", { type: "color", value: i, onChange: h, disabled: t.disabled })
    ] }),
    t.type === "button" && /* @__PURE__ */ d.jsx(
      "button",
      {
        disabled: t.disabled,
        onClick: () => {
          t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, !0);
        },
        children: t.title
      }
    ),
    t.type === "image" && /* @__PURE__ */ d.jsx("img", { ref: l, onClick: () => {
      qi().then((f) => {
        l.current.src = f, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, f);
      });
    }, src: i.length > 0 ? i : Hi }),
    t.type === "option" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx("select", { onChange: h, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((f, y) => /* @__PURE__ */ d.jsx("option", { value: f.value, children: Je(f.title) }, y)) }) }),
    t.type === "vector" && /* @__PURE__ */ d.jsx(ra, { value: i, min: 0, max: 1, onChange: h })
  ] });
}
function nn(t) {
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
function sa(t, n) {
  const i = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      i.push({
        title: nn(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, a) => {
          n.updateObject(t.uuid, r, a), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const l = n.scene?.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && (O(l, r, a), l.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      i.push({
        title: nn(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (r, a) => {
          n.updateObject(t.uuid, r, a), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const l = n.scene?.getObjectByProperty("uuid", t.uuid);
          l !== void 0 && (O(l, r, a), l.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ d.jsx(
    Qe,
    {
      title: "Camera",
      items: i
    }
  );
}
const oa = Math.PI / 180, ca = 180 / Math.PI;
function st(t, n, i, e, r) {
  return e + (t - n) * (r - e) / (i - n);
}
function la(t) {
  return t * oa;
}
function It(t) {
  return t * ca;
}
function ua(t, n) {
  const i = new ii();
  i.elements = t.matrix;
  const e = new J(), r = new ai(), a = new J();
  t.uuid.length > 0 && (e.setFromMatrixPosition(i), r.setFromRotationMatrix(i), a.setFromMatrixScale(i));
  const l = (u, h) => {
    n.updateObject(t.uuid, u, h);
    const p = n.scene?.getObjectByProperty("uuid", t.uuid);
    p !== void 0 && O(p, u, h);
  }, c = (u, h) => {
    l(u, la(h));
  };
  return /* @__PURE__ */ d.jsx(
    Qe,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: l
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: l
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: l
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: mt(It(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: mt(It(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: mt(It(r.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: a.x,
          step: 0.01,
          onChange: l
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: a.y,
          step: 0.01,
          onChange: l
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: a.z,
          step: 0.01,
          onChange: l
        }
      ]
    }
  );
}
function an(t) {
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
    case "width":
      return "Width";
    case "height":
      return "Height";
  }
  return t;
}
function da(t, n) {
  const i = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const r = t.lightInfo[e];
      r !== void 0 && (r.isColor !== void 0 ? i.push({
        title: an(e),
        prop: e,
        type: "color",
        value: r,
        onChange: (a, l) => {
          const c = new pt(l);
          n.updateObject(t.uuid, a, c);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && O(u, a, c);
        }
      }) : i.push({
        title: an(e),
        prop: e,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (a, l) => {
          n.updateObject(t.uuid, a, l);
          const c = n.scene?.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && O(c, a, l);
        }
      }));
    }
  return /* @__PURE__ */ d.jsx(
    Qe,
    {
      title: "Light",
      items: i
    }
  );
}
function ha(t, n) {
  const i = [], e = [];
  let r = 0;
  t.animations.forEach((c) => {
    r = Math.max(r, c.duration), c.duration > 0 && e.push({
      title: c.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: c.duration,
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
  }), i.push({
    title: "Animations",
    items: e
  });
  const a = n.scene?.getObjectByProperty("uuid", t.uuid);
  let l = !1;
  if (a !== void 0) {
    const c = a.mixer;
    if (l = c !== void 0, l) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: c.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (h, p) => {
            c.timeScale = p, n.updateObject(t.uuid, "mixer.timeScale", p);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          c.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), i.push({
        title: "Mixer",
        items: u
      });
    }
  }
  return /* @__PURE__ */ d.jsx(Qe, { title: "Animation", items: i });
}
const $n = {
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
let ce = { ...$n };
function fa(t) {
  const [n, i] = ie(-1);
  ke(() => {
    function l(u) {
      ce = { ...u.value }, i(Date.now());
    }
    function c() {
      ce = { ...$n }, i(Date.now());
    }
    return F.addEventListener(U.SET_SCENE, c), F.addEventListener(U.SET_OBJECT, l), () => {
      F.removeEventListener(U.SET_SCENE, c), F.removeEventListener(U.SET_OBJECT, l);
    };
  }, []);
  const e = ce.type.toLowerCase(), r = ce.animations.length > 0 || ce.mixer !== void 0, a = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ d.jsx(Ft, { label: "Inspector", children: /* @__PURE__ */ d.jsx("div", { id: "Inspector", className: t.class, children: ce.uuid.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ce.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ce.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ce.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: ce.visible,
          onChange: (l, c) => {
            t.three.updateObject(ce.uuid, l, c);
            const u = t.three.scene?.getObjectByProperty("uuid", ce.uuid);
            u !== void 0 && O(u, l, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      ua(ce, t.three),
      r ? ha(ce, t.three) : null,
      e.search("camera") > -1 ? sa(ce, t.three) : null,
      e.search("light") > -1 ? da(ce, t.three) : null,
      a ? aa(ce, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ia(t) {
  const [n, i] = ie(t.scene);
  ke(() => {
    const a = (l) => {
      i(l.value);
    };
    return F.addEventListener(U.SET_SCENE, a), () => {
      F.removeEventListener(U.SET_SCENE, a);
    };
  }, []);
  const e = n !== null, r = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ d.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ d.jsx(Ft, { label: r, open: !0, children: /* @__PURE__ */ d.jsx(d.Fragment, { children: e && /* @__PURE__ */ d.jsx(Yi, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ d.jsx(fa, { three: t.three })
  ] }, "SidePanel");
}
function La(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const i = (c) => {
    if (!n())
      return;
    const u = t.three.scene?.getObjectByProperty("uuid", c.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (c, u, h) => {
    if (!n())
      return;
    const p = t.three.scene?.getObjectByProperty("uuid", c);
    p !== void 0 && O(p, u, h);
  }, r = (c) => {
    if (!n())
      return;
    const u = c.value, { key: h, value: p, uuid: f } = u;
    e(f, h, p);
  }, a = (c) => {
    if (!n())
      return;
    const u = c.value;
    wt(u.value).then((h) => {
      e(u.uuid, u.key, h), e(u.uuid, "material.needsUpdate", !0);
    });
  }, l = (c) => {
    if (!n())
      return;
    const { key: u, uuid: h, value: p, subitem: f } = c.value, y = t.three.scene?.getObjectByProperty("uuid", h);
    if (y !== void 0)
      try {
        f !== void 0 ? ji(y, f)[u](p) : y[u](p);
      } catch (V) {
        console.log("Error requesting method:"), console.log(V), console.log(u), console.log(p);
      }
  };
  return ke(() => (F.addEventListener(U.GET_OBJECT, i), F.addEventListener(U.UPDATE_OBJECT, r), F.addEventListener(U.CREATE_TEXTURE, a), F.addEventListener(U.REQUEST_METHOD, l), () => {
    F.removeEventListener(U.GET_OBJECT, i), F.removeEventListener(U.UPDATE_OBJECT, r), F.removeEventListener(U.CREATE_TEXTURE, a), F.removeEventListener(U.REQUEST_METHOD, l);
  }), []), null;
}
class pa extends ri {
  constructor(n, i) {
    const e = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], r = new Ht();
    r.setAttribute("position", new Gt(e, 3)), r.computeBoundingSphere();
    const a = new si({ fog: !1 });
    super(r, a), this.light = n, this.color = i, this.type = "RectAreaLightHelper";
    const l = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], c = new Ht();
    c.setAttribute("position", new Gt(l, 3)), c.computeBoundingSphere(), this.add(new Mn(c, new Tn({ side: dn, fog: !1 })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const n = this.material.color, i = Math.max(n.r, n.g, n.b);
      i > 1 && n.multiplyScalar(1 / i), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const rn = { type: "change" }, Lt = { type: "start" }, sn = { type: "end" }, Et = new oi(), on = new ci(), ma = Math.cos(70 * li.DEG2RAD);
class ga extends ln {
  constructor(n, i) {
    super(), this.object = n, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: it.ROTATE, MIDDLE: it.DOLLY, RIGHT: it.PAN }, this.touches = { ONE: at.ROTATE, TWO: at.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", ot), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ot), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(rn), e.update(), a = r.NONE;
    }, this.update = function() {
      const o = new J(), x = new Wt().setFromUnitVectors(n.up, new J(0, 1, 0)), R = x.clone().invert(), Y = new J(), Z = new Wt(), Ee = new J(), de = 2 * Math.PI;
      return function(Rt = null) {
        const lt = e.object.position;
        o.copy(lt).sub(e.target), o.applyQuaternion(x), c.setFromVector3(o), e.autoRotate && a === r.NONE && be(Me(Rt)), e.enableDamping ? (c.theta += u.theta * e.dampingFactor, c.phi += u.phi * e.dampingFactor) : (c.theta += u.theta, c.phi += u.phi);
        let _e = e.minAzimuthAngle, Ce = e.maxAzimuthAngle;
        isFinite(_e) && isFinite(Ce) && (_e < -Math.PI ? _e += de : _e > Math.PI && (_e -= de), Ce < -Math.PI ? Ce += de : Ce > Math.PI && (Ce -= de), _e <= Ce ? c.theta = Math.max(_e, Math.min(Ce, c.theta)) : c.theta = c.theta > (_e + Ce) / 2 ? Math.max(_e, c.theta) : Math.min(Ce, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(p, e.dampingFactor) : e.target.add(p), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && ge || e.object.isOrthographicCamera ? c.radius = Ae(c.radius) : c.radius = Ae(c.radius * h), o.setFromSpherical(c), o.applyQuaternion(R), lt.copy(e.target).add(o), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, p.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), p.set(0, 0, 0));
        let We = !1;
        if (e.zoomToCursor && ge) {
          let Ve = null;
          if (e.object.isPerspectiveCamera) {
            const qe = o.length();
            Ve = Ae(qe * h);
            const Xe = qe - Ve;
            e.object.position.addScaledVector(q, Xe), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const qe = new J(te.x, te.y, 0);
            qe.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix(), We = !0;
            const Xe = new J(te.x, te.y, 0);
            Xe.unproject(e.object), e.object.position.sub(Xe).add(qe), e.object.updateMatrixWorld(), Ve = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ve !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ve).add(e.object.position) : (Et.origin.copy(e.object.position), Et.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Et.direction)) < ma ? n.lookAt(e.target) : (on.setFromNormalAndCoplanarPoint(e.object.up, e.target), Et.intersectPlane(on, e.target))));
        } else
          e.object.isOrthographicCamera && (We = h !== 1, We && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix()));
        return h = 1, ge = !1, We || Y.distanceToSquared(e.object.position) > l || 8 * (1 - Z.dot(e.object.quaternion)) > l || Ee.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(rn), Y.copy(e.object.position), Z.copy(e.object.quaternion), Ee.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", tt), e.domElement.removeEventListener("pointerdown", D), e.domElement.removeEventListener("pointercancel", Q), e.domElement.removeEventListener("wheel", gt), e.domElement.removeEventListener("pointermove", H), e.domElement.removeEventListener("pointerup", Q), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", ot), e._domElementKeyEvents = null);
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
    let a = r.NONE;
    const l = 1e-6, c = new Vt(), u = new Vt();
    let h = 1;
    const p = new J(), f = new me(), y = new me(), V = new me(), S = new me(), A = new me(), k = new me(), E = new me(), C = new me(), I = new me(), q = new J(), te = new me();
    let ge = !1;
    const K = [], ve = {};
    let ue = !1;
    function Me(o) {
      return o !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Te(o) {
      const x = Math.abs(o * 0.01);
      return Math.pow(0.95, e.zoomSpeed * x);
    }
    function be(o) {
      u.theta -= o;
    }
    function $(o) {
      u.phi -= o;
    }
    const xe = function() {
      const o = new J();
      return function(R, Y) {
        o.setFromMatrixColumn(Y, 0), o.multiplyScalar(-R), p.add(o);
      };
    }(), _ = function() {
      const o = new J();
      return function(R, Y) {
        e.screenSpacePanning === !0 ? o.setFromMatrixColumn(Y, 1) : (o.setFromMatrixColumn(Y, 0), o.crossVectors(e.object.up, o)), o.multiplyScalar(R), p.add(o);
      };
    }(), we = function() {
      const o = new J();
      return function(R, Y) {
        const Z = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const Ee = e.object.position;
          o.copy(Ee).sub(e.target);
          let de = o.length();
          de *= Math.tan(e.object.fov / 2 * Math.PI / 180), xe(2 * R * de / Z.clientHeight, e.object.matrix), _(2 * Y * de / Z.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (xe(R * (e.object.right - e.object.left) / e.object.zoom / Z.clientWidth, e.object.matrix), _(Y * (e.object.top - e.object.bottom) / e.object.zoom / Z.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Pe(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function De(o) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Re(o, x) {
      if (!e.zoomToCursor)
        return;
      ge = !0;
      const R = e.domElement.getBoundingClientRect(), Y = o - R.left, Z = x - R.top, Ee = R.width, de = R.height;
      te.x = Y / Ee * 2 - 1, te.y = -(Z / de) * 2 + 1, q.set(te.x, te.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function Ae(o) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, o));
    }
    function je(o) {
      f.set(o.clientX, o.clientY);
    }
    function $e(o) {
      Re(o.clientX, o.clientX), E.set(o.clientX, o.clientY);
    }
    function Be(o) {
      S.set(o.clientX, o.clientY);
    }
    function ae(o) {
      y.set(o.clientX, o.clientY), V.subVectors(y, f).multiplyScalar(e.rotateSpeed);
      const x = e.domElement;
      be(2 * Math.PI * V.x / x.clientHeight), $(2 * Math.PI * V.y / x.clientHeight), f.copy(y), e.update();
    }
    function Oe(o) {
      C.set(o.clientX, o.clientY), I.subVectors(C, E), I.y > 0 ? Pe(Te(I.y)) : I.y < 0 && De(Te(I.y)), E.copy(C), e.update();
    }
    function He(o) {
      A.set(o.clientX, o.clientY), k.subVectors(A, S).multiplyScalar(e.panSpeed), we(k.x, k.y), S.copy(A), e.update();
    }
    function Ge(o) {
      Re(o.clientX, o.clientY), o.deltaY < 0 ? De(Te(o.deltaY)) : o.deltaY > 0 && Pe(Te(o.deltaY)), e.update();
    }
    function he(o) {
      let x = !1;
      switch (o.code) {
        case e.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? $(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : we(0, e.keyPanSpeed), x = !0;
          break;
        case e.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? $(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : we(0, -e.keyPanSpeed), x = !0;
          break;
        case e.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? be(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : we(e.keyPanSpeed, 0), x = !0;
          break;
        case e.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? be(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : we(-e.keyPanSpeed, 0), x = !0;
          break;
      }
      x && (o.preventDefault(), e.update());
    }
    function g(o) {
      if (K.length === 1)
        f.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), R = 0.5 * (o.pageX + x.x), Y = 0.5 * (o.pageY + x.y);
        f.set(R, Y);
      }
    }
    function v(o) {
      if (K.length === 1)
        S.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), R = 0.5 * (o.pageX + x.x), Y = 0.5 * (o.pageY + x.y);
        S.set(R, Y);
      }
    }
    function M(o) {
      const x = Ue(o), R = o.pageX - x.x, Y = o.pageY - x.y, Z = Math.sqrt(R * R + Y * Y);
      E.set(0, Z);
    }
    function N(o) {
      e.enableZoom && M(o), e.enablePan && v(o);
    }
    function re(o) {
      e.enableZoom && M(o), e.enableRotate && g(o);
    }
    function P(o) {
      if (K.length == 1)
        y.set(o.pageX, o.pageY);
      else {
        const R = Ue(o), Y = 0.5 * (o.pageX + R.x), Z = 0.5 * (o.pageY + R.y);
        y.set(Y, Z);
      }
      V.subVectors(y, f).multiplyScalar(e.rotateSpeed);
      const x = e.domElement;
      be(2 * Math.PI * V.x / x.clientHeight), $(2 * Math.PI * V.y / x.clientHeight), f.copy(y);
    }
    function T(o) {
      if (K.length === 1)
        A.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), R = 0.5 * (o.pageX + x.x), Y = 0.5 * (o.pageY + x.y);
        A.set(R, Y);
      }
      k.subVectors(A, S).multiplyScalar(e.panSpeed), we(k.x, k.y), S.copy(A);
    }
    function B(o) {
      const x = Ue(o), R = o.pageX - x.x, Y = o.pageY - x.y, Z = Math.sqrt(R * R + Y * Y);
      C.set(0, Z), I.set(0, Math.pow(C.y / E.y, e.zoomSpeed)), Pe(I.y), E.copy(C);
      const Ee = (o.pageX + x.x) * 0.5, de = (o.pageY + x.y) * 0.5;
      Re(Ee, de);
    }
    function se(o) {
      e.enableZoom && B(o), e.enablePan && T(o);
    }
    function oe(o) {
      e.enableZoom && B(o), e.enableRotate && P(o);
    }
    function D(o) {
      e.enabled !== !1 && (K.length === 0 && (e.domElement.setPointerCapture(o.pointerId), e.domElement.addEventListener("pointermove", H), e.domElement.addEventListener("pointerup", Q)), Mt(o), o.pointerType === "touch" ? ct(o) : Ie(o));
    }
    function H(o) {
      e.enabled !== !1 && (o.pointerType === "touch" ? bt(o) : et(o));
    }
    function Q(o) {
      switch (Tt(o), K.length) {
        case 0:
          e.domElement.releasePointerCapture(o.pointerId), e.domElement.removeEventListener("pointermove", H), e.domElement.removeEventListener("pointerup", Q), e.dispatchEvent(sn), a = r.NONE;
          break;
        case 1:
          const x = K[0], R = ve[x];
          ct({ pointerId: x, pageX: R.x, pageY: R.y });
          break;
      }
    }
    function Ie(o) {
      let x;
      switch (o.button) {
        case 0:
          x = e.mouseButtons.LEFT;
          break;
        case 1:
          x = e.mouseButtons.MIDDLE;
          break;
        case 2:
          x = e.mouseButtons.RIGHT;
          break;
        default:
          x = -1;
      }
      switch (x) {
        case it.DOLLY:
          if (e.enableZoom === !1)
            return;
          $e(o), a = r.DOLLY;
          break;
        case it.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enablePan === !1)
              return;
            Be(o), a = r.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            je(o), a = r.ROTATE;
          }
          break;
        case it.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (e.enableRotate === !1)
              return;
            je(o), a = r.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Be(o), a = r.PAN;
          }
          break;
        default:
          a = r.NONE;
      }
      a !== r.NONE && e.dispatchEvent(Lt);
    }
    function et(o) {
      switch (a) {
        case r.ROTATE:
          if (e.enableRotate === !1)
            return;
          ae(o);
          break;
        case r.DOLLY:
          if (e.enableZoom === !1)
            return;
          Oe(o);
          break;
        case r.PAN:
          if (e.enablePan === !1)
            return;
          He(o);
          break;
      }
    }
    function gt(o) {
      e.enabled === !1 || e.enableZoom === !1 || a !== r.NONE || (o.preventDefault(), e.dispatchEvent(Lt), Ge(vt(o)), e.dispatchEvent(sn));
    }
    function vt(o) {
      const x = o.deltaMode, R = {
        clientX: o.clientX,
        clientY: o.clientY,
        deltaY: o.deltaY
      };
      switch (x) {
        case 1:
          R.deltaY *= 16;
          break;
        case 2:
          R.deltaY *= 100;
          break;
      }
      return o.ctrlKey && !ue && (R.deltaY *= 10), R;
    }
    function yt(o) {
      o.key === "Control" && (ue = !0, e.domElement.getRootNode().addEventListener("keyup", Fe, { passive: !0, capture: !0 }));
    }
    function Fe(o) {
      o.key === "Control" && (ue = !1, e.domElement.getRootNode().removeEventListener("keyup", Fe, { passive: !0, capture: !0 }));
    }
    function ot(o) {
      e.enabled === !1 || e.enablePan === !1 || he(o);
    }
    function ct(o) {
      switch (xt(o), K.length) {
        case 1:
          switch (e.touches.ONE) {
            case at.ROTATE:
              if (e.enableRotate === !1)
                return;
              g(o), a = r.TOUCH_ROTATE;
              break;
            case at.PAN:
              if (e.enablePan === !1)
                return;
              v(o), a = r.TOUCH_PAN;
              break;
            default:
              a = r.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case at.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              N(o), a = r.TOUCH_DOLLY_PAN;
              break;
            case at.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              re(o), a = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = r.NONE;
          }
          break;
        default:
          a = r.NONE;
      }
      a !== r.NONE && e.dispatchEvent(Lt);
    }
    function bt(o) {
      switch (xt(o), a) {
        case r.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          P(o), e.update();
          break;
        case r.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          T(o), e.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          se(o), e.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          oe(o), e.update();
          break;
        default:
          a = r.NONE;
      }
    }
    function tt(o) {
      e.enabled !== !1 && o.preventDefault();
    }
    function Mt(o) {
      K.push(o.pointerId);
    }
    function Tt(o) {
      delete ve[o.pointerId];
      for (let x = 0; x < K.length; x++)
        if (K[x] == o.pointerId) {
          K.splice(x, 1);
          return;
        }
    }
    function xt(o) {
      let x = ve[o.pointerId];
      x === void 0 && (x = new me(), ve[o.pointerId] = x), x.set(o.pageX, o.pageY);
    }
    function Ue(o) {
      const x = o.pointerId === K[0] ? K[1] : K[0];
      return ve[x];
    }
    e.domElement.addEventListener("contextmenu", tt), e.domElement.addEventListener("pointerdown", D), e.domElement.addEventListener("pointercancel", Q), e.domElement.addEventListener("wheel", gt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", yt, { passive: !0, capture: !0 }), this.update();
  }
}
const Ot = (t) => {
  const [n, i] = ie(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, r = (a) => {
    a !== n && (t.onSelect(a), i(a)), t.onToggle(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ d.jsx("ul", { className: "dropdown-menu", children: t.options.map((a) => /* @__PURE__ */ d.jsx("li", { onClick: () => r(a), children: a }, a)) })
  ] });
}, Ke = Oi(function(n, i) {
  const [e, r] = ie(!1), a = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ d.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ d.jsx("div", { ref: i, className: "clickable", onClick: () => {
      e && r(!1);
    } }),
    /* @__PURE__ */ d.jsx(
      Ot,
      {
        index: a,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (l) => {
          r(l);
        },
        up: !0
      }
    )
  ] });
});
class va extends Pn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: ui,
      side: hn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new pt(16777215)
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
class ya extends Mn {
  gridMaterial;
  constructor() {
    const n = new va();
    super(new di(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ba = `#include <common>
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
}`, xa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Ea extends Pn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ba,
      fragmentShader: xa
    });
  }
}
let Ct = "Renderer", Ne, St = !1, cn = !1, X = null, le = null, ze = null, Ye = null;
function Na(t) {
  const n = t.three.app.appID, i = localStorage.getItem(`${n}_mode`), e = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", r = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", a = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", l = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", c = ye(() => /* @__PURE__ */ new Map(), []), u = ye(() => /* @__PURE__ */ new Map(), []), h = ye(() => /* @__PURE__ */ new Map(), []), p = ye(() => /* @__PURE__ */ new Map(), []), f = ye(() => new hi(), []), y = ye(() => new fi(), []), V = ye(() => new ya(), []), S = ye(() => new qt(500), []), A = ye(() => new qt(100), []), k = ye(() => new pi(), []), E = ye(() => new mi(), []), C = ye(() => new Ea(), []), I = ye(() => new Tn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function q(g, v) {
    const M = new Xt(-100, 100, 100, -100, 50, 3e3);
    return M.name = g, M.position.copy(v), M.lookAt(0, 0, 0), c.set(g, M), M;
  }
  const te = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], ge = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], K = pe(null), ve = pe(null), ue = pe(null), Me = pe(null), Te = pe(null), be = pe(null), [$, xe] = ie(i !== null ? i : "Single"), [_, we] = ie(null), [Pe, De] = ie(!1), [Re, Ae] = ie(!1), [je, $e] = ie(!1), [, Be] = ie(Date.now());
  localStorage.setItem(`${n}_mode`, $), localStorage.setItem(`${n}_tlCam`, e), localStorage.setItem(`${n}_trCam`, r), localStorage.setItem(`${n}_blCam`, a), localStorage.setItem(`${n}_brCam`, l);
  const ae = (g, v) => {
    const M = u.get(g.name);
    M !== void 0 && M.dispose(), u.delete(g.name);
    const N = h.get(g.name);
    N !== void 0 && (f.remove(N), N.dispose()), h.delete(g.name);
    const re = new ga(g, v);
    switch (re.enableDamping = !0, re.dampingFactor = 0.05, g.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        re.enableRotate = !1;
        break;
    }
    if (u.set(g.name, re), g instanceof At) {
      const P = new yi(g);
      h.set(g.name, P), f.add(P);
    }
  }, Oe = (g) => {
    const v = h.get(g.name);
    v !== void 0 && (f.remove(v), v.dispose(), h.delete(g.name));
    const M = u.get(g.name);
    M !== void 0 && (M.dispose(), u.delete(g.name));
  }, He = () => {
    u.forEach((g, v) => {
      g.dispose();
      const M = h.get(v);
      M !== void 0 && (f.remove(M), M.dispose()), h.delete(v), u.delete(v);
    }), u.clear(), h.clear();
  }, Ge = () => {
    switch ($) {
      case "Single":
        ae(X, ue.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(X, ue.current), ae(le, Me.current);
        break;
      case "Quad":
        ae(X, ue.current), ae(le, Me.current), ae(ze, Te.current), ae(Ye, be.current);
        break;
    }
  };
  ke(() => {
    const g = new gi({
      canvas: K.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), t.three.renderer = g, we(g);
  }, []), ke(() => {
    f.name = "Debug Scene", f.uuid = "", y.name = "helpers", f.add(y), y.add(V), S.name = "axisHelper", y.add(S), A.name = "interactionHelper", y.add(A), A.visible = !1, q("Top", new J(0, 1e3, 0)), q("Bottom", new J(0, -1e3, 0)), q("Left", new J(-1e3, 0, 0)), q("Right", new J(1e3, 0, 0)), q("Front", new J(0, 0, 1e3)), q("Back", new J(0, 0, -1e3)), q("Orthographic", new J(1e3, 1e3, 1e3));
    const g = new At(60, 1, 50, 3e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), c.set("Debug", g), X = c.get(localStorage.getItem(`${n}_tlCam`)), le = c.get(localStorage.getItem(`${n}_trCam`)), ze = c.get(localStorage.getItem(`${n}_blCam`)), Ye = c.get(localStorage.getItem(`${n}_brCam`));
  }, []), ke(() => {
    const g = () => {
      p.forEach((P) => {
        y.remove(P), P.dispose();
      }), p.clear();
    }, v = () => {
      Ne.traverse((P) => {
        if (P.type.search("Light") > -1) {
          let T;
          switch (P.type) {
            case "DirectionalLight":
              T = new Ci(P), T.name = `${P.name}Helper`, p.set(P.name, T), y.add(T);
              break;
            case "HemisphereLight":
              T = new Ei(P, 250), T.name = `${P.name}Helper`, p.set(P.name, T), y.add(T);
              break;
            case "RectAreaLight":
              T = new pa(P), T.name = `${P.name}Helper`, p.set(P.name, T), y.add(T);
              break;
            case "PointLight":
              T = new xi(P), T.name = `${P.name}Helper`, p.set(P.name, T), y.add(T);
              break;
            case "SpotLight":
              T = new bi(P), T.name = `${P.name}Helper`, p.set(P.name, T), y.add(T);
              break;
          }
        }
      });
    }, M = (P) => {
      g(), jn(Ne), f.remove(Ne);
      const T = t.scenes.get(P.value.name);
      if (T !== void 0) {
        const B = new T();
        t.onSceneSet !== void 0 && t.onSceneSet(B), Ne = B, t.three.scene = Ne, f.add(Ne), cn = !0, v();
      }
    }, N = (P) => {
      const T = P.value, B = t.three.scene?.getObjectByProperty("uuid", T.uuid);
      B !== void 0 && c.set(T.name, B), Be(Date.now());
    }, re = (P) => {
      c.delete(P.value.name), Be(Date.now());
    };
    return F.addEventListener(U.SET_SCENE, M), F.addEventListener(U.ADD_CAMERA, N), F.addEventListener(U.REMOVE_CAMERA, re), () => {
      F.removeEventListener(U.SET_SCENE, M), F.removeEventListener(U.ADD_CAMERA, N), F.removeEventListener(U.REMOVE_CAMERA, re);
    };
  }, []), ke(() => {
    if (_ === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, M = Math.floor(g / 2), N = Math.floor(v / 2), re = -1;
    const P = () => {
      g = window.innerWidth - 300, v = window.innerHeight, M = Math.floor(g / 2), N = Math.floor(v / 2), _.setSize(g, v);
      let D = g, H = v;
      switch ($) {
        case "Side by Side":
          D = M, H = v;
          break;
        case "Stacked":
          D = g, H = N;
          break;
        case "Quad":
          D = M, H = N;
          break;
      }
      c.forEach((Q) => {
        Q instanceof Xt ? (Q.left = D / -2, Q.right = D / 2, Q.top = H / 2, Q.bottom = H / -2, Q.updateProjectionMatrix()) : Q instanceof At && (Q.aspect = D / H, Q.updateProjectionMatrix(), h.get(Q.name)?.update());
      });
    }, T = () => {
      _.setViewport(0, 0, g, v), _.setScissor(0, 0, g, v), _.render(f, X);
    }, B = () => {
      if ($ === "Side by Side")
        _.setViewport(0, 0, M, v), _.setScissor(0, 0, M, v), _.render(f, X), _.setViewport(M, 0, M, v), _.setScissor(M, 0, M, v), _.render(f, le);
      else {
        const D = v - N;
        _.setViewport(0, D, g, N), _.setScissor(0, D, g, N), _.render(f, X), _.setViewport(0, 0, g, N), _.setScissor(0, 0, g, N), _.render(f, le);
      }
    }, se = () => {
      let D = 0, H = 0;
      H = v - N, D = 0, _.setViewport(D, H, M, N), _.setScissor(D, H, M, N), _.render(f, X), D = M, _.setViewport(D, H, M, N), _.setScissor(D, H, M, N), _.render(f, le), H = 0, D = 0, _.setViewport(D, H, M, N), _.setScissor(D, H, M, N), _.render(f, ze), D = M, _.setViewport(D, H, M, N), _.setScissor(D, H, M, N), _.render(f, Ye);
    }, oe = () => {
      switch (u.forEach((D) => {
        D.update();
      }), t.onSceneUpdate !== void 0 && cn && t.onSceneUpdate(Ne), _.clear(), $) {
        case "Single":
          T();
          break;
        case "Side by Side":
        case "Stacked":
          B();
          break;
        case "Quad":
          se();
          break;
      }
      re = requestAnimationFrame(oe);
    };
    return Ge(), window.addEventListener("resize", P), P(), oe(), () => {
      window.removeEventListener("resize", P), cancelAnimationFrame(re), re = -1;
    };
  }, [$, _]), ke(() => {
    if (_ !== null) {
      const g = new vi(), v = new me(), M = (T, B, se, oe) => {
        switch ($) {
          case "Quad":
            T < se ? B < oe ? g.setFromCamera(v, X) : g.setFromCamera(v, ze) : B < oe ? g.setFromCamera(v, le) : g.setFromCamera(v, Ye);
            break;
          case "Side by Side":
            T < se ? g.setFromCamera(v, X) : g.setFromCamera(v, le);
            break;
          case "Single":
            g.setFromCamera(v, X);
            break;
          case "Stacked":
            B < oe ? g.setFromCamera(v, X) : g.setFromCamera(v, le);
            break;
        }
      }, N = (T) => {
        if (!St)
          return;
        const B = new me();
        _.getSize(B);
        const se = Math.min(T.clientX, B.x), oe = Math.min(T.clientY, B.y);
        v.x = st(se, 0, B.x, -1, 1), v.y = st(oe, 0, B.y, 1, -1);
        const D = B.x / 2, H = B.y / 2, Q = () => {
          se < D ? v.x = st(se, 0, D, -1, 1) : v.x = st(se, D, B.x, -1, 1);
        }, Ie = () => {
          oe < H ? v.y = st(oe, 0, H, 1, -1) : v.y = st(oe, H, B.y, 1, -1);
        };
        switch ($) {
          case "Quad":
            Q(), Ie();
            break;
          case "Side by Side":
            Q();
            break;
          case "Stacked":
            Ie(), Ie();
            break;
        }
        M(se, oe, D, H);
        const et = g.intersectObjects(Ne.children);
        et.length > 0 && A.position.copy(et[0].point);
      }, re = (T) => {
        if (!St)
          return;
        const B = new me();
        if (_.getSize(B), T.clientX >= B.x)
          return;
        N(T);
        const se = g.intersectObjects(Ne.children);
        se.length > 0 && t.three.getObject(se[0].object.uuid);
      }, P = ve.current;
      return P.addEventListener("mousemove", N, !1), P.addEventListener("click", re, !1), () => {
        P.removeEventListener("mousemove", N), P.removeEventListener("click", re);
      };
    }
  }, [$, _]);
  const he = [];
  return c.forEach((g, v) => {
    he.push(v);
  }), /* @__PURE__ */ d.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ d.jsx("canvas", { ref: K }),
    _ !== null && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: `cameras ${$ === "Single" || $ === "Stacked" ? "single" : ""}`, ref: ve, children: [
        $ === "Single" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx(Ke, { camera: X, options: he, ref: ue, onSelect: (g) => {
          u.get(X.name)?.dispose();
          const v = c.get(g);
          v !== void 0 && (Oe(X), X = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, ue.current));
        } }) }),
        ($ === "Side by Side" || $ === "Stacked") && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(Ke, { camera: X, options: he, ref: ue, onSelect: (g) => {
            u.get(X.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(X), X = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, ue.current));
          } }),
          /* @__PURE__ */ d.jsx(Ke, { camera: le, options: he, ref: Me, onSelect: (g) => {
            u.get(le.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(le), le = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, Me.current));
          } })
        ] }),
        $ === "Quad" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(Ke, { camera: X, options: he, ref: ue, onSelect: (g) => {
            u.get(X.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(X), X = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, ue.current));
          } }),
          /* @__PURE__ */ d.jsx(Ke, { camera: le, options: he, ref: Me, onSelect: (g) => {
            u.get(le.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(le), le = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, Me.current));
          } }),
          /* @__PURE__ */ d.jsx(Ke, { camera: ze, options: he, ref: Te, onSelect: (g) => {
            u.get(ze.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(ze), ze = v, localStorage.setItem(`${n}_blCam`, v.name), ae(v, Te.current));
          } }),
          /* @__PURE__ */ d.jsx(Ke, { camera: Ye, options: he, ref: be, onSelect: (g) => {
            u.get(Ye.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(Ye), Ye = v, localStorage.setItem(`${n}_brCam`, v.name), ae(v, be.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ d.jsx(
          Ot,
          {
            index: ge.indexOf($),
            options: ge,
            onSelect: (g) => {
              g !== $ && (He(), xe(g));
            },
            open: Pe,
            onToggle: (g) => {
              De(g), Re && Ae(!1), je && $e(!1);
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ot,
          {
            index: te.indexOf(Ct),
            options: te,
            onSelect: (g) => {
              if (g !== Ct)
                switch (Ct = g, Ct) {
                  case "Depth":
                    f.overrideMaterial = k;
                    break;
                  case "Normals":
                    f.overrideMaterial = E;
                    break;
                  default:
                  case "Renderer":
                    f.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    f.overrideMaterial = I;
                    break;
                  case "UVs":
                    f.overrideMaterial = C;
                    break;
                }
            },
            open: Re,
            onToggle: (g) => {
              Pe && De(!1), Ae(g), je && $e(!1);
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ot,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (g) => {
              St = g === "Selection Mode", A.visible = St;
            },
            open: je,
            onToggle: (g) => {
              Pe && De(!1), Re && Ae(!1), $e(g);
            }
          }
        )
      ] })
    ] })
  ] });
}
function $a(t) {
  return /* @__PURE__ */ d.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ d.jsx("div", { className: "header", children: t.header }),
    t.children,
    /* @__PURE__ */ d.jsx("div", { className: "footer", children: t.footer })
  ] });
}
export {
  Ft as Accordion,
  Pa as Application,
  _t as BaseRemote,
  Nn as ChildObject,
  Yi as ContainerObject,
  Fi as Draggable,
  Bi as DraggableItem,
  Ui as Dropdown,
  zi as DropdownItem,
  $a as Editor,
  fa as Inspector,
  Na as MultiView,
  Ln as NavButton,
  Ra as RemoteComponents,
  ja as RemoteController,
  Bt as RemoteTheatre,
  ka as RemoteThree,
  Da as RemoteTweakpane,
  La as SceneInspector,
  Ia as SidePanel,
  U as ToolEvents,
  Je as capitalize,
  Ze as clamp,
  Ti as colorToHex,
  F as debugDispatcher,
  _a as defaultTheatreCallback,
  jn as dispose,
  Ri as disposeMaterial,
  Ta as disposeTexture,
  Ma as distance,
  Dn as hierarchyUUID,
  Mi as isColor,
  Zt as mix,
  kn as noop,
  Kt as normalize,
  _i as randomID,
  Pi as resetThreeObjects,
  mt as round,
  Aa as theatreEditorApp,
  Nt as totalThreeObjects
};
