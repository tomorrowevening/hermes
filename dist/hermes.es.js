import { OrthographicCamera as Ii, Scene as Gs, MeshBasicMaterial as Je, BufferGeometry as _t, Float32BufferAttribute as qe, Mesh as M, LinearSRGBColorSpace as Nt, ObjectLoader as Gn, AnimationMixer as Xn, AnimationClip as $n, EventDispatcher as Yi, Texture as Kn, RepeatWrapping as ls, Color as et, ColorManagement as mt, WebGLRenderTarget as qn, FrontSide as Qn, BackSide as Xs, DoubleSide as Bi, NoBlending as Jn, NormalBlending as ea, AdditiveBlending as ta, SubtractiveBlending as ia, MultiplyBlending as sa, CustomBlending as na, AddEquation as aa, SubtractEquation as ra, ReverseSubtractEquation as oa, MinEquation as la, MaxEquation as ca, ZeroFactor as $s, OneFactor as Ks, SrcColorFactor as qs, OneMinusSrcColorFactor as Qs, SrcAlphaFactor as Js, OneMinusSrcAlphaFactor as en, DstAlphaFactor as tn, OneMinusDstAlphaFactor as sn, DstColorFactor as nn, OneMinusDstColorFactor as an, SrcAlphaSaturateFactor as ha, ConstantColorFactor as rn, OneMinusConstantColorFactor as on, ConstantAlphaFactor as ln, OneMinusConstantAlphaFactor as cn, Line as Ie, LineBasicMaterial as Vi, Ray as da, Plane as ua, MathUtils as pa, Vector3 as P, Controls as hn, MOUSE as gt, TOUCH as ft, Quaternion as Ce, Spherical as Li, Vector2 as pe, ShaderMaterial as dn, GLSL3 as ma, PlaneGeometry as un, Raycaster as ni, Euler as pn, Matrix4 as ci, Object3D as vt, CylinderGeometry as ve, BoxGeometry as de, OctahedronGeometry as Zt, SphereGeometry as mn, TorusGeometry as Et, CatmullRomCurve3 as cs, Group as fa, AxesHelper as hs, MeshDepthMaterial as ga, MeshNormalMaterial as _a, PerspectiveCamera as Ct, WebGLRenderer as va, CameraHelper as ya, SkinnedMesh as ba, SpotLightHelper as Ea, PointLightHelper as Ca, HemisphereLightHelper as Sa, DirectionalLightHelper as wa, Clock as xa, Vector4 as Oa, Box3 as Ta, Sphere as Ma, SkeletonHelper as Pa, SRGBColorSpace as ds, NoToneMapping as us, NoColorSpace as Aa, LinearToneMapping as Da, ReinhardToneMapping as Ra, CineonToneMapping as Ia, ACESFilmicToneMapping as La, AgXToneMapping as ka, NeutralToneMapping as Ua, CustomToneMapping as ja } from "three";
import fn, { useState as Z, useRef as J, useEffect as tt, useMemo as jt, Component as Ft, createRef as Ve, forwardRef as Na } from "react";
import { Reorder as gn } from "framer-motion";
const ai = () => {
}, Ro = () => {
};
function ri(s) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
function Fa(s) {
  const e = JSON.stringify(s);
  return navigator.clipboard.writeText(e), e;
}
function za() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ha(s) {
  return s.r !== void 0 && s.g !== void 0 && s.b !== void 0;
}
function ps(s) {
  const e = Math.round(s.r * 255), t = Math.round(s.g * 255), i = Math.round(s.b * 255), n = (c) => {
    const l = c.toString(16);
    return l.length === 1 ? "0" + l : l;
  }, r = n(e), a = n(t), o = n(i);
  return "#" + r + a + o;
}
function vi(s, e, t, i) {
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
const Ya = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function ms(s) {
  return s = s.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1");
}
const _n = typeof window > "u", Le = (() => {
  if (_n)
    return;
  const { userAgent: s, platform: e, maxTouchPoints: t } = window.navigator, i = /(iphone|ipod|ipad)/i.test(s), n = e === "iPad" || e === "MacIntel" && t > 0 && !window.MSStream;
  return { isIpad: n, isMobile: /android/i.test(s) || i || n, isSafari12: /Version\/12.+Safari/.test(s), isFirefox: /Firefox/.test(s) };
})();
function Ba(s, e, t) {
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
  `, m = l.createShader(35633), f = l.createShader(35632), C = l.createProgram();
    if (!(f && m && C))
      return;
    l.shaderSource(m, d), l.shaderSource(f, p), l.compileShader(m), l.compileShader(f), l.attachShader(C, m), l.attachShader(C, f), l.linkProgram(C), l.detachShader(C, m), l.detachShader(C, f), l.deleteShader(m), l.deleteShader(f), l.useProgram(C);
    const y = l.createBuffer();
    l.bindBuffer(34962, y), l.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
    const T = l.getAttribLocation(C, "aPosition");
    l.vertexAttribPointer(T, 3, 5126, !1, 0, 0), l.enableVertexAttribArray(T), l.clearColor(1, 1, 1, 1), l.clear(16384), l.viewport(0, 0, 1, 1), l.drawArrays(4, 0, 3);
    const g = new Uint8Array(4);
    return l.readPixels(0, 0, 1, 1, 6408, 5121, g), l.deleteProgram(C), l.deleteBuffer(y), g.join("");
  }(s), n = "801621810", r = "8016218135", a = "80162181161", o = Le?.isIpad ? [["a7", a, 12], ["a8", r, 15], ["a8x", r, 15], ["a9", r, 15], ["a9x", r, 15], ["a10", r, 15], ["a10x", r, 15], ["a12", n, 15], ["a12x", n, 15], ["a12z", n, 15], ["a14", n, 15], ["a15", n, 15], ["m1", n, 15], ["m2", n, 15]] : [["a7", a, 12], ["a8", r, 12], ["a9", r, 15], ["a10", r, 15], ["a11", n, 15], ["a12", n, 15], ["a13", n, 15], ["a14", n, 15], ["a15", n, 15], ["a16", n, 15], ["a17", n, 15]];
  let c;
  return i === "80162181255" ? c = o.filter(([, , l]) => l >= 14) : (c = o.filter(([, l]) => l === i), c.length || (c = o)), c.map(([l]) => `apple ${l} gpu`);
}
class fs extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
const yi = [], gs = [];
function Va(s, e) {
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
    gs[d] = s.charCodeAt(a + d), yi[d] = ++d;
  for (; p < n; )
    for (r = e.charCodeAt(a + p), o = p++, l = p, d = 0; d < i; d++)
      c = r === gs[d] ? o : o + 1, o = yi[d], l = yi[d] = o > l ? c > l ? l + 1 : c : c > o ? o + 1 : c;
  return l;
}
function Za(s) {
  return s != null;
}
const Wa = ({ mobileTiers: s = [0, 15, 30, 60], desktopTiers: e = [0, 15, 30, 60], override: t = {}, glContext: i, failIfMajorPerformanceCaveat: n = !1, benchmarksURL: r = "https://unpkg.com/detect-gpu@5.0.57/dist/benchmarks" } = {}) => vi(void 0, void 0, void 0, function* () {
  const a = {};
  if (_n)
    return { tier: 0, type: "SSR" };
  const { isIpad: o = !!Le?.isIpad, isMobile: c = !!Le?.isMobile, screenSize: l = window.screen, loadBenchmarks: d = (w) => vi(void 0, void 0, void 0, function* () {
    const O = yield fetch(`${r}/${w}`).then((L) => L.json());
    if (parseInt(O.shift().split(".")[0], 10) < 4)
      throw new fs("Detect GPU benchmark data is out of date. Please update to version 4x");
    return O;
  }) } = t;
  let { renderer: p } = t;
  const m = (w, O, L, j, R) => ({ device: R, fps: j, gpu: L, isMobile: c, tier: w, type: O });
  let f, C = "";
  if (p)
    p = ms(p), f = [p];
  else {
    const w = i || function(L, j = !1) {
      const R = { alpha: !1, antialias: !1, depth: !1, failIfMajorPerformanceCaveat: j, powerPreference: "high-performance", stencil: !1 };
      L && delete R.powerPreference;
      const B = window.document.createElement("canvas"), Se = B.getContext("webgl", R) || B.getContext("experimental-webgl", R);
      return Se ?? void 0;
    }(Le?.isSafari12, n);
    if (!w)
      return m(0, "WEBGL_UNSUPPORTED");
    const O = Le?.isFirefox ? null : w.getExtension("WEBGL_debug_renderer_info");
    if (p = O ? w.getParameter(O.UNMASKED_RENDERER_WEBGL) : w.getParameter(w.RENDERER), !p)
      return m(1, "FALLBACK");
    C = p, p = ms(p), f = function(L, j, R) {
      return j === "apple gpu" ? Ba(L, j, R) : [j];
    }(w, p, c);
  }
  const y = (yield Promise.all(f.map(function(w) {
    var O;
    return vi(this, void 0, void 0, function* () {
      const L = ((W) => {
        const le = c ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
        for (const Te of le)
          if (W.includes(Te))
            return Te;
      })(w);
      if (!L)
        return;
      const j = `${c ? "m" : "d"}-${L}${o ? "-ipad" : ""}.json`, R = a[j] = (O = a[j]) !== null && O !== void 0 ? O : d(j);
      let B;
      try {
        B = yield R;
      } catch (W) {
        if (W instanceof fs)
          throw W;
        return;
      }
      const Se = function(W) {
        var le;
        const Te = (W = W.replace(/\([^)]+\)/, "")).match(/\d+/) || W.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
        return (le = Te?.join("").replace(/\W|amd/g, "")) !== null && le !== void 0 ? le : "";
      }(w);
      let _e = B.filter(([, W]) => W === Se);
      _e.length || (_e = B.filter(([W]) => W.includes(w)));
      const re = _e.length;
      if (re === 0)
        return;
      const q = w.split(/[.,()\[\]/\s]/g).sort().filter((W, le, Te) => le === 0 || W !== Te[le - 1]).join(" ");
      let $, [Ue, , , , he] = re > 1 ? _e.map((W) => [W, Va(q, W[2])]).sort(([, W], [, le]) => W - le)[0][0] : _e[0], Ee = Number.MAX_VALUE;
      const { devicePixelRatio: se } = window, je = l.width * se * l.height * se;
      for (const W of he) {
        const [le, Te] = W, yt = le * Te, it = Math.abs(je - yt);
        it < Ee && (Ee = it, $ = W);
      }
      if (!$)
        return;
      const [, , Ne, Fe] = $;
      return [Ee, Ne, Ue, Fe];
    });
  }))).filter(Za).sort(([w = Number.MAX_VALUE, O], [L = Number.MAX_VALUE, j]) => w === L ? O - j : w - L);
  if (!y.length) {
    const w = Ya.find((O) => p.includes(O));
    return w ? m(0, "BLOCKLISTED", w) : m(1, "FALLBACK", `${p} (${C})`);
  }
  const [, T, g, v] = y[0];
  if (T === -1)
    return m(0, "BLOCKLISTED", g, T, v);
  const S = c ? s : e;
  let E = 0;
  for (let w = 0; w < S.length; w++)
    T >= S[w] && (E = w);
  return m(E, "BENCHMARK", g, T, v);
});
var Ga = /* @__PURE__ */ ((s) => (s[s.High = 0] = "High", s[s.Medium = 1] = "Medium", s[s.Low = 2] = "Low", s))(Ga || {});
function Io(s) {
  return new Promise((e) => {
    Wa().then((t) => {
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
function $e(s, e, t) {
  return Math.min(e, Math.max(s, t));
}
function _s(s, e, t) {
  return (t - s) / (e - s);
}
function ki(s, e, t) {
  return s * (1 - t) + e * t;
}
function Lo(s, e) {
  const t = s - e;
  return Math.sqrt(t * t);
}
function Pe(s, e = 1) {
  return Number(s.toFixed(e));
}
const ko = (s) => {
  s?.dispose();
}, Xa = (s) => {
  s && (Array.isArray(s) ? s.forEach((e) => e.dispose()) : s.dispose());
}, He = (s) => {
  if (s) {
    for (; s.children.length > 0; ) {
      const e = s.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : He(e);
    }
    if (s.parent && s.parent.remove(s), s.isMesh) {
      const e = s;
      e.geometry?.dispose(), Xa(e.material);
    }
    s.dispose !== void 0 && s.dispose();
  }
};
let Ui = 0;
const vs = () => {
  Ui = 0;
}, ji = (s) => {
  if (!s)
    return;
  let e = s.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${Ui}`, Ui++), s.parent !== null && s.parent.uuid.length > 0 && (e = `${s.parent.uuid}.${e}`), s.uuid = e, s.isMesh !== void 0) {
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
  s.children.forEach((t) => ji(t));
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
      this.camera = new Ii(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Gs(), this.material = new Je();
      const t = new _t();
      t.setAttribute("position", new qe([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new qe([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new qe([0, 0, 2, 0, 0, 2], 2));
      const i = new M(t, this.material);
      this.scene.add(i);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, i = e.colorSpace;
      this.renderer.outputColorSpace = Nt, e.colorSpace = Nt, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = i;
    }
    return this.renderer.domElement;
  }
}
function Uo(s) {
  return new Promise((e) => {
    const t = new Gn();
    t.parseAsync(s.scene).then((i) => {
      const n = new Xn(i);
      if (s.animations.length > 0) {
        const a = s.animations.map((c) => $n.parse(c));
        n.clipAction(a[0]).play(), n.getRoot().animations = s.animations, n.getRoot().mixer = n;
      }
      const r = [];
      s.cameras && s.cameras.length > 0 && s.cameras.forEach((a) => {
        const o = t.parse(a);
        r.push(o);
      }), e({
        animations: s.animations,
        model: i,
        mixer: n,
        cameras: r
      });
    });
  });
}
const at = Zi([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "button",
  "pointerId",
  "pointerType",
  "clientX",
  "clientY",
  "pageX",
  "pageY"
]), $a = Zi([
  "clientX",
  "clientY",
  "deltaX",
  "deltaY",
  "deltaMode"
]), Ka = Zi([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "keyCode"
]);
function qa(s, e) {
  s.preventDefault(), $a(s, e);
}
function Qa(s) {
  s.preventDefault();
}
function Ja(s, e, t) {
  for (const i of e)
    t[i] = s[i];
}
function Zi(s) {
  return function(t, i) {
    const n = { type: t.type };
    Ja(t, s, n), i(n);
  };
}
function bi(s, e) {
  const t = [], i = { type: s.type, touches: t };
  for (let n = 0; n < s.touches.length; ++n) {
    const r = s.touches[n];
    t.push({
      pageX: r.pageX,
      pageY: r.pageY
    });
  }
  e(i);
}
const er = {
  37: !0,
  // left
  38: !0,
  // up
  39: !0,
  // right
  40: !0
  // down
};
function tr(s, e) {
  const { keyCode: t } = s;
  er[t] && (s.preventDefault(), Ka(s, e));
}
const jo = {
  contextmenu: Qa,
  mousedown: at,
  mousemove: at,
  mouseup: at,
  pointerdown: at,
  pointermove: at,
  pointerup: at,
  touchstart: bi,
  touchmove: bi,
  touchend: bi,
  wheel: qa,
  keydown: tr
};
let ir = 0;
class No {
  id;
  worker;
  constructor(e, t, i) {
    this.id = ir++, this.worker = t;
    const n = (a) => {
      this.worker.postMessage({
        type: "event",
        id: this.id,
        data: a
      });
    };
    t.postMessage({
      type: "makeProxy",
      id: this.id
    });
    for (const [a, o] of Object.entries(i))
      e.addEventListener(a, (c) => {
        o(c, n);
      });
    function r() {
      n({
        type: "resize",
        left: 0,
        top: 0,
        width: innerWidth,
        height: innerHeight
      });
    }
    window.addEventListener("resize", r), r();
  }
}
class sr extends Yi {
  style = {};
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  ownerDocument = void 0;
  constructor() {
    super(), this.ownerDocument = this;
  }
  get clientWidth() {
    return this.width;
  }
  set clientWidth(e) {
    this.width = e;
  }
  get clientHeight() {
    return this.height;
  }
  set clientHeight(e) {
    this.height = e;
  }
  // OrbitControls call these as of r132. Implementing as no-ops
  setPointerCapture() {
  }
  releasePointerCapture() {
  }
  getBoundingClientRect() {
    return {
      x: this.left,
      y: this.top,
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
      right: this.left + this.width,
      bottom: this.top + this.height,
      toJSON: () => ({})
      // Satisfies the DOMRect interface
    };
  }
  handleEvent(e) {
    if (e.type === "size") {
      this.left = e.left, this.top = e.top, this.width = e.width, this.height = e.height;
      return;
    }
    e.preventDefault = ai, e.stopPropagation = ai, this.dispatchEvent(e);
  }
  focus() {
  }
  getRootNode() {
    return this;
  }
}
class Fo {
  targets = {};
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }
  makeProxy(e) {
    const { id: t } = e, i = new sr();
    this.targets[t] = i;
  }
  getProxy(e) {
    return this.targets[e];
  }
  handleEvent(e) {
    this.targets[e.id]?.handleEvent(e.data);
  }
}
class zo {
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
var A = /* @__PURE__ */ ((s) => (s.CUSTOM = "ToolEvents::custom", s.SELECT_DROPDOWN = "ToolEvents::selectDropdown", s.DRAG_UPDATE = "ToolEvents::dragUpdate", s.ADD_SCENE = "ToolEvents::addScene", s.REFRESH_SCENE = "ToolEvents::refreshScene", s.REMOVE_SCENE = "ToolEvents::removeScene", s.SET_SCENE = "ToolEvents::setScene", s.GET_OBJECT = "ToolEvents::getObject", s.SET_OBJECT = "ToolEvents::setObject", s.UPDATE_OBJECT = "ToolEvents::updateObject", s.CREATE_TEXTURE = "ToolEvents::createTexture", s.REQUEST_METHOD = "ToolEvents::requestMethod", s.ADD_CAMERA = "ToolEvents::addCamera", s.REMOVE_CAMERA = "ToolEvents::removeCamera", s.ADD_GROUP = "ToolEvents::addGroup", s.REMOVE_GROUP = "ToolEvents::removeGroup", s.ADD_SPLINE = "ToolEvents::addSpline", s.ADD_RENDERER = "ToolEvents::addRenderer", s.UPDATE_RENDERER = "ToolEvents::updateRenderer", s))(A || {});
const D = new Yi();
class Wi {
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
class Ho extends Wi {
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
function Yo(s, e, t) {
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
function Bo() {
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
class Vo extends Wi {
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
    l !== void 0 ? l = a.object(t, { ...i, ...l.value }, { reconfigure: !0 }) : l = a.object(t, i), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, n !== void 0 ? n : ai);
    const d = l.onValuesChange((p) => {
      if (this.app.editor) {
        for (const f in p) {
          const C = p[f];
          typeof C == "object" && Ha(C) && (p[f] = {
            r: C.r,
            g: C.g,
            b: C.b,
            a: C.a
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
function nr(s) {
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
function pt(s) {
  const e = {
    name: s.name,
    type: s.type,
    uuid: s.uuid,
    children: []
  };
  return s.children.forEach((t) => {
    e.children.push(pt(t));
  }), e;
}
function ar(s) {
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
function rr(s) {
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
function rt(s) {
  const e = {};
  for (const t in s) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || rr(t))
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
          src: ti.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = ar(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return s.anisotropy !== void 0 && (e.anisotropy = s.anisotropy), s.clearcoat !== void 0 && (e.clearcoat = s.clearcoat), s.iridescence !== void 0 && (e.iridescence = s.iridescence), s.dispersion !== void 0 && (e.dispersion = s.dispersion), s.sheen !== void 0 && (e.sheen = s.sheen), s.transmission !== void 0 && (e.transmission = s.transmission), s.transmission !== void 0 && (e.transmission = s.transmission), e;
}
function Ei(s) {
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
        n.push(rt(r));
      }), e.material = n;
    } else
      e.material = rt(i.material);
  } else if (t.search("points") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((r) => {
        n.push(rt(r));
      }), e.material = n;
    } else
      e.material = rt(i.material);
  } else if (t.search("line") > -1) {
    const i = s;
    if (Array.isArray(i.material)) {
      const n = [];
      i.material.forEach((r) => {
        n.push(rt(r));
      }), e.material = n;
    } else
      e.material = rt(i.material);
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
function or(s, e) {
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
function lr(s, e) {
  for (const t in e)
    s[t] = e[t];
}
function ie(s, e, t) {
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
    a != null && lr(a, t);
  }
}
function vn(s) {
  return new Promise((e, t) => {
    const i = new Image();
    i.onload = () => {
      const n = new Kn(i);
      n.wrapS = ls, n.wrapT = ls, n.needsUpdate = !0, e(n);
    }, i.onerror = t, i.src = s;
  });
}
class Zo extends Wi {
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
    this.app.debugEnabled && (this.renderer !== void 0 && (ti.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (ti.renderer = this.renderer);
    const t = Ei(e);
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
    if (this.renderer = e, this.canvas = e.domElement, this.inputElement = t !== null ? t : this.canvas, !this.app.debugEnabled)
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
        colorManagement: mt.enabled,
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
    vs(), ji(e);
    const t = pt(e);
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
      const i = pt(t);
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
    const t = pt(e);
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
    this.renderer !== void 0 && (ti.renderer = this.renderer), vs(), ji(e);
    const t = pt(e);
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
    const t = Ei(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = Ei(e);
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
          data: pt(n.scenes.get(i.data.name))
        });
        break;
      case "updateRenderer":
        n.renderer && (n.renderer.autoClear = i.data.autoClear, n.renderer.autoClearColor = i.data.autoClearColor, n.renderer.autoClearDepth = i.data.autoClearDepth, n.renderer.autoClearStencil = i.data.autoClearStencil, n.renderer.outputColorSpace = i.data.outputColorSpace, n.renderer.localClippingEnabled = i.data.localClippingEnabled, n.renderer.setClearColor(i.data.clearColor, i.data.clearAlpha), n.renderer.toneMapping = i.data.toneMapping, n.renderer.toneMappingExposure = i.data.toneMappingExposure, mt.enabled = i.data.colorManagement);
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
      case "addRenderer":
        D.dispatchEvent({ type: A.ADD_RENDERER, value: i.data });
    }
  }
  // Renderer
  addRT(e, t) {
    const i = new qn(32, 32, t);
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
var Ni = { exports: {} }, St = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ys;
function cr() {
  if (ys)
    return St;
  ys = 1;
  var s = fn, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, n = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, c, l) {
    var d, p = {}, m = null, f = null;
    l !== void 0 && (m = "" + l), c.key !== void 0 && (m = "" + c.key), c.ref !== void 0 && (f = c.ref);
    for (d in c)
      i.call(c, d) && !r.hasOwnProperty(d) && (p[d] = c[d]);
    if (o && o.defaultProps)
      for (d in c = o.defaultProps, c)
        p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: e, type: o, key: m, ref: f, props: p, _owner: n.current };
  }
  return St.Fragment = t, St.jsx = a, St.jsxs = a, St;
}
var wt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bs;
function hr() {
  return bs || (bs = 1, process.env.NODE_ENV !== "production" && function() {
    var s = fn, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), C = Symbol.iterator, y = "@@iterator";
    function T(h) {
      if (h === null || typeof h != "object")
        return null;
      var b = C && h[C] || h[y];
      return typeof b == "function" ? b : null;
    }
    var g = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(h) {
      {
        for (var b = arguments.length, x = new Array(b > 1 ? b - 1 : 0), k = 1; k < b; k++)
          x[k - 1] = arguments[k];
        S("error", h, x);
      }
    }
    function S(h, b, x) {
      {
        var k = g.ReactDebugCurrentFrame, H = k.getStackAddendum();
        H !== "" && (b += "%s", x = x.concat([H]));
        var G = x.map(function(F) {
          return String(F);
        });
        G.unshift("Warning: " + b), Function.prototype.apply.call(console[h], console, G);
      }
    }
    var E = !1, w = !1, O = !1, L = !1, j = !1, R;
    R = Symbol.for("react.module.reference");
    function B(h) {
      return !!(typeof h == "string" || typeof h == "function" || h === i || h === r || j || h === n || h === l || h === d || L || h === f || E || w || O || typeof h == "object" && h !== null && (h.$$typeof === m || h.$$typeof === p || h.$$typeof === a || h.$$typeof === o || h.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      h.$$typeof === R || h.getModuleId !== void 0));
    }
    function Se(h, b, x) {
      var k = h.displayName;
      if (k)
        return k;
      var H = b.displayName || b.name || "";
      return H !== "" ? x + "(" + H + ")" : x;
    }
    function _e(h) {
      return h.displayName || "Context";
    }
    function re(h) {
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
            var b = h;
            return _e(b) + ".Consumer";
          case a:
            var x = h;
            return _e(x._context) + ".Provider";
          case c:
            return Se(h, h.render, "ForwardRef");
          case p:
            var k = h.displayName || null;
            return k !== null ? k : re(h.type) || "Memo";
          case m: {
            var H = h, G = H._payload, F = H._init;
            try {
              return re(F(G));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var q = Object.assign, $ = 0, Ue, he, Ee, se, je, Ne, Fe;
    function W() {
    }
    W.__reactDisabledLog = !0;
    function le() {
      {
        if ($ === 0) {
          Ue = console.log, he = console.info, Ee = console.warn, se = console.error, je = console.group, Ne = console.groupCollapsed, Fe = console.groupEnd;
          var h = {
            configurable: !0,
            enumerable: !0,
            value: W,
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
        $++;
      }
    }
    function Te() {
      {
        if ($--, $ === 0) {
          var h = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: q({}, h, {
              value: Ue
            }),
            info: q({}, h, {
              value: he
            }),
            warn: q({}, h, {
              value: Ee
            }),
            error: q({}, h, {
              value: se
            }),
            group: q({}, h, {
              value: je
            }),
            groupCollapsed: q({}, h, {
              value: Ne
            }),
            groupEnd: q({}, h, {
              value: Fe
            })
          });
        }
        $ < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var yt = g.ReactCurrentDispatcher, it;
    function zt(h, b, x) {
      {
        if (it === void 0)
          try {
            throw Error();
          } catch (H) {
            var k = H.stack.trim().match(/\n( *(at )?)/);
            it = k && k[1] || "";
          }
        return `
` + it + h;
      }
    }
    var ui = !1, Ht;
    {
      var wn = typeof WeakMap == "function" ? WeakMap : Map;
      Ht = new wn();
    }
    function Xi(h, b) {
      if (!h || ui)
        return "";
      {
        var x = Ht.get(h);
        if (x !== void 0)
          return x;
      }
      var k;
      ui = !0;
      var H = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var G;
      G = yt.current, yt.current = null, le();
      try {
        if (b) {
          var F = function() {
            throw Error();
          };
          if (Object.defineProperty(F.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(F, []);
            } catch (ze) {
              k = ze;
            }
            Reflect.construct(h, [], F);
          } else {
            try {
              F.call();
            } catch (ze) {
              k = ze;
            }
            h.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ze) {
            k = ze;
          }
          h();
        }
      } catch (ze) {
        if (ze && k && typeof ze.stack == "string") {
          for (var N = ze.stack.split(`
`), fe = k.stack.split(`
`), te = N.length - 1, ne = fe.length - 1; te >= 1 && ne >= 0 && N[te] !== fe[ne]; )
            ne--;
          for (; te >= 1 && ne >= 0; te--, ne--)
            if (N[te] !== fe[ne]) {
              if (te !== 1 || ne !== 1)
                do
                  if (te--, ne--, ne < 0 || N[te] !== fe[ne]) {
                    var we = `
` + N[te].replace(" at new ", " at ");
                    return h.displayName && we.includes("<anonymous>") && (we = we.replace("<anonymous>", h.displayName)), typeof h == "function" && Ht.set(h, we), we;
                  }
                while (te >= 1 && ne >= 0);
              break;
            }
        }
      } finally {
        ui = !1, yt.current = G, Te(), Error.prepareStackTrace = H;
      }
      var nt = h ? h.displayName || h.name : "", os = nt ? zt(nt) : "";
      return typeof h == "function" && Ht.set(h, os), os;
    }
    function xn(h, b, x) {
      return Xi(h, !1);
    }
    function On(h) {
      var b = h.prototype;
      return !!(b && b.isReactComponent);
    }
    function Yt(h, b, x) {
      if (h == null)
        return "";
      if (typeof h == "function")
        return Xi(h, On(h));
      if (typeof h == "string")
        return zt(h);
      switch (h) {
        case l:
          return zt("Suspense");
        case d:
          return zt("SuspenseList");
      }
      if (typeof h == "object")
        switch (h.$$typeof) {
          case c:
            return xn(h.render);
          case p:
            return Yt(h.type, b, x);
          case m: {
            var k = h, H = k._payload, G = k._init;
            try {
              return Yt(G(H), b, x);
            } catch {
            }
          }
        }
      return "";
    }
    var Bt = Object.prototype.hasOwnProperty, $i = {}, Ki = g.ReactDebugCurrentFrame;
    function Vt(h) {
      if (h) {
        var b = h._owner, x = Yt(h.type, h._source, b ? b.type : null);
        Ki.setExtraStackFrame(x);
      } else
        Ki.setExtraStackFrame(null);
    }
    function Tn(h, b, x, k, H) {
      {
        var G = Function.call.bind(Bt);
        for (var F in h)
          if (G(h, F)) {
            var N = void 0;
            try {
              if (typeof h[F] != "function") {
                var fe = Error((k || "React class") + ": " + x + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw fe.name = "Invariant Violation", fe;
              }
              N = h[F](b, F, k, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (te) {
              N = te;
            }
            N && !(N instanceof Error) && (Vt(H), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", k || "React class", x, F, typeof N), Vt(null)), N instanceof Error && !(N.message in $i) && ($i[N.message] = !0, Vt(H), v("Failed %s type: %s", x, N.message), Vt(null));
          }
      }
    }
    var Mn = Array.isArray;
    function pi(h) {
      return Mn(h);
    }
    function Pn(h) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, x = b && h[Symbol.toStringTag] || h.constructor.name || "Object";
        return x;
      }
    }
    function An(h) {
      try {
        return qi(h), !1;
      } catch {
        return !0;
      }
    }
    function qi(h) {
      return "" + h;
    }
    function Qi(h) {
      if (An(h))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pn(h)), qi(h);
    }
    var bt = g.ReactCurrentOwner, Dn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ji, es, mi;
    mi = {};
    function Rn(h) {
      if (Bt.call(h, "ref")) {
        var b = Object.getOwnPropertyDescriptor(h, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return h.ref !== void 0;
    }
    function In(h) {
      if (Bt.call(h, "key")) {
        var b = Object.getOwnPropertyDescriptor(h, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return h.key !== void 0;
    }
    function Ln(h, b) {
      if (typeof h.ref == "string" && bt.current && b && bt.current.stateNode !== b) {
        var x = re(bt.current.type);
        mi[x] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', re(bt.current.type), h.ref), mi[x] = !0);
      }
    }
    function kn(h, b) {
      {
        var x = function() {
          Ji || (Ji = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        x.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function Un(h, b) {
      {
        var x = function() {
          es || (es = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        x.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var jn = function(h, b, x, k, H, G, F) {
      var N = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: h,
        key: b,
        ref: x,
        props: F,
        // Record the component responsible for creating this element.
        _owner: G
      };
      return N._store = {}, Object.defineProperty(N._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(N, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.defineProperty(N, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: H
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    };
    function Nn(h, b, x, k, H) {
      {
        var G, F = {}, N = null, fe = null;
        x !== void 0 && (Qi(x), N = "" + x), In(b) && (Qi(b.key), N = "" + b.key), Rn(b) && (fe = b.ref, Ln(b, H));
        for (G in b)
          Bt.call(b, G) && !Dn.hasOwnProperty(G) && (F[G] = b[G]);
        if (h && h.defaultProps) {
          var te = h.defaultProps;
          for (G in te)
            F[G] === void 0 && (F[G] = te[G]);
        }
        if (N || fe) {
          var ne = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          N && kn(F, ne), fe && Un(F, ne);
        }
        return jn(h, N, fe, H, k, bt.current, F);
      }
    }
    var fi = g.ReactCurrentOwner, ts = g.ReactDebugCurrentFrame;
    function st(h) {
      if (h) {
        var b = h._owner, x = Yt(h.type, h._source, b ? b.type : null);
        ts.setExtraStackFrame(x);
      } else
        ts.setExtraStackFrame(null);
    }
    var gi;
    gi = !1;
    function _i(h) {
      return typeof h == "object" && h !== null && h.$$typeof === e;
    }
    function is() {
      {
        if (fi.current) {
          var h = re(fi.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
    }
    function Fn(h) {
      {
        if (h !== void 0) {
          var b = h.fileName.replace(/^.*[\\\/]/, ""), x = h.lineNumber;
          return `

Check your code at ` + b + ":" + x + ".";
        }
        return "";
      }
    }
    var ss = {};
    function zn(h) {
      {
        var b = is();
        if (!b) {
          var x = typeof h == "string" ? h : h.displayName || h.name;
          x && (b = `

Check the top-level render call using <` + x + ">.");
        }
        return b;
      }
    }
    function ns(h, b) {
      {
        if (!h._store || h._store.validated || h.key != null)
          return;
        h._store.validated = !0;
        var x = zn(b);
        if (ss[x])
          return;
        ss[x] = !0;
        var k = "";
        h && h._owner && h._owner !== fi.current && (k = " It was passed a child from " + re(h._owner.type) + "."), st(h), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, k), st(null);
      }
    }
    function as(h, b) {
      {
        if (typeof h != "object")
          return;
        if (pi(h))
          for (var x = 0; x < h.length; x++) {
            var k = h[x];
            _i(k) && ns(k, b);
          }
        else if (_i(h))
          h._store && (h._store.validated = !0);
        else if (h) {
          var H = T(h);
          if (typeof H == "function" && H !== h.entries)
            for (var G = H.call(h), F; !(F = G.next()).done; )
              _i(F.value) && ns(F.value, b);
        }
      }
    }
    function Hn(h) {
      {
        var b = h.type;
        if (b == null || typeof b == "string")
          return;
        var x;
        if (typeof b == "function")
          x = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === p))
          x = b.propTypes;
        else
          return;
        if (x) {
          var k = re(b);
          Tn(x, h.props, "prop", k, h);
        } else if (b.PropTypes !== void 0 && !gi) {
          gi = !0;
          var H = re(b);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", H || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Yn(h) {
      {
        for (var b = Object.keys(h.props), x = 0; x < b.length; x++) {
          var k = b[x];
          if (k !== "children" && k !== "key") {
            st(h), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", k), st(null);
            break;
          }
        }
        h.ref !== null && (st(h), v("Invalid attribute `ref` supplied to `React.Fragment`."), st(null));
      }
    }
    function rs(h, b, x, k, H, G) {
      {
        var F = B(h);
        if (!F) {
          var N = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var fe = Fn(H);
          fe ? N += fe : N += is();
          var te;
          h === null ? te = "null" : pi(h) ? te = "array" : h !== void 0 && h.$$typeof === e ? (te = "<" + (re(h.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : te = typeof h, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", te, N);
        }
        var ne = Nn(h, b, x, H, G);
        if (ne == null)
          return ne;
        if (F) {
          var we = b.children;
          if (we !== void 0)
            if (k)
              if (pi(we)) {
                for (var nt = 0; nt < we.length; nt++)
                  as(we[nt], h);
                Object.freeze && Object.freeze(we);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              as(we, h);
        }
        return h === i ? Yn(ne) : Hn(ne), ne;
      }
    }
    function Bn(h, b, x) {
      return rs(h, b, x, !0);
    }
    function Vn(h, b, x) {
      return rs(h, b, x, !1);
    }
    var Zn = Vn, Wn = Bn;
    wt.Fragment = i, wt.jsx = Zn, wt.jsxs = Wn;
  }()), wt;
}
process.env.NODE_ENV === "production" ? Ni.exports = cr() : Ni.exports = hr();
var u = Ni.exports;
function yn(s) {
  return s.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: s.title } }) : /* @__PURE__ */ u.jsx("button", { children: s.title });
}
const dr = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), ur = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function pr(s) {
  return /* @__PURE__ */ u.jsx(gn.Item, { value: s.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    ur,
    /* @__PURE__ */ u.jsx("span", { children: s.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      s.onDelete(s.index);
    }, children: dr })
  ] }) }, s.title);
}
function mr(s) {
  const [e, t] = Z(!1), [i, n] = Z(s.options), r = (l) => {
    s.onDragComplete(l), n(l);
  }, a = (l) => {
    const d = [...i];
    d.splice(l, 1), r(d);
  }, o = [];
  i.forEach((l, d) => {
    o.push(/* @__PURE__ */ u.jsx(pr, { index: d, title: l, onDelete: a }, l));
  });
  let c = "dropdown draggable";
  return s.subdropdown && (c += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: c, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ u.jsx(yn, { title: s.title }),
    /* @__PURE__ */ u.jsx(gn.Group, { axis: "y", values: i, onReorder: r, style: { visibility: e ? "visible" : "hidden" }, children: o })
  ] });
}
function fr(s) {
  const [e, t] = Z(!1), i = [];
  s.options.map((r, a) => {
    s.onSelect !== void 0 && (r.onSelect = s.onSelect), i.push(/* @__PURE__ */ u.jsx(gr, { option: r }, a));
  });
  let n = "dropdown";
  return s.subdropdown && (n += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ u.jsx(yn, { title: s.title }),
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
function gr(s) {
  const { option: e } = s, [t, i] = Z("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ u.jsx(
        mr,
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
        fr,
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
  return /* @__PURE__ */ u.jsx("li", { className: t === e.title ? "selected" : "", children: n }, za());
}
function Wo(s, e, t) {
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
function oi(s) {
  const [e, t] = Z(s.open !== void 0 ? s.open : !0), i = !e || s.children === void 0, n = () => {
    D.dispatchEvent({ type: A.REMOVE_SCENE, value: s.scene });
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
          /* @__PURE__ */ u.jsx("p", { className: "label", children: ri(s.label) })
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
function bn(s) {
  const e = J(null), [t, i] = Z(!1), n = s.child !== void 0 && s.child.children.length > 0, r = [];
  return s.child !== void 0 && s.child.children.length > 0 && s.child.children.map((a, o) => {
    r.push(/* @__PURE__ */ u.jsx(bn, { child: a, three: s.three }, o));
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
                  e.current.style.opacity = l ? "1" : "0.25", s.three.updateObject(s.child.uuid, c, l), ie(o, c, l);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${nr(s.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function Es(s) {
  const e = [];
  return s.child?.children.map((t, i) => {
    e.push(/* @__PURE__ */ u.jsx(bn, { child: t, scene: s.scene, three: s.three }, i));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${s.class !== void 0 ? s.class : ""}`, children: e });
}
function It(s) {
  const [e, t] = Z(s.defaultValue);
  return tt(() => {
    let i = !1, n = -1, r = 0, a = s.defaultValue, o = !1;
    const c = (f) => {
      o = f.ctrlKey;
    }, l = (f) => {
      i = !0, r = Number(s.input.current?.value), n = f.clientX, document.addEventListener("mouseup", p, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("contextmenu", p, !1);
    }, d = (f) => {
      if (!i)
        return;
      const C = s.step !== void 0 ? s.step : 1, y = (f.clientX - n) * C * (o ? 10 : 1);
      a = Number((r + y).toFixed(4)), s.min !== void 0 && (a = Math.max(a, s.min)), s.max !== void 0 && (a = Math.min(a, s.max)), s.onChange !== void 0 && s.onChange(a), t(a);
    }, p = () => {
      i = !1, document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", p);
    }, m = (f) => {
      const C = Number(f.target.value);
      s.onChange !== void 0 && s.onChange(C), t(C);
    };
    return s.label.current?.addEventListener("mousedown", l, !1), s.sliderRef !== void 0 && s.sliderRef.current?.addEventListener("input", m), document.addEventListener("keydown", c, !1), document.addEventListener("keyup", c, !1), () => {
      s.label.current?.removeEventListener("mousedown", l), s.sliderRef !== void 0 && s.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", p), document.removeEventListener("keydown", c), document.addEventListener("keyup", c, !1);
    };
  }, []), e;
}
function Qe(s) {
  const e = J(null), t = J(null), [i, n] = Z(s.value);
  return It({
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
          value: i.toString(),
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
          value: i,
          min: s.min,
          max: s.max,
          step: s.step,
          ref: t,
          onChange: ai
        }
      )
    ] })
  ] });
}
function _r(s) {
  const e = J(null), t = J(null), i = J(null), n = J(null), r = J(null), a = J(null), o = J(null), c = J(null), l = J(null), d = J(null), [p, m] = Z(s.value.x), [f, C] = Z(s.value.y), [y, T] = Z({
    min: Math.min(s.min, Math.min(s.value.x, s.value.y)),
    max: Math.max(s.max, Math.max(s.value.x, s.value.y))
  }), [g, v] = Z(!1);
  It({
    label: o,
    input: e,
    defaultValue: p,
    min: y.min,
    max: y.max,
    step: 0.01,
    onChange: (R) => {
      m(R), s.onChange({ target: { value: { x: R, y: f } } });
    }
  }), It({
    label: c,
    input: t,
    defaultValue: f,
    min: y.min,
    max: y.max,
    step: 0.01,
    onChange: (R) => {
      C(R), s.onChange({ target: { value: { x: p, y: R } } });
    }
  }), It({
    label: l,
    input: i,
    defaultValue: y.min,
    min: y.min - 1,
    max: y.max + 1,
    step: 0.01,
    onChange: (R) => {
      T({ min: R, max: y.max });
    }
  }), It({
    label: d,
    input: n,
    defaultValue: y.max,
    min: y.min - 1,
    max: y.max + 1,
    step: 0.01,
    onChange: (R) => {
      T({ min: y.min, max: R });
    }
  });
  function S() {
    g || (window.addEventListener("mousemove", w), window.addEventListener("mouseup", E), v(!0));
  }
  function E() {
    window.removeEventListener("mousemove", w), window.removeEventListener("mouseup", E), v(!1);
  }
  function w(R) {
    const B = r.current.getBoundingClientRect(), Se = $e(0, 99, R.clientX - B.left) / 99, _e = 1 - $e(0, 99, R.clientY - B.top) / 99, re = Pe(ki(y.min, y.max, Se), 3), q = Pe(ki(y.min, y.max, _e), 3);
    s.onChange({ target: { value: { x: re, y: q } } }), m(re), C(q);
  }
  function O() {
    const R = Number(i.current.value);
    T({ min: R, max: y.max }), p < R && m($e(R, y.max, p)), f < R && C($e(R, y.max, f));
  }
  function L() {
    const R = Number(n.current.value);
    T({ min: y.min, max: R }), p > R && m($e(y.min, R, p)), f > R && C($e(y.min, R, f));
  }
  tt(() => {
    a.current.style.left = `${_s(y.min, y.max, p) * 100}%`, a.current.style.top = `${(1 - _s(y.min, y.max, f)) * 100}%`;
  }, [y, p, f]);
  const j = s.step !== void 0 ? s.step : 0.01;
  return /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: o, children: "X" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: p,
            min: y.min,
            max: y.max,
            step: j,
            onChange: (R) => {
              if (m(R.target.value), R.target.value.length === 0)
                return;
              const B = Number(R.target.value);
              isNaN(B) || (s.onChange({ target: { value: { x: B, y: f } } }), B < y.min && T({ min: B, max: y.max }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: c, children: "Y" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: f,
            min: y.min,
            max: y.max,
            step: j,
            onChange: (R) => {
              if (C(R.target.value), R.target.value.length === 0)
                return;
              const B = Number(R.target.value);
              isNaN(B) || (s.onChange({ target: { value: { x: p, y: B } } }), B > y.max && T({ min: y.min, max: B }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: l, children: "Min" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: i,
            type: "number",
            value: y.min,
            step: j,
            onChange: O
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: d, children: "Max" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: y.max,
            step: j,
            onChange: L
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: r, onMouseDown: S, onMouseUp: E, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: a })
    ] })
  ] });
}
const vr = Math.PI / 180, yr = 180 / Math.PI;
function ot(s, e, t, i, n) {
  return i + (s - e) * (n - i) / (t - e);
}
function lt(s, e, t) {
  return (1 - t) * s + t * e;
}
function Fi(s) {
  return s * vr;
}
function br(s) {
  return s * yr;
}
function Cs(s) {
  const e = s.value.x !== void 0 && s.value.y !== void 0 && s.value.z !== void 0, t = s.value.isEuler !== void 0, i = s.value.elements !== void 0, n = s.step !== void 0 ? s.step : 0.01, r = [];
  if (t) {
    const a = jt(() => s.value, []);
    ["_x", "_y", "_z"].forEach((c) => {
      const l = J(null);
      r.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Qe,
            {
              value: br(a[c]),
              type: "number",
              prop: c,
              step: 0.1,
              labelRef: l,
              onChange: (d, p) => {
                a[d] = Fi(p), s.onChange({ target: { value: a } });
              }
            }
          )
        ] }, c)
      );
    });
  } else if (e) {
    const a = jt(() => s.value, []), o = (l, d) => {
      a[l] = d, s.onChange({ target: { value: a } });
    };
    ["x", "y", "z"].forEach((l) => {
      const d = J(null);
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
    const a = jt(() => s.value, []), o = (c, l) => {
      const d = Number(c);
      a.elements[d] = l, s.onChange({ target: { value: a } });
    };
    for (let c = 0; c < 9; c++) {
      const l = J(null);
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
function Er(s) {
  const e = s.value.x !== void 0, t = s.step !== void 0 ? s.step : 0.01, i = [];
  if (e) {
    const n = jt(() => s.value, []), r = (o, c) => {
      n[o] = c, s.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const c = J(null);
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
    const n = jt(() => s.value, []), r = (a, o) => {
      const c = Number(a);
      n.elements[c] = o, s.onChange({ target: { value: n } });
    };
    for (let a = 0; a < 16; a++) {
      const o = J(null);
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
function Cr(s) {
  return !(s === "defaultAttributeValues" || s === "forceSinglePass" || s === "linecap" || s === "linejoin" || s === "linewidth" || s === "normalMapType" || s === "precision" || s === "shadowSide" || s === "uniformsGroups" || s === "uniformsNeedUpdate" || s === "userData" || s === "version" || s === "wireframeLinecap" || s === "wireframeLinejoin" || s === "wireframeLinewidth" || s.slice(0, 4) === "clip" || s.slice(0, 7) === "polygon" || s.slice(0, 7) === "stencil" || s.slice(0, 2) === "is");
}
function Sr(s) {
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
function hi(s) {
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
function En(s) {
  const e = s.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function wr() {
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
const xr = [
  {
    title: "Front",
    value: Qn
  },
  {
    title: "Back",
    value: Xs
  },
  {
    title: "Double",
    value: Bi
  }
], Or = [
  {
    title: "No Blending",
    value: Jn
  },
  {
    title: "Normal",
    value: ea
  },
  {
    title: "Additive",
    value: ta
  },
  {
    title: "Subtractive",
    value: ia
  },
  {
    title: "Multiply",
    value: sa
  },
  {
    title: "Custom",
    value: na
  }
], Tr = [
  {
    title: "Add",
    value: aa
  },
  {
    title: "Subtract",
    value: ra
  },
  {
    title: "Reverse Subtract",
    value: oa
  },
  {
    title: "Min",
    value: la
  },
  {
    title: "Max",
    value: ca
  }
], Mr = [
  {
    title: "Zero",
    value: $s
  },
  {
    title: "One",
    value: Ks
  },
  {
    title: "Src Color",
    value: qs
  },
  {
    title: "One Minus Src Color",
    value: Qs
  },
  {
    title: "Src Alpha",
    value: Js
  },
  {
    title: "One Minus Src Alpha",
    value: en
  },
  {
    title: "Dst Alpha",
    value: tn
  },
  {
    title: "One Minus Dst Alpha",
    value: sn
  },
  {
    title: "Dst Color",
    value: nn
  },
  {
    title: "One Minus Dst Color",
    value: an
  },
  {
    title: "Src Alpha Saturate",
    value: ha
  },
  {
    title: "Constant Color",
    value: rn
  },
  {
    title: "One Minus Constant Color",
    value: on
  },
  {
    title: "Constant Alpha",
    value: ln
  },
  {
    title: "One Minus Constant Alpha",
    value: cn
  }
], Pr = [
  {
    title: "Zero",
    value: $s
  },
  {
    title: "One",
    value: Ks
  },
  {
    title: "Src Color",
    value: qs
  },
  {
    title: "One Minus Src Color",
    value: Qs
  },
  {
    title: "Src Alpha",
    value: Js
  },
  {
    title: "One Minus Src Alpha",
    value: en
  },
  {
    title: "Dst Alpha",
    value: tn
  },
  {
    title: "One Minus Dst Alpha",
    value: sn
  },
  {
    title: "Dst Color",
    value: nn
  },
  {
    title: "One Minus Dst Color",
    value: an
  },
  {
    title: "Constant Color",
    value: rn
  },
  {
    title: "One Minus Constant Color",
    value: on
  },
  {
    title: "Constant Alpha",
    value: ln
  },
  {
    title: "One Minus Constant Alpha",
    value: cn
  }
];
function xt(s, e) {
  s.needsUpdate = !0, s.type = "option", s.options = e;
}
function Ar(s, e, t, i) {
  return {
    type: "boolean",
    title: hi(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (n, r) => {
      i.updateObject(t.uuid, `material.${s}`, r), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const a = i.getScene(t.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", t.uuid);
        ie(o, `material.${s}`, r);
      }
    }
  };
}
function Dr(s, e, t, i) {
  const n = {
    type: "number",
    title: hi(s),
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
        ie(c, `material.${s}`, a);
      }
    }
  };
  switch (s) {
    case "blending":
      xt(n, Or);
      break;
    case "blendDst":
      xt(n, Pr);
      break;
    case "blendEquation":
      xt(n, Tr);
      break;
    case "blendSrc":
      xt(n, Mr);
      break;
    case "side":
      xt(n, xr);
      break;
  }
  return En(s) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function Rr(s, e, t, i) {
  const n = {
    type: "string",
    title: hi(s),
    prop: s,
    value: e,
    needsUpdate: !0,
    onChange: (a, o) => {
      i.updateObject(t.uuid, `material.${s}`, o), i.updateObject(t.uuid, "material.needsUpdate", !0);
      const c = i.getScene(t.uuid);
      if (c !== null) {
        const l = c.getObjectByProperty("uuid", t.uuid);
        ie(l, `material.${s}`, o);
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
      ie(l, `material.${s}`, o);
    }
  }, n.onKeyDown = (a) => {
    if (a.key === "Enter" && (a.altKey || a.metaKey)) {
      i.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = i.getScene(t.uuid);
      if (o !== null) {
        const c = o.getObjectByProperty("uuid", t.uuid);
        ie(c, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Ir(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z === void 0;
}
function Lr(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w === void 0;
}
function kr(s) {
  return s.x !== void 0 && s.y !== void 0 && s.z !== void 0 && s.w !== void 0;
}
function zi(s) {
  s.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function Lt(s, e, t, i, n = "", r = !1) {
  const a = hi(s).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${s}` : s, c = typeof e;
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
          ie(m, `material.${o}`, d);
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
          const f = m.getObjectByProperty("uuid", t.uuid);
          ie(f, `material.${o}`, p);
        }
      }
    };
    return En(a) && (l.type = "range", l.min = 0, l.max = 1), l;
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
            const f = m.getObjectByProperty("uuid", t.uuid);
            ie(f, `material.${o}`, p);
          }
        }
      };
    if (Array.isArray(e)) {
      const l = [];
      for (const d in e) {
        const p = e[d], m = `[${d.toString()}]`;
        if (p.value !== void 0) {
          const f = Lt(`${m}.value`, p.value, t, i, o, r);
          f !== void 0 && l.push(f);
        } else {
          const f = Lt(m, p, t, i, o, r);
          f !== void 0 && l.push(f);
        }
      }
      if (l.length > 0)
        return zi(l), {
          title: a,
          items: l
        };
    } else {
      if (Ir(e))
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
              ie(m, `material.${o}`, d);
            }
          }
        };
      if (Lr(e))
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
              ie(m, `material.${o}`, d);
            }
          }
        };
      if (kr(e))
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
              ie(m, `material.${o}`, d);
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
              ie(m, `material.${o}`, d);
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
            const p = Sr(s), m = n.length > 0 ? `${n}.${p}` : p;
            i.createTexture(t.uuid, `material.${m}`, d);
            const f = i.getScene(t.uuid);
            if (f !== null) {
              const C = f.getObjectByProperty("uuid", t.uuid);
              if (C !== void 0) {
                const y = (T) => {
                  const g = C.material, v = m.split(".");
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
                d.src.length > 0 ? vn(d.src).then((T) => {
                  T.offset.set(d.offset[0], d.offset[1]), T.repeat.set(d.repeat[0], d.repeat[1]), y(T);
                }) : y(null);
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
              ie(m, `material.${o}`, d);
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
                const f = Lt(`${p}.value`, m.value, t, i, o, d);
                f !== void 0 && l.push(f);
              } else {
                const f = Lt(p, m, t, i, o, d);
                f !== void 0 && l.push(f);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", s, e);
        }
        if (l.length > 0)
          return zi(l), {
            title: a,
            items: l
          };
      }
    }
  }
}
function Ss(s, e, t) {
  const i = [];
  for (const n in s) {
    if (!Cr(n))
      continue;
    const r = typeof s[n], a = s[n];
    if (r === "boolean")
      i.push(Ar(n, a, e, t));
    else if (r === "number")
      i.push(Dr(n, a, e, t));
    else if (r === "string")
      i.push(Rr(n, a, e, t));
    else if (r === "object") {
      const o = Lt(n, a, e, t);
      o !== void 0 && i.push(o);
    } else
      a !== void 0 && console.log("other:", n, r, a);
  }
  return zi(i), i.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const r = n.getObjectByProperty("uuid", e.uuid);
        ie(r, "material.needsUpdate", !0);
      }
    }
  }), i;
}
function Ur(s, e) {
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
          Oe,
          {
            title: `Material ${l}`,
            items: Ss(a[l], s, e)
          },
          `Material ${l}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: o });
  } else
    return /* @__PURE__ */ u.jsx(
      Oe,
      {
        title: "Material",
        items: Ss(a, s, e),
        expanded: n,
        onToggle: (o) => {
          r(o);
        }
      }
    );
}
const ws = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function jr(s) {
  const e = s.step !== void 0 ? s.step : 0.01, t = J(null), i = J(null), n = J(null), r = J(null), a = J(null), [o] = Z(s.value), [c, l] = Z(s.value.offset[0]), [d, p] = Z(s.value.offset[1]), [m, f] = Z(s.value.repeat[0]), [C, y] = Z(s.value.repeat[1]);
  function T(v, S, E, w, O) {
    if (s.onChange !== void 0) {
      const L = s.prop !== void 0 ? s.prop : s.title;
      s.onChange(L, {
        src: v,
        offset: [S, E],
        repeat: [w, O]
      });
    }
  }
  function g(v) {
    const S = t.current.src, E = v.target.value;
    switch (v.target) {
      case i.current:
        l(E), T(S, E, d, m, C);
        break;
      case n.current:
        p(E), T(S, c, E, m, C);
        break;
      case r.current:
        f(E), T(S, c, d, E, C);
        break;
      case a.current:
        y(E), T(S, c, d, m, E);
        break;
    }
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ u.jsx("img", { alt: s.title, ref: t, onClick: () => {
      wr().then((v) => {
        t.current.src = v, T(v, c, d, m, C);
      });
    }, src: o.src.length > 0 ? o.src : ws }),
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
            onChange: g
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: d,
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
            ref: r,
            type: "number",
            value: m,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: a,
            type: "number",
            value: C,
            step: e,
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ u.jsx("button", { onClick: () => {
        T("", c, d, m, C), t.current.src = ws;
      }, children: "Clear" })
    ] })
  ] });
}
function ii(s) {
  let e = s.value;
  e !== void 0 && (e.isColor !== void 0 ? e = ps(s.value) : s.type === "color" && (e = ps(new et().setStyle(s.value, Nt))));
  const [t, i] = Z(e), n = J(null), r = (l) => {
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
    s.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: n, children: ri(s.title) }, "fieldLabel"),
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
    s.type === "image" && /* @__PURE__ */ u.jsx(jr, { title: s.title, prop: s.prop, value: s.value, onChange: s.onChange }),
    s.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: r, disabled: s.disabled, defaultValue: s.value, children: s.options?.map((l, d) => /* @__PURE__ */ u.jsx("option", { value: l.value, children: ri(l.title) }, d)) }) }),
    s.type === "vector2" && /* @__PURE__ */ u.jsx(_r, { step: s.step, value: t, min: 0, max: 1, onChange: r }),
    s.type === "grid3" && /* @__PURE__ */ u.jsx(Cs, { step: s.step, value: t, onChange: r }),
    s.type === "grid4" && /* @__PURE__ */ u.jsx(Er, { step: s.step, value: t, onChange: r }),
    s.type === "euler" && /* @__PURE__ */ u.jsx(Cs, { step: s.step, value: t, onChange: r })
  ] });
}
function Nr(s) {
  return "items" in s;
}
class Oe extends Ft {
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
      Oe,
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
      if (Nr(t))
        e.push(
          /* @__PURE__ */ u.jsx(Oe, { title: ri(t.title), items: t.items }, Math.random())
        );
      else {
        const i = this.valueOverrides.get(t.title), n = i !== void 0 ? i : t.value;
        e.push(
          /* @__PURE__ */ u.jsx(
            ii,
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
      oi,
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
class ae extends Ft {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, ae.instance = this, D.addEventListener(A.ADD_GROUP, this.addGroup), D.addEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    D.removeEventListener(A.ADD_GROUP, this.addGroup), D.removeEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ u.jsx("div", { className: "customGroups", children: ae.groups }, this.state.lastUpdate);
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
    }), ae.groups.push(
      /* @__PURE__ */ u.jsx(
        Oe,
        {
          title: t.title,
          items: i
        },
        Math.random()
      )
    ), ae.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, i = ae.groupTitles.length;
    for (let n = 0; n < i; n++)
      if (t === ae.groupTitles[n]) {
        ae.groups.splice(n, 1), ae.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
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
      Oe,
      {
        ref: i,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return ae.groups.push(n), ae.groupsRefs.push(i), ae.groupTitles.push(e.title), i;
  }
  static removeEditorGroup(e) {
    const t = ae.groupTitles.length;
    for (let i = 0; i < t; i++)
      if (e === ae.groupTitles[i]) {
        ae.groups.splice(i, 1), ae.groupTitles.splice(i, 1), ae.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
}
function xs(s) {
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
function Fr(s, e) {
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
        title: xs(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(s.uuid, c, l), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const d = e.getScene(s.uuid);
          if (d !== null) {
            const p = d.getObjectByProperty("uuid", s.uuid);
            p !== void 0 && (ie(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  else if (s.orthographicCameraInfo !== void 0)
    for (const o in s.orthographicCameraInfo)
      a.push({
        title: xs(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: s.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(s.uuid, c, l), e.requestMethod(s.uuid, "updateProjectionMatrix");
          const d = e.getScene(s.uuid);
          if (d !== null) {
            const p = d.getObjectByProperty("uuid", s.uuid);
            p !== void 0 && (ie(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ u.jsx(
    Oe,
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
class zr extends Ie {
  constructor(e, t) {
    const i = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new _t();
    n.setAttribute("position", new qe(i, 3)), n.computeBoundingSphere();
    const r = new Vi({ fog: !1 });
    super(n, r), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const a = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new _t();
    o.setAttribute("position", new qe(a, 3)), o.computeBoundingSphere(), this.add(new M(o, new Je({ side: Xs, fog: !1 })));
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
const Os = { type: "change" }, Gi = { type: "start" }, Cn = { type: "end" }, Wt = new da(), Ts = new ua(), Hr = Math.cos(70 * pa.DEG2RAD), oe = new P(), ye = 2 * Math.PI, V = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Ci = 1e-6;
class Yr extends hn {
  constructor(e, t = null) {
    super(e, t), this.state = V.NONE, this.enabled = !0, this.target = new P(), this.cursor = new P(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: gt.ROTATE, MIDDLE: gt.DOLLY, RIGHT: gt.PAN }, this.touches = { ONE: ft.ROTATE, TWO: ft.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new P(), this._lastQuaternion = new Ce(), this._lastTargetPosition = new P(), this._quat = new Ce().setFromUnitVectors(e.up, new P(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Li(), this._sphericalDelta = new Li(), this._scale = 1, this._panOffset = new P(), this._rotateStart = new pe(), this._rotateEnd = new pe(), this._rotateDelta = new pe(), this._panStart = new pe(), this._panEnd = new pe(), this._panDelta = new pe(), this._dollyStart = new pe(), this._dollyEnd = new pe(), this._dollyDelta = new pe(), this._dollyDirection = new P(), this._mouse = new pe(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Vr.bind(this), this._onPointerDown = Br.bind(this), this._onPointerUp = Zr.bind(this), this._onContextMenu = Qr.bind(this), this._onMouseWheel = Xr.bind(this), this._onKeyDown = $r.bind(this), this._onTouchStart = Kr.bind(this), this._onTouchMove = qr.bind(this), this._onMouseDown = Wr.bind(this), this._onMouseMove = Gr.bind(this), this._interceptControlDown = Jr.bind(this), this._interceptControlUp = eo.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Os), this.update(), this.state = V.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    oe.copy(t).sub(this.target), oe.applyQuaternion(this._quat), this._spherical.setFromVector3(oe), this.autoRotate && this.state === V.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(i) && isFinite(n) && (i < -Math.PI ? i += ye : i > Math.PI && (i -= ye), n < -Math.PI ? n += ye : n > Math.PI && (n -= ye), i <= n ? this._spherical.theta = Math.max(i, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + n) / 2 ? Math.max(i, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (oe.setFromSpherical(this._spherical), oe.applyQuaternion(this._quatInverse), t.copy(this.target).add(oe), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = oe.length();
        a = this._clampDistance(o * this._scale);
        const c = o - a;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), r = !!c;
      } else if (this.object.isOrthographicCamera) {
        const o = new P(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = c !== this.object.zoom;
        const l = new P(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(o), this.object.updateMatrixWorld(), a = oe.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (Wt.origin.copy(this.object.position), Wt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Wt.direction)) < Hr ? this.object.lookAt(this.target) : (Ts.setFromNormalAndCoplanarPoint(this.object.up, this.target), Wt.intersectPlane(Ts, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > Ci || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Ci || this._lastTargetPosition.distanceToSquared(this.target) > Ci ? (this.dispatchEvent(Os), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? ye / 60 * this.autoRotateSpeed * e : ye / 60 / 60 * this.autoRotateSpeed;
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
    oe.setFromMatrixColumn(t, 0), oe.multiplyScalar(-e), this._panOffset.add(oe);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? oe.setFromMatrixColumn(t, 1) : (oe.setFromMatrixColumn(t, 0), oe.crossVectors(this.object.up, oe)), oe.multiplyScalar(e), this._panOffset.add(oe);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      oe.copy(n).sub(this.target);
      let r = oe.length();
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
    this._rotateLeft(ye * this._rotateDelta.x / t.clientHeight), this._rotateUp(ye * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(ye * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-ye * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(ye * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-ye * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
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
    this._rotateLeft(ye * this._rotateDelta.x / t.clientHeight), this._rotateUp(ye * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    t === void 0 && (t = new pe(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function Br(s) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(s) && (this._addPointer(s), s.pointerType === "touch" ? this._onTouchStart(s) : this._onMouseDown(s)));
}
function Vr(s) {
  this.enabled !== !1 && (s.pointerType === "touch" ? this._onTouchMove(s) : this._onMouseMove(s));
}
function Zr(s) {
  switch (this._removePointer(s), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Cn), this.state = V.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Wr(s) {
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
    case gt.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(s), this.state = V.DOLLY;
      break;
    case gt.ROTATE:
      if (s.ctrlKey || s.metaKey || s.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(s), this.state = V.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(s), this.state = V.ROTATE;
      }
      break;
    case gt.PAN:
      if (s.ctrlKey || s.metaKey || s.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(s), this.state = V.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(s), this.state = V.PAN;
      }
      break;
    default:
      this.state = V.NONE;
  }
  this.state !== V.NONE && this.dispatchEvent(Gi);
}
function Gr(s) {
  switch (this.state) {
    case V.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(s);
      break;
    case V.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(s);
      break;
    case V.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(s);
      break;
  }
}
function Xr(s) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== V.NONE || (s.preventDefault(), this.dispatchEvent(Gi), this._handleMouseWheel(this._customWheelEvent(s)), this.dispatchEvent(Cn));
}
function $r(s) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(s);
}
function Kr(s) {
  switch (this._trackPointer(s), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ft.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(s), this.state = V.TOUCH_ROTATE;
          break;
        case ft.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(s), this.state = V.TOUCH_PAN;
          break;
        default:
          this.state = V.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case ft.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(s), this.state = V.TOUCH_DOLLY_PAN;
          break;
        case ft.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(s), this.state = V.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = V.NONE;
      }
      break;
    default:
      this.state = V.NONE;
  }
  this.state !== V.NONE && this.dispatchEvent(Gi);
}
function qr(s) {
  switch (this._trackPointer(s), this.state) {
    case V.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(s), this.update();
      break;
    case V.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(s), this.update();
      break;
    case V.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(s), this.update();
      break;
    case V.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(s), this.update();
      break;
    default:
      this.state = V.NONE;
  }
}
function Qr(s) {
  this.enabled !== !1 && s.preventDefault();
}
function Jr(s) {
  s.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function eo(s) {
  s.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const ee = {
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
}), ct = {
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
const ht = Math.PI * 2, Ms = Math.PI / 2, Sn = 1e-5, Ot = Math.PI / 180;
function Me(s, e, t) {
  return Math.max(e, Math.min(t, s));
}
function K(s, e = Sn) {
  return Math.abs(s) < e;
}
function Y(s, e, t = Sn) {
  return K(s - e, t);
}
function Ps(s, e) {
  return Math.round(s / e) * e;
}
function Tt(s) {
  return isFinite(s) ? s : s < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Mt(s) {
  return Math.abs(s) < Number.MAX_VALUE ? s : s * (1 / 0);
}
function Gt(s, e, t, i, n = 1 / 0, r) {
  i = Math.max(1e-4, i);
  const a = 2 / i, o = a * r, c = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let l = s - e;
  const d = e, p = n * i;
  l = Me(l, -p, p), e = s - l;
  const m = (t.value + a * l) * r;
  t.value = (t.value - a * m) * c;
  let f = e + (l + m) * c;
  return d - s > 0 == f > d && (f = d, t.value = (f - d) / r), f;
}
function As(s, e, t, i, n = 1 / 0, r, a) {
  i = Math.max(1e-4, i);
  const o = 2 / i, c = o * r, l = 1 / (1 + c + 0.48 * c * c + 0.235 * c * c * c);
  let d = e.x, p = e.y, m = e.z, f = s.x - d, C = s.y - p, y = s.z - m;
  const T = d, g = p, v = m, S = n * i, E = S * S, w = f * f + C * C + y * y;
  if (w > E) {
    const $ = Math.sqrt(w);
    f = f / $ * S, C = C / $ * S, y = y / $ * S;
  }
  d = s.x - f, p = s.y - C, m = s.z - y;
  const O = (t.x + o * f) * r, L = (t.y + o * C) * r, j = (t.z + o * y) * r;
  t.x = (t.x - o * O) * l, t.y = (t.y - o * L) * l, t.z = (t.z - o * j) * l, a.x = d + (f + O) * l, a.y = p + (C + L) * l, a.z = m + (y + j) * l;
  const R = T - s.x, B = g - s.y, Se = v - s.z, _e = a.x - T, re = a.y - g, q = a.z - v;
  return R * _e + B * re + Se * q > 0 && (a.x = T, a.y = g, a.z = v, t.x = (a.x - T) / r, t.y = (a.y - g) / r, t.z = (a.z - v) / r), a;
}
function Si(s, e) {
  e.set(0, 0), s.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= s.length, e.y /= s.length;
}
function wi(s, e) {
  return Be(s) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class to {
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
var xi;
const io = "2.9.0", Xt = 1 / 8, so = /Mac/.test((xi = globalThis?.navigator) === null || xi === void 0 ? void 0 : xi.platform);
let I, Ds, $t, Oi, be, U, z, dt, Pt, Ae, De, We, Rs, Is, xe, At, ut, Ls, Ti, ks, Mi, Pi, Kt;
class ke extends to {
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
    I = e.THREE, Ds = Object.freeze(new I.Vector3(0, 0, 0)), $t = Object.freeze(new I.Vector3(0, 1, 0)), Oi = Object.freeze(new I.Vector3(0, 0, 1)), be = new I.Vector2(), U = new I.Vector3(), z = new I.Vector3(), dt = new I.Vector3(), Pt = new I.Vector3(), Ae = new I.Vector3(), De = new I.Vector3(), We = new I.Vector3(), Rs = new I.Vector3(), Is = new I.Vector3(), xe = new I.Spherical(), At = new I.Spherical(), ut = new I.Box3(), Ls = new I.Box3(), Ti = new I.Sphere(), ks = new I.Quaternion(), Mi = new I.Quaternion(), Pi = new I.Matrix4(), Kt = new I.Raycaster();
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
    }, this._enabled = !0, this._state = _.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = ct.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new I.Vector3(), this._focalOffsetVelocity = new I.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (g, v, S) => {
      let E, w;
      if (Ze(this._camera)) {
        const O = U.copy(this._camera.position).sub(this._target), L = this._camera.getEffectiveFOV() * Ot, j = O.length() * Math.tan(L * 0.5);
        E = this.truckSpeed * g * j / this._elementRect.height, w = this.truckSpeed * v * j / this._elementRect.height;
      } else if (Be(this._camera)) {
        const O = this._camera;
        E = g * (O.right - O.left) / O.zoom / this._elementRect.width, w = v * (O.top - O.bottom) / O.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (S ? this.setFocalOffset(this._focalOffsetEnd.x + E, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(E, 0, !0), this.forward(-w, !0)) : S ? this.setFocalOffset(this._focalOffsetEnd.x + E, this._focalOffsetEnd.y + w, this._focalOffsetEnd.z, !0) : this.truck(E, w, !0);
    }, this._rotateInternal = (g, v) => {
      const S = ht * this.azimuthRotateSpeed * g / this._elementRect.height, E = ht * this.polarRotateSpeed * v / this._elementRect.height;
      this.rotate(S, E, !0);
    }, this._dollyInternal = (g, v, S) => {
      const E = Math.pow(0.95, -g * this.dollySpeed), w = this._sphericalEnd.radius, O = this._sphericalEnd.radius * E, L = Me(O, this.minDistance, this.maxDistance), j = L - O;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(O, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(j, !0), this._dollyToNoClamp(L, !0)) : this._dollyToNoClamp(L, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? O : L) - w, this._dollyControlCoord.set(v, S)), this._lastDollyDirection = Math.sign(-g);
    }, this._zoomInternal = (g, v, S) => {
      const E = Math.pow(0.95, g * this.dollySpeed), w = this._zoom, O = this._zoom * E;
      this.zoomTo(O, !0), this.dollyToCursor && (this._changedZoom += O - w, this._dollyControlCoord.set(v, S));
    }, typeof I > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new I.Quaternion().setFromUnitVectors(this._camera.up, $t), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = _.NONE, this._target = new I.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new I.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new I.Spherical().setFromVector3(U.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new I.Vector3(),
      new I.Vector3(),
      new I.Vector3(),
      new I.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new I.Box3(new I.Vector3(-1 / 0, -1 / 0, -1 / 0), new I.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new I.Vector2(), this.mouseButtons = {
      left: _.ROTATE,
      middle: _.DOLLY,
      right: _.TRUCK,
      wheel: Ze(this._camera) ? _.DOLLY : Be(this._camera) ? _.ZOOM : _.NONE
    }, this.touches = {
      one: _.TOUCH_ROTATE,
      two: Ze(this._camera) ? _.TOUCH_DOLLY_TRUCK : Be(this._camera) ? _.TOUCH_ZOOM_TRUCK : _.NONE,
      three: _.TOUCH_TRUCK
    };
    const i = new I.Vector2(), n = new I.Vector2(), r = new I.Vector2(), a = (g) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const E = this._domElement.getBoundingClientRect(), w = g.clientX / E.width, O = g.clientY / E.height;
        if (w < this._interactiveArea.left || w > this._interactiveArea.right || O < this._interactiveArea.top || O > this._interactiveArea.bottom)
          return;
      }
      const v = g.pointerType !== "mouse" ? null : (g.buttons & ee.LEFT) === ee.LEFT ? ee.LEFT : (g.buttons & ee.MIDDLE) === ee.MIDDLE ? ee.MIDDLE : (g.buttons & ee.RIGHT) === ee.RIGHT ? ee.RIGHT : null;
      if (v !== null) {
        const E = this._findPointerByMouseButton(v);
        E && this._disposePointer(E);
      }
      if ((g.buttons & ee.LEFT) === ee.LEFT && this._lockedPointer)
        return;
      const S = {
        pointerId: g.pointerId,
        clientX: g.clientX,
        clientY: g.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: v
      };
      this._activePointers.push(S), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), this._isDragging = !0, m(g);
    }, o = (g) => {
      g.cancelable && g.preventDefault();
      const v = g.pointerId, S = this._lockedPointer || this._findPointerById(v);
      if (S) {
        if (S.clientX = g.clientX, S.clientY = g.clientY, S.deltaX = g.movementX, S.deltaY = g.movementY, this._state = 0, g.pointerType === "touch")
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (g.buttons & ee.LEFT) === ee.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (g.buttons & ee.MIDDLE) === ee.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (g.buttons & ee.RIGHT) === ee.RIGHT && (this._state = this._state | this.mouseButtons.right);
        f();
      }
    }, c = (g) => {
      const v = this._findPointerById(g.pointerId);
      if (!(v && v === this._lockedPointer)) {
        if (v && this._disposePointer(v), g.pointerType === "touch")
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
        C();
      }
    };
    let l = -1;
    const d = (g) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === _.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), L = g.clientX / O.width, j = g.clientY / O.height;
        if (L < this._interactiveArea.left || L > this._interactiveArea.right || j < this._interactiveArea.top || j > this._interactiveArea.bottom)
          return;
      }
      if (g.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === _.ROTATE || this.mouseButtons.wheel === _.TRUCK) {
        const O = performance.now();
        l - O < 1e3 && this._getClientRect(this._elementRect), l = O;
      }
      const v = so ? -1 : -3, S = g.deltaMode === 1 ? g.deltaY / v : g.deltaY / (v * 10), E = this.dollyToCursor ? (g.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, w = this.dollyToCursor ? (g.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case _.ROTATE: {
          this._rotateInternal(g.deltaX, g.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case _.TRUCK: {
          this._truckInternal(g.deltaX, g.deltaY, !1), this._isUserControllingTruck = !0;
          break;
        }
        case _.OFFSET: {
          this._truckInternal(g.deltaX, g.deltaY, !0), this._isUserControllingOffset = !0;
          break;
        }
        case _.DOLLY: {
          this._dollyInternal(-S, E, w), this._isUserControllingDolly = !0;
          break;
        }
        case _.ZOOM: {
          this._zoomInternal(-S, E, w), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, p = (g) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === ke.ACTION.NONE) {
          const v = g instanceof PointerEvent ? g.pointerId : 0, S = this._findPointerById(v);
          S && this._disposePointer(S), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c);
          return;
        }
        g.preventDefault();
      }
    }, m = (g) => {
      if (!this._enabled)
        return;
      if (Si(this._activePointers, be), this._getClientRect(this._elementRect), i.copy(be), n.copy(be), this._activePointers.length >= 2) {
        const S = be.x - this._activePointers[1].clientX, E = be.y - this._activePointers[1].clientY, w = Math.sqrt(S * S + E * E);
        r.set(0, w);
        const O = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, L = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(O, L);
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
        !this._lockedPointer && (g.buttons & ee.LEFT) === ee.LEFT && (this._state = this._state | this.mouseButtons.left), (g.buttons & ee.MIDDLE) === ee.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (g.buttons & ee.RIGHT) === ee.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & _.ROTATE) === _.ROTATE || (this._state & _.TOUCH_ROTATE) === _.TOUCH_ROTATE || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & _.TRUCK) === _.TRUCK || (this._state & _.TOUCH_TRUCK) === _.TOUCH_TRUCK || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & _.DOLLY) === _.DOLLY || (this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & _.ZOOM) === _.ZOOM || (this._state & _.TOUCH_ZOOM) === _.TOUCH_ZOOM || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & _.OFFSET) === _.OFFSET || (this._state & _.TOUCH_OFFSET) === _.TOUCH_OFFSET || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, f = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, Si(this._activePointers, be);
      const v = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, S = v ? -v.deltaX : n.x - be.x, E = v ? -v.deltaY : n.y - be.y;
      if (n.copy(be), ((this._state & _.ROTATE) === _.ROTATE || (this._state & _.TOUCH_ROTATE) === _.TOUCH_ROTATE || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(S, E), this._isUserControllingRotate = !0), (this._state & _.DOLLY) === _.DOLLY || (this._state & _.ZOOM) === _.ZOOM) {
        const w = this.dollyToCursor ? (i.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, O = this.dollyToCursor ? (i.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, L = this.dollyDragInverted ? -1 : 1;
        (this._state & _.DOLLY) === _.DOLLY ? (this._dollyInternal(L * E * Xt, w, O), this._isUserControllingDolly = !0) : (this._zoomInternal(L * E * Xt, w, O), this._isUserControllingZoom = !0);
      }
      if ((this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_ZOOM) === _.TOUCH_ZOOM || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) {
        const w = be.x - this._activePointers[1].clientX, O = be.y - this._activePointers[1].clientY, L = Math.sqrt(w * w + O * O), j = r.y - L;
        r.set(0, L);
        const R = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, B = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(j * Xt, R, B), this._isUserControllingDolly = !0) : (this._zoomInternal(j * Xt, R, B), this._isUserControllingZoom = !0);
      }
      ((this._state & _.TRUCK) === _.TRUCK || (this._state & _.TOUCH_TRUCK) === _.TOUCH_TRUCK || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK) && (this._truckInternal(S, E, !1), this._isUserControllingTruck = !0), ((this._state & _.OFFSET) === _.OFFSET || (this._state & _.TOUCH_OFFSET) === _.TOUCH_OFFSET || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET) && (this._truckInternal(S, E, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, C = () => {
      Si(this._activePointers, be), n.copy(be), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", y), this._domElement.ownerDocument.addEventListener("pointerlockerror", T), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), m());
    }, this.unlockPointer = () => {
      var g, v, S;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (g = this._domElement) === null || g === void 0 || g.ownerDocument.exitPointerLock(), (v = this._domElement) === null || v === void 0 || v.ownerDocument.removeEventListener("pointerlockchange", y), (S = this._domElement) === null || S === void 0 || S.ownerDocument.removeEventListener("pointerlockerror", T), this.cancel();
    };
    const y = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, T = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (g) => {
      this._domElement = g, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", a), this._domElement.addEventListener("pointercancel", c), this._domElement.addEventListener("wheel", d, { passive: !1 }), this._domElement.addEventListener("contextmenu", p);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", a), this._domElement.removeEventListener("pointercancel", c), this._domElement.removeEventListener("wheel", d, { passive: !1 }), this._domElement.removeEventListener("contextmenu", p), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.removeEventListener("pointerlockchange", y), this._domElement.ownerDocument.removeEventListener("pointerlockerror", T));
    }, this.cancel = () => {
      this._state !== _.NONE && (this._state = _.NONE, this._activePointers.length = 0, C());
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
    this._interactiveArea.width = Me(e.width, 0, 1), this._interactiveArea.height = Me(e.height, 0, 1), this._interactiveArea.x = Me(e.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = Me(e.y, 0, 1 - this._interactiveArea.height);
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
    const n = Me(e, this.minAzimuthAngle, this.maxAzimuthAngle), r = Me(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = r, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, i || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const a = !i || Y(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && Y(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
    return this._isUserControllingDolly = !1, this._lastDollyDirection = ct.NONE, this._changedDolly = 0, this._dollyToNoClamp(Me(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const i = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const a = this._collisionTest(), o = Y(a, this._spherical.radius);
      if (!(i > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, a);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const r = !t || Y(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    this._targetEnd.add(this._getCameraDirection(Pt).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
    const i = !t || Y(this._target.x, this._targetEnd.x, this.restThreshold) && Y(this._target.y, this._targetEnd.y, this.restThreshold) && Y(this._target.z, this._targetEnd.z, this.restThreshold);
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
    this._isUserControllingZoom = !1, this._zoomEnd = Me(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, t || (this._zoom = this._zoomEnd);
    const i = !t || Y(this._zoom, this._zoomEnd, this.restThreshold);
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
    this._camera.updateMatrix(), Ae.setFromMatrixColumn(this._camera.matrix, 0), De.setFromMatrixColumn(this._camera.matrix, 1), Ae.multiplyScalar(e), De.multiplyScalar(-t);
    const n = U.copy(Ae).add(De), r = z.copy(this._targetEnd).add(n);
    return this.moveTo(r.x, r.y, r.z, i);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    U.setFromMatrixColumn(this._camera.matrix, 0), U.crossVectors(this._camera.up, U), U.multiplyScalar(e);
    const i = z.copy(this._targetEnd).add(U);
    return this.moveTo(i.x, i.y, i.z, t);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, t = !1) {
    return U.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + U.x, this._targetEnd.y + U.y, this._targetEnd.z + U.z, t);
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
    const r = U.set(e, t, i).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, r, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const a = !n || Y(this._target.x, this._targetEnd.x, this.restThreshold) && Y(this._target.y, this._targetEnd.y, this.restThreshold) && Y(this._target.z, this._targetEnd.z, this.restThreshold);
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
    const o = U.set(e, t, i).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
    const c = [], l = e.isBox3 ? ut.copy(e) : ut.setFromObject(e);
    l.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const d = Ps(this._sphericalEnd.theta, Ms), p = Ps(this._sphericalEnd.phi, Ms);
    c.push(this.rotateTo(d, p, t));
    const m = U.setFromSpherical(this._sphericalEnd).normalize(), f = ks.setFromUnitVectors(m, Oi), C = Y(Math.abs(m.y), 1);
    C && f.multiply(Mi.setFromAxisAngle($t, d)), f.multiply(this._yAxisUpSpaceInverse);
    const y = Ls.makeEmpty();
    z.copy(l.min).applyQuaternion(f), y.expandByPoint(z), z.copy(l.min).setX(l.max.x).applyQuaternion(f), y.expandByPoint(z), z.copy(l.min).setY(l.max.y).applyQuaternion(f), y.expandByPoint(z), z.copy(l.max).setZ(l.min.z).applyQuaternion(f), y.expandByPoint(z), z.copy(l.min).setZ(l.max.z).applyQuaternion(f), y.expandByPoint(z), z.copy(l.max).setY(l.min.y).applyQuaternion(f), y.expandByPoint(z), z.copy(l.max).setX(l.min.x).applyQuaternion(f), y.expandByPoint(z), z.copy(l.max).applyQuaternion(f), y.expandByPoint(z), y.min.x -= n, y.min.y -= a, y.max.x += r, y.max.y += o, f.setFromUnitVectors(Oi, m), C && f.premultiply(Mi.invert()), f.premultiply(this._yAxisUpSpace);
    const T = y.getSize(U), g = y.getCenter(z).applyQuaternion(f);
    if (Ze(this._camera)) {
      const v = this.getDistanceToFitBox(T.x, T.y, T.z, i);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.dollyTo(v, t)), c.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Be(this._camera)) {
      const v = this._camera, S = v.right - v.left, E = v.top - v.bottom, w = i ? Math.max(S / T.x, E / T.y) : Math.min(S / T.x, E / T.y);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.zoomTo(w, t)), c.push(this.setFocalOffset(0, 0, 0, t));
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
    const i = [], r = "isObject3D" in e ? ke.createBoundingSphere(e, Ti) : Ti.copy(e);
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
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = ct.NONE, this._changedDolly = 0;
    const c = z.set(n, r, a), l = U.set(e, t, i);
    this._targetEnd.copy(c), this._sphericalEnd.setFromVector3(l.sub(c).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const d = !o || Y(this._target.x, this._targetEnd.x, this.restThreshold) && Y(this._target.y, this._targetEnd.y, this.restThreshold) && Y(this._target.z, this._targetEnd.z, this.restThreshold) && Y(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && Y(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && Y(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  lerpLookAt(e, t, i, n, r, a, o, c, l, d, p, m, f, C = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = ct.NONE, this._changedDolly = 0;
    const y = U.set(n, r, a), T = z.set(e, t, i);
    xe.setFromVector3(T.sub(y).applyQuaternion(this._yAxisUpSpace));
    const g = dt.set(d, p, m), v = z.set(o, c, l);
    At.setFromVector3(v.sub(g).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(y.lerp(g, f));
    const S = At.theta - xe.theta, E = At.phi - xe.phi, w = At.radius - xe.radius;
    this._sphericalEnd.set(xe.radius + w * f, xe.phi + E * f, xe.theta + S * f), this.normalizeRotations(), this._needsUpdate = !0, C || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const O = !C || Y(this._target.x, this._targetEnd.x, this.restThreshold) && Y(this._target.y, this._targetEnd.y, this.restThreshold) && Y(this._target.z, this._targetEnd.z, this.restThreshold) && Y(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && Y(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && Y(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    const r = this.getPosition(U), a = this.setLookAt(r.x, r.y, r.z, e, t, i, n);
    return this._sphericalEnd.phi = Me(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), a;
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
    const r = !n || Y(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && Y(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && Y(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
    this._camera.updateMatrixWorld(), Ae.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), De.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), We.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = U.set(e, t, i), r = n.distanceTo(this._camera.position), a = n.sub(this._camera.position);
    Ae.multiplyScalar(a.x), De.multiplyScalar(a.y), We.multiplyScalar(a.z), U.copy(Ae).add(De).add(We), U.z = U.z + r, this.dollyTo(r, !1), this.setFocalOffset(-U.x, U.y, -U.z, !1), this.moveTo(e, t, i, !1);
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
    this._viewport = this._viewport || new I.Vector4(), typeof e == "number" ? this._viewport.set(e, t, i, n) : this._viewport.copy(e);
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
    if (wi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const r = e / t, a = this._camera.getEffectiveFOV() * Ot, o = this._camera.aspect;
    return ((n ? r > o : r < o) ? t : e / o) * 0.5 / Math.tan(a * 0.5) + i * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (wi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * Ot, i = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : i;
    return e / Math.sin(n * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, t = !0) {
    return (e && e.isVector3 ? e : new I.Vector3()).copy(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, t = !0) {
    return (e && e.isVector3 ? e : new I.Vector3()).setFromSpherical(t ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, t = !0) {
    return (e || new I.Spherical()).copy(t ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, t = !0) {
    return (e && e.isVector3 ? e : new I.Vector3()).copy(t ? this._focalOffsetEnd : this._focalOffset);
  }
  /**
   * Normalize camera azimuth angle rotation between 0 and 360 degrees.
   * @category Methods
   */
  normalizeRotations() {
    this._sphericalEnd.theta = this._sphericalEnd.theta % ht, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += ht), this._spherical.theta += ht * Math.round((this._sphericalEnd.theta - this._spherical.theta) / ht);
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
    if (!Y(this._camera.up.x, this._cameraUp0.x) || !Y(this._camera.up.y, this._cameraUp0.y) || !Y(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const i = this.getPosition(U);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, $t), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = U.subVectors(this._target, this._camera.position).normalize(), t = z.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const i = this.getPosition(U);
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
    const t = this._sphericalEnd.theta - this._spherical.theta, i = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, r = Rs.subVectors(this._targetEnd, this._target), a = Is.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (K(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Gt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (K(i))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Gt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (K(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const p = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Gt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, p, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (K(r.x) && K(r.y) && K(r.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const p = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      As(this._target, this._targetEnd, this._targetVelocity, p, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (K(a.x) && K(a.y) && K(a.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const p = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      As(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, p, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (K(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const p = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Gt(this._zoom, this._zoomEnd, this._zoomVelocity, p, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (Ze(this._camera) && this._changedDolly !== 0) {
        const p = this._spherical.radius - this._lastDistance, m = this._camera, f = this._getCameraDirection(Pt), C = U.copy(f).cross(m.up).normalize();
        C.lengthSq() === 0 && (C.x = 1);
        const y = z.crossVectors(C, f), T = this._sphericalEnd.radius * Math.tan(m.getEffectiveFOV() * Ot * 0.5), v = (this._sphericalEnd.radius - p - this._sphericalEnd.radius) / this._sphericalEnd.radius, S = dt.copy(this._targetEnd).add(C.multiplyScalar(this._dollyControlCoord.x * T * m.aspect)).add(y.multiplyScalar(this._dollyControlCoord.y * T)), E = U.copy(this._targetEnd).lerp(S, v), w = this._lastDollyDirection === ct.IN && this._spherical.radius <= this.minDistance, O = this._lastDollyDirection === ct.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (w || O)) {
          this._sphericalEnd.radius -= p, this._spherical.radius -= p;
          const j = z.copy(f).multiplyScalar(-p);
          E.add(j);
        }
        this._boundary.clampPoint(E, E);
        const L = z.subVectors(E, this._targetEnd);
        this._targetEnd.copy(E), this._target.add(L), this._changedDolly -= p, K(this._changedDolly) && (this._changedDolly = 0);
      } else if (Be(this._camera) && this._changedZoom !== 0) {
        const p = this._zoom - this._lastZoom, m = this._camera, f = U.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (m.near + m.far) / (m.near - m.far)).unproject(m), C = z.set(0, 0, -1).applyQuaternion(m.quaternion), y = dt.copy(f).add(C.multiplyScalar(-f.dot(m.up))), g = -(this._zoom - p - this._zoom) / this._zoom, v = this._getCameraDirection(Pt), S = this._targetEnd.dot(v), E = U.copy(this._targetEnd).lerp(y, g), w = E.dot(v), O = v.multiplyScalar(w - S);
        E.sub(O), this._boundary.clampPoint(E, E);
        const L = z.subVectors(E, this._targetEnd);
        this._targetEnd.copy(E), this._target.add(L), this._changedZoom -= p, K(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const c = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, c), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!K(this._focalOffset.x) || !K(this._focalOffset.y) || !K(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Ae.setFromMatrixColumn(this._camera.matrix, 0), De.setFromMatrixColumn(this._camera.matrix, 1), We.setFromMatrixColumn(this._camera.matrix, 2), Ae.multiplyScalar(this._focalOffset.x), De.multiplyScalar(-this._focalOffset.y), We.multiplyScalar(this._focalOffset.z), U.copy(Ae).add(De).add(We), this._camera.position.add(U)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), U.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const d = this._needsUpdate;
    return d && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : d ? (this.dispatchEvent({ type: "update" }), K(t, this.restThreshold) && K(i, this.restThreshold) && K(n, this.restThreshold) && K(r.x, this.restThreshold) && K(r.y, this.restThreshold) && K(r.z, this.restThreshold) && K(a.x, this.restThreshold) && K(a.y, this.restThreshold) && K(a.z, this.restThreshold) && K(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !d && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = d, this._needsUpdate = !1, d;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: Tt(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: Tt(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: Tt(this.maxPolarAngle),
      minAzimuthAngle: Tt(this.minAzimuthAngle),
      maxAzimuthAngle: Tt(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      verticalDragToForward: this.verticalDragToForward,
      target: this._targetEnd.toArray(),
      position: U.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
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
    this.enabled = i.enabled, this.minDistance = i.minDistance, this.maxDistance = Mt(i.maxDistance), this.minZoom = i.minZoom, this.maxZoom = Mt(i.maxZoom), this.minPolarAngle = i.minPolarAngle, this.maxPolarAngle = Mt(i.maxPolarAngle), this.minAzimuthAngle = Mt(i.minAzimuthAngle), this.maxAzimuthAngle = Mt(i.maxAzimuthAngle), this.smoothTime = i.smoothTime, this.draggingSmoothTime = i.draggingSmoothTime, this.dollySpeed = i.dollySpeed, this.truckSpeed = i.truckSpeed, this.dollyToCursor = i.dollyToCursor, this.verticalDragToForward = i.verticalDragToForward, this._target0.fromArray(i.target0), this._position0.fromArray(i.position0), this._zoom0 = i.zoom0, this._focalOffset0.fromArray(i.focalOffset0), this.moveTo(i.target[0], i.target[1], i.target[2], t), xe.setFromVector3(U.fromArray(i.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(xe.theta, xe.phi, t), this.dollyTo(xe.radius, t), this.zoomTo(i.zoom, t), this.setFocalOffset(i.focalOffset[0], i.focalOffset[1], i.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", io), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const r = z.copy(t).add(e), o = this._boundary.clampPoint(r, dt).sub(r), c = o.lengthSq();
    if (c === 0)
      return e.add(t);
    if (c === n)
      return e;
    if (i === 0)
      return e.add(t).add(o);
    {
      const l = 1 + i * c / t.dot(o);
      return e.add(z.copy(t).multiplyScalar(l)).add(o.multiplyScalar(1 - i));
    }
  }
  _updateNearPlaneCorners() {
    if (Ze(this._camera)) {
      const e = this._camera, t = e.near, i = e.getEffectiveFOV() * Ot, n = Math.tan(i * 0.5) * t, r = n * e.aspect;
      this._nearPlaneCorners[0].set(-r, -n, 0), this._nearPlaneCorners[1].set(r, -n, 0), this._nearPlaneCorners[2].set(r, n, 0), this._nearPlaneCorners[3].set(-r, n, 0);
    } else if (Be(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, i = e.left * t, n = e.right * t, r = e.top * t, a = e.bottom * t;
      this._nearPlaneCorners[0].set(i, r, 0), this._nearPlaneCorners[1].set(n, r, 0), this._nearPlaneCorners[2].set(n, a, 0), this._nearPlaneCorners[3].set(i, a, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || wi(this._camera, "_collisionTest"))
      return e;
    const i = this._getTargetDirection(Pt);
    Pi.lookAt(Ds, i, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const r = z.copy(this._nearPlaneCorners[n]);
      r.applyMatrix4(Pi);
      const a = dt.addVectors(this._target, r);
      Kt.set(a, i), Kt.far = this._spherical.radius + 1;
      const o = Kt.intersectObjects(this.colliderMeshes);
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
  static createBoundingSphere(e, t = new I.Sphere()) {
    const i = t, n = i.center;
    ut.makeEmpty(), e.traverseVisible((a) => {
      a.isMesh && ut.expandByObject(a);
    }), ut.getCenter(n);
    let r = 0;
    return e.traverseVisible((a) => {
      if (!a.isMesh)
        return;
      const o = a, c = o.geometry.clone();
      c.applyMatrix4(o.matrixWorld);
      const d = c.attributes.position;
      for (let p = 0, m = d.count; p < m; p++)
        U.fromBufferAttribute(d, p), r = Math.max(r, n.distanceToSquared(U));
    }), i.radius = Math.sqrt(r), i;
  }
}
const li = (s) => {
  const [e, t] = Z(s.options[s.index]), i = () => {
    s.onToggle(!s.open);
  }, n = (r) => {
    r !== e && (s.onSelect(r), t(r)), s.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${s.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: i, children: `${s.title}: ${e}` }),
    s.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: s.options.map((r) => /* @__PURE__ */ u.jsx("li", { onClick: () => n(r), children: r }, r)) })
  ] });
}, Ge = Na(function(e, t) {
  const i = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, r] = Z("Renderer"), [a, o] = Z(!1), [c, l] = Z(!1), [d, p] = Z(!1);
  return /* @__PURE__ */ u.jsxs("div", { className: `CameraWindow ${e.name}`, children: [
    /* @__PURE__ */ u.jsx("div", { ref: t, className: "clickable", onClick: () => {
      d && p(!1);
    } }),
    /* @__PURE__ */ u.jsxs("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ u.jsx(
        li,
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
        li,
        {
          title: "Mode",
          index: i.indexOf(n),
          open: c,
          options: i,
          onSelect: (m) => {
            if (m === n)
              return;
            const f = m;
            e.onSelectRenderMode(f), r(f);
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
class no extends dn {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
      glslVersion: ma,
      side: Bi,
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
class ao extends M {
  gridMaterial;
  constructor() {
    const e = new no();
    super(new un(2, 2), e), this.gridMaterial = e, this.frustumCulled = !1, this.name = "InfiniteGridHelper", this.position.y = 0.1;
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
function Us(s) {
  const [e, t] = Z(s.selected), i = "toggle" + (e ? " selected" : "");
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
const ro = `#include <common>
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
}`, oo = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class lo extends dn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: ro,
      fragmentShader: oo
    });
  }
}
const Xe = new ni(), ue = new P(), Ye = new P(), Q = new Ce(), js = {
  X: new P(1, 0, 0),
  Y: new P(0, 1, 0),
  Z: new P(0, 0, 1)
}, Ai = { type: "change" }, Ns = { type: "mouseDown", mode: null }, Fs = { type: "mouseUp", mode: null }, zs = { type: "objectChange" };
class co extends hn {
  constructor(e, t = null) {
    super(void 0, t);
    const i = new go(this);
    this._root = i;
    const n = new _o();
    this._gizmo = n, i.add(n);
    const r = new vo();
    this._plane = r, i.add(r);
    const a = this;
    function o(S, E) {
      let w = E;
      Object.defineProperty(a, S, {
        get: function() {
          return w !== void 0 ? w : E;
        },
        set: function(O) {
          w !== O && (w = O, r[S] = O, n[S] = O, a.dispatchEvent({ type: S + "-changed", value: O }), a.dispatchEvent(Ai));
        }
      }), a[S] = E, r[S] = E, n[S] = E;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const c = new P(), l = new P(), d = new Ce(), p = new Ce(), m = new P(), f = new Ce(), C = new P(), y = new P(), T = new P(), g = 0, v = new P();
    o("worldPosition", c), o("worldPositionStart", l), o("worldQuaternion", d), o("worldQuaternionStart", p), o("cameraPosition", m), o("cameraQuaternion", f), o("pointStart", C), o("pointEnd", y), o("rotationAxis", T), o("rotationAngle", g), o("eye", v), this._offset = new P(), this._startNorm = new P(), this._endNorm = new P(), this._cameraScale = new P(), this._parentPosition = new P(), this._parentQuaternion = new Ce(), this._parentQuaternionInv = new Ce(), this._parentScale = new P(), this._worldScaleStart = new P(), this._worldQuaternionInv = new Ce(), this._worldScale = new P(), this._positionStart = new P(), this._quaternionStart = new Ce(), this._scaleStart = new P(), this._getPointer = ho.bind(this), this._onPointerDown = po.bind(this), this._onPointerHover = uo.bind(this), this._onPointerMove = mo.bind(this), this._onPointerUp = fo.bind(this), t !== null && this.connect();
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
    const t = Di(this._gizmo.picker[this.mode], Xe);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && Xe.setFromCamera(e, this.camera);
      const t = Di(this._plane, Xe, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, Ns.mode = this.mode, this.dispatchEvent(Ns);
    }
  }
  pointerMove(e) {
    const t = this.axis, i = this.mode, n = this.object;
    let r = this.space;
    if (i === "scale" ? r = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (r = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && Xe.setFromCamera(e, this.camera);
    const a = Di(this._plane, Xe, !0);
    if (a) {
      if (this.pointEnd.copy(a.point).sub(this.worldPositionStart), i === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (n.position.applyQuaternion(Q.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), r === "world" && (n.parent && n.position.add(ue.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(ue.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (i === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), Ye.set(o, o, o);
        } else
          ue.copy(this.pointStart), Ye.copy(this.pointEnd), ue.applyQuaternion(this._worldQuaternionInv), Ye.applyQuaternion(this._worldQuaternionInv), Ye.divide(ue), t.search("X") === -1 && (Ye.x = 1), t.search("Y") === -1 && (Ye.y = 1), t.search("Z") === -1 && (Ye.z = 1);
        n.scale.copy(this._scaleStart).multiply(Ye), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (i === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(ue.setFromMatrixPosition(this.camera.matrixWorld));
        let c = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(ue.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(js[t]), ue.copy(js[t]), r === "local" && ue.applyQuaternion(this.worldQuaternion), ue.cross(this.eye), ue.length() === 0 ? c = !0 : this.rotationAngle = this._offset.dot(ue.normalize()) * o), (t === "E" || c) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(Q.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(Q.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(Ai), this.dispatchEvent(zs);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (Fs.mode = this.mode, this.dispatchEvent(Fs)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(Ai), this.dispatchEvent(zs), this.pointStart.copy(this.pointEnd));
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
function ho(s) {
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
function uo(s) {
  if (this.enabled)
    switch (s.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(s));
        break;
    }
}
function po(s) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(s.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(s)), this.pointerDown(this._getPointer(s)));
}
function mo(s) {
  this.enabled && this.pointerMove(this._getPointer(s));
}
function fo(s) {
  this.enabled && (this.domElement.releasePointerCapture(s.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(s)));
}
function Di(s, e, t) {
  const i = e.intersectObject(s, !0);
  for (let n = 0; n < i.length; n++)
    if (i[n].object.visible || t)
      return i[n];
  return !1;
}
const qt = new pn(), X = new P(0, 1, 0), Hs = new P(0, 0, 0), Ys = new ci(), Qt = new Ce(), si = new Ce(), Re = new P(), Bs = new ci(), kt = new P(1, 0, 0), Ke = new P(0, 1, 0), Ut = new P(0, 0, 1), Jt = new P(), Dt = new P(), Rt = new P();
class go extends vt {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class _o extends vt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new Je({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Vi({
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
    const C = e.clone();
    C.color.setHex(7895160);
    const y = new ve(0, 0.04, 0.1, 12);
    y.translate(0, 0.05, 0);
    const T = new de(0.08, 0.08, 0.08);
    T.translate(0, 0.04, 0);
    const g = new _t();
    g.setAttribute("position", new qe([0, 0, 0, 1, 0, 0], 3));
    const v = new ve(75e-4, 75e-4, 0.5, 3);
    v.translate(0, 0.25, 0);
    function S($, Ue) {
      const he = new Et($, 75e-4, 3, 64, Ue * Math.PI * 2);
      return he.rotateY(Math.PI / 2), he.rotateX(Math.PI / 2), he;
    }
    function E() {
      const $ = new _t();
      return $.setAttribute("position", new qe([0, 0, 0, 1, 1, 1], 3)), $;
    }
    const w = {
      X: [
        [new M(y, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(y, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new M(v, r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new M(y, a), [0, 0.5, 0]],
        [new M(y, a), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new M(v, a)]
      ],
      Z: [
        [new M(y, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new M(y, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new M(v, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new Zt(0.1, 0), p.clone()), [0, 0, 0]]
      ],
      XY: [
        [new M(new de(0.15, 0.15, 0.01), d.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new de(0.15, 0.15, 0.01), c.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new de(0.15, 0.15, 0.01), l.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, O = {
      X: [
        [new M(new ve(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(new ve(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new Zt(0.2, 0), i)]
      ],
      XY: [
        [new M(new de(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new de(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new de(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, L = {
      START: [
        [new M(new Zt(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new M(new Zt(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new Ie(E(), n), null, null, null, "helper"]
      ],
      X: [
        [new Ie(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Ie(g, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Ie(g, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, j = {
      XYZE: [
        [new M(S(0.5, 1), C), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new M(S(0.5, 0.5), r)]
      ],
      Y: [
        [new M(S(0.5, 0.5), a), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new M(S(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new M(S(0.75, 1), m), null, [0, Math.PI / 2, 0]]
      ]
    }, R = {
      AXIS: [
        [new Ie(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, B = {
      XYZE: [
        [new M(new mn(0.25, 10, 8), i)]
      ],
      X: [
        [new M(new Et(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new M(new Et(0.5, 0.1, 4, 24), i), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new M(new Et(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new M(new Et(0.75, 0.1, 2, 24), i)]
      ]
    }, Se = {
      X: [
        [new M(T, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(v, r), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(T, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(T, a), [0, 0.5, 0]],
        [new M(v, a)],
        [new M(T, a), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(T, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new M(v, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new M(T, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new M(new de(0.15, 0.15, 0.01), d), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new de(0.15, 0.15, 0.01), c), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new de(0.15, 0.15, 0.01), l), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new de(0.1, 0.1, 0.1), p.clone())]
      ]
    }, _e = {
      X: [
        [new M(new ve(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(new ve(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new M(new de(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new de(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new de(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new de(0.2, 0.2, 0.2), i), [0, 0, 0]]
      ]
    }, re = {
      X: [
        [new Ie(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Ie(g, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Ie(g, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function q($) {
      const Ue = new vt();
      for (const he in $)
        for (let Ee = $[he].length; Ee--; ) {
          const se = $[he][Ee][0].clone(), je = $[he][Ee][1], Ne = $[he][Ee][2], Fe = $[he][Ee][3], W = $[he][Ee][4];
          se.name = he, se.tag = W, je && se.position.set(je[0], je[1], je[2]), Ne && se.rotation.set(Ne[0], Ne[1], Ne[2]), Fe && se.scale.set(Fe[0], Fe[1], Fe[2]), se.updateMatrix();
          const le = se.geometry.clone();
          le.applyMatrix4(se.matrix), se.geometry = le, se.renderOrder = 1 / 0, se.position.set(0, 0, 0), se.rotation.set(0, 0, 0), se.scale.set(1, 1, 1), Ue.add(se);
        }
      return Ue;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = q(w)), this.add(this.gizmo.rotate = q(j)), this.add(this.gizmo.scale = q(Se)), this.add(this.picker.translate = q(O)), this.add(this.picker.rotate = q(B)), this.add(this.picker.scale = q(_e)), this.add(this.helper.translate = q(L)), this.add(this.helper.rotate = q(R)), this.add(this.helper.scale = q(re)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const i = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : si;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      a.visible = !0, a.rotation.set(0, 0, 0), a.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), a.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), a.tag === "helper") {
        a.visible = !1, a.name === "AXIS" ? (a.visible = !!this.axis, this.axis === "X" && (Q.setFromEuler(qt.set(0, 0, 0)), a.quaternion.copy(i).multiply(Q), Math.abs(X.copy(kt).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Y" && (Q.setFromEuler(qt.set(0, 0, Math.PI / 2)), a.quaternion.copy(i).multiply(Q), Math.abs(X.copy(Ke).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Z" && (Q.setFromEuler(qt.set(0, Math.PI / 2, 0)), a.quaternion.copy(i).multiply(Q), Math.abs(X.copy(Ut).applyQuaternion(i).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "XYZE" && (Q.setFromEuler(qt.set(0, Math.PI / 2, 0)), X.copy(this.rotationAxis), a.quaternion.setFromRotationMatrix(Ys.lookAt(Hs, X, Ke)), a.quaternion.multiply(Q), a.visible = this.dragging), this.axis === "E" && (a.visible = !1)) : a.name === "START" ? (a.position.copy(this.worldPositionStart), a.visible = this.dragging) : a.name === "END" ? (a.position.copy(this.worldPosition), a.visible = this.dragging) : a.name === "DELTA" ? (a.position.copy(this.worldPositionStart), a.quaternion.copy(this.worldQuaternionStart), ue.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), ue.applyQuaternion(this.worldQuaternionStart.clone().invert()), a.scale.copy(ue), a.visible = this.dragging) : (a.quaternion.copy(i), this.dragging ? a.position.copy(this.worldPositionStart) : a.position.copy(this.worldPosition), this.axis && (a.visible = this.axis.search(a.name) !== -1));
        continue;
      }
      a.quaternion.copy(i), this.mode === "translate" || this.mode === "scale" ? (a.name === "X" && Math.abs(X.copy(kt).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Y" && Math.abs(X.copy(Ke).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Z" && Math.abs(X.copy(Ut).applyQuaternion(i).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XY" && Math.abs(X.copy(Ut).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "YZ" && Math.abs(X.copy(kt).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XZ" && Math.abs(X.copy(Ke).applyQuaternion(i).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1)) : this.mode === "rotate" && (Qt.copy(i), X.copy(this.eye).applyQuaternion(Q.copy(i).invert()), a.name.search("E") !== -1 && a.quaternion.setFromRotationMatrix(Ys.lookAt(this.eye, Hs, Ke)), a.name === "X" && (Q.setFromAxisAngle(kt, Math.atan2(-X.y, X.z)), Q.multiplyQuaternions(Qt, Q), a.quaternion.copy(Q)), a.name === "Y" && (Q.setFromAxisAngle(Ke, Math.atan2(X.x, X.z)), Q.multiplyQuaternions(Qt, Q), a.quaternion.copy(Q)), a.name === "Z" && (Q.setFromAxisAngle(Ut, Math.atan2(X.y, X.x)), Q.multiplyQuaternions(Qt, Q), a.quaternion.copy(Q))), a.visible = a.visible && (a.name.indexOf("X") === -1 || this.showX), a.visible = a.visible && (a.name.indexOf("Y") === -1 || this.showY), a.visible = a.visible && (a.name.indexOf("Z") === -1 || this.showZ), a.visible = a.visible && (a.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), a.material._color = a.material._color || a.material.color.clone(), a.material._opacity = a.material._opacity || a.material.opacity, a.material.color.copy(a.material._color), a.material.opacity = a.material._opacity, this.enabled && this.axis && (a.name === this.axis || this.axis.split("").some(function(c) {
        return a.name === c;
      })) && (a.material.color.setHex(16776960), a.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class vo extends M {
  constructor() {
    super(
      new un(1e5, 1e5, 2, 2),
      new Je({ visible: !1, wireframe: !0, side: Bi, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), Jt.copy(kt).applyQuaternion(t === "local" ? this.worldQuaternion : si), Dt.copy(Ke).applyQuaternion(t === "local" ? this.worldQuaternion : si), Rt.copy(Ut).applyQuaternion(t === "local" ? this.worldQuaternion : si), X.copy(Dt), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            X.copy(this.eye).cross(Jt), Re.copy(Jt).cross(X);
            break;
          case "Y":
            X.copy(this.eye).cross(Dt), Re.copy(Dt).cross(X);
            break;
          case "Z":
            X.copy(this.eye).cross(Rt), Re.copy(Rt).cross(X);
            break;
          case "XY":
            Re.copy(Rt);
            break;
          case "YZ":
            Re.copy(Jt);
            break;
          case "XZ":
            X.copy(Rt), Re.copy(Dt);
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
    Re.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Bs.lookAt(ue.set(0, 0, 0), Re, X), this.quaternion.setFromRotationMatrix(Bs)), super.updateMatrixWorld(e);
  }
}
class ge extends Yi {
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
      He(t);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(e) {
    let t = this.controls.get(e);
    if (t === void 0) {
      const i = document.querySelector(".clickable");
      t = new co(this.activeCamera, i), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: ge.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: ge.DRAG_END });
      }), t.addEventListener("dragging-changed", (n) => {
        me.instance?.toggleOrbitControls(n.value);
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
const yo = new de(), Ri = new pe();
class Vs extends vt {
  curve = new cs();
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
    const i = new et(lt(0.5, 1, Math.random()), lt(0.5, 1, Math.random()), lt(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Vi({ color: i }), this.line = new Ie(new _t(), this.lineMaterial), this.line.name = "line", this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = i, this.draggable = new vt(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new M(new mn(1.5), new Je({ color: i })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new ni(), this.raycaster.params.Line.threshold = 3, this.enable();
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
      e.push([Pe(t.position.x, 3), Pe(t.position.y, 3), Pe(t.position.z, 3)]);
    }), Fa({
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
      this.addPoint(new P(-50, 0, 0), !1), this.addPoint(new P(50, 0, 0));
  };
  addPoint = (e, t = !0) => {
    const i = this.draggable.children.length, n = new M(yo, this.draggedMat);
    return n.name = `point_${i}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), t && this.updateSpline(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = new P(
      lt(-this.offset, this.offset, Math.random()),
      lt(-this.offset, this.offset, Math.random()),
      lt(-this.offset, this.offset, Math.random())
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
    this.curve = new cs(this.points, this.closed, this.curveType, this.tension), this.line.geometry.setFromPoints(this.getPoints()), this.curvePos.position.copy(this.getPointAt(this._curvePercentage));
  };
  // Handlers
  onMouseClick = (e) => {
    if (!me.instance || this._transform && !this._transform.getHelper().visible)
      return;
    const i = me.instance.currentWindow.current.getBoundingClientRect();
    Ri.x = (e.clientX - i.x) / i.width * 2 - 1, Ri.y = -((e.clientY - i.y) / i.height) * 2 + 1, this.raycaster.setFromCamera(Ri, this.camera);
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
    this.parentGroup = e, this._transform = ge.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), this._transform.attach(t.length > 0 ? t[t.length - 1] : this), me.instance?.scene.add(this._transform.getHelper());
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
let ei = 0;
class bo extends vt {
  defaultScale = 10;
  _camera;
  group = null;
  constructor(e) {
    super(), this.name = "Spline Editor", this._camera = e, D.addEventListener(A.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = ae.addEditorGroup({
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
    D.removeEventListener(A.ADD_SPLINE, this.onAddSpline), ae.removeEditorGroup(this.name);
  }
  addSpline(e) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current), this.add(e);
  }
  createSpline = (e = []) => {
    const t = `Spline ${ei + 1}`, i = new Vs(t, this._camera);
    return i.addPoints(e), this.addSpline(i), ei++, i;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((i) => {
      t.push(new P(i[0], i[1], i[2]));
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
    const t = JSON.parse(e.value), i = `Spline ${ei + 1}`, n = [];
    t.points.forEach((a) => {
      n.push(new P(a[0], a[1], a[2]));
    });
    const r = new Vs(i, this.camera);
    r.addPoints(n), this.addSpline(r), ei++;
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
const Zs = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], Eo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", Co = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==";
class me extends Ft {
  static instance = null;
  scene = new Gs();
  renderer;
  currentScene;
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  helpersContainer = new fa();
  grid = new ao();
  axisHelper = new hs(500);
  interactionHelper = new hs(100);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial = new ga();
  normalsMaterial = new _a();
  uvMaterial = new lo();
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
  raycaster = new ni();
  pointer = new pe();
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
      Vector2: pe,
      Vector3: P,
      Vector4: Oa,
      Quaternion: Ce,
      Matrix4: ci,
      Spherical: Li,
      Box3: Ta,
      Sphere: Ma,
      Raycaster: ni
    };
    ke.install({ THREE: r }), this.setupScene(), this.setupTools();
    const a = localStorage.getItem(this.expandedCameraVisibility);
    this.cameraVisibility = a !== null ? a === "open" : !1, this.saveExpandedCameraVisibility();
    const o = localStorage.getItem(this.expandedLightVisibility);
    this.lightVisibility = o !== null ? o === "open" : !1, this.saveExpandedLightVisibility(), me.instance = this;
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
          li,
          {
            title: "View",
            index: Zs.indexOf(this.state.mode),
            options: Zs,
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
          li,
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
          Us,
          {
            name: "cameraHelper",
            icon: Eo,
            selected: this.cameraVisibility,
            height: 24,
            top: 2,
            onClick: (t) => {
              if (this.cameraVisibility = t, this.saveExpandedCameraVisibility(), this.cameraHelpers.forEach((i) => {
                i.visible = t;
              }), this.selectedItem !== void 0 && !t && this.selectedItem instanceof Ct) {
                const i = this.cameraHelpers.get(this.selectedItem.name);
                i !== void 0 && (i.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Us,
          {
            name: "lightHelper",
            icon: Co,
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
    this.renderer = new va({
      canvas: this.canvasRef.current,
      stencil: !1
    }), this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setClearColor(0), this.props.three.renderer = this.renderer;
  }
  setupScene() {
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.helpersContainer.add(this.grid), this.axisHelper.name = "axisHelper", this.helpersContainer.add(this.axisHelper), this.interactionHelper.name = "interactionHelper", this.helpersContainer.add(this.interactionHelper), this.interactionHelper.visible = !1;
    const e = (n, r) => {
      const a = new Ii(-100, 100, 100, -100, 50, 5e3);
      return a.name = n, a.position.copy(r), a.lookAt(0, 0, 0), this.cameras.set(n, a), a;
    };
    e("Top", new P(0, 1e3, 0)), e("Bottom", new P(0, -1e3, 0)), e("Left", new P(-1e3, 0, 0)), e("Right", new P(1e3, 0, 0)), e("Front", new P(0, 0, 1e3)), e("Back", new P(0, 0, -1e3)), e("Orthographic", new P(1e3, 1e3, 1e3)), e("UI", new P()), this.debugCamera = new Ct(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const t = localStorage, i = this.props.three.app.appID;
    this.tlCam = this.cameras.get(t.getItem(`${i}_tlCam`)), this.trCam = this.cameras.get(t.getItem(`${i}_trCam`)), this.blCam = this.cameras.get(t.getItem(`${i}_blCam`)), this.brCam = this.cameras.get(t.getItem(`${i}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  setupTools() {
    this.splineEditor = new bo(this.currentCamera), this.splineEditor.initDebug(), this.scene.add(this.splineEditor);
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
      a instanceof Ii ? (a.left = i / -2, a.right = i / 2, a.top = n / 2, a.bottom = n / -2, a.name === "UI" && (a.position.x = this.width / 2, a.position.y = this.height / -2, a.position.z = 100), a.updateProjectionMatrix()) : a instanceof Ct && (a.aspect = r, a.updateProjectionMatrix(), this.cameraHelpers.get(a.name)?.update());
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
    if (i !== void 0 && this.cameras.set(t.name, i), i instanceof Ct) {
      const n = new ya(i);
      n.visible = this.cameraVisibility, this.cameraHelpers.set(i.name, n), this.scene.add(n);
    }
    this.setState({ lastUpdate: Date.now() });
  };
  removeCamera = (e) => {
    const t = this.cameraHelpers.get(e.value.name);
    t !== void 0 && (this.scene.remove(t), t.dispose()), this.cameras.delete(e.value.name), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new pe();
    this.renderer.getSize(t);
    const i = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = ot(i, 0, t.x, -1, 1), this.pointer.y = ot(n, 0, t.y, 1, -1);
    const r = t.x / 2, a = t.y / 2, o = () => {
      i < r ? this.pointer.x = ot(i, 0, r, -1, 1) : this.pointer.x = ot(i, r, t.x, -1, 1);
    }, c = () => {
      n < a ? this.pointer.y = ot(n, 0, a, 1, -1) : this.pointer.y = ot(n, a, t.y, 1, -1);
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
    const t = new pe();
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
        e.key === "0" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof M || this.selectedItem instanceof ba ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Fi(45), Fi(45), !0), this.updateCameraControls(t));
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
      if (this.selectedItem instanceof Ct && !this.cameraVisibility) {
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
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), di.instance.update());
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
            t = new wa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new Sa(e, 250), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new zr(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new Ca(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new Ea(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const i = this.controls.get(e.name);
    if (i !== void 0 && i.dispose(), this.controls.delete(e.name), e.name === "UI")
      return;
    const n = new Yr(e, t);
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
    const i = 0.15, n = new xa();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const r = () => {
      const a = n.getDelta();
      this.cameraControls && this.cameraControls.update(a), t && (e.target.lerp(e.target0, i), e.object.position.lerp(e.position0, i), e.object.zoom = ki(e.object.zoom, e.zoom0, i), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(r);
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
class di extends Ft {
  static instance;
  matrix = new ci();
  position = new P();
  rotation = new pn();
  scale = new P();
  open = !1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), i = t !== null ? t === "open" : !1;
    this.open = i, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: i
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), di.instance = this;
  }
  update() {
    if (me.instance) {
      const e = me.instance.selectedItem;
      if (e === void 0)
        return;
      this.position.x = Pe(e.position.x, 3), this.position.y = Pe(e.position.y, 3), this.position.z = Pe(e.position.z, 3), this.rotation.copy(e.rotation), this.scale.x = Pe(e.scale.x, 3), this.scale.y = Pe(e.scale.y, 3), this.scale.z = Pe(e.scale.z, 3), this.setState({ lastUpdated: Date.now() });
    }
  }
  render() {
    return /* @__PURE__ */ u.jsx(
      Oe,
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
      ie(r, e, i);
    }
  };
  saveExpanded() {
    localStorage.setItem(this.expandedName, this.open ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.app.appID}_transform`;
  }
}
function Ws(s) {
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
function So(s, e) {
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
        title: Ws(o),
        prop: o,
        type: "color",
        value: c,
        onChange: (l, d) => {
          const p = new et(d);
          e.updateObject(s.uuid, l, p);
          const m = e.getScene(s.uuid);
          if (m !== null) {
            const f = m.getObjectByProperty("uuid", s.uuid);
            ie(f, l, p);
          }
        }
      }) : a.push({
        title: Ws(o),
        prop: o,
        type: typeof c,
        value: c,
        step: typeof c == "number" ? 0.01 : void 0,
        onChange: (l, d) => {
          e.updateObject(s.uuid, l, d);
          const p = e.getScene(s.uuid);
          if (p !== null) {
            const m = p.getObjectByProperty("uuid", s.uuid);
            ie(m, l, d);
          }
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    Oe,
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
function wo(s) {
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
      const f = m.mixer;
      if (f !== void 0) {
        const y = [
          {
            title: "Time Scale",
            type: "range",
            value: f.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (T, g) => {
              f.timeScale = g, t.updateObject(e.uuid, "mixer.timeScale", g);
            }
          }
        ];
        y.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            f.stopAllAction(), t.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), o.push({
          title: "Mixer",
          items: y
        }), d = new Pa(m), me.instance?.scene.add(d);
      }
    }
  }
  return tt(() => () => {
    d !== void 0 && He(d);
  }, []), /* @__PURE__ */ u.jsx(
    Oe,
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
const Hi = {
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
let ce = { ...Hi };
function xo(s) {
  const [e, t] = Z(-1);
  tt(() => {
    function a(c) {
      ce = { ...c.value }, t(Date.now());
    }
    function o() {
      ce = { ...Hi }, t(Date.now());
    }
    return D.addEventListener(A.SET_SCENE, o), D.addEventListener(A.SET_OBJECT, a), () => {
      D.removeEventListener(A.SET_SCENE, o), D.removeEventListener(A.SET_OBJECT, a);
    };
  }, []);
  const i = ce.type.toLowerCase(), n = ce.animations.length > 0 || ce.mixer !== void 0, r = i.search("mesh") > -1 || i.search("line") > -1 || i.search("points") > -1;
  return /* @__PURE__ */ u.jsx(
    oi,
    {
      label: "Inspector",
      button: ce.uuid.length > 0 ? /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: () => {
        ge.instance.remove(ce.name), ce = { ...Hi }, t(Date.now());
      } }) : void 0,
      children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: s.class, children: ce.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            ii,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: ce.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            ii,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: ce.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            ii,
            {
              type: "string",
              title: "UUID",
              prop: "uuid",
              value: ce.uuid,
              disabled: !0
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(di, { object: ce, three: s.three }),
          n ? /* @__PURE__ */ u.jsx(wo, { object: ce, three: s.three }) : null,
          i.search("camera") > -1 ? Fr(ce, s.three) : null,
          i.search("light") > -1 ? So(ce, s.three) : null,
          r ? Ur(ce, s.three) : null
        ] })
      ] }) }, e)
    },
    "Inspector"
  );
}
class Oo extends Ft {
  // Renderer
  autoClear = !0;
  autoClearColor = !0;
  autoClearDepth = !0;
  autoClearStencil = !0;
  outputColorSpace = ds;
  localClippingEnabled = !1;
  clearColor = new et(0);
  clearAlpha = 1;
  toneMapping = us;
  toneMappingExposure = 1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), i = t !== null ? t === "open" : !1;
    if (this.state = {
      expanded: i,
      lastUpdated: Date.now()
    }, this.saveExpanded(i), me.instance) {
      const n = me.instance.renderer;
      n && (this.autoClear = n.autoClear, this.autoClearColor = n.autoClearColor, this.autoClearDepth = n.autoClearDepth, this.autoClearStencil = n.autoClearStencil, this.outputColorSpace = n.outputColorSpace, this.localClippingEnabled = n.localClippingEnabled, this.clearAlpha = n.getClearAlpha(), this.toneMapping = n.toneMapping, this.toneMappingExposure = n.toneMappingExposure, n.getClearColor(this.clearColor));
    }
    D.addEventListener(A.ADD_RENDERER, this.onAddRenderer);
  }
  componentwillunmount() {
    D.removeEventListener(A.ADD_RENDERER, this.onAddRenderer);
  }
  onAddRenderer = (e) => {
    const t = e.value;
    if (this.autoClear = t.autoClear, this.autoClearColor = t.autoClearColor, this.autoClearDepth = t.autoClearDepth, this.autoClearStencil = t.autoClearStencil, this.outputColorSpace = t.outputColorSpace, this.localClippingEnabled = t.localClippingEnabled, this.clearAlpha = t.clearAlpha, this.toneMapping = t.toneMapping, this.toneMappingExposure = t.toneMappingExposure, this.clearColor.setStyle(t.clearColor, Nt), mt.enabled = t.colorManagement, me.instance) {
      const i = me.instance.renderer;
      i && (i.autoClear = this.autoClear, i.autoClearColor = this.autoClearColor, i.autoClearDepth = this.autoClearDepth, i.autoClearStencil = this.autoClearStencil, i.outputColorSpace = this.outputColorSpace, i.localClippingEnabled = this.localClippingEnabled, i.toneMapping = this.toneMapping, i.toneMappingExposure = this.toneMappingExposure, i.setClearColor(t.clearColor, this.clearAlpha));
    }
    this.setState({ lastUpdated: Date.now() });
  };
  render() {
    const e = () => {
      if (me.instance) {
        const t = me.instance.renderer;
        t && (t.autoClear = this.autoClear, t.autoClearColor = this.autoClearColor, t.autoClearDepth = this.autoClearDepth, t.autoClearStencil = this.autoClearStencil, t.outputColorSpace = this.outputColorSpace, t.localClippingEnabled = this.localClippingEnabled, t.toneMapping = this.toneMapping, t.toneMappingExposure = this.toneMappingExposure, t.setClearColor(this.clearColor.getStyle(), this.clearAlpha), this.props.three.updateRenderer({
          autoClear: this.autoClear,
          autoClearColor: this.autoClearColor,
          autoClearDepth: this.autoClearDepth,
          autoClearStencil: this.autoClearStencil,
          outputColorSpace: this.outputColorSpace,
          localClippingEnabled: this.localClippingEnabled,
          clearAlpha: this.clearAlpha,
          clearColor: this.clearColor.getStyle(),
          colorManagement: mt.enabled,
          toneMapping: this.toneMapping,
          toneMappingExposure: this.toneMappingExposure
        }));
      }
    };
    return /* @__PURE__ */ u.jsx(
      Oe,
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
            value: mt.enabled,
            onChange: (t, i) => {
              mt.enabled = i, e();
            }
          },
          {
            type: "option",
            title: "Color Space",
            value: this.outputColorSpace,
            options: [
              {
                title: "No Color Space",
                value: Aa
              },
              {
                title: "SRB Color Space",
                value: ds
              },
              {
                title: "Linear SRB Color Space",
                value: Nt
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
                value: us
              },
              {
                title: "Linear ",
                value: Da
              },
              {
                title: "Reinhard",
                value: Ra
              },
              {
                title: "Cineon ",
                value: Ia
              },
              {
                title: "ACES Filmic",
                value: La
              },
              {
                title: "AgX",
                value: ka
              },
              {
                title: "Neutral",
                value: Ua
              },
              {
                title: "Custom",
                value: ja
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
function To(s) {
  const [e] = Z([]), [t] = Z([]), [i, n] = Z(0), r = (c) => {
    const l = c.value;
    e.push(l), t.push(
      /* @__PURE__ */ u.jsx(
        oi,
        {
          label: `Scene: ${l.name}`,
          scene: l,
          open: !0,
          onRefresh: () => {
            s.three.refreshScene(l.name);
          },
          children: /* @__PURE__ */ u.jsx(Es, { child: l, scene: l, three: s.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, a = (c) => {
    const l = c.value;
    for (let d = 0; d < e.length; d++)
      if (l.uuid === e[d].uuid) {
        e[d] = l, t[d] = /* @__PURE__ */ u.jsx(
          oi,
          {
            label: `Scene: ${l.name}`,
            scene: l,
            open: !0,
            onRefresh: () => {
              s.three.refreshScene(l.name);
            },
            children: /* @__PURE__ */ u.jsx(Es, { child: l, scene: l, three: s.three })
          },
          Math.random()
        ), n(Date.now());
        return;
      }
  }, o = (c) => {
    const l = c.value;
    for (let d = 0; d < e.length; d++)
      if (l.uuid === e[d].uuid) {
        e.splice(d, 1), t.splice(d, 1), n(Date.now());
        return;
      }
  };
  return tt(() => (D.addEventListener(A.ADD_SCENE, r), D.addEventListener(A.REFRESH_SCENE, a), D.addEventListener(A.REMOVE_SCENE, o), () => {
    D.removeEventListener(A.ADD_SCENE, r), D.removeEventListener(A.REFRESH_SCENE, a), D.removeEventListener(A.REMOVE_SCENE, o);
  }), []), /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ u.jsx("div", { className: "scenes", children: t }, i),
    /* @__PURE__ */ u.jsx(xo, { three: s.three }),
    /* @__PURE__ */ u.jsx(Oo, { three: s.three }),
    /* @__PURE__ */ u.jsx(ae, { three: s.three })
  ] });
}
function Go(s) {
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
      p !== void 0 && ie(p, c, l);
    }, n = (o) => {
      const c = o.value, { key: l, value: d, uuid: p } = c;
      i(p, l, d);
    }, r = (o) => {
      const c = o.value, d = e(c.uuid)?.getObjectByProperty("uuid", c.uuid);
      if (d !== void 0) {
        const p = (m) => {
          const f = c.key.split(".");
          switch (f.length) {
            case 1:
              d[f[0]] = m;
              break;
            case 2:
              d[f[0]][f[1]] = m;
              break;
            case 3:
              d[f[0]][f[1]][f[2]] = m;
              break;
            case 4:
              d[f[0]][f[1]][f[2]][f[3]] = m;
              break;
            case 5:
              d[f[0]][f[1]][f[2]][f[3]][f[4]] = m;
              break;
          }
          d.material.needsUpdate = !0;
        };
        c.value.src.length > 0 ? vn(c.value.src).then((m) => {
          m.offset.set(c.value.offset[0], c.value.offset[1]), m.repeat.set(c.value.repeat[0], c.value.repeat[1]), p(m);
        }) : p(null);
      }
    }, a = (o) => {
      const { key: c, uuid: l, value: d, subitem: p } = o.value, f = e(l)?.getObjectByProperty("uuid", l);
      if (f !== void 0)
        try {
          p !== void 0 ? or(f, p)[c](d) : f[c](d);
        } catch (C) {
          console.log("Error requesting method:"), console.log(C), console.log(c), console.log(d);
        }
    };
    return D.addEventListener(A.GET_OBJECT, t), D.addEventListener(A.UPDATE_OBJECT, n), D.addEventListener(A.CREATE_TEXTURE, r), D.addEventListener(A.REQUEST_METHOD, a), () => {
      D.removeEventListener(A.GET_OBJECT, t), D.removeEventListener(A.UPDATE_OBJECT, n), D.removeEventListener(A.CREATE_TEXTURE, r), D.removeEventListener(A.REQUEST_METHOD, a);
    };
  }, []), null;
}
function Mo(s) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: s.ref, style: s.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: s.header }),
    s.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: s.footer })
  ] });
}
function Xo(s) {
  return /* @__PURE__ */ u.jsx(Mo, { children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      me,
      {
        three: s.three,
        scenes: s.scenes,
        onSceneResize: s.onSceneResize,
        onSceneSet: s.onSceneSet,
        onSceneUpdate: s.onSceneUpdate
      }
    ),
    /* @__PURE__ */ u.jsx(To, { three: s.three })
  ] }) });
}
export {
  oi as Accordion,
  zo as Application,
  Wi as BaseRemote,
  bn as ChildObject,
  Es as ContainerObject,
  mr as Draggable,
  pr as DraggableItem,
  fr as Dropdown,
  gr as DropdownItem,
  Mo as Editor,
  No as ElementProxy,
  sr as ElementProxyReceiver,
  ti as ExportTexture,
  xo as Inspector,
  me as MultiView,
  yn as NavButton,
  Fo as ProxyManager,
  Ga as QualityType,
  Ho as RemoteComponents,
  Wo as RemoteController,
  Vo as RemoteTheatre,
  Zo as RemoteThree,
  Go as SceneInspector,
  To as SidePanel,
  Vs as Spline,
  bo as SplineEditor,
  Xo as ThreeEditor,
  A as ToolEvents,
  ge as Transform,
  jo as WebworkerEventHandlers,
  ri as capitalize,
  $e as clamp,
  ps as colorToHex,
  Fa as copyToClipboard,
  Bo as customizeTheatreElements,
  D as debugDispatcher,
  Ro as defaultTheatreCallback,
  Io as detectSettings,
  He as dispose,
  Xa as disposeMaterial,
  ko as disposeTexture,
  Lo as distance,
  ji as hierarchyUUID,
  Ha as isColor,
  ki as mix,
  ai as noop,
  _s as normalize,
  Uo as parseModelLite,
  za as randomID,
  vs as resetThreeObjects,
  Pe as round,
  Yo as theatreEditorApp,
  Ui as totalThreeObjects
};
