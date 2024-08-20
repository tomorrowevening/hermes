import { OrthographicCamera as Ti, Scene as _n, MeshBasicMaterial as Li, BufferGeometry as xi, Float32BufferAttribute as Vt, Mesh as oi, LinearSRGBColorSpace as ji, EventDispatcher as gn, Texture as $n, RepeatWrapping as zi, WebGLRenderTarget as Zn, Color as ci, FrontSide as Wn, BackSide as vn, DoubleSide as yn, NoBlending as Kn, NormalBlending as Xn, AdditiveBlending as qn, SubtractiveBlending as Jn, MultiplyBlending as Qn, CustomBlending as es, AddEquation as ts, SubtractEquation as is, ReverseSubtractEquation as ns, MinEquation as ss, MaxEquation as as, ZeroFactor as En, OneFactor as bn, SrcColorFactor as On, OneMinusSrcColorFactor as Cn, SrcAlphaFactor as Tn, OneMinusSrcAlphaFactor as xn, DstAlphaFactor as Sn, OneMinusDstAlphaFactor as wn, DstColorFactor as Mn, OneMinusDstColorFactor as Rn, SrcAlphaSaturateFactor as rs, ConstantColorFactor as Dn, OneMinusConstantColorFactor as An, ConstantAlphaFactor as Pn, OneMinusConstantAlphaFactor as Ln, Matrix4 as kn, Vector3 as le, Euler as os, Line as cs, LineBasicMaterial as ls, Ray as ds, Plane as hs, MathUtils as us, MOUSE as Tt, TOUCH as xt, Quaternion as Si, Spherical as wi, Vector2 as Re, ShaderMaterial as In, GLSL3 as ms, PlaneGeometry as ps, Group as fs, AxesHelper as Bi, MeshDepthMaterial as _s, MeshNormalMaterial as gs, WebGLRenderer as vs, PerspectiveCamera as mi, Raycaster as Hi, CameraHelper as ys, Vector4 as Es, Box3 as bs, Sphere as Os, SpotLightHelper as Cs, PointLightHelper as Ts, HemisphereLightHelper as xs, DirectionalLightHelper as Ss, SkinnedMesh as ws, Clock as Ms } from "three";
import { Pane as Rs } from "tweakpane";
import * as Ds from "@tweakpane/plugin-essentials";
import Un, { useState as Z, useRef as re, useEffect as $e, useMemo as Ce, forwardRef as As } from "react";
import { Reorder as Fn } from "framer-motion";
const ki = () => {
}, Ua = () => {
};
function ni(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function yt(i, e, n) {
  return Math.min(e, Math.max(i, n));
}
function Yi(i, e, n) {
  return (n - i) / (e - i);
}
function Mi(i, e, n) {
  return i * (1 - n) + e * n;
}
function Fa(i, e) {
  const n = i - e;
  return Math.sqrt(n * n);
}
function Ps() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ls(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function Vi(i) {
  const e = Math.round(i.r * 255), n = Math.round(i.g * 255), t = Math.round(i.b * 255), s = (h) => {
    const c = h.toString(16);
    return c.length === 1 ? "0" + c : c;
  }, a = s(e), o = s(n), r = s(t);
  return "#" + a + o + r;
}
function Gi(i, e = 1) {
  return Number(i.toFixed(e));
}
let Ri = 0;
const $i = () => {
  Ri = 0;
}, Di = (i) => {
  if (!i)
    return;
  let e = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${Ri}`, Ri++), i.parent !== null && i.parent.uuid.length > 0 && (e = `${i.parent.uuid}.${e}`), i.uuid = e, i.isMesh !== void 0) {
    const n = i;
    if (Array.isArray(n.material))
      n.material.forEach((t, s) => {
        t.uuid = `${e}.material.${s}`;
      });
    else {
      const t = n.material;
      t.uuid = `${e}.material`;
    }
  }
  i.children.forEach((n) => Di(n));
}, Na = (i) => {
  i?.dispose();
}, ks = (i) => {
  i && (Array.isArray(i) ? i.forEach((e) => e.dispose()) : i.dispose());
}, si = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const e = i.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : si(e);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const e = i;
      e.geometry?.dispose(), ks(e.material);
    }
    i.dispose !== void 0 && i.dispose();
  }
};
class ti {
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
  static renderToBlob(e) {
    this.init();
    const n = e.repeat.clone(), t = e.offset.clone();
    if (e.repeat.set(1, 1), e.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const s = e.image;
      if (s != null && s.width > 0) {
        this.canvas.title = e.sourceFile;
        const a = this.canvas.width / s.width, o = this.renderToCanvas(e);
        this.context.drawImage(o, 0, 0, s.width * a, s.height * a);
      }
    }
    return e.repeat.copy(n), e.offset.copy(t), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(e) {
    if (this.material === null) {
      this.camera = new Ti(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new _n(), this.material = new Li();
      const n = new xi();
      n.setAttribute("position", new Vt([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), n.setAttribute("normal", new Vt([0, 0, 1, 0, 0, 1], 3)), n.setAttribute("uv", new Vt([0, 0, 2, 0, 0, 2], 2));
      const t = new oi(n, this.material);
      this.scene.add(t);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const n = this.renderer.outputColorSpace, t = e.colorSpace;
      this.renderer.outputColorSpace = ji, e.colorSpace = ji, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = n, e.colorSpace = t;
    }
    return this.renderer.domElement;
  }
}
class ja {
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
  constructor(e, n, t = !0) {
    this._appID = e, this._debugEnabled = n, n && (this._useBC = t, t ? (this._broadcastChannel = new BroadcastChannel(e), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(e), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(e, n) {
    this.components.set(e, n);
  }
  dispose() {
    this._broadcastChannel !== void 0 && this._broadcastChannel.removeEventListener("message", this.messageHandler), this._webSocket !== void 0 && (this._webSocket.removeEventListener("open", this.openHandler), this._webSocket.removeEventListener("close", this.closeHandler), this._webSocket.removeEventListener("message", this.messageHandler)), this.components.forEach((e) => {
      e.dispose();
    }), this.components.clear();
  }
  // Remote
  send(e) {
    this._mode !== e.target && (this._useBC ? this._broadcastChannel?.postMessage(e) : this._connected && this._webSocket?.send(JSON.stringify(e)));
  }
  messageHandler = (e) => {
    this.listen !== void 0 && (this._useBC ? this.listen(e.data) : this.listen(JSON.parse(e.data)));
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
  set editor(e) {
    e && (this._mode = "editor");
  }
}
const U = new gn(), F = {
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
  REMOVE_CAMERA: "ToolEvents::removeCamera",
  // Custom
  ADD_GROUP: "ToolEvents::addGroup",
  REMOVE_GROUP: "ToolEvents::removeGroup"
};
class li {
  app;
  constructor(e) {
    this.app = e;
  }
  dispose() {
  }
  handleApp(e, n, t) {
  }
  handleEditor(e, n, t) {
  }
}
class za extends li {
  selectDropdown(e, n) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: e,
        value: n
      }
    });
  }
  updateDropdown(e, n) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: e,
        value: n
      }
    });
  }
  handleApp(e, n, t) {
    switch (t.event) {
      case "selectComponent":
        U.dispatchEvent({ type: F.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        U.dispatchEvent({ type: F.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Ii extends li {
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
  getSheetInstance(e, n) {
    return n !== void 0 ? `${e}-${n}` : e;
  }
  sheet(e, n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = this.getSheetInstance(e, n);
    let s = this.sheets.get(t);
    return s !== void 0 || (s = this.project?.sheet(e, n), this.sheets.set(t, s)), s;
  }
  playSheet(e, n, t) {
    this.sheet(e, t)?.sequence.play(n), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: e,
        instance: t,
        value: n
      }
    });
  }
  pauseSheet(e, n) {
    this.sheet(e)?.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: e,
        instance: n
      }
    });
  }
  clearSheetObjects(e) {
    this.sheetObjects.forEach((n, t) => {
      t.search(`${e}_`) > -1 && this.unsubscribe(n);
    });
  }
  sheetObject(e, n, t, s, a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const o = this.sheet(e, a);
    if (o === void 0)
      return;
    const h = `${this.getSheetInstance(e, a)}_${n}`;
    let c = this.sheetObjects.get(h);
    c !== void 0 ? c = o.object(n, { ...t, ...c.value }, { reconfigure: !0 }) : c = o.object(n, t), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, s !== void 0 ? s : ki);
    const u = c.onValuesChange((p) => {
      if (this.app.editor) {
        for (const v in p) {
          const R = p[v];
          typeof R == "object" && Ls(R) && (p[v] = {
            r: R.r,
            g: R.g,
            b: R.b,
            a: R.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: e,
            sheetObject: h,
            values: p
          }
        });
      }
      const g = this.sheetObjectCBs.get(h);
      g !== void 0 && g(p);
    });
    return this.sheetObjectUnsubscribe.set(h, u), c;
  }
  unsubscribe(e) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const n = e.address.sheetId, t = e.address.objectKey;
    this.sheets.get(n)?.detachObject(t);
    const a = `${n}_${t}`, o = this.sheetObjectUnsubscribe.get(a);
    o !== void 0 && (this.sheetObjects.delete(a), this.sheetObjectCBs.delete(a), this.sheetObjectUnsubscribe.delete(a), o());
  }
  handleApp(e, n, t) {
    const s = n;
    let a;
    switch (t.event) {
      case "setSheet":
        a = s.sheets.get(t.data.sheet), a !== void 0 && (s.activeSheet = a, this.studio?.setSelection([a]));
        break;
      case "setSheetObject":
        a = s.sheetObjects.get(`${t.data.sheet}_${t.data.key}`), a !== void 0 && this.studio?.setSelection([a]);
        break;
      case "updateSheetObject":
        a = s.sheets.get(t.data.sheet), a !== void 0 && a.sequence.pause(), a = s.sheetObjectCBs.get(t.data.sheetObject), a !== void 0 && a(t.data.values);
        break;
      case "updateTimeline":
        a = s.sheets.get(t.data.sheet), s.activeSheet !== void 0 && (s.activeSheet.sequence.position = t.data.position);
        break;
    }
  }
  handleEditor(e, n, t) {
    if (e.editor) {
      const s = n;
      switch (t.event) {
        case "playSheet":
          s.sheet(t.data.sheet, t.data.instance)?.sequence.play(t.data.value);
          break;
        case "pauseSheet":
          s.sheet(t.data.sheet, t.data.instance)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(e, n) {
    if (e.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((o) => {
        o.length < 1 || o.forEach((r) => {
          let h = r.address.sheetId, c = "setSheet", u = {};
          switch (r.type) {
            case "Theatre_Sheet_PublicAPI":
              c = "setSheet", u = {
                sheet: r.address.sheetId
              }, n.activeSheet = n.sheets.get(r.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              c = "setSheetObject", h += `_${r.address.objectKey}`, u = {
                id: h,
                sheet: r.address.sheetId,
                key: r.address.objectKey
              }, n.activeSheet = n.sheets.get(r.address.sheetId);
              break;
          }
          e.send({ event: c, target: "app", data: u });
        });
      });
      let t = -1;
      const s = () => {
        if (Ii.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
          t = n.activeSheet.sequence.position;
          const o = n.activeSheet;
          e.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: t,
              sheet: o.address.sheetId
            }
          });
        }
      }, a = () => {
        s(), requestAnimationFrame(a);
      };
      s(), a();
    } else
      this.studio?.ui.hide();
  }
}
function Ba(i, e, n) {
  if (i.editor) {
    n.ui.restore(), n.onSelectionChange((o) => {
      o.length < 1 || o.forEach((r) => {
        let h = r.address.sheetId, c = "setSheet", u = {};
        switch (r.type) {
          case "Theatre_Sheet_PublicAPI":
            c = "setSheet", u = {
              sheet: r.address.sheetId
            }, e.activeSheet = e.sheets.get(r.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            c = "setSheetObject", h += `_${r.address.objectKey}`, u = {
              id: h,
              sheet: r.address.sheetId,
              key: r.address.objectKey
            }, e.activeSheet = e.sheets.get(r.address.sheetId);
            break;
        }
        i.send({ event: c, target: "app", data: u });
      });
    });
    let t = -1;
    const s = () => {
      if (Ii.rafDriver?.tick(performance.now()), e.activeSheet !== void 0 && t !== e.activeSheet.sequence.position) {
        t = e.activeSheet.sequence.position;
        const o = e.activeSheet;
        i.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: t,
            sheet: o.address.sheetId
          }
        });
      }
    }, a = () => {
      s(), requestAnimationFrame(a);
    };
    s(), a();
  } else
    n.ui.hide();
}
function Is(i) {
  if (i.name === "cameras")
    return "camera";
  if (i.name === "interactive")
    return "interactive";
  if (i.name === "lights")
    return "light";
  if (i.name === "ui")
    return "ui";
  if (i.name === "utils")
    return "utils";
  const e = i.type;
  return e.search("Helper") > -1 ? "icon_utils" : e.search("Camera") > -1 ? "camera" : e.search("Light") > -1 ? "light" : "obj3D";
}
function Lt(i) {
  const e = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    children: []
  };
  return i.children.forEach((n) => {
    e.children.push(Lt(n));
  }), e;
}
function Us(i) {
  const e = {};
  for (const n in i) {
    const t = i[n].value;
    e[n] = { value: t }, t === null ? e[n].value = {
      src: "",
      offset: [0, 0],
      repeat: [1, 1]
    } : t !== void 0 && t.isTexture && (e[n].value = {
      src: t.image.src,
      offset: [t.offset.x, t.offset.y],
      repeat: [t.repeat.x, t.repeat.y]
    });
  }
  return e;
}
function Fs(i) {
  switch (i) {
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
function St(i) {
  const e = {};
  for (const n in i) {
    if (n.substring(0, 1) === "_" || n.substring(0, 2) === "is" || Fs(n))
      continue;
    const t = typeof i[n], s = i[n];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        e[n] = s;
        break;
      case "object":
        s !== null ? (e[n] = s, s.isTexture ? e[n] = {
          src: ti.renderToBlob(s),
          offset: [s.offset.x, s.offset.y],
          repeat: [s.repeat.x, s.repeat.y]
        } : n === "uniforms" && (e[n] = Us(e[n]))) : n === "glslVersion" ? e[n] = "" : e[n] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return e;
}
function pi(i) {
  i.updateMatrix();
  const e = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    visible: i.visible,
    matrix: i.matrix.elements,
    animations: [],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0,
    children: []
  };
  i.animations.forEach((t) => {
    e.animations.push({
      name: t.name,
      duration: t.duration,
      blendMode: t.blendMode
    });
  });
  const n = i.type.toLowerCase();
  if (n.search("mesh") > -1) {
    const t = i;
    if (Array.isArray(t.material)) {
      const s = [];
      t.material.forEach((a) => {
        s.push(St(a));
      }), e.material = s;
    } else
      e.material = St(t.material);
  } else if (n.search("points") > -1) {
    const t = i;
    if (Array.isArray(t.material)) {
      const s = [];
      t.material.forEach((a) => {
        s.push(St(a));
      }), e.material = s;
    } else
      e.material = St(t.material);
  } else if (n.search("line") > -1) {
    const t = i;
    if (Array.isArray(t.material)) {
      const s = [];
      t.material.forEach((a) => {
        s.push(St(a));
      }), e.material = s;
    } else
      e.material = St(t.material);
  } else
    n.search("camera") > -1 ? i.type === "PerspectiveCamera" ? e.perspectiveCameraInfo = {
      fov: i.fov,
      zoom: i.zoom,
      near: i.near,
      far: i.far,
      focus: i.focus,
      aspect: i.aspect,
      filmGauge: i.filmGauge,
      filmOffset: i.filmOffset
    } : i.type === "OrthographicCamera" && (e.orthographicCameraInfo = {
      zoom: i.zoom,
      near: i.near,
      far: i.far,
      left: i.left,
      right: i.right,
      top: i.top,
      bottom: i.bottom
    }) : n.search("light") > -1 && (e.lightInfo = {
      color: i.color,
      intensity: i.intensity,
      decay: i.decay,
      distance: i.distance,
      angle: i.angle,
      penumbra: i.penumbra,
      groundColor: i.groundColor,
      width: i.width,
      height: i.height
    });
  return e;
}
function Ns(i, e) {
  const n = e.split(".");
  switch (n.length) {
    case 1:
      return i[n[0]];
    case 2:
      return i[n[0]][n[1]];
    case 3:
      return i[n[0]][n[1]][n[2]];
    case 4:
      return i[n[0]][n[1]][n[2]][n[3]];
    case 5:
      return i[n[0]][n[1]][n[2]][n[3]][n[4]];
    case 6:
      return i[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]];
  }
}
function js(i, e) {
  for (const n in e)
    i[n] = e[n];
}
function ge(i, e, n) {
  if (i === void 0)
    return;
  const t = e.split("."), s = t.length;
  if (typeof n != "object")
    switch (s) {
      case 1:
        i[t[0]] = n;
        break;
      case 2:
        i[t[0]][t[1]] = n;
        break;
      case 3:
        i[t[0]][t[1]][t[2]] = n;
        break;
      case 4:
        i[t[0]][t[1]][t[2]][t[3]] = n;
        break;
      case 5:
        i[t[0]][t[1]][t[2]][t[3]][t[4]] = n;
        break;
    }
  else {
    let o;
    switch (s) {
      case 1:
        o = i[t[0]];
        break;
      case 2:
        o = i[t[0]][t[1]];
        break;
      case 3:
        o = i[t[0]][t[1]][t[2]];
        break;
      case 4:
        o = i[t[0]][t[1]][t[2]][t[3]];
        break;
      case 5:
        o = i[t[0]][t[1]][t[2]][t[3]][t[4]];
        break;
    }
    o != null && js(o, n);
  }
}
function Nn(i) {
  return new Promise((e, n) => {
    const t = new Image();
    t.onload = () => {
      const s = new $n(t);
      s.wrapS = zi, s.wrapT = zi, s.needsUpdate = !0, e(s);
    }, t.onerror = n, t.src = i;
  });
}
class Ha extends li {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((e) => {
      si(e);
    }), this.scenes.clear(), this.scene && si(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(e) {
    this.app.debugEnabled && (this.renderer !== void 0 && (ti.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (ti.renderer = this.renderer);
    const n = pi(e);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: n
    });
  }
  requestMethod(e, n, t, s) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: e,
        key: n,
        value: t,
        subitem: s
      }
    });
  }
  updateObject(e, n, t) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: e,
        key: n,
        value: t
      }
    });
  }
  createTexture(e, n, t) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: e,
        key: n,
        value: t
      }
    });
  }
  // Groups
  addGroup(e) {
    this.groups.get(e.title) === void 0 && (this.groups.set(e.title, {
      title: e.title,
      onUpdate: e.onUpdate
    }), this.app.send({
      event: "addGroup",
      target: "editor",
      data: JSON.stringify(e)
    }));
  }
  removeGroup(e) {
    this.groups.get(e) !== void 0 && (this.groups.delete(e), this.app.send({
      event: "removeGroup",
      target: "editor",
      data: e
    }));
  }
  updateGroup(e, n, t) {
    this.app.send({
      event: "updateGroup",
      target: "app",
      data: JSON.stringify({ group: e, prop: n, value: t })
    });
  }
  removeAllGroups() {
    this.groups.forEach((e) => {
      const n = e.title;
      this.groups.delete(n), this.app.send({
        event: "removeGroup",
        target: "editor",
        data: n
      });
    }), this.groups.clear();
  }
  // Scenes
  addScene(e) {
    if (e === void 0 || (this.scenes.set(e.name, e), !this.app.debugEnabled))
      return;
    $i(), Di(e);
    const n = Lt(e);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: n
    });
  }
  refreshScene(e) {
    if (!this.app.debugEnabled)
      return;
    const n = this.scenes.get(e);
    if (n !== void 0) {
      const t = Lt(n);
      this.app.send({
        event: "refreshScene",
        target: "app",
        data: t
      });
    }
  }
  removeScene(e) {
    if (e === void 0 || (this.scenes.delete(e.name), !this.app.debugEnabled))
      return;
    const n = Lt(e);
    this.app.send({
      event: "removeScene",
      target: "editor",
      data: n
    });
  }
  removeAllScenes() {
    this.scenes.forEach((e) => this.removeScene(e));
  }
  getScene(e) {
    let n = null;
    return this.scenes.forEach((t, s) => {
      e.search(s) > -1 && (n = t);
    }), n;
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.app.debugEnabled))
      return;
    this.renderer !== void 0 && (ti.renderer = this.renderer), $i(), Di(e);
    const n = Lt(e);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: n
    });
  }
  // Cameras
  addCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const n = pi(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: n
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const n = pi(e);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: n
    });
  }
  handleApp(e, n, t) {
    const s = n;
    switch (t.event) {
      case "getObject":
        U.dispatchEvent({ type: F.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        U.dispatchEvent({ type: F.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        U.dispatchEvent({ type: F.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        U.dispatchEvent({ type: F.REQUEST_METHOD, value: t.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: Lt(s.scenes.get(t.data.name))
        });
        break;
    }
    if (t.event === "updateGroup") {
      const a = JSON.parse(t.data);
      s.groups.get(a.group)?.onUpdate(a.prop, a.value);
    }
  }
  handleEditor(e, n, t) {
    switch (t.event) {
      case "setObject":
        U.dispatchEvent({ type: F.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        U.dispatchEvent({ type: F.ADD_SCENE, value: t.data });
        break;
      case "refreshScene":
        U.dispatchEvent({ type: F.REFRESH_SCENE, value: t.data });
        break;
      case "removeScene":
        U.dispatchEvent({ type: F.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        U.dispatchEvent({ type: F.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        U.dispatchEvent({ type: F.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        U.dispatchEvent({ type: F.REMOVE_CAMERA, value: t.data });
        break;
      case "addGroup":
        U.dispatchEvent({ type: F.ADD_GROUP, value: t.data });
        break;
      case "removeGroup":
        U.dispatchEvent({ type: F.REMOVE_GROUP, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(e, n) {
    const t = new Zn(32, 32, n);
    t.texture.name = e, this.renderTargets.set(e, t);
  }
  resize(e, n) {
    const t = this.dpr;
    this.rendererWidth = e, this.rendererHeight = n, this.renderTargets.forEach((s) => {
      s.setSize(e * t, n * t);
    }), this.renderer?.setSize(e, n);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(yt(1, 2, e));
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
class Ya extends li {
  bindCBs;
  buttonCBs;
  pane = void 0;
  appCallbacks = 0;
  editorCallbacks = 0;
  inspectorFolder = void 0;
  constructor(e) {
    super(e), this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), e.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Rs({ title: "GUI" }), this.pane.registerPlugin(Ds);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(e, n = void 0, t = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addFolder({
        title: e,
        ...n
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: e,
        params: n,
        parent: t
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(e, n, t, s = void 0) {
    const a = this.bindID, o = t.onChange !== void 0 ? t.onChange : ki;
    this.bindCBs.set(a, o), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(e, n, t).on("change", (h) => {
      this.app.send({
        event: "updateBind",
        target: "app",
        data: {
          id: a,
          value: h.value
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "bindObject",
      target: "app",
      data: {
        id: a,
        name: n,
        params: t,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(e, n) {
    const t = this.bindCBs.get(e);
    t !== void 0 ? t(n) : console.warn(`No callback for: ${e}`, n);
  }
  // Buttons
  button(e, n, t = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, n), this.app.editor ? (this.pane === void 0 && this.createGUI(), (t !== void 0 ? t : this.pane).addButton({ title: e }).on("click", () => {
      this.app.send({
        event: "clickButton",
        target: "app",
        data: {
          id: s
        }
      });
    }), this.editorCallbacks++) : (this.app.send({
      event: "addButton",
      target: "app",
      data: {
        id: s,
        name: e,
        callback: n,
        parent: t
      }
    }), this.appCallbacks++);
  }
  triggerButton(e) {
    const n = this.buttonCBs.get(e);
    n !== void 0 && n();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const e = this.inspectorFolder.children.length - 1;
    for (let n = e; n > -1; --n)
      this.inspectorFolder.remove(this.inspectorFolder.children[n]);
  }
  handleApp(e, n, t) {
    const s = n;
    switch (t.event) {
      case "addFolder":
        s.addFolder(t.data.name, t.data.params, t.data.parent);
        break;
      case "bindObject":
        s.bind(t.data.name, t.data.params, t.data.parent);
        break;
      case "updateBind":
        s.triggerBind(t.data.id, t.data.value);
        break;
      case "addButton":
        s.button(t.data.name, t.data.callback, t.data.parent);
        break;
      case "clickButton":
        s.triggerButton(t.data.id);
        break;
    }
  }
}
var Ai = { exports: {} }, It = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zi;
function zs() {
  if (Zi)
    return It;
  Zi = 1;
  var i = Un, e = Symbol.for("react.element"), n = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, s = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(r, h, c) {
    var u, p = {}, g = null, v = null;
    c !== void 0 && (g = "" + c), h.key !== void 0 && (g = "" + h.key), h.ref !== void 0 && (v = h.ref);
    for (u in h)
      t.call(h, u) && !a.hasOwnProperty(u) && (p[u] = h[u]);
    if (r && r.defaultProps)
      for (u in h = r.defaultProps, h)
        p[u] === void 0 && (p[u] = h[u]);
    return { $$typeof: e, type: r, key: g, ref: v, props: p, _owner: s.current };
  }
  return It.Fragment = n, It.jsx = o, It.jsxs = o, It;
}
var Ut = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wi;
function Bs() {
  return Wi || (Wi = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Un, e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), r = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), R = Symbol.iterator, P = "@@iterator";
    function k(l) {
      if (l === null || typeof l != "object")
        return null;
      var b = R && l[R] || l[P];
      return typeof b == "function" ? b : null;
    }
    var _ = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(l) {
      {
        for (var b = arguments.length, S = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          S[z - 1] = arguments[z];
        x("error", l, S);
      }
    }
    function x(l, b, S) {
      {
        var z = _.ReactDebugCurrentFrame, Q = z.getStackAddendum();
        Q !== "" && (b += "%s", S = S.concat([Q]));
        var se = S.map(function(W) {
          return String(W);
        });
        se.unshift("Warning: " + b), Function.prototype.apply.call(console[l], console, se);
      }
    }
    var O = !1, L = !1, A = !1, C = !1, ie = !1, X;
    X = Symbol.for("react.module.reference");
    function qe(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === t || l === a || ie || l === s || l === c || l === u || C || l === v || O || L || A || typeof l == "object" && l !== null && (l.$$typeof === g || l.$$typeof === p || l.$$typeof === o || l.$$typeof === r || l.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === X || l.getModuleId !== void 0));
    }
    function H(l, b, S) {
      var z = l.displayName;
      if (z)
        return z;
      var Q = b.displayName || b.name || "";
      return Q !== "" ? S + "(" + Q + ")" : S;
    }
    function Ie(l) {
      return l.displayName || "Context";
    }
    function be(l) {
      if (l == null)
        return null;
      if (typeof l.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof l == "function")
        return l.displayName || l.name || null;
      if (typeof l == "string")
        return l;
      switch (l) {
        case t:
          return "Fragment";
        case n:
          return "Portal";
        case a:
          return "Profiler";
        case s:
          return "StrictMode";
        case c:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case r:
            var b = l;
            return Ie(b) + ".Consumer";
          case o:
            var S = l;
            return Ie(S._context) + ".Provider";
          case h:
            return H(l, l.render, "ForwardRef");
          case p:
            var z = l.displayName || null;
            return z !== null ? z : be(l.type) || "Memo";
          case g: {
            var Q = l, se = Q._payload, W = Q._init;
            try {
              return be(W(se));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var xe = Object.assign, Se = 0, Ue, Ze, rt, nt, st, mt, ot;
    function ve() {
    }
    ve.__reactDisabledLog = !0;
    function We() {
      {
        if (Se === 0) {
          Ue = console.log, Ze = console.info, rt = console.warn, nt = console.error, st = console.group, mt = console.groupCollapsed, ot = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: ve,
            writable: !0
          };
          Object.defineProperties(console, {
            info: l,
            log: l,
            warn: l,
            error: l,
            group: l,
            groupCollapsed: l,
            groupEnd: l
          });
        }
        Se++;
      }
    }
    function kt() {
      {
        if (Se--, Se === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: xe({}, l, {
              value: Ue
            }),
            info: xe({}, l, {
              value: Ze
            }),
            warn: xe({}, l, {
              value: rt
            }),
            error: xe({}, l, {
              value: nt
            }),
            group: xe({}, l, {
              value: st
            }),
            groupCollapsed: xe({}, l, {
              value: mt
            }),
            groupEnd: xe({}, l, {
              value: ot
            })
          });
        }
        Se < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var pt = _.ReactCurrentDispatcher, De;
    function E(l, b, S) {
      {
        if (De === void 0)
          try {
            throw Error();
          } catch (Q) {
            var z = Q.stack.trim().match(/\n( *(at )?)/);
            De = z && z[1] || "";
          }
        return `
` + De + l;
      }
    }
    var T = !1, D;
    {
      var I = typeof WeakMap == "function" ? WeakMap : Map;
      D = new I();
    }
    function ue(l, b) {
      if (!l || T)
        return "";
      {
        var S = D.get(l);
        if (S !== void 0)
          return S;
      }
      var z;
      T = !0;
      var Q = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var se;
      se = pt.current, pt.current = null, We();
      try {
        if (b) {
          var W = function() {
            throw Error();
          };
          if (Object.defineProperty(W.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(W, []);
            } catch (at) {
              z = at;
            }
            Reflect.construct(l, [], W);
          } else {
            try {
              W.call();
            } catch (at) {
              z = at;
            }
            l.call(W.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (at) {
            z = at;
          }
          l();
        }
      } catch (at) {
        if (at && z && typeof at.stack == "string") {
          for (var $ = at.stack.split(`
`), Me = z.stack.split(`
`), _e = $.length - 1, Ee = Me.length - 1; _e >= 1 && Ee >= 0 && $[_e] !== Me[Ee]; )
            Ee--;
          for (; _e >= 1 && Ee >= 0; _e--, Ee--)
            if ($[_e] !== Me[Ee]) {
              if (_e !== 1 || Ee !== 1)
                do
                  if (_e--, Ee--, Ee < 0 || $[_e] !== Me[Ee]) {
                    var Be = `
` + $[_e].replace(" at new ", " at ");
                    return l.displayName && Be.includes("<anonymous>") && (Be = Be.replace("<anonymous>", l.displayName)), typeof l == "function" && D.set(l, Be), Be;
                  }
                while (_e >= 1 && Ee >= 0);
              break;
            }
        }
      } finally {
        T = !1, pt.current = se, kt(), Error.prepareStackTrace = Q;
      }
      var Ct = l ? l.displayName || l.name : "", Ni = Ct ? E(Ct) : "";
      return typeof l == "function" && D.set(l, Ni), Ni;
    }
    function ne(l, b, S) {
      return ue(l, !1);
    }
    function M(l) {
      var b = l.prototype;
      return !!(b && b.isReactComponent);
    }
    function N(l, b, S) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return ue(l, M(l));
      if (typeof l == "string")
        return E(l);
      switch (l) {
        case c:
          return E("Suspense");
        case u:
          return E("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case h:
            return ne(l.render);
          case p:
            return N(l.type, b, S);
          case g: {
            var z = l, Q = z._payload, se = z._init;
            try {
              return N(se(Q), b, S);
            } catch {
            }
          }
        }
      return "";
    }
    var ye = Object.prototype.hasOwnProperty, Le = {}, Je = _.ReactDebugCurrentFrame;
    function G(l) {
      if (l) {
        var b = l._owner, S = N(l.type, l._source, b ? b.type : null);
        Je.setExtraStackFrame(S);
      } else
        Je.setExtraStackFrame(null);
    }
    function oe(l, b, S, z, Q) {
      {
        var se = Function.call.bind(ye);
        for (var W in l)
          if (se(l, W)) {
            var $ = void 0;
            try {
              if (typeof l[W] != "function") {
                var Me = Error((z || "React class") + ": " + S + " type `" + W + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[W] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Me.name = "Invariant Violation", Me;
              }
              $ = l[W](b, W, z, S, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_e) {
              $ = _e;
            }
            $ && !($ instanceof Error) && (G(Q), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", S, W, typeof $), G(null)), $ instanceof Error && !($.message in Le) && (Le[$.message] = !0, G(Q), y("Failed %s type: %s", S, $.message), G(null));
          }
      }
    }
    var Te = Array.isArray;
    function ce(l) {
      return Te(l);
    }
    function pe(l) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, S = b && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return S;
      }
    }
    function B(l) {
      try {
        return ee(l), !1;
      } catch {
        return !0;
      }
    }
    function ee(l) {
      return "" + l;
    }
    function fe(l) {
      if (B(l))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", pe(l)), ee(l);
    }
    var me = _.ReactCurrentOwner, ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fe, ct, Qe;
    Qe = {};
    function bt(l) {
      if (ye.call(l, "ref")) {
        var b = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function hi(l) {
      if (ye.call(l, "key")) {
        var b = Object.getOwnPropertyDescriptor(l, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function ui(l, b) {
      if (typeof l.ref == "string" && me.current && b && me.current.stateNode !== b) {
        var S = be(me.current.type);
        Qe[S] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', be(me.current.type), l.ref), Qe[S] = !0);
      }
    }
    function Gt(l, b) {
      {
        var S = function() {
          Fe || (Fe = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        S.isReactWarning = !0, Object.defineProperty(l, "key", {
          get: S,
          configurable: !0
        });
      }
    }
    function lt(l, b) {
      {
        var S = function() {
          ct || (ct = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        S.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: S,
          configurable: !0
        });
      }
    }
    var Ui = function(l, b, S, z, Q, se, W) {
      var $ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: l,
        key: b,
        ref: S,
        props: W,
        // Record the component responsible for creating this element.
        _owner: se
      };
      return $._store = {}, Object.defineProperty($._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty($, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.defineProperty($, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Q
      }), Object.freeze && (Object.freeze($.props), Object.freeze($)), $;
    };
    function d(l, b, S, z, Q) {
      {
        var se, W = {}, $ = null, Me = null;
        S !== void 0 && (fe(S), $ = "" + S), hi(b) && (fe(b.key), $ = "" + b.key), bt(b) && (Me = b.ref, ui(b, Q));
        for (se in b)
          ye.call(b, se) && !ke.hasOwnProperty(se) && (W[se] = b[se]);
        if (l && l.defaultProps) {
          var _e = l.defaultProps;
          for (se in _e)
            W[se] === void 0 && (W[se] = _e[se]);
        }
        if ($ || Me) {
          var Ee = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          $ && Gt(W, Ee), Me && lt(W, Ee);
        }
        return Ui(l, $, Me, Q, z, me.current, W);
      }
    }
    var w = _.ReactCurrentOwner, V = _.ReactDebugCurrentFrame;
    function K(l) {
      if (l) {
        var b = l._owner, S = N(l.type, l._source, b ? b.type : null);
        V.setExtraStackFrame(S);
      } else
        V.setExtraStackFrame(null);
    }
    var Oe;
    Oe = !1;
    function Ne(l) {
      return typeof l == "object" && l !== null && l.$$typeof === e;
    }
    function we() {
      {
        if (w.current) {
          var l = be(w.current.type);
          if (l)
            return `

Check the render method of \`` + l + "`.";
        }
        return "";
      }
    }
    function Fi(l) {
      {
        if (l !== void 0) {
          var b = l.fileName.replace(/^.*[\\\/]/, ""), S = l.lineNumber;
          return `

Check your code at ` + b + ":" + S + ".";
        }
        return "";
      }
    }
    var $t = {};
    function Zt(l) {
      {
        var b = we();
        if (!b) {
          var S = typeof l == "string" ? l : l.displayName || l.name;
          S && (b = `

Check the top-level render call using <` + S + ">.");
        }
        return b;
      }
    }
    function je(l, b) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var S = Zt(b);
        if ($t[S])
          return;
        $t[S] = !0;
        var z = "";
        l && l._owner && l._owner !== w.current && (z = " It was passed a child from " + be(l._owner.type) + "."), K(l), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', S, z), K(null);
      }
    }
    function ze(l, b) {
      {
        if (typeof l != "object")
          return;
        if (ce(l))
          for (var S = 0; S < l.length; S++) {
            var z = l[S];
            Ne(z) && je(z, b);
          }
        else if (Ne(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var Q = k(l);
          if (typeof Q == "function" && Q !== l.entries)
            for (var se = Q.call(l), W; !(W = se.next()).done; )
              Ne(W.value) && je(W.value, b);
        }
      }
    }
    function ft(l) {
      {
        var b = l.type;
        if (b == null || typeof b == "string")
          return;
        var S;
        if (typeof b == "function")
          S = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === p))
          S = b.propTypes;
        else
          return;
        if (S) {
          var z = be(b);
          oe(S, l.props, "prop", z, l);
        } else if (b.PropTypes !== void 0 && !Oe) {
          Oe = !0;
          var Q = be(b);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Q || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ke(l) {
      {
        for (var b = Object.keys(l.props), S = 0; S < b.length; S++) {
          var z = b[S];
          if (z !== "children" && z !== "key") {
            K(l), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), K(null);
            break;
          }
        }
        l.ref !== null && (K(l), y("Invalid attribute `ref` supplied to `React.Fragment`."), K(null));
      }
    }
    function dt(l, b, S, z, Q, se) {
      {
        var W = qe(l);
        if (!W) {
          var $ = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && ($ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Me = Fi(Q);
          Me ? $ += Me : $ += we();
          var _e;
          l === null ? _e = "null" : ce(l) ? _e = "array" : l !== void 0 && l.$$typeof === e ? (_e = "<" + (be(l.type) || "Unknown") + " />", $ = " Did you accidentally export a JSX literal instead of a component?") : _e = typeof l, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _e, $);
        }
        var Ee = d(l, b, S, Q, se);
        if (Ee == null)
          return Ee;
        if (W) {
          var Be = b.children;
          if (Be !== void 0)
            if (z)
              if (ce(Be)) {
                for (var Ct = 0; Ct < Be.length; Ct++)
                  ze(Be[Ct], l);
                Object.freeze && Object.freeze(Be);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ze(Be, l);
        }
        return l === t ? Ke(Ee) : ft(Ee), Ee;
      }
    }
    function Ot(l, b, S) {
      return dt(l, b, S, !0);
    }
    function Wt(l, b, S) {
      return dt(l, b, S, !1);
    }
    var Vn = Wt, Gn = Ot;
    Ut.Fragment = t, Ut.jsx = Vn, Ut.jsxs = Gn;
  }()), Ut;
}
process.env.NODE_ENV === "production" ? Ai.exports = zs() : Ai.exports = Bs();
var m = Ai.exports;
function jn(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ m.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ m.jsx("button", { children: i.title });
}
const Hs = /* @__PURE__ */ m.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ m.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ m.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ m.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ys = /* @__PURE__ */ m.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ m.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Vs(i) {
  return /* @__PURE__ */ m.jsx(Fn.Item, { value: i.title, children: /* @__PURE__ */ m.jsxs("div", { children: [
    Ys,
    /* @__PURE__ */ m.jsx("span", { children: i.title }),
    /* @__PURE__ */ m.jsx("button", { className: "closeIcon", onClick: () => {
      i.onDelete(i.index);
    }, children: Hs })
  ] }) }, i.title);
}
function Gs(i) {
  const [e, n] = Z(!1), [t, s] = Z(i.options), a = (c) => {
    i.onDragComplete(c), s(c);
  }, o = (c) => {
    const u = [...t];
    u.splice(c, 1), a(u);
  }, r = [];
  t.forEach((c, u) => {
    r.push(/* @__PURE__ */ m.jsx(Vs, { index: u, title: c, onDelete: o }, c));
  });
  let h = "dropdown draggable";
  return i.subdropdown && (h += " subdropdown"), /* @__PURE__ */ m.jsxs("div", { className: h, onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
    /* @__PURE__ */ m.jsx(jn, { title: i.title }),
    /* @__PURE__ */ m.jsx(Fn.Group, { axis: "y", values: t, onReorder: a, style: { visibility: e ? "visible" : "hidden" }, children: r })
  ] });
}
function $s(i) {
  const [e, n] = Z(!1), t = [];
  i.options.map((a, o) => {
    i.onSelect !== void 0 && (a.onSelect = i.onSelect), t.push(/* @__PURE__ */ m.jsx(Zs, { option: a }, o));
  });
  let s = "dropdown";
  return i.subdropdown && (s += " subdropdown"), /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: s,
      onMouseEnter: () => n(!0),
      onMouseLeave: () => n(!1),
      children: [
        /* @__PURE__ */ m.jsx(jn, { title: i.title }),
        /* @__PURE__ */ m.jsx(
          "ul",
          {
            style: { visibility: e ? "visible" : "hidden" },
            children: t
          }
        )
      ]
    }
  );
}
function Zs(i) {
  const { option: e } = i, [n, t] = Z("");
  let s;
  switch (e.type) {
    case "draggable":
      s = /* @__PURE__ */ m.jsx(
        Gs,
        {
          title: e.title,
          options: e.value,
          onDragComplete: (a) => {
            e.onDragComplete !== void 0 && e.onDragComplete(a);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      s = /* @__PURE__ */ m.jsx(
        $s,
        {
          title: e.title,
          options: e.value,
          onSelect: e.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      s = /* @__PURE__ */ m.jsx(
        "button",
        {
          onClick: () => {
            e.onSelect !== void 0 && e.onSelect(e.value), e.selectable && (n !== e.title ? t(e.title) : t(""));
          },
          children: e.title
        }
      );
      break;
  }
  return /* @__PURE__ */ m.jsx("li", { className: n === e.title ? "selected" : "", children: s }, Ps());
}
function Va(i, e, n) {
  function t(a) {
    switch (e.forEach((o) => {
      o.callback(i, o.remote, a);
    }), a.event) {
      case "custom":
        U.dispatchEvent({ type: F.CUSTOM, value: a.data });
        break;
    }
  }
  function s(a) {
    switch (n.forEach((o) => {
      o.callback(i, o.remote, a);
    }), a.event) {
      case "custom":
        U.dispatchEvent({ type: F.CUSTOM, value: a.data });
        break;
    }
  }
  i.listen = (a) => {
    a.target === "editor" ? s(a) : t(a);
  };
}
function ai(i) {
  const [e, n] = Z(i.open !== void 0 ? i.open : !0), t = !e || i.children === void 0, s = () => {
    U.dispatchEvent({ type: F.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ m.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ m.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !e;
          i.onToggle !== void 0 && i.onToggle(a), n(a);
        },
        children: [
          /* @__PURE__ */ m.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ m.jsx("p", { className: "label", children: ni(i.label) })
        ]
      }
    ),
    i.onRefresh ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsx("button", { className: "refresh", onClick: i.onRefresh }),
      /* @__PURE__ */ m.jsx("button", { className: "remove", onClick: s })
    ] }) : null,
    i.button,
    /* @__PURE__ */ m.jsx("div", { className: e ? "open" : "", children: /* @__PURE__ */ m.jsx("div", { children: i.children }) }, Math.random())
  ] });
}
function zn(i) {
  const e = re(null), [n, t] = Z(!1), s = i.child !== void 0 && i.child.children.length > 0, a = [];
  return i.child !== void 0 && i.child.children.length > 0 && i.child.children.map((o, r) => {
    a.push(/* @__PURE__ */ m.jsx(zn, { child: o, three: i.three }, r));
  }), $e(() => {
    if (i.child) {
      const o = i.three.getScene(i.child.uuid);
      if (o !== null) {
        const r = o.getObjectByProperty("uuid", i.child.uuid);
        r !== void 0 && (e.current.style.opacity = r.visible ? "1" : "0.25");
      }
    }
  }, [n]), /* @__PURE__ */ m.jsx(m.Fragment, { children: i.child !== void 0 && /* @__PURE__ */ m.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "child", children: [
      s ? /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            t(!n);
          }
        }
      ) : null,
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "name",
          style: {
            left: s ? "20px" : "5px"
          },
          onClick: () => {
            i.child !== void 0 && (i.three.getObject(i.child.uuid), n || t(!0));
          },
          children: i.child.name.length > 0 ? `${i.child.name} (${i.child.type})` : `${i.child.type}::${i.child.uuid}`
        }
      ),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "visibility",
          ref: e,
          onClick: () => {
            if (i.child) {
              const o = i.three.getScene(i.child.uuid);
              if (o !== null) {
                const r = o.getObjectByProperty("uuid", i.child.uuid);
                if (r !== void 0) {
                  const h = "visible", c = !r.visible;
                  e.current.style.opacity = c ? "1" : "0.25", i.three.updateObject(i.child.uuid, h, c), ge(r, h, c);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ m.jsx("div", { className: `icon ${Is(i.child)}` })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ m.jsx("div", { className: "container", children: a }) })
  ] }, Math.random()) });
}
function Ki(i) {
  const e = [];
  return i.child?.children.map((n, t) => {
    e.push(/* @__PURE__ */ m.jsx(zn, { child: n, scene: i.scene, three: i.three }, t));
  }), /* @__PURE__ */ m.jsx("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: e });
}
function Ws(i) {
  const [e, n] = Z(i.defaultValue);
  return $e(() => {
    let t = !1, s = -1, a = 0, o = i.defaultValue;
    const r = (g) => {
      t = !0, a = Number(i.input.current?.value), s = g.clientX, document.addEventListener("mouseup", c, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", c, !1);
    }, h = (g) => {
      if (!t)
        return;
      const v = i.step !== void 0 ? i.step : 1, R = (g.clientX - s) * v;
      o = Number((a + R).toFixed(4)), i.min !== void 0 && (o = Math.max(o, i.min)), i.max !== void 0 && (o = Math.min(o, i.max)), i.onChange !== void 0 && i.onChange(o), n(o);
    }, c = () => {
      t = !1, document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    }, u = (g) => {
      const v = Number(g.target.value);
      n(v);
    }, p = (g) => {
      const v = Number(g.target.value);
      i.onChange !== void 0 && i.onChange(v), n(v);
    };
    return i.input.current?.addEventListener("input", u), i.label.current?.addEventListener("mousedown", r, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", p), () => {
      i.input.current?.removeEventListener("input", u), i.label.current?.removeEventListener("mousedown", r), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", p), document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    };
  }, []), e;
}
function Et(i) {
  const e = re(null), n = re(null), t = Ws({
    label: i.labelRef,
    input: e,
    sliderRef: n,
    defaultValue: i.value,
    min: i.min,
    max: i.max,
    step: i.step,
    onChange: (s) => {
      i.onChange !== void 0 && i.onChange(i.prop, s);
    }
  });
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    i.type === "number" && /* @__PURE__ */ m.jsx(
      "input",
      {
        alt: i.alt,
        className: i.className,
        ref: e,
        type: "number",
        value: t,
        min: i.min,
        max: i.max,
        step: i.step,
        disabled: i.disabled,
        onChange: (s) => {
          const a = Number(s.target.value);
          i.onChange !== void 0 && i.onChange(i.prop, a);
        }
      }
    ),
    i.type === "range" && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsx(
        "input",
        {
          type: "text",
          value: t.toString(),
          disabled: i.disabled,
          ref: e,
          className: "min",
          onChange: (s) => {
            const a = Number(s.target.value);
            i.onChange !== void 0 && i.onChange(i.prop, a);
          }
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          disabled: i.disabled,
          type: "range",
          value: t,
          min: i.min,
          max: i.max,
          step: i.step,
          ref: n,
          onChange: ki
        }
      )
    ] })
  ] });
}
function Ks(i) {
  const e = re(null), n = re(null), t = re(null), s = re(null), a = re(null), o = re(null), [r, h] = Z(i.value), [c, u] = Z({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [p, g] = Z(!1);
  function v() {
    p || (window.addEventListener("mousemove", P), window.addEventListener("mouseup", R), window.addEventListener("mouseup", R), g(!0));
  }
  function R() {
    window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", R), g(!1);
  }
  function P(O) {
    const L = a.current.getBoundingClientRect(), A = yt(0, 99, O.clientX - L.left) / 99, C = yt(0, 99, O.clientY - L.top) / 99, ie = Gi(Mi(c.min, c.max, A), 3), X = Gi(Mi(c.min, c.max, C), 3);
    i.onChange({ target: { value: { x: ie, y: X } } }), h({ x: ie, y: X });
  }
  function k(O) {
    let L = r.x, A = r.y;
    O.target === e.current ? L = Number(O.target.value) : A = Number(O.target.value), h({ x: L, y: A });
  }
  function _() {
    const O = Number(t.current.value);
    u({ min: O, max: c.max }), (r.x < O || r.y < O) && h({ x: yt(O, c.max, r.x), y: yt(O, c.max, r.y) });
  }
  function y() {
    const O = Number(s.current.value);
    u({ min: c.min, max: O }), (r.x > O || r.y > O) && h({ x: yt(c.min, O, r.x), y: yt(c.min, O, r.y) });
  }
  $e(() => {
    const O = Yi(c.min, c.max, r.x), L = Yi(c.min, c.max, r.y);
    o.current.style.left = `${O * 100}%`, o.current.style.top = `${L * 100}%`;
  }, [c, r]);
  const x = i.step !== void 0 ? i.step : 0.01;
  return /* @__PURE__ */ m.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("label", { children: "X:" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: r.x,
            min: c.min,
            max: c.max,
            step: x,
            onChange: k
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: r.y,
            min: c.min,
            max: c.max,
            step: x,
            onChange: k
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: c.min,
            step: x,
            onChange: _
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: c.max,
            step: x,
            onChange: y
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "input", ref: a, onMouseDown: v, onMouseUp: R, children: [
      /* @__PURE__ */ m.jsx("div", { className: "x" }),
      /* @__PURE__ */ m.jsx("div", { className: "y" }),
      /* @__PURE__ */ m.jsx("div", { className: "pt", ref: o })
    ] })
  ] });
}
function Xi(i) {
  const e = i.value.isVector3 !== void 0, n = i.value.isEuler !== void 0, t = i.value.elements !== void 0, s = i.step !== void 0 ? i.step : 0.01, a = [];
  if (e) {
    const o = Ce(() => i.value, []), r = (c, u) => {
      o[c] = u, i.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((c) => {
      const u = re(null);
      a.push(
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("label", { ref: u, children: c.toUpperCase() }),
          /* @__PURE__ */ m.jsx(
            Et,
            {
              value: o[c],
              type: "number",
              prop: c,
              step: s,
              labelRef: u,
              onChange: r
            }
          )
        ] }, c)
      );
    });
  } else if (n) {
    const o = Ce(() => i.value, []), r = (c, u) => {
      o[c] = u, i.onChange({ target: { value: o } });
    };
    ["_x", "_y", "_z"].forEach((c) => {
      const u = re(null);
      a.push(
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("label", { ref: u, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ m.jsx(
            Et,
            {
              value: o[c],
              type: "number",
              prop: c,
              step: s,
              labelRef: u,
              onChange: r
            }
          )
        ] }, c)
      );
    });
  } else if (t) {
    const o = Ce(() => i.value, []), r = (h, c) => {
      const u = Number(h);
      o.elements[u] = c, i.onChange({ target: { value: o } });
    };
    for (let h = 0; h < 9; h++) {
      const c = re(null);
      a.push(
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("label", { ref: c, children: h + 1 }),
          /* @__PURE__ */ m.jsx(
            Et,
            {
              value: o.elements[h],
              type: "number",
              prop: h.toString(),
              step: s,
              labelRef: c,
              onChange: r
            }
          )
        ] }, h.toString())
      );
    }
  }
  return /* @__PURE__ */ m.jsx("div", { className: "grid3", children: a }, Math.random().toString());
}
function Xs(i) {
  const e = i.value.x !== void 0, n = i.step !== void 0 ? i.step : 0.01, t = [];
  if (e) {
    const s = Ce(() => i.value, []), a = (r, h) => {
      s[r] = h, i.onChange({ target: { value: s } });
    };
    ["x", "y", "z", "w"].forEach((r) => {
      const h = re(null);
      t.push(
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("label", { ref: h, children: r.toUpperCase() }),
          /* @__PURE__ */ m.jsx(
            Et,
            {
              value: s.x,
              type: "number",
              prop: r,
              step: n,
              labelRef: h,
              onChange: a
            }
          )
        ] }, r)
      );
    });
  } else {
    const s = Ce(() => i.value, []), a = (o, r) => {
      const h = Number(o);
      s.elements[h] = r, i.onChange({ target: { value: s } });
    };
    for (let o = 0; o < 16; o++) {
      const r = re(null);
      t.push(
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("label", { ref: r, children: o + 1 }),
          /* @__PURE__ */ m.jsx(
            Et,
            {
              value: s.elements[o],
              type: "number",
              prop: o.toString(),
              step: n,
              labelRef: r,
              onChange: a
            }
          )
        ] }, o.toString())
      );
    }
  }
  return /* @__PURE__ */ m.jsx("div", { className: "grid4", children: t });
}
function qs(i) {
  return !(i === "defaultAttributeValues" || i === "forceSinglePass" || i === "linecap" || i === "linejoin" || i === "linewidth" || i === "normalMapType" || i === "precision" || i === "shadowSide" || i === "uniformsGroups" || i === "uniformsNeedUpdate" || i === "userData" || i === "version" || i === "wireframeLinecap" || i === "wireframeLinejoin" || i === "wireframeLinewidth" || i.slice(0, 4) === "clip" || i.slice(0, 7) === "polygon" || i.slice(0, 7) === "stencil" || i.slice(0, 2) === "is");
}
function Js(i) {
  switch (i) {
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
    case "Gradient Map":
      return "gradientMap";
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
  return i;
}
function di(i) {
  switch (i) {
    case "alphaHash":
      return "Alpha Hash";
    case "alphaMap":
      return "Alpha Map";
    case "alphaToCoverage":
      return "Alpha To Coverage";
    case "anisotropy":
      return "Anisotropy";
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
    case "attenuationDistance":
      return "Attenuation Distance";
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
    case "clearcoat":
      return "Clearcoat";
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
    case "colorWrite":
      return "Color Write";
    case "defines":
      return "Defines";
    case "depthFunc":
      return "Depth Func";
    case "depthTest":
      return "Depth Test";
    case "depthWrite":
      return "Depth Write";
    case "dispersion":
      return "Dispersion";
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
    case "envMapRotation":
      return "Environment Map Rotation";
    case "extensions":
      return "Extensions";
    case "flatShading":
      return "Flat Shading";
    case "fragmentShader":
      return "Fragment Shader";
    case "fog":
      return "Fog";
    case "glslVersion":
      return "GLSL Version";
    case "gradientMap":
      return "Gradient Map";
    case "ior":
      return "IOR";
    case "iridescence":
      return "Iridescence";
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
    case "premultipliedAlpha":
      return "Premultiplied Alpha";
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
    case "sheen":
      return "Sheen";
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
    case "toneMapped":
      return "Tone Mapped";
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
    case "vertexColors":
      return "Vertex Colors";
    case "vertexShader":
      return "Vertex Shader";
    case "visible":
      return "Visible";
    case "wireframe":
      return "Wireframe";
  }
  return i;
}
function Bn(i) {
  const e = i.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness" || e === "thickness";
}
function Qs() {
  const i = document.createElement("input");
  return i.type = "file", new Promise((e, n) => {
    i.addEventListener("change", function() {
      if (i.files === null)
        n();
      else {
        const t = i.files[0], s = new FileReader();
        s.onload = function(a) {
          e(a.target.result);
        }, s.readAsDataURL(t);
      }
    }), i.click();
  });
}
const ea = [
  {
    title: "Front",
    value: Wn
  },
  {
    title: "Back",
    value: vn
  },
  {
    title: "Double",
    value: yn
  }
], ta = [
  {
    title: "No Blending",
    value: Kn
  },
  {
    title: "Normal",
    value: Xn
  },
  {
    title: "Additive",
    value: qn
  },
  {
    title: "Subtractive",
    value: Jn
  },
  {
    title: "Multiply",
    value: Qn
  },
  {
    title: "Custom",
    value: es
  }
], ia = [
  {
    title: "Add",
    value: ts
  },
  {
    title: "Subtract",
    value: is
  },
  {
    title: "Reverse Subtract",
    value: ns
  },
  {
    title: "Min",
    value: ss
  },
  {
    title: "Max",
    value: as
  }
], na = [
  {
    title: "Zero",
    valye: En
  },
  {
    title: "One",
    valye: bn
  },
  {
    title: "Src Color",
    valye: On
  },
  {
    title: "One Minus Src Color",
    valye: Cn
  },
  {
    title: "Src Alpha",
    valye: Tn
  },
  {
    title: "One Minus Src Alpha",
    valye: xn
  },
  {
    title: "Dst Alpha",
    valye: Sn
  },
  {
    title: "One Minus Dst Alpha",
    valye: wn
  },
  {
    title: "Dst Color",
    valye: Mn
  },
  {
    title: "One Minus Dst Color",
    valye: Rn
  },
  {
    title: "Src Alpha Saturate",
    valye: rs
  },
  {
    title: "Constant Color",
    valye: Dn
  },
  {
    title: "One Minus Constant Color",
    valye: An
  },
  {
    title: "Constant Alpha",
    valye: Pn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Ln
  }
], sa = [
  {
    title: "Zero",
    valye: En
  },
  {
    title: "One",
    valye: bn
  },
  {
    title: "Src Color",
    valye: On
  },
  {
    title: "One Minus Src Color",
    valye: Cn
  },
  {
    title: "Src Alpha",
    valye: Tn
  },
  {
    title: "One Minus Src Alpha",
    valye: xn
  },
  {
    title: "Dst Alpha",
    valye: Sn
  },
  {
    title: "One Minus Dst Alpha",
    valye: wn
  },
  {
    title: "Dst Color",
    valye: Mn
  },
  {
    title: "One Minus Dst Color",
    valye: Rn
  },
  {
    title: "Constant Color",
    valye: Dn
  },
  {
    title: "One Minus Constant Color",
    valye: An
  },
  {
    title: "Constant Alpha",
    valye: Pn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Ln
  }
];
function Ft(i, e) {
  i.needsUpdate = !0, i.type = "option", i.options = e;
}
function aa(i, e, n, t) {
  return {
    type: "boolean",
    title: di(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (s, a) => {
      t.updateObject(n.uuid, `material.${i}`, a), t.updateObject(n.uuid, "material.needsUpdate", !0);
      const o = t.getScene(n.uuid);
      if (o !== null) {
        const r = o.getObjectByProperty("uuid", n.uuid);
        ge(r, `material.${i}`, a);
      }
    }
  };
}
function ra(i, e, n, t) {
  const s = {
    type: "number",
    title: di(i),
    prop: i,
    value: e,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (a, o) => {
      t.updateObject(n.uuid, `material.${i}`, o), t.updateObject(n.uuid, "material.needsUpdate", !0);
      const r = t.getScene(n.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", n.uuid);
        ge(h, `material.${i}`, o);
      }
    }
  };
  switch (i) {
    case "blending":
      Ft(s, ta);
      break;
    case "blendDst":
      Ft(s, sa);
      break;
    case "blendEquation":
      Ft(s, ia);
      break;
    case "blendSrc":
      Ft(s, na);
      break;
    case "side":
      Ft(s, ea);
      break;
  }
  return Bn(i) && (s.value = Number(e), s.type = "range", s.min = Math.min(0, s.value), s.max = Math.max(1, s.value), s.step = 0.01), s;
}
function oa(i, e, n, t) {
  const s = {
    type: "string",
    title: di(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (o, r) => {
      t.updateObject(n.uuid, `material.${i}`, r), t.updateObject(n.uuid, "material.needsUpdate", !0);
      const h = t.getScene(n.uuid);
      if (h !== null) {
        const c = h.getObjectByProperty("uuid", n.uuid);
        ge(c, `material.${i}`, r);
      }
    },
    onKeyDown: (o) => {
    }
  };
  return (i === "vertexShader" || i === "fragmentShader") && (s.disabled = !1, s.latest = s.value, s.onChange = (o, r) => {
    s.latest = r, t.updateObject(n.uuid, `material.${i}`, r);
    const h = t.getScene(n.uuid);
    if (h !== null) {
      const c = h.getObjectByProperty("uuid", n.uuid);
      ge(c, `material.${i}`, r);
    }
  }, s.onKeyDown = (o) => {
    if (o.key === "Enter" && (o.altKey || o.metaKey)) {
      t.updateObject(n.uuid, "material.needsUpdate", !0);
      const r = t.getScene(n.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", n.uuid);
        ge(h, "material.needsUpdate", !0);
      }
    }
  }), s;
}
function ca(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z === void 0;
}
function la(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w === void 0;
}
function da(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w !== void 0;
}
function Pi(i) {
  i.sort((e, n) => e.title < n.title ? -1 : e.title > n.title ? 1 : 0);
}
function Yt(i, e, n, t, s = "", a = !1) {
  const o = di(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = s.length > 0 ? `${s}.${i}` : i, h = typeof e;
  if (h === "boolean" || h === "string")
    return {
      title: o,
      prop: r,
      type: h,
      value: e,
      disabled: a,
      onChange: (c, u) => {
        t.updateObject(n.uuid, `material.${r}`, u);
        const p = t.getScene(n.uuid);
        if (p !== null) {
          const g = p.getObjectByProperty("uuid", n.uuid);
          ge(g, `material.${r}`, u);
        }
      }
    };
  if (h === "number") {
    const c = {
      title: o,
      prop: r,
      type: "number",
      value: e,
      step: 0.01,
      disabled: a,
      onChange: (u, p) => {
        t.updateObject(n.uuid, `material.${r}`, p);
        const g = t.getScene(n.uuid);
        if (g !== null) {
          const v = g.getObjectByProperty("uuid", n.uuid);
          ge(v, `material.${r}`, p);
        }
      }
    };
    return Bn(o) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (e.isColor)
      return {
        title: o,
        prop: r,
        type: "color",
        value: e,
        disabled: a,
        onChange: (c, u) => {
          const p = new ci(u);
          t.updateObject(n.uuid, `material.${r}`, p);
          const g = t.getScene(n.uuid);
          if (g !== null) {
            const v = g.getObjectByProperty("uuid", n.uuid);
            ge(v, `material.${r}`, p);
          }
        }
      };
    if (Array.isArray(e)) {
      const c = [];
      for (const u in e) {
        const p = e[u], g = `[${u.toString()}]`;
        if (p.value !== void 0) {
          const v = Yt(`${g}.value`, p.value, n, t, r, a);
          v !== void 0 && c.push(v);
        } else {
          const v = Yt(g, p, n, t, r, a);
          v !== void 0 && c.push(v);
        }
      }
      if (c.length > 0)
        return Pi(c), {
          title: o,
          items: c
        };
    } else {
      if (ca(e))
        return {
          title: o,
          prop: r,
          type: "vector2",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            t.updateObject(n.uuid, `material.${r}`, u);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", n.uuid);
              ge(g, `material.${r}`, u);
            }
          }
        };
      if (la(e))
        return {
          title: o,
          prop: r,
          type: "grid3",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            t.updateObject(n.uuid, `material.${r}`, u);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", n.uuid);
              ge(g, `material.${r}`, u);
            }
          }
        };
      if (da(e))
        return {
          title: o,
          prop: r,
          type: "grid4",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            t.updateObject(n.uuid, `material.${r}`, u);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", n.uuid);
              ge(g, `material.${r}`, u);
            }
          }
        };
      if (e.isEuler)
        return {
          title: o,
          prop: r,
          type: "euler",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            t.updateObject(n.uuid, `material.${r}`, u);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", n.uuid);
              ge(g, `material.${r}`, u);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: o,
          type: "image",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            const p = Js(i), g = s.length > 0 ? `${s}.${p}` : p;
            t.createTexture(n.uuid, `material.${g}`, u);
            const v = t.getScene(n.uuid);
            if (v !== null) {
              const R = v.getObjectByProperty("uuid", n.uuid);
              if (R !== void 0) {
                const P = (k) => {
                  const _ = R.material, y = g.split(".");
                  switch (y.length) {
                    case 1:
                      _[y[0]] = k;
                      break;
                    case 2:
                      _[y[0]][y[1]] = k;
                      break;
                    case 3:
                      _[y[0]][y[1]][y[2]] = k;
                      break;
                    case 4:
                      _[y[0]][y[1]][y[2]][y[3]] = k;
                      break;
                    case 5:
                      _[y[0]][y[1]][y[2]][y[3]][y[4]] = k;
                      break;
                  }
                  _.needsUpdate = !0;
                };
                u.src.length > 0 ? Nn(u.src).then((k) => {
                  k.offset.set(u.offset[0], u.offset[1]), k.repeat.set(u.repeat[0], u.repeat[1]), P(k);
                }) : P(null);
              }
            }
          }
        };
      if (e.elements !== void 0)
        return {
          title: o,
          prop: r,
          type: e.elements.length > 9 ? "grid4" : "grid3",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            t.updateObject(n.uuid, `material.${r}`, u);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", n.uuid);
              ge(g, `material.${r}`, u);
            }
          }
        };
      {
        const c = [], u = i === "defines" || i === "extensions";
        try {
          for (const p in e) {
            const g = e[p];
            if (g !== void 0)
              if (g.value !== void 0) {
                const v = Yt(`${p}.value`, g.value, n, t, r, u);
                v !== void 0 && c.push(v);
              } else {
                const v = Yt(p, g, n, t, r, u);
                v !== void 0 && c.push(v);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", i, e);
        }
        if (c.length > 0)
          return Pi(c), {
            title: o,
            items: c
          };
      }
    }
  }
}
function qi(i, e, n) {
  const t = [];
  for (const s in i) {
    if (!qs(s))
      continue;
    const a = typeof i[s], o = i[s];
    if (a === "boolean")
      t.push(aa(s, o, e, n));
    else if (a === "number")
      t.push(ra(s, o, e, n));
    else if (a === "string")
      t.push(oa(s, o, e, n));
    else if (a === "object") {
      const r = Yt(s, o, e, n);
      r !== void 0 && t.push(r);
    } else
      o !== void 0 && console.log("other:", s, a, o);
  }
  return Pi(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      n.updateObject(e.uuid, "material.needsUpdate", !0);
      const s = n.getScene(e.uuid);
      if (s !== null) {
        const a = s.getObjectByProperty("uuid", e.uuid);
        ge(a, "material.needsUpdate", !0);
      }
    }
  }), t;
}
function ha(i, e) {
  const n = i.material;
  if (Array.isArray(n)) {
    const t = [], s = n.length;
    for (let a = 0; a < s; a++)
      t.push(
        /* @__PURE__ */ m.jsx(
          ut,
          {
            title: `Material ${a}`,
            items: qi(n[a], i, e)
          },
          `Material ${a}`
        )
      );
    return /* @__PURE__ */ m.jsx(m.Fragment, { children: t });
  } else
    return /* @__PURE__ */ m.jsx(
      ut,
      {
        title: "Material",
        items: qi(n, i, e)
      }
    );
}
const Ji = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function ua(i) {
  const e = i.step !== void 0 ? i.step : 0.01, n = re(null), t = re(null), s = re(null), a = re(null), o = re(null), [r] = Z(i.value), [h, c] = Z(i.value.offset[0]), [u, p] = Z(i.value.offset[1]), [g, v] = Z(i.value.repeat[0]), [R, P] = Z(i.value.repeat[1]);
  function k(y, x, O, L, A) {
    if (i.onChange !== void 0) {
      const C = i.prop !== void 0 ? i.prop : i.title;
      i.onChange(C, {
        src: y,
        offset: [x, O],
        repeat: [L, A]
      });
    }
  }
  function _(y) {
    const x = n.current.src, O = y.target.value;
    switch (y.target) {
      case t.current:
        c(O), k(x, O, u, g, R);
        break;
      case s.current:
        p(O), k(x, h, O, g, R);
        break;
      case a.current:
        v(O), k(x, h, u, O, R);
        break;
      case o.current:
        P(O), k(x, h, u, g, O);
        break;
    }
  }
  return /* @__PURE__ */ m.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ m.jsx("img", { alt: i.title, ref: n, onClick: () => {
      Qs().then((y) => {
        n.current.src = y, k(y, h, u, g, R);
      });
    }, src: r.src.length > 0 ? r.src : Ji }),
    /* @__PURE__ */ m.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: h,
            step: e,
            onChange: _
          }
        ),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: u,
            step: e,
            onChange: _
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: g,
            step: e,
            onChange: _
          }
        ),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            ref: o,
            type: "number",
            value: R,
            step: e,
            onChange: _
          }
        )
      ] }),
      /* @__PURE__ */ m.jsx("button", { onClick: () => {
        k("", h, u, g, R), n.current.src = Ji;
      }, children: "Clear" })
    ] })
  ] });
}
function ii(i) {
  let e = i.value;
  e !== void 0 && (e.isColor !== void 0 ? e = Vi(i.value) : i.type === "color" && (e = Vi(new ci(i.value))));
  const [n, t] = Z(e), s = re(null), a = (c) => {
    let u = c.target.value;
    i.type === "boolean" ? u = c.target.checked : i.type === "option" && (u = i.options[u].value), t(u), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, u);
  }, o = {};
  i.disabled && (o.opacity = 0.8);
  const r = i.type === "string" && (n.length > 100 || n.search(`
`) > -1), h = r || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ m.jsxs("div", { className: `field ${h ? "block" : ""}`, style: o, children: [
    i.type !== "button" && /* @__PURE__ */ m.jsx("label", { ref: s, children: ni(i.title) }, "fieldLabel"),
    i.type === "string" && !r && /* @__PURE__ */ m.jsx(
      "input",
      {
        type: "text",
        disabled: i.disabled,
        onChange: a,
        value: n
      }
    ),
    i.type === "string" && r && /* @__PURE__ */ m.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: i.disabled !== void 0 ? i.disabled : !0,
        onChange: a,
        onKeyDown: (c) => {
          i.onKeyDown !== void 0 && i.onKeyDown(c);
        },
        value: n
      }
    ),
    i.type === "boolean" && /* @__PURE__ */ m.jsx(
      "input",
      {
        type: "checkbox",
        disabled: i.disabled,
        onChange: a,
        checked: n
      }
    ),
    i.type === "number" && /* @__PURE__ */ m.jsx(
      Et,
      {
        value: n,
        type: i.type,
        prop: i.prop !== void 0 ? i.prop : i.title,
        min: i.min,
        max: i.max,
        step: i.step,
        disabled: i.disabled,
        labelRef: s,
        onChange: i.onChange
      }
    ),
    i.type === "range" && /* @__PURE__ */ m.jsx(
      Et,
      {
        value: n,
        type: i.type,
        prop: i.prop !== void 0 ? i.prop : i.title,
        min: i.min,
        max: i.max,
        step: i.step,
        disabled: i.disabled,
        labelRef: s,
        onChange: i.onChange
      }
    ),
    i.type === "color" && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsx("input", { type: "text", value: n.toString(), onChange: a, disabled: i.disabled, className: "color" }),
      /* @__PURE__ */ m.jsx("input", { type: "color", value: n, onChange: a, disabled: i.disabled })
    ] }),
    i.type === "button" && /* @__PURE__ */ m.jsx(
      "button",
      {
        disabled: i.disabled,
        onClick: () => {
          i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, !0);
        },
        children: i.title
      }
    ),
    i.type === "image" && /* @__PURE__ */ m.jsx(ua, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ m.jsx(m.Fragment, { children: /* @__PURE__ */ m.jsx("select", { onChange: a, disabled: i.disabled, defaultValue: i.value, children: i.options?.map((c, u) => /* @__PURE__ */ m.jsx("option", { value: c.value, children: ni(c.title) }, u)) }) }),
    i.type === "vector2" && /* @__PURE__ */ m.jsx(Ks, { step: i.step, value: n, min: 0, max: 1, onChange: a }),
    i.type === "grid3" && /* @__PURE__ */ m.jsx(Xi, { step: i.step, value: n, onChange: a }),
    i.type === "grid4" && /* @__PURE__ */ m.jsx(Xs, { step: i.step, value: n, onChange: a }),
    i.type === "euler" && /* @__PURE__ */ m.jsx(Xi, { step: i.step, value: n, onChange: a })
  ] });
}
function ma(i) {
  return "items" in i;
}
function ut(i) {
  const e = [];
  return i.items.forEach((n) => {
    ma(n) ? e.push(
      /* @__PURE__ */ m.jsx(ut, { title: ni(n.title), items: n.items }, Math.random())
    ) : e.push(
      /* @__PURE__ */ m.jsx(
        ii,
        {
          title: n.title,
          prop: n.prop,
          value: n.value,
          type: n.type,
          min: n.min,
          max: n.max,
          step: n.step,
          disabled: n.disabled,
          options: n.options,
          onChange: (t, s) => {
            n.onChange !== void 0 && n.onChange(t, s);
          },
          onKeyDown: (t) => {
            n.onKeyDown !== void 0 && n.onKeyDown(t);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ m.jsx(ai, { label: i.title, open: i.expanded === !0, children: e });
}
function pa(i) {
  const [e] = Z([]), [n] = Z([]), [t, s] = Z(0);
  return $e(() => {
    const a = (r) => {
      const h = JSON.parse(r.value), c = [];
      h.items.forEach((u) => {
        c.push({
          title: u.title,
          type: u.type,
          value: u.value,
          prop: u.prop,
          min: u.min,
          max: u.max,
          step: u.step,
          onChange: (p, g) => {
            i.three.updateGroup(h.title, p, g);
          }
        });
      }), e.push(
        /* @__PURE__ */ m.jsx(
          ut,
          {
            title: h.title,
            items: c
          },
          Math.random()
        )
      ), n.push(h.title), s(Date.now());
    }, o = (r) => {
      const h = r.value, c = n.length;
      for (let u = 0; u < c; u++)
        if (h === n[u]) {
          e.splice(u, 1), n.splice(u, 1), s(Date.now());
          return;
        }
    };
    return U.addEventListener(F.ADD_GROUP, a), U.addEventListener(F.REMOVE_GROUP, o), () => {
      U.removeEventListener(F.ADD_GROUP, a), U.removeEventListener(F.REMOVE_GROUP, o);
    };
  }, []), /* @__PURE__ */ m.jsx("div", { className: "customGroups", children: e }, t);
}
function Qi(i) {
  switch (i) {
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
  return i;
}
function fa(i, e) {
  const n = [];
  if (i.perspectiveCameraInfo !== void 0)
    for (const t in i.perspectiveCameraInfo)
      n.push({
        title: Qi(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[t],
        onChange: (s, a) => {
          e.updateObject(i.uuid, s, a), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const o = e.getScene(i.uuid);
          if (o !== null) {
            const r = o.getObjectByProperty("uuid", i.uuid);
            r !== void 0 && (ge(r, s, a), r.updateProjectionMatrix());
          }
        }
      });
  else if (i.orthographicCameraInfo !== void 0)
    for (const t in i.orthographicCameraInfo)
      n.push({
        title: Qi(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[t],
        onChange: (s, a) => {
          e.updateObject(i.uuid, s, a), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const o = e.getScene(i.uuid);
          if (o !== null) {
            const r = o.getObjectByProperty("uuid", i.uuid);
            r !== void 0 && (ge(r, s, a), r.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ m.jsx(
    ut,
    {
      title: "Camera",
      items: n
    }
  );
}
function _a(i, e) {
  const n = new kn();
  n.elements = i.matrix;
  const t = new le(), s = new os(), a = new le();
  i.uuid.length > 0 && (t.setFromMatrixPosition(n), s.setFromRotationMatrix(n), a.setFromMatrixScale(n));
  const o = (r, h) => {
    const c = r === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    e.updateObject(i.uuid, r, c);
    const u = e.getScene(i.uuid);
    if (u !== null) {
      const p = u.getObjectByProperty("uuid", i.uuid);
      ge(p, r, c);
    }
  };
  return /* @__PURE__ */ m.jsx(
    ut,
    {
      title: "Transform",
      items: [
        {
          title: "Position",
          prop: "position",
          type: "grid3",
          step: 0.1,
          value: t,
          onChange: o
        },
        {
          title: "Rotation",
          prop: "rotation",
          type: "grid3",
          value: s,
          onChange: o
        },
        {
          title: "Scale",
          prop: "scale",
          type: "grid3",
          value: a,
          onChange: o
        }
      ]
    }
  );
}
function en(i) {
  switch (i) {
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
  return i;
}
function ga(i, e) {
  const n = [];
  if (i.lightInfo !== void 0)
    for (const t in i.lightInfo) {
      const s = i.lightInfo[t];
      s !== void 0 && (s.isColor !== void 0 ? n.push({
        title: en(t),
        prop: t,
        type: "color",
        value: s,
        onChange: (a, o) => {
          const r = new ci(o);
          e.updateObject(i.uuid, a, r);
          const h = e.getScene(i.uuid);
          if (h !== null) {
            const c = h.getObjectByProperty("uuid", i.uuid);
            ge(c, a, r);
          }
        }
      }) : n.push({
        title: en(t),
        prop: t,
        type: typeof s,
        value: s,
        step: typeof s == "number" ? 0.01 : void 0,
        onChange: (a, o) => {
          e.updateObject(i.uuid, a, o);
          const r = e.getScene(i.uuid);
          if (r !== null) {
            const h = r.getObjectByProperty("uuid", i.uuid);
            ge(h, a, o);
          }
        }
      }));
    }
  return /* @__PURE__ */ m.jsx(
    ut,
    {
      title: "Light",
      items: n
    }
  );
}
function va(i, e) {
  const n = [], t = [];
  let s = 0;
  i.animations.forEach((o) => {
    s = Math.max(s, o.duration), o.duration > 0 && t.push({
      title: o.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: o.duration,
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
  }), n.push({
    title: "Animations",
    items: t
  });
  const a = e.getScene(i.uuid);
  if (a !== null) {
    const o = a.getObjectByProperty("uuid", i.uuid);
    let r = !1;
    if (o !== void 0) {
      const h = o.mixer;
      if (r = h !== void 0, r) {
        const c = [
          {
            title: "Time Scale",
            type: "range",
            value: h.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (u, p) => {
              h.timeScale = p, e.updateObject(i.uuid, "mixer.timeScale", p);
            }
          }
        ];
        c.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            h.stopAllAction(), e.requestMethod(i.uuid, "stopAllAction", void 0, "mixer");
          }
        }), n.push({
          title: "Mixer",
          items: c
        });
      }
    }
  }
  return /* @__PURE__ */ m.jsx(ut, { title: "Animation", items: n });
}
const Hn = {
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
let Ae = { ...Hn };
function ya(i) {
  const [e, n] = Z(-1);
  $e(() => {
    function o(h) {
      Ae = { ...h.value }, n(Date.now());
    }
    function r() {
      Ae = { ...Hn }, n(Date.now());
    }
    return U.addEventListener(F.SET_SCENE, r), U.addEventListener(F.SET_OBJECT, o), () => {
      U.removeEventListener(F.SET_SCENE, r), U.removeEventListener(F.SET_OBJECT, o);
    };
  }, []);
  const t = Ae.type.toLowerCase(), s = Ae.animations.length > 0 || Ae.mixer !== void 0, a = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ m.jsx(ai, { label: "Inspector", children: /* @__PURE__ */ m.jsx("div", { id: "Inspector", className: i.class, children: Ae.uuid.length > 0 && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsx(
        ii,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: Ae.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ m.jsx(
        ii,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: Ae.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ m.jsx(
        ii,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: Ae.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      _a(Ae, i.three),
      s ? va(Ae, i.three) : null,
      t.search("camera") > -1 ? fa(Ae, i.three) : null,
      t.search("light") > -1 ? ga(Ae, i.three) : null,
      a ? ha(Ae, i.three) : null
    ] })
  ] }) }, e) }, "Inspector");
}
function Ga(i) {
  const [e] = Z([]), [n] = Z([]), [t, s] = Z(0), a = (h) => {
    const c = h.value;
    e.push(c), n.push(
      /* @__PURE__ */ m.jsx(
        ai,
        {
          label: `Scene: ${c.name}`,
          scene: c,
          open: !0,
          onRefresh: () => {
            i.three.refreshScene(c.name);
          },
          children: /* @__PURE__ */ m.jsx(Ki, { child: c, scene: c, three: i.three })
        },
        Math.random()
      )
    ), s(Date.now());
  }, o = (h) => {
    const c = h.value;
    for (let u = 0; u < e.length; u++)
      if (c.uuid === e[u].uuid) {
        e[u] = c, n[u] = /* @__PURE__ */ m.jsx(
          ai,
          {
            label: `Scene: ${c.name}`,
            scene: c,
            open: !0,
            onRefresh: () => {
              i.three.refreshScene(c.name);
            },
            children: /* @__PURE__ */ m.jsx(Ki, { child: c, scene: c, three: i.three })
          },
          Math.random()
        ), s(Date.now());
        return;
      }
  }, r = (h) => {
    const c = h.value;
    for (let u = 0; u < e.length; u++)
      if (c.uuid === e[u].uuid) {
        e.splice(u, 1), n.splice(u, 1), s(Date.now());
        return;
      }
  };
  return $e(() => (U.addEventListener(F.ADD_SCENE, a), U.addEventListener(F.REFRESH_SCENE, o), U.addEventListener(F.REMOVE_SCENE, r), () => {
    U.removeEventListener(F.ADD_SCENE, a), U.removeEventListener(F.REFRESH_SCENE, o), U.removeEventListener(F.REMOVE_SCENE, r);
  }), []), /* @__PURE__ */ m.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ m.jsx("div", { className: "scenes", children: n }, t),
    /* @__PURE__ */ m.jsx(ya, { three: i.three }),
    /* @__PURE__ */ m.jsx(pa, { three: i.three })
  ] });
}
function $a(i) {
  return $e(() => {
    function e(r) {
      let h = null;
      return i.three.scenes.forEach((c) => {
        r.search(c.uuid) > -1 && (h = c);
      }), h;
    }
    const n = (r) => {
      const h = r.value, u = e(h)?.getObjectByProperty("uuid", h);
      u !== void 0 && i.three.setObject(u);
    }, t = (r, h, c) => {
      const p = e(r)?.getObjectByProperty("uuid", r);
      p !== void 0 && ge(p, h, c);
    }, s = (r) => {
      const h = r.value, { key: c, value: u, uuid: p } = h;
      t(p, c, u);
    }, a = (r) => {
      const h = r.value, u = e(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (u !== void 0) {
        const p = (g) => {
          const v = h.key.split(".");
          switch (v.length) {
            case 1:
              u[v[0]] = g;
              break;
            case 2:
              u[v[0]][v[1]] = g;
              break;
            case 3:
              u[v[0]][v[1]][v[2]] = g;
              break;
            case 4:
              u[v[0]][v[1]][v[2]][v[3]] = g;
              break;
            case 5:
              u[v[0]][v[1]][v[2]][v[3]][v[4]] = g;
              break;
          }
          u.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? Nn(h.value.src).then((g) => {
          g.offset.set(h.value.offset[0], h.value.offset[1]), g.repeat.set(h.value.repeat[0], h.value.repeat[1]), p(g);
        }) : p(null);
      }
    }, o = (r) => {
      const { key: h, uuid: c, value: u, subitem: p } = r.value, v = e(c)?.getObjectByProperty("uuid", c);
      if (v !== void 0)
        try {
          p !== void 0 ? Ns(v, p)[h](u) : v[h](u);
        } catch (R) {
          console.log("Error requesting method:"), console.log(R), console.log(h), console.log(u);
        }
    };
    return U.addEventListener(F.GET_OBJECT, n), U.addEventListener(F.UPDATE_OBJECT, s), U.addEventListener(F.CREATE_TEXTURE, a), U.addEventListener(F.REQUEST_METHOD, o), () => {
      U.removeEventListener(F.GET_OBJECT, n), U.removeEventListener(F.UPDATE_OBJECT, s), U.removeEventListener(F.CREATE_TEXTURE, a), U.removeEventListener(F.REQUEST_METHOD, o);
    };
  }, []), null;
}
class Ea extends cs {
  constructor(e, n) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], s = new xi();
    s.setAttribute("position", new Vt(t, 3)), s.computeBoundingSphere();
    const a = new ls({ fog: !1 });
    super(s, a), this.light = e, this.color = n, this.type = "RectAreaLightHelper";
    const o = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new xi();
    r.setAttribute("position", new Vt(o, 3)), r.computeBoundingSphere(), this.add(new oi(r, new Li({ side: vn, fog: !1 })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const e = this.material.color, n = Math.max(e.r, e.g, e.b);
      n > 1 && e.multiplyScalar(1 / n), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const tn = { type: "change" }, fi = { type: "start" }, nn = { type: "end" }, Kt = new ds(), sn = new hs(), ba = Math.cos(70 * us.DEG2RAD);
class Oa extends gn {
  constructor(e, n) {
    super(), this.object = e, this.domElement = n, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new le(), this.cursor = new le(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Tt.ROTATE, MIDDLE: Tt.DOLLY, RIGHT: Tt.PAN }, this.touches = { ONE: xt.ROTATE, TWO: xt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(d) {
      d.addEventListener("keydown", ke), this._domElementKeyEvents = d;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", ke), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(tn), t.update(), a = s.NONE;
    }, this.update = function() {
      const d = new le(), w = new Si().setFromUnitVectors(e.up, new le(0, 1, 0)), V = w.clone().invert(), K = new le(), Oe = new Si(), Ne = new le(), we = 2 * Math.PI;
      return function($t = null) {
        const Zt = t.object.position;
        d.copy(Zt).sub(t.target), d.applyQuaternion(w), r.setFromVector3(d), t.autoRotate && a === s.NONE && Ie(qe($t)), t.enableDamping ? (r.theta += h.theta * t.dampingFactor, r.phi += h.phi * t.dampingFactor) : (r.theta += h.theta, r.phi += h.phi);
        let je = t.minAzimuthAngle, ze = t.maxAzimuthAngle;
        isFinite(je) && isFinite(ze) && (je < -Math.PI ? je += we : je > Math.PI && (je -= we), ze < -Math.PI ? ze += we : ze > Math.PI && (ze -= we), je <= ze ? r.theta = Math.max(je, Math.min(ze, r.theta)) : r.theta = r.theta > (je + ze) / 2 ? Math.max(je, r.theta) : Math.min(ze, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(u, t.dampingFactor) : t.target.add(u), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let ft = !1;
        if (t.zoomToCursor && A || t.object.isOrthographicCamera)
          r.radius = st(r.radius);
        else {
          const Ke = r.radius;
          r.radius = st(r.radius * c), ft = Ke != r.radius;
        }
        if (d.setFromSpherical(r), d.applyQuaternion(V), Zt.copy(t.target).add(d), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, u.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), u.set(0, 0, 0)), t.zoomToCursor && A) {
          let Ke = null;
          if (t.object.isPerspectiveCamera) {
            const dt = d.length();
            Ke = st(dt * c);
            const Ot = dt - Ke;
            t.object.position.addScaledVector(O, Ot), t.object.updateMatrixWorld(), ft = !!Ot;
          } else if (t.object.isOrthographicCamera) {
            const dt = new le(L.x, L.y, 0);
            dt.unproject(t.object);
            const Ot = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / c)), t.object.updateProjectionMatrix(), ft = Ot !== t.object.zoom;
            const Wt = new le(L.x, L.y, 0);
            Wt.unproject(t.object), t.object.position.sub(Wt).add(dt), t.object.updateMatrixWorld(), Ke = d.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Ke).add(t.object.position) : (Kt.origin.copy(t.object.position), Kt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Kt.direction)) < ba ? e.lookAt(t.target) : (sn.setFromNormalAndCoplanarPoint(t.object.up, t.target), Kt.intersectPlane(sn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Ke = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / c)), Ke !== t.object.zoom && (t.object.updateProjectionMatrix(), ft = !0);
        }
        return c = 1, A = !1, ft || K.distanceToSquared(t.object.position) > o || 8 * (1 - Oe.dot(t.object.quaternion)) > o || Ne.distanceToSquared(t.target) > o ? (t.dispatchEvent(tn), K.copy(t.object.position), Oe.copy(t.object.quaternion), Ne.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Qe), t.domElement.removeEventListener("pointerdown", G), t.domElement.removeEventListener("pointercancel", Te), t.domElement.removeEventListener("wheel", B), t.domElement.removeEventListener("pointermove", oe), t.domElement.removeEventListener("pointerup", Te), t.domElement.getRootNode().removeEventListener("keydown", fe, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ke), t._domElementKeyEvents = null);
    };
    const t = this, s = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let a = s.NONE;
    const o = 1e-6, r = new wi(), h = new wi();
    let c = 1;
    const u = new le(), p = new Re(), g = new Re(), v = new Re(), R = new Re(), P = new Re(), k = new Re(), _ = new Re(), y = new Re(), x = new Re(), O = new le(), L = new Re();
    let A = !1;
    const C = [], ie = {};
    let X = !1;
    function qe(d) {
      return d !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * d : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function H(d) {
      const w = Math.abs(d * 0.01);
      return Math.pow(0.95, t.zoomSpeed * w);
    }
    function Ie(d) {
      h.theta -= d;
    }
    function be(d) {
      h.phi -= d;
    }
    const xe = function() {
      const d = new le();
      return function(V, K) {
        d.setFromMatrixColumn(K, 0), d.multiplyScalar(-V), u.add(d);
      };
    }(), Se = function() {
      const d = new le();
      return function(V, K) {
        t.screenSpacePanning === !0 ? d.setFromMatrixColumn(K, 1) : (d.setFromMatrixColumn(K, 0), d.crossVectors(t.object.up, d)), d.multiplyScalar(V), u.add(d);
      };
    }(), Ue = function() {
      const d = new le();
      return function(V, K) {
        const Oe = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const Ne = t.object.position;
          d.copy(Ne).sub(t.target);
          let we = d.length();
          we *= Math.tan(t.object.fov / 2 * Math.PI / 180), xe(2 * V * we / Oe.clientHeight, t.object.matrix), Se(2 * K * we / Oe.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (xe(V * (t.object.right - t.object.left) / t.object.zoom / Oe.clientWidth, t.object.matrix), Se(K * (t.object.top - t.object.bottom) / t.object.zoom / Oe.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Ze(d) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? c /= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function rt(d) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? c *= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function nt(d, w) {
      if (!t.zoomToCursor)
        return;
      A = !0;
      const V = t.domElement.getBoundingClientRect(), K = d - V.left, Oe = w - V.top, Ne = V.width, we = V.height;
      L.x = K / Ne * 2 - 1, L.y = -(Oe / we) * 2 + 1, O.set(L.x, L.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function st(d) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, d));
    }
    function mt(d) {
      p.set(d.clientX, d.clientY);
    }
    function ot(d) {
      nt(d.clientX, d.clientX), _.set(d.clientX, d.clientY);
    }
    function ve(d) {
      R.set(d.clientX, d.clientY);
    }
    function We(d) {
      g.set(d.clientX, d.clientY), v.subVectors(g, p).multiplyScalar(t.rotateSpeed);
      const w = t.domElement;
      Ie(2 * Math.PI * v.x / w.clientHeight), be(2 * Math.PI * v.y / w.clientHeight), p.copy(g), t.update();
    }
    function kt(d) {
      y.set(d.clientX, d.clientY), x.subVectors(y, _), x.y > 0 ? Ze(H(x.y)) : x.y < 0 && rt(H(x.y)), _.copy(y), t.update();
    }
    function pt(d) {
      P.set(d.clientX, d.clientY), k.subVectors(P, R).multiplyScalar(t.panSpeed), Ue(k.x, k.y), R.copy(P), t.update();
    }
    function De(d) {
      nt(d.clientX, d.clientY), d.deltaY < 0 ? rt(H(d.deltaY)) : d.deltaY > 0 && Ze(H(d.deltaY)), t.update();
    }
    function E(d) {
      let w = !1;
      switch (d.code) {
        case t.keys.UP:
          d.ctrlKey || d.metaKey || d.shiftKey ? be(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ue(0, t.keyPanSpeed), w = !0;
          break;
        case t.keys.BOTTOM:
          d.ctrlKey || d.metaKey || d.shiftKey ? be(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ue(0, -t.keyPanSpeed), w = !0;
          break;
        case t.keys.LEFT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Ie(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ue(t.keyPanSpeed, 0), w = !0;
          break;
        case t.keys.RIGHT:
          d.ctrlKey || d.metaKey || d.shiftKey ? Ie(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ue(-t.keyPanSpeed, 0), w = !0;
          break;
      }
      w && (d.preventDefault(), t.update());
    }
    function T(d) {
      if (C.length === 1)
        p.set(d.pageX, d.pageY);
      else {
        const w = lt(d), V = 0.5 * (d.pageX + w.x), K = 0.5 * (d.pageY + w.y);
        p.set(V, K);
      }
    }
    function D(d) {
      if (C.length === 1)
        R.set(d.pageX, d.pageY);
      else {
        const w = lt(d), V = 0.5 * (d.pageX + w.x), K = 0.5 * (d.pageY + w.y);
        R.set(V, K);
      }
    }
    function I(d) {
      const w = lt(d), V = d.pageX - w.x, K = d.pageY - w.y, Oe = Math.sqrt(V * V + K * K);
      _.set(0, Oe);
    }
    function ue(d) {
      t.enableZoom && I(d), t.enablePan && D(d);
    }
    function ne(d) {
      t.enableZoom && I(d), t.enableRotate && T(d);
    }
    function M(d) {
      if (C.length == 1)
        g.set(d.pageX, d.pageY);
      else {
        const V = lt(d), K = 0.5 * (d.pageX + V.x), Oe = 0.5 * (d.pageY + V.y);
        g.set(K, Oe);
      }
      v.subVectors(g, p).multiplyScalar(t.rotateSpeed);
      const w = t.domElement;
      Ie(2 * Math.PI * v.x / w.clientHeight), be(2 * Math.PI * v.y / w.clientHeight), p.copy(g);
    }
    function N(d) {
      if (C.length === 1)
        P.set(d.pageX, d.pageY);
      else {
        const w = lt(d), V = 0.5 * (d.pageX + w.x), K = 0.5 * (d.pageY + w.y);
        P.set(V, K);
      }
      k.subVectors(P, R).multiplyScalar(t.panSpeed), Ue(k.x, k.y), R.copy(P);
    }
    function ye(d) {
      const w = lt(d), V = d.pageX - w.x, K = d.pageY - w.y, Oe = Math.sqrt(V * V + K * K);
      y.set(0, Oe), x.set(0, Math.pow(y.y / _.y, t.zoomSpeed)), Ze(x.y), _.copy(y);
      const Ne = (d.pageX + w.x) * 0.5, we = (d.pageY + w.y) * 0.5;
      nt(Ne, we);
    }
    function Le(d) {
      t.enableZoom && ye(d), t.enablePan && N(d);
    }
    function Je(d) {
      t.enableZoom && ye(d), t.enableRotate && M(d);
    }
    function G(d) {
      t.enabled !== !1 && (C.length === 0 && (t.domElement.setPointerCapture(d.pointerId), t.domElement.addEventListener("pointermove", oe), t.domElement.addEventListener("pointerup", Te)), !ui(d) && (bt(d), d.pointerType === "touch" ? Fe(d) : ce(d)));
    }
    function oe(d) {
      t.enabled !== !1 && (d.pointerType === "touch" ? ct(d) : pe(d));
    }
    function Te(d) {
      switch (hi(d), C.length) {
        case 0:
          t.domElement.releasePointerCapture(d.pointerId), t.domElement.removeEventListener("pointermove", oe), t.domElement.removeEventListener("pointerup", Te), t.dispatchEvent(nn), a = s.NONE;
          break;
        case 1:
          const w = C[0], V = ie[w];
          Fe({ pointerId: w, pageX: V.x, pageY: V.y });
          break;
      }
    }
    function ce(d) {
      let w;
      switch (d.button) {
        case 0:
          w = t.mouseButtons.LEFT;
          break;
        case 1:
          w = t.mouseButtons.MIDDLE;
          break;
        case 2:
          w = t.mouseButtons.RIGHT;
          break;
        default:
          w = -1;
      }
      switch (w) {
        case Tt.DOLLY:
          if (t.enableZoom === !1)
            return;
          ot(d), a = s.DOLLY;
          break;
        case Tt.ROTATE:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (t.enablePan === !1)
              return;
            ve(d), a = s.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            mt(d), a = s.ROTATE;
          }
          break;
        case Tt.PAN:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (t.enableRotate === !1)
              return;
            mt(d), a = s.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            ve(d), a = s.PAN;
          }
          break;
        default:
          a = s.NONE;
      }
      a !== s.NONE && t.dispatchEvent(fi);
    }
    function pe(d) {
      switch (a) {
        case s.ROTATE:
          if (t.enableRotate === !1)
            return;
          We(d);
          break;
        case s.DOLLY:
          if (t.enableZoom === !1)
            return;
          kt(d);
          break;
        case s.PAN:
          if (t.enablePan === !1)
            return;
          pt(d);
          break;
      }
    }
    function B(d) {
      t.enabled === !1 || t.enableZoom === !1 || a !== s.NONE || (d.preventDefault(), t.dispatchEvent(fi), De(ee(d)), t.dispatchEvent(nn));
    }
    function ee(d) {
      const w = d.deltaMode, V = {
        clientX: d.clientX,
        clientY: d.clientY,
        deltaY: d.deltaY
      };
      switch (w) {
        case 1:
          V.deltaY *= 16;
          break;
        case 2:
          V.deltaY *= 100;
          break;
      }
      return d.ctrlKey && !X && (V.deltaY *= 10), V;
    }
    function fe(d) {
      d.key === "Control" && (X = !0, t.domElement.getRootNode().addEventListener("keyup", me, { passive: !0, capture: !0 }));
    }
    function me(d) {
      d.key === "Control" && (X = !1, t.domElement.getRootNode().removeEventListener("keyup", me, { passive: !0, capture: !0 }));
    }
    function ke(d) {
      t.enabled === !1 || t.enablePan === !1 || E(d);
    }
    function Fe(d) {
      switch (Gt(d), C.length) {
        case 1:
          switch (t.touches.ONE) {
            case xt.ROTATE:
              if (t.enableRotate === !1)
                return;
              T(d), a = s.TOUCH_ROTATE;
              break;
            case xt.PAN:
              if (t.enablePan === !1)
                return;
              D(d), a = s.TOUCH_PAN;
              break;
            default:
              a = s.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case xt.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              ue(d), a = s.TOUCH_DOLLY_PAN;
              break;
            case xt.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              ne(d), a = s.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = s.NONE;
          }
          break;
        default:
          a = s.NONE;
      }
      a !== s.NONE && t.dispatchEvent(fi);
    }
    function ct(d) {
      switch (Gt(d), a) {
        case s.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          M(d), t.update();
          break;
        case s.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          N(d), t.update();
          break;
        case s.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          Le(d), t.update();
          break;
        case s.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          Je(d), t.update();
          break;
        default:
          a = s.NONE;
      }
    }
    function Qe(d) {
      t.enabled !== !1 && d.preventDefault();
    }
    function bt(d) {
      C.push(d.pointerId);
    }
    function hi(d) {
      delete ie[d.pointerId];
      for (let w = 0; w < C.length; w++)
        if (C[w] == d.pointerId) {
          C.splice(w, 1);
          return;
        }
    }
    function ui(d) {
      for (let w = 0; w < C.length; w++)
        if (C[w] == d.pointerId)
          return !0;
      return !1;
    }
    function Gt(d) {
      let w = ie[d.pointerId];
      w === void 0 && (w = new Re(), ie[d.pointerId] = w), w.set(d.pageX, d.pageY);
    }
    function lt(d) {
      const w = d.pointerId === C[0] ? C[1] : C[0];
      return ie[w];
    }
    t.domElement.addEventListener("contextmenu", Qe), t.domElement.addEventListener("pointerdown", G), t.domElement.addEventListener("pointercancel", Te), t.domElement.addEventListener("wheel", B, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", fe, { passive: !0, capture: !0 }), this.update();
  }
}
const Ca = Math.PI / 180;
function wt(i, e, n, t, s) {
  return t + (i - e) * (s - t) / (n - e);
}
function an(i) {
  return i * Ca;
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const de = {
  LEFT: 1,
  RIGHT: 2,
  MIDDLE: 4
}, f = Object.freeze({
  NONE: 0,
  ROTATE: 1,
  TRUCK: 2,
  OFFSET: 4,
  DOLLY: 8,
  ZOOM: 16,
  TOUCH_ROTATE: 32,
  TOUCH_TRUCK: 64,
  TOUCH_OFFSET: 128,
  TOUCH_DOLLY: 256,
  TOUCH_ZOOM: 512,
  TOUCH_DOLLY_TRUCK: 1024,
  TOUCH_DOLLY_OFFSET: 2048,
  TOUCH_DOLLY_ROTATE: 4096,
  TOUCH_ZOOM_TRUCK: 8192,
  TOUCH_ZOOM_OFFSET: 16384,
  TOUCH_ZOOM_ROTATE: 32768
}), Mt = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function _t(i) {
  return i.isPerspectiveCamera;
}
function ht(i) {
  return i.isOrthographicCamera;
}
const Rt = Math.PI * 2, rn = Math.PI / 2, Yn = 1e-5, Nt = Math.PI / 180;
function Xe(i, e, n) {
  return Math.max(e, Math.min(n, i));
}
function ae(i, e = Yn) {
  return Math.abs(i) < e;
}
function te(i, e, n = Yn) {
  return ae(i - e, n);
}
function on(i, e) {
  return Math.round(i / e) * e;
}
function jt(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function zt(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function Xt(i, e, n, t, s = 1 / 0, a) {
  t = Math.max(1e-4, t);
  const o = 2 / t, r = o * a, h = 1 / (1 + r + 0.48 * r * r + 0.235 * r * r * r);
  let c = i - e;
  const u = e, p = s * t;
  c = Xe(c, -p, p), e = i - c;
  const g = (n.value + o * c) * a;
  n.value = (n.value - o * g) * h;
  let v = e + (c + g) * h;
  return u - i > 0 == v > u && (v = u, n.value = (v - u) / a), v;
}
function cn(i, e, n, t, s = 1 / 0, a, o) {
  t = Math.max(1e-4, t);
  const r = 2 / t, h = r * a, c = 1 / (1 + h + 0.48 * h * h + 0.235 * h * h * h);
  let u = e.x, p = e.y, g = e.z, v = i.x - u, R = i.y - p, P = i.z - g;
  const k = u, _ = p, y = g, x = s * t, O = x * x, L = v * v + R * R + P * P;
  if (L > O) {
    const Se = Math.sqrt(L);
    v = v / Se * x, R = R / Se * x, P = P / Se * x;
  }
  u = i.x - v, p = i.y - R, g = i.z - P;
  const A = (n.x + r * v) * a, C = (n.y + r * R) * a, ie = (n.z + r * P) * a;
  n.x = (n.x - r * A) * c, n.y = (n.y - r * C) * c, n.z = (n.z - r * ie) * c, o.x = u + (v + A) * c, o.y = p + (R + C) * c, o.z = g + (P + ie) * c;
  const X = k - i.x, qe = _ - i.y, H = y - i.z, Ie = o.x - k, be = o.y - _, xe = o.z - y;
  return X * Ie + qe * be + H * xe > 0 && (o.x = k, o.y = _, o.z = y, n.x = (o.x - k) / a, n.y = (o.y - _) / a, n.z = (o.z - y) / a), o;
}
function _i(i, e) {
  e.set(0, 0), i.forEach((n) => {
    e.x += n.clientX, e.y += n.clientY;
  }), e.x /= i.length, e.y /= i.length;
}
function gi(i, e) {
  return ht(i) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class Ta {
  constructor() {
    this._listeners = {};
  }
  /**
   * Adds the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(e, n) {
    const t = this._listeners;
    t[e] === void 0 && (t[e] = []), t[e].indexOf(n) === -1 && t[e].push(n);
  }
  /**
   * Presence of the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  hasEventListener(e, n) {
    const t = this._listeners;
    return t[e] !== void 0 && t[e].indexOf(n) !== -1;
  }
  /**
   * Removes the specified event listener
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(e, n) {
    const s = this._listeners[e];
    if (s !== void 0) {
      const a = s.indexOf(n);
      a !== -1 && s.splice(a, 1);
    }
  }
  /**
   * Removes all event listeners
   * @param type event name
   * @category Methods
   */
  removeAllEventListeners(e) {
    if (!e) {
      this._listeners = {};
      return;
    }
    Array.isArray(this._listeners[e]) && (this._listeners[e].length = 0);
  }
  /**
   * Fire an event type.
   * @param event DispatcherEvent
   * @category Methods
   */
  dispatchEvent(e) {
    const t = this._listeners[e.type];
    if (t !== void 0) {
      e.target = this;
      const s = t.slice(0);
      for (let a = 0, o = s.length; a < o; a++)
        s[a].call(this, e);
    }
  }
}
var vi;
const xa = "2.9.0", qt = 1 / 8, Sa = /Mac/.test((vi = globalThis?.navigator) === null || vi === void 0 ? void 0 : vi.platform);
let j, ln, Jt, yi, Pe, Y, q, Dt, Bt, et, tt, gt, dn, hn, He, Ht, At, un, Ei, mn, bi, Oi, Qt;
class it extends Ta {
  /**
       * Injects THREE as the dependency. You can then proceed to use CameraControls.
       *
       * e.g
       * ```javascript
       * CameraControls.install( { THREE: THREE } );
       * ```
       *
       * Note: If you do not wish to use enter three.js to reduce file size(tree-shaking for example), make a subset to install.
       *
       * ```js
       * import {
       * 	Vector2,
       * 	Vector3,
       * 	Vector4,
       * 	Quaternion,
       * 	Matrix4,
       * 	Spherical,
       * 	Box3,
       * 	Sphere,
       * 	Raycaster,
       * 	MathUtils,
       * } from 'three';
       *
       * const subsetOfTHREE = {
       * 	Vector2   : Vector2,
       * 	Vector3   : Vector3,
       * 	Vector4   : Vector4,
       * 	Quaternion: Quaternion,
       * 	Matrix4   : Matrix4,
       * 	Spherical : Spherical,
       * 	Box3      : Box3,
       * 	Sphere    : Sphere,
       * 	Raycaster : Raycaster,
       * };
  
       * CameraControls.install( { THREE: subsetOfTHREE } );
       * ```
       * @category Statics
       */
  static install(e) {
    j = e.THREE, ln = Object.freeze(new j.Vector3(0, 0, 0)), Jt = Object.freeze(new j.Vector3(0, 1, 0)), yi = Object.freeze(new j.Vector3(0, 0, 1)), Pe = new j.Vector2(), Y = new j.Vector3(), q = new j.Vector3(), Dt = new j.Vector3(), Bt = new j.Vector3(), et = new j.Vector3(), tt = new j.Vector3(), gt = new j.Vector3(), dn = new j.Vector3(), hn = new j.Vector3(), He = new j.Spherical(), Ht = new j.Spherical(), At = new j.Box3(), un = new j.Box3(), Ei = new j.Sphere(), mn = new j.Quaternion(), bi = new j.Quaternion(), Oi = new j.Matrix4(), Qt = new j.Raycaster();
  }
  /**
   * list all ACTIONs
   * @category Statics
   */
  static get ACTION() {
    return f;
  }
  /**
   * Creates a `CameraControls` instance.
   *
   * Note:
   * You **must install** three.js before using camera-controls. see [#install](#install)
   * Not doing so will lead to runtime errors (`undefined` references to THREE).
   *
   * e.g.
   * ```
   * CameraControls.install( { THREE } );
   * const cameraControls = new CameraControls( camera, domElement );
   * ```
   *
   * @param camera A `THREE.PerspectiveCamera` or `THREE.OrthographicCamera` to be controlled.
   * @param domElement A `HTMLElement` for the draggable area, usually `renderer.domElement`.
   * @category Constructor
   */
  constructor(e, n) {
    super(), this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.minDistance = Number.EPSILON, this.maxDistance = 1 / 0, this.infinityDolly = !1, this.minZoom = 0.01, this.maxZoom = 1 / 0, this.smoothTime = 0.25, this.draggingSmoothTime = 0.125, this.maxSpeed = 1 / 0, this.azimuthRotateSpeed = 1, this.polarRotateSpeed = 1, this.dollySpeed = 1, this.dollyDragInverted = !1, this.truckSpeed = 2, this.dollyToCursor = !1, this.dragToOffset = !1, this.verticalDragToForward = !1, this.boundaryFriction = 0, this.restThreshold = 0.01, this.colliderMeshes = [], this.cancel = () => {
    }, this._enabled = !0, this._state = f.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = Mt.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new j.Vector3(), this._focalOffsetVelocity = new j.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (_, y, x) => {
      let O, L;
      if (_t(this._camera)) {
        const A = Y.copy(this._camera.position).sub(this._target), C = this._camera.getEffectiveFOV() * Nt, ie = A.length() * Math.tan(C * 0.5);
        O = this.truckSpeed * _ * ie / this._elementRect.height, L = this.truckSpeed * y * ie / this._elementRect.height;
      } else if (ht(this._camera)) {
        const A = this._camera;
        O = _ * (A.right - A.left) / A.zoom / this._elementRect.width, L = y * (A.top - A.bottom) / A.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (x ? this.setFocalOffset(this._focalOffsetEnd.x + O, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(O, 0, !0), this.forward(-L, !0)) : x ? this.setFocalOffset(this._focalOffsetEnd.x + O, this._focalOffsetEnd.y + L, this._focalOffsetEnd.z, !0) : this.truck(O, L, !0);
    }, this._rotateInternal = (_, y) => {
      const x = Rt * this.azimuthRotateSpeed * _ / this._elementRect.height, O = Rt * this.polarRotateSpeed * y / this._elementRect.height;
      this.rotate(x, O, !0);
    }, this._dollyInternal = (_, y, x) => {
      const O = Math.pow(0.95, -_ * this.dollySpeed), L = this._sphericalEnd.radius, A = this._sphericalEnd.radius * O, C = Xe(A, this.minDistance, this.maxDistance), ie = C - A;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(A, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(ie, !0), this._dollyToNoClamp(C, !0)) : this._dollyToNoClamp(C, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? A : C) - L, this._dollyControlCoord.set(y, x)), this._lastDollyDirection = Math.sign(-_);
    }, this._zoomInternal = (_, y, x) => {
      const O = Math.pow(0.95, _ * this.dollySpeed), L = this._zoom, A = this._zoom * O;
      this.zoomTo(A, !0), this.dollyToCursor && (this._changedZoom += A - L, this._dollyControlCoord.set(y, x));
    }, typeof j > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new j.Quaternion().setFromUnitVectors(this._camera.up, Jt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = f.NONE, this._target = new j.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new j.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new j.Spherical().setFromVector3(Y.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new j.Vector3(),
      new j.Vector3(),
      new j.Vector3(),
      new j.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new j.Box3(new j.Vector3(-1 / 0, -1 / 0, -1 / 0), new j.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new j.Vector2(), this.mouseButtons = {
      left: f.ROTATE,
      middle: f.DOLLY,
      right: f.TRUCK,
      wheel: _t(this._camera) ? f.DOLLY : ht(this._camera) ? f.ZOOM : f.NONE
    }, this.touches = {
      one: f.TOUCH_ROTATE,
      two: _t(this._camera) ? f.TOUCH_DOLLY_TRUCK : ht(this._camera) ? f.TOUCH_ZOOM_TRUCK : f.NONE,
      three: f.TOUCH_TRUCK
    };
    const t = new j.Vector2(), s = new j.Vector2(), a = new j.Vector2(), o = (_) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), L = _.clientX / O.width, A = _.clientY / O.height;
        if (L < this._interactiveArea.left || L > this._interactiveArea.right || A < this._interactiveArea.top || A > this._interactiveArea.bottom)
          return;
      }
      const y = _.pointerType !== "mouse" ? null : (_.buttons & de.LEFT) === de.LEFT ? de.LEFT : (_.buttons & de.MIDDLE) === de.MIDDLE ? de.MIDDLE : (_.buttons & de.RIGHT) === de.RIGHT ? de.RIGHT : null;
      if (y !== null) {
        const O = this._findPointerByMouseButton(y);
        O && this._disposePointer(O);
      }
      if ((_.buttons & de.LEFT) === de.LEFT && this._lockedPointer)
        return;
      const x = {
        pointerId: _.pointerId,
        clientX: _.clientX,
        clientY: _.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: y
      };
      this._activePointers.push(x), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.addEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), this._isDragging = !0, g(_);
    }, r = (_) => {
      _.cancelable && _.preventDefault();
      const y = _.pointerId, x = this._lockedPointer || this._findPointerById(y);
      if (x) {
        if (x.clientX = _.clientX, x.clientY = _.clientY, x.deltaX = _.movementX, x.deltaY = _.movementY, this._state = 0, _.pointerType === "touch")
          switch (this._activePointers.length) {
            case 1:
              this._state = this.touches.one;
              break;
            case 2:
              this._state = this.touches.two;
              break;
            case 3:
              this._state = this.touches.three;
              break;
          }
        else
          (!this._isDragging && this._lockedPointer || this._isDragging && (_.buttons & de.LEFT) === de.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (_.buttons & de.MIDDLE) === de.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (_.buttons & de.RIGHT) === de.RIGHT && (this._state = this._state | this.mouseButtons.right);
        v();
      }
    }, h = (_) => {
      const y = this._findPointerById(_.pointerId);
      if (!(y && y === this._lockedPointer)) {
        if (y && this._disposePointer(y), _.pointerType === "touch")
          switch (this._activePointers.length) {
            case 0:
              this._state = f.NONE;
              break;
            case 1:
              this._state = this.touches.one;
              break;
            case 2:
              this._state = this.touches.two;
              break;
            case 3:
              this._state = this.touches.three;
              break;
          }
        else
          this._state = f.NONE;
        R();
      }
    };
    let c = -1;
    const u = (_) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === f.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const A = this._domElement.getBoundingClientRect(), C = _.clientX / A.width, ie = _.clientY / A.height;
        if (C < this._interactiveArea.left || C > this._interactiveArea.right || ie < this._interactiveArea.top || ie > this._interactiveArea.bottom)
          return;
      }
      if (_.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === f.ROTATE || this.mouseButtons.wheel === f.TRUCK) {
        const A = performance.now();
        c - A < 1e3 && this._getClientRect(this._elementRect), c = A;
      }
      const y = Sa ? -1 : -3, x = _.deltaMode === 1 ? _.deltaY / y : _.deltaY / (y * 10), O = this.dollyToCursor ? (_.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, L = this.dollyToCursor ? (_.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case f.ROTATE: {
          this._rotateInternal(_.deltaX, _.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case f.TRUCK: {
          this._truckInternal(_.deltaX, _.deltaY, !1), this._isUserControllingTruck = !0;
          break;
        }
        case f.OFFSET: {
          this._truckInternal(_.deltaX, _.deltaY, !0), this._isUserControllingOffset = !0;
          break;
        }
        case f.DOLLY: {
          this._dollyInternal(-x, O, L), this._isUserControllingDolly = !0;
          break;
        }
        case f.ZOOM: {
          this._zoomInternal(-x, O, L), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, p = (_) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === it.ACTION.NONE) {
          const y = _ instanceof PointerEvent ? _.pointerId : 0, x = this._findPointerById(y);
          x && this._disposePointer(x), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h);
          return;
        }
        _.preventDefault();
      }
    }, g = (_) => {
      if (!this._enabled)
        return;
      if (_i(this._activePointers, Pe), this._getClientRect(this._elementRect), t.copy(Pe), s.copy(Pe), this._activePointers.length >= 2) {
        const x = Pe.x - this._activePointers[1].clientX, O = Pe.y - this._activePointers[1].clientY, L = Math.sqrt(x * x + O * O);
        a.set(0, L);
        const A = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, C = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        s.set(A, C);
      }
      if (this._state = 0, !_)
        this._lockedPointer && (this._state = this._state | this.mouseButtons.left);
      else if ("pointerType" in _ && _.pointerType === "touch")
        switch (this._activePointers.length) {
          case 1:
            this._state = this.touches.one;
            break;
          case 2:
            this._state = this.touches.two;
            break;
          case 3:
            this._state = this.touches.three;
            break;
        }
      else
        !this._lockedPointer && (_.buttons & de.LEFT) === de.LEFT && (this._state = this._state | this.mouseButtons.left), (_.buttons & de.MIDDLE) === de.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (_.buttons & de.RIGHT) === de.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & f.ROTATE) === f.ROTATE || (this._state & f.TOUCH_ROTATE) === f.TOUCH_ROTATE || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & f.TRUCK) === f.TRUCK || (this._state & f.TOUCH_TRUCK) === f.TOUCH_TRUCK || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & f.DOLLY) === f.DOLLY || (this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & f.ZOOM) === f.ZOOM || (this._state & f.TOUCH_ZOOM) === f.TOUCH_ZOOM || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & f.OFFSET) === f.OFFSET || (this._state & f.TOUCH_OFFSET) === f.TOUCH_OFFSET || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, v = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, _i(this._activePointers, Pe);
      const y = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, x = y ? -y.deltaX : s.x - Pe.x, O = y ? -y.deltaY : s.y - Pe.y;
      if (s.copy(Pe), ((this._state & f.ROTATE) === f.ROTATE || (this._state & f.TOUCH_ROTATE) === f.TOUCH_ROTATE || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(x, O), this._isUserControllingRotate = !0), (this._state & f.DOLLY) === f.DOLLY || (this._state & f.ZOOM) === f.ZOOM) {
        const L = this.dollyToCursor ? (t.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, A = this.dollyToCursor ? (t.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, C = this.dollyDragInverted ? -1 : 1;
        (this._state & f.DOLLY) === f.DOLLY ? (this._dollyInternal(C * O * qt, L, A), this._isUserControllingDolly = !0) : (this._zoomInternal(C * O * qt, L, A), this._isUserControllingZoom = !0);
      }
      if ((this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_ZOOM) === f.TOUCH_ZOOM || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) {
        const L = Pe.x - this._activePointers[1].clientX, A = Pe.y - this._activePointers[1].clientY, C = Math.sqrt(L * L + A * A), ie = a.y - C;
        a.set(0, C);
        const X = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, qe = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(ie * qt, X, qe), this._isUserControllingDolly = !0) : (this._zoomInternal(ie * qt, X, qe), this._isUserControllingZoom = !0);
      }
      ((this._state & f.TRUCK) === f.TRUCK || (this._state & f.TOUCH_TRUCK) === f.TOUCH_TRUCK || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK) && (this._truckInternal(x, O, !1), this._isUserControllingTruck = !0), ((this._state & f.OFFSET) === f.OFFSET || (this._state & f.TOUCH_OFFSET) === f.TOUCH_OFFSET || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET) && (this._truckInternal(x, O, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, R = () => {
      _i(this._activePointers, Pe), s.copy(Pe), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", P), this._domElement.ownerDocument.addEventListener("pointerlockerror", k), this._domElement.ownerDocument.addEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), g());
    }, this.unlockPointer = () => {
      var _, y, x;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (_ = this._domElement) === null || _ === void 0 || _.ownerDocument.exitPointerLock(), (y = this._domElement) === null || y === void 0 || y.ownerDocument.removeEventListener("pointerlockchange", P), (x = this._domElement) === null || x === void 0 || x.ownerDocument.removeEventListener("pointerlockerror", k), this.cancel();
    };
    const P = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, k = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (_) => {
      this._domElement = _, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", o), this._domElement.addEventListener("pointercancel", h), this._domElement.addEventListener("wheel", u, { passive: !1 }), this._domElement.addEventListener("contextmenu", p);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", o), this._domElement.removeEventListener("pointercancel", h), this._domElement.removeEventListener("wheel", u, { passive: !1 }), this._domElement.removeEventListener("contextmenu", p), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.removeEventListener("pointerlockchange", P), this._domElement.ownerDocument.removeEventListener("pointerlockerror", k));
    }, this.cancel = () => {
      this._state !== f.NONE && (this._state = f.NONE, this._activePointers.length = 0, R());
    }, n && this.connect(n), this.update(0);
  }
  /**
   * The camera to be controlled
   * @category Properties
   */
  get camera() {
    return this._camera;
  }
  set camera(e) {
    this._camera = e, this.updateCameraUp(), this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0;
  }
  /**
   * Whether or not the controls are enabled.
   * `false` to disable user dragging/touch-move, but all methods works.
   * @category Properties
   */
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    this._enabled = e, this._domElement && (e ? (this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none") : (this.cancel(), this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = ""));
  }
  /**
   * Returns `true` if the controls are active updating.
   * readonly value.
   * @category Properties
   */
  get active() {
    return !this._hasRested;
  }
  /**
   * Getter for the current `ACTION`.
   * readonly value.
   * @category Properties
   */
  get currentAction() {
    return this._state;
  }
  /**
   * get/set Current distance.
   * @category Properties
   */
  get distance() {
    return this._spherical.radius;
  }
  set distance(e) {
    this._spherical.radius === e && this._sphericalEnd.radius === e || (this._spherical.radius = e, this._sphericalEnd.radius = e, this._needsUpdate = !0);
  }
  // horizontal angle
  /**
   * get/set the azimuth angle (horizontal) in radians.
   * Every 360 degrees turn is added to `.azimuthAngle` value, which is accumulative.
   * @category Properties
   */
  get azimuthAngle() {
    return this._spherical.theta;
  }
  set azimuthAngle(e) {
    this._spherical.theta === e && this._sphericalEnd.theta === e || (this._spherical.theta = e, this._sphericalEnd.theta = e, this._needsUpdate = !0);
  }
  // vertical angle
  /**
   * get/set the polar angle (vertical) in radians.
   * @category Properties
   */
  get polarAngle() {
    return this._spherical.phi;
  }
  set polarAngle(e) {
    this._spherical.phi === e && this._sphericalEnd.phi === e || (this._spherical.phi = e, this._sphericalEnd.phi = e, this._needsUpdate = !0);
  }
  /**
   * Whether camera position should be enclosed in the boundary or not.
   * @category Properties
   */
  get boundaryEnclosesCamera() {
    return this._boundaryEnclosesCamera;
  }
  set boundaryEnclosesCamera(e) {
    this._boundaryEnclosesCamera = e, this._needsUpdate = !0;
  }
  /**
   * Set drag-start, touches and wheel enable area in the domElement.
   * each values are between `0` and `1` inclusive, where `0` is left/top and `1` is right/bottom of the screen.
   * e.g. `{ x: 0, y: 0, width: 1, height: 1 }` for entire area.
   * @category Properties
   */
  set interactiveArea(e) {
    this._interactiveArea.width = Xe(e.width, 0, 1), this._interactiveArea.height = Xe(e.height, 0, 1), this._interactiveArea.x = Xe(e.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = Xe(e.y, 0, 1 - this._interactiveArea.height);
  }
  /**
   * Adds the specified event listener.
   * Applicable event types (which is `K`) are:
   * | Event name          | Timing |
   * | ------------------- | ------ |
   * | `'controlstart'`    | When the user starts to control the camera via mouse / touches. ¹ |
   * | `'control'`         | When the user controls the camera (dragging). |
   * | `'controlend'`      | When the user ends to control the camera. ¹ |
   * | `'transitionstart'` | When any kind of transition starts, either user control or using a method with `enableTransition = true` |
   * | `'update'`          | When the camera position is updated. |
   * | `'wake'`            | When the camera starts moving. |
   * | `'rest'`            | When the camera movement is below `.restThreshold` ². |
   * | `'sleep'`           | When the camera end moving. |
   *
   * 1. `mouseButtons.wheel` (Mouse wheel control) does not emit `'controlstart'` and `'controlend'`. `mouseButtons.wheel` uses scroll-event internally, and scroll-event happens intermittently. That means "start" and "end" cannot be detected.
   * 2. Due to damping, `sleep` will usually fire a few seconds after the camera _appears_ to have stopped moving. If you want to do something (e.g. enable UI, perform another transition) at the point when the camera has stopped, you probably want the `rest` event. This can be fine tuned using the `.restThreshold` parameter. See the [Rest and Sleep Example](https://yomotsu.github.io/camera-controls/examples/rest-and-sleep.html).
   *
   * e.g.
   * ```
   * cameraControl.addEventListener( 'controlstart', myCallbackFunction );
   * ```
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(e, n) {
    super.addEventListener(e, n);
  }
  /**
   * Removes the specified event listener
   * e.g.
   * ```
   * cameraControl.addEventListener( 'controlstart', myCallbackFunction );
   * ```
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(e, n) {
    super.removeEventListener(e, n);
  }
  /**
   * Rotate azimuthal angle(horizontal) and polar angle(vertical).
   * Every value is added to the current value.
   * @param azimuthAngle Azimuth rotate angle. In radian.
   * @param polarAngle Polar rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotate(e, n, t = !1) {
    return this.rotateTo(this._sphericalEnd.theta + e, this._sphericalEnd.phi + n, t);
  }
  /**
   * Rotate azimuthal angle(horizontal) to the given angle and keep the same polar angle(vertical) target.
   *
   * e.g.
   * ```
   * cameraControls.rotateAzimuthTo( 30 * THREE.MathUtils.DEG2RAD, true );
   * ```
   * @param azimuthAngle Azimuth rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotateAzimuthTo(e, n = !1) {
    return this.rotateTo(e, this._sphericalEnd.phi, n);
  }
  /**
   * Rotate polar angle(vertical) to the given angle and keep the same azimuthal angle(horizontal) target.
   *
   * e.g.
   * ```
   * cameraControls.rotatePolarTo( 30 * THREE.MathUtils.DEG2RAD, true );
   * ```
   * @param polarAngle Polar rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotatePolarTo(e, n = !1) {
    return this.rotateTo(this._sphericalEnd.theta, e, n);
  }
  /**
   * Rotate azimuthal angle(horizontal) and polar angle(vertical) to the given angle.
   * Camera view will rotate over the orbit pivot absolutely:
   *
   * azimuthAngle
   * ```
   *       0º
   *         \
   * 90º -----+----- -90º
   *           \
   *           180º
   * ```
   * | direction | angle                  |
   * | --------- | ---------------------- |
   * | front     | 0º                     |
   * | left      | 90º (`Math.PI / 2`)    |
   * | right     | -90º (`- Math.PI / 2`) |
   * | back      | 180º (`Math.PI`)       |
   *
   * polarAngle
   * ```
   *     180º
   *      |
   *      90º
   *      |
   *      0º
   * ```
   * | direction            | angle                  |
   * | -------------------- | ---------------------- |
   * | top/sky              | 180º (`Math.PI`)       |
   * | horizontal from view | 90º (`Math.PI / 2`)    |
   * | bottom/floor         | 0º                     |
   *
   * @param azimuthAngle Azimuth rotate angle to. In radian.
   * @param polarAngle Polar rotate angle to. In radian.
   * @param enableTransition  Whether to move smoothly or immediately
   * @category Methods
   */
  rotateTo(e, n, t = !1) {
    this._isUserControllingRotate = !1;
    const s = Xe(e, this.minAzimuthAngle, this.maxAzimuthAngle), a = Xe(n, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = s, this._sphericalEnd.phi = a, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, t || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const o = !t || te(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && te(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
    return this._createOnRestPromise(o);
  }
  /**
   * Dolly in/out camera position.
   * @param distance Distance of dollyIn. Negative number for dollyOut.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dolly(e, n = !1) {
    return this.dollyTo(this._sphericalEnd.radius - e, n);
  }
  /**
   * Dolly in/out camera position to given distance.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyTo(e, n = !1) {
    return this._isUserControllingDolly = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0, this._dollyToNoClamp(Xe(e, this.minDistance, this.maxDistance), n);
  }
  _dollyToNoClamp(e, n = !1) {
    const t = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const o = this._collisionTest(), r = te(o, this._spherical.radius);
      if (!(t > e) && r)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, o);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, n || (this._spherical.radius = this._sphericalEnd.radius);
    const a = !n || te(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(a);
  }
  /**
   * Dolly in, but does not change the distance between the target and the camera, and moves the target position instead.
   * Specify a negative value for dolly out.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyInFixed(e, n = !1) {
    this._targetEnd.add(this._getCameraDirection(Bt).multiplyScalar(e)), n || this._target.copy(this._targetEnd);
    const t = !n || te(this._target.x, this._targetEnd.x, this.restThreshold) && te(this._target.y, this._targetEnd.y, this.restThreshold) && te(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(t);
  }
  /**
   * Zoom in/out camera. The value is added to camera zoom.
   * Limits set with `.minZoom` and `.maxZoom`
   * @param zoomStep zoom scale
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  zoom(e, n = !1) {
    return this.zoomTo(this._zoomEnd + e, n);
  }
  /**
   * Zoom in/out camera to given scale. The value overwrites camera zoom.
   * Limits set with .minZoom and .maxZoom
   * @param zoom
   * @param enableTransition
   * @category Methods
   */
  zoomTo(e, n = !1) {
    this._isUserControllingZoom = !1, this._zoomEnd = Xe(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, n || (this._zoom = this._zoomEnd);
    const t = !n || te(this._zoom, this._zoomEnd, this.restThreshold);
    return this._changedZoom = 0, this._createOnRestPromise(t);
  }
  /**
   * @deprecated `pan()` has been renamed to `truck()`
   * @category Methods
   */
  pan(e, n, t = !1) {
    return console.warn("`pan` has been renamed to `truck`"), this.truck(e, n, t);
  }
  /**
   * Truck and pedestal camera using current azimuthal angle
   * @param x Horizontal translate amount
   * @param y Vertical translate amount
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  truck(e, n, t = !1) {
    this._camera.updateMatrix(), et.setFromMatrixColumn(this._camera.matrix, 0), tt.setFromMatrixColumn(this._camera.matrix, 1), et.multiplyScalar(e), tt.multiplyScalar(-n);
    const s = Y.copy(et).add(tt), a = q.copy(this._targetEnd).add(s);
    return this.moveTo(a.x, a.y, a.z, t);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, n = !1) {
    Y.setFromMatrixColumn(this._camera.matrix, 0), Y.crossVectors(this._camera.up, Y), Y.multiplyScalar(e);
    const t = q.copy(this._targetEnd).add(Y);
    return this.moveTo(t.x, t.y, t.z, n);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, n = !1) {
    return Y.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + Y.x, this._targetEnd.y + Y.y, this._targetEnd.z + Y.z, n);
  }
  /**
   * Move target position to given point.
   * @param x x coord to move center position
   * @param y y coord to move center position
   * @param z z coord to move center position
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  moveTo(e, n, t, s = !1) {
    this._isUserControllingTruck = !1;
    const a = Y.set(e, n, t).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, a, this.boundaryFriction), this._needsUpdate = !0, s || this._target.copy(this._targetEnd);
    const o = !s || te(this._target.x, this._targetEnd.x, this.restThreshold) && te(this._target.y, this._targetEnd.y, this.restThreshold) && te(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(o);
  }
  /**
   * Look in the given point direction.
   * @param x point x.
   * @param y point y.
   * @param z point z.
   * @param enableTransition Whether to move smoothly or immediately.
   * @returns Transition end promise
   * @category Methods
   */
  lookInDirectionOf(e, n, t, s = !1) {
    const r = Y.set(e, n, t).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
    return this.setPosition(r.x, r.y, r.z, s);
  }
  /**
   * Fit the viewport to the box or the bounding box of the object, using the nearest axis. paddings are in unit.
   * set `cover: true` to fill enter screen.
   * e.g.
   * ```
   * cameraControls.fitToBox( myMesh );
   * ```
   * @param box3OrObject Axis aligned bounding box to fit the view.
   * @param enableTransition Whether to move smoothly or immediately.
   * @param options | `<object>` { cover: boolean, paddingTop: number, paddingLeft: number, paddingBottom: number, paddingRight: number }
   * @returns Transition end promise
   * @category Methods
   */
  fitToBox(e, n, { cover: t = !1, paddingLeft: s = 0, paddingRight: a = 0, paddingBottom: o = 0, paddingTop: r = 0 } = {}) {
    const h = [], c = e.isBox3 ? At.copy(e) : At.setFromObject(e);
    c.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const u = on(this._sphericalEnd.theta, rn), p = on(this._sphericalEnd.phi, rn);
    h.push(this.rotateTo(u, p, n));
    const g = Y.setFromSpherical(this._sphericalEnd).normalize(), v = mn.setFromUnitVectors(g, yi), R = te(Math.abs(g.y), 1);
    R && v.multiply(bi.setFromAxisAngle(Jt, u)), v.multiply(this._yAxisUpSpaceInverse);
    const P = un.makeEmpty();
    q.copy(c.min).applyQuaternion(v), P.expandByPoint(q), q.copy(c.min).setX(c.max.x).applyQuaternion(v), P.expandByPoint(q), q.copy(c.min).setY(c.max.y).applyQuaternion(v), P.expandByPoint(q), q.copy(c.max).setZ(c.min.z).applyQuaternion(v), P.expandByPoint(q), q.copy(c.min).setZ(c.max.z).applyQuaternion(v), P.expandByPoint(q), q.copy(c.max).setY(c.min.y).applyQuaternion(v), P.expandByPoint(q), q.copy(c.max).setX(c.min.x).applyQuaternion(v), P.expandByPoint(q), q.copy(c.max).applyQuaternion(v), P.expandByPoint(q), P.min.x -= s, P.min.y -= o, P.max.x += a, P.max.y += r, v.setFromUnitVectors(yi, g), R && v.premultiply(bi.invert()), v.premultiply(this._yAxisUpSpace);
    const k = P.getSize(Y), _ = P.getCenter(q).applyQuaternion(v);
    if (_t(this._camera)) {
      const y = this.getDistanceToFitBox(k.x, k.y, k.z, t);
      h.push(this.moveTo(_.x, _.y, _.z, n)), h.push(this.dollyTo(y, n)), h.push(this.setFocalOffset(0, 0, 0, n));
    } else if (ht(this._camera)) {
      const y = this._camera, x = y.right - y.left, O = y.top - y.bottom, L = t ? Math.max(x / k.x, O / k.y) : Math.min(x / k.x, O / k.y);
      h.push(this.moveTo(_.x, _.y, _.z, n)), h.push(this.zoomTo(L, n)), h.push(this.setFocalOffset(0, 0, 0, n));
    }
    return Promise.all(h);
  }
  /**
   * Fit the viewport to the sphere or the bounding sphere of the object.
   * @param sphereOrMesh
   * @param enableTransition
   * @category Methods
   */
  fitToSphere(e, n) {
    const t = [], a = "isObject3D" in e ? it.createBoundingSphere(e, Ei) : Ei.copy(e);
    if (t.push(this.moveTo(a.center.x, a.center.y, a.center.z, n)), _t(this._camera)) {
      const o = this.getDistanceToFitSphere(a.radius);
      t.push(this.dollyTo(o, n));
    } else if (ht(this._camera)) {
      const o = this._camera.right - this._camera.left, r = this._camera.top - this._camera.bottom, h = 2 * a.radius, c = Math.min(o / h, r / h);
      t.push(this.zoomTo(c, n));
    }
    return t.push(this.setFocalOffset(0, 0, 0, n)), Promise.all(t);
  }
  /**
   * Look at the `target` from the `position`.
   * @param positionX
   * @param positionY
   * @param positionZ
   * @param targetX
   * @param targetY
   * @param targetZ
   * @param enableTransition
   * @category Methods
   */
  setLookAt(e, n, t, s, a, o, r = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0;
    const h = q.set(s, a, o), c = Y.set(e, n, t);
    this._targetEnd.copy(h), this._sphericalEnd.setFromVector3(c.sub(h).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, r || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const u = !r || te(this._target.x, this._targetEnd.x, this.restThreshold) && te(this._target.y, this._targetEnd.y, this.restThreshold) && te(this._target.z, this._targetEnd.z, this.restThreshold) && te(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && te(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && te(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(u);
  }
  /**
   * Similar to setLookAt, but it interpolates between two states.
   * @param positionAX
   * @param positionAY
   * @param positionAZ
   * @param targetAX
   * @param targetAY
   * @param targetAZ
   * @param positionBX
   * @param positionBY
   * @param positionBZ
   * @param targetBX
   * @param targetBY
   * @param targetBZ
   * @param t
   * @param enableTransition
   * @category Methods
   */
  lerpLookAt(e, n, t, s, a, o, r, h, c, u, p, g, v, R = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0;
    const P = Y.set(s, a, o), k = q.set(e, n, t);
    He.setFromVector3(k.sub(P).applyQuaternion(this._yAxisUpSpace));
    const _ = Dt.set(u, p, g), y = q.set(r, h, c);
    Ht.setFromVector3(y.sub(_).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(P.lerp(_, v));
    const x = Ht.theta - He.theta, O = Ht.phi - He.phi, L = Ht.radius - He.radius;
    this._sphericalEnd.set(He.radius + L * v, He.phi + O * v, He.theta + x * v), this.normalizeRotations(), this._needsUpdate = !0, R || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const A = !R || te(this._target.x, this._targetEnd.x, this.restThreshold) && te(this._target.y, this._targetEnd.y, this.restThreshold) && te(this._target.z, this._targetEnd.z, this.restThreshold) && te(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && te(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && te(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(A);
  }
  /**
   * Set angle and distance by given position.
   * An alias of `setLookAt()`, without target change. Thus keep gazing at the current target
   * @param positionX
   * @param positionY
   * @param positionZ
   * @param enableTransition
   * @category Methods
   */
  setPosition(e, n, t, s = !1) {
    return this.setLookAt(e, n, t, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, s);
  }
  /**
   * Set the target position where gaze at.
   * An alias of `setLookAt()`, without position change. Thus keep the same position.
   * @param targetX
   * @param targetY
   * @param targetZ
   * @param enableTransition
   * @category Methods
   */
  setTarget(e, n, t, s = !1) {
    const a = this.getPosition(Y), o = this.setLookAt(a.x, a.y, a.z, e, n, t, s);
    return this._sphericalEnd.phi = Xe(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), o;
  }
  /**
   * Set focal offset using the screen parallel coordinates. z doesn't affect in Orthographic as with Dolly.
   * @param x
   * @param y
   * @param z
   * @param enableTransition
   * @category Methods
   */
  setFocalOffset(e, n, t, s = !1) {
    this._isUserControllingOffset = !1, this._focalOffsetEnd.set(e, n, t), this._needsUpdate = !0, s || this._focalOffset.copy(this._focalOffsetEnd);
    const a = !s || te(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && te(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && te(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
    return this._createOnRestPromise(a);
  }
  /**
   * Set orbit point without moving the camera.
   * SHOULD NOT RUN DURING ANIMATIONS. `setOrbitPoint()` will immediately fix the positions.
   * @param targetX
   * @param targetY
   * @param targetZ
   * @category Methods
   */
  setOrbitPoint(e, n, t) {
    this._camera.updateMatrixWorld(), et.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), tt.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), gt.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const s = Y.set(e, n, t), a = s.distanceTo(this._camera.position), o = s.sub(this._camera.position);
    et.multiplyScalar(o.x), tt.multiplyScalar(o.y), gt.multiplyScalar(o.z), Y.copy(et).add(tt).add(gt), Y.z = Y.z + a, this.dollyTo(a, !1), this.setFocalOffset(-Y.x, Y.y, -Y.z, !1), this.moveTo(e, n, t, !1);
  }
  /**
   * Set the boundary box that encloses the target of the camera. box3 is in THREE.Box3
   * @param box3
   * @category Methods
   */
  setBoundary(e) {
    if (!e) {
      this._boundary.min.set(-1 / 0, -1 / 0, -1 / 0), this._boundary.max.set(1 / 0, 1 / 0, 1 / 0), this._needsUpdate = !0;
      return;
    }
    this._boundary.copy(e), this._boundary.clampPoint(this._targetEnd, this._targetEnd), this._needsUpdate = !0;
  }
  /**
   * Set (or unset) the current viewport.
   * Set this when you want to use renderer viewport and .dollyToCursor feature at the same time.
   * @param viewportOrX
   * @param y
   * @param width
   * @param height
   * @category Methods
   */
  setViewport(e, n, t, s) {
    if (e === null) {
      this._viewport = null;
      return;
    }
    this._viewport = this._viewport || new j.Vector4(), typeof e == "number" ? this._viewport.set(e, n, t, s) : this._viewport.copy(e);
  }
  /**
   * Calculate the distance to fit the box.
   * @param width box width
   * @param height box height
   * @param depth box depth
   * @returns distance
   * @category Methods
   */
  getDistanceToFitBox(e, n, t, s = !1) {
    if (gi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const a = e / n, o = this._camera.getEffectiveFOV() * Nt, r = this._camera.aspect;
    return ((s ? a > r : a < r) ? n : e / r) * 0.5 / Math.tan(o * 0.5) + t * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (gi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const n = this._camera.getEffectiveFOV() * Nt, t = Math.atan(Math.tan(n * 0.5) * this._camera.aspect) * 2, s = 1 < this._camera.aspect ? n : t;
    return e / Math.sin(s * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, n = !0) {
    return (e && e.isVector3 ? e : new j.Vector3()).copy(n ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, n = !0) {
    return (e && e.isVector3 ? e : new j.Vector3()).setFromSpherical(n ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(n ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, n = !0) {
    return (e || new j.Spherical()).copy(n ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, n = !0) {
    return (e && e.isVector3 ? e : new j.Vector3()).copy(n ? this._focalOffsetEnd : this._focalOffset);
  }
  /**
   * Normalize camera azimuth angle rotation between 0 and 360 degrees.
   * @category Methods
   */
  normalizeRotations() {
    this._sphericalEnd.theta = this._sphericalEnd.theta % Rt, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += Rt), this._spherical.theta += Rt * Math.round((this._sphericalEnd.theta - this._spherical.theta) / Rt);
  }
  /**
   * stop all transitions.
   */
  stop() {
    this._focalOffset.copy(this._focalOffsetEnd), this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd), this._zoom = this._zoomEnd;
  }
  /**
   * Reset all rotation and position to defaults.
   * @param enableTransition
   * @category Methods
   */
  reset(e = !1) {
    if (!te(this._camera.up.x, this._cameraUp0.x) || !te(this._camera.up.y, this._cameraUp0.y) || !te(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const t = this.getPosition(Y);
      this.updateCameraUp(), this.setPosition(t.x, t.y, t.z);
    }
    const n = [
      this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, e),
      this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, e),
      this.zoomTo(this._zoom0, e)
    ];
    return Promise.all(n);
  }
  /**
   * Set current camera position as the default position.
   * @category Methods
   */
  saveState() {
    this._cameraUp0.copy(this._camera.up), this.getTarget(this._target0), this.getPosition(this._position0), this._zoom0 = this._zoom, this._focalOffset0.copy(this._focalOffset);
  }
  /**
   * Sync camera-up direction.
   * When camera-up vector is changed, `.updateCameraUp()` must be called.
   * @category Methods
   */
  updateCameraUp() {
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, Jt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = Y.subVectors(this._target, this._camera.position).normalize(), n = q.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(n, e).normalize(), this._camera.updateMatrixWorld();
    const t = this.getPosition(Y);
    this.updateCameraUp(), this.setPosition(t.x, t.y, t.z);
  }
  /**
   * Update camera position and directions.
   * This should be called in your tick loop every time, and returns true if re-rendering is needed.
   * @param delta
   * @returns updated
   * @category Methods
   */
  update(e) {
    const n = this._sphericalEnd.theta - this._spherical.theta, t = this._sphericalEnd.phi - this._spherical.phi, s = this._sphericalEnd.radius - this._spherical.radius, a = dn.subVectors(this._targetEnd, this._target), o = hn.subVectors(this._focalOffsetEnd, this._focalOffset), r = this._zoomEnd - this._zoom;
    if (ae(n))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Xt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (ae(t))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Xt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (ae(s))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const p = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Xt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, p, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (ae(a.x) && ae(a.y) && ae(a.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const p = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      cn(this._target, this._targetEnd, this._targetVelocity, p, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (ae(o.x) && ae(o.y) && ae(o.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const p = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      cn(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, p, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (ae(r))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const p = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Xt(this._zoom, this._zoomEnd, this._zoomVelocity, p, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (_t(this._camera) && this._changedDolly !== 0) {
        const p = this._spherical.radius - this._lastDistance, g = this._camera, v = this._getCameraDirection(Bt), R = Y.copy(v).cross(g.up).normalize();
        R.lengthSq() === 0 && (R.x = 1);
        const P = q.crossVectors(R, v), k = this._sphericalEnd.radius * Math.tan(g.getEffectiveFOV() * Nt * 0.5), y = (this._sphericalEnd.radius - p - this._sphericalEnd.radius) / this._sphericalEnd.radius, x = Dt.copy(this._targetEnd).add(R.multiplyScalar(this._dollyControlCoord.x * k * g.aspect)).add(P.multiplyScalar(this._dollyControlCoord.y * k)), O = Y.copy(this._targetEnd).lerp(x, y), L = this._lastDollyDirection === Mt.IN && this._spherical.radius <= this.minDistance, A = this._lastDollyDirection === Mt.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (L || A)) {
          this._sphericalEnd.radius -= p, this._spherical.radius -= p;
          const ie = q.copy(v).multiplyScalar(-p);
          O.add(ie);
        }
        this._boundary.clampPoint(O, O);
        const C = q.subVectors(O, this._targetEnd);
        this._targetEnd.copy(O), this._target.add(C), this._changedDolly -= p, ae(this._changedDolly) && (this._changedDolly = 0);
      } else if (ht(this._camera) && this._changedZoom !== 0) {
        const p = this._zoom - this._lastZoom, g = this._camera, v = Y.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (g.near + g.far) / (g.near - g.far)).unproject(g), R = q.set(0, 0, -1).applyQuaternion(g.quaternion), P = Dt.copy(v).add(R.multiplyScalar(-v.dot(g.up))), _ = -(this._zoom - p - this._zoom) / this._zoom, y = this._getCameraDirection(Bt), x = this._targetEnd.dot(y), O = Y.copy(this._targetEnd).lerp(P, _), L = O.dot(y), A = y.multiplyScalar(L - x);
        O.sub(A), this._boundary.clampPoint(O, O);
        const C = q.subVectors(O, this._targetEnd);
        this._targetEnd.copy(O), this._target.add(C), this._changedZoom -= p, ae(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const h = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, h), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!ae(this._focalOffset.x) || !ae(this._focalOffset.y) || !ae(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), et.setFromMatrixColumn(this._camera.matrix, 0), tt.setFromMatrixColumn(this._camera.matrix, 1), gt.setFromMatrixColumn(this._camera.matrix, 2), et.multiplyScalar(this._focalOffset.x), tt.multiplyScalar(-this._focalOffset.y), gt.multiplyScalar(this._focalOffset.z), Y.copy(et).add(tt).add(gt), this._camera.position.add(Y)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), Y.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const u = this._needsUpdate;
    return u && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : u ? (this.dispatchEvent({ type: "update" }), ae(n, this.restThreshold) && ae(t, this.restThreshold) && ae(s, this.restThreshold) && ae(a.x, this.restThreshold) && ae(a.y, this.restThreshold) && ae(a.z, this.restThreshold) && ae(o.x, this.restThreshold) && ae(o.y, this.restThreshold) && ae(o.z, this.restThreshold) && ae(r, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !u && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = u, this._needsUpdate = !1, u;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: jt(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: jt(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: jt(this.maxPolarAngle),
      minAzimuthAngle: jt(this.minAzimuthAngle),
      maxAzimuthAngle: jt(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      verticalDragToForward: this.verticalDragToForward,
      target: this._targetEnd.toArray(),
      position: Y.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
      zoom: this._zoomEnd,
      focalOffset: this._focalOffsetEnd.toArray(),
      target0: this._target0.toArray(),
      position0: this._position0.toArray(),
      zoom0: this._zoom0,
      focalOffset0: this._focalOffset0.toArray()
    });
  }
  /**
   * Reproduce the control state with JSON. enableTransition is where anim or not in a boolean.
   * @param json
   * @param enableTransition
   * @category Methods
   */
  fromJSON(e, n = !1) {
    const t = JSON.parse(e);
    this.enabled = t.enabled, this.minDistance = t.minDistance, this.maxDistance = zt(t.maxDistance), this.minZoom = t.minZoom, this.maxZoom = zt(t.maxZoom), this.minPolarAngle = t.minPolarAngle, this.maxPolarAngle = zt(t.maxPolarAngle), this.minAzimuthAngle = zt(t.minAzimuthAngle), this.maxAzimuthAngle = zt(t.maxAzimuthAngle), this.smoothTime = t.smoothTime, this.draggingSmoothTime = t.draggingSmoothTime, this.dollySpeed = t.dollySpeed, this.truckSpeed = t.truckSpeed, this.dollyToCursor = t.dollyToCursor, this.verticalDragToForward = t.verticalDragToForward, this._target0.fromArray(t.target0), this._position0.fromArray(t.position0), this._zoom0 = t.zoom0, this._focalOffset0.fromArray(t.focalOffset0), this.moveTo(t.target[0], t.target[1], t.target[2], n), He.setFromVector3(Y.fromArray(t.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(He.theta, He.phi, n), this.dollyTo(He.radius, n), this.zoomTo(t.zoom, n), this.setFocalOffset(t.focalOffset[0], t.focalOffset[1], t.focalOffset[2], n), this._needsUpdate = !0;
  }
  /**
   * Attach all internal event handlers to enable drag control.
   * @category Methods
   */
  connect(e) {
    if (this._domElement) {
      console.warn("camera-controls is already connected.");
      return;
    }
    e.setAttribute("data-camera-controls-version", xa), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
  }
  /**
   * Detach all internal event handlers to disable drag control.
   */
  disconnect() {
    this.cancel(), this._removeAllEventListeners(), this._domElement && (this._domElement.removeAttribute("data-camera-controls-version"), this._domElement = void 0);
  }
  /**
   * Dispose the cameraControls instance itself, remove all eventListeners.
   * @category Methods
   */
  dispose() {
    this.removeAllEventListeners(), this.disconnect();
  }
  // it's okay to expose public though
  _getTargetDirection(e) {
    return e.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse);
  }
  // it's okay to expose public though
  _getCameraDirection(e) {
    return this._getTargetDirection(e).negate();
  }
  _findPointerById(e) {
    return this._activePointers.find((n) => n.pointerId === e);
  }
  _findPointerByMouseButton(e) {
    return this._activePointers.find((n) => n.mouseButton === e);
  }
  _disposePointer(e) {
    this._activePointers.splice(this._activePointers.indexOf(e), 1);
  }
  _encloseToBoundary(e, n, t) {
    const s = n.lengthSq();
    if (s === 0)
      return e;
    const a = q.copy(n).add(e), r = this._boundary.clampPoint(a, Dt).sub(a), h = r.lengthSq();
    if (h === 0)
      return e.add(n);
    if (h === s)
      return e;
    if (t === 0)
      return e.add(n).add(r);
    {
      const c = 1 + t * h / n.dot(r);
      return e.add(q.copy(n).multiplyScalar(c)).add(r.multiplyScalar(1 - t));
    }
  }
  _updateNearPlaneCorners() {
    if (_t(this._camera)) {
      const e = this._camera, n = e.near, t = e.getEffectiveFOV() * Nt, s = Math.tan(t * 0.5) * n, a = s * e.aspect;
      this._nearPlaneCorners[0].set(-a, -s, 0), this._nearPlaneCorners[1].set(a, -s, 0), this._nearPlaneCorners[2].set(a, s, 0), this._nearPlaneCorners[3].set(-a, s, 0);
    } else if (ht(this._camera)) {
      const e = this._camera, n = 1 / e.zoom, t = e.left * n, s = e.right * n, a = e.top * n, o = e.bottom * n;
      this._nearPlaneCorners[0].set(t, a, 0), this._nearPlaneCorners[1].set(s, a, 0), this._nearPlaneCorners[2].set(s, o, 0), this._nearPlaneCorners[3].set(t, o, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || gi(this._camera, "_collisionTest"))
      return e;
    const t = this._getTargetDirection(Bt);
    Oi.lookAt(ln, t, this._camera.up);
    for (let s = 0; s < 4; s++) {
      const a = q.copy(this._nearPlaneCorners[s]);
      a.applyMatrix4(Oi);
      const o = Dt.addVectors(this._target, a);
      Qt.set(o, t), Qt.far = this._spherical.radius + 1;
      const r = Qt.intersectObjects(this.colliderMeshes);
      r.length !== 0 && r[0].distance < e && (e = r[0].distance);
    }
    return e;
  }
  /**
   * Get its client rect and package into given `DOMRect` .
   */
  _getClientRect(e) {
    if (!this._domElement)
      return;
    const n = this._domElement.getBoundingClientRect();
    return e.x = n.left, e.y = n.top, this._viewport ? (e.x += this._viewport.x, e.y += n.height - this._viewport.w - this._viewport.y, e.width = this._viewport.z, e.height = this._viewport.w) : (e.width = n.width, e.height = n.height), e;
  }
  _createOnRestPromise(e) {
    return e ? Promise.resolve() : (this._hasRested = !1, this.dispatchEvent({ type: "transitionstart" }), new Promise((n) => {
      const t = () => {
        this.removeEventListener("rest", t), n();
      };
      this.addEventListener("rest", t);
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _addAllEventListeners(e) {
  }
  _removeAllEventListeners() {
  }
  /**
   * backward compatible
   * @deprecated use smoothTime (in seconds) instead
   * @category Properties
   */
  get dampingFactor() {
    return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."), 0;
  }
  /**
   * backward compatible
   * @deprecated use smoothTime (in seconds) instead
   * @category Properties
   */
  set dampingFactor(e) {
    console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.");
  }
  /**
   * backward compatible
   * @deprecated use draggingSmoothTime (in seconds) instead
   * @category Properties
   */
  get draggingDampingFactor() {
    return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."), 0;
  }
  /**
   * backward compatible
   * @deprecated use draggingSmoothTime (in seconds) instead
   * @category Properties
   */
  set draggingDampingFactor(e) {
    console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.");
  }
  static createBoundingSphere(e, n = new j.Sphere()) {
    const t = n, s = t.center;
    At.makeEmpty(), e.traverseVisible((o) => {
      o.isMesh && At.expandByObject(o);
    }), At.getCenter(s);
    let a = 0;
    return e.traverseVisible((o) => {
      if (!o.isMesh)
        return;
      const r = o, h = r.geometry.clone();
      h.applyMatrix4(r.matrixWorld);
      const u = h.attributes.position;
      for (let p = 0, g = u.count; p < g; p++)
        Y.fromBufferAttribute(u, p), a = Math.max(a, s.distanceToSquared(Y));
    }), t.radius = Math.sqrt(a), t;
  }
}
const ri = (i) => {
  const [e, n] = Z(i.options[i.index]), t = () => {
    i.onToggle(!i.open);
  }, s = (a) => {
    a !== e && (i.onSelect(a), n(a)), i.onToggle(!1);
  };
  return /* @__PURE__ */ m.jsxs("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ m.jsx("div", { className: "dropdown-toggle", onClick: t, children: `${i.title}: ${e}` }),
    i.open && /* @__PURE__ */ m.jsx("ul", { className: "dropdown-menu", children: i.options.map((a) => /* @__PURE__ */ m.jsx("li", { onClick: () => s(a), children: a }, a)) })
  ] });
}, vt = As(function(e, n) {
  const t = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [s, a] = Z("Renderer"), [o, r] = Z(!1), [h, c] = Z(!1), [u, p] = Z(!1);
  return /* @__PURE__ */ m.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ m.jsx("div", { ref: n, className: "clickable", onClick: () => {
      u && p(!1);
    } }),
    /* @__PURE__ */ m.jsxs("div", { className: "options", children: [
      /* @__PURE__ */ m.jsx(
        ri,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: u,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (g) => {
            p(g);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ m.jsx(
        ri,
        {
          title: "Mode",
          index: t.indexOf(s),
          open: h,
          options: t,
          onSelect: (g) => {
            if (g === s)
              return;
            const v = g;
            e.onSelectRenderMode(v), a(v);
          },
          onToggle: (g) => {
            o && r(!1), c(g);
          },
          up: !0
        }
      )
    ] })
  ] });
});
class wa extends In {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: ms,
      side: yn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: e?.scale !== void 0 ? e?.scale : 0.1
        },
        uDivisions: {
          value: e?.divisions !== void 0 ? e?.divisions : 10
        },
        uColor: {
          value: e?.color !== void 0 ? e?.color : new ci(16777215)
        },
        uDistance: {
          value: e?.distance !== void 0 ? e?.distance : 1e4
        },
        uSubgridOpacity: {
          value: e?.subgridOpacity !== void 0 ? e?.subgridOpacity : 0.15
        },
        uGridOpacity: {
          value: e?.gridOpacity !== void 0 ? e?.gridOpacity : 0.25
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
class Ma extends oi {
  gridMaterial;
  constructor() {
    const e = new wa();
    super(new ps(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Ra = `#include <common>
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
}`, Da = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Aa extends In {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ra,
      fragmentShader: Da
    });
  }
}
let Ye, Ci = !1, J = null, he = null, Ve = null, Ge = null, Pt = "Renderer", ei = "Renderer", pn = "Renderer", fn = "Renderer";
function Za(i) {
  const e = i.three.app.appID, n = Ce(() => /* @__PURE__ */ new Map(), []), t = Ce(() => /* @__PURE__ */ new Map(), []), s = Ce(() => /* @__PURE__ */ new Map(), []), a = Ce(() => /* @__PURE__ */ new Map(), []), o = Ce(() => new _n(), []), r = Ce(() => new fs(), []), h = Ce(() => new Ma(), []), c = Ce(() => new Bi(500), []), u = Ce(() => new Bi(100), []), p = Ce(() => new _s(), []), g = Ce(() => new gs(), []), v = Ce(() => new Aa(), []), R = Ce(() => new Li({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function P(E, T) {
    const D = new Ti(-100, 100, 100, -100, 50, 5e3);
    return D.name = E, D.position.copy(T), D.lookAt(0, 0, 0), n.set(E, D), D;
  }
  const k = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], _ = re(null), y = re(null), x = re(null), O = re(null), L = re(null), A = re(null), C = localStorage, ie = C.getItem(`${e}_mode`), [X, qe] = Z(ie !== null ? ie : "Single"), [H, Ie] = Z(null), [be, xe] = Z(!1), [Se, Ue] = Z(!1), [Ze, rt] = Z("Orbit"), [nt, st] = Z(!1), [mt, ot] = Z(Date.now());
  C.setItem(`${e}_mode`, X), C.setItem(`${e}_tlCam`, C.getItem(`${e}_tlCam`) !== null ? C.getItem(`${e}_tlCam`) : "Debug"), C.setItem(`${e}_trCam`, C.getItem(`${e}_trCam`) !== null ? C.getItem(`${e}_trCam`) : "Orthographic"), C.setItem(`${e}_blCam`, C.getItem(`${e}_blCam`) !== null ? C.getItem(`${e}_blCam`) : "Front"), C.setItem(`${e}_brCam`, C.getItem(`${e}_brCam`) !== null ? C.getItem(`${e}_brCam`) : "Top"), C.setItem(`${e}_tlRender`, C.getItem(`${e}_tlRender`) !== null ? C.getItem(`${e}_tlRender`) : "Renderer"), C.setItem(`${e}_trRender`, C.getItem(`${e}_trRender`) !== null ? C.getItem(`${e}_trRender`) : "Renderer"), C.setItem(`${e}_blRender`, C.getItem(`${e}_blRender`) !== null ? C.getItem(`${e}_blRender`) : "Renderer"), C.setItem(`${e}_brRender`, C.getItem(`${e}_brRender`) !== null ? C.getItem(`${e}_brRender`) : "Renderer");
  const ve = (E, T) => {
    const D = t.get(E.name);
    if (D !== void 0 && D.dispose(), t.delete(E.name), E.name === "UI")
      return;
    const I = new Oa(E, T);
    switch (I.enableDamping = !0, I.dampingFactor = 0.05, E.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        I.enableRotate = !1;
        break;
    }
    t.set(E.name, I);
  }, We = (E) => {
    const T = s.get(E.name);
    T !== void 0 && (o.remove(T), T.dispose(), s.delete(E.name));
    const D = t.get(E.name);
    D !== void 0 && (D.dispose(), t.delete(E.name));
  }, kt = () => {
    t.forEach((E, T) => {
      E.dispose();
      const D = s.get(T);
      D !== void 0 && (o.remove(D), D.dispose()), s.delete(T), t.delete(T);
    }), t.clear(), s.clear();
  }, pt = () => {
    switch (X) {
      case "Single":
        ve(J, x.current);
        break;
      case "Side by Side":
      case "Stacked":
        ve(J, x.current), ve(he, O.current);
        break;
      case "Quad":
        ve(J, x.current), ve(he, O.current), ve(Ve, L.current), ve(Ge, A.current);
        break;
    }
  };
  $e(() => {
    const E = new vs({
      canvas: _.current,
      stencil: !1
    });
    E.autoClear = !1, E.shadowMap.enabled = !0, E.setPixelRatio(devicePixelRatio), E.setClearColor(0), i.three.renderer = E, Ie(E);
  }, []), $e(() => {
    o.name = "Debug Scene", o.uuid = "", r.name = "helpers", o.add(r), r.add(h), c.name = "axisHelper", r.add(c), u.name = "interactionHelper", r.add(u), u.visible = !1, P("Top", new le(0, 1e3, 0)), P("Bottom", new le(0, -1e3, 0)), P("Left", new le(-1e3, 0, 0)), P("Right", new le(1e3, 0, 0)), P("Front", new le(0, 0, 1e3)), P("Back", new le(0, 0, -1e3)), P("Orthographic", new le(1e3, 1e3, 1e3)), P("UI", new le());
    const E = new mi(60, 1, 50, 5e3);
    E.name = "Debug", E.position.set(500, 500, 500), E.lookAt(0, 0, 0), n.set("Debug", E), J = n.get(C.getItem(`${e}_tlCam`)), he = n.get(C.getItem(`${e}_trCam`)), Ve = n.get(C.getItem(`${e}_blCam`)), Ge = n.get(C.getItem(`${e}_brCam`)), J === void 0 && (J = n.get("Debug")), he === void 0 && (he = n.get("Orthographic")), Ve === void 0 && (Ve = n.get("Front")), Ge === void 0 && (Ge = n.get("Top"));
  }, []), $e(() => {
    const E = () => {
      a.forEach((M) => {
        r.remove(M), M.dispose();
      }), a.clear();
    }, T = () => {
      Ye.traverse((M) => {
        if (M.type.search("Light") > -1) {
          let N;
          switch (M.type) {
            case "DirectionalLight":
              N = new Ss(M, 100), N.name = `${M.name}Helper`, a.set(M.name, N), r.add(N);
              break;
            case "HemisphereLight":
              N = new xs(M, 250), N.name = `${M.name}Helper`, a.set(M.name, N), r.add(N);
              break;
            case "RectAreaLight":
              N = new Ea(M), N.name = `${M.name}Helper`, a.set(M.name, N), r.add(N);
              break;
            case "PointLight":
              N = new Ts(M, 100), N.name = `${M.name}Helper`, a.set(M.name, N), r.add(N);
              break;
            case "SpotLight":
              N = new Cs(M), N.name = `${M.name}Helper`, a.set(M.name, N), r.add(N);
              break;
          }
        }
      });
    }, D = (M) => {
      r.add(c), E(), si(Ye), o.remove(Ye);
      const N = i.scenes.get(M.value.name);
      if (N !== void 0) {
        const ye = new N();
        i.onSceneSet !== void 0 && i.onSceneSet(ye), Ye = ye, i.three.scene = Ye, o.add(Ye), Ci = !0, T();
      }
    }, I = (M) => {
      const N = M.value, ye = i.three.scene?.getObjectByProperty("uuid", N.uuid);
      if (ye !== void 0 && n.set(N.name, ye), ye instanceof mi) {
        const Le = new ys(ye);
        s.set(ye.name, Le), o.add(Le);
      }
      ot(Date.now());
    }, ue = (M) => {
      const N = s.get(M.value.name);
      N !== void 0 && (o.remove(N), N.dispose()), n.delete(M.value.name), ot(Date.now());
    }, ne = (M) => {
      const N = Ye.getObjectByProperty("uuid", M.value.uuid);
      N && N.add(c);
    };
    return U.addEventListener(F.SET_SCENE, D), U.addEventListener(F.ADD_CAMERA, I), U.addEventListener(F.REMOVE_CAMERA, ue), U.addEventListener(F.SET_OBJECT, ne), () => {
      U.removeEventListener(F.SET_SCENE, D), U.removeEventListener(F.ADD_CAMERA, I), U.removeEventListener(F.REMOVE_CAMERA, ue), U.removeEventListener(F.SET_OBJECT, ne);
    };
  }, []), $e(() => {
    if (H === null)
      return;
    let E = window.innerWidth, T = window.innerHeight, D = Math.floor(E / 2), I = Math.floor(T / 2), ue = -1;
    const ne = () => {
      E = window.innerWidth - 300, T = window.innerHeight, D = Math.floor(E / 2), I = Math.floor(T / 2), i.three.resize(E, T), i.onSceneResize !== void 0 && Ci && i.onSceneResize(Ye, E, T);
      let G = E, oe = T;
      switch (X) {
        case "Side by Side":
          G = D, oe = T;
          break;
        case "Stacked":
          G = E, oe = I;
          break;
        case "Quad":
          G = D, oe = I;
          break;
      }
      const Te = G / oe;
      n.forEach((ce) => {
        ce instanceof Ti ? (ce.left = G / -2, ce.right = G / 2, ce.top = oe / 2, ce.bottom = oe / -2, ce.name === "UI" && (ce.position.x = E / 2, ce.position.y = T / -2, ce.position.z = 100), ce.updateProjectionMatrix()) : ce instanceof mi && (ce.aspect = Te, ce.updateProjectionMatrix(), s.get(ce.name)?.update());
      });
    };
    function M(G) {
      switch (G) {
        case "Depth":
          return p;
        case "Normals":
          return g;
        case "Renderer":
          return null;
        case "UVs":
          return v;
        case "Wireframe":
          return R;
      }
      return null;
    }
    const N = () => {
      const G = M(Pt);
      o.overrideMaterial = G, H.setViewport(0, 0, E, T), H.setScissor(0, 0, E, T), H.render(o, J);
    }, ye = () => {
      const G = M(Pt), oe = M(ei);
      if (o.overrideMaterial = G, X === "Side by Side")
        H.setViewport(0, 0, D, T), H.setScissor(0, 0, D, T), H.render(o, J), o.overrideMaterial = oe, H.setViewport(D, 0, D, T), H.setScissor(D, 0, D, T), H.render(o, he);
      else {
        const Te = T - I;
        H.setViewport(0, Te, E, I), H.setScissor(0, Te, E, I), H.render(o, J), o.overrideMaterial = oe, H.setViewport(0, 0, E, I), H.setScissor(0, 0, E, I), H.render(o, he);
      }
    }, Le = () => {
      const G = M(Pt), oe = M(ei), Te = M(pn), ce = M(fn);
      let pe = 0, B = 0;
      B = T - I, pe = 0, o.overrideMaterial = G, H.setViewport(pe, B, D, I), H.setScissor(pe, B, D, I), H.render(o, J), pe = D, o.overrideMaterial = oe, H.setViewport(pe, B, D, I), H.setScissor(pe, B, D, I), H.render(o, he), B = 0, pe = 0, o.overrideMaterial = Te, H.setViewport(pe, B, D, I), H.setScissor(pe, B, D, I), H.render(o, Ve), pe = D, o.overrideMaterial = ce, H.setViewport(pe, B, D, I), H.setScissor(pe, B, D, I), H.render(o, Ge);
    }, Je = () => {
      switch (t.forEach((G) => {
        G.update();
      }), s.forEach((G) => {
        G.update();
      }), a.forEach((G) => {
        G.update !== void 0 && G.update();
      }), i.onSceneUpdate !== void 0 && Ci && i.onSceneUpdate(Ye), H.clear(), X) {
        case "Single":
          N();
          break;
        case "Side by Side":
        case "Stacked":
          ye();
          break;
        case "Quad":
          Le();
          break;
      }
      ue = requestAnimationFrame(Je);
    };
    return pt(), window.addEventListener("resize", ne), ne(), Je(), () => {
      window.removeEventListener("resize", ne), cancelAnimationFrame(ue), ue = -1;
    };
  }, [X, H]), $e(() => {
    if (H !== null) {
      const E = {
        Vector2: Re,
        Vector3: le,
        Vector4: Es,
        Quaternion: Si,
        Matrix4: kn,
        Spherical: wi,
        Box3: bs,
        Sphere: Os,
        Raycaster: Hi
      };
      it.install({ THREE: E });
      const T = new Hi(), D = new Re();
      let I = J, ue = x, ne, M, N = -1;
      const ye = (B, ee, fe, me) => {
        switch (X) {
          case "Quad":
            B < fe ? ee < me ? (I = J, T.setFromCamera(D, J)) : (I = Ve, T.setFromCamera(D, Ve)) : ee < me ? (I = he, T.setFromCamera(D, he)) : (I = Ge, T.setFromCamera(D, Ge));
            break;
          case "Side by Side":
            B < fe ? (I = J, T.setFromCamera(D, J)) : (I = he, T.setFromCamera(D, he));
            break;
          case "Single":
            I = J, T.setFromCamera(D, J);
            break;
          case "Stacked":
            ee < me ? (I = J, T.setFromCamera(D, J)) : (I = he, T.setFromCamera(D, he));
            break;
        }
        I === J ? ue = x : I === he ? ue = O : I === Ve ? ue = L : I === Ge && (ue = A);
      }, Le = (B) => {
        const ee = new Re();
        H.getSize(ee);
        const fe = Math.min(B.clientX, ee.x), me = Math.min(B.clientY, ee.y);
        D.x = wt(fe, 0, ee.x, -1, 1), D.y = wt(me, 0, ee.y, 1, -1);
        const ke = ee.x / 2, Fe = ee.y / 2, ct = () => {
          fe < ke ? D.x = wt(fe, 0, ke, -1, 1) : D.x = wt(fe, ke, ee.x, -1, 1);
        }, Qe = () => {
          me < Fe ? D.y = wt(me, 0, Fe, 1, -1) : D.y = wt(me, Fe, ee.y, 1, -1);
        };
        switch (X) {
          case "Quad":
            ct(), Qe();
            break;
          case "Side by Side":
            ct();
            break;
          case "Stacked":
            Qe(), Qe();
            break;
        }
        if (ye(fe, me, ke, Fe), Ze === "Orbit")
          return;
        const bt = T.intersectObjects(Ye.children);
        bt.length > 0 && u.position.copy(bt[0].point);
      }, Je = (B) => {
        if (Ze === "Orbit")
          return;
        const ee = new Re();
        if (H.getSize(ee), B.clientX >= ee.x)
          return;
        Le(B);
        const fe = T.intersectObjects(Ye.children);
        fe.length > 0 && (i.three.getObject(fe[0].object.uuid), u.visible = !1, rt("Orbit"), ot(Date.now()));
      }, G = (B, ee = !1) => {
        if (ne === void 0)
          return;
        cancelAnimationFrame(N), N = -1, M && (M.smoothTime = 0.1);
        const fe = 0.15, me = new Ms();
        me.start(), ne.getWorldPosition(B.target0);
        const ke = () => {
          const Fe = me.getDelta();
          M && M.update(Fe), ee && (B.target.lerp(B.target0, fe), B.object.position.lerp(B.position0, fe), B.object.zoom = Mi(B.object.zoom, B.zoom0, fe), B.object.updateProjectionMatrix(), B.dispatchEvent({ type: "change" })), me.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(N), N = -1, oe()) : N = requestAnimationFrame(ke);
        };
        ke();
      }, oe = () => {
        M !== void 0 && (M.disconnect(), M.dispose(), M = void 0);
      }, Te = (B) => {
        if (ne !== void 0 && B.ctrlKey) {
          if (I.name === "UI")
            return;
          const ee = t.get(I.name);
          B.key === "0" ? (oe(), M = new it(I, ue.current), ne instanceof oi || ne instanceof ws ? (ne.geometry.computeBoundingBox(), M.fitToBox(ne.geometry.boundingBox, !0)) : M.fitToSphere(ne, !0), G(ee, !0)) : B.key === "1" ? (oe(), M = new it(I, ue.current), M.rotateTo(0, Math.PI * 0.5, !0), M.moveTo(ne.position.x, ne.position.y, 0, !0), G(ee)) : B.key === "2" ? (oe(), M = new it(I, ue.current), M.rotateTo(0, 0, !0), M.moveTo(ne.position.x, 0, ne.position.z, !0), G(ee)) : B.key === "3" ? (oe(), M = new it(I, ue.current), M.rotateTo(Math.PI / 2, Math.PI / 2, !0), M.moveTo(0, ne.position.y, ne.position.z, !0), G(ee)) : B.key === "4" ? (oe(), M = new it(I, ue.current), M.rotateTo(Math.PI, Math.PI / 2, !0), M.moveTo(ne.position.x, ne.position.y, 0, !0), G(ee)) : B.key === "5" && (oe(), M = new it(I, ue.current), M.rotateTo(an(45), an(45), !0), G(ee));
        }
      }, ce = (B) => {
        ne = Ye.getObjectByProperty("uuid", B.value.uuid);
      }, pe = y.current;
      return pe.addEventListener("mousemove", Le, !1), pe.addEventListener("click", Je, !1), window.addEventListener("keydown", Te, !1), U.addEventListener(F.SET_OBJECT, ce), () => {
        pe.removeEventListener("mousemove", Le), pe.removeEventListener("click", Je), window.removeEventListener("keydown", Te), U.removeEventListener(F.SET_OBJECT, ce);
      };
    }
  }, [X, H, Ze]);
  const De = [];
  return n.forEach((E, T) => {
    De.push(T);
  }), /* @__PURE__ */ m.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ m.jsx("canvas", { ref: _ }),
    H !== null && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsxs("div", { className: `cameras ${X === "Single" || X === "Stacked" ? "single" : ""}`, ref: y, children: [
        X === "Single" && /* @__PURE__ */ m.jsx(m.Fragment, { children: /* @__PURE__ */ m.jsx(
          vt,
          {
            camera: J,
            options: De,
            ref: x,
            onSelectCamera: (E) => {
              t.get(J.name)?.dispose();
              const T = n.get(E);
              T !== void 0 && (We(J), J = T, C.setItem(`${e}_tlCam`, T.name), ve(T, x.current));
            },
            onSelectRenderMode: (E) => {
              Pt = E, C.setItem(`${e}_tlRender`, E);
            }
          }
        ) }),
        (X === "Side by Side" || X === "Stacked") && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsx(
            vt,
            {
              camera: J,
              options: De,
              ref: x,
              onSelectCamera: (E) => {
                t.get(J.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(J), J = T, C.setItem(`${e}_tlCam`, T.name), ve(T, x.current));
              },
              onSelectRenderMode: (E) => {
                Pt = E, C.setItem(`${e}_tlRender`, E);
              }
            }
          ),
          /* @__PURE__ */ m.jsx(
            vt,
            {
              camera: he,
              options: De,
              ref: O,
              onSelectCamera: (E) => {
                t.get(he.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(he), he = T, C.setItem(`${e}_trCam`, T.name), ve(T, O.current));
              },
              onSelectRenderMode: (E) => {
                ei = E, C.setItem(`${e}_trRender`, E);
              }
            }
          )
        ] }),
        X === "Quad" && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsx(
            vt,
            {
              camera: J,
              options: De,
              ref: x,
              onSelectCamera: (E) => {
                t.get(J.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(J), J = T, C.setItem(`${e}_tlCam`, T.name), ve(T, x.current));
              },
              onSelectRenderMode: (E) => {
                Pt = E, C.setItem(`${e}_tlRender`, E);
              }
            }
          ),
          /* @__PURE__ */ m.jsx(
            vt,
            {
              camera: he,
              options: De,
              ref: O,
              onSelectCamera: (E) => {
                t.get(he.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(he), he = T, C.setItem(`${e}_trCam`, T.name), ve(T, O.current));
              },
              onSelectRenderMode: (E) => {
                ei = E, C.setItem(`${e}_trRender`, E);
              }
            }
          ),
          /* @__PURE__ */ m.jsx(
            vt,
            {
              camera: Ve,
              options: De,
              ref: L,
              onSelectCamera: (E) => {
                t.get(Ve.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(Ve), Ve = T, C.setItem(`${e}_blCam`, T.name), ve(T, L.current));
              },
              onSelectRenderMode: (E) => {
                pn = E, C.setItem(`${e}_blRender`, E);
              }
            }
          ),
          /* @__PURE__ */ m.jsx(
            vt,
            {
              camera: Ge,
              options: De,
              ref: A,
              onSelectCamera: (E) => {
                t.get(Ge.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(Ge), Ge = T, C.setItem(`${e}_brCam`, T.name), ve(T, A.current));
              },
              onSelectRenderMode: (E) => {
                fn = E, C.setItem(`${e}_brRender`, E);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ m.jsx(
          ri,
          {
            title: "View",
            index: k.indexOf(X),
            options: k,
            onSelect: (E) => {
              E !== X && (kt(), qe(E));
            },
            open: be,
            onToggle: (E) => {
              xe(E), Se && Ue(!1), nt && st(!1);
            }
          }
        ),
        /* @__PURE__ */ m.jsx(
          ri,
          {
            title: "Interact",
            index: Ze === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (E) => {
              u.visible = E === "Selection Mode", rt(u.visible ? "Selection" : "Orbit");
            },
            open: nt,
            onToggle: (E) => {
              be && xe(!1), Se && Ue(!1), st(E);
            }
          }
        )
      ] }, mt)
    ] })
  ] });
}
function Wa(i) {
  return /* @__PURE__ */ m.jsxs("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ m.jsx("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ m.jsx("div", { className: "footer", children: i.footer })
  ] });
}
export {
  ai as Accordion,
  ja as Application,
  li as BaseRemote,
  zn as ChildObject,
  Ki as ContainerObject,
  Gs as Draggable,
  Vs as DraggableItem,
  $s as Dropdown,
  Zs as DropdownItem,
  Wa as Editor,
  ti as ExportTexture,
  ya as Inspector,
  Za as MultiView,
  jn as NavButton,
  za as RemoteComponents,
  Va as RemoteController,
  Ii as RemoteTheatre,
  Ha as RemoteThree,
  Ya as RemoteTweakpane,
  $a as SceneInspector,
  Ga as SidePanel,
  F as ToolEvents,
  ni as capitalize,
  yt as clamp,
  Vi as colorToHex,
  U as debugDispatcher,
  Ua as defaultTheatreCallback,
  si as dispose,
  ks as disposeMaterial,
  Na as disposeTexture,
  Fa as distance,
  Di as hierarchyUUID,
  Ls as isColor,
  Mi as mix,
  ki as noop,
  Yi as normalize,
  Ps as randomID,
  $i as resetThreeObjects,
  Gi as round,
  Ba as theatreEditorApp,
  Ri as totalThreeObjects
};
