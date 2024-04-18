import { EventDispatcher as dn, Texture as hn, CubeTexture as Hn, RepeatWrapping as Ht, Color as Lt, FrontSide as Yn, BackSide as fn, DoubleSide as mn, NoBlending as Gn, NormalBlending as Wn, AdditiveBlending as qn, SubtractiveBlending as Kn, MultiplyBlending as Xn, CustomBlending as Zn, AddEquation as Jn, SubtractEquation as Qn, ReverseSubtractEquation as ea, MinEquation as ta, MaxEquation as na, ZeroFactor as pn, OneFactor as gn, SrcColorFactor as vn, OneMinusSrcColorFactor as bn, SrcAlphaFactor as yn, OneMinusSrcAlphaFactor as xn, DstAlphaFactor as En, OneMinusDstAlphaFactor as Cn, DstColorFactor as Sn, OneMinusDstColorFactor as wn, SrcAlphaSaturateFactor as aa, ConstantColorFactor as Mn, OneMinusConstantColorFactor as On, ConstantAlphaFactor as _n, OneMinusConstantAlphaFactor as Tn, Matrix4 as ia, Vector3 as Y, Euler as ra, Line as sa, BufferGeometry as Yt, Float32BufferAttribute as Gt, LineBasicMaterial as oa, Mesh as Rn, MeshBasicMaterial as An, Ray as ca, Plane as la, MathUtils as ua, MOUSE as nt, TOUCH as at, Quaternion as Wt, Spherical as qt, Vector2 as fe, ShaderMaterial as kn, GLSL3 as da, PlaneGeometry as ha, Scene as fa, Group as ma, AxesHelper as Kt, MeshDepthMaterial as pa, MeshNormalMaterial as ga, WebGLRenderer as va, PerspectiveCamera as kt, Raycaster as ba, OrthographicCamera as Xt, CameraHelper as ya, SpotLightHelper as xa, PointLightHelper as Ea, HemisphereLightHelper as Ca, DirectionalLightHelper as Sa } from "three";
import { Pane as wa } from "tweakpane";
import * as Ma from "@tweakpane/plugin-essentials";
import Pn, { useState as K, useEffect as Pe, useRef as X, useMemo as ie, forwardRef as Oa } from "react";
import { Reorder as jn } from "framer-motion";
const Ft = () => {
}, Ri = () => {
};
function Mt(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Ke(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function Zt(e, n, a) {
  return (a - e) / (n - e);
}
function Jt(e, n, a) {
  return e * (1 - a) + n * a;
}
function Ai(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function _a() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ta(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Ra(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), i = (h) => {
    const d = h.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, o = i(n), u = i(a), c = i(t);
  return "#" + o + u + c;
}
function Qt(e, n = 1) {
  return Number(e.toFixed(n));
}
let Dt = 0;
const Aa = () => {
  Dt = 0;
}, Dn = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Dt}`, Dt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((a) => {
    Dn(a);
  });
}, ki = (e) => {
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
class Pi {
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
const N = new dn(), L = {
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
  handleApp(n, a, t) {
  }
  handleEditor(n, a, t) {
  }
}
class ji extends Ot {
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
        N.dispatchEvent({ type: L.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        N.dispatchEvent({ type: L.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Bt extends Ot {
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
  sheetObject(n, a, t, i) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const o = this.sheet(n);
    if (o === void 0)
      return;
    const u = `${n}_${a}`;
    let c = this.sheetObjects.get(u);
    c !== void 0 ? c = o.object(a, { ...t, ...c.value }, { reconfigure: !0 }) : c = o.object(a, t), this.sheetObjects.set(u, c), this.sheetObjectCBs.set(u, i !== void 0 ? i : Ft);
    const h = c.onValuesChange((d) => {
      if (this.app.editor) {
        for (const m in d) {
          const x = d[m];
          typeof x == "object" && Ta(x) && (d[m] = {
            r: x.r,
            g: x.g,
            b: x.b,
            a: x.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: n,
            sheetObject: u,
            values: d
          }
        });
      }
      const f = this.sheetObjectCBs.get(u);
      f !== void 0 && f(d);
    });
    return this.sheetObjectUnsubscribe.set(u, h), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(a)?.detachObject(t);
    const o = `${a}_${t}`, u = this.sheetObjectUnsubscribe.get(o);
    u !== void 0 && (this.sheetObjects.delete(o), this.sheetObjectCBs.delete(o), this.sheetObjectUnsubscribe.delete(o), u());
  }
  handleApp(n, a, t) {
    const i = a;
    let o;
    switch (t.event) {
      case "setSheet":
        o = i.sheets.get(t.data.sheet), o !== void 0 && (i.activeSheet = o, this.studio?.setSelection([o]));
        break;
      case "setSheetObject":
        o = i.sheetObjects.get(`${t.data.sheet}_${t.data.key}`), o !== void 0 && this.studio?.setSelection([o]);
        break;
      case "updateSheetObject":
        o = i.sheets.get(t.data.sheet), o !== void 0 && o.sequence.pause(), o = i.sheetObjectCBs.get(t.data.sheetObject), o !== void 0 && o(t.data.values);
        break;
      case "updateTimeline":
        o = i.sheets.get(t.data.sheet), i.activeSheet !== void 0 && (i.activeSheet.sequence.position = t.data.position);
        break;
    }
  }
  handleEditor(n, a, t) {
    if (n.editor) {
      const i = a;
      switch (t.event) {
        case "playSheet":
          i.sheet(t.data.sheet)?.sequence.play(t.data.value);
          break;
        case "pauseSheet":
          i.sheet(t.data.sheet)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(n, a) {
    if (n.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((u) => {
        u.length < 1 || u.forEach((c) => {
          let h = c.address.sheetId, d = "setSheet", f = {};
          switch (c.type) {
            case "Theatre_Sheet_PublicAPI":
              d = "setSheet", f = {
                sheet: c.address.sheetId
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              d = "setSheetObject", h += `_${c.address.objectKey}`, f = {
                id: h,
                sheet: c.address.sheetId,
                key: c.address.objectKey
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
          }
          n.send({ event: d, target: "app", data: f });
        });
      });
      let t = -1;
      const i = () => {
        if (Bt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
          t = a.activeSheet.sequence.position;
          const u = a.activeSheet;
          n.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: t,
              sheet: u.address.sheetId
            }
          });
        }
      }, o = () => {
        i(), requestAnimationFrame(o);
      };
      i(), o();
    } else
      this.studio?.ui.hide();
  }
}
function Di(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((u) => {
      u.length < 1 || u.forEach((c) => {
        let h = c.address.sheetId, d = "setSheet", f = {};
        switch (c.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", f = {
              sheet: c.address.sheetId
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", h += `_${c.address.objectKey}`, f = {
              id: h,
              sheet: c.address.sheetId,
              key: c.address.objectKey
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
        }
        e.send({ event: d, target: "app", data: f });
      });
    });
    let t = -1;
    const i = () => {
      if (Bt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
        t = n.activeSheet.sequence.position;
        const u = n.activeSheet;
        e.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: t,
            sheet: u.address.sheetId
          }
        });
      }
    }, o = () => {
      i(), requestAnimationFrame(o);
    };
    i(), o();
  } else
    a.ui.hide();
}
function Pa(e) {
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
function ja(e) {
  const n = {};
  for (const a in e) {
    const t = e[a].value;
    n[a] = { value: t }, t === null ? n[a].value = { src: "" } : t.isTexture && (n[a].value = { src: t.image.src });
  }
  return n;
}
function Da(e) {
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
function it(e) {
  const n = {};
  for (const a in e) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Da(a))
      continue;
    const t = typeof e[a], i = e[a];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        n[a] = i;
        break;
      case "object":
        if (i !== null)
          if (n[a] = i, i.isTexture)
            if (i instanceof hn) {
              const o = i.source.toJSON();
              n[a] = { src: o.url };
            } else
              i instanceof Hn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = ja(n[a]));
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
      const i = [];
      t.material.forEach((o) => {
        i.push(it(o));
      }), n.material = i;
    } else
      n.material = it(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((o) => {
        i.push(it(o));
      }), n.material = i;
    } else
      n.material = it(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((o) => {
        i.push(it(o));
      }), n.material = i;
    } else
      n.material = it(t.material);
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
function Ia(e, n) {
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
function Na(e, n) {
  for (const a in n)
    e[a] = n[a];
}
function Q(e, n, a) {
  const t = n.split("."), i = t.length;
  if (typeof a != "object")
    switch (i) {
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
  else {
    let u;
    switch (i) {
      case 1:
        u = e[t[0]];
        break;
      case 2:
        u = e[t[0]][t[1]];
        break;
      case 3:
        u = e[t[0]][t[1]][t[2]];
        break;
      case 4:
        u = e[t[0]][t[1]][t[2]][t[3]];
        break;
      case 5:
        u = e[t[0]][t[1]][t[2]][t[3]][t[4]];
        break;
    }
    u !== void 0 && Na(u, a);
  }
}
function Ln(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const i = new hn(t);
      i.wrapS = Ht, i.wrapT = Ht, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Ii extends Ot {
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
    const a = Pt(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: a
    });
  }
  requestMethod(n, a, t, i) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: t,
        subitem: i
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
  handleApp(n, a, t) {
    switch (t.event) {
      case "getObject":
        N.dispatchEvent({ type: L.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        N.dispatchEvent({ type: L.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        N.dispatchEvent({ type: L.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        N.dispatchEvent({ type: L.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        N.dispatchEvent({ type: L.SET_OBJECT, value: t.data });
        break;
      case "setScene":
        N.dispatchEvent({ type: L.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        N.dispatchEvent({ type: L.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        N.dispatchEvent({ type: L.REMOVE_CAMERA, value: t.data });
        break;
    }
  }
  // Renderer
  resize(n, a) {
    this.renderer?.setSize(n, a);
  }
  set dpr(n) {
    this.renderer?.setPixelRatio(Ke(1, 2, n));
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
class Ni extends Ot {
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
    this.pane = new wa({ title: "GUI" }), this.pane.registerPlugin(Ma);
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
  bind(n, a, t, i = void 0) {
    const o = this.bindID, u = t.onChange !== void 0 ? t.onChange : Ft;
    this.bindCBs.set(o, u), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, t).on("change", (h) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: o,
          value: h.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: o,
        name: a,
        params: t,
        parent: i
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, a) {
    const t = this.bindCBs.get(n);
    t !== void 0 ? t(a) : console.warn(`No callback for: ${n}`, a);
  }
  // Buttons
  button(n, a, t = void 0) {
    const i = this.bindID;
    this.buttonCBs.set(i, a), this.app.editor ? (this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addButton({ title: n }).on("click", () => {
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
    const i = a;
    switch (t.event) {
      case "addFolder":
        i.addFolder(t.data.name, t.data.params, t.data.parent);
        break;
      case "bindObject":
        i.bind(t.data.name, t.data.params, t.data.parent);
        break;
      case "updateBind":
        i.triggerBind(t.data.id, t.data.value);
        break;
      case "addButton":
        i.button(t.data.name, t.data.callback, t.data.parent);
        break;
      case "clickButton":
        i.triggerButton(t.data.id);
        break;
    }
  }
}
var It = { exports: {} }, lt = {};
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
function La() {
  if (en)
    return lt;
  en = 1;
  var e = Pn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(c, h, d) {
    var f, m = {}, x = null, O = null;
    d !== void 0 && (x = "" + d), h.key !== void 0 && (x = "" + h.key), h.ref !== void 0 && (O = h.ref);
    for (f in h)
      t.call(h, f) && !o.hasOwnProperty(f) && (m[f] = h[f]);
    if (c && c.defaultProps)
      for (f in h = c.defaultProps, h)
        m[f] === void 0 && (m[f] = h[f]);
    return { $$typeof: n, type: c, key: x, ref: O, props: m, _owner: i.current };
  }
  return lt.Fragment = a, lt.jsx = u, lt.jsxs = u, lt;
}
var ut = {};
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
function Fa() {
  return tn || (tn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Pn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), c = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), H = Symbol.iterator, te = "@@iterator";
    function me(r) {
      if (r === null || typeof r != "object")
        return null;
      var p = H && r[H] || r[te];
      return typeof p == "function" ? p : null;
    }
    var re = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function $(r) {
      {
        for (var p = arguments.length, b = new Array(p > 1 ? p - 1 : 0), C = 1; C < p; C++)
          b[C - 1] = arguments[C];
        D("error", r, b);
      }
    }
    function D(r, p, b) {
      {
        var C = re.ReactDebugCurrentFrame, F = C.getStackAddendum();
        F !== "" && (p += "%s", b = b.concat([F]));
        var U = b.map(function(P) {
          return String(P);
        });
        U.unshift("Warning: " + p), Function.prototype.apply.call(console[r], console, U);
      }
    }
    var Z = !1, ne = !1, Se = !1, V = !1, pe = !1, le;
    le = Symbol.for("react.module.reference");
    function _e(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === t || r === o || pe || r === i || r === d || r === f || V || r === O || Z || ne || Se || typeof r == "object" && r !== null && (r.$$typeof === x || r.$$typeof === m || r.$$typeof === u || r.$$typeof === c || r.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === le || r.getModuleId !== void 0));
    }
    function Te(r, p, b) {
      var C = r.displayName;
      if (C)
        return C;
      var F = p.displayName || p.name || "";
      return F !== "" ? b + "(" + F + ")" : b;
    }
    function ve(r) {
      return r.displayName || "Context";
    }
    function I(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case t:
          return "Fragment";
        case a:
          return "Portal";
        case o:
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
          case c:
            var p = r;
            return ve(p) + ".Consumer";
          case u:
            var b = r;
            return ve(b._context) + ".Provider";
          case h:
            return Te(r, r.render, "ForwardRef");
          case m:
            var C = r.displayName || null;
            return C !== null ? C : I(r.type) || "Memo";
          case x: {
            var F = r, U = F._payload, P = F._init;
            try {
              return I(P(U));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var be = Object.assign, S = 0, we, Re, je, Ae, ke, De, Fe;
    function Be() {
    }
    Be.__reactDisabledLog = !0;
    function ae() {
      {
        if (S === 0) {
          we = console.log, Re = console.info, je = console.warn, Ae = console.error, ke = console.group, De = console.groupCollapsed, Fe = console.groupEnd;
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
        S++;
      }
    }
    function Me() {
      {
        if (S--, S === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: be({}, r, {
              value: we
            }),
            info: be({}, r, {
              value: Re
            }),
            warn: be({}, r, {
              value: je
            }),
            error: be({}, r, {
              value: Ae
            }),
            group: be({}, r, {
              value: ke
            }),
            groupCollapsed: be({}, r, {
              value: De
            }),
            groupEnd: be({}, r, {
              value: Fe
            })
          });
        }
        S < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ye = re.ReactCurrentDispatcher, Ge;
    function ue(r, p, b) {
      {
        if (Ge === void 0)
          try {
            throw Error();
          } catch (F) {
            var C = F.stack.trim().match(/\n( *(at )?)/);
            Ge = C && C[1] || "";
          }
        return `
` + Ge + r;
      }
    }
    var g = !1, v;
    {
      var w = typeof WeakMap == "function" ? WeakMap : Map;
      v = new w();
    }
    function k(r, p) {
      if (!r || g)
        return "";
      {
        var b = v.get(r);
        if (b !== void 0)
          return b;
      }
      var C;
      g = !0;
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var U;
      U = Ye.current, Ye.current = null, ae();
      try {
        if (p) {
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
            } catch (Ne) {
              C = Ne;
            }
            Reflect.construct(r, [], P);
          } else {
            try {
              P.call();
            } catch (Ne) {
              C = Ne;
            }
            r.call(P.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ne) {
            C = Ne;
          }
          r();
        }
      } catch (Ne) {
        if (Ne && C && typeof Ne.stack == "string") {
          for (var R = Ne.stack.split(`
`), he = C.stack.split(`
`), q = R.length - 1, J = he.length - 1; q >= 1 && J >= 0 && R[q] !== he[J]; )
            J--;
          for (; q >= 1 && J >= 0; q--, J--)
            if (R[q] !== he[J]) {
              if (q !== 1 || J !== 1)
                do
                  if (q--, J--, J < 0 || R[q] !== he[J]) {
                    var Ce = `
` + R[q].replace(" at new ", " at ");
                    return r.displayName && Ce.includes("<anonymous>") && (Ce = Ce.replace("<anonymous>", r.displayName)), typeof r == "function" && v.set(r, Ce), Ce;
                  }
                while (q >= 1 && J >= 0);
              break;
            }
        }
      } finally {
        g = !1, Ye.current = U, Me(), Error.prepareStackTrace = F;
      }
      var tt = r ? r.displayName || r.name : "", zt = tt ? ue(tt) : "";
      return typeof r == "function" && v.set(r, zt), zt;
    }
    function ge(r, p, b) {
      return k(r, !1);
    }
    function _(r) {
      var p = r.prototype;
      return !!(p && p.isReactComponent);
    }
    function E(r, p, b) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return k(r, _(r));
      if (typeof r == "string")
        return ue(r);
      switch (r) {
        case d:
          return ue("Suspense");
        case f:
          return ue("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case h:
            return ge(r.render);
          case m:
            return E(r.type, p, b);
          case x: {
            var C = r, F = C._payload, U = C._init;
            try {
              return E(U(F), p, b);
            } catch {
            }
          }
        }
      return "";
    }
    var A = Object.prototype.hasOwnProperty, G = {}, se = re.ReactDebugCurrentFrame;
    function M(r) {
      if (r) {
        var p = r._owner, b = E(r.type, r._source, p ? p.type : null);
        se.setExtraStackFrame(b);
      } else
        se.setExtraStackFrame(null);
    }
    function B(r, p, b, C, F) {
      {
        var U = Function.call.bind(A);
        for (var P in r)
          if (U(r, P)) {
            var R = void 0;
            try {
              if (typeof r[P] != "function") {
                var he = Error((C || "React class") + ": " + b + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              R = r[P](p, P, C, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (q) {
              R = q;
            }
            R && !(R instanceof Error) && (M(F), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", b, P, typeof R), M(null)), R instanceof Error && !(R.message in G) && (G[R.message] = !0, M(F), $("Failed %s type: %s", b, R.message), M(null));
          }
      }
    }
    var W = Array.isArray;
    function Ie(r) {
      return W(r);
    }
    function Je(r) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, b = p && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return b;
      }
    }
    function mt(r) {
      try {
        return pt(r), !1;
      } catch {
        return !0;
      }
    }
    function pt(r) {
      return "" + r;
    }
    function st(r) {
      if (mt(r))
        return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(r)), pt(r);
    }
    var Ue = re.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ct, gt, Qe;
    Qe = {};
    function Tt(r) {
      if (A.call(r, "ref")) {
        var p = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Rt(r) {
      if (A.call(r, "key")) {
        var p = Object.getOwnPropertyDescriptor(r, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function At(r, p) {
      if (typeof r.ref == "string" && Ue.current && p && Ue.current.stateNode !== p) {
        var b = I(Ue.current.type);
        Qe[b] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(Ue.current.type), r.ref), Qe[b] = !0);
      }
    }
    function vt(r, p) {
      {
        var b = function() {
          ct || (ct = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function $e(r, p) {
      {
        var b = function() {
          gt || (gt = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var $t = function(r, p, b, C, F, U, P) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: p,
        ref: b,
        props: P,
        // Record the component responsible for creating this element.
        _owner: U
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
        value: F
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function s(r, p, b, C, F) {
      {
        var U, P = {}, R = null, he = null;
        b !== void 0 && (st(b), R = "" + b), Rt(p) && (st(p.key), R = "" + p.key), Tt(p) && (he = p.ref, At(p, F));
        for (U in p)
          A.call(p, U) && !ot.hasOwnProperty(U) && (P[U] = p[U]);
        if (r && r.defaultProps) {
          var q = r.defaultProps;
          for (U in q)
            P[U] === void 0 && (P[U] = q[U]);
        }
        if (R || he) {
          var J = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          R && vt(P, J), he && $e(P, J);
        }
        return $t(r, R, he, F, C, Ue.current, P);
      }
    }
    var y = re.ReactCurrentOwner, T = re.ReactDebugCurrentFrame;
    function j(r) {
      if (r) {
        var p = r._owner, b = E(r.type, r._source, p ? p.type : null);
        T.setExtraStackFrame(b);
      } else
        T.setExtraStackFrame(null);
    }
    var ee;
    ee = !1;
    function ye(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function de() {
      {
        if (y.current) {
          var r = I(y.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Vt(r) {
      {
        if (r !== void 0) {
          var p = r.fileName.replace(/^.*[\\\/]/, ""), b = r.lineNumber;
          return `

Check your code at ` + p + ":" + b + ".";
        }
        return "";
      }
    }
    var bt = {};
    function yt(r) {
      {
        var p = de();
        if (!p) {
          var b = typeof r == "string" ? r : r.displayName || r.name;
          b && (p = `

Check the top-level render call using <` + b + ">.");
        }
        return p;
      }
    }
    function xe(r, p) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var b = yt(p);
        if (bt[b])
          return;
        bt[b] = !0;
        var C = "";
        r && r._owner && r._owner !== y.current && (C = " It was passed a child from " + I(r._owner.type) + "."), j(r), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, C), j(null);
      }
    }
    function Ee(r, p) {
      {
        if (typeof r != "object")
          return;
        if (Ie(r))
          for (var b = 0; b < r.length; b++) {
            var C = r[b];
            ye(C) && xe(C, p);
          }
        else if (ye(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var F = me(r);
          if (typeof F == "function" && F !== r.entries)
            for (var U = F.call(r), P; !(P = U.next()).done; )
              ye(P.value) && xe(P.value, p);
        }
      }
    }
    function We(r) {
      {
        var p = r.type;
        if (p == null || typeof p == "string")
          return;
        var b;
        if (typeof p == "function")
          b = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === m))
          b = p.propTypes;
        else
          return;
        if (b) {
          var C = I(p);
          B(b, r.props, "prop", C, r);
        } else if (p.PropTypes !== void 0 && !ee) {
          ee = !0;
          var F = I(p);
          $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(r) {
      {
        for (var p = Object.keys(r.props), b = 0; b < p.length; b++) {
          var C = p[b];
          if (C !== "children" && C !== "key") {
            j(r), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), j(null);
            break;
          }
        }
        r.ref !== null && (j(r), $("Invalid attribute `ref` supplied to `React.Fragment`."), j(null));
      }
    }
    function Ve(r, p, b, C, F, U) {
      {
        var P = _e(r);
        if (!P) {
          var R = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = Vt(F);
          he ? R += he : R += de();
          var q;
          r === null ? q = "null" : Ie(r) ? q = "array" : r !== void 0 && r.$$typeof === n ? (q = "<" + (I(r.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : q = typeof r, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", q, R);
        }
        var J = s(r, p, b, F, U);
        if (J == null)
          return J;
        if (P) {
          var Ce = p.children;
          if (Ce !== void 0)
            if (C)
              if (Ie(Ce)) {
                for (var tt = 0; tt < Ce.length; tt++)
                  Ee(Ce[tt], r);
                Object.freeze && Object.freeze(Ce);
              } else
                $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ee(Ce, r);
        }
        return r === t ? Oe(J) : We(J), J;
      }
    }
    function et(r, p, b) {
      return Ve(r, p, b, !0);
    }
    function xt(r, p, b) {
      return Ve(r, p, b, !1);
    }
    var Vn = xt, zn = et;
    ut.Fragment = t, ut.jsx = Vn, ut.jsxs = zn;
  }()), ut;
}
process.env.NODE_ENV === "production" ? It.exports = La() : It.exports = Fa();
var l = It.exports;
function Fn(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ l.jsx("button", { children: e.title });
}
const Ba = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ua = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function $a(e) {
  return /* @__PURE__ */ l.jsx(jn.Item, { value: e.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ua,
    /* @__PURE__ */ l.jsx("span", { children: e.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Ba })
  ] }) }, e.title);
}
function Va(e) {
  const [n, a] = K(!1), [t, i] = K(e.options), o = (d) => {
    e.onDragComplete(d), i(d);
  }, u = (d) => {
    const f = [...t];
    f.splice(d, 1), o(f);
  }, c = [];
  t.forEach((d, f) => {
    c.push(/* @__PURE__ */ l.jsx($a, { index: f, title: d, onDelete: u }, d));
  });
  let h = "dropdown draggable";
  return e.subdropdown && (h += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: h, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Fn, { title: e.title }),
    /* @__PURE__ */ l.jsx(jn.Group, { axis: "y", values: t, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function za(e) {
  const [n, a] = K(!1), t = [];
  e.options.map((o, u) => {
    e.onSelect !== void 0 && (o.onSelect = e.onSelect), t.push(/* @__PURE__ */ l.jsx(Ha, { option: o }, u));
  });
  let i = "dropdown";
  return e.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Fn, { title: e.title }),
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
function Ha(e) {
  const { option: n } = e, [a, t] = K("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        Va,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (o) => {
            n.onDragComplete !== void 0 && n.onDragComplete(o);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      i = /* @__PURE__ */ l.jsx(
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
      i = /* @__PURE__ */ l.jsx(
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: i }, _a());
}
function Li(e, n, a) {
  function t(o) {
    switch (n.forEach((u) => {
      u.callback(e, u.remote, o);
    }), o.event) {
      case "custom":
        N.dispatchEvent({ type: L.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((u) => {
      u.callback(e, u.remote, o);
    }), o.event) {
      case "custom":
        N.dispatchEvent({ type: L.CUSTOM, value: o.data });
        break;
    }
  }
  e.listen = (o) => {
    o.target === "editor" ? i(o) : t(o);
  };
}
function Ut(e) {
  const [n, a] = K(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const i = !n;
          e.onToggle !== void 0 && e.onToggle(i), a(i);
        },
        children: [
          /* @__PURE__ */ l.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "label", children: Mt(e.label) })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: e.children }) })
  ] });
}
function Bn(e) {
  const [n, a] = K(!1), t = e.child !== void 0 && e.child.children.length > 0, i = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((o) => {
    i.push(/* @__PURE__ */ l.jsx(Bn, { child: o, three: e.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Pa(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: i }) })
  ] }, Math.random()) });
}
function Ya(e) {
  const n = [];
  return e.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Bn, { child: a, three: e.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const Ga = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Wa(e) {
  return "items" in e;
}
function Ze(e) {
  const n = [];
  return e.items.forEach((a) => {
    Wa(a) ? n.push(
      /* @__PURE__ */ l.jsx(Ze, { title: Mt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        ft,
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
          onChange: (t, i) => {
            a.onChange !== void 0 && a.onChange(t, i);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Ut, { label: e.title, open: e.expanded === !0, children: n });
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
function _t(e) {
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
function Un(e) {
  const n = e.toLowerCase();
  return n.search("intensity") > -1 || n === "anisotropyrotation" || n === "blendalpha" || n === "bumpscale" || n === "clearcoatroughness" || n === "displacementbias" || n === "displacementscale" || n === "metalness" || n === "opacity" || n === "reflectivity" || n === "refractionratio" || n === "roughness" || n === "sheenroughness" || n === "thickness";
}
function Xa() {
  const e = document.createElement("input");
  return e.type = "file", new Promise((n, a) => {
    e.addEventListener("change", function() {
      if (e.files === null)
        a();
      else {
        const t = e.files[0], i = new FileReader();
        i.onload = function(o) {
          n(o.target.result);
        }, i.readAsDataURL(t);
      }
    }), e.click();
  });
}
const Za = [
  {
    title: "Front",
    value: Yn
  },
  {
    title: "Back",
    value: fn
  },
  {
    title: "Double",
    value: mn
  }
], Ja = [
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
    value: qn
  },
  {
    title: "Subtractive",
    value: Kn
  },
  {
    title: "Multiply",
    value: Xn
  },
  {
    title: "Custom",
    value: Zn
  }
], Qa = [
  {
    title: "Add",
    value: Jn
  },
  {
    title: "Subtract",
    value: Qn
  },
  {
    title: "Reverse Subtract",
    value: ea
  },
  {
    title: "Min",
    value: ta
  },
  {
    title: "Max",
    value: na
  }
], ei = [
  {
    title: "Zero",
    valye: pn
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
    valye: En
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
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
    valye: aa
  },
  {
    title: "Constant Color",
    valye: Mn
  },
  {
    title: "One Minus Constant Color",
    valye: On
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
    valye: pn
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
    valye: En
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
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
    valye: Mn
  },
  {
    title: "One Minus Constant Color",
    valye: On
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
function dt(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ni(e, n, a, t) {
  return {
    type: "boolean",
    title: _t(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, o) => {
      t.updateObject(a.uuid, `material.${e}`, o), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const u = t.scene?.getObjectByProperty("uuid", a.uuid);
      u !== void 0 && Q(u, `material.${e}`, o);
    }
  };
}
function ai(e, n, a, t) {
  const i = {
    type: "number",
    title: _t(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (o, u) => {
      t.updateObject(a.uuid, `material.${e}`, u), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const c = t.scene?.getObjectByProperty("uuid", a.uuid);
      c !== void 0 && Q(c, `material.${e}`, u);
    }
  };
  switch (e) {
    case "blending":
      dt(i, Ja);
      break;
    case "blendDst":
      dt(i, ti);
      break;
    case "blendEquation":
      dt(i, Qa);
      break;
    case "blendSrc":
      dt(i, ei);
      break;
    case "side":
      dt(i, Za);
      break;
  }
  return Un(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function ii(e, n, a, t) {
  const i = {
    type: "string",
    title: _t(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (u, c) => {
      t.updateObject(a.uuid, `material.${e}`, c), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = t.scene?.getObjectByProperty("uuid", a.uuid);
      h !== void 0 && Q(h, `material.${e}`, c);
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (u, c) => {
    i.latest = c;
  }), i;
}
function ri(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function si(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function oi(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function Nt(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function ht(e, n, a, t, i = "", o = !1) {
  const u = _t(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), c = i.length > 0 ? `${i}.${e}` : e, h = typeof n;
  if (h === "boolean" || h === "string")
    return {
      title: u,
      prop: c,
      type: h,
      value: n,
      disabled: o,
      onChange: (d, f) => {
        t.updateObject(a.uuid, `material.${c}`, f);
        const m = t.scene?.getObjectByProperty("uuid", a.uuid);
        m !== void 0 && Q(m, `material.${c}`, f);
      }
    };
  if (h === "number") {
    const d = {
      title: u,
      prop: c,
      type: "number",
      value: n,
      step: 0.01,
      disabled: o,
      onChange: (f, m) => {
        t.updateObject(a.uuid, `material.${c}`, m);
        const x = t.scene?.getObjectByProperty("uuid", a.uuid);
        x !== void 0 && Q(x, `material.${c}`, m);
      }
    };
    return Un(u) && (d.type = "range", d.min = 0, d.max = 1), d;
  } else {
    if (n.isColor)
      return {
        title: u,
        prop: c,
        type: "color",
        value: n,
        disabled: o,
        onChange: (d, f) => {
          const m = new Lt(f);
          t.updateObject(a.uuid, `material.${c}`, m);
          const x = t.scene?.getObjectByProperty("uuid", a.uuid);
          x !== void 0 && Q(x, `material.${c}`, m);
        }
      };
    if (Array.isArray(n)) {
      const d = [];
      for (const f in n) {
        const m = n[f], x = `[${f.toString()}]`;
        if (m.value !== void 0) {
          const O = ht(`${x}.value`, m.value, a, t, c, o);
          O !== void 0 && d.push(O);
        } else {
          const O = ht(x, m, a, t, c, o);
          O !== void 0 && d.push(O);
        }
      }
      if (d.length > 0)
        return Nt(d), {
          title: u,
          items: d
        };
    } else {
      if (ri(n))
        return {
          title: u,
          prop: c,
          type: "vector2",
          value: n,
          disabled: o,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && Q(m, `material.${c}`, f);
          }
        };
      if (si(n))
        return {
          title: u,
          prop: c,
          type: "grid3",
          value: n,
          disabled: o,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && Q(m, `material.${c}`, f);
          }
        };
      if (oi(n))
        return {
          title: u,
          prop: c,
          type: "grid4",
          value: n,
          disabled: o,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && Q(m, `material.${c}`, f);
          }
        };
      if (n.isEuler)
        return {
          title: u,
          prop: c,
          type: "euler",
          value: n,
          disabled: o,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && Q(m, `material.${c}`, f);
          }
        };
      if (n.src !== void 0)
        return {
          title: u,
          type: "image",
          value: n,
          disabled: o,
          onChange: (d, f) => {
            const m = Ka(e), x = i.length > 0 ? `${i}.${m}` : m;
            t.createTexture(a.uuid, `material.${x}`, f);
            const O = t.scene?.getObjectByProperty("uuid", a.uuid);
            O !== void 0 && Ln(f).then((H) => {
              Q(O, `material.${x}`, H), Q(O, "material.needsUpdate", !0);
            });
          }
        };
      if (n.elements !== void 0)
        return {
          title: u,
          prop: c,
          type: n.elements.length > 9 ? "grid4" : "grid3",
          value: n,
          disabled: o,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && Q(m, `material.${c}`, f);
          }
        };
      {
        const d = [], f = e === "defines" || e === "extensions";
        try {
          for (const m in n) {
            const x = n[m];
            if (x !== void 0)
              if (x.value !== void 0) {
                const O = ht(`${m}.value`, x.value, a, t, c, f);
                O !== void 0 && d.push(O);
              } else {
                const O = ht(m, x, a, t, c, f);
                O !== void 0 && d.push(O);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (d.length > 0)
          return Nt(d), {
            title: u,
            items: d
          };
      }
    }
  }
}
function nn(e, n, a) {
  const t = [];
  for (const i in e) {
    if (!qa(i))
      continue;
    const o = typeof e[i], u = e[i];
    if (o === "boolean")
      t.push(ni(i, u, n, a));
    else if (o === "number")
      t.push(ai(i, u, n, a));
    else if (o === "string")
      t.push(ii(i, u, n, a));
    else if (o === "object") {
      const c = ht(i, u, n, a);
      c !== void 0 && t.push(c);
    } else
      u !== void 0 && console.log("other:", i, o, u);
  }
  return Nt(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), t;
}
function ci(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let o = 0; o < i; o++)
      t.push(
        /* @__PURE__ */ l.jsx(
          Ze,
          {
            title: `Material ${o}`,
            items: nn(a[o], e, n)
          },
          `Material ${o}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
  } else
    return /* @__PURE__ */ l.jsx(
      Ze,
      {
        title: "Material",
        items: nn(a, e, n)
      }
    );
}
function li(e) {
  const [n, a] = K(e.defaultValue);
  return Pe(() => {
    let t = !1, i = -1, o = 0, u = e.defaultValue;
    const c = (x) => {
      t = !0, o = Number(e.input.current?.value), i = x.clientX, document.addEventListener("mouseup", d, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", d, !1);
    }, h = (x) => {
      if (!t)
        return;
      const O = e.step !== void 0 ? e.step : 1, H = (x.clientX - i) * O;
      u = Number((o + H).toFixed(4)), e.min !== void 0 && (u = Math.max(u, e.min)), e.max !== void 0 && (u = Math.min(u, e.max)), e.onChange !== void 0 && e.onChange(u), a(u);
    }, d = () => {
      t = !1, document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
    }, f = (x) => {
      const O = Number(x.target.value);
      a(O);
    }, m = (x) => {
      const O = Number(x.target.value);
      e.onChange !== void 0 && e.onChange(O), a(O);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", c, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", m), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", c), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
    };
  }, []), n;
}
function Xe(e) {
  const n = X(null), a = X(null), t = li({
    label: e.labelRef,
    input: n,
    sliderRef: a,
    defaultValue: e.value,
    min: e.min,
    max: e.max,
    step: e.step,
    onChange: (i) => {
      e.onChange !== void 0 && e.onChange(e.prop, i);
    }
  });
  return /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    e.type === "number" && /* @__PURE__ */ l.jsx(
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
        onChange: (i) => {
          const o = Number(i.target.value);
          e.onChange !== void 0 && e.onChange(e.prop, o);
        }
      }
    ),
    e.type === "range" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        "input",
        {
          type: "text",
          value: t.toString(),
          disabled: e.disabled,
          ref: n,
          className: "min",
          onChange: (i) => {
            const o = Number(i.target.value);
            e.onChange !== void 0 && e.onChange(e.prop, o);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: t,
          min: e.min,
          max: e.max,
          step: e.step,
          ref: a,
          onChange: Ft
        }
      )
    ] })
  ] });
}
function ui(e) {
  const n = X(null), a = X(null), t = X(null), i = X(null), o = X(null), u = X(null), [c, h] = K(e.value), [d, f] = K({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [m, x] = K(!1);
  function O() {
    m || (window.addEventListener("mousemove", te), window.addEventListener("mouseup", H), window.addEventListener("mouseup", H), x(!0));
  }
  function H() {
    window.removeEventListener("mousemove", te), window.removeEventListener("mouseup", H), x(!1);
  }
  function te(D) {
    const Z = o.current.getBoundingClientRect(), ne = Ke(0, 99, D.clientX - Z.left) / 99, Se = Ke(0, 99, D.clientY - Z.top) / 99, V = Qt(Jt(d.min, d.max, ne), 3), pe = Qt(Jt(d.min, d.max, Se), 3);
    e.onChange({ target: { value: { x: V, y: pe } } }), h({ x: V, y: pe });
  }
  function me(D) {
    let Z = c.x, ne = c.y;
    D.target === n.current ? Z = Number(D.target.value) : ne = Number(D.target.value), h({ x: Z, y: ne });
  }
  function re() {
    const D = Number(t.current.value);
    f({ min: D, max: d.max }), (c.x < D || c.y < D) && h({ x: Ke(D, d.max, c.x), y: Ke(D, d.max, c.y) });
  }
  function $() {
    const D = Number(i.current.value);
    f({ min: d.min, max: D }), (c.x > D || c.y > D) && h({ x: Ke(d.min, D, c.x), y: Ke(d.min, D, c.y) });
  }
  return Pe(() => {
    const D = Zt(d.min, d.max, c.x), Z = Zt(d.min, d.max, c.y);
    u.current.style.left = `${D * 100}%`, u.current.style.top = `${Z * 100}%`;
  }, [d, c]), /* @__PURE__ */ l.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: c.x,
            min: d.min,
            max: d.max,
            step: 0.01,
            onChange: me
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
            value: c.y,
            min: d.min,
            max: d.max,
            step: 0.01,
            onChange: me
          }
        )
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: d.min,
            step: 0.01,
            onChange: re
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
            onChange: $
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: o, onMouseDown: O, onMouseUp: H, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: u })
    ] })
  ] });
}
function an(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = [];
  if (n) {
    const o = ie(() => e.value, []), u = (h, d) => {
      o[h] = d, e.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((h) => {
      const d = X(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: h.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Xe,
            {
              value: o[h],
              type: "number",
              prop: h,
              step: 0.01,
              labelRef: d,
              onChange: u
            }
          )
        ] }, h)
      );
    });
  } else if (a) {
    const o = ie(() => e.value, []), u = (h, d) => {
      o[h] = d, e.onChange({ target: { value: o } });
    };
    ["_x", "_y", "_z"].forEach((h) => {
      const d = X(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: h.substring(1).toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Xe,
            {
              value: o[h],
              type: "number",
              prop: h,
              step: 0.01,
              labelRef: d,
              onChange: u
            }
          )
        ] }, h)
      );
    });
  } else if (t) {
    const o = ie(() => e.value, []), u = (c, h) => {
      const d = Number(c);
      o.elements[d] = h, e.onChange({ target: { value: o } });
    };
    for (let c = 0; c < 9; c++) {
      const h = X(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: c + 1 }),
          /* @__PURE__ */ l.jsx(
            Xe,
            {
              value: o.elements[c],
              type: "number",
              prop: c.toString(),
              step: 0.01,
              labelRef: h,
              onChange: u
            }
          )
        ] }, c.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid3", children: i }, Math.random().toString());
}
function di(e) {
  const n = e.value.x !== void 0, a = [];
  if (n) {
    const t = ie(() => e.value, []), i = (u, c) => {
      t[u] = c, e.onChange({ target: { value: t } });
    };
    ["x", "y", "z", "w"].forEach((u) => {
      const c = X(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: c, children: u.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Xe,
            {
              value: t.x,
              type: "number",
              prop: u,
              step: 0.01,
              labelRef: c,
              onChange: i
            }
          )
        ] }, u)
      );
    });
  } else {
    const t = ie(() => e.value, []), i = (o, u) => {
      const c = Number(o);
      t.elements[c] = u, e.onChange({ target: { value: t } });
    };
    for (let o = 0; o < 16; o++) {
      const u = X(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: u, children: o + 1 }),
          /* @__PURE__ */ l.jsx(
            Xe,
            {
              value: t.elements[o],
              type: "number",
              prop: o.toString(),
              step: 0.01,
              labelRef: u,
              onChange: i
            }
          )
        ] }, o.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid4", children: a });
}
function ft(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Ra(e.value));
  const [a, t] = K(n), i = X(null), o = X(null), u = (f) => {
    let m = f.target.value;
    e.type === "boolean" ? m = f.target.checked : e.type === "option" && (m = e.options[m].value), t(m), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, m);
  }, c = {};
  e.disabled && (c.opacity = 0.8);
  const h = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = h || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, style: c, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Mt(e.title) }, "fieldLabel"),
    e.type === "string" && !h && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: u,
        value: a
      }
    ),
    e.type === "string" && h && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: u,
        value: a
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: u,
        checked: a
      }
    ),
    e.type === "number" && /* @__PURE__ */ l.jsx(
      Xe,
      {
        value: a,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: i,
        onChange: e.onChange
      }
    ),
    e.type === "range" && /* @__PURE__ */ l.jsx(
      Xe,
      {
        value: a,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: i,
        onChange: e.onChange
      }
    ),
    e.type === "color" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: u, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: u, disabled: e.disabled })
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
    e.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: o, onClick: () => {
      Xa().then((f) => {
        o.current.src = f, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
      });
    }, src: a.length > 0 ? a : Ga }),
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: u, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((f, m) => /* @__PURE__ */ l.jsx("option", { value: f.value, children: Mt(f.title) }, m)) }) }),
    e.type === "vector2" && /* @__PURE__ */ l.jsx(ui, { value: a, min: 0, max: 1, onChange: u }),
    e.type === "grid3" && /* @__PURE__ */ l.jsx(an, { value: a, onChange: u }),
    e.type === "grid4" && /* @__PURE__ */ l.jsx(di, { value: a, onChange: u }),
    e.type === "euler" && /* @__PURE__ */ l.jsx(an, { value: a, onChange: u })
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
function hi(e, n) {
  const a = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      a.push({
        title: rn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = n.scene?.getObjectByProperty("uuid", e.uuid);
          u !== void 0 && (Q(u, i, o), u.updateProjectionMatrix());
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
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = n.scene?.getObjectByProperty("uuid", e.uuid);
          u !== void 0 && (Q(u, i, o), u.updateProjectionMatrix());
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
function fi(e, n) {
  const a = new ia();
  a.elements = e.matrix;
  const t = new Y(), i = new ra(), o = new Y();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const u = (c, h) => {
    const d = c === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    n.updateObject(e.uuid, c, d);
    const f = n.scene?.getObjectByProperty("uuid", e.uuid);
    f !== void 0 && Q(f, c, d);
  };
  return /* @__PURE__ */ l.jsx(
    Ze,
    {
      title: "Transform",
      items: [
        {
          title: "Position",
          prop: "position",
          type: "grid3",
          value: t,
          onChange: u
        },
        {
          title: "Rotation",
          prop: "rotation",
          type: "grid3",
          value: i,
          onChange: u
        },
        {
          title: "Scale",
          prop: "scale",
          type: "grid3",
          value: o,
          onChange: u
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
function mi(e, n) {
  const a = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const i = e.lightInfo[t];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: sn(t),
        prop: t,
        type: "color",
        value: i,
        onChange: (o, u) => {
          const c = new Lt(u);
          n.updateObject(e.uuid, o, c);
          const h = n.scene?.getObjectByProperty("uuid", e.uuid);
          h !== void 0 && Q(h, o, c);
        }
      }) : a.push({
        title: sn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (o, u) => {
          n.updateObject(e.uuid, o, u);
          const c = n.scene?.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && Q(c, o, u);
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
function pi(e, n) {
  const a = [], t = [];
  let i = 0;
  e.animations.forEach((c) => {
    i = Math.max(i, c.duration), c.duration > 0 && t.push({
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
  const o = n.scene?.getObjectByProperty("uuid", e.uuid);
  let u = !1;
  if (o !== void 0) {
    const c = o.mixer;
    if (u = c !== void 0, u) {
      const h = [
        {
          title: "Time Scale",
          type: "range",
          value: c.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (d, f) => {
            c.timeScale = f, n.updateObject(e.uuid, "mixer.timeScale", f);
          }
        }
      ];
      h.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          c.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: h
      });
    }
  }
  return /* @__PURE__ */ l.jsx(Ze, { title: "Animation", items: a });
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
let oe = { ...$n };
function gi(e) {
  const [n, a] = K(-1);
  Pe(() => {
    function u(h) {
      oe = { ...h.value }, a(Date.now());
    }
    function c() {
      oe = { ...$n }, a(Date.now());
    }
    return N.addEventListener(L.SET_SCENE, c), N.addEventListener(L.SET_OBJECT, u), () => {
      N.removeEventListener(L.SET_SCENE, c), N.removeEventListener(L.SET_OBJECT, u);
    };
  }, []);
  const t = oe.type.toLowerCase(), i = oe.animations.length > 0 || oe.mixer !== void 0, o = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Ut, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: oe.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        ft,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: oe.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ft,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: oe.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ft,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: oe.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ft,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: oe.visible,
          onChange: (u, c) => {
            e.three.updateObject(oe.uuid, u, c);
            const h = e.three.scene?.getObjectByProperty("uuid", oe.uuid);
            h !== void 0 && Q(h, u, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      fi(oe, e.three),
      i ? pi(oe, e.three) : null,
      t.search("camera") > -1 ? hi(oe, e.three) : null,
      t.search("light") > -1 ? mi(oe, e.three) : null,
      o ? ci(oe, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Fi(e) {
  const [n, a] = K(e.scene);
  Pe(() => {
    const o = (u) => {
      a(u.value);
    };
    return N.addEventListener(L.SET_SCENE, o), () => {
      N.removeEventListener(L.SET_SCENE, o);
    };
  }, []);
  const t = n !== null, i = "Hierarchy - " + (t ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Ut, { label: i, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: t && /* @__PURE__ */ l.jsx(Ya, { child: n, three: e.three }) }) }),
    /* @__PURE__ */ l.jsx(gi, { three: e.three })
  ] }, "SidePanel");
}
function Bi(e) {
  function n() {
    return e.three.scene === void 0 ? (console.log("No scene:", e.three), !1) : !0;
  }
  const a = (c) => {
    if (!n())
      return;
    const h = e.three.scene?.getObjectByProperty("uuid", c.value);
    h !== void 0 && e.three.setObject(h);
  }, t = (c, h, d) => {
    if (!n())
      return;
    const f = e.three.scene?.getObjectByProperty("uuid", c);
    f !== void 0 && Q(f, h, d);
  }, i = (c) => {
    if (!n())
      return;
    const h = c.value, { key: d, value: f, uuid: m } = h;
    t(m, d, f);
  }, o = (c) => {
    if (!n())
      return;
    const h = c.value;
    Ln(h.value).then((d) => {
      t(h.uuid, h.key, d), t(h.uuid, "material.needsUpdate", !0);
    });
  }, u = (c) => {
    if (!n())
      return;
    const { key: h, uuid: d, value: f, subitem: m } = c.value, x = e.three.scene?.getObjectByProperty("uuid", d);
    if (x !== void 0)
      try {
        m !== void 0 ? Ia(x, m)[h](f) : x[h](f);
      } catch (O) {
        console.log("Error requesting method:"), console.log(O), console.log(h), console.log(f);
      }
  };
  return Pe(() => (N.addEventListener(L.GET_OBJECT, a), N.addEventListener(L.UPDATE_OBJECT, i), N.addEventListener(L.CREATE_TEXTURE, o), N.addEventListener(L.REQUEST_METHOD, u), () => {
    N.removeEventListener(L.GET_OBJECT, a), N.removeEventListener(L.UPDATE_OBJECT, i), N.removeEventListener(L.CREATE_TEXTURE, o), N.removeEventListener(L.REQUEST_METHOD, u);
  }), []), null;
}
class vi extends sa {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new Yt();
    i.setAttribute("position", new Gt(t, 3)), i.computeBoundingSphere();
    const o = new oa({ fog: !1 });
    super(i, o), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const u = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], c = new Yt();
    c.setAttribute("position", new Gt(u, 3)), c.computeBoundingSphere(), this.add(new Rn(c, new An({ side: fn, fog: !1 })));
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
const on = { type: "change" }, jt = { type: "start" }, cn = { type: "end" }, Et = new ca(), ln = new la(), bi = Math.cos(70 * ua.DEG2RAD);
class yi extends dn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Y(), this.cursor = new Y(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: nt.ROTATE, MIDDLE: nt.DOLLY, RIGHT: nt.PAN }, this.touches = { ONE: at.ROTATE, TWO: at.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", ot), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ot), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(on), t.update(), o = i.NONE;
    }, this.update = function() {
      const s = new Y(), y = new Wt().setFromUnitVectors(n.up, new Y(0, 1, 0)), T = y.clone().invert(), j = new Y(), ee = new Wt(), ye = new Y(), de = 2 * Math.PI;
      return function(bt = null) {
        const yt = t.object.position;
        s.copy(yt).sub(t.target), s.applyQuaternion(y), c.setFromVector3(s), t.autoRotate && o === i.NONE && ve(_e(bt)), t.enableDamping ? (c.theta += h.theta * t.dampingFactor, c.phi += h.phi * t.dampingFactor) : (c.theta += h.theta, c.phi += h.phi);
        let xe = t.minAzimuthAngle, Ee = t.maxAzimuthAngle;
        isFinite(xe) && isFinite(Ee) && (xe < -Math.PI ? xe += de : xe > Math.PI && (xe -= de), Ee < -Math.PI ? Ee += de : Ee > Math.PI && (Ee -= de), xe <= Ee ? c.theta = Math.max(xe, Math.min(Ee, c.theta)) : c.theta = c.theta > (xe + Ee) / 2 ? Math.max(xe, c.theta) : Math.min(Ee, c.theta)), c.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, c.phi)), c.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let We = !1;
        if (t.zoomToCursor && Se || t.object.isOrthographicCamera)
          c.radius = ke(c.radius);
        else {
          const Oe = c.radius;
          c.radius = ke(c.radius * d), We = Oe != c.radius;
        }
        if (s.setFromSpherical(c), s.applyQuaternion(T), yt.copy(t.target).add(s), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && Se) {
          let Oe = null;
          if (t.object.isPerspectiveCamera) {
            const Ve = s.length();
            Oe = ke(Ve * d);
            const et = Ve - Oe;
            t.object.position.addScaledVector(Z, et), t.object.updateMatrixWorld(), We = !!et;
          } else if (t.object.isOrthographicCamera) {
            const Ve = new Y(ne.x, ne.y, 0);
            Ve.unproject(t.object);
            const et = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), t.object.updateProjectionMatrix(), We = et !== t.object.zoom;
            const xt = new Y(ne.x, ne.y, 0);
            xt.unproject(t.object), t.object.position.sub(xt).add(Ve), t.object.updateMatrixWorld(), Oe = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Oe !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Oe).add(t.object.position) : (Et.origin.copy(t.object.position), Et.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Et.direction)) < bi ? n.lookAt(t.target) : (ln.setFromNormalAndCoplanarPoint(t.object.up, t.target), Et.intersectPlane(ln, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Oe = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), Oe !== t.object.zoom && (t.object.updateProjectionMatrix(), We = !0);
        }
        return d = 1, Se = !1, We || j.distanceToSquared(t.object.position) > u || 8 * (1 - ee.dot(t.object.quaternion)) > u || ye.distanceToSquared(t.target) > u ? (t.dispatchEvent(on), j.copy(t.object.position), ee.copy(t.object.quaternion), ye.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Qe), t.domElement.removeEventListener("pointerdown", M), t.domElement.removeEventListener("pointercancel", W), t.domElement.removeEventListener("wheel", mt), t.domElement.removeEventListener("pointermove", B), t.domElement.removeEventListener("pointerup", W), t.domElement.getRootNode().removeEventListener("keydown", st, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ot), t._domElementKeyEvents = null);
    };
    const t = this, i = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let o = i.NONE;
    const u = 1e-6, c = new qt(), h = new qt();
    let d = 1;
    const f = new Y(), m = new fe(), x = new fe(), O = new fe(), H = new fe(), te = new fe(), me = new fe(), re = new fe(), $ = new fe(), D = new fe(), Z = new Y(), ne = new fe();
    let Se = !1;
    const V = [], pe = {};
    let le = !1;
    function _e(s) {
      return s !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function Te(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, t.zoomSpeed * y);
    }
    function ve(s) {
      h.theta -= s;
    }
    function I(s) {
      h.phi -= s;
    }
    const be = function() {
      const s = new Y();
      return function(T, j) {
        s.setFromMatrixColumn(j, 0), s.multiplyScalar(-T), f.add(s);
      };
    }(), S = function() {
      const s = new Y();
      return function(T, j) {
        t.screenSpacePanning === !0 ? s.setFromMatrixColumn(j, 1) : (s.setFromMatrixColumn(j, 0), s.crossVectors(t.object.up, s)), s.multiplyScalar(T), f.add(s);
      };
    }(), we = function() {
      const s = new Y();
      return function(T, j) {
        const ee = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const ye = t.object.position;
          s.copy(ye).sub(t.target);
          let de = s.length();
          de *= Math.tan(t.object.fov / 2 * Math.PI / 180), be(2 * T * de / ee.clientHeight, t.object.matrix), S(2 * j * de / ee.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (be(T * (t.object.right - t.object.left) / t.object.zoom / ee.clientWidth, t.object.matrix), S(j * (t.object.top - t.object.bottom) / t.object.zoom / ee.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Re(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function je(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ae(s, y) {
      if (!t.zoomToCursor)
        return;
      Se = !0;
      const T = t.domElement.getBoundingClientRect(), j = s - T.left, ee = y - T.top, ye = T.width, de = T.height;
      ne.x = j / ye * 2 - 1, ne.y = -(ee / de) * 2 + 1, Z.set(ne.x, ne.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function ke(s) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, s));
    }
    function De(s) {
      m.set(s.clientX, s.clientY);
    }
    function Fe(s) {
      Ae(s.clientX, s.clientX), re.set(s.clientX, s.clientY);
    }
    function Be(s) {
      H.set(s.clientX, s.clientY);
    }
    function ae(s) {
      x.set(s.clientX, s.clientY), O.subVectors(x, m).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      ve(2 * Math.PI * O.x / y.clientHeight), I(2 * Math.PI * O.y / y.clientHeight), m.copy(x), t.update();
    }
    function Me(s) {
      $.set(s.clientX, s.clientY), D.subVectors($, re), D.y > 0 ? Re(Te(D.y)) : D.y < 0 && je(Te(D.y)), re.copy($), t.update();
    }
    function Ye(s) {
      te.set(s.clientX, s.clientY), me.subVectors(te, H).multiplyScalar(t.panSpeed), we(me.x, me.y), H.copy(te), t.update();
    }
    function Ge(s) {
      Ae(s.clientX, s.clientY), s.deltaY < 0 ? je(Te(s.deltaY)) : s.deltaY > 0 && Re(Te(s.deltaY)), t.update();
    }
    function ue(s) {
      let y = !1;
      switch (s.code) {
        case t.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? I(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, t.keyPanSpeed), y = !0;
          break;
        case t.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? I(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, -t.keyPanSpeed), y = !0;
          break;
        case t.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? ve(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(t.keyPanSpeed, 0), y = !0;
          break;
        case t.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? ve(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(-t.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (s.preventDefault(), t.update());
    }
    function g(s) {
      if (V.length === 1)
        m.set(s.pageX, s.pageY);
      else {
        const y = $e(s), T = 0.5 * (s.pageX + y.x), j = 0.5 * (s.pageY + y.y);
        m.set(T, j);
      }
    }
    function v(s) {
      if (V.length === 1)
        H.set(s.pageX, s.pageY);
      else {
        const y = $e(s), T = 0.5 * (s.pageX + y.x), j = 0.5 * (s.pageY + y.y);
        H.set(T, j);
      }
    }
    function w(s) {
      const y = $e(s), T = s.pageX - y.x, j = s.pageY - y.y, ee = Math.sqrt(T * T + j * j);
      re.set(0, ee);
    }
    function k(s) {
      t.enableZoom && w(s), t.enablePan && v(s);
    }
    function ge(s) {
      t.enableZoom && w(s), t.enableRotate && g(s);
    }
    function _(s) {
      if (V.length == 1)
        x.set(s.pageX, s.pageY);
      else {
        const T = $e(s), j = 0.5 * (s.pageX + T.x), ee = 0.5 * (s.pageY + T.y);
        x.set(j, ee);
      }
      O.subVectors(x, m).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      ve(2 * Math.PI * O.x / y.clientHeight), I(2 * Math.PI * O.y / y.clientHeight), m.copy(x);
    }
    function E(s) {
      if (V.length === 1)
        te.set(s.pageX, s.pageY);
      else {
        const y = $e(s), T = 0.5 * (s.pageX + y.x), j = 0.5 * (s.pageY + y.y);
        te.set(T, j);
      }
      me.subVectors(te, H).multiplyScalar(t.panSpeed), we(me.x, me.y), H.copy(te);
    }
    function A(s) {
      const y = $e(s), T = s.pageX - y.x, j = s.pageY - y.y, ee = Math.sqrt(T * T + j * j);
      $.set(0, ee), D.set(0, Math.pow($.y / re.y, t.zoomSpeed)), Re(D.y), re.copy($);
      const ye = (s.pageX + y.x) * 0.5, de = (s.pageY + y.y) * 0.5;
      Ae(ye, de);
    }
    function G(s) {
      t.enableZoom && A(s), t.enablePan && E(s);
    }
    function se(s) {
      t.enableZoom && A(s), t.enableRotate && _(s);
    }
    function M(s) {
      t.enabled !== !1 && (V.length === 0 && (t.domElement.setPointerCapture(s.pointerId), t.domElement.addEventListener("pointermove", B), t.domElement.addEventListener("pointerup", W)), !At(s) && (Tt(s), s.pointerType === "touch" ? ct(s) : Ie(s)));
    }
    function B(s) {
      t.enabled !== !1 && (s.pointerType === "touch" ? gt(s) : Je(s));
    }
    function W(s) {
      switch (Rt(s), V.length) {
        case 0:
          t.domElement.releasePointerCapture(s.pointerId), t.domElement.removeEventListener("pointermove", B), t.domElement.removeEventListener("pointerup", W), t.dispatchEvent(cn), o = i.NONE;
          break;
        case 1:
          const y = V[0], T = pe[y];
          ct({ pointerId: y, pageX: T.x, pageY: T.y });
          break;
      }
    }
    function Ie(s) {
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
        case nt.DOLLY:
          if (t.enableZoom === !1)
            return;
          Fe(s), o = i.DOLLY;
          break;
        case nt.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enablePan === !1)
              return;
            Be(s), o = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            De(s), o = i.ROTATE;
          }
          break;
        case nt.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enableRotate === !1)
              return;
            De(s), o = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Be(s), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(jt);
    }
    function Je(s) {
      switch (o) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          ae(s);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          Me(s);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          Ye(s);
          break;
      }
    }
    function mt(s) {
      t.enabled === !1 || t.enableZoom === !1 || o !== i.NONE || (s.preventDefault(), t.dispatchEvent(jt), Ge(pt(s)), t.dispatchEvent(cn));
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
      return s.ctrlKey && !le && (T.deltaY *= 10), T;
    }
    function st(s) {
      s.key === "Control" && (le = !0, t.domElement.getRootNode().addEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function Ue(s) {
      s.key === "Control" && (le = !1, t.domElement.getRootNode().removeEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function ot(s) {
      t.enabled === !1 || t.enablePan === !1 || ue(s);
    }
    function ct(s) {
      switch (vt(s), V.length) {
        case 1:
          switch (t.touches.ONE) {
            case at.ROTATE:
              if (t.enableRotate === !1)
                return;
              g(s), o = i.TOUCH_ROTATE;
              break;
            case at.PAN:
              if (t.enablePan === !1)
                return;
              v(s), o = i.TOUCH_PAN;
              break;
            default:
              o = i.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case at.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              k(s), o = i.TOUCH_DOLLY_PAN;
              break;
            case at.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              ge(s), o = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = i.NONE;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(jt);
    }
    function gt(s) {
      switch (vt(s), o) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          _(s), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          E(s), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          G(s), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          se(s), t.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function Qe(s) {
      t.enabled !== !1 && s.preventDefault();
    }
    function Tt(s) {
      V.push(s.pointerId);
    }
    function Rt(s) {
      delete pe[s.pointerId];
      for (let y = 0; y < V.length; y++)
        if (V[y] == s.pointerId) {
          V.splice(y, 1);
          return;
        }
    }
    function At(s) {
      for (let y = 0; y < V.length; y++)
        if (V[y] == s.pointerId)
          return !0;
      return !1;
    }
    function vt(s) {
      let y = pe[s.pointerId];
      y === void 0 && (y = new fe(), pe[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function $e(s) {
      const y = s.pointerId === V[0] ? V[1] : V[0];
      return pe[y];
    }
    t.domElement.addEventListener("contextmenu", Qe), t.domElement.addEventListener("pointerdown", M), t.domElement.addEventListener("pointercancel", W), t.domElement.addEventListener("wheel", mt, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", st, { passive: !0, capture: !0 }), this.update();
  }
}
function rt(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const wt = (e) => {
  const [n, a] = K(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (o) => {
    o !== n && (e.onSelect(o), a(o)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, qe = Oa(function(n, a) {
  const [t, i] = K(!1), o = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      t && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      wt,
      {
        index: o,
        open: t,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (u) => {
          i(u);
        },
        up: !0
      }
    )
  ] });
});
class xi extends kn {
  constructor(n) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: da,
      side: mn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new Lt(16777215)
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
class Ei extends Rn {
  gridMaterial;
  constructor() {
    const n = new xi();
    super(new ha(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ci = `#include <common>
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
}`, Si = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class wi extends kn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ci,
      fragmentShader: Si
    });
  }
}
let Ct = "Renderer", Le, St = !1, un = !1, z = null, ce = null, ze = null, He = null;
function Ui(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", o = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", u = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", c = ie(() => /* @__PURE__ */ new Map(), []), h = ie(() => /* @__PURE__ */ new Map(), []), d = ie(() => /* @__PURE__ */ new Map(), []), f = ie(() => /* @__PURE__ */ new Map(), []), m = ie(() => new fa(), []), x = ie(() => new ma(), []), O = ie(() => new Ei(), []), H = ie(() => new Kt(500), []), te = ie(() => new Kt(100), []), me = ie(() => new pa(), []), re = ie(() => new ga(), []), $ = ie(() => new wi(), []), D = ie(() => new An({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function Z(g, v) {
    const w = new Xt(-100, 100, 100, -100, 50, 3e3);
    return w.name = g, w.position.copy(v), w.lookAt(0, 0, 0), c.set(g, w), w;
  }
  const ne = [
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
  ], V = X(null), pe = X(null), le = X(null), _e = X(null), Te = X(null), ve = X(null), [I, be] = K(a !== null ? a : "Single"), [S, we] = K(null), [Re, je] = K(!1), [Ae, ke] = K(!1), [De, Fe] = K(!1), [, Be] = K(Date.now());
  localStorage.setItem(`${n}_mode`, I), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, o), localStorage.setItem(`${n}_brCam`, u);
  const ae = (g, v) => {
    const w = h.get(g.name);
    w !== void 0 && w.dispose(), h.delete(g.name);
    const k = new yi(g, v);
    switch (k.enableDamping = !0, k.dampingFactor = 0.05, g.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        k.enableRotate = !1;
        break;
    }
    h.set(g.name, k);
  }, Me = (g) => {
    const v = d.get(g.name);
    v !== void 0 && (m.remove(v), v.dispose(), d.delete(g.name));
    const w = h.get(g.name);
    w !== void 0 && (w.dispose(), h.delete(g.name));
  }, Ye = () => {
    h.forEach((g, v) => {
      g.dispose();
      const w = d.get(v);
      w !== void 0 && (m.remove(w), w.dispose()), d.delete(v), h.delete(v);
    }), h.clear(), d.clear();
  }, Ge = () => {
    switch (I) {
      case "Single":
        ae(z, le.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(z, le.current), ae(ce, _e.current);
        break;
      case "Quad":
        ae(z, le.current), ae(ce, _e.current), ae(ze, Te.current), ae(He, ve.current);
        break;
    }
  };
  Pe(() => {
    const g = new va({
      canvas: V.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, we(g);
  }, []), Pe(() => {
    m.name = "Debug Scene", m.uuid = "", x.name = "helpers", m.add(x), x.add(O), H.name = "axisHelper", x.add(H), te.name = "interactionHelper", x.add(te), te.visible = !1, Z("Top", new Y(0, 1e3, 0)), Z("Bottom", new Y(0, -1e3, 0)), Z("Left", new Y(-1e3, 0, 0)), Z("Right", new Y(1e3, 0, 0)), Z("Front", new Y(0, 0, 1e3)), Z("Back", new Y(0, 0, -1e3)), Z("Orthographic", new Y(1e3, 1e3, 1e3));
    const g = new kt(60, 1, 50, 3e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), c.set("Debug", g), z = c.get(localStorage.getItem(`${n}_tlCam`)), ce = c.get(localStorage.getItem(`${n}_trCam`)), ze = c.get(localStorage.getItem(`${n}_blCam`)), He = c.get(localStorage.getItem(`${n}_brCam`));
  }, []), Pe(() => {
    const g = () => {
      f.forEach((_) => {
        x.remove(_), _.dispose();
      }), f.clear();
    }, v = () => {
      Le.traverse((_) => {
        if (_.type.search("Light") > -1) {
          let E;
          switch (_.type) {
            case "DirectionalLight":
              E = new Sa(_, 100), E.name = `${_.name}Helper`, f.set(_.name, E), x.add(E);
              break;
            case "HemisphereLight":
              E = new Ca(_, 250), E.name = `${_.name}Helper`, f.set(_.name, E), x.add(E);
              break;
            case "RectAreaLight":
              E = new vi(_), E.name = `${_.name}Helper`, f.set(_.name, E), x.add(E);
              break;
            case "PointLight":
              E = new Ea(_, 100), E.name = `${_.name}Helper`, f.set(_.name, E), x.add(E);
              break;
            case "SpotLight":
              E = new xa(_), E.name = `${_.name}Helper`, f.set(_.name, E), x.add(E);
              break;
          }
        }
      });
    }, w = (_) => {
      g(), In(Le), m.remove(Le);
      const E = e.scenes.get(_.value.name);
      if (E !== void 0) {
        const A = new E();
        e.onSceneSet !== void 0 && e.onSceneSet(A), Le = A, e.three.scene = Le, m.add(Le), un = !0, v();
      }
    }, k = (_) => {
      const E = _.value, A = e.three.scene?.getObjectByProperty("uuid", E.uuid);
      if (A !== void 0 && c.set(E.name, A), A instanceof kt) {
        const G = new ya(A);
        d.set(A.name, G), m.add(G);
      }
      Be(Date.now());
    }, ge = (_) => {
      const E = d.get(_.value.name);
      E !== void 0 && (m.remove(E), E.dispose()), c.delete(_.value.name), Be(Date.now());
    };
    return N.addEventListener(L.SET_SCENE, w), N.addEventListener(L.ADD_CAMERA, k), N.addEventListener(L.REMOVE_CAMERA, ge), () => {
      N.removeEventListener(L.SET_SCENE, w), N.removeEventListener(L.ADD_CAMERA, k), N.removeEventListener(L.REMOVE_CAMERA, ge);
    };
  }, []), Pe(() => {
    if (S === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, w = Math.floor(g / 2), k = Math.floor(v / 2), ge = -1;
    const _ = () => {
      g = window.innerWidth - 300, v = window.innerHeight, w = Math.floor(g / 2), k = Math.floor(v / 2), S.setSize(g, v);
      let M = g, B = v;
      switch (I) {
        case "Side by Side":
          M = w, B = v;
          break;
        case "Stacked":
          M = g, B = k;
          break;
        case "Quad":
          M = w, B = k;
          break;
      }
      c.forEach((W) => {
        W instanceof Xt ? (W.left = M / -2, W.right = M / 2, W.top = B / 2, W.bottom = B / -2, W.updateProjectionMatrix()) : W instanceof kt && (W.aspect = M / B, W.updateProjectionMatrix(), d.get(W.name)?.update());
      });
    }, E = () => {
      S.setViewport(0, 0, g, v), S.setScissor(0, 0, g, v), S.render(m, z);
    }, A = () => {
      if (I === "Side by Side")
        S.setViewport(0, 0, w, v), S.setScissor(0, 0, w, v), S.render(m, z), S.setViewport(w, 0, w, v), S.setScissor(w, 0, w, v), S.render(m, ce);
      else {
        const M = v - k;
        S.setViewport(0, M, g, k), S.setScissor(0, M, g, k), S.render(m, z), S.setViewport(0, 0, g, k), S.setScissor(0, 0, g, k), S.render(m, ce);
      }
    }, G = () => {
      let M = 0, B = 0;
      B = v - k, M = 0, S.setViewport(M, B, w, k), S.setScissor(M, B, w, k), S.render(m, z), M = w, S.setViewport(M, B, w, k), S.setScissor(M, B, w, k), S.render(m, ce), B = 0, M = 0, S.setViewport(M, B, w, k), S.setScissor(M, B, w, k), S.render(m, ze), M = w, S.setViewport(M, B, w, k), S.setScissor(M, B, w, k), S.render(m, He);
    }, se = () => {
      switch (h.forEach((M) => {
        M.update();
      }), d.forEach((M) => {
        M.update();
      }), f.forEach((M) => {
        M.update !== void 0 && M.update();
      }), e.onSceneUpdate !== void 0 && un && e.onSceneUpdate(Le), S.clear(), I) {
        case "Single":
          E();
          break;
        case "Side by Side":
        case "Stacked":
          A();
          break;
        case "Quad":
          G();
          break;
      }
      ge = requestAnimationFrame(se);
    };
    return Ge(), window.addEventListener("resize", _), _(), se(), () => {
      window.removeEventListener("resize", _), cancelAnimationFrame(ge), ge = -1;
    };
  }, [I, S]), Pe(() => {
    if (S !== null) {
      const g = new ba(), v = new fe(), w = (E, A, G, se) => {
        switch (I) {
          case "Quad":
            E < G ? A < se ? g.setFromCamera(v, z) : g.setFromCamera(v, ze) : A < se ? g.setFromCamera(v, ce) : g.setFromCamera(v, He);
            break;
          case "Side by Side":
            E < G ? g.setFromCamera(v, z) : g.setFromCamera(v, ce);
            break;
          case "Single":
            g.setFromCamera(v, z);
            break;
          case "Stacked":
            A < se ? g.setFromCamera(v, z) : g.setFromCamera(v, ce);
            break;
        }
      }, k = (E) => {
        if (!St)
          return;
        const A = new fe();
        S.getSize(A);
        const G = Math.min(E.clientX, A.x), se = Math.min(E.clientY, A.y);
        v.x = rt(G, 0, A.x, -1, 1), v.y = rt(se, 0, A.y, 1, -1);
        const M = A.x / 2, B = A.y / 2, W = () => {
          G < M ? v.x = rt(G, 0, M, -1, 1) : v.x = rt(G, M, A.x, -1, 1);
        }, Ie = () => {
          se < B ? v.y = rt(se, 0, B, 1, -1) : v.y = rt(se, B, A.y, 1, -1);
        };
        switch (I) {
          case "Quad":
            W(), Ie();
            break;
          case "Side by Side":
            W();
            break;
          case "Stacked":
            Ie(), Ie();
            break;
        }
        w(G, se, M, B);
        const Je = g.intersectObjects(Le.children);
        Je.length > 0 && te.position.copy(Je[0].point);
      }, ge = (E) => {
        if (!St)
          return;
        const A = new fe();
        if (S.getSize(A), E.clientX >= A.x)
          return;
        k(E);
        const G = g.intersectObjects(Le.children);
        G.length > 0 && e.three.getObject(G[0].object.uuid);
      }, _ = pe.current;
      return _.addEventListener("mousemove", k, !1), _.addEventListener("click", ge, !1), () => {
        _.removeEventListener("mousemove", k), _.removeEventListener("click", ge);
      };
    }
  }, [I, S]);
  const ue = [];
  return c.forEach((g, v) => {
    ue.push(v);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: V }),
    S !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${I === "Single" || I === "Stacked" ? "single" : ""}`, ref: pe, children: [
        I === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(qe, { camera: z, options: ue, ref: le, onSelect: (g) => {
          h.get(z.name)?.dispose();
          const v = c.get(g);
          v !== void 0 && (Me(z), z = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, le.current));
        } }) }),
        (I === "Side by Side" || I === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(qe, { camera: z, options: ue, ref: le, onSelect: (g) => {
            h.get(z.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(z), z = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, le.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: ce, options: ue, ref: _e, onSelect: (g) => {
            h.get(ce.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, _e.current));
          } })
        ] }),
        I === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(qe, { camera: z, options: ue, ref: le, onSelect: (g) => {
            h.get(z.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(z), z = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, le.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: ce, options: ue, ref: _e, onSelect: (g) => {
            h.get(ce.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, _e.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: ze, options: ue, ref: Te, onSelect: (g) => {
            h.get(ze.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(ze), ze = v, localStorage.setItem(`${n}_blCam`, v.name), ae(v, Te.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: He, options: ue, ref: ve, onSelect: (g) => {
            h.get(He.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(He), He = v, localStorage.setItem(`${n}_brCam`, v.name), ae(v, ve.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: Se.indexOf(I),
            options: Se,
            onSelect: (g) => {
              g !== I && (Ye(), be(g));
            },
            open: Re,
            onToggle: (g) => {
              je(g), Ae && ke(!1), De && Fe(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: ne.indexOf(Ct),
            options: ne,
            onSelect: (g) => {
              if (g !== Ct)
                switch (Ct = g, Ct) {
                  case "Depth":
                    m.overrideMaterial = me;
                    break;
                  case "Normals":
                    m.overrideMaterial = re;
                    break;
                  default:
                  case "Renderer":
                    m.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    m.overrideMaterial = D;
                    break;
                  case "UVs":
                    m.overrideMaterial = $;
                    break;
                }
            },
            open: Ae,
            onToggle: (g) => {
              Re && je(!1), ke(g), De && Fe(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (g) => {
              St = g === "Selection Mode", te.visible = St;
            },
            open: De,
            onToggle: (g) => {
              Re && je(!1), Ae && ke(!1), Fe(g);
            }
          }
        )
      ] })
    ] })
  ] });
}
function $i(e) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  Ut as Accordion,
  Pi as Application,
  Ot as BaseRemote,
  Bn as ChildObject,
  Ya as ContainerObject,
  Va as Draggable,
  $a as DraggableItem,
  za as Dropdown,
  Ha as DropdownItem,
  $i as Editor,
  gi as Inspector,
  Ui as MultiView,
  Fn as NavButton,
  ji as RemoteComponents,
  Li as RemoteController,
  Bt as RemoteTheatre,
  Ii as RemoteThree,
  Ni as RemoteTweakpane,
  Bi as SceneInspector,
  Fi as SidePanel,
  L as ToolEvents,
  Mt as capitalize,
  Ke as clamp,
  Ra as colorToHex,
  N as debugDispatcher,
  Ri as defaultTheatreCallback,
  In as dispose,
  ka as disposeMaterial,
  ki as disposeTexture,
  Ai as distance,
  Dn as hierarchyUUID,
  Ta as isColor,
  Jt as mix,
  Ft as noop,
  Zt as normalize,
  _a as randomID,
  Aa as resetThreeObjects,
  Qt as round,
  Di as theatreEditorApp,
  Dt as totalThreeObjects
};
