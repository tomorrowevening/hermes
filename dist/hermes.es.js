import { EventDispatcher as un, Texture as dn, CubeTexture as Gn, RepeatWrapping as Yt, Color as pt, FrontSide as Vn, BackSide as hn, DoubleSide as fn, NoBlending as Wn, NormalBlending as qn, AdditiveBlending as Kn, SubtractiveBlending as Xn, MultiplyBlending as Zn, CustomBlending as Jn, AddEquation as Qn, SubtractEquation as ei, ReverseSubtractEquation as ti, MinEquation as ni, MaxEquation as ii, ZeroFactor as pn, OneFactor as mn, SrcColorFactor as gn, OneMinusSrcColorFactor as vn, SrcAlphaFactor as bn, OneMinusSrcAlphaFactor as yn, DstAlphaFactor as xn, OneMinusDstAlphaFactor as Cn, DstColorFactor as En, OneMinusDstColorFactor as Sn, SrcAlphaSaturateFactor as ai, ConstantColorFactor as wn, OneMinusConstantColorFactor as On, ConstantAlphaFactor as Mn, OneMinusConstantAlphaFactor as _n, Matrix4 as ri, Vector3 as J, Euler as si, Line as oi, BufferGeometry as Gt, Float32BufferAttribute as Vt, LineBasicMaterial as li, Mesh as Tn, MeshBasicMaterial as Rn, Ray as ci, Plane as ui, MathUtils as di, MOUSE as it, TOUCH as at, Quaternion as Wt, Spherical as qt, Vector2 as me, ShaderMaterial as Pn, GLSL3 as hi, PlaneGeometry as fi, Scene as pi, Group as mi, AxesHelper as Kt, MeshDepthMaterial as gi, MeshNormalMaterial as vi, WebGLRenderer as bi, PerspectiveCamera as At, Raycaster as yi, OrthographicCamera as Xt, CameraHelper as xi, SpotLightHelper as Ci, PointLightHelper as Ei, HemisphereLightHelper as Si, DirectionalLightHelper as wi } from "three";
import { Pane as Oi } from "tweakpane";
import * as Mi from "@tweakpane/plugin-essentials";
import An, { useState as X, useRef as he, useEffect as ke, forwardRef as _i, useMemo as ve } from "react";
import { Reorder as kn } from "framer-motion";
const jn = () => {
}, Ra = () => {
};
function Je(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Ze(e, n, i) {
  return Math.min(n, Math.max(e, i));
}
function Zt(e, n, i) {
  return (i - e) / (n - e);
}
function Jt(e, n, i) {
  return e * (1 - i) + n * i;
}
function Pa(e, n) {
  const i = e - n;
  return Math.sqrt(i * i);
}
function Ti() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ri(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Pi(e) {
  const n = Math.round(e.r * 255), i = Math.round(e.g * 255), t = Math.round(e.b * 255), a = (u) => {
    const h = u.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, r = a(n), c = a(i), l = a(t);
  return "#" + r + c + l;
}
function mt(e, n = 1) {
  return Number(e.toFixed(n));
}
let Bt = 0;
const Ai = () => {
  Bt = 0;
}, Dn = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Bt}`, Bt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((i) => {
    Dn(i);
  });
}, Aa = (e) => {
  e?.dispose();
}, ki = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, In = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : In(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), ki(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class ka {
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
  constructor(n, i, t = !0) {
    this._appID = n, this._debugEnabled = i, i && (this._useBC = t, t ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
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
const B = new un(), F = {
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
class Mt {
  app;
  constructor(n) {
    this.app = n;
  }
  dispose() {
  }
  handleApp(n, i, t) {
  }
  handleEditor(n, i, t) {
  }
}
class ja extends Mt {
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
  handleApp(n, i, t) {
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
class $t extends Mt {
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
    this.sheetObjects.forEach((i, t) => {
      t.search(`${n}_`) > -1 && this.unsubscribe(i);
    });
  }
  sheetObject(n, i, t, a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const r = this.sheet(n);
    if (r === void 0)
      return;
    const c = `${n}_${i}`;
    let l = this.sheetObjects.get(c);
    l !== void 0 ? l = r.object(i, { ...t, ...l.value }, { reconfigure: !0 }) : l = r.object(i, t), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, a !== void 0 ? a : jn);
    const u = l.onValuesChange((h) => {
      if (this.app.editor) {
        for (const m in h) {
          const y = h[m];
          typeof y == "object" && Ri(y) && (h[m] = {
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
            sheetObject: c,
            values: h
          }
        });
      }
      const f = this.sheetObjectCBs.get(c);
      f !== void 0 && f(h);
    });
    return this.sheetObjectUnsubscribe.set(c, u), l;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const i = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(i)?.detachObject(t);
    const r = `${i}_${t}`, c = this.sheetObjectUnsubscribe.get(r);
    c !== void 0 && (this.sheetObjects.delete(r), this.sheetObjectCBs.delete(r), this.sheetObjectUnsubscribe.delete(r), c());
  }
  handleApp(n, i, t) {
    const a = i;
    let r;
    switch (t.event) {
      case "setSheet":
        r = a.sheets.get(t.data.sheet), r !== void 0 && (a.activeSheet = r, this.studio?.setSelection([r]));
        break;
      case "setSheetObject":
        r = a.sheetObjects.get(`${t.data.sheet}_${t.data.key}`), r !== void 0 && this.studio?.setSelection([r]);
        break;
      case "updateSheetObject":
        r = a.sheets.get(t.data.sheet), r !== void 0 && r.sequence.pause(), r = a.sheetObjectCBs.get(t.data.sheetObject), r !== void 0 && r(t.data.values);
        break;
      case "updateTimeline":
        r = a.sheets.get(t.data.sheet), a.activeSheet !== void 0 && (a.activeSheet.sequence.position = t.data.position);
        break;
    }
  }
  handleEditor(n, i, t) {
    if (n.editor) {
      const a = i;
      switch (t.event) {
        case "playSheet":
          a.sheet(t.data.sheet)?.sequence.play(t.data.value);
          break;
        case "pauseSheet":
          a.sheet(t.data.sheet)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(n, i) {
    if (n.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((c) => {
        c.length < 1 || c.forEach((l) => {
          let u = l.address.sheetId, h = "setSheet", f = {};
          switch (l.type) {
            case "Theatre_Sheet_PublicAPI":
              h = "setSheet", f = {
                sheet: l.address.sheetId
              }, i.activeSheet = i.sheets.get(l.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              h = "setSheetObject", u += `_${l.address.objectKey}`, f = {
                id: u,
                sheet: l.address.sheetId,
                key: l.address.objectKey
              }, i.activeSheet = i.sheets.get(l.address.sheetId);
              break;
          }
          n.send({ event: h, target: "app", data: f });
        });
      });
      let t = -1;
      const a = () => {
        if ($t.rafDriver?.tick(performance.now()), i.activeSheet !== void 0 && t !== i.activeSheet.sequence.position) {
          t = i.activeSheet.sequence.position;
          const c = i.activeSheet;
          n.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: t,
              sheet: c.address.sheetId
            }
          });
        }
      }, r = () => {
        a(), requestAnimationFrame(r);
      };
      a(), r();
    } else
      this.studio?.ui.hide();
  }
}
function Da(e, n, i) {
  if (e.editor) {
    i.ui.restore(), i.onSelectionChange((c) => {
      c.length < 1 || c.forEach((l) => {
        let u = l.address.sheetId, h = "setSheet", f = {};
        switch (l.type) {
          case "Theatre_Sheet_PublicAPI":
            h = "setSheet", f = {
              sheet: l.address.sheetId
            }, n.activeSheet = n.sheets.get(l.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            h = "setSheetObject", u += `_${l.address.objectKey}`, f = {
              id: u,
              sheet: l.address.sheetId,
              key: l.address.objectKey
            }, n.activeSheet = n.sheets.get(l.address.sheetId);
            break;
        }
        e.send({ event: h, target: "app", data: f });
      });
    });
    let t = -1;
    const a = () => {
      if ($t.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
        t = n.activeSheet.sequence.position;
        const c = n.activeSheet;
        e.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: t,
            sheet: c.address.sheetId
          }
        });
      }
    }, r = () => {
      a(), requestAnimationFrame(r);
    };
    a(), r();
  } else
    i.ui.hide();
}
function ji(e) {
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
  return e.children.forEach((i) => {
    n.children.push(Nn(i));
  }), n;
}
function Di(e) {
  const n = {};
  for (const i in e) {
    const t = e[i].value;
    n[i] = { value: t }, t === null ? n[i].value = { src: "" } : t.isTexture && (n[i].value = { src: t.image.src });
  }
  return n;
}
function Ii(e) {
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
  for (const i in e) {
    if (i.substring(0, 1) === "_" || i.substring(0, 2) === "is" || Ii(i))
      continue;
    const t = typeof e[i], a = e[i];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        n[i] = a;
        break;
      case "object":
        if (a !== null)
          if (n[i] = a, a.isTexture)
            if (a instanceof dn) {
              const r = a.source.toJSON();
              n[i] = { src: r.url };
            } else
              a instanceof Gn && (console.log("env map"), console.log(a.source.data), console.log(a.source.toJSON()), n[i] = { src: "" });
          else
            i === "uniforms" && (n[i] = Di(n[i]));
        else
          n[i] = { src: "" };
        break;
    }
  }
  return n;
}
function kt(e) {
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
  const i = e.type.toLowerCase();
  if (i.search("mesh") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const a = [];
      t.material.forEach((r) => {
        a.push(rt(r));
      }), n.material = a;
    } else
      n.material = rt(t.material);
  } else if (i.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const a = [];
      t.material.forEach((r) => {
        a.push(rt(r));
      }), n.material = a;
    } else
      n.material = rt(t.material);
  } else if (i.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const a = [];
      t.material.forEach((r) => {
        a.push(rt(r));
      }), n.material = a;
    } else
      n.material = rt(t.material);
  } else
    i.search("camera") > -1 ? e.type === "PerspectiveCamera" ? n.perspectiveCameraInfo = {
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
    }) : i.search("light") > -1 && (n.lightInfo = {
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
function Ni(e, n) {
  const i = n.split(".");
  switch (i.length) {
    case 1:
      return e[i[0]];
    case 2:
      return e[i[0]][i[1]];
    case 3:
      return e[i[0]][i[1]][i[2]];
    case 4:
      return e[i[0]][i[1]][i[2]][i[3]];
    case 5:
      return e[i[0]][i[1]][i[2]][i[3]][i[4]];
    case 6:
      return e[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]];
  }
}
function k(e, n, i) {
  const t = n.split(".");
  switch (t.length) {
    case 1:
      e[t[0]] = i;
      break;
    case 2:
      e[t[0]][t[1]] = i;
      break;
    case 3:
      e[t[0]][t[1]][t[2]] = i;
      break;
    case 4:
      e[t[0]][t[1]][t[2]][t[3]] = i;
      break;
    case 5:
      e[t[0]][t[1]][t[2]][t[3]][t[4]] = i;
      break;
  }
}
function wt(e) {
  return new Promise((n, i) => {
    const t = new Image();
    t.onload = () => {
      const a = new dn(t);
      a.wrapS = Yt, a.wrapT = Yt, a.needsUpdate = !0, n(a);
    }, t.onerror = i, t.src = e;
  });
}
class Ia extends Mt {
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
  requestMethod(n, i, t, a) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: i,
        value: t,
        subitem: a
      }
    });
  }
  updateObject(n, i, t) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: n,
        key: i,
        value: t
      }
    });
  }
  createTexture(n, i, t) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: n,
        key: i,
        value: t
      }
    });
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    Ai(), Dn(this.scene);
    const i = Nn(this.scene);
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
  handleApp(n, i, t) {
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
  handleEditor(n, i, t) {
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
class Na extends Mt {
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
    this.pane = new Oi({ title: "GUI" }), this.pane.registerPlugin(Mi);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(n, i = void 0, t = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addFolder({
        title: n,
        ...i
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: n,
        params: i,
        parent: t
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(n, i, t, a = void 0) {
    const r = this.bindID, c = t.onChange !== void 0 ? t.onChange : jn;
    this.bindCBs.set(r, c), this.app.editor ? (this.pane === void 0 && this.createGUI(), (a !== void 0 ? a : this.pane).addBinding(n, i, t).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: r,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: r,
        name: i,
        params: t,
        parent: a
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, i) {
    const t = this.bindCBs.get(n);
    t !== void 0 ? t(i) : console.warn(`No callback for: ${n}`, i);
  }
  // Buttons
  button(n, i, t = void 0) {
    const a = this.bindID;
    this.buttonCBs.set(a, i), this.app.editor ? (this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addButton({ title: n }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: a
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: a,
        name: n,
        callback: i,
        parent: t
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
  handleApp(n, i, t) {
    const a = i;
    switch (t.event) {
      case "addFolder":
        a.addFolder(t.data.name, t.data.params, t.data.parent);
        break;
      case "bindObject":
        a.bind(t.data.name, t.data.params, t.data.parent);
        break;
      case "updateBind":
        a.triggerBind(t.data.id, t.data.value);
        break;
      case "addButton":
        a.button(t.data.name, t.data.callback, t.data.parent);
        break;
      case "clickButton":
        a.triggerButton(t.data.id);
        break;
    }
  }
}
var Ft = { exports: {} }, ut = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qt;
function Li() {
  if (Qt)
    return ut;
  Qt = 1;
  var e = An, n = Symbol.for("react.element"), i = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(l, u, h) {
    var f, m = {}, y = null, W = null;
    h !== void 0 && (y = "" + h), u.key !== void 0 && (y = "" + u.key), u.ref !== void 0 && (W = u.ref);
    for (f in u)
      t.call(u, f) && !r.hasOwnProperty(f) && (m[f] = u[f]);
    if (l && l.defaultProps)
      for (f in u = l.defaultProps, u)
        m[f] === void 0 && (m[f] = u[f]);
    return { $$typeof: n, type: l, key: y, ref: W, props: m, _owner: a.current };
  }
  return ut.Fragment = i, ut.jsx = c, ut.jsxs = c, ut;
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
var en;
function Bi() {
  return en || (en = 1, process.env.NODE_ENV !== "production" && function() {
    var e = An, n = Symbol.for("react.element"), i = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), l = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), T = Symbol.iterator, Y = "@@iterator";
    function R(s) {
      if (s === null || typeof s != "object")
        return null;
      var p = T && s[T] || s[Y];
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
    var te = !1, ie = !1, Se = !1, K = !1, ge = !1, ue;
    ue = Symbol.for("react.module.reference");
    function _e(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === t || s === r || ge || s === a || s === h || s === f || K || s === W || te || ie || Se || typeof s == "object" && s !== null && (s.$$typeof === y || s.$$typeof === m || s.$$typeof === c || s.$$typeof === l || s.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === ue || s.getModuleId !== void 0));
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
        case i:
          return "Portal";
        case r:
          return "Profiler";
        case a:
          return "StrictMode";
        case h:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case l:
            var p = s;
            return be(p) + ".Consumer";
          case c:
            var b = s;
            return be(b._context) + ".Provider";
          case u:
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
    function ae() {
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
    function fe(s, p, b) {
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
      V = Ye.current, Ye.current = null, ae();
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
`), pe = C.stack.split(`
`), ee = A.length - 1, ne = pe.length - 1; ee >= 1 && ne >= 0 && A[ee] !== pe[ne]; )
            ne--;
          for (; ee >= 1 && ne >= 0; ee--, ne--)
            if (A[ee] !== pe[ne]) {
              if (ee !== 1 || ne !== 1)
                do
                  if (ee--, ne--, ne < 0 || A[ee] !== pe[ne]) {
                    var Ee = `
` + A[ee].replace(" at new ", " at ");
                    return s.displayName && Ee.includes("<anonymous>") && (Ee = Ee.replace("<anonymous>", s.displayName)), typeof s == "function" && v.set(s, Ee), Ee;
                  }
                while (ee >= 1 && ne >= 0);
              break;
            }
        }
      } finally {
        g = !1, Ye.current = V, Oe(), Error.prepareStackTrace = U;
      }
      var nt = s ? s.displayName || s.name : "", zt = nt ? fe(nt) : "";
      return typeof s == "function" && v.set(s, zt), zt;
    }
    function re(s, p, b) {
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
        return fe(s);
      switch (s) {
        case h:
          return fe("Suspense");
        case f:
          return fe("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case u:
            return re(s.render);
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
    var L = Object.prototype.hasOwnProperty, se = {}, oe = M.ReactDebugCurrentFrame;
    function P(s) {
      if (s) {
        var p = s._owner, b = w(s.type, s._source, p ? p.type : null);
        oe.setExtraStackFrame(b);
      } else
        oe.setExtraStackFrame(null);
    }
    function G(s, p, b, C, U) {
      {
        var V = Function.call.bind(L);
        for (var j in s)
          if (V(s, j)) {
            var A = void 0;
            try {
              if (typeof s[j] != "function") {
                var pe = Error((C || "React class") + ": " + b + " type `" + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[j] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw pe.name = "Invariant Violation", pe;
              }
              A = s[j](p, j, C, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ee) {
              A = ee;
            }
            A && !(A instanceof Error) && (P(U), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", b, j, typeof A), P(null)), A instanceof Error && !(A.message in se) && (se[A.message] = !0, P(U), $("Failed %s type: %s", b, A.message), P(null));
          }
      }
    }
    var Q = Array.isArray;
    function Ie(s) {
      return Q(s);
    }
    function et(s) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, b = p && s[Symbol.toStringTag] || s.constructor.name || "Object";
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
    function bt(s) {
      if (gt(s))
        return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", et(s)), vt(s);
    }
    var $e = M.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, lt, yt, tt;
    tt = {};
    function _t(s) {
      if (L.call(s, "ref")) {
        var p = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Tt(s) {
      if (L.call(s, "key")) {
        var p = Object.getOwnPropertyDescriptor(s, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function xt(s, p) {
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
    function Ht(s, p) {
      {
        var b = function() {
          yt || (yt = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
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
        var V, j = {}, A = null, pe = null;
        b !== void 0 && (bt(b), A = "" + b), Tt(p) && (bt(p.key), A = "" + p.key), _t(p) && (pe = p.ref, xt(p, U));
        for (V in p)
          L.call(p, V) && !ot.hasOwnProperty(V) && (j[V] = p[V]);
        if (s && s.defaultProps) {
          var ee = s.defaultProps;
          for (V in ee)
            j[V] === void 0 && (j[V] = ee[V]);
        }
        if (A || pe) {
          var ne = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          A && Ue(j, ne), pe && Ht(j, ne);
        }
        return o(s, A, pe, U, C, $e.current, j);
      }
    }
    var _ = M.ReactCurrentOwner, H = M.ReactDebugCurrentFrame;
    function Z(s) {
      if (s) {
        var p = s._owner, b = w(s.type, s._source, p ? p.type : null);
        H.setExtraStackFrame(b);
      } else
        H.setExtraStackFrame(null);
    }
    var xe;
    xe = !1;
    function de(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function Rt() {
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
    function Pt(s) {
      {
        if (s !== void 0) {
          var p = s.fileName.replace(/^.*[\\\/]/, ""), b = s.lineNumber;
          return `

Check your code at ` + p + ":" + b + ".";
        }
        return "";
      }
    }
    var ct = {};
    function Me(s) {
      {
        var p = Rt();
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
        if (ct[b])
          return;
        ct[b] = !0;
        var C = "";
        s && s._owner && s._owner !== _.current && (C = " It was passed a child from " + N(s._owner.type) + "."), Z(s), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, C), Z(null);
      }
    }
    function Ve(s, p) {
      {
        if (typeof s != "object")
          return;
        if (Ie(s))
          for (var b = 0; b < s.length; b++) {
            var C = s[b];
            de(C) && Ce(C, p);
          }
        else if (de(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var U = R(s);
          if (typeof U == "function" && U !== s.entries)
            for (var V = U.call(s), j; !(j = V.next()).done; )
              de(j.value) && Ce(j.value, p);
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
        else if (typeof p == "object" && (p.$$typeof === u || // Note: Memo only checks outer props here.
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
            Z(s), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), Z(null);
            break;
          }
        }
        s.ref !== null && (Z(s), $("Invalid attribute `ref` supplied to `React.Fragment`."), Z(null));
      }
    }
    function Ke(s, p, b, C, U, V) {
      {
        var j = _e(s);
        if (!j) {
          var A = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (A += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var pe = Pt(U);
          pe ? A += pe : A += Rt();
          var ee;
          s === null ? ee = "null" : Ie(s) ? ee = "array" : s !== void 0 && s.$$typeof === n ? (ee = "<" + (N(s.type) || "Unknown") + " />", A = " Did you accidentally export a JSX literal instead of a component?") : ee = typeof s, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ee, A);
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
    dt.Fragment = t, dt.jsx = zn, dt.jsxs = Yn;
  }()), dt;
}
process.env.NODE_ENV === "production" ? Ft.exports = Li() : Ft.exports = Bi();
var d = Ft.exports;
function Ln(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ d.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ d.jsx("button", { children: e.title });
}
const Fi = /* @__PURE__ */ d.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
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
function Ui(e) {
  return /* @__PURE__ */ d.jsx(kn.Item, { value: e.title, children: /* @__PURE__ */ d.jsxs("div", { children: [
    $i,
    /* @__PURE__ */ d.jsx("span", { children: e.title }),
    /* @__PURE__ */ d.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Fi })
  ] }) }, e.title);
}
function Hi(e) {
  const [n, i] = X(!1), [t, a] = X(e.options), r = (h) => {
    e.onDragComplete(h), a(h);
  }, c = (h) => {
    const f = [...t];
    f.splice(h, 1), r(f);
  }, l = [];
  t.forEach((h, f) => {
    l.push(/* @__PURE__ */ d.jsx(Ui, { index: f, title: h, onDelete: c }, h));
  });
  let u = "dropdown draggable";
  return e.subdropdown && (u += " subdropdown"), /* @__PURE__ */ d.jsxs("div", { className: u, onMouseEnter: () => i(!0), onMouseLeave: () => i(!1), children: [
    /* @__PURE__ */ d.jsx(Ln, { title: e.title }),
    /* @__PURE__ */ d.jsx(kn.Group, { axis: "y", values: t, onReorder: r, style: { visibility: n ? "visible" : "hidden" }, children: l })
  ] });
}
function zi(e) {
  const [n, i] = X(!1), t = [];
  e.options.map((r, c) => {
    e.onSelect !== void 0 && (r.onSelect = e.onSelect), t.push(/* @__PURE__ */ d.jsx(Yi, { option: r }, c));
  });
  let a = "dropdown";
  return e.subdropdown && (a += " subdropdown"), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: a,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      children: [
        /* @__PURE__ */ d.jsx(Ln, { title: e.title }),
        /* @__PURE__ */ d.jsx(
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
function Yi(e) {
  const { option: n } = e, [i, t] = X("");
  let a;
  switch (n.type) {
    case "draggable":
      a = /* @__PURE__ */ d.jsx(
        Hi,
        {
          title: n.title,
          options: n.value,
          onDragComplete: (r) => {
            n.onDragComplete !== void 0 && n.onDragComplete(r);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      a = /* @__PURE__ */ d.jsx(
        zi,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      a = /* @__PURE__ */ d.jsx(
        "button",
        {
          onClick: () => {
            n.onSelect !== void 0 && n.onSelect(n.value), n.selectable && (i !== n.title ? t(n.title) : t(""));
          },
          children: n.title
        }
      );
      break;
  }
  return /* @__PURE__ */ d.jsx("li", { className: i === n.title ? "selected" : "", children: a }, Ti());
}
function La(e, n, i) {
  function t(r) {
    switch (n.forEach((c) => {
      c.callback(e, c.remote, r);
    }), r.event) {
      case "custom":
        B.dispatchEvent({ type: F.CUSTOM, value: r.data });
        break;
    }
  }
  function a(r) {
    switch (i.forEach((c) => {
      c.callback(e, c.remote, r);
    }), r.event) {
      case "custom":
        B.dispatchEvent({ type: F.CUSTOM, value: r.data });
        break;
    }
  }
  e.listen = (r) => {
    r.target === "editor" ? a(r) : t(r);
  };
}
function Ut(e) {
  const [n, i] = X(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
  return /* @__PURE__ */ d.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !n;
          e.onToggle !== void 0 && e.onToggle(a), i(a);
        },
        children: [
          /* @__PURE__ */ d.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "label", children: Je(e.label) })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ d.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { children: e.children }) })
  ] });
}
function Bn(e) {
  const [n, i] = X(!1), t = e.child !== void 0 && e.child.children.length > 0, a = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((r) => {
    a.push(/* @__PURE__ */ d.jsx(Bn, { child: r, three: e.three }, Math.random()));
  }), /* @__PURE__ */ d.jsx(d.Fragment, { children: e.child !== void 0 && /* @__PURE__ */ d.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "child", children: [
      t ? /* @__PURE__ */ d.jsx(
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
            left: t ? "20px" : "5px"
          },
          onClick: () => {
            e.child !== void 0 && (e.three.getObject(e.child.uuid), n || i(!0));
          },
          children: e.child.name.length > 0 ? `${e.child.name} (${e.child.type})` : `${e.child.type}::${e.child.uuid}`
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: `icon ${ji(e.child)}` })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { className: "container", children: a }) })
  ] }, Math.random()) });
}
function Gi(e) {
  const n = [];
  return e.child?.children.map((i) => {
    n.push(/* @__PURE__ */ d.jsx(Bn, { child: i, three: e.three }, Math.random()));
  }), /* @__PURE__ */ d.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const Vi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Wi(e) {
  return "items" in e;
}
function Qe(e) {
  const n = [];
  return e.items.forEach((i) => {
    Wi(i) ? n.push(
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
          onChange: (t, a) => {
            i.onChange !== void 0 && i.onChange(t, a);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ d.jsx(Ut, { label: e.title, open: e.expanded === !0, children: n });
}
function qi(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "blendAlpha" || e === "blendColor" || e === "blendDstAlpha" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
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
function Ki() {
  const e = document.createElement("input");
  return e.type = "file", new Promise((n, i) => {
    e.addEventListener("change", function() {
      if (e.files === null)
        i();
      else {
        const t = e.files[0], a = new FileReader();
        a.onload = function(r) {
          n(r.target.result);
        }, a.readAsDataURL(t);
      }
    }), e.click();
  });
}
const Xi = [
  {
    title: "Front",
    value: Vn
  },
  {
    title: "Back",
    value: hn
  },
  {
    title: "Double",
    value: fn
  }
], Zi = [
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
], Ji = [
  {
    title: "Add",
    value: Qn
  },
  {
    title: "Subtract",
    value: ei
  },
  {
    title: "Reverse Subtract",
    value: ti
  },
  {
    title: "Min",
    value: ni
  },
  {
    title: "Max",
    value: ii
  }
], Qi = [
  {
    title: "Zero",
    valye: pn
  },
  {
    title: "One",
    valye: mn
  },
  {
    title: "Src Color",
    valye: gn
  },
  {
    title: "One Minus Src Color",
    valye: vn
  },
  {
    title: "Src Alpha",
    valye: bn
  },
  {
    title: "One Minus Src Alpha",
    valye: yn
  },
  {
    title: "Dst Alpha",
    valye: xn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
  },
  {
    title: "Dst Color",
    valye: En
  },
  {
    title: "One Minus Dst Color",
    valye: Sn
  },
  {
    title: "Src Alpha Saturate",
    valye: ai
  },
  {
    title: "Constant Color",
    valye: wn
  },
  {
    title: "One Minus Constant Color",
    valye: On
  },
  {
    title: "Constant Alpha",
    valye: Mn
  },
  {
    title: "One Minus Constant Alpha",
    valye: _n
  }
], ea = [
  {
    title: "Zero",
    valye: pn
  },
  {
    title: "One",
    valye: mn
  },
  {
    title: "Src Color",
    valye: gn
  },
  {
    title: "One Minus Src Color",
    valye: vn
  },
  {
    title: "Src Alpha",
    valye: bn
  },
  {
    title: "One Minus Src Alpha",
    valye: yn
  },
  {
    title: "Dst Alpha",
    valye: xn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
  },
  {
    title: "Dst Color",
    valye: En
  },
  {
    title: "One Minus Dst Color",
    valye: Sn
  },
  {
    title: "Constant Color",
    valye: wn
  },
  {
    title: "One Minus Constant Color",
    valye: On
  },
  {
    title: "Constant Alpha",
    valye: Mn
  },
  {
    title: "One Minus Constant Alpha",
    valye: _n
  }
];
function ht(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ta(e, n, i, t) {
  return {
    type: "boolean",
    title: z(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (a, r) => {
      t.updateObject(i.uuid, `material.${e}`, r), t.updateObject(i.uuid, "material.needsUpdate", !0);
      const c = t.scene?.getObjectByProperty("uuid", i.uuid);
      c !== void 0 && k(c, `material.${e}`, r);
    }
  };
}
function na(e, n, i, t) {
  const a = {
    type: "number",
    title: z(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (r, c) => {
      t.updateObject(i.uuid, `material.${e}`, c), t.updateObject(i.uuid, "material.needsUpdate", !0);
      const l = t.scene?.getObjectByProperty("uuid", i.uuid);
      l !== void 0 && k(l, `material.${e}`, c);
    }
  };
  switch (e) {
    case "blending":
      ht(a, Zi);
      break;
    case "blendDst":
      ht(a, ea);
      break;
    case "blendEquation":
      ht(a, Ji);
      break;
    case "blendSrc":
      ht(a, Qi);
      break;
    case "side":
      ht(a, Xi);
      break;
  }
  return Fn(e) && (a.value = Number(n), a.type = "range", a.min = 0, a.max = 1, a.step = 0.01), a;
}
function ia(e, n, i, t) {
  const a = {
    type: "string",
    title: z(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (c, l) => {
      t.updateObject(i.uuid, `material.${e}`, l), t.updateObject(i.uuid, "material.needsUpdate", !0);
      const u = t.scene?.getObjectByProperty("uuid", i.uuid);
      u !== void 0 && k(u, `material.${e}`, l);
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (a.disabled = !1, a.latest = a.value, a.onChange = (c, l) => {
    a.latest = l;
  }), a;
}
function jt(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function Dt(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function It(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function aa(e, n, i, t) {
  const a = [];
  if (n.isColor)
    return {
      title: z(e),
      prop: e,
      type: "color",
      value: n,
      onChange: (r, c) => {
        const l = new pt(c);
        t.updateObject(i.uuid, `material.${e}`, l);
        const u = t.scene?.getObjectByProperty("uuid", i.uuid);
        u !== void 0 && k(u, `material.${e}`, l);
      }
    };
  if (Array.isArray(n)) {
    for (const r in n)
      a.push({
        title: `${r}`,
        type: `${typeof n[r]}`,
        value: n[r],
        onChange: (c, l) => {
          t.updateObject(i.uuid, `material.${e}`, l);
          const u = t.scene?.getObjectByProperty("uuid", i.uuid);
          u !== void 0 && k(u, `material.${e}`, l);
        }
      });
    return {
      title: z(e),
      items: a
    };
  } else {
    if (jt(n))
      return {
        title: z(e),
        prop: e,
        type: "vector2",
        value: n,
        onChange: (r, c) => {
          t.updateObject(i.uuid, `material.${e}`, c);
          const l = t.scene?.getObjectByProperty("uuid", i.uuid);
          l !== void 0 && k(l, `material.${e}`, c);
        }
      };
    if (Dt(n))
      return {
        title: z(e),
        prop: e,
        type: "grid3",
        value: n,
        onChange: (r, c) => {
          t.updateObject(i.uuid, `material.${e}`, c);
          const l = t.scene?.getObjectByProperty("uuid", i.uuid);
          l !== void 0 && k(l, `material.${e}`, c);
        }
      };
    if (It(n))
      return {
        title: z(e),
        prop: e,
        type: "grid4",
        value: n,
        onChange: (r, c) => {
          t.updateObject(i.uuid, `material.${e}`, c);
          const l = t.scene?.getObjectByProperty("uuid", i.uuid);
          l !== void 0 && k(l, `material.${e}`, c);
        }
      };
    if (n.src !== void 0)
      return {
        title: z(e),
        type: "image",
        value: n,
        onChange: (r, c) => {
          t.createTexture(i.uuid, `material.${r}`, c);
          const l = t.scene?.getObjectByProperty("uuid", i.uuid);
          l !== void 0 && wt(c).then((u) => {
            k(l, `material.${r}`, u), k(l, "material.needsUpdate", !0);
          });
        }
      };
    switch (e) {
      case "defines":
        for (const r in n)
          a.push({
            title: Je(`${r}`),
            type: "string",
            value: n[r].toString(),
            disabled: !0
          });
        if (a.length > 0)
          return {
            title: z(e),
            items: a
          };
        break;
      case "extensions":
        for (const r in n)
          a.push({
            title: Je(`${r}`),
            type: "boolean",
            value: n[r],
            disabled: !0
          });
        if (a.length > 0)
          return {
            title: z(e),
            items: a
          };
        break;
      case "uniforms":
        for (const r in n) {
          const c = n[r].value, l = typeof c;
          if (c.isColor)
            a.push({
              title: z(r),
              prop: r,
              type: "color",
              value: c,
              onChange: (u, h) => {
                const f = new pt(h);
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, f);
                const m = t.scene?.getObjectByProperty("uuid", i.uuid);
                m !== void 0 && k(m, `material.uniforms.${r}.value`, f);
              }
            });
          else if (Array.isArray(c)) {
            const u = [];
            for (const h in c)
              u.push({
                title: `${h}`,
                type: `${typeof c[h]}`,
                value: c[h],
                onChange: (f, m) => {
                  t.updateObject(i.uuid, `material.uniforms.${r}.value.${h}`, m);
                  const y = t.scene?.getObjectByProperty("uuid", i.uuid);
                  y !== void 0 && k(y, `material.uniforms.${r}.value.${h}`, m);
                }
              });
            a.push({
              title: z(r),
              items: u
            });
          } else if (jt(c))
            a.push({
              title: `${z(r)}`,
              prop: r,
              type: "vector2",
              value: c,
              onChange: (u, h) => {
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", i.uuid);
                f !== void 0 && k(f, `material.uniforms.${r}.value`, h);
              }
            });
          else if (Dt(c))
            a.push({
              title: `${z(r)}`,
              prop: r,
              type: "grid3",
              value: c,
              onChange: (u, h) => {
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", i.uuid);
                f !== void 0 && k(f, `material.uniforms.${r}.value`, h);
              }
            });
          else if (It(c))
            a.push({
              title: `${z(r)}`,
              prop: r,
              type: "grid4",
              value: c,
              onChange: (u, h) => {
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", i.uuid);
                f !== void 0 && k(f, `material.uniforms.${r}.value`, h);
              }
            });
          else if (l === "number") {
            const u = {
              title: z(r),
              prop: r,
              type: "number",
              value: c,
              step: 0.01,
              onChange: (h, f) => {
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, f);
                const m = t.scene?.getObjectByProperty("uuid", i.uuid);
                m !== void 0 && k(m, `material.uniforms.${r}.value`, f);
              }
            };
            Fn(r) && (u.type = "range", u.min = 0, u.max = 1), a.push(u);
          } else if (l === "string")
            a.push({
              title: z(r),
              prop: r,
              type: l,
              value: c,
              onChange: (u, h) => {
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", i.uuid);
                f !== void 0 && k(f, `material.uniforms.${r}.value`, h);
              }
            });
          else if (c.src !== void 0)
            a.push({
              title: z(r),
              type: "image",
              value: c.src,
              onChange: (u, h) => {
                const f = `material.uniforms.${r}.value`;
                t.createTexture(i.uuid, f, h);
                const m = t.scene?.getObjectByProperty("uuid", i.uuid);
                m !== void 0 && wt(h).then((y) => {
                  k(m, f, y), k(m, "material.needsUpdate", !0);
                });
              }
            });
          else if (c.elements !== void 0)
            a.push({
              title: `${z(r)}`,
              prop: r,
              type: c.elements.length > 9 ? "grid4" : "grid3",
              value: c,
              onChange: (u, h) => {
                t.updateObject(i.uuid, `material.uniforms.${r}.value`, h);
                const f = t.scene?.getObjectByProperty("uuid", i.uuid);
                f !== void 0 && k(f, `material.uniforms.${r}.value`, h);
              }
            });
          else {
            const u = [], h = c;
            for (const f in h) {
              const m = f, y = h[f], W = typeof y, T = `material.uniforms.${r}.value.${m}`;
              y.isColor ? u.push({
                title: z(m),
                prop: m,
                type: "color",
                value: y,
                onChange: (Y, R) => {
                  const M = new pt(R);
                  t.updateObject(i.uuid, T, M);
                  const $ = t.scene?.getObjectByProperty("uuid", i.uuid);
                  $ !== void 0 && k($, T, M);
                }
              }) : jt(y) ? u.push({
                title: `${z(m)}`,
                prop: m,
                type: "vector2",
                value: y,
                onChange: (Y, R) => {
                  t.updateObject(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && k(M, T, R);
                }
              }) : Dt(y) ? u.push({
                title: `${z(m)}`,
                prop: m,
                type: "vector3",
                value: y,
                onChange: (Y, R) => {
                  t.updateObject(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && k(M, T, R);
                }
              }) : It(y) ? u.push({
                title: `${z(m)}`,
                prop: m,
                type: "vector4",
                value: y,
                onChange: (Y, R) => {
                  t.updateObject(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && k(M, T, R);
                }
              }) : W === "number" ? u.push({
                title: z(m),
                prop: m,
                type: "number",
                value: y,
                step: 0.01,
                onChange: (Y, R) => {
                  t.updateObject(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && k(M, T, R);
                }
              }) : W === "string" ? u.push({
                title: z(m),
                prop: m,
                type: "string",
                value: y,
                onChange: (Y, R) => {
                  t.updateObject(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && k(M, T, R);
                }
              }) : y.src !== void 0 ? u.push({
                title: z(m),
                type: "image",
                value: y.src,
                onChange: (Y, R) => {
                  t.createTexture(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && wt(R).then(($) => {
                    k(M, T, $), k(M, "material.needsUpdate", !0);
                  });
                }
              }) : y.elements !== void 0 && u.push({
                title: z(m),
                prop: m,
                type: y.elements.length > 9 ? "grid4" : "grid3",
                value: y,
                step: 0.01,
                onChange: (Y, R) => {
                  t.updateObject(i.uuid, T, R);
                  const M = t.scene?.getObjectByProperty("uuid", i.uuid);
                  M !== void 0 && k(M, T, R);
                }
              });
            }
            u.length > 0 && (u.sort((f, m) => f.title < m.title ? -1 : f.title > m.title ? 1 : 0), a.push({
              title: Je(r),
              items: u
            }));
          }
        }
        if (a.sort((r, c) => r.title < c.title ? -1 : r.title > c.title ? 1 : 0), a.length > 0)
          return {
            title: z(e),
            items: a
          };
        break;
      default:
        console.log(">>> other prop to add...", e);
        break;
    }
  }
}
function tn(e, n, i) {
  const t = [];
  for (const a in e) {
    if (!qi(a))
      continue;
    const r = typeof e[a], c = e[a];
    if (r === "boolean")
      t.push(ta(a, c, n, i));
    else if (r === "number")
      t.push(na(a, c, n, i));
    else if (r === "string")
      t.push(ia(a, c, n, i));
    else if (r === "object") {
      const l = aa(a, c, n, i);
      l !== void 0 && t.push(l);
    } else
      c !== void 0 && console.log("other:", a, r, c);
  }
  return t.sort((a, r) => a.title < r.title ? -1 : a.title > r.title ? 1 : 0), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      i.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), t;
}
function ra(e, n) {
  const i = e.material;
  if (Array.isArray(i)) {
    const t = [], a = i.length;
    for (let r = 0; r < a; r++)
      t.push(
        /* @__PURE__ */ d.jsx(
          Qe,
          {
            title: `Material ${r}`,
            items: tn(i[r], e, n)
          },
          `Material ${r}`
        )
      );
    return /* @__PURE__ */ d.jsx(d.Fragment, { children: t });
  } else
    return /* @__PURE__ */ d.jsx(
      Qe,
      {
        title: "Material",
        items: tn(i, e, n)
      }
    );
}
function nn(e) {
  const n = he(null), i = he(null), [t, a] = X(e.value), r = (c) => {
    const l = c.target.value;
    a(l), e.onChange !== void 0 && e.onChange(e.prop, l);
  };
  return ke(() => {
    let c = !1, l = -1, u = 0, h = t;
    const f = (T) => {
      c = !0, u = h, l = T.clientX;
    }, m = (T) => {
      if (!c)
        return;
      const Y = e.step !== void 0 ? e.step : 1, R = (T.clientX - l) * Y;
      h = Number((u + R).toFixed(4)), e.min !== void 0 && (h = Math.max(h, e.min)), e.max !== void 0 && (h = Math.min(h, e.max)), n.current !== null && (n.current.value = h.toString()), e.type === "range" && i.current !== null && (i.current.value = h.toString()), e.onChange !== void 0 && e.onChange(e.prop, h);
    }, y = () => {
      c = !1;
    }, W = () => {
      c = !1;
    };
    return e.labelRef.current?.addEventListener("mousedown", f, !1), document.addEventListener("mouseup", y, !1), document.addEventListener("mousemove", m, !1), document.addEventListener("contextmenu", W, !1), () => {
      e.labelRef.current?.removeEventListener("mousedown", f), document.removeEventListener("mouseup", y), document.removeEventListener("mousemove", m), document.removeEventListener("contextmenu", W);
    };
  }, [t]), /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    e.type === "number" && /* @__PURE__ */ d.jsx(
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
        onChange: r
      }
    ),
    e.type === "range" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: t.toString(), onChange: r, disabled: e.disabled, ref: n, className: "min" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: t,
          min: e.min,
          max: e.max,
          step: e.step,
          onChange: r,
          ref: i
        }
      )
    ] })
  ] });
}
function sa(e) {
  const n = he(null), i = he(null), t = he(null), a = he(null), r = he(null), c = he(null), [l, u] = X(e.value), [h, f] = X({ min: e.min, max: e.max }), [m, y] = X(!1);
  function W() {
    m || (window.addEventListener("mousemove", Y), window.addEventListener("mouseup", T), window.addEventListener("mouseup", T), y(!0));
  }
  function T() {
    window.removeEventListener("mousemove", Y), window.removeEventListener("mouseup", T), y(!1);
  }
  function Y(I) {
    const te = r.current.getBoundingClientRect(), ie = Ze(0, 99, I.clientX - te.left) / 99, Se = Ze(0, 99, I.clientY - te.top) / 99, K = mt(Jt(h.min, h.max, ie), 3), ge = mt(Jt(h.min, h.max, Se), 3);
    e.onChange({ target: { value: { x: K, y: ge } } }), u({ x: K, y: ge });
  }
  function R(I) {
    let te = l.x, ie = l.y;
    I.target === n.current ? te = Number(I.target.value) : ie = Number(I.target.value), u({ x: te, y: ie });
  }
  function M() {
    const I = Number(t.current.value);
    f({ min: I, max: h.max }), (l.x < I || l.y < I) && u({ x: Ze(I, h.max, l.x), y: Ze(I, h.max, l.y) });
  }
  function $() {
    const I = Number(a.current.value);
    f({ min: h.min, max: I }), (l.x > I || l.y > I) && u({ x: Ze(h.min, I, l.x), y: Ze(h.min, I, l.y) });
  }
  return ke(() => {
    const I = Zt(h.min, h.max, l.x), te = Zt(h.min, h.max, l.y);
    c.current.style.left = `${I * 100}%`, c.current.style.top = `${te * 100}%`;
  }, [h, l]), /* @__PURE__ */ d.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "X:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: l.x,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: R
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
            value: l.y,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: R
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ d.jsx(
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
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: h.max,
            step: 0.01,
            onChange: $
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "input", ref: r, onMouseDown: W, onMouseUp: T, children: [
      /* @__PURE__ */ d.jsx("div", { className: "x" }),
      /* @__PURE__ */ d.jsx("div", { className: "y" }),
      /* @__PURE__ */ d.jsx("div", { className: "pt", ref: c })
    ] })
  ] });
}
function oa(e) {
  const [n, i] = X(e.value), t = (c) => {
    const { alt: l, value: u } = c.target, h = { ...n };
    h[l] = Number(u), console.log(l, h), i(h), e.onChange({ target: { value: h } });
  }, a = (c) => {
    const { alt: l, value: u } = c.target, h = Number(l), f = { ...n };
    f.elements[h] = Number(u), i(f);
  }, r = [];
  if (e.value.elements === void 0) {
    const c = n;
    ["x", "y", "z"].forEach((u) => {
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { children: u.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              alt: u,
              type: "number",
              value: c[u],
              step: 0.01,
              onChange: t
            }
          )
        ] }, u)
      );
    });
  } else {
    const c = n;
    for (let l = 0; l < 9; l++) {
      const u = (l + 1).toString();
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { children: u }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              alt: l.toString(),
              type: "number",
              value: c.elements[l],
              step: 0.01,
              onChange: a
            }
          )
        ] }, u)
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid3", children: r });
}
function la(e) {
  const [n, i] = X(e.value), t = (c) => {
    const { alt: l, value: u } = c.target, h = { ...n };
    h[l] = Number(u), console.log(l, h), i(h), e.onChange({ target: { value: h } });
  }, a = (c) => {
    const { alt: l, value: u } = c.target, h = Number(l), f = { ...n };
    f.elements[h] = Number(u), i(f);
  }, r = [];
  if (e.value.elements === void 0) {
    const c = n;
    ["x", "y", "z", "w"].forEach((u) => {
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { children: u.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              alt: u,
              type: "number",
              value: c[u],
              step: 0.01,
              onChange: t
            }
          )
        ] }, u)
      );
    });
  } else {
    const c = n;
    for (let l = 0; l < 16; l++) {
      const u = (l + 1).toString();
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { children: u }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              alt: l.toString(),
              type: "number",
              value: c.elements[l],
              step: 0.01,
              onChange: a
            }
          )
        ] }, u)
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid4", children: r });
}
function ft(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Pi(e.value));
  const [i, t] = X(n), a = he(null), r = he(null), c = (f) => {
    let m = f.target.value;
    e.type === "boolean" ? m = f.target.checked : e.type === "option" && (m = e.options[m].value), t(m), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, m);
  }, l = {};
  e.disabled && (l.opacity = 0.8);
  const u = e.type === "string" && (i.length > 100 || i.search(`
`) > -1), h = u || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ d.jsxs("div", { className: `field ${h ? "block" : ""}`, style: l, children: [
    e.type !== "button" && /* @__PURE__ */ d.jsx("label", { ref: a, children: Je(e.title) }, "fieldLabel"),
    e.type === "string" && !u && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: c,
        value: i
      }
    ),
    e.type === "string" && u && /* @__PURE__ */ d.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: c,
        value: i
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: c,
        checked: i
      }
    ),
    e.type === "number" && /* @__PURE__ */ d.jsx(
      nn,
      {
        value: i,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: a,
        onChange: e.onChange
      }
    ),
    e.type === "range" && /* @__PURE__ */ d.jsx(
      nn,
      {
        value: i,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: a,
        onChange: e.onChange
      }
    ),
    e.type === "color" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: i.toString(), onChange: c, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ d.jsx("input", { type: "color", value: i, onChange: c, disabled: e.disabled })
    ] }),
    e.type === "button" && /* @__PURE__ */ d.jsx(
      "button",
      {
        disabled: e.disabled,
        onClick: () => {
          e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, !0);
        },
        children: e.title
      }
    ),
    e.type === "image" && /* @__PURE__ */ d.jsx("img", { ref: r, onClick: () => {
      Ki().then((f) => {
        r.current.src = f, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
      });
    }, src: i.length > 0 ? i : Vi }),
    e.type === "option" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx("select", { onChange: c, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((f, m) => /* @__PURE__ */ d.jsx("option", { value: f.value, children: Je(f.title) }, m)) }) }),
    e.type === "vector2" && /* @__PURE__ */ d.jsx(sa, { value: i, min: 0, max: 1, onChange: c }),
    e.type === "grid3" && /* @__PURE__ */ d.jsx(oa, { value: i, onChange: c }),
    e.type === "grid4" && /* @__PURE__ */ d.jsx(la, { value: i, onChange: c })
  ] });
}
function an(e) {
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
function ca(e, n) {
  const i = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      i.push({
        title: an(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (a, r) => {
          n.updateObject(e.uuid, a, r), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const c = n.scene?.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && (k(c, a, r), c.updateProjectionMatrix());
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      i.push({
        title: an(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (a, r) => {
          n.updateObject(e.uuid, a, r), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const c = n.scene?.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && (k(c, a, r), c.updateProjectionMatrix());
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
const ua = Math.PI / 180, da = 180 / Math.PI;
function st(e, n, i, t, a) {
  return t + (e - n) * (a - t) / (i - n);
}
function ha(e) {
  return e * ua;
}
function Nt(e) {
  return e * da;
}
function fa(e, n) {
  const i = new ri();
  i.elements = e.matrix;
  const t = new J(), a = new si(), r = new J();
  e.uuid.length > 0 && (t.setFromMatrixPosition(i), a.setFromRotationMatrix(i), r.setFromMatrixScale(i));
  const c = (u, h) => {
    n.updateObject(e.uuid, u, h);
    const f = n.scene?.getObjectByProperty("uuid", e.uuid);
    f !== void 0 && k(f, u, h);
  }, l = (u, h) => {
    c(u, ha(h));
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
          value: t.x,
          onChange: c
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: t.y,
          onChange: c
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: t.z,
          onChange: c
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: mt(Nt(a.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: mt(Nt(a.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: mt(Nt(a.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: l
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: r.x,
          step: 0.01,
          onChange: c
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: r.y,
          step: 0.01,
          onChange: c
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: r.z,
          step: 0.01,
          onChange: c
        }
      ]
    }
  );
}
function rn(e) {
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
function pa(e, n) {
  const i = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const a = e.lightInfo[t];
      a !== void 0 && (a.isColor !== void 0 ? i.push({
        title: rn(t),
        prop: t,
        type: "color",
        value: a,
        onChange: (r, c) => {
          const l = new pt(c);
          n.updateObject(e.uuid, r, l);
          const u = n.scene?.getObjectByProperty("uuid", e.uuid);
          u !== void 0 && k(u, r, l);
        }
      }) : i.push({
        title: rn(t),
        prop: t,
        type: typeof a,
        value: a,
        step: typeof a == "number" ? 0.01 : void 0,
        onChange: (r, c) => {
          n.updateObject(e.uuid, r, c);
          const l = n.scene?.getObjectByProperty("uuid", e.uuid);
          l !== void 0 && k(l, r, c);
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
function ma(e, n) {
  const i = [], t = [];
  let a = 0;
  e.animations.forEach((l) => {
    a = Math.max(a, l.duration), l.duration > 0 && t.push({
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
  }), i.push({
    title: "Animations",
    items: t
  });
  const r = n.scene?.getObjectByProperty("uuid", e.uuid);
  let c = !1;
  if (r !== void 0) {
    const l = r.mixer;
    if (c = l !== void 0, c) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: l.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (h, f) => {
            l.timeScale = f, n.updateObject(e.uuid, "mixer.timeScale", f);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          l.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
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
let le = { ...$n };
function ga(e) {
  const [n, i] = X(-1);
  ke(() => {
    function c(u) {
      le = { ...u.value }, i(Date.now());
    }
    function l() {
      le = { ...$n }, i(Date.now());
    }
    return B.addEventListener(F.SET_SCENE, l), B.addEventListener(F.SET_OBJECT, c), () => {
      B.removeEventListener(F.SET_SCENE, l), B.removeEventListener(F.SET_OBJECT, c);
    };
  }, []);
  const t = le.type.toLowerCase(), a = le.animations.length > 0 || le.mixer !== void 0, r = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ d.jsx(Ut, { label: "Inspector", children: /* @__PURE__ */ d.jsx("div", { id: "Inspector", className: e.class, children: le.uuid.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: le.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: le.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: le.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: le.visible,
          onChange: (c, l) => {
            e.three.updateObject(le.uuid, c, l);
            const u = e.three.scene?.getObjectByProperty("uuid", le.uuid);
            u !== void 0 && k(u, c, l);
          }
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      fa(le, e.three),
      a ? ma(le, e.three) : null,
      t.search("camera") > -1 ? ca(le, e.three) : null,
      t.search("light") > -1 ? pa(le, e.three) : null,
      r ? ra(le, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ba(e) {
  const [n, i] = X(e.scene);
  ke(() => {
    const r = (c) => {
      i(c.value);
    };
    return B.addEventListener(F.SET_SCENE, r), () => {
      B.removeEventListener(F.SET_SCENE, r);
    };
  }, []);
  const t = n !== null, a = "Hierarchy - " + (t ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ d.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ d.jsx(Ut, { label: a, open: !0, children: /* @__PURE__ */ d.jsx(d.Fragment, { children: t && /* @__PURE__ */ d.jsx(Gi, { child: n, three: e.three }) }) }),
    /* @__PURE__ */ d.jsx(ga, { three: e.three })
  ] }, "SidePanel");
}
function Fa(e) {
  function n() {
    return e.three.scene === void 0 ? (console.log("No scene:", e.three), !1) : !0;
  }
  const i = (l) => {
    if (!n())
      return;
    const u = e.three.scene?.getObjectByProperty("uuid", l.value);
    u !== void 0 && e.three.setObject(u);
  }, t = (l, u, h) => {
    if (!n())
      return;
    const f = e.three.scene?.getObjectByProperty("uuid", l);
    f !== void 0 && k(f, u, h);
  }, a = (l) => {
    if (!n())
      return;
    const u = l.value, { key: h, value: f, uuid: m } = u;
    t(m, h, f);
  }, r = (l) => {
    if (!n())
      return;
    const u = l.value;
    wt(u.value).then((h) => {
      t(u.uuid, u.key, h), t(u.uuid, "material.needsUpdate", !0);
    });
  }, c = (l) => {
    if (!n())
      return;
    const { key: u, uuid: h, value: f, subitem: m } = l.value, y = e.three.scene?.getObjectByProperty("uuid", h);
    if (y !== void 0)
      try {
        m !== void 0 ? Ni(y, m)[u](f) : y[u](f);
      } catch (W) {
        console.log("Error requesting method:"), console.log(W), console.log(u), console.log(f);
      }
  };
  return ke(() => (B.addEventListener(F.GET_OBJECT, i), B.addEventListener(F.UPDATE_OBJECT, a), B.addEventListener(F.CREATE_TEXTURE, r), B.addEventListener(F.REQUEST_METHOD, c), () => {
    B.removeEventListener(F.GET_OBJECT, i), B.removeEventListener(F.UPDATE_OBJECT, a), B.removeEventListener(F.CREATE_TEXTURE, r), B.removeEventListener(F.REQUEST_METHOD, c);
  }), []), null;
}
class va extends oi {
  constructor(n, i) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], a = new Gt();
    a.setAttribute("position", new Vt(t, 3)), a.computeBoundingSphere();
    const r = new li({ fog: !1 });
    super(a, r), this.light = n, this.color = i, this.type = "RectAreaLightHelper";
    const c = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], l = new Gt();
    l.setAttribute("position", new Vt(c, 3)), l.computeBoundingSphere(), this.add(new Tn(l, new Rn({ side: hn, fog: !1 })));
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
const sn = { type: "change" }, Lt = { type: "start" }, on = { type: "end" }, Ct = new ci(), ln = new ui(), ba = Math.cos(70 * di.DEG2RAD);
class ya extends un {
  constructor(n, i) {
    super(), this.object = n, this.domElement = i, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: it.ROTATE, MIDDLE: it.DOLLY, RIGHT: it.PAN }, this.touches = { ONE: at.ROTATE, TWO: at.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", ot), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ot), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(sn), t.update(), r = a.NONE;
    }, this.update = function() {
      const o = new J(), x = new Wt().setFromUnitVectors(n.up, new J(0, 1, 0)), _ = x.clone().invert(), H = new J(), Z = new Wt(), xe = new J(), de = 2 * Math.PI;
      return function(Pt = null) {
        const ct = t.object.position;
        o.copy(ct).sub(t.target), o.applyQuaternion(x), l.setFromVector3(o), t.autoRotate && r === a.NONE && be(_e(Pt)), t.enableDamping ? (l.theta += u.theta * t.dampingFactor, l.phi += u.phi * t.dampingFactor) : (l.theta += u.theta, l.phi += u.phi);
        let Me = t.minAzimuthAngle, Ce = t.maxAzimuthAngle;
        isFinite(Me) && isFinite(Ce) && (Me < -Math.PI ? Me += de : Me > Math.PI && (Me -= de), Ce < -Math.PI ? Ce += de : Ce > Math.PI && (Ce -= de), Me <= Ce ? l.theta = Math.max(Me, Math.min(Ce, l.theta)) : l.theta = l.theta > (Me + Ce) / 2 ? Math.max(Me, l.theta) : Math.min(Ce, l.theta)), l.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, l.phi)), l.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor), t.zoomToCursor && Se || t.object.isOrthographicCamera ? l.radius = Ae(l.radius) : l.radius = Ae(l.radius * h), o.setFromSpherical(l), o.applyQuaternion(_), ct.copy(t.target).add(o), t.object.lookAt(t.target), t.enableDamping === !0 ? (u.theta *= 1 - t.dampingFactor, u.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (u.set(0, 0, 0), f.set(0, 0, 0));
        let Ve = !1;
        if (t.zoomToCursor && Se) {
          let We = null;
          if (t.object.isPerspectiveCamera) {
            const qe = o.length();
            We = Ae(qe * h);
            const Ke = qe - We;
            t.object.position.addScaledVector(te, Ke), t.object.updateMatrixWorld();
          } else if (t.object.isOrthographicCamera) {
            const qe = new J(ie.x, ie.y, 0);
            qe.unproject(t.object), t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), t.object.updateProjectionMatrix(), Ve = !0;
            const Ke = new J(ie.x, ie.y, 0);
            Ke.unproject(t.object), t.object.position.sub(Ke).add(qe), t.object.updateMatrixWorld(), We = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          We !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(We).add(t.object.position) : (Ct.origin.copy(t.object.position), Ct.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Ct.direction)) < ba ? n.lookAt(t.target) : (ln.setFromNormalAndCoplanarPoint(t.object.up, t.target), Ct.intersectPlane(ln, t.target))));
        } else
          t.object.isOrthographicCamera && (Ve = h !== 1, Ve && (t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), t.object.updateProjectionMatrix()));
        return h = 1, Se = !1, Ve || H.distanceToSquared(t.object.position) > c || 8 * (1 - Z.dot(t.object.quaternion)) > c || xe.distanceToSquared(t.target) > 0 ? (t.dispatchEvent(sn), H.copy(t.object.position), Z.copy(t.object.quaternion), xe.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", tt), t.domElement.removeEventListener("pointerdown", P), t.domElement.removeEventListener("pointercancel", Q), t.domElement.removeEventListener("wheel", gt), t.domElement.removeEventListener("pointermove", G), t.domElement.removeEventListener("pointerup", Q), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ot), t._domElementKeyEvents = null);
    };
    const t = this, a = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let r = a.NONE;
    const c = 1e-6, l = new qt(), u = new qt();
    let h = 1;
    const f = new J(), m = new me(), y = new me(), W = new me(), T = new me(), Y = new me(), R = new me(), M = new me(), $ = new me(), I = new me(), te = new J(), ie = new me();
    let Se = !1;
    const K = [], ge = {};
    let ue = !1;
    function _e(o) {
      return o !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function Te(o) {
      const x = Math.abs(o * 0.01);
      return Math.pow(0.95, t.zoomSpeed * x);
    }
    function be(o) {
      u.theta -= o;
    }
    function N(o) {
      u.phi -= o;
    }
    const ye = function() {
      const o = new J();
      return function(_, H) {
        o.setFromMatrixColumn(H, 0), o.multiplyScalar(-_), f.add(o);
      };
    }(), E = function() {
      const o = new J();
      return function(_, H) {
        t.screenSpacePanning === !0 ? o.setFromMatrixColumn(H, 1) : (o.setFromMatrixColumn(H, 0), o.crossVectors(t.object.up, o)), o.multiplyScalar(_), f.add(o);
      };
    }(), we = function() {
      const o = new J();
      return function(_, H) {
        const Z = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const xe = t.object.position;
          o.copy(xe).sub(t.target);
          let de = o.length();
          de *= Math.tan(t.object.fov / 2 * Math.PI / 180), ye(2 * _ * de / Z.clientHeight, t.object.matrix), E(2 * H * de / Z.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (ye(_ * (t.object.right - t.object.left) / t.object.zoom / Z.clientWidth, t.object.matrix), E(H * (t.object.top - t.object.bottom) / t.object.zoom / Z.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
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
      const _ = t.domElement.getBoundingClientRect(), H = o - _.left, Z = x - _.top, xe = _.width, de = _.height;
      ie.x = H / xe * 2 - 1, ie.y = -(Z / de) * 2 + 1, te.set(ie.x, ie.y, 1).unproject(t.object).sub(t.object.position).normalize();
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
    function ae(o) {
      y.set(o.clientX, o.clientY), W.subVectors(y, m).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      be(2 * Math.PI * W.x / x.clientHeight), N(2 * Math.PI * W.y / x.clientHeight), m.copy(y), t.update();
    }
    function Oe(o) {
      $.set(o.clientX, o.clientY), I.subVectors($, M), I.y > 0 ? Re(Te(I.y)) : I.y < 0 && je(Te(I.y)), M.copy($), t.update();
    }
    function Ye(o) {
      Y.set(o.clientX, o.clientY), R.subVectors(Y, T).multiplyScalar(t.panSpeed), we(R.x, R.y), T.copy(Y), t.update();
    }
    function Ge(o) {
      Pe(o.clientX, o.clientY), o.deltaY < 0 ? je(Te(o.deltaY)) : o.deltaY > 0 && Re(Te(o.deltaY)), t.update();
    }
    function fe(o) {
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
      const x = Ue(o), _ = o.pageX - x.x, H = o.pageY - x.y, Z = Math.sqrt(_ * _ + H * H);
      M.set(0, Z);
    }
    function D(o) {
      t.enableZoom && S(o), t.enablePan && v(o);
    }
    function re(o) {
      t.enableZoom && S(o), t.enableRotate && g(o);
    }
    function O(o) {
      if (K.length == 1)
        y.set(o.pageX, o.pageY);
      else {
        const _ = Ue(o), H = 0.5 * (o.pageX + _.x), Z = 0.5 * (o.pageY + _.y);
        y.set(H, Z);
      }
      W.subVectors(y, m).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      be(2 * Math.PI * W.x / x.clientHeight), N(2 * Math.PI * W.y / x.clientHeight), m.copy(y);
    }
    function w(o) {
      if (K.length === 1)
        Y.set(o.pageX, o.pageY);
      else {
        const x = Ue(o), _ = 0.5 * (o.pageX + x.x), H = 0.5 * (o.pageY + x.y);
        Y.set(_, H);
      }
      R.subVectors(Y, T).multiplyScalar(t.panSpeed), we(R.x, R.y), T.copy(Y);
    }
    function L(o) {
      const x = Ue(o), _ = o.pageX - x.x, H = o.pageY - x.y, Z = Math.sqrt(_ * _ + H * H);
      $.set(0, Z), I.set(0, Math.pow($.y / M.y, t.zoomSpeed)), Re(I.y), M.copy($);
      const xe = (o.pageX + x.x) * 0.5, de = (o.pageY + x.y) * 0.5;
      Pe(xe, de);
    }
    function se(o) {
      t.enableZoom && L(o), t.enablePan && w(o);
    }
    function oe(o) {
      t.enableZoom && L(o), t.enableRotate && O(o);
    }
    function P(o) {
      t.enabled !== !1 && (K.length === 0 && (t.domElement.setPointerCapture(o.pointerId), t.domElement.addEventListener("pointermove", G), t.domElement.addEventListener("pointerup", Q)), _t(o), o.pointerType === "touch" ? lt(o) : Ie(o));
    }
    function G(o) {
      t.enabled !== !1 && (o.pointerType === "touch" ? yt(o) : et(o));
    }
    function Q(o) {
      switch (Tt(o), K.length) {
        case 0:
          t.domElement.releasePointerCapture(o.pointerId), t.domElement.removeEventListener("pointermove", G), t.domElement.removeEventListener("pointerup", Q), t.dispatchEvent(on), r = a.NONE;
          break;
        case 1:
          const x = K[0], _ = ge[x];
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
        case it.DOLLY:
          if (t.enableZoom === !1)
            return;
          Be(o), r = a.DOLLY;
          break;
        case it.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enablePan === !1)
              return;
            Fe(o), r = a.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            De(o), r = a.ROTATE;
          }
          break;
        case it.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enableRotate === !1)
              return;
            De(o), r = a.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Fe(o), r = a.PAN;
          }
          break;
        default:
          r = a.NONE;
      }
      r !== a.NONE && t.dispatchEvent(Lt);
    }
    function et(o) {
      switch (r) {
        case a.ROTATE:
          if (t.enableRotate === !1)
            return;
          ae(o);
          break;
        case a.DOLLY:
          if (t.enableZoom === !1)
            return;
          Oe(o);
          break;
        case a.PAN:
          if (t.enablePan === !1)
            return;
          Ye(o);
          break;
      }
    }
    function gt(o) {
      t.enabled === !1 || t.enableZoom === !1 || r !== a.NONE || (o.preventDefault(), t.dispatchEvent(Lt), Ge(vt(o)), t.dispatchEvent(on));
    }
    function vt(o) {
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
      return o.ctrlKey && !ue && (_.deltaY *= 10), _;
    }
    function bt(o) {
      o.key === "Control" && (ue = !0, t.domElement.getRootNode().addEventListener("keyup", $e, { passive: !0, capture: !0 }));
    }
    function $e(o) {
      o.key === "Control" && (ue = !1, t.domElement.getRootNode().removeEventListener("keyup", $e, { passive: !0, capture: !0 }));
    }
    function ot(o) {
      t.enabled === !1 || t.enablePan === !1 || fe(o);
    }
    function lt(o) {
      switch (xt(o), K.length) {
        case 1:
          switch (t.touches.ONE) {
            case at.ROTATE:
              if (t.enableRotate === !1)
                return;
              g(o), r = a.TOUCH_ROTATE;
              break;
            case at.PAN:
              if (t.enablePan === !1)
                return;
              v(o), r = a.TOUCH_PAN;
              break;
            default:
              r = a.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case at.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              D(o), r = a.TOUCH_DOLLY_PAN;
              break;
            case at.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              re(o), r = a.TOUCH_DOLLY_ROTATE;
              break;
            default:
              r = a.NONE;
          }
          break;
        default:
          r = a.NONE;
      }
      r !== a.NONE && t.dispatchEvent(Lt);
    }
    function yt(o) {
      switch (xt(o), r) {
        case a.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          O(o), t.update();
          break;
        case a.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          w(o), t.update();
          break;
        case a.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          se(o), t.update();
          break;
        case a.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          oe(o), t.update();
          break;
        default:
          r = a.NONE;
      }
    }
    function tt(o) {
      t.enabled !== !1 && o.preventDefault();
    }
    function _t(o) {
      K.push(o.pointerId);
    }
    function Tt(o) {
      delete ge[o.pointerId];
      for (let x = 0; x < K.length; x++)
        if (K[x] == o.pointerId) {
          K.splice(x, 1);
          return;
        }
    }
    function xt(o) {
      let x = ge[o.pointerId];
      x === void 0 && (x = new me(), ge[o.pointerId] = x), x.set(o.pageX, o.pageY);
    }
    function Ue(o) {
      const x = o.pointerId === K[0] ? K[1] : K[0];
      return ge[x];
    }
    t.domElement.addEventListener("contextmenu", tt), t.domElement.addEventListener("pointerdown", P), t.domElement.addEventListener("pointercancel", Q), t.domElement.addEventListener("wheel", gt, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", bt, { passive: !0, capture: !0 }), this.update();
  }
}
const Ot = (e) => {
  const [n, i] = X(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, a = (r) => {
    r !== n && (e.onSelect(r), i(r)), e.onToggle(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ d.jsx("ul", { className: "dropdown-menu", children: e.options.map((r) => /* @__PURE__ */ d.jsx("li", { onClick: () => a(r), children: r }, r)) })
  ] });
}, Xe = _i(function(n, i) {
  const [t, a] = X(!1), r = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ d.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ d.jsx("div", { ref: i, className: "clickable", onClick: () => {
      t && a(!1);
    } }),
    /* @__PURE__ */ d.jsx(
      Ot,
      {
        index: r,
        open: t,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (c) => {
          a(c);
        },
        up: !0
      }
    )
  ] });
});
class xa extends Pn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: hi,
      side: fn,
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
class Ca extends Tn {
  gridMaterial;
  constructor() {
    const n = new xa();
    super(new fi(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ea = `#include <common>
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
}`, Sa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class wa extends Pn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ea,
      fragmentShader: Sa
    });
  }
}
let Et = "Renderer", Le, St = !1, cn = !1, q = null, ce = null, He = null, ze = null;
function $a(e) {
  const n = e.three.app.appID, i = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", a = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", r = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", c = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", l = ve(() => /* @__PURE__ */ new Map(), []), u = ve(() => /* @__PURE__ */ new Map(), []), h = ve(() => /* @__PURE__ */ new Map(), []), f = ve(() => /* @__PURE__ */ new Map(), []), m = ve(() => new pi(), []), y = ve(() => new mi(), []), W = ve(() => new Ca(), []), T = ve(() => new Kt(500), []), Y = ve(() => new Kt(100), []), R = ve(() => new gi(), []), M = ve(() => new vi(), []), $ = ve(() => new wa(), []), I = ve(() => new Rn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function te(g, v) {
    const S = new Xt(-100, 100, 100, -100, 50, 3e3);
    return S.name = g, S.position.copy(v), S.lookAt(0, 0, 0), l.set(g, S), S;
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
  ], K = he(null), ge = he(null), ue = he(null), _e = he(null), Te = he(null), be = he(null), [N, ye] = X(i !== null ? i : "Single"), [E, we] = X(null), [Re, je] = X(!1), [Pe, Ae] = X(!1), [De, Be] = X(!1), [, Fe] = X(Date.now());
  localStorage.setItem(`${n}_mode`, N), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, a), localStorage.setItem(`${n}_blCam`, r), localStorage.setItem(`${n}_brCam`, c);
  const ae = (g, v) => {
    const S = u.get(g.name);
    S !== void 0 && S.dispose(), u.delete(g.name);
    const D = h.get(g.name);
    D !== void 0 && (m.remove(D), D.dispose()), h.delete(g.name);
    const re = new ya(g, v);
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
      const O = new xi(g);
      h.set(g.name, O), m.add(O);
    }
  }, Oe = (g) => {
    const v = h.get(g.name);
    v !== void 0 && (m.remove(v), v.dispose(), h.delete(g.name));
    const S = u.get(g.name);
    S !== void 0 && (S.dispose(), u.delete(g.name));
  }, Ye = () => {
    u.forEach((g, v) => {
      g.dispose();
      const S = h.get(v);
      S !== void 0 && (m.remove(S), S.dispose()), h.delete(v), u.delete(v);
    }), u.clear(), h.clear();
  }, Ge = () => {
    switch (N) {
      case "Single":
        ae(q, ue.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(q, ue.current), ae(ce, _e.current);
        break;
      case "Quad":
        ae(q, ue.current), ae(ce, _e.current), ae(He, Te.current), ae(ze, be.current);
        break;
    }
  };
  ke(() => {
    const g = new bi({
      canvas: K.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, we(g);
  }, []), ke(() => {
    m.name = "Debug Scene", m.uuid = "", y.name = "helpers", m.add(y), y.add(W), T.name = "axisHelper", y.add(T), Y.name = "interactionHelper", y.add(Y), Y.visible = !1, te("Top", new J(0, 1e3, 0)), te("Bottom", new J(0, -1e3, 0)), te("Left", new J(-1e3, 0, 0)), te("Right", new J(1e3, 0, 0)), te("Front", new J(0, 0, 1e3)), te("Back", new J(0, 0, -1e3)), te("Orthographic", new J(1e3, 1e3, 1e3));
    const g = new At(60, 1, 50, 3e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), l.set("Debug", g), q = l.get(localStorage.getItem(`${n}_tlCam`)), ce = l.get(localStorage.getItem(`${n}_trCam`)), He = l.get(localStorage.getItem(`${n}_blCam`)), ze = l.get(localStorage.getItem(`${n}_brCam`));
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
              w = new wi(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "HemisphereLight":
              w = new Si(O, 250), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "RectAreaLight":
              w = new va(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "PointLight":
              w = new Ei(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
            case "SpotLight":
              w = new Ci(O), w.name = `${O.name}Helper`, f.set(O.name, w), y.add(w);
              break;
          }
        }
      });
    }, S = (O) => {
      g(), In(Le), m.remove(Le);
      const w = e.scenes.get(O.value.name);
      if (w !== void 0) {
        const L = new w();
        e.onSceneSet !== void 0 && e.onSceneSet(L), Le = L, e.three.scene = Le, m.add(Le), cn = !0, v();
      }
    }, D = (O) => {
      const w = O.value, L = e.three.scene?.getObjectByProperty("uuid", w.uuid);
      L !== void 0 && l.set(w.name, L), Fe(Date.now());
    }, re = (O) => {
      l.delete(O.value.name), Fe(Date.now());
    };
    return B.addEventListener(F.SET_SCENE, S), B.addEventListener(F.ADD_CAMERA, D), B.addEventListener(F.REMOVE_CAMERA, re), () => {
      B.removeEventListener(F.SET_SCENE, S), B.removeEventListener(F.ADD_CAMERA, D), B.removeEventListener(F.REMOVE_CAMERA, re);
    };
  }, []), ke(() => {
    if (E === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, S = Math.floor(g / 2), D = Math.floor(v / 2), re = -1;
    const O = () => {
      g = window.innerWidth - 300, v = window.innerHeight, S = Math.floor(g / 2), D = Math.floor(v / 2), E.setSize(g, v);
      let P = g, G = v;
      switch (N) {
        case "Side by Side":
          P = S, G = v;
          break;
        case "Stacked":
          P = g, G = D;
          break;
        case "Quad":
          P = S, G = D;
          break;
      }
      l.forEach((Q) => {
        Q instanceof Xt ? (Q.left = P / -2, Q.right = P / 2, Q.top = G / 2, Q.bottom = G / -2, Q.updateProjectionMatrix()) : Q instanceof At && (Q.aspect = P / G, Q.updateProjectionMatrix(), h.get(Q.name)?.update());
      });
    }, w = () => {
      E.setViewport(0, 0, g, v), E.setScissor(0, 0, g, v), E.render(m, q);
    }, L = () => {
      if (N === "Side by Side")
        E.setViewport(0, 0, S, v), E.setScissor(0, 0, S, v), E.render(m, q), E.setViewport(S, 0, S, v), E.setScissor(S, 0, S, v), E.render(m, ce);
      else {
        const P = v - D;
        E.setViewport(0, P, g, D), E.setScissor(0, P, g, D), E.render(m, q), E.setViewport(0, 0, g, D), E.setScissor(0, 0, g, D), E.render(m, ce);
      }
    }, se = () => {
      let P = 0, G = 0;
      G = v - D, P = 0, E.setViewport(P, G, S, D), E.setScissor(P, G, S, D), E.render(m, q), P = S, E.setViewport(P, G, S, D), E.setScissor(P, G, S, D), E.render(m, ce), G = 0, P = 0, E.setViewport(P, G, S, D), E.setScissor(P, G, S, D), E.render(m, He), P = S, E.setViewport(P, G, S, D), E.setScissor(P, G, S, D), E.render(m, ze);
    }, oe = () => {
      switch (u.forEach((P) => {
        P.update();
      }), e.onSceneUpdate !== void 0 && cn && e.onSceneUpdate(Le), E.clear(), N) {
        case "Single":
          w();
          break;
        case "Side by Side":
        case "Stacked":
          L();
          break;
        case "Quad":
          se();
          break;
      }
      re = requestAnimationFrame(oe);
    };
    return Ge(), window.addEventListener("resize", O), O(), oe(), () => {
      window.removeEventListener("resize", O), cancelAnimationFrame(re), re = -1;
    };
  }, [N, E]), ke(() => {
    if (E !== null) {
      const g = new yi(), v = new me(), S = (w, L, se, oe) => {
        switch (N) {
          case "Quad":
            w < se ? L < oe ? g.setFromCamera(v, q) : g.setFromCamera(v, He) : L < oe ? g.setFromCamera(v, ce) : g.setFromCamera(v, ze);
            break;
          case "Side by Side":
            w < se ? g.setFromCamera(v, q) : g.setFromCamera(v, ce);
            break;
          case "Single":
            g.setFromCamera(v, q);
            break;
          case "Stacked":
            L < oe ? g.setFromCamera(v, q) : g.setFromCamera(v, ce);
            break;
        }
      }, D = (w) => {
        if (!St)
          return;
        const L = new me();
        E.getSize(L);
        const se = Math.min(w.clientX, L.x), oe = Math.min(w.clientY, L.y);
        v.x = st(se, 0, L.x, -1, 1), v.y = st(oe, 0, L.y, 1, -1);
        const P = L.x / 2, G = L.y / 2, Q = () => {
          se < P ? v.x = st(se, 0, P, -1, 1) : v.x = st(se, P, L.x, -1, 1);
        }, Ie = () => {
          oe < G ? v.y = st(oe, 0, G, 1, -1) : v.y = st(oe, G, L.y, 1, -1);
        };
        switch (N) {
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
        S(se, oe, P, G);
        const et = g.intersectObjects(Le.children);
        et.length > 0 && Y.position.copy(et[0].point);
      }, re = (w) => {
        if (!St)
          return;
        const L = new me();
        if (E.getSize(L), w.clientX >= L.x)
          return;
        D(w);
        const se = g.intersectObjects(Le.children);
        se.length > 0 && e.three.getObject(se[0].object.uuid);
      }, O = ge.current;
      return O.addEventListener("mousemove", D, !1), O.addEventListener("click", re, !1), () => {
        O.removeEventListener("mousemove", D), O.removeEventListener("click", re);
      };
    }
  }, [N, E]);
  const fe = [];
  return l.forEach((g, v) => {
    fe.push(v);
  }), /* @__PURE__ */ d.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ d.jsx("canvas", { ref: K }),
    E !== null && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: `cameras ${N === "Single" || N === "Stacked" ? "single" : ""}`, ref: ge, children: [
        N === "Single" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx(Xe, { camera: q, options: fe, ref: ue, onSelect: (g) => {
          u.get(q.name)?.dispose();
          const v = l.get(g);
          v !== void 0 && (Oe(q), q = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, ue.current));
        } }) }),
        (N === "Side by Side" || N === "Stacked") && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(Xe, { camera: q, options: fe, ref: ue, onSelect: (g) => {
            u.get(q.name)?.dispose();
            const v = l.get(g);
            v !== void 0 && (Oe(q), q = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, ue.current));
          } }),
          /* @__PURE__ */ d.jsx(Xe, { camera: ce, options: fe, ref: _e, onSelect: (g) => {
            u.get(ce.name)?.dispose();
            const v = l.get(g);
            v !== void 0 && (Oe(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, _e.current));
          } })
        ] }),
        N === "Quad" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(Xe, { camera: q, options: fe, ref: ue, onSelect: (g) => {
            u.get(q.name)?.dispose();
            const v = l.get(g);
            v !== void 0 && (Oe(q), q = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, ue.current));
          } }),
          /* @__PURE__ */ d.jsx(Xe, { camera: ce, options: fe, ref: _e, onSelect: (g) => {
            u.get(ce.name)?.dispose();
            const v = l.get(g);
            v !== void 0 && (Oe(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, _e.current));
          } }),
          /* @__PURE__ */ d.jsx(Xe, { camera: He, options: fe, ref: Te, onSelect: (g) => {
            u.get(He.name)?.dispose();
            const v = l.get(g);
            v !== void 0 && (Oe(He), He = v, localStorage.setItem(`${n}_blCam`, v.name), ae(v, Te.current));
          } }),
          /* @__PURE__ */ d.jsx(Xe, { camera: ze, options: fe, ref: be, onSelect: (g) => {
            u.get(ze.name)?.dispose();
            const v = l.get(g);
            v !== void 0 && (Oe(ze), ze = v, localStorage.setItem(`${n}_brCam`, v.name), ae(v, be.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ d.jsx(
          Ot,
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
        /* @__PURE__ */ d.jsx(
          Ot,
          {
            index: ie.indexOf(Et),
            options: ie,
            onSelect: (g) => {
              if (g !== Et)
                switch (Et = g, Et) {
                  case "Depth":
                    m.overrideMaterial = R;
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
        /* @__PURE__ */ d.jsx(
          Ot,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (g) => {
              St = g === "Selection Mode", Y.visible = St;
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
function Ua(e) {
  return /* @__PURE__ */ d.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ d.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ d.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  Ut as Accordion,
  ka as Application,
  Mt as BaseRemote,
  Bn as ChildObject,
  Gi as ContainerObject,
  Hi as Draggable,
  Ui as DraggableItem,
  zi as Dropdown,
  Yi as DropdownItem,
  Ua as Editor,
  ga as Inspector,
  $a as MultiView,
  Ln as NavButton,
  ja as RemoteComponents,
  La as RemoteController,
  $t as RemoteTheatre,
  Ia as RemoteThree,
  Na as RemoteTweakpane,
  Fa as SceneInspector,
  Ba as SidePanel,
  F as ToolEvents,
  Je as capitalize,
  Ze as clamp,
  Pi as colorToHex,
  B as debugDispatcher,
  Ra as defaultTheatreCallback,
  In as dispose,
  ki as disposeMaterial,
  Aa as disposeTexture,
  Pa as distance,
  Dn as hierarchyUUID,
  Ri as isColor,
  Jt as mix,
  jn as noop,
  Zt as normalize,
  Ti as randomID,
  Ai as resetThreeObjects,
  mt as round,
  Da as theatreEditorApp,
  Bt as totalThreeObjects
};
