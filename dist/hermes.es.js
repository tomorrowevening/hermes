import { EventDispatcher as hn, Texture as fn, CubeTexture as Wn, RepeatWrapping as Yt, WebGLRenderTarget as Hn, Color as Bt, FrontSide as Yn, BackSide as mn, DoubleSide as pn, NoBlending as Vn, NormalBlending as qn, AdditiveBlending as Kn, SubtractiveBlending as Zn, MultiplyBlending as Xn, CustomBlending as Jn, AddEquation as Qn, SubtractEquation as ea, ReverseSubtractEquation as ta, MinEquation as na, MaxEquation as aa, ZeroFactor as gn, OneFactor as vn, SrcColorFactor as bn, OneMinusSrcColorFactor as yn, SrcAlphaFactor as xn, OneMinusSrcAlphaFactor as En, DstAlphaFactor as Cn, OneMinusDstAlphaFactor as Sn, DstColorFactor as wn, OneMinusDstColorFactor as Mn, SrcAlphaSaturateFactor as ia, ConstantColorFactor as On, OneMinusConstantColorFactor as Tn, ConstantAlphaFactor as _n, OneMinusConstantAlphaFactor as Rn, Matrix4 as ra, Vector3 as Y, Euler as sa, Line as oa, BufferGeometry as Vt, Float32BufferAttribute as qt, LineBasicMaterial as ca, Mesh as kn, MeshBasicMaterial as Pn, Ray as la, Plane as ua, MathUtils as da, MOUSE as nt, TOUCH as at, Quaternion as Kt, Spherical as Zt, Vector2 as fe, ShaderMaterial as jn, GLSL3 as ha, PlaneGeometry as fa, Scene as ma, Group as pa, AxesHelper as Xt, MeshDepthMaterial as ga, MeshNormalMaterial as va, WebGLRenderer as ba, PerspectiveCamera as Pt, Raycaster as ya, OrthographicCamera as Jt, CameraHelper as xa, SpotLightHelper as Ea, PointLightHelper as Ca, HemisphereLightHelper as Sa, DirectionalLightHelper as wa } from "three";
import { Pane as Ma } from "tweakpane";
import * as Oa from "@tweakpane/plugin-essentials";
import Dn, { useState as X, useRef as q, useEffect as _e, useMemo as ie, forwardRef as Ta } from "react";
import { Reorder as An } from "framer-motion";
const Ft = () => {
}, ki = () => {
};
function Mt(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Ke(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function Qt(e, n, a) {
  return (a - e) / (n - e);
}
function en(e, n, a) {
  return e * (1 - a) + n * a;
}
function Pi(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function _a() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ra(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function ka(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), i = (d) => {
    const h = d.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, o = i(n), u = i(a), c = i(t);
  return "#" + o + u + c;
}
function tn(e, n = 1) {
  return Number(e.toFixed(n));
}
let It = 0;
const Pa = () => {
  It = 0;
}, In = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${It}`, It++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((a) => {
    In(a);
  });
}, ji = (e) => {
  e?.dispose();
}, ja = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, Ut = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : Ut(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), ja(n.material);
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
const j = new hn(), D = {
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
class Ai extends Ot {
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
        j.dispatchEvent({ type: D.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        j.dispatchEvent({ type: D.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class $t extends Ot {
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
  getSheetInstance(n, a) {
    return a !== void 0 ? `${n}-${a}` : n;
  }
  sheet(n, a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = this.getSheetInstance(n, a);
    let i = this.sheets.get(t);
    return i !== void 0 || (i = this.project?.sheet(n, a), this.sheets.set(t, i)), i;
  }
  playSheet(n, a, t) {
    this.sheet(n, t)?.sequence.play(a), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: n,
        instance: t,
        value: a
      }
    });
  }
  pauseSheet(n, a) {
    this.sheet(n)?.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: n,
        instance: a
      }
    });
  }
  clearSheetObjects(n) {
    this.sheetObjects.forEach((a, t) => {
      t.search(`${n}_`) > -1 && this.unsubscribe(a);
    });
  }
  sheetObject(n, a, t, i, o) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const u = this.sheet(n, o);
    if (u === void 0)
      return;
    const d = `${this.getSheetInstance(n, o)}_${a}`;
    let h = this.sheetObjects.get(d);
    h !== void 0 ? h = u.object(a, { ...t, ...h.value }, { reconfigure: !0 }) : h = u.object(a, t), this.sheetObjects.set(d, h), this.sheetObjectCBs.set(d, i !== void 0 ? i : Ft);
    const f = h.onValuesChange((m) => {
      if (this.app.editor) {
        for (const M in m) {
          const L = m[M];
          typeof L == "object" && Ra(L) && (m[M] = {
            r: L.r,
            g: L.g,
            b: L.b,
            a: L.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: n,
            sheetObject: d,
            values: m
          }
        });
      }
      const x = this.sheetObjectCBs.get(d);
      x !== void 0 && x(m);
    });
    return this.sheetObjectUnsubscribe.set(d, f), h;
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
          i.sheet(t.data.sheet, t.data.instance)?.sequence.play(t.data.value);
          break;
        case "pauseSheet":
          i.sheet(t.data.sheet, t.data.instance)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(n, a) {
    if (n.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((u) => {
        u.length < 1 || u.forEach((c) => {
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
      const i = () => {
        if ($t.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
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
function Ii(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((u) => {
      u.length < 1 || u.forEach((c) => {
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
    const i = () => {
      if ($t.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
function Da(e) {
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
function Aa(e) {
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
function it(e) {
  const n = {};
  for (const a in e) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Ia(a))
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
            if (i instanceof fn) {
              const o = i.source.toJSON();
              n[a] = { src: o.url };
            } else
              i instanceof Wn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Aa(n[a]));
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
function La(e, n) {
  for (const a in n)
    e[a] = n[a];
}
function V(e, n, a) {
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
    u !== void 0 && La(u, a);
  }
}
function Ln(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const i = new fn(t);
      i.wrapS = Yt, i.wrapT = Yt, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Ni extends Ot {
  scene = void 0;
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  dispose() {
    this.renderTargets.forEach((n) => {
      n.dispose();
    }), this.renderTargets.clear(), this.scene && Ut(this.scene), this.renderer?.dispose();
  }
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
    Pa(), In(this.scene);
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
        j.dispatchEvent({ type: D.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        j.dispatchEvent({ type: D.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        j.dispatchEvent({ type: D.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        j.dispatchEvent({ type: D.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        j.dispatchEvent({ type: D.SET_OBJECT, value: t.data });
        break;
      case "setScene":
        j.dispatchEvent({ type: D.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        j.dispatchEvent({ type: D.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        j.dispatchEvent({ type: D.REMOVE_CAMERA, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(n, a) {
    const t = new Hn(32, 32, a);
    t.texture.name = n, this.renderTargets.set(n, t);
  }
  resize(n, a) {
    const t = this.dpr;
    this.rendererWidth = n, this.rendererHeight = a, this.renderTargets.forEach((i) => {
      i.setSize(n * t, a * t);
    }), this.renderer?.setSize(n, a);
  }
  set dpr(n) {
    this.renderer?.setPixelRatio(Ke(1, 2, n));
  }
  get dpr() {
    return this.renderer !== void 0 ? this.renderer?.getPixelRatio() : 1;
  }
  get width() {
    return this.rendererWidth;
  }
  get height() {
    return this.rendererHeight;
  }
  get canvas() {
    return this.renderer !== void 0 ? this.renderer?.domElement : null;
  }
}
class Li extends Ot {
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
    this.pane = new Ma({ title: "GUI" }), this.pane.registerPlugin(Oa);
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
    this.bindCBs.set(o, u), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, t).on("change", (d) => {
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
var Nt = { exports: {} }, lt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nn;
function Ba() {
  if (nn)
    return lt;
  nn = 1;
  var e = Dn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(c, d, h) {
    var f, m = {}, x = null, M = null;
    h !== void 0 && (x = "" + h), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (M = d.ref);
    for (f in d)
      t.call(d, f) && !o.hasOwnProperty(f) && (m[f] = d[f]);
    if (c && c.defaultProps)
      for (f in d = c.defaultProps, d)
        m[f] === void 0 && (m[f] = d[f]);
    return { $$typeof: n, type: c, key: x, ref: M, props: m, _owner: i.current };
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
var an;
function Fa() {
  return an || (an = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Dn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), L = Symbol.iterator, te = "@@iterator";
    function me(r) {
      if (r === null || typeof r != "object")
        return null;
      var p = L && r[L] || r[te];
      return typeof p == "function" ? p : null;
    }
    var re = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function z(r) {
      {
        for (var p = arguments.length, b = new Array(p > 1 ? p - 1 : 0), S = 1; S < p; S++)
          b[S - 1] = arguments[S];
        I("error", r, b);
      }
    }
    function I(r, p, b) {
      {
        var S = re.ReactDebugCurrentFrame, B = S.getStackAddendum();
        B !== "" && (p += "%s", b = b.concat([B]));
        var $ = b.map(function(P) {
          return String(P);
        });
        $.unshift("Warning: " + p), Function.prototype.apply.call(console[r], console, $);
      }
    }
    var K = !1, ne = !1, Se = !1, G = !1, pe = !1, oe;
    oe = Symbol.for("react.module.reference");
    function Re(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === t || r === o || pe || r === i || r === h || r === f || G || r === M || K || ne || Se || typeof r == "object" && r !== null && (r.$$typeof === x || r.$$typeof === m || r.$$typeof === u || r.$$typeof === c || r.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === oe || r.getModuleId !== void 0));
    }
    function ke(r, p, b) {
      var S = r.displayName;
      if (S)
        return S;
      var B = p.displayName || p.name || "";
      return B !== "" ? b + "(" + B + ")" : b;
    }
    function ve(r) {
      return r.displayName || "Context";
    }
    function N(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && z("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
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
        case h:
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
          case d:
            return ke(r, r.render, "ForwardRef");
          case m:
            var S = r.displayName || null;
            return S !== null ? S : N(r.type) || "Memo";
          case x: {
            var B = r, $ = B._payload, P = B._init;
            try {
              return N(P($));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var be = Object.assign, O = 0, we, Pe, Ae, je, De, Ie, Be;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function ae() {
      {
        if (O === 0) {
          we = console.log, Pe = console.info, Ae = console.warn, je = console.error, De = console.group, Ie = console.groupCollapsed, Be = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: Fe,
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
        O++;
      }
    }
    function Me() {
      {
        if (O--, O === 0) {
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
              value: Pe
            }),
            warn: be({}, r, {
              value: Ae
            }),
            error: be({}, r, {
              value: je
            }),
            group: be({}, r, {
              value: De
            }),
            groupCollapsed: be({}, r, {
              value: Ie
            }),
            groupEnd: be({}, r, {
              value: Be
            })
          });
        }
        O < 0 && z("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var He = re.ReactCurrentDispatcher, Ye;
    function le(r, p, b) {
      {
        if (Ye === void 0)
          try {
            throw Error();
          } catch (B) {
            var S = B.stack.trim().match(/\n( *(at )?)/);
            Ye = S && S[1] || "";
          }
        return `
` + Ye + r;
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
      var S;
      g = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $;
      $ = He.current, He.current = null, ae();
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
            } catch (Le) {
              S = Le;
            }
            Reflect.construct(r, [], P);
          } else {
            try {
              P.call();
            } catch (Le) {
              S = Le;
            }
            r.call(P.prototype);
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
          for (var R = Le.stack.split(`
`), de = S.stack.split(`
`), Z = R.length - 1, Q = de.length - 1; Z >= 1 && Q >= 0 && R[Z] !== de[Q]; )
            Q--;
          for (; Z >= 1 && Q >= 0; Z--, Q--)
            if (R[Z] !== de[Q]) {
              if (Z !== 1 || Q !== 1)
                do
                  if (Z--, Q--, Q < 0 || R[Z] !== de[Q]) {
                    var Ce = `
` + R[Z].replace(" at new ", " at ");
                    return r.displayName && Ce.includes("<anonymous>") && (Ce = Ce.replace("<anonymous>", r.displayName)), typeof r == "function" && v.set(r, Ce), Ce;
                  }
                while (Z >= 1 && Q >= 0);
              break;
            }
        }
      } finally {
        g = !1, He.current = $, Me(), Error.prepareStackTrace = B;
      }
      var tt = r ? r.displayName || r.name : "", Ht = tt ? le(tt) : "";
      return typeof r == "function" && v.set(r, Ht), Ht;
    }
    function ge(r, p, b) {
      return k(r, !1);
    }
    function ce(r) {
      var p = r.prototype;
      return !!(p && p.isReactComponent);
    }
    function C(r, p, b) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return k(r, ce(r));
      if (typeof r == "string")
        return le(r);
      switch (r) {
        case h:
          return le("Suspense");
        case f:
          return le("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case d:
            return ge(r.render);
          case m:
            return C(r.type, p, b);
          case x: {
            var S = r, B = S._payload, $ = S._init;
            try {
              return C($(B), p, b);
            } catch {
            }
          }
        }
      return "";
    }
    var E = Object.prototype.hasOwnProperty, U = {}, J = re.ReactDebugCurrentFrame;
    function T(r) {
      if (r) {
        var p = r._owner, b = C(r.type, r._source, p ? p.type : null);
        J.setExtraStackFrame(b);
      } else
        J.setExtraStackFrame(null);
    }
    function F(r, p, b, S, B) {
      {
        var $ = Function.call.bind(E);
        for (var P in r)
          if ($(r, P)) {
            var R = void 0;
            try {
              if (typeof r[P] != "function") {
                var de = Error((S || "React class") + ": " + b + " type `" + P + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[P] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw de.name = "Invariant Violation", de;
              }
              R = r[P](p, P, S, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              R = Z;
            }
            R && !(R instanceof Error) && (T(B), z("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", b, P, typeof R), T(null)), R instanceof Error && !(R.message in U) && (U[R.message] = !0, T(B), z("Failed %s type: %s", b, R.message), T(null));
          }
      }
    }
    var W = Array.isArray;
    function Ne(r) {
      return W(r);
    }
    function Je(r) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, b = p && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return b;
      }
    }
    function ft(r) {
      try {
        return mt(r), !1;
      } catch {
        return !0;
      }
    }
    function mt(r) {
      return "" + r;
    }
    function st(r) {
      if (ft(r))
        return z("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(r)), mt(r);
    }
    var Ue = re.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ct, pt, Qe;
    Qe = {};
    function _t(r) {
      if (E.call(r, "ref")) {
        var p = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Rt(r) {
      if (E.call(r, "key")) {
        var p = Object.getOwnPropertyDescriptor(r, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function kt(r, p) {
      if (typeof r.ref == "string" && Ue.current && p && Ue.current.stateNode !== p) {
        var b = N(Ue.current.type);
        Qe[b] || (z('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N(Ue.current.type), r.ref), Qe[b] = !0);
      }
    }
    function gt(r, p) {
      {
        var b = function() {
          ct || (ct = !0, z("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
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
          pt || (pt = !0, z("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        b.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var Gt = function(r, p, b, S, B, $, P) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: p,
        ref: b,
        props: P,
        // Record the component responsible for creating this element.
        _owner: $
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
        value: S
      }), Object.defineProperty(R, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function s(r, p, b, S, B) {
      {
        var $, P = {}, R = null, de = null;
        b !== void 0 && (st(b), R = "" + b), Rt(p) && (st(p.key), R = "" + p.key), _t(p) && (de = p.ref, kt(p, B));
        for ($ in p)
          E.call(p, $) && !ot.hasOwnProperty($) && (P[$] = p[$]);
        if (r && r.defaultProps) {
          var Z = r.defaultProps;
          for ($ in Z)
            P[$] === void 0 && (P[$] = Z[$]);
        }
        if (R || de) {
          var Q = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          R && gt(P, Q), de && $e(P, Q);
        }
        return Gt(r, R, de, B, S, Ue.current, P);
      }
    }
    var y = re.ReactCurrentOwner, _ = re.ReactDebugCurrentFrame;
    function A(r) {
      if (r) {
        var p = r._owner, b = C(r.type, r._source, p ? p.type : null);
        _.setExtraStackFrame(b);
      } else
        _.setExtraStackFrame(null);
    }
    var ee;
    ee = !1;
    function ye(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function ue() {
      {
        if (y.current) {
          var r = N(y.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Wt(r) {
      {
        if (r !== void 0) {
          var p = r.fileName.replace(/^.*[\\\/]/, ""), b = r.lineNumber;
          return `

Check your code at ` + p + ":" + b + ".";
        }
        return "";
      }
    }
    var vt = {};
    function bt(r) {
      {
        var p = ue();
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
        var b = bt(p);
        if (vt[b])
          return;
        vt[b] = !0;
        var S = "";
        r && r._owner && r._owner !== y.current && (S = " It was passed a child from " + N(r._owner.type) + "."), A(r), z('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, S), A(null);
      }
    }
    function Ee(r, p) {
      {
        if (typeof r != "object")
          return;
        if (Ne(r))
          for (var b = 0; b < r.length; b++) {
            var S = r[b];
            ye(S) && xe(S, p);
          }
        else if (ye(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var B = me(r);
          if (typeof B == "function" && B !== r.entries)
            for (var $ = B.call(r), P; !(P = $.next()).done; )
              ye(P.value) && xe(P.value, p);
        }
      }
    }
    function Ve(r) {
      {
        var p = r.type;
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
          var S = N(p);
          F(b, r.props, "prop", S, r);
        } else if (p.PropTypes !== void 0 && !ee) {
          ee = !0;
          var B = N(p);
          z("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && z("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(r) {
      {
        for (var p = Object.keys(r.props), b = 0; b < p.length; b++) {
          var S = p[b];
          if (S !== "children" && S !== "key") {
            A(r), z("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), A(null);
            break;
          }
        }
        r.ref !== null && (A(r), z("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    function ze(r, p, b, S, B, $) {
      {
        var P = Re(r);
        if (!P) {
          var R = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var de = Wt(B);
          de ? R += de : R += ue();
          var Z;
          r === null ? Z = "null" : Ne(r) ? Z = "array" : r !== void 0 && r.$$typeof === n ? (Z = "<" + (N(r.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof r, z("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, R);
        }
        var Q = s(r, p, b, B, $);
        if (Q == null)
          return Q;
        if (P) {
          var Ce = p.children;
          if (Ce !== void 0)
            if (S)
              if (Ne(Ce)) {
                for (var tt = 0; tt < Ce.length; tt++)
                  Ee(Ce[tt], r);
                Object.freeze && Object.freeze(Ce);
              } else
                z("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ee(Ce, r);
        }
        return r === t ? Oe(Q) : Ve(Q), Q;
      }
    }
    function et(r, p, b) {
      return ze(r, p, b, !0);
    }
    function yt(r, p, b) {
      return ze(r, p, b, !1);
    }
    var zn = yt, Gn = et;
    ut.Fragment = t, ut.jsx = zn, ut.jsxs = Gn;
  }()), ut;
}
process.env.NODE_ENV === "production" ? Nt.exports = Ba() : Nt.exports = Fa();
var l = Nt.exports;
function Bn(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ l.jsx("button", { children: e.title });
}
const Ua = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), $a = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function za(e) {
  return /* @__PURE__ */ l.jsx(An.Item, { value: e.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    $a,
    /* @__PURE__ */ l.jsx("span", { children: e.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Ua })
  ] }) }, e.title);
}
function Ga(e) {
  const [n, a] = X(!1), [t, i] = X(e.options), o = (h) => {
    e.onDragComplete(h), i(h);
  }, u = (h) => {
    const f = [...t];
    f.splice(h, 1), o(f);
  }, c = [];
  t.forEach((h, f) => {
    c.push(/* @__PURE__ */ l.jsx(za, { index: f, title: h, onDelete: u }, h));
  });
  let d = "dropdown draggable";
  return e.subdropdown && (d += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Bn, { title: e.title }),
    /* @__PURE__ */ l.jsx(An.Group, { axis: "y", values: t, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: c })
  ] });
}
function Wa(e) {
  const [n, a] = X(!1), t = [];
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
        /* @__PURE__ */ l.jsx(Bn, { title: e.title }),
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
  const { option: n } = e, [a, t] = X("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        Ga,
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
        Wa,
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
function Bi(e, n, a) {
  function t(o) {
    switch (n.forEach((u) => {
      u.callback(e, u.remote, o);
    }), o.event) {
      case "custom":
        j.dispatchEvent({ type: D.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((u) => {
      u.callback(e, u.remote, o);
    }), o.event) {
      case "custom":
        j.dispatchEvent({ type: D.CUSTOM, value: o.data });
        break;
    }
  }
  e.listen = (o) => {
    o.target === "editor" ? i(o) : t(o);
  };
}
function zt(e) {
  const [n, a] = X(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
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
function Fn(e) {
  const n = q(null), [a, t] = X(!1), i = e.child !== void 0 && e.child.children.length > 0, o = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((u) => {
    o.push(/* @__PURE__ */ l.jsx(Fn, { child: u, three: e.three }, Math.random()));
  }), _e(() => {
    const u = e.three.scene?.getObjectByProperty("uuid", e.child.uuid);
    u !== void 0 && (n.current.style.opacity = u.visible ? "1" : "0.25");
  }, []), /* @__PURE__ */ l.jsx(l.Fragment, { children: e.child !== void 0 && /* @__PURE__ */ l.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "child", children: [
      i ? /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: a ? "-14px" : "2px"
          },
          onClick: () => {
            t(!a);
          }
        }
      ) : null,
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "name",
          style: {
            left: i ? "20px" : "5px"
          },
          onClick: () => {
            e.child !== void 0 && (e.three.getObject(e.child.uuid), a || t(!0));
          },
          children: e.child.name.length > 0 ? `${e.child.name} (${e.child.type})` : `${e.child.type}::${e.child.uuid}`
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: "visibility",
          ref: n,
          onClick: () => {
            if (e.child) {
              const u = e.three.scene?.getObjectByProperty("uuid", e.child.uuid);
              if (u !== void 0) {
                const c = "visible", d = !u.visible;
                n.current.style.opacity = d ? "1" : "0.25", e.three.updateObject(e.child.uuid, c, d), V(u, c, d);
              }
            }
          }
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Da(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: a ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random()) });
}
function Ya(e) {
  const n = [];
  return e.child?.children.map((a) => {
    n.push(/* @__PURE__ */ l.jsx(Fn, { child: a, three: e.three }, Math.random()));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const Va = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function qa(e) {
  return "items" in e;
}
function Xe(e) {
  const n = [];
  return e.items.forEach((a) => {
    qa(a) ? n.push(
      /* @__PURE__ */ l.jsx(Xe, { title: Mt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        St,
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
          },
          onKeyDown: (t) => {
            a.onKeyDown !== void 0 && a.onKeyDown(t);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ l.jsx(zt, { label: e.title, open: e.expanded === !0, children: n });
}
function Ka(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "blendAlpha" || e === "blendColor" || e === "blendDstAlpha" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function Za(e) {
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
function Tt(e) {
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
const Ja = [
  {
    title: "Front",
    value: Yn
  },
  {
    title: "Back",
    value: mn
  },
  {
    title: "Double",
    value: pn
  }
], Qa = [
  {
    title: "No Blending",
    value: Vn
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
    value: Zn
  },
  {
    title: "Multiply",
    value: Xn
  },
  {
    title: "Custom",
    value: Jn
  }
], ei = [
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
], ti = [
  {
    title: "Zero",
    valye: gn
  },
  {
    title: "One",
    valye: vn
  },
  {
    title: "Src Color",
    valye: bn
  },
  {
    title: "One Minus Src Color",
    valye: yn
  },
  {
    title: "Src Alpha",
    valye: xn
  },
  {
    title: "One Minus Src Alpha",
    valye: En
  },
  {
    title: "Dst Alpha",
    valye: Cn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Sn
  },
  {
    title: "Dst Color",
    valye: wn
  },
  {
    title: "One Minus Dst Color",
    valye: Mn
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
    valye: Tn
  },
  {
    title: "Constant Alpha",
    valye: _n
  },
  {
    title: "One Minus Constant Alpha",
    valye: Rn
  }
], ni = [
  {
    title: "Zero",
    valye: gn
  },
  {
    title: "One",
    valye: vn
  },
  {
    title: "Src Color",
    valye: bn
  },
  {
    title: "One Minus Src Color",
    valye: yn
  },
  {
    title: "Src Alpha",
    valye: xn
  },
  {
    title: "One Minus Src Alpha",
    valye: En
  },
  {
    title: "Dst Alpha",
    valye: Cn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Sn
  },
  {
    title: "Dst Color",
    valye: wn
  },
  {
    title: "One Minus Dst Color",
    valye: Mn
  },
  {
    title: "Constant Color",
    valye: On
  },
  {
    title: "One Minus Constant Color",
    valye: Tn
  },
  {
    title: "Constant Alpha",
    valye: _n
  },
  {
    title: "One Minus Constant Alpha",
    valye: Rn
  }
];
function dt(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ai(e, n, a, t) {
  return {
    type: "boolean",
    title: Tt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, o) => {
      t.updateObject(a.uuid, `material.${e}`, o), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const u = t.scene?.getObjectByProperty("uuid", a.uuid);
      u !== void 0 && V(u, `material.${e}`, o);
    }
  };
}
function ii(e, n, a, t) {
  const i = {
    type: "number",
    title: Tt(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (o, u) => {
      t.updateObject(a.uuid, `material.${e}`, u), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const c = t.scene?.getObjectByProperty("uuid", a.uuid);
      c !== void 0 && V(c, `material.${e}`, u);
    }
  };
  switch (e) {
    case "blending":
      dt(i, Qa);
      break;
    case "blendDst":
      dt(i, ni);
      break;
    case "blendEquation":
      dt(i, ei);
      break;
    case "blendSrc":
      dt(i, ti);
      break;
    case "side":
      dt(i, Ja);
      break;
  }
  return Un(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function ri(e, n, a, t) {
  const i = {
    type: "string",
    title: Tt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (u, c) => {
      t.updateObject(a.uuid, `material.${e}`, c), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const d = t.scene?.getObjectByProperty("uuid", a.uuid);
      d !== void 0 && V(d, `material.${e}`, c);
    },
    onKeyDown: (u) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (u, c) => {
    i.latest = c, t.updateObject(a.uuid, `material.${e}`, c);
    const d = t.scene?.getObjectByProperty("uuid", a.uuid);
    d !== void 0 && V(d, `material.${e}`, c);
  }, i.onKeyDown = (u) => {
    if (u.key === "Enter" && (u.altKey || u.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const c = t.scene?.getObjectByProperty("uuid", a.uuid);
      c !== void 0 && V(c, "material.needsUpdate", !0);
    }
  }), i;
}
function si(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function oi(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function ci(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function Lt(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function ht(e, n, a, t, i = "", o = !1) {
  const u = Tt(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), c = i.length > 0 ? `${i}.${e}` : e, d = typeof n;
  if (d === "boolean" || d === "string")
    return {
      title: u,
      prop: c,
      type: d,
      value: n,
      disabled: o,
      onChange: (h, f) => {
        t.updateObject(a.uuid, `material.${c}`, f);
        const m = t.scene?.getObjectByProperty("uuid", a.uuid);
        m !== void 0 && V(m, `material.${c}`, f);
      }
    };
  if (d === "number") {
    const h = {
      title: u,
      prop: c,
      type: "number",
      value: n,
      step: 0.01,
      disabled: o,
      onChange: (f, m) => {
        t.updateObject(a.uuid, `material.${c}`, m);
        const x = t.scene?.getObjectByProperty("uuid", a.uuid);
        x !== void 0 && V(x, `material.${c}`, m);
      }
    };
    return Un(u) && (h.type = "range", h.min = 0, h.max = 1), h;
  } else {
    if (n.isColor)
      return {
        title: u,
        prop: c,
        type: "color",
        value: n,
        disabled: o,
        onChange: (h, f) => {
          const m = new Bt(f);
          t.updateObject(a.uuid, `material.${c}`, m);
          const x = t.scene?.getObjectByProperty("uuid", a.uuid);
          x !== void 0 && V(x, `material.${c}`, m);
        }
      };
    if (Array.isArray(n)) {
      const h = [];
      for (const f in n) {
        const m = n[f], x = `[${f.toString()}]`;
        if (m.value !== void 0) {
          const M = ht(`${x}.value`, m.value, a, t, c, o);
          M !== void 0 && h.push(M);
        } else {
          const M = ht(x, m, a, t, c, o);
          M !== void 0 && h.push(M);
        }
      }
      if (h.length > 0)
        return Lt(h), {
          title: u,
          items: h
        };
    } else {
      if (si(n))
        return {
          title: u,
          prop: c,
          type: "vector2",
          value: n,
          disabled: o,
          onChange: (h, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && V(m, `material.${c}`, f);
          }
        };
      if (oi(n))
        return {
          title: u,
          prop: c,
          type: "grid3",
          value: n,
          disabled: o,
          onChange: (h, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && V(m, `material.${c}`, f);
          }
        };
      if (ci(n))
        return {
          title: u,
          prop: c,
          type: "grid4",
          value: n,
          disabled: o,
          onChange: (h, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && V(m, `material.${c}`, f);
          }
        };
      if (n.isEuler)
        return {
          title: u,
          prop: c,
          type: "euler",
          value: n,
          disabled: o,
          onChange: (h, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && V(m, `material.${c}`, f);
          }
        };
      if (n.src !== void 0)
        return {
          title: u,
          type: "image",
          value: n,
          disabled: o,
          onChange: (h, f) => {
            const m = Za(e), x = i.length > 0 ? `${i}.${m}` : m;
            t.createTexture(a.uuid, `material.${x}`, f);
            const M = t.scene?.getObjectByProperty("uuid", a.uuid);
            M !== void 0 && Ln(f).then((L) => {
              V(M, `material.${x}`, L), V(M, "material.needsUpdate", !0);
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
          onChange: (h, f) => {
            t.updateObject(a.uuid, `material.${c}`, f);
            const m = t.scene?.getObjectByProperty("uuid", a.uuid);
            m !== void 0 && V(m, `material.${c}`, f);
          }
        };
      {
        const h = [], f = e === "defines" || e === "extensions";
        try {
          for (const m in n) {
            const x = n[m];
            if (x !== void 0)
              if (x.value !== void 0) {
                const M = ht(`${m}.value`, x.value, a, t, c, f);
                M !== void 0 && h.push(M);
              } else {
                const M = ht(m, x, a, t, c, f);
                M !== void 0 && h.push(M);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (h.length > 0)
          return Lt(h), {
            title: u,
            items: h
          };
      }
    }
  }
}
function rn(e, n, a) {
  const t = [];
  for (const i in e) {
    if (!Ka(i))
      continue;
    const o = typeof e[i], u = e[i];
    if (o === "boolean")
      t.push(ai(i, u, n, a));
    else if (o === "number")
      t.push(ii(i, u, n, a));
    else if (o === "string")
      t.push(ri(i, u, n, a));
    else if (o === "object") {
      const c = ht(i, u, n, a);
      c !== void 0 && t.push(c);
    } else
      u !== void 0 && console.log("other:", i, o, u);
  }
  return Lt(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.scene?.getObjectByProperty("uuid", n.uuid);
      i !== void 0 && V(i, "material.needsUpdate", !0);
    }
  }), t;
}
function li(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let o = 0; o < i; o++)
      t.push(
        /* @__PURE__ */ l.jsx(
          Xe,
          {
            title: `Material ${o}`,
            items: rn(a[o], e, n)
          },
          `Material ${o}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
  } else
    return /* @__PURE__ */ l.jsx(
      Xe,
      {
        title: "Material",
        items: rn(a, e, n)
      }
    );
}
function ui(e) {
  const [n, a] = X(e.defaultValue);
  return _e(() => {
    let t = !1, i = -1, o = 0, u = e.defaultValue;
    const c = (x) => {
      t = !0, o = Number(e.input.current?.value), i = x.clientX, document.addEventListener("mouseup", h, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("contextmenu", h, !1);
    }, d = (x) => {
      if (!t)
        return;
      const M = e.step !== void 0 ? e.step : 1, L = (x.clientX - i) * M;
      u = Number((o + L).toFixed(4)), e.min !== void 0 && (u = Math.max(u, e.min)), e.max !== void 0 && (u = Math.min(u, e.max)), e.onChange !== void 0 && e.onChange(u), a(u);
    }, h = () => {
      t = !1, document.removeEventListener("mouseup", h), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", h);
    }, f = (x) => {
      const M = Number(x.target.value);
      a(M);
    }, m = (x) => {
      const M = Number(x.target.value);
      e.onChange !== void 0 && e.onChange(M), a(M);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", c, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", m), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", c), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", h), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", h);
    };
  }, []), n;
}
function Ze(e) {
  const n = q(null), a = q(null), t = ui({
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
function di(e) {
  const n = q(null), a = q(null), t = q(null), i = q(null), o = q(null), u = q(null), [c, d] = X(e.value), [h, f] = X({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [m, x] = X(!1);
  function M() {
    m || (window.addEventListener("mousemove", te), window.addEventListener("mouseup", L), window.addEventListener("mouseup", L), x(!0));
  }
  function L() {
    window.removeEventListener("mousemove", te), window.removeEventListener("mouseup", L), x(!1);
  }
  function te(I) {
    const K = o.current.getBoundingClientRect(), ne = Ke(0, 99, I.clientX - K.left) / 99, Se = Ke(0, 99, I.clientY - K.top) / 99, G = tn(en(h.min, h.max, ne), 3), pe = tn(en(h.min, h.max, Se), 3);
    e.onChange({ target: { value: { x: G, y: pe } } }), d({ x: G, y: pe });
  }
  function me(I) {
    let K = c.x, ne = c.y;
    I.target === n.current ? K = Number(I.target.value) : ne = Number(I.target.value), d({ x: K, y: ne });
  }
  function re() {
    const I = Number(t.current.value);
    f({ min: I, max: h.max }), (c.x < I || c.y < I) && d({ x: Ke(I, h.max, c.x), y: Ke(I, h.max, c.y) });
  }
  function z() {
    const I = Number(i.current.value);
    f({ min: h.min, max: I }), (c.x > I || c.y > I) && d({ x: Ke(h.min, I, c.x), y: Ke(h.min, I, c.y) });
  }
  return _e(() => {
    const I = Qt(h.min, h.max, c.x), K = Qt(h.min, h.max, c.y);
    u.current.style.left = `${I * 100}%`, u.current.style.top = `${K * 100}%`;
  }, [h, c]), /* @__PURE__ */ l.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: c.x,
            min: h.min,
            max: h.max,
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
            min: h.min,
            max: h.max,
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
            value: h.min,
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
            value: h.max,
            step: 0.01,
            onChange: z
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: o, onMouseDown: M, onMouseUp: L, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: u })
    ] })
  ] });
}
function sn(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = [];
  if (n) {
    const o = ie(() => e.value, []), u = (d, h) => {
      o[d] = h, e.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((d) => {
      const h = q(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: d.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Ze,
            {
              value: o[d],
              type: "number",
              prop: d,
              step: 0.01,
              labelRef: h,
              onChange: u
            }
          )
        ] }, d)
      );
    });
  } else if (a) {
    const o = ie(() => e.value, []), u = (d, h) => {
      o[d] = h, e.onChange({ target: { value: o } });
    };
    ["_x", "_y", "_z"].forEach((d) => {
      const h = q(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: d.substring(1).toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Ze,
            {
              value: o[d],
              type: "number",
              prop: d,
              step: 0.01,
              labelRef: h,
              onChange: u
            }
          )
        ] }, d)
      );
    });
  } else if (t) {
    const o = ie(() => e.value, []), u = (c, d) => {
      const h = Number(c);
      o.elements[h] = d, e.onChange({ target: { value: o } });
    };
    for (let c = 0; c < 9; c++) {
      const d = q(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: c + 1 }),
          /* @__PURE__ */ l.jsx(
            Ze,
            {
              value: o.elements[c],
              type: "number",
              prop: c.toString(),
              step: 0.01,
              labelRef: d,
              onChange: u
            }
          )
        ] }, c.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid3", children: i }, Math.random().toString());
}
function hi(e) {
  const n = e.value.x !== void 0, a = [];
  if (n) {
    const t = ie(() => e.value, []), i = (u, c) => {
      t[u] = c, e.onChange({ target: { value: t } });
    };
    ["x", "y", "z", "w"].forEach((u) => {
      const c = q(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: c, children: u.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Ze,
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
      const u = q(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: u, children: o + 1 }),
          /* @__PURE__ */ l.jsx(
            Ze,
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
function St(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = ka(e.value));
  const [a, t] = X(n), i = q(null), o = q(null), u = (f) => {
    let m = f.target.value;
    e.type === "boolean" ? m = f.target.checked : e.type === "option" && (m = e.options[m].value), t(m), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, m);
  }, c = {};
  e.disabled && (c.opacity = 0.8);
  const d = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = d || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${h ? "block" : ""}`, style: c, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Mt(e.title) }, "fieldLabel"),
    e.type === "string" && !d && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: u,
        value: a
      }
    ),
    e.type === "string" && d && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: u,
        onKeyDown: (f) => {
          e.onKeyDown !== void 0 && e.onKeyDown(f);
        },
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
      Ze,
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
      Ze,
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
    e.type === "image" && /* @__PURE__ */ l.jsx("img", { alt: e.title, ref: o, onClick: () => {
      Xa().then((f) => {
        o.current.src = f, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
      });
    }, src: a.src.length > 0 ? a.src : Va }),
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: u, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((f, m) => /* @__PURE__ */ l.jsx("option", { value: f.value, children: Mt(f.title) }, m)) }) }),
    e.type === "vector2" && /* @__PURE__ */ l.jsx(di, { value: a, min: 0, max: 1, onChange: u }),
    e.type === "grid3" && /* @__PURE__ */ l.jsx(sn, { value: a, onChange: u }),
    e.type === "grid4" && /* @__PURE__ */ l.jsx(hi, { value: a, onChange: u }),
    e.type === "euler" && /* @__PURE__ */ l.jsx(sn, { value: a, onChange: u })
  ] });
}
function on(e) {
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
function fi(e, n) {
  const a = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      a.push({
        title: on(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = n.scene?.getObjectByProperty("uuid", e.uuid);
          u !== void 0 && (V(u, i, o), u.updateProjectionMatrix());
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      a.push({
        title: on(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = n.scene?.getObjectByProperty("uuid", e.uuid);
          u !== void 0 && (V(u, i, o), u.updateProjectionMatrix());
        }
      });
  return /* @__PURE__ */ l.jsx(
    Xe,
    {
      title: "Camera",
      items: a
    }
  );
}
function mi(e, n) {
  const a = new ra();
  a.elements = e.matrix;
  const t = new Y(), i = new sa(), o = new Y();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const u = (c, d) => {
    const h = c === "rotation" ? { x: d._x, y: d._y, z: d._z } : d;
    n.updateObject(e.uuid, c, h);
    const f = n.scene?.getObjectByProperty("uuid", e.uuid);
    f !== void 0 && V(f, c, h);
  };
  return /* @__PURE__ */ l.jsx(
    Xe,
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
function cn(e) {
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
function pi(e, n) {
  const a = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const i = e.lightInfo[t];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: cn(t),
        prop: t,
        type: "color",
        value: i,
        onChange: (o, u) => {
          const c = new Bt(u);
          n.updateObject(e.uuid, o, c);
          const d = n.scene?.getObjectByProperty("uuid", e.uuid);
          d !== void 0 && V(d, o, c);
        }
      }) : a.push({
        title: cn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (o, u) => {
          n.updateObject(e.uuid, o, u);
          const c = n.scene?.getObjectByProperty("uuid", e.uuid);
          c !== void 0 && V(c, o, u);
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    Xe,
    {
      title: "Light",
      items: a
    }
  );
}
function gi(e, n) {
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
  return /* @__PURE__ */ l.jsx(Xe, { title: "Animation", items: a });
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
let he = { ...$n };
function vi(e) {
  const [n, a] = X(-1);
  _e(() => {
    function u(d) {
      he = { ...d.value }, a(Date.now());
    }
    function c() {
      he = { ...$n }, a(Date.now());
    }
    return j.addEventListener(D.SET_SCENE, c), j.addEventListener(D.SET_OBJECT, u), () => {
      j.removeEventListener(D.SET_SCENE, c), j.removeEventListener(D.SET_OBJECT, u);
    };
  }, []);
  const t = he.type.toLowerCase(), i = he.animations.length > 0 || he.mixer !== void 0, o = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(zt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: he.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        St,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: he.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        St,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: he.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        St,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: he.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      mi(he, e.three),
      i ? gi(he, e.three) : null,
      t.search("camera") > -1 ? fi(he, e.three) : null,
      t.search("light") > -1 ? pi(he, e.three) : null,
      o ? li(he, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Fi(e) {
  const [n, a] = X(e.scene);
  _e(() => {
    const o = (u) => {
      a(u.value);
    };
    return j.addEventListener(D.SET_SCENE, o), () => {
      j.removeEventListener(D.SET_SCENE, o);
    };
  }, []);
  const t = n !== null, i = "Hierarchy - " + (t ? `${n?.name}` : "No Scene");
  return /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ l.jsx(zt, { label: i, open: !0, children: /* @__PURE__ */ l.jsx(l.Fragment, { children: t && /* @__PURE__ */ l.jsx(Ya, { child: n, three: e.three }) }) }),
    /* @__PURE__ */ l.jsx(vi, { three: e.three })
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
    f !== void 0 && V(f, d, h);
  }, i = (c) => {
    if (!n())
      return;
    const d = c.value, { key: h, value: f, uuid: m } = d;
    t(m, h, f);
  }, o = (c) => {
    if (!n())
      return;
    const d = c.value;
    Ln(d.value).then((h) => {
      t(d.uuid, d.key, h), t(d.uuid, "material.needsUpdate", !0);
    });
  }, u = (c) => {
    if (!n())
      return;
    const { key: d, uuid: h, value: f, subitem: m } = c.value, x = e.three.scene?.getObjectByProperty("uuid", h);
    if (x !== void 0)
      try {
        m !== void 0 ? Na(x, m)[d](f) : x[d](f);
      } catch (M) {
        console.log("Error requesting method:"), console.log(M), console.log(d), console.log(f);
      }
  };
  return _e(() => (j.addEventListener(D.GET_OBJECT, a), j.addEventListener(D.UPDATE_OBJECT, i), j.addEventListener(D.CREATE_TEXTURE, o), j.addEventListener(D.REQUEST_METHOD, u), () => {
    j.removeEventListener(D.GET_OBJECT, a), j.removeEventListener(D.UPDATE_OBJECT, i), j.removeEventListener(D.CREATE_TEXTURE, o), j.removeEventListener(D.REQUEST_METHOD, u);
  }), []), null;
}
class bi extends oa {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new Vt();
    i.setAttribute("position", new qt(t, 3)), i.computeBoundingSphere();
    const o = new ca({ fog: !1 });
    super(i, o), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const u = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], c = new Vt();
    c.setAttribute("position", new qt(u, 3)), c.computeBoundingSphere(), this.add(new kn(c, new Pn({ side: mn, fog: !1 })));
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
const ln = { type: "change" }, Dt = { type: "start" }, un = { type: "end" }, xt = new la(), dn = new ua(), yi = Math.cos(70 * da.DEG2RAD);
class xi extends hn {
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
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(ln), t.update(), o = i.NONE;
    }, this.update = function() {
      const s = new Y(), y = new Kt().setFromUnitVectors(n.up, new Y(0, 1, 0)), _ = y.clone().invert(), A = new Y(), ee = new Kt(), ye = new Y(), ue = 2 * Math.PI;
      return function(vt = null) {
        const bt = t.object.position;
        s.copy(bt).sub(t.target), s.applyQuaternion(y), c.setFromVector3(s), t.autoRotate && o === i.NONE && ve(Re(vt)), t.enableDamping ? (c.theta += d.theta * t.dampingFactor, c.phi += d.phi * t.dampingFactor) : (c.theta += d.theta, c.phi += d.phi);
        let xe = t.minAzimuthAngle, Ee = t.maxAzimuthAngle;
        isFinite(xe) && isFinite(Ee) && (xe < -Math.PI ? xe += ue : xe > Math.PI && (xe -= ue), Ee < -Math.PI ? Ee += ue : Ee > Math.PI && (Ee -= ue), xe <= Ee ? c.theta = Math.max(xe, Math.min(Ee, c.theta)) : c.theta = c.theta > (xe + Ee) / 2 ? Math.max(xe, c.theta) : Math.min(Ee, c.theta)), c.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, c.phi)), c.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Ve = !1;
        if (t.zoomToCursor && Se || t.object.isOrthographicCamera)
          c.radius = De(c.radius);
        else {
          const Oe = c.radius;
          c.radius = De(c.radius * h), Ve = Oe != c.radius;
        }
        if (s.setFromSpherical(c), s.applyQuaternion(_), bt.copy(t.target).add(s), t.object.lookAt(t.target), t.enableDamping === !0 ? (d.theta *= 1 - t.dampingFactor, d.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (d.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && Se) {
          let Oe = null;
          if (t.object.isPerspectiveCamera) {
            const ze = s.length();
            Oe = De(ze * h);
            const et = ze - Oe;
            t.object.position.addScaledVector(K, et), t.object.updateMatrixWorld(), Ve = !!et;
          } else if (t.object.isOrthographicCamera) {
            const ze = new Y(ne.x, ne.y, 0);
            ze.unproject(t.object);
            const et = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), t.object.updateProjectionMatrix(), Ve = et !== t.object.zoom;
            const yt = new Y(ne.x, ne.y, 0);
            yt.unproject(t.object), t.object.position.sub(yt).add(ze), t.object.updateMatrixWorld(), Oe = s.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Oe !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Oe).add(t.object.position) : (xt.origin.copy(t.object.position), xt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(xt.direction)) < yi ? n.lookAt(t.target) : (dn.setFromNormalAndCoplanarPoint(t.object.up, t.target), xt.intersectPlane(dn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Oe = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), Oe !== t.object.zoom && (t.object.updateProjectionMatrix(), Ve = !0);
        }
        return h = 1, Se = !1, Ve || A.distanceToSquared(t.object.position) > u || 8 * (1 - ee.dot(t.object.quaternion)) > u || ye.distanceToSquared(t.target) > u ? (t.dispatchEvent(ln), A.copy(t.object.position), ee.copy(t.object.quaternion), ye.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Qe), t.domElement.removeEventListener("pointerdown", T), t.domElement.removeEventListener("pointercancel", W), t.domElement.removeEventListener("wheel", ft), t.domElement.removeEventListener("pointermove", F), t.domElement.removeEventListener("pointerup", W), t.domElement.getRootNode().removeEventListener("keydown", st, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ot), t._domElementKeyEvents = null);
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
    const u = 1e-6, c = new Zt(), d = new Zt();
    let h = 1;
    const f = new Y(), m = new fe(), x = new fe(), M = new fe(), L = new fe(), te = new fe(), me = new fe(), re = new fe(), z = new fe(), I = new fe(), K = new Y(), ne = new fe();
    let Se = !1;
    const G = [], pe = {};
    let oe = !1;
    function Re(s) {
      return s !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * s : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function ke(s) {
      const y = Math.abs(s * 0.01);
      return Math.pow(0.95, t.zoomSpeed * y);
    }
    function ve(s) {
      d.theta -= s;
    }
    function N(s) {
      d.phi -= s;
    }
    const be = function() {
      const s = new Y();
      return function(_, A) {
        s.setFromMatrixColumn(A, 0), s.multiplyScalar(-_), f.add(s);
      };
    }(), O = function() {
      const s = new Y();
      return function(_, A) {
        t.screenSpacePanning === !0 ? s.setFromMatrixColumn(A, 1) : (s.setFromMatrixColumn(A, 0), s.crossVectors(t.object.up, s)), s.multiplyScalar(_), f.add(s);
      };
    }(), we = function() {
      const s = new Y();
      return function(_, A) {
        const ee = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const ye = t.object.position;
          s.copy(ye).sub(t.target);
          let ue = s.length();
          ue *= Math.tan(t.object.fov / 2 * Math.PI / 180), be(2 * _ * ue / ee.clientHeight, t.object.matrix), O(2 * A * ue / ee.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (be(_ * (t.object.right - t.object.left) / t.object.zoom / ee.clientWidth, t.object.matrix), O(A * (t.object.top - t.object.bottom) / t.object.zoom / ee.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Pe(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? h /= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ae(s) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? h *= s : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function je(s, y) {
      if (!t.zoomToCursor)
        return;
      Se = !0;
      const _ = t.domElement.getBoundingClientRect(), A = s - _.left, ee = y - _.top, ye = _.width, ue = _.height;
      ne.x = A / ye * 2 - 1, ne.y = -(ee / ue) * 2 + 1, K.set(ne.x, ne.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function De(s) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, s));
    }
    function Ie(s) {
      m.set(s.clientX, s.clientY);
    }
    function Be(s) {
      je(s.clientX, s.clientX), re.set(s.clientX, s.clientY);
    }
    function Fe(s) {
      L.set(s.clientX, s.clientY);
    }
    function ae(s) {
      x.set(s.clientX, s.clientY), M.subVectors(x, m).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      ve(2 * Math.PI * M.x / y.clientHeight), N(2 * Math.PI * M.y / y.clientHeight), m.copy(x), t.update();
    }
    function Me(s) {
      z.set(s.clientX, s.clientY), I.subVectors(z, re), I.y > 0 ? Pe(ke(I.y)) : I.y < 0 && Ae(ke(I.y)), re.copy(z), t.update();
    }
    function He(s) {
      te.set(s.clientX, s.clientY), me.subVectors(te, L).multiplyScalar(t.panSpeed), we(me.x, me.y), L.copy(te), t.update();
    }
    function Ye(s) {
      je(s.clientX, s.clientY), s.deltaY < 0 ? Ae(ke(s.deltaY)) : s.deltaY > 0 && Pe(ke(s.deltaY)), t.update();
    }
    function le(s) {
      let y = !1;
      switch (s.code) {
        case t.keys.UP:
          s.ctrlKey || s.metaKey || s.shiftKey ? N(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, t.keyPanSpeed), y = !0;
          break;
        case t.keys.BOTTOM:
          s.ctrlKey || s.metaKey || s.shiftKey ? N(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, -t.keyPanSpeed), y = !0;
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
      if (G.length === 1)
        m.set(s.pageX, s.pageY);
      else {
        const y = $e(s), _ = 0.5 * (s.pageX + y.x), A = 0.5 * (s.pageY + y.y);
        m.set(_, A);
      }
    }
    function v(s) {
      if (G.length === 1)
        L.set(s.pageX, s.pageY);
      else {
        const y = $e(s), _ = 0.5 * (s.pageX + y.x), A = 0.5 * (s.pageY + y.y);
        L.set(_, A);
      }
    }
    function w(s) {
      const y = $e(s), _ = s.pageX - y.x, A = s.pageY - y.y, ee = Math.sqrt(_ * _ + A * A);
      re.set(0, ee);
    }
    function k(s) {
      t.enableZoom && w(s), t.enablePan && v(s);
    }
    function ge(s) {
      t.enableZoom && w(s), t.enableRotate && g(s);
    }
    function ce(s) {
      if (G.length == 1)
        x.set(s.pageX, s.pageY);
      else {
        const _ = $e(s), A = 0.5 * (s.pageX + _.x), ee = 0.5 * (s.pageY + _.y);
        x.set(A, ee);
      }
      M.subVectors(x, m).multiplyScalar(t.rotateSpeed);
      const y = t.domElement;
      ve(2 * Math.PI * M.x / y.clientHeight), N(2 * Math.PI * M.y / y.clientHeight), m.copy(x);
    }
    function C(s) {
      if (G.length === 1)
        te.set(s.pageX, s.pageY);
      else {
        const y = $e(s), _ = 0.5 * (s.pageX + y.x), A = 0.5 * (s.pageY + y.y);
        te.set(_, A);
      }
      me.subVectors(te, L).multiplyScalar(t.panSpeed), we(me.x, me.y), L.copy(te);
    }
    function E(s) {
      const y = $e(s), _ = s.pageX - y.x, A = s.pageY - y.y, ee = Math.sqrt(_ * _ + A * A);
      z.set(0, ee), I.set(0, Math.pow(z.y / re.y, t.zoomSpeed)), Pe(I.y), re.copy(z);
      const ye = (s.pageX + y.x) * 0.5, ue = (s.pageY + y.y) * 0.5;
      je(ye, ue);
    }
    function U(s) {
      t.enableZoom && E(s), t.enablePan && C(s);
    }
    function J(s) {
      t.enableZoom && E(s), t.enableRotate && ce(s);
    }
    function T(s) {
      t.enabled !== !1 && (G.length === 0 && (t.domElement.setPointerCapture(s.pointerId), t.domElement.addEventListener("pointermove", F), t.domElement.addEventListener("pointerup", W)), !kt(s) && (_t(s), s.pointerType === "touch" ? ct(s) : Ne(s)));
    }
    function F(s) {
      t.enabled !== !1 && (s.pointerType === "touch" ? pt(s) : Je(s));
    }
    function W(s) {
      switch (Rt(s), G.length) {
        case 0:
          t.domElement.releasePointerCapture(s.pointerId), t.domElement.removeEventListener("pointermove", F), t.domElement.removeEventListener("pointerup", W), t.dispatchEvent(un), o = i.NONE;
          break;
        case 1:
          const y = G[0], _ = pe[y];
          ct({ pointerId: y, pageX: _.x, pageY: _.y });
          break;
      }
    }
    function Ne(s) {
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
          Be(s), o = i.DOLLY;
          break;
        case nt.ROTATE:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enablePan === !1)
              return;
            Fe(s), o = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            Ie(s), o = i.ROTATE;
          }
          break;
        case nt.PAN:
          if (s.ctrlKey || s.metaKey || s.shiftKey) {
            if (t.enableRotate === !1)
              return;
            Ie(s), o = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Fe(s), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(Dt);
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
          He(s);
          break;
      }
    }
    function ft(s) {
      t.enabled === !1 || t.enableZoom === !1 || o !== i.NONE || (s.preventDefault(), t.dispatchEvent(Dt), Ye(mt(s)), t.dispatchEvent(un));
    }
    function mt(s) {
      const y = s.deltaMode, _ = {
        clientX: s.clientX,
        clientY: s.clientY,
        deltaY: s.deltaY
      };
      switch (y) {
        case 1:
          _.deltaY *= 16;
          break;
        case 2:
          _.deltaY *= 100;
          break;
      }
      return s.ctrlKey && !oe && (_.deltaY *= 10), _;
    }
    function st(s) {
      s.key === "Control" && (oe = !0, t.domElement.getRootNode().addEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function Ue(s) {
      s.key === "Control" && (oe = !1, t.domElement.getRootNode().removeEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function ot(s) {
      t.enabled === !1 || t.enablePan === !1 || le(s);
    }
    function ct(s) {
      switch (gt(s), G.length) {
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
      o !== i.NONE && t.dispatchEvent(Dt);
    }
    function pt(s) {
      switch (gt(s), o) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          ce(s), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          C(s), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          U(s), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          J(s), t.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function Qe(s) {
      t.enabled !== !1 && s.preventDefault();
    }
    function _t(s) {
      G.push(s.pointerId);
    }
    function Rt(s) {
      delete pe[s.pointerId];
      for (let y = 0; y < G.length; y++)
        if (G[y] == s.pointerId) {
          G.splice(y, 1);
          return;
        }
    }
    function kt(s) {
      for (let y = 0; y < G.length; y++)
        if (G[y] == s.pointerId)
          return !0;
      return !1;
    }
    function gt(s) {
      let y = pe[s.pointerId];
      y === void 0 && (y = new fe(), pe[s.pointerId] = y), y.set(s.pageX, s.pageY);
    }
    function $e(s) {
      const y = s.pointerId === G[0] ? G[1] : G[0];
      return pe[y];
    }
    t.domElement.addEventListener("contextmenu", Qe), t.domElement.addEventListener("pointerdown", T), t.domElement.addEventListener("pointercancel", W), t.domElement.addEventListener("wheel", ft, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", st, { passive: !0, capture: !0 }), this.update();
  }
}
function rt(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const wt = (e) => {
  const [n, a] = X(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (o) => {
    o !== n && (e.onSelect(o), a(o)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, qe = Ta(function(n, a) {
  const [t, i] = X(!1), o = n.options.indexOf(n.camera.name);
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
class Ei extends jn {
  constructor(n) {
    super({
      extensions: {
        // @ts-ignore
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
          value: n?.color !== void 0 ? n?.color : new Bt(16777215)
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
class Ci extends kn {
  gridMaterial;
  constructor() {
    const n = new Ei();
    super(new fa(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Si = `#include <common>
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
}`, wi = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Mi extends jn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Si,
      fragmentShader: wi
    });
  }
}
let Et = "Renderer", Te, Ct = !1, At = !1, H = null, se = null, Ge = null, We = null;
function $i(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", o = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", u = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", c = ie(() => /* @__PURE__ */ new Map(), []), d = ie(() => /* @__PURE__ */ new Map(), []), h = ie(() => /* @__PURE__ */ new Map(), []), f = ie(() => /* @__PURE__ */ new Map(), []), m = ie(() => new ma(), []), x = ie(() => new pa(), []), M = ie(() => new Ci(), []), L = ie(() => new Xt(500), []), te = ie(() => new Xt(100), []), me = ie(() => new ga(), []), re = ie(() => new va(), []), z = ie(() => new Mi(), []), I = ie(() => new Pn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function K(g, v) {
    const w = new Jt(-100, 100, 100, -100, 50, 5e3);
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
  ], G = q(null), pe = q(null), oe = q(null), Re = q(null), ke = q(null), ve = q(null), [N, be] = X(a !== null ? a : "Single"), [O, we] = X(null), [Pe, Ae] = X(!1), [je, De] = X(!1), [Ie, Be] = X(!1), [, Fe] = X(Date.now());
  localStorage.setItem(`${n}_mode`, N), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, o), localStorage.setItem(`${n}_brCam`, u);
  const ae = (g, v) => {
    const w = d.get(g.name);
    if (w !== void 0 && w.dispose(), d.delete(g.name), g.name === "UI")
      return;
    const k = new xi(g, v);
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
    d.set(g.name, k);
  }, Me = (g) => {
    const v = h.get(g.name);
    v !== void 0 && (m.remove(v), v.dispose(), h.delete(g.name));
    const w = d.get(g.name);
    w !== void 0 && (w.dispose(), d.delete(g.name));
  }, He = () => {
    d.forEach((g, v) => {
      g.dispose();
      const w = h.get(v);
      w !== void 0 && (m.remove(w), w.dispose()), h.delete(v), d.delete(v);
    }), d.clear(), h.clear();
  }, Ye = () => {
    switch (N) {
      case "Single":
        ae(H, oe.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(H, oe.current), ae(se, Re.current);
        break;
      case "Quad":
        ae(H, oe.current), ae(se, Re.current), ae(Ge, ke.current), ae(We, ve.current);
        break;
    }
  };
  _e(() => {
    const g = new ba({
      canvas: G.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, we(g);
  }, []), _e(() => {
    m.name = "Debug Scene", m.uuid = "", x.name = "helpers", m.add(x), x.add(M), L.name = "axisHelper", x.add(L), te.name = "interactionHelper", x.add(te), te.visible = !1, K("Top", new Y(0, 1e3, 0)), K("Bottom", new Y(0, -1e3, 0)), K("Left", new Y(-1e3, 0, 0)), K("Right", new Y(1e3, 0, 0)), K("Front", new Y(0, 0, 1e3)), K("Back", new Y(0, 0, -1e3)), K("Orthographic", new Y(1e3, 1e3, 1e3)), K("UI", new Y());
    const g = new Pt(60, 1, 50, 5e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), c.set("Debug", g), H = c.get(localStorage.getItem(`${n}_tlCam`)), se = c.get(localStorage.getItem(`${n}_trCam`)), Ge = c.get(localStorage.getItem(`${n}_blCam`)), We = c.get(localStorage.getItem(`${n}_brCam`));
  }, []), _e(() => {
    const g = () => {
      f.forEach((C) => {
        x.remove(C), C.dispose();
      }), f.clear();
    }, v = () => {
      Te.traverse((C) => {
        if (C.type.search("Light") > -1) {
          let E;
          switch (C.type) {
            case "DirectionalLight":
              E = new wa(C, 100), E.name = `${C.name}Helper`, f.set(C.name, E), x.add(E);
              break;
            case "HemisphereLight":
              E = new Sa(C, 250), E.name = `${C.name}Helper`, f.set(C.name, E), x.add(E);
              break;
            case "RectAreaLight":
              E = new bi(C), E.name = `${C.name}Helper`, f.set(C.name, E), x.add(E);
              break;
            case "PointLight":
              E = new Ca(C, 100), E.name = `${C.name}Helper`, f.set(C.name, E), x.add(E);
              break;
            case "SpotLight":
              E = new Ea(C), E.name = `${C.name}Helper`, f.set(C.name, E), x.add(E);
              break;
          }
        }
      });
    }, w = (C) => {
      x.add(L), g(), Ut(Te), m.remove(Te);
      const E = e.scenes.get(C.value.name);
      if (E !== void 0) {
        const U = new E();
        e.onSceneSet !== void 0 && e.onSceneSet(U), Te = U, e.three.scene = Te, m.add(Te), At = !0, v();
      }
    }, k = (C) => {
      const E = C.value, U = e.three.scene?.getObjectByProperty("uuid", E.uuid);
      if (U !== void 0 && c.set(E.name, U), U instanceof Pt) {
        const J = new xa(U);
        h.set(U.name, J), m.add(J);
      }
      Fe(Date.now());
    }, ge = (C) => {
      const E = h.get(C.value.name);
      E !== void 0 && (m.remove(E), E.dispose()), c.delete(C.value.name), Fe(Date.now());
    }, ce = (C) => {
      const E = Te.getObjectByProperty("uuid", C.value.uuid);
      E && E.add(L);
    };
    return j.addEventListener(D.SET_SCENE, w), j.addEventListener(D.ADD_CAMERA, k), j.addEventListener(D.REMOVE_CAMERA, ge), j.addEventListener(D.SET_OBJECT, ce), () => {
      j.removeEventListener(D.SET_SCENE, w), j.removeEventListener(D.ADD_CAMERA, k), j.removeEventListener(D.REMOVE_CAMERA, ge), j.removeEventListener(D.SET_OBJECT, ce);
    };
  }, []), _e(() => {
    if (O === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, w = Math.floor(g / 2), k = Math.floor(v / 2), ge = -1;
    const ce = () => {
      g = window.innerWidth - 300, v = window.innerHeight, w = Math.floor(g / 2), k = Math.floor(v / 2), e.three.resize(g, v), e.onSceneResize !== void 0 && At && e.onSceneResize(Te, g, v);
      let T = g, F = v;
      switch (N) {
        case "Side by Side":
          T = w, F = v;
          break;
        case "Stacked":
          T = g, F = k;
          break;
        case "Quad":
          T = w, F = k;
          break;
      }
      c.forEach((W) => {
        W instanceof Jt ? (W.left = T / -2, W.right = T / 2, W.top = F / 2, W.bottom = F / -2, W.name === "UI" && (W.position.x = g / 2, W.position.y = v / -2, W.position.z = 100), W.updateProjectionMatrix()) : W instanceof Pt && (W.aspect = T / F, W.updateProjectionMatrix(), h.get(W.name)?.update());
      });
    }, C = () => {
      O.setViewport(0, 0, g, v), O.setScissor(0, 0, g, v), O.render(m, H);
    }, E = () => {
      if (N === "Side by Side")
        O.setViewport(0, 0, w, v), O.setScissor(0, 0, w, v), O.render(m, H), O.setViewport(w, 0, w, v), O.setScissor(w, 0, w, v), O.render(m, se);
      else {
        const T = v - k;
        O.setViewport(0, T, g, k), O.setScissor(0, T, g, k), O.render(m, H), O.setViewport(0, 0, g, k), O.setScissor(0, 0, g, k), O.render(m, se);
      }
    }, U = () => {
      let T = 0, F = 0;
      F = v - k, T = 0, O.setViewport(T, F, w, k), O.setScissor(T, F, w, k), O.render(m, H), T = w, O.setViewport(T, F, w, k), O.setScissor(T, F, w, k), O.render(m, se), F = 0, T = 0, O.setViewport(T, F, w, k), O.setScissor(T, F, w, k), O.render(m, Ge), T = w, O.setViewport(T, F, w, k), O.setScissor(T, F, w, k), O.render(m, We);
    }, J = () => {
      switch (d.forEach((T) => {
        T.update();
      }), h.forEach((T) => {
        T.update();
      }), f.forEach((T) => {
        T.update !== void 0 && T.update();
      }), e.onSceneUpdate !== void 0 && At && e.onSceneUpdate(Te), O.clear(), N) {
        case "Single":
          C();
          break;
        case "Side by Side":
        case "Stacked":
          E();
          break;
        case "Quad":
          U();
          break;
      }
      ge = requestAnimationFrame(J);
    };
    return Ye(), window.addEventListener("resize", ce), ce(), J(), () => {
      window.removeEventListener("resize", ce), cancelAnimationFrame(ge), ge = -1;
    };
  }, [N, O]), _e(() => {
    if (O !== null) {
      const g = new ya(), v = new fe(), w = (C, E, U, J) => {
        switch (N) {
          case "Quad":
            C < U ? E < J ? g.setFromCamera(v, H) : g.setFromCamera(v, Ge) : E < J ? g.setFromCamera(v, se) : g.setFromCamera(v, We);
            break;
          case "Side by Side":
            C < U ? g.setFromCamera(v, H) : g.setFromCamera(v, se);
            break;
          case "Single":
            g.setFromCamera(v, H);
            break;
          case "Stacked":
            E < J ? g.setFromCamera(v, H) : g.setFromCamera(v, se);
            break;
        }
      }, k = (C) => {
        if (!Ct)
          return;
        const E = new fe();
        O.getSize(E);
        const U = Math.min(C.clientX, E.x), J = Math.min(C.clientY, E.y);
        v.x = rt(U, 0, E.x, -1, 1), v.y = rt(J, 0, E.y, 1, -1);
        const T = E.x / 2, F = E.y / 2, W = () => {
          U < T ? v.x = rt(U, 0, T, -1, 1) : v.x = rt(U, T, E.x, -1, 1);
        }, Ne = () => {
          J < F ? v.y = rt(J, 0, F, 1, -1) : v.y = rt(J, F, E.y, 1, -1);
        };
        switch (N) {
          case "Quad":
            W(), Ne();
            break;
          case "Side by Side":
            W();
            break;
          case "Stacked":
            Ne(), Ne();
            break;
        }
        w(U, J, T, F);
        const Je = g.intersectObjects(Te.children);
        Je.length > 0 && te.position.copy(Je[0].point);
      }, ge = (C) => {
        if (!Ct)
          return;
        const E = new fe();
        if (O.getSize(E), C.clientX >= E.x)
          return;
        k(C);
        const U = g.intersectObjects(Te.children);
        U.length > 0 && e.three.getObject(U[0].object.uuid);
      }, ce = pe.current;
      return ce.addEventListener("mousemove", k, !1), ce.addEventListener("click", ge, !1), () => {
        ce.removeEventListener("mousemove", k), ce.removeEventListener("click", ge);
      };
    }
  }, [N, O]);
  const le = [];
  return c.forEach((g, v) => {
    le.push(v);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: G }),
    O !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${N === "Single" || N === "Stacked" ? "single" : ""}`, ref: pe, children: [
        N === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(qe, { camera: H, options: le, ref: oe, onSelect: (g) => {
          d.get(H.name)?.dispose();
          const v = c.get(g);
          v !== void 0 && (Me(H), H = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, oe.current));
        } }) }),
        (N === "Side by Side" || N === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(qe, { camera: H, options: le, ref: oe, onSelect: (g) => {
            d.get(H.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(H), H = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, oe.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: se, options: le, ref: Re, onSelect: (g) => {
            d.get(se.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(se), se = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, Re.current));
          } })
        ] }),
        N === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(qe, { camera: H, options: le, ref: oe, onSelect: (g) => {
            d.get(H.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(H), H = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, oe.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: se, options: le, ref: Re, onSelect: (g) => {
            d.get(se.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(se), se = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, Re.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: Ge, options: le, ref: ke, onSelect: (g) => {
            d.get(Ge.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(Ge), Ge = v, localStorage.setItem(`${n}_blCam`, v.name), ae(v, ke.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: We, options: le, ref: ve, onSelect: (g) => {
            d.get(We.name)?.dispose();
            const v = c.get(g);
            v !== void 0 && (Me(We), We = v, localStorage.setItem(`${n}_brCam`, v.name), ae(v, ve.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: Se.indexOf(N),
            options: Se,
            onSelect: (g) => {
              g !== N && (He(), be(g));
            },
            open: Pe,
            onToggle: (g) => {
              Ae(g), je && De(!1), Ie && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: ne.indexOf(Et),
            options: ne,
            onSelect: (g) => {
              if (g !== Et)
                switch (Et = g, Et) {
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
                    m.overrideMaterial = I;
                    break;
                  case "UVs":
                    m.overrideMaterial = z;
                    break;
                }
            },
            open: je,
            onToggle: (g) => {
              Pe && Ae(!1), De(g), Ie && Be(!1);
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
              Ct = g === "Selection Mode", te.visible = Ct;
            },
            open: Ie,
            onToggle: (g) => {
              Pe && Ae(!1), je && De(!1), Be(g);
            }
          }
        )
      ] })
    ] })
  ] });
}
function zi(e) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  zt as Accordion,
  Di as Application,
  Ot as BaseRemote,
  Fn as ChildObject,
  Ya as ContainerObject,
  Ga as Draggable,
  za as DraggableItem,
  Wa as Dropdown,
  Ha as DropdownItem,
  zi as Editor,
  vi as Inspector,
  $i as MultiView,
  Bn as NavButton,
  Ai as RemoteComponents,
  Bi as RemoteController,
  $t as RemoteTheatre,
  Ni as RemoteThree,
  Li as RemoteTweakpane,
  Ui as SceneInspector,
  Fi as SidePanel,
  D as ToolEvents,
  Mt as capitalize,
  Ke as clamp,
  ka as colorToHex,
  j as debugDispatcher,
  ki as defaultTheatreCallback,
  Ut as dispose,
  ja as disposeMaterial,
  ji as disposeTexture,
  Pi as distance,
  In as hierarchyUUID,
  Ra as isColor,
  en as mix,
  Ft as noop,
  Qt as normalize,
  _a as randomID,
  Pa as resetThreeObjects,
  tn as round,
  Ii as theatreEditorApp,
  It as totalThreeObjects
};
