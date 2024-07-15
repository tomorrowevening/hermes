import { EventDispatcher as pn, Texture as gn, CubeTexture as Hn, RepeatWrapping as qt, WebGLRenderTarget as Yn, Color as $t, FrontSide as Vn, BackSide as vn, DoubleSide as bn, NoBlending as qn, NormalBlending as Kn, AdditiveBlending as Xn, SubtractiveBlending as Zn, MultiplyBlending as Jn, CustomBlending as Qn, AddEquation as ea, SubtractEquation as ta, ReverseSubtractEquation as na, MinEquation as aa, MaxEquation as ia, ZeroFactor as yn, OneFactor as En, SrcColorFactor as xn, OneMinusSrcColorFactor as Sn, SrcAlphaFactor as Cn, OneMinusSrcAlphaFactor as wn, DstAlphaFactor as Mn, OneMinusDstAlphaFactor as On, DstColorFactor as Tn, OneMinusDstColorFactor as Rn, SrcAlphaSaturateFactor as ra, ConstantColorFactor as _n, OneMinusConstantColorFactor as kn, ConstantAlphaFactor as Dn, OneMinusConstantAlphaFactor as Pn, Matrix4 as sa, Vector3 as J, Euler as oa, Line as ca, BufferGeometry as Kt, Float32BufferAttribute as Xt, LineBasicMaterial as la, Mesh as An, MeshBasicMaterial as jn, Ray as ua, Plane as da, MathUtils as ha, MOUSE as nt, TOUCH as at, Quaternion as Zt, Spherical as Jt, Vector2 as me, ShaderMaterial as In, GLSL3 as fa, PlaneGeometry as ma, Scene as pa, Group as ga, AxesHelper as Qt, MeshDepthMaterial as va, MeshNormalMaterial as ba, WebGLRenderer as ya, PerspectiveCamera as At, Raycaster as Ea, OrthographicCamera as en, CameraHelper as xa, SpotLightHelper as Sa, PointLightHelper as Ca, HemisphereLightHelper as wa, DirectionalLightHelper as Ma } from "three";
import { Pane as Oa } from "tweakpane";
import * as Ta from "@tweakpane/plugin-essentials";
import Nn, { useState as H, useRef as Y, useEffect as Re, useMemo as se, forwardRef as Ra } from "react";
import { Reorder as Ln } from "framer-motion";
const zt = () => {
}, Di = () => {
};
function Ot(e) {
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
function Pi(e, n) {
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
function an(e, n = 1) {
  return Number(e.toFixed(n));
}
let Lt = 0;
const rn = () => {
  Lt = 0;
}, Bt = (e) => {
  if (!e)
    return;
  let n = e.name.replaceAll(" ", "").replaceAll("/", ".");
  n.length === 0 && (n = `obj_${Lt}`, Lt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.children.forEach((a) => {
    Bt(a);
  });
}, Ai = (e) => {
  e?.dispose();
}, Pa = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, Tt = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : Tt(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), Pa(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class ji {
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
const D = new pn(), P = {
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
class Rt {
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
class Ii extends Rt {
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
        D.dispatchEvent({ type: P.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        D.dispatchEvent({ type: P.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Gt extends Rt {
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
    u !== void 0 ? u = d.object(a, { ...t, ...u.value }, { reconfigure: !0 }) : u = d.object(a, t), this.sheetObjects.set(h, u), this.sheetObjectCBs.set(h, i !== void 0 ? i : zt);
    const f = u.onValuesChange((m) => {
      if (this.app.editor) {
        for (const S in m) {
          const A = m[S];
          typeof A == "object" && ka(A) && (m[S] = {
            r: A.r,
            g: A.g,
            b: A.b,
            a: A.a
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
      const p = this.sheetObjectCBs.get(h);
      p !== void 0 && p(m);
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
        if (Gt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
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
function Ni(e, n, a) {
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
      if (Gt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
function Ct(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((a) => {
    n.children.push(Ct(a));
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
function ee(e, n, a) {
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
      i.wrapS = qt, i.wrapT = qt, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Li extends Rt {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((n) => {
      Tt(n);
    }), this.scenes.clear(), this.scene && Tt(this.scene), this.renderTargets.forEach((n) => {
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
  addScene(n) {
    if (n === void 0 || (this.scenes.set(n.name, n), !this.app.debugEnabled))
      return;
    rn(), Bt(n);
    const a = Ct(n);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: a
    });
  }
  removeScene(n) {
    if (n === void 0 || (this.scenes.delete(n.name), !this.app.debugEnabled))
      return;
    const a = Ct(n);
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
    return this.scenes.forEach((t) => {
      n.search(t.uuid) > -1 && (a = t);
    }), a;
  }
  setScene(n) {
    if (n === void 0 || (this.scene = n, !this.app.debugEnabled))
      return;
    rn(), Bt(n);
    const a = Ct(n);
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
        D.dispatchEvent({ type: P.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        D.dispatchEvent({ type: P.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        D.dispatchEvent({ type: P.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        D.dispatchEvent({ type: P.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        D.dispatchEvent({ type: P.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        D.dispatchEvent({ type: P.ADD_SCENE, value: t.data });
        break;
      case "removeScene":
        D.dispatchEvent({ type: P.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        D.dispatchEvent({ type: P.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        D.dispatchEvent({ type: P.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        D.dispatchEvent({ type: P.REMOVE_CAMERA, value: t.data });
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
class Bi extends Rt {
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
    const o = this.bindID, d = t.onChange !== void 0 ? t.onChange : zt;
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
  var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(r, h, u) {
    var f, m = {}, p = null, S = null;
    u !== void 0 && (p = "" + u), h.key !== void 0 && (p = "" + h.key), h.ref !== void 0 && (S = h.ref);
    for (f in h)
      t.call(h, f) && !o.hasOwnProperty(f) && (m[f] = h[f]);
    if (r && r.defaultProps)
      for (f in h = r.defaultProps, h)
        m[f] === void 0 && (m[f] = h[f]);
    return { $$typeof: n, type: r, key: p, ref: S, props: m, _owner: i.current };
  }
  return lt.Fragment = a, lt.jsx = d, lt.jsxs = d, lt;
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
    var e = Nn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), r = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), A = Symbol.iterator, F = "@@iterator";
    function V(s) {
      if (s === null || typeof s != "object")
        return null;
      var g = A && s[A] || s[F];
      return typeof g == "function" ? g : null;
    }
    var R = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function I(s) {
      {
        for (var g = arguments.length, y = new Array(g > 1 ? g - 1 : 0), w = 1; w < g; w++)
          y[w - 1] = arguments[w];
        T("error", s, y);
      }
    }
    function T(s, g, y) {
      {
        var w = R.ReactDebugCurrentFrame, $ = w.getStackAddendum();
        $ !== "" && (g += "%s", y = y.concat([$]));
        var W = y.map(function(L) {
          return String(L);
        });
        W.unshift("Warning: " + g), Function.prototype.apply.call(console[s], console, W);
      }
    }
    var Z = !1, te = !1, pe = !1, q = !1, ge = !1, ce;
    ce = Symbol.for("react.module.reference");
    function _e(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === t || s === o || ge || s === i || s === u || s === f || q || s === S || Z || te || pe || typeof s == "object" && s !== null && (s.$$typeof === p || s.$$typeof === m || s.$$typeof === d || s.$$typeof === r || s.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === ce || s.getModuleId !== void 0));
    }
    function ke(s, g, y) {
      var w = s.displayName;
      if (w)
        return w;
      var $ = g.displayName || g.name || "";
      return $ !== "" ? y + "(" + $ + ")" : y;
    }
    function be(s) {
      return s.displayName || "Context";
    }
    function U(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && I("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
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
            var g = s;
            return be(g) + ".Consumer";
          case d:
            var y = s;
            return be(y._context) + ".Provider";
          case h:
            return ke(s, s.render, "ForwardRef");
          case m:
            var w = s.displayName || null;
            return w !== null ? w : U(s.type) || "Memo";
          case p: {
            var $ = s, W = $._payload, L = $._init;
            try {
              return U(L(W));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ye = Object.assign, O = 0, we, De, je, Pe, Ae, Ie, Be;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function re() {
      {
        if (O === 0) {
          we = console.log, De = console.info, je = console.warn, Pe = console.error, Ae = console.group, Ie = console.groupCollapsed, Be = console.groupEnd;
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
            log: ye({}, s, {
              value: we
            }),
            info: ye({}, s, {
              value: De
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
              value: Ie
            }),
            groupEnd: ye({}, s, {
              value: Be
            })
          });
        }
        O < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var He = R.ReactCurrentDispatcher, Ye;
    function ue(s, g, y) {
      {
        if (Ye === void 0)
          try {
            throw Error();
          } catch ($) {
            var w = $.stack.trim().match(/\n( *(at )?)/);
            Ye = w && w[1] || "";
          }
        return `
` + Ye + s;
      }
    }
    var v = !1, b;
    {
      var M = typeof WeakMap == "function" ? WeakMap : Map;
      b = new M();
    }
    function N(s, g) {
      if (!s || v)
        return "";
      {
        var y = b.get(s);
        if (y !== void 0)
          return y;
      }
      var w;
      v = !0;
      var $ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var W;
      W = He.current, He.current = null, re();
      try {
        if (g) {
          var L = function() {
            throw Error();
          };
          if (Object.defineProperty(L.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(L, []);
            } catch (Le) {
              w = Le;
            }
            Reflect.construct(s, [], L);
          } else {
            try {
              L.call();
            } catch (Le) {
              w = Le;
            }
            s.call(L.prototype);
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
          for (var j = Le.stack.split(`
`), he = w.stack.split(`
`), Q = j.length - 1, ae = he.length - 1; Q >= 1 && ae >= 0 && j[Q] !== he[ae]; )
            ae--;
          for (; Q >= 1 && ae >= 0; Q--, ae--)
            if (j[Q] !== he[ae]) {
              if (Q !== 1 || ae !== 1)
                do
                  if (Q--, ae--, ae < 0 || j[Q] !== he[ae]) {
                    var Ce = `
` + j[Q].replace(" at new ", " at ");
                    return s.displayName && Ce.includes("<anonymous>") && (Ce = Ce.replace("<anonymous>", s.displayName)), typeof s == "function" && b.set(s, Ce), Ce;
                  }
                while (Q >= 1 && ae >= 0);
              break;
            }
        }
      } finally {
        v = !1, He.current = W, Me(), Error.prepareStackTrace = $;
      }
      var tt = s ? s.displayName || s.name : "", Vt = tt ? ue(tt) : "";
      return typeof s == "function" && b.set(s, Vt), Vt;
    }
    function ve(s, g, y) {
      return N(s, !1);
    }
    function le(s) {
      var g = s.prototype;
      return !!(g && g.isReactComponent);
    }
    function C(s, g, y) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return N(s, le(s));
      if (typeof s == "string")
        return ue(s);
      switch (s) {
        case u:
          return ue("Suspense");
        case f:
          return ue("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case h:
            return ve(s.render);
          case m:
            return C(s.type, g, y);
          case p: {
            var w = s, $ = w._payload, W = w._init;
            try {
              return C(W($), g, y);
            } catch {
            }
          }
        }
      return "";
    }
    var x = Object.prototype.hasOwnProperty, G = {}, ne = R.ReactDebugCurrentFrame;
    function _(s) {
      if (s) {
        var g = s._owner, y = C(s.type, s._source, g ? g.type : null);
        ne.setExtraStackFrame(y);
      } else
        ne.setExtraStackFrame(null);
    }
    function z(s, g, y, w, $) {
      {
        var W = Function.call.bind(x);
        for (var L in s)
          if (W(s, L)) {
            var j = void 0;
            try {
              if (typeof s[L] != "function") {
                var he = Error((w || "React class") + ": " + y + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              j = s[L](g, L, w, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              j = Q;
            }
            j && !(j instanceof Error) && (_($), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", y, L, typeof j), _(null)), j instanceof Error && !(j.message in G) && (G[j.message] = !0, _($), I("Failed %s type: %s", y, j.message), _(null));
          }
      }
    }
    var K = Array.isArray;
    function Ne(s) {
      return K(s);
    }
    function Je(s) {
      {
        var g = typeof Symbol == "function" && Symbol.toStringTag, y = g && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return y;
      }
    }
    function ft(s) {
      try {
        return mt(s), !1;
      } catch {
        return !0;
      }
    }
    function mt(s) {
      return "" + s;
    }
    function st(s) {
      if (ft(s))
        return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(s)), mt(s);
    }
    var Ue = R.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ct, pt, Qe;
    Qe = {};
    function kt(s) {
      if (x.call(s, "ref")) {
        var g = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (g && g.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Dt(s) {
      if (x.call(s, "key")) {
        var g = Object.getOwnPropertyDescriptor(s, "key").get;
        if (g && g.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function Pt(s, g) {
      if (typeof s.ref == "string" && Ue.current && g && Ue.current.stateNode !== g) {
        var y = U(Ue.current.type);
        Qe[y] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', U(Ue.current.type), s.ref), Qe[y] = !0);
      }
    }
    function gt(s, g) {
      {
        var y = function() {
          ct || (ct = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        y.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: y,
          configurable: !0
        });
      }
    }
    function $e(s, g) {
      {
        var y = function() {
          pt || (pt = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        y.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: y,
          configurable: !0
        });
      }
    }
    var Ht = function(s, g, y, w, $, W, L) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: s,
        key: g,
        ref: y,
        props: L,
        // Record the component responsible for creating this element.
        _owner: W
      };
      return j._store = {}, Object.defineProperty(j._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(j, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(j, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    };
    function c(s, g, y, w, $) {
      {
        var W, L = {}, j = null, he = null;
        y !== void 0 && (st(y), j = "" + y), Dt(g) && (st(g.key), j = "" + g.key), kt(g) && (he = g.ref, Pt(g, $));
        for (W in g)
          x.call(g, W) && !ot.hasOwnProperty(W) && (L[W] = g[W]);
        if (s && s.defaultProps) {
          var Q = s.defaultProps;
          for (W in Q)
            L[W] === void 0 && (L[W] = Q[W]);
        }
        if (j || he) {
          var ae = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          j && gt(L, ae), he && $e(L, ae);
        }
        return Ht(s, j, he, $, w, Ue.current, L);
      }
    }
    var E = R.ReactCurrentOwner, k = R.ReactDebugCurrentFrame;
    function B(s) {
      if (s) {
        var g = s._owner, y = C(s.type, s._source, g ? g.type : null);
        k.setExtraStackFrame(y);
      } else
        k.setExtraStackFrame(null);
    }
    var ie;
    ie = !1;
    function Ee(s) {
      return typeof s == "object" && s !== null && s.$$typeof === n;
    }
    function de() {
      {
        if (E.current) {
          var s = U(E.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function Yt(s) {
      {
        if (s !== void 0) {
          var g = s.fileName.replace(/^.*[\\\/]/, ""), y = s.lineNumber;
          return `

Check your code at ` + g + ":" + y + ".";
        }
        return "";
      }
    }
    var vt = {};
    function bt(s) {
      {
        var g = de();
        if (!g) {
          var y = typeof s == "string" ? s : s.displayName || s.name;
          y && (g = `

Check the top-level render call using <` + y + ">.");
        }
        return g;
      }
    }
    function xe(s, g) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var y = bt(g);
        if (vt[y])
          return;
        vt[y] = !0;
        var w = "";
        s && s._owner && s._owner !== E.current && (w = " It was passed a child from " + U(s._owner.type) + "."), B(s), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, w), B(null);
      }
    }
    function Se(s, g) {
      {
        if (typeof s != "object")
          return;
        if (Ne(s))
          for (var y = 0; y < s.length; y++) {
            var w = s[y];
            Ee(w) && xe(w, g);
          }
        else if (Ee(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var $ = V(s);
          if (typeof $ == "function" && $ !== s.entries)
            for (var W = $.call(s), L; !(L = W.next()).done; )
              Ee(L.value) && xe(L.value, g);
        }
      }
    }
    function Ve(s) {
      {
        var g = s.type;
        if (g == null || typeof g == "string")
          return;
        var y;
        if (typeof g == "function")
          y = g.propTypes;
        else if (typeof g == "object" && (g.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        g.$$typeof === m))
          y = g.propTypes;
        else
          return;
        if (y) {
          var w = U(g);
          z(y, s.props, "prop", w, s);
        } else if (g.PropTypes !== void 0 && !ie) {
          ie = !0;
          var $ = U(g);
          I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", $ || "Unknown");
        }
        typeof g.getDefaultProps == "function" && !g.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(s) {
      {
        for (var g = Object.keys(s.props), y = 0; y < g.length; y++) {
          var w = g[y];
          if (w !== "children" && w !== "key") {
            B(s), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), B(null);
            break;
          }
        }
        s.ref !== null && (B(s), I("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
      }
    }
    function ze(s, g, y, w, $, W) {
      {
        var L = _e(s);
        if (!L) {
          var j = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = Yt($);
          he ? j += he : j += de();
          var Q;
          s === null ? Q = "null" : Ne(s) ? Q = "array" : s !== void 0 && s.$$typeof === n ? (Q = "<" + (U(s.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof s, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, j);
        }
        var ae = c(s, g, y, $, W);
        if (ae == null)
          return ae;
        if (L) {
          var Ce = g.children;
          if (Ce !== void 0)
            if (w)
              if (Ne(Ce)) {
                for (var tt = 0; tt < Ce.length; tt++)
                  Se(Ce[tt], s);
                Object.freeze && Object.freeze(Ce);
              } else
                I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Se(Ce, s);
        }
        return s === t ? Oe(ae) : Ve(ae), ae;
      }
    }
    function et(s, g, y) {
      return ze(s, g, y, !0);
    }
    function yt(s, g, y) {
      return ze(s, g, y, !1);
    }
    var Gn = yt, Wn = et;
    ut.Fragment = t, ut.jsx = Gn, ut.jsxs = Wn;
  }()), ut;
}
process.env.NODE_ENV === "production" ? Ft.exports = Ba() : Ft.exports = Fa();
var l = Ft.exports;
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
  const [n, a] = H(!1), [t, i] = H(e.options), o = (u) => {
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
  const [n, a] = H(!1), t = [];
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
  const { option: n } = e, [a, t] = H("");
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
function Fi(e, n, a) {
  function t(o) {
    switch (n.forEach((d) => {
      d.callback(e, d.remote, o);
    }), o.event) {
      case "custom":
        D.dispatchEvent({ type: P.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((d) => {
      d.callback(e, d.remote, o);
    }), o.event) {
      case "custom":
        D.dispatchEvent({ type: P.CUSTOM, value: o.data });
        break;
    }
  }
  e.listen = (o) => {
    o.target === "editor" ? i(o) : t(o);
  };
}
function Wt(e) {
  const [n, a] = H(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
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
          /* @__PURE__ */ l.jsx("p", { className: "label", children: Ot(e.label) })
        ]
      }
    ),
    e.button,
    /* @__PURE__ */ l.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { children: e.children }) })
  ] });
}
function Un(e) {
  const n = Y(null), [a, t] = H(!1), i = e.child !== void 0 && e.child.children.length > 0, o = [];
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
                  n.current.style.opacity = u ? "1" : "0.25", e.three.updateObject(e.child.uuid, h, u), ee(r, h, u);
                }
              }
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
  const [n, a] = H(e.defaultValue);
  return Re(() => {
    let t = !1, i = -1, o = 0, d = e.defaultValue;
    const r = (p) => {
      t = !0, o = Number(e.input.current?.value), i = p.clientX, document.addEventListener("mouseup", u, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", u, !1);
    }, h = (p) => {
      if (!t)
        return;
      const S = e.step !== void 0 ? e.step : 1, A = (p.clientX - i) * S;
      d = Number((o + A).toFixed(4)), e.min !== void 0 && (d = Math.max(d, e.min)), e.max !== void 0 && (d = Math.min(d, e.max)), e.onChange !== void 0 && e.onChange(d), a(d);
    }, u = () => {
      t = !1, document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", u);
    }, f = (p) => {
      const S = Number(p.target.value);
      a(S);
    }, m = (p) => {
      const S = Number(p.target.value);
      e.onChange !== void 0 && e.onChange(S), a(S);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", r, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", m), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", r), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", u);
    };
  }, []), n;
}
function Xe(e) {
  const n = Y(null), a = Y(null), t = Va({
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
          onChange: zt
        }
      )
    ] })
  ] });
}
function qa(e) {
  const n = Y(null), a = Y(null), t = Y(null), i = Y(null), o = Y(null), d = Y(null), [r, h] = H(e.value), [u, f] = H({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [m, p] = H(!1);
  function S() {
    m || (window.addEventListener("mousemove", F), window.addEventListener("mouseup", A), window.addEventListener("mouseup", A), p(!0));
  }
  function A() {
    window.removeEventListener("mousemove", F), window.removeEventListener("mouseup", A), p(!1);
  }
  function F(T) {
    const Z = o.current.getBoundingClientRect(), te = Ke(0, 99, T.clientX - Z.left) / 99, pe = Ke(0, 99, T.clientY - Z.top) / 99, q = an(nn(u.min, u.max, te), 3), ge = an(nn(u.min, u.max, pe), 3);
    e.onChange({ target: { value: { x: q, y: ge } } }), h({ x: q, y: ge });
  }
  function V(T) {
    let Z = r.x, te = r.y;
    T.target === n.current ? Z = Number(T.target.value) : te = Number(T.target.value), h({ x: Z, y: te });
  }
  function R() {
    const T = Number(t.current.value);
    f({ min: T, max: u.max }), (r.x < T || r.y < T) && h({ x: Ke(T, u.max, r.x), y: Ke(T, u.max, r.y) });
  }
  function I() {
    const T = Number(i.current.value);
    f({ min: u.min, max: T }), (r.x > T || r.y > T) && h({ x: Ke(u.min, T, r.x), y: Ke(u.min, T, r.y) });
  }
  return Re(() => {
    const T = tn(u.min, u.max, r.x), Z = tn(u.min, u.max, r.y);
    d.current.style.left = `${T * 100}%`, d.current.style.top = `${Z * 100}%`;
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
            onChange: V
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
            onChange: V
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
            onChange: R
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
            onChange: I
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: o, onMouseDown: S, onMouseUp: A, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: d })
    ] })
  ] });
}
function cn(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = [];
  if (n) {
    const o = se(() => e.value, []), d = (h, u) => {
      o[h] = u, e.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((h) => {
      const u = Y(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: u, children: h.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Xe,
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
      const u = Y(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: u, children: h.substring(1).toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Xe,
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
      const h = Y(null);
      i.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: r + 1 }),
          /* @__PURE__ */ l.jsx(
            Xe,
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
      const r = Y(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: r, children: d.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            Xe,
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
      const d = Y(null);
      a.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: o + 1 }),
          /* @__PURE__ */ l.jsx(
            Xe,
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
function Ze(e) {
  const n = [];
  return e.items.forEach((a) => {
    Xa(a) ? n.push(
      /* @__PURE__ */ l.jsx(Ze, { title: Ot(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ l.jsx(
        wt,
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
  }), /* @__PURE__ */ l.jsx(Wt, { label: e.title, open: e.expanded === !0, children: n });
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
function dt(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function ri(e, n, a, t) {
  return {
    type: "boolean",
    title: _t(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, o) => {
      t.updateObject(a.uuid, `material.${e}`, o), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const d = t.getScene(a.uuid);
      if (d !== null) {
        const r = d.getObjectByProperty("uuid", a.uuid);
        r !== void 0 && ee(r, `material.${e}`, o);
      }
    }
  };
}
function si(e, n, a, t) {
  const i = {
    type: "number",
    title: _t(e),
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
        h !== void 0 && ee(h, `material.${e}`, d);
      }
    }
  };
  switch (e) {
    case "blending":
      dt(i, ti);
      break;
    case "blendDst":
      dt(i, ii);
      break;
    case "blendEquation":
      dt(i, ni);
      break;
    case "blendSrc":
      dt(i, ai);
      break;
    case "side":
      dt(i, ei);
      break;
  }
  return $n(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function oi(e, n, a, t) {
  const i = {
    type: "string",
    title: _t(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (d, r) => {
      t.updateObject(a.uuid, `material.${e}`, r), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = t.getScene(a.uuid);
      if (h !== null) {
        const u = h.getObjectByProperty("uuid", a.uuid);
        u !== void 0 && ee(u, `material.${e}`, r);
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
      u !== void 0 && ee(u, `material.${e}`, r);
    }
  }, i.onKeyDown = (d) => {
    if (d.key === "Enter" && (d.altKey || d.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const r = t.getScene(a.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", a.uuid);
        h !== void 0 && ee(h, "material.needsUpdate", !0);
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
function Ut(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function ht(e, n, a, t, i = "", o = !1) {
  const d = _t(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = i.length > 0 ? `${i}.${e}` : e, h = typeof n;
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
          const p = m.getObjectByProperty("uuid", a.uuid);
          p !== void 0 && ee(p, `material.${r}`, f);
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
        const p = t.getScene(a.uuid);
        if (p !== null) {
          const S = p.getObjectByProperty("uuid", a.uuid);
          S !== void 0 && ee(S, `material.${r}`, m);
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
          const m = new $t(f);
          t.updateObject(a.uuid, `material.${r}`, m);
          const p = t.getScene(a.uuid);
          if (p !== null) {
            const S = p.getObjectByProperty("uuid", a.uuid);
            S !== void 0 && ee(S, `material.${r}`, m);
          }
        }
      };
    if (Array.isArray(n)) {
      const u = [];
      for (const f in n) {
        const m = n[f], p = `[${f.toString()}]`;
        if (m.value !== void 0) {
          const S = ht(`${p}.value`, m.value, a, t, r, o);
          S !== void 0 && u.push(S);
        } else {
          const S = ht(p, m, a, t, r, o);
          S !== void 0 && u.push(S);
        }
      }
      if (u.length > 0)
        return Ut(u), {
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
              const p = m.getObjectByProperty("uuid", a.uuid);
              p !== void 0 && ee(p, `material.${r}`, f);
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
              const p = m.getObjectByProperty("uuid", a.uuid);
              p !== void 0 && ee(p, `material.${r}`, f);
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
              const p = m.getObjectByProperty("uuid", a.uuid);
              p !== void 0 && ee(p, `material.${r}`, f);
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
              const p = m.getObjectByProperty("uuid", a.uuid);
              p !== void 0 && ee(p, `material.${r}`, f);
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
            const m = Ja(e), p = i.length > 0 ? `${i}.${m}` : m;
            t.createTexture(a.uuid, `material.${p}`, f);
            const S = t.getScene(a.uuid);
            if (S !== null) {
              const A = S.getObjectByProperty("uuid", a.uuid);
              A !== void 0 && Bn(f.src).then((F) => {
                F.offset.set(f.offset[0], f.offset[1]), F.repeat.set(f.repeat[0], f.repeat[1]);
                const V = A.material, R = p.split(".");
                switch (R.length) {
                  case 1:
                    V[R[0]] = F;
                    break;
                  case 2:
                    V[R[0]][R[1]] = F;
                    break;
                  case 3:
                    V[R[0]][R[1]][R[2]] = F;
                    break;
                  case 4:
                    V[R[0]][R[1]][R[2]][R[3]] = F;
                    break;
                  case 5:
                    V[R[0]][R[1]][R[2]][R[3]][R[4]] = F;
                    break;
                }
                V.needsUpdate = !0;
              });
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
              const p = m.getObjectByProperty("uuid", a.uuid);
              p !== void 0 && ee(p, `material.${r}`, f);
            }
          }
        };
      {
        const u = [], f = e === "defines" || e === "extensions";
        try {
          for (const m in n) {
            const p = n[m];
            if (p !== void 0)
              if (p.value !== void 0) {
                const S = ht(`${m}.value`, p.value, a, t, r, f);
                S !== void 0 && u.push(S);
              } else {
                const S = ht(m, p, a, t, r, f);
                S !== void 0 && u.push(S);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (u.length > 0)
          return Ut(u), {
            title: d,
            items: u
          };
      }
    }
  }
}
function ln(e, n, a) {
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
      const r = ht(i, d, n, a);
      r !== void 0 && t.push(r);
    } else
      d !== void 0 && console.log("other:", i, o, d);
  }
  return Ut(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.getScene(n.uuid);
      if (i !== null) {
        const o = i.getObjectByProperty("uuid", n.uuid);
        o !== void 0 && ee(o, "material.needsUpdate", !0);
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
          Ze,
          {
            title: `Material ${o}`,
            items: ln(a[o], e, n)
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
        items: ln(a, e, n)
      }
    );
}
const hi = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function fi(e) {
  const n = Y(null), a = Y(null), t = Y(null), i = Y(null), o = Y(null), [d] = H(e.value), [r, h] = H(e.value.offset[0]), [u, f] = H(e.value.offset[1]), [m, p] = H(e.value.repeat[0]), [S, A] = H(e.value.repeat[1]);
  function F(R, I, T, Z, te) {
    if (e.onChange !== void 0) {
      const pe = e.prop !== void 0 ? e.prop : e.title;
      e.onChange(pe, {
        src: R,
        offset: [I, T],
        repeat: [Z, te]
      });
    }
  }
  function V(R) {
    const I = n.current.src, T = R.target.value;
    switch (R.target) {
      case a.current:
        h(T), F(I, T, u, m, S);
        break;
      case t.current:
        f(T), F(I, r, T, m, S);
        break;
      case i.current:
        p(T), F(I, r, u, T, S);
        break;
      case o.current:
        A(T), F(I, r, u, m, T);
        break;
    }
  }
  return /* @__PURE__ */ l.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ l.jsx("img", { alt: e.title, ref: n, onClick: () => {
      Qa().then((R) => {
        n.current.src = R, F(R, r, u, m, S);
      });
    }, src: d.src.length > 0 ? d.src : hi }),
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
            onChange: V
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: u,
            step: 0.01,
            onChange: V
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
            onChange: V
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: o,
            type: "number",
            value: S,
            step: 0.01,
            onChange: V
          }
        )
      ] })
    ] })
  ] });
}
function wt(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Da(e.value));
  const [a, t] = H(n), i = Y(null), o = (u) => {
    let f = u.target.value;
    e.type === "boolean" ? f = u.target.checked : e.type === "option" && (f = e.options[f].value), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  }, d = {};
  e.disabled && (d.opacity = 0.8);
  const r = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = r || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${h ? "block" : ""}`, style: d, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Ot(e.title) }, "fieldLabel"),
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
    e.type === "image" && /* @__PURE__ */ l.jsx(fi, { title: e.title, prop: e.prop, value: e.value, onChange: e.onChange }),
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: o, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((u, f) => /* @__PURE__ */ l.jsx("option", { value: u.value, children: Ot(u.title) }, f)) }) }),
    e.type === "vector2" && /* @__PURE__ */ l.jsx(qa, { value: a, min: 0, max: 1, onChange: o }),
    e.type === "grid3" && /* @__PURE__ */ l.jsx(cn, { value: a, onChange: o }),
    e.type === "grid4" && /* @__PURE__ */ l.jsx(Ka, { value: a, onChange: o }),
    e.type === "euler" && /* @__PURE__ */ l.jsx(cn, { value: a, onChange: o })
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
function mi(e, n) {
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
            r !== void 0 && (ee(r, i, o), r.updateProjectionMatrix());
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
            r !== void 0 && (ee(r, i, o), r.updateProjectionMatrix());
          }
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
function pi(e, n) {
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
      m !== void 0 && ee(m, r, u);
    }
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
function gi(e, n) {
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
          const r = new $t(d);
          n.updateObject(e.uuid, o, r);
          const h = n.getScene(e.uuid);
          if (h !== null) {
            const u = h.getObjectByProperty("uuid", e.uuid);
            u !== void 0 && ee(u, o, r);
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
            h !== void 0 && ee(h, o, d);
          }
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
function vi(e, n) {
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
  return /* @__PURE__ */ l.jsx(Ze, { title: "Animation", items: a });
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
let fe = { ...zn };
function bi(e) {
  const [n, a] = H(-1);
  Re(() => {
    function d(h) {
      fe = { ...h.value }, a(Date.now());
    }
    function r() {
      fe = { ...zn }, a(Date.now());
    }
    return D.addEventListener(P.SET_SCENE, r), D.addEventListener(P.SET_OBJECT, d), () => {
      D.removeEventListener(P.SET_SCENE, r), D.removeEventListener(P.SET_OBJECT, d);
    };
  }, []);
  const t = fe.type.toLowerCase(), i = fe.animations.length > 0 || fe.mixer !== void 0, o = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Wt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: fe.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        wt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: fe.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        wt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: fe.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        wt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: fe.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      pi(fe, e.three),
      i ? vi(fe, e.three) : null,
      t.search("camera") > -1 ? mi(fe, e.three) : null,
      t.search("light") > -1 ? gi(fe, e.three) : null,
      o ? di(fe, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Ui(e) {
  const [n] = H([]), [a, t] = H(0), i = (r) => {
    n.push(r.value), t(Date.now());
  }, o = (r) => {
    const h = r.value;
    for (let u = 0; u < n.length; u++)
      if (h.uuid === n[u].uuid) {
        n.splice(u, 1), t(Date.now());
        return;
      }
  };
  Re(() => (D.addEventListener(P.ADD_SCENE, i), D.addEventListener(P.REMOVE_SCENE, o), () => {
    D.removeEventListener(P.ADD_SCENE, i), D.removeEventListener(P.REMOVE_SCENE, o);
  }), []);
  const d = [];
  return n.forEach((r, h) => {
    d.push(
      /* @__PURE__ */ l.jsx(Wt, { label: `Scene: ${r.name}`, open: !0, children: /* @__PURE__ */ l.jsx(Ya, { child: r, scene: r, three: e.three }) }, `scene_${h}`)
    );
  }), /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    d,
    /* @__PURE__ */ l.jsx(bi, { three: e.three })
  ] }, `SidePanel ${a}`);
}
function $i(e) {
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
      m !== void 0 ? ee(m, h, u) : console.log(`Hermes - can't set object: ${r}`, f);
    }, i = (r) => {
      const h = r.value, { key: u, value: f, uuid: m } = h;
      t(m, u, f);
    }, o = (r) => {
      const h = r.value, f = n(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      f !== void 0 && Bn(h.value.src).then((m) => {
        m.offset.set(h.value.offset[0], h.value.offset[1]), m.repeat.set(h.value.repeat[0], h.value.repeat[1]);
        const p = h.key.split(".");
        switch (p.length) {
          case 1:
            f[p[0]] = m;
            break;
          case 2:
            f[p[0]][p[1]] = m;
            break;
          case 3:
            f[p[0]][p[1]][p[2]] = m;
            break;
          case 4:
            f[p[0]][p[1]][p[2]][p[3]] = m;
            break;
          case 5:
            f[p[0]][p[1]][p[2]][p[3]][p[4]] = m;
            break;
        }
        f.material.needsUpdate = !0;
      });
    }, d = (r) => {
      const { key: h, uuid: u, value: f, subitem: m } = r.value, S = n(u)?.getObjectByProperty("uuid", u);
      if (S !== void 0)
        try {
          m !== void 0 ? Na(S, m)[h](f) : S[h](f);
        } catch (A) {
          console.log("Error requesting method:"), console.log(A), console.log(h), console.log(f);
        }
    };
    return D.addEventListener(P.GET_OBJECT, a), D.addEventListener(P.UPDATE_OBJECT, i), D.addEventListener(P.CREATE_TEXTURE, o), D.addEventListener(P.REQUEST_METHOD, d), () => {
      D.removeEventListener(P.GET_OBJECT, a), D.removeEventListener(P.UPDATE_OBJECT, i), D.removeEventListener(P.CREATE_TEXTURE, o), D.removeEventListener(P.REQUEST_METHOD, d);
    };
  }, []), null;
}
class yi extends ca {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new Kt();
    i.setAttribute("position", new Xt(t, 3)), i.computeBoundingSphere();
    const o = new la({ fog: !1 });
    super(i, o), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const d = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new Kt();
    r.setAttribute("position", new Xt(d, 3)), r.computeBoundingSphere(), this.add(new An(r, new jn({ side: vn, fog: !1 })));
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
const hn = { type: "change" }, It = { type: "start" }, fn = { type: "end" }, Et = new ua(), mn = new da(), Ei = Math.cos(70 * ha.DEG2RAD);
class xi extends pn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: nt.ROTATE, MIDDLE: nt.DOLLY, RIGHT: nt.PAN }, this.touches = { ONE: at.ROTATE, TWO: at.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(c) {
      c.addEventListener("keydown", ot), this._domElementKeyEvents = c;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ot), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(hn), t.update(), o = i.NONE;
    }, this.update = function() {
      const c = new J(), E = new Zt().setFromUnitVectors(n.up, new J(0, 1, 0)), k = E.clone().invert(), B = new J(), ie = new Zt(), Ee = new J(), de = 2 * Math.PI;
      return function(vt = null) {
        const bt = t.object.position;
        c.copy(bt).sub(t.target), c.applyQuaternion(E), r.setFromVector3(c), t.autoRotate && o === i.NONE && be(_e(vt)), t.enableDamping ? (r.theta += h.theta * t.dampingFactor, r.phi += h.phi * t.dampingFactor) : (r.theta += h.theta, r.phi += h.phi);
        let xe = t.minAzimuthAngle, Se = t.maxAzimuthAngle;
        isFinite(xe) && isFinite(Se) && (xe < -Math.PI ? xe += de : xe > Math.PI && (xe -= de), Se < -Math.PI ? Se += de : Se > Math.PI && (Se -= de), xe <= Se ? r.theta = Math.max(xe, Math.min(Se, r.theta)) : r.theta = r.theta > (xe + Se) / 2 ? Math.max(xe, r.theta) : Math.min(Se, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Ve = !1;
        if (t.zoomToCursor && pe || t.object.isOrthographicCamera)
          r.radius = Ae(r.radius);
        else {
          const Oe = r.radius;
          r.radius = Ae(r.radius * u), Ve = Oe != r.radius;
        }
        if (c.setFromSpherical(r), c.applyQuaternion(k), bt.copy(t.target).add(c), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && pe) {
          let Oe = null;
          if (t.object.isPerspectiveCamera) {
            const ze = c.length();
            Oe = Ae(ze * u);
            const et = ze - Oe;
            t.object.position.addScaledVector(Z, et), t.object.updateMatrixWorld(), Ve = !!et;
          } else if (t.object.isOrthographicCamera) {
            const ze = new J(te.x, te.y, 0);
            ze.unproject(t.object);
            const et = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / u)), t.object.updateProjectionMatrix(), Ve = et !== t.object.zoom;
            const yt = new J(te.x, te.y, 0);
            yt.unproject(t.object), t.object.position.sub(yt).add(ze), t.object.updateMatrixWorld(), Oe = c.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Oe !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Oe).add(t.object.position) : (Et.origin.copy(t.object.position), Et.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Et.direction)) < Ei ? n.lookAt(t.target) : (mn.setFromNormalAndCoplanarPoint(t.object.up, t.target), Et.intersectPlane(mn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Oe = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / u)), Oe !== t.object.zoom && (t.object.updateProjectionMatrix(), Ve = !0);
        }
        return u = 1, pe = !1, Ve || B.distanceToSquared(t.object.position) > d || 8 * (1 - ie.dot(t.object.quaternion)) > d || Ee.distanceToSquared(t.target) > d ? (t.dispatchEvent(hn), B.copy(t.object.position), ie.copy(t.object.quaternion), Ee.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Qe), t.domElement.removeEventListener("pointerdown", _), t.domElement.removeEventListener("pointercancel", K), t.domElement.removeEventListener("wheel", ft), t.domElement.removeEventListener("pointermove", z), t.domElement.removeEventListener("pointerup", K), t.domElement.getRootNode().removeEventListener("keydown", st, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ot), t._domElementKeyEvents = null);
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
    const d = 1e-6, r = new Jt(), h = new Jt();
    let u = 1;
    const f = new J(), m = new me(), p = new me(), S = new me(), A = new me(), F = new me(), V = new me(), R = new me(), I = new me(), T = new me(), Z = new J(), te = new me();
    let pe = !1;
    const q = [], ge = {};
    let ce = !1;
    function _e(c) {
      return c !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * c : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function ke(c) {
      const E = Math.abs(c * 0.01);
      return Math.pow(0.95, t.zoomSpeed * E);
    }
    function be(c) {
      h.theta -= c;
    }
    function U(c) {
      h.phi -= c;
    }
    const ye = function() {
      const c = new J();
      return function(k, B) {
        c.setFromMatrixColumn(B, 0), c.multiplyScalar(-k), f.add(c);
      };
    }(), O = function() {
      const c = new J();
      return function(k, B) {
        t.screenSpacePanning === !0 ? c.setFromMatrixColumn(B, 1) : (c.setFromMatrixColumn(B, 0), c.crossVectors(t.object.up, c)), c.multiplyScalar(k), f.add(c);
      };
    }(), we = function() {
      const c = new J();
      return function(k, B) {
        const ie = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const Ee = t.object.position;
          c.copy(Ee).sub(t.target);
          let de = c.length();
          de *= Math.tan(t.object.fov / 2 * Math.PI / 180), ye(2 * k * de / ie.clientHeight, t.object.matrix), O(2 * B * de / ie.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (ye(k * (t.object.right - t.object.left) / t.object.zoom / ie.clientWidth, t.object.matrix), O(B * (t.object.top - t.object.bottom) / t.object.zoom / ie.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function De(c) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? u /= c : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function je(c) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? u *= c : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Pe(c, E) {
      if (!t.zoomToCursor)
        return;
      pe = !0;
      const k = t.domElement.getBoundingClientRect(), B = c - k.left, ie = E - k.top, Ee = k.width, de = k.height;
      te.x = B / Ee * 2 - 1, te.y = -(ie / de) * 2 + 1, Z.set(te.x, te.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Ae(c) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, c));
    }
    function Ie(c) {
      m.set(c.clientX, c.clientY);
    }
    function Be(c) {
      Pe(c.clientX, c.clientX), R.set(c.clientX, c.clientY);
    }
    function Fe(c) {
      A.set(c.clientX, c.clientY);
    }
    function re(c) {
      p.set(c.clientX, c.clientY), S.subVectors(p, m).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      be(2 * Math.PI * S.x / E.clientHeight), U(2 * Math.PI * S.y / E.clientHeight), m.copy(p), t.update();
    }
    function Me(c) {
      I.set(c.clientX, c.clientY), T.subVectors(I, R), T.y > 0 ? De(ke(T.y)) : T.y < 0 && je(ke(T.y)), R.copy(I), t.update();
    }
    function He(c) {
      F.set(c.clientX, c.clientY), V.subVectors(F, A).multiplyScalar(t.panSpeed), we(V.x, V.y), A.copy(F), t.update();
    }
    function Ye(c) {
      Pe(c.clientX, c.clientY), c.deltaY < 0 ? je(ke(c.deltaY)) : c.deltaY > 0 && De(ke(c.deltaY)), t.update();
    }
    function ue(c) {
      let E = !1;
      switch (c.code) {
        case t.keys.UP:
          c.ctrlKey || c.metaKey || c.shiftKey ? U(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, t.keyPanSpeed), E = !0;
          break;
        case t.keys.BOTTOM:
          c.ctrlKey || c.metaKey || c.shiftKey ? U(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(0, -t.keyPanSpeed), E = !0;
          break;
        case t.keys.LEFT:
          c.ctrlKey || c.metaKey || c.shiftKey ? be(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(t.keyPanSpeed, 0), E = !0;
          break;
        case t.keys.RIGHT:
          c.ctrlKey || c.metaKey || c.shiftKey ? be(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : we(-t.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (c.preventDefault(), t.update());
    }
    function v(c) {
      if (q.length === 1)
        m.set(c.pageX, c.pageY);
      else {
        const E = $e(c), k = 0.5 * (c.pageX + E.x), B = 0.5 * (c.pageY + E.y);
        m.set(k, B);
      }
    }
    function b(c) {
      if (q.length === 1)
        A.set(c.pageX, c.pageY);
      else {
        const E = $e(c), k = 0.5 * (c.pageX + E.x), B = 0.5 * (c.pageY + E.y);
        A.set(k, B);
      }
    }
    function M(c) {
      const E = $e(c), k = c.pageX - E.x, B = c.pageY - E.y, ie = Math.sqrt(k * k + B * B);
      R.set(0, ie);
    }
    function N(c) {
      t.enableZoom && M(c), t.enablePan && b(c);
    }
    function ve(c) {
      t.enableZoom && M(c), t.enableRotate && v(c);
    }
    function le(c) {
      if (q.length == 1)
        p.set(c.pageX, c.pageY);
      else {
        const k = $e(c), B = 0.5 * (c.pageX + k.x), ie = 0.5 * (c.pageY + k.y);
        p.set(B, ie);
      }
      S.subVectors(p, m).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      be(2 * Math.PI * S.x / E.clientHeight), U(2 * Math.PI * S.y / E.clientHeight), m.copy(p);
    }
    function C(c) {
      if (q.length === 1)
        F.set(c.pageX, c.pageY);
      else {
        const E = $e(c), k = 0.5 * (c.pageX + E.x), B = 0.5 * (c.pageY + E.y);
        F.set(k, B);
      }
      V.subVectors(F, A).multiplyScalar(t.panSpeed), we(V.x, V.y), A.copy(F);
    }
    function x(c) {
      const E = $e(c), k = c.pageX - E.x, B = c.pageY - E.y, ie = Math.sqrt(k * k + B * B);
      I.set(0, ie), T.set(0, Math.pow(I.y / R.y, t.zoomSpeed)), De(T.y), R.copy(I);
      const Ee = (c.pageX + E.x) * 0.5, de = (c.pageY + E.y) * 0.5;
      Pe(Ee, de);
    }
    function G(c) {
      t.enableZoom && x(c), t.enablePan && C(c);
    }
    function ne(c) {
      t.enableZoom && x(c), t.enableRotate && le(c);
    }
    function _(c) {
      t.enabled !== !1 && (q.length === 0 && (t.domElement.setPointerCapture(c.pointerId), t.domElement.addEventListener("pointermove", z), t.domElement.addEventListener("pointerup", K)), !Pt(c) && (kt(c), c.pointerType === "touch" ? ct(c) : Ne(c)));
    }
    function z(c) {
      t.enabled !== !1 && (c.pointerType === "touch" ? pt(c) : Je(c));
    }
    function K(c) {
      switch (Dt(c), q.length) {
        case 0:
          t.domElement.releasePointerCapture(c.pointerId), t.domElement.removeEventListener("pointermove", z), t.domElement.removeEventListener("pointerup", K), t.dispatchEvent(fn), o = i.NONE;
          break;
        case 1:
          const E = q[0], k = ge[E];
          ct({ pointerId: E, pageX: k.x, pageY: k.y });
          break;
      }
    }
    function Ne(c) {
      let E;
      switch (c.button) {
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
          Be(c), o = i.DOLLY;
          break;
        case nt.ROTATE:
          if (c.ctrlKey || c.metaKey || c.shiftKey) {
            if (t.enablePan === !1)
              return;
            Fe(c), o = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            Ie(c), o = i.ROTATE;
          }
          break;
        case nt.PAN:
          if (c.ctrlKey || c.metaKey || c.shiftKey) {
            if (t.enableRotate === !1)
              return;
            Ie(c), o = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            Fe(c), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(It);
    }
    function Je(c) {
      switch (o) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          re(c);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          Me(c);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          He(c);
          break;
      }
    }
    function ft(c) {
      t.enabled === !1 || t.enableZoom === !1 || o !== i.NONE || (c.preventDefault(), t.dispatchEvent(It), Ye(mt(c)), t.dispatchEvent(fn));
    }
    function mt(c) {
      const E = c.deltaMode, k = {
        clientX: c.clientX,
        clientY: c.clientY,
        deltaY: c.deltaY
      };
      switch (E) {
        case 1:
          k.deltaY *= 16;
          break;
        case 2:
          k.deltaY *= 100;
          break;
      }
      return c.ctrlKey && !ce && (k.deltaY *= 10), k;
    }
    function st(c) {
      c.key === "Control" && (ce = !0, t.domElement.getRootNode().addEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function Ue(c) {
      c.key === "Control" && (ce = !1, t.domElement.getRootNode().removeEventListener("keyup", Ue, { passive: !0, capture: !0 }));
    }
    function ot(c) {
      t.enabled === !1 || t.enablePan === !1 || ue(c);
    }
    function ct(c) {
      switch (gt(c), q.length) {
        case 1:
          switch (t.touches.ONE) {
            case at.ROTATE:
              if (t.enableRotate === !1)
                return;
              v(c), o = i.TOUCH_ROTATE;
              break;
            case at.PAN:
              if (t.enablePan === !1)
                return;
              b(c), o = i.TOUCH_PAN;
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
              N(c), o = i.TOUCH_DOLLY_PAN;
              break;
            case at.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              ve(c), o = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = i.NONE;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(It);
    }
    function pt(c) {
      switch (gt(c), o) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          le(c), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          C(c), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          G(c), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          ne(c), t.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function Qe(c) {
      t.enabled !== !1 && c.preventDefault();
    }
    function kt(c) {
      q.push(c.pointerId);
    }
    function Dt(c) {
      delete ge[c.pointerId];
      for (let E = 0; E < q.length; E++)
        if (q[E] == c.pointerId) {
          q.splice(E, 1);
          return;
        }
    }
    function Pt(c) {
      for (let E = 0; E < q.length; E++)
        if (q[E] == c.pointerId)
          return !0;
      return !1;
    }
    function gt(c) {
      let E = ge[c.pointerId];
      E === void 0 && (E = new me(), ge[c.pointerId] = E), E.set(c.pageX, c.pageY);
    }
    function $e(c) {
      const E = c.pointerId === q[0] ? q[1] : q[0];
      return ge[E];
    }
    t.domElement.addEventListener("contextmenu", Qe), t.domElement.addEventListener("pointerdown", _), t.domElement.addEventListener("pointercancel", K), t.domElement.addEventListener("wheel", ft, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", st, { passive: !0, capture: !0 }), this.update();
  }
}
function rt(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const Mt = (e) => {
  const [n, a] = H(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (o) => {
    o !== n && (e.onSelect(o), a(o)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((o) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, qe = Ra(function(n, a) {
  const [t, i] = H(!1), o = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      t && i(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Mt,
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
class Si extends In {
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
class Ci extends An {
  gridMaterial;
  constructor() {
    const n = new Si();
    super(new ma(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
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
}`, Mi = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Oi extends In {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: wi,
      fragmentShader: Mi
    });
  }
}
let xt = "Renderer", Te, St = !1, Nt = !1, X = null, oe = null, Ge = null, We = null;
function zi(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", o = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", d = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", r = se(() => /* @__PURE__ */ new Map(), []), h = se(() => /* @__PURE__ */ new Map(), []), u = se(() => /* @__PURE__ */ new Map(), []), f = se(() => /* @__PURE__ */ new Map(), []), m = se(() => new pa(), []), p = se(() => new ga(), []), S = se(() => new Ci(), []), A = se(() => new Qt(500), []), F = se(() => new Qt(100), []), V = se(() => new va(), []), R = se(() => new ba(), []), I = se(() => new Oi(), []), T = se(() => new jn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function Z(v, b) {
    const M = new en(-100, 100, 100, -100, 50, 5e3);
    return M.name = v, M.position.copy(b), M.lookAt(0, 0, 0), r.set(v, M), M;
  }
  const te = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], pe = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], q = Y(null), ge = Y(null), ce = Y(null), _e = Y(null), ke = Y(null), be = Y(null), [U, ye] = H(a !== null ? a : "Single"), [O, we] = H(null), [De, je] = H(!1), [Pe, Ae] = H(!1), [Ie, Be] = H(!1), [, Fe] = H(Date.now());
  localStorage.setItem(`${n}_mode`, U), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, o), localStorage.setItem(`${n}_brCam`, d);
  const re = (v, b) => {
    const M = h.get(v.name);
    if (M !== void 0 && M.dispose(), h.delete(v.name), v.name === "UI")
      return;
    const N = new xi(v, b);
    switch (N.enableDamping = !0, N.dampingFactor = 0.05, v.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        N.enableRotate = !1;
        break;
    }
    h.set(v.name, N);
  }, Me = (v) => {
    const b = u.get(v.name);
    b !== void 0 && (m.remove(b), b.dispose(), u.delete(v.name));
    const M = h.get(v.name);
    M !== void 0 && (M.dispose(), h.delete(v.name));
  }, He = () => {
    h.forEach((v, b) => {
      v.dispose();
      const M = u.get(b);
      M !== void 0 && (m.remove(M), M.dispose()), u.delete(b), h.delete(b);
    }), h.clear(), u.clear();
  }, Ye = () => {
    switch (U) {
      case "Single":
        re(X, ce.current);
        break;
      case "Side by Side":
      case "Stacked":
        re(X, ce.current), re(oe, _e.current);
        break;
      case "Quad":
        re(X, ce.current), re(oe, _e.current), re(Ge, ke.current), re(We, be.current);
        break;
    }
  };
  Re(() => {
    const v = new ya({
      canvas: q.current,
      stencil: !1
    });
    v.autoClear = !1, v.shadowMap.enabled = !0, v.setPixelRatio(devicePixelRatio), v.setClearColor(0), e.three.renderer = v, we(v);
  }, []), Re(() => {
    m.name = "Debug Scene", m.uuid = "", p.name = "helpers", m.add(p), p.add(S), A.name = "axisHelper", p.add(A), F.name = "interactionHelper", p.add(F), F.visible = !1, Z("Top", new J(0, 1e3, 0)), Z("Bottom", new J(0, -1e3, 0)), Z("Left", new J(-1e3, 0, 0)), Z("Right", new J(1e3, 0, 0)), Z("Front", new J(0, 0, 1e3)), Z("Back", new J(0, 0, -1e3)), Z("Orthographic", new J(1e3, 1e3, 1e3)), Z("UI", new J());
    const v = new At(60, 1, 50, 5e3);
    v.name = "Debug", v.position.set(500, 500, 500), v.lookAt(0, 0, 0), r.set("Debug", v), X = r.get(localStorage.getItem(`${n}_tlCam`)), oe = r.get(localStorage.getItem(`${n}_trCam`)), Ge = r.get(localStorage.getItem(`${n}_blCam`)), We = r.get(localStorage.getItem(`${n}_brCam`));
  }, []), Re(() => {
    const v = () => {
      f.forEach((C) => {
        p.remove(C), C.dispose();
      }), f.clear();
    }, b = () => {
      Te.traverse((C) => {
        if (C.type.search("Light") > -1) {
          let x;
          switch (C.type) {
            case "DirectionalLight":
              x = new Ma(C, 100), x.name = `${C.name}Helper`, f.set(C.name, x), p.add(x);
              break;
            case "HemisphereLight":
              x = new wa(C, 250), x.name = `${C.name}Helper`, f.set(C.name, x), p.add(x);
              break;
            case "RectAreaLight":
              x = new yi(C), x.name = `${C.name}Helper`, f.set(C.name, x), p.add(x);
              break;
            case "PointLight":
              x = new Ca(C, 100), x.name = `${C.name}Helper`, f.set(C.name, x), p.add(x);
              break;
            case "SpotLight":
              x = new Sa(C), x.name = `${C.name}Helper`, f.set(C.name, x), p.add(x);
              break;
          }
        }
      });
    }, M = (C) => {
      p.add(A), v(), Tt(Te), m.remove(Te);
      const x = e.scenes.get(C.value.name);
      if (x !== void 0) {
        const G = new x();
        e.onSceneSet !== void 0 && e.onSceneSet(G), Te = G, e.three.scene = Te, m.add(Te), Nt = !0, b();
      }
    }, N = (C) => {
      const x = C.value, G = e.three.scene?.getObjectByProperty("uuid", x.uuid);
      if (G !== void 0 && r.set(x.name, G), G instanceof At) {
        const ne = new xa(G);
        u.set(G.name, ne), m.add(ne);
      }
      Fe(Date.now());
    }, ve = (C) => {
      const x = u.get(C.value.name);
      x !== void 0 && (m.remove(x), x.dispose()), r.delete(C.value.name), Fe(Date.now());
    }, le = (C) => {
      const x = Te.getObjectByProperty("uuid", C.value.uuid);
      x && x.add(A);
    };
    return D.addEventListener(P.SET_SCENE, M), D.addEventListener(P.ADD_CAMERA, N), D.addEventListener(P.REMOVE_CAMERA, ve), D.addEventListener(P.SET_OBJECT, le), () => {
      D.removeEventListener(P.SET_SCENE, M), D.removeEventListener(P.ADD_CAMERA, N), D.removeEventListener(P.REMOVE_CAMERA, ve), D.removeEventListener(P.SET_OBJECT, le);
    };
  }, []), Re(() => {
    if (O === null)
      return;
    let v = window.innerWidth, b = window.innerHeight, M = Math.floor(v / 2), N = Math.floor(b / 2), ve = -1;
    const le = () => {
      v = window.innerWidth - 300, b = window.innerHeight, M = Math.floor(v / 2), N = Math.floor(b / 2), e.three.resize(v, b), e.onSceneResize !== void 0 && Nt && e.onSceneResize(Te, v, b);
      let _ = v, z = b;
      switch (U) {
        case "Side by Side":
          _ = M, z = b;
          break;
        case "Stacked":
          _ = v, z = N;
          break;
        case "Quad":
          _ = M, z = N;
          break;
      }
      r.forEach((K) => {
        K instanceof en ? (K.left = _ / -2, K.right = _ / 2, K.top = z / 2, K.bottom = z / -2, K.name === "UI" && (K.position.x = v / 2, K.position.y = b / -2, K.position.z = 100), K.updateProjectionMatrix()) : K instanceof At && (K.aspect = _ / z, K.updateProjectionMatrix(), u.get(K.name)?.update());
      });
    }, C = () => {
      O.setViewport(0, 0, v, b), O.setScissor(0, 0, v, b), O.render(m, X);
    }, x = () => {
      if (U === "Side by Side")
        O.setViewport(0, 0, M, b), O.setScissor(0, 0, M, b), O.render(m, X), O.setViewport(M, 0, M, b), O.setScissor(M, 0, M, b), O.render(m, oe);
      else {
        const _ = b - N;
        O.setViewport(0, _, v, N), O.setScissor(0, _, v, N), O.render(m, X), O.setViewport(0, 0, v, N), O.setScissor(0, 0, v, N), O.render(m, oe);
      }
    }, G = () => {
      let _ = 0, z = 0;
      z = b - N, _ = 0, O.setViewport(_, z, M, N), O.setScissor(_, z, M, N), O.render(m, X), _ = M, O.setViewport(_, z, M, N), O.setScissor(_, z, M, N), O.render(m, oe), z = 0, _ = 0, O.setViewport(_, z, M, N), O.setScissor(_, z, M, N), O.render(m, Ge), _ = M, O.setViewport(_, z, M, N), O.setScissor(_, z, M, N), O.render(m, We);
    }, ne = () => {
      switch (h.forEach((_) => {
        _.update();
      }), u.forEach((_) => {
        _.update();
      }), f.forEach((_) => {
        _.update !== void 0 && _.update();
      }), e.onSceneUpdate !== void 0 && Nt && e.onSceneUpdate(Te), O.clear(), U) {
        case "Single":
          C();
          break;
        case "Side by Side":
        case "Stacked":
          x();
          break;
        case "Quad":
          G();
          break;
      }
      ve = requestAnimationFrame(ne);
    };
    return Ye(), window.addEventListener("resize", le), le(), ne(), () => {
      window.removeEventListener("resize", le), cancelAnimationFrame(ve), ve = -1;
    };
  }, [U, O]), Re(() => {
    if (O !== null) {
      const v = new Ea(), b = new me(), M = (C, x, G, ne) => {
        switch (U) {
          case "Quad":
            C < G ? x < ne ? v.setFromCamera(b, X) : v.setFromCamera(b, Ge) : x < ne ? v.setFromCamera(b, oe) : v.setFromCamera(b, We);
            break;
          case "Side by Side":
            C < G ? v.setFromCamera(b, X) : v.setFromCamera(b, oe);
            break;
          case "Single":
            v.setFromCamera(b, X);
            break;
          case "Stacked":
            x < ne ? v.setFromCamera(b, X) : v.setFromCamera(b, oe);
            break;
        }
      }, N = (C) => {
        if (!St)
          return;
        const x = new me();
        O.getSize(x);
        const G = Math.min(C.clientX, x.x), ne = Math.min(C.clientY, x.y);
        b.x = rt(G, 0, x.x, -1, 1), b.y = rt(ne, 0, x.y, 1, -1);
        const _ = x.x / 2, z = x.y / 2, K = () => {
          G < _ ? b.x = rt(G, 0, _, -1, 1) : b.x = rt(G, _, x.x, -1, 1);
        }, Ne = () => {
          ne < z ? b.y = rt(ne, 0, z, 1, -1) : b.y = rt(ne, z, x.y, 1, -1);
        };
        switch (U) {
          case "Quad":
            K(), Ne();
            break;
          case "Side by Side":
            K();
            break;
          case "Stacked":
            Ne(), Ne();
            break;
        }
        M(G, ne, _, z);
        const Je = v.intersectObjects(Te.children);
        Je.length > 0 && F.position.copy(Je[0].point);
      }, ve = (C) => {
        if (!St)
          return;
        const x = new me();
        if (O.getSize(x), C.clientX >= x.x)
          return;
        N(C);
        const G = v.intersectObjects(Te.children);
        G.length > 0 && e.three.getObject(G[0].object.uuid);
      }, le = ge.current;
      return le.addEventListener("mousemove", N, !1), le.addEventListener("click", ve, !1), () => {
        le.removeEventListener("mousemove", N), le.removeEventListener("click", ve);
      };
    }
  }, [U, O]);
  const ue = [];
  return r.forEach((v, b) => {
    ue.push(b);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: q }),
    O !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${U === "Single" || U === "Stacked" ? "single" : ""}`, ref: ge, children: [
        U === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(qe, { camera: X, options: ue, ref: ce, onSelect: (v) => {
          h.get(X.name)?.dispose();
          const b = r.get(v);
          b !== void 0 && (Me(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), re(b, ce.current));
        } }) }),
        (U === "Side by Side" || U === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(qe, { camera: X, options: ue, ref: ce, onSelect: (v) => {
            h.get(X.name)?.dispose();
            const b = r.get(v);
            b !== void 0 && (Me(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), re(b, ce.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: oe, options: ue, ref: _e, onSelect: (v) => {
            h.get(oe.name)?.dispose();
            const b = r.get(v);
            b !== void 0 && (Me(oe), oe = b, localStorage.setItem(`${n}_trCam`, b.name), re(b, _e.current));
          } })
        ] }),
        U === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(qe, { camera: X, options: ue, ref: ce, onSelect: (v) => {
            h.get(X.name)?.dispose();
            const b = r.get(v);
            b !== void 0 && (Me(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), re(b, ce.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: oe, options: ue, ref: _e, onSelect: (v) => {
            h.get(oe.name)?.dispose();
            const b = r.get(v);
            b !== void 0 && (Me(oe), oe = b, localStorage.setItem(`${n}_trCam`, b.name), re(b, _e.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: Ge, options: ue, ref: ke, onSelect: (v) => {
            h.get(Ge.name)?.dispose();
            const b = r.get(v);
            b !== void 0 && (Me(Ge), Ge = b, localStorage.setItem(`${n}_blCam`, b.name), re(b, ke.current));
          } }),
          /* @__PURE__ */ l.jsx(qe, { camera: We, options: ue, ref: be, onSelect: (v) => {
            h.get(We.name)?.dispose();
            const b = r.get(v);
            b !== void 0 && (Me(We), We = b, localStorage.setItem(`${n}_brCam`, b.name), re(b, be.current));
          } })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          Mt,
          {
            index: pe.indexOf(U),
            options: pe,
            onSelect: (v) => {
              v !== U && (He(), ye(v));
            },
            open: De,
            onToggle: (v) => {
              je(v), Pe && Ae(!1), Ie && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Mt,
          {
            index: te.indexOf(xt),
            options: te,
            onSelect: (v) => {
              if (v !== xt)
                switch (xt = v, xt) {
                  case "Depth":
                    m.overrideMaterial = V;
                    break;
                  case "Normals":
                    m.overrideMaterial = R;
                    break;
                  default:
                  case "Renderer":
                    m.overrideMaterial = null;
                    break;
                  case "Wireframe":
                    m.overrideMaterial = T;
                    break;
                  case "UVs":
                    m.overrideMaterial = I;
                    break;
                }
            },
            open: Pe,
            onToggle: (v) => {
              De && je(!1), Ae(v), Ie && Be(!1);
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
            onSelect: (v) => {
              St = v === "Selection Mode", F.visible = St;
            },
            open: Ie,
            onToggle: (v) => {
              De && je(!1), Pe && Ae(!1), Be(v);
            }
          }
        )
      ] })
    ] })
  ] });
}
function Gi(e) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  Wt as Accordion,
  ji as Application,
  Rt as BaseRemote,
  Un as ChildObject,
  Ya as ContainerObject,
  Ga as Draggable,
  za as DraggableItem,
  Wa as Dropdown,
  Ha as DropdownItem,
  Gi as Editor,
  bi as Inspector,
  zi as MultiView,
  Fn as NavButton,
  Ii as RemoteComponents,
  Fi as RemoteController,
  Gt as RemoteTheatre,
  Li as RemoteThree,
  Bi as RemoteTweakpane,
  $i as SceneInspector,
  Ui as SidePanel,
  P as ToolEvents,
  Ot as capitalize,
  Ke as clamp,
  Da as colorToHex,
  D as debugDispatcher,
  Di as defaultTheatreCallback,
  Tt as dispose,
  Pa as disposeMaterial,
  Ai as disposeTexture,
  Pi as distance,
  Bt as hierarchyUUID,
  ka as isColor,
  nn as mix,
  zt as noop,
  tn as normalize,
  _a as randomID,
  rn as resetThreeObjects,
  an as round,
  Ni as theatreEditorApp,
  Lt as totalThreeObjects
};
