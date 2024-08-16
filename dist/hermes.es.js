import { OrthographicCamera as Ut, Scene as Cn, MeshBasicMaterial as Yt, BufferGeometry as $t, Float32BufferAttribute as gt, Mesh as Vt, LinearSRGBColorSpace as en, EventDispatcher as wn, Texture as Zn, RepeatWrapping as tn, WebGLRenderTarget as Jn, Color as qt, FrontSide as Qn, BackSide as Mn, DoubleSide as On, NoBlending as ea, NormalBlending as ta, AdditiveBlending as na, SubtractiveBlending as aa, MultiplyBlending as ia, CustomBlending as ra, AddEquation as sa, SubtractEquation as oa, ReverseSubtractEquation as ca, MinEquation as la, MaxEquation as da, ZeroFactor as Rn, OneFactor as Tn, SrcColorFactor as _n, OneMinusSrcColorFactor as kn, SrcAlphaFactor as Dn, OneMinusSrcAlphaFactor as An, DstAlphaFactor as Pn, OneMinusDstAlphaFactor as In, DstColorFactor as jn, OneMinusDstColorFactor as Nn, SrcAlphaSaturateFactor as ua, ConstantColorFactor as Ln, OneMinusConstantColorFactor as Bn, ConstantAlphaFactor as Fn, OneMinusConstantAlphaFactor as Un, Matrix4 as ha, Vector3 as J, Euler as fa, Line as ma, LineBasicMaterial as pa, Ray as ga, Plane as va, MathUtils as ba, MOUSE as tt, TOUCH as nt, Quaternion as nn, Spherical as an, Vector2 as be, ShaderMaterial as $n, GLSL3 as ya, PlaneGeometry as Ea, Group as xa, AxesHelper as rn, MeshDepthMaterial as Sa, MeshNormalMaterial as Ca, WebGLRenderer as wa, PerspectiveCamera as Nt, Raycaster as Ma, CameraHelper as Oa, SpotLightHelper as Ra, PointLightHelper as Ta, HemisphereLightHelper as _a, DirectionalLightHelper as ka } from "three";
import { Pane as Da } from "tweakpane";
import * as Aa from "@tweakpane/plugin-essentials";
import zn, { useState as U, useRef as X, useEffect as Ae, useMemo as oe, forwardRef as Pa } from "react";
import { Reorder as Gn } from "framer-motion";
const Kt = () => {
}, Ii = () => {
};
function Rt(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Ke(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function sn(e, n, a) {
  return (a - e) / (n - e);
}
function on(e, n, a) {
  return e * (1 - a) + n * a;
}
function ji(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function Ia() {
  return Math.round(Math.random() * 1e6).toString();
}
function ja(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function Na(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), i = (h) => {
    const u = h.toString(16);
    return u.length === 1 ? "0" + u : u;
  }, o = i(n), l = i(a), s = i(t);
  return "#" + o + l + s;
}
function cn(e, n = 1) {
  return Number(e.toFixed(n));
}
let zt = 0;
const ln = () => {
  zt = 0;
}, Gt = (e) => {
  if (!e)
    return;
  let n = e.name.replaceAll(" ", "").replaceAll("/", ".");
  if (n.length === 0 && (n = `obj_${zt}`, zt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.isMesh !== void 0) {
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
  e.children.forEach((a) => Gt(a));
}, Ni = (e) => {
  e?.dispose();
}, La = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, Tt = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : Tt(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), La(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
class Mt {
  static renderer;
  static canvas;
  static context = null;
  static scene = null;
  static camera = null;
  static material = null;
  static inited = !1;
  static width = 100;
  static height = 100;
  static init() {
    this.inited || (this.canvas = document.createElement("canvas"), this.canvas.width = this.width, this.canvas.height = this.height, this.context = this.canvas.getContext("2d"), this.inited = !0);
  }
  static renderToBlob(n) {
    this.init();
    const a = n.repeat.clone(), t = n.offset.clone();
    if (n.repeat.set(1, 1), n.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const i = n.image;
      if (i != null && i.width > 0) {
        this.canvas.title = n.sourceFile;
        const o = this.canvas.width / i.width, l = this.renderToCanvas(n);
        this.context.drawImage(l, 0, 0, i.width * o, i.height * o);
      }
    }
    return n.repeat.copy(a), n.offset.copy(t), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(n) {
    if (this.material === null) {
      this.camera = new Ut(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Cn(), this.material = new Yt();
      const a = new $t();
      a.setAttribute("position", new gt([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), a.setAttribute("normal", new gt([0, 0, 1, 0, 0, 1], 3)), a.setAttribute("uv", new gt([0, 0, 2, 0, 0, 2], 2));
      const t = new Vt(a, this.material);
      this.scene.add(t);
    }
    if (n.isRenderTargetTexture)
      this.material.map = n, this.renderer.render(this.scene, this.camera);
    else {
      const a = this.renderer.outputColorSpace, t = n.colorSpace;
      this.renderer.outputColorSpace = en, n.colorSpace = en, this.material.map = n, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = a, n.colorSpace = t;
    }
    return this.renderer.domElement;
  }
}
class Li {
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
const k = new wn(), D = {
  CUSTOM: "ToolEvents::custom",
  // Components
  SELECT_DROPDOWN: "ToolEvents::selectDropdown",
  DRAG_UPDATE: "ToolEvents::dragUpdate",
  // SceneHierarchy
  ADD_SCENE: "ToolEvents::addScene",
  REFRESH_SCENE: "ToolEvents::refreshScene",
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
class Dt {
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
class Bi extends Dt {
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
        k.dispatchEvent({ type: D.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        k.dispatchEvent({ type: D.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Xt extends Dt {
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
    const l = this.sheet(n, o);
    if (l === void 0)
      return;
    const h = `${this.getSheetInstance(n, o)}_${a}`;
    let u = this.sheetObjects.get(h);
    u !== void 0 ? u = l.object(a, { ...t, ...u.value }, { reconfigure: !0 }) : u = l.object(a, t), this.sheetObjects.set(h, u), this.sheetObjectCBs.set(h, i !== void 0 ? i : Kt);
    const f = u.onValuesChange((v) => {
      if (this.app.editor) {
        for (const x in v) {
          const A = v[x];
          typeof A == "object" && ja(A) && (v[x] = {
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
            values: v
          }
        });
      }
      const b = this.sheetObjectCBs.get(h);
      b !== void 0 && b(v);
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
    const o = `${a}_${t}`, l = this.sheetObjectUnsubscribe.get(o);
    l !== void 0 && (this.sheetObjects.delete(o), this.sheetObjectCBs.delete(o), this.sheetObjectUnsubscribe.delete(o), l());
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
      this.studio?.ui.restore(), this.studio?.onSelectionChange((l) => {
        l.length < 1 || l.forEach((s) => {
          let h = s.address.sheetId, u = "setSheet", f = {};
          switch (s.type) {
            case "Theatre_Sheet_PublicAPI":
              u = "setSheet", f = {
                sheet: s.address.sheetId
              }, a.activeSheet = a.sheets.get(s.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              u = "setSheetObject", h += `_${s.address.objectKey}`, f = {
                id: h,
                sheet: s.address.sheetId,
                key: s.address.objectKey
              }, a.activeSheet = a.sheets.get(s.address.sheetId);
              break;
          }
          n.send({ event: u, target: "app", data: f });
        });
      });
      let t = -1;
      const i = () => {
        if (Xt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
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
      }, o = () => {
        i(), requestAnimationFrame(o);
      };
      i(), o();
    } else
      this.studio?.ui.hide();
  }
}
function Fi(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((l) => {
      l.length < 1 || l.forEach((s) => {
        let h = s.address.sheetId, u = "setSheet", f = {};
        switch (s.type) {
          case "Theatre_Sheet_PublicAPI":
            u = "setSheet", f = {
              sheet: s.address.sheetId
            }, n.activeSheet = n.sheets.get(s.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            u = "setSheetObject", h += `_${s.address.objectKey}`, f = {
              id: h,
              sheet: s.address.sheetId,
              key: s.address.objectKey
            }, n.activeSheet = n.sheets.get(s.address.sheetId);
            break;
        }
        e.send({ event: u, target: "app", data: f });
      });
    });
    let t = -1;
    const i = () => {
      if (Xt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
    }, o = () => {
      i(), requestAnimationFrame(o);
    };
    i(), o();
  } else
    a.ui.hide();
}
function Ba(e) {
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
function st(e) {
  const n = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((a) => {
    n.children.push(st(a));
  }), n;
}
function Fa(e) {
  const n = {};
  for (const a in e) {
    const t = e[a].value;
    n[a] = { value: t }, t === null ? n[a].value = {
      src: "",
      offset: [0, 0],
      repeat: [1, 1]
    } : t !== void 0 && t.isTexture && (n[a].value = {
      src: t.image.src,
      offset: [t.offset.x, t.offset.y],
      repeat: [t.repeat.x, t.repeat.y]
    });
  }
  return n;
}
function Ua(e) {
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
function at(e) {
  const n = {};
  for (const a in e) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Ua(a))
      continue;
    const t = typeof e[a], i = e[a];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        n[a] = i;
        break;
      case "object":
        i !== null ? (n[a] = i, i.isTexture ? n[a] = {
          src: Mt.renderToBlob(i),
          offset: [i.offset.x, i.offset.y],
          repeat: [i.repeat.x, i.repeat.y]
        } : a === "uniforms" && (n[a] = Fa(n[a]))) : n[a] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return n;
}
function Lt(e) {
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
        i.push(at(o));
      }), n.material = i;
    } else
      n.material = at(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((o) => {
        i.push(at(o));
      }), n.material = i;
    } else
      n.material = at(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((o) => {
        i.push(at(o));
      }), n.material = i;
    } else
      n.material = at(t.material);
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
function $a(e, n) {
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
function za(e, n) {
  for (const a in n)
    e[a] = n[a];
}
function ee(e, n, a) {
  if (e === void 0)
    return;
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
    l != null && za(l, a);
  }
}
function Wn(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const i = new Zn(t);
      i.wrapS = tn, i.wrapT = tn, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Ui extends Dt {
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
    this.app.debugEnabled && (this.renderer !== void 0 && (Mt.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: n
    }));
  }
  setObject(n) {
    this.renderer !== void 0 && (Mt.renderer = this.renderer);
    const a = Lt(n);
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
    ln(), Gt(n);
    const a = st(n);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: a
    });
  }
  refreshScene(n) {
    if (!this.app.debugEnabled)
      return;
    const a = this.scenes.get(n);
    if (a !== void 0) {
      const t = st(a);
      this.app.send({
        event: "refreshScene",
        target: "app",
        data: t
      });
    }
  }
  removeScene(n) {
    if (n === void 0 || (this.scenes.delete(n.name), !this.app.debugEnabled))
      return;
    const a = st(n);
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
    this.renderer !== void 0 && (Mt.renderer = this.renderer), ln(), Gt(n);
    const a = st(n);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: a
    });
  }
  addCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Lt(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = Lt(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
  handleApp(n, a, t) {
    switch (t.event) {
      case "getObject":
        k.dispatchEvent({ type: D.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        k.dispatchEvent({ type: D.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        k.dispatchEvent({ type: D.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        k.dispatchEvent({ type: D.REQUEST_METHOD, value: t.data });
        break;
      case "refreshScene":
        n.send({
          event: "refreshScene",
          target: "editor",
          data: st(a.scenes.get(t.data.name))
        });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        k.dispatchEvent({ type: D.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        k.dispatchEvent({ type: D.ADD_SCENE, value: t.data });
        break;
      case "refreshScene":
        k.dispatchEvent({ type: D.REFRESH_SCENE, value: t.data });
        break;
      case "removeScene":
        k.dispatchEvent({ type: D.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        k.dispatchEvent({ type: D.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        k.dispatchEvent({ type: D.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        k.dispatchEvent({ type: D.REMOVE_CAMERA, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(n, a) {
    const t = new Jn(32, 32, a);
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
class $i extends Dt {
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
    this.pane = new Da({ title: "GUI" }), this.pane.registerPlugin(Aa);
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
    const o = this.bindID, l = t.onChange !== void 0 ? t.onChange : Kt;
    this.bindCBs.set(o, l), this.app.editor ? (this.pane === void 0 && this.createGUI(), (i !== void 0 ? i : this.pane).addBinding(n, a, t).on("change", (h) => {
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
var Wt = { exports: {} }, ht = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dn;
function Ga() {
  if (dn)
    return ht;
  dn = 1;
  var e = zn, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(s, h, u) {
    var f, v = {}, b = null, x = null;
    u !== void 0 && (b = "" + u), h.key !== void 0 && (b = "" + h.key), h.ref !== void 0 && (x = h.ref);
    for (f in h)
      t.call(h, f) && !o.hasOwnProperty(f) && (v[f] = h[f]);
    if (s && s.defaultProps)
      for (f in h = s.defaultProps, h)
        v[f] === void 0 && (v[f] = h[f]);
    return { $$typeof: n, type: s, key: b, ref: x, props: v, _owner: i.current };
  }
  return ht.Fragment = a, ht.jsx = l, ht.jsxs = l, ht;
}
var ft = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var un;
function Wa() {
  return un || (un = 1, process.env.NODE_ENV !== "production" && function() {
    var e = zn, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), s = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), A = Symbol.iterator, q = "@@iterator";
    function $(r) {
      if (r === null || typeof r != "object")
        return null;
      var p = A && r[A] || r[q];
      return typeof p == "function" ? p : null;
    }
    var W = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(r) {
      {
        for (var p = arguments.length, y = new Array(p > 1 ? p - 1 : 0), R = 1; R < p; R++)
          y[R - 1] = arguments[R];
        F("error", r, y);
      }
    }
    function F(r, p, y) {
      {
        var R = W.ReactDebugCurrentFrame, G = R.getStackAddendum();
        G !== "" && (p += "%s", y = y.concat([G]));
        var V = y.map(function(L) {
          return String(L);
        });
        V.unshift("Warning: " + p), Function.prototype.apply.call(console[r], console, V);
      }
    }
    var T = !1, Z = !1, ce = !1, S = !1, ye = !1, Y;
    Y = Symbol.for("react.module.reference");
    function ot(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === t || r === o || ye || r === i || r === u || r === f || S || r === x || T || Z || ce || typeof r == "object" && r !== null && (r.$$typeof === b || r.$$typeof === v || r.$$typeof === l || r.$$typeof === s || r.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === Y || r.getModuleId !== void 0));
    }
    function _(r, p, y) {
      var R = r.displayName;
      if (R)
        return R;
      var G = p.displayName || p.name || "";
      return G !== "" ? y + "(" + G + ")" : y;
    }
    function Pe(r) {
      return r.displayName || "Context";
    }
    function le(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
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
        case u:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case s:
            var p = r;
            return Pe(p) + ".Consumer";
          case l:
            var y = r;
            return Pe(y._context) + ".Provider";
          case h:
            return _(r, r.render, "ForwardRef");
          case v:
            var R = r.displayName || null;
            return R !== null ? R : le(r.type) || "Memo";
          case b: {
            var G = r, V = G._payload, L = G._init;
            try {
              return le(L(V));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ee = Object.assign, Re = 0, xe, Te, Ue, Le, Be, He, $e;
    function te() {
    }
    te.__reactDisabledLog = !0;
    function _e() {
      {
        if (Re === 0) {
          xe = console.log, Te = console.info, Ue = console.warn, Le = console.error, Be = console.group, He = console.groupCollapsed, $e = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: te,
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
        Re++;
      }
    }
    function ct() {
      {
        if (Re--, Re === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ee({}, r, {
              value: xe
            }),
            info: Ee({}, r, {
              value: Te
            }),
            warn: Ee({}, r, {
              value: Ue
            }),
            error: Ee({}, r, {
              value: Le
            }),
            group: Ee({}, r, {
              value: Be
            }),
            groupCollapsed: Ee({}, r, {
              value: He
            }),
            groupEnd: Ee({}, r, {
              value: $e
            })
          });
        }
        Re < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ye = W.ReactCurrentDispatcher, pe;
    function m(r, p, y) {
      {
        if (pe === void 0)
          try {
            throw Error();
          } catch (G) {
            var R = G.stack.trim().match(/\n( *(at )?)/);
            pe = R && R[1] || "";
          }
        return `
` + pe + r;
      }
    }
    var g = !1, O;
    {
      var j = typeof WeakMap == "function" ? WeakMap : Map;
      O = new j();
    }
    function ge(r, p) {
      if (!r || g)
        return "";
      {
        var y = O.get(r);
        if (y !== void 0)
          return y;
      }
      var R;
      g = !0;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var V;
      V = Ye.current, Ye.current = null, _e();
      try {
        if (p) {
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
            } catch (Fe) {
              R = Fe;
            }
            Reflect.construct(r, [], L);
          } else {
            try {
              L.call();
            } catch (Fe) {
              R = Fe;
            }
            r.call(L.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Fe) {
            R = Fe;
          }
          r();
        }
      } catch (Fe) {
        if (Fe && R && typeof Fe.stack == "string") {
          for (var I = Fe.stack.split(`
`), me = R.stack.split(`
`), Q = I.length - 1, ae = me.length - 1; Q >= 1 && ae >= 0 && I[Q] !== me[ae]; )
            ae--;
          for (; Q >= 1 && ae >= 0; Q--, ae--)
            if (I[Q] !== me[ae]) {
              if (Q !== 1 || ae !== 1)
                do
                  if (Q--, ae--, ae < 0 || I[Q] !== me[ae]) {
                    var Oe = `
` + I[Q].replace(" at new ", " at ");
                    return r.displayName && Oe.includes("<anonymous>") && (Oe = Oe.replace("<anonymous>", r.displayName)), typeof r == "function" && O.set(r, Oe), Oe;
                  }
                while (Q >= 1 && ae >= 0);
              break;
            }
        }
      } finally {
        g = !1, Ye.current = V, ct(), Error.prepareStackTrace = G;
      }
      var et = r ? r.displayName || r.name : "", Qt = et ? m(et) : "";
      return typeof r == "function" && O.set(r, Qt), Qt;
    }
    function ue(r, p, y) {
      return ge(r, !1);
    }
    function M(r) {
      var p = r.prototype;
      return !!(p && p.isReactComponent);
    }
    function C(r, p, y) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return ge(r, M(r));
      if (typeof r == "string")
        return m(r);
      switch (r) {
        case u:
          return m("Suspense");
        case f:
          return m("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case h:
            return ue(r.render);
          case v:
            return C(r.type, p, y);
          case b: {
            var R = r, G = R._payload, V = R._init;
            try {
              return C(V(G), p, y);
            } catch {
            }
          }
        }
      return "";
    }
    var H = Object.prototype.hasOwnProperty, ie = {}, Se = W.ReactDebugCurrentFrame;
    function N(r) {
      if (r) {
        var p = r._owner, y = C(r.type, r._source, p ? p.type : null);
        Se.setExtraStackFrame(y);
      } else
        Se.setExtraStackFrame(null);
    }
    function ne(r, p, y, R, G) {
      {
        var V = Function.call.bind(H);
        for (var L in r)
          if (V(r, L)) {
            var I = void 0;
            try {
              if (typeof r[L] != "function") {
                var me = Error((R || "React class") + ": " + y + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw me.name = "Invariant Violation", me;
              }
              I = r[L](p, L, R, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              I = Q;
            }
            I && !(I instanceof Error) && (N(G), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", R || "React class", y, L, typeof I), N(null)), I instanceof Error && !(I.message in ie) && (ie[I.message] = !0, N(G), w("Failed %s type: %s", y, I.message), N(null));
          }
      }
    }
    var z = Array.isArray;
    function Ie(r) {
      return z(r);
    }
    function de(r) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, y = p && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return y;
      }
    }
    function he(r) {
      try {
        return vt(r), !1;
      } catch {
        return !0;
      }
    }
    function vt(r) {
      return "" + r;
    }
    function lt(r) {
      if (he(r))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", de(r)), vt(r);
    }
    var ze = W.ReactCurrentOwner, dt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ut, bt, Je;
    Je = {};
    function Pt(r) {
      if (H.call(r, "ref")) {
        var p = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function It(r) {
      if (H.call(r, "key")) {
        var p = Object.getOwnPropertyDescriptor(r, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function jt(r, p) {
      if (typeof r.ref == "string" && ze.current && p && ze.current.stateNode !== p) {
        var y = le(ze.current.type);
        Je[y] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', le(ze.current.type), r.ref), Je[y] = !0);
      }
    }
    function yt(r, p) {
      {
        var y = function() {
          ut || (ut = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        y.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: y,
          configurable: !0
        });
      }
    }
    function Ge(r, p) {
      {
        var y = function() {
          bt || (bt = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        y.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: y,
          configurable: !0
        });
      }
    }
    var Zt = function(r, p, y, R, G, V, L) {
      var I = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: p,
        ref: y,
        props: L,
        // Record the component responsible for creating this element.
        _owner: V
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
        value: R
      }), Object.defineProperty(I, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.freeze && (Object.freeze(I.props), Object.freeze(I)), I;
    };
    function c(r, p, y, R, G) {
      {
        var V, L = {}, I = null, me = null;
        y !== void 0 && (lt(y), I = "" + y), It(p) && (lt(p.key), I = "" + p.key), Pt(p) && (me = p.ref, jt(p, G));
        for (V in p)
          H.call(p, V) && !dt.hasOwnProperty(V) && (L[V] = p[V]);
        if (r && r.defaultProps) {
          var Q = r.defaultProps;
          for (V in Q)
            L[V] === void 0 && (L[V] = Q[V]);
        }
        if (I || me) {
          var ae = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          I && yt(L, ae), me && Ge(L, ae);
        }
        return Zt(r, I, me, G, R, ze.current, L);
      }
    }
    var E = W.ReactCurrentOwner, P = W.ReactDebugCurrentFrame;
    function B(r) {
      if (r) {
        var p = r._owner, y = C(r.type, r._source, p ? p.type : null);
        P.setExtraStackFrame(y);
      } else
        P.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function Ce(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function fe() {
      {
        if (E.current) {
          var r = le(E.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Jt(r) {
      {
        if (r !== void 0) {
          var p = r.fileName.replace(/^.*[\\\/]/, ""), y = r.lineNumber;
          return `

Check your code at ` + p + ":" + y + ".";
        }
        return "";
      }
    }
    var Et = {};
    function xt(r) {
      {
        var p = fe();
        if (!p) {
          var y = typeof r == "string" ? r : r.displayName || r.name;
          y && (p = `

Check the top-level render call using <` + y + ">.");
        }
        return p;
      }
    }
    function we(r, p) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var y = xt(p);
        if (Et[y])
          return;
        Et[y] = !0;
        var R = "";
        r && r._owner && r._owner !== E.current && (R = " It was passed a child from " + le(r._owner.type) + "."), B(r), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, R), B(null);
      }
    }
    function Me(r, p) {
      {
        if (typeof r != "object")
          return;
        if (Ie(r))
          for (var y = 0; y < r.length; y++) {
            var R = r[y];
            Ce(R) && we(R, p);
          }
        else if (Ce(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var G = $(r);
          if (typeof G == "function" && G !== r.entries)
            for (var V = G.call(r), L; !(L = V.next()).done; )
              Ce(L.value) && we(L.value, p);
        }
      }
    }
    function Ve(r) {
      {
        var p = r.type;
        if (p == null || typeof p == "string")
          return;
        var y;
        if (typeof p == "function")
          y = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === v))
          y = p.propTypes;
        else
          return;
        if (y) {
          var R = le(p);
          ne(y, r.props, "prop", R, r);
        } else if (p.PropTypes !== void 0 && !re) {
          re = !0;
          var G = le(p);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(r) {
      {
        for (var p = Object.keys(r.props), y = 0; y < p.length; y++) {
          var R = p[y];
          if (R !== "children" && R !== "key") {
            B(r), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", R), B(null);
            break;
          }
        }
        r.ref !== null && (B(r), w("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
      }
    }
    function We(r, p, y, R, G, V) {
      {
        var L = ot(r);
        if (!L) {
          var I = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (I += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var me = Jt(G);
          me ? I += me : I += fe();
          var Q;
          r === null ? Q = "null" : Ie(r) ? Q = "array" : r !== void 0 && r.$$typeof === n ? (Q = "<" + (le(r.type) || "Unknown") + " />", I = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof r, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, I);
        }
        var ae = c(r, p, y, G, V);
        if (ae == null)
          return ae;
        if (L) {
          var Oe = p.children;
          if (Oe !== void 0)
            if (R)
              if (Ie(Oe)) {
                for (var et = 0; et < Oe.length; et++)
                  Me(Oe[et], r);
                Object.freeze && Object.freeze(Oe);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(Oe, r);
        }
        return r === t ? ke(ae) : Ve(ae), ae;
      }
    }
    function Qe(r, p, y) {
      return We(r, p, y, !0);
    }
    function St(r, p, y) {
      return We(r, p, y, !1);
    }
    var Kn = St, Xn = Qe;
    ft.Fragment = t, ft.jsx = Kn, ft.jsxs = Xn;
  }()), ft;
}
process.env.NODE_ENV === "production" ? Wt.exports = Ga() : Wt.exports = Wa();
var d = Wt.exports;
function Hn(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ d.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ d.jsx("button", { children: e.title });
}
const Ha = /* @__PURE__ */ d.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ d.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ya = /* @__PURE__ */ d.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ d.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Va(e) {
  return /* @__PURE__ */ d.jsx(Gn.Item, { value: e.title, children: /* @__PURE__ */ d.jsxs("div", { children: [
    Ya,
    /* @__PURE__ */ d.jsx("span", { children: e.title }),
    /* @__PURE__ */ d.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Ha })
  ] }) }, e.title);
}
function qa(e) {
  const [n, a] = U(!1), [t, i] = U(e.options), o = (u) => {
    e.onDragComplete(u), i(u);
  }, l = (u) => {
    const f = [...t];
    f.splice(u, 1), o(f);
  }, s = [];
  t.forEach((u, f) => {
    s.push(/* @__PURE__ */ d.jsx(Va, { index: f, title: u, onDelete: l }, u));
  });
  let h = "dropdown draggable";
  return e.subdropdown && (h += " subdropdown"), /* @__PURE__ */ d.jsxs("div", { className: h, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ d.jsx(Hn, { title: e.title }),
    /* @__PURE__ */ d.jsx(Gn.Group, { axis: "y", values: t, onReorder: o, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function Ka(e) {
  const [n, a] = U(!1), t = [];
  e.options.map((o, l) => {
    e.onSelect !== void 0 && (o.onSelect = e.onSelect), t.push(/* @__PURE__ */ d.jsx(Xa, { option: o }, l));
  });
  let i = "dropdown";
  return e.subdropdown && (i += " subdropdown"), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ d.jsx(Hn, { title: e.title }),
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
function Xa(e) {
  const { option: n } = e, [a, t] = U("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ d.jsx(
        qa,
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
      i = /* @__PURE__ */ d.jsx(
        Ka,
        {
          title: n.title,
          options: n.value,
          onSelect: n.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      i = /* @__PURE__ */ d.jsx(
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
  return /* @__PURE__ */ d.jsx("li", { className: a === n.title ? "selected" : "", children: i }, Ia());
}
function zi(e, n, a) {
  function t(o) {
    switch (n.forEach((l) => {
      l.callback(e, l.remote, o);
    }), o.event) {
      case "custom":
        k.dispatchEvent({ type: D.CUSTOM, value: o.data });
        break;
    }
  }
  function i(o) {
    switch (a.forEach((l) => {
      l.callback(e, l.remote, o);
    }), o.event) {
      case "custom":
        k.dispatchEvent({ type: D.CUSTOM, value: o.data });
        break;
    }
  }
  e.listen = (o) => {
    o.target === "editor" ? i(o) : t(o);
  };
}
function _t(e) {
  const [n, a] = U(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0, i = () => {
    k.dispatchEvent({ type: D.REMOVE_SCENE, value: e.scene });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const o = !n;
          e.onToggle !== void 0 && e.onToggle(o), a(o);
        },
        children: [
          /* @__PURE__ */ d.jsx(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "label", children: Rt(e.label) })
        ]
      }
    ),
    e.onRefresh ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("button", { className: "refresh", onClick: e.onRefresh }),
      /* @__PURE__ */ d.jsx("button", { className: "remove", onClick: i })
    ] }) : null,
    e.button,
    /* @__PURE__ */ d.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { children: e.children }) }, Math.random())
  ] });
}
function Yn(e) {
  const n = X(null), [a, t] = U(!1), i = e.child !== void 0 && e.child.children.length > 0, o = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((l, s) => {
    o.push(/* @__PURE__ */ d.jsx(Yn, { child: l, three: e.three }, s));
  }), Ae(() => {
    if (e.child) {
      const l = e.three.getScene(e.child.uuid);
      if (l !== null) {
        const s = l.getObjectByProperty("uuid", e.child.uuid);
        s !== void 0 && (n.current.style.opacity = s.visible ? "1" : "0.25");
      }
    }
  }, [a]), /* @__PURE__ */ d.jsx(d.Fragment, { children: e.child !== void 0 && /* @__PURE__ */ d.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "child", children: [
      i ? /* @__PURE__ */ d.jsx(
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
      /* @__PURE__ */ d.jsx(
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
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "visibility",
          ref: n,
          onClick: () => {
            if (e.child) {
              const l = e.three.getScene(e.child.uuid);
              if (l !== null) {
                const s = l.getObjectByProperty("uuid", e.child.uuid);
                if (s !== void 0) {
                  const h = "visible", u = !s.visible;
                  n.current.style.opacity = u ? "1" : "0.25", e.three.updateObject(e.child.uuid, h, u), ee(s, h, u);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: `icon ${Ba(e.child)}` })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: a ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { className: "container", children: o }) })
  ] }, Math.random()) });
}
function hn(e) {
  const n = [];
  return e.child?.children.map((a, t) => {
    n.push(/* @__PURE__ */ d.jsx(Yn, { child: a, scene: e.scene, three: e.three }, t));
  }), /* @__PURE__ */ d.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
function Za(e) {
  const [n, a] = U(e.defaultValue);
  return Ae(() => {
    let t = !1, i = -1, o = 0, l = e.defaultValue;
    const s = (b) => {
      t = !0, o = Number(e.input.current?.value), i = b.clientX, document.addEventListener("mouseup", u, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", u, !1);
    }, h = (b) => {
      if (!t)
        return;
      const x = e.step !== void 0 ? e.step : 1, A = (b.clientX - i) * x;
      l = Number((o + A).toFixed(4)), e.min !== void 0 && (l = Math.max(l, e.min)), e.max !== void 0 && (l = Math.min(l, e.max)), e.onChange !== void 0 && e.onChange(l), a(l);
    }, u = () => {
      t = !1, document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", u);
    }, f = (b) => {
      const x = Number(b.target.value);
      a(x);
    }, v = (b) => {
      const x = Number(b.target.value);
      e.onChange !== void 0 && e.onChange(x), a(x);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", s, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", v), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", s), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", v), document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", u);
    };
  }, []), n;
}
function Xe(e) {
  const n = X(null), a = X(null), t = Za({
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
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
        onChange: (i) => {
          const o = Number(i.target.value);
          e.onChange !== void 0 && e.onChange(e.prop, o);
        }
      }
    ),
    e.type === "range" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
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
      /* @__PURE__ */ d.jsx(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: t,
          min: e.min,
          max: e.max,
          step: e.step,
          ref: a,
          onChange: Kt
        }
      )
    ] })
  ] });
}
function Ja(e) {
  const n = X(null), a = X(null), t = X(null), i = X(null), o = X(null), l = X(null), [s, h] = U(e.value), [u, f] = U({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [v, b] = U(!1);
  function x() {
    v || (window.addEventListener("mousemove", q), window.addEventListener("mouseup", A), window.addEventListener("mouseup", A), b(!0));
  }
  function A() {
    window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", A), b(!1);
  }
  function q(T) {
    const Z = o.current.getBoundingClientRect(), ce = Ke(0, 99, T.clientX - Z.left) / 99, S = Ke(0, 99, T.clientY - Z.top) / 99, ye = cn(on(u.min, u.max, ce), 3), Y = cn(on(u.min, u.max, S), 3);
    e.onChange({ target: { value: { x: ye, y: Y } } }), h({ x: ye, y: Y });
  }
  function $(T) {
    let Z = s.x, ce = s.y;
    T.target === n.current ? Z = Number(T.target.value) : ce = Number(T.target.value), h({ x: Z, y: ce });
  }
  function W() {
    const T = Number(t.current.value);
    f({ min: T, max: u.max }), (s.x < T || s.y < T) && h({ x: Ke(T, u.max, s.x), y: Ke(T, u.max, s.y) });
  }
  function w() {
    const T = Number(i.current.value);
    f({ min: u.min, max: T }), (s.x > T || s.y > T) && h({ x: Ke(u.min, T, s.x), y: Ke(u.min, T, s.y) });
  }
  Ae(() => {
    const T = sn(u.min, u.max, s.x), Z = sn(u.min, u.max, s.y);
    l.current.style.left = `${T * 100}%`, l.current.style.top = `${Z * 100}%`;
  }, [u, s]);
  const F = e.step !== void 0 ? e.step : 0.01;
  return /* @__PURE__ */ d.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "X:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: s.x,
            min: u.min,
            max: u.max,
            step: F,
            onChange: $
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: s.y,
            min: u.min,
            max: u.max,
            step: F,
            onChange: $
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
            value: u.min,
            step: F,
            onChange: W
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: u.max,
            step: F,
            onChange: w
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "input", ref: o, onMouseDown: x, onMouseUp: A, children: [
      /* @__PURE__ */ d.jsx("div", { className: "x" }),
      /* @__PURE__ */ d.jsx("div", { className: "y" }),
      /* @__PURE__ */ d.jsx("div", { className: "pt", ref: l })
    ] })
  ] });
}
function fn(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = e.step !== void 0 ? e.step : 0.01, o = [];
  if (n) {
    const l = oe(() => e.value, []), s = (u, f) => {
      l[u] = f, e.onChange({ target: { value: l } });
    };
    ["x", "y", "z"].forEach((u) => {
      const f = X(null);
      o.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: f, children: u.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Xe,
            {
              value: l[u],
              type: "number",
              prop: u,
              step: i,
              labelRef: f,
              onChange: s
            }
          )
        ] }, u)
      );
    });
  } else if (a) {
    const l = oe(() => e.value, []), s = (u, f) => {
      l[u] = f, e.onChange({ target: { value: l } });
    };
    ["_x", "_y", "_z"].forEach((u) => {
      const f = X(null);
      o.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: f, children: u.substring(1).toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Xe,
            {
              value: l[u],
              type: "number",
              prop: u,
              step: i,
              labelRef: f,
              onChange: s
            }
          )
        ] }, u)
      );
    });
  } else if (t) {
    const l = oe(() => e.value, []), s = (h, u) => {
      const f = Number(h);
      l.elements[f] = u, e.onChange({ target: { value: l } });
    };
    for (let h = 0; h < 9; h++) {
      const u = X(null);
      o.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: u, children: h + 1 }),
          /* @__PURE__ */ d.jsx(
            Xe,
            {
              value: l.elements[h],
              type: "number",
              prop: h.toString(),
              step: i,
              labelRef: u,
              onChange: s
            }
          )
        ] }, h.toString())
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid3", children: o }, Math.random().toString());
}
function Qa(e) {
  const n = e.value.x !== void 0, a = e.step !== void 0 ? e.step : 0.01, t = [];
  if (n) {
    const i = oe(() => e.value, []), o = (s, h) => {
      i[s] = h, e.onChange({ target: { value: i } });
    };
    ["x", "y", "z", "w"].forEach((s) => {
      const h = X(null);
      t.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: h, children: s.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Xe,
            {
              value: i.x,
              type: "number",
              prop: s,
              step: a,
              labelRef: h,
              onChange: o
            }
          )
        ] }, s)
      );
    });
  } else {
    const i = oe(() => e.value, []), o = (l, s) => {
      const h = Number(l);
      i.elements[h] = s, e.onChange({ target: { value: i } });
    };
    for (let l = 0; l < 16; l++) {
      const s = X(null);
      t.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: s, children: l + 1 }),
          /* @__PURE__ */ d.jsx(
            Xe,
            {
              value: i.elements[l],
              type: "number",
              prop: l.toString(),
              step: a,
              labelRef: s,
              onChange: o
            }
          )
        ] }, l.toString())
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid4", children: t });
}
function ei(e) {
  return "items" in e;
}
function Ze(e) {
  const n = [];
  return e.items.forEach((a) => {
    ei(a) ? n.push(
      /* @__PURE__ */ d.jsx(Ze, { title: Rt(a.title), items: a.items }, Math.random())
    ) : n.push(
      /* @__PURE__ */ d.jsx(
        Ot,
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
  }), /* @__PURE__ */ d.jsx(_t, { label: e.title, open: e.expanded === !0, children: n });
}
function ti(e) {
  return !(e === "alphaHash" || e === "alphaToCoverage" || e === "attenuationDistance" || e === "blendAlpha" || e === "blendColor" || e === "blendDstAlpha" || e === "colorWrite" || e === "combine" || e === "defaultAttributeValues" || e === "depthFunc" || e === "forceSinglePass" || e === "glslVersion" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "premultipliedAlpha" || e === "shadowSide" || e === "toneMapped" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "vertexColors" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function ni(e) {
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
function At(e) {
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
function Vn(e) {
  const n = e.toLowerCase();
  return n.search("intensity") > -1 || n === "anisotropyrotation" || n === "blendalpha" || n === "bumpscale" || n === "clearcoatroughness" || n === "displacementbias" || n === "displacementscale" || n === "metalness" || n === "opacity" || n === "reflectivity" || n === "refractionratio" || n === "roughness" || n === "sheenroughness" || n === "thickness";
}
function ai() {
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
const ii = [
  {
    title: "Front",
    value: Qn
  },
  {
    title: "Back",
    value: Mn
  },
  {
    title: "Double",
    value: On
  }
], ri = [
  {
    title: "No Blending",
    value: ea
  },
  {
    title: "Normal",
    value: ta
  },
  {
    title: "Additive",
    value: na
  },
  {
    title: "Subtractive",
    value: aa
  },
  {
    title: "Multiply",
    value: ia
  },
  {
    title: "Custom",
    value: ra
  }
], si = [
  {
    title: "Add",
    value: sa
  },
  {
    title: "Subtract",
    value: oa
  },
  {
    title: "Reverse Subtract",
    value: ca
  },
  {
    title: "Min",
    value: la
  },
  {
    title: "Max",
    value: da
  }
], oi = [
  {
    title: "Zero",
    valye: Rn
  },
  {
    title: "One",
    valye: Tn
  },
  {
    title: "Src Color",
    valye: _n
  },
  {
    title: "One Minus Src Color",
    valye: kn
  },
  {
    title: "Src Alpha",
    valye: Dn
  },
  {
    title: "One Minus Src Alpha",
    valye: An
  },
  {
    title: "Dst Alpha",
    valye: Pn
  },
  {
    title: "One Minus Dst Alpha",
    valye: In
  },
  {
    title: "Dst Color",
    valye: jn
  },
  {
    title: "One Minus Dst Color",
    valye: Nn
  },
  {
    title: "Src Alpha Saturate",
    valye: ua
  },
  {
    title: "Constant Color",
    valye: Ln
  },
  {
    title: "One Minus Constant Color",
    valye: Bn
  },
  {
    title: "Constant Alpha",
    valye: Fn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Un
  }
], ci = [
  {
    title: "Zero",
    valye: Rn
  },
  {
    title: "One",
    valye: Tn
  },
  {
    title: "Src Color",
    valye: _n
  },
  {
    title: "One Minus Src Color",
    valye: kn
  },
  {
    title: "Src Alpha",
    valye: Dn
  },
  {
    title: "One Minus Src Alpha",
    valye: An
  },
  {
    title: "Dst Alpha",
    valye: Pn
  },
  {
    title: "One Minus Dst Alpha",
    valye: In
  },
  {
    title: "Dst Color",
    valye: jn
  },
  {
    title: "One Minus Dst Color",
    valye: Nn
  },
  {
    title: "Constant Color",
    valye: Ln
  },
  {
    title: "One Minus Constant Color",
    valye: Bn
  },
  {
    title: "Constant Alpha",
    valye: Fn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Un
  }
];
function mt(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function li(e, n, a, t) {
  return {
    type: "boolean",
    title: At(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, o) => {
      t.updateObject(a.uuid, `material.${e}`, o), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const l = t.getScene(a.uuid);
      if (l !== null) {
        const s = l.getObjectByProperty("uuid", a.uuid);
        ee(s, `material.${e}`, o);
      }
    }
  };
}
function di(e, n, a, t) {
  const i = {
    type: "number",
    title: At(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (o, l) => {
      t.updateObject(a.uuid, `material.${e}`, l), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const s = t.getScene(a.uuid);
      if (s !== null) {
        const h = s.getObjectByProperty("uuid", a.uuid);
        ee(h, `material.${e}`, l);
      }
    }
  };
  switch (e) {
    case "blending":
      mt(i, ri);
      break;
    case "blendDst":
      mt(i, ci);
      break;
    case "blendEquation":
      mt(i, si);
      break;
    case "blendSrc":
      mt(i, oi);
      break;
    case "side":
      mt(i, ii);
      break;
  }
  return Vn(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function ui(e, n, a, t) {
  const i = {
    type: "string",
    title: At(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (l, s) => {
      t.updateObject(a.uuid, `material.${e}`, s), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = t.getScene(a.uuid);
      if (h !== null) {
        const u = h.getObjectByProperty("uuid", a.uuid);
        ee(u, `material.${e}`, s);
      }
    },
    onKeyDown: (l) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (l, s) => {
    i.latest = s, t.updateObject(a.uuid, `material.${e}`, s);
    const h = t.getScene(a.uuid);
    if (h !== null) {
      const u = h.getObjectByProperty("uuid", a.uuid);
      ee(u, `material.${e}`, s);
    }
  }, i.onKeyDown = (l) => {
    if (l.key === "Enter" && (l.altKey || l.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const s = t.getScene(a.uuid);
      if (s !== null) {
        const h = s.getObjectByProperty("uuid", a.uuid);
        ee(h, "material.needsUpdate", !0);
      }
    }
  }), i;
}
function hi(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function fi(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function mi(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function Ht(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function pt(e, n, a, t, i = "", o = !1) {
  const l = At(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), s = i.length > 0 ? `${i}.${e}` : e, h = typeof n;
  if (h === "boolean" || h === "string")
    return {
      title: l,
      prop: s,
      type: h,
      value: n,
      disabled: o,
      onChange: (u, f) => {
        t.updateObject(a.uuid, `material.${s}`, f);
        const v = t.getScene(a.uuid);
        if (v !== null) {
          const b = v.getObjectByProperty("uuid", a.uuid);
          ee(b, `material.${s}`, f);
        }
      }
    };
  if (h === "number") {
    const u = {
      title: l,
      prop: s,
      type: "number",
      value: n,
      step: 0.01,
      disabled: o,
      onChange: (f, v) => {
        t.updateObject(a.uuid, `material.${s}`, v);
        const b = t.getScene(a.uuid);
        if (b !== null) {
          const x = b.getObjectByProperty("uuid", a.uuid);
          ee(x, `material.${s}`, v);
        }
      }
    };
    return Vn(l) && (u.type = "range", u.min = 0, u.max = 1), u;
  } else {
    if (n.isColor)
      return {
        title: l,
        prop: s,
        type: "color",
        value: n,
        disabled: o,
        onChange: (u, f) => {
          const v = new qt(f);
          t.updateObject(a.uuid, `material.${s}`, v);
          const b = t.getScene(a.uuid);
          if (b !== null) {
            const x = b.getObjectByProperty("uuid", a.uuid);
            ee(x, `material.${s}`, v);
          }
        }
      };
    if (Array.isArray(n)) {
      const u = [];
      for (const f in n) {
        const v = n[f], b = `[${f.toString()}]`;
        if (v.value !== void 0) {
          const x = pt(`${b}.value`, v.value, a, t, s, o);
          x !== void 0 && u.push(x);
        } else {
          const x = pt(b, v, a, t, s, o);
          x !== void 0 && u.push(x);
        }
      }
      if (u.length > 0)
        return Ht(u), {
          title: l,
          items: u
        };
    } else {
      if (hi(n))
        return {
          title: l,
          prop: s,
          type: "vector2",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const v = t.getScene(a.uuid);
            if (v !== null) {
              const b = v.getObjectByProperty("uuid", a.uuid);
              ee(b, `material.${s}`, f);
            }
          }
        };
      if (fi(n))
        return {
          title: l,
          prop: s,
          type: "grid3",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const v = t.getScene(a.uuid);
            if (v !== null) {
              const b = v.getObjectByProperty("uuid", a.uuid);
              ee(b, `material.${s}`, f);
            }
          }
        };
      if (mi(n))
        return {
          title: l,
          prop: s,
          type: "grid4",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const v = t.getScene(a.uuid);
            if (v !== null) {
              const b = v.getObjectByProperty("uuid", a.uuid);
              ee(b, `material.${s}`, f);
            }
          }
        };
      if (n.isEuler)
        return {
          title: l,
          prop: s,
          type: "euler",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const v = t.getScene(a.uuid);
            if (v !== null) {
              const b = v.getObjectByProperty("uuid", a.uuid);
              ee(b, `material.${s}`, f);
            }
          }
        };
      if (n.src !== void 0)
        return {
          title: l,
          type: "image",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            const v = ni(e), b = i.length > 0 ? `${i}.${v}` : v;
            t.createTexture(a.uuid, `material.${b}`, f);
            const x = t.getScene(a.uuid);
            if (x !== null) {
              const A = x.getObjectByProperty("uuid", a.uuid);
              if (A !== void 0) {
                const q = ($) => {
                  const W = A.material, w = b.split(".");
                  switch (w.length) {
                    case 1:
                      W[w[0]] = $;
                      break;
                    case 2:
                      W[w[0]][w[1]] = $;
                      break;
                    case 3:
                      W[w[0]][w[1]][w[2]] = $;
                      break;
                    case 4:
                      W[w[0]][w[1]][w[2]][w[3]] = $;
                      break;
                    case 5:
                      W[w[0]][w[1]][w[2]][w[3]][w[4]] = $;
                      break;
                  }
                  W.needsUpdate = !0;
                };
                f.src.length > 0 ? Wn(f.src).then(($) => {
                  $.offset.set(f.offset[0], f.offset[1]), $.repeat.set(f.repeat[0], f.repeat[1]), q($);
                }) : q(null);
              }
            }
          }
        };
      if (n.elements !== void 0)
        return {
          title: l,
          prop: s,
          type: n.elements.length > 9 ? "grid4" : "grid3",
          value: n,
          disabled: o,
          onChange: (u, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const v = t.getScene(a.uuid);
            if (v !== null) {
              const b = v.getObjectByProperty("uuid", a.uuid);
              ee(b, `material.${s}`, f);
            }
          }
        };
      {
        const u = [], f = e === "defines" || e === "extensions";
        try {
          for (const v in n) {
            const b = n[v];
            if (b !== void 0)
              if (b.value !== void 0) {
                const x = pt(`${v}.value`, b.value, a, t, s, f);
                x !== void 0 && u.push(x);
              } else {
                const x = pt(v, b, a, t, s, f);
                x !== void 0 && u.push(x);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (u.length > 0)
          return Ht(u), {
            title: l,
            items: u
          };
      }
    }
  }
}
function mn(e, n, a) {
  const t = [];
  for (const i in e) {
    if (!ti(i))
      continue;
    const o = typeof e[i], l = e[i];
    if (o === "boolean")
      t.push(li(i, l, n, a));
    else if (o === "number")
      t.push(di(i, l, n, a));
    else if (o === "string")
      t.push(ui(i, l, n, a));
    else if (o === "object") {
      const s = pt(i, l, n, a);
      s !== void 0 && t.push(s);
    } else
      l !== void 0 && console.log("other:", i, o, l);
  }
  return Ht(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.getScene(n.uuid);
      if (i !== null) {
        const o = i.getObjectByProperty("uuid", n.uuid);
        ee(o, "material.needsUpdate", !0);
      }
    }
  }), t;
}
function pi(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let o = 0; o < i; o++)
      t.push(
        /* @__PURE__ */ d.jsx(
          Ze,
          {
            title: `Material ${o}`,
            items: mn(a[o], e, n)
          },
          `Material ${o}`
        )
      );
    return /* @__PURE__ */ d.jsx(d.Fragment, { children: t });
  } else
    return /* @__PURE__ */ d.jsx(
      Ze,
      {
        title: "Material",
        items: mn(a, e, n)
      }
    );
}
const pn = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function gi(e) {
  const n = e.step !== void 0 ? e.step : 0.01, a = X(null), t = X(null), i = X(null), o = X(null), l = X(null), [s] = U(e.value), [h, u] = U(e.value.offset[0]), [f, v] = U(e.value.offset[1]), [b, x] = U(e.value.repeat[0]), [A, q] = U(e.value.repeat[1]);
  function $(w, F, T, Z, ce) {
    if (e.onChange !== void 0) {
      const S = e.prop !== void 0 ? e.prop : e.title;
      e.onChange(S, {
        src: w,
        offset: [F, T],
        repeat: [Z, ce]
      });
    }
  }
  function W(w) {
    const F = a.current.src, T = w.target.value;
    switch (w.target) {
      case t.current:
        u(T), $(F, T, f, b, A);
        break;
      case i.current:
        v(T), $(F, h, T, b, A);
        break;
      case o.current:
        x(T), $(F, h, f, T, A);
        break;
      case l.current:
        q(T), $(F, h, f, b, T);
        break;
    }
  }
  return /* @__PURE__ */ d.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ d.jsx("img", { alt: e.title, ref: a, onClick: () => {
      ai().then((w) => {
        a.current.src = w, $(w, h, f, b, A);
      });
    }, src: s.src.length > 0 ? s.src : pn }),
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: h,
            step: n,
            onChange: W
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: f,
            step: n,
            onChange: W
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: o,
            type: "number",
            value: b,
            step: n,
            onChange: W
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: l,
            type: "number",
            value: A,
            step: n,
            onChange: W
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("button", { onClick: () => {
        $("", h, f, b, A), a.current.src = pn;
      }, children: "Clear" })
    ] })
  ] });
}
function Ot(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = Na(e.value));
  const [a, t] = U(n), i = X(null), o = (u) => {
    let f = u.target.value;
    e.type === "boolean" ? f = u.target.checked : e.type === "option" && (f = e.options[f].value), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  }, l = {};
  e.disabled && (l.opacity = 0.8);
  const s = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = s || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ d.jsxs("div", { className: `field ${h ? "block" : ""}`, style: l, children: [
    e.type !== "button" && /* @__PURE__ */ d.jsx("label", { ref: i, children: Rt(e.title) }, "fieldLabel"),
    e.type === "string" && !s && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: o,
        value: a
      }
    ),
    e.type === "string" && s && /* @__PURE__ */ d.jsx(
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
    e.type === "boolean" && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: o,
        checked: a
      }
    ),
    e.type === "number" && /* @__PURE__ */ d.jsx(
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
    e.type === "range" && /* @__PURE__ */ d.jsx(
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
    e.type === "color" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: a.toString(), onChange: o, disabled: e.disabled, className: "color" }),
      /* @__PURE__ */ d.jsx("input", { type: "color", value: a, onChange: o, disabled: e.disabled })
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
    e.type === "image" && /* @__PURE__ */ d.jsx(gi, { title: e.title, prop: e.prop, value: e.value, onChange: e.onChange }),
    e.type === "option" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx("select", { onChange: o, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((u, f) => /* @__PURE__ */ d.jsx("option", { value: u.value, children: Rt(u.title) }, f)) }) }),
    e.type === "vector2" && /* @__PURE__ */ d.jsx(Ja, { step: e.step, value: a, min: 0, max: 1, onChange: o }),
    e.type === "grid3" && /* @__PURE__ */ d.jsx(fn, { step: e.step, value: a, onChange: o }),
    e.type === "grid4" && /* @__PURE__ */ d.jsx(Qa, { step: e.step, value: a, onChange: o }),
    e.type === "euler" && /* @__PURE__ */ d.jsx(fn, { step: e.step, value: a, onChange: o })
  ] });
}
function gn(e) {
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
function vi(e, n) {
  const a = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      a.push({
        title: gn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const l = n.getScene(e.uuid);
          if (l !== null) {
            const s = l.getObjectByProperty("uuid", e.uuid);
            s !== void 0 && (ee(s, i, o), s.updateProjectionMatrix());
          }
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      a.push({
        title: gn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, o) => {
          n.updateObject(e.uuid, i, o), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const l = n.getScene(e.uuid);
          if (l !== null) {
            const s = l.getObjectByProperty("uuid", e.uuid);
            s !== void 0 && (ee(s, i, o), s.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ d.jsx(
    Ze,
    {
      title: "Camera",
      items: a
    }
  );
}
function bi(e, n) {
  const a = new ha();
  a.elements = e.matrix;
  const t = new J(), i = new fa(), o = new J();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), o.setFromMatrixScale(a));
  const l = (s, h) => {
    const u = s === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    n.updateObject(e.uuid, s, u);
    const f = n.getScene(e.uuid);
    if (f !== null) {
      const v = f.getObjectByProperty("uuid", e.uuid);
      ee(v, s, u);
    }
  };
  return /* @__PURE__ */ d.jsx(
    Ze,
    {
      title: "Transform",
      items: [
        {
          title: "Position",
          prop: "position",
          type: "grid3",
          step: 0.1,
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
          value: o,
          onChange: l
        }
      ]
    }
  );
}
function vn(e) {
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
function yi(e, n) {
  const a = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const i = e.lightInfo[t];
      i !== void 0 && (i.isColor !== void 0 ? a.push({
        title: vn(t),
        prop: t,
        type: "color",
        value: i,
        onChange: (o, l) => {
          const s = new qt(l);
          n.updateObject(e.uuid, o, s);
          const h = n.getScene(e.uuid);
          if (h !== null) {
            const u = h.getObjectByProperty("uuid", e.uuid);
            ee(u, o, s);
          }
        }
      }) : a.push({
        title: vn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (o, l) => {
          n.updateObject(e.uuid, o, l);
          const s = n.getScene(e.uuid);
          if (s !== null) {
            const h = s.getObjectByProperty("uuid", e.uuid);
            ee(h, o, l);
          }
        }
      }));
    }
  return /* @__PURE__ */ d.jsx(
    Ze,
    {
      title: "Light",
      items: a
    }
  );
}
function Ei(e, n) {
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
  const o = n.getScene(e.uuid);
  if (o !== null) {
    const l = o.getObjectByProperty("uuid", e.uuid);
    let s = !1;
    if (l !== void 0) {
      const h = l.mixer;
      if (s = h !== void 0, s) {
        const u = [
          {
            title: "Time Scale",
            type: "range",
            value: h.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (f, v) => {
              h.timeScale = v, n.updateObject(e.uuid, "mixer.timeScale", v);
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
  return /* @__PURE__ */ d.jsx(Ze, { title: "Animation", items: a });
}
const qn = {
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
let ve = { ...qn };
function xi(e) {
  const [n, a] = U(-1);
  Ae(() => {
    function l(h) {
      ve = { ...h.value }, a(Date.now());
    }
    function s() {
      ve = { ...qn }, a(Date.now());
    }
    return k.addEventListener(D.SET_SCENE, s), k.addEventListener(D.SET_OBJECT, l), () => {
      k.removeEventListener(D.SET_SCENE, s), k.removeEventListener(D.SET_OBJECT, l);
    };
  }, []);
  const t = ve.type.toLowerCase(), i = ve.animations.length > 0 || ve.mixer !== void 0, o = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ d.jsx(_t, { label: "Inspector", children: /* @__PURE__ */ d.jsx("div", { id: "Inspector", className: e.class, children: ve.uuid.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        Ot,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ve.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ot,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ve.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ot,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ve.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      bi(ve, e.three),
      i ? Ei(ve, e.three) : null,
      t.search("camera") > -1 ? vi(ve, e.three) : null,
      t.search("light") > -1 ? yi(ve, e.three) : null,
      o ? pi(ve, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Gi(e) {
  const [n] = U([]), [a] = U([]), [t, i] = U(0), o = (h) => {
    const u = h.value;
    n.push(u), a.push(
      /* @__PURE__ */ d.jsx(
        _t,
        {
          label: `Scene: ${u.name}`,
          scene: u,
          open: !0,
          onRefresh: () => {
            e.three.refreshScene(u.name);
          },
          children: /* @__PURE__ */ d.jsx(hn, { child: u, scene: u, three: e.three })
        },
        Math.random()
      )
    ), i(Date.now());
  }, l = (h) => {
    const u = h.value;
    for (let f = 0; f < n.length; f++)
      if (u.uuid === n[f].uuid) {
        n[f] = u, a[f] = /* @__PURE__ */ d.jsx(
          _t,
          {
            label: `Scene: ${u.name}`,
            scene: u,
            open: !0,
            onRefresh: () => {
              e.three.refreshScene(u.name);
            },
            children: /* @__PURE__ */ d.jsx(hn, { child: u, scene: u, three: e.three })
          },
          Math.random()
        ), i(Date.now());
        return;
      }
  }, s = (h) => {
    const u = h.value;
    for (let f = 0; f < n.length; f++)
      if (u.uuid === n[f].uuid) {
        n.splice(f, 1), a.splice(f, 1), i(Date.now());
        return;
      }
  };
  return Ae(() => (k.addEventListener(D.ADD_SCENE, o), k.addEventListener(D.REFRESH_SCENE, l), k.addEventListener(D.REMOVE_SCENE, s), () => {
    k.removeEventListener(D.ADD_SCENE, o), k.removeEventListener(D.REFRESH_SCENE, l), k.removeEventListener(D.REMOVE_SCENE, s);
  }), []), /* @__PURE__ */ d.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ d.jsx("div", { children: a }, t),
    /* @__PURE__ */ d.jsx(xi, { three: e.three })
  ] });
}
function Wi(e) {
  return Ae(() => {
    function n(s) {
      let h = null;
      return e.three.scenes.forEach((u) => {
        s.search(u.uuid) > -1 && (h = u);
      }), h;
    }
    const a = (s) => {
      const h = s.value, f = n(h)?.getObjectByProperty("uuid", h);
      f !== void 0 && e.three.setObject(f);
    }, t = (s, h, u) => {
      const v = n(s)?.getObjectByProperty("uuid", s);
      v !== void 0 && ee(v, h, u);
    }, i = (s) => {
      const h = s.value, { key: u, value: f, uuid: v } = h;
      t(v, u, f);
    }, o = (s) => {
      const h = s.value, f = n(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (f !== void 0) {
        const v = (b) => {
          const x = h.key.split(".");
          switch (x.length) {
            case 1:
              f[x[0]] = b;
              break;
            case 2:
              f[x[0]][x[1]] = b;
              break;
            case 3:
              f[x[0]][x[1]][x[2]] = b;
              break;
            case 4:
              f[x[0]][x[1]][x[2]][x[3]] = b;
              break;
            case 5:
              f[x[0]][x[1]][x[2]][x[3]][x[4]] = b;
              break;
          }
          f.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? Wn(h.value.src).then((b) => {
          b.offset.set(h.value.offset[0], h.value.offset[1]), b.repeat.set(h.value.repeat[0], h.value.repeat[1]), v(b);
        }) : v(null);
      }
    }, l = (s) => {
      const { key: h, uuid: u, value: f, subitem: v } = s.value, x = n(u)?.getObjectByProperty("uuid", u);
      if (x !== void 0)
        try {
          v !== void 0 ? $a(x, v)[h](f) : x[h](f);
        } catch (A) {
          console.log("Error requesting method:"), console.log(A), console.log(h), console.log(f);
        }
    };
    return k.addEventListener(D.GET_OBJECT, a), k.addEventListener(D.UPDATE_OBJECT, i), k.addEventListener(D.CREATE_TEXTURE, o), k.addEventListener(D.REQUEST_METHOD, l), () => {
      k.removeEventListener(D.GET_OBJECT, a), k.removeEventListener(D.UPDATE_OBJECT, i), k.removeEventListener(D.CREATE_TEXTURE, o), k.removeEventListener(D.REQUEST_METHOD, l);
    };
  }, []), null;
}
class Si extends ma {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new $t();
    i.setAttribute("position", new gt(t, 3)), i.computeBoundingSphere();
    const o = new pa({ fog: !1 });
    super(i, o), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const l = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], s = new $t();
    s.setAttribute("position", new gt(l, 3)), s.computeBoundingSphere(), this.add(new Vt(s, new Yt({ side: Mn, fog: !1 })));
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
const bn = { type: "change" }, Bt = { type: "start" }, yn = { type: "end" }, Ct = new ga(), En = new va(), Ci = Math.cos(70 * ba.DEG2RAD);
class wi extends wn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: tt.ROTATE, MIDDLE: tt.DOLLY, RIGHT: tt.PAN }, this.touches = { ONE: nt.ROTATE, TWO: nt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(c) {
      c.addEventListener("keydown", dt), this._domElementKeyEvents = c;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", dt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(bn), t.update(), o = i.NONE;
    }, this.update = function() {
      const c = new J(), E = new nn().setFromUnitVectors(n.up, new J(0, 1, 0)), P = E.clone().invert(), B = new J(), re = new nn(), Ce = new J(), fe = 2 * Math.PI;
      return function(Et = null) {
        const xt = t.object.position;
        c.copy(xt).sub(t.target), c.applyQuaternion(E), s.setFromVector3(c), t.autoRotate && o === i.NONE && Pe(ot(Et)), t.enableDamping ? (s.theta += h.theta * t.dampingFactor, s.phi += h.phi * t.dampingFactor) : (s.theta += h.theta, s.phi += h.phi);
        let we = t.minAzimuthAngle, Me = t.maxAzimuthAngle;
        isFinite(we) && isFinite(Me) && (we < -Math.PI ? we += fe : we > Math.PI && (we -= fe), Me < -Math.PI ? Me += fe : Me > Math.PI && (Me -= fe), we <= Me ? s.theta = Math.max(we, Math.min(Me, s.theta)) : s.theta = s.theta > (we + Me) / 2 ? Math.max(we, s.theta) : Math.min(Me, s.theta)), s.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, s.phi)), s.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Ve = !1;
        if (t.zoomToCursor && ce || t.object.isOrthographicCamera)
          s.radius = Be(s.radius);
        else {
          const ke = s.radius;
          s.radius = Be(s.radius * u), Ve = ke != s.radius;
        }
        if (c.setFromSpherical(s), c.applyQuaternion(P), xt.copy(t.target).add(c), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && ce) {
          let ke = null;
          if (t.object.isPerspectiveCamera) {
            const We = c.length();
            ke = Be(We * u);
            const Qe = We - ke;
            t.object.position.addScaledVector(T, Qe), t.object.updateMatrixWorld(), Ve = !!Qe;
          } else if (t.object.isOrthographicCamera) {
            const We = new J(Z.x, Z.y, 0);
            We.unproject(t.object);
            const Qe = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / u)), t.object.updateProjectionMatrix(), Ve = Qe !== t.object.zoom;
            const St = new J(Z.x, Z.y, 0);
            St.unproject(t.object), t.object.position.sub(St).add(We), t.object.updateMatrixWorld(), ke = c.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          ke !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(ke).add(t.object.position) : (Ct.origin.copy(t.object.position), Ct.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Ct.direction)) < Ci ? n.lookAt(t.target) : (En.setFromNormalAndCoplanarPoint(t.object.up, t.target), Ct.intersectPlane(En, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const ke = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / u)), ke !== t.object.zoom && (t.object.updateProjectionMatrix(), Ve = !0);
        }
        return u = 1, ce = !1, Ve || B.distanceToSquared(t.object.position) > l || 8 * (1 - re.dot(t.object.quaternion)) > l || Ce.distanceToSquared(t.target) > l ? (t.dispatchEvent(bn), B.copy(t.object.position), re.copy(t.object.quaternion), Ce.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Je), t.domElement.removeEventListener("pointerdown", N), t.domElement.removeEventListener("pointercancel", z), t.domElement.removeEventListener("wheel", he), t.domElement.removeEventListener("pointermove", ne), t.domElement.removeEventListener("pointerup", z), t.domElement.getRootNode().removeEventListener("keydown", lt, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", dt), t._domElementKeyEvents = null);
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
    const l = 1e-6, s = new an(), h = new an();
    let u = 1;
    const f = new J(), v = new be(), b = new be(), x = new be(), A = new be(), q = new be(), $ = new be(), W = new be(), w = new be(), F = new be(), T = new J(), Z = new be();
    let ce = !1;
    const S = [], ye = {};
    let Y = !1;
    function ot(c) {
      return c !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * c : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function _(c) {
      const E = Math.abs(c * 0.01);
      return Math.pow(0.95, t.zoomSpeed * E);
    }
    function Pe(c) {
      h.theta -= c;
    }
    function le(c) {
      h.phi -= c;
    }
    const Ee = function() {
      const c = new J();
      return function(P, B) {
        c.setFromMatrixColumn(B, 0), c.multiplyScalar(-P), f.add(c);
      };
    }(), Re = function() {
      const c = new J();
      return function(P, B) {
        t.screenSpacePanning === !0 ? c.setFromMatrixColumn(B, 1) : (c.setFromMatrixColumn(B, 0), c.crossVectors(t.object.up, c)), c.multiplyScalar(P), f.add(c);
      };
    }(), xe = function() {
      const c = new J();
      return function(P, B) {
        const re = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const Ce = t.object.position;
          c.copy(Ce).sub(t.target);
          let fe = c.length();
          fe *= Math.tan(t.object.fov / 2 * Math.PI / 180), Ee(2 * P * fe / re.clientHeight, t.object.matrix), Re(2 * B * fe / re.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (Ee(P * (t.object.right - t.object.left) / t.object.zoom / re.clientWidth, t.object.matrix), Re(B * (t.object.top - t.object.bottom) / t.object.zoom / re.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Te(c) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? u /= c : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Ue(c) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? u *= c : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Le(c, E) {
      if (!t.zoomToCursor)
        return;
      ce = !0;
      const P = t.domElement.getBoundingClientRect(), B = c - P.left, re = E - P.top, Ce = P.width, fe = P.height;
      Z.x = B / Ce * 2 - 1, Z.y = -(re / fe) * 2 + 1, T.set(Z.x, Z.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Be(c) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, c));
    }
    function He(c) {
      v.set(c.clientX, c.clientY);
    }
    function $e(c) {
      Le(c.clientX, c.clientX), W.set(c.clientX, c.clientY);
    }
    function te(c) {
      A.set(c.clientX, c.clientY);
    }
    function _e(c) {
      b.set(c.clientX, c.clientY), x.subVectors(b, v).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      Pe(2 * Math.PI * x.x / E.clientHeight), le(2 * Math.PI * x.y / E.clientHeight), v.copy(b), t.update();
    }
    function ct(c) {
      w.set(c.clientX, c.clientY), F.subVectors(w, W), F.y > 0 ? Te(_(F.y)) : F.y < 0 && Ue(_(F.y)), W.copy(w), t.update();
    }
    function Ye(c) {
      q.set(c.clientX, c.clientY), $.subVectors(q, A).multiplyScalar(t.panSpeed), xe($.x, $.y), A.copy(q), t.update();
    }
    function pe(c) {
      Le(c.clientX, c.clientY), c.deltaY < 0 ? Ue(_(c.deltaY)) : c.deltaY > 0 && Te(_(c.deltaY)), t.update();
    }
    function m(c) {
      let E = !1;
      switch (c.code) {
        case t.keys.UP:
          c.ctrlKey || c.metaKey || c.shiftKey ? le(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : xe(0, t.keyPanSpeed), E = !0;
          break;
        case t.keys.BOTTOM:
          c.ctrlKey || c.metaKey || c.shiftKey ? le(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : xe(0, -t.keyPanSpeed), E = !0;
          break;
        case t.keys.LEFT:
          c.ctrlKey || c.metaKey || c.shiftKey ? Pe(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : xe(t.keyPanSpeed, 0), E = !0;
          break;
        case t.keys.RIGHT:
          c.ctrlKey || c.metaKey || c.shiftKey ? Pe(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : xe(-t.keyPanSpeed, 0), E = !0;
          break;
      }
      E && (c.preventDefault(), t.update());
    }
    function g(c) {
      if (S.length === 1)
        v.set(c.pageX, c.pageY);
      else {
        const E = Ge(c), P = 0.5 * (c.pageX + E.x), B = 0.5 * (c.pageY + E.y);
        v.set(P, B);
      }
    }
    function O(c) {
      if (S.length === 1)
        A.set(c.pageX, c.pageY);
      else {
        const E = Ge(c), P = 0.5 * (c.pageX + E.x), B = 0.5 * (c.pageY + E.y);
        A.set(P, B);
      }
    }
    function j(c) {
      const E = Ge(c), P = c.pageX - E.x, B = c.pageY - E.y, re = Math.sqrt(P * P + B * B);
      W.set(0, re);
    }
    function ge(c) {
      t.enableZoom && j(c), t.enablePan && O(c);
    }
    function ue(c) {
      t.enableZoom && j(c), t.enableRotate && g(c);
    }
    function M(c) {
      if (S.length == 1)
        b.set(c.pageX, c.pageY);
      else {
        const P = Ge(c), B = 0.5 * (c.pageX + P.x), re = 0.5 * (c.pageY + P.y);
        b.set(B, re);
      }
      x.subVectors(b, v).multiplyScalar(t.rotateSpeed);
      const E = t.domElement;
      Pe(2 * Math.PI * x.x / E.clientHeight), le(2 * Math.PI * x.y / E.clientHeight), v.copy(b);
    }
    function C(c) {
      if (S.length === 1)
        q.set(c.pageX, c.pageY);
      else {
        const E = Ge(c), P = 0.5 * (c.pageX + E.x), B = 0.5 * (c.pageY + E.y);
        q.set(P, B);
      }
      $.subVectors(q, A).multiplyScalar(t.panSpeed), xe($.x, $.y), A.copy(q);
    }
    function H(c) {
      const E = Ge(c), P = c.pageX - E.x, B = c.pageY - E.y, re = Math.sqrt(P * P + B * B);
      w.set(0, re), F.set(0, Math.pow(w.y / W.y, t.zoomSpeed)), Te(F.y), W.copy(w);
      const Ce = (c.pageX + E.x) * 0.5, fe = (c.pageY + E.y) * 0.5;
      Le(Ce, fe);
    }
    function ie(c) {
      t.enableZoom && H(c), t.enablePan && C(c);
    }
    function Se(c) {
      t.enableZoom && H(c), t.enableRotate && M(c);
    }
    function N(c) {
      t.enabled !== !1 && (S.length === 0 && (t.domElement.setPointerCapture(c.pointerId), t.domElement.addEventListener("pointermove", ne), t.domElement.addEventListener("pointerup", z)), !jt(c) && (Pt(c), c.pointerType === "touch" ? ut(c) : Ie(c)));
    }
    function ne(c) {
      t.enabled !== !1 && (c.pointerType === "touch" ? bt(c) : de(c));
    }
    function z(c) {
      switch (It(c), S.length) {
        case 0:
          t.domElement.releasePointerCapture(c.pointerId), t.domElement.removeEventListener("pointermove", ne), t.domElement.removeEventListener("pointerup", z), t.dispatchEvent(yn), o = i.NONE;
          break;
        case 1:
          const E = S[0], P = ye[E];
          ut({ pointerId: E, pageX: P.x, pageY: P.y });
          break;
      }
    }
    function Ie(c) {
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
        case tt.DOLLY:
          if (t.enableZoom === !1)
            return;
          $e(c), o = i.DOLLY;
          break;
        case tt.ROTATE:
          if (c.ctrlKey || c.metaKey || c.shiftKey) {
            if (t.enablePan === !1)
              return;
            te(c), o = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            He(c), o = i.ROTATE;
          }
          break;
        case tt.PAN:
          if (c.ctrlKey || c.metaKey || c.shiftKey) {
            if (t.enableRotate === !1)
              return;
            He(c), o = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            te(c), o = i.PAN;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(Bt);
    }
    function de(c) {
      switch (o) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          _e(c);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          ct(c);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          Ye(c);
          break;
      }
    }
    function he(c) {
      t.enabled === !1 || t.enableZoom === !1 || o !== i.NONE || (c.preventDefault(), t.dispatchEvent(Bt), pe(vt(c)), t.dispatchEvent(yn));
    }
    function vt(c) {
      const E = c.deltaMode, P = {
        clientX: c.clientX,
        clientY: c.clientY,
        deltaY: c.deltaY
      };
      switch (E) {
        case 1:
          P.deltaY *= 16;
          break;
        case 2:
          P.deltaY *= 100;
          break;
      }
      return c.ctrlKey && !Y && (P.deltaY *= 10), P;
    }
    function lt(c) {
      c.key === "Control" && (Y = !0, t.domElement.getRootNode().addEventListener("keyup", ze, { passive: !0, capture: !0 }));
    }
    function ze(c) {
      c.key === "Control" && (Y = !1, t.domElement.getRootNode().removeEventListener("keyup", ze, { passive: !0, capture: !0 }));
    }
    function dt(c) {
      t.enabled === !1 || t.enablePan === !1 || m(c);
    }
    function ut(c) {
      switch (yt(c), S.length) {
        case 1:
          switch (t.touches.ONE) {
            case nt.ROTATE:
              if (t.enableRotate === !1)
                return;
              g(c), o = i.TOUCH_ROTATE;
              break;
            case nt.PAN:
              if (t.enablePan === !1)
                return;
              O(c), o = i.TOUCH_PAN;
              break;
            default:
              o = i.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case nt.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              ge(c), o = i.TOUCH_DOLLY_PAN;
              break;
            case nt.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              ue(c), o = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = i.NONE;
          }
          break;
        default:
          o = i.NONE;
      }
      o !== i.NONE && t.dispatchEvent(Bt);
    }
    function bt(c) {
      switch (yt(c), o) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          M(c), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          C(c), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          ie(c), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          Se(c), t.update();
          break;
        default:
          o = i.NONE;
      }
    }
    function Je(c) {
      t.enabled !== !1 && c.preventDefault();
    }
    function Pt(c) {
      S.push(c.pointerId);
    }
    function It(c) {
      delete ye[c.pointerId];
      for (let E = 0; E < S.length; E++)
        if (S[E] == c.pointerId) {
          S.splice(E, 1);
          return;
        }
    }
    function jt(c) {
      for (let E = 0; E < S.length; E++)
        if (S[E] == c.pointerId)
          return !0;
      return !1;
    }
    function yt(c) {
      let E = ye[c.pointerId];
      E === void 0 && (E = new be(), ye[c.pointerId] = E), E.set(c.pageX, c.pageY);
    }
    function Ge(c) {
      const E = c.pointerId === S[0] ? S[1] : S[0];
      return ye[E];
    }
    t.domElement.addEventListener("contextmenu", Je), t.domElement.addEventListener("pointerdown", N), t.domElement.addEventListener("pointercancel", z), t.domElement.addEventListener("wheel", he, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", lt, { passive: !0, capture: !0 }), this.update();
  }
}
function it(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const kt = (e) => {
  const [n, a] = U(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (o) => {
    o !== n && (e.onSelect(o), a(o)), e.onToggle(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ d.jsx("ul", { className: "dropdown-menu", children: e.options.map((o) => /* @__PURE__ */ d.jsx("li", { onClick: () => i(o), children: o }, o)) })
  ] });
}, qe = Pa(function(n, a) {
  const t = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [i, o] = U("Renderer"), [l, s] = U(!1), [h, u] = U(!1), [f, v] = U(!1);
  return /* @__PURE__ */ d.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ d.jsx("div", { ref: a, className: "clickable", onClick: () => {
      f && v(!1);
    } }),
    /* @__PURE__ */ d.jsx(
      kt,
      {
        index: t.indexOf(i),
        open: h,
        options: t,
        onSelect: (b) => {
          if (b === i)
            return;
          const x = b;
          n.onSelectRenderMode(x), o(x);
        },
        onToggle: (b) => {
          l && s(!1), u(b);
        },
        up: !0
      }
    ),
    /* @__PURE__ */ d.jsx(
      kt,
      {
        index: n.options.indexOf(n.camera.name),
        open: f,
        options: n.options,
        onSelect: n.onSelectCamera,
        onToggle: (b) => {
          v(b);
        },
        up: !0
      }
    )
  ] });
});
class Mi extends $n {
  constructor(n) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: ya,
      side: On,
      transparent: !0,
      uniforms: {
        uScale: {
          value: n?.scale !== void 0 ? n?.scale : 0.1
        },
        uDivisions: {
          value: n?.divisions !== void 0 ? n?.divisions : 10
        },
        uColor: {
          value: n?.color !== void 0 ? n?.color : new qt(16777215)
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
class Oi extends Vt {
  gridMaterial;
  constructor() {
    const n = new Mi();
    super(new Ea(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ri = `#include <common>
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
}`, Ti = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class _i extends $n {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ri,
      fragmentShader: Ti
    });
  }
}
let De, Ft = !1, K = null, se = null, je = null, Ne = null, rt = "Renderer", wt = "Renderer", xn = "Renderer", Sn = "Renderer";
function Hi(e) {
  const n = e.three.app.appID, a = oe(() => /* @__PURE__ */ new Map(), []), t = oe(() => /* @__PURE__ */ new Map(), []), i = oe(() => /* @__PURE__ */ new Map(), []), o = oe(() => /* @__PURE__ */ new Map(), []), l = oe(() => new Cn(), []), s = oe(() => new xa(), []), h = oe(() => new Oi(), []), u = oe(() => new rn(500), []), f = oe(() => new rn(100), []), v = oe(() => new Sa(), []), b = oe(() => new Ca(), []), x = oe(() => new _i(), []), A = oe(() => new Yt({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function q(m, g) {
    const O = new Ut(-100, 100, 100, -100, 50, 5e3);
    return O.name = m, O.position.copy(g), O.lookAt(0, 0, 0), a.set(m, O), O;
  }
  const $ = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], W = X(null), w = X(null), F = X(null), T = X(null), Z = X(null), ce = X(null), S = localStorage, ye = S.getItem(`${n}_mode`), [Y, ot] = U(ye !== null ? ye : "Single"), [_, Pe] = U(null), [le, Ee] = U(!1), [Re, xe] = U(!1), [Te, Ue] = U("Orbit"), [Le, Be] = U(!1), [He, $e] = U(Date.now());
  S.setItem(`${n}_mode`, Y), S.setItem(`${n}_tlCam`, S.getItem(`${n}_tlCam`) !== null ? S.getItem(`${n}_tlCam`) : "Debug"), S.setItem(`${n}_trCam`, S.getItem(`${n}_trCam`) !== null ? S.getItem(`${n}_trCam`) : "Orthographic"), S.setItem(`${n}_blCam`, S.getItem(`${n}_blCam`) !== null ? S.getItem(`${n}_blCam`) : "Front"), S.setItem(`${n}_brCam`, S.getItem(`${n}_brCam`) !== null ? S.getItem(`${n}_brCam`) : "Top"), S.setItem(`${n}_tlRender`, S.getItem(`${n}_tlRender`) !== null ? S.getItem(`${n}_tlRender`) : "Renderer"), S.setItem(`${n}_trRender`, S.getItem(`${n}_trRender`) !== null ? S.getItem(`${n}_trRender`) : "Renderer"), S.setItem(`${n}_blRender`, S.getItem(`${n}_blRender`) !== null ? S.getItem(`${n}_blRender`) : "Renderer"), S.setItem(`${n}_brRender`, S.getItem(`${n}_brRender`) !== null ? S.getItem(`${n}_brRender`) : "Renderer");
  const te = (m, g) => {
    const O = t.get(m.name);
    if (O !== void 0 && O.dispose(), t.delete(m.name), m.name === "UI")
      return;
    const j = new wi(m, g);
    switch (j.enableDamping = !0, j.dampingFactor = 0.05, m.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        j.enableRotate = !1;
        break;
    }
    t.set(m.name, j);
  }, _e = (m) => {
    const g = i.get(m.name);
    g !== void 0 && (l.remove(g), g.dispose(), i.delete(m.name));
    const O = t.get(m.name);
    O !== void 0 && (O.dispose(), t.delete(m.name));
  }, ct = () => {
    t.forEach((m, g) => {
      m.dispose();
      const O = i.get(g);
      O !== void 0 && (l.remove(O), O.dispose()), i.delete(g), t.delete(g);
    }), t.clear(), i.clear();
  }, Ye = () => {
    switch (Y) {
      case "Single":
        te(K, F.current);
        break;
      case "Side by Side":
      case "Stacked":
        te(K, F.current), te(se, T.current);
        break;
      case "Quad":
        te(K, F.current), te(se, T.current), te(je, Z.current), te(Ne, ce.current);
        break;
    }
  };
  Ae(() => {
    const m = new wa({
      canvas: W.current,
      stencil: !1
    });
    m.autoClear = !1, m.shadowMap.enabled = !0, m.setPixelRatio(devicePixelRatio), m.setClearColor(0), e.three.renderer = m, Pe(m);
  }, []), Ae(() => {
    l.name = "Debug Scene", l.uuid = "", s.name = "helpers", l.add(s), s.add(h), u.name = "axisHelper", s.add(u), f.name = "interactionHelper", s.add(f), f.visible = !1, q("Top", new J(0, 1e3, 0)), q("Bottom", new J(0, -1e3, 0)), q("Left", new J(-1e3, 0, 0)), q("Right", new J(1e3, 0, 0)), q("Front", new J(0, 0, 1e3)), q("Back", new J(0, 0, -1e3)), q("Orthographic", new J(1e3, 1e3, 1e3)), q("UI", new J());
    const m = new Nt(60, 1, 50, 5e3);
    m.name = "Debug", m.position.set(500, 500, 500), m.lookAt(0, 0, 0), a.set("Debug", m), K = a.get(S.getItem(`${n}_tlCam`)), se = a.get(S.getItem(`${n}_trCam`)), je = a.get(S.getItem(`${n}_blCam`)), Ne = a.get(S.getItem(`${n}_brCam`)), K === void 0 && (K = a.get("Debug")), se === void 0 && (se = a.get("Orthographic")), je === void 0 && (je = a.get("Front")), Ne === void 0 && (Ne = a.get("Top"));
  }, []), Ae(() => {
    const m = () => {
      o.forEach((M) => {
        s.remove(M), M.dispose();
      }), o.clear();
    }, g = () => {
      De.traverse((M) => {
        if (M.type.search("Light") > -1) {
          let C;
          switch (M.type) {
            case "DirectionalLight":
              C = new ka(M, 100), C.name = `${M.name}Helper`, o.set(M.name, C), s.add(C);
              break;
            case "HemisphereLight":
              C = new _a(M, 250), C.name = `${M.name}Helper`, o.set(M.name, C), s.add(C);
              break;
            case "RectAreaLight":
              C = new Si(M), C.name = `${M.name}Helper`, o.set(M.name, C), s.add(C);
              break;
            case "PointLight":
              C = new Ta(M, 100), C.name = `${M.name}Helper`, o.set(M.name, C), s.add(C);
              break;
            case "SpotLight":
              C = new Ra(M), C.name = `${M.name}Helper`, o.set(M.name, C), s.add(C);
              break;
          }
        }
      });
    }, O = (M) => {
      s.add(u), m(), Tt(De), l.remove(De);
      const C = e.scenes.get(M.value.name);
      if (C !== void 0) {
        const H = new C();
        e.onSceneSet !== void 0 && e.onSceneSet(H), De = H, e.three.scene = De, l.add(De), Ft = !0, g();
      }
    }, j = (M) => {
      const C = M.value, H = e.three.scene?.getObjectByProperty("uuid", C.uuid);
      if (H !== void 0 && a.set(C.name, H), H instanceof Nt) {
        const ie = new Oa(H);
        i.set(H.name, ie), l.add(ie);
      }
      $e(Date.now());
    }, ge = (M) => {
      const C = i.get(M.value.name);
      C !== void 0 && (l.remove(C), C.dispose()), a.delete(M.value.name), $e(Date.now());
    }, ue = (M) => {
      const C = De.getObjectByProperty("uuid", M.value.uuid);
      C && C.add(u);
    };
    return k.addEventListener(D.SET_SCENE, O), k.addEventListener(D.ADD_CAMERA, j), k.addEventListener(D.REMOVE_CAMERA, ge), k.addEventListener(D.SET_OBJECT, ue), () => {
      k.removeEventListener(D.SET_SCENE, O), k.removeEventListener(D.ADD_CAMERA, j), k.removeEventListener(D.REMOVE_CAMERA, ge), k.removeEventListener(D.SET_OBJECT, ue);
    };
  }, []), Ae(() => {
    if (_ === null)
      return;
    let m = window.innerWidth, g = window.innerHeight, O = Math.floor(m / 2), j = Math.floor(g / 2), ge = -1;
    const ue = () => {
      m = window.innerWidth - 300, g = window.innerHeight, O = Math.floor(m / 2), j = Math.floor(g / 2), e.three.resize(m, g), e.onSceneResize !== void 0 && Ft && e.onSceneResize(De, m, g);
      let N = m, ne = g;
      switch (Y) {
        case "Side by Side":
          N = O, ne = g;
          break;
        case "Stacked":
          N = m, ne = j;
          break;
        case "Quad":
          N = O, ne = j;
          break;
      }
      a.forEach((z) => {
        z instanceof Ut ? (z.left = N / -2, z.right = N / 2, z.top = ne / 2, z.bottom = ne / -2, z.name === "UI" && (z.position.x = m / 2, z.position.y = g / -2, z.position.z = 100), z.updateProjectionMatrix()) : z instanceof Nt && (z.aspect = N / ne, z.updateProjectionMatrix(), i.get(z.name)?.update());
      });
    };
    function M(N) {
      switch (N) {
        case "Depth":
          return v;
        case "Normals":
          return b;
        case "Renderer":
          return null;
        case "UVs":
          return x;
        case "Wireframe":
          return A;
      }
      return null;
    }
    const C = () => {
      const N = M(rt);
      l.overrideMaterial = N, _.setViewport(0, 0, m, g), _.setScissor(0, 0, m, g), _.render(l, K);
    }, H = () => {
      const N = M(rt), ne = M(wt);
      if (l.overrideMaterial = N, Y === "Side by Side")
        _.setViewport(0, 0, O, g), _.setScissor(0, 0, O, g), _.render(l, K), l.overrideMaterial = ne, _.setViewport(O, 0, O, g), _.setScissor(O, 0, O, g), _.render(l, se);
      else {
        const z = g - j;
        _.setViewport(0, z, m, j), _.setScissor(0, z, m, j), _.render(l, K), l.overrideMaterial = ne, _.setViewport(0, 0, m, j), _.setScissor(0, 0, m, j), _.render(l, se);
      }
    }, ie = () => {
      const N = M(rt), ne = M(wt), z = M(xn), Ie = M(Sn);
      let de = 0, he = 0;
      he = g - j, de = 0, l.overrideMaterial = N, _.setViewport(de, he, O, j), _.setScissor(de, he, O, j), _.render(l, K), de = O, l.overrideMaterial = ne, _.setViewport(de, he, O, j), _.setScissor(de, he, O, j), _.render(l, se), he = 0, de = 0, l.overrideMaterial = z, _.setViewport(de, he, O, j), _.setScissor(de, he, O, j), _.render(l, je), de = O, l.overrideMaterial = Ie, _.setViewport(de, he, O, j), _.setScissor(de, he, O, j), _.render(l, Ne);
    }, Se = () => {
      switch (t.forEach((N) => {
        N.update();
      }), i.forEach((N) => {
        N.update();
      }), o.forEach((N) => {
        N.update !== void 0 && N.update();
      }), e.onSceneUpdate !== void 0 && Ft && e.onSceneUpdate(De), _.clear(), Y) {
        case "Single":
          C();
          break;
        case "Side by Side":
        case "Stacked":
          H();
          break;
        case "Quad":
          ie();
          break;
      }
      ge = requestAnimationFrame(Se);
    };
    return Ye(), window.addEventListener("resize", ue), ue(), Se(), () => {
      window.removeEventListener("resize", ue), cancelAnimationFrame(ge), ge = -1;
    };
  }, [Y, _]), Ae(() => {
    if (_ !== null) {
      const m = new Ma(), g = new be(), O = (M, C, H, ie) => {
        switch (Y) {
          case "Quad":
            M < H ? C < ie ? m.setFromCamera(g, K) : m.setFromCamera(g, je) : C < ie ? m.setFromCamera(g, se) : m.setFromCamera(g, Ne);
            break;
          case "Side by Side":
            M < H ? m.setFromCamera(g, K) : m.setFromCamera(g, se);
            break;
          case "Single":
            m.setFromCamera(g, K);
            break;
          case "Stacked":
            C < ie ? m.setFromCamera(g, K) : m.setFromCamera(g, se);
            break;
        }
      }, j = (M) => {
        if (Te === "Orbit")
          return;
        const C = new be();
        _.getSize(C);
        const H = Math.min(M.clientX, C.x), ie = Math.min(M.clientY, C.y);
        g.x = it(H, 0, C.x, -1, 1), g.y = it(ie, 0, C.y, 1, -1);
        const Se = C.x / 2, N = C.y / 2, ne = () => {
          H < Se ? g.x = it(H, 0, Se, -1, 1) : g.x = it(H, Se, C.x, -1, 1);
        }, z = () => {
          ie < N ? g.y = it(ie, 0, N, 1, -1) : g.y = it(ie, N, C.y, 1, -1);
        };
        switch (Y) {
          case "Quad":
            ne(), z();
            break;
          case "Side by Side":
            ne();
            break;
          case "Stacked":
            z(), z();
            break;
        }
        O(H, ie, Se, N);
        const Ie = m.intersectObjects(De.children);
        Ie.length > 0 && f.position.copy(Ie[0].point);
      }, ge = (M) => {
        if (Te === "Orbit")
          return;
        const C = new be();
        if (_.getSize(C), M.clientX >= C.x)
          return;
        j(M);
        const H = m.intersectObjects(De.children);
        H.length > 0 && (e.three.getObject(H[0].object.uuid), f.visible = !1, Ue("Orbit"), $e(Date.now()));
      }, ue = w.current;
      return ue.addEventListener("mousemove", j, !1), ue.addEventListener("click", ge, !1), () => {
        ue.removeEventListener("mousemove", j), ue.removeEventListener("click", ge);
      };
    }
  }, [Y, _, Te]);
  const pe = [];
  return a.forEach((m, g) => {
    pe.push(g);
  }), /* @__PURE__ */ d.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ d.jsx("canvas", { ref: W }),
    _ !== null && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: `cameras ${Y === "Single" || Y === "Stacked" ? "single" : ""}`, ref: w, children: [
        Y === "Single" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx(
          qe,
          {
            camera: K,
            options: pe,
            ref: F,
            onSelectCamera: (m) => {
              t.get(K.name)?.dispose();
              const g = a.get(m);
              g !== void 0 && (_e(K), K = g, S.setItem(`${n}_tlCam`, g.name), te(g, F.current));
            },
            onSelectRenderMode: (m) => {
              rt = m, S.setItem(`${n}_tlRender`, m);
            }
          }
        ) }),
        (Y === "Side by Side" || Y === "Stacked") && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            qe,
            {
              camera: K,
              options: pe,
              ref: F,
              onSelectCamera: (m) => {
                t.get(K.name)?.dispose();
                const g = a.get(m);
                g !== void 0 && (_e(K), K = g, S.setItem(`${n}_tlCam`, g.name), te(g, F.current));
              },
              onSelectRenderMode: (m) => {
                rt = m, S.setItem(`${n}_tlRender`, m);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            qe,
            {
              camera: se,
              options: pe,
              ref: T,
              onSelectCamera: (m) => {
                t.get(se.name)?.dispose();
                const g = a.get(m);
                g !== void 0 && (_e(se), se = g, S.setItem(`${n}_trCam`, g.name), te(g, T.current));
              },
              onSelectRenderMode: (m) => {
                wt = m, S.setItem(`${n}_trRender`, m);
              }
            }
          )
        ] }),
        Y === "Quad" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            qe,
            {
              camera: K,
              options: pe,
              ref: F,
              onSelectCamera: (m) => {
                t.get(K.name)?.dispose();
                const g = a.get(m);
                g !== void 0 && (_e(K), K = g, S.setItem(`${n}_tlCam`, g.name), te(g, F.current));
              },
              onSelectRenderMode: (m) => {
                rt = m, S.setItem(`${n}_tlRender`, m);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            qe,
            {
              camera: se,
              options: pe,
              ref: T,
              onSelectCamera: (m) => {
                t.get(se.name)?.dispose();
                const g = a.get(m);
                g !== void 0 && (_e(se), se = g, S.setItem(`${n}_trCam`, g.name), te(g, T.current));
              },
              onSelectRenderMode: (m) => {
                wt = m, S.setItem(`${n}_trRender`, m);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            qe,
            {
              camera: je,
              options: pe,
              ref: Z,
              onSelectCamera: (m) => {
                t.get(je.name)?.dispose();
                const g = a.get(m);
                g !== void 0 && (_e(je), je = g, S.setItem(`${n}_blCam`, g.name), te(g, Z.current));
              },
              onSelectRenderMode: (m) => {
                xn = m, S.setItem(`${n}_blRender`, m);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            qe,
            {
              camera: Ne,
              options: pe,
              ref: ce,
              onSelectCamera: (m) => {
                t.get(Ne.name)?.dispose();
                const g = a.get(m);
                g !== void 0 && (_e(Ne), Ne = g, S.setItem(`${n}_brCam`, g.name), te(g, ce.current));
              },
              onSelectRenderMode: (m) => {
                Sn = m, S.setItem(`${n}_brRender`, m);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ d.jsx(
          kt,
          {
            index: $.indexOf(Y),
            options: $,
            onSelect: (m) => {
              m !== Y && (ct(), ot(m));
            },
            open: le,
            onToggle: (m) => {
              Ee(m), Re && xe(!1), Le && Be(!1);
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          kt,
          {
            index: Te === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (m) => {
              f.visible = m === "Selection Mode", Ue(f.visible ? "Selection" : "Orbit");
            },
            open: Le,
            onToggle: (m) => {
              le && Ee(!1), Re && xe(!1), Be(m);
            }
          }
        )
      ] }, He)
    ] })
  ] });
}
function Yi(e) {
  return /* @__PURE__ */ d.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ d.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ d.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  _t as Accordion,
  Li as Application,
  Dt as BaseRemote,
  Yn as ChildObject,
  hn as ContainerObject,
  qa as Draggable,
  Va as DraggableItem,
  Ka as Dropdown,
  Xa as DropdownItem,
  Yi as Editor,
  Mt as ExportTexture,
  xi as Inspector,
  Hi as MultiView,
  Hn as NavButton,
  Bi as RemoteComponents,
  zi as RemoteController,
  Xt as RemoteTheatre,
  Ui as RemoteThree,
  $i as RemoteTweakpane,
  Wi as SceneInspector,
  Gi as SidePanel,
  D as ToolEvents,
  Rt as capitalize,
  Ke as clamp,
  Na as colorToHex,
  k as debugDispatcher,
  Ii as defaultTheatreCallback,
  Tt as dispose,
  La as disposeMaterial,
  Ni as disposeTexture,
  ji as distance,
  Gt as hierarchyUUID,
  ja as isColor,
  on as mix,
  Kt as noop,
  sn as normalize,
  Ia as randomID,
  ln as resetThreeObjects,
  cn as round,
  Fi as theatreEditorApp,
  zt as totalThreeObjects
};
