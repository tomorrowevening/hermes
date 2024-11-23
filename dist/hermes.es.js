import { OrthographicCamera as Ai, Scene as Hs, MeshBasicMaterial as Je, BufferGeometry as gt, Float32BufferAttribute as Ke, Mesh as O, LinearSRGBColorSpace as Ut, EventDispatcher as Ys, Texture as Bn, RepeatWrapping as is, Color as et, ColorManagement as pt, WebGLRenderTarget as Vn, FrontSide as Zn, BackSide as Bs, DoubleSide as Ni, NoBlending as Wn, NormalBlending as Gn, AdditiveBlending as Xn, SubtractiveBlending as $n, MultiplyBlending as qn, CustomBlending as Kn, AddEquation as Qn, SubtractEquation as Jn, ReverseSubtractEquation as ea, MinEquation as ta, MaxEquation as ia, ZeroFactor as Vs, OneFactor as Zs, SrcColorFactor as Ws, OneMinusSrcColorFactor as Gs, SrcAlphaFactor as Xs, OneMinusSrcAlphaFactor as $s, DstAlphaFactor as qs, OneMinusDstAlphaFactor as Ks, DstColorFactor as Qs, OneMinusDstColorFactor as Js, SrcAlphaSaturateFactor as sa, ConstantColorFactor as en, OneMinusConstantColorFactor as tn, ConstantAlphaFactor as sn, OneMinusConstantAlphaFactor as nn, Line as Ie, LineBasicMaterial as Fi, Ray as na, Plane as aa, MathUtils as ra, Vector3 as A, Controls as an, MOUSE as ft, TOUCH as mt, Quaternion as Ee, Spherical as Pi, Vector2 as ue, ShaderMaterial as rn, GLSL3 as oa, PlaneGeometry as on, Raycaster as ii, Euler as ln, Matrix4 as ri, Object3D as _t, CylinderGeometry as _e, BoxGeometry as he, OctahedronGeometry as Bt, SphereGeometry as cn, TorusGeometry as bt, CatmullRomCurve3 as ss, Group as la, AxesHelper as ns, MeshDepthMaterial as ca, MeshNormalMaterial as ha, PerspectiveCamera as Et, WebGLRenderer as da, CameraHelper as ua, SkinnedMesh as pa, SpotLightHelper as ma, PointLightHelper as fa, HemisphereLightHelper as ga, DirectionalLightHelper as _a, Clock as va, Vector4 as ya, Box3 as ba, Sphere as Ea, SkeletonHelper as Ca, SRGBColorSpace as as, NoToneMapping as rs, NoColorSpace as Sa, LinearToneMapping as wa, ReinhardToneMapping as xa, CineonToneMapping as Oa, ACESFilmicToneMapping as Ta, AgXToneMapping as Ma, NeutralToneMapping as Aa, CustomToneMapping as Pa } from "three";
import hn, { useState as B, useRef as ne, useEffect as tt, useMemo as kt, Component as jt, createRef as Ve, forwardRef as Da } from "react";
import { Reorder as dn } from "framer-motion";
const un = () => {
}, _o = () => {
};
function si(s) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
function Ra(s) {
  const e = JSON.stringify(s);
  return navigator.clipboard.writeText(e), e;
}
function Ia() {
  return Math.round(Math.random() * 1e6).toString();
}
function La(s) {
  return s.r !== void 0 && s.g !== void 0 && s.b !== void 0;
}
function os(s) {
  const e = Math.round(s.r * 255), t = Math.round(s.g * 255), i = Math.round(s.b * 255), n = (c) => {
    const l = c.toString(16);
    return l.length === 1 ? "0" + l : l;
  }, r = n(e), a = n(t), o = n(i);
  return "#" + r + a + o;
}
const vo = (s) => {
  s?.dispose();
}, ka = (s) => {
  s && (Array.isArray(s) ? s.forEach((e) => e.dispose()) : s.dispose());
}, He = (s) => {
  if (s) {
    for (; s.children.length > 0; ) {
      const e = s.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : He(e);
    }
    if (s.parent && s.parent.remove(s), s.isMesh) {
      const e = s;
      e.geometry?.dispose(), ka(e.material);
    }
    s.dispose !== void 0 && s.dispose();
  }
};
let Di = 0;
const ls = () => {
  Di = 0;
}, Ri = (s) => {
  if (!s)
    return;
  let e = s.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${Di}`, Di++), s.parent !== null && s.parent.uuid.length > 0 && (e = `${s.parent.uuid}.${e}`), s.uuid = e, s.isMesh !== void 0) {
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
  s.children.forEach((t) => Ri(t));
};
class Jt {
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
      this.camera = new Ai(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Hs(), this.material = new Je();
      const t = new gt();
      t.setAttribute("position", new Ke([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new Ke([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new Ke([0, 0, 2, 0, 0, 2], 2));
      const i = new O(t, this.material);
      this.scene.add(i);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, i = e.colorSpace;
      this.renderer.outputColorSpace = Ut, e.colorSpace = Ut, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = i;
    }
    return this.renderer.domElement;
  }
}
function fi(s, e, t, i) {
  return new (t || (t = Promise))(function(n, r) {
    function a(l) {
      try {
        c(i.next(l));
      } catch (d) {
        r(d);
      }
    }
    function o(l) {
      try {
        c(i.throw(l));
      } catch (d) {
        r(d);
      }
    }
    function c(l) {
      var d;
      l.done ? n(l.value) : (d = l.value, d instanceof t ? d : new t(function(p) {
        p(d);
      })).then(a, o);
    }
    c((i = i.apply(s, e || [])).next());
  });
}
const Ua = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function cs(s) {
  return s = s.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1");
}
const pn = typeof window > "u", Le = (() => {
  if (pn)
    return;
  const { userAgent: s, platform: e, maxTouchPoints: t } = window.navigator, i = /(iphone|ipod|ipad)/i.test(s), n = e === "iPad" || e === "MacIntel" && t > 0 && !window.MSStream;
  return { isIpad: n, isMobile: /android/i.test(s) || i || n, isSafari12: /Version\/12.+Safari/.test(s), isFirefox: /Firefox/.test(s) };
})();
function ja(s, e, t) {
  if (!t)
    return [e];
  const i = function(l) {
    const d = `
    precision highp float;
    attribute vec3 aPosition;
    varying float vvv;
    void main() {
      vvv = 0.31622776601683794;
      gl_Position = vec4(aPosition, 1.0);
    }
  `, p = `
    precision highp float;
    varying float vvv;
    void main() {
      vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
      enc = fract(enc);
      enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
      gl_FragColor = enc;
    }
  `, m = l.createShader(35633), g = l.createShader(35632), S = l.createProgram();
    if (!(g && m && S))
      return;
    l.shaderSource(m, d), l.shaderSource(g, p), l.compileShader(m), l.compileShader(g), l.attachShader(S, m), l.attachShader(S, g), l.linkProgram(S), l.detachShader(S, m), l.detachShader(S, g), l.deleteShader(m), l.deleteShader(g), l.useProgram(S);
    const T = l.createBuffer();
    l.bindBuffer(34962, T), l.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
    const M = l.getAttribLocation(S, "aPosition");
    l.vertexAttribPointer(M, 3, 5126, !1, 0, 0), l.enableVertexAttribArray(M), l.clearColor(1, 1, 1, 1), l.clear(16384), l.viewport(0, 0, 1, 1), l.drawArrays(4, 0, 3);
    const f = new Uint8Array(4);
    return l.readPixels(0, 0, 1, 1, 6408, 5121, f), l.deleteProgram(S), l.deleteBuffer(T), f.join("");
  }(s), n = "801621810", r = "8016218135", a = "80162181161", o = Le?.isIpad ? [["a7", a, 12], ["a8", r, 15], ["a8x", r, 15], ["a9", r, 15], ["a9x", r, 15], ["a10", r, 15], ["a10x", r, 15], ["a12", n, 15], ["a12x", n, 15], ["a12z", n, 15], ["a14", n, 15], ["a15", n, 15], ["m1", n, 15], ["m2", n, 15]] : [["a7", a, 12], ["a8", r, 12], ["a9", r, 15], ["a10", r, 15], ["a11", n, 15], ["a12", n, 15], ["a13", n, 15], ["a14", n, 15], ["a15", n, 15], ["a16", n, 15], ["a17", n, 15]];
  let c;
  return i === "80162181255" ? c = o.filter(([, , l]) => l >= 14) : (c = o.filter(([, l]) => l === i), c.length || (c = o)), c.map(([l]) => `apple ${l} gpu`);
}
class hs extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
const gi = [], ds = [];
function Na(s, e) {
  if (s === e)
    return 0;
  const t = s;
  s.length > e.length && (s = e, e = t);
  let i = s.length, n = e.length;
  for (; i > 0 && s.charCodeAt(~-i) === e.charCodeAt(~-n); )
    i--, n--;
  let r, a = 0;
  for (; a < i && s.charCodeAt(a) === e.charCodeAt(a); )
    a++;
  if (i -= a, n -= a, i === 0)
    return n;
  let o, c, l = 0, d = 0, p = 0;
  for (; d < i; )
    ds[d] = s.charCodeAt(a + d), gi[d] = ++d;
  for (; p < n; )
    for (r = e.charCodeAt(a + p), o = p++, l = p, d = 0; d < i; d++)
      c = r === ds[d] ? o : o + 1, o = gi[d], l = gi[d] = o > l ? c > l ? l + 1 : c : c > o ? o + 1 : c;
  return l;
}
function Fa(s) {
  return s != null;
}
const za = ({ mobileTiers: s = [0, 15, 30, 60], desktopTiers: e = [0, 15, 30, 60], override: t = {}, glContext: i, failIfMajorPerformanceCaveat: n = !1, benchmarksURL: r = "https://unpkg.com/detect-gpu@5.0.57/dist/benchmarks" } = {}) => fi(void 0, void 0, void 0, function* () {
  const a = {};
  if (pn)
    return { tier: 0, type: "SSR" };
  const { isIpad: o = !!Le?.isIpad, isMobile: c = !!Le?.isMobile, screenSize: l = window.screen, loadBenchmarks: d = (C) => fi(void 0, void 0, void 0, function* () {
    const w = yield fetch(`${r}/${C}`).then((I) => I.json());
    if (parseInt(w.shift().split(".")[0], 10) < 4)
      throw new hs("Detect GPU benchmark data is out of date. Please update to version 4x");
    return w;
  }) } = t;
  let { renderer: p } = t;
  const m = (C, w, I, U, K) => ({ device: K, fps: U, gpu: I, isMobile: c, tier: C, type: w });
  let g, S = "";
  if (p)
    p = cs(p), g = [p];
  else {
    const C = i || function(I, U = !1) {
      const K = { alpha: !1, antialias: !1, depth: !1, failIfMajorPerformanceCaveat: U, powerPreference: "high-performance", stencil: !1 };
      I && delete K.powerPreference;
      const me = window.document.createElement("canvas"), Ae = me.getContext("webgl", K) || me.getContext("experimental-webgl", K);
      return Ae ?? void 0;
    }(Le?.isSafari12, n);
    if (!C)
      return m(0, "WEBGL_UNSUPPORTED");
    const w = Le?.isFirefox ? null : C.getExtension("WEBGL_debug_renderer_info");
    if (p = w ? C.getParameter(w.UNMASKED_RENDERER_WEBGL) : C.getParameter(C.RENDERER), !p)
      return m(1, "FALLBACK");
    S = p, p = cs(p), g = function(I, U, K) {
      return U === "apple gpu" ? ja(I, U, K) : [U];
    }(C, p, c);
  }
  const T = (yield Promise.all(g.map(function(C) {
    var w;
    return fi(this, void 0, void 0, function* () {
      const I = ((V) => {
        const re = c ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
        for (const Oe of re)
          if (V.includes(Oe))
            return Oe;
      })(C);
      if (!I)
        return;
      const U = `${c ? "m" : "d"}-${I}${o ? "-ipad" : ""}.json`, K = a[U] = (w = a[U]) !== null && w !== void 0 ? w : d(U);
      let me;
      try {
        me = yield K;
      } catch (V) {
        if (V instanceof hs)
          throw V;
        return;
      }
      const Ae = function(V) {
        var re;
        const Oe = (V = V.replace(/\([^)]+\)/, "")).match(/\d+/) || V.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
        return (re = Oe?.join("").replace(/\W|amd/g, "")) !== null && re !== void 0 ? re : "";
      }(C);
      let Ce = me.filter(([, V]) => V === Ae);
      Ce.length || (Ce = me.filter(([V]) => V.includes(C)));
      const le = Ce.length;
      if (le === 0)
        return;
      const Q = C.split(/[.,()\[\]/\s]/g).sort().filter((V, re, Oe) => re === 0 || V !== Oe[re - 1]).join(" ");
      let G, [Ue, , , , ce] = le > 1 ? Ce.map((V) => [V, Na(Q, V[2])]).sort(([, V], [, re]) => V - re)[0][0] : Ce[0], be = Number.MAX_VALUE;
      const { devicePixelRatio: te } = window, je = l.width * te * l.height * te;
      for (const V of ce) {
        const [re, Oe] = V, vt = re * Oe, it = Math.abs(je - vt);
        it < be && (be = it, G = V);
      }
      if (!G)
        return;
      const [, , Ne, Fe] = G;
      return [be, Ne, Ue, Fe];
    });
  }))).filter(Fa).sort(([C = Number.MAX_VALUE, w], [I = Number.MAX_VALUE, U]) => C === I ? w - U : C - I);
  if (!T.length) {
    const C = Ua.find((w) => p.includes(w));
    return C ? m(0, "BLOCKLISTED", C) : m(1, "FALLBACK", `${p} (${S})`);
  }
  const [, M, f, v] = T[0];
  if (M === -1)
    return m(0, "BLOCKLISTED", f, M, v);
  const E = c ? s : e;
  let b = 0;
  for (let C = 0; C < E.length; C++)
    M >= E[C] && (b = C);
  return m(b, "BENCHMARK", f, M, v);
});
var Ha = /* @__PURE__ */ ((s) => (s[s.High = 0] = "High", s[s.Medium = 1] = "Medium", s[s.Low = 2] = "Low", s))(Ha || {});
function yo(s) {
  return new Promise((e) => {
    za().then((t) => {
      let i = !1;
      const n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (i = "transferControlToOffscreen" in s, n) {
        const a = navigator.userAgent.match(/version\/(\d+)/i);
        i = (a ? parseInt(a[1]) : 0) >= 17;
      }
      const r = {
        dpr: devicePixelRatio,
        fps: t.fps !== void 0 ? t.fps : 30,
        width: innerWidth,
        height: innerHeight,
        mobile: t.isMobile !== void 0 ? t.isMobile : !1,
        supportOffScreenCanvas: i,
        quality: 2
        /* Low */
      };
      t.tier === 3 ? r.quality = 0 : t.tier === 2 && (r.quality = 1), e(r);
    });
  });
}
class bo {
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
var P = /* @__PURE__ */ ((s) => (s.CUSTOM = "ToolEvents::custom", s.SELECT_DROPDOWN = "ToolEvents::selectDropdown", s.DRAG_UPDATE = "ToolEvents::dragUpdate", s.ADD_SCENE = "ToolEvents::addScene", s.REFRESH_SCENE = "ToolEvents::refreshScene", s.REMOVE_SCENE = "ToolEvents::removeScene", s.SET_SCENE = "ToolEvents::setScene", s.GET_OBJECT = "ToolEvents::getObject", s.SET_OBJECT = "ToolEvents::setObject", s.UPDATE_OBJECT = "ToolEvents::updateObject", s.CREATE_TEXTURE = "ToolEvents::createTexture", s.REQUEST_METHOD = "ToolEvents::requestMethod", s.ADD_CAMERA = "ToolEvents::addCamera", s.REMOVE_CAMERA = "ToolEvents::removeCamera", s.ADD_GROUP = "ToolEvents::addGroup", s.REMOVE_GROUP = "ToolEvents::removeGroup", s.ADD_SPLINE = "ToolEvents::addSpline", s.ADD_RENDERER = "ToolEvents::addRenderer", s.UPDATE_RENDERER = "ToolEvents::updateRenderer", s))(P || {});
const D = new Ys();
class zi {
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
class Eo extends zi {
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
        D.dispatchEvent({ type: P.SELECT_DROPDOWN, value: i.data });
        break;
      case "draggableListUpdate":
        D.dispatchEvent({ type: P.DRAG_UPDATE, value: i.data });
        break;
    }
  }
}
function Co(s, e, t) {
  if (s.editor) {
    t.ui.restore(), t.onSelectionChange((a) => {
      a.length < 1 || a.forEach((o) => {
        let c = o.address.sheetId, l = "setSheet", d = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            l = "setSheet", d = {
              sheet: o.address.sheetId
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            l = "setSheetObject", c += `_${o.address.objectKey}`, d = {
              id: c,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
        }
        s.send({ event: l, target: "app", data: d });
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
function So() {
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
class wo extends zi {
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
    l !== void 0 ? l = a.object(t, { ...i, ...l.value }, { reconfigure: !0 }) : l = a.object(t, i), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, n !== void 0 ? n : un);
    const d = l.onValuesChange((p) => {
      if (this.app.editor) {
        for (const g in p) {
          const S = p[g];
          typeof S == "object" && La(S) && (p[g] = {
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
            sheetObject: c,
            values: p
          }
        });
      }
      const m = this.sheetObjectCBs.get(c);
      m !== void 0 && m(p);
    });
    return this.sheetObjectUnsubscribe.set(c, d), l;
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
          let c = o.address.sheetId, l = "setSheet", d = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              l = "setSheet", d = {
                sheet: o.address.sheetId
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              l = "setSheetObject", c += `_${o.address.objectKey}`, d = {
                id: c,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
          }
          e.send({ event: l, target: "app", data: d });
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
function Ya(s) {
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
function ut(s) {
  const e = {
    name: s.name,
    type: s.type,
    uuid: s.uuid,
    children: []
  };
  return s.children.forEach((t) => {
    e.children.push(ut(t));
  }), e;
}
function Ba(s) {
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
function Va(s) {
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
function at(s) {
  const e = {};
  for (const t in s) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || Va(t))
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
          src: Jt.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = Ba(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return s.anisotropy !== void 0 && (e.anisotropy = s.anisotropy), s.clearcoat !== void 0 && (e.clearcoat = s.clearcoat), s.iridescence !== void 0 && (e.iridescence = s.iridescence), s.dispersion !== void 0 && (e.dispersion = s.dispersion), s.sheen !== void 0 && (e.sheen = s.sheen), s.transmission !== void 0 && (e.transmission = s.transmission), s.transmission !== void 0 && (e.transmission = s.transmission), e;
}
function _i(s) {
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
        n.push(at(r));
      }), e.material = n;
    } else
      e.material = at(i.material);
  } else if (t.search("points") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((r) => {
        n.push(at(r));
      }), e.material = n;
    } else
      e.material = at(i.material);
  } else if (t.search("line") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((r) => {
        n.push(at(r));
      }), e.material = n;
    } else
      e.material = at(i.material);
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
function Za(s, e) {
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
function Wa(s, e) {
  for (const t in e)
    s[t] = e[t];
}
function ee(s, e, t) {
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
    a != null && Wa(a, t);
  }
}
function mn(s) {
  return new Promise((e, t) => {
    const i = new Image();
    i.onload = () => {
      const n = new Bn(i);
      n.wrapS = is, n.wrapT = is, n.needsUpdate = !0, e(n);
    }, i.onerror = t, i.src = s;
  });
}
function $e(s, e, t) {
  return Math.min(e, Math.max(s, t));
}
function us(s, e, t) {
  return (t - s) / (e - s);
}
function Ii(s, e, t) {
  return s * (1 - t) + e * t;
}
function Me(s, e = 1) {
  return Number(s.toFixed(e));
}
class xo extends zi {
  canvas = null;
  // Canvas or OffscreenCanvas
  inputElement = null;
  // reference this to receive events
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  dispose() {
    this.scenes.forEach((e) => {
      He(e);
    }), this.scenes.clear(), this.scene && He(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  getObject(e) {
    this.app.debugEnabled && (this.renderer !== void 0 && (Jt.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (Jt.renderer = this.renderer);
    const t = _i(e);
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
  // Renderer
  setRenderer(e, t = null) {
    if (this.renderer = e, this.canvas = e.domElement, this.inputElement = t, !this.app.debugEnabled)
      return;
    const i = `#${e.getClearColor(new et()).getHexString()}`;
    this.app.send({
      event: "addRenderer",
      target: "editor",
      data: {
        autoClear: e.autoClear,
        autoClearColor: e.autoClearColor,
        autoClearDepth: e.autoClearDepth,
        autoClearStencil: e.autoClearStencil,
        outputColorSpace: e.outputColorSpace,
        localClippingEnabled: e.localClippingEnabled,
        clearColor: i,
        clearAlpha: e.getClearAlpha(),
        colorManagement: pt.enabled,
        toneMapping: e.toneMapping,
        toneMappingExposure: e.toneMappingExposure
      }
    });
  }
  updateRenderer(e) {
    this.app.send({
      event: "updateRenderer",
      target: "app",
      data: e
    });
  }
  // Scenes
  addScene(e) {
    if (e === void 0 || (this.scenes.set(e.name, e), !this.app.debugEnabled))
      return;
    ls(), Ri(e);
    const t = ut(e);
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
      const i = ut(t);
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
    const t = ut(e);
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
    this.renderer !== void 0 && (Jt.renderer = this.renderer), ls(), Ri(e);
    const t = ut(e);
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
    const t = _i(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = _i(e);
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
        D.dispatchEvent({ type: P.GET_OBJECT, value: i.data });
        break;
      case "updateObject":
        D.dispatchEvent({ type: P.UPDATE_OBJECT, value: i.data });
        break;
      case "createTexture":
        D.dispatchEvent({ type: P.CREATE_TEXTURE, value: i.data });
        break;
      case "requestMethod":
        D.dispatchEvent({ type: P.REQUEST_METHOD, value: i.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: ut(n.scenes.get(i.data.name))
        });
        break;
      case "updateRenderer":
        n.renderer && (n.renderer.autoClear = i.data.autoClear, n.renderer.autoClearColor = i.data.autoClearColor, n.renderer.autoClearDepth = i.data.autoClearDepth, n.renderer.autoClearStencil = i.data.autoClearStencil, n.renderer.outputColorSpace = i.data.outputColorSpace, n.renderer.localClippingEnabled = i.data.localClippingEnabled, n.renderer.setClearColor(i.data.clearColor, i.data.clearAlpha), n.renderer.toneMapping = i.data.toneMapping, n.renderer.toneMappingExposure = i.data.toneMappingExposure, pt.enabled = i.data.colorManagement);
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
        D.dispatchEvent({ type: P.SET_OBJECT, value: i.data });
        break;
      case "addScene":
        D.dispatchEvent({ type: P.ADD_SCENE, value: i.data });
        break;
      case "refreshScene":
        D.dispatchEvent({ type: P.REFRESH_SCENE, value: i.data });
        break;
      case "removeScene":
        D.dispatchEvent({ type: P.REMOVE_SCENE, value: i.data });
        break;
      case "setScene":
        D.dispatchEvent({ type: P.SET_SCENE, value: i.data });
        break;
      case "addCamera":
        D.dispatchEvent({ type: P.ADD_CAMERA, value: i.data });
        break;
      case "removeCamera":
        D.dispatchEvent({ type: P.REMOVE_CAMERA, value: i.data });
        break;
      case "addGroup":
        D.dispatchEvent({ type: P.ADD_GROUP, value: i.data });
        break;
      case "removeGroup":
        D.dispatchEvent({ type: P.REMOVE_GROUP, value: i.data });
        break;
      case "addSpline":
        D.dispatchEvent({ type: P.ADD_SPLINE, value: i.data });
        break;
      case "addRenderer":
        D.dispatchEvent({ type: P.ADD_RENDERER, value: i.data });
    }
  }
  // Renderer
  addRT(e, t) {
    const i = new Vn(32, 32, t);
    i.texture.name = e, this.renderTargets.set(e, i);
  }
  resize(e, t) {
    const i = this.dpr;
    this.renderTargets.forEach((r) => {
      r.setSize(e * i, t * i);
    });
    const n = !(this.renderer?.domElement instanceof OffscreenCanvas);
    this.renderer?.setSize(e, t, n);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio($e(1, 2, e));
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
}
var Li = { exports: {} }, Ct = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ps;
function Ga() {
  if (ps)
    return Ct;
  ps = 1;
  var s = hn, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, n = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, c, l) {
    var d, p = {}, m = null, g = null;
    l !== void 0 && (m = "" + l), c.key !== void 0 && (m = "" + c.key), c.ref !== void 0 && (g = c.ref);
    for (d in c)
      i.call(c, d) && !r.hasOwnProperty(d) && (p[d] = c[d]);
    if (o && o.defaultProps)
      for (d in c = o.defaultProps, c)
        p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: e, type: o, key: m, ref: g, props: p, _owner: n.current };
  }
  return Ct.Fragment = t, Ct.jsx = a, Ct.jsxs = a, Ct;
}
var St = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ms;
function Xa() {
  return ms || (ms = 1, process.env.NODE_ENV !== "production" && function() {
    var s = hn, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), S = Symbol.iterator, T = "@@iterator";
    function M(h) {
      if (h === null || typeof h != "object")
        return null;
      var y = S && h[S] || h[T];
      return typeof y == "function" ? y : null;
    }
    var f = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(h) {
      {
        for (var y = arguments.length, x = new Array(y > 1 ? y - 1 : 0), L = 1; L < y; L++)
          x[L - 1] = arguments[L];
        E("error", h, x);
      }
    }
    function E(h, y, x) {
      {
        var L = f.ReactDebugCurrentFrame, z = L.getStackAddendum();
        z !== "" && (y += "%s", x = x.concat([z]));
        var Z = x.map(function(N) {
          return String(N);
        });
        Z.unshift("Warning: " + y), Function.prototype.apply.call(console[h], console, Z);
      }
    }
    var b = !1, C = !1, w = !1, I = !1, U = !1, K;
    K = Symbol.for("react.module.reference");
    function me(h) {
      return !!(typeof h == "string" || typeof h == "function" || h === i || h === r || U || h === n || h === l || h === d || I || h === g || b || C || w || typeof h == "object" && h !== null && (h.$$typeof === m || h.$$typeof === p || h.$$typeof === a || h.$$typeof === o || h.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      h.$$typeof === K || h.getModuleId !== void 0));
    }
    function Ae(h, y, x) {
      var L = h.displayName;
      if (L)
        return L;
      var z = y.displayName || y.name || "";
      return z !== "" ? x + "(" + z + ")" : x;
    }
    function Ce(h) {
      return h.displayName || "Context";
    }
    function le(h) {
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
        case d:
          return "SuspenseList";
      }
      if (typeof h == "object")
        switch (h.$$typeof) {
          case o:
            var y = h;
            return Ce(y) + ".Consumer";
          case a:
            var x = h;
            return Ce(x._context) + ".Provider";
          case c:
            return Ae(h, h.render, "ForwardRef");
          case p:
            var L = h.displayName || null;
            return L !== null ? L : le(h.type) || "Memo";
          case m: {
            var z = h, Z = z._payload, N = z._init;
            try {
              return le(N(Z));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Q = Object.assign, G = 0, Ue, ce, be, te, je, Ne, Fe;
    function V() {
    }
    V.__reactDisabledLog = !0;
    function re() {
      {
        if (G === 0) {
          Ue = console.log, ce = console.info, be = console.warn, te = console.error, je = console.group, Ne = console.groupCollapsed, Fe = console.groupEnd;
          var h = {
            configurable: !0,
            enumerable: !0,
            value: V,
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
        G++;
      }
    }
    function Oe() {
      {
        if (G--, G === 0) {
          var h = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, h, {
              value: Ue
            }),
            info: Q({}, h, {
              value: ce
            }),
            warn: Q({}, h, {
              value: be
            }),
            error: Q({}, h, {
              value: te
            }),
            group: Q({}, h, {
              value: je
            }),
            groupCollapsed: Q({}, h, {
              value: Ne
            }),
            groupEnd: Q({}, h, {
              value: Fe
            })
          });
        }
        G < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vt = f.ReactCurrentDispatcher, it;
    function Nt(h, y, x) {
      {
        if (it === void 0)
          try {
            throw Error();
          } catch (z) {
            var L = z.stack.trim().match(/\n( *(at )?)/);
            it = L && L[1] || "";
          }
        return `
` + it + h;
      }
    }
    var ci = !1, Ft;
    {
      var bn = typeof WeakMap == "function" ? WeakMap : Map;
      Ft = new bn();
    }
    function Yi(h, y) {
      if (!h || ci)
        return "";
      {
        var x = Ft.get(h);
        if (x !== void 0)
          return x;
      }
      var L;
      ci = !0;
      var z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Z;
      Z = vt.current, vt.current = null, re();
      try {
        if (y) {
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
            } catch (ze) {
              L = ze;
            }
            Reflect.construct(h, [], N);
          } else {
            try {
              N.call();
            } catch (ze) {
              L = ze;
            }
            h.call(N.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ze) {
            L = ze;
          }
          h();
        }
      } catch (ze) {
        if (ze && L && typeof ze.stack == "string") {
          for (var j = ze.stack.split(`
`), fe = L.stack.split(`
`), J = j.length - 1, ie = fe.length - 1; J >= 1 && ie >= 0 && j[J] !== fe[ie]; )
            ie--;
          for (; J >= 1 && ie >= 0; J--, ie--)
            if (j[J] !== fe[ie]) {
              if (J !== 1 || ie !== 1)
                do
                  if (J--, ie--, ie < 0 || j[J] !== fe[ie]) {
                    var Se = `
` + j[J].replace(" at new ", " at ");
                    return h.displayName && Se.includes("<anonymous>") && (Se = Se.replace("<anonymous>", h.displayName)), typeof h == "function" && Ft.set(h, Se), Se;
                  }
                while (J >= 1 && ie >= 0);
              break;
            }
        }
      } finally {
        ci = !1, vt.current = Z, Oe(), Error.prepareStackTrace = z;
      }
      var nt = h ? h.displayName || h.name : "", ts = nt ? Nt(nt) : "";
      return typeof h == "function" && Ft.set(h, ts), ts;
    }
    function En(h, y, x) {
      return Yi(h, !1);
    }
    function Cn(h) {
      var y = h.prototype;
      return !!(y && y.isReactComponent);
    }
    function zt(h, y, x) {
      if (h == null)
        return "";
      if (typeof h == "function")
        return Yi(h, Cn(h));
      if (typeof h == "string")
        return Nt(h);
      switch (h) {
        case l:
          return Nt("Suspense");
        case d:
          return Nt("SuspenseList");
      }
      if (typeof h == "object")
        switch (h.$$typeof) {
          case c:
            return En(h.render);
          case p:
            return zt(h.type, y, x);
          case m: {
            var L = h, z = L._payload, Z = L._init;
            try {
              return zt(Z(z), y, x);
            } catch {
            }
          }
        }
      return "";
    }
    var Ht = Object.prototype.hasOwnProperty, Bi = {}, Vi = f.ReactDebugCurrentFrame;
    function Yt(h) {
      if (h) {
        var y = h._owner, x = zt(h.type, h._source, y ? y.type : null);
        Vi.setExtraStackFrame(x);
      } else
        Vi.setExtraStackFrame(null);
    }
    function Sn(h, y, x, L, z) {
      {
        var Z = Function.call.bind(Ht);
        for (var N in h)
          if (Z(h, N)) {
            var j = void 0;
            try {
              if (typeof h[N] != "function") {
                var fe = Error((L || "React class") + ": " + x + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw fe.name = "Invariant Violation", fe;
              }
              j = h[N](y, N, L, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (J) {
              j = J;
            }
            j && !(j instanceof Error) && (Yt(z), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", L || "React class", x, N, typeof j), Yt(null)), j instanceof Error && !(j.message in Bi) && (Bi[j.message] = !0, Yt(z), v("Failed %s type: %s", x, j.message), Yt(null));
          }
      }
    }
    var wn = Array.isArray;
    function hi(h) {
      return wn(h);
    }
    function xn(h) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, x = y && h[Symbol.toStringTag] || h.constructor.name || "Object";
        return x;
      }
    }
    function On(h) {
      try {
        return Zi(h), !1;
      } catch {
        return !0;
      }
    }
    function Zi(h) {
      return "" + h;
    }
    function Wi(h) {
      if (On(h))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xn(h)), Zi(h);
    }
    var yt = f.ReactCurrentOwner, Tn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Gi, Xi, di;
    di = {};
    function Mn(h) {
      if (Ht.call(h, "ref")) {
        var y = Object.getOwnPropertyDescriptor(h, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return h.ref !== void 0;
    }
    function An(h) {
      if (Ht.call(h, "key")) {
        var y = Object.getOwnPropertyDescriptor(h, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return h.key !== void 0;
    }
    function Pn(h, y) {
      if (typeof h.ref == "string" && yt.current && y && yt.current.stateNode !== y) {
        var x = le(yt.current.type);
        di[x] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', le(yt.current.type), h.ref), di[x] = !0);
      }
    }
    function Dn(h, y) {
      {
        var x = function() {
          Gi || (Gi = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        x.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function Rn(h, y) {
      {
        var x = function() {
          Xi || (Xi = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        x.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var In = function(h, y, x, L, z, Z, N) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: h,
        key: y,
        ref: x,
        props: N,
        // Record the component responsible for creating this element.
        _owner: Z
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
        value: L
      }), Object.defineProperty(j, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    };
    function Ln(h, y, x, L, z) {
      {
        var Z, N = {}, j = null, fe = null;
        x !== void 0 && (Wi(x), j = "" + x), An(y) && (Wi(y.key), j = "" + y.key), Mn(y) && (fe = y.ref, Pn(y, z));
        for (Z in y)
          Ht.call(y, Z) && !Tn.hasOwnProperty(Z) && (N[Z] = y[Z]);
        if (h && h.defaultProps) {
          var J = h.defaultProps;
          for (Z in J)
            N[Z] === void 0 && (N[Z] = J[Z]);
        }
        if (j || fe) {
          var ie = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          j && Dn(N, ie), fe && Rn(N, ie);
        }
        return In(h, j, fe, z, L, yt.current, N);
      }
    }
    var ui = f.ReactCurrentOwner, $i = f.ReactDebugCurrentFrame;
    function st(h) {
      if (h) {
        var y = h._owner, x = zt(h.type, h._source, y ? y.type : null);
        $i.setExtraStackFrame(x);
      } else
        $i.setExtraStackFrame(null);
    }
    var pi;
    pi = !1;
    function mi(h) {
      return typeof h == "object" && h !== null && h.$$typeof === e;
    }
    function qi() {
      {
        if (ui.current) {
          var h = le(ui.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
    }
    function kn(h) {
      {
        if (h !== void 0) {
          var y = h.fileName.replace(/^.*[\\\/]/, ""), x = h.lineNumber;
          return `

Check your code at ` + y + ":" + x + ".";
        }
        return "";
      }
    }
    var Ki = {};
    function Un(h) {
      {
        var y = qi();
        if (!y) {
          var x = typeof h == "string" ? h : h.displayName || h.name;
          x && (y = `

Check the top-level render call using <` + x + ">.");
        }
        return y;
      }
    }
    function Qi(h, y) {
      {
        if (!h._store || h._store.validated || h.key != null)
          return;
        h._store.validated = !0;
        var x = Un(y);
        if (Ki[x])
          return;
        Ki[x] = !0;
        var L = "";
        h && h._owner && h._owner !== ui.current && (L = " It was passed a child from " + le(h._owner.type) + "."), st(h), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, L), st(null);
      }
    }
    function Ji(h, y) {
      {
        if (typeof h != "object")
          return;
        if (hi(h))
          for (var x = 0; x < h.length; x++) {
            var L = h[x];
            mi(L) && Qi(L, y);
          }
        else if (mi(h))
          h._store && (h._store.validated = !0);
        else if (h) {
          var z = M(h);
          if (typeof z == "function" && z !== h.entries)
            for (var Z = z.call(h), N; !(N = Z.next()).done; )
              mi(N.value) && Qi(N.value, y);
        }
      }
    }
    function jn(h) {
      {
        var y = h.type;
        if (y == null || typeof y == "string")
          return;
        var x;
        if (typeof y == "function")
          x = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === p))
          x = y.propTypes;
        else
          return;
        if (x) {
          var L = le(y);
          Sn(x, h.props, "prop", L, h);
        } else if (y.PropTypes !== void 0 && !pi) {
          pi = !0;
          var z = le(y);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", z || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Nn(h) {
      {
        for (var y = Object.keys(h.props), x = 0; x < y.length; x++) {
          var L = y[x];
          if (L !== "children" && L !== "key") {
            st(h), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", L), st(null);
            break;
          }
        }
        h.ref !== null && (st(h), v("Invalid attribute `ref` supplied to `React.Fragment`."), st(null));
      }
    }
    function es(h, y, x, L, z, Z) {
      {
        var N = me(h);
        if (!N) {
          var j = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var fe = kn(z);
          fe ? j += fe : j += qi();
          var J;
          h === null ? J = "null" : hi(h) ? J = "array" : h !== void 0 && h.$$typeof === e ? (J = "<" + (le(h.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : J = typeof h, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, j);
        }
        var ie = Ln(h, y, x, z, Z);
        if (ie == null)
          return ie;
        if (N) {
          var Se = y.children;
          if (Se !== void 0)
            if (L)
              if (hi(Se)) {
                for (var nt = 0; nt < Se.length; nt++)
                  Ji(Se[nt], h);
                Object.freeze && Object.freeze(Se);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ji(Se, h);
        }
        return h === i ? Nn(ie) : jn(ie), ie;
      }
    }
    function Fn(h, y, x) {
      return es(h, y, x, !0);
    }
    function zn(h, y, x) {
      return es(h, y, x, !1);
    }
    var Hn = zn, Yn = Fn;
    St.Fragment = i, St.jsx = Hn, St.jsxs = Yn;
  }()), St;
}
process.env.NODE_ENV === "production" ? Li.exports = Ga() : Li.exports = Xa();
var u = Li.exports;
function fn(s) {
  return s.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: s.title } }) : /* @__PURE__ */ u.jsx("button", { children: s.title });
}
const $a = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), qa = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function Ka(s) {
  return /* @__PURE__ */ u.jsx(dn.Item, { value: s.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    qa,
    /* @__PURE__ */ u.jsx("span", { children: s.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      s.onDelete(s.index);
    }, children: $a })
  ] }) }, s.title);
}
function Qa(s) {
  const [e, t] = B(!1), [i, n] = B(s.options), r = (l) => {
    s.onDragComplete(l), n(l);
  }, a = (l) => {
    const d = [...i];
    d.splice(l, 1), r(d);
  }, o = [];
  i.forEach((l, d) => {
    o.push(/* @__PURE__ */ u.jsx(Ka, { index: d, title: l, onDelete: a }, l));
  });
  let c = "dropdown draggable";
  return s.subdropdown && (c += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: c, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ u.jsx(fn, { title: s.title }),
    /* @__PURE__ */ u.jsx(dn.Group, { axis: "y", values: i, onReorder: r, style: { visibility: e ? "visible" : "hidden" }, children: o })
  ] });
}
function Ja(s) {
  const [e, t] = B(!1), i = [];
  s.options.map((r, a) => {
    s.onSelect !== void 0 && (r.onSelect = s.onSelect), i.push(/* @__PURE__ */ u.jsx(er, { option: r }, a));
  });
  let n = "dropdown";
  return s.subdropdown && (n += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ u.jsx(fn, { title: s.title }),
        /* @__PURE__ */ u.jsx(
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
function er(s) {
  const { option: e } = s, [t, i] = B("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ u.jsx(
        Qa,
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
      n = /* @__PURE__ */ u.jsx(
        Ja,
        {
          title: e.title,
          options: e.value,
          onSelect: e.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      n = /* @__PURE__ */ u.jsx(
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
  return /* @__PURE__ */ u.jsx("li", { className: t === e.title ? "selected" : "", children: n }, Ia());
}
function Oo(s, e, t) {
  function i(r) {
    switch (e.forEach((a) => {
      a.callback(s, a.remote, r);
    }), r.event) {
      case "custom":
        D.dispatchEvent({ type: P.CUSTOM, value: r.data });
        break;
    }
  }
  function n(r) {
    switch (t.forEach((a) => {
      a.callback(s, a.remote, r);
    }), r.event) {
      case "custom":
        D.dispatchEvent({ type: P.CUSTOM, value: r.data });
        break;
    }
  }
  s.listen = (r) => {
    r.target === "editor" ? n(r) : i(r);
  };
}
function ni(s) {
  const [e, t] = B(s.open !== void 0 ? s.open : !0), i = !e || s.children === void 0, n = () => {
    D.dispatchEvent({ type: P.REMOVE_SCENE, value: s.scene });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${i ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !e;
          s.onToggle !== void 0 && s.onToggle(r), t(r);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: si(s.label) })
        ]
      }
    ),
    s.onRefresh ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("button", { className: "refresh", onClick: s.onRefresh }),
      /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: n })
    ] }) : null,
    s.button,
    /* @__PURE__ */ u.jsx("div", { className: e ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: s.children }) }, Math.random())
  ] });
}
function gn(s) {
  const e = ne(null), [t, i] = B(!1), n = s.child !== void 0 && s.child.children.length > 0, r = [];
  return s.child !== void 0 && s.child.children.length > 0 && s.child.children.map((a, o) => {
    r.push(/* @__PURE__ */ u.jsx(gn, { child: a, three: s.three }, o));
  }), tt(() => {
    if (s.child) {
      const a = s.three.getScene(s.child.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", s.child.uuid);
        o !== void 0 && (e.current.style.opacity = o.visible ? "1" : "0.25");
      }
    }
  }, [t]), /* @__PURE__ */ u.jsx(u.Fragment, { children: s.child !== void 0 && /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      n ? /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
                  e.current.style.opacity = l ? "1" : "0.25", s.three.updateObject(s.child.uuid, c, l), ee(o, c, l);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${Ya(s.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function fs(s) {
  const e = [];
  return s.child?.children.map((t, i) => {
    e.push(/* @__PURE__ */ u.jsx(gn, { child: t, scene: s.scene, three: s.three }, i));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${s.class !== void 0 ? s.class : ""}`, children: e });
}
function tr(s) {
  const [e, t] = B(s.defaultValue);
  return tt(() => {
    let i = !1, n = -1, r = 0, a = s.defaultValue, o = !1;
    const c = (g) => {
      o = g.ctrlKey;
    }, l = (g) => {
      i = !0, r = Number(s.input.current?.value), n = g.clientX, document.addEventListener("mouseup", p, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("contextmenu", p, !1);
    }, d = (g) => {
      if (!i)
        return;
      const S = s.step !== void 0 ? s.step : 1, T = (g.clientX - n) * S * (o ? 10 : 1);
      a = Number((r + T).toFixed(4)), s.min !== void 0 && (a = Math.max(a, s.min)), s.max !== void 0 && (a = Math.min(a, s.max)), s.onChange !== void 0 && s.onChange(a), t(a);
    }, p = () => {
      i = !1, document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", p);
    }, m = (g) => {
      const S = Number(g.target.value);
      s.onChange !== void 0 && s.onChange(S), t(S);
    };
    return s.label.current?.addEventListener("mousedown", l, !1), s.sliderRef !== void 0 && s.sliderRef.current?.addEventListener("input", m), document.addEventListener("keydown", c, !1), document.addEventListener("keyup", c, !1), () => {
      s.label.current?.removeEventListener("mousedown", l), s.sliderRef !== void 0 && s.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", p), document.removeEventListener("keydown", c), document.addEventListener("keyup", c, !1);
    };
  }, []), e;
}
function Qe(s) {
  const e = ne(null), t = ne(null), [i, n] = B(s.value);
  return tr({
    label: s.labelRef,
    input: e,
    sliderRef: t,
    defaultValue: i,
    min: s.min,
    max: s.max,
    step: s.step,
    onChange: (r) => {
      n(r), s.onChange !== void 0 && s.onChange(s.prop, r);
    }
  }), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    s.type === "number" && /* @__PURE__ */ u.jsx(
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
        onChange: (r) => {
          if (n(r.target.value), r.target.value.length === 0)
            return;
          const a = Number(r.target.value);
          isNaN(a) || s.onChange !== void 0 && s.onChange(s.prop, a);
        }
      }
    ),
    s.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "text",
          value: s.value.toString(),
          disabled: s.disabled,
          ref: e,
          className: "min",
          onChange: (r) => {
            if (r.target.value.length === 0)
              return;
            const a = Number(r.target.value);
            isNaN(a) || s.onChange !== void 0 && s.onChange(s.prop, a);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: s.disabled,
          type: "range",
          value: s.value,
          min: s.min,
          max: s.max,
          step: s.step,
          ref: t,
          onChange: un
        }
      )
    ] })
  ] });
}
function ir(s) {
  const e = ne(null), t = ne(null), i = ne(null), n = ne(null), r = ne(null), a = ne(null), [o, c] = B(s.value), [l, d] = B({
    min: Math.min(s.min, Math.min(s.value.x, s.value.y)),
    max: Math.max(s.max, Math.max(s.value.x, s.value.y))
  }), [p, m] = B(!1);
  function g() {
    p || (window.addEventListener("mousemove", T), window.addEventListener("mouseup", S), window.addEventListener("mouseup", S), m(!0));
  }
  function S() {
    window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", S), m(!1);
  }
  function T(b) {
    const C = r.current.getBoundingClientRect(), w = $e(0, 99, b.clientX - C.left) / 99, I = $e(0, 99, b.clientY - C.top) / 99, U = Me(Ii(l.min, l.max, w), 3), K = Me(Ii(l.min, l.max, I), 3);
    s.onChange({ target: { value: { x: U, y: K } } }), c({ x: U, y: K });
  }
  function M(b) {
    let C = o.x, w = o.y;
    b.target === e.current ? C = Number(b.target.value) : w = Number(b.target.value), c({ x: C, y: w });
  }
  function f() {
    const b = Number(i.current.value);
    d({ min: b, max: l.max }), (o.x < b || o.y < b) && c({ x: $e(b, l.max, o.x), y: $e(b, l.max, o.y) });
  }
  function v() {
    const b = Number(n.current.value);
    d({ min: l.min, max: b }), (o.x > b || o.y > b) && c({ x: $e(l.min, b, o.x), y: $e(l.min, b, o.y) });
  }
  tt(() => {
    const b = us(l.min, l.max, o.x), C = us(l.min, l.max, o.y);
    a.current.style.left = `${b * 100}%`, a.current.style.top = `${C * 100}%`;
  }, [l, o]);
  const E = s.step !== void 0 ? s.step : 0.01;
  return /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "X:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: o.x,
            min: l.min,
            max: l.max,
            step: E,
            onChange: M
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Y:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: o.y,
            min: l.min,
            max: l.max,
            step: E,
            onChange: M
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Min:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: l.min,
            step: E,
            onChange: f
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Max:" }),
        /* @__PURE__ */ u.jsx(
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
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: r, onMouseDown: g, onMouseUp: S, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: a })
    ] })
  ] });
}
const sr = Math.PI / 180, nr = 180 / Math.PI;
function rt(s, e, t, i, n) {
  return i + (s - e) * (n - i) / (t - e);
}
function ot(s, e, t) {
  return (1 - t) * s + t * e;
}
function ki(s) {
  return s * sr;
}
function ar(s) {
  return s * nr;
}
function gs(s) {
  const e = s.value.x !== void 0 && s.value.y !== void 0 && s.value.z !== void 0, t = s.value.isEuler !== void 0, i = s.value.elements !== void 0, n = s.step !== void 0 ? s.step : 0.01, r = [];
  if (t) {
    const a = kt(() => s.value, []);
    ["_x", "_y", "_z"].forEach((c) => {
      const l = ne(null);
      r.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Qe,
            {
              value: ar(a[c]),
              type: "number",
              prop: c,
              step: 0.1,
              labelRef: l,
              onChange: (d, p) => {
                a[d] = ki(p), s.onChange({ target: { value: a } });
              }
            }
          )
        ] }, c)
      );
    });
  } else if (e) {
    const a = kt(() => s.value, []), o = (l, d) => {
      a[l] = d, s.onChange({ target: { value: a } });
    };
    ["x", "y", "z"].forEach((l) => {
      const d = ne(null);
      r.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: d, children: l.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Qe,
            {
              value: a[l],
              type: "number",
              prop: l,
              step: n,
              labelRef: d,
              onChange: o
            }
          )
        ] }, l)
      );
    });
  } else if (i) {
    const a = kt(() => s.value, []), o = (c, l) => {
      const d = Number(c);
      a.elements[d] = l, s.onChange({ target: { value: a } });
    };
    for (let c = 0; c < 9; c++) {
      const l = ne(null);
      r.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: c + 1 }),
          /* @__PURE__ */ u.jsx(
            Qe,
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid3", children: r }, Math.random().toString());
}
function rr(s) {
  const e = s.value.x !== void 0, t = s.step !== void 0 ? s.step : 0.01, i = [];
  if (e) {
    const n = kt(() => s.value, []), r = (o, c) => {
      n[o] = c, s.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const c = ne(null);
      i.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: o.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Qe,
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
    const n = kt(() => s.value, []), r = (a, o) => {
      const c = Number(a);
      n.elements[c] = o, s.onChange({ target: { value: n } });
    };
    for (let a = 0; a < 16; a++) {
      const o = ne(null);
      i.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: o, children: a + 1 }),
          /* @__PURE__ */ u.jsx(
            Qe,
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: i });
}
function or(s) {
  return !(s === "defaultAttributeValues" || s === "forceSinglePass" || s === "linecap" || s === "linejoin" || s === "linewidth" || s === "normalMapType" || s === "precision" || s === "shadowSide" || s === "uniformsGroups" || s === "uniformsNeedUpdate" || s === "userData" || s === "version" || s === "wireframeLinecap" || s === "wireframeLinejoin" || s === "wireframeLinewidth" || s.slice(0, 4) === "clip" || s.slice(0, 7) === "polygon" || s.slice(0, 7) === "stencil" || s.slice(0, 2) === "is");
}
function lr(s) {
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
function oi(s) {
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
function _n(s) {
  const e = s.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function cr() {
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
const hr = [
  {
    title: "Front",
    value: Zn
  },
  {
    title: "Back",
    value: Bs
  },
  {
    title: "Double",
    value: Ni
  }
], dr = [
  {
    title: "No Blending",
    value: Wn
  },
  {
    title: "Normal",
    value: Gn
  },
  {
    title: "Additive",
    value: Xn
  },
  {
    title: "Subtractive",
    value: $n
  },
  {
    title: "Multiply",
    value: qn
  },
  {
    title: "Custom",
    value: Kn
  }
], ur = [
  {
    title: "Add",
    value: Qn
  },
  {
    title: "Subtract",
    value: Jn
  },
  {
    title: "Reverse Subtract",
    value: ea
  },
  {
    title: "Min",
    value: ta
  },
  {
    title: "Max",
    value: ia
  }
], pr = [
  {
    title: "Zero",
    value: Vs
  },
  {
    title: "One",
    value: Zs
  },
  {
    title: "Src Color",
    value: Ws
  },
  {
    title: "One Minus Src Color",
    value: Gs
  },
  {
    title: "Src Alpha",
    value: Xs
  },
  {
    title: "One Minus Src Alpha",
    value: $s
  },
  {
    title: "Dst Alpha",
    value: qs
  },
  {
    title: "One Minus Dst Alpha",
    value: Ks
  },
  {
    title: "Dst Color",
    value: Qs
  },
  {
    title: "One Minus Dst Color",
    value: Js
  },
  {
    title: "Src Alpha Saturate",
    value: sa
  },
  {
    title: "Constant Color",
    value: en
  },
  {
    title: "One Minus Constant Color",
    value: tn
  },
  {
    title: "Constant Alpha",
    value: sn
  },
  {
    title: "One Minus Constant Alpha",
    value: nn
  }
], mr = [
  {
    title: "Zero",
    value: Vs
  },
  {
    title: "One",
    value: Zs
  },
  {
    title: "Src Color",
    value: Ws
  },
  {
    title: "One Minus Src Color",
    value: Gs
  },
  {
    title: "Src Alpha",
    value: Xs
  },
  {
    title: "One Minus Src Alpha",
    value: $s
  },
  {
    title: "Dst Alpha",
    value: qs
  },
  {
    title: "One Minus Dst Alpha",
    value: Ks
  },
  {
    title: "Dst Color",
    value: Qs
  },
  {
    title: "One Minus Dst Color",
    value: Js
  },
  {
    title: "Constant Color",
    value: en
  },
  {
    title: "One Minus Constant Color",
    value: tn
  },
  {
    title: "Constant Alpha",
    value: sn
  },
  {
    title: "One Minus Constant Alpha",
    value: nn
  }
];
function wt(s, e) {
  s.needsUpdate = !0, s.type = "option", s.options = e;
}
function fr(s, e, t, i) {
  return {
    type: "boolean",
    title: oi(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (n, r) => {
      i.updateObject(t.uuid, `material.${s}`, r), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const a = i.getScene(t.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", t.uuid);
        ee(o, `material.${s}`, r);
      }
    }
  };
}
function gr(s, e, t, i) {
  const n = {
    type: "number",
    title: oi(s),
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
        ee(c, `material.${s}`, a);
      }
    }
  };
  switch (s) {
    case "blending":
      wt(n, dr);
      break;
    case "blendDst":
      wt(n, mr);
      break;
    case "blendEquation":
      wt(n, ur);
      break;
    case "blendSrc":
      wt(n, pr);
      break;
    case "side":
      wt(n, hr);
      break;
  }
  return _n(s) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function _r(s, e, t, i) {
  const n = {
    type: "string",
    title: oi(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (a, o) => {
      i.updateObject(t.uuid, `material.${s}`, o), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const c = i.getScene(t.uuid);
      if (c !== null) {
        const l = c.getObjectByProperty("uuid", t.uuid);
        ee(l, `material.${s}`, o);
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
      ee(l, `material.${s}`, o);
    }
  }, n.onKeyDown = (a) => {
    if (a.key === "Enter" && (a.altKey || a.metaKey)) {
      i.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = i.getScene(t.uuid);
      if (o !== null) {
        const c = o.getObjectByProperty("uuid", t.uuid);
        ee(c, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function vr(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z === void 0;
}
function yr(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w === void 0;
}
function br(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w !== void 0;
}
function Ui(s) {
  s.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function Rt(s, e, t, i, n = "", r = !1) {
  const a = oi(s).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${s}` : s, c = typeof e;
  if (c === "boolean" || c === "string")
    return {
      title: a,
      prop: o,
      type: c,
      value: e,
      disabled: r,
      onChange: (l, d) => {
        i.updateObject(t.uuid, `material.${o}`, d);
        const p = i.getScene(t.uuid);
        if (p !== null) {
          const m = p.getObjectByProperty("uuid", t.uuid);
          ee(m, `material.${o}`, d);
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
      onChange: (d, p) => {
        i.updateObject(t.uuid, `material.${o}`, p);
        const m = i.getScene(t.uuid);
        if (m !== null) {
          const g = m.getObjectByProperty("uuid", t.uuid);
          ee(g, `material.${o}`, p);
        }
      }
    };
    return _n(a) && (l.type = "range", l.min = 0, l.max = 1), l;
  } else {
    if (e.isColor)
      return {
        title: a,
        prop: o,
        type: "color",
        value: e,
        disabled: r,
        onChange: (l, d) => {
          const p = new et(d);
          i.updateObject(t.uuid, `material.${o}`, p);
          const m = i.getScene(t.uuid);
          if (m !== null) {
            const g = m.getObjectByProperty("uuid", t.uuid);
            ee(g, `material.${o}`, p);
          }
        }
      };
    if (Array.isArray(e)) {
      const l = [];
      for (const d in e) {
        const p = e[d], m = `[${d.toString()}]`;
        if (p.value !== void 0) {
          const g = Rt(`${m}.value`, p.value, t, i, o, r);
          g !== void 0 && l.push(g);
        } else {
          const g = Rt(m, p, t, i, o, r);
          g !== void 0 && l.push(g);
        }
      }
      if (l.length > 0)
        return Ui(l), {
          title: a,
          items: l
        };
    } else {
      if (vr(e))
        return {
          title: a,
          prop: o,
          type: "vector2",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            i.updateObject(t.uuid, `material.${o}`, d);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              ee(m, `material.${o}`, d);
            }
          }
        };
      if (yr(e))
        return {
          title: a,
          prop: o,
          type: "grid3",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            i.updateObject(t.uuid, `material.${o}`, d);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              ee(m, `material.${o}`, d);
            }
          }
        };
      if (br(e))
        return {
          title: a,
          prop: o,
          type: "grid4",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            i.updateObject(t.uuid, `material.${o}`, d);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              ee(m, `material.${o}`, d);
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
          onChange: (l, d) => {
            i.updateObject(t.uuid, `material.${o}`, d);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              ee(m, `material.${o}`, d);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: a,
          type: "image",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            const p = lr(s), m = n.length > 0 ? `${n}.${p}` : p;
            i.createTexture(t.uuid, `material.${m}`, d);
            const g = i.getScene(t.uuid);
            if (g !== null) {
              const S = g.getObjectByProperty("uuid", t.uuid);
              if (S !== void 0) {
                const T = (M) => {
                  const f = S.material, v = m.split(".");
                  switch (v.length) {
                    case 1:
                      f[v[0]] = M;
                      break;
                    case 2:
                      f[v[0]][v[1]] = M;
                      break;
                    case 3:
                      f[v[0]][v[1]][v[2]] = M;
                      break;
                    case 4:
                      f[v[0]][v[1]][v[2]][v[3]] = M;
                      break;
                    case 5:
                      f[v[0]][v[1]][v[2]][v[3]][v[4]] = M;
                      break;
                  }
                  f.needsUpdate = !0;
                };
                d.src.length > 0 ? mn(d.src).then((M) => {
                  M.offset.set(d.offset[0], d.offset[1]), M.repeat.set(d.repeat[0], d.repeat[1]), T(M);
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
          onChange: (l, d) => {
            i.updateObject(t.uuid, `material.${o}`, d);
            const p = i.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              ee(m, `material.${o}`, d);
            }
          }
        };
      {
        const l = [], d = s === "defines" || s === "extensions";
        try {
          for (const p in e) {
            const m = e[p];
            if (m !== void 0)
              if (m.value !== void 0) {
                const g = Rt(`${p}.value`, m.value, t, i, o, d);
                g !== void 0 && l.push(g);
              } else {
                const g = Rt(p, m, t, i, o, d);
                g !== void 0 && l.push(g);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", s, e);
        }
        if (l.length > 0)
          return Ui(l), {
            title: a,
            items: l
          };
      }
    }
  }
}
function _s(s, e, t) {
  const i = [];
  for (const n in s) {
    if (!or(n))
      continue;
    const r = typeof s[n], a = s[n];
    if (r === "boolean")
      i.push(fr(n, a, e, t));
    else if (r === "number")
      i.push(gr(n, a, e, t));
    else if (r === "string")
      i.push(_r(n, a, e, t));
    else if (r === "object") {
      const o = Rt(n, a, e, t);
      o !== void 0 && i.push(o);
    } else
      a !== void 0 && console.log("other:", n, r, a);
  }
  return Ui(i), i.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const r = n.getObjectByProperty("uuid", e.uuid);
        ee(r, "material.needsUpdate", !0);
      }
    }
  }), i;
}
function Er(s, e) {
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
        /* @__PURE__ */ u.jsx(
          xe,
          {
            title: `Material ${l}`,
            items: _s(a[l], s, e)
          },
          `Material ${l}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: o });
  } else
    return /* @__PURE__ */ u.jsx(
      xe,
      {
        title: "Material",
        items: _s(a, s, e),
        expanded: n,
        onToggle: (o) => {
          r(o);
        }
      }
    );
}
const vs = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Cr(s) {
  const e = s.step !== void 0 ? s.step : 0.01, t = ne(null), i = ne(null), n = ne(null), r = ne(null), a = ne(null), [o] = B(s.value), [c, l] = B(s.value.offset[0]), [d, p] = B(s.value.offset[1]), [m, g] = B(s.value.repeat[0]), [S, T] = B(s.value.repeat[1]);
  function M(v, E, b, C, w) {
    if (s.onChange !== void 0) {
      const I = s.prop !== void 0 ? s.prop : s.title;
      s.onChange(I, {
        src: v,
        offset: [E, b],
        repeat: [C, w]
      });
    }
  }
  function f(v) {
    const E = t.current.src, b = v.target.value;
    switch (v.target) {
      case i.current:
        l(b), M(E, b, d, m, S);
        break;
      case n.current:
        p(b), M(E, c, b, m, S);
        break;
      case r.current:
        g(b), M(E, c, d, b, S);
        break;
      case a.current:
        T(b), M(E, c, d, m, b);
        break;
    }
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ u.jsx("img", { alt: s.title, ref: t, onClick: () => {
      cr().then((v) => {
        t.current.src = v, M(v, c, d, m, S);
      });
    }, src: o.src.length > 0 ? o.src : vs }),
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: c,
            step: e,
            onChange: f
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: d,
            step: e,
            onChange: f
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Repeat:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: r,
            type: "number",
            value: m,
            step: e,
            onChange: f
          }
        ),
        /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx("button", { onClick: () => {
        M("", c, d, m, S), t.current.src = vs;
      }, children: "Clear" })
    ] })
  ] });
}
function ei(s) {
  let e = s.value;
  e !== void 0 && (e.isColor !== void 0 ? e = os(s.value) : s.type === "color" && (e = os(new et().setStyle(s.value, Ut))));
  const [t, i] = B(e), n = ne(null), r = (l) => {
    let d = l.target.value;
    if (s.type === "boolean")
      d = l.target.checked;
    else if (s.type === "option" && (typeof s.value == "number" ? d = Number(d) : typeof s.value == "boolean" ? d = !!d : typeof s.value == "object" && (d = JSON.parse(d)), s.options !== void 0)) {
      const p = s.options.length;
      for (let m = 0; m < p && s.options[m].value !== d; m++)
        ;
    }
    i(d), s.onChange !== void 0 && s.onChange(s.prop !== void 0 ? s.prop : s.title, d);
  }, a = {};
  s.disabled && (a.opacity = 0.8);
  const o = s.type === "string" && (t.length > 100 || t.search(`
`) > -1), c = o || s.type === "image" || s.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${c ? "block" : ""}`, style: a, children: [
    s.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: n, children: si(s.title) }, "fieldLabel"),
    s.type === "string" && !o && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: s.disabled,
        onChange: r,
        value: t
      }
    ),
    s.type === "string" && o && /* @__PURE__ */ u.jsx(
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
    s.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: s.disabled,
        onChange: r,
        checked: t
      }
    ),
    s.type === "number" && /* @__PURE__ */ u.jsx(
      Qe,
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
    s.type === "range" && /* @__PURE__ */ u.jsx(
      Qe,
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
    s.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: t.toString(), onChange: r, disabled: s.disabled, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: t, onChange: r, disabled: s.disabled })
    ] }),
    s.type === "button" && /* @__PURE__ */ u.jsx(
      "button",
      {
        disabled: s.disabled,
        onClick: () => {
          s.onChange !== void 0 && s.onChange(s.prop !== void 0 ? s.prop : s.title, !0);
        },
        children: s.title
      }
    ),
    s.type === "image" && /* @__PURE__ */ u.jsx(Cr, { title: s.title, prop: s.prop, value: s.value, onChange: s.onChange }),
    s.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: r, disabled: s.disabled, defaultValue: s.value, children: s.options?.map((l, d) => /* @__PURE__ */ u.jsx("option", { value: l.value, children: si(l.title) }, d)) }) }),
    s.type === "vector2" && /* @__PURE__ */ u.jsx(ir, { step: s.step, value: t, min: 0, max: 1, onChange: r }),
    s.type === "grid3" && /* @__PURE__ */ u.jsx(gs, { step: s.step, value: t, onChange: r }),
    s.type === "grid4" && /* @__PURE__ */ u.jsx(rr, { step: s.step, value: t, onChange: r }),
    s.type === "euler" && /* @__PURE__ */ u.jsx(gs, { step: s.step, value: t, onChange: r })
  ] });
}
function Sr(s) {
  return "items" in s;
}
class xe extends jt {
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
    const i = Ve(), n = /* @__PURE__ */ u.jsx(
      xe,
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
      if (Sr(t))
        e.push(
          /* @__PURE__ */ u.jsx(xe, { title: si(t.title), items: t.items }, Math.random())
        );
      else {
        const i = this.valueOverrides.get(t.title), n = i !== void 0 ? i : t.value;
        e.push(
          /* @__PURE__ */ u.jsx(
            ei,
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
    }), this.subgroupElements.forEach((t) => e.push(t)), /* @__PURE__ */ u.jsx(
      ni,
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
class se extends jt {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, se.instance = this, D.addEventListener(P.ADD_GROUP, this.addGroup), D.addEventListener(P.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    D.removeEventListener(P.ADD_GROUP, this.addGroup), D.removeEventListener(P.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ u.jsx("div", { className: "customGroups", children: se.groups }, this.state.lastUpdate);
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
    }), se.groups.push(
      /* @__PURE__ */ u.jsx(
        xe,
        {
          title: t.title,
          items: i
        },
        Math.random()
      )
    ), se.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, i = se.groupTitles.length;
    for (let n = 0; n < i; n++)
      if (t === se.groupTitles[n]) {
        se.groups.splice(n, 1), se.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
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
    const i = Ve(), n = /* @__PURE__ */ u.jsx(
      xe,
      {
        ref: i,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return se.groups.push(n), se.groupsRefs.push(i), se.groupTitles.push(e.title), i;
  }
  static removeEditorGroup(e) {
    const t = se.groupTitles.length;
    for (let i = 0; i < t; i++)
      if (e === se.groupTitles[i]) {
        se.groups.splice(i, 1), se.groupTitles.splice(i, 1), se.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
}
function ys(s) {
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
function wr(s, e) {
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
        title: ys(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(s.uuid, c, l), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const d = e.getScene(s.uuid);
          if (d !== null) {
            const p = d.getObjectByProperty("uuid", s.uuid);
            p !== void 0 && (ee(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  else if (s.orthographicCameraInfo !== void 0)
    for (const o in s.orthographicCameraInfo)
      a.push({
        title: ys(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(s.uuid, c, l), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const d = e.getScene(s.uuid);
          if (d !== null) {
            const p = d.getObjectByProperty("uuid", s.uuid);
            p !== void 0 && (ee(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ u.jsx(
    xe,
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
class xr extends Ie {
  constructor(e, t) {
    const i = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new gt();
    n.setAttribute("position", new Ke(i, 3)), n.computeBoundingSphere();
    const r = new Fi({ fog: !1 });
    super(n, r), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const a = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new gt();
    o.setAttribute("position", new Ke(a, 3)), o.computeBoundingSphere(), this.add(new O(o, new Je({ side: Bs, fog: !1 })));
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
const bs = { type: "change" }, Hi = { type: "start" }, vn = { type: "end" }, Vt = new na(), Es = new aa(), Or = Math.cos(70 * ra.DEG2RAD), ae = new A(), ve = 2 * Math.PI, Y = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, vi = 1e-6;
class Tr extends an {
  constructor(e, t = null) {
    super(e, t), this.state = Y.NONE, this.enabled = !0, this.target = new A(), this.cursor = new A(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ft.ROTATE, MIDDLE: ft.DOLLY, RIGHT: ft.PAN }, this.touches = { ONE: mt.ROTATE, TWO: mt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new A(), this._lastQuaternion = new Ee(), this._lastTargetPosition = new A(), this._quat = new Ee().setFromUnitVectors(e.up, new A(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Pi(), this._sphericalDelta = new Pi(), this._scale = 1, this._panOffset = new A(), this._rotateStart = new ue(), this._rotateEnd = new ue(), this._rotateDelta = new ue(), this._panStart = new ue(), this._panEnd = new ue(), this._panDelta = new ue(), this._dollyStart = new ue(), this._dollyEnd = new ue(), this._dollyDelta = new ue(), this._dollyDirection = new A(), this._mouse = new ue(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Ar.bind(this), this._onPointerDown = Mr.bind(this), this._onPointerUp = Pr.bind(this), this._onContextMenu = jr.bind(this), this._onMouseWheel = Ir.bind(this), this._onKeyDown = Lr.bind(this), this._onTouchStart = kr.bind(this), this._onTouchMove = Ur.bind(this), this._onMouseDown = Dr.bind(this), this._onMouseMove = Rr.bind(this), this._interceptControlDown = Nr.bind(this), this._interceptControlUp = Fr.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(bs), this.update(), this.state = Y.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    ae.copy(t).sub(this.target), ae.applyQuaternion(this._quat), this._spherical.setFromVector3(ae), this.autoRotate && this.state === Y.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(i) && isFinite(n) && (i < -Math.PI ? i += ve : i > Math.PI && (i -= ve), n < -Math.PI ? n += ve : n > Math.PI && (n -= ve), i <= n ? this._spherical.theta = Math.max(i, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + n) / 2 ? Math.max(i, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (ae.setFromSpherical(this._spherical), ae.applyQuaternion(this._quatInverse), t.copy(this.target).add(ae), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = ae.length();
        a = this._clampDistance(o * this._scale);
        const c = o - a;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), r = !!c;
      } else if (this.object.isOrthographicCamera) {
        const o = new A(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = c !== this.object.zoom;
        const l = new A(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(o), this.object.updateMatrixWorld(), a = ae.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (Vt.origin.copy(this.object.position), Vt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Vt.direction)) < Or ? this.object.lookAt(this.target) : (Es.setFromNormalAndCoplanarPoint(this.object.up, this.target), Vt.intersectPlane(Es, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > vi || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > vi || this._lastTargetPosition.distanceToSquared(this.target) > vi ? (this.dispatchEvent(bs), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? ve / 60 * this.autoRotateSpeed * e : ve / 60 / 60 * this.autoRotateSpeed;
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
    ae.setFromMatrixColumn(t, 0), ae.multiplyScalar(-e), this._panOffset.add(ae);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? ae.setFromMatrixColumn(t, 1) : (ae.setFromMatrixColumn(t, 0), ae.crossVectors(this.object.up, ae)), ae.multiplyScalar(e), this._panOffset.add(ae);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      ae.copy(n).sub(this.target);
      let r = ae.length();
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
    this._rotateLeft(ve * this._rotateDelta.x / t.clientHeight), this._rotateUp(ve * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(ve * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-ve * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(ve * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-ve * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
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
    this._rotateLeft(ve * this._rotateDelta.x / t.clientHeight), this._rotateUp(ve * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    t === void 0 && (t = new ue(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function Mr(s) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(s) && (this._addPointer(s), s.pointerType === "touch" ? this._onTouchStart(s) : this._onMouseDown(s)));
}
function Ar(s) {
  this.enabled !== !1 && (s.pointerType === "touch" ? this._onTouchMove(s) : this._onMouseMove(s));
}
function Pr(s) {
  switch (this._removePointer(s), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(vn), this.state = Y.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Dr(s) {
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
    case ft.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(s), this.state = Y.DOLLY;
      break;
    case ft.ROTATE:
      if (s.ctrlKey || s.metaKey || s.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(s), this.state = Y.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(s), this.state = Y.ROTATE;
      }
      break;
    case ft.PAN:
      if (s.ctrlKey || s.metaKey || s.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(s), this.state = Y.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(s), this.state = Y.PAN;
      }
      break;
    default:
      this.state = Y.NONE;
  }
  this.state !== Y.NONE && this.dispatchEvent(Hi);
}
function Rr(s) {
  switch (this.state) {
    case Y.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(s);
      break;
    case Y.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(s);
      break;
    case Y.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(s);
      break;
  }
}
function Ir(s) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== Y.NONE || (s.preventDefault(), this.dispatchEvent(Hi), this._handleMouseWheel(this._customWheelEvent(s)), this.dispatchEvent(vn));
}
function Lr(s) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(s);
}
function kr(s) {
  switch (this._trackPointer(s), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case mt.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(s), this.state = Y.TOUCH_ROTATE;
          break;
        case mt.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(s), this.state = Y.TOUCH_PAN;
          break;
        default:
          this.state = Y.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case mt.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(s), this.state = Y.TOUCH_DOLLY_PAN;
          break;
        case mt.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(s), this.state = Y.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = Y.NONE;
      }
      break;
    default:
      this.state = Y.NONE;
  }
  this.state !== Y.NONE && this.dispatchEvent(Hi);
}
function Ur(s) {
  switch (this._trackPointer(s), this.state) {
    case Y.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(s), this.update();
      break;
    case Y.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(s), this.update();
      break;
    case Y.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(s), this.update();
      break;
    case Y.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(s), this.update();
      break;
    default:
      this.state = Y.NONE;
  }
}
function jr(s) {
  this.enabled !== !1 && s.preventDefault();
}
function Nr(s) {
  s.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Fr(s) {
  s.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const q = {
  LEFT: 1,
  RIGHT: 2,
  MIDDLE: 4
}, _ = Object.freeze({
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
}), lt = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function Ze(s) {
  return s.isPerspectiveCamera;
}
function Be(s) {
  return s.isOrthographicCamera;
}
const ct = Math.PI * 2, Cs = Math.PI / 2, yn = 1e-5, xt = Math.PI / 180;
function Te(s, e, t) {
  return Math.max(e, Math.min(t, s));
}
function X(s, e = yn) {
  return Math.abs(s) < e;
}
function H(s, e, t = yn) {
  return X(s - e, t);
}
function Ss(s, e) {
  return Math.round(s / e) * e;
}
function Ot(s) {
  return isFinite(s) ? s : s < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Tt(s) {
  return Math.abs(s) < Number.MAX_VALUE ? s : s * (1 / 0);
}
function Zt(s, e, t, i, n = 1 / 0, r) {
  i = Math.max(1e-4, i);
  const a = 2 / i, o = a * r, c = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let l = s - e;
  const d = e, p = n * i;
  l = Te(l, -p, p), e = s - l;
  const m = (t.value + a * l) * r;
  t.value = (t.value - a * m) * c;
  let g = e + (l + m) * c;
  return d - s > 0 == g > d && (g = d, t.value = (g - d) / r), g;
}
function ws(s, e, t, i, n = 1 / 0, r, a) {
  i = Math.max(1e-4, i);
  const o = 2 / i, c = o * r, l = 1 / (1 + c + 0.48 * c * c + 0.235 * c * c * c);
  let d = e.x, p = e.y, m = e.z, g = s.x - d, S = s.y - p, T = s.z - m;
  const M = d, f = p, v = m, E = n * i, b = E * E, C = g * g + S * S + T * T;
  if (C > b) {
    const G = Math.sqrt(C);
    g = g / G * E, S = S / G * E, T = T / G * E;
  }
  d = s.x - g, p = s.y - S, m = s.z - T;
  const w = (t.x + o * g) * r, I = (t.y + o * S) * r, U = (t.z + o * T) * r;
  t.x = (t.x - o * w) * l, t.y = (t.y - o * I) * l, t.z = (t.z - o * U) * l, a.x = d + (g + w) * l, a.y = p + (S + I) * l, a.z = m + (T + U) * l;
  const K = M - s.x, me = f - s.y, Ae = v - s.z, Ce = a.x - M, le = a.y - f, Q = a.z - v;
  return K * Ce + me * le + Ae * Q > 0 && (a.x = M, a.y = f, a.z = v, t.x = (a.x - M) / r, t.y = (a.y - f) / r, t.z = (a.z - v) / r), a;
}
function yi(s, e) {
  e.set(0, 0), s.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= s.length, e.y /= s.length;
}
function bi(s, e) {
  return Be(s) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class zr {
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
var Ei;
const Hr = "2.9.0", Wt = 1 / 8, Yr = /Mac/.test((Ei = globalThis?.navigator) === null || Ei === void 0 ? void 0 : Ei.platform);
let R, xs, Gt, Ci, ye, k, F, ht, Mt, Pe, De, We, Os, Ts, we, At, dt, Ms, Si, As, wi, xi, Xt;
class ke extends zr {
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
    R = e.THREE, xs = Object.freeze(new R.Vector3(0, 0, 0)), Gt = Object.freeze(new R.Vector3(0, 1, 0)), Ci = Object.freeze(new R.Vector3(0, 0, 1)), ye = new R.Vector2(), k = new R.Vector3(), F = new R.Vector3(), ht = new R.Vector3(), Mt = new R.Vector3(), Pe = new R.Vector3(), De = new R.Vector3(), We = new R.Vector3(), Os = new R.Vector3(), Ts = new R.Vector3(), we = new R.Spherical(), At = new R.Spherical(), dt = new R.Box3(), Ms = new R.Box3(), Si = new R.Sphere(), As = new R.Quaternion(), wi = new R.Quaternion(), xi = new R.Matrix4(), Xt = new R.Raycaster();
  }
  /**
   * list all ACTIONs
   * @category Statics
   */
  static get ACTION() {
    return _;
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
    }, this._enabled = !0, this._state = _.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = lt.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new R.Vector3(), this._focalOffsetVelocity = new R.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (f, v, E) => {
      let b, C;
      if (Ze(this._camera)) {
        const w = k.copy(this._camera.position).sub(this._target), I = this._camera.getEffectiveFOV() * xt, U = w.length() * Math.tan(I * 0.5);
        b = this.truckSpeed * f * U / this._elementRect.height, C = this.truckSpeed * v * U / this._elementRect.height;
      } else if (Be(this._camera)) {
        const w = this._camera;
        b = f * (w.right - w.left) / w.zoom / this._elementRect.width, C = v * (w.top - w.bottom) / w.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(b, 0, !0), this.forward(-C, !0)) : E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y + C, this._focalOffsetEnd.z, !0) : this.truck(b, C, !0);
    }, this._rotateInternal = (f, v) => {
      const E = ct * this.azimuthRotateSpeed * f / this._elementRect.height, b = ct * this.polarRotateSpeed * v / this._elementRect.height;
      this.rotate(E, b, !0);
    }, this._dollyInternal = (f, v, E) => {
      const b = Math.pow(0.95, -f * this.dollySpeed), C = this._sphericalEnd.radius, w = this._sphericalEnd.radius * b, I = Te(w, this.minDistance, this.maxDistance), U = I - w;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(w, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(U, !0), this._dollyToNoClamp(I, !0)) : this._dollyToNoClamp(I, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? w : I) - C, this._dollyControlCoord.set(v, E)), this._lastDollyDirection = Math.sign(-f);
    }, this._zoomInternal = (f, v, E) => {
      const b = Math.pow(0.95, f * this.dollySpeed), C = this._zoom, w = this._zoom * b;
      this.zoomTo(w, !0), this.dollyToCursor && (this._changedZoom += w - C, this._dollyControlCoord.set(v, E));
    }, typeof R > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new R.Quaternion().setFromUnitVectors(this._camera.up, Gt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = _.NONE, this._target = new R.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new R.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new R.Spherical().setFromVector3(k.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new R.Vector3(),
      new R.Vector3(),
      new R.Vector3(),
      new R.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new R.Box3(new R.Vector3(-1 / 0, -1 / 0, -1 / 0), new R.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new R.Vector2(), this.mouseButtons = {
      left: _.ROTATE,
      middle: _.DOLLY,
      right: _.TRUCK,
      wheel: Ze(this._camera) ? _.DOLLY : Be(this._camera) ? _.ZOOM : _.NONE
    }, this.touches = {
      one: _.TOUCH_ROTATE,
      two: Ze(this._camera) ? _.TOUCH_DOLLY_TRUCK : Be(this._camera) ? _.TOUCH_ZOOM_TRUCK : _.NONE,
      three: _.TOUCH_TRUCK
    };
    const i = new R.Vector2(), n = new R.Vector2(), r = new R.Vector2(), a = (f) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const b = this._domElement.getBoundingClientRect(), C = f.clientX / b.width, w = f.clientY / b.height;
        if (C < this._interactiveArea.left || C > this._interactiveArea.right || w < this._interactiveArea.top || w > this._interactiveArea.bottom)
          return;
      }
      const v = f.pointerType !== "mouse" ? null : (f.buttons & q.LEFT) === q.LEFT ? q.LEFT : (f.buttons & q.MIDDLE) === q.MIDDLE ? q.MIDDLE : (f.buttons & q.RIGHT) === q.RIGHT ? q.RIGHT : null;
      if (v !== null) {
        const b = this._findPointerByMouseButton(v);
        b && this._disposePointer(b);
      }
      if ((f.buttons & q.LEFT) === q.LEFT && this._lockedPointer)
        return;
      const E = {
        pointerId: f.pointerId,
        clientX: f.clientX,
        clientY: f.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: v
      };
      this._activePointers.push(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), this._isDragging = !0, m(f);
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (f.buttons & q.LEFT) === q.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (f.buttons & q.MIDDLE) === q.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (f.buttons & q.RIGHT) === q.RIGHT && (this._state = this._state | this.mouseButtons.right);
        g();
      }
    }, c = (f) => {
      const v = this._findPointerById(f.pointerId);
      if (!(v && v === this._lockedPointer)) {
        if (v && this._disposePointer(v), f.pointerType === "touch")
          switch (this._activePointers.length) {
            case 0:
              this._state = _.NONE;
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
          this._state = _.NONE;
        S();
      }
    };
    let l = -1;
    const d = (f) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === _.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const w = this._domElement.getBoundingClientRect(), I = f.clientX / w.width, U = f.clientY / w.height;
        if (I < this._interactiveArea.left || I > this._interactiveArea.right || U < this._interactiveArea.top || U > this._interactiveArea.bottom)
          return;
      }
      if (f.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === _.ROTATE || this.mouseButtons.wheel === _.TRUCK) {
        const w = performance.now();
        l - w < 1e3 && this._getClientRect(this._elementRect), l = w;
      }
      const v = Yr ? -1 : -3, E = f.deltaMode === 1 ? f.deltaY / v : f.deltaY / (v * 10), b = this.dollyToCursor ? (f.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, C = this.dollyToCursor ? (f.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case _.ROTATE: {
          this._rotateInternal(f.deltaX, f.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case _.TRUCK: {
          this._truckInternal(f.deltaX, f.deltaY, !1), this._isUserControllingTruck = !0;
          break;
        }
        case _.OFFSET: {
          this._truckInternal(f.deltaX, f.deltaY, !0), this._isUserControllingOffset = !0;
          break;
        }
        case _.DOLLY: {
          this._dollyInternal(-E, b, C), this._isUserControllingDolly = !0;
          break;
        }
        case _.ZOOM: {
          this._zoomInternal(-E, b, C), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, p = (f) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === ke.ACTION.NONE) {
          const v = f instanceof PointerEvent ? f.pointerId : 0, E = this._findPointerById(v);
          E && this._disposePointer(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c);
          return;
        }
        f.preventDefault();
      }
    }, m = (f) => {
      if (!this._enabled)
        return;
      if (yi(this._activePointers, ye), this._getClientRect(this._elementRect), i.copy(ye), n.copy(ye), this._activePointers.length >= 2) {
        const E = ye.x - this._activePointers[1].clientX, b = ye.y - this._activePointers[1].clientY, C = Math.sqrt(E * E + b * b);
        r.set(0, C);
        const w = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, I = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(w, I);
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
        !this._lockedPointer && (f.buttons & q.LEFT) === q.LEFT && (this._state = this._state | this.mouseButtons.left), (f.buttons & q.MIDDLE) === q.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (f.buttons & q.RIGHT) === q.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & _.ROTATE) === _.ROTATE || (this._state & _.TOUCH_ROTATE) === _.TOUCH_ROTATE || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & _.TRUCK) === _.TRUCK || (this._state & _.TOUCH_TRUCK) === _.TOUCH_TRUCK || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & _.DOLLY) === _.DOLLY || (this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & _.ZOOM) === _.ZOOM || (this._state & _.TOUCH_ZOOM) === _.TOUCH_ZOOM || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & _.OFFSET) === _.OFFSET || (this._state & _.TOUCH_OFFSET) === _.TOUCH_OFFSET || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, g = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, yi(this._activePointers, ye);
      const v = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, E = v ? -v.deltaX : n.x - ye.x, b = v ? -v.deltaY : n.y - ye.y;
      if (n.copy(ye), ((this._state & _.ROTATE) === _.ROTATE || (this._state & _.TOUCH_ROTATE) === _.TOUCH_ROTATE || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(E, b), this._isUserControllingRotate = !0), (this._state & _.DOLLY) === _.DOLLY || (this._state & _.ZOOM) === _.ZOOM) {
        const C = this.dollyToCursor ? (i.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, w = this.dollyToCursor ? (i.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, I = this.dollyDragInverted ? -1 : 1;
        (this._state & _.DOLLY) === _.DOLLY ? (this._dollyInternal(I * b * Wt, C, w), this._isUserControllingDolly = !0) : (this._zoomInternal(I * b * Wt, C, w), this._isUserControllingZoom = !0);
      }
      if ((this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_ZOOM) === _.TOUCH_ZOOM || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) {
        const C = ye.x - this._activePointers[1].clientX, w = ye.y - this._activePointers[1].clientY, I = Math.sqrt(C * C + w * w), U = r.y - I;
        r.set(0, I);
        const K = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, me = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(U * Wt, K, me), this._isUserControllingDolly = !0) : (this._zoomInternal(U * Wt, K, me), this._isUserControllingZoom = !0);
      }
      ((this._state & _.TRUCK) === _.TRUCK || (this._state & _.TOUCH_TRUCK) === _.TOUCH_TRUCK || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK) && (this._truckInternal(E, b, !1), this._isUserControllingTruck = !0), ((this._state & _.OFFSET) === _.OFFSET || (this._state & _.TOUCH_OFFSET) === _.TOUCH_OFFSET || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET) && (this._truckInternal(E, b, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, S = () => {
      yi(this._activePointers, ye), n.copy(ye), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", T), this._domElement.ownerDocument.addEventListener("pointerlockerror", M), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), m());
    }, this.unlockPointer = () => {
      var f, v, E;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (f = this._domElement) === null || f === void 0 || f.ownerDocument.exitPointerLock(), (v = this._domElement) === null || v === void 0 || v.ownerDocument.removeEventListener("pointerlockchange", T), (E = this._domElement) === null || E === void 0 || E.ownerDocument.removeEventListener("pointerlockerror", M), this.cancel();
    };
    const T = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, M = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (f) => {
      this._domElement = f, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", a), this._domElement.addEventListener("pointercancel", c), this._domElement.addEventListener("wheel", d, { passive: !1 }), this._domElement.addEventListener("contextmenu", p);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", a), this._domElement.removeEventListener("pointercancel", c), this._domElement.removeEventListener("wheel", d, { passive: !1 }), this._domElement.removeEventListener("contextmenu", p), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.removeEventListener("pointerlockchange", T), this._domElement.ownerDocument.removeEventListener("pointerlockerror", M));
    }, this.cancel = () => {
      this._state !== _.NONE && (this._state = _.NONE, this._activePointers.length = 0, S());
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
    this._interactiveArea.width = Te(e.width, 0, 1), this._interactiveArea.height = Te(e.height, 0, 1), this._interactiveArea.x = Te(e.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = Te(e.y, 0, 1 - this._interactiveArea.height);
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
    const n = Te(e, this.minAzimuthAngle, this.maxAzimuthAngle), r = Te(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = r, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, i || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const a = !i || H(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && H(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
    return this._isUserControllingDolly = !1, this._lastDollyDirection = lt.NONE, this._changedDolly = 0, this._dollyToNoClamp(Te(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const i = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const a = this._collisionTest(), o = H(a, this._spherical.radius);
      if (!(i > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, a);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const r = !t || H(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    this._targetEnd.add(this._getCameraDirection(Mt).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
    const i = !t || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold);
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
    this._isUserControllingZoom = !1, this._zoomEnd = Te(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, t || (this._zoom = this._zoomEnd);
    const i = !t || H(this._zoom, this._zoomEnd, this.restThreshold);
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
    this._camera.updateMatrix(), Pe.setFromMatrixColumn(this._camera.matrix, 0), De.setFromMatrixColumn(this._camera.matrix, 1), Pe.multiplyScalar(e), De.multiplyScalar(-t);
    const n = k.copy(Pe).add(De), r = F.copy(this._targetEnd).add(n);
    return this.moveTo(r.x, r.y, r.z, i);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    k.setFromMatrixColumn(this._camera.matrix, 0), k.crossVectors(this._camera.up, k), k.multiplyScalar(e);
    const i = F.copy(this._targetEnd).add(k);
    return this.moveTo(i.x, i.y, i.z, t);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, t = !1) {
    return k.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + k.x, this._targetEnd.y + k.y, this._targetEnd.z + k.z, t);
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
    const r = k.set(e, t, i).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, r, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const a = !n || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold);
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
    const o = k.set(e, t, i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
    const c = [], l = e.isBox3 ? dt.copy(e) : dt.setFromObject(e);
    l.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const d = Ss(this._sphericalEnd.theta, Cs), p = Ss(this._sphericalEnd.phi, Cs);
    c.push(this.rotateTo(d, p, t));
    const m = k.setFromSpherical(this._sphericalEnd).normalize(), g = As.setFromUnitVectors(m, Ci), S = H(Math.abs(m.y), 1);
    S && g.multiply(wi.setFromAxisAngle(Gt, d)), g.multiply(this._yAxisUpSpaceInverse);
    const T = Ms.makeEmpty();
    F.copy(l.min).applyQuaternion(g), T.expandByPoint(F), F.copy(l.min).setX(l.max.x).applyQuaternion(g), T.expandByPoint(F), F.copy(l.min).setY(l.max.y).applyQuaternion(g), T.expandByPoint(F), F.copy(l.max).setZ(l.min.z).applyQuaternion(g), T.expandByPoint(F), F.copy(l.min).setZ(l.max.z).applyQuaternion(g), T.expandByPoint(F), F.copy(l.max).setY(l.min.y).applyQuaternion(g), T.expandByPoint(F), F.copy(l.max).setX(l.min.x).applyQuaternion(g), T.expandByPoint(F), F.copy(l.max).applyQuaternion(g), T.expandByPoint(F), T.min.x -= n, T.min.y -= a, T.max.x += r, T.max.y += o, g.setFromUnitVectors(Ci, m), S && g.premultiply(wi.invert()), g.premultiply(this._yAxisUpSpace);
    const M = T.getSize(k), f = T.getCenter(F).applyQuaternion(g);
    if (Ze(this._camera)) {
      const v = this.getDistanceToFitBox(M.x, M.y, M.z, i);
      c.push(this.moveTo(f.x, f.y, f.z, t)), c.push(this.dollyTo(v, t)), c.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Be(this._camera)) {
      const v = this._camera, E = v.right - v.left, b = v.top - v.bottom, C = i ? Math.max(E / M.x, b / M.y) : Math.min(E / M.x, b / M.y);
      c.push(this.moveTo(f.x, f.y, f.z, t)), c.push(this.zoomTo(C, t)), c.push(this.setFocalOffset(0, 0, 0, t));
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
    const i = [], r = "isObject3D" in e ? ke.createBoundingSphere(e, Si) : Si.copy(e);
    if (i.push(this.moveTo(r.center.x, r.center.y, r.center.z, t)), Ze(this._camera)) {
      const a = this.getDistanceToFitSphere(r.radius);
      i.push(this.dollyTo(a, t));
    } else if (Be(this._camera)) {
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
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = lt.NONE, this._changedDolly = 0;
    const c = F.set(n, r, a), l = k.set(e, t, i);
    this._targetEnd.copy(c), this._sphericalEnd.setFromVector3(l.sub(c).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const d = !o || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold) && H(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && H(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && H(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(d);
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
  lerpLookAt(e, t, i, n, r, a, o, c, l, d, p, m, g, S = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = lt.NONE, this._changedDolly = 0;
    const T = k.set(n, r, a), M = F.set(e, t, i);
    we.setFromVector3(M.sub(T).applyQuaternion(this._yAxisUpSpace));
    const f = ht.set(d, p, m), v = F.set(o, c, l);
    At.setFromVector3(v.sub(f).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(T.lerp(f, g));
    const E = At.theta - we.theta, b = At.phi - we.phi, C = At.radius - we.radius;
    this._sphericalEnd.set(we.radius + C * g, we.phi + b * g, we.theta + E * g), this.normalizeRotations(), this._needsUpdate = !0, S || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const w = !S || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold) && H(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && H(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && H(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(w);
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
    const r = this.getPosition(k), a = this.setLookAt(r.x, r.y, r.z, e, t, i, n);
    return this._sphericalEnd.phi = Te(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), a;
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
    const r = !n || H(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && H(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && H(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
    this._camera.updateMatrixWorld(), Pe.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), De.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), We.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = k.set(e, t, i), r = n.distanceTo(this._camera.position), a = n.sub(this._camera.position);
    Pe.multiplyScalar(a.x), De.multiplyScalar(a.y), We.multiplyScalar(a.z), k.copy(Pe).add(De).add(We), k.z = k.z + r, this.dollyTo(r, !1), this.setFocalOffset(-k.x, k.y, -k.z, !1), this.moveTo(e, t, i, !1);
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
    if (bi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const r = e / t, a = this._camera.getEffectiveFOV() * xt, o = this._camera.aspect;
    return ((n ? r > o : r < o) ? t : e / o) * 0.5 / Math.tan(a * 0.5) + i * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (bi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * xt, i = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : i;
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
    this._sphericalEnd.theta = this._sphericalEnd.theta % ct, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += ct), this._spherical.theta += ct * Math.round((this._sphericalEnd.theta - this._spherical.theta) / ct);
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
    if (!H(this._camera.up.x, this._cameraUp0.x) || !H(this._camera.up.y, this._cameraUp0.y) || !H(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const i = this.getPosition(k);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, Gt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = k.subVectors(this._target, this._camera.position).normalize(), t = F.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const i = this.getPosition(k);
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
    const t = this._sphericalEnd.theta - this._spherical.theta, i = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, r = Os.subVectors(this._targetEnd, this._target), a = Ts.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (X(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Zt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (X(i))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Zt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (X(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const p = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Zt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, p, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (X(r.x) && X(r.y) && X(r.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const p = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      ws(this._target, this._targetEnd, this._targetVelocity, p, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (X(a.x) && X(a.y) && X(a.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const p = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      ws(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, p, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (X(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const p = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Zt(this._zoom, this._zoomEnd, this._zoomVelocity, p, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (Ze(this._camera) && this._changedDolly !== 0) {
        const p = this._spherical.radius - this._lastDistance, m = this._camera, g = this._getCameraDirection(Mt), S = k.copy(g).cross(m.up).normalize();
        S.lengthSq() === 0 && (S.x = 1);
        const T = F.crossVectors(S, g), M = this._sphericalEnd.radius * Math.tan(m.getEffectiveFOV() * xt * 0.5), v = (this._sphericalEnd.radius - p - this._sphericalEnd.radius) / this._sphericalEnd.radius, E = ht.copy(this._targetEnd).add(S.multiplyScalar(this._dollyControlCoord.x * M * m.aspect)).add(T.multiplyScalar(this._dollyControlCoord.y * M)), b = k.copy(this._targetEnd).lerp(E, v), C = this._lastDollyDirection === lt.IN && this._spherical.radius <= this.minDistance, w = this._lastDollyDirection === lt.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (C || w)) {
          this._sphericalEnd.radius -= p, this._spherical.radius -= p;
          const U = F.copy(g).multiplyScalar(-p);
          b.add(U);
        }
        this._boundary.clampPoint(b, b);
        const I = F.subVectors(b, this._targetEnd);
        this._targetEnd.copy(b), this._target.add(I), this._changedDolly -= p, X(this._changedDolly) && (this._changedDolly = 0);
      } else if (Be(this._camera) && this._changedZoom !== 0) {
        const p = this._zoom - this._lastZoom, m = this._camera, g = k.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (m.near + m.far) / (m.near - m.far)).unproject(m), S = F.set(0, 0, -1).applyQuaternion(m.quaternion), T = ht.copy(g).add(S.multiplyScalar(-g.dot(m.up))), f = -(this._zoom - p - this._zoom) / this._zoom, v = this._getCameraDirection(Mt), E = this._targetEnd.dot(v), b = k.copy(this._targetEnd).lerp(T, f), C = b.dot(v), w = v.multiplyScalar(C - E);
        b.sub(w), this._boundary.clampPoint(b, b);
        const I = F.subVectors(b, this._targetEnd);
        this._targetEnd.copy(b), this._target.add(I), this._changedZoom -= p, X(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const c = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, c), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!X(this._focalOffset.x) || !X(this._focalOffset.y) || !X(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Pe.setFromMatrixColumn(this._camera.matrix, 0), De.setFromMatrixColumn(this._camera.matrix, 1), We.setFromMatrixColumn(this._camera.matrix, 2), Pe.multiplyScalar(this._focalOffset.x), De.multiplyScalar(-this._focalOffset.y), We.multiplyScalar(this._focalOffset.z), k.copy(Pe).add(De).add(We), this._camera.position.add(k)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), k.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const d = this._needsUpdate;
    return d && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : d ? (this.dispatchEvent({ type: "update" }), X(t, this.restThreshold) && X(i, this.restThreshold) && X(n, this.restThreshold) && X(r.x, this.restThreshold) && X(r.y, this.restThreshold) && X(r.z, this.restThreshold) && X(a.x, this.restThreshold) && X(a.y, this.restThreshold) && X(a.z, this.restThreshold) && X(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !d && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = d, this._needsUpdate = !1, d;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: Ot(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: Ot(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: Ot(this.maxPolarAngle),
      minAzimuthAngle: Ot(this.minAzimuthAngle),
      maxAzimuthAngle: Ot(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      verticalDragToForward: this.verticalDragToForward,
      target: this._targetEnd.toArray(),
      position: k.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
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
    this.enabled = i.enabled, this.minDistance = i.minDistance, this.maxDistance = Tt(i.maxDistance), this.minZoom = i.minZoom, this.maxZoom = Tt(i.maxZoom), this.minPolarAngle = i.minPolarAngle, this.maxPolarAngle = Tt(i.maxPolarAngle), this.minAzimuthAngle = Tt(i.minAzimuthAngle), this.maxAzimuthAngle = Tt(i.maxAzimuthAngle), this.smoothTime = i.smoothTime, this.draggingSmoothTime = i.draggingSmoothTime, this.dollySpeed = i.dollySpeed, this.truckSpeed = i.truckSpeed, this.dollyToCursor = i.dollyToCursor, this.verticalDragToForward = i.verticalDragToForward, this._target0.fromArray(i.target0), this._position0.fromArray(i.position0), this._zoom0 = i.zoom0, this._focalOffset0.fromArray(i.focalOffset0), this.moveTo(i.target[0], i.target[1], i.target[2], t), we.setFromVector3(k.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(we.theta, we.phi, t), this.dollyTo(we.radius, t), this.zoomTo(i.zoom, t), this.setFocalOffset(i.focalOffset[0], i.focalOffset[1], i.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", Hr), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const r = F.copy(t).add(e), o = this._boundary.clampPoint(r, ht).sub(r), c = o.lengthSq();
    if (c === 0)
      return e.add(t);
    if (c === n)
      return e;
    if (i === 0)
      return e.add(t).add(o);
    {
      const l = 1 + i * c / t.dot(o);
      return e.add(F.copy(t).multiplyScalar(l)).add(o.multiplyScalar(1 - i));
    }
  }
  _updateNearPlaneCorners() {
    if (Ze(this._camera)) {
      const e = this._camera, t = e.near, i = e.getEffectiveFOV() * xt, n = Math.tan(i * 0.5) * t, r = n * e.aspect;
      this._nearPlaneCorners[0].set(-r, -n, 0), this._nearPlaneCorners[1].set(r, -n, 0), this._nearPlaneCorners[2].set(r, n, 0), this._nearPlaneCorners[3].set(-r, n, 0);
    } else if (Be(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, i = e.left * t, n = e.right * t, r = e.top * t, a = e.bottom * t;
      this._nearPlaneCorners[0].set(i, r, 0), this._nearPlaneCorners[1].set(n, r, 0), this._nearPlaneCorners[2].set(n, a, 0), this._nearPlaneCorners[3].set(i, a, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || bi(this._camera, "_collisionTest"))
      return e;
    const i = this._getTargetDirection(Mt);
    xi.lookAt(xs, i, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const r = F.copy(this._nearPlaneCorners[n]);
      r.applyMatrix4(xi);
      const a = ht.addVectors(this._target, r);
      Xt.set(a, i), Xt.far = this._spherical.radius + 1;
      const o = Xt.intersectObjects(this.colliderMeshes);
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
    dt.makeEmpty(), e.traverseVisible((a) => {
      a.isMesh && dt.expandByObject(a);
    }), dt.getCenter(n);
    let r = 0;
    return e.traverseVisible((a) => {
      if (!a.isMesh)
        return;
      const o = a, c = o.geometry.clone();
      c.applyMatrix4(o.matrixWorld);
      const d = c.attributes.position;
      for (let p = 0, m = d.count; p < m; p++)
        k.fromBufferAttribute(d, p), r = Math.max(r, n.distanceToSquared(k));
    }), i.radius = Math.sqrt(r), i;
  }
}
const ai = (s) => {
  const [e, t] = B(s.options[s.index]), i = () => {
    s.onToggle(!s.open);
  }, n = (r) => {
    r !== e && (s.onSelect(r), t(r)), s.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${s.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: i, children: `${s.title}: ${e}` }),
    s.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: s.options.map((r) => /* @__PURE__ */ u.jsx("li", { onClick: () => n(r), children: r }, r)) })
  ] });
}, Ge = Da(function(e, t) {
  const i = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, r] = B("Renderer"), [a, o] = B(!1), [c, l] = B(!1), [d, p] = B(!1);
  return /* @__PURE__ */ u.jsxs("div", { className: `CameraWindow ${e.name}`, children: [
    /* @__PURE__ */ u.jsx("div", { ref: t, className: "clickable", onClick: () => {
      d && p(!1);
    } }),
    /* @__PURE__ */ u.jsxs("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ u.jsx(
        ai,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: d,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (m) => {
            p(m);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        ai,
        {
          title: "Mode",
          index: i.indexOf(n),
          open: c,
          options: i,
          onSelect: (m) => {
            if (m === n)
              return;
            const g = m;
            e.onSelectRenderMode(g), r(g);
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
class Br extends rn {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: oa,
      side: Ni,
      transparent: !0,
      uniforms: {
        uScale: {
          value: e?.scale !== void 0 ? e?.scale : 0.1
        },
        uDivisions: {
          value: e?.divisions !== void 0 ? e?.divisions : 10
        },
        uColor: {
          value: e?.color !== void 0 ? e?.color : new et(16777215)
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
class Vr extends O {
  gridMaterial;
  constructor() {
    const e = new Br();
    super(new on(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
function Ps(s) {
  const [e, t] = B(s.selected), i = "toggle" + (e ? " selected" : "");
  return /* @__PURE__ */ u.jsx(
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
const Zr = `#include <common>
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
}`, Wr = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Gr extends rn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: Zr,
      fragmentShader: Wr
    });
  }
}
const Xe = new ii(), de = new A(), Ye = new A(), $ = new Ee(), Ds = {
  X: new A(1, 0, 0),
  Y: new A(0, 1, 0),
  Z: new A(0, 0, 1)
}, Oi = { type: "change" }, Rs = { type: "mouseDown", mode: null }, Is = { type: "mouseUp", mode: null }, Ls = { type: "objectChange" };
class Xr extends an {
  constructor(e, t = null) {
    super(void 0, t);
    const i = new eo(this);
    this._root = i;
    const n = new to();
    this._gizmo = n, i.add(n);
    const r = new io();
    this._plane = r, i.add(r);
    const a = this;
    function o(E, b) {
      let C = b;
      Object.defineProperty(a, E, {
        get: function() {
          return C !== void 0 ? C : b;
        },
        set: function(w) {
          C !== w && (C = w, r[E] = w, n[E] = w, a.dispatchEvent({ type: E + "-changed", value: w }), a.dispatchEvent(Oi));
        }
      }), a[E] = b, r[E] = b, n[E] = b;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const c = new A(), l = new A(), d = new Ee(), p = new Ee(), m = new A(), g = new Ee(), S = new A(), T = new A(), M = new A(), f = 0, v = new A();
    o("worldPosition", c), o("worldPositionStart", l), o("worldQuaternion", d), o("worldQuaternionStart", p), o("cameraPosition", m), o("cameraQuaternion", g), o("pointStart", S), o("pointEnd", T), o("rotationAxis", M), o("rotationAngle", f), o("eye", v), this._offset = new A(), this._startNorm = new A(), this._endNorm = new A(), this._cameraScale = new A(), this._parentPosition = new A(), this._parentQuaternion = new Ee(), this._parentQuaternionInv = new Ee(), this._parentScale = new A(), this._worldScaleStart = new A(), this._worldQuaternionInv = new Ee(), this._worldScale = new A(), this._positionStart = new A(), this._quaternionStart = new Ee(), this._scaleStart = new A(), this._getPointer = $r.bind(this), this._onPointerDown = Kr.bind(this), this._onPointerHover = qr.bind(this), this._onPointerMove = Qr.bind(this), this._onPointerUp = Jr.bind(this), t !== null && this.connect();
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
    e !== null && Xe.setFromCamera(e, this.camera);
    const t = Ti(this._gizmo.picker[this.mode], Xe);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && Xe.setFromCamera(e, this.camera);
      const t = Ti(this._plane, Xe, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, Rs.mode = this.mode, this.dispatchEvent(Rs);
    }
  }
  pointerMove(e) {
    const t = this.axis, i = this.mode, n = this.object;
    let r = this.space;
    if (i === "scale" ? r = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (r = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && Xe.setFromCamera(e, this.camera);
    const a = Ti(this._plane, Xe, !0);
    if (a) {
      if (this.pointEnd.copy(a.point).sub(this.worldPositionStart), i === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (n.position.applyQuaternion($.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), r === "world" && (n.parent && n.position.add(de.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(de.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (i === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), Ye.set(o, o, o);
        } else
          de.copy(this.pointStart), Ye.copy(this.pointEnd), de.applyQuaternion(this._worldQuaternionInv), Ye.applyQuaternion(this._worldQuaternionInv), Ye.divide(de), t.search("X") === -1 && (Ye.x = 1), t.search("Y") === -1 && (Ye.y = 1), t.search("Z") === -1 && (Ye.z = 1);
        n.scale.copy(this._scaleStart).multiply(Ye), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (i === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(de.setFromMatrixPosition(this.camera.matrixWorld));
        let c = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(de.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(Ds[t]), de.copy(Ds[t]), r === "local" && de.applyQuaternion(this.worldQuaternion), de.cross(this.eye), de.length() === 0 ? c = !0 : this.rotationAngle = this._offset.dot(de.normalize()) * o), (t === "E" || c) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply($.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy($.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(Oi), this.dispatchEvent(Ls);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (Is.mode = this.mode, this.dispatchEvent(Is)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(Oi), this.dispatchEvent(Ls), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return Xe;
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
function $r(s) {
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
function qr(s) {
  if (this.enabled)
    switch (s.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(s));
        break;
    }
}
function Kr(s) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(s)), this.pointerDown(this._getPointer(s)));
}
function Qr(s) {
  this.enabled && this.pointerMove(this._getPointer(s));
}
function Jr(s) {
  this.enabled && (this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(s)));
}
function Ti(s, e, t) {
  const i = e.intersectObject(s, !0);
  for (let n = 0; n < i.length; n++)
    if (i[n].object.visible || t)
      return i[n];
  return !1;
}
const $t = new ln(), W = new A(0, 1, 0), ks = new A(0, 0, 0), Us = new ri(), qt = new Ee(), ti = new Ee(), Re = new A(), js = new ri(), It = new A(1, 0, 0), qe = new A(0, 1, 0), Lt = new A(0, 0, 1), Kt = new A(), Pt = new A(), Dt = new A();
class eo extends _t {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class to extends _t {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new Je({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Fi({
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
    const d = e.clone();
    d.color.setHex(255), d.opacity = 0.5;
    const p = e.clone();
    p.opacity = 0.25;
    const m = e.clone();
    m.color.setHex(16776960), m.opacity = 0.25, e.clone().color.setHex(16776960);
    const S = e.clone();
    S.color.setHex(7895160);
    const T = new _e(0, 0.04, 0.1, 12);
    T.translate(0, 0.05, 0);
    const M = new he(0.08, 0.08, 0.08);
    M.translate(0, 0.04, 0);
    const f = new gt();
    f.setAttribute("position", new Ke([0, 0, 0, 1, 0, 0], 3));
    const v = new _e(75e-4, 75e-4, 0.5, 3);
    v.translate(0, 0.25, 0);
    function E(G, Ue) {
      const ce = new bt(G, 75e-4, 3, 64, Ue * Math.PI * 2);
      return ce.rotateY(Math.PI / 2), ce.rotateX(Math.PI / 2), ce;
    }
    function b() {
      const G = new gt();
      return G.setAttribute("position", new Ke([0, 0, 0, 1, 1, 1], 3)), G;
    }
    const C = {
      X: [
        [new O(T, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new O(T, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new O(v, r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new O(T, a), [0, 0.5, 0]],
        [new O(T, a), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new O(v, a)]
      ],
      Z: [
        [new O(T, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new O(T, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new O(v, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new O(new Bt(0.1, 0), p.clone()), [0, 0, 0]]
      ],
      XY: [
        [new O(new he(0.15, 0.15, 0.01), d.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new O(new he(0.15, 0.15, 0.01), c.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new O(new he(0.15, 0.15, 0.01), l.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, w = {
      X: [
        [new O(new _e(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new O(new _e(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new O(new Bt(0.2, 0), i)]
      ],
      XY: [
        [new O(new he(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new O(new he(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new O(new he(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, I = {
      START: [
        [new O(new Bt(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new O(new Bt(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new Ie(b(), n), null, null, null, "helper"]
      ],
      X: [
        [new Ie(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Ie(f, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Ie(f, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, U = {
      XYZE: [
        [new O(E(0.5, 1), S), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new O(E(0.5, 0.5), r)]
      ],
      Y: [
        [new O(E(0.5, 0.5), a), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new O(E(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new O(E(0.75, 1), m), null, [0, Math.PI / 2, 0]]
      ]
    }, K = {
      AXIS: [
        [new Ie(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, me = {
      XYZE: [
        [new O(new cn(0.25, 10, 8), i)]
      ],
      X: [
        [new O(new bt(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new O(new bt(0.5, 0.1, 4, 24), i), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new O(new bt(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new O(new bt(0.75, 0.1, 2, 24), i)]
      ]
    }, Ae = {
      X: [
        [new O(M, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new O(v, r), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new O(M, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new O(M, a), [0, 0.5, 0]],
        [new O(v, a)],
        [new O(M, a), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new O(M, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new O(v, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new O(M, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new O(new he(0.15, 0.15, 0.01), d), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new O(new he(0.15, 0.15, 0.01), c), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new O(new he(0.15, 0.15, 0.01), l), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new O(new he(0.1, 0.1, 0.1), p.clone())]
      ]
    }, Ce = {
      X: [
        [new O(new _e(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new O(new _e(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new O(new _e(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new O(new he(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new O(new he(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new O(new he(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new O(new he(0.2, 0.2, 0.2), i), [0, 0, 0]]
      ]
    }, le = {
      X: [
        [new Ie(f, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Ie(f, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Ie(f, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function Q(G) {
      const Ue = new _t();
      for (const ce in G)
        for (let be = G[ce].length; be--; ) {
          const te = G[ce][be][0].clone(), je = G[ce][be][1], Ne = G[ce][be][2], Fe = G[ce][be][3], V = G[ce][be][4];
          te.name = ce, te.tag = V, je && te.position.set(je[0], je[1], je[2]), Ne && te.rotation.set(Ne[0], Ne[1], Ne[2]), Fe && te.scale.set(Fe[0], Fe[1], Fe[2]), te.updateMatrix();
          const re = te.geometry.clone();
          re.applyMatrix4(te.matrix), te.geometry = re, te.renderOrder = 1 / 0, te.position.set(0, 0, 0), te.rotation.set(0, 0, 0), te.scale.set(1, 1, 1), Ue.add(te);
        }
      return Ue;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = Q(C)), this.add(this.gizmo.rotate = Q(U)), this.add(this.gizmo.scale = Q(Ae)), this.add(this.picker.translate = Q(w)), this.add(this.picker.rotate = Q(me)), this.add(this.picker.scale = Q(Ce)), this.add(this.helper.translate = Q(I)), this.add(this.helper.rotate = Q(K)), this.add(this.helper.scale = Q(le)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const i = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : ti;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      a.visible = !0, a.rotation.set(0, 0, 0), a.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), a.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), a.tag === "helper") {
        a.visible = !1, a.name === "AXIS" ? (a.visible = !!this.axis, this.axis === "X" && ($.setFromEuler($t.set(0, 0, 0)), a.quaternion.copy(i).multiply($), Math.abs(W.copy(It).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Y" && ($.setFromEuler($t.set(0, 0, Math.PI / 2)), a.quaternion.copy(i).multiply($), Math.abs(W.copy(qe).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Z" && ($.setFromEuler($t.set(0, Math.PI / 2, 0)), a.quaternion.copy(i).multiply($), Math.abs(W.copy(Lt).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "XYZE" && ($.setFromEuler($t.set(0, Math.PI / 2, 0)), W.copy(this.rotationAxis), a.quaternion.setFromRotationMatrix(Us.lookAt(ks, W, qe)), a.quaternion.multiply($), a.visible = this.dragging), this.axis === "E" && (a.visible = !1)) : a.name === "START" ? (a.position.copy(this.worldPositionStart), a.visible = this.dragging) : a.name === "END" ? (a.position.copy(this.worldPosition), a.visible = this.dragging) : a.name === "DELTA" ? (a.position.copy(this.worldPositionStart), a.quaternion.copy(this.worldQuaternionStart), de.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), de.applyQuaternion(this.worldQuaternionStart.clone().invert()), a.scale.copy(de), a.visible = this.dragging) : (a.quaternion.copy(i), this.dragging ? a.position.copy(this.worldPositionStart) : a.position.copy(this.worldPosition), this.axis && (a.visible = this.axis.search(a.name) !== -1));
        continue;
      }
      a.quaternion.copy(i), this.mode === "translate" || this.mode === "scale" ? (a.name === "X" && Math.abs(W.copy(It).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Y" && Math.abs(W.copy(qe).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Z" && Math.abs(W.copy(Lt).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XY" && Math.abs(W.copy(Lt).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "YZ" && Math.abs(W.copy(It).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XZ" && Math.abs(W.copy(qe).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1)) : this.mode === "rotate" && (qt.copy(i), W.copy(this.eye).applyQuaternion($.copy(i).invert()), a.name.search("E") !== -1 && a.quaternion.setFromRotationMatrix(Us.lookAt(this.eye, ks, qe)), a.name === "X" && ($.setFromAxisAngle(It, Math.atan2(-W.y, W.z)), $.multiplyQuaternions(qt, $), a.quaternion.copy($)), a.name === "Y" && ($.setFromAxisAngle(qe, Math.atan2(W.x, W.z)), $.multiplyQuaternions(qt, $), a.quaternion.copy($)), a.name === "Z" && ($.setFromAxisAngle(Lt, Math.atan2(W.y, W.x)), $.multiplyQuaternions(qt, $), a.quaternion.copy($))), a.visible = a.visible && (a.name.indexOf("X") === -1 || this.showX), a.visible = a.visible && (a.name.indexOf("Y") === -1 || this.showY), a.visible = a.visible && (a.name.indexOf("Z") === -1 || this.showZ), a.visible = a.visible && (a.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), a.material._color = a.material._color || a.material.color.clone(), a.material._opacity = a.material._opacity || a.material.opacity, a.material.color.copy(a.material._color), a.material.opacity = a.material._opacity, this.enabled && this.axis && (a.name === this.axis || this.axis.split("").some(function(c) {
        return a.name === c;
      })) && (a.material.color.setHex(16776960), a.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class io extends O {
  constructor() {
    super(
      new on(1e5, 1e5, 2, 2),
      new Je({ visible: !1, wireframe: !0, side: Ni, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), Kt.copy(It).applyQuaternion(t === "local" ? this.worldQuaternion : ti), Pt.copy(qe).applyQuaternion(t === "local" ? this.worldQuaternion : ti), Dt.copy(Lt).applyQuaternion(t === "local" ? this.worldQuaternion : ti), W.copy(Pt), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            W.copy(this.eye).cross(Kt), Re.copy(Kt).cross(W);
            break;
          case "Y":
            W.copy(this.eye).cross(Pt), Re.copy(Pt).cross(W);
            break;
          case "Z":
            W.copy(this.eye).cross(Dt), Re.copy(Dt).cross(W);
            break;
          case "XY":
            Re.copy(Dt);
            break;
          case "YZ":
            Re.copy(Kt);
            break;
          case "XZ":
            W.copy(Dt), Re.copy(Pt);
            break;
          case "XYZ":
          case "E":
            Re.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        Re.set(0, 0, 0);
    }
    Re.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (js.lookAt(de.set(0, 0, 0), Re, W), this.quaternion.setFromRotationMatrix(js)), super.updateMatrixWorld(e);
  }
}
class ge extends Ys {
  static DRAG_START = "Transform::dragStart";
  static DRAG_END = "Transform::dragEnd";
  static _instance;
  three;
  activeCamera;
  controls = /* @__PURE__ */ new Map();
  visibility = /* @__PURE__ */ new Map();
  constructor() {
    super(), D.addEventListener(P.SET_SCENE, this.setScene);
  }
  clear() {
    for (const e of this.controls.values()) {
      e.detach(), e.disconnect();
      const t = e.getHelper();
      He(t);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(e) {
    let t = this.controls.get(e);
    if (t === void 0) {
      const i = document.querySelector(".clickable");
      t = new Xr(this.activeCamera, i), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: ge.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: ge.DRAG_END });
      }), t.addEventListener("dragging-changed", (n) => {
        pe.instance?.toggleOrbitControls(n.value);
      });
    }
    return t;
  }
  get(e) {
    return this.controls.get(e);
  }
  remove(e) {
    const t = this.get(e);
    return t === void 0 ? !1 : (t.detach(), t.disconnect(), He(t.getHelper()), this.controls.delete(e), !0);
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
    return ge._instance || (ge._instance = new ge()), ge._instance;
  }
}
const so = new he(), Mi = new ue();
class Ns extends _t {
  curve = new ss();
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
  draggedMat = new Je();
  parentGroup;
  group;
  constructor(e, t) {
    const i = new et(ot(0.5, 1, Math.random()), ot(0.5, 1, Math.random()), ot(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Fi({ color: i }), this.line = new Ie(new gt(), this.lineMaterial), this.line.name = "line", this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = i, this.draggable = new _t(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new O(new cn(1.5), new Je({ color: i })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new ii(), this.raycaster.params.Line.threshold = 3, this.enable();
  }
  enable() {
    document.addEventListener("pointerdown", this.onMouseClick);
  }
  disable() {
    document.removeEventListener("pointerdown", this.onMouseClick);
  }
  dispose = () => {
    this._transform && (this._transform.removeEventListener("objectChange", this.updateSpline), ge.instance.remove(this.name)), this.disable(), this.parentGroup.removeGroup(this.name);
  };
  hideTransform = () => {
    this._transform?.detach();
  };
  exportSpline = () => {
    const e = [];
    this.draggable.children.forEach((t) => {
      e.push([Me(t.position.x, 3), Me(t.position.y, 3), Me(t.position.z, 3)]);
    }), Ra({
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
      this.addPoint(new A(-50, 0, 0), !1), this.addPoint(new A(50, 0, 0));
  };
  addPoint = (e, t = !0) => {
    const i = this.draggable.children.length, n = new O(so, this.draggedMat);
    return n.name = `point_${i}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), t && this.updateSpline(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = new A(
      ot(-this.offset, this.offset, Math.random()),
      ot(-this.offset, this.offset, Math.random()),
      ot(-this.offset, this.offset, Math.random())
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
    He(e), this.updateSpline();
  };
  removePointAt = (e) => {
    const t = this.draggable.children[e];
    this.removePoint(t);
  };
  removeSelectedPt = () => {
    this._transform?.object !== void 0 && this.removePoint(this._transform?.object);
  };
  updateSpline = () => {
    this.curve = new ss(this.points, this.closed, this.curveType, this.tension), this.line.geometry.setFromPoints(this.getPoints()), this.curvePos.position.copy(this.getPointAt(this._curvePercentage));
  };
  // Handlers
  onMouseClick = (e) => {
    if (!pe.instance || this._transform && !this._transform.getHelper().visible)
      return;
    const i = pe.instance.currentWindow.current.getBoundingClientRect();
    Mi.x = (e.clientX - i.x) / i.width * 2 - 1, Mi.y = -((e.clientY - i.y) / i.height) * 2 + 1, this.raycaster.setFromCamera(Mi, this.camera);
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
    this.parentGroup = e, this._transform = ge.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), this._transform.attach(t.length > 0 ? t[t.length - 1] : this), pe.instance?.scene.add(this._transform.getHelper());
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
            He(this);
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
let Qt = 0;
class no extends _t {
  defaultScale = 10;
  _camera;
  group = null;
  constructor(e) {
    super(), this.name = "Spline Editor", this._camera = e, D.addEventListener(P.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = se.addEditorGroup({
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
    D.removeEventListener(P.ADD_SPLINE, this.onAddSpline), se.removeEditorGroup(this.name);
  }
  addSpline(e) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current), this.add(e);
  }
  createSpline = (e = []) => {
    const t = `Spline ${Qt + 1}`, i = new Ns(t, this._camera);
    return i.addPoints(e), this.addSpline(i), Qt++, i;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((i) => {
      t.push(new A(i[0], i[1], i[2]));
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
    const t = JSON.parse(e.value), i = `Spline ${Qt + 1}`, n = [];
    t.points.forEach((a) => {
      n.push(new A(a[0], a[1], a[2]));
    });
    const r = new Ns(i, this.camera);
    r.addPoints(n), this.addSpline(r), Qt++;
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
const Fs = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], ao = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", ro = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==";
class pe extends jt {
  static instance = null;
  scene = new Hs();
  renderer;
  currentScene;
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  helpersContainer = new la();
  grid = new Vr();
  axisHelper = new ns(500);
  interactionHelper = new ns(100);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial = new ca();
  normalsMaterial = new ha();
  uvMaterial = new Gr();
  wireframeMaterial = new Je({
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
  raycaster = new ii();
  pointer = new ue();
  cameraControls = void 0;
  // References
  canvasRef;
  containerRef;
  tlWindow;
  trWindow;
  blWindow;
  brWindow;
  constructor(e) {
    super(e), this.canvasRef = Ve(), this.containerRef = Ve(), this.tlWindow = Ve(), this.trWindow = Ve(), this.blWindow = Ve(), this.brWindow = Ve();
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
      Vector2: ue,
      Vector3: A,
      Vector4: ya,
      Quaternion: Ee,
      Matrix4: ri,
      Spherical: Pi,
      Box3: ba,
      Sphere: Ea,
      Raycaster: ii
    };
    ke.install({ THREE: r }), this.setupScene(), this.setupTools();
    const a = localStorage.getItem(this.expandedCameraVisibility);
    this.cameraVisibility = a !== null ? a === "open" : !1, this.saveExpandedCameraVisibility();
    const o = localStorage.getItem(this.expandedLightVisibility);
    this.lightVisibility = o !== null ? o === "open" : !1, this.saveExpandedLightVisibility(), pe.instance = this;
  }
  componentDidMount() {
    this.setupRenderer(), this.enable(), this.assignControls(), this.resize(), this.play(), ge.instance.three = this.props.three, ge.instance.activeCamera = this.debugCamera;
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
    }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
      /* @__PURE__ */ u.jsx("canvas", { ref: this.canvasRef }),
      /* @__PURE__ */ u.jsxs("div", { className: `cameras ${this.state.mode === "Single" || this.state.mode === "Stacked" ? "single" : ""}`, ref: this.containerRef, children: [
        this.state.mode === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(
          Ge,
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
        (this.state.mode === "Side by Side" || this.state.mode === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            Ge,
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
          /* @__PURE__ */ u.jsx(
            Ge,
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
        this.state.mode === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            Ge,
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
          /* @__PURE__ */ u.jsx(
            Ge,
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
          /* @__PURE__ */ u.jsx(
            Ge,
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
          /* @__PURE__ */ u.jsx(
            Ge,
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
      /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ u.jsx(
          ai,
          {
            title: "View",
            index: Fs.indexOf(this.state.mode),
            options: Fs,
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
        /* @__PURE__ */ u.jsx(
          ai,
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
        /* @__PURE__ */ u.jsx(
          Ps,
          {
            name: "cameraHelper",
            icon: ao,
            selected: this.cameraVisibility,
            height: 24,
            top: 2,
            onClick: (t) => {
              if (this.cameraVisibility = t, this.saveExpandedCameraVisibility(), this.cameraHelpers.forEach((i) => {
                i.visible = t;
              }), this.selectedItem !== void 0 && !t && this.selectedItem instanceof Et) {
                const i = this.cameraHelpers.get(this.selectedItem.name);
                i !== void 0 && (i.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Ps,
          {
            name: "lightHelper",
            icon: ro,
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
    this.renderer = new da({
      canvas: this.canvasRef.current,
      stencil: !1
    }), this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setClearColor(0), this.props.three.renderer = this.renderer;
  }
  setupScene() {
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.helpersContainer.add(this.grid), this.axisHelper.name = "axisHelper", this.helpersContainer.add(this.axisHelper), this.interactionHelper.name = "interactionHelper", this.helpersContainer.add(this.interactionHelper), this.interactionHelper.visible = !1;
    const e = (n, r) => {
      const a = new Ai(-100, 100, 100, -100, 50, 5e3);
      return a.name = n, a.position.copy(r), a.lookAt(0, 0, 0), this.cameras.set(n, a), a;
    };
    e("Top", new A(0, 1e3, 0)), e("Bottom", new A(0, -1e3, 0)), e("Left", new A(-1e3, 0, 0)), e("Right", new A(1e3, 0, 0)), e("Front", new A(0, 0, 1e3)), e("Back", new A(0, 0, -1e3)), e("Orthographic", new A(1e3, 1e3, 1e3)), e("UI", new A()), this.debugCamera = new Et(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const t = localStorage, i = this.props.three.app.appID;
    this.tlCam = this.cameras.get(t.getItem(`${i}_tlCam`)), this.trCam = this.cameras.get(t.getItem(`${i}_trCam`)), this.blCam = this.cameras.get(t.getItem(`${i}_blCam`)), this.brCam = this.cameras.get(t.getItem(`${i}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  setupTools() {
    this.splineEditor = new no(this.currentCamera), this.splineEditor.initDebug(), this.scene.add(this.splineEditor);
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
    e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), D.addEventListener(P.SET_SCENE, this.sceneUpdate), D.addEventListener(P.ADD_CAMERA, this.addCamera), D.addEventListener(P.REMOVE_CAMERA, this.removeCamera), D.addEventListener(P.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const e = this.containerRef.current;
    e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), D.removeEventListener(P.SET_SCENE, this.sceneUpdate), D.removeEventListener(P.ADD_CAMERA, this.addCamera), D.removeEventListener(P.REMOVE_CAMERA, this.removeCamera), D.removeEventListener(P.SET_OBJECT, this.onSetSelectedItem);
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
      a instanceof Ai ? (a.left = i / -2, a.right = i / 2, a.top = n / 2, a.bottom = n / -2, a.name === "UI" && (a.position.x = this.width / 2, a.position.y = this.height / -2, a.position.z = 100), a.updateProjectionMatrix()) : a instanceof Et && (a.aspect = r, a.updateProjectionMatrix(), this.cameraHelpers.get(a.name)?.update());
    });
  };
  sceneUpdate = (e) => {
    this.helpersContainer.add(this.axisHelper), this.clearLightHelpers(), this.scene.remove(this.currentScene), He(this.currentScene);
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const i = new t();
      this.props.onSceneSet !== void 0 && this.props.onSceneSet(i), this.currentScene = i, this.props.three.scene = this.currentScene, this.scene.add(this.currentScene), this.sceneSet = !0, this.addLightHelpers();
    }
  };
  addCamera = (e) => {
    const t = e.value, i = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (i !== void 0 && this.cameras.set(t.name, i), i instanceof Et) {
      const n = new ua(i);
      n.visible = this.cameraVisibility, this.cameraHelpers.set(i.name, n), this.scene.add(n);
    }
    this.setState({ lastUpdate: Date.now() });
  };
  removeCamera = (e) => {
    const t = this.cameraHelpers.get(e.value.name);
    t !== void 0 && (this.scene.remove(t), t.dispose()), this.cameras.delete(e.value.name), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new ue();
    this.renderer.getSize(t);
    const i = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = rt(i, 0, t.x, -1, 1), this.pointer.y = rt(n, 0, t.y, 1, -1);
    const r = t.x / 2, a = t.y / 2, o = () => {
      i < r ? this.pointer.x = rt(i, 0, r, -1, 1) : this.pointer.x = rt(i, r, t.x, -1, 1);
    }, c = () => {
      n < a ? this.pointer.y = rt(n, 0, a, 1, -1) : this.pointer.y = rt(n, a, t.y, 1, -1);
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
    const t = new ue();
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
        e.key === "0" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof O || this.selectedItem instanceof pa ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(ki(45), ki(45), !0), this.updateCameraControls(t));
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
    this.selectedItem !== void 0 && this.updateSelectedItemHelper(!1), this.selectedItem = this.currentScene.getObjectByProperty("uuid", e.value.uuid), this.selectedItem !== void 0 && (this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), ge.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = ge.instance.add(e.value.name), this.currentTransform.attach(this.selectedItem), this.scene.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform), this.updateSelectedItemHelper(!0));
  };
  updateSelectedItemHelper(e) {
    if (this.selectedItem !== void 0) {
      if (this.selectedItem instanceof Et && !this.cameraVisibility) {
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
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), li.instance.update());
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
            t = new _a(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new ga(e, 250), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new xr(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new fa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new ma(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const i = this.controls.get(e.name);
    if (i !== void 0 && i.dispose(), this.controls.delete(e.name), e.name === "UI")
      return;
    const n = new Tr(e, t);
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
    this.splineEditor.camera = this.currentCamera, this.raycaster.setFromCamera(this.pointer, this.currentCamera), this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), ge.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (e, t = !1) => {
    if (this.selectedItem === void 0)
      return;
    cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const i = 0.15, n = new va();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const r = () => {
      const a = n.getDelta();
      this.cameraControls && this.cameraControls.update(a), t && (e.target.lerp(e.target0, i), e.object.position.lerp(e.position0, i), e.object.zoom = Ii(e.object.zoom, e.zoom0, i), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(r);
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
class li extends jt {
  static instance;
  matrix = new ri();
  position = new A();
  rotation = new ln();
  scale = new A();
  open = !1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), i = t !== null ? t === "open" : !1;
    this.open = i, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: i
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), li.instance = this;
  }
  update() {
    if (pe.instance) {
      const e = pe.instance.selectedItem;
      if (e === void 0)
        return;
      this.position.x = Me(e.position.x, 3), this.position.y = Me(e.position.y, 3), this.position.z = Me(e.position.z, 3), this.rotation.copy(e.rotation), this.scale.x = Me(e.scale.x, 3), this.scale.y = Me(e.scale.y, 3), this.scale.z = Me(e.scale.z, 3), this.setState({ lastUpdated: Date.now() });
    }
  }
  render() {
    return /* @__PURE__ */ u.jsx(
      xe,
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
      ee(r, e, i);
    }
  };
  saveExpanded() {
    localStorage.setItem(this.expandedName, this.open ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.app.appID}_transform`;
  }
}
function zs(s) {
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
function oo(s, e) {
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
        title: zs(o),
        prop: o,
        type: "color",
        value: c,
        onChange: (l, d) => {
          const p = new et(d);
          e.updateObject(s.uuid, l, p);
          const m = e.getScene(s.uuid);
          if (m !== null) {
            const g = m.getObjectByProperty("uuid", s.uuid);
            ee(g, l, p);
          }
        }
      }) : a.push({
        title: zs(o),
        prop: o,
        type: typeof c,
        value: c,
        step: typeof c == "number" ? 0.01 : void 0,
        onChange: (l, d) => {
          e.updateObject(s.uuid, l, d);
          const p = e.getScene(s.uuid);
          if (p !== null) {
            const m = p.getObjectByProperty("uuid", s.uuid);
            ee(m, l, d);
          }
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    xe,
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
function lo(s) {
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
  let d;
  const p = t.getScene(e.uuid);
  if (p !== null) {
    const m = p.getObjectByProperty("uuid", e.uuid);
    if (m !== void 0) {
      const g = m.mixer;
      if (g !== void 0) {
        const T = [
          {
            title: "Time Scale",
            type: "range",
            value: g.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (M, f) => {
              g.timeScale = f, t.updateObject(e.uuid, "mixer.timeScale", f);
            }
          }
        ];
        T.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            g.stopAllAction(), t.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), o.push({
          title: "Mixer",
          items: T
        }), d = new Ca(m), pe.instance?.scene.add(d);
      }
    }
  }
  return tt(() => () => {
    d !== void 0 && He(d);
  }, []), /* @__PURE__ */ u.jsx(
    xe,
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
const ji = {
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
let oe = { ...ji };
function co(s) {
  const [e, t] = B(-1);
  tt(() => {
    function a(c) {
      oe = { ...c.value }, t(Date.now());
    }
    function o() {
      oe = { ...ji }, t(Date.now());
    }
    return D.addEventListener(P.SET_SCENE, o), D.addEventListener(P.SET_OBJECT, a), () => {
      D.removeEventListener(P.SET_SCENE, o), D.removeEventListener(P.SET_OBJECT, a);
    };
  }, []);
  const i = oe.type.toLowerCase(), n = oe.animations.length > 0 || oe.mixer !== void 0, r = i.search("mesh") > -1 || i.search("line") > -1 || i.search("points") > -1;
  return /* @__PURE__ */ u.jsx(
    ni,
    {
      label: "Inspector",
      button: oe.uuid.length > 0 ? /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: () => {
        ge.instance.remove(oe.name), oe = { ...ji }, t(Date.now());
      } }) : void 0,
      children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: s.class, children: oe.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            ei,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: oe.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            ei,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: oe.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            ei,
            {
              type: "string",
              title: "UUID",
              prop: "uuid",
              value: oe.uuid,
              disabled: !0
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(li, { object: oe, three: s.three }),
          n ? /* @__PURE__ */ u.jsx(lo, { object: oe, three: s.three }) : null,
          i.search("camera") > -1 ? wr(oe, s.three) : null,
          i.search("light") > -1 ? oo(oe, s.three) : null,
          r ? Er(oe, s.three) : null
        ] })
      ] }) }, e)
    },
    "Inspector"
  );
}
class ho extends jt {
  // Renderer
  autoClear = !0;
  autoClearColor = !0;
  autoClearDepth = !0;
  autoClearStencil = !0;
  outputColorSpace = as;
  localClippingEnabled = !1;
  clearColor = new et(0);
  clearAlpha = 1;
  toneMapping = rs;
  toneMappingExposure = 1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), i = t !== null ? t === "open" : !1;
    if (this.state = {
      expanded: i,
      lastUpdated: Date.now()
    }, this.saveExpanded(i), pe.instance) {
      const n = pe.instance.renderer;
      n && (this.autoClear = n.autoClear, this.autoClearColor = n.autoClearColor, this.autoClearDepth = n.autoClearDepth, this.autoClearStencil = n.autoClearStencil, this.outputColorSpace = n.outputColorSpace, this.localClippingEnabled = n.localClippingEnabled, this.clearAlpha = n.getClearAlpha(), this.toneMapping = n.toneMapping, this.toneMappingExposure = n.toneMappingExposure, n.getClearColor(this.clearColor));
    }
    D.addEventListener(P.ADD_RENDERER, this.onAddRenderer);
  }
  componentwillunmount() {
    D.removeEventListener(P.ADD_RENDERER, this.onAddRenderer);
  }
  onAddRenderer = (e) => {
    const t = e.value;
    if (this.autoClear = t.autoClear, this.autoClearColor = t.autoClearColor, this.autoClearDepth = t.autoClearDepth, this.autoClearStencil = t.autoClearStencil, this.outputColorSpace = t.outputColorSpace, this.localClippingEnabled = t.localClippingEnabled, this.clearAlpha = t.clearAlpha, this.toneMapping = t.toneMapping, this.toneMappingExposure = t.toneMappingExposure, this.clearColor.setStyle(t.clearColor, Ut), pt.enabled = t.colorManagement, pe.instance) {
      const i = pe.instance.renderer;
      i && (i.autoClear = this.autoClear, i.autoClearColor = this.autoClearColor, i.autoClearDepth = this.autoClearDepth, i.autoClearStencil = this.autoClearStencil, i.outputColorSpace = this.outputColorSpace, i.localClippingEnabled = this.localClippingEnabled, i.toneMapping = this.toneMapping, i.toneMappingExposure = this.toneMappingExposure, i.setClearColor(t.clearColor, this.clearAlpha));
    }
    this.setState({ lastUpdated: Date.now() });
  };
  render() {
    const e = () => {
      if (pe.instance) {
        const t = pe.instance.renderer;
        t && (t.autoClear = this.autoClear, t.autoClearColor = this.autoClearColor, t.autoClearDepth = this.autoClearDepth, t.autoClearStencil = this.autoClearStencil, t.outputColorSpace = this.outputColorSpace, t.localClippingEnabled = this.localClippingEnabled, t.toneMapping = this.toneMapping, t.toneMappingExposure = this.toneMappingExposure, t.setClearColor(this.clearColor.getStyle(), this.clearAlpha), this.props.three.updateRenderer({
          autoClear: this.autoClear,
          autoClearColor: this.autoClearColor,
          autoClearDepth: this.autoClearDepth,
          autoClearStencil: this.autoClearStencil,
          outputColorSpace: this.outputColorSpace,
          localClippingEnabled: this.localClippingEnabled,
          clearAlpha: this.clearAlpha,
          clearColor: this.clearColor.getStyle(),
          colorManagement: pt.enabled,
          toneMapping: this.toneMapping,
          toneMappingExposure: this.toneMappingExposure
        }));
      }
    };
    return /* @__PURE__ */ u.jsx(
      xe,
      {
        title: "Renderer",
        expanded: this.state.expanded,
        items: [
          {
            type: "boolean",
            title: "Auto Clear",
            value: this.autoClear,
            onChange: (t, i) => {
              this.autoClear = i;
            }
          },
          {
            type: "boolean",
            title: "Auto Clear Color",
            value: this.autoClearColor,
            onChange: (t, i) => {
              this.autoClearColor = i, e();
            }
          },
          {
            type: "boolean",
            title: "Auto Clear Depth",
            value: this.autoClearDepth,
            onChange: (t, i) => {
              this.autoClearDepth = i, e();
            }
          },
          {
            type: "boolean",
            title: "Auto Clear Stencil",
            value: this.autoClearStencil,
            onChange: (t, i) => {
              this.autoClearStencil = i, e();
            }
          },
          {
            type: "boolean",
            title: "Local Clipping",
            value: this.localClippingEnabled,
            onChange: (t, i) => {
              this.localClippingEnabled = i, e();
            }
          },
          {
            type: "color",
            title: "Clear Color",
            value: `#${this.clearColor.getHexString()}`,
            onChange: (t, i) => {
              this.clearColor.setStyle(i), e();
            }
          },
          {
            type: "range",
            title: "Clear Alpha",
            min: 0,
            max: 1,
            step: 0.01,
            value: this.clearAlpha,
            onChange: (t, i) => {
              this.clearAlpha = i, e();
            }
          },
          {
            type: "boolean",
            title: "Clear Management",
            value: pt.enabled,
            onChange: (t, i) => {
              pt.enabled = i, e();
            }
          },
          {
            type: "option",
            title: "Color Space",
            value: this.outputColorSpace,
            options: [
              {
                title: "No Color Space",
                value: Sa
              },
              {
                title: "SRB Color Space",
                value: as
              },
              {
                title: "Linear SRB Color Space",
                value: Ut
              }
            ],
            onChange: (t, i) => {
              this.outputColorSpace = i, e();
            }
          },
          {
            type: "option",
            title: "Tone Mapping",
            value: this.toneMapping,
            options: [
              {
                title: "None ",
                value: rs
              },
              {
                title: "Linear ",
                value: wa
              },
              {
                title: "Reinhard",
                value: xa
              },
              {
                title: "Cineon ",
                value: Oa
              },
              {
                title: "ACES Filmic",
                value: Ta
              },
              {
                title: "AgX",
                value: Ma
              },
              {
                title: "Neutral",
                value: Aa
              },
              {
                title: "Custom",
                value: Pa
              }
            ],
            onChange: (t, i) => {
              this.toneMapping = i, e();
            }
          },
          {
            type: "range",
            title: "Tone Mapping Exposure",
            value: this.toneMappingExposure,
            min: 0,
            max: 2,
            step: 0.01,
            onChange: (t, i) => {
              this.toneMappingExposure = i, e();
            }
          }
        ],
        onToggle: (t) => {
          this.setState({ expanded: t }), this.saveExpanded(t);
        }
      },
      Math.random()
    );
  }
  saveExpanded(e) {
    localStorage.setItem(this.expandedName, e ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.app.appID}_renderer`;
  }
}
function uo(s) {
  const [e] = B([]), [t] = B([]), [i, n] = B(0), r = (d) => {
    const p = d.value;
    e.push(p), t.push(
      /* @__PURE__ */ u.jsx(
        ni,
        {
          label: `Scene: ${p.name}`,
          scene: p,
          open: !0,
          onRefresh: () => {
            s.three.refreshScene(p.name);
          },
          children: /* @__PURE__ */ u.jsx(fs, { child: p, scene: p, three: s.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, a = (d) => {
    const p = d.value;
    for (let m = 0; m < e.length; m++)
      if (p.uuid === e[m].uuid) {
        e[m] = p, t[m] = /* @__PURE__ */ u.jsx(
          ni,
          {
            label: `Scene: ${p.name}`,
            scene: p,
            open: !0,
            onRefresh: () => {
              s.three.refreshScene(p.name);
            },
            children: /* @__PURE__ */ u.jsx(fs, { child: p, scene: p, three: s.three })
          },
          Math.random()
        ), n(Date.now());
        return;
      }
  }, o = (d) => {
    const p = d.value;
    for (let m = 0; m < e.length; m++)
      if (p.uuid === e[m].uuid) {
        e.splice(m, 1), t.splice(m, 1), n(Date.now());
        return;
      }
  };
  tt(() => (D.addEventListener(P.ADD_SCENE, r), D.addEventListener(P.REFRESH_SCENE, a), D.addEventListener(P.REMOVE_SCENE, o), () => {
    D.removeEventListener(P.ADD_SCENE, r), D.removeEventListener(P.REFRESH_SCENE, a), D.removeEventListener(P.REMOVE_SCENE, o);
  }), []);
  const [c, l] = B(0);
  return /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ u.jsx("div", { className: "scenes", children: t }, i),
    /* @__PURE__ */ u.jsx(co, { three: s.three }),
    /* @__PURE__ */ u.jsx(ho, { three: s.three }),
    /* @__PURE__ */ u.jsx(se, { three: s.three }),
    /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "number",
        value: c,
        onChange: (d) => {
          const p = d.target.value;
          console.log(`Value: ${p}, Length: ${p.length}, #${Number(p)}`), l(p);
        }
      }
    )
  ] });
}
function To(s) {
  return tt(() => {
    function e(o) {
      let c = null;
      return s.three.scenes.forEach((l) => {
        o.search(l.uuid) > -1 && (c = l);
      }), c;
    }
    const t = (o) => {
      const c = o.value, d = e(c)?.getObjectByProperty("uuid", c);
      d !== void 0 && s.three.setObject(d);
    }, i = (o, c, l) => {
      const p = e(o)?.getObjectByProperty("uuid", o);
      p !== void 0 && ee(p, c, l);
    }, n = (o) => {
      const c = o.value, { key: l, value: d, uuid: p } = c;
      i(p, l, d);
    }, r = (o) => {
      const c = o.value, d = e(c.uuid)?.getObjectByProperty("uuid", c.uuid);
      if (d !== void 0) {
        const p = (m) => {
          const g = c.key.split(".");
          switch (g.length) {
            case 1:
              d[g[0]] = m;
              break;
            case 2:
              d[g[0]][g[1]] = m;
              break;
            case 3:
              d[g[0]][g[1]][g[2]] = m;
              break;
            case 4:
              d[g[0]][g[1]][g[2]][g[3]] = m;
              break;
            case 5:
              d[g[0]][g[1]][g[2]][g[3]][g[4]] = m;
              break;
          }
          d.material.needsUpdate = !0;
        };
        c.value.src.length > 0 ? mn(c.value.src).then((m) => {
          m.offset.set(c.value.offset[0], c.value.offset[1]), m.repeat.set(c.value.repeat[0], c.value.repeat[1]), p(m);
        }) : p(null);
      }
    }, a = (o) => {
      const { key: c, uuid: l, value: d, subitem: p } = o.value, g = e(l)?.getObjectByProperty("uuid", l);
      if (g !== void 0)
        try {
          p !== void 0 ? Za(g, p)[c](d) : g[c](d);
        } catch (S) {
          console.log("Error requesting method:"), console.log(S), console.log(c), console.log(d);
        }
    };
    return D.addEventListener(P.GET_OBJECT, t), D.addEventListener(P.UPDATE_OBJECT, n), D.addEventListener(P.CREATE_TEXTURE, r), D.addEventListener(P.REQUEST_METHOD, a), () => {
      D.removeEventListener(P.GET_OBJECT, t), D.removeEventListener(P.UPDATE_OBJECT, n), D.removeEventListener(P.CREATE_TEXTURE, r), D.removeEventListener(P.REQUEST_METHOD, a);
    };
  }, []), null;
}
function po(s) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: s.ref, style: s.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: s.header }),
    s.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: s.footer })
  ] });
}
function Mo(s) {
  return /* @__PURE__ */ u.jsx(po, { children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      pe,
      {
        three: s.three,
        scenes: s.scenes,
        onSceneResize: s.onSceneResize,
        onSceneSet: s.onSceneSet,
        onSceneUpdate: s.onSceneUpdate
      }
    ),
    /* @__PURE__ */ u.jsx(uo, { three: s.three })
  ] }) });
}
export {
  ni as Accordion,
  bo as Application,
  zi as BaseRemote,
  gn as ChildObject,
  fs as ContainerObject,
  Qa as Draggable,
  Ka as DraggableItem,
  Ja as Dropdown,
  er as DropdownItem,
  po as Editor,
  Jt as ExportTexture,
  co as Inspector,
  pe as MultiView,
  fn as NavButton,
  Ha as QualityType,
  Eo as RemoteComponents,
  Oo as RemoteController,
  wo as RemoteTheatre,
  xo as RemoteThree,
  To as SceneInspector,
  uo as SidePanel,
  Ns as Spline,
  no as SplineEditor,
  Mo as ThreeEditor,
  P as ToolEvents,
  ge as Transform,
  si as capitalize,
  os as colorToHex,
  Ra as copyToClipboard,
  So as customizeTheatreElements,
  D as debugDispatcher,
  _o as defaultTheatreCallback,
  yo as detectSettings,
  He as dispose,
  ka as disposeMaterial,
  vo as disposeTexture,
  Ri as hierarchyUUID,
  La as isColor,
  un as noop,
  Ia as randomID,
  ls as resetThreeObjects,
  Co as theatreEditorApp,
  Di as totalThreeObjects
};
