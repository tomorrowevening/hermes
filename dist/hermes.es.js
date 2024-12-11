import { OrthographicCamera as Li, Scene as Ws, MeshBasicMaterial as Je, BufferGeometry as _t, Float32BufferAttribute as Ke, Mesh as M, LinearSRGBColorSpace as Nt, ObjectLoader as Wn, AnimationMixer as Xn, AnimationClip as $n, EventDispatcher as Bi, Texture as qn, RepeatWrapping as cs, Color as et, ColorManagement as mt, WebGLRenderTarget as Kn, FrontSide as Qn, BackSide as Xs, DoubleSide as Vi, NoBlending as Jn, NormalBlending as ea, AdditiveBlending as ta, SubtractiveBlending as ia, MultiplyBlending as sa, CustomBlending as na, AddEquation as aa, SubtractEquation as ra, ReverseSubtractEquation as oa, MinEquation as la, MaxEquation as ca, ZeroFactor as $s, OneFactor as qs, SrcColorFactor as Ks, OneMinusSrcColorFactor as Qs, SrcAlphaFactor as Js, OneMinusSrcAlphaFactor as en, DstAlphaFactor as tn, OneMinusDstAlphaFactor as sn, DstColorFactor as nn, OneMinusDstColorFactor as an, SrcAlphaSaturateFactor as ha, ConstantColorFactor as rn, OneMinusConstantColorFactor as on, ConstantAlphaFactor as ln, OneMinusConstantAlphaFactor as cn, Line as Ie, LineBasicMaterial as Zi, Ray as da, Plane as ua, MathUtils as pa, Vector3 as P, Controls as hn, MOUSE as gt, TOUCH as ft, Quaternion as Ce, Spherical as ki, Vector2 as pe, ShaderMaterial as dn, GLSL3 as ma, PlaneGeometry as un, Raycaster as ai, Euler as pn, Matrix4 as hi, Object3D as vt, CylinderGeometry as ve, BoxGeometry as de, OctahedronGeometry as Gt, SphereGeometry as mn, TorusGeometry as bt, CatmullRomCurve3 as hs, Group as fa, AxesHelper as ga, MeshDepthMaterial as _a, MeshNormalMaterial as va, PerspectiveCamera as Ct, WebGLRenderer as ya, CameraHelper as Ea, SkinnedMesh as ba, SpotLightHelper as Ca, PointLightHelper as Sa, HemisphereLightHelper as wa, DirectionalLightHelper as xa, Clock as Oa, Vector4 as Ta, Box3 as Ma, Sphere as Pa, SkeletonHelper as Aa, SRGBColorSpace as ds, NoToneMapping as us, NoColorSpace as Da, LinearToneMapping as Ra, ReinhardToneMapping as Ia, CineonToneMapping as La, ACESFilmicToneMapping as ka, AgXToneMapping as Ua, NeutralToneMapping as ja, CustomToneMapping as Na } from "three";
import fn, { useState as Z, useRef as J, useEffect as tt, useMemo as jt, Component as zt, createRef as Ve, forwardRef as Fa } from "react";
import { Reorder as gn } from "framer-motion";
const ri = () => {
}, Bo = () => {
};
function oi(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function za(i) {
  const e = JSON.stringify(i);
  return navigator.clipboard.writeText(e), e;
}
function Ha() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ya(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function ps(i) {
  const e = Math.round(i.r * 255), t = Math.round(i.g * 255), s = Math.round(i.b * 255), n = (c) => {
    const l = c.toString(16);
    return l.length === 1 ? "0" + l : l;
  }, r = n(e), a = n(t), o = n(s);
  return "#" + r + a + o;
}
function yi(i, e, t, s) {
  return new (t || (t = Promise))(function(n, r) {
    function a(l) {
      try {
        c(s.next(l));
      } catch (d) {
        r(d);
      }
    }
    function o(l) {
      try {
        c(s.throw(l));
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
    c((s = s.apply(i, e || [])).next());
  });
}
const Ba = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function ms(i) {
  return i = i.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1");
}
const _n = typeof window > "u", Le = (() => {
  if (_n)
    return;
  const { userAgent: i, platform: e, maxTouchPoints: t } = window.navigator, s = /(iphone|ipod|ipad)/i.test(i), n = e === "iPad" || e === "MacIntel" && t > 0 && !window.MSStream;
  return { isIpad: n, isMobile: /android/i.test(i) || s || n, isSafari12: /Version\/12.+Safari/.test(i), isFirefox: /Firefox/.test(i) };
})();
function Va(i, e, t) {
  if (!t)
    return [e];
  const s = function(l) {
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
  `, m = l.createShader(35633), f = l.createShader(35632), w = l.createProgram();
    if (!(f && m && w))
      return;
    l.shaderSource(m, d), l.shaderSource(f, p), l.compileShader(m), l.compileShader(f), l.attachShader(w, m), l.attachShader(w, f), l.linkProgram(w), l.detachShader(w, m), l.detachShader(w, f), l.deleteShader(m), l.deleteShader(f), l.useProgram(w);
    const v = l.createBuffer();
    l.bindBuffer(34962, v), l.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
    const x = l.getAttribLocation(w, "aPosition");
    l.vertexAttribPointer(x, 3, 5126, !1, 0, 0), l.enableVertexAttribArray(x), l.clearColor(1, 1, 1, 1), l.clear(16384), l.viewport(0, 0, 1, 1), l.drawArrays(4, 0, 3);
    const g = new Uint8Array(4);
    return l.readPixels(0, 0, 1, 1, 6408, 5121, g), l.deleteProgram(w), l.deleteBuffer(v), g.join("");
  }(i), n = "801621810", r = "8016218135", a = "80162181161", o = Le?.isIpad ? [["a7", a, 12], ["a8", r, 15], ["a8x", r, 15], ["a9", r, 15], ["a9x", r, 15], ["a10", r, 15], ["a10x", r, 15], ["a12", n, 15], ["a12x", n, 15], ["a12z", n, 15], ["a14", n, 15], ["a15", n, 15], ["m1", n, 15], ["m2", n, 15]] : [["a7", a, 12], ["a8", r, 12], ["a9", r, 15], ["a10", r, 15], ["a11", n, 15], ["a12", n, 15], ["a13", n, 15], ["a14", n, 15], ["a15", n, 15], ["a16", n, 15], ["a17", n, 15]];
  let c;
  return s === "80162181255" ? c = o.filter(([, , l]) => l >= 14) : (c = o.filter(([, l]) => l === s), c.length || (c = o)), c.map(([l]) => `apple ${l} gpu`);
}
class fs extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
const Ei = [], gs = [];
function Za(i, e) {
  if (i === e)
    return 0;
  const t = i;
  i.length > e.length && (i = e, e = t);
  let s = i.length, n = e.length;
  for (; s > 0 && i.charCodeAt(~-s) === e.charCodeAt(~-n); )
    s--, n--;
  let r, a = 0;
  for (; a < s && i.charCodeAt(a) === e.charCodeAt(a); )
    a++;
  if (s -= a, n -= a, s === 0)
    return n;
  let o, c, l = 0, d = 0, p = 0;
  for (; d < s; )
    gs[d] = i.charCodeAt(a + d), Ei[d] = ++d;
  for (; p < n; )
    for (r = e.charCodeAt(a + p), o = p++, l = p, d = 0; d < s; d++)
      c = r === gs[d] ? o : o + 1, o = Ei[d], l = Ei[d] = o > l ? c > l ? l + 1 : c : c > o ? o + 1 : c;
  return l;
}
function Ga(i) {
  return i != null;
}
const Wa = ({ mobileTiers: i = [0, 15, 30, 60], desktopTiers: e = [0, 15, 30, 60], override: t = {}, glContext: s, failIfMajorPerformanceCaveat: n = !1, benchmarksURL: r = "https://unpkg.com/detect-gpu@5.0.57/dist/benchmarks" } = {}) => yi(void 0, void 0, void 0, function* () {
  const a = {};
  if (_n)
    return { tier: 0, type: "SSR" };
  const { isIpad: o = !!Le?.isIpad, isMobile: c = !!Le?.isMobile, screenSize: l = window.screen, loadBenchmarks: d = (S) => yi(void 0, void 0, void 0, function* () {
    const O = yield fetch(`${r}/${S}`).then((I) => I.json());
    if (parseInt(O.shift().split(".")[0], 10) < 4)
      throw new fs("Detect GPU benchmark data is out of date. Please update to version 4x");
    return O;
  }) } = t;
  let { renderer: p } = t;
  const m = (S, O, I, U, R) => ({ device: R, fps: U, gpu: I, isMobile: c, tier: S, type: O });
  let f, w = "";
  if (p)
    p = ms(p), f = [p];
  else {
    const S = s || function(I, U = !1) {
      const R = { alpha: !1, antialias: !1, depth: !1, failIfMajorPerformanceCaveat: U, powerPreference: "high-performance", stencil: !1 };
      I && delete R.powerPreference;
      const B = window.document.createElement("canvas"), Se = B.getContext("webgl", R) || B.getContext("experimental-webgl", R);
      return Se ?? void 0;
    }(Le?.isSafari12, n);
    if (!S)
      return m(0, "WEBGL_UNSUPPORTED");
    const O = Le?.isFirefox ? null : S.getExtension("WEBGL_debug_renderer_info");
    if (p = O ? S.getParameter(O.UNMASKED_RENDERER_WEBGL) : S.getParameter(S.RENDERER), !p)
      return m(1, "FALLBACK");
    w = p, p = ms(p), f = function(I, U, R) {
      return U === "apple gpu" ? Va(I, U, R) : [U];
    }(S, p, c);
  }
  const v = (yield Promise.all(f.map(function(S) {
    var O;
    return yi(this, void 0, void 0, function* () {
      const I = ((G) => {
        const le = c ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
        for (const Te of le)
          if (G.includes(Te))
            return Te;
      })(S);
      if (!I)
        return;
      const U = `${c ? "m" : "d"}-${I}${o ? "-ipad" : ""}.json`, R = a[U] = (O = a[U]) !== null && O !== void 0 ? O : d(U);
      let B;
      try {
        B = yield R;
      } catch (G) {
        if (G instanceof fs)
          throw G;
        return;
      }
      const Se = function(G) {
        var le;
        const Te = (G = G.replace(/\([^)]+\)/, "")).match(/\d+/) || G.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
        return (le = Te?.join("").replace(/\W|amd/g, "")) !== null && le !== void 0 ? le : "";
      }(S);
      let _e = B.filter(([, G]) => G === Se);
      _e.length || (_e = B.filter(([G]) => G.includes(S)));
      const re = _e.length;
      if (re === 0)
        return;
      const K = S.split(/[.,()\[\]/\s]/g).sort().filter((G, le, Te) => le === 0 || G !== Te[le - 1]).join(" ");
      let $, [Ue, , , , he] = re > 1 ? _e.map((G) => [G, Za(K, G[2])]).sort(([, G], [, le]) => G - le)[0][0] : _e[0], be = Number.MAX_VALUE;
      const { devicePixelRatio: ne } = window, je = l.width * ne * l.height * ne;
      for (const G of he) {
        const [le, Te] = G, yt = le * Te, it = Math.abs(je - yt);
        it < be && (be = it, $ = G);
      }
      if (!$)
        return;
      const [, , Ne, Fe] = $;
      return [be, Ne, Ue, Fe];
    });
  }))).filter(Ga).sort(([S = Number.MAX_VALUE, O], [I = Number.MAX_VALUE, U]) => S === I ? O - U : S - I);
  if (!v.length) {
    const S = Ba.find((O) => p.includes(O));
    return S ? m(0, "BLOCKLISTED", S) : m(1, "FALLBACK", `${p} (${w})`);
  }
  const [, x, g, y] = v[0];
  if (x === -1)
    return m(0, "BLOCKLISTED", g, x, y);
  const b = c ? i : e;
  let C = 0;
  for (let S = 0; S < b.length; S++)
    x >= b[S] && (C = S);
  return m(C, "BENCHMARK", g, x, y);
});
var Xa = /* @__PURE__ */ ((i) => (i[i.High = 0] = "High", i[i.Medium = 1] = "Medium", i[i.Low = 2] = "Low", i))(Xa || {});
function Vo(i) {
  return new Promise((e) => {
    Wa().then((t) => {
      let s = !1;
      const n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (s = "transferControlToOffscreen" in i, n) {
        const a = navigator.userAgent.match(/version\/(\d+)/i);
        s = (a ? parseInt(a[1]) : 0) >= 17;
      }
      const r = {
        dpr: devicePixelRatio,
        fps: t.fps !== void 0 ? t.fps : 30,
        width: innerWidth,
        height: innerHeight,
        mobile: t.isMobile !== void 0 ? t.isMobile : !1,
        supportOffScreenCanvas: s,
        quality: 2
        /* Low */
      };
      t.tier === 3 ? r.quality = 0 : t.tier === 2 && (r.quality = 1), e(r);
    });
  });
}
function $e(i, e, t) {
  return Math.min(e, Math.max(i, t));
}
function Ui(i, e, t) {
  return (t - i) / (e - i);
}
function Ft(i, e, t) {
  return i * (1 - t) + e * t;
}
function Zo(i, e, t, s, n) {
  return Ft(t, s, Ui(i, e, n));
}
function Go(i, e) {
  const t = i - e;
  return Math.sqrt(t * t);
}
function Pe(i, e = 1) {
  return Number(i.toFixed(e));
}
function Wo(i, e, t, s) {
  return Ft(i, e, 1 - Math.exp(-t * s));
}
function Xo(i, e = 1) {
  return Number(i.toFixed(e));
}
function $a(i, e, t, s) {
  return i === e && t === s;
}
function qa(i, e, t, s) {
  return 1 / (3 * e * i * i + 2 * t * i + s);
}
function Ka(i, e, t, s, n) {
  return e * (i * i * i) + t * (i * i) + s * i + n;
}
function Qa(i, e, t, s, n) {
  const r = i * i;
  return e * (r * i) + t * r + s * i + n;
}
function $o(i, e, t, s, n) {
  if (i <= 0)
    return 0;
  if (i >= 1)
    return 1;
  if ($a(e, t, s, n))
    return i;
  const r = 0, a = 0, o = e, c = t, l = s, d = n, p = 1, m = 1, f = p - 3 * l + 3 * o - r, w = 3 * l - 6 * o + 3 * r, v = 3 * o - 3 * r, x = r, g = m - 3 * d + 3 * c - a, y = 3 * d - 6 * c + 3 * a, b = 3 * c - 3 * a, C = a;
  let S = i;
  for (let O = 0; O < 5; O++) {
    const I = Ka(S, f, w, v, x);
    let U = qa(S, f, w, v);
    U === 1 / 0 && (U = i), S -= (I - i) * U, S = Math.min(Math.max(S, 0), 1);
  }
  return Qa(S, g, y, b, C);
}
const qo = (i) => {
  i?.dispose();
}, Ja = (i) => {
  i && (Array.isArray(i) ? i.forEach((e) => e.dispose()) : i.dispose());
}, He = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const e = i.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : He(e);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const e = i;
      e.geometry?.dispose(), Ja(e.material);
    }
    i.dispose !== void 0 && i.dispose();
  }
};
let ji = 0;
const _s = () => {
  ji = 0;
}, Ni = (i) => {
  if (!i)
    return;
  let e = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${ji}`, ji++), i.parent !== null && i.parent.uuid.length > 0 && (e = `${i.parent.uuid}.${e}`), i.uuid = e, i.isMesh !== void 0) {
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
  i.children.forEach((t) => Ni(t));
};
class ii {
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
      this.camera = new Li(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Ws(), this.material = new Je();
      const t = new _t();
      t.setAttribute("position", new Ke([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new Ke([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new Ke([0, 0, 2, 0, 0, 2], 2));
      const s = new M(t, this.material);
      this.scene.add(s);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, s = e.colorSpace;
      this.renderer.outputColorSpace = Nt, e.colorSpace = Nt, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = s;
    }
    return this.renderer.domElement;
  }
}
function Ko(i) {
  return new Promise((e) => {
    const t = new Wn();
    t.parseAsync(i.scene).then((s) => {
      const n = new Xn(s);
      if (i.animations.length > 0) {
        const a = i.animations.map((c) => $n.parse(c));
        n.clipAction(a[0]).play(), n.getRoot().animations = i.animations, n.getRoot().mixer = n;
      }
      const r = [];
      i.cameras && i.cameras.length > 0 && i.cameras.forEach((a) => {
        const o = t.parse(a);
        r.push(o);
      }), e({
        animations: i.animations,
        model: s,
        mixer: n,
        cameras: r
      });
    });
  });
}
const at = Gi([
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
]), er = Gi([
  "clientX",
  "clientY",
  "deltaX",
  "deltaY",
  "deltaMode"
]), tr = Gi([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "keyCode"
]);
function ir(i, e) {
  i.preventDefault(), er(i, e);
}
function sr(i) {
  i.preventDefault();
}
function nr(i, e, t) {
  for (const s of e)
    t[s] = i[s];
}
function Gi(i) {
  return function(t, s) {
    const n = { type: t.type };
    nr(t, i, n), s(n);
  };
}
function bi(i, e) {
  const t = [], s = { type: i.type, touches: t };
  for (let n = 0; n < i.touches.length; ++n) {
    const r = i.touches[n];
    t.push({
      pageX: r.pageX,
      pageY: r.pageY
    });
  }
  e(s);
}
const ar = {
  37: !0,
  // left
  38: !0,
  // up
  39: !0,
  // right
  40: !0
  // down
};
function rr(i, e) {
  const { keyCode: t } = i;
  ar[t] && (i.preventDefault(), tr(i, e));
}
const Qo = {
  contextmenu: sr,
  mousedown: at,
  mousemove: at,
  mouseup: at,
  pointerdown: at,
  pointermove: at,
  pointerup: at,
  touchstart: bi,
  touchmove: bi,
  touchend: bi,
  wheel: ir,
  keydown: rr
};
let or = 0;
class Jo {
  id;
  worker;
  constructor(e, t, s) {
    this.id = or++, this.worker = t;
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
    for (const [a, o] of Object.entries(s))
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
class lr extends Bi {
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
    e.preventDefault = ri, e.stopPropagation = ri, this.dispatchEvent(e);
  }
  focus() {
  }
  getRootNode() {
    return this;
  }
}
class el {
  targets = {};
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }
  makeProxy(e) {
    const { id: t } = e, s = new lr();
    this.targets[t] = s;
  }
  getProxy(e) {
    return this.targets[e];
  }
  handleEvent(e) {
    this.targets[e.id]?.handleEvent(e.data);
  }
}
class tl {
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
var A = /* @__PURE__ */ ((i) => (i.CUSTOM = "ToolEvents::custom", i.SELECT_DROPDOWN = "ToolEvents::selectDropdown", i.DRAG_UPDATE = "ToolEvents::dragUpdate", i.ADD_SCENE = "ToolEvents::addScene", i.REFRESH_SCENE = "ToolEvents::refreshScene", i.REMOVE_SCENE = "ToolEvents::removeScene", i.SET_SCENE = "ToolEvents::setScene", i.GET_OBJECT = "ToolEvents::getObject", i.SET_OBJECT = "ToolEvents::setObject", i.UPDATE_OBJECT = "ToolEvents::updateObject", i.CREATE_TEXTURE = "ToolEvents::createTexture", i.REQUEST_METHOD = "ToolEvents::requestMethod", i.ADD_CAMERA = "ToolEvents::addCamera", i.REMOVE_CAMERA = "ToolEvents::removeCamera", i.ADD_GROUP = "ToolEvents::addGroup", i.REMOVE_GROUP = "ToolEvents::removeGroup", i.ADD_SPLINE = "ToolEvents::addSpline", i.ADD_RENDERER = "ToolEvents::addRenderer", i.UPDATE_RENDERER = "ToolEvents::updateRenderer", i))(A || {});
const D = new Bi();
class Wi {
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
class il extends Wi {
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
        D.dispatchEvent({ type: A.SELECT_DROPDOWN, value: s.data });
        break;
      case "draggableListUpdate":
        D.dispatchEvent({ type: A.DRAG_UPDATE, value: s.data });
        break;
    }
  }
}
function sl(i, e, t) {
  if (i.editor) {
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
        i.send({ event: l, target: "app", data: d });
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
function nl() {
  setTimeout(() => {
    const i = document.getElementById("theatrejs-studio-root");
    if (i === null || i.shadowRoot === null)
      return;
    const e = i.shadowRoot.getElementById("pointer-root");
    if (e === null)
      return;
    const t = e.children[0];
    if (t === null)
      return;
    const s = t.children[1];
    s.style.justifyContent = "left";
    try {
      const n = s.children[1];
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
function cr(i, e, t, s, n) {
  const r = 1 - i;
  return r * r * r * e + 3 * r * r * i * t + 3 * r * i * i * s + i * i * i * n;
}
function hr(i, e, t) {
  if (i.type !== "bezier" || i.handles.length !== 4)
    throw new Error("Invalid keyframe data for Bézier interpolation.");
  const [s, n] = i.handles, r = (t - i.position) / (e.position - i.position);
  return cr(
    r,
    i.value,
    i.value + s,
    e.value + n,
    e.value
  );
}
class al extends Wi {
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
    const s = this.getSheetInstance(e, t);
    let n = this.sheets.get(s);
    return n !== void 0 || (n = this.project?.sheet(e, t), this.sheets.set(s, n)), n;
  }
  playSheet(e, t, s) {
    return new Promise((n) => {
      const r = t !== void 0 ? { ...t } : {};
      this.sheet(e, s)?.sequence.play(r).then((a) => n(a)), this.app.send({
        event: "playSheet",
        target: "editor",
        data: {
          sheet: e,
          instance: s,
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
    const c = `${this.getSheetInstance(e, r)}_${t}`;
    let l = this.sheetObjects.get(c), d = s;
    l !== void 0 && (d = { ...s, ...l.value }), l = a.object(t, d), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, n !== void 0 ? n : ri);
    const p = l.onValuesChange((m) => {
      if (this.app.editor) {
        for (const w in m) {
          const v = m[w];
          typeof v == "object" && Ya(v) && (m[w] = {
            r: v.r,
            g: v.g,
            b: v.b,
            a: v.a
          });
        }
        this.app.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: e,
            sheetObject: c,
            values: m
          }
        });
      }
      const f = this.sheetObjectCBs.get(c);
      f !== void 0 && f(m);
    });
    return this.sheetObjectUnsubscribe.set(c, p), l;
  }
  getSheetObjectKeyframes(e, t, s) {
    const n = this.sheet(e);
    if (n === void 0)
      return [];
    const r = `${e}_${t}`, a = this.sheetObjects.get(r);
    return a === void 0 ? [] : n.sequence.__experimental_getKeyframes(a.props[s]);
  }
  getSheetObjectVectors(e, t) {
    const s = this.sheet(e);
    if (s === void 0)
      return [];
    const n = `${e}_${t}`, r = this.sheetObjects.get(n);
    if (r === void 0)
      return [];
    const a = [], o = s.sequence.__experimental_getKeyframes(r.props.x), c = s.sequence.__experimental_getKeyframes(r.props.y), l = s.sequence.__experimental_getKeyframes(r.props.z), d = /* @__PURE__ */ new Set();
    return o.forEach((m) => d.add(m.position)), c.forEach((m) => d.add(m.position)), l.forEach((m) => d.add(m.position)), Array.from(d).sort((m, f) => m - f).forEach((m) => {
      const f = (w, v) => {
        const x = w.find((b, C) => b.position <= v && (w[C + 1]?.position || 1 / 0) > v), g = w.find((b) => b.position > v);
        if (!x)
          return g?.value || 0;
        if (!g || x.position === v)
          return x.value;
        if (x.type === "bezier")
          return hr(x, g, v);
        const y = (v - x.position) / (g.position - x.position);
        return x.value + y * (g.value - x.value);
      };
      a.push({
        position: m,
        x: f(o, m),
        y: f(c, m),
        z: f(l, m)
      });
    }), a;
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
function dr(i) {
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
function pt(i) {
  const e = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    children: []
  };
  return i.children.forEach((t) => {
    e.children.push(pt(t));
  }), e;
}
function ur(i) {
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
function pr(i) {
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
function rt(i) {
  const e = {};
  for (const t in i) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || pr(t))
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
          src: ii.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = ur(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return i.anisotropy !== void 0 && (e.anisotropy = i.anisotropy), i.clearcoat !== void 0 && (e.clearcoat = i.clearcoat), i.iridescence !== void 0 && (e.iridescence = i.iridescence), i.dispersion !== void 0 && (e.dispersion = i.dispersion), i.sheen !== void 0 && (e.sheen = i.sheen), i.transmission !== void 0 && (e.transmission = i.transmission), i.transmission !== void 0 && (e.transmission = i.transmission), e;
}
function Ci(i) {
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
        n.push(rt(r));
      }), e.material = n;
    } else
      e.material = rt(s.material);
  } else if (t.search("points") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((r) => {
        n.push(rt(r));
      }), e.material = n;
    } else
      e.material = rt(s.material);
  } else if (t.search("line") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((r) => {
        n.push(rt(r));
      }), e.material = n;
    } else
      e.material = rt(s.material);
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
function mr(i, e) {
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
function fr(i, e) {
  for (const t in e)
    i[t] = e[t];
}
function se(i, e, t) {
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
    a != null && fr(a, t);
  }
}
function vn(i) {
  return new Promise((e, t) => {
    const s = new Image();
    s.onload = () => {
      const n = new qn(s);
      n.wrapS = cs, n.wrapT = cs, n.needsUpdate = !0, e(n);
    }, s.onerror = t, s.src = i;
  });
}
class rl extends Wi {
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
    this.app.debugEnabled && (this.renderer !== void 0 && (ii.renderer = this.renderer), this.app.send({
      event: "getObject",
      target: "app",
      data: e
    }));
  }
  setObject(e) {
    this.renderer !== void 0 && (ii.renderer = this.renderer);
    const t = Ci(e);
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
    const s = `#${e.getClearColor(new et()).getHexString()}`;
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
        clearColor: s,
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
    _s(), Ni(e);
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
      const s = pt(t);
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
    return this.scenes.forEach((s, n) => {
      e.search(n) > -1 && (t = s);
    }), t;
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.app.debugEnabled))
      return;
    this.renderer !== void 0 && (ii.renderer = this.renderer), _s(), Ni(e);
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
    const t = Ci(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = Ci(e);
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
        D.dispatchEvent({ type: A.GET_OBJECT, value: s.data });
        break;
      case "updateObject":
        D.dispatchEvent({ type: A.UPDATE_OBJECT, value: s.data });
        break;
      case "createTexture":
        D.dispatchEvent({ type: A.CREATE_TEXTURE, value: s.data });
        break;
      case "requestMethod":
        D.dispatchEvent({ type: A.REQUEST_METHOD, value: s.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: pt(n.scenes.get(s.data.name))
        });
        break;
      case "updateRenderer":
        n.renderer && (n.renderer.autoClear = s.data.autoClear, n.renderer.autoClearColor = s.data.autoClearColor, n.renderer.autoClearDepth = s.data.autoClearDepth, n.renderer.autoClearStencil = s.data.autoClearStencil, n.renderer.outputColorSpace = s.data.outputColorSpace, n.renderer.localClippingEnabled = s.data.localClippingEnabled, n.renderer.setClearColor(s.data.clearColor, s.data.clearAlpha), n.renderer.toneMapping = s.data.toneMapping, n.renderer.toneMappingExposure = s.data.toneMappingExposure, mt.enabled = s.data.colorManagement);
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
        D.dispatchEvent({ type: A.SET_OBJECT, value: s.data });
        break;
      case "addScene":
        D.dispatchEvent({ type: A.ADD_SCENE, value: s.data });
        break;
      case "refreshScene":
        D.dispatchEvent({ type: A.REFRESH_SCENE, value: s.data });
        break;
      case "removeScene":
        D.dispatchEvent({ type: A.REMOVE_SCENE, value: s.data });
        break;
      case "setScene":
        D.dispatchEvent({ type: A.SET_SCENE, value: s.data });
        break;
      case "addCamera":
        D.dispatchEvent({ type: A.ADD_CAMERA, value: s.data });
        break;
      case "removeCamera":
        D.dispatchEvent({ type: A.REMOVE_CAMERA, value: s.data });
        break;
      case "addGroup":
        D.dispatchEvent({ type: A.ADD_GROUP, value: s.data });
        break;
      case "removeGroup":
        D.dispatchEvent({ type: A.REMOVE_GROUP, value: s.data });
        break;
      case "addSpline":
        D.dispatchEvent({ type: A.ADD_SPLINE, value: s.data });
        break;
      case "addRenderer":
        D.dispatchEvent({ type: A.ADD_RENDERER, value: s.data });
    }
  }
  // Renderer
  addRT(e, t) {
    const s = new Kn(32, 32, t);
    s.texture.name = e, this.renderTargets.set(e, s);
  }
  resize(e, t) {
    const s = this.dpr;
    this.renderTargets.forEach((r) => {
      r.setSize(e * s, t * s);
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
function gr(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Fi = { exports: {} }, St = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vs;
function _r() {
  if (vs)
    return St;
  vs = 1;
  var i = fn, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, n = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, r = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, c, l) {
    var d, p = {}, m = null, f = null;
    l !== void 0 && (m = "" + l), c.key !== void 0 && (m = "" + c.key), c.ref !== void 0 && (f = c.ref);
    for (d in c)
      s.call(c, d) && !r.hasOwnProperty(d) && (p[d] = c[d]);
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
var ys;
function vr() {
  return ys || (ys = 1, process.env.NODE_ENV !== "production" && function() {
    var i = fn, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), w = Symbol.iterator, v = "@@iterator";
    function x(h) {
      if (h === null || typeof h != "object")
        return null;
      var E = w && h[w] || h[v];
      return typeof E == "function" ? E : null;
    }
    var g = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(h) {
      {
        for (var E = arguments.length, T = new Array(E > 1 ? E - 1 : 0), k = 1; k < E; k++)
          T[k - 1] = arguments[k];
        b("error", h, T);
      }
    }
    function b(h, E, T) {
      {
        var k = g.ReactDebugCurrentFrame, H = k.getStackAddendum();
        H !== "" && (E += "%s", T = T.concat([H]));
        var W = T.map(function(F) {
          return String(F);
        });
        W.unshift("Warning: " + E), Function.prototype.apply.call(console[h], console, W);
      }
    }
    var C = !1, S = !1, O = !1, I = !1, U = !1, R;
    R = Symbol.for("react.module.reference");
    function B(h) {
      return !!(typeof h == "string" || typeof h == "function" || h === s || h === r || U || h === n || h === l || h === d || I || h === f || C || S || O || typeof h == "object" && h !== null && (h.$$typeof === m || h.$$typeof === p || h.$$typeof === a || h.$$typeof === o || h.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      h.$$typeof === R || h.getModuleId !== void 0));
    }
    function Se(h, E, T) {
      var k = h.displayName;
      if (k)
        return k;
      var H = E.displayName || E.name || "";
      return H !== "" ? T + "(" + H + ")" : T;
    }
    function _e(h) {
      return h.displayName || "Context";
    }
    function re(h) {
      if (h == null)
        return null;
      if (typeof h.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
        return h.displayName || h.name || null;
      if (typeof h == "string")
        return h;
      switch (h) {
        case s:
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
            var E = h;
            return _e(E) + ".Consumer";
          case a:
            var T = h;
            return _e(T._context) + ".Provider";
          case c:
            return Se(h, h.render, "ForwardRef");
          case p:
            var k = h.displayName || null;
            return k !== null ? k : re(h.type) || "Memo";
          case m: {
            var H = h, W = H._payload, F = H._init;
            try {
              return re(F(W));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var K = Object.assign, $ = 0, Ue, he, be, ne, je, Ne, Fe;
    function G() {
    }
    G.__reactDisabledLog = !0;
    function le() {
      {
        if ($ === 0) {
          Ue = console.log, he = console.info, be = console.warn, ne = console.error, je = console.group, Ne = console.groupCollapsed, Fe = console.groupEnd;
          var h = {
            configurable: !0,
            enumerable: !0,
            value: G,
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
            log: K({}, h, {
              value: Ue
            }),
            info: K({}, h, {
              value: he
            }),
            warn: K({}, h, {
              value: be
            }),
            error: K({}, h, {
              value: ne
            }),
            group: K({}, h, {
              value: je
            }),
            groupCollapsed: K({}, h, {
              value: Ne
            }),
            groupEnd: K({}, h, {
              value: Fe
            })
          });
        }
        $ < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var yt = g.ReactCurrentDispatcher, it;
    function Ht(h, E, T) {
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
    var pi = !1, Yt;
    {
      var wn = typeof WeakMap == "function" ? WeakMap : Map;
      Yt = new wn();
    }
    function $i(h, E) {
      if (!h || pi)
        return "";
      {
        var T = Yt.get(h);
        if (T !== void 0)
          return T;
      }
      var k;
      pi = !0;
      var H = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var W;
      W = yt.current, yt.current = null, le();
      try {
        if (E) {
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
`), ie = N.length - 1, ae = fe.length - 1; ie >= 1 && ae >= 0 && N[ie] !== fe[ae]; )
            ae--;
          for (; ie >= 1 && ae >= 0; ie--, ae--)
            if (N[ie] !== fe[ae]) {
              if (ie !== 1 || ae !== 1)
                do
                  if (ie--, ae--, ae < 0 || N[ie] !== fe[ae]) {
                    var we = `
` + N[ie].replace(" at new ", " at ");
                    return h.displayName && we.includes("<anonymous>") && (we = we.replace("<anonymous>", h.displayName)), typeof h == "function" && Yt.set(h, we), we;
                  }
                while (ie >= 1 && ae >= 0);
              break;
            }
        }
      } finally {
        pi = !1, yt.current = W, Te(), Error.prepareStackTrace = H;
      }
      var nt = h ? h.displayName || h.name : "", ls = nt ? Ht(nt) : "";
      return typeof h == "function" && Yt.set(h, ls), ls;
    }
    function xn(h, E, T) {
      return $i(h, !1);
    }
    function On(h) {
      var E = h.prototype;
      return !!(E && E.isReactComponent);
    }
    function Bt(h, E, T) {
      if (h == null)
        return "";
      if (typeof h == "function")
        return $i(h, On(h));
      if (typeof h == "string")
        return Ht(h);
      switch (h) {
        case l:
          return Ht("Suspense");
        case d:
          return Ht("SuspenseList");
      }
      if (typeof h == "object")
        switch (h.$$typeof) {
          case c:
            return xn(h.render);
          case p:
            return Bt(h.type, E, T);
          case m: {
            var k = h, H = k._payload, W = k._init;
            try {
              return Bt(W(H), E, T);
            } catch {
            }
          }
        }
      return "";
    }
    var Vt = Object.prototype.hasOwnProperty, qi = {}, Ki = g.ReactDebugCurrentFrame;
    function Zt(h) {
      if (h) {
        var E = h._owner, T = Bt(h.type, h._source, E ? E.type : null);
        Ki.setExtraStackFrame(T);
      } else
        Ki.setExtraStackFrame(null);
    }
    function Tn(h, E, T, k, H) {
      {
        var W = Function.call.bind(Vt);
        for (var F in h)
          if (W(h, F)) {
            var N = void 0;
            try {
              if (typeof h[F] != "function") {
                var fe = Error((k || "React class") + ": " + T + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw fe.name = "Invariant Violation", fe;
              }
              N = h[F](E, F, k, T, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ie) {
              N = ie;
            }
            N && !(N instanceof Error) && (Zt(H), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", k || "React class", T, F, typeof N), Zt(null)), N instanceof Error && !(N.message in qi) && (qi[N.message] = !0, Zt(H), y("Failed %s type: %s", T, N.message), Zt(null));
          }
      }
    }
    var Mn = Array.isArray;
    function mi(h) {
      return Mn(h);
    }
    function Pn(h) {
      {
        var E = typeof Symbol == "function" && Symbol.toStringTag, T = E && h[Symbol.toStringTag] || h.constructor.name || "Object";
        return T;
      }
    }
    function An(h) {
      try {
        return Qi(h), !1;
      } catch {
        return !0;
      }
    }
    function Qi(h) {
      return "" + h;
    }
    function Ji(h) {
      if (An(h))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pn(h)), Qi(h);
    }
    var Et = g.ReactCurrentOwner, Dn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, es, ts, fi;
    fi = {};
    function Rn(h) {
      if (Vt.call(h, "ref")) {
        var E = Object.getOwnPropertyDescriptor(h, "ref").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return h.ref !== void 0;
    }
    function In(h) {
      if (Vt.call(h, "key")) {
        var E = Object.getOwnPropertyDescriptor(h, "key").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return h.key !== void 0;
    }
    function Ln(h, E) {
      if (typeof h.ref == "string" && Et.current && E && Et.current.stateNode !== E) {
        var T = re(Et.current.type);
        fi[T] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', re(Et.current.type), h.ref), fi[T] = !0);
      }
    }
    function kn(h, E) {
      {
        var T = function() {
          es || (es = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        T.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: T,
          configurable: !0
        });
      }
    }
    function Un(h, E) {
      {
        var T = function() {
          ts || (ts = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        T.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: T,
          configurable: !0
        });
      }
    }
    var jn = function(h, E, T, k, H, W, F) {
      var N = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: h,
        key: E,
        ref: T,
        props: F,
        // Record the component responsible for creating this element.
        _owner: W
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
    function Nn(h, E, T, k, H) {
      {
        var W, F = {}, N = null, fe = null;
        T !== void 0 && (Ji(T), N = "" + T), In(E) && (Ji(E.key), N = "" + E.key), Rn(E) && (fe = E.ref, Ln(E, H));
        for (W in E)
          Vt.call(E, W) && !Dn.hasOwnProperty(W) && (F[W] = E[W]);
        if (h && h.defaultProps) {
          var ie = h.defaultProps;
          for (W in ie)
            F[W] === void 0 && (F[W] = ie[W]);
        }
        if (N || fe) {
          var ae = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          N && kn(F, ae), fe && Un(F, ae);
        }
        return jn(h, N, fe, H, k, Et.current, F);
      }
    }
    var gi = g.ReactCurrentOwner, is = g.ReactDebugCurrentFrame;
    function st(h) {
      if (h) {
        var E = h._owner, T = Bt(h.type, h._source, E ? E.type : null);
        is.setExtraStackFrame(T);
      } else
        is.setExtraStackFrame(null);
    }
    var _i;
    _i = !1;
    function vi(h) {
      return typeof h == "object" && h !== null && h.$$typeof === e;
    }
    function ss() {
      {
        if (gi.current) {
          var h = re(gi.current.type);
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
          var E = h.fileName.replace(/^.*[\\\/]/, ""), T = h.lineNumber;
          return `

Check your code at ` + E + ":" + T + ".";
        }
        return "";
      }
    }
    var ns = {};
    function zn(h) {
      {
        var E = ss();
        if (!E) {
          var T = typeof h == "string" ? h : h.displayName || h.name;
          T && (E = `

Check the top-level render call using <` + T + ">.");
        }
        return E;
      }
    }
    function as(h, E) {
      {
        if (!h._store || h._store.validated || h.key != null)
          return;
        h._store.validated = !0;
        var T = zn(E);
        if (ns[T])
          return;
        ns[T] = !0;
        var k = "";
        h && h._owner && h._owner !== gi.current && (k = " It was passed a child from " + re(h._owner.type) + "."), st(h), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', T, k), st(null);
      }
    }
    function rs(h, E) {
      {
        if (typeof h != "object")
          return;
        if (mi(h))
          for (var T = 0; T < h.length; T++) {
            var k = h[T];
            vi(k) && as(k, E);
          }
        else if (vi(h))
          h._store && (h._store.validated = !0);
        else if (h) {
          var H = x(h);
          if (typeof H == "function" && H !== h.entries)
            for (var W = H.call(h), F; !(F = W.next()).done; )
              vi(F.value) && as(F.value, E);
        }
      }
    }
    function Hn(h) {
      {
        var E = h.type;
        if (E == null || typeof E == "string")
          return;
        var T;
        if (typeof E == "function")
          T = E.propTypes;
        else if (typeof E == "object" && (E.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        E.$$typeof === p))
          T = E.propTypes;
        else
          return;
        if (T) {
          var k = re(E);
          Tn(T, h.props, "prop", k, h);
        } else if (E.PropTypes !== void 0 && !_i) {
          _i = !0;
          var H = re(E);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", H || "Unknown");
        }
        typeof E.getDefaultProps == "function" && !E.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Yn(h) {
      {
        for (var E = Object.keys(h.props), T = 0; T < E.length; T++) {
          var k = E[T];
          if (k !== "children" && k !== "key") {
            st(h), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", k), st(null);
            break;
          }
        }
        h.ref !== null && (st(h), y("Invalid attribute `ref` supplied to `React.Fragment`."), st(null));
      }
    }
    function os(h, E, T, k, H, W) {
      {
        var F = B(h);
        if (!F) {
          var N = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var fe = Fn(H);
          fe ? N += fe : N += ss();
          var ie;
          h === null ? ie = "null" : mi(h) ? ie = "array" : h !== void 0 && h.$$typeof === e ? (ie = "<" + (re(h.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : ie = typeof h, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ie, N);
        }
        var ae = Nn(h, E, T, H, W);
        if (ae == null)
          return ae;
        if (F) {
          var we = E.children;
          if (we !== void 0)
            if (k)
              if (mi(we)) {
                for (var nt = 0; nt < we.length; nt++)
                  rs(we[nt], h);
                Object.freeze && Object.freeze(we);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              rs(we, h);
        }
        return h === s ? Yn(ae) : Hn(ae), ae;
      }
    }
    function Bn(h, E, T) {
      return os(h, E, T, !0);
    }
    function Vn(h, E, T) {
      return os(h, E, T, !1);
    }
    var Zn = Vn, Gn = Bn;
    wt.Fragment = s, wt.jsx = Zn, wt.jsxs = Gn;
  }()), wt;
}
process.env.NODE_ENV === "production" ? Fi.exports = _r() : Fi.exports = vr();
var u = Fi.exports;
function yn(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ u.jsx("button", { children: i.title });
}
const yr = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), Er = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function br(i) {
  return /* @__PURE__ */ u.jsx(gn.Item, { value: i.title, children: /* @__PURE__ */ u.jsxs("div", { children: [
    Er,
    /* @__PURE__ */ u.jsx("span", { children: i.title }),
    /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => {
      i.onDelete(i.index);
    }, children: yr })
  ] }) }, i.title);
}
function Cr(i) {
  const [e, t] = Z(!1), [s, n] = Z(i.options), r = (l) => {
    i.onDragComplete(l), n(l);
  }, a = (l) => {
    const d = [...s];
    d.splice(l, 1), r(d);
  }, o = [];
  s.forEach((l, d) => {
    o.push(/* @__PURE__ */ u.jsx(br, { index: d, title: l, onDelete: a }, l));
  });
  let c = "dropdown draggable";
  return i.subdropdown && (c += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: c, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ u.jsx(yn, { title: i.title }),
    /* @__PURE__ */ u.jsx(gn.Group, { axis: "y", values: s, onReorder: r, style: { visibility: e ? "visible" : "hidden" }, children: o })
  ] });
}
function Sr(i) {
  const [e, t] = Z(!1), s = [];
  i.options.map((r, a) => {
    i.onSelect !== void 0 && (r.onSelect = i.onSelect), s.push(/* @__PURE__ */ u.jsx(wr, { option: r }, a));
  });
  let n = "dropdown";
  return i.subdropdown && (n += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ u.jsx(yn, { title: i.title }),
        /* @__PURE__ */ u.jsx(
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
function wr(i) {
  const { option: e } = i, [t, s] = Z("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ u.jsx(
        Cr,
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
        Sr,
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
            e.onSelect !== void 0 && e.onSelect(e.value), e.selectable && (t !== e.title ? s(e.title) : s(""));
          },
          children: e.title
        }
      );
      break;
  }
  return /* @__PURE__ */ u.jsx("li", { className: t === e.title ? "selected" : "", children: n }, Ha());
}
function ol(i, e, t) {
  function s(r) {
    switch (e.forEach((a) => {
      a.callback(i, a.remote, r);
    }), r.event) {
      case "custom":
        D.dispatchEvent({ type: A.CUSTOM, value: r.data });
        break;
    }
  }
  function n(r) {
    switch (t.forEach((a) => {
      a.callback(i, a.remote, r);
    }), r.event) {
      case "custom":
        D.dispatchEvent({ type: A.CUSTOM, value: r.data });
        break;
    }
  }
  i.listen = (r) => {
    r.target === "editor" ? n(r) : s(r);
  };
}
function li(i) {
  const [e, t] = Z(i.open !== void 0 ? i.open : !0), s = !e || i.children === void 0, n = () => {
    D.dispatchEvent({ type: A.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${s ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const r = !e;
          i.onToggle !== void 0 && i.onToggle(r), t(r);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: oi(i.label) })
        ]
      }
    ),
    i.onRefresh ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("button", { className: "refresh", onClick: i.onRefresh }),
      /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: n })
    ] }) : null,
    i.button,
    /* @__PURE__ */ u.jsx("div", { className: e ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { children: i.children }) }, Math.random())
  ] });
}
function En(i) {
  const e = J(null), [t, s] = Z(!1), n = i.child !== void 0 && i.child.children.length > 0, r = [];
  return i.child !== void 0 && i.child.children.length > 0 && i.child.children.map((a, o) => {
    r.push(/* @__PURE__ */ u.jsx(En, { child: a, three: i.three }, o));
  }), tt(() => {
    if (i.child) {
      const a = i.three.getScene(i.child.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", i.child.uuid);
        o !== void 0 && (e.current.style.opacity = o.visible ? "1" : "0.25");
      }
    }
  }, [t]), /* @__PURE__ */ u.jsx(u.Fragment, { children: i.child !== void 0 && /* @__PURE__ */ u.jsxs("div", { className: "childObject", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "child", children: [
      n ? /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx(
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
                  const c = "visible", l = !o.visible;
                  e.current.style.opacity = l ? "1" : "0.25", i.three.updateObject(i.child.uuid, c, l), se(o, c, l);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${dr(i.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: r }) })
  ] }, Math.random()) });
}
function Es(i) {
  const e = [];
  return i.child?.children.map((t, s) => {
    e.push(/* @__PURE__ */ u.jsx(En, { child: t, scene: i.scene, three: i.three }, s));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: e });
}
function It(i) {
  const [e, t] = Z(i.defaultValue);
  return tt(() => {
    let s = !1, n = -1, r = 0, a = i.defaultValue, o = !1;
    const c = (f) => {
      o = f.ctrlKey;
    }, l = (f) => {
      s = !0, r = Number(i.input.current?.value), n = f.clientX, document.addEventListener("mouseup", p, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("contextmenu", p, !1);
    }, d = (f) => {
      if (!s)
        return;
      const w = i.step !== void 0 ? i.step : 1, v = (f.clientX - n) * w * (o ? 10 : 1);
      a = Number((r + v).toFixed(4)), i.min !== void 0 && (a = Math.max(a, i.min)), i.max !== void 0 && (a = Math.min(a, i.max)), i.onChange !== void 0 && i.onChange(a), t(a);
    }, p = () => {
      s = !1, document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", p);
    }, m = (f) => {
      const w = Number(f.target.value);
      i.onChange !== void 0 && i.onChange(w), t(w);
    };
    return i.label.current?.addEventListener("mousedown", l, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", m), document.addEventListener("keydown", c, !1), document.addEventListener("keyup", c, !1), () => {
      i.label.current?.removeEventListener("mousedown", l), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", m), document.removeEventListener("mouseup", p), document.removeEventListener("mousemove", d), document.removeEventListener("contextmenu", p), document.removeEventListener("keydown", c), document.addEventListener("keyup", c, !1);
    };
  }, []), e;
}
function Qe(i) {
  const e = J(null), t = J(null), [s, n] = Z(i.value);
  return It({
    label: i.labelRef,
    input: e,
    sliderRef: t,
    defaultValue: s,
    min: i.min,
    max: i.max,
    step: i.step,
    onChange: (r) => {
      n(r), i.onChange !== void 0 && i.onChange(i.prop, r);
    }
  }), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    i.type === "number" && /* @__PURE__ */ u.jsx(
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
        onChange: (r) => {
          if (n(r.target.value), r.target.value.length === 0)
            return;
          const a = Number(r.target.value);
          isNaN(a) || i.onChange !== void 0 && i.onChange(i.prop, a);
        }
      }
    ),
    i.type === "range" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "text",
          value: s.toString(),
          disabled: i.disabled,
          ref: e,
          className: "min",
          onChange: (r) => {
            if (r.target.value.length === 0)
              return;
            const a = Number(r.target.value);
            isNaN(a) || i.onChange !== void 0 && i.onChange(i.prop, a);
          }
        }
      ),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          disabled: i.disabled,
          type: "range",
          value: s,
          min: i.min,
          max: i.max,
          step: i.step,
          ref: t,
          onChange: ri
        }
      )
    ] })
  ] });
}
function xr(i) {
  const e = J(null), t = J(null), s = J(null), n = J(null), r = J(null), a = J(null), o = J(null), c = J(null), l = J(null), d = J(null), [p, m] = Z(i.value.x), [f, w] = Z(i.value.y), [v, x] = Z({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [g, y] = Z(!1);
  It({
    label: o,
    input: e,
    defaultValue: p,
    min: v.min,
    max: v.max,
    step: 0.01,
    onChange: (R) => {
      m(R), i.onChange({ target: { value: { x: R, y: f } } });
    }
  }), It({
    label: c,
    input: t,
    defaultValue: f,
    min: v.min,
    max: v.max,
    step: 0.01,
    onChange: (R) => {
      w(R), i.onChange({ target: { value: { x: p, y: R } } });
    }
  }), It({
    label: l,
    input: s,
    defaultValue: v.min,
    min: v.min - 1,
    max: v.max + 1,
    step: 0.01,
    onChange: (R) => {
      x({ min: R, max: v.max });
    }
  }), It({
    label: d,
    input: n,
    defaultValue: v.max,
    min: v.min - 1,
    max: v.max + 1,
    step: 0.01,
    onChange: (R) => {
      x({ min: v.min, max: R });
    }
  });
  function b() {
    g || (window.addEventListener("mousemove", S), window.addEventListener("mouseup", C), y(!0));
  }
  function C() {
    window.removeEventListener("mousemove", S), window.removeEventListener("mouseup", C), y(!1);
  }
  function S(R) {
    const B = r.current.getBoundingClientRect(), Se = $e(0, 99, R.clientX - B.left) / 99, _e = 1 - $e(0, 99, R.clientY - B.top) / 99, re = Pe(Ft(v.min, v.max, Se), 3), K = Pe(Ft(v.min, v.max, _e), 3);
    i.onChange({ target: { value: { x: re, y: K } } }), m(re), w(K);
  }
  function O() {
    const R = Number(s.current.value);
    x({ min: R, max: v.max }), p < R && m($e(R, v.max, p)), f < R && w($e(R, v.max, f));
  }
  function I() {
    const R = Number(n.current.value);
    x({ min: v.min, max: R }), p > R && m($e(v.min, R, p)), f > R && w($e(v.min, R, f));
  }
  tt(() => {
    a.current.style.left = `${Ui(v.min, v.max, p) * 100}%`, a.current.style.top = `${(1 - Ui(v.min, v.max, f)) * 100}%`;
  }, [v, p, f]);
  const U = i.step !== void 0 ? i.step : 0.01;
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
            min: v.min,
            max: v.max,
            step: U,
            onChange: (R) => {
              if (m(R.target.value), R.target.value.length === 0)
                return;
              const B = Number(R.target.value);
              isNaN(B) || (i.onChange({ target: { value: { x: B, y: f } } }), B < v.min && x({ min: B, max: v.max }));
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
            min: v.min,
            max: v.max,
            step: U,
            onChange: (R) => {
              if (w(R.target.value), R.target.value.length === 0)
                return;
              const B = Number(R.target.value);
              isNaN(B) || (i.onChange({ target: { value: { x: p, y: B } } }), B > v.max && x({ min: v.min, max: B }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: l, children: "Min" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: v.min,
            step: U,
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
            value: v.max,
            step: U,
            onChange: I
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: r, onMouseDown: b, onMouseUp: C, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: a })
    ] })
  ] });
}
const Or = Math.PI / 180, Tr = 180 / Math.PI;
function ot(i, e, t, s, n) {
  return s + (i - e) * (n - s) / (t - e);
}
function lt(i, e, t) {
  return (1 - t) * i + t * e;
}
function zi(i) {
  return i * Or;
}
function Mr(i) {
  return i * Tr;
}
function bs(i) {
  const e = i.value.x !== void 0 && i.value.y !== void 0 && i.value.z !== void 0, t = i.value.isEuler !== void 0, s = i.value.elements !== void 0, n = i.step !== void 0 ? i.step : 0.01, r = [];
  if (t) {
    const a = jt(() => i.value, []);
    ["_x", "_y", "_z"].forEach((c) => {
      const l = J(null);
      r.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Qe,
            {
              value: Mr(a[c]),
              type: "number",
              prop: c,
              step: 0.1,
              labelRef: l,
              onChange: (d, p) => {
                a[d] = zi(p), i.onChange({ target: { value: a } });
              }
            }
          )
        ] }, c)
      );
    });
  } else if (e) {
    const a = jt(() => i.value, []), o = (l, d) => {
      a[l] = d, i.onChange({ target: { value: a } });
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
  } else if (s) {
    const a = jt(() => i.value, []), o = (c, l) => {
      const d = Number(c);
      a.elements[d] = l, i.onChange({ target: { value: a } });
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
function Pr(i) {
  const e = i.value.x !== void 0, t = i.step !== void 0 ? i.step : 0.01, s = [];
  if (e) {
    const n = jt(() => i.value, []), r = (o, c) => {
      n[o] = c, i.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const c = J(null);
      s.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: o.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Qe,
            {
              value: n[o],
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
    const n = jt(() => i.value, []), r = (a, o) => {
      const c = Number(a);
      n.elements[c] = o, i.onChange({ target: { value: n } });
    };
    for (let a = 0; a < 16; a++) {
      const o = J(null);
      s.push(
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: s });
}
function Ar(i) {
  return !(i === "defaultAttributeValues" || i === "forceSinglePass" || i === "linecap" || i === "linejoin" || i === "linewidth" || i === "normalMapType" || i === "precision" || i === "shadowSide" || i === "uniformsGroups" || i === "uniformsNeedUpdate" || i === "userData" || i === "version" || i === "wireframeLinecap" || i === "wireframeLinejoin" || i === "wireframeLinewidth" || i.slice(0, 4) === "clip" || i.slice(0, 7) === "polygon" || i.slice(0, 7) === "stencil" || i.slice(0, 2) === "is");
}
function Dr(i) {
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
function bn(i) {
  const e = i.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function Rr() {
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
const Ir = [
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
    value: Vi
  }
], Lr = [
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
], kr = [
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
], Ur = [
  {
    title: "Zero",
    value: $s
  },
  {
    title: "One",
    value: qs
  },
  {
    title: "Src Color",
    value: Ks
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
], jr = [
  {
    title: "Zero",
    value: $s
  },
  {
    title: "One",
    value: qs
  },
  {
    title: "Src Color",
    value: Ks
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
function xt(i, e) {
  i.needsUpdate = !0, i.type = "option", i.options = e;
}
function Nr(i, e, t, s) {
  return {
    type: "boolean",
    title: di(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (n, r) => {
      s.updateObject(t.uuid, `material.${i}`, r), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const a = s.getScene(t.uuid);
      if (a !== null) {
        const o = a.getObjectByProperty("uuid", t.uuid);
        se(o, `material.${i}`, r);
      }
    }
  };
}
function Fr(i, e, t, s) {
  const n = {
    type: "number",
    title: di(i),
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
        const c = o.getObjectByProperty("uuid", t.uuid);
        se(c, `material.${i}`, a);
      }
    }
  };
  switch (i) {
    case "blending":
      xt(n, Lr);
      break;
    case "blendDst":
      xt(n, jr);
      break;
    case "blendEquation":
      xt(n, kr);
      break;
    case "blendSrc":
      xt(n, Ur);
      break;
    case "side":
      xt(n, Ir);
      break;
  }
  return bn(i) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function zr(i, e, t, s) {
  const n = {
    type: "string",
    title: di(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (a, o) => {
      s.updateObject(t.uuid, `material.${i}`, o), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const c = s.getScene(t.uuid);
      if (c !== null) {
        const l = c.getObjectByProperty("uuid", t.uuid);
        se(l, `material.${i}`, o);
      }
    },
    onKeyDown: (a) => {
    }
  };
  return (i === "vertexShader" || i === "fragmentShader") && (n.disabled = !1, n.latest = n.value, n.onChange = (a, o) => {
    n.latest = o, s.updateObject(t.uuid, `material.${i}`, o);
    const c = s.getScene(t.uuid);
    if (c !== null) {
      const l = c.getObjectByProperty("uuid", t.uuid);
      se(l, `material.${i}`, o);
    }
  }, n.onKeyDown = (a) => {
    if (a.key === "Enter" && (a.altKey || a.metaKey)) {
      s.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = s.getScene(t.uuid);
      if (o !== null) {
        const c = o.getObjectByProperty("uuid", t.uuid);
        se(c, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Hr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z === void 0;
}
function Yr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w === void 0;
}
function Br(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w !== void 0;
}
function Hi(i) {
  i.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function Lt(i, e, t, s, n = "", r = !1) {
  const a = di(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${i}` : i, c = typeof e;
  if (c === "boolean" || c === "string")
    return {
      title: a,
      prop: o,
      type: c,
      value: e,
      disabled: r,
      onChange: (l, d) => {
        s.updateObject(t.uuid, `material.${o}`, d);
        const p = s.getScene(t.uuid);
        if (p !== null) {
          const m = p.getObjectByProperty("uuid", t.uuid);
          se(m, `material.${o}`, d);
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
        s.updateObject(t.uuid, `material.${o}`, p);
        const m = s.getScene(t.uuid);
        if (m !== null) {
          const f = m.getObjectByProperty("uuid", t.uuid);
          se(f, `material.${o}`, p);
        }
      }
    };
    return bn(a) && (l.type = "range", l.min = 0, l.max = 1), l;
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
          s.updateObject(t.uuid, `material.${o}`, p);
          const m = s.getScene(t.uuid);
          if (m !== null) {
            const f = m.getObjectByProperty("uuid", t.uuid);
            se(f, `material.${o}`, p);
          }
        }
      };
    if (Array.isArray(e)) {
      const l = [];
      for (const d in e) {
        const p = e[d], m = `[${d.toString()}]`;
        if (p.value !== void 0) {
          const f = Lt(`${m}.value`, p.value, t, s, o, r);
          f !== void 0 && l.push(f);
        } else {
          const f = Lt(m, p, t, s, o, r);
          f !== void 0 && l.push(f);
        }
      }
      if (l.length > 0)
        return Hi(l), {
          title: a,
          items: l
        };
    } else {
      if (Hr(e))
        return {
          title: a,
          prop: o,
          type: "vector2",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            s.updateObject(t.uuid, `material.${o}`, d);
            const p = s.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              se(m, `material.${o}`, d);
            }
          }
        };
      if (Yr(e))
        return {
          title: a,
          prop: o,
          type: "grid3",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            s.updateObject(t.uuid, `material.${o}`, d);
            const p = s.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              se(m, `material.${o}`, d);
            }
          }
        };
      if (Br(e))
        return {
          title: a,
          prop: o,
          type: "grid4",
          value: e,
          disabled: r,
          onChange: (l, d) => {
            s.updateObject(t.uuid, `material.${o}`, d);
            const p = s.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              se(m, `material.${o}`, d);
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
            s.updateObject(t.uuid, `material.${o}`, d);
            const p = s.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              se(m, `material.${o}`, d);
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
            const p = Dr(i), m = n.length > 0 ? `${n}.${p}` : p;
            s.createTexture(t.uuid, `material.${m}`, d);
            const f = s.getScene(t.uuid);
            if (f !== null) {
              const w = f.getObjectByProperty("uuid", t.uuid);
              if (w !== void 0) {
                const v = (x) => {
                  const g = w.material, y = m.split(".");
                  switch (y.length) {
                    case 1:
                      g[y[0]] = x;
                      break;
                    case 2:
                      g[y[0]][y[1]] = x;
                      break;
                    case 3:
                      g[y[0]][y[1]][y[2]] = x;
                      break;
                    case 4:
                      g[y[0]][y[1]][y[2]][y[3]] = x;
                      break;
                    case 5:
                      g[y[0]][y[1]][y[2]][y[3]][y[4]] = x;
                      break;
                  }
                  g.needsUpdate = !0;
                };
                d.src.length > 0 ? vn(d.src).then((x) => {
                  x.offset.set(d.offset[0], d.offset[1]), x.repeat.set(d.repeat[0], d.repeat[1]), v(x);
                }) : v(null);
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
            s.updateObject(t.uuid, `material.${o}`, d);
            const p = s.getScene(t.uuid);
            if (p !== null) {
              const m = p.getObjectByProperty("uuid", t.uuid);
              se(m, `material.${o}`, d);
            }
          }
        };
      {
        const l = [], d = i === "defines" || i === "extensions";
        try {
          for (const p in e) {
            const m = e[p];
            if (m !== void 0)
              if (m.value !== void 0) {
                const f = Lt(`${p}.value`, m.value, t, s, o, d);
                f !== void 0 && l.push(f);
              } else {
                const f = Lt(p, m, t, s, o, d);
                f !== void 0 && l.push(f);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", i, e);
        }
        if (l.length > 0)
          return Hi(l), {
            title: a,
            items: l
          };
      }
    }
  }
}
function Cs(i, e, t) {
  const s = [];
  for (const n in i) {
    if (!Ar(n))
      continue;
    const r = typeof i[n], a = i[n];
    if (r === "boolean")
      s.push(Nr(n, a, e, t));
    else if (r === "number")
      s.push(Fr(n, a, e, t));
    else if (r === "string")
      s.push(zr(n, a, e, t));
    else if (r === "object") {
      const o = Lt(n, a, e, t);
      o !== void 0 && s.push(o);
    } else
      a !== void 0 && console.log("other:", n, r, a);
  }
  return Hi(s), s.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const r = n.getObjectByProperty("uuid", e.uuid);
        se(r, "material.needsUpdate", !0);
      }
    }
  }), s;
}
function Vr(i, e) {
  function t() {
    return `${e.app.appID}_material`;
  }
  const s = localStorage.getItem(t()), n = s !== null ? s === "open" : !1;
  function r(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const a = i.material;
  if (Array.isArray(a)) {
    const o = [], c = a.length;
    for (let l = 0; l < c; l++)
      o.push(
        /* @__PURE__ */ u.jsx(
          Oe,
          {
            title: `Material ${l}`,
            items: Cs(a[l], i, e)
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
        items: Cs(a, i, e),
        expanded: n,
        onToggle: (o) => {
          r(o);
        }
      }
    );
}
const Ss = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Zr(i) {
  const e = i.step !== void 0 ? i.step : 0.01, t = J(null), s = J(null), n = J(null), r = J(null), a = J(null), [o] = Z(i.value), [c, l] = Z(i.value.offset[0]), [d, p] = Z(i.value.offset[1]), [m, f] = Z(i.value.repeat[0]), [w, v] = Z(i.value.repeat[1]);
  function x(y, b, C, S, O) {
    if (i.onChange !== void 0) {
      const I = i.prop !== void 0 ? i.prop : i.title;
      i.onChange(I, {
        src: y,
        offset: [b, C],
        repeat: [S, O]
      });
    }
  }
  function g(y) {
    const b = t.current.src, C = y.target.value;
    switch (y.target) {
      case s.current:
        l(C), x(b, C, d, m, w);
        break;
      case n.current:
        p(C), x(b, c, C, m, w);
        break;
      case r.current:
        f(C), x(b, c, d, C, w);
        break;
      case a.current:
        v(C), x(b, c, d, m, C);
        break;
    }
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ u.jsx("img", { alt: i.title, ref: t, onClick: () => {
      Rr().then((y) => {
        t.current.src = y, x(y, c, d, m, w);
      });
    }, src: o.src.length > 0 ? o.src : Ss }),
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: s,
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
            value: w,
            step: e,
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ u.jsx("button", { onClick: () => {
        x("", c, d, m, w), t.current.src = Ss;
      }, children: "Clear" })
    ] })
  ] });
}
function si(i) {
  let e = i.value;
  e !== void 0 && (e.isColor !== void 0 ? e = ps(i.value) : i.type === "color" && (e = ps(new et().setStyle(i.value, Nt))));
  const [t, s] = Z(e), n = J(null), r = (l) => {
    let d = l.target.value;
    if (i.type === "boolean")
      d = l.target.checked;
    else if (i.type === "option" && (typeof i.value == "number" ? d = Number(d) : typeof i.value == "boolean" ? d = !!d : typeof i.value == "object" && (d = JSON.parse(d)), i.options !== void 0)) {
      const p = i.options.length;
      for (let m = 0; m < p && i.options[m].value !== d; m++)
        ;
    }
    s(d), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, d);
  }, a = {};
  i.disabled && (a.opacity = 0.8);
  const o = i.type === "string" && (t.length > 100 || t.search(`
`) > -1), c = o || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${c ? "block" : ""}`, style: a, children: [
    i.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: n, children: oi(i.title) }, "fieldLabel"),
    i.type === "string" && !o && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: i.disabled,
        onChange: r,
        value: t
      }
    ),
    i.type === "string" && o && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: i.disabled !== void 0 ? i.disabled : !0,
        onChange: r,
        onKeyDown: (l) => {
          i.onKeyDown !== void 0 && i.onKeyDown(l);
        },
        value: t
      }
    ),
    i.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: i.disabled,
        onChange: r,
        checked: t
      }
    ),
    i.type === "number" && /* @__PURE__ */ u.jsx(
      Qe,
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
    i.type === "range" && /* @__PURE__ */ u.jsx(
      Qe,
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
    i.type === "color" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("input", { type: "text", value: t.toString(), onChange: r, disabled: i.disabled, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: t, onChange: r, disabled: i.disabled })
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
    i.type === "image" && /* @__PURE__ */ u.jsx(Zr, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: r, disabled: i.disabled, defaultValue: i.value, children: i.options?.map((l, d) => /* @__PURE__ */ u.jsx("option", { value: l.value, children: oi(l.title) }, d)) }) }),
    i.type === "vector2" && /* @__PURE__ */ u.jsx(xr, { step: i.step, value: t, min: 0, max: 1, onChange: r }),
    i.type === "grid3" && /* @__PURE__ */ u.jsx(bs, { step: i.step, value: t, onChange: r }),
    i.type === "grid4" && /* @__PURE__ */ u.jsx(Pr, { step: i.step, value: t, onChange: r }),
    i.type === "euler" && /* @__PURE__ */ u.jsx(bs, { step: i.step, value: t, onChange: r })
  ] });
}
function Gr(i) {
  return "items" in i;
}
class Oe extends zt {
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
    const s = Ve(), n = /* @__PURE__ */ u.jsx(
      Oe,
      {
        ref: s,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return this.subgroupNames.push(e.title), this.subgroupElements.push(n), this.setState({ lastUpdated: Date.now() }), s;
  }
  removeGroup(e) {
    const t = this.subgroupNames.length;
    for (let s = 0; s < t; s++) {
      const n = this.subgroupNames[s];
      if (e === n) {
        this.subgroupNames.splice(s, 1), this.subgroupElements.splice(s, 1), this.setState({ lastUpdated: Date.now() });
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
      if (Gr(t))
        e.push(
          /* @__PURE__ */ u.jsx(Oe, { title: oi(t.title), items: t.items }, Math.random())
        );
      else {
        const s = this.valueOverrides.get(t.title), n = s !== void 0 ? s : t.value;
        e.push(
          /* @__PURE__ */ u.jsx(
            si,
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
      li,
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
class te extends zt {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, te.instance = this, D.addEventListener(A.ADD_GROUP, this.addGroup), D.addEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    D.removeEventListener(A.ADD_GROUP, this.addGroup), D.removeEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ u.jsx("div", { className: "customGroups", children: te.groups }, this.state.lastUpdate);
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
    }), te.groups.push(
      /* @__PURE__ */ u.jsx(
        Oe,
        {
          title: t.title,
          items: s
        },
        Math.random()
      )
    ), te.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, s = te.groupTitles.length;
    for (let n = 0; n < s; n++)
      if (t === te.groupTitles[n]) {
        te.groups.splice(n, 1), te.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
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
    const s = Ve(), n = /* @__PURE__ */ u.jsx(
      Oe,
      {
        ref: s,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return te.groups.push(n), te.groupsRefs.push(s), te.groupTitles.push(e.title), s;
  }
  static removeEditorGroup(e) {
    const t = te.groupTitles.length;
    for (let s = 0; s < t; s++)
      if (e === te.groupTitles[s]) {
        te.groups.splice(s, 1), te.groupTitles.splice(s, 1), te.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
}
function ws(i) {
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
function Wr(i, e) {
  function t() {
    return `${e.app.appID}_camera`;
  }
  const s = localStorage.getItem(t()), n = s !== null ? s === "open" : !1;
  function r(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const a = [];
  if (i.perspectiveCameraInfo !== void 0)
    for (const o in i.perspectiveCameraInfo)
      a.push({
        title: ws(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(i.uuid, c, l), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const d = e.getScene(i.uuid);
          if (d !== null) {
            const p = d.getObjectByProperty("uuid", i.uuid);
            p !== void 0 && (se(p, c, l), p.updateProjectionMatrix());
          }
        }
      });
  else if (i.orthographicCameraInfo !== void 0)
    for (const o in i.orthographicCameraInfo)
      a.push({
        title: ws(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(i.uuid, c, l), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const d = e.getScene(i.uuid);
          if (d !== null) {
            const p = d.getObjectByProperty("uuid", i.uuid);
            p !== void 0 && (se(p, c, l), p.updateProjectionMatrix());
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
class Xr extends Ie {
  constructor(e, t) {
    const s = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new _t();
    n.setAttribute("position", new Ke(s, 3)), n.computeBoundingSphere();
    const r = new Zi({ fog: !1 });
    super(n, r), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const a = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new _t();
    o.setAttribute("position", new Ke(a, 3)), o.computeBoundingSphere(), this.add(new M(o, new Je({ side: Xs, fog: !1 })));
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
const xs = { type: "change" }, Xi = { type: "start" }, Cn = { type: "end" }, Wt = new da(), Os = new ua(), $r = Math.cos(70 * pa.DEG2RAD), oe = new P(), ye = 2 * Math.PI, V = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Si = 1e-6;
class qr extends hn {
  constructor(e, t = null) {
    super(e, t), this.state = V.NONE, this.enabled = !0, this.target = new P(), this.cursor = new P(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: gt.ROTATE, MIDDLE: gt.DOLLY, RIGHT: gt.PAN }, this.touches = { ONE: ft.ROTATE, TWO: ft.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new P(), this._lastQuaternion = new Ce(), this._lastTargetPosition = new P(), this._quat = new Ce().setFromUnitVectors(e.up, new P(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ki(), this._sphericalDelta = new ki(), this._scale = 1, this._panOffset = new P(), this._rotateStart = new pe(), this._rotateEnd = new pe(), this._rotateDelta = new pe(), this._panStart = new pe(), this._panEnd = new pe(), this._panDelta = new pe(), this._dollyStart = new pe(), this._dollyEnd = new pe(), this._dollyDelta = new pe(), this._dollyDirection = new P(), this._mouse = new pe(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Qr.bind(this), this._onPointerDown = Kr.bind(this), this._onPointerUp = Jr.bind(this), this._onContextMenu = ro.bind(this), this._onMouseWheel = io.bind(this), this._onKeyDown = so.bind(this), this._onTouchStart = no.bind(this), this._onTouchMove = ao.bind(this), this._onMouseDown = eo.bind(this), this._onMouseMove = to.bind(this), this._interceptControlDown = oo.bind(this), this._interceptControlUp = lo.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(xs), this.update(), this.state = V.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    oe.copy(t).sub(this.target), oe.applyQuaternion(this._quat), this._spherical.setFromVector3(oe), this.autoRotate && this.state === V.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(s) && isFinite(n) && (s < -Math.PI ? s += ye : s > Math.PI && (s -= ye), n < -Math.PI ? n += ye : n > Math.PI && (n -= ye), s <= n ? this._spherical.theta = Math.max(s, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + n) / 2 ? Math.max(s, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
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
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (Wt.origin.copy(this.object.position), Wt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Wt.direction)) < $r ? this.object.lookAt(this.target) : (Os.setFromNormalAndCoplanarPoint(this.object.up, this.target), Wt.intersectPlane(Os, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > Si || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Si || this._lastTargetPosition.distanceToSquared(this.target) > Si ? (this.dispatchEvent(xs), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
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
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      oe.copy(n).sub(this.target);
      let r = oe.length();
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
    this._rotateLeft(ye * this._rotateDelta.x / t.clientHeight), this._rotateUp(ye * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    t === void 0 && (t = new pe(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function Kr(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function Qr(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Jr(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Cn), this.state = V.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function eo(i) {
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
    case gt.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(i), this.state = V.DOLLY;
      break;
    case gt.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(i), this.state = V.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(i), this.state = V.ROTATE;
      }
      break;
    case gt.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(i), this.state = V.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(i), this.state = V.PAN;
      }
      break;
    default:
      this.state = V.NONE;
  }
  this.state !== V.NONE && this.dispatchEvent(Xi);
}
function to(i) {
  switch (this.state) {
    case V.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(i);
      break;
    case V.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(i);
      break;
    case V.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(i);
      break;
  }
}
function io(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== V.NONE || (i.preventDefault(), this.dispatchEvent(Xi), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Cn));
}
function so(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function no(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ft.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(i), this.state = V.TOUCH_ROTATE;
          break;
        case ft.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(i), this.state = V.TOUCH_PAN;
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
          this._handleTouchStartDollyPan(i), this.state = V.TOUCH_DOLLY_PAN;
          break;
        case ft.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(i), this.state = V.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = V.NONE;
      }
      break;
    default:
      this.state = V.NONE;
  }
  this.state !== V.NONE && this.dispatchEvent(Xi);
}
function ao(i) {
  switch (this._trackPointer(i), this.state) {
    case V.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case V.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(i), this.update();
      break;
    case V.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case V.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = V.NONE;
  }
}
function ro(i) {
  this.enabled !== !1 && i.preventDefault();
}
function oo(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function lo(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
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
function Ze(i) {
  return i.isPerspectiveCamera;
}
function Be(i) {
  return i.isOrthographicCamera;
}
const ht = Math.PI * 2, Ts = Math.PI / 2, Sn = 1e-5, Ot = Math.PI / 180;
function Me(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function q(i, e = Sn) {
  return Math.abs(i) < e;
}
function Y(i, e, t = Sn) {
  return q(i - e, t);
}
function Ms(i, e) {
  return Math.round(i / e) * e;
}
function Tt(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Mt(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function Xt(i, e, t, s, n = 1 / 0, r) {
  s = Math.max(1e-4, s);
  const a = 2 / s, o = a * r, c = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let l = i - e;
  const d = e, p = n * s;
  l = Me(l, -p, p), e = i - l;
  const m = (t.value + a * l) * r;
  t.value = (t.value - a * m) * c;
  let f = e + (l + m) * c;
  return d - i > 0 == f > d && (f = d, t.value = (f - d) / r), f;
}
function Ps(i, e, t, s, n = 1 / 0, r, a) {
  s = Math.max(1e-4, s);
  const o = 2 / s, c = o * r, l = 1 / (1 + c + 0.48 * c * c + 0.235 * c * c * c);
  let d = e.x, p = e.y, m = e.z, f = i.x - d, w = i.y - p, v = i.z - m;
  const x = d, g = p, y = m, b = n * s, C = b * b, S = f * f + w * w + v * v;
  if (S > C) {
    const $ = Math.sqrt(S);
    f = f / $ * b, w = w / $ * b, v = v / $ * b;
  }
  d = i.x - f, p = i.y - w, m = i.z - v;
  const O = (t.x + o * f) * r, I = (t.y + o * w) * r, U = (t.z + o * v) * r;
  t.x = (t.x - o * O) * l, t.y = (t.y - o * I) * l, t.z = (t.z - o * U) * l, a.x = d + (f + O) * l, a.y = p + (w + I) * l, a.z = m + (v + U) * l;
  const R = x - i.x, B = g - i.y, Se = y - i.z, _e = a.x - x, re = a.y - g, K = a.z - y;
  return R * _e + B * re + Se * K > 0 && (a.x = x, a.y = g, a.z = y, t.x = (a.x - x) / r, t.y = (a.y - g) / r, t.z = (a.z - y) / r), a;
}
function wi(i, e) {
  e.set(0, 0), i.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= i.length, e.y /= i.length;
}
function xi(i, e) {
  return Be(i) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class co {
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
var Oi;
const ho = "2.9.0", $t = 1 / 8, uo = /Mac/.test((Oi = globalThis?.navigator) === null || Oi === void 0 ? void 0 : Oi.platform);
let L, As, qt, Ti, Ee, j, z, dt, Pt, Ae, De, Ge, Ds, Rs, xe, At, ut, Is, Mi, Ls, Pi, Ai, Kt;
class ke extends co {
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
    L = e.THREE, As = Object.freeze(new L.Vector3(0, 0, 0)), qt = Object.freeze(new L.Vector3(0, 1, 0)), Ti = Object.freeze(new L.Vector3(0, 0, 1)), Ee = new L.Vector2(), j = new L.Vector3(), z = new L.Vector3(), dt = new L.Vector3(), Pt = new L.Vector3(), Ae = new L.Vector3(), De = new L.Vector3(), Ge = new L.Vector3(), Ds = new L.Vector3(), Rs = new L.Vector3(), xe = new L.Spherical(), At = new L.Spherical(), ut = new L.Box3(), Is = new L.Box3(), Mi = new L.Sphere(), Ls = new L.Quaternion(), Pi = new L.Quaternion(), Ai = new L.Matrix4(), Kt = new L.Raycaster();
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
    }, this._enabled = !0, this._state = _.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = ct.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new L.Vector3(), this._focalOffsetVelocity = new L.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (g, y, b) => {
      let C, S;
      if (Ze(this._camera)) {
        const O = j.copy(this._camera.position).sub(this._target), I = this._camera.getEffectiveFOV() * Ot, U = O.length() * Math.tan(I * 0.5);
        C = this.truckSpeed * g * U / this._elementRect.height, S = this.truckSpeed * y * U / this._elementRect.height;
      } else if (Be(this._camera)) {
        const O = this._camera;
        C = g * (O.right - O.left) / O.zoom / this._elementRect.width, S = y * (O.top - O.bottom) / O.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (b ? this.setFocalOffset(this._focalOffsetEnd.x + C, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(C, 0, !0), this.forward(-S, !0)) : b ? this.setFocalOffset(this._focalOffsetEnd.x + C, this._focalOffsetEnd.y + S, this._focalOffsetEnd.z, !0) : this.truck(C, S, !0);
    }, this._rotateInternal = (g, y) => {
      const b = ht * this.azimuthRotateSpeed * g / this._elementRect.height, C = ht * this.polarRotateSpeed * y / this._elementRect.height;
      this.rotate(b, C, !0);
    }, this._dollyInternal = (g, y, b) => {
      const C = Math.pow(0.95, -g * this.dollySpeed), S = this._sphericalEnd.radius, O = this._sphericalEnd.radius * C, I = Me(O, this.minDistance, this.maxDistance), U = I - O;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(O, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(U, !0), this._dollyToNoClamp(I, !0)) : this._dollyToNoClamp(I, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? O : I) - S, this._dollyControlCoord.set(y, b)), this._lastDollyDirection = Math.sign(-g);
    }, this._zoomInternal = (g, y, b) => {
      const C = Math.pow(0.95, g * this.dollySpeed), S = this._zoom, O = this._zoom * C;
      this.zoomTo(O, !0), this.dollyToCursor && (this._changedZoom += O - S, this._dollyControlCoord.set(y, b));
    }, typeof L > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new L.Quaternion().setFromUnitVectors(this._camera.up, qt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = _.NONE, this._target = new L.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new L.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new L.Spherical().setFromVector3(j.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new L.Vector3(),
      new L.Vector3(),
      new L.Vector3(),
      new L.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new L.Box3(new L.Vector3(-1 / 0, -1 / 0, -1 / 0), new L.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new L.Vector2(), this.mouseButtons = {
      left: _.ROTATE,
      middle: _.DOLLY,
      right: _.TRUCK,
      wheel: Ze(this._camera) ? _.DOLLY : Be(this._camera) ? _.ZOOM : _.NONE
    }, this.touches = {
      one: _.TOUCH_ROTATE,
      two: Ze(this._camera) ? _.TOUCH_DOLLY_TRUCK : Be(this._camera) ? _.TOUCH_ZOOM_TRUCK : _.NONE,
      three: _.TOUCH_TRUCK
    };
    const s = new L.Vector2(), n = new L.Vector2(), r = new L.Vector2(), a = (g) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const C = this._domElement.getBoundingClientRect(), S = g.clientX / C.width, O = g.clientY / C.height;
        if (S < this._interactiveArea.left || S > this._interactiveArea.right || O < this._interactiveArea.top || O > this._interactiveArea.bottom)
          return;
      }
      const y = g.pointerType !== "mouse" ? null : (g.buttons & ee.LEFT) === ee.LEFT ? ee.LEFT : (g.buttons & ee.MIDDLE) === ee.MIDDLE ? ee.MIDDLE : (g.buttons & ee.RIGHT) === ee.RIGHT ? ee.RIGHT : null;
      if (y !== null) {
        const C = this._findPointerByMouseButton(y);
        C && this._disposePointer(C);
      }
      if ((g.buttons & ee.LEFT) === ee.LEFT && this._lockedPointer)
        return;
      const b = {
        pointerId: g.pointerId,
        clientX: g.clientX,
        clientY: g.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: y
      };
      this._activePointers.push(b), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), this._isDragging = !0, m(g);
    }, o = (g) => {
      g.cancelable && g.preventDefault();
      const y = g.pointerId, b = this._lockedPointer || this._findPointerById(y);
      if (b) {
        if (b.clientX = g.clientX, b.clientY = g.clientY, b.deltaX = g.movementX, b.deltaY = g.movementY, this._state = 0, g.pointerType === "touch")
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
      const y = this._findPointerById(g.pointerId);
      if (!(y && y === this._lockedPointer)) {
        if (y && this._disposePointer(y), g.pointerType === "touch")
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
        w();
      }
    };
    let l = -1;
    const d = (g) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === _.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), I = g.clientX / O.width, U = g.clientY / O.height;
        if (I < this._interactiveArea.left || I > this._interactiveArea.right || U < this._interactiveArea.top || U > this._interactiveArea.bottom)
          return;
      }
      if (g.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === _.ROTATE || this.mouseButtons.wheel === _.TRUCK) {
        const O = performance.now();
        l - O < 1e3 && this._getClientRect(this._elementRect), l = O;
      }
      const y = uo ? -1 : -3, b = g.deltaMode === 1 ? g.deltaY / y : g.deltaY / (y * 10), C = this.dollyToCursor ? (g.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, S = this.dollyToCursor ? (g.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
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
          this._dollyInternal(-b, C, S), this._isUserControllingDolly = !0;
          break;
        }
        case _.ZOOM: {
          this._zoomInternal(-b, C, S), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, p = (g) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === ke.ACTION.NONE) {
          const y = g instanceof PointerEvent ? g.pointerId : 0, b = this._findPointerById(y);
          b && this._disposePointer(b), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c);
          return;
        }
        g.preventDefault();
      }
    }, m = (g) => {
      if (!this._enabled)
        return;
      if (wi(this._activePointers, Ee), this._getClientRect(this._elementRect), s.copy(Ee), n.copy(Ee), this._activePointers.length >= 2) {
        const b = Ee.x - this._activePointers[1].clientX, C = Ee.y - this._activePointers[1].clientY, S = Math.sqrt(b * b + C * C);
        r.set(0, S);
        const O = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, I = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(O, I);
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
      this._dragNeedsUpdate = !1, wi(this._activePointers, Ee);
      const y = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, b = y ? -y.deltaX : n.x - Ee.x, C = y ? -y.deltaY : n.y - Ee.y;
      if (n.copy(Ee), ((this._state & _.ROTATE) === _.ROTATE || (this._state & _.TOUCH_ROTATE) === _.TOUCH_ROTATE || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(b, C), this._isUserControllingRotate = !0), (this._state & _.DOLLY) === _.DOLLY || (this._state & _.ZOOM) === _.ZOOM) {
        const S = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, O = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, I = this.dollyDragInverted ? -1 : 1;
        (this._state & _.DOLLY) === _.DOLLY ? (this._dollyInternal(I * C * $t, S, O), this._isUserControllingDolly = !0) : (this._zoomInternal(I * C * $t, S, O), this._isUserControllingZoom = !0);
      }
      if ((this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_ZOOM) === _.TOUCH_ZOOM || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) {
        const S = Ee.x - this._activePointers[1].clientX, O = Ee.y - this._activePointers[1].clientY, I = Math.sqrt(S * S + O * O), U = r.y - I;
        r.set(0, I);
        const R = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, B = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(U * $t, R, B), this._isUserControllingDolly = !0) : (this._zoomInternal(U * $t, R, B), this._isUserControllingZoom = !0);
      }
      ((this._state & _.TRUCK) === _.TRUCK || (this._state & _.TOUCH_TRUCK) === _.TOUCH_TRUCK || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK) && (this._truckInternal(b, C, !1), this._isUserControllingTruck = !0), ((this._state & _.OFFSET) === _.OFFSET || (this._state & _.TOUCH_OFFSET) === _.TOUCH_OFFSET || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET) && (this._truckInternal(b, C, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, w = () => {
      wi(this._activePointers, Ee), n.copy(Ee), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", v), this._domElement.ownerDocument.addEventListener("pointerlockerror", x), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), m());
    }, this.unlockPointer = () => {
      var g, y, b;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (g = this._domElement) === null || g === void 0 || g.ownerDocument.exitPointerLock(), (y = this._domElement) === null || y === void 0 || y.ownerDocument.removeEventListener("pointerlockchange", v), (b = this._domElement) === null || b === void 0 || b.ownerDocument.removeEventListener("pointerlockerror", x), this.cancel();
    };
    const v = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, x = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (g) => {
      this._domElement = g, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", a), this._domElement.addEventListener("pointercancel", c), this._domElement.addEventListener("wheel", d, { passive: !1 }), this._domElement.addEventListener("contextmenu", p);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", a), this._domElement.removeEventListener("pointercancel", c), this._domElement.removeEventListener("wheel", d, { passive: !1 }), this._domElement.removeEventListener("contextmenu", p), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.removeEventListener("pointerlockchange", v), this._domElement.ownerDocument.removeEventListener("pointerlockerror", x));
    }, this.cancel = () => {
      this._state !== _.NONE && (this._state = _.NONE, this._activePointers.length = 0, w());
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
    const n = Me(e, this.minAzimuthAngle, this.maxAzimuthAngle), r = Me(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = r, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, s || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const a = !s || Y(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && Y(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
    const s = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const a = this._collisionTest(), o = Y(a, this._spherical.radius);
      if (!(s > e) && o)
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
    const s = !t || Y(this._target.x, this._targetEnd.x, this.restThreshold) && Y(this._target.y, this._targetEnd.y, this.restThreshold) && Y(this._target.z, this._targetEnd.z, this.restThreshold);
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
    this._isUserControllingZoom = !1, this._zoomEnd = Me(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, t || (this._zoom = this._zoomEnd);
    const s = !t || Y(this._zoom, this._zoomEnd, this.restThreshold);
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
    this._camera.updateMatrix(), Ae.setFromMatrixColumn(this._camera.matrix, 0), De.setFromMatrixColumn(this._camera.matrix, 1), Ae.multiplyScalar(e), De.multiplyScalar(-t);
    const n = j.copy(Ae).add(De), r = z.copy(this._targetEnd).add(n);
    return this.moveTo(r.x, r.y, r.z, s);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    j.setFromMatrixColumn(this._camera.matrix, 0), j.crossVectors(this._camera.up, j), j.multiplyScalar(e);
    const s = z.copy(this._targetEnd).add(j);
    return this.moveTo(s.x, s.y, s.z, t);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, t = !1) {
    return j.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + j.x, this._targetEnd.y + j.y, this._targetEnd.z + j.z, t);
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
    const r = j.set(e, t, s).sub(this._targetEnd);
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
  lookInDirectionOf(e, t, s, n = !1) {
    const o = j.set(e, t, s).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
    const c = [], l = e.isBox3 ? ut.copy(e) : ut.setFromObject(e);
    l.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const d = Ms(this._sphericalEnd.theta, Ts), p = Ms(this._sphericalEnd.phi, Ts);
    c.push(this.rotateTo(d, p, t));
    const m = j.setFromSpherical(this._sphericalEnd).normalize(), f = Ls.setFromUnitVectors(m, Ti), w = Y(Math.abs(m.y), 1);
    w && f.multiply(Pi.setFromAxisAngle(qt, d)), f.multiply(this._yAxisUpSpaceInverse);
    const v = Is.makeEmpty();
    z.copy(l.min).applyQuaternion(f), v.expandByPoint(z), z.copy(l.min).setX(l.max.x).applyQuaternion(f), v.expandByPoint(z), z.copy(l.min).setY(l.max.y).applyQuaternion(f), v.expandByPoint(z), z.copy(l.max).setZ(l.min.z).applyQuaternion(f), v.expandByPoint(z), z.copy(l.min).setZ(l.max.z).applyQuaternion(f), v.expandByPoint(z), z.copy(l.max).setY(l.min.y).applyQuaternion(f), v.expandByPoint(z), z.copy(l.max).setX(l.min.x).applyQuaternion(f), v.expandByPoint(z), z.copy(l.max).applyQuaternion(f), v.expandByPoint(z), v.min.x -= n, v.min.y -= a, v.max.x += r, v.max.y += o, f.setFromUnitVectors(Ti, m), w && f.premultiply(Pi.invert()), f.premultiply(this._yAxisUpSpace);
    const x = v.getSize(j), g = v.getCenter(z).applyQuaternion(f);
    if (Ze(this._camera)) {
      const y = this.getDistanceToFitBox(x.x, x.y, x.z, s);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.dollyTo(y, t)), c.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Be(this._camera)) {
      const y = this._camera, b = y.right - y.left, C = y.top - y.bottom, S = s ? Math.max(b / x.x, C / x.y) : Math.min(b / x.x, C / x.y);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.zoomTo(S, t)), c.push(this.setFocalOffset(0, 0, 0, t));
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
    const s = [], r = "isObject3D" in e ? ke.createBoundingSphere(e, Mi) : Mi.copy(e);
    if (s.push(this.moveTo(r.center.x, r.center.y, r.center.z, t)), Ze(this._camera)) {
      const a = this.getDistanceToFitSphere(r.radius);
      s.push(this.dollyTo(a, t));
    } else if (Be(this._camera)) {
      const a = this._camera.right - this._camera.left, o = this._camera.top - this._camera.bottom, c = 2 * r.radius, l = Math.min(a / c, o / c);
      s.push(this.zoomTo(l, t));
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
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = ct.NONE, this._changedDolly = 0;
    const c = z.set(n, r, a), l = j.set(e, t, s);
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
  lerpLookAt(e, t, s, n, r, a, o, c, l, d, p, m, f, w = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = ct.NONE, this._changedDolly = 0;
    const v = j.set(n, r, a), x = z.set(e, t, s);
    xe.setFromVector3(x.sub(v).applyQuaternion(this._yAxisUpSpace));
    const g = dt.set(d, p, m), y = z.set(o, c, l);
    At.setFromVector3(y.sub(g).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(v.lerp(g, f));
    const b = At.theta - xe.theta, C = At.phi - xe.phi, S = At.radius - xe.radius;
    this._sphericalEnd.set(xe.radius + S * f, xe.phi + C * f, xe.theta + b * f), this.normalizeRotations(), this._needsUpdate = !0, w || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const O = !w || Y(this._target.x, this._targetEnd.x, this.restThreshold) && Y(this._target.y, this._targetEnd.y, this.restThreshold) && Y(this._target.z, this._targetEnd.z, this.restThreshold) && Y(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && Y(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && Y(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    const r = this.getPosition(j), a = this.setLookAt(r.x, r.y, r.z, e, t, s, n);
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
  setFocalOffset(e, t, s, n = !1) {
    this._isUserControllingOffset = !1, this._focalOffsetEnd.set(e, t, s), this._needsUpdate = !0, n || this._focalOffset.copy(this._focalOffsetEnd);
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
  setOrbitPoint(e, t, s) {
    this._camera.updateMatrixWorld(), Ae.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), De.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), Ge.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = j.set(e, t, s), r = n.distanceTo(this._camera.position), a = n.sub(this._camera.position);
    Ae.multiplyScalar(a.x), De.multiplyScalar(a.y), Ge.multiplyScalar(a.z), j.copy(Ae).add(De).add(Ge), j.z = j.z + r, this.dollyTo(r, !1), this.setFocalOffset(-j.x, j.y, -j.z, !1), this.moveTo(e, t, s, !1);
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
    this._viewport = this._viewport || new L.Vector4(), typeof e == "number" ? this._viewport.set(e, t, s, n) : this._viewport.copy(e);
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
    if (xi(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const r = e / t, a = this._camera.getEffectiveFOV() * Ot, o = this._camera.aspect;
    return ((n ? r > o : r < o) ? t : e / o) * 0.5 / Math.tan(a * 0.5) + s * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (xi(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * Ot, s = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : s;
    return e / Math.sin(n * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, t = !0) {
    return (e && e.isVector3 ? e : new L.Vector3()).copy(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, t = !0) {
    return (e && e.isVector3 ? e : new L.Vector3()).setFromSpherical(t ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, t = !0) {
    return (e || new L.Spherical()).copy(t ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, t = !0) {
    return (e && e.isVector3 ? e : new L.Vector3()).copy(t ? this._focalOffsetEnd : this._focalOffset);
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
      const s = this.getPosition(j);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, qt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = j.subVectors(this._target, this._camera.position).normalize(), t = z.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const s = this.getPosition(j);
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
    const t = this._sphericalEnd.theta - this._spherical.theta, s = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, r = Ds.subVectors(this._targetEnd, this._target), a = Rs.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (q(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Xt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (q(s))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const p = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Xt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, p, 1 / 0, e), this._needsUpdate = !0;
    }
    if (q(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const p = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Xt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, p, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (q(r.x) && q(r.y) && q(r.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const p = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      Ps(this._target, this._targetEnd, this._targetVelocity, p, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (q(a.x) && q(a.y) && q(a.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const p = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      Ps(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, p, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (q(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const p = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Xt(this._zoom, this._zoomEnd, this._zoomVelocity, p, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (Ze(this._camera) && this._changedDolly !== 0) {
        const p = this._spherical.radius - this._lastDistance, m = this._camera, f = this._getCameraDirection(Pt), w = j.copy(f).cross(m.up).normalize();
        w.lengthSq() === 0 && (w.x = 1);
        const v = z.crossVectors(w, f), x = this._sphericalEnd.radius * Math.tan(m.getEffectiveFOV() * Ot * 0.5), y = (this._sphericalEnd.radius - p - this._sphericalEnd.radius) / this._sphericalEnd.radius, b = dt.copy(this._targetEnd).add(w.multiplyScalar(this._dollyControlCoord.x * x * m.aspect)).add(v.multiplyScalar(this._dollyControlCoord.y * x)), C = j.copy(this._targetEnd).lerp(b, y), S = this._lastDollyDirection === ct.IN && this._spherical.radius <= this.minDistance, O = this._lastDollyDirection === ct.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (S || O)) {
          this._sphericalEnd.radius -= p, this._spherical.radius -= p;
          const U = z.copy(f).multiplyScalar(-p);
          C.add(U);
        }
        this._boundary.clampPoint(C, C);
        const I = z.subVectors(C, this._targetEnd);
        this._targetEnd.copy(C), this._target.add(I), this._changedDolly -= p, q(this._changedDolly) && (this._changedDolly = 0);
      } else if (Be(this._camera) && this._changedZoom !== 0) {
        const p = this._zoom - this._lastZoom, m = this._camera, f = j.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (m.near + m.far) / (m.near - m.far)).unproject(m), w = z.set(0, 0, -1).applyQuaternion(m.quaternion), v = dt.copy(f).add(w.multiplyScalar(-f.dot(m.up))), g = -(this._zoom - p - this._zoom) / this._zoom, y = this._getCameraDirection(Pt), b = this._targetEnd.dot(y), C = j.copy(this._targetEnd).lerp(v, g), S = C.dot(y), O = y.multiplyScalar(S - b);
        C.sub(O), this._boundary.clampPoint(C, C);
        const I = z.subVectors(C, this._targetEnd);
        this._targetEnd.copy(C), this._target.add(I), this._changedZoom -= p, q(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const c = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, c), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!q(this._focalOffset.x) || !q(this._focalOffset.y) || !q(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Ae.setFromMatrixColumn(this._camera.matrix, 0), De.setFromMatrixColumn(this._camera.matrix, 1), Ge.setFromMatrixColumn(this._camera.matrix, 2), Ae.multiplyScalar(this._focalOffset.x), De.multiplyScalar(-this._focalOffset.y), Ge.multiplyScalar(this._focalOffset.z), j.copy(Ae).add(De).add(Ge), this._camera.position.add(j)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), j.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const d = this._needsUpdate;
    return d && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : d ? (this.dispatchEvent({ type: "update" }), q(t, this.restThreshold) && q(s, this.restThreshold) && q(n, this.restThreshold) && q(r.x, this.restThreshold) && q(r.y, this.restThreshold) && q(r.z, this.restThreshold) && q(a.x, this.restThreshold) && q(a.y, this.restThreshold) && q(a.z, this.restThreshold) && q(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !d && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = d, this._needsUpdate = !1, d;
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
      position: j.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
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
    this.enabled = s.enabled, this.minDistance = s.minDistance, this.maxDistance = Mt(s.maxDistance), this.minZoom = s.minZoom, this.maxZoom = Mt(s.maxZoom), this.minPolarAngle = s.minPolarAngle, this.maxPolarAngle = Mt(s.maxPolarAngle), this.minAzimuthAngle = Mt(s.minAzimuthAngle), this.maxAzimuthAngle = Mt(s.maxAzimuthAngle), this.smoothTime = s.smoothTime, this.draggingSmoothTime = s.draggingSmoothTime, this.dollySpeed = s.dollySpeed, this.truckSpeed = s.truckSpeed, this.dollyToCursor = s.dollyToCursor, this.verticalDragToForward = s.verticalDragToForward, this._target0.fromArray(s.target0), this._position0.fromArray(s.position0), this._zoom0 = s.zoom0, this._focalOffset0.fromArray(s.focalOffset0), this.moveTo(s.target[0], s.target[1], s.target[2], t), xe.setFromVector3(j.fromArray(s.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(xe.theta, xe.phi, t), this.dollyTo(xe.radius, t), this.zoomTo(s.zoom, t), this.setFocalOffset(s.focalOffset[0], s.focalOffset[1], s.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", ho), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const r = z.copy(t).add(e), o = this._boundary.clampPoint(r, dt).sub(r), c = o.lengthSq();
    if (c === 0)
      return e.add(t);
    if (c === n)
      return e;
    if (s === 0)
      return e.add(t).add(o);
    {
      const l = 1 + s * c / t.dot(o);
      return e.add(z.copy(t).multiplyScalar(l)).add(o.multiplyScalar(1 - s));
    }
  }
  _updateNearPlaneCorners() {
    if (Ze(this._camera)) {
      const e = this._camera, t = e.near, s = e.getEffectiveFOV() * Ot, n = Math.tan(s * 0.5) * t, r = n * e.aspect;
      this._nearPlaneCorners[0].set(-r, -n, 0), this._nearPlaneCorners[1].set(r, -n, 0), this._nearPlaneCorners[2].set(r, n, 0), this._nearPlaneCorners[3].set(-r, n, 0);
    } else if (Be(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, s = e.left * t, n = e.right * t, r = e.top * t, a = e.bottom * t;
      this._nearPlaneCorners[0].set(s, r, 0), this._nearPlaneCorners[1].set(n, r, 0), this._nearPlaneCorners[2].set(n, a, 0), this._nearPlaneCorners[3].set(s, a, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || xi(this._camera, "_collisionTest"))
      return e;
    const s = this._getTargetDirection(Pt);
    Ai.lookAt(As, s, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const r = z.copy(this._nearPlaneCorners[n]);
      r.applyMatrix4(Ai);
      const a = dt.addVectors(this._target, r);
      Kt.set(a, s), Kt.far = this._spherical.radius + 1;
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
  static createBoundingSphere(e, t = new L.Sphere()) {
    const s = t, n = s.center;
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
        j.fromBufferAttribute(d, p), r = Math.max(r, n.distanceToSquared(j));
    }), s.radius = Math.sqrt(r), s;
  }
}
const ci = (i) => {
  const [e, t] = Z(i.options[i.index]), s = () => {
    i.onToggle(!i.open);
  }, n = (r) => {
    r !== e && (i.onSelect(r), t(r)), i.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: s, children: `${i.title}: ${e}` }),
    i.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: i.options.map((r) => /* @__PURE__ */ u.jsx("li", { onClick: () => n(r), children: r }, r)) })
  ] });
}, We = Fa(function(e, t) {
  const s = [
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
        ci,
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
        ci,
        {
          title: "Mode",
          index: s.indexOf(n),
          open: c,
          options: s,
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
var po = function(i) {
  typeof i == "string" && (i = [i]);
  for (var e = [].slice.call(arguments, 1), t = [], s = 0; s < i.length - 1; s++)
    t.push(i[s], e[s] || "");
  return t.push(i[s]), t.join("");
};
const ks = /* @__PURE__ */ gr(po);
var mo = `out vec3 worldPosition;\r
uniform float uDistance;

void main() {\r
  
  worldPosition = position.xzy * uDistance;\r
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);\r
}`, fo = `out vec4 fragColor;\r
in vec3 worldPosition;\r
uniform float uDivisions;\r
uniform float uScale;\r
uniform vec3 uColor;\r
uniform float uDistance;\r
uniform float uGridOpacity;\r
uniform float uSubgridOpacity;

float getGrid(float gapSize) {\r
  vec2 worldPositionByDivision = worldPosition.xz / gapSize;

  
  
  
  
  
  vec2 grid = abs(fract(worldPositionByDivision-0.5)-0.5) / fwidth(worldPositionByDivision) / 2.0;\r
  float gridLine = min(grid.x, grid.y);

  
  return 1.0 - min(gridLine, 1.0);\r
}

void main() {\r
  float cameraDistanceToGridPlane = max(200.0, distance(cameraPosition.y, worldPosition.y));\r
  float cameraDistanceToFragmentOnGridPlane = distance(cameraPosition.xyz, worldPosition.xyz);

  
  
  float subGridPower = pow(uDivisions, floor(log(cameraDistanceToGridPlane) / log(uDivisions)));\r
  float gridPower = subGridPower * uDivisions;

  
  float nextGridPower = gridPower * uDivisions;

  
  float subgrid = getGrid(subGridPower * uScale);\r
  float grid = getGrid(gridPower * uScale);\r
  float nextGrid = getGrid(nextGridPower * uScale);

  
  float stepPercentage = (cameraDistanceToGridPlane - subGridPower)/(gridPower - subGridPower);

  
  float fadeRange = 0.3;

  
  float fadePercentage = max(stepPercentage - 1.0 + fadeRange, 0.0) / fadeRange;

  
  float baseOpacity = subgrid * pow(1.0 - min(cameraDistanceToFragmentOnGridPlane / uDistance, 1.0), 3.0);

  
  fragColor = vec4(uColor.rgb, (baseOpacity - fadePercentage) * uSubgridOpacity);

  
  float fadeCoefficient = 0.5;

  
  fragColor.a = mix(fragColor.a, baseOpacity * uGridOpacity - fadePercentage * (uGridOpacity - uSubgridOpacity) * fadeCoefficient, grid);

  
  fragColor.a = mix(fragColor.a, baseOpacity * uGridOpacity, nextGrid);

  if (fragColor.a <= 0.0) discard;\r
}`;
class go extends dn {
  constructor(e) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: !0
      },
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
      glslVersion: ma,
      side: Vi,
      transparent: !0,
      name: "InfiniteGrid",
      depthTest: !1,
      depthWrite: !1,
      vertexShader: ks(mo),
      fragmentShader: ks(fo)
    });
  }
}
class _o extends M {
  gridMaterial;
  constructor(e) {
    const t = new go(e);
    super(new un(), t), this.gridMaterial = t, this.frustumCulled = !1, this.name = "InfiniteGridHelper";
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
function Us(i) {
  const [e, t] = Z(i.selected), s = "toggle" + (e ? " selected" : "");
  return /* @__PURE__ */ u.jsx(
    "button",
    {
      className: s,
      onClick: () => {
        const n = !e;
        t(n), i.onClick(n);
      },
      style: {
        backgroundImage: `url(${i.icon})`,
        backgroundPositionY: `${i.top}px`,
        backgroundSize: `26px ${i.height}px`
      }
    },
    i.name
  );
}
const vo = `#include <common>
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
}`, yo = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class Eo extends dn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: vo,
      fragmentShader: yo
    });
  }
}
const Xe = new ai(), ue = new P(), Ye = new P(), Q = new Ce(), js = {
  X: new P(1, 0, 0),
  Y: new P(0, 1, 0),
  Z: new P(0, 0, 1)
}, Di = { type: "change" }, Ns = { type: "mouseDown", mode: null }, Fs = { type: "mouseUp", mode: null }, zs = { type: "objectChange" };
class bo extends hn {
  constructor(e, t = null) {
    super(void 0, t);
    const s = new To(this);
    this._root = s;
    const n = new Mo();
    this._gizmo = n, s.add(n);
    const r = new Po();
    this._plane = r, s.add(r);
    const a = this;
    function o(b, C) {
      let S = C;
      Object.defineProperty(a, b, {
        get: function() {
          return S !== void 0 ? S : C;
        },
        set: function(O) {
          S !== O && (S = O, r[b] = O, n[b] = O, a.dispatchEvent({ type: b + "-changed", value: O }), a.dispatchEvent(Di));
        }
      }), a[b] = C, r[b] = C, n[b] = C;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const c = new P(), l = new P(), d = new Ce(), p = new Ce(), m = new P(), f = new Ce(), w = new P(), v = new P(), x = new P(), g = 0, y = new P();
    o("worldPosition", c), o("worldPositionStart", l), o("worldQuaternion", d), o("worldQuaternionStart", p), o("cameraPosition", m), o("cameraQuaternion", f), o("pointStart", w), o("pointEnd", v), o("rotationAxis", x), o("rotationAngle", g), o("eye", y), this._offset = new P(), this._startNorm = new P(), this._endNorm = new P(), this._cameraScale = new P(), this._parentPosition = new P(), this._parentQuaternion = new Ce(), this._parentQuaternionInv = new Ce(), this._parentScale = new P(), this._worldScaleStart = new P(), this._worldQuaternionInv = new Ce(), this._worldScale = new P(), this._positionStart = new P(), this._quaternionStart = new Ce(), this._scaleStart = new P(), this._getPointer = Co.bind(this), this._onPointerDown = wo.bind(this), this._onPointerHover = So.bind(this), this._onPointerMove = xo.bind(this), this._onPointerUp = Oo.bind(this), t !== null && this.connect();
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
    const t = Ri(this._gizmo.picker[this.mode], Xe);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && Xe.setFromCamera(e, this.camera);
      const t = Ri(this._plane, Xe, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, Ns.mode = this.mode, this.dispatchEvent(Ns);
    }
  }
  pointerMove(e) {
    const t = this.axis, s = this.mode, n = this.object;
    let r = this.space;
    if (s === "scale" ? r = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (r = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && Xe.setFromCamera(e, this.camera);
    const a = Ri(this._plane, Xe, !0);
    if (a) {
      if (this.pointEnd.copy(a.point).sub(this.worldPositionStart), s === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (n.position.applyQuaternion(Q.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), r === "world" && (n.parent && n.position.add(ue.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(ue.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (s === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), Ye.set(o, o, o);
        } else
          ue.copy(this.pointStart), Ye.copy(this.pointEnd), ue.applyQuaternion(this._worldQuaternionInv), Ye.applyQuaternion(this._worldQuaternionInv), Ye.divide(ue), t.search("X") === -1 && (Ye.x = 1), t.search("Y") === -1 && (Ye.y = 1), t.search("Z") === -1 && (Ye.z = 1);
        n.scale.copy(this._scaleStart).multiply(Ye), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (s === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(ue.setFromMatrixPosition(this.camera.matrixWorld));
        let c = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(ue.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(js[t]), ue.copy(js[t]), r === "local" && ue.applyQuaternion(this.worldQuaternion), ue.cross(this.eye), ue.length() === 0 ? c = !0 : this.rotationAngle = this._offset.dot(ue.normalize()) * o), (t === "E" || c) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(Q.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(Q.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(Di), this.dispatchEvent(zs);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(Di), this.dispatchEvent(zs), this.pointStart.copy(this.pointEnd));
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
function Co(i) {
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
function So(i) {
  if (this.enabled)
    switch (i.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(i));
        break;
    }
}
function wo(i) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(i)), this.pointerDown(this._getPointer(i)));
}
function xo(i) {
  this.enabled && this.pointerMove(this._getPointer(i));
}
function Oo(i) {
  this.enabled && (this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(i)));
}
function Ri(i, e, t) {
  const s = e.intersectObject(i, !0);
  for (let n = 0; n < s.length; n++)
    if (s[n].object.visible || t)
      return s[n];
  return !1;
}
const Qt = new pn(), X = new P(0, 1, 0), Hs = new P(0, 0, 0), Ys = new hi(), Jt = new Ce(), ni = new Ce(), Re = new P(), Bs = new hi(), kt = new P(1, 0, 0), qe = new P(0, 1, 0), Ut = new P(0, 0, 1), ei = new P(), Dt = new P(), Rt = new P();
class To extends vt {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class Mo extends vt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new Je({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new Zi({
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
    const w = e.clone();
    w.color.setHex(7895160);
    const v = new ve(0, 0.04, 0.1, 12);
    v.translate(0, 0.05, 0);
    const x = new de(0.08, 0.08, 0.08);
    x.translate(0, 0.04, 0);
    const g = new _t();
    g.setAttribute("position", new Ke([0, 0, 0, 1, 0, 0], 3));
    const y = new ve(75e-4, 75e-4, 0.5, 3);
    y.translate(0, 0.25, 0);
    function b($, Ue) {
      const he = new bt($, 75e-4, 3, 64, Ue * Math.PI * 2);
      return he.rotateY(Math.PI / 2), he.rotateX(Math.PI / 2), he;
    }
    function C() {
      const $ = new _t();
      return $.setAttribute("position", new Ke([0, 0, 0, 1, 1, 1], 3)), $;
    }
    const S = {
      X: [
        [new M(v, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(v, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new M(y, r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new M(v, a), [0, 0.5, 0]],
        [new M(v, a), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new M(y, a)]
      ],
      Z: [
        [new M(v, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new M(v, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new M(y, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new Gt(0.1, 0), p.clone()), [0, 0, 0]]
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
        [new M(new ve(0.2, 0, 0.6, 4), s), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(new ve(0.2, 0, 0.6, 4), s), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, 0.3, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new Gt(0.2, 0), s)]
      ],
      XY: [
        [new M(new de(0.2, 0.2, 0.01), s), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new de(0.2, 0.2, 0.01), s), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new de(0.2, 0.2, 0.01), s), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, I = {
      START: [
        [new M(new Gt(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new M(new Gt(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new Ie(C(), n), null, null, null, "helper"]
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
    }, U = {
      XYZE: [
        [new M(b(0.5, 1), w), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new M(b(0.5, 0.5), r)]
      ],
      Y: [
        [new M(b(0.5, 0.5), a), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new M(b(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new M(b(0.75, 1), m), null, [0, Math.PI / 2, 0]]
      ]
    }, R = {
      AXIS: [
        [new Ie(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, B = {
      XYZE: [
        [new M(new mn(0.25, 10, 8), s)]
      ],
      X: [
        [new M(new bt(0.5, 0.1, 4, 24), s), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new M(new bt(0.5, 0.1, 4, 24), s), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new M(new bt(0.5, 0.1, 4, 24), s), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new M(new bt(0.75, 0.1, 2, 24), s)]
      ]
    }, Se = {
      X: [
        [new M(x, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(y, r), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(x, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(x, a), [0, 0.5, 0]],
        [new M(y, a)],
        [new M(x, a), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(x, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new M(y, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new M(x, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
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
        [new M(new ve(0.2, 0, 0.6, 4), s), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(new ve(0.2, 0, 0.6, 4), s), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, 0.3, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new M(new ve(0.2, 0, 0.6, 4), s), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new M(new de(0.2, 0.2, 0.01), s), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new de(0.2, 0.2, 0.01), s), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new de(0.2, 0.2, 0.01), s), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new de(0.2, 0.2, 0.2), s), [0, 0, 0]]
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
    function K($) {
      const Ue = new vt();
      for (const he in $)
        for (let be = $[he].length; be--; ) {
          const ne = $[he][be][0].clone(), je = $[he][be][1], Ne = $[he][be][2], Fe = $[he][be][3], G = $[he][be][4];
          ne.name = he, ne.tag = G, je && ne.position.set(je[0], je[1], je[2]), Ne && ne.rotation.set(Ne[0], Ne[1], Ne[2]), Fe && ne.scale.set(Fe[0], Fe[1], Fe[2]), ne.updateMatrix();
          const le = ne.geometry.clone();
          le.applyMatrix4(ne.matrix), ne.geometry = le, ne.renderOrder = 1 / 0, ne.position.set(0, 0, 0), ne.rotation.set(0, 0, 0), ne.scale.set(1, 1, 1), Ue.add(ne);
        }
      return Ue;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = K(S)), this.add(this.gizmo.rotate = K(U)), this.add(this.gizmo.scale = K(Se)), this.add(this.picker.translate = K(O)), this.add(this.picker.rotate = K(B)), this.add(this.picker.scale = K(_e)), this.add(this.helper.translate = K(I)), this.add(this.helper.rotate = K(R)), this.add(this.helper.scale = K(re)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const s = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : ni;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      a.visible = !0, a.rotation.set(0, 0, 0), a.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), a.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), a.tag === "helper") {
        a.visible = !1, a.name === "AXIS" ? (a.visible = !!this.axis, this.axis === "X" && (Q.setFromEuler(Qt.set(0, 0, 0)), a.quaternion.copy(s).multiply(Q), Math.abs(X.copy(kt).applyQuaternion(s).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Y" && (Q.setFromEuler(Qt.set(0, 0, Math.PI / 2)), a.quaternion.copy(s).multiply(Q), Math.abs(X.copy(qe).applyQuaternion(s).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "Z" && (Q.setFromEuler(Qt.set(0, Math.PI / 2, 0)), a.quaternion.copy(s).multiply(Q), Math.abs(X.copy(Ut).applyQuaternion(s).dot(this.eye)) > 0.9 && (a.visible = !1)), this.axis === "XYZE" && (Q.setFromEuler(Qt.set(0, Math.PI / 2, 0)), X.copy(this.rotationAxis), a.quaternion.setFromRotationMatrix(Ys.lookAt(Hs, X, qe)), a.quaternion.multiply(Q), a.visible = this.dragging), this.axis === "E" && (a.visible = !1)) : a.name === "START" ? (a.position.copy(this.worldPositionStart), a.visible = this.dragging) : a.name === "END" ? (a.position.copy(this.worldPosition), a.visible = this.dragging) : a.name === "DELTA" ? (a.position.copy(this.worldPositionStart), a.quaternion.copy(this.worldQuaternionStart), ue.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), ue.applyQuaternion(this.worldQuaternionStart.clone().invert()), a.scale.copy(ue), a.visible = this.dragging) : (a.quaternion.copy(s), this.dragging ? a.position.copy(this.worldPositionStart) : a.position.copy(this.worldPosition), this.axis && (a.visible = this.axis.search(a.name) !== -1));
        continue;
      }
      a.quaternion.copy(s), this.mode === "translate" || this.mode === "scale" ? (a.name === "X" && Math.abs(X.copy(kt).applyQuaternion(s).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Y" && Math.abs(X.copy(qe).applyQuaternion(s).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "Z" && Math.abs(X.copy(Ut).applyQuaternion(s).dot(this.eye)) > 0.99 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XY" && Math.abs(X.copy(Ut).applyQuaternion(s).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "YZ" && Math.abs(X.copy(kt).applyQuaternion(s).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1), a.name === "XZ" && Math.abs(X.copy(qe).applyQuaternion(s).dot(this.eye)) < 0.2 && (a.scale.set(1e-10, 1e-10, 1e-10), a.visible = !1)) : this.mode === "rotate" && (Jt.copy(s), X.copy(this.eye).applyQuaternion(Q.copy(s).invert()), a.name.search("E") !== -1 && a.quaternion.setFromRotationMatrix(Ys.lookAt(this.eye, Hs, qe)), a.name === "X" && (Q.setFromAxisAngle(kt, Math.atan2(-X.y, X.z)), Q.multiplyQuaternions(Jt, Q), a.quaternion.copy(Q)), a.name === "Y" && (Q.setFromAxisAngle(qe, Math.atan2(X.x, X.z)), Q.multiplyQuaternions(Jt, Q), a.quaternion.copy(Q)), a.name === "Z" && (Q.setFromAxisAngle(Ut, Math.atan2(X.y, X.x)), Q.multiplyQuaternions(Jt, Q), a.quaternion.copy(Q))), a.visible = a.visible && (a.name.indexOf("X") === -1 || this.showX), a.visible = a.visible && (a.name.indexOf("Y") === -1 || this.showY), a.visible = a.visible && (a.name.indexOf("Z") === -1 || this.showZ), a.visible = a.visible && (a.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), a.material._color = a.material._color || a.material.color.clone(), a.material._opacity = a.material._opacity || a.material.opacity, a.material.color.copy(a.material._color), a.material.opacity = a.material._opacity, this.enabled && this.axis && (a.name === this.axis || this.axis.split("").some(function(c) {
        return a.name === c;
      })) && (a.material.color.setHex(16776960), a.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class Po extends M {
  constructor() {
    super(
      new un(1e5, 1e5, 2, 2),
      new Je({ visible: !1, wireframe: !0, side: Vi, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), ei.copy(kt).applyQuaternion(t === "local" ? this.worldQuaternion : ni), Dt.copy(qe).applyQuaternion(t === "local" ? this.worldQuaternion : ni), Rt.copy(Ut).applyQuaternion(t === "local" ? this.worldQuaternion : ni), X.copy(Dt), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            X.copy(this.eye).cross(ei), Re.copy(ei).cross(X);
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
            Re.copy(ei);
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
class ge extends Bi {
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
      const s = document.querySelector(".clickable");
      t = new bo(this.activeCamera, s), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
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
  setScene = () => {
    this.clear();
  };
  static get instance() {
    return ge._instance || (ge._instance = new ge()), ge._instance;
  }
}
const Ao = new de(), Ii = new pe();
class Vs extends vt {
  curve = new hs();
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
    const s = new et(lt(0.5, 1, Math.random()), lt(0.5, 1, Math.random()), lt(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Zi({ color: s }), this.line = new Ie(new _t(), this.lineMaterial), this.line.name = "line", this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = s, this.draggable = new vt(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new M(new mn(1.5), new Je({ color: s })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new ai(), this.raycaster.params.Line.threshold = 3, this.enable();
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
    }), za({
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
      for (let s = 0; s < t; s++)
        this.addPoint(e[s], !1);
      this.addPoint(e[t]);
    } else
      this.addPoint(new P(-50, 0, 0), !1), this.addPoint(new P(50, 0, 0));
  };
  addPoint = (e, t = !0) => {
    const s = this.draggable.children.length, n = new M(Ao, this.draggedMat);
    return n.name = `point_${s}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), t && this.updateSpline(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = new P(
      lt(-this.offset, this.offset, Math.random()),
      lt(-this.offset, this.offset, Math.random()),
      lt(-this.offset, this.offset, Math.random())
    );
    e > 0 && t.add(this.draggable.children[e - 1].position);
    const s = this.addPoint(t);
    this._transform?.attach(s), this.group.current?.setField("Current Point", s.position);
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
    this.curve = new hs(this.points, this.closed, this.curveType, this.tension), this.line.geometry.setFromPoints(this.getPoints()), this.curvePos.position.copy(this.getPointAt(this._curvePercentage));
  };
  // Handlers
  onMouseClick = (e) => {
    if (!me.instance || this._transform && !this._transform.getHelper().visible)
      return;
    const s = me.instance.currentWindow.current.getBoundingClientRect();
    Ii.x = (e.clientX - s.x) / s.width * 2 - 1, Ii.y = -((e.clientY - s.y) / s.height) * 2 + 1, this.raycaster.setFromCamera(Ii, this.camera);
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
    const s = t.length > 0 ? t[t.length - 1].position : { x: 0, y: 0, z: 0 };
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
          value: s
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
let ti = 0;
class Do extends vt {
  defaultScale = 10;
  _camera;
  group = null;
  constructor(e) {
    super(), this.name = "Spline Editor", this._camera = e, D.addEventListener(A.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = te.addEditorGroup({
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
    D.removeEventListener(A.ADD_SPLINE, this.onAddSpline), te.removeEditorGroup(this.name);
  }
  addSpline(e) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current), this.add(e);
  }
  createSpline = (e = []) => {
    const t = `Spline ${ti + 1}`, s = new Vs(t, this._camera);
    return s.addPoints(e), this.addSpline(s), ti++, s;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((s) => {
      t.push(new P(s[0], s[1], s[2]));
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
    const t = JSON.parse(e.value), s = `Spline ${ti + 1}`, n = [];
    t.points.forEach((a) => {
      n.push(new P(a[0], a[1], a[2]));
    });
    const r = new Vs(s, this.camera);
    r.addPoints(n), this.addSpline(r), ti++;
  };
  get camera() {
    return this._camera;
  }
  set camera(e) {
    this._camera = e, this.children.forEach((t) => {
      const s = t;
      s.camera = e;
    });
  }
}
const Zs = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], Ro = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", Io = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==";
class me extends zt {
  static instance = null;
  scene = new Ws();
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
  grid = new _o();
  interactionHelper = new ga(25);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial = new _a();
  normalsMaterial = new va();
  uvMaterial = new Eo();
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
  raycaster = new ai();
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
      Vector2: pe,
      Vector3: P,
      Vector4: Ta,
      Quaternion: Ce,
      Matrix4: hi,
      Spherical: ki,
      Box3: Ma,
      Sphere: Pa,
      Raycaster: ai
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
  componentDidUpdate(e, t, s) {
    t.mode !== this.state.mode && (this.assignControls(), this.resize());
  }
  componentWillUnmount() {
    this.disable(), te.removeEditorGroup("View Settings");
  }
  render() {
    const e = [];
    return this.cameras.forEach((t, s) => {
      e.push(s);
    }), /* @__PURE__ */ u.jsxs("div", { className: "multiview", children: [
      /* @__PURE__ */ u.jsx("canvas", { ref: this.canvasRef }),
      /* @__PURE__ */ u.jsxs("div", { className: `cameras ${this.state.mode === "Single" || this.state.mode === "Stacked" ? "single" : ""}`, ref: this.containerRef, children: [
        this.state.mode === "Single" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(
          We,
          {
            name: "tl",
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
        (this.state.mode === "Side by Side" || this.state.mode === "Stacked") && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            We,
            {
              name: "tl",
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
          /* @__PURE__ */ u.jsx(
            We,
            {
              name: "tr",
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
        this.state.mode === "Quad" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            We,
            {
              name: "tl",
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
          /* @__PURE__ */ u.jsx(
            We,
            {
              name: "tr",
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
          /* @__PURE__ */ u.jsx(
            We,
            {
              name: "bl",
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
          /* @__PURE__ */ u.jsx(
            We,
            {
              name: "br",
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
      /* @__PURE__ */ u.jsxs("div", { className: "settings", children: [
        /* @__PURE__ */ u.jsx(
          ci,
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
          ci,
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
            icon: Ro,
            selected: this.cameraVisibility,
            height: 24,
            top: 2,
            onClick: (t) => {
              if (this.cameraVisibility = t, this.saveExpandedCameraVisibility(), this.cameraHelpers.forEach((s) => {
                s.visible = t;
              }), this.selectedItem !== void 0 && !t && this.selectedItem instanceof Ct) {
                const s = this.cameraHelpers.get(this.selectedItem.name);
                s !== void 0 && (s.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          Us,
          {
            name: "lightHelper",
            icon: Io,
            selected: this.lightVisibility,
            height: 24,
            top: 4,
            onClick: (t) => {
              if (this.lightVisibility = t, this.saveExpandedLightVisibility(), this.lightHelpers.forEach((s) => {
                s.visible = t;
              }), this.selectedItem !== void 0 && !t && this.selectedItem.isLight === !0) {
                const s = this.lightHelpers.get(this.selectedItem.name);
                s !== void 0 && (s.visible = !0);
              }
            }
          }
        )
      ] }, this.state.lastUpdate)
    ] });
  }
  // Setup
  setupRenderer() {
    this.renderer = new ya({
      canvas: this.canvasRef.current,
      stencil: !1
    }), this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setClearColor(0), this.props.three.renderer = this.renderer;
  }
  setupScene() {
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.helpersContainer.add(this.grid), window.grid = this.grid, this.interactionHelper.name = "interactionHelper", this.interactionHelper.visible = !1, this.helpersContainer.add(this.interactionHelper);
    const e = (r, a) => {
      const o = new Li(-100, 100, 100, -100, 0, 3e3);
      return o.name = r, o.position.copy(a), o.lookAt(0, 0, 0), this.cameras.set(r, o), o;
    }, t = 1e3;
    e("Top", new P(0, t, 0)), e("Bottom", new P(0, -t, 0)), e("Left", new P(-t, 0, 0)), e("Right", new P(t, 0, 0)), e("Front", new P(0, 0, t)), e("Back", new P(0, 0, -t)), e("Orthographic", new P(t, t, t)), e("UI", new P()), this.debugCamera = new Ct(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const s = localStorage, n = this.props.three.app.appID;
    this.tlCam = this.cameras.get(s.getItem(`${n}_tlCam`)), this.trCam = this.cameras.get(s.getItem(`${n}_trCam`)), this.blCam = this.cameras.get(s.getItem(`${n}_blCam`)), this.brCam = this.cameras.get(s.getItem(`${n}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  setupTools() {
    te.addEditorGroup({
      title: "View Settings",
      items: [
        {
          type: "boolean",
          prop: "Show Grid",
          value: this.grid.visible
        }
      ],
      onUpdate: (e, t) => {
        switch (e) {
          case "Show Grid":
            this.grid.visible = t;
            break;
        }
      }
    }), this.splineEditor = new Do(this.currentCamera), this.splineEditor.initDebug(), this.scene.add(this.splineEditor);
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
      a instanceof Li ? (a.left = s / -2, a.right = s / 2, a.top = n / 2, a.bottom = n / -2, a.name === "UI" && (a.position.x = this.width / 2, a.position.y = this.height / -2, a.position.z = 100), a.updateProjectionMatrix()) : a instanceof Ct && (a.aspect = r, a.updateProjectionMatrix(), this.cameraHelpers.get(a.name)?.update());
    });
  };
  sceneUpdate = (e) => {
    this.clearLightHelpers(), this.scene.remove(this.currentScene), He(this.currentScene);
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const s = new t();
      this.props.onSceneSet !== void 0 && this.props.onSceneSet(s), this.currentScene = s, this.props.three.scene = this.currentScene, this.scene.add(this.currentScene), this.sceneSet = !0, this.addLightHelpers();
    }
  };
  addCamera = (e) => {
    const t = e.value, s = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (s !== void 0 && this.cameras.set(t.name, s), s instanceof Ct) {
      const n = new Ea(s);
      n.visible = this.cameraVisibility, this.cameraHelpers.set(s.name, n), this.scene.add(n);
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
    const s = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = ot(s, 0, t.x, -1, 1), this.pointer.y = ot(n, 0, t.y, 1, -1);
    const r = t.x / 2, a = t.y / 2, o = () => {
      s < r ? this.pointer.x = ot(s, 0, r, -1, 1) : this.pointer.x = ot(s, r, t.x, -1, 1);
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
    if (this.updateCamera(s, n, r, a), this.state.interactionMode === "Orbit")
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
    const s = this.raycaster.intersectObjects(this.currentScene.children);
    s.length > 0 && (this.props.three.getObject(s[0].object.uuid), this.interactionHelper.visible = !1, this.setState({ interactionMode: "Orbit", lastUpdate: Date.now() }));
  };
  onKey = (e) => {
    if (this.selectedItem !== void 0) {
      if (e.ctrlKey) {
        if (this.currentCamera.name === "UI")
          return;
        const t = this.controls.get(this.currentCamera.name);
        e.key === "0" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof M || this.selectedItem instanceof ba ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (e.preventDefault(), this.clearControls(), this.cameraControls = new ke(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(zi(45), zi(45), !0), this.updateCameraControls(t));
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
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), ui.instance.update());
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
            t = new xa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new wa(e, 250), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new Xr(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new Sa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "SpotLight":
            t = new Ca(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const s = this.controls.get(e.name);
    if (s !== void 0 && s.dispose(), this.controls.delete(e.name), e.name === "UI")
      return;
    const n = new qr(e, t);
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
        t < n ? e < s ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam : e < s ? this.currentCamera = this.blCam : this.currentCamera = this.brCam;
        break;
      case "Side by Side":
        e < s ? this.currentCamera = this.tlCam : this.currentCamera = this.trCam;
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
    const s = 0.15, n = new Oa();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const r = () => {
      const a = n.getDelta();
      this.cameraControls && this.cameraControls.update(a), t && (e.target.lerp(e.target0, s), e.object.position.lerp(e.position0, s), e.object.zoom = Ft(e.object.zoom, e.zoom0, s), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(r);
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
  drawTo(e, t, s, n, r, a) {
    switch (r.name) {
      case "Left":
      case "Right":
        this.grid.rotation.z = Math.PI / 2;
        break;
      case "Front":
      case "Back":
        this.grid.rotation.x = Math.PI / 2;
        break;
    }
    this.scene.overrideMaterial = a, this.renderer?.setViewport(e, t, s, n), this.renderer?.setScissor(e, t, s, n), this.renderer?.render(this.scene, r), this.grid.rotation.set(0, 0, 0);
  }
  drawSingle() {
    const e = this.getSceneOverride(this.tlRender);
    this.drawTo(0, 0, this.width, this.height, this.tlCam, e);
  }
  drawDouble = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = Math.floor(this.width / 2), n = Math.floor(this.height / 2);
    if (this.state.mode === "Side by Side")
      this.drawTo(0, 0, s, this.height, this.tlCam, e), this.drawTo(s, 0, s, this.height, this.trCam, t);
    else {
      const r = this.height - n;
      this.drawTo(0, r, this.width, n, this.tlCam, e), this.drawTo(0, 0, this.width, n, this.trCam, t);
    }
  };
  drawQuad = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = this.getSceneOverride(this.blRender), n = this.getSceneOverride(this.brRender), r = Math.floor(this.width / 2), a = Math.floor(this.height / 2);
    let o = 0, c = 0;
    c = this.height - a, o = 0, this.drawTo(o, c, r, a, this.tlCam, e), o = r, this.drawTo(o, c, r, a, this.trCam, t), c = 0, o = 0, this.scene.overrideMaterial = s, this.drawTo(o, c, r, a, this.blCam, s), o = r, this.drawTo(o, c, r, a, this.brCam, n);
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
class ui extends zt {
  static instance;
  matrix = new hi();
  position = new P();
  rotation = new pn();
  scale = new P();
  open = !1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), s = t !== null ? t === "open" : !1;
    this.open = s, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: s
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), ui.instance = this;
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
    const s = e === "rotation" ? { x: t._x, y: t._y, z: t._z } : t;
    this.props.three.updateObject(this.props.object.uuid, e, s);
    const n = this.props.three.getScene(this.props.object.uuid);
    if (n) {
      const r = n.getObjectByProperty("uuid", this.props.object.uuid);
      se(r, e, s);
    }
  };
  saveExpanded() {
    localStorage.setItem(this.expandedName, this.open ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.app.appID}_transform`;
  }
}
function Gs(i) {
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
function Lo(i, e) {
  function t() {
    return `${e.app.appID}_light`;
  }
  const s = localStorage.getItem(t()), n = s !== null ? s === "open" : !1;
  function r(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const a = [];
  if (i.lightInfo !== void 0)
    for (const o in i.lightInfo) {
      const c = i.lightInfo[o];
      c !== void 0 && (c.isColor !== void 0 ? a.push({
        title: Gs(o),
        prop: o,
        type: "color",
        value: c,
        onChange: (l, d) => {
          const p = new et(d);
          e.updateObject(i.uuid, l, p);
          const m = e.getScene(i.uuid);
          if (m !== null) {
            const f = m.getObjectByProperty("uuid", i.uuid);
            se(f, l, p);
          }
        }
      }) : a.push({
        title: Gs(o),
        prop: o,
        type: typeof c,
        value: c,
        step: typeof c == "number" ? 0.01 : void 0,
        onChange: (l, d) => {
          e.updateObject(i.uuid, l, d);
          const p = e.getScene(i.uuid);
          if (p !== null) {
            const m = p.getObjectByProperty("uuid", i.uuid);
            se(m, l, d);
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
function ko(i) {
  const e = i.object, t = i.three;
  function s() {
    return `${t.app.appID}_animation`;
  }
  const n = localStorage.getItem(s()), r = n !== null ? n === "open" : !1;
  function a(m) {
    localStorage.setItem(s(), m ? "open" : "closed");
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
        const v = [
          {
            title: "Time Scale",
            type: "range",
            value: f.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (x, g) => {
              f.timeScale = g, t.updateObject(e.uuid, "mixer.timeScale", g);
            }
          }
        ];
        v.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            f.stopAllAction(), t.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), o.push({
          title: "Mixer",
          items: v
        }), d = new Aa(m), me.instance?.scene.add(d);
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
const Yi = {
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
let ce = { ...Yi };
function Uo(i) {
  const [e, t] = Z(-1);
  tt(() => {
    function a(c) {
      ce = { ...c.value }, t(Date.now());
    }
    function o() {
      ce = { ...Yi }, t(Date.now());
    }
    return D.addEventListener(A.SET_SCENE, o), D.addEventListener(A.SET_OBJECT, a), () => {
      D.removeEventListener(A.SET_SCENE, o), D.removeEventListener(A.SET_OBJECT, a);
    };
  }, []);
  const s = ce.type.toLowerCase(), n = ce.animations.length > 0 || ce.mixer !== void 0, r = s.search("mesh") > -1 || s.search("line") > -1 || s.search("points") > -1;
  return /* @__PURE__ */ u.jsx(
    li,
    {
      label: "Inspector",
      button: ce.uuid.length > 0 ? /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: () => {
        ge.instance.remove(ce.name), ce = { ...Yi }, t(Date.now());
      } }) : void 0,
      children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: i.class, children: ce.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            si,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: ce.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            si,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: ce.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            si,
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
          /* @__PURE__ */ u.jsx(ui, { object: ce, three: i.three }),
          n ? /* @__PURE__ */ u.jsx(ko, { object: ce, three: i.three }) : null,
          s.search("camera") > -1 ? Wr(ce, i.three) : null,
          s.search("light") > -1 ? Lo(ce, i.three) : null,
          r ? Vr(ce, i.three) : null
        ] })
      ] }) }, e)
    },
    "Inspector"
  );
}
class jo extends zt {
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
    const t = localStorage.getItem(this.expandedName), s = t !== null ? t === "open" : !1;
    if (this.state = {
      expanded: s,
      lastUpdated: Date.now()
    }, this.saveExpanded(s), me.instance) {
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
      const s = me.instance.renderer;
      s && (s.autoClear = this.autoClear, s.autoClearColor = this.autoClearColor, s.autoClearDepth = this.autoClearDepth, s.autoClearStencil = this.autoClearStencil, s.outputColorSpace = this.outputColorSpace, s.localClippingEnabled = this.localClippingEnabled, s.toneMapping = this.toneMapping, s.toneMappingExposure = this.toneMappingExposure, s.setClearColor(t.clearColor, this.clearAlpha));
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
            onChange: (t, s) => {
              this.autoClear = s;
            }
          },
          {
            type: "boolean",
            title: "Auto Clear Color",
            value: this.autoClearColor,
            onChange: (t, s) => {
              this.autoClearColor = s, e();
            }
          },
          {
            type: "boolean",
            title: "Auto Clear Depth",
            value: this.autoClearDepth,
            onChange: (t, s) => {
              this.autoClearDepth = s, e();
            }
          },
          {
            type: "boolean",
            title: "Auto Clear Stencil",
            value: this.autoClearStencil,
            onChange: (t, s) => {
              this.autoClearStencil = s, e();
            }
          },
          {
            type: "boolean",
            title: "Local Clipping",
            value: this.localClippingEnabled,
            onChange: (t, s) => {
              this.localClippingEnabled = s, e();
            }
          },
          {
            type: "color",
            title: "Clear Color",
            value: `#${this.clearColor.getHexString()}`,
            onChange: (t, s) => {
              this.clearColor.setStyle(s), e();
            }
          },
          {
            type: "range",
            title: "Clear Alpha",
            min: 0,
            max: 1,
            step: 0.01,
            value: this.clearAlpha,
            onChange: (t, s) => {
              this.clearAlpha = s, e();
            }
          },
          {
            type: "boolean",
            title: "Clear Management",
            value: mt.enabled,
            onChange: (t, s) => {
              mt.enabled = s, e();
            }
          },
          {
            type: "option",
            title: "Color Space",
            value: this.outputColorSpace,
            options: [
              {
                title: "No Color Space",
                value: Da
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
            onChange: (t, s) => {
              this.outputColorSpace = s, e();
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
                value: Ra
              },
              {
                title: "Reinhard",
                value: Ia
              },
              {
                title: "Cineon ",
                value: La
              },
              {
                title: "ACES Filmic",
                value: ka
              },
              {
                title: "AgX",
                value: Ua
              },
              {
                title: "Neutral",
                value: ja
              },
              {
                title: "Custom",
                value: Na
              }
            ],
            onChange: (t, s) => {
              this.toneMapping = s, e();
            }
          },
          {
            type: "range",
            title: "Tone Mapping Exposure",
            value: this.toneMappingExposure,
            min: 0,
            max: 2,
            step: 0.01,
            onChange: (t, s) => {
              this.toneMappingExposure = s, e();
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
function No(i) {
  const [e] = Z([]), [t] = Z([]), [s, n] = Z(0), r = (c) => {
    const l = c.value;
    e.push(l), t.push(
      /* @__PURE__ */ u.jsx(
        li,
        {
          label: `Scene: ${l.name}`,
          scene: l,
          open: !0,
          onRefresh: () => {
            i.three.refreshScene(l.name);
          },
          children: /* @__PURE__ */ u.jsx(Es, { child: l, scene: l, three: i.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, a = (c) => {
    const l = c.value;
    for (let d = 0; d < e.length; d++)
      if (l.uuid === e[d].uuid) {
        e[d] = l, t[d] = /* @__PURE__ */ u.jsx(
          li,
          {
            label: `Scene: ${l.name}`,
            scene: l,
            open: !0,
            onRefresh: () => {
              i.three.refreshScene(l.name);
            },
            children: /* @__PURE__ */ u.jsx(Es, { child: l, scene: l, three: i.three })
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
    /* @__PURE__ */ u.jsx("div", { className: "scenes", children: t }, s),
    /* @__PURE__ */ u.jsx(Uo, { three: i.three }),
    /* @__PURE__ */ u.jsx(jo, { three: i.three }),
    /* @__PURE__ */ u.jsx(te, { three: i.three })
  ] });
}
function ll(i) {
  return tt(() => {
    function e(o) {
      let c = null;
      return i.three.scenes.forEach((l) => {
        o.search(l.uuid) > -1 && (c = l);
      }), c;
    }
    const t = (o) => {
      const c = o.value, d = e(c)?.getObjectByProperty("uuid", c);
      d !== void 0 && i.three.setObject(d);
    }, s = (o, c, l) => {
      const p = e(o)?.getObjectByProperty("uuid", o);
      p !== void 0 && se(p, c, l);
    }, n = (o) => {
      const c = o.value, { key: l, value: d, uuid: p } = c;
      s(p, l, d);
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
          p !== void 0 ? mr(f, p)[c](d) : f[c](d);
        } catch (w) {
          console.log("Error requesting method:"), console.log(w), console.log(c), console.log(d);
        }
    };
    return D.addEventListener(A.GET_OBJECT, t), D.addEventListener(A.UPDATE_OBJECT, n), D.addEventListener(A.CREATE_TEXTURE, r), D.addEventListener(A.REQUEST_METHOD, a), () => {
      D.removeEventListener(A.GET_OBJECT, t), D.removeEventListener(A.UPDATE_OBJECT, n), D.removeEventListener(A.CREATE_TEXTURE, r), D.removeEventListener(A.REQUEST_METHOD, a);
    };
  }, []), null;
}
function Fo(i) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: i.footer })
  ] });
}
function cl(i) {
  return /* @__PURE__ */ u.jsx(Fo, { children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      me,
      {
        three: i.three,
        scenes: i.scenes,
        onSceneResize: i.onSceneResize,
        onSceneSet: i.onSceneSet,
        onSceneUpdate: i.onSceneUpdate
      }
    ),
    /* @__PURE__ */ u.jsx(No, { three: i.three })
  ] }) });
}
export {
  li as Accordion,
  tl as Application,
  Wi as BaseRemote,
  En as ChildObject,
  Es as ContainerObject,
  Cr as Draggable,
  br as DraggableItem,
  Sr as Dropdown,
  wr as DropdownItem,
  Fo as Editor,
  Jo as ElementProxy,
  lr as ElementProxyReceiver,
  ii as ExportTexture,
  Uo as Inspector,
  me as MultiView,
  yn as NavButton,
  el as ProxyManager,
  Xa as QualityType,
  il as RemoteComponents,
  ol as RemoteController,
  al as RemoteTheatre,
  rl as RemoteThree,
  ll as SceneInspector,
  No as SidePanel,
  Vs as Spline,
  Do as SplineEditor,
  cl as ThreeEditor,
  A as ToolEvents,
  ge as Transform,
  Qo as WebworkerEventHandlers,
  oi as capitalize,
  $e as clamp,
  ps as colorToHex,
  za as copyToClipboard,
  $o as cubicBezier,
  nl as customizeTheatreElements,
  Wo as damp,
  D as debugDispatcher,
  Bo as defaultTheatreCallback,
  Vo as detectSettings,
  He as dispose,
  Ja as disposeMaterial,
  qo as disposeTexture,
  Go as distance,
  Ni as hierarchyUUID,
  Ya as isColor,
  Zo as map,
  Ft as mix,
  ri as noop,
  Ui as normalize,
  Ko as parseModelLite,
  Ha as randomID,
  _s as resetThreeObjects,
  Pe as round,
  Xo as roundTo,
  sl as theatreEditorApp,
  ji as totalThreeObjects
};
