import { EventDispatcher as en, Texture as tn, CubeTexture as kn, RepeatWrapping as Ut, Color as St, FrontSide as jn, BackSide as Dn, DoubleSide as nn, NoBlending as In, NormalBlending as Nn, AdditiveBlending as Ln, SubtractiveBlending as Fn, MultiplyBlending as Bn, CustomBlending as Un, AddEquation as $n, SubtractEquation as zn, ReverseSubtractEquation as Yn, MinEquation as Gn, MaxEquation as Vn, ZeroFactor as an, OneFactor as rn, SrcColorFactor as sn, OneMinusSrcColorFactor as on, SrcAlphaFactor as cn, OneMinusSrcAlphaFactor as ln, DstAlphaFactor as dn, OneMinusDstAlphaFactor as un, DstColorFactor as hn, OneMinusDstColorFactor as fn, SrcAlphaSaturateFactor as Hn, ConstantColorFactor as pn, OneMinusConstantColorFactor as mn, ConstantAlphaFactor as vn, OneMinusConstantAlphaFactor as gn, Matrix4 as Wn, Vector3 as W, Euler as qn, Ray as Kn, Plane as Xn, MathUtils as Zn, MOUSE as Xe, TOUCH as Ze, Quaternion as $t, Spherical as zt, Vector2 as fe, ShaderMaterial as bn, GLSL3 as Jn, Mesh as Qn, PlaneGeometry as ea, Scene as ta, Group as na, AxesHelper as Yt, MeshDepthMaterial as aa, MeshNormalMaterial as ia, MeshBasicMaterial as ra, PerspectiveCamera as Rt, WebGLRenderer as sa, Raycaster as oa, OrthographicCamera as Gt, CameraHelper as ca } from "three";
import { Pane as la } from "tweakpane";
import * as da from "@tweakpane/plugin-essentials";
import yn, { useState as oe, useRef as Re, useEffect as _e, forwardRef as ua, useMemo as Se } from "react";
import { Reorder as En } from "framer-motion";
const Sn = () => {
}, si = () => {
};
function lt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function oi(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function ci(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function ha() {
  return Math.round(Math.random() * 1e6).toString();
}
function fa(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function pa(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), i = (d) => {
    const u = d.toString(16);
    return u.length === 1 ? "0" + u : u;
  }, o = i(n), h = i(a), c = i(e);
  return "#" + o + h + c;
}
function _t(t, n = 1) {
  return Number(t.toFixed(n));
}
let jt = 0;
const ma = () => {
  jt = 0;
}, Cn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${jt}`, jt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    Cn(a);
  });
}, li = (t) => {
  t?.dispose();
}, va = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, xn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : xn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), va(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class di {
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
const P = new en(), k = {
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
class ui extends Ct {
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
        P.dispatchEvent({ type: k.SELECT_DROPDOWN, value: e.data });
        break;
      case "draggableListUpdate":
        P.dispatchEvent({ type: k.DRAG_UPDATE, value: e.data });
        break;
    }
  }
}
class Nt extends Ct {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  studio;
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
    c !== void 0 ? c = o.object(a, { ...e, ...c.value }, { reconfigure: !0 }) : c = o.object(a, e), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, i !== void 0 ? i : Sn);
    const d = c.onValuesChange((u) => {
      if (this.app.editor) {
        for (const b in u) {
          const E = u[b];
          typeof E == "object" && fa(E) && (u[b] = {
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
      const v = this.sheetObjectCBs.get(h);
      v !== void 0 && v(u);
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
        o = i.sheets.get(e.data.sheet), o !== void 0 && (i.activeSheet = o, this.studio.setSelection([o]));
        break;
      case "setSheetObject":
        o = i.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), o !== void 0 && this.studio.setSelection([o]);
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
      this.studio.ui.restore(), this.studio.onSelectionChange((h) => {
        h.length < 1 || h.forEach((c) => {
          let d = c.address.sheetId, u = "setSheet", v = {};
          switch (c.type) {
            case "Theatre_Sheet_PublicAPI":
              u = "setSheet", v = {
                sheet: c.address.sheetId
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              u = "setSheetObject", d += `_${c.address.objectKey}`, v = {
                id: d,
                sheet: c.address.sheetId,
                key: c.address.objectKey
              }, a.activeSheet = a.sheets.get(c.address.sheetId);
              break;
          }
          n.send({ event: u, target: "app", data: v });
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
      }, o = () => {
        i(), requestAnimationFrame(o);
      };
      i(), o();
    } else
      this.studio.ui.hide();
  }
}
function hi(t, n, a) {
  if (t.editor) {
    a.ui.restore(), a.onSelectionChange((h) => {
      h.length < 1 || h.forEach((c) => {
        let d = c.address.sheetId, u = "setSheet", v = {};
        switch (c.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", v = {
              sheet: c.address.sheetId
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", d += `_${c.address.objectKey}`, v = {
              id: d,
              sheet: c.address.sheetId,
              key: c.address.objectKey
            }, n.activeSheet = n.sheets.get(c.address.sheetId);
            break;
        }
        t.send({ event: u, target: "app", data: v });
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
    }, o = () => {
      i(), requestAnimationFrame(o);
    };
    i(), o();
  } else
    a.ui.hide();
}
function ga(t) {
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
function wn(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(wn(a));
  }), n;
}
function ba(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function ya(t) {
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
function Je(t) {
  const n = {};
  for (const a in t) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || ya(a))
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
            if (i instanceof tn) {
              const o = i.source.toJSON();
              n[a] = { src: o.url };
            } else
              i instanceof kn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = ba(n[a]));
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
        i.push(Je(o));
      }), n.material = i;
    } else
      n.material = Je(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((o) => {
        i.push(Je(o));
      }), n.material = i;
    } else
      n.material = Je(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const i = [];
      e.material.forEach((o) => {
        i.push(Je(o));
      }), n.material = i;
    } else
      n.material = Je(e.material);
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
function Ea(t, n) {
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
function Dt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const i = new tn(e);
      i.wrapS = Ut, i.wrapT = Ut, i.needsUpdate = !0, n(i);
    }, e.onerror = a, e.src = t;
  });
}
class fi extends Ct {
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
    ma(), Cn(this.scene);
    const a = wn(this.scene);
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
        P.dispatchEvent({ type: k.GET_OBJECT, value: e.data });
        break;
      case "updateObject":
        P.dispatchEvent({ type: k.UPDATE_OBJECT, value: e.data });
        break;
      case "createTexture":
        P.dispatchEvent({ type: k.CREATE_TEXTURE, value: e.data });
        break;
      case "requestMethod":
        P.dispatchEvent({ type: k.REQUEST_METHOD, value: e.data });
        break;
    }
  }
  handleEditor(n, a, e) {
    switch (e.event) {
      case "setObject":
        P.dispatchEvent({ type: k.SET_OBJECT, value: e.data });
        break;
      case "setScene":
        P.dispatchEvent({ type: k.SET_SCENE, value: e.data });
        break;
      case "addCamera":
        P.dispatchEvent({ type: k.ADD_CAMERA, value: e.data });
        break;
      case "removeCamera":
        P.dispatchEvent({ type: k.REMOVE_CAMERA, value: e.data });
        break;
    }
  }
}
class pi extends Ct {
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
    this.pane = new la({ title: "GUI" }), this.pane.registerPlugin(da);
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
    const o = this.bindID, h = e.onChange !== void 0 ? e.onChange : Sn;
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
var It = { exports: {} }, rt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function Sa() {
  if (Vt)
    return rt;
  Vt = 1;
  var t = yn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(c, d, u) {
    var v, b = {}, E = null, S = null;
    u !== void 0 && (E = "" + u), d.key !== void 0 && (E = "" + d.key), d.ref !== void 0 && (S = d.ref);
    for (v in d)
      e.call(d, v) && !o.hasOwnProperty(v) && (b[v] = d[v]);
    if (c && c.defaultProps)
      for (v in d = c.defaultProps, d)
        b[v] === void 0 && (b[v] = d[v]);
    return { $$typeof: n, type: c, key: E, ref: S, props: b, _owner: i.current };
  }
  return rt.Fragment = a, rt.jsx = h, rt.jsxs = h, rt;
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
var Ht;
function Ca() {
  return Ht || (Ht = 1, process.env.NODE_ENV !== "production" && function() {
    var t = yn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), D = Symbol.iterator, I = "@@iterator";
    function q(r) {
      if (r === null || typeof r != "object")
        return null;
      var f = D && r[D] || r[I];
      return typeof f == "function" ? f : null;
    }
    var B = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function M(r) {
      {
        for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), C = 1; C < f; C++)
          g[C - 1] = arguments[C];
        z("error", r, g);
      }
    }
    function z(r, f, g) {
      {
        var C = B.ReactDebugCurrentFrame, j = C.getStackAddendum();
        j !== "" && (f += "%s", g = g.concat([j]));
        var L = g.map(function(A) {
          return String(A);
        });
        L.unshift("Warning: " + f), Function.prototype.apply.call(console[r], console, L);
      }
    }
    var we = !1, ce = !1, Y = !1, Q = !1, x = !1, Ae;
    Ae = Symbol.for("react.module.reference");
    function Fe(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === e || r === o || x || r === i || r === u || r === v || Q || r === S || we || ce || Y || typeof r == "object" && r !== null && (r.$$typeof === E || r.$$typeof === b || r.$$typeof === h || r.$$typeof === c || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === Ae || r.getModuleId !== void 0));
    }
    function Oe(r, f, g) {
      var C = r.displayName;
      if (C)
        return C;
      var j = f.displayName || f.name || "";
      return j !== "" ? g + "(" + j + ")" : g;
    }
    function me(r) {
      return r.displayName || "Context";
    }
    function te(r) {
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
        case v:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case c:
            var f = r;
            return me(f) + ".Consumer";
          case h:
            var g = r;
            return me(g._context) + ".Provider";
          case d:
            return Oe(r, r.render, "ForwardRef");
          case b:
            var C = r.displayName || null;
            return C !== null ? C : te(r.type) || "Memo";
          case E: {
            var j = r, L = j._payload, A = j._init;
            try {
              return te(A(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ue = Object.assign, ve = 0, ge, K, pe, Pe, ke, he, p;
    function m() {
    }
    m.__reactDisabledLog = !0;
    function w() {
      {
        if (ve === 0) {
          ge = console.log, K = console.info, pe = console.warn, Pe = console.error, ke = console.group, he = console.groupCollapsed, p = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: m,
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
        ve++;
      }
    }
    function R() {
      {
        if (ve--, ve === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ue({}, r, {
              value: ge
            }),
            info: ue({}, r, {
              value: K
            }),
            warn: ue({}, r, {
              value: pe
            }),
            error: ue({}, r, {
              value: Pe
            }),
            group: ue({}, r, {
              value: ke
            }),
            groupCollapsed: ue({}, r, {
              value: he
            }),
            groupEnd: ue({}, r, {
              value: p
            })
          });
        }
        ve < 0 && M("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = B.ReactCurrentDispatcher, V;
    function ae(r, f, g) {
      {
        if (V === void 0)
          try {
            throw Error();
          } catch (j) {
            var C = j.stack.trim().match(/\n( *(at )?)/);
            V = C && C[1] || "";
          }
        return `
` + V + r;
      }
    }
    var U = !1, X;
    {
      var ie = typeof WeakMap == "function" ? WeakMap : Map;
      X = new ie();
    }
    function _(r, f) {
      if (!r || U)
        return "";
      {
        var g = X.get(r);
        if (g !== void 0)
          return g;
      }
      var C;
      U = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = G.current, G.current = null, w();
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
              C = Te;
            }
            Reflect.construct(r, [], A);
          } else {
            try {
              A.call();
            } catch (Te) {
              C = Te;
            }
            r.call(A.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Te) {
            C = Te;
          }
          r();
        }
      } catch (Te) {
        if (Te && C && typeof Te.stack == "string") {
          for (var T = Te.stack.split(`
`), de = C.stack.split(`
`), Z = T.length - 1, J = de.length - 1; Z >= 1 && J >= 0 && T[Z] !== de[J]; )
            J--;
          for (; Z >= 1 && J >= 0; Z--, J--)
            if (T[Z] !== de[J]) {
              if (Z !== 1 || J !== 1)
                do
                  if (Z--, J--, J < 0 || T[Z] !== de[J]) {
                    var Ee = `
` + T[Z].replace(" at new ", " at ");
                    return r.displayName && Ee.includes("<anonymous>") && (Ee = Ee.replace("<anonymous>", r.displayName)), typeof r == "function" && X.set(r, Ee), Ee;
                  }
                while (Z >= 1 && J >= 0);
              break;
            }
        }
      } finally {
        U = !1, G.current = L, R(), Error.prepareStackTrace = j;
      }
      var Ke = r ? r.displayName || r.name : "", Bt = Ke ? ae(Ke) : "";
      return typeof r == "function" && X.set(r, Bt), Bt;
    }
    function F(r, f, g) {
      return _(r, !1);
    }
    function ne(r) {
      var f = r.prototype;
      return !!(f && f.isReactComponent);
    }
    function Ce(r, f, g) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return _(r, ne(r));
      if (typeof r == "string")
        return ae(r);
      switch (r) {
        case u:
          return ae("Suspense");
        case v:
          return ae("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return F(r.render);
          case b:
            return Ce(r.type, f, g);
          case E: {
            var C = r, j = C._payload, L = C._init;
            try {
              return Ce(L(j), f, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Me = Object.prototype.hasOwnProperty, dt = {}, ut = B.ReactDebugCurrentFrame;
    function Be(r) {
      if (r) {
        var f = r._owner, g = Ce(r.type, r._source, f ? f.type : null);
        ut.setExtraStackFrame(g);
      } else
        ut.setExtraStackFrame(null);
    }
    function et(r, f, g, C, j) {
      {
        var L = Function.call.bind(Me);
        for (var A in r)
          if (L(r, A)) {
            var T = void 0;
            try {
              if (typeof r[A] != "function") {
                var de = Error((C || "React class") + ": " + g + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw de.name = "Invariant Violation", de;
              }
              T = r[A](f, A, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              T = Z;
            }
            T && !(T instanceof Error) && (Be(j), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, A, typeof T), Be(null)), T instanceof Error && !(T.message in dt) && (dt[T.message] = !0, Be(j), M("Failed %s type: %s", g, T.message), Be(null));
          }
      }
    }
    var Ue = Array.isArray;
    function tt(r) {
      return Ue(r);
    }
    function xt(r) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, g = f && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g;
      }
    }
    function ht(r) {
      try {
        return ft(r), !1;
      } catch {
        return !0;
      }
    }
    function ft(r) {
      return "" + r;
    }
    function pt(r) {
      if (ht(r))
        return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xt(r)), ft(r);
    }
    var je = B.ReactCurrentOwner, nt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, at, mt, qe;
    qe = {};
    function wt(r) {
      if (Me.call(r, "ref")) {
        var f = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Ot(r) {
      if (Me.call(r, "key")) {
        var f = Object.getOwnPropertyDescriptor(r, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function vt(r, f) {
      if (typeof r.ref == "string" && je.current && f && je.current.stateNode !== f) {
        var g = te(je.current.type);
        qe[g] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(je.current.type), r.ref), qe[g] = !0);
      }
    }
    function De(r, f) {
      {
        var g = function() {
          at || (at = !0, M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Ft(r, f) {
      {
        var g = function() {
          mt || (mt = !0, M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        g.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var s = function(r, f, g, C, j, L, A) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: f,
        ref: g,
        props: A,
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
        value: C
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function y(r, f, g, C, j) {
      {
        var L, A = {}, T = null, de = null;
        g !== void 0 && (pt(g), T = "" + g), Ot(f) && (pt(f.key), T = "" + f.key), wt(f) && (de = f.ref, vt(f, j));
        for (L in f)
          Me.call(f, L) && !nt.hasOwnProperty(L) && (A[L] = f[L]);
        if (r && r.defaultProps) {
          var Z = r.defaultProps;
          for (L in Z)
            A[L] === void 0 && (A[L] = Z[L]);
        }
        if (T || de) {
          var J = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          T && De(A, J), de && Ft(A, J);
        }
        return s(r, T, de, j, C, je.current, A);
      }
    }
    var O = B.ReactCurrentOwner, N = B.ReactDebugCurrentFrame;
    function H(r) {
      if (r) {
        var f = r._owner, g = Ce(r.type, r._source, f ? f.type : null);
        N.setExtraStackFrame(g);
      } else
        N.setExtraStackFrame(null);
    }
    var be;
    be = !1;
    function le(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function Mt() {
      {
        if (O.current) {
          var r = te(O.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Tt(r) {
      {
        if (r !== void 0) {
          var f = r.fileName.replace(/^.*[\\\/]/, ""), g = r.lineNumber;
          return `

Check your code at ` + f + ":" + g + ".";
        }
        return "";
      }
    }
    var it = {};
    function xe(r) {
      {
        var f = Mt();
        if (!f) {
          var g = typeof r == "string" ? r : r.displayName || r.name;
          g && (f = `

Check the top-level render call using <` + g + ">.");
        }
        return f;
      }
    }
    function ye(r, f) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var g = xe(f);
        if (it[g])
          return;
        it[g] = !0;
        var C = "";
        r && r._owner && r._owner !== O.current && (C = " It was passed a child from " + te(r._owner.type) + "."), H(r), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), H(null);
      }
    }
    function $e(r, f) {
      {
        if (typeof r != "object")
          return;
        if (tt(r))
          for (var g = 0; g < r.length; g++) {
            var C = r[g];
            le(C) && ye(C, f);
          }
        else if (le(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var j = q(r);
          if (typeof j == "function" && j !== r.entries)
            for (var L = j.call(r), A; !(A = L.next()).done; )
              le(A.value) && ye(A.value, f);
        }
      }
    }
    function ze(r) {
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
          var C = te(f);
          et(g, r.props, "prop", C, r);
        } else if (f.PropTypes !== void 0 && !be) {
          be = !0;
          var j = te(f);
          M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ye(r) {
      {
        for (var f = Object.keys(r.props), g = 0; g < f.length; g++) {
          var C = f[g];
          if (C !== "children" && C !== "key") {
            H(r), M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), H(null);
            break;
          }
        }
        r.ref !== null && (H(r), M("Invalid attribute `ref` supplied to `React.Fragment`."), H(null));
      }
    }
    function Ge(r, f, g, C, j, L) {
      {
        var A = Fe(r);
        if (!A) {
          var T = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var de = Tt(j);
          de ? T += de : T += Mt();
          var Z;
          r === null ? Z = "null" : tt(r) ? Z = "array" : r !== void 0 && r.$$typeof === n ? (Z = "<" + (te(r.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof r, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, T);
        }
        var J = y(r, f, g, j, L);
        if (J == null)
          return J;
        if (A) {
          var Ee = f.children;
          if (Ee !== void 0)
            if (C)
              if (tt(Ee)) {
                for (var Ke = 0; Ke < Ee.length; Ke++)
                  $e(Ee[Ke], r);
                Object.freeze && Object.freeze(Ee);
              } else
                M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              $e(Ee, r);
        }
        return r === e ? Ye(J) : ze(J), J;
      }
    }
    function Rn(r, f, g) {
      return Ge(r, f, g, !0);
    }
    function _n(r, f, g) {
      return Ge(r, f, g, !1);
    }
    var An = _n, Pn = Rn;
    st.Fragment = e, st.jsx = An, st.jsxs = Pn;
  }()), st;
}
process.env.NODE_ENV === "production" ? It.exports = Sa() : It.exports = Ca();
var l = It.exports;
function On(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const xa = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), wa = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Oa(t) {
  return /* @__PURE__ */ l.jsx(En.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    wa,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: xa })
  ] }) }, t.title);
}
function Ma(t) {
  const [n, a] = oe(!1), [e, i] = oe(t.options), o = (u) => {
    t.onDragComplete(u), i(u);
  }, h = (u) => {
    const v = [...e];
    v.splice(u, 1), o(v);
  }, c = [];
  e.forEach((u, v) => {
    c.push(/* @__PURE__ */ l.jsx(Oa, { index: v, title: u, onDelete: h }, u));
  });
  let d = "dropdown draggable";
  return t.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(On, { title: t.title }),
    /* @__PURE__ */ l.jsx(En.Group, { axis: "y", values: e, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Ta(t) {
  const [n, a] = oe(!1), e = [];
  t.options.map((o, h) => {
    t.onSelect !== void 0 && (o.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(Ra, { option: o }, h));
  });
  let i = "dropdown";
  return t.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(On, { title: t.title }),
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
function Ra(t) {
  const { option: n } = t, [a, e] = oe("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        Ma,
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
        Ta,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: i }, ha());
}
function mi(t, n, a) {
  function e(o) {
    switch (n.forEach((h) => {
      h.callback(t, h.remote, o);
    }), o.event) {
      case "custom":
        P.dispatchEvent({ type: k.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((h) => {
      h.callback(t, h.remote, o);
    }), o.event) {
      case "custom":
        P.dispatchEvent({ type: k.CUSTOM, value: o.data });
        break;
    }
  }
  t.listen = (o) => {
    o.target === "editor" ? i(o) : e(o);
  };
}
function Lt(t) {
  const [n, a] = oe(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
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
          /* @__PURE__ */ l.jsx("p", { className: "label", children: lt(t.label) })
        ]
      }
    ),
    t.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: t.children }) })
  ] });
}
function Mn(t) {
  const [n, a] = oe(!1), e = t.child !== void 0 && t.child.children.length > 0, i = [];
  return t.child !== void 0 && t.child.children.length > 0 && t.child.children.map((o) => {
    i.push(/* @__PURE__ */ l.jsx(Mn, { child: o, three: t.three }, Math.random()));
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
      /* @__PURE__ */ l.jsx("div", { className: `icon ${ga(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: i }) })
  ] }, Math.random()) });
}
function _a(t) {
  const n = [];
  return t.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Mn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const Aa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function Pa(t) {
  return "items" in t;
}
function We(t) {
  const n = [];
  return t.items.forEach((a) => {
    Pa(a) ? n.push(
      /* @__PURE__ */ l.jsx(We, { title: lt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        ct,
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
  }), /* @__PURE__ */ l.jsx(Lt, { label: t.title, open: t.expanded === !0, children: n });
}
function ka(t) {
  return !(t === "alphaHash" || t === "alphaToCoverage" || t === "attenuationDistance" || t === "blendDstAlpha" || t === "colorWrite" || t === "combine" || t === "defaultAttributeValues" || t === "depthFunc" || t === "forceSinglePass" || t === "glslVersion" || t === "linecap" || t === "linejoin" || t === "linewidth" || t === "normalMapType" || t === "precision" || t === "premultipliedAlpha" || t === "shadowSide" || t === "toneMapped" || t === "uniformsGroups" || t === "uniformsNeedUpdate" || t === "userData" || t === "vertexColors" || t === "version" || t === "wireframeLinecap" || t === "wireframeLinejoin" || t === "wireframeLinewidth" || t.slice(0, 4) === "clip" || t.slice(0, 7) === "polygon" || t.slice(0, 7) === "stencil" || t.slice(0, 2) === "is");
}
function Ve(t) {
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
function ja(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function Da() {
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
const Ia = [
  {
    title: "Front",
    value: jn
  },
  {
    title: "Back",
    value: Dn
  },
  {
    title: "Double",
    value: nn
  }
], Na = [
  {
    title: "No Blending",
    value: In
  },
  {
    title: "Normal",
    value: Nn
  },
  {
    title: "Additive",
    value: Ln
  },
  {
    title: "Subtractive",
    value: Fn
  },
  {
    title: "Multiply",
    value: Bn
  },
  {
    title: "Custom",
    value: Un
  }
], La = [
  {
    title: "Add",
    value: $n
  },
  {
    title: "Subtract",
    value: zn
  },
  {
    title: "Reverse Subtract",
    value: Yn
  },
  {
    title: "Min",
    value: Gn
  },
  {
    title: "Max",
    value: Vn
  }
], Fa = [
  {
    title: "Zero",
    valye: an
  },
  {
    title: "One",
    valye: rn
  },
  {
    title: "Src Color",
    valye: sn
  },
  {
    title: "One Minus Src Color",
    valye: on
  },
  {
    title: "Src Alpha",
    valye: cn
  },
  {
    title: "One Minus Src Alpha",
    valye: ln
  },
  {
    title: "Dst Alpha",
    valye: dn
  },
  {
    title: "One Minus Dst Alpha",
    valye: un
  },
  {
    title: "Dst Color",
    valye: hn
  },
  {
    title: "One Minus Dst Color",
    valye: fn
  },
  {
    title: "Src Alpha Saturate",
    valye: Hn
  },
  {
    title: "Constant Color",
    valye: pn
  },
  {
    title: "One Minus Constant Color",
    valye: mn
  },
  {
    title: "Constant Alpha",
    valye: vn
  },
  {
    title: "One Minus Constant Alpha",
    valye: gn
  }
], Ba = [
  {
    title: "Zero",
    valye: an
  },
  {
    title: "One",
    valye: rn
  },
  {
    title: "Src Color",
    valye: sn
  },
  {
    title: "One Minus Src Color",
    valye: on
  },
  {
    title: "Src Alpha",
    valye: cn
  },
  {
    title: "One Minus Src Alpha",
    valye: ln
  },
  {
    title: "Dst Alpha",
    valye: dn
  },
  {
    title: "One Minus Dst Alpha",
    valye: un
  },
  {
    title: "Dst Color",
    valye: hn
  },
  {
    title: "One Minus Dst Color",
    valye: fn
  },
  {
    title: "Constant Color",
    valye: pn
  },
  {
    title: "One Minus Constant Color",
    valye: mn
  },
  {
    title: "Constant Alpha",
    valye: vn
  },
  {
    title: "One Minus Constant Alpha",
    valye: gn
  }
];
function ot(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function Wt(t, n, a) {
  const e = [];
  for (const i in t) {
    if (!ka(i))
      continue;
    const o = typeof t[i], h = t[i];
    if (o === "boolean" || o === "number" || o === "string") {
      const c = {
        title: Ve(i),
        prop: i,
        type: o,
        value: h,
        min: void 0,
        max: void 0,
        needsUpdate: o === "boolean",
        onChange: (u, v) => {
          a.updateObject(n.uuid, `material.${u}`, v), c.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${u}`, v);
        }
      };
      switch (i) {
        case "blending":
          ot(c, Na);
          break;
        case "blendDst":
          ot(c, Ba);
          break;
        case "blendEquation":
          ot(c, La);
          break;
        case "blendSrc":
          ot(c, Fa);
          break;
        case "side":
          ot(c, Ia);
          break;
      }
      ja(i) && (c.value = Number(h), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const d = o === "string" && (i === "vertexShader" || i === "fragmentShader");
      d && (c.disabled = !1, c.latest = c.value, c.onChange = (u, v) => {
        c.latest = v;
      }), e.push(c), d && e.push({
        title: `${lt(i)} - Update`,
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
          title: Ve(i),
          prop: i,
          type: "color",
          value: h,
          onChange: (c, d) => {
            const u = new St(d);
            a.updateObject(n.uuid, `material.${c}`, u);
            const v = a.scene?.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && ee(v, `material.${c}`, u);
          }
        });
      else if (Array.isArray(h)) {
        const c = [];
        for (const d in h)
          c.push({
            title: `${d}`,
            type: `${typeof h[d]}`,
            value: h[d],
            onChange: (u, v) => {
              a.updateObject(n.uuid, `material.${i}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${i}`, v);
            }
          });
        e.push({
          title: Ve(i),
          items: c
        });
      } else {
        const c = [];
        for (const d in h) {
          const u = h[d];
          switch (typeof u) {
            case "boolean":
            case "number":
            case "string":
              d === "src" ? e.push({
                title: Ve(i),
                type: "image",
                value: u,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${i}`, E);
                  const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && Dt(E).then((D) => {
                    ee(S, `material.${i}`, D), ee(S, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${Ve(d)}`,
                prop: `material.${i}.${d}`,
                type: `${typeof t[i][d]}`,
                value: h[d],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${i}.${d}`, E);
                  const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                  S !== void 0 && ee(S, `material.${i}.${d}`, E);
                }
              });
              break;
            case "object":
              if (u.value !== void 0 && u.value.src !== void 0)
                c.push({
                  title: Ve(d),
                  type: "image",
                  value: u.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${i}.${d}.value`, h);
                    const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                    S !== void 0 && Dt(E).then((D) => {
                      ee(S, `material.${i}.${d}.value`, D);
                    });
                  }
                });
              else if (i === "uniforms") {
                const b = u.value, E = (S, D, I) => ({
                  title: S,
                  type: "number",
                  value: I,
                  step: 0.01,
                  onChange: (q, B) => {
                    const M = `material.uniforms.${d}.value.${D}`;
                    a.updateObject(n.uuid, M, B);
                    const z = a.scene?.getObjectByProperty("uuid", n.uuid);
                    z !== void 0 && ee(z, M, B);
                  }
                });
                if (typeof u.value == "number")
                  c.push({
                    title: d,
                    type: "number",
                    value: u.value,
                    onChange: (S, D) => {
                      const I = `material.${i}.${S}.value`;
                      a.updateObject(n.uuid, I, D);
                      const q = a.scene?.getObjectByProperty("uuid", n.uuid);
                      q !== void 0 && ee(q, I, D);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  c.push({
                    title: d,
                    type: "color",
                    value: u.value,
                    onChange: (S, D) => {
                      const I = new St(D), q = `material.${i}.${S}.value`;
                      a.updateObject(n.uuid, q, I);
                      const B = a.scene?.getObjectByProperty("uuid", n.uuid);
                      B !== void 0 && ee(B, q, I);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  c.push(
                    {
                      title: d,
                      items: [
                        E("X", "x", u.value.x),
                        E("Y", "y", u.value.y)
                      ]
                    }
                  );
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
                  const S = b.elements, D = [];
                  for (let I = 0; I < S.length; I++)
                    D.push(E(I.toString(), I.toString(), S[I]));
                  c.push(
                    {
                      title: d,
                      items: D
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
                    const S = a.scene?.getObjectByProperty("uuid", n.uuid);
                    S !== void 0 && ee(S, `material.${i}.${d}.value`, E);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: Ve(i),
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
function Ua(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], i = a.length;
    for (let o = 0; o < i; o++)
      e.push(
        /* @__PURE__ */ l.jsx(
          We,
          {
            title: `Material ${o}`,
            items: Wt(a[o], t, n)
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
        items: Wt(a, t, n)
      }
    );
}
function ct(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = pa(t.value));
  const [a, e] = oe(n), i = Re(null), o = Re(null), h = Re(null);
  _e(() => {
    let v = !1, b = -1, E = 0, S = Number(a);
    const D = (z) => {
      v = !0, E = S, b = z.clientX;
    }, I = (z) => {
      if (!v)
        return;
      const we = t.step !== void 0 ? t.step : 1, ce = (z.clientX - b) * we;
      S = Number((E + ce).toFixed(4)), o.current !== null && (o.current.value = S.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, S);
    }, q = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, M = t.type === "number";
    return M && (i.current?.addEventListener("mousedown", D, !1), document.addEventListener("mouseup", q, !1), document.addEventListener("mousemove", I, !1), document.addEventListener("contextmenu", B, !1)), () => {
      M && (i.current?.removeEventListener("mousedown", D), document.removeEventListener("mouseup", q), document.removeEventListener("mousemove", I), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), d = c || t.type === "image", u = (v) => {
    let b = v.target.value;
    t.type === "boolean" ? b = v.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${d ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: lt(t.title) }, "fieldLabel"),
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
      Da().then((v) => {
        h.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : Aa }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: u, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((v, b) => /* @__PURE__ */ l.jsx("option", { value: v.value, children: lt(v.title) }, b)) }) })
  ] });
}
function qt(t) {
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
function $a(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: qt(e),
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
        title: qt(e),
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
const za = Math.PI / 180, Ya = 180 / Math.PI;
function Qe(t, n, a, e, i) {
  return e + (t - n) * (i - e) / (a - n);
}
function Ga(t) {
  return t * za;
}
function Pt(t) {
  return t * Ya;
}
function Va(t, n) {
  const a = new Wn();
  a.elements = t.matrix;
  const e = new W(), i = new qn(), o = new W();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const h = (d, u) => {
    n.updateObject(t.uuid, d, u);
    const v = n.scene?.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && ee(v, d, u);
  }, c = (d, u) => {
    h(d, Ga(u));
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
          value: _t(Pt(i.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: _t(Pt(i.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: _t(Pt(i.z)),
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
function Kt(t) {
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
function Ha(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const i = t.lightInfo[e];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: Kt(e),
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
        title: Kt(e),
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
function Wa(t, n) {
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
          onChange: (u, v) => {
            c.timeScale = v, n.updateObject(t.uuid, "mixer.timeScale", v);
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
const Tn = {
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
let re = { ...Tn };
function qa(t) {
  const [n, a] = oe(-1);
  _e(() => {
    function h(d) {
      re = { ...d.value }, a(Date.now());
    }
    function c() {
      re = { ...Tn }, a(Date.now());
    }
    return P.addEventListener(k.SET_SCENE, c), P.addEventListener(k.SET_OBJECT, h), () => {
      P.removeEventListener(k.SET_SCENE, c), P.removeEventListener(k.SET_OBJECT, h);
    };
  }, []);
  const e = re.type.toLowerCase(), i = re.animations.length > 0 || re.mixer !== void 0, o = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Lt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: re.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: re.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: re.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: re.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        ct,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: re.visible,
          onChange: (h, c) => {
            t.three.updateObject(re.uuid, h, c);
            const d = t.three.scene?.getObjectByProperty("uuid", re.uuid);
            d !== void 0 && ee(d, h, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      Va(re, t.three),
      i ? Wa(re, t.three) : null,
      e.search("camera") > -1 ? $a(re, t.three) : null,
      e.search("light") > -1 ? Ha(re, t.three) : null,
      o ? Ua(re, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function vi(t) {
  const [n, a] = oe(t.scene);
  _e(() => {
    const o = (h) => {
      a(h.value);
    };
    return P.addEventListener(k.SET_SCENE, o), () => {
      P.removeEventListener(k.SET_SCENE, o);
    };
  }, []);
  const e = n !== null, i = "Hierarchy - " + (e ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(Lt, { label: i, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: e && /* @__PURE__ */ l.jsx(_a, { child: n, three: t.three }) }) }),
    /* @__PURE__ */ l.jsx(qa, { three: t.three })
  ] }, "SidePanel");
}
function gi(t) {
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
    const v = t.three.scene?.getObjectByProperty("uuid", c);
    v !== void 0 && ee(v, d, u);
  }, i = (c) => {
    if (!n())
      return;
    const d = c.value, { key: u, value: v, uuid: b } = d;
    e(b, u, v);
  }, o = (c) => {
    if (!n())
      return;
    const d = c.value;
    Dt(d.value).then((u) => {
      e(d.uuid, d.key, u), e(d.uuid, "material.needsUpdate", !0);
    });
  }, h = (c) => {
    if (!n())
      return;
    const { key: d, uuid: u, value: v, subitem: b } = c.value, E = t.three.scene?.getObjectByProperty("uuid", u);
    if (E !== void 0)
      try {
        b !== void 0 ? Ea(E, b)[d](v) : E[d](v);
      } catch (S) {
        console.log("Error requesting method:"), console.log(S), console.log(d), console.log(v);
      }
  };
  return _e(() => (P.addEventListener(k.GET_OBJECT, a), P.addEventListener(k.UPDATE_OBJECT, i), P.addEventListener(k.CREATE_TEXTURE, o), P.addEventListener(k.REQUEST_METHOD, h), () => {
    P.removeEventListener(k.GET_OBJECT, a), P.removeEventListener(k.UPDATE_OBJECT, i), P.removeEventListener(k.CREATE_TEXTURE, o), P.removeEventListener(k.REQUEST_METHOD, h);
  }), []), null;
}
const Xt = { type: "change" }, kt = { type: "start" }, Zt = { type: "end" }, gt = new Kn(), Jt = new Xn(), Ka = Math.cos(70 * Zn.DEG2RAD);
class Xa extends en {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new W(), this.cursor = new W(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Xe.ROTATE, MIDDLE: Xe.DOLLY, RIGHT: Xe.PAN }, this.touches = { ONE: Ze.ROTATE, TWO: Ze.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(s) {
      s.addEventListener("keydown", nt), this._domElementKeyEvents = s;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", nt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Xt), e.update(), o = i.NONE;
    }, this.update = function() {
      const s = new W(), y = new $t().setFromUnitVectors(n.up, new W(0, 1, 0)), O = y.clone().invert(), N = new W(), H = new $t(), be = new W(), le = 2 * Math.PI;
      return function(Tt = null) {
        const it = e.object.position;
        s.copy(it).sub(e.target), s.applyQuaternion(y), c.setFromVector3(s), e.autoRotate && o === i.NONE && me(Fe(Tt)), e.enableDamping ? (c.theta += d.theta * e.dampingFactor, c.phi += d.phi * e.dampingFactor) : (c.theta += d.theta, c.phi += d.phi);
        let xe = e.minAzimuthAngle, ye = e.maxAzimuthAngle;
        isFinite(xe) && isFinite(ye) && (xe < -Math.PI ? xe += le : xe > Math.PI && (xe -= le), ye < -Math.PI ? ye += le : ye > Math.PI && (ye -= le), xe <= ye ? c.theta = Math.max(xe, Math.min(ye, c.theta)) : c.theta = c.theta > (xe + ye) / 2 ? Math.max(xe, c.theta) : Math.min(ye, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && Y || e.object.isOrthographicCamera ? c.radius = ke(c.radius) : c.radius = ke(c.radius * u), s.setFromSpherical(c), s.applyQuaternion(O), it.copy(e.target).add(s), e.object.lookAt(e.target), e.enableDamping === !0 ? (d.theta *= 1 - e.dampingFactor, d.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (d.set(0, 0, 0), v.set(0, 0, 0));
        let $e = !1;
        if (e.zoomToCursor && Y) {
          let ze = null;
          if (e.object.isPerspectiveCamera) {
            const Ye = s.length();
            ze = ke(Ye * u);
            const Ge = Ye - ze;
            e.object.position.addScaledVector(we, Ge), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const Ye = new W(ce.x, ce.y, 0);
            Ye.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / u)), e.object.updateProjectionMatrix(), $e = !0;
            const Ge = new W(ce.x, ce.y, 0);
            Ge.unproject(e.object), e.object.position.sub(Ge).add(Ye), e.object.updateMatrixWorld(), ze = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          ze !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(ze).add(e.object.position) : (gt.origin.copy(e.object.position), gt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(gt.direction)) < Ka ? n.lookAt(e.target) : (Jt.setFromNormalAndCoplanarPoint(e.object.up, e.target), gt.intersectPlane(Jt, e.target))));
        } else
          e.object.isOrthographicCamera && ($e = u !== 1, $e && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / u)), e.object.updateProjectionMatrix()));
        return u = 1, Y = !1, $e || N.distanceToSquared(e.object.position) > h || 8 * (1 - H.dot(e.object.quaternion)) > h || be.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(Xt), N.copy(e.object.position), H.copy(e.object.quaternion), be.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", qe), e.domElement.removeEventListener("pointerdown", Be), e.domElement.removeEventListener("pointercancel", Ue), e.domElement.removeEventListener("wheel", ht), e.domElement.removeEventListener("pointermove", et), e.domElement.removeEventListener("pointerup", Ue), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", nt), e._domElementKeyEvents = null);
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
    const h = 1e-6, c = new zt(), d = new zt();
    let u = 1;
    const v = new W(), b = new fe(), E = new fe(), S = new fe(), D = new fe(), I = new fe(), q = new fe(), B = new fe(), M = new fe(), z = new fe(), we = new W(), ce = new fe();
    let Y = !1;
    const Q = [], x = {};
    let Ae = !1;
    function Fe(s) {
      return s !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Oe(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function me(s) {
      d.theta -= s;
    }
    function te(s) {
      d.phi -= s;
    }
    const ue = function() {
      const s = new W();
      return function(O, N) {
        s.setFromMatrixColumn(N, 0), s.multiplyScalar(-O), v.add(s);
      };
    }(), ve = function() {
      const s = new W();
      return function(O, N) {
        e.screenSpacePanning === !0 ? s.setFromMatrixColumn(N, 1) : (s.setFromMatrixColumn(N, 0), s.crossVectors(e.object.up, s)), s.multiplyScalar(O), v.add(s);
      };
    }(), ge = function() {
      const s = new W();
      return function(O, N) {
        const H = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const be = e.object.position;
          s.copy(be).sub(e.target);
          let le = s.length();
          le *= Math.tan(e.object.fov / 2 * Math.PI / 180), ue(2 * O * le / H.clientHeight, e.object.matrix), ve(2 * N * le / H.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (ue(O * (e.object.right - e.object.left) / e.object.zoom / H.clientWidth, e.object.matrix), ve(N * (e.object.top - e.object.bottom) / e.object.zoom / H.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function K(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? u /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function pe(s) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? u *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function Pe(s, y) {
      if (!e.zoomToCursor)
        return;
      Y = !0;
      const O = e.domElement.getBoundingClientRect(), N = s - O.left, H = y - O.top, be = O.width, le = O.height;
      ce.x = N / be * 2 - 1, ce.y = -(H / le) * 2 + 1, we.set(ce.x, ce.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function ke(s) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, s));
    }
    function he(s) {
      b.set(s.clientX, s.clientY);
    }
    function p(s) {
      Pe(s.clientX, s.clientX), B.set(s.clientX, s.clientY);
    }
    function m(s) {
      D.set(s.clientX, s.clientY);
    }
    function w(s) {
      E.set(s.clientX, s.clientY), S.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      me(2 * Math.PI * S.x / y.clientHeight), te(2 * Math.PI * S.y / y.clientHeight), b.copy(E), e.update();
    }
    function R(s) {
      M.set(s.clientX, s.clientY), z.subVectors(M, B), z.y > 0 ? K(Oe(z.y)) : z.y < 0 && pe(Oe(z.y)), B.copy(M), e.update();
    }
    function G(s) {
      I.set(s.clientX, s.clientY), q.subVectors(I, D).multiplyScalar(e.panSpeed), ge(q.x, q.y), D.copy(I), e.update();
    }
    function V(s) {
      Pe(s.clientX, s.clientY), s.deltaY < 0 ? pe(Oe(s.deltaY)) : s.deltaY > 0 && K(Oe(s.deltaY)), e.update();
    }
    function ae(s) {
      let y = !1;
      switch (s.code) {
        case e.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? te(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? te(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          s.ctrlKey || s.metaKey || s.shiftKey ? me(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          s.ctrlKey || s.metaKey || s.shiftKey ? me(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : ge(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (s.preventDefault(), e.update());
    }
    function U(s) {
      if (Q.length === 1)
        b.set(s.pageX, s.pageY);
      else {
        const y = De(s), O = 0.5 * (s.pageX + y.x), N = 0.5 * (s.pageY + y.y);
        b.set(O, N);
      }
    }
    function X(s) {
      if (Q.length === 1)
        D.set(s.pageX, s.pageY);
      else {
        const y = De(s), O = 0.5 * (s.pageX + y.x), N = 0.5 * (s.pageY + y.y);
        D.set(O, N);
      }
    }
    function ie(s) {
      const y = De(s), O = s.pageX - y.x, N = s.pageY - y.y, H = Math.sqrt(O * O + N * N);
      B.set(0, H);
    }
    function _(s) {
      e.enableZoom && ie(s), e.enablePan && X(s);
    }
    function F(s) {
      e.enableZoom && ie(s), e.enableRotate && U(s);
    }
    function ne(s) {
      if (Q.length == 1)
        E.set(s.pageX, s.pageY);
      else {
        const O = De(s), N = 0.5 * (s.pageX + O.x), H = 0.5 * (s.pageY + O.y);
        E.set(N, H);
      }
      S.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      me(2 * Math.PI * S.x / y.clientHeight), te(2 * Math.PI * S.y / y.clientHeight), b.copy(E);
    }
    function Ce(s) {
      if (Q.length === 1)
        I.set(s.pageX, s.pageY);
      else {
        const y = De(s), O = 0.5 * (s.pageX + y.x), N = 0.5 * (s.pageY + y.y);
        I.set(O, N);
      }
      q.subVectors(I, D).multiplyScalar(e.panSpeed), ge(q.x, q.y), D.copy(I);
    }
    function Me(s) {
      const y = De(s), O = s.pageX - y.x, N = s.pageY - y.y, H = Math.sqrt(O * O + N * N);
      M.set(0, H), z.set(0, Math.pow(M.y / B.y, e.zoomSpeed)), K(z.y), B.copy(M);
      const be = (s.pageX + y.x) * 0.5, le = (s.pageY + y.y) * 0.5;
      Pe(be, le);
    }
    function dt(s) {
      e.enableZoom && Me(s), e.enablePan && Ce(s);
    }
    function ut(s) {
      e.enableZoom && Me(s), e.enableRotate && ne(s);
    }
    function Be(s) {
      e.enabled !== !1 && (Q.length === 0 && (e.domElement.setPointerCapture(s.pointerId), e.domElement.addEventListener("pointermove", et), e.domElement.addEventListener("pointerup", Ue)), wt(s), s.pointerType === "touch" ? at(s) : tt(s));
    }
    function et(s) {
      e.enabled !== !1 && (s.pointerType === "touch" ? mt(s) : xt(s));
    }
    function Ue(s) {
      switch (Ot(s), Q.length) {
        case 0:
          e.domElement.releasePointerCapture(s.pointerId), e.domElement.removeEventListener("pointermove", et), e.domElement.removeEventListener("pointerup", Ue), e.dispatchEvent(Zt), o = i.NONE;
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
            m(s), o = i.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            he(s), o = i.ROTATE;
          }
          break;
        case Xe.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (e.enableRotate === !1)
              return;
            he(s), o = i.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            m(s), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && e.dispatchEvent(kt);
    }
    function xt(s) {
      switch (o) {
        case i.ROTATE:
          if (e.enableRotate === !1)
            return;
          w(s);
          break;
        case i.DOLLY:
          if (e.enableZoom === !1)
            return;
          R(s);
          break;
        case i.PAN:
          if (e.enablePan === !1)
            return;
          G(s);
          break;
      }
    }
    function ht(s) {
      e.enabled === !1 || e.enableZoom === !1 || o !== i.NONE || (s.preventDefault(), e.dispatchEvent(kt), V(ft(s)), e.dispatchEvent(Zt));
    }
    function ft(s) {
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
    function pt(s) {
      s.key === "Control" && (Ae = !0, e.domElement.getRootNode().addEventListener("keyup", je, { passive: !0, capture: !0 }));
    }
    function je(s) {
      s.key === "Control" && (Ae = !1, e.domElement.getRootNode().removeEventListener("keyup", je, { passive: !0, capture: !0 }));
    }
    function nt(s) {
      e.enabled === !1 || e.enablePan === !1 || ae(s);
    }
    function at(s) {
      switch (vt(s), Q.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ze.ROTATE:
              if (e.enableRotate === !1)
                return;
              U(s), o = i.TOUCH_ROTATE;
              break;
            case Ze.PAN:
              if (e.enablePan === !1)
                return;
              X(s), o = i.TOUCH_PAN;
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
              _(s), o = i.TOUCH_DOLLY_PAN;
              break;
            case Ze.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              F(s), o = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = i.NONE;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && e.dispatchEvent(kt);
    }
    function mt(s) {
      switch (vt(s), o) {
        case i.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          ne(s), e.update();
          break;
        case i.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Ce(s), e.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          dt(s), e.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          ut(s), e.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function qe(s) {
      e.enabled !== !1 && s.preventDefault();
    }
    function wt(s) {
      Q.push(s.pointerId);
    }
    function Ot(s) {
      delete x[s.pointerId];
      for (let y = 0; y < Q.length; y++)
        if (Q[y] == s.pointerId) {
          Q.splice(y, 1);
          return;
        }
    }
    function vt(s) {
      let y = x[s.pointerId];
      y === void 0 && (y = new fe(), x[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function De(s) {
      const y = s.pointerId === Q[0] ? Q[1] : Q[0];
      return x[y];
    }
    e.domElement.addEventListener("contextmenu", qe), e.domElement.addEventListener("pointerdown", Be), e.domElement.addEventListener("pointercancel", Ue), e.domElement.addEventListener("wheel", ht, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", pt, { passive: !0, capture: !0 }), this.update();
  }
}
const Et = (t) => {
  const [n, a] = oe(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, i = (o) => {
    o !== n && (t.onSelect(o), a(o)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, He = ua(function(n, a) {
  const [e, i] = oe(!1), o = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Et,
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
class Za extends bn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: Jn,
      side: nn,
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
class Ja extends Qn {
  gridMaterial;
  constructor() {
    const n = new Za();
    super(new ea(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Qa = `#include <common>
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
}`, ei = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ti extends bn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Qa,
      fragmentShader: ei
    });
  }
}
let bt = "Renderer", Ie, yt = !1, Qt = !1, $, se, Ne, Le;
function bi(t) {
  const n = Se(() => /* @__PURE__ */ new Map(), []), a = Se(() => /* @__PURE__ */ new Map(), []), e = Se(() => /* @__PURE__ */ new Map(), []), i = Se(() => new ta(), []), o = Se(() => new na(), []), h = Se(() => new Ja(), []), c = Se(() => new Yt(500), []), d = Se(() => new Yt(100), []), u = Se(() => new aa(), []), v = Se(() => new ia(), []), b = Se(() => new ti(), []), E = Se(() => new ra({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function S(p, m) {
    const w = new Gt(-100, 100, 100, -100, 50, 3e3);
    return w.name = p, w.position.copy(m), w.lookAt(0, 0, 0), n.set(p, w), w;
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
  _e(() => {
    i.name = "Debug Scene", o.name = "helpers", i.add(o), o.add(h), c.name = "axisHelper", o.add(c), d.name = "interactionHelper", o.add(d), d.visible = !1, S("Top", new W(0, 1e3, 0)), S("Bottom", new W(0, -1e3, 0)), S("Left", new W(-1e3, 0, 0)), S("Right", new W(1e3, 0, 0)), S("Front", new W(0, 0, 1e3)), S("Back", new W(0, 0, -1e3)), S("Orthographic", new W(1e3, 1e3, 1e3));
    const p = new Rt(60, 1, 50, 3e3);
    p.name = "Debug", p.position.set(500, 500, 500), p.lookAt(0, 0, 0), n.set("Debug", p), $ = n.get("Debug"), se = n.get("Orthographic"), Ne = n.get("Front"), Le = n.get("Top");
  }, []);
  const q = Re(null), B = Re(null), M = Re(null), z = Re(null), we = Re(null), ce = Re(null), [Y, Q] = oe(t.mode !== void 0 ? t.mode : "Single"), [x, Ae] = oe(null), [Fe, Oe] = oe(!1), [me, te] = oe(!1), [ue, ve] = oe(!1), [, ge] = oe(Date.now()), K = (p, m) => {
    const w = a.get(p.name);
    w !== void 0 && w.dispose(), a.delete(p.name);
    const R = e.get(p.name);
    R !== void 0 && (i.remove(R), R.dispose()), e.delete(p.name);
    const G = new Xa(p, m);
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
    if (a.set(p.name, G), p instanceof Rt) {
      const V = new ca(p);
      e.set(p.name, V), i.add(V);
    }
  }, pe = (p) => {
    const m = e.get(p.name);
    m !== void 0 && (i.remove(m), m.dispose(), e.delete(p.name));
    const w = a.get(p.name);
    w !== void 0 && (w.dispose(), a.delete(p.name));
  }, Pe = () => {
    a.forEach((p, m) => {
      p.dispose();
      const w = e.get(m);
      w !== void 0 && (i.remove(w), w.dispose()), e.delete(m), a.delete(m);
    }), a.clear(), e.clear();
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
        K($, M.current), K(se, z.current), K(Ne, we.current), K(Le, ce.current);
        break;
    }
  };
  _e(() => {
    const p = new sa({
      canvas: q.current,
      stencil: !1
    });
    p.autoClear = !1, p.shadowMap.enabled = !0, p.setPixelRatio(devicePixelRatio), p.setClearColor(0), t.three.renderer = p, Ae(p);
  }, []), _e(() => {
    const p = (R) => {
      xn(Ie), i.remove(Ie);
      const G = t.scenes.get(R.value.name);
      if (G !== void 0) {
        const V = new G();
        t.onSceneSet !== void 0 && t.onSceneSet(V), Ie = V, t.three.scene = Ie, i.add(Ie), Qt = !0;
      }
    }, m = (R) => {
      const G = R.value, V = t.three.scene?.getObjectByProperty("uuid", G.uuid);
      V !== void 0 && n.set(G.name, V), ge(Date.now());
    }, w = (R) => {
      n.delete(R.value.name), ge(Date.now());
    };
    return P.addEventListener(k.SET_SCENE, p), P.addEventListener(k.ADD_CAMERA, m), P.addEventListener(k.REMOVE_CAMERA, w), () => {
      P.removeEventListener(k.SET_SCENE, p), P.removeEventListener(k.ADD_CAMERA, m), P.removeEventListener(k.REMOVE_CAMERA, w);
    };
  }, []), _e(() => {
    if (x === null)
      return;
    let p = window.innerWidth, m = window.innerHeight, w = Math.floor(p / 2), R = Math.floor(m / 2), G = -1;
    const V = () => {
      p = window.innerWidth - 300, m = window.innerHeight, w = Math.floor(p / 2), R = Math.floor(m / 2), x.setSize(p, m);
      let _ = p, F = m;
      switch (Y) {
        case "Side by Side":
          _ = w, F = m;
          break;
        case "Stacked":
          _ = p, F = R;
          break;
        case "Quad":
          _ = w, F = R;
          break;
      }
      n.forEach((ne) => {
        ne instanceof Gt ? (ne.left = _ / -2, ne.right = _ / 2, ne.top = F / 2, ne.bottom = F / -2, ne.updateProjectionMatrix()) : ne instanceof Rt && (ne.aspect = _ / F, ne.updateProjectionMatrix(), e.get(ne.name)?.update());
      });
    }, ae = () => {
      x.setViewport(0, 0, p, m), x.setScissor(0, 0, p, m), x.render(i, $);
    }, U = () => {
      if (Y === "Side by Side")
        x.setViewport(0, 0, w, m), x.setScissor(0, 0, w, m), x.render(i, $), x.setViewport(w, 0, w, m), x.setScissor(w, 0, w, m), x.render(i, se);
      else {
        const _ = m - R;
        x.setViewport(0, _, p, R), x.setScissor(0, _, p, R), x.render(i, $), x.setViewport(0, 0, p, R), x.setScissor(0, 0, p, R), x.render(i, se);
      }
    }, X = () => {
      let _ = 0, F = 0;
      F = m - R, _ = 0, x.setViewport(_, F, w, R), x.setScissor(_, F, w, R), x.render(i, $), _ = w, x.setViewport(_, F, w, R), x.setScissor(_, F, w, R), x.render(i, se), F = 0, _ = 0, x.setViewport(_, F, w, R), x.setScissor(_, F, w, R), x.render(i, Ne), _ = w, x.setViewport(_, F, w, R), x.setScissor(_, F, w, R), x.render(i, Le);
    }, ie = () => {
      switch (a.forEach((_) => {
        _.update();
      }), t.onSceneUpdate !== void 0 && Qt && t.onSceneUpdate(Ie), x.clear(), Y) {
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
  }, [Y, x]), _e(() => {
    if (x !== null) {
      const p = new oa(), m = new fe(), w = (ae, U, X, ie) => {
        switch (Y) {
          case "Quad":
            ae < X ? U < ie ? p.setFromCamera(m, $) : p.setFromCamera(m, Ne) : U < ie ? p.setFromCamera(m, se) : p.setFromCamera(m, Le);
            break;
          case "Side by Side":
            ae < X ? p.setFromCamera(m, $) : p.setFromCamera(m, se);
            break;
          case "Single":
            p.setFromCamera(m, $);
            break;
          case "Stacked":
            U < ie ? p.setFromCamera(m, $) : p.setFromCamera(m, se);
            break;
        }
      }, R = (ae) => {
        if (!yt)
          return;
        const U = new fe();
        x.getSize(U);
        const X = Math.min(ae.clientX, U.x), ie = Math.min(ae.clientY, U.y);
        m.x = Qe(X, 0, U.x, -1, 1), m.y = Qe(ie, 0, U.y, 1, -1);
        const _ = U.x / 2, F = U.y / 2, ne = () => {
          X < _ ? m.x = Qe(X, 0, _, -1, 1) : m.x = Qe(X, _, U.x, -1, 1);
        }, Ce = () => {
          ie < F ? m.y = Qe(ie, 0, F, 1, -1) : m.y = Qe(ie, F, U.y, 1, -1);
        };
        switch (Y) {
          case "Quad":
            ne(), Ce();
            break;
          case "Side by Side":
            ne();
            break;
          case "Stacked":
            Ce(), Ce();
            break;
        }
        w(X, ie, _, F);
        const Me = p.intersectObjects(Ie.children);
        Me.length > 0 && d.position.copy(Me[0].point);
      }, G = (ae) => {
        if (!yt)
          return;
        const U = new fe();
        if (x.getSize(U), ae.clientX >= U.x)
          return;
        R(ae);
        const X = p.intersectObjects(Ie.children);
        X.length > 0 && t.three.getObject(X[0].object.uuid);
      }, V = B.current;
      return V.addEventListener("mousemove", R, !1), V.addEventListener("click", G, !1), () => {
        V.removeEventListener("mousemove", R), V.removeEventListener("click", G);
      };
    }
  }, [Y, x]);
  const he = [];
  return n.forEach((p, m) => {
    he.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: q }),
    x !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${Y === "Single" || Y === "Stacked" ? "single" : ""}`, ref: B, children: [
        Y === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(He, { camera: $, options: he, ref: M, onSelect: (p) => {
          a.get($.name)?.dispose();
          const m = n.get(p);
          m !== void 0 && (pe($), $ = m, K(m, M.current));
        } }) }),
        (Y === "Side by Side" || Y === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(He, { camera: $, options: he, ref: M, onSelect: (p) => {
            a.get($.name)?.dispose();
            const m = n.get(p);
            m !== void 0 && (pe($), $ = m, K(m, M.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: se, options: he, ref: z, onSelect: (p) => {
            a.get(se.name)?.dispose();
            const m = n.get(p);
            m !== void 0 && (pe(se), se = m, K(m, z.current));
          } })
        ] }),
        Y === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(He, { camera: $, options: he, ref: M, onSelect: (p) => {
            a.get($.name)?.dispose();
            const m = n.get(p);
            m !== void 0 && (pe($), $ = m, K(m, M.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: se, options: he, ref: z, onSelect: (p) => {
            a.get(se.name)?.dispose();
            const m = n.get(p);
            m !== void 0 && (pe(se), se = m, K(m, z.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: Ne, options: he, ref: we, onSelect: (p) => {
            a.get(Ne.name)?.dispose();
            const m = n.get(p);
            m !== void 0 && (pe(Ne), Ne = m, K(m, we.current));
          } }),
          /* @__PURE__ */ l.jsx(He, { camera: Le, options: he, ref: ce, onSelect: (p) => {
            a.get(Le.name)?.dispose();
            const m = n.get(p);
            m !== void 0 && (pe(Le), Le = m, K(m, ce.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          Et,
          {
            index: I.indexOf(Y),
            options: I,
            onSelect: (p) => {
              p !== Y && (Pe(), Q(p));
            },
            open: Fe,
            onToggle: (p) => {
              Oe(p), me && te(!1), ue && ve(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Et,
          {
            index: D.indexOf(bt),
            options: D,
            onSelect: (p) => {
              if (p !== bt)
                switch (bt = p, bt) {
                  case "Depth":
                    i.overrideMaterial = u;
                    break;
                  case "Normals":
                    i.overrideMaterial = v;
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
            open: me,
            onToggle: (p) => {
              Fe && Oe(!1), te(p), ue && ve(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Et,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (p) => {
              yt = p === "Selection Mode", d.visible = yt;
            },
            open: ue,
            onToggle: (p) => {
              Fe && Oe(!1), me && te(!1), ve(p);
            }
          }
        )
      ] })
    ] })
  ] });
}
function yi(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: t.footer })
  ] });
}
export {
  Lt as Accordion,
  di as Application,
  Ct as BaseRemote,
  Mn as ChildObject,
  _a as ContainerObject,
  Ma as Draggable,
  Oa as DraggableItem,
  Ta as Dropdown,
  Ra as DropdownItem,
  yi as Editor,
  qa as Inspector,
  bi as MultiView,
  On as NavButton,
  ui as RemoteComponents,
  mi as RemoteController,
  Nt as RemoteTheatre,
  fi as RemoteThree,
  pi as RemoteTweakpane,
  gi as SceneInspector,
  vi as SidePanel,
  k as ToolEvents,
  lt as capitalize,
  oi as clamp,
  pa as colorToHex,
  P as debugDispatcher,
  si as defaultTheatreCallback,
  xn as dispose,
  va as disposeMaterial,
  li as disposeTexture,
  ci as distance,
  Cn as hierarchyUUID,
  fa as isColor,
  Sn as noop,
  ha as randomID,
  ma as resetThreeObjects,
  _t as round,
  hi as theatreEditorApp,
  jt as totalThreeObjects
};
