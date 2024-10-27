import { OrthographicCamera as Ci, Scene as Ms, MeshBasicMaterial as Ge, BufferGeometry as at, Float32BufferAttribute as Be, Mesh as w, LinearSRGBColorSpace as Vi, EventDispatcher as Ps, Texture as An, RepeatWrapping as Xi, WebGLRenderTarget as In, Color as Tt, FrontSide as Ln, BackSide as Ds, DoubleSide as Pi, NoBlending as kn, NormalBlending as Un, AdditiveBlending as jn, SubtractiveBlending as Nn, MultiplyBlending as Fn, CustomBlending as zn, AddEquation as Hn, SubtractEquation as Yn, ReverseSubtractEquation as Bn, MinEquation as Zn, MaxEquation as Gn, ZeroFactor as Rs, OneFactor as As, SrcColorFactor as Is, OneMinusSrcColorFactor as Ls, SrcAlphaFactor as ks, OneMinusSrcAlphaFactor as Us, DstAlphaFactor as js, OneMinusDstAlphaFactor as Ns, DstColorFactor as Fs, OneMinusDstColorFactor as zs, SrcAlphaSaturateFactor as Wn, ConstantColorFactor as Hs, OneMinusConstantColorFactor as Ys, ConstantAlphaFactor as Bs, OneMinusConstantAlphaFactor as Zs, Line as Se, LineBasicMaterial as Di, Ray as Vn, Plane as Xn, MathUtils as $n, Vector3 as O, Controls as Gs, MOUSE as rt, TOUCH as nt, Quaternion as fe, Spherical as wi, Vector2 as ae, ShaderMaterial as Ws, GLSL3 as Qn, PlaneGeometry as Vs, Raycaster as Vt, Euler as Xs, Matrix4 as qt, Object3D as ot, CylinderGeometry as ce, BoxGeometry as ne, OctahedronGeometry as kt, SphereGeometry as $s, TorusGeometry as dt, CatmullRomCurve3 as $i, Group as qn, AxesHelper as Qi, MeshDepthMaterial as Kn, MeshNormalMaterial as Jn, WebGLRenderer as er, PerspectiveCamera as ci, CameraHelper as tr, SkinnedMesh as ir, SpotLightHelper as sr, PointLightHelper as nr, HemisphereLightHelper as rr, DirectionalLightHelper as ar, Clock as or, Vector4 as lr, Box3 as cr, Sphere as hr } from "three";
import Qs, { useState as G, useRef as ee, useEffect as lt, useMemo as xt, Component as Kt, createRef as Ae, forwardRef as dr } from "react";
import { Reorder as qs } from "framer-motion";
const Ks = () => {
}, za = () => {
};
function Xt(s) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
function ur(s) {
  const e = JSON.stringify(s);
  return navigator.clipboard.writeText(e), e;
}
function He(s, e, t) {
  return Math.min(e, Math.max(s, t));
}
function qi(s, e, t) {
  return (t - s) / (e - s);
}
function Si(s, e, t) {
  return s * (1 - t) + e * t;
}
function Ha(s, e) {
  const t = s - e;
  return Math.sqrt(t * t);
}
function pr() {
  return Math.round(Math.random() * 1e6).toString();
}
function mr(s) {
  return s.r !== void 0 && s.g !== void 0 && s.b !== void 0;
}
function Ki(s) {
  const e = Math.round(s.r * 255), t = Math.round(s.g * 255), i = Math.round(s.b * 255), n = (h) => {
    const c = h.toString(16);
    return c.length === 1 ? "0" + c : c;
  }, a = n(e), r = n(t), o = n(i);
  return "#" + a + r + o;
}
function Ot(s, e = 1) {
  return Number(s.toFixed(e));
}
let xi = 0;
const Ji = () => {
  xi = 0;
}, Oi = (s) => {
  if (!s)
    return;
  let e = s.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${xi}`, xi++), s.parent !== null && s.parent.uuid.length > 0 && (e = `${s.parent.uuid}.${e}`), s.uuid = e, s.isMesh !== void 0) {
    const t = s;
    if (Array.isArray(t.material))
      t.material.forEach((i, n) => {
        i.uuid = `${e}.material.${n}`;
      });
    else {
      const i = t.material;
      i.uuid = `${e}.material`;
    }
  }
  s.children.forEach((t) => Oi(t));
}, Ya = (s) => {
  s?.dispose();
}, fr = (s) => {
  s && (Array.isArray(s) ? s.forEach((e) => e.dispose()) : s.dispose());
}, We = (s) => {
  if (s) {
    for (; s.children.length > 0; ) {
      const e = s.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : We(e);
    }
    if (s.parent && s.parent.remove(s), s.isMesh) {
      const e = s;
      e.geometry?.dispose(), fr(e.material);
    }
    s.dispose !== void 0 && s.dispose();
  }
};
class Zt {
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
    const t = e.repeat.clone(), i = e.offset.clone();
    if (e.repeat.set(1, 1), e.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const n = e.image;
      if (n != null && n.width > 0) {
        this.canvas.title = e.sourceFile;
        const a = this.canvas.width / n.width, r = this.renderToCanvas(e);
        this.context.drawImage(r, 0, 0, n.width * a, n.height * a);
      }
    }
    return e.repeat.copy(t), e.offset.copy(i), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(e) {
    if (this.material === null) {
      this.camera = new Ci(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Ms(), this.material = new Ge();
      const t = new at();
      t.setAttribute("position", new Be([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new Be([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new Be([0, 0, 2, 0, 0, 2], 2));
      const i = new w(t, this.material);
      this.scene.add(i);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, i = e.colorSpace;
      this.renderer.outputColorSpace = Vi, e.colorSpace = Vi, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = i;
    }
    return this.renderer.domElement;
  }
}
class Ba {
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
  constructor(e, t, i = !0) {
    this._appID = e, this._debugEnabled = t, t && (this._useBC = i, i ? (this._broadcastChannel = new BroadcastChannel(e), this._broadcastChannel.addEventListener("message", this.messageHandler)) : (this._webSocket = new WebSocket(e), this._webSocket.addEventListener("open", this.openHandler), this._webSocket.addEventListener("close", this.closeHandler), this._webSocket.addEventListener("message", this.messageHandler)));
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
var D = /* @__PURE__ */ ((s) => (s.CUSTOM = "ToolEvents::custom", s.SELECT_DROPDOWN = "ToolEvents::selectDropdown", s.DRAG_UPDATE = "ToolEvents::dragUpdate", s.ADD_SCENE = "ToolEvents::addScene", s.REFRESH_SCENE = "ToolEvents::refreshScene", s.REMOVE_SCENE = "ToolEvents::removeScene", s.SET_SCENE = "ToolEvents::setScene", s.GET_OBJECT = "ToolEvents::getObject", s.SET_OBJECT = "ToolEvents::setObject", s.UPDATE_OBJECT = "ToolEvents::updateObject", s.CREATE_TEXTURE = "ToolEvents::createTexture", s.REQUEST_METHOD = "ToolEvents::requestMethod", s.ADD_CAMERA = "ToolEvents::addCamera", s.REMOVE_CAMERA = "ToolEvents::removeCamera", s.ADD_GROUP = "ToolEvents::addGroup", s.REMOVE_GROUP = "ToolEvents::removeGroup", s))(D || {});
const R = new Ps();
class Ri {
  app;
  constructor(e) {
    this.app = e;
  }
  dispose() {
  }
  handleApp(e, t, i) {
  }
  handleEditor(e, t, i) {
  }
}
class Za extends Ri {
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
  handleApp(e, t, i) {
    switch (i.event) {
      case "selectComponent":
        R.dispatchEvent({ type: D.SELECT_DROPDOWN, value: i.data });
        break;
      case "draggableListUpdate":
        R.dispatchEvent({ type: D.DRAG_UPDATE, value: i.data });
        break;
    }
  }
}
function Ga(s, e, t) {
  if (s.editor) {
    t.ui.restore(), t.onSelectionChange((r) => {
      r.length < 1 || r.forEach((o) => {
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
        s.send({ event: c, target: "app", data: u });
      });
    });
    let i = -1;
    const n = () => {
      if (e.activeSheet !== void 0 && i !== e.activeSheet.sequence.position) {
        i = e.activeSheet.sequence.position;
        const r = e.activeSheet;
        s.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: i,
            sheet: r.address.sheetId
          }
        });
      }
    }, a = () => {
      n(), requestAnimationFrame(a);
    };
    n(), a();
  } else
    t.ui.hide();
}
function Wa() {
  const s = document.getElementById("theatrejs-studio-root")?.shadowRoot?.getElementById("pointer-root")?.children[0], e = s?.children[1];
  e.style.justifyContent = "left";
  const t = e.children[1];
  t.style.transform = "translateX(10px)", t.removeChild(t.children[0]), t.removeChild(t.children[0]);
  const i = s?.children[3];
  i.style.top = "0", i.style.right = "300px";
}
class Js extends Ri {
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
    const i = this.getSheetInstance(e, t);
    let n = this.sheets.get(i);
    return n !== void 0 || (n = this.project?.sheet(e, t), this.sheets.set(i, n)), n;
  }
  playSheet(e, t, i) {
    return this.app.send({
      event: "playSheet",
      target: "editor",
      data: {
        sheet: e,
        instance: i,
        value: t
      }
    }), new Promise((n) => {
      const a = t !== void 0 ? { ...t } : {};
      a.rafDriver = Js.rafDriver, this.sheet(e, i)?.sequence.play(a).then((r) => n(r));
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
    this.sheetObjects.forEach((t, i) => {
      i.search(`${e}_`) > -1 && this.unsubscribe(t);
    });
  }
  sheetObject(e, t, i, n, a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const r = this.sheet(e, a);
    if (r === void 0)
      return;
    const h = `${this.getSheetInstance(e, a)}_${t}`;
    let c = this.sheetObjects.get(h);
    c !== void 0 ? c = r.object(t, { ...i, ...c.value }, { reconfigure: !0 }) : c = r.object(t, i), this.sheetObjects.set(h, c), this.sheetObjectCBs.set(h, n !== void 0 ? n : Ks);
    const u = c.onValuesChange((m) => {
      if (this.app.editor) {
        for (const g in m) {
          const S = m[g];
          typeof S == "object" && mr(S) && (m[g] = {
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
    const t = e.address.sheetId, i = e.address.objectKey;
    this.sheets.get(t)?.detachObject(i);
    const a = `${t}_${i}`, r = this.sheetObjectUnsubscribe.get(a);
    r !== void 0 && (this.sheetObjects.delete(a), this.sheetObjectCBs.delete(a), this.sheetObjectUnsubscribe.delete(a), r());
  }
  handleApp(e, t, i) {
    const n = t;
    let a;
    switch (i.event) {
      case "setSheet":
        a = n.sheets.get(i.data.sheet), a !== void 0 && (n.activeSheet = a, this.studio?.setSelection([a]));
        break;
      case "setSheetObject":
        a = n.sheetObjects.get(`${i.data.sheet}_${i.data.key}`), a !== void 0 && this.studio?.setSelection([a]);
        break;
      case "updateSheetObject":
        a = n.sheets.get(i.data.sheet), a !== void 0 && a.sequence.pause(), a = n.sheetObjectCBs.get(i.data.sheetObject), a !== void 0 && a(i.data.values);
        break;
      case "updateTimeline":
        a = n.sheets.get(i.data.sheet), n.activeSheet !== void 0 && (n.activeSheet.sequence.position = i.data.position);
        break;
    }
  }
  handleEditor(e, t, i) {
    if (e.editor) {
      const n = t;
      switch (i.event) {
        case "playSheet":
          n.sheet(i.data.sheet, i.data.instance)?.sequence.play(i.data.value);
          break;
        case "pauseSheet":
          n.sheet(i.data.sheet, i.data.instance)?.sequence.pause();
          break;
      }
    }
  }
  handleEditorApp(e, t) {
    if (e.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((r) => {
        r.length < 1 || r.forEach((o) => {
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
      let i = -1;
      const n = () => {
        if (t.activeSheet !== void 0 && i !== t.activeSheet.sequence.position) {
          i = t.activeSheet.sequence.position;
          const r = t.activeSheet;
          e.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: i,
              sheet: r.address.sheetId
            }
          });
        }
      }, a = () => {
        n(), requestAnimationFrame(a);
      };
      n(), a();
    } else
      this.studio?.ui.hide();
  }
}
function _r(s) {
  if (s.name === "cameras")
    return "camera";
  if (s.name === "interactive")
    return "interactive";
  if (s.name === "lights")
    return "light";
  if (s.name === "ui")
    return "ui";
  if (s.name === "utils")
    return "utils";
  const e = s.type;
  return e.search("Helper") > -1 ? "icon_utils" : e.search("Camera") > -1 ? "camera" : e.search("Light") > -1 ? "light" : "obj3D";
}
function st(s) {
  const e = {
    name: s.name,
    type: s.type,
    uuid: s.uuid,
    children: []
  };
  return s.children.forEach((t) => {
    e.children.push(st(t));
  }), e;
}
function gr(s) {
  const e = {};
  for (const t in s) {
    const i = s[t].value;
    e[t] = { value: i }, i === null ? e[t].value = {
      src: "",
      offset: [0, 0],
      repeat: [1, 1]
    } : i !== void 0 && i.isTexture && (e[t].value = {
      src: i.image.src,
      offset: [i.offset.x, i.offset.y],
      repeat: [i.repeat.x, i.repeat.y]
    });
  }
  return e;
}
function vr(s) {
  switch (s) {
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
function Qe(s) {
  const e = {};
  for (const t in s) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || vr(t))
      continue;
    const i = typeof s[t], n = s[t];
    switch (i) {
      case "boolean":
      case "number":
      case "string":
        e[t] = n;
        break;
      case "object":
        n !== null ? (e[t] = n, n.isTexture ? e[t] = {
          src: Zt.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = gr(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return s.anisotropy !== void 0 && (e.anisotropy = s.anisotropy), s.clearcoat !== void 0 && (e.clearcoat = s.clearcoat), s.iridescence !== void 0 && (e.iridescence = s.iridescence), s.dispersion !== void 0 && (e.dispersion = s.dispersion), s.sheen !== void 0 && (e.sheen = s.sheen), s.transmission !== void 0 && (e.transmission = s.transmission), s.transmission !== void 0 && (e.transmission = s.transmission), e;
}
function hi(s) {
  s.updateMatrix();
  const e = {
    name: s.name,
    type: s.type,
    uuid: s.uuid,
    visible: s.visible,
    matrix: s.matrix.elements,
    animations: [],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0,
    children: []
  };
  s.animations.forEach((i) => {
    e.animations.push({
      name: i.name,
      duration: i.duration,
      blendMode: i.blendMode
    });
  });
  const t = s.type.toLowerCase();
  if (t.search("mesh") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((a) => {
        n.push(Qe(a));
      }), e.material = n;
    } else
      e.material = Qe(i.material);
  } else if (t.search("points") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((a) => {
        n.push(Qe(a));
      }), e.material = n;
    } else
      e.material = Qe(i.material);
  } else if (t.search("line") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((a) => {
        n.push(Qe(a));
      }), e.material = n;
    } else
      e.material = Qe(i.material);
  } else
    t.search("camera") > -1 ? s.type === "PerspectiveCamera" ? e.perspectiveCameraInfo = {
      fov: s.fov,
      zoom: s.zoom,
      near: s.near,
      far: s.far,
      focus: s.focus,
      aspect: s.aspect,
      filmGauge: s.filmGauge,
      filmOffset: s.filmOffset
    } : s.type === "OrthographicCamera" && (e.orthographicCameraInfo = {
      zoom: s.zoom,
      near: s.near,
      far: s.far,
      left: s.left,
      right: s.right,
      top: s.top,
      bottom: s.bottom
    }) : t.search("light") > -1 && (e.lightInfo = {
      color: s.color,
      intensity: s.intensity,
      decay: s.decay,
      distance: s.distance,
      angle: s.angle,
      penumbra: s.penumbra,
      groundColor: s.groundColor,
      width: s.width,
      height: s.height
    });
  return e;
}
function yr(s, e) {
  const t = e.split(".");
  switch (t.length) {
    case 1:
      return s[t[0]];
    case 2:
      return s[t[0]][t[1]];
    case 3:
      return s[t[0]][t[1]][t[2]];
    case 4:
      return s[t[0]][t[1]][t[2]][t[3]];
    case 5:
      return s[t[0]][t[1]][t[2]][t[3]][t[4]];
    case 6:
      return s[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]];
  }
}
function br(s, e) {
  for (const t in e)
    s[t] = e[t];
}
function K(s, e, t) {
  if (s === void 0)
    return;
  const i = e.split("."), n = i.length;
  if (typeof t != "object")
    switch (n) {
      case 1:
        s[i[0]] = t;
        break;
      case 2:
        s[i[0]][i[1]] = t;
        break;
      case 3:
        s[i[0]][i[1]][i[2]] = t;
        break;
      case 4:
        s[i[0]][i[1]][i[2]][i[3]] = t;
        break;
      case 5:
        s[i[0]][i[1]][i[2]][i[3]][i[4]] = t;
        break;
    }
  else {
    let r;
    switch (n) {
      case 1:
        r = s[i[0]];
        break;
      case 2:
        r = s[i[0]][i[1]];
        break;
      case 3:
        r = s[i[0]][i[1]][i[2]];
        break;
      case 4:
        r = s[i[0]][i[1]][i[2]][i[3]];
        break;
      case 5:
        r = s[i[0]][i[1]][i[2]][i[3]][i[4]];
        break;
    }
    r != null && br(r, t);
  }
}
function en(s) {
  return new Promise((e, t) => {
    const i = new Image();
    i.onload = () => {
      const n = new An(i);
      n.wrapS = Xi, n.wrapT = Xi, n.needsUpdate = !0, e(n);
    }, i.onerror = t, i.src = s;
  });
}
class Va extends Ri {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((e) => {
      We(e);
    }), this.scenes.clear(), this.scene && We(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(e) {
    this.app.debugEnabled && (this.renderer !== void 0 && (Zt.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (Zt.renderer = this.renderer);
    const t = hi(e);
    this.app.send({
      event: "setObject",
      target: "editor",
      data: t
    });
  }
  requestMethod(e, t, i, n) {
    this.app.send({
      event: "requestMethod",
      target: "app",
      data: {
        uuid: e,
        key: t,
        value: i,
        subitem: n
      }
    });
  }
  updateObject(e, t, i) {
    this.app.send({
      event: "updateObject",
      target: "app",
      data: {
        uuid: e,
        key: t,
        value: i
      }
    });
  }
  createTexture(e, t, i) {
    this.app.send({
      event: "createTexture",
      target: "app",
      data: {
        uuid: e,
        key: t,
        value: i
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
  updateGroup(e, t, i) {
    this.app.send({
      event: "updateGroup",
      target: "app",
      data: JSON.stringify({ group: e, prop: t, value: i })
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
    Ji(), Oi(e);
    const t = st(e);
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
      const i = st(t);
      this.app.send({
        event: "refreshScene",
        target: "app",
        data: i
      });
    }
  }
  removeScene(e) {
    if (e === void 0 || (this.scenes.delete(e.name), !this.app.debugEnabled))
      return;
    const t = st(e);
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
    return this.scenes.forEach((i, n) => {
      e.search(n) > -1 && (t = i);
    }), t;
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.app.debugEnabled))
      return;
    this.renderer !== void 0 && (Zt.renderer = this.renderer), Ji(), Oi(e);
    const t = st(e);
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
    const t = hi(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = hi(e);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: t
    });
  }
  handleApp(e, t, i) {
    const n = t;
    switch (i.event) {
      case "getObject":
        R.dispatchEvent({ type: D.GET_OBJECT, value: i.data });
        break;
      case "updateObject":
        R.dispatchEvent({ type: D.UPDATE_OBJECT, value: i.data });
        break;
      case "createTexture":
        R.dispatchEvent({ type: D.CREATE_TEXTURE, value: i.data });
        break;
      case "requestMethod":
        R.dispatchEvent({ type: D.REQUEST_METHOD, value: i.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: st(n.scenes.get(i.data.name))
        });
        break;
    }
    if (i.event === "updateGroup") {
      const a = JSON.parse(i.data);
      n.groups.get(a.group)?.onUpdate(a.prop, a.value);
    }
  }
  handleEditor(e, t, i) {
    switch (i.event) {
      case "setObject":
        R.dispatchEvent({ type: D.SET_OBJECT, value: i.data });
        break;
      case "addScene":
        R.dispatchEvent({ type: D.ADD_SCENE, value: i.data });
        break;
      case "refreshScene":
        R.dispatchEvent({ type: D.REFRESH_SCENE, value: i.data });
        break;
      case "removeScene":
        R.dispatchEvent({ type: D.REMOVE_SCENE, value: i.data });
        break;
      case "setScene":
        R.dispatchEvent({ type: D.SET_SCENE, value: i.data });
        break;
      case "addCamera":
        R.dispatchEvent({ type: D.ADD_CAMERA, value: i.data });
        break;
      case "removeCamera":
        R.dispatchEvent({ type: D.REMOVE_CAMERA, value: i.data });
        break;
      case "addGroup":
        R.dispatchEvent({ type: D.ADD_GROUP, value: i.data });
        break;
      case "removeGroup":
        R.dispatchEvent({ type: D.REMOVE_GROUP, value: i.data });
        break;
    }
  }
  // Renderer
  addRT(e, t) {
    const i = new In(32, 32, t);
    i.texture.name = e, this.renderTargets.set(e, i);
  }
  resize(e, t) {
    const i = this.dpr;
    this.renderTargets.forEach((n) => {
      n.setSize(e * i, t * i);
    }), this.renderer?.setSize(e, t);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(He(1, 2, e));
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
var Ti = { exports: {} }, ut = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var es;
function Er() {
  if (es)
    return ut;
  es = 1;
  var s = Qs, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, n = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(o, h, c) {
    var u, m = {}, _ = null, g = null;
    c !== void 0 && (_ = "" + c), h.key !== void 0 && (_ = "" + h.key), h.ref !== void 0 && (g = h.ref);
    for (u in h)
      i.call(h, u) && !a.hasOwnProperty(u) && (m[u] = h[u]);
    if (o && o.defaultProps)
      for (u in h = o.defaultProps, h)
        m[u] === void 0 && (m[u] = h[u]);
    return { $$typeof: e, type: o, key: _, ref: g, props: m, _owner: n.current };
  }
  return ut.Fragment = t, ut.jsx = r, ut.jsxs = r, ut;
}
var pt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ts;
function Cr() {
  return ts || (ts = 1, process.env.NODE_ENV !== "production" && function() {
    var s = Qs, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), r = Symbol.for("react.provider"), o = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), S = Symbol.iterator, M = "@@iterator";
    function T(l) {
      if (l === null || typeof l != "object")
        return null;
      var y = S && l[S] || l[M];
      return typeof y == "function" ? y : null;
    }
    var f = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(l) {
      {
        for (var y = arguments.length, C = new Array(y > 1 ? y - 1 : 0), I = 1; I < y; I++)
          C[I - 1] = arguments[I];
        E("error", l, C);
      }
    }
    function E(l, y, C) {
      {
        var I = f.ReactDebugCurrentFrame, F = I.getStackAddendum();
        F !== "" && (y += "%s", C = C.concat([F]));
        var Y = C.map(function(U) {
          return String(U);
        });
        Y.unshift("Warning: " + y), Function.prototype.apply.call(console[l], console, Y);
      }
    }
    var b = !1, P = !1, x = !1, j = !1, X = !1, _e;
    _e = Symbol.for("react.module.reference");
    function Pe(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === i || l === a || X || l === n || l === c || l === u || j || l === g || b || P || x || typeof l == "object" && l !== null && (l.$$typeof === _ || l.$$typeof === m || l.$$typeof === r || l.$$typeof === o || l.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === _e || l.getModuleId !== void 0));
    }
    function ct(l, y, C) {
      var I = l.displayName;
      if (I)
        return I;
      var F = y.displayName || y.name || "";
      return F !== "" ? C + "(" + F + ")" : C;
    }
    function Ve(l) {
      return l.displayName || "Context";
    }
    function me(l) {
      if (l == null)
        return null;
      if (typeof l.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof l == "function")
        return l.displayName || l.name || null;
      if (typeof l == "string")
        return l;
      switch (l) {
        case i:
          return "Fragment";
        case t:
          return "Portal";
        case a:
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
            var y = l;
            return Ve(y) + ".Consumer";
          case r:
            var C = l;
            return Ve(C._context) + ".Provider";
          case h:
            return ct(l, l.render, "ForwardRef");
          case m:
            var I = l.displayName || null;
            return I !== null ? I : me(l.type) || "Memo";
          case _: {
            var F = l, Y = F._payload, U = F._init;
            try {
              return me(U(Y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var te = Object.assign, $ = 0, Ie, le, Oe, se, Le, ke, Ue;
    function Mt() {
    }
    Mt.__reactDisabledLog = !0;
    function Pt() {
      {
        if ($ === 0) {
          Ie = console.log, le = console.info, Oe = console.warn, se = console.error, Le = console.group, ke = console.groupCollapsed, Ue = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: Mt,
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
    function ln() {
      {
        if ($--, $ === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: te({}, l, {
              value: Ie
            }),
            info: te({}, l, {
              value: le
            }),
            warn: te({}, l, {
              value: Oe
            }),
            error: te({}, l, {
              value: se
            }),
            group: te({}, l, {
              value: Le
            }),
            groupCollapsed: te({}, l, {
              value: ke
            }),
            groupEnd: te({}, l, {
              value: Ue
            })
          });
        }
        $ < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ti = f.ReactCurrentDispatcher, ii;
    function Dt(l, y, C) {
      {
        if (ii === void 0)
          try {
            throw Error();
          } catch (F) {
            var I = F.stack.trim().match(/\n( *(at )?)/);
            ii = I && I[1] || "";
          }
        return `
` + ii + l;
      }
    }
    var si = !1, Rt;
    {
      var cn = typeof WeakMap == "function" ? WeakMap : Map;
      Rt = new cn();
    }
    function Ii(l, y) {
      if (!l || si)
        return "";
      {
        var C = Rt.get(l);
        if (C !== void 0)
          return C;
      }
      var I;
      si = !0;
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Y;
      Y = ti.current, ti.current = null, Pt();
      try {
        if (y) {
          var U = function() {
            throw Error();
          };
          if (Object.defineProperty(U.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(U, []);
            } catch (Te) {
              I = Te;
            }
            Reflect.construct(l, [], U);
          } else {
            try {
              U.call();
            } catch (Te) {
              I = Te;
            }
            l.call(U.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Te) {
            I = Te;
          }
          l();
        }
      } catch (Te) {
        if (Te && I && typeof Te.stack == "string") {
          for (var k = Te.stack.split(`
`), oe = I.stack.split(`
`), Q = k.length - 1, J = oe.length - 1; Q >= 1 && J >= 0 && k[Q] !== oe[J]; )
            J--;
          for (; Q >= 1 && J >= 0; Q--, J--)
            if (k[Q] !== oe[J]) {
              if (Q !== 1 || J !== 1)
                do
                  if (Q--, J--, J < 0 || k[Q] !== oe[J]) {
                    var ge = `
` + k[Q].replace(" at new ", " at ");
                    return l.displayName && ge.includes("<anonymous>") && (ge = ge.replace("<anonymous>", l.displayName)), typeof l == "function" && Rt.set(l, ge), ge;
                  }
                while (Q >= 1 && J >= 0);
              break;
            }
        }
      } finally {
        si = !1, ti.current = Y, ln(), Error.prepareStackTrace = F;
      }
      var $e = l ? l.displayName || l.name : "", Wi = $e ? Dt($e) : "";
      return typeof l == "function" && Rt.set(l, Wi), Wi;
    }
    function hn(l, y, C) {
      return Ii(l, !1);
    }
    function dn(l) {
      var y = l.prototype;
      return !!(y && y.isReactComponent);
    }
    function At(l, y, C) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return Ii(l, dn(l));
      if (typeof l == "string")
        return Dt(l);
      switch (l) {
        case c:
          return Dt("Suspense");
        case u:
          return Dt("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case h:
            return hn(l.render);
          case m:
            return At(l.type, y, C);
          case _: {
            var I = l, F = I._payload, Y = I._init;
            try {
              return At(Y(F), y, C);
            } catch {
            }
          }
        }
      return "";
    }
    var It = Object.prototype.hasOwnProperty, Li = {}, ki = f.ReactDebugCurrentFrame;
    function Lt(l) {
      if (l) {
        var y = l._owner, C = At(l.type, l._source, y ? y.type : null);
        ki.setExtraStackFrame(C);
      } else
        ki.setExtraStackFrame(null);
    }
    function un(l, y, C, I, F) {
      {
        var Y = Function.call.bind(It);
        for (var U in l)
          if (Y(l, U)) {
            var k = void 0;
            try {
              if (typeof l[U] != "function") {
                var oe = Error((I || "React class") + ": " + C + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw oe.name = "Invariant Violation", oe;
              }
              k = l[U](y, U, I, C, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              k = Q;
            }
            k && !(k instanceof Error) && (Lt(F), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", I || "React class", C, U, typeof k), Lt(null)), k instanceof Error && !(k.message in Li) && (Li[k.message] = !0, Lt(F), v("Failed %s type: %s", C, k.message), Lt(null));
          }
      }
    }
    var pn = Array.isArray;
    function ni(l) {
      return pn(l);
    }
    function mn(l) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, C = y && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return C;
      }
    }
    function fn(l) {
      try {
        return Ui(l), !1;
      } catch {
        return !0;
      }
    }
    function Ui(l) {
      return "" + l;
    }
    function ji(l) {
      if (fn(l))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", mn(l)), Ui(l);
    }
    var ht = f.ReactCurrentOwner, _n = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ni, Fi, ri;
    ri = {};
    function gn(l) {
      if (It.call(l, "ref")) {
        var y = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function vn(l) {
      if (It.call(l, "key")) {
        var y = Object.getOwnPropertyDescriptor(l, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function yn(l, y) {
      if (typeof l.ref == "string" && ht.current && y && ht.current.stateNode !== y) {
        var C = me(ht.current.type);
        ri[C] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', me(ht.current.type), l.ref), ri[C] = !0);
      }
    }
    function bn(l, y) {
      {
        var C = function() {
          Ni || (Ni = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        C.isReactWarning = !0, Object.defineProperty(l, "key", {
          get: C,
          configurable: !0
        });
      }
    }
    function En(l, y) {
      {
        var C = function() {
          Fi || (Fi = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        C.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: C,
          configurable: !0
        });
      }
    }
    var Cn = function(l, y, C, I, F, Y, U) {
      var k = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: l,
        key: y,
        ref: C,
        props: U,
        // Record the component responsible for creating this element.
        _owner: Y
      };
      return k._store = {}, Object.defineProperty(k._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(k, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: I
      }), Object.defineProperty(k, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: F
      }), Object.freeze && (Object.freeze(k.props), Object.freeze(k)), k;
    };
    function wn(l, y, C, I, F) {
      {
        var Y, U = {}, k = null, oe = null;
        C !== void 0 && (ji(C), k = "" + C), vn(y) && (ji(y.key), k = "" + y.key), gn(y) && (oe = y.ref, yn(y, F));
        for (Y in y)
          It.call(y, Y) && !_n.hasOwnProperty(Y) && (U[Y] = y[Y]);
        if (l && l.defaultProps) {
          var Q = l.defaultProps;
          for (Y in Q)
            U[Y] === void 0 && (U[Y] = Q[Y]);
        }
        if (k || oe) {
          var J = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          k && bn(U, J), oe && En(U, J);
        }
        return Cn(l, k, oe, F, I, ht.current, U);
      }
    }
    var ai = f.ReactCurrentOwner, zi = f.ReactDebugCurrentFrame;
    function Xe(l) {
      if (l) {
        var y = l._owner, C = At(l.type, l._source, y ? y.type : null);
        zi.setExtraStackFrame(C);
      } else
        zi.setExtraStackFrame(null);
    }
    var oi;
    oi = !1;
    function li(l) {
      return typeof l == "object" && l !== null && l.$$typeof === e;
    }
    function Hi() {
      {
        if (ai.current) {
          var l = me(ai.current.type);
          if (l)
            return `

Check the render method of \`` + l + "`.";
        }
        return "";
      }
    }
    function Sn(l) {
      {
        if (l !== void 0) {
          var y = l.fileName.replace(/^.*[\\\/]/, ""), C = l.lineNumber;
          return `

Check your code at ` + y + ":" + C + ".";
        }
        return "";
      }
    }
    var Yi = {};
    function xn(l) {
      {
        var y = Hi();
        if (!y) {
          var C = typeof l == "string" ? l : l.displayName || l.name;
          C && (y = `

Check the top-level render call using <` + C + ">.");
        }
        return y;
      }
    }
    function Bi(l, y) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var C = xn(y);
        if (Yi[C])
          return;
        Yi[C] = !0;
        var I = "";
        l && l._owner && l._owner !== ai.current && (I = " It was passed a child from " + me(l._owner.type) + "."), Xe(l), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', C, I), Xe(null);
      }
    }
    function Zi(l, y) {
      {
        if (typeof l != "object")
          return;
        if (ni(l))
          for (var C = 0; C < l.length; C++) {
            var I = l[C];
            li(I) && Bi(I, y);
          }
        else if (li(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var F = T(l);
          if (typeof F == "function" && F !== l.entries)
            for (var Y = F.call(l), U; !(U = Y.next()).done; )
              li(U.value) && Bi(U.value, y);
        }
      }
    }
    function On(l) {
      {
        var y = l.type;
        if (y == null || typeof y == "string")
          return;
        var C;
        if (typeof y == "function")
          C = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === m))
          C = y.propTypes;
        else
          return;
        if (C) {
          var I = me(y);
          un(C, l.props, "prop", I, l);
        } else if (y.PropTypes !== void 0 && !oi) {
          oi = !0;
          var F = me(y);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Tn(l) {
      {
        for (var y = Object.keys(l.props), C = 0; C < y.length; C++) {
          var I = y[C];
          if (I !== "children" && I !== "key") {
            Xe(l), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", I), Xe(null);
            break;
          }
        }
        l.ref !== null && (Xe(l), v("Invalid attribute `ref` supplied to `React.Fragment`."), Xe(null));
      }
    }
    function Gi(l, y, C, I, F, Y) {
      {
        var U = Pe(l);
        if (!U) {
          var k = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && (k += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var oe = Sn(F);
          oe ? k += oe : k += Hi();
          var Q;
          l === null ? Q = "null" : ni(l) ? Q = "array" : l !== void 0 && l.$$typeof === e ? (Q = "<" + (me(l.type) || "Unknown") + " />", k = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof l, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, k);
        }
        var J = wn(l, y, C, F, Y);
        if (J == null)
          return J;
        if (U) {
          var ge = y.children;
          if (ge !== void 0)
            if (I)
              if (ni(ge)) {
                for (var $e = 0; $e < ge.length; $e++)
                  Zi(ge[$e], l);
                Object.freeze && Object.freeze(ge);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Zi(ge, l);
        }
        return l === i ? Tn(J) : On(J), J;
      }
    }
    function Mn(l, y, C) {
      return Gi(l, y, C, !0);
    }
    function Pn(l, y, C) {
      return Gi(l, y, C, !1);
    }
    var Dn = Pn, Rn = Mn;
    pt.Fragment = i, pt.jsx = Dn, pt.jsxs = Rn;
  }()), pt;
}
process.env.NODE_ENV === "production" ? Ti.exports = Er() : Ti.exports = Cr();
var d = Ti.exports;
function tn(s) {
  return s.title.search("<") > -1 ? /* @__PURE__ */ d.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: s.title } }) : /* @__PURE__ */ d.jsx("button", { children: s.title });
}
const wr = /* @__PURE__ */ d.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ d.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Sr = /* @__PURE__ */ d.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ d.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function xr(s) {
  return /* @__PURE__ */ d.jsx(qs.Item, { value: s.title, children: /* @__PURE__ */ d.jsxs("div", { children: [
    Sr,
    /* @__PURE__ */ d.jsx("span", { children: s.title }),
    /* @__PURE__ */ d.jsx("button", { className: "closeIcon", onClick: () => {
      s.onDelete(s.index);
    }, children: wr })
  ] }) }, s.title);
}
function Or(s) {
  const [e, t] = G(!1), [i, n] = G(s.options), a = (c) => {
    s.onDragComplete(c), n(c);
  }, r = (c) => {
    const u = [...i];
    u.splice(c, 1), a(u);
  }, o = [];
  i.forEach((c, u) => {
    o.push(/* @__PURE__ */ d.jsx(xr, { index: u, title: c, onDelete: r }, c));
  });
  let h = "dropdown draggable";
  return s.subdropdown && (h += " subdropdown"), /* @__PURE__ */ d.jsxs("div", { className: h, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ d.jsx(tn, { title: s.title }),
    /* @__PURE__ */ d.jsx(qs.Group, { axis: "y", values: i, onReorder: a, style: { visibility: e ? "visible" : "hidden" }, children: o })
  ] });
}
function Tr(s) {
  const [e, t] = G(!1), i = [];
  s.options.map((a, r) => {
    s.onSelect !== void 0 && (a.onSelect = s.onSelect), i.push(/* @__PURE__ */ d.jsx(Mr, { option: a }, r));
  });
  let n = "dropdown";
  return s.subdropdown && (n += " subdropdown"), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ d.jsx(tn, { title: s.title }),
        /* @__PURE__ */ d.jsx(
          "ul",
          {
            style: { visibility: e ? "visible" : "hidden" },
            children: i
          }
        )
      ]
    }
  );
}
function Mr(s) {
  const { option: e } = s, [t, i] = G("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ d.jsx(
        Or,
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
      n = /* @__PURE__ */ d.jsx(
        Tr,
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
            e.onSelect !== void 0 && e.onSelect(e.value), e.selectable && (t !== e.title ? i(e.title) : i(""));
          },
          children: e.title
        }
      );
      break;
  }
  return /* @__PURE__ */ d.jsx("li", { className: t === e.title ? "selected" : "", children: n }, pr());
}
function Xa(s, e, t) {
  function i(a) {
    switch (e.forEach((r) => {
      r.callback(s, r.remote, a);
    }), a.event) {
      case "custom":
        R.dispatchEvent({ type: D.CUSTOM, value: a.data });
        break;
    }
  }
  function n(a) {
    switch (t.forEach((r) => {
      r.callback(s, r.remote, a);
    }), a.event) {
      case "custom":
        R.dispatchEvent({ type: D.CUSTOM, value: a.data });
        break;
    }
  }
  s.listen = (a) => {
    a.target === "editor" ? n(a) : i(a);
  };
}
function $t(s) {
  const [e, t] = G(s.open !== void 0 ? s.open : !0), i = !e || s.children === void 0, n = () => {
    R.dispatchEvent({ type: D.REMOVE_SCENE, value: s.scene });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `accordion ${i ? "hide" : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !e;
          s.onToggle !== void 0 && s.onToggle(a), t(a);
        },
        children: [
          /* @__PURE__ */ d.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "label", children: Xt(s.label) })
        ]
      }
    ),
    s.onRefresh ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("button", { className: "refresh", onClick: s.onRefresh }),
      /* @__PURE__ */ d.jsx("button", { className: "remove", onClick: n })
    ] }) : null,
    s.button,
    /* @__PURE__ */ d.jsx("div", { className: e ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { children: s.children }) }, Math.random())
  ] });
}
function sn(s) {
  const e = ee(null), [t, i] = G(!1), n = s.child !== void 0 && s.child.children.length > 0, a = [];
  return s.child !== void 0 && s.child.children.length > 0 && s.child.children.map((r, o) => {
    a.push(/* @__PURE__ */ d.jsx(sn, { child: r, three: s.three }, o));
  }), lt(() => {
    if (s.child) {
      const r = s.three.getScene(s.child.uuid);
      if (r !== null) {
        const o = r.getObjectByProperty("uuid", s.child.uuid);
        o !== void 0 && (e.current.style.opacity = o.visible ? "1" : "0.25");
      }
    }
  }, [t]), /* @__PURE__ */ d.jsx(d.Fragment, { children: s.child !== void 0 && /* @__PURE__ */ d.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "child", children: [
      n ? /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: t ? "-14px" : "2px"
          },
          onClick: () => {
            i(!t);
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
            s.child !== void 0 && (s.three.getObject(s.child.uuid), t || i(!0));
          },
          children: s.child.name.length > 0 ? `${s.child.name} (${s.child.type})` : `${s.child.type}::${s.child.uuid}`
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "visibility",
          ref: e,
          onClick: () => {
            if (s.child) {
              const r = s.three.getScene(s.child.uuid);
              if (r !== null) {
                const o = r.getObjectByProperty("uuid", s.child.uuid);
                if (o !== void 0) {
                  const h = "visible", c = !o.visible;
                  e.current.style.opacity = c ? "1" : "0.25", s.three.updateObject(s.child.uuid, h, c), K(o, h, c);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: `icon ${_r(s.child)}` })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { className: "container", children: a }) })
  ] }, Math.random()) });
}
function is(s) {
  const e = [];
  return s.child?.children.map((t, i) => {
    e.push(/* @__PURE__ */ d.jsx(sn, { child: t, scene: s.scene, three: s.three }, i));
  }), /* @__PURE__ */ d.jsx("div", { className: `scene ${s.class !== void 0 ? s.class : ""}`, children: e });
}
function Pr(s) {
  const [e, t] = G(s.defaultValue);
  return lt(() => {
    let i = !1, n = -1, a = 0, r = s.defaultValue;
    const o = (_) => {
      i = !0, a = Number(s.input.current?.value), n = _.clientX, document.addEventListener("mouseup", c, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", c, !1);
    }, h = (_) => {
      if (!i)
        return;
      const g = s.step !== void 0 ? s.step : 1, S = (_.clientX - n) * g;
      r = Number((a + S).toFixed(4)), s.min !== void 0 && (r = Math.max(r, s.min)), s.max !== void 0 && (r = Math.min(r, s.max)), s.onChange !== void 0 && s.onChange(r), t(r);
    }, c = () => {
      i = !1, document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    }, u = (_) => {
      const g = Number(_.target.value);
      t(g);
    }, m = (_) => {
      const g = Number(_.target.value);
      s.onChange !== void 0 && s.onChange(g), t(g);
    };
    return s.input.current?.addEventListener("input", u), s.label.current?.addEventListener("mousedown", o, !1), s.sliderRef !== void 0 && s.sliderRef.current?.addEventListener("input", m), () => {
      s.input.current?.removeEventListener("input", u), s.label.current?.removeEventListener("mousedown", o), s.sliderRef !== void 0 && s.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", c), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", c);
    };
  }, []), e;
}
function Ze(s) {
  const e = ee(null), t = ee(null), i = Pr({
    label: s.labelRef,
    input: e,
    sliderRef: t,
    defaultValue: s.value,
    min: s.min,
    max: s.max,
    step: s.step,
    onChange: (n) => {
      s.onChange !== void 0 && s.onChange(s.prop, n);
    }
  });
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    s.type === "number" && /* @__PURE__ */ d.jsx(
      "input",
      {
        alt: s.alt,
        className: s.className,
        ref: e,
        type: "number",
        value: i,
        min: s.min,
        max: s.max,
        step: s.step,
        disabled: s.disabled,
        onChange: (n) => {
          const a = Number(n.target.value);
          s.onChange !== void 0 && s.onChange(s.prop, a);
        }
      }
    ),
    s.type === "range" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "text",
          value: i.toString(),
          disabled: s.disabled,
          ref: e,
          className: "min",
          onChange: (n) => {
            const a = Number(n.target.value);
            s.onChange !== void 0 && s.onChange(s.prop, a);
          }
        }
      ),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          disabled: s.disabled,
          type: "range",
          value: i,
          min: s.min,
          max: s.max,
          step: s.step,
          ref: t,
          onChange: Ks
        }
      )
    ] })
  ] });
}
function Dr(s) {
  const e = ee(null), t = ee(null), i = ee(null), n = ee(null), a = ee(null), r = ee(null), [o, h] = G(s.value), [c, u] = G({
    min: Math.min(s.min, Math.min(s.value.x, s.value.y)),
    max: Math.max(s.max, Math.max(s.value.x, s.value.y))
  }), [m, _] = G(!1);
  function g() {
    m || (window.addEventListener("mousemove", M), window.addEventListener("mouseup", S), window.addEventListener("mouseup", S), _(!0));
  }
  function S() {
    window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", S), _(!1);
  }
  function M(b) {
    const P = a.current.getBoundingClientRect(), x = He(0, 99, b.clientX - P.left) / 99, j = He(0, 99, b.clientY - P.top) / 99, X = Ot(Si(c.min, c.max, x), 3), _e = Ot(Si(c.min, c.max, j), 3);
    s.onChange({ target: { value: { x: X, y: _e } } }), h({ x: X, y: _e });
  }
  function T(b) {
    let P = o.x, x = o.y;
    b.target === e.current ? P = Number(b.target.value) : x = Number(b.target.value), h({ x: P, y: x });
  }
  function f() {
    const b = Number(i.current.value);
    u({ min: b, max: c.max }), (o.x < b || o.y < b) && h({ x: He(b, c.max, o.x), y: He(b, c.max, o.y) });
  }
  function v() {
    const b = Number(n.current.value);
    u({ min: c.min, max: b }), (o.x > b || o.y > b) && h({ x: He(c.min, b, o.x), y: He(c.min, b, o.y) });
  }
  lt(() => {
    const b = qi(c.min, c.max, o.x), P = qi(c.min, c.max, o.y);
    r.current.style.left = `${b * 100}%`, r.current.style.top = `${P * 100}%`;
  }, [c, o]);
  const E = s.step !== void 0 ? s.step : 0.01;
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
            step: E,
            onChange: T
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
            step: E,
            onChange: T
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: c.min,
            step: E,
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
            step: E,
            onChange: v
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "input", ref: a, onMouseDown: g, onMouseUp: S, children: [
      /* @__PURE__ */ d.jsx("div", { className: "x" }),
      /* @__PURE__ */ d.jsx("div", { className: "y" }),
      /* @__PURE__ */ d.jsx("div", { className: "pt", ref: r })
    ] })
  ] });
}
function ss(s) {
  const e = s.value.x !== void 0 && s.value.y !== void 0 && s.value.z !== void 0, t = s.value.isEuler !== void 0, i = s.value.elements !== void 0, n = s.step !== void 0 ? s.step : 0.01, a = [];
  if (e) {
    const r = xt(() => s.value, []), o = (c, u) => {
      r[c] = u, s.onChange({ target: { value: r } });
    };
    ["x", "y", "z"].forEach((c) => {
      const u = ee(null);
      a.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: u, children: c.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: r[c],
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
    const r = xt(() => s.value, []), o = (c, u) => {
      r[c] = u, s.onChange({ target: { value: r } });
    };
    ["_x", "_y", "_z"].forEach((c) => {
      const u = ee(null);
      a.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: u, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: r[c],
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
  } else if (i) {
    const r = xt(() => s.value, []), o = (h, c) => {
      const u = Number(h);
      r.elements[u] = c, s.onChange({ target: { value: r } });
    };
    for (let h = 0; h < 9; h++) {
      const c = ee(null);
      a.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: c, children: h + 1 }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: r.elements[h],
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
  return /* @__PURE__ */ d.jsx("div", { className: "grid3", children: a }, Math.random().toString());
}
function Rr(s) {
  const e = s.value.x !== void 0, t = s.step !== void 0 ? s.step : 0.01, i = [];
  if (e) {
    const n = xt(() => s.value, []), a = (o, h) => {
      n[o] = h, s.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const h = ee(null);
      i.push(
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
              onChange: a
            }
          )
        ] }, o)
      );
    });
  } else {
    const n = xt(() => s.value, []), a = (r, o) => {
      const h = Number(r);
      n.elements[h] = o, s.onChange({ target: { value: n } });
    };
    for (let r = 0; r < 16; r++) {
      const o = ee(null);
      i.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: o, children: r + 1 }),
          /* @__PURE__ */ d.jsx(
            Ze,
            {
              value: n.elements[r],
              type: "number",
              prop: r.toString(),
              step: t,
              labelRef: o,
              onChange: a
            }
          )
        ] }, r.toString())
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid4", children: i });
}
function Ar(s) {
  return !(s === "defaultAttributeValues" || s === "forceSinglePass" || s === "linecap" || s === "linejoin" || s === "linewidth" || s === "normalMapType" || s === "precision" || s === "shadowSide" || s === "uniformsGroups" || s === "uniformsNeedUpdate" || s === "userData" || s === "version" || s === "wireframeLinecap" || s === "wireframeLinejoin" || s === "wireframeLinewidth" || s.slice(0, 4) === "clip" || s.slice(0, 7) === "polygon" || s.slice(0, 7) === "stencil" || s.slice(0, 2) === "is");
}
function Ir(s) {
  switch (s) {
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
  return s;
}
function Jt(s) {
  switch (s) {
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
  return s;
}
function nn(s) {
  const e = s.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function Lr() {
  const s = document.createElement("input");
  return s.type = "file", new Promise((e, t) => {
    s.addEventListener("change", function() {
      if (s.files === null)
        t();
      else {
        const i = s.files[0], n = new FileReader();
        n.onload = function(a) {
          e(a.target.result);
        }, n.readAsDataURL(i);
      }
    }), s.click();
  });
}
const kr = [
  {
    title: "Front",
    value: Ln
  },
  {
    title: "Back",
    value: Ds
  },
  {
    title: "Double",
    value: Pi
  }
], Ur = [
  {
    title: "No Blending",
    value: kn
  },
  {
    title: "Normal",
    value: Un
  },
  {
    title: "Additive",
    value: jn
  },
  {
    title: "Subtractive",
    value: Nn
  },
  {
    title: "Multiply",
    value: Fn
  },
  {
    title: "Custom",
    value: zn
  }
], jr = [
  {
    title: "Add",
    value: Hn
  },
  {
    title: "Subtract",
    value: Yn
  },
  {
    title: "Reverse Subtract",
    value: Bn
  },
  {
    title: "Min",
    value: Zn
  },
  {
    title: "Max",
    value: Gn
  }
], Nr = [
  {
    title: "Zero",
    value: Rs
  },
  {
    title: "One",
    value: As
  },
  {
    title: "Src Color",
    value: Is
  },
  {
    title: "One Minus Src Color",
    value: Ls
  },
  {
    title: "Src Alpha",
    value: ks
  },
  {
    title: "One Minus Src Alpha",
    value: Us
  },
  {
    title: "Dst Alpha",
    value: js
  },
  {
    title: "One Minus Dst Alpha",
    value: Ns
  },
  {
    title: "Dst Color",
    value: Fs
  },
  {
    title: "One Minus Dst Color",
    value: zs
  },
  {
    title: "Src Alpha Saturate",
    value: Wn
  },
  {
    title: "Constant Color",
    value: Hs
  },
  {
    title: "One Minus Constant Color",
    value: Ys
  },
  {
    title: "Constant Alpha",
    value: Bs
  },
  {
    title: "One Minus Constant Alpha",
    value: Zs
  }
], Fr = [
  {
    title: "Zero",
    value: Rs
  },
  {
    title: "One",
    value: As
  },
  {
    title: "Src Color",
    value: Is
  },
  {
    title: "One Minus Src Color",
    value: Ls
  },
  {
    title: "Src Alpha",
    value: ks
  },
  {
    title: "One Minus Src Alpha",
    value: Us
  },
  {
    title: "Dst Alpha",
    value: js
  },
  {
    title: "One Minus Dst Alpha",
    value: Ns
  },
  {
    title: "Dst Color",
    value: Fs
  },
  {
    title: "One Minus Dst Color",
    value: zs
  },
  {
    title: "Constant Color",
    value: Hs
  },
  {
    title: "One Minus Constant Color",
    value: Ys
  },
  {
    title: "Constant Alpha",
    value: Bs
  },
  {
    title: "One Minus Constant Alpha",
    value: Zs
  }
];
function mt(s, e) {
  s.needsUpdate = !0, s.type = "option", s.options = e;
}
function zr(s, e, t, i) {
  return {
    type: "boolean",
    title: Jt(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (n, a) => {
      i.updateObject(t.uuid, `material.${s}`, a), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const r = i.getScene(t.uuid);
      if (r !== null) {
        const o = r.getObjectByProperty("uuid", t.uuid);
        K(o, `material.${s}`, a);
      }
    }
  };
}
function Hr(s, e, t, i) {
  const n = {
    type: "number",
    title: Jt(s),
    prop: s,
    value: e,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (a, r) => {
      i.updateObject(t.uuid, `material.${s}`, r), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = i.getScene(t.uuid);
      if (o !== null) {
        const h = o.getObjectByProperty("uuid", t.uuid);
        K(h, `material.${s}`, r);
      }
    }
  };
  switch (s) {
    case "blending":
      mt(n, Ur);
      break;
    case "blendDst":
      mt(n, Fr);
      break;
    case "blendEquation":
      mt(n, jr);
      break;
    case "blendSrc":
      mt(n, Nr);
      break;
    case "side":
      mt(n, kr);
      break;
  }
  return nn(s) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function Yr(s, e, t, i) {
  const n = {
    type: "string",
    title: Jt(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (r, o) => {
      i.updateObject(t.uuid, `material.${s}`, o), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const h = i.getScene(t.uuid);
      if (h !== null) {
        const c = h.getObjectByProperty("uuid", t.uuid);
        K(c, `material.${s}`, o);
      }
    },
    onKeyDown: (r) => {
    }
  };
  return (s === "vertexShader" || s === "fragmentShader") && (n.disabled = !1, n.latest = n.value, n.onChange = (r, o) => {
    n.latest = o, i.updateObject(t.uuid, `material.${s}`, o);
    const h = i.getScene(t.uuid);
    if (h !== null) {
      const c = h.getObjectByProperty("uuid", t.uuid);
      K(c, `material.${s}`, o);
    }
  }, n.onKeyDown = (r) => {
    if (r.key === "Enter" && (r.altKey || r.metaKey)) {
      i.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = i.getScene(t.uuid);
      if (o !== null) {
        const h = o.getObjectByProperty("uuid", t.uuid);
        K(h, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Br(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z === void 0;
}
function Zr(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w === void 0;
}
function Gr(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w !== void 0;
}
function Mi(s) {
  s.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function Ct(s, e, t, i, n = "", a = !1) {
  const r = Jt(s).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${s}` : s, h = typeof e;
  if (h === "boolean" || h === "string")
    return {
      title: r,
      prop: o,
      type: h,
      value: e,
      disabled: a,
      onChange: (c, u) => {
        i.updateObject(t.uuid, `material.${o}`, u);
        const m = i.getScene(t.uuid);
        if (m !== null) {
          const _ = m.getObjectByProperty("uuid", t.uuid);
          K(_, `material.${o}`, u);
        }
      }
    };
  if (h === "number") {
    const c = {
      title: r,
      prop: o,
      type: "number",
      value: e,
      step: 0.01,
      disabled: a,
      onChange: (u, m) => {
        i.updateObject(t.uuid, `material.${o}`, m);
        const _ = i.getScene(t.uuid);
        if (_ !== null) {
          const g = _.getObjectByProperty("uuid", t.uuid);
          K(g, `material.${o}`, m);
        }
      }
    };
    return nn(r) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (e.isColor)
      return {
        title: r,
        prop: o,
        type: "color",
        value: e,
        disabled: a,
        onChange: (c, u) => {
          const m = new Tt(u);
          i.updateObject(t.uuid, `material.${o}`, m);
          const _ = i.getScene(t.uuid);
          if (_ !== null) {
            const g = _.getObjectByProperty("uuid", t.uuid);
            K(g, `material.${o}`, m);
          }
        }
      };
    if (Array.isArray(e)) {
      const c = [];
      for (const u in e) {
        const m = e[u], _ = `[${u.toString()}]`;
        if (m.value !== void 0) {
          const g = Ct(`${_}.value`, m.value, t, i, o, a);
          g !== void 0 && c.push(g);
        } else {
          const g = Ct(_, m, t, i, o, a);
          g !== void 0 && c.push(g);
        }
      }
      if (c.length > 0)
        return Mi(c), {
          title: r,
          items: c
        };
    } else {
      if (Br(e))
        return {
          title: r,
          prop: o,
          type: "vector2",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const m = i.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              K(_, `material.${o}`, u);
            }
          }
        };
      if (Zr(e))
        return {
          title: r,
          prop: o,
          type: "grid3",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const m = i.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              K(_, `material.${o}`, u);
            }
          }
        };
      if (Gr(e))
        return {
          title: r,
          prop: o,
          type: "grid4",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const m = i.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              K(_, `material.${o}`, u);
            }
          }
        };
      if (e.isEuler)
        return {
          title: r,
          prop: o,
          type: "euler",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const m = i.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              K(_, `material.${o}`, u);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: r,
          type: "image",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            const m = Ir(s), _ = n.length > 0 ? `${n}.${m}` : m;
            i.createTexture(t.uuid, `material.${_}`, u);
            const g = i.getScene(t.uuid);
            if (g !== null) {
              const S = g.getObjectByProperty("uuid", t.uuid);
              if (S !== void 0) {
                const M = (T) => {
                  const f = S.material, v = _.split(".");
                  switch (v.length) {
                    case 1:
                      f[v[0]] = T;
                      break;
                    case 2:
                      f[v[0]][v[1]] = T;
                      break;
                    case 3:
                      f[v[0]][v[1]][v[2]] = T;
                      break;
                    case 4:
                      f[v[0]][v[1]][v[2]][v[3]] = T;
                      break;
                    case 5:
                      f[v[0]][v[1]][v[2]][v[3]][v[4]] = T;
                      break;
                  }
                  f.needsUpdate = !0;
                };
                u.src.length > 0 ? en(u.src).then((T) => {
                  T.offset.set(u.offset[0], u.offset[1]), T.repeat.set(u.repeat[0], u.repeat[1]), M(T);
                }) : M(null);
              }
            }
          }
        };
      if (e.elements !== void 0)
        return {
          title: r,
          prop: o,
          type: e.elements.length > 9 ? "grid4" : "grid3",
          value: e,
          disabled: a,
          onChange: (c, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const m = i.getScene(t.uuid);
            if (m !== null) {
              const _ = m.getObjectByProperty("uuid", t.uuid);
              K(_, `material.${o}`, u);
            }
          }
        };
      {
        const c = [], u = s === "defines" || s === "extensions";
        try {
          for (const m in e) {
            const _ = e[m];
            if (_ !== void 0)
              if (_.value !== void 0) {
                const g = Ct(`${m}.value`, _.value, t, i, o, u);
                g !== void 0 && c.push(g);
              } else {
                const g = Ct(m, _, t, i, o, u);
                g !== void 0 && c.push(g);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", s, e);
        }
        if (c.length > 0)
          return Mi(c), {
            title: r,
            items: c
          };
      }
    }
  }
}
function ns(s, e, t) {
  const i = [];
  for (const n in s) {
    if (!Ar(n))
      continue;
    const a = typeof s[n], r = s[n];
    if (a === "boolean")
      i.push(zr(n, r, e, t));
    else if (a === "number")
      i.push(Hr(n, r, e, t));
    else if (a === "string")
      i.push(Yr(n, r, e, t));
    else if (a === "object") {
      const o = Ct(n, r, e, t);
      o !== void 0 && i.push(o);
    } else
      r !== void 0 && console.log("other:", n, a, r);
  }
  return Mi(i), i.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const a = n.getObjectByProperty("uuid", e.uuid);
        K(a, "material.needsUpdate", !0);
      }
    }
  }), i;
}
function Wr(s, e) {
  const t = s.material;
  if (Array.isArray(t)) {
    const i = [], n = t.length;
    for (let a = 0; a < n; a++)
      i.push(
        /* @__PURE__ */ d.jsx(
          be,
          {
            title: `Material ${a}`,
            items: ns(t[a], s, e)
          },
          `Material ${a}`
        )
      );
    return /* @__PURE__ */ d.jsx(d.Fragment, { children: i });
  } else
    return /* @__PURE__ */ d.jsx(
      be,
      {
        title: "Material",
        items: ns(t, s, e)
      }
    );
}
const rs = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Vr(s) {
  const e = s.step !== void 0 ? s.step : 0.01, t = ee(null), i = ee(null), n = ee(null), a = ee(null), r = ee(null), [o] = G(s.value), [h, c] = G(s.value.offset[0]), [u, m] = G(s.value.offset[1]), [_, g] = G(s.value.repeat[0]), [S, M] = G(s.value.repeat[1]);
  function T(v, E, b, P, x) {
    if (s.onChange !== void 0) {
      const j = s.prop !== void 0 ? s.prop : s.title;
      s.onChange(j, {
        src: v,
        offset: [E, b],
        repeat: [P, x]
      });
    }
  }
  function f(v) {
    const E = t.current.src, b = v.target.value;
    switch (v.target) {
      case i.current:
        c(b), T(E, b, u, _, S);
        break;
      case n.current:
        m(b), T(E, h, b, _, S);
        break;
      case a.current:
        g(b), T(E, h, u, b, S);
        break;
      case r.current:
        M(b), T(E, h, u, _, b);
        break;
    }
  }
  return /* @__PURE__ */ d.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ d.jsx("img", { alt: s.title, ref: t, onClick: () => {
      Lr().then((v) => {
        t.current.src = v, T(v, h, u, _, S);
      });
    }, src: o.src.length > 0 ? o.src : rs }),
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: i,
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
            ref: a,
            type: "number",
            value: _,
            step: e,
            onChange: f
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: r,
            type: "number",
            value: S,
            step: e,
            onChange: f
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("button", { onClick: () => {
        T("", h, u, _, S), t.current.src = rs;
      }, children: "Clear" })
    ] })
  ] });
}
function Gt(s) {
  let e = s.value;
  e !== void 0 && (e.isColor !== void 0 ? e = Ki(s.value) : s.type === "color" && (e = Ki(new Tt(s.value))));
  const [t, i] = G(e), n = ee(null), a = (c) => {
    let u = c.target.value;
    if (s.type === "boolean")
      u = c.target.checked;
    else if (s.type === "option" && (typeof s.value == "number" ? u = Number(u) : typeof s.value == "boolean" ? u = !!u : typeof s.value == "object" && (u = JSON.parse(u)), s.options !== void 0)) {
      const m = s.options.length;
      for (let _ = 0; _ < m && s.options[_].value !== u; _++)
        ;
    }
    i(u), s.onChange !== void 0 && s.onChange(s.prop !== void 0 ? s.prop : s.title, u);
  }, r = {};
  s.disabled && (r.opacity = 0.8);
  const o = s.type === "string" && (t.length > 100 || t.search(`
`) > -1), h = o || s.type === "image" || s.type === "vector2";
  return /* @__PURE__ */ d.jsxs("div", { className: `field ${h ? "block" : ""}`, style: r, children: [
    s.type !== "button" && /* @__PURE__ */ d.jsx("label", { ref: n, children: Xt(s.title) }, "fieldLabel"),
    s.type === "string" && !o && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "text",
        disabled: s.disabled,
        onChange: a,
        value: t
      }
    ),
    s.type === "string" && o && /* @__PURE__ */ d.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: s.disabled !== void 0 ? s.disabled : !0,
        onChange: a,
        onKeyDown: (c) => {
          s.onKeyDown !== void 0 && s.onKeyDown(c);
        },
        value: t
      }
    ),
    s.type === "boolean" && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "checkbox",
        disabled: s.disabled,
        onChange: a,
        checked: t
      }
    ),
    s.type === "number" && /* @__PURE__ */ d.jsx(
      Ze,
      {
        value: t,
        type: s.type,
        prop: s.prop !== void 0 ? s.prop : s.title,
        min: s.min,
        max: s.max,
        step: s.step,
        disabled: s.disabled,
        labelRef: n,
        onChange: s.onChange
      }
    ),
    s.type === "range" && /* @__PURE__ */ d.jsx(
      Ze,
      {
        value: t,
        type: s.type,
        prop: s.prop !== void 0 ? s.prop : s.title,
        min: s.min,
        max: s.max,
        step: s.step,
        disabled: s.disabled,
        labelRef: n,
        onChange: s.onChange
      }
    ),
    s.type === "color" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("input", { type: "text", value: t.toString(), onChange: a, disabled: s.disabled, className: "color" }),
      /* @__PURE__ */ d.jsx("input", { type: "color", value: t, onChange: a, disabled: s.disabled })
    ] }),
    s.type === "button" && /* @__PURE__ */ d.jsx(
      "button",
      {
        disabled: s.disabled,
        onClick: () => {
          s.onChange !== void 0 && s.onChange(s.prop !== void 0 ? s.prop : s.title, !0);
        },
        children: s.title
      }
    ),
    s.type === "image" && /* @__PURE__ */ d.jsx(Vr, { title: s.title, prop: s.prop, value: s.value, onChange: s.onChange }),
    s.type === "option" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx("select", { onChange: a, disabled: s.disabled, defaultValue: s.value, children: s.options?.map((c, u) => /* @__PURE__ */ d.jsx("option", { value: c.value, children: Xt(c.title) }, u)) }) }),
    s.type === "vector2" && /* @__PURE__ */ d.jsx(Dr, { step: s.step, value: t, min: 0, max: 1, onChange: a }),
    s.type === "grid3" && /* @__PURE__ */ d.jsx(ss, { step: s.step, value: t, onChange: a }),
    s.type === "grid4" && /* @__PURE__ */ d.jsx(Rr, { step: s.step, value: t, onChange: a }),
    s.type === "euler" && /* @__PURE__ */ d.jsx(ss, { step: s.step, value: t, onChange: a })
  ] });
}
function Xr(s) {
  return "items" in s;
}
class be extends Kt {
  subgroupNames = [];
  subgroupElements = [];
  valueOverrides = /* @__PURE__ */ new Map();
  constructor(e) {
    super(e), this.state = { lastUpdated: Date.now() };
  }
  addGroup(e) {
    const t = [];
    e.items.forEach((a) => {
      t.push({
        type: a.type,
        prop: a.prop,
        title: a.title !== void 0 ? a.title : a.prop,
        value: a.value,
        min: a.min,
        max: a.max,
        step: a.step,
        options: a.options,
        disabled: a.disabled,
        onChange: (r, o) => {
          e.onUpdate(r, o);
        }
      });
    });
    const i = Ae(), n = /* @__PURE__ */ d.jsx(
      be,
      {
        ref: i,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return this.subgroupNames.push(e.title), this.subgroupElements.push(n), this.setState({ lastUpdated: Date.now() }), i;
  }
  removeGroup(e) {
    const t = this.subgroupNames.length;
    for (let i = 0; i < t; i++) {
      const n = this.subgroupNames[i];
      if (e === n) {
        this.subgroupNames.splice(i, 1), this.subgroupElements.splice(i, 1), this.setState({ lastUpdated: Date.now() });
        return;
      }
    }
  }
  setField(e, t) {
    this.valueOverrides.set(e, t), this.setState({ lastUpdated: Date.now() });
  }
  render() {
    const e = [];
    return this.props.items.forEach((t) => {
      if (Xr(t))
        e.push(
          /* @__PURE__ */ d.jsx(be, { title: Xt(t.title), items: t.items }, Math.random())
        );
      else {
        const i = this.valueOverrides.get(t.title), n = i !== void 0 ? i : t.value;
        e.push(
          /* @__PURE__ */ d.jsx(
            Gt,
            {
              title: t.title,
              prop: t.prop,
              value: n,
              type: t.type,
              min: t.min,
              max: t.max,
              step: t.step,
              disabled: t.disabled,
              options: t.options,
              onChange: (a, r) => {
                t.onChange !== void 0 && (this.valueOverrides.delete(t.title), t.onChange(a, r));
              },
              onKeyDown: (a) => {
                t.onKeyDown !== void 0 && t.onKeyDown(a);
              }
            },
            Math.random()
          )
        );
      }
    }), this.subgroupElements.forEach((t) => e.push(t)), /* @__PURE__ */ d.jsx(
      $t,
      {
        label: this.props.title,
        open: this.props.expanded === !0,
        onToggle: (t) => {
          this.props.onToggle && this.props?.onToggle(t);
        },
        children: e
      }
    );
  }
}
class q extends Kt {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, q.instance = this, R.addEventListener(D.ADD_GROUP, this.addGroup), R.addEventListener(D.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    R.removeEventListener(D.ADD_GROUP, this.addGroup), R.removeEventListener(D.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ d.jsx("div", { className: "customGroups", children: q.groups }, this.state.lastUpdate);
  }
  // Events
  addGroup = (e) => {
    const t = JSON.parse(e.value), i = [];
    t.items.forEach((n) => {
      i.push({
        type: n.type,
        prop: n.prop,
        title: n.title !== void 0 ? n.title : n.prop,
        value: n.value,
        min: n.min,
        max: n.max,
        step: n.step,
        options: n.options,
        disabled: n.disabled,
        onChange: (a, r) => {
          this.props.three.updateGroup(t.title, a, r);
        }
      });
    }), q.groups.push(
      /* @__PURE__ */ d.jsx(
        be,
        {
          title: t.title,
          items: i
        },
        Math.random()
      )
    ), q.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, i = q.groupTitles.length;
    for (let n = 0; n < i; n++)
      if (t === q.groupTitles[n]) {
        q.groups.splice(n, 1), q.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
        return;
      }
  };
  // Static
  static addEditorGroup(e) {
    const t = [];
    e.items.forEach((a) => {
      t.push({
        type: a.type,
        prop: a.prop,
        title: a.title !== void 0 ? a.title : a.prop,
        value: a.value,
        min: a.min,
        max: a.max,
        step: a.step,
        options: a.options,
        disabled: a.disabled,
        onChange: (r, o) => {
          e.onUpdate(r, o);
        }
      });
    });
    const i = Ae(), n = /* @__PURE__ */ d.jsx(
      be,
      {
        ref: i,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return q.groups.push(n), q.groupsRefs.push(i), q.groupTitles.push(e.title), i;
  }
  static removeEditorGroup(e) {
    const t = q.groupTitles.length;
    console.log("removeEditorGroup:", e, q.groupTitles);
    for (let i = 0; i < t; i++)
      if (e === q.groupTitles[i]) {
        console.log("remove group:", e), q.groups.splice(i, 1), q.groupTitles.splice(i, 1), q.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
}
function as(s) {
  switch (s) {
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
  return s;
}
function $r(s, e) {
  const t = [];
  if (s.perspectiveCameraInfo !== void 0)
    for (const i in s.perspectiveCameraInfo)
      t.push({
        title: as(i),
        prop: i,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[i],
        onChange: (n, a) => {
          e.updateObject(s.uuid, n, a), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const r = e.getScene(s.uuid);
          if (r !== null) {
            const o = r.getObjectByProperty("uuid", s.uuid);
            o !== void 0 && (K(o, n, a), o.updateProjectionMatrix());
          }
        }
      });
  else if (s.orthographicCameraInfo !== void 0)
    for (const i in s.orthographicCameraInfo)
      t.push({
        title: as(i),
        prop: i,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[i],
        onChange: (n, a) => {
          e.updateObject(s.uuid, n, a), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const r = e.getScene(s.uuid);
          if (r !== null) {
            const o = r.getObjectByProperty("uuid", s.uuid);
            o !== void 0 && (K(o, n, a), o.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ d.jsx(
    be,
    {
      title: "Camera",
      items: t
    }
  );
}
class Qr extends Se {
  constructor(e, t) {
    const i = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new at();
    n.setAttribute("position", new Be(i, 3)), n.computeBoundingSphere();
    const a = new Di({ fog: !1 });
    super(n, a), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const r = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new at();
    o.setAttribute("position", new Be(r, 3)), o.computeBoundingSphere(), this.add(new w(o, new Ge({ side: Ds, fog: !1 })));
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
const os = { type: "change" }, Ai = { type: "start" }, rn = { type: "end" }, Ut = new Vn(), ls = new Xn(), qr = Math.cos(70 * $n.DEG2RAD), ie = new O(), he = 2 * Math.PI, H = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, di = 1e-6;
class Kr extends Gs {
  constructor(e, t = null) {
    super(e, t), this.state = H.NONE, this.enabled = !0, this.target = new O(), this.cursor = new O(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: rt.ROTATE, MIDDLE: rt.DOLLY, RIGHT: rt.PAN }, this.touches = { ONE: nt.ROTATE, TWO: nt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new O(), this._lastQuaternion = new fe(), this._lastTargetPosition = new O(), this._quat = new fe().setFromUnitVectors(e.up, new O(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new wi(), this._sphericalDelta = new wi(), this._scale = 1, this._panOffset = new O(), this._rotateStart = new ae(), this._rotateEnd = new ae(), this._rotateDelta = new ae(), this._panStart = new ae(), this._panEnd = new ae(), this._panDelta = new ae(), this._dollyStart = new ae(), this._dollyEnd = new ae(), this._dollyDelta = new ae(), this._dollyDirection = new O(), this._mouse = new ae(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = ea.bind(this), this._onPointerDown = Jr.bind(this), this._onPointerUp = ta.bind(this), this._onContextMenu = la.bind(this), this._onMouseWheel = na.bind(this), this._onKeyDown = ra.bind(this), this._onTouchStart = aa.bind(this), this._onTouchMove = oa.bind(this), this._onMouseDown = ia.bind(this), this._onMouseMove = sa.bind(this), this._interceptControlDown = ca.bind(this), this._interceptControlUp = ha.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(os), this.update(), this.state = H.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    ie.copy(t).sub(this.target), ie.applyQuaternion(this._quat), this._spherical.setFromVector3(ie), this.autoRotate && this.state === H.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(i) && isFinite(n) && (i < -Math.PI ? i += he : i > Math.PI && (i -= he), n < -Math.PI ? n += he : n > Math.PI && (n -= he), i <= n ? this._spherical.theta = Math.max(i, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + n) / 2 ? Math.max(i, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let a = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), a = r != this._spherical.radius;
    }
    if (ie.setFromSpherical(this._spherical), ie.applyQuaternion(this._quatInverse), t.copy(this.target).add(ie), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const o = ie.length();
        r = this._clampDistance(o * this._scale);
        const h = o - r;
        this.object.position.addScaledVector(this._dollyDirection, h), this.object.updateMatrixWorld(), a = !!h;
      } else if (this.object.isOrthographicCamera) {
        const o = new O(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const h = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), a = h !== this.object.zoom;
        const c = new O(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), r = ie.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (Ut.origin.copy(this.object.position), Ut.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Ut.direction)) < qr ? this.object.lookAt(this.target) : (ls.setFromNormalAndCoplanarPoint(this.object.up, this.target), Ut.intersectPlane(ls, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), a = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, a || this._lastPosition.distanceToSquared(this.object.position) > di || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > di || this._lastTargetPosition.distanceToSquared(this.target) > di ? (this.dispatchEvent(os), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? he / 60 * this.autoRotateSpeed * e : he / 60 / 60 * this.autoRotateSpeed;
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
    ie.setFromMatrixColumn(t, 0), ie.multiplyScalar(-e), this._panOffset.add(ie);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? ie.setFromMatrixColumn(t, 1) : (ie.setFromMatrixColumn(t, 0), ie.crossVectors(this.object.up, ie)), ie.multiplyScalar(e), this._panOffset.add(ie);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      ie.copy(n).sub(this.target);
      let a = ie.length();
      a *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * a / i.clientHeight, this.object.matrix), this._panUp(2 * t * a / i.clientHeight, this.object.matrix);
    } else
      this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / i.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / i.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
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
    const i = this.domElement.getBoundingClientRect(), n = e - i.left, a = t - i.top, r = i.width, o = i.height;
    this._mouse.x = n / r * 2 - 1, this._mouse.y = -(a / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(he * this._rotateDelta.x / t.clientHeight), this._rotateUp(he * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(he * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-he * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(he * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-he * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(i, n);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panStart.set(i, n);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, a = Math.sqrt(i * i + n * n);
    this._dollyStart.set(0, a);
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
      const i = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + i.x), a = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(n, a);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(he * this._rotateDelta.x / t.clientHeight), this._rotateUp(he * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panEnd.set(i, n);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, a = Math.sqrt(i * i + n * n);
    this._dollyEnd.set(0, a), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const r = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(r, o);
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
    t === void 0 && (t = new ae(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, i = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        i.deltaY *= 16;
        break;
      case 2:
        i.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (i.deltaY *= 10), i;
  }
}
function Jr(s) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(s) && (this._addPointer(s), s.pointerType === "touch" ? this._onTouchStart(s) : this._onMouseDown(s)));
}
function ea(s) {
  this.enabled !== !1 && (s.pointerType === "touch" ? this._onTouchMove(s) : this._onMouseMove(s));
}
function ta(s) {
  switch (this._removePointer(s), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(rn), this.state = H.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function ia(s) {
  let e;
  switch (s.button) {
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
    case rt.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(s), this.state = H.DOLLY;
      break;
    case rt.ROTATE:
      if (s.ctrlKey || s.metaKey || s.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(s), this.state = H.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(s), this.state = H.ROTATE;
      }
      break;
    case rt.PAN:
      if (s.ctrlKey || s.metaKey || s.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(s), this.state = H.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(s), this.state = H.PAN;
      }
      break;
    default:
      this.state = H.NONE;
  }
  this.state !== H.NONE && this.dispatchEvent(Ai);
}
function sa(s) {
  switch (this.state) {
    case H.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(s);
      break;
    case H.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(s);
      break;
    case H.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(s);
      break;
  }
}
function na(s) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== H.NONE || (s.preventDefault(), this.dispatchEvent(Ai), this._handleMouseWheel(this._customWheelEvent(s)), this.dispatchEvent(rn));
}
function ra(s) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(s);
}
function aa(s) {
  switch (this._trackPointer(s), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case nt.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(s), this.state = H.TOUCH_ROTATE;
          break;
        case nt.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(s), this.state = H.TOUCH_PAN;
          break;
        default:
          this.state = H.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case nt.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(s), this.state = H.TOUCH_DOLLY_PAN;
          break;
        case nt.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(s), this.state = H.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = H.NONE;
      }
      break;
    default:
      this.state = H.NONE;
  }
  this.state !== H.NONE && this.dispatchEvent(Ai);
}
function oa(s) {
  switch (this._trackPointer(s), this.state) {
    case H.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(s), this.update();
      break;
    case H.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(s), this.update();
      break;
    case H.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(s), this.update();
      break;
    case H.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(s), this.update();
      break;
    default:
      this.state = H.NONE;
  }
}
function la(s) {
  this.enabled !== !1 && s.preventDefault();
}
function ca(s) {
  s.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function ha(s) {
  s.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
const da = Math.PI / 180;
function qe(s, e, t, i, n) {
  return i + (s - e) * (n - i) / (t - e);
}
function Ke(s, e, t) {
  return (1 - t) * s + t * e;
}
function cs(s) {
  return s * da;
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
}), Je = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function je(s) {
  return s.isPerspectiveCamera;
}
function Re(s) {
  return s.isOrthographicCamera;
}
const et = Math.PI * 2, hs = Math.PI / 2, an = 1e-5, ft = Math.PI / 180;
function ye(s, e, t) {
  return Math.max(e, Math.min(t, s));
}
function Z(s, e = an) {
  return Math.abs(s) < e;
}
function z(s, e, t = an) {
  return Z(s - e, t);
}
function ds(s, e) {
  return Math.round(s / e) * e;
}
function _t(s) {
  return isFinite(s) ? s : s < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function gt(s) {
  return Math.abs(s) < Number.MAX_VALUE ? s : s * (1 / 0);
}
function jt(s, e, t, i, n = 1 / 0, a) {
  i = Math.max(1e-4, i);
  const r = 2 / i, o = r * a, h = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let c = s - e;
  const u = e, m = n * i;
  c = ye(c, -m, m), e = s - c;
  const _ = (t.value + r * c) * a;
  t.value = (t.value - r * _) * h;
  let g = e + (c + _) * h;
  return u - s > 0 == g > u && (g = u, t.value = (g - u) / a), g;
}
function us(s, e, t, i, n = 1 / 0, a, r) {
  i = Math.max(1e-4, i);
  const o = 2 / i, h = o * a, c = 1 / (1 + h + 0.48 * h * h + 0.235 * h * h * h);
  let u = e.x, m = e.y, _ = e.z, g = s.x - u, S = s.y - m, M = s.z - _;
  const T = u, f = m, v = _, E = n * i, b = E * E, P = g * g + S * S + M * M;
  if (P > b) {
    const $ = Math.sqrt(P);
    g = g / $ * E, S = S / $ * E, M = M / $ * E;
  }
  u = s.x - g, m = s.y - S, _ = s.z - M;
  const x = (t.x + o * g) * a, j = (t.y + o * S) * a, X = (t.z + o * M) * a;
  t.x = (t.x - o * x) * c, t.y = (t.y - o * j) * c, t.z = (t.z - o * X) * c, r.x = u + (g + x) * c, r.y = m + (S + j) * c, r.z = _ + (M + X) * c;
  const _e = T - s.x, Pe = f - s.y, ct = v - s.z, Ve = r.x - T, me = r.y - f, te = r.z - v;
  return _e * Ve + Pe * me + ct * te > 0 && (r.x = T, r.y = f, r.z = v, t.x = (r.x - T) / a, t.y = (r.y - f) / a, t.z = (r.z - v) / a), r;
}
function ui(s, e) {
  e.set(0, 0), s.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= s.length, e.y /= s.length;
}
function pi(s, e) {
  return Re(s) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class ua {
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
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t);
  }
  /**
   * Presence of the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  hasEventListener(e, t) {
    const i = this._listeners;
    return i[e] !== void 0 && i[e].indexOf(t) !== -1;
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
      const a = n.indexOf(t);
      a !== -1 && n.splice(a, 1);
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
    const i = this._listeners[e.type];
    if (i !== void 0) {
      e.target = this;
      const n = i.slice(0);
      for (let a = 0, r = n.length; a < r; a++)
        n[a].call(this, e);
    }
  }
}
var mi;
const pa = "2.9.0", Nt = 1 / 8, ma = /Mac/.test((mi = globalThis?.navigator) === null || mi === void 0 ? void 0 : mi.platform);
let A, ps, Ft, fi, de, L, N, tt, vt, Ee, Ce, Ne, ms, fs, ve, yt, it, _s, _i, gs, gi, vi, zt;
class xe extends ua {
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
    A = e.THREE, ps = Object.freeze(new A.Vector3(0, 0, 0)), Ft = Object.freeze(new A.Vector3(0, 1, 0)), fi = Object.freeze(new A.Vector3(0, 0, 1)), de = new A.Vector2(), L = new A.Vector3(), N = new A.Vector3(), tt = new A.Vector3(), vt = new A.Vector3(), Ee = new A.Vector3(), Ce = new A.Vector3(), Ne = new A.Vector3(), ms = new A.Vector3(), fs = new A.Vector3(), ve = new A.Spherical(), yt = new A.Spherical(), it = new A.Box3(), _s = new A.Box3(), _i = new A.Sphere(), gs = new A.Quaternion(), gi = new A.Quaternion(), vi = new A.Matrix4(), zt = new A.Raycaster();
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
    }, this._enabled = !0, this._state = p.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = Je.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new A.Vector3(), this._focalOffsetVelocity = new A.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (f, v, E) => {
      let b, P;
      if (je(this._camera)) {
        const x = L.copy(this._camera.position).sub(this._target), j = this._camera.getEffectiveFOV() * ft, X = x.length() * Math.tan(j * 0.5);
        b = this.truckSpeed * f * X / this._elementRect.height, P = this.truckSpeed * v * X / this._elementRect.height;
      } else if (Re(this._camera)) {
        const x = this._camera;
        b = f * (x.right - x.left) / x.zoom / this._elementRect.width, P = v * (x.top - x.bottom) / x.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(b, 0, !0), this.forward(-P, !0)) : E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y + P, this._focalOffsetEnd.z, !0) : this.truck(b, P, !0);
    }, this._rotateInternal = (f, v) => {
      const E = et * this.azimuthRotateSpeed * f / this._elementRect.height, b = et * this.polarRotateSpeed * v / this._elementRect.height;
      this.rotate(E, b, !0);
    }, this._dollyInternal = (f, v, E) => {
      const b = Math.pow(0.95, -f * this.dollySpeed), P = this._sphericalEnd.radius, x = this._sphericalEnd.radius * b, j = ye(x, this.minDistance, this.maxDistance), X = j - x;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(x, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(X, !0), this._dollyToNoClamp(j, !0)) : this._dollyToNoClamp(j, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? x : j) - P, this._dollyControlCoord.set(v, E)), this._lastDollyDirection = Math.sign(-f);
    }, this._zoomInternal = (f, v, E) => {
      const b = Math.pow(0.95, f * this.dollySpeed), P = this._zoom, x = this._zoom * b;
      this.zoomTo(x, !0), this.dollyToCursor && (this._changedZoom += x - P, this._dollyControlCoord.set(v, E));
    }, typeof A > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new A.Quaternion().setFromUnitVectors(this._camera.up, Ft), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = p.NONE, this._target = new A.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new A.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new A.Spherical().setFromVector3(L.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new A.Vector3(),
      new A.Vector3(),
      new A.Vector3(),
      new A.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new A.Box3(new A.Vector3(-1 / 0, -1 / 0, -1 / 0), new A.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new A.Vector2(), this.mouseButtons = {
      left: p.ROTATE,
      middle: p.DOLLY,
      right: p.TRUCK,
      wheel: je(this._camera) ? p.DOLLY : Re(this._camera) ? p.ZOOM : p.NONE
    }, this.touches = {
      one: p.TOUCH_ROTATE,
      two: je(this._camera) ? p.TOUCH_DOLLY_TRUCK : Re(this._camera) ? p.TOUCH_ZOOM_TRUCK : p.NONE,
      three: p.TOUCH_TRUCK
    };
    const i = new A.Vector2(), n = new A.Vector2(), a = new A.Vector2(), r = (f) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const b = this._domElement.getBoundingClientRect(), P = f.clientX / b.width, x = f.clientY / b.height;
        if (P < this._interactiveArea.left || P > this._interactiveArea.right || x < this._interactiveArea.top || x > this._interactiveArea.bottom)
          return;
      }
      const v = f.pointerType !== "mouse" ? null : (f.buttons & V.LEFT) === V.LEFT ? V.LEFT : (f.buttons & V.MIDDLE) === V.MIDDLE ? V.MIDDLE : (f.buttons & V.RIGHT) === V.RIGHT ? V.RIGHT : null;
      if (v !== null) {
        const b = this._findPointerByMouseButton(v);
        b && this._disposePointer(b);
      }
      if ((f.buttons & V.LEFT) === V.LEFT && this._lockedPointer)
        return;
      const E = {
        pointerId: f.pointerId,
        clientX: f.clientX,
        clientY: f.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: v
      };
      this._activePointers.push(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), this._isDragging = !0, _(f);
    }, o = (f) => {
      f.cancelable && f.preventDefault();
      const v = f.pointerId, E = this._lockedPointer || this._findPointerById(v);
      if (E) {
        if (E.clientX = f.clientX, E.clientY = f.clientY, E.deltaX = f.movementX, E.deltaY = f.movementY, this._state = 0, f.pointerType === "touch")
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
      const v = this._findPointerById(f.pointerId);
      if (!(v && v === this._lockedPointer)) {
        if (v && this._disposePointer(v), f.pointerType === "touch")
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
      const v = ma ? -1 : -3, E = f.deltaMode === 1 ? f.deltaY / v : f.deltaY / (v * 10), b = this.dollyToCursor ? (f.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, P = this.dollyToCursor ? (f.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
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
          this._dollyInternal(-E, b, P), this._isUserControllingDolly = !0;
          break;
        }
        case p.ZOOM: {
          this._zoomInternal(-E, b, P), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, m = (f) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === xe.ACTION.NONE) {
          const v = f instanceof PointerEvent ? f.pointerId : 0, E = this._findPointerById(v);
          E && this._disposePointer(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h);
          return;
        }
        f.preventDefault();
      }
    }, _ = (f) => {
      if (!this._enabled)
        return;
      if (ui(this._activePointers, de), this._getClientRect(this._elementRect), i.copy(de), n.copy(de), this._activePointers.length >= 2) {
        const E = de.x - this._activePointers[1].clientX, b = de.y - this._activePointers[1].clientY, P = Math.sqrt(E * E + b * b);
        a.set(0, P);
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
      this._dragNeedsUpdate = !1, ui(this._activePointers, de);
      const v = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, E = v ? -v.deltaX : n.x - de.x, b = v ? -v.deltaY : n.y - de.y;
      if (n.copy(de), ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(E, b), this._isUserControllingRotate = !0), (this._state & p.DOLLY) === p.DOLLY || (this._state & p.ZOOM) === p.ZOOM) {
        const P = this.dollyToCursor ? (i.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, x = this.dollyToCursor ? (i.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, j = this.dollyDragInverted ? -1 : 1;
        (this._state & p.DOLLY) === p.DOLLY ? (this._dollyInternal(j * b * Nt, P, x), this._isUserControllingDolly = !0) : (this._zoomInternal(j * b * Nt, P, x), this._isUserControllingZoom = !0);
      }
      if ((this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) {
        const P = de.x - this._activePointers[1].clientX, x = de.y - this._activePointers[1].clientY, j = Math.sqrt(P * P + x * x), X = a.y - j;
        a.set(0, j);
        const _e = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, Pe = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(X * Nt, _e, Pe), this._isUserControllingDolly = !0) : (this._zoomInternal(X * Nt, _e, Pe), this._isUserControllingZoom = !0);
      }
      ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK) && (this._truckInternal(E, b, !1), this._isUserControllingTruck = !0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._truckInternal(E, b, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, S = () => {
      ui(this._activePointers, de), n.copy(de), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", M), this._domElement.ownerDocument.addEventListener("pointerlockerror", T), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", h), _());
    }, this.unlockPointer = () => {
      var f, v, E;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (f = this._domElement) === null || f === void 0 || f.ownerDocument.exitPointerLock(), (v = this._domElement) === null || v === void 0 || v.ownerDocument.removeEventListener("pointerlockchange", M), (E = this._domElement) === null || E === void 0 || E.ownerDocument.removeEventListener("pointerlockerror", T), this.cancel();
    };
    const M = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, T = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (f) => {
      this._domElement = f, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", r), this._domElement.addEventListener("pointercancel", h), this._domElement.addEventListener("wheel", u, { passive: !1 }), this._domElement.addEventListener("contextmenu", m);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", r), this._domElement.removeEventListener("pointercancel", h), this._domElement.removeEventListener("wheel", u, { passive: !1 }), this._domElement.removeEventListener("contextmenu", m), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", h), this._domElement.ownerDocument.removeEventListener("pointerlockchange", M), this._domElement.ownerDocument.removeEventListener("pointerlockerror", T));
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
  rotate(e, t, i = !1) {
    return this.rotateTo(this._sphericalEnd.theta + e, this._sphericalEnd.phi + t, i);
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
  rotateTo(e, t, i = !1) {
    this._isUserControllingRotate = !1;
    const n = ye(e, this.minAzimuthAngle, this.maxAzimuthAngle), a = ye(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = a, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, i || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const r = !i || z(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && z(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
    return this._createOnRestPromise(r);
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
    return this._isUserControllingDolly = !1, this._lastDollyDirection = Je.NONE, this._changedDolly = 0, this._dollyToNoClamp(ye(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const i = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const r = this._collisionTest(), o = z(r, this._spherical.radius);
      if (!(i > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, r);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const a = !t || z(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(a);
  }
  /**
   * Dolly in, but does not change the distance between the target and the camera, and moves the target position instead.
   * Specify a negative value for dolly out.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyInFixed(e, t = !1) {
    this._targetEnd.add(this._getCameraDirection(vt).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
    const i = !t || z(this._target.x, this._targetEnd.x, this.restThreshold) && z(this._target.y, this._targetEnd.y, this.restThreshold) && z(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(i);
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
    const i = !t || z(this._zoom, this._zoomEnd, this.restThreshold);
    return this._changedZoom = 0, this._createOnRestPromise(i);
  }
  /**
   * @deprecated `pan()` has been renamed to `truck()`
   * @category Methods
   */
  pan(e, t, i = !1) {
    return console.warn("`pan` has been renamed to `truck`"), this.truck(e, t, i);
  }
  /**
   * Truck and pedestal camera using current azimuthal angle
   * @param x Horizontal translate amount
   * @param y Vertical translate amount
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  truck(e, t, i = !1) {
    this._camera.updateMatrix(), Ee.setFromMatrixColumn(this._camera.matrix, 0), Ce.setFromMatrixColumn(this._camera.matrix, 1), Ee.multiplyScalar(e), Ce.multiplyScalar(-t);
    const n = L.copy(Ee).add(Ce), a = N.copy(this._targetEnd).add(n);
    return this.moveTo(a.x, a.y, a.z, i);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    L.setFromMatrixColumn(this._camera.matrix, 0), L.crossVectors(this._camera.up, L), L.multiplyScalar(e);
    const i = N.copy(this._targetEnd).add(L);
    return this.moveTo(i.x, i.y, i.z, t);
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
  moveTo(e, t, i, n = !1) {
    this._isUserControllingTruck = !1;
    const a = L.set(e, t, i).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, a, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const r = !n || z(this._target.x, this._targetEnd.x, this.restThreshold) && z(this._target.y, this._targetEnd.y, this.restThreshold) && z(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(r);
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
  lookInDirectionOf(e, t, i, n = !1) {
    const o = L.set(e, t, i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
  fitToBox(e, t, { cover: i = !1, paddingLeft: n = 0, paddingRight: a = 0, paddingBottom: r = 0, paddingTop: o = 0 } = {}) {
    const h = [], c = e.isBox3 ? it.copy(e) : it.setFromObject(e);
    c.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const u = ds(this._sphericalEnd.theta, hs), m = ds(this._sphericalEnd.phi, hs);
    h.push(this.rotateTo(u, m, t));
    const _ = L.setFromSpherical(this._sphericalEnd).normalize(), g = gs.setFromUnitVectors(_, fi), S = z(Math.abs(_.y), 1);
    S && g.multiply(gi.setFromAxisAngle(Ft, u)), g.multiply(this._yAxisUpSpaceInverse);
    const M = _s.makeEmpty();
    N.copy(c.min).applyQuaternion(g), M.expandByPoint(N), N.copy(c.min).setX(c.max.x).applyQuaternion(g), M.expandByPoint(N), N.copy(c.min).setY(c.max.y).applyQuaternion(g), M.expandByPoint(N), N.copy(c.max).setZ(c.min.z).applyQuaternion(g), M.expandByPoint(N), N.copy(c.min).setZ(c.max.z).applyQuaternion(g), M.expandByPoint(N), N.copy(c.max).setY(c.min.y).applyQuaternion(g), M.expandByPoint(N), N.copy(c.max).setX(c.min.x).applyQuaternion(g), M.expandByPoint(N), N.copy(c.max).applyQuaternion(g), M.expandByPoint(N), M.min.x -= n, M.min.y -= r, M.max.x += a, M.max.y += o, g.setFromUnitVectors(fi, _), S && g.premultiply(gi.invert()), g.premultiply(this._yAxisUpSpace);
    const T = M.getSize(L), f = M.getCenter(N).applyQuaternion(g);
    if (je(this._camera)) {
      const v = this.getDistanceToFitBox(T.x, T.y, T.z, i);
      h.push(this.moveTo(f.x, f.y, f.z, t)), h.push(this.dollyTo(v, t)), h.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Re(this._camera)) {
      const v = this._camera, E = v.right - v.left, b = v.top - v.bottom, P = i ? Math.max(E / T.x, b / T.y) : Math.min(E / T.x, b / T.y);
      h.push(this.moveTo(f.x, f.y, f.z, t)), h.push(this.zoomTo(P, t)), h.push(this.setFocalOffset(0, 0, 0, t));
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
    const i = [], a = "isObject3D" in e ? xe.createBoundingSphere(e, _i) : _i.copy(e);
    if (i.push(this.moveTo(a.center.x, a.center.y, a.center.z, t)), je(this._camera)) {
      const r = this.getDistanceToFitSphere(a.radius);
      i.push(this.dollyTo(r, t));
    } else if (Re(this._camera)) {
      const r = this._camera.right - this._camera.left, o = this._camera.top - this._camera.bottom, h = 2 * a.radius, c = Math.min(r / h, o / h);
      i.push(this.zoomTo(c, t));
    }
    return i.push(this.setFocalOffset(0, 0, 0, t)), Promise.all(i);
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
  setLookAt(e, t, i, n, a, r, o = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Je.NONE, this._changedDolly = 0;
    const h = N.set(n, a, r), c = L.set(e, t, i);
    this._targetEnd.copy(h), this._sphericalEnd.setFromVector3(c.sub(h).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const u = !o || z(this._target.x, this._targetEnd.x, this.restThreshold) && z(this._target.y, this._targetEnd.y, this.restThreshold) && z(this._target.z, this._targetEnd.z, this.restThreshold) && z(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && z(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && z(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  lerpLookAt(e, t, i, n, a, r, o, h, c, u, m, _, g, S = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = Je.NONE, this._changedDolly = 0;
    const M = L.set(n, a, r), T = N.set(e, t, i);
    ve.setFromVector3(T.sub(M).applyQuaternion(this._yAxisUpSpace));
    const f = tt.set(u, m, _), v = N.set(o, h, c);
    yt.setFromVector3(v.sub(f).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(M.lerp(f, g));
    const E = yt.theta - ve.theta, b = yt.phi - ve.phi, P = yt.radius - ve.radius;
    this._sphericalEnd.set(ve.radius + P * g, ve.phi + b * g, ve.theta + E * g), this.normalizeRotations(), this._needsUpdate = !0, S || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const x = !S || z(this._target.x, this._targetEnd.x, this.restThreshold) && z(this._target.y, this._targetEnd.y, this.restThreshold) && z(this._target.z, this._targetEnd.z, this.restThreshold) && z(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && z(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && z(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  setPosition(e, t, i, n = !1) {
    return this.setLookAt(e, t, i, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, n);
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
  setTarget(e, t, i, n = !1) {
    const a = this.getPosition(L), r = this.setLookAt(a.x, a.y, a.z, e, t, i, n);
    return this._sphericalEnd.phi = ye(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), r;
  }
  /**
   * Set focal offset using the screen parallel coordinates. z doesn't affect in Orthographic as with Dolly.
   * @param x
   * @param y
   * @param z
   * @param enableTransition
   * @category Methods
   */
  setFocalOffset(e, t, i, n = !1) {
    this._isUserControllingOffset = !1, this._focalOffsetEnd.set(e, t, i), this._needsUpdate = !0, n || this._focalOffset.copy(this._focalOffsetEnd);
    const a = !n || z(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && z(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && z(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
  setOrbitPoint(e, t, i) {
    this._camera.updateMatrixWorld(), Ee.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), Ce.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), Ne.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = L.set(e, t, i), a = n.distanceTo(this._camera.position), r = n.sub(this._camera.position);
    Ee.multiplyScalar(r.x), Ce.multiplyScalar(r.y), Ne.multiplyScalar(r.z), L.copy(Ee).add(Ce).add(Ne), L.z = L.z + a, this.dollyTo(a, !1), this.setFocalOffset(-L.x, L.y, -L.z, !1), this.moveTo(e, t, i, !1);
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
  setViewport(e, t, i, n) {
    if (e === null) {
      this._viewport = null;
      return;
    }
    this._viewport = this._viewport || new A.Vector4(), typeof e == "number" ? this._viewport.set(e, t, i, n) : this._viewport.copy(e);
  }
  /**
   * Calculate the distance to fit the box.
   * @param width box width
   * @param height box height
   * @param depth box depth
   * @returns distance
   * @category Methods
   */
  getDistanceToFitBox(e, t, i, n = !1) {
    if (pi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const a = e / t, r = this._camera.getEffectiveFOV() * ft, o = this._camera.aspect;
    return ((n ? a > o : a < o) ? t : e / o) * 0.5 / Math.tan(r * 0.5) + i * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (pi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * ft, i = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : i;
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
    this._sphericalEnd.theta = this._sphericalEnd.theta % et, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += et), this._spherical.theta += et * Math.round((this._sphericalEnd.theta - this._spherical.theta) / et);
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
    if (!z(this._camera.up.x, this._cameraUp0.x) || !z(this._camera.up.y, this._cameraUp0.y) || !z(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const i = this.getPosition(L);
      this.updateCameraUp(), this.setPosition(i.x, i.y, i.z);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, Ft), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = L.subVectors(this._target, this._camera.position).normalize(), t = N.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const i = this.getPosition(L);
    this.updateCameraUp(), this.setPosition(i.x, i.y, i.z);
  }
  /**
   * Update camera position and directions.
   * This should be called in your tick loop every time, and returns true if re-rendering is needed.
   * @param delta
   * @returns updated
   * @category Methods
   */
  update(e) {
    const t = this._sphericalEnd.theta - this._spherical.theta, i = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, a = ms.subVectors(this._targetEnd, this._target), r = fs.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (Z(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const m = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = jt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, m, 1 / 0, e), this._needsUpdate = !0;
    }
    if (Z(i))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const m = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = jt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, m, 1 / 0, e), this._needsUpdate = !0;
    }
    if (Z(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const m = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = jt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, m, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (Z(a.x) && Z(a.y) && Z(a.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const m = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      us(this._target, this._targetEnd, this._targetVelocity, m, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (Z(r.x) && Z(r.y) && Z(r.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const m = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      us(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, m, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (Z(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const m = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = jt(this._zoom, this._zoomEnd, this._zoomVelocity, m, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (je(this._camera) && this._changedDolly !== 0) {
        const m = this._spherical.radius - this._lastDistance, _ = this._camera, g = this._getCameraDirection(vt), S = L.copy(g).cross(_.up).normalize();
        S.lengthSq() === 0 && (S.x = 1);
        const M = N.crossVectors(S, g), T = this._sphericalEnd.radius * Math.tan(_.getEffectiveFOV() * ft * 0.5), v = (this._sphericalEnd.radius - m - this._sphericalEnd.radius) / this._sphericalEnd.radius, E = tt.copy(this._targetEnd).add(S.multiplyScalar(this._dollyControlCoord.x * T * _.aspect)).add(M.multiplyScalar(this._dollyControlCoord.y * T)), b = L.copy(this._targetEnd).lerp(E, v), P = this._lastDollyDirection === Je.IN && this._spherical.radius <= this.minDistance, x = this._lastDollyDirection === Je.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (P || x)) {
          this._sphericalEnd.radius -= m, this._spherical.radius -= m;
          const X = N.copy(g).multiplyScalar(-m);
          b.add(X);
        }
        this._boundary.clampPoint(b, b);
        const j = N.subVectors(b, this._targetEnd);
        this._targetEnd.copy(b), this._target.add(j), this._changedDolly -= m, Z(this._changedDolly) && (this._changedDolly = 0);
      } else if (Re(this._camera) && this._changedZoom !== 0) {
        const m = this._zoom - this._lastZoom, _ = this._camera, g = L.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (_.near + _.far) / (_.near - _.far)).unproject(_), S = N.set(0, 0, -1).applyQuaternion(_.quaternion), M = tt.copy(g).add(S.multiplyScalar(-g.dot(_.up))), f = -(this._zoom - m - this._zoom) / this._zoom, v = this._getCameraDirection(vt), E = this._targetEnd.dot(v), b = L.copy(this._targetEnd).lerp(M, f), P = b.dot(v), x = v.multiplyScalar(P - E);
        b.sub(x), this._boundary.clampPoint(b, b);
        const j = N.subVectors(b, this._targetEnd);
        this._targetEnd.copy(b), this._target.add(j), this._changedZoom -= m, Z(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const h = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, h), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!Z(this._focalOffset.x) || !Z(this._focalOffset.y) || !Z(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Ee.setFromMatrixColumn(this._camera.matrix, 0), Ce.setFromMatrixColumn(this._camera.matrix, 1), Ne.setFromMatrixColumn(this._camera.matrix, 2), Ee.multiplyScalar(this._focalOffset.x), Ce.multiplyScalar(-this._focalOffset.y), Ne.multiplyScalar(this._focalOffset.z), L.copy(Ee).add(Ce).add(Ne), this._camera.position.add(L)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), L.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const u = this._needsUpdate;
    return u && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : u ? (this.dispatchEvent({ type: "update" }), Z(t, this.restThreshold) && Z(i, this.restThreshold) && Z(n, this.restThreshold) && Z(a.x, this.restThreshold) && Z(a.y, this.restThreshold) && Z(a.z, this.restThreshold) && Z(r.x, this.restThreshold) && Z(r.y, this.restThreshold) && Z(r.z, this.restThreshold) && Z(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !u && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = u, this._needsUpdate = !1, u;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: _t(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: _t(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: _t(this.maxPolarAngle),
      minAzimuthAngle: _t(this.minAzimuthAngle),
      maxAzimuthAngle: _t(this.maxAzimuthAngle),
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
    const i = JSON.parse(e);
    this.enabled = i.enabled, this.minDistance = i.minDistance, this.maxDistance = gt(i.maxDistance), this.minZoom = i.minZoom, this.maxZoom = gt(i.maxZoom), this.minPolarAngle = i.minPolarAngle, this.maxPolarAngle = gt(i.maxPolarAngle), this.minAzimuthAngle = gt(i.minAzimuthAngle), this.maxAzimuthAngle = gt(i.maxAzimuthAngle), this.smoothTime = i.smoothTime, this.draggingSmoothTime = i.draggingSmoothTime, this.dollySpeed = i.dollySpeed, this.truckSpeed = i.truckSpeed, this.dollyToCursor = i.dollyToCursor, this.verticalDragToForward = i.verticalDragToForward, this._target0.fromArray(i.target0), this._position0.fromArray(i.position0), this._zoom0 = i.zoom0, this._focalOffset0.fromArray(i.focalOffset0), this.moveTo(i.target[0], i.target[1], i.target[2], t), ve.setFromVector3(L.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(ve.theta, ve.phi, t), this.dollyTo(ve.radius, t), this.zoomTo(i.zoom, t), this.setFocalOffset(i.focalOffset[0], i.focalOffset[1], i.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", pa), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
  _encloseToBoundary(e, t, i) {
    const n = t.lengthSq();
    if (n === 0)
      return e;
    const a = N.copy(t).add(e), o = this._boundary.clampPoint(a, tt).sub(a), h = o.lengthSq();
    if (h === 0)
      return e.add(t);
    if (h === n)
      return e;
    if (i === 0)
      return e.add(t).add(o);
    {
      const c = 1 + i * h / t.dot(o);
      return e.add(N.copy(t).multiplyScalar(c)).add(o.multiplyScalar(1 - i));
    }
  }
  _updateNearPlaneCorners() {
    if (je(this._camera)) {
      const e = this._camera, t = e.near, i = e.getEffectiveFOV() * ft, n = Math.tan(i * 0.5) * t, a = n * e.aspect;
      this._nearPlaneCorners[0].set(-a, -n, 0), this._nearPlaneCorners[1].set(a, -n, 0), this._nearPlaneCorners[2].set(a, n, 0), this._nearPlaneCorners[3].set(-a, n, 0);
    } else if (Re(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, i = e.left * t, n = e.right * t, a = e.top * t, r = e.bottom * t;
      this._nearPlaneCorners[0].set(i, a, 0), this._nearPlaneCorners[1].set(n, a, 0), this._nearPlaneCorners[2].set(n, r, 0), this._nearPlaneCorners[3].set(i, r, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || pi(this._camera, "_collisionTest"))
      return e;
    const i = this._getTargetDirection(vt);
    vi.lookAt(ps, i, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const a = N.copy(this._nearPlaneCorners[n]);
      a.applyMatrix4(vi);
      const r = tt.addVectors(this._target, a);
      zt.set(r, i), zt.far = this._spherical.radius + 1;
      const o = zt.intersectObjects(this.colliderMeshes);
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
      const i = () => {
        this.removeEventListener("rest", i), t();
      };
      this.addEventListener("rest", i);
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
    const i = t, n = i.center;
    it.makeEmpty(), e.traverseVisible((r) => {
      r.isMesh && it.expandByObject(r);
    }), it.getCenter(n);
    let a = 0;
    return e.traverseVisible((r) => {
      if (!r.isMesh)
        return;
      const o = r, h = o.geometry.clone();
      h.applyMatrix4(o.matrixWorld);
      const u = h.attributes.position;
      for (let m = 0, _ = u.count; m < _; m++)
        L.fromBufferAttribute(u, m), a = Math.max(a, n.distanceToSquared(L));
    }), i.radius = Math.sqrt(a), i;
  }
}
const Qt = (s) => {
  const [e, t] = G(s.options[s.index]), i = () => {
    s.onToggle(!s.open);
  }, n = (a) => {
    a !== e && (s.onSelect(a), t(a)), s.onToggle(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `dropdown ${s.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "dropdown-toggle", onClick: i, children: `${s.title}: ${e}` }),
    s.open && /* @__PURE__ */ d.jsx("ul", { className: "dropdown-menu", children: s.options.map((a) => /* @__PURE__ */ d.jsx("li", { onClick: () => n(a), children: a }, a)) })
  ] });
}, Fe = dr(function(e, t) {
  const i = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, a] = G("Renderer"), [r, o] = G(!1), [h, c] = G(!1), [u, m] = G(!1);
  return /* @__PURE__ */ d.jsxs("div", { className: `CameraWindow ${e.name}`, children: [
    /* @__PURE__ */ d.jsx("div", { ref: t, className: "clickable", onClick: () => {
      u && m(!1);
    } }),
    /* @__PURE__ */ d.jsxs("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ d.jsx(
        Qt,
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
        Qt,
        {
          title: "Mode",
          index: i.indexOf(n),
          open: h,
          options: i,
          onSelect: (_) => {
            if (_ === n)
              return;
            const g = _;
            e.onSelectRenderMode(g), a(g);
          },
          onToggle: (_) => {
            r && o(!1), c(_);
          },
          up: !0
        }
      )
    ] })
  ] });
});
class fa extends Ws {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: Qn,
      side: Pi,
      transparent: !0,
      uniforms: {
        uScale: {
          value: e?.scale !== void 0 ? e?.scale : 0.1
        },
        uDivisions: {
          value: e?.divisions !== void 0 ? e?.divisions : 10
        },
        uColor: {
          value: e?.color !== void 0 ? e?.color : new Tt(16777215)
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
class _a extends w {
  gridMaterial;
  constructor() {
    const e = new fa();
    super(new Vs(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
const ga = `#include <common>
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
}`, va = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class ya extends Ws {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ga,
      fragmentShader: va
    });
  }
}
const ze = new Vt(), re = new O(), De = new O(), W = new fe(), vs = {
  X: new O(1, 0, 0),
  Y: new O(0, 1, 0),
  Z: new O(0, 0, 1)
}, yi = { type: "change" }, ys = { type: "mouseDown", mode: null }, bs = { type: "mouseUp", mode: null }, Es = { type: "objectChange" };
class ba extends Gs {
  constructor(e, t = null) {
    super(void 0, t);
    const i = new Oa(this);
    this._root = i;
    const n = new Ta();
    this._gizmo = n, i.add(n);
    const a = new Ma();
    this._plane = a, i.add(a);
    const r = this;
    function o(E, b) {
      let P = b;
      Object.defineProperty(r, E, {
        get: function() {
          return P !== void 0 ? P : b;
        },
        set: function(x) {
          P !== x && (P = x, a[E] = x, n[E] = x, r.dispatchEvent({ type: E + "-changed", value: x }), r.dispatchEvent(yi));
        }
      }), r[E] = b, a[E] = b, n[E] = b;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const h = new O(), c = new O(), u = new fe(), m = new fe(), _ = new O(), g = new fe(), S = new O(), M = new O(), T = new O(), f = 0, v = new O();
    o("worldPosition", h), o("worldPositionStart", c), o("worldQuaternion", u), o("worldQuaternionStart", m), o("cameraPosition", _), o("cameraQuaternion", g), o("pointStart", S), o("pointEnd", M), o("rotationAxis", T), o("rotationAngle", f), o("eye", v), this._offset = new O(), this._startNorm = new O(), this._endNorm = new O(), this._cameraScale = new O(), this._parentPosition = new O(), this._parentQuaternion = new fe(), this._parentQuaternionInv = new fe(), this._parentScale = new O(), this._worldScaleStart = new O(), this._worldQuaternionInv = new fe(), this._worldScale = new O(), this._positionStart = new O(), this._quaternionStart = new fe(), this._scaleStart = new O(), this._getPointer = Ea.bind(this), this._onPointerDown = wa.bind(this), this._onPointerHover = Ca.bind(this), this._onPointerMove = Sa.bind(this), this._onPointerUp = xa.bind(this), t !== null && this.connect();
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
    const t = bi(this._gizmo.picker[this.mode], ze);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && ze.setFromCamera(e, this.camera);
      const t = bi(this._plane, ze, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, ys.mode = this.mode, this.dispatchEvent(ys);
    }
  }
  pointerMove(e) {
    const t = this.axis, i = this.mode, n = this.object;
    let a = this.space;
    if (i === "scale" ? a = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (a = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && ze.setFromCamera(e, this.camera);
    const r = bi(this._plane, ze, !0);
    if (r) {
      if (this.pointEnd.copy(r.point).sub(this.worldPositionStart), i === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), a === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), a === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (a === "local" && (n.position.applyQuaternion(W.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), a === "world" && (n.parent && n.position.add(re.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(re.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (i === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), De.set(o, o, o);
        } else
          re.copy(this.pointStart), De.copy(this.pointEnd), re.applyQuaternion(this._worldQuaternionInv), De.applyQuaternion(this._worldQuaternionInv), De.divide(re), t.search("X") === -1 && (De.x = 1), t.search("Y") === -1 && (De.y = 1), t.search("Z") === -1 && (De.z = 1);
        n.scale.copy(this._scaleStart).multiply(De), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (i === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(re.setFromMatrixPosition(this.camera.matrixWorld));
        let h = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(re.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(vs[t]), re.copy(vs[t]), a === "local" && re.applyQuaternion(this.worldQuaternion), re.cross(this.eye), re.length() === 0 ? h = !0 : this.rotationAngle = this._offset.dot(re.normalize()) * o), (t === "E" || h) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), a === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(W.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(W.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(yi), this.dispatchEvent(Es);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (bs.mode = this.mode, this.dispatchEvent(bs)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(yi), this.dispatchEvent(Es), this.pointStart.copy(this.pointEnd));
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
function Ea(s) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: s.button
    };
  {
    const e = this.domElement.getBoundingClientRect();
    return {
      x: (s.clientX - e.left) / e.width * 2 - 1,
      y: -(s.clientY - e.top) / e.height * 2 + 1,
      button: s.button
    };
  }
}
function Ca(s) {
  if (this.enabled)
    switch (s.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(s));
        break;
    }
}
function wa(s) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(s)), this.pointerDown(this._getPointer(s)));
}
function Sa(s) {
  this.enabled && this.pointerMove(this._getPointer(s));
}
function xa(s) {
  this.enabled && (this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(s)));
}
function bi(s, e, t) {
  const i = e.intersectObject(s, !0);
  for (let n = 0; n < i.length; n++)
    if (i[n].object.visible || t)
      return i[n];
  return !1;
}
const Ht = new Xs(), B = new O(0, 1, 0), Cs = new O(0, 0, 0), ws = new qt(), Yt = new fe(), Wt = new fe(), we = new O(), Ss = new qt(), wt = new O(1, 0, 0), Ye = new O(0, 1, 0), St = new O(0, 0, 1), Bt = new O(), bt = new O(), Et = new O();
class Oa extends ot {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class Ta extends ot {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new Ge({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Di({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), i = e.clone();
    i.opacity = 0.15;
    const n = t.clone();
    n.opacity = 0.5;
    const a = e.clone();
    a.color.setHex(16711680);
    const r = e.clone();
    r.color.setHex(65280);
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
    const M = new ce(0, 0.04, 0.1, 12);
    M.translate(0, 0.05, 0);
    const T = new ne(0.08, 0.08, 0.08);
    T.translate(0, 0.04, 0);
    const f = new at();
    f.setAttribute("position", new Be([0, 0, 0, 1, 0, 0], 3));
    const v = new ce(75e-4, 75e-4, 0.5, 3);
    v.translate(0, 0.25, 0);
    function E($, Ie) {
      const le = new dt($, 75e-4, 3, 64, Ie * Math.PI * 2);
      return le.rotateY(Math.PI / 2), le.rotateX(Math.PI / 2), le;
    }
    function b() {
      const $ = new at();
      return $.setAttribute("position", new Be([0, 0, 0, 1, 1, 1], 3)), $;
    }
    const P = {
      X: [
        [new w(M, a), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(M, a), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new w(v, a), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new w(M, r), [0, 0.5, 0]],
        [new w(M, r), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new w(v, r)]
      ],
      Z: [
        [new w(M, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new w(M, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new w(v, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new kt(0.1, 0), m.clone()), [0, 0, 0]]
      ],
      XY: [
        [new w(new ne(0.15, 0.15, 0.01), u.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ne(0.15, 0.15, 0.01), h.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ne(0.15, 0.15, 0.01), c.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, x = {
      X: [
        [new w(new ce(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(new ce(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new kt(0.2, 0), i)]
      ],
      XY: [
        [new w(new ne(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ne(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ne(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, j = {
      START: [
        [new w(new kt(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new w(new kt(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new Se(b(), n), null, null, null, "helper"]
      ],
      X: [
        [new Se(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Se(f, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Se(f, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, X = {
      XYZE: [
        [new w(E(0.5, 1), S), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new w(E(0.5, 0.5), a)]
      ],
      Y: [
        [new w(E(0.5, 0.5), r), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new w(E(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new w(E(0.75, 1), _), null, [0, Math.PI / 2, 0]]
      ]
    }, _e = {
      AXIS: [
        [new Se(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, Pe = {
      XYZE: [
        [new w(new $s(0.25, 10, 8), i)]
      ],
      X: [
        [new w(new dt(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new w(new dt(0.5, 0.1, 4, 24), i), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new w(new dt(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new w(new dt(0.75, 0.1, 2, 24), i)]
      ]
    }, ct = {
      X: [
        [new w(T, a), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(v, a), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(T, a), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new w(T, r), [0, 0.5, 0]],
        [new w(v, r)],
        [new w(T, r), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new w(T, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new w(v, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new w(T, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new w(new ne(0.15, 0.15, 0.01), u), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ne(0.15, 0.15, 0.01), h), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ne(0.15, 0.15, 0.01), c), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new ne(0.1, 0.1, 0.1), m.clone())]
      ]
    }, Ve = {
      X: [
        [new w(new ce(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new w(new ce(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new w(new ce(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new w(new ne(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new w(new ne(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new w(new ne(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new w(new ne(0.2, 0.2, 0.2), i), [0, 0, 0]]
      ]
    }, me = {
      X: [
        [new Se(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Se(f, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Se(f, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function te($) {
      const Ie = new ot();
      for (const le in $)
        for (let Oe = $[le].length; Oe--; ) {
          const se = $[le][Oe][0].clone(), Le = $[le][Oe][1], ke = $[le][Oe][2], Ue = $[le][Oe][3], Mt = $[le][Oe][4];
          se.name = le, se.tag = Mt, Le && se.position.set(Le[0], Le[1], Le[2]), ke && se.rotation.set(ke[0], ke[1], ke[2]), Ue && se.scale.set(Ue[0], Ue[1], Ue[2]), se.updateMatrix();
          const Pt = se.geometry.clone();
          Pt.applyMatrix4(se.matrix), se.geometry = Pt, se.renderOrder = 1 / 0, se.position.set(0, 0, 0), se.rotation.set(0, 0, 0), se.scale.set(1, 1, 1), Ie.add(se);
        }
      return Ie;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = te(P)), this.add(this.gizmo.rotate = te(X)), this.add(this.gizmo.scale = te(ct)), this.add(this.picker.translate = te(x)), this.add(this.picker.rotate = te(Pe)), this.add(this.picker.scale = te(Ve)), this.add(this.helper.translate = te(j)), this.add(this.helper.rotate = te(_e)), this.add(this.helper.scale = te(me)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const i = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : Wt;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let a = 0; a < n.length; a++) {
      const r = n[a];
      r.visible = !0, r.rotation.set(0, 0, 0), r.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), r.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), r.tag === "helper") {
        r.visible = !1, r.name === "AXIS" ? (r.visible = !!this.axis, this.axis === "X" && (W.setFromEuler(Ht.set(0, 0, 0)), r.quaternion.copy(i).multiply(W), Math.abs(B.copy(wt).applyQuaternion(i).dot(this.eye)) > 0.9 && (r.visible = !1)), this.axis === "Y" && (W.setFromEuler(Ht.set(0, 0, Math.PI / 2)), r.quaternion.copy(i).multiply(W), Math.abs(B.copy(Ye).applyQuaternion(i).dot(this.eye)) > 0.9 && (r.visible = !1)), this.axis === "Z" && (W.setFromEuler(Ht.set(0, Math.PI / 2, 0)), r.quaternion.copy(i).multiply(W), Math.abs(B.copy(St).applyQuaternion(i).dot(this.eye)) > 0.9 && (r.visible = !1)), this.axis === "XYZE" && (W.setFromEuler(Ht.set(0, Math.PI / 2, 0)), B.copy(this.rotationAxis), r.quaternion.setFromRotationMatrix(ws.lookAt(Cs, B, Ye)), r.quaternion.multiply(W), r.visible = this.dragging), this.axis === "E" && (r.visible = !1)) : r.name === "START" ? (r.position.copy(this.worldPositionStart), r.visible = this.dragging) : r.name === "END" ? (r.position.copy(this.worldPosition), r.visible = this.dragging) : r.name === "DELTA" ? (r.position.copy(this.worldPositionStart), r.quaternion.copy(this.worldQuaternionStart), re.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), re.applyQuaternion(this.worldQuaternionStart.clone().invert()), r.scale.copy(re), r.visible = this.dragging) : (r.quaternion.copy(i), this.dragging ? r.position.copy(this.worldPositionStart) : r.position.copy(this.worldPosition), this.axis && (r.visible = this.axis.search(r.name) !== -1));
        continue;
      }
      r.quaternion.copy(i), this.mode === "translate" || this.mode === "scale" ? (r.name === "X" && Math.abs(B.copy(wt).applyQuaternion(i).dot(this.eye)) > 0.99 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "Y" && Math.abs(B.copy(Ye).applyQuaternion(i).dot(this.eye)) > 0.99 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "Z" && Math.abs(B.copy(St).applyQuaternion(i).dot(this.eye)) > 0.99 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "XY" && Math.abs(B.copy(St).applyQuaternion(i).dot(this.eye)) < 0.2 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "YZ" && Math.abs(B.copy(wt).applyQuaternion(i).dot(this.eye)) < 0.2 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "XZ" && Math.abs(B.copy(Ye).applyQuaternion(i).dot(this.eye)) < 0.2 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1)) : this.mode === "rotate" && (Yt.copy(i), B.copy(this.eye).applyQuaternion(W.copy(i).invert()), r.name.search("E") !== -1 && r.quaternion.setFromRotationMatrix(ws.lookAt(this.eye, Cs, Ye)), r.name === "X" && (W.setFromAxisAngle(wt, Math.atan2(-B.y, B.z)), W.multiplyQuaternions(Yt, W), r.quaternion.copy(W)), r.name === "Y" && (W.setFromAxisAngle(Ye, Math.atan2(B.x, B.z)), W.multiplyQuaternions(Yt, W), r.quaternion.copy(W)), r.name === "Z" && (W.setFromAxisAngle(St, Math.atan2(B.y, B.x)), W.multiplyQuaternions(Yt, W), r.quaternion.copy(W))), r.visible = r.visible && (r.name.indexOf("X") === -1 || this.showX), r.visible = r.visible && (r.name.indexOf("Y") === -1 || this.showY), r.visible = r.visible && (r.name.indexOf("Z") === -1 || this.showZ), r.visible = r.visible && (r.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), r.material._color = r.material._color || r.material.color.clone(), r.material._opacity = r.material._opacity || r.material.opacity, r.material.color.copy(r.material._color), r.material.opacity = r.material._opacity, this.enabled && this.axis && (r.name === this.axis || this.axis.split("").some(function(h) {
        return r.name === h;
      })) && (r.material.color.setHex(16776960), r.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class Ma extends w {
  constructor() {
    super(
      new Vs(1e5, 1e5, 2, 2),
      new Ge({ visible: !1, wireframe: !0, side: Pi, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), Bt.copy(wt).applyQuaternion(t === "local" ? this.worldQuaternion : Wt), bt.copy(Ye).applyQuaternion(t === "local" ? this.worldQuaternion : Wt), Et.copy(St).applyQuaternion(t === "local" ? this.worldQuaternion : Wt), B.copy(bt), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            B.copy(this.eye).cross(Bt), we.copy(Bt).cross(B);
            break;
          case "Y":
            B.copy(this.eye).cross(bt), we.copy(bt).cross(B);
            break;
          case "Z":
            B.copy(this.eye).cross(Et), we.copy(Et).cross(B);
            break;
          case "XY":
            we.copy(Et);
            break;
          case "YZ":
            we.copy(Bt);
            break;
          case "XZ":
            B.copy(Et), we.copy(bt);
            break;
          case "XYZ":
          case "E":
            we.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        we.set(0, 0, 0);
    }
    we.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Ss.lookAt(re.set(0, 0, 0), we, B), this.quaternion.setFromRotationMatrix(Ss)), super.updateMatrixWorld(e);
  }
}
class pe extends Ps {
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
      const i = document.querySelector(".clickable");
      t = new ba(this.activeCamera, i), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: pe.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: pe.DRAG_END });
      }), t.addEventListener("dragging-changed", (a) => {
        Me.instance?.toggleOrbitControls(a.value);
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
            value: !0
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
        onUpdate: (a, r) => {
          if (t !== void 0)
            switch (a) {
              case "enabled":
                t.enabled = r;
                break;
              case "visible":
                t.getHelper().visible = r;
                break;
              case "Reset":
                t.reset();
                break;
              case "Mode":
                t.setMode(r);
                break;
              case "Space":
                t.setSpace(r);
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
    return t === void 0 ? !1 : (t.detach(), t.disconnect(), We(t.getHelper()), this.controls.delete(e), !0);
  }
  enabled(e) {
    this.controls.forEach((t) => {
      t.enabled = e;
    });
  }
  updateCamera(e, t) {
    this.activeCamera = e, this.controls.forEach((i) => {
      i.camera !== e && (i.camera = e, e.getWorldPosition(i.cameraPosition), e.getWorldQuaternion(i.cameraQuaternion)), i.domElement !== t && (i.disconnect(), i.domElement = t, i.connect());
    });
  }
  show() {
    this.controls.forEach((e) => {
      const t = e.getHelper(), i = this.visibility.get(t.name);
      i !== void 0 && (t.visible = i);
    });
  }
  hide() {
    this.controls.forEach((e) => {
      const t = e.getHelper();
      this.visibility.set(t.name, t.visible), t.visible = !1;
    });
  }
  static get instance() {
    return pe._instance || (pe._instance = new pe()), pe._instance;
  }
}
const Pa = new ne(), Ei = new ae();
class Da extends ot {
  curve = new $i();
  line;
  draggable;
  curvePos;
  // Variables
  tension = 0.5;
  closed = !1;
  subdivide = 50;
  curveType;
  offset = 1;
  lineMaterial;
  _camera;
  _curvePercentage = 0;
  _draggableScale = 10;
  _transform;
  raycaster;
  draggedMat = new Ge();
  parentGroup;
  group;
  constructor(e, t) {
    const i = new Tt(Ke(0.5, 1, Math.random()), Ke(0.5, 1, Math.random()), Ke(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Di({ color: i }), this.line = new Se(new at(), this.lineMaterial), this.line.name = "line", this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = i, this.draggable = new ot(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new w(new $s(1.5), new Ge({ color: i })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new Vt(), this.raycaster.params.Line.threshold = 3, this.enable();
  }
  enable() {
    document.addEventListener("pointerdown", this.onMouseClick);
  }
  disable() {
    document.removeEventListener("pointerdown", this.onMouseClick);
  }
  dispose = () => {
    this._transform && (this._transform.removeEventListener("objectChange", this.updateSpline), pe.instance.remove(this.name)), this.disable(), this.parentGroup.removeGroup(this.name);
  };
  hideTransform = () => {
    this._transform?.detach();
  };
  exportSpline = () => {
    const e = [];
    this.draggable.children.forEach((t) => {
      e.push([Ot(t.position.x, 3), Ot(t.position.y, 3), Ot(t.position.z, 3)]);
    }), ur({
      name: this.name,
      points: e,
      tension: this.tension,
      closed: this.closed,
      subdivide: this.subdivide,
      type: this.curveType
    }), console.log("Spline copied!");
  };
  showPoints = (e = !0) => {
    this.draggable.visible = e;
  };
  // Modifiers
  addPoints = (e = []) => {
    if (e.length > 0) {
      const t = e.length - 1;
      for (let i = 0; i < t; i++)
        this.addPoint(e[i], !1);
      this.addPoint(e[t]);
    } else
      this.addPoint(new O(-50, 0, 0), !1), this.addPoint(new O(50, 0, 0));
  };
  addPoint = (e, t = !0) => {
    const i = this.draggable.children.length, n = new w(Pa, this.draggedMat);
    return n.name = `point_${i}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), t && this.updateSpline(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = new O(
      Ke(-this.offset, this.offset, Math.random()),
      Ke(-this.offset, this.offset, Math.random()),
      Ke(-this.offset, this.offset, Math.random())
    );
    e > 0 && t.add(this.draggable.children[e - 1].position);
    const i = this.addPoint(t);
    this._transform?.attach(i), this.group.current?.setField("Current Point", i.position);
  };
  removePoint = (e) => {
    if (this._transform?.object === e) {
      this._transform?.detach();
      const t = this.draggable.children[this.draggable.children.length - 1];
      this._transform?.attach(t), this.group.current?.setField("Current Point", t.position);
    }
    We(e), this.updateSpline();
  };
  removePointAt = (e) => {
    const t = this.draggable.children[e];
    this.removePoint(t);
  };
  removeSelectedPt = () => {
    this._transform?.object !== void 0 && this.removePoint(this._transform?.object);
  };
  updateSpline = () => {
    this.curve = new $i(this.points, this.closed, this.curveType, this.tension), this.line.geometry.setFromPoints(this.getPoints()), this.curvePos.position.copy(this.getPointAt(this._curvePercentage));
  };
  // Handlers
  onMouseClick = (e) => {
    if (!Me.instance)
      return;
    const i = Me.instance.currentWindow.current.getBoundingClientRect();
    Ei.x = (e.clientX - i.x) / i.width * 2 - 1, Ei.y = -((e.clientY - i.y) / i.height) * 2 + 1, this.raycaster.setFromCamera(Ei, this.camera);
    const n = this.raycaster.intersectObjects(this.draggable.children, !1);
    if (n.length > 0) {
      const a = n[0].object;
      a !== this._transform?.object && (this._transform?.attach(a), this.group.current?.setField("Current Point", a.position));
    }
  };
  // Getters
  getPointAt(e) {
    return this.curve.getPointAt(e);
  }
  getPoints() {
    return this.curve.getPoints(this.subdivide);
  }
  getTangentAt(e) {
    return this.curve.getTangentAt(e);
  }
  get points() {
    const e = [];
    return this.draggable.children.forEach((t) => {
      e.push(t.position);
    }), e;
  }
  get total() {
    return this.draggable.children.length;
  }
  get draggableScale() {
    return this._draggableScale;
  }
  set draggableScale(e) {
    this._draggableScale = e, this.draggable.children.forEach((t) => t.scale.setScalar(e)), this.curvePos.scale.setScalar(e);
  }
  get camera() {
    return this._camera;
  }
  set camera(e) {
    this._camera = e, this._transform !== void 0 && (this._transform.camera = e);
  }
  get curvePercentage() {
    return this._curvePercentage;
  }
  set curvePercentage(e) {
    this._curvePercentage = e, this.curvePos.position.copy(this.getPointAt(e));
  }
  // Debug
  onUpdateTransform = () => {
    if (this._transform?.object && this.group) {
      const e = this._transform?.object;
      e.name.search("point") > -1 && this.group.current?.setField("Current Point", e.position);
    }
    this.updateSpline();
  };
  initDebug(e) {
    const t = this.draggable.children;
    this.parentGroup = e, this._transform = pe.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), this._transform.attach(t.length > 0 ? t[t.length - 1] : this), Me.instance?.scene.add(this._transform.getHelper());
    const i = t.length > 0 ? t[t.length - 1].position : { x: 0, y: 0, z: 0 };
    this.group = e.addGroup({
      title: this.name,
      items: [
        {
          prop: "Closed",
          type: "boolean",
          value: this.closed
        },
        {
          prop: "Visible",
          type: "boolean",
          value: this.visible
        },
        {
          prop: "Show Position",
          type: "boolean",
          value: this.curvePos.visible
        },
        {
          prop: "Show Points",
          type: "boolean",
          value: this.draggable.visible
        },
        {
          prop: "Color",
          type: "color",
          value: `#${this.draggedMat.color.getHexString()}`
        },
        {
          prop: "Curve",
          type: "option",
          options: [
            {
              title: "Catmullrom",
              value: "catmullrom"
            },
            {
              title: "Centripetal",
              value: "centripetal"
            },
            {
              title: "Chordal",
              value: "chordal"
            }
          ]
        },
        {
          prop: "Draggable Scale",
          type: "range",
          min: 0.01,
          max: 100,
          step: 0.01,
          value: this._draggableScale
        },
        {
          prop: "Subdivide",
          type: "range",
          min: 1,
          max: 100,
          step: 1,
          value: this.subdivide
        },
        {
          prop: "Tension",
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: this.tension
        },
        {
          prop: "New Pt Offset",
          type: "range",
          min: 0,
          max: 10,
          value: this.offset
        },
        {
          prop: "Curve At",
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: 0
        },
        {
          prop: "Add Point",
          type: "button"
        },
        {
          prop: "Remove Point",
          type: "button"
        },
        {
          prop: "Export",
          type: "button"
        },
        {
          prop: "Delete",
          type: "button"
        },
        {
          prop: "Current Point",
          type: "grid3",
          value: i
        }
      ],
      onUpdate: (n, a) => {
        switch (n) {
          case "Closed":
            this.closed = a, this.updateSpline();
            break;
          case "Visible":
            this.visible = a;
            break;
          case "Color":
            this.lineMaterial.color.setStyle(a), this.draggedMat.color.setStyle(a);
            break;
          case "Curve":
            this.curveType = a, this.updateSpline();
            break;
          case "Draggable Scale":
            this.draggableScale = a;
            break;
          case "Subdivide":
            this.subdivide = a, this.updateSpline();
            break;
          case "Tension":
            this.tension = a, this.updateSpline();
            break;
          case "New Pt Offset":
            this.offset = a;
            break;
          case "Curve At":
            this.curvePos.position.copy(this.getPointAt(a));
            break;
          case "Show Position":
            this.curvePos.visible = a;
            break;
          case "Show Points":
            this.draggable.visible = a;
            break;
          case "Add Point":
            this.addNextPt();
            break;
          case "Remove Point":
            this.removeSelectedPt();
            break;
          case "Export":
            this.exportSpline();
            break;
          case "Delete":
            We(this);
            break;
          case "Current Point":
            if (this.group.current && this._transform?.object) {
              const r = this._transform?.object;
              r.name.search("point") > -1 && (r.position.copy(a), this.updateSpline());
            }
            break;
        }
      }
    }), this.draggable.children.forEach((n) => {
      this.debugPoint(n);
    });
  }
  debugPoint = (e) => {
    e.name, e.visible = this.draggable.visible;
  };
}
let xs = 0;
class Ra extends ot {
  defaultScale = 10;
  _camera;
  group = null;
  constructor(e) {
    super(), this.name = "Spline Editor", this._camera = e;
  }
  initDebug() {
    this.group = q.addEditorGroup({
      title: this.name,
      items: [
        {
          type: "button",
          prop: "New Spline"
        },
        {
          type: "boolean",
          prop: "Show Points",
          value: !0
        },
        {
          type: "boolean",
          prop: "Visible",
          value: this.visible
        },
        {
          type: "range",
          prop: "Default Scale",
          min: 0,
          max: 50,
          step: 0.01,
          value: this.defaultScale
        }
      ],
      onUpdate: (e, t) => {
        switch (e) {
          case "New Spline":
            this.createSpline();
            break;
          case "Show Points":
            this.showPoints(t);
            break;
          case "Visible":
            this.visible = t;
            break;
          case "Default Scale":
            this.defaultScale = t;
            break;
        }
      }
    });
  }
  dispose() {
    q.removeEditorGroup(this.name);
  }
  createSpline = (e = []) => {
    const t = `Spline ${xs + 1}`, i = new Da(t, this._camera);
    return i.draggableScale = this.defaultScale, i.addPoints(e), i.hideTransform(), this.group?.current !== null && i.initDebug(this.group.current), this.add(i), xs++, i;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((i) => {
      t.push(new O(i[0], i[1], i[2]));
    }), this.createSpline(t);
  };
  createSplineFromCurve = (e) => this.createSpline(e.points);
  createSplineFromJSON = (e) => {
    const t = this.createSplineFromArray(e.points);
    return t.name = e.name, t.closed = e.closed, t.subdivide = e.subdivide, t.tension = e.tension, t.type = e.type, t.updateSpline(), t;
  };
  showPoints = (e = !0) => {
    this.children.forEach((t) => {
      t.showPoints(e);
    });
  };
  get camera() {
    return this._camera;
  }
  set camera(e) {
    this._camera = e, this.children.forEach((t) => {
      const i = t;
      i.camera = e;
    });
  }
}
const Os = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
];
class Me extends Kt {
  static instance = null;
  scene = new Ms();
  renderer;
  currentScene;
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  helpersContainer = new qn();
  grid = new _a();
  axisHelper = new Qi(500);
  interactionHelper = new Qi(100);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial = new Kn();
  normalsMaterial = new Jn();
  uvMaterial = new ya();
  wireframeMaterial = new Ge({
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
  raycaster = new Vt();
  pointer = new ae();
  cameraControls = void 0;
  // References
  canvasRef;
  containerRef;
  tlWindow;
  trWindow;
  blWindow;
  brWindow;
  constructor(e) {
    super(e), this.canvasRef = Ae(), this.containerRef = Ae(), this.tlWindow = Ae(), this.trWindow = Ae(), this.blWindow = Ae(), this.brWindow = Ae();
    const t = e.three.app.appID, i = localStorage, n = i.getItem(`${t}_mode`);
    this.state = {
      mode: n !== null ? n : "Single",
      modeOpen: !1,
      renderModeOpen: !1,
      interactionMode: "Orbit",
      interactionModeOpen: !1,
      lastUpdate: Date.now()
    }, i.setItem(`${t}_mode`, this.state.mode), i.setItem(`${t}_tlCam`, i.getItem(`${t}_tlCam`) !== null ? i.getItem(`${t}_tlCam`) : "Debug"), i.setItem(`${t}_trCam`, i.getItem(`${t}_trCam`) !== null ? i.getItem(`${t}_trCam`) : "Orthographic"), i.setItem(`${t}_blCam`, i.getItem(`${t}_blCam`) !== null ? i.getItem(`${t}_blCam`) : "Front"), i.setItem(`${t}_brCam`, i.getItem(`${t}_brCam`) !== null ? i.getItem(`${t}_brCam`) : "Top"), i.setItem(`${t}_tlRender`, i.getItem(`${t}_tlRender`) !== null ? i.getItem(`${t}_tlRender`) : "Renderer"), i.setItem(`${t}_trRender`, i.getItem(`${t}_trRender`) !== null ? i.getItem(`${t}_trRender`) : "Renderer"), i.setItem(`${t}_blRender`, i.getItem(`${t}_blRender`) !== null ? i.getItem(`${t}_blRender`) : "Renderer"), i.setItem(`${t}_brRender`, i.getItem(`${t}_brRender`) !== null ? i.getItem(`${t}_brRender`) : "Renderer");
    const a = {
      Vector2: ae,
      Vector3: O,
      Vector4: lr,
      Quaternion: fe,
      Matrix4: qt,
      Spherical: wi,
      Box3: cr,
      Sphere: hr,
      Raycaster: Vt
    };
    xe.install({ THREE: a }), this.setupScene(), this.setupTools(), Me.instance = this;
  }
  componentDidMount() {
    this.setupRenderer(), this.enable(), this.assignControls(), this.resize(), this.play(), pe.instance.three = this.props.three, pe.instance.activeCamera = this.debugCamera;
  }
  componentDidUpdate(e, t, i) {
    t.mode !== this.state.mode && (this.assignControls(), this.resize());
  }
  componentWillUnmount() {
    this.disable();
  }
  render() {
    const e = [];
    return this.cameras.forEach((t, i) => {
      e.push(i);
    }), /* @__PURE__ */ d.jsxs("div", { className: "multiview", children: [
      /* @__PURE__ */ d.jsx("canvas", { ref: this.canvasRef }),
      /* @__PURE__ */ d.jsxs("div", { className: `cameras ${this.state.mode === "Single" || this.state.mode === "Stacked" ? "single" : ""}`, ref: this.containerRef, children: [
        this.state.mode === "Single" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx(
          Fe,
          {
            name: "tl",
            camera: this.tlCam,
            options: e,
            ref: this.tlWindow,
            onSelectCamera: (t) => {
              this.controls.get(this.tlCam.name)?.dispose();
              const i = this.cameras.get(t);
              i !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = i, localStorage.setItem(`${this.appID}_tlCam`, i.name), this.createControls(i, this.tlWindow.current));
            },
            onSelectRenderMode: (t) => {
              this.tlRender = t, localStorage.setItem(`${this.appID}_tlRender`, t);
            }
          }
        ) }),
        (this.state.mode === "Side by Side" || this.state.mode === "Stacked") && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            Fe,
            {
              name: "tl",
              camera: this.tlCam,
              options: e,
              ref: this.tlWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.tlCam.name)?.dispose();
                const i = this.cameras.get(t);
                i !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = i, localStorage.setItem(`${this.appID}_tlCam`, i.name), this.createControls(i, this.tlWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.tlRender = t, localStorage.setItem(`${this.appID}_tlRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Fe,
            {
              name: "tr",
              camera: this.trCam,
              options: e,
              ref: this.trWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.trCam.name)?.dispose();
                const i = this.cameras.get(t);
                i !== void 0 && (this.clearCamera(this.trCam), this.trCam = i, localStorage.setItem(`${this.appID}_trCam`, i.name), this.createControls(i, this.trWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.trRender = t, localStorage.setItem(`${this.appID}_trRender`, t);
              }
            }
          )
        ] }),
        this.state.mode === "Quad" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            Fe,
            {
              name: "tl",
              camera: this.tlCam,
              options: e,
              ref: this.tlWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.tlCam.name)?.dispose();
                const i = this.cameras.get(t);
                i !== void 0 && (this.clearCamera(this.tlCam), this.tlCam = i, localStorage.setItem(`${this.appID}_tlCam`, i.name), this.createControls(i, this.tlWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.tlRender = t, localStorage.setItem(`${this.appID}_tlRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Fe,
            {
              name: "tr",
              camera: this.trCam,
              options: e,
              ref: this.trWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.trCam.name)?.dispose();
                const i = this.cameras.get(t);
                i !== void 0 && (this.clearCamera(this.trCam), this.trCam = i, localStorage.setItem(`${this.appID}_trCam`, i.name), this.createControls(i, this.trWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.trRender = t, localStorage.setItem(`${this.appID}_trRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Fe,
            {
              name: "bl",
              camera: this.blCam,
              options: e,
              ref: this.blWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.blCam.name)?.dispose();
                const i = this.cameras.get(t);
                i !== void 0 && (this.clearCamera(this.blCam), this.blCam = i, localStorage.setItem(`${this.appID}_blCam`, i.name), this.createControls(i, this.blWindow.current));
              },
              onSelectRenderMode: (t) => {
                this.blRender = t, localStorage.setItem(`${this.appID}_blRender`, t);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Fe,
            {
              name: "br",
              camera: this.brCam,
              options: e,
              ref: this.brWindow,
              onSelectCamera: (t) => {
                this.controls.get(this.brCam.name)?.dispose();
                const i = this.cameras.get(t);
                i !== void 0 && (this.clearCamera(this.brCam), this.brCam = i, localStorage.setItem(`${this.appID}_brCam`, i.name), this.createControls(i, this.brWindow.current));
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
          Qt,
          {
            title: "View",
            index: Os.indexOf(this.state.mode),
            options: Os,
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
          Qt,
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
    this.renderer = new er({
      canvas: this.canvasRef.current,
      stencil: !1
    }), this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setClearColor(0), this.props.three.renderer = this.renderer;
  }
  setupScene() {
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.helpersContainer.add(this.grid), this.axisHelper.name = "axisHelper", this.helpersContainer.add(this.axisHelper), this.interactionHelper.name = "interactionHelper", this.helpersContainer.add(this.interactionHelper), this.interactionHelper.visible = !1;
    const e = (n, a) => {
      const r = new Ci(-100, 100, 100, -100, 50, 5e3);
      return r.name = n, r.position.copy(a), r.lookAt(0, 0, 0), this.cameras.set(n, r), r;
    };
    e("Top", new O(0, 1e3, 0)), e("Bottom", new O(0, -1e3, 0)), e("Left", new O(-1e3, 0, 0)), e("Right", new O(1e3, 0, 0)), e("Front", new O(0, 0, 1e3)), e("Back", new O(0, 0, -1e3)), e("Orthographic", new O(1e3, 1e3, 1e3)), e("UI", new O()), this.debugCamera = new ci(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const t = localStorage, i = this.props.three.app.appID;
    this.tlCam = this.cameras.get(t.getItem(`${i}_tlCam`)), this.trCam = this.cameras.get(t.getItem(`${i}_trCam`)), this.blCam = this.cameras.get(t.getItem(`${i}_blCam`)), this.brCam = this.cameras.get(t.getItem(`${i}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  setupTools() {
    this.splineEditor = new Ra(this.currentCamera), this.splineEditor.initDebug(), this.scene.add(this.splineEditor);
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
    e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), R.addEventListener(D.SET_SCENE, this.sceneUpdate), R.addEventListener(D.ADD_CAMERA, this.addCamera), R.addEventListener(D.REMOVE_CAMERA, this.removeCamera), R.addEventListener(D.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const e = this.containerRef.current;
    e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), R.removeEventListener(D.SET_SCENE, this.sceneUpdate), R.removeEventListener(D.ADD_CAMERA, this.addCamera), R.removeEventListener(D.REMOVE_CAMERA, this.removeCamera), R.removeEventListener(D.SET_OBJECT, this.onSetSelectedItem);
  }
  resize = () => {
    this.width = window.innerWidth - 300, this.height = window.innerHeight;
    const e = Math.floor(this.width / 2), t = Math.floor(this.height / 2);
    this.props.three.resize(this.width, this.height), this.props.onSceneResize !== void 0 && this.sceneSet && this.currentScene !== void 0 && this.props.onSceneResize(this.currentScene, this.width, this.height);
    let i = this.width, n = this.height;
    switch (this.state.mode) {
      case "Side by Side":
        i = e, n = this.height;
        break;
      case "Stacked":
        i = this.width, n = t;
        break;
      case "Quad":
        i = e, n = t;
        break;
    }
    const a = i / n;
    this.cameras.forEach((r) => {
      r instanceof Ci ? (r.left = i / -2, r.right = i / 2, r.top = n / 2, r.bottom = n / -2, r.name === "UI" && (r.position.x = this.width / 2, r.position.y = this.height / -2, r.position.z = 100), r.updateProjectionMatrix()) : r instanceof ci && (r.aspect = a, r.updateProjectionMatrix(), this.cameraHelpers.get(r.name)?.update());
    });
  };
  sceneUpdate = (e) => {
    this.helpersContainer.add(this.axisHelper), this.clearLightHelpers(), this.scene.remove(this.currentScene), We(this.currentScene);
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const i = new t();
      this.props.onSceneSet !== void 0 && this.props.onSceneSet(i), this.currentScene = i, this.props.three.scene = this.currentScene, this.scene.add(this.currentScene), this.sceneSet = !0, this.addLightHelpers();
    }
  };
  addCamera = (e) => {
    const t = e.value, i = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (i !== void 0 && this.cameras.set(t.name, i), i instanceof ci) {
      const n = new tr(i);
      this.cameraHelpers.set(i.name, n), this.scene.add(n);
    }
    this.setState({ lastUpdate: Date.now() });
  };
  removeCamera = (e) => {
    const t = this.cameraHelpers.get(e.value.name);
    t !== void 0 && (this.scene.remove(t), t.dispose()), this.cameras.delete(e.value.name), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new ae();
    this.renderer.getSize(t);
    const i = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = qe(i, 0, t.x, -1, 1), this.pointer.y = qe(n, 0, t.y, 1, -1);
    const a = t.x / 2, r = t.y / 2, o = () => {
      i < a ? this.pointer.x = qe(i, 0, a, -1, 1) : this.pointer.x = qe(i, a, t.x, -1, 1);
    }, h = () => {
      n < r ? this.pointer.y = qe(n, 0, r, 1, -1) : this.pointer.y = qe(n, r, t.y, 1, -1);
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
    if (this.updateCamera(i, n, a, r), this.state.interactionMode === "Orbit")
      return;
    const c = this.raycaster.intersectObjects(this.currentScene.children);
    c.length > 0 && this.interactionHelper.position.copy(c[0].point);
  };
  onClick = (e) => {
    if (this.state.interactionMode === "Orbit")
      return;
    const t = new ae();
    if (this.renderer.getSize(t), e.clientX >= t.x)
      return;
    this.onMouseMove(e);
    const i = this.raycaster.intersectObjects(this.currentScene.children);
    i.length > 0 && (this.props.three.getObject(i[0].object.uuid), this.interactionHelper.visible = !1, this.setState({ interactionMode: "Orbit", lastUpdate: Date.now() }));
  };
  onKey = (e) => {
    if (this.selectedItem !== void 0) {
      if (e.ctrlKey) {
        if (this.currentCamera.name === "UI")
          return;
        const t = this.controls.get(this.currentCamera.name);
        e.key === "0" ? (this.clearControls(), this.cameraControls = new xe(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof w || this.selectedItem instanceof ir ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (this.clearControls(), this.cameraControls = new xe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (this.clearControls(), this.cameraControls = new xe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (this.clearControls(), this.cameraControls = new xe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (this.clearControls(), this.cameraControls = new xe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (this.clearControls(), this.cameraControls = new xe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(cs(45), cs(45), !0), this.updateCameraControls(t));
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
    this.selectedItem = this.currentScene.getObjectByProperty("uuid", e.value.uuid), this.selectedItem !== void 0 && (this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), pe.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = pe.instance.add(e.value.name), this.currentTransform.attach(this.selectedItem), this.scene.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform));
  };
  onUpdateTransform = () => {
    this.selectedItem !== void 0 && (this.props.three.updateObject(this.selectedItem.uuid, "position", this.selectedItem.position), this.props.three.updateObject(this.selectedItem.uuid, "rotation", {
      x: this.selectedItem.rotation.x,
      y: this.selectedItem.rotation.y,
      z: this.selectedItem.rotation.z
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), ei.instance.update());
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
            t = new ar(e, 100), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new rr(e, 250), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new Qr(e), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new nr(e, 100), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new sr(e), t.name = `${e.name}Helper`, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const i = this.controls.get(e.name);
    if (i !== void 0 && i.dispose(), this.controls.delete(e.name), e.name === "UI")
      return;
    const n = new Kr(e, t);
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
    const i = this.controls.get(e.name);
    i !== void 0 && (i.dispose(), this.controls.delete(e.name));
  }
  killControls() {
    this.controls.forEach((e, t) => {
      e.dispose();
      const i = this.cameraHelpers.get(t);
      i !== void 0 && (this.scene.remove(i), i.dispose()), this.cameraHelpers.delete(t), this.controls.delete(t);
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
  updateCamera = (e, t, i, n) => {
    switch (this.state.mode) {
      case "Quad":
        t < n ? e < i ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam : e < i ? this.currentCamera = this.blCam : this.currentCamera = this.brCam;
        break;
      case "Side by Side":
        e < i ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam;
        break;
      case "Single":
        this.currentCamera = this.tlCam;
        break;
      case "Stacked":
        t < n ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam;
        break;
    }
    this.splineEditor.camera = this.currentCamera, this.raycaster.setFromCamera(this.pointer, this.currentCamera), this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), pe.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (e, t = !1) => {
    if (this.selectedItem === void 0)
      return;
    cancelAnimationFrame(this.rafID), this.rafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const i = 0.15, n = new or();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const a = () => {
      const r = n.getDelta();
      this.cameraControls && this.cameraControls.update(r), t && (e.target.lerp(e.target0, i), e.object.position.lerp(e.position0, i), e.object.zoom = Si(e.object.zoom, e.zoom0, i), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.rafID), this.rafID = -1, this.clearControls()) : this.rafID = requestAnimationFrame(a);
    };
    a();
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
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), i = Math.floor(this.width / 2), n = Math.floor(this.height / 2);
    if (this.scene.overrideMaterial = e, this.state.mode === "Side by Side")
      this.renderer?.setViewport(0, 0, i, this.height), this.renderer?.setScissor(0, 0, i, this.height), this.renderer?.render(this.scene, this.tlCam), this.scene.overrideMaterial = t, this.renderer?.setViewport(i, 0, i, this.height), this.renderer?.setScissor(i, 0, i, this.height), this.renderer?.render(this.scene, this.trCam);
    else {
      const a = this.height - n;
      this.renderer?.setViewport(0, a, this.width, n), this.renderer?.setScissor(0, a, this.width, n), this.renderer?.render(this.scene, this.tlCam), this.scene.overrideMaterial = t, this.renderer?.setViewport(0, 0, this.width, n), this.renderer?.setScissor(0, 0, this.width, n), this.renderer?.render(this.scene, this.trCam);
    }
  };
  drawQuad = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), i = this.getSceneOverride(this.blRender), n = this.getSceneOverride(this.brRender), a = Math.floor(this.width / 2), r = Math.floor(this.height / 2);
    let o = 0, h = 0;
    h = this.height - r, o = 0, this.scene.overrideMaterial = e, this.renderer?.setViewport(o, h, a, r), this.renderer?.setScissor(o, h, a, r), this.renderer?.render(this.scene, this.tlCam), o = a, this.scene.overrideMaterial = t, this.renderer?.setViewport(o, h, a, r), this.renderer?.setScissor(o, h, a, r), this.renderer?.render(this.scene, this.trCam), h = 0, o = 0, this.scene.overrideMaterial = i, this.renderer?.setViewport(o, h, a, r), this.renderer?.setScissor(o, h, a, r), this.renderer?.render(this.scene, this.blCam), o = a, this.scene.overrideMaterial = n, this.renderer?.setViewport(o, h, a, r), this.renderer?.setScissor(o, h, a, r), this.renderer?.render(this.scene, this.brCam);
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
class ei extends Kt {
  static instance;
  matrix = new qt();
  position = new O();
  rotation = new Xs();
  scale = new O();
  open = !1;
  constructor(e) {
    super(e), this.state = {
      lastUpdated: 0,
      expanded: !1
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), ei.instance = this;
  }
  update() {
    if (Me.instance) {
      const e = Me.instance.selectedItem;
      if (e === void 0)
        return;
      this.position.copy(e.position), this.rotation.copy(e.rotation), this.scale.copy(e.scale), this.setState({ lastUpdated: Date.now() });
    }
  }
  render() {
    return /* @__PURE__ */ d.jsx(
      be,
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
            value: this.props.object.visible,
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
  updateTransform = (e, t) => {
    const i = e === "rotation" ? { x: t._x, y: t._y, z: t._z } : t;
    this.props.three.updateObject(this.props.object.uuid, e, i);
    const n = this.props.three.getScene(this.props.object.uuid);
    if (n) {
      const a = n.getObjectByProperty("uuid", this.props.object.uuid);
      K(a, e, i);
    }
  };
}
function Ts(s) {
  switch (s) {
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
  return s;
}
function Aa(s, e) {
  const t = [];
  if (s.lightInfo !== void 0)
    for (const i in s.lightInfo) {
      const n = s.lightInfo[i];
      n !== void 0 && (n.isColor !== void 0 ? t.push({
        title: Ts(i),
        prop: i,
        type: "color",
        value: n,
        onChange: (a, r) => {
          const o = new Tt(r);
          e.updateObject(s.uuid, a, o);
          const h = e.getScene(s.uuid);
          if (h !== null) {
            const c = h.getObjectByProperty("uuid", s.uuid);
            K(c, a, o);
          }
        }
      }) : t.push({
        title: Ts(i),
        prop: i,
        type: typeof n,
        value: n,
        step: typeof n == "number" ? 0.01 : void 0,
        onChange: (a, r) => {
          e.updateObject(s.uuid, a, r);
          const o = e.getScene(s.uuid);
          if (o !== null) {
            const h = o.getObjectByProperty("uuid", s.uuid);
            K(h, a, r);
          }
        }
      }));
    }
  return /* @__PURE__ */ d.jsx(
    be,
    {
      title: "Light",
      items: t
    }
  );
}
function Ia(s, e) {
  const t = [], i = [];
  let n = 0;
  s.animations.forEach((r) => {
    n = Math.max(n, r.duration), r.duration > 0 && i.push({
      title: r.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: r.duration,
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
    items: i
  });
  const a = e.getScene(s.uuid);
  if (a !== null) {
    const r = a.getObjectByProperty("uuid", s.uuid);
    let o = !1;
    if (r !== void 0) {
      const h = r.mixer;
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
              h.timeScale = m, e.updateObject(s.uuid, "mixer.timeScale", m);
            }
          }
        ];
        c.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            h.stopAllAction(), e.requestMethod(s.uuid, "stopAllAction", void 0, "mixer");
          }
        }), t.push({
          title: "Mixer",
          items: c
        });
      }
    }
  }
  return /* @__PURE__ */ d.jsx(be, { title: "Animation", items: t });
}
const on = {
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
let ue = { ...on };
function La(s) {
  const [e, t] = G(-1);
  lt(() => {
    function r(h) {
      ue = { ...h.value }, t(Date.now());
    }
    function o() {
      ue = { ...on }, t(Date.now());
    }
    return R.addEventListener(D.SET_SCENE, o), R.addEventListener(D.SET_OBJECT, r), () => {
      R.removeEventListener(D.SET_SCENE, o), R.removeEventListener(D.SET_OBJECT, r);
    };
  }, []);
  const i = ue.type.toLowerCase(), n = ue.animations.length > 0 || ue.mixer !== void 0, a = i.search("mesh") > -1 || i.search("line") > -1 || i.search("points") > -1;
  return /* @__PURE__ */ d.jsx($t, { label: "Inspector", children: /* @__PURE__ */ d.jsx("div", { id: "Inspector", className: s.class, children: ue.uuid.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(
        Gt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ue.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Gt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ue.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Gt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ue.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(ei, { object: ue, three: s.three }),
      n ? Ia(ue, s.three) : null,
      i.search("camera") > -1 ? $r(ue, s.three) : null,
      i.search("light") > -1 ? Aa(ue, s.three) : null,
      a ? Wr(ue, s.three) : null
    ] })
  ] }) }, e) }, "Inspector");
}
function ka(s) {
  const [e] = G([]), [t] = G([]), [i, n] = G(0), a = (h) => {
    const c = h.value;
    e.push(c), t.push(
      /* @__PURE__ */ d.jsx(
        $t,
        {
          label: `Scene: ${c.name}`,
          scene: c,
          open: !0,
          onRefresh: () => {
            s.three.refreshScene(c.name);
          },
          children: /* @__PURE__ */ d.jsx(is, { child: c, scene: c, three: s.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, r = (h) => {
    const c = h.value;
    for (let u = 0; u < e.length; u++)
      if (c.uuid === e[u].uuid) {
        e[u] = c, t[u] = /* @__PURE__ */ d.jsx(
          $t,
          {
            label: `Scene: ${c.name}`,
            scene: c,
            open: !0,
            onRefresh: () => {
              s.three.refreshScene(c.name);
            },
            children: /* @__PURE__ */ d.jsx(is, { child: c, scene: c, three: s.three })
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
  return lt(() => (R.addEventListener(D.ADD_SCENE, a), R.addEventListener(D.REFRESH_SCENE, r), R.addEventListener(D.REMOVE_SCENE, o), () => {
    R.removeEventListener(D.ADD_SCENE, a), R.removeEventListener(D.REFRESH_SCENE, r), R.removeEventListener(D.REMOVE_SCENE, o);
  }), []), /* @__PURE__ */ d.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ d.jsx("div", { className: "scenes", children: t }, i),
    /* @__PURE__ */ d.jsx(La, { three: s.three }),
    /* @__PURE__ */ d.jsx(q, { three: s.three })
  ] });
}
function $a(s) {
  return lt(() => {
    function e(o) {
      let h = null;
      return s.three.scenes.forEach((c) => {
        o.search(c.uuid) > -1 && (h = c);
      }), h;
    }
    const t = (o) => {
      const h = o.value, u = e(h)?.getObjectByProperty("uuid", h);
      u !== void 0 && s.three.setObject(u);
    }, i = (o, h, c) => {
      const m = e(o)?.getObjectByProperty("uuid", o);
      m !== void 0 && K(m, h, c);
    }, n = (o) => {
      const h = o.value, { key: c, value: u, uuid: m } = h;
      i(m, c, u);
    }, a = (o) => {
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
        h.value.src.length > 0 ? en(h.value.src).then((_) => {
          _.offset.set(h.value.offset[0], h.value.offset[1]), _.repeat.set(h.value.repeat[0], h.value.repeat[1]), m(_);
        }) : m(null);
      }
    }, r = (o) => {
      const { key: h, uuid: c, value: u, subitem: m } = o.value, g = e(c)?.getObjectByProperty("uuid", c);
      if (g !== void 0)
        try {
          m !== void 0 ? yr(g, m)[h](u) : g[h](u);
        } catch (S) {
          console.log("Error requesting method:"), console.log(S), console.log(h), console.log(u);
        }
    };
    return R.addEventListener(D.GET_OBJECT, t), R.addEventListener(D.UPDATE_OBJECT, n), R.addEventListener(D.CREATE_TEXTURE, a), R.addEventListener(D.REQUEST_METHOD, r), () => {
      R.removeEventListener(D.GET_OBJECT, t), R.removeEventListener(D.UPDATE_OBJECT, n), R.removeEventListener(D.CREATE_TEXTURE, a), R.removeEventListener(D.REQUEST_METHOD, r);
    };
  }, []), null;
}
function Ua(s) {
  return /* @__PURE__ */ d.jsxs("div", { className: "editor", ref: s.ref, style: s.style, children: [
    /* @__PURE__ */ d.jsx("div", { className: "header", children: s.header }),
    s.children,
    /* @__PURE__ */ d.jsx("div", { className: "footer", children: s.footer })
  ] });
}
function Qa(s) {
  return /* @__PURE__ */ d.jsx(Ua, { children: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      Me,
      {
        three: s.three,
        scenes: s.scenes,
        onSceneResize: s.onSceneResize,
        onSceneSet: s.onSceneSet,
        onSceneUpdate: s.onSceneUpdate
      }
    ),
    /* @__PURE__ */ d.jsx(ka, { three: s.three })
  ] }) });
}
export {
  $t as Accordion,
  Ba as Application,
  Ri as BaseRemote,
  sn as ChildObject,
  is as ContainerObject,
  Or as Draggable,
  xr as DraggableItem,
  Tr as Dropdown,
  Mr as DropdownItem,
  Ua as Editor,
  Zt as ExportTexture,
  La as Inspector,
  Me as MultiView,
  tn as NavButton,
  Za as RemoteComponents,
  Xa as RemoteController,
  Js as RemoteTheatre,
  Va as RemoteThree,
  $a as SceneInspector,
  ka as SidePanel,
  Qa as ThreeEditor,
  D as ToolEvents,
  Xt as capitalize,
  He as clamp,
  Ki as colorToHex,
  ur as copyToClipboard,
  Wa as customizeTheatreElements,
  R as debugDispatcher,
  za as defaultTheatreCallback,
  We as dispose,
  fr as disposeMaterial,
  Ya as disposeTexture,
  Ha as distance,
  Oi as hierarchyUUID,
  mr as isColor,
  Si as mix,
  Ks as noop,
  qi as normalize,
  pr as randomID,
  Ji as resetThreeObjects,
  Ot as round,
  Ga as theatreEditorApp,
  xi as totalThreeObjects
};
