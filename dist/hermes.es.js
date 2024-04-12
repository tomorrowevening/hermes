import { EventDispatcher as dn, Texture as hn, CubeTexture as Gn, RepeatWrapping as Vt, Color as mt, FrontSide as Vn, BackSide as fn, DoubleSide as pn, NoBlending as Wn, NormalBlending as qn, AdditiveBlending as Kn, SubtractiveBlending as Xn, MultiplyBlending as Zn, CustomBlending as Jn, AddEquation as Qn, SubtractEquation as ea, ReverseSubtractEquation as ta, MinEquation as na, MaxEquation as aa, ZeroFactor as mn, OneFactor as gn, SrcColorFactor as vn, OneMinusSrcColorFactor as bn, SrcAlphaFactor as yn, OneMinusSrcAlphaFactor as xn, DstAlphaFactor as Cn, OneMinusDstAlphaFactor as En, DstColorFactor as Sn, OneMinusDstColorFactor as wn, SrcAlphaSaturateFactor as ia, ConstantColorFactor as On, OneMinusConstantColorFactor as Mn, ConstantAlphaFactor as _n, OneMinusConstantAlphaFactor as Tn, Matrix4 as ra, Vector3 as Z, Euler as sa, Line as oa, BufferGeometry as Wt, Float32BufferAttribute as qt, LineBasicMaterial as ca, Mesh as Rn, MeshBasicMaterial as Pn, Ray as la, Plane as ua, MathUtils as da, MOUSE as at, TOUCH as it, Quaternion as Kt, Spherical as Xt, Vector2 as ge, ShaderMaterial as An, GLSL3 as ha, PlaneGeometry as fa, Scene as pa, Group as ma, AxesHelper as Zt, MeshDepthMaterial as ga, MeshNormalMaterial as va, WebGLRenderer as ba, PerspectiveCamera as kt, Raycaster as ya, OrthographicCamera as Jt, CameraHelper as xa, SpotLightHelper as Ca, PointLightHelper as Ea, HemisphereLightHelper as Sa, DirectionalLightHelper as wa } from "three";
import { Pane as Oa } from "tweakpane";
import * as Ma from "@tweakpane/plugin-essentials";
import kn, { useState as ee, useEffect as ke, useRef as ae, useMemo as de, forwardRef as _a } from "react";
import { Reorder as jn } from "framer-motion";
const Ut = () => {
}, Ai = () => {
};
function Je(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Ze(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function Qt(e, n, a) {
  return (a - e) / (n - e);
}
function en(e, n, a) {
  return e * (1 - a) + n * a;
}
function ki(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function Ta() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ra(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Pa(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), r = (d) => {
    const h = d.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, i = r(n), l = r(a), c = r(t);
  return "#" + i + l + c;
}
function gt(e, n = 1) {
  return Number(e.toFixed(n));
}
let Ft = 0;
const Aa = () => {
  Ft = 0;
}, Dn = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Ft}`, Ft++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((a) => {
    Dn(a);
  });
}, ji = (e) => {
  e?.dispose();
}, ka = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, In = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : In(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), ka(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class Di {
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
  constructor(n, a, t = !0) {
    this._appID = n, this._debugEnabled = a, a && (this._useBC = t, t ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
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
const B = new dn(), F = {
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
  handleApp(n, a, t) {
  }
  handleEditor(n, a, t) {
  }
}
class Ii extends _t {
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
  handleApp(n, a, t) {
    switch (t.event) {
      case "selectComponent":
        B.dispatchEvent({ type: F.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        B.dispatchEvent({ type: F.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Ht extends _t {
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
    this.sheetObjects.forEach((a, t) => {
      t.search(`${n}_`) > -1 && this.unsubscribe(a);
    });
  }
  sheetObject(n, a, t, r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const i = this.sheet(n);
    if (i === void 0)
      return;
    const l = `${n}_${a}`;
    let c = this.sheetObjects.get(l);
    c !== void 0 ? c = i.object(a, { ...t, ...c.value }, { reconfigure: !0 }) : c = i.object(a, t), this.sheetObjects.set(l, c), this.sheetObjectCBs.set(l, r !== void 0 ? r : Ut);
    const d = c.onValuesChange((h) => {
      if (this.app.editor) {
        for (const m in h) {
          const y = h[m];
          typeof y == "object" && Ra(y) && (h[m] = {
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
      const f = this.sheetObjectCBs.get(l);
      f !== void 0 && f(h);
    });
    return this.sheetObjectUnsubscribe.set(l, d), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(a)?.detachObject(t);
    const i = `${a}_${t}`, l = this.sheetObjectUnsubscribe.get(i);
    l !== void 0 && (this.sheetObjects.delete(i), this.sheetObjectCBs.delete(i), this.sheetObjectUnsubscribe.delete(i), l());
  }
  handleApp(n, a, t) {
    const r = a;
    let i;
    switch (t.event) {
      case "setSheet":
        i = r.sheets.get(t.data.sheet), i !== void 0 && (r.activeSheet = i, this.studio?.setSelection([i]));
        break;
      case "setSheetObject":
        i = r.sheetObjects.get(`${t.data.sheet}_${t.data.key}`), i !== void 0 && this.studio?.setSelection([i]);
        break;
      case "updateSheetObject":
        i = r.sheets.get(t.data.sheet), i !== void 0 && i.sequence.pause(), i = r.sheetObjectCBs.get(t.data.sheetObject), i !== void 0 && i(t.data.values);
        break;
      case "updateTimeline":
        i = r.sheets.get(t.data.sheet), r.activeSheet !== void 0 && (r.activeSheet.sequence.position = t.data.position);
        break;
    }
  }
  handleEditor(n, a, t) {
    if (n.editor) {
      const r = a;
      switch (t.event) {
        case "playSheet":
          r.sheet(t.data.sheet)?.sequence.play(t.data.value);
          break;
        case "pauseSheet":
          r.sheet(t.data.sheet)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(n, a) {
    if (n.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((l) => {
        l.length < 1 || l.forEach((c) => {
          let d = c.address.sheetId, h = "setSheet", f = {};
          switch (c.type) {
            case "Theatre_Sheet_PublicAPI":
              h = "setSheet", f = {
                sheet: c.address.sheetId
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              h = "setSheetObject", d += `_${c.address.objectKey}`, f = {
                id: d,
                sheet: c.address.sheetId,
                key: c.address.objectKey
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
          }
          n.send({ event: h, target: "app", data: f });
        });
      });
      let t = -1;
      const r = () => {
        if (Ht.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
          t = a.activeSheet.sequence.position;
          const l = a.activeSheet;
          n.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: t,
              sheet: l.address.sheetId
            }
          });
        }
      }, i = () => {
        r(), requestAnimationFrame(i);
      };
      r(), i();
    } else
      this.studio?.ui.hide();
  }
}
function Ni(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((l) => {
      l.length < 1 || l.forEach((c) => {
        let d = c.address.sheetId, h = "setSheet", f = {};
        switch (c.type) {
          case "Theatre_Sheet_PublicAPI":
            h = "setSheet", f = {
              sheet: c.address.sheetId
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            h = "setSheetObject", d += `_${c.address.objectKey}`, f = {
              id: d,
              sheet: c.address.sheetId,
              key: c.address.objectKey
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
        }
        e.send({ event: h, target: "app", data: f });
      });
    });
    let t = -1;
    const r = () => {
      if (Ht.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
        t = n.activeSheet.sequence.position;
        const l = n.activeSheet;
        e.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: t,
            sheet: l.address.sheetId
          }
        });
      }
    }, i = () => {
      r(), requestAnimationFrame(i);
    };
    r(), i();
  } else
    a.ui.hide();
}
function ja(e) {
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
function Nn(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((a) => {
    n.children.push(Nn(a));
  }), n;
}
function Da(e) {
  const n = {};
  for (const a in e) {
    const t = e[a].value;
    n[a] = { value: t }, t === null ? n[a].value = { src: "" } : t.isTexture && (n[a].value = { src: t.image.src });
  }
  return n;
}
function Ia(e) {
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
function rt(e) {
  const n = {};
  for (const a in e) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Ia(a))
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
            if (r instanceof hn) {
              const i = r.source.toJSON();
              n[a] = { src: i.url };
            } else
              r instanceof Gn && (console.log("env map"), console.log(r.source.data), console.log(r.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Da(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function jt(e) {
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
      t.material.forEach((i) => {
        r.push(rt(i));
      }), n.material = r;
    } else
      n.material = rt(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const r = [];
      t.material.forEach((i) => {
        r.push(rt(i));
      }), n.material = r;
    } else
      n.material = rt(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const r = [];
      t.material.forEach((i) => {
        r.push(rt(i));
      }), n.material = r;
    } else
      n.material = rt(t.material);
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
      groundColor: e.groundColor,
      width: e.width,
      height: e.height
    });
  return n;
}
function Na(e, n) {
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
function k(e, n, a) {
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
function Ot(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const r = new hn(t);
      r.wrapS = Vt, r.wrapT = Vt, r.needsUpdate = !0, n(r);
    }, t.onerror = a, t.src = e;
  });
}
class Li extends _t {
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
    const a = jt(n);
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
    Aa(), Dn(this.scene);
    const a = Nn(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = jt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = jt(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
  handleApp(n, a, t) {
    switch (t.event) {
      case "getObject":
        B.dispatchEvent({ type: F.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        B.dispatchEvent({ type: F.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        B.dispatchEvent({ type: F.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        B.dispatchEvent({ type: F.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        B.dispatchEvent({ type: F.SET_OBJECT, value: t.data });
        break;
      case "setScene":
        B.dispatchEvent({ type: F.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        B.dispatchEvent({ type: F.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        B.dispatchEvent({ type: F.REMOVE_CAMERA, value: t.data });
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
class Bi extends _t {
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
    this.pane = new Oa({ title: "GUI" }), this.pane.registerPlugin(Ma);
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
    const i = this.bindID, l = t.onChange !== void 0 ? t.onChange : Ut;
    this.bindCBs.set(i, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (r !== void 0 ? r : this.pane).addBinding(n, a, t).on("change", (d) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: i,
          value: d.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: i,
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
  handleApp(n, a, t) {
    const r = a;
    switch (t.event) {
      case "addFolder":
        r.addFolder(t.data.name, t.data.params, t.data.parent);
        break;
      case "bindObject":
        r.bind(t.data.name, t.data.params, t.data.parent);
        break;
      case "updateBind":
        r.triggerBind(t.data.id, t.data.value);
        break;
      case "addButton":
        r.button(t.data.name, t.data.callback, t.data.parent);
        break;
      case "clickButton":
        r.triggerButton(t.data.id);
        break;
    }
  }
}
var $t = { exports: {} }, dt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tn;
function La() {
  if (tn)
    return dt;
  tn = 1;
  var e = kn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, r = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(c, d, h) {
    var f, m = {}, y = null, Y = null;
    h !== void 0 && (y = "" + h), d.key !== void 0 && (y = "" + d.key), d.ref !== void 0 && (Y = d.ref);
    for (f in d)
      t.call(d, f) && !i.hasOwnProperty(f) && (m[f] = d[f]);
    if (c && c.defaultProps)
      for (f in d = c.defaultProps, d)
        m[f] === void 0 && (m[f] = d[f]);
    return { $$typeof: n, type: c, key: y, ref: Y, props: m, _owner: r.current };
  }
  return dt.Fragment = a, dt.jsx = l, dt.jsxs = l, dt;
}
var ht = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nn;
function Ba() {
  return nn || (nn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = kn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), T = Symbol.iterator, W = "@@iterator";
    function P(s) {
      if (s === null || typeof s != "object")
        return null;
      var p = T && s[T] || s[W];
      return typeof p == "function" ? p : null;
    }
    var M = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function $(s) {
      {
        for (var p = arguments.length, b = new Array(p > 1 ? p - 1 : 0), C = 1; C < p; C++)
          b[C - 1] = arguments[C];
        I("error", s, b);
      }
    }
    function I(s, p, b) {
      {
        var C = M.ReactDebugCurrentFrame, U = C.getStackAddendum();
        U !== "" && (p += "%s", b = b.concat([U]));
        var V = b.map(function(j) {
          return String(j);
        });
        V.unshift("Warning: " + p), Function.prototype.apply.call(console[s], console, V);
      }
    }
    var te = !1, ie = !1, Se = !1, K = !1, ve = !1, he;
    he = Symbol.for("react.module.reference");
    function _e(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === t || s === i || ve || s === r || s === h || s === f || K || s === Y || te || ie || Se || typeof s == "object" && s !== null && (s.$$typeof === y || s.$$typeof === m || s.$$typeof === l || s.$$typeof === c || s.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === he || s.getModuleId !== void 0));
    }
    function Te(s, p, b) {
      var C = s.displayName;
      if (C)
        return C;
      var U = p.displayName || p.name || "";
      return U !== "" ? b + "(" + U + ")" : b;
    }
    function be(s) {
      return s.displayName || "Context";
    }
    function N(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case t:
          return "Fragment";
        case a:
          return "Portal";
        case i:
          return "Profiler";
        case r:
          return "StrictMode";
        case h:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case c:
            var p = s;
            return be(p) + ".Consumer";
          case l:
            var b = s;
            return be(b._context) + ".Provider";
          case d:
            return Te(s, s.render, "ForwardRef");
          case m:
            var C = s.displayName || null;
            return C !== null ? C : N(s.type) || "Memo";
          case y: {
            var U = s, V = U._payload, j = U._init;
            try {
              return N(j(V));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ye = Object.assign, E = 0, we, Re, je, Pe, Ae, De, Be;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function re() {
      {
        if (E === 0) {
          we = console.log, Re = console.info, je = console.warn, Pe = console.error, Ae = console.group, De = console.groupCollapsed, Be = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: Fe,
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
        E++;
      }
    }
    function Oe() {
      {
        if (E--, E === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ye({}, s, {
              value: we
            }),
            info: ye({}, s, {
              value: Re
            }),
            warn: ye({}, s, {
              value: je
            }),
            error: ye({}, s, {
              value: Pe
            }),
            group: ye({}, s, {
              value: Ae
            }),
            groupCollapsed: ye({}, s, {
              value: De
            }),
            groupEnd: ye({}, s, {
              value: Be
            })
          });
        }
        E < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ye = M.ReactCurrentDispatcher, Ge;
    function pe(s, p, b) {
      {
        if (Ge === void 0)
          try {
            throw Error();
          } catch (U) {
            var C = U.stack.trim().match(/\n( *(at )?)/);
            Ge = C && C[1] || "";
          }
        return `
` + Ge + s;
      }
    }
    var g = !1, v;
    {
      var S = typeof WeakMap == "function" ? WeakMap : Map;
      v = new S();
    }
    function D(s, p) {
      if (!s || g)
        return "";
      {
        var b = v.get(s);
        if (b !== void 0)
          return b;
      }
      var C;
      g = !0;
      var U = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var V;
      V = Ye.current, Ye.current = null, re();
      try {
        if (p) {
          var j = function() {
            throw Error();
          };
          if (Object.defineProperty(j.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(j, []);
            } catch (Ne) {
              C = Ne;
            }
            Reflect.construct(s, [], j);
          } else {
            try {
              j.call();
            } catch (Ne) {
              C = Ne;
            }
            s.call(j.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ne) {
            C = Ne;
          }
          s();
        }
      } catch (Ne) {
        if (Ne && C && typeof Ne.stack == "string") {
          for (var A = Ne.stack.split(`
`), me = C.stack.split(`
`), Q = A.length - 1, ne = me.length - 1; Q >= 1 && ne >= 0 && A[Q] !== me[ne]; )
            ne--;
          for (; Q >= 1 && ne >= 0; Q--, ne--)
            if (A[Q] !== me[ne]) {
              if (Q !== 1 || ne !== 1)
                do
                  if (Q--, ne--, ne < 0 || A[Q] !== me[ne]) {
                    var Ee = `
` + A[Q].replace(" at new ", " at ");
                    return s.displayName && Ee.includes("<anonymous>") && (Ee = Ee.replace("<anonymous>", s.displayName)), typeof s == "function" && v.set(s, Ee), Ee;
                  }
                while (Q >= 1 && ne >= 0);
              break;
            }
        }
      } finally {
        g = !1, Ye.current = V, Oe(), Error.prepareStackTrace = U;
      }
      var nt = s ? s.displayName || s.name : "", Gt = nt ? pe(nt) : "";
      return typeof s == "function" && v.set(s, Gt), Gt;
    }
    function se(s, p, b) {
      return D(s, !1);
    }
    function O(s) {
      var p = s.prototype;
      return !!(p && p.isReactComponent);
    }
    function w(s, p, b) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return D(s, O(s));
      if (typeof s == "string")
        return pe(s);
      switch (s) {
        case h:
          return pe("Suspense");
        case f:
          return pe("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case d:
            return se(s.render);
          case m:
            return w(s.type, p, b);
          case y: {
            var C = s, U = C._payload, V = C._init;
            try {
              return w(V(U), p, b);
            } catch {
            }
          }
        }
      return "";
    }
    var L = Object.prototype.hasOwnProperty, oe = {}, ce = M.ReactDebugCurrentFrame;
    function R(s) {
      if (s) {
        var p = s._owner, b = w(s.type, s._source, p ? p.type : null);
        ce.setExtraStackFrame(b);
      } else
        ce.setExtraStackFrame(null);
    }
    function G(s, p, b, C, U) {
      {
        var V = Function.call.bind(L);
        for (var j in s)
          if (V(s, j)) {
            var A = void 0;
            try {
              if (typeof s[j] != "function") {
                var me = Error((C || "React class") + ": " + b + " type `" + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[j] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw me.name = "Invariant Violation", me;
              }
              A = s[j](p, j, C, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              A = Q;
            }
            A && !(A instanceof Error) && (R(U), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", b, j, typeof A), R(null)), A instanceof Error && !(A.message in oe) && (oe[A.message] = !0, R(U), $("Failed %s type: %s", b, A.message), R(null));
          }
      }
    }
    var J = Array.isArray;
    function Ie(s) {
      return J(s);
    }
    function et(s) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, b = p && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return b;
      }
    }
    function vt(s) {
      try {
        return bt(s), !1;
      } catch {
        return !0;
      }
    }
    function bt(s) {
      return "" + s;
    }
    function yt(s) {
      if (vt(s))
        return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", et(s)), bt(s);
    }
    var $e = M.ReactCurrentOwner, ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, lt, xt, tt;
    tt = {};
    function Tt(s) {
      if (L.call(s, "ref")) {
        var p = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Rt(s) {
      if (L.call(s, "key")) {
        var p = Object.getOwnPropertyDescriptor(s, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function Ct(s, p) {
      if (typeof s.ref == "string" && $e.current && p && $e.current.stateNode !== p) {
        var b = N($e.current.type);
        tt[b] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N($e.current.type), s.ref), tt[b] = !0);
      }
    }
    function Ue(s, p) {
      {
        var b = function() {
          lt || (lt = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function Yt(s, p) {
      {
        var b = function() {
          xt || (xt = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var o = function(s, p, b, C, U, V, j) {
      var A = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: p,
        ref: b,
        props: j,
        // Record the component responsible for creating this element.
        _owner: V
      };
      return A._store = {}, Object.defineProperty(A._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(A, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(A, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: U
      }), Object.freeze && (Object.freeze(A.props), Object.freeze(A)), A;
    };
    function x(s, p, b, C, U) {
      {
        var V, j = {}, A = null, me = null;
        b !== void 0 && (yt(b), A = "" + b), Rt(p) && (yt(p.key), A = "" + p.key), Tt(p) && (me = p.ref, Ct(p, U));
        for (V in p)
          L.call(p, V) && !ct.hasOwnProperty(V) && (j[V] = p[V]);
        if (s && s.defaultProps) {
          var Q = s.defaultProps;
          for (V in Q)
            j[V] === void 0 && (j[V] = Q[V]);
        }
        if (A || me) {
          var ne = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          A && Ue(j, ne), me && Yt(j, ne);
        }
        return o(s, A, me, U, C, $e.current, j);
      }
    }
    var _ = M.ReactCurrentOwner, H = M.ReactDebugCurrentFrame;
    function X(s) {
      if (s) {
        var p = s._owner, b = w(s.type, s._source, p ? p.type : null);
        H.setExtraStackFrame(b);
      } else
        H.setExtraStackFrame(null);
    }
    var xe;
    xe = !1;
    function fe(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function Pt() {
      {
        if (_.current) {
          var s = N(_.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function At(s) {
      {
        if (s !== void 0) {
          var p = s.fileName.replace(/^.*[\\\/]/, ""), b = s.lineNumber;
          return `

Check your code at ` + p + ":" + b + ".";
        }
        return "";
      }
    }
    var ut = {};
    function Me(s) {
      {
        var p = Pt();
        if (!p) {
          var b = typeof s == "string" ? s : s.displayName || s.name;
          b && (p = `

Check the top-level render call using <` + b + ">.");
        }
        return p;
      }
    }
    function Ce(s, p) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var b = Me(p);
        if (ut[b])
          return;
        ut[b] = !0;
        var C = "";
        s && s._owner && s._owner !== _.current && (C = " It was passed a child from " + N(s._owner.type) + "."), X(s), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, C), X(null);
      }
    }
    function Ve(s, p) {
      {
        if (typeof s != "object")
          return;
        if (Ie(s))
          for (var b = 0; b < s.length; b++) {
            var C = s[b];
            fe(C) && Ce(C, p);
          }
        else if (fe(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var U = P(s);
          if (typeof U == "function" && U !== s.entries)
            for (var V = U.call(s), j; !(j = V.next()).done; )
              fe(j.value) && Ce(j.value, p);
        }
      }
    }
    function We(s) {
      {
        var p = s.type;
        if (p == null || typeof p == "string")
          return;
        var b;
        if (typeof p == "function")
          b = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === m))
          b = p.propTypes;
        else
          return;
        if (b) {
          var C = N(p);
          G(b, s.props, "prop", C, s);
        } else if (p.PropTypes !== void 0 && !xe) {
          xe = !0;
          var U = N(p);
          $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", U || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qe(s) {
      {
        for (var p = Object.keys(s.props), b = 0; b < p.length; b++) {
          var C = p[b];
          if (C !== "children" && C !== "key") {
            X(s), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), X(null);
            break;
          }
        }
        s.ref !== null && (X(s), $("Invalid attribute `ref` supplied to `React.Fragment`."), X(null));
      }
    }
    function Ke(s, p, b, C, U, V) {
      {
        var j = _e(s);
        if (!j) {
          var A = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (A += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var me = At(U);
          me ? A += me : A += Pt();
          var Q;
          s === null ? Q = "null" : Ie(s) ? Q = "array" : s !== void 0 && s.$$typeof === n ? (Q = "<" + (N(s.type) || "Unknown") + " />", A = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof s, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, A);
        }
        var ne = x(s, p, b, U, V);
        if (ne == null)
          return ne;
        if (j) {
          var Ee = p.children;
          if (Ee !== void 0)
            if (C)
              if (Ie(Ee)) {
                for (var nt = 0; nt < Ee.length; nt++)
                  Ve(Ee[nt], s);
                Object.freeze && Object.freeze(Ee);
              } else
                $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ve(Ee, s);
        }
        return s === t ? qe(ne) : We(ne), ne;
      }
    }
    function Un(s, p, b) {
      return Ke(s, p, b, !0);
    }
    function Hn(s, p, b) {
      return Ke(s, p, b, !1);
    }
    var zn = Hn, Yn = Un;
    ht.Fragment = t, ht.jsx = zn, ht.jsxs = Yn;
  }()), ht;
}
process.env.NODE_ENV === "production" ? $t.exports = La() : $t.exports = Ba();
var u = $t.exports;
function Ln(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ u.jsx("button", { children: e.title });
}
const Fa = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), $a = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Ua(e) {
  return /* @__PURE__ */ u.jsx(jn.Item, { value: e.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    $a,
    /* @__PURE__ */ u.jsx("span", { children: e.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Fa })
  ] }) }, e.title);
}
function Ha(e) {
  const [n, a] = ee(!1), [t, r] = ee(e.options), i = (h) => {
    e.onDragComplete(h), r(h);
  }, l = (h) => {
    const f = [...t];
    f.splice(h, 1), i(f);
  }, c = [];
  t.forEach((h, f) => {
    c.push(/* @__PURE__ */ u.jsx(Ua, { index: f, title: h, onDelete: l }, h));
  });
  let d = "dropdown draggable";
  return e.subdropdown && (d += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ u.jsx(Ln, { title: e.title }),
    /* @__PURE__ */ u.jsx(jn.Group, { axis: "y", values: t, onReorder: i, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function za(e) {
  const [n, a] = ee(!1), t = [];
  e.options.map((i, l) => {
    e.onSelect !== void 0 && (i.onSelect = e.onSelect), t.push(/* @__PURE__ */ u.jsx(Ya, { option: i }, l));
  });
  let r = "dropdown";
  return e.subdropdown && (r += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: r,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ u.jsx(Ln, { title: e.title }),
        /* @__PURE__ */ u.jsx(
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
function Ya(e) {
  const { option: n } = e, [a, t] = ee("");
  let r;
  switch (n.type) {
    case "draggable":
      r = /* @__PURE__ */ u.jsx(
        Ha,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (i) => {
            n.onDragComplete !== void 0 && n.onDragComplete(i);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      r = /* @__PURE__ */ u.jsx(
        za,
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
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (a !== n.title ? t(n.title) : t(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ u.jsx("li", { className: a === n.title ? "selected" : "", children: r }, Ta());
}
function Fi(e, n, a) {
  function t(i) {
    switch (n.forEach((l) => {
      l.callback(e, l.remote, i);
    }), i.event) {
      case "custom":
        B.dispatchEvent({ type: F.CUSTOM, value: i.data });
        break;
    }
  }
  function r(i) {
    switch (a.forEach((l) => {
      l.callback(e, l.remote, i);
    }), i.event) {
      case "custom":
        B.dispatchEvent({ type: F.CUSTOM, value: i.data });
        break;
    }
  }
  e.listen = (i) => {
    i.target === "editor" ? r(i) : t(i);
  };
}
function zt(e) {
  const [n, a] = ee(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !n;
          e.onToggle !== void 0 && e.onToggle(r), a(r);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: Je(e.label) })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: e.children }) })
  ] });
}
function Bn(e) {
  const [n, a] = ee(!1), t = e.child !== void 0 && e.child.children.length > 0, r = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((i) => {
    r.push(/* @__PURE__ */ u.jsx(Bn, { child: i, three: e.three }, Math.random()));
  }), /* @__PURE__ */ u.jsx(u.Fragment, { children: e.child !== void 0 && /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      t ? /* @__PURE__ */ u.jsx(
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
            left: t ? "20px" : "5px"
          },
          onClick: () => {
            e.child !== void 0 && (e.three.getObject(e.child.uuid), n || a(!0));
          },
          children: e.child.name.length > 0 ? `${e.child.name} (${e.child.type})` : `${e.child.type}::${e.child.uuid}`
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${ja(e.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function Ga(e) {
  const n = [];
  return e.child?.children.map((a) => {
    n.push(/* @__PURE__ */ u.jsx(Bn, { child: a, three: e.three }, Math.random()));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const Va = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Wa(e) {
  return "items" in e;
}
function Qe(e) {
  const n = [];
  return e.items.forEach((a) => {
    Wa(a) ? n.push(
      /* @__PURE__ */ u.jsx(Qe, { title: Je(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ u.jsx(
        pt,
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
  }), /* @__PURE__ */ u.jsx(zt, { label: e.title, open: e.expanded === !0, children: n });
}
function qa(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "blendAlpha" || e === "blendColor" || e === "blendDstAlpha" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function Ka(e) {
  switch (e) {
    case "Alpha Map":
      return "alphaMap";
    case "Anisotropy Map":
      return "anisotropyMap";
    case "AO Map":
      return "aoMap";
    case "Bump Map":
      return "bumpMap";
    case "Clearcoat Map":
      return "clearcoatMap";
    case "Clearcoat Normal Map":
      return "clearcoatNormalMap";
    case "Clearcoat Roughness Map":
      return "clearcoatRoughnessMap";
    case "Displacement Map":
      return "displacementMap";
    case "Emissive Map":
      return "emissiveMap";
    case "Iridescence Map":
      return "iridescenceMap";
    case "Iridescence Thickness Map":
      return "iridescenceThicknessMap";
    case "Map":
      return "map";
    case "Matcap":
      return "matcap";
    case "Normal Map":
      return "normalMap";
    case "Roughness Map":
      return "roughnessMap";
    case "Sheen Color Map":
      return "sheenColorMap";
    case "Sheen Roughness Map":
      return "sheenRoughnessMap";
    case "Specular Color Map":
      return "specularColorMap";
    case "Specular Map Intensity":
      return "specularIntensityMap";
    case "Thickness Map":
      return "thicknessMap";
    case "Transmission Map":
      return "transmissionMap";
  }
  return e;
}
function z(e) {
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
function Fn(e) {
  return e.toLowerCase().search("intensity") > -1 || e === "anisotropyRotation" || e === "blendAlpha" || e === "bumpScale" || e === "clearcoatRoughness" || e === "displacementBias" || e === "displacementScale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionRatio" || e === "roughness" || e === "sheenRoughness" || e === "thickness";
}
function Xa() {
  const e = document.createElement("input");
  return e.type = "file", new Promise((n, a) => {
    e.addEventListener("change", function() {
      if (e.files === null)
        a();
      else {
        const t = e.files[0], r = new FileReader();
        r.onload = function(i) {
          n(i.target.result);
        }, r.readAsDataURL(t);
      }
    }), e.click();
  });
}
const Za = [
  {
    title: "Front",
    value: Vn
  },
  {
    title: "Back",
    value: fn
  },
  {
    title: "Double",
    value: pn
  }
], Ja = [
  {
    title: "No Blending",
    value: Wn
  },
  {
    title: "Normal",
    value: qn
  },
  {
    title: "Additive",
    value: Kn
  },
  {
    title: "Subtractive",
    value: Xn
  },
  {
    title: "Multiply",
    value: Zn
  },
  {
    title: "Custom",
    value: Jn
  }
], Qa = [
  {
    title: "Add",
    value: Qn
  },
  {
    title: "Subtract",
    value: ea
  },
  {
    title: "Reverse Subtract",
    value: ta
  },
  {
    title: "Min",
    value: na
  },
  {
    title: "Max",
    value: aa
  }
], ei = [
  {
    title: "Zero",
    valye: mn
  },
  {
    title: "One",
    valye: gn
  },
  {
    title: "Src Color",
    valye: vn
  },
  {
    title: "One Minus Src Color",
    valye: bn
  },
  {
    title: "Src Alpha",
    valye: yn
  },
  {
    title: "One Minus Src Alpha",
    valye: xn
  },
  {
    title: "Dst Alpha",
    valye: Cn
  },
  {
    title: "One Minus Dst Alpha",
    valye: En
  },
  {
    title: "Dst Color",
    valye: Sn
  },
  {
    title: "One Minus Dst Color",
    valye: wn
  },
  {
    title: "Src Alpha Saturate",
    valye: ia
  },
  {
    title: "Constant Color",
    valye: On
  },
  {
    title: "One Minus Constant Color",
    valye: Mn
  },
  {
    title: "Constant Alpha",
    valye: _n
  },
  {
    title: "One Minus Constant Alpha",
    valye: Tn
  }
], ti = [
  {
    title: "Zero",
    valye: mn
  },
  {
    title: "One",
    valye: gn
  },
  {
    title: "Src Color",
    valye: vn
  },
  {
    title: "One Minus Src Color",
    valye: bn
  },
  {
    title: "Src Alpha",
    valye: yn
  },
  {
    title: "One Minus Src Alpha",
    valye: xn
  },
  {
    title: "Dst Alpha",
    valye: Cn
  },
  {
    title: "One Minus Dst Alpha",
    valye: En
  },
  {
    title: "Dst Color",
    valye: Sn
  },
  {
    title: "One Minus Dst Color",
    valye: wn
  },
  {
    title: "Constant Color",
    valye: On
  },
  {
    title: "One Minus Constant Color",
    valye: Mn
  },
  {
    title: "Constant Alpha",
    valye: _n
  },
  {
    title: "One Minus Constant Alpha",
    valye: Tn
  }
];
function ft(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ni(e, n, a, t) {
  return {
    type: "boolean",
    title: z(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (r, i) => {
      t.updateObject(a.uuid, `material.${e}`, i), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const l = t.scene?.getObjectByProperty("uuid", a.uuid);
      l !== void 0 && k(l, `material.${e}`, i);
    }
  };
}
function ai(e, n, a, t) {
  const r = {
    type: "number",
    title: z(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (i, l) => {
      t.updateObject(a.uuid, `material.${e}`, l), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const c = t.scene?.getObjectByProperty("uuid", a.uuid);
      c !== void 0 && k(c, `material.${e}`, l);
    }
  };
  switch (e) {
    case "blending":
      ft(r, Ja);
      break;
    case "blendDst":
      ft(r, ti);
      break;
    case "blendEquation":
      ft(r, Qa);
      break;
    case "blendSrc":
      ft(r, ei);
      break;
    case "side":
      ft(r, Za);
      break;
  }
  return Fn(e) && (r.value = Number(n), r.type = "range", r.min = 0, r.max = 1, r.step = 0.01), r;
}
function ii(e, n, a, t) {
  const r = {
    type: "string",
    title: z(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (l, c) => {
      t.updateObject(a.uuid, `material.${e}`, c), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const d = t.scene?.getObjectByProperty("uuid", a.uuid);
      d !== void 0 && k(d, `material.${e}`, c);
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (r.disabled = !1, r.latest = r.value, r.onChange = (l, c) => {
    r.latest = c;
  }), r;
}
function Dt(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function It(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function Nt(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function ri(e, n, a, t) {
  const r = [];
  if (n.isColor)
    return {
      title: z(e),
      prop: e,
      type: "color",
      value: n,
      onChange: (i, l) => {
        const c = new mt(l);
        t.updateObject(a.uuid, `material.${e}`, c);
        const d = t.scene?.getObjectByProperty("uuid", a.uuid);
        d !== void 0 && k(d, `material.${e}`, c);
      }
    };
  if (Array.isArray(n)) {
    for (const i in n)
      r.push({
        title: `${i}`,
        type: `${typeof n[i]}`,
        value: n[i],
        onChange: (l, c) => {
          t.updateObject(a.uuid, `material.${e}`, c);
          const d = t.scene?.getObjectByProperty("uuid", a.uuid);
          d !== void 0 && k(d, `material.${e}`, c);
        }
      });
    return {
      title: z(e),
      items: r
    };
  } else {
    if (Dt(n))
      return {
        title: z(e),
        prop: e,
        type: "vector2",
        value: n,
        onChange: (i, l) => {
          t.updateObject(a.uuid, `material.${e}`, l);
          const c = t.scene?.getObjectByProperty("uuid", a.uuid);
          c !== void 0 && k(c, `material.${e}`, l);
        }
      };
    if (It(n))
      return {
        title: z(e),
        prop: e,
        type: "grid3",
        value: n,
        onChange: (i, l) => {
          t.updateObject(a.uuid, `material.${e}`, l);
          const c = t.scene?.getObjectByProperty("uuid", a.uuid);
          c !== void 0 && k(c, `material.${e}`, l);
        }
      };
    if (Nt(n))
      return {
        title: z(e),
        prop: e,
        type: "grid4",
        value: n,
        onChange: (i, l) => {
          t.updateObject(a.uuid, `material.${e}`, l);
          const c = t.scene?.getObjectByProperty("uuid", a.uuid);
          c !== void 0 && k(c, `material.${e}`, l);
        }
      };
    if (n.src !== void 0)
      return {
        title: z(e),
        type: "image",
        value: n,
        onChange: (i, l) => {
          const c = Ka(e);
          t.createTexture(a.uuid, `material.${c}`, l);
          const d = t.scene?.getObjectByProperty("uuid", a.uuid);
          d !== void 0 && Ot(l).then((h) => {
            k(d, `material.${c}`, h), k(d, "material.needsUpdate", !0);
          });
        }
      };
    switch (e) {
      case "defines":
        for (const i in n)
          r.push({
            title: Je(`${i}`),
            type: "string",
            value: n[i].toString(),
            disabled: !0
          });
        if (r.length > 0)
          return {
            title: z(e),
            items: r
          };
        break;
      case "extensions":
        for (const i in n)
          r.push({
            title: Je(`${i}`),
            type: "boolean",
            value: n[i],
            disabled: !0
          });
        if (r.length > 0)
          return {
            title: z(e),
            items: r
          };
        break;
      case "uniforms":
        for (const i in n) {
          const l = n[i].value, c = typeof l;
          if (l.isColor)
            r.push({
              title: z(i),
              prop: i,
              type: "color",
              value: l,
              onChange: (d, h) => {
                const f = new mt(h);
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, f);
                const m = t.scene?.getObjectByProperty("uuid", a.uuid);
                m !== void 0 && k(m, `material.uniforms.${i}.value`, f);
              }
            });
          else if (Array.isArray(l)) {
            const d = [];
            for (const h in l)
              d.push({
                title: `${h}`,
                type: `${typeof l[h]}`,
                value: l[h],
                onChange: (f, m) => {
                  t.updateObject(a.uuid, `material.uniforms.${i}.value.${h}`, m);
                  const y = t.scene?.getObjectByProperty("uuid", a.uuid);
                  y !== void 0 && k(y, `material.uniforms.${i}.value.${h}`, m);
                }
              });
            r.push({
              title: z(i),
              items: d
            });
          } else if (Dt(l))
            r.push({
              title: `${z(i)}`,
              prop: i,
              type: "vector2",
              value: l,
              onChange: (d, h) => {
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", a.uuid);
                f !== void 0 && k(f, `material.uniforms.${i}.value`, h);
              }
            });
          else if (It(l))
            r.push({
              title: `${z(i)}`,
              prop: i,
              type: "grid3",
              value: l,
              onChange: (d, h) => {
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", a.uuid);
                f !== void 0 && k(f, `material.uniforms.${i}.value`, h);
              }
            });
          else if (Nt(l))
            r.push({
              title: `${z(i)}`,
              prop: i,
              type: "grid4",
              value: l,
              onChange: (d, h) => {
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", a.uuid);
                f !== void 0 && k(f, `material.uniforms.${i}.value`, h);
              }
            });
          else if (c === "number") {
            const d = {
              title: z(i),
              prop: i,
              type: "number",
              value: l,
              step: 0.01,
              onChange: (h, f) => {
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, f);
                const m = t.scene?.getObjectByProperty("uuid", a.uuid);
                m !== void 0 && k(m, `material.uniforms.${i}.value`, f);
              }
            };
            Fn(i) && (d.type = "range", d.min = 0, d.max = 1), r.push(d);
          } else if (c === "string")
            r.push({
              title: z(i),
              prop: i,
              type: c,
              value: l,
              onChange: (d, h) => {
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", a.uuid);
                f !== void 0 && k(f, `material.uniforms.${i}.value`, h);
              }
            });
          else if (l.src !== void 0)
            r.push({
              title: z(i),
              type: "image",
              value: l.src,
              onChange: (d, h) => {
                const f = `material.uniforms.${i}.value`;
                t.createTexture(a.uuid, f, h);
                const m = t.scene?.getObjectByProperty("uuid", a.uuid);
                m !== void 0 && Ot(h).then((y) => {
                  k(m, f, y), k(m, "material.needsUpdate", !0);
                });
              }
            });
          else if (l.elements !== void 0)
            r.push({
              title: `${z(i)}`,
              prop: i,
              type: l.elements.length > 9 ? "grid4" : "grid3",
              value: l,
              onChange: (d, h) => {
                t.updateObject(a.uuid, `material.uniforms.${i}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", a.uuid);
                f !== void 0 && k(f, `material.uniforms.${i}.value`, h);
              }
            });
          else {
            const d = [], h = l;
            for (const f in h) {
              const m = f, y = h[f], Y = typeof y, T = `material.uniforms.${i}.value.${m}`;
              y.isColor ? d.push({
                title: z(m),
                prop: m,
                type: "color",
                value: y,
                onChange: (W, P) => {
                  const M = new mt(P);
                  t.updateObject(a.uuid, T, M);
                  const $ = t.scene?.getObjectByProperty("uuid", a.uuid);
                  $ !== void 0 && k($, T, M);
                }
              }) : Dt(y) ? d.push({
                title: `${z(m)}`,
                prop: m,
                type: "vector2",
                value: y,
                onChange: (W, P) => {
                  t.updateObject(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && k(M, T, P);
                }
              }) : It(y) ? d.push({
                title: `${z(m)}`,
                prop: m,
                type: "vector3",
                value: y,
                onChange: (W, P) => {
                  t.updateObject(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && k(M, T, P);
                }
              }) : Nt(y) ? d.push({
                title: `${z(m)}`,
                prop: m,
                type: "vector4",
                value: y,
                onChange: (W, P) => {
                  t.updateObject(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && k(M, T, P);
                }
              }) : Y === "number" ? d.push({
                title: z(m),
                prop: m,
                type: "number",
                value: y,
                step: 0.01,
                onChange: (W, P) => {
                  t.updateObject(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && k(M, T, P);
                }
              }) : Y === "string" ? d.push({
                title: z(m),
                prop: m,
                type: "string",
                value: y,
                onChange: (W, P) => {
                  t.updateObject(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && k(M, T, P);
                }
              }) : y.src !== void 0 ? d.push({
                title: z(m),
                type: "image",
                value: y.src,
                onChange: (W, P) => {
                  t.createTexture(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && Ot(P).then(($) => {
                    k(M, T, $), k(M, "material.needsUpdate", !0);
                  });
                }
              }) : y.elements !== void 0 && d.push({
                title: z(m),
                prop: m,
                type: y.elements.length > 9 ? "grid4" : "grid3",
                value: y,
                step: 0.01,
                onChange: (W, P) => {
                  t.updateObject(a.uuid, T, P);
                  const M = t.scene?.getObjectByProperty("uuid", a.uuid);
                  M !== void 0 && k(M, T, P);
                }
              });
            }
            d.length > 0 && (d.sort((f, m) => f.title < m.title ? -1 : f.title > m.title ? 1 : 0), r.push({
              title: Je(i),
              items: d
            }));
          }
        }
        if (r.sort((i, l) => i.title < l.title ? -1 : i.title > l.title ? 1 : 0), r.length > 0)
          return {
            title: z(e),
            items: r
          };
        break;
      default:
        console.log(">>> other prop to add...", e);
        break;
    }
  }
}
function an(e, n, a) {
  const t = [];
  for (const r in e) {
    if (!qa(r))
      continue;
    const i = typeof e[r], l = e[r];
    if (i === "boolean")
      t.push(ni(r, l, n, a));
    else if (i === "number")
      t.push(ai(r, l, n, a));
    else if (i === "string")
      t.push(ii(r, l, n, a));
    else if (i === "object") {
      const c = ri(r, l, n, a);
      c !== void 0 && t.push(c);
    } else
      l !== void 0 && console.log("other:", r, i, l);
  }
  return t.sort((r, i) => r.title < i.title ? -1 : r.title > i.title ? 1 : 0), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), t;
}
function si(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], r = a.length;
    for (let i = 0; i < r; i++)
      t.push(
        /* @__PURE__ */ u.jsx(
          Qe,
          {
            title: `Material ${i}`,
            items: an(a[i], e, n)
          },
          `Material ${i}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: t });
  } else
    return /* @__PURE__ */ u.jsx(
      Qe,
      {
        title: "Material",
        items: an(a, e, n)
      }
    );
}
function oi(e) {
  const [n, a] = ee(e.defaultValue);
  return ke(() => {
    let t = !1, r = -1, i = 0, l = e.defaultValue;
    const c = (y) => {
      t = !0, i = Number(e.input.current?.value), r = y.clientX, document.addEventListener("mouseup", h, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("contextmenu", h, !1);
    }, d = (y) => {
      if (!t)
        return;
      const Y = e.step !== void 0 ? e.step : 1, T = (y.clientX - r) * Y;
      l = Number((i + T).toFixed(4)), e.min !== void 0 && (l = Math.max(l, e.min)), e.max !== void 0 && (l = Math.min(l, e.max)), e.onChange !== void 0 && e.onChange(l), a(l);
    }, h = () => {
      t = !1, document.removeEventListener("mouseup", h), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", h);
    }, f = (y) => {
      const Y = Number(y.target.value);
      a(Y);
    }, m = (y) => {
      const Y = Number(y.target.value);
      e.onChange !== void 0 && e.onChange(Y), a(Y);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", c, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", m), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", c), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", h), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", h);
    };
  }, []), n;
}
function ot(e) {
  const n = ae(null), a = ae(null), t = oi({
    label: e.labelRef,
    input: n,
    sliderRef: a,
    defaultValue: e.value,
    min: e.min,
    max: e.max,
    step: e.step,
    onChange: (r) => {
      e.onChange !== void 0 && e.onChange(e.prop, r);
    }
  });
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    e.type === "number" && /* @__PURE__ */ u.jsx(
      "input",
      {
        alt: e.alt,
        className: e.className,
        ref: n,
        type: "number",
        value: t,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        onChange: (r) => {
          const i = Number(r.target.value);
          e.onChange !== void 0 && e.onChange(e.prop, i);
        }
      }
    ),
    e.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "text",
          value: t.toString(),
          disabled: e.disabled,
          ref: n,
          className: "min",
          onChange: (r) => {
            const i = Number(r.target.value);
            e.onChange !== void 0 && e.onChange(e.prop, i);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: t,
          min: e.min,
          max: e.max,
          step: e.step,
          ref: a,
          onChange: Ut
        }
      )
    ] })
  ] });
}
function ci(e) {
  const n = ae(null), a = ae(null), t = ae(null), r = ae(null), i = ae(null), l = ae(null), [c, d] = ee(e.value), [h, f] = ee({ min: e.min, max: e.max }), [m, y] = ee(!1);
  function Y() {
    m || (window.addEventListener("mousemove", W), window.addEventListener("mouseup", T), window.addEventListener("mouseup", T), y(!0));
  }
  function T() {
    window.removeEventListener("mousemove", W), window.removeEventListener("mouseup", T), y(!1);
  }
  function W(I) {
    const te = i.current.getBoundingClientRect(), ie = Ze(0, 99, I.clientX - te.left) / 99, Se = Ze(0, 99, I.clientY - te.top) / 99, K = gt(en(h.min, h.max, ie), 3), ve = gt(en(h.min, h.max, Se), 3);
    e.onChange({ target: { value: { x: K, y: ve } } }), d({ x: K, y: ve });
  }
  function P(I) {
    let te = c.x, ie = c.y;
    I.target === n.current ? te = Number(I.target.value) : ie = Number(I.target.value), d({ x: te, y: ie });
  }
  function M() {
    const I = Number(t.current.value);
    f({ min: I, max: h.max }), (c.x < I || c.y < I) && d({ x: Ze(I, h.max, c.x), y: Ze(I, h.max, c.y) });
  }
  function $() {
    const I = Number(r.current.value);
    f({ min: h.min, max: I }), (c.x > I || c.y > I) && d({ x: Ze(h.min, I, c.x), y: Ze(h.min, I, c.y) });
  }
  return ke(() => {
    const I = Qt(h.min, h.max, c.x), te = Qt(h.min, h.max, c.y);
    l.current.style.left = `${I * 100}%`, l.current.style.top = `${te * 100}%`;
  }, [h, c]), /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "X:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: c.x,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: P
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: c.y,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: P
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: h.min,
            step: 0.01,
            onChange: M
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: r,
            type: "number",
            value: h.max,
            step: 0.01,
            onChange: $
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: i, onMouseDown: Y, onMouseUp: T, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: l })
    ] })
  ] });
}
function li(e) {
  const n = e.value.x !== void 0, a = [];
  if (n) {
    const t = de(() => e.value, []), r = (l, c) => {
      t[l] = c, e.onChange({ target: { value: t } });
    };
    ["x", "y", "z"].forEach((l) => {
      const c = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: l.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            ot,
            {
              value: t.x,
              type: "number",
              prop: l,
              step: 0.01,
              labelRef: c,
              onChange: r
            }
          )
        ] }, l)
      );
    });
  } else {
    const t = de(() => e.value, []), r = (i, l) => {
      const c = Number(i);
      t.elements[c] = l, e.onChange({ target: { value: t } });
    };
    for (let i = 0; i < 9; i++) {
      const l = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: i + 1 }),
          /* @__PURE__ */ u.jsx(
            ot,
            {
              value: t.elements[i],
              type: "number",
              prop: i.toString(),
              step: 0.01,
              labelRef: l,
              onChange: r
            }
          )
        ] }, i.toString())
      );
    }
  }
  return /* @__PURE__ */ u.jsx("div", { className: "grid3", children: a });
}
function ui(e) {
  const n = e.value.x !== void 0, a = [];
  if (n) {
    const t = de(() => e.value, []), r = (l, c) => {
      t[l] = c, e.onChange({ target: { value: t } });
    };
    ["x", "y", "z", "w"].forEach((l) => {
      const c = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: l.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            ot,
            {
              value: t.x,
              type: "number",
              prop: l,
              step: 0.01,
              labelRef: c,
              onChange: r
            }
          )
        ] }, l)
      );
    });
  } else {
    const t = de(() => e.value, []), r = (i, l) => {
      const c = Number(i);
      t.elements[c] = l, e.onChange({ target: { value: t } });
    };
    for (let i = 0; i < 16; i++) {
      const l = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: i + 1 }),
          /* @__PURE__ */ u.jsx(
            ot,
            {
              value: t.elements[i],
              type: "number",
              prop: i.toString(),
              step: 0.01,
              labelRef: l,
              onChange: r
            }
          )
        ] }, i.toString())
      );
    }
  }
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: a });
}
function pt(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Pa(e.value));
  const [a, t] = ee(n), r = ae(null), i = ae(null), l = (f) => {
    let m = f.target.value;
    e.type === "boolean" ? m = f.target.checked : e.type === "option" && (m = e.options[m].value), t(m), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, m);
  }, c = {};
  e.disabled && (c.opacity = 0.8);
  const d = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = d || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${h ? "block" : ""}`, style: c, children: [
    e.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: r, children: Je(e.title) }, "fieldLabel"),
    e.type === "string" && !d && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: l,
        value: a
      }
    ),
    e.type === "string" && d && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: l,
        value: a
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: l,
        checked: a
      }
    ),
    e.type === "number" && /* @__PURE__ */ u.jsx(
      ot,
      {
        value: a,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: r,
        onChange: e.onChange
      }
    ),
    e.type === "range" && /* @__PURE__ */ u.jsx(
      ot,
      {
        value: a,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: r,
        onChange: e.onChange
      }
    ),
    e.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: a.toString(), onChange: l, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: a, onChange: l, disabled: e.disabled })
    ] }),
    e.type === "button" && /* @__PURE__ */ u.jsx(
      "button",
      {
        disabled: e.disabled,
        onClick: () => {
          e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, !0);
        },
        children: e.title
      }
    ),
    e.type === "image" && /* @__PURE__ */ u.jsx("img", { ref: i, onClick: () => {
      Xa().then((f) => {
        i.current.src = f, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
      });
    }, src: a.length > 0 ? a : Va }),
    e.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: l, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((f, m) => /* @__PURE__ */ u.jsx("option", { value: f.value, children: Je(f.title) }, m)) }) }),
    e.type === "vector2" && /* @__PURE__ */ u.jsx(ci, { value: a, min: 0, max: 1, onChange: l }),
    e.type === "grid3" && /* @__PURE__ */ u.jsx(li, { value: a, onChange: l }),
    e.type === "grid4" && /* @__PURE__ */ u.jsx(ui, { value: a, onChange: l })
  ] });
}
function rn(e) {
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
function di(e, n) {
  const a = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      a.push({
        title: rn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (r, i) => {
          n.updateObject(e.uuid, r, i), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const l = n.scene?.getObjectByProperty("uuid", e.uuid);
          l !== void 0 && (k(l, r, i), l.updateProjectionMatrix());
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      a.push({
        title: rn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (r, i) => {
          n.updateObject(e.uuid, r, i), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const l = n.scene?.getObjectByProperty("uuid", e.uuid);
          l !== void 0 && (k(l, r, i), l.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ u.jsx(
    Qe,
    {
      title: "Camera",
      items: a
    }
  );
}
const hi = Math.PI / 180, fi = 180 / Math.PI;
function st(e, n, a, t, r) {
  return t + (e - n) * (r - t) / (a - n);
}
function pi(e) {
  return e * hi;
}
function Lt(e) {
  return e * fi;
}
function mi(e, n) {
  const a = new ra();
  a.elements = e.matrix;
  const t = new Z(), r = new sa(), i = new Z();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), r.setFromRotationMatrix(a), i.setFromMatrixScale(a));
  const l = (d, h) => {
    n.updateObject(e.uuid, d, h);
    const f = n.scene?.getObjectByProperty("uuid", e.uuid);
    f !== void 0 && k(f, d, h);
  }, c = (d, h) => {
    l(d, pi(h));
  };
  return /* @__PURE__ */ u.jsx(
    Qe,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: t.x,
          onChange: l
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: t.y,
          onChange: l
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: t.z,
          onChange: l
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: gt(Lt(r.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: gt(Lt(r.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: gt(Lt(r.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: i.x,
          step: 0.01,
          onChange: l
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: i.y,
          step: 0.01,
          onChange: l
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: i.z,
          step: 0.01,
          onChange: l
        }
      ]
    }
  );
}
function sn(e) {
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
    case "width":
      return "Width";
    case "height":
      return "Height";
  }
  return e;
}
function gi(e, n) {
  const a = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const r = e.lightInfo[t];
      r !== void 0 && (r.isColor !== void 0 ? a.push({
        title: sn(t),
        prop: t,
        type: "color",
        value: r,
        onChange: (i, l) => {
          const c = new mt(l);
          n.updateObject(e.uuid, i, c);
          const d = n.scene?.getObjectByProperty("uuid", e.uuid);
          d !== void 0 && k(d, i, c);
        }
      }) : a.push({
        title: sn(t),
        prop: t,
        type: typeof r,
        value: r,
        step: typeof r == "number" ? 0.01 : void 0,
        onChange: (i, l) => {
          n.updateObject(e.uuid, i, l);
          const c = n.scene?.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && k(c, i, l);
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Qe,
    {
      title: "Light",
      items: a
    }
  );
}
function vi(e, n) {
  const a = [], t = [];
  let r = 0;
  e.animations.forEach((c) => {
    r = Math.max(r, c.duration), c.duration > 0 && t.push({
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
  }), a.push({
    title: "Animations",
    items: t
  });
  const i = n.scene?.getObjectByProperty("uuid", e.uuid);
  let l = !1;
  if (i !== void 0) {
    const c = i.mixer;
    if (l = c !== void 0, l) {
      const d = [
        {
          title: "Time Scale",
          type: "range",
          value: c.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (h, f) => {
            c.timeScale = f, n.updateObject(e.uuid, "mixer.timeScale", f);
          }
        }
      ];
      d.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          c.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: d
      });
    }
  }
  return /* @__PURE__ */ u.jsx(Qe, { title: "Animation", items: a });
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
let le = { ...$n };
function bi(e) {
  const [n, a] = ee(-1);
  ke(() => {
    function l(d) {
      le = { ...d.value }, a(Date.now());
    }
    function c() {
      le = { ...$n }, a(Date.now());
    }
    return B.addEventListener(F.SET_SCENE, c), B.addEventListener(F.SET_OBJECT, l), () => {
      B.removeEventListener(F.SET_SCENE, c), B.removeEventListener(F.SET_OBJECT, l);
    };
  }, []);
  const t = le.type.toLowerCase(), r = le.animations.length > 0 || le.mixer !== void 0, i = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ u.jsx(zt, { label: "Inspector", children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: e.class, children: le.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        pt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: le.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        pt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: le.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        pt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: le.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        pt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: le.visible,
          onChange: (l, c) => {
            e.three.updateObject(le.uuid, l, c);
            const d = e.three.scene?.getObjectByProperty("uuid", le.uuid);
            d !== void 0 && k(d, l, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      mi(le, e.three),
      r ? vi(le, e.three) : null,
      t.search("camera") > -1 ? di(le, e.three) : null,
      t.search("light") > -1 ? gi(le, e.three) : null,
      i ? si(le, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function $i(e) {
  const [n, a] = ee(e.scene);
  ke(() => {
    const i = (l) => {
      a(l.value);
    };
    return B.addEventListener(F.SET_SCENE, i), () => {
      B.removeEventListener(F.SET_SCENE, i);
    };
  }, []);
  const t = n !== null, r = "Hierarchy - " + (t ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ u.jsx(zt, { label: r, open: !0, children: /* @__PURE__ */ u.jsx(u.Fragment, { children: t && /* @__PURE__ */ u.jsx(Ga, { child: n, three: e.three }) }) }),
    /* @__PURE__ */ u.jsx(bi, { three: e.three })
  ] }, "SidePanel");
}
function Ui(e) {
  function n() {
    return e.three.scene === void 0 ? (console.log("No scene:", e.three), !1) : !0;
  }
  const a = (c) => {
    if (!n())
      return;
    const d = e.three.scene?.getObjectByProperty("uuid", c.value);
    d !== void 0 && e.three.setObject(d);
  }, t = (c, d, h) => {
    if (!n())
      return;
    const f = e.three.scene?.getObjectByProperty("uuid", c);
    f !== void 0 && k(f, d, h);
  }, r = (c) => {
    if (!n())
      return;
    const d = c.value, { key: h, value: f, uuid: m } = d;
    t(m, h, f);
  }, i = (c) => {
    if (!n())
      return;
    const d = c.value;
    Ot(d.value).then((h) => {
      t(d.uuid, d.key, h), t(d.uuid, "material.needsUpdate", !0);
    });
  }, l = (c) => {
    if (!n())
      return;
    const { key: d, uuid: h, value: f, subitem: m } = c.value, y = e.three.scene?.getObjectByProperty("uuid", h);
    if (y !== void 0)
      try {
        m !== void 0 ? Na(y, m)[d](f) : y[d](f);
      } catch (Y) {
        console.log("Error requesting method:"), console.log(Y), console.log(d), console.log(f);
      }
  };
  return ke(() => (B.addEventListener(F.GET_OBJECT, a), B.addEventListener(F.UPDATE_OBJECT, r), B.addEventListener(F.CREATE_TEXTURE, i), B.addEventListener(F.REQUEST_METHOD, l), () => {
    B.removeEventListener(F.GET_OBJECT, a), B.removeEventListener(F.UPDATE_OBJECT, r), B.removeEventListener(F.CREATE_TEXTURE, i), B.removeEventListener(F.REQUEST_METHOD, l);
  }), []), null;
}
class yi extends oa {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], r = new Wt();
    r.setAttribute("position", new qt(t, 3)), r.computeBoundingSphere();
    const i = new ca({ fog: !1 });
    super(r, i), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const l = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], c = new Wt();
    c.setAttribute("position", new qt(l, 3)), c.computeBoundingSphere(), this.add(new Rn(c, new Pn({ side: fn, fog: !1 })));
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
const on = { type: "change" }, Bt = { type: "start" }, cn = { type: "end" }, Et = new la(), ln = new ua(), xi = Math.cos(70 * da.DEG2RAD);
class Ci extends dn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Z(), this.cursor = new Z(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: at.ROTATE, MIDDLE: at.DOLLY, RIGHT: at.PAN }, this.touches = { ONE: it.ROTATE, TWO: it.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", ct), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ct), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(on), t.update(), i = r.NONE;
    }, this.update = function() {
      const o = new Z(), x = new Kt().setFromUnitVectors(n.up, new Z(0, 1, 0)), _ = x.clone().invert(), H = new Z(), X = new Kt(), xe = new Z(), fe = 2 * Math.PI;
      return function(At = null) {
        const ut = t.object.position;
        o.copy(ut).sub(t.target), o.applyQuaternion(x), c.setFromVector3(o), t.autoRotate && i === r.NONE && be(_e(At)), t.enableDamping ? (c.theta += d.theta * t.dampingFactor, c.phi += d.phi * t.dampingFactor) : (c.theta += d.theta, c.phi += d.phi);
        let Me = t.minAzimuthAngle, Ce = t.maxAzimuthAngle;
        isFinite(Me) && isFinite(Ce) && (Me < -Math.PI ? Me += fe : Me > Math.PI && (Me -= fe), Ce < -Math.PI ? Ce += fe : Ce > Math.PI && (Ce -= fe), Me <= Ce ? c.theta = Math.max(Me, Math.min(Ce, c.theta)) : c.theta = c.theta > (Me + Ce) / 2 ? Math.max(Me, c.theta) : Math.min(Ce, c.theta)), c.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, c.phi)), c.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor), t.zoomToCursor && Se || t.object.isOrthographicCamera ? c.radius = Ae(c.radius) : c.radius = Ae(c.radius * h), o.setFromSpherical(c), o.applyQuaternion(_), ut.copy(t.target).add(o), t.object.lookAt(t.target), t.enableDamping === !0 ? (d.theta *= 1 - t.dampingFactor, d.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (d.set(0, 0, 0), f.set(0, 0, 0));
        let Ve = !1;
        if (t.zoomToCursor && Se) {
          let We = null;
          if (t.object.isPerspectiveCamera) {
            const qe = o.length();
            We = Ae(qe * h);
            const Ke = qe - We;
            t.object.position.addScaledVector(te, Ke), t.object.updateMatrixWorld();
          } else if (t.object.isOrthographicCamera) {
            const qe = new Z(ie.x, ie.y, 0);
            qe.unproject(t.object), t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), t.object.updateProjectionMatrix(), Ve = !0;
            const Ke = new Z(ie.x, ie.y, 0);
            Ke.unproject(t.object), t.object.position.sub(Ke).add(qe), t.object.updateMatrixWorld(), We = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          We !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(We).add(t.object.position) : (Et.origin.copy(t.object.position), Et.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Et.direction)) < xi ? n.lookAt(t.target) : (ln.setFromNormalAndCoplanarPoint(t.object.up, t.target), Et.intersectPlane(ln, t.target))));
        } else
          t.object.isOrthographicCamera && (Ve = h !== 1, Ve && (t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), t.object.updateProjectionMatrix()));
        return h = 1, Se = !1, Ve || H.distanceToSquared(t.object.position) > l || 8 * (1 - X.dot(t.object.quaternion)) > l || xe.distanceToSquared(t.target) > 0 ? (t.dispatchEvent(on), H.copy(t.object.position), X.copy(t.object.quaternion), xe.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", tt), t.domElement.removeEventListener("pointerdown", R), t.domElement.removeEventListener("pointercancel", J), t.domElement.removeEventListener("wheel", vt), t.domElement.removeEventListener("pointermove", G), t.domElement.removeEventListener("pointerup", J), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ct), t._domElementKeyEvents = null);
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
    let i = r.NONE;
    const l = 1e-6, c = new Xt(), d = new Xt();
    let h = 1;
    const f = new Z(), m = new ge(), y = new ge(), Y = new ge(), T = new ge(), W = new ge(), P = new ge(), M = new ge(), $ = new ge(), I = new ge(), te = new Z(), ie = new ge();
    let Se = !1;
    const K = [], ve = {};
    let he = !1;
    function _e(o) {
      return o !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function Te(o) {
      const x = Math.abs(o * 0.01);
      return Math.pow(0.95, t.zoomSpeed * x);
    }
    function be(o) {
      d.theta -= o;
    }
    function N(o) {
      d.phi -= o;
    }
    const ye = function() {
      const o = new Z();
      return function(_, H) {
        o.setFromMatrixColumn(H, 0), o.multiplyScalar(-_), f.add(o);
      };
    }(), E = function() {
      const o = new Z();
      return function(_, H) {
        t.screenSpacePanning === !0 ? o.setFromMatrixColumn(H, 1) : (o.setFromMatrixColumn(H, 0), o.crossVectors(t.object.up, o)), o.multiplyScalar(_), f.add(o);
      };
    }(), we = function() {
      const o = new Z();
      return function(_, H) {
        const X = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const xe = t.object.position;
          o.copy(xe).sub(t.target);
          let fe = o.length();
          fe *= Math.tan(t.object.fov / 2 * Math.PI / 180), ye(2 * _ * fe / X.clientHeight, t.object.matrix), E(2 * H * fe / X.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (ye(_ * (t.object.right - t.object.left) / t.object.zoom / X.clientWidth, t.object.matrix), E(H * (t.object.top - t.object.bottom) / t.object.zoom / X.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Re(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? h /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function je(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? h *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Pe(o, x) {
      if (!t.zoomToCursor)
        return;
      Se = !0;
      const _ = t.domElement.getBoundingClientRect(), H = o - _.left, X = x - _.top, xe = _.width, fe = _.height;
      ie.x = H / xe * 2 - 1, ie.y = -(X / fe) * 2 + 1, te.set(ie.x, ie.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Ae(o) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, o));
    }
    function De(o) {
      m.set(o.clientX, o.clientY);
    }
    function Be(o) {
      Pe(o.clientX, o.clientX), M.set(o.clientX, o.clientY);
    }
    function Fe(o) {
      T.set(o.clientX, o.clientY);
    }
    function re(o) {
      y.set(o.clientX, o.clientY), Y.subVectors(y, m).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      be(2 * Math.PI * Y.x / x.clientHeight), N(2 * Math.PI * Y.y / x.clientHeight), m.copy(y), t.update();
    }
    function Oe(o) {
      $.set(o.clientX, o.clientY), I.subVectors($, M), I.y > 0 ? Re(Te(I.y)) : I.y < 0 && je(Te(I.y)), M.copy($), t.update();
    }
    function Ye(o) {
      W.set(o.clientX, o.clientY), P.subVectors(W, T).multiplyScalar(t.panSpeed), we(P.x, P.y), T.copy(W), t.update();
    }
    function Ge(o) {
      Pe(o.clientX, o.clientY), o.deltaY < 0 ? je(Te(o.deltaY)) : o.deltaY > 0 && Re(Te(o.deltaY)), t.update();
    }
    function pe(o) {
      let x = !1;
      switch (o.code) {
        case t.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? N(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, t.keyPanSpeed), x = !0;
          break;
        case t.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? N(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, -t.keyPanSpeed), x = !0;
          break;
        case t.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? be(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(t.keyPanSpeed, 0), x = !0;
          break;
        case t.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? be(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(-t.keyPanSpeed, 0), x = !0;
          break;
      }
      x && (o.preventDefault(), t.update());
    }
    function g(o) {
      if (K.length === 1)
        m.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), _ = 0.5 * (o.pageX + x.x), H = 0.5 * (o.pageY + x.y);
        m.set(_, H);
      }
    }
    function v(o) {
      if (K.length === 1)
        T.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), _ = 0.5 * (o.pageX + x.x), H = 0.5 * (o.pageY + x.y);
        T.set(_, H);
      }
    }
    function S(o) {
      const x = Ue(o), _ = o.pageX - x.x, H = o.pageY - x.y, X = Math.sqrt(_ * _ + H * H);
      M.set(0, X);
    }
    function D(o) {
      t.enableZoom && S(o), t.enablePan && v(o);
    }
    function se(o) {
      t.enableZoom && S(o), t.enableRotate && g(o);
    }
    function O(o) {
      if (K.length == 1)
        y.set(o.pageX, o.pageY);
      else {
        const _ = Ue(o), H = 0.5 * (o.pageX + _.x), X = 0.5 * (o.pageY + _.y);
        y.set(H, X);
      }
      Y.subVectors(y, m).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      be(2 * Math.PI * Y.x / x.clientHeight), N(2 * Math.PI * Y.y / x.clientHeight), m.copy(y);
    }
    function w(o) {
      if (K.length === 1)
        W.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), _ = 0.5 * (o.pageX + x.x), H = 0.5 * (o.pageY + x.y);
        W.set(_, H);
      }
      P.subVectors(W, T).multiplyScalar(t.panSpeed), we(P.x, P.y), T.copy(W);
    }
    function L(o) {
      const x = Ue(o), _ = o.pageX - x.x, H = o.pageY - x.y, X = Math.sqrt(_ * _ + H * H);
      $.set(0, X), I.set(0, Math.pow($.y / M.y, t.zoomSpeed)), Re(I.y), M.copy($);
      const xe = (o.pageX + x.x) * 0.5, fe = (o.pageY + x.y) * 0.5;
      Pe(xe, fe);
    }
    function oe(o) {
      t.enableZoom && L(o), t.enablePan && w(o);
    }
    function ce(o) {
      t.enableZoom && L(o), t.enableRotate && O(o);
    }
    function R(o) {
      t.enabled !== !1 && (K.length === 0 && (t.domElement.setPointerCapture(o.pointerId), t.domElement.addEventListener("pointermove", G), t.domElement.addEventListener("pointerup", J)), Tt(o), o.pointerType === "touch" ? lt(o) : Ie(o));
    }
    function G(o) {
      t.enabled !== !1 && (o.pointerType === "touch" ? xt(o) : et(o));
    }
    function J(o) {
      switch (Rt(o), K.length) {
        case 0:
          t.domElement.releasePointerCapture(o.pointerId), t.domElement.removeEventListener("pointermove", G), t.domElement.removeEventListener("pointerup", J), t.dispatchEvent(cn), i = r.NONE;
          break;
        case 1:
          const x = K[0], _ = ve[x];
          lt({ pointerId: x, pageX: _.x, pageY: _.y });
          break;
      }
    }
    function Ie(o) {
      let x;
      switch (o.button) {
        case 0:
          x = t.mouseButtons.LEFT;
          break;
        case 1:
          x = t.mouseButtons.MIDDLE;
          break;
        case 2:
          x = t.mouseButtons.RIGHT;
          break;
        default:
          x = -1;
      }
      switch (x) {
        case at.DOLLY:
          if (t.enableZoom === !1)
            return;
          Be(o), i = r.DOLLY;
          break;
        case at.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enablePan === !1)
              return;
            Fe(o), i = r.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            De(o), i = r.ROTATE;
          }
          break;
        case at.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enableRotate === !1)
              return;
            De(o), i = r.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Fe(o), i = r.PAN;
          }
          break;
        default:
          i = r.NONE;
      }
      i !== r.NONE && t.dispatchEvent(Bt);
    }
    function et(o) {
      switch (i) {
        case r.ROTATE:
          if (t.enableRotate === !1)
            return;
          re(o);
          break;
        case r.DOLLY:
          if (t.enableZoom === !1)
            return;
          Oe(o);
          break;
        case r.PAN:
          if (t.enablePan === !1)
            return;
          Ye(o);
          break;
      }
    }
    function vt(o) {
      t.enabled === !1 || t.enableZoom === !1 || i !== r.NONE || (o.preventDefault(), t.dispatchEvent(Bt), Ge(bt(o)), t.dispatchEvent(cn));
    }
    function bt(o) {
      const x = o.deltaMode, _ = {
        clientX: o.clientX,
        clientY: o.clientY,
        deltaY: o.deltaY
      };
      switch (x) {
        case 1:
          _.deltaY *= 16;
          break;
        case 2:
          _.deltaY *= 100;
          break;
      }
      return o.ctrlKey && !he && (_.deltaY *= 10), _;
    }
    function yt(o) {
      o.key === "Control" && (he = !0, t.domElement.getRootNode().addEventListener("keyup", $e, { passive: !0, capture: !0 }));
    }
    function $e(o) {
      o.key === "Control" && (he = !1, t.domElement.getRootNode().removeEventListener("keyup", $e, { passive: !0, capture: !0 }));
    }
    function ct(o) {
      t.enabled === !1 || t.enablePan === !1 || pe(o);
    }
    function lt(o) {
      switch (Ct(o), K.length) {
        case 1:
          switch (t.touches.ONE) {
            case it.ROTATE:
              if (t.enableRotate === !1)
                return;
              g(o), i = r.TOUCH_ROTATE;
              break;
            case it.PAN:
              if (t.enablePan === !1)
                return;
              v(o), i = r.TOUCH_PAN;
              break;
            default:
              i = r.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case it.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              D(o), i = r.TOUCH_DOLLY_PAN;
              break;
            case it.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              se(o), i = r.TOUCH_DOLLY_ROTATE;
              break;
            default:
              i = r.NONE;
          }
          break;
        default:
          i = r.NONE;
      }
      i !== r.NONE && t.dispatchEvent(Bt);
    }
    function xt(o) {
      switch (Ct(o), i) {
        case r.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          O(o), t.update();
          break;
        case r.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          w(o), t.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          oe(o), t.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          ce(o), t.update();
          break;
        default:
          i = r.NONE;
      }
    }
    function tt(o) {
      t.enabled !== !1 && o.preventDefault();
    }
    function Tt(o) {
      K.push(o.pointerId);
    }
    function Rt(o) {
      delete ve[o.pointerId];
      for (let x = 0; x < K.length; x++)
        if (K[x] == o.pointerId) {
          K.splice(x, 1);
          return;
        }
    }
    function Ct(o) {
      let x = ve[o.pointerId];
      x === void 0 && (x = new ge(), ve[o.pointerId] = x), x.set(o.pageX, o.pageY);
    }
    function Ue(o) {
      const x = o.pointerId === K[0] ? K[1] : K[0];
      return ve[x];
    }
    t.domElement.addEventListener("contextmenu", tt), t.domElement.addEventListener("pointerdown", R), t.domElement.addEventListener("pointercancel", J), t.domElement.addEventListener("wheel", vt, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", yt, { passive: !0, capture: !0 }), this.update();
  }
}
const Mt = (e) => {
  const [n, a] = ee(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, r = (i) => {
    i !== n && (e.onSelect(i), a(i)), e.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: e.options.map((i) => /* @__PURE__ */ u.jsx("li", { onClick: () => r(i), children: i }, i)) })
  ] });
}, Xe = _a(function(n, a) {
  const [t, r] = ee(!1), i = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: a, className: "clickable", onClick: () => {
      t && r(!1);
    } }),
    /* @__PURE__ */ u.jsx(
      Mt,
      {
        index: i,
        open: t,
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
class Ei extends An {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: ha,
      side: pn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new mt(16777215)
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
class Si extends Rn {
  gridMaterial;
  constructor() {
    const n = new Ei();
    super(new fa(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const wi = `#include <common>
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
}`, Oi = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Mi extends An {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: wi,
      fragmentShader: Oi
    });
  }
}
let St = "Renderer", Le, wt = !1, un = !1, q = null, ue = null, He = null, ze = null;
function Hi(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", r = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", i = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", l = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", c = de(() => /* @__PURE__ */ new Map(), []), d = de(() => /* @__PURE__ */ new Map(), []), h = de(() => /* @__PURE__ */ new Map(), []), f = de(() => /* @__PURE__ */ new Map(), []), m = de(() => new pa(), []), y = de(() => new ma(), []), Y = de(() => new Si(), []), T = de(() => new Zt(500), []), W = de(() => new Zt(100), []), P = de(() => new ga(), []), M = de(() => new va(), []), $ = de(() => new Mi(), []), I = de(() => new Pn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function te(g, v) {
    const S = new Jt(-100, 100, 100, -100, 50, 3e3);
    return S.name = g, S.position.copy(v), S.lookAt(0, 0, 0), c.set(g, S), S;
  }
  const ie = [
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
  ], K = ae(null), ve = ae(null), he = ae(null), _e = ae(null), Te = ae(null), be = ae(null), [N, ye] = ee(a !== null ? a : "Single"), [E, we] = ee(null), [Re, je] = ee(!1), [Pe, Ae] = ee(!1), [De, Be] = ee(!1), [, Fe] = ee(Date.now());
  localStorage.setItem(`${n}_mode`, N), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, r), localStorage.setItem(`${n}_blCam`, i), localStorage.setItem(`${n}_brCam`, l);
  const re = (g, v) => {
    const S = d.get(g.name);
    S !== void 0 && S.dispose(), d.delete(g.name);
    const D = h.get(g.name);
    D !== void 0 && (m.remove(D), D.dispose()), h.delete(g.name);
    const se = new Ci(g, v);
    switch (se.enableDamping = !0, se.dampingFactor = 0.05, g.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        se.enableRotate = !1;
        break;
    }
    if (d.set(g.name, se), g instanceof kt) {
      const O = new xa(g);
      h.set(g.name, O), m.add(O);
    }
  }, Oe = (g) => {
    const v = h.get(g.name);
    v !== void 0 && (m.remove(v), v.dispose(), h.delete(g.name));
    const S = d.get(g.name);
    S !== void 0 && (S.dispose(), d.delete(g.name));
  }, Ye = () => {
    d.forEach((g, v) => {
      g.dispose();
      const S = h.get(v);
      S !== void 0 && (m.remove(S), S.dispose()), h.delete(v), d.delete(v);
    }), d.clear(), h.clear();
  }, Ge = () => {
    switch (N) {
      case "Single":
        re(q, he.current);
        break;
      case "Side by Side":
      case "Stacked":
        re(q, he.current), re(ue, _e.current);
        break;
      case "Quad":
        re(q, he.current), re(ue, _e.current), re(He, Te.current), re(ze, be.current);
        break;
    }
  };
  ke(() => {
    const g = new ba({
      canvas: K.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, we(g);
  }, []), ke(() => {
    m.name = "Debug Scene", m.uuid = "", y.name = "helpers", m.add(y), y.add(Y), T.name = "axisHelper", y.add(T), W.name = "interactionHelper", y.add(W), W.visible = !1, te("Top", new Z(0, 1e3, 0)), te("Bottom", new Z(0, -1e3, 0)), te("Left", new Z(-1e3, 0, 0)), te("Right", new Z(1e3, 0, 0)), te("Front", new Z(0, 0, 1e3)), te("Back", new Z(0, 0, -1e3)), te("Orthographic", new Z(1e3, 1e3, 1e3));
    const g = new kt(60, 1, 50, 3e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), c.set("Debug", g), q = c.get(localStorage.getItem(`${n}_tlCam`)), ue = c.get(localStorage.getItem(`${n}_trCam`)), He = c.get(localStorage.getItem(`${n}_blCam`)), ze = c.get(localStorage.getItem(`${n}_brCam`));
  }, []), ke(() => {
    const g = () => {
      f.forEach((O) => {
        y.remove(O), O.dispose();
      }), f.clear();
    }, v = () => {
      Le.traverse((O) => {
        if (O.type.search("Light") > -1) {
          let w;
          switch (O.type) {
            case "DirectionalLight":
              w = new wa(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "HemisphereLight":
              w = new Sa(O, 250), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "RectAreaLight":
              w = new yi(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "PointLight":
              w = new Ea(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "SpotLight":
              w = new Ca(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
          }
        }
      });
    }, S = (O) => {
      g(), In(Le), m.remove(Le);
      const w = e.scenes.get(O.value.name);
      if (w !== void 0) {
        const L = new w();
        e.onSceneSet !== void 0 && e.onSceneSet(L), Le = L, e.three.scene = Le, m.add(Le), un = !0, v();
      }
    }, D = (O) => {
      const w = O.value, L = e.three.scene?.getObjectByProperty("uuid", w.uuid);
      L !== void 0 && c.set(w.name, L), Fe(Date.now());
    }, se = (O) => {
      c.delete(O.value.name), Fe(Date.now());
    };
    return B.addEventListener(F.SET_SCENE, S), B.addEventListener(F.ADD_CAMERA, D), B.addEventListener(F.REMOVE_CAMERA, se), () => {
      B.removeEventListener(F.SET_SCENE, S), B.removeEventListener(F.ADD_CAMERA, D), B.removeEventListener(F.REMOVE_CAMERA, se);
    };
  }, []), ke(() => {
    if (E === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, S = Math.floor(g / 2), D = Math.floor(v / 2), se = -1;
    const O = () => {
      g = window.innerWidth - 300, v = window.innerHeight, S = Math.floor(g / 2), D = Math.floor(v / 2), E.setSize(g, v);
      let R = g, G = v;
      switch (N) {
        case "Side by Side":
          R = S, G = v;
          break;
        case "Stacked":
          R = g, G = D;
          break;
        case "Quad":
          R = S, G = D;
          break;
      }
      c.forEach((J) => {
        J instanceof Jt ? (J.left = R / -2, J.right = R / 2, J.top = G / 2, J.bottom = G / -2, J.updateProjectionMatrix()) : J instanceof kt && (J.aspect = R / G, J.updateProjectionMatrix(), h.get(J.name)?.update());
      });
    }, w = () => {
      E.setViewport(0, 0, g, v), E.setScissor(0, 0, g, v), E.render(m, q);
    }, L = () => {
      if (N === "Side by Side")
        E.setViewport(0, 0, S, v), E.setScissor(0, 0, S, v), E.render(m, q), E.setViewport(S, 0, S, v), E.setScissor(S, 0, S, v), E.render(m, ue);
      else {
        const R = v - D;
        E.setViewport(0, R, g, D), E.setScissor(0, R, g, D), E.render(m, q), E.setViewport(0, 0, g, D), E.setScissor(0, 0, g, D), E.render(m, ue);
      }
    }, oe = () => {
      let R = 0, G = 0;
      G = v - D, R = 0, E.setViewport(R, G, S, D), E.setScissor(R, G, S, D), E.render(m, q), R = S, E.setViewport(R, G, S, D), E.setScissor(R, G, S, D), E.render(m, ue), G = 0, R = 0, E.setViewport(R, G, S, D), E.setScissor(R, G, S, D), E.render(m, He), R = S, E.setViewport(R, G, S, D), E.setScissor(R, G, S, D), E.render(m, ze);
    }, ce = () => {
      switch (d.forEach((R) => {
        R.update();
      }), e.onSceneUpdate !== void 0 && un && e.onSceneUpdate(Le), E.clear(), N) {
        case "Single":
          w();
          break;
        case "Side by Side":
        case "Stacked":
          L();
          break;
        case "Quad":
          oe();
          break;
      }
      se = requestAnimationFrame(ce);
    };
    return Ge(), window.addEventListener("resize", O), O(), ce(), () => {
      window.removeEventListener("resize", O), cancelAnimationFrame(se), se = -1;
    };
  }, [N, E]), ke(() => {
    if (E !== null) {
      const g = new ya(), v = new ge(), S = (w, L, oe, ce) => {
        switch (N) {
          case "Quad":
            w < oe ? L < ce ? g.setFromCamera(v, q) : g.setFromCamera(v, He) : L < ce ? g.setFromCamera(v, ue) : g.setFromCamera(v, ze);
            break;
          case "Side by Side":
            w < oe ? g.setFromCamera(v, q) : g.setFromCamera(v, ue);
            break;
          case "Single":
            g.setFromCamera(v, q);
            break;
          case "Stacked":
            L < ce ? g.setFromCamera(v, q) : g.setFromCamera(v, ue);
            break;
        }
      }, D = (w) => {
        if (!wt)
          return;
        const L = new ge();
        E.getSize(L);
        const oe = Math.min(w.clientX, L.x), ce = Math.min(w.clientY, L.y);
        v.x = st(oe, 0, L.x, -1, 1), v.y = st(ce, 0, L.y, 1, -1);
        const R = L.x / 2, G = L.y / 2, J = () => {
          oe < R ? v.x = st(oe, 0, R, -1, 1) : v.x = st(oe, R, L.x, -1, 1);
        }, Ie = () => {
          ce < G ? v.y = st(ce, 0, G, 1, -1) : v.y = st(ce, G, L.y, 1, -1);
        };
        switch (N) {
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
        S(oe, ce, R, G);
        const et = g.intersectObjects(Le.children);
        et.length > 0 && W.position.copy(et[0].point);
      }, se = (w) => {
        if (!wt)
          return;
        const L = new ge();
        if (E.getSize(L), w.clientX >= L.x)
          return;
        D(w);
        const oe = g.intersectObjects(Le.children);
        oe.length > 0 && e.three.getObject(oe[0].object.uuid);
      }, O = ve.current;
      return O.addEventListener("mousemove", D, !1), O.addEventListener("click", se, !1), () => {
        O.removeEventListener("mousemove", D), O.removeEventListener("click", se);
      };
    }
  }, [N, E]);
  const pe = [];
  return c.forEach((g, v) => {
    pe.push(v);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsx("canvas", { ref: K }),
    E !== null && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxs("div", { className: `cameras ${N === "Single" || N === "Stacked" ? "single" : ""}`, ref: ve, children: [
        N === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(Xe, { camera: q, options: pe, ref: he, onSelect: (g) => {
          d.get(q.name)?.dispose();
          const v = c.get(g);
          v !== void 0 && (Oe(q), q = v, localStorage.setItem(`${n}_tlCam`, v.name), re(v, he.current));
        } }) }),
        (N === "Side by Side" || N === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(Xe, { camera: q, options: pe, ref: he, onSelect: (g) => {
            d.get(q.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(q), q = v, localStorage.setItem(`${n}_tlCam`, v.name), re(v, he.current));
          } }),
          /* @__PURE__ */ u.jsx(Xe, { camera: ue, options: pe, ref: _e, onSelect: (g) => {
            d.get(ue.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(ue), ue = v, localStorage.setItem(`${n}_trCam`, v.name), re(v, _e.current));
          } })
        ] }),
        N === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(Xe, { camera: q, options: pe, ref: he, onSelect: (g) => {
            d.get(q.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(q), q = v, localStorage.setItem(`${n}_tlCam`, v.name), re(v, he.current));
          } }),
          /* @__PURE__ */ u.jsx(Xe, { camera: ue, options: pe, ref: _e, onSelect: (g) => {
            d.get(ue.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(ue), ue = v, localStorage.setItem(`${n}_trCam`, v.name), re(v, _e.current));
          } }),
          /* @__PURE__ */ u.jsx(Xe, { camera: He, options: pe, ref: Te, onSelect: (g) => {
            d.get(He.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(He), He = v, localStorage.setItem(`${n}_blCam`, v.name), re(v, Te.current));
          } }),
          /* @__PURE__ */ u.jsx(Xe, { camera: ze, options: pe, ref: be, onSelect: (g) => {
            d.get(ze.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Oe(ze), ze = v, localStorage.setItem(`${n}_brCam`, v.name), re(v, be.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ u.jsx(
          Mt,
          {
            index: Se.indexOf(N),
            options: Se,
            onSelect: (g) => {
              g !== N && (Ye(), ye(g));
            },
            open: Re,
            onToggle: (g) => {
              je(g), Pe && Ae(!1), De && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Mt,
          {
            index: ie.indexOf(St),
            options: ie,
            onSelect: (g) => {
              if (g !== St)
                switch (St = g, St) {
                  case "Depth":
                    m.overrideMaterial = P;
                    break;
                  case "Normals":
                    m.overrideMaterial = M;
                    break;
                  default:
                  case "Renderer":
                    m.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    m.overrideMaterial = I;
                    break;
                  case "UVs":
                    m.overrideMaterial = $;
                    break;
                }
            },
            open: Pe,
            onToggle: (g) => {
              Re && je(!1), Ae(g), De && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Mt,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (g) => {
              wt = g === "Selection Mode", W.visible = wt;
            },
            open: De,
            onToggle: (g) => {
              Re && je(!1), Pe && Ae(!1), Be(g);
            }
          }
        )
      ] })
    ] })
  ] });
}
function zi(e) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  zt as Accordion,
  Di as Application,
  _t as BaseRemote,
  Bn as ChildObject,
  Ga as ContainerObject,
  Ha as Draggable,
  Ua as DraggableItem,
  za as Dropdown,
  Ya as DropdownItem,
  zi as Editor,
  bi as Inspector,
  Hi as MultiView,
  Ln as NavButton,
  Ii as RemoteComponents,
  Fi as RemoteController,
  Ht as RemoteTheatre,
  Li as RemoteThree,
  Bi as RemoteTweakpane,
  Ui as SceneInspector,
  $i as SidePanel,
  F as ToolEvents,
  Je as capitalize,
  Ze as clamp,
  Pa as colorToHex,
  B as debugDispatcher,
  Ai as defaultTheatreCallback,
  In as dispose,
  ka as disposeMaterial,
  ji as disposeTexture,
  ki as distance,
  Dn as hierarchyUUID,
  Ra as isColor,
  en as mix,
  Ut as noop,
  Qt as normalize,
  Ta as randomID,
  Aa as resetThreeObjects,
  gt as round,
  Ni as theatreEditorApp,
  Ft as totalThreeObjects
};
