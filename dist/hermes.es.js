import { OrthographicCamera as _i, Scene as ws, MeshBasicMaterial as St, BufferGeometry as Ct, Float32BufferAttribute as Be, Mesh as w, LinearSRGBColorSpace as Bi, EventDispatcher as Ss, Texture as Tn, RepeatWrapping as Zi, WebGLRenderTarget as Mn, Color as Vt, FrontSide as Dn, BackSide as xs, DoubleSide as xi, NoBlending as Pn, NormalBlending as Rn, AdditiveBlending as An, SubtractiveBlending as In, MultiplyBlending as Ln, CustomBlending as Un, AddEquation as kn, SubtractEquation as jn, ReverseSubtractEquation as Nn, MinEquation as zn, MaxEquation as Fn, ZeroFactor as Os, OneFactor as Ts, SrcColorFactor as Ms, OneMinusSrcColorFactor as Ds, SrcAlphaFactor as Ps, OneMinusSrcAlphaFactor as Rs, DstAlphaFactor as As, OneMinusDstAlphaFactor as Is, DstColorFactor as Ls, OneMinusDstColorFactor as Us, SrcAlphaSaturateFactor as Hn, ConstantColorFactor as ks, OneMinusConstantColorFactor as js, ConstantAlphaFactor as Ns, OneMinusConstantAlphaFactor as zs, Line as xe, LineBasicMaterial as Fs, Ray as Yn, Plane as Bn, MathUtils as Zn, Vector3 as D, Controls as Hs, MOUSE as st, TOUCH as it, Quaternion as pe, Spherical as gi, Vector2 as re, ShaderMaterial as Ys, GLSL3 as Wn, PlaneGeometry as Bs, Raycaster as yi, Euler as Zs, Matrix4 as Xt, Object3D as vi, CylinderGeometry as le, BoxGeometry as ae, OctahedronGeometry as At, SphereGeometry as Gn, TorusGeometry as ot, Group as Vn, AxesHelper as Wi, MeshDepthMaterial as Xn, MeshNormalMaterial as $n, WebGLRenderer as Qn, PerspectiveCamera as ni, CameraHelper as qn, SkinnedMesh as Kn, SpotLightHelper as Jn, PointLightHelper as ea, HemisphereLightHelper as ta, DirectionalLightHelper as ia, Clock as sa, Vector4 as na, Box3 as aa, Sphere as ra } from "three";
import Ws, { useState as W, useRef as J, useEffect as nt, useMemo as bt, Component as Oi, forwardRef as oa, createRef as Xe } from "react";
import { Reorder as Gs } from "framer-motion";
const Vs = () => {
}, Ar = () => {
};
function Zt(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function Ir(i) {
  const e = JSON.stringify(i);
  return navigator.clipboard.writeText(e), e;
}
function Fe(i, e, t) {
  return Math.min(e, Math.max(i, t));
}
function Gi(i, e, t) {
  return (t - i) / (e - i);
}
function Ei(i, e, t) {
  return i * (1 - t) + e * t;
}
function Lr(i, e) {
  const t = i - e;
  return Math.sqrt(t * t);
}
function la() {
  return Math.round(Math.random() * 1e6).toString();
}
function ca(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function Vi(i) {
  const e = Math.round(i.r * 255), t = Math.round(i.g * 255), s = Math.round(i.b * 255), n = (h) => {
    const c = h.toString(16);
    return c.length === 1 ? "0" + c : c;
  }, r = n(e), a = n(t), o = n(s);
  return "#" + r + a + o;
}
function Xi(i, e = 1) {
  return Number(i.toFixed(e));
}
let bi = 0;
const $i = () => {
  bi = 0;
}, Ci = (i) => {
  if (!i)
    return;
  let e = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${bi}`, bi++), i.parent !== null && i.parent.uuid.length > 0 && (e = `${i.parent.uuid}.${e}`), i.uuid = e, i.isMesh !== void 0) {
    const t = i;
    if (Array.isArray(t.material))
      t.material.forEach((s, n) => {
        s.uuid = `${e}.material.${n}`;
      });
    else {
      const s = t.material;
      s.uuid = `${e}.material`;
    }
  }
  i.children.forEach((t) => Ci(t));
}, Ur = (i) => {
  i?.dispose();
}, ha = (i) => {
  i && (Array.isArray(i) ? i.forEach((e) => e.dispose()) : i.dispose());
}, wt = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const e = i.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : wt(e);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const e = i;
      e.geometry?.dispose(), ha(e.material);
    }
    i.dispose !== void 0 && i.dispose();
  }
};
class Ht {
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
    const t = e.repeat.clone(), s = e.offset.clone();
    if (e.repeat.set(1, 1), e.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const n = e.image;
      if (n != null && n.width > 0) {
        this.canvas.title = e.sourceFile;
        const r = this.canvas.width / n.width, a = this.renderToCanvas(e);
        this.context.drawImage(a, 0, 0, n.width * r, n.height * r);
      }
    }
    return e.repeat.copy(t), e.offset.copy(s), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(e) {
    if (this.material === null) {
      this.camera = new _i(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new ws(), this.material = new St();
      const t = new Ct();
      t.setAttribute("position", new Be([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new Be([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new Be([0, 0, 2, 0, 0, 2], 2));
      const s = new w(t, this.material);
      this.scene.add(s);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, s = e.colorSpace;
      this.renderer.outputColorSpace = Bi, e.colorSpace = Bi, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = s;
    }
    return this.renderer.domElement;
  }
}
class kr {
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
  constructor(e, t, s = !0) {
    this._appID = e, this._debugEnabled = t, t && (this._useBC = s, s ? (this._broadcastChannel = new BroadcastChannel(e), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(e), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
  }
  addComponent(e, t) {
    this.components.set(e, t);
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
var P = /* @__PURE__ */ ((i) => (i.CUSTOM = "ToolEvents::custom", i.SELECT_DROPDOWN = "ToolEvents::selectDropdown", i.DRAG_UPDATE = "ToolEvents::dragUpdate", i.ADD_SCENE = "ToolEvents::addScene", i.REFRESH_SCENE = "ToolEvents::refreshScene", i.REMOVE_SCENE = "ToolEvents::removeScene", i.SET_SCENE = "ToolEvents::setScene", i.GET_OBJECT = "ToolEvents::getObject", i.SET_OBJECT = "ToolEvents::setObject", i.UPDATE_OBJECT = "ToolEvents::updateObject", i.CREATE_TEXTURE = "ToolEvents::createTexture", i.REQUEST_METHOD = "ToolEvents::requestMethod", i.ADD_CAMERA = "ToolEvents::addCamera", i.REMOVE_CAMERA = "ToolEvents::removeCamera", i.ADD_GROUP = "ToolEvents::addGroup", i.REMOVE_GROUP = "ToolEvents::removeGroup", i))(P || {});
const R = new Ss();
class Ti {
  app;
  constructor(e) {
    this.app = e;
  }
  dispose() {
  }
  handleApp(e, t, s) {
  }
  handleEditor(e, t, s) {
  }
}
class jr extends Ti {
  selectDropdown(e, t) {
    this.app.send({
      event: "selectComponent",
      target: "app",
      data: {
        dropdown: e,
        value: t
      }
    });
  }
  updateDropdown(e, t) {
    this.app.send({
      event: "draggableListUpdate",
      target: "app",
      data: {
        dropdown: e,
        value: t
      }
    });
  }
  handleApp(e, t, s) {
    switch (s.event) {
      case "selectComponent":
        R.dispatchEvent({ type: P.SELECT_DROPDOWN, value: s.data });
        break;
      case "draggableListUpdate":
        R.dispatchEvent({ type: P.DRAG_UPDATE, value: s.data });
        break;
    }
  }
}
function Nr(i, e, t) {
  if (i.editor) {
    t.ui.restore(), t.onSelectionChange((a) => {
      a.length < 1 || a.forEach((o) => {
        let h = o.address.sheetId, c = "setSheet", u = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            c = "setSheet", u = {
              sheet: o.address.sheetId
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            c = "setSheetObject", h += `_${o.address.objectKey}`, u = {
              id: h,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
        }
        i.send({ event: c, target: "app", data: u });
      });
    });
    let s = -1;
    const n = () => {
      if (e.activeSheet !== void 0 && s !== e.activeSheet.sequence.position) {
        s = e.activeSheet.sequence.position;
        const a = e.activeSheet;
        i.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: s,
            sheet: a.address.sheetId
          }
        });
      }
    }, r = () => {
      n(), requestAnimationFrame(r);
    };
    n(), r();
  } else
    t.ui.hide();
}
function zr() {
  const i = document.getElementById("theatrejs-studio-root")?.shadowRoot?.getElementById("pointer-root")?.children[0], e = i?.children[1];
  e.style.justifyContent = "left";
  const t = e.children[1];
  t.style.transform = "translateX(10px)", t.removeChild(t.children[0]), t.removeChild(t.children[0]);
  const s = i?.children[3];
  s.style.top = "0", s.style.right = "300px";
}
class Xs extends Ti {
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
  getSheetInstance(e, t) {
    return t !== void 0 ? `${e}-${t}` : e;
  }
  sheet(e, t) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const s = this.getSheetInstance(e, t);
    let n = this.sheets.get(s);
    return n !== void 0 || (n = this.project?.sheet(e, t), this.sheets.set(s, n)), n;
  }
  playSheet(e, t, s) {
    return this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: e,
        instance: s,
        value: t
      }
    }), new Promise((n) => {
      const r = t !== void 0 ? { ...t } : {};
      r.rafDriver = Xs.rafDriver, this.sheet(e, s)?.sequence.play(r).then((a) => n(a));
    });
  }
  pauseSheet(e, t) {
    this.sheet(e, t)?.sequence.pause(), this.app.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: e,
        instance: t
      }
    });
  }
  clearSheetObjects(e) {
    this.sheetObjects.forEach((t, s) => {
      s.search(`${e}_`) > -1 && this.unsubscribe(t);
    });
  }
  sheetObject(e, t, s, n, r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = this.sheet(e, r);
    if (a === void 0)
      return;
    const h = `${this.getSheetInstance(e, r)}_${t}`;
    let c = this.sheetObjects.get(h);
    c !== void 0 ? c = a.object(t, { ...s, ...c.value }, { reconfigure: !0 }) : c = a.object(t, s), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, n !== void 0 ? n : Vs);
    const u = c.onValuesChange((m) => {
      if (this.app.editor) {
        for (const g in m) {
          const S = m[g];
          typeof S == "object" && ca(S) && (m[g] = {
            r: S.r,
            g: S.g,
            b: S.b,
            a: S.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: e,
            sheetObject: h,
            values: m
          }
        });
      }
      const _ = this.sheetObjectCBs.get(h);
      _ !== void 0 && _(m);
    });
    return this.sheetObjectUnsubscribe.set(h, u), c;
  }
  unsubscribe(e) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = e.address.sheetId, s = e.address.objectKey;
    this.sheets.get(t)?.detachObject(s);
    const r = `${t}_${s}`, a = this.sheetObjectUnsubscribe.get(r);
    a !== void 0 && (this.sheetObjects.delete(r), this.sheetObjectCBs.delete(r), this.sheetObjectUnsubscribe.delete(r), a());
  }
  handleApp(e, t, s) {
    const n = t;
    let r;
    switch (s.event) {
      case "setSheet":
        r = n.sheets.get(s.data.sheet), r !== void 0 && (n.activeSheet = r, this.studio?.setSelection([r]));
        break;
      case "setSheetObject":
        r = n.sheetObjects.get(`${s.data.sheet}_${s.data.key}`), r !== void 0 && this.studio?.setSelection([r]);
        break;
      case "updateSheetObject":
        r = n.sheets.get(s.data.sheet), r !== void 0 && r.sequence.pause(), r = n.sheetObjectCBs.get(s.data.sheetObject), r !== void 0 && r(s.data.values);
        break;
      case "updateTimeline":
        r = n.sheets.get(s.data.sheet), n.activeSheet !== void 0 && (n.activeSheet.sequence.position = s.data.position);
        break;
    }
  }
  handleEditor(e, t, s) {
    if (e.editor) {
      const n = t;
      switch (s.event) {
        case "playSheet":
          n.sheet(s.data.sheet, s.data.instance)?.sequence.play(s.data.value);
          break;
        case "pauseSheet":
          n.sheet(s.data.sheet, s.data.instance)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(e, t) {
    if (e.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((a) => {
        a.length < 1 || a.forEach((o) => {
          let h = o.address.sheetId, c = "setSheet", u = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              c = "setSheet", u = {
                sheet: o.address.sheetId
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              c = "setSheetObject", h += `_${o.address.objectKey}`, u = {
                id: h,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
          }
          e.send({ event: c, target: "app", data: u });
        });
      });
      let s = -1;
      const n = () => {
        if (t.activeSheet !== void 0 && s !== t.activeSheet.sequence.position) {
          s = t.activeSheet.sequence.position;
          const a = t.activeSheet;
          e.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: s,
              sheet: a.address.sheetId
            }
          });
        }
      }, r = () => {
        n(), requestAnimationFrame(r);
      };
      n(), r();
    } else
      this.studio?.ui.hide();
  }
}
function da(i) {
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
function tt(i) {
  const e = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    children: []
  };
  return i.children.forEach((t) => {
    e.children.push(tt(t));
  }), e;
}
function ua(i) {
  const e = {};
  for (const t in i) {
    const s = i[t].value;
    e[t] = { value: s }, s === null ? e[t].value = {
      src: "",
      offset: [0, 0],
      repeat: [1, 1]
    } : s !== void 0 && s.isTexture && (e[t].value = {
      src: s.image.src,
      offset: [s.offset.x, s.offset.y],
      repeat: [s.repeat.x, s.repeat.y]
    });
  }
  return e;
}
function pa(i) {
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
function $e(i) {
  const e = {};
  for (const t in i) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || pa(t))
      continue;
    const s = typeof i[t], n = i[t];
    switch (s) {
      case "boolean":
      case "number":
      case "string":
        e[t] = n;
        break;
      case "object":
        n !== null ? (e[t] = n, n.isTexture ? e[t] = {
          src: Ht.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = ua(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return i.anisotropy !== void 0 && (e.anisotropy = i.anisotropy), i.clearcoat !== void 0 && (e.clearcoat = i.clearcoat), i.iridescence !== void 0 && (e.iridescence = i.iridescence), i.dispersion !== void 0 && (e.dispersion = i.dispersion), i.sheen !== void 0 && (e.sheen = i.sheen), i.transmission !== void 0 && (e.transmission = i.transmission), i.transmission !== void 0 && (e.transmission = i.transmission), e;
}
function ai(i) {
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
  i.animations.forEach((s) => {
    e.animations.push({
      name: s.name,
      duration: s.duration,
      blendMode: s.blendMode
    });
  });
  const t = i.type.toLowerCase();
  if (t.search("mesh") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((r) => {
        n.push($e(r));
      }), e.material = n;
    } else
      e.material = $e(s.material);
  } else if (t.search("points") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((r) => {
        n.push($e(r));
      }), e.material = n;
    } else
      e.material = $e(s.material);
  } else if (t.search("line") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((r) => {
        n.push($e(r));
      }), e.material = n;
    } else
      e.material = $e(s.material);
  } else
    t.search("camera") > -1 ? i.type === "PerspectiveCamera" ? e.perspectiveCameraInfo = {
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
    }) : t.search("light") > -1 && (e.lightInfo = {
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
function ma(i, e) {
  const t = e.split(".");
  switch (t.length) {
    case 1:
      return i[t[0]];
    case 2:
      return i[t[0]][t[1]];
    case 3:
      return i[t[0]][t[1]][t[2]];
    case 4:
      return i[t[0]][t[1]][t[2]][t[3]];
    case 5:
      return i[t[0]][t[1]][t[2]][t[3]][t[4]];
    case 6:
      return i[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]];
  }
}
function fa(i, e) {
  for (const t in e)
    i[t] = e[t];
}
function q(i, e, t) {
  if (i === void 0)
    return;
  const s = e.split("."), n = s.length;
  if (typeof t != "object")
    switch (n) {
      case 1:
        i[s[0]] = t;
        break;
      case 2:
        i[s[0]][s[1]] = t;
        break;
      case 3:
        i[s[0]][s[1]][s[2]] = t;
        break;
      case 4:
        i[s[0]][s[1]][s[2]][s[3]] = t;
        break;
      case 5:
        i[s[0]][s[1]][s[2]][s[3]][s[4]] = t;
        break;
    }
  else {
    let a;
    switch (n) {
      case 1:
        a = i[s[0]];
        break;
      case 2:
        a = i[s[0]][s[1]];
        break;
      case 3:
        a = i[s[0]][s[1]][s[2]];
        break;
      case 4:
        a = i[s[0]][s[1]][s[2]][s[3]];
        break;
      case 5:
        a = i[s[0]][s[1]][s[2]][s[3]][s[4]];
        break;
    }
    a != null && fa(a, t);
  }
}
function $s(i) {
  return new Promise((e, t) => {
    const s = new Image();
    s.onload = () => {
      const n = new Tn(s);
      n.wrapS = Zi, n.wrapT = Zi, n.needsUpdate = !0, e(n);
    }, s.onerror = t, s.src = i;
  });
}
class Fr extends Ti {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((e) => {
      wt(e);
    }), this.scenes.clear(), this.scene && wt(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(e) {
    this.app.debugEnabled && (this.renderer !== void 0 && (Ht.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (Ht.renderer = this.renderer);
    const t = ai(e);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: t
    });
  }
  requestMethod(e, t, s, n) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: e,
        key: t,
        value: s,
        subitem: n
      }
    });
  }
  updateObject(e, t, s) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: e,
        key: t,
        value: s
      }
    });
  }
  createTexture(e, t, s) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: e,
        key: t,
        value: s
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
  updateGroup(e, t, s) {
    this.app.send({
      event: "updateGroup",
      target: "app",
      data: JSON.stringify({ group: e, prop: t, value: s })
    });
  }
  removeAllGroups() {
    this.groups.forEach((e) => {
      const t = e.title;
      this.groups.delete(t), this.app.send({
        event: "removeGroup",
        target: "editor",
        data: t
      });
    }), this.groups.clear();
  }
  // Scenes
  addScene(e) {
    if (e === void 0 || (this.scenes.set(e.name, e), !this.app.debugEnabled))
      return;
    $i(), Ci(e);
    const t = tt(e);
    this.app.send({
      event: "addScene",
      target: "editor",
      data: t
    });
  }
  refreshScene(e) {
    if (!this.app.debugEnabled)
      return;
    const t = this.scenes.get(e);
    if (t !== void 0) {
      const s = tt(t);
      this.app.send({
        event: "refreshScene",
        target: "app",
        data: s
      });
    }
  }
  removeScene(e) {
    if (e === void 0 || (this.scenes.delete(e.name), !this.app.debugEnabled))
      return;
    const t = tt(e);
    this.app.send({
      event: "removeScene",
      target: "editor",
      data: t
    });
  }
  removeAllScenes() {
    this.scenes.forEach((e) => this.removeScene(e));
  }
  getScene(e) {
    let t = null;
    return this.scenes.forEach((s, n) => {
      e.search(n) > -1 && (t = s);
    }), t;
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.app.debugEnabled))
      return;
    this.renderer !== void 0 && (Ht.renderer = this.renderer), $i(), Ci(e);
    const t = tt(e);
    this.app.send({
      event: "setScene",
      target: "editor",
      data: t
    });
  }
  // Cameras
  addCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = ai(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = ai(e);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: t
    });
  }
  handleApp(e, t, s) {
    const n = t;
    switch (s.event) {
      case "getObject":
        R.dispatchEvent({ type: P.GET_OBJECT, value: s.data });
        break;
      case "updateObject":
        R.dispatchEvent({ type: P.UPDATE_OBJECT, value: s.data });
        break;
      case "createTexture":
        R.dispatchEvent({ type: P.CREATE_TEXTURE, value: s.data });
        break;
      case "requestMethod":
        R.dispatchEvent({ type: P.REQUEST_METHOD, value: s.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: tt(n.scenes.get(s.data.name))
        });
        break;
    }
    if (s.event === "updateGroup") {
      const r = JSON.parse(s.data);
      n.groups.get(r.group)?.onUpdate(r.prop, r.value);
    }
  }
  handleEditor(e, t, s) {
    switch (s.event) {
      case "setObject":
        R.dispatchEvent({ type: P.SET_OBJECT, value: s.data });
        break;
      case "addScene":
        R.dispatchEvent({ type: P.ADD_SCENE, value: s.data });
        break;
      case "refreshScene":
        R.dispatchEvent({ type: P.REFRESH_SCENE, value: s.data });
        break;
      case "removeScene":
        R.dispatchEvent({ type: P.REMOVE_SCENE, value: s.data });
        break;
      case "setScene":
        R.dispatchEvent({ type: P.SET_SCENE, value: s.data });
        break;
      case "addCamera":
        R.dispatchEvent({ type: P.ADD_CAMERA, value: s.data });
        break;
      case "removeCamera":
        R.dispatchEvent({ type: P.REMOVE_CAMERA, value: s.data });
        break;
      case "addGroup":
        R.dispatchEvent({ type: P.ADD_GROUP, value: s.data });
        break;
      case "removeGroup":
        R.dispatchEvent({ type: P.REMOVE_GROUP, value: s.data });
        break;
    }
  }
  // Renderer
  addRT(e, t) {
    const s = new Mn(32, 32, t);
    s.texture.name = e, this.renderTargets.set(e, s);
  }
  resize(e, t) {
    const s = this.dpr;
    this.renderTargets.forEach((n) => {
      n.setSize(e * s, t * s);
    }), this.renderer?.setSize(e, t);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(Fe(1, 2, e));
  }
  get dpr() {
    return this.renderer !== void 0 ? this.renderer?.getPixelRatio() : 1;
  }
  get width() {
    return this.renderer !== void 0 ? this.renderer.domElement.width / this.dpr : 0;
  }
  get height() {
    return this.renderer !== void 0 ? this.renderer.domElement.height / this.dpr : 0;
  }
  get canvas() {
    return this.renderer !== void 0 ? this.renderer?.domElement : null;
  }
}
var wi = { exports: {} }, lt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qi;
function _a() {
  if (Qi)
    return lt;
  Qi = 1;
  var i = Ws, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, n = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, h, c) {
    var u, m = {}, _ = null, g = null;
    c !== void 0 && (_ = "" + c), h.key !== void 0 && (_ = "" + h.key), h.ref !== void 0 && (g = h.ref);
    for (u in h)
      s.call(h, u) && !r.hasOwnProperty(u) && (m[u] = h[u]);
    if (o && o.defaultProps)
      for (u in h = o.defaultProps, h)
        m[u] === void 0 && (m[u] = h[u]);
    return { $$typeof: e, type: o, key: _, ref: g, props: m, _owner: n.current };
  }
  return lt.Fragment = t, lt.jsx = a, lt.jsxs = a, lt;
}
var ct = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qi;
function ga() {
  return qi || (qi = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Ws, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), S = Symbol.iterator, T = "@@iterator";
    function O(l) {
      if (l === null || typeof l != "object")
        return null;
      var v = S && l[S] || l[T];
      return typeof v == "function" ? v : null;
    }
    var f = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(l) {
      {
        for (var v = arguments.length, C = new Array(v > 1 ? v - 1 : 0), I = 1; I < v; I++)
          C[I - 1] = arguments[I];
        b("error", l, C);
      }
    }
    function b(l, v, C) {
      {
        var I = f.ReactDebugCurrentFrame, z = I.getStackAddendum();
        z !== "" && (v += "%s", C = C.concat([z]));
        var Y = C.map(function(k) {
          return String(k);
        });
        Y.unshift("Warning: " + v), Function.prototype.apply.call(console[l], console, Y);
      }
    }
    var E = !1, M = !1, x = !1, j = !1, X = !1, me;
    me = Symbol.for("react.module.reference");
    function Me(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === s || l === r || X || l === n || l === c || l === u || j || l === g || E || M || x || typeof l == "object" && l !== null && (l.$$typeof === _ || l.$$typeof === m || l.$$typeof === a || l.$$typeof === o || l.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === me || l.getModuleId !== void 0));
    }
    function at(l, v, C) {
      var I = l.displayName;
      if (I)
        return I;
      var z = v.displayName || v.name || "";
      return z !== "" ? C + "(" + z + ")" : C;
    }
    function We(l) {
      return l.displayName || "Context";
    }
    function ue(l) {
      if (l == null)
        return null;
      if (typeof l.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof l == "function")
        return l.displayName || l.name || null;
      if (typeof l == "string")
        return l;
      switch (l) {
        case s:
          return "Fragment";
        case t:
          return "Portal";
        case r:
          return "Profiler";
        case n:
          return "StrictMode";
        case c:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case o:
            var v = l;
            return We(v) + ".Consumer";
          case a:
            var C = l;
            return We(C._context) + ".Provider";
          case h:
            return at(l, l.render, "ForwardRef");
          case m:
            var I = l.displayName || null;
            return I !== null ? I : ue(l.type) || "Memo";
          case _: {
            var z = l, Y = z._payload, k = z._init;
            try {
              return ue(k(Y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ee = Object.assign, $ = 0, Ae, oe, we, ie, Ie, Le, Ue;
    function xt() {
    }
    xt.__reactDisabledLog = !0;
    function Ot() {
      {
        if ($ === 0) {
          Ae = console.log, oe = console.info, we = console.warn, ie = console.error, Ie = console.group, Le = console.groupCollapsed, Ue = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: xt,
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
        $++;
      }
    }
    function sn() {
      {
        if ($--, $ === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ee({}, l, {
              value: Ae
            }),
            info: ee({}, l, {
              value: oe
            }),
            warn: ee({}, l, {
              value: we
            }),
            error: ee({}, l, {
              value: ie
            }),
            group: ee({}, l, {
              value: Ie
            }),
            groupCollapsed: ee({}, l, {
              value: Le
            }),
            groupEnd: ee({}, l, {
              value: Ue
            })
          });
        }
        $ < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Qt = f.ReactCurrentDispatcher, qt;
    function Tt(l, v, C) {
      {
        if (qt === void 0)
          try {
            throw Error();
          } catch (z) {
            var I = z.stack.trim().match(/\n( *(at )?)/);
            qt = I && I[1] || "";
          }
        return `
` + qt + l;
      }
    }
    var Kt = !1, Mt;
    {
      var nn = typeof WeakMap == "function" ? WeakMap : Map;
      Mt = new nn();
    }
    function Di(l, v) {
      if (!l || Kt)
        return "";
      {
        var C = Mt.get(l);
        if (C !== void 0)
          return C;
      }
      var I;
      Kt = !0;
      var z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Y;
      Y = Qt.current, Qt.current = null, Ot();
      try {
        if (v) {
          var k = function() {
            throw Error();
          };
          if (Object.defineProperty(k.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(k, []);
            } catch (Se) {
              I = Se;
            }
            Reflect.construct(l, [], k);
          } else {
            try {
              k.call();
            } catch (Se) {
              I = Se;
            }
            l.call(k.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Se) {
            I = Se;
          }
          l();
        }
      } catch (Se) {
        if (Se && I && typeof Se.stack == "string") {
          for (var U = Se.stack.split(`
`), ne = I.stack.split(`
`), Q = U.length - 1, K = ne.length - 1; Q >= 1 && K >= 0 && U[Q] !== ne[K]; )
            K--;
          for (; Q >= 1 && K >= 0; Q--, K--)
            if (U[Q] !== ne[K]) {
              if (Q !== 1 || K !== 1)
                do
                  if (Q--, K--, K < 0 || U[Q] !== ne[K]) {
                    var fe = `
` + U[Q].replace(" at new ", " at ");
                    return l.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", l.displayName)), typeof l == "function" && Mt.set(l, fe), fe;
                  }
                while (Q >= 1 && K >= 0);
              break;
            }
        }
      } finally {
        Kt = !1, Qt.current = Y, sn(), Error.prepareStackTrace = z;
      }
      var Ve = l ? l.displayName || l.name : "", Yi = Ve ? Tt(Ve) : "";
      return typeof l == "function" && Mt.set(l, Yi), Yi;
    }
    function an(l, v, C) {
      return Di(l, !1);
    }
    function rn(l) {
      var v = l.prototype;
      return !!(v && v.isReactComponent);
    }
    function Dt(l, v, C) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return Di(l, rn(l));
      if (typeof l == "string")
        return Tt(l);
      switch (l) {
        case c:
          return Tt("Suspense");
        case u:
          return Tt("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case h:
            return an(l.render);
          case m:
            return Dt(l.type, v, C);
          case _: {
            var I = l, z = I._payload, Y = I._init;
            try {
              return Dt(Y(z), v, C);
            } catch {
            }
          }
        }
      return "";
    }
    var Pt = Object.prototype.hasOwnProperty, Pi = {}, Ri = f.ReactDebugCurrentFrame;
    function Rt(l) {
      if (l) {
        var v = l._owner, C = Dt(l.type, l._source, v ? v.type : null);
        Ri.setExtraStackFrame(C);
      } else
        Ri.setExtraStackFrame(null);
    }
    function on(l, v, C, I, z) {
      {
        var Y = Function.call.bind(Pt);
        for (var k in l)
          if (Y(l, k)) {
            var U = void 0;
            try {
              if (typeof l[k] != "function") {
                var ne = Error((I || "React class") + ": " + C + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ne.name = "Invariant Violation", ne;
              }
              U = l[k](v, k, I, C, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              U = Q;
            }
            U && !(U instanceof Error) && (Rt(z), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", I || "React class", C, k, typeof U), Rt(null)), U instanceof Error && !(U.message in Pi) && (Pi[U.message] = !0, Rt(z), y("Failed %s type: %s", C, U.message), Rt(null));
          }
      }
    }
    var ln = Array.isArray;
    function Jt(l) {
      return ln(l);
    }
    function cn(l) {
      {
        var v = typeof Symbol == "function" && Symbol.toStringTag, C = v && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return C;
      }
    }
    function hn(l) {
      try {
        return Ai(l), !1;
      } catch {
        return !0;
      }
    }
    function Ai(l) {
      return "" + l;
    }
    function Ii(l) {
      if (hn(l))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", cn(l)), Ai(l);
    }
    var rt = f.ReactCurrentOwner, dn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Li, Ui, ei;
    ei = {};
    function un(l) {
      if (Pt.call(l, "ref")) {
        var v = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function pn(l) {
      if (Pt.call(l, "key")) {
        var v = Object.getOwnPropertyDescriptor(l, "key").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function mn(l, v) {
      if (typeof l.ref == "string" && rt.current && v && rt.current.stateNode !== v) {
        var C = ue(rt.current.type);
        ei[C] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ue(rt.current.type), l.ref), ei[C] = !0);
      }
    }
    function fn(l, v) {
      {
        var C = function() {
          Li || (Li = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        C.isReactWarning = !0, Object.defineProperty(l, "key", {
          get: C,
          configurable: !0
        });
      }
    }
    function _n(l, v) {
      {
        var C = function() {
          Ui || (Ui = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        C.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: C,
          configurable: !0
        });
      }
    }
    var gn = function(l, v, C, I, z, Y, k) {
      var U = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: l,
        key: v,
        ref: C,
        props: k,
        // Record the component responsible for creating this element.
        _owner: Y
      };
      return U._store = {}, Object.defineProperty(U._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(U, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: I
      }), Object.defineProperty(U, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.freeze && (Object.freeze(U.props), Object.freeze(U)), U;
    };
    function yn(l, v, C, I, z) {
      {
        var Y, k = {}, U = null, ne = null;
        C !== void 0 && (Ii(C), U = "" + C), pn(v) && (Ii(v.key), U = "" + v.key), un(v) && (ne = v.ref, mn(v, z));
        for (Y in v)
          Pt.call(v, Y) && !dn.hasOwnProperty(Y) && (k[Y] = v[Y]);
        if (l && l.defaultProps) {
          var Q = l.defaultProps;
          for (Y in Q)
            k[Y] === void 0 && (k[Y] = Q[Y]);
        }
        if (U || ne) {
          var K = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          U && fn(k, K), ne && _n(k, K);
        }
        return gn(l, U, ne, z, I, rt.current, k);
      }
    }
    var ti = f.ReactCurrentOwner, ki = f.ReactDebugCurrentFrame;
    function Ge(l) {
      if (l) {
        var v = l._owner, C = Dt(l.type, l._source, v ? v.type : null);
        ki.setExtraStackFrame(C);
      } else
        ki.setExtraStackFrame(null);
    }
    var ii;
    ii = !1;
    function si(l) {
      return typeof l == "object" && l !== null && l.$$typeof === e;
    }
    function ji() {
      {
        if (ti.current) {
          var l = ue(ti.current.type);
          if (l)
            return `

Check the render method of \`` + l + "`.";
        }
        return "";
      }
    }
    function vn(l) {
      {
        if (l !== void 0) {
          var v = l.fileName.replace(/^.*[\\\/]/, ""), C = l.lineNumber;
          return `

Check your code at ` + v + ":" + C + ".";
        }
        return "";
      }
    }
    var Ni = {};
    function En(l) {
      {
        var v = ji();
        if (!v) {
          var C = typeof l == "string" ? l : l.displayName || l.name;
          C && (v = `

Check the top-level render call using <` + C + ">.");
        }
        return v;
      }
    }
    function zi(l, v) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var C = En(v);
        if (Ni[C])
          return;
        Ni[C] = !0;
        var I = "";
        l && l._owner && l._owner !== ti.current && (I = " It was passed a child from " + ue(l._owner.type) + "."), Ge(l), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', C, I), Ge(null);
      }
    }
    function Fi(l, v) {
      {
        if (typeof l != "object")
          return;
        if (Jt(l))
          for (var C = 0; C < l.length; C++) {
            var I = l[C];
            si(I) && zi(I, v);
          }
        else if (si(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var z = O(l);
          if (typeof z == "function" && z !== l.entries)
            for (var Y = z.call(l), k; !(k = Y.next()).done; )
              si(k.value) && zi(k.value, v);
        }
      }
    }
    function bn(l) {
      {
        var v = l.type;
        if (v == null || typeof v == "string")
          return;
        var C;
        if (typeof v == "function")
          C = v.propTypes;
        else if (typeof v == "object" && (v.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        v.$$typeof === m))
          C = v.propTypes;
        else
          return;
        if (C) {
          var I = ue(v);
          on(C, l.props, "prop", I, l);
        } else if (v.PropTypes !== void 0 && !ii) {
          ii = !0;
          var z = ue(v);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", z || "Unknown");
        }
        typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Cn(l) {
      {
        for (var v = Object.keys(l.props), C = 0; C < v.length; C++) {
          var I = v[C];
          if (I !== "children" && I !== "key") {
            Ge(l), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", I), Ge(null);
            break;
          }
        }
        l.ref !== null && (Ge(l), y("Invalid attribute `ref` supplied to `React.Fragment`."), Ge(null));
      }
    }
    function Hi(l, v, C, I, z, Y) {
      {
        var k = Me(l);
        if (!k) {
          var U = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && (U += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ne = vn(z);
          ne ? U += ne : U += ji();
          var Q;
          l === null ? Q = "null" : Jt(l) ? Q = "array" : l !== void 0 && l.$$typeof === e ? (Q = "<" + (ue(l.type) || "Unknown") + " />", U = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof l, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, U);
        }
        var K = yn(l, v, C, z, Y);
        if (K == null)
          return K;
        if (k) {
          var fe = v.children;
          if (fe !== void 0)
            if (I)
              if (Jt(fe)) {
                for (var Ve = 0; Ve < fe.length; Ve++)
                  Fi(fe[Ve], l);
                Object.freeze && Object.freeze(fe);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Fi(fe, l);
        }
        return l === s ? Cn(K) : bn(K), K;
      }
    }
    function wn(l, v, C) {
      return Hi(l, v, C, !0);
    }
    function Sn(l, v, C) {
      return Hi(l, v, C, !1);
    }
    var xn = Sn, On = wn;
    ct.Fragment = s, ct.jsx = xn, ct.jsxs = On;
  }()), ct;
}
process.env.NODE_ENV === "production" ? wi.exports = _a() : wi.exports = ga();
var d = wi.exports;
function Qs(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ d.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ d.jsx("button", { children: i.title });
}
const ya = /* @__PURE__ */ d.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ d.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), va = /* @__PURE__ */ d.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ d.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Ea(i) {
  return /* @__PURE__ */ d.jsx(Gs.Item, { value: i.title, children: /* @__PURE__ */ d.jsxs("div", { children: [
    va,
    /* @__PURE__ */ d.jsx("span", { children: i.title }),
    /* @__PURE__ */ d.jsx("button", { className: "closeIcon", onClick: () => {
      i.onDelete(i.index);
    }, children: ya })
  ] }) }, i.title);
}
function ba(i) {
  const [e, t] = W(!1), [s, n] = W(i.options), r = (c) => {
    i.onDragComplete(c), n(c);
  }, a = (c) => {
    const u = [...s];
    u.splice(c, 1), r(u);
  }, o = [];
  s.forEach((c, u) => {
    o.push(/* @__PURE__ */ d.jsx(Ea, { index: u, title: c, onDelete: a }, c));
  });
  let h = "dropdown draggable";
  return i.subdropdown && (h += " subdropdown"), /* @__PURE__ */ d.jsxs("div", { className: h, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ d.jsx(Qs, { title: i.title }),
    /* @__PURE__ */ d.jsx(Gs.Group, { axis: "y", values: s, onReorder: r, style: { visibility: e ? "visible" : "hidden" }, children: o })
  ] });
}
function Ca(i) {
  const [e, t] = W(!1), s = [];
  i.options.map((r, a) => {
    i.onSelect !== void 0 && (r.onSelect = i.onSelect), s.push(/* @__PURE__ */ d.jsx(wa, { option: r }, a));
  });
  let n = "dropdown";
  return i.subdropdown && (n += " subdropdown"), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ d.jsx(Qs, { title: i.title }),
        /* @__PURE__ */ d.jsx(
          "ul",
          {
            style: { visibility: e ? "visible" : "hidden" },
            children: s
          }
        )
      ]
    }
  );
}
function wa(i) {
  const { option: e } = i, [t, s] = W("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ d.jsx(
        ba,
        {
          title: e.title,
          options: e.value,
          onDragComplete: (r) => {
            e.onDragComplete !== void 0 && e.onDragComplete(r);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      n = /* @__PURE__ */ d.jsx(
        Ca,
        {
          title: e.title,
          options: e.value,
          onSelect: e.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      n = /* @__PURE__ */ d.jsx(
        "button",
        {
          onClick: () => {
            e.onSelect !== void 0 && e.onSelect(e.value), e.selectable && (t !== e.title ? s(e.title) : s(""));
          },
          children: e.title
        }
      );
      break;
  }
  return /* @__PURE__ */ d.jsx("li", { className: t === e.title ? "selected" : "", children: n }, la());
}
function Hr(i, e, t) {
  function s(r) {
    switch (e.forEach((a) => {
      a.callback(i, a.remote, r);
    }), r.event) {
      case "custom":
        R.dispatchEvent({ type: P.CUSTOM, value: r.data });
        break;
    }
  }
  function n(r) {
    switch (t.forEach((a) => {
      a.callback(i, a.remote, r);
    }), r.event) {
      case "custom":
        R.dispatchEvent({ type: P.CUSTOM, value: r.data });
        break;
    }
  }
  i.listen = (r) => {
    r.target === "editor" ? n(r) : s(r);
  };
}
function Wt(i) {
  const [e, t] = W(i.open !== void 0 ? i.open : !0), s = !e || i.children === void 0, n = () => {
    R.dispatchEvent({ type: P.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `accordion ${s ? "hide" : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !e;
          i.onToggle !== void 0 && i.onToggle(r), t(r);
        },
        children: [
          /* @__PURE__ */ d.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "label", children: Zt(i.label) })
        ]
      }
    ),
    i.onRefresh ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("button", { className: "refresh", onClick: i.onRefresh }),
      /* @__PURE__ */ d.jsx("button", { className: "remove", onClick: n })
    ] }) : null,
    i.button,
    /* @__PURE__ */ d.jsx("div", { className: e ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { children: i.children }) }, Math.random())
  ] });
}
function qs(i) {
  const e = J(null), [t, s] = W(!1), n = i.child !== void 0 && i.child.children.length > 0, r = [];
  return i.child !== void 0 && i.child.children.length > 0 && i.child.children.map((a, o) => {
    r.push(/* @__PURE__ */ d.jsx(qs, { child: a, three: i.three }, o));
  }), nt(() => {
    if (i.child) {
      const a = i.three.getScene(i.child.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", i.child.uuid);
        o !== void 0 && (e.current.style.opacity = o.visible ? "1" : "0.25");
      }
    }
  }, [t]), /* @__PURE__ */ d.jsx(d.Fragment, { children: i.child !== void 0 && /* @__PURE__ */ d.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "child", children: [
      n ? /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: t ? "-14px" : "2px"
          },
          onClick: () => {
            s(!t);
          }
        }
      ) : null,
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "name",
          style: {
            left: n ? "20px" : "5px"
          },
          onClick: () => {
            i.child !== void 0 && (i.three.getObject(i.child.uuid), t || s(!0));
          },
          children: i.child.name.length > 0 ? `${i.child.name} (${i.child.type})` : `${i.child.type}::${i.child.uuid}`
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "visibility",
          ref: e,
          onClick: () => {
            if (i.child) {
              const a = i.three.getScene(i.child.uuid);
              if (a !== null) {
                const o = a.getObjectByProperty("uuid", i.child.uuid);
                if (o !== void 0) {
                  const h = "visible", c = !o.visible;
                  e.current.style.opacity = c ? "1" : "0.25", i.three.updateObject(i.child.uuid, h, c), q(o, h, c);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: `icon ${da(i.child)}` })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function Ki(i) {
  const e = [];
  return i.child?.children.map((t, s) => {
    e.push(/* @__PURE__ */ d.jsx(qs, { child: t, scene: i.scene, three: i.three }, s));
  }), /* @__PURE__ */ d.jsx("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: e });
}
function Sa(i) {
  const [e, t] = W(i.defaultValue);
  return nt(() => {
    let s = !1, n = -1, r = 0, a = i.defaultValue;
    const o = (_) => {
      s = !0, r = Number(i.input.current?.value), n = _.clientX, document.addEventListener("mouseup", c, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", c, !1);
    }, h = (_) => {
      if (!s)
        return;
      const g = i.step !== void 0 ? i.step : 1, S = (_.clientX - n) * g;
      a = Number((r + S).toFixed(4)), i.min !== void 0 && (a = Math.max(a, i.min)), i.max !== void 0 && (a = Math.min(a, i.max)), i.onChange !== void 0 && i.onChange(a), t(a);
    }, c = () => {
      s = !1, document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    }, u = (_) => {
      const g = Number(_.target.value);
      t(g);
    }, m = (_) => {
      const g = Number(_.target.value);
      i.onChange !== void 0 && i.onChange(g), t(g);
    };
    return i.input.current?.addEventListener("input", u), i.label.current?.addEventListener("mousedown", o, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", m), () => {
      i.input.current?.removeEventListener("input", u), i.label.current?.removeEventListener("mousedown", o), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    };
  }, []), e;
}
function Ze(i) {
  const e = J(null), t = J(null), s = Sa({
    label: i.labelRef,
    input: e,
    sliderRef: t,
    defaultValue: i.value,
    min: i.min,
    max: i.max,
    step: i.step,
    onChange: (n) => {
      i.onChange !== void 0 && i.onChange(i.prop, n);
    }
  });
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    i.type === "number" && /* @__PURE__ */ d.jsx(
      "input",
      {
        alt: i.alt,
        className: i.className,
        ref: e,
        type: "number",
        value: s,
        min: i.min,
        max: i.max,
        step: i.step,
        disabled: i.disabled,
        onChange: (n) => {
          const r = Number(n.target.value);
          i.onChange !== void 0 && i.onChange(i.prop, r);
        }
      }
    ),
    i.type === "range" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "text",
          value: s.toString(),
          disabled: i.disabled,
          ref: e,
          className: "min",
          onChange: (n) => {
            const r = Number(n.target.value);
            i.onChange !== void 0 && i.onChange(i.prop, r);
          }
        }
      ),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          disabled: i.disabled,
          type: "range",
          value: s,
          min: i.min,
          max: i.max,
          step: i.step,
          ref: t,
          onChange: Vs
        }
      )
    ] })
  ] });
}
function xa(i) {
  const e = J(null), t = J(null), s = J(null), n = J(null), r = J(null), a = J(null), [o, h] = W(i.value), [c, u] = W({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [m, _] = W(!1);
  function g() {
    m || (window.addEventListener("mousemove", T), window.addEventListener("mouseup", S), window.addEventListener("mouseup", S), _(!0));
  }
  function S() {
    window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", S), _(!1);
  }
  function T(E) {
    const M = r.current.getBoundingClientRect(), x = Fe(0, 99, E.clientX - M.left) / 99, j = Fe(0, 99, E.clientY - M.top) / 99, X = Xi(Ei(c.min, c.max, x), 3), me = Xi(Ei(c.min, c.max, j), 3);
    i.onChange({ target: { value: { x: X, y: me } } }), h({ x: X, y: me });
  }
  function O(E) {
    let M = o.x, x = o.y;
    E.target === e.current ? M = Number(E.target.value) : x = Number(E.target.value), h({ x: M, y: x });
  }
  function f() {
    const E = Number(s.current.value);
    u({ min: E, max: c.max }), (o.x < E || o.y < E) && h({ x: Fe(E, c.max, o.x), y: Fe(E, c.max, o.y) });
  }
  function y() {
    const E = Number(n.current.value);
    u({ min: c.min, max: E }), (o.x > E || o.y > E) && h({ x: Fe(c.min, E, o.x), y: Fe(c.min, E, o.y) });
  }
  nt(() => {
    const E = Gi(c.min, c.max, o.x), M = Gi(c.min, c.max, o.y);
    a.current.style.left = `${E * 100}%`, a.current.style.top = `${M * 100}%`;
  }, [c, o]);
  const b = i.step !== void 0 ? i.step : 0.01;
  return /* @__PURE__ */ d.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "X:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: o.x,
            min: c.min,
            max: c.max,
            step: b,
            onChange: O
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: o.y,
            min: c.min,
            max: c.max,
            step: b,
            onChange: O
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: c.min,
            step: b,
            onChange: f
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: c.max,
            step: b,
            onChange: y
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "input", ref: r, onMouseDown: g, onMouseUp: S, children: [
      /* @__PURE__ */ d.jsx("div", { className: "x" }),
      /* @__PURE__ */ d.jsx("div", { className: "y" }),
      /* @__PURE__ */ d.jsx("div", { className: "pt", ref: a })
    ] })
  ] });
}
function Ji(i) {
  const e = i.value.x !== void 0 && i.value.y !== void 0 && i.value.z !== void 0, t = i.value.isEuler !== void 0, s = i.value.elements !== void 0, n = i.step !== void 0 ? i.step : 0.01, r = [];
  if (e) {
    const a = bt(() => i.value, []), o = (c, u) => {
      a[c] = u, i.onChange({ target: { value: a } });
    };
    ["x", "y", "z"].forEach((c) => {
      const u = J(null);
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: u, children: c.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: a[c],
              type: "number",
              prop: c,
              step: n,
              labelRef: u,
              onChange: o
            }
          )
        ] }, c)
      );
    });
  } else if (t) {
    const a = bt(() => i.value, []), o = (c, u) => {
      a[c] = u, i.onChange({ target: { value: a } });
    };
    ["_x", "_y", "_z"].forEach((c) => {
      const u = J(null);
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: u, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: a[c],
              type: "number",
              prop: c,
              step: n,
              labelRef: u,
              onChange: o
            }
          )
        ] }, c)
      );
    });
  } else if (s) {
    const a = bt(() => i.value, []), o = (h, c) => {
      const u = Number(h);
      a.elements[u] = c, i.onChange({ target: { value: a } });
    };
    for (let h = 0; h < 9; h++) {
      const c = J(null);
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: c, children: h + 1 }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: a.elements[h],
              type: "number",
              prop: h.toString(),
              step: n,
              labelRef: c,
              onChange: o
            }
          )
        ] }, h.toString())
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid3", children: r }, Math.random().toString());
}
function Oa(i) {
  const e = i.value.x !== void 0, t = i.step !== void 0 ? i.step : 0.01, s = [];
  if (e) {
    const n = bt(() => i.value, []), r = (o, h) => {
      n[o] = h, i.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const h = J(null);
      s.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: h, children: o.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: n.x,
              type: "number",
              prop: o,
              step: t,
              labelRef: h,
              onChange: r
            }
          )
        ] }, o)
      );
    });
  } else {
    const n = bt(() => i.value, []), r = (a, o) => {
      const h = Number(a);
      n.elements[h] = o, i.onChange({ target: { value: n } });
    };
    for (let a = 0; a < 16; a++) {
      const o = J(null);
      s.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: o, children: a + 1 }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: n.elements[a],
              type: "number",
              prop: a.toString(),
              step: t,
              labelRef: o,
              onChange: r
            }
          )
        ] }, a.toString())
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid4", children: s });
}
function Ta(i) {
  return !(i === "defaultAttributeValues" || i === "forceSinglePass" || i === "linecap" || i === "linejoin" || i === "linewidth" || i === "normalMapType" || i === "precision" || i === "shadowSide" || i === "uniformsGroups" || i === "uniformsNeedUpdate" || i === "userData" || i === "version" || i === "wireframeLinecap" || i === "wireframeLinejoin" || i === "wireframeLinewidth" || i.slice(0, 4) === "clip" || i.slice(0, 7) === "polygon" || i.slice(0, 7) === "stencil" || i.slice(0, 2) === "is");
}
function Ma(i) {
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
function $t(i) {
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
function Ks(i) {
  const e = i.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function Da() {
  const i = document.createElement("input");
  return i.type = "file", new Promise((e, t) => {
    i.addEventListener("change", function() {
      if (i.files === null)
        t();
      else {
        const s = i.files[0], n = new FileReader();
        n.onload = function(r) {
          e(r.target.result);
        }, n.readAsDataURL(s);
      }
    }), i.click();
  });
}
const Pa = [
  {
    title: "Front",
    value: Dn
  },
  {
    title: "Back",
    value: xs
  },
  {
    title: "Double",
    value: xi
  }
], Ra = [
  {
    title: "No Blending",
    value: Pn
  },
  {
    title: "Normal",
    value: Rn
  },
  {
    title: "Additive",
    value: An
  },
  {
    title: "Subtractive",
    value: In
  },
  {
    title: "Multiply",
    value: Ln
  },
  {
    title: "Custom",
    value: Un
  }
], Aa = [
  {
    title: "Add",
    value: kn
  },
  {
    title: "Subtract",
    value: jn
  },
  {
    title: "Reverse Subtract",
    value: Nn
  },
  {
    title: "Min",
    value: zn
  },
  {
    title: "Max",
    value: Fn
  }
], Ia = [
  {
    title: "Zero",
    value: Os
  },
  {
    title: "One",
    value: Ts
  },
  {
    title: "Src Color",
    value: Ms
  },
  {
    title: "One Minus Src Color",
    value: Ds
  },
  {
    title: "Src Alpha",
    value: Ps
  },
  {
    title: "One Minus Src Alpha",
    value: Rs
  },
  {
    title: "Dst Alpha",
    value: As
  },
  {
    title: "One Minus Dst Alpha",
    value: Is
  },
  {
    title: "Dst Color",
    value: Ls
  },
  {
    title: "One Minus Dst Color",
    value: Us
  },
  {
    title: "Src Alpha Saturate",
    value: Hn
  },
  {
    title: "Constant Color",
    value: ks
  },
  {
    title: "One Minus Constant Color",
    value: js
  },
  {
    title: "Constant Alpha",
    value: Ns
  },
  {
    title: "One Minus Constant Alpha",
    value: zs
  }
], La = [
  {
    title: "Zero",
    value: Os
  },
  {
    title: "One",
    value: Ts
  },
  {
    title: "Src Color",
    value: Ms
  },
  {
    title: "One Minus Src Color",
    value: Ds
  },
  {
    title: "Src Alpha",
    value: Ps
  },
  {
    title: "One Minus Src Alpha",
    value: Rs
  },
  {
    title: "Dst Alpha",
    value: As
  },
  {
    title: "One Minus Dst Alpha",
    value: Is
  },
  {
    title: "Dst Color",
    value: Ls
  },
  {
    title: "One Minus Dst Color",
    value: Us
  },
  {
    title: "Constant Color",
    value: ks
  },
  {
    title: "One Minus Constant Color",
    value: js
  },
  {
    title: "Constant Alpha",
    value: Ns
  },
  {
    title: "One Minus Constant Alpha",
    value: zs
  }
];
function ht(i, e) {
  i.needsUpdate = !0, i.type = "option", i.options = e;
}
function Ua(i, e, t, s) {
  return {
    type: "boolean",
    title: $t(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (n, r) => {
      s.updateObject(t.uuid, `material.${i}`, r), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const a = s.getScene(t.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", t.uuid);
        q(o, `material.${i}`, r);
      }
    }
  };
}
function ka(i, e, t, s) {
  const n = {
    type: "number",
    title: $t(i),
    prop: i,
    value: e,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (r, a) => {
      s.updateObject(t.uuid, `material.${i}`, a), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = s.getScene(t.uuid);
      if (o !== null) {
        const h = o.getObjectByProperty("uuid", t.uuid);
        q(h, `material.${i}`, a);
      }
    }
  };
  switch (i) {
    case "blending":
      ht(n, Ra);
      break;
    case "blendDst":
      ht(n, La);
      break;
    case "blendEquation":
      ht(n, Aa);
      break;
    case "blendSrc":
      ht(n, Ia);
      break;
    case "side":
      ht(n, Pa);
      break;
  }
  return Ks(i) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function ja(i, e, t, s) {
  const n = {
    type: "string",
    title: $t(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (a, o) => {
      s.updateObject(t.uuid, `material.${i}`, o), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const h = s.getScene(t.uuid);
      if (h !== null) {
        const c = h.getObjectByProperty("uuid", t.uuid);
        q(c, `material.${i}`, o);
      }
    },
    onKeyDown: (a) => {
    }
  };
  return (i === "vertexShader" || i === "fragmentShader") && (n.disabled = !1, n.latest = n.value, n.onChange = (a, o) => {
    n.latest = o, s.updateObject(t.uuid, `material.${i}`, o);
    const h = s.getScene(t.uuid);
    if (h !== null) {
      const c = h.getObjectByProperty("uuid", t.uuid);
      q(c, `material.${i}`, o);
    }
  }, n.onKeyDown = (a) => {
    if (a.key === "Enter" && (a.altKey || a.metaKey)) {
      s.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = s.getScene(t.uuid);
      if (o !== null) {
        const h = o.getObjectByProperty("uuid", t.uuid);
        q(h, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Na(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z === void 0;
}
function za(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w === void 0;
}
function Fa(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w !== void 0;
}
function Si(i) {
  i.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function yt(i, e, t, s, n = "", r = !1) {
  const a = $t(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${i}` : i, h = typeof e;
  if (h === "boolean" || h === "string")
    return {
      title: a,
      prop: o,
      type: h,
      value: e,
      disabled: r,
      onChange: (c, u) => {
        s.updateObject(t.uuid, `material.${o}`, u);
        const m = s.getScene(t.uuid);
        if (m !== null) {
          const _ = m.getObjectByProperty("uuid", t.uuid);
          q(_, `material.${o}`, u);
        }
      }
    };
  if (h === "number") {
    const c = {
      title: a,
      prop: o,
      type: "number",
      value: e,
      step: 0.01,
      disabled: r,
      onChange: (u, m) => {
        s.updateObject(t.uuid, `material.${o}`, m);
        const _ = s.getScene(t.uuid);
        if (_ !== null) {
          const g = _.getObjectByProperty("uuid", t.uuid);
          q(g, `material.${o}`, m);
        }
      }
    };
    return Ks(a) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (e.isColor)
      return {
        title: a,
        prop: o,
        type: "color",
        value: e,
        disabled: r,
        onChange: (c, u) => {
          const m = new Vt(u);
          s.updateObject(t.uuid, `material.${o}`, m);
          const _ = s.getScene(t.uuid);
          if (_ !== null) {
            const g = _.getObjectByProperty("uuid", t.uuid);
            q(g, `material.${o}`, m);
          }
        }
      };
    if (Array.isArray(e)) {
      const c = [];
      for (const u in e) {
        const m = e[u], _ = `[${u.toString()}]`;
        if (m.value !== void 0) {
          const g = yt(`${_}.value`, m.value, t, s, o, r);
          g !== void 0 && c.push(g);
        } else {
          const g = yt(_, m, t, s, o, r);
          g !== void 0 && c.push(g);
        }
      }
      if (c.length > 0)
        return Si(c), {
          title: a,
          items: c
        };
    } else {
      if (Na(e))
        return {
          title: a,
          prop: o,
          type: "vector2",
          value: e,
          disabled: r,
          onChange: (c, u) => {
            s.updateObject(t.uuid, `material.${o}`, u);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              q(_, `material.${o}`, u);
            }
          }
        };
      if (za(e))
        return {
          title: a,
          prop: o,
          type: "grid3",
          value: e,
          disabled: r,
          onChange: (c, u) => {
            s.updateObject(t.uuid, `material.${o}`, u);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              q(_, `material.${o}`, u);
            }
          }
        };
      if (Fa(e))
        return {
          title: a,
          prop: o,
          type: "grid4",
          value: e,
          disabled: r,
          onChange: (c, u) => {
            s.updateObject(t.uuid, `material.${o}`, u);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              q(_, `material.${o}`, u);
            }
          }
        };
      if (e.isEuler)
        return {
          title: a,
          prop: o,
          type: "euler",
          value: e,
          disabled: r,
          onChange: (c, u) => {
            s.updateObject(t.uuid, `material.${o}`, u);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              q(_, `material.${o}`, u);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: a,
          type: "image",
          value: e,
          disabled: r,
          onChange: (c, u) => {
            const m = Ma(i), _ = n.length > 0 ? `${n}.${m}` : m;
            s.createTexture(t.uuid, `material.${_}`, u);
            const g = s.getScene(t.uuid);
            if (g !== null) {
              const S = g.getObjectByProperty("uuid", t.uuid);
              if (S !== void 0) {
                const T = (O) => {
                  const f = S.material, y = _.split(".");
                  switch (y.length) {
                    case 1:
                      f[y[0]] = O;
                      break;
                    case 2:
                      f[y[0]][y[1]] = O;
                      break;
                    case 3:
                      f[y[0]][y[1]][y[2]] = O;
                      break;
                    case 4:
                      f[y[0]][y[1]][y[2]][y[3]] = O;
                      break;
                    case 5:
                      f[y[0]][y[1]][y[2]][y[3]][y[4]] = O;
                      break;
                  }
                  f.needsUpdate = !0;
                };
                u.src.length > 0 ? $s(u.src).then((O) => {
                  O.offset.set(u.offset[0], u.offset[1]), O.repeat.set(u.repeat[0], u.repeat[1]), T(O);
                }) : T(null);
              }
            }
          }
        };
      if (e.elements !== void 0)
        return {
          title: a,
          prop: o,
          type: e.elements.length > 9 ? "grid4" : "grid3",
          value: e,
          disabled: r,
          onChange: (c, u) => {
            s.updateObject(t.uuid, `material.${o}`, u);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              q(_, `material.${o}`, u);
            }
          }
        };
      {
        const c = [], u = i === "defines" || i === "extensions";
        try {
          for (const m in e) {
            const _ = e[m];
            if (_ !== void 0)
              if (_.value !== void 0) {
                const g = yt(`${m}.value`, _.value, t, s, o, u);
                g !== void 0 && c.push(g);
              } else {
                const g = yt(m, _, t, s, o, u);
                g !== void 0 && c.push(g);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", i, e);
        }
        if (c.length > 0)
          return Si(c), {
            title: a,
            items: c
          };
      }
    }
  }
}
function es(i, e, t) {
  const s = [];
  for (const n in i) {
    if (!Ta(n))
      continue;
    const r = typeof i[n], a = i[n];
    if (r === "boolean")
      s.push(Ua(n, a, e, t));
    else if (r === "number")
      s.push(ka(n, a, e, t));
    else if (r === "string")
      s.push(ja(n, a, e, t));
    else if (r === "object") {
      const o = yt(n, a, e, t);
      o !== void 0 && s.push(o);
    } else
      a !== void 0 && console.log("other:", n, r, a);
  }
  return Si(s), s.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const r = n.getObjectByProperty("uuid", e.uuid);
        q(r, "material.needsUpdate", !0);
      }
    }
  }), s;
}
function Ha(i, e) {
  const t = i.material;
  if (Array.isArray(t)) {
    const s = [], n = t.length;
    for (let r = 0; r < n; r++)
      s.push(
        /* @__PURE__ */ d.jsx(
          Te,
          {
            title: `Material ${r}`,
            items: es(t[r], i, e)
          },
          `Material ${r}`
        )
      );
    return /* @__PURE__ */ d.jsx(d.Fragment, { children: s });
  } else
    return /* @__PURE__ */ d.jsx(
      Te,
      {
        title: "Material",
        items: es(t, i, e)
      }
    );
}
const ts = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Ya(i) {
  const e = i.step !== void 0 ? i.step : 0.01, t = J(null), s = J(null), n = J(null), r = J(null), a = J(null), [o] = W(i.value), [h, c] = W(i.value.offset[0]), [u, m] = W(i.value.offset[1]), [_, g] = W(i.value.repeat[0]), [S, T] = W(i.value.repeat[1]);
  function O(y, b, E, M, x) {
    if (i.onChange !== void 0) {
      const j = i.prop !== void 0 ? i.prop : i.title;
      i.onChange(j, {
        src: y,
        offset: [b, E],
        repeat: [M, x]
      });
    }
  }
  function f(y) {
    const b = t.current.src, E = y.target.value;
    switch (y.target) {
      case s.current:
        c(E), O(b, E, u, _, S);
        break;
      case n.current:
        m(E), O(b, h, E, _, S);
        break;
      case r.current:
        g(E), O(b, h, u, E, S);
        break;
      case a.current:
        T(E), O(b, h, u, _, E);
        break;
    }
  }
  return /* @__PURE__ */ d.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ d.jsx("img", { alt: i.title, ref: t, onClick: () => {
      Da().then((y) => {
        t.current.src = y, O(y, h, u, _, S);
      });
    }, src: o.src.length > 0 ? o.src : ts }),
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: h,
            step: e,
            onChange: f
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: u,
            step: e,
            onChange: f
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: r,
            type: "number",
            value: _,
            step: e,
            onChange: f
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: S,
            step: e,
            onChange: f
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("button", { onClick: () => {
        O("", h, u, _, S), t.current.src = ts;
      }, children: "Clear" })
    ] })
  ] });
}
function Yt(i) {
  let e = i.value;
  e !== void 0 && (e.isColor !== void 0 ? e = Vi(i.value) : i.type === "color" && (e = Vi(new Vt(i.value))));
  const [t, s] = W(e), n = J(null), r = (c) => {
    let u = c.target.value;
    if (i.type === "boolean")
      u = c.target.checked;
    else if (i.type === "option" && (typeof i.value == "number" ? u = Number(u) : typeof i.value == "boolean" ? u = !!u : typeof i.value == "object" && (u = JSON.parse(u)), i.options !== void 0)) {
      const m = i.options.length;
      for (let _ = 0; _ < m && i.options[_].value !== u; _++)
        ;
    }
    s(u), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, u);
  }, a = {};
  i.disabled && (a.opacity = 0.8);
  const o = i.type === "string" && (t.length > 100 || t.search(`
`) > -1), h = o || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ d.jsxs("div", { className: `field ${h ? "block" : ""}`, style: a, children: [
    i.type !== "button" && /* @__PURE__ */ d.jsx("label", { ref: n, children: Zt(i.title) }, "fieldLabel"),
    i.type === "string" && !o && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "text",
        disabled: i.disabled,
        onChange: r,
        value: t
      }
    ),
    i.type === "string" && o && /* @__PURE__ */ d.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: i.disabled !== void 0 ? i.disabled : !0,
        onChange: r,
        onKeyDown: (c) => {
          i.onKeyDown !== void 0 && i.onKeyDown(c);
        },
        value: t
      }
    ),
    i.type === "boolean" && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "checkbox",
        disabled: i.disabled,
        onChange: r,
        checked: t
      }
    ),
    i.type === "number" && /* @__PURE__ */ d.jsx(
      Ze,
      {
        value: t,
        type: i.type,
        prop: i.prop !== void 0 ? i.prop : i.title,
        min: i.min,
        max: i.max,
        step: i.step,
        disabled: i.disabled,
        labelRef: n,
        onChange: i.onChange
      }
    ),
    i.type === "range" && /* @__PURE__ */ d.jsx(
      Ze,
      {
        value: t,
        type: i.type,
        prop: i.prop !== void 0 ? i.prop : i.title,
        min: i.min,
        max: i.max,
        step: i.step,
        disabled: i.disabled,
        labelRef: n,
        onChange: i.onChange
      }
    ),
    i.type === "color" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: t.toString(), onChange: r, disabled: i.disabled, className: "color" }),
      /* @__PURE__ */ d.jsx("input", { type: "color", value: t, onChange: r, disabled: i.disabled })
    ] }),
    i.type === "button" && /* @__PURE__ */ d.jsx(
      "button",
      {
        disabled: i.disabled,
        onClick: () => {
          i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, !0);
        },
        children: i.title
      }
    ),
    i.type === "image" && /* @__PURE__ */ d.jsx(Ya, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx("select", { onChange: r, disabled: i.disabled, defaultValue: i.value, children: i.options?.map((c, u) => /* @__PURE__ */ d.jsx("option", { value: c.value, children: Zt(c.title) }, u)) }) }),
    i.type === "vector2" && /* @__PURE__ */ d.jsx(xa, { step: i.step, value: t, min: 0, max: 1, onChange: r }),
    i.type === "grid3" && /* @__PURE__ */ d.jsx(Ji, { step: i.step, value: t, onChange: r }),
    i.type === "grid4" && /* @__PURE__ */ d.jsx(Oa, { step: i.step, value: t, onChange: r }),
    i.type === "euler" && /* @__PURE__ */ d.jsx(Ji, { step: i.step, value: t, onChange: r })
  ] });
}
function Ba(i) {
  return "items" in i;
}
function Te(i) {
  const e = [];
  return i.items.forEach((t) => {
    Ba(t) ? e.push(
      /* @__PURE__ */ d.jsx(Te, { title: Zt(t.title), items: t.items }, Math.random())
    ) : e.push(
      /* @__PURE__ */ d.jsx(
        Yt,
        {
          title: t.title,
          prop: t.prop,
          value: t.value,
          type: t.type,
          min: t.min,
          max: t.max,
          step: t.step,
          disabled: t.disabled,
          options: t.options,
          onChange: (s, n) => {
            t.onChange !== void 0 && t.onChange(s, n);
          },
          onKeyDown: (s) => {
            t.onKeyDown !== void 0 && t.onKeyDown(s);
          }
        },
        Math.random()
      )
    );
  }), /* @__PURE__ */ d.jsx(
    Wt,
    {
      label: i.title,
      open: i.expanded === !0,
      onToggle: (t) => {
        i.onToggle && i?.onToggle(t);
      },
      children: e
    }
  );
}
class Ye extends Oi {
  static instance = null;
  constructor(e) {
    super(e), this.state = {
      groups: [],
      groupTitles: [],
      lastUpdate: Date.now()
    }, Ye.instance = this;
  }
  componentDidMount() {
    R.addEventListener(P.ADD_GROUP, this.addGroup), R.addEventListener(P.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    R.removeEventListener(P.ADD_GROUP, this.addGroup), R.removeEventListener(P.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ d.jsx("div", { className: "customGroups", children: this.state.groups }, this.state.lastUpdate);
  }
  // Events
  addGroup = (e) => {
    const t = JSON.parse(e.value), s = [];
    t.items.forEach((n) => {
      s.push({
        type: n.type,
        prop: n.prop,
        title: n.title !== void 0 ? n.title : n.prop,
        value: n.value,
        min: n.min,
        max: n.max,
        step: n.step,
        options: n.options,
        disabled: n.disabled,
        onChange: (r, a) => {
          this.props.three.updateGroup(t.title, r, a);
        }
      });
    }), this.state.groups.push(
      /* @__PURE__ */ d.jsx(
        Te,
        {
          title: t.title,
          items: s
        },
        Math.random()
      )
    ), this.state.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, s = this.state.groupTitles.length;
    for (let n = 0; n < s; n++)
      if (t === this.state.groupTitles[n]) {
        this.state.groups.splice(n, 1), this.state.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
        return;
      }
  };
  // Static
  static addEditorGroup(e) {
    const t = [];
    e.items.forEach((s) => {
      t.push({
        type: s.type,
        prop: s.prop,
        title: s.title !== void 0 ? s.title : s.prop,
        value: s.value,
        min: s.min,
        max: s.max,
        step: s.step,
        options: s.options,
        disabled: s.disabled,
        onChange: (n, r) => {
          e.onUpdate(n, r);
        }
      });
    }), Ye.instance.state.groups.push(
      /* @__PURE__ */ d.jsx(
        Te,
        {
          title: e.title,
          items: t
        },
        Math.random()
      )
    ), Ye.instance.state.groupTitles.push(e.title), Ye.instance.setState({ lastUpdate: Date.now() });
  }
  static removeEditorGroup(e) {
    Ye.instance.removeGroup({ value: e });
  }
}
function is(i) {
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
function Za(i, e) {
  const t = [];
  if (i.perspectiveCameraInfo !== void 0)
    for (const s in i.perspectiveCameraInfo)
      t.push({
        title: is(s),
        prop: s,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[s],
        onChange: (n, r) => {
          e.updateObject(i.uuid, n, r), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const a = e.getScene(i.uuid);
          if (a !== null) {
            const o = a.getObjectByProperty("uuid", i.uuid);
            o !== void 0 && (q(o, n, r), o.updateProjectionMatrix());
          }
        }
      });
  else if (i.orthographicCameraInfo !== void 0)
    for (const s in i.orthographicCameraInfo)
      t.push({
        title: is(s),
        prop: s,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[s],
        onChange: (n, r) => {
          e.updateObject(i.uuid, n, r), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const a = e.getScene(i.uuid);
          if (a !== null) {
            const o = a.getObjectByProperty("uuid", i.uuid);
            o !== void 0 && (q(o, n, r), o.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ d.jsx(
    Te,
    {
      title: "Camera",
      items: t
    }
  );
}
class Wa extends xe {
  constructor(e, t) {
    const s = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new Ct();
    n.setAttribute("position", new Be(s, 3)), n.computeBoundingSphere();
    const r = new Fs({ fog: !1 });
    super(n, r), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const a = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new Ct();
    o.setAttribute("position", new Be(a, 3)), o.computeBoundingSphere(), this.add(new w(o, new St({ side: xs, fog: !1 })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const e = this.material.color, t = Math.max(e.r, e.g, e.b);
      t > 1 && e.multiplyScalar(1 / t), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const ss = { type: "change" }, Mi = { type: "start" }, Js = { type: "end" }, It = new Yn(), ns = new Bn(), Ga = Math.cos(70 * Zn.DEG2RAD), te = new D(), ce = 2 * Math.PI, H = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, ri = 1e-6;
class Va extends Hs {
  constructor(e, t = null) {
    super(e, t), this.state = H.NONE, this.enabled = !0, this.target = new D(), this.cursor = new D(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: st.ROTATE, MIDDLE: st.DOLLY, RIGHT: st.PAN }, this.touches = { ONE: it.ROTATE, TWO: it.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new D(), this._lastQuaternion = new pe(), this._lastTargetPosition = new D(), this._quat = new pe().setFromUnitVectors(e.up, new D(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new gi(), this._sphericalDelta = new gi(), this._scale = 1, this._panOffset = new D(), this._rotateStart = new re(), this._rotateEnd = new re(), this._rotateDelta = new re(), this._panStart = new re(), this._panEnd = new re(), this._panDelta = new re(), this._dollyStart = new re(), this._dollyEnd = new re(), this._dollyDelta = new re(), this._dollyDirection = new D(), this._mouse = new re(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = $a.bind(this), this._onPointerDown = Xa.bind(this), this._onPointerUp = Qa.bind(this), this._onContextMenu = sr.bind(this), this._onMouseWheel = Ja.bind(this), this._onKeyDown = er.bind(this), this._onTouchStart = tr.bind(this), this._onTouchMove = ir.bind(this), this._onMouseDown = qa.bind(this), this._onMouseMove = Ka.bind(this), this._interceptControlDown = nr.bind(this), this._interceptControlUp = ar.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(ss), this.update(), this.state = H.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    te.copy(t).sub(this.target), te.applyQuaternion(this._quat), this._spherical.setFromVector3(te), this.autoRotate && this.state === H.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(s) && isFinite(n) && (s < -Math.PI ? s += ce : s > Math.PI && (s -= ce), n < -Math.PI ? n += ce : n > Math.PI && (n -= ce), s <= n ? this._spherical.theta = Math.max(s, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + n) / 2 ? Math.max(s, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (te.setFromSpherical(this._spherical), te.applyQuaternion(this._quatInverse), t.copy(this.target).add(te), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = te.length();
        a = this._clampDistance(o * this._scale);
        const h = o - a;
        this.object.position.addScaledVector(this._dollyDirection, h), this.object.updateMatrixWorld(), r = !!h;
      } else if (this.object.isOrthographicCamera) {
        const o = new D(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const h = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = h !== this.object.zoom;
        const c = new D(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), a = te.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (It.origin.copy(this.object.position), It.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(It.direction)) < Ga ? this.object.lookAt(this.target) : (ns.setFromNormalAndCoplanarPoint(this.object.up, this.target), It.intersectPlane(ns, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > ri || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ri || this._lastTargetPosition.distanceToSquared(this.target) > ri ? (this.dispatchEvent(ss), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? ce / 60 * this.autoRotateSpeed * e : ce / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    te.setFromMatrixColumn(t, 0), te.multiplyScalar(-e), this._panOffset.add(te);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? te.setFromMatrixColumn(t, 1) : (te.setFromMatrixColumn(t, 0), te.crossVectors(this.object.up, te)), te.multiplyScalar(e), this._panOffset.add(te);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      te.copy(n).sub(this.target);
      let r = te.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / s.clientHeight, this.object.matrix), this._panUp(2 * t * r / s.clientHeight, this.object.matrix);
    } else
      this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / s.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / s.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const s = this.domElement.getBoundingClientRect(), n = e - s.left, r = t - s.top, a = s.width, o = s.height;
    this._mouse.x = n / a * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(ce * this._rotateDelta.x / t.clientHeight), this._rotateUp(ce * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(ce * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-ce * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(ce * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-ce * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(s, n);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panStart.set(s, n);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, n = e.pageY - t.y, r = Math.sqrt(s * s + n * n);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const s = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + s.x), r = 0.5 * (e.pageY + s.y);
      this._rotateEnd.set(n, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(ce * this._rotateDelta.x / t.clientHeight), this._rotateUp(ce * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panEnd.set(s, n);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, n = e.pageY - t.y, r = Math.sqrt(s * s + n * n);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const a = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(a, o);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId)
        return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new re(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, s = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        s.deltaY *= 16;
        break;
      case 2:
        s.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (s.deltaY *= 10), s;
  }
}
function Xa(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function $a(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Qa(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Js), this.state = H.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function qa(i) {
  let e;
  switch (i.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case st.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(i), this.state = H.DOLLY;
      break;
    case st.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(i), this.state = H.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(i), this.state = H.ROTATE;
      }
      break;
    case st.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(i), this.state = H.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(i), this.state = H.PAN;
      }
      break;
    default:
      this.state = H.NONE;
  }
  this.state !== H.NONE && this.dispatchEvent(Mi);
}
function Ka(i) {
  switch (this.state) {
    case H.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(i);
      break;
    case H.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(i);
      break;
    case H.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(i);
      break;
  }
}
function Ja(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== H.NONE || (i.preventDefault(), this.dispatchEvent(Mi), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Js));
}
function er(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function tr(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case it.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(i), this.state = H.TOUCH_ROTATE;
          break;
        case it.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(i), this.state = H.TOUCH_PAN;
          break;
        default:
          this.state = H.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case it.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(i), this.state = H.TOUCH_DOLLY_PAN;
          break;
        case it.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(i), this.state = H.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = H.NONE;
      }
      break;
    default:
      this.state = H.NONE;
  }
  this.state !== H.NONE && this.dispatchEvent(Mi);
}
function ir(i) {
  switch (this._trackPointer(i), this.state) {
    case H.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case H.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(i), this.update();
      break;
    case H.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case H.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = H.NONE;
  }
}
function sr(i) {
  this.enabled !== !1 && i.preventDefault();
}
function nr(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function ar(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
const rr = Math.PI / 180;
function Qe(i, e, t, s, n) {
  return s + (i - e) * (n - s) / (t - e);
}
function as(i) {
  return i * rr;
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const V = {
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
}), qe = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function ke(i) {
  return i.isPerspectiveCamera;
}
function Pe(i) {
  return i.isOrthographicCamera;
}
const Ke = Math.PI * 2, rs = Math.PI / 2, en = 1e-5, dt = Math.PI / 180;
function ye(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Z(i, e = en) {
  return Math.abs(i) < e;
}
function F(i, e, t = en) {
  return Z(i - e, t);
}
function os(i, e) {
  return Math.round(i / e) * e;
}
function ut(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function pt(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function Lt(i, e, t, s, n = 1 / 0, r) {
  s = Math.max(1e-4, s);
  const a = 2 / s, o = a * r, h = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let c = i - e;
  const u = e, m = n * s;
  c = ye(c, -m, m), e = i - c;
  const _ = (t.value + a * c) * r;
  t.value = (t.value - a * _) * h;
  let g = e + (c + _) * h;
  return u - i > 0 == g > u && (g = u, t.value = (g - u) / r), g;
}
function ls(i, e, t, s, n = 1 / 0, r, a) {
  s = Math.max(1e-4, s);
  const o = 2 / s, h = o * r, c = 1 / (1 + h + 0.48 * h * h + 0.235 * h * h * h);
  let u = e.x, m = e.y, _ = e.z, g = i.x - u, S = i.y - m, T = i.z - _;
  const O = u, f = m, y = _, b = n * s, E = b * b, M = g * g + S * S + T * T;
  if (M > E) {
    const $ = Math.sqrt(M);
    g = g / $ * b, S = S / $ * b, T = T / $ * b;
  }
  u = i.x - g, m = i.y - S, _ = i.z - T;
  const x = (t.x + o * g) * r, j = (t.y + o * S) * r, X = (t.z + o * T) * r;
  t.x = (t.x - o * x) * c, t.y = (t.y - o * j) * c, t.z = (t.z - o * X) * c, a.x = u + (g + x) * c, a.y = m + (S + j) * c, a.z = _ + (T + X) * c;
  const me = O - i.x, Me = f - i.y, at = y - i.z, We = a.x - O, ue = a.y - f, ee = a.z - y;
  return me * We + Me * ue + at * ee > 0 && (a.x = O, a.y = f, a.z = y, t.x = (a.x - O) / r, t.y = (a.y - f) / r, t.z = (a.z - y) / r), a;
}
function oi(i, e) {
  e.set(0, 0), i.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= i.length, e.y /= i.length;
}
function li(i, e) {
  return Pe(i) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class or {
  constructor() {
    this._listeners = {};
  }
  /**
   * Adds the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(e, t) {
    const s = this._listeners;
    s[e] === void 0 && (s[e] = []), s[e].indexOf(t) === -1 && s[e].push(t);
  }
  /**
   * Presence of the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  hasEventListener(e, t) {
    const s = this._listeners;
    return s[e] !== void 0 && s[e].indexOf(t) !== -1;
  }
  /**
   * Removes the specified event listener
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(e, t) {
    const n = this._listeners[e];
    if (n !== void 0) {
      const r = n.indexOf(t);
      r !== -1 && n.splice(r, 1);
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
    const s = this._listeners[e.type];
    if (s !== void 0) {
      e.target = this;
      const n = s.slice(0);
      for (let r = 0, a = n.length; r < a; r++)
        n[r].call(this, e);
    }
  }
}
var ci;
const lr = "2.9.0", Ut = 1 / 8, cr = /Mac/.test((ci = globalThis?.navigator) === null || ci === void 0 ? void 0 : ci.platform);
let A, cs, kt, hi, he, L, N, Je, mt, ve, Ee, je, hs, ds, _e, ft, et, us, di, ps, ui, pi, jt;
class Ce extends or {
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
    A = e.THREE, cs = Object.freeze(new A.Vector3(0, 0, 0)), kt = Object.freeze(new A.Vector3(0, 1, 0)), hi = Object.freeze(new A.Vector3(0, 0, 1)), he = new A.Vector2(), L = new A.Vector3(), N = new A.Vector3(), Je = new A.Vector3(), mt = new A.Vector3(), ve = new A.Vector3(), Ee = new A.Vector3(), je = new A.Vector3(), hs = new A.Vector3(), ds = new A.Vector3(), _e = new A.Spherical(), ft = new A.Spherical(), et = new A.Box3(), us = new A.Box3(), di = new A.Sphere(), ps = new A.Quaternion(), ui = new A.Quaternion(), pi = new A.Matrix4(), jt = new A.Raycaster();
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
  constructor(e, t) {
    super(), this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.minDistance = Number.EPSILON, this.maxDistance = 1 / 0, this.infinityDolly = !1, this.minZoom = 0.01, this.maxZoom = 1 / 0, this.smoothTime = 0.25, this.draggingSmoothTime = 0.125, this.maxSpeed = 1 / 0, this.azimuthRotateSpeed = 1, this.polarRotateSpeed = 1, this.dollySpeed = 1, this.dollyDragInverted = !1, this.truckSpeed = 2, this.dollyToCursor = !1, this.dragToOffset = !1, this.verticalDragToForward = !1, this.boundaryFriction = 0, this.restThreshold = 0.01, this.colliderMeshes = [], this.cancel = () => {
    }, this._enabled = !0, this._state = p.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = qe.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new A.Vector3(), this._focalOffsetVelocity = new A.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (f, y, b) => {
      let E, M;
      if (ke(this._camera)) {
        const x = L.copy(this._camera.position).sub(this._target), j = this._camera.getEffectiveFOV() * dt, X = x.length() * Math.tan(j * 0.5);
        E = this.truckSpeed * f * X / this._elementRect.height, M = this.truckSpeed * y * X / this._elementRect.height;
      } else if (Pe(this._camera)) {
        const x = this._camera;
        E = f * (x.right - x.left) / x.zoom / this._elementRect.width, M = y * (x.top - x.bottom) / x.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (b ? this.setFocalOffset(this._focalOffsetEnd.x + E, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(E, 0, !0), this.forward(-M, !0)) : b ? this.setFocalOffset(this._focalOffsetEnd.x + E, this._focalOffsetEnd.y + M, this._focalOffsetEnd.z, !0) : this.truck(E, M, !0);
    }, this._rotateInternal = (f, y) => {
      const b = Ke * this.azimuthRotateSpeed * f / this._elementRect.height, E = Ke * this.polarRotateSpeed * y / this._elementRect.height;
      this.rotate(b, E, !0);
    }, this._dollyInternal = (f, y, b) => {
      const E = Math.pow(0.95, -f * this.dollySpeed), M = this._sphericalEnd.radius, x = this._sphericalEnd.radius * E, j = ye(x, this.minDistance, this.maxDistance), X = j - x;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(x, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(X, !0), this._dollyToNoClamp(j, !0)) : this._dollyToNoClamp(j, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? x : j) - M, this._dollyControlCoord.set(y, b)), this._lastDollyDirection = Math.sign(-f);
    }, this._zoomInternal = (f, y, b) => {
      const E = Math.pow(0.95, f * this.dollySpeed), M = this._zoom, x = this._zoom * E;
      this.zoomTo(x, !0), this.dollyToCursor && (this._changedZoom += x - M, this._dollyControlCoord.set(y, b));
    }, typeof A > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new A.Quaternion().setFromUnitVectors(this._camera.up, kt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = p.NONE, this._target = new A.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new A.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new A.Spherical().setFromVector3(L.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new A.Vector3(),
      new A.Vector3(),
      new A.Vector3(),
      new A.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new A.Box3(new A.Vector3(-1 / 0, -1 / 0, -1 / 0), new A.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new A.Vector2(), this.mouseButtons = {
      left: p.ROTATE,
      middle: p.DOLLY,
      right: p.TRUCK,
      wheel: ke(this._camera) ? p.DOLLY : Pe(this._camera) ? p.ZOOM : p.NONE
    }, this.touches = {
      one: p.TOUCH_ROTATE,
      two: ke(this._camera) ? p.TOUCH_DOLLY_TRUCK : Pe(this._camera) ? p.TOUCH_ZOOM_TRUCK : p.NONE,
      three: p.TOUCH_TRUCK
    };
    const s = new A.Vector2(), n = new A.Vector2(), r = new A.Vector2(), a = (f) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const E = this._domElement.getBoundingClientRect(), M = f.clientX / E.width, x = f.clientY / E.height;
        if (M < this._interactiveArea.left || M > this._interactiveArea.right || x < this._interactiveArea.top || x > this._interactiveArea.bottom)
          return;
      }
      const y = f.pointerType !== "mouse" ? null : (f.buttons & V.LEFT) === V.LEFT ? V.LEFT : (f.buttons & V.MIDDLE) === V.MIDDLE ? V.MIDDLE : (f.buttons & V.RIGHT) === V.RIGHT ? V.RIGHT : null;
      if (y !== null) {
        const E = this._findPointerByMouseButton(y);
        E && this._disposePointer(E);
      }
      if ((f.buttons & V.LEFT) === V.LEFT && this._lockedPointer)
        return;
      const b = {
        pointerId: f.pointerId,
        clientX: f.clientX,
        clientY: f.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: y
      };
      this._activePointers.push(b), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), this._isDragging = !0, _(f);
    }, o = (f) => {
      f.cancelable && f.preventDefault();
      const y = f.pointerId, b = this._lockedPointer || this._findPointerById(y);
      if (b) {
        if (b.clientX = f.clientX, b.clientY = f.clientY, b.deltaX = f.movementX, b.deltaY = f.movementY, this._state = 0, f.pointerType === "touch")
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (f.buttons & V.LEFT) === V.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (f.buttons & V.MIDDLE) === V.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (f.buttons & V.RIGHT) === V.RIGHT && (this._state = this._state | this.mouseButtons.right);
        g();
      }
    }, h = (f) => {
      const y = this._findPointerById(f.pointerId);
      if (!(y && y === this._lockedPointer)) {
        if (y && this._disposePointer(y), f.pointerType === "touch")
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
        S();
      }
    };
    let c = -1;
    const u = (f) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === p.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const x = this._domElement.getBoundingClientRect(), j = f.clientX / x.width, X = f.clientY / x.height;
        if (j < this._interactiveArea.left || j > this._interactiveArea.right || X < this._interactiveArea.top || X > this._interactiveArea.bottom)
          return;
      }
      if (f.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === p.ROTATE || this.mouseButtons.wheel === p.TRUCK) {
        const x = performance.now();
        c - x < 1e3 && this._getClientRect(this._elementRect), c = x;
      }
      const y = cr ? -1 : -3, b = f.deltaMode === 1 ? f.deltaY / y : f.deltaY / (y * 10), E = this.dollyToCursor ? (f.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, M = this.dollyToCursor ? (f.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case p.ROTATE: {
          this._rotateInternal(f.deltaX, f.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case p.TRUCK: {
          this._truckInternal(f.deltaX, f.deltaY, !1), this._isUserControllingTruck = !0;
          break;
        }
        case p.OFFSET: {
          this._truckInternal(f.deltaX, f.deltaY, !0), this._isUserControllingOffset = !0;
          break;
        }
        case p.DOLLY: {
          this._dollyInternal(-b, E, M), this._isUserControllingDolly = !0;
          break;
        }
        case p.ZOOM: {
          this._zoomInternal(-b, E, M), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, m = (f) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === Ce.ACTION.NONE) {
          const y = f instanceof PointerEvent ? f.pointerId : 0, b = this._findPointerById(y);
          b && this._disposePointer(b), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h);
          return;
        }
        f.preventDefault();
      }
    }, _ = (f) => {
      if (!this._enabled)
        return;
      if (oi(this._activePointers, he), this._getClientRect(this._elementRect), s.copy(he), n.copy(he), this._activePointers.length >= 2) {
        const b = he.x - this._activePointers[1].clientX, E = he.y - this._activePointers[1].clientY, M = Math.sqrt(b * b + E * E);
        r.set(0, M);
        const x = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, j = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(x, j);
      }
      if (this._state = 0, !f)
        this._lockedPointer && (this._state = this._state | this.mouseButtons.left);
      else if ("pointerType" in f && f.pointerType === "touch")
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
        !this._lockedPointer && (f.buttons & V.LEFT) === V.LEFT && (this._state = this._state | this.mouseButtons.left), (f.buttons & V.MIDDLE) === V.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (f.buttons & V.RIGHT) === V.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & p.DOLLY) === p.DOLLY || (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & p.ZOOM) === p.ZOOM || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, g = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, oi(this._activePointers, he);
      const y = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, b = y ? -y.deltaX : n.x - he.x, E = y ? -y.deltaY : n.y - he.y;
      if (n.copy(he), ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(b, E), this._isUserControllingRotate = !0), (this._state & p.DOLLY) === p.DOLLY || (this._state & p.ZOOM) === p.ZOOM) {
        const M = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, x = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, j = this.dollyDragInverted ? -1 : 1;
        (this._state & p.DOLLY) === p.DOLLY ? (this._dollyInternal(j * E * Ut, M, x), this._isUserControllingDolly = !0) : (this._zoomInternal(j * E * Ut, M, x), this._isUserControllingZoom = !0);
      }
      if ((this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) {
        const M = he.x - this._activePointers[1].clientX, x = he.y - this._activePointers[1].clientY, j = Math.sqrt(M * M + x * x), X = r.y - j;
        r.set(0, j);
        const me = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, Me = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(X * Ut, me, Me), this._isUserControllingDolly = !0) : (this._zoomInternal(X * Ut, me, Me), this._isUserControllingZoom = !0);
      }
      ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK) && (this._truckInternal(b, E, !1), this._isUserControllingTruck = !0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._truckInternal(b, E, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, S = () => {
      oi(this._activePointers, he), n.copy(he), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", T), this._domElement.ownerDocument.addEventListener("pointerlockerror", O), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), _());
    }, this.unlockPointer = () => {
      var f, y, b;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (f = this._domElement) === null || f === void 0 || f.ownerDocument.exitPointerLock(), (y = this._domElement) === null || y === void 0 || y.ownerDocument.removeEventListener("pointerlockchange", T), (b = this._domElement) === null || b === void 0 || b.ownerDocument.removeEventListener("pointerlockerror", O), this.cancel();
    };
    const T = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, O = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (f) => {
      this._domElement = f, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", a), this._domElement.addEventListener("pointercancel", h), this._domElement.addEventListener("wheel", u, { passive: !1 }), this._domElement.addEventListener("contextmenu", m);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", a), this._domElement.removeEventListener("pointercancel", h), this._domElement.removeEventListener("wheel", u, { passive: !1 }), this._domElement.removeEventListener("contextmenu", m), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.removeEventListener("pointerlockchange", T), this._domElement.ownerDocument.removeEventListener("pointerlockerror", O));
    }, this.cancel = () => {
      this._state !== p.NONE && (this._state = p.NONE, this._activePointers.length = 0, S());
    }, t && this.connect(t), this.update(0);
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
    this._interactiveArea.width = ye(e.width, 0, 1), this._interactiveArea.height = ye(e.height, 0, 1), this._interactiveArea.x = ye(e.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = ye(e.y, 0, 1 - this._interactiveArea.height);
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
  addEventListener(e, t) {
    super.addEventListener(e, t);
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
  removeEventListener(e, t) {
    super.removeEventListener(e, t);
  }
  /**
   * Rotate azimuthal angle(horizontal) and polar angle(vertical).
   * Every value is added to the current value.
   * @param azimuthAngle Azimuth rotate angle. In radian.
   * @param polarAngle Polar rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotate(e, t, s = !1) {
    return this.rotateTo(this._sphericalEnd.theta + e, this._sphericalEnd.phi + t, s);
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
  rotateAzimuthTo(e, t = !1) {
    return this.rotateTo(e, this._sphericalEnd.phi, t);
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
  rotatePolarTo(e, t = !1) {
    return this.rotateTo(this._sphericalEnd.theta, e, t);
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
  rotateTo(e, t, s = !1) {
    this._isUserControllingRotate = !1;
    const n = ye(e, this.minAzimuthAngle, this.maxAzimuthAngle), r = ye(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = r, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, s || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const a = !s || F(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && F(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
    return this._createOnRestPromise(a);
  }
  /**
   * Dolly in/out camera position.
   * @param distance Distance of dollyIn. Negative number for dollyOut.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dolly(e, t = !1) {
    return this.dollyTo(this._sphericalEnd.radius - e, t);
  }
  /**
   * Dolly in/out camera position to given distance.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyTo(e, t = !1) {
    return this._isUserControllingDolly = !1, this._lastDollyDirection = qe.NONE, this._changedDolly = 0, this._dollyToNoClamp(ye(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const s = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const a = this._collisionTest(), o = F(a, this._spherical.radius);
      if (!(s > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, a);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const r = !t || F(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(r);
  }
  /**
   * Dolly in, but does not change the distance between the target and the camera, and moves the target position instead.
   * Specify a negative value for dolly out.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyInFixed(e, t = !1) {
    this._targetEnd.add(this._getCameraDirection(mt).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
    const s = !t || F(this._target.x, this._targetEnd.x, this.restThreshold) && F(this._target.y, this._targetEnd.y, this.restThreshold) && F(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(s);
  }
  /**
   * Zoom in/out camera. The value is added to camera zoom.
   * Limits set with `.minZoom` and `.maxZoom`
   * @param zoomStep zoom scale
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  zoom(e, t = !1) {
    return this.zoomTo(this._zoomEnd + e, t);
  }
  /**
   * Zoom in/out camera to given scale. The value overwrites camera zoom.
   * Limits set with .minZoom and .maxZoom
   * @param zoom
   * @param enableTransition
   * @category Methods
   */
  zoomTo(e, t = !1) {
    this._isUserControllingZoom = !1, this._zoomEnd = ye(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, t || (this._zoom = this._zoomEnd);
    const s = !t || F(this._zoom, this._zoomEnd, this.restThreshold);
    return this._changedZoom = 0, this._createOnRestPromise(s);
  }
  /**
   * @deprecated `pan()` has been renamed to `truck()`
   * @category Methods
   */
  pan(e, t, s = !1) {
    return console.warn("`pan` has been renamed to `truck`"), this.truck(e, t, s);
  }
  /**
   * Truck and pedestal camera using current azimuthal angle
   * @param x Horizontal translate amount
   * @param y Vertical translate amount
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  truck(e, t, s = !1) {
    this._camera.updateMatrix(), ve.setFromMatrixColumn(this._camera.matrix, 0), Ee.setFromMatrixColumn(this._camera.matrix, 1), ve.multiplyScalar(e), Ee.multiplyScalar(-t);
    const n = L.copy(ve).add(Ee), r = N.copy(this._targetEnd).add(n);
    return this.moveTo(r.x, r.y, r.z, s);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    L.setFromMatrixColumn(this._camera.matrix, 0), L.crossVectors(this._camera.up, L), L.multiplyScalar(e);
    const s = N.copy(this._targetEnd).add(L);
    return this.moveTo(s.x, s.y, s.z, t);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, t = !1) {
    return L.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + L.x, this._targetEnd.y + L.y, this._targetEnd.z + L.z, t);
  }
  /**
   * Move target position to given point.
   * @param x x coord to move center position
   * @param y y coord to move center position
   * @param z z coord to move center position
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  moveTo(e, t, s, n = !1) {
    this._isUserControllingTruck = !1;
    const r = L.set(e, t, s).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, r, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const a = !n || F(this._target.x, this._targetEnd.x, this.restThreshold) && F(this._target.y, this._targetEnd.y, this.restThreshold) && F(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(a);
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
  lookInDirectionOf(e, t, s, n = !1) {
    const o = L.set(e, t, s).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
    return this.setPosition(o.x, o.y, o.z, n);
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
  fitToBox(e, t, { cover: s = !1, paddingLeft: n = 0, paddingRight: r = 0, paddingBottom: a = 0, paddingTop: o = 0 } = {}) {
    const h = [], c = e.isBox3 ? et.copy(e) : et.setFromObject(e);
    c.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const u = os(this._sphericalEnd.theta, rs), m = os(this._sphericalEnd.phi, rs);
    h.push(this.rotateTo(u, m, t));
    const _ = L.setFromSpherical(this._sphericalEnd).normalize(), g = ps.setFromUnitVectors(_, hi), S = F(Math.abs(_.y), 1);
    S && g.multiply(ui.setFromAxisAngle(kt, u)), g.multiply(this._yAxisUpSpaceInverse);
    const T = us.makeEmpty();
    N.copy(c.min).applyQuaternion(g), T.expandByPoint(N), N.copy(c.min).setX(c.max.x).applyQuaternion(g), T.expandByPoint(N), N.copy(c.min).setY(c.max.y).applyQuaternion(g), T.expandByPoint(N), N.copy(c.max).setZ(c.min.z).applyQuaternion(g), T.expandByPoint(N), N.copy(c.min).setZ(c.max.z).applyQuaternion(g), T.expandByPoint(N), N.copy(c.max).setY(c.min.y).applyQuaternion(g), T.expandByPoint(N), N.copy(c.max).setX(c.min.x).applyQuaternion(g), T.expandByPoint(N), N.copy(c.max).applyQuaternion(g), T.expandByPoint(N), T.min.x -= n, T.min.y -= a, T.max.x += r, T.max.y += o, g.setFromUnitVectors(hi, _), S && g.premultiply(ui.invert()), g.premultiply(this._yAxisUpSpace);
    const O = T.getSize(L), f = T.getCenter(N).applyQuaternion(g);
    if (ke(this._camera)) {
      const y = this.getDistanceToFitBox(O.x, O.y, O.z, s);
      h.push(this.moveTo(f.x, f.y, f.z, t)), h.push(this.dollyTo(y, t)), h.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Pe(this._camera)) {
      const y = this._camera, b = y.right - y.left, E = y.top - y.bottom, M = s ? Math.max(b / O.x, E / O.y) : Math.min(b / O.x, E / O.y);
      h.push(this.moveTo(f.x, f.y, f.z, t)), h.push(this.zoomTo(M, t)), h.push(this.setFocalOffset(0, 0, 0, t));
    }
    return Promise.all(h);
  }
  /**
   * Fit the viewport to the sphere or the bounding sphere of the object.
   * @param sphereOrMesh
   * @param enableTransition
   * @category Methods
   */
  fitToSphere(e, t) {
    const s = [], r = "isObject3D" in e ? Ce.createBoundingSphere(e, di) : di.copy(e);
    if (s.push(this.moveTo(r.center.x, r.center.y, r.center.z, t)), ke(this._camera)) {
      const a = this.getDistanceToFitSphere(r.radius);
      s.push(this.dollyTo(a, t));
    } else if (Pe(this._camera)) {
      const a = this._camera.right - this._camera.left, o = this._camera.top - this._camera.bottom, h = 2 * r.radius, c = Math.min(a / h, o / h);
      s.push(this.zoomTo(c, t));
    }
    return s.push(this.setFocalOffset(0, 0, 0, t)), Promise.all(s);
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
  setLookAt(e, t, s, n, r, a, o = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = qe.NONE, this._changedDolly = 0;
    const h = N.set(n, r, a), c = L.set(e, t, s);
    this._targetEnd.copy(h), this._sphericalEnd.setFromVector3(c.sub(h).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const u = !o || F(this._target.x, this._targetEnd.x, this.restThreshold) && F(this._target.y, this._targetEnd.y, this.restThreshold) && F(this._target.z, this._targetEnd.z, this.restThreshold) && F(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && F(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && F(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  lerpLookAt(e, t, s, n, r, a, o, h, c, u, m, _, g, S = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = qe.NONE, this._changedDolly = 0;
    const T = L.set(n, r, a), O = N.set(e, t, s);
    _e.setFromVector3(O.sub(T).applyQuaternion(this._yAxisUpSpace));
    const f = Je.set(u, m, _), y = N.set(o, h, c);
    ft.setFromVector3(y.sub(f).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(T.lerp(f, g));
    const b = ft.theta - _e.theta, E = ft.phi - _e.phi, M = ft.radius - _e.radius;
    this._sphericalEnd.set(_e.radius + M * g, _e.phi + E * g, _e.theta + b * g), this.normalizeRotations(), this._needsUpdate = !0, S || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const x = !S || F(this._target.x, this._targetEnd.x, this.restThreshold) && F(this._target.y, this._targetEnd.y, this.restThreshold) && F(this._target.z, this._targetEnd.z, this.restThreshold) && F(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && F(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && F(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(x);
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
  setPosition(e, t, s, n = !1) {
    return this.setLookAt(e, t, s, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, n);
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
  setTarget(e, t, s, n = !1) {
    const r = this.getPosition(L), a = this.setLookAt(r.x, r.y, r.z, e, t, s, n);
    return this._sphericalEnd.phi = ye(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), a;
  }
  /**
   * Set focal offset using the screen parallel coordinates. z doesn't affect in Orthographic as with Dolly.
   * @param x
   * @param y
   * @param z
   * @param enableTransition
   * @category Methods
   */
  setFocalOffset(e, t, s, n = !1) {
    this._isUserControllingOffset = !1, this._focalOffsetEnd.set(e, t, s), this._needsUpdate = !0, n || this._focalOffset.copy(this._focalOffsetEnd);
    const r = !n || F(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && F(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && F(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
    return this._createOnRestPromise(r);
  }
  /**
   * Set orbit point without moving the camera.
   * SHOULD NOT RUN DURING ANIMATIONS. `setOrbitPoint()` will immediately fix the positions.
   * @param targetX
   * @param targetY
   * @param targetZ
   * @category Methods
   */
  setOrbitPoint(e, t, s) {
    this._camera.updateMatrixWorld(), ve.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), Ee.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), je.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = L.set(e, t, s), r = n.distanceTo(this._camera.position), a = n.sub(this._camera.position);
    ve.multiplyScalar(a.x), Ee.multiplyScalar(a.y), je.multiplyScalar(a.z), L.copy(ve).add(Ee).add(je), L.z = L.z + r, this.dollyTo(r, !1), this.setFocalOffset(-L.x, L.y, -L.z, !1), this.moveTo(e, t, s, !1);
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
  setViewport(e, t, s, n) {
    if (e === null) {
      this._viewport = null;
      return;
    }
    this._viewport = this._viewport || new A.Vector4(), typeof e == "number" ? this._viewport.set(e, t, s, n) : this._viewport.copy(e);
  }
  /**
   * Calculate the distance to fit the box.
   * @param width box width
   * @param height box height
   * @param depth box depth
   * @returns distance
   * @category Methods
   */
  getDistanceToFitBox(e, t, s, n = !1) {
    if (li(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const r = e / t, a = this._camera.getEffectiveFOV() * dt, o = this._camera.aspect;
    return ((n ? r > o : r < o) ? t : e / o) * 0.5 / Math.tan(a * 0.5) + s * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (li(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * dt, s = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : s;
    return e / Math.sin(n * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, t = !0) {
    return (e && e.isVector3 ? e : new A.Vector3()).copy(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, t = !0) {
    return (e && e.isVector3 ? e : new A.Vector3()).setFromSpherical(t ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, t = !0) {
    return (e || new A.Spherical()).copy(t ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, t = !0) {
    return (e && e.isVector3 ? e : new A.Vector3()).copy(t ? this._focalOffsetEnd : this._focalOffset);
  }
  /**
   * Normalize camera azimuth angle rotation between 0 and 360 degrees.
   * @category Methods
   */
  normalizeRotations() {
    this._sphericalEnd.theta = this._sphericalEnd.theta % Ke, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += Ke), this._spherical.theta += Ke * Math.round((this._sphericalEnd.theta - this._spherical.theta) / Ke);
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
    if (!F(this._camera.up.x, this._cameraUp0.x) || !F(this._camera.up.y, this._cameraUp0.y) || !F(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const s = this.getPosition(L);
      this.updateCameraUp(), this.setPosition(s.x, s.y, s.z);
    }
    const t = [
      this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, e),
      this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, e),
      this.zoomTo(this._zoom0, e)
    ];
    return Promise.all(t);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, kt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = L.subVectors(this._target, this._camera.position).normalize(), t = N.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const s = this.getPosition(L);
    this.updateCameraUp(), this.setPosition(s.x, s.y, s.z);
  }
  /**
   * Update camera position and directions.
   * This should be called in your tick loop every time, and returns true if re-rendering is needed.
   * @param delta
   * @returns updated
   * @category Methods
   */
  update(e) {
    const t = this._sphericalEnd.theta - this._spherical.theta, s = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, r = hs.subVectors(this._targetEnd, this._target), a = ds.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (Z(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const m = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Lt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, m, 1 / 0, e), this._needsUpdate = !0;
    }
    if (Z(s))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const m = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Lt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, m, 1 / 0, e), this._needsUpdate = !0;
    }
    if (Z(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const m = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Lt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, m, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (Z(r.x) && Z(r.y) && Z(r.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const m = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      ls(this._target, this._targetEnd, this._targetVelocity, m, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (Z(a.x) && Z(a.y) && Z(a.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const m = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      ls(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, m, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (Z(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const m = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Lt(this._zoom, this._zoomEnd, this._zoomVelocity, m, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (ke(this._camera) && this._changedDolly !== 0) {
        const m = this._spherical.radius - this._lastDistance, _ = this._camera, g = this._getCameraDirection(mt), S = L.copy(g).cross(_.up).normalize();
        S.lengthSq() === 0 && (S.x = 1);
        const T = N.crossVectors(S, g), O = this._sphericalEnd.radius * Math.tan(_.getEffectiveFOV() * dt * 0.5), y = (this._sphericalEnd.radius - m - this._sphericalEnd.radius) / this._sphericalEnd.radius, b = Je.copy(this._targetEnd).add(S.multiplyScalar(this._dollyControlCoord.x * O * _.aspect)).add(T.multiplyScalar(this._dollyControlCoord.y * O)), E = L.copy(this._targetEnd).lerp(b, y), M = this._lastDollyDirection === qe.IN && this._spherical.radius <= this.minDistance, x = this._lastDollyDirection === qe.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (M || x)) {
          this._sphericalEnd.radius -= m, this._spherical.radius -= m;
          const X = N.copy(g).multiplyScalar(-m);
          E.add(X);
        }
        this._boundary.clampPoint(E, E);
        const j = N.subVectors(E, this._targetEnd);
        this._targetEnd.copy(E), this._target.add(j), this._changedDolly -= m, Z(this._changedDolly) && (this._changedDolly = 0);
      } else if (Pe(this._camera) && this._changedZoom !== 0) {
        const m = this._zoom - this._lastZoom, _ = this._camera, g = L.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (_.near + _.far) / (_.near - _.far)).unproject(_), S = N.set(0, 0, -1).applyQuaternion(_.quaternion), T = Je.copy(g).add(S.multiplyScalar(-g.dot(_.up))), f = -(this._zoom - m - this._zoom) / this._zoom, y = this._getCameraDirection(mt), b = this._targetEnd.dot(y), E = L.copy(this._targetEnd).lerp(T, f), M = E.dot(y), x = y.multiplyScalar(M - b);
        E.sub(x), this._boundary.clampPoint(E, E);
        const j = N.subVectors(E, this._targetEnd);
        this._targetEnd.copy(E), this._target.add(j), this._changedZoom -= m, Z(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const h = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, h), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!Z(this._focalOffset.x) || !Z(this._focalOffset.y) || !Z(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), ve.setFromMatrixColumn(this._camera.matrix, 0), Ee.setFromMatrixColumn(this._camera.matrix, 1), je.setFromMatrixColumn(this._camera.matrix, 2), ve.multiplyScalar(this._focalOffset.x), Ee.multiplyScalar(-this._focalOffset.y), je.multiplyScalar(this._focalOffset.z), L.copy(ve).add(Ee).add(je), this._camera.position.add(L)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), L.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const u = this._needsUpdate;
    return u && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : u ? (this.dispatchEvent({ type: "update" }), Z(t, this.restThreshold) && Z(s, this.restThreshold) && Z(n, this.restThreshold) && Z(r.x, this.restThreshold) && Z(r.y, this.restThreshold) && Z(r.z, this.restThreshold) && Z(a.x, this.restThreshold) && Z(a.y, this.restThreshold) && Z(a.z, this.restThreshold) && Z(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !u && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = u, this._needsUpdate = !1, u;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: ut(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: ut(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: ut(this.maxPolarAngle),
      minAzimuthAngle: ut(this.minAzimuthAngle),
      maxAzimuthAngle: ut(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      verticalDragToForward: this.verticalDragToForward,
      target: this._targetEnd.toArray(),
      position: L.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
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
  fromJSON(e, t = !1) {
    const s = JSON.parse(e);
    this.enabled = s.enabled, this.minDistance = s.minDistance, this.maxDistance = pt(s.maxDistance), this.minZoom = s.minZoom, this.maxZoom = pt(s.maxZoom), this.minPolarAngle = s.minPolarAngle, this.maxPolarAngle = pt(s.maxPolarAngle), this.minAzimuthAngle = pt(s.minAzimuthAngle), this.maxAzimuthAngle = pt(s.maxAzimuthAngle), this.smoothTime = s.smoothTime, this.draggingSmoothTime = s.draggingSmoothTime, this.dollySpeed = s.dollySpeed, this.truckSpeed = s.truckSpeed, this.dollyToCursor = s.dollyToCursor, this.verticalDragToForward = s.verticalDragToForward, this._target0.fromArray(s.target0), this._position0.fromArray(s.position0), this._zoom0 = s.zoom0, this._focalOffset0.fromArray(s.focalOffset0), this.moveTo(s.target[0], s.target[1], s.target[2], t), _e.setFromVector3(L.fromArray(s.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(_e.theta, _e.phi, t), this.dollyTo(_e.radius, t), this.zoomTo(s.zoom, t), this.setFocalOffset(s.focalOffset[0], s.focalOffset[1], s.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", lr), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    return this._activePointers.find((t) => t.pointerId === e);
  }
  _findPointerByMouseButton(e) {
    return this._activePointers.find((t) => t.mouseButton === e);
  }
  _disposePointer(e) {
    this._activePointers.splice(this._activePointers.indexOf(e), 1);
  }
  _encloseToBoundary(e, t, s) {
    const n = t.lengthSq();
    if (n === 0)
      return e;
    const r = N.copy(t).add(e), o = this._boundary.clampPoint(r, Je).sub(r), h = o.lengthSq();
    if (h === 0)
      return e.add(t);
    if (h === n)
      return e;
    if (s === 0)
      return e.add(t).add(o);
    {
      const c = 1 + s * h / t.dot(o);
      return e.add(N.copy(t).multiplyScalar(c)).add(o.multiplyScalar(1 - s));
    }
  }
  _updateNearPlaneCorners() {
    if (ke(this._camera)) {
      const e = this._camera, t = e.near, s = e.getEffectiveFOV() * dt, n = Math.tan(s * 0.5) * t, r = n * e.aspect;
      this._nearPlaneCorners[0].set(-r, -n, 0), this._nearPlaneCorners[1].set(r, -n, 0), this._nearPlaneCorners[2].set(r, n, 0), this._nearPlaneCorners[3].set(-r, n, 0);
    } else if (Pe(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, s = e.left * t, n = e.right * t, r = e.top * t, a = e.bottom * t;
      this._nearPlaneCorners[0].set(s, r, 0), this._nearPlaneCorners[1].set(n, r, 0), this._nearPlaneCorners[2].set(n, a, 0), this._nearPlaneCorners[3].set(s, a, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || li(this._camera, "_collisionTest"))
      return e;
    const s = this._getTargetDirection(mt);
    pi.lookAt(cs, s, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const r = N.copy(this._nearPlaneCorners[n]);
      r.applyMatrix4(pi);
      const a = Je.addVectors(this._target, r);
      jt.set(a, s), jt.far = this._spherical.radius + 1;
      const o = jt.intersectObjects(this.colliderMeshes);
      o.length !== 0 && o[0].distance < e && (e = o[0].distance);
    }
    return e;
  }
  /**
   * Get its client rect and package into given `DOMRect` .
   */
  _getClientRect(e) {
    if (!this._domElement)
      return;
    const t = this._domElement.getBoundingClientRect();
    return e.x = t.left, e.y = t.top, this._viewport ? (e.x += this._viewport.x, e.y += t.height - this._viewport.w - this._viewport.y, e.width = this._viewport.z, e.height = this._viewport.w) : (e.width = t.width, e.height = t.height), e;
  }
  _createOnRestPromise(e) {
    return e ? Promise.resolve() : (this._hasRested = !1, this.dispatchEvent({ type: "transitionstart" }), new Promise((t) => {
      const s = () => {
        this.removeEventListener("rest", s), t();
      };
      this.addEventListener("rest", s);
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
  static createBoundingSphere(e, t = new A.Sphere()) {
    const s = t, n = s.center;
    et.makeEmpty(), e.traverseVisible((a) => {
      a.isMesh && et.expandByObject(a);
    }), et.getCenter(n);
    let r = 0;
    return e.traverseVisible((a) => {
      if (!a.isMesh)
        return;
      const o = a, h = o.geometry.clone();
      h.applyMatrix4(o.matrixWorld);
      const u = h.attributes.position;
      for (let m = 0, _ = u.count; m < _; m++)
        L.fromBufferAttribute(u, m), r = Math.max(r, n.distanceToSquared(L));
    }), s.radius = Math.sqrt(r), s;
  }
}
const Gt = (i) => {
  const [e, t] = W(i.options[i.index]), s = () => {
    i.onToggle(!i.open);
  }, n = (r) => {
    r !== e && (i.onSelect(r), t(r)), i.onToggle(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "dropdown-toggle", onClick: s, children: `${i.title}: ${e}` }),
    i.open && /* @__PURE__ */ d.jsx("ul", { className: "dropdown-menu", children: i.options.map((r) => /* @__PURE__ */ d.jsx("li", { onClick: () => n(r), children: r }, r)) })
  ] });
}, Ne = oa(function(e, t) {
  const s = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, r] = W("Renderer"), [a, o] = W(!1), [h, c] = W(!1), [u, m] = W(!1);
  return /* @__PURE__ */ d.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ d.jsx("div", { ref: t, className: "clickable", onClick: () => {
      u && m(!1);
    } }),
    /* @__PURE__ */ d.jsxs("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ d.jsx(
        Gt,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: u,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (_) => {
            m(_);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Gt,
        {
          title: "Mode",
          index: s.indexOf(n),
          open: h,
          options: s,
          onSelect: (_) => {
            if (_ === n)
              return;
            const g = _;
            e.onSelectRenderMode(g), r(g);
          },
          onToggle: (_) => {
            a && o(!1), c(_);
          },
          up: !0
        }
      )
    ] })
  ] });
});
class hr extends Ys {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: Wn,
      side: xi,
      transparent: !0,
      uniforms: {
        uScale: {
          value: e?.scale !== void 0 ? e?.scale : 0.1
        },
        uDivisions: {
          value: e?.divisions !== void 0 ? e?.divisions : 10
        },
        uColor: {
          value: e?.color !== void 0 ? e?.color : new Vt(16777215)
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
class dr extends w {
  gridMaterial;
  constructor() {
    const e = new hr();
    super(new Bs(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ur = `#include <common>
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
}`, pr = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class mr extends Ys {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ur,
      fragmentShader: pr
    });
  }
}
const ze = new yi(), se = new D(), De = new D(), G = new pe(), ms = {
  X: new D(1, 0, 0),
  Y: new D(0, 1, 0),
  Z: new D(0, 0, 1)
}, mi = { type: "change" }, fs = { type: "mouseDown", mode: null }, _s = { type: "mouseUp", mode: null }, gs = { type: "objectChange" };
class fr extends Hs {
  constructor(e, t = null) {
    super(void 0, t);
    const s = new br(this);
    this._root = s;
    const n = new Cr();
    this._gizmo = n, s.add(n);
    const r = new wr();
    this._plane = r, s.add(r);
    const a = this;
    function o(b, E) {
      let M = E;
      Object.defineProperty(a, b, {
        get: function() {
          return M !== void 0 ? M : E;
        },
        set: function(x) {
          M !== x && (M = x, r[b] = x, n[b] = x, a.dispatchEvent({ type: b + "-changed", value: x }), a.dispatchEvent(mi));
        }
      }), a[b] = E, r[b] = E, n[b] = E;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const h = new D(), c = new D(), u = new pe(), m = new pe(), _ = new D(), g = new pe(), S = new D(), T = new D(), O = new D(), f = 0, y = new D();
    o("worldPosition", h), o("worldPositionStart", c), o("worldQuaternion", u), o("worldQuaternionStart", m), o("cameraPosition", _), o("cameraQuaternion", g), o("pointStart", S), o("pointEnd", T), o("rotationAxis", O), o("rotationAngle", f), o("eye", y), this._offset = new D(), this._startNorm = new D(), this._endNorm = new D(), this._cameraScale = new D(), this._parentPosition = new D(), this._parentQuaternion = new pe(), this._parentQuaternionInv = new pe(), this._parentScale = new D(), this._worldScaleStart = new D(), this._worldQuaternionInv = new pe(), this._worldScale = new D(), this._positionStart = new D(), this._quaternionStart = new pe(), this._scaleStart = new D(), this._getPointer = _r.bind(this), this._onPointerDown = yr.bind(this), this._onPointerHover = gr.bind(this), this._onPointerMove = vr.bind(this), this._onPointerUp = Er.bind(this), t !== null && this.connect();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.style.touchAction = "auto";
  }
  getHelper() {
    return this._root;
  }
  pointerHover(e) {
    if (this.object === void 0 || this.dragging === !0)
      return;
    e !== null && ze.setFromCamera(e, this.camera);
    const t = fi(this._gizmo.picker[this.mode], ze);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && ze.setFromCamera(e, this.camera);
      const t = fi(this._plane, ze, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, fs.mode = this.mode, this.dispatchEvent(fs);
    }
  }
  pointerMove(e) {
    const t = this.axis, s = this.mode, n = this.object;
    let r = this.space;
    if (s === "scale" ? r = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (r = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && ze.setFromCamera(e, this.camera);
    const a = fi(this._plane, ze, !0);
    if (a) {
      if (this.pointEnd.copy(a.point).sub(this.worldPositionStart), s === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (n.position.applyQuaternion(G.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), r === "world" && (n.parent && n.position.add(se.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(se.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (s === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), De.set(o, o, o);
        } else
          se.copy(this.pointStart), De.copy(this.pointEnd), se.applyQuaternion(this._worldQuaternionInv), De.applyQuaternion(this._worldQuaternionInv), De.divide(se), t.search("X") === -1 && (De.x = 1), t.search("Y") === -1 && (De.y = 1), t.search("Z") === -1 && (De.z = 1);
        n.scale.copy(this._scaleStart).multiply(De), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (s === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(se.setFromMatrixPosition(this.camera.matrixWorld));
        let h = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(se.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(ms[t]), se.copy(ms[t]), r === "local" && se.applyQuaternion(this.worldQuaternion), se.cross(this.eye), se.length() === 0 ? h = !0 : this.rotationAngle = this._offset.dot(se.normalize()) * o), (t === "E" || h) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(G.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(G.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(mi), this.dispatchEvent(gs);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (_s.mode = this.mode, this.dispatchEvent(_s)), this.dragging = !1, this.axis = null);
  }
  dispose() {
    this.disconnect(), this.traverse(function(e) {
      e.geometry && e.geometry.dispose(), e.material && e.material.dispose();
    });
  }
  // Set current object
  attach(e) {
    return this.object = e, this._root.visible = !0, this;
  }
  // Detach from object
  detach() {
    return this.object = void 0, this.axis = null, this._root.visible = !1, this;
  }
  reset() {
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(mi), this.dispatchEvent(gs), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return ze;
  }
  // TODO: deprecate
  getMode() {
    return this.mode;
  }
  setMode(e) {
    this.mode = e;
  }
  setTranslationSnap(e) {
    this.translationSnap = e;
  }
  setRotationSnap(e) {
    this.rotationSnap = e;
  }
  setScaleSnap(e) {
    this.scaleSnap = e;
  }
  setSize(e) {
    this.size = e;
  }
  setSpace(e) {
    this.space = e;
  }
}
function _r(i) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: i.button
    };
  {
    const e = this.domElement.getBoundingClientRect();
    return {
      x: (i.clientX - e.left) / e.width * 2 - 1,
      y: -(i.clientY - e.top) / e.height * 2 + 1,
      button: i.button
    };
  }
}
function gr(i) {
  if (this.enabled)
    switch (i.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(i));
        break;
    }
}
function yr(i) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(i)), this.pointerDown(this._getPointer(i)));
}
function vr(i) {
  this.enabled && this.pointerMove(this._getPointer(i));
}
function Er(i) {
  this.enabled && (this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(i)));
}
function fi(i, e, t) {
  const s = e.intersectObject(i, !0);
  for (let n = 0; n < s.length; n++)
    if (s[n].object.visible || t)
      return s[n];
  return !1;
}
const Nt = new Zs(), B = new D(0, 1, 0), ys = new D(0, 0, 0), vs = new Xt(), zt = new pe(), Bt = new pe(), be = new D(), Es = new Xt(), vt = new D(1, 0, 0), He = new D(0, 1, 0), Et = new D(0, 0, 1), Ft = new D(), _t = new D(), gt = new D();
class br extends vi {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class Cr extends vi {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new St({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Fs({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), s = e.clone();
    s.opacity = 0.15;
    const n = t.clone();
    n.opacity = 0.5;
    const r = e.clone();
    r.color.setHex(16711680);
    const a = e.clone();
    a.color.setHex(65280);
    const o = e.clone();
    o.color.setHex(255);
    const h = e.clone();
    h.color.setHex(16711680), h.opacity = 0.5;
    const c = e.clone();
    c.color.setHex(65280), c.opacity = 0.5;
    const u = e.clone();
    u.color.setHex(255), u.opacity = 0.5;
    const m = e.clone();
    m.opacity = 0.25;
    const _ = e.clone();
    _.color.setHex(16776960), _.opacity = 0.25, e.clone().color.setHex(16776960);
    const S = e.clone();
    S.color.setHex(7895160);
    const T = new le(0, 0.04, 0.1, 12);
    T.translate(0, 0.05, 0);
    const O = new ae(0.08, 0.08, 0.08);
    O.translate(0, 0.04, 0);
    const f = new Ct();
    f.setAttribute("position", new Be([0, 0, 0, 1, 0, 0], 3));
    const y = new le(75e-4, 75e-4, 0.5, 3);
    y.translate(0, 0.25, 0);
    function b($, Ae) {
      const oe = new ot($, 75e-4, 3, 64, Ae * Math.PI * 2);
      return oe.rotateY(Math.PI / 2), oe.rotateX(Math.PI / 2), oe;
    }
    function E() {
      const $ = new Ct();
      return $.setAttribute("position", new Be([0, 0, 0, 1, 1, 1], 3)), $;
    }
    const M = {
      X: [
        [new w(T, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(T, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new w(y, r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new w(T, a), [0, 0.5, 0]],
        [new w(T, a), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new w(y, a)]
      ],
      Z: [
        [new w(T, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new w(T, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new w(y, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new At(0.1, 0), m.clone()), [0, 0, 0]]
      ],
      XY: [
        [new w(new ae(0.15, 0.15, 0.01), u.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ae(0.15, 0.15, 0.01), h.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ae(0.15, 0.15, 0.01), c.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, x = {
      X: [
        [new w(new le(0.2, 0, 0.6, 4), s), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(new le(0.2, 0, 0.6, 4), s), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new w(new le(0.2, 0, 0.6, 4), s), [0, 0.3, 0]],
        [new w(new le(0.2, 0, 0.6, 4), s), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new w(new le(0.2, 0, 0.6, 4), s), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new w(new le(0.2, 0, 0.6, 4), s), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new At(0.2, 0), s)]
      ],
      XY: [
        [new w(new ae(0.2, 0.2, 0.01), s), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ae(0.2, 0.2, 0.01), s), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ae(0.2, 0.2, 0.01), s), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, j = {
      START: [
        [new w(new At(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new w(new At(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new xe(E(), n), null, null, null, "helper"]
      ],
      X: [
        [new xe(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new xe(f, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new xe(f, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, X = {
      XYZE: [
        [new w(b(0.5, 1), S), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new w(b(0.5, 0.5), r)]
      ],
      Y: [
        [new w(b(0.5, 0.5), a), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new w(b(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new w(b(0.75, 1), _), null, [0, Math.PI / 2, 0]]
      ]
    }, me = {
      AXIS: [
        [new xe(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, Me = {
      XYZE: [
        [new w(new Gn(0.25, 10, 8), s)]
      ],
      X: [
        [new w(new ot(0.5, 0.1, 4, 24), s), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new w(new ot(0.5, 0.1, 4, 24), s), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new w(new ot(0.5, 0.1, 4, 24), s), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new w(new ot(0.75, 0.1, 2, 24), s)]
      ]
    }, at = {
      X: [
        [new w(O, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(y, r), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(O, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new w(O, a), [0, 0.5, 0]],
        [new w(y, a)],
        [new w(O, a), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new w(O, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new w(y, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new w(O, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new w(new ae(0.15, 0.15, 0.01), u), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ae(0.15, 0.15, 0.01), h), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ae(0.15, 0.15, 0.01), c), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new ae(0.1, 0.1, 0.1), m.clone())]
      ]
    }, We = {
      X: [
        [new w(new le(0.2, 0, 0.6, 4), s), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(new le(0.2, 0, 0.6, 4), s), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new w(new le(0.2, 0, 0.6, 4), s), [0, 0.3, 0]],
        [new w(new le(0.2, 0, 0.6, 4), s), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new w(new le(0.2, 0, 0.6, 4), s), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new w(new le(0.2, 0, 0.6, 4), s), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new w(new ae(0.2, 0.2, 0.01), s), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ae(0.2, 0.2, 0.01), s), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ae(0.2, 0.2, 0.01), s), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new ae(0.2, 0.2, 0.2), s), [0, 0, 0]]
      ]
    }, ue = {
      X: [
        [new xe(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new xe(f, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new xe(f, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function ee($) {
      const Ae = new vi();
      for (const oe in $)
        for (let we = $[oe].length; we--; ) {
          const ie = $[oe][we][0].clone(), Ie = $[oe][we][1], Le = $[oe][we][2], Ue = $[oe][we][3], xt = $[oe][we][4];
          ie.name = oe, ie.tag = xt, Ie && ie.position.set(Ie[0], Ie[1], Ie[2]), Le && ie.rotation.set(Le[0], Le[1], Le[2]), Ue && ie.scale.set(Ue[0], Ue[1], Ue[2]), ie.updateMatrix();
          const Ot = ie.geometry.clone();
          Ot.applyMatrix4(ie.matrix), ie.geometry = Ot, ie.renderOrder = 1 / 0, ie.position.set(0, 0, 0), ie.rotation.set(0, 0, 0), ie.scale.set(1, 1, 1), Ae.add(ie);
        }
      return Ae;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = ee(M)), this.add(this.gizmo.rotate = ee(X)), this.add(this.gizmo.scale = ee(at)), this.add(this.picker.translate = ee(x)), this.add(this.picker.rotate = ee(Me)), this.add(this.picker.scale = ee(We)), this.add(this.helper.translate = ee(j)), this.add(this.helper.rotate = ee(me)), this.add(this.helper.scale = ee(ue)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const s = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : Bt;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      a.visible = !0, a.rotation.set(0, 0, 0), a.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), a.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), a.tag === "helper") {
        a.visible = !1, a.name === "AXIS" ? (a.visible = !!this.axis, this.axis === "X" && (G.setFromEuler(Nt.set(0, 0, 0)), a.quaternion.copy(s).multiply(G), Math.abs(B.copy(vt).applyQuaternion(s).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Y" && (G.setFromEuler(Nt.set(0, 0, Math.PI / 2)), a.quaternion.copy(s).multiply(G), Math.abs(B.copy(He).applyQuaternion(s).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Z" && (G.setFromEuler(Nt.set(0, Math.PI / 2, 0)), a.quaternion.copy(s).multiply(G), Math.abs(B.copy(Et).applyQuaternion(s).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "XYZE" && (G.setFromEuler(Nt.set(0, Math.PI / 2, 0)), B.copy(this.rotationAxis), a.quaternion.setFromRotationMatrix(vs.lookAt(ys, B, He)), a.quaternion.multiply(G), a.visible = this.dragging), this.axis === "E" && (a.visible = !1)) : a.name === "START" ? (a.position.copy(this.worldPositionStart), a.visible = this.dragging) : a.name === "END" ? (a.position.copy(this.worldPosition), a.visible = this.dragging) : a.name === "DELTA" ? (a.position.copy(this.worldPositionStart), a.quaternion.copy(this.worldQuaternionStart), se.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), se.applyQuaternion(this.worldQuaternionStart.clone().invert()), a.scale.copy(se), a.visible = this.dragging) : (a.quaternion.copy(s), this.dragging ? a.position.copy(this.worldPositionStart) : a.position.copy(this.worldPosition), this.axis && (a.visible = this.axis.search(a.name) !== -1));
        continue;
      }
      a.quaternion.copy(s), this.mode === "translate" || this.mode === "scale" ? (a.name === "X" && Math.abs(B.copy(vt).applyQuaternion(s).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Y" && Math.abs(B.copy(He).applyQuaternion(s).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Z" && Math.abs(B.copy(Et).applyQuaternion(s).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XY" && Math.abs(B.copy(Et).applyQuaternion(s).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "YZ" && Math.abs(B.copy(vt).applyQuaternion(s).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XZ" && Math.abs(B.copy(He).applyQuaternion(s).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1)) : this.mode === "rotate" && (zt.copy(s), B.copy(this.eye).applyQuaternion(G.copy(s).invert()), a.name.search("E") !== -1 && a.quaternion.setFromRotationMatrix(vs.lookAt(this.eye, ys, He)), a.name === "X" && (G.setFromAxisAngle(vt, Math.atan2(-B.y, B.z)), G.multiplyQuaternions(zt, G), a.quaternion.copy(G)), a.name === "Y" && (G.setFromAxisAngle(He, Math.atan2(B.x, B.z)), G.multiplyQuaternions(zt, G), a.quaternion.copy(G)), a.name === "Z" && (G.setFromAxisAngle(Et, Math.atan2(B.y, B.x)), G.multiplyQuaternions(zt, G), a.quaternion.copy(G))), a.visible = a.visible && (a.name.indexOf("X") === -1 || this.showX), a.visible = a.visible && (a.name.indexOf("Y") === -1 || this.showY), a.visible = a.visible && (a.name.indexOf("Z") === -1 || this.showZ), a.visible = a.visible && (a.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), a.material._color = a.material._color || a.material.color.clone(), a.material._opacity = a.material._opacity || a.material.opacity, a.material.color.copy(a.material._color), a.material.opacity = a.material._opacity, this.enabled && this.axis && (a.name === this.axis || this.axis.split("").some(function(h) {
        return a.name === h;
      })) && (a.material.color.setHex(16776960), a.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class wr extends w {
  constructor() {
    super(
      new Bs(1e5, 1e5, 2, 2),
      new St({ visible: !1, wireframe: !0, side: xi, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), Ft.copy(vt).applyQuaternion(t === "local" ? this.worldQuaternion : Bt), _t.copy(He).applyQuaternion(t === "local" ? this.worldQuaternion : Bt), gt.copy(Et).applyQuaternion(t === "local" ? this.worldQuaternion : Bt), B.copy(_t), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            B.copy(this.eye).cross(Ft), be.copy(Ft).cross(B);
            break;
          case "Y":
            B.copy(this.eye).cross(_t), be.copy(_t).cross(B);
            break;
          case "Z":
            B.copy(this.eye).cross(gt), be.copy(gt).cross(B);
            break;
          case "XY":
            be.copy(gt);
            break;
          case "YZ":
            be.copy(Ft);
            break;
          case "XZ":
            B.copy(gt), be.copy(_t);
            break;
          case "XYZ":
          case "E":
            be.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        be.set(0, 0, 0);
    }
    be.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Es.lookAt(se.set(0, 0, 0), be, B), this.quaternion.setFromRotationMatrix(Es)), super.updateMatrixWorld(e);
  }
}
class ge extends Ss {
  static DRAG_START = "Transform::dragStart";
  static DRAG_END = "Transform::dragEnd";
  static _instance;
  three;
  activeCamera;
  controls = /* @__PURE__ */ new Map();
  visibility = /* @__PURE__ */ new Map();
  groups = [];
  clear() {
    for (const e of this.controls.values()) {
      e.detach(), e.dispose();
      const t = e.getHelper();
      t.parent?.remove(t);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(e) {
    let t = this.controls.get(e);
    if (t === void 0) {
      const s = document.querySelector(".clickable");
      t = new fr(this.activeCamera, s), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, t.getHelper().visible), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: ge.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: ge.DRAG_END });
      }), t.addEventListener("dragging-changed", (r) => {
        Oe.instance?.toggleOrbitControls(r.value);
      });
      const n = `Controls: ${e}`;
      this.groups.push(n), this.three.addGroup({
        title: n,
        items: [
          {
            type: "boolean",
            prop: "enabled",
            value: t.enabled
          },
          {
            type: "boolean",
            prop: "visible",
            value: t.getHelper().visible
          },
          {
            type: "button",
            prop: "Reset"
          },
          {
            type: "option",
            prop: "Mode",
            options: [
              {
                title: "Translate",
                value: "translate"
              },
              {
                title: "Rotate",
                value: "rotate"
              },
              {
                title: "Scale",
                value: "scale"
              }
            ]
          },
          {
            type: "option",
            prop: "Space",
            options: [
              {
                title: "World",
                value: "world"
              },
              {
                title: "Local",
                value: "local"
              }
            ]
          }
        ],
        onUpdate: (r, a) => {
          if (t !== void 0)
            switch (r) {
              case "enabled":
                t.enabled = a;
                break;
              case "visible":
                t.getHelper().visible = a;
                break;
              case "Reset":
                t.reset();
                break;
              case "Mode":
                t.setMode(a);
                break;
              case "Space":
                t.setSpace(a);
                break;
            }
        }
      });
    }
    return t;
  }
  get(e) {
    return this.controls.get(e);
  }
  remove(e) {
    const t = this.get(e);
    return t === void 0 ? !1 : (t.detach(), t.disconnect(), wt(t.getHelper()), this.controls.delete(e), !0);
  }
  enabled(e) {
    this.controls.forEach((t) => {
      t.enabled = e;
    });
  }
  updateCamera(e, t) {
    this.activeCamera = e, this.controls.forEach((s) => {
      s.camera !== e && (s.camera = e, e.getWorldPosition(s.cameraPosition), e.getWorldQuaternion(s.cameraQuaternion)), s.domElement !== t && (s.disconnect(), s.domElement = t, s.connect());
    });
  }
  show() {
    this.controls.forEach((e) => {
      const t = e.getHelper(), s = this.visibility.get(t.name);
      s !== void 0 && (t.visible = s);
    });
  }
  hide() {
    this.controls.forEach((e) => {
      const t = e.getHelper();
      this.visibility.set(t.name, t.visible), t.visible = !1;
    });
  }
  static get instance() {
    return ge._instance || (ge._instance = new ge()), ge._instance;
  }
}
const bs = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
];
class Oe extends Oi {
  static instance = null;
  scene = new ws();
  renderer;
  currentScene;
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  helpersContainer = new Vn();
  grid = new dr();
  axisHelper = new Wi(500);
  interactionHelper = new Wi(100);
  currentTransform;
  // Override Materials
  depthMaterial = new Xn();
  normalsMaterial = new $n();
  uvMaterial = new mr();
  wireframeMaterial = new St({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  });
  // Playback
  playing = !1;
  rafID = -1;
  width = 0;
  height = 0;
  // Windows
  sceneSet = !1;
  tlCam = null;
  trCam = null;
  blCam = null;
  brCam = null;
  tlRender = "Renderer";
  trRender = "Renderer";
  blRender = "Renderer";
  brRender = "Renderer";
  // Interactions
  selectedItem = void 0;
  debugCamera;
  raycaster = new yi();
  pointer = new re();
  cameraControls = void 0;
  // References
  canvasRef;
  containerRef;
  tlWindow;
  trWindow;
  blWindow;
  brWindow;
  currentWindow;
  // RefObject to one of the "windows"
  constructor(e) {
    super(e), this.canvasRef = Xe(), this.containerRef = Xe(), this.tlWindow = Xe(), this.trWindow = Xe(), this.blWindow = Xe(), this.brWindow = Xe();
    const t = e.three.app.appID, s = localStorage, n = s.getItem(`${t}_mode`);
    this.state = {
      mode: n !== null ? n : "Single",
      modeOpen: !1,
      renderModeOpen: !1,
      interactionMode: "Orbit",
      interactionModeOpen: !1,
      lastUpdate: Date.now()
    }, s.setItem(`${t}_mode`, this.state.mode), s.setItem(`${t}_tlCam`, s.getItem(`${t}_tlCam`) !== null ? s.getItem(`${t}_tlCam`) : "Debug"), s.setItem(`${t}_trCam`, s.getItem(`${t}_trCam`) !== null ? s.getItem(`${t}_trCam`) : "Orthographic"), s.setItem(`${t}_blCam`, s.getItem(`${t}_blCam`) !== null ? s.getItem(`${t}_blCam`) : "Front"), s.setItem(`${t}_brCam`, s.getItem(`${t}_brCam`) !== null ? s.getItem(`${t}_brCam`) : "Top"), s.setItem(`${t}_tlRender`, s.getItem(`${t}_tlRender`) !== null ? s.getItem(`${t}_tlRender`) : "Renderer"), s.setItem(`${t}_trRender`, s.getItem(`${t}_trRender`) !== null ? s.getItem(`${t}_trRender`) : "Renderer"), s.setItem(`${t}_blRender`, s.getItem(`${t}_blRender`) !== null ? s.getItem(`${t}_blRender`) : "Renderer"), s.setItem(`${t}_brRender`, s.getItem(`${t}_brRender`) !== null ? s.getItem(`${t}_brRender`) : "Renderer");
    const r = {
      Vector2: re,
      Vector3: D,
      Vector4: na,
      Quaternion: pe,
      Matrix4: Xt,
      Spherical: gi,
      Box3: aa,
      Sphere: ra,
      Raycaster: yi
    };
    Ce.install({ THREE: r }), this.setupScene(), Oe.instance = this;
  }
  componentDidMount() {
    this.setupRenderer(), this.enable(), this.assignControls(), this.resize(), this.play(), ge.instance.three = this.props.three, ge.instance.activeCamera = this.debugCamera;
  }
  componentDidUpdate(e, t, s) {
    t.mode !== this.state.mode && (this.assignControls(), this.resize());
  }
  componentWillUnmount() {
    this.disable();
  }
  render() {
    const e = [];
    return this.cameras.forEach((t, s) => {
      e.push(s);
    }), /* @__PURE__ */ d.jsxs("div", { className: "multiview", children: [
      /* @__PURE__ */ d.jsx("canvas", { ref: this.canvasRef }),
      /* @__PURE__ */ d.jsxs("div", { className: `cameras ${this.state.mode === "Single" || this.state.mode === "Stacked" ? "single" : ""}`, ref: this.containerRef, children: [
        this.state.mode === "Single" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx(
          Ne,
          {
            camera: this.tlCam,
            options: e,
            ref: this.tlWindow,
            onSelectCamera: (t) => {
              this.controls.get(this.tlCam.name)?.dispose();
              const s = this.cameras.get(t);
              s !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = s, localStorage.setItem(`${this.appID}_tlCam`, s.name), this.createControls(s, this.tlWindow.current));
            },
            onSelectRenderMode: (t) => {
              this.tlRender = t, localStorage.setItem(`${this.appID}_tlRender`, t);
            }
          }
        ) }),
        (this.state.mode === "Side by Side" || this.state.mode === "Stacked") && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            Ne,
            {
              camera: this.tlCam,
              options: e,
              ref: this.tlWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.tlCam.name)?.dispose();
                const s = this.cameras.get(t);
                s !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = s, localStorage.setItem(`${this.appID}_tlCam`, s.name), this.createControls(s, this.tlWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.tlRender = t, localStorage.setItem(`${this.appID}_tlRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Ne,
            {
              camera: this.trCam,
              options: e,
              ref: this.trWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.trCam.name)?.dispose();
                const s = this.cameras.get(t);
                s !== void 0 && (this.clearCamera(this.trCam), this.trCam = s, localStorage.setItem(`${this.appID}_trCam`, s.name), this.createControls(s, this.trWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.trRender = t, localStorage.setItem(`${this.appID}_trRender`, t);
              }
            }
          )
        ] }),
        this.state.mode === "Quad" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            Ne,
            {
              camera: this.tlCam,
              options: e,
              ref: this.tlWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.tlCam.name)?.dispose();
                const s = this.cameras.get(t);
                s !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = s, localStorage.setItem(`${this.appID}_tlCam`, s.name), this.createControls(s, this.tlWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.tlRender = t, localStorage.setItem(`${this.appID}_tlRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Ne,
            {
              camera: this.trCam,
              options: e,
              ref: this.trWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.trCam.name)?.dispose();
                const s = this.cameras.get(t);
                s !== void 0 && (this.clearCamera(this.trCam), this.trCam = s, localStorage.setItem(`${this.appID}_trCam`, s.name), this.createControls(s, this.trWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.trRender = t, localStorage.setItem(`${this.appID}_trRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Ne,
            {
              camera: this.blCam,
              options: e,
              ref: this.blWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.blCam.name)?.dispose();
                const s = this.cameras.get(t);
                s !== void 0 && (this.clearCamera(this.blCam), this.blCam = s, localStorage.setItem(`${this.appID}_blCam`, s.name), this.createControls(s, this.blWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.blRender = t, localStorage.setItem(`${this.appID}_blRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Ne,
            {
              camera: this.brCam,
              options: e,
              ref: this.brWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.brCam.name)?.dispose();
                const s = this.cameras.get(t);
                s !== void 0 && (this.clearCamera(this.brCam), this.brCam = s, localStorage.setItem(`${this.appID}_brCam`, s.name), this.createControls(s, this.brWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.brRender = t, localStorage.setItem(`${this.appID}_brRender`, t);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ d.jsx(
          Gt,
          {
            title: "View",
            index: bs.indexOf(this.state.mode),
            options: bs,
            onSelect: (t) => {
              t !== this.state.mode && (this.killControls(), this.setState({ mode: t }));
            },
            open: this.state.modeOpen,
            onToggle: (t) => {
              this.setState({
                modeOpen: t,
                renderModeOpen: !1,
                interactionModeOpen: !1
              });
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          Gt,
          {
            title: "Interact",
            index: this.state.interactionMode === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (t) => {
              this.interactionHelper.visible = t === "Selection Mode", this.setState({ interactionMode: this.interactionHelper.visible ? "Selection" : "Orbit" });
            },
            open: this.state.interactionModeOpen,
            onToggle: (t) => {
              this.setState({
                modeOpen: !1,
                renderModeOpen: !1,
                interactionModeOpen: t
              });
            }
          }
        )
      ] }, this.state.lastUpdate)
    ] });
  }
  // Setup
  setupRenderer() {
    this.renderer = new Qn({
      canvas: this.canvasRef.current,
      stencil: !1
    }), this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setClearColor(0), this.props.three.renderer = this.renderer;
  }
  setupScene() {
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.helpersContainer.add(this.grid), this.axisHelper.name = "axisHelper", this.helpersContainer.add(this.axisHelper), this.interactionHelper.name = "interactionHelper", this.helpersContainer.add(this.interactionHelper), this.interactionHelper.visible = !1;
    const e = (n, r) => {
      const a = new _i(-100, 100, 100, -100, 50, 5e3);
      return a.name = n, a.position.copy(r), a.lookAt(0, 0, 0), this.cameras.set(n, a), a;
    };
    e("Top", new D(0, 1e3, 0)), e("Bottom", new D(0, -1e3, 0)), e("Left", new D(-1e3, 0, 0)), e("Right", new D(1e3, 0, 0)), e("Front", new D(0, 0, 1e3)), e("Back", new D(0, 0, -1e3)), e("Orthographic", new D(1e3, 1e3, 1e3)), e("UI", new D()), this.debugCamera = new ni(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const t = localStorage, s = this.props.three.app.appID;
    this.tlCam = this.cameras.get(t.getItem(`${s}_tlCam`)), this.trCam = this.cameras.get(t.getItem(`${s}_trCam`)), this.blCam = this.cameras.get(t.getItem(`${s}_blCam`)), this.brCam = this.cameras.get(t.getItem(`${s}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  // Public
  play() {
    this.playing = !0, this.onUpdate();
  }
  pause() {
    this.playing = !1, cancelAnimationFrame(this.rafID), this.rafID = -1;
  }
  toggleOrbitControls(e) {
    this.controls.forEach((t) => {
      t.enabled = !e;
    });
  }
  // Playback
  update() {
    this.controls.forEach((e) => {
      e.update();
    }), this.cameraHelpers.forEach((e) => {
      e.update();
    }), this.lightHelpers.forEach((e) => {
      e.update !== void 0 && e.update();
    }), this.props.onSceneUpdate !== void 0 && this.sceneSet && this.props.onSceneUpdate(this.currentScene);
  }
  draw() {
    switch (this.renderer?.clear(), this.state.mode) {
      case "Single":
        this.drawSingle();
        break;
      case "Side by Side":
      case "Stacked":
        this.drawDouble();
        break;
      case "Quad":
        this.drawQuad();
        break;
    }
  }
  onUpdate = () => {
    this.playing && (this.update(), this.draw(), this.rafID = requestAnimationFrame(this.onUpdate));
  };
  // Events
  enable() {
    const e = this.containerRef.current;
    e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), R.addEventListener(P.SET_SCENE, this.sceneUpdate), R.addEventListener(P.ADD_CAMERA, this.addCamera), R.addEventListener(P.REMOVE_CAMERA, this.removeCamera), R.addEventListener(P.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const e = this.containerRef.current;
    e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), R.removeEventListener(P.SET_SCENE, this.sceneUpdate), R.removeEventListener(P.ADD_CAMERA, this.addCamera), R.removeEventListener(P.REMOVE_CAMERA, this.removeCamera), R.removeEventListener(P.SET_OBJECT, this.onSetSelectedItem);
  }
  resize = () => {
    this.width = window.innerWidth - 300, this.height = window.innerHeight;
    const e = Math.floor(this.width / 2), t = Math.floor(this.height / 2);
    this.props.three.resize(this.width, this.height), this.props.onSceneResize !== void 0 && this.sceneSet && this.currentScene !== void 0 && this.props.onSceneResize(this.currentScene, this.width, this.height);
    let s = this.width, n = this.height;
    switch (this.state.mode) {
      case "Side by Side":
        s = e, n = this.height;
        break;
      case "Stacked":
        s = this.width, n = t;
        break;
      case "Quad":
        s = e, n = t;
        break;
    }
    const r = s / n;
    this.cameras.forEach((a) => {
      a instanceof _i ? (a.left = s / -2, a.right = s / 2, a.top = n / 2, a.bottom = n / -2, a.name === "UI" && (a.position.x = this.width / 2, a.position.y = this.height / -2, a.position.z = 100), a.updateProjectionMatrix()) : a instanceof ni && (a.aspect = r, a.updateProjectionMatrix(), this.cameraHelpers.get(a.name)?.update());
    });
  };
  sceneUpdate = (e) => {
    this.helpersContainer.add(this.axisHelper), this.clearLightHelpers(), this.scene.remove(this.currentScene), wt(this.currentScene);
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const s = new t();
      this.props.onSceneSet !== void 0 && this.props.onSceneSet(s), this.currentScene = s, this.props.three.scene = this.currentScene, this.scene.add(this.currentScene), this.sceneSet = !0, this.addLightHelpers();
    }
  };
  addCamera = (e) => {
    const t = e.value, s = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (s !== void 0 && this.cameras.set(t.name, s), s instanceof ni) {
      const n = new qn(s);
      this.cameraHelpers.set(s.name, n), this.scene.add(n);
    }
    this.setState({ lastUpdate: Date.now() });
  };
  removeCamera = (e) => {
    const t = this.cameraHelpers.get(e.value.name);
    t !== void 0 && (this.scene.remove(t), t.dispose()), this.cameras.delete(e.value.name), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new re();
    this.renderer.getSize(t);
    const s = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = Qe(s, 0, t.x, -1, 1), this.pointer.y = Qe(n, 0, t.y, 1, -1);
    const r = t.x / 2, a = t.y / 2, o = () => {
      s < r ? this.pointer.x = Qe(s, 0, r, -1, 1) : this.pointer.x = Qe(s, r, t.x, -1, 1);
    }, h = () => {
      n < a ? this.pointer.y = Qe(n, 0, a, 1, -1) : this.pointer.y = Qe(n, a, t.y, 1, -1);
    };
    switch (this.state.mode) {
      case "Quad":
        o(), h();
        break;
      case "Side by Side":
        o();
        break;
      case "Stacked":
        h(), h();
        break;
    }
    if (this.updateCamera(s, n, r, a), this.state.interactionMode === "Orbit")
      return;
    const c = this.raycaster.intersectObjects(this.currentScene.children);
    c.length > 0 && this.interactionHelper.position.copy(c[0].point);
  };
  onClick = (e) => {
    if (this.state.interactionMode === "Orbit")
      return;
    const t = new re();
    if (this.renderer.getSize(t), e.clientX >= t.x)
      return;
    this.onMouseMove(e);
    const s = this.raycaster.intersectObjects(this.currentScene.children);
    s.length > 0 && (this.props.three.getObject(s[0].object.uuid), this.interactionHelper.visible = !1, this.setState({ interactionMode: "Orbit", lastUpdate: Date.now() }));
  };
  onKey = (e) => {
    if (this.selectedItem !== void 0) {
      if (e.ctrlKey) {
        if (this.currentCamera.name === "UI")
          return;
        const t = this.controls.get(this.currentCamera.name);
        e.key === "0" ? (this.clearControls(), this.cameraControls = new Ce(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof w || this.selectedItem instanceof Kn ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (this.clearControls(), this.cameraControls = new Ce(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (this.clearControls(), this.cameraControls = new Ce(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (this.clearControls(), this.cameraControls = new Ce(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (this.clearControls(), this.cameraControls = new Ce(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (this.clearControls(), this.cameraControls = new Ce(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(as(45), as(45), !0), this.updateCameraControls(t));
      } else if (this.currentTransform !== void 0)
        switch (e.key) {
          case "r":
            this.currentTransform.setMode("rotate");
            break;
          case "s":
            this.currentTransform.setMode("scale");
            break;
          case "t":
            this.currentTransform.setMode("translate");
            break;
        }
    }
  };
  onSetSelectedItem = (e) => {
    this.selectedItem = this.currentScene.getObjectByProperty("uuid", e.value.uuid), this.selectedItem !== void 0 && (this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), ge.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = ge.instance.add(e.value.name), this.currentTransform.attach(this.selectedItem), this.scene.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform));
  };
  onUpdateTransform = () => {
    this.selectedItem !== void 0 && (this.props.three.updateObject(this.selectedItem.uuid, "position", this.selectedItem.position), this.props.three.updateObject(this.selectedItem.uuid, "rotation", {
      x: this.selectedItem.rotation.x,
      y: this.selectedItem.rotation.y,
      z: this.selectedItem.rotation.z
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), Re.instance.update());
  };
  // Utils
  clearLightHelpers = () => {
    this.lightHelpers.forEach((e) => {
      this.helpersContainer.remove(e), e.dispose();
    }), this.lightHelpers.clear();
  };
  addLightHelpers = () => {
    this.currentScene !== void 0 && this.currentScene.traverse((e) => {
      if (e.type.search("Light") > -1) {
        let t;
        switch (e.type) {
          case "DirectionalLight":
            t = new ia(e, 100), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new ta(e, 250), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new Wa(e), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new ea(e, 100), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new Jn(e), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const s = this.controls.get(e.name);
    if (s !== void 0 && s.dispose(), this.controls.delete(e.name), e.name === "UI")
      return;
    const n = new Va(e, t);
    switch (n.enableDamping = !0, n.dampingFactor = 0.05, e.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        n.enableRotate = !1;
        break;
    }
    this.controls.set(e.name, n);
  }
  clearCamera(e) {
    const t = this.cameraHelpers.get(e.name);
    t !== void 0 && (this.scene.remove(t), t.dispose(), this.cameraHelpers.delete(e.name));
    const s = this.controls.get(e.name);
    s !== void 0 && (s.dispose(), this.controls.delete(e.name));
  }
  killControls() {
    this.controls.forEach((e, t) => {
      e.dispose();
      const s = this.cameraHelpers.get(t);
      s !== void 0 && (this.scene.remove(s), s.dispose()), this.cameraHelpers.delete(t), this.controls.delete(t);
    }), this.controls.clear(), this.cameraHelpers.clear();
  }
  assignControls() {
    switch (this.state.mode) {
      case "Single":
        this.createControls(this.tlCam, this.tlWindow.current);
        break;
      case "Side by Side":
      case "Stacked":
        this.createControls(this.tlCam, this.tlWindow.current), this.createControls(this.trCam, this.trWindow.current);
        break;
      case "Quad":
        this.createControls(this.tlCam, this.tlWindow.current), this.createControls(this.trCam, this.trWindow.current), this.createControls(this.blCam, this.blWindow.current), this.createControls(this.brCam, this.brWindow.current);
        break;
    }
  }
  updateCamera = (e, t, s, n) => {
    switch (this.state.mode) {
      case "Quad":
        e < s ? t < n ? (this.currentCamera = this.tlCam, this.raycaster.setFromCamera(this.pointer, this.tlCam)) : (this.currentCamera = this.blCam, this.raycaster.setFromCamera(this.pointer, this.blCam)) : t < n ? (this.currentCamera = this.trCam, this.raycaster.setFromCamera(this.pointer, this.trCam)) : (this.currentCamera = this.brCam, this.raycaster.setFromCamera(this.pointer, this.brCam));
        break;
      case "Side by Side":
        e < s ? (this.currentCamera = this.tlCam, this.raycaster.setFromCamera(this.pointer, this.tlCam)) : (this.currentCamera = this.trCam, this.raycaster.setFromCamera(this.pointer, this.trCam));
        break;
      case "Single":
        this.currentCamera = this.tlCam, this.raycaster.setFromCamera(this.pointer, this.tlCam);
        break;
      case "Stacked":
        t < n ? (this.currentCamera = this.tlCam, this.raycaster.setFromCamera(this.pointer, this.tlCam)) : (this.currentCamera = this.trCam, this.raycaster.setFromCamera(this.pointer, this.trCam));
        break;
    }
    this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), ge.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (e, t = !1) => {
    if (this.selectedItem === void 0)
      return;
    cancelAnimationFrame(this.rafID), this.rafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const s = 0.15, n = new sa();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const r = () => {
      const a = n.getDelta();
      this.cameraControls && this.cameraControls.update(a), t && (e.target.lerp(e.target0, s), e.object.position.lerp(e.position0, s), e.object.zoom = Ei(e.object.zoom, e.zoom0, s), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.rafID), this.rafID = -1, this.clearControls()) : this.rafID = requestAnimationFrame(r);
    };
    r();
  };
  clearControls = () => {
    this.cameraControls !== void 0 && (this.cameraControls.disconnect(), this.cameraControls.dispose(), this.cameraControls = void 0);
  };
  // Drawing
  getSceneOverride(e) {
    switch (e) {
      case "Depth":
        return this.depthMaterial;
      case "Normals":
        return this.normalsMaterial;
      case "Renderer":
        return null;
      case "UVs":
        return this.uvMaterial;
      case "Wireframe":
        return this.wireframeMaterial;
    }
    return null;
  }
  drawSingle() {
    const e = this.getSceneOverride(this.tlRender);
    this.scene.overrideMaterial = e, this.renderer?.setViewport(0, 0, this.width, this.height), this.renderer?.setScissor(0, 0, this.width, this.height), this.renderer?.render(this.scene, this.tlCam);
  }
  drawDouble = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = Math.floor(this.width / 2), n = Math.floor(this.height / 2);
    if (this.scene.overrideMaterial = e, this.state.mode === "Side by Side")
      this.renderer?.setViewport(0, 0, s, this.height), this.renderer?.setScissor(0, 0, s, this.height), this.renderer?.render(this.scene, this.tlCam), this.scene.overrideMaterial = t, this.renderer?.setViewport(s, 0, s, this.height), this.renderer?.setScissor(s, 0, s, this.height), this.renderer?.render(this.scene, this.trCam);
    else {
      const r = this.height - n;
      this.renderer?.setViewport(0, r, this.width, n), this.renderer?.setScissor(0, r, this.width, n), this.renderer?.render(this.scene, this.tlCam), this.scene.overrideMaterial = t, this.renderer?.setViewport(0, 0, this.width, n), this.renderer?.setScissor(0, 0, this.width, n), this.renderer?.render(this.scene, this.trCam);
    }
  };
  drawQuad = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = this.getSceneOverride(this.blRender), n = this.getSceneOverride(this.brRender), r = Math.floor(this.width / 2), a = Math.floor(this.height / 2);
    let o = 0, h = 0;
    h = this.height - a, o = 0, this.scene.overrideMaterial = e, this.renderer?.setViewport(o, h, r, a), this.renderer?.setScissor(o, h, r, a), this.renderer?.render(this.scene, this.tlCam), o = r, this.scene.overrideMaterial = t, this.renderer?.setViewport(o, h, r, a), this.renderer?.setScissor(o, h, r, a), this.renderer?.render(this.scene, this.trCam), h = 0, o = 0, this.scene.overrideMaterial = s, this.renderer?.setViewport(o, h, r, a), this.renderer?.setScissor(o, h, r, a), this.renderer?.render(this.scene, this.blCam), o = r, this.scene.overrideMaterial = n, this.renderer?.setViewport(o, h, r, a), this.renderer?.setScissor(o, h, r, a), this.renderer?.render(this.scene, this.brCam);
  };
  // Getters
  get appID() {
    return this.props.three.app.appID;
  }
  get mode() {
    return this.state.mode;
  }
  get three() {
    return this.props.three;
  }
}
class Re extends Oi {
  static instance;
  matrix = new Xt();
  position = new D();
  rotation = new Zs();
  scale = new D();
  open = !1;
  constructor(e) {
    super(e), this.state = {
      lastUpdated: 0,
      expanded: !1
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), Re.instance = this;
  }
  update() {
    this.position.copy(Oe.instance.selectedItem.position), this.rotation.copy(Oe.instance.selectedItem.rotation), this.scale.copy(Oe.instance.selectedItem.scale), this.setState({ lastUpdated: Date.now() });
  }
  render() {
    return /* @__PURE__ */ d.jsx(
      Te,
      {
        title: "Transform",
        expanded: this.open,
        items: [
          {
            title: "Position",
            prop: "position",
            type: "grid3",
            step: 0.1,
            value: this.position,
            onChange: this.updateTransform
          },
          {
            title: "Rotation",
            prop: "rotation",
            type: "grid3",
            value: this.rotation,
            onChange: this.updateTransform
          },
          {
            title: "Scale",
            prop: "scale",
            type: "grid3",
            value: this.scale,
            onChange: this.updateTransform
          },
          {
            title: "Visible",
            prop: "visible",
            type: "boolean",
            value: Re.instance.props.object.visible,
            onChange: this.updateTransform
          }
        ],
        onToggle: (e) => {
          this.open = e;
        }
      },
      this.state.lastUpdated
    );
  }
  updateTransform(e, t) {
    const s = e === "rotation" ? { x: t._x, y: t._y, z: t._z } : t;
    Oe.instance?.three.updateObject(Re.instance.props.object.uuid, e, s);
    const n = Oe.instance?.three.getScene(Re.instance.props.object.uuid);
    if (n) {
      const r = n.getObjectByProperty("uuid", Re.instance.props.object.uuid);
      q(r, e, s);
    }
  }
}
function Cs(i) {
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
function Sr(i, e) {
  const t = [];
  if (i.lightInfo !== void 0)
    for (const s in i.lightInfo) {
      const n = i.lightInfo[s];
      n !== void 0 && (n.isColor !== void 0 ? t.push({
        title: Cs(s),
        prop: s,
        type: "color",
        value: n,
        onChange: (r, a) => {
          const o = new Vt(a);
          e.updateObject(i.uuid, r, o);
          const h = e.getScene(i.uuid);
          if (h !== null) {
            const c = h.getObjectByProperty("uuid", i.uuid);
            q(c, r, o);
          }
        }
      }) : t.push({
        title: Cs(s),
        prop: s,
        type: typeof n,
        value: n,
        step: typeof n == "number" ? 0.01 : void 0,
        onChange: (r, a) => {
          e.updateObject(i.uuid, r, a);
          const o = e.getScene(i.uuid);
          if (o !== null) {
            const h = o.getObjectByProperty("uuid", i.uuid);
            q(h, r, a);
          }
        }
      }));
    }
  return /* @__PURE__ */ d.jsx(
    Te,
    {
      title: "Light",
      items: t
    }
  );
}
function xr(i, e) {
  const t = [], s = [];
  let n = 0;
  i.animations.forEach((a) => {
    n = Math.max(n, a.duration), a.duration > 0 && s.push({
      title: a.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: a.duration,
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
  }), t.push({
    title: "Animations",
    items: s
  });
  const r = e.getScene(i.uuid);
  if (r !== null) {
    const a = r.getObjectByProperty("uuid", i.uuid);
    let o = !1;
    if (a !== void 0) {
      const h = a.mixer;
      if (o = h !== void 0, o) {
        const c = [
          {
            title: "Time Scale",
            type: "range",
            value: h.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (u, m) => {
              h.timeScale = m, e.updateObject(i.uuid, "mixer.timeScale", m);
            }
          }
        ];
        c.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            h.stopAllAction(), e.requestMethod(i.uuid, "stopAllAction", void 0, "mixer");
          }
        }), t.push({
          title: "Mixer",
          items: c
        });
      }
    }
  }
  return /* @__PURE__ */ d.jsx(Te, { title: "Animation", items: t });
}
const tn = {
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
let de = { ...tn };
function Or(i) {
  const [e, t] = W(-1);
  nt(() => {
    function a(h) {
      de = { ...h.value }, t(Date.now());
    }
    function o() {
      de = { ...tn }, t(Date.now());
    }
    return R.addEventListener(P.SET_SCENE, o), R.addEventListener(P.SET_OBJECT, a), () => {
      R.removeEventListener(P.SET_SCENE, o), R.removeEventListener(P.SET_OBJECT, a);
    };
  }, []);
  const s = de.type.toLowerCase(), n = de.animations.length > 0 || de.mixer !== void 0, r = s.search("mesh") > -1 || s.search("line") > -1 || s.search("points") > -1;
  return /* @__PURE__ */ d.jsx(Wt, { label: "Inspector", children: /* @__PURE__ */ d.jsx("div", { id: "Inspector", className: i.class, children: de.uuid.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        Yt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: de.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Yt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: de.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Yt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: de.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(Re, { object: de }),
      n ? xr(de, i.three) : null,
      s.search("camera") > -1 ? Za(de, i.three) : null,
      s.search("light") > -1 ? Sr(de, i.three) : null,
      r ? Ha(de, i.three) : null
    ] })
  ] }) }, e) }, "Inspector");
}
function Tr(i) {
  const [e] = W([]), [t] = W([]), [s, n] = W(0), r = (h) => {
    const c = h.value;
    e.push(c), t.push(
      /* @__PURE__ */ d.jsx(
        Wt,
        {
          label: `Scene: ${c.name}`,
          scene: c,
          open: !0,
          onRefresh: () => {
            i.three.refreshScene(c.name);
          },
          children: /* @__PURE__ */ d.jsx(Ki, { child: c, scene: c, three: i.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, a = (h) => {
    const c = h.value;
    for (let u = 0; u < e.length; u++)
      if (c.uuid === e[u].uuid) {
        e[u] = c, t[u] = /* @__PURE__ */ d.jsx(
          Wt,
          {
            label: `Scene: ${c.name}`,
            scene: c,
            open: !0,
            onRefresh: () => {
              i.three.refreshScene(c.name);
            },
            children: /* @__PURE__ */ d.jsx(Ki, { child: c, scene: c, three: i.three })
          },
          Math.random()
        ), n(Date.now());
        return;
      }
  }, o = (h) => {
    const c = h.value;
    for (let u = 0; u < e.length; u++)
      if (c.uuid === e[u].uuid) {
        e.splice(u, 1), t.splice(u, 1), n(Date.now());
        return;
      }
  };
  return nt(() => (R.addEventListener(P.ADD_SCENE, r), R.addEventListener(P.REFRESH_SCENE, a), R.addEventListener(P.REMOVE_SCENE, o), () => {
    R.removeEventListener(P.ADD_SCENE, r), R.removeEventListener(P.REFRESH_SCENE, a), R.removeEventListener(P.REMOVE_SCENE, o);
  }), []), /* @__PURE__ */ d.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ d.jsx("div", { className: "scenes", children: t }, s),
    /* @__PURE__ */ d.jsx(Or, { three: i.three }),
    /* @__PURE__ */ d.jsx(Ye, { three: i.three })
  ] });
}
function Yr(i) {
  return nt(() => {
    function e(o) {
      let h = null;
      return i.three.scenes.forEach((c) => {
        o.search(c.uuid) > -1 && (h = c);
      }), h;
    }
    const t = (o) => {
      const h = o.value, u = e(h)?.getObjectByProperty("uuid", h);
      u !== void 0 && i.three.setObject(u);
    }, s = (o, h, c) => {
      const m = e(o)?.getObjectByProperty("uuid", o);
      m !== void 0 && q(m, h, c);
    }, n = (o) => {
      const h = o.value, { key: c, value: u, uuid: m } = h;
      s(m, c, u);
    }, r = (o) => {
      const h = o.value, u = e(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (u !== void 0) {
        const m = (_) => {
          const g = h.key.split(".");
          switch (g.length) {
            case 1:
              u[g[0]] = _;
              break;
            case 2:
              u[g[0]][g[1]] = _;
              break;
            case 3:
              u[g[0]][g[1]][g[2]] = _;
              break;
            case 4:
              u[g[0]][g[1]][g[2]][g[3]] = _;
              break;
            case 5:
              u[g[0]][g[1]][g[2]][g[3]][g[4]] = _;
              break;
          }
          u.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? $s(h.value.src).then((_) => {
          _.offset.set(h.value.offset[0], h.value.offset[1]), _.repeat.set(h.value.repeat[0], h.value.repeat[1]), m(_);
        }) : m(null);
      }
    }, a = (o) => {
      const { key: h, uuid: c, value: u, subitem: m } = o.value, g = e(c)?.getObjectByProperty("uuid", c);
      if (g !== void 0)
        try {
          m !== void 0 ? ma(g, m)[h](u) : g[h](u);
        } catch (S) {
          console.log("Error requesting method:"), console.log(S), console.log(h), console.log(u);
        }
    };
    return R.addEventListener(P.GET_OBJECT, t), R.addEventListener(P.UPDATE_OBJECT, n), R.addEventListener(P.CREATE_TEXTURE, r), R.addEventListener(P.REQUEST_METHOD, a), () => {
      R.removeEventListener(P.GET_OBJECT, t), R.removeEventListener(P.UPDATE_OBJECT, n), R.removeEventListener(P.CREATE_TEXTURE, r), R.removeEventListener(P.REQUEST_METHOD, a);
    };
  }, []), null;
}
function Mr(i) {
  return /* @__PURE__ */ d.jsxs("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ d.jsx("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ d.jsx("div", { className: "footer", children: i.footer })
  ] });
}
function Br(i) {
  return /* @__PURE__ */ d.jsx(Mr, { children: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      Oe,
      {
        three: i.three,
        scenes: i.scenes,
        onSceneResize: i.onSceneResize,
        onSceneSet: i.onSceneSet,
        onSceneUpdate: i.onSceneUpdate
      }
    ),
    /* @__PURE__ */ d.jsx(Tr, { three: i.three })
  ] }) });
}
export {
  Wt as Accordion,
  kr as Application,
  Ti as BaseRemote,
  qs as ChildObject,
  Ki as ContainerObject,
  ba as Draggable,
  Ea as DraggableItem,
  Ca as Dropdown,
  wa as DropdownItem,
  Mr as Editor,
  Ht as ExportTexture,
  Or as Inspector,
  Oe as MultiView,
  Qs as NavButton,
  jr as RemoteComponents,
  Hr as RemoteController,
  Xs as RemoteTheatre,
  Fr as RemoteThree,
  Yr as SceneInspector,
  Tr as SidePanel,
  Br as ThreeEditor,
  P as ToolEvents,
  Zt as capitalize,
  Fe as clamp,
  Vi as colorToHex,
  Ir as copyToClipboard,
  zr as customizeTheatreElements,
  R as debugDispatcher,
  Ar as defaultTheatreCallback,
  wt as dispose,
  ha as disposeMaterial,
  Ur as disposeTexture,
  Lr as distance,
  Ci as hierarchyUUID,
  ca as isColor,
  Ei as mix,
  Vs as noop,
  Gi as normalize,
  la as randomID,
  $i as resetThreeObjects,
  Xi as round,
  Nr as theatreEditorApp,
  bi as totalThreeObjects
};
