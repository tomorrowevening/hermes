import { PositionalAudio as Hn, EventDispatcher as un, Texture as dn, CubeTexture as Wn, RepeatWrapping as Kt, ShaderMaterial as fn, GLSL3 as qn, DoubleSide as hn, Color as Tt, Mesh as Kn, PlaneGeometry as Xn, FrontSide as Zn, BackSide as Jn, NoBlending as Qn, NormalBlending as ea, AdditiveBlending as ta, SubtractiveBlending as na, MultiplyBlending as aa, CustomBlending as ia, AddEquation as ra, SubtractEquation as oa, ReverseSubtractEquation as sa, MinEquation as ca, MaxEquation as la, ZeroFactor as pn, OneFactor as mn, SrcColorFactor as vn, OneMinusSrcColorFactor as gn, SrcAlphaFactor as bn, OneMinusSrcAlphaFactor as yn, DstAlphaFactor as En, OneMinusDstAlphaFactor as Cn, DstColorFactor as xn, OneMinusDstColorFactor as Sn, SrcAlphaSaturateFactor as ua, ConstantColorFactor as wn, OneMinusConstantColorFactor as On, ConstantAlphaFactor as Mn, OneMinusConstantAlphaFactor as Tn, Matrix4 as da, Vector3 as X, Euler as fa, Ray as ha, Plane as pa, MathUtils as ma, MOUSE as He, TOUCH as We, Quaternion as Xt, Spherical as Zt, Vector2 as ue, PerspectiveCamera as zt, MeshDepthMaterial as va, MeshNormalMaterial as ga, MeshBasicMaterial as ba, OrthographicCamera as Rn, Scene as Pn, Group as ya, AxesHelper as An, WebGLRenderer as Ea, Raycaster as Ca, CameraHelper as xa } from "three";
import { getProject as Sa, createRafDriver as wa } from "@theatre/core";
import ct from "@theatre/studio";
import { Pane as Oa } from "tweakpane";
import * as Ma from "@tweakpane/plugin-essentials";
import kn, { useState as oe, useRef as ye, useEffect as Be, Component as Ta, forwardRef as Ra } from "react";
import { Reorder as _n } from "framer-motion";
function lt(t) {
  return t.substring(0, 1).toUpperCase() + t.substring(1);
}
function $i(t, n, a) {
  return Math.min(n, Math.max(t, a));
}
function zi(t, n) {
  const a = t - n;
  return Math.sqrt(a * a);
}
function Pa() {
  return Math.round(Math.random() * 1e6).toString();
}
function Aa(t) {
  return t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
}
function ka(t) {
  const n = Math.round(t.r * 255), a = Math.round(t.g * 255), e = Math.round(t.b * 255), o = (u) => {
    const d = u.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, s = o(n), p = o(a), c = o(e);
  return "#" + s + p + c;
}
function Ft(t, n = 1) {
  return Number(t.toFixed(n));
}
let Yt = 0;
const _a = () => {
  Yt = 0;
}, jn = (t) => {
  if (!t)
    return;
  let n = t.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Yt}`, Yt++), t.parent !== null && (n = `${t.parent.uuid}.${n}`), t.uuid = n, t.children.forEach((a) => {
    jn(a);
  });
}, Yi = (t) => {
  t?.dispose();
}, ja = (t) => {
  t && (Array.isArray(t) ? t.forEach((n) => n.dispose()) : t.dispose());
}, Dn = (t) => {
  if (t) {
    for (; t.children.length > 0; ) {
      const n = t.children[0];
      n instanceof Hn ? (n.pause(), n.parent && n.parent.remove(n)) : Dn(n);
    }
    if (t.parent && t.parent.remove(t), t.isMesh) {
      const n = t;
      n.geometry?.dispose(), ja(n.material);
    }
    t.dispose !== void 0 && t.dispose();
  }
};
class Gi {
  components = /* @__PURE__ */ new Map();
  listen;
  // Protected
  _debugEnabled;
  broadcastChannel = void 0;
  webSocket = void 0;
  _mode = "app";
  _connected = !1;
  useBC = !1;
  constructor(n, a, e = !0, o = "editor") {
    this.editor = a && document.location.hash.search(o) > -1, this._debugEnabled = a, a && (this.useBC = e, e ? (this.broadcastChannel = new BroadcastChannel(n), this.broadcastChannel.addEventListener("message", this.messageHandler)) : (this.webSocket = new WebSocket(n), this.webSocket.addEventListener("open", this.openHandler), this.webSocket.addEventListener("close", this.closeHandler), this.webSocket.addEventListener("message", this.messageHandler)));
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
    this._mode !== n.target && (this.useBC ? this.broadcastChannel?.postMessage(n) : this._connected && this.webSocket?.send(JSON.stringify(n)));
  }
  messageHandler = (n) => {
    this.listen !== void 0 && (this.useBC ? this.listen(n.data) : this.listen(JSON.parse(n.data)));
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
    n && (this._mode = "editor", document.title += " - Editor");
  }
}
const _ = new un(), j = {
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
class Rt {
  app;
  constructor(n) {
    this.app = n;
  }
  dispose() {
  }
}
class Da extends Rt {
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
function Ia(t, n) {
  switch (n.event) {
    case "selectComponent":
      _.dispatchEvent({ type: j.SELECT_DROPDOWN, value: n.data });
      break;
    case "draggableListUpdate":
      _.dispatchEvent({ type: j.DRAG_UPDATE, value: n.data });
      break;
  }
}
const In = () => {
};
class Oe extends Rt {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  static rafDriver = null;
  init(n, a) {
    return this.project = Sa(n, a), this.project.ready;
  }
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
  sheetObject(n, a, e, o) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const s = this.sheet(n);
    if (s === void 0)
      return;
    const p = `${n}_${a}`;
    let c = this.sheetObjects.get(p);
    c !== void 0 ? c = s.object(a, { ...e, ...c.value }, { reconfigure: !0 }) : c = s.object(a, e), this.sheetObjects.set(p, c), this.sheetObjectCBs.set(p, o !== void 0 ? o : In);
    const u = c.onValuesChange((d) => {
      if (this.app.editor) {
        for (const b in d) {
          const E = d[b];
          typeof E == "object" && Aa(E) && (d[b] = {
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
    return this.sheetObjectUnsubscribe.set(p, u), c;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, e = n.address.objectKey;
    this.sheets.get(a)?.detachObject(e);
    const s = `${a}_${e}`, p = this.sheetObjectUnsubscribe.get(s);
    p !== void 0 && (this.sheetObjects.delete(s), this.sheetObjectCBs.delete(s), this.sheetObjectUnsubscribe.delete(s), p());
  }
  static getRafDriver() {
    return Oe.rafDriver || (Oe.rafDriver = wa()), Oe.rafDriver;
  }
}
let we;
function La(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Oe) {
      let e;
      const o = a;
      switch (n.event) {
        case "setSheet":
          e = o.sheets.get(n.data.sheet), e !== void 0 && (we = e, ct.setSelection([e]));
          break;
        case "setSheetObject":
          e = o.sheetObjects.get(`${n.data.sheet}_${n.data.key}`), e !== void 0 && ct.setSelection([e]);
          break;
        case "updateSheetObject":
          e = o.sheets.get(n.data.sheet), e !== void 0 && e.sequence.pause(), e = o.sheetObjectCBs.get(n.data.sheetObject), e !== void 0 && e(n.data.values);
          break;
        case "updateTimeline":
          e = o.sheets.get(n.data.sheet), we !== void 0 && (we.sequence.position = n.data.position);
          break;
      }
    }
  });
}
function Na(t) {
  if (t.editor) {
    let n;
    t.components.forEach((s) => {
      s instanceof Oe && (n = s);
    }), ct.ui.restore(), ct.onSelectionChange((s) => {
      s.length < 1 || s.forEach((p) => {
        let c = p.address.sheetId, u = "setSheet", d = {};
        switch (p.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", d = {
              sheet: p.address.sheetId
            }, we = n.sheets.get(p.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", c += `_${p.address.objectKey}`, d = {
              id: c,
              sheet: p.address.sheetId,
              key: p.address.objectKey
            };
            break;
        }
        t.send({ event: u, target: "app", data: d });
      });
    });
    let a = 0;
    const e = () => {
      if (we !== void 0 && a !== we.sequence.position) {
        a = we.sequence.position;
        const s = we;
        t.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: a,
            sheet: s.address.sheetId
          }
        });
      }
    }, o = () => {
      e(), requestAnimationFrame(o);
    };
    e(), o();
  } else
    ct.ui.hide();
}
function Fa(t, n) {
  t.editor && t.components.forEach((a) => {
    if (a instanceof Oe) {
      const e = a;
      switch (n.event) {
        case "playSheet":
          e.sheet(n.data.sheet)?.sequence.play(n.data.value);
          break;
        case "pauseSheet":
          e.sheet(n.data.sheet)?.sequence.pause();
          break;
      }
      return;
    }
  });
}
function Ba(t) {
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
function Ln(t) {
  const n = {
    name: t.name,
    type: t.type,
    uuid: t.uuid,
    children: []
  };
  return t.children.forEach((a) => {
    n.children.push(Ln(a));
  }), n;
}
function Ua(t) {
  const n = {};
  for (const a in t) {
    const e = t[a].value;
    n[a] = { value: e }, e === null ? n[a].value = { src: "" } : e.isTexture && (n[a].value = { src: e.image.src });
  }
  return n;
}
function $a(t) {
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
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || $a(a))
      continue;
    const e = typeof t[a], o = t[a];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        n[a] = o;
        break;
      case "object":
        if (o !== null)
          if (n[a] = o, o.isTexture)
            if (o instanceof dn) {
              const s = o.source.toJSON();
              n[a] = { src: s.url };
            } else
              o instanceof Wn && (console.log("env map"), console.log(o.source.data), console.log(o.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Ua(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function Bt(t) {
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
      const o = [];
      e.material.forEach((s) => {
        o.push(qe(s));
      }), n.material = o;
    } else
      n.material = qe(e.material);
  } else if (a.search("points") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((s) => {
        o.push(qe(s));
      }), n.material = o;
    } else
      n.material = qe(e.material);
  } else if (a.search("line") > -1) {
    const e = t;
    if (Array.isArray(e.material)) {
      const o = [];
      e.material.forEach((s) => {
        o.push(qe(s));
      }), n.material = o;
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
function za(t, n) {
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
function Gt(t) {
  return new Promise((n, a) => {
    const e = new Image();
    e.onload = () => {
      const o = new dn(e);
      o.wrapS = Kt, o.wrapT = Kt, o.needsUpdate = !0, n(o);
    }, e.onerror = a, e.src = t;
  });
}
class Ya extends Rt {
  scene = void 0;
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = Bt(n);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: a
    });
  }
  requestMethod(n, a, e, o) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: n,
        key: a,
        value: e,
        subitem: o
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
    _a(), jn(this.scene);
    const a = Ln(this.scene);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Bt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Bt(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
}
function Ga(t, n) {
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
function Va(t, n) {
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
class Nn extends Rt {
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
  bind(n, a, e, o = void 0) {
    const s = this.bindID, p = e.onChange !== void 0 ? e.onChange : In;
    this.bindCBs.set(s, p), this.app.editor ? (this.pane === void 0 && this.createGUI(), (o !== void 0 ? o : this.pane).addBinding(n, a, e).on("change", (u) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: s,
          value: u.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: s,
        name: a,
        params: e,
        parent: o
      }
    }), this.appCallbacks++);
  }
  triggerBind(n, a) {
    const e = this.bindCBs.get(n);
    e !== void 0 ? e(a) : console.warn(`No callback for: ${n}`, a);
  }
  // Buttons
  button(n, a, e = void 0) {
    const o = this.bindID;
    this.buttonCBs.set(o, a), this.app.editor ? (this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addButton({ title: n }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: o
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: o,
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
}
function Ha(t, n) {
  t.components.forEach((a) => {
    if (a instanceof Nn) {
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
var Vt = { exports: {} }, it = {};
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
function Wa() {
  if (Jt)
    return it;
  Jt = 1;
  var t = kn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(c, u, d) {
    var v, b = {}, E = null, x = null;
    d !== void 0 && (E = "" + d), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (x = u.ref);
    for (v in u)
      e.call(u, v) && !s.hasOwnProperty(v) && (b[v] = u[v]);
    if (c && c.defaultProps)
      for (v in u = c.defaultProps, u)
        b[v] === void 0 && (b[v] = u[v]);
    return { $$typeof: n, type: c, key: E, ref: x, props: b, _owner: o.current };
  }
  return it.Fragment = a, it.jsx = p, it.jsxs = p, it;
}
var rt = {};
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
function qa() {
  return Qt || (Qt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = kn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), M = Symbol.iterator, k = "@@iterator";
    function H(i) {
      if (i === null || typeof i != "object")
        return null;
      var h = M && i[M] || i[k];
      return typeof h == "function" ? h : null;
    }
    var B = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(i) {
      {
        for (var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), C = 1; C < h; C++)
          g[C - 1] = arguments[C];
        z("error", i, g);
      }
    }
    function z(i, h, g) {
      {
        var C = B.ReactDebugCurrentFrame, D = C.getStackAddendum();
        D !== "" && (h += "%s", g = g.concat([D]));
        var F = g.map(function(A) {
          return String(A);
        });
        F.unshift("Warning: " + h), Function.prototype.apply.call(console[i], console, F);
      }
    }
    var Ee = !1, le = !1, se = !1, f = !1, m = !1, w;
    w = Symbol.for("react.module.reference");
    function P(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === e || i === s || m || i === o || i === d || i === v || f || i === x || Ee || le || se || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === b || i.$$typeof === p || i.$$typeof === c || i.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === w || i.getModuleId !== void 0));
    }
    function Y(i, h, g) {
      var C = i.displayName;
      if (C)
        return C;
      var D = h.displayName || h.name || "";
      return D !== "" ? g + "(" + D + ")" : g;
    }
    function U(i) {
      return i.displayName || "Context";
    }
    function $(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case o:
          return "StrictMode";
        case d:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case c:
            var h = i;
            return U(h) + ".Consumer";
          case p:
            var g = i;
            return U(g._context) + ".Provider";
          case u:
            return Y(i, i.render, "ForwardRef");
          case b:
            var C = i.displayName || null;
            return C !== null ? C : $(i.type) || "Memo";
          case E: {
            var D = i, F = D._payload, A = D._init;
            try {
              return $(A(F));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, W = 0, q, T, N, J, me, Ce, ft;
    function Xe() {
    }
    Xe.__reactDisabledLog = !0;
    function At() {
      {
        if (W === 0) {
          q = console.log, T = console.info, N = console.warn, J = console.error, me = console.group, Ce = console.groupCollapsed, ft = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Xe,
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
        W++;
      }
    }
    function kt() {
      {
        if (W--, W === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, i, {
              value: q
            }),
            info: I({}, i, {
              value: T
            }),
            warn: I({}, i, {
              value: N
            }),
            error: I({}, i, {
              value: J
            }),
            group: I({}, i, {
              value: me
            }),
            groupCollapsed: I({}, i, {
              value: Ce
            }),
            groupEnd: I({}, i, {
              value: ft
            })
          });
        }
        W < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ze = B.ReactCurrentDispatcher, Je;
    function ze(i, h, g) {
      {
        if (Je === void 0)
          try {
            throw Error();
          } catch (D) {
            var C = D.stack.trim().match(/\n( *(at )?)/);
            Je = C && C[1] || "";
          }
        return `
` + Je + i;
      }
    }
    var Ye = !1, Me;
    {
      var ht = typeof WeakMap == "function" ? WeakMap : Map;
      Me = new ht();
    }
    function pt(i, h) {
      if (!i || Ye)
        return "";
      {
        var g = Me.get(i);
        if (g !== void 0)
          return g;
      }
      var C;
      Ye = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = Ze.current, Ze.current = null, At();
      try {
        if (h) {
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
            } catch (ve) {
              C = ve;
            }
            Reflect.construct(i, [], A);
          } else {
            try {
              A.call();
            } catch (ve) {
              C = ve;
            }
            i.call(A.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ve) {
            C = ve;
          }
          i();
        }
      } catch (ve) {
        if (ve && C && typeof ve.stack == "string") {
          for (var R = ve.stack.split(`
`), ce = C.stack.split(`
`), Z = R.length - 1, Q = ce.length - 1; Z >= 1 && Q >= 0 && R[Z] !== ce[Q]; )
            Q--;
          for (; Z >= 1 && Q >= 0; Z--, Q--)
            if (R[Z] !== ce[Q]) {
              if (Z !== 1 || Q !== 1)
                do
                  if (Z--, Q--, Q < 0 || R[Z] !== ce[Q]) {
                    var he = `
` + R[Z].replace(" at new ", " at ");
                    return i.displayName && he.includes("<anonymous>") && (he = he.replace("<anonymous>", i.displayName)), typeof i == "function" && Me.set(i, he), he;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        Ye = !1, Ze.current = F, kt(), Error.prepareStackTrace = D;
      }
      var Ve = i ? i.displayName || i.name : "", qt = Ve ? ze(Ve) : "";
      return typeof i == "function" && Me.set(i, qt), qt;
    }
    function _t(i, h, g) {
      return pt(i, !1);
    }
    function mt(i) {
      var h = i.prototype;
      return !!(h && h.isReactComponent);
    }
    function Te(i, h, g) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return pt(i, mt(i));
      if (typeof i == "string")
        return ze(i);
      switch (i) {
        case d:
          return ze("Suspense");
        case v:
          return ze("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case u:
            return _t(i.render);
          case b:
            return Te(i.type, h, g);
          case E: {
            var C = i, D = C._payload, F = C._init;
            try {
              return Te(F(D), h, g);
            } catch {
            }
          }
        }
      return "";
    }
    var Re = Object.prototype.hasOwnProperty, vt = {}, gt = B.ReactDebugCurrentFrame;
    function Pe(i) {
      if (i) {
        var h = i._owner, g = Te(i.type, i._source, h ? h.type : null);
        gt.setExtraStackFrame(g);
      } else
        gt.setExtraStackFrame(null);
    }
    function Qe(i, h, g, C, D) {
      {
        var F = Function.call.bind(Re);
        for (var A in i)
          if (F(i, A)) {
            var R = void 0;
            try {
              if (typeof i[A] != "function") {
                var ce = Error((C || "React class") + ": " + g + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ce.name = "Invariant Violation", ce;
              }
              R = i[A](h, A, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              R = Z;
            }
            R && !(R instanceof Error) && (Pe(D), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, A, typeof R), Pe(null)), R instanceof Error && !(R.message in vt) && (vt[R.message] = !0, Pe(D), S("Failed %s type: %s", g, R.message), Pe(null));
          }
      }
    }
    var Ae = Array.isArray;
    function et(i) {
      return Ae(i);
    }
    function jt(i) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, g = h && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return g;
      }
    }
    function bt(i) {
      try {
        return yt(i), !1;
      } catch {
        return !0;
      }
    }
    function yt(i) {
      return "" + i;
    }
    function Et(i) {
      if (bt(i))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jt(i)), yt(i);
    }
    var xe = B.ReactCurrentOwner, tt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, nt, Ct, Ge;
    Ge = {};
    function Dt(i) {
      if (Re.call(i, "ref")) {
        var h = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function It(i) {
      if (Re.call(i, "key")) {
        var h = Object.getOwnPropertyDescriptor(i, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function xt(i, h) {
      if (typeof i.ref == "string" && xe.current && h && xe.current.stateNode !== h) {
        var g = $(xe.current.type);
        Ge[g] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(xe.current.type), i.ref), Ge[g] = !0);
      }
    }
    function Se(i, h) {
      {
        var g = function() {
          nt || (nt = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function Wt(i, h) {
      {
        var g = function() {
          Ct || (Ct = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        g.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var r = function(i, h, g, C, D, F, A) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: i,
        key: h,
        ref: g,
        props: A,
        // Record the component responsible for creating this element.
        _owner: F
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
        value: D
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function y(i, h, g, C, D) {
      {
        var F, A = {}, R = null, ce = null;
        g !== void 0 && (Et(g), R = "" + g), It(h) && (Et(h.key), R = "" + h.key), Dt(h) && (ce = h.ref, xt(h, D));
        for (F in h)
          Re.call(h, F) && !tt.hasOwnProperty(F) && (A[F] = h[F]);
        if (i && i.defaultProps) {
          var Z = i.defaultProps;
          for (F in Z)
            A[F] === void 0 && (A[F] = Z[F]);
        }
        if (R || ce) {
          var Q = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          R && Se(A, Q), ce && Wt(A, Q);
        }
        return r(i, R, ce, D, C, xe.current, A);
      }
    }
    var O = B.ReactCurrentOwner, L = B.ReactDebugCurrentFrame;
    function K(i) {
      if (i) {
        var h = i._owner, g = Te(i.type, i._source, h ? h.type : null);
        L.setExtraStackFrame(g);
      } else
        L.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function ae(i) {
      return typeof i == "object" && i !== null && i.$$typeof === n;
    }
    function Lt() {
      {
        if (O.current) {
          var i = $(O.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Nt(i) {
      {
        if (i !== void 0) {
          var h = i.fileName.replace(/^.*[\\\/]/, ""), g = i.lineNumber;
          return `

Check your code at ` + h + ":" + g + ".";
        }
        return "";
      }
    }
    var at = {};
    function pe(i) {
      {
        var h = Lt();
        if (!h) {
          var g = typeof i == "string" ? i : i.displayName || i.name;
          g && (h = `

Check the top-level render call using <` + g + ">.");
        }
        return h;
      }
    }
    function fe(i, h) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var g = pe(h);
        if (at[g])
          return;
        at[g] = !0;
        var C = "";
        i && i._owner && i._owner !== O.current && (C = " It was passed a child from " + $(i._owner.type) + "."), K(i), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), K(null);
      }
    }
    function ke(i, h) {
      {
        if (typeof i != "object")
          return;
        if (et(i))
          for (var g = 0; g < i.length; g++) {
            var C = i[g];
            ae(C) && fe(C, h);
          }
        else if (ae(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var D = H(i);
          if (typeof D == "function" && D !== i.entries)
            for (var F = D.call(i), A; !(A = F.next()).done; )
              ae(A.value) && fe(A.value, h);
        }
      }
    }
    function _e(i) {
      {
        var h = i.type;
        if (h == null || typeof h == "string")
          return;
        var g;
        if (typeof h == "function")
          g = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === b))
          g = h.propTypes;
        else
          return;
        if (g) {
          var C = $(h);
          Qe(g, i.props, "prop", C, i);
        } else if (h.PropTypes !== void 0 && !de) {
          de = !0;
          var D = $(h);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function je(i) {
      {
        for (var h = Object.keys(i.props), g = 0; g < h.length; g++) {
          var C = h[g];
          if (C !== "children" && C !== "key") {
            K(i), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), K(null);
            break;
          }
        }
        i.ref !== null && (K(i), S("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function De(i, h, g, C, D, F) {
      {
        var A = P(i);
        if (!A) {
          var R = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ce = Nt(D);
          ce ? R += ce : R += Lt();
          var Z;
          i === null ? Z = "null" : et(i) ? Z = "array" : i !== void 0 && i.$$typeof === n ? (Z = "<" + ($(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof i, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
        }
        var Q = y(i, h, g, D, F);
        if (Q == null)
          return Q;
        if (A) {
          var he = h.children;
          if (he !== void 0)
            if (C)
              if (et(he)) {
                for (var Ve = 0; Ve < he.length; Ve++)
                  ke(he[Ve], i);
                Object.freeze && Object.freeze(he);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(he, i);
        }
        return i === e ? je(Q) : _e(Q), Q;
      }
    }
    function zn(i, h, g) {
      return De(i, h, g, !0);
    }
    function Yn(i, h, g) {
      return De(i, h, g, !1);
    }
    var Gn = Yn, Vn = zn;
    rt.Fragment = e, rt.jsx = Gn, rt.jsxs = Vn;
  }()), rt;
}
process.env.NODE_ENV === "production" ? Vt.exports = Wa() : Vt.exports = qa();
var l = Vt.exports;
function Fn(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ l.jsx("button", { children: t.title });
}
const Ka = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Xa = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Za(t) {
  return /* @__PURE__ */ l.jsx(_n.Item, { value: t.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Xa,
    /* @__PURE__ */ l.jsx("span", { children: t.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      t.onDelete(t.index);
    }, children: Ka })
  ] }) }, t.title);
}
function Ja(t) {
  const [n, a] = oe(!1), [e, o] = oe(t.options), s = (d) => {
    t.onDragComplete(d), o(d);
  }, p = (d) => {
    const v = [...e];
    v.splice(d, 1), s(v);
  }, c = [];
  e.forEach((d, v) => {
    c.push(/* @__PURE__ */ l.jsx(Za, { index: v, title: d, onDelete: p }, d));
  });
  let u = "dropdown draggable";
  return t.subdropdown && (u += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: u, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Fn, { title: t.title }),
    /* @__PURE__ */ l.jsx(_n.Group, { axis: "y", values: e, onReorder: s, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Qa(t) {
  const [n, a] = oe(!1), e = [];
  t.options.map((s, p) => {
    t.onSelect !== void 0 && (s.onSelect = t.onSelect), e.push(/* @__PURE__ */ l.jsx(ei, { option: s }, p));
  });
  let o = "dropdown";
  return t.subdropdown && (o += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: o,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Fn, { title: t.title }),
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
function ei(t) {
  const { option: n } = t, [a, e] = oe("");
  let o;
  switch (n.type) {
    case "draggable":
      o = /* @__PURE__ */ l.jsx(
        Ja,
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
      o = /* @__PURE__ */ l.jsx(
        Qa,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      o = /* @__PURE__ */ l.jsx(
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: o }, Pa());
}
function Vi(t) {
  const n = [], a = [];
  t.components.forEach((s) => {
    s instanceof Da ? n.push(Ia) : s instanceof Oe ? (n.push(La), a.push(Fa), Na(t)) : s instanceof Ya ? (n.push(Ga), a.push(Va)) : s instanceof Nn && n.push(Ha);
  });
  function e(s) {
    switch (n.forEach((p) => p(t, s)), s.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: s.data });
        break;
    }
  }
  function o(s) {
    switch (a.forEach((p) => p(t, s)), s.event) {
      case "custom":
        _.dispatchEvent({ type: j.CUSTOM, value: s.data });
        break;
    }
  }
  t.listen = (s) => {
    s.target === "editor" ? o(s) : e(s);
  };
}
const ti = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, ni = `out vec4 fragColor;
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
class ai extends fn {
  constructor(n) {
    super({
      extensions: {
        derivatives: !0
      },
      glslVersion: qn,
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
          value: n?.color !== void 0 ? n?.color : new Tt(16777215)
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
      vertexShader: ti,
      fragmentShader: ni,
      name: "InfiniteGrid",
      depthWrite: !1
    });
  }
}
class ii extends Kn {
  gridMaterial;
  constructor() {
    const n = new ai();
    super(new Xn(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ri = `#include <common>
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
class si extends fn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ri,
      fragmentShader: oi
    });
  }
}
function Ht(t) {
  const [n, a] = oe(t.open !== void 0 ? t.open : !0), e = !n || t.children === void 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const o = !n;
          t.onToggle !== void 0 && t.onToggle(o), a(o);
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
function Bn(t) {
  const [n, a] = oe(!1), e = t.child.children.length > 0, o = [];
  return t.child.children.length > 0 && t.child.children.map((s) => {
    o.push(/* @__PURE__ */ l.jsx(Bn, { child: s, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
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
            t.three.getObject(t.child.uuid), n || a(!0);
          },
          children: t.child.name.length > 0 ? `${t.child.name} (${t.child.type})` : `${t.child.type}::${t.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Ba(t.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random());
}
function ci(t) {
  const n = [];
  return t.child.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Bn, { child: a, three: t.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${t.class !== void 0 ? t.class : ""}`, children: n });
}
const li = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVRoge2Y0Q6EIAwE6cX//+X6cCFpSMEKVTdk501OpRNKiyelFC0b8Ps6gCwoggZF0KAIGhRBgyJoUAQNiqCxjciR9SLV//eZiAyvK3U8i/QVaQO2YyLSFVvlkdTKDjJCukh2ykR5ZEW+kHmlatl90RaBtDkK/w7CYhuRUEO0ee3l+J3m55Vm+17vtwjTnV1V3QA8qfbeUXCzRWDpiLLS+OyzvRW7IzW9R+okvclsqR09743bo0yUpc1+lSJvNsa002+Euk9GKzV7SmZDRIMiaFAEDYqgQRE0KIIGRdCgCBoUQeMEMERadX7YUz8AAAAASUVORK5CYII=";
function ui(t) {
  return "items" in t;
}
function Ue(t) {
  const n = [];
  return t.items.forEach((a) => {
    ui(a) ? n.push(
      /* @__PURE__ */ l.jsx(Ue, { title: lt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        st,
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
          onChange: (e, o) => {
            a.onChange !== void 0 && a.onChange(e, o);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(Ht, { label: t.title, open: t.expanded === !0, children: n });
}
function di(t) {
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
function fi(t) {
  return t.toLowerCase().search("intensity") > -1 || t === "anisotropyRotation" || t === "blendAlpha" || t === "bumpScale" || t === "clearcoatRoughness" || t === "displacementBias" || t === "displacementScale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionRatio" || t === "roughness" || t === "sheenRoughness" || t === "thickness";
}
function hi() {
  const t = document.createElement("input");
  return t.type = "file", new Promise((n, a) => {
    t.addEventListener("change", function() {
      if (t.files === null)
        a();
      else {
        const e = t.files[0], o = new FileReader();
        o.onload = function(s) {
          n(s.target.result);
        }, o.readAsDataURL(e);
      }
    }), t.click();
  });
}
const pi = [
  {
    title: "Front",
    value: Zn
  },
  {
    title: "Back",
    value: Jn
  },
  {
    title: "Double",
    value: hn
  }
], mi = [
  {
    title: "No Blending",
    value: Qn
  },
  {
    title: "Normal",
    value: ea
  },
  {
    title: "Additive",
    value: ta
  },
  {
    title: "Subtractive",
    value: na
  },
  {
    title: "Multiply",
    value: aa
  },
  {
    title: "Custom",
    value: ia
  }
], vi = [
  {
    title: "Add",
    value: ra
  },
  {
    title: "Subtract",
    value: oa
  },
  {
    title: "Reverse Subtract",
    value: sa
  },
  {
    title: "Min",
    value: ca
  },
  {
    title: "Max",
    value: la
  }
], gi = [
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
    valye: vn
  },
  {
    title: "One Minus Src Color",
    valye: gn
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
    valye: En
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
  },
  {
    title: "Dst Color",
    valye: xn
  },
  {
    title: "One Minus Dst Color",
    valye: Sn
  },
  {
    title: "Src Alpha Saturate",
    valye: ua
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
    valye: Tn
  }
], bi = [
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
    valye: vn
  },
  {
    title: "One Minus Src Color",
    valye: gn
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
    valye: En
  },
  {
    title: "One Minus Dst Alpha",
    valye: Cn
  },
  {
    title: "Dst Color",
    valye: xn
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
    valye: Tn
  }
];
function ot(t, n) {
  t.needsUpdate = !0, t.type = "option", t.options = n;
}
function en(t, n, a) {
  const e = [];
  for (const o in t) {
    if (!di(o))
      continue;
    const s = typeof t[o], p = t[o];
    if (s === "boolean" || s === "number" || s === "string") {
      const c = {
        title: Ie(o),
        prop: o,
        type: s,
        value: p,
        min: void 0,
        max: void 0,
        needsUpdate: s === "boolean",
        onChange: (d, v) => {
          a.updateObject(n.uuid, `material.${d}`, v), c.needsUpdate && a.updateObject(n.uuid, "material.needsUpdate", !0);
          const b = a.scene?.getObjectByProperty("uuid", n.uuid);
          b !== void 0 && ee(b, `material.${d}`, v);
        }
      };
      switch (o) {
        case "blending":
          ot(c, mi);
          break;
        case "blendDst":
          ot(c, bi);
          break;
        case "blendEquation":
          ot(c, vi);
          break;
        case "blendSrc":
          ot(c, gi);
          break;
        case "side":
          ot(c, pi);
          break;
      }
      fi(o) && (c.value = Number(p), c.type = "range", c.min = 0, c.max = 1, c.step = 0.01);
      const u = s === "string" && (o === "vertexShader" || o === "fragmentShader");
      u && (c.disabled = !1, c.latest = c.value, c.onChange = (d, v) => {
        c.latest = v;
      }), e.push(c), u && e.push({
        title: `${lt(o)} - Update`,
        type: "button",
        onChange: () => {
          a.updateObject(n.uuid, `material.${o}`, c.latest), a.updateObject(n.uuid, "material.needsUpdate", !0);
          const d = a.scene?.getObjectByProperty("uuid", n.uuid);
          d !== void 0 && (ee(d, `material.${o}`, c.latest), d.material.needsUpdate = !0);
        }
      });
    } else if (s === "object")
      if (p.isColor)
        e.push({
          title: Ie(o),
          prop: o,
          type: "color",
          value: p,
          onChange: (c, u) => {
            const d = new Tt(u);
            a.updateObject(n.uuid, `material.${c}`, d);
            const v = a.scene?.getObjectByProperty("uuid", n.uuid);
            v !== void 0 && ee(v, `material.${c}`, d);
          }
        });
      else if (Array.isArray(p)) {
        const c = [];
        for (const u in p)
          c.push({
            title: `${u}`,
            type: `${typeof p[u]}`,
            value: p[u],
            onChange: (d, v) => {
              a.updateObject(n.uuid, `material.${o}`, v);
              const b = a.scene?.getObjectByProperty("uuid", n.uuid);
              b !== void 0 && ee(b, `material.${o}`, v);
            }
          });
        e.push({
          title: Ie(o),
          items: c
        });
      } else {
        const c = [];
        for (const u in p) {
          const d = p[u];
          switch (typeof d) {
            case "boolean":
            case "number":
            case "string":
              u === "src" ? e.push({
                title: Ie(o),
                type: "image",
                value: d,
                onChange: (b, E) => {
                  a.createTexture(n.uuid, `material.${o}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && Gt(E).then((M) => {
                    ee(x, `material.${o}`, M), ee(x, "material.needsUpdate", !0);
                  });
                }
              }) : c.push({
                title: `${Ie(u)}`,
                prop: `material.${o}.${u}`,
                type: `${typeof t[o][u]}`,
                value: p[u],
                onChange: (b, E) => {
                  a.updateObject(n.uuid, `material.${o}.${u}`, E);
                  const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                  x !== void 0 && ee(x, `material.${o}.${u}`, E);
                }
              });
              break;
            case "object":
              if (d.value !== void 0 && d.value.src !== void 0)
                c.push({
                  title: Ie(u),
                  type: "image",
                  value: d.value.src,
                  onChange: (b, E) => {
                    a.createTexture(n.uuid, `material.${o}.${u}.value`, p);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && Gt(E).then((M) => {
                      ee(x, `material.${o}.${u}.value`, M);
                    });
                  }
                });
              else if (o === "uniforms") {
                const b = d.value, E = (x, M, k) => ({
                  title: x,
                  type: "number",
                  value: k,
                  step: 0.01,
                  onChange: (H, B) => {
                    const S = `material.uniforms.${u}.value.${M}`;
                    a.updateObject(n.uuid, S, B);
                    const z = a.scene?.getObjectByProperty("uuid", n.uuid);
                    z !== void 0 && ee(z, S, B);
                  }
                });
                if (typeof d.value == "number")
                  c.push({
                    title: u,
                    type: "number",
                    value: d.value,
                    onChange: (x, M) => {
                      const k = `material.${o}.${x}.value`;
                      a.updateObject(n.uuid, k, M);
                      const H = a.scene?.getObjectByProperty("uuid", n.uuid);
                      H !== void 0 && ee(H, k, M);
                    }
                  });
                else if (b.r !== void 0 && b.g !== void 0 && b.b !== void 0)
                  c.push({
                    title: u,
                    type: "color",
                    value: d.value,
                    onChange: (x, M) => {
                      const k = new Tt(M), H = `material.${o}.${x}.value`;
                      a.updateObject(n.uuid, H, k);
                      const B = a.scene?.getObjectByProperty("uuid", n.uuid);
                      B !== void 0 && ee(B, H, k);
                    }
                  });
                else if (b.x !== void 0 && b.y !== void 0 && b.z === void 0 && b.w === void 0)
                  c.push(
                    {
                      title: u,
                      items: [
                        E("X", "x", d.value.x),
                        E("Y", "y", d.value.y)
                      ]
                    }
                  );
                else if (b.x !== void 0 && b.y !== void 0 && b.z !== void 0 && b.w === void 0)
                  c.push(
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
                  c.push(
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
                  for (let k = 0; k < x.length; k++)
                    M.push(E(k.toString(), k.toString(), x[k]));
                  c.push(
                    {
                      title: u,
                      items: M
                    }
                  );
                } else
                  console.log(">>> need to add this format:", u, b);
              } else
                c.push({
                  title: u,
                  type: `${typeof d.value}`,
                  value: d.value,
                  onChange: (b, E) => {
                    a.updateObject(n.uuid, `material.${o}.${u}.value`, E);
                    const x = a.scene?.getObjectByProperty("uuid", n.uuid);
                    x !== void 0 && ee(x, `material.${o}.${u}.value`, E);
                  }
                });
              break;
          }
        }
        c.length > 0 && e.push({
          title: Ie(o),
          items: c
        });
      }
    else
      p !== void 0 && console.log("other:", o, s, p);
  }
  return e.sort((o, s) => o.title < s.title ? -1 : o.title > s.title ? 1 : 0), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
    }
  }), e;
}
function yi(t, n) {
  const a = t.material;
  if (Array.isArray(a)) {
    const e = [], o = a.length;
    for (let s = 0; s < o; s++)
      e.push(
        /* @__PURE__ */ l.jsx(
          Ue,
          {
            title: `Material ${s}`,
            items: en(a[s], t, n)
          },
          `Material ${s}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
  } else
    return /* @__PURE__ */ l.jsx(
      Ue,
      {
        title: "Material",
        items: en(a, t, n)
      }
    );
}
function st(t) {
  let n = t.value;
  n !== void 0 && n.isColor !== void 0 && (n = ka(t.value));
  const [a, e] = oe(n), o = ye(null), s = ye(null), p = ye(null);
  Be(() => {
    let v = !1, b = -1, E = 0, x = Number(a);
    const M = (z) => {
      v = !0, E = x, b = z.clientX;
    }, k = (z) => {
      if (!v)
        return;
      const Ee = t.step !== void 0 ? t.step : 1, le = (z.clientX - b) * Ee;
      x = Number((E + le).toFixed(4)), s.current !== null && (s.current.value = x.toString()), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, x);
    }, H = () => {
      v = !1;
    }, B = () => {
      v = !1;
    }, S = t.type === "number";
    return S && (o.current?.addEventListener("mousedown", M, !1), document.addEventListener("mouseup", H, !1), document.addEventListener("mousemove", k, !1), document.addEventListener("contextmenu", B, !1)), () => {
      S && (o.current?.removeEventListener("mousedown", M), document.removeEventListener("mouseup", H), document.removeEventListener("mousemove", k), document.removeEventListener("contextmenu", B));
    };
  }, [a]);
  const c = t.type === "string" && (a.length > 100 || a.search(`
`) > -1), u = c || t.type === "image", d = (v) => {
    let b = v.target.value;
    t.type === "boolean" ? b = v.target.checked : t.type === "option" && (b = t.options[b].value), e(b), t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, b);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${u ? "block" : ""}`, children: [
    t.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: o, children: lt(t.title) }, "fieldLabel"),
    t.type === "string" && !c && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: t.disabled,
        onChange: d,
        value: a
      }
    ),
    t.type === "string" && c && /* @__PURE__ */ l.jsx(
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
    t.type === "image" && /* @__PURE__ */ l.jsx("img", { ref: p, onClick: () => {
      hi().then((v) => {
        p.current.src = v, t.onChange !== void 0 && t.onChange(t.prop !== void 0 ? t.prop : t.title, v);
      });
    }, src: a.length > 0 ? a : li }),
    t.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: d, disabled: t.disabled, defaultValue: t.value, children: t.options?.map((v, b) => /* @__PURE__ */ l.jsx("option", { value: v.value, children: lt(v.title) }, b)) }) })
  ] });
}
function tn(t) {
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
function Ei(t, n) {
  const a = [];
  if (t.perspectiveCameraInfo !== void 0)
    for (const e in t.perspectiveCameraInfo)
      a.push({
        title: tn(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, o, s), p.updateProjectionMatrix());
        }
      });
  else if (t.orthographicCameraInfo !== void 0)
    for (const e in t.orthographicCameraInfo)
      a.push({
        title: tn(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: t.perspectiveCameraInfo[e],
        onChange: (o, s) => {
          n.updateObject(t.uuid, o, s), n.requestMethod(t.uuid, "updateProjectionMatrix");
          const p = n.scene?.getObjectByProperty("uuid", t.uuid);
          p !== void 0 && (ee(p, o, s), p.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Ue,
    {
      title: "Camera",
      items: a
    }
  );
}
const Ci = Math.PI / 180, xi = 180 / Math.PI;
function Ke(t, n, a, e, o) {
  return e + (t - n) * (o - e) / (a - n);
}
function Si(t) {
  return t * Ci;
}
function Ut(t) {
  return t * xi;
}
function wi(t, n) {
  const a = new da();
  a.elements = t.matrix;
  const e = new X(), o = new fa(), s = new X();
  t.uuid.length > 0 && (e.setFromMatrixPosition(a), o.setFromRotationMatrix(a), s.setFromMatrixScale(a));
  const p = (u, d) => {
    n.updateObject(t.uuid, u, d);
    const v = n.scene?.getObjectByProperty("uuid", t.uuid);
    v !== void 0 && ee(v, u, d);
  }, c = (u, d) => {
    p(u, Si(d));
  };
  return /* @__PURE__ */ l.jsx(
    Ue,
    {
      title: "Transform",
      items: [
        {
          title: "Position X",
          prop: "position.x",
          type: "number",
          value: e.x,
          onChange: p
        },
        {
          title: "Position Y",
          prop: "position.y",
          type: "number",
          value: e.y,
          onChange: p
        },
        {
          title: "Position Z",
          prop: "position.z",
          type: "number",
          value: e.z,
          onChange: p
        },
        {
          title: "Rotation X",
          prop: "rotation.x",
          type: "number",
          value: Ft(Ut(o.x)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Y",
          prop: "rotation.y",
          type: "number",
          value: Ft(Ut(o.y)),
          min: -360,
          max: 360,
          step: 0.1,
          onChange: c
        },
        {
          title: "Rotation Z",
          prop: "rotation.z",
          type: "number",
          value: Ft(Ut(o.z)),
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
          onChange: p
        },
        {
          title: "Scale Y",
          prop: "scale.y",
          type: "number",
          value: s.y,
          step: 0.01,
          onChange: p
        },
        {
          title: "Scale Z",
          prop: "scale.z",
          type: "number",
          value: s.z,
          step: 0.01,
          onChange: p
        }
      ]
    }
  );
}
function nn(t) {
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
function Oi(t, n) {
  const a = [];
  if (t.lightInfo !== void 0)
    for (const e in t.lightInfo) {
      const o = t.lightInfo[e];
      o !== void 0 && (o.isColor !== void 0 ? a.push({
        title: nn(e),
        prop: e,
        type: "color",
        value: o,
        onChange: (s, p) => {
          const c = new Tt(p);
          n.updateObject(t.uuid, s, c);
          const u = n.scene?.getObjectByProperty("uuid", t.uuid);
          u !== void 0 && ee(u, s, c);
        }
      }) : a.push({
        title: nn(e),
        prop: e,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (s, p) => {
          n.updateObject(t.uuid, s, p);
          const c = n.scene?.getObjectByProperty("uuid", t.uuid);
          c !== void 0 && ee(c, s, p);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Ue,
    {
      title: "Light",
      items: a
    }
  );
}
function Mi(t, n) {
  const a = [], e = [];
  let o = 0;
  t.animations.forEach((c) => {
    o = Math.max(o, c.duration), c.duration > 0 && e.push({
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
  const s = n.scene?.getObjectByProperty("uuid", t.uuid);
  let p = !1;
  if (s !== void 0) {
    const c = s.mixer;
    if (p = c !== void 0, p) {
      const u = [
        {
          title: "Time Scale",
          type: "range",
          value: c.timeScale,
          step: 0.01,
          min: -1,
          max: 2,
          onChange: (d, v) => {
            c.timeScale = v, n.updateObject(t.uuid, "mixer.timeScale", v);
          }
        }
      ];
      u.push({
        title: "Stop All",
        type: "button",
        onChange: () => {
          c.stopAllAction(), n.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
        }
      }), a.push({
        title: "Mixer",
        items: u
      });
    }
  }
  return /* @__PURE__ */ l.jsx(Ue, { title: "Animation", items: a });
}
const Un = {
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
let te = { ...Un };
function Ti(t) {
  const [n, a] = oe(-1);
  Be(() => {
    function p(u) {
      te = { ...u.value }, a(Date.now());
    }
    function c() {
      te = { ...Un }, a(Date.now());
    }
    return _.addEventListener(j.SET_SCENE, c), _.addEventListener(j.SET_OBJECT, p), () => {
      _.removeEventListener(j.SET_SCENE, c), _.removeEventListener(j.SET_OBJECT, p);
    };
  }, []);
  const e = te.type.toLowerCase(), o = te.animations.length > 0 || te.mixer !== void 0, s = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Ht, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: t.class, children: te.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: te.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: te.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: te.uuid,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        st,
        {
          type: "boolean",
          title: "Visible",
          prop: "visible",
          value: te.visible,
          onChange: (p, c) => {
            t.three.updateObject(te.uuid, p, c);
            const u = t.three.scene?.getObjectByProperty("uuid", te.uuid);
            u !== void 0 && ee(u, p, c);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      wi(te, t.three),
      o ? Mi(te, t.three) : null,
      e.search("camera") > -1 ? Ei(te, t.three) : null,
      e.search("light") > -1 ? Oi(te, t.three) : null,
      s ? yi(te, t.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
class Hi extends Ta {
  three;
  constructor(n) {
    super(n), this.state = {
      scene: n.scene !== void 0 ? n.scene : null
    }, this.three = n.three, _.addEventListener(j.SET_SCENE, this.setScene);
  }
  componentWillUnmount() {
    _.removeEventListener(j.SET_SCENE, this.setScene);
  }
  render() {
    const n = this.componentState.scene !== null, a = "Hierarchy - " + (n ? `${this.componentState.scene?.name}` : "No Scene");
    return /* @__PURE__ */ l.jsx("div", { id: "SidePanel", children: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(Ht, { label: a, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: n && /* @__PURE__ */ l.jsx(ci, { child: this.componentState.scene, three: this.three }) }) }),
      /* @__PURE__ */ l.jsx(Ti, { three: this.three })
    ] }) }, "SidePanel");
  }
  // Private
  setScene = (n) => {
    this.setState(() => ({
      scene: n.value
    }));
  };
  // Getters / Setters
  get componentState() {
    return this.state;
  }
}
function Wi(t) {
  function n() {
    return t.three.scene === void 0 ? (console.log("No scene:", t.three), !1) : !0;
  }
  const a = (c) => {
    if (!n())
      return;
    const u = t.three.scene?.getObjectByProperty("uuid", c.value);
    u !== void 0 && t.three.setObject(u);
  }, e = (c, u, d) => {
    if (!n())
      return;
    const v = t.three.scene?.getObjectByProperty("uuid", c);
    v !== void 0 && ee(v, u, d);
  }, o = (c) => {
    if (!n())
      return;
    const u = c.value, { key: d, value: v, uuid: b } = u;
    e(b, d, v);
  }, s = (c) => {
    if (!n())
      return;
    const u = c.value;
    Gt(u.value).then((d) => {
      e(u.uuid, u.key, d), e(u.uuid, "material.needsUpdate", !0);
    });
  }, p = (c) => {
    if (!n())
      return;
    const { key: u, uuid: d, value: v, subitem: b } = c.value, E = t.three.scene?.getObjectByProperty("uuid", d);
    if (E !== void 0)
      try {
        b !== void 0 ? za(E, b)[u](v) : E[u](v);
      } catch (x) {
        console.log("Error requesting method:"), console.log(x), console.log(u), console.log(v);
      }
  };
  return Be(() => (_.addEventListener(j.GET_OBJECT, a), _.addEventListener(j.UPDATE_OBJECT, o), _.addEventListener(j.CREATE_TEXTURE, s), _.addEventListener(j.REQUEST_METHOD, p), () => {
    _.removeEventListener(j.GET_OBJECT, a), _.removeEventListener(j.UPDATE_OBJECT, o), _.removeEventListener(j.CREATE_TEXTURE, s), _.removeEventListener(j.REQUEST_METHOD, p);
  }), []), null;
}
const an = { type: "change" }, $t = { type: "start" }, rn = { type: "end" }, St = new ha(), on = new pa(), Ri = Math.cos(70 * ma.DEG2RAD);
class Pi extends un {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: He.ROTATE, MIDDLE: He.DOLLY, RIGHT: He.PAN }, this.touches = { ONE: We.ROTATE, TWO: We.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return c.phi;
    }, this.getAzimuthalAngle = function() {
      return c.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(r) {
      r.addEventListener("keydown", tt), this._domElementKeyEvents = r;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", tt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(an), e.update(), s = o.NONE;
    }, this.update = function() {
      const r = new X(), y = new Xt().setFromUnitVectors(n.up, new X(0, 1, 0)), O = y.clone().invert(), L = new X(), K = new Xt(), de = new X(), ae = 2 * Math.PI;
      return function(Nt = null) {
        const at = e.object.position;
        r.copy(at).sub(e.target), r.applyQuaternion(y), c.setFromVector3(r), e.autoRotate && s === o.NONE && U(P(Nt)), e.enableDamping ? (c.theta += u.theta * e.dampingFactor, c.phi += u.phi * e.dampingFactor) : (c.theta += u.theta, c.phi += u.phi);
        let pe = e.minAzimuthAngle, fe = e.maxAzimuthAngle;
        isFinite(pe) && isFinite(fe) && (pe < -Math.PI ? pe += ae : pe > Math.PI && (pe -= ae), fe < -Math.PI ? fe += ae : fe > Math.PI && (fe -= ae), pe <= fe ? c.theta = Math.max(pe, Math.min(fe, c.theta)) : c.theta = c.theta > (pe + fe) / 2 ? Math.max(pe, c.theta) : Math.min(fe, c.theta)), c.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, c.phi)), c.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(v, e.dampingFactor) : e.target.add(v), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor), e.zoomToCursor && se || e.object.isOrthographicCamera ? c.radius = me(c.radius) : c.radius = me(c.radius * d), r.setFromSpherical(c), r.applyQuaternion(O), at.copy(e.target).add(r), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, v.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), v.set(0, 0, 0));
        let ke = !1;
        if (e.zoomToCursor && se) {
          let _e = null;
          if (e.object.isPerspectiveCamera) {
            const je = r.length();
            _e = me(je * d);
            const De = je - _e;
            e.object.position.addScaledVector(Ee, De), e.object.updateMatrixWorld();
          } else if (e.object.isOrthographicCamera) {
            const je = new X(le.x, le.y, 0);
            je.unproject(e.object), e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix(), ke = !0;
            const De = new X(le.x, le.y, 0);
            De.unproject(e.object), e.object.position.sub(De).add(je), e.object.updateMatrixWorld(), _e = r.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          _e !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(_e).add(e.object.position) : (St.origin.copy(e.object.position), St.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(St.direction)) < Ri ? n.lookAt(e.target) : (on.setFromNormalAndCoplanarPoint(e.object.up, e.target), St.intersectPlane(on, e.target))));
        } else
          e.object.isOrthographicCamera && (ke = d !== 1, ke && (e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / d)), e.object.updateProjectionMatrix()));
        return d = 1, se = !1, ke || L.distanceToSquared(e.object.position) > p || 8 * (1 - K.dot(e.object.quaternion)) > p || de.distanceToSquared(e.target) > 0 ? (e.dispatchEvent(an), L.copy(e.object.position), K.copy(e.object.quaternion), de.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", Ge), e.domElement.removeEventListener("pointerdown", Pe), e.domElement.removeEventListener("pointercancel", Ae), e.domElement.removeEventListener("wheel", bt), e.domElement.removeEventListener("pointermove", Qe), e.domElement.removeEventListener("pointerup", Ae), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", tt), e._domElementKeyEvents = null);
    };
    const e = this, o = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let s = o.NONE;
    const p = 1e-6, c = new Zt(), u = new Zt();
    let d = 1;
    const v = new X(), b = new ue(), E = new ue(), x = new ue(), M = new ue(), k = new ue(), H = new ue(), B = new ue(), S = new ue(), z = new ue(), Ee = new X(), le = new ue();
    let se = !1;
    const f = [], m = {};
    let w = !1;
    function P(r) {
      return r !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * r : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Y(r) {
      const y = Math.abs(r * 0.01);
      return Math.pow(0.95, e.zoomSpeed * y);
    }
    function U(r) {
      u.theta -= r;
    }
    function $(r) {
      u.phi -= r;
    }
    const I = function() {
      const r = new X();
      return function(O, L) {
        r.setFromMatrixColumn(L, 0), r.multiplyScalar(-O), v.add(r);
      };
    }(), W = function() {
      const r = new X();
      return function(O, L) {
        e.screenSpacePanning === !0 ? r.setFromMatrixColumn(L, 1) : (r.setFromMatrixColumn(L, 0), r.crossVectors(e.object.up, r)), r.multiplyScalar(O), v.add(r);
      };
    }(), q = function() {
      const r = new X();
      return function(O, L) {
        const K = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const de = e.object.position;
          r.copy(de).sub(e.target);
          let ae = r.length();
          ae *= Math.tan(e.object.fov / 2 * Math.PI / 180), I(2 * O * ae / K.clientHeight, e.object.matrix), W(2 * L * ae / K.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (I(O * (e.object.right - e.object.left) / e.object.zoom / K.clientWidth, e.object.matrix), W(L * (e.object.top - e.object.bottom) / e.object.zoom / K.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function T(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d /= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function N(r) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? d *= r : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function J(r, y) {
      if (!e.zoomToCursor)
        return;
      se = !0;
      const O = e.domElement.getBoundingClientRect(), L = r - O.left, K = y - O.top, de = O.width, ae = O.height;
      le.x = L / de * 2 - 1, le.y = -(K / ae) * 2 + 1, Ee.set(le.x, le.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function me(r) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, r));
    }
    function Ce(r) {
      b.set(r.clientX, r.clientY);
    }
    function ft(r) {
      J(r.clientX, r.clientX), B.set(r.clientX, r.clientY);
    }
    function Xe(r) {
      M.set(r.clientX, r.clientY);
    }
    function At(r) {
      E.set(r.clientX, r.clientY), x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E), e.update();
    }
    function kt(r) {
      S.set(r.clientX, r.clientY), z.subVectors(S, B), z.y > 0 ? T(Y(z.y)) : z.y < 0 && N(Y(z.y)), B.copy(S), e.update();
    }
    function Ze(r) {
      k.set(r.clientX, r.clientY), H.subVectors(k, M).multiplyScalar(e.panSpeed), q(H.x, H.y), M.copy(k), e.update();
    }
    function Je(r) {
      J(r.clientX, r.clientY), r.deltaY < 0 ? N(Y(r.deltaY)) : r.deltaY > 0 && T(Y(r.deltaY)), e.update();
    }
    function ze(r) {
      let y = !1;
      switch (r.code) {
        case e.keys.UP:
          r.ctrlKey || r.metaKey || r.shiftKey ? $(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(0, e.keyPanSpeed), y = !0;
          break;
        case e.keys.BOTTOM:
          r.ctrlKey || r.metaKey || r.shiftKey ? $(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(0, -e.keyPanSpeed), y = !0;
          break;
        case e.keys.LEFT:
          r.ctrlKey || r.metaKey || r.shiftKey ? U(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(e.keyPanSpeed, 0), y = !0;
          break;
        case e.keys.RIGHT:
          r.ctrlKey || r.metaKey || r.shiftKey ? U(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : q(-e.keyPanSpeed, 0), y = !0;
          break;
      }
      y && (r.preventDefault(), e.update());
    }
    function Ye(r) {
      if (f.length === 1)
        b.set(r.pageX, r.pageY);
      else {
        const y = Se(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        b.set(O, L);
      }
    }
    function Me(r) {
      if (f.length === 1)
        M.set(r.pageX, r.pageY);
      else {
        const y = Se(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        M.set(O, L);
      }
    }
    function ht(r) {
      const y = Se(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      B.set(0, K);
    }
    function pt(r) {
      e.enableZoom && ht(r), e.enablePan && Me(r);
    }
    function _t(r) {
      e.enableZoom && ht(r), e.enableRotate && Ye(r);
    }
    function mt(r) {
      if (f.length == 1)
        E.set(r.pageX, r.pageY);
      else {
        const O = Se(r), L = 0.5 * (r.pageX + O.x), K = 0.5 * (r.pageY + O.y);
        E.set(L, K);
      }
      x.subVectors(E, b).multiplyScalar(e.rotateSpeed);
      const y = e.domElement;
      U(2 * Math.PI * x.x / y.clientHeight), $(2 * Math.PI * x.y / y.clientHeight), b.copy(E);
    }
    function Te(r) {
      if (f.length === 1)
        k.set(r.pageX, r.pageY);
      else {
        const y = Se(r), O = 0.5 * (r.pageX + y.x), L = 0.5 * (r.pageY + y.y);
        k.set(O, L);
      }
      H.subVectors(k, M).multiplyScalar(e.panSpeed), q(H.x, H.y), M.copy(k);
    }
    function Re(r) {
      const y = Se(r), O = r.pageX - y.x, L = r.pageY - y.y, K = Math.sqrt(O * O + L * L);
      S.set(0, K), z.set(0, Math.pow(S.y / B.y, e.zoomSpeed)), T(z.y), B.copy(S);
      const de = (r.pageX + y.x) * 0.5, ae = (r.pageY + y.y) * 0.5;
      J(de, ae);
    }
    function vt(r) {
      e.enableZoom && Re(r), e.enablePan && Te(r);
    }
    function gt(r) {
      e.enableZoom && Re(r), e.enableRotate && mt(r);
    }
    function Pe(r) {
      e.enabled !== !1 && (f.length === 0 && (e.domElement.setPointerCapture(r.pointerId), e.domElement.addEventListener("pointermove", Qe), e.domElement.addEventListener("pointerup", Ae)), Dt(r), r.pointerType === "touch" ? nt(r) : et(r));
    }
    function Qe(r) {
      e.enabled !== !1 && (r.pointerType === "touch" ? Ct(r) : jt(r));
    }
    function Ae(r) {
      switch (It(r), f.length) {
        case 0:
          e.domElement.releasePointerCapture(r.pointerId), e.domElement.removeEventListener("pointermove", Qe), e.domElement.removeEventListener("pointerup", Ae), e.dispatchEvent(rn), s = o.NONE;
          break;
        case 1:
          const y = f[0], O = m[y];
          nt({ pointerId: y, pageX: O.x, pageY: O.y });
          break;
      }
    }
    function et(r) {
      let y;
      switch (r.button) {
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
          ft(r), s = o.DOLLY;
          break;
        case He.ROTATE:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enablePan === !1)
              return;
            Xe(r), s = o.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Ce(r), s = o.ROTATE;
          }
          break;
        case He.PAN:
          if (r.ctrlKey || r.metaKey || r.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Ce(r), s = o.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Xe(r), s = o.PAN;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent($t);
    }
    function jt(r) {
      switch (s) {
        case o.ROTATE:
          if (e.enableRotate === !1)
            return;
          At(r);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1)
            return;
          kt(r);
          break;
        case o.PAN:
          if (e.enablePan === !1)
            return;
          Ze(r);
          break;
      }
    }
    function bt(r) {
      e.enabled === !1 || e.enableZoom === !1 || s !== o.NONE || (r.preventDefault(), e.dispatchEvent($t), Je(yt(r)), e.dispatchEvent(rn));
    }
    function yt(r) {
      const y = r.deltaMode, O = {
        clientX: r.clientX,
        clientY: r.clientY,
        deltaY: r.deltaY
      };
      switch (y) {
        case 1:
          O.deltaY *= 16;
          break;
        case 2:
          O.deltaY *= 100;
          break;
      }
      return r.ctrlKey && !w && (O.deltaY *= 10), O;
    }
    function Et(r) {
      r.key === "Control" && (w = !0, e.domElement.getRootNode().addEventListener("keyup", xe, { passive: !0, capture: !0 }));
    }
    function xe(r) {
      r.key === "Control" && (w = !1, e.domElement.getRootNode().removeEventListener("keyup", xe, { passive: !0, capture: !0 }));
    }
    function tt(r) {
      e.enabled === !1 || e.enablePan === !1 || ze(r);
    }
    function nt(r) {
      switch (xt(r), f.length) {
        case 1:
          switch (e.touches.ONE) {
            case We.ROTATE:
              if (e.enableRotate === !1)
                return;
              Ye(r), s = o.TOUCH_ROTATE;
              break;
            case We.PAN:
              if (e.enablePan === !1)
                return;
              Me(r), s = o.TOUCH_PAN;
              break;
            default:
              s = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case We.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              pt(r), s = o.TOUCH_DOLLY_PAN;
              break;
            case We.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              _t(r), s = o.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = o.NONE;
          }
          break;
        default:
          s = o.NONE;
      }
      s !== o.NONE && e.dispatchEvent($t);
    }
    function Ct(r) {
      switch (xt(r), s) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          mt(r), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          Te(r), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          vt(r), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          gt(r), e.update();
          break;
        default:
          s = o.NONE;
      }
    }
    function Ge(r) {
      e.enabled !== !1 && r.preventDefault();
    }
    function Dt(r) {
      f.push(r.pointerId);
    }
    function It(r) {
      delete m[r.pointerId];
      for (let y = 0; y < f.length; y++)
        if (f[y] == r.pointerId) {
          f.splice(y, 1);
          return;
        }
    }
    function xt(r) {
      let y = m[r.pointerId];
      y === void 0 && (y = new ue(), m[r.pointerId] = y), y.set(r.pageX, r.pageY);
    }
    function Se(r) {
      const y = r.pointerId === f[0] ? f[1] : f[0];
      return m[y];
    }
    e.domElement.addEventListener("contextmenu", Ge), e.domElement.addEventListener("pointerdown", Pe), e.domElement.addEventListener("pointercancel", Ae), e.domElement.addEventListener("wheel", bt, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", Et, { passive: !0, capture: !0 }), this.update();
  }
}
const Mt = (t) => {
  const [n, a] = oe(t.options[t.index]), e = () => {
    t.onToggle(!t.open);
  }, o = (s) => {
    s !== n && (t.onSelect(s), a(s)), t.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${t.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: e, children: n }),
    t.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: t.options.map((s) => /* @__PURE__ */ l.jsx("li", { onClick: () => o(s), children: s }, s)) })
  ] });
}, Le = Ra(function(n, a) {
  const [e, o] = oe(!1), s = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      e && o(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Mt,
      {
        index: s,
        open: e,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (p) => {
          o(p);
        },
        up: !0
      }
    )
  ] });
}), sn = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ne = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Map();
function $e(t, n) {
  const a = new Rn(-100, 100, 100, -100, 50, 3e3);
  return a.name = t, a.position.copy(n), a.lookAt(0, 0, 0), ne.set(t, a), a;
}
$e("Top", new X(0, 1e3, 0));
$e("Bottom", new X(0, -1e3, 0));
$e("Left", new X(-1e3, 0, 0));
$e("Right", new X(1e3, 0, 0));
$e("Front", new X(0, 0, 1e3));
$e("Back", new X(0, 0, -1e3));
$e("Orthographic", new X(1e3, 1e3, 1e3));
const Pt = new zt(60, 1, 50, 3e3);
Pt.name = "Debug";
Pt.position.set(500, 500, 500);
Pt.lookAt(0, 0, 0);
ne.set("Debug", Pt);
const cn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Ai = new va(), ki = new ga(), _i = new si(), ji = new ba({
  opacity: 0.33,
  transparent: !0,
  wireframe: !0
});
let wt = "Renderer";
const V = new Pn();
V.name = "Debug Scene";
let be = new Pn();
V.add(be);
const dt = new ya();
dt.name = "helpers";
V.add(dt);
const Di = new ii();
dt.add(Di);
const $n = new An(500);
$n.name = "axisHelper";
dt.add($n);
const ut = new An(100);
ut.name = "interactionHelper";
dt.add(ut);
ut.visible = !1;
let Ot = !1, G = ne.get("Debug"), re = ne.get("Orthographic"), Ne = ne.get("Front"), Fe = ne.get("Top"), ln = !1;
function qi(t) {
  const [n, a] = oe(t.mode !== void 0 ? t.mode : "Single"), [e, o] = oe(null), [s, p] = oe(!1), [c, u] = oe(!1), [d, v] = oe(!1), [, b] = oe(Date.now()), E = ye(null), x = ye(null), M = ye(null), k = ye(null), H = ye(null), B = ye(null), S = (f, m) => {
    const w = ie.get(f.name);
    w !== void 0 && w.dispose(), ie.delete(f.name);
    const P = ge.get(f.name);
    P !== void 0 && (V.remove(P), P.dispose()), ge.delete(f.name);
    const Y = new Pi(f, m);
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
    if (ie.set(f.name, Y), f instanceof zt) {
      const U = new xa(f);
      ge.set(f.name, U), V.add(U);
    }
  }, z = (f) => {
    const m = ge.get(f.name);
    m !== void 0 && (V.remove(m), m.dispose(), ge.delete(f.name));
    const w = ie.get(f.name);
    w !== void 0 && (w.dispose(), ie.delete(f.name));
  }, Ee = () => {
    ie.forEach((f, m) => {
      f.dispose();
      const w = ge.get(m);
      w !== void 0 && (V.remove(w), w.dispose()), ge.delete(m), ie.delete(m);
    }), ie.clear(), ge.clear();
  }, le = () => {
    switch (n) {
      case "Single":
        S(G, M.current);
        break;
      case "Side by Side":
      case "Stacked":
        S(G, M.current), S(re, k.current);
        break;
      case "Quad":
        S(G, M.current), S(re, k.current), S(Ne, H.current), S(Fe, B.current);
        break;
    }
  };
  Be(() => {
    const f = new Ea({
      canvas: E.current,
      stencil: !1
    });
    f.autoClear = !1, f.shadowMap.enabled = !0, f.setPixelRatio(devicePixelRatio), f.setClearColor(0), o(f);
  }, []), Be(() => {
    const f = (P) => {
      Dn(be), V.remove(be);
      const Y = t.scenes.get(P.value.name);
      if (Y !== void 0) {
        const U = new Y();
        t.onSceneSet !== void 0 && t.onSceneSet(U), be = U, t.three.scene = be, V.add(be), ln = !0;
      }
    }, m = (P) => {
      const Y = P.value, U = t.three.scene?.getObjectByProperty("uuid", Y.uuid);
      U !== void 0 && ne.set(Y.name, U), b(Date.now());
    }, w = (P) => {
      ne.delete(P.value.name), b(Date.now());
    };
    return _.addEventListener(j.SET_SCENE, f), _.addEventListener(j.ADD_CAMERA, m), _.addEventListener(j.REMOVE_CAMERA, w), () => {
      _.removeEventListener(j.SET_SCENE, f), _.removeEventListener(j.ADD_CAMERA, m), _.removeEventListener(j.REMOVE_CAMERA, w);
    };
  }, []), Be(() => {
    if (e === null)
      return;
    let f = window.innerWidth, m = window.innerHeight, w = Math.floor(f / 2), P = Math.floor(m / 2), Y = -1;
    const U = () => {
      f = window.innerWidth - 300, m = window.innerHeight, w = Math.floor(f / 2), P = Math.floor(m / 2), e.setSize(f, m);
      let T = f, N = m;
      switch (n) {
        case "Side by Side":
          T = w, N = m;
          break;
        case "Stacked":
          T = f, N = P;
          break;
        case "Quad":
          T = w, N = P;
          break;
      }
      ne.forEach((J) => {
        J instanceof Rn ? (J.left = T / -2, J.right = T / 2, J.top = N / 2, J.bottom = N / -2, J.updateProjectionMatrix()) : J instanceof zt && (J.aspect = T / N, J.updateProjectionMatrix(), ge.get(J.name)?.update());
      });
    }, $ = () => {
      e.setViewport(0, 0, f, m), e.setScissor(0, 0, f, m), e.render(V, G);
    }, I = () => {
      if (n === "Side by Side")
        e.setViewport(0, 0, w, m), e.setScissor(0, 0, w, m), e.render(V, G), e.setViewport(w, 0, w, m), e.setScissor(w, 0, w, m), e.render(V, re);
      else {
        const T = m - P;
        e.setViewport(0, T, f, P), e.setScissor(0, T, f, P), e.render(V, G), e.setViewport(0, 0, f, P), e.setScissor(0, 0, f, P), e.render(V, re);
      }
    }, W = () => {
      let T = 0, N = 0;
      N = m - P, T = 0, e.setViewport(T, N, w, P), e.setScissor(T, N, w, P), e.render(V, G), T = w, e.setViewport(T, N, w, P), e.setScissor(T, N, w, P), e.render(V, re), N = 0, T = 0, e.setViewport(T, N, w, P), e.setScissor(T, N, w, P), e.render(V, Ne), T = w, e.setViewport(T, N, w, P), e.setScissor(T, N, w, P), e.render(V, Fe);
    }, q = () => {
      switch (ie.forEach((T) => {
        T.update();
      }), t.onSceneUpdate !== void 0 && ln && t.onSceneUpdate(be), e.clear(), n) {
        case "Single":
          $();
          break;
        case "Side by Side":
        case "Stacked":
          I();
          break;
        case "Quad":
          W();
          break;
      }
      Y = requestAnimationFrame(q);
    };
    return le(), window.addEventListener("resize", U), U(), q(), () => {
      window.removeEventListener("resize", U), cancelAnimationFrame(Y), Y = -1;
    };
  }, [n, e]), Be(() => {
    if (e !== null) {
      const f = new Ca(), m = new ue(), w = ($, I, W, q) => {
        switch (n) {
          case "Quad":
            $ < W ? I < q ? f.setFromCamera(m, G) : f.setFromCamera(m, Ne) : I < q ? f.setFromCamera(m, re) : f.setFromCamera(m, Fe);
            break;
          case "Side by Side":
            $ < W ? f.setFromCamera(m, G) : f.setFromCamera(m, re);
            break;
          case "Single":
            f.setFromCamera(m, G);
            break;
          case "Stacked":
            I < q ? f.setFromCamera(m, G) : f.setFromCamera(m, re);
            break;
        }
      }, P = ($) => {
        if (!Ot)
          return;
        const I = new ue();
        e.getSize(I);
        const W = Math.min($.clientX, I.x), q = Math.min($.clientY, I.y);
        m.x = Ke(W, 0, I.x, -1, 1), m.y = Ke(q, 0, I.y, 1, -1);
        const T = I.x / 2, N = I.y / 2, J = () => {
          W < T ? m.x = Ke(W, 0, T, -1, 1) : m.x = Ke(W, T, I.x, -1, 1);
        }, me = () => {
          q < N ? m.y = Ke(q, 0, N, 1, -1) : m.y = Ke(q, N, I.y, 1, -1);
        };
        switch (n) {
          case "Quad":
            J(), me();
            break;
          case "Side by Side":
            J();
            break;
          case "Stacked":
            me(), me();
            break;
        }
        w(W, q, T, N);
        const Ce = f.intersectObjects(be.children);
        Ce.length > 0 && ut.position.copy(Ce[0].point);
      }, Y = ($) => {
        if (!Ot)
          return;
        const I = new ue();
        if (e.getSize(I), $.clientX >= I.x)
          return;
        P($);
        const W = f.intersectObjects(be.children);
        W.length > 0 && t.three.getObject(W[0].object.uuid);
      }, U = x.current;
      return U.addEventListener("mousemove", P, !1), U.addEventListener("click", Y, !1), () => {
        U.removeEventListener("mousemove", P), U.removeEventListener("click", Y);
      };
    }
  }, [n, e]);
  const se = [];
  return ne.forEach((f, m) => {
    se.push(m);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: E }),
    /* @__PURE__ */ l.jsxs("div", { className: `cameras ${n === "Single" || n === "Stacked" ? "single" : ""}`, ref: x, children: [
      n === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Le, { camera: G, options: se, ref: M, onSelect: (f) => {
        ie.get(G.name)?.dispose();
        const m = ne.get(f);
        m !== void 0 && (z(G), G = m, S(m, M.current));
      } }) }),
      (n === "Side by Side" || n === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Le, { camera: G, options: se, ref: M, onSelect: (f) => {
          ie.get(G.name)?.dispose();
          const m = ne.get(f);
          m !== void 0 && (z(G), G = m, S(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: re, options: se, ref: k, onSelect: (f) => {
          ie.get(re.name)?.dispose();
          const m = ne.get(f);
          m !== void 0 && (z(re), re = m, S(m, k.current));
        } })
      ] }),
      n === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(Le, { camera: G, options: se, ref: M, onSelect: (f) => {
          ie.get(G.name)?.dispose();
          const m = ne.get(f);
          m !== void 0 && (z(G), G = m, S(m, M.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: re, options: se, ref: k, onSelect: (f) => {
          ie.get(re.name)?.dispose();
          const m = ne.get(f);
          m !== void 0 && (z(re), re = m, S(m, k.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: Ne, options: se, ref: H, onSelect: (f) => {
          ie.get(Ne.name)?.dispose();
          const m = ne.get(f);
          m !== void 0 && (z(Ne), Ne = m, S(m, H.current));
        } }),
        /* @__PURE__ */ l.jsx(Le, { camera: Fe, options: se, ref: B, onSelect: (f) => {
          ie.get(Fe.name)?.dispose();
          const m = ne.get(f);
          m !== void 0 && (z(Fe), Fe = m, S(m, B.current));
        } })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
      /* @__PURE__ */ l.jsx(
        Mt,
        {
          index: sn.indexOf(n),
          options: sn,
          onSelect: (f) => {
            f !== n && (Ee(), a(f));
          },
          open: s,
          onToggle: (f) => {
            p(f), c && u(!1), d && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Mt,
        {
          index: cn.indexOf(wt),
          options: cn,
          onSelect: (f) => {
            if (f !== wt)
              switch (wt = f, wt) {
                case "Depth":
                  V.overrideMaterial = Ai;
                  break;
                case "Normals":
                  V.overrideMaterial = ki;
                  break;
                default:
                case "Renderer":
                  V.overrideMaterial = null;
                  break;
                case "Wireframe":
                  V.overrideMaterial = ji;
                  break;
                case "UVs":
                  V.overrideMaterial = _i;
                  break;
              }
          },
          open: c,
          onToggle: (f) => {
            s && p(!1), u(f), d && v(!1);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        Mt,
        {
          index: 0,
          options: [
            "Orbit Mode",
            "Selection Mode"
          ],
          onSelect: (f) => {
            Ot = f === "Selection Mode", ut.visible = Ot;
          },
          open: d,
          onToggle: (f) => {
            s && p(!1), c && u(!1), v(f);
          }
        }
      )
    ] })
  ] });
}
function Ki(t) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: t.ref, style: t.style, children: [
    /* @__PURE__ */ l.jsx("header", { children: t.header }),
    t.children,
    /* @__PURE__ */ l.jsx("footer", { children: t.footer })
  ] });
}
export {
  Ht as Accordion,
  Gi as Application,
  Rt as BaseRemote,
  Bn as ChildObject,
  ci as ContainerObject,
  Ja as Draggable,
  Za as DraggableItem,
  Qa as Dropdown,
  ei as DropdownItem,
  Ki as Editor,
  ii as InfiniteGridHelper,
  Ti as Inspector,
  qi as MultiView,
  Fn as NavButton,
  Da as RemoteComponents,
  Vi as RemoteController,
  Oe as RemoteTheatre,
  Ya as RemoteThree,
  Nn as RemoteTweakpane,
  Wi as SceneInspector,
  Hi as SidePanel,
  j as ToolEvents,
  si as UVMaterial,
  lt as capitalize,
  $i as clamp,
  ka as colorToHex,
  _ as debugDispatcher,
  Dn as dispose,
  ja as disposeMaterial,
  Yi as disposeTexture,
  zi as distance,
  jn as hierarchyUUID,
  Aa as isColor,
  Pa as randomID,
  _a as resetThreeObjects,
  Ft as round,
  Yt as totalThreeObjects
};
