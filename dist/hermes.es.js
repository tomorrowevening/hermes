import { EventDispatcher as pn, Texture as gn, CubeTexture as Hn, RepeatWrapping as Vt, WebGLRenderTarget as Yn, Color as Ut, FrontSide as Vn, BackSide as vn, DoubleSide as bn, NoBlending as qn, NormalBlending as Kn, AdditiveBlending as Xn, SubtractiveBlending as Zn, MultiplyBlending as Jn, CustomBlending as Qn, AddEquation as ea, SubtractEquation as ta, ReverseSubtractEquation as na, MinEquation as aa, MaxEquation as ia, ZeroFactor as yn, OneFactor as En, SrcColorFactor as xn, OneMinusSrcColorFactor as Sn, SrcAlphaFactor as Cn, OneMinusSrcAlphaFactor as wn, DstAlphaFactor as Mn, OneMinusDstAlphaFactor as On, DstColorFactor as Tn, OneMinusDstColorFactor as Rn, SrcAlphaSaturateFactor as ra, ConstantColorFactor as _n, OneMinusConstantColorFactor as kn, ConstantAlphaFactor as Dn, OneMinusConstantAlphaFactor as Pn, Matrix4 as sa, Vector3 as Q, Euler as oa, Line as ca, BufferGeometry as qt, Float32BufferAttribute as Kt, LineBasicMaterial as la, Mesh as An, MeshBasicMaterial as jn, Ray as ua, Plane as da, MathUtils as ha, MOUSE as it, TOUCH as rt, Quaternion as Xt, Spherical as Zt, Vector2 as ge, ShaderMaterial as In, GLSL3 as fa, PlaneGeometry as ma, Scene as pa, Group as ga, AxesHelper as Jt, MeshDepthMaterial as va, MeshNormalMaterial as ba, WebGLRenderer as ya, PerspectiveCamera as Pt, Raycaster as Ea, OrthographicCamera as Qt, CameraHelper as xa, SpotLightHelper as Sa, PointLightHelper as Ca, HemisphereLightHelper as wa, DirectionalLightHelper as Ma } from "three";
import { Pane as Oa } from "tweakpane";
import * as Ta from "@tweakpane/plugin-essentials";
import Nn, { useState as G, useRef as V, useEffect as Re, useMemo as oe, forwardRef as Ra } from "react";
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
    const d = h.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, c = i(n), u = i(a), r = i(t);
  return "#" + c + u + r;
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
  sheetObject(n, a, t, i, c) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const u = this.sheet(n, c);
    if (u === void 0)
      return;
    const h = `${this.getSheetInstance(n, c)}_${a}`;
    let d = this.sheetObjects.get(h);
    d !== void 0 ? d = u.object(a, { ...t, ...d.value }, { reconfigure: !0 }) : d = u.object(a, t), this.sheetObjects.set(h, d), this.sheetObjectCBs.set(h, i !== void 0 ? i : $t);
    const f = d.onValuesChange((m) => {
      if (this.app.editor) {
        for (const x in m) {
          const _ = m[x];
          typeof _ == "object" && ka(_) && (m[x] = {
            r: _.r,
            g: _.g,
            b: _.b,
            a: _.a
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
      const v = this.sheetObjectCBs.get(h);
      v !== void 0 && v(m);
    });
    return this.sheetObjectUnsubscribe.set(h, f), d;
  }
  unsubscribe(n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = n.address.sheetId, t = n.address.objectKey;
    this.sheets.get(a)?.detachObject(t);
    const c = `${a}_${t}`, u = this.sheetObjectUnsubscribe.get(c);
    u !== void 0 && (this.sheetObjects.delete(c), this.sheetObjectCBs.delete(c), this.sheetObjectUnsubscribe.delete(c), u());
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
      this.studio?.ui.restore(), this.studio?.onSelectionChange((u) => {
        u.length < 1 || u.forEach((r) => {
          let h = r.address.sheetId, d = "setSheet", f = {};
          switch (r.type) {
            case "Theatre_Sheet_PublicAPI":
              d = "setSheet", f = {
                sheet: r.address.sheetId
              }, a.activeSheet = a.sheets.get(r.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              d = "setSheetObject", h += `_${r.address.objectKey}`, f = {
                id: h,
                sheet: r.address.sheetId,
                key: r.address.objectKey
              }, a.activeSheet = a.sheets.get(r.address.sheetId);
              break;
          }
          n.send({ event: d, target: "app", data: f });
        });
      });
      let t = -1;
      const i = () => {
        if (zt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
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
      }, c = () => {
        i(), requestAnimationFrame(c);
      };
      i(), c();
    } else
      this.studio?.ui.hide();
  }
}
function Ii(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((u) => {
      u.length < 1 || u.forEach((r) => {
        let h = r.address.sheetId, d = "setSheet", f = {};
        switch (r.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", f = {
              sheet: r.address.sheetId
            }, n.activeSheet = n.sheets.get(r.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", h += `_${r.address.objectKey}`, f = {
              id: h,
              sheet: r.address.sheetId,
              key: r.address.objectKey
            }, n.activeSheet = n.sheets.get(r.address.sheetId);
            break;
        }
        e.send({ event: d, target: "app", data: f });
      });
    });
    let t = -1;
    const i = () => {
      if (zt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
              const u = i.source.toJSON().url;
              n[a] = {
                src: u,
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
      t.material.forEach((c) => {
        i.push(st(c));
      }), n.material = i;
    } else
      n.material = st(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((c) => {
        i.push(st(c));
      }), n.material = i;
    } else
      n.material = st(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((c) => {
        i.push(st(c));
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
function ne(e, n, a) {
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
    u != null && La(u, a);
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
    const c = this.bindID, u = t.onChange !== void 0 ? t.onChange : $t;
    this.bindCBs.set(c, u), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, t).on("change", (h) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: c,
          value: h.value
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
  var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(r, h, d) {
    var f, m = {}, v = null, x = null;
    d !== void 0 && (v = "" + d), h.key !== void 0 && (v = "" + h.key), h.ref !== void 0 && (x = h.ref);
    for (f in h)
      t.call(h, f) && !c.hasOwnProperty(f) && (m[f] = h[f]);
    if (r && r.defaultProps)
      for (f in h = r.defaultProps, h)
        m[f] === void 0 && (m[f] = h[f]);
    return { $$typeof: n, type: r, key: v, ref: x, props: m, _owner: i.current };
  }
  return dt.Fragment = a, dt.jsx = u, dt.jsxs = u, dt;
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
    var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), r = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), _ = Symbol.iterator, q = "@@iterator";
    function U(s) {
      if (s === null || typeof s != "object")
        return null;
      var p = _ && s[_] || s[q];
      return typeof p == "function" ? p : null;
    }
    var $ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(s) {
      {
        for (var p = arguments.length, y = new Array(p > 1 ? p - 1 : 0), w = 1; w < p; w++)
          y[w - 1] = arguments[w];
        K("error", s, y);
      }
    }
    function K(s, p, y) {
      {
        var w = $.ReactDebugCurrentFrame, F = w.getStackAddendum();
        F !== "" && (p += "%s", y = y.concat([F]));
        var W = y.map(function(N) {
          return String(N);
        });
        W.unshift("Warning: " + p), Function.prototype.apply.call(console[s], console, W);
      }
    }
    var M = !1, Z = !1, ue = !1, H = !1, ve = !1, re;
    re = Symbol.for("react.module.reference");
    function _e(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === t || s === c || ve || s === i || s === d || s === f || H || s === x || M || Z || ue || typeof s == "object" && s !== null && (s.$$typeof === v || s.$$typeof === m || s.$$typeof === u || s.$$typeof === r || s.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === re || s.getModuleId !== void 0));
    }
    function ke(s, p, y) {
      var w = s.displayName;
      if (w)
        return w;
      var F = p.displayName || p.name || "";
      return F !== "" ? y + "(" + F + ")" : y;
    }
    function ye(s) {
      return s.displayName || "Context";
    }
    function B(s) {
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
        case c:
          return "Profiler";
        case i:
          return "StrictMode";
        case d:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case r:
            var p = s;
            return ye(p) + ".Consumer";
          case u:
            var y = s;
            return ye(y._context) + ".Provider";
          case h:
            return ke(s, s.render, "ForwardRef");
          case m:
            var w = s.displayName || null;
            return w !== null ? w : B(s.type) || "Memo";
          case v: {
            var F = s, W = F._payload, N = F._init;
            try {
              return B(N(W));
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
    var Le = $.ReactCurrentDispatcher, ae;
    function me(s, p, y) {
      {
        if (ae === void 0)
          try {
            throw Error();
          } catch (F) {
            var w = F.stack.trim().match(/\n( *(at )?)/);
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
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var W;
      W = Le.current, Le.current = null, Ke();
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
`), fe = w.stack.split(`
`), te = I.length - 1, ie = fe.length - 1; te >= 1 && ie >= 0 && I[te] !== fe[ie]; )
            ie--;
          for (; te >= 1 && ie >= 0; te--, ie--)
            if (I[te] !== fe[ie]) {
              if (te !== 1 || ie !== 1)
                do
                  if (te--, ie--, ie < 0 || I[te] !== fe[ie]) {
                    var we = `
` + I[te].replace(" at new ", " at ");
                    return s.displayName && we.includes("<anonymous>") && (we = we.replace("<anonymous>", s.displayName)), typeof s == "function" && Be.set(s, we), we;
                  }
                while (te >= 1 && ie >= 0);
              break;
            }
        }
      } finally {
        Ue = !1, Le.current = W, ct(), Error.prepareStackTrace = F;
      }
      var at = s ? s.displayName || s.name : "", Yt = at ? me(at) : "";
      return typeof s == "function" && Be.set(s, Yt), Yt;
    }
    function b(s, p, y) {
      return g(s, !1);
    }
    function O(s) {
      var p = s.prototype;
      return !!(p && p.isReactComponent);
    }
    function j(s, p, y) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return g(s, O(s));
      if (typeof s == "string")
        return me(s);
      switch (s) {
        case d:
          return me("Suspense");
        case f:
          return me("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case h:
            return b(s.render);
          case m:
            return j(s.type, p, y);
          case v: {
            var w = s, F = w._payload, W = w._init;
            try {
              return j(W(F), p, y);
            } catch {
            }
          }
        }
      return "";
    }
    var ce = Object.prototype.hasOwnProperty, de = {}, T = $.ReactDebugCurrentFrame;
    function S(s) {
      if (s) {
        var p = s._owner, y = j(s.type, s._source, p ? p.type : null);
        T.setExtraStackFrame(y);
      } else
        T.setExtraStackFrame(null);
    }
    function z(s, p, y, w, F) {
      {
        var W = Function.call.bind(ce);
        for (var N in s)
          if (W(s, N)) {
            var I = void 0;
            try {
              if (typeof s[N] != "function") {
                var fe = Error((w || "React class") + ": " + y + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw fe.name = "Invariant Violation", fe;
              }
              I = s[N](p, N, w, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (te) {
              I = te;
            }
            I && !(I instanceof Error) && (S(F), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", y, N, typeof I), S(null)), I instanceof Error && !(I.message in de) && (de[I.message] = !0, S(F), C("Failed %s type: %s", y, I.message), S(null));
          }
      }
    }
    var J = Array.isArray;
    function k(s) {
      return J(s);
    }
    function Y(s) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, y = p && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return y;
      }
    }
    function ee(s) {
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
      if (ee(s))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Y(s)), $e(s);
    }
    var Ge = $.ReactCurrentOwner, lt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ut, pt, tt;
    tt = {};
    function _t(s) {
      if (ce.call(s, "ref")) {
        var p = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function kt(s) {
      if (ce.call(s, "key")) {
        var p = Object.getOwnPropertyDescriptor(s, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function Dt(s, p) {
      if (typeof s.ref == "string" && Ge.current && p && Ge.current.stateNode !== p) {
        var y = B(Ge.current.type);
        tt[y] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', B(Ge.current.type), s.ref), tt[y] = !0);
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
    var Wt = function(s, p, y, w, F, W, N) {
      var I = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: p,
        ref: y,
        props: N,
        // Record the component responsible for creating this element.
        _owner: W
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
        value: F
      }), Object.freeze && (Object.freeze(I.props), Object.freeze(I)), I;
    };
    function o(s, p, y, w, F) {
      {
        var W, N = {}, I = null, fe = null;
        y !== void 0 && (ze(y), I = "" + y), kt(p) && (ze(p.key), I = "" + p.key), _t(p) && (fe = p.ref, Dt(p, F));
        for (W in p)
          ce.call(p, W) && !lt.hasOwnProperty(W) && (N[W] = p[W]);
        if (s && s.defaultProps) {
          var te = s.defaultProps;
          for (W in te)
            N[W] === void 0 && (N[W] = te[W]);
        }
        if (I || fe) {
          var ie = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          I && gt(N, ie), fe && We(N, ie);
        }
        return Wt(s, I, fe, F, w, Ge.current, N);
      }
    }
    var E = $.ReactCurrentOwner, D = $.ReactDebugCurrentFrame;
    function L(s) {
      if (s) {
        var p = s._owner, y = j(s.type, s._source, p ? p.type : null);
        D.setExtraStackFrame(y);
      } else
        D.setExtraStackFrame(null);
    }
    var se;
    se = !1;
    function xe(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function he() {
      {
        if (E.current) {
          var s = B(E.current.type);
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
        var p = he();
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
        s && s._owner && s._owner !== E.current && (w = " It was passed a child from " + B(s._owner.type) + "."), L(s), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, w), L(null);
      }
    }
    function Ce(s, p) {
      {
        if (typeof s != "object")
          return;
        if (k(s))
          for (var y = 0; y < s.length; y++) {
            var w = s[y];
            xe(w) && Se(w, p);
          }
        else if (xe(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var F = U(s);
          if (typeof F == "function" && F !== s.entries)
            for (var W = F.call(s), N; !(N = W.next()).done; )
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
          var w = B(p);
          z(y, s.props, "prop", w, s);
        } else if (p.PropTypes !== void 0 && !se) {
          se = !0;
          var F = B(p);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
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
    function He(s, p, y, w, F, W) {
      {
        var N = _e(s);
        if (!N) {
          var I = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (I += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var fe = Ht(F);
          fe ? I += fe : I += he();
          var te;
          s === null ? te = "null" : k(s) ? te = "array" : s !== void 0 && s.$$typeof === n ? (te = "<" + (B(s.type) || "Unknown") + " />", I = " Did you accidentally export a JSX literal instead of a component?") : te = typeof s, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", te, I);
        }
        var ie = o(s, p, y, F, W);
        if (ie == null)
          return ie;
        if (N) {
          var we = p.children;
          if (we !== void 0)
            if (w)
              if (k(we)) {
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
  const [n, a] = G(!1), [t, i] = G(e.options), c = (d) => {
    e.onDragComplete(d), i(d);
  }, u = (d) => {
    const f = [...t];
    f.splice(d, 1), c(f);
  }, r = [];
  t.forEach((d, f) => {
    r.push(/* @__PURE__ */ l.jsx(za, { index: f, title: d, onDelete: u }, d));
  });
  let h = "dropdown draggable";
  return e.subdropdown && (h += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: h, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Fn, { title: e.title }),
    /* @__PURE__ */ l.jsx(Ln.Group, { axis: "y", values: t, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: r })
  ] });
}
function Wa(e) {
  const [n, a] = G(!1), t = [];
  e.options.map((c, u) => {
    e.onSelect !== void 0 && (c.onSelect = e.onSelect), t.push(/* @__PURE__ */ l.jsx(Ha, { option: c }, u));
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
  const { option: n } = e, [a, t] = G("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
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
  function t(c) {
    switch (n.forEach((u) => {
      u.callback(e, u.remote, c);
    }), c.event) {
      case "custom":
        P.dispatchEvent({ type: A.CUSTOM, value: c.data });
        break;
    }
  }
  function i(c) {
    switch (a.forEach((u) => {
      u.callback(e, u.remote, c);
    }), c.event) {
      case "custom":
        P.dispatchEvent({ type: A.CUSTOM, value: c.data });
        break;
    }
  }
  e.listen = (c) => {
    c.target === "editor" ? i(c) : t(c);
  };
}
function Gt(e) {
  const [n, a] = G(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
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
  const n = V(null), [a, t] = G(!1), i = e.child !== void 0 && e.child.children.length > 0, c = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((u, r) => {
    c.push(/* @__PURE__ */ l.jsx(Un, { child: u, three: e.three }, r));
  }), Re(() => {
    const u = e.child.uuid, r = e.three.getScene(u);
    if (r !== null) {
      const h = r.getObjectByProperty("uuid", u);
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
              const u = e.three.getScene(e.child.uuid);
              if (u !== null) {
                const r = u.getObjectByProperty("uuid", e.child.uuid);
                if (r !== void 0) {
                  const h = "visible", d = !r.visible;
                  n.current.style.opacity = d ? "1" : "0.25", e.three.updateObject(e.child.uuid, h, d), ne(r, h, d);
                } else
                  console.log(`Hermes - Couldn't find object: ${e.child.uuid}`, u);
              } else
                console.log(`Hermes - Couldn't find object in scene: ${e.child.uuid}, ${e.child.name}`);
            }
          }
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${Aa(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: a ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: c }) })
  ] }, Math.random()) });
}
function Ya(e) {
  const n = [];
  return e.child?.children.map((a, t) => {
    n.push(/* @__PURE__ */ l.jsx(Un, { child: a, scene: e.scene, three: e.three }, t));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
function Va(e) {
  const [n, a] = G(e.defaultValue);
  return Re(() => {
    let t = !1, i = -1, c = 0, u = e.defaultValue;
    const r = (v) => {
      t = !0, c = Number(e.input.current?.value), i = v.clientX, document.addEventListener("mouseup", d, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", d, !1);
    }, h = (v) => {
      if (!t)
        return;
      const x = e.step !== void 0 ? e.step : 1, _ = (v.clientX - i) * x;
      u = Number((c + _).toFixed(4)), e.min !== void 0 && (u = Math.max(u, e.min)), e.max !== void 0 && (u = Math.min(u, e.max)), e.onChange !== void 0 && e.onChange(u), a(u);
    }, d = () => {
      t = !1, document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
    }, f = (v) => {
      const x = Number(v.target.value);
      a(x);
    }, m = (v) => {
      const x = Number(v.target.value);
      e.onChange !== void 0 && e.onChange(x), a(x);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", r, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", m), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", r), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
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
          const c = Number(i.target.value);
          e.onChange !== void 0 && e.onChange(e.prop, c);
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
            const c = Number(i.target.value);
            e.onChange !== void 0 && e.onChange(e.prop, c);
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
  const n = V(null), a = V(null), t = V(null), i = V(null), c = V(null), u = V(null), [r, h] = G(e.value), [d, f] = G({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [m, v] = G(!1);
  function x() {
    m || (window.addEventListener("mousemove", q), window.addEventListener("mouseup", _), window.addEventListener("mouseup", _), v(!0));
  }
  function _() {
    window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", _), v(!1);
  }
  function q(M) {
    const Z = c.current.getBoundingClientRect(), ue = Je(0, 99, M.clientX - Z.left) / 99, H = Je(0, 99, M.clientY - Z.top) / 99, ve = nn(tn(d.min, d.max, ue), 3), re = nn(tn(d.min, d.max, H), 3);
    e.onChange({ target: { value: { x: ve, y: re } } }), h({ x: ve, y: re });
  }
  function U(M) {
    let Z = r.x, ue = r.y;
    M.target === n.current ? Z = Number(M.target.value) : ue = Number(M.target.value), h({ x: Z, y: ue });
  }
  function $() {
    const M = Number(t.current.value);
    f({ min: M, max: d.max }), (r.x < M || r.y < M) && h({ x: Je(M, d.max, r.x), y: Je(M, d.max, r.y) });
  }
  function C() {
    const M = Number(i.current.value);
    f({ min: d.min, max: M }), (r.x > M || r.y > M) && h({ x: Je(d.min, M, r.x), y: Je(d.min, M, r.y) });
  }
  Re(() => {
    const M = en(d.min, d.max, r.x), Z = en(d.min, d.max, r.y);
    u.current.style.left = `${M * 100}%`, u.current.style.top = `${Z * 100}%`;
  }, [d, r]);
  const K = e.step !== void 0 ? e.step : 0.01;
  return /* @__PURE__ */ l.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: r.x,
            min: d.min,
            max: d.max,
            step: K,
            onChange: U
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
            min: d.min,
            max: d.max,
            step: K,
            onChange: U
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
            step: K,
            onChange: $
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
            step: K,
            onChange: C
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: c, onMouseDown: x, onMouseUp: _, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: u })
    ] })
  ] });
}
function on(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = e.step !== void 0 ? e.step : 0.01, c = [];
  if (n) {
    const u = oe(() => e.value, []), r = (d, f) => {
      u[d] = f, e.onChange({ target: { value: u } });
    };
    ["x", "y", "z"].forEach((d) => {
      const f = V(null);
      c.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: f, children: d.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: u[d],
              type: "number",
              prop: d,
              step: i,
              labelRef: f,
              onChange: r
            }
          )
        ] }, d)
      );
    });
  } else if (a) {
    const u = oe(() => e.value, []), r = (d, f) => {
      u[d] = f, e.onChange({ target: { value: u } });
    };
    ["_x", "_y", "_z"].forEach((d) => {
      const f = V(null);
      c.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: f, children: d.substring(1).toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: u[d],
              type: "number",
              prop: d,
              step: i,
              labelRef: f,
              onChange: r
            }
          )
        ] }, d)
      );
    });
  } else if (t) {
    const u = oe(() => e.value, []), r = (h, d) => {
      const f = Number(h);
      u.elements[f] = d, e.onChange({ target: { value: u } });
    };
    for (let h = 0; h < 9; h++) {
      const d = V(null);
      c.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: h + 1 }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: u.elements[h],
              type: "number",
              prop: h.toString(),
              step: i,
              labelRef: d,
              onChange: r
            }
          )
        ] }, h.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid3", children: c }, Math.random().toString());
}
function Ka(e) {
  const n = e.value.x !== void 0, a = e.step !== void 0 ? e.step : 0.01, t = [];
  if (n) {
    const i = oe(() => e.value, []), c = (r, h) => {
      i[r] = h, e.onChange({ target: { value: i } });
    };
    ["x", "y", "z", "w"].forEach((r) => {
      const h = V(null);
      t.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: r.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: i.x,
              type: "number",
              prop: r,
              step: a,
              labelRef: h,
              onChange: c
            }
          )
        ] }, r)
      );
    });
  } else {
    const i = oe(() => e.value, []), c = (u, r) => {
      const h = Number(u);
      i.elements[h] = r, e.onChange({ target: { value: i } });
    };
    for (let u = 0; u < 16; u++) {
      const r = V(null);
      t.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: r, children: u + 1 }),
          /* @__PURE__ */ l.jsx(
            Qe,
            {
              value: i.elements[u],
              type: "number",
              prop: u.toString(),
              step: a,
              labelRef: r,
              onChange: c
            }
          )
        ] }, u.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid4", children: t });
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
        i.onload = function(c) {
          n(c.target.result);
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
    onChange: (i, c) => {
      t.updateObject(a.uuid, `material.${e}`, c), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const u = t.getScene(a.uuid);
      if (u !== null) {
        const r = u.getObjectByProperty("uuid", a.uuid);
        ne(r, `material.${e}`, c);
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
    onChange: (c, u) => {
      t.updateObject(a.uuid, `material.${e}`, u), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", a.uuid);
        ne(h, `material.${e}`, u);
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
    onChange: (u, r) => {
      t.updateObject(a.uuid, `material.${e}`, r), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = t.getScene(a.uuid);
      if (h !== null) {
        const d = h.getObjectByProperty("uuid", a.uuid);
        ne(d, `material.${e}`, r);
      }
    },
    onKeyDown: (u) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (u, r) => {
    i.latest = r, t.updateObject(a.uuid, `material.${e}`, r);
    const h = t.getScene(a.uuid);
    if (h !== null) {
      const d = h.getObjectByProperty("uuid", a.uuid);
      ne(d, `material.${e}`, r);
    }
  }, i.onKeyDown = (u) => {
    if (u.key === "Enter" && (u.altKey || u.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", a.uuid);
        ne(h, "material.needsUpdate", !0);
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
function mt(e, n, a, t, i = "", c = !1) {
  const u = Rt(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = i.length > 0 ? `${i}.${e}` : e, h = typeof n;
  if (h === "boolean" || h === "string")
    return {
      title: u,
      prop: r,
      type: h,
      value: n,
      disabled: c,
      onChange: (d, f) => {
        t.updateObject(a.uuid, `material.${r}`, f);
        const m = t.getScene(a.uuid);
        if (m !== null) {
          const v = m.getObjectByProperty("uuid", a.uuid);
          ne(v, `material.${r}`, f);
        }
      }
    };
  if (h === "number") {
    const d = {
      title: u,
      prop: r,
      type: "number",
      value: n,
      step: 0.01,
      disabled: c,
      onChange: (f, m) => {
        t.updateObject(a.uuid, `material.${r}`, m);
        const v = t.getScene(a.uuid);
        if (v !== null) {
          const x = v.getObjectByProperty("uuid", a.uuid);
          ne(x, `material.${r}`, m);
        }
      }
    };
    return $n(u) && (d.type = "range", d.min = 0, d.max = 1), d;
  } else {
    if (n.isColor)
      return {
        title: u,
        prop: r,
        type: "color",
        value: n,
        disabled: c,
        onChange: (d, f) => {
          const m = new Ut(f);
          t.updateObject(a.uuid, `material.${r}`, m);
          const v = t.getScene(a.uuid);
          if (v !== null) {
            const x = v.getObjectByProperty("uuid", a.uuid);
            ne(x, `material.${r}`, m);
          }
        }
      };
    if (Array.isArray(n)) {
      const d = [];
      for (const f in n) {
        const m = n[f], v = `[${f.toString()}]`;
        if (m.value !== void 0) {
          const x = mt(`${v}.value`, m.value, a, t, r, c);
          x !== void 0 && d.push(x);
        } else {
          const x = mt(v, m, a, t, r, c);
          x !== void 0 && d.push(x);
        }
      }
      if (d.length > 0)
        return Ft(d), {
          title: u,
          items: d
        };
    } else {
      if (ci(n))
        return {
          title: u,
          prop: r,
          type: "vector2",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const v = m.getObjectByProperty("uuid", a.uuid);
              ne(v, `material.${r}`, f);
            }
          }
        };
      if (li(n))
        return {
          title: u,
          prop: r,
          type: "grid3",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const v = m.getObjectByProperty("uuid", a.uuid);
              ne(v, `material.${r}`, f);
            }
          }
        };
      if (ui(n))
        return {
          title: u,
          prop: r,
          type: "grid4",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const v = m.getObjectByProperty("uuid", a.uuid);
              ne(v, `material.${r}`, f);
            }
          }
        };
      if (n.isEuler)
        return {
          title: u,
          prop: r,
          type: "euler",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const v = m.getObjectByProperty("uuid", a.uuid);
              ne(v, `material.${r}`, f);
            }
          }
        };
      if (n.src !== void 0)
        return {
          title: u,
          type: "image",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            const m = Ja(e), v = i.length > 0 ? `${i}.${m}` : m;
            t.createTexture(a.uuid, `material.${v}`, f);
            const x = t.getScene(a.uuid);
            if (x !== null) {
              const _ = x.getObjectByProperty("uuid", a.uuid);
              if (_ !== void 0) {
                const q = (U) => {
                  const $ = _.material, C = v.split(".");
                  switch (C.length) {
                    case 1:
                      $[C[0]] = U;
                      break;
                    case 2:
                      $[C[0]][C[1]] = U;
                      break;
                    case 3:
                      $[C[0]][C[1]][C[2]] = U;
                      break;
                    case 4:
                      $[C[0]][C[1]][C[2]][C[3]] = U;
                      break;
                    case 5:
                      $[C[0]][C[1]][C[2]][C[3]][C[4]] = U;
                      break;
                  }
                  $.needsUpdate = !0;
                };
                f.src.length > 0 ? Bn(f.src).then((U) => {
                  U.offset.set(f.offset[0], f.offset[1]), U.repeat.set(f.repeat[0], f.repeat[1]), q(U);
                }) : q(null);
              }
            }
          }
        };
      if (n.elements !== void 0)
        return {
          title: u,
          prop: r,
          type: n.elements.length > 9 ? "grid4" : "grid3",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${r}`, f);
            const m = t.getScene(a.uuid);
            if (m !== null) {
              const v = m.getObjectByProperty("uuid", a.uuid);
              ne(v, `material.${r}`, f);
            }
          }
        };
      {
        const d = [], f = e === "defines" || e === "extensions";
        try {
          for (const m in n) {
            const v = n[m];
            if (v !== void 0)
              if (v.value !== void 0) {
                const x = mt(`${m}.value`, v.value, a, t, r, f);
                x !== void 0 && d.push(x);
              } else {
                const x = mt(m, v, a, t, r, f);
                x !== void 0 && d.push(x);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (d.length > 0)
          return Ft(d), {
            title: u,
            items: d
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
    const c = typeof e[i], u = e[i];
    if (c === "boolean")
      t.push(ri(i, u, n, a));
    else if (c === "number")
      t.push(si(i, u, n, a));
    else if (c === "string")
      t.push(oi(i, u, n, a));
    else if (c === "object") {
      const r = mt(i, u, n, a);
      r !== void 0 && t.push(r);
    } else
      u !== void 0 && console.log("other:", i, c, u);
  }
  return Ft(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.getScene(n.uuid);
      if (i !== null) {
        const c = i.getObjectByProperty("uuid", n.uuid);
        ne(c, "material.needsUpdate", !0);
      }
    }
  }), t;
}
function di(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let c = 0; c < i; c++)
      t.push(
        /* @__PURE__ */ l.jsx(
          et,
          {
            title: `Material ${c}`,
            items: cn(a[c], e, n)
          },
          `Material ${c}`
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
  const n = e.step !== void 0 ? e.step : 0.01, a = V(null), t = V(null), i = V(null), c = V(null), u = V(null), [r] = G(e.value), [h, d] = G(e.value.offset[0]), [f, m] = G(e.value.offset[1]), [v, x] = G(e.value.repeat[0]), [_, q] = G(e.value.repeat[1]);
  function U(C, K, M, Z, ue) {
    if (e.onChange !== void 0) {
      const H = e.prop !== void 0 ? e.prop : e.title;
      e.onChange(H, {
        src: C,
        offset: [K, M],
        repeat: [Z, ue]
      });
    }
  }
  function $(C) {
    const K = a.current.src, M = C.target.value;
    switch (C.target) {
      case t.current:
        d(M), U(K, M, f, v, _);
        break;
      case i.current:
        m(M), U(K, h, M, v, _);
        break;
      case c.current:
        x(M), U(K, h, f, M, _);
        break;
      case u.current:
        q(M), U(K, h, f, v, M);
        break;
    }
  }
  return /* @__PURE__ */ l.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ l.jsx("img", { alt: e.title, ref: a, onClick: () => {
      Qa().then((C) => {
        a.current.src = C, U(C, h, f, v, _);
      });
    }, src: r.src.length > 0 ? r.src : ln }),
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: h,
            step: n,
            onChange: $
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: f,
            step: n,
            onChange: $
          }
        )
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: c,
            type: "number",
            value: v,
            step: n,
            onChange: $
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: u,
            type: "number",
            value: _,
            step: n,
            onChange: $
          }
        )
      ] }),
      /* @__PURE__ */ l.jsx("button", { onClick: () => {
        U("", h, f, v, _), a.current.src = ln;
      }, children: "Clear" })
    ] })
  ] });
}
function Ct(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Da(e.value));
  const [a, t] = G(n), i = V(null), c = (d) => {
    let f = d.target.value;
    e.type === "boolean" ? f = d.target.checked : e.type === "option" && (f = e.options[f].value), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  }, u = {};
  e.disabled && (u.opacity = 0.8);
  const r = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = r || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${h ? "block" : ""}`, style: u, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Mt(e.title) }, "fieldLabel"),
    e.type === "string" && !r && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: c,
        value: a
      }
    ),
    e.type === "string" && r && /* @__PURE__ */ l.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: c,
        onKeyDown: (d) => {
          e.onKeyDown !== void 0 && e.onKeyDown(d);
        },
        value: a
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: c,
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
      /* @__PURE__ */ l.jsx("input", { type: "text", value: a.toString(), onChange: c, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ l.jsx("input", { type: "color", value: a, onChange: c, disabled: e.disabled })
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
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: c, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((d, f) => /* @__PURE__ */ l.jsx("option", { value: d.value, children: Mt(d.title) }, f)) }) }),
    e.type === "vector2" && /* @__PURE__ */ l.jsx(qa, { step: e.step, value: a, min: 0, max: 1, onChange: c }),
    e.type === "grid3" && /* @__PURE__ */ l.jsx(on, { step: e.step, value: a, onChange: c }),
    e.type === "grid4" && /* @__PURE__ */ l.jsx(Ka, { step: e.step, value: a, onChange: c }),
    e.type === "euler" && /* @__PURE__ */ l.jsx(on, { step: e.step, value: a, onChange: c })
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
          const u = n.getScene(e.uuid);
          if (u !== null) {
            const r = u.getObjectByProperty("uuid", e.uuid);
            r !== void 0 && (ne(r, i, c), r.updateProjectionMatrix());
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
          const u = n.getScene(e.uuid);
          if (u !== null) {
            const r = u.getObjectByProperty("uuid", e.uuid);
            r !== void 0 && (ne(r, i, c), r.updateProjectionMatrix());
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
  const t = new Q(), i = new oa(), c = new Q();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const u = (r, h) => {
    const d = r === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    n.updateObject(e.uuid, r, d);
    const f = n.getScene(e.uuid);
    if (f !== null) {
      const m = f.getObjectByProperty("uuid", e.uuid);
      ne(m, r, d);
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
          step: 0.1,
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
          value: c,
          onChange: u
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
        onChange: (c, u) => {
          const r = new Ut(u);
          n.updateObject(e.uuid, c, r);
          const h = n.getScene(e.uuid);
          if (h !== null) {
            const d = h.getObjectByProperty("uuid", e.uuid);
            ne(d, c, r);
          }
        }
      }) : a.push({
        title: dn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (c, u) => {
          n.updateObject(e.uuid, c, u);
          const r = n.getScene(e.uuid);
          if (r !== null) {
            const h = r.getObjectByProperty("uuid", e.uuid);
            ne(h, c, u);
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
  e.animations.forEach((u) => {
    i = Math.max(i, u.duration), u.duration > 0 && t.push({
      title: u.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: u.duration,
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
    const u = c.getObjectByProperty("uuid", e.uuid);
    let r = !1;
    if (u !== void 0) {
      const h = u.mixer;
      if (r = h !== void 0, r) {
        const d = [
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
        d.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            h.stopAllAction(), n.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), a.push({
          title: "Mixer",
          items: d
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
let pe = { ...zn };
function vi(e) {
  const [n, a] = G(-1);
  Re(() => {
    function u(h) {
      pe = { ...h.value }, a(Date.now());
    }
    function r() {
      pe = { ...zn }, a(Date.now());
    }
    return P.addEventListener(A.SET_SCENE, r), P.addEventListener(A.SET_OBJECT, u), () => {
      P.removeEventListener(A.SET_SCENE, r), P.removeEventListener(A.SET_OBJECT, u);
    };
  }, []);
  const t = pe.type.toLowerCase(), i = pe.animations.length > 0 || pe.mixer !== void 0, c = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Gt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: pe.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        Ct,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: pe.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ct,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: pe.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        Ct,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: pe.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      mi(pe, e.three),
      i ? gi(pe, e.three) : null,
      t.search("camera") > -1 ? fi(pe, e.three) : null,
      t.search("light") > -1 ? pi(pe, e.three) : null,
      c ? di(pe, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Fi(e) {
  const [n] = G([]), [a, t] = G(0), i = (r) => {
    n.push(r.value), t(Date.now());
  }, c = (r) => {
    const h = r.value;
    for (let d = 0; d < n.length; d++)
      if (h.uuid === n[d].uuid) {
        n.splice(d, 1), t(Date.now());
        return;
      }
  };
  Re(() => (P.addEventListener(A.ADD_SCENE, i), P.addEventListener(A.REMOVE_SCENE, c), () => {
    P.removeEventListener(A.ADD_SCENE, i), P.removeEventListener(A.REMOVE_SCENE, c);
  }), []);
  const u = [];
  return n.forEach((r, h) => {
    u.push(
      /* @__PURE__ */ l.jsx(Gt, { label: `Scene: ${r.name}`, open: !0, children: /* @__PURE__ */ l.jsx(Ya, { child: r, scene: r, three: e.three }) }, `scene_${h}`)
    );
  }), /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    u,
    /* @__PURE__ */ l.jsx(vi, { three: e.three })
  ] }, `SidePanel ${a}`);
}
function Ui(e) {
  return Re(() => {
    function n(r) {
      let h = null;
      return e.three.scenes.forEach((d) => {
        r.search(d.uuid) > -1 && (h = d);
      }), h;
    }
    const a = (r) => {
      const h = r.value, d = n(h), f = d?.getObjectByProperty("uuid", h);
      f !== void 0 ? e.three.setObject(f) : console.log(`Hermes - can't find object: ${h}`, d);
    }, t = (r, h, d) => {
      const f = n(r), m = f?.getObjectByProperty("uuid", r);
      m !== void 0 ? ne(m, h, d) : console.log(`Hermes - can't set object: ${r}`, f);
    }, i = (r) => {
      const h = r.value, { key: d, value: f, uuid: m } = h;
      t(m, d, f);
    }, c = (r) => {
      const h = r.value, f = n(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (f !== void 0) {
        const m = (v) => {
          const x = h.key.split(".");
          switch (x.length) {
            case 1:
              f[x[0]] = v;
              break;
            case 2:
              f[x[0]][x[1]] = v;
              break;
            case 3:
              f[x[0]][x[1]][x[2]] = v;
              break;
            case 4:
              f[x[0]][x[1]][x[2]][x[3]] = v;
              break;
            case 5:
              f[x[0]][x[1]][x[2]][x[3]][x[4]] = v;
              break;
          }
          f.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? Bn(h.value.src).then((v) => {
          v.offset.set(h.value.offset[0], h.value.offset[1]), v.repeat.set(h.value.repeat[0], h.value.repeat[1]), m(v);
        }) : m(null);
      }
    }, u = (r) => {
      const { key: h, uuid: d, value: f, subitem: m } = r.value, x = n(d)?.getObjectByProperty("uuid", d);
      if (x !== void 0)
        try {
          m !== void 0 ? Na(x, m)[h](f) : x[h](f);
        } catch (_) {
          console.log("Error requesting method:"), console.log(_), console.log(h), console.log(f);
        }
    };
    return P.addEventListener(A.GET_OBJECT, a), P.addEventListener(A.UPDATE_OBJECT, i), P.addEventListener(A.CREATE_TEXTURE, c), P.addEventListener(A.REQUEST_METHOD, u), () => {
      P.removeEventListener(A.GET_OBJECT, a), P.removeEventListener(A.UPDATE_OBJECT, i), P.removeEventListener(A.CREATE_TEXTURE, c), P.removeEventListener(A.REQUEST_METHOD, u);
    };
  }, []), null;
}
class bi extends ca {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new qt();
    i.setAttribute("position", new Kt(t, 3)), i.computeBoundingSphere();
    const c = new la({ fog: !1 });
    super(i, c), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const u = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new qt();
    r.setAttribute("position", new Kt(u, 3)), r.computeBoundingSphere(), this.add(new An(r, new jn({ side: vn, fog: !1 })));
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
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new Q(), this.cursor = new Q(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: it.ROTATE, MIDDLE: it.DOLLY, RIGHT: it.PAN }, this.touches = { ONE: rt.ROTATE, TWO: rt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", lt), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", lt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(hn), t.update(), c = i.NONE;
    }, this.update = function() {
      const o = new Q(), E = new Xt().setFromUnitVectors(n.up, new Q(0, 1, 0)), D = E.clone().invert(), L = new Q(), se = new Xt(), xe = new Q(), he = 2 * Math.PI;
      return function(vt = null) {
        const bt = t.object.position;
        o.copy(bt).sub(t.target), o.applyQuaternion(E), r.setFromVector3(o), t.autoRotate && c === i.NONE && ye(_e(vt)), t.enableDamping ? (r.theta += h.theta * t.dampingFactor, r.phi += h.phi * t.dampingFactor) : (r.theta += h.theta, r.phi += h.phi);
        let Se = t.minAzimuthAngle, Ce = t.maxAzimuthAngle;
        isFinite(Se) && isFinite(Ce) && (Se < -Math.PI ? Se += he : Se > Math.PI && (Se -= he), Ce < -Math.PI ? Ce += he : Ce > Math.PI && (Ce -= he), Se <= Ce ? r.theta = Math.max(Se, Math.min(Ce, r.theta)) : r.theta = r.theta > (Se + Ce) / 2 ? Math.max(Se, r.theta) : Math.min(Ce, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Xe = !1;
        if (t.zoomToCursor && ue || t.object.isOrthographicCamera)
          r.radius = Ae(r.radius);
        else {
          const Oe = r.radius;
          r.radius = Ae(r.radius * d), Xe = Oe != r.radius;
        }
        if (o.setFromSpherical(r), o.applyQuaternion(D), bt.copy(t.target).add(o), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && ue) {
          let Oe = null;
          if (t.object.isPerspectiveCamera) {
            const He = o.length();
            Oe = Ae(He * d);
            const nt = He - Oe;
            t.object.position.addScaledVector(M, nt), t.object.updateMatrixWorld(), Xe = !!nt;
          } else if (t.object.isOrthographicCamera) {
            const He = new Q(Z.x, Z.y, 0);
            He.unproject(t.object);
            const nt = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), t.object.updateProjectionMatrix(), Xe = nt !== t.object.zoom;
            const yt = new Q(Z.x, Z.y, 0);
            yt.unproject(t.object), t.object.position.sub(yt).add(He), t.object.updateMatrixWorld(), Oe = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Oe !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Oe).add(t.object.position) : (Et.origin.copy(t.object.position), Et.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Et.direction)) < yi ? n.lookAt(t.target) : (mn.setFromNormalAndCoplanarPoint(t.object.up, t.target), Et.intersectPlane(mn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Oe = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), Oe !== t.object.zoom && (t.object.updateProjectionMatrix(), Xe = !0);
        }
        return d = 1, ue = !1, Xe || L.distanceToSquared(t.object.position) > u || 8 * (1 - se.dot(t.object.quaternion)) > u || xe.distanceToSquared(t.target) > u ? (t.dispatchEvent(hn), L.copy(t.object.position), se.copy(t.object.quaternion), xe.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", tt), t.domElement.removeEventListener("pointerdown", S), t.domElement.removeEventListener("pointercancel", J), t.domElement.removeEventListener("wheel", ee), t.domElement.removeEventListener("pointermove", z), t.domElement.removeEventListener("pointerup", J), t.domElement.getRootNode().removeEventListener("keydown", ze, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", lt), t._domElementKeyEvents = null);
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
    const u = 1e-6, r = new Zt(), h = new Zt();
    let d = 1;
    const f = new Q(), m = new ge(), v = new ge(), x = new ge(), _ = new ge(), q = new ge(), U = new ge(), $ = new ge(), C = new ge(), K = new ge(), M = new Q(), Z = new ge();
    let ue = !1;
    const H = [], ve = {};
    let re = !1;
    function _e(o) {
      return o !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function ke(o) {
      const E = Math.abs(o * 0.01);
      return Math.pow(0.95, t.zoomSpeed * E);
    }
    function ye(o) {
      h.theta -= o;
    }
    function B(o) {
      h.phi -= o;
    }
    const Ee = function() {
      const o = new Q();
      return function(D, L) {
        o.setFromMatrixColumn(L, 0), o.multiplyScalar(-D), f.add(o);
      };
    }(), R = function() {
      const o = new Q();
      return function(D, L) {
        t.screenSpacePanning === !0 ? o.setFromMatrixColumn(L, 1) : (o.setFromMatrixColumn(L, 0), o.crossVectors(t.object.up, o)), o.multiplyScalar(D), f.add(o);
      };
    }(), Me = function() {
      const o = new Q();
      return function(D, L) {
        const se = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const xe = t.object.position;
          o.copy(xe).sub(t.target);
          let he = o.length();
          he *= Math.tan(t.object.fov / 2 * Math.PI / 180), Ee(2 * D * he / se.clientHeight, t.object.matrix), R(2 * L * he / se.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (Ee(D * (t.object.right - t.object.left) / t.object.zoom / se.clientWidth, t.object.matrix), R(L * (t.object.top - t.object.bottom) / t.object.zoom / se.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function De(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ie(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Pe(o, E) {
      if (!t.zoomToCursor)
        return;
      ue = !0;
      const D = t.domElement.getBoundingClientRect(), L = o - D.left, se = E - D.top, xe = D.width, he = D.height;
      Z.x = L / xe * 2 - 1, Z.y = -(se / he) * 2 + 1, M.set(Z.x, Z.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Ae(o) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, o));
    }
    function je(o) {
      m.set(o.clientX, o.clientY);
    }
    function qe(o) {
      Pe(o.clientX, o.clientX), $.set(o.clientX, o.clientY);
    }
    function Ne(o) {
      _.set(o.clientX, o.clientY);
    }
    function Ke(o) {
      v.set(o.clientX, o.clientY), x.subVectors(v, m).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      ye(2 * Math.PI * x.x / E.clientHeight), B(2 * Math.PI * x.y / E.clientHeight), m.copy(v), t.update();
    }
    function ct(o) {
      C.set(o.clientX, o.clientY), K.subVectors(C, $), K.y > 0 ? De(ke(K.y)) : K.y < 0 && Ie(ke(K.y)), $.copy(C), t.update();
    }
    function Le(o) {
      q.set(o.clientX, o.clientY), U.subVectors(q, _).multiplyScalar(t.panSpeed), Me(U.x, U.y), _.copy(q), t.update();
    }
    function ae(o) {
      Pe(o.clientX, o.clientY), o.deltaY < 0 ? Ie(ke(o.deltaY)) : o.deltaY > 0 && De(ke(o.deltaY)), t.update();
    }
    function me(o) {
      let E = !1;
      switch (o.code) {
        case t.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? B(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(0, t.keyPanSpeed), E = !0;
          break;
        case t.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? B(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(0, -t.keyPanSpeed), E = !0;
          break;
        case t.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? ye(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(t.keyPanSpeed, 0), E = !0;
          break;
        case t.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? ye(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Me(-t.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (o.preventDefault(), t.update());
    }
    function Ue(o) {
      if (H.length === 1)
        m.set(o.pageX, o.pageY);
      else {
        const E = We(o), D = 0.5 * (o.pageX + E.x), L = 0.5 * (o.pageY + E.y);
        m.set(D, L);
      }
    }
    function Be(o) {
      if (H.length === 1)
        _.set(o.pageX, o.pageY);
      else {
        const E = We(o), D = 0.5 * (o.pageX + E.x), L = 0.5 * (o.pageY + E.y);
        _.set(D, L);
      }
    }
    function be(o) {
      const E = We(o), D = o.pageX - E.x, L = o.pageY - E.y, se = Math.sqrt(D * D + L * L);
      $.set(0, se);
    }
    function g(o) {
      t.enableZoom && be(o), t.enablePan && Be(o);
    }
    function b(o) {
      t.enableZoom && be(o), t.enableRotate && Ue(o);
    }
    function O(o) {
      if (H.length == 1)
        v.set(o.pageX, o.pageY);
      else {
        const D = We(o), L = 0.5 * (o.pageX + D.x), se = 0.5 * (o.pageY + D.y);
        v.set(L, se);
      }
      x.subVectors(v, m).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      ye(2 * Math.PI * x.x / E.clientHeight), B(2 * Math.PI * x.y / E.clientHeight), m.copy(v);
    }
    function j(o) {
      if (H.length === 1)
        q.set(o.pageX, o.pageY);
      else {
        const E = We(o), D = 0.5 * (o.pageX + E.x), L = 0.5 * (o.pageY + E.y);
        q.set(D, L);
      }
      U.subVectors(q, _).multiplyScalar(t.panSpeed), Me(U.x, U.y), _.copy(q);
    }
    function ce(o) {
      const E = We(o), D = o.pageX - E.x, L = o.pageY - E.y, se = Math.sqrt(D * D + L * L);
      C.set(0, se), K.set(0, Math.pow(C.y / $.y, t.zoomSpeed)), De(K.y), $.copy(C);
      const xe = (o.pageX + E.x) * 0.5, he = (o.pageY + E.y) * 0.5;
      Pe(xe, he);
    }
    function de(o) {
      t.enableZoom && ce(o), t.enablePan && j(o);
    }
    function T(o) {
      t.enableZoom && ce(o), t.enableRotate && O(o);
    }
    function S(o) {
      t.enabled !== !1 && (H.length === 0 && (t.domElement.setPointerCapture(o.pointerId), t.domElement.addEventListener("pointermove", z), t.domElement.addEventListener("pointerup", J)), !Dt(o) && (_t(o), o.pointerType === "touch" ? ut(o) : k(o)));
    }
    function z(o) {
      t.enabled !== !1 && (o.pointerType === "touch" ? pt(o) : Y(o));
    }
    function J(o) {
      switch (kt(o), H.length) {
        case 0:
          t.domElement.releasePointerCapture(o.pointerId), t.domElement.removeEventListener("pointermove", z), t.domElement.removeEventListener("pointerup", J), t.dispatchEvent(fn), c = i.NONE;
          break;
        case 1:
          const E = H[0], D = ve[E];
          ut({ pointerId: E, pageX: D.x, pageY: D.y });
          break;
      }
    }
    function k(o) {
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
        case it.DOLLY:
          if (t.enableZoom === !1)
            return;
          qe(o), c = i.DOLLY;
          break;
        case it.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enablePan === !1)
              return;
            Ne(o), c = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            je(o), c = i.ROTATE;
          }
          break;
        case it.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enableRotate === !1)
              return;
            je(o), c = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Ne(o), c = i.PAN;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && t.dispatchEvent(jt);
    }
    function Y(o) {
      switch (c) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          Ke(o);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          ct(o);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          Le(o);
          break;
      }
    }
    function ee(o) {
      t.enabled === !1 || t.enableZoom === !1 || c !== i.NONE || (o.preventDefault(), t.dispatchEvent(jt), ae($e(o)), t.dispatchEvent(fn));
    }
    function $e(o) {
      const E = o.deltaMode, D = {
        clientX: o.clientX,
        clientY: o.clientY,
        deltaY: o.deltaY
      };
      switch (E) {
        case 1:
          D.deltaY *= 16;
          break;
        case 2:
          D.deltaY *= 100;
          break;
      }
      return o.ctrlKey && !re && (D.deltaY *= 10), D;
    }
    function ze(o) {
      o.key === "Control" && (re = !0, t.domElement.getRootNode().addEventListener("keyup", Ge, { passive: !0, capture: !0 }));
    }
    function Ge(o) {
      o.key === "Control" && (re = !1, t.domElement.getRootNode().removeEventListener("keyup", Ge, { passive: !0, capture: !0 }));
    }
    function lt(o) {
      t.enabled === !1 || t.enablePan === !1 || me(o);
    }
    function ut(o) {
      switch (gt(o), H.length) {
        case 1:
          switch (t.touches.ONE) {
            case rt.ROTATE:
              if (t.enableRotate === !1)
                return;
              Ue(o), c = i.TOUCH_ROTATE;
              break;
            case rt.PAN:
              if (t.enablePan === !1)
                return;
              Be(o), c = i.TOUCH_PAN;
              break;
            default:
              c = i.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case rt.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              g(o), c = i.TOUCH_DOLLY_PAN;
              break;
            case rt.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              b(o), c = i.TOUCH_DOLLY_ROTATE;
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
    function pt(o) {
      switch (gt(o), c) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          O(o), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          j(o), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          de(o), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          T(o), t.update();
          break;
        default:
          c = i.NONE;
      }
    }
    function tt(o) {
      t.enabled !== !1 && o.preventDefault();
    }
    function _t(o) {
      H.push(o.pointerId);
    }
    function kt(o) {
      delete ve[o.pointerId];
      for (let E = 0; E < H.length; E++)
        if (H[E] == o.pointerId) {
          H.splice(E, 1);
          return;
        }
    }
    function Dt(o) {
      for (let E = 0; E < H.length; E++)
        if (H[E] == o.pointerId)
          return !0;
      return !1;
    }
    function gt(o) {
      let E = ve[o.pointerId];
      E === void 0 && (E = new ge(), ve[o.pointerId] = E), E.set(o.pageX, o.pageY);
    }
    function We(o) {
      const E = o.pointerId === H[0] ? H[1] : H[0];
      return ve[E];
    }
    t.domElement.addEventListener("contextmenu", tt), t.domElement.addEventListener("pointerdown", S), t.domElement.addEventListener("pointercancel", J), t.domElement.addEventListener("wheel", ee, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", ze, { passive: !0, capture: !0 }), this.update();
  }
}
function ot(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const wt = (e) => {
  const [n, a] = G(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (c) => {
    c !== n && (e.onSelect(c), a(c)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((c) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(c), children: c }, c)) })
  ] });
}, Ze = Ra(function(n, a) {
  const [t, i] = G(!1), c = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      t && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      wt,
      {
        index: c,
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
let xt = "Renderer", Te, It = !1, X = null, le = null, Ye = null, Ve = null;
function $i(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", c = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", u = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", r = oe(() => /* @__PURE__ */ new Map(), []), h = oe(() => /* @__PURE__ */ new Map(), []), d = oe(() => /* @__PURE__ */ new Map(), []), f = oe(() => /* @__PURE__ */ new Map(), []), m = oe(() => new pa(), []), v = oe(() => new ga(), []), x = oe(() => new Si(), []), _ = oe(() => new Jt(500), []), q = oe(() => new Jt(100), []), U = oe(() => new va(), []), $ = oe(() => new ba(), []), C = oe(() => new Mi(), []), K = oe(() => new jn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function M(g, b) {
    const O = new Qt(-100, 100, 100, -100, 50, 5e3);
    return O.name = g, O.position.copy(b), O.lookAt(0, 0, 0), r.set(g, O), O;
  }
  const Z = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], ue = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], H = V(null), ve = V(null), re = V(null), _e = V(null), ke = V(null), ye = V(null), [B, Ee] = G(a !== null ? a : "Single"), [R, Me] = G(null), [De, Ie] = G(!1), [Pe, Ae] = G(!1), [je, qe] = G("Orbit"), [Ne, Ke] = G(!1), [ct, Le] = G(Date.now());
  localStorage.setItem(`${n}_mode`, B), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, c), localStorage.setItem(`${n}_brCam`, u);
  const ae = (g, b) => {
    const O = h.get(g.name);
    if (O !== void 0 && O.dispose(), h.delete(g.name), g.name === "UI")
      return;
    const j = new Ei(g, b);
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
  }, me = (g) => {
    const b = d.get(g.name);
    b !== void 0 && (m.remove(b), b.dispose(), d.delete(g.name));
    const O = h.get(g.name);
    O !== void 0 && (O.dispose(), h.delete(g.name));
  }, Ue = () => {
    h.forEach((g, b) => {
      g.dispose();
      const O = d.get(b);
      O !== void 0 && (m.remove(O), O.dispose()), d.delete(b), h.delete(b);
    }), h.clear(), d.clear();
  }, Be = () => {
    switch (B) {
      case "Single":
        ae(X, re.current);
        break;
      case "Side by Side":
      case "Stacked":
        ae(X, re.current), ae(le, _e.current);
        break;
      case "Quad":
        ae(X, re.current), ae(le, _e.current), ae(Ye, ke.current), ae(Ve, ye.current);
        break;
    }
  };
  Re(() => {
    const g = new ya({
      canvas: H.current,
      stencil: !1
    });
    g.autoClear = !1, g.shadowMap.enabled = !0, g.setPixelRatio(devicePixelRatio), g.setClearColor(0), e.three.renderer = g, Me(g);
  }, []), Re(() => {
    m.name = "Debug Scene", m.uuid = "", v.name = "helpers", m.add(v), v.add(x), _.name = "axisHelper", v.add(_), q.name = "interactionHelper", v.add(q), q.visible = !1, M("Top", new Q(0, 1e3, 0)), M("Bottom", new Q(0, -1e3, 0)), M("Left", new Q(-1e3, 0, 0)), M("Right", new Q(1e3, 0, 0)), M("Front", new Q(0, 0, 1e3)), M("Back", new Q(0, 0, -1e3)), M("Orthographic", new Q(1e3, 1e3, 1e3)), M("UI", new Q());
    const g = new Pt(60, 1, 50, 5e3);
    g.name = "Debug", g.position.set(500, 500, 500), g.lookAt(0, 0, 0), r.set("Debug", g), X = r.get(localStorage.getItem(`${n}_tlCam`)), le = r.get(localStorage.getItem(`${n}_trCam`)), Ye = r.get(localStorage.getItem(`${n}_blCam`)), Ve = r.get(localStorage.getItem(`${n}_brCam`));
  }, []), Re(() => {
    const g = () => {
      f.forEach((T) => {
        v.remove(T), T.dispose();
      }), f.clear();
    }, b = () => {
      Te.traverse((T) => {
        if (T.type.search("Light") > -1) {
          let S;
          switch (T.type) {
            case "DirectionalLight":
              S = new Ma(T, 100), S.name = `${T.name}Helper`, f.set(T.name, S), v.add(S);
              break;
            case "HemisphereLight":
              S = new wa(T, 250), S.name = `${T.name}Helper`, f.set(T.name, S), v.add(S);
              break;
            case "RectAreaLight":
              S = new bi(T), S.name = `${T.name}Helper`, f.set(T.name, S), v.add(S);
              break;
            case "PointLight":
              S = new Ca(T, 100), S.name = `${T.name}Helper`, f.set(T.name, S), v.add(S);
              break;
            case "SpotLight":
              S = new Sa(T), S.name = `${T.name}Helper`, f.set(T.name, S), v.add(S);
              break;
          }
        }
      });
    }, O = (T) => {
      v.add(_), g(), Ot(Te), m.remove(Te);
      const S = e.scenes.get(T.value.name);
      if (S !== void 0) {
        const z = new S();
        e.onSceneSet !== void 0 && e.onSceneSet(z), Te = z, e.three.scene = Te, m.add(Te), It = !0, b();
      }
    }, j = (T) => {
      const S = T.value, z = e.three.scene?.getObjectByProperty("uuid", S.uuid);
      if (z !== void 0 && r.set(S.name, z), z instanceof Pt) {
        const J = new xa(z);
        d.set(z.name, J), m.add(J);
      }
      Le(Date.now());
    }, ce = (T) => {
      const S = d.get(T.value.name);
      S !== void 0 && (m.remove(S), S.dispose()), r.delete(T.value.name), Le(Date.now());
    }, de = (T) => {
      const S = Te.getObjectByProperty("uuid", T.value.uuid);
      S && S.add(_);
    };
    return P.addEventListener(A.SET_SCENE, O), P.addEventListener(A.ADD_CAMERA, j), P.addEventListener(A.REMOVE_CAMERA, ce), P.addEventListener(A.SET_OBJECT, de), () => {
      P.removeEventListener(A.SET_SCENE, O), P.removeEventListener(A.ADD_CAMERA, j), P.removeEventListener(A.REMOVE_CAMERA, ce), P.removeEventListener(A.SET_OBJECT, de);
    };
  }, []), Re(() => {
    if (R === null)
      return;
    let g = window.innerWidth, b = window.innerHeight, O = Math.floor(g / 2), j = Math.floor(b / 2), ce = -1;
    const de = () => {
      g = window.innerWidth - 300, b = window.innerHeight, O = Math.floor(g / 2), j = Math.floor(b / 2), e.three.resize(g, b), e.onSceneResize !== void 0 && It && e.onSceneResize(Te, g, b);
      let k = g, Y = b;
      switch (B) {
        case "Side by Side":
          k = O, Y = b;
          break;
        case "Stacked":
          k = g, Y = j;
          break;
        case "Quad":
          k = O, Y = j;
          break;
      }
      r.forEach((ee) => {
        ee instanceof Qt ? (ee.left = k / -2, ee.right = k / 2, ee.top = Y / 2, ee.bottom = Y / -2, ee.name === "UI" && (ee.position.x = g / 2, ee.position.y = b / -2, ee.position.z = 100), ee.updateProjectionMatrix()) : ee instanceof Pt && (ee.aspect = k / Y, ee.updateProjectionMatrix(), d.get(ee.name)?.update());
      });
    }, T = () => {
      R.setViewport(0, 0, g, b), R.setScissor(0, 0, g, b), R.render(m, X);
    }, S = () => {
      if (B === "Side by Side")
        R.setViewport(0, 0, O, b), R.setScissor(0, 0, O, b), R.render(m, X), R.setViewport(O, 0, O, b), R.setScissor(O, 0, O, b), R.render(m, le);
      else {
        const k = b - j;
        R.setViewport(0, k, g, j), R.setScissor(0, k, g, j), R.render(m, X), R.setViewport(0, 0, g, j), R.setScissor(0, 0, g, j), R.render(m, le);
      }
    }, z = () => {
      let k = 0, Y = 0;
      Y = b - j, k = 0, R.setViewport(k, Y, O, j), R.setScissor(k, Y, O, j), R.render(m, X), k = O, R.setViewport(k, Y, O, j), R.setScissor(k, Y, O, j), R.render(m, le), Y = 0, k = 0, R.setViewport(k, Y, O, j), R.setScissor(k, Y, O, j), R.render(m, Ye), k = O, R.setViewport(k, Y, O, j), R.setScissor(k, Y, O, j), R.render(m, Ve);
    }, J = () => {
      switch (h.forEach((k) => {
        k.update();
      }), d.forEach((k) => {
        k.update();
      }), f.forEach((k) => {
        k.update !== void 0 && k.update();
      }), e.onSceneUpdate !== void 0 && It && e.onSceneUpdate(Te), R.clear(), B) {
        case "Single":
          T();
          break;
        case "Side by Side":
        case "Stacked":
          S();
          break;
        case "Quad":
          z();
          break;
      }
      ce = requestAnimationFrame(J);
    };
    return Be(), window.addEventListener("resize", de), de(), J(), () => {
      window.removeEventListener("resize", de), cancelAnimationFrame(ce), ce = -1;
    };
  }, [B, R]), Re(() => {
    if (R !== null) {
      const g = new Ea(), b = new ge(), O = (T, S, z, J) => {
        switch (B) {
          case "Quad":
            T < z ? S < J ? g.setFromCamera(b, X) : g.setFromCamera(b, Ye) : S < J ? g.setFromCamera(b, le) : g.setFromCamera(b, Ve);
            break;
          case "Side by Side":
            T < z ? g.setFromCamera(b, X) : g.setFromCamera(b, le);
            break;
          case "Single":
            g.setFromCamera(b, X);
            break;
          case "Stacked":
            S < J ? g.setFromCamera(b, X) : g.setFromCamera(b, le);
            break;
        }
      }, j = (T) => {
        if (je === "Orbit")
          return;
        const S = new ge();
        R.getSize(S);
        const z = Math.min(T.clientX, S.x), J = Math.min(T.clientY, S.y);
        b.x = ot(z, 0, S.x, -1, 1), b.y = ot(J, 0, S.y, 1, -1);
        const k = S.x / 2, Y = S.y / 2, ee = () => {
          z < k ? b.x = ot(z, 0, k, -1, 1) : b.x = ot(z, k, S.x, -1, 1);
        }, $e = () => {
          J < Y ? b.y = ot(J, 0, Y, 1, -1) : b.y = ot(J, Y, S.y, 1, -1);
        };
        switch (B) {
          case "Quad":
            ee(), $e();
            break;
          case "Side by Side":
            ee();
            break;
          case "Stacked":
            $e(), $e();
            break;
        }
        O(z, J, k, Y);
        const ze = g.intersectObjects(Te.children);
        ze.length > 0 && q.position.copy(ze[0].point);
      }, ce = (T) => {
        if (je === "Orbit")
          return;
        const S = new ge();
        if (R.getSize(S), T.clientX >= S.x)
          return;
        j(T);
        const z = g.intersectObjects(Te.children);
        z.length > 0 && (e.three.getObject(z[0].object.uuid), q.visible = !1, qe("Orbit"), Le(Date.now()));
      }, de = ve.current;
      return de.addEventListener("mousemove", j, !1), de.addEventListener("click", ce, !1), () => {
        de.removeEventListener("mousemove", j), de.removeEventListener("click", ce);
      };
    }
  }, [B, R, je]);
  const be = [];
  return r.forEach((g, b) => {
    be.push(b);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: H }),
    R !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${B === "Single" || B === "Stacked" ? "single" : ""}`, ref: ve, children: [
        B === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(Ze, { camera: X, options: be, ref: re, onSelect: (g) => {
          h.get(X.name)?.dispose();
          const b = r.get(g);
          b !== void 0 && (me(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), ae(b, re.current));
        } }) }),
        (B === "Side by Side" || B === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Ze, { camera: X, options: be, ref: re, onSelect: (g) => {
            h.get(X.name)?.dispose();
            const b = r.get(g);
            b !== void 0 && (me(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), ae(b, re.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: le, options: be, ref: _e, onSelect: (g) => {
            h.get(le.name)?.dispose();
            const b = r.get(g);
            b !== void 0 && (me(le), le = b, localStorage.setItem(`${n}_trCam`, b.name), ae(b, _e.current));
          } })
        ] }),
        B === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(Ze, { camera: X, options: be, ref: re, onSelect: (g) => {
            h.get(X.name)?.dispose();
            const b = r.get(g);
            b !== void 0 && (me(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), ae(b, re.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: le, options: be, ref: _e, onSelect: (g) => {
            h.get(le.name)?.dispose();
            const b = r.get(g);
            b !== void 0 && (me(le), le = b, localStorage.setItem(`${n}_trCam`, b.name), ae(b, _e.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: Ye, options: be, ref: ke, onSelect: (g) => {
            h.get(Ye.name)?.dispose();
            const b = r.get(g);
            b !== void 0 && (me(Ye), Ye = b, localStorage.setItem(`${n}_blCam`, b.name), ae(b, ke.current));
          } }),
          /* @__PURE__ */ l.jsx(Ze, { camera: Ve, options: be, ref: ye, onSelect: (g) => {
            h.get(Ve.name)?.dispose();
            const b = r.get(g);
            b !== void 0 && (me(Ve), Ve = b, localStorage.setItem(`${n}_brCam`, b.name), ae(b, ye.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          wt,
          {
            index: ue.indexOf(B),
            options: ue,
            onSelect: (g) => {
              g !== B && (Ue(), Ee(g));
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
            index: Z.indexOf(xt),
            options: Z,
            onSelect: (g) => {
              if (g !== xt)
                switch (xt = g, xt) {
                  case "Depth":
                    m.overrideMaterial = U;
                    break;
                  case "Normals":
                    m.overrideMaterial = $;
                    break;
                  default:
                  case "Renderer":
                    m.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    m.overrideMaterial = K;
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
              q.visible = g === "Selection Mode", qe(q.visible ? "Selection" : "Orbit");
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
