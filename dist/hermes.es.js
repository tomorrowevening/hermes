import { OrthographicCamera as Si, Scene as _n, MeshBasicMaterial as ni, BufferGeometry as si, Float32BufferAttribute as Vt, Mesh as li, LinearSRGBColorSpace as Ni, EventDispatcher as vn, Texture as Zn, RepeatWrapping as zi, WebGLRenderTarget as Wn, Color as di, FrontSide as Kn, BackSide as yn, DoubleSide as En, NoBlending as Xn, NormalBlending as qn, AdditiveBlending as Jn, SubtractiveBlending as Qn, MultiplyBlending as es, CustomBlending as ts, AddEquation as is, SubtractEquation as ns, ReverseSubtractEquation as ss, MinEquation as as, MaxEquation as rs, ZeroFactor as bn, OneFactor as On, SrcColorFactor as Cn, OneMinusSrcColorFactor as Tn, SrcAlphaFactor as xn, OneMinusSrcAlphaFactor as Sn, DstAlphaFactor as wn, OneMinusDstAlphaFactor as Mn, DstColorFactor as Rn, OneMinusDstColorFactor as Dn, SrcAlphaSaturateFactor as os, ConstantColorFactor as An, OneMinusConstantColorFactor as Pn, ConstantAlphaFactor as Ln, OneMinusConstantAlphaFactor as In, Matrix4 as kn, Vector3 as he, Euler as cs, Line as ls, LineBasicMaterial as ds, Ray as hs, Plane as us, MathUtils as ms, MOUSE as Tt, TOUCH as xt, Quaternion as wi, Spherical as Mi, Vector2 as De, ShaderMaterial as Un, GLSL3 as ps, PlaneGeometry as fs, Group as Bi, AxesHelper as Hi, MeshDepthMaterial as gs, MeshNormalMaterial as _s, WebGLRenderer as vs, PerspectiveCamera as fi, Raycaster as Yi, CameraHelper as ys, Vector4 as Es, Box3 as bs, Sphere as Os, SpotLightHelper as Cs, PointLightHelper as Ts, HemisphereLightHelper as xs, DirectionalLightHelper as Ss, SkinnedMesh as ws, Clock as Ms } from "three";
import { Pane as Rs } from "tweakpane";
import * as Ds from "@tweakpane/plugin-essentials";
import Fn, { useState as W, useRef as de, useEffect as $e, useMemo as Ce, forwardRef as As } from "react";
import { Reorder as jn } from "framer-motion";
const Ii = () => {
}, Na = () => {
};
function ai(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function yt(i, e, n) {
  return Math.min(e, Math.max(i, n));
}
function Vi(i, e, n) {
  return (n - i) / (e - i);
}
function Ri(i, e, n) {
  return i * (1 - n) + e * n;
}
function za(i, e) {
  const n = i - e;
  return Math.sqrt(n * n);
}
function Ps() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ls(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function Gi(i) {
  const e = Math.round(i.r * 255), n = Math.round(i.g * 255), t = Math.round(i.b * 255), s = (h) => {
    const c = h.toString(16);
    return c.length === 1 ? "0" + c : c;
  }, a = s(e), o = s(n), r = s(t);
  return "#" + a + o + r;
}
function $i(i, e = 1) {
  return Number(i.toFixed(e));
}
let Di = 0;
const Zi = () => {
  Di = 0;
}, Ai = (i) => {
  if (!i)
    return;
  let e = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${Di}`, Di++), i.parent !== null && i.parent.uuid.length > 0 && (e = `${i.parent.uuid}.${e}`), i.uuid = e, i.isMesh !== void 0) {
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
  i.children.forEach((n) => Ai(n));
}, Ba = (i) => {
  i?.dispose();
}, Is = (i) => {
  i && (Array.isArray(i) ? i.forEach((e) => e.dispose()) : i.dispose());
}, ri = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const e = i.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : ri(e);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const e = i;
      e.geometry?.dispose(), Is(e.material);
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
      this.camera = new Si(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new _n(), this.material = new ni();
      const n = new si();
      n.setAttribute("position", new Vt([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), n.setAttribute("normal", new Vt([0, 0, 1, 0, 0, 1], 3)), n.setAttribute("uv", new Vt([0, 0, 2, 0, 0, 2], 2));
      const t = new li(n, this.material);
      this.scene.add(t);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const n = this.renderer.outputColorSpace, t = e.colorSpace;
      this.renderer.outputColorSpace = Ni, e.colorSpace = Ni, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = n, e.colorSpace = t;
    }
    return this.renderer.domElement;
  }
}
class Ha {
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
const j = new vn(), N = {
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
class hi {
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
class Ya extends hi {
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
        j.dispatchEvent({ type: N.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        j.dispatchEvent({ type: N.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class ki extends hi {
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
    c !== void 0 ? c = o.object(n, { ...t, ...c.value }, { reconfigure: !0 }) : c = o.object(n, t), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, s !== void 0 ? s : Ii);
    const m = c.onValuesChange((p) => {
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
      const _ = this.sheetObjectCBs.get(h);
      _ !== void 0 && _(p);
    });
    return this.sheetObjectUnsubscribe.set(h, m), c;
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
          e.send({ event: c, target: "app", data: m });
        });
      });
      let t = -1;
      const s = () => {
        if (ki.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
function Va(i, e, n) {
  if (i.editor) {
    n.ui.restore(), n.onSelectionChange((o) => {
      o.length < 1 || o.forEach((r) => {
        let h = r.address.sheetId, c = "setSheet", m = {};
        switch (r.type) {
          case "Theatre_Sheet_PublicAPI":
            c = "setSheet", m = {
              sheet: r.address.sheetId
            }, e.activeSheet = e.sheets.get(r.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            c = "setSheetObject", h += `_${r.address.objectKey}`, m = {
              id: h,
              sheet: r.address.sheetId,
              key: r.address.objectKey
            }, e.activeSheet = e.sheets.get(r.address.sheetId);
            break;
        }
        i.send({ event: c, target: "app", data: m });
      });
    });
    let t = -1;
    const s = () => {
      if (ki.rafDriver?.tick(performance.now()), e.activeSheet !== void 0 && t !== e.activeSheet.sequence.position) {
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
function Ga() {
  const i = document.getElementById("theatrejs-studio-root")?.shadowRoot?.getElementById("pointer-root")?.children[0], e = i?.children[1];
  e.style.justifyContent = "left";
  const n = e.children[1];
  n.style.transform = "translateX(10px)", n.removeChild(n.children[0]), n.removeChild(n.children[0]);
  const t = i?.children[3];
  t.style.top = "0", t.style.right = "300px";
}
function ks(i) {
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
function gi(i) {
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
function js(i, e) {
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
function Ns(i, e) {
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
    o != null && Ns(o, n);
  }
}
function Nn(i) {
  return new Promise((e, n) => {
    const t = new Image();
    t.onload = () => {
      const s = new Zn(t);
      s.wrapS = zi, s.wrapT = zi, s.needsUpdate = !0, e(s);
    }, t.onerror = n, t.src = i;
  });
}
class $a extends hi {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((e) => {
      ri(e);
    }), this.scenes.clear(), this.scene && ri(this.scene), this.renderTargets.forEach((e) => {
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
    const n = gi(e);
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
    Zi(), Ai(e);
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
    this.renderer !== void 0 && (ti.renderer = this.renderer), Zi(), Ai(e);
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
    const n = gi(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: n
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const n = gi(e);
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
        j.dispatchEvent({ type: N.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        j.dispatchEvent({ type: N.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        j.dispatchEvent({ type: N.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        j.dispatchEvent({ type: N.REQUEST_METHOD, value: t.data });
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
        j.dispatchEvent({ type: N.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        j.dispatchEvent({ type: N.ADD_SCENE, value: t.data });
        break;
      case "refreshScene":
        j.dispatchEvent({ type: N.REFRESH_SCENE, value: t.data });
        break;
      case "removeScene":
        j.dispatchEvent({ type: N.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        j.dispatchEvent({ type: N.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        j.dispatchEvent({ type: N.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        j.dispatchEvent({ type: N.REMOVE_CAMERA, value: t.data });
        break;
      case "addGroup":
        j.dispatchEvent({ type: N.ADD_GROUP, value: t.data });
        break;
      case "removeGroup":
        j.dispatchEvent({ type: N.REMOVE_GROUP, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(e, n) {
    const t = new Wn(32, 32, n);
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
class Za extends hi {
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
    const a = this.bindID, o = t.onChange !== void 0 ? t.onChange : Ii;
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
var Pi = { exports: {} }, kt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wi;
function zs() {
  if (Wi)
    return kt;
  Wi = 1;
  var i = Fn, e = Symbol.for("react.element"), n = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, s = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(r, h, c) {
    var m, p = {}, _ = null, v = null;
    c !== void 0 && (_ = "" + c), h.key !== void 0 && (_ = "" + h.key), h.ref !== void 0 && (v = h.ref);
    for (m in h)
      t.call(h, m) && !a.hasOwnProperty(m) && (p[m] = h[m]);
    if (r && r.defaultProps)
      for (m in h = r.defaultProps, h)
        p[m] === void 0 && (p[m] = h[m]);
    return { $$typeof: e, type: r, key: _, ref: v, props: p, _owner: s.current };
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
var Ki;
function Bs() {
  return Ki || (Ki = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Fn, e = Symbol.for("react.element"), n = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), r = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), R = Symbol.iterator, P = "@@iterator";
    function k(l) {
      if (l === null || typeof l != "object")
        return null;
      var b = R && l[R] || l[P];
      return typeof b == "function" ? b : null;
    }
    var g = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(l) {
      {
        for (var b = arguments.length, S = new Array(b > 1 ? b - 1 : 0), H = 1; H < b; H++)
          S[H - 1] = arguments[H];
        x("error", l, S);
      }
    }
    function x(l, b, S) {
      {
        var H = g.ReactDebugCurrentFrame, ie = H.getStackAddendum();
        ie !== "" && (b += "%s", S = S.concat([ie]));
        var oe = S.map(function(q) {
          return String(q);
        });
        oe.unshift("Warning: " + b), Function.prototype.apply.call(console[l], console, oe);
      }
    }
    var O = !1, L = !1, A = !1, C = !1, re = !1, ee;
    ee = Symbol.for("react.module.reference");
    function qe(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === t || l === a || re || l === s || l === c || l === m || C || l === v || O || L || A || typeof l == "object" && l !== null && (l.$$typeof === _ || l.$$typeof === p || l.$$typeof === o || l.$$typeof === r || l.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === ee || l.getModuleId !== void 0));
    }
    function U(l, b, S) {
      var H = l.displayName;
      if (H)
        return H;
      var ie = b.displayName || b.name || "";
      return ie !== "" ? S + "(" + ie + ")" : S;
    }
    function je(l) {
      return l.displayName || "Context";
    }
    function Ee(l) {
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
        case m:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case r:
            var b = l;
            return je(b) + ".Consumer";
          case o:
            var S = l;
            return je(S._context) + ".Provider";
          case h:
            return U(l, l.render, "ForwardRef");
          case p:
            var H = l.displayName || null;
            return H !== null ? H : Ee(l.type) || "Memo";
          case _: {
            var ie = l, oe = ie._payload, q = ie._init;
            try {
              return Ee(q(oe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var xe = Object.assign, Se = 0, Ne, Ze, rt, it, nt, mt, ot;
    function _e() {
    }
    _e.__reactDisabledLog = !0;
    function We() {
      {
        if (Se === 0) {
          Ne = console.log, Ze = console.info, rt = console.warn, it = console.error, nt = console.group, mt = console.groupCollapsed, ot = console.groupEnd;
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
    function It() {
      {
        if (Se--, Se === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: xe({}, l, {
              value: Ne
            }),
            info: xe({}, l, {
              value: Ze
            }),
            warn: xe({}, l, {
              value: rt
            }),
            error: xe({}, l, {
              value: it
            }),
            group: xe({}, l, {
              value: nt
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
    var pt = g.ReactCurrentDispatcher, Ae;
    function E(l, b, S) {
      {
        if (Ae === void 0)
          try {
            throw Error();
          } catch (ie) {
            var H = ie.stack.trim().match(/\n( *(at )?)/);
            Ae = H && H[1] || "";
          }
        return `
` + Ae + l;
      }
    }
    var T = !1, D;
    {
      var F = typeof WeakMap == "function" ? WeakMap : Map;
      D = new F();
    }
    function me(l, b) {
      if (!l || T)
        return "";
      {
        var S = D.get(l);
        if (S !== void 0)
          return S;
      }
      var H;
      T = !0;
      var ie = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var oe;
      oe = pt.current, pt.current = null, We();
      try {
        if (b) {
          var q = function() {
            throw Error();
          };
          if (Object.defineProperty(q.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(q, []);
            } catch (at) {
              H = at;
            }
            Reflect.construct(l, [], q);
          } else {
            try {
              q.call();
            } catch (at) {
              H = at;
            }
            l.call(q.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (at) {
            H = at;
          }
          l();
        }
      } catch (at) {
        if (at && H && typeof at.stack == "string") {
          for (var $ = at.stack.split(`
`), Re = H.stack.split(`
`), fe = $.length - 1, ye = Re.length - 1; fe >= 1 && ye >= 0 && $[fe] !== Re[ye]; )
            ye--;
          for (; fe >= 1 && ye >= 0; fe--, ye--)
            if ($[fe] !== Re[ye]) {
              if (fe !== 1 || ye !== 1)
                do
                  if (fe--, ye--, ye < 0 || $[fe] !== Re[ye]) {
                    var Ve = `
` + $[fe].replace(" at new ", " at ");
                    return l.displayName && Ve.includes("<anonymous>") && (Ve = Ve.replace("<anonymous>", l.displayName)), typeof l == "function" && D.set(l, Ve), Ve;
                  }
                while (fe >= 1 && ye >= 0);
              break;
            }
        }
      } finally {
        T = !1, pt.current = oe, It(), Error.prepareStackTrace = ie;
      }
      var Ct = l ? l.displayName || l.name : "", ji = Ct ? E(Ct) : "";
      return typeof l == "function" && D.set(l, ji), ji;
    }
    function K(l, b, S) {
      return me(l, !1);
    }
    function M(l) {
      var b = l.prototype;
      return !!(b && b.isReactComponent);
    }
    function I(l, b, S) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return me(l, M(l));
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
            return K(l.render);
          case p:
            return I(l.type, b, S);
          case _: {
            var H = l, ie = H._payload, oe = H._init;
            try {
              return I(oe(ie), b, S);
            } catch {
            }
          }
        }
      return "";
    }
    var pe = Object.prototype.hasOwnProperty, be = {}, st = g.ReactDebugCurrentFrame;
    function Te(l) {
      if (l) {
        var b = l._owner, S = I(l.type, l._source, b ? b.type : null);
        st.setExtraStackFrame(S);
      } else
        st.setExtraStackFrame(null);
    }
    function we(l, b, S, H, ie) {
      {
        var oe = Function.call.bind(pe);
        for (var q in l)
          if (oe(l, q)) {
            var $ = void 0;
            try {
              if (typeof l[q] != "function") {
                var Re = Error((H || "React class") + ": " + S + " type `" + q + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[q] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Re.name = "Invariant Violation", Re;
              }
              $ = l[q](b, q, H, S, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (fe) {
              $ = fe;
            }
            $ && !($ instanceof Error) && (Te(ie), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", H || "React class", S, q, typeof $), Te(null)), $ instanceof Error && !($.message in be) && (be[$.message] = !0, Te(ie), y("Failed %s type: %s", S, $.message), Te(null));
          }
      }
    }
    var Ie = Array.isArray;
    function ne(l) {
      return Ie(l);
    }
    function ve(l) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, S = b && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return S;
      }
    }
    function Y(l) {
      try {
        return z(l), !1;
      } catch {
        return !0;
      }
    }
    function z(l) {
      return "" + l;
    }
    function X(l) {
      if (Y(l))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ve(l)), z(l);
    }
    var J = g.ReactCurrentOwner, ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ze, ct, Je;
    Je = {};
    function bt(l) {
      if (pe.call(l, "ref")) {
        var b = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function mi(l) {
      if (pe.call(l, "key")) {
        var b = Object.getOwnPropertyDescriptor(l, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function pi(l, b) {
      if (typeof l.ref == "string" && J.current && b && J.current.stateNode !== b) {
        var S = Ee(J.current.type);
        Je[S] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Ee(J.current.type), l.ref), Je[S] = !0);
      }
    }
    function Gt(l, b) {
      {
        var S = function() {
          ze || (ze = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
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
    var Ui = function(l, b, S, H, ie, oe, q) {
      var $ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: l,
        key: b,
        ref: S,
        props: q,
        // Record the component responsible for creating this element.
        _owner: oe
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
        value: H
      }), Object.defineProperty($, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ie
      }), Object.freeze && (Object.freeze($.props), Object.freeze($)), $;
    };
    function d(l, b, S, H, ie) {
      {
        var oe, q = {}, $ = null, Re = null;
        S !== void 0 && (X(S), $ = "" + S), mi(b) && (X(b.key), $ = "" + b.key), bt(b) && (Re = b.ref, pi(b, ie));
        for (oe in b)
          pe.call(b, oe) && !ke.hasOwnProperty(oe) && (q[oe] = b[oe]);
        if (l && l.defaultProps) {
          var fe = l.defaultProps;
          for (oe in fe)
            q[oe] === void 0 && (q[oe] = fe[oe]);
        }
        if ($ || Re) {
          var ye = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          $ && Gt(q, ye), Re && lt(q, ye);
        }
        return Ui(l, $, Re, ie, H, J.current, q);
      }
    }
    var w = g.ReactCurrentOwner, G = g.ReactDebugCurrentFrame;
    function Q(l) {
      if (l) {
        var b = l._owner, S = I(l.type, l._source, b ? b.type : null);
        G.setExtraStackFrame(S);
      } else
        G.setExtraStackFrame(null);
    }
    var Oe;
    Oe = !1;
    function Be(l) {
      return typeof l == "object" && l !== null && l.$$typeof === e;
    }
    function Me() {
      {
        if (w.current) {
          var l = Ee(w.current.type);
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
        var b = Me();
        if (!b) {
          var S = typeof l == "string" ? l : l.displayName || l.name;
          S && (b = `

Check the top-level render call using <` + S + ">.");
        }
        return b;
      }
    }
    function He(l, b) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var S = Zt(b);
        if ($t[S])
          return;
        $t[S] = !0;
        var H = "";
        l && l._owner && l._owner !== w.current && (H = " It was passed a child from " + Ee(l._owner.type) + "."), Q(l), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', S, H), Q(null);
      }
    }
    function Ye(l, b) {
      {
        if (typeof l != "object")
          return;
        if (ne(l))
          for (var S = 0; S < l.length; S++) {
            var H = l[S];
            Be(H) && He(H, b);
          }
        else if (Be(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var ie = k(l);
          if (typeof ie == "function" && ie !== l.entries)
            for (var oe = ie.call(l), q; !(q = oe.next()).done; )
              Be(q.value) && He(q.value, b);
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
          var H = Ee(b);
          we(S, l.props, "prop", H, l);
        } else if (b.PropTypes !== void 0 && !Oe) {
          Oe = !0;
          var ie = Ee(b);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ie || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ke(l) {
      {
        for (var b = Object.keys(l.props), S = 0; S < b.length; S++) {
          var H = b[S];
          if (H !== "children" && H !== "key") {
            Q(l), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", H), Q(null);
            break;
          }
        }
        l.ref !== null && (Q(l), y("Invalid attribute `ref` supplied to `React.Fragment`."), Q(null));
      }
    }
    function dt(l, b, S, H, ie, oe) {
      {
        var q = qe(l);
        if (!q) {
          var $ = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && ($ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Re = Fi(ie);
          Re ? $ += Re : $ += Me();
          var fe;
          l === null ? fe = "null" : ne(l) ? fe = "array" : l !== void 0 && l.$$typeof === e ? (fe = "<" + (Ee(l.type) || "Unknown") + " />", $ = " Did you accidentally export a JSX literal instead of a component?") : fe = typeof l, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", fe, $);
        }
        var ye = d(l, b, S, ie, oe);
        if (ye == null)
          return ye;
        if (q) {
          var Ve = b.children;
          if (Ve !== void 0)
            if (H)
              if (ne(Ve)) {
                for (var Ct = 0; Ct < Ve.length; Ct++)
                  Ye(Ve[Ct], l);
                Object.freeze && Object.freeze(Ve);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ye(Ve, l);
        }
        return l === t ? Ke(ye) : ft(ye), ye;
      }
    }
    function Ot(l, b, S) {
      return dt(l, b, S, !0);
    }
    function Wt(l, b, S) {
      return dt(l, b, S, !1);
    }
    var Gn = Wt, $n = Ot;
    Ut.Fragment = t, Ut.jsx = Gn, Ut.jsxs = $n;
  }()), Ut;
}
process.env.NODE_ENV === "production" ? Pi.exports = zs() : Pi.exports = Bs();
var u = Pi.exports;
function zn(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ u.jsx("button", { children: i.title });
}
const Hs = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ys = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Vs(i) {
  return /* @__PURE__ */ u.jsx(jn.Item, { value: i.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    Ys,
    /* @__PURE__ */ u.jsx("span", { children: i.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      i.onDelete(i.index);
    }, children: Hs })
  ] }) }, i.title);
}
function Gs(i) {
  const [e, n] = W(!1), [t, s] = W(i.options), a = (c) => {
    i.onDragComplete(c), s(c);
  }, o = (c) => {
    const m = [...t];
    m.splice(c, 1), a(m);
  }, r = [];
  t.forEach((c, m) => {
    r.push(/* @__PURE__ */ u.jsx(Vs, { index: m, title: c, onDelete: o }, c));
  });
  let h = "dropdown draggable";
  return i.subdropdown && (h += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: h, onMouseEnter: () => n(!0), onMouseLeave: () => n(!1), children: [
    /* @__PURE__ */ u.jsx(zn, { title: i.title }),
    /* @__PURE__ */ u.jsx(jn.Group, { axis: "y", values: t, onReorder: a, style: { visibility: e ? "visible" : "hidden" }, children: r })
  ] });
}
function $s(i) {
  const [e, n] = W(!1), t = [];
  i.options.map((a, o) => {
    i.onSelect !== void 0 && (a.onSelect = i.onSelect), t.push(/* @__PURE__ */ u.jsx(Zs, { option: a }, o));
  });
  let s = "dropdown";
  return i.subdropdown && (s += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: s,
      onMouseEnter: () => n(!0),
      onMouseLeave: () => n(!1),
      children: [
        /* @__PURE__ */ u.jsx(zn, { title: i.title }),
        /* @__PURE__ */ u.jsx(
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
  const { option: e } = i, [n, t] = W("");
  let s;
  switch (e.type) {
    case "draggable":
      s = /* @__PURE__ */ u.jsx(
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
      s = /* @__PURE__ */ u.jsx(
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
      s = /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("li", { className: n === e.title ? "selected" : "", children: s }, Ps());
}
function Wa(i, e, n) {
  function t(a) {
    switch (e.forEach((o) => {
      o.callback(i, o.remote, a);
    }), a.event) {
      case "custom":
        j.dispatchEvent({ type: N.CUSTOM, value: a.data });
        break;
    }
  }
  function s(a) {
    switch (n.forEach((o) => {
      o.callback(i, o.remote, a);
    }), a.event) {
      case "custom":
        j.dispatchEvent({ type: N.CUSTOM, value: a.data });
        break;
    }
  }
  i.listen = (a) => {
    a.target === "editor" ? s(a) : t(a);
  };
}
function oi(i) {
  const [e, n] = W(i.open !== void 0 ? i.open : !0), t = !e || i.children === void 0, s = () => {
    j.dispatchEvent({ type: N.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${t ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !e;
          i.onToggle !== void 0 && i.onToggle(a), n(a);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: ai(i.label) })
        ]
      }
    ),
    i.onRefresh ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("button", { className: "refresh", onClick: i.onRefresh }),
      /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: s })
    ] }) : null,
    i.button,
    /* @__PURE__ */ u.jsx("div", { className: e ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: i.children }) }, Math.random())
  ] });
}
function Bn(i) {
  const e = de(null), [n, t] = W(!1), s = i.child !== void 0 && i.child.children.length > 0, a = [];
  return i.child !== void 0 && i.child.children.length > 0 && i.child.children.map((o, r) => {
    a.push(/* @__PURE__ */ u.jsx(Bn, { child: o, three: i.three }, r));
  }), $e(() => {
    if (i.child) {
      const o = i.three.getScene(i.child.uuid);
      if (o !== null) {
        const r = o.getObjectByProperty("uuid", i.child.uuid);
        r !== void 0 && (e.current.style.opacity = r.visible ? "1" : "0.25");
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
            t(!n);
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
            i.child !== void 0 && (i.three.getObject(i.child.uuid), n || t(!0));
          },
          children: i.child.name.length > 0 ? `${i.child.name} (${i.child.type})` : `${i.child.type}::${i.child.uuid}`
        }
      ),
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx("div", { className: `icon ${ks(i.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: n ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: a }) })
  ] }, Math.random()) });
}
function Xi(i) {
  const e = [];
  return i.child?.children.map((n, t) => {
    e.push(/* @__PURE__ */ u.jsx(Bn, { child: n, scene: i.scene, three: i.three }, t));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: e });
}
function Ws(i) {
  const [e, n] = W(i.defaultValue);
  return $e(() => {
    let t = !1, s = -1, a = 0, o = i.defaultValue;
    const r = (_) => {
      t = !0, a = Number(i.input.current?.value), s = _.clientX, document.addEventListener("mouseup", c, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", c, !1);
    }, h = (_) => {
      if (!t)
        return;
      const v = i.step !== void 0 ? i.step : 1, R = (_.clientX - s) * v;
      o = Number((a + R).toFixed(4)), i.min !== void 0 && (o = Math.max(o, i.min)), i.max !== void 0 && (o = Math.min(o, i.max)), i.onChange !== void 0 && i.onChange(o), n(o);
    }, c = () => {
      t = !1, document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    }, m = (_) => {
      const v = Number(_.target.value);
      n(v);
    }, p = (_) => {
      const v = Number(_.target.value);
      i.onChange !== void 0 && i.onChange(v), n(v);
    };
    return i.input.current?.addEventListener("input", m), i.label.current?.addEventListener("mousedown", r, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", p), () => {
      i.input.current?.removeEventListener("input", m), i.label.current?.removeEventListener("mousedown", r), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", p), document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    };
  }, []), e;
}
function Et(i) {
  const e = de(null), n = de(null), t = Ws({
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
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    i.type === "number" && /* @__PURE__ */ u.jsx(
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
    i.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: i.disabled,
          type: "range",
          value: t,
          min: i.min,
          max: i.max,
          step: i.step,
          ref: n,
          onChange: Ii
        }
      )
    ] })
  ] });
}
function Ks(i) {
  const e = de(null), n = de(null), t = de(null), s = de(null), a = de(null), o = de(null), [r, h] = W(i.value), [c, m] = W({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [p, _] = W(!1);
  function v() {
    p || (window.addEventListener("mousemove", P), window.addEventListener("mouseup", R), window.addEventListener("mouseup", R), _(!0));
  }
  function R() {
    window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", R), _(!1);
  }
  function P(O) {
    const L = a.current.getBoundingClientRect(), A = yt(0, 99, O.clientX - L.left) / 99, C = yt(0, 99, O.clientY - L.top) / 99, re = $i(Ri(c.min, c.max, A), 3), ee = $i(Ri(c.min, c.max, C), 3);
    i.onChange({ target: { value: { x: re, y: ee } } }), h({ x: re, y: ee });
  }
  function k(O) {
    let L = r.x, A = r.y;
    O.target === e.current ? L = Number(O.target.value) : A = Number(O.target.value), h({ x: L, y: A });
  }
  function g() {
    const O = Number(t.current.value);
    m({ min: O, max: c.max }), (r.x < O || r.y < O) && h({ x: yt(O, c.max, r.x), y: yt(O, c.max, r.y) });
  }
  function y() {
    const O = Number(s.current.value);
    m({ min: c.min, max: O }), (r.x > O || r.y > O) && h({ x: yt(c.min, O, r.x), y: yt(c.min, O, r.y) });
  }
  $e(() => {
    const O = Vi(c.min, c.max, r.x), L = Vi(c.min, c.max, r.y);
    o.current.style.left = `${O * 100}%`, o.current.style.top = `${L * 100}%`;
  }, [c, r]);
  const x = i.step !== void 0 ? i.step : 0.01;
  return /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "X:" }),
        /* @__PURE__ */ u.jsx(
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
            onChange: k
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
            value: c.min,
            step: x,
            onChange: g
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
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: a, onMouseDown: v, onMouseUp: R, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: o })
    ] })
  ] });
}
function qi(i) {
  const e = i.value.isVector3 !== void 0, n = i.value.isEuler !== void 0, t = i.value.elements !== void 0, s = i.step !== void 0 ? i.step : 0.01, a = [];
  if (e) {
    const o = Ce(() => i.value, []), r = (c, m) => {
      o[c] = m, i.onChange({ target: { value: o } });
    };
    ["x", "y", "z"].forEach((c) => {
      const m = de(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: m, children: c.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Et,
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
      const m = de(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: m, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Et,
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
  } else if (t) {
    const o = Ce(() => i.value, []), r = (h, c) => {
      const m = Number(h);
      o.elements[m] = c, i.onChange({ target: { value: o } });
    };
    for (let h = 0; h < 9; h++) {
      const c = de(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: h + 1 }),
          /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid3", children: a }, Math.random().toString());
}
function Xs(i) {
  const e = i.value.x !== void 0, n = i.step !== void 0 ? i.step : 0.01, t = [];
  if (e) {
    const s = Ce(() => i.value, []), a = (r, h) => {
      s[r] = h, i.onChange({ target: { value: s } });
    };
    ["x", "y", "z", "w"].forEach((r) => {
      const h = de(null);
      t.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: h, children: r.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
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
      const r = de(null);
      t.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: r, children: o + 1 }),
          /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: t });
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
function ui(i) {
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
function Hn(i) {
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
    value: Kn
  },
  {
    title: "Back",
    value: yn
  },
  {
    title: "Double",
    value: En
  }
], ta = [
  {
    title: "No Blending",
    value: Xn
  },
  {
    title: "Normal",
    value: qn
  },
  {
    title: "Additive",
    value: Jn
  },
  {
    title: "Subtractive",
    value: Qn
  },
  {
    title: "Multiply",
    value: es
  },
  {
    title: "Custom",
    value: ts
  }
], ia = [
  {
    title: "Add",
    value: is
  },
  {
    title: "Subtract",
    value: ns
  },
  {
    title: "Reverse Subtract",
    value: ss
  },
  {
    title: "Min",
    value: as
  },
  {
    title: "Max",
    value: rs
  }
], na = [
  {
    title: "Zero",
    valye: bn
  },
  {
    title: "One",
    valye: On
  },
  {
    title: "Src Color",
    valye: Cn
  },
  {
    title: "One Minus Src Color",
    valye: Tn
  },
  {
    title: "Src Alpha",
    valye: xn
  },
  {
    title: "One Minus Src Alpha",
    valye: Sn
  },
  {
    title: "Dst Alpha",
    valye: wn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Mn
  },
  {
    title: "Dst Color",
    valye: Rn
  },
  {
    title: "One Minus Dst Color",
    valye: Dn
  },
  {
    title: "Src Alpha Saturate",
    valye: os
  },
  {
    title: "Constant Color",
    valye: An
  },
  {
    title: "One Minus Constant Color",
    valye: Pn
  },
  {
    title: "Constant Alpha",
    valye: Ln
  },
  {
    title: "One Minus Constant Alpha",
    valye: In
  }
], sa = [
  {
    title: "Zero",
    valye: bn
  },
  {
    title: "One",
    valye: On
  },
  {
    title: "Src Color",
    valye: Cn
  },
  {
    title: "One Minus Src Color",
    valye: Tn
  },
  {
    title: "Src Alpha",
    valye: xn
  },
  {
    title: "One Minus Src Alpha",
    valye: Sn
  },
  {
    title: "Dst Alpha",
    valye: wn
  },
  {
    title: "One Minus Dst Alpha",
    valye: Mn
  },
  {
    title: "Dst Color",
    valye: Rn
  },
  {
    title: "One Minus Dst Color",
    valye: Dn
  },
  {
    title: "Constant Color",
    valye: An
  },
  {
    title: "One Minus Constant Color",
    valye: Pn
  },
  {
    title: "Constant Alpha",
    valye: Ln
  },
  {
    title: "One Minus Constant Alpha",
    valye: In
  }
];
function Ft(i, e) {
  i.needsUpdate = !0, i.type = "option", i.options = e;
}
function aa(i, e, n, t) {
  return {
    type: "boolean",
    title: ui(i),
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
    title: ui(i),
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
  return Hn(i) && (s.value = Number(e), s.type = "range", s.min = Math.min(0, s.value), s.max = Math.max(1, s.value), s.step = 0.01), s;
}
function oa(i, e, n, t) {
  const s = {
    type: "string",
    title: ui(i),
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
function Li(i) {
  i.sort((e, n) => e.title < n.title ? -1 : e.title > n.title ? 1 : 0);
}
function Yt(i, e, n, t, s = "", a = !1) {
  const o = ui(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), r = s.length > 0 ? `${s}.${i}` : i, h = typeof e;
  if (h === "boolean" || h === "string")
    return {
      title: o,
      prop: r,
      type: h,
      value: e,
      disabled: a,
      onChange: (c, m) => {
        t.updateObject(n.uuid, `material.${r}`, m);
        const p = t.getScene(n.uuid);
        if (p !== null) {
          const _ = p.getObjectByProperty("uuid", n.uuid);
          ge(_, `material.${r}`, m);
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
      onChange: (m, p) => {
        t.updateObject(n.uuid, `material.${r}`, p);
        const _ = t.getScene(n.uuid);
        if (_ !== null) {
          const v = _.getObjectByProperty("uuid", n.uuid);
          ge(v, `material.${r}`, p);
        }
      }
    };
    return Hn(o) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (e.isColor)
      return {
        title: o,
        prop: r,
        type: "color",
        value: e,
        disabled: a,
        onChange: (c, m) => {
          const p = new di(m);
          t.updateObject(n.uuid, `material.${r}`, p);
          const _ = t.getScene(n.uuid);
          if (_ !== null) {
            const v = _.getObjectByProperty("uuid", n.uuid);
            ge(v, `material.${r}`, p);
          }
        }
      };
    if (Array.isArray(e)) {
      const c = [];
      for (const m in e) {
        const p = e[m], _ = `[${m.toString()}]`;
        if (p.value !== void 0) {
          const v = Yt(`${_}.value`, p.value, n, t, r, a);
          v !== void 0 && c.push(v);
        } else {
          const v = Yt(_, p, n, t, r, a);
          v !== void 0 && c.push(v);
        }
      }
      if (c.length > 0)
        return Li(c), {
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
          onChange: (c, m) => {
            t.updateObject(n.uuid, `material.${r}`, m);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const _ = p.getObjectByProperty("uuid", n.uuid);
              ge(_, `material.${r}`, m);
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
          onChange: (c, m) => {
            t.updateObject(n.uuid, `material.${r}`, m);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const _ = p.getObjectByProperty("uuid", n.uuid);
              ge(_, `material.${r}`, m);
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
          onChange: (c, m) => {
            t.updateObject(n.uuid, `material.${r}`, m);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const _ = p.getObjectByProperty("uuid", n.uuid);
              ge(_, `material.${r}`, m);
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
          onChange: (c, m) => {
            t.updateObject(n.uuid, `material.${r}`, m);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const _ = p.getObjectByProperty("uuid", n.uuid);
              ge(_, `material.${r}`, m);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: o,
          type: "image",
          value: e,
          disabled: a,
          onChange: (c, m) => {
            const p = Js(i), _ = s.length > 0 ? `${s}.${p}` : p;
            t.createTexture(n.uuid, `material.${_}`, m);
            const v = t.getScene(n.uuid);
            if (v !== null) {
              const R = v.getObjectByProperty("uuid", n.uuid);
              if (R !== void 0) {
                const P = (k) => {
                  const g = R.material, y = _.split(".");
                  switch (y.length) {
                    case 1:
                      g[y[0]] = k;
                      break;
                    case 2:
                      g[y[0]][y[1]] = k;
                      break;
                    case 3:
                      g[y[0]][y[1]][y[2]] = k;
                      break;
                    case 4:
                      g[y[0]][y[1]][y[2]][y[3]] = k;
                      break;
                    case 5:
                      g[y[0]][y[1]][y[2]][y[3]][y[4]] = k;
                      break;
                  }
                  g.needsUpdate = !0;
                };
                m.src.length > 0 ? Nn(m.src).then((k) => {
                  k.offset.set(m.offset[0], m.offset[1]), k.repeat.set(m.repeat[0], m.repeat[1]), P(k);
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
          onChange: (c, m) => {
            t.updateObject(n.uuid, `material.${r}`, m);
            const p = t.getScene(n.uuid);
            if (p !== null) {
              const _ = p.getObjectByProperty("uuid", n.uuid);
              ge(_, `material.${r}`, m);
            }
          }
        };
      {
        const c = [], m = i === "defines" || i === "extensions";
        try {
          for (const p in e) {
            const _ = e[p];
            if (_ !== void 0)
              if (_.value !== void 0) {
                const v = Yt(`${p}.value`, _.value, n, t, r, m);
                v !== void 0 && c.push(v);
              } else {
                const v = Yt(p, _, n, t, r, m);
                v !== void 0 && c.push(v);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", i, e);
        }
        if (c.length > 0)
          return Li(c), {
            title: o,
            items: c
          };
      }
    }
  }
}
function Ji(i, e, n) {
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
  return Li(t), t.push({
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
        /* @__PURE__ */ u.jsx(
          ut,
          {
            title: `Material ${a}`,
            items: Ji(n[a], i, e)
          },
          `Material ${a}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: t });
  } else
    return /* @__PURE__ */ u.jsx(
      ut,
      {
        title: "Material",
        items: Ji(n, i, e)
      }
    );
}
const Qi = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function ua(i) {
  const e = i.step !== void 0 ? i.step : 0.01, n = de(null), t = de(null), s = de(null), a = de(null), o = de(null), [r] = W(i.value), [h, c] = W(i.value.offset[0]), [m, p] = W(i.value.offset[1]), [_, v] = W(i.value.repeat[0]), [R, P] = W(i.value.repeat[1]);
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
  function g(y) {
    const x = n.current.src, O = y.target.value;
    switch (y.target) {
      case t.current:
        c(O), k(x, O, m, _, R);
        break;
      case s.current:
        p(O), k(x, h, O, _, R);
        break;
      case a.current:
        v(O), k(x, h, m, O, R);
        break;
      case o.current:
        P(O), k(x, h, m, _, O);
        break;
    }
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ u.jsx("img", { alt: i.title, ref: n, onClick: () => {
      Qs().then((y) => {
        n.current.src = y, k(y, h, m, _, R);
      });
    }, src: r.src.length > 0 ? r.src : Qi }),
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: h,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: m,
            step: e,
            onChange: g
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
            value: _,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: o,
            type: "number",
            value: R,
            step: e,
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ u.jsx("button", { onClick: () => {
        k("", h, m, _, R), n.current.src = Qi;
      }, children: "Clear" })
    ] })
  ] });
}
function ii(i) {
  let e = i.value;
  e !== void 0 && (e.isColor !== void 0 ? e = Gi(i.value) : i.type === "color" && (e = Gi(new di(i.value))));
  const [n, t] = W(e), s = de(null), a = (c) => {
    let m = c.target.value;
    i.type === "boolean" ? m = c.target.checked : i.type === "option" && (m = i.options[m].value), t(m), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, m);
  }, o = {};
  i.disabled && (o.opacity = 0.8);
  const r = i.type === "string" && (n.length > 100 || n.search(`
`) > -1), h = r || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${h ? "block" : ""}`, style: o, children: [
    i.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: s, children: ai(i.title) }, "fieldLabel"),
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
    i.type === "range" && /* @__PURE__ */ u.jsx(
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
    i.type === "image" && /* @__PURE__ */ u.jsx(ua, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: a, disabled: i.disabled, defaultValue: i.value, children: i.options?.map((c, m) => /* @__PURE__ */ u.jsx("option", { value: c.value, children: ai(c.title) }, m)) }) }),
    i.type === "vector2" && /* @__PURE__ */ u.jsx(Ks, { step: i.step, value: n, min: 0, max: 1, onChange: a }),
    i.type === "grid3" && /* @__PURE__ */ u.jsx(qi, { step: i.step, value: n, onChange: a }),
    i.type === "grid4" && /* @__PURE__ */ u.jsx(Xs, { step: i.step, value: n, onChange: a }),
    i.type === "euler" && /* @__PURE__ */ u.jsx(qi, { step: i.step, value: n, onChange: a })
  ] });
}
function ma(i) {
  return "items" in i;
}
function ut(i) {
  const e = [];
  return i.items.forEach((n) => {
    ma(n) ? e.push(
      /* @__PURE__ */ u.jsx(ut, { title: ai(n.title), items: n.items }, Math.random())
    ) : e.push(
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
  }), /* @__PURE__ */ u.jsx(oi, { label: i.title, open: i.expanded === !0, children: e });
}
function pa(i) {
  const [e] = W([]), [n] = W([]), [t, s] = W(0);
  return $e(() => {
    const a = (r) => {
      const h = JSON.parse(r.value), c = [];
      h.items.forEach((m) => {
        c.push({
          title: m.title,
          type: m.type,
          value: m.value,
          prop: m.prop,
          min: m.min,
          max: m.max,
          step: m.step,
          onChange: (p, _) => {
            i.three.updateGroup(h.title, p, _);
          }
        });
      }), e.push(
        /* @__PURE__ */ u.jsx(
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
      for (let m = 0; m < c; m++)
        if (h === n[m]) {
          e.splice(m, 1), n.splice(m, 1), s(Date.now());
          return;
        }
    };
    return j.addEventListener(N.ADD_GROUP, a), j.addEventListener(N.REMOVE_GROUP, o), () => {
      j.removeEventListener(N.ADD_GROUP, a), j.removeEventListener(N.REMOVE_GROUP, o);
    };
  }, []), /* @__PURE__ */ u.jsx("div", { className: "customGroups", children: e }, t);
}
function en(i) {
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
        title: en(t),
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
        title: en(t),
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
  return /* @__PURE__ */ u.jsx(
    ut,
    {
      title: "Camera",
      items: n
    }
  );
}
function ga(i, e) {
  const n = new kn();
  n.elements = i.matrix;
  const t = new he(), s = new cs(), a = new he();
  i.uuid.length > 0 && (t.setFromMatrixPosition(n), s.setFromRotationMatrix(n), a.setFromMatrixScale(n));
  const o = (r, h) => {
    const c = r === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    e.updateObject(i.uuid, r, c);
    const m = e.getScene(i.uuid);
    if (m !== null) {
      const p = m.getObjectByProperty("uuid", i.uuid);
      ge(p, r, c);
    }
  };
  return /* @__PURE__ */ u.jsx(
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
function tn(i) {
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
function _a(i, e) {
  const n = [];
  if (i.lightInfo !== void 0)
    for (const t in i.lightInfo) {
      const s = i.lightInfo[t];
      s !== void 0 && (s.isColor !== void 0 ? n.push({
        title: tn(t),
        prop: t,
        type: "color",
        value: s,
        onChange: (a, o) => {
          const r = new di(o);
          e.updateObject(i.uuid, a, r);
          const h = e.getScene(i.uuid);
          if (h !== null) {
            const c = h.getObjectByProperty("uuid", i.uuid);
            ge(c, a, r);
          }
        }
      }) : n.push({
        title: tn(t),
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
  return /* @__PURE__ */ u.jsx(
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
            onChange: (m, p) => {
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
  return /* @__PURE__ */ u.jsx(ut, { title: "Animation", items: n });
}
const Yn = {
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
let Pe = { ...Yn };
function ya(i) {
  const [e, n] = W(-1);
  $e(() => {
    function o(h) {
      Pe = { ...h.value }, n(Date.now());
    }
    function r() {
      Pe = { ...Yn }, n(Date.now());
    }
    return j.addEventListener(N.SET_SCENE, r), j.addEventListener(N.SET_OBJECT, o), () => {
      j.removeEventListener(N.SET_SCENE, r), j.removeEventListener(N.SET_OBJECT, o);
    };
  }, []);
  const t = Pe.type.toLowerCase(), s = Pe.animations.length > 0 || Pe.mixer !== void 0, a = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ u.jsx(oi, { label: "Inspector", children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: i.class, children: Pe.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
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
      ga(Pe, i.three),
      s ? va(Pe, i.three) : null,
      t.search("camera") > -1 ? fa(Pe, i.three) : null,
      t.search("light") > -1 ? _a(Pe, i.three) : null,
      a ? ha(Pe, i.three) : null
    ] })
  ] }) }, e) }, "Inspector");
}
function Ea(i) {
  const [e] = W([]), [n] = W([]), [t, s] = W(0), a = (h) => {
    const c = h.value;
    e.push(c), n.push(
      /* @__PURE__ */ u.jsx(
        oi,
        {
          label: `Scene: ${c.name}`,
          scene: c,
          open: !0,
          onRefresh: () => {
            i.three.refreshScene(c.name);
          },
          children: /* @__PURE__ */ u.jsx(Xi, { child: c, scene: c, three: i.three })
        },
        Math.random()
      )
    ), s(Date.now());
  }, o = (h) => {
    const c = h.value;
    for (let m = 0; m < e.length; m++)
      if (c.uuid === e[m].uuid) {
        e[m] = c, n[m] = /* @__PURE__ */ u.jsx(
          oi,
          {
            label: `Scene: ${c.name}`,
            scene: c,
            open: !0,
            onRefresh: () => {
              i.three.refreshScene(c.name);
            },
            children: /* @__PURE__ */ u.jsx(Xi, { child: c, scene: c, three: i.three })
          },
          Math.random()
        ), s(Date.now());
        return;
      }
  }, r = (h) => {
    const c = h.value;
    for (let m = 0; m < e.length; m++)
      if (c.uuid === e[m].uuid) {
        e.splice(m, 1), n.splice(m, 1), s(Date.now());
        return;
      }
  };
  return $e(() => (j.addEventListener(N.ADD_SCENE, a), j.addEventListener(N.REFRESH_SCENE, o), j.addEventListener(N.REMOVE_SCENE, r), () => {
    j.removeEventListener(N.ADD_SCENE, a), j.removeEventListener(N.REFRESH_SCENE, o), j.removeEventListener(N.REMOVE_SCENE, r);
  }), []), /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ u.jsx("div", { className: "scenes", children: n }, t),
    /* @__PURE__ */ u.jsx(ya, { three: i.three }),
    /* @__PURE__ */ u.jsx(pa, { three: i.three })
  ] });
}
function Ka(i) {
  return $e(() => {
    function e(r) {
      let h = null;
      return i.three.scenes.forEach((c) => {
        r.search(c.uuid) > -1 && (h = c);
      }), h;
    }
    const n = (r) => {
      const h = r.value, m = e(h)?.getObjectByProperty("uuid", h);
      m !== void 0 && i.three.setObject(m);
    }, t = (r, h, c) => {
      const p = e(r)?.getObjectByProperty("uuid", r);
      p !== void 0 && ge(p, h, c);
    }, s = (r) => {
      const h = r.value, { key: c, value: m, uuid: p } = h;
      t(p, c, m);
    }, a = (r) => {
      const h = r.value, m = e(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (m !== void 0) {
        const p = (_) => {
          const v = h.key.split(".");
          switch (v.length) {
            case 1:
              m[v[0]] = _;
              break;
            case 2:
              m[v[0]][v[1]] = _;
              break;
            case 3:
              m[v[0]][v[1]][v[2]] = _;
              break;
            case 4:
              m[v[0]][v[1]][v[2]][v[3]] = _;
              break;
            case 5:
              m[v[0]][v[1]][v[2]][v[3]][v[4]] = _;
              break;
          }
          m.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? Nn(h.value.src).then((_) => {
          _.offset.set(h.value.offset[0], h.value.offset[1]), _.repeat.set(h.value.repeat[0], h.value.repeat[1]), p(_);
        }) : p(null);
      }
    }, o = (r) => {
      const { key: h, uuid: c, value: m, subitem: p } = r.value, v = e(c)?.getObjectByProperty("uuid", c);
      if (v !== void 0)
        try {
          p !== void 0 ? js(v, p)[h](m) : v[h](m);
        } catch (R) {
          console.log("Error requesting method:"), console.log(R), console.log(h), console.log(m);
        }
    };
    return j.addEventListener(N.GET_OBJECT, n), j.addEventListener(N.UPDATE_OBJECT, s), j.addEventListener(N.CREATE_TEXTURE, a), j.addEventListener(N.REQUEST_METHOD, o), () => {
      j.removeEventListener(N.GET_OBJECT, n), j.removeEventListener(N.UPDATE_OBJECT, s), j.removeEventListener(N.CREATE_TEXTURE, a), j.removeEventListener(N.REQUEST_METHOD, o);
    };
  }, []), null;
}
class ba extends ls {
  constructor(e, n) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], s = new si();
    s.setAttribute("position", new Vt(t, 3)), s.computeBoundingSphere();
    const a = new ds({ fog: !1 });
    super(s, a), this.light = e, this.color = n, this.type = "RectAreaLightHelper";
    const o = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], r = new si();
    r.setAttribute("position", new Vt(o, 3)), r.computeBoundingSphere(), this.add(new li(r, new ni({ side: yn, fog: !1 })));
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
const nn = { type: "change" }, _i = { type: "start" }, sn = { type: "end" }, Kt = new hs(), an = new us(), Oa = Math.cos(70 * ms.DEG2RAD);
class Ca extends vn {
  constructor(e, n) {
    super(), this.object = e, this.domElement = n, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new he(), this.cursor = new he(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Tt.ROTATE, MIDDLE: Tt.DOLLY, RIGHT: Tt.PAN }, this.touches = { ONE: xt.ROTATE, TWO: xt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
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
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(nn), t.update(), a = s.NONE;
    }, this.update = function() {
      const d = new he(), w = new wi().setFromUnitVectors(e.up, new he(0, 1, 0)), G = w.clone().invert(), Q = new he(), Oe = new wi(), Be = new he(), Me = 2 * Math.PI;
      return function($t = null) {
        const Zt = t.object.position;
        d.copy(Zt).sub(t.target), d.applyQuaternion(w), r.setFromVector3(d), t.autoRotate && a === s.NONE && je(qe($t)), t.enableDamping ? (r.theta += h.theta * t.dampingFactor, r.phi += h.phi * t.dampingFactor) : (r.theta += h.theta, r.phi += h.phi);
        let He = t.minAzimuthAngle, Ye = t.maxAzimuthAngle;
        isFinite(He) && isFinite(Ye) && (He < -Math.PI ? He += Me : He > Math.PI && (He -= Me), Ye < -Math.PI ? Ye += Me : Ye > Math.PI && (Ye -= Me), He <= Ye ? r.theta = Math.max(He, Math.min(Ye, r.theta)) : r.theta = r.theta > (He + Ye) / 2 ? Math.max(He, r.theta) : Math.min(Ye, r.theta)), r.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, r.phi)), r.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(m, t.dampingFactor) : t.target.add(m), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let ft = !1;
        if (t.zoomToCursor && A || t.object.isOrthographicCamera)
          r.radius = nt(r.radius);
        else {
          const Ke = r.radius;
          r.radius = nt(r.radius * c), ft = Ke != r.radius;
        }
        if (d.setFromSpherical(r), d.applyQuaternion(G), Zt.copy(t.target).add(d), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, m.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), m.set(0, 0, 0)), t.zoomToCursor && A) {
          let Ke = null;
          if (t.object.isPerspectiveCamera) {
            const dt = d.length();
            Ke = nt(dt * c);
            const Ot = dt - Ke;
            t.object.position.addScaledVector(O, Ot), t.object.updateMatrixWorld(), ft = !!Ot;
          } else if (t.object.isOrthographicCamera) {
            const dt = new he(L.x, L.y, 0);
            dt.unproject(t.object);
            const Ot = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / c)), t.object.updateProjectionMatrix(), ft = Ot !== t.object.zoom;
            const Wt = new he(L.x, L.y, 0);
            Wt.unproject(t.object), t.object.position.sub(Wt).add(dt), t.object.updateMatrixWorld(), Ke = d.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(Ke).add(t.object.position) : (Kt.origin.copy(t.object.position), Kt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(Kt.direction)) < Oa ? e.lookAt(t.target) : (an.setFromNormalAndCoplanarPoint(t.object.up, t.target), Kt.intersectPlane(an, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const Ke = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / c)), Ke !== t.object.zoom && (t.object.updateProjectionMatrix(), ft = !0);
        }
        return c = 1, A = !1, ft || Q.distanceToSquared(t.object.position) > o || 8 * (1 - Oe.dot(t.object.quaternion)) > o || Be.distanceToSquared(t.target) > o ? (t.dispatchEvent(nn), Q.copy(t.object.position), Oe.copy(t.object.quaternion), Be.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", Je), t.domElement.removeEventListener("pointerdown", Te), t.domElement.removeEventListener("pointercancel", Ie), t.domElement.removeEventListener("wheel", Y), t.domElement.removeEventListener("pointermove", we), t.domElement.removeEventListener("pointerup", Ie), t.domElement.getRootNode().removeEventListener("keydown", X, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", ke), t._domElementKeyEvents = null);
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
    const o = 1e-6, r = new Mi(), h = new Mi();
    let c = 1;
    const m = new he(), p = new De(), _ = new De(), v = new De(), R = new De(), P = new De(), k = new De(), g = new De(), y = new De(), x = new De(), O = new he(), L = new De();
    let A = !1;
    const C = [], re = {};
    let ee = !1;
    function qe(d) {
      return d !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * d : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function U(d) {
      const w = Math.abs(d * 0.01);
      return Math.pow(0.95, t.zoomSpeed * w);
    }
    function je(d) {
      h.theta -= d;
    }
    function Ee(d) {
      h.phi -= d;
    }
    const xe = function() {
      const d = new he();
      return function(G, Q) {
        d.setFromMatrixColumn(Q, 0), d.multiplyScalar(-G), m.add(d);
      };
    }(), Se = function() {
      const d = new he();
      return function(G, Q) {
        t.screenSpacePanning === !0 ? d.setFromMatrixColumn(Q, 1) : (d.setFromMatrixColumn(Q, 0), d.crossVectors(t.object.up, d)), d.multiplyScalar(G), m.add(d);
      };
    }(), Ne = function() {
      const d = new he();
      return function(G, Q) {
        const Oe = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const Be = t.object.position;
          d.copy(Be).sub(t.target);
          let Me = d.length();
          Me *= Math.tan(t.object.fov / 2 * Math.PI / 180), xe(2 * G * Me / Oe.clientHeight, t.object.matrix), Se(2 * Q * Me / Oe.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (xe(G * (t.object.right - t.object.left) / t.object.zoom / Oe.clientWidth, t.object.matrix), Se(Q * (t.object.top - t.object.bottom) / t.object.zoom / Oe.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Ze(d) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? c /= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function rt(d) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? c *= d : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function it(d, w) {
      if (!t.zoomToCursor)
        return;
      A = !0;
      const G = t.domElement.getBoundingClientRect(), Q = d - G.left, Oe = w - G.top, Be = G.width, Me = G.height;
      L.x = Q / Be * 2 - 1, L.y = -(Oe / Me) * 2 + 1, O.set(L.x, L.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function nt(d) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, d));
    }
    function mt(d) {
      p.set(d.clientX, d.clientY);
    }
    function ot(d) {
      it(d.clientX, d.clientX), g.set(d.clientX, d.clientY);
    }
    function _e(d) {
      R.set(d.clientX, d.clientY);
    }
    function We(d) {
      _.set(d.clientX, d.clientY), v.subVectors(_, p).multiplyScalar(t.rotateSpeed);
      const w = t.domElement;
      je(2 * Math.PI * v.x / w.clientHeight), Ee(2 * Math.PI * v.y / w.clientHeight), p.copy(_), t.update();
    }
    function It(d) {
      y.set(d.clientX, d.clientY), x.subVectors(y, g), x.y > 0 ? Ze(U(x.y)) : x.y < 0 && rt(U(x.y)), g.copy(y), t.update();
    }
    function pt(d) {
      P.set(d.clientX, d.clientY), k.subVectors(P, R).multiplyScalar(t.panSpeed), Ne(k.x, k.y), R.copy(P), t.update();
    }
    function Ae(d) {
      it(d.clientX, d.clientY), d.deltaY < 0 ? rt(U(d.deltaY)) : d.deltaY > 0 && Ze(U(d.deltaY)), t.update();
    }
    function E(d) {
      let w = !1;
      switch (d.code) {
        case t.keys.UP:
          d.ctrlKey || d.metaKey || d.shiftKey ? Ee(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ne(0, t.keyPanSpeed), w = !0;
          break;
        case t.keys.BOTTOM:
          d.ctrlKey || d.metaKey || d.shiftKey ? Ee(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ne(0, -t.keyPanSpeed), w = !0;
          break;
        case t.keys.LEFT:
          d.ctrlKey || d.metaKey || d.shiftKey ? je(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ne(t.keyPanSpeed, 0), w = !0;
          break;
        case t.keys.RIGHT:
          d.ctrlKey || d.metaKey || d.shiftKey ? je(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : Ne(-t.keyPanSpeed, 0), w = !0;
          break;
      }
      w && (d.preventDefault(), t.update());
    }
    function T(d) {
      if (C.length === 1)
        p.set(d.pageX, d.pageY);
      else {
        const w = lt(d), G = 0.5 * (d.pageX + w.x), Q = 0.5 * (d.pageY + w.y);
        p.set(G, Q);
      }
    }
    function D(d) {
      if (C.length === 1)
        R.set(d.pageX, d.pageY);
      else {
        const w = lt(d), G = 0.5 * (d.pageX + w.x), Q = 0.5 * (d.pageY + w.y);
        R.set(G, Q);
      }
    }
    function F(d) {
      const w = lt(d), G = d.pageX - w.x, Q = d.pageY - w.y, Oe = Math.sqrt(G * G + Q * Q);
      g.set(0, Oe);
    }
    function me(d) {
      t.enableZoom && F(d), t.enablePan && D(d);
    }
    function K(d) {
      t.enableZoom && F(d), t.enableRotate && T(d);
    }
    function M(d) {
      if (C.length == 1)
        _.set(d.pageX, d.pageY);
      else {
        const G = lt(d), Q = 0.5 * (d.pageX + G.x), Oe = 0.5 * (d.pageY + G.y);
        _.set(Q, Oe);
      }
      v.subVectors(_, p).multiplyScalar(t.rotateSpeed);
      const w = t.domElement;
      je(2 * Math.PI * v.x / w.clientHeight), Ee(2 * Math.PI * v.y / w.clientHeight), p.copy(_);
    }
    function I(d) {
      if (C.length === 1)
        P.set(d.pageX, d.pageY);
      else {
        const w = lt(d), G = 0.5 * (d.pageX + w.x), Q = 0.5 * (d.pageY + w.y);
        P.set(G, Q);
      }
      k.subVectors(P, R).multiplyScalar(t.panSpeed), Ne(k.x, k.y), R.copy(P);
    }
    function pe(d) {
      const w = lt(d), G = d.pageX - w.x, Q = d.pageY - w.y, Oe = Math.sqrt(G * G + Q * Q);
      y.set(0, Oe), x.set(0, Math.pow(y.y / g.y, t.zoomSpeed)), Ze(x.y), g.copy(y);
      const Be = (d.pageX + w.x) * 0.5, Me = (d.pageY + w.y) * 0.5;
      it(Be, Me);
    }
    function be(d) {
      t.enableZoom && pe(d), t.enablePan && I(d);
    }
    function st(d) {
      t.enableZoom && pe(d), t.enableRotate && M(d);
    }
    function Te(d) {
      t.enabled !== !1 && (C.length === 0 && (t.domElement.setPointerCapture(d.pointerId), t.domElement.addEventListener("pointermove", we), t.domElement.addEventListener("pointerup", Ie)), !pi(d) && (bt(d), d.pointerType === "touch" ? ze(d) : ne(d)));
    }
    function we(d) {
      t.enabled !== !1 && (d.pointerType === "touch" ? ct(d) : ve(d));
    }
    function Ie(d) {
      switch (mi(d), C.length) {
        case 0:
          t.domElement.releasePointerCapture(d.pointerId), t.domElement.removeEventListener("pointermove", we), t.domElement.removeEventListener("pointerup", Ie), t.dispatchEvent(sn), a = s.NONE;
          break;
        case 1:
          const w = C[0], G = re[w];
          ze({ pointerId: w, pageX: G.x, pageY: G.y });
          break;
      }
    }
    function ne(d) {
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
            _e(d), a = s.PAN;
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
            _e(d), a = s.PAN;
          }
          break;
        default:
          a = s.NONE;
      }
      a !== s.NONE && t.dispatchEvent(_i);
    }
    function ve(d) {
      switch (a) {
        case s.ROTATE:
          if (t.enableRotate === !1)
            return;
          We(d);
          break;
        case s.DOLLY:
          if (t.enableZoom === !1)
            return;
          It(d);
          break;
        case s.PAN:
          if (t.enablePan === !1)
            return;
          pt(d);
          break;
      }
    }
    function Y(d) {
      t.enabled === !1 || t.enableZoom === !1 || a !== s.NONE || (d.preventDefault(), t.dispatchEvent(_i), Ae(z(d)), t.dispatchEvent(sn));
    }
    function z(d) {
      const w = d.deltaMode, G = {
        clientX: d.clientX,
        clientY: d.clientY,
        deltaY: d.deltaY
      };
      switch (w) {
        case 1:
          G.deltaY *= 16;
          break;
        case 2:
          G.deltaY *= 100;
          break;
      }
      return d.ctrlKey && !ee && (G.deltaY *= 10), G;
    }
    function X(d) {
      d.key === "Control" && (ee = !0, t.domElement.getRootNode().addEventListener("keyup", J, { passive: !0, capture: !0 }));
    }
    function J(d) {
      d.key === "Control" && (ee = !1, t.domElement.getRootNode().removeEventListener("keyup", J, { passive: !0, capture: !0 }));
    }
    function ke(d) {
      t.enabled === !1 || t.enablePan === !1 || E(d);
    }
    function ze(d) {
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
              me(d), a = s.TOUCH_DOLLY_PAN;
              break;
            case xt.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              K(d), a = s.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = s.NONE;
          }
          break;
        default:
          a = s.NONE;
      }
      a !== s.NONE && t.dispatchEvent(_i);
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
          I(d), t.update();
          break;
        case s.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          be(d), t.update();
          break;
        case s.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          st(d), t.update();
          break;
        default:
          a = s.NONE;
      }
    }
    function Je(d) {
      t.enabled !== !1 && d.preventDefault();
    }
    function bt(d) {
      C.push(d.pointerId);
    }
    function mi(d) {
      delete re[d.pointerId];
      for (let w = 0; w < C.length; w++)
        if (C[w] == d.pointerId) {
          C.splice(w, 1);
          return;
        }
    }
    function pi(d) {
      for (let w = 0; w < C.length; w++)
        if (C[w] == d.pointerId)
          return !0;
      return !1;
    }
    function Gt(d) {
      let w = re[d.pointerId];
      w === void 0 && (w = new De(), re[d.pointerId] = w), w.set(d.pageX, d.pageY);
    }
    function lt(d) {
      const w = d.pointerId === C[0] ? C[1] : C[0];
      return re[w];
    }
    t.domElement.addEventListener("contextmenu", Je), t.domElement.addEventListener("pointerdown", Te), t.domElement.addEventListener("pointercancel", Ie), t.domElement.addEventListener("wheel", Y, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", X, { passive: !0, capture: !0 }), this.update();
  }
}
const Ta = Math.PI / 180;
function wt(i, e, n, t, s) {
  return t + (i - e) * (s - t) / (n - e);
}
function rn(i) {
  return i * Ta;
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const ue = {
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
function gt(i) {
  return i.isPerspectiveCamera;
}
function ht(i) {
  return i.isOrthographicCamera;
}
const Rt = Math.PI * 2, on = Math.PI / 2, Vn = 1e-5, jt = Math.PI / 180;
function Xe(i, e, n) {
  return Math.max(e, Math.min(n, i));
}
function le(i, e = Vn) {
  return Math.abs(i) < e;
}
function se(i, e, n = Vn) {
  return le(i - e, n);
}
function cn(i, e) {
  return Math.round(i / e) * e;
}
function Nt(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function zt(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function Xt(i, e, n, t, s = 1 / 0, a) {
  t = Math.max(1e-4, t);
  const o = 2 / t, r = o * a, h = 1 / (1 + r + 0.48 * r * r + 0.235 * r * r * r);
  let c = i - e;
  const m = e, p = s * t;
  c = Xe(c, -p, p), e = i - c;
  const _ = (n.value + o * c) * a;
  n.value = (n.value - o * _) * h;
  let v = e + (c + _) * h;
  return m - i > 0 == v > m && (v = m, n.value = (v - m) / a), v;
}
function ln(i, e, n, t, s = 1 / 0, a, o) {
  t = Math.max(1e-4, t);
  const r = 2 / t, h = r * a, c = 1 / (1 + h + 0.48 * h * h + 0.235 * h * h * h);
  let m = e.x, p = e.y, _ = e.z, v = i.x - m, R = i.y - p, P = i.z - _;
  const k = m, g = p, y = _, x = s * t, O = x * x, L = v * v + R * R + P * P;
  if (L > O) {
    const Se = Math.sqrt(L);
    v = v / Se * x, R = R / Se * x, P = P / Se * x;
  }
  m = i.x - v, p = i.y - R, _ = i.z - P;
  const A = (n.x + r * v) * a, C = (n.y + r * R) * a, re = (n.z + r * P) * a;
  n.x = (n.x - r * A) * c, n.y = (n.y - r * C) * c, n.z = (n.z - r * re) * c, o.x = m + (v + A) * c, o.y = p + (R + C) * c, o.z = _ + (P + re) * c;
  const ee = k - i.x, qe = g - i.y, U = y - i.z, je = o.x - k, Ee = o.y - g, xe = o.z - y;
  return ee * je + qe * Ee + U * xe > 0 && (o.x = k, o.y = g, o.z = y, n.x = (o.x - k) / a, n.y = (o.y - g) / a, n.z = (o.z - y) / a), o;
}
function vi(i, e) {
  e.set(0, 0), i.forEach((n) => {
    e.x += n.clientX, e.y += n.clientY;
  }), e.x /= i.length, e.y /= i.length;
}
function yi(i, e) {
  return ht(i) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class xa {
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
var Ei;
const Sa = "2.9.0", qt = 1 / 8, wa = /Mac/.test((Ei = globalThis?.navigator) === null || Ei === void 0 ? void 0 : Ei.platform);
let B, dn, Jt, bi, Le, V, te, Dt, Bt, Qe, et, _t, hn, un, Ge, Ht, At, mn, Oi, pn, Ci, Ti, Qt;
class tt extends xa {
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
    B = e.THREE, dn = Object.freeze(new B.Vector3(0, 0, 0)), Jt = Object.freeze(new B.Vector3(0, 1, 0)), bi = Object.freeze(new B.Vector3(0, 0, 1)), Le = new B.Vector2(), V = new B.Vector3(), te = new B.Vector3(), Dt = new B.Vector3(), Bt = new B.Vector3(), Qe = new B.Vector3(), et = new B.Vector3(), _t = new B.Vector3(), hn = new B.Vector3(), un = new B.Vector3(), Ge = new B.Spherical(), Ht = new B.Spherical(), At = new B.Box3(), mn = new B.Box3(), Oi = new B.Sphere(), pn = new B.Quaternion(), Ci = new B.Quaternion(), Ti = new B.Matrix4(), Qt = new B.Raycaster();
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
    }, this._enabled = !0, this._state = f.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = Mt.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new B.Vector3(), this._focalOffsetVelocity = new B.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (g, y, x) => {
      let O, L;
      if (gt(this._camera)) {
        const A = V.copy(this._camera.position).sub(this._target), C = this._camera.getEffectiveFOV() * jt, re = A.length() * Math.tan(C * 0.5);
        O = this.truckSpeed * g * re / this._elementRect.height, L = this.truckSpeed * y * re / this._elementRect.height;
      } else if (ht(this._camera)) {
        const A = this._camera;
        O = g * (A.right - A.left) / A.zoom / this._elementRect.width, L = y * (A.top - A.bottom) / A.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (x ? this.setFocalOffset(this._focalOffsetEnd.x + O, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(O, 0, !0), this.forward(-L, !0)) : x ? this.setFocalOffset(this._focalOffsetEnd.x + O, this._focalOffsetEnd.y + L, this._focalOffsetEnd.z, !0) : this.truck(O, L, !0);
    }, this._rotateInternal = (g, y) => {
      const x = Rt * this.azimuthRotateSpeed * g / this._elementRect.height, O = Rt * this.polarRotateSpeed * y / this._elementRect.height;
      this.rotate(x, O, !0);
    }, this._dollyInternal = (g, y, x) => {
      const O = Math.pow(0.95, -g * this.dollySpeed), L = this._sphericalEnd.radius, A = this._sphericalEnd.radius * O, C = Xe(A, this.minDistance, this.maxDistance), re = C - A;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(A, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(re, !0), this._dollyToNoClamp(C, !0)) : this._dollyToNoClamp(C, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? A : C) - L, this._dollyControlCoord.set(y, x)), this._lastDollyDirection = Math.sign(-g);
    }, this._zoomInternal = (g, y, x) => {
      const O = Math.pow(0.95, g * this.dollySpeed), L = this._zoom, A = this._zoom * O;
      this.zoomTo(A, !0), this.dollyToCursor && (this._changedZoom += A - L, this._dollyControlCoord.set(y, x));
    }, typeof B > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new B.Quaternion().setFromUnitVectors(this._camera.up, Jt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = f.NONE, this._target = new B.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new B.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new B.Spherical().setFromVector3(V.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new B.Vector3(),
      new B.Vector3(),
      new B.Vector3(),
      new B.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new B.Box3(new B.Vector3(-1 / 0, -1 / 0, -1 / 0), new B.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new B.Vector2(), this.mouseButtons = {
      left: f.ROTATE,
      middle: f.DOLLY,
      right: f.TRUCK,
      wheel: gt(this._camera) ? f.DOLLY : ht(this._camera) ? f.ZOOM : f.NONE
    }, this.touches = {
      one: f.TOUCH_ROTATE,
      two: gt(this._camera) ? f.TOUCH_DOLLY_TRUCK : ht(this._camera) ? f.TOUCH_ZOOM_TRUCK : f.NONE,
      three: f.TOUCH_TRUCK
    };
    const t = new B.Vector2(), s = new B.Vector2(), a = new B.Vector2(), o = (g) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), L = g.clientX / O.width, A = g.clientY / O.height;
        if (L < this._interactiveArea.left || L > this._interactiveArea.right || A < this._interactiveArea.top || A > this._interactiveArea.bottom)
          return;
      }
      const y = g.pointerType !== "mouse" ? null : (g.buttons & ue.LEFT) === ue.LEFT ? ue.LEFT : (g.buttons & ue.MIDDLE) === ue.MIDDLE ? ue.MIDDLE : (g.buttons & ue.RIGHT) === ue.RIGHT ? ue.RIGHT : null;
      if (y !== null) {
        const O = this._findPointerByMouseButton(y);
        O && this._disposePointer(O);
      }
      if ((g.buttons & ue.LEFT) === ue.LEFT && this._lockedPointer)
        return;
      const x = {
        pointerId: g.pointerId,
        clientX: g.clientX,
        clientY: g.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: y
      };
      this._activePointers.push(x), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.addEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), this._isDragging = !0, _(g);
    }, r = (g) => {
      g.cancelable && g.preventDefault();
      const y = g.pointerId, x = this._lockedPointer || this._findPointerById(y);
      if (x) {
        if (x.clientX = g.clientX, x.clientY = g.clientY, x.deltaX = g.movementX, x.deltaY = g.movementY, this._state = 0, g.pointerType === "touch")
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (g.buttons & ue.LEFT) === ue.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (g.buttons & ue.MIDDLE) === ue.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (g.buttons & ue.RIGHT) === ue.RIGHT && (this._state = this._state | this.mouseButtons.right);
        v();
      }
    }, h = (g) => {
      const y = this._findPointerById(g.pointerId);
      if (!(y && y === this._lockedPointer)) {
        if (y && this._disposePointer(y), g.pointerType === "touch")
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
    const m = (g) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === f.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const A = this._domElement.getBoundingClientRect(), C = g.clientX / A.width, re = g.clientY / A.height;
        if (C < this._interactiveArea.left || C > this._interactiveArea.right || re < this._interactiveArea.top || re > this._interactiveArea.bottom)
          return;
      }
      if (g.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === f.ROTATE || this.mouseButtons.wheel === f.TRUCK) {
        const A = performance.now();
        c - A < 1e3 && this._getClientRect(this._elementRect), c = A;
      }
      const y = wa ? -1 : -3, x = g.deltaMode === 1 ? g.deltaY / y : g.deltaY / (y * 10), O = this.dollyToCursor ? (g.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, L = this.dollyToCursor ? (g.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case f.ROTATE: {
          this._rotateInternal(g.deltaX, g.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case f.TRUCK: {
          this._truckInternal(g.deltaX, g.deltaY, !1), this._isUserControllingTruck = !0;
          break;
        }
        case f.OFFSET: {
          this._truckInternal(g.deltaX, g.deltaY, !0), this._isUserControllingOffset = !0;
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
    }, p = (g) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === tt.ACTION.NONE) {
          const y = g instanceof PointerEvent ? g.pointerId : 0, x = this._findPointerById(y);
          x && this._disposePointer(x), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h);
          return;
        }
        g.preventDefault();
      }
    }, _ = (g) => {
      if (!this._enabled)
        return;
      if (vi(this._activePointers, Le), this._getClientRect(this._elementRect), t.copy(Le), s.copy(Le), this._activePointers.length >= 2) {
        const x = Le.x - this._activePointers[1].clientX, O = Le.y - this._activePointers[1].clientY, L = Math.sqrt(x * x + O * O);
        a.set(0, L);
        const A = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, C = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        s.set(A, C);
      }
      if (this._state = 0, !g)
        this._lockedPointer && (this._state = this._state | this.mouseButtons.left);
      else if ("pointerType" in g && g.pointerType === "touch")
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
        !this._lockedPointer && (g.buttons & ue.LEFT) === ue.LEFT && (this._state = this._state | this.mouseButtons.left), (g.buttons & ue.MIDDLE) === ue.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (g.buttons & ue.RIGHT) === ue.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & f.ROTATE) === f.ROTATE || (this._state & f.TOUCH_ROTATE) === f.TOUCH_ROTATE || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & f.TRUCK) === f.TRUCK || (this._state & f.TOUCH_TRUCK) === f.TOUCH_TRUCK || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & f.DOLLY) === f.DOLLY || (this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & f.ZOOM) === f.ZOOM || (this._state & f.TOUCH_ZOOM) === f.TOUCH_ZOOM || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & f.OFFSET) === f.OFFSET || (this._state & f.TOUCH_OFFSET) === f.TOUCH_OFFSET || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, v = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, vi(this._activePointers, Le);
      const y = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, x = y ? -y.deltaX : s.x - Le.x, O = y ? -y.deltaY : s.y - Le.y;
      if (s.copy(Le), ((this._state & f.ROTATE) === f.ROTATE || (this._state & f.TOUCH_ROTATE) === f.TOUCH_ROTATE || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(x, O), this._isUserControllingRotate = !0), (this._state & f.DOLLY) === f.DOLLY || (this._state & f.ZOOM) === f.ZOOM) {
        const L = this.dollyToCursor ? (t.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, A = this.dollyToCursor ? (t.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, C = this.dollyDragInverted ? -1 : 1;
        (this._state & f.DOLLY) === f.DOLLY ? (this._dollyInternal(C * O * qt, L, A), this._isUserControllingDolly = !0) : (this._zoomInternal(C * O * qt, L, A), this._isUserControllingZoom = !0);
      }
      if ((this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_ZOOM) === f.TOUCH_ZOOM || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) {
        const L = Le.x - this._activePointers[1].clientX, A = Le.y - this._activePointers[1].clientY, C = Math.sqrt(L * L + A * A), re = a.y - C;
        a.set(0, C);
        const ee = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, qe = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(re * qt, ee, qe), this._isUserControllingDolly = !0) : (this._zoomInternal(re * qt, ee, qe), this._isUserControllingZoom = !0);
      }
      ((this._state & f.TRUCK) === f.TRUCK || (this._state & f.TOUCH_TRUCK) === f.TOUCH_TRUCK || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK) && (this._truckInternal(x, O, !1), this._isUserControllingTruck = !0), ((this._state & f.OFFSET) === f.OFFSET || (this._state & f.TOUCH_OFFSET) === f.TOUCH_OFFSET || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET) && (this._truckInternal(x, O, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, R = () => {
      vi(this._activePointers, Le), s.copy(Le), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", P), this._domElement.ownerDocument.addEventListener("pointerlockerror", k), this._domElement.ownerDocument.addEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), _());
    }, this.unlockPointer = () => {
      var g, y, x;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (g = this._domElement) === null || g === void 0 || g.ownerDocument.exitPointerLock(), (y = this._domElement) === null || y === void 0 || y.ownerDocument.removeEventListener("pointerlockchange", P), (x = this._domElement) === null || x === void 0 || x.ownerDocument.removeEventListener("pointerlockerror", k), this.cancel();
    };
    const P = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, k = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (g) => {
      this._domElement = g, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", o), this._domElement.addEventListener("pointercancel", h), this._domElement.addEventListener("wheel", m, { passive: !1 }), this._domElement.addEventListener("contextmenu", p);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", o), this._domElement.removeEventListener("pointercancel", h), this._domElement.removeEventListener("wheel", m, { passive: !1 }), this._domElement.removeEventListener("contextmenu", p), this._domElement.ownerDocument.removeEventListener("pointermove", r, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.removeEventListener("pointerlockchange", P), this._domElement.ownerDocument.removeEventListener("pointerlockerror", k));
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
    const o = !t || se(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && se(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
      const o = this._collisionTest(), r = se(o, this._spherical.radius);
      if (!(t > e) && r)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, o);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, n || (this._spherical.radius = this._sphericalEnd.radius);
    const a = !n || se(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    const t = !n || se(this._target.x, this._targetEnd.x, this.restThreshold) && se(this._target.y, this._targetEnd.y, this.restThreshold) && se(this._target.z, this._targetEnd.z, this.restThreshold);
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
    const t = !n || se(this._zoom, this._zoomEnd, this.restThreshold);
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
    this._camera.updateMatrix(), Qe.setFromMatrixColumn(this._camera.matrix, 0), et.setFromMatrixColumn(this._camera.matrix, 1), Qe.multiplyScalar(e), et.multiplyScalar(-n);
    const s = V.copy(Qe).add(et), a = te.copy(this._targetEnd).add(s);
    return this.moveTo(a.x, a.y, a.z, t);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, n = !1) {
    V.setFromMatrixColumn(this._camera.matrix, 0), V.crossVectors(this._camera.up, V), V.multiplyScalar(e);
    const t = te.copy(this._targetEnd).add(V);
    return this.moveTo(t.x, t.y, t.z, n);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, n = !1) {
    return V.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + V.x, this._targetEnd.y + V.y, this._targetEnd.z + V.z, n);
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
    const a = V.set(e, n, t).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, a, this.boundaryFriction), this._needsUpdate = !0, s || this._target.copy(this._targetEnd);
    const o = !s || se(this._target.x, this._targetEnd.x, this.restThreshold) && se(this._target.y, this._targetEnd.y, this.restThreshold) && se(this._target.z, this._targetEnd.z, this.restThreshold);
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
    const r = V.set(e, n, t).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
    const m = cn(this._sphericalEnd.theta, on), p = cn(this._sphericalEnd.phi, on);
    h.push(this.rotateTo(m, p, n));
    const _ = V.setFromSpherical(this._sphericalEnd).normalize(), v = pn.setFromUnitVectors(_, bi), R = se(Math.abs(_.y), 1);
    R && v.multiply(Ci.setFromAxisAngle(Jt, m)), v.multiply(this._yAxisUpSpaceInverse);
    const P = mn.makeEmpty();
    te.copy(c.min).applyQuaternion(v), P.expandByPoint(te), te.copy(c.min).setX(c.max.x).applyQuaternion(v), P.expandByPoint(te), te.copy(c.min).setY(c.max.y).applyQuaternion(v), P.expandByPoint(te), te.copy(c.max).setZ(c.min.z).applyQuaternion(v), P.expandByPoint(te), te.copy(c.min).setZ(c.max.z).applyQuaternion(v), P.expandByPoint(te), te.copy(c.max).setY(c.min.y).applyQuaternion(v), P.expandByPoint(te), te.copy(c.max).setX(c.min.x).applyQuaternion(v), P.expandByPoint(te), te.copy(c.max).applyQuaternion(v), P.expandByPoint(te), P.min.x -= s, P.min.y -= o, P.max.x += a, P.max.y += r, v.setFromUnitVectors(bi, _), R && v.premultiply(Ci.invert()), v.premultiply(this._yAxisUpSpace);
    const k = P.getSize(V), g = P.getCenter(te).applyQuaternion(v);
    if (gt(this._camera)) {
      const y = this.getDistanceToFitBox(k.x, k.y, k.z, t);
      h.push(this.moveTo(g.x, g.y, g.z, n)), h.push(this.dollyTo(y, n)), h.push(this.setFocalOffset(0, 0, 0, n));
    } else if (ht(this._camera)) {
      const y = this._camera, x = y.right - y.left, O = y.top - y.bottom, L = t ? Math.max(x / k.x, O / k.y) : Math.min(x / k.x, O / k.y);
      h.push(this.moveTo(g.x, g.y, g.z, n)), h.push(this.zoomTo(L, n)), h.push(this.setFocalOffset(0, 0, 0, n));
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
    const t = [], a = "isObject3D" in e ? tt.createBoundingSphere(e, Oi) : Oi.copy(e);
    if (t.push(this.moveTo(a.center.x, a.center.y, a.center.z, n)), gt(this._camera)) {
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
    const h = te.set(s, a, o), c = V.set(e, n, t);
    this._targetEnd.copy(h), this._sphericalEnd.setFromVector3(c.sub(h).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, r || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const m = !r || se(this._target.x, this._targetEnd.x, this.restThreshold) && se(this._target.y, this._targetEnd.y, this.restThreshold) && se(this._target.z, this._targetEnd.z, this.restThreshold) && se(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && se(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && se(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  lerpLookAt(e, n, t, s, a, o, r, h, c, m, p, _, v, R = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Mt.NONE, this._changedDolly = 0;
    const P = V.set(s, a, o), k = te.set(e, n, t);
    Ge.setFromVector3(k.sub(P).applyQuaternion(this._yAxisUpSpace));
    const g = Dt.set(m, p, _), y = te.set(r, h, c);
    Ht.setFromVector3(y.sub(g).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(P.lerp(g, v));
    const x = Ht.theta - Ge.theta, O = Ht.phi - Ge.phi, L = Ht.radius - Ge.radius;
    this._sphericalEnd.set(Ge.radius + L * v, Ge.phi + O * v, Ge.theta + x * v), this.normalizeRotations(), this._needsUpdate = !0, R || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const A = !R || se(this._target.x, this._targetEnd.x, this.restThreshold) && se(this._target.y, this._targetEnd.y, this.restThreshold) && se(this._target.z, this._targetEnd.z, this.restThreshold) && se(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && se(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && se(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    const a = this.getPosition(V), o = this.setLookAt(a.x, a.y, a.z, e, n, t, s);
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
    const a = !s || se(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && se(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && se(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
    this._camera.updateMatrixWorld(), Qe.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), et.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), _t.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const s = V.set(e, n, t), a = s.distanceTo(this._camera.position), o = s.sub(this._camera.position);
    Qe.multiplyScalar(o.x), et.multiplyScalar(o.y), _t.multiplyScalar(o.z), V.copy(Qe).add(et).add(_t), V.z = V.z + a, this.dollyTo(a, !1), this.setFocalOffset(-V.x, V.y, -V.z, !1), this.moveTo(e, n, t, !1);
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
    this._viewport = this._viewport || new B.Vector4(), typeof e == "number" ? this._viewport.set(e, n, t, s) : this._viewport.copy(e);
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
    if (yi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const a = e / n, o = this._camera.getEffectiveFOV() * jt, r = this._camera.aspect;
    return ((s ? a > r : a < r) ? n : e / r) * 0.5 / Math.tan(o * 0.5) + t * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (yi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const n = this._camera.getEffectiveFOV() * jt, t = Math.atan(Math.tan(n * 0.5) * this._camera.aspect) * 2, s = 1 < this._camera.aspect ? n : t;
    return e / Math.sin(s * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, n = !0) {
    return (e && e.isVector3 ? e : new B.Vector3()).copy(n ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, n = !0) {
    return (e && e.isVector3 ? e : new B.Vector3()).setFromSpherical(n ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(n ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, n = !0) {
    return (e || new B.Spherical()).copy(n ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, n = !0) {
    return (e && e.isVector3 ? e : new B.Vector3()).copy(n ? this._focalOffsetEnd : this._focalOffset);
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
    if (!se(this._camera.up.x, this._cameraUp0.x) || !se(this._camera.up.y, this._cameraUp0.y) || !se(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const t = this.getPosition(V);
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
    const e = V.subVectors(this._target, this._camera.position).normalize(), n = te.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(n, e).normalize(), this._camera.updateMatrixWorld();
    const t = this.getPosition(V);
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
    const n = this._sphericalEnd.theta - this._spherical.theta, t = this._sphericalEnd.phi - this._spherical.phi, s = this._sphericalEnd.radius - this._spherical.radius, a = hn.subVectors(this._targetEnd, this._target), o = un.subVectors(this._focalOffsetEnd, this._focalOffset), r = this._zoomEnd - this._zoom;
    if (le(n))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Xt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (le(t))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Xt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (le(s))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const p = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Xt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, p, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (le(a.x) && le(a.y) && le(a.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const p = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      ln(this._target, this._targetEnd, this._targetVelocity, p, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (le(o.x) && le(o.y) && le(o.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const p = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      ln(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, p, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (le(r))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const p = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Xt(this._zoom, this._zoomEnd, this._zoomVelocity, p, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (gt(this._camera) && this._changedDolly !== 0) {
        const p = this._spherical.radius - this._lastDistance, _ = this._camera, v = this._getCameraDirection(Bt), R = V.copy(v).cross(_.up).normalize();
        R.lengthSq() === 0 && (R.x = 1);
        const P = te.crossVectors(R, v), k = this._sphericalEnd.radius * Math.tan(_.getEffectiveFOV() * jt * 0.5), y = (this._sphericalEnd.radius - p - this._sphericalEnd.radius) / this._sphericalEnd.radius, x = Dt.copy(this._targetEnd).add(R.multiplyScalar(this._dollyControlCoord.x * k * _.aspect)).add(P.multiplyScalar(this._dollyControlCoord.y * k)), O = V.copy(this._targetEnd).lerp(x, y), L = this._lastDollyDirection === Mt.IN && this._spherical.radius <= this.minDistance, A = this._lastDollyDirection === Mt.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (L || A)) {
          this._sphericalEnd.radius -= p, this._spherical.radius -= p;
          const re = te.copy(v).multiplyScalar(-p);
          O.add(re);
        }
        this._boundary.clampPoint(O, O);
        const C = te.subVectors(O, this._targetEnd);
        this._targetEnd.copy(O), this._target.add(C), this._changedDolly -= p, le(this._changedDolly) && (this._changedDolly = 0);
      } else if (ht(this._camera) && this._changedZoom !== 0) {
        const p = this._zoom - this._lastZoom, _ = this._camera, v = V.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (_.near + _.far) / (_.near - _.far)).unproject(_), R = te.set(0, 0, -1).applyQuaternion(_.quaternion), P = Dt.copy(v).add(R.multiplyScalar(-v.dot(_.up))), g = -(this._zoom - p - this._zoom) / this._zoom, y = this._getCameraDirection(Bt), x = this._targetEnd.dot(y), O = V.copy(this._targetEnd).lerp(P, g), L = O.dot(y), A = y.multiplyScalar(L - x);
        O.sub(A), this._boundary.clampPoint(O, O);
        const C = te.subVectors(O, this._targetEnd);
        this._targetEnd.copy(O), this._target.add(C), this._changedZoom -= p, le(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const h = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, h), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!le(this._focalOffset.x) || !le(this._focalOffset.y) || !le(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Qe.setFromMatrixColumn(this._camera.matrix, 0), et.setFromMatrixColumn(this._camera.matrix, 1), _t.setFromMatrixColumn(this._camera.matrix, 2), Qe.multiplyScalar(this._focalOffset.x), et.multiplyScalar(-this._focalOffset.y), _t.multiplyScalar(this._focalOffset.z), V.copy(Qe).add(et).add(_t), this._camera.position.add(V)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), V.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const m = this._needsUpdate;
    return m && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : m ? (this.dispatchEvent({ type: "update" }), le(n, this.restThreshold) && le(t, this.restThreshold) && le(s, this.restThreshold) && le(a.x, this.restThreshold) && le(a.y, this.restThreshold) && le(a.z, this.restThreshold) && le(o.x, this.restThreshold) && le(o.y, this.restThreshold) && le(o.z, this.restThreshold) && le(r, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !m && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = m, this._needsUpdate = !1, m;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: Nt(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: Nt(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: Nt(this.maxPolarAngle),
      minAzimuthAngle: Nt(this.minAzimuthAngle),
      maxAzimuthAngle: Nt(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      verticalDragToForward: this.verticalDragToForward,
      target: this._targetEnd.toArray(),
      position: V.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
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
    this.enabled = t.enabled, this.minDistance = t.minDistance, this.maxDistance = zt(t.maxDistance), this.minZoom = t.minZoom, this.maxZoom = zt(t.maxZoom), this.minPolarAngle = t.minPolarAngle, this.maxPolarAngle = zt(t.maxPolarAngle), this.minAzimuthAngle = zt(t.minAzimuthAngle), this.maxAzimuthAngle = zt(t.maxAzimuthAngle), this.smoothTime = t.smoothTime, this.draggingSmoothTime = t.draggingSmoothTime, this.dollySpeed = t.dollySpeed, this.truckSpeed = t.truckSpeed, this.dollyToCursor = t.dollyToCursor, this.verticalDragToForward = t.verticalDragToForward, this._target0.fromArray(t.target0), this._position0.fromArray(t.position0), this._zoom0 = t.zoom0, this._focalOffset0.fromArray(t.focalOffset0), this.moveTo(t.target[0], t.target[1], t.target[2], n), Ge.setFromVector3(V.fromArray(t.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(Ge.theta, Ge.phi, n), this.dollyTo(Ge.radius, n), this.zoomTo(t.zoom, n), this.setFocalOffset(t.focalOffset[0], t.focalOffset[1], t.focalOffset[2], n), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", Sa), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const a = te.copy(n).add(e), r = this._boundary.clampPoint(a, Dt).sub(a), h = r.lengthSq();
    if (h === 0)
      return e.add(n);
    if (h === s)
      return e;
    if (t === 0)
      return e.add(n).add(r);
    {
      const c = 1 + t * h / n.dot(r);
      return e.add(te.copy(n).multiplyScalar(c)).add(r.multiplyScalar(1 - t));
    }
  }
  _updateNearPlaneCorners() {
    if (gt(this._camera)) {
      const e = this._camera, n = e.near, t = e.getEffectiveFOV() * jt, s = Math.tan(t * 0.5) * n, a = s * e.aspect;
      this._nearPlaneCorners[0].set(-a, -s, 0), this._nearPlaneCorners[1].set(a, -s, 0), this._nearPlaneCorners[2].set(a, s, 0), this._nearPlaneCorners[3].set(-a, s, 0);
    } else if (ht(this._camera)) {
      const e = this._camera, n = 1 / e.zoom, t = e.left * n, s = e.right * n, a = e.top * n, o = e.bottom * n;
      this._nearPlaneCorners[0].set(t, a, 0), this._nearPlaneCorners[1].set(s, a, 0), this._nearPlaneCorners[2].set(s, o, 0), this._nearPlaneCorners[3].set(t, o, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || yi(this._camera, "_collisionTest"))
      return e;
    const t = this._getTargetDirection(Bt);
    Ti.lookAt(dn, t, this._camera.up);
    for (let s = 0; s < 4; s++) {
      const a = te.copy(this._nearPlaneCorners[s]);
      a.applyMatrix4(Ti);
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
  static createBoundingSphere(e, n = new B.Sphere()) {
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
      const m = h.attributes.position;
      for (let p = 0, _ = m.count; p < _; p++)
        V.fromBufferAttribute(m, p), a = Math.max(a, s.distanceToSquared(V));
    }), t.radius = Math.sqrt(a), t;
  }
}
const ci = (i) => {
  const [e, n] = W(i.options[i.index]), t = () => {
    i.onToggle(!i.open);
  }, s = (a) => {
    a !== e && (i.onSelect(a), n(a)), i.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: t, children: `${i.title}: ${e}` }),
    i.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: i.options.map((a) => /* @__PURE__ */ u.jsx("li", { onClick: () => s(a), children: a }, a)) })
  ] });
}, vt = As(function(e, n) {
  const t = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [s, a] = W("Renderer"), [o, r] = W(!1), [h, c] = W(!1), [m, p] = W(!1);
  return /* @__PURE__ */ u.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ u.jsx("div", { ref: n, className: "clickable", onClick: () => {
      m && p(!1);
    } }),
    /* @__PURE__ */ u.jsxs("div", { className: "options", children: [
      /* @__PURE__ */ u.jsx(
        ci,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: m,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (_) => {
            p(_);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        ci,
        {
          title: "Mode",
          index: t.indexOf(s),
          open: h,
          options: t,
          onSelect: (_) => {
            if (_ === s)
              return;
            const v = _;
            e.onSelectRenderMode(v), a(v);
          },
          onToggle: (_) => {
            o && r(!1), c(_);
          },
          up: !0
        }
      )
    ] })
  ] });
});
class Ma extends Un {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: ps,
      side: En,
      transparent: !0,
      uniforms: {
        uScale: {
          value: e?.scale !== void 0 ? e?.scale : 0.1
        },
        uDivisions: {
          value: e?.divisions !== void 0 ? e?.divisions : 10
        },
        uColor: {
          value: e?.color !== void 0 ? e?.color : new di(16777215)
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
class Ra extends li {
  gridMaterial;
  constructor() {
    const e = new Ma();
    super(new fs(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const Da = `#include <common>
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
}`, Aa = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Pa extends Un {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Da,
      fragmentShader: Aa
    });
  }
}
let ae, xi = !1, Z = null, ce = null, Ue = null, Fe = null, Pt = "Renderer", ei = "Renderer", fn = "Renderer", gn = "Renderer";
function La(i) {
  const e = i.three.app.appID, n = Ce(() => /* @__PURE__ */ new Map(), []), t = Ce(() => /* @__PURE__ */ new Map(), []), s = Ce(() => /* @__PURE__ */ new Map(), []), a = Ce(() => /* @__PURE__ */ new Map(), []), o = Ce(() => new _n(), []), r = Ce(() => new Bi(), []), h = Ce(() => new Ra(), []), c = Ce(() => new Hi(500), []), m = Ce(() => new Hi(100), []), p = Ce(() => new gs(), []), _ = Ce(() => new _s(), []), v = Ce(() => new Pa(), []), R = Ce(() => new ni({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function P(E, T) {
    const D = new Si(-100, 100, 100, -100, 50, 5e3);
    return D.name = E, D.position.copy(T), D.lookAt(0, 0, 0), n.set(E, D), D;
  }
  const k = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], g = de(null), y = de(null), x = de(null), O = de(null), L = de(null), A = de(null), C = localStorage, re = C.getItem(`${e}_mode`), [ee, qe] = W(re !== null ? re : "Single"), [U, je] = W(null), [Ee, xe] = W(!1), [Se, Ne] = W(!1), [Ze, rt] = W("Orbit"), [it, nt] = W(!1), [mt, ot] = W(Date.now());
  C.setItem(`${e}_mode`, ee), C.setItem(`${e}_tlCam`, C.getItem(`${e}_tlCam`) !== null ? C.getItem(`${e}_tlCam`) : "Debug"), C.setItem(`${e}_trCam`, C.getItem(`${e}_trCam`) !== null ? C.getItem(`${e}_trCam`) : "Orthographic"), C.setItem(`${e}_blCam`, C.getItem(`${e}_blCam`) !== null ? C.getItem(`${e}_blCam`) : "Front"), C.setItem(`${e}_brCam`, C.getItem(`${e}_brCam`) !== null ? C.getItem(`${e}_brCam`) : "Top"), C.setItem(`${e}_tlRender`, C.getItem(`${e}_tlRender`) !== null ? C.getItem(`${e}_tlRender`) : "Renderer"), C.setItem(`${e}_trRender`, C.getItem(`${e}_trRender`) !== null ? C.getItem(`${e}_trRender`) : "Renderer"), C.setItem(`${e}_blRender`, C.getItem(`${e}_blRender`) !== null ? C.getItem(`${e}_blRender`) : "Renderer"), C.setItem(`${e}_brRender`, C.getItem(`${e}_brRender`) !== null ? C.getItem(`${e}_brRender`) : "Renderer");
  const _e = (E, T) => {
    const D = t.get(E.name);
    if (D !== void 0 && D.dispose(), t.delete(E.name), E.name === "UI")
      return;
    const F = new Ca(E, T);
    switch (F.enableDamping = !0, F.dampingFactor = 0.05, E.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        F.enableRotate = !1;
        break;
    }
    t.set(E.name, F);
  }, We = (E) => {
    const T = s.get(E.name);
    T !== void 0 && (o.remove(T), T.dispose(), s.delete(E.name));
    const D = t.get(E.name);
    D !== void 0 && (D.dispose(), t.delete(E.name));
  }, It = () => {
    t.forEach((E, T) => {
      E.dispose();
      const D = s.get(T);
      D !== void 0 && (o.remove(D), D.dispose()), s.delete(T), t.delete(T);
    }), t.clear(), s.clear();
  }, pt = () => {
    switch (ee) {
      case "Single":
        _e(Z, x.current);
        break;
      case "Side by Side":
      case "Stacked":
        _e(Z, x.current), _e(ce, O.current);
        break;
      case "Quad":
        _e(Z, x.current), _e(ce, O.current), _e(Ue, L.current), _e(Fe, A.current);
        break;
    }
  };
  $e(() => {
    const E = new vs({
      canvas: g.current,
      stencil: !1
    });
    E.autoClear = !1, E.shadowMap.enabled = !0, E.setPixelRatio(devicePixelRatio), E.setClearColor(0), i.three.renderer = E, je(E);
  }, []), $e(() => {
    o.name = "Debug Scene", o.uuid = "", r.name = "helpers", o.add(r), r.add(h), c.name = "axisHelper", r.add(c), m.name = "interactionHelper", r.add(m), m.visible = !1, P("Top", new he(0, 1e3, 0)), P("Bottom", new he(0, -1e3, 0)), P("Left", new he(-1e3, 0, 0)), P("Right", new he(1e3, 0, 0)), P("Front", new he(0, 0, 1e3)), P("Back", new he(0, 0, -1e3)), P("Orthographic", new he(1e3, 1e3, 1e3)), P("UI", new he());
    const E = new fi(60, 1, 50, 5e3);
    E.name = "Debug", E.position.set(500, 500, 500), E.lookAt(0, 0, 0), n.set("Debug", E), Z = n.get(C.getItem(`${e}_tlCam`)), ce = n.get(C.getItem(`${e}_trCam`)), Ue = n.get(C.getItem(`${e}_blCam`)), Fe = n.get(C.getItem(`${e}_brCam`)), Z === void 0 && (Z = n.get("Debug")), ce === void 0 && (ce = n.get("Orthographic")), Ue === void 0 && (Ue = n.get("Front")), Fe === void 0 && (Fe = n.get("Top"));
  }, []), $e(() => {
    const E = () => {
      a.forEach((M) => {
        r.remove(M), M.dispose();
      }), a.clear();
    }, T = () => {
      ae.traverse((M) => {
        if (M.type.search("Light") > -1) {
          let I;
          switch (M.type) {
            case "DirectionalLight":
              I = new Ss(M, 100), I.name = `${M.name}Helper`, a.set(M.name, I), r.add(I);
              break;
            case "HemisphereLight":
              I = new xs(M, 250), I.name = `${M.name}Helper`, a.set(M.name, I), r.add(I);
              break;
            case "RectAreaLight":
              I = new ba(M), I.name = `${M.name}Helper`, a.set(M.name, I), r.add(I);
              break;
            case "PointLight":
              I = new Ts(M, 100), I.name = `${M.name}Helper`, a.set(M.name, I), r.add(I);
              break;
            case "SpotLight":
              I = new Cs(M), I.name = `${M.name}Helper`, a.set(M.name, I), r.add(I);
              break;
          }
        }
      });
    }, D = (M) => {
      r.add(c), E(), ri(ae), o.remove(ae);
      const I = i.scenes.get(M.value.name);
      if (I !== void 0) {
        const pe = new I();
        i.onSceneSet !== void 0 && i.onSceneSet(pe), ae = pe, i.three.scene = ae, o.add(ae), xi = !0, T();
      }
    }, F = (M) => {
      const I = M.value, pe = i.three.scene?.getObjectByProperty("uuid", I.uuid);
      if (pe !== void 0 && n.set(I.name, pe), pe instanceof fi) {
        const be = new ys(pe);
        s.set(pe.name, be), o.add(be);
      }
      ot(Date.now());
    }, me = (M) => {
      const I = s.get(M.value.name);
      I !== void 0 && (o.remove(I), I.dispose()), n.delete(M.value.name), ot(Date.now());
    }, K = (M) => {
      const I = ae.getObjectByProperty("uuid", M.value.uuid);
      I && I.add(c);
    };
    return j.addEventListener(N.SET_SCENE, D), j.addEventListener(N.ADD_CAMERA, F), j.addEventListener(N.REMOVE_CAMERA, me), j.addEventListener(N.SET_OBJECT, K), () => {
      j.removeEventListener(N.SET_SCENE, D), j.removeEventListener(N.ADD_CAMERA, F), j.removeEventListener(N.REMOVE_CAMERA, me), j.removeEventListener(N.SET_OBJECT, K);
    };
  }, []), $e(() => {
    if (U === null)
      return;
    let E = window.innerWidth, T = window.innerHeight, D = Math.floor(E / 2), F = Math.floor(T / 2), me = -1;
    const K = new si(), M = new ni(), I = new Bi(), pe = () => {
      E = window.innerWidth - 300, T = window.innerHeight, D = Math.floor(E / 2), F = Math.floor(T / 2), i.three.resize(E, T), i.onSceneResize !== void 0 && xi && i.onSceneResize(ae, E, T);
      let ne = E, ve = T;
      switch (ee) {
        case "Side by Side":
          ne = D, ve = T;
          break;
        case "Stacked":
          ne = E, ve = F;
          break;
        case "Quad":
          ne = D, ve = F;
          break;
      }
      const Y = ne / ve;
      n.forEach((z) => {
        z instanceof Si ? (z.left = ne / -2, z.right = ne / 2, z.top = ve / 2, z.bottom = ve / -2, z.name === "UI" && (z.position.x = E / 2, z.position.y = T / -2, z.position.z = 100), z.updateProjectionMatrix()) : z instanceof fi && (z.aspect = Y, z.updateProjectionMatrix(), s.get(z.name)?.update());
      });
    };
    function be(ne) {
      switch (ne) {
        case "Depth":
          return p;
        case "Normals":
          return _;
        case "Renderer":
          return null;
        case "UVs":
          return v;
        case "Wireframe":
          return R;
      }
      return null;
    }
    const st = () => {
      const ne = be(Pt);
      o.overrideMaterial = ne, U.setViewport(0, 0, E, T), U.setScissor(0, 0, E, T), ae?.onBeforeRender(U, ae, Z, K, M, I), U.render(o, Z);
    }, Te = () => {
      const ne = be(Pt), ve = be(ei);
      if (o.overrideMaterial = ne, ee === "Side by Side")
        U.setViewport(0, 0, D, T), U.setScissor(0, 0, D, T), ae?.onBeforeRender(U, ae, Z, K, M, I), U.render(o, Z), o.overrideMaterial = ve, U.setViewport(D, 0, D, T), U.setScissor(D, 0, D, T), ae?.onBeforeRender(U, ae, ce, K, M, I), U.render(o, ce);
      else {
        const Y = T - F;
        U.setViewport(0, Y, E, F), U.setScissor(0, Y, E, F), ae?.onBeforeRender(U, ae, Z, K, M, I), U.render(o, Z), o.overrideMaterial = ve, U.setViewport(0, 0, E, F), U.setScissor(0, 0, E, F), ae?.onBeforeRender(U, ae, ce, K, M, I), U.render(o, ce);
      }
    }, we = () => {
      const ne = be(Pt), ve = be(ei), Y = be(fn), z = be(gn);
      let X = 0, J = 0;
      J = T - F, X = 0, o.overrideMaterial = ne, U.setViewport(X, J, D, F), U.setScissor(X, J, D, F), ae?.onBeforeRender(U, ae, Z, K, M, I), U.render(o, Z), X = D, o.overrideMaterial = ve, U.setViewport(X, J, D, F), U.setScissor(X, J, D, F), ae?.onBeforeRender(U, ae, ce, K, M, I), U.render(o, ce), J = 0, X = 0, o.overrideMaterial = Y, U.setViewport(X, J, D, F), U.setScissor(X, J, D, F), ae?.onBeforeRender(U, ae, Ue, K, M, I), U.render(o, Ue), X = D, o.overrideMaterial = z, U.setViewport(X, J, D, F), U.setScissor(X, J, D, F), ae?.onBeforeRender(U, ae, Fe, K, M, I), U.render(o, Fe);
    }, Ie = () => {
      switch (t.forEach((ne) => {
        ne.update();
      }), s.forEach((ne) => {
        ne.update();
      }), a.forEach((ne) => {
        ne.update !== void 0 && ne.update();
      }), i.onSceneUpdate !== void 0 && xi && i.onSceneUpdate(ae), U.clear(), ee) {
        case "Single":
          st();
          break;
        case "Side by Side":
        case "Stacked":
          Te();
          break;
        case "Quad":
          we();
          break;
      }
      me = requestAnimationFrame(Ie);
    };
    return pt(), window.addEventListener("resize", pe), pe(), Ie(), () => {
      window.removeEventListener("resize", pe), cancelAnimationFrame(me), me = -1;
    };
  }, [ee, U]), $e(() => {
    if (U !== null) {
      const E = {
        Vector2: De,
        Vector3: he,
        Vector4: Es,
        Quaternion: wi,
        Matrix4: kn,
        Spherical: Mi,
        Box3: bs,
        Sphere: Os,
        Raycaster: Yi
      };
      tt.install({ THREE: E });
      const T = new Yi(), D = new De();
      let F = Z, me = x, K, M, I = -1;
      const pe = (Y, z, X, J) => {
        switch (ee) {
          case "Quad":
            Y < X ? z < J ? (F = Z, T.setFromCamera(D, Z)) : (F = Ue, T.setFromCamera(D, Ue)) : z < J ? (F = ce, T.setFromCamera(D, ce)) : (F = Fe, T.setFromCamera(D, Fe));
            break;
          case "Side by Side":
            Y < X ? (F = Z, T.setFromCamera(D, Z)) : (F = ce, T.setFromCamera(D, ce));
            break;
          case "Single":
            F = Z, T.setFromCamera(D, Z);
            break;
          case "Stacked":
            z < J ? (F = Z, T.setFromCamera(D, Z)) : (F = ce, T.setFromCamera(D, ce));
            break;
        }
        F === Z ? me = x : F === ce ? me = O : F === Ue ? me = L : F === Fe && (me = A);
      }, be = (Y) => {
        const z = new De();
        U.getSize(z);
        const X = Math.min(Y.clientX, z.x), J = Math.min(Y.clientY, z.y);
        D.x = wt(X, 0, z.x, -1, 1), D.y = wt(J, 0, z.y, 1, -1);
        const ke = z.x / 2, ze = z.y / 2, ct = () => {
          X < ke ? D.x = wt(X, 0, ke, -1, 1) : D.x = wt(X, ke, z.x, -1, 1);
        }, Je = () => {
          J < ze ? D.y = wt(J, 0, ze, 1, -1) : D.y = wt(J, ze, z.y, 1, -1);
        };
        switch (ee) {
          case "Quad":
            ct(), Je();
            break;
          case "Side by Side":
            ct();
            break;
          case "Stacked":
            Je(), Je();
            break;
        }
        if (pe(X, J, ke, ze), Ze === "Orbit")
          return;
        const bt = T.intersectObjects(ae.children);
        bt.length > 0 && m.position.copy(bt[0].point);
      }, st = (Y) => {
        if (Ze === "Orbit")
          return;
        const z = new De();
        if (U.getSize(z), Y.clientX >= z.x)
          return;
        be(Y);
        const X = T.intersectObjects(ae.children);
        X.length > 0 && (i.three.getObject(X[0].object.uuid), m.visible = !1, rt("Orbit"), ot(Date.now()));
      }, Te = (Y, z = !1) => {
        if (K === void 0)
          return;
        cancelAnimationFrame(I), I = -1, M && (M.smoothTime = 0.1);
        const X = 0.15, J = new Ms();
        J.start(), K.getWorldPosition(Y.target0);
        const ke = () => {
          const ze = J.getDelta();
          M && M.update(ze), z && (Y.target.lerp(Y.target0, X), Y.object.position.lerp(Y.position0, X), Y.object.zoom = Ri(Y.object.zoom, Y.zoom0, X), Y.object.updateProjectionMatrix(), Y.dispatchEvent({ type: "change" })), J.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(I), I = -1, we()) : I = requestAnimationFrame(ke);
        };
        ke();
      }, we = () => {
        M !== void 0 && (M.disconnect(), M.dispose(), M = void 0);
      }, Ie = (Y) => {
        if (K !== void 0 && Y.ctrlKey) {
          if (F.name === "UI")
            return;
          const z = t.get(F.name);
          Y.key === "0" ? (we(), M = new tt(F, me.current), K instanceof li || K instanceof ws ? (K.geometry.computeBoundingBox(), M.fitToBox(K.geometry.boundingBox, !0)) : M.fitToSphere(K, !0), Te(z, !0)) : Y.key === "1" ? (we(), M = new tt(F, me.current), M.rotateTo(0, Math.PI * 0.5, !0), M.moveTo(K.position.x, K.position.y, 0, !0), Te(z)) : Y.key === "2" ? (we(), M = new tt(F, me.current), M.rotateTo(0, 0, !0), M.moveTo(K.position.x, 0, K.position.z, !0), Te(z)) : Y.key === "3" ? (we(), M = new tt(F, me.current), M.rotateTo(Math.PI / 2, Math.PI / 2, !0), M.moveTo(0, K.position.y, K.position.z, !0), Te(z)) : Y.key === "4" ? (we(), M = new tt(F, me.current), M.rotateTo(Math.PI, Math.PI / 2, !0), M.moveTo(K.position.x, K.position.y, 0, !0), Te(z)) : Y.key === "5" && (we(), M = new tt(F, me.current), M.rotateTo(rn(45), rn(45), !0), Te(z));
        }
      }, ne = (Y) => {
        K = ae.getObjectByProperty("uuid", Y.value.uuid);
      }, ve = y.current;
      return ve.addEventListener("mousemove", be, !1), ve.addEventListener("click", st, !1), window.addEventListener("keydown", Ie, !1), j.addEventListener(N.SET_OBJECT, ne), () => {
        ve.removeEventListener("mousemove", be), ve.removeEventListener("click", st), window.removeEventListener("keydown", Ie), j.removeEventListener(N.SET_OBJECT, ne);
      };
    }
  }, [ee, U, Ze]);
  const Ae = [];
  return n.forEach((E, T) => {
    Ae.push(T);
  }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ u.jsx("canvas", { ref: g }),
    U !== null && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxs("div", { className: `cameras ${ee === "Single" || ee === "Stacked" ? "single" : ""}`, ref: y, children: [
        ee === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(
          vt,
          {
            camera: Z,
            options: Ae,
            ref: x,
            onSelectCamera: (E) => {
              t.get(Z.name)?.dispose();
              const T = n.get(E);
              T !== void 0 && (We(Z), Z = T, C.setItem(`${e}_tlCam`, T.name), _e(T, x.current));
            },
            onSelectRenderMode: (E) => {
              Pt = E, C.setItem(`${e}_tlRender`, E);
            }
          }
        ) }),
        (ee === "Side by Side" || ee === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            vt,
            {
              camera: Z,
              options: Ae,
              ref: x,
              onSelectCamera: (E) => {
                t.get(Z.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(Z), Z = T, C.setItem(`${e}_tlCam`, T.name), _e(T, x.current));
              },
              onSelectRenderMode: (E) => {
                Pt = E, C.setItem(`${e}_tlRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            vt,
            {
              camera: ce,
              options: Ae,
              ref: O,
              onSelectCamera: (E) => {
                t.get(ce.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(ce), ce = T, C.setItem(`${e}_trCam`, T.name), _e(T, O.current));
              },
              onSelectRenderMode: (E) => {
                ei = E, C.setItem(`${e}_trRender`, E);
              }
            }
          )
        ] }),
        ee === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            vt,
            {
              camera: Z,
              options: Ae,
              ref: x,
              onSelectCamera: (E) => {
                t.get(Z.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(Z), Z = T, C.setItem(`${e}_tlCam`, T.name), _e(T, x.current));
              },
              onSelectRenderMode: (E) => {
                Pt = E, C.setItem(`${e}_tlRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            vt,
            {
              camera: ce,
              options: Ae,
              ref: O,
              onSelectCamera: (E) => {
                t.get(ce.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(ce), ce = T, C.setItem(`${e}_trCam`, T.name), _e(T, O.current));
              },
              onSelectRenderMode: (E) => {
                ei = E, C.setItem(`${e}_trRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            vt,
            {
              camera: Ue,
              options: Ae,
              ref: L,
              onSelectCamera: (E) => {
                t.get(Ue.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(Ue), Ue = T, C.setItem(`${e}_blCam`, T.name), _e(T, L.current));
              },
              onSelectRenderMode: (E) => {
                fn = E, C.setItem(`${e}_blRender`, E);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            vt,
            {
              camera: Fe,
              options: Ae,
              ref: A,
              onSelectCamera: (E) => {
                t.get(Fe.name)?.dispose();
                const T = n.get(E);
                T !== void 0 && (We(Fe), Fe = T, C.setItem(`${e}_brCam`, T.name), _e(T, A.current));
              },
              onSelectRenderMode: (E) => {
                gn = E, C.setItem(`${e}_brRender`, E);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ u.jsx(
          ci,
          {
            title: "View",
            index: k.indexOf(ee),
            options: k,
            onSelect: (E) => {
              E !== ee && (It(), qe(E));
            },
            open: Ee,
            onToggle: (E) => {
              xe(E), Se && Ne(!1), it && nt(!1);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          ci,
          {
            title: "Interact",
            index: Ze === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (E) => {
              m.visible = E === "Selection Mode", rt(m.visible ? "Selection" : "Orbit");
            },
            open: it,
            onToggle: (E) => {
              Ee && xe(!1), Se && Ne(!1), nt(E);
            }
          }
        )
      ] }, mt)
    ] })
  ] });
}
function Ia(i) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: i.footer })
  ] });
}
function Xa(i) {
  return /* @__PURE__ */ u.jsx(Ia, { children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      La,
      {
        three: i.three,
        scenes: i.scenes,
        onSceneResize: i.onSceneResize,
        onSceneSet: i.onSceneSet,
        onSceneUpdate: i.onSceneUpdate
      }
    ),
    /* @__PURE__ */ u.jsx(Ea, { three: i.three })
  ] }) });
}
export {
  oi as Accordion,
  Ha as Application,
  hi as BaseRemote,
  Bn as ChildObject,
  Xi as ContainerObject,
  Gs as Draggable,
  Vs as DraggableItem,
  $s as Dropdown,
  Zs as DropdownItem,
  Ia as Editor,
  ti as ExportTexture,
  ya as Inspector,
  La as MultiView,
  zn as NavButton,
  Ya as RemoteComponents,
  Wa as RemoteController,
  ki as RemoteTheatre,
  $a as RemoteThree,
  Za as RemoteTweakpane,
  Ka as SceneInspector,
  Ea as SidePanel,
  Xa as ThreeEditor,
  N as ToolEvents,
  ai as capitalize,
  yt as clamp,
  Gi as colorToHex,
  Ga as customizeTheatreElements,
  j as debugDispatcher,
  Na as defaultTheatreCallback,
  ri as dispose,
  Is as disposeMaterial,
  Ba as disposeTexture,
  za as distance,
  Ai as hierarchyUUID,
  Ls as isColor,
  Ri as mix,
  Ii as noop,
  Vi as normalize,
  Ps as randomID,
  Zi as resetThreeObjects,
  $i as round,
  Va as theatreEditorApp,
  Di as totalThreeObjects
};
