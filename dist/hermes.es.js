import { OrthographicCamera as wi, Scene as Ds, MeshBasicMaterial as Ge, BufferGeometry as lt, Float32BufferAttribute as Ze, Mesh as S, LinearSRGBColorSpace as $i, EventDispatcher as Rs, Texture as In, RepeatWrapping as qi, WebGLRenderTarget as Ln, Color as Mt, FrontSide as kn, BackSide as Is, DoubleSide as Ri, NoBlending as Un, NormalBlending as jn, AdditiveBlending as Nn, SubtractiveBlending as Fn, MultiplyBlending as zn, CustomBlending as Hn, AddEquation as Yn, SubtractEquation as Bn, ReverseSubtractEquation as Vn, MinEquation as Zn, MaxEquation as Wn, ZeroFactor as Ls, OneFactor as ks, SrcColorFactor as Us, OneMinusSrcColorFactor as js, SrcAlphaFactor as Ns, OneMinusSrcAlphaFactor as Fs, DstAlphaFactor as zs, OneMinusDstAlphaFactor as Hs, DstColorFactor as Ys, OneMinusDstColorFactor as Bs, SrcAlphaSaturateFactor as Gn, ConstantColorFactor as Vs, OneMinusConstantColorFactor as Zs, ConstantAlphaFactor as Ws, OneMinusConstantAlphaFactor as Gs, Line as xe, LineBasicMaterial as Ii, Ray as Xn, Plane as Qn, MathUtils as $n, Vector3 as M, Controls as Xs, MOUSE as ot, TOUCH as rt, Quaternion as fe, Spherical as Si, Vector2 as oe, ShaderMaterial as Qs, GLSL3 as qn, PlaneGeometry as $s, Raycaster as Qt, Euler as qs, Matrix4 as Jt, Object3D as ct, CylinderGeometry as de, BoxGeometry as ae, OctahedronGeometry as Ut, SphereGeometry as Ks, TorusGeometry as ut, CatmullRomCurve3 as Ki, Group as Kn, AxesHelper as Ji, MeshDepthMaterial as Jn, MeshNormalMaterial as ea, PerspectiveCamera as pt, WebGLRenderer as ta, CameraHelper as ia, SkinnedMesh as sa, SpotLightHelper as na, PointLightHelper as aa, HemisphereLightHelper as ra, DirectionalLightHelper as oa, Clock as la, Vector4 as ca, Box3 as ha, Sphere as da, SkeletonHelper as ua } from "three";
import Js, { useState as Z, useRef as ee, useEffect as Xe, useMemo as Tt, Component as ei, createRef as Le, forwardRef as pa } from "react";
import { Reorder as en } from "framer-motion";
const tn = () => {
}, Zr = () => {
};
function $t(s) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
function ma(s) {
  const e = JSON.stringify(s);
  return navigator.clipboard.writeText(e), e;
}
function Be(s, e, t) {
  return Math.min(e, Math.max(s, t));
}
function es(s, e, t) {
  return (t - s) / (e - s);
}
function xi(s, e, t) {
  return s * (1 - t) + e * t;
}
function Wr(s, e) {
  const t = s - e;
  return Math.sqrt(t * t);
}
function fa() {
  return Math.round(Math.random() * 1e6).toString();
}
function ga(s) {
  return s.r !== void 0 && s.g !== void 0 && s.b !== void 0;
}
function ts(s) {
  const e = Math.round(s.r * 255), t = Math.round(s.g * 255), i = Math.round(s.b * 255), n = (c) => {
    const l = c.toString(16);
    return l.length === 1 ? "0" + l : l;
  }, r = n(e), a = n(t), o = n(i);
  return "#" + r + a + o;
}
function be(s, e = 1) {
  return Number(s.toFixed(e));
}
let Oi = 0;
const is = () => {
  Oi = 0;
}, Ti = (s) => {
  if (!s)
    return;
  let e = s.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${Oi}`, Oi++), s.parent !== null && s.parent.uuid.length > 0 && (e = `${s.parent.uuid}.${e}`), s.uuid = e, s.isMesh !== void 0) {
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
  s.children.forEach((t) => Ti(t));
}, Gr = (s) => {
  s?.dispose();
}, _a = (s) => {
  s && (Array.isArray(s) ? s.forEach((e) => e.dispose()) : s.dispose());
}, Ae = (s) => {
  if (s) {
    for (; s.children.length > 0; ) {
      const e = s.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : Ae(e);
    }
    if (s.parent && s.parent.remove(s), s.isMesh) {
      const e = s;
      e.geometry?.dispose(), _a(e.material);
    }
    s.dispose !== void 0 && s.dispose();
  }
};
class Wt {
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
        const r = this.canvas.width / n.width, a = this.renderToCanvas(e);
        this.context.drawImage(a, 0, 0, n.width * r, n.height * r);
      }
    }
    return e.repeat.copy(t), e.offset.copy(i), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(e) {
    if (this.material === null) {
      this.camera = new wi(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Ds(), this.material = new Ge();
      const t = new lt();
      t.setAttribute("position", new Ze([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new Ze([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new Ze([0, 0, 2, 0, 0, 2], 2));
      const i = new S(t, this.material);
      this.scene.add(i);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, i = e.colorSpace;
      this.renderer.outputColorSpace = $i, e.colorSpace = $i, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = i;
    }
    return this.renderer.domElement;
  }
}
class Xr {
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
var A = /* @__PURE__ */ ((s) => (s.CUSTOM = "ToolEvents::custom", s.SELECT_DROPDOWN = "ToolEvents::selectDropdown", s.DRAG_UPDATE = "ToolEvents::dragUpdate", s.ADD_SCENE = "ToolEvents::addScene", s.REFRESH_SCENE = "ToolEvents::refreshScene", s.REMOVE_SCENE = "ToolEvents::removeScene", s.SET_SCENE = "ToolEvents::setScene", s.GET_OBJECT = "ToolEvents::getObject", s.SET_OBJECT = "ToolEvents::setObject", s.UPDATE_OBJECT = "ToolEvents::updateObject", s.CREATE_TEXTURE = "ToolEvents::createTexture", s.REQUEST_METHOD = "ToolEvents::requestMethod", s.ADD_CAMERA = "ToolEvents::addCamera", s.REMOVE_CAMERA = "ToolEvents::removeCamera", s.ADD_GROUP = "ToolEvents::addGroup", s.REMOVE_GROUP = "ToolEvents::removeGroup", s.ADD_SPLINE = "ToolEvents::addSpline", s))(A || {});
const D = new Rs();
class Li {
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
class Qr extends Li {
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
        D.dispatchEvent({ type: A.SELECT_DROPDOWN, value: i.data });
        break;
      case "draggableListUpdate":
        D.dispatchEvent({ type: A.DRAG_UPDATE, value: i.data });
        break;
    }
  }
}
function $r(s, e, t) {
  if (s.editor) {
    t.ui.restore(), t.onSelectionChange((a) => {
      a.length < 1 || a.forEach((o) => {
        let c = o.address.sheetId, l = "setSheet", u = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            l = "setSheet", u = {
              sheet: o.address.sheetId
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            l = "setSheetObject", c += `_${o.address.objectKey}`, u = {
              id: c,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
        }
        s.send({ event: l, target: "app", data: u });
      });
    });
    let i = -1;
    const n = () => {
      if (e.activeSheet !== void 0 && i !== e.activeSheet.sequence.position) {
        i = e.activeSheet.sequence.position;
        const a = e.activeSheet;
        s.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: i,
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
function qr() {
  setTimeout(() => {
    const s = document.getElementById("theatrejs-studio-root");
    if (s === null || s.shadowRoot === null)
      return;
    const e = s.shadowRoot.getElementById("pointer-root");
    if (e === null)
      return;
    const t = e.children[0];
    if (t === null)
      return;
    const i = t.children[1];
    i.style.justifyContent = "left";
    try {
      const n = i.children[1];
      for (n.style.transform = "translateX(10px)"; n.children.length > 1; )
        n.removeChild(n.children[0]);
    } catch {
    }
    try {
      const n = t.children[3];
      n.style.top = "0", n.style.right = "300px";
    } catch {
    }
  }, 1e3);
}
class Kr extends Li {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  studio = void 0;
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
    return new Promise((n) => {
      const r = t !== void 0 ? { ...t } : {};
      this.sheet(e, i)?.sequence.play(r).then((a) => n(a)), this.app.send({
        event: "playSheet",
        target: "editor",
        data: {
          sheet: e,
          instance: i,
          value: t
        }
      });
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
  sheetObject(e, t, i, n, r) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = this.sheet(e, r);
    if (a === void 0)
      return;
    const c = `${this.getSheetInstance(e, r)}_${t}`;
    let l = this.sheetObjects.get(c);
    l !== void 0 ? l = a.object(t, { ...i, ...l.value }, { reconfigure: !0 }) : l = a.object(t, i), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, n !== void 0 ? n : tn);
    const u = l.onValuesChange((p) => {
      if (this.app.editor) {
        for (const _ in p) {
          const w = p[_];
          typeof w == "object" && ga(w) && (p[_] = {
            r: w.r,
            g: w.g,
            b: w.b,
            a: w.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: e,
            sheetObject: c,
            values: p
          }
        });
      }
      const m = this.sheetObjectCBs.get(c);
      m !== void 0 && m(p);
    });
    return this.sheetObjectUnsubscribe.set(c, u), l;
  }
  unsubscribe(e) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = e.address.sheetId, i = e.address.objectKey;
    this.sheets.get(t)?.detachObject(i);
    const r = `${t}_${i}`, a = this.sheetObjectUnsubscribe.get(r);
    a !== void 0 && (this.sheetObjects.delete(r), this.sheetObjectCBs.delete(r), this.sheetObjectUnsubscribe.delete(r), a());
  }
  handleApp(e, t, i) {
    const n = t;
    let r;
    switch (i.event) {
      case "setSheet":
        r = n.sheets.get(i.data.sheet), r !== void 0 && (n.activeSheet = r, this.studio?.setSelection([r]));
        break;
      case "setSheetObject":
        r = n.sheetObjects.get(`${i.data.sheet}_${i.data.key}`), r !== void 0 && this.studio?.setSelection([r]);
        break;
      case "updateSheetObject":
        r = n.sheets.get(i.data.sheet), r !== void 0 && r.sequence.pause(), r = n.sheetObjectCBs.get(i.data.sheetObject), r !== void 0 && r(i.data.values);
        break;
      case "updateTimeline":
        r = n.sheets.get(i.data.sheet), n.activeSheet !== void 0 && (n.activeSheet.sequence.position = i.data.position);
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
      this.studio?.ui.restore(), this.studio?.onSelectionChange((a) => {
        a.length < 1 || a.forEach((o) => {
          let c = o.address.sheetId, l = "setSheet", u = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              l = "setSheet", u = {
                sheet: o.address.sheetId
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              l = "setSheetObject", c += `_${o.address.objectKey}`, u = {
                id: c,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
          }
          e.send({ event: l, target: "app", data: u });
        });
      });
      let i = -1;
      const n = () => {
        if (t.activeSheet !== void 0 && i !== t.activeSheet.sequence.position) {
          i = t.activeSheet.sequence.position;
          const a = t.activeSheet;
          e.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: i,
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
function va(s) {
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
function at(s) {
  const e = {
    name: s.name,
    type: s.type,
    uuid: s.uuid,
    children: []
  };
  return s.children.forEach((t) => {
    e.children.push(at(t));
  }), e;
}
function ya(s) {
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
function ba(s) {
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
function Ke(s) {
  const e = {};
  for (const t in s) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || ba(t))
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
          src: Wt.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = ya(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return s.anisotropy !== void 0 && (e.anisotropy = s.anisotropy), s.clearcoat !== void 0 && (e.clearcoat = s.clearcoat), s.iridescence !== void 0 && (e.iridescence = s.iridescence), s.dispersion !== void 0 && (e.dispersion = s.dispersion), s.sheen !== void 0 && (e.sheen = s.sheen), s.transmission !== void 0 && (e.transmission = s.transmission), s.transmission !== void 0 && (e.transmission = s.transmission), e;
}
function di(s) {
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
      i.material.forEach((r) => {
        n.push(Ke(r));
      }), e.material = n;
    } else
      e.material = Ke(i.material);
  } else if (t.search("points") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((r) => {
        n.push(Ke(r));
      }), e.material = n;
    } else
      e.material = Ke(i.material);
  } else if (t.search("line") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((r) => {
        n.push(Ke(r));
      }), e.material = n;
    } else
      e.material = Ke(i.material);
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
function Ea(s, e) {
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
function Ca(s, e) {
  for (const t in e)
    s[t] = e[t];
}
function q(s, e, t) {
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
    let a;
    switch (n) {
      case 1:
        a = s[i[0]];
        break;
      case 2:
        a = s[i[0]][i[1]];
        break;
      case 3:
        a = s[i[0]][i[1]][i[2]];
        break;
      case 4:
        a = s[i[0]][i[1]][i[2]][i[3]];
        break;
      case 5:
        a = s[i[0]][i[1]][i[2]][i[3]][i[4]];
        break;
    }
    a != null && Ca(a, t);
  }
}
function sn(s) {
  return new Promise((e, t) => {
    const i = new Image();
    i.onload = () => {
      const n = new In(i);
      n.wrapS = qi, n.wrapT = qi, n.needsUpdate = !0, e(n);
    }, i.onerror = t, i.src = s;
  });
}
class Jr extends Li {
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((e) => {
      Ae(e);
    }), this.scenes.clear(), this.scene && Ae(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(e) {
    this.app.debugEnabled && (this.renderer !== void 0 && (Wt.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (Wt.renderer = this.renderer);
    const t = di(e);
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
  addSpline(e) {
    setTimeout(() => {
      this.app.send({
        event: "addSpline",
        target: "editor",
        data: JSON.stringify(e.toJSON())
      });
    }, 1);
  }
  // Scenes
  addScene(e) {
    if (e === void 0 || (this.scenes.set(e.name, e), !this.app.debugEnabled))
      return;
    is(), Ti(e);
    const t = at(e);
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
      const i = at(t);
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
    const t = at(e);
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
    this.renderer !== void 0 && (Wt.renderer = this.renderer), is(), Ti(e);
    const t = at(e);
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
    const t = di(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = di(e);
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
        D.dispatchEvent({ type: A.GET_OBJECT, value: i.data });
        break;
      case "updateObject":
        D.dispatchEvent({ type: A.UPDATE_OBJECT, value: i.data });
        break;
      case "createTexture":
        D.dispatchEvent({ type: A.CREATE_TEXTURE, value: i.data });
        break;
      case "requestMethod":
        D.dispatchEvent({ type: A.REQUEST_METHOD, value: i.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: at(n.scenes.get(i.data.name))
        });
        break;
    }
    if (i.event === "updateGroup") {
      const r = JSON.parse(i.data);
      n.groups.get(r.group)?.onUpdate(r.prop, r.value);
    }
  }
  handleEditor(e, t, i) {
    switch (i.event) {
      case "setObject":
        D.dispatchEvent({ type: A.SET_OBJECT, value: i.data });
        break;
      case "addScene":
        D.dispatchEvent({ type: A.ADD_SCENE, value: i.data });
        break;
      case "refreshScene":
        D.dispatchEvent({ type: A.REFRESH_SCENE, value: i.data });
        break;
      case "removeScene":
        D.dispatchEvent({ type: A.REMOVE_SCENE, value: i.data });
        break;
      case "setScene":
        D.dispatchEvent({ type: A.SET_SCENE, value: i.data });
        break;
      case "addCamera":
        D.dispatchEvent({ type: A.ADD_CAMERA, value: i.data });
        break;
      case "removeCamera":
        D.dispatchEvent({ type: A.REMOVE_CAMERA, value: i.data });
        break;
      case "addGroup":
        D.dispatchEvent({ type: A.ADD_GROUP, value: i.data });
        break;
      case "removeGroup":
        D.dispatchEvent({ type: A.REMOVE_GROUP, value: i.data });
        break;
      case "addSpline":
        D.dispatchEvent({ type: A.ADD_SPLINE, value: i.data });
        break;
    }
  }
  // Renderer
  addRT(e, t) {
    const i = new Ln(32, 32, t);
    i.texture.name = e, this.renderTargets.set(e, i);
  }
  resize(e, t) {
    const i = this.dpr;
    this.renderTargets.forEach((n) => {
      n.setSize(e * i, t * i);
    }), this.renderer?.setSize(e, t);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(Be(1, 2, e));
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
var Mi = { exports: {} }, mt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ss;
function wa() {
  if (ss)
    return mt;
  ss = 1;
  var s = Js, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, n = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, c, l) {
    var u, p = {}, m = null, _ = null;
    l !== void 0 && (m = "" + l), c.key !== void 0 && (m = "" + c.key), c.ref !== void 0 && (_ = c.ref);
    for (u in c)
      i.call(c, u) && !r.hasOwnProperty(u) && (p[u] = c[u]);
    if (o && o.defaultProps)
      for (u in c = o.defaultProps, c)
        p[u] === void 0 && (p[u] = c[u]);
    return { $$typeof: e, type: o, key: m, ref: _, props: p, _owner: n.current };
  }
  return mt.Fragment = t, mt.jsx = a, mt.jsxs = a, mt;
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
var ns;
function Sa() {
  return ns || (ns = 1, process.env.NODE_ENV !== "production" && function() {
    var s = Js, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), _ = Symbol.for("react.offscreen"), w = Symbol.iterator, x = "@@iterator";
    function T(h) {
      if (h === null || typeof h != "object")
        return null;
      var y = w && h[w] || h[x];
      return typeof y == "function" ? y : null;
    }
    var g = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(h) {
      {
        for (var y = arguments.length, C = new Array(y > 1 ? y - 1 : 0), I = 1; I < y; I++)
          C[I - 1] = arguments[I];
        E("error", h, C);
      }
    }
    function E(h, y, C) {
      {
        var I = g.ReactDebugCurrentFrame, F = I.getStackAddendum();
        F !== "" && (y += "%s", C = C.concat([F]));
        var Y = C.map(function(U) {
          return String(U);
        });
        Y.unshift("Warning: " + y), Function.prototype.apply.call(console[h], console, Y);
      }
    }
    var b = !1, P = !1, O = !1, j = !1, X = !1, ge;
    ge = Symbol.for("react.module.reference");
    function De(h) {
      return !!(typeof h == "string" || typeof h == "function" || h === i || h === r || X || h === n || h === l || h === u || j || h === _ || b || P || O || typeof h == "object" && h !== null && (h.$$typeof === m || h.$$typeof === p || h.$$typeof === a || h.$$typeof === o || h.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      h.$$typeof === ge || h.getModuleId !== void 0));
    }
    function ht(h, y, C) {
      var I = h.displayName;
      if (I)
        return I;
      var F = y.displayName || y.name || "";
      return F !== "" ? C + "(" + F + ")" : C;
    }
    function Qe(h) {
      return h.displayName || "Context";
    }
    function me(h) {
      if (h == null)
        return null;
      if (typeof h.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
        return h.displayName || h.name || null;
      if (typeof h == "string")
        return h;
      switch (h) {
        case i:
          return "Fragment";
        case t:
          return "Portal";
        case r:
          return "Profiler";
        case n:
          return "StrictMode";
        case l:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof h == "object")
        switch (h.$$typeof) {
          case o:
            var y = h;
            return Qe(y) + ".Consumer";
          case a:
            var C = h;
            return Qe(C._context) + ".Provider";
          case c:
            return ht(h, h.render, "ForwardRef");
          case p:
            var I = h.displayName || null;
            return I !== null ? I : me(h.type) || "Memo";
          case m: {
            var F = h, Y = F._payload, U = F._init;
            try {
              return me(U(Y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var te = Object.assign, Q = 0, ke, he, Me, se, Ue, je, Ne;
    function Pt() {
    }
    Pt.__reactDisabledLog = !0;
    function At() {
      {
        if (Q === 0) {
          ke = console.log, he = console.info, Me = console.warn, se = console.error, Ue = console.group, je = console.groupCollapsed, Ne = console.groupEnd;
          var h = {
            configurable: !0,
            enumerable: !0,
            value: Pt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: h,
            log: h,
            warn: h,
            error: h,
            group: h,
            groupCollapsed: h,
            groupEnd: h
          });
        }
        Q++;
      }
    }
    function cn() {
      {
        if (Q--, Q === 0) {
          var h = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: te({}, h, {
              value: ke
            }),
            info: te({}, h, {
              value: he
            }),
            warn: te({}, h, {
              value: Me
            }),
            error: te({}, h, {
              value: se
            }),
            group: te({}, h, {
              value: Ue
            }),
            groupCollapsed: te({}, h, {
              value: je
            }),
            groupEnd: te({}, h, {
              value: Ne
            })
          });
        }
        Q < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var si = g.ReactCurrentDispatcher, ni;
    function Dt(h, y, C) {
      {
        if (ni === void 0)
          try {
            throw Error();
          } catch (F) {
            var I = F.stack.trim().match(/\n( *(at )?)/);
            ni = I && I[1] || "";
          }
        return `
` + ni + h;
      }
    }
    var ai = !1, Rt;
    {
      var hn = typeof WeakMap == "function" ? WeakMap : Map;
      Rt = new hn();
    }
    function Ui(h, y) {
      if (!h || ai)
        return "";
      {
        var C = Rt.get(h);
        if (C !== void 0)
          return C;
      }
      var I;
      ai = !0;
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Y;
      Y = si.current, si.current = null, At();
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
            } catch (Pe) {
              I = Pe;
            }
            Reflect.construct(h, [], U);
          } else {
            try {
              U.call();
            } catch (Pe) {
              I = Pe;
            }
            h.call(U.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Pe) {
            I = Pe;
          }
          h();
        }
      } catch (Pe) {
        if (Pe && I && typeof Pe.stack == "string") {
          for (var k = Pe.stack.split(`
`), le = I.stack.split(`
`), $ = k.length - 1, K = le.length - 1; $ >= 1 && K >= 0 && k[$] !== le[K]; )
            K--;
          for (; $ >= 1 && K >= 0; $--, K--)
            if (k[$] !== le[K]) {
              if ($ !== 1 || K !== 1)
                do
                  if ($--, K--, K < 0 || k[$] !== le[K]) {
                    var _e = `
` + k[$].replace(" at new ", " at ");
                    return h.displayName && _e.includes("<anonymous>") && (_e = _e.replace("<anonymous>", h.displayName)), typeof h == "function" && Rt.set(h, _e), _e;
                  }
                while ($ >= 1 && K >= 0);
              break;
            }
        }
      } finally {
        ai = !1, si.current = Y, cn(), Error.prepareStackTrace = F;
      }
      var qe = h ? h.displayName || h.name : "", Qi = qe ? Dt(qe) : "";
      return typeof h == "function" && Rt.set(h, Qi), Qi;
    }
    function dn(h, y, C) {
      return Ui(h, !1);
    }
    function un(h) {
      var y = h.prototype;
      return !!(y && y.isReactComponent);
    }
    function It(h, y, C) {
      if (h == null)
        return "";
      if (typeof h == "function")
        return Ui(h, un(h));
      if (typeof h == "string")
        return Dt(h);
      switch (h) {
        case l:
          return Dt("Suspense");
        case u:
          return Dt("SuspenseList");
      }
      if (typeof h == "object")
        switch (h.$$typeof) {
          case c:
            return dn(h.render);
          case p:
            return It(h.type, y, C);
          case m: {
            var I = h, F = I._payload, Y = I._init;
            try {
              return It(Y(F), y, C);
            } catch {
            }
          }
        }
      return "";
    }
    var Lt = Object.prototype.hasOwnProperty, ji = {}, Ni = g.ReactDebugCurrentFrame;
    function kt(h) {
      if (h) {
        var y = h._owner, C = It(h.type, h._source, y ? y.type : null);
        Ni.setExtraStackFrame(C);
      } else
        Ni.setExtraStackFrame(null);
    }
    function pn(h, y, C, I, F) {
      {
        var Y = Function.call.bind(Lt);
        for (var U in h)
          if (Y(h, U)) {
            var k = void 0;
            try {
              if (typeof h[U] != "function") {
                var le = Error((I || "React class") + ": " + C + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw le.name = "Invariant Violation", le;
              }
              k = h[U](y, U, I, C, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch ($) {
              k = $;
            }
            k && !(k instanceof Error) && (kt(F), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", I || "React class", C, U, typeof k), kt(null)), k instanceof Error && !(k.message in ji) && (ji[k.message] = !0, kt(F), v("Failed %s type: %s", C, k.message), kt(null));
          }
      }
    }
    var mn = Array.isArray;
    function ri(h) {
      return mn(h);
    }
    function fn(h) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, C = y && h[Symbol.toStringTag] || h.constructor.name || "Object";
        return C;
      }
    }
    function gn(h) {
      try {
        return Fi(h), !1;
      } catch {
        return !0;
      }
    }
    function Fi(h) {
      return "" + h;
    }
    function zi(h) {
      if (gn(h))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", fn(h)), Fi(h);
    }
    var dt = g.ReactCurrentOwner, _n = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Hi, Yi, oi;
    oi = {};
    function vn(h) {
      if (Lt.call(h, "ref")) {
        var y = Object.getOwnPropertyDescriptor(h, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return h.ref !== void 0;
    }
    function yn(h) {
      if (Lt.call(h, "key")) {
        var y = Object.getOwnPropertyDescriptor(h, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return h.key !== void 0;
    }
    function bn(h, y) {
      if (typeof h.ref == "string" && dt.current && y && dt.current.stateNode !== y) {
        var C = me(dt.current.type);
        oi[C] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', me(dt.current.type), h.ref), oi[C] = !0);
      }
    }
    function En(h, y) {
      {
        var C = function() {
          Hi || (Hi = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        C.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: C,
          configurable: !0
        });
      }
    }
    function Cn(h, y) {
      {
        var C = function() {
          Yi || (Yi = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        C.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: C,
          configurable: !0
        });
      }
    }
    var wn = function(h, y, C, I, F, Y, U) {
      var k = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: h,
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
    function Sn(h, y, C, I, F) {
      {
        var Y, U = {}, k = null, le = null;
        C !== void 0 && (zi(C), k = "" + C), yn(y) && (zi(y.key), k = "" + y.key), vn(y) && (le = y.ref, bn(y, F));
        for (Y in y)
          Lt.call(y, Y) && !_n.hasOwnProperty(Y) && (U[Y] = y[Y]);
        if (h && h.defaultProps) {
          var $ = h.defaultProps;
          for (Y in $)
            U[Y] === void 0 && (U[Y] = $[Y]);
        }
        if (k || le) {
          var K = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          k && En(U, K), le && Cn(U, K);
        }
        return wn(h, k, le, F, I, dt.current, U);
      }
    }
    var li = g.ReactCurrentOwner, Bi = g.ReactDebugCurrentFrame;
    function $e(h) {
      if (h) {
        var y = h._owner, C = It(h.type, h._source, y ? y.type : null);
        Bi.setExtraStackFrame(C);
      } else
        Bi.setExtraStackFrame(null);
    }
    var ci;
    ci = !1;
    function hi(h) {
      return typeof h == "object" && h !== null && h.$$typeof === e;
    }
    function Vi() {
      {
        if (li.current) {
          var h = me(li.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
    }
    function xn(h) {
      {
        if (h !== void 0) {
          var y = h.fileName.replace(/^.*[\\\/]/, ""), C = h.lineNumber;
          return `

Check your code at ` + y + ":" + C + ".";
        }
        return "";
      }
    }
    var Zi = {};
    function On(h) {
      {
        var y = Vi();
        if (!y) {
          var C = typeof h == "string" ? h : h.displayName || h.name;
          C && (y = `

Check the top-level render call using <` + C + ">.");
        }
        return y;
      }
    }
    function Wi(h, y) {
      {
        if (!h._store || h._store.validated || h.key != null)
          return;
        h._store.validated = !0;
        var C = On(y);
        if (Zi[C])
          return;
        Zi[C] = !0;
        var I = "";
        h && h._owner && h._owner !== li.current && (I = " It was passed a child from " + me(h._owner.type) + "."), $e(h), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', C, I), $e(null);
      }
    }
    function Gi(h, y) {
      {
        if (typeof h != "object")
          return;
        if (ri(h))
          for (var C = 0; C < h.length; C++) {
            var I = h[C];
            hi(I) && Wi(I, y);
          }
        else if (hi(h))
          h._store && (h._store.validated = !0);
        else if (h) {
          var F = T(h);
          if (typeof F == "function" && F !== h.entries)
            for (var Y = F.call(h), U; !(U = Y.next()).done; )
              hi(U.value) && Wi(U.value, y);
        }
      }
    }
    function Tn(h) {
      {
        var y = h.type;
        if (y == null || typeof y == "string")
          return;
        var C;
        if (typeof y == "function")
          C = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === p))
          C = y.propTypes;
        else
          return;
        if (C) {
          var I = me(y);
          pn(C, h.props, "prop", I, h);
        } else if (y.PropTypes !== void 0 && !ci) {
          ci = !0;
          var F = me(y);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Mn(h) {
      {
        for (var y = Object.keys(h.props), C = 0; C < y.length; C++) {
          var I = y[C];
          if (I !== "children" && I !== "key") {
            $e(h), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", I), $e(null);
            break;
          }
        }
        h.ref !== null && ($e(h), v("Invalid attribute `ref` supplied to `React.Fragment`."), $e(null));
      }
    }
    function Xi(h, y, C, I, F, Y) {
      {
        var U = De(h);
        if (!U) {
          var k = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (k += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var le = xn(F);
          le ? k += le : k += Vi();
          var $;
          h === null ? $ = "null" : ri(h) ? $ = "array" : h !== void 0 && h.$$typeof === e ? ($ = "<" + (me(h.type) || "Unknown") + " />", k = " Did you accidentally export a JSX literal instead of a component?") : $ = typeof h, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", $, k);
        }
        var K = Sn(h, y, C, F, Y);
        if (K == null)
          return K;
        if (U) {
          var _e = y.children;
          if (_e !== void 0)
            if (I)
              if (ri(_e)) {
                for (var qe = 0; qe < _e.length; qe++)
                  Gi(_e[qe], h);
                Object.freeze && Object.freeze(_e);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Gi(_e, h);
        }
        return h === i ? Mn(K) : Tn(K), K;
      }
    }
    function Pn(h, y, C) {
      return Xi(h, y, C, !0);
    }
    function An(h, y, C) {
      return Xi(h, y, C, !1);
    }
    var Dn = An, Rn = Pn;
    ft.Fragment = i, ft.jsx = Dn, ft.jsxs = Rn;
  }()), ft;
}
process.env.NODE_ENV === "production" ? Mi.exports = wa() : Mi.exports = Sa();
var d = Mi.exports;
function nn(s) {
  return s.title.search("<") > -1 ? /* @__PURE__ */ d.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: s.title } }) : /* @__PURE__ */ d.jsx("button", { children: s.title });
}
const xa = /* @__PURE__ */ d.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ d.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ d.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Oa = /* @__PURE__ */ d.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ d.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Ta(s) {
  return /* @__PURE__ */ d.jsx(en.Item, { value: s.title, children: /* @__PURE__ */ d.jsxs("div", { children: [
    Oa,
    /* @__PURE__ */ d.jsx("span", { children: s.title }),
    /* @__PURE__ */ d.jsx("button", { className: "closeIcon", onClick: () => {
      s.onDelete(s.index);
    }, children: xa })
  ] }) }, s.title);
}
function Ma(s) {
  const [e, t] = Z(!1), [i, n] = Z(s.options), r = (l) => {
    s.onDragComplete(l), n(l);
  }, a = (l) => {
    const u = [...i];
    u.splice(l, 1), r(u);
  }, o = [];
  i.forEach((l, u) => {
    o.push(/* @__PURE__ */ d.jsx(Ta, { index: u, title: l, onDelete: a }, l));
  });
  let c = "dropdown draggable";
  return s.subdropdown && (c += " subdropdown"), /* @__PURE__ */ d.jsxs("div", { className: c, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ d.jsx(nn, { title: s.title }),
    /* @__PURE__ */ d.jsx(en.Group, { axis: "y", values: i, onReorder: r, style: { visibility: e ? "visible" : "hidden" }, children: o })
  ] });
}
function Pa(s) {
  const [e, t] = Z(!1), i = [];
  s.options.map((r, a) => {
    s.onSelect !== void 0 && (r.onSelect = s.onSelect), i.push(/* @__PURE__ */ d.jsx(Aa, { option: r }, a));
  });
  let n = "dropdown";
  return s.subdropdown && (n += " subdropdown"), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ d.jsx(nn, { title: s.title }),
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
function Aa(s) {
  const { option: e } = s, [t, i] = Z("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ d.jsx(
        Ma,
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
        Pa,
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
  return /* @__PURE__ */ d.jsx("li", { className: t === e.title ? "selected" : "", children: n }, fa());
}
function eo(s, e, t) {
  function i(r) {
    switch (e.forEach((a) => {
      a.callback(s, a.remote, r);
    }), r.event) {
      case "custom":
        D.dispatchEvent({ type: A.CUSTOM, value: r.data });
        break;
    }
  }
  function n(r) {
    switch (t.forEach((a) => {
      a.callback(s, a.remote, r);
    }), r.event) {
      case "custom":
        D.dispatchEvent({ type: A.CUSTOM, value: r.data });
        break;
    }
  }
  s.listen = (r) => {
    r.target === "editor" ? n(r) : i(r);
  };
}
function qt(s) {
  const [e, t] = Z(s.open !== void 0 ? s.open : !0), i = !e || s.children === void 0, n = () => {
    D.dispatchEvent({ type: A.REMOVE_SCENE, value: s.scene });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `accordion ${i ? "hide" : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !e;
          s.onToggle !== void 0 && s.onToggle(r), t(r);
        },
        children: [
          /* @__PURE__ */ d.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "label", children: $t(s.label) })
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
function an(s) {
  const e = ee(null), [t, i] = Z(!1), n = s.child !== void 0 && s.child.children.length > 0, r = [];
  return s.child !== void 0 && s.child.children.length > 0 && s.child.children.map((a, o) => {
    r.push(/* @__PURE__ */ d.jsx(an, { child: a, three: s.three }, o));
  }), Xe(() => {
    if (s.child) {
      const a = s.three.getScene(s.child.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", s.child.uuid);
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
              const a = s.three.getScene(s.child.uuid);
              if (a !== null) {
                const o = a.getObjectByProperty("uuid", s.child.uuid);
                if (o !== void 0) {
                  const c = "visible", l = !o.visible;
                  e.current.style.opacity = l ? "1" : "0.25", s.three.updateObject(s.child.uuid, c, l), q(o, c, l);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: `icon ${va(s.child)}` })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ d.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function as(s) {
  const e = [];
  return s.child?.children.map((t, i) => {
    e.push(/* @__PURE__ */ d.jsx(an, { child: t, scene: s.scene, three: s.three }, i));
  }), /* @__PURE__ */ d.jsx("div", { className: `scene ${s.class !== void 0 ? s.class : ""}`, children: e });
}
function Da(s) {
  const [e, t] = Z(s.defaultValue);
  return Xe(() => {
    let i = !1, n = -1, r = 0, a = s.defaultValue, o = !1;
    const c = (w) => {
      o = w.ctrlKey;
    }, l = (w) => {
      i = !0, r = Number(s.input.current?.value), n = w.clientX, document.addEventListener("mouseup", p, !1), document.addEventListener("mousemove", u, !1), document.addEventListener("contextmenu", p, !1);
    }, u = (w) => {
      if (!i)
        return;
      const x = s.step !== void 0 ? s.step : 1, T = (w.clientX - n) * x * (o ? 10 : 1);
      a = Number((r + T).toFixed(4)), s.min !== void 0 && (a = Math.max(a, s.min)), s.max !== void 0 && (a = Math.min(a, s.max)), s.onChange !== void 0 && s.onChange(a), t(a);
    }, p = () => {
      i = !1, document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", u), document.removeEventListener("contextmenu", p);
    }, m = (w) => {
      const x = Number(w.target.value);
      t(x);
    }, _ = (w) => {
      const x = Number(w.target.value);
      s.onChange !== void 0 && s.onChange(x), t(x);
    };
    return s.input.current?.addEventListener("input", m), s.label.current?.addEventListener("mousedown", l, !1), s.sliderRef !== void 0 && s.sliderRef.current?.addEventListener("input", _), document.addEventListener("keydown", c, !1), document.addEventListener("keyup", c, !1), () => {
      s.input.current?.removeEventListener("input", m), s.label.current?.removeEventListener("mousedown", l), s.sliderRef !== void 0 && s.sliderRef.current?.removeEventListener("input", _), document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", u), document.removeEventListener("contextmenu", p), document.removeEventListener("keydown", c), document.addEventListener("keyup", c, !1);
    };
  }, []), e;
}
function We(s) {
  const e = ee(null), t = ee(null), i = Da({
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
          const r = Number(n.target.value);
          s.onChange !== void 0 && s.onChange(s.prop, r);
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
            const r = Number(n.target.value);
            s.onChange !== void 0 && s.onChange(s.prop, r);
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
          onChange: tn
        }
      )
    ] })
  ] });
}
function Ra(s) {
  const e = ee(null), t = ee(null), i = ee(null), n = ee(null), r = ee(null), a = ee(null), [o, c] = Z(s.value), [l, u] = Z({
    min: Math.min(s.min, Math.min(s.value.x, s.value.y)),
    max: Math.max(s.max, Math.max(s.value.x, s.value.y))
  }), [p, m] = Z(!1);
  function _() {
    p || (window.addEventListener("mousemove", x), window.addEventListener("mouseup", w), window.addEventListener("mouseup", w), m(!0));
  }
  function w() {
    window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", w), m(!1);
  }
  function x(b) {
    const P = r.current.getBoundingClientRect(), O = Be(0, 99, b.clientX - P.left) / 99, j = Be(0, 99, b.clientY - P.top) / 99, X = be(xi(l.min, l.max, O), 3), ge = be(xi(l.min, l.max, j), 3);
    s.onChange({ target: { value: { x: X, y: ge } } }), c({ x: X, y: ge });
  }
  function T(b) {
    let P = o.x, O = o.y;
    b.target === e.current ? P = Number(b.target.value) : O = Number(b.target.value), c({ x: P, y: O });
  }
  function g() {
    const b = Number(i.current.value);
    u({ min: b, max: l.max }), (o.x < b || o.y < b) && c({ x: Be(b, l.max, o.x), y: Be(b, l.max, o.y) });
  }
  function v() {
    const b = Number(n.current.value);
    u({ min: l.min, max: b }), (o.x > b || o.y > b) && c({ x: Be(l.min, b, o.x), y: Be(l.min, b, o.y) });
  }
  Xe(() => {
    const b = es(l.min, l.max, o.x), P = es(l.min, l.max, o.y);
    a.current.style.left = `${b * 100}%`, a.current.style.top = `${P * 100}%`;
  }, [l, o]);
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
            min: l.min,
            max: l.max,
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
            min: l.min,
            max: l.max,
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
            value: l.min,
            step: E,
            onChange: g
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
            value: l.max,
            step: E,
            onChange: v
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "input", ref: r, onMouseDown: _, onMouseUp: w, children: [
      /* @__PURE__ */ d.jsx("div", { className: "x" }),
      /* @__PURE__ */ d.jsx("div", { className: "y" }),
      /* @__PURE__ */ d.jsx("div", { className: "pt", ref: a })
    ] })
  ] });
}
const Ia = Math.PI / 180, La = 180 / Math.PI;
function Je(s, e, t, i, n) {
  return i + (s - e) * (n - i) / (t - e);
}
function et(s, e, t) {
  return (1 - t) * s + t * e;
}
function Pi(s) {
  return s * Ia;
}
function ka(s) {
  return s * La;
}
function rs(s) {
  const e = s.value.x !== void 0 && s.value.y !== void 0 && s.value.z !== void 0, t = s.value.isEuler !== void 0, i = s.value.elements !== void 0, n = s.step !== void 0 ? s.step : 0.01, r = [];
  if (t) {
    const a = Tt(() => s.value, []);
    ["_x", "_y", "_z"].forEach((c) => {
      const l = ee(null);
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: l, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            We,
            {
              value: ka(a[c]),
              type: "number",
              prop: c,
              step: 0.1,
              labelRef: l,
              onChange: (u, p) => {
                a[u] = Pi(p), s.onChange({ target: { value: a } });
              }
            }
          )
        ] }, c)
      );
    });
  } else if (e) {
    const a = Tt(() => s.value, []), o = (l, u) => {
      a[l] = u, s.onChange({ target: { value: a } });
    };
    ["x", "y", "z"].forEach((l) => {
      const u = ee(null);
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: u, children: l.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            We,
            {
              value: a[l],
              type: "number",
              prop: l,
              step: n,
              labelRef: u,
              onChange: o
            }
          )
        ] }, l)
      );
    });
  } else if (i) {
    const a = Tt(() => s.value, []), o = (c, l) => {
      const u = Number(c);
      a.elements[u] = l, s.onChange({ target: { value: a } });
    };
    for (let c = 0; c < 9; c++) {
      const l = ee(null);
      r.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: l, children: c + 1 }),
          /* @__PURE__ */ d.jsx(
            We,
            {
              value: a.elements[c],
              type: "number",
              prop: c.toString(),
              step: n,
              labelRef: l,
              onChange: o
            }
          )
        ] }, c.toString())
      );
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: "grid3", children: r }, Math.random().toString());
}
function Ua(s) {
  const e = s.value.x !== void 0, t = s.step !== void 0 ? s.step : 0.01, i = [];
  if (e) {
    const n = Tt(() => s.value, []), r = (o, c) => {
      n[o] = c, s.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const c = ee(null);
      i.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: c, children: o.toUpperCase() }),
          /* @__PURE__ */ d.jsx(
            We,
            {
              value: n.x,
              type: "number",
              prop: o,
              step: t,
              labelRef: c,
              onChange: r
            }
          )
        ] }, o)
      );
    });
  } else {
    const n = Tt(() => s.value, []), r = (a, o) => {
      const c = Number(a);
      n.elements[c] = o, s.onChange({ target: { value: n } });
    };
    for (let a = 0; a < 16; a++) {
      const o = ee(null);
      i.push(
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { ref: o, children: a + 1 }),
          /* @__PURE__ */ d.jsx(
            We,
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
  return /* @__PURE__ */ d.jsx("div", { className: "grid4", children: i });
}
function ja(s) {
  return !(s === "defaultAttributeValues" || s === "forceSinglePass" || s === "linecap" || s === "linejoin" || s === "linewidth" || s === "normalMapType" || s === "precision" || s === "shadowSide" || s === "uniformsGroups" || s === "uniformsNeedUpdate" || s === "userData" || s === "version" || s === "wireframeLinecap" || s === "wireframeLinejoin" || s === "wireframeLinewidth" || s.slice(0, 4) === "clip" || s.slice(0, 7) === "polygon" || s.slice(0, 7) === "stencil" || s.slice(0, 2) === "is");
}
function Na(s) {
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
function ti(s) {
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
function rn(s) {
  const e = s.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function Fa() {
  const s = document.createElement("input");
  return s.type = "file", new Promise((e, t) => {
    s.addEventListener("change", function() {
      if (s.files === null)
        t();
      else {
        const i = s.files[0], n = new FileReader();
        n.onload = function(r) {
          e(r.target.result);
        }, n.readAsDataURL(i);
      }
    }), s.click();
  });
}
const za = [
  {
    title: "Front",
    value: kn
  },
  {
    title: "Back",
    value: Is
  },
  {
    title: "Double",
    value: Ri
  }
], Ha = [
  {
    title: "No Blending",
    value: Un
  },
  {
    title: "Normal",
    value: jn
  },
  {
    title: "Additive",
    value: Nn
  },
  {
    title: "Subtractive",
    value: Fn
  },
  {
    title: "Multiply",
    value: zn
  },
  {
    title: "Custom",
    value: Hn
  }
], Ya = [
  {
    title: "Add",
    value: Yn
  },
  {
    title: "Subtract",
    value: Bn
  },
  {
    title: "Reverse Subtract",
    value: Vn
  },
  {
    title: "Min",
    value: Zn
  },
  {
    title: "Max",
    value: Wn
  }
], Ba = [
  {
    title: "Zero",
    value: Ls
  },
  {
    title: "One",
    value: ks
  },
  {
    title: "Src Color",
    value: Us
  },
  {
    title: "One Minus Src Color",
    value: js
  },
  {
    title: "Src Alpha",
    value: Ns
  },
  {
    title: "One Minus Src Alpha",
    value: Fs
  },
  {
    title: "Dst Alpha",
    value: zs
  },
  {
    title: "One Minus Dst Alpha",
    value: Hs
  },
  {
    title: "Dst Color",
    value: Ys
  },
  {
    title: "One Minus Dst Color",
    value: Bs
  },
  {
    title: "Src Alpha Saturate",
    value: Gn
  },
  {
    title: "Constant Color",
    value: Vs
  },
  {
    title: "One Minus Constant Color",
    value: Zs
  },
  {
    title: "Constant Alpha",
    value: Ws
  },
  {
    title: "One Minus Constant Alpha",
    value: Gs
  }
], Va = [
  {
    title: "Zero",
    value: Ls
  },
  {
    title: "One",
    value: ks
  },
  {
    title: "Src Color",
    value: Us
  },
  {
    title: "One Minus Src Color",
    value: js
  },
  {
    title: "Src Alpha",
    value: Ns
  },
  {
    title: "One Minus Src Alpha",
    value: Fs
  },
  {
    title: "Dst Alpha",
    value: zs
  },
  {
    title: "One Minus Dst Alpha",
    value: Hs
  },
  {
    title: "Dst Color",
    value: Ys
  },
  {
    title: "One Minus Dst Color",
    value: Bs
  },
  {
    title: "Constant Color",
    value: Vs
  },
  {
    title: "One Minus Constant Color",
    value: Zs
  },
  {
    title: "Constant Alpha",
    value: Ws
  },
  {
    title: "One Minus Constant Alpha",
    value: Gs
  }
];
function gt(s, e) {
  s.needsUpdate = !0, s.type = "option", s.options = e;
}
function Za(s, e, t, i) {
  return {
    type: "boolean",
    title: ti(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (n, r) => {
      i.updateObject(t.uuid, `material.${s}`, r), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const a = i.getScene(t.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", t.uuid);
        q(o, `material.${s}`, r);
      }
    }
  };
}
function Wa(s, e, t, i) {
  const n = {
    type: "number",
    title: ti(s),
    prop: s,
    value: e,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (r, a) => {
      i.updateObject(t.uuid, `material.${s}`, a), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = i.getScene(t.uuid);
      if (o !== null) {
        const c = o.getObjectByProperty("uuid", t.uuid);
        q(c, `material.${s}`, a);
      }
    }
  };
  switch (s) {
    case "blending":
      gt(n, Ha);
      break;
    case "blendDst":
      gt(n, Va);
      break;
    case "blendEquation":
      gt(n, Ya);
      break;
    case "blendSrc":
      gt(n, Ba);
      break;
    case "side":
      gt(n, za);
      break;
  }
  return rn(s) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function Ga(s, e, t, i) {
  const n = {
    type: "string",
    title: ti(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (a, o) => {
      i.updateObject(t.uuid, `material.${s}`, o), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const c = i.getScene(t.uuid);
      if (c !== null) {
        const l = c.getObjectByProperty("uuid", t.uuid);
        q(l, `material.${s}`, o);
      }
    },
    onKeyDown: (a) => {
    }
  };
  return (s === "vertexShader" || s === "fragmentShader") && (n.disabled = !1, n.latest = n.value, n.onChange = (a, o) => {
    n.latest = o, i.updateObject(t.uuid, `material.${s}`, o);
    const c = i.getScene(t.uuid);
    if (c !== null) {
      const l = c.getObjectByProperty("uuid", t.uuid);
      q(l, `material.${s}`, o);
    }
  }, n.onKeyDown = (a) => {
    if (a.key === "Enter" && (a.altKey || a.metaKey)) {
      i.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = i.getScene(t.uuid);
      if (o !== null) {
        const c = o.getObjectByProperty("uuid", t.uuid);
        q(c, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Xa(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z === void 0;
}
function Qa(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w === void 0;
}
function $a(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w !== void 0;
}
function Ai(s) {
  s.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function St(s, e, t, i, n = "", r = !1) {
  const a = ti(s).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${s}` : s, c = typeof e;
  if (c === "boolean" || c === "string")
    return {
      title: a,
      prop: o,
      type: c,
      value: e,
      disabled: r,
      onChange: (l, u) => {
        i.updateObject(t.uuid, `material.${o}`, u);
        const p = i.getScene(t.uuid);
        if (p !== null) {
          const m = p.getObjectByProperty("uuid", t.uuid);
          q(m, `material.${o}`, u);
        }
      }
    };
  if (c === "number") {
    const l = {
      title: a,
      prop: o,
      type: "number",
      value: e,
      step: 0.01,
      disabled: r,
      onChange: (u, p) => {
        i.updateObject(t.uuid, `material.${o}`, p);
        const m = i.getScene(t.uuid);
        if (m !== null) {
          const _ = m.getObjectByProperty("uuid", t.uuid);
          q(_, `material.${o}`, p);
        }
      }
    };
    return rn(a) && (l.type = "range", l.min = 0, l.max = 1), l;
  } else {
    if (e.isColor)
      return {
        title: a,
        prop: o,
        type: "color",
        value: e,
        disabled: r,
        onChange: (l, u) => {
          const p = new Mt(u);
          i.updateObject(t.uuid, `material.${o}`, p);
          const m = i.getScene(t.uuid);
          if (m !== null) {
            const _ = m.getObjectByProperty("uuid", t.uuid);
            q(_, `material.${o}`, p);
          }
        }
      };
    if (Array.isArray(e)) {
      const l = [];
      for (const u in e) {
        const p = e[u], m = `[${u.toString()}]`;
        if (p.value !== void 0) {
          const _ = St(`${m}.value`, p.value, t, i, o, r);
          _ !== void 0 && l.push(_);
        } else {
          const _ = St(m, p, t, i, o, r);
          _ !== void 0 && l.push(_);
        }
      }
      if (l.length > 0)
        return Ai(l), {
          title: a,
          items: l
        };
    } else {
      if (Xa(e))
        return {
          title: a,
          prop: o,
          type: "vector2",
          value: e,
          disabled: r,
          onChange: (l, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              q(m, `material.${o}`, u);
            }
          }
        };
      if (Qa(e))
        return {
          title: a,
          prop: o,
          type: "grid3",
          value: e,
          disabled: r,
          onChange: (l, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              q(m, `material.${o}`, u);
            }
          }
        };
      if ($a(e))
        return {
          title: a,
          prop: o,
          type: "grid4",
          value: e,
          disabled: r,
          onChange: (l, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              q(m, `material.${o}`, u);
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
          onChange: (l, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              q(m, `material.${o}`, u);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: a,
          type: "image",
          value: e,
          disabled: r,
          onChange: (l, u) => {
            const p = Na(s), m = n.length > 0 ? `${n}.${p}` : p;
            i.createTexture(t.uuid, `material.${m}`, u);
            const _ = i.getScene(t.uuid);
            if (_ !== null) {
              const w = _.getObjectByProperty("uuid", t.uuid);
              if (w !== void 0) {
                const x = (T) => {
                  const g = w.material, v = m.split(".");
                  switch (v.length) {
                    case 1:
                      g[v[0]] = T;
                      break;
                    case 2:
                      g[v[0]][v[1]] = T;
                      break;
                    case 3:
                      g[v[0]][v[1]][v[2]] = T;
                      break;
                    case 4:
                      g[v[0]][v[1]][v[2]][v[3]] = T;
                      break;
                    case 5:
                      g[v[0]][v[1]][v[2]][v[3]][v[4]] = T;
                      break;
                  }
                  g.needsUpdate = !0;
                };
                u.src.length > 0 ? sn(u.src).then((T) => {
                  T.offset.set(u.offset[0], u.offset[1]), T.repeat.set(u.repeat[0], u.repeat[1]), x(T);
                }) : x(null);
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
          onChange: (l, u) => {
            i.updateObject(t.uuid, `material.${o}`, u);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              q(m, `material.${o}`, u);
            }
          }
        };
      {
        const l = [], u = s === "defines" || s === "extensions";
        try {
          for (const p in e) {
            const m = e[p];
            if (m !== void 0)
              if (m.value !== void 0) {
                const _ = St(`${p}.value`, m.value, t, i, o, u);
                _ !== void 0 && l.push(_);
              } else {
                const _ = St(p, m, t, i, o, u);
                _ !== void 0 && l.push(_);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", s, e);
        }
        if (l.length > 0)
          return Ai(l), {
            title: a,
            items: l
          };
      }
    }
  }
}
function os(s, e, t) {
  const i = [];
  for (const n in s) {
    if (!ja(n))
      continue;
    const r = typeof s[n], a = s[n];
    if (r === "boolean")
      i.push(Za(n, a, e, t));
    else if (r === "number")
      i.push(Wa(n, a, e, t));
    else if (r === "string")
      i.push(Ga(n, a, e, t));
    else if (r === "object") {
      const o = St(n, a, e, t);
      o !== void 0 && i.push(o);
    } else
      a !== void 0 && console.log("other:", n, r, a);
  }
  return Ai(i), i.push({
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
  }), i;
}
function qa(s, e) {
  function t() {
    return `${e.app.appID}_material`;
  }
  const i = localStorage.getItem(t()), n = i !== null ? i === "open" : !1;
  function r(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const a = s.material;
  if (Array.isArray(a)) {
    const o = [], c = a.length;
    for (let l = 0; l < c; l++)
      o.push(
        /* @__PURE__ */ d.jsx(
          Ee,
          {
            title: `Material ${l}`,
            items: os(a[l], s, e)
          },
          `Material ${l}`
        )
      );
    return /* @__PURE__ */ d.jsx(d.Fragment, { children: o });
  } else
    return /* @__PURE__ */ d.jsx(
      Ee,
      {
        title: "Material",
        items: os(a, s, e),
        expanded: n,
        onToggle: (o) => {
          r(o);
        }
      }
    );
}
const ls = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Ka(s) {
  const e = s.step !== void 0 ? s.step : 0.01, t = ee(null), i = ee(null), n = ee(null), r = ee(null), a = ee(null), [o] = Z(s.value), [c, l] = Z(s.value.offset[0]), [u, p] = Z(s.value.offset[1]), [m, _] = Z(s.value.repeat[0]), [w, x] = Z(s.value.repeat[1]);
  function T(v, E, b, P, O) {
    if (s.onChange !== void 0) {
      const j = s.prop !== void 0 ? s.prop : s.title;
      s.onChange(j, {
        src: v,
        offset: [E, b],
        repeat: [P, O]
      });
    }
  }
  function g(v) {
    const E = t.current.src, b = v.target.value;
    switch (v.target) {
      case i.current:
        l(b), T(E, b, u, m, w);
        break;
      case n.current:
        p(b), T(E, c, b, m, w);
        break;
      case r.current:
        _(b), T(E, c, u, b, w);
        break;
      case a.current:
        x(b), T(E, c, u, m, b);
        break;
    }
  }
  return /* @__PURE__ */ d.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ d.jsx("img", { alt: s.title, ref: t, onClick: () => {
      Fa().then((v) => {
        t.current.src = v, T(v, c, u, m, w);
      });
    }, src: o.src.length > 0 ? o.src : ls }),
    /* @__PURE__ */ d.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: c,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: u,
            step: e,
            onChange: g
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
            value: m,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: w,
            step: e,
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("button", { onClick: () => {
        T("", c, u, m, w), t.current.src = ls;
      }, children: "Clear" })
    ] })
  ] });
}
function Gt(s) {
  let e = s.value;
  e !== void 0 && (e.isColor !== void 0 ? e = ts(s.value) : s.type === "color" && (e = ts(new Mt(s.value))));
  const [t, i] = Z(e), n = ee(null), r = (l) => {
    let u = l.target.value;
    if (s.type === "boolean")
      u = l.target.checked;
    else if (s.type === "option" && (typeof s.value == "number" ? u = Number(u) : typeof s.value == "boolean" ? u = !!u : typeof s.value == "object" && (u = JSON.parse(u)), s.options !== void 0)) {
      const p = s.options.length;
      for (let m = 0; m < p && s.options[m].value !== u; m++)
        ;
    }
    i(u), s.onChange !== void 0 && s.onChange(s.prop !== void 0 ? s.prop : s.title, u);
  }, a = {};
  s.disabled && (a.opacity = 0.8);
  const o = s.type === "string" && (t.length > 100 || t.search(`
`) > -1), c = o || s.type === "image" || s.type === "vector2";
  return /* @__PURE__ */ d.jsxs("div", { className: `field ${c ? "block" : ""}`, style: a, children: [
    s.type !== "button" && /* @__PURE__ */ d.jsx("label", { ref: n, children: $t(s.title) }, "fieldLabel"),
    s.type === "string" && !o && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "text",
        disabled: s.disabled,
        onChange: r,
        value: t
      }
    ),
    s.type === "string" && o && /* @__PURE__ */ d.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: s.disabled !== void 0 ? s.disabled : !0,
        onChange: r,
        onKeyDown: (l) => {
          s.onKeyDown !== void 0 && s.onKeyDown(l);
        },
        value: t
      }
    ),
    s.type === "boolean" && /* @__PURE__ */ d.jsx(
      "input",
      {
        type: "checkbox",
        disabled: s.disabled,
        onChange: r,
        checked: t
      }
    ),
    s.type === "number" && /* @__PURE__ */ d.jsx(
      We,
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
      We,
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
      /* @__PURE__ */ d.jsx("input", { type: "text", value: t.toString(), onChange: r, disabled: s.disabled, className: "color" }),
      /* @__PURE__ */ d.jsx("input", { type: "color", value: t, onChange: r, disabled: s.disabled })
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
    s.type === "image" && /* @__PURE__ */ d.jsx(Ka, { title: s.title, prop: s.prop, value: s.value, onChange: s.onChange }),
    s.type === "option" && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsx("select", { onChange: r, disabled: s.disabled, defaultValue: s.value, children: s.options?.map((l, u) => /* @__PURE__ */ d.jsx("option", { value: l.value, children: $t(l.title) }, u)) }) }),
    s.type === "vector2" && /* @__PURE__ */ d.jsx(Ra, { step: s.step, value: t, min: 0, max: 1, onChange: r }),
    s.type === "grid3" && /* @__PURE__ */ d.jsx(rs, { step: s.step, value: t, onChange: r }),
    s.type === "grid4" && /* @__PURE__ */ d.jsx(Ua, { step: s.step, value: t, onChange: r }),
    s.type === "euler" && /* @__PURE__ */ d.jsx(rs, { step: s.step, value: t, onChange: r })
  ] });
}
function Ja(s) {
  return "items" in s;
}
class Ee extends ei {
  subgroupNames = [];
  subgroupElements = [];
  valueOverrides = /* @__PURE__ */ new Map();
  constructor(e) {
    super(e), this.state = { lastUpdated: Date.now() };
  }
  addGroup(e) {
    const t = [];
    e.items.forEach((r) => {
      t.push({
        type: r.type,
        prop: r.prop,
        title: r.title !== void 0 ? r.title : r.prop,
        value: r.value,
        min: r.min,
        max: r.max,
        step: r.step,
        options: r.options,
        disabled: r.disabled,
        onChange: (a, o) => {
          e.onUpdate(a, o);
        }
      });
    });
    const i = Le(), n = /* @__PURE__ */ d.jsx(
      Ee,
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
      if (Ja(t))
        e.push(
          /* @__PURE__ */ d.jsx(Ee, { title: $t(t.title), items: t.items }, Math.random())
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
              onChange: (r, a) => {
                t.onChange !== void 0 && (this.valueOverrides.delete(t.title), t.onChange(r, a));
              },
              onKeyDown: (r) => {
                t.onKeyDown !== void 0 && t.onKeyDown(r);
              }
            },
            Math.random()
          )
        );
      }
    }), this.subgroupElements.forEach((t) => e.push(t)), /* @__PURE__ */ d.jsx(
      qt,
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
class J extends ei {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, J.instance = this, D.addEventListener(A.ADD_GROUP, this.addGroup), D.addEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    D.removeEventListener(A.ADD_GROUP, this.addGroup), D.removeEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ d.jsx("div", { className: "customGroups", children: J.groups }, this.state.lastUpdate);
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
        onChange: (r, a) => {
          this.props.three.updateGroup(t.title, r, a);
        }
      });
    }), J.groups.push(
      /* @__PURE__ */ d.jsx(
        Ee,
        {
          title: t.title,
          items: i
        },
        Math.random()
      )
    ), J.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, i = J.groupTitles.length;
    for (let n = 0; n < i; n++)
      if (t === J.groupTitles[n]) {
        J.groups.splice(n, 1), J.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
        return;
      }
  };
  // Static
  static addEditorGroup(e) {
    const t = [];
    e.items.forEach((r) => {
      t.push({
        type: r.type,
        prop: r.prop,
        title: r.title !== void 0 ? r.title : r.prop,
        value: r.value,
        min: r.min,
        max: r.max,
        step: r.step,
        options: r.options,
        disabled: r.disabled,
        onChange: (a, o) => {
          e.onUpdate(a, o);
        }
      });
    });
    const i = Le(), n = /* @__PURE__ */ d.jsx(
      Ee,
      {
        ref: i,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return J.groups.push(n), J.groupsRefs.push(i), J.groupTitles.push(e.title), i;
  }
  static removeEditorGroup(e) {
    const t = J.groupTitles.length;
    for (let i = 0; i < t; i++)
      if (e === J.groupTitles[i]) {
        J.groups.splice(i, 1), J.groupTitles.splice(i, 1), J.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
}
function cs(s) {
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
function er(s, e) {
  function t() {
    return `${e.app.appID}_camera`;
  }
  const i = localStorage.getItem(t()), n = i !== null ? i === "open" : !1;
  function r(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const a = [];
  if (s.perspectiveCameraInfo !== void 0)
    for (const o in s.perspectiveCameraInfo)
      a.push({
        title: cs(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(s.uuid, c, l), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const u = e.getScene(s.uuid);
          if (u !== null) {
            const p = u.getObjectByProperty("uuid", s.uuid);
            p !== void 0 && (q(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  else if (s.orthographicCameraInfo !== void 0)
    for (const o in s.orthographicCameraInfo)
      a.push({
        title: cs(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(s.uuid, c, l), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const u = e.getScene(s.uuid);
          if (u !== null) {
            const p = u.getObjectByProperty("uuid", s.uuid);
            p !== void 0 && (q(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ d.jsx(
    Ee,
    {
      title: "Camera",
      items: a,
      expanded: n,
      onToggle: (o) => {
        r(o);
      }
    }
  );
}
class tr extends xe {
  constructor(e, t) {
    const i = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new lt();
    n.setAttribute("position", new Ze(i, 3)), n.computeBoundingSphere();
    const r = new Ii({ fog: !1 });
    super(n, r), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const a = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new lt();
    o.setAttribute("position", new Ze(a, 3)), o.computeBoundingSphere(), this.add(new S(o, new Ge({ side: Is, fog: !1 })));
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
const hs = { type: "change" }, ki = { type: "start" }, on = { type: "end" }, jt = new Xn(), ds = new Qn(), ir = Math.cos(70 * $n.DEG2RAD), ie = new M(), ue = 2 * Math.PI, H = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, ui = 1e-6;
class sr extends Xs {
  constructor(e, t = null) {
    super(e, t), this.state = H.NONE, this.enabled = !0, this.target = new M(), this.cursor = new M(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ot.ROTATE, MIDDLE: ot.DOLLY, RIGHT: ot.PAN }, this.touches = { ONE: rt.ROTATE, TWO: rt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new M(), this._lastQuaternion = new fe(), this._lastTargetPosition = new M(), this._quat = new fe().setFromUnitVectors(e.up, new M(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Si(), this._sphericalDelta = new Si(), this._scale = 1, this._panOffset = new M(), this._rotateStart = new oe(), this._rotateEnd = new oe(), this._rotateDelta = new oe(), this._panStart = new oe(), this._panEnd = new oe(), this._panDelta = new oe(), this._dollyStart = new oe(), this._dollyEnd = new oe(), this._dollyDelta = new oe(), this._dollyDirection = new M(), this._mouse = new oe(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = ar.bind(this), this._onPointerDown = nr.bind(this), this._onPointerUp = rr.bind(this), this._onContextMenu = pr.bind(this), this._onMouseWheel = cr.bind(this), this._onKeyDown = hr.bind(this), this._onTouchStart = dr.bind(this), this._onTouchMove = ur.bind(this), this._onMouseDown = or.bind(this), this._onMouseMove = lr.bind(this), this._interceptControlDown = mr.bind(this), this._interceptControlUp = fr.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(hs), this.update(), this.state = H.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    ie.copy(t).sub(this.target), ie.applyQuaternion(this._quat), this._spherical.setFromVector3(ie), this.autoRotate && this.state === H.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(i) && isFinite(n) && (i < -Math.PI ? i += ue : i > Math.PI && (i -= ue), n < -Math.PI ? n += ue : n > Math.PI && (n -= ue), i <= n ? this._spherical.theta = Math.max(i, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + n) / 2 ? Math.max(i, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (ie.setFromSpherical(this._spherical), ie.applyQuaternion(this._quatInverse), t.copy(this.target).add(ie), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = ie.length();
        a = this._clampDistance(o * this._scale);
        const c = o - a;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), r = !!c;
      } else if (this.object.isOrthographicCamera) {
        const o = new M(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = c !== this.object.zoom;
        const l = new M(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(o), this.object.updateMatrixWorld(), a = ie.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (jt.origin.copy(this.object.position), jt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(jt.direction)) < ir ? this.object.lookAt(this.target) : (ds.setFromNormalAndCoplanarPoint(this.object.up, this.target), jt.intersectPlane(ds, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > ui || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ui || this._lastTargetPosition.distanceToSquared(this.target) > ui ? (this.dispatchEvent(hs), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? ue / 60 * this.autoRotateSpeed * e : ue / 60 / 60 * this.autoRotateSpeed;
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
      let r = ie.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / i.clientHeight, this.object.matrix), this._panUp(2 * t * r / i.clientHeight, this.object.matrix);
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
    const i = this.domElement.getBoundingClientRect(), n = e - i.left, r = t - i.top, a = i.width, o = i.height;
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
    this._rotateLeft(ue * this._rotateDelta.x / t.clientHeight), this._rotateUp(ue * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
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
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, r = Math.sqrt(i * i + n * n);
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
      const i = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + i.x), r = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(n, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(ue * this._rotateDelta.x / t.clientHeight), this._rotateUp(ue * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, r = Math.sqrt(i * i + n * n);
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
    t === void 0 && (t = new oe(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function nr(s) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(s) && (this._addPointer(s), s.pointerType === "touch" ? this._onTouchStart(s) : this._onMouseDown(s)));
}
function ar(s) {
  this.enabled !== !1 && (s.pointerType === "touch" ? this._onTouchMove(s) : this._onMouseMove(s));
}
function rr(s) {
  switch (this._removePointer(s), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(on), this.state = H.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function or(s) {
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
    case ot.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(s), this.state = H.DOLLY;
      break;
    case ot.ROTATE:
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
    case ot.PAN:
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
  this.state !== H.NONE && this.dispatchEvent(ki);
}
function lr(s) {
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
function cr(s) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== H.NONE || (s.preventDefault(), this.dispatchEvent(ki), this._handleMouseWheel(this._customWheelEvent(s)), this.dispatchEvent(on));
}
function hr(s) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(s);
}
function dr(s) {
  switch (this._trackPointer(s), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case rt.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(s), this.state = H.TOUCH_ROTATE;
          break;
        case rt.PAN:
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
        case rt.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(s), this.state = H.TOUCH_DOLLY_PAN;
          break;
        case rt.DOLLY_ROTATE:
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
  this.state !== H.NONE && this.dispatchEvent(ki);
}
function ur(s) {
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
function pr(s) {
  this.enabled !== !1 && s.preventDefault();
}
function mr(s) {
  s.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function fr(s) {
  s.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const G = {
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
}), tt = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function Fe(s) {
  return s.isPerspectiveCamera;
}
function Ie(s) {
  return s.isOrthographicCamera;
}
const it = Math.PI * 2, us = Math.PI / 2, ln = 1e-5, _t = Math.PI / 180;
function ye(s, e, t) {
  return Math.max(e, Math.min(t, s));
}
function V(s, e = ln) {
  return Math.abs(s) < e;
}
function z(s, e, t = ln) {
  return V(s - e, t);
}
function ps(s, e) {
  return Math.round(s / e) * e;
}
function vt(s) {
  return isFinite(s) ? s : s < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function yt(s) {
  return Math.abs(s) < Number.MAX_VALUE ? s : s * (1 / 0);
}
function Nt(s, e, t, i, n = 1 / 0, r) {
  i = Math.max(1e-4, i);
  const a = 2 / i, o = a * r, c = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let l = s - e;
  const u = e, p = n * i;
  l = ye(l, -p, p), e = s - l;
  const m = (t.value + a * l) * r;
  t.value = (t.value - a * m) * c;
  let _ = e + (l + m) * c;
  return u - s > 0 == _ > u && (_ = u, t.value = (_ - u) / r), _;
}
function ms(s, e, t, i, n = 1 / 0, r, a) {
  i = Math.max(1e-4, i);
  const o = 2 / i, c = o * r, l = 1 / (1 + c + 0.48 * c * c + 0.235 * c * c * c);
  let u = e.x, p = e.y, m = e.z, _ = s.x - u, w = s.y - p, x = s.z - m;
  const T = u, g = p, v = m, E = n * i, b = E * E, P = _ * _ + w * w + x * x;
  if (P > b) {
    const Q = Math.sqrt(P);
    _ = _ / Q * E, w = w / Q * E, x = x / Q * E;
  }
  u = s.x - _, p = s.y - w, m = s.z - x;
  const O = (t.x + o * _) * r, j = (t.y + o * w) * r, X = (t.z + o * x) * r;
  t.x = (t.x - o * O) * l, t.y = (t.y - o * j) * l, t.z = (t.z - o * X) * l, a.x = u + (_ + O) * l, a.y = p + (w + j) * l, a.z = m + (x + X) * l;
  const ge = T - s.x, De = g - s.y, ht = v - s.z, Qe = a.x - T, me = a.y - g, te = a.z - v;
  return ge * Qe + De * me + ht * te > 0 && (a.x = T, a.y = g, a.z = v, t.x = (a.x - T) / r, t.y = (a.y - g) / r, t.z = (a.z - v) / r), a;
}
function pi(s, e) {
  e.set(0, 0), s.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= s.length, e.y /= s.length;
}
function mi(s, e) {
  return Ie(s) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class gr {
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
    const i = this._listeners[e.type];
    if (i !== void 0) {
      e.target = this;
      const n = i.slice(0);
      for (let r = 0, a = n.length; r < a; r++)
        n[r].call(this, e);
    }
  }
}
var fi;
const _r = "2.9.0", Ft = 1 / 8, vr = /Mac/.test((fi = globalThis?.navigator) === null || fi === void 0 ? void 0 : fi.platform);
let R, fs, zt, gi, pe, L, N, st, bt, Ce, we, ze, gs, _s, ve, Et, nt, vs, _i, ys, vi, yi, Ht;
class Oe extends gr {
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
    R = e.THREE, fs = Object.freeze(new R.Vector3(0, 0, 0)), zt = Object.freeze(new R.Vector3(0, 1, 0)), gi = Object.freeze(new R.Vector3(0, 0, 1)), pe = new R.Vector2(), L = new R.Vector3(), N = new R.Vector3(), st = new R.Vector3(), bt = new R.Vector3(), Ce = new R.Vector3(), we = new R.Vector3(), ze = new R.Vector3(), gs = new R.Vector3(), _s = new R.Vector3(), ve = new R.Spherical(), Et = new R.Spherical(), nt = new R.Box3(), vs = new R.Box3(), _i = new R.Sphere(), ys = new R.Quaternion(), vi = new R.Quaternion(), yi = new R.Matrix4(), Ht = new R.Raycaster();
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
  constructor(e, t) {
    super(), this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.minDistance = Number.EPSILON, this.maxDistance = 1 / 0, this.infinityDolly = !1, this.minZoom = 0.01, this.maxZoom = 1 / 0, this.smoothTime = 0.25, this.draggingSmoothTime = 0.125, this.maxSpeed = 1 / 0, this.azimuthRotateSpeed = 1, this.polarRotateSpeed = 1, this.dollySpeed = 1, this.dollyDragInverted = !1, this.truckSpeed = 2, this.dollyToCursor = !1, this.dragToOffset = !1, this.verticalDragToForward = !1, this.boundaryFriction = 0, this.restThreshold = 0.01, this.colliderMeshes = [], this.cancel = () => {
    }, this._enabled = !0, this._state = f.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = tt.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new R.Vector3(), this._focalOffsetVelocity = new R.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (g, v, E) => {
      let b, P;
      if (Fe(this._camera)) {
        const O = L.copy(this._camera.position).sub(this._target), j = this._camera.getEffectiveFOV() * _t, X = O.length() * Math.tan(j * 0.5);
        b = this.truckSpeed * g * X / this._elementRect.height, P = this.truckSpeed * v * X / this._elementRect.height;
      } else if (Ie(this._camera)) {
        const O = this._camera;
        b = g * (O.right - O.left) / O.zoom / this._elementRect.width, P = v * (O.top - O.bottom) / O.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(b, 0, !0), this.forward(-P, !0)) : E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y + P, this._focalOffsetEnd.z, !0) : this.truck(b, P, !0);
    }, this._rotateInternal = (g, v) => {
      const E = it * this.azimuthRotateSpeed * g / this._elementRect.height, b = it * this.polarRotateSpeed * v / this._elementRect.height;
      this.rotate(E, b, !0);
    }, this._dollyInternal = (g, v, E) => {
      const b = Math.pow(0.95, -g * this.dollySpeed), P = this._sphericalEnd.radius, O = this._sphericalEnd.radius * b, j = ye(O, this.minDistance, this.maxDistance), X = j - O;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(O, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(X, !0), this._dollyToNoClamp(j, !0)) : this._dollyToNoClamp(j, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? O : j) - P, this._dollyControlCoord.set(v, E)), this._lastDollyDirection = Math.sign(-g);
    }, this._zoomInternal = (g, v, E) => {
      const b = Math.pow(0.95, g * this.dollySpeed), P = this._zoom, O = this._zoom * b;
      this.zoomTo(O, !0), this.dollyToCursor && (this._changedZoom += O - P, this._dollyControlCoord.set(v, E));
    }, typeof R > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new R.Quaternion().setFromUnitVectors(this._camera.up, zt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = f.NONE, this._target = new R.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new R.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new R.Spherical().setFromVector3(L.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new R.Vector3(),
      new R.Vector3(),
      new R.Vector3(),
      new R.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new R.Box3(new R.Vector3(-1 / 0, -1 / 0, -1 / 0), new R.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new R.Vector2(), this.mouseButtons = {
      left: f.ROTATE,
      middle: f.DOLLY,
      right: f.TRUCK,
      wheel: Fe(this._camera) ? f.DOLLY : Ie(this._camera) ? f.ZOOM : f.NONE
    }, this.touches = {
      one: f.TOUCH_ROTATE,
      two: Fe(this._camera) ? f.TOUCH_DOLLY_TRUCK : Ie(this._camera) ? f.TOUCH_ZOOM_TRUCK : f.NONE,
      three: f.TOUCH_TRUCK
    };
    const i = new R.Vector2(), n = new R.Vector2(), r = new R.Vector2(), a = (g) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const b = this._domElement.getBoundingClientRect(), P = g.clientX / b.width, O = g.clientY / b.height;
        if (P < this._interactiveArea.left || P > this._interactiveArea.right || O < this._interactiveArea.top || O > this._interactiveArea.bottom)
          return;
      }
      const v = g.pointerType !== "mouse" ? null : (g.buttons & G.LEFT) === G.LEFT ? G.LEFT : (g.buttons & G.MIDDLE) === G.MIDDLE ? G.MIDDLE : (g.buttons & G.RIGHT) === G.RIGHT ? G.RIGHT : null;
      if (v !== null) {
        const b = this._findPointerByMouseButton(v);
        b && this._disposePointer(b);
      }
      if ((g.buttons & G.LEFT) === G.LEFT && this._lockedPointer)
        return;
      const E = {
        pointerId: g.pointerId,
        clientX: g.clientX,
        clientY: g.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: v
      };
      this._activePointers.push(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), this._isDragging = !0, m(g);
    }, o = (g) => {
      g.cancelable && g.preventDefault();
      const v = g.pointerId, E = this._lockedPointer || this._findPointerById(v);
      if (E) {
        if (E.clientX = g.clientX, E.clientY = g.clientY, E.deltaX = g.movementX, E.deltaY = g.movementY, this._state = 0, g.pointerType === "touch")
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (g.buttons & G.LEFT) === G.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (g.buttons & G.MIDDLE) === G.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (g.buttons & G.RIGHT) === G.RIGHT && (this._state = this._state | this.mouseButtons.right);
        _();
      }
    }, c = (g) => {
      const v = this._findPointerById(g.pointerId);
      if (!(v && v === this._lockedPointer)) {
        if (v && this._disposePointer(v), g.pointerType === "touch")
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
        w();
      }
    };
    let l = -1;
    const u = (g) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === f.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), j = g.clientX / O.width, X = g.clientY / O.height;
        if (j < this._interactiveArea.left || j > this._interactiveArea.right || X < this._interactiveArea.top || X > this._interactiveArea.bottom)
          return;
      }
      if (g.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === f.ROTATE || this.mouseButtons.wheel === f.TRUCK) {
        const O = performance.now();
        l - O < 1e3 && this._getClientRect(this._elementRect), l = O;
      }
      const v = vr ? -1 : -3, E = g.deltaMode === 1 ? g.deltaY / v : g.deltaY / (v * 10), b = this.dollyToCursor ? (g.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, P = this.dollyToCursor ? (g.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
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
          this._dollyInternal(-E, b, P), this._isUserControllingDolly = !0;
          break;
        }
        case f.ZOOM: {
          this._zoomInternal(-E, b, P), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, p = (g) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === Oe.ACTION.NONE) {
          const v = g instanceof PointerEvent ? g.pointerId : 0, E = this._findPointerById(v);
          E && this._disposePointer(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c);
          return;
        }
        g.preventDefault();
      }
    }, m = (g) => {
      if (!this._enabled)
        return;
      if (pi(this._activePointers, pe), this._getClientRect(this._elementRect), i.copy(pe), n.copy(pe), this._activePointers.length >= 2) {
        const E = pe.x - this._activePointers[1].clientX, b = pe.y - this._activePointers[1].clientY, P = Math.sqrt(E * E + b * b);
        r.set(0, P);
        const O = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, j = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(O, j);
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
        !this._lockedPointer && (g.buttons & G.LEFT) === G.LEFT && (this._state = this._state | this.mouseButtons.left), (g.buttons & G.MIDDLE) === G.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (g.buttons & G.RIGHT) === G.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & f.ROTATE) === f.ROTATE || (this._state & f.TOUCH_ROTATE) === f.TOUCH_ROTATE || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & f.TRUCK) === f.TRUCK || (this._state & f.TOUCH_TRUCK) === f.TOUCH_TRUCK || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & f.DOLLY) === f.DOLLY || (this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & f.ZOOM) === f.ZOOM || (this._state & f.TOUCH_ZOOM) === f.TOUCH_ZOOM || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & f.OFFSET) === f.OFFSET || (this._state & f.TOUCH_OFFSET) === f.TOUCH_OFFSET || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, _ = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, pi(this._activePointers, pe);
      const v = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, E = v ? -v.deltaX : n.x - pe.x, b = v ? -v.deltaY : n.y - pe.y;
      if (n.copy(pe), ((this._state & f.ROTATE) === f.ROTATE || (this._state & f.TOUCH_ROTATE) === f.TOUCH_ROTATE || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(E, b), this._isUserControllingRotate = !0), (this._state & f.DOLLY) === f.DOLLY || (this._state & f.ZOOM) === f.ZOOM) {
        const P = this.dollyToCursor ? (i.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, O = this.dollyToCursor ? (i.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, j = this.dollyDragInverted ? -1 : 1;
        (this._state & f.DOLLY) === f.DOLLY ? (this._dollyInternal(j * b * Ft, P, O), this._isUserControllingDolly = !0) : (this._zoomInternal(j * b * Ft, P, O), this._isUserControllingZoom = !0);
      }
      if ((this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_ZOOM) === f.TOUCH_ZOOM || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_ZOOM_ROTATE) === f.TOUCH_ZOOM_ROTATE) {
        const P = pe.x - this._activePointers[1].clientX, O = pe.y - this._activePointers[1].clientY, j = Math.sqrt(P * P + O * O), X = r.y - j;
        r.set(0, j);
        const ge = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, De = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & f.TOUCH_DOLLY) === f.TOUCH_DOLLY || (this._state & f.TOUCH_DOLLY_ROTATE) === f.TOUCH_DOLLY_ROTATE || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(X * Ft, ge, De), this._isUserControllingDolly = !0) : (this._zoomInternal(X * Ft, ge, De), this._isUserControllingZoom = !0);
      }
      ((this._state & f.TRUCK) === f.TRUCK || (this._state & f.TOUCH_TRUCK) === f.TOUCH_TRUCK || (this._state & f.TOUCH_DOLLY_TRUCK) === f.TOUCH_DOLLY_TRUCK || (this._state & f.TOUCH_ZOOM_TRUCK) === f.TOUCH_ZOOM_TRUCK) && (this._truckInternal(E, b, !1), this._isUserControllingTruck = !0), ((this._state & f.OFFSET) === f.OFFSET || (this._state & f.TOUCH_OFFSET) === f.TOUCH_OFFSET || (this._state & f.TOUCH_DOLLY_OFFSET) === f.TOUCH_DOLLY_OFFSET || (this._state & f.TOUCH_ZOOM_OFFSET) === f.TOUCH_ZOOM_OFFSET) && (this._truckInternal(E, b, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, w = () => {
      pi(this._activePointers, pe), n.copy(pe), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", x), this._domElement.ownerDocument.addEventListener("pointerlockerror", T), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), m());
    }, this.unlockPointer = () => {
      var g, v, E;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (g = this._domElement) === null || g === void 0 || g.ownerDocument.exitPointerLock(), (v = this._domElement) === null || v === void 0 || v.ownerDocument.removeEventListener("pointerlockchange", x), (E = this._domElement) === null || E === void 0 || E.ownerDocument.removeEventListener("pointerlockerror", T), this.cancel();
    };
    const x = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, T = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (g) => {
      this._domElement = g, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", a), this._domElement.addEventListener("pointercancel", c), this._domElement.addEventListener("wheel", u, { passive: !1 }), this._domElement.addEventListener("contextmenu", p);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", a), this._domElement.removeEventListener("pointercancel", c), this._domElement.removeEventListener("wheel", u, { passive: !1 }), this._domElement.removeEventListener("contextmenu", p), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.removeEventListener("pointerlockchange", x), this._domElement.ownerDocument.removeEventListener("pointerlockerror", T));
    }, this.cancel = () => {
      this._state !== f.NONE && (this._state = f.NONE, this._activePointers.length = 0, w());
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
    const n = ye(e, this.minAzimuthAngle, this.maxAzimuthAngle), r = ye(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = r, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, i || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const a = !i || z(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && z(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
    return this._isUserControllingDolly = !1, this._lastDollyDirection = tt.NONE, this._changedDolly = 0, this._dollyToNoClamp(ye(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const i = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const a = this._collisionTest(), o = z(a, this._spherical.radius);
      if (!(i > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, a);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const r = !t || z(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    this._targetEnd.add(this._getCameraDirection(bt).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
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
    this._camera.updateMatrix(), Ce.setFromMatrixColumn(this._camera.matrix, 0), we.setFromMatrixColumn(this._camera.matrix, 1), Ce.multiplyScalar(e), we.multiplyScalar(-t);
    const n = L.copy(Ce).add(we), r = N.copy(this._targetEnd).add(n);
    return this.moveTo(r.x, r.y, r.z, i);
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
    const r = L.set(e, t, i).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, r, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const a = !n || z(this._target.x, this._targetEnd.x, this.restThreshold) && z(this._target.y, this._targetEnd.y, this.restThreshold) && z(this._target.z, this._targetEnd.z, this.restThreshold);
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
  fitToBox(e, t, { cover: i = !1, paddingLeft: n = 0, paddingRight: r = 0, paddingBottom: a = 0, paddingTop: o = 0 } = {}) {
    const c = [], l = e.isBox3 ? nt.copy(e) : nt.setFromObject(e);
    l.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const u = ps(this._sphericalEnd.theta, us), p = ps(this._sphericalEnd.phi, us);
    c.push(this.rotateTo(u, p, t));
    const m = L.setFromSpherical(this._sphericalEnd).normalize(), _ = ys.setFromUnitVectors(m, gi), w = z(Math.abs(m.y), 1);
    w && _.multiply(vi.setFromAxisAngle(zt, u)), _.multiply(this._yAxisUpSpaceInverse);
    const x = vs.makeEmpty();
    N.copy(l.min).applyQuaternion(_), x.expandByPoint(N), N.copy(l.min).setX(l.max.x).applyQuaternion(_), x.expandByPoint(N), N.copy(l.min).setY(l.max.y).applyQuaternion(_), x.expandByPoint(N), N.copy(l.max).setZ(l.min.z).applyQuaternion(_), x.expandByPoint(N), N.copy(l.min).setZ(l.max.z).applyQuaternion(_), x.expandByPoint(N), N.copy(l.max).setY(l.min.y).applyQuaternion(_), x.expandByPoint(N), N.copy(l.max).setX(l.min.x).applyQuaternion(_), x.expandByPoint(N), N.copy(l.max).applyQuaternion(_), x.expandByPoint(N), x.min.x -= n, x.min.y -= a, x.max.x += r, x.max.y += o, _.setFromUnitVectors(gi, m), w && _.premultiply(vi.invert()), _.premultiply(this._yAxisUpSpace);
    const T = x.getSize(L), g = x.getCenter(N).applyQuaternion(_);
    if (Fe(this._camera)) {
      const v = this.getDistanceToFitBox(T.x, T.y, T.z, i);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.dollyTo(v, t)), c.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Ie(this._camera)) {
      const v = this._camera, E = v.right - v.left, b = v.top - v.bottom, P = i ? Math.max(E / T.x, b / T.y) : Math.min(E / T.x, b / T.y);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.zoomTo(P, t)), c.push(this.setFocalOffset(0, 0, 0, t));
    }
    return Promise.all(c);
  }
  /**
   * Fit the viewport to the sphere or the bounding sphere of the object.
   * @param sphereOrMesh
   * @param enableTransition
   * @category Methods
   */
  fitToSphere(e, t) {
    const i = [], r = "isObject3D" in e ? Oe.createBoundingSphere(e, _i) : _i.copy(e);
    if (i.push(this.moveTo(r.center.x, r.center.y, r.center.z, t)), Fe(this._camera)) {
      const a = this.getDistanceToFitSphere(r.radius);
      i.push(this.dollyTo(a, t));
    } else if (Ie(this._camera)) {
      const a = this._camera.right - this._camera.left, o = this._camera.top - this._camera.bottom, c = 2 * r.radius, l = Math.min(a / c, o / c);
      i.push(this.zoomTo(l, t));
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
  setLookAt(e, t, i, n, r, a, o = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = tt.NONE, this._changedDolly = 0;
    const c = N.set(n, r, a), l = L.set(e, t, i);
    this._targetEnd.copy(c), this._sphericalEnd.setFromVector3(l.sub(c).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
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
  lerpLookAt(e, t, i, n, r, a, o, c, l, u, p, m, _, w = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = tt.NONE, this._changedDolly = 0;
    const x = L.set(n, r, a), T = N.set(e, t, i);
    ve.setFromVector3(T.sub(x).applyQuaternion(this._yAxisUpSpace));
    const g = st.set(u, p, m), v = N.set(o, c, l);
    Et.setFromVector3(v.sub(g).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(x.lerp(g, _));
    const E = Et.theta - ve.theta, b = Et.phi - ve.phi, P = Et.radius - ve.radius;
    this._sphericalEnd.set(ve.radius + P * _, ve.phi + b * _, ve.theta + E * _), this.normalizeRotations(), this._needsUpdate = !0, w || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const O = !w || z(this._target.x, this._targetEnd.x, this.restThreshold) && z(this._target.y, this._targetEnd.y, this.restThreshold) && z(this._target.z, this._targetEnd.z, this.restThreshold) && z(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && z(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && z(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(O);
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
    const r = this.getPosition(L), a = this.setLookAt(r.x, r.y, r.z, e, t, i, n);
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
  setFocalOffset(e, t, i, n = !1) {
    this._isUserControllingOffset = !1, this._focalOffsetEnd.set(e, t, i), this._needsUpdate = !0, n || this._focalOffset.copy(this._focalOffsetEnd);
    const r = !n || z(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && z(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && z(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
  setOrbitPoint(e, t, i) {
    this._camera.updateMatrixWorld(), Ce.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), we.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), ze.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = L.set(e, t, i), r = n.distanceTo(this._camera.position), a = n.sub(this._camera.position);
    Ce.multiplyScalar(a.x), we.multiplyScalar(a.y), ze.multiplyScalar(a.z), L.copy(Ce).add(we).add(ze), L.z = L.z + r, this.dollyTo(r, !1), this.setFocalOffset(-L.x, L.y, -L.z, !1), this.moveTo(e, t, i, !1);
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
    this._viewport = this._viewport || new R.Vector4(), typeof e == "number" ? this._viewport.set(e, t, i, n) : this._viewport.copy(e);
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
    if (mi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const r = e / t, a = this._camera.getEffectiveFOV() * _t, o = this._camera.aspect;
    return ((n ? r > o : r < o) ? t : e / o) * 0.5 / Math.tan(a * 0.5) + i * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (mi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * _t, i = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : i;
    return e / Math.sin(n * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, t = !0) {
    return (e && e.isVector3 ? e : new R.Vector3()).copy(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, t = !0) {
    return (e && e.isVector3 ? e : new R.Vector3()).setFromSpherical(t ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, t = !0) {
    return (e || new R.Spherical()).copy(t ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, t = !0) {
    return (e && e.isVector3 ? e : new R.Vector3()).copy(t ? this._focalOffsetEnd : this._focalOffset);
  }
  /**
   * Normalize camera azimuth angle rotation between 0 and 360 degrees.
   * @category Methods
   */
  normalizeRotations() {
    this._sphericalEnd.theta = this._sphericalEnd.theta % it, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += it), this._spherical.theta += it * Math.round((this._sphericalEnd.theta - this._spherical.theta) / it);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, zt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
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
    const t = this._sphericalEnd.theta - this._spherical.theta, i = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, r = gs.subVectors(this._targetEnd, this._target), a = _s.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (V(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Nt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (V(i))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Nt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (V(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const p = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Nt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, p, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (V(r.x) && V(r.y) && V(r.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const p = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      ms(this._target, this._targetEnd, this._targetVelocity, p, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (V(a.x) && V(a.y) && V(a.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const p = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      ms(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, p, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (V(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const p = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Nt(this._zoom, this._zoomEnd, this._zoomVelocity, p, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (Fe(this._camera) && this._changedDolly !== 0) {
        const p = this._spherical.radius - this._lastDistance, m = this._camera, _ = this._getCameraDirection(bt), w = L.copy(_).cross(m.up).normalize();
        w.lengthSq() === 0 && (w.x = 1);
        const x = N.crossVectors(w, _), T = this._sphericalEnd.radius * Math.tan(m.getEffectiveFOV() * _t * 0.5), v = (this._sphericalEnd.radius - p - this._sphericalEnd.radius) / this._sphericalEnd.radius, E = st.copy(this._targetEnd).add(w.multiplyScalar(this._dollyControlCoord.x * T * m.aspect)).add(x.multiplyScalar(this._dollyControlCoord.y * T)), b = L.copy(this._targetEnd).lerp(E, v), P = this._lastDollyDirection === tt.IN && this._spherical.radius <= this.minDistance, O = this._lastDollyDirection === tt.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (P || O)) {
          this._sphericalEnd.radius -= p, this._spherical.radius -= p;
          const X = N.copy(_).multiplyScalar(-p);
          b.add(X);
        }
        this._boundary.clampPoint(b, b);
        const j = N.subVectors(b, this._targetEnd);
        this._targetEnd.copy(b), this._target.add(j), this._changedDolly -= p, V(this._changedDolly) && (this._changedDolly = 0);
      } else if (Ie(this._camera) && this._changedZoom !== 0) {
        const p = this._zoom - this._lastZoom, m = this._camera, _ = L.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (m.near + m.far) / (m.near - m.far)).unproject(m), w = N.set(0, 0, -1).applyQuaternion(m.quaternion), x = st.copy(_).add(w.multiplyScalar(-_.dot(m.up))), g = -(this._zoom - p - this._zoom) / this._zoom, v = this._getCameraDirection(bt), E = this._targetEnd.dot(v), b = L.copy(this._targetEnd).lerp(x, g), P = b.dot(v), O = v.multiplyScalar(P - E);
        b.sub(O), this._boundary.clampPoint(b, b);
        const j = N.subVectors(b, this._targetEnd);
        this._targetEnd.copy(b), this._target.add(j), this._changedZoom -= p, V(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const c = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, c), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!V(this._focalOffset.x) || !V(this._focalOffset.y) || !V(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Ce.setFromMatrixColumn(this._camera.matrix, 0), we.setFromMatrixColumn(this._camera.matrix, 1), ze.setFromMatrixColumn(this._camera.matrix, 2), Ce.multiplyScalar(this._focalOffset.x), we.multiplyScalar(-this._focalOffset.y), ze.multiplyScalar(this._focalOffset.z), L.copy(Ce).add(we).add(ze), this._camera.position.add(L)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), L.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const u = this._needsUpdate;
    return u && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : u ? (this.dispatchEvent({ type: "update" }), V(t, this.restThreshold) && V(i, this.restThreshold) && V(n, this.restThreshold) && V(r.x, this.restThreshold) && V(r.y, this.restThreshold) && V(r.z, this.restThreshold) && V(a.x, this.restThreshold) && V(a.y, this.restThreshold) && V(a.z, this.restThreshold) && V(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !u && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = u, this._needsUpdate = !1, u;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: vt(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: vt(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: vt(this.maxPolarAngle),
      minAzimuthAngle: vt(this.minAzimuthAngle),
      maxAzimuthAngle: vt(this.maxAzimuthAngle),
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
    this.enabled = i.enabled, this.minDistance = i.minDistance, this.maxDistance = yt(i.maxDistance), this.minZoom = i.minZoom, this.maxZoom = yt(i.maxZoom), this.minPolarAngle = i.minPolarAngle, this.maxPolarAngle = yt(i.maxPolarAngle), this.minAzimuthAngle = yt(i.minAzimuthAngle), this.maxAzimuthAngle = yt(i.maxAzimuthAngle), this.smoothTime = i.smoothTime, this.draggingSmoothTime = i.draggingSmoothTime, this.dollySpeed = i.dollySpeed, this.truckSpeed = i.truckSpeed, this.dollyToCursor = i.dollyToCursor, this.verticalDragToForward = i.verticalDragToForward, this._target0.fromArray(i.target0), this._position0.fromArray(i.position0), this._zoom0 = i.zoom0, this._focalOffset0.fromArray(i.focalOffset0), this.moveTo(i.target[0], i.target[1], i.target[2], t), ve.setFromVector3(L.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(ve.theta, ve.phi, t), this.dollyTo(ve.radius, t), this.zoomTo(i.zoom, t), this.setFocalOffset(i.focalOffset[0], i.focalOffset[1], i.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", _r), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const r = N.copy(t).add(e), o = this._boundary.clampPoint(r, st).sub(r), c = o.lengthSq();
    if (c === 0)
      return e.add(t);
    if (c === n)
      return e;
    if (i === 0)
      return e.add(t).add(o);
    {
      const l = 1 + i * c / t.dot(o);
      return e.add(N.copy(t).multiplyScalar(l)).add(o.multiplyScalar(1 - i));
    }
  }
  _updateNearPlaneCorners() {
    if (Fe(this._camera)) {
      const e = this._camera, t = e.near, i = e.getEffectiveFOV() * _t, n = Math.tan(i * 0.5) * t, r = n * e.aspect;
      this._nearPlaneCorners[0].set(-r, -n, 0), this._nearPlaneCorners[1].set(r, -n, 0), this._nearPlaneCorners[2].set(r, n, 0), this._nearPlaneCorners[3].set(-r, n, 0);
    } else if (Ie(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, i = e.left * t, n = e.right * t, r = e.top * t, a = e.bottom * t;
      this._nearPlaneCorners[0].set(i, r, 0), this._nearPlaneCorners[1].set(n, r, 0), this._nearPlaneCorners[2].set(n, a, 0), this._nearPlaneCorners[3].set(i, a, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || mi(this._camera, "_collisionTest"))
      return e;
    const i = this._getTargetDirection(bt);
    yi.lookAt(fs, i, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const r = N.copy(this._nearPlaneCorners[n]);
      r.applyMatrix4(yi);
      const a = st.addVectors(this._target, r);
      Ht.set(a, i), Ht.far = this._spherical.radius + 1;
      const o = Ht.intersectObjects(this.colliderMeshes);
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
  static createBoundingSphere(e, t = new R.Sphere()) {
    const i = t, n = i.center;
    nt.makeEmpty(), e.traverseVisible((a) => {
      a.isMesh && nt.expandByObject(a);
    }), nt.getCenter(n);
    let r = 0;
    return e.traverseVisible((a) => {
      if (!a.isMesh)
        return;
      const o = a, c = o.geometry.clone();
      c.applyMatrix4(o.matrixWorld);
      const u = c.attributes.position;
      for (let p = 0, m = u.count; p < m; p++)
        L.fromBufferAttribute(u, p), r = Math.max(r, n.distanceToSquared(L));
    }), i.radius = Math.sqrt(r), i;
  }
}
const Kt = (s) => {
  const [e, t] = Z(s.options[s.index]), i = () => {
    s.onToggle(!s.open);
  }, n = (r) => {
    r !== e && (s.onSelect(r), t(r)), s.onToggle(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `dropdown ${s.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "dropdown-toggle", onClick: i, children: `${s.title}: ${e}` }),
    s.open && /* @__PURE__ */ d.jsx("ul", { className: "dropdown-menu", children: s.options.map((r) => /* @__PURE__ */ d.jsx("li", { onClick: () => n(r), children: r }, r)) })
  ] });
}, He = pa(function(e, t) {
  const i = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, r] = Z("Renderer"), [a, o] = Z(!1), [c, l] = Z(!1), [u, p] = Z(!1);
  return /* @__PURE__ */ d.jsxs("div", { className: `CameraWindow ${e.name}`, children: [
    /* @__PURE__ */ d.jsx("div", { ref: t, className: "clickable", onClick: () => {
      u && p(!1);
    } }),
    /* @__PURE__ */ d.jsxs("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ d.jsx(
        Kt,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: u,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (m) => {
            p(m);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Kt,
        {
          title: "Mode",
          index: i.indexOf(n),
          open: c,
          options: i,
          onSelect: (m) => {
            if (m === n)
              return;
            const _ = m;
            e.onSelectRenderMode(_), r(_);
          },
          onToggle: (m) => {
            a && o(!1), l(m);
          },
          up: !0
        }
      )
    ] })
  ] });
});
class yr extends Qs {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: qn,
      side: Ri,
      transparent: !0,
      uniforms: {
        uScale: {
          value: e?.scale !== void 0 ? e?.scale : 0.1
        },
        uDivisions: {
          value: e?.divisions !== void 0 ? e?.divisions : 10
        },
        uColor: {
          value: e?.color !== void 0 ? e?.color : new Mt(16777215)
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
class br extends S {
  gridMaterial;
  constructor() {
    const e = new yr();
    super(new $s(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
function bs(s) {
  const [e, t] = Z(s.selected), i = "toggle" + (e ? " selected" : "");
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      className: i,
      onClick: () => {
        const n = !e;
        t(n), s.onClick(n);
      },
      style: {
        backgroundImage: `url(${s.icon})`,
        backgroundPositionY: `${s.top}px`,
        backgroundSize: `26px ${s.height}px`
      }
    },
    s.name
  );
}
const Er = `#include <common>
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
}`, Cr = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class wr extends Qs {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Er,
      fragmentShader: Cr
    });
  }
}
const Ye = new Qt(), re = new M(), Re = new M(), W = new fe(), Es = {
  X: new M(1, 0, 0),
  Y: new M(0, 1, 0),
  Z: new M(0, 0, 1)
}, bi = { type: "change" }, Cs = { type: "mouseDown", mode: null }, ws = { type: "mouseUp", mode: null }, Ss = { type: "objectChange" };
class Sr extends Xs {
  constructor(e, t = null) {
    super(void 0, t);
    const i = new Ar(this);
    this._root = i;
    const n = new Dr();
    this._gizmo = n, i.add(n);
    const r = new Rr();
    this._plane = r, i.add(r);
    const a = this;
    function o(E, b) {
      let P = b;
      Object.defineProperty(a, E, {
        get: function() {
          return P !== void 0 ? P : b;
        },
        set: function(O) {
          P !== O && (P = O, r[E] = O, n[E] = O, a.dispatchEvent({ type: E + "-changed", value: O }), a.dispatchEvent(bi));
        }
      }), a[E] = b, r[E] = b, n[E] = b;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const c = new M(), l = new M(), u = new fe(), p = new fe(), m = new M(), _ = new fe(), w = new M(), x = new M(), T = new M(), g = 0, v = new M();
    o("worldPosition", c), o("worldPositionStart", l), o("worldQuaternion", u), o("worldQuaternionStart", p), o("cameraPosition", m), o("cameraQuaternion", _), o("pointStart", w), o("pointEnd", x), o("rotationAxis", T), o("rotationAngle", g), o("eye", v), this._offset = new M(), this._startNorm = new M(), this._endNorm = new M(), this._cameraScale = new M(), this._parentPosition = new M(), this._parentQuaternion = new fe(), this._parentQuaternionInv = new fe(), this._parentScale = new M(), this._worldScaleStart = new M(), this._worldQuaternionInv = new fe(), this._worldScale = new M(), this._positionStart = new M(), this._quaternionStart = new fe(), this._scaleStart = new M(), this._getPointer = xr.bind(this), this._onPointerDown = Tr.bind(this), this._onPointerHover = Or.bind(this), this._onPointerMove = Mr.bind(this), this._onPointerUp = Pr.bind(this), t !== null && this.connect();
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
    e !== null && Ye.setFromCamera(e, this.camera);
    const t = Ei(this._gizmo.picker[this.mode], Ye);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && Ye.setFromCamera(e, this.camera);
      const t = Ei(this._plane, Ye, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, Cs.mode = this.mode, this.dispatchEvent(Cs);
    }
  }
  pointerMove(e) {
    const t = this.axis, i = this.mode, n = this.object;
    let r = this.space;
    if (i === "scale" ? r = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (r = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && Ye.setFromCamera(e, this.camera);
    const a = Ei(this._plane, Ye, !0);
    if (a) {
      if (this.pointEnd.copy(a.point).sub(this.worldPositionStart), i === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (n.position.applyQuaternion(W.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), r === "world" && (n.parent && n.position.add(re.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(re.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (i === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), Re.set(o, o, o);
        } else
          re.copy(this.pointStart), Re.copy(this.pointEnd), re.applyQuaternion(this._worldQuaternionInv), Re.applyQuaternion(this._worldQuaternionInv), Re.divide(re), t.search("X") === -1 && (Re.x = 1), t.search("Y") === -1 && (Re.y = 1), t.search("Z") === -1 && (Re.z = 1);
        n.scale.copy(this._scaleStart).multiply(Re), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (i === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(re.setFromMatrixPosition(this.camera.matrixWorld));
        let c = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(re.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(Es[t]), re.copy(Es[t]), r === "local" && re.applyQuaternion(this.worldQuaternion), re.cross(this.eye), re.length() === 0 ? c = !0 : this.rotationAngle = this._offset.dot(re.normalize()) * o), (t === "E" || c) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(W.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(W.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(bi), this.dispatchEvent(Ss);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (ws.mode = this.mode, this.dispatchEvent(ws)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(bi), this.dispatchEvent(Ss), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return Ye;
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
function xr(s) {
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
function Or(s) {
  if (this.enabled)
    switch (s.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(s));
        break;
    }
}
function Tr(s) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(s)), this.pointerDown(this._getPointer(s)));
}
function Mr(s) {
  this.enabled && this.pointerMove(this._getPointer(s));
}
function Pr(s) {
  this.enabled && (this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(s)));
}
function Ei(s, e, t) {
  const i = e.intersectObject(s, !0);
  for (let n = 0; n < i.length; n++)
    if (i[n].object.visible || t)
      return i[n];
  return !1;
}
const Yt = new qs(), B = new M(0, 1, 0), xs = new M(0, 0, 0), Os = new Jt(), Bt = new fe(), Xt = new fe(), Se = new M(), Ts = new Jt(), xt = new M(1, 0, 0), Ve = new M(0, 1, 0), Ot = new M(0, 0, 1), Vt = new M(), Ct = new M(), wt = new M();
class Ar extends ct {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class Dr extends ct {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new Ge({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Ii({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), i = e.clone();
    i.opacity = 0.15;
    const n = t.clone();
    n.opacity = 0.5;
    const r = e.clone();
    r.color.setHex(16711680);
    const a = e.clone();
    a.color.setHex(65280);
    const o = e.clone();
    o.color.setHex(255);
    const c = e.clone();
    c.color.setHex(16711680), c.opacity = 0.5;
    const l = e.clone();
    l.color.setHex(65280), l.opacity = 0.5;
    const u = e.clone();
    u.color.setHex(255), u.opacity = 0.5;
    const p = e.clone();
    p.opacity = 0.25;
    const m = e.clone();
    m.color.setHex(16776960), m.opacity = 0.25, e.clone().color.setHex(16776960);
    const w = e.clone();
    w.color.setHex(7895160);
    const x = new de(0, 0.04, 0.1, 12);
    x.translate(0, 0.05, 0);
    const T = new ae(0.08, 0.08, 0.08);
    T.translate(0, 0.04, 0);
    const g = new lt();
    g.setAttribute("position", new Ze([0, 0, 0, 1, 0, 0], 3));
    const v = new de(75e-4, 75e-4, 0.5, 3);
    v.translate(0, 0.25, 0);
    function E(Q, ke) {
      const he = new ut(Q, 75e-4, 3, 64, ke * Math.PI * 2);
      return he.rotateY(Math.PI / 2), he.rotateX(Math.PI / 2), he;
    }
    function b() {
      const Q = new lt();
      return Q.setAttribute("position", new Ze([0, 0, 0, 1, 1, 1], 3)), Q;
    }
    const P = {
      X: [
        [new S(x, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new S(x, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new S(v, r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new S(x, a), [0, 0.5, 0]],
        [new S(x, a), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new S(v, a)]
      ],
      Z: [
        [new S(x, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new S(x, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new S(v, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new S(new Ut(0.1, 0), p.clone()), [0, 0, 0]]
      ],
      XY: [
        [new S(new ae(0.15, 0.15, 0.01), u.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new S(new ae(0.15, 0.15, 0.01), c.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new S(new ae(0.15, 0.15, 0.01), l.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, O = {
      X: [
        [new S(new de(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new S(new de(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new S(new de(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new S(new de(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new S(new de(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new S(new de(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new S(new Ut(0.2, 0), i)]
      ],
      XY: [
        [new S(new ae(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new S(new ae(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new S(new ae(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, j = {
      START: [
        [new S(new Ut(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new S(new Ut(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new xe(b(), n), null, null, null, "helper"]
      ],
      X: [
        [new xe(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new xe(g, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new xe(g, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, X = {
      XYZE: [
        [new S(E(0.5, 1), w), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new S(E(0.5, 0.5), r)]
      ],
      Y: [
        [new S(E(0.5, 0.5), a), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new S(E(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new S(E(0.75, 1), m), null, [0, Math.PI / 2, 0]]
      ]
    }, ge = {
      AXIS: [
        [new xe(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, De = {
      XYZE: [
        [new S(new Ks(0.25, 10, 8), i)]
      ],
      X: [
        [new S(new ut(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new S(new ut(0.5, 0.1, 4, 24), i), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new S(new ut(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new S(new ut(0.75, 0.1, 2, 24), i)]
      ]
    }, ht = {
      X: [
        [new S(T, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new S(v, r), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new S(T, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new S(T, a), [0, 0.5, 0]],
        [new S(v, a)],
        [new S(T, a), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new S(T, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new S(v, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new S(T, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new S(new ae(0.15, 0.15, 0.01), u), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new S(new ae(0.15, 0.15, 0.01), c), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new S(new ae(0.15, 0.15, 0.01), l), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new S(new ae(0.1, 0.1, 0.1), p.clone())]
      ]
    }, Qe = {
      X: [
        [new S(new de(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new S(new de(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new S(new de(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new S(new de(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new S(new de(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new S(new de(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new S(new ae(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new S(new ae(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new S(new ae(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new S(new ae(0.2, 0.2, 0.2), i), [0, 0, 0]]
      ]
    }, me = {
      X: [
        [new xe(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new xe(g, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new xe(g, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function te(Q) {
      const ke = new ct();
      for (const he in Q)
        for (let Me = Q[he].length; Me--; ) {
          const se = Q[he][Me][0].clone(), Ue = Q[he][Me][1], je = Q[he][Me][2], Ne = Q[he][Me][3], Pt = Q[he][Me][4];
          se.name = he, se.tag = Pt, Ue && se.position.set(Ue[0], Ue[1], Ue[2]), je && se.rotation.set(je[0], je[1], je[2]), Ne && se.scale.set(Ne[0], Ne[1], Ne[2]), se.updateMatrix();
          const At = se.geometry.clone();
          At.applyMatrix4(se.matrix), se.geometry = At, se.renderOrder = 1 / 0, se.position.set(0, 0, 0), se.rotation.set(0, 0, 0), se.scale.set(1, 1, 1), ke.add(se);
        }
      return ke;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = te(P)), this.add(this.gizmo.rotate = te(X)), this.add(this.gizmo.scale = te(ht)), this.add(this.picker.translate = te(O)), this.add(this.picker.rotate = te(De)), this.add(this.picker.scale = te(Qe)), this.add(this.helper.translate = te(j)), this.add(this.helper.rotate = te(ge)), this.add(this.helper.scale = te(me)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const i = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : Xt;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      a.visible = !0, a.rotation.set(0, 0, 0), a.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), a.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), a.tag === "helper") {
        a.visible = !1, a.name === "AXIS" ? (a.visible = !!this.axis, this.axis === "X" && (W.setFromEuler(Yt.set(0, 0, 0)), a.quaternion.copy(i).multiply(W), Math.abs(B.copy(xt).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Y" && (W.setFromEuler(Yt.set(0, 0, Math.PI / 2)), a.quaternion.copy(i).multiply(W), Math.abs(B.copy(Ve).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Z" && (W.setFromEuler(Yt.set(0, Math.PI / 2, 0)), a.quaternion.copy(i).multiply(W), Math.abs(B.copy(Ot).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "XYZE" && (W.setFromEuler(Yt.set(0, Math.PI / 2, 0)), B.copy(this.rotationAxis), a.quaternion.setFromRotationMatrix(Os.lookAt(xs, B, Ve)), a.quaternion.multiply(W), a.visible = this.dragging), this.axis === "E" && (a.visible = !1)) : a.name === "START" ? (a.position.copy(this.worldPositionStart), a.visible = this.dragging) : a.name === "END" ? (a.position.copy(this.worldPosition), a.visible = this.dragging) : a.name === "DELTA" ? (a.position.copy(this.worldPositionStart), a.quaternion.copy(this.worldQuaternionStart), re.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), re.applyQuaternion(this.worldQuaternionStart.clone().invert()), a.scale.copy(re), a.visible = this.dragging) : (a.quaternion.copy(i), this.dragging ? a.position.copy(this.worldPositionStart) : a.position.copy(this.worldPosition), this.axis && (a.visible = this.axis.search(a.name) !== -1));
        continue;
      }
      a.quaternion.copy(i), this.mode === "translate" || this.mode === "scale" ? (a.name === "X" && Math.abs(B.copy(xt).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Y" && Math.abs(B.copy(Ve).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Z" && Math.abs(B.copy(Ot).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XY" && Math.abs(B.copy(Ot).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "YZ" && Math.abs(B.copy(xt).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XZ" && Math.abs(B.copy(Ve).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1)) : this.mode === "rotate" && (Bt.copy(i), B.copy(this.eye).applyQuaternion(W.copy(i).invert()), a.name.search("E") !== -1 && a.quaternion.setFromRotationMatrix(Os.lookAt(this.eye, xs, Ve)), a.name === "X" && (W.setFromAxisAngle(xt, Math.atan2(-B.y, B.z)), W.multiplyQuaternions(Bt, W), a.quaternion.copy(W)), a.name === "Y" && (W.setFromAxisAngle(Ve, Math.atan2(B.x, B.z)), W.multiplyQuaternions(Bt, W), a.quaternion.copy(W)), a.name === "Z" && (W.setFromAxisAngle(Ot, Math.atan2(B.y, B.x)), W.multiplyQuaternions(Bt, W), a.quaternion.copy(W))), a.visible = a.visible && (a.name.indexOf("X") === -1 || this.showX), a.visible = a.visible && (a.name.indexOf("Y") === -1 || this.showY), a.visible = a.visible && (a.name.indexOf("Z") === -1 || this.showZ), a.visible = a.visible && (a.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), a.material._color = a.material._color || a.material.color.clone(), a.material._opacity = a.material._opacity || a.material.opacity, a.material.color.copy(a.material._color), a.material.opacity = a.material._opacity, this.enabled && this.axis && (a.name === this.axis || this.axis.split("").some(function(c) {
        return a.name === c;
      })) && (a.material.color.setHex(16776960), a.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class Rr extends S {
  constructor() {
    super(
      new $s(1e5, 1e5, 2, 2),
      new Ge({ visible: !1, wireframe: !0, side: Ri, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), Vt.copy(xt).applyQuaternion(t === "local" ? this.worldQuaternion : Xt), Ct.copy(Ve).applyQuaternion(t === "local" ? this.worldQuaternion : Xt), wt.copy(Ot).applyQuaternion(t === "local" ? this.worldQuaternion : Xt), B.copy(Ct), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            B.copy(this.eye).cross(Vt), Se.copy(Vt).cross(B);
            break;
          case "Y":
            B.copy(this.eye).cross(Ct), Se.copy(Ct).cross(B);
            break;
          case "Z":
            B.copy(this.eye).cross(wt), Se.copy(wt).cross(B);
            break;
          case "XY":
            Se.copy(wt);
            break;
          case "YZ":
            Se.copy(Vt);
            break;
          case "XZ":
            B.copy(wt), Se.copy(Ct);
            break;
          case "XYZ":
          case "E":
            Se.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        Se.set(0, 0, 0);
    }
    Se.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Ts.lookAt(re.set(0, 0, 0), Se, B), this.quaternion.setFromRotationMatrix(Ts)), super.updateMatrixWorld(e);
  }
}
class ce extends Rs {
  static DRAG_START = "Transform::dragStart";
  static DRAG_END = "Transform::dragEnd";
  static _instance;
  three;
  activeCamera;
  controls = /* @__PURE__ */ new Map();
  visibility = /* @__PURE__ */ new Map();
  constructor() {
    super(), D.addEventListener(A.SET_SCENE, this.setScene);
  }
  clear() {
    for (const e of this.controls.values()) {
      e.detach(), e.disconnect();
      const t = e.getHelper();
      Ae(t);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(e) {
    let t = this.controls.get(e);
    if (t === void 0) {
      const i = document.querySelector(".clickable");
      t = new Sr(this.activeCamera, i), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: ce.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: ce.DRAG_END });
      }), t.addEventListener("dragging-changed", (n) => {
        Te.instance?.toggleOrbitControls(n.value);
      });
    }
    return t;
  }
  get(e) {
    return this.controls.get(e);
  }
  remove(e) {
    const t = this.get(e);
    return t === void 0 ? !1 : (t.detach(), t.disconnect(), Ae(t.getHelper()), this.controls.delete(e), !0);
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
  setScene = () => {
    this.clear();
  };
  static get instance() {
    return ce._instance || (ce._instance = new ce()), ce._instance;
  }
}
const Ir = new ae(), Ci = new oe();
class Ms extends ct {
  curve = new Ki();
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
    const i = new Mt(et(0.5, 1, Math.random()), et(0.5, 1, Math.random()), et(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Ii({ color: i }), this.line = new xe(new lt(), this.lineMaterial), this.line.name = "line", this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = i, this.draggable = new ct(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new S(new Ks(1.5), new Ge({ color: i })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new Qt(), this.raycaster.params.Line.threshold = 3, this.enable();
  }
  enable() {
    document.addEventListener("pointerdown", this.onMouseClick);
  }
  disable() {
    document.removeEventListener("pointerdown", this.onMouseClick);
  }
  dispose = () => {
    this._transform && (this._transform.removeEventListener("objectChange", this.updateSpline), ce.instance.remove(this.name)), this.disable(), this.parentGroup.removeGroup(this.name);
  };
  hideTransform = () => {
    this._transform?.detach();
  };
  exportSpline = () => {
    const e = [];
    this.draggable.children.forEach((t) => {
      e.push([be(t.position.x, 3), be(t.position.y, 3), be(t.position.z, 3)]);
    }), ma({
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
      this.addPoint(new M(-50, 0, 0), !1), this.addPoint(new M(50, 0, 0));
  };
  addPoint = (e, t = !0) => {
    const i = this.draggable.children.length, n = new S(Ir, this.draggedMat);
    return n.name = `point_${i}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), t && this.updateSpline(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = new M(
      et(-this.offset, this.offset, Math.random()),
      et(-this.offset, this.offset, Math.random()),
      et(-this.offset, this.offset, Math.random())
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
    Ae(e), this.updateSpline();
  };
  removePointAt = (e) => {
    const t = this.draggable.children[e];
    this.removePoint(t);
  };
  removeSelectedPt = () => {
    this._transform?.object !== void 0 && this.removePoint(this._transform?.object);
  };
  updateSpline = () => {
    this.curve = new Ki(this.points, this.closed, this.curveType, this.tension), this.line.geometry.setFromPoints(this.getPoints()), this.curvePos.position.copy(this.getPointAt(this._curvePercentage));
  };
  // Handlers
  onMouseClick = (e) => {
    if (!Te.instance || this._transform && !this._transform.getHelper().visible)
      return;
    const i = Te.instance.currentWindow.current.getBoundingClientRect();
    Ci.x = (e.clientX - i.x) / i.width * 2 - 1, Ci.y = -((e.clientY - i.y) / i.height) * 2 + 1, this.raycaster.setFromCamera(Ci, this.camera);
    const n = this.raycaster.intersectObjects(this.draggable.children, !1);
    if (n.length > 0) {
      const r = n[0].object;
      r !== this._transform?.object && (this._transform?.attach(r), this.group.current?.setField("Current Point", r.position));
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
    this.parentGroup = e, this._transform = ce.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), this._transform.attach(t.length > 0 ? t[t.length - 1] : this), Te.instance?.scene.add(this._transform.getHelper());
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
          prop: "Toggle Transform",
          type: "button"
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
      onUpdate: (n, r) => {
        switch (n) {
          case "Closed":
            this.closed = r, this.updateSpline();
            break;
          case "Visible":
            this.visible = r;
            break;
          case "Color":
            this.lineMaterial.color.setStyle(r), this.draggedMat.color.setStyle(r);
            break;
          case "Curve":
            this.curveType = r, this.updateSpline();
            break;
          case "Draggable Scale":
            this.draggableScale = r;
            break;
          case "Subdivide":
            this.subdivide = r, this.updateSpline();
            break;
          case "Tension":
            this.tension = r, this.updateSpline();
            break;
          case "New Pt Offset":
            this.offset = r;
            break;
          case "Curve At":
            this.curvePos.position.copy(this.getPointAt(r));
            break;
          case "Show Position":
            this.curvePos.visible = r;
            break;
          case "Show Points":
            this.draggable.visible = r;
            break;
          case "Toggle Transform":
            this._transform && (this._transform.getHelper().visible = !this._transform.getHelper().visible);
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
            Ae(this);
            break;
          case "Current Point":
            if (this.group.current && this._transform?.object) {
              const a = this._transform?.object;
              a.name.search("point") > -1 && (a.position.copy(r), this.updateSpline());
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
let Zt = 0;
class Lr extends ct {
  defaultScale = 10;
  _camera;
  group = null;
  constructor(e) {
    super(), this.name = "Spline Editor", this._camera = e, D.addEventListener(A.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = J.addEditorGroup({
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
    D.removeEventListener(A.ADD_SPLINE, this.onAddSpline), J.removeEditorGroup(this.name);
  }
  addSpline(e) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current), this.add(e);
  }
  createSpline = (e = []) => {
    const t = `Spline ${Zt + 1}`, i = new Ms(t, this._camera);
    return i.addPoints(e), this.addSpline(i), Zt++, i;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((i) => {
      t.push(new M(i[0], i[1], i[2]));
    }), this.createSpline(t);
  };
  createSplineFromCatmullRom = (e) => this.createSpline(e.points);
  createSplineFromJSON = (e) => {
    const t = this.createSplineFromArray(e.points);
    return t.name = e.name, t.closed = e.closed, t.subdivide = e.subdivide, t.tension = e.tension, t.type = e.type, t.updateSpline(), t;
  };
  showPoints = (e = !0) => {
    this.children.forEach((t) => {
      t.showPoints(e);
    });
  };
  onAddSpline = (e) => {
    const t = JSON.parse(e.value), i = `Spline ${Zt + 1}`, n = [];
    t.points.forEach((a) => {
      n.push(new M(a[0], a[1], a[2]));
    });
    const r = new Ms(i, this.camera);
    r.addPoints(n), this.addSpline(r), Zt++;
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
const Ps = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], kr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", Ur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==";
class Te extends ei {
  static instance = null;
  scene = new Ds();
  renderer;
  currentScene;
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  helpersContainer = new Kn();
  grid = new br();
  axisHelper = new Ji(500);
  interactionHelper = new Ji(100);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial = new Jn();
  normalsMaterial = new ea();
  uvMaterial = new wr();
  wireframeMaterial = new Ge({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  });
  // Playback
  playing = !1;
  rafID = -1;
  cameraControlsRafID = -1;
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
  cameraVisibility = !0;
  lightVisibility = !0;
  // Interactions
  selectedItem = void 0;
  debugCamera;
  raycaster = new Qt();
  pointer = new oe();
  cameraControls = void 0;
  // References
  canvasRef;
  containerRef;
  tlWindow;
  trWindow;
  blWindow;
  brWindow;
  constructor(e) {
    super(e), this.canvasRef = Le(), this.containerRef = Le(), this.tlWindow = Le(), this.trWindow = Le(), this.blWindow = Le(), this.brWindow = Le();
    const t = e.three.app.appID, i = localStorage, n = i.getItem(`${t}_mode`);
    this.state = {
      mode: n !== null ? n : "Single",
      modeOpen: !1,
      renderModeOpen: !1,
      interactionMode: "Orbit",
      interactionModeOpen: !1,
      lastUpdate: Date.now()
    }, i.setItem(`${t}_mode`, this.state.mode), i.setItem(`${t}_tlCam`, i.getItem(`${t}_tlCam`) !== null ? i.getItem(`${t}_tlCam`) : "Debug"), i.setItem(`${t}_trCam`, i.getItem(`${t}_trCam`) !== null ? i.getItem(`${t}_trCam`) : "Orthographic"), i.setItem(`${t}_blCam`, i.getItem(`${t}_blCam`) !== null ? i.getItem(`${t}_blCam`) : "Front"), i.setItem(`${t}_brCam`, i.getItem(`${t}_brCam`) !== null ? i.getItem(`${t}_brCam`) : "Top"), i.setItem(`${t}_tlRender`, i.getItem(`${t}_tlRender`) !== null ? i.getItem(`${t}_tlRender`) : "Renderer"), i.setItem(`${t}_trRender`, i.getItem(`${t}_trRender`) !== null ? i.getItem(`${t}_trRender`) : "Renderer"), i.setItem(`${t}_blRender`, i.getItem(`${t}_blRender`) !== null ? i.getItem(`${t}_blRender`) : "Renderer"), i.setItem(`${t}_brRender`, i.getItem(`${t}_brRender`) !== null ? i.getItem(`${t}_brRender`) : "Renderer");
    const r = {
      Vector2: oe,
      Vector3: M,
      Vector4: ca,
      Quaternion: fe,
      Matrix4: Jt,
      Spherical: Si,
      Box3: ha,
      Sphere: da,
      Raycaster: Qt
    };
    Oe.install({ THREE: r }), this.setupScene(), this.setupTools();
    const a = localStorage.getItem(this.expandedCameraVisibility);
    this.cameraVisibility = a !== null ? a === "open" : !1, this.saveExpandedCameraVisibility();
    const o = localStorage.getItem(this.expandedLightVisibility);
    this.lightVisibility = o !== null ? o === "open" : !1, this.saveExpandedLightVisibility(), Te.instance = this;
  }
  componentDidMount() {
    this.setupRenderer(), this.enable(), this.assignControls(), this.resize(), this.play(), ce.instance.three = this.props.three, ce.instance.activeCamera = this.debugCamera;
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
          He,
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
            He,
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
            He,
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
            He,
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
            He,
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
            He,
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
            He,
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
          Kt,
          {
            title: "View",
            index: Ps.indexOf(this.state.mode),
            options: Ps,
            onSelect: (t) => {
              t !== this.state.mode && (this.killControls(), this.setState({ mode: t }), localStorage.setItem(`${this.appID}_mode`, t));
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
          Kt,
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
        ),
        /* @__PURE__ */ d.jsx(
          bs,
          {
            name: "cameraHelper",
            icon: kr,
            selected: this.cameraVisibility,
            height: 24,
            top: 2,
            onClick: (t) => {
              if (this.cameraVisibility = t, this.saveExpandedCameraVisibility(), this.cameraHelpers.forEach((i) => {
                i.visible = t;
              }), this.selectedItem !== void 0 && !t && this.selectedItem instanceof pt) {
                const i = this.cameraHelpers.get(this.selectedItem.name);
                i !== void 0 && (i.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          bs,
          {
            name: "lightHelper",
            icon: Ur,
            selected: this.lightVisibility,
            height: 24,
            top: 4,
            onClick: (t) => {
              if (this.lightVisibility = t, this.saveExpandedLightVisibility(), this.lightHelpers.forEach((i) => {
                i.visible = t;
              }), this.selectedItem !== void 0 && !t && this.selectedItem.isLight === !0) {
                const i = this.lightHelpers.get(this.selectedItem.name);
                i !== void 0 && (i.visible = !0);
              }
            }
          }
        )
      ] }, this.state.lastUpdate)
    ] });
  }
  // Setup
  setupRenderer() {
    this.renderer = new ta({
      canvas: this.canvasRef.current,
      stencil: !1
    }), this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setClearColor(0), this.props.three.renderer = this.renderer;
  }
  setupScene() {
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.helpersContainer.add(this.grid), this.axisHelper.name = "axisHelper", this.helpersContainer.add(this.axisHelper), this.interactionHelper.name = "interactionHelper", this.helpersContainer.add(this.interactionHelper), this.interactionHelper.visible = !1;
    const e = (n, r) => {
      const a = new wi(-100, 100, 100, -100, 50, 5e3);
      return a.name = n, a.position.copy(r), a.lookAt(0, 0, 0), this.cameras.set(n, a), a;
    };
    e("Top", new M(0, 1e3, 0)), e("Bottom", new M(0, -1e3, 0)), e("Left", new M(-1e3, 0, 0)), e("Right", new M(1e3, 0, 0)), e("Front", new M(0, 0, 1e3)), e("Back", new M(0, 0, -1e3)), e("Orthographic", new M(1e3, 1e3, 1e3)), e("UI", new M()), this.debugCamera = new pt(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const t = localStorage, i = this.props.three.app.appID;
    this.tlCam = this.cameras.get(t.getItem(`${i}_tlCam`)), this.trCam = this.cameras.get(t.getItem(`${i}_trCam`)), this.blCam = this.cameras.get(t.getItem(`${i}_blCam`)), this.brCam = this.cameras.get(t.getItem(`${i}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  setupTools() {
    this.splineEditor = new Lr(this.currentCamera), this.splineEditor.initDebug(), this.scene.add(this.splineEditor);
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
    e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), D.addEventListener(A.SET_SCENE, this.sceneUpdate), D.addEventListener(A.ADD_CAMERA, this.addCamera), D.addEventListener(A.REMOVE_CAMERA, this.removeCamera), D.addEventListener(A.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const e = this.containerRef.current;
    e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), D.removeEventListener(A.SET_SCENE, this.sceneUpdate), D.removeEventListener(A.ADD_CAMERA, this.addCamera), D.removeEventListener(A.REMOVE_CAMERA, this.removeCamera), D.removeEventListener(A.SET_OBJECT, this.onSetSelectedItem);
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
    const r = i / n;
    this.cameras.forEach((a) => {
      a instanceof wi ? (a.left = i / -2, a.right = i / 2, a.top = n / 2, a.bottom = n / -2, a.name === "UI" && (a.position.x = this.width / 2, a.position.y = this.height / -2, a.position.z = 100), a.updateProjectionMatrix()) : a instanceof pt && (a.aspect = r, a.updateProjectionMatrix(), this.cameraHelpers.get(a.name)?.update());
    });
  };
  sceneUpdate = (e) => {
    this.helpersContainer.add(this.axisHelper), this.clearLightHelpers(), this.scene.remove(this.currentScene), Ae(this.currentScene);
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const i = new t();
      this.props.onSceneSet !== void 0 && this.props.onSceneSet(i), this.currentScene = i, this.props.three.scene = this.currentScene, this.scene.add(this.currentScene), this.sceneSet = !0, this.addLightHelpers();
    }
  };
  addCamera = (e) => {
    const t = e.value, i = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (i !== void 0 && this.cameras.set(t.name, i), i instanceof pt) {
      const n = new ia(i);
      n.visible = this.cameraVisibility, this.cameraHelpers.set(i.name, n), this.scene.add(n);
    }
    this.setState({ lastUpdate: Date.now() });
  };
  removeCamera = (e) => {
    const t = this.cameraHelpers.get(e.value.name);
    t !== void 0 && (this.scene.remove(t), t.dispose()), this.cameras.delete(e.value.name), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new oe();
    this.renderer.getSize(t);
    const i = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = Je(i, 0, t.x, -1, 1), this.pointer.y = Je(n, 0, t.y, 1, -1);
    const r = t.x / 2, a = t.y / 2, o = () => {
      i < r ? this.pointer.x = Je(i, 0, r, -1, 1) : this.pointer.x = Je(i, r, t.x, -1, 1);
    }, c = () => {
      n < a ? this.pointer.y = Je(n, 0, a, 1, -1) : this.pointer.y = Je(n, a, t.y, 1, -1);
    };
    switch (this.state.mode) {
      case "Quad":
        o(), c();
        break;
      case "Side by Side":
        o();
        break;
      case "Stacked":
        c(), c();
        break;
    }
    if (this.updateCamera(i, n, r, a), this.state.interactionMode === "Orbit")
      return;
    const l = this.raycaster.intersectObjects(this.currentScene.children);
    l.length > 0 && this.interactionHelper.position.copy(l[0].point);
  };
  onClick = (e) => {
    if (this.state.interactionMode === "Orbit")
      return;
    const t = new oe();
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
        e.key === "0" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Oe(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof S || this.selectedItem instanceof sa ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Oe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Oe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Oe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Oe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (e.preventDefault(), this.clearControls(), this.cameraControls = new Oe(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Pi(45), Pi(45), !0), this.updateCameraControls(t));
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
          case "q":
            this.currentTransform.setSpace(this.currentTransform.space === "local" ? "world" : "local");
            break;
        }
    }
  };
  onSetSelectedItem = (e) => {
    this.selectedItem !== void 0 && this.updateSelectedItemHelper(!1), this.selectedItem = this.currentScene.getObjectByProperty("uuid", e.value.uuid), this.selectedItem !== void 0 && (this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), ce.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = ce.instance.add(e.value.name), this.currentTransform.attach(this.selectedItem), this.scene.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform), this.updateSelectedItemHelper(!0));
  };
  updateSelectedItemHelper(e) {
    if (this.selectedItem !== void 0) {
      if (this.selectedItem instanceof pt && !this.cameraVisibility) {
        const t = this.cameraHelpers.get(this.selectedItem.name);
        t !== void 0 && (t.visible = e);
      } else if (this.selectedItem.isLight === !0 && !this.lightVisibility) {
        const t = this.lightHelpers.get(this.selectedItem.name);
        t !== void 0 && (t.visible = e);
      }
    }
  }
  onUpdateTransform = () => {
    this.selectedItem !== void 0 && (this.props.three.updateObject(this.selectedItem.uuid, "position", this.selectedItem.position), this.props.three.updateObject(this.selectedItem.uuid, "rotation", {
      x: this.selectedItem.rotation.x,
      y: this.selectedItem.rotation.y,
      z: this.selectedItem.rotation.z
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), ii.instance.update());
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
            t = new oa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new ra(e, 250), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new tr(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new aa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new na(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const i = this.controls.get(e.name);
    if (i !== void 0 && i.dispose(), this.controls.delete(e.name), e.name === "UI")
      return;
    const n = new sr(e, t);
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
    this.splineEditor.camera = this.currentCamera, this.raycaster.setFromCamera(this.pointer, this.currentCamera), this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), ce.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (e, t = !1) => {
    if (this.selectedItem === void 0)
      return;
    cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const i = 0.15, n = new la();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const r = () => {
      const a = n.getDelta();
      this.cameraControls && this.cameraControls.update(a), t && (e.target.lerp(e.target0, i), e.object.position.lerp(e.position0, i), e.object.zoom = xi(e.object.zoom, e.zoom0, i), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(r);
    };
    r();
  };
  clearControls = () => {
    this.cameraControls !== void 0 && (this.cameraControls.disconnect(), this.cameraControls.dispose(), this.cameraControls = void 0);
  };
  saveExpandedCameraVisibility() {
    localStorage.setItem(this.expandedCameraVisibility, this.cameraVisibility ? "open" : "closed");
  }
  saveExpandedLightVisibility() {
    localStorage.setItem(this.expandedLightVisibility, this.lightVisibility ? "open" : "closed");
  }
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
      const r = this.height - n;
      this.renderer?.setViewport(0, r, this.width, n), this.renderer?.setScissor(0, r, this.width, n), this.renderer?.render(this.scene, this.tlCam), this.scene.overrideMaterial = t, this.renderer?.setViewport(0, 0, this.width, n), this.renderer?.setScissor(0, 0, this.width, n), this.renderer?.render(this.scene, this.trCam);
    }
  };
  drawQuad = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), i = this.getSceneOverride(this.blRender), n = this.getSceneOverride(this.brRender), r = Math.floor(this.width / 2), a = Math.floor(this.height / 2);
    let o = 0, c = 0;
    c = this.height - a, o = 0, this.scene.overrideMaterial = e, this.renderer?.setViewport(o, c, r, a), this.renderer?.setScissor(o, c, r, a), this.renderer?.render(this.scene, this.tlCam), o = r, this.scene.overrideMaterial = t, this.renderer?.setViewport(o, c, r, a), this.renderer?.setScissor(o, c, r, a), this.renderer?.render(this.scene, this.trCam), c = 0, o = 0, this.scene.overrideMaterial = i, this.renderer?.setViewport(o, c, r, a), this.renderer?.setScissor(o, c, r, a), this.renderer?.render(this.scene, this.blCam), o = r, this.scene.overrideMaterial = n, this.renderer?.setViewport(o, c, r, a), this.renderer?.setScissor(o, c, r, a), this.renderer?.render(this.scene, this.brCam);
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
  get expandedCameraVisibility() {
    return `${this.appID}_multiviewCameraVisibility`;
  }
  get expandedLightVisibility() {
    return `${this.appID}_multiviewLightVisibility`;
  }
}
class ii extends ei {
  static instance;
  matrix = new Jt();
  position = new M();
  rotation = new qs();
  scale = new M();
  open = !1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), i = t !== null ? t === "open" : !1;
    this.open = i, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: i
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), ii.instance = this;
  }
  update() {
    if (Te.instance) {
      const e = Te.instance.selectedItem;
      if (e === void 0)
        return;
      this.position.x = be(e.position.x, 3), this.position.y = be(e.position.y, 3), this.position.z = be(e.position.z, 3), this.rotation.copy(e.rotation), this.scale.x = be(e.scale.x, 3), this.scale.y = be(e.scale.y, 3), this.scale.z = be(e.scale.z, 3), this.setState({ lastUpdated: Date.now() });
    }
  }
  render() {
    return /* @__PURE__ */ d.jsx(
      Ee,
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
            type: "euler",
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
          this.open = e, this.saveExpanded();
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
      const r = n.getObjectByProperty("uuid", this.props.object.uuid);
      q(r, e, i);
    }
  };
  saveExpanded() {
    localStorage.setItem(this.expandedName, this.open ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.app.appID}_transform`;
  }
}
function As(s) {
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
function jr(s, e) {
  function t() {
    return `${e.app.appID}_light`;
  }
  const i = localStorage.getItem(t()), n = i !== null ? i === "open" : !1;
  function r(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const a = [];
  if (s.lightInfo !== void 0)
    for (const o in s.lightInfo) {
      const c = s.lightInfo[o];
      c !== void 0 && (c.isColor !== void 0 ? a.push({
        title: As(o),
        prop: o,
        type: "color",
        value: c,
        onChange: (l, u) => {
          const p = new Mt(u);
          e.updateObject(s.uuid, l, p);
          const m = e.getScene(s.uuid);
          if (m !== null) {
            const _ = m.getObjectByProperty("uuid", s.uuid);
            q(_, l, p);
          }
        }
      }) : a.push({
        title: As(o),
        prop: o,
        type: typeof c,
        value: c,
        step: typeof c == "number" ? 0.01 : void 0,
        onChange: (l, u) => {
          e.updateObject(s.uuid, l, u);
          const p = e.getScene(s.uuid);
          if (p !== null) {
            const m = p.getObjectByProperty("uuid", s.uuid);
            q(m, l, u);
          }
        }
      }));
    }
  return /* @__PURE__ */ d.jsx(
    Ee,
    {
      title: "Light",
      items: a,
      expanded: n,
      onToggle: (o) => {
        r(o);
      }
    }
  );
}
function Nr(s) {
  const e = s.object, t = s.three;
  function i() {
    return `${t.app.appID}_animation`;
  }
  const n = localStorage.getItem(i()), r = n !== null ? n === "open" : !1;
  function a(m) {
    localStorage.setItem(i(), m ? "open" : "closed");
  }
  const o = [], c = [];
  let l = 0;
  e.animations.forEach((m) => {
    l = Math.max(l, m.duration), m.duration > 0 && c.push({
      title: m.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: m.duration,
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
  }), o.push({
    title: "Animations",
    items: c
  });
  let u;
  const p = t.getScene(e.uuid);
  if (p !== null) {
    const m = p.getObjectByProperty("uuid", e.uuid);
    if (m !== void 0) {
      const _ = m.mixer;
      if (_ !== void 0) {
        const x = [
          {
            title: "Time Scale",
            type: "range",
            value: _.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (T, g) => {
              _.timeScale = g, t.updateObject(e.uuid, "mixer.timeScale", g);
            }
          }
        ];
        x.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            _.stopAllAction(), t.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), o.push({
          title: "Mixer",
          items: x
        }), u = new ua(m), Te.instance?.scene.add(u);
      }
    }
  }
  return Xe(() => () => {
    u !== void 0 && Ae(u);
  }, []), /* @__PURE__ */ d.jsx(
    Ee,
    {
      title: "Animation",
      items: o,
      expanded: r,
      onToggle: (m) => {
        a(m);
      }
    }
  );
}
const Di = {
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
let ne = { ...Di };
function Fr(s) {
  const [e, t] = Z(-1);
  Xe(() => {
    function a(c) {
      ne = { ...c.value }, t(Date.now());
    }
    function o() {
      ne = { ...Di }, t(Date.now());
    }
    return D.addEventListener(A.SET_SCENE, o), D.addEventListener(A.SET_OBJECT, a), () => {
      D.removeEventListener(A.SET_SCENE, o), D.removeEventListener(A.SET_OBJECT, a);
    };
  }, []);
  const i = ne.type.toLowerCase(), n = ne.animations.length > 0 || ne.mixer !== void 0, r = i.search("mesh") > -1 || i.search("line") > -1 || i.search("points") > -1;
  return /* @__PURE__ */ d.jsx(
    qt,
    {
      label: "Inspector",
      button: ne.uuid.length > 0 ? /* @__PURE__ */ d.jsx("button", { className: "remove", onClick: () => {
        ce.instance.remove(ne.name), ne = { ...Di }, t(Date.now());
      } }) : void 0,
      children: /* @__PURE__ */ d.jsx("div", { id: "Inspector", className: s.class, children: ne.uuid.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            Gt,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: ne.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ d.jsx(
            Gt,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: ne.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ d.jsx(
            Gt,
            {
              type: "string",
              title: "UUID",
              prop: "uuid",
              value: ne.uuid,
              disabled: !0
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(ii, { object: ne, three: s.three }),
          n ? /* @__PURE__ */ d.jsx(Nr, { object: ne, three: s.three }) : null,
          i.search("camera") > -1 ? er(ne, s.three) : null,
          i.search("light") > -1 ? jr(ne, s.three) : null,
          r ? qa(ne, s.three) : null
        ] })
      ] }) }, e)
    },
    "Inspector"
  );
}
function zr(s) {
  const [e] = Z([]), [t] = Z([]), [i, n] = Z(0), r = (c) => {
    const l = c.value;
    e.push(l), t.push(
      /* @__PURE__ */ d.jsx(
        qt,
        {
          label: `Scene: ${l.name}`,
          scene: l,
          open: !0,
          onRefresh: () => {
            s.three.refreshScene(l.name);
          },
          children: /* @__PURE__ */ d.jsx(as, { child: l, scene: l, three: s.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, a = (c) => {
    const l = c.value;
    for (let u = 0; u < e.length; u++)
      if (l.uuid === e[u].uuid) {
        e[u] = l, t[u] = /* @__PURE__ */ d.jsx(
          qt,
          {
            label: `Scene: ${l.name}`,
            scene: l,
            open: !0,
            onRefresh: () => {
              s.three.refreshScene(l.name);
            },
            children: /* @__PURE__ */ d.jsx(as, { child: l, scene: l, three: s.three })
          },
          Math.random()
        ), n(Date.now());
        return;
      }
  }, o = (c) => {
    const l = c.value;
    for (let u = 0; u < e.length; u++)
      if (l.uuid === e[u].uuid) {
        e.splice(u, 1), t.splice(u, 1), n(Date.now());
        return;
      }
  };
  return Xe(() => (D.addEventListener(A.ADD_SCENE, r), D.addEventListener(A.REFRESH_SCENE, a), D.addEventListener(A.REMOVE_SCENE, o), () => {
    D.removeEventListener(A.ADD_SCENE, r), D.removeEventListener(A.REFRESH_SCENE, a), D.removeEventListener(A.REMOVE_SCENE, o);
  }), []), /* @__PURE__ */ d.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ d.jsx("div", { className: "scenes", children: t }, i),
    /* @__PURE__ */ d.jsx(Fr, { three: s.three }),
    /* @__PURE__ */ d.jsx(J, { three: s.three })
  ] });
}
function to(s) {
  return Xe(() => {
    function e(o) {
      let c = null;
      return s.three.scenes.forEach((l) => {
        o.search(l.uuid) > -1 && (c = l);
      }), c;
    }
    const t = (o) => {
      const c = o.value, u = e(c)?.getObjectByProperty("uuid", c);
      u !== void 0 && s.three.setObject(u);
    }, i = (o, c, l) => {
      const p = e(o)?.getObjectByProperty("uuid", o);
      p !== void 0 && q(p, c, l);
    }, n = (o) => {
      const c = o.value, { key: l, value: u, uuid: p } = c;
      i(p, l, u);
    }, r = (o) => {
      const c = o.value, u = e(c.uuid)?.getObjectByProperty("uuid", c.uuid);
      if (u !== void 0) {
        const p = (m) => {
          const _ = c.key.split(".");
          switch (_.length) {
            case 1:
              u[_[0]] = m;
              break;
            case 2:
              u[_[0]][_[1]] = m;
              break;
            case 3:
              u[_[0]][_[1]][_[2]] = m;
              break;
            case 4:
              u[_[0]][_[1]][_[2]][_[3]] = m;
              break;
            case 5:
              u[_[0]][_[1]][_[2]][_[3]][_[4]] = m;
              break;
          }
          u.material.needsUpdate = !0;
        };
        c.value.src.length > 0 ? sn(c.value.src).then((m) => {
          m.offset.set(c.value.offset[0], c.value.offset[1]), m.repeat.set(c.value.repeat[0], c.value.repeat[1]), p(m);
        }) : p(null);
      }
    }, a = (o) => {
      const { key: c, uuid: l, value: u, subitem: p } = o.value, _ = e(l)?.getObjectByProperty("uuid", l);
      if (_ !== void 0)
        try {
          p !== void 0 ? Ea(_, p)[c](u) : _[c](u);
        } catch (w) {
          console.log("Error requesting method:"), console.log(w), console.log(c), console.log(u);
        }
    };
    return D.addEventListener(A.GET_OBJECT, t), D.addEventListener(A.UPDATE_OBJECT, n), D.addEventListener(A.CREATE_TEXTURE, r), D.addEventListener(A.REQUEST_METHOD, a), () => {
      D.removeEventListener(A.GET_OBJECT, t), D.removeEventListener(A.UPDATE_OBJECT, n), D.removeEventListener(A.CREATE_TEXTURE, r), D.removeEventListener(A.REQUEST_METHOD, a);
    };
  }, []), null;
}
function Hr(s) {
  return /* @__PURE__ */ d.jsxs("div", { className: "editor", ref: s.ref, style: s.style, children: [
    /* @__PURE__ */ d.jsx("div", { className: "header", children: s.header }),
    s.children,
    /* @__PURE__ */ d.jsx("div", { className: "footer", children: s.footer })
  ] });
}
function io(s) {
  return /* @__PURE__ */ d.jsx(Hr, { children: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      Te,
      {
        three: s.three,
        scenes: s.scenes,
        onSceneResize: s.onSceneResize,
        onSceneSet: s.onSceneSet,
        onSceneUpdate: s.onSceneUpdate
      }
    ),
    /* @__PURE__ */ d.jsx(zr, { three: s.three })
  ] }) });
}
export {
  qt as Accordion,
  Xr as Application,
  Li as BaseRemote,
  an as ChildObject,
  as as ContainerObject,
  Ma as Draggable,
  Ta as DraggableItem,
  Pa as Dropdown,
  Aa as DropdownItem,
  Hr as Editor,
  Wt as ExportTexture,
  Fr as Inspector,
  Te as MultiView,
  nn as NavButton,
  Qr as RemoteComponents,
  eo as RemoteController,
  Kr as RemoteTheatre,
  Jr as RemoteThree,
  to as SceneInspector,
  zr as SidePanel,
  Ms as Spline,
  Lr as SplineEditor,
  io as ThreeEditor,
  A as ToolEvents,
  ce as Transform,
  $t as capitalize,
  Be as clamp,
  ts as colorToHex,
  ma as copyToClipboard,
  qr as customizeTheatreElements,
  D as debugDispatcher,
  Zr as defaultTheatreCallback,
  Ae as dispose,
  _a as disposeMaterial,
  Gr as disposeTexture,
  Wr as distance,
  Ti as hierarchyUUID,
  ga as isColor,
  xi as mix,
  tn as noop,
  es as normalize,
  fa as randomID,
  is as resetThreeObjects,
  be as round,
  $r as theatreEditorApp,
  Oi as totalThreeObjects
};
