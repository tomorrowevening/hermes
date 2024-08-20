import { OrthographicCamera as Ci, Scene as fn, MeshBasicMaterial as Pi, BufferGeometry as Ti, Float32BufferAttribute as Vt, Mesh as oi, LinearSRGBColorSpace as ji, EventDispatcher as pn, Texture as Vn, RepeatWrapping as zi, WebGLRenderTarget as $n, Color as Ii, FrontSide as Zn, BackSide as _n, DoubleSide as gn, NoBlending as Gn, NormalBlending as Wn, AdditiveBlending as Kn, SubtractiveBlending as Xn, MultiplyBlending as qn, CustomBlending as Jn, AddEquation as Qn, SubtractEquation as es, ReverseSubtractEquation as ts, MinEquation as is, MaxEquation as ns, ZeroFactor as vn, OneFactor as yn, SrcColorFactor as En, OneMinusSrcColorFactor as bn, SrcAlphaFactor as On, OneMinusSrcAlphaFactor as Cn, DstAlphaFactor as Tn, OneMinusDstAlphaFactor as xn, DstColorFactor as Sn, OneMinusDstColorFactor as wn, SrcAlphaSaturateFactor as ss, ConstantColorFactor as Mn, OneMinusConstantColorFactor as Rn, ConstantAlphaFactor as Dn, OneMinusConstantAlphaFactor as An, Matrix4 as Pn, Vector3 as ce, Euler as as, Line as rs, LineBasicMaterial as os, Ray as cs, Plane as ls, MathUtils as ds, MOUSE as Tt, TOUCH as xt, Quaternion as xi, Spherical as Si, Vector2 as Re, ShaderMaterial as In, GLSL3 as hs, PlaneGeometry as us, Group as ms, AxesHelper as Bi, MeshDepthMaterial as fs, MeshNormalMaterial as ps, WebGLRenderer as _s, PerspectiveCamera as ui, Raycaster as Hi, CameraHelper as gs, Vector4 as vs, Box3 as ys, Sphere as Es, SpotLightHelper as bs, PointLightHelper as Os, HemisphereLightHelper as Cs, DirectionalLightHelper as Ts, SkinnedMesh as xs } from "three";
import { Pane as Ss } from "tweakpane";
import * as ws from "@tweakpane/plugin-essentials";
import Ln, { useState as J, useRef as ae, useEffect as qe, useMemo as Ce, forwardRef as Ms } from "react";
import { Reorder as kn } from "framer-motion";
const Li = () => {
}, Pa = () => {
};
function ni(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function vt(i, t, n) {
  return Math.min(t, Math.max(i, n));
}
function Yi(i, t, n) {
  return (n - i) / (t - i);
}
function wi(i, t, n) {
  return i * (1 - n) + t * n;
}
function Ia(i, t) {
  const n = i - t;
  return Math.sqrt(n * n);
}
function Rs() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ds(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function As(i) {
  const t = Math.round(i.r * 255), n = Math.round(i.g * 255), e = Math.round(i.b * 255), s = (h) => {
    const c = h.toString(16);
    return c.length === 1 ? "0" + c : c;
  }, a = s(t), o = s(n), r = s(e);
  return "#" + a + o + r;
}
function Vi(i, t = 1) {
  return Number(i.toFixed(t));
}
let Mi = 0;
const $i = () => {
  Mi = 0;
}, Ri = (i) => {
  if (!i)
    return;
  let t = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (t.length === 0 && (t = `obj_${Mi}`, Mi++), i.parent !== null && i.parent.uuid.length > 0 && (t = `${i.parent.uuid}.${t}`), i.uuid = t, i.isMesh !== void 0) {
    const n = i;
    if (Array.isArray(n.material))
      n.material.forEach((e, s) => {
        e.uuid = `${t}.material.${s}`;
      });
    else {
      const e = n.material;
      e.uuid = `${t}.material`;
    }
  }
  i.children.forEach((n) => Ri(n));
}, La = (i) => {
  i?.dispose();
}, Ps = (i) => {
  i && (Array.isArray(i) ? i.forEach((t) => t.dispose()) : i.dispose());
}, si = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const t = i.children[0];
      t.type === "Audio" ? (t.pause(), t.parent && t.parent.remove(t)) : si(t);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const t = i;
      t.geometry?.dispose(), Ps(t.material);
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
  static renderToBlob(t) {
    this.init();
    const n = t.repeat.clone(), e = t.offset.clone();
    if (t.repeat.set(1, 1), t.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const s = t.image;
      if (s != null && s.width > 0) {
        this.canvas.title = t.sourceFile;
        const a = this.canvas.width / s.width, o = this.renderToCanvas(t);
        this.context.drawImage(o, 0, 0, s.width * a, s.height * a);
      }
    }
    return t.repeat.copy(n), t.offset.copy(e), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(t) {
    if (this.material === null) {
      this.camera = new Ci(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new fn(), this.material = new Pi();
      const n = new Ti();
      n.setAttribute("position", new Vt([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), n.setAttribute("normal", new Vt([0, 0, 1, 0, 0, 1], 3)), n.setAttribute("uv", new Vt([0, 0, 2, 0, 0, 2], 2));
      const e = new oi(n, this.material);
      this.scene.add(e);
    }
    if (t.isRenderTargetTexture)
      this.material.map = t, this.renderer.render(this.scene, this.camera);
    else {
      const n = this.renderer.outputColorSpace, e = t.colorSpace;
      this.renderer.outputColorSpace = ji, t.colorSpace = ji, this.material.map = t, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = n, t.colorSpace = e;
    }
    return this.renderer.domElement;
  }
}
class ka {
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
  constructor(t, n, e = !0) {
    this._appID = t, this._debugEnabled = n, n && (this._useBC = e, e ? (this._broadcastChannel = new BroadcastChannel(t), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(t), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(t, n) {
    this.components.set(t, n);
  }
  dispose() {
    this._broadcastChannel !== void 0 && this._broadcastChannel.removeEventListener("message", this.messageHandler), this._webSocket !== void 0 && (this._webSocket.removeEventListener("open", this.openHandler), this._webSocket.removeEventListener("close", this.closeHandler), this._webSocket.removeEventListener("message", this.messageHandler)), this.components.forEach((t) => {
      t.dispose();
    }), this.components.clear();
  }
  // Remote
  send(t) {
    this._mode !== t.target && (this._useBC ? this._broadcastChannel?.postMessage(t) : this._connected && this._webSocket?.send(JSON.stringify(t)));
  }
  messageHandler = (t) => {
    this.listen !== void 0 && (this._useBC ? this.listen(t.data) : this.listen(JSON.parse(t.data)));
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
  set editor(t) {
    t && (this._mode = "editor");
  }
}
const B = new pn(), H = {
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
class ci {
  app;
  constructor(t) {
    this.app = t;
  }
  dispose() {
  }
  handleApp(t, n, e) {
  }
  handleEditor(t, n, e) {
  }
}
class Ua extends ci {
  selectDropdown(t, n) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: t,
        value: n
      }
    });
  }
  updateDropdown(t, n) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: t,
        value: n
      }
    });
  }
  handleApp(t, n, e) {
    switch (e.event) {
      case "selectComponent":
        B.dispatchEvent({ type: H.SELECT_DROPDOWN, value: e.data });
        break;
      case "draggableListUpdate":
        B.dispatchEvent({ type: H.DRAG_UPDATE, value: e.data });
        break;
    }
  }
}
class ki extends ci {
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
  getSheetInstance(t, n) {
    return n !== void 0 ? `${t}-${n}` : t;
  }
  sheet(t, n) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const e = this.getSheetInstance(t, n);
    let s = this.sheets.get(e);
    return s !== void 0 || (s = this.project?.sheet(t, n), this.sheets.set(e, s)), s;
  }
  playSheet(t, n, e) {
    this.sheet(t, e)?.sequence.play(n), this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: t,
        instance: e,
        value: n
      }
    });
  }
  pauseSheet(t, n) {
    this.sheet(t)?.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: t,
        instance: n
      }
    });
  }
  clearSheetObjects(t) {
    this.sheetObjects.forEach((n, e) => {
      e.search(`${t}_`) > -1 && this.unsubscribe(n);
    });
  }
  sheetObject(t, n, e, s, a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const o = this.sheet(t, a);
    if (o === void 0)
      return;
    const h = `${this.getSheetInstance(t, a)}_${n}`;
    let c = this.sheetObjects.get(h);
    c !== void 0 ? c = o.object(n, { ...e, ...c.value }, { reconfigure: !0 }) : c = o.object(n, e), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, s !== void 0 ? s : Li);
    const m = c.onValuesChange((f) => {
      if (this.app.editor) {
        for (const v in f) {
          const M = f[v];
          typeof M == "object" && Ds(M) && (f[v] = {
            r: M.r,
            g: M.g,
            b: M.b,
            a: M.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: t,
            sheetObject: h,
            values: f
          }
        });
      }
      const g = this.sheetObjectCBs.get(h);
      g !== void 0 && g(f);
    });
    return this.sheetObjectUnsubscribe.set(h, m), c;
  }
  unsubscribe(t) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const n = t.address.sheetId, e = t.address.objectKey;
    this.sheets.get(n)?.detachObject(e);
    const a = `${n}_${e}`, o = this.sheetObjectUnsubscribe.get(a);
    o !== void 0 && (this.sheetObjects.delete(a), this.sheetObjectCBs.delete(a), this.sheetObjectUnsubscribe.delete(a), o());
  }
  handleApp(t, n, e) {
    const s = n;
    let a;
    switch (e.event) {
      case "setSheet":
        a = s.sheets.get(e.data.sheet), a !== void 0 && (s.activeSheet = a, this.studio?.setSelection([a]));
        break;
      case "setSheetObject":
        a = s.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), a !== void 0 && this.studio?.setSelection([a]);
        break;
      case "updateSheetObject":
        a = s.sheets.get(e.data.sheet), a !== void 0 && a.sequence.pause(), a = s.sheetObjectCBs.get(e.data.sheetObject), a !== void 0 && a(e.data.values);
        break;
      case "updateTimeline":
        a = s.sheets.get(e.data.sheet), s.activeSheet !== void 0 && (s.activeSheet.sequence.position = e.data.position);
        break;
    }
  }
  handleEditor(t, n, e) {
    if (t.editor) {
      const s = n;
      switch (e.event) {
        case "playSheet":
          s.sheet(e.data.sheet, e.data.instance)?.sequence.play(e.data.value);
          break;
        case "pauseSheet":
          s.sheet(e.data.sheet, e.data.instance)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(t, n) {
    if (t.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((o) => {
        o.length < 1 || o.forEach((r) => {
          let h = r.address.sheetId, c = "setSheet", m = {};
          switch (r.type) {
            case "Theatre_Sheet_PublicAPI":
              c = "setSheet", m = {
                sheet: r.address.sheetId
              }, n.activeSheet = n.sheets.get(r.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              c = "setSheetObject", h += `_${r.address.objectKey}`, m = {
                id: h,
                sheet: r.address.sheetId,
                key: r.address.objectKey
              }, n.activeSheet = n.sheets.get(r.address.sheetId);
              break;
          }
          t.send({ event: c, target: "app", data: m });
        });
      });
      let e = -1;
      const s = () => {
        if (ki.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && e !== n.activeSheet.sequence.position) {
          e = n.activeSheet.sequence.position;
          const o = n.activeSheet;
          t.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: e,
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
function Fa(i, t, n) {
  if (i.editor) {
    n.ui.restore(), n.onSelectionChange((o) => {
      o.length < 1 || o.forEach((r) => {
        let h = r.address.sheetId, c = "setSheet", m = {};
        switch (r.type) {
          case "Theatre_Sheet_PublicAPI":
            c = "setSheet", m = {
              sheet: r.address.sheetId
            }, t.activeSheet = t.sheets.get(r.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            c = "setSheetObject", h += `_${r.address.objectKey}`, m = {
              id: h,
              sheet: r.address.sheetId,
              key: r.address.objectKey
            }, t.activeSheet = t.sheets.get(r.address.sheetId);
            break;
        }
        i.send({ event: c, target: "app", data: m });
      });
    });
    let e = -1;
    const s = () => {
      if (ki.rafDriver?.tick(performance.now()), t.activeSheet !== void 0 && e !== t.activeSheet.sequence.position) {
        e = t.activeSheet.sequence.position;
        const o = t.activeSheet;
        i.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: e,
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
  const t = i.type;
  return t.search("Helper") > -1 ? "icon_utils" : t.search("Camera") > -1 ? "camera" : t.search("Light") > -1 ? "light" : "obj3D";
}
function It(i) {
  const t = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    children: []
  };
  return i.children.forEach((n) => {
    t.children.push(It(n));
  }), t;
}
function Ls(i) {
  const t = {};
  for (const n in i) {
    const e = i[n].value;
    t[n] = { value: e }, e === null ? t[n].value = {
      src: "",
      offset: [0, 0],
      repeat: [1, 1]
    } : e !== void 0 && e.isTexture && (t[n].value = {
      src: e.image.src,
      offset: [e.offset.x, e.offset.y],
      repeat: [e.repeat.x, e.repeat.y]
    });
  }
  return t;
}
function ks(i) {
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
  const t = {};
  for (const n in i) {
    if (n.substring(0, 1) === "_" || n.substring(0, 2) === "is" || ks(n))
      continue;
    const e = typeof i[n], s = i[n];
    switch (e) {
      case "boolean":
      case "number":
      case "string":
        t[n] = s;
        break;
      case "object":
        s !== null ? (t[n] = s, s.isTexture ? t[n] = {
          src: ti.renderToBlob(s),
          offset: [s.offset.x, s.offset.y],
          repeat: [s.repeat.x, s.repeat.y]
        } : n === "uniforms" && (t[n] = Ls(t[n]))) : t[n] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return t;
}
function mi(i) {
  i.updateMatrix();
  const t = {
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
  i.animations.forEach((e) => {
    t.animations.push({
      name: e.name,
      duration: e.duration,
      blendMode: e.blendMode
    });
  });
  const n = i.type.toLowerCase();
  if (n.search("mesh") > -1) {
    const e = i;
    if (Array.isArray(e.material)) {
      const s = [];
      e.material.forEach((a) => {
        s.push(St(a));
      }), t.material = s;
    } else
      t.material = St(e.material);
  } else if (n.search("points") > -1) {
    const e = i;
    if (Array.isArray(e.material)) {
      const s = [];
      e.material.forEach((a) => {
        s.push(St(a));
      }), t.material = s;
    } else
      t.material = St(e.material);
  } else if (n.search("line") > -1) {
    const e = i;
    if (Array.isArray(e.material)) {
      const s = [];
      e.material.forEach((a) => {
        s.push(St(a));
      }), t.material = s;
    } else
      t.material = St(e.material);
  } else
    n.search("camera") > -1 ? i.type === "PerspectiveCamera" ? t.perspectiveCameraInfo = {
      fov: i.fov,
      zoom: i.zoom,
      near: i.near,
      far: i.far,
      focus: i.focus,
      aspect: i.aspect,
      filmGauge: i.filmGauge,
      filmOffset: i.filmOffset
    } : i.type === "OrthographicCamera" && (t.orthographicCameraInfo = {
      zoom: i.zoom,
      near: i.near,
      far: i.far,
      left: i.left,
      right: i.right,
      top: i.top,
      bottom: i.bottom
    }) : n.search("light") > -1 && (t.lightInfo = {
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
  return t;
}
function Us(i, t) {
  const n = t.split(".");
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
function Fs(i, t) {
  for (const n in t)
    i[n] = t[n];
}
function pe(i, t, n) {
  if (i === void 0)
    return;
  const e = t.split("."), s = e.length;
  if (typeof n != "object")
    switch (s) {
      case 1:
        i[e[0]] = n;
        break;
      case 2:
        i[e[0]][e[1]] = n;
        break;
      case 3:
        i[e[0]][e[1]][e[2]] = n;
        break;
      case 4:
        i[e[0]][e[1]][e[2]][e[3]] = n;
        break;
      case 5:
        i[e[0]][e[1]][e[2]][e[3]][e[4]] = n;
        break;
    }
  else {
    let o;
    switch (s) {
      case 1:
        o = i[e[0]];
        break;
      case 2:
        o = i[e[0]][e[1]];
        break;
      case 3:
        o = i[e[0]][e[1]][e[2]];
        break;
      case 4:
        o = i[e[0]][e[1]][e[2]][e[3]];
        break;
      case 5:
        o = i[e[0]][e[1]][e[2]][e[3]][e[4]];
        break;
    }
    o != null && Fs(o, n);
  }
}
function Un(i) {
  return new Promise((t, n) => {
    const e = new Image();
    e.onload = () => {
      const s = new Vn(e);
      s.wrapS = zi, s.wrapT = zi, s.needsUpdate = !0, t(s);
    }, e.onerror = n, e.src = i;
  });
}
class Na extends ci {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((t) => {
      si(t);
    }), this.scenes.clear(), this.scene && si(this.scene), this.renderTargets.forEach((t) => {
      t.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(t) {
    this.app.debugEnabled && (this.renderer !== void 0 && (ti.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: t
    }));
  }
  setObject(t) {
    this.renderer !== void 0 && (ti.renderer = this.renderer);
    const n = mi(t);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: n
    });
  }
  requestMethod(t, n, e, s) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: t,
        key: n,
        value: e,
        subitem: s
      }
    });
  }
  updateObject(t, n, e) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: t,
        key: n,
        value: e
      }
    });
  }
  createTexture(t, n, e) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: t,
        key: n,
        value: e
      }
    });
  }
  addScene(t) {
    if (t === void 0 || (this.scenes.set(t.name, t), !this.app.debugEnabled))
      return;
    $i(), Ri(t);
    const n = It(t);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: n
    });
  }
  refreshScene(t) {
    if (!this.app.debugEnabled)
      return;
    const n = this.scenes.get(t);
    if (n !== void 0) {
      const e = It(n);
      this.app.send({
        event: "refreshScene",
        target: "app",
        data: e
      });
    }
  }
  removeScene(t) {
    if (t === void 0 || (this.scenes.delete(t.name), !this.app.debugEnabled))
      return;
    const n = It(t);
    this.app.send({
      event: "removeScene",
      target: "editor",
      data: n
    });
  }
  removeAllScenes() {
    this.scenes.forEach((t) => this.removeScene(t));
  }
  getScene(t) {
    let n = null;
    return this.scenes.forEach((e, s) => {
      t.search(s) > -1 && (n = e);
    }), n;
  }
  setScene(t) {
    if (t === void 0 || (this.scene = t, !this.app.debugEnabled))
      return;
    this.renderer !== void 0 && (ti.renderer = this.renderer), $i(), Ri(t);
    const n = It(t);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: n
    });
  }
  addCamera(t) {
    if (!this.app.debugEnabled)
      return;
    const n = mi(t);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: n
    });
  }
  removeCamera(t) {
    if (!this.app.debugEnabled)
      return;
    const n = mi(t);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: n
    });
  }
  handleApp(t, n, e) {
    switch (e.event) {
      case "getObject":
        B.dispatchEvent({ type: H.GET_OBJECT, value: e.data });
        break;
      case "updateObject":
        B.dispatchEvent({ type: H.UPDATE_OBJECT, value: e.data });
        break;
      case "createTexture":
        B.dispatchEvent({ type: H.CREATE_TEXTURE, value: e.data });
        break;
      case "requestMethod":
        B.dispatchEvent({ type: H.REQUEST_METHOD, value: e.data });
        break;
      case "refreshScene":
        t.send({
          event: "refreshScene",
          target: "editor",
          data: It(n.scenes.get(e.data.name))
        });
        break;
    }
  }
  handleEditor(t, n, e) {
    switch (e.event) {
      case "setObject":
        B.dispatchEvent({ type: H.SET_OBJECT, value: e.data });
        break;
      case "addScene":
        B.dispatchEvent({ type: H.ADD_SCENE, value: e.data });
        break;
      case "refreshScene":
        B.dispatchEvent({ type: H.REFRESH_SCENE, value: e.data });
        break;
      case "removeScene":
        B.dispatchEvent({ type: H.REMOVE_SCENE, value: e.data });
        break;
      case "setScene":
        B.dispatchEvent({ type: H.SET_SCENE, value: e.data });
        break;
      case "addCamera":
        B.dispatchEvent({ type: H.ADD_CAMERA, value: e.data });
        break;
      case "removeCamera":
        B.dispatchEvent({ type: H.REMOVE_CAMERA, value: e.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(t, n) {
    const e = new $n(32, 32, n);
    e.texture.name = t, this.renderTargets.set(t, e);
  }
  resize(t, n) {
    const e = this.dpr;
    this.rendererWidth = t, this.rendererHeight = n, this.renderTargets.forEach((s) => {
      s.setSize(t * e, n * e);
    }), this.renderer?.setSize(t, n);
  }
  set dpr(t) {
    this.renderer?.setPixelRatio(vt(1, 2, t));
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
class ja extends ci {
  bindCBs;
  buttonCBs;
  pane = void 0;
  appCallbacks = 0;
  editorCallbacks = 0;
  inspectorFolder = void 0;
  constructor(t) {
    super(t), this.bindCBs = /* @__PURE__ */ new Map(), this.buttonCBs = /* @__PURE__ */ new Map(), t.editor && this.createGUI();
  }
  createGUI() {
    this.pane = new Ss({ title: "GUI" }), this.pane.registerPlugin(ws);
  }
  dispose() {
    this.bindCBs.clear(), this.buttonCBs.clear(), this.appCallbacks = 0, this.editorCallbacks = 0, this.app.editor && (this.pane?.dispose(), this.pane = void 0);
  }
  addFolder(t, n = void 0, e = void 0) {
    if (this.app.editor)
      return this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addFolder({
        title: t,
        ...n
      });
    this.app.send({
      event: "addFolder",
      target: "app",
      data: {
        name: t,
        params: n,
        parent: e
      }
    });
  }
  get bindID() {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }
  // Binding
  bind(t, n, e, s = void 0) {
    const a = this.bindID, o = e.onChange !== void 0 ? e.onChange : Li;
    this.bindCBs.set(a, o), this.app.editor ? (this.pane === void 0 && this.createGUI(), (s !== void 0 ? s : this.pane).addBinding(t, n, e).on("change", (h) => {
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
        params: e,
        parent: s
      }
    }), this.appCallbacks++);
  }
  triggerBind(t, n) {
    const e = this.bindCBs.get(t);
    e !== void 0 ? e(n) : console.warn(`No callback for: ${t}`, n);
  }
  // Buttons
  button(t, n, e = void 0) {
    const s = this.bindID;
    this.buttonCBs.set(s, n), this.app.editor ? (this.pane === void 0 && this.createGUI(), (e !== void 0 ? e : this.pane).addButton({ title: t }).on("click", () => {
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
        name: t,
        callback: n,
        parent: e
      }
    }), this.appCallbacks++);
  }
  triggerButton(t) {
    const n = this.buttonCBs.get(t);
    n !== void 0 && n();
  }
  // Inspector
  createInspector() {
    this.inspectorFolder = this.addFolder("Inspector", this.pane);
  }
  clearInspector() {
    const t = this.inspectorFolder.children.length - 1;
    for (let n = t; n > -1; --n)
      this.inspectorFolder.remove(this.inspectorFolder.children[n]);
  }
  handleApp(t, n, e) {
    const s = n;
    switch (e.event) {
      case "addFolder":
        s.addFolder(e.data.name, e.data.params, e.data.parent);
        break;
      case "bindObject":
        s.bind(e.data.name, e.data.params, e.data.parent);
        break;
      case "updateBind":
        s.triggerBind(e.data.id, e.data.value);
        break;
      case "addButton":
        s.button(e.data.name, e.data.callback, e.data.parent);
        break;
      case "clickButton":
        s.triggerButton(e.data.id);
        break;
    }
  }
}
var Di = { exports: {} }, kt = {};
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
function Ns() {
  if (Zi)
    return kt;
  Zi = 1;
  var i = Ln, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), e = Object.prototype.hasOwnProperty, s = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(r, h, c) {
    var m, f = {}, g = null, v = null;
    c !== void 0 && (g = "" + c), h.key !== void 0 && (g = "" + h.key), h.ref !== void 0 && (v = h.ref);
    for (m in h)
      e.call(h, m) && !a.hasOwnProperty(m) && (f[m] = h[m]);
    if (r && r.defaultProps)
      for (m in h = r.defaultProps, h)
        f[m] === void 0 && (f[m] = h[m]);
    return { $$typeof: t, type: r, key: g, ref: v, props: f, _owner: s.current };
  }
  return kt.Fragment = n, kt.jsx = o, kt.jsxs = o, kt;
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
var Gi;
function js() {
  return Gi || (Gi = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Ln, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), r = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), M = Symbol.iterator, P = "@@iterator";
    function L(l) {
      if (l === null || typeof l != "object")
        return null;
      var b = M && l[M] || l[P];
      return typeof b == "function" ? b : null;
    }
    var _ = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(l) {
      {
        for (var b = arguments.length, S = new Array(b > 1 ? b - 1 : 0), j = 1; j < b; j++)
          S[j - 1] = arguments[j];
        x("error", l, S);
      }
    }
    function x(l, b, S) {
      {
        var j = _.ReactDebugCurrentFrame, Q = j.getStackAddendum();
        Q !== "" && (b += "%s", S = S.concat([Q]));
        var ne = S.map(function(G) {
          return String(G);
        });
        ne.unshift("Warning: " + b), Function.prototype.apply.call(console[l], console, ne);
      }
    }
    var O = !1, I = !1, A = !1, C = !1, te = !1, K;
    K = Symbol.for("react.module.reference");
    function Je(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === e || l === a || te || l === s || l === c || l === m || C || l === v || O || I || A || typeof l == "object" && l !== null && (l.$$typeof === g || l.$$typeof === f || l.$$typeof === o || l.$$typeof === r || l.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === K || l.getModuleId !== void 0));
    }
    function z(l, b, S) {
      var j = l.displayName;
      if (j)
        return j;
      var Q = b.displayName || b.name || "";
      return Q !== "" ? S + "(" + Q + ")" : S;
    }
    function ke(l) {
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
        case e:
          return "Fragment";
        case n:
          return "Portal";
        case a:
          return "Profiler";
        case s:
          return "StrictMode";
        case c:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case r:
            var b = l;
            return ke(b) + ".Consumer";
          case o:
            var S = l;
            return ke(S._context) + ".Provider";
          case h:
            return z(l, l.render, "ForwardRef");
          case f:
            var j = l.displayName || null;
            return j !== null ? j : be(l.type) || "Memo";
          case g: {
            var Q = l, ne = Q._payload, G = Q._init;
            try {
              return be(G(ne));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var xe = Object.assign, Se = 0, Ue, Ze, ot, it, nt, ut, ct;
    function _e() {
    }
    _e.__reactDisabledLog = !0;
    function Ge() {
      {
        if (Se === 0) {
          Ue = console.log, Ze = console.info, ot = console.warn, it = console.error, nt = console.group, ut = console.groupCollapsed, ct = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: _e,
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
    function Lt() {
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
              value: ot
            }),
            error: xe({}, l, {
              value: it
            }),
            group: xe({}, l, {
              value: nt
            }),
            groupCollapsed: xe({}, l, {
              value: ut
            }),
            groupEnd: xe({}, l, {
              value: ct
            })
          });
        }
        Se < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mt = _.ReactCurrentDispatcher, De;
    function E(l, b, S) {
      {
        if (De === void 0)
          try {
            throw Error();
          } catch (Q) {
            var j = Q.stack.trim().match(/\n( *(at )?)/);
            De = j && j[1] || "";
          }
        return `
` + De + l;
      }
    }
    var T = !1, D;
    {
      var k = typeof WeakMap == "function" ? WeakMap : Map;
      D = new k();
    }
    function he(l, b) {
      if (!l || T)
        return "";
      {
        var S = D.get(l);
        if (S !== void 0)
          return S;
      }
      var j;
      T = !0;
      var Q = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ne;
      ne = mt.current, mt.current = null, Ge();
      try {
        if (b) {
          var G = function() {
            throw Error();
          };
          if (Object.defineProperty(G.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(G, []);
            } catch (at) {
              j = at;
            }
            Reflect.construct(l, [], G);
          } else {
            try {
              G.call();
            } catch (at) {
              j = at;
            }
            l.call(G.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (at) {
            j = at;
          }
          l();
        }
      } catch (at) {
        if (at && j && typeof at.stack == "string") {
          for (var $ = at.stack.split(`
`), Me = j.stack.split(`
`), fe = $.length - 1, Ee = Me.length - 1; fe >= 1 && Ee >= 0 && $[fe] !== Me[Ee]; )
            Ee--;
          for (; fe >= 1 && Ee >= 0; fe--, Ee--)
            if ($[fe] !== Me[Ee]) {
              if (fe !== 1 || Ee !== 1)
                do
                  if (fe--, Ee--, Ee < 0 || $[fe] !== Me[Ee]) {
                    var Be = `
` + $[fe].replace(" at new ", " at ");
                    return l.displayName && Be.includes("<anonymous>") && (Be = Be.replace("<anonymous>", l.displayName)), typeof l == "function" && D.set(l, Be), Be;
                  }
                while (fe >= 1 && Ee >= 0);
              break;
            }
        }
      } finally {
        T = !1, mt.current = ne, Lt(), Error.prepareStackTrace = Q;
      }
      var Ct = l ? l.displayName || l.name : "", Ni = Ct ? E(Ct) : "";
      return typeof l == "function" && D.set(l, Ni), Ni;
    }
    function ge(l, b, S) {
      return he(l, !1);
    }
    function R(l) {
      var b = l.prototype;
      return !!(b && b.isReactComponent);
    }
    function U(l, b, S) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return he(l, R(l));
      if (typeof l == "string")
        return E(l);
      switch (l) {
        case c:
          return E("Suspense");
        case m:
          return E("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case h:
            return ge(l.render);
          case f:
            return U(l.type, b, S);
          case g: {
            var j = l, Q = j._payload, ne = j._init;
            try {
              return U(ne(Q), b, S);
            } catch {
            }
          }
        }
      return "";
    }
    var ve = Object.prototype.hasOwnProperty, Le = {}, Qe = _.ReactDebugCurrentFrame;
    function Z(l) {
      if (l) {
        var b = l._owner, S = U(l.type, l._source, b ? b.type : null);
        Qe.setExtraStackFrame(S);
      } else
        Qe.setExtraStackFrame(null);
    }
    function oe(l, b, S, j, Q) {
      {
        var ne = Function.call.bind(ve);
        for (var G in l)
          if (ne(l, G)) {
            var $ = void 0;
            try {
              if (typeof l[G] != "function") {
                var Me = Error((j || "React class") + ": " + S + " type `" + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[G] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Me.name = "Invariant Violation", Me;
              }
              $ = l[G](b, G, j, S, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (fe) {
              $ = fe;
            }
            $ && !($ instanceof Error) && (Z(Q), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", j || "React class", S, G, typeof $), Z(null)), $ instanceof Error && !($.message in Le) && (Le[$.message] = !0, Z(Q), y("Failed %s type: %s", S, $.message), Z(null));
          }
      }
    }
    var Te = Array.isArray;
    function re(l) {
      return Te(l);
    }
    function ue(l) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, S = b && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return S;
      }
    }
    function N(l) {
      try {
        return ie(l), !1;
      } catch {
        return !0;
      }
    }
    function ie(l) {
      return "" + l;
    }
    function ye(l) {
      if (N(l))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ue(l)), ie(l);
    }
    var me = _.ReactCurrentOwner, Ae = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fe, st, We;
    We = {};
    function bt(l) {
      if (ve.call(l, "ref")) {
        var b = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function di(l) {
      if (ve.call(l, "key")) {
        var b = Object.getOwnPropertyDescriptor(l, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function hi(l, b) {
      if (typeof l.ref == "string" && me.current && b && me.current.stateNode !== b) {
        var S = be(me.current.type);
        We[S] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', be(me.current.type), l.ref), We[S] = !0);
      }
    }
    function $t(l, b) {
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
          st || (st = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        S.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: S,
          configurable: !0
        });
      }
    }
    var Ui = function(l, b, S, j, Q, ne, G) {
      var $ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: l,
        key: b,
        ref: S,
        props: G,
        // Record the component responsible for creating this element.
        _owner: ne
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
        value: j
      }), Object.defineProperty($, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Q
      }), Object.freeze && (Object.freeze($.props), Object.freeze($)), $;
    };
    function d(l, b, S, j, Q) {
      {
        var ne, G = {}, $ = null, Me = null;
        S !== void 0 && (ye(S), $ = "" + S), di(b) && (ye(b.key), $ = "" + b.key), bt(b) && (Me = b.ref, hi(b, Q));
        for (ne in b)
          ve.call(b, ne) && !Ae.hasOwnProperty(ne) && (G[ne] = b[ne]);
        if (l && l.defaultProps) {
          var fe = l.defaultProps;
          for (ne in fe)
            G[ne] === void 0 && (G[ne] = fe[ne]);
        }
        if ($ || Me) {
          var Ee = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          $ && $t(G, Ee), Me && lt(G, Ee);
        }
        return Ui(l, $, Me, Q, j, me.current, G);
      }
    }
    var w = _.ReactCurrentOwner, V = _.ReactDebugCurrentFrame;
    function W(l) {
      if (l) {
        var b = l._owner, S = U(l.type, l._source, b ? b.type : null);
        V.setExtraStackFrame(S);
      } else
        V.setExtraStackFrame(null);
    }
    var Oe;
    Oe = !1;
    function Ne(l) {
      return typeof l == "object" && l !== null && l.$$typeof === t;
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
    var Zt = {};
    function Gt(l) {
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
        var S = Gt(b);
        if (Zt[S])
          return;
        Zt[S] = !0;
        var j = "";
        l && l._owner && l._owner !== w.current && (j = " It was passed a child from " + be(l._owner.type) + "."), W(l), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', S, j), W(null);
      }
    }
    function ze(l, b) {
      {
        if (typeof l != "object")
          return;
        if (re(l))
          for (var S = 0; S < l.length; S++) {
            var j = l[S];
            Ne(j) && je(j, b);
          }
        else if (Ne(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var Q = L(l);
          if (typeof Q == "function" && Q !== l.entries)
            for (var ne = Q.call(l), G; !(G = ne.next()).done; )
              Ne(G.value) && je(G.value, b);
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
        b.$$typeof === f))
          S = b.propTypes;
        else
          return;
        if (S) {
          var j = be(b);
          oe(S, l.props, "prop", j, l);
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
          var j = b[S];
          if (j !== "children" && j !== "key") {
            W(l), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", j), W(null);
            break;
          }
        }
        l.ref !== null && (W(l), y("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    function dt(l, b, S, j, Q, ne) {
      {
        var G = Je(l);
        if (!G) {
          var $ = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && ($ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Me = Fi(Q);
          Me ? $ += Me : $ += we();
          var fe;
          l === null ? fe = "null" : re(l) ? fe = "array" : l !== void 0 && l.$$typeof === t ? (fe = "<" + (be(l.type) || "Unknown") + " />", $ = " Did you accidentally export a JSX literal instead of a component?") : fe = typeof l, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", fe, $);
        }
        var Ee = d(l, b, S, Q, ne);
        if (Ee == null)
          return Ee;
        if (G) {
          var Be = b.children;
          if (Be !== void 0)
            if (j)
              if (re(Be)) {
                for (var Ct = 0; Ct < Be.length; Ct++)
                  ze(Be[Ct], l);
                Object.freeze && Object.freeze(Be);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ze(Be, l);
        }
        return l === e ? Ke(Ee) : ft(Ee), Ee;
      }
    }
    function Ot(l, b, S) {
      return dt(l, b, S, !0);
    }
    function Wt(l, b, S) {
      return dt(l, b, S, !1);
    }
    var Hn = Wt, Yn = Ot;
    Ut.Fragment = e, Ut.jsx = Hn, Ut.jsxs = Yn;
  }()), Ut;
}
process.env.NODE_ENV === "production" ? Di.exports = Ns() : Di.exports = js();
var u = Di.exports;
function Fn(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ u.jsx("button", { children: i.title });
}
const zs = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Bs = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Hs(i) {
  return /* @__PURE__ */ u.jsx(kn.Item, { value: i.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    Bs,
    /* @__PURE__ */ u.jsx("span", { children: i.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      i.onDelete(i.index);
    }, children: zs })
  ] }) }, i.title);
}
function Ys(i) {
  const [t, n] = J(!1), [e, s] = J(i.options), a = (c) => {
    i.onDragComplete(c), s(c);
  }, o = (c) => {
    const m = [...e];
    m.splice(c, 1), a(m);
  }, r = [];
  e.forEach((c, m) => {
    r.push(/* @__PURE__ */ u.jsx(Hs, { index: m, title: c, onDelete: o }, c));
  });
  let h = "dropdown draggable";
  return i.subdropdown && (h += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: h, onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
    /* @__PURE__ */ u.jsx(Fn, { title: i.title }),
    /* @__PURE__ */ u.jsx(kn.Group, { axis: "y", values: e, onReorder: a, style: { visibility: t ? "visible" : "hidden" }, children: r })
  ] });
}
function Vs(i) {
  const [t, n] = J(!1), e = [];
  i.options.map((a, o) => {
    i.onSelect !== void 0 && (a.onSelect = i.onSelect), e.push(/* @__PURE__ */ u.jsx($s, { option: a }, o));
  });
  let s = "dropdown";
  return i.subdropdown && (s += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: s,
      onMouseEnter: () => n(!0),
      onMouseLeave: () => n(!1),
      children: [
        /* @__PURE__ */ u.jsx(Fn, { title: i.title }),
        /* @__PURE__ */ u.jsx(
          "ul",
          {
            style: { visibility: t ? "visible" : "hidden" },
            children: e
          }
        )
      ]
    }
  );
}
function $s(i) {
  const { option: t } = i, [n, e] = J("");
  let s;
  switch (t.type) {
    case "draggable":
      s = /* @__PURE__ */ u.jsx(
        Ys,
        {
          title: t.title,
          options: t.value,
          onDragComplete: (a) => {
            t.onDragComplete !== void 0 && t.onDragComplete(a);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      s = /* @__PURE__ */ u.jsx(
        Vs,
        {
          title: t.title,
          options: t.value,
          onSelect: t.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      s = /* @__PURE__ */ u.jsx(
        "button",
        {
          onClick: () => {
            t.onSelect !== void 0 && t.onSelect(t.value), t.selectable && (n !== t.title ? e(t.title) : e(""));
          },
          children: t.title
        }
      );
      break;
  }
  return /* @__PURE__ */ u.jsx("li", { className: n === t.title ? "selected" : "", children: s }, Rs());
}
function za(i, t, n) {
  function e(a) {
    switch (t.forEach((o) => {
      o.callback(i, o.remote, a);
    }), a.event) {
      case "custom":
        B.dispatchEvent({ type: H.CUSTOM, value: a.data });
        break;
    }
  }
  function s(a) {
    switch (n.forEach((o) => {
      o.callback(i, o.remote, a);
    }), a.event) {
      case "custom":
        B.dispatchEvent({ type: H.CUSTOM, value: a.data });
        break;
    }
  }
  i.listen = (a) => {
    a.target === "editor" ? s(a) : e(a);
  };
}
function ai(i) {
  const [t, n] = J(i.open !== void 0 ? i.open : !0), e = !t || i.children === void 0, s = () => {
    B.dispatchEvent({ type: H.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${e ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !t;
          i.onToggle !== void 0 && i.onToggle(a), n(a);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${t ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: ni(i.label) })
        ]
      }
    ),
    i.onRefresh ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("button", { className: "refresh", onClick: i.onRefresh }),
      /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: s })
    ] }) : null,
    i.button,
    /* @__PURE__ */ u.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: i.children }) }, Math.random())
  ] });
}
function Nn(i) {
  const t = ae(null), [n, e] = J(!1), s = i.child !== void 0 && i.child.children.length > 0, a = [];
  return i.child !== void 0 && i.child.children.length > 0 && i.child.children.map((o, r) => {
    a.push(/* @__PURE__ */ u.jsx(Nn, { child: o, three: i.three }, r));
  }), qe(() => {
    if (i.child) {
      const o = i.three.getScene(i.child.uuid);
      if (o !== null) {
        const r = o.getObjectByProperty("uuid", i.child.uuid);
        r !== void 0 && (t.current.style.opacity = r.visible ? "1" : "0.25");
      }
    }
  }, [n]), /* @__PURE__ */ u.jsx(u.Fragment, { children: i.child !== void 0 && /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      s ? /* @__PURE__ */ u.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            e(!n);
          }
        }
      ) : null,
      /* @__PURE__ */ u.jsx(
        "button",
        {
          className: "name",
          style: {
            left: s ? "20px" : "5px"
          },
          onClick: () => {
            i.child !== void 0 && (i.three.getObject(i.child.uuid), n || e(!0));
          },
          children: i.child.name.length > 0 ? `${i.child.name} (${i.child.type})` : `${i.child.type}::${i.child.uuid}`
        }
      ),
      /* @__PURE__ */ u.jsx(
        "button",
        {
          className: "visibility",
          ref: t,
          onClick: () => {
            if (i.child) {
              const o = i.three.getScene(i.child.uuid);
              if (o !== null) {
                const r = o.getObjectByProperty("uuid", i.child.uuid);
                if (r !== void 0) {
                  const h = "visible", c = !r.visible;
                  t.current.style.opacity = c ? "1" : "0.25", i.three.updateObject(i.child.uuid, h, c), pe(r, h, c);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${Is(i.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: a }) })
  ] }, Math.random()) });
}
function Wi(i) {
  const t = [];
  return i.child?.children.map((n, e) => {
    t.push(/* @__PURE__ */ u.jsx(Nn, { child: n, scene: i.scene, three: i.three }, e));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: t });
}
function Zs(i) {
  const [t, n] = J(i.defaultValue);
  return qe(() => {
    let e = !1, s = -1, a = 0, o = i.defaultValue;
    const r = (g) => {
      e = !0, a = Number(i.input.current?.value), s = g.clientX, document.addEventListener("mouseup", c, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", c, !1);
    }, h = (g) => {
      if (!e)
        return;
      const v = i.step !== void 0 ? i.step : 1, M = (g.clientX - s) * v;
      o = Number((a + M).toFixed(4)), i.min !== void 0 && (o = Math.max(o, i.min)), i.max !== void 0 && (o = Math.min(o, i.max)), i.onChange !== void 0 && i.onChange(o), n(o);
    }, c = () => {
      e = !1, document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    }, m = (g) => {
      const v = Number(g.target.value);
      n(v);
    }, f = (g) => {
      const v = Number(g.target.value);
      i.onChange !== void 0 && i.onChange(v), n(v);
    };
    return i.input.current?.addEventListener("input", m), i.label.current?.addEventListener("mousedown", r, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", f), () => {
      i.input.current?.removeEventListener("input", m), i.label.current?.removeEventListener("mousedown", r), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", f), document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    };
  }, []), t;
}
function yt(i) {
  const t = ae(null), n = ae(null), e = Zs({
    label: i.labelRef,
    input: t,
    sliderRef: n,
    defaultValue: i.value,
    min: i.min,
    max: i.max,
    step: i.step,
    onChange: (s) => {
      i.onChange !== void 0 && i.onChange(i.prop, s);
    }
  });
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    i.type === "number" && /* @__PURE__ */ u.jsx(
      "input",
      {
        alt: i.alt,
        className: i.className,
        ref: t,
        type: "number",
        value: e,
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
    i.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "text",
          value: e.toString(),
          disabled: i.disabled,
          ref: t,
          className: "min",
          onChange: (s) => {
            const a = Number(s.target.value);
            i.onChange !== void 0 && i.onChange(i.prop, a);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: i.disabled,
          type: "range",
          value: e,
          min: i.min,
          max: i.max,
          step: i.step,
          ref: n,
          onChange: Li
        }
      )
    ] })
  ] });
}
function Gs(i) {
  const t = ae(null), n = ae(null), e = ae(null), s = ae(null), a = ae(null), o = ae(null), [r, h] = J(i.value), [c, m] = J({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [f, g] = J(!1);
  function v() {
    f || (window.addEventListener("mousemove", P), window.addEventListener("mouseup", M), window.addEventListener("mouseup", M), g(!0));
  }
  function M() {
    window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", M), g(!1);
  }
  function P(O) {
    const I = a.current.getBoundingClientRect(), A = vt(0, 99, O.clientX - I.left) / 99, C = vt(0, 99, O.clientY - I.top) / 99, te = Vi(wi(c.min, c.max, A), 3), K = Vi(wi(c.min, c.max, C), 3);
    i.onChange({ target: { value: { x: te, y: K } } }), h({ x: te, y: K });
  }
  function L(O) {
    let I = r.x, A = r.y;
    O.target === t.current ? I = Number(O.target.value) : A = Number(O.target.value), h({ x: I, y: A });
  }
  function _() {
    const O = Number(e.current.value);
    m({ min: O, max: c.max }), (r.x < O || r.y < O) && h({ x: vt(O, c.max, r.x), y: vt(O, c.max, r.y) });
  }
  function y() {
    const O = Number(s.current.value);
    m({ min: c.min, max: O }), (r.x > O || r.y > O) && h({ x: vt(c.min, O, r.x), y: vt(c.min, O, r.y) });
  }
  qe(() => {
    const O = Yi(c.min, c.max, r.x), I = Yi(c.min, c.max, r.y);
    o.current.style.left = `${O * 100}%`, o.current.style.top = `${I * 100}%`;
  }, [c, r]);
  const x = i.step !== void 0 ? i.step : 0.01;
  return /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "X:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: r.x,
            min: c.min,
            max: c.max,
            step: x,
            onChange: L
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: r.y,
            min: c.min,
            max: c.max,
            step: x,
            onChange: L
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: c.min,
            step: x,
            onChange: _
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ u.jsx(
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
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: a, onMouseDown: v, onMouseUp: M, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: o })
    ] })
  ] });
}
function Ki(i) {
  const t = i.value.isVector3 !== void 0, n = i.value.isEuler !== void 0, e = i.value.elements !== void 0, s = i.step !== void 0 ? i.step : 0.01, a = [];
  if (t) {
    const o = Ce(() => i.value, []), r = (c, m) => {
      o[c] = m, i.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((c) => {
      const m = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: m, children: c.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            yt,
            {
              value: o[c],
              type: "number",
              prop: c,
              step: s,
              labelRef: m,
              onChange: r
            }
          )
        ] }, c)
      );
    });
  } else if (n) {
    const o = Ce(() => i.value, []), r = (c, m) => {
      o[c] = m, i.onChange({ target: { value: o } });
    };
    ["_x", "_y", "_z"].forEach((c) => {
      const m = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: m, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            yt,
            {
              value: o[c],
              type: "number",
              prop: c,
              step: s,
              labelRef: m,
              onChange: r
            }
          )
        ] }, c)
      );
    });
  } else if (e) {
    const o = Ce(() => i.value, []), r = (h, c) => {
      const m = Number(h);
      o.elements[m] = c, i.onChange({ target: { value: o } });
    };
    for (let h = 0; h < 9; h++) {
      const c = ae(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: h + 1 }),
          /* @__PURE__ */ u.jsx(
            yt,
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid3", children: a }, Math.random().toString());
}
function Ws(i) {
  const t = i.value.x !== void 0, n = i.step !== void 0 ? i.step : 0.01, e = [];
  if (t) {
    const s = Ce(() => i.value, []), a = (r, h) => {
      s[r] = h, i.onChange({ target: { value: s } });
    };
    ["x", "y", "z", "w"].forEach((r) => {
      const h = ae(null);
      e.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: h, children: r.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            yt,
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
      const r = ae(null);
      e.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: r, children: o + 1 }),
          /* @__PURE__ */ u.jsx(
            yt,
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: e });
}
function Ks(i) {
  return "items" in i;
}
function Et(i) {
  const t = [];
  return i.items.forEach((n) => {
    Ks(n) ? t.push(
      /* @__PURE__ */ u.jsx(Et, { title: ni(n.title), items: n.items }, Math.random())
    ) : t.push(
      /* @__PURE__ */ u.jsx(
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
          onChange: (e, s) => {
            n.onChange !== void 0 && n.onChange(e, s);
          },
          onKeyDown: (e) => {
            n.onKeyDown !== void 0 && n.onKeyDown(e);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ u.jsx(ai, { label: i.title, open: i.expanded === !0, children: t });
}
function Xs(i) {
  return !(i === "defaultAttributeValues" || i === "forceSinglePass" || i === "linecap" || i === "linejoin" || i === "linewidth" || i === "normalMapType" || i === "precision" || i === "shadowSide" || i === "uniformsGroups" || i === "uniformsNeedUpdate" || i === "userData" || i === "version" || i === "wireframeLinecap" || i === "wireframeLinejoin" || i === "wireframeLinewidth" || i.slice(0, 4) === "clip" || i.slice(0, 7) === "polygon" || i.slice(0, 7) === "stencil" || i.slice(0, 2) === "is");
}
function qs(i) {
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
function li(i) {
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
function jn(i) {
  const t = i.toLowerCase();
  return t.search("intensity") > -1 || t === "anisotropyrotation" || t === "blendalpha" || t === "bumpscale" || t === "clearcoatroughness" || t === "displacementbias" || t === "displacementscale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionratio" || t === "roughness" || t === "sheenroughness" || t === "thickness";
}
function Js() {
  const i = document.createElement("input");
  return i.type = "file", new Promise((t, n) => {
    i.addEventListener("change", function() {
      if (i.files === null)
        n();
      else {
        const e = i.files[0], s = new FileReader();
        s.onload = function(a) {
          t(a.target.result);
        }, s.readAsDataURL(e);
      }
    }), i.click();
  });
}
const Qs = [
  {
    title: "Front",
    value: Zn
  },
  {
    title: "Back",
    value: _n
  },
  {
    title: "Double",
    value: gn
  }
], ea = [
  {
    title: "No Blending",
    value: Gn
  },
  {
    title: "Normal",
    value: Wn
  },
  {
    title: "Additive",
    value: Kn
  },
  {
    title: "Subtractive",
    value: Xn
  },
  {
    title: "Multiply",
    value: qn
  },
  {
    title: "Custom",
    value: Jn
  }
], ta = [
  {
    title: "Add",
    value: Qn
  },
  {
    title: "Subtract",
    value: es
  },
  {
    title: "Reverse Subtract",
    value: ts
  },
  {
    title: "Min",
    value: is
  },
  {
    title: "Max",
    value: ns
  }
], ia = [
  {
    title: "Zero",
    valye: vn
  },
  {
    title: "One",
    valye: yn
  },
  {
    title: "Src Color",
    valye: En
  },
  {
    title: "One Minus Src Color",
    valye: bn
  },
  {
    title: "Src Alpha",
    valye: On
  },
  {
    title: "One Minus Src Alpha",
    valye: Cn
  },
  {
    title: "Dst Alpha",
    valye: Tn
  },
  {
    title: "One Minus Dst Alpha",
    valye: xn
  },
  {
    title: "Dst Color",
    valye: Sn
  },
  {
    title: "One Minus Dst Color",
    valye: wn
  },
  {
    title: "Src Alpha Saturate",
    valye: ss
  },
  {
    title: "Constant Color",
    valye: Mn
  },
  {
    title: "One Minus Constant Color",
    valye: Rn
  },
  {
    title: "Constant Alpha",
    valye: Dn
  },
  {
    title: "One Minus Constant Alpha",
    valye: An
  }
], na = [
  {
    title: "Zero",
    valye: vn
  },
  {
    title: "One",
    valye: yn
  },
  {
    title: "Src Color",
    valye: En
  },
  {
    title: "One Minus Src Color",
    valye: bn
  },
  {
    title: "Src Alpha",
    valye: On
  },
  {
    title: "One Minus Src Alpha",
    valye: Cn
  },
  {
    title: "Dst Alpha",
    valye: Tn
  },
  {
    title: "One Minus Dst Alpha",
    valye: xn
  },
  {
    title: "Dst Color",
    valye: Sn
  },
  {
    title: "One Minus Dst Color",
    valye: wn
  },
  {
    title: "Constant Color",
    valye: Mn
  },
  {
    title: "One Minus Constant Color",
    valye: Rn
  },
  {
    title: "Constant Alpha",
    valye: Dn
  },
  {
    title: "One Minus Constant Alpha",
    valye: An
  }
];
function Ft(i, t) {
  i.needsUpdate = !0, i.type = "option", i.options = t;
}
function sa(i, t, n, e) {
  return {
    type: "boolean",
    title: li(i),
    prop: i,
    value: t,
    needsUpdate: !0,
    onChange: (s, a) => {
      e.updateObject(n.uuid, `material.${i}`, a), e.updateObject(n.uuid, "material.needsUpdate", !0);
      const o = e.getScene(n.uuid);
      if (o !== null) {
        const r = o.getObjectByProperty("uuid", n.uuid);
        pe(r, `material.${i}`, a);
      }
    }
  };
}
function aa(i, t, n, e) {
  const s = {
    type: "number",
    title: li(i),
    prop: i,
    value: t,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (a, o) => {
      e.updateObject(n.uuid, `material.${i}`, o), e.updateObject(n.uuid, "material.needsUpdate", !0);
      const r = e.getScene(n.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", n.uuid);
        pe(h, `material.${i}`, o);
      }
    }
  };
  switch (i) {
    case "blending":
      Ft(s, ea);
      break;
    case "blendDst":
      Ft(s, na);
      break;
    case "blendEquation":
      Ft(s, ta);
      break;
    case "blendSrc":
      Ft(s, ia);
      break;
    case "side":
      Ft(s, Qs);
      break;
  }
  return jn(i) && (s.value = Number(t), s.type = "range", s.min = Math.min(0, s.value), s.max = Math.max(1, s.value), s.step = 0.01), s;
}
function ra(i, t, n, e) {
  const s = {
    type: "string",
    title: li(i),
    prop: i,
    value: t,
    needsUpdate: !0,
    onChange: (o, r) => {
      e.updateObject(n.uuid, `material.${i}`, r), e.updateObject(n.uuid, "material.needsUpdate", !0);
      const h = e.getScene(n.uuid);
      if (h !== null) {
        const c = h.getObjectByProperty("uuid", n.uuid);
        pe(c, `material.${i}`, r);
      }
    },
    onKeyDown: (o) => {
    }
  };
  return (i === "vertexShader" || i === "fragmentShader") && (s.disabled = !1, s.latest = s.value, s.onChange = (o, r) => {
    s.latest = r, e.updateObject(n.uuid, `material.${i}`, r);
    const h = e.getScene(n.uuid);
    if (h !== null) {
      const c = h.getObjectByProperty("uuid", n.uuid);
      pe(c, `material.${i}`, r);
    }
  }, s.onKeyDown = (o) => {
    if (o.key === "Enter" && (o.altKey || o.metaKey)) {
      e.updateObject(n.uuid, "material.needsUpdate", !0);
      const r = e.getScene(n.uuid);
      if (r !== null) {
        const h = r.getObjectByProperty("uuid", n.uuid);
        pe(h, "material.needsUpdate", !0);
      }
    }
  }), s;
}
function oa(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z === void 0;
}
function ca(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w === void 0;
}
function la(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w !== void 0;
}
function Ai(i) {
  i.sort((t, n) => t.title < n.title ? -1 : t.title > n.title ? 1 : 0);
}
function Yt(i, t, n, e, s = "", a = !1) {
  const o = li(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = s.length > 0 ? `${s}.${i}` : i, h = typeof t;
  if (h === "boolean" || h === "string")
    return {
      title: o,
      prop: r,
      type: h,
      value: t,
      disabled: a,
      onChange: (c, m) => {
        e.updateObject(n.uuid, `material.${r}`, m);
        const f = e.getScene(n.uuid);
        if (f !== null) {
          const g = f.getObjectByProperty("uuid", n.uuid);
          pe(g, `material.${r}`, m);
        }
      }
    };
  if (h === "number") {
    const c = {
      title: o,
      prop: r,
      type: "number",
      value: t,
      step: 0.01,
      disabled: a,
      onChange: (m, f) => {
        e.updateObject(n.uuid, `material.${r}`, f);
        const g = e.getScene(n.uuid);
        if (g !== null) {
          const v = g.getObjectByProperty("uuid", n.uuid);
          pe(v, `material.${r}`, f);
        }
      }
    };
    return jn(o) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (t.isColor)
      return {
        title: o,
        prop: r,
        type: "color",
        value: t,
        disabled: a,
        onChange: (c, m) => {
          const f = new Ii(m);
          e.updateObject(n.uuid, `material.${r}`, f);
          const g = e.getScene(n.uuid);
          if (g !== null) {
            const v = g.getObjectByProperty("uuid", n.uuid);
            pe(v, `material.${r}`, f);
          }
        }
      };
    if (Array.isArray(t)) {
      const c = [];
      for (const m in t) {
        const f = t[m], g = `[${m.toString()}]`;
        if (f.value !== void 0) {
          const v = Yt(`${g}.value`, f.value, n, e, r, a);
          v !== void 0 && c.push(v);
        } else {
          const v = Yt(g, f, n, e, r, a);
          v !== void 0 && c.push(v);
        }
      }
      if (c.length > 0)
        return Ai(c), {
          title: o,
          items: c
        };
    } else {
      if (oa(t))
        return {
          title: o,
          prop: r,
          type: "vector2",
          value: t,
          disabled: a,
          onChange: (c, m) => {
            e.updateObject(n.uuid, `material.${r}`, m);
            const f = e.getScene(n.uuid);
            if (f !== null) {
              const g = f.getObjectByProperty("uuid", n.uuid);
              pe(g, `material.${r}`, m);
            }
          }
        };
      if (ca(t))
        return {
          title: o,
          prop: r,
          type: "grid3",
          value: t,
          disabled: a,
          onChange: (c, m) => {
            e.updateObject(n.uuid, `material.${r}`, m);
            const f = e.getScene(n.uuid);
            if (f !== null) {
              const g = f.getObjectByProperty("uuid", n.uuid);
              pe(g, `material.${r}`, m);
            }
          }
        };
      if (la(t))
        return {
          title: o,
          prop: r,
          type: "grid4",
          value: t,
          disabled: a,
          onChange: (c, m) => {
            e.updateObject(n.uuid, `material.${r}`, m);
            const f = e.getScene(n.uuid);
            if (f !== null) {
              const g = f.getObjectByProperty("uuid", n.uuid);
              pe(g, `material.${r}`, m);
            }
          }
        };
      if (t.isEuler)
        return {
          title: o,
          prop: r,
          type: "euler",
          value: t,
          disabled: a,
          onChange: (c, m) => {
            e.updateObject(n.uuid, `material.${r}`, m);
            const f = e.getScene(n.uuid);
            if (f !== null) {
              const g = f.getObjectByProperty("uuid", n.uuid);
              pe(g, `material.${r}`, m);
            }
          }
        };
      if (t.src !== void 0)
        return {
          title: o,
          type: "image",
          value: t,
          disabled: a,
          onChange: (c, m) => {
            const f = qs(i), g = s.length > 0 ? `${s}.${f}` : f;
            e.createTexture(n.uuid, `material.${g}`, m);
            const v = e.getScene(n.uuid);
            if (v !== null) {
              const M = v.getObjectByProperty("uuid", n.uuid);
              if (M !== void 0) {
                const P = (L) => {
                  const _ = M.material, y = g.split(".");
                  switch (y.length) {
                    case 1:
                      _[y[0]] = L;
                      break;
                    case 2:
                      _[y[0]][y[1]] = L;
                      break;
                    case 3:
                      _[y[0]][y[1]][y[2]] = L;
                      break;
                    case 4:
                      _[y[0]][y[1]][y[2]][y[3]] = L;
                      break;
                    case 5:
                      _[y[0]][y[1]][y[2]][y[3]][y[4]] = L;
                      break;
                  }
                  _.needsUpdate = !0;
                };
                m.src.length > 0 ? Un(m.src).then((L) => {
                  L.offset.set(m.offset[0], m.offset[1]), L.repeat.set(m.repeat[0], m.repeat[1]), P(L);
                }) : P(null);
              }
            }
          }
        };
      if (t.elements !== void 0)
        return {
          title: o,
          prop: r,
          type: t.elements.length > 9 ? "grid4" : "grid3",
          value: t,
          disabled: a,
          onChange: (c, m) => {
            e.updateObject(n.uuid, `material.${r}`, m);
            const f = e.getScene(n.uuid);
            if (f !== null) {
              const g = f.getObjectByProperty("uuid", n.uuid);
              pe(g, `material.${r}`, m);
            }
          }
        };
      {
        const c = [], m = i === "defines" || i === "extensions";
        try {
          for (const f in t) {
            const g = t[f];
            if (g !== void 0)
              if (g.value !== void 0) {
                const v = Yt(`${f}.value`, g.value, n, e, r, m);
                v !== void 0 && c.push(v);
              } else {
                const v = Yt(f, g, n, e, r, m);
                v !== void 0 && c.push(v);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", i, t);
        }
        if (c.length > 0)
          return Ai(c), {
            title: o,
            items: c
          };
      }
    }
  }
}
function Xi(i, t, n) {
  const e = [];
  for (const s in i) {
    if (!Xs(s))
      continue;
    const a = typeof i[s], o = i[s];
    if (a === "boolean")
      e.push(sa(s, o, t, n));
    else if (a === "number")
      e.push(aa(s, o, t, n));
    else if (a === "string")
      e.push(ra(s, o, t, n));
    else if (a === "object") {
      const r = Yt(s, o, t, n);
      r !== void 0 && e.push(r);
    } else
      o !== void 0 && console.log("other:", s, a, o);
  }
  return Ai(e), e.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      n.updateObject(t.uuid, "material.needsUpdate", !0);
      const s = n.getScene(t.uuid);
      if (s !== null) {
        const a = s.getObjectByProperty("uuid", t.uuid);
        pe(a, "material.needsUpdate", !0);
      }
    }
  }), e;
}
function da(i, t) {
  const n = i.material;
  if (Array.isArray(n)) {
    const e = [], s = n.length;
    for (let a = 0; a < s; a++)
      e.push(
        /* @__PURE__ */ u.jsx(
          Et,
          {
            title: `Material ${a}`,
            items: Xi(n[a], i, t)
          },
          `Material ${a}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: e });
  } else
    return /* @__PURE__ */ u.jsx(
      Et,
      {
        title: "Material",
        items: Xi(n, i, t)
      }
    );
}
const qi = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function ha(i) {
  const t = i.step !== void 0 ? i.step : 0.01, n = ae(null), e = ae(null), s = ae(null), a = ae(null), o = ae(null), [r] = J(i.value), [h, c] = J(i.value.offset[0]), [m, f] = J(i.value.offset[1]), [g, v] = J(i.value.repeat[0]), [M, P] = J(i.value.repeat[1]);
  function L(y, x, O, I, A) {
    if (i.onChange !== void 0) {
      const C = i.prop !== void 0 ? i.prop : i.title;
      i.onChange(C, {
        src: y,
        offset: [x, O],
        repeat: [I, A]
      });
    }
  }
  function _(y) {
    const x = n.current.src, O = y.target.value;
    switch (y.target) {
      case e.current:
        c(O), L(x, O, m, g, M);
        break;
      case s.current:
        f(O), L(x, h, O, g, M);
        break;
      case a.current:
        v(O), L(x, h, m, O, M);
        break;
      case o.current:
        P(O), L(x, h, m, g, O);
        break;
    }
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ u.jsx("img", { alt: i.title, ref: n, onClick: () => {
      Js().then((y) => {
        n.current.src = y, L(y, h, m, g, M);
      });
    }, src: r.src.length > 0 ? r.src : qi }),
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: h,
            step: t,
            onChange: _
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: m,
            step: t,
            onChange: _
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: g,
            step: t,
            onChange: _
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: o,
            type: "number",
            value: M,
            step: t,
            onChange: _
          }
        )
      ] }),
      /* @__PURE__ */ u.jsx("button", { onClick: () => {
        L("", h, m, g, M), n.current.src = qi;
      }, children: "Clear" })
    ] })
  ] });
}
function ii(i) {
  let t = i.value;
  t !== void 0 && t.isColor !== void 0 && (t = As(i.value));
  const [n, e] = J(t), s = ae(null), a = (c) => {
    let m = c.target.value;
    i.type === "boolean" ? m = c.target.checked : i.type === "option" && (m = i.options[m].value), e(m), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, m);
  }, o = {};
  i.disabled && (o.opacity = 0.8);
  const r = i.type === "string" && (n.length > 100 || n.search(`
`) > -1), h = r || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${h ? "block" : ""}`, style: o, children: [
    i.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: s, children: ni(i.title) }, "fieldLabel"),
    i.type === "string" && !r && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: i.disabled,
        onChange: a,
        value: n
      }
    ),
    i.type === "string" && r && /* @__PURE__ */ u.jsx(
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
    i.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: i.disabled,
        onChange: a,
        checked: n
      }
    ),
    i.type === "number" && /* @__PURE__ */ u.jsx(
      yt,
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
    i.type === "range" && /* @__PURE__ */ u.jsx(
      yt,
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
    i.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: n.toString(), onChange: a, disabled: i.disabled, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: n, onChange: a, disabled: i.disabled })
    ] }),
    i.type === "button" && /* @__PURE__ */ u.jsx(
      "button",
      {
        disabled: i.disabled,
        onClick: () => {
          i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, !0);
        },
        children: i.title
      }
    ),
    i.type === "image" && /* @__PURE__ */ u.jsx(ha, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: a, disabled: i.disabled, defaultValue: i.value, children: i.options?.map((c, m) => /* @__PURE__ */ u.jsx("option", { value: c.value, children: ni(c.title) }, m)) }) }),
    i.type === "vector2" && /* @__PURE__ */ u.jsx(Gs, { step: i.step, value: n, min: 0, max: 1, onChange: a }),
    i.type === "grid3" && /* @__PURE__ */ u.jsx(Ki, { step: i.step, value: n, onChange: a }),
    i.type === "grid4" && /* @__PURE__ */ u.jsx(Ws, { step: i.step, value: n, onChange: a }),
    i.type === "euler" && /* @__PURE__ */ u.jsx(Ki, { step: i.step, value: n, onChange: a })
  ] });
}
function Ji(i) {
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
function ua(i, t) {
  const n = [];
  if (i.perspectiveCameraInfo !== void 0)
    for (const e in i.perspectiveCameraInfo)
      n.push({
        title: Ji(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[e],
        onChange: (s, a) => {
          t.updateObject(i.uuid, s, a), t.requestMethod(i.uuid, "updateProjectionMatrix");
          const o = t.getScene(i.uuid);
          if (o !== null) {
            const r = o.getObjectByProperty("uuid", i.uuid);
            r !== void 0 && (pe(r, s, a), r.updateProjectionMatrix());
          }
        }
      });
  else if (i.orthographicCameraInfo !== void 0)
    for (const e in i.orthographicCameraInfo)
      n.push({
        title: Ji(e),
        prop: e,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[e],
        onChange: (s, a) => {
          t.updateObject(i.uuid, s, a), t.requestMethod(i.uuid, "updateProjectionMatrix");
          const o = t.getScene(i.uuid);
          if (o !== null) {
            const r = o.getObjectByProperty("uuid", i.uuid);
            r !== void 0 && (pe(r, s, a), r.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ u.jsx(
    Et,
    {
      title: "Camera",
      items: n
    }
  );
}
function ma(i, t) {
  const n = new Pn();
  n.elements = i.matrix;
  const e = new ce(), s = new as(), a = new ce();
  i.uuid.length > 0 && (e.setFromMatrixPosition(n), s.setFromRotationMatrix(n), a.setFromMatrixScale(n));
  const o = (r, h) => {
    const c = r === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    t.updateObject(i.uuid, r, c);
    const m = t.getScene(i.uuid);
    if (m !== null) {
      const f = m.getObjectByProperty("uuid", i.uuid);
      pe(f, r, c);
    }
  };
  return /* @__PURE__ */ u.jsx(
    Et,
    {
      title: "Transform",
      items: [
        {
          title: "Position",
          prop: "position",
          type: "grid3",
          step: 0.1,
          value: e,
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
function Qi(i) {
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
function fa(i, t) {
  const n = [];
  if (i.lightInfo !== void 0)
    for (const e in i.lightInfo) {
      const s = i.lightInfo[e];
      s !== void 0 && (s.isColor !== void 0 ? n.push({
        title: Qi(e),
        prop: e,
        type: "color",
        value: s,
        onChange: (a, o) => {
          const r = new Ii(o);
          t.updateObject(i.uuid, a, r);
          const h = t.getScene(i.uuid);
          if (h !== null) {
            const c = h.getObjectByProperty("uuid", i.uuid);
            pe(c, a, r);
          }
        }
      }) : n.push({
        title: Qi(e),
        prop: e,
        type: typeof s,
        value: s,
        step: typeof s == "number" ? 0.01 : void 0,
        onChange: (a, o) => {
          t.updateObject(i.uuid, a, o);
          const r = t.getScene(i.uuid);
          if (r !== null) {
            const h = r.getObjectByProperty("uuid", i.uuid);
            pe(h, a, o);
          }
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Et,
    {
      title: "Light",
      items: n
    }
  );
}
function pa(i, t) {
  const n = [], e = [];
  let s = 0;
  i.animations.forEach((o) => {
    s = Math.max(s, o.duration), o.duration > 0 && e.push({
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
    items: e
  });
  const a = t.getScene(i.uuid);
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
            onChange: (m, f) => {
              h.timeScale = f, t.updateObject(i.uuid, "mixer.timeScale", f);
            }
          }
        ];
        c.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            h.stopAllAction(), t.requestMethod(i.uuid, "stopAllAction", void 0, "mixer");
          }
        }), n.push({
          title: "Mixer",
          items: c
        });
      }
    }
  }
  return /* @__PURE__ */ u.jsx(Et, { title: "Animation", items: n });
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
let Pe = { ...zn };
function _a(i) {
  const [t, n] = J(-1);
  qe(() => {
    function o(h) {
      Pe = { ...h.value }, n(Date.now());
    }
    function r() {
      Pe = { ...zn }, n(Date.now());
    }
    return B.addEventListener(H.SET_SCENE, r), B.addEventListener(H.SET_OBJECT, o), () => {
      B.removeEventListener(H.SET_SCENE, r), B.removeEventListener(H.SET_OBJECT, o);
    };
  }, []);
  const e = Pe.type.toLowerCase(), s = Pe.animations.length > 0 || Pe.mixer !== void 0, a = e.search("mesh") > -1 || e.search("line") > -1 || e.search("points") > -1;
  return /* @__PURE__ */ u.jsx(ai, { label: "Inspector", children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: i.class, children: Pe.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        ii,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: Pe.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        ii,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: Pe.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        ii,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: Pe.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      ma(Pe, i.three),
      s ? pa(Pe, i.three) : null,
      e.search("camera") > -1 ? ua(Pe, i.three) : null,
      e.search("light") > -1 ? fa(Pe, i.three) : null,
      a ? da(Pe, i.three) : null
    ] })
  ] }) }, t) }, "Inspector");
}
function Ba(i) {
  const [t] = J([]), [n] = J([]), [e, s] = J(0), a = (h) => {
    const c = h.value;
    t.push(c), n.push(
      /* @__PURE__ */ u.jsx(
        ai,
        {
          label: `Scene: ${c.name}`,
          scene: c,
          open: !0,
          onRefresh: () => {
            i.three.refreshScene(c.name);
          },
          children: /* @__PURE__ */ u.jsx(Wi, { child: c, scene: c, three: i.three })
        },
        Math.random()
      )
    ), s(Date.now());
  }, o = (h) => {
    const c = h.value;
    for (let m = 0; m < t.length; m++)
      if (c.uuid === t[m].uuid) {
        t[m] = c, n[m] = /* @__PURE__ */ u.jsx(
          ai,
          {
            label: `Scene: ${c.name}`,
            scene: c,
            open: !0,
            onRefresh: () => {
              i.three.refreshScene(c.name);
            },
            children: /* @__PURE__ */ u.jsx(Wi, { child: c, scene: c, three: i.three })
          },
          Math.random()
        ), s(Date.now());
        return;
      }
  }, r = (h) => {
    const c = h.value;
    for (let m = 0; m < t.length; m++)
      if (c.uuid === t[m].uuid) {
        t.splice(m, 1), n.splice(m, 1), s(Date.now());
        return;
      }
  };
  return qe(() => (B.addEventListener(H.ADD_SCENE, a), B.addEventListener(H.REFRESH_SCENE, o), B.addEventListener(H.REMOVE_SCENE, r), () => {
    B.removeEventListener(H.ADD_SCENE, a), B.removeEventListener(H.REFRESH_SCENE, o), B.removeEventListener(H.REMOVE_SCENE, r);
  }), []), /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ u.jsx("div", { children: n }, e),
    /* @__PURE__ */ u.jsx(_a, { three: i.three })
  ] });
}
function Ha(i) {
  return qe(() => {
    function t(r) {
      let h = null;
      return i.three.scenes.forEach((c) => {
        r.search(c.uuid) > -1 && (h = c);
      }), h;
    }
    const n = (r) => {
      const h = r.value, m = t(h)?.getObjectByProperty("uuid", h);
      m !== void 0 && i.three.setObject(m);
    }, e = (r, h, c) => {
      const f = t(r)?.getObjectByProperty("uuid", r);
      f !== void 0 && pe(f, h, c);
    }, s = (r) => {
      const h = r.value, { key: c, value: m, uuid: f } = h;
      e(f, c, m);
    }, a = (r) => {
      const h = r.value, m = t(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (m !== void 0) {
        const f = (g) => {
          const v = h.key.split(".");
          switch (v.length) {
            case 1:
              m[v[0]] = g;
              break;
            case 2:
              m[v[0]][v[1]] = g;
              break;
            case 3:
              m[v[0]][v[1]][v[2]] = g;
              break;
            case 4:
              m[v[0]][v[1]][v[2]][v[3]] = g;
              break;
            case 5:
              m[v[0]][v[1]][v[2]][v[3]][v[4]] = g;
              break;
          }
          m.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? Un(h.value.src).then((g) => {
          g.offset.set(h.value.offset[0], h.value.offset[1]), g.repeat.set(h.value.repeat[0], h.value.repeat[1]), f(g);
        }) : f(null);
      }
    }, o = (r) => {
      const { key: h, uuid: c, value: m, subitem: f } = r.value, v = t(c)?.getObjectByProperty("uuid", c);
      if (v !== void 0)
        try {
          f !== void 0 ? Us(v, f)[h](m) : v[h](m);
        } catch (M) {
          console.log("Error requesting method:"), console.log(M), console.log(h), console.log(m);
        }
    };
    return B.addEventListener(H.GET_OBJECT, n), B.addEventListener(H.UPDATE_OBJECT, s), B.addEventListener(H.CREATE_TEXTURE, a), B.addEventListener(H.REQUEST_METHOD, o), () => {
      B.removeEventListener(H.GET_OBJECT, n), B.removeEventListener(H.UPDATE_OBJECT, s), B.removeEventListener(H.CREATE_TEXTURE, a), B.removeEventListener(H.REQUEST_METHOD, o);
    };
  }, []), null;
}
class ga extends rs {
  constructor(t, n) {
    const e = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], s = new Ti();
    s.setAttribute("position", new Vt(e, 3)), s.computeBoundingSphere();
    const a = new os({ fog: !1 });
    super(s, a), this.light = t, this.color = n, this.type = "RectAreaLightHelper";
    const o = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new Ti();
    r.setAttribute("position", new Vt(o, 3)), r.computeBoundingSphere(), this.add(new oi(r, new Pi({ side: _n, fog: !1 })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const t = this.material.color, n = Math.max(t.r, t.g, t.b);
      n > 1 && t.multiplyScalar(1 / n), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const en = { type: "change" }, fi = { type: "start" }, tn = { type: "end" }, Kt = new cs(), nn = new ls(), va = Math.cos(70 * ds.DEG2RAD);
class ya extends pn {
  constructor(t, n) {
    super(), this.object = t, this.domElement = n, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new ce(), this.cursor = new ce(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Tt.ROTATE, MIDDLE: Tt.DOLLY, RIGHT: Tt.PAN }, this.touches = { ONE: xt.ROTATE, TWO: xt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(d) {
      d.addEventListener("keydown", Ae), this._domElementKeyEvents = d;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Ae), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(en), e.update(), a = s.NONE;
    }, this.update = function() {
      const d = new ce(), w = new xi().setFromUnitVectors(t.up, new ce(0, 1, 0)), V = w.clone().invert(), W = new ce(), Oe = new xi(), Ne = new ce(), we = 2 * Math.PI;
      return function(Zt = null) {
        const Gt = e.object.position;
        d.copy(Gt).sub(e.target), d.applyQuaternion(w), r.setFromVector3(d), e.autoRotate && a === s.NONE && ke(Je(Zt)), e.enableDamping ? (r.theta += h.theta * e.dampingFactor, r.phi += h.phi * e.dampingFactor) : (r.theta += h.theta, r.phi += h.phi);
        let je = e.minAzimuthAngle, ze = e.maxAzimuthAngle;
        isFinite(je) && isFinite(ze) && (je < -Math.PI ? je += we : je > Math.PI && (je -= we), ze < -Math.PI ? ze += we : ze > Math.PI && (ze -= we), je <= ze ? r.theta = Math.max(je, Math.min(ze, r.theta)) : r.theta = r.theta > (je + ze) / 2 ? Math.max(je, r.theta) : Math.min(ze, r.theta)), r.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, r.phi)), r.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(m, e.dampingFactor) : e.target.add(m), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let ft = !1;
        if (e.zoomToCursor && A || e.object.isOrthographicCamera)
          r.radius = nt(r.radius);
        else {
          const Ke = r.radius;
          r.radius = nt(r.radius * c), ft = Ke != r.radius;
        }
        if (d.setFromSpherical(r), d.applyQuaternion(V), Gt.copy(e.target).add(d), e.object.lookAt(e.target), e.enableDamping === !0 ? (h.theta *= 1 - e.dampingFactor, h.phi *= 1 - e.dampingFactor, m.multiplyScalar(1 - e.dampingFactor)) : (h.set(0, 0, 0), m.set(0, 0, 0)), e.zoomToCursor && A) {
          let Ke = null;
          if (e.object.isPerspectiveCamera) {
            const dt = d.length();
            Ke = nt(dt * c);
            const Ot = dt - Ke;
            e.object.position.addScaledVector(O, Ot), e.object.updateMatrixWorld(), ft = !!Ot;
          } else if (e.object.isOrthographicCamera) {
            const dt = new ce(I.x, I.y, 0);
            dt.unproject(e.object);
            const Ot = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / c)), e.object.updateProjectionMatrix(), ft = Ot !== e.object.zoom;
            const Wt = new ce(I.x, I.y, 0);
            Wt.unproject(e.object), e.object.position.sub(Wt).add(dt), e.object.updateMatrixWorld(), Ke = d.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(Ke).add(e.object.position) : (Kt.origin.copy(e.object.position), Kt.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(Kt.direction)) < va ? t.lookAt(e.target) : (nn.setFromNormalAndCoplanarPoint(e.object.up, e.target), Kt.intersectPlane(nn, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const Ke = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / c)), Ke !== e.object.zoom && (e.object.updateProjectionMatrix(), ft = !0);
        }
        return c = 1, A = !1, ft || W.distanceToSquared(e.object.position) > o || 8 * (1 - Oe.dot(e.object.quaternion)) > o || Ne.distanceToSquared(e.target) > o ? (e.dispatchEvent(en), W.copy(e.object.position), Oe.copy(e.object.quaternion), Ne.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", We), e.domElement.removeEventListener("pointerdown", Z), e.domElement.removeEventListener("pointercancel", Te), e.domElement.removeEventListener("wheel", N), e.domElement.removeEventListener("pointermove", oe), e.domElement.removeEventListener("pointerup", Te), e.domElement.getRootNode().removeEventListener("keydown", ye, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Ae), e._domElementKeyEvents = null);
    };
    const e = this, s = {
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
    const o = 1e-6, r = new Si(), h = new Si();
    let c = 1;
    const m = new ce(), f = new Re(), g = new Re(), v = new Re(), M = new Re(), P = new Re(), L = new Re(), _ = new Re(), y = new Re(), x = new Re(), O = new ce(), I = new Re();
    let A = !1;
    const C = [], te = {};
    let K = !1;
    function Je(d) {
      return d !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * d : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function z(d) {
      const w = Math.abs(d * 0.01);
      return Math.pow(0.95, e.zoomSpeed * w);
    }
    function ke(d) {
      h.theta -= d;
    }
    function be(d) {
      h.phi -= d;
    }
    const xe = function() {
      const d = new ce();
      return function(V, W) {
        d.setFromMatrixColumn(W, 0), d.multiplyScalar(-V), m.add(d);
      };
    }(), Se = function() {
      const d = new ce();
      return function(V, W) {
        e.screenSpacePanning === !0 ? d.setFromMatrixColumn(W, 1) : (d.setFromMatrixColumn(W, 0), d.crossVectors(e.object.up, d)), d.multiplyScalar(V), m.add(d);
      };
    }(), Ue = function() {
      const d = new ce();
      return function(V, W) {
        const Oe = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const Ne = e.object.position;
          d.copy(Ne).sub(e.target);
          let we = d.length();
          we *= Math.tan(e.object.fov / 2 * Math.PI / 180), xe(2 * V * we / Oe.clientHeight, e.object.matrix), Se(2 * W * we / Oe.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (xe(V * (e.object.right - e.object.left) / e.object.zoom / Oe.clientWidth, e.object.matrix), Se(W * (e.object.top - e.object.bottom) / e.object.zoom / Oe.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function Ze(d) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? c /= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ot(d) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? c *= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function it(d, w) {
      if (!e.zoomToCursor)
        return;
      A = !0;
      const V = e.domElement.getBoundingClientRect(), W = d - V.left, Oe = w - V.top, Ne = V.width, we = V.height;
      I.x = W / Ne * 2 - 1, I.y = -(Oe / we) * 2 + 1, O.set(I.x, I.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function nt(d) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, d));
    }
    function ut(d) {
      f.set(d.clientX, d.clientY);
    }
    function ct(d) {
      it(d.clientX, d.clientX), _.set(d.clientX, d.clientY);
    }
    function _e(d) {
      M.set(d.clientX, d.clientY);
    }
    function Ge(d) {
      g.set(d.clientX, d.clientY), v.subVectors(g, f).multiplyScalar(e.rotateSpeed);
      const w = e.domElement;
      ke(2 * Math.PI * v.x / w.clientHeight), be(2 * Math.PI * v.y / w.clientHeight), f.copy(g), e.update();
    }
    function Lt(d) {
      y.set(d.clientX, d.clientY), x.subVectors(y, _), x.y > 0 ? Ze(z(x.y)) : x.y < 0 && ot(z(x.y)), _.copy(y), e.update();
    }
    function mt(d) {
      P.set(d.clientX, d.clientY), L.subVectors(P, M).multiplyScalar(e.panSpeed), Ue(L.x, L.y), M.copy(P), e.update();
    }
    function De(d) {
      it(d.clientX, d.clientY), d.deltaY < 0 ? ot(z(d.deltaY)) : d.deltaY > 0 && Ze(z(d.deltaY)), e.update();
    }
    function E(d) {
      let w = !1;
      switch (d.code) {
        case e.keys.UP:
          d.ctrlKey || d.metaKey || d.shiftKey ? be(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ue(0, e.keyPanSpeed), w = !0;
          break;
        case e.keys.BOTTOM:
          d.ctrlKey || d.metaKey || d.shiftKey ? be(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ue(0, -e.keyPanSpeed), w = !0;
          break;
        case e.keys.LEFT:
          d.ctrlKey || d.metaKey || d.shiftKey ? ke(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ue(e.keyPanSpeed, 0), w = !0;
          break;
        case e.keys.RIGHT:
          d.ctrlKey || d.metaKey || d.shiftKey ? ke(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : Ue(-e.keyPanSpeed, 0), w = !0;
          break;
      }
      w && (d.preventDefault(), e.update());
    }
    function T(d) {
      if (C.length === 1)
        f.set(d.pageX, d.pageY);
      else {
        const w = lt(d), V = 0.5 * (d.pageX + w.x), W = 0.5 * (d.pageY + w.y);
        f.set(V, W);
      }
    }
    function D(d) {
      if (C.length === 1)
        M.set(d.pageX, d.pageY);
      else {
        const w = lt(d), V = 0.5 * (d.pageX + w.x), W = 0.5 * (d.pageY + w.y);
        M.set(V, W);
      }
    }
    function k(d) {
      const w = lt(d), V = d.pageX - w.x, W = d.pageY - w.y, Oe = Math.sqrt(V * V + W * W);
      _.set(0, Oe);
    }
    function he(d) {
      e.enableZoom && k(d), e.enablePan && D(d);
    }
    function ge(d) {
      e.enableZoom && k(d), e.enableRotate && T(d);
    }
    function R(d) {
      if (C.length == 1)
        g.set(d.pageX, d.pageY);
      else {
        const V = lt(d), W = 0.5 * (d.pageX + V.x), Oe = 0.5 * (d.pageY + V.y);
        g.set(W, Oe);
      }
      v.subVectors(g, f).multiplyScalar(e.rotateSpeed);
      const w = e.domElement;
      ke(2 * Math.PI * v.x / w.clientHeight), be(2 * Math.PI * v.y / w.clientHeight), f.copy(g);
    }
    function U(d) {
      if (C.length === 1)
        P.set(d.pageX, d.pageY);
      else {
        const w = lt(d), V = 0.5 * (d.pageX + w.x), W = 0.5 * (d.pageY + w.y);
        P.set(V, W);
      }
      L.subVectors(P, M).multiplyScalar(e.panSpeed), Ue(L.x, L.y), M.copy(P);
    }
    function ve(d) {
      const w = lt(d), V = d.pageX - w.x, W = d.pageY - w.y, Oe = Math.sqrt(V * V + W * W);
      y.set(0, Oe), x.set(0, Math.pow(y.y / _.y, e.zoomSpeed)), Ze(x.y), _.copy(y);
      const Ne = (d.pageX + w.x) * 0.5, we = (d.pageY + w.y) * 0.5;
      it(Ne, we);
    }
    function Le(d) {
      e.enableZoom && ve(d), e.enablePan && U(d);
    }
    function Qe(d) {
      e.enableZoom && ve(d), e.enableRotate && R(d);
    }
    function Z(d) {
      e.enabled !== !1 && (C.length === 0 && (e.domElement.setPointerCapture(d.pointerId), e.domElement.addEventListener("pointermove", oe), e.domElement.addEventListener("pointerup", Te)), !hi(d) && (bt(d), d.pointerType === "touch" ? Fe(d) : re(d)));
    }
    function oe(d) {
      e.enabled !== !1 && (d.pointerType === "touch" ? st(d) : ue(d));
    }
    function Te(d) {
      switch (di(d), C.length) {
        case 0:
          e.domElement.releasePointerCapture(d.pointerId), e.domElement.removeEventListener("pointermove", oe), e.domElement.removeEventListener("pointerup", Te), e.dispatchEvent(tn), a = s.NONE;
          break;
        case 1:
          const w = C[0], V = te[w];
          Fe({ pointerId: w, pageX: V.x, pageY: V.y });
          break;
      }
    }
    function re(d) {
      let w;
      switch (d.button) {
        case 0:
          w = e.mouseButtons.LEFT;
          break;
        case 1:
          w = e.mouseButtons.MIDDLE;
          break;
        case 2:
          w = e.mouseButtons.RIGHT;
          break;
        default:
          w = -1;
      }
      switch (w) {
        case Tt.DOLLY:
          if (e.enableZoom === !1)
            return;
          ct(d), a = s.DOLLY;
          break;
        case Tt.ROTATE:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (e.enablePan === !1)
              return;
            _e(d), a = s.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            ut(d), a = s.ROTATE;
          }
          break;
        case Tt.PAN:
          if (d.ctrlKey || d.metaKey || d.shiftKey) {
            if (e.enableRotate === !1)
              return;
            ut(d), a = s.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            _e(d), a = s.PAN;
          }
          break;
        default:
          a = s.NONE;
      }
      a !== s.NONE && e.dispatchEvent(fi);
    }
    function ue(d) {
      switch (a) {
        case s.ROTATE:
          if (e.enableRotate === !1)
            return;
          Ge(d);
          break;
        case s.DOLLY:
          if (e.enableZoom === !1)
            return;
          Lt(d);
          break;
        case s.PAN:
          if (e.enablePan === !1)
            return;
          mt(d);
          break;
      }
    }
    function N(d) {
      e.enabled === !1 || e.enableZoom === !1 || a !== s.NONE || (d.preventDefault(), e.dispatchEvent(fi), De(ie(d)), e.dispatchEvent(tn));
    }
    function ie(d) {
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
      return d.ctrlKey && !K && (V.deltaY *= 10), V;
    }
    function ye(d) {
      d.key === "Control" && (K = !0, e.domElement.getRootNode().addEventListener("keyup", me, { passive: !0, capture: !0 }));
    }
    function me(d) {
      d.key === "Control" && (K = !1, e.domElement.getRootNode().removeEventListener("keyup", me, { passive: !0, capture: !0 }));
    }
    function Ae(d) {
      e.enabled === !1 || e.enablePan === !1 || E(d);
    }
    function Fe(d) {
      switch ($t(d), C.length) {
        case 1:
          switch (e.touches.ONE) {
            case xt.ROTATE:
              if (e.enableRotate === !1)
                return;
              T(d), a = s.TOUCH_ROTATE;
              break;
            case xt.PAN:
              if (e.enablePan === !1)
                return;
              D(d), a = s.TOUCH_PAN;
              break;
            default:
              a = s.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case xt.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              he(d), a = s.TOUCH_DOLLY_PAN;
              break;
            case xt.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              ge(d), a = s.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = s.NONE;
          }
          break;
        default:
          a = s.NONE;
      }
      a !== s.NONE && e.dispatchEvent(fi);
    }
    function st(d) {
      switch ($t(d), a) {
        case s.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          R(d), e.update();
          break;
        case s.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          U(d), e.update();
          break;
        case s.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Le(d), e.update();
          break;
        case s.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          Qe(d), e.update();
          break;
        default:
          a = s.NONE;
      }
    }
    function We(d) {
      e.enabled !== !1 && d.preventDefault();
    }
    function bt(d) {
      C.push(d.pointerId);
    }
    function di(d) {
      delete te[d.pointerId];
      for (let w = 0; w < C.length; w++)
        if (C[w] == d.pointerId) {
          C.splice(w, 1);
          return;
        }
    }
    function hi(d) {
      for (let w = 0; w < C.length; w++)
        if (C[w] == d.pointerId)
          return !0;
      return !1;
    }
    function $t(d) {
      let w = te[d.pointerId];
      w === void 0 && (w = new Re(), te[d.pointerId] = w), w.set(d.pageX, d.pageY);
    }
    function lt(d) {
      const w = d.pointerId === C[0] ? C[1] : C[0];
      return te[w];
    }
    e.domElement.addEventListener("contextmenu", We), e.domElement.addEventListener("pointerdown", Z), e.domElement.addEventListener("pointercancel", Te), e.domElement.addEventListener("wheel", N, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", ye, { passive: !0, capture: !0 }), this.update();
  }
}
function wt(i, t, n, e, s) {
  return e + (i - t) * (s - e) / (n - t);
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const le = {
  LEFT: 1,
  RIGHT: 2,
  MIDDLE: 4
}, p = Object.freeze({
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
function pt(i) {
  return i.isPerspectiveCamera;
}
function ht(i) {
  return i.isOrthographicCamera;
}
const Rt = Math.PI * 2, sn = Math.PI / 2, Bn = 1e-5, Nt = Math.PI / 180;
function Xe(i, t, n) {
  return Math.max(t, Math.min(n, i));
}
function se(i, t = Bn) {
  return Math.abs(i) < t;
}
function ee(i, t, n = Bn) {
  return se(i - t, n);
}
function an(i, t) {
  return Math.round(i / t) * t;
}
function jt(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function zt(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function Xt(i, t, n, e, s = 1 / 0, a) {
  e = Math.max(1e-4, e);
  const o = 2 / e, r = o * a, h = 1 / (1 + r + 0.48 * r * r + 0.235 * r * r * r);
  let c = i - t;
  const m = t, f = s * e;
  c = Xe(c, -f, f), t = i - c;
  const g = (n.value + o * c) * a;
  n.value = (n.value - o * g) * h;
  let v = t + (c + g) * h;
  return m - i > 0 == v > m && (v = m, n.value = (v - m) / a), v;
}
function rn(i, t, n, e, s = 1 / 0, a, o) {
  e = Math.max(1e-4, e);
  const r = 2 / e, h = r * a, c = 1 / (1 + h + 0.48 * h * h + 0.235 * h * h * h);
  let m = t.x, f = t.y, g = t.z, v = i.x - m, M = i.y - f, P = i.z - g;
  const L = m, _ = f, y = g, x = s * e, O = x * x, I = v * v + M * M + P * P;
  if (I > O) {
    const Se = Math.sqrt(I);
    v = v / Se * x, M = M / Se * x, P = P / Se * x;
  }
  m = i.x - v, f = i.y - M, g = i.z - P;
  const A = (n.x + r * v) * a, C = (n.y + r * M) * a, te = (n.z + r * P) * a;
  n.x = (n.x - r * A) * c, n.y = (n.y - r * C) * c, n.z = (n.z - r * te) * c, o.x = m + (v + A) * c, o.y = f + (M + C) * c, o.z = g + (P + te) * c;
  const K = L - i.x, Je = _ - i.y, z = y - i.z, ke = o.x - L, be = o.y - _, xe = o.z - y;
  return K * ke + Je * be + z * xe > 0 && (o.x = L, o.y = _, o.z = y, n.x = (o.x - L) / a, n.y = (o.y - _) / a, n.z = (o.z - y) / a), o;
}
function pi(i, t) {
  t.set(0, 0), i.forEach((n) => {
    t.x += n.clientX, t.y += n.clientY;
  }), t.x /= i.length, t.y /= i.length;
}
function _i(i, t) {
  return ht(i) ? (console.warn(`${t} is not supported in OrthographicCamera`), !0) : !1;
}
class Ea {
  constructor() {
    this._listeners = {};
  }
  /**
   * Adds the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(t, n) {
    const e = this._listeners;
    e[t] === void 0 && (e[t] = []), e[t].indexOf(n) === -1 && e[t].push(n);
  }
  /**
   * Presence of the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  hasEventListener(t, n) {
    const e = this._listeners;
    return e[t] !== void 0 && e[t].indexOf(n) !== -1;
  }
  /**
   * Removes the specified event listener
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(t, n) {
    const s = this._listeners[t];
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
  removeAllEventListeners(t) {
    if (!t) {
      this._listeners = {};
      return;
    }
    Array.isArray(this._listeners[t]) && (this._listeners[t].length = 0);
  }
  /**
   * Fire an event type.
   * @param event DispatcherEvent
   * @category Methods
   */
  dispatchEvent(t) {
    const e = this._listeners[t.type];
    if (e !== void 0) {
      t.target = this;
      const s = e.slice(0);
      for (let a = 0, o = s.length; a < o; a++)
        s[a].call(this, t);
    }
  }
}
var gi;
const ba = "2.9.0", qt = 1 / 8, Oa = /Mac/.test((gi = globalThis?.navigator) === null || gi === void 0 ? void 0 : gi.platform);
let F, on, Jt, vi, Ie, Y, X, Dt, Bt, et, tt, _t, cn, ln, He, Ht, At, dn, yi, hn, Ei, bi, Qt;
class rt extends Ea {
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
  static install(t) {
    F = t.THREE, on = Object.freeze(new F.Vector3(0, 0, 0)), Jt = Object.freeze(new F.Vector3(0, 1, 0)), vi = Object.freeze(new F.Vector3(0, 0, 1)), Ie = new F.Vector2(), Y = new F.Vector3(), X = new F.Vector3(), Dt = new F.Vector3(), Bt = new F.Vector3(), et = new F.Vector3(), tt = new F.Vector3(), _t = new F.Vector3(), cn = new F.Vector3(), ln = new F.Vector3(), He = new F.Spherical(), Ht = new F.Spherical(), At = new F.Box3(), dn = new F.Box3(), yi = new F.Sphere(), hn = new F.Quaternion(), Ei = new F.Quaternion(), bi = new F.Matrix4(), Qt = new F.Raycaster();
  }
  /**
   * list all ACTIONs
   * @category Statics
   */
  static get ACTION() {
    return p;
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
  constructor(t, n) {
    super(), this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.minDistance = Number.EPSILON, this.maxDistance = 1 / 0, this.infinityDolly = !1, this.minZoom = 0.01, this.maxZoom = 1 / 0, this.smoothTime = 0.25, this.draggingSmoothTime = 0.125, this.maxSpeed = 1 / 0, this.azimuthRotateSpeed = 1, this.polarRotateSpeed = 1, this.dollySpeed = 1, this.dollyDragInverted = !1, this.truckSpeed = 2, this.dollyToCursor = !1, this.dragToOffset = !1, this.verticalDragToForward = !1, this.boundaryFriction = 0, this.restThreshold = 0.01, this.colliderMeshes = [], this.cancel = () => {
    }, this._enabled = !0, this._state = p.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = Mt.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new F.Vector3(), this._focalOffsetVelocity = new F.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (_, y, x) => {
      let O, I;
      if (pt(this._camera)) {
        const A = Y.copy(this._camera.position).sub(this._target), C = this._camera.getEffectiveFOV() * Nt, te = A.length() * Math.tan(C * 0.5);
        O = this.truckSpeed * _ * te / this._elementRect.height, I = this.truckSpeed * y * te / this._elementRect.height;
      } else if (ht(this._camera)) {
        const A = this._camera;
        O = _ * (A.right - A.left) / A.zoom / this._elementRect.width, I = y * (A.top - A.bottom) / A.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (x ? this.setFocalOffset(this._focalOffsetEnd.x + O, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(O, 0, !0), this.forward(-I, !0)) : x ? this.setFocalOffset(this._focalOffsetEnd.x + O, this._focalOffsetEnd.y + I, this._focalOffsetEnd.z, !0) : this.truck(O, I, !0);
    }, this._rotateInternal = (_, y) => {
      const x = Rt * this.azimuthRotateSpeed * _ / this._elementRect.height, O = Rt * this.polarRotateSpeed * y / this._elementRect.height;
      this.rotate(x, O, !0);
    }, this._dollyInternal = (_, y, x) => {
      const O = Math.pow(0.95, -_ * this.dollySpeed), I = this._sphericalEnd.radius, A = this._sphericalEnd.radius * O, C = Xe(A, this.minDistance, this.maxDistance), te = C - A;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(A, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(te, !0), this._dollyToNoClamp(C, !0)) : this._dollyToNoClamp(C, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? A : C) - I, this._dollyControlCoord.set(y, x)), this._lastDollyDirection = Math.sign(-_);
    }, this._zoomInternal = (_, y, x) => {
      const O = Math.pow(0.95, _ * this.dollySpeed), I = this._zoom, A = this._zoom * O;
      this.zoomTo(A, !0), this.dollyToCursor && (this._changedZoom += A - I, this._dollyControlCoord.set(y, x));
    }, typeof F > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = t, this._yAxisUpSpace = new F.Quaternion().setFromUnitVectors(this._camera.up, Jt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = p.NONE, this._target = new F.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new F.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new F.Spherical().setFromVector3(Y.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new F.Vector3(),
      new F.Vector3(),
      new F.Vector3(),
      new F.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new F.Box3(new F.Vector3(-1 / 0, -1 / 0, -1 / 0), new F.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new F.Vector2(), this.mouseButtons = {
      left: p.ROTATE,
      middle: p.DOLLY,
      right: p.TRUCK,
      wheel: pt(this._camera) ? p.DOLLY : ht(this._camera) ? p.ZOOM : p.NONE
    }, this.touches = {
      one: p.TOUCH_ROTATE,
      two: pt(this._camera) ? p.TOUCH_DOLLY_TRUCK : ht(this._camera) ? p.TOUCH_ZOOM_TRUCK : p.NONE,
      three: p.TOUCH_TRUCK
    };
    const e = new F.Vector2(), s = new F.Vector2(), a = new F.Vector2(), o = (_) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), I = _.clientX / O.width, A = _.clientY / O.height;
        if (I < this._interactiveArea.left || I > this._interactiveArea.right || A < this._interactiveArea.top || A > this._interactiveArea.bottom)
          return;
      }
      const y = _.pointerType !== "mouse" ? null : (_.buttons & le.LEFT) === le.LEFT ? le.LEFT : (_.buttons & le.MIDDLE) === le.MIDDLE ? le.MIDDLE : (_.buttons & le.RIGHT) === le.RIGHT ? le.RIGHT : null;
      if (y !== null) {
        const O = this._findPointerByMouseButton(y);
        O && this._disposePointer(O);
      }
      if ((_.buttons & le.LEFT) === le.LEFT && this._lockedPointer)
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (_.buttons & le.LEFT) === le.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (_.buttons & le.MIDDLE) === le.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (_.buttons & le.RIGHT) === le.RIGHT && (this._state = this._state | this.mouseButtons.right);
        v();
      }
    }, h = (_) => {
      const y = this._findPointerById(_.pointerId);
      if (!(y && y === this._lockedPointer)) {
        if (y && this._disposePointer(y), _.pointerType === "touch")
          switch (this._activePointers.length) {
            case 0:
              this._state = p.NONE;
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
          this._state = p.NONE;
        M();
      }
    };
    let c = -1;
    const m = (_) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === p.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const A = this._domElement.getBoundingClientRect(), C = _.clientX / A.width, te = _.clientY / A.height;
        if (C < this._interactiveArea.left || C > this._interactiveArea.right || te < this._interactiveArea.top || te > this._interactiveArea.bottom)
          return;
      }
      if (_.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === p.ROTATE || this.mouseButtons.wheel === p.TRUCK) {
        const A = performance.now();
        c - A < 1e3 && this._getClientRect(this._elementRect), c = A;
      }
      const y = Oa ? -1 : -3, x = _.deltaMode === 1 ? _.deltaY / y : _.deltaY / (y * 10), O = this.dollyToCursor ? (_.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, I = this.dollyToCursor ? (_.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case p.ROTATE: {
          this._rotateInternal(_.deltaX, _.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case p.TRUCK: {
          this._truckInternal(_.deltaX, _.deltaY, !1), this._isUserControllingTruck = !0;
          break;
        }
        case p.OFFSET: {
          this._truckInternal(_.deltaX, _.deltaY, !0), this._isUserControllingOffset = !0;
          break;
        }
        case p.DOLLY: {
          this._dollyInternal(-x, O, I), this._isUserControllingDolly = !0;
          break;
        }
        case p.ZOOM: {
          this._zoomInternal(-x, O, I), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, f = (_) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === rt.ACTION.NONE) {
          const y = _ instanceof PointerEvent ? _.pointerId : 0, x = this._findPointerById(y);
          x && this._disposePointer(x), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h);
          return;
        }
        _.preventDefault();
      }
    }, g = (_) => {
      if (!this._enabled)
        return;
      if (pi(this._activePointers, Ie), this._getClientRect(this._elementRect), e.copy(Ie), s.copy(Ie), this._activePointers.length >= 2) {
        const x = Ie.x - this._activePointers[1].clientX, O = Ie.y - this._activePointers[1].clientY, I = Math.sqrt(x * x + O * O);
        a.set(0, I);
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
        !this._lockedPointer && (_.buttons & le.LEFT) === le.LEFT && (this._state = this._state | this.mouseButtons.left), (_.buttons & le.MIDDLE) === le.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (_.buttons & le.RIGHT) === le.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & p.DOLLY) === p.DOLLY || (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & p.ZOOM) === p.ZOOM || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, v = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, pi(this._activePointers, Ie);
      const y = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, x = y ? -y.deltaX : s.x - Ie.x, O = y ? -y.deltaY : s.y - Ie.y;
      if (s.copy(Ie), ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(x, O), this._isUserControllingRotate = !0), (this._state & p.DOLLY) === p.DOLLY || (this._state & p.ZOOM) === p.ZOOM) {
        const I = this.dollyToCursor ? (e.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, A = this.dollyToCursor ? (e.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, C = this.dollyDragInverted ? -1 : 1;
        (this._state & p.DOLLY) === p.DOLLY ? (this._dollyInternal(C * O * qt, I, A), this._isUserControllingDolly = !0) : (this._zoomInternal(C * O * qt, I, A), this._isUserControllingZoom = !0);
      }
      if ((this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) {
        const I = Ie.x - this._activePointers[1].clientX, A = Ie.y - this._activePointers[1].clientY, C = Math.sqrt(I * I + A * A), te = a.y - C;
        a.set(0, C);
        const K = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, Je = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(te * qt, K, Je), this._isUserControllingDolly = !0) : (this._zoomInternal(te * qt, K, Je), this._isUserControllingZoom = !0);
      }
      ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK) && (this._truckInternal(x, O, !1), this._isUserControllingTruck = !0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._truckInternal(x, O, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, M = () => {
      pi(this._activePointers, Ie), s.copy(Ie), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", P), this._domElement.ownerDocument.addEventListener("pointerlockerror", L), this._domElement.ownerDocument.addEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), g());
    }, this.unlockPointer = () => {
      var _, y, x;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (_ = this._domElement) === null || _ === void 0 || _.ownerDocument.exitPointerLock(), (y = this._domElement) === null || y === void 0 || y.ownerDocument.removeEventListener("pointerlockchange", P), (x = this._domElement) === null || x === void 0 || x.ownerDocument.removeEventListener("pointerlockerror", L), this.cancel();
    };
    const P = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, L = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (_) => {
      this._domElement = _, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", o), this._domElement.addEventListener("pointercancel", h), this._domElement.addEventListener("wheel", m, { passive: !1 }), this._domElement.addEventListener("contextmenu", f);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", o), this._domElement.removeEventListener("pointercancel", h), this._domElement.removeEventListener("wheel", m, { passive: !1 }), this._domElement.removeEventListener("contextmenu", f), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.removeEventListener("pointerlockchange", P), this._domElement.ownerDocument.removeEventListener("pointerlockerror", L));
    }, this.cancel = () => {
      this._state !== p.NONE && (this._state = p.NONE, this._activePointers.length = 0, M());
    }, n && this.connect(n), this.update(0);
  }
  /**
   * The camera to be controlled
   * @category Properties
   */
  get camera() {
    return this._camera;
  }
  set camera(t) {
    this._camera = t, this.updateCameraUp(), this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0;
  }
  /**
   * Whether or not the controls are enabled.
   * `false` to disable user dragging/touch-move, but all methods works.
   * @category Properties
   */
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    this._enabled = t, this._domElement && (t ? (this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none") : (this.cancel(), this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = ""));
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
  set distance(t) {
    this._spherical.radius === t && this._sphericalEnd.radius === t || (this._spherical.radius = t, this._sphericalEnd.radius = t, this._needsUpdate = !0);
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
  set azimuthAngle(t) {
    this._spherical.theta === t && this._sphericalEnd.theta === t || (this._spherical.theta = t, this._sphericalEnd.theta = t, this._needsUpdate = !0);
  }
  // vertical angle
  /**
   * get/set the polar angle (vertical) in radians.
   * @category Properties
   */
  get polarAngle() {
    return this._spherical.phi;
  }
  set polarAngle(t) {
    this._spherical.phi === t && this._sphericalEnd.phi === t || (this._spherical.phi = t, this._sphericalEnd.phi = t, this._needsUpdate = !0);
  }
  /**
   * Whether camera position should be enclosed in the boundary or not.
   * @category Properties
   */
  get boundaryEnclosesCamera() {
    return this._boundaryEnclosesCamera;
  }
  set boundaryEnclosesCamera(t) {
    this._boundaryEnclosesCamera = t, this._needsUpdate = !0;
  }
  /**
   * Set drag-start, touches and wheel enable area in the domElement.
   * each values are between `0` and `1` inclusive, where `0` is left/top and `1` is right/bottom of the screen.
   * e.g. `{ x: 0, y: 0, width: 1, height: 1 }` for entire area.
   * @category Properties
   */
  set interactiveArea(t) {
    this._interactiveArea.width = Xe(t.width, 0, 1), this._interactiveArea.height = Xe(t.height, 0, 1), this._interactiveArea.x = Xe(t.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = Xe(t.y, 0, 1 - this._interactiveArea.height);
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
  addEventListener(t, n) {
    super.addEventListener(t, n);
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
  removeEventListener(t, n) {
    super.removeEventListener(t, n);
  }
  /**
   * Rotate azimuthal angle(horizontal) and polar angle(vertical).
   * Every value is added to the current value.
   * @param azimuthAngle Azimuth rotate angle. In radian.
   * @param polarAngle Polar rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotate(t, n, e = !1) {
    return this.rotateTo(this._sphericalEnd.theta + t, this._sphericalEnd.phi + n, e);
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
  rotateAzimuthTo(t, n = !1) {
    return this.rotateTo(t, this._sphericalEnd.phi, n);
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
  rotatePolarTo(t, n = !1) {
    return this.rotateTo(this._sphericalEnd.theta, t, n);
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
  rotateTo(t, n, e = !1) {
    this._isUserControllingRotate = !1;
    const s = Xe(t, this.minAzimuthAngle, this.maxAzimuthAngle), a = Xe(n, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = s, this._sphericalEnd.phi = a, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, e || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const o = !e || ee(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && ee(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
    return this._createOnRestPromise(o);
  }
  /**
   * Dolly in/out camera position.
   * @param distance Distance of dollyIn. Negative number for dollyOut.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dolly(t, n = !1) {
    return this.dollyTo(this._sphericalEnd.radius - t, n);
  }
  /**
   * Dolly in/out camera position to given distance.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyTo(t, n = !1) {
    return this._isUserControllingDolly = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0, this._dollyToNoClamp(Xe(t, this.minDistance, this.maxDistance), n);
  }
  _dollyToNoClamp(t, n = !1) {
    const e = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const o = this._collisionTest(), r = ee(o, this._spherical.radius);
      if (!(e > t) && r)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(t, o);
    } else
      this._sphericalEnd.radius = t;
    this._needsUpdate = !0, n || (this._spherical.radius = this._sphericalEnd.radius);
    const a = !n || ee(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(a);
  }
  /**
   * Dolly in, but does not change the distance between the target and the camera, and moves the target position instead.
   * Specify a negative value for dolly out.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyInFixed(t, n = !1) {
    this._targetEnd.add(this._getCameraDirection(Bt).multiplyScalar(t)), n || this._target.copy(this._targetEnd);
    const e = !n || ee(this._target.x, this._targetEnd.x, this.restThreshold) && ee(this._target.y, this._targetEnd.y, this.restThreshold) && ee(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(e);
  }
  /**
   * Zoom in/out camera. The value is added to camera zoom.
   * Limits set with `.minZoom` and `.maxZoom`
   * @param zoomStep zoom scale
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  zoom(t, n = !1) {
    return this.zoomTo(this._zoomEnd + t, n);
  }
  /**
   * Zoom in/out camera to given scale. The value overwrites camera zoom.
   * Limits set with .minZoom and .maxZoom
   * @param zoom
   * @param enableTransition
   * @category Methods
   */
  zoomTo(t, n = !1) {
    this._isUserControllingZoom = !1, this._zoomEnd = Xe(t, this.minZoom, this.maxZoom), this._needsUpdate = !0, n || (this._zoom = this._zoomEnd);
    const e = !n || ee(this._zoom, this._zoomEnd, this.restThreshold);
    return this._changedZoom = 0, this._createOnRestPromise(e);
  }
  /**
   * @deprecated `pan()` has been renamed to `truck()`
   * @category Methods
   */
  pan(t, n, e = !1) {
    return console.warn("`pan` has been renamed to `truck`"), this.truck(t, n, e);
  }
  /**
   * Truck and pedestal camera using current azimuthal angle
   * @param x Horizontal translate amount
   * @param y Vertical translate amount
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  truck(t, n, e = !1) {
    this._camera.updateMatrix(), et.setFromMatrixColumn(this._camera.matrix, 0), tt.setFromMatrixColumn(this._camera.matrix, 1), et.multiplyScalar(t), tt.multiplyScalar(-n);
    const s = Y.copy(et).add(tt), a = X.copy(this._targetEnd).add(s);
    return this.moveTo(a.x, a.y, a.z, e);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(t, n = !1) {
    Y.setFromMatrixColumn(this._camera.matrix, 0), Y.crossVectors(this._camera.up, Y), Y.multiplyScalar(t);
    const e = X.copy(this._targetEnd).add(Y);
    return this.moveTo(e.x, e.y, e.z, n);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(t, n = !1) {
    return Y.copy(this._camera.up).multiplyScalar(t), this.moveTo(this._targetEnd.x + Y.x, this._targetEnd.y + Y.y, this._targetEnd.z + Y.z, n);
  }
  /**
   * Move target position to given point.
   * @param x x coord to move center position
   * @param y y coord to move center position
   * @param z z coord to move center position
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  moveTo(t, n, e, s = !1) {
    this._isUserControllingTruck = !1;
    const a = Y.set(t, n, e).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, a, this.boundaryFriction), this._needsUpdate = !0, s || this._target.copy(this._targetEnd);
    const o = !s || ee(this._target.x, this._targetEnd.x, this.restThreshold) && ee(this._target.y, this._targetEnd.y, this.restThreshold) && ee(this._target.z, this._targetEnd.z, this.restThreshold);
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
  lookInDirectionOf(t, n, e, s = !1) {
    const r = Y.set(t, n, e).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
  fitToBox(t, n, { cover: e = !1, paddingLeft: s = 0, paddingRight: a = 0, paddingBottom: o = 0, paddingTop: r = 0 } = {}) {
    const h = [], c = t.isBox3 ? At.copy(t) : At.setFromObject(t);
    c.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const m = an(this._sphericalEnd.theta, sn), f = an(this._sphericalEnd.phi, sn);
    h.push(this.rotateTo(m, f, n));
    const g = Y.setFromSpherical(this._sphericalEnd).normalize(), v = hn.setFromUnitVectors(g, vi), M = ee(Math.abs(g.y), 1);
    M && v.multiply(Ei.setFromAxisAngle(Jt, m)), v.multiply(this._yAxisUpSpaceInverse);
    const P = dn.makeEmpty();
    X.copy(c.min).applyQuaternion(v), P.expandByPoint(X), X.copy(c.min).setX(c.max.x).applyQuaternion(v), P.expandByPoint(X), X.copy(c.min).setY(c.max.y).applyQuaternion(v), P.expandByPoint(X), X.copy(c.max).setZ(c.min.z).applyQuaternion(v), P.expandByPoint(X), X.copy(c.min).setZ(c.max.z).applyQuaternion(v), P.expandByPoint(X), X.copy(c.max).setY(c.min.y).applyQuaternion(v), P.expandByPoint(X), X.copy(c.max).setX(c.min.x).applyQuaternion(v), P.expandByPoint(X), X.copy(c.max).applyQuaternion(v), P.expandByPoint(X), P.min.x -= s, P.min.y -= o, P.max.x += a, P.max.y += r, v.setFromUnitVectors(vi, g), M && v.premultiply(Ei.invert()), v.premultiply(this._yAxisUpSpace);
    const L = P.getSize(Y), _ = P.getCenter(X).applyQuaternion(v);
    if (pt(this._camera)) {
      const y = this.getDistanceToFitBox(L.x, L.y, L.z, e);
      h.push(this.moveTo(_.x, _.y, _.z, n)), h.push(this.dollyTo(y, n)), h.push(this.setFocalOffset(0, 0, 0, n));
    } else if (ht(this._camera)) {
      const y = this._camera, x = y.right - y.left, O = y.top - y.bottom, I = e ? Math.max(x / L.x, O / L.y) : Math.min(x / L.x, O / L.y);
      h.push(this.moveTo(_.x, _.y, _.z, n)), h.push(this.zoomTo(I, n)), h.push(this.setFocalOffset(0, 0, 0, n));
    }
    return Promise.all(h);
  }
  /**
   * Fit the viewport to the sphere or the bounding sphere of the object.
   * @param sphereOrMesh
   * @param enableTransition
   * @category Methods
   */
  fitToSphere(t, n) {
    const e = [], a = "isObject3D" in t ? rt.createBoundingSphere(t, yi) : yi.copy(t);
    if (e.push(this.moveTo(a.center.x, a.center.y, a.center.z, n)), pt(this._camera)) {
      const o = this.getDistanceToFitSphere(a.radius);
      e.push(this.dollyTo(o, n));
    } else if (ht(this._camera)) {
      const o = this._camera.right - this._camera.left, r = this._camera.top - this._camera.bottom, h = 2 * a.radius, c = Math.min(o / h, r / h);
      e.push(this.zoomTo(c, n));
    }
    return e.push(this.setFocalOffset(0, 0, 0, n)), Promise.all(e);
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
  setLookAt(t, n, e, s, a, o, r = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0;
    const h = X.set(s, a, o), c = Y.set(t, n, e);
    this._targetEnd.copy(h), this._sphericalEnd.setFromVector3(c.sub(h).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, r || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const m = !r || ee(this._target.x, this._targetEnd.x, this.restThreshold) && ee(this._target.y, this._targetEnd.y, this.restThreshold) && ee(this._target.z, this._targetEnd.z, this.restThreshold) && ee(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && ee(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && ee(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(m);
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
  lerpLookAt(t, n, e, s, a, o, r, h, c, m, f, g, v, M = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0;
    const P = Y.set(s, a, o), L = X.set(t, n, e);
    He.setFromVector3(L.sub(P).applyQuaternion(this._yAxisUpSpace));
    const _ = Dt.set(m, f, g), y = X.set(r, h, c);
    Ht.setFromVector3(y.sub(_).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(P.lerp(_, v));
    const x = Ht.theta - He.theta, O = Ht.phi - He.phi, I = Ht.radius - He.radius;
    this._sphericalEnd.set(He.radius + I * v, He.phi + O * v, He.theta + x * v), this.normalizeRotations(), this._needsUpdate = !0, M || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const A = !M || ee(this._target.x, this._targetEnd.x, this.restThreshold) && ee(this._target.y, this._targetEnd.y, this.restThreshold) && ee(this._target.z, this._targetEnd.z, this.restThreshold) && ee(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && ee(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && ee(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  setPosition(t, n, e, s = !1) {
    return this.setLookAt(t, n, e, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, s);
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
  setTarget(t, n, e, s = !1) {
    const a = this.getPosition(Y), o = this.setLookAt(a.x, a.y, a.z, t, n, e, s);
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
  setFocalOffset(t, n, e, s = !1) {
    this._isUserControllingOffset = !1, this._focalOffsetEnd.set(t, n, e), this._needsUpdate = !0, s || this._focalOffset.copy(this._focalOffsetEnd);
    const a = !s || ee(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && ee(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && ee(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
  setOrbitPoint(t, n, e) {
    this._camera.updateMatrixWorld(), et.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), tt.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), _t.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const s = Y.set(t, n, e), a = s.distanceTo(this._camera.position), o = s.sub(this._camera.position);
    et.multiplyScalar(o.x), tt.multiplyScalar(o.y), _t.multiplyScalar(o.z), Y.copy(et).add(tt).add(_t), Y.z = Y.z + a, this.dollyTo(a, !1), this.setFocalOffset(-Y.x, Y.y, -Y.z, !1), this.moveTo(t, n, e, !1);
  }
  /**
   * Set the boundary box that encloses the target of the camera. box3 is in THREE.Box3
   * @param box3
   * @category Methods
   */
  setBoundary(t) {
    if (!t) {
      this._boundary.min.set(-1 / 0, -1 / 0, -1 / 0), this._boundary.max.set(1 / 0, 1 / 0, 1 / 0), this._needsUpdate = !0;
      return;
    }
    this._boundary.copy(t), this._boundary.clampPoint(this._targetEnd, this._targetEnd), this._needsUpdate = !0;
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
  setViewport(t, n, e, s) {
    if (t === null) {
      this._viewport = null;
      return;
    }
    this._viewport = this._viewport || new F.Vector4(), typeof t == "number" ? this._viewport.set(t, n, e, s) : this._viewport.copy(t);
  }
  /**
   * Calculate the distance to fit the box.
   * @param width box width
   * @param height box height
   * @param depth box depth
   * @returns distance
   * @category Methods
   */
  getDistanceToFitBox(t, n, e, s = !1) {
    if (_i(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const a = t / n, o = this._camera.getEffectiveFOV() * Nt, r = this._camera.aspect;
    return ((s ? a > r : a < r) ? n : t / r) * 0.5 / Math.tan(o * 0.5) + e * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(t) {
    if (_i(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const n = this._camera.getEffectiveFOV() * Nt, e = Math.atan(Math.tan(n * 0.5) * this._camera.aspect) * 2, s = 1 < this._camera.aspect ? n : e;
    return t / Math.sin(s * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(t, n = !0) {
    return (t && t.isVector3 ? t : new F.Vector3()).copy(n ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(t, n = !0) {
    return (t && t.isVector3 ? t : new F.Vector3()).setFromSpherical(n ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(n ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(t, n = !0) {
    return (t || new F.Spherical()).copy(n ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(t, n = !0) {
    return (t && t.isVector3 ? t : new F.Vector3()).copy(n ? this._focalOffsetEnd : this._focalOffset);
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
  reset(t = !1) {
    if (!ee(this._camera.up.x, this._cameraUp0.x) || !ee(this._camera.up.y, this._cameraUp0.y) || !ee(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const e = this.getPosition(Y);
      this.updateCameraUp(), this.setPosition(e.x, e.y, e.z);
    }
    const n = [
      this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, t),
      this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, t),
      this.zoomTo(this._zoom0, t)
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
    const t = Y.subVectors(this._target, this._camera.position).normalize(), n = X.crossVectors(t, this._camera.up);
    this._camera.up.crossVectors(n, t).normalize(), this._camera.updateMatrixWorld();
    const e = this.getPosition(Y);
    this.updateCameraUp(), this.setPosition(e.x, e.y, e.z);
  }
  /**
   * Update camera position and directions.
   * This should be called in your tick loop every time, and returns true if re-rendering is needed.
   * @param delta
   * @returns updated
   * @category Methods
   */
  update(t) {
    const n = this._sphericalEnd.theta - this._spherical.theta, e = this._sphericalEnd.phi - this._spherical.phi, s = this._sphericalEnd.radius - this._spherical.radius, a = cn.subVectors(this._targetEnd, this._target), o = ln.subVectors(this._focalOffsetEnd, this._focalOffset), r = this._zoomEnd - this._zoom;
    if (se(n))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const f = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Xt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, f, 1 / 0, t), this._needsUpdate = !0;
    }
    if (se(e))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const f = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Xt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, f, 1 / 0, t), this._needsUpdate = !0;
    }
    if (se(s))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const f = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Xt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, f, this.maxSpeed, t), this._needsUpdate = !0;
    }
    if (se(a.x) && se(a.y) && se(a.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const f = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      rn(this._target, this._targetEnd, this._targetVelocity, f, this.maxSpeed, t, this._target), this._needsUpdate = !0;
    }
    if (se(o.x) && se(o.y) && se(o.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const f = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      rn(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, f, this.maxSpeed, t, this._focalOffset), this._needsUpdate = !0;
    }
    if (se(r))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const f = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Xt(this._zoom, this._zoomEnd, this._zoomVelocity, f, 1 / 0, t);
    }
    if (this.dollyToCursor) {
      if (pt(this._camera) && this._changedDolly !== 0) {
        const f = this._spherical.radius - this._lastDistance, g = this._camera, v = this._getCameraDirection(Bt), M = Y.copy(v).cross(g.up).normalize();
        M.lengthSq() === 0 && (M.x = 1);
        const P = X.crossVectors(M, v), L = this._sphericalEnd.radius * Math.tan(g.getEffectiveFOV() * Nt * 0.5), y = (this._sphericalEnd.radius - f - this._sphericalEnd.radius) / this._sphericalEnd.radius, x = Dt.copy(this._targetEnd).add(M.multiplyScalar(this._dollyControlCoord.x * L * g.aspect)).add(P.multiplyScalar(this._dollyControlCoord.y * L)), O = Y.copy(this._targetEnd).lerp(x, y), I = this._lastDollyDirection === Mt.IN && this._spherical.radius <= this.minDistance, A = this._lastDollyDirection === Mt.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (I || A)) {
          this._sphericalEnd.radius -= f, this._spherical.radius -= f;
          const te = X.copy(v).multiplyScalar(-f);
          O.add(te);
        }
        this._boundary.clampPoint(O, O);
        const C = X.subVectors(O, this._targetEnd);
        this._targetEnd.copy(O), this._target.add(C), this._changedDolly -= f, se(this._changedDolly) && (this._changedDolly = 0);
      } else if (ht(this._camera) && this._changedZoom !== 0) {
        const f = this._zoom - this._lastZoom, g = this._camera, v = Y.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (g.near + g.far) / (g.near - g.far)).unproject(g), M = X.set(0, 0, -1).applyQuaternion(g.quaternion), P = Dt.copy(v).add(M.multiplyScalar(-v.dot(g.up))), _ = -(this._zoom - f - this._zoom) / this._zoom, y = this._getCameraDirection(Bt), x = this._targetEnd.dot(y), O = Y.copy(this._targetEnd).lerp(P, _), I = O.dot(y), A = y.multiplyScalar(I - x);
        O.sub(A), this._boundary.clampPoint(O, O);
        const C = X.subVectors(O, this._targetEnd);
        this._targetEnd.copy(O), this._target.add(C), this._changedZoom -= f, se(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const h = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, h), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!se(this._focalOffset.x) || !se(this._focalOffset.y) || !se(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), et.setFromMatrixColumn(this._camera.matrix, 0), tt.setFromMatrixColumn(this._camera.matrix, 1), _t.setFromMatrixColumn(this._camera.matrix, 2), et.multiplyScalar(this._focalOffset.x), tt.multiplyScalar(-this._focalOffset.y), _t.multiplyScalar(this._focalOffset.z), Y.copy(et).add(tt).add(_t), this._camera.position.add(Y)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), Y.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const m = this._needsUpdate;
    return m && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : m ? (this.dispatchEvent({ type: "update" }), se(n, this.restThreshold) && se(e, this.restThreshold) && se(s, this.restThreshold) && se(a.x, this.restThreshold) && se(a.y, this.restThreshold) && se(a.z, this.restThreshold) && se(o.x, this.restThreshold) && se(o.y, this.restThreshold) && se(o.z, this.restThreshold) && se(r, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !m && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = m, this._needsUpdate = !1, m;
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
  fromJSON(t, n = !1) {
    const e = JSON.parse(t);
    this.enabled = e.enabled, this.minDistance = e.minDistance, this.maxDistance = zt(e.maxDistance), this.minZoom = e.minZoom, this.maxZoom = zt(e.maxZoom), this.minPolarAngle = e.minPolarAngle, this.maxPolarAngle = zt(e.maxPolarAngle), this.minAzimuthAngle = zt(e.minAzimuthAngle), this.maxAzimuthAngle = zt(e.maxAzimuthAngle), this.smoothTime = e.smoothTime, this.draggingSmoothTime = e.draggingSmoothTime, this.dollySpeed = e.dollySpeed, this.truckSpeed = e.truckSpeed, this.dollyToCursor = e.dollyToCursor, this.verticalDragToForward = e.verticalDragToForward, this._target0.fromArray(e.target0), this._position0.fromArray(e.position0), this._zoom0 = e.zoom0, this._focalOffset0.fromArray(e.focalOffset0), this.moveTo(e.target[0], e.target[1], e.target[2], n), He.setFromVector3(Y.fromArray(e.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(He.theta, He.phi, n), this.dollyTo(He.radius, n), this.zoomTo(e.zoom, n), this.setFocalOffset(e.focalOffset[0], e.focalOffset[1], e.focalOffset[2], n), this._needsUpdate = !0;
  }
  /**
   * Attach all internal event handlers to enable drag control.
   * @category Methods
   */
  connect(t) {
    if (this._domElement) {
      console.warn("camera-controls is already connected.");
      return;
    }
    t.setAttribute("data-camera-controls-version", ba), this._addAllEventListeners(t), this._getClientRect(this._elementRect);
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
  _getTargetDirection(t) {
    return t.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse);
  }
  // it's okay to expose public though
  _getCameraDirection(t) {
    return this._getTargetDirection(t).negate();
  }
  _findPointerById(t) {
    return this._activePointers.find((n) => n.pointerId === t);
  }
  _findPointerByMouseButton(t) {
    return this._activePointers.find((n) => n.mouseButton === t);
  }
  _disposePointer(t) {
    this._activePointers.splice(this._activePointers.indexOf(t), 1);
  }
  _encloseToBoundary(t, n, e) {
    const s = n.lengthSq();
    if (s === 0)
      return t;
    const a = X.copy(n).add(t), r = this._boundary.clampPoint(a, Dt).sub(a), h = r.lengthSq();
    if (h === 0)
      return t.add(n);
    if (h === s)
      return t;
    if (e === 0)
      return t.add(n).add(r);
    {
      const c = 1 + e * h / n.dot(r);
      return t.add(X.copy(n).multiplyScalar(c)).add(r.multiplyScalar(1 - e));
    }
  }
  _updateNearPlaneCorners() {
    if (pt(this._camera)) {
      const t = this._camera, n = t.near, e = t.getEffectiveFOV() * Nt, s = Math.tan(e * 0.5) * n, a = s * t.aspect;
      this._nearPlaneCorners[0].set(-a, -s, 0), this._nearPlaneCorners[1].set(a, -s, 0), this._nearPlaneCorners[2].set(a, s, 0), this._nearPlaneCorners[3].set(-a, s, 0);
    } else if (ht(this._camera)) {
      const t = this._camera, n = 1 / t.zoom, e = t.left * n, s = t.right * n, a = t.top * n, o = t.bottom * n;
      this._nearPlaneCorners[0].set(e, a, 0), this._nearPlaneCorners[1].set(s, a, 0), this._nearPlaneCorners[2].set(s, o, 0), this._nearPlaneCorners[3].set(e, o, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let t = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || _i(this._camera, "_collisionTest"))
      return t;
    const e = this._getTargetDirection(Bt);
    bi.lookAt(on, e, this._camera.up);
    for (let s = 0; s < 4; s++) {
      const a = X.copy(this._nearPlaneCorners[s]);
      a.applyMatrix4(bi);
      const o = Dt.addVectors(this._target, a);
      Qt.set(o, e), Qt.far = this._spherical.radius + 1;
      const r = Qt.intersectObjects(this.colliderMeshes);
      r.length !== 0 && r[0].distance < t && (t = r[0].distance);
    }
    return t;
  }
  /**
   * Get its client rect and package into given `DOMRect` .
   */
  _getClientRect(t) {
    if (!this._domElement)
      return;
    const n = this._domElement.getBoundingClientRect();
    return t.x = n.left, t.y = n.top, this._viewport ? (t.x += this._viewport.x, t.y += n.height - this._viewport.w - this._viewport.y, t.width = this._viewport.z, t.height = this._viewport.w) : (t.width = n.width, t.height = n.height), t;
  }
  _createOnRestPromise(t) {
    return t ? Promise.resolve() : (this._hasRested = !1, this.dispatchEvent({ type: "transitionstart" }), new Promise((n) => {
      const e = () => {
        this.removeEventListener("rest", e), n();
      };
      this.addEventListener("rest", e);
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _addAllEventListeners(t) {
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
  set dampingFactor(t) {
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
  set draggingDampingFactor(t) {
    console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.");
  }
  static createBoundingSphere(t, n = new F.Sphere()) {
    const e = n, s = e.center;
    At.makeEmpty(), t.traverseVisible((o) => {
      o.isMesh && At.expandByObject(o);
    }), At.getCenter(s);
    let a = 0;
    return t.traverseVisible((o) => {
      if (!o.isMesh)
        return;
      const r = o, h = r.geometry.clone();
      h.applyMatrix4(r.matrixWorld);
      const m = h.attributes.position;
      for (let f = 0, g = m.count; f < g; f++)
        Y.fromBufferAttribute(m, f), a = Math.max(a, s.distanceToSquared(Y));
    }), e.radius = Math.sqrt(a), e;
  }
}
const ri = (i) => {
  const [t, n] = J(i.options[i.index]), e = () => {
    i.onToggle(!i.open);
  }, s = (a) => {
    a !== t && (i.onSelect(a), n(a)), i.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: e, children: `${i.title}: ${t}` }),
    i.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: i.options.map((a) => /* @__PURE__ */ u.jsx("li", { onClick: () => s(a), children: a }, a)) })
  ] });
}, gt = Ms(function(t, n) {
  const e = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [s, a] = J("Renderer"), [o, r] = J(!1), [h, c] = J(!1), [m, f] = J(!1);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: n, className: "clickable", onClick: () => {
      m && f(!1);
    } }),
    /* @__PURE__ */ u.jsxs("div", { className: "options", children: [
      /* @__PURE__ */ u.jsx(
        ri,
        {
          title: "Camera",
          index: t.options.indexOf(t.camera.name),
          open: m,
          options: t.options,
          onSelect: t.onSelectCamera,
          onToggle: (g) => {
            f(g);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        ri,
        {
          title: "Mode",
          index: e.indexOf(s),
          open: h,
          options: e,
          onSelect: (g) => {
            if (g === s)
              return;
            const v = g;
            t.onSelectRenderMode(v), a(v);
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
class Ca extends In {
  constructor(t) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: hs,
      side: gn,
      transparent: !0,
      uniforms: {
        uScale: {
          value: t?.scale !== void 0 ? t?.scale : 0.1
        },
        uDivisions: {
          value: t?.divisions !== void 0 ? t?.divisions : 10
        },
        uColor: {
          value: t?.color !== void 0 ? t?.color : new Ii(16777215)
        },
        uDistance: {
          value: t?.distance !== void 0 ? t?.distance : 1e4
        },
        uSubgridOpacity: {
          value: t?.subgridOpacity !== void 0 ? t?.subgridOpacity : 0.15
        },
        uGridOpacity: {
          value: t?.gridOpacity !== void 0 ? t?.gridOpacity : 0.25
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
class Ta extends oi {
  gridMaterial;
  constructor() {
    const t = new Ca();
    super(new us(2, 2), t), this.gridMaterial = t, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const xa = `#include <common>
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
}`, Sa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class wa extends In {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: xa,
      fragmentShader: Sa
    });
  }
}
let Ye, Oi = !1, q = null, de = null, Ve = null, $e = null, Pt = "Renderer", ei = "Renderer", un = "Renderer", mn = "Renderer";
function Ya(i) {
  const t = i.three.app.appID, n = Ce(() => /* @__PURE__ */ new Map(), []), e = Ce(() => /* @__PURE__ */ new Map(), []), s = Ce(() => /* @__PURE__ */ new Map(), []), a = Ce(() => /* @__PURE__ */ new Map(), []), o = Ce(() => new fn(), []), r = Ce(() => new ms(), []), h = Ce(() => new Ta(), []), c = Ce(() => new Bi(500), []), m = Ce(() => new Bi(100), []), f = Ce(() => new fs(), []), g = Ce(() => new ps(), []), v = Ce(() => new wa(), []), M = Ce(() => new Pi({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function P(E, T) {
    const D = new Ci(-100, 100, 100, -100, 50, 5e3);
    return D.name = E, D.position.copy(T), D.lookAt(0, 0, 0), n.set(E, D), D;
  }
  const L = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], _ = ae(null), y = ae(null), x = ae(null), O = ae(null), I = ae(null), A = ae(null), C = localStorage, te = C.getItem(`${t}_mode`), [K, Je] = J(te !== null ? te : "Single"), [z, ke] = J(null), [be, xe] = J(!1), [Se, Ue] = J(!1), [Ze, ot] = J("Orbit"), [it, nt] = J(!1), [ut, ct] = J(Date.now());
  C.setItem(`${t}_mode`, K), C.setItem(`${t}_tlCam`, C.getItem(`${t}_tlCam`) !== null ? C.getItem(`${t}_tlCam`) : "Debug"), C.setItem(`${t}_trCam`, C.getItem(`${t}_trCam`) !== null ? C.getItem(`${t}_trCam`) : "Orthographic"), C.setItem(`${t}_blCam`, C.getItem(`${t}_blCam`) !== null ? C.getItem(`${t}_blCam`) : "Front"), C.setItem(`${t}_brCam`, C.getItem(`${t}_brCam`) !== null ? C.getItem(`${t}_brCam`) : "Top"), C.setItem(`${t}_tlRender`, C.getItem(`${t}_tlRender`) !== null ? C.getItem(`${t}_tlRender`) : "Renderer"), C.setItem(`${t}_trRender`, C.getItem(`${t}_trRender`) !== null ? C.getItem(`${t}_trRender`) : "Renderer"), C.setItem(`${t}_blRender`, C.getItem(`${t}_blRender`) !== null ? C.getItem(`${t}_blRender`) : "Renderer"), C.setItem(`${t}_brRender`, C.getItem(`${t}_brRender`) !== null ? C.getItem(`${t}_brRender`) : "Renderer");
  const _e = (E, T) => {
    const D = e.get(E.name);
    if (D !== void 0 && D.dispose(), e.delete(E.name), E.name === "UI")
      return;
    const k = new ya(E, T);
    switch (k.enableDamping = !0, k.dampingFactor = 0.05, E.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        k.enableRotate = !1;
        break;
    }
    e.set(E.name, k);
  }, Ge = (E) => {
    const T = s.get(E.name);
    T !== void 0 && (o.remove(T), T.dispose(), s.delete(E.name));
    const D = e.get(E.name);
    D !== void 0 && (D.dispose(), e.delete(E.name));
  }, Lt = () => {
    e.forEach((E, T) => {
      E.dispose();
      const D = s.get(T);
      D !== void 0 && (o.remove(D), D.dispose()), s.delete(T), e.delete(T);
    }), e.clear(), s.clear();
  }, mt = () => {
    switch (K) {
      case "Single":
        _e(q, x.current);
        break;
      case "Side by Side":
      case "Stacked":
        _e(q, x.current), _e(de, O.current);
        break;
      case "Quad":
        _e(q, x.current), _e(de, O.current), _e(Ve, I.current), _e($e, A.current);
        break;
    }
  };
  qe(() => {
    const E = new _s({
      canvas: _.current,
      stencil: !1
    });
    E.autoClear = !1, E.shadowMap.enabled = !0, E.setPixelRatio(devicePixelRatio), E.setClearColor(0), i.three.renderer = E, ke(E);
  }, []), qe(() => {
    o.name = "Debug Scene", o.uuid = "", r.name = "helpers", o.add(r), r.add(h), c.name = "axisHelper", r.add(c), m.name = "interactionHelper", r.add(m), m.visible = !1, P("Top", new ce(0, 1e3, 0)), P("Bottom", new ce(0, -1e3, 0)), P("Left", new ce(-1e3, 0, 0)), P("Right", new ce(1e3, 0, 0)), P("Front", new ce(0, 0, 1e3)), P("Back", new ce(0, 0, -1e3)), P("Orthographic", new ce(1e3, 1e3, 1e3)), P("UI", new ce());
    const E = new ui(60, 1, 50, 5e3);
    E.name = "Debug", E.position.set(500, 500, 500), E.lookAt(0, 0, 0), n.set("Debug", E), q = n.get(C.getItem(`${t}_tlCam`)), de = n.get(C.getItem(`${t}_trCam`)), Ve = n.get(C.getItem(`${t}_blCam`)), $e = n.get(C.getItem(`${t}_brCam`)), q === void 0 && (q = n.get("Debug")), de === void 0 && (de = n.get("Orthographic")), Ve === void 0 && (Ve = n.get("Front")), $e === void 0 && ($e = n.get("Top"));
  }, []), qe(() => {
    const E = () => {
      a.forEach((R) => {
        r.remove(R), R.dispose();
      }), a.clear();
    }, T = () => {
      Ye.traverse((R) => {
        if (R.type.search("Light") > -1) {
          let U;
          switch (R.type) {
            case "DirectionalLight":
              U = new Ts(R, 100), U.name = `${R.name}Helper`, a.set(R.name, U), r.add(U);
              break;
            case "HemisphereLight":
              U = new Cs(R, 250), U.name = `${R.name}Helper`, a.set(R.name, U), r.add(U);
              break;
            case "RectAreaLight":
              U = new ga(R), U.name = `${R.name}Helper`, a.set(R.name, U), r.add(U);
              break;
            case "PointLight":
              U = new Os(R, 100), U.name = `${R.name}Helper`, a.set(R.name, U), r.add(U);
              break;
            case "SpotLight":
              U = new bs(R), U.name = `${R.name}Helper`, a.set(R.name, U), r.add(U);
              break;
          }
        }
      });
    }, D = (R) => {
      r.add(c), E(), si(Ye), o.remove(Ye);
      const U = i.scenes.get(R.value.name);
      if (U !== void 0) {
        const ve = new U();
        i.onSceneSet !== void 0 && i.onSceneSet(ve), Ye = ve, i.three.scene = Ye, o.add(Ye), Oi = !0, T();
      }
    }, k = (R) => {
      const U = R.value, ve = i.three.scene?.getObjectByProperty("uuid", U.uuid);
      if (ve !== void 0 && n.set(U.name, ve), ve instanceof ui) {
        const Le = new gs(ve);
        s.set(ve.name, Le), o.add(Le);
      }
      ct(Date.now());
    }, he = (R) => {
      const U = s.get(R.value.name);
      U !== void 0 && (o.remove(U), U.dispose()), n.delete(R.value.name), ct(Date.now());
    }, ge = (R) => {
      const U = Ye.getObjectByProperty("uuid", R.value.uuid);
      U && U.add(c);
    };
    return B.addEventListener(H.SET_SCENE, D), B.addEventListener(H.ADD_CAMERA, k), B.addEventListener(H.REMOVE_CAMERA, he), B.addEventListener(H.SET_OBJECT, ge), () => {
      B.removeEventListener(H.SET_SCENE, D), B.removeEventListener(H.ADD_CAMERA, k), B.removeEventListener(H.REMOVE_CAMERA, he), B.removeEventListener(H.SET_OBJECT, ge);
    };
  }, []), qe(() => {
    if (z === null)
      return;
    let E = window.innerWidth, T = window.innerHeight, D = Math.floor(E / 2), k = Math.floor(T / 2), he = -1;
    const ge = () => {
      E = window.innerWidth - 300, T = window.innerHeight, D = Math.floor(E / 2), k = Math.floor(T / 2), i.three.resize(E, T), i.onSceneResize !== void 0 && Oi && i.onSceneResize(Ye, E, T);
      let Z = E, oe = T;
      switch (K) {
        case "Side by Side":
          Z = D, oe = T;
          break;
        case "Stacked":
          Z = E, oe = k;
          break;
        case "Quad":
          Z = D, oe = k;
          break;
      }
      const Te = Z / oe;
      n.forEach((re) => {
        re instanceof Ci ? (re.left = Z / -2, re.right = Z / 2, re.top = oe / 2, re.bottom = oe / -2, re.name === "UI" && (re.position.x = E / 2, re.position.y = T / -2, re.position.z = 100), re.updateProjectionMatrix()) : re instanceof ui && (re.aspect = Te, re.updateProjectionMatrix(), s.get(re.name)?.update());
      });
    };
    function R(Z) {
      switch (Z) {
        case "Depth":
          return f;
        case "Normals":
          return g;
        case "Renderer":
          return null;
        case "UVs":
          return v;
        case "Wireframe":
          return M;
      }
      return null;
    }
    const U = () => {
      const Z = R(Pt);
      o.overrideMaterial = Z, z.setViewport(0, 0, E, T), z.setScissor(0, 0, E, T), z.render(o, q);
    }, ve = () => {
      const Z = R(Pt), oe = R(ei);
      if (o.overrideMaterial = Z, K === "Side by Side")
        z.setViewport(0, 0, D, T), z.setScissor(0, 0, D, T), z.render(o, q), o.overrideMaterial = oe, z.setViewport(D, 0, D, T), z.setScissor(D, 0, D, T), z.render(o, de);
      else {
        const Te = T - k;
        z.setViewport(0, Te, E, k), z.setScissor(0, Te, E, k), z.render(o, q), o.overrideMaterial = oe, z.setViewport(0, 0, E, k), z.setScissor(0, 0, E, k), z.render(o, de);
      }
    }, Le = () => {
      const Z = R(Pt), oe = R(ei), Te = R(un), re = R(mn);
      let ue = 0, N = 0;
      N = T - k, ue = 0, o.overrideMaterial = Z, z.setViewport(ue, N, D, k), z.setScissor(ue, N, D, k), z.render(o, q), ue = D, o.overrideMaterial = oe, z.setViewport(ue, N, D, k), z.setScissor(ue, N, D, k), z.render(o, de), N = 0, ue = 0, o.overrideMaterial = Te, z.setViewport(ue, N, D, k), z.setScissor(ue, N, D, k), z.render(o, Ve), ue = D, o.overrideMaterial = re, z.setViewport(ue, N, D, k), z.setScissor(ue, N, D, k), z.render(o, $e);
    }, Qe = () => {
      switch (e.forEach((Z) => {
        Z.update();
      }), s.forEach((Z) => {
        Z.update();
      }), a.forEach((Z) => {
        Z.update !== void 0 && Z.update();
      }), i.onSceneUpdate !== void 0 && Oi && i.onSceneUpdate(Ye), z.clear(), K) {
        case "Single":
          U();
          break;
        case "Side by Side":
        case "Stacked":
          ve();
          break;
        case "Quad":
          Le();
          break;
      }
      he = requestAnimationFrame(Qe);
    };
    return mt(), window.addEventListener("resize", ge), ge(), Qe(), () => {
      window.removeEventListener("resize", ge), cancelAnimationFrame(he), he = -1;
    };
  }, [K, z]), qe(() => {
    if (z !== null) {
      const E = {
        Vector2: Re,
        Vector3: ce,
        Vector4: vs,
        Quaternion: xi,
        Matrix4: Pn,
        Spherical: Si,
        Box3: ys,
        Sphere: Es,
        Raycaster: Hi
      };
      rt.install({ THREE: E });
      const T = new Hi(), D = new Re();
      let k = q, he = x, ge, R, U = -1;
      const ve = (N, ie, ye, me) => {
        switch (K) {
          case "Quad":
            N < ye ? ie < me ? (k = q, T.setFromCamera(D, q)) : (k = Ve, T.setFromCamera(D, Ve)) : ie < me ? (k = de, T.setFromCamera(D, de)) : (k = $e, T.setFromCamera(D, $e));
            break;
          case "Side by Side":
            N < ye ? (k = q, T.setFromCamera(D, q)) : (k = de, T.setFromCamera(D, de));
            break;
          case "Single":
            k = q, T.setFromCamera(D, q);
            break;
          case "Stacked":
            ie < me ? (k = q, T.setFromCamera(D, q)) : (k = de, T.setFromCamera(D, de));
            break;
        }
        k === q ? he = x : k === de ? he = O : k === Ve ? he = I : k === $e && (he = A);
      }, Le = (N) => {
        const ie = new Re();
        z.getSize(ie);
        const ye = Math.min(N.clientX, ie.x), me = Math.min(N.clientY, ie.y);
        D.x = wt(ye, 0, ie.x, -1, 1), D.y = wt(me, 0, ie.y, 1, -1);
        const Ae = ie.x / 2, Fe = ie.y / 2, st = () => {
          ye < Ae ? D.x = wt(ye, 0, Ae, -1, 1) : D.x = wt(ye, Ae, ie.x, -1, 1);
        }, We = () => {
          me < Fe ? D.y = wt(me, 0, Fe, 1, -1) : D.y = wt(me, Fe, ie.y, 1, -1);
        };
        switch (K) {
          case "Quad":
            st(), We();
            break;
          case "Side by Side":
            st();
            break;
          case "Stacked":
            We(), We();
            break;
        }
        if (ve(ye, me, Ae, Fe), Ze === "Orbit")
          return;
        const bt = T.intersectObjects(Ye.children);
        bt.length > 0 && m.position.copy(bt[0].point);
      }, Qe = (N) => {
        if (Ze === "Orbit")
          return;
        const ie = new Re();
        if (z.getSize(ie), N.clientX >= ie.x)
          return;
        Le(N);
        const ye = T.intersectObjects(Ye.children);
        ye.length > 0 && (i.three.getObject(ye[0].object.uuid), m.visible = !1, ot("Orbit"), ct(Date.now()));
      }, Z = (N) => {
        if (ge === void 0)
          return;
        clearInterval(U), R && (R.smoothTime = 0.1);
        const ie = 1 / 60, ye = Date.now();
        let me = ye;
        ge.getWorldPosition(N.target0), U = setInterval(() => {
          if (R) {
            const Ae = Date.now(), Fe = (Ae - me) / 1e3, st = (Ae - ye) / 1e3;
            me = Ae, R.update(Fe), N && (N.target.lerp(N.target0, 0.15), N.object.position.lerp(N.position0, 0.15), N.object.zoom = wi(N.object.zoom, N.zoom0, 0.15), N.object.updateProjectionMatrix(), N.dispatchEvent({ type: "change" }), N.update()), st >= 0.5 && (clearInterval(U), U = -1, oe(), R = void 0);
          }
        }, ie * 1e3);
      }, oe = () => {
        R !== void 0 && (R.disconnect(), R.dispose(), R = void 0);
      }, Te = (N) => {
        if (ge !== void 0 && N.ctrlKey) {
          if (k.name === "UI")
            return;
          const ie = e.get(k.name);
          N.key === "0" ? (oe(), R = new rt(k, he.current), ge instanceof oi || ge instanceof xs ? (ge.geometry.computeBoundingBox(), R.fitToBox(ge.geometry.boundingBox, !0)) : R.fitToSphere(ge, !0), Z(ie)) : N.key === "1" ? (oe(), R = new rt(k, he.current), R.rotateTo(0, Math.PI * 0.5, !1), Z(ie)) : N.key === "2" ? (oe(), R = new rt(k, he.current), R.rotateTo(0, 0, !1), Z(ie)) : N.key === "3" ? (oe(), R = new rt(k, he.current), R.rotateTo(Math.PI / 2, Math.PI / 2, !1), Z(ie)) : N.key === "4" && (oe(), R = new rt(k, he.current), R.rotateTo(Math.PI, Math.PI / 2, !1), Z(ie));
        }
      }, re = (N) => {
        ge = Ye.getObjectByProperty("uuid", N.value.uuid);
      }, ue = y.current;
      return ue.addEventListener("mousemove", Le, !1), ue.addEventListener("click", Qe, !1), window.addEventListener("keydown", Te, !1), B.addEventListener(H.SET_OBJECT, re), () => {
        ue.removeEventListener("mousemove", Le), ue.removeEventListener("click", Qe), window.removeEventListener("keydown", Te), B.removeEventListener(H.SET_OBJECT, re);
      };
    }
  }, [K, z, Ze]);
  const De = [];
  return n.forEach((E, T) => {
    De.push(T);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsx("canvas", { ref: _ }),
    z !== null && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxs("div", { className: `cameras ${K === "Single" || K === "Stacked" ? "single" : ""}`, ref: y, children: [
        K === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(
          gt,
          {
            camera: q,
            options: De,
            ref: x,
            onSelectCamera: (E) => {
              e.get(q.name)?.dispose();
              const T = n.get(E);
              T !== void 0 && (Ge(q), q = T, C.setItem(`${t}_tlCam`, T.name), _e(T, x.current));
            },
            onSelectRenderMode: (E) => {
              Pt = E, C.setItem(`${t}_tlRender`, E);
            }
          }
        ) }),
        (K === "Side by Side" || K === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            gt,
            {
              camera: q,
              options: De,
              ref: x,
              onSelectCamera: (E) => {
                e.get(q.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (Ge(q), q = T, C.setItem(`${t}_tlCam`, T.name), _e(T, x.current));
              },
              onSelectRenderMode: (E) => {
                Pt = E, C.setItem(`${t}_tlRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            gt,
            {
              camera: de,
              options: De,
              ref: O,
              onSelectCamera: (E) => {
                e.get(de.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (Ge(de), de = T, C.setItem(`${t}_trCam`, T.name), _e(T, O.current));
              },
              onSelectRenderMode: (E) => {
                ei = E, C.setItem(`${t}_trRender`, E);
              }
            }
          )
        ] }),
        K === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            gt,
            {
              camera: q,
              options: De,
              ref: x,
              onSelectCamera: (E) => {
                e.get(q.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (Ge(q), q = T, C.setItem(`${t}_tlCam`, T.name), _e(T, x.current));
              },
              onSelectRenderMode: (E) => {
                Pt = E, C.setItem(`${t}_tlRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            gt,
            {
              camera: de,
              options: De,
              ref: O,
              onSelectCamera: (E) => {
                e.get(de.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (Ge(de), de = T, C.setItem(`${t}_trCam`, T.name), _e(T, O.current));
              },
              onSelectRenderMode: (E) => {
                ei = E, C.setItem(`${t}_trRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            gt,
            {
              camera: Ve,
              options: De,
              ref: I,
              onSelectCamera: (E) => {
                e.get(Ve.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (Ge(Ve), Ve = T, C.setItem(`${t}_blCam`, T.name), _e(T, I.current));
              },
              onSelectRenderMode: (E) => {
                un = E, C.setItem(`${t}_blRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            gt,
            {
              camera: $e,
              options: De,
              ref: A,
              onSelectCamera: (E) => {
                e.get($e.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (Ge($e), $e = T, C.setItem(`${t}_brCam`, T.name), _e(T, A.current));
              },
              onSelectRenderMode: (E) => {
                mn = E, C.setItem(`${t}_brRender`, E);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ u.jsx(
          ri,
          {
            title: "View",
            index: L.indexOf(K),
            options: L,
            onSelect: (E) => {
              E !== K && (Lt(), Je(E));
            },
            open: be,
            onToggle: (E) => {
              xe(E), Se && Ue(!1), it && nt(!1);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          ri,
          {
            title: "Interact",
            index: Ze === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (E) => {
              m.visible = E === "Selection Mode", ot(m.visible ? "Selection" : "Orbit");
            },
            open: it,
            onToggle: (E) => {
              be && xe(!1), Se && Ue(!1), nt(E);
            }
          }
        )
      ] }, ut)
    ] })
  ] });
}
function Va(i) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: i.footer })
  ] });
}
export {
  ai as Accordion,
  ka as Application,
  ci as BaseRemote,
  Nn as ChildObject,
  Wi as ContainerObject,
  Ys as Draggable,
  Hs as DraggableItem,
  Vs as Dropdown,
  $s as DropdownItem,
  Va as Editor,
  ti as ExportTexture,
  _a as Inspector,
  Ya as MultiView,
  Fn as NavButton,
  Ua as RemoteComponents,
  za as RemoteController,
  ki as RemoteTheatre,
  Na as RemoteThree,
  ja as RemoteTweakpane,
  Ha as SceneInspector,
  Ba as SidePanel,
  H as ToolEvents,
  ni as capitalize,
  vt as clamp,
  As as colorToHex,
  B as debugDispatcher,
  Pa as defaultTheatreCallback,
  si as dispose,
  Ps as disposeMaterial,
  La as disposeTexture,
  Ia as distance,
  Ri as hierarchyUUID,
  Ds as isColor,
  wi as mix,
  Li as noop,
  Yi as normalize,
  Rs as randomID,
  $i as resetThreeObjects,
  Vi as round,
  Fa as theatreEditorApp,
  Mi as totalThreeObjects
};
