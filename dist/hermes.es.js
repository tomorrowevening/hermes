import { EventDispatcher as pn, Texture as gn, CubeTexture as Hn, RepeatWrapping as qt, WebGLRenderTarget as Vn, Color as $t, FrontSide as Yn, BackSide as vn, DoubleSide as bn, NoBlending as qn, NormalBlending as Kn, AdditiveBlending as Zn, SubtractiveBlending as Xn, MultiplyBlending as Jn, CustomBlending as Qn, AddEquation as ea, SubtractEquation as ta, ReverseSubtractEquation as na, MinEquation as aa, MaxEquation as ia, ZeroFactor as yn, OneFactor as En, SrcColorFactor as xn, OneMinusSrcColorFactor as Sn, SrcAlphaFactor as Cn, OneMinusSrcAlphaFactor as wn, DstAlphaFactor as Mn, OneMinusDstAlphaFactor as On, DstColorFactor as Tn, OneMinusDstColorFactor as _n, SrcAlphaSaturateFactor as ra, ConstantColorFactor as Rn, OneMinusConstantColorFactor as kn, ConstantAlphaFactor as Dn, OneMinusConstantAlphaFactor as Pn, Matrix4 as sa, Vector3 as V, Euler as oa, Line as ca, BufferGeometry as Kt, Float32BufferAttribute as Zt, LineBasicMaterial as la, Mesh as An, MeshBasicMaterial as In, Ray as ua, Plane as da, MathUtils as ha, MOUSE as nt, TOUCH as at, Quaternion as Xt, Spherical as Jt, Vector2 as fe, ShaderMaterial as jn, GLSL3 as fa, PlaneGeometry as ma, Scene as pa, Group as ga, AxesHelper as Qt, MeshDepthMaterial as va, MeshNormalMaterial as ba, WebGLRenderer as ya, PerspectiveCamera as At, Raycaster as Ea, OrthographicCamera as en, CameraHelper as xa, SpotLightHelper as Sa, PointLightHelper as Ca, HemisphereLightHelper as wa, DirectionalLightHelper as Ma } from "three";
import { Pane as Oa } from "tweakpane";
import * as Ta from "@tweakpane/plugin-essentials";
import Nn, { useState as q, useRef as K, useEffect as _e, useMemo as ie, forwardRef as _a } from "react";
import { Reorder as Ln } from "framer-motion";
const zt = () => {
}, ki = () => {
};
function Tt(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Ke(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function tn(e, n, a) {
  return (a - e) / (n - e);
}
function nn(e, n, a) {
  return e * (1 - a) + n * a;
}
function Di(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function Ra() {
  return Math.round(Math.random() * 1e6).toString();
}
function ka(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Da(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), i = (d) => {
    const h = d.toString(16);
    return h.length === 1 ? "0" + h : h;
  }, c = i(n), l = i(a), r = i(t);
  return "#" + c + l + r;
}
function an(e, n = 1) {
  return Number(e.toFixed(n));
}
let Lt = 0;
const rn = () => {
  Lt = 0;
}, Bt = (e) => {
  if (!e)
    return;
  let n = e.name.replace(" ", "");
  n.length === 0 && (n = `obj_${Lt}`, Lt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((a) => {
    Bt(a);
  });
}, Pi = (e) => {
  e?.dispose();
}, Pa = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, ft = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : ft(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), Pa(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class Ai {
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
const R = new pn(), k = {
  CUSTOM: "ToolEvents::custom",
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  ADD_SCENE: "ToolEvents::addScene",
  REMOVE_SCENE: "ToolEvents::removeScene",
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
        R.dispatchEvent({ type: k.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        R.dispatchEvent({ type: k.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Gt extends _t {
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
  sheetObject(n, a, t, i, c) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const l = this.sheet(n, c);
    if (l === void 0)
      return;
    const d = `${this.getSheetInstance(n, c)}_${a}`;
    let h = this.sheetObjects.get(d);
    h !== void 0 ? h = l.object(a, { ...t, ...h.value }, { reconfigure: !0 }) : h = l.object(a, t), this.sheetObjects.set(d, h), this.sheetObjectCBs.set(d, i !== void 0 ? i : zt);
    const m = h.onValuesChange((f) => {
      if (this.app.editor) {
        for (const S in f) {
          const D = f[S];
          typeof D == "object" && ka(D) && (f[S] = {
            r: D.r,
            g: D.g,
            b: D.b,
            a: D.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: n,
            sheetObject: d,
            values: f
          }
        });
      }
      const b = this.sheetObjectCBs.get(d);
      b !== void 0 && b(f);
    });
    return this.sheetObjectUnsubscribe.set(d, m), h;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(a)?.detachObject(t);
    const c = `${a}_${t}`, l = this.sheetObjectUnsubscribe.get(c);
    l !== void 0 && (this.sheetObjects.delete(c), this.sheetObjectCBs.delete(c), this.sheetObjectUnsubscribe.delete(c), l());
  }
  handleApp(n, a, t) {
    const i = a;
    let c;
    switch (t.event) {
      case "setSheet":
        c = i.sheets.get(t.data.sheet), c !== void 0 && (i.activeSheet = c, this.studio?.setSelection([c]));
        break;
      case "setSheetObject":
        c = i.sheetObjects.get(`${t.data.sheet}_${t.data.key}`), c !== void 0 && this.studio?.setSelection([c]);
        break;
      case "updateSheetObject":
        c = i.sheets.get(t.data.sheet), c !== void 0 && c.sequence.pause(), c = i.sheetObjectCBs.get(t.data.sheetObject), c !== void 0 && c(t.data.values);
        break;
      case "updateTimeline":
        c = i.sheets.get(t.data.sheet), i.activeSheet !== void 0 && (i.activeSheet.sequence.position = t.data.position);
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
      this.studio?.ui.restore(), this.studio?.onSelectionChange((l) => {
        l.length < 1 || l.forEach((r) => {
          let d = r.address.sheetId, h = "setSheet", m = {};
          switch (r.type) {
            case "Theatre_Sheet_PublicAPI":
              h = "setSheet", m = {
                sheet: r.address.sheetId
              }, a.activeSheet = a.sheets.get(r.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              h = "setSheetObject", d += `_${r.address.objectKey}`, m = {
                id: d,
                sheet: r.address.sheetId,
                key: r.address.objectKey
              }, a.activeSheet = a.sheets.get(r.address.sheetId);
              break;
          }
          n.send({ event: h, target: "app", data: m });
        });
      });
      let t = -1;
      const i = () => {
        if (Gt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
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
      }, c = () => {
        i(), requestAnimationFrame(c);
      };
      i(), c();
    } else
      this.studio?.ui.hide();
  }
}
function ji(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((l) => {
      l.length < 1 || l.forEach((r) => {
        let d = r.address.sheetId, h = "setSheet", m = {};
        switch (r.type) {
          case "Theatre_Sheet_PublicAPI":
            h = "setSheet", m = {
              sheet: r.address.sheetId
            }, n.activeSheet = n.sheets.get(r.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            h = "setSheetObject", d += `_${r.address.objectKey}`, m = {
              id: d,
              sheet: r.address.sheetId,
              key: r.address.objectKey
            }, n.activeSheet = n.sheets.get(r.address.sheetId);
            break;
        }
        e.send({ event: h, target: "app", data: m });
      });
    });
    let t = -1;
    const i = () => {
      if (Gt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
    }, c = () => {
      i(), requestAnimationFrame(c);
    };
    i(), c();
  } else
    a.ui.hide();
}
function Aa(e) {
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
function wt(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((a) => {
    n.children.push(wt(a));
  }), n;
}
function Ia(e) {
  const n = {};
  for (const a in e) {
    const t = e[a].value;
    n[a] = { value: t }, t === null ? n[a].value = { src: "" } : t.isTexture && (n[a].value = { src: t.image.src });
  }
  return n;
}
function ja(e) {
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
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || ja(a))
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
            if (i instanceof gn) {
              const c = i.source.toJSON();
              n[a] = { src: c.url };
            } else
              i instanceof Hn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = { src: "" });
          else
            a === "uniforms" && (n[a] = Ia(n[a]));
        else
          n[a] = { src: "" };
        break;
    }
  }
  return n;
}
function It(e) {
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
    lightInfo: void 0,
    children: []
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
      t.material.forEach((c) => {
        i.push(it(c));
      }), n.material = i;
    } else
      n.material = it(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((c) => {
        i.push(it(c));
      }), n.material = i;
    } else
      n.material = it(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((c) => {
        i.push(it(c));
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
function Y(e, n, a) {
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
    let l;
    switch (i) {
      case 1:
        l = e[t[0]];
        break;
      case 2:
        l = e[t[0]][t[1]];
        break;
      case 3:
        l = e[t[0]][t[1]][t[2]];
        break;
      case 4:
        l = e[t[0]][t[1]][t[2]][t[3]];
        break;
      case 5:
        l = e[t[0]][t[1]][t[2]][t[3]][t[4]];
        break;
    }
    l != null && La(l, a);
  }
}
function Bn(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const i = new gn(t);
      i.wrapS = qt, i.wrapT = qt, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Ni extends _t {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((n) => {
      ft(n);
    }), this.scenes.clear(), this.scene && ft(this.scene), this.renderTargets.forEach((n) => {
      n.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(n) {
    this.app.debugEnabled && this.app.send({
      event: "getObject",
      target: "app",
      data: n
    });
  }
  setObject(n) {
    const a = It(n);
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
  addScene(n) {
    if (n === void 0 || (this.scenes.set(n.name, n), !this.app.debugEnabled))
      return;
    rn(), Bt(n);
    const a = wt(n);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: a
    });
  }
  removeScene(n) {
    if (n === void 0)
      return;
    const a = n.name, t = this.scenes.get(a);
    if (this.scenes.delete(n.name), ft(t), !this.app.debugEnabled)
      return;
    const i = wt(n);
    this.app.send({
      event: "removeScene",
      target: "editor",
      data: i
    });
  }
  removeAllScenes() {
    this.scenes.forEach((n) => this.removeScene(n));
  }
  getScene(n) {
    let a = null;
    return this.scenes.forEach((t) => {
      n.search(t.uuid) > -1 && (a = t);
    }), a;
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    rn(), Bt(n);
    const a = wt(n);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = It(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = It(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
  handleApp(n, a, t) {
    switch (t.event) {
      case "getObject":
        R.dispatchEvent({ type: k.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        R.dispatchEvent({ type: k.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        R.dispatchEvent({ type: k.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        R.dispatchEvent({ type: k.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        R.dispatchEvent({ type: k.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        R.dispatchEvent({ type: k.ADD_SCENE, value: t.data });
        break;
      case "removeScene":
        R.dispatchEvent({ type: k.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        R.dispatchEvent({ type: k.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        R.dispatchEvent({ type: k.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        R.dispatchEvent({ type: k.REMOVE_CAMERA, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(n, a) {
    const t = new Vn(32, 32, a);
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
class Li extends _t {
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
    this.pane = new Oa({ title: "GUI" }), this.pane.registerPlugin(Ta);
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
    const c = this.bindID, l = t.onChange !== void 0 ? t.onChange : zt;
    this.bindCBs.set(c, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, t).on("change", (d) => {
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
var Ft = { exports: {} }, lt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sn;
function Ba() {
  if (sn)
    return lt;
  sn = 1;
  var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(r, d, h) {
    var m, f = {}, b = null, S = null;
    h !== void 0 && (b = "" + h), d.key !== void 0 && (b = "" + d.key), d.ref !== void 0 && (S = d.ref);
    for (m in d)
      t.call(d, m) && !c.hasOwnProperty(m) && (f[m] = d[m]);
    if (r && r.defaultProps)
      for (m in d = r.defaultProps, d)
        f[m] === void 0 && (f[m] = d[m]);
    return { $$typeof: n, type: r, key: b, ref: S, props: f, _owner: i.current };
  }
  return lt.Fragment = a, lt.jsx = l, lt.jsxs = l, lt;
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
var on;
function Fa() {
  return on || (on = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), r = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), D = Symbol.iterator, J = "@@iterator";
    function me(s) {
      if (s === null || typeof s != "object")
        return null;
      var p = D && s[D] || s[J];
      return typeof p == "function" ? p : null;
    }
    var re = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function z(s) {
      {
        for (var p = arguments.length, y = new Array(p > 1 ? p - 1 : 0), w = 1; w < p; w++)
          y[w - 1] = arguments[w];
        N("error", s, y);
      }
    }
    function N(s, p, y) {
      {
        var w = re.ReactDebugCurrentFrame, B = w.getStackAddendum();
        B !== "" && (p += "%s", y = y.concat([B]));
        var $ = y.map(function(I) {
          return String(I);
        });
        $.unshift("Warning: " + p), Function.prototype.apply.call(console[s], console, $);
      }
    }
    var Z = !1, ne = !1, Ce = !1, G = !1, pe = !1, oe;
    oe = Symbol.for("react.module.reference");
    function Re(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === t || s === c || pe || s === i || s === h || s === m || G || s === S || Z || ne || Ce || typeof s == "object" && s !== null && (s.$$typeof === b || s.$$typeof === f || s.$$typeof === l || s.$$typeof === r || s.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === oe || s.getModuleId !== void 0));
    }
    function ke(s, p, y) {
      var w = s.displayName;
      if (w)
        return w;
      var B = p.displayName || p.name || "";
      return B !== "" ? y + "(" + B + ")" : y;
    }
    function ve(s) {
      return s.displayName || "Context";
    }
    function L(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && z("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case t:
          return "Fragment";
        case a:
          return "Portal";
        case c:
          return "Profiler";
        case i:
          return "StrictMode";
        case h:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case r:
            var p = s;
            return ve(p) + ".Consumer";
          case l:
            var y = s;
            return ve(y._context) + ".Provider";
          case d:
            return ke(s, s.render, "ForwardRef");
          case f:
            var w = s.displayName || null;
            return w !== null ? w : L(s.type) || "Memo";
          case b: {
            var B = s, $ = B._payload, I = B._init;
            try {
              return L(I($));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var be = Object.assign, O = 0, we, De, Ie, Pe, Ae, je, Be;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function ae() {
      {
        if (O === 0) {
          we = console.log, De = console.info, Ie = console.warn, Pe = console.error, Ae = console.group, je = console.groupCollapsed, Be = console.groupEnd;
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
        O++;
      }
    }
    function Me() {
      {
        if (O--, O === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: be({}, s, {
              value: we
            }),
            info: be({}, s, {
              value: De
            }),
            warn: be({}, s, {
              value: Ie
            }),
            error: be({}, s, {
              value: Pe
            }),
            group: be({}, s, {
              value: Ae
            }),
            groupCollapsed: be({}, s, {
              value: je
            }),
            groupEnd: be({}, s, {
              value: Be
            })
          });
        }
        O < 0 && z("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var He = re.ReactCurrentDispatcher, Ve;
    function le(s, p, y) {
      {
        if (Ve === void 0)
          try {
            throw Error();
          } catch (B) {
            var w = B.stack.trim().match(/\n( *(at )?)/);
            Ve = w && w[1] || "";
          }
        return `
` + Ve + s;
      }
    }
    var g = !1, v;
    {
      var M = typeof WeakMap == "function" ? WeakMap : Map;
      v = new M();
    }
    function A(s, p) {
      if (!s || g)
        return "";
      {
        var y = v.get(s);
        if (y !== void 0)
          return y;
      }
      var w;
      g = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $;
      $ = He.current, He.current = null, ae();
      try {
        if (p) {
          var I = function() {
            throw Error();
          };
          if (Object.defineProperty(I.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(I, []);
            } catch (Le) {
              w = Le;
            }
            Reflect.construct(s, [], I);
          } else {
            try {
              I.call();
            } catch (Le) {
              w = Le;
            }
            s.call(I.prototype);
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
          for (var P = Le.stack.split(`
`), de = w.stack.split(`
`), X = P.length - 1, ee = de.length - 1; X >= 1 && ee >= 0 && P[X] !== de[ee]; )
            ee--;
          for (; X >= 1 && ee >= 0; X--, ee--)
            if (P[X] !== de[ee]) {
              if (X !== 1 || ee !== 1)
                do
                  if (X--, ee--, ee < 0 || P[X] !== de[ee]) {
                    var Se = `
` + P[X].replace(" at new ", " at ");
                    return s.displayName && Se.includes("<anonymous>") && (Se = Se.replace("<anonymous>", s.displayName)), typeof s == "function" && v.set(s, Se), Se;
                  }
                while (X >= 1 && ee >= 0);
              break;
            }
        }
      } finally {
        g = !1, He.current = $, Me(), Error.prepareStackTrace = B;
      }
      var tt = s ? s.displayName || s.name : "", Yt = tt ? le(tt) : "";
      return typeof s == "function" && v.set(s, Yt), Yt;
    }
    function ge(s, p, y) {
      return A(s, !1);
    }
    function ce(s) {
      var p = s.prototype;
      return !!(p && p.isReactComponent);
    }
    function C(s, p, y) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return A(s, ce(s));
      if (typeof s == "string")
        return le(s);
      switch (s) {
        case h:
          return le("Suspense");
        case m:
          return le("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case d:
            return ge(s.render);
          case f:
            return C(s.type, p, y);
          case b: {
            var w = s, B = w._payload, $ = w._init;
            try {
              return C($(B), p, y);
            } catch {
            }
          }
        }
      return "";
    }
    var x = Object.prototype.hasOwnProperty, U = {}, Q = re.ReactDebugCurrentFrame;
    function T(s) {
      if (s) {
        var p = s._owner, y = C(s.type, s._source, p ? p.type : null);
        Q.setExtraStackFrame(y);
      } else
        Q.setExtraStackFrame(null);
    }
    function F(s, p, y, w, B) {
      {
        var $ = Function.call.bind(x);
        for (var I in s)
          if ($(s, I)) {
            var P = void 0;
            try {
              if (typeof s[I] != "function") {
                var de = Error((w || "React class") + ": " + y + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw de.name = "Invariant Violation", de;
              }
              P = s[I](p, I, w, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (X) {
              P = X;
            }
            P && !(P instanceof Error) && (T(B), z("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", y, I, typeof P), T(null)), P instanceof Error && !(P.message in U) && (U[P.message] = !0, T(B), z("Failed %s type: %s", y, P.message), T(null));
          }
      }
    }
    var W = Array.isArray;
    function Ne(s) {
      return W(s);
    }
    function Je(s) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, y = p && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return y;
      }
    }
    function mt(s) {
      try {
        return pt(s), !1;
      } catch {
        return !0;
      }
    }
    function pt(s) {
      return "" + s;
    }
    function st(s) {
      if (mt(s))
        return z("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(s)), pt(s);
    }
    var Ue = re.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ct, gt, Qe;
    Qe = {};
    function kt(s) {
      if (x.call(s, "ref")) {
        var p = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Dt(s) {
      if (x.call(s, "key")) {
        var p = Object.getOwnPropertyDescriptor(s, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function Pt(s, p) {
      if (typeof s.ref == "string" && Ue.current && p && Ue.current.stateNode !== p) {
        var y = L(Ue.current.type);
        Qe[y] || (z('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', L(Ue.current.type), s.ref), Qe[y] = !0);
      }
    }
    function vt(s, p) {
      {
        var y = function() {
          ct || (ct = !0, z("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        y.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: y,
          configurable: !0
        });
      }
    }
    function $e(s, p) {
      {
        var y = function() {
          gt || (gt = !0, z("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        y.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: y,
          configurable: !0
        });
      }
    }
    var Ht = function(s, p, y, w, B, $, I) {
      var P = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: p,
        ref: y,
        props: I,
        // Record the component responsible for creating this element.
        _owner: $
      };
      return P._store = {}, Object.defineProperty(P._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(P, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(P, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
    };
    function o(s, p, y, w, B) {
      {
        var $, I = {}, P = null, de = null;
        y !== void 0 && (st(y), P = "" + y), Dt(p) && (st(p.key), P = "" + p.key), kt(p) && (de = p.ref, Pt(p, B));
        for ($ in p)
          x.call(p, $) && !ot.hasOwnProperty($) && (I[$] = p[$]);
        if (s && s.defaultProps) {
          var X = s.defaultProps;
          for ($ in X)
            I[$] === void 0 && (I[$] = X[$]);
        }
        if (P || de) {
          var ee = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          P && vt(I, ee), de && $e(I, ee);
        }
        return Ht(s, P, de, B, w, Ue.current, I);
      }
    }
    var E = re.ReactCurrentOwner, _ = re.ReactDebugCurrentFrame;
    function j(s) {
      if (s) {
        var p = s._owner, y = C(s.type, s._source, p ? p.type : null);
        _.setExtraStackFrame(y);
      } else
        _.setExtraStackFrame(null);
    }
    var te;
    te = !1;
    function ye(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function ue() {
      {
        if (E.current) {
          var s = L(E.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function Vt(s) {
      {
        if (s !== void 0) {
          var p = s.fileName.replace(/^.*[\\\/]/, ""), y = s.lineNumber;
          return `

Check your code at ` + p + ":" + y + ".";
        }
        return "";
      }
    }
    var bt = {};
    function yt(s) {
      {
        var p = ue();
        if (!p) {
          var y = typeof s == "string" ? s : s.displayName || s.name;
          y && (p = `

Check the top-level render call using <` + y + ">.");
        }
        return p;
      }
    }
    function Ee(s, p) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var y = yt(p);
        if (bt[y])
          return;
        bt[y] = !0;
        var w = "";
        s && s._owner && s._owner !== E.current && (w = " It was passed a child from " + L(s._owner.type) + "."), j(s), z('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, w), j(null);
      }
    }
    function xe(s, p) {
      {
        if (typeof s != "object")
          return;
        if (Ne(s))
          for (var y = 0; y < s.length; y++) {
            var w = s[y];
            ye(w) && Ee(w, p);
          }
        else if (ye(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var B = me(s);
          if (typeof B == "function" && B !== s.entries)
            for (var $ = B.call(s), I; !(I = $.next()).done; )
              ye(I.value) && Ee(I.value, p);
        }
      }
    }
    function Ye(s) {
      {
        var p = s.type;
        if (p == null || typeof p == "string")
          return;
        var y;
        if (typeof p == "function")
          y = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === f))
          y = p.propTypes;
        else
          return;
        if (y) {
          var w = L(p);
          F(y, s.props, "prop", w, s);
        } else if (p.PropTypes !== void 0 && !te) {
          te = !0;
          var B = L(p);
          z("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && z("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(s) {
      {
        for (var p = Object.keys(s.props), y = 0; y < p.length; y++) {
          var w = p[y];
          if (w !== "children" && w !== "key") {
            j(s), z("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), j(null);
            break;
          }
        }
        s.ref !== null && (j(s), z("Invalid attribute `ref` supplied to `React.Fragment`."), j(null));
      }
    }
    function ze(s, p, y, w, B, $) {
      {
        var I = Re(s);
        if (!I) {
          var P = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var de = Vt(B);
          de ? P += de : P += ue();
          var X;
          s === null ? X = "null" : Ne(s) ? X = "array" : s !== void 0 && s.$$typeof === n ? (X = "<" + (L(s.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : X = typeof s, z("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", X, P);
        }
        var ee = o(s, p, y, B, $);
        if (ee == null)
          return ee;
        if (I) {
          var Se = p.children;
          if (Se !== void 0)
            if (w)
              if (Ne(Se)) {
                for (var tt = 0; tt < Se.length; tt++)
                  xe(Se[tt], s);
                Object.freeze && Object.freeze(Se);
              } else
                z("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              xe(Se, s);
        }
        return s === t ? Oe(ee) : Ye(ee), ee;
      }
    }
    function et(s, p, y) {
      return ze(s, p, y, !0);
    }
    function Et(s, p, y) {
      return ze(s, p, y, !1);
    }
    var Gn = Et, Wn = et;
    ut.Fragment = t, ut.jsx = Gn, ut.jsxs = Wn;
  }()), ut;
}
process.env.NODE_ENV === "production" ? Ft.exports = Ba() : Ft.exports = Fa();
var u = Ft.exports;
function Fn(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ u.jsx("button", { children: e.title });
}
const Ua = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
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
function za(e) {
  return /* @__PURE__ */ u.jsx(Ln.Item, { value: e.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    $a,
    /* @__PURE__ */ u.jsx("span", { children: e.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Ua })
  ] }) }, e.title);
}
function Ga(e) {
  const [n, a] = q(!1), [t, i] = q(e.options), c = (h) => {
    e.onDragComplete(h), i(h);
  }, l = (h) => {
    const m = [...t];
    m.splice(h, 1), c(m);
  }, r = [];
  t.forEach((h, m) => {
    r.push(/* @__PURE__ */ u.jsx(za, { index: m, title: h, onDelete: l }, h));
  });
  let d = "dropdown draggable";
  return e.subdropdown && (d += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: d, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ u.jsx(Fn, { title: e.title }),
    /* @__PURE__ */ u.jsx(Ln.Group, { axis: "y", values: t, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: r })
  ] });
}
function Wa(e) {
  const [n, a] = q(!1), t = [];
  e.options.map((c, l) => {
    e.onSelect !== void 0 && (c.onSelect = e.onSelect), t.push(/* @__PURE__ */ u.jsx(Ha, { option: c }, l));
  });
  let i = "dropdown";
  return e.subdropdown && (i += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ u.jsx(Fn, { title: e.title }),
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
function Ha(e) {
  const { option: n } = e, [a, t] = q("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ u.jsx(
        Ga,
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
      i = /* @__PURE__ */ u.jsx(
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
      i = /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("li", { className: a === n.title ? "selected" : "", children: i }, Ra());
}
function Bi(e, n, a) {
  function t(c) {
    switch (n.forEach((l) => {
      l.callback(e, l.remote, c);
    }), c.event) {
      case "custom":
        R.dispatchEvent({ type: k.CUSTOM, value: c.data });
        break;
    }
  }
  function i(c) {
    switch (a.forEach((l) => {
      l.callback(e, l.remote, c);
    }), c.event) {
      case "custom":
        R.dispatchEvent({ type: k.CUSTOM, value: c.data });
        break;
    }
  }
  e.listen = (c) => {
    c.target === "editor" ? i(c) : t(c);
  };
}
function Wt(e) {
  const [n, a] = q(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const i = !n;
          e.onToggle !== void 0 && e.onToggle(i), a(i);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: Tt(e.label) })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: e.children }) })
  ] });
}
function Un(e) {
  const n = K(null), [a, t] = q(!1), i = e.child !== void 0 && e.child.children.length > 0, c = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((l, r) => {
    c.push(/* @__PURE__ */ u.jsx(Un, { child: l, three: e.three }, r));
  }), _e(() => {
    const l = e.child.uuid, r = e.three.getScene(l);
    if (r !== null) {
      const d = r.getObjectByProperty("uuid", l);
      d !== void 0 && (n.current.style.opacity = d.visible ? "1" : "0.25");
    }
  }, []), /* @__PURE__ */ u.jsx(u.Fragment, { children: e.child !== void 0 && /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      i ? /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
        "button",
        {
          className: "visibility",
          ref: n,
          onClick: () => {
            if (e.child) {
              const l = e.three.getScene(e.child.uuid);
              if (l !== null) {
                const r = l.getObjectByProperty("uuid", e.child.uuid);
                if (r !== void 0) {
                  const d = "visible", h = !r.visible;
                  n.current.style.opacity = h ? "1" : "0.25", e.three.updateObject(e.child.uuid, d, h), Y(r, d, h);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${Aa(e.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: a ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: c }) })
  ] }, Math.random()) });
}
function Va(e) {
  const n = [];
  return e.child?.children.map((a, t) => {
    n.push(/* @__PURE__ */ u.jsx(Un, { child: a, scene: e.scene, three: e.three }, t));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
const Ya = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function qa(e) {
  return "items" in e;
}
function Xe(e) {
  const n = [];
  return e.items.forEach((a) => {
    qa(a) ? n.push(
      /* @__PURE__ */ u.jsx(Xe, { title: Tt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ u.jsx(
        Mt,
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
  }), /* @__PURE__ */ u.jsx(Wt, { label: e.title, open: e.expanded === !0, children: n });
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
function Rt(e) {
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
function $n(e) {
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
        i.onload = function(c) {
          n(c.target.result);
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
    value: vn
  },
  {
    title: "Double",
    value: bn
  }
], Qa = [
  {
    title: "No Blending",
    value: qn
  },
  {
    title: "Normal",
    value: Kn
  },
  {
    title: "Additive",
    value: Zn
  },
  {
    title: "Subtractive",
    value: Xn
  },
  {
    title: "Multiply",
    value: Jn
  },
  {
    title: "Custom",
    value: Qn
  }
], ei = [
  {
    title: "Add",
    value: ea
  },
  {
    title: "Subtract",
    value: ta
  },
  {
    title: "Reverse Subtract",
    value: na
  },
  {
    title: "Min",
    value: aa
  },
  {
    title: "Max",
    value: ia
  }
], ti = [
  {
    title: "Zero",
    valye: yn
  },
  {
    title: "One",
    valye: En
  },
  {
    title: "Src Color",
    valye: xn
  },
  {
    title: "One Minus Src Color",
    valye: Sn
  },
  {
    title: "Src Alpha",
    valye: Cn
  },
  {
    title: "One Minus Src Alpha",
    valye: wn
  },
  {
    title: "Dst Alpha",
    valye: Mn
  },
  {
    title: "One Minus Dst Alpha",
    valye: On
  },
  {
    title: "Dst Color",
    valye: Tn
  },
  {
    title: "One Minus Dst Color",
    valye: _n
  },
  {
    title: "Src Alpha Saturate",
    valye: ra
  },
  {
    title: "Constant Color",
    valye: Rn
  },
  {
    title: "One Minus Constant Color",
    valye: kn
  },
  {
    title: "Constant Alpha",
    valye: Dn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Pn
  }
], ni = [
  {
    title: "Zero",
    valye: yn
  },
  {
    title: "One",
    valye: En
  },
  {
    title: "Src Color",
    valye: xn
  },
  {
    title: "One Minus Src Color",
    valye: Sn
  },
  {
    title: "Src Alpha",
    valye: Cn
  },
  {
    title: "One Minus Src Alpha",
    valye: wn
  },
  {
    title: "Dst Alpha",
    valye: Mn
  },
  {
    title: "One Minus Dst Alpha",
    valye: On
  },
  {
    title: "Dst Color",
    valye: Tn
  },
  {
    title: "One Minus Dst Color",
    valye: _n
  },
  {
    title: "Constant Color",
    valye: Rn
  },
  {
    title: "One Minus Constant Color",
    valye: kn
  },
  {
    title: "Constant Alpha",
    valye: Dn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Pn
  }
];
function dt(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ai(e, n, a, t) {
  return {
    type: "boolean",
    title: Rt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, c) => {
      t.updateObject(a.uuid, `material.${e}`, c), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const l = t.getScene(a.uuid);
      if (l !== null) {
        const r = l.getObjectByProperty("uuid", a.uuid);
        r !== void 0 && Y(r, `material.${e}`, c);
      }
    }
  };
}
function ii(e, n, a, t) {
  const i = {
    type: "number",
    title: Rt(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (c, l) => {
      t.updateObject(a.uuid, `material.${e}`, l), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const d = r.getObjectByProperty("uuid", a.uuid);
        d !== void 0 && Y(d, `material.${e}`, l);
      }
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
  return $n(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function ri(e, n, a, t) {
  const i = {
    type: "string",
    title: Rt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (l, r) => {
      t.updateObject(a.uuid, `material.${e}`, r), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const d = t.getScene(a.uuid);
      if (d !== null) {
        const h = d.getObjectByProperty("uuid", a.uuid);
        h !== void 0 && Y(h, `material.${e}`, r);
      }
    },
    onKeyDown: (l) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (l, r) => {
    i.latest = r, t.updateObject(a.uuid, `material.${e}`, r);
    const d = t.getScene(a.uuid);
    if (d !== null) {
      const h = d.getObjectByProperty("uuid", a.uuid);
      h !== void 0 && Y(h, `material.${e}`, r);
    }
  }, i.onKeyDown = (l) => {
    if (l.key === "Enter" && (l.altKey || l.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const d = r.getObjectByProperty("uuid", a.uuid);
        d !== void 0 && Y(d, "material.needsUpdate", !0);
      }
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
function Ut(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function ht(e, n, a, t, i = "", c = !1) {
  const l = Rt(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = i.length > 0 ? `${i}.${e}` : e, d = typeof n;
  if (d === "boolean" || d === "string")
    return {
      title: l,
      prop: r,
      type: d,
      value: n,
      disabled: c,
      onChange: (h, m) => {
        t.updateObject(a.uuid, `material.${r}`, m);
        const f = t.getScene(a.uuid);
        if (f !== null) {
          const b = f.getObjectByProperty("uuid", a.uuid);
          b !== void 0 && Y(b, `material.${r}`, m);
        }
      }
    };
  if (d === "number") {
    const h = {
      title: l,
      prop: r,
      type: "number",
      value: n,
      step: 0.01,
      disabled: c,
      onChange: (m, f) => {
        t.updateObject(a.uuid, `material.${r}`, f);
        const b = t.getScene(a.uuid);
        if (b !== null) {
          const S = b.getObjectByProperty("uuid", a.uuid);
          S !== void 0 && Y(S, `material.${r}`, f);
        }
      }
    };
    return $n(l) && (h.type = "range", h.min = 0, h.max = 1), h;
  } else {
    if (n.isColor)
      return {
        title: l,
        prop: r,
        type: "color",
        value: n,
        disabled: c,
        onChange: (h, m) => {
          const f = new $t(m);
          t.updateObject(a.uuid, `material.${r}`, f);
          const b = t.getScene(a.uuid);
          if (b !== null) {
            const S = b.getObjectByProperty("uuid", a.uuid);
            S !== void 0 && Y(S, `material.${r}`, f);
          }
        }
      };
    if (Array.isArray(n)) {
      const h = [];
      for (const m in n) {
        const f = n[m], b = `[${m.toString()}]`;
        if (f.value !== void 0) {
          const S = ht(`${b}.value`, f.value, a, t, r, c);
          S !== void 0 && h.push(S);
        } else {
          const S = ht(b, f, a, t, r, c);
          S !== void 0 && h.push(S);
        }
      }
      if (h.length > 0)
        return Ut(h), {
          title: l,
          items: h
        };
    } else {
      if (si(n))
        return {
          title: l,
          prop: r,
          type: "vector2",
          value: n,
          disabled: c,
          onChange: (h, m) => {
            t.updateObject(a.uuid, `material.${r}`, m);
            const f = t.getScene(a.uuid);
            if (f !== null) {
              const b = f.getObjectByProperty("uuid", a.uuid);
              b !== void 0 && Y(b, `material.${r}`, m);
            }
          }
        };
      if (oi(n))
        return {
          title: l,
          prop: r,
          type: "grid3",
          value: n,
          disabled: c,
          onChange: (h, m) => {
            t.updateObject(a.uuid, `material.${r}`, m);
            const f = t.getScene(a.uuid);
            if (f !== null) {
              const b = f.getObjectByProperty("uuid", a.uuid);
              b !== void 0 && Y(b, `material.${r}`, m);
            }
          }
        };
      if (ci(n))
        return {
          title: l,
          prop: r,
          type: "grid4",
          value: n,
          disabled: c,
          onChange: (h, m) => {
            t.updateObject(a.uuid, `material.${r}`, m);
            const f = t.getScene(a.uuid);
            if (f !== null) {
              const b = f.getObjectByProperty("uuid", a.uuid);
              b !== void 0 && Y(b, `material.${r}`, m);
            }
          }
        };
      if (n.isEuler)
        return {
          title: l,
          prop: r,
          type: "euler",
          value: n,
          disabled: c,
          onChange: (h, m) => {
            t.updateObject(a.uuid, `material.${r}`, m);
            const f = t.getScene(a.uuid);
            if (f !== null) {
              const b = f.getObjectByProperty("uuid", a.uuid);
              b !== void 0 && Y(b, `material.${r}`, m);
            }
          }
        };
      if (n.src !== void 0)
        return {
          title: l,
          type: "image",
          value: n,
          disabled: c,
          onChange: (h, m) => {
            const f = Za(e), b = i.length > 0 ? `${i}.${f}` : f;
            t.createTexture(a.uuid, `material.${b}`, m);
            const S = t.getScene(a.uuid);
            if (S !== null) {
              const D = S.getObjectByProperty("uuid", a.uuid);
              D !== void 0 && Bn(m).then((J) => {
                Y(D, `material.${b}`, J), Y(D, "material.needsUpdate", !0);
              });
            }
          }
        };
      if (n.elements !== void 0)
        return {
          title: l,
          prop: r,
          type: n.elements.length > 9 ? "grid4" : "grid3",
          value: n,
          disabled: c,
          onChange: (h, m) => {
            t.updateObject(a.uuid, `material.${r}`, m);
            const f = t.getScene(a.uuid);
            if (f !== null) {
              const b = f.getObjectByProperty("uuid", a.uuid);
              b !== void 0 && Y(b, `material.${r}`, m);
            }
          }
        };
      {
        const h = [], m = e === "defines" || e === "extensions";
        try {
          for (const f in n) {
            const b = n[f];
            if (b !== void 0)
              if (b.value !== void 0) {
                const S = ht(`${f}.value`, b.value, a, t, r, m);
                S !== void 0 && h.push(S);
              } else {
                const S = ht(f, b, a, t, r, m);
                S !== void 0 && h.push(S);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (h.length > 0)
          return Ut(h), {
            title: l,
            items: h
          };
      }
    }
  }
}
function cn(e, n, a) {
  const t = [];
  for (const i in e) {
    if (!Ka(i))
      continue;
    const c = typeof e[i], l = e[i];
    if (c === "boolean")
      t.push(ai(i, l, n, a));
    else if (c === "number")
      t.push(ii(i, l, n, a));
    else if (c === "string")
      t.push(ri(i, l, n, a));
    else if (c === "object") {
      const r = ht(i, l, n, a);
      r !== void 0 && t.push(r);
    } else
      l !== void 0 && console.log("other:", i, c, l);
  }
  return Ut(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.getScene(n.uuid);
      if (i !== null) {
        const c = i.getObjectByProperty("uuid", n.uuid);
        c !== void 0 && Y(c, "material.needsUpdate", !0);
      }
    }
  }), t;
}
function li(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let c = 0; c < i; c++)
      t.push(
        /* @__PURE__ */ u.jsx(
          Xe,
          {
            title: `Material ${c}`,
            items: cn(a[c], e, n)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: t });
  } else
    return /* @__PURE__ */ u.jsx(
      Xe,
      {
        title: "Material",
        items: cn(a, e, n)
      }
    );
}
function ui(e) {
  const [n, a] = q(e.defaultValue);
  return _e(() => {
    let t = !1, i = -1, c = 0, l = e.defaultValue;
    const r = (b) => {
      t = !0, c = Number(e.input.current?.value), i = b.clientX, document.addEventListener("mouseup", h, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("contextmenu", h, !1);
    }, d = (b) => {
      if (!t)
        return;
      const S = e.step !== void 0 ? e.step : 1, D = (b.clientX - i) * S;
      l = Number((c + D).toFixed(4)), e.min !== void 0 && (l = Math.max(l, e.min)), e.max !== void 0 && (l = Math.min(l, e.max)), e.onChange !== void 0 && e.onChange(l), a(l);
    }, h = () => {
      t = !1, document.removeEventListener("mouseup", h), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", h);
    }, m = (b) => {
      const S = Number(b.target.value);
      a(S);
    }, f = (b) => {
      const S = Number(b.target.value);
      e.onChange !== void 0 && e.onChange(S), a(S);
    };
    return e.input.current?.addEventListener("input", m), e.label.current?.addEventListener("mousedown", r, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", f), () => {
      e.input.current?.removeEventListener("input", m), e.label.current?.removeEventListener("mousedown", r), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", f), document.removeEventListener("mouseup", h), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", h);
    };
  }, []), n;
}
function Ze(e) {
  const n = K(null), a = K(null), t = ui({
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
        onChange: (i) => {
          const c = Number(i.target.value);
          e.onChange !== void 0 && e.onChange(e.prop, c);
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
          onChange: (i) => {
            const c = Number(i.target.value);
            e.onChange !== void 0 && e.onChange(e.prop, c);
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
          onChange: zt
        }
      )
    ] })
  ] });
}
function di(e) {
  const n = K(null), a = K(null), t = K(null), i = K(null), c = K(null), l = K(null), [r, d] = q(e.value), [h, m] = q({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [f, b] = q(!1);
  function S() {
    f || (window.addEventListener("mousemove", J), window.addEventListener("mouseup", D), window.addEventListener("mouseup", D), b(!0));
  }
  function D() {
    window.removeEventListener("mousemove", J), window.removeEventListener("mouseup", D), b(!1);
  }
  function J(N) {
    const Z = c.current.getBoundingClientRect(), ne = Ke(0, 99, N.clientX - Z.left) / 99, Ce = Ke(0, 99, N.clientY - Z.top) / 99, G = an(nn(h.min, h.max, ne), 3), pe = an(nn(h.min, h.max, Ce), 3);
    e.onChange({ target: { value: { x: G, y: pe } } }), d({ x: G, y: pe });
  }
  function me(N) {
    let Z = r.x, ne = r.y;
    N.target === n.current ? Z = Number(N.target.value) : ne = Number(N.target.value), d({ x: Z, y: ne });
  }
  function re() {
    const N = Number(t.current.value);
    m({ min: N, max: h.max }), (r.x < N || r.y < N) && d({ x: Ke(N, h.max, r.x), y: Ke(N, h.max, r.y) });
  }
  function z() {
    const N = Number(i.current.value);
    m({ min: h.min, max: N }), (r.x > N || r.y > N) && d({ x: Ke(h.min, N, r.x), y: Ke(h.min, N, r.y) });
  }
  return _e(() => {
    const N = tn(h.min, h.max, r.x), Z = tn(h.min, h.max, r.y);
    l.current.style.left = `${N * 100}%`, l.current.style.top = `${Z * 100}%`;
  }, [h, r]), /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "X:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: r.x,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: me
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
            value: r.y,
            min: h.min,
            max: h.max,
            step: 0.01,
            onChange: me
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
            onChange: re
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ u.jsx(
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
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: c, onMouseDown: S, onMouseUp: D, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: l })
    ] })
  ] });
}
function ln(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = [];
  if (n) {
    const c = ie(() => e.value, []), l = (d, h) => {
      c[d] = h, e.onChange({ target: { value: c } });
    };
    ["x", "y", "z"].forEach((d) => {
      const h = K(null);
      i.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: h, children: d.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Ze,
            {
              value: c[d],
              type: "number",
              prop: d,
              step: 0.01,
              labelRef: h,
              onChange: l
            }
          )
        ] }, d)
      );
    });
  } else if (a) {
    const c = ie(() => e.value, []), l = (d, h) => {
      c[d] = h, e.onChange({ target: { value: c } });
    };
    ["_x", "_y", "_z"].forEach((d) => {
      const h = K(null);
      i.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: h, children: d.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Ze,
            {
              value: c[d],
              type: "number",
              prop: d,
              step: 0.01,
              labelRef: h,
              onChange: l
            }
          )
        ] }, d)
      );
    });
  } else if (t) {
    const c = ie(() => e.value, []), l = (r, d) => {
      const h = Number(r);
      c.elements[h] = d, e.onChange({ target: { value: c } });
    };
    for (let r = 0; r < 9; r++) {
      const d = K(null);
      i.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: d, children: r + 1 }),
          /* @__PURE__ */ u.jsx(
            Ze,
            {
              value: c.elements[r],
              type: "number",
              prop: r.toString(),
              step: 0.01,
              labelRef: d,
              onChange: l
            }
          )
        ] }, r.toString())
      );
    }
  }
  return /* @__PURE__ */ u.jsx("div", { className: "grid3", children: i }, Math.random().toString());
}
function hi(e) {
  const n = e.value.x !== void 0, a = [];
  if (n) {
    const t = ie(() => e.value, []), i = (l, r) => {
      t[l] = r, e.onChange({ target: { value: t } });
    };
    ["x", "y", "z", "w"].forEach((l) => {
      const r = K(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: r, children: l.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Ze,
            {
              value: t.x,
              type: "number",
              prop: l,
              step: 0.01,
              labelRef: r,
              onChange: i
            }
          )
        ] }, l)
      );
    });
  } else {
    const t = ie(() => e.value, []), i = (c, l) => {
      const r = Number(c);
      t.elements[r] = l, e.onChange({ target: { value: t } });
    };
    for (let c = 0; c < 16; c++) {
      const l = K(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: c + 1 }),
          /* @__PURE__ */ u.jsx(
            Ze,
            {
              value: t.elements[c],
              type: "number",
              prop: c.toString(),
              step: 0.01,
              labelRef: l,
              onChange: i
            }
          )
        ] }, c.toString())
      );
    }
  }
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: a });
}
function Mt(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Da(e.value));
  const [a, t] = q(n), i = K(null), c = K(null), l = (m) => {
    let f = m.target.value;
    e.type === "boolean" ? f = m.target.checked : e.type === "option" && (f = e.options[f].value), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  }, r = {};
  e.disabled && (r.opacity = 0.8);
  const d = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = d || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${h ? "block" : ""}`, style: r, children: [
    e.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: i, children: Tt(e.title) }, "fieldLabel"),
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
        onKeyDown: (m) => {
          e.onKeyDown !== void 0 && e.onKeyDown(m);
        },
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
    e.type === "range" && /* @__PURE__ */ u.jsx(
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
    e.type === "image" && /* @__PURE__ */ u.jsx("img", { alt: e.title, ref: c, onClick: () => {
      Xa().then((m) => {
        c.current.src = m, e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, m);
      });
    }, src: a.src.length > 0 ? a.src : Ya }),
    e.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: l, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((m, f) => /* @__PURE__ */ u.jsx("option", { value: m.value, children: Tt(m.title) }, f)) }) }),
    e.type === "vector2" && /* @__PURE__ */ u.jsx(di, { value: a, min: 0, max: 1, onChange: l }),
    e.type === "grid3" && /* @__PURE__ */ u.jsx(ln, { value: a, onChange: l }),
    e.type === "grid4" && /* @__PURE__ */ u.jsx(hi, { value: a, onChange: l }),
    e.type === "euler" && /* @__PURE__ */ u.jsx(ln, { value: a, onChange: l })
  ] });
}
function un(e) {
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
        title: un(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, c) => {
          n.updateObject(e.uuid, i, c), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const l = n.getScene(e.uuid);
          if (l !== null) {
            const r = l.getObjectByProperty("uuid", e.uuid);
            r !== void 0 && (Y(r, i, c), r.updateProjectionMatrix());
          }
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      a.push({
        title: un(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, c) => {
          n.updateObject(e.uuid, i, c), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const l = n.getScene(e.uuid);
          if (l !== null) {
            const r = l.getObjectByProperty("uuid", e.uuid);
            r !== void 0 && (Y(r, i, c), r.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ u.jsx(
    Xe,
    {
      title: "Camera",
      items: a
    }
  );
}
function mi(e, n) {
  const a = new sa();
  a.elements = e.matrix;
  const t = new V(), i = new oa(), c = new V();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const l = (r, d) => {
    const h = r === "rotation" ? { x: d._x, y: d._y, z: d._z } : d;
    n.updateObject(e.uuid, r, h);
    const m = n.getScene(e.uuid);
    if (m !== null) {
      const f = m.getObjectByProperty("uuid", e.uuid);
      f !== void 0 && Y(f, r, h);
    }
  };
  return /* @__PURE__ */ u.jsx(
    Xe,
    {
      title: "Transform",
      items: [
        {
          title: "Position",
          prop: "position",
          type: "grid3",
          value: t,
          onChange: l
        },
        {
          title: "Rotation",
          prop: "rotation",
          type: "grid3",
          value: i,
          onChange: l
        },
        {
          title: "Scale",
          prop: "scale",
          type: "grid3",
          value: c,
          onChange: l
        }
      ]
    }
  );
}
function dn(e) {
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
        title: dn(t),
        prop: t,
        type: "color",
        value: i,
        onChange: (c, l) => {
          const r = new $t(l);
          n.updateObject(e.uuid, c, r);
          const d = n.getScene(e.uuid);
          if (d !== null) {
            const h = d.getObjectByProperty("uuid", e.uuid);
            h !== void 0 && Y(h, c, r);
          }
        }
      }) : a.push({
        title: dn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (c, l) => {
          n.updateObject(e.uuid, c, l);
          const r = n.getScene(e.uuid);
          if (r !== null) {
            const d = r.getObjectByProperty("uuid", e.uuid);
            d !== void 0 && Y(d, c, l);
          }
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
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
  e.animations.forEach((l) => {
    i = Math.max(i, l.duration), l.duration > 0 && t.push({
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
  }), a.push({
    title: "Animations",
    items: t
  });
  const c = n.getScene(e.uuid);
  if (c !== null) {
    const l = c.getObjectByProperty("uuid", e.uuid);
    let r = !1;
    if (l !== void 0) {
      const d = l.mixer;
      if (r = d !== void 0, r) {
        const h = [
          {
            title: "Time Scale",
            type: "range",
            value: d.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (m, f) => {
              d.timeScale = f, n.updateObject(e.uuid, "mixer.timeScale", f);
            }
          }
        ];
        h.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            d.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), a.push({
          title: "Mixer",
          items: h
        });
      }
    }
  }
  return /* @__PURE__ */ u.jsx(Xe, { title: "Animation", items: a });
}
const zn = {
  name: "",
  uuid: "",
  type: "",
  visible: !1,
  matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  animations: [],
  material: void 0,
  perspectiveCameraInfo: void 0,
  orthographicCameraInfo: void 0,
  lightInfo: void 0,
  children: []
};
let he = { ...zn };
function vi(e) {
  const [n, a] = q(-1);
  _e(() => {
    function l(d) {
      he = { ...d.value }, a(Date.now());
    }
    function r() {
      he = { ...zn }, a(Date.now());
    }
    return R.addEventListener(k.SET_SCENE, r), R.addEventListener(k.SET_OBJECT, l), () => {
      R.removeEventListener(k.SET_SCENE, r), R.removeEventListener(k.SET_OBJECT, l);
    };
  }, []);
  const t = he.type.toLowerCase(), i = he.animations.length > 0 || he.mixer !== void 0, c = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ u.jsx(Wt, { label: "Inspector", children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: e.class, children: he.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        Mt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: he.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        Mt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: he.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        Mt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: he.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      mi(he, e.three),
      i ? gi(he, e.three) : null,
      t.search("camera") > -1 ? fi(he, e.three) : null,
      t.search("light") > -1 ? pi(he, e.three) : null,
      c ? li(he, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Fi(e) {
  const [n] = q([]), [a, t] = q(0), i = (r) => {
    n.push(r.value), t(Date.now());
  }, c = (r) => {
    const d = r.value;
    for (let h = 0; h < n.length; h++)
      if (d.uuid === n[h].uuid) {
        n.splice(h, 1), t(Date.now());
        return;
      }
  };
  _e(() => (R.addEventListener(k.ADD_SCENE, i), R.addEventListener(k.REMOVE_SCENE, c), () => {
    R.removeEventListener(k.ADD_SCENE, i), R.removeEventListener(k.REMOVE_SCENE, c);
  }), []);
  const l = [];
  return n.forEach((r, d) => {
    l.push(
      /* @__PURE__ */ u.jsx(Wt, { label: `Scene: ${r.name}`, open: !0, children: /* @__PURE__ */ u.jsx(Va, { child: r, scene: r, three: e.three }) }, `scene_${d}`)
    );
  }), /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    l,
    /* @__PURE__ */ u.jsx(vi, { three: e.three })
  ] }, `SidePanel ${a}`);
}
function Ui(e) {
  return _e(() => {
    function n(r) {
      let d = null;
      return e.three.scenes.forEach((h) => {
        r.search(h.uuid) > -1 && (d = h);
      }), d;
    }
    const a = (r) => {
      const d = r.value, m = n(d)?.getObjectByProperty("uuid", d);
      m !== void 0 && e.three.setObject(m);
    }, t = (r, d, h) => {
      const f = n(r)?.getObjectByProperty("uuid", r);
      f !== void 0 && Y(f, d, h);
    }, i = (r) => {
      const d = r.value, { key: h, value: m, uuid: f } = d;
      t(f, h, m);
    }, c = (r) => {
      const d = r.value;
      Bn(d.value).then((h) => {
        t(d.uuid, d.key, h), t(d.uuid, "material.needsUpdate", !0);
      });
    }, l = (r) => {
      const { key: d, uuid: h, value: m, subitem: f } = r.value, S = n(h)?.getObjectByProperty("uuid", h);
      if (S !== void 0)
        try {
          f !== void 0 ? Na(S, f)[d](m) : S[d](m);
        } catch (D) {
          console.log("Error requesting method:"), console.log(D), console.log(d), console.log(m);
        }
    };
    return R.addEventListener(k.GET_OBJECT, a), R.addEventListener(k.UPDATE_OBJECT, i), R.addEventListener(k.CREATE_TEXTURE, c), R.addEventListener(k.REQUEST_METHOD, l), () => {
      R.removeEventListener(k.GET_OBJECT, a), R.removeEventListener(k.UPDATE_OBJECT, i), R.removeEventListener(k.CREATE_TEXTURE, c), R.removeEventListener(k.REQUEST_METHOD, l);
    };
  }, []), null;
}
class bi extends ca {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new Kt();
    i.setAttribute("position", new Zt(t, 3)), i.computeBoundingSphere();
    const c = new la({ fog: !1 });
    super(i, c), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const l = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new Kt();
    r.setAttribute("position", new Zt(l, 3)), r.computeBoundingSphere(), this.add(new An(r, new In({ side: vn, fog: !1 })));
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
const hn = { type: "change" }, jt = { type: "start" }, fn = { type: "end" }, xt = new ua(), mn = new da(), yi = Math.cos(70 * ha.DEG2RAD);
class Ei extends pn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new V(), this.cursor = new V(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: nt.ROTATE, MIDDLE: nt.DOLLY, RIGHT: nt.PAN }, this.touches = { ONE: at.ROTATE, TWO: at.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", ot), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ot), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(hn), t.update(), c = i.NONE;
    }, this.update = function() {
      const o = new V(), E = new Xt().setFromUnitVectors(n.up, new V(0, 1, 0)), _ = E.clone().invert(), j = new V(), te = new Xt(), ye = new V(), ue = 2 * Math.PI;
      return function(bt = null) {
        const yt = t.object.position;
        o.copy(yt).sub(t.target), o.applyQuaternion(E), r.setFromVector3(o), t.autoRotate && c === i.NONE && ve(Re(bt)), t.enableDamping ? (r.theta += d.theta * t.dampingFactor, r.phi += d.phi * t.dampingFactor) : (r.theta += d.theta, r.phi += d.phi);
        let Ee = t.minAzimuthAngle, xe = t.maxAzimuthAngle;
        isFinite(Ee) && isFinite(xe) && (Ee < -Math.PI ? Ee += ue : Ee > Math.PI && (Ee -= ue), xe < -Math.PI ? xe += ue : xe > Math.PI && (xe -= ue), Ee <= xe ? r.theta = Math.max(Ee, Math.min(xe, r.theta)) : r.theta = r.theta > (Ee + xe) / 2 ? Math.max(Ee, r.theta) : Math.min(xe, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(m, t.dampingFactor) : t.target.add(m), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Ye = !1;
        if (t.zoomToCursor && Ce || t.object.isOrthographicCamera)
          r.radius = Ae(r.radius);
        else {
          const Oe = r.radius;
          r.radius = Ae(r.radius * h), Ye = Oe != r.radius;
        }
        if (o.setFromSpherical(r), o.applyQuaternion(_), yt.copy(t.target).add(o), t.object.lookAt(t.target), t.enableDamping === !0 ? (d.theta *= 1 - t.dampingFactor, d.phi *= 1 - t.dampingFactor, m.multiplyScalar(1 - t.dampingFactor)) : (d.set(0, 0, 0), m.set(0, 0, 0)), t.zoomToCursor && Ce) {
          let Oe = null;
          if (t.object.isPerspectiveCamera) {
            const ze = o.length();
            Oe = Ae(ze * h);
            const et = ze - Oe;
            t.object.position.addScaledVector(Z, et), t.object.updateMatrixWorld(), Ye = !!et;
          } else if (t.object.isOrthographicCamera) {
            const ze = new V(ne.x, ne.y, 0);
            ze.unproject(t.object);
            const et = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), t.object.updateProjectionMatrix(), Ye = et !== t.object.zoom;
            const Et = new V(ne.x, ne.y, 0);
            Et.unproject(t.object), t.object.position.sub(Et).add(ze), t.object.updateMatrixWorld(), Oe = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Oe !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Oe).add(t.object.position) : (xt.origin.copy(t.object.position), xt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(xt.direction)) < yi ? n.lookAt(t.target) : (mn.setFromNormalAndCoplanarPoint(t.object.up, t.target), xt.intersectPlane(mn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Oe = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / h)), Oe !== t.object.zoom && (t.object.updateProjectionMatrix(), Ye = !0);
        }
        return h = 1, Ce = !1, Ye || j.distanceToSquared(t.object.position) > l || 8 * (1 - te.dot(t.object.quaternion)) > l || ye.distanceToSquared(t.target) > l ? (t.dispatchEvent(hn), j.copy(t.object.position), te.copy(t.object.quaternion), ye.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Qe), t.domElement.removeEventListener("pointerdown", T), t.domElement.removeEventListener("pointercancel", W), t.domElement.removeEventListener("wheel", mt), t.domElement.removeEventListener("pointermove", F), t.domElement.removeEventListener("pointerup", W), t.domElement.getRootNode().removeEventListener("keydown", st, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ot), t._domElementKeyEvents = null);
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
    let c = i.NONE;
    const l = 1e-6, r = new Jt(), d = new Jt();
    let h = 1;
    const m = new V(), f = new fe(), b = new fe(), S = new fe(), D = new fe(), J = new fe(), me = new fe(), re = new fe(), z = new fe(), N = new fe(), Z = new V(), ne = new fe();
    let Ce = !1;
    const G = [], pe = {};
    let oe = !1;
    function Re(o) {
      return o !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function ke(o) {
      const E = Math.abs(o * 0.01);
      return Math.pow(0.95, t.zoomSpeed * E);
    }
    function ve(o) {
      d.theta -= o;
    }
    function L(o) {
      d.phi -= o;
    }
    const be = function() {
      const o = new V();
      return function(_, j) {
        o.setFromMatrixColumn(j, 0), o.multiplyScalar(-_), m.add(o);
      };
    }(), O = function() {
      const o = new V();
      return function(_, j) {
        t.screenSpacePanning === !0 ? o.setFromMatrixColumn(j, 1) : (o.setFromMatrixColumn(j, 0), o.crossVectors(t.object.up, o)), o.multiplyScalar(_), m.add(o);
      };
    }(), we = function() {
      const o = new V();
      return function(_, j) {
        const te = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const ye = t.object.position;
          o.copy(ye).sub(t.target);
          let ue = o.length();
          ue *= Math.tan(t.object.fov / 2 * Math.PI / 180), be(2 * _ * ue / te.clientHeight, t.object.matrix), O(2 * j * ue / te.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (be(_ * (t.object.right - t.object.left) / t.object.zoom / te.clientWidth, t.object.matrix), O(j * (t.object.top - t.object.bottom) / t.object.zoom / te.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function De(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? h /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ie(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? h *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Pe(o, E) {
      if (!t.zoomToCursor)
        return;
      Ce = !0;
      const _ = t.domElement.getBoundingClientRect(), j = o - _.left, te = E - _.top, ye = _.width, ue = _.height;
      ne.x = j / ye * 2 - 1, ne.y = -(te / ue) * 2 + 1, Z.set(ne.x, ne.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Ae(o) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, o));
    }
    function je(o) {
      f.set(o.clientX, o.clientY);
    }
    function Be(o) {
      Pe(o.clientX, o.clientX), re.set(o.clientX, o.clientY);
    }
    function Fe(o) {
      D.set(o.clientX, o.clientY);
    }
    function ae(o) {
      b.set(o.clientX, o.clientY), S.subVectors(b, f).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      ve(2 * Math.PI * S.x / E.clientHeight), L(2 * Math.PI * S.y / E.clientHeight), f.copy(b), t.update();
    }
    function Me(o) {
      z.set(o.clientX, o.clientY), N.subVectors(z, re), N.y > 0 ? De(ke(N.y)) : N.y < 0 && Ie(ke(N.y)), re.copy(z), t.update();
    }
    function He(o) {
      J.set(o.clientX, o.clientY), me.subVectors(J, D).multiplyScalar(t.panSpeed), we(me.x, me.y), D.copy(J), t.update();
    }
    function Ve(o) {
      Pe(o.clientX, o.clientY), o.deltaY < 0 ? Ie(ke(o.deltaY)) : o.deltaY > 0 && De(ke(o.deltaY)), t.update();
    }
    function le(o) {
      let E = !1;
      switch (o.code) {
        case t.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? L(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, t.keyPanSpeed), E = !0;
          break;
        case t.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? L(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, -t.keyPanSpeed), E = !0;
          break;
        case t.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? ve(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(t.keyPanSpeed, 0), E = !0;
          break;
        case t.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? ve(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(-t.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (o.preventDefault(), t.update());
    }
    function g(o) {
      if (G.length === 1)
        f.set(o.pageX, o.pageY);
      else {
        const E = $e(o), _ = 0.5 * (o.pageX + E.x), j = 0.5 * (o.pageY + E.y);
        f.set(_, j);
      }
    }
    function v(o) {
      if (G.length === 1)
        D.set(o.pageX, o.pageY);
      else {
        const E = $e(o), _ = 0.5 * (o.pageX + E.x), j = 0.5 * (o.pageY + E.y);
        D.set(_, j);
      }
    }
    function M(o) {
      const E = $e(o), _ = o.pageX - E.x, j = o.pageY - E.y, te = Math.sqrt(_ * _ + j * j);
      re.set(0, te);
    }
    function A(o) {
      t.enableZoom && M(o), t.enablePan && v(o);
    }
    function ge(o) {
      t.enableZoom && M(o), t.enableRotate && g(o);
    }
    function ce(o) {
      if (G.length == 1)
        b.set(o.pageX, o.pageY);
      else {
        const _ = $e(o), j = 0.5 * (o.pageX + _.x), te = 0.5 * (o.pageY + _.y);
        b.set(j, te);
      }
      S.subVectors(b, f).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      ve(2 * Math.PI * S.x / E.clientHeight), L(2 * Math.PI * S.y / E.clientHeight), f.copy(b);
    }
    function C(o) {
      if (G.length === 1)
        J.set(o.pageX, o.pageY);
      else {
        const E = $e(o), _ = 0.5 * (o.pageX + E.x), j = 0.5 * (o.pageY + E.y);
        J.set(_, j);
      }
      me.subVectors(J, D).multiplyScalar(t.panSpeed), we(me.x, me.y), D.copy(J);
    }
    function x(o) {
      const E = $e(o), _ = o.pageX - E.x, j = o.pageY - E.y, te = Math.sqrt(_ * _ + j * j);
      z.set(0, te), N.set(0, Math.pow(z.y / re.y, t.zoomSpeed)), De(N.y), re.copy(z);
      const ye = (o.pageX + E.x) * 0.5, ue = (o.pageY + E.y) * 0.5;
      Pe(ye, ue);
    }
    function U(o) {
      t.enableZoom && x(o), t.enablePan && C(o);
    }
    function Q(o) {
      t.enableZoom && x(o), t.enableRotate && ce(o);
    }
    function T(o) {
      t.enabled !== !1 && (G.length === 0 && (t.domElement.setPointerCapture(o.pointerId), t.domElement.addEventListener("pointermove", F), t.domElement.addEventListener("pointerup", W)), !Pt(o) && (kt(o), o.pointerType === "touch" ? ct(o) : Ne(o)));
    }
    function F(o) {
      t.enabled !== !1 && (o.pointerType === "touch" ? gt(o) : Je(o));
    }
    function W(o) {
      switch (Dt(o), G.length) {
        case 0:
          t.domElement.releasePointerCapture(o.pointerId), t.domElement.removeEventListener("pointermove", F), t.domElement.removeEventListener("pointerup", W), t.dispatchEvent(fn), c = i.NONE;
          break;
        case 1:
          const E = G[0], _ = pe[E];
          ct({ pointerId: E, pageX: _.x, pageY: _.y });
          break;
      }
    }
    function Ne(o) {
      let E;
      switch (o.button) {
        case 0:
          E = t.mouseButtons.LEFT;
          break;
        case 1:
          E = t.mouseButtons.MIDDLE;
          break;
        case 2:
          E = t.mouseButtons.RIGHT;
          break;
        default:
          E = -1;
      }
      switch (E) {
        case nt.DOLLY:
          if (t.enableZoom === !1)
            return;
          Be(o), c = i.DOLLY;
          break;
        case nt.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enablePan === !1)
              return;
            Fe(o), c = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            je(o), c = i.ROTATE;
          }
          break;
        case nt.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enableRotate === !1)
              return;
            je(o), c = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Fe(o), c = i.PAN;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && t.dispatchEvent(jt);
    }
    function Je(o) {
      switch (c) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          ae(o);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          Me(o);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          He(o);
          break;
      }
    }
    function mt(o) {
      t.enabled === !1 || t.enableZoom === !1 || c !== i.NONE || (o.preventDefault(), t.dispatchEvent(jt), Ve(pt(o)), t.dispatchEvent(fn));
    }
    function pt(o) {
      const E = o.deltaMode, _ = {
        clientX: o.clientX,
        clientY: o.clientY,
        deltaY: o.deltaY
      };
      switch (E) {
        case 1:
          _.deltaY *= 16;
          break;
        case 2:
          _.deltaY *= 100;
          break;
      }
      return o.ctrlKey && !oe && (_.deltaY *= 10), _;
    }
    function st(o) {
      o.key === "Control" && (oe = !0, t.domElement.getRootNode().addEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function Ue(o) {
      o.key === "Control" && (oe = !1, t.domElement.getRootNode().removeEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function ot(o) {
      t.enabled === !1 || t.enablePan === !1 || le(o);
    }
    function ct(o) {
      switch (vt(o), G.length) {
        case 1:
          switch (t.touches.ONE) {
            case at.ROTATE:
              if (t.enableRotate === !1)
                return;
              g(o), c = i.TOUCH_ROTATE;
              break;
            case at.PAN:
              if (t.enablePan === !1)
                return;
              v(o), c = i.TOUCH_PAN;
              break;
            default:
              c = i.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case at.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              A(o), c = i.TOUCH_DOLLY_PAN;
              break;
            case at.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              ge(o), c = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              c = i.NONE;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && t.dispatchEvent(jt);
    }
    function gt(o) {
      switch (vt(o), c) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          ce(o), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          C(o), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          U(o), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          Q(o), t.update();
          break;
        default:
          c = i.NONE;
      }
    }
    function Qe(o) {
      t.enabled !== !1 && o.preventDefault();
    }
    function kt(o) {
      G.push(o.pointerId);
    }
    function Dt(o) {
      delete pe[o.pointerId];
      for (let E = 0; E < G.length; E++)
        if (G[E] == o.pointerId) {
          G.splice(E, 1);
          return;
        }
    }
    function Pt(o) {
      for (let E = 0; E < G.length; E++)
        if (G[E] == o.pointerId)
          return !0;
      return !1;
    }
    function vt(o) {
      let E = pe[o.pointerId];
      E === void 0 && (E = new fe(), pe[o.pointerId] = E), E.set(o.pageX, o.pageY);
    }
    function $e(o) {
      const E = o.pointerId === G[0] ? G[1] : G[0];
      return pe[E];
    }
    t.domElement.addEventListener("contextmenu", Qe), t.domElement.addEventListener("pointerdown", T), t.domElement.addEventListener("pointercancel", W), t.domElement.addEventListener("wheel", mt, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", st, { passive: !0, capture: !0 }), this.update();
  }
}
function rt(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const Ot = (e) => {
  const [n, a] = q(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (c) => {
    c !== n && (e.onSelect(c), a(c)), e.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: e.options.map((c) => /* @__PURE__ */ u.jsx("li", { onClick: () => i(c), children: c }, c)) })
  ] });
}, qe = _a(function(n, a) {
  const [t, i] = q(!1), c = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: a, className: "clickable", onClick: () => {
      t && i(!1);
    } }),
    /* @__PURE__ */ u.jsx(
      Ot,
      {
        index: c,
        open: t,
        options: n.options,
        onSelect: n.onSelect,
        onToggle: (l) => {
          i(l);
        },
        up: !0
      }
    )
  ] });
});
class xi extends jn {
  constructor(n) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: fa,
      side: bn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new $t(16777215)
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
class Si extends An {
  gridMaterial;
  constructor() {
    const n = new xi();
    super(new ma(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
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
      vertexShader: Ci,
      fragmentShader: wi
    });
  }
}
let St = "Renderer", Te, Ct = !1, Nt = !1, H = null, se = null, Ge = null, We = null;
function $i(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", c = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", l = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", r = ie(() => /* @__PURE__ */ new Map(), []), d = ie(() => /* @__PURE__ */ new Map(), []), h = ie(() => /* @__PURE__ */ new Map(), []), m = ie(() => /* @__PURE__ */ new Map(), []), f = ie(() => new pa(), []), b = ie(() => new ga(), []), S = ie(() => new Si(), []), D = ie(() => new Qt(500), []), J = ie(() => new Qt(100), []), me = ie(() => new va(), []), re = ie(() => new ba(), []), z = ie(() => new Mi(), []), N = ie(() => new In({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function Z(g, v) {
    const M = new en(-100, 100, 100, -100, 50, 5e3);
    return M.name = g, M.position.copy(v), M.lookAt(0, 0, 0), r.set(g, M), M;
  }
  const ne = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], Ce = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], G = K(null), pe = K(null), oe = K(null), Re = K(null), ke = K(null), ve = K(null), [L, be] = q(a !== null ? a : "Single"), [O, we] = q(null), [De, Ie] = q(!1), [Pe, Ae] = q(!1), [je, Be] = q(!1), [, Fe] = q(Date.now());
  localStorage.setItem(`${n}_mode`, L), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, c), localStorage.setItem(`${n}_brCam`, l);
  const ae = (g, v) => {
    const M = d.get(g.name);
    if (M !== void 0 && M.dispose(), d.delete(g.name), g.name === "UI")
      return;
    const A = new Ei(g, v);
    switch (A.enableDamping = !0, A.dampingFactor = 0.05, g.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        A.enableRotate = !1;
        break;
    }
    d.set(g.name, A);
  }, Me = (g) => {
    const v = h.get(g.name);
    v !== void 0 && (f.remove(v), v.dispose(), h.delete(g.name));
    const M = d.get(g.name);
    M !== void 0 && (M.dispose(), d.delete(g.name));
  }, He = () => {
    d.forEach((g, v) => {
      g.dispose();
      const M = h.get(v);
      M !== void 0 && (f.remove(M), M.dispose()), h.delete(v), d.delete(v);
    }), d.clear(), h.clear();
  }, Ve = () => {
    switch (L) {
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
    const g = new ya({
      canvas: G.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, we(g);
  }, []), _e(() => {
    f.name = "Debug Scene", f.uuid = "", b.name = "helpers", f.add(b), b.add(S), D.name = "axisHelper", b.add(D), J.name = "interactionHelper", b.add(J), J.visible = !1, Z("Top", new V(0, 1e3, 0)), Z("Bottom", new V(0, -1e3, 0)), Z("Left", new V(-1e3, 0, 0)), Z("Right", new V(1e3, 0, 0)), Z("Front", new V(0, 0, 1e3)), Z("Back", new V(0, 0, -1e3)), Z("Orthographic", new V(1e3, 1e3, 1e3)), Z("UI", new V());
    const g = new At(60, 1, 50, 5e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), r.set("Debug", g), H = r.get(localStorage.getItem(`${n}_tlCam`)), se = r.get(localStorage.getItem(`${n}_trCam`)), Ge = r.get(localStorage.getItem(`${n}_blCam`)), We = r.get(localStorage.getItem(`${n}_brCam`));
  }, []), _e(() => {
    const g = () => {
      m.forEach((C) => {
        b.remove(C), C.dispose();
      }), m.clear();
    }, v = () => {
      Te.traverse((C) => {
        if (C.type.search("Light") > -1) {
          let x;
          switch (C.type) {
            case "DirectionalLight":
              x = new Ma(C, 100), x.name = `${C.name}Helper`, m.set(C.name, x), b.add(x);
              break;
            case "HemisphereLight":
              x = new wa(C, 250), x.name = `${C.name}Helper`, m.set(C.name, x), b.add(x);
              break;
            case "RectAreaLight":
              x = new bi(C), x.name = `${C.name}Helper`, m.set(C.name, x), b.add(x);
              break;
            case "PointLight":
              x = new Ca(C, 100), x.name = `${C.name}Helper`, m.set(C.name, x), b.add(x);
              break;
            case "SpotLight":
              x = new Sa(C), x.name = `${C.name}Helper`, m.set(C.name, x), b.add(x);
              break;
          }
        }
      });
    }, M = (C) => {
      b.add(D), g(), ft(Te), f.remove(Te);
      const x = e.scenes.get(C.value.name);
      if (x !== void 0) {
        const U = new x();
        e.onSceneSet !== void 0 && e.onSceneSet(U), Te = U, e.three.scene = Te, f.add(Te), Nt = !0, v();
      }
    }, A = (C) => {
      const x = C.value, U = e.three.scene?.getObjectByProperty("uuid", x.uuid);
      if (U !== void 0 && r.set(x.name, U), U instanceof At) {
        const Q = new xa(U);
        h.set(U.name, Q), f.add(Q);
      }
      Fe(Date.now());
    }, ge = (C) => {
      const x = h.get(C.value.name);
      x !== void 0 && (f.remove(x), x.dispose()), r.delete(C.value.name), Fe(Date.now());
    }, ce = (C) => {
      const x = Te.getObjectByProperty("uuid", C.value.uuid);
      x && x.add(D);
    };
    return R.addEventListener(k.SET_SCENE, M), R.addEventListener(k.ADD_CAMERA, A), R.addEventListener(k.REMOVE_CAMERA, ge), R.addEventListener(k.SET_OBJECT, ce), () => {
      R.removeEventListener(k.SET_SCENE, M), R.removeEventListener(k.ADD_CAMERA, A), R.removeEventListener(k.REMOVE_CAMERA, ge), R.removeEventListener(k.SET_OBJECT, ce);
    };
  }, []), _e(() => {
    if (O === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, M = Math.floor(g / 2), A = Math.floor(v / 2), ge = -1;
    const ce = () => {
      g = window.innerWidth - 300, v = window.innerHeight, M = Math.floor(g / 2), A = Math.floor(v / 2), e.three.resize(g, v), e.onSceneResize !== void 0 && Nt && e.onSceneResize(Te, g, v);
      let T = g, F = v;
      switch (L) {
        case "Side by Side":
          T = M, F = v;
          break;
        case "Stacked":
          T = g, F = A;
          break;
        case "Quad":
          T = M, F = A;
          break;
      }
      r.forEach((W) => {
        W instanceof en ? (W.left = T / -2, W.right = T / 2, W.top = F / 2, W.bottom = F / -2, W.name === "UI" && (W.position.x = g / 2, W.position.y = v / -2, W.position.z = 100), W.updateProjectionMatrix()) : W instanceof At && (W.aspect = T / F, W.updateProjectionMatrix(), h.get(W.name)?.update());
      });
    }, C = () => {
      O.setViewport(0, 0, g, v), O.setScissor(0, 0, g, v), O.render(f, H);
    }, x = () => {
      if (L === "Side by Side")
        O.setViewport(0, 0, M, v), O.setScissor(0, 0, M, v), O.render(f, H), O.setViewport(M, 0, M, v), O.setScissor(M, 0, M, v), O.render(f, se);
      else {
        const T = v - A;
        O.setViewport(0, T, g, A), O.setScissor(0, T, g, A), O.render(f, H), O.setViewport(0, 0, g, A), O.setScissor(0, 0, g, A), O.render(f, se);
      }
    }, U = () => {
      let T = 0, F = 0;
      F = v - A, T = 0, O.setViewport(T, F, M, A), O.setScissor(T, F, M, A), O.render(f, H), T = M, O.setViewport(T, F, M, A), O.setScissor(T, F, M, A), O.render(f, se), F = 0, T = 0, O.setViewport(T, F, M, A), O.setScissor(T, F, M, A), O.render(f, Ge), T = M, O.setViewport(T, F, M, A), O.setScissor(T, F, M, A), O.render(f, We);
    }, Q = () => {
      switch (d.forEach((T) => {
        T.update();
      }), h.forEach((T) => {
        T.update();
      }), m.forEach((T) => {
        T.update !== void 0 && T.update();
      }), e.onSceneUpdate !== void 0 && Nt && e.onSceneUpdate(Te), O.clear(), L) {
        case "Single":
          C();
          break;
        case "Side by Side":
        case "Stacked":
          x();
          break;
        case "Quad":
          U();
          break;
      }
      ge = requestAnimationFrame(Q);
    };
    return Ve(), window.addEventListener("resize", ce), ce(), Q(), () => {
      window.removeEventListener("resize", ce), cancelAnimationFrame(ge), ge = -1;
    };
  }, [L, O]), _e(() => {
    if (O !== null) {
      const g = new Ea(), v = new fe(), M = (C, x, U, Q) => {
        switch (L) {
          case "Quad":
            C < U ? x < Q ? g.setFromCamera(v, H) : g.setFromCamera(v, Ge) : x < Q ? g.setFromCamera(v, se) : g.setFromCamera(v, We);
            break;
          case "Side by Side":
            C < U ? g.setFromCamera(v, H) : g.setFromCamera(v, se);
            break;
          case "Single":
            g.setFromCamera(v, H);
            break;
          case "Stacked":
            x < Q ? g.setFromCamera(v, H) : g.setFromCamera(v, se);
            break;
        }
      }, A = (C) => {
        if (!Ct)
          return;
        const x = new fe();
        O.getSize(x);
        const U = Math.min(C.clientX, x.x), Q = Math.min(C.clientY, x.y);
        v.x = rt(U, 0, x.x, -1, 1), v.y = rt(Q, 0, x.y, 1, -1);
        const T = x.x / 2, F = x.y / 2, W = () => {
          U < T ? v.x = rt(U, 0, T, -1, 1) : v.x = rt(U, T, x.x, -1, 1);
        }, Ne = () => {
          Q < F ? v.y = rt(Q, 0, F, 1, -1) : v.y = rt(Q, F, x.y, 1, -1);
        };
        switch (L) {
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
        M(U, Q, T, F);
        const Je = g.intersectObjects(Te.children);
        Je.length > 0 && J.position.copy(Je[0].point);
      }, ge = (C) => {
        if (!Ct)
          return;
        const x = new fe();
        if (O.getSize(x), C.clientX >= x.x)
          return;
        A(C);
        const U = g.intersectObjects(Te.children);
        U.length > 0 && e.three.getObject(U[0].object.uuid);
      }, ce = pe.current;
      return ce.addEventListener("mousemove", A, !1), ce.addEventListener("click", ge, !1), () => {
        ce.removeEventListener("mousemove", A), ce.removeEventListener("click", ge);
      };
    }
  }, [L, O]);
  const le = [];
  return r.forEach((g, v) => {
    le.push(v);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsx("canvas", { ref: G }),
    O !== null && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxs("div", { className: `cameras ${L === "Single" || L === "Stacked" ? "single" : ""}`, ref: pe, children: [
        L === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(qe, { camera: H, options: le, ref: oe, onSelect: (g) => {
          d.get(H.name)?.dispose();
          const v = r.get(g);
          v !== void 0 && (Me(H), H = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, oe.current));
        } }) }),
        (L === "Side by Side" || L === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(qe, { camera: H, options: le, ref: oe, onSelect: (g) => {
            d.get(H.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (Me(H), H = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, oe.current));
          } }),
          /* @__PURE__ */ u.jsx(qe, { camera: se, options: le, ref: Re, onSelect: (g) => {
            d.get(se.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (Me(se), se = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, Re.current));
          } })
        ] }),
        L === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(qe, { camera: H, options: le, ref: oe, onSelect: (g) => {
            d.get(H.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (Me(H), H = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, oe.current));
          } }),
          /* @__PURE__ */ u.jsx(qe, { camera: se, options: le, ref: Re, onSelect: (g) => {
            d.get(se.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (Me(se), se = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, Re.current));
          } }),
          /* @__PURE__ */ u.jsx(qe, { camera: Ge, options: le, ref: ke, onSelect: (g) => {
            d.get(Ge.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (Me(Ge), Ge = v, localStorage.setItem(`${n}_blCam`, v.name), ae(v, ke.current));
          } }),
          /* @__PURE__ */ u.jsx(qe, { camera: We, options: le, ref: ve, onSelect: (g) => {
            d.get(We.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (Me(We), We = v, localStorage.setItem(`${n}_brCam`, v.name), ae(v, ve.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ u.jsx(
          Ot,
          {
            index: Ce.indexOf(L),
            options: Ce,
            onSelect: (g) => {
              g !== L && (He(), be(g));
            },
            open: De,
            onToggle: (g) => {
              Ie(g), Pe && Ae(!1), je && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Ot,
          {
            index: ne.indexOf(St),
            options: ne,
            onSelect: (g) => {
              if (g !== St)
                switch (St = g, St) {
                  case "Depth":
                    f.overrideMaterial = me;
                    break;
                  case "Normals":
                    f.overrideMaterial = re;
                    break;
                  default:
                  case "Renderer":
                    f.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    f.overrideMaterial = N;
                    break;
                  case "UVs":
                    f.overrideMaterial = z;
                    break;
                }
            },
            open: Pe,
            onToggle: (g) => {
              De && Ie(!1), Ae(g), je && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Ot,
          {
            index: 0,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (g) => {
              Ct = g === "Selection Mode", J.visible = Ct;
            },
            open: je,
            onToggle: (g) => {
              De && Ie(!1), Pe && Ae(!1), Be(g);
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
  Wt as Accordion,
  Ai as Application,
  _t as BaseRemote,
  Un as ChildObject,
  Va as ContainerObject,
  Ga as Draggable,
  za as DraggableItem,
  Wa as Dropdown,
  Ha as DropdownItem,
  zi as Editor,
  vi as Inspector,
  $i as MultiView,
  Fn as NavButton,
  Ii as RemoteComponents,
  Bi as RemoteController,
  Gt as RemoteTheatre,
  Ni as RemoteThree,
  Li as RemoteTweakpane,
  Ui as SceneInspector,
  Fi as SidePanel,
  k as ToolEvents,
  Tt as capitalize,
  Ke as clamp,
  Da as colorToHex,
  R as debugDispatcher,
  ki as defaultTheatreCallback,
  ft as dispose,
  Pa as disposeMaterial,
  Pi as disposeTexture,
  Di as distance,
  Bt as hierarchyUUID,
  ka as isColor,
  nn as mix,
  zt as noop,
  tn as normalize,
  Ra as randomID,
  rn as resetThreeObjects,
  an as round,
  ji as theatreEditorApp,
  Lt as totalThreeObjects
};
