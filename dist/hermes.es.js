import { EventDispatcher as pn, Texture as gn, CubeTexture as Hn, RepeatWrapping as Vt, WebGLRenderTarget as Yn, Color as Ut, FrontSide as Vn, BackSide as vn, DoubleSide as bn, NoBlending as qn, NormalBlending as Kn, AdditiveBlending as Xn, SubtractiveBlending as Zn, MultiplyBlending as Jn, CustomBlending as Qn, AddEquation as ea, SubtractEquation as ta, ReverseSubtractEquation as na, MinEquation as aa, MaxEquation as ia, ZeroFactor as yn, OneFactor as En, SrcColorFactor as xn, OneMinusSrcColorFactor as Sn, SrcAlphaFactor as Cn, OneMinusSrcAlphaFactor as wn, DstAlphaFactor as Mn, OneMinusDstAlphaFactor as On, DstColorFactor as Tn, OneMinusDstColorFactor as Rn, SrcAlphaSaturateFactor as ra, ConstantColorFactor as _n, OneMinusConstantColorFactor as kn, ConstantAlphaFactor as Dn, OneMinusConstantAlphaFactor as Pn, Matrix4 as sa, Vector3 as J, Euler as oa, Line as ca, BufferGeometry as qt, Float32BufferAttribute as Kt, LineBasicMaterial as la, Mesh as An, MeshBasicMaterial as jn, Ray as ua, Plane as da, MathUtils as ha, MOUSE as it, TOUCH as rt, Quaternion as Xt, Spherical as Zt, Vector2 as pe, ShaderMaterial as In, GLSL3 as fa, PlaneGeometry as ma, Scene as pa, Group as ga, AxesHelper as Jt, MeshDepthMaterial as va, MeshNormalMaterial as ba, WebGLRenderer as ya, PerspectiveCamera as Pt, Raycaster as Ea, OrthographicCamera as Qt, CameraHelper as xa, SpotLightHelper as Sa, PointLightHelper as Ca, HemisphereLightHelper as wa, DirectionalLightHelper as Ma } from "three";
import { Pane as Oa } from "tweakpane";
import * as Ta from "@tweakpane/plugin-essentials";
import Nn, { useState as W, useRef as V, useEffect as Re, useMemo as se, forwardRef as Ra } from "react";
import { Reorder as Ln } from "framer-motion";
const $t = () => {
}, ki = () => {
};
function Mt(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Je(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function en(e, n, a) {
  return (a - e) / (n - e);
}
function tn(e, n, a) {
  return e * (1 - a) + n * a;
}
function Di(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function _a() {
  return Math.round(Math.random() * 1e6).toString();
}
function ka(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Da(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), i = (h) => {
    const u = h.toString(16);
    return u.length === 1 ? "0" + u : u;
  }, o = i(n), d = i(a), r = i(t);
  return "#" + o + d + r;
}
function nn(e, n = 1) {
  return Number(e.toFixed(n));
}
let Nt = 0;
const an = () => {
  Nt = 0;
}, Lt = (e) => {
  if (!e)
    return;
  let n = e.name.replaceAll(" ", "").replaceAll("/", ".");
  if (n.length === 0 && (n = `obj_${Nt}`, Nt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.isMesh !== void 0) {
    const a = e;
    if (Array.isArray(a.material))
      a.material.forEach((t, i) => {
        t.uuid = `${n}.material.${i}`;
      });
    else {
      const t = a.material;
      t.uuid = `${n}.material`;
    }
  }
  e.children.forEach((a) => Lt(a));
}, Pi = (e) => {
  e?.dispose();
}, Pa = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, Ot = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : Ot(n);
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
const P = new pn(), A = {
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
class Tt {
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
class ji extends Tt {
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
        P.dispatchEvent({ type: A.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        P.dispatchEvent({ type: A.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class zt extends Tt {
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
    const d = this.sheet(n, o);
    if (d === void 0)
      return;
    const h = `${this.getSheetInstance(n, o)}_${a}`;
    let u = this.sheetObjects.get(h);
    u !== void 0 ? u = d.object(a, { ...t, ...u.value }, { reconfigure: !0 }) : u = d.object(a, t), this.sheetObjects.set(h, u), this.sheetObjectCBs.set(h, i !== void 0 ? i : $t);
    const f = u.onValuesChange((m) => {
      if (this.app.editor) {
        for (const E in m) {
          const D = m[E];
          typeof D == "object" && ka(D) && (m[E] = {
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
            sheetObject: h,
            values: m
          }
        });
      }
      const b = this.sheetObjectCBs.get(h);
      b !== void 0 && b(m);
    });
    return this.sheetObjectUnsubscribe.set(h, f), u;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(a)?.detachObject(t);
    const o = `${a}_${t}`, d = this.sheetObjectUnsubscribe.get(o);
    d !== void 0 && (this.sheetObjects.delete(o), this.sheetObjectCBs.delete(o), this.sheetObjectUnsubscribe.delete(o), d());
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
      this.studio?.ui.restore(), this.studio?.onSelectionChange((d) => {
        d.length < 1 || d.forEach((r) => {
          let h = r.address.sheetId, u = "setSheet", f = {};
          switch (r.type) {
            case "Theatre_Sheet_PublicAPI":
              u = "setSheet", f = {
                sheet: r.address.sheetId
              }, a.activeSheet = a.sheets.get(r.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              u = "setSheetObject", h += `_${r.address.objectKey}`, f = {
                id: h,
                sheet: r.address.sheetId,
                key: r.address.objectKey
              }, a.activeSheet = a.sheets.get(r.address.sheetId);
              break;
          }
          n.send({ event: u, target: "app", data: f });
        });
      });
      let t = -1;
      const i = () => {
        if (zt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
          t = a.activeSheet.sequence.position;
          const d = a.activeSheet;
          n.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: t,
              sheet: d.address.sheetId
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
    a.ui.restore(), a.onSelectionChange((d) => {
      d.length < 1 || d.forEach((r) => {
        let h = r.address.sheetId, u = "setSheet", f = {};
        switch (r.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", f = {
              sheet: r.address.sheetId
            }, n.activeSheet = n.sheets.get(r.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", h += `_${r.address.objectKey}`, f = {
              id: h,
              sheet: r.address.sheetId,
              key: r.address.objectKey
            }, n.activeSheet = n.sheets.get(r.address.sheetId);
            break;
        }
        e.send({ event: u, target: "app", data: f });
      });
    });
    let t = -1;
    const i = () => {
      if (zt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
        t = n.activeSheet.sequence.position;
        const d = n.activeSheet;
        e.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: t,
            sheet: d.address.sheetId
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
function St(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((a) => {
    n.children.push(St(a));
  }), n;
}
function ja(e) {
  const n = {};
  for (const a in e) {
    const t = e[a].value;
    n[a] = { value: t }, t === null ? n[a].value = {
      src: "",
      offset: [0, 0],
      repeat: [1, 1]
    } : t.isTexture && (n[a].value = {
      src: t.image.src,
      offset: [t.offset.x, t.offset.y],
      repeat: [t.repeat.x, t.repeat.y]
    });
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
function st(e) {
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
            if (i instanceof gn) {
              const d = i.source.toJSON().url;
              n[a] = {
                src: d,
                offset: [i.offset.x, i.offset.y],
                repeat: [i.repeat.x, i.repeat.y]
              };
            } else
              i instanceof Hn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = {
                src: "",
                offset: [i.offset.x, i.offset.y],
                repeat: [i.repeat.x, i.repeat.y]
              });
          else
            a === "uniforms" && (n[a] = ja(n[a]));
        else
          n[a] = {
            src: "",
            offset: [0, 0],
            repeat: [1, 1]
          };
        break;
    }
  }
  return n;
}
function At(e) {
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
      t.material.forEach((o) => {
        i.push(st(o));
      }), n.material = i;
    } else
      n.material = st(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((o) => {
        i.push(st(o));
      }), n.material = i;
    } else
      n.material = st(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((o) => {
        i.push(st(o));
      }), n.material = i;
    } else
      n.material = st(t.material);
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
function te(e, n, a) {
  if (e === void 0) {
    console.log(`Hermes - Can't set props: ${n}`, a);
    return;
  }
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
    let d;
    switch (i) {
      case 1:
        d = e[t[0]];
        break;
      case 2:
        d = e[t[0]][t[1]];
        break;
      case 3:
        d = e[t[0]][t[1]][t[2]];
        break;
      case 4:
        d = e[t[0]][t[1]][t[2]][t[3]];
        break;
      case 5:
        d = e[t[0]][t[1]][t[2]][t[3]][t[4]];
        break;
    }
    d != null && La(d, a);
  }
}
function Bn(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const i = new gn(t);
      i.wrapS = Vt, i.wrapT = Vt, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Ni extends Tt {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((n) => {
      Ot(n);
    }), this.scenes.clear(), this.scene && Ot(this.scene), this.renderTargets.forEach((n) => {
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
    const a = At(n);
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
    an(), Lt(n);
    const a = St(n);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: a
    });
  }
  removeScene(n) {
    if (n === void 0 || (this.scenes.delete(n.name), !this.app.debugEnabled))
      return;
    const a = St(n);
    this.app.send({
      event: "removeScene",
      target: "editor",
      data: a
    });
  }
  removeAllScenes() {
    this.scenes.forEach((n) => this.removeScene(n));
  }
  getScene(n) {
    let a = null;
    return this.scenes.forEach((t, i) => {
      n.search(i) > -1 && (a = t);
    }), a;
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    an(), Lt(n);
    const a = St(n);
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
  handleApp(n, a, t) {
    switch (t.event) {
      case "getObject":
        P.dispatchEvent({ type: A.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        P.dispatchEvent({ type: A.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        P.dispatchEvent({ type: A.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        P.dispatchEvent({ type: A.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        P.dispatchEvent({ type: A.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        P.dispatchEvent({ type: A.ADD_SCENE, value: t.data });
        break;
      case "removeScene":
        P.dispatchEvent({ type: A.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        P.dispatchEvent({ type: A.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        P.dispatchEvent({ type: A.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        P.dispatchEvent({ type: A.REMOVE_CAMERA, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(n, a) {
    const t = new Yn(32, 32, a);
    t.texture.name = n, this.renderTargets.set(n, t);
  }
  resize(n, a) {
    const t = this.dpr;
    this.rendererWidth = n, this.rendererHeight = a, this.renderTargets.forEach((i) => {
      i.setSize(n * t, a * t);
    }), this.renderer?.setSize(n, a);
  }
  set dpr(n) {
    this.renderer?.setPixelRatio(Je(1, 2, n));
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
class Li extends Tt {
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
    const o = this.bindID, d = t.onChange !== void 0 ? t.onChange : $t;
    this.bindCBs.set(o, d), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, t).on("change", (h) => {
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
var Bt = { exports: {} }, dt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rn;
function Ba() {
  if (rn)
    return dt;
  rn = 1;
  var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(r, h, u) {
    var f, m = {}, b = null, E = null;
    u !== void 0 && (b = "" + u), h.key !== void 0 && (b = "" + h.key), h.ref !== void 0 && (E = h.ref);
    for (f in h)
      t.call(h, f) && !o.hasOwnProperty(f) && (m[f] = h[f]);
    if (r && r.defaultProps)
      for (f in h = r.defaultProps, h)
        m[f] === void 0 && (m[f] = h[f]);
    return { $$typeof: n, type: r, key: b, ref: E, props: m, _owner: i.current };
  }
  return dt.Fragment = a, dt.jsx = d, dt.jsxs = d, dt;
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
var sn;
function Fa() {
  return sn || (sn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), r = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), E = Symbol.for("react.offscreen"), D = Symbol.iterator, $ = "@@iterator";
    function z(s) {
      if (s === null || typeof s != "object")
        return null;
      var p = D && s[D] || s[$];
      return typeof p == "function" ? p : null;
    }
    var B = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(s) {
      {
        for (var p = arguments.length, y = new Array(p > 1 ? p - 1 : 0), w = 1; w < p; w++)
          y[w - 1] = arguments[w];
        T("error", s, y);
      }
    }
    function T(s, p, y) {
      {
        var w = B.ReactDebugCurrentFrame, U = w.getStackAddendum();
        U !== "" && (p += "%s", y = y.concat([U]));
        var H = y.map(function(N) {
          return String(N);
        });
        H.unshift("Warning: " + p), Function.prototype.apply.call(console[s], console, H);
      }
    }
    var X = !1, ne = !1, ge = !1, q = !1, ve = !1, le;
    le = Symbol.for("react.module.reference");
    function _e(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === t || s === o || ve || s === i || s === u || s === f || q || s === E || X || ne || ge || typeof s == "object" && s !== null && (s.$$typeof === b || s.$$typeof === m || s.$$typeof === d || s.$$typeof === r || s.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === le || s.getModuleId !== void 0));
    }
    function ke(s, p, y) {
      var w = s.displayName;
      if (w)
        return w;
      var U = p.displayName || p.name || "";
      return U !== "" ? y + "(" + U + ")" : y;
    }
    function ye(s) {
      return s.displayName || "Context";
    }
    function F(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case t:
          return "Fragment";
        case a:
          return "Portal";
        case o:
          return "Profiler";
        case i:
          return "StrictMode";
        case u:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case r:
            var p = s;
            return ye(p) + ".Consumer";
          case d:
            var y = s;
            return ye(y._context) + ".Provider";
          case h:
            return ke(s, s.render, "ForwardRef");
          case m:
            var w = s.displayName || null;
            return w !== null ? w : F(s.type) || "Memo";
          case b: {
            var U = s, H = U._payload, N = U._init;
            try {
              return F(N(H));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ee = Object.assign, R = 0, Me, De, Ie, Pe, Ae, je, qe;
    function Ne() {
    }
    Ne.__reactDisabledLog = !0;
    function Ke() {
      {
        if (R === 0) {
          Me = console.log, De = console.info, Ie = console.warn, Pe = console.error, Ae = console.group, je = console.groupCollapsed, qe = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: Ne,
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
        R++;
      }
    }
    function ct() {
      {
        if (R--, R === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ee({}, s, {
              value: Me
            }),
            info: Ee({}, s, {
              value: De
            }),
            warn: Ee({}, s, {
              value: Ie
            }),
            error: Ee({}, s, {
              value: Pe
            }),
            group: Ee({}, s, {
              value: Ae
            }),
            groupCollapsed: Ee({}, s, {
              value: je
            }),
            groupEnd: Ee({}, s, {
              value: qe
            })
          });
        }
        R < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Le = B.ReactCurrentDispatcher, ae;
    function fe(s, p, y) {
      {
        if (ae === void 0)
          try {
            throw Error();
          } catch (U) {
            var w = U.stack.trim().match(/\n( *(at )?)/);
            ae = w && w[1] || "";
          }
        return `
` + ae + s;
      }
    }
    var Ue = !1, Be;
    {
      var be = typeof WeakMap == "function" ? WeakMap : Map;
      Be = new be();
    }
    function g(s, p) {
      if (!s || Ue)
        return "";
      {
        var y = Be.get(s);
        if (y !== void 0)
          return y;
      }
      var w;
      Ue = !0;
      var U = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var H;
      H = Le.current, Le.current = null, Ke();
      try {
        if (p) {
          var N = function() {
            throw Error();
          };
          if (Object.defineProperty(N.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(N, []);
            } catch (Fe) {
              w = Fe;
            }
            Reflect.construct(s, [], N);
          } else {
            try {
              N.call();
            } catch (Fe) {
              w = Fe;
            }
            s.call(N.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Fe) {
            w = Fe;
          }
          s();
        }
      } catch (Fe) {
        if (Fe && w && typeof Fe.stack == "string") {
          for (var I = Fe.stack.split(`
`), he = w.stack.split(`
`), ee = I.length - 1, ie = he.length - 1; ee >= 1 && ie >= 0 && I[ee] !== he[ie]; )
            ie--;
          for (; ee >= 1 && ie >= 0; ee--, ie--)
            if (I[ee] !== he[ie]) {
              if (ee !== 1 || ie !== 1)
                do
                  if (ee--, ie--, ie < 0 || I[ee] !== he[ie]) {
                    var we = `
` + I[ee].replace(" at new ", " at ");
                    return s.displayName && we.includes("<anonymous>") && (we = we.replace("<anonymous>", s.displayName)), typeof s == "function" && Be.set(s, we), we;
                  }
                while (ee >= 1 && ie >= 0);
              break;
            }
        }
      } finally {
        Ue = !1, Le.current = H, ct(), Error.prepareStackTrace = U;
      }
      var at = s ? s.displayName || s.name : "", Yt = at ? fe(at) : "";
      return typeof s == "function" && Be.set(s, Yt), Yt;
    }
    function v(s, p, y) {
      return g(s, !1);
    }
    function M(s) {
      var p = s.prototype;
      return !!(p && p.isReactComponent);
    }
    function j(s, p, y) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return g(s, M(s));
      if (typeof s == "string")
        return fe(s);
      switch (s) {
        case u:
          return fe("Suspense");
        case f:
          return fe("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case h:
            return v(s.render);
          case m:
            return j(s.type, p, y);
          case b: {
            var w = s, U = w._payload, H = w._init;
            try {
              return j(H(U), p, y);
            } catch {
            }
          }
        }
      return "";
    }
    var oe = Object.prototype.hasOwnProperty, ue = {}, O = B.ReactDebugCurrentFrame;
    function S(s) {
      if (s) {
        var p = s._owner, y = j(s.type, s._source, p ? p.type : null);
        O.setExtraStackFrame(y);
      } else
        O.setExtraStackFrame(null);
    }
    function G(s, p, y, w, U) {
      {
        var H = Function.call.bind(oe);
        for (var N in s)
          if (H(s, N)) {
            var I = void 0;
            try {
              if (typeof s[N] != "function") {
                var he = Error((w || "React class") + ": " + y + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              I = s[N](p, N, w, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ee) {
              I = ee;
            }
            I && !(I instanceof Error) && (S(U), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", y, N, typeof I), S(null)), I instanceof Error && !(I.message in ue) && (ue[I.message] = !0, S(U), C("Failed %s type: %s", y, I.message), S(null));
          }
      }
    }
    var Z = Array.isArray;
    function _(s) {
      return Z(s);
    }
    function Y(s) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, y = p && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return y;
      }
    }
    function Q(s) {
      try {
        return $e(s), !1;
      } catch {
        return !0;
      }
    }
    function $e(s) {
      return "" + s;
    }
    function ze(s) {
      if (Q(s))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Y(s)), $e(s);
    }
    var Ge = B.ReactCurrentOwner, lt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ut, pt, tt;
    tt = {};
    function _t(s) {
      if (oe.call(s, "ref")) {
        var p = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function kt(s) {
      if (oe.call(s, "key")) {
        var p = Object.getOwnPropertyDescriptor(s, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function Dt(s, p) {
      if (typeof s.ref == "string" && Ge.current && p && Ge.current.stateNode !== p) {
        var y = F(Ge.current.type);
        tt[y] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F(Ge.current.type), s.ref), tt[y] = !0);
      }
    }
    function gt(s, p) {
      {
        var y = function() {
          ut || (ut = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        y.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: y,
          configurable: !0
        });
      }
    }
    function We(s, p) {
      {
        var y = function() {
          pt || (pt = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        y.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: y,
          configurable: !0
        });
      }
    }
    var Wt = function(s, p, y, w, U, H, N) {
      var I = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: p,
        ref: y,
        props: N,
        // Record the component responsible for creating this element.
        _owner: H
      };
      return I._store = {}, Object.defineProperty(I._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(I, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(I, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: U
      }), Object.freeze && (Object.freeze(I.props), Object.freeze(I)), I;
    };
    function c(s, p, y, w, U) {
      {
        var H, N = {}, I = null, he = null;
        y !== void 0 && (ze(y), I = "" + y), kt(p) && (ze(p.key), I = "" + p.key), _t(p) && (he = p.ref, Dt(p, U));
        for (H in p)
          oe.call(p, H) && !lt.hasOwnProperty(H) && (N[H] = p[H]);
        if (s && s.defaultProps) {
          var ee = s.defaultProps;
          for (H in ee)
            N[H] === void 0 && (N[H] = ee[H]);
        }
        if (I || he) {
          var ie = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          I && gt(N, ie), he && We(N, ie);
        }
        return Wt(s, I, he, U, w, Ge.current, N);
      }
    }
    var x = B.ReactCurrentOwner, k = B.ReactDebugCurrentFrame;
    function L(s) {
      if (s) {
        var p = s._owner, y = j(s.type, s._source, p ? p.type : null);
        k.setExtraStackFrame(y);
      } else
        k.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function xe(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function de() {
      {
        if (x.current) {
          var s = F(x.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function Ht(s) {
      {
        if (s !== void 0) {
          var p = s.fileName.replace(/^.*[\\\/]/, ""), y = s.lineNumber;
          return `

Check your code at ` + p + ":" + y + ".";
        }
        return "";
      }
    }
    var vt = {};
    function bt(s) {
      {
        var p = de();
        if (!p) {
          var y = typeof s == "string" ? s : s.displayName || s.name;
          y && (p = `

Check the top-level render call using <` + y + ">.");
        }
        return p;
      }
    }
    function Se(s, p) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var y = bt(p);
        if (vt[y])
          return;
        vt[y] = !0;
        var w = "";
        s && s._owner && s._owner !== x.current && (w = " It was passed a child from " + F(s._owner.type) + "."), L(s), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, w), L(null);
      }
    }
    function Ce(s, p) {
      {
        if (typeof s != "object")
          return;
        if (_(s))
          for (var y = 0; y < s.length; y++) {
            var w = s[y];
            xe(w) && Se(w, p);
          }
        else if (xe(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var U = z(s);
          if (typeof U == "function" && U !== s.entries)
            for (var H = U.call(s), N; !(N = H.next()).done; )
              xe(N.value) && Se(N.value, p);
        }
      }
    }
    function Xe(s) {
      {
        var p = s.type;
        if (p == null || typeof p == "string")
          return;
        var y;
        if (typeof p == "function")
          y = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === m))
          y = p.propTypes;
        else
          return;
        if (y) {
          var w = F(p);
          G(y, s.props, "prop", w, s);
        } else if (p.PropTypes !== void 0 && !re) {
          re = !0;
          var U = F(p);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", U || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(s) {
      {
        for (var p = Object.keys(s.props), y = 0; y < p.length; y++) {
          var w = p[y];
          if (w !== "children" && w !== "key") {
            L(s), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), L(null);
            break;
          }
        }
        s.ref !== null && (L(s), C("Invalid attribute `ref` supplied to `React.Fragment`."), L(null));
      }
    }
    function He(s, p, y, w, U, H) {
      {
        var N = _e(s);
        if (!N) {
          var I = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (I += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = Ht(U);
          he ? I += he : I += de();
          var ee;
          s === null ? ee = "null" : _(s) ? ee = "array" : s !== void 0 && s.$$typeof === n ? (ee = "<" + (F(s.type) || "Unknown") + " />", I = " Did you accidentally export a JSX literal instead of a component?") : ee = typeof s, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ee, I);
        }
        var ie = c(s, p, y, U, H);
        if (ie == null)
          return ie;
        if (N) {
          var we = p.children;
          if (we !== void 0)
            if (w)
              if (_(we)) {
                for (var at = 0; at < we.length; at++)
                  Ce(we[at], s);
                Object.freeze && Object.freeze(we);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ce(we, s);
        }
        return s === t ? Oe(ie) : Xe(ie), ie;
      }
    }
    function nt(s, p, y) {
      return He(s, p, y, !0);
    }
    function yt(s, p, y) {
      return He(s, p, y, !1);
    }
    var Gn = yt, Wn = nt;
    ht.Fragment = t, ht.jsx = Gn, ht.jsxs = Wn;
  }()), ht;
}
process.env.NODE_ENV === "production" ? Bt.exports = Ba() : Bt.exports = Fa();
var l = Bt.exports;
function Fn(e) {
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
  return /* @__PURE__ */ l.jsx(Ln.Item, { value: e.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    $a,
    /* @__PURE__ */ l.jsx("span", { children: e.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Ua })
  ] }) }, e.title);
}
function Ga(e) {
  const [n, a] = W(!1), [t, i] = W(e.options), o = (u) => {
    e.onDragComplete(u), i(u);
  }, d = (u) => {
    const f = [...t];
    f.splice(u, 1), o(f);
  }, r = [];
  t.forEach((u, f) => {
    r.push(/* @__PURE__ */ l.jsx(za, { index: f, title: u, onDelete: d }, u));
  });
  let h = "dropdown draggable";
  return e.subdropdown && (h += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: h, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Fn, { title: e.title }),
    /* @__PURE__ */ l.jsx(Ln.Group, { axis: "y", values: t, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: r })
  ] });
}
function Wa(e) {
  const [n, a] = W(!1), t = [];
  e.options.map((o, d) => {
    e.onSelect !== void 0 && (o.onSelect = e.onSelect), t.push(/* @__PURE__ */ l.jsx(Ha, { option: o }, d));
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
  const { option: n } = e, [a, t] = W("");
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
    switch (n.forEach((d) => {
      d.callback(e, d.remote, o);
    }), o.event) {
      case "custom":
        P.dispatchEvent({ type: A.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((d) => {
      d.callback(e, d.remote, o);
    }), o.event) {
      case "custom":
        P.dispatchEvent({ type: A.CUSTOM, value: o.data });
        break;
    }
  }
  e.listen = (o) => {
    o.target === "editor" ? i(o) : t(o);
  };
}
function Gt(e) {
  const [n, a] = W(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
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
function Un(e) {
  const n = V(null), [a, t] = W(!1), i = e.child !== void 0 && e.child.children.length > 0, o = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((d, r) => {
    o.push(/* @__PURE__ */ l.jsx(Un, { child: d, three: e.three }, r));
  }), Re(() => {
    const d = e.child.uuid, r = e.three.getScene(d);
    if (r !== null) {
      const h = r.getObjectByProperty("uuid", d);
      h !== void 0 && (n.current.style.opacity = h.visible ? "1" : "0.25");
    }
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
              const d = e.three.getScene(e.child.uuid);
              if (d !== null) {
                const r = d.getObjectByProperty("uuid", e.child.uuid);
                if (r !== void 0) {
                  const h = "visible", u = !r.visible;
                  n.current.style.opacity = u ? "1" : "0.25", e.three.updateObject(e.child.uuid, h, u), te(r, h, u);
                } else
                  console.log(`Hermes - Couldn't find object: ${e.child.uuid}`, d);
              } else
                console.log(`Hermes - Couldn't find object in scene: ${e.child.uuid}, ${e.child.name}`);
            }
          }
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Aa(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: a ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: o }) })
  ] }, Math.random()) });
}
function Ya(e) {
  const n = [];
  return e.child?.children.map((a, t) => {
    n.push(/* @__PURE__ */ l.jsx(Un, { child: a, scene: e.scene, three: e.three }, t));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
function Va(e) {
  const [n, a] = W(e.defaultValue);
  return Re(() => {
    let t = !1, i = -1, o = 0, d = e.defaultValue;
    const r = (b) => {
      t = !0, o = Number(e.input.current?.value), i = b.clientX, document.addEventListener("mouseup", u, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", u, !1);
    }, h = (b) => {
      if (!t)
        return;
      const E = e.step !== void 0 ? e.step : 1, D = (b.clientX - i) * E;
      d = Number((o + D).toFixed(4)), e.min !== void 0 && (d = Math.max(d, e.min)), e.max !== void 0 && (d = Math.min(d, e.max)), e.onChange !== void 0 && e.onChange(d), a(d);
    }, u = () => {
      t = !1, document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", u);
    }, f = (b) => {
      const E = Number(b.target.value);
      a(E);
    }, m = (b) => {
      const E = Number(b.target.value);
      e.onChange !== void 0 && e.onChange(E), a(E);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", r, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", m), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", r), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", u);
    };
  }, []), n;
}
function Qe(e) {
  const n = V(null), a = V(null), t = Va({
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
          onChange: $t
        }
      )
    ] })
  ] });
}
function qa(e) {
  const n = V(null), a = V(null), t = V(null), i = V(null), o = V(null), d = V(null), [r, h] = W(e.value), [u, f] = W({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [m, b] = W(!1);
  function E() {
    m || (window.addEventListener("mousemove", $), window.addEventListener("mouseup", D), window.addEventListener("mouseup", D), b(!0));
  }
  function D() {
    window.removeEventListener("mousemove", $), window.removeEventListener("mouseup", D), b(!1);
  }
  function $(T) {
    const X = o.current.getBoundingClientRect(), ne = Je(0, 99, T.clientX - X.left) / 99, ge = Je(0, 99, T.clientY - X.top) / 99, q = nn(tn(u.min, u.max, ne), 3), ve = nn(tn(u.min, u.max, ge), 3);
    e.onChange({ target: { value: { x: q, y: ve } } }), h({ x: q, y: ve });
  }
  function z(T) {
    let X = r.x, ne = r.y;
    T.target === n.current ? X = Number(T.target.value) : ne = Number(T.target.value), h({ x: X, y: ne });
  }
  function B() {
    const T = Number(t.current.value);
    f({ min: T, max: u.max }), (r.x < T || r.y < T) && h({ x: Je(T, u.max, r.x), y: Je(T, u.max, r.y) });
  }
  function C() {
    const T = Number(i.current.value);
    f({ min: u.min, max: T }), (r.x > T || r.y > T) && h({ x: Je(u.min, T, r.x), y: Je(u.min, T, r.y) });
  }
  return Re(() => {
    const T = en(u.min, u.max, r.x), X = en(u.min, u.max, r.y);
    d.current.style.left = `${T * 100}%`, d.current.style.top = `${X * 100}%`;
  }, [u, r]), /* @__PURE__ */ l.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: r.x,
            min: u.min,
            max: u.max,
            step: 0.01,
            onChange: z
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
            value: r.y,
            min: u.min,
            max: u.max,
            step: 0.01,
            onChange: z
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
            value: u.min,
            step: 0.01,
            onChange: B
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
            onChange: C
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: o, onMouseDown: E, onMouseUp: D, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: d })
    ] })
  ] });
}
function on(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = [];
  if (n) {
    const o = se(() => e.value, []), d = (h, u) => {
      o[h] = u, e.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((h) => {
      const u = V(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: u, children: h.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: o[h],
              type: "number",
              prop: h,
              step: 0.01,
              labelRef: u,
              onChange: d
            }
          )
        ] }, h)
      );
    });
  } else if (a) {
    const o = se(() => e.value, []), d = (h, u) => {
      o[h] = u, e.onChange({ target: { value: o } });
    };
    ["_x", "_y", "_z"].forEach((h) => {
      const u = V(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: u, children: h.substring(1).toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: o[h],
              type: "number",
              prop: h,
              step: 0.01,
              labelRef: u,
              onChange: d
            }
          )
        ] }, h)
      );
    });
  } else if (t) {
    const o = se(() => e.value, []), d = (r, h) => {
      const u = Number(r);
      o.elements[u] = h, e.onChange({ target: { value: o } });
    };
    for (let r = 0; r < 9; r++) {
      const h = V(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: r + 1 }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: o.elements[r],
              type: "number",
              prop: r.toString(),
              step: 0.01,
              labelRef: h,
              onChange: d
            }
          )
        ] }, r.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid3", children: i }, Math.random().toString());
}
function Ka(e) {
  const n = e.value.x !== void 0, a = [];
  if (n) {
    const t = se(() => e.value, []), i = (d, r) => {
      t[d] = r, e.onChange({ target: { value: t } });
    };
    ["x", "y", "z", "w"].forEach((d) => {
      const r = V(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: r, children: d.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: t.x,
              type: "number",
              prop: d,
              step: 0.01,
              labelRef: r,
              onChange: i
            }
          )
        ] }, d)
      );
    });
  } else {
    const t = se(() => e.value, []), i = (o, d) => {
      const r = Number(o);
      t.elements[r] = d, e.onChange({ target: { value: t } });
    };
    for (let o = 0; o < 16; o++) {
      const d = V(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: o + 1 }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: t.elements[o],
              type: "number",
              prop: o.toString(),
              step: 0.01,
              labelRef: d,
              onChange: i
            }
          )
        ] }, o.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid4", children: a });
}
function Xa(e) {
  return "items" in e;
}
function et(e) {
  const n = [];
  return e.items.forEach((a) => {
    Xa(a) ? n.push(
      /* @__PURE__ */ l.jsx(et, { title: Mt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        Ct,
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
  }), /* @__PURE__ */ l.jsx(Gt, { label: e.title, open: e.expanded === !0, children: n });
}
function Za(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "blendAlpha" || e === "blendColor" || e === "blendDstAlpha" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function Ja(e) {
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
function Qa() {
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
const ei = [
  {
    title: "Front",
    value: Vn
  },
  {
    title: "Back",
    value: vn
  },
  {
    title: "Double",
    value: bn
  }
], ti = [
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
    value: Xn
  },
  {
    title: "Subtractive",
    value: Zn
  },
  {
    title: "Multiply",
    value: Jn
  },
  {
    title: "Custom",
    value: Qn
  }
], ni = [
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
], ai = [
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
    valye: Rn
  },
  {
    title: "Src Alpha Saturate",
    valye: ra
  },
  {
    title: "Constant Color",
    valye: _n
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
], ii = [
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
    valye: Rn
  },
  {
    title: "Constant Color",
    valye: _n
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
function ft(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ri(e, n, a, t) {
  return {
    type: "boolean",
    title: Rt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, o) => {
      t.updateObject(a.uuid, `material.${e}`, o), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const d = t.getScene(a.uuid);
      if (d !== null) {
        const r = d.getObjectByProperty("uuid", a.uuid);
        te(r, `material.${e}`, o);
      }
    }
  };
}
function si(e, n, a, t) {
  const i = {
    type: "number",
    title: Rt(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (o, d) => {
      t.updateObject(a.uuid, `material.${e}`, d), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", a.uuid);
        te(h, `material.${e}`, d);
      }
    }
  };
  switch (e) {
    case "blending":
      ft(i, ti);
      break;
    case "blendDst":
      ft(i, ii);
      break;
    case "blendEquation":
      ft(i, ni);
      break;
    case "blendSrc":
      ft(i, ai);
      break;
    case "side":
      ft(i, ei);
      break;
  }
  return $n(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function oi(e, n, a, t) {
  const i = {
    type: "string",
    title: Rt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (d, r) => {
      t.updateObject(a.uuid, `material.${e}`, r), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = t.getScene(a.uuid);
      if (h !== null) {
        const u = h.getObjectByProperty("uuid", a.uuid);
        te(u, `material.${e}`, r);
      }
    },
    onKeyDown: (d) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (d, r) => {
    i.latest = r, t.updateObject(a.uuid, `material.${e}`, r);
    const h = t.getScene(a.uuid);
    if (h !== null) {
      const u = h.getObjectByProperty("uuid", a.uuid);
      te(u, `material.${e}`, r);
    }
  }, i.onKeyDown = (d) => {
    if (d.key === "Enter" && (d.altKey || d.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", a.uuid);
        te(h, "material.needsUpdate", !0);
      }
    }
  }), i;
}
function ci(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function li(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function ui(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function Ft(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function mt(e, n, a, t, i = "", o = !1) {
  const d = Rt(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = i.length > 0 ? `${i}.${e}` : e, h = typeof n;
  if (h === "boolean" || h === "string")
    return {
      title: d,
      prop: r,
      type: h,
      value: n,
      disabled: o,
      onChange: (u, f) => {
        t.updateObject(a.uuid, `material.${r}`, f);
        const m = t.getScene(a.uuid);
        if (m !== null) {
          const b = m.getObjectByProperty("uuid", a.uuid);
          te(b, `material.${r}`, f);
        }
      }
    };
  if (h === "number") {
    const u = {
      title: d,
      prop: r,
      type: "number",
      value: n,
      step: 0.01,
      disabled: o,
      onChange: (f, m) => {
        t.updateObject(a.uuid, `material.${r}`, m);
        const b = t.getScene(a.uuid);
        if (b !== null) {
          const E = b.getObjectByProperty("uuid", a.uuid);
          te(E, `material.${r}`, m);
        }
      }
    };
    return $n(d) && (u.type = "range", u.min = 0, u.max = 1), u;
  } else {
    if (n.isColor)
      return {
        title: d,
        prop: r,
        type: "color",
        value: n,
        disabled: o,
        onChange: (u, f) => {
          const m = new Ut(f);
          t.updateObject(a.uuid, `material.${r}`, m);
          const b = t.getScene(a.uuid);
          if (b !== null) {
            const E = b.getObjectByProperty("uuid", a.uuid);
            te(E, `material.${r}`, m);
          }
        }
      };
    if (Array.isArray(n)) {
      const u = [];
      for (const f in n) {
        const m = n[f], b = `[${f.toString()}]`;
        if (m.value !== void 0) {
          const E = mt(`${b}.value`, m.value, a, t, r, o);
          E !== void 0 && u.push(E);
        } else {
          const E = mt(b, m, a, t, r, o);
          E !== void 0 && u.push(E);
        }
      }
      if (u.length > 0)
        return Ft(u), {
          title: d,
          items: u
        };
    } else {
      if (ci(n))
        return {
          title: d,
          prop: r,
          type: "vector2",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const b = m.getObjectByProperty("uuid", a.uuid);
              te(b, `material.${r}`, f);
            }
          }
        };
      if (li(n))
        return {
          title: d,
          prop: r,
          type: "grid3",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const b = m.getObjectByProperty("uuid", a.uuid);
              te(b, `material.${r}`, f);
            }
          }
        };
      if (ui(n))
        return {
          title: d,
          prop: r,
          type: "grid4",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const b = m.getObjectByProperty("uuid", a.uuid);
              te(b, `material.${r}`, f);
            }
          }
        };
      if (n.isEuler)
        return {
          title: d,
          prop: r,
          type: "euler",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const b = m.getObjectByProperty("uuid", a.uuid);
              te(b, `material.${r}`, f);
            }
          }
        };
      if (n.src !== void 0)
        return {
          title: d,
          type: "image",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            const m = Ja(e), b = i.length > 0 ? `${i}.${m}` : m;
            t.createTexture(a.uuid, `material.${b}`, f);
            const E = t.getScene(a.uuid);
            if (E !== null) {
              const D = E.getObjectByProperty("uuid", a.uuid);
              if (D !== void 0) {
                const $ = (z) => {
                  const B = D.material, C = b.split(".");
                  switch (C.length) {
                    case 1:
                      B[C[0]] = z;
                      break;
                    case 2:
                      B[C[0]][C[1]] = z;
                      break;
                    case 3:
                      B[C[0]][C[1]][C[2]] = z;
                      break;
                    case 4:
                      B[C[0]][C[1]][C[2]][C[3]] = z;
                      break;
                    case 5:
                      B[C[0]][C[1]][C[2]][C[3]][C[4]] = z;
                      break;
                  }
                  B.needsUpdate = !0;
                };
                f.src.length > 0 ? Bn(f.src).then((z) => {
                  z.offset.set(f.offset[0], f.offset[1]), z.repeat.set(f.repeat[0], f.repeat[1]), $(z);
                }) : $(null);
              }
            }
          }
        };
      if (n.elements !== void 0)
        return {
          title: d,
          prop: r,
          type: n.elements.length > 9 ? "grid4" : "grid3",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const b = m.getObjectByProperty("uuid", a.uuid);
              te(b, `material.${r}`, f);
            }
          }
        };
      {
        const u = [], f = e === "defines" || e === "extensions";
        try {
          for (const m in n) {
            const b = n[m];
            if (b !== void 0)
              if (b.value !== void 0) {
                const E = mt(`${m}.value`, b.value, a, t, r, f);
                E !== void 0 && u.push(E);
              } else {
                const E = mt(m, b, a, t, r, f);
                E !== void 0 && u.push(E);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (u.length > 0)
          return Ft(u), {
            title: d,
            items: u
          };
      }
    }
  }
}
function cn(e, n, a) {
  const t = [];
  for (const i in e) {
    if (!Za(i))
      continue;
    const o = typeof e[i], d = e[i];
    if (o === "boolean")
      t.push(ri(i, d, n, a));
    else if (o === "number")
      t.push(si(i, d, n, a));
    else if (o === "string")
      t.push(oi(i, d, n, a));
    else if (o === "object") {
      const r = mt(i, d, n, a);
      r !== void 0 && t.push(r);
    } else
      d !== void 0 && console.log("other:", i, o, d);
  }
  return Ft(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.getScene(n.uuid);
      if (i !== null) {
        const o = i.getObjectByProperty("uuid", n.uuid);
        te(o, "material.needsUpdate", !0);
      }
    }
  }), t;
}
function di(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let o = 0; o < i; o++)
      t.push(
        /* @__PURE__ */ l.jsx(
          et,
          {
            title: `Material ${o}`,
            items: cn(a[o], e, n)
          },
          `Material ${o}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
  } else
    return /* @__PURE__ */ l.jsx(
      et,
      {
        title: "Material",
        items: cn(a, e, n)
      }
    );
}
const ln = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function hi(e) {
  const n = V(null), a = V(null), t = V(null), i = V(null), o = V(null), [d] = W(e.value), [r, h] = W(e.value.offset[0]), [u, f] = W(e.value.offset[1]), [m, b] = W(e.value.repeat[0]), [E, D] = W(e.value.repeat[1]);
  function $(B, C, T, X, ne) {
    if (e.onChange !== void 0) {
      const ge = e.prop !== void 0 ? e.prop : e.title;
      e.onChange(ge, {
        src: B,
        offset: [C, T],
        repeat: [X, ne]
      });
    }
  }
  function z(B) {
    const C = n.current.src, T = B.target.value;
    switch (B.target) {
      case a.current:
        h(T), $(C, T, u, m, E);
        break;
      case t.current:
        f(T), $(C, r, T, m, E);
        break;
      case i.current:
        b(T), $(C, r, u, T, E);
        break;
      case o.current:
        D(T), $(C, r, u, m, T);
        break;
    }
  }
  return /* @__PURE__ */ l.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ l.jsx("img", { alt: e.title, ref: n, onClick: () => {
      Qa().then((B) => {
        n.current.src = B, $(B, r, u, m, E);
      });
    }, src: d.src.length > 0 ? d.src : ln }),
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: r,
            step: 0.01,
            onChange: z
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: u,
            step: 0.01,
            onChange: z
          }
        )
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: m,
            step: 0.01,
            onChange: z
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: o,
            type: "number",
            value: E,
            step: 0.01,
            onChange: z
          }
        )
      ] }),
      /* @__PURE__ */ l.jsx("button", { onClick: () => {
        $("", r, u, m, E), n.current.src = ln;
      }, children: "Clear" })
    ] })
  ] });
}
function Ct(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Da(e.value));
  const [a, t] = W(n), i = V(null), o = (u) => {
    let f = u.target.value;
    e.type === "boolean" ? f = u.target.checked : e.type === "option" && (f = e.options[f].value), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  }, d = {};
  e.disabled && (d.opacity = 0.8);
  const r = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = r || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${h ? "block" : ""}`, style: d, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Mt(e.title) }, "fieldLabel"),
    e.type === "string" && !r && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: o,
        value: a
      }
    ),
    e.type === "string" && r && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: o,
        onKeyDown: (u) => {
          e.onKeyDown !== void 0 && e.onKeyDown(u);
        },
        value: a
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: o,
        checked: a
      }
    ),
    e.type === "number" && /* @__PURE__ */ l.jsx(
      Qe,
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
      Qe,
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
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: o, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: o, disabled: e.disabled })
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
    e.type === "image" && /* @__PURE__ */ l.jsx(hi, { title: e.title, prop: e.prop, value: e.value, onChange: e.onChange }),
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: o, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((u, f) => /* @__PURE__ */ l.jsx("option", { value: u.value, children: Mt(u.title) }, f)) }) }),
    e.type === "vector2" && /* @__PURE__ */ l.jsx(qa, { value: a, min: 0, max: 1, onChange: o }),
    e.type === "grid3" && /* @__PURE__ */ l.jsx(on, { value: a, onChange: o }),
    e.type === "grid4" && /* @__PURE__ */ l.jsx(Ka, { value: a, onChange: o }),
    e.type === "euler" && /* @__PURE__ */ l.jsx(on, { value: a, onChange: o })
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
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const d = n.getScene(e.uuid);
          if (d !== null) {
            const r = d.getObjectByProperty("uuid", e.uuid);
            r !== void 0 && (te(r, i, o), r.updateProjectionMatrix());
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
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const d = n.getScene(e.uuid);
          if (d !== null) {
            const r = d.getObjectByProperty("uuid", e.uuid);
            r !== void 0 && (te(r, i, o), r.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ l.jsx(
    et,
    {
      title: "Camera",
      items: a
    }
  );
}
function mi(e, n) {
  const a = new sa();
  a.elements = e.matrix;
  const t = new J(), i = new oa(), o = new J();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const d = (r, h) => {
    const u = r === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    n.updateObject(e.uuid, r, u);
    const f = n.getScene(e.uuid);
    if (f !== null) {
      const m = f.getObjectByProperty("uuid", e.uuid);
      te(m, r, u);
    }
  };
  return /* @__PURE__ */ l.jsx(
    et,
    {
      title: "Transform",
      items: [
        {
          title: "Position",
          prop: "position",
          type: "grid3",
          value: t,
          onChange: d
        },
        {
          title: "Rotation",
          prop: "rotation",
          type: "grid3",
          value: i,
          onChange: d
        },
        {
          title: "Scale",
          prop: "scale",
          type: "grid3",
          value: o,
          onChange: d
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
        onChange: (o, d) => {
          const r = new Ut(d);
          n.updateObject(e.uuid, o, r);
          const h = n.getScene(e.uuid);
          if (h !== null) {
            const u = h.getObjectByProperty("uuid", e.uuid);
            te(u, o, r);
          }
        }
      }) : a.push({
        title: dn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (o, d) => {
          n.updateObject(e.uuid, o, d);
          const r = n.getScene(e.uuid);
          if (r !== null) {
            const h = r.getObjectByProperty("uuid", e.uuid);
            te(h, o, d);
          }
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    et,
    {
      title: "Light",
      items: a
    }
  );
}
function gi(e, n) {
  const a = [], t = [];
  let i = 0;
  e.animations.forEach((d) => {
    i = Math.max(i, d.duration), d.duration > 0 && t.push({
      title: d.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: d.duration,
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
  const o = n.getScene(e.uuid);
  if (o !== null) {
    const d = o.getObjectByProperty("uuid", e.uuid);
    let r = !1;
    if (d !== void 0) {
      const h = d.mixer;
      if (r = h !== void 0, r) {
        const u = [
          {
            title: "Time Scale",
            type: "range",
            value: h.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (f, m) => {
              h.timeScale = m, n.updateObject(e.uuid, "mixer.timeScale", m);
            }
          }
        ];
        u.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            h.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), a.push({
          title: "Mixer",
          items: u
        });
      }
    }
  }
  return /* @__PURE__ */ l.jsx(et, { title: "Animation", items: a });
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
let me = { ...zn };
function vi(e) {
  const [n, a] = W(-1);
  Re(() => {
    function d(h) {
      me = { ...h.value }, a(Date.now());
    }
    function r() {
      me = { ...zn }, a(Date.now());
    }
    return P.addEventListener(A.SET_SCENE, r), P.addEventListener(A.SET_OBJECT, d), () => {
      P.removeEventListener(A.SET_SCENE, r), P.removeEventListener(A.SET_OBJECT, d);
    };
  }, []);
  const t = me.type.toLowerCase(), i = me.animations.length > 0 || me.mixer !== void 0, o = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Gt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: me.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        Ct,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: me.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ct,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: me.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ct,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: me.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      mi(me, e.three),
      i ? gi(me, e.three) : null,
      t.search("camera") > -1 ? fi(me, e.three) : null,
      t.search("light") > -1 ? pi(me, e.three) : null,
      o ? di(me, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Fi(e) {
  const [n] = W([]), [a, t] = W(0), i = (r) => {
    n.push(r.value), t(Date.now());
  }, o = (r) => {
    const h = r.value;
    for (let u = 0; u < n.length; u++)
      if (h.uuid === n[u].uuid) {
        n.splice(u, 1), t(Date.now());
        return;
      }
  };
  Re(() => (P.addEventListener(A.ADD_SCENE, i), P.addEventListener(A.REMOVE_SCENE, o), () => {
    P.removeEventListener(A.ADD_SCENE, i), P.removeEventListener(A.REMOVE_SCENE, o);
  }), []);
  const d = [];
  return n.forEach((r, h) => {
    d.push(
      /* @__PURE__ */ l.jsx(Gt, { label: `Scene: ${r.name}`, open: !0, children: /* @__PURE__ */ l.jsx(Ya, { child: r, scene: r, three: e.three }) }, `scene_${h}`)
    );
  }), /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    d,
    /* @__PURE__ */ l.jsx(vi, { three: e.three })
  ] }, `SidePanel ${a}`);
}
function Ui(e) {
  return Re(() => {
    function n(r) {
      let h = null;
      return e.three.scenes.forEach((u) => {
        r.search(u.uuid) > -1 && (h = u);
      }), h;
    }
    const a = (r) => {
      const h = r.value, u = n(h), f = u?.getObjectByProperty("uuid", h);
      f !== void 0 ? e.three.setObject(f) : console.log(`Hermes - can't find object: ${h}`, u);
    }, t = (r, h, u) => {
      const f = n(r), m = f?.getObjectByProperty("uuid", r);
      m !== void 0 ? te(m, h, u) : console.log(`Hermes - can't set object: ${r}`, f);
    }, i = (r) => {
      const h = r.value, { key: u, value: f, uuid: m } = h;
      t(m, u, f);
    }, o = (r) => {
      const h = r.value, f = n(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (f !== void 0) {
        const m = (b) => {
          const E = h.key.split(".");
          switch (E.length) {
            case 1:
              f[E[0]] = b;
              break;
            case 2:
              f[E[0]][E[1]] = b;
              break;
            case 3:
              f[E[0]][E[1]][E[2]] = b;
              break;
            case 4:
              f[E[0]][E[1]][E[2]][E[3]] = b;
              break;
            case 5:
              f[E[0]][E[1]][E[2]][E[3]][E[4]] = b;
              break;
          }
          f.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? Bn(h.value.src).then((b) => {
          b.offset.set(h.value.offset[0], h.value.offset[1]), b.repeat.set(h.value.repeat[0], h.value.repeat[1]), m(b);
        }) : m(null);
      }
    }, d = (r) => {
      const { key: h, uuid: u, value: f, subitem: m } = r.value, E = n(u)?.getObjectByProperty("uuid", u);
      if (E !== void 0)
        try {
          m !== void 0 ? Na(E, m)[h](f) : E[h](f);
        } catch (D) {
          console.log("Error requesting method:"), console.log(D), console.log(h), console.log(f);
        }
    };
    return P.addEventListener(A.GET_OBJECT, a), P.addEventListener(A.UPDATE_OBJECT, i), P.addEventListener(A.CREATE_TEXTURE, o), P.addEventListener(A.REQUEST_METHOD, d), () => {
      P.removeEventListener(A.GET_OBJECT, a), P.removeEventListener(A.UPDATE_OBJECT, i), P.removeEventListener(A.CREATE_TEXTURE, o), P.removeEventListener(A.REQUEST_METHOD, d);
    };
  }, []), null;
}
class bi extends ca {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new qt();
    i.setAttribute("position", new Kt(t, 3)), i.computeBoundingSphere();
    const o = new la({ fog: !1 });
    super(i, o), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const d = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new qt();
    r.setAttribute("position", new Kt(d, 3)), r.computeBoundingSphere(), this.add(new An(r, new jn({ side: vn, fog: !1 })));
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
const hn = { type: "change" }, jt = { type: "start" }, fn = { type: "end" }, Et = new ua(), mn = new da(), yi = Math.cos(70 * ha.DEG2RAD);
class Ei extends pn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: it.ROTATE, MIDDLE: it.DOLLY, RIGHT: it.PAN }, this.touches = { ONE: rt.ROTATE, TWO: rt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(c) {
      c.addEventListener("keydown", lt), this._domElementKeyEvents = c;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", lt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(hn), t.update(), o = i.NONE;
    }, this.update = function() {
      const c = new J(), x = new Xt().setFromUnitVectors(n.up, new J(0, 1, 0)), k = x.clone().invert(), L = new J(), re = new Xt(), xe = new J(), de = 2 * Math.PI;
      return function(vt = null) {
        const bt = t.object.position;
        c.copy(bt).sub(t.target), c.applyQuaternion(x), r.setFromVector3(c), t.autoRotate && o === i.NONE && ye(_e(vt)), t.enableDamping ? (r.theta += h.theta * t.dampingFactor, r.phi += h.phi * t.dampingFactor) : (r.theta += h.theta, r.phi += h.phi);
        let Se = t.minAzimuthAngle, Ce = t.maxAzimuthAngle;
        isFinite(Se) && isFinite(Ce) && (Se < -Math.PI ? Se += de : Se > Math.PI && (Se -= de), Ce < -Math.PI ? Ce += de : Ce > Math.PI && (Ce -= de), Se <= Ce ? r.theta = Math.max(Se, Math.min(Ce, r.theta)) : r.theta = r.theta > (Se + Ce) / 2 ? Math.max(Se, r.theta) : Math.min(Ce, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Xe = !1;
        if (t.zoomToCursor && ge || t.object.isOrthographicCamera)
          r.radius = Ae(r.radius);
        else {
          const Oe = r.radius;
          r.radius = Ae(r.radius * u), Xe = Oe != r.radius;
        }
        if (c.setFromSpherical(r), c.applyQuaternion(k), bt.copy(t.target).add(c), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && ge) {
          let Oe = null;
          if (t.object.isPerspectiveCamera) {
            const He = c.length();
            Oe = Ae(He * u);
            const nt = He - Oe;
            t.object.position.addScaledVector(X, nt), t.object.updateMatrixWorld(), Xe = !!nt;
          } else if (t.object.isOrthographicCamera) {
            const He = new J(ne.x, ne.y, 0);
            He.unproject(t.object);
            const nt = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / u)), t.object.updateProjectionMatrix(), Xe = nt !== t.object.zoom;
            const yt = new J(ne.x, ne.y, 0);
            yt.unproject(t.object), t.object.position.sub(yt).add(He), t.object.updateMatrixWorld(), Oe = c.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Oe !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Oe).add(t.object.position) : (Et.origin.copy(t.object.position), Et.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Et.direction)) < yi ? n.lookAt(t.target) : (mn.setFromNormalAndCoplanarPoint(t.object.up, t.target), Et.intersectPlane(mn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Oe = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / u)), Oe !== t.object.zoom && (t.object.updateProjectionMatrix(), Xe = !0);
        }
        return u = 1, ge = !1, Xe || L.distanceToSquared(t.object.position) > d || 8 * (1 - re.dot(t.object.quaternion)) > d || xe.distanceToSquared(t.target) > d ? (t.dispatchEvent(hn), L.copy(t.object.position), re.copy(t.object.quaternion), xe.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", tt), t.domElement.removeEventListener("pointerdown", S), t.domElement.removeEventListener("pointercancel", Z), t.domElement.removeEventListener("wheel", Q), t.domElement.removeEventListener("pointermove", G), t.domElement.removeEventListener("pointerup", Z), t.domElement.getRootNode().removeEventListener("keydown", ze, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", lt), t._domElementKeyEvents = null);
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
    const d = 1e-6, r = new Zt(), h = new Zt();
    let u = 1;
    const f = new J(), m = new pe(), b = new pe(), E = new pe(), D = new pe(), $ = new pe(), z = new pe(), B = new pe(), C = new pe(), T = new pe(), X = new J(), ne = new pe();
    let ge = !1;
    const q = [], ve = {};
    let le = !1;
    function _e(c) {
      return c !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * c : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function ke(c) {
      const x = Math.abs(c * 0.01);
      return Math.pow(0.95, t.zoomSpeed * x);
    }
    function ye(c) {
      h.theta -= c;
    }
    function F(c) {
      h.phi -= c;
    }
    const Ee = function() {
      const c = new J();
      return function(k, L) {
        c.setFromMatrixColumn(L, 0), c.multiplyScalar(-k), f.add(c);
      };
    }(), R = function() {
      const c = new J();
      return function(k, L) {
        t.screenSpacePanning === !0 ? c.setFromMatrixColumn(L, 1) : (c.setFromMatrixColumn(L, 0), c.crossVectors(t.object.up, c)), c.multiplyScalar(k), f.add(c);
      };
    }(), Me = function() {
      const c = new J();
      return function(k, L) {
        const re = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const xe = t.object.position;
          c.copy(xe).sub(t.target);
          let de = c.length();
          de *= Math.tan(t.object.fov / 2 * Math.PI / 180), Ee(2 * k * de / re.clientHeight, t.object.matrix), R(2 * L * de / re.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (Ee(k * (t.object.right - t.object.left) / t.object.zoom / re.clientWidth, t.object.matrix), R(L * (t.object.top - t.object.bottom) / t.object.zoom / re.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function De(c) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? u /= c : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ie(c) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? u *= c : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Pe(c, x) {
      if (!t.zoomToCursor)
        return;
      ge = !0;
      const k = t.domElement.getBoundingClientRect(), L = c - k.left, re = x - k.top, xe = k.width, de = k.height;
      ne.x = L / xe * 2 - 1, ne.y = -(re / de) * 2 + 1, X.set(ne.x, ne.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Ae(c) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, c));
    }
    function je(c) {
      m.set(c.clientX, c.clientY);
    }
    function qe(c) {
      Pe(c.clientX, c.clientX), B.set(c.clientX, c.clientY);
    }
    function Ne(c) {
      D.set(c.clientX, c.clientY);
    }
    function Ke(c) {
      b.set(c.clientX, c.clientY), E.subVectors(b, m).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      ye(2 * Math.PI * E.x / x.clientHeight), F(2 * Math.PI * E.y / x.clientHeight), m.copy(b), t.update();
    }
    function ct(c) {
      C.set(c.clientX, c.clientY), T.subVectors(C, B), T.y > 0 ? De(ke(T.y)) : T.y < 0 && Ie(ke(T.y)), B.copy(C), t.update();
    }
    function Le(c) {
      $.set(c.clientX, c.clientY), z.subVectors($, D).multiplyScalar(t.panSpeed), Me(z.x, z.y), D.copy($), t.update();
    }
    function ae(c) {
      Pe(c.clientX, c.clientY), c.deltaY < 0 ? Ie(ke(c.deltaY)) : c.deltaY > 0 && De(ke(c.deltaY)), t.update();
    }
    function fe(c) {
      let x = !1;
      switch (c.code) {
        case t.keys.UP:
          c.ctrlKey || c.metaKey || c.shiftKey ? F(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(0, t.keyPanSpeed), x = !0;
          break;
        case t.keys.BOTTOM:
          c.ctrlKey || c.metaKey || c.shiftKey ? F(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(0, -t.keyPanSpeed), x = !0;
          break;
        case t.keys.LEFT:
          c.ctrlKey || c.metaKey || c.shiftKey ? ye(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(t.keyPanSpeed, 0), x = !0;
          break;
        case t.keys.RIGHT:
          c.ctrlKey || c.metaKey || c.shiftKey ? ye(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(-t.keyPanSpeed, 0), x = !0;
          break;
      }
      x && (c.preventDefault(), t.update());
    }
    function Ue(c) {
      if (q.length === 1)
        m.set(c.pageX, c.pageY);
      else {
        const x = We(c), k = 0.5 * (c.pageX + x.x), L = 0.5 * (c.pageY + x.y);
        m.set(k, L);
      }
    }
    function Be(c) {
      if (q.length === 1)
        D.set(c.pageX, c.pageY);
      else {
        const x = We(c), k = 0.5 * (c.pageX + x.x), L = 0.5 * (c.pageY + x.y);
        D.set(k, L);
      }
    }
    function be(c) {
      const x = We(c), k = c.pageX - x.x, L = c.pageY - x.y, re = Math.sqrt(k * k + L * L);
      B.set(0, re);
    }
    function g(c) {
      t.enableZoom && be(c), t.enablePan && Be(c);
    }
    function v(c) {
      t.enableZoom && be(c), t.enableRotate && Ue(c);
    }
    function M(c) {
      if (q.length == 1)
        b.set(c.pageX, c.pageY);
      else {
        const k = We(c), L = 0.5 * (c.pageX + k.x), re = 0.5 * (c.pageY + k.y);
        b.set(L, re);
      }
      E.subVectors(b, m).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      ye(2 * Math.PI * E.x / x.clientHeight), F(2 * Math.PI * E.y / x.clientHeight), m.copy(b);
    }
    function j(c) {
      if (q.length === 1)
        $.set(c.pageX, c.pageY);
      else {
        const x = We(c), k = 0.5 * (c.pageX + x.x), L = 0.5 * (c.pageY + x.y);
        $.set(k, L);
      }
      z.subVectors($, D).multiplyScalar(t.panSpeed), Me(z.x, z.y), D.copy($);
    }
    function oe(c) {
      const x = We(c), k = c.pageX - x.x, L = c.pageY - x.y, re = Math.sqrt(k * k + L * L);
      C.set(0, re), T.set(0, Math.pow(C.y / B.y, t.zoomSpeed)), De(T.y), B.copy(C);
      const xe = (c.pageX + x.x) * 0.5, de = (c.pageY + x.y) * 0.5;
      Pe(xe, de);
    }
    function ue(c) {
      t.enableZoom && oe(c), t.enablePan && j(c);
    }
    function O(c) {
      t.enableZoom && oe(c), t.enableRotate && M(c);
    }
    function S(c) {
      t.enabled !== !1 && (q.length === 0 && (t.domElement.setPointerCapture(c.pointerId), t.domElement.addEventListener("pointermove", G), t.domElement.addEventListener("pointerup", Z)), !Dt(c) && (_t(c), c.pointerType === "touch" ? ut(c) : _(c)));
    }
    function G(c) {
      t.enabled !== !1 && (c.pointerType === "touch" ? pt(c) : Y(c));
    }
    function Z(c) {
      switch (kt(c), q.length) {
        case 0:
          t.domElement.releasePointerCapture(c.pointerId), t.domElement.removeEventListener("pointermove", G), t.domElement.removeEventListener("pointerup", Z), t.dispatchEvent(fn), o = i.NONE;
          break;
        case 1:
          const x = q[0], k = ve[x];
          ut({ pointerId: x, pageX: k.x, pageY: k.y });
          break;
      }
    }
    function _(c) {
      let x;
      switch (c.button) {
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
          qe(c), o = i.DOLLY;
          break;
        case it.ROTATE:
          if (c.ctrlKey || c.metaKey || c.shiftKey) {
            if (t.enablePan === !1)
              return;
            Ne(c), o = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            je(c), o = i.ROTATE;
          }
          break;
        case it.PAN:
          if (c.ctrlKey || c.metaKey || c.shiftKey) {
            if (t.enableRotate === !1)
              return;
            je(c), o = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Ne(c), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(jt);
    }
    function Y(c) {
      switch (o) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          Ke(c);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          ct(c);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          Le(c);
          break;
      }
    }
    function Q(c) {
      t.enabled === !1 || t.enableZoom === !1 || o !== i.NONE || (c.preventDefault(), t.dispatchEvent(jt), ae($e(c)), t.dispatchEvent(fn));
    }
    function $e(c) {
      const x = c.deltaMode, k = {
        clientX: c.clientX,
        clientY: c.clientY,
        deltaY: c.deltaY
      };
      switch (x) {
        case 1:
          k.deltaY *= 16;
          break;
        case 2:
          k.deltaY *= 100;
          break;
      }
      return c.ctrlKey && !le && (k.deltaY *= 10), k;
    }
    function ze(c) {
      c.key === "Control" && (le = !0, t.domElement.getRootNode().addEventListener("keyup", Ge, { passive: !0, capture: !0 }));
    }
    function Ge(c) {
      c.key === "Control" && (le = !1, t.domElement.getRootNode().removeEventListener("keyup", Ge, { passive: !0, capture: !0 }));
    }
    function lt(c) {
      t.enabled === !1 || t.enablePan === !1 || fe(c);
    }
    function ut(c) {
      switch (gt(c), q.length) {
        case 1:
          switch (t.touches.ONE) {
            case rt.ROTATE:
              if (t.enableRotate === !1)
                return;
              Ue(c), o = i.TOUCH_ROTATE;
              break;
            case rt.PAN:
              if (t.enablePan === !1)
                return;
              Be(c), o = i.TOUCH_PAN;
              break;
            default:
              o = i.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case rt.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              g(c), o = i.TOUCH_DOLLY_PAN;
              break;
            case rt.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              v(c), o = i.TOUCH_DOLLY_ROTATE;
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
    function pt(c) {
      switch (gt(c), o) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          M(c), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          j(c), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          ue(c), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          O(c), t.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function tt(c) {
      t.enabled !== !1 && c.preventDefault();
    }
    function _t(c) {
      q.push(c.pointerId);
    }
    function kt(c) {
      delete ve[c.pointerId];
      for (let x = 0; x < q.length; x++)
        if (q[x] == c.pointerId) {
          q.splice(x, 1);
          return;
        }
    }
    function Dt(c) {
      for (let x = 0; x < q.length; x++)
        if (q[x] == c.pointerId)
          return !0;
      return !1;
    }
    function gt(c) {
      let x = ve[c.pointerId];
      x === void 0 && (x = new pe(), ve[c.pointerId] = x), x.set(c.pageX, c.pageY);
    }
    function We(c) {
      const x = c.pointerId === q[0] ? q[1] : q[0];
      return ve[x];
    }
    t.domElement.addEventListener("contextmenu", tt), t.domElement.addEventListener("pointerdown", S), t.domElement.addEventListener("pointercancel", Z), t.domElement.addEventListener("wheel", Q, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", ze, { passive: !0, capture: !0 }), this.update();
  }
}
function ot(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const wt = (e) => {
  const [n, a] = W(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (o) => {
    o !== n && (e.onSelect(o), a(o)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, Ze = Ra(function(n, a) {
  const [t, i] = W(!1), o = n.options.indexOf(n.camera.name);
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
        onToggle: (d) => {
          i(d);
        },
        up: !0
      }
    )
  ] });
});
class xi extends In {
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
          value: n?.color !== void 0 ? n?.color : new Ut(16777215)
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
class Mi extends In {
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
let xt = "Renderer", Te, It = !1, K = null, ce = null, Ye = null, Ve = null;
function $i(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", o = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", d = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", r = se(() => /* @__PURE__ */ new Map(), []), h = se(() => /* @__PURE__ */ new Map(), []), u = se(() => /* @__PURE__ */ new Map(), []), f = se(() => /* @__PURE__ */ new Map(), []), m = se(() => new pa(), []), b = se(() => new ga(), []), E = se(() => new Si(), []), D = se(() => new Jt(500), []), $ = se(() => new Jt(100), []), z = se(() => new va(), []), B = se(() => new ba(), []), C = se(() => new Mi(), []), T = se(() => new jn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function X(g, v) {
    const M = new Qt(-100, 100, 100, -100, 50, 5e3);
    return M.name = g, M.position.copy(v), M.lookAt(0, 0, 0), r.set(g, M), M;
  }
  const ne = [
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
  ], q = V(null), ve = V(null), le = V(null), _e = V(null), ke = V(null), ye = V(null), [F, Ee] = W(a !== null ? a : "Single"), [R, Me] = W(null), [De, Ie] = W(!1), [Pe, Ae] = W(!1), [je, qe] = W("Orbit"), [Ne, Ke] = W(!1), [ct, Le] = W(Date.now());
  localStorage.setItem(`${n}_mode`, F), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, o), localStorage.setItem(`${n}_brCam`, d);
  const ae = (g, v) => {
    const M = h.get(g.name);
    if (M !== void 0 && M.dispose(), h.delete(g.name), g.name === "UI")
      return;
    const j = new Ei(g, v);
    switch (j.enableDamping = !0, j.dampingFactor = 0.05, g.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        j.enableRotate = !1;
        break;
    }
    h.set(g.name, j);
  }, fe = (g) => {
    const v = u.get(g.name);
    v !== void 0 && (m.remove(v), v.dispose(), u.delete(g.name));
    const M = h.get(g.name);
    M !== void 0 && (M.dispose(), h.delete(g.name));
  }, Ue = () => {
    h.forEach((g, v) => {
      g.dispose();
      const M = u.get(v);
      M !== void 0 && (m.remove(M), M.dispose()), u.delete(v), h.delete(v);
    }), h.clear(), u.clear();
  }, Be = () => {
    switch (F) {
      case "Single":
        ae(K, le.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(K, le.current), ae(ce, _e.current);
        break;
      case "Quad":
        ae(K, le.current), ae(ce, _e.current), ae(Ye, ke.current), ae(Ve, ye.current);
        break;
    }
  };
  Re(() => {
    const g = new ya({
      canvas: q.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, Me(g);
  }, []), Re(() => {
    m.name = "Debug Scene", m.uuid = "", b.name = "helpers", m.add(b), b.add(E), D.name = "axisHelper", b.add(D), $.name = "interactionHelper", b.add($), $.visible = !1, X("Top", new J(0, 1e3, 0)), X("Bottom", new J(0, -1e3, 0)), X("Left", new J(-1e3, 0, 0)), X("Right", new J(1e3, 0, 0)), X("Front", new J(0, 0, 1e3)), X("Back", new J(0, 0, -1e3)), X("Orthographic", new J(1e3, 1e3, 1e3)), X("UI", new J());
    const g = new Pt(60, 1, 50, 5e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), r.set("Debug", g), K = r.get(localStorage.getItem(`${n}_tlCam`)), ce = r.get(localStorage.getItem(`${n}_trCam`)), Ye = r.get(localStorage.getItem(`${n}_blCam`)), Ve = r.get(localStorage.getItem(`${n}_brCam`));
  }, []), Re(() => {
    const g = () => {
      f.forEach((O) => {
        b.remove(O), O.dispose();
      }), f.clear();
    }, v = () => {
      Te.traverse((O) => {
        if (O.type.search("Light") > -1) {
          let S;
          switch (O.type) {
            case "DirectionalLight":
              S = new Ma(O, 100), S.name = `${O.name}Helper`, f.set(O.name, S), b.add(S);
              break;
            case "HemisphereLight":
              S = new wa(O, 250), S.name = `${O.name}Helper`, f.set(O.name, S), b.add(S);
              break;
            case "RectAreaLight":
              S = new bi(O), S.name = `${O.name}Helper`, f.set(O.name, S), b.add(S);
              break;
            case "PointLight":
              S = new Ca(O, 100), S.name = `${O.name}Helper`, f.set(O.name, S), b.add(S);
              break;
            case "SpotLight":
              S = new Sa(O), S.name = `${O.name}Helper`, f.set(O.name, S), b.add(S);
              break;
          }
        }
      });
    }, M = (O) => {
      b.add(D), g(), Ot(Te), m.remove(Te);
      const S = e.scenes.get(O.value.name);
      if (S !== void 0) {
        const G = new S();
        e.onSceneSet !== void 0 && e.onSceneSet(G), Te = G, e.three.scene = Te, m.add(Te), It = !0, v();
      }
    }, j = (O) => {
      const S = O.value, G = e.three.scene?.getObjectByProperty("uuid", S.uuid);
      if (G !== void 0 && r.set(S.name, G), G instanceof Pt) {
        const Z = new xa(G);
        u.set(G.name, Z), m.add(Z);
      }
      Le(Date.now());
    }, oe = (O) => {
      const S = u.get(O.value.name);
      S !== void 0 && (m.remove(S), S.dispose()), r.delete(O.value.name), Le(Date.now());
    }, ue = (O) => {
      const S = Te.getObjectByProperty("uuid", O.value.uuid);
      S && S.add(D);
    };
    return P.addEventListener(A.SET_SCENE, M), P.addEventListener(A.ADD_CAMERA, j), P.addEventListener(A.REMOVE_CAMERA, oe), P.addEventListener(A.SET_OBJECT, ue), () => {
      P.removeEventListener(A.SET_SCENE, M), P.removeEventListener(A.ADD_CAMERA, j), P.removeEventListener(A.REMOVE_CAMERA, oe), P.removeEventListener(A.SET_OBJECT, ue);
    };
  }, []), Re(() => {
    if (R === null)
      return;
    let g = window.innerWidth, v = window.innerHeight, M = Math.floor(g / 2), j = Math.floor(v / 2), oe = -1;
    const ue = () => {
      g = window.innerWidth - 300, v = window.innerHeight, M = Math.floor(g / 2), j = Math.floor(v / 2), e.three.resize(g, v), e.onSceneResize !== void 0 && It && e.onSceneResize(Te, g, v);
      let _ = g, Y = v;
      switch (F) {
        case "Side by Side":
          _ = M, Y = v;
          break;
        case "Stacked":
          _ = g, Y = j;
          break;
        case "Quad":
          _ = M, Y = j;
          break;
      }
      r.forEach((Q) => {
        Q instanceof Qt ? (Q.left = _ / -2, Q.right = _ / 2, Q.top = Y / 2, Q.bottom = Y / -2, Q.name === "UI" && (Q.position.x = g / 2, Q.position.y = v / -2, Q.position.z = 100), Q.updateProjectionMatrix()) : Q instanceof Pt && (Q.aspect = _ / Y, Q.updateProjectionMatrix(), u.get(Q.name)?.update());
      });
    }, O = () => {
      R.setViewport(0, 0, g, v), R.setScissor(0, 0, g, v), R.render(m, K);
    }, S = () => {
      if (F === "Side by Side")
        R.setViewport(0, 0, M, v), R.setScissor(0, 0, M, v), R.render(m, K), R.setViewport(M, 0, M, v), R.setScissor(M, 0, M, v), R.render(m, ce);
      else {
        const _ = v - j;
        R.setViewport(0, _, g, j), R.setScissor(0, _, g, j), R.render(m, K), R.setViewport(0, 0, g, j), R.setScissor(0, 0, g, j), R.render(m, ce);
      }
    }, G = () => {
      let _ = 0, Y = 0;
      Y = v - j, _ = 0, R.setViewport(_, Y, M, j), R.setScissor(_, Y, M, j), R.render(m, K), _ = M, R.setViewport(_, Y, M, j), R.setScissor(_, Y, M, j), R.render(m, ce), Y = 0, _ = 0, R.setViewport(_, Y, M, j), R.setScissor(_, Y, M, j), R.render(m, Ye), _ = M, R.setViewport(_, Y, M, j), R.setScissor(_, Y, M, j), R.render(m, Ve);
    }, Z = () => {
      switch (h.forEach((_) => {
        _.update();
      }), u.forEach((_) => {
        _.update();
      }), f.forEach((_) => {
        _.update !== void 0 && _.update();
      }), e.onSceneUpdate !== void 0 && It && e.onSceneUpdate(Te), R.clear(), F) {
        case "Single":
          O();
          break;
        case "Side by Side":
        case "Stacked":
          S();
          break;
        case "Quad":
          G();
          break;
      }
      oe = requestAnimationFrame(Z);
    };
    return Be(), window.addEventListener("resize", ue), ue(), Z(), () => {
      window.removeEventListener("resize", ue), cancelAnimationFrame(oe), oe = -1;
    };
  }, [F, R]), Re(() => {
    if (R !== null) {
      const g = new Ea(), v = new pe(), M = (O, S, G, Z) => {
        switch (F) {
          case "Quad":
            O < G ? S < Z ? g.setFromCamera(v, K) : g.setFromCamera(v, Ye) : S < Z ? g.setFromCamera(v, ce) : g.setFromCamera(v, Ve);
            break;
          case "Side by Side":
            O < G ? g.setFromCamera(v, K) : g.setFromCamera(v, ce);
            break;
          case "Single":
            g.setFromCamera(v, K);
            break;
          case "Stacked":
            S < Z ? g.setFromCamera(v, K) : g.setFromCamera(v, ce);
            break;
        }
      }, j = (O) => {
        if (je === "Orbit")
          return;
        const S = new pe();
        R.getSize(S);
        const G = Math.min(O.clientX, S.x), Z = Math.min(O.clientY, S.y);
        v.x = ot(G, 0, S.x, -1, 1), v.y = ot(Z, 0, S.y, 1, -1);
        const _ = S.x / 2, Y = S.y / 2, Q = () => {
          G < _ ? v.x = ot(G, 0, _, -1, 1) : v.x = ot(G, _, S.x, -1, 1);
        }, $e = () => {
          Z < Y ? v.y = ot(Z, 0, Y, 1, -1) : v.y = ot(Z, Y, S.y, 1, -1);
        };
        switch (F) {
          case "Quad":
            Q(), $e();
            break;
          case "Side by Side":
            Q();
            break;
          case "Stacked":
            $e(), $e();
            break;
        }
        M(G, Z, _, Y);
        const ze = g.intersectObjects(Te.children);
        ze.length > 0 && $.position.copy(ze[0].point);
      }, oe = (O) => {
        if (je === "Orbit")
          return;
        const S = new pe();
        if (R.getSize(S), O.clientX >= S.x)
          return;
        j(O);
        const G = g.intersectObjects(Te.children);
        G.length > 0 && (e.three.getObject(G[0].object.uuid), $.visible = !1, qe("Orbit"), Le(Date.now()));
      }, ue = ve.current;
      return ue.addEventListener("mousemove", j, !1), ue.addEventListener("click", oe, !1), () => {
        ue.removeEventListener("mousemove", j), ue.removeEventListener("click", oe);
      };
    }
  }, [F, R, je]);
  const be = [];
  return r.forEach((g, v) => {
    be.push(v);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: q }),
    R !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${F === "Single" || F === "Stacked" ? "single" : ""}`, ref: ve, children: [
        F === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ze, { camera: K, options: be, ref: le, onSelect: (g) => {
          h.get(K.name)?.dispose();
          const v = r.get(g);
          v !== void 0 && (fe(K), K = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, le.current));
        } }) }),
        (F === "Side by Side" || F === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Ze, { camera: K, options: be, ref: le, onSelect: (g) => {
            h.get(K.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (fe(K), K = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, le.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: ce, options: be, ref: _e, onSelect: (g) => {
            h.get(ce.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (fe(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, _e.current));
          } })
        ] }),
        F === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Ze, { camera: K, options: be, ref: le, onSelect: (g) => {
            h.get(K.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (fe(K), K = v, localStorage.setItem(`${n}_tlCam`, v.name), ae(v, le.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: ce, options: be, ref: _e, onSelect: (g) => {
            h.get(ce.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (fe(ce), ce = v, localStorage.setItem(`${n}_trCam`, v.name), ae(v, _e.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: Ye, options: be, ref: ke, onSelect: (g) => {
            h.get(Ye.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (fe(Ye), Ye = v, localStorage.setItem(`${n}_blCam`, v.name), ae(v, ke.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: Ve, options: be, ref: ye, onSelect: (g) => {
            h.get(Ve.name)?.dispose();
            const v = r.get(g);
            v !== void 0 && (fe(Ve), Ve = v, localStorage.setItem(`${n}_brCam`, v.name), ae(v, ye.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: ge.indexOf(F),
            options: ge,
            onSelect: (g) => {
              g !== F && (Ue(), Ee(g));
            },
            open: De,
            onToggle: (g) => {
              Ie(g), Pe && Ae(!1), Ne && Ke(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: ne.indexOf(xt),
            options: ne,
            onSelect: (g) => {
              if (g !== xt)
                switch (xt = g, xt) {
                  case "Depth":
                    m.overrideMaterial = z;
                    break;
                  case "Normals":
                    m.overrideMaterial = B;
                    break;
                  default:
                  case "Renderer":
                    m.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    m.overrideMaterial = T;
                    break;
                  case "UVs":
                    m.overrideMaterial = C;
                    break;
                }
            },
            open: Pe,
            onToggle: (g) => {
              De && Ie(!1), Ae(g), Ne && Ke(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: je === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (g) => {
              $.visible = g === "Selection Mode", qe($.visible ? "Selection" : "Orbit");
            },
            open: Ne,
            onToggle: (g) => {
              De && Ie(!1), Pe && Ae(!1), Ke(g);
            }
          }
        )
      ] }, ct)
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
  Gt as Accordion,
  Ai as Application,
  Tt as BaseRemote,
  Un as ChildObject,
  Ya as ContainerObject,
  Ga as Draggable,
  za as DraggableItem,
  Wa as Dropdown,
  Ha as DropdownItem,
  zi as Editor,
  vi as Inspector,
  $i as MultiView,
  Fn as NavButton,
  ji as RemoteComponents,
  Bi as RemoteController,
  zt as RemoteTheatre,
  Ni as RemoteThree,
  Li as RemoteTweakpane,
  Ui as SceneInspector,
  Fi as SidePanel,
  A as ToolEvents,
  Mt as capitalize,
  Je as clamp,
  Da as colorToHex,
  P as debugDispatcher,
  ki as defaultTheatreCallback,
  Ot as dispose,
  Pa as disposeMaterial,
  Pi as disposeTexture,
  Di as distance,
  Lt as hierarchyUUID,
  ka as isColor,
  tn as mix,
  $t as noop,
  en as normalize,
  _a as randomID,
  an as resetThreeObjects,
  nn as round,
  Ii as theatreEditorApp,
  Nt as totalThreeObjects
};
