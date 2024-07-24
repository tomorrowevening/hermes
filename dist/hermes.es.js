import { EventDispatcher as yn, Texture as En, CubeTexture as Kn, RepeatWrapping as qt, WebGLRenderTarget as Xn, Color as $t, FrontSide as Zn, BackSide as xn, DoubleSide as Sn, NoBlending as Jn, NormalBlending as Qn, AdditiveBlending as ea, SubtractiveBlending as ta, MultiplyBlending as na, CustomBlending as aa, AddEquation as ia, SubtractEquation as ra, ReverseSubtractEquation as sa, MinEquation as oa, MaxEquation as ca, ZeroFactor as Cn, OneFactor as wn, SrcColorFactor as Mn, OneMinusSrcColorFactor as On, SrcAlphaFactor as Rn, OneMinusSrcAlphaFactor as _n, DstAlphaFactor as Tn, OneMinusDstAlphaFactor as kn, DstColorFactor as Dn, OneMinusDstColorFactor as An, SrcAlphaSaturateFactor as la, ConstantColorFactor as Pn, OneMinusConstantColorFactor as In, ConstantAlphaFactor as jn, OneMinusConstantAlphaFactor as Nn, Matrix4 as ua, Vector3 as J, Euler as da, Line as ha, BufferGeometry as Kt, Float32BufferAttribute as Xt, LineBasicMaterial as fa, Mesh as Ln, MeshBasicMaterial as Bn, Ray as ma, Plane as pa, MathUtils as ga, MOUSE as ot, TOUCH as ct, Quaternion as Zt, Spherical as Jt, Vector2 as Ee, ShaderMaterial as Fn, GLSL3 as va, PlaneGeometry as ba, Scene as ya, Group as Ea, AxesHelper as Qt, MeshDepthMaterial as xa, MeshNormalMaterial as Sa, WebGLRenderer as Ca, PerspectiveCamera as Pt, Raycaster as wa, OrthographicCamera as en, CameraHelper as Ma, SpotLightHelper as Oa, PointLightHelper as Ra, HemisphereLightHelper as _a, DirectionalLightHelper as Ta } from "three";
import { Pane as ka } from "tweakpane";
import * as Da from "@tweakpane/plugin-essentials";
import Un, { useState as $, useRef as q, useEffect as Ae, useMemo as le, forwardRef as Aa } from "react";
import { Reorder as $n } from "framer-motion";
const zt = () => {
}, Ii = () => {
};
function Mt(e) {
  return e.substring(0, 1).toUpperCase() + e.substring(1);
}
function Qe(e, n, a) {
  return Math.min(n, Math.max(e, a));
}
function tn(e, n, a) {
  return (a - e) / (n - e);
}
function nn(e, n, a) {
  return e * (1 - a) + n * a;
}
function ji(e, n) {
  const a = e - n;
  return Math.sqrt(a * a);
}
function Pa() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ia(e) {
  return e.r !== void 0 && e.g !== void 0 && e.b !== void 0;
}
function ja(e) {
  const n = Math.round(e.r * 255), a = Math.round(e.g * 255), t = Math.round(e.b * 255), i = (h) => {
    const d = h.toString(16);
    return d.length === 1 ? "0" + d : d;
  }, c = i(n), u = i(a), s = i(t);
  return "#" + c + u + s;
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
  if (n.length === 0 && (n = `obj_${Lt}`, Lt++), e.parent !== null && e.parent.uuid.length > 0 && (n = `${e.parent.uuid}.${n}`), e.uuid = n, e.isMesh !== void 0) {
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
  e.children.forEach((a) => Bt(a));
}, Ni = (e) => {
  e?.dispose();
}, Na = (e) => {
  e && (Array.isArray(e) ? e.forEach((n) => n.dispose()) : e.dispose());
}, Ot = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const n = e.children[0];
      n.type === "Audio" ? (n.pause(), n.parent && n.parent.remove(n)) : Ot(n);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const n = e;
      n.geometry?.dispose(), Na(n.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
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
const P = new yn(), I = {
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
class _t {
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
class Bi extends _t {
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
        P.dispatchEvent({ type: I.SELECT_DROPDOWN, value: t.data });
        break;
      case "draggableListUpdate":
        P.dispatchEvent({ type: I.DRAG_UPDATE, value: t.data });
        break;
    }
  }
}
class Gt extends _t {
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
    d !== void 0 ? d = u.object(a, { ...t, ...d.value }, { reconfigure: !0 }) : d = u.object(a, t), this.sheetObjects.set(h, d), this.sheetObjectCBs.set(h, i !== void 0 ? i : zt);
    const f = d.onValuesChange((p) => {
      if (this.app.editor) {
        for (const y in p) {
          const M = p[y];
          typeof M == "object" && Ia(M) && (p[y] = {
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
            sheet: n,
            sheetObject: h,
            values: p
          }
        });
      }
      const g = this.sheetObjectCBs.get(h);
      g !== void 0 && g(p);
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
        u.length < 1 || u.forEach((s) => {
          let h = s.address.sheetId, d = "setSheet", f = {};
          switch (s.type) {
            case "Theatre_Sheet_PublicAPI":
              d = "setSheet", f = {
                sheet: s.address.sheetId
              }, a.activeSheet = a.sheets.get(s.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              d = "setSheetObject", h += `_${s.address.objectKey}`, f = {
                id: h,
                sheet: s.address.sheetId,
                key: s.address.objectKey
              }, a.activeSheet = a.sheets.get(s.address.sheetId);
              break;
          }
          n.send({ event: d, target: "app", data: f });
        });
      });
      let t = -1;
      const i = () => {
        if (Gt.rafDriver?.tick(performance.now()), a.activeSheet !== void 0 && t !== a.activeSheet.sequence.position) {
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
function Fi(e, n, a) {
  if (e.editor) {
    a.ui.restore(), a.onSelectionChange((u) => {
      u.length < 1 || u.forEach((s) => {
        let h = s.address.sheetId, d = "setSheet", f = {};
        switch (s.type) {
          case "Theatre_Sheet_PublicAPI":
            d = "setSheet", f = {
              sheet: s.address.sheetId
            }, n.activeSheet = n.sheets.get(s.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            d = "setSheetObject", h += `_${s.address.objectKey}`, f = {
              id: h,
              sheet: s.address.sheetId,
              key: s.address.objectKey
            }, n.activeSheet = n.sheets.get(s.address.sheetId);
            break;
        }
        e.send({ event: d, target: "app", data: f });
      });
    });
    let t = -1;
    const i = () => {
      if (Gt.rafDriver?.tick(performance.now()), n.activeSheet !== void 0 && t !== n.activeSheet.sequence.position) {
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
function La(e) {
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
function Ba(e) {
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
function Fa(e) {
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
function lt(e) {
  const n = {};
  for (const a in e) {
    if (a.substring(0, 1) === "_" || a.substring(0, 2) === "is" || Fa(a))
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
            if (i instanceof En) {
              const u = i.source.toJSON().url;
              n[a] = {
                src: u,
                offset: [i.offset.x, i.offset.y],
                repeat: [i.repeat.x, i.repeat.y]
              };
            } else
              i instanceof Kn && (console.log("env map"), console.log(i.source.data), console.log(i.source.toJSON()), n[a] = {
                src: "",
                offset: [i.offset.x, i.offset.y],
                repeat: [i.repeat.x, i.repeat.y]
              });
          else
            a === "uniforms" && (n[a] = Ba(n[a]));
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
function It(e) {
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
        i.push(lt(c));
      }), n.material = i;
    } else
      n.material = lt(t.material);
  } else if (a.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((c) => {
        i.push(lt(c));
      }), n.material = i;
    } else
      n.material = lt(t.material);
  } else if (a.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const i = [];
      t.material.forEach((c) => {
        i.push(lt(c));
      }), n.material = i;
    } else
      n.material = lt(t.material);
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
function Ua(e, n) {
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
function $a(e, n) {
  for (const a in n)
    e[a] = n[a];
}
function ae(e, n, a) {
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
    u != null && $a(u, a);
  }
}
function zn(e) {
  return new Promise((n, a) => {
    const t = new Image();
    t.onload = () => {
      const i = new En(t);
      i.wrapS = qt, i.wrapT = qt, i.needsUpdate = !0, n(i);
    }, t.onerror = a, t.src = e;
  });
}
class Ui extends _t {
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
    const a = It(n);
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
    return this.scenes.forEach((t, i) => {
      n.search(i) > -1 && (a = t);
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
    const a = It(n);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: a
    });
  }
  removeCamera(n) {
    if (!this.app.debugEnabled)
      return;
    const a = It(n);
    this.app.send({
      event: "removeCamera",
      target: "editor",
      data: a
    });
  }
  handleApp(n, a, t) {
    switch (t.event) {
      case "getObject":
        P.dispatchEvent({ type: I.GET_OBJECT, value: t.data });
        break;
      case "updateObject":
        P.dispatchEvent({ type: I.UPDATE_OBJECT, value: t.data });
        break;
      case "createTexture":
        P.dispatchEvent({ type: I.CREATE_TEXTURE, value: t.data });
        break;
      case "requestMethod":
        P.dispatchEvent({ type: I.REQUEST_METHOD, value: t.data });
        break;
    }
  }
  handleEditor(n, a, t) {
    switch (t.event) {
      case "setObject":
        P.dispatchEvent({ type: I.SET_OBJECT, value: t.data });
        break;
      case "addScene":
        P.dispatchEvent({ type: I.ADD_SCENE, value: t.data });
        break;
      case "removeScene":
        P.dispatchEvent({ type: I.REMOVE_SCENE, value: t.data });
        break;
      case "setScene":
        P.dispatchEvent({ type: I.SET_SCENE, value: t.data });
        break;
      case "addCamera":
        P.dispatchEvent({ type: I.ADD_CAMERA, value: t.data });
        break;
      case "removeCamera":
        P.dispatchEvent({ type: I.REMOVE_CAMERA, value: t.data });
        break;
    }
  }
  // Renderer
  rendererWidth = 300;
  rendererHeight = 150;
  addRT(n, a) {
    const t = new Xn(32, 32, a);
    t.texture.name = n, this.renderTargets.set(n, t);
  }
  resize(n, a) {
    const t = this.dpr;
    this.rendererWidth = n, this.rendererHeight = a, this.renderTargets.forEach((i) => {
      i.setSize(n * t, a * t);
    }), this.renderer?.setSize(n, a);
  }
  set dpr(n) {
    this.renderer?.setPixelRatio(Qe(1, 2, n));
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
class $i extends _t {
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
    this.pane = new ka({ title: "GUI" }), this.pane.registerPlugin(Da);
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
    const c = this.bindID, u = t.onChange !== void 0 ? t.onChange : zt;
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
var Ft = { exports: {} }, ft = {};
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
function za() {
  if (sn)
    return ft;
  sn = 1;
  var e = Un, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), t = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(s, h, d) {
    var f, p = {}, g = null, y = null;
    d !== void 0 && (g = "" + d), h.key !== void 0 && (g = "" + h.key), h.ref !== void 0 && (y = h.ref);
    for (f in h)
      t.call(h, f) && !c.hasOwnProperty(f) && (p[f] = h[f]);
    if (s && s.defaultProps)
      for (f in h = s.defaultProps, h)
        p[f] === void 0 && (p[f] = h[f]);
    return { $$typeof: n, type: s, key: g, ref: y, props: p, _owner: i.current };
  }
  return ft.Fragment = a, ft.jsx = u, ft.jsxs = u, ft;
}
var mt = {};
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
function Ga() {
  return on || (on = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Un, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), s = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), M = Symbol.iterator, _ = "@@iterator";
    function T(r) {
      if (r === null || typeof r != "object")
        return null;
      var v = M && r[M] || r[_];
      return typeof v == "function" ? v : null;
    }
    var G = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(r) {
      {
        for (var v = arguments.length, E = new Array(v > 1 ? v - 1 : 0), O = 1; O < v; O++)
          E[O - 1] = arguments[O];
        z("error", r, E);
      }
    }
    function z(r, v, E) {
      {
        var O = G.ReactDebugCurrentFrame, U = O.getStackAddendum();
        U !== "" && (v += "%s", E = E.concat([U]));
        var Y = E.map(function(L) {
          return String(L);
        });
        Y.unshift("Warning: " + v), Function.prototype.apply.call(console[r], console, Y);
      }
    }
    var A = !1, Q = !1, pe = !1, K = !1, re = !1, Se;
    Se = Symbol.for("react.module.reference");
    function nt(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === t || r === c || re || r === i || r === d || r === f || K || r === y || A || Q || pe || typeof r == "object" && r !== null && (r.$$typeof === g || r.$$typeof === p || r.$$typeof === u || r.$$typeof === s || r.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === Se || r.getModuleId !== void 0));
    }
    function je(r, v, E) {
      var O = r.displayName;
      if (O)
        return O;
      var U = v.displayName || v.name || "";
      return U !== "" ? E + "(" + U + ")" : E;
    }
    function ce(r) {
      return r.displayName || "Context";
    }
    function te(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
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
      if (typeof r == "object")
        switch (r.$$typeof) {
          case s:
            var v = r;
            return ce(v) + ".Consumer";
          case u:
            var E = r;
            return ce(E._context) + ".Provider";
          case h:
            return je(r, r.render, "ForwardRef");
          case p:
            var O = r.displayName || null;
            return O !== null ? O : te(r.type) || "Memo";
          case g: {
            var U = r, Y = U._payload, L = U._init;
            try {
              return te(L(Y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var be = Object.assign, Ce = 0, H, Be, k, Fe, Ne, Ue, Xe;
    function $e() {
    }
    $e.__reactDisabledLog = !0;
    function ze() {
      {
        if (Ce === 0) {
          H = console.log, Be = console.info, k = console.warn, Fe = console.error, Ne = console.group, Ue = console.groupCollapsed, Xe = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: $e,
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
        Ce++;
      }
    }
    function at() {
      {
        if (Ce--, Ce === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: be({}, r, {
              value: H
            }),
            info: be({}, r, {
              value: Be
            }),
            warn: be({}, r, {
              value: k
            }),
            error: be({}, r, {
              value: Fe
            }),
            group: be({}, r, {
              value: Ne
            }),
            groupCollapsed: be({}, r, {
              value: Ue
            }),
            groupEnd: be({}, r, {
              value: Xe
            })
          });
        }
        Ce < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ge = G.ReactCurrentDispatcher, We;
    function He(r, v, E) {
      {
        if (We === void 0)
          try {
            throw Error();
          } catch (U) {
            var O = U.stack.trim().match(/\n( *(at )?)/);
            We = O && O[1] || "";
          }
        return `
` + We + r;
      }
    }
    var Pe = !1, ee;
    {
      var we = typeof WeakMap == "function" ? WeakMap : Map;
      ee = new we();
    }
    function it(r, v) {
      if (!r || Pe)
        return "";
      {
        var E = ee.get(r);
        if (E !== void 0)
          return E;
      }
      var O;
      Pe = !0;
      var U = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Y;
      Y = Ge.current, Ge.current = null, ze();
      try {
        if (v) {
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
              O = Le;
            }
            Reflect.construct(r, [], L);
          } else {
            try {
              L.call();
            } catch (Le) {
              O = Le;
            }
            r.call(L.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Le) {
            O = Le;
          }
          r();
        }
      } catch (Le) {
        if (Le && O && typeof Le.stack == "string") {
          for (var j = Le.stack.split(`
`), ve = O.stack.split(`
`), ne = j.length - 1, ie = ve.length - 1; ne >= 1 && ie >= 0 && j[ne] !== ve[ie]; )
            ie--;
          for (; ne >= 1 && ie >= 0; ne--, ie--)
            if (j[ne] !== ve[ie]) {
              if (ne !== 1 || ie !== 1)
                do
                  if (ne--, ie--, ie < 0 || j[ne] !== ve[ie]) {
                    var Te = `
` + j[ne].replace(" at new ", " at ");
                    return r.displayName && Te.includes("<anonymous>") && (Te = Te.replace("<anonymous>", r.displayName)), typeof r == "function" && ee.set(r, Te), Te;
                  }
                while (ne >= 1 && ie >= 0);
              break;
            }
        }
      } finally {
        Pe = !1, Ge.current = Y, at(), Error.prepareStackTrace = U;
      }
      var st = r ? r.displayName || r.name : "", Vt = st ? He(st) : "";
      return typeof r == "function" && ee.set(r, Vt), Vt;
    }
    function ht(r, v, E) {
      return it(r, !1);
    }
    function xe(r) {
      var v = r.prototype;
      return !!(v && v.isReactComponent);
    }
    function m(r, v, E) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return it(r, xe(r));
      if (typeof r == "string")
        return He(r);
      switch (r) {
        case d:
          return He("Suspense");
        case f:
          return He("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case h:
            return ht(r.render);
          case p:
            return m(r.type, v, E);
          case g: {
            var O = r, U = O._payload, Y = O._init;
            try {
              return m(Y(U), v, E);
            } catch {
            }
          }
        }
      return "";
    }
    var b = Object.prototype.hasOwnProperty, R = {}, N = G.ReactDebugCurrentFrame;
    function ue(r) {
      if (r) {
        var v = r._owner, E = m(r.type, r._source, v ? v.type : null);
        N.setExtraStackFrame(E);
      } else
        N.setExtraStackFrame(null);
    }
    function de(r, v, E, O, U) {
      {
        var Y = Function.call.bind(b);
        for (var L in r)
          if (Y(r, L)) {
            var j = void 0;
            try {
              if (typeof r[L] != "function") {
                var ve = Error((O || "React class") + ": " + E + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ve.name = "Invariant Violation", ve;
              }
              j = r[L](v, L, O, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ne) {
              j = ne;
            }
            j && !(j instanceof Error) && (ue(U), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", E, L, typeof j), ue(null)), j instanceof Error && !(j.message in R) && (R[j.message] = !0, ue(U), C("Failed %s type: %s", E, j.message), ue(null));
          }
      }
    }
    var w = Array.isArray;
    function S(r) {
      return w(r);
    }
    function V(r) {
      {
        var v = typeof Symbol == "function" && Symbol.toStringTag, E = v && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return E;
      }
    }
    function se(r) {
      try {
        return Me(r), !1;
      } catch {
        return !0;
      }
    }
    function Me(r) {
      return "" + r;
    }
    function F(r) {
      if (se(r))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", V(r)), Me(r);
    }
    var Z = G.ReactCurrentOwner, W = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ie, he, fe;
    fe = {};
    function kt(r) {
      if (b.call(r, "ref")) {
        var v = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function Dt(r) {
      if (b.call(r, "key")) {
        var v = Object.getOwnPropertyDescriptor(r, "key").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function At(r, v) {
      if (typeof r.ref == "string" && Z.current && v && Z.current.stateNode !== v) {
        var E = te(Z.current.type);
        fe[E] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(Z.current.type), r.ref), fe[E] = !0);
      }
    }
    function vt(r, v) {
      {
        var E = function() {
          Ie || (Ie = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        E.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: E,
          configurable: !0
        });
      }
    }
    function Ye(r, v) {
      {
        var E = function() {
          he || (he = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        E.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: E,
          configurable: !0
        });
      }
    }
    var Ht = function(r, v, E, O, U, Y, L) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: r,
        key: v,
        ref: E,
        props: L,
        // Record the component responsible for creating this element.
        _owner: Y
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
        value: O
      }), Object.defineProperty(j, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: U
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    };
    function o(r, v, E, O, U) {
      {
        var Y, L = {}, j = null, ve = null;
        E !== void 0 && (F(E), j = "" + E), Dt(v) && (F(v.key), j = "" + v.key), kt(v) && (ve = v.ref, At(v, U));
        for (Y in v)
          b.call(v, Y) && !W.hasOwnProperty(Y) && (L[Y] = v[Y]);
        if (r && r.defaultProps) {
          var ne = r.defaultProps;
          for (Y in ne)
            L[Y] === void 0 && (L[Y] = ne[Y]);
        }
        if (j || ve) {
          var ie = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          j && vt(L, ie), ve && Ye(L, ie);
        }
        return Ht(r, j, ve, U, O, Z.current, L);
      }
    }
    var x = G.ReactCurrentOwner, D = G.ReactDebugCurrentFrame;
    function B(r) {
      if (r) {
        var v = r._owner, E = m(r.type, r._source, v ? v.type : null);
        D.setExtraStackFrame(E);
      } else
        D.setExtraStackFrame(null);
    }
    var oe;
    oe = !1;
    function Oe(r) {
      return typeof r == "object" && r !== null && r.$$typeof === n;
    }
    function ge() {
      {
        if (x.current) {
          var r = te(x.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function Yt(r) {
      {
        if (r !== void 0) {
          var v = r.fileName.replace(/^.*[\\\/]/, ""), E = r.lineNumber;
          return `

Check your code at ` + v + ":" + E + ".";
        }
        return "";
      }
    }
    var bt = {};
    function yt(r) {
      {
        var v = ge();
        if (!v) {
          var E = typeof r == "string" ? r : r.displayName || r.name;
          E && (v = `

Check the top-level render call using <` + E + ">.");
        }
        return v;
      }
    }
    function Re(r, v) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var E = yt(v);
        if (bt[E])
          return;
        bt[E] = !0;
        var O = "";
        r && r._owner && r._owner !== x.current && (O = " It was passed a child from " + te(r._owner.type) + "."), B(r), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, O), B(null);
      }
    }
    function _e(r, v) {
      {
        if (typeof r != "object")
          return;
        if (S(r))
          for (var E = 0; E < r.length; E++) {
            var O = r[E];
            Oe(O) && Re(O, v);
          }
        else if (Oe(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var U = T(r);
          if (typeof U == "function" && U !== r.entries)
            for (var Y = U.call(r), L; !(L = Y.next()).done; )
              Oe(L.value) && Re(L.value, v);
        }
      }
    }
    function Ze(r) {
      {
        var v = r.type;
        if (v == null || typeof v == "string")
          return;
        var E;
        if (typeof v == "function")
          E = v.propTypes;
        else if (typeof v == "object" && (v.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        v.$$typeof === p))
          E = v.propTypes;
        else
          return;
        if (E) {
          var O = te(v);
          de(E, r.props, "prop", O, r);
        } else if (v.PropTypes !== void 0 && !oe) {
          oe = !0;
          var U = te(v);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", U || "Unknown");
        }
        typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(r) {
      {
        for (var v = Object.keys(r.props), E = 0; E < v.length; E++) {
          var O = v[E];
          if (O !== "children" && O !== "key") {
            B(r), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), B(null);
            break;
          }
        }
        r.ref !== null && (B(r), C("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
      }
    }
    function Ve(r, v, E, O, U, Y) {
      {
        var L = nt(r);
        if (!L) {
          var j = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ve = Yt(U);
          ve ? j += ve : j += ge();
          var ne;
          r === null ? ne = "null" : S(r) ? ne = "array" : r !== void 0 && r.$$typeof === n ? (ne = "<" + (te(r.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : ne = typeof r, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ne, j);
        }
        var ie = o(r, v, E, U, Y);
        if (ie == null)
          return ie;
        if (L) {
          var Te = v.children;
          if (Te !== void 0)
            if (O)
              if (S(Te)) {
                for (var st = 0; st < Te.length; st++)
                  _e(Te[st], r);
                Object.freeze && Object.freeze(Te);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _e(Te, r);
        }
        return r === t ? ke(ie) : Ze(ie), ie;
      }
    }
    function rt(r, v, E) {
      return Ve(r, v, E, !0);
    }
    function Et(r, v, E) {
      return Ve(r, v, E, !1);
    }
    var Vn = Et, qn = rt;
    mt.Fragment = t, mt.jsx = Vn, mt.jsxs = qn;
  }()), mt;
}
process.env.NODE_ENV === "production" ? Ft.exports = za() : Ft.exports = Ga();
var l = Ft.exports;
function Gn(e) {
  return e.title.search("<") > -1 ? /* @__PURE__ */ l.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: e.title } }) : /* @__PURE__ */ l.jsx("button", { children: e.title });
}
const Wa = /* @__PURE__ */ l.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Ha = /* @__PURE__ */ l.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ l.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Ya(e) {
  return /* @__PURE__ */ l.jsx($n.Item, { value: e.title, children: /* @__PURE__ */ l.jsxs("div", { children: [
    Ha,
    /* @__PURE__ */ l.jsx("span", { children: e.title }),
    /* @__PURE__ */ l.jsx("button", { className: "closeIcon", onClick: () => {
      e.onDelete(e.index);
    }, children: Wa })
  ] }) }, e.title);
}
function Va(e) {
  const [n, a] = $(!1), [t, i] = $(e.options), c = (d) => {
    e.onDragComplete(d), i(d);
  }, u = (d) => {
    const f = [...t];
    f.splice(d, 1), c(f);
  }, s = [];
  t.forEach((d, f) => {
    s.push(/* @__PURE__ */ l.jsx(Ya, { index: f, title: d, onDelete: u }, d));
  });
  let h = "dropdown draggable";
  return e.subdropdown && (h += " subdropdown"), /* @__PURE__ */ l.jsxs("div", { className: h, onMouseEnter: () => a(!0), onMouseLeave: () => a(!1), children: [
    /* @__PURE__ */ l.jsx(Gn, { title: e.title }),
    /* @__PURE__ */ l.jsx($n.Group, { axis: "y", values: t, onReorder: c, style: { visibility: n ? "visible" : "hidden" }, children: s })
  ] });
}
function qa(e) {
  const [n, a] = $(!1), t = [];
  e.options.map((c, u) => {
    e.onSelect !== void 0 && (c.onSelect = e.onSelect), t.push(/* @__PURE__ */ l.jsx(Ka, { option: c }, u));
  });
  let i = "dropdown";
  return e.subdropdown && (i += " subdropdown"), /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: i,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ l.jsx(Gn, { title: e.title }),
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
function Ka(e) {
  const { option: n } = e, [a, t] = $("");
  let i;
  switch (n.type) {
    case "draggable":
      i = /* @__PURE__ */ l.jsx(
        Va,
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
        qa,
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
  return /* @__PURE__ */ l.jsx("li", { className: a === n.title ? "selected" : "", children: i }, Pa());
}
function zi(e, n, a) {
  function t(c) {
    switch (n.forEach((u) => {
      u.callback(e, u.remote, c);
    }), c.event) {
      case "custom":
        P.dispatchEvent({ type: I.CUSTOM, value: c.data });
        break;
    }
  }
  function i(c) {
    switch (a.forEach((u) => {
      u.callback(e, u.remote, c);
    }), c.event) {
      case "custom":
        P.dispatchEvent({ type: I.CUSTOM, value: c.data });
        break;
    }
  }
  e.listen = (c) => {
    c.target === "editor" ? i(c) : t(c);
  };
}
function Wt(e) {
  const [n, a] = $(e.open !== void 0 ? e.open : !0), t = !n || e.children === void 0;
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
function Wn(e) {
  const n = q(null), [a, t] = $(!1), i = e.child !== void 0 && e.child.children.length > 0, c = [];
  return e.child !== void 0 && e.child.children.length > 0 && e.child.children.map((u, s) => {
    c.push(/* @__PURE__ */ l.jsx(Wn, { child: u, three: e.three }, s));
  }), Ae(() => {
    const u = e.child.uuid, s = e.three.getScene(u);
    if (s !== null) {
      const h = s.getObjectByProperty("uuid", u);
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
                const s = u.getObjectByProperty("uuid", e.child.uuid);
                if (s !== void 0) {
                  const h = "visible", d = !s.visible;
                  n.current.style.opacity = d ? "1" : "0.25", e.three.updateObject(e.child.uuid, h, d), ae(s, h, d);
                } else
                  console.log(`Hermes - Couldn't find object: ${e.child.uuid}`, u);
              } else
                console.log(`Hermes - Couldn't find object in scene: ${e.child.uuid}, ${e.child.name}`);
            }
          }
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: `icon ${La(e.child)}` })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: a ? "open" : "", children: /* @__PURE__ */ l.jsx("div", { className: "container", children: c }) })
  ] }, Math.random()) });
}
function Xa(e) {
  const n = [];
  return e.child?.children.map((a, t) => {
    n.push(/* @__PURE__ */ l.jsx(Wn, { child: a, scene: e.scene, three: e.three }, t));
  }), /* @__PURE__ */ l.jsx("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: n });
}
function Za(e) {
  const [n, a] = $(e.defaultValue);
  return Ae(() => {
    let t = !1, i = -1, c = 0, u = e.defaultValue;
    const s = (g) => {
      t = !0, c = Number(e.input.current?.value), i = g.clientX, document.addEventListener("mouseup", d, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", d, !1);
    }, h = (g) => {
      if (!t)
        return;
      const y = e.step !== void 0 ? e.step : 1, M = (g.clientX - i) * y;
      u = Number((c + M).toFixed(4)), e.min !== void 0 && (u = Math.max(u, e.min)), e.max !== void 0 && (u = Math.min(u, e.max)), e.onChange !== void 0 && e.onChange(u), a(u);
    }, d = () => {
      t = !1, document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
    }, f = (g) => {
      const y = Number(g.target.value);
      a(y);
    }, p = (g) => {
      const y = Number(g.target.value);
      e.onChange !== void 0 && e.onChange(y), a(y);
    };
    return e.input.current?.addEventListener("input", f), e.label.current?.addEventListener("mousedown", s, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", p), () => {
      e.input.current?.removeEventListener("input", f), e.label.current?.removeEventListener("mousedown", s), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", p), document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
    };
  }, []), n;
}
function et(e) {
  const n = q(null), a = q(null), t = Za({
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
          onChange: zt
        }
      )
    ] })
  ] });
}
function Ja(e) {
  const n = q(null), a = q(null), t = q(null), i = q(null), c = q(null), u = q(null), [s, h] = $(e.value), [d, f] = $({
    min: Math.min(e.min, Math.min(e.value.x, e.value.y)),
    max: Math.max(e.max, Math.max(e.value.x, e.value.y))
  }), [p, g] = $(!1);
  function y() {
    p || (window.addEventListener("mousemove", _), window.addEventListener("mouseup", M), window.addEventListener("mouseup", M), g(!0));
  }
  function M() {
    window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", M), g(!1);
  }
  function _(A) {
    const Q = c.current.getBoundingClientRect(), pe = Qe(0, 99, A.clientX - Q.left) / 99, K = Qe(0, 99, A.clientY - Q.top) / 99, re = an(nn(d.min, d.max, pe), 3), Se = an(nn(d.min, d.max, K), 3);
    e.onChange({ target: { value: { x: re, y: Se } } }), h({ x: re, y: Se });
  }
  function T(A) {
    let Q = s.x, pe = s.y;
    A.target === n.current ? Q = Number(A.target.value) : pe = Number(A.target.value), h({ x: Q, y: pe });
  }
  function G() {
    const A = Number(t.current.value);
    f({ min: A, max: d.max }), (s.x < A || s.y < A) && h({ x: Qe(A, d.max, s.x), y: Qe(A, d.max, s.y) });
  }
  function C() {
    const A = Number(i.current.value);
    f({ min: d.min, max: A }), (s.x > A || s.y > A) && h({ x: Qe(d.min, A, s.x), y: Qe(d.min, A, s.y) });
  }
  Ae(() => {
    const A = tn(d.min, d.max, s.x), Q = tn(d.min, d.max, s.y);
    u.current.style.left = `${A * 100}%`, u.current.style.top = `${Q * 100}%`;
  }, [d, s]);
  const z = e.step !== void 0 ? e.step : 0.01;
  return /* @__PURE__ */ l.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { children: "X:" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: s.x,
            min: d.min,
            max: d.max,
            step: z,
            onChange: T
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
            value: s.y,
            min: d.min,
            max: d.max,
            step: z,
            onChange: T
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
            step: z,
            onChange: G
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
            step: z,
            onChange: C
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "input", ref: c, onMouseDown: y, onMouseUp: M, children: [
      /* @__PURE__ */ l.jsx("div", { className: "x" }),
      /* @__PURE__ */ l.jsx("div", { className: "y" }),
      /* @__PURE__ */ l.jsx("div", { className: "pt", ref: u })
    ] })
  ] });
}
function cn(e) {
  const n = e.value.isVector3 !== void 0, a = e.value.isEuler !== void 0, t = e.value.elements !== void 0, i = e.step !== void 0 ? e.step : 0.01, c = [];
  if (n) {
    const u = le(() => e.value, []), s = (d, f) => {
      u[d] = f, e.onChange({ target: { value: u } });
    };
    ["x", "y", "z"].forEach((d) => {
      const f = q(null);
      c.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: f, children: d.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            et,
            {
              value: u[d],
              type: "number",
              prop: d,
              step: i,
              labelRef: f,
              onChange: s
            }
          )
        ] }, d)
      );
    });
  } else if (a) {
    const u = le(() => e.value, []), s = (d, f) => {
      u[d] = f, e.onChange({ target: { value: u } });
    };
    ["_x", "_y", "_z"].forEach((d) => {
      const f = q(null);
      c.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: f, children: d.substring(1).toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            et,
            {
              value: u[d],
              type: "number",
              prop: d,
              step: i,
              labelRef: f,
              onChange: s
            }
          )
        ] }, d)
      );
    });
  } else if (t) {
    const u = le(() => e.value, []), s = (h, d) => {
      const f = Number(h);
      u.elements[f] = d, e.onChange({ target: { value: u } });
    };
    for (let h = 0; h < 9; h++) {
      const d = q(null);
      c.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: d, children: h + 1 }),
          /* @__PURE__ */ l.jsx(
            et,
            {
              value: u.elements[h],
              type: "number",
              prop: h.toString(),
              step: i,
              labelRef: d,
              onChange: s
            }
          )
        ] }, h.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid3", children: c }, Math.random().toString());
}
function Qa(e) {
  const n = e.value.x !== void 0, a = e.step !== void 0 ? e.step : 0.01, t = [];
  if (n) {
    const i = le(() => e.value, []), c = (s, h) => {
      i[s] = h, e.onChange({ target: { value: i } });
    };
    ["x", "y", "z", "w"].forEach((s) => {
      const h = q(null);
      t.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: h, children: s.toUpperCase() }),
          /* @__PURE__ */ l.jsx(
            et,
            {
              value: i.x,
              type: "number",
              prop: s,
              step: a,
              labelRef: h,
              onChange: c
            }
          )
        ] }, s)
      );
    });
  } else {
    const i = le(() => e.value, []), c = (u, s) => {
      const h = Number(u);
      i.elements[h] = s, e.onChange({ target: { value: i } });
    };
    for (let u = 0; u < 16; u++) {
      const s = q(null);
      t.push(
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { ref: s, children: u + 1 }),
          /* @__PURE__ */ l.jsx(
            et,
            {
              value: i.elements[u],
              type: "number",
              prop: u.toString(),
              step: a,
              labelRef: s,
              onChange: c
            }
          )
        ] }, u.toString())
      );
    }
  }
  return /* @__PURE__ */ l.jsx("div", { className: "grid4", children: t });
}
function ei(e) {
  return "items" in e;
}
function tt(e) {
  const n = [];
  return e.items.forEach((a) => {
    ei(a) ? n.push(
      /* @__PURE__ */ l.jsx(tt, { title: Mt(a.title), items: a.items }, Math.random())
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
function Tt(e) {
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
function Hn(e) {
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
        i.onload = function(c) {
          n(c.target.result);
        }, i.readAsDataURL(t);
      }
    }), e.click();
  });
}
const ii = [
  {
    title: "Front",
    value: Zn
  },
  {
    title: "Back",
    value: xn
  },
  {
    title: "Double",
    value: Sn
  }
], ri = [
  {
    title: "No Blending",
    value: Jn
  },
  {
    title: "Normal",
    value: Qn
  },
  {
    title: "Additive",
    value: ea
  },
  {
    title: "Subtractive",
    value: ta
  },
  {
    title: "Multiply",
    value: na
  },
  {
    title: "Custom",
    value: aa
  }
], si = [
  {
    title: "Add",
    value: ia
  },
  {
    title: "Subtract",
    value: ra
  },
  {
    title: "Reverse Subtract",
    value: sa
  },
  {
    title: "Min",
    value: oa
  },
  {
    title: "Max",
    value: ca
  }
], oi = [
  {
    title: "Zero",
    valye: Cn
  },
  {
    title: "One",
    valye: wn
  },
  {
    title: "Src Color",
    valye: Mn
  },
  {
    title: "One Minus Src Color",
    valye: On
  },
  {
    title: "Src Alpha",
    valye: Rn
  },
  {
    title: "One Minus Src Alpha",
    valye: _n
  },
  {
    title: "Dst Alpha",
    valye: Tn
  },
  {
    title: "One Minus Dst Alpha",
    valye: kn
  },
  {
    title: "Dst Color",
    valye: Dn
  },
  {
    title: "One Minus Dst Color",
    valye: An
  },
  {
    title: "Src Alpha Saturate",
    valye: la
  },
  {
    title: "Constant Color",
    valye: Pn
  },
  {
    title: "One Minus Constant Color",
    valye: In
  },
  {
    title: "Constant Alpha",
    valye: jn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Nn
  }
], ci = [
  {
    title: "Zero",
    valye: Cn
  },
  {
    title: "One",
    valye: wn
  },
  {
    title: "Src Color",
    valye: Mn
  },
  {
    title: "One Minus Src Color",
    valye: On
  },
  {
    title: "Src Alpha",
    valye: Rn
  },
  {
    title: "One Minus Src Alpha",
    valye: _n
  },
  {
    title: "Dst Alpha",
    valye: Tn
  },
  {
    title: "One Minus Dst Alpha",
    valye: kn
  },
  {
    title: "Dst Color",
    valye: Dn
  },
  {
    title: "One Minus Dst Color",
    valye: An
  },
  {
    title: "Constant Color",
    valye: Pn
  },
  {
    title: "One Minus Constant Color",
    valye: In
  },
  {
    title: "Constant Alpha",
    valye: jn
  },
  {
    title: "One Minus Constant Alpha",
    valye: Nn
  }
];
function pt(e, n) {
  e.needsUpdate = !0, e.type = "option", e.options = n;
}
function li(e, n, a, t) {
  return {
    type: "boolean",
    title: Tt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (i, c) => {
      t.updateObject(a.uuid, `material.${e}`, c), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const u = t.getScene(a.uuid);
      if (u !== null) {
        const s = u.getObjectByProperty("uuid", a.uuid);
        ae(s, `material.${e}`, c);
      }
    }
  };
}
function ui(e, n, a, t) {
  const i = {
    type: "number",
    title: Tt(e),
    prop: e,
    value: n,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (c, u) => {
      t.updateObject(a.uuid, `material.${e}`, u), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const s = t.getScene(a.uuid);
      if (s !== null) {
        const h = s.getObjectByProperty("uuid", a.uuid);
        ae(h, `material.${e}`, u);
      }
    }
  };
  switch (e) {
    case "blending":
      pt(i, ri);
      break;
    case "blendDst":
      pt(i, ci);
      break;
    case "blendEquation":
      pt(i, si);
      break;
    case "blendSrc":
      pt(i, oi);
      break;
    case "side":
      pt(i, ii);
      break;
  }
  return Hn(e) && (i.value = Number(n), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function di(e, n, a, t) {
  const i = {
    type: "string",
    title: Tt(e),
    prop: e,
    value: n,
    needsUpdate: !0,
    onChange: (u, s) => {
      t.updateObject(a.uuid, `material.${e}`, s), t.updateObject(a.uuid, "material.needsUpdate", !0);
      const h = t.getScene(a.uuid);
      if (h !== null) {
        const d = h.getObjectByProperty("uuid", a.uuid);
        ae(d, `material.${e}`, s);
      }
    },
    onKeyDown: (u) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.disabled = !1, i.latest = i.value, i.onChange = (u, s) => {
    i.latest = s, t.updateObject(a.uuid, `material.${e}`, s);
    const h = t.getScene(a.uuid);
    if (h !== null) {
      const d = h.getObjectByProperty("uuid", a.uuid);
      ae(d, `material.${e}`, s);
    }
  }, i.onKeyDown = (u) => {
    if (u.key === "Enter" && (u.altKey || u.metaKey)) {
      t.updateObject(a.uuid, "material.needsUpdate", !0);
      const s = t.getScene(a.uuid);
      if (s !== null) {
        const h = s.getObjectByProperty("uuid", a.uuid);
        ae(h, "material.needsUpdate", !0);
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
function Ut(e) {
  e.sort((n, a) => n.title < a.title ? -1 : n.title > a.title ? 1 : 0);
}
function gt(e, n, a, t, i = "", c = !1) {
  const u = Tt(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), s = i.length > 0 ? `${i}.${e}` : e, h = typeof n;
  if (h === "boolean" || h === "string")
    return {
      title: u,
      prop: s,
      type: h,
      value: n,
      disabled: c,
      onChange: (d, f) => {
        t.updateObject(a.uuid, `material.${s}`, f);
        const p = t.getScene(a.uuid);
        if (p !== null) {
          const g = p.getObjectByProperty("uuid", a.uuid);
          ae(g, `material.${s}`, f);
        }
      }
    };
  if (h === "number") {
    const d = {
      title: u,
      prop: s,
      type: "number",
      value: n,
      step: 0.01,
      disabled: c,
      onChange: (f, p) => {
        t.updateObject(a.uuid, `material.${s}`, p);
        const g = t.getScene(a.uuid);
        if (g !== null) {
          const y = g.getObjectByProperty("uuid", a.uuid);
          ae(y, `material.${s}`, p);
        }
      }
    };
    return Hn(u) && (d.type = "range", d.min = 0, d.max = 1), d;
  } else {
    if (n.isColor)
      return {
        title: u,
        prop: s,
        type: "color",
        value: n,
        disabled: c,
        onChange: (d, f) => {
          const p = new $t(f);
          t.updateObject(a.uuid, `material.${s}`, p);
          const g = t.getScene(a.uuid);
          if (g !== null) {
            const y = g.getObjectByProperty("uuid", a.uuid);
            ae(y, `material.${s}`, p);
          }
        }
      };
    if (Array.isArray(n)) {
      const d = [];
      for (const f in n) {
        const p = n[f], g = `[${f.toString()}]`;
        if (p.value !== void 0) {
          const y = gt(`${g}.value`, p.value, a, t, s, c);
          y !== void 0 && d.push(y);
        } else {
          const y = gt(g, p, a, t, s, c);
          y !== void 0 && d.push(y);
        }
      }
      if (d.length > 0)
        return Ut(d), {
          title: u,
          items: d
        };
    } else {
      if (hi(n))
        return {
          title: u,
          prop: s,
          type: "vector2",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const p = t.getScene(a.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", a.uuid);
              ae(g, `material.${s}`, f);
            }
          }
        };
      if (fi(n))
        return {
          title: u,
          prop: s,
          type: "grid3",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const p = t.getScene(a.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", a.uuid);
              ae(g, `material.${s}`, f);
            }
          }
        };
      if (mi(n))
        return {
          title: u,
          prop: s,
          type: "grid4",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const p = t.getScene(a.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", a.uuid);
              ae(g, `material.${s}`, f);
            }
          }
        };
      if (n.isEuler)
        return {
          title: u,
          prop: s,
          type: "euler",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const p = t.getScene(a.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", a.uuid);
              ae(g, `material.${s}`, f);
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
            const p = ni(e), g = i.length > 0 ? `${i}.${p}` : p;
            t.createTexture(a.uuid, `material.${g}`, f);
            const y = t.getScene(a.uuid);
            if (y !== null) {
              const M = y.getObjectByProperty("uuid", a.uuid);
              if (M !== void 0) {
                const _ = (T) => {
                  const G = M.material, C = g.split(".");
                  switch (C.length) {
                    case 1:
                      G[C[0]] = T;
                      break;
                    case 2:
                      G[C[0]][C[1]] = T;
                      break;
                    case 3:
                      G[C[0]][C[1]][C[2]] = T;
                      break;
                    case 4:
                      G[C[0]][C[1]][C[2]][C[3]] = T;
                      break;
                    case 5:
                      G[C[0]][C[1]][C[2]][C[3]][C[4]] = T;
                      break;
                  }
                  G.needsUpdate = !0;
                };
                f.src.length > 0 ? zn(f.src).then((T) => {
                  T.offset.set(f.offset[0], f.offset[1]), T.repeat.set(f.repeat[0], f.repeat[1]), _(T);
                }) : _(null);
              }
            }
          }
        };
      if (n.elements !== void 0)
        return {
          title: u,
          prop: s,
          type: n.elements.length > 9 ? "grid4" : "grid3",
          value: n,
          disabled: c,
          onChange: (d, f) => {
            t.updateObject(a.uuid, `material.${s}`, f);
            const p = t.getScene(a.uuid);
            if (p !== null) {
              const g = p.getObjectByProperty("uuid", a.uuid);
              ae(g, `material.${s}`, f);
            }
          }
        };
      {
        const d = [], f = e === "defines" || e === "extensions";
        try {
          for (const p in n) {
            const g = n[p];
            if (g !== void 0)
              if (g.value !== void 0) {
                const y = gt(`${p}.value`, g.value, a, t, s, f);
                y !== void 0 && d.push(y);
              } else {
                const y = gt(p, g, a, t, s, f);
                y !== void 0 && d.push(y);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", e, n);
        }
        if (d.length > 0)
          return Ut(d), {
            title: u,
            items: d
          };
      }
    }
  }
}
function ln(e, n, a) {
  const t = [];
  for (const i in e) {
    if (!ti(i))
      continue;
    const c = typeof e[i], u = e[i];
    if (c === "boolean")
      t.push(li(i, u, n, a));
    else if (c === "number")
      t.push(ui(i, u, n, a));
    else if (c === "string")
      t.push(di(i, u, n, a));
    else if (c === "object") {
      const s = gt(i, u, n, a);
      s !== void 0 && t.push(s);
    } else
      u !== void 0 && console.log("other:", i, c, u);
  }
  return Ut(t), t.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      a.updateObject(n.uuid, "material.needsUpdate", !0);
      const i = a.getScene(n.uuid);
      if (i !== null) {
        const c = i.getObjectByProperty("uuid", n.uuid);
        ae(c, "material.needsUpdate", !0);
      }
    }
  }), t;
}
function pi(e, n) {
  const a = e.material;
  if (Array.isArray(a)) {
    const t = [], i = a.length;
    for (let c = 0; c < i; c++)
      t.push(
        /* @__PURE__ */ l.jsx(
          tt,
          {
            title: `Material ${c}`,
            items: ln(a[c], e, n)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
  } else
    return /* @__PURE__ */ l.jsx(
      tt,
      {
        title: "Material",
        items: ln(a, e, n)
      }
    );
}
const un = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function gi(e) {
  const n = e.step !== void 0 ? e.step : 0.01, a = q(null), t = q(null), i = q(null), c = q(null), u = q(null), [s] = $(e.value), [h, d] = $(e.value.offset[0]), [f, p] = $(e.value.offset[1]), [g, y] = $(e.value.repeat[0]), [M, _] = $(e.value.repeat[1]);
  function T(C, z, A, Q, pe) {
    if (e.onChange !== void 0) {
      const K = e.prop !== void 0 ? e.prop : e.title;
      e.onChange(K, {
        src: C,
        offset: [z, A],
        repeat: [Q, pe]
      });
    }
  }
  function G(C) {
    const z = a.current.src, A = C.target.value;
    switch (C.target) {
      case t.current:
        d(A), T(z, A, f, g, M);
        break;
      case i.current:
        p(A), T(z, h, A, g, M);
        break;
      case c.current:
        y(A), T(z, h, f, A, M);
        break;
      case u.current:
        _(A), T(z, h, f, g, A);
        break;
    }
  }
  return /* @__PURE__ */ l.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ l.jsx("img", { alt: e.title, ref: a, onClick: () => {
      ai().then((C) => {
        a.current.src = C, T(C, h, f, g, M);
      });
    }, src: s.src.length > 0 ? s.src : un }),
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
            onChange: G
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: f,
            step: n,
            onChange: G
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
            value: g,
            step: n,
            onChange: G
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            ref: u,
            type: "number",
            value: M,
            step: n,
            onChange: G
          }
        )
      ] }),
      /* @__PURE__ */ l.jsx("button", { onClick: () => {
        T("", h, f, g, M), a.current.src = un;
      }, children: "Clear" })
    ] })
  ] });
}
function wt(e) {
  let n = e.value;
  n !== void 0 && n.isColor !== void 0 && (n = ja(e.value));
  const [a, t] = $(n), i = q(null), c = (d) => {
    let f = d.target.value;
    e.type === "boolean" ? f = d.target.checked : e.type === "option" && (f = e.options[f].value), t(f), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, f);
  }, u = {};
  e.disabled && (u.opacity = 0.8);
  const s = e.type === "string" && (a.length > 100 || a.search(`
`) > -1), h = s || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ l.jsxs("div", { className: `field ${h ? "block" : ""}`, style: u, children: [
    e.type !== "button" && /* @__PURE__ */ l.jsx("label", { ref: i, children: Mt(e.title) }, "fieldLabel"),
    e.type === "string" && !s && /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: c,
        value: a
      }
    ),
    e.type === "string" && s && /* @__PURE__ */ l.jsx(
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
      et,
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
      et,
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
    e.type === "image" && /* @__PURE__ */ l.jsx(gi, { title: e.title, prop: e.prop, value: e.value, onChange: e.onChange }),
    e.type === "option" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx("select", { onChange: c, disabled: e.disabled, defaultValue: e.value, children: e.options?.map((d, f) => /* @__PURE__ */ l.jsx("option", { value: d.value, children: Mt(d.title) }, f)) }) }),
    e.type === "vector2" && /* @__PURE__ */ l.jsx(Ja, { step: e.step, value: a, min: 0, max: 1, onChange: c }),
    e.type === "grid3" && /* @__PURE__ */ l.jsx(cn, { step: e.step, value: a, onChange: c }),
    e.type === "grid4" && /* @__PURE__ */ l.jsx(Qa, { step: e.step, value: a, onChange: c }),
    e.type === "euler" && /* @__PURE__ */ l.jsx(cn, { step: e.step, value: a, onChange: c })
  ] });
}
function dn(e) {
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
        title: dn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, c) => {
          n.updateObject(e.uuid, i, c), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = n.getScene(e.uuid);
          if (u !== null) {
            const s = u.getObjectByProperty("uuid", e.uuid);
            s !== void 0 && (ae(s, i, c), s.updateProjectionMatrix());
          }
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      a.push({
        title: dn(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (i, c) => {
          n.updateObject(e.uuid, i, c), n.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = n.getScene(e.uuid);
          if (u !== null) {
            const s = u.getObjectByProperty("uuid", e.uuid);
            s !== void 0 && (ae(s, i, c), s.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ l.jsx(
    tt,
    {
      title: "Camera",
      items: a
    }
  );
}
function bi(e, n) {
  const a = new ua();
  a.elements = e.matrix;
  const t = new J(), i = new da(), c = new J();
  e.uuid.length > 0 && (t.setFromMatrixPosition(a), i.setFromRotationMatrix(a), c.setFromMatrixScale(a));
  const u = (s, h) => {
    const d = s === "rotation" ? { x: h._x, y: h._y, z: h._z } : h;
    n.updateObject(e.uuid, s, d);
    const f = n.getScene(e.uuid);
    if (f !== null) {
      const p = f.getObjectByProperty("uuid", e.uuid);
      ae(p, s, d);
    }
  };
  return /* @__PURE__ */ l.jsx(
    tt,
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
function hn(e) {
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
        title: hn(t),
        prop: t,
        type: "color",
        value: i,
        onChange: (c, u) => {
          const s = new $t(u);
          n.updateObject(e.uuid, c, s);
          const h = n.getScene(e.uuid);
          if (h !== null) {
            const d = h.getObjectByProperty("uuid", e.uuid);
            ae(d, c, s);
          }
        }
      }) : a.push({
        title: hn(t),
        prop: t,
        type: typeof i,
        value: i,
        step: typeof i == "number" ? 0.01 : void 0,
        onChange: (c, u) => {
          n.updateObject(e.uuid, c, u);
          const s = n.getScene(e.uuid);
          if (s !== null) {
            const h = s.getObjectByProperty("uuid", e.uuid);
            ae(h, c, u);
          }
        }
      }));
    }
  return /* @__PURE__ */ l.jsx(
    tt,
    {
      title: "Light",
      items: a
    }
  );
}
function Ei(e, n) {
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
    let s = !1;
    if (u !== void 0) {
      const h = u.mixer;
      if (s = h !== void 0, s) {
        const d = [
          {
            title: "Time Scale",
            type: "range",
            value: h.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (f, p) => {
              h.timeScale = p, n.updateObject(e.uuid, "mixer.timeScale", p);
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
  return /* @__PURE__ */ l.jsx(tt, { title: "Animation", items: a });
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
let ye = { ...Yn };
function xi(e) {
  const [n, a] = $(-1);
  Ae(() => {
    function u(h) {
      ye = { ...h.value }, a(Date.now());
    }
    function s() {
      ye = { ...Yn }, a(Date.now());
    }
    return P.addEventListener(I.SET_SCENE, s), P.addEventListener(I.SET_OBJECT, u), () => {
      P.removeEventListener(I.SET_SCENE, s), P.removeEventListener(I.SET_OBJECT, u);
    };
  }, []);
  const t = ye.type.toLowerCase(), i = ye.animations.length > 0 || ye.mixer !== void 0, c = t.search("mesh") > -1 || t.search("line") > -1 || t.search("points") > -1;
  return /* @__PURE__ */ l.jsx(Wt, { label: "Inspector", children: /* @__PURE__ */ l.jsx("div", { id: "Inspector", className: e.class, children: ye.uuid.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        wt,
        {
          type: "string",
          title: "Name",
          prop: "name",
          value: ye.name,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        wt,
        {
          type: "string",
          title: "Type",
          prop: "type",
          value: ye.type,
          disabled: !0
        }
      ),
      /* @__PURE__ */ l.jsx(
        wt,
        {
          type: "string",
          title: "UUID",
          prop: "uuid",
          value: ye.uuid,
          disabled: !0
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      bi(ye, e.three),
      i ? Ei(ye, e.three) : null,
      t.search("camera") > -1 ? vi(ye, e.three) : null,
      t.search("light") > -1 ? yi(ye, e.three) : null,
      c ? pi(ye, e.three) : null
    ] })
  ] }) }, n) }, "Inspector");
}
function Gi(e) {
  const [n] = $([]), [a, t] = $(0), i = (s) => {
    n.push(s.value), t(Date.now());
  }, c = (s) => {
    const h = s.value;
    for (let d = 0; d < n.length; d++)
      if (h.uuid === n[d].uuid) {
        n.splice(d, 1), t(Date.now());
        return;
      }
  };
  Ae(() => (P.addEventListener(I.ADD_SCENE, i), P.addEventListener(I.REMOVE_SCENE, c), () => {
    P.removeEventListener(I.ADD_SCENE, i), P.removeEventListener(I.REMOVE_SCENE, c);
  }), []);
  const u = [];
  return n.forEach((s, h) => {
    u.push(
      /* @__PURE__ */ l.jsx(Wt, { label: `Scene: ${s.name}`, open: !0, children: /* @__PURE__ */ l.jsx(Xa, { child: s, scene: s, three: e.three }) }, `scene_${h}`)
    );
  }), /* @__PURE__ */ l.jsxs("div", { id: "SidePanel", children: [
    u,
    /* @__PURE__ */ l.jsx(xi, { three: e.three })
  ] }, `SidePanel ${a}`);
}
function Wi(e) {
  return Ae(() => {
    function n(s) {
      let h = null;
      return e.three.scenes.forEach((d) => {
        s.search(d.uuid) > -1 && (h = d);
      }), h;
    }
    const a = (s) => {
      const h = s.value, d = n(h), f = d?.getObjectByProperty("uuid", h);
      f !== void 0 ? e.three.setObject(f) : console.log(`Hermes - can't find object: ${h}`, d);
    }, t = (s, h, d) => {
      const f = n(s), p = f?.getObjectByProperty("uuid", s);
      p !== void 0 ? ae(p, h, d) : console.log(`Hermes - can't set object: ${s}`, f);
    }, i = (s) => {
      const h = s.value, { key: d, value: f, uuid: p } = h;
      t(p, d, f);
    }, c = (s) => {
      const h = s.value, f = n(h.uuid)?.getObjectByProperty("uuid", h.uuid);
      if (f !== void 0) {
        const p = (g) => {
          const y = h.key.split(".");
          switch (y.length) {
            case 1:
              f[y[0]] = g;
              break;
            case 2:
              f[y[0]][y[1]] = g;
              break;
            case 3:
              f[y[0]][y[1]][y[2]] = g;
              break;
            case 4:
              f[y[0]][y[1]][y[2]][y[3]] = g;
              break;
            case 5:
              f[y[0]][y[1]][y[2]][y[3]][y[4]] = g;
              break;
          }
          f.material.needsUpdate = !0;
        };
        h.value.src.length > 0 ? zn(h.value.src).then((g) => {
          g.offset.set(h.value.offset[0], h.value.offset[1]), g.repeat.set(h.value.repeat[0], h.value.repeat[1]), p(g);
        }) : p(null);
      }
    }, u = (s) => {
      const { key: h, uuid: d, value: f, subitem: p } = s.value, y = n(d)?.getObjectByProperty("uuid", d);
      if (y !== void 0)
        try {
          p !== void 0 ? Ua(y, p)[h](f) : y[h](f);
        } catch (M) {
          console.log("Error requesting method:"), console.log(M), console.log(h), console.log(f);
        }
    };
    return P.addEventListener(I.GET_OBJECT, a), P.addEventListener(I.UPDATE_OBJECT, i), P.addEventListener(I.CREATE_TEXTURE, c), P.addEventListener(I.REQUEST_METHOD, u), () => {
      P.removeEventListener(I.GET_OBJECT, a), P.removeEventListener(I.UPDATE_OBJECT, i), P.removeEventListener(I.CREATE_TEXTURE, c), P.removeEventListener(I.REQUEST_METHOD, u);
    };
  }, []), null;
}
class Si extends ha {
  constructor(n, a) {
    const t = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new Kt();
    i.setAttribute("position", new Xt(t, 3)), i.computeBoundingSphere();
    const c = new fa({ fog: !1 });
    super(i, c), this.light = n, this.color = a, this.type = "RectAreaLightHelper";
    const u = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], s = new Kt();
    s.setAttribute("position", new Xt(u, 3)), s.computeBoundingSphere(), this.add(new Ln(s, new Bn({ side: xn, fog: !1 })));
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
const fn = { type: "change" }, jt = { type: "start" }, mn = { type: "end" }, xt = new ma(), pn = new pa(), Ci = Math.cos(70 * ga.DEG2RAD);
class wi extends yn {
  constructor(n, a) {
    super(), this.object = n, this.domElement = a, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ot.ROTATE, MIDDLE: ot.DOLLY, RIGHT: ot.PAN }, this.touches = { ONE: ct.ROTATE, TWO: ct.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return s.phi;
    }, this.getAzimuthalAngle = function() {
      return s.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(o) {
      o.addEventListener("keydown", W), this._domElementKeyEvents = o;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", W), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      t.target0.copy(t.target), t.position0.copy(t.object.position), t.zoom0 = t.object.zoom;
    }, this.reset = function() {
      t.target.copy(t.target0), t.object.position.copy(t.position0), t.object.zoom = t.zoom0, t.object.updateProjectionMatrix(), t.dispatchEvent(fn), t.update(), c = i.NONE;
    }, this.update = function() {
      const o = new J(), x = new Zt().setFromUnitVectors(n.up, new J(0, 1, 0)), D = x.clone().invert(), B = new J(), oe = new Zt(), Oe = new J(), ge = 2 * Math.PI;
      return function(bt = null) {
        const yt = t.object.position;
        o.copy(yt).sub(t.target), o.applyQuaternion(x), s.setFromVector3(o), t.autoRotate && c === i.NONE && ce(nt(bt)), t.enableDamping ? (s.theta += h.theta * t.dampingFactor, s.phi += h.phi * t.dampingFactor) : (s.theta += h.theta, s.phi += h.phi);
        let Re = t.minAzimuthAngle, _e = t.maxAzimuthAngle;
        isFinite(Re) && isFinite(_e) && (Re < -Math.PI ? Re += ge : Re > Math.PI && (Re -= ge), _e < -Math.PI ? _e += ge : _e > Math.PI && (_e -= ge), Re <= _e ? s.theta = Math.max(Re, Math.min(_e, s.theta)) : s.theta = s.theta > (Re + _e) / 2 ? Math.max(Re, s.theta) : Math.min(_e, s.theta)), s.phi = Math.max(t.minPolarAngle, Math.min(t.maxPolarAngle, s.phi)), s.makeSafe(), t.enableDamping === !0 ? t.target.addScaledVector(f, t.dampingFactor) : t.target.add(f), t.target.sub(t.cursor), t.target.clampLength(t.minTargetRadius, t.maxTargetRadius), t.target.add(t.cursor);
        let Ze = !1;
        if (t.zoomToCursor && pe || t.object.isOrthographicCamera)
          s.radius = Ne(s.radius);
        else {
          const ke = s.radius;
          s.radius = Ne(s.radius * d), Ze = ke != s.radius;
        }
        if (o.setFromSpherical(s), o.applyQuaternion(D), yt.copy(t.target).add(o), t.object.lookAt(t.target), t.enableDamping === !0 ? (h.theta *= 1 - t.dampingFactor, h.phi *= 1 - t.dampingFactor, f.multiplyScalar(1 - t.dampingFactor)) : (h.set(0, 0, 0), f.set(0, 0, 0)), t.zoomToCursor && pe) {
          let ke = null;
          if (t.object.isPerspectiveCamera) {
            const Ve = o.length();
            ke = Ne(Ve * d);
            const rt = Ve - ke;
            t.object.position.addScaledVector(A, rt), t.object.updateMatrixWorld(), Ze = !!rt;
          } else if (t.object.isOrthographicCamera) {
            const Ve = new J(Q.x, Q.y, 0);
            Ve.unproject(t.object);
            const rt = t.object.zoom;
            t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), t.object.updateProjectionMatrix(), Ze = rt !== t.object.zoom;
            const Et = new J(Q.x, Q.y, 0);
            Et.unproject(t.object), t.object.position.sub(Et).add(Ve), t.object.updateMatrixWorld(), ke = o.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), t.zoomToCursor = !1;
          ke !== null && (this.screenSpacePanning ? t.target.set(0, 0, -1).transformDirection(t.object.matrix).multiplyScalar(ke).add(t.object.position) : (xt.origin.copy(t.object.position), xt.direction.set(0, 0, -1).transformDirection(t.object.matrix), Math.abs(t.object.up.dot(xt.direction)) < Ci ? n.lookAt(t.target) : (pn.setFromNormalAndCoplanarPoint(t.object.up, t.target), xt.intersectPlane(pn, t.target))));
        } else if (t.object.isOrthographicCamera) {
          const ke = t.object.zoom;
          t.object.zoom = Math.max(t.minZoom, Math.min(t.maxZoom, t.object.zoom / d)), ke !== t.object.zoom && (t.object.updateProjectionMatrix(), Ze = !0);
        }
        return d = 1, pe = !1, Ze || B.distanceToSquared(t.object.position) > u || 8 * (1 - oe.dot(t.object.quaternion)) > u || Oe.distanceToSquared(t.target) > u ? (t.dispatchEvent(fn), B.copy(t.object.position), oe.copy(t.object.quaternion), Oe.copy(t.target), !0) : !1;
      };
    }(), this.dispose = function() {
      t.domElement.removeEventListener("contextmenu", fe), t.domElement.removeEventListener("pointerdown", ue), t.domElement.removeEventListener("pointercancel", w), t.domElement.removeEventListener("wheel", se), t.domElement.removeEventListener("pointermove", de), t.domElement.removeEventListener("pointerup", w), t.domElement.getRootNode().removeEventListener("keydown", F, { capture: !0 }), t._domElementKeyEvents !== null && (t._domElementKeyEvents.removeEventListener("keydown", W), t._domElementKeyEvents = null);
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
    const u = 1e-6, s = new Jt(), h = new Jt();
    let d = 1;
    const f = new J(), p = new Ee(), g = new Ee(), y = new Ee(), M = new Ee(), _ = new Ee(), T = new Ee(), G = new Ee(), C = new Ee(), z = new Ee(), A = new J(), Q = new Ee();
    let pe = !1;
    const K = [], re = {};
    let Se = !1;
    function nt(o) {
      return o !== null ? 2 * Math.PI / 60 * t.autoRotateSpeed * o : 2 * Math.PI / 60 / 60 * t.autoRotateSpeed;
    }
    function je(o) {
      const x = Math.abs(o * 0.01);
      return Math.pow(0.95, t.zoomSpeed * x);
    }
    function ce(o) {
      h.theta -= o;
    }
    function te(o) {
      h.phi -= o;
    }
    const be = function() {
      const o = new J();
      return function(D, B) {
        o.setFromMatrixColumn(B, 0), o.multiplyScalar(-D), f.add(o);
      };
    }(), Ce = function() {
      const o = new J();
      return function(D, B) {
        t.screenSpacePanning === !0 ? o.setFromMatrixColumn(B, 1) : (o.setFromMatrixColumn(B, 0), o.crossVectors(t.object.up, o)), o.multiplyScalar(D), f.add(o);
      };
    }(), H = function() {
      const o = new J();
      return function(D, B) {
        const oe = t.domElement;
        if (t.object.isPerspectiveCamera) {
          const Oe = t.object.position;
          o.copy(Oe).sub(t.target);
          let ge = o.length();
          ge *= Math.tan(t.object.fov / 2 * Math.PI / 180), be(2 * D * ge / oe.clientHeight, t.object.matrix), Ce(2 * B * ge / oe.clientHeight, t.object.matrix);
        } else
          t.object.isOrthographicCamera ? (be(D * (t.object.right - t.object.left) / t.object.zoom / oe.clientWidth, t.object.matrix), Ce(B * (t.object.top - t.object.bottom) / t.object.zoom / oe.clientHeight, t.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), t.enablePan = !1);
      };
    }();
    function Be(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d /= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function k(o) {
      t.object.isPerspectiveCamera || t.object.isOrthographicCamera ? d *= o : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), t.enableZoom = !1);
    }
    function Fe(o, x) {
      if (!t.zoomToCursor)
        return;
      pe = !0;
      const D = t.domElement.getBoundingClientRect(), B = o - D.left, oe = x - D.top, Oe = D.width, ge = D.height;
      Q.x = B / Oe * 2 - 1, Q.y = -(oe / ge) * 2 + 1, A.set(Q.x, Q.y, 1).unproject(t.object).sub(t.object.position).normalize();
    }
    function Ne(o) {
      return Math.max(t.minDistance, Math.min(t.maxDistance, o));
    }
    function Ue(o) {
      p.set(o.clientX, o.clientY);
    }
    function Xe(o) {
      Fe(o.clientX, o.clientX), G.set(o.clientX, o.clientY);
    }
    function $e(o) {
      M.set(o.clientX, o.clientY);
    }
    function ze(o) {
      g.set(o.clientX, o.clientY), y.subVectors(g, p).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      ce(2 * Math.PI * y.x / x.clientHeight), te(2 * Math.PI * y.y / x.clientHeight), p.copy(g), t.update();
    }
    function at(o) {
      C.set(o.clientX, o.clientY), z.subVectors(C, G), z.y > 0 ? Be(je(z.y)) : z.y < 0 && k(je(z.y)), G.copy(C), t.update();
    }
    function Ge(o) {
      _.set(o.clientX, o.clientY), T.subVectors(_, M).multiplyScalar(t.panSpeed), H(T.x, T.y), M.copy(_), t.update();
    }
    function We(o) {
      Fe(o.clientX, o.clientY), o.deltaY < 0 ? k(je(o.deltaY)) : o.deltaY > 0 && Be(je(o.deltaY)), t.update();
    }
    function He(o) {
      let x = !1;
      switch (o.code) {
        case t.keys.UP:
          o.ctrlKey || o.metaKey || o.shiftKey ? te(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : H(0, t.keyPanSpeed), x = !0;
          break;
        case t.keys.BOTTOM:
          o.ctrlKey || o.metaKey || o.shiftKey ? te(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : H(0, -t.keyPanSpeed), x = !0;
          break;
        case t.keys.LEFT:
          o.ctrlKey || o.metaKey || o.shiftKey ? ce(2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : H(t.keyPanSpeed, 0), x = !0;
          break;
        case t.keys.RIGHT:
          o.ctrlKey || o.metaKey || o.shiftKey ? ce(-2 * Math.PI * t.rotateSpeed / t.domElement.clientHeight) : H(-t.keyPanSpeed, 0), x = !0;
          break;
      }
      x && (o.preventDefault(), t.update());
    }
    function Pe(o) {
      if (K.length === 1)
        p.set(o.pageX, o.pageY);
      else {
        const x = Ye(o), D = 0.5 * (o.pageX + x.x), B = 0.5 * (o.pageY + x.y);
        p.set(D, B);
      }
    }
    function ee(o) {
      if (K.length === 1)
        M.set(o.pageX, o.pageY);
      else {
        const x = Ye(o), D = 0.5 * (o.pageX + x.x), B = 0.5 * (o.pageY + x.y);
        M.set(D, B);
      }
    }
    function we(o) {
      const x = Ye(o), D = o.pageX - x.x, B = o.pageY - x.y, oe = Math.sqrt(D * D + B * B);
      G.set(0, oe);
    }
    function it(o) {
      t.enableZoom && we(o), t.enablePan && ee(o);
    }
    function ht(o) {
      t.enableZoom && we(o), t.enableRotate && Pe(o);
    }
    function xe(o) {
      if (K.length == 1)
        g.set(o.pageX, o.pageY);
      else {
        const D = Ye(o), B = 0.5 * (o.pageX + D.x), oe = 0.5 * (o.pageY + D.y);
        g.set(B, oe);
      }
      y.subVectors(g, p).multiplyScalar(t.rotateSpeed);
      const x = t.domElement;
      ce(2 * Math.PI * y.x / x.clientHeight), te(2 * Math.PI * y.y / x.clientHeight), p.copy(g);
    }
    function m(o) {
      if (K.length === 1)
        _.set(o.pageX, o.pageY);
      else {
        const x = Ye(o), D = 0.5 * (o.pageX + x.x), B = 0.5 * (o.pageY + x.y);
        _.set(D, B);
      }
      T.subVectors(_, M).multiplyScalar(t.panSpeed), H(T.x, T.y), M.copy(_);
    }
    function b(o) {
      const x = Ye(o), D = o.pageX - x.x, B = o.pageY - x.y, oe = Math.sqrt(D * D + B * B);
      C.set(0, oe), z.set(0, Math.pow(C.y / G.y, t.zoomSpeed)), Be(z.y), G.copy(C);
      const Oe = (o.pageX + x.x) * 0.5, ge = (o.pageY + x.y) * 0.5;
      Fe(Oe, ge);
    }
    function R(o) {
      t.enableZoom && b(o), t.enablePan && m(o);
    }
    function N(o) {
      t.enableZoom && b(o), t.enableRotate && xe(o);
    }
    function ue(o) {
      t.enabled !== !1 && (K.length === 0 && (t.domElement.setPointerCapture(o.pointerId), t.domElement.addEventListener("pointermove", de), t.domElement.addEventListener("pointerup", w)), !At(o) && (kt(o), o.pointerType === "touch" ? Ie(o) : S(o)));
    }
    function de(o) {
      t.enabled !== !1 && (o.pointerType === "touch" ? he(o) : V(o));
    }
    function w(o) {
      switch (Dt(o), K.length) {
        case 0:
          t.domElement.releasePointerCapture(o.pointerId), t.domElement.removeEventListener("pointermove", de), t.domElement.removeEventListener("pointerup", w), t.dispatchEvent(mn), c = i.NONE;
          break;
        case 1:
          const x = K[0], D = re[x];
          Ie({ pointerId: x, pageX: D.x, pageY: D.y });
          break;
      }
    }
    function S(o) {
      let x;
      switch (o.button) {
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
        case ot.DOLLY:
          if (t.enableZoom === !1)
            return;
          Xe(o), c = i.DOLLY;
          break;
        case ot.ROTATE:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enablePan === !1)
              return;
            $e(o), c = i.PAN;
          } else {
            if (t.enableRotate === !1)
              return;
            Ue(o), c = i.ROTATE;
          }
          break;
        case ot.PAN:
          if (o.ctrlKey || o.metaKey || o.shiftKey) {
            if (t.enableRotate === !1)
              return;
            Ue(o), c = i.ROTATE;
          } else {
            if (t.enablePan === !1)
              return;
            $e(o), c = i.PAN;
          }
          break;
        default:
          c = i.NONE;
      }
      c !== i.NONE && t.dispatchEvent(jt);
    }
    function V(o) {
      switch (c) {
        case i.ROTATE:
          if (t.enableRotate === !1)
            return;
          ze(o);
          break;
        case i.DOLLY:
          if (t.enableZoom === !1)
            return;
          at(o);
          break;
        case i.PAN:
          if (t.enablePan === !1)
            return;
          Ge(o);
          break;
      }
    }
    function se(o) {
      t.enabled === !1 || t.enableZoom === !1 || c !== i.NONE || (o.preventDefault(), t.dispatchEvent(jt), We(Me(o)), t.dispatchEvent(mn));
    }
    function Me(o) {
      const x = o.deltaMode, D = {
        clientX: o.clientX,
        clientY: o.clientY,
        deltaY: o.deltaY
      };
      switch (x) {
        case 1:
          D.deltaY *= 16;
          break;
        case 2:
          D.deltaY *= 100;
          break;
      }
      return o.ctrlKey && !Se && (D.deltaY *= 10), D;
    }
    function F(o) {
      o.key === "Control" && (Se = !0, t.domElement.getRootNode().addEventListener("keyup", Z, { passive: !0, capture: !0 }));
    }
    function Z(o) {
      o.key === "Control" && (Se = !1, t.domElement.getRootNode().removeEventListener("keyup", Z, { passive: !0, capture: !0 }));
    }
    function W(o) {
      t.enabled === !1 || t.enablePan === !1 || He(o);
    }
    function Ie(o) {
      switch (vt(o), K.length) {
        case 1:
          switch (t.touches.ONE) {
            case ct.ROTATE:
              if (t.enableRotate === !1)
                return;
              Pe(o), c = i.TOUCH_ROTATE;
              break;
            case ct.PAN:
              if (t.enablePan === !1)
                return;
              ee(o), c = i.TOUCH_PAN;
              break;
            default:
              c = i.NONE;
          }
          break;
        case 2:
          switch (t.touches.TWO) {
            case ct.DOLLY_PAN:
              if (t.enableZoom === !1 && t.enablePan === !1)
                return;
              it(o), c = i.TOUCH_DOLLY_PAN;
              break;
            case ct.DOLLY_ROTATE:
              if (t.enableZoom === !1 && t.enableRotate === !1)
                return;
              ht(o), c = i.TOUCH_DOLLY_ROTATE;
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
    function he(o) {
      switch (vt(o), c) {
        case i.TOUCH_ROTATE:
          if (t.enableRotate === !1)
            return;
          xe(o), t.update();
          break;
        case i.TOUCH_PAN:
          if (t.enablePan === !1)
            return;
          m(o), t.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (t.enableZoom === !1 && t.enablePan === !1)
            return;
          R(o), t.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (t.enableZoom === !1 && t.enableRotate === !1)
            return;
          N(o), t.update();
          break;
        default:
          c = i.NONE;
      }
    }
    function fe(o) {
      t.enabled !== !1 && o.preventDefault();
    }
    function kt(o) {
      K.push(o.pointerId);
    }
    function Dt(o) {
      delete re[o.pointerId];
      for (let x = 0; x < K.length; x++)
        if (K[x] == o.pointerId) {
          K.splice(x, 1);
          return;
        }
    }
    function At(o) {
      for (let x = 0; x < K.length; x++)
        if (K[x] == o.pointerId)
          return !0;
      return !1;
    }
    function vt(o) {
      let x = re[o.pointerId];
      x === void 0 && (x = new Ee(), re[o.pointerId] = x), x.set(o.pageX, o.pageY);
    }
    function Ye(o) {
      const x = o.pointerId === K[0] ? K[1] : K[0];
      return re[x];
    }
    t.domElement.addEventListener("contextmenu", fe), t.domElement.addEventListener("pointerdown", ue), t.domElement.addEventListener("pointercancel", w), t.domElement.addEventListener("wheel", se, { passive: !1 }), t.domElement.getRootNode().addEventListener("keydown", F, { passive: !0, capture: !0 }), this.update();
  }
}
function ut(e, n, a, t, i) {
  return t + (e - n) * (i - t) / (a - n);
}
const Rt = (e) => {
  const [n, a] = $(e.options[e.index]), t = () => {
    e.onToggle(!e.open);
  }, i = (c) => {
    c !== n && (e.onSelect(c), a(c)), e.onToggle(!1);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "dropdown-toggle", onClick: t, children: n }),
    e.open && /* @__PURE__ */ l.jsx("ul", { className: "dropdown-menu", children: e.options.map((c) => /* @__PURE__ */ l.jsx("li", { onClick: () => i(c), children: c }, c)) })
  ] });
}, gn = [
  "Renderer",
  "Depth",
  "Normals",
  "UVs",
  "Wireframe"
], Je = Aa(function(n, a) {
  const [t, i] = $("Renderer"), [c, u] = $(!1), [s, h] = $(!1), [d, f] = $(!1), p = n.options.indexOf(n.camera.name);
  return /* @__PURE__ */ l.jsxs("div", { className: "CameraWindow", children: [
    /* @__PURE__ */ l.jsx("div", { ref: a, className: "clickable", onClick: () => {
      d && f(!1);
    } }),
    /* @__PURE__ */ l.jsx(
      Rt,
      {
        index: gn.indexOf(t),
        open: s,
        options: gn,
        onSelect: (g) => {
          if (g === t)
            return;
          const y = g;
          n.onSelectRenderMode(y), i(y);
        },
        onToggle: (g) => {
          c && u(!1), h(g);
        },
        up: !0
      }
    ),
    /* @__PURE__ */ l.jsx(
      Rt,
      {
        index: p,
        open: d,
        options: n.options,
        onSelect: n.onSelectCamera,
        onToggle: (g) => {
          f(g);
        },
        up: !0
      }
    )
  ] });
});
class Mi extends Fn {
  constructor(n) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: va,
      side: Sn,
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
class Oi extends Ln {
  gridMaterial;
  constructor() {
    const n = new Mi();
    super(new ba(2, 2), n), this.gridMaterial = n, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
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
}`, _i = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Ti extends Fn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Ri,
      fragmentShader: _i
    });
  }
}
let De, Nt = !1, X = null, me = null, qe = null, Ke = null, dt = "Renderer", St = "Renderer", vn = "Renderer", bn = "Renderer";
function Hi(e) {
  const n = e.three.app.appID, a = localStorage.getItem(`${n}_mode`), t = localStorage.getItem(`${n}_tlCam`) !== null ? localStorage.getItem(`${n}_tlCam`) : "Debug", i = localStorage.getItem(`${n}_trCam`) !== null ? localStorage.getItem(`${n}_trCam`) : "Orthographic", c = localStorage.getItem(`${n}_blCam`) !== null ? localStorage.getItem(`${n}_blCam`) : "Front", u = localStorage.getItem(`${n}_brCam`) !== null ? localStorage.getItem(`${n}_brCam`) : "Top", s = localStorage.getItem(`${n}_tlRender`) !== null ? localStorage.getItem(`${n}_tlRender`) : "Renderer", h = localStorage.getItem(`${n}_trRender`) !== null ? localStorage.getItem(`${n}_trRender`) : "Renderer", d = localStorage.getItem(`${n}_blRender`) !== null ? localStorage.getItem(`${n}_blRender`) : "Renderer", f = localStorage.getItem(`${n}_brRender`) !== null ? localStorage.getItem(`${n}_brRender`) : "Renderer", p = le(() => /* @__PURE__ */ new Map(), []), g = le(() => /* @__PURE__ */ new Map(), []), y = le(() => /* @__PURE__ */ new Map(), []), M = le(() => /* @__PURE__ */ new Map(), []), _ = le(() => new ya(), []), T = le(() => new Ea(), []), G = le(() => new Oi(), []), C = le(() => new Qt(500), []), z = le(() => new Qt(100), []), A = le(() => new xa(), []), Q = le(() => new Sa(), []), pe = le(() => new Ti(), []), K = le(() => new Bn({
    opacity: 0.33,
    transparent: !0,
    wireframe: !0
  }), []);
  function re(m, b) {
    const R = new en(-100, 100, 100, -100, 50, 5e3);
    return R.name = m, R.position.copy(b), R.lookAt(0, 0, 0), p.set(m, R), R;
  }
  const Se = [
    "Single",
    "Side by Side",
    "Stacked",
    "Quad"
  ], nt = q(null), je = q(null), ce = q(null), te = q(null), be = q(null), Ce = q(null), [H, Be] = $(a !== null ? a : "Single"), [k, Fe] = $(null), [Ne, Ue] = $(!1), [Xe, $e] = $(!1), [ze, at] = $("Orbit"), [Ge, We] = $(!1), [He, Pe] = $(Date.now());
  localStorage.setItem(`${n}_mode`, H), localStorage.setItem(`${n}_tlCam`, t), localStorage.setItem(`${n}_trCam`, i), localStorage.setItem(`${n}_blCam`, c), localStorage.setItem(`${n}_brCam`, u), localStorage.setItem(`${n}_tlRender`, s), localStorage.setItem(`${n}_trRender`, h), localStorage.setItem(`${n}_blRender`, d), localStorage.setItem(`${n}_brRender`, f);
  const ee = (m, b) => {
    const R = g.get(m.name);
    if (R !== void 0 && R.dispose(), g.delete(m.name), m.name === "UI")
      return;
    const N = new wi(m, b);
    switch (N.enableDamping = !0, N.dampingFactor = 0.05, m.name) {
      case "Top":
      case "Bottom":
      case "Left":
      case "Right":
      case "Front":
      case "Back":
        N.enableRotate = !1;
        break;
    }
    g.set(m.name, N);
  }, we = (m) => {
    const b = y.get(m.name);
    b !== void 0 && (_.remove(b), b.dispose(), y.delete(m.name));
    const R = g.get(m.name);
    R !== void 0 && (R.dispose(), g.delete(m.name));
  }, it = () => {
    g.forEach((m, b) => {
      m.dispose();
      const R = y.get(b);
      R !== void 0 && (_.remove(R), R.dispose()), y.delete(b), g.delete(b);
    }), g.clear(), y.clear();
  }, ht = () => {
    switch (H) {
      case "Single":
        ee(X, ce.current);
        break;
      case "Side by Side":
      case "Stacked":
        ee(X, ce.current), ee(me, te.current);
        break;
      case "Quad":
        ee(X, ce.current), ee(me, te.current), ee(qe, be.current), ee(Ke, Ce.current);
        break;
    }
  };
  Ae(() => {
    const m = new Ca({
      canvas: nt.current,
      stencil: !1
    });
    m.autoClear = !1, m.shadowMap.enabled = !0, m.setPixelRatio(devicePixelRatio), m.setClearColor(0), e.three.renderer = m, Fe(m);
  }, []), Ae(() => {
    _.name = "Debug Scene", _.uuid = "", T.name = "helpers", _.add(T), T.add(G), C.name = "axisHelper", T.add(C), z.name = "interactionHelper", T.add(z), z.visible = !1, re("Top", new J(0, 1e3, 0)), re("Bottom", new J(0, -1e3, 0)), re("Left", new J(-1e3, 0, 0)), re("Right", new J(1e3, 0, 0)), re("Front", new J(0, 0, 1e3)), re("Back", new J(0, 0, -1e3)), re("Orthographic", new J(1e3, 1e3, 1e3)), re("UI", new J());
    const m = new Pt(60, 1, 50, 5e3);
    m.name = "Debug", m.position.set(500, 500, 500), m.lookAt(0, 0, 0), p.set("Debug", m), X = p.get(localStorage.getItem(`${n}_tlCam`)), me = p.get(localStorage.getItem(`${n}_trCam`)), qe = p.get(localStorage.getItem(`${n}_blCam`)), Ke = p.get(localStorage.getItem(`${n}_brCam`));
  }, []), Ae(() => {
    const m = () => {
      M.forEach((w) => {
        T.remove(w), w.dispose();
      }), M.clear();
    }, b = () => {
      De.traverse((w) => {
        if (w.type.search("Light") > -1) {
          let S;
          switch (w.type) {
            case "DirectionalLight":
              S = new Ta(w, 100), S.name = `${w.name}Helper`, M.set(w.name, S), T.add(S);
              break;
            case "HemisphereLight":
              S = new _a(w, 250), S.name = `${w.name}Helper`, M.set(w.name, S), T.add(S);
              break;
            case "RectAreaLight":
              S = new Si(w), S.name = `${w.name}Helper`, M.set(w.name, S), T.add(S);
              break;
            case "PointLight":
              S = new Ra(w, 100), S.name = `${w.name}Helper`, M.set(w.name, S), T.add(S);
              break;
            case "SpotLight":
              S = new Oa(w), S.name = `${w.name}Helper`, M.set(w.name, S), T.add(S);
              break;
          }
        }
      });
    }, R = (w) => {
      T.add(C), m(), Ot(De), _.remove(De);
      const S = e.scenes.get(w.value.name);
      if (S !== void 0) {
        const V = new S();
        e.onSceneSet !== void 0 && e.onSceneSet(V), De = V, e.three.scene = De, _.add(De), Nt = !0, b();
      }
    }, N = (w) => {
      const S = w.value, V = e.three.scene?.getObjectByProperty("uuid", S.uuid);
      if (V !== void 0 && p.set(S.name, V), V instanceof Pt) {
        const se = new Ma(V);
        y.set(V.name, se), _.add(se);
      }
      Pe(Date.now());
    }, ue = (w) => {
      const S = y.get(w.value.name);
      S !== void 0 && (_.remove(S), S.dispose()), p.delete(w.value.name), Pe(Date.now());
    }, de = (w) => {
      const S = De.getObjectByProperty("uuid", w.value.uuid);
      S && S.add(C);
    };
    return P.addEventListener(I.SET_SCENE, R), P.addEventListener(I.ADD_CAMERA, N), P.addEventListener(I.REMOVE_CAMERA, ue), P.addEventListener(I.SET_OBJECT, de), () => {
      P.removeEventListener(I.SET_SCENE, R), P.removeEventListener(I.ADD_CAMERA, N), P.removeEventListener(I.REMOVE_CAMERA, ue), P.removeEventListener(I.SET_OBJECT, de);
    };
  }, []), Ae(() => {
    if (k === null)
      return;
    let m = window.innerWidth, b = window.innerHeight, R = Math.floor(m / 2), N = Math.floor(b / 2), ue = -1;
    const de = () => {
      m = window.innerWidth - 300, b = window.innerHeight, R = Math.floor(m / 2), N = Math.floor(b / 2), e.three.resize(m, b), e.onSceneResize !== void 0 && Nt && e.onSceneResize(De, m, b);
      let F = m, Z = b;
      switch (H) {
        case "Side by Side":
          F = R, Z = b;
          break;
        case "Stacked":
          F = m, Z = N;
          break;
        case "Quad":
          F = R, Z = N;
          break;
      }
      p.forEach((W) => {
        W instanceof en ? (W.left = F / -2, W.right = F / 2, W.top = Z / 2, W.bottom = Z / -2, W.name === "UI" && (W.position.x = m / 2, W.position.y = b / -2, W.position.z = 100), W.updateProjectionMatrix()) : W instanceof Pt && (W.aspect = F / Z, W.updateProjectionMatrix(), y.get(W.name)?.update());
      });
    };
    function w(F) {
      switch (F) {
        case "Depth":
          return A;
        case "Normals":
          return Q;
        case "Renderer":
          return null;
        case "UVs":
          return pe;
        case "Wireframe":
          return K;
      }
      return null;
    }
    const S = () => {
      const F = w(dt);
      _.overrideMaterial = F, k.setViewport(0, 0, m, b), k.setScissor(0, 0, m, b), k.render(_, X);
    }, V = () => {
      const F = w(dt), Z = w(St);
      if (_.overrideMaterial = F, H === "Side by Side")
        k.setViewport(0, 0, R, b), k.setScissor(0, 0, R, b), k.render(_, X), _.overrideMaterial = Z, k.setViewport(R, 0, R, b), k.setScissor(R, 0, R, b), k.render(_, me);
      else {
        const W = b - N;
        k.setViewport(0, W, m, N), k.setScissor(0, W, m, N), k.render(_, X), _.overrideMaterial = Z, k.setViewport(0, 0, m, N), k.setScissor(0, 0, m, N), k.render(_, me);
      }
    }, se = () => {
      const F = w(dt), Z = w(St), W = w(vn), Ie = w(bn);
      let he = 0, fe = 0;
      fe = b - N, he = 0, _.overrideMaterial = F, k.setViewport(he, fe, R, N), k.setScissor(he, fe, R, N), k.render(_, X), he = R, _.overrideMaterial = Z, k.setViewport(he, fe, R, N), k.setScissor(he, fe, R, N), k.render(_, me), fe = 0, he = 0, _.overrideMaterial = W, k.setViewport(he, fe, R, N), k.setScissor(he, fe, R, N), k.render(_, qe), he = R, _.overrideMaterial = Ie, k.setViewport(he, fe, R, N), k.setScissor(he, fe, R, N), k.render(_, Ke);
    }, Me = () => {
      switch (g.forEach((F) => {
        F.update();
      }), y.forEach((F) => {
        F.update();
      }), M.forEach((F) => {
        F.update !== void 0 && F.update();
      }), e.onSceneUpdate !== void 0 && Nt && e.onSceneUpdate(De), k.clear(), H) {
        case "Single":
          S();
          break;
        case "Side by Side":
        case "Stacked":
          V();
          break;
        case "Quad":
          se();
          break;
      }
      ue = requestAnimationFrame(Me);
    };
    return ht(), window.addEventListener("resize", de), de(), Me(), () => {
      window.removeEventListener("resize", de), cancelAnimationFrame(ue), ue = -1;
    };
  }, [H, k]), Ae(() => {
    if (k !== null) {
      const m = new wa(), b = new Ee(), R = (w, S, V, se) => {
        switch (H) {
          case "Quad":
            w < V ? S < se ? m.setFromCamera(b, X) : m.setFromCamera(b, qe) : S < se ? m.setFromCamera(b, me) : m.setFromCamera(b, Ke);
            break;
          case "Side by Side":
            w < V ? m.setFromCamera(b, X) : m.setFromCamera(b, me);
            break;
          case "Single":
            m.setFromCamera(b, X);
            break;
          case "Stacked":
            S < se ? m.setFromCamera(b, X) : m.setFromCamera(b, me);
            break;
        }
      }, N = (w) => {
        if (ze === "Orbit")
          return;
        const S = new Ee();
        k.getSize(S);
        const V = Math.min(w.clientX, S.x), se = Math.min(w.clientY, S.y);
        b.x = ut(V, 0, S.x, -1, 1), b.y = ut(se, 0, S.y, 1, -1);
        const Me = S.x / 2, F = S.y / 2, Z = () => {
          V < Me ? b.x = ut(V, 0, Me, -1, 1) : b.x = ut(V, Me, S.x, -1, 1);
        }, W = () => {
          se < F ? b.y = ut(se, 0, F, 1, -1) : b.y = ut(se, F, S.y, 1, -1);
        };
        switch (H) {
          case "Quad":
            Z(), W();
            break;
          case "Side by Side":
            Z();
            break;
          case "Stacked":
            W(), W();
            break;
        }
        R(V, se, Me, F);
        const Ie = m.intersectObjects(De.children);
        Ie.length > 0 && z.position.copy(Ie[0].point);
      }, ue = (w) => {
        if (ze === "Orbit")
          return;
        const S = new Ee();
        if (k.getSize(S), w.clientX >= S.x)
          return;
        N(w);
        const V = m.intersectObjects(De.children);
        V.length > 0 && (e.three.getObject(V[0].object.uuid), z.visible = !1, at("Orbit"), Pe(Date.now()));
      }, de = je.current;
      return de.addEventListener("mousemove", N, !1), de.addEventListener("click", ue, !1), () => {
        de.removeEventListener("mousemove", N), de.removeEventListener("click", ue);
      };
    }
  }, [H, k, ze]);
  const xe = [];
  return p.forEach((m, b) => {
    xe.push(b);
  }), /* @__PURE__ */ l.jsxs("div", { className: "multiview", children: [
    /* @__PURE__ */ l.jsx("canvas", { ref: nt }),
    k !== null && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsxs("div", { className: `cameras ${H === "Single" || H === "Stacked" ? "single" : ""}`, ref: je, children: [
        H === "Single" && /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(
          Je,
          {
            camera: X,
            options: xe,
            ref: ce,
            onSelectCamera: (m) => {
              g.get(X.name)?.dispose();
              const b = p.get(m);
              b !== void 0 && (we(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), ee(b, ce.current));
            },
            onSelectRenderMode: (m) => {
              dt = m, localStorage.setItem(`${n}_tlRender`, m);
            }
          }
        ) }),
        (H === "Side by Side" || H === "Stacked") && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(
            Je,
            {
              camera: X,
              options: xe,
              ref: ce,
              onSelectCamera: (m) => {
                g.get(X.name)?.dispose();
                const b = p.get(m);
                b !== void 0 && (we(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), ee(b, ce.current));
              },
              onSelectRenderMode: (m) => {
                dt = m, localStorage.setItem(`${n}_tlRender`, m);
              }
            }
          ),
          /* @__PURE__ */ l.jsx(
            Je,
            {
              camera: me,
              options: xe,
              ref: te,
              onSelectCamera: (m) => {
                g.get(me.name)?.dispose();
                const b = p.get(m);
                b !== void 0 && (we(me), me = b, localStorage.setItem(`${n}_trCam`, b.name), ee(b, te.current));
              },
              onSelectRenderMode: (m) => {
                St = m, localStorage.setItem(`${n}_trRender`, m);
              }
            }
          )
        ] }),
        H === "Quad" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(
            Je,
            {
              camera: X,
              options: xe,
              ref: ce,
              onSelectCamera: (m) => {
                g.get(X.name)?.dispose();
                const b = p.get(m);
                b !== void 0 && (we(X), X = b, localStorage.setItem(`${n}_tlCam`, b.name), ee(b, ce.current));
              },
              onSelectRenderMode: (m) => {
                dt = m, localStorage.setItem(`${n}_tlRender`, m);
              }
            }
          ),
          /* @__PURE__ */ l.jsx(
            Je,
            {
              camera: me,
              options: xe,
              ref: te,
              onSelectCamera: (m) => {
                g.get(me.name)?.dispose();
                const b = p.get(m);
                b !== void 0 && (we(me), me = b, localStorage.setItem(`${n}_trCam`, b.name), ee(b, te.current));
              },
              onSelectRenderMode: (m) => {
                St = m, localStorage.setItem(`${n}_trRender`, m);
              }
            }
          ),
          /* @__PURE__ */ l.jsx(
            Je,
            {
              camera: qe,
              options: xe,
              ref: be,
              onSelectCamera: (m) => {
                g.get(qe.name)?.dispose();
                const b = p.get(m);
                b !== void 0 && (we(qe), qe = b, localStorage.setItem(`${n}_blCam`, b.name), ee(b, be.current));
              },
              onSelectRenderMode: (m) => {
                vn = m, localStorage.setItem(`${n}_blRender`, m);
              }
            }
          ),
          /* @__PURE__ */ l.jsx(
            Je,
            {
              camera: Ke,
              options: xe,
              ref: Ce,
              onSelectCamera: (m) => {
                g.get(Ke.name)?.dispose();
                const b = p.get(m);
                b !== void 0 && (we(Ke), Ke = b, localStorage.setItem(`${n}_brCam`, b.name), ee(b, Ce.current));
              },
              onSelectRenderMode: (m) => {
                bn = m, localStorage.setItem(`${n}_brRender`, m);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ l.jsx(
          Rt,
          {
            index: Se.indexOf(H),
            options: Se,
            onSelect: (m) => {
              m !== H && (it(), Be(m));
            },
            open: Ne,
            onToggle: (m) => {
              Ue(m), Xe && $e(!1), Ge && We(!1);
            }
          }
        ),
        /* @__PURE__ */ l.jsx(
          Rt,
          {
            index: ze === "Orbit" ? 0 : 1,
            options: [
              "Orbit Mode",
              "Selection Mode"
            ],
            onSelect: (m) => {
              z.visible = m === "Selection Mode", at(z.visible ? "Selection" : "Orbit");
            },
            open: Ge,
            onToggle: (m) => {
              Ne && Ue(!1), Xe && $e(!1), We(m);
            }
          }
        )
      ] }, He)
    ] })
  ] });
}
function Yi(e) {
  return /* @__PURE__ */ l.jsxs("div", { className: "editor", ref: e.ref, style: e.style, children: [
    /* @__PURE__ */ l.jsx("div", { className: "header", children: e.header }),
    e.children,
    /* @__PURE__ */ l.jsx("div", { className: "footer", children: e.footer })
  ] });
}
export {
  Wt as Accordion,
  Li as Application,
  _t as BaseRemote,
  Wn as ChildObject,
  Xa as ContainerObject,
  Va as Draggable,
  Ya as DraggableItem,
  qa as Dropdown,
  Ka as DropdownItem,
  Yi as Editor,
  xi as Inspector,
  Hi as MultiView,
  Gn as NavButton,
  Bi as RemoteComponents,
  zi as RemoteController,
  Gt as RemoteTheatre,
  Ui as RemoteThree,
  $i as RemoteTweakpane,
  Wi as SceneInspector,
  Gi as SidePanel,
  I as ToolEvents,
  Mt as capitalize,
  Qe as clamp,
  ja as colorToHex,
  P as debugDispatcher,
  Ii as defaultTheatreCallback,
  Ot as dispose,
  Na as disposeMaterial,
  Ni as disposeTexture,
  ji as distance,
  Bt as hierarchyUUID,
  Ia as isColor,
  nn as mix,
  zt as noop,
  tn as normalize,
  Pa as randomID,
  rn as resetThreeObjects,
  an as round,
  Fi as theatreEditorApp,
  Lt as totalThreeObjects
};
