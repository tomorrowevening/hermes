import { EventDispatcher as an, Texture as rn, CubeTexture as In, RepeatWrapping as $t, Color as St, FrontSide as Nn, BackSide as Ln, DoubleSide as sn, NoBlending as Fn, NormalBlending as Bn, AdditiveBlending as Un, SubtractiveBlending as $n, MultiplyBlending as zn, CustomBlending as Yn, AddEquation as Vn, SubtractEquation as Gn, ReverseSubtractEquation as Hn, MinEquation as Wn, MaxEquation as qn, ZeroFactor as on, OneFactor as cn, SrcColorFactor as ln, OneMinusSrcColorFactor as un, SrcAlphaFactor as dn, OneMinusSrcAlphaFactor as hn, DstAlphaFactor as fn, OneMinusDstAlphaFactor as pn, DstColorFactor as mn, OneMinusDstColorFactor as vn, SrcAlphaSaturateFactor as Kn, ConstantColorFactor as gn, OneMinusConstantColorFactor as bn, ConstantAlphaFactor as yn, OneMinusConstantAlphaFactor as En, Matrix4 as Xn, Vector3 as K, Euler as Zn, Ray as Jn, Plane as Qn, MathUtils as ea, MOUSE as Xe, TOUCH as Ze, Quaternion as zt, Spherical as Yt, Vector2 as me, ShaderMaterial as xn, GLSL3 as ta, Mesh as na, PlaneGeometry as aa, Scene as ia, Group as ra, AxesHelper as Vt, MeshDepthMaterial as sa, MeshNormalMaterial as oa, MeshBasicMaterial as ca, PerspectiveCamera as Pt, WebGLRenderer as la, Raycaster as ua, OrthographicCamera as Gt, CameraHelper as da } from "three";
import { Pane as ha } from "tweakpane";
import * as fa from "@tweakpane/plugin-essentials";
import Cn, { useState as ne, useRef as he, useEffect as Re, forwardRef as pa, useMemo as Se } from "react";
import { Reorder as Sn } from "framer-motion";
const wn = () => {
}, ui = () => {
};
function dt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function Je(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function Ht(t, n, a) {
  return (a - t) / (n - t);
}
function Wt(t, n, a) {
  return t * (1 - a) + n * a;
}
function di(t, n) {
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
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (d) => {
    const u = d.toString(16);
    return u.length === 1 ? "0" + u : u;
  }, o = i(n), h = i(a), c = i(e);
  return "#" + o + h + c;
}
function ut(t, n = 1) {
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
}, hi = (t) => {
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
class fi {
  components = /* @__PURE__ */ new Map();
  listen;
  // Protected
  _debugEnabled;
  _broadcastChannel = void 0;
  _webSocket = void 0;
  _mode = "app";
  _connected = !1;
  _useBC = !1;
  constructor(n, a, e = !0) {
    this._debugEnabled = a, a && (this._useBC = e, e ? (this._broadcastChannel = new BroadcastChannel(n), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(n), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
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
class pi extends wt {
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
    const o = this.sheet(n);
    if (o === void 0)
      return;
    const h = `${n}_${a}`;
    let c = this.sheetObjects.get(h);
    c !== void 0 ? c = o.object(a, { ...e, ...c.value }, { reconfigure: !0 }) : c = o.object(a, e), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, i !== void 0 ? i : wn);
    const d = c.onValuesChange((u) => {
      if (this.app.editor) {
        for (const b in u) {
          const E = u[b];
          typeof E == "object" && va(E) && (u[b] = {
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
      const m = this.sheetObjectCBs.get(h);
      m !== void 0 && m(u);
    });
    return this.sheetObjectUnsubscribe.set(h, d), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, e = n.address.objectKey;
    this.sheets.get(a)?.detachObject(e);
    const o = `${a}_${e}`, h = this.sheetObjectUnsubscribe.get(o);
    h !== void 0 && (this.sheetObjects.delete(o), this.sheetObjectCBs.delete(o), this.sheetObjectUnsubscribe.delete(o), h());
  }
  handleApp(n, a, e) {
    const i = a;
    let o;
    switch (e.event) {
      case "setSheet":
        o = i.sheets.get(e.data.sheet), o !== void 0 && (i.activeSheet = o, this.studio?.setSelection([o]));
        break;
      case "setSheetObject":
        o = i.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), o !== void 0 && this.studio?.setSelection([o]);
        break;
      case "updateSheetObject":
        o = i.sheets.get(e.data.sheet), o !== void 0 && o.sequence.pause(), o = i.sheetObjectCBs.get(e.data.sheetObject), o !== void 0 && o(e.data.values);
        break;
      case "updateTimeline":
        o = i.sheets.get(e.data.sheet), i.activeSheet !== void 0 && (i.activeSheet.sequence.position = e.data.position);
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
        h.length < 1 || h.forEach((c) => {
          let d = c.address.sheetId, u = "setSheet", m = {};
          switch (c.type) {
            case "Theatre_Sheet_PublicAPI":
              u = "setSheet", m = {
                sheet: c.address.sheetId
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              u = "setSheetObject", d += `_${c.address.objectKey}`, m = {
                id: d,
                sheet: c.address.sheetId,
                key: c.address.objectKey
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
          }
          n.send({ event: u, target: "app", data: m });
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
      }, o = () => {
        i(), requestAnimationFrame(o);
      };
      i(), o();
    } else
      this.studio?.ui.hide();
  }
}
function mi(t, n, a) {
  if (t.editor) {
    a.ui.restore(), a.onSelectionChange((h) => {
      h.length < 1 || h.forEach((c) => {
        let d = c.address.sheetId, u = "setSheet", m = {};
        switch (c.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", m = {
              sheet: c.address.sheetId
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", d += `_${c.address.objectKey}`, m = {
              id: d,
              sheet: c.address.sheetId,
              key: c.address.objectKey
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
        }
        t.send({ event: u, target: "app", data: m });
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
    }, o = () => {
      i(), requestAnimationFrame(o);
    };
    i(), o();
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
function Qe(t) {
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
              const o = i.source.toJSON();
              n[a] = { src: o.url };
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
      e.material.forEach((o) => {
        i.push(Qe(o));
      }), n.material = i;
    } else
      n.material = Qe(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((o) => {
        i.push(Qe(o));
      }), n.material = i;
    } else
      n.material = Qe(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((o) => {
        i.push(Qe(o));
      }), n.material = i;
    } else
      n.material = Qe(e.material);
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
function ee(t, n, a) {
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
class vi extends wt {
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
}
class gi extends wt {
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
    const o = this.bindID, h = e.onChange !== void 0 ? e.onChange : wn;
    this.bindCBs.set(o, h), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, e).on("change", (d) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: o,
          value: d.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: o,
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
var Nt = { exports: {} }, st = {};
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
    return st;
  qt = 1;
  var t = Cn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(c, d, u) {
    var m, b = {}, E = null, x = null;
    u !== void 0 && (E = "" + u), d.key !== void 0 && (E = "" + d.key), d.ref !== void 0 && (x = d.ref);
    for (m in d)
      e.call(d, m) && !o.hasOwnProperty(m) && (b[m] = d[m]);
    if (c && c.defaultProps)
      for (m in d = c.defaultProps, d)
        b[m] === void 0 && (b[m] = d[m]);
    return { $$typeof: n, type: c, key: E, ref: x, props: b, _owner: i.current };
  }
  return st.Fragment = a, st.jsx = h, st.jsxs = h, st;
}
var ot = {};
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
    var t = Cn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), R = Symbol.iterator, P = "@@iterator";
    function Y(r) {
      if (r === null || typeof r != "object")
        return null;
      var f = R && r[R] || r[P];
      return typeof f == "function" ? f : null;
    }
    var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function M(r) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), S = 1; S < f; S++)
          g[S - 1] = arguments[S];
        w("error", r, g);
      }
    }
    function w(r, f, g) {
      {
        var S = F.ReactDebugCurrentFrame, N = S.getStackAddendum();
        N !== "" && (f += "%s", g = g.concat([N]));
        var B = g.map(function(j) {
          return String(j);
        });
        B.unshift("Warning: " + f), Function.prototype.apply.call(console[r], console, B);
      }
    }
    var ae = !1, X = !1, $ = !1, W = !1, C = !1, Pe;
    Pe = Symbol.for("react.module.reference");
    function Be(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === o || C || r === i || r === u || r === m || W || r === x || ae || X || $ || typeof r == "object" && r !== null && (r.$$typeof === E || r.$$typeof === b || r.$$typeof === h || r.$$typeof === c || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === Pe || r.getModuleId !== void 0));
    }
    function Me(r, f, g) {
      var S = r.displayName;
      if (S)
        return S;
      var N = f.displayName || f.name || "";
      return N !== "" ? g + "(" + N + ")" : g;
    }
    function ge(r) {
      return r.displayName || "Context";
    }
    function ie(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && M("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case e:
          return "Fragment";
        case a:
          return "Portal";
        case o:
          return "Profiler";
        case i:
          return "StrictMode";
        case u:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case c:
            var f = r;
            return ge(f) + ".Consumer";
          case h:
            var g = r;
            return ge(g._context) + ".Provider";
          case d:
            return Me(r, r.render, "ForwardRef");
          case b:
            var S = r.displayName || null;
            return S !== null ? S : ie(r.type) || "Memo";
          case E: {
            var N = r, B = N._payload, j = N._init;
            try {
              return ie(j(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var fe = Object.assign, be = 0, ye, Z, ve, Ae, ke, pe, p;
    function v() {
    }
    v.__reactDisabledLog = !0;
    function O() {
      {
        if (be === 0) {
          ye = console.log, Z = console.info, ve = console.warn, Ae = console.error, ke = console.group, pe = console.groupCollapsed, p = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: v,
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
        be++;
      }
    }
    function A() {
      {
        if (be--, be === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: fe({}, r, {
              value: ye
            }),
            info: fe({}, r, {
              value: Z
            }),
            warn: fe({}, r, {
              value: ve
            }),
            error: fe({}, r, {
              value: Ae
            }),
            group: fe({}, r, {
              value: ke
            }),
            groupCollapsed: fe({}, r, {
              value: pe
            }),
            groupEnd: fe({}, r, {
              value: p
            })
          });
        }
        be < 0 && M("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = F.ReactCurrentDispatcher, H;
    function se(r, f, g) {
      {
        if (H === void 0)
          try {
            throw Error();
          } catch (N) {
            var S = N.stack.trim().match(/\n( *(at )?)/);
            H = S && S[1] || "";
          }
        return `
` + H + r;
      }
    }
    var z = !1, J;
    {
      var oe = typeof WeakMap == "function" ? WeakMap : Map;
      J = new oe();
    }
    function k(r, f) {
      if (!r || z)
        return "";
      {
        var g = J.get(r);
        if (g !== void 0)
          return g;
      }
      var S;
      z = !0;
      var N = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = G.current, G.current = null, O();
      try {
        if (f) {
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
            } catch (_e) {
              S = _e;
            }
            Reflect.construct(r, [], j);
          } else {
            try {
              j.call();
            } catch (_e) {
              S = _e;
            }
            r.call(j.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (_e) {
            S = _e;
          }
          r();
        }
      } catch (_e) {
        if (_e && S && typeof _e.stack == "string") {
          for (var _ = _e.stack.split(`
`), de = S.stack.split(`
`), Q = _.length - 1, te = de.length - 1; Q >= 1 && te >= 0 && _[Q] !== de[te]; )
            te--;
          for (; Q >= 1 && te >= 0; Q--, te--)
            if (_[Q] !== de[te]) {
              if (Q !== 1 || te !== 1)
                do
                  if (Q--, te--, te < 0 || _[Q] !== de[te]) {
                    var Ce = `
` + _[Q].replace(" at new ", " at ");
                    return r.displayName && Ce.includes("<anonymous>") && (Ce = Ce.replace("<anonymous>", r.displayName)), typeof r == "function" && J.set(r, Ce), Ce;
                  }
                while (Q >= 1 && te >= 0);
              break;
            }
        }
      } finally {
        z = !1, G.current = B, A(), Error.prepareStackTrace = N;
      }
      var Ke = r ? r.displayName || r.name : "", Ut = Ke ? se(Ke) : "";
      return typeof r == "function" && J.set(r, Ut), Ut;
    }
    function U(r, f, g) {
      return k(r, !1);
    }
    function re(r) {
      var f = r.prototype;
      return !!(f && f.isReactComponent);
    }
    function we(r, f, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return k(r, re(r));
      if (typeof r == "string")
        return se(r);
      switch (r) {
        case u:
          return se("Suspense");
        case m:
          return se("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return U(r.render);
          case b:
            return we(r.type, f, g);
          case E: {
            var S = r, N = S._payload, B = S._init;
            try {
              return we(B(N), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Te = Object.prototype.hasOwnProperty, ht = {}, ft = F.ReactDebugCurrentFrame;
    function Ue(r) {
      if (r) {
        var f = r._owner, g = we(r.type, r._source, f ? f.type : null);
        ft.setExtraStackFrame(g);
      } else
        ft.setExtraStackFrame(null);
    }
    function tt(r, f, g, S, N) {
      {
        var B = Function.call.bind(Te);
        for (var j in r)
          if (B(r, j)) {
            var _ = void 0;
            try {
              if (typeof r[j] != "function") {
                var de = Error((S || "React class") + ": " + g + " type `" + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[j] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw de.name = "Invariant Violation", de;
              }
              _ = r[j](f, j, S, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              _ = Q;
            }
            _ && !(_ instanceof Error) && (Ue(N), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", g, j, typeof _), Ue(null)), _ instanceof Error && !(_.message in ht) && (ht[_.message] = !0, Ue(N), M("Failed %s type: %s", g, _.message), Ue(null));
          }
      }
    }
    var $e = Array.isArray;
    function nt(r) {
      return $e(r);
    }
    function Ot(r) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g;
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
        return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ot(r)), mt(r);
    }
    var je = F.ReactCurrentOwner, at = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, it, gt, qe;
    qe = {};
    function Mt(r) {
      if (Te.call(r, "ref")) {
        var f = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Tt(r) {
      if (Te.call(r, "key")) {
        var f = Object.getOwnPropertyDescriptor(r, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function bt(r, f) {
      if (typeof r.ref == "string" && je.current && f && je.current.stateNode !== f) {
        var g = ie(je.current.type);
        qe[g] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ie(je.current.type), r.ref), qe[g] = !0);
      }
    }
    function De(r, f) {
      {
        var g = function() {
          it || (it = !0, M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Bt(r, f) {
      {
        var g = function() {
          gt || (gt = !0, M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var s = function(r, f, g, S, N, B, j) {
      var _ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: f,
        ref: g,
        props: j,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return _._store = {}, Object.defineProperty(_._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(_, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: S
      }), Object.defineProperty(_, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: N
      }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
    };
    function y(r, f, g, S, N) {
      {
        var B, j = {}, _ = null, de = null;
        g !== void 0 && (vt(g), _ = "" + g), Tt(f) && (vt(f.key), _ = "" + f.key), Mt(f) && (de = f.ref, bt(f, N));
        for (B in f)
          Te.call(f, B) && !at.hasOwnProperty(B) && (j[B] = f[B]);
        if (r && r.defaultProps) {
          var Q = r.defaultProps;
          for (B in Q)
            j[B] === void 0 && (j[B] = Q[B]);
        }
        if (_ || de) {
          var te = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          _ && De(j, te), de && Bt(j, te);
        }
        return s(r, _, de, N, S, je.current, j);
      }
    }
    var T = F.ReactCurrentOwner, L = F.ReactDebugCurrentFrame;
    function q(r) {
      if (r) {
        var f = r._owner, g = we(r.type, r._source, f ? f.type : null);
        L.setExtraStackFrame(g);
      } else
        L.setExtraStackFrame(null);
    }
    var Ee;
    Ee = !1;
    function ue(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function Rt() {
      {
        if (T.current) {
          var r = ie(T.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function _t(r) {
      {
        if (r !== void 0) {
          var f = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var rt = {};
    function Oe(r) {
      {
        var f = Rt();
        if (!f) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function xe(r, f) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = Oe(f);
        if (rt[g])
          return;
        rt[g] = !0;
        var S = "";
        r && r._owner && r._owner !== T.current && (S = " It was passed a child from " + ie(r._owner.type) + "."), q(r), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, S), q(null);
      }
    }
    function ze(r, f) {
      {
        if (typeof r != "object")
          return;
        if (nt(r))
          for (var g = 0; g < r.length; g++) {
            var S = r[g];
            ue(S) && xe(S, f);
          }
        else if (ue(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var N = Y(r);
          if (typeof N == "function" && N !== r.entries)
            for (var B = N.call(r), j; !(j = B.next()).done; )
              ue(j.value) && xe(j.value, f);
        }
      }
    }
    function Ye(r) {
      {
        var f = r.type;
        if (f == null || typeof f == "string")
          return;
        var g;
        if (typeof f == "function")
          g = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === b))
          g = f.propTypes;
        else
          return;
        if (g) {
          var S = ie(f);
          tt(g, r.props, "prop", S, r);
        } else if (f.PropTypes !== void 0 && !Ee) {
          Ee = !0;
          var N = ie(f);
          M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", N || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ve(r) {
      {
        for (var f = Object.keys(r.props), g = 0; g < f.length; g++) {
          var S = f[g];
          if (S !== "children" && S !== "key") {
            q(r), M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), q(null);
            break;
          }
        }
        r.ref !== null && (q(r), M("Invalid attribute `ref` supplied to `React.Fragment`."), q(null));
      }
    }
    function Ge(r, f, g, S, N, B) {
      {
        var j = Be(r);
        if (!j) {
          var _ = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (_ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var de = _t(N);
          de ? _ += de : _ += Rt();
          var Q;
          r === null ? Q = "null" : nt(r) ? Q = "array" : r !== void 0 && r.$$typeof === n ? (Q = "<" + (ie(r.type) || "Unknown") + " />", _ = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof r, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, _);
        }
        var te = y(r, f, g, N, B);
        if (te == null)
          return te;
        if (j) {
          var Ce = f.children;
          if (Ce !== void 0)
            if (S)
              if (nt(Ce)) {
                for (var Ke = 0; Ke < Ce.length; Ke++)
                  ze(Ce[Ke], r);
                Object.freeze && Object.freeze(Ce);
              } else
                M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ze(Ce, r);
        }
        return r === e ? Ve(te) : Ye(te), te;
      }
    }
    function An(r, f, g) {
      return Ge(r, f, g, !0);
    }
    function kn(r, f, g) {
      return Ge(r, f, g, !1);
    }
    var jn = kn, Dn = An;
    ot.Fragment = e, ot.jsx = jn, ot.jsxs = Dn;
  }()), ot;
}
process.env.NODE_ENV === "production" ? Nt.exports = wa() : Nt.exports = Oa();
var l = Nt.exports;
function Rn(t) {
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
function Ra(t) {
  return /* @__PURE__ */ l.jsx(Sn.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ta,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ma })
  ] }) }, t.title);
}
function _a(t) {
  const [n, a] = ne(!1), [e, i] = ne(t.options), o = (u) => {
    t.onDragComplete(u), i(u);
  }, h = (u) => {
    const m = [...e];
    m.splice(u, 1), o(m);
  }, c = [];
  e.forEach((u, m) => {
    c.push(/* @__PURE__ */ l.jsx(Ra, { index: m, title: u, onDelete: h }, u));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Rn, { title: t.title }),
    /* @__PURE__ */ l.jsx(Sn.Group, { axis: "y", values: e, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Pa(t) {
  const [n, a] = ne(!1), e = [];
  t.options.map((o, h) => {
    t.onSelect !== void 0 && (o.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Aa, { option: o }, h));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Rn, { title: t.title }),
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
  const { option: n } = t, [a, e] = ne("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        _a,
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
function bi(t, n, a) {
  function e(o) {
    switch (n.forEach((h) => {
      h.callback(t, h.remote, o);
    }), o.event) {
      case "custom":
        D.dispatchEvent({ type: I.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((h) => {
      h.callback(t, h.remote, o);
    }), o.event) {
      case "custom":
        D.dispatchEvent({ type: I.CUSTOM, value: o.data });
        break;
    }
  }
  t.listen = (o) => {
    o.target === "editor" ? i(o) : e(o);
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
          /* @__PURE__ */ l.jsx("p", { className: "label", children: dt(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function _n(t) {
  const [n, a] = ne(!1), e = t.child !== void 0 && t.child.children.length > 0, i = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((o) => {
    i.push(/* @__PURE__ */ l.jsx(_n, { child: o, three: t.three }, Math.random()));
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
    n.push(/* @__PURE__ */ l.jsx(_n, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const ja = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Da(t) {
  return "items" in t;
}
function We(t) {
  const n = [];
  return t.items.forEach((a) => {
    Da(a) ? n.push(
      /* @__PURE__ */ l.jsx(We, { title: dt(a.title), items: a.items }, Math.random())
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
        i.onload = function(o) {
          n(o.target.result);
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
function ct(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Xt(t, n, a) {
  const e = [];
  for (const i in t) {
    if (!Ia(i))
      continue;
    const o = typeof t[i], h = t[i];
    if (o === "boolean" || o === "number" || o === "string") {
      const c = {
        title: Ie(i),
        prop: i,
        type: o,
        value: h,
        min: void 0,
        max: void 0,
        needsUpdate: o === "boolean",
        onChange: (u, m) => {
          a.updateObject(n.uuid, `material.${u}`, m), c.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${u}`, m);
        }
      };
      switch (i) {
        case "blending":
          ct(c, Ba);
          break;
        case "blendDst":
          ct(c, za);
          break;
        case "blendEquation":
          ct(c, Ua);
          break;
        case "blendSrc":
          ct(c, $a);
          break;
        case "side":
          ct(c, Fa);
          break;
      }
      Na(i) && (c.value = Number(h), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const d = o === "string" && (i === "vertexShader" || i === "fragmentShader");
      d && (c.disabled = !1, c.latest = c.value, c.onChange = (u, m) => {
        c.latest = m;
      }), e.push(c), d && e.push({
        title: `${dt(i)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${i}`, c.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const u = a.scene?.getObjectByProperty("uuid", n.uuid);
          u !== void 0 && (ee(u, `material.${i}`, c.latest), u.material.needsUpdate = !0);
        }
      });
    } else if (o === "object")
      if (h.isColor)
        e.push({
          title: Ie(i),
          prop: i,
          type: "color",
          value: h,
          onChange: (c, d) => {
            const u = new St(d);
            a.updateObject(n.uuid, `material.${c}`, u);
            const m = a.scene?.getObjectByProperty("uuid", n.uuid);
            m !== void 0 && ee(m, `material.${c}`, u);
          }
        });
      else if (Array.isArray(h)) {
        const c = [];
        for (const d in h)
          c.push({
            title: `${d}`,
            type: `${typeof h[d]}`,
            value: h[d],
            onChange: (u, m) => {
              a.updateObject(n.uuid, `material.${i}`, m);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${i}`, m);
            }
          });
        e.push({
          title: Ie(i),
          items: c
        });
      } else if (h.x !== void 0 && h.y !== void 0 && h.z === void 0)
        e.push({
          title: Ie(i),
          prop: i,
          type: "vector",
          value: h,
          onChange: (c, d) => {
            a.updateObject(n.uuid, `material.${c}`, d);
            const u = a.scene?.getObjectByProperty("uuid", n.uuid);
            u !== void 0 && ee(u, `material.${c}`, d);
          }
        });
      else {
        const c = [];
        for (const d in h) {
          const u = h[d];
          switch (typeof u) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: Ie(i),
                type: "image",
                value: u,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${i}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && It(E).then((R) => {
                    ee(x, `material.${i}`, R), ee(x, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${Ie(d)}`,
                prop: `material.${i}.${d}`,
                type: `${typeof t[i][d]}`,
                value: h[d],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${i}.${d}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && ee(x, `material.${i}.${d}`, E);
                }
              });
              break;
            case "object":
              if (u.value !== void 0 && u.value.src !== void 0)
                c.push({
                  title: Ie(d),
                  type: "image",
                  value: u.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${i}.${d}.value`, h);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && It(E).then((R) => {
                      ee(x, `material.${i}.${d}.value`, R);
                    });
                  }
                });
              else if (i === "uniforms") {
                const b = u.value, E = (x, R, P) => ({
                  title: x,
                  type: "number",
                  value: P,
                  step: 0.01,
                  onChange: (Y, F) => {
                    const M = `material.uniforms.${d}.value.${R}`;
                    a.updateObject(n.uuid, M, F);
                    const w = a.scene?.getObjectByProperty("uuid", n.uuid);
                    w !== void 0 && ee(w, M, F);
                  }
                });
                if (typeof u.value == "number")
                  c.push({
                    title: d,
                    type: "number",
                    value: u.value,
                    step: 0.01,
                    onChange: (x, R) => {
                      const P = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, P, R);
                      const Y = a.scene?.getObjectByProperty("uuid", n.uuid);
                      Y !== void 0 && ee(Y, P, R);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  c.push({
                    title: d,
                    type: "color",
                    value: u.value,
                    onChange: (x, R) => {
                      const P = new St(R), Y = `material.${i}.${x}.value`;
                      a.updateObject(n.uuid, Y, P);
                      const F = a.scene?.getObjectByProperty("uuid", n.uuid);
                      F !== void 0 && ee(F, Y, P);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  c.push({
                    title: d,
                    type: "vector",
                    value: u.value,
                    prop: `material.${i}.${d}.value`,
                    onChange: (x, R) => {
                      a.updateObject(n.uuid, x, R);
                      const P = a.scene?.getObjectByProperty("uuid", n.uuid);
                      P !== void 0 && ee(P, x, R);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w === void 0)
                  c.push(
                    {
                      title: d,
                      items: [
                        E("X", "x", u.value.x),
                        E("Y", "y", u.value.y),
                        E("Z", "z", u.value.z)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w !== void 0)
                  c.push(
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
                else if (b.elements !== void 0) {
                  const x = b.elements, R = [];
                  for (let P = 0; P < x.length; P++)
                    R.push(E(P.toString(), P.toString(), x[P]));
                  c.push(
                    {
                      title: d,
                      items: R
                    }
                  );
                } else
                  console.log(">>> need to add this format:", d, b);
              } else
                c.push({
                  title: d,
                  type: `${typeof u.value}`,
                  value: u.value,
                  onChange: (b, E) => {
                    a.updateObject(n.uuid, `material.${i}.${d}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && ee(x, `material.${i}.${d}.value`, E);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: Ie(i),
          items: c
        });
      }
    else
      h !== void 0 && console.log("other:", i, o, h);
  }
  return e.sort((i, o) => i.title < o.title ? -1 : i.title > o.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function Ya(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], i = a.length;
    for (let o = 0; o < i; o++)
      e.push(
        /* @__PURE__ */ l.jsx(
          We,
          {
            title: `Material ${o}`,
            items: Xt(a[o], t, n)
          },
          `Material ${o}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      We,
      {
        title: "Material",
        items: Xt(a, t, n)
      }
    );
}
function Va(t) {
  const n = he(null), a = he(null), e = he(null), i = he(null), o = he(null), h = he(null), [c, d] = ne(t.value), [u, m] = ne({ min: t.min, max: t.max }), [b, E] = ne(!1);
  function x() {
    b || (window.addEventListener("mousemove", P), window.addEventListener("mouseup", R), window.addEventListener("mouseup", R), E(!0));
  }
  function R() {
    window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", R), E(!1);
  }
  function P(w) {
    const ae = o.current.getBoundingClientRect(), X = Je(0, 99, w.clientX - ae.left) / 99, $ = Je(0, 99, w.clientY - ae.top) / 99, W = ut(Wt(u.min, u.max, X), 3), C = ut(Wt(u.min, u.max, $), 3);
    t.onChange({ target: { value: { x: W, y: C } } }), d({ x: W, y: C });
  }
  function Y(w) {
    let ae = c.x, X = c.y;
    w.target === n.current ? ae = Number(w.target.value) : X = Number(w.target.value), d({ x: ae, y: X });
  }
  function F() {
    const w = Number(e.current.value);
    m({ min: w, max: u.max }), (c.x < w || c.y < w) && d({ x: Je(w, u.max, c.x), y: Je(w, u.max, c.y) });
  }
  function M() {
    const w = Number(i.current.value);
    m({ min: u.min, max: w }), (c.x > w || c.y > w) && d({ x: Je(u.min, w, c.x), y: Je(u.min, w, c.y) });
  }
  return Re(() => {
    console.log(u.min, u.max, c.x, c.y);
    const w = Ht(u.min, u.max, c.x), ae = Ht(u.min, u.max, c.y);
    h.current.style.left = `${w * 100}%`, h.current.style.top = `${ae * 100}%`;
  }, [u, c]), /* @__PURE__ */ l.jsxs("div", { className: "vector", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: c.x,
            min: u.min,
            max: u.max,
            step: 0.01,
            onChange: Y
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
            min: u.min,
            max: u.max,
            step: 0.01,
            onChange: Y
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
            onChange: F
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
            onChange: M
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: o, onMouseDown: x, onMouseUp: R, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: h })
    ] })
  ] });
}
function lt(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = ga(t.value));
  const [a, e] = ne(n), i = he(null), o = he(null), h = he(null);
  Re(() => {
    let m = !1, b = -1, E = 0, x = Number(a);
    const R = (w) => {
      m = !0, E = x, b = w.clientX;
    }, P = (w) => {
      if (!m)
        return;
      const ae = t.step !== void 0 ? t.step : 1, X = (w.clientX - b) * ae;
      x = Number((E + X).toFixed(4)), o.current !== null && (o.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, Y = () => {
      m = !1;
    }, F = () => {
      m = !1;
    }, M = t.type === "number";
    return M && (i.current?.addEventListener("mousedown", R, !1), document.addEventListener("mouseup", Y, !1), document.addEventListener("mousemove", P, !1), document.addEventListener("contextmenu", F, !1)), () => {
      M && (i.current?.removeEventListener("mousedown", R), document.removeEventListener("mouseup", Y), document.removeEventListener("mousemove", P), document.removeEventListener("contextmenu", F));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = c || t.type === "image" || t.type === "vector", u = (m) => {
    let b = m.target.value;
    t.type === "boolean" ? b = m.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: dt(t.title) }, "fieldLabel"),
    t.type === "string" && !c && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: u,
        value: a
      }
    ),
    t.type === "string" && c && /* @__PURE__ */ l.jsx(
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
        ref: o,
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
      La().then((m) => {
        h.current.src = m, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, m);
      });
    }, src: a.length > 0 ? a : ja }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: u, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((m, b) => /* @__PURE__ */ l.jsx("option", { value: m.value, children: dt(m.title) }, b)) }) }),
    t.type === "vector" && /* @__PURE__ */ l.jsx(Va, { value: a, min: -1, max: 1, onChange: u })
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
function Ga(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: Zt(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (i, o) => {
          n.updateObject(t.uuid, i, o), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = n.scene?.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (ee(h, i, o), h.updateProjectionMatrix());
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
        onChange: (i, o) => {
          n.updateObject(t.uuid, i, o), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const h = n.scene?.getObjectByProperty("uuid", t.uuid);
          h !== void 0 && (ee(h, i, o), h.updateProjectionMatrix());
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
const Ha = Math.PI / 180, Wa = 180 / Math.PI;
function et(t, n, a, e, i) {
  return e + (t - n) * (i - e) / (a - n);
}
function qa(t) {
  return t * Ha;
}
function kt(t) {
  return t * Wa;
}
function Ka(t, n) {
  const a = new Xn();
  a.elements = t.matrix;
  const e = new K(), i = new Zn(), o = new K();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const h = (d, u) => {
    n.updateObject(t.uuid, d, u);
    const m = n.scene?.getObjectByProperty("uuid", t.uuid);
    m !== void 0 && ee(m, d, u);
  }, c = (d, u) => {
    h(d, qa(u));
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
          value: ut(kt(i.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: ut(kt(i.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: ut(kt(i.z)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Scale X",
          prop: "scale.x",
          type: "number",
          value: o.x,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: o.y,
          step: 0.01,
          onChange: h
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: o.z,
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
function Xa(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const i = t.lightInfo[e];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: Jt(e),
        prop: e,
        type: "color",
        value: i,
        onChange: (o, h) => {
          const c = new St(h);
          n.updateObject(t.uuid, o, c);
          const d = n.scene?.getObjectByProperty("uuid", t.uuid);
          d !== void 0 && ee(d, o, c);
        }
      }) : a.push({
        title: Jt(e),
        prop: e,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (o, h) => {
          n.updateObject(t.uuid, o, h);
          const c = n.scene?.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && ee(c, o, h);
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
function Za(t, n) {
  const a = [], e = [];
  let i = 0;
  t.animations.forEach((c) => {
    i = Math.max(i, c.duration), c.duration > 0 && e.push({
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
    items: e
  });
  const o = n.scene?.getObjectByProperty("uuid", t.uuid);
  let h = !1;
  if (o !== void 0) {
    const c = o.mixer;
    if (h = c !== void 0, h) {
      const d = [
        {
          title: "Time Scale",
          type: "range",
          value: c.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (u, m) => {
            c.timeScale = m, n.updateObject(t.uuid, "mixer.timeScale", m);
          }
        }
      ];
      d.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          c.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: d
      });
    }
  }
  return /* @__PURE__ */ l.jsx(We, { title: "Animation", items: a });
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
let ce = { ...Pn };
function Ja(t) {
  const [n, a] = ne(-1);
  Re(() => {
    function h(d) {
      ce = { ...d.value }, a(Date.now());
    }
    function c() {
      ce = { ...Pn }, a(Date.now());
    }
    return D.addEventListener(I.SET_SCENE, c), D.addEventListener(I.SET_OBJECT, h), () => {
      D.removeEventListener(I.SET_SCENE, c), D.removeEventListener(I.SET_OBJECT, h);
    };
  }, []);
  const e = ce.type.toLowerCase(), i = ce.animations.length > 0 || ce.mixer !== void 0, o = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Ft, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: ce.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ce.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ce.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ce.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        lt,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: ce.visible,
          onChange: (h, c) => {
            t.three.updateObject(ce.uuid, h, c);
            const d = t.three.scene?.getObjectByProperty("uuid", ce.uuid);
            d !== void 0 && ee(d, h, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Ka(ce, t.three),
      i ? Za(ce, t.three) : null,
      e.search("camera") > -1 ? Ga(ce, t.three) : null,
      e.search("light") > -1 ? Xa(ce, t.three) : null,
      o ? Ya(ce, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function yi(t) {
  const [n, a] = ne(t.scene);
  Re(() => {
    const o = (h) => {
      a(h.value);
    };
    return D.addEventListener(I.SET_SCENE, o), () => {
      D.removeEventListener(I.SET_SCENE, o);
    };
  }, []);
  const e = n !== null, i = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Ft, { label: i, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: e && /* @__PURE__ */ l.jsx(ka, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ l.jsx(Ja, { three: t.three })
  ] }, "SidePanel");
}
function Ei(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (c) => {
    if (!n())
      return;
    const d = t.three.scene?.getObjectByProperty("uuid", c.value);
    d !== void 0 && t.three.setObject(d);
  }, e = (c, d, u) => {
    if (!n())
      return;
    const m = t.three.scene?.getObjectByProperty("uuid", c);
    m !== void 0 && ee(m, d, u);
  }, i = (c) => {
    if (!n())
      return;
    const d = c.value, { key: u, value: m, uuid: b } = d;
    e(b, u, m);
  }, o = (c) => {
    if (!n())
      return;
    const d = c.value;
    It(d.value).then((u) => {
      e(d.uuid, d.key, u), e(d.uuid, "material.needsUpdate", !0);
    });
  }, h = (c) => {
    if (!n())
      return;
    const { key: d, uuid: u, value: m, subitem: b } = c.value, E = t.three.scene?.getObjectByProperty("uuid", u);
    if (E !== void 0)
      try {
        b !== void 0 ? Sa(E, b)[d](m) : E[d](m);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(d), console.log(m);
      }
  };
  return Re(() => (D.addEventListener(I.GET_OBJECT, a), D.addEventListener(I.UPDATE_OBJECT, i), D.addEventListener(I.CREATE_TEXTURE, o), D.addEventListener(I.REQUEST_METHOD, h), () => {
    D.removeEventListener(I.GET_OBJECT, a), D.removeEventListener(I.UPDATE_OBJECT, i), D.removeEventListener(I.CREATE_TEXTURE, o), D.removeEventListener(I.REQUEST_METHOD, h);
  }), []), null;
}
const Qt = { type: "change" }, jt = { type: "start" }, en = { type: "end" }, yt = new Jn(), tn = new Qn(), Qa = Math.cos(70 * ea.DEG2RAD);
class ei extends an {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new K(), this.cursor = new K(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Xe.ROTATE, MIDDLE: Xe.DOLLY, RIGHT: Xe.PAN }, this.touches = { ONE: Ze.ROTATE, TWO: Ze.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", at), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", at), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Qt), e.update(), o = i.NONE;
    }, this.update = function() {
      const s = new K(), y = new zt().setFromUnitVectors(n.up, new K(0, 1, 0)), T = y.clone().invert(), L = new K(), q = new zt(), Ee = new K(), ue = 2 * Math.PI;
      return function(_t = null) {
        const rt = e.object.position;
        s.copy(rt).sub(e.target), s.applyQuaternion(y), c.setFromVector3(s), e.autoRotate && o === i.NONE && ge(Be(_t)), e.enableDamping ? (c.theta += d.theta * e.dampingFactor, c.phi += d.phi * e.dampingFactor) : (c.theta += d.theta, c.phi += d.phi);
        let Oe = e.minAzimuthAngle, xe = e.maxAzimuthAngle;
        isFinite(Oe) && isFinite(xe) && (Oe < -Math.PI ? Oe += ue : Oe > Math.PI && (Oe -= ue), xe < -Math.PI ? xe += ue : xe > Math.PI && (xe -= ue), Oe <= xe ? c.theta = Math.max(Oe, Math.min(xe, c.theta)) : c.theta = c.theta > (Oe + xe) / 2 ? Math.max(Oe, c.theta) : Math.min(xe, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(m, e.dampingFactor) : e.target.add(m), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && $ || e.object.isOrthographicCamera ? c.radius = ke(c.radius) : c.radius = ke(c.radius * u), s.setFromSpherical(c), s.applyQuaternion(T), rt.copy(e.target).add(s), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, m.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), m.set(0, 0, 0));
        let ze = !1;
        if (e.zoomToCursor && $) {
          let Ye = null;
          if (e.object.isPerspectiveCamera) {
            const Ve = s.length();
            Ye = ke(Ve * u);
            const Ge = Ve - Ye;
            e.object.position.addScaledVector(ae, Ge), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Ve = new K(X.x, X.y, 0);
            Ve.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / u)), e.object.updateProjectionMatrix(), ze = !0;
            const Ge = new K(X.x, X.y, 0);
            Ge.unproject(e.object), e.object.position.sub(Ge).add(Ve), e.object.updateMatrixWorld(), Ye = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ye !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ye).add(e.object.position) : (yt.origin.copy(e.object.position), yt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(yt.direction)) < Qa ? n.lookAt(e.target) : (tn.setFromNormalAndCoplanarPoint(e.object.up, e.target), yt.intersectPlane(tn, e.target))));
        } else
          e.object.isOrthographicCamera && (ze = u !== 1, ze && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / u)), e.object.updateProjectionMatrix()));
        return u = 1, $ = !1, ze || L.distanceToSquared(e.object.position) > h || 8 * (1 - q.dot(e.object.quaternion)) > h || Ee.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Qt), L.copy(e.object.position), q.copy(e.object.quaternion), Ee.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", qe), e.domElement.removeEventListener("pointerdown", Ue), e.domElement.removeEventListener("pointercancel", $e), e.domElement.removeEventListener("wheel", pt), e.domElement.removeEventListener("pointermove", tt), e.domElement.removeEventListener("pointerup", $e), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", at), e._domElementKeyEvents = null);
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
    let o = i.NONE;
    const h = 1e-6, c = new Yt(), d = new Yt();
    let u = 1;
    const m = new K(), b = new me(), E = new me(), x = new me(), R = new me(), P = new me(), Y = new me(), F = new me(), M = new me(), w = new me(), ae = new K(), X = new me();
    let $ = !1;
    const W = [], C = {};
    let Pe = !1;
    function Be(s) {
      return s !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Me(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function ge(s) {
      d.theta -= s;
    }
    function ie(s) {
      d.phi -= s;
    }
    const fe = function() {
      const s = new K();
      return function(T, L) {
        s.setFromMatrixColumn(L, 0), s.multiplyScalar(-T), m.add(s);
      };
    }(), be = function() {
      const s = new K();
      return function(T, L) {
        e.screenSpacePanning === !0 ? s.setFromMatrixColumn(L, 1) : (s.setFromMatrixColumn(L, 0), s.crossVectors(e.object.up, s)), s.multiplyScalar(T), m.add(s);
      };
    }(), ye = function() {
      const s = new K();
      return function(T, L) {
        const q = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const Ee = e.object.position;
          s.copy(Ee).sub(e.target);
          let ue = s.length();
          ue *= Math.tan(e.object.fov / 2 * Math.PI / 180), fe(2 * T * ue / q.clientHeight, e.object.matrix), be(2 * L * ue / q.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (fe(T * (e.object.right - e.object.left) / e.object.zoom / q.clientWidth, e.object.matrix), be(L * (e.object.top - e.object.bottom) / e.object.zoom / q.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Z(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? u /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ve(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? u *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Ae(s, y) {
      if (!e.zoomToCursor)
        return;
      $ = !0;
      const T = e.domElement.getBoundingClientRect(), L = s - T.left, q = y - T.top, Ee = T.width, ue = T.height;
      X.x = L / Ee * 2 - 1, X.y = -(q / ue) * 2 + 1, ae.set(X.x, X.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function ke(s) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, s));
    }
    function pe(s) {
      b.set(s.clientX, s.clientY);
    }
    function p(s) {
      Ae(s.clientX, s.clientX), F.set(s.clientX, s.clientY);
    }
    function v(s) {
      R.set(s.clientX, s.clientY);
    }
    function O(s) {
      E.set(s.clientX, s.clientY), x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      ge(2 * Math.PI * x.x / y.clientHeight), ie(2 * Math.PI * x.y / y.clientHeight), b.copy(E), e.update();
    }
    function A(s) {
      M.set(s.clientX, s.clientY), w.subVectors(M, F), w.y > 0 ? Z(Me(w.y)) : w.y < 0 && ve(Me(w.y)), F.copy(M), e.update();
    }
    function G(s) {
      P.set(s.clientX, s.clientY), Y.subVectors(P, R).multiplyScalar(e.panSpeed), ye(Y.x, Y.y), R.copy(P), e.update();
    }
    function H(s) {
      Ae(s.clientX, s.clientY), s.deltaY < 0 ? ve(Me(s.deltaY)) : s.deltaY > 0 && Z(Me(s.deltaY)), e.update();
    }
    function se(s) {
      let y = !1;
      switch (s.code) {
        case e.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? ie(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ye(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? ie(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ye(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? ge(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ye(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? ge(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ye(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (s.preventDefault(), e.update());
    }
    function z(s) {
      if (W.length === 1)
        b.set(s.pageX, s.pageY);
      else {
        const y = De(s), T = 0.5 * (s.pageX + y.x), L = 0.5 * (s.pageY + y.y);
        b.set(T, L);
      }
    }
    function J(s) {
      if (W.length === 1)
        R.set(s.pageX, s.pageY);
      else {
        const y = De(s), T = 0.5 * (s.pageX + y.x), L = 0.5 * (s.pageY + y.y);
        R.set(T, L);
      }
    }
    function oe(s) {
      const y = De(s), T = s.pageX - y.x, L = s.pageY - y.y, q = Math.sqrt(T * T + L * L);
      F.set(0, q);
    }
    function k(s) {
      e.enableZoom && oe(s), e.enablePan && J(s);
    }
    function U(s) {
      e.enableZoom && oe(s), e.enableRotate && z(s);
    }
    function re(s) {
      if (W.length == 1)
        E.set(s.pageX, s.pageY);
      else {
        const T = De(s), L = 0.5 * (s.pageX + T.x), q = 0.5 * (s.pageY + T.y);
        E.set(L, q);
      }
      x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      ge(2 * Math.PI * x.x / y.clientHeight), ie(2 * Math.PI * x.y / y.clientHeight), b.copy(E);
    }
    function we(s) {
      if (W.length === 1)
        P.set(s.pageX, s.pageY);
      else {
        const y = De(s), T = 0.5 * (s.pageX + y.x), L = 0.5 * (s.pageY + y.y);
        P.set(T, L);
      }
      Y.subVectors(P, R).multiplyScalar(e.panSpeed), ye(Y.x, Y.y), R.copy(P);
    }
    function Te(s) {
      const y = De(s), T = s.pageX - y.x, L = s.pageY - y.y, q = Math.sqrt(T * T + L * L);
      M.set(0, q), w.set(0, Math.pow(M.y / F.y, e.zoomSpeed)), Z(w.y), F.copy(M);
      const Ee = (s.pageX + y.x) * 0.5, ue = (s.pageY + y.y) * 0.5;
      Ae(Ee, ue);
    }
    function ht(s) {
      e.enableZoom && Te(s), e.enablePan && we(s);
    }
    function ft(s) {
      e.enableZoom && Te(s), e.enableRotate && re(s);
    }
    function Ue(s) {
      e.enabled !== !1 && (W.length === 0 && (e.domElement.setPointerCapture(s.pointerId), e.domElement.addEventListener("pointermove", tt), e.domElement.addEventListener("pointerup", $e)), Mt(s), s.pointerType === "touch" ? it(s) : nt(s));
    }
    function tt(s) {
      e.enabled !== !1 && (s.pointerType === "touch" ? gt(s) : Ot(s));
    }
    function $e(s) {
      switch (Tt(s), W.length) {
        case 0:
          e.domElement.releasePointerCapture(s.pointerId), e.domElement.removeEventListener("pointermove", tt), e.domElement.removeEventListener("pointerup", $e), e.dispatchEvent(en), o = i.NONE;
          break;
        case 1:
          const y = W[0], T = C[y];
          it({ pointerId: y, pageX: T.x, pageY: T.y });
          break;
      }
    }
    function nt(s) {
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
        case Xe.DOLLY:
          if (e.enableZoom === !1)
            return;
          p(s), o = i.DOLLY;
          break;
        case Xe.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enablePan === !1)
              return;
            v(s), o = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            pe(s), o = i.ROTATE;
          }
          break;
        case Xe.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enableRotate === !1)
              return;
            pe(s), o = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            v(s), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && e.dispatchEvent(jt);
    }
    function Ot(s) {
      switch (o) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          O(s);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          A(s);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          G(s);
          break;
      }
    }
    function pt(s) {
      e.enabled === !1 || e.enableZoom === !1 || o !== i.NONE || (s.preventDefault(), e.dispatchEvent(jt), H(mt(s)), e.dispatchEvent(en));
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
      return s.ctrlKey && !Pe && (T.deltaY *= 10), T;
    }
    function vt(s) {
      s.key === "Control" && (Pe = !0, e.domElement.getRootNode().addEventListener("keyup", je, { passive: !0, capture: !0 }));
    }
    function je(s) {
      s.key === "Control" && (Pe = !1, e.domElement.getRootNode().removeEventListener("keyup", je, { passive: !0, capture: !0 }));
    }
    function at(s) {
      e.enabled === !1 || e.enablePan === !1 || se(s);
    }
    function it(s) {
      switch (bt(s), W.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ze.ROTATE:
              if (e.enableRotate === !1)
                return;
              z(s), o = i.TOUCH_ROTATE;
              break;
            case Ze.PAN:
              if (e.enablePan === !1)
                return;
              J(s), o = i.TOUCH_PAN;
              break;
            default:
              o = i.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ze.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              k(s), o = i.TOUCH_DOLLY_PAN;
              break;
            case Ze.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              U(s), o = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = i.NONE;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && e.dispatchEvent(jt);
    }
    function gt(s) {
      switch (bt(s), o) {
        case i.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          re(s), e.update();
          break;
        case i.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          we(s), e.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          ht(s), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          ft(s), e.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function qe(s) {
      e.enabled !== !1 && s.preventDefault();
    }
    function Mt(s) {
      W.push(s.pointerId);
    }
    function Tt(s) {
      delete C[s.pointerId];
      for (let y = 0; y < W.length; y++)
        if (W[y] == s.pointerId) {
          W.splice(y, 1);
          return;
        }
    }
    function bt(s) {
      let y = C[s.pointerId];
      y === void 0 && (y = new me(), C[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function De(s) {
      const y = s.pointerId === W[0] ? W[1] : W[0];
      return C[y];
    }
    e.domElement.addEventListener("contextmenu", qe), e.domElement.addEventListener("pointerdown", Ue), e.domElement.addEventListener("pointercancel", $e), e.domElement.addEventListener("wheel", pt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", vt, { passive: !0, capture: !0 }), this.update();
  }
}
const Ct = (t) => {
  const [n, a] = ne(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, i = (o) => {
    o !== n && (t.onSelect(o), a(o)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, He = pa(function(n, a) {
  const [e, i] = ne(!1), o = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Ct,
      {
        index: o,
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
class ti extends xn {
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
class ni extends na {
  gridMaterial;
  constructor() {
    const n = new ti();
    super(new aa(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ai = `#include <common>
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
}`, ii = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ri extends xn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ai,
      fragmentShader: ii
    });
  }
}
let Et = "Renderer", Ne, xt = !1, nn = !1, V, le, Le, Fe;
function xi(t) {
  const n = Se(() => /* @__PURE__ */ new Map(), []), a = Se(() => /* @__PURE__ */ new Map(), []), e = Se(() => /* @__PURE__ */ new Map(), []), i = Se(() => new ia(), []), o = Se(() => new ra(), []), h = Se(() => new ni(), []), c = Se(() => new Vt(500), []), d = Se(() => new Vt(100), []), u = Se(() => new sa(), []), m = Se(() => new oa(), []), b = Se(() => new ri(), []), E = Se(() => new ca({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function x(p, v) {
    const O = new Gt(-100, 100, 100, -100, 50, 3e3);
    return O.name = p, O.position.copy(v), O.lookAt(0, 0, 0), n.set(p, O), O;
  }
  const R = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], P = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ];
  Re(() => {
    i.name = "Debug Scene", o.name = "helpers", i.add(o), o.add(h), c.name = "axisHelper", o.add(c), d.name = "interactionHelper", o.add(d), d.visible = !1, x("Top", new K(0, 1e3, 0)), x("Bottom", new K(0, -1e3, 0)), x("Left", new K(-1e3, 0, 0)), x("Right", new K(1e3, 0, 0)), x("Front", new K(0, 0, 1e3)), x("Back", new K(0, 0, -1e3)), x("Orthographic", new K(1e3, 1e3, 1e3));
    const p = new Pt(60, 1, 50, 3e3);
    p.name = "Debug", p.position.set(500, 500, 500), p.lookAt(0, 0, 0), n.set("Debug", p), V = n.get("Debug"), le = n.get("Orthographic"), Le = n.get("Front"), Fe = n.get("Top");
  }, []);
  const Y = he(null), F = he(null), M = he(null), w = he(null), ae = he(null), X = he(null), [$, W] = ne(t.mode !== void 0 ? t.mode : "Single"), [C, Pe] = ne(null), [Be, Me] = ne(!1), [ge, ie] = ne(!1), [fe, be] = ne(!1), [, ye] = ne(Date.now()), Z = (p, v) => {
    const O = a.get(p.name);
    O !== void 0 && O.dispose(), a.delete(p.name);
    const A = e.get(p.name);
    A !== void 0 && (i.remove(A), A.dispose()), e.delete(p.name);
    const G = new ei(p, v);
    switch (G.enableDamping = !0, G.dampingFactor = 0.05, p.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        G.enableRotate = !1;
        break;
    }
    if (a.set(p.name, G), p instanceof Pt) {
      const H = new da(p);
      e.set(p.name, H), i.add(H);
    }
  }, ve = (p) => {
    const v = e.get(p.name);
    v !== void 0 && (i.remove(v), v.dispose(), e.delete(p.name));
    const O = a.get(p.name);
    O !== void 0 && (O.dispose(), a.delete(p.name));
  }, Ae = () => {
    a.forEach((p, v) => {
      p.dispose();
      const O = e.get(v);
      O !== void 0 && (i.remove(O), O.dispose()), e.delete(v), a.delete(v);
    }), a.clear(), e.clear();
  }, ke = () => {
    switch ($) {
      case "Single":
        Z(V, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        Z(V, M.current), Z(le, w.current);
        break;
      case "Quad":
        Z(V, M.current), Z(le, w.current), Z(Le, ae.current), Z(Fe, X.current);
        break;
    }
  };
  Re(() => {
    const p = new la({
      canvas: Y.current,
      stencil: !1
    });
    p.autoClear = !1, p.shadowMap.enabled = !0, p.setPixelRatio(devicePixelRatio), p.setClearColor(0), t.three.renderer = p, Pe(p);
  }, []), Re(() => {
    const p = (A) => {
      Mn(Ne), i.remove(Ne);
      const G = t.scenes.get(A.value.name);
      if (G !== void 0) {
        const H = new G();
        t.onSceneSet !== void 0 && t.onSceneSet(H), Ne = H, t.three.scene = Ne, i.add(Ne), nn = !0;
      }
    }, v = (A) => {
      const G = A.value, H = t.three.scene?.getObjectByProperty("uuid", G.uuid);
      H !== void 0 && n.set(G.name, H), ye(Date.now());
    }, O = (A) => {
      n.delete(A.value.name), ye(Date.now());
    };
    return D.addEventListener(I.SET_SCENE, p), D.addEventListener(I.ADD_CAMERA, v), D.addEventListener(I.REMOVE_CAMERA, O), () => {
      D.removeEventListener(I.SET_SCENE, p), D.removeEventListener(I.ADD_CAMERA, v), D.removeEventListener(I.REMOVE_CAMERA, O);
    };
  }, []), Re(() => {
    if (C === null)
      return;
    let p = window.innerWidth, v = window.innerHeight, O = Math.floor(p / 2), A = Math.floor(v / 2), G = -1;
    const H = () => {
      p = window.innerWidth - 300, v = window.innerHeight, O = Math.floor(p / 2), A = Math.floor(v / 2), C.setSize(p, v);
      let k = p, U = v;
      switch ($) {
        case "Side by Side":
          k = O, U = v;
          break;
        case "Stacked":
          k = p, U = A;
          break;
        case "Quad":
          k = O, U = A;
          break;
      }
      n.forEach((re) => {
        re instanceof Gt ? (re.left = k / -2, re.right = k / 2, re.top = U / 2, re.bottom = U / -2, re.updateProjectionMatrix()) : re instanceof Pt && (re.aspect = k / U, re.updateProjectionMatrix(), e.get(re.name)?.update());
      });
    }, se = () => {
      C.setViewport(0, 0, p, v), C.setScissor(0, 0, p, v), C.render(i, V);
    }, z = () => {
      if ($ === "Side by Side")
        C.setViewport(0, 0, O, v), C.setScissor(0, 0, O, v), C.render(i, V), C.setViewport(O, 0, O, v), C.setScissor(O, 0, O, v), C.render(i, le);
      else {
        const k = v - A;
        C.setViewport(0, k, p, A), C.setScissor(0, k, p, A), C.render(i, V), C.setViewport(0, 0, p, A), C.setScissor(0, 0, p, A), C.render(i, le);
      }
    }, J = () => {
      let k = 0, U = 0;
      U = v - A, k = 0, C.setViewport(k, U, O, A), C.setScissor(k, U, O, A), C.render(i, V), k = O, C.setViewport(k, U, O, A), C.setScissor(k, U, O, A), C.render(i, le), U = 0, k = 0, C.setViewport(k, U, O, A), C.setScissor(k, U, O, A), C.render(i, Le), k = O, C.setViewport(k, U, O, A), C.setScissor(k, U, O, A), C.render(i, Fe);
    }, oe = () => {
      switch (a.forEach((k) => {
        k.update();
      }), t.onSceneUpdate !== void 0 && nn && t.onSceneUpdate(Ne), C.clear(), $) {
        case "Single":
          se();
          break;
        case "Side by Side":
        case "Stacked":
          z();
          break;
        case "Quad":
          J();
          break;
      }
      G = requestAnimationFrame(oe);
    };
    return ke(), window.addEventListener("resize", H), H(), oe(), () => {
      window.removeEventListener("resize", H), cancelAnimationFrame(G), G = -1;
    };
  }, [$, C]), Re(() => {
    if (C !== null) {
      const p = new ua(), v = new me(), O = (se, z, J, oe) => {
        switch ($) {
          case "Quad":
            se < J ? z < oe ? p.setFromCamera(v, V) : p.setFromCamera(v, Le) : z < oe ? p.setFromCamera(v, le) : p.setFromCamera(v, Fe);
            break;
          case "Side by Side":
            se < J ? p.setFromCamera(v, V) : p.setFromCamera(v, le);
            break;
          case "Single":
            p.setFromCamera(v, V);
            break;
          case "Stacked":
            z < oe ? p.setFromCamera(v, V) : p.setFromCamera(v, le);
            break;
        }
      }, A = (se) => {
        if (!xt)
          return;
        const z = new me();
        C.getSize(z);
        const J = Math.min(se.clientX, z.x), oe = Math.min(se.clientY, z.y);
        v.x = et(J, 0, z.x, -1, 1), v.y = et(oe, 0, z.y, 1, -1);
        const k = z.x / 2, U = z.y / 2, re = () => {
          J < k ? v.x = et(J, 0, k, -1, 1) : v.x = et(J, k, z.x, -1, 1);
        }, we = () => {
          oe < U ? v.y = et(oe, 0, U, 1, -1) : v.y = et(oe, U, z.y, 1, -1);
        };
        switch ($) {
          case "Quad":
            re(), we();
            break;
          case "Side by Side":
            re();
            break;
          case "Stacked":
            we(), we();
            break;
        }
        O(J, oe, k, U);
        const Te = p.intersectObjects(Ne.children);
        Te.length > 0 && d.position.copy(Te[0].point);
      }, G = (se) => {
        if (!xt)
          return;
        const z = new me();
        if (C.getSize(z), se.clientX >= z.x)
          return;
        A(se);
        const J = p.intersectObjects(Ne.children);
        J.length > 0 && t.three.getObject(J[0].object.uuid);
      }, H = F.current;
      return H.addEventListener("mousemove", A, !1), H.addEventListener("click", G, !1), () => {
        H.removeEventListener("mousemove", A), H.removeEventListener("click", G);
      };
    }
  }, [$, C]);
  const pe = [];
  return n.forEach((p, v) => {
    pe.push(v);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: Y }),
    C !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${$ === "Single" || $ === "Stacked" ? "single" : ""}`, ref: F, children: [
        $ === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(He, { camera: V, options: pe, ref: M, onSelect: (p) => {
          a.get(V.name)?.dispose();
          const v = n.get(p);
          v !== void 0 && (ve(V), V = v, Z(v, M.current));
        } }) }),
        ($ === "Side by Side" || $ === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(He, { camera: V, options: pe, ref: M, onSelect: (p) => {
            a.get(V.name)?.dispose();
            const v = n.get(p);
            v !== void 0 && (ve(V), V = v, Z(v, M.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: le, options: pe, ref: w, onSelect: (p) => {
            a.get(le.name)?.dispose();
            const v = n.get(p);
            v !== void 0 && (ve(le), le = v, Z(v, w.current));
          } })
        ] }),
        $ === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(He, { camera: V, options: pe, ref: M, onSelect: (p) => {
            a.get(V.name)?.dispose();
            const v = n.get(p);
            v !== void 0 && (ve(V), V = v, Z(v, M.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: le, options: pe, ref: w, onSelect: (p) => {
            a.get(le.name)?.dispose();
            const v = n.get(p);
            v !== void 0 && (ve(le), le = v, Z(v, w.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: Le, options: pe, ref: ae, onSelect: (p) => {
            a.get(Le.name)?.dispose();
            const v = n.get(p);
            v !== void 0 && (ve(Le), Le = v, Z(v, ae.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: Fe, options: pe, ref: X, onSelect: (p) => {
            a.get(Fe.name)?.dispose();
            const v = n.get(p);
            v !== void 0 && (ve(Fe), Fe = v, Z(v, X.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          Ct,
          {
            index: P.indexOf($),
            options: P,
            onSelect: (p) => {
              p !== $ && (Ae(), W(p));
            },
            open: Be,
            onToggle: (p) => {
              Me(p), ge && ie(!1), fe && be(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Ct,
          {
            index: R.indexOf(Et),
            options: R,
            onSelect: (p) => {
              if (p !== Et)
                switch (Et = p, Et) {
                  case "Depth":
                    i.overrideMaterial = u;
                    break;
                  case "Normals":
                    i.overrideMaterial = m;
                    break;
                  default:
                  case "Renderer":
                    i.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    i.overrideMaterial = E;
                    break;
                  case "UVs":
                    i.overrideMaterial = b;
                    break;
                }
            },
            open: ge,
            onToggle: (p) => {
              Be && Me(!1), ie(p), fe && be(!1);
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
            onSelect: (p) => {
              xt = p === "Selection Mode", d.visible = xt;
            },
            open: fe,
            onToggle: (p) => {
              Be && Me(!1), ge && ie(!1), be(p);
            }
          }
        )
      ] })
    ] })
  ] });
}
function Ci(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: t.footer })
  ] });
}
export {
  Ft as Accordion,
  fi as Application,
  wt as BaseRemote,
  _n as ChildObject,
  ka as ContainerObject,
  _a as Draggable,
  Ra as DraggableItem,
  Pa as Dropdown,
  Aa as DropdownItem,
  Ci as Editor,
  Ja as Inspector,
  xi as MultiView,
  Rn as NavButton,
  pi as RemoteComponents,
  bi as RemoteController,
  Lt as RemoteTheatre,
  vi as RemoteThree,
  gi as RemoteTweakpane,
  Ei as SceneInspector,
  yi as SidePanel,
  I as ToolEvents,
  dt as capitalize,
  Je as clamp,
  ga as colorToHex,
  D as debugDispatcher,
  ui as defaultTheatreCallback,
  Mn as dispose,
  ya as disposeMaterial,
  hi as disposeTexture,
  di as distance,
  On as hierarchyUUID,
  va as isColor,
  Wt as mix,
  wn as noop,
  Ht as normalize,
  ma as randomID,
  ba as resetThreeObjects,
  ut as round,
  mi as theatreEditorApp,
  Dt as totalThreeObjects
};
