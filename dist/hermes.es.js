import { Texture as Ii, OrthographicCamera as Li, Scene as Bi, MeshBasicMaterial as Qe, BufferGeometry as gt, Float32BufferAttribute as qe, Mesh as M, LinearSRGBColorSpace as Ut, ObjectLoader as $n, AnimationMixer as qn, AnimationClip as Kn, EventDispatcher as Xs, Clock as $s, Group as ei, RepeatWrapping as cs, Color as Je, ColorManagement as pt, WebGLRenderTarget as Qn, FrontSide as Jn, BackSide as qs, DoubleSide as Vi, NoBlending as ea, NormalBlending as ta, AdditiveBlending as ia, SubtractiveBlending as sa, MultiplyBlending as na, CustomBlending as aa, AddEquation as ra, SubtractEquation as oa, ReverseSubtractEquation as la, MinEquation as ca, MaxEquation as ha, ZeroFactor as Ks, OneFactor as Qs, SrcColorFactor as Js, OneMinusSrcColorFactor as en, SrcAlphaFactor as tn, OneMinusSrcAlphaFactor as sn, DstAlphaFactor as nn, OneMinusDstAlphaFactor as an, DstColorFactor as rn, OneMinusDstColorFactor as on, SrcAlphaSaturateFactor as da, ConstantColorFactor as ln, OneMinusConstantColorFactor as cn, ConstantAlphaFactor as hn, OneMinusConstantAlphaFactor as dn, Line as Re, LineBasicMaterial as Zi, Ray as ua, Plane as pa, MathUtils as ma, Vector3 as P, Controls as un, MOUSE as ft, TOUCH as mt, Quaternion as be, Spherical as ki, Vector2 as ue, ShaderMaterial as pn, GLSL3 as fa, PlaneGeometry as mn, Raycaster as ni, Euler as fn, Matrix4 as ci, Object3D as _t, CylinderGeometry as _e, BoxGeometry as he, OctahedronGeometry as Vt, SphereGeometry as gn, TorusGeometry as Et, CatmullRomCurve3 as hs, AxesHelper as ga, MeshDepthMaterial as _a, MeshNormalMaterial as va, WebGLRenderer as ya, PerspectiveCamera as ds, CameraHelper as Ea, SkinnedMesh as ba, SpotLightHelper as Ca, PointLightHelper as wa, HemisphereLightHelper as Sa, DirectionalLightHelper as xa, Vector4 as Ta, Box3 as Oa, Sphere as Ma, SkeletonHelper as Pa, SRGBColorSpace as us, NoToneMapping as ps, NoColorSpace as Aa, LinearToneMapping as Da, ReinhardToneMapping as Ra, CineonToneMapping as Ia, ACESFilmicToneMapping as La, AgXToneMapping as ka, NeutralToneMapping as Ua, CustomToneMapping as ja } from "three";
import _n, { useState as B, useRef as J, useEffect as et, useMemo as kt, Component as Nt, createRef as Be, forwardRef as Na } from "react";
const ai = () => {
}, Fo = () => {
};
function ri(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function Fa(i) {
  const e = JSON.stringify(i);
  return navigator.clipboard.writeText(e), e;
}
function za() {
  return Math.round(Math.random() * 1e6).toString();
}
function Ha(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function ms(i) {
  const e = Math.round(i.r * 255), t = Math.round(i.g * 255), s = Math.round(i.b * 255), n = (l) => {
    const c = l.toString(16);
    return c.length === 1 ? "0" + c : c;
  }, a = n(e), r = n(t), o = n(s);
  return "#" + a + r + o;
}
function vi(i, e, t, s) {
  return new (t || (t = Promise))(function(n, a) {
    function r(c) {
      try {
        l(s.next(c));
      } catch (h) {
        a(h);
      }
    }
    function o(c) {
      try {
        l(s.throw(c));
      } catch (h) {
        a(h);
      }
    }
    function l(c) {
      var h;
      c.done ? n(c.value) : (h = c.value, h instanceof t ? h : new t(function(m) {
        m(h);
      })).then(r, o);
    }
    l((s = s.apply(i, e || [])).next());
  });
}
const Ya = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function fs(i) {
  return i = i.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1");
}
const vn = typeof window > "u", Ie = (() => {
  if (vn)
    return;
  const { userAgent: i, platform: e, maxTouchPoints: t } = window.navigator, s = /(iphone|ipod|ipad)/i.test(i), n = e === "iPad" || e === "MacIntel" && t > 0 && !window.MSStream;
  return { isIpad: n, isMobile: /android/i.test(i) || s || n, isSafari12: /Version\/12.+Safari/.test(i), isFirefox: /Firefox/.test(i) };
})();
function Ba(i, e, t) {
  if (!t)
    return [e];
  const s = function(c) {
    const h = `
    precision highp float;
    attribute vec3 aPosition;
    varying float vvv;
    void main() {
      vvv = 0.31622776601683794;
      gl_Position = vec4(aPosition, 1.0);
    }
  `, m = `
    precision highp float;
    varying float vvv;
    void main() {
      vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
      enc = fract(enc);
      enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
      gl_FragColor = enc;
    }
  `, p = c.createShader(35633), f = c.createShader(35632), b = c.createProgram();
    if (!(f && p && b))
      return;
    c.shaderSource(p, h), c.shaderSource(f, m), c.compileShader(p), c.compileShader(f), c.attachShader(b, p), c.attachShader(b, f), c.linkProgram(b), c.detachShader(b, p), c.detachShader(b, f), c.deleteShader(p), c.deleteShader(f), c.useProgram(b);
    const v = c.createBuffer();
    c.bindBuffer(34962, v), c.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
    const x = c.getAttribLocation(b, "aPosition");
    c.vertexAttribPointer(x, 3, 5126, !1, 0, 0), c.enableVertexAttribArray(x), c.clearColor(1, 1, 1, 1), c.clear(16384), c.viewport(0, 0, 1, 1), c.drawArrays(4, 0, 3);
    const g = new Uint8Array(4);
    return c.readPixels(0, 0, 1, 1, 6408, 5121, g), c.deleteProgram(b), c.deleteBuffer(v), g.join("");
  }(i), n = "801621810", a = "8016218135", r = "80162181161", o = Ie?.isIpad ? [["a7", r, 12], ["a8", a, 15], ["a8x", a, 15], ["a9", a, 15], ["a9x", a, 15], ["a10", a, 15], ["a10x", a, 15], ["a12", n, 15], ["a12x", n, 15], ["a12z", n, 15], ["a14", n, 15], ["a15", n, 15], ["m1", n, 15], ["m2", n, 15]] : [["a7", r, 12], ["a8", a, 12], ["a9", a, 15], ["a10", a, 15], ["a11", n, 15], ["a12", n, 15], ["a13", n, 15], ["a14", n, 15], ["a15", n, 15], ["a16", n, 15], ["a17", n, 15]];
  let l;
  return s === "80162181255" ? l = o.filter(([, , c]) => c >= 14) : (l = o.filter(([, c]) => c === s), l.length || (l = o)), l.map(([c]) => `apple ${c} gpu`);
}
class gs extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
const yi = [], _s = [];
function Va(i, e) {
  if (i === e)
    return 0;
  const t = i;
  i.length > e.length && (i = e, e = t);
  let s = i.length, n = e.length;
  for (; s > 0 && i.charCodeAt(~-s) === e.charCodeAt(~-n); )
    s--, n--;
  let a, r = 0;
  for (; r < s && i.charCodeAt(r) === e.charCodeAt(r); )
    r++;
  if (s -= r, n -= r, s === 0)
    return n;
  let o, l, c = 0, h = 0, m = 0;
  for (; h < s; )
    _s[h] = i.charCodeAt(r + h), yi[h] = ++h;
  for (; m < n; )
    for (a = e.charCodeAt(r + m), o = m++, c = m, h = 0; h < s; h++)
      l = a === _s[h] ? o : o + 1, o = yi[h], c = yi[h] = o > c ? l > c ? c + 1 : l : l > o ? o + 1 : l;
  return c;
}
function Za(i) {
  return i != null;
}
const Wa = ({ mobileTiers: i = [0, 15, 30, 60], desktopTiers: e = [0, 15, 30, 60], override: t = {}, glContext: s, failIfMajorPerformanceCaveat: n = !1, benchmarksURL: a = "https://unpkg.com/detect-gpu@5.0.57/dist/benchmarks" } = {}) => vi(void 0, void 0, void 0, function* () {
  const r = {};
  if (vn)
    return { tier: 0, type: "SSR" };
  const { isIpad: o = !!Ie?.isIpad, isMobile: l = !!Ie?.isMobile, screenSize: c = window.screen, loadBenchmarks: h = (S) => vi(void 0, void 0, void 0, function* () {
    const T = yield fetch(`${a}/${S}`).then((R) => R.json());
    if (parseInt(T.shift().split(".")[0], 10) < 4)
      throw new gs("Detect GPU benchmark data is out of date. Please update to version 4x");
    return T;
  }) } = t;
  let { renderer: m } = t;
  const p = (S, T, R, k, D) => ({ device: D, fps: k, gpu: R, isMobile: l, tier: S, type: T });
  let f, b = "";
  if (m)
    m = fs(m), f = [m];
  else {
    const S = s || function(R, k = !1) {
      const D = { alpha: !1, antialias: !1, depth: !1, failIfMajorPerformanceCaveat: k, powerPreference: "high-performance", stencil: !1 };
      R && delete D.powerPreference;
      const V = window.document.createElement("canvas"), Ce = V.getContext("webgl", D) || V.getContext("experimental-webgl", D);
      return Ce ?? void 0;
    }(Ie?.isSafari12, n);
    if (!S)
      return p(0, "WEBGL_UNSUPPORTED");
    const T = Ie?.isFirefox ? null : S.getExtension("WEBGL_debug_renderer_info");
    if (m = T ? S.getParameter(T.UNMASKED_RENDERER_WEBGL) : S.getParameter(S.RENDERER), !m)
      return p(1, "FALLBACK");
    b = m, m = fs(m), f = function(R, k, D) {
      return k === "apple gpu" ? Ba(R, k, D) : [k];
    }(S, m, l);
  }
  const v = (yield Promise.all(f.map(function(S) {
    var T;
    return vi(this, void 0, void 0, function* () {
      const R = ((W) => {
        const oe = l ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
        for (const Te of oe)
          if (W.includes(Te))
            return Te;
      })(S);
      if (!R)
        return;
      const k = `${l ? "m" : "d"}-${R}${o ? "-ipad" : ""}.json`, D = r[k] = (T = r[k]) !== null && T !== void 0 ? T : h(k);
      let V;
      try {
        V = yield D;
      } catch (W) {
        if (W instanceof gs)
          throw W;
        return;
      }
      const Ce = function(W) {
        var oe;
        const Te = (W = W.replace(/\([^)]+\)/, "")).match(/\d+/) || W.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
        return (oe = Te?.join("").replace(/\W|amd/g, "")) !== null && oe !== void 0 ? oe : "";
      }(S);
      let ge = V.filter(([, W]) => W === Ce);
      ge.length || (ge = V.filter(([W]) => W.includes(S)));
      const ae = ge.length;
      if (ae === 0)
        return;
      const K = S.split(/[.,()\[\]/\s]/g).sort().filter((W, oe, Te) => oe === 0 || W !== Te[oe - 1]).join(" ");
      let $, [ke, , , , ce] = ae > 1 ? ge.map((W) => [W, Va(K, W[2])]).sort(([, W], [, oe]) => W - oe)[0][0] : ge[0], Ee = Number.MAX_VALUE;
      const { devicePixelRatio: se } = window, Ue = c.width * se * c.height * se;
      for (const W of ce) {
        const [oe, Te] = W, vt = oe * Te, tt = Math.abs(Ue - vt);
        tt < Ee && (Ee = tt, $ = W);
      }
      if (!$)
        return;
      const [, , je, Ne] = $;
      return [Ee, je, ke, Ne];
    });
  }))).filter(Za).sort(([S = Number.MAX_VALUE, T], [R = Number.MAX_VALUE, k]) => S === R ? T - k : S - R);
  if (!v.length) {
    const S = Ya.find((T) => m.includes(T));
    return S ? p(0, "BLOCKLISTED", S) : p(1, "FALLBACK", `${m} (${b})`);
  }
  const [, x, g, y] = v[0];
  if (x === -1)
    return p(0, "BLOCKLISTED", g, x, y);
  const C = l ? i : e;
  let w = 0;
  for (let S = 0; S < C.length; S++)
    x >= C[S] && (w = S);
  return p(w, "BENCHMARK", g, x, y);
});
var Ga = /* @__PURE__ */ ((i) => (i[i.High = 0] = "High", i[i.Medium = 1] = "Medium", i[i.Low = 2] = "Low", i))(Ga || {});
function Xa(i) {
  let e = 0;
  const t = performance.now();
  function s() {
    e++;
    const n = performance.now();
    if (n - t >= 100) {
      const a = e / ((n - t) / 1e3), r = Math.round(a / 30) * 30;
      i(r);
    } else
      requestAnimationFrame(s);
  }
  requestAnimationFrame(s);
}
function zo(i) {
  return new Promise((e) => {
    Wa().then((t) => {
      let s = !1;
      const n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (s = "transferControlToOffscreen" in i, n) {
        const r = navigator.userAgent.match(/version\/(\d+)/i);
        s = (r ? parseInt(r[1]) : 0) >= 17;
      }
      const a = {
        dpr: devicePixelRatio,
        fps: 30,
        width: innerWidth,
        height: innerHeight,
        mobile: t.isMobile !== void 0 ? t.isMobile : !1,
        supportOffScreenCanvas: s,
        quality: 2
        /* Low */
      };
      t.tier === 3 ? a.quality = 0 : t.tier === 2 && (a.quality = 1), Xa((r) => {
        a.fps = r, e(a);
      }), e(a);
    });
  });
}
function Xe(i, e, t) {
  return Math.min(e, Math.max(i, t));
}
function Ui(i, e, t) {
  return (t - i) / (e - i);
}
function jt(i, e, t) {
  return i * (1 - t) + e * t;
}
function Ho(i, e, t, s, n) {
  return jt(t, s, Ui(i, e, n));
}
function Yo(i, e) {
  const t = i - e;
  return Math.sqrt(t * t);
}
function Me(i, e = 1) {
  return Number(i.toFixed(e));
}
function Bo(i, e, t, s) {
  return jt(i, e, 1 - Math.exp(-t * s));
}
function Vo(i, e = 1) {
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
  const a = i * i;
  return e * (a * i) + t * a + s * i + n;
}
function Zo(i, e, t, s, n) {
  if (i <= 0)
    return 0;
  if (i >= 1)
    return 1;
  if ($a(e, t, s, n))
    return i;
  const a = 0, r = 0, o = e, l = t, c = s, h = n, m = 1, p = 1, f = m - 3 * c + 3 * o - a, b = 3 * c - 6 * o + 3 * a, v = 3 * o - 3 * a, x = a, g = p - 3 * h + 3 * l - r, y = 3 * h - 6 * l + 3 * r, C = 3 * l - 3 * r, w = r;
  let S = i;
  for (let T = 0; T < 5; T++) {
    const R = Ka(S, f, b, v, x);
    let k = qa(S, f, b, v);
    k === 1 / 0 && (k = i), S -= (R - i) * k, S = Math.min(Math.max(S, 0), 1);
  }
  return Qa(S, g, y, C, w);
}
const vs = (i) => {
  i?.dispose();
}, yn = (i) => {
  if (i)
    if (Array.isArray(i))
      i.forEach((e) => yn(e));
    else {
      for (const e in i) {
        const t = i[e];
        t !== null && t instanceof Ii && vs(t);
      }
      if (i.isShaderMaterial === !0) {
        const e = i;
        for (const t in e.uniforms) {
          const s = e.uniforms[t];
          s.value !== null && s.value instanceof Ii && vs(s.value);
        }
      }
      i.dispose();
    }
}, ze = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const e = i.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : ze(e);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const e = i;
      e.geometry?.dispose(), yn(e.material);
    }
    i.dispose !== void 0 && i.dispose();
  }
};
let ji = 0;
const ys = () => {
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
    const t = e.repeat.clone(), s = e.offset.clone();
    if (e.repeat.set(1, 1), e.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const n = e.image;
      if (n != null && n.width > 0) {
        this.canvas.title = e.sourceFile;
        const a = this.canvas.width / n.width, r = this.renderToCanvas(e);
        this.context.drawImage(r, 0, 0, n.width * a, n.height * a);
      }
    }
    return e.repeat.copy(t), e.offset.copy(s), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(e) {
    if (this.material === null) {
      this.camera = new Li(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new Bi(), this.material = new Qe();
      const t = new gt();
      t.setAttribute("position", new qe([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new qe([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new qe([0, 0, 2, 0, 0, 2], 2));
      const s = new M(t, this.material);
      this.scene.add(s);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, s = e.colorSpace;
      this.renderer.outputColorSpace = Ut, e.colorSpace = Ut, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = s;
    }
    return this.renderer.domElement;
  }
}
function Wo(i) {
  return new Promise((e) => {
    const t = new $n();
    t.parseAsync(i.scene).then((s) => {
      const n = new qn(s);
      if (i.animations.length > 0) {
        const r = i.animations.map((l) => Kn.parse(l));
        n.clipAction(r[0]).play(), n.getRoot().animations = i.animations, n.getRoot().mixer = n;
      }
      const a = [];
      i.cameras && i.cameras.length > 0 && i.cameras.forEach((r) => {
        const o = t.parse(r);
        a.push(o);
      }), e({
        animations: i.animations,
        model: s,
        mixer: n,
        cameras: a
      });
    });
  });
}
const nt = Wi([
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
]), Ja = Wi([
  "clientX",
  "clientY",
  "deltaX",
  "deltaY",
  "deltaMode"
]), er = Wi([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "keyCode"
]);
function tr(i, e) {
  i.preventDefault(), Ja(i, e);
}
function ir(i) {
  i.preventDefault();
}
function sr(i, e, t) {
  for (const s of e)
    t[s] = i[s];
}
function Wi(i) {
  return function(t, s) {
    const n = { type: t.type };
    sr(t, i, n), s(n);
  };
}
function Ei(i, e) {
  const t = [], s = { type: i.type, touches: t };
  for (let n = 0; n < i.touches.length; ++n) {
    const a = i.touches[n];
    t.push({
      pageX: a.pageX,
      pageY: a.pageY
    });
  }
  e(s);
}
const nr = {
  37: !0,
  // left
  38: !0,
  // up
  39: !0,
  // right
  40: !0
  // down
};
function ar(i, e) {
  const { keyCode: t } = i;
  nr[t] && (i.preventDefault(), er(i, e));
}
const Go = {
  contextmenu: ir,
  mousedown: nt,
  mousemove: nt,
  mouseup: nt,
  pointerdown: nt,
  pointermove: nt,
  pointerup: nt,
  touchstart: Ei,
  touchmove: Ei,
  touchend: Ei,
  wheel: tr,
  keydown: ar
};
let rr = 0;
class Xo {
  id;
  worker;
  constructor(e, t, s) {
    this.id = rr++, this.worker = t;
    const n = (r) => {
      this.worker.postMessage({
        type: "event",
        id: this.id,
        data: r
      });
    };
    t.postMessage({
      type: "makeProxy",
      id: this.id
    });
    for (const [r, o] of Object.entries(s))
      e.addEventListener(r, (l) => {
        o(l, n);
      });
    function a() {
      n({
        type: "resize",
        left: 0,
        top: 0,
        width: innerWidth,
        height: innerHeight
      });
    }
    window.addEventListener("resize", a), a();
  }
}
class or extends Xs {
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
class $o {
  targets = {};
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }
  makeProxy(e) {
    const { id: t } = e, s = new or();
    this.targets[t] = s;
  }
  getProxy(e) {
    return this.targets[e];
  }
  handleEvent(e) {
    this.targets[e.id]?.handleEvent(e.data);
  }
}
var A = /* @__PURE__ */ ((i) => (i.CUSTOM = "ToolEvents::custom", i.SELECT_DROPDOWN = "ToolEvents::selectDropdown", i.DRAG_UPDATE = "ToolEvents::dragUpdate", i.ADD_SCENE = "ToolEvents::addScene", i.REFRESH_SCENE = "ToolEvents::refreshScene", i.REMOVE_SCENE = "ToolEvents::removeScene", i.SET_SCENE = "ToolEvents::setScene", i.GET_OBJECT = "ToolEvents::getObject", i.SET_OBJECT = "ToolEvents::setObject", i.UPDATE_OBJECT = "ToolEvents::updateObject", i.CREATE_TEXTURE = "ToolEvents::createTexture", i.REQUEST_METHOD = "ToolEvents::requestMethod", i.ADD_CAMERA = "ToolEvents::addCamera", i.REMOVE_CAMERA = "ToolEvents::removeCamera", i.ADD_GROUP = "ToolEvents::addGroup", i.REMOVE_GROUP = "ToolEvents::removeGroup", i.ADD_SPLINE = "ToolEvents::addSpline", i.ADD_RENDERER = "ToolEvents::addRenderer", i.UPDATE_RENDERER = "ToolEvents::updateRenderer", i))(A || {});
class qo {
  canvas;
  inputElement;
  settings;
  playing = !1;
  rafID = -1;
  constructor(e, t, s) {
    this.canvas = e, this.inputElement = t, this.settings = s;
  }
  dispose() {
    this.stop();
  }
  play() {
    this.playing || (this.playing = !0, this.onUpdate());
  }
  stop() {
    this.playing && (this.playing = !1, cancelAnimationFrame(this.rafID), this.rafID = -1);
  }
  update() {
  }
  draw() {
  }
  resize(e, t) {
    this.settings.supportOffScreenCanvas && (this.inputElement.clientWidth = e, this.inputElement.clientHeight = t, this.inputElement.width = e, this.inputElement.height = t);
  }
  // Events
  onResize = (e) => {
    this.resize(e.width, e.height);
  };
  onUpdate = () => {
    this.update(), this.draw(), this.rafID = requestAnimationFrame(this.onUpdate);
  };
}
class Ko extends Bi {
  clock;
  cameras;
  lights;
  world;
  constructor(e) {
    super(), this.name = e, this.clock = new $s(), this.lights = new ei(), this.lights.name = "lights", this.add(this.lights), this.cameras = new ei(), this.cameras.name = "cameras", this.add(this.cameras), this.world = new ei(), this.world.name = "world", this.add(this.world);
  }
  init() {
    return new Promise((e) => {
      this.setupLights().then(() => this.setupCameras()).then(() => this.setupWorld()).then(() => this.setupPost()).then(() => this.setupAnimation()).then(() => this.setupDebug()).then(() => e());
    });
  }
  setupLights() {
    return new Promise((e) => {
      e();
    });
  }
  setupCameras() {
    return new Promise((e) => {
      e();
    });
  }
  setupWorld() {
    return new Promise((e) => {
      e();
    });
  }
  setupPost() {
    return new Promise((e) => {
      e();
    });
  }
  setupAnimation() {
    return new Promise((e) => {
      e();
    });
  }
  setupDebug() {
    return new Promise((e) => {
      e();
    });
  }
  dispose() {
  }
  update() {
  }
  draw(e) {
  }
  postDraw() {
  }
  resize(e, t, s) {
  }
  show() {
    this.clock.start(), this.showComplete();
  }
  showComplete() {
    this.enable();
  }
  hide() {
    this.disable(), this.hideComplete();
  }
  hideComplete() {
    this.clock.stop();
  }
  enable() {
  }
  disable() {
  }
  // Getters
  get deltaTime() {
    return Math.min(this.clock.getDelta(), 1 / 30);
  }
}
class Gi {
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
class Qo extends Gi {
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
        e.dispatchEvent({ type: A.SELECT_DROPDOWN, value: s.data });
        break;
      case "draggableListUpdate":
        e.dispatchEvent({ type: A.DRAG_UPDATE, value: s.data });
        break;
    }
  }
}
function Jo(i, e, t) {
  if (i.editor) {
    t.ui.restore(), t.onSelectionChange((r) => {
      r.length < 1 || r.forEach((o) => {
        let l = o.address.sheetId, c = "setSheet", h = {};
        switch (o.type) {
          case "Theatre_Sheet_PublicAPI":
            c = "setSheet", h = {
              sheet: o.address.sheetId
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
          case "Theatre_SheetObject_PublicAPI":
            c = "setSheetObject", l += `_${o.address.objectKey}`, h = {
              id: l,
              sheet: o.address.sheetId,
              key: o.address.objectKey
            }, e.activeSheet = e.sheets.get(o.address.sheetId);
            break;
        }
        i.send({ event: c, target: "app", data: h });
      });
    });
    let s = -1;
    const n = () => {
      if (e.activeSheet !== void 0 && s !== e.activeSheet.sequence.position) {
        s = e.activeSheet.sequence.position;
        const r = e.activeSheet;
        i.send({
          event: "updateTimeline",
          target: "app",
          data: {
            position: s,
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
function el() {
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
function lr(i, e, t, s, n) {
  const a = 1 - i;
  return a * a * a * e + 3 * a * a * i * t + 3 * a * i * i * s + i * i * i * n;
}
function cr(i, e, t) {
  if (i.type !== "bezier" || i.handles.length !== 4)
    throw new Error("Invalid keyframe data for Bézier interpolation.");
  const [s, n] = i.handles, a = (t - i.position) / (e.position - i.position);
  return lr(
    a,
    i.value,
    i.value + s,
    e.value + n,
    e.value
  );
}
class tl extends Gi {
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
      const a = t !== void 0 ? { ...t } : {};
      this.sheet(e, s)?.sequence.play(a).then((r) => n(r)), this.app.send({
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
  sheetObject(e, t, s, n, a) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const r = this.sheet(e, a);
    if (r === void 0)
      return;
    const l = `${this.getSheetInstance(e, a)}_${t}`;
    let c = this.sheetObjects.get(l), h = s;
    c !== void 0 && (h = { ...s, ...c.value }), c = r.object(t, h), this.sheetObjects.set(l, c), this.sheetObjectCBs.set(l, n !== void 0 ? n : ai);
    const m = c.onValuesChange((p) => {
      if (this.app.editor) {
        for (const b in p) {
          const v = p[b];
          typeof v == "object" && Ha(v) && (p[b] = {
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
            sheetObject: l,
            values: p
          }
        });
      }
      const f = this.sheetObjectCBs.get(l);
      f !== void 0 && f(p);
    });
    return this.sheetObjectUnsubscribe.set(l, m), c;
  }
  getSheetObjectKeyframes(e, t, s) {
    const n = this.sheet(e);
    if (n === void 0)
      return [];
    const a = `${e}_${t}`, r = this.sheetObjects.get(a);
    return r === void 0 ? [] : n.sequence.__experimental_getKeyframes(r.props[s]);
  }
  getSheetObjectVectors(e, t) {
    const s = this.sheet(e);
    if (s === void 0)
      return [];
    const n = `${e}_${t}`, a = this.sheetObjects.get(n);
    if (a === void 0)
      return [];
    const r = [], o = s.sequence.__experimental_getKeyframes(a.props.x), l = s.sequence.__experimental_getKeyframes(a.props.y), c = s.sequence.__experimental_getKeyframes(a.props.z), h = /* @__PURE__ */ new Set();
    return o.forEach((p) => h.add(p.position)), l.forEach((p) => h.add(p.position)), c.forEach((p) => h.add(p.position)), Array.from(h).sort((p, f) => p - f).forEach((p) => {
      const f = (b, v) => {
        const x = b.find((C, w) => C.position <= v && (b[w + 1]?.position || 1 / 0) > v), g = b.find((C) => C.position > v);
        if (!x)
          return g?.value || 0;
        if (!g || x.position === v)
          return x.value;
        if (x.type === "bezier")
          return cr(x, g, v);
        const y = (v - x.position) / (g.position - x.position);
        return x.value + y * (g.value - x.value);
      };
      r.push({
        position: p,
        x: f(o, p),
        y: f(l, p),
        z: f(c, p)
      });
    }), r;
  }
  unsubscribe(e) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = e.address.sheetId, s = e.address.objectKey;
    this.sheets.get(t)?.detachObject(s);
    const a = `${t}_${s}`, r = this.sheetObjectUnsubscribe.get(a);
    r !== void 0 && (this.sheetObjects.delete(a), this.sheetObjectCBs.delete(a), this.sheetObjectUnsubscribe.delete(a), r());
  }
  handleApp(e, t, s) {
    const n = t;
    let a;
    switch (s.event) {
      case "setSheet":
        a = n.sheets.get(s.data.sheet), a !== void 0 && (n.activeSheet = a, this.studio?.setSelection([a]));
        break;
      case "setSheetObject":
        a = n.sheetObjects.get(`${s.data.sheet}_${s.data.key}`), a !== void 0 && this.studio?.setSelection([a]);
        break;
      case "updateSheetObject":
        a = n.sheets.get(s.data.sheet), a !== void 0 && a.sequence.pause(), a = n.sheetObjectCBs.get(s.data.sheetObject), a !== void 0 && a(s.data.values);
        break;
      case "updateTimeline":
        a = n.sheets.get(s.data.sheet), n.activeSheet !== void 0 && (n.activeSheet.sequence.position = s.data.position);
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
      this.studio?.ui.restore(), this.studio?.onSelectionChange((r) => {
        r.length < 1 || r.forEach((o) => {
          let l = o.address.sheetId, c = "setSheet", h = {};
          switch (o.type) {
            case "Theatre_Sheet_PublicAPI":
              c = "setSheet", h = {
                sheet: o.address.sheetId
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              c = "setSheetObject", l += `_${o.address.objectKey}`, h = {
                id: l,
                sheet: o.address.sheetId,
                key: o.address.objectKey
              }, t.activeSheet = t.sheets.get(o.address.sheetId);
              break;
          }
          e.send({ event: c, target: "app", data: h });
        });
      });
      let s = -1;
      const n = () => {
        if (t.activeSheet !== void 0 && s !== t.activeSheet.sequence.position) {
          s = t.activeSheet.sequence.position;
          const r = t.activeSheet;
          e.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: s,
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
function hr(i) {
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
function ut(i) {
  const e = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    children: []
  };
  return i.children.forEach((t) => {
    e.children.push(ut(t));
  }), e;
}
function dr(i) {
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
function ur(i) {
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
function at(i) {
  const e = {};
  for (const t in i) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || ur(t))
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
          src: ti.renderToBlob(n),
          offset: [n.offset.x, n.offset.y],
          repeat: [n.repeat.x, n.repeat.y]
        } : t === "uniforms" && (e[t] = dr(e[t]))) : t === "glslVersion" ? e[t] = "" : e[t] = {
          src: "",
          offset: [0, 0],
          repeat: [1, 1]
        };
        break;
    }
  }
  return i.anisotropy !== void 0 && (e.anisotropy = i.anisotropy), i.clearcoat !== void 0 && (e.clearcoat = i.clearcoat), i.iridescence !== void 0 && (e.iridescence = i.iridescence), i.dispersion !== void 0 && (e.dispersion = i.dispersion), i.sheen !== void 0 && (e.sheen = i.sheen), i.transmission !== void 0 && (e.transmission = i.transmission), i.transmission !== void 0 && (e.transmission = i.transmission), e;
}
function bi(i) {
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
      s.material.forEach((a) => {
        n.push(at(a));
      }), e.material = n;
    } else
      e.material = at(s.material);
  } else if (t.search("points") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((a) => {
        n.push(at(a));
      }), e.material = n;
    } else
      e.material = at(s.material);
  } else if (t.search("line") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((a) => {
        n.push(at(a));
      }), e.material = n;
    } else
      e.material = at(s.material);
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
function pr(i, e) {
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
function mr(i, e) {
  for (const t in e)
    i[t] = e[t];
}
function ie(i, e, t) {
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
    let r;
    switch (n) {
      case 1:
        r = i[s[0]];
        break;
      case 2:
        r = i[s[0]][s[1]];
        break;
      case 3:
        r = i[s[0]][s[1]][s[2]];
        break;
      case 4:
        r = i[s[0]][s[1]][s[2]][s[3]];
        break;
      case 5:
        r = i[s[0]][s[1]][s[2]][s[3]][s[4]];
        break;
    }
    r != null && mr(r, t);
  }
}
function En(i) {
  return new Promise((e, t) => {
    const s = new Image();
    s.onload = () => {
      const n = new Ii(s);
      n.wrapS = cs, n.wrapT = cs, n.needsUpdate = !0, e(n);
    }, s.onerror = t, s.src = i;
  });
}
class il extends Gi {
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
      ze(e);
    }), this.scenes.clear(), this.scene && ze(this.scene), this.renderTargets.forEach((e) => {
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
    const t = bi(e);
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
    const s = `#${e.getClearColor(new Je()).getHexString()}`;
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
    ys(), Ni(e);
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
      const s = ut(t);
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
    return this.scenes.forEach((s, n) => {
      e.search(n) > -1 && (t = s);
    }), t;
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.app.debugEnabled))
      return;
    this.renderer !== void 0 && (ti.renderer = this.renderer), ys(), Ni(e);
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
    const t = bi(e);
    this.app.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.app.debugEnabled)
      return;
    const t = bi(e);
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
        e.dispatchEvent({ type: A.GET_OBJECT, value: s.data });
        break;
      case "updateObject":
        e.dispatchEvent({ type: A.UPDATE_OBJECT, value: s.data });
        break;
      case "createTexture":
        e.dispatchEvent({ type: A.CREATE_TEXTURE, value: s.data });
        break;
      case "requestMethod":
        e.dispatchEvent({ type: A.REQUEST_METHOD, value: s.data });
        break;
      case "refreshScene":
        e.send({
          event: "refreshScene",
          target: "editor",
          data: ut(n.scenes.get(s.data.name))
        });
        break;
      case "updateRenderer":
        n.renderer && (n.renderer.autoClear = s.data.autoClear, n.renderer.autoClearColor = s.data.autoClearColor, n.renderer.autoClearDepth = s.data.autoClearDepth, n.renderer.autoClearStencil = s.data.autoClearStencil, n.renderer.outputColorSpace = s.data.outputColorSpace, n.renderer.localClippingEnabled = s.data.localClippingEnabled, n.renderer.setClearColor(s.data.clearColor, s.data.clearAlpha), n.renderer.toneMapping = s.data.toneMapping, n.renderer.toneMappingExposure = s.data.toneMappingExposure, pt.enabled = s.data.colorManagement);
        break;
    }
    if (s.event === "updateGroup") {
      const a = JSON.parse(s.data);
      n.groups.get(a.group)?.onUpdate(a.prop, a.value);
    }
  }
  handleEditor(e, t, s) {
    switch (s.event) {
      case "setObject":
        e.dispatchEvent({ type: A.SET_OBJECT, value: s.data });
        break;
      case "addScene":
        e.dispatchEvent({ type: A.ADD_SCENE, value: s.data });
        break;
      case "refreshScene":
        e.dispatchEvent({ type: A.REFRESH_SCENE, value: s.data });
        break;
      case "removeScene":
        e.dispatchEvent({ type: A.REMOVE_SCENE, value: s.data });
        break;
      case "setScene":
        e.dispatchEvent({ type: A.SET_SCENE, value: s.data });
        break;
      case "addCamera":
        e.dispatchEvent({ type: A.ADD_CAMERA, value: s.data });
        break;
      case "removeCamera":
        e.dispatchEvent({ type: A.REMOVE_CAMERA, value: s.data });
        break;
      case "addGroup":
        e.dispatchEvent({ type: A.ADD_GROUP, value: s.data });
        break;
      case "removeGroup":
        e.dispatchEvent({ type: A.REMOVE_GROUP, value: s.data });
        break;
      case "addSpline":
        e.dispatchEvent({ type: A.ADD_SPLINE, value: s.data });
        break;
      case "addRenderer":
        e.dispatchEvent({ type: A.ADD_RENDERER, value: s.data });
    }
  }
  // Renderer
  addRT(e, t) {
    const s = new Qn(32, 32, t);
    s.texture.name = e, this.renderTargets.set(e, s);
  }
  resize(e, t) {
    const s = this.dpr;
    this.renderTargets.forEach((a) => {
      a.setSize(e * s, t * s);
    });
    const n = !(this.renderer?.domElement instanceof OffscreenCanvas);
    this.renderer?.setSize(e, t, n);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(Xe(1, 2, e));
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
var Fi = { exports: {} }, bt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Es;
function fr() {
  if (Es)
    return bt;
  Es = 1;
  var i = _n, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, n = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(o, l, c) {
    var h, m = {}, p = null, f = null;
    c !== void 0 && (p = "" + c), l.key !== void 0 && (p = "" + l.key), l.ref !== void 0 && (f = l.ref);
    for (h in l)
      s.call(l, h) && !a.hasOwnProperty(h) && (m[h] = l[h]);
    if (o && o.defaultProps)
      for (h in l = o.defaultProps, l)
        m[h] === void 0 && (m[h] = l[h]);
    return { $$typeof: e, type: o, key: p, ref: f, props: m, _owner: n.current };
  }
  return bt.Fragment = t, bt.jsx = r, bt.jsxs = r, bt;
}
var Ct = {};
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
function gr() {
  return bs || (bs = 1, process.env.NODE_ENV !== "production" && function() {
    var i = _n, e = Symbol.for("react.element"), t = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), r = Symbol.for("react.provider"), o = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), b = Symbol.iterator, v = "@@iterator";
    function x(d) {
      if (d === null || typeof d != "object")
        return null;
      var E = b && d[b] || d[v];
      return typeof E == "function" ? E : null;
    }
    var g = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(d) {
      {
        for (var E = arguments.length, O = new Array(E > 1 ? E - 1 : 0), L = 1; L < E; L++)
          O[L - 1] = arguments[L];
        C("error", d, O);
      }
    }
    function C(d, E, O) {
      {
        var L = g.ReactDebugCurrentFrame, z = L.getStackAddendum();
        z !== "" && (E += "%s", O = O.concat([z]));
        var G = O.map(function(N) {
          return String(N);
        });
        G.unshift("Warning: " + E), Function.prototype.apply.call(console[d], console, G);
      }
    }
    var w = !1, S = !1, T = !1, R = !1, k = !1, D;
    D = Symbol.for("react.module.reference");
    function V(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === s || d === a || k || d === n || d === c || d === h || R || d === f || w || S || T || typeof d == "object" && d !== null && (d.$$typeof === p || d.$$typeof === m || d.$$typeof === r || d.$$typeof === o || d.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === D || d.getModuleId !== void 0));
    }
    function Ce(d, E, O) {
      var L = d.displayName;
      if (L)
        return L;
      var z = E.displayName || E.name || "";
      return z !== "" ? O + "(" + z + ")" : O;
    }
    function ge(d) {
      return d.displayName || "Context";
    }
    function ae(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case s:
          return "Fragment";
        case t:
          return "Portal";
        case a:
          return "Profiler";
        case n:
          return "StrictMode";
        case c:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case o:
            var E = d;
            return ge(E) + ".Consumer";
          case r:
            var O = d;
            return ge(O._context) + ".Provider";
          case l:
            return Ce(d, d.render, "ForwardRef");
          case m:
            var L = d.displayName || null;
            return L !== null ? L : ae(d.type) || "Memo";
          case p: {
            var z = d, G = z._payload, N = z._init;
            try {
              return ae(N(G));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var K = Object.assign, $ = 0, ke, ce, Ee, se, Ue, je, Ne;
    function W() {
    }
    W.__reactDisabledLog = !0;
    function oe() {
      {
        if ($ === 0) {
          ke = console.log, ce = console.info, Ee = console.warn, se = console.error, Ue = console.group, je = console.groupCollapsed, Ne = console.groupEnd;
          var d = {
            configurable: !0,
            enumerable: !0,
            value: W,
            writable: !0
          };
          Object.defineProperties(console, {
            info: d,
            log: d,
            warn: d,
            error: d,
            group: d,
            groupCollapsed: d,
            groupEnd: d
          });
        }
        $++;
      }
    }
    function Te() {
      {
        if ($--, $ === 0) {
          var d = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: K({}, d, {
              value: ke
            }),
            info: K({}, d, {
              value: ce
            }),
            warn: K({}, d, {
              value: Ee
            }),
            error: K({}, d, {
              value: se
            }),
            group: K({}, d, {
              value: Ue
            }),
            groupCollapsed: K({}, d, {
              value: je
            }),
            groupEnd: K({}, d, {
              value: Ne
            })
          });
        }
        $ < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vt = g.ReactCurrentDispatcher, tt;
    function Ft(d, E, O) {
      {
        if (tt === void 0)
          try {
            throw Error();
          } catch (z) {
            var L = z.stack.trim().match(/\n( *(at )?)/);
            tt = L && L[1] || "";
          }
        return `
` + tt + d;
      }
    }
    var ui = !1, zt;
    {
      var Tn = typeof WeakMap == "function" ? WeakMap : Map;
      zt = new Tn();
    }
    function $i(d, E) {
      if (!d || ui)
        return "";
      {
        var O = zt.get(d);
        if (O !== void 0)
          return O;
      }
      var L;
      ui = !0;
      var z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var G;
      G = vt.current, vt.current = null, oe();
      try {
        if (E) {
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
            } catch (Fe) {
              L = Fe;
            }
            Reflect.construct(d, [], N);
          } else {
            try {
              N.call();
            } catch (Fe) {
              L = Fe;
            }
            d.call(N.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Fe) {
            L = Fe;
          }
          d();
        }
      } catch (Fe) {
        if (Fe && L && typeof Fe.stack == "string") {
          for (var j = Fe.stack.split(`
`), me = L.stack.split(`
`), te = j.length - 1, ne = me.length - 1; te >= 1 && ne >= 0 && j[te] !== me[ne]; )
            ne--;
          for (; te >= 1 && ne >= 0; te--, ne--)
            if (j[te] !== me[ne]) {
              if (te !== 1 || ne !== 1)
                do
                  if (te--, ne--, ne < 0 || j[te] !== me[ne]) {
                    var we = `
` + j[te].replace(" at new ", " at ");
                    return d.displayName && we.includes("<anonymous>") && (we = we.replace("<anonymous>", d.displayName)), typeof d == "function" && zt.set(d, we), we;
                  }
                while (te >= 1 && ne >= 0);
              break;
            }
        }
      } finally {
        ui = !1, vt.current = G, Te(), Error.prepareStackTrace = z;
      }
      var st = d ? d.displayName || d.name : "", ls = st ? Ft(st) : "";
      return typeof d == "function" && zt.set(d, ls), ls;
    }
    function On(d, E, O) {
      return $i(d, !1);
    }
    function Mn(d) {
      var E = d.prototype;
      return !!(E && E.isReactComponent);
    }
    function Ht(d, E, O) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return $i(d, Mn(d));
      if (typeof d == "string")
        return Ft(d);
      switch (d) {
        case c:
          return Ft("Suspense");
        case h:
          return Ft("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case l:
            return On(d.render);
          case m:
            return Ht(d.type, E, O);
          case p: {
            var L = d, z = L._payload, G = L._init;
            try {
              return Ht(G(z), E, O);
            } catch {
            }
          }
        }
      return "";
    }
    var Yt = Object.prototype.hasOwnProperty, qi = {}, Ki = g.ReactDebugCurrentFrame;
    function Bt(d) {
      if (d) {
        var E = d._owner, O = Ht(d.type, d._source, E ? E.type : null);
        Ki.setExtraStackFrame(O);
      } else
        Ki.setExtraStackFrame(null);
    }
    function Pn(d, E, O, L, z) {
      {
        var G = Function.call.bind(Yt);
        for (var N in d)
          if (G(d, N)) {
            var j = void 0;
            try {
              if (typeof d[N] != "function") {
                var me = Error((L || "React class") + ": " + O + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw me.name = "Invariant Violation", me;
              }
              j = d[N](E, N, L, O, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (te) {
              j = te;
            }
            j && !(j instanceof Error) && (Bt(z), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", L || "React class", O, N, typeof j), Bt(null)), j instanceof Error && !(j.message in qi) && (qi[j.message] = !0, Bt(z), y("Failed %s type: %s", O, j.message), Bt(null));
          }
      }
    }
    var An = Array.isArray;
    function pi(d) {
      return An(d);
    }
    function Dn(d) {
      {
        var E = typeof Symbol == "function" && Symbol.toStringTag, O = E && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return O;
      }
    }
    function Rn(d) {
      try {
        return Qi(d), !1;
      } catch {
        return !0;
      }
    }
    function Qi(d) {
      return "" + d;
    }
    function Ji(d) {
      if (Rn(d))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Dn(d)), Qi(d);
    }
    var yt = g.ReactCurrentOwner, In = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, es, ts, mi;
    mi = {};
    function Ln(d) {
      if (Yt.call(d, "ref")) {
        var E = Object.getOwnPropertyDescriptor(d, "ref").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return d.ref !== void 0;
    }
    function kn(d) {
      if (Yt.call(d, "key")) {
        var E = Object.getOwnPropertyDescriptor(d, "key").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return d.key !== void 0;
    }
    function Un(d, E) {
      if (typeof d.ref == "string" && yt.current && E && yt.current.stateNode !== E) {
        var O = ae(yt.current.type);
        mi[O] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ae(yt.current.type), d.ref), mi[O] = !0);
      }
    }
    function jn(d, E) {
      {
        var O = function() {
          es || (es = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        O.isReactWarning = !0, Object.defineProperty(d, "key", {
          get: O,
          configurable: !0
        });
      }
    }
    function Nn(d, E) {
      {
        var O = function() {
          ts || (ts = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        O.isReactWarning = !0, Object.defineProperty(d, "ref", {
          get: O,
          configurable: !0
        });
      }
    }
    var Fn = function(d, E, O, L, z, G, N) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: d,
        key: E,
        ref: O,
        props: N,
        // Record the component responsible for creating this element.
        _owner: G
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
    function zn(d, E, O, L, z) {
      {
        var G, N = {}, j = null, me = null;
        O !== void 0 && (Ji(O), j = "" + O), kn(E) && (Ji(E.key), j = "" + E.key), Ln(E) && (me = E.ref, Un(E, z));
        for (G in E)
          Yt.call(E, G) && !In.hasOwnProperty(G) && (N[G] = E[G]);
        if (d && d.defaultProps) {
          var te = d.defaultProps;
          for (G in te)
            N[G] === void 0 && (N[G] = te[G]);
        }
        if (j || me) {
          var ne = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
          j && jn(N, ne), me && Nn(N, ne);
        }
        return Fn(d, j, me, z, L, yt.current, N);
      }
    }
    var fi = g.ReactCurrentOwner, is = g.ReactDebugCurrentFrame;
    function it(d) {
      if (d) {
        var E = d._owner, O = Ht(d.type, d._source, E ? E.type : null);
        is.setExtraStackFrame(O);
      } else
        is.setExtraStackFrame(null);
    }
    var gi;
    gi = !1;
    function _i(d) {
      return typeof d == "object" && d !== null && d.$$typeof === e;
    }
    function ss() {
      {
        if (fi.current) {
          var d = ae(fi.current.type);
          if (d)
            return `

Check the render method of \`` + d + "`.";
        }
        return "";
      }
    }
    function Hn(d) {
      {
        if (d !== void 0) {
          var E = d.fileName.replace(/^.*[\\\/]/, ""), O = d.lineNumber;
          return `

Check your code at ` + E + ":" + O + ".";
        }
        return "";
      }
    }
    var ns = {};
    function Yn(d) {
      {
        var E = ss();
        if (!E) {
          var O = typeof d == "string" ? d : d.displayName || d.name;
          O && (E = `

Check the top-level render call using <` + O + ">.");
        }
        return E;
      }
    }
    function as(d, E) {
      {
        if (!d._store || d._store.validated || d.key != null)
          return;
        d._store.validated = !0;
        var O = Yn(E);
        if (ns[O])
          return;
        ns[O] = !0;
        var L = "";
        d && d._owner && d._owner !== fi.current && (L = " It was passed a child from " + ae(d._owner.type) + "."), it(d), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', O, L), it(null);
      }
    }
    function rs(d, E) {
      {
        if (typeof d != "object")
          return;
        if (pi(d))
          for (var O = 0; O < d.length; O++) {
            var L = d[O];
            _i(L) && as(L, E);
          }
        else if (_i(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var z = x(d);
          if (typeof z == "function" && z !== d.entries)
            for (var G = z.call(d), N; !(N = G.next()).done; )
              _i(N.value) && as(N.value, E);
        }
      }
    }
    function Bn(d) {
      {
        var E = d.type;
        if (E == null || typeof E == "string")
          return;
        var O;
        if (typeof E == "function")
          O = E.propTypes;
        else if (typeof E == "object" && (E.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        E.$$typeof === m))
          O = E.propTypes;
        else
          return;
        if (O) {
          var L = ae(E);
          Pn(O, d.props, "prop", L, d);
        } else if (E.PropTypes !== void 0 && !gi) {
          gi = !0;
          var z = ae(E);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", z || "Unknown");
        }
        typeof E.getDefaultProps == "function" && !E.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Vn(d) {
      {
        for (var E = Object.keys(d.props), O = 0; O < E.length; O++) {
          var L = E[O];
          if (L !== "children" && L !== "key") {
            it(d), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", L), it(null);
            break;
          }
        }
        d.ref !== null && (it(d), y("Invalid attribute `ref` supplied to `React.Fragment`."), it(null));
      }
    }
    function os(d, E, O, L, z, G) {
      {
        var N = V(d);
        if (!N) {
          var j = "";
          (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var me = Hn(z);
          me ? j += me : j += ss();
          var te;
          d === null ? te = "null" : pi(d) ? te = "array" : d !== void 0 && d.$$typeof === e ? (te = "<" + (ae(d.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : te = typeof d, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", te, j);
        }
        var ne = zn(d, E, O, z, G);
        if (ne == null)
          return ne;
        if (N) {
          var we = E.children;
          if (we !== void 0)
            if (L)
              if (pi(we)) {
                for (var st = 0; st < we.length; st++)
                  rs(we[st], d);
                Object.freeze && Object.freeze(we);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              rs(we, d);
        }
        return d === s ? Vn(ne) : Bn(ne), ne;
      }
    }
    function Zn(d, E, O) {
      return os(d, E, O, !0);
    }
    function Wn(d, E, O) {
      return os(d, E, O, !1);
    }
    var Gn = Wn, Xn = Zn;
    Ct.Fragment = s, Ct.jsx = Gn, Ct.jsxs = Xn;
  }()), Ct;
}
process.env.NODE_ENV === "production" ? Fi.exports = fr() : Fi.exports = gr();
var u = Fi.exports;
function bn(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ u.jsx("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ u.jsx("button", { children: i.title });
}
const _r = /* @__PURE__ */ u.jsxs("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), vr = /* @__PURE__ */ u.jsx("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ u.jsx(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function yr(i) {
  return /* @__PURE__ */ u.jsx(
    "li",
    {
      className: `reorder-item ${i.draggingIndex === i.index ? "dragging" : ""}`,
      draggable: !0,
      onDragStart: () => i.onDragStart(i.index),
      onDragOver: (e) => {
        e.preventDefault(), i.onDragOver(i.index);
      },
      onDragEnd: i.onDragEnd,
      children: /* @__PURE__ */ u.jsxs("div", { children: [
        vr,
        /* @__PURE__ */ u.jsx("span", { children: i.title }),
        /* @__PURE__ */ u.jsx("button", { className: "closeIcon", onClick: () => i.onDelete(i.index), children: _r })
      ] })
    }
  );
}
function Er(i) {
  const [e, t] = B(!1), [s, n] = B(i.options), [a, r] = B(null), o = (f) => {
    i.onDragComplete(f), n(f);
  }, l = (f) => {
    const b = [...s];
    b.splice(f, 1), o(b);
  }, c = (f) => {
    r(f);
  }, h = (f) => {
    if (a === f || a === null)
      return;
    const b = [...s], v = b.splice(a, 1)[0];
    b.splice(f, 0, v), r(f), n(b);
  }, m = () => {
    i.onDragComplete(s), r(null);
  };
  let p = "dropdown draggable";
  return i.subdropdown && (p += " subdropdown"), /* @__PURE__ */ u.jsxs("div", { className: p, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ u.jsx(bn, { title: i.title }),
    /* @__PURE__ */ u.jsx("ul", { className: "reorder-list", style: { display: e ? "block" : "none" }, children: s.map((f, b) => /* @__PURE__ */ u.jsx(
      yr,
      {
        title: f,
        index: b,
        draggingIndex: a,
        onDelete: l,
        onDragStart: c,
        onDragOver: h,
        onDragEnd: m
      },
      f
    )) })
  ] });
}
function br(i) {
  const [e, t] = B(!1), s = [];
  i.options.map((a, r) => {
    i.onSelect !== void 0 && (a.onSelect = i.onSelect), s.push(/* @__PURE__ */ u.jsx(Cr, { option: a }, r));
  });
  let n = "dropdown";
  return i.subdropdown && (n += " subdropdown"), /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ u.jsx(bn, { title: i.title }),
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
function Cr(i) {
  const { option: e } = i, [t, s] = B("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ u.jsx(
        Er,
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
      n = /* @__PURE__ */ u.jsx(
        br,
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
  return /* @__PURE__ */ u.jsx("li", { className: t === e.title ? "selected" : "", children: n }, za());
}
function oi(i) {
  const [e, t] = B(i.open !== void 0 ? i.open : !0), s = !e || i.children === void 0, n = () => {
    i.app.dispatchEvent({ type: A.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `accordion ${s ? "hide" : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const a = !e;
          i.onToggle !== void 0 && i.onToggle(a), t(a);
        },
        children: [
          /* @__PURE__ */ u.jsx(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ u.jsx("p", { className: "label", children: ri(i.label) })
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
function Cn(i) {
  const e = J(null), [t, s] = B(!1), n = i.child !== void 0 && i.child.children.length > 0, a = [];
  return i.child !== void 0 && i.child.children.length > 0 && i.child.children.map((r, o) => {
    a.push(/* @__PURE__ */ u.jsx(Cn, { app: i.app, child: r, three: i.three }, o));
  }), et(() => {
    if (i.child) {
      const r = i.three.getScene(i.child.uuid);
      if (r !== null) {
        const o = r.getObjectByProperty("uuid", i.child.uuid);
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
              const r = i.three.getScene(i.child.uuid);
              if (r !== null) {
                const o = r.getObjectByProperty("uuid", i.child.uuid);
                if (o !== void 0) {
                  const l = "visible", c = !o.visible;
                  e.current.style.opacity = c ? "1" : "0.25", i.three.updateObject(i.child.uuid, l, c), ie(o, l, c);
                }
              }
            }
          }
        }
      ),
      /* @__PURE__ */ u.jsx("div", { className: `icon ${hr(i.child)}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: t ? "open" : "", children: /* @__PURE__ */ u.jsx("div", { className: "container", children: a }) })
  ] }, Math.random()) });
}
function Cs(i) {
  const e = [];
  return i.child?.children.map((t, s) => {
    e.push(/* @__PURE__ */ u.jsx(Cn, { app: i.app, child: t, scene: i.scene, three: i.three }, s));
  }), /* @__PURE__ */ u.jsx("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: e });
}
function Dt(i) {
  const [e, t] = B(i.defaultValue);
  return et(() => {
    let s = !1, n = -1, a = 0, r = i.defaultValue, o = !1;
    const l = (f) => {
      o = f.ctrlKey;
    }, c = (f) => {
      s = !0, a = Number(i.input.current?.value), n = f.clientX, document.addEventListener("mouseup", m, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", m, !1);
    }, h = (f) => {
      if (!s)
        return;
      const b = i.step !== void 0 ? i.step : 1, v = (f.clientX - n) * b * (o ? 10 : 1);
      r = Number((a + v).toFixed(4)), i.min !== void 0 && (r = Math.max(r, i.min)), i.max !== void 0 && (r = Math.min(r, i.max)), i.onChange !== void 0 && i.onChange(r), t(r);
    }, m = () => {
      s = !1, document.removeEventListener("mouseup", m), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", m);
    }, p = (f) => {
      const b = Number(f.target.value);
      i.onChange !== void 0 && i.onChange(b), t(b);
    };
    return i.label.current?.addEventListener("mousedown", c, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", p), document.addEventListener("keydown", l, !1), document.addEventListener("keyup", l, !1), () => {
      i.label.current?.removeEventListener("mousedown", c), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", p), document.removeEventListener("mouseup", m), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", m), document.removeEventListener("keydown", l), document.addEventListener("keyup", l, !1);
    };
  }, []), e;
}
function Ke(i) {
  const e = J(null), t = J(null), [s, n] = B(i.value);
  return Dt({
    label: i.labelRef,
    input: e,
    sliderRef: t,
    defaultValue: s,
    min: i.min,
    max: i.max,
    step: i.step,
    onChange: (a) => {
      n(a), i.onChange !== void 0 && i.onChange(i.prop, a);
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
        onChange: (a) => {
          if (n(a.target.value), a.target.value.length === 0)
            return;
          const r = Number(a.target.value);
          isNaN(r) || i.onChange !== void 0 && i.onChange(i.prop, r);
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
          onChange: (a) => {
            if (a.target.value.length === 0)
              return;
            const r = Number(a.target.value);
            isNaN(r) || i.onChange !== void 0 && i.onChange(i.prop, r);
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
          onChange: ai
        }
      )
    ] })
  ] });
}
function wr(i) {
  const e = J(null), t = J(null), s = J(null), n = J(null), a = J(null), r = J(null), o = J(null), l = J(null), c = J(null), h = J(null), [m, p] = B(i.value.x), [f, b] = B(i.value.y), [v, x] = B({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [g, y] = B(!1);
  Dt({
    label: o,
    input: e,
    defaultValue: m,
    min: v.min,
    max: v.max,
    step: 0.01,
    onChange: (D) => {
      p(D), i.onChange({ target: { value: { x: D, y: f } } });
    }
  }), Dt({
    label: l,
    input: t,
    defaultValue: f,
    min: v.min,
    max: v.max,
    step: 0.01,
    onChange: (D) => {
      b(D), i.onChange({ target: { value: { x: m, y: D } } });
    }
  }), Dt({
    label: c,
    input: s,
    defaultValue: v.min,
    min: v.min - 1,
    max: v.max + 1,
    step: 0.01,
    onChange: (D) => {
      x({ min: D, max: v.max });
    }
  }), Dt({
    label: h,
    input: n,
    defaultValue: v.max,
    min: v.min - 1,
    max: v.max + 1,
    step: 0.01,
    onChange: (D) => {
      x({ min: v.min, max: D });
    }
  });
  function C() {
    g || (window.addEventListener("mousemove", S), window.addEventListener("mouseup", w), y(!0));
  }
  function w() {
    window.removeEventListener("mousemove", S), window.removeEventListener("mouseup", w), y(!1);
  }
  function S(D) {
    const V = a.current.getBoundingClientRect(), Ce = Xe(0, 99, D.clientX - V.left) / 99, ge = 1 - Xe(0, 99, D.clientY - V.top) / 99, ae = Me(jt(v.min, v.max, Ce), 3), K = Me(jt(v.min, v.max, ge), 3);
    i.onChange({ target: { value: { x: ae, y: K } } }), p(ae), b(K);
  }
  function T() {
    const D = Number(s.current.value);
    x({ min: D, max: v.max }), m < D && p(Xe(D, v.max, m)), f < D && b(Xe(D, v.max, f));
  }
  function R() {
    const D = Number(n.current.value);
    x({ min: v.min, max: D }), m > D && p(Xe(v.min, D, m)), f > D && b(Xe(v.min, D, f));
  }
  et(() => {
    r.current.style.left = `${Ui(v.min, v.max, m) * 100}%`, r.current.style.top = `${(1 - Ui(v.min, v.max, f)) * 100}%`;
  }, [v, m, f]);
  const k = i.step !== void 0 ? i.step : 0.01;
  return /* @__PURE__ */ u.jsxs("div", { className: "vector2", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: o, children: "X" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: e,
            type: "number",
            value: m,
            min: v.min,
            max: v.max,
            step: k,
            onChange: (D) => {
              if (p(D.target.value), D.target.value.length === 0)
                return;
              const V = Number(D.target.value);
              isNaN(V) || (i.onChange({ target: { value: { x: V, y: f } } }), V < v.min && x({ min: V, max: v.max }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: l, children: "Y" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: t,
            type: "number",
            value: f,
            min: v.min,
            max: v.max,
            step: k,
            onChange: (D) => {
              if (b(D.target.value), D.target.value.length === 0)
                return;
              const V = Number(D.target.value);
              isNaN(V) || (i.onChange({ target: { value: { x: m, y: V } } }), V > v.max && x({ min: v.min, max: V }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: c, children: "Min" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: v.min,
            step: k,
            onChange: T
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { ref: h, children: "Max" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: v.max,
            step: k,
            onChange: R
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "input", ref: a, onMouseDown: C, onMouseUp: w, children: [
      /* @__PURE__ */ u.jsx("div", { className: "x" }),
      /* @__PURE__ */ u.jsx("div", { className: "y" }),
      /* @__PURE__ */ u.jsx("div", { className: "pt", ref: r })
    ] })
  ] });
}
const Sr = Math.PI / 180, xr = 180 / Math.PI;
function rt(i, e, t, s, n) {
  return s + (i - e) * (n - s) / (t - e);
}
function ot(i, e, t) {
  return (1 - t) * i + t * e;
}
function zi(i) {
  return i * Sr;
}
function Tr(i) {
  return i * xr;
}
function ws(i) {
  const e = i.value.x !== void 0 && i.value.y !== void 0 && i.value.z !== void 0, t = i.value.isEuler !== void 0, s = i.value.elements !== void 0, n = i.step !== void 0 ? i.step : 0.01, a = [];
  if (t) {
    const r = kt(() => i.value, []);
    ["_x", "_y", "_z"].forEach((l) => {
      const c = J(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: l.substring(1).toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Ke,
            {
              value: Tr(r[l]),
              type: "number",
              prop: l,
              step: 0.1,
              labelRef: c,
              onChange: (h, m) => {
                r[h] = zi(m), i.onChange({ target: { value: r } });
              }
            }
          )
        ] }, l)
      );
    });
  } else if (e) {
    const r = kt(() => i.value, []), o = (c, h) => {
      r[c] = h, i.onChange({ target: { value: r } });
    };
    ["x", "y", "z"].forEach((c) => {
      const h = J(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: h, children: c.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Ke,
            {
              value: r[c],
              type: "number",
              prop: c,
              step: n,
              labelRef: h,
              onChange: o
            }
          )
        ] }, c)
      );
    });
  } else if (s) {
    const r = kt(() => i.value, []), o = (l, c) => {
      const h = Number(l);
      r.elements[h] = c, i.onChange({ target: { value: r } });
    };
    for (let l = 0; l < 9; l++) {
      const c = J(null);
      a.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: c, children: l + 1 }),
          /* @__PURE__ */ u.jsx(
            Ke,
            {
              value: r.elements[l],
              type: "number",
              prop: l.toString(),
              step: n,
              labelRef: c,
              onChange: o
            }
          )
        ] }, l.toString())
      );
    }
  }
  return /* @__PURE__ */ u.jsx("div", { className: "grid3", children: a }, Math.random().toString());
}
function Or(i) {
  const e = i.value.x !== void 0, t = i.step !== void 0 ? i.step : 0.01, s = [];
  if (e) {
    const n = kt(() => i.value, []), a = (o, l) => {
      n[o] = l, i.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const l = J(null);
      s.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: l, children: o.toUpperCase() }),
          /* @__PURE__ */ u.jsx(
            Ke,
            {
              value: n[o],
              type: "number",
              prop: o,
              step: t,
              labelRef: l,
              onChange: a
            }
          )
        ] }, o)
      );
    });
  } else {
    const n = kt(() => i.value, []), a = (r, o) => {
      const l = Number(r);
      n.elements[l] = o, i.onChange({ target: { value: n } });
    };
    for (let r = 0; r < 16; r++) {
      const o = J(null);
      s.push(
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("label", { ref: o, children: r + 1 }),
          /* @__PURE__ */ u.jsx(
            Ke,
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
  return /* @__PURE__ */ u.jsx("div", { className: "grid4", children: s });
}
function Mr(i) {
  return !(i === "defaultAttributeValues" || i === "forceSinglePass" || i === "linecap" || i === "linejoin" || i === "linewidth" || i === "normalMapType" || i === "precision" || i === "shadowSide" || i === "uniformsGroups" || i === "uniformsNeedUpdate" || i === "userData" || i === "version" || i === "wireframeLinecap" || i === "wireframeLinejoin" || i === "wireframeLinewidth" || i.slice(0, 4) === "clip" || i.slice(0, 7) === "polygon" || i.slice(0, 7) === "stencil" || i.slice(0, 2) === "is");
}
function Pr(i) {
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
function hi(i) {
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
function wn(i) {
  const e = i.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function Ar() {
  const i = document.createElement("input");
  return i.type = "file", new Promise((e, t) => {
    i.addEventListener("change", function() {
      if (i.files === null)
        t();
      else {
        const s = i.files[0], n = new FileReader();
        n.onload = function(a) {
          e(a.target.result);
        }, n.readAsDataURL(s);
      }
    }), i.click();
  });
}
const Dr = [
  {
    title: "Front",
    value: Jn
  },
  {
    title: "Back",
    value: qs
  },
  {
    title: "Double",
    value: Vi
  }
], Rr = [
  {
    title: "No Blending",
    value: ea
  },
  {
    title: "Normal",
    value: ta
  },
  {
    title: "Additive",
    value: ia
  },
  {
    title: "Subtractive",
    value: sa
  },
  {
    title: "Multiply",
    value: na
  },
  {
    title: "Custom",
    value: aa
  }
], Ir = [
  {
    title: "Add",
    value: ra
  },
  {
    title: "Subtract",
    value: oa
  },
  {
    title: "Reverse Subtract",
    value: la
  },
  {
    title: "Min",
    value: ca
  },
  {
    title: "Max",
    value: ha
  }
], Lr = [
  {
    title: "Zero",
    value: Ks
  },
  {
    title: "One",
    value: Qs
  },
  {
    title: "Src Color",
    value: Js
  },
  {
    title: "One Minus Src Color",
    value: en
  },
  {
    title: "Src Alpha",
    value: tn
  },
  {
    title: "One Minus Src Alpha",
    value: sn
  },
  {
    title: "Dst Alpha",
    value: nn
  },
  {
    title: "One Minus Dst Alpha",
    value: an
  },
  {
    title: "Dst Color",
    value: rn
  },
  {
    title: "One Minus Dst Color",
    value: on
  },
  {
    title: "Src Alpha Saturate",
    value: da
  },
  {
    title: "Constant Color",
    value: ln
  },
  {
    title: "One Minus Constant Color",
    value: cn
  },
  {
    title: "Constant Alpha",
    value: hn
  },
  {
    title: "One Minus Constant Alpha",
    value: dn
  }
], kr = [
  {
    title: "Zero",
    value: Ks
  },
  {
    title: "One",
    value: Qs
  },
  {
    title: "Src Color",
    value: Js
  },
  {
    title: "One Minus Src Color",
    value: en
  },
  {
    title: "Src Alpha",
    value: tn
  },
  {
    title: "One Minus Src Alpha",
    value: sn
  },
  {
    title: "Dst Alpha",
    value: nn
  },
  {
    title: "One Minus Dst Alpha",
    value: an
  },
  {
    title: "Dst Color",
    value: rn
  },
  {
    title: "One Minus Dst Color",
    value: on
  },
  {
    title: "Constant Color",
    value: ln
  },
  {
    title: "One Minus Constant Color",
    value: cn
  },
  {
    title: "Constant Alpha",
    value: hn
  },
  {
    title: "One Minus Constant Alpha",
    value: dn
  }
];
function wt(i, e) {
  i.needsUpdate = !0, i.type = "option", i.options = e;
}
function Ur(i, e, t, s) {
  return {
    type: "boolean",
    title: hi(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (n, a) => {
      s.updateObject(t.uuid, `material.${i}`, a), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const r = s.getScene(t.uuid);
      if (r !== null) {
        const o = r.getObjectByProperty("uuid", t.uuid);
        ie(o, `material.${i}`, a);
      }
    }
  };
}
function jr(i, e, t, s) {
  const n = {
    type: "number",
    title: hi(i),
    prop: i,
    value: e,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (a, r) => {
      s.updateObject(t.uuid, `material.${i}`, r), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = s.getScene(t.uuid);
      if (o !== null) {
        const l = o.getObjectByProperty("uuid", t.uuid);
        ie(l, `material.${i}`, r);
      }
    }
  };
  switch (i) {
    case "blending":
      wt(n, Rr);
      break;
    case "blendDst":
      wt(n, kr);
      break;
    case "blendEquation":
      wt(n, Ir);
      break;
    case "blendSrc":
      wt(n, Lr);
      break;
    case "side":
      wt(n, Dr);
      break;
  }
  return wn(i) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function Nr(i, e, t, s) {
  const n = {
    type: "string",
    title: hi(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (r, o) => {
      s.updateObject(t.uuid, `material.${i}`, o), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const l = s.getScene(t.uuid);
      if (l !== null) {
        const c = l.getObjectByProperty("uuid", t.uuid);
        ie(c, `material.${i}`, o);
      }
    },
    onKeyDown: (r) => {
    }
  };
  return (i === "vertexShader" || i === "fragmentShader") && (n.disabled = !1, n.latest = n.value, n.onChange = (r, o) => {
    n.latest = o, s.updateObject(t.uuid, `material.${i}`, o);
    const l = s.getScene(t.uuid);
    if (l !== null) {
      const c = l.getObjectByProperty("uuid", t.uuid);
      ie(c, `material.${i}`, o);
    }
  }, n.onKeyDown = (r) => {
    if (r.key === "Enter" && (r.altKey || r.metaKey)) {
      s.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = s.getScene(t.uuid);
      if (o !== null) {
        const l = o.getObjectByProperty("uuid", t.uuid);
        ie(l, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Fr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z === void 0;
}
function zr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w === void 0;
}
function Hr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w !== void 0;
}
function Hi(i) {
  i.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function Rt(i, e, t, s, n = "", a = !1) {
  const r = hi(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${i}` : i, l = typeof e;
  if (l === "boolean" || l === "string")
    return {
      title: r,
      prop: o,
      type: l,
      value: e,
      disabled: a,
      onChange: (c, h) => {
        s.updateObject(t.uuid, `material.${o}`, h);
        const m = s.getScene(t.uuid);
        if (m !== null) {
          const p = m.getObjectByProperty("uuid", t.uuid);
          ie(p, `material.${o}`, h);
        }
      }
    };
  if (l === "number") {
    const c = {
      title: r,
      prop: o,
      type: "number",
      value: e,
      step: 0.01,
      disabled: a,
      onChange: (h, m) => {
        s.updateObject(t.uuid, `material.${o}`, m);
        const p = s.getScene(t.uuid);
        if (p !== null) {
          const f = p.getObjectByProperty("uuid", t.uuid);
          ie(f, `material.${o}`, m);
        }
      }
    };
    return wn(r) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (e.isColor)
      return {
        title: r,
        prop: o,
        type: "color",
        value: e,
        disabled: a,
        onChange: (c, h) => {
          const m = new Je(h);
          s.updateObject(t.uuid, `material.${o}`, m);
          const p = s.getScene(t.uuid);
          if (p !== null) {
            const f = p.getObjectByProperty("uuid", t.uuid);
            ie(f, `material.${o}`, m);
          }
        }
      };
    if (Array.isArray(e)) {
      const c = [];
      for (const h in e) {
        const m = e[h], p = `[${h.toString()}]`;
        if (m.value !== void 0) {
          const f = Rt(`${p}.value`, m.value, t, s, o, a);
          f !== void 0 && c.push(f);
        } else {
          const f = Rt(p, m, t, s, o, a);
          f !== void 0 && c.push(f);
        }
      }
      if (c.length > 0)
        return Hi(c), {
          title: r,
          items: c
        };
    } else {
      if (Fr(e))
        return {
          title: r,
          prop: o,
          type: "vector2",
          value: e,
          disabled: a,
          onChange: (c, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const p = m.getObjectByProperty("uuid", t.uuid);
              ie(p, `material.${o}`, h);
            }
          }
        };
      if (zr(e))
        return {
          title: r,
          prop: o,
          type: "grid3",
          value: e,
          disabled: a,
          onChange: (c, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const p = m.getObjectByProperty("uuid", t.uuid);
              ie(p, `material.${o}`, h);
            }
          }
        };
      if (Hr(e))
        return {
          title: r,
          prop: o,
          type: "grid4",
          value: e,
          disabled: a,
          onChange: (c, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const p = m.getObjectByProperty("uuid", t.uuid);
              ie(p, `material.${o}`, h);
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
          onChange: (c, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const p = m.getObjectByProperty("uuid", t.uuid);
              ie(p, `material.${o}`, h);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: r,
          type: "image",
          value: e,
          disabled: a,
          onChange: (c, h) => {
            const m = Pr(i), p = n.length > 0 ? `${n}.${m}` : m;
            s.createTexture(t.uuid, `material.${p}`, h);
            const f = s.getScene(t.uuid);
            if (f !== null) {
              const b = f.getObjectByProperty("uuid", t.uuid);
              if (b !== void 0) {
                const v = (x) => {
                  const g = b.material, y = p.split(".");
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
                h.src.length > 0 ? En(h.src).then((x) => {
                  x.offset.set(h.offset[0], h.offset[1]), x.repeat.set(h.repeat[0], h.repeat[1]), v(x);
                }) : v(null);
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
          onChange: (c, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const p = m.getObjectByProperty("uuid", t.uuid);
              ie(p, `material.${o}`, h);
            }
          }
        };
      {
        const c = [], h = i === "defines" || i === "extensions";
        try {
          for (const m in e) {
            const p = e[m];
            if (p !== void 0)
              if (p.value !== void 0) {
                const f = Rt(`${m}.value`, p.value, t, s, o, h);
                f !== void 0 && c.push(f);
              } else {
                const f = Rt(m, p, t, s, o, h);
                f !== void 0 && c.push(f);
              }
          }
        } catch {
          console.log("Issue cycling through material object:", i, e);
        }
        if (c.length > 0)
          return Hi(c), {
            title: r,
            items: c
          };
      }
    }
  }
}
function Ss(i, e, t) {
  const s = [];
  for (const n in i) {
    if (!Mr(n))
      continue;
    const a = typeof i[n], r = i[n];
    if (a === "boolean")
      s.push(Ur(n, r, e, t));
    else if (a === "number")
      s.push(jr(n, r, e, t));
    else if (a === "string")
      s.push(Nr(n, r, e, t));
    else if (a === "object") {
      const o = Rt(n, r, e, t);
      o !== void 0 && s.push(o);
    } else
      r !== void 0 && console.log("other:", n, a, r);
  }
  return Hi(s), s.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const a = n.getObjectByProperty("uuid", e.uuid);
        ie(a, "material.needsUpdate", !0);
      }
    }
  }), s;
}
function Yr(i, e, t) {
  function s() {
    return `${t.app.appID}_material`;
  }
  const n = localStorage.getItem(s()), a = n !== null ? n === "open" : !1;
  function r(l) {
    localStorage.setItem(s(), l ? "open" : "closed");
  }
  const o = i.material;
  if (Array.isArray(o)) {
    const l = [], c = o.length;
    for (let h = 0; h < c; h++)
      l.push(
        /* @__PURE__ */ u.jsx(
          xe,
          {
            app: e,
            title: `Material ${h}`,
            items: Ss(o[h], i, t)
          },
          `Material ${h}`
        )
      );
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: l });
  } else
    return /* @__PURE__ */ u.jsx(
      xe,
      {
        app: e,
        title: "Material",
        items: Ss(o, i, t),
        expanded: a,
        onToggle: (l) => {
          r(l);
        }
      }
    );
}
const xs = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Br(i) {
  const e = i.step !== void 0 ? i.step : 0.01, t = J(null), s = J(null), n = J(null), a = J(null), r = J(null), [o] = B(i.value), [l, c] = B(i.value.offset[0]), [h, m] = B(i.value.offset[1]), [p, f] = B(i.value.repeat[0]), [b, v] = B(i.value.repeat[1]);
  function x(y, C, w, S, T) {
    if (i.onChange !== void 0) {
      const R = i.prop !== void 0 ? i.prop : i.title;
      i.onChange(R, {
        src: y,
        offset: [C, w],
        repeat: [S, T]
      });
    }
  }
  function g(y) {
    const C = t.current.src, w = y.target.value;
    switch (y.target) {
      case s.current:
        c(w), x(C, w, h, p, b);
        break;
      case n.current:
        m(w), x(C, l, w, p, b);
        break;
      case a.current:
        f(w), x(C, l, h, w, b);
        break;
      case r.current:
        v(w), x(C, l, h, p, w);
        break;
    }
  }
  return /* @__PURE__ */ u.jsxs("div", { className: "imageField", children: [
    /* @__PURE__ */ u.jsx("img", { alt: i.title, ref: t, onClick: () => {
      Ar().then((y) => {
        t.current.src = y, x(y, l, h, p, b);
      });
    }, src: o.src.length > 0 ? o.src : xs }),
    /* @__PURE__ */ u.jsxs("div", { className: "fields", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("label", { children: "Offset:" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: s,
            type: "number",
            value: l,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: n,
            type: "number",
            value: h,
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
            value: p,
            step: e,
            onChange: g
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: r,
            type: "number",
            value: b,
            step: e,
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ u.jsx("button", { onClick: () => {
        x("", l, h, p, b), t.current.src = xs;
      }, children: "Clear" })
    ] })
  ] });
}
function ii(i) {
  let e = i.value;
  e !== void 0 && (e.isColor !== void 0 ? e = ms(i.value) : i.type === "color" && (e = ms(new Je().setStyle(i.value, Ut))));
  const [t, s] = B(e), n = J(null), a = (c) => {
    let h = c.target.value;
    if (i.type === "boolean")
      h = c.target.checked;
    else if (i.type === "option" && (typeof i.value == "number" ? h = Number(h) : typeof i.value == "boolean" ? h = !!h : typeof i.value == "object" && (h = JSON.parse(h)), i.options !== void 0)) {
      const m = i.options.length;
      for (let p = 0; p < m && i.options[p].value !== h; p++)
        ;
    }
    s(h), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, h);
  }, r = {};
  i.disabled && (r.opacity = 0.8);
  const o = i.type === "string" && (t.length > 100 || t.search(`
`) > -1), l = o || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ u.jsxs("div", { className: `field ${l ? "block" : ""}`, style: r, children: [
    i.type !== "button" && /* @__PURE__ */ u.jsx("label", { ref: n, children: ri(i.title) }, "fieldLabel"),
    i.type === "string" && !o && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "text",
        disabled: i.disabled,
        onChange: a,
        value: t
      }
    ),
    i.type === "string" && o && /* @__PURE__ */ u.jsx(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: i.disabled !== void 0 ? i.disabled : !0,
        onChange: a,
        onKeyDown: (c) => {
          i.onKeyDown !== void 0 && i.onKeyDown(c);
        },
        value: t
      }
    ),
    i.type === "boolean" && /* @__PURE__ */ u.jsx(
      "input",
      {
        type: "checkbox",
        disabled: i.disabled,
        onChange: a,
        checked: t
      }
    ),
    i.type === "number" && /* @__PURE__ */ u.jsx(
      Ke,
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
      Ke,
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
      /* @__PURE__ */ u.jsx("input", { type: "text", value: t.toString(), onChange: a, disabled: i.disabled, className: "color" }),
      /* @__PURE__ */ u.jsx("input", { type: "color", value: t, onChange: a, disabled: i.disabled })
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
    i.type === "image" && /* @__PURE__ */ u.jsx(Br, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx("select", { onChange: a, disabled: i.disabled, defaultValue: i.value, children: i.options?.map((c, h) => /* @__PURE__ */ u.jsx("option", { value: c.value, children: ri(c.title) }, h)) }) }),
    i.type === "vector2" && /* @__PURE__ */ u.jsx(wr, { step: i.step, value: t, min: 0, max: 1, onChange: a }),
    i.type === "grid3" && /* @__PURE__ */ u.jsx(ws, { step: i.step, value: t, onChange: a }),
    i.type === "grid4" && /* @__PURE__ */ u.jsx(Or, { step: i.step, value: t, onChange: a }),
    i.type === "euler" && /* @__PURE__ */ u.jsx(ws, { step: i.step, value: t, onChange: a })
  ] });
}
function Vr(i) {
  return "items" in i;
}
class xe extends Nt {
  subgroupNames = [];
  subgroupElements = [];
  valueOverrides = /* @__PURE__ */ new Map();
  app;
  constructor(e) {
    super(e), this.app = e.app, this.state = { lastUpdated: Date.now() };
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
    const s = Be(), n = /* @__PURE__ */ u.jsx(
      xe,
      {
        app: this.app,
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
      if (Vr(t))
        e.push(
          /* @__PURE__ */ u.jsx(xe, { app: this.app, title: ri(t.title), items: t.items }, Math.random())
        );
      else {
        const s = this.valueOverrides.get(t.title), n = s !== void 0 ? s : t.value;
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
    }), this.subgroupElements.forEach((t) => e.push(t)), /* @__PURE__ */ u.jsx(
      oi,
      {
        app: this.app,
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
class Y extends Nt {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  static app;
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, Y.app = e.app, Y.instance = this, Y.app.addEventListener(A.ADD_GROUP, this.addGroup), Y.app.addEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    Y.app.removeEventListener(A.ADD_GROUP, this.addGroup), Y.app.removeEventListener(A.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ u.jsx("div", { className: "customGroups", children: Y.groups }, this.state.lastUpdate);
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
        onChange: (a, r) => {
          this.props.three.updateGroup(t.title, a, r);
        }
      });
    }), Y.groups.push(
      /* @__PURE__ */ u.jsx(
        xe,
        {
          app: Y.app,
          title: t.title,
          items: s
        },
        Math.random()
      )
    ), Y.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, s = Y.groupTitles.length;
    for (let n = 0; n < s; n++)
      if (t === Y.groupTitles[n]) {
        Y.groups.splice(n, 1), Y.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
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
    const s = Be(), n = /* @__PURE__ */ u.jsx(
      xe,
      {
        app: Y.app,
        ref: s,
        title: e.title,
        items: t
      },
      Math.random()
    );
    return Y.groups.push(n), Y.groupsRefs.push(s), Y.groupTitles.push(e.title), s;
  }
  static removeEditorGroup(e) {
    const t = Y.groupTitles.length;
    for (let s = 0; s < t; s++)
      if (e === Y.groupTitles[s]) {
        Y.groups.splice(s, 1), Y.groupTitles.splice(s, 1), Y.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
}
function Ts(i) {
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
function Zr(i, e, t) {
  function s() {
    return `${t.app.appID}_camera`;
  }
  const n = localStorage.getItem(s()), a = n !== null ? n === "open" : !1;
  function r(l) {
    localStorage.setItem(s(), l ? "open" : "closed");
  }
  const o = [];
  if (i.perspectiveCameraInfo !== void 0)
    for (const l in i.perspectiveCameraInfo)
      o.push({
        title: Ts(l),
        prop: l,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[l],
        onChange: (c, h) => {
          t.updateObject(i.uuid, c, h), t.requestMethod(i.uuid, "updateProjectionMatrix");
          const m = t.getScene(i.uuid);
          if (m !== null) {
            const p = m.getObjectByProperty("uuid", i.uuid);
            p !== void 0 && (ie(p, c, h), p.updateProjectionMatrix());
          }
        }
      });
  else if (i.orthographicCameraInfo !== void 0)
    for (const l in i.orthographicCameraInfo)
      o.push({
        title: Ts(l),
        prop: l,
        type: "number",
        step: 0.01,
        value: i.orthographicCameraInfo[l],
        onChange: (c, h) => {
          t.updateObject(i.uuid, c, h), t.requestMethod(i.uuid, "updateProjectionMatrix");
          const m = t.getScene(i.uuid);
          if (m !== null) {
            const p = m.getObjectByProperty("uuid", i.uuid);
            p !== void 0 && (ie(p, c, h), p.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ u.jsx(
    xe,
    {
      app: e,
      title: "Camera",
      items: o,
      expanded: a,
      onToggle: (l) => {
        r(l);
      }
    }
  );
}
class Wr extends Re {
  constructor(e, t) {
    const s = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], n = new gt();
    n.setAttribute("position", new qe(s, 3)), n.computeBoundingSphere();
    const a = new Zi({ fog: !1 });
    super(n, a), this.light = e, this.color = t, this.type = "RectAreaLightHelper";
    const r = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], o = new gt();
    o.setAttribute("position", new qe(r, 3)), o.computeBoundingSphere(), this.add(new M(o, new Qe({ side: qs, fog: !1 })));
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
const Os = { type: "change" }, Xi = { type: "start" }, Sn = { type: "end" }, Zt = new ua(), Ms = new pa(), Gr = Math.cos(70 * ma.DEG2RAD), re = new P(), ve = 2 * Math.PI, Z = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Ci = 1e-6;
class Xr extends un {
  constructor(e, t = null) {
    super(e, t), this.state = Z.NONE, this.enabled = !0, this.target = new P(), this.cursor = new P(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ft.ROTATE, MIDDLE: ft.DOLLY, RIGHT: ft.PAN }, this.touches = { ONE: mt.ROTATE, TWO: mt.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new P(), this._lastQuaternion = new be(), this._lastTargetPosition = new P(), this._quat = new be().setFromUnitVectors(e.up, new P(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ki(), this._sphericalDelta = new ki(), this._scale = 1, this._panOffset = new P(), this._rotateStart = new ue(), this._rotateEnd = new ue(), this._rotateDelta = new ue(), this._panStart = new ue(), this._panEnd = new ue(), this._panDelta = new ue(), this._dollyStart = new ue(), this._dollyEnd = new ue(), this._dollyDelta = new ue(), this._dollyDirection = new P(), this._mouse = new ue(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = qr.bind(this), this._onPointerDown = $r.bind(this), this._onPointerUp = Kr.bind(this), this._onContextMenu = no.bind(this), this._onMouseWheel = eo.bind(this), this._onKeyDown = to.bind(this), this._onTouchStart = io.bind(this), this._onTouchMove = so.bind(this), this._onMouseDown = Qr.bind(this), this._onMouseMove = Jr.bind(this), this._interceptControlDown = ao.bind(this), this._interceptControlUp = ro.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Os), this.update(), this.state = Z.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    re.copy(t).sub(this.target), re.applyQuaternion(this._quat), this._spherical.setFromVector3(re), this.autoRotate && this.state === Z.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let s = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(s) && isFinite(n) && (s < -Math.PI ? s += ve : s > Math.PI && (s -= ve), n < -Math.PI ? n += ve : n > Math.PI && (n -= ve), s <= n ? this._spherical.theta = Math.max(s, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (s + n) / 2 ? Math.max(s, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let a = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), a = r != this._spherical.radius;
    }
    if (re.setFromSpherical(this._spherical), re.applyQuaternion(this._quatInverse), t.copy(this.target).add(re), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const o = re.length();
        r = this._clampDistance(o * this._scale);
        const l = o - r;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), a = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new P(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), a = l !== this.object.zoom;
        const c = new P(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), r = re.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (Zt.origin.copy(this.object.position), Zt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Zt.direction)) < Gr ? this.object.lookAt(this.target) : (Ms.setFromNormalAndCoplanarPoint(this.object.up, this.target), Zt.intersectPlane(Ms, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), a = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, a || this._lastPosition.distanceToSquared(this.object.position) > Ci || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Ci || this._lastTargetPosition.distanceToSquared(this.target) > Ci ? (this.dispatchEvent(Os), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
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
    re.setFromMatrixColumn(t, 0), re.multiplyScalar(-e), this._panOffset.add(re);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? re.setFromMatrixColumn(t, 1) : (re.setFromMatrixColumn(t, 0), re.crossVectors(this.object.up, re)), re.multiplyScalar(e), this._panOffset.add(re);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const s = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      re.copy(n).sub(this.target);
      let a = re.length();
      a *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * a / s.clientHeight, this.object.matrix), this._panUp(2 * t * a / s.clientHeight, this.object.matrix);
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
    const s = this.domElement.getBoundingClientRect(), n = e - s.left, a = t - s.top, r = s.width, o = s.height;
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
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, n = e.pageY - t.y, a = Math.sqrt(s * s + n * n);
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
      const s = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + s.x), a = 0.5 * (e.pageY + s.y);
      this._rotateEnd.set(n, a);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(ve * this._rotateDelta.x / t.clientHeight), this._rotateUp(ve * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    const t = this._getSecondPointerPosition(e), s = e.pageX - t.x, n = e.pageY - t.y, a = Math.sqrt(s * s + n * n);
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
    t === void 0 && (t = new ue(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function $r(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function qr(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Kr(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Sn), this.state = Z.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function Qr(i) {
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
    case ft.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseDownDolly(i), this.state = Z.DOLLY;
      break;
    case ft.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(i), this.state = Z.PAN;
      } else {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(i), this.state = Z.ROTATE;
      }
      break;
    case ft.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1)
          return;
        this._handleMouseDownRotate(i), this.state = Z.ROTATE;
      } else {
        if (this.enablePan === !1)
          return;
        this._handleMouseDownPan(i), this.state = Z.PAN;
      }
      break;
    default:
      this.state = Z.NONE;
  }
  this.state !== Z.NONE && this.dispatchEvent(Xi);
}
function Jr(i) {
  switch (this.state) {
    case Z.ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleMouseMoveRotate(i);
      break;
    case Z.DOLLY:
      if (this.enableZoom === !1)
        return;
      this._handleMouseMoveDolly(i);
      break;
    case Z.PAN:
      if (this.enablePan === !1)
        return;
      this._handleMouseMovePan(i);
      break;
  }
}
function eo(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== Z.NONE || (i.preventDefault(), this.dispatchEvent(Xi), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Sn));
}
function to(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function io(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case mt.ROTATE:
          if (this.enableRotate === !1)
            return;
          this._handleTouchStartRotate(i), this.state = Z.TOUCH_ROTATE;
          break;
        case mt.PAN:
          if (this.enablePan === !1)
            return;
          this._handleTouchStartPan(i), this.state = Z.TOUCH_PAN;
          break;
        default:
          this.state = Z.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case mt.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1)
            return;
          this._handleTouchStartDollyPan(i), this.state = Z.TOUCH_DOLLY_PAN;
          break;
        case mt.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1)
            return;
          this._handleTouchStartDollyRotate(i), this.state = Z.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = Z.NONE;
      }
      break;
    default:
      this.state = Z.NONE;
  }
  this.state !== Z.NONE && this.dispatchEvent(Xi);
}
function so(i) {
  switch (this._trackPointer(i), this.state) {
    case Z.TOUCH_ROTATE:
      if (this.enableRotate === !1)
        return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case Z.TOUCH_PAN:
      if (this.enablePan === !1)
        return;
      this._handleTouchMovePan(i), this.update();
      break;
    case Z.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1)
        return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case Z.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1)
        return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = Z.NONE;
  }
}
function no(i) {
  this.enabled !== !1 && i.preventDefault();
}
function ao(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function ro(i) {
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
}), lt = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function Ve(i) {
  return i.isPerspectiveCamera;
}
function Ye(i) {
  return i.isOrthographicCamera;
}
const ct = Math.PI * 2, Ps = Math.PI / 2, xn = 1e-5, St = Math.PI / 180;
function Oe(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function q(i, e = xn) {
  return Math.abs(i) < e;
}
function H(i, e, t = xn) {
  return q(i - e, t);
}
function As(i, e) {
  return Math.round(i / e) * e;
}
function xt(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Tt(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function Wt(i, e, t, s, n = 1 / 0, a) {
  s = Math.max(1e-4, s);
  const r = 2 / s, o = r * a, l = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let c = i - e;
  const h = e, m = n * s;
  c = Oe(c, -m, m), e = i - c;
  const p = (t.value + r * c) * a;
  t.value = (t.value - r * p) * l;
  let f = e + (c + p) * l;
  return h - i > 0 == f > h && (f = h, t.value = (f - h) / a), f;
}
function Ds(i, e, t, s, n = 1 / 0, a, r) {
  s = Math.max(1e-4, s);
  const o = 2 / s, l = o * a, c = 1 / (1 + l + 0.48 * l * l + 0.235 * l * l * l);
  let h = e.x, m = e.y, p = e.z, f = i.x - h, b = i.y - m, v = i.z - p;
  const x = h, g = m, y = p, C = n * s, w = C * C, S = f * f + b * b + v * v;
  if (S > w) {
    const $ = Math.sqrt(S);
    f = f / $ * C, b = b / $ * C, v = v / $ * C;
  }
  h = i.x - f, m = i.y - b, p = i.z - v;
  const T = (t.x + o * f) * a, R = (t.y + o * b) * a, k = (t.z + o * v) * a;
  t.x = (t.x - o * T) * c, t.y = (t.y - o * R) * c, t.z = (t.z - o * k) * c, r.x = h + (f + T) * c, r.y = m + (b + R) * c, r.z = p + (v + k) * c;
  const D = x - i.x, V = g - i.y, Ce = y - i.z, ge = r.x - x, ae = r.y - g, K = r.z - y;
  return D * ge + V * ae + Ce * K > 0 && (r.x = x, r.y = g, r.z = y, t.x = (r.x - x) / a, t.y = (r.y - g) / a, t.z = (r.z - y) / a), r;
}
function wi(i, e) {
  e.set(0, 0), i.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= i.length, e.y /= i.length;
}
function Si(i, e) {
  return Ye(i) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class oo {
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
    const s = this._listeners[e.type];
    if (s !== void 0) {
      e.target = this;
      const n = s.slice(0);
      for (let a = 0, r = n.length; a < r; a++)
        n[a].call(this, e);
    }
  }
}
var xi;
const lo = "2.9.0", Gt = 1 / 8, co = /Mac/.test((xi = globalThis?.navigator) === null || xi === void 0 ? void 0 : xi.platform);
let I, Rs, Xt, Ti, ye, U, F, ht, Ot, Pe, Ae, Ze, Is, Ls, Se, Mt, dt, ks, Oi, Us, Mi, Pi, $t;
class Le extends oo {
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
    I = e.THREE, Rs = Object.freeze(new I.Vector3(0, 0, 0)), Xt = Object.freeze(new I.Vector3(0, 1, 0)), Ti = Object.freeze(new I.Vector3(0, 0, 1)), ye = new I.Vector2(), U = new I.Vector3(), F = new I.Vector3(), ht = new I.Vector3(), Ot = new I.Vector3(), Pe = new I.Vector3(), Ae = new I.Vector3(), Ze = new I.Vector3(), Is = new I.Vector3(), Ls = new I.Vector3(), Se = new I.Spherical(), Mt = new I.Spherical(), dt = new I.Box3(), ks = new I.Box3(), Oi = new I.Sphere(), Us = new I.Quaternion(), Mi = new I.Quaternion(), Pi = new I.Matrix4(), $t = new I.Raycaster();
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
    }, this._enabled = !0, this._state = _.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = lt.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new I.Vector3(), this._focalOffsetVelocity = new I.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (g, y, C) => {
      let w, S;
      if (Ve(this._camera)) {
        const T = U.copy(this._camera.position).sub(this._target), R = this._camera.getEffectiveFOV() * St, k = T.length() * Math.tan(R * 0.5);
        w = this.truckSpeed * g * k / this._elementRect.height, S = this.truckSpeed * y * k / this._elementRect.height;
      } else if (Ye(this._camera)) {
        const T = this._camera;
        w = g * (T.right - T.left) / T.zoom / this._elementRect.width, S = y * (T.top - T.bottom) / T.zoom / this._elementRect.height;
      } else
        return;
      this.verticalDragToForward ? (C ? this.setFocalOffset(this._focalOffsetEnd.x + w, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(w, 0, !0), this.forward(-S, !0)) : C ? this.setFocalOffset(this._focalOffsetEnd.x + w, this._focalOffsetEnd.y + S, this._focalOffsetEnd.z, !0) : this.truck(w, S, !0);
    }, this._rotateInternal = (g, y) => {
      const C = ct * this.azimuthRotateSpeed * g / this._elementRect.height, w = ct * this.polarRotateSpeed * y / this._elementRect.height;
      this.rotate(C, w, !0);
    }, this._dollyInternal = (g, y, C) => {
      const w = Math.pow(0.95, -g * this.dollySpeed), S = this._sphericalEnd.radius, T = this._sphericalEnd.radius * w, R = Oe(T, this.minDistance, this.maxDistance), k = R - T;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(T, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(k, !0), this._dollyToNoClamp(R, !0)) : this._dollyToNoClamp(R, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? T : R) - S, this._dollyControlCoord.set(y, C)), this._lastDollyDirection = Math.sign(-g);
    }, this._zoomInternal = (g, y, C) => {
      const w = Math.pow(0.95, g * this.dollySpeed), S = this._zoom, T = this._zoom * w;
      this.zoomTo(T, !0), this.dollyToCursor && (this._changedZoom += T - S, this._dollyControlCoord.set(y, C));
    }, typeof I > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new I.Quaternion().setFromUnitVectors(this._camera.up, Xt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = _.NONE, this._target = new I.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new I.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new I.Spherical().setFromVector3(U.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new I.Vector3(),
      new I.Vector3(),
      new I.Vector3(),
      new I.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new I.Box3(new I.Vector3(-1 / 0, -1 / 0, -1 / 0), new I.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new I.Vector2(), this.mouseButtons = {
      left: _.ROTATE,
      middle: _.DOLLY,
      right: _.TRUCK,
      wheel: Ve(this._camera) ? _.DOLLY : Ye(this._camera) ? _.ZOOM : _.NONE
    }, this.touches = {
      one: _.TOUCH_ROTATE,
      two: Ve(this._camera) ? _.TOUCH_DOLLY_TRUCK : Ye(this._camera) ? _.TOUCH_ZOOM_TRUCK : _.NONE,
      three: _.TOUCH_TRUCK
    };
    const s = new I.Vector2(), n = new I.Vector2(), a = new I.Vector2(), r = (g) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const w = this._domElement.getBoundingClientRect(), S = g.clientX / w.width, T = g.clientY / w.height;
        if (S < this._interactiveArea.left || S > this._interactiveArea.right || T < this._interactiveArea.top || T > this._interactiveArea.bottom)
          return;
      }
      const y = g.pointerType !== "mouse" ? null : (g.buttons & ee.LEFT) === ee.LEFT ? ee.LEFT : (g.buttons & ee.MIDDLE) === ee.MIDDLE ? ee.MIDDLE : (g.buttons & ee.RIGHT) === ee.RIGHT ? ee.RIGHT : null;
      if (y !== null) {
        const w = this._findPointerByMouseButton(y);
        w && this._disposePointer(w);
      }
      if ((g.buttons & ee.LEFT) === ee.LEFT && this._lockedPointer)
        return;
      const C = {
        pointerId: g.pointerId,
        clientX: g.clientX,
        clientY: g.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: y
      };
      this._activePointers.push(C), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", l), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", l), this._isDragging = !0, p(g);
    }, o = (g) => {
      g.cancelable && g.preventDefault();
      const y = g.pointerId, C = this._lockedPointer || this._findPointerById(y);
      if (C) {
        if (C.clientX = g.clientX, C.clientY = g.clientY, C.deltaX = g.movementX, C.deltaY = g.movementY, this._state = 0, g.pointerType === "touch")
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
    }, l = (g) => {
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
        b();
      }
    };
    let c = -1;
    const h = (g) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === _.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const T = this._domElement.getBoundingClientRect(), R = g.clientX / T.width, k = g.clientY / T.height;
        if (R < this._interactiveArea.left || R > this._interactiveArea.right || k < this._interactiveArea.top || k > this._interactiveArea.bottom)
          return;
      }
      if (g.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === _.ROTATE || this.mouseButtons.wheel === _.TRUCK) {
        const T = performance.now();
        c - T < 1e3 && this._getClientRect(this._elementRect), c = T;
      }
      const y = co ? -1 : -3, C = g.deltaMode === 1 ? g.deltaY / y : g.deltaY / (y * 10), w = this.dollyToCursor ? (g.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, S = this.dollyToCursor ? (g.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
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
          this._dollyInternal(-C, w, S), this._isUserControllingDolly = !0;
          break;
        }
        case _.ZOOM: {
          this._zoomInternal(-C, w, S), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, m = (g) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === Le.ACTION.NONE) {
          const y = g instanceof PointerEvent ? g.pointerId : 0, C = this._findPointerById(y);
          C && this._disposePointer(C), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", l);
          return;
        }
        g.preventDefault();
      }
    }, p = (g) => {
      if (!this._enabled)
        return;
      if (wi(this._activePointers, ye), this._getClientRect(this._elementRect), s.copy(ye), n.copy(ye), this._activePointers.length >= 2) {
        const C = ye.x - this._activePointers[1].clientX, w = ye.y - this._activePointers[1].clientY, S = Math.sqrt(C * C + w * w);
        a.set(0, S);
        const T = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, R = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(T, R);
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
      this._dragNeedsUpdate = !1, wi(this._activePointers, ye);
      const y = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, C = y ? -y.deltaX : n.x - ye.x, w = y ? -y.deltaY : n.y - ye.y;
      if (n.copy(ye), ((this._state & _.ROTATE) === _.ROTATE || (this._state & _.TOUCH_ROTATE) === _.TOUCH_ROTATE || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(C, w), this._isUserControllingRotate = !0), (this._state & _.DOLLY) === _.DOLLY || (this._state & _.ZOOM) === _.ZOOM) {
        const S = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, T = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, R = this.dollyDragInverted ? -1 : 1;
        (this._state & _.DOLLY) === _.DOLLY ? (this._dollyInternal(R * w * Gt, S, T), this._isUserControllingDolly = !0) : (this._zoomInternal(R * w * Gt, S, T), this._isUserControllingZoom = !0);
      }
      if ((this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_ZOOM) === _.TOUCH_ZOOM || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_ZOOM_ROTATE) === _.TOUCH_ZOOM_ROTATE) {
        const S = ye.x - this._activePointers[1].clientX, T = ye.y - this._activePointers[1].clientY, R = Math.sqrt(S * S + T * T), k = a.y - R;
        a.set(0, R);
        const D = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, V = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & _.TOUCH_DOLLY) === _.TOUCH_DOLLY || (this._state & _.TOUCH_DOLLY_ROTATE) === _.TOUCH_DOLLY_ROTATE || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(k * Gt, D, V), this._isUserControllingDolly = !0) : (this._zoomInternal(k * Gt, D, V), this._isUserControllingZoom = !0);
      }
      ((this._state & _.TRUCK) === _.TRUCK || (this._state & _.TOUCH_TRUCK) === _.TOUCH_TRUCK || (this._state & _.TOUCH_DOLLY_TRUCK) === _.TOUCH_DOLLY_TRUCK || (this._state & _.TOUCH_ZOOM_TRUCK) === _.TOUCH_ZOOM_TRUCK) && (this._truckInternal(C, w, !1), this._isUserControllingTruck = !0), ((this._state & _.OFFSET) === _.OFFSET || (this._state & _.TOUCH_OFFSET) === _.TOUCH_OFFSET || (this._state & _.TOUCH_DOLLY_OFFSET) === _.TOUCH_DOLLY_OFFSET || (this._state & _.TOUCH_ZOOM_OFFSET) === _.TOUCH_ZOOM_OFFSET) && (this._truckInternal(C, w, !0), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, b = () => {
      wi(this._activePointers, ye), n.copy(ye), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", l), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", l), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", v), this._domElement.ownerDocument.addEventListener("pointerlockerror", x), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", l), p());
    }, this.unlockPointer = () => {
      var g, y, C;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (g = this._domElement) === null || g === void 0 || g.ownerDocument.exitPointerLock(), (y = this._domElement) === null || y === void 0 || y.ownerDocument.removeEventListener("pointerlockchange", v), (C = this._domElement) === null || C === void 0 || C.ownerDocument.removeEventListener("pointerlockerror", x), this.cancel();
    };
    const v = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, x = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (g) => {
      this._domElement = g, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", r), this._domElement.addEventListener("pointercancel", l), this._domElement.addEventListener("wheel", h, { passive: !1 }), this._domElement.addEventListener("contextmenu", m);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", r), this._domElement.removeEventListener("pointercancel", l), this._domElement.removeEventListener("wheel", h, { passive: !1 }), this._domElement.removeEventListener("contextmenu", m), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", l), this._domElement.ownerDocument.removeEventListener("pointerlockchange", v), this._domElement.ownerDocument.removeEventListener("pointerlockerror", x));
    }, this.cancel = () => {
      this._state !== _.NONE && (this._state = _.NONE, this._activePointers.length = 0, b());
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
    this._interactiveArea.width = Oe(e.width, 0, 1), this._interactiveArea.height = Oe(e.height, 0, 1), this._interactiveArea.x = Oe(e.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = Oe(e.y, 0, 1 - this._interactiveArea.height);
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
    const n = Oe(e, this.minAzimuthAngle, this.maxAzimuthAngle), a = Oe(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = a, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, s || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const r = !s || H(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && H(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
    return this._isUserControllingDolly = !1, this._lastDollyDirection = lt.NONE, this._changedDolly = 0, this._dollyToNoClamp(Oe(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const s = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const r = this._collisionTest(), o = H(r, this._spherical.radius);
      if (!(s > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, r);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const a = !t || H(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    this._targetEnd.add(this._getCameraDirection(Ot).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
    const s = !t || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold);
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
    this._isUserControllingZoom = !1, this._zoomEnd = Oe(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, t || (this._zoom = this._zoomEnd);
    const s = !t || H(this._zoom, this._zoomEnd, this.restThreshold);
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
    this._camera.updateMatrix(), Pe.setFromMatrixColumn(this._camera.matrix, 0), Ae.setFromMatrixColumn(this._camera.matrix, 1), Pe.multiplyScalar(e), Ae.multiplyScalar(-t);
    const n = U.copy(Pe).add(Ae), a = F.copy(this._targetEnd).add(n);
    return this.moveTo(a.x, a.y, a.z, s);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    U.setFromMatrixColumn(this._camera.matrix, 0), U.crossVectors(this._camera.up, U), U.multiplyScalar(e);
    const s = F.copy(this._targetEnd).add(U);
    return this.moveTo(s.x, s.y, s.z, t);
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
  moveTo(e, t, s, n = !1) {
    this._isUserControllingTruck = !1;
    const a = U.set(e, t, s).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, a, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const r = !n || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold);
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
  lookInDirectionOf(e, t, s, n = !1) {
    const o = U.set(e, t, s).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
  fitToBox(e, t, { cover: s = !1, paddingLeft: n = 0, paddingRight: a = 0, paddingBottom: r = 0, paddingTop: o = 0 } = {}) {
    const l = [], c = e.isBox3 ? dt.copy(e) : dt.setFromObject(e);
    c.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const h = As(this._sphericalEnd.theta, Ps), m = As(this._sphericalEnd.phi, Ps);
    l.push(this.rotateTo(h, m, t));
    const p = U.setFromSpherical(this._sphericalEnd).normalize(), f = Us.setFromUnitVectors(p, Ti), b = H(Math.abs(p.y), 1);
    b && f.multiply(Mi.setFromAxisAngle(Xt, h)), f.multiply(this._yAxisUpSpaceInverse);
    const v = ks.makeEmpty();
    F.copy(c.min).applyQuaternion(f), v.expandByPoint(F), F.copy(c.min).setX(c.max.x).applyQuaternion(f), v.expandByPoint(F), F.copy(c.min).setY(c.max.y).applyQuaternion(f), v.expandByPoint(F), F.copy(c.max).setZ(c.min.z).applyQuaternion(f), v.expandByPoint(F), F.copy(c.min).setZ(c.max.z).applyQuaternion(f), v.expandByPoint(F), F.copy(c.max).setY(c.min.y).applyQuaternion(f), v.expandByPoint(F), F.copy(c.max).setX(c.min.x).applyQuaternion(f), v.expandByPoint(F), F.copy(c.max).applyQuaternion(f), v.expandByPoint(F), v.min.x -= n, v.min.y -= r, v.max.x += a, v.max.y += o, f.setFromUnitVectors(Ti, p), b && f.premultiply(Mi.invert()), f.premultiply(this._yAxisUpSpace);
    const x = v.getSize(U), g = v.getCenter(F).applyQuaternion(f);
    if (Ve(this._camera)) {
      const y = this.getDistanceToFitBox(x.x, x.y, x.z, s);
      l.push(this.moveTo(g.x, g.y, g.z, t)), l.push(this.dollyTo(y, t)), l.push(this.setFocalOffset(0, 0, 0, t));
    } else if (Ye(this._camera)) {
      const y = this._camera, C = y.right - y.left, w = y.top - y.bottom, S = s ? Math.max(C / x.x, w / x.y) : Math.min(C / x.x, w / x.y);
      l.push(this.moveTo(g.x, g.y, g.z, t)), l.push(this.zoomTo(S, t)), l.push(this.setFocalOffset(0, 0, 0, t));
    }
    return Promise.all(l);
  }
  /**
   * Fit the viewport to the sphere or the bounding sphere of the object.
   * @param sphereOrMesh
   * @param enableTransition
   * @category Methods
   */
  fitToSphere(e, t) {
    const s = [], a = "isObject3D" in e ? Le.createBoundingSphere(e, Oi) : Oi.copy(e);
    if (s.push(this.moveTo(a.center.x, a.center.y, a.center.z, t)), Ve(this._camera)) {
      const r = this.getDistanceToFitSphere(a.radius);
      s.push(this.dollyTo(r, t));
    } else if (Ye(this._camera)) {
      const r = this._camera.right - this._camera.left, o = this._camera.top - this._camera.bottom, l = 2 * a.radius, c = Math.min(r / l, o / l);
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
  setLookAt(e, t, s, n, a, r, o = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = lt.NONE, this._changedDolly = 0;
    const l = F.set(n, a, r), c = U.set(e, t, s);
    this._targetEnd.copy(l), this._sphericalEnd.setFromVector3(c.sub(l).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const h = !o || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold) && H(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && H(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && H(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(h);
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
  lerpLookAt(e, t, s, n, a, r, o, l, c, h, m, p, f, b = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = lt.NONE, this._changedDolly = 0;
    const v = U.set(n, a, r), x = F.set(e, t, s);
    Se.setFromVector3(x.sub(v).applyQuaternion(this._yAxisUpSpace));
    const g = ht.set(h, m, p), y = F.set(o, l, c);
    Mt.setFromVector3(y.sub(g).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(v.lerp(g, f));
    const C = Mt.theta - Se.theta, w = Mt.phi - Se.phi, S = Mt.radius - Se.radius;
    this._sphericalEnd.set(Se.radius + S * f, Se.phi + w * f, Se.theta + C * f), this.normalizeRotations(), this._needsUpdate = !0, b || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const T = !b || H(this._target.x, this._targetEnd.x, this.restThreshold) && H(this._target.y, this._targetEnd.y, this.restThreshold) && H(this._target.z, this._targetEnd.z, this.restThreshold) && H(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && H(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && H(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(T);
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
    const a = this.getPosition(U), r = this.setLookAt(a.x, a.y, a.z, e, t, s, n);
    return this._sphericalEnd.phi = Oe(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), r;
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
    const a = !n || H(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && H(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && H(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
  setOrbitPoint(e, t, s) {
    this._camera.updateMatrixWorld(), Pe.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), Ae.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), Ze.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = U.set(e, t, s), a = n.distanceTo(this._camera.position), r = n.sub(this._camera.position);
    Pe.multiplyScalar(r.x), Ae.multiplyScalar(r.y), Ze.multiplyScalar(r.z), U.copy(Pe).add(Ae).add(Ze), U.z = U.z + a, this.dollyTo(a, !1), this.setFocalOffset(-U.x, U.y, -U.z, !1), this.moveTo(e, t, s, !1);
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
    this._viewport = this._viewport || new I.Vector4(), typeof e == "number" ? this._viewport.set(e, t, s, n) : this._viewport.copy(e);
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
    if (Si(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const a = e / t, r = this._camera.getEffectiveFOV() * St, o = this._camera.aspect;
    return ((n ? a > o : a < o) ? t : e / o) * 0.5 / Math.tan(r * 0.5) + s * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (Si(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * St, s = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : s;
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
      const s = this.getPosition(U);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, Xt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = U.subVectors(this._target, this._camera.position).normalize(), t = F.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const s = this.getPosition(U);
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
    const t = this._sphericalEnd.theta - this._spherical.theta, s = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, a = Is.subVectors(this._targetEnd, this._target), r = Ls.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (q(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const m = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = Wt(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, m, 1 / 0, e), this._needsUpdate = !0;
    }
    if (q(s))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const m = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = Wt(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, m, 1 / 0, e), this._needsUpdate = !0;
    }
    if (q(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const m = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = Wt(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, m, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (q(a.x) && q(a.y) && q(a.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const m = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      Ds(this._target, this._targetEnd, this._targetVelocity, m, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (q(r.x) && q(r.y) && q(r.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const m = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      Ds(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, m, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (q(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const m = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = Wt(this._zoom, this._zoomEnd, this._zoomVelocity, m, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (Ve(this._camera) && this._changedDolly !== 0) {
        const m = this._spherical.radius - this._lastDistance, p = this._camera, f = this._getCameraDirection(Ot), b = U.copy(f).cross(p.up).normalize();
        b.lengthSq() === 0 && (b.x = 1);
        const v = F.crossVectors(b, f), x = this._sphericalEnd.radius * Math.tan(p.getEffectiveFOV() * St * 0.5), y = (this._sphericalEnd.radius - m - this._sphericalEnd.radius) / this._sphericalEnd.radius, C = ht.copy(this._targetEnd).add(b.multiplyScalar(this._dollyControlCoord.x * x * p.aspect)).add(v.multiplyScalar(this._dollyControlCoord.y * x)), w = U.copy(this._targetEnd).lerp(C, y), S = this._lastDollyDirection === lt.IN && this._spherical.radius <= this.minDistance, T = this._lastDollyDirection === lt.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (S || T)) {
          this._sphericalEnd.radius -= m, this._spherical.radius -= m;
          const k = F.copy(f).multiplyScalar(-m);
          w.add(k);
        }
        this._boundary.clampPoint(w, w);
        const R = F.subVectors(w, this._targetEnd);
        this._targetEnd.copy(w), this._target.add(R), this._changedDolly -= m, q(this._changedDolly) && (this._changedDolly = 0);
      } else if (Ye(this._camera) && this._changedZoom !== 0) {
        const m = this._zoom - this._lastZoom, p = this._camera, f = U.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (p.near + p.far) / (p.near - p.far)).unproject(p), b = F.set(0, 0, -1).applyQuaternion(p.quaternion), v = ht.copy(f).add(b.multiplyScalar(-f.dot(p.up))), g = -(this._zoom - m - this._zoom) / this._zoom, y = this._getCameraDirection(Ot), C = this._targetEnd.dot(y), w = U.copy(this._targetEnd).lerp(v, g), S = w.dot(y), T = y.multiplyScalar(S - C);
        w.sub(T), this._boundary.clampPoint(w, w);
        const R = F.subVectors(w, this._targetEnd);
        this._targetEnd.copy(w), this._target.add(R), this._changedZoom -= m, q(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const l = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, l), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!q(this._focalOffset.x) || !q(this._focalOffset.y) || !q(this._focalOffset.z)) && (this._camera.updateMatrixWorld(), Pe.setFromMatrixColumn(this._camera.matrix, 0), Ae.setFromMatrixColumn(this._camera.matrix, 1), Ze.setFromMatrixColumn(this._camera.matrix, 2), Pe.multiplyScalar(this._focalOffset.x), Ae.multiplyScalar(-this._focalOffset.y), Ze.multiplyScalar(this._focalOffset.z), U.copy(Pe).add(Ae).add(Ze), this._camera.position.add(U)), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), U.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const h = this._needsUpdate;
    return h && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : h ? (this.dispatchEvent({ type: "update" }), q(t, this.restThreshold) && q(s, this.restThreshold) && q(n, this.restThreshold) && q(a.x, this.restThreshold) && q(a.y, this.restThreshold) && q(a.z, this.restThreshold) && q(r.x, this.restThreshold) && q(r.y, this.restThreshold) && q(r.z, this.restThreshold) && q(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !h && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = h, this._needsUpdate = !1, h;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: xt(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: xt(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: xt(this.maxPolarAngle),
      minAzimuthAngle: xt(this.minAzimuthAngle),
      maxAzimuthAngle: xt(this.maxAzimuthAngle),
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
    const s = JSON.parse(e);
    this.enabled = s.enabled, this.minDistance = s.minDistance, this.maxDistance = Tt(s.maxDistance), this.minZoom = s.minZoom, this.maxZoom = Tt(s.maxZoom), this.minPolarAngle = s.minPolarAngle, this.maxPolarAngle = Tt(s.maxPolarAngle), this.minAzimuthAngle = Tt(s.minAzimuthAngle), this.maxAzimuthAngle = Tt(s.maxAzimuthAngle), this.smoothTime = s.smoothTime, this.draggingSmoothTime = s.draggingSmoothTime, this.dollySpeed = s.dollySpeed, this.truckSpeed = s.truckSpeed, this.dollyToCursor = s.dollyToCursor, this.verticalDragToForward = s.verticalDragToForward, this._target0.fromArray(s.target0), this._position0.fromArray(s.position0), this._zoom0 = s.zoom0, this._focalOffset0.fromArray(s.focalOffset0), this.moveTo(s.target[0], s.target[1], s.target[2], t), Se.setFromVector3(U.fromArray(s.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(Se.theta, Se.phi, t), this.dollyTo(Se.radius, t), this.zoomTo(s.zoom, t), this.setFocalOffset(s.focalOffset[0], s.focalOffset[1], s.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", lo), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const a = F.copy(t).add(e), o = this._boundary.clampPoint(a, ht).sub(a), l = o.lengthSq();
    if (l === 0)
      return e.add(t);
    if (l === n)
      return e;
    if (s === 0)
      return e.add(t).add(o);
    {
      const c = 1 + s * l / t.dot(o);
      return e.add(F.copy(t).multiplyScalar(c)).add(o.multiplyScalar(1 - s));
    }
  }
  _updateNearPlaneCorners() {
    if (Ve(this._camera)) {
      const e = this._camera, t = e.near, s = e.getEffectiveFOV() * St, n = Math.tan(s * 0.5) * t, a = n * e.aspect;
      this._nearPlaneCorners[0].set(-a, -n, 0), this._nearPlaneCorners[1].set(a, -n, 0), this._nearPlaneCorners[2].set(a, n, 0), this._nearPlaneCorners[3].set(-a, n, 0);
    } else if (Ye(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, s = e.left * t, n = e.right * t, a = e.top * t, r = e.bottom * t;
      this._nearPlaneCorners[0].set(s, a, 0), this._nearPlaneCorners[1].set(n, a, 0), this._nearPlaneCorners[2].set(n, r, 0), this._nearPlaneCorners[3].set(s, r, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || Si(this._camera, "_collisionTest"))
      return e;
    const s = this._getTargetDirection(Ot);
    Pi.lookAt(Rs, s, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const a = F.copy(this._nearPlaneCorners[n]);
      a.applyMatrix4(Pi);
      const r = ht.addVectors(this._target, a);
      $t.set(r, s), $t.far = this._spherical.radius + 1;
      const o = $t.intersectObjects(this.colliderMeshes);
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
  static createBoundingSphere(e, t = new I.Sphere()) {
    const s = t, n = s.center;
    dt.makeEmpty(), e.traverseVisible((r) => {
      r.isMesh && dt.expandByObject(r);
    }), dt.getCenter(n);
    let a = 0;
    return e.traverseVisible((r) => {
      if (!r.isMesh)
        return;
      const o = r, l = o.geometry.clone();
      l.applyMatrix4(o.matrixWorld);
      const h = l.attributes.position;
      for (let m = 0, p = h.count; m < p; m++)
        U.fromBufferAttribute(h, m), a = Math.max(a, n.distanceToSquared(U));
    }), s.radius = Math.sqrt(a), s;
  }
}
const li = (i) => {
  const [e, t] = B(i.options[i.index]), s = () => {
    i.onToggle(!i.open);
  }, n = (a) => {
    a !== e && (i.onSelect(a), t(a)), i.onToggle(!1);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ u.jsx("div", { className: "dropdown-toggle", onClick: s, children: `${i.title}: ${e}` }),
    i.open && /* @__PURE__ */ u.jsx("ul", { className: "dropdown-menu", children: i.options.map((a) => /* @__PURE__ */ u.jsx("li", { onClick: () => n(a), children: a }, a)) })
  ] });
}, We = Na(function(e, t) {
  const s = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, a] = B("Renderer"), [r, o] = B(!1), [l, c] = B(!1), [h, m] = B(!1);
  return /* @__PURE__ */ u.jsxs("div", { className: `CameraWindow ${e.name}`, children: [
    /* @__PURE__ */ u.jsx("div", { ref: t, className: "clickable", onClick: () => {
      h && m(!1);
    } }),
    /* @__PURE__ */ u.jsxs("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ u.jsx(
        li,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: h,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (p) => {
            m(p);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ u.jsx(
        li,
        {
          title: "Mode",
          index: s.indexOf(n),
          open: l,
          options: s,
          onSelect: (p) => {
            if (p === n)
              return;
            const f = p;
            e.onSelectRenderMode(f), a(f);
          },
          onToggle: (p) => {
            r && o(!1), c(p);
          },
          up: !0
        }
      )
    ] })
  ] });
}), ho = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, uo = `out vec4 fragColor;
in vec3 worldPosition;
uniform float uDivisions;
uniform float uScale;
uniform vec3 uColor;
uniform float uDistance;
uniform float uGridOpacity;
uniform float uSubgridOpacity;

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
  float cameraDistanceToGridPlane = max(200.0, distance(cameraPosition.y, worldPosition.y));
  float cameraDistanceToFragmentOnGridPlane = distance(cameraPosition.xyz, worldPosition.xyz);

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
}`;
class po extends pn {
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
          value: e?.color !== void 0 ? e?.color : new Je(16777215)
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
      glslVersion: fa,
      side: Vi,
      transparent: !0,
      name: "InfiniteGrid",
      vertexShader: ho,
      fragmentShader: uo
    });
  }
}
class mo extends M {
  gridMaterial;
  constructor(e) {
    const t = new po(e);
    super(new mn(), t), this.gridMaterial = t, this.frustumCulled = !1, this.name = "InfiniteGridHelper";
  }
  update() {
    this.gridMaterial.needsUpdate = !0;
  }
}
function js(i) {
  const [e, t] = B(i.selected), s = "toggle" + (e ? " selected" : "");
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
const fo = `#include <common>
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
}`, go = `
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
}`;
class _o extends pn {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      vertexShader: fo,
      fragmentShader: go
    });
  }
}
const Ge = new ni(), de = new P(), He = new P(), Q = new be(), Ns = {
  X: new P(1, 0, 0),
  Y: new P(0, 1, 0),
  Z: new P(0, 0, 1)
}, Ai = { type: "change" }, Fs = { type: "mouseDown", mode: null }, zs = { type: "mouseUp", mode: null }, Hs = { type: "objectChange" };
class vo extends un {
  constructor(e, t = null) {
    super(void 0, t);
    const s = new So(this);
    this._root = s;
    const n = new xo();
    this._gizmo = n, s.add(n);
    const a = new To();
    this._plane = a, s.add(a);
    const r = this;
    function o(C, w) {
      let S = w;
      Object.defineProperty(r, C, {
        get: function() {
          return S !== void 0 ? S : w;
        },
        set: function(T) {
          S !== T && (S = T, a[C] = T, n[C] = T, r.dispatchEvent({ type: C + "-changed", value: T }), r.dispatchEvent(Ai));
        }
      }), r[C] = w, a[C] = w, n[C] = w;
    }
    o("camera", e), o("object", void 0), o("enabled", !0), o("axis", null), o("mode", "translate"), o("translationSnap", null), o("rotationSnap", null), o("scaleSnap", null), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const l = new P(), c = new P(), h = new be(), m = new be(), p = new P(), f = new be(), b = new P(), v = new P(), x = new P(), g = 0, y = new P();
    o("worldPosition", l), o("worldPositionStart", c), o("worldQuaternion", h), o("worldQuaternionStart", m), o("cameraPosition", p), o("cameraQuaternion", f), o("pointStart", b), o("pointEnd", v), o("rotationAxis", x), o("rotationAngle", g), o("eye", y), this._offset = new P(), this._startNorm = new P(), this._endNorm = new P(), this._cameraScale = new P(), this._parentPosition = new P(), this._parentQuaternion = new be(), this._parentQuaternionInv = new be(), this._parentScale = new P(), this._worldScaleStart = new P(), this._worldQuaternionInv = new be(), this._worldScale = new P(), this._positionStart = new P(), this._quaternionStart = new be(), this._scaleStart = new P(), this._getPointer = yo.bind(this), this._onPointerDown = bo.bind(this), this._onPointerHover = Eo.bind(this), this._onPointerMove = Co.bind(this), this._onPointerUp = wo.bind(this), t !== null && this.connect();
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
    e !== null && Ge.setFromCamera(e, this.camera);
    const t = Di(this._gizmo.picker[this.mode], Ge);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && Ge.setFromCamera(e, this.camera);
      const t = Di(this._plane, Ge, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, Fs.mode = this.mode, this.dispatchEvent(Fs);
    }
  }
  pointerMove(e) {
    const t = this.axis, s = this.mode, n = this.object;
    let a = this.space;
    if (s === "scale" ? a = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (a = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1)
      return;
    e !== null && Ge.setFromCamera(e, this.camera);
    const r = Di(this._plane, Ge, !0);
    if (r) {
      if (this.pointEnd.copy(r.point).sub(this.worldPositionStart), s === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), a === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), a === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (a === "local" && (n.position.applyQuaternion(Q.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), a === "world" && (n.parent && n.position.add(de.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(de.setFromMatrixPosition(n.parent.matrixWorld))));
      else if (s === "scale") {
        if (t.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), He.set(o, o, o);
        } else
          de.copy(this.pointStart), He.copy(this.pointEnd), de.applyQuaternion(this._worldQuaternionInv), He.applyQuaternion(this._worldQuaternionInv), He.divide(de), t.search("X") === -1 && (He.x = 1), t.search("Y") === -1 && (He.y = 1), t.search("Z") === -1 && (He.z = 1);
        n.scale.copy(this._scaleStart).multiply(He), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (s === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(de.setFromMatrixPosition(this.camera.matrixWorld));
        let l = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(de.copy(this.rotationAxis).cross(this.eye)) * o) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(Ns[t]), de.copy(Ns[t]), a === "local" && de.applyQuaternion(this.worldQuaternion), de.cross(this.eye), de.length() === 0 ? l = !0 : this.rotationAngle = this._offset.dot(de.normalize()) * o), (t === "E" || l) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), a === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(Q.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(Q.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(Ai), this.dispatchEvent(Hs);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (zs.mode = this.mode, this.dispatchEvent(zs)), this.dragging = !1, this.axis = null);
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
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(Ai), this.dispatchEvent(Hs), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return Ge;
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
function yo(i) {
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
function Eo(i) {
  if (this.enabled)
    switch (i.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(i));
        break;
    }
}
function bo(i) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(i)), this.pointerDown(this._getPointer(i)));
}
function Co(i) {
  this.enabled && this.pointerMove(this._getPointer(i));
}
function wo(i) {
  this.enabled && (this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(i)));
}
function Di(i, e, t) {
  const s = e.intersectObject(i, !0);
  for (let n = 0; n < s.length; n++)
    if (s[n].object.visible || t)
      return s[n];
  return !1;
}
const qt = new fn(), X = new P(0, 1, 0), Ys = new P(0, 0, 0), Bs = new ci(), Kt = new be(), si = new be(), De = new P(), Vs = new ci(), It = new P(1, 0, 0), $e = new P(0, 1, 0), Lt = new P(0, 0, 1), Qt = new P(), Pt = new P(), At = new P();
class So extends _t {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
}
class xo extends _t {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new Qe({
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
    const a = e.clone();
    a.color.setHex(16711680);
    const r = e.clone();
    r.color.setHex(65280);
    const o = e.clone();
    o.color.setHex(255);
    const l = e.clone();
    l.color.setHex(16711680), l.opacity = 0.5;
    const c = e.clone();
    c.color.setHex(65280), c.opacity = 0.5;
    const h = e.clone();
    h.color.setHex(255), h.opacity = 0.5;
    const m = e.clone();
    m.opacity = 0.25;
    const p = e.clone();
    p.color.setHex(16776960), p.opacity = 0.25, e.clone().color.setHex(16776960);
    const b = e.clone();
    b.color.setHex(7895160);
    const v = new _e(0, 0.04, 0.1, 12);
    v.translate(0, 0.05, 0);
    const x = new he(0.08, 0.08, 0.08);
    x.translate(0, 0.04, 0);
    const g = new gt();
    g.setAttribute("position", new qe([0, 0, 0, 1, 0, 0], 3));
    const y = new _e(75e-4, 75e-4, 0.5, 3);
    y.translate(0, 0.25, 0);
    function C($, ke) {
      const ce = new Et($, 75e-4, 3, 64, ke * Math.PI * 2);
      return ce.rotateY(Math.PI / 2), ce.rotateX(Math.PI / 2), ce;
    }
    function w() {
      const $ = new gt();
      return $.setAttribute("position", new qe([0, 0, 0, 1, 1, 1], 3)), $;
    }
    const S = {
      X: [
        [new M(v, a), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(v, a), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new M(y, a), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new M(v, r), [0, 0.5, 0]],
        [new M(v, r), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new M(y, r)]
      ],
      Z: [
        [new M(v, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new M(v, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new M(y, o), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new Vt(0.1, 0), m.clone()), [0, 0, 0]]
      ],
      XY: [
        [new M(new he(0.15, 0.15, 0.01), h.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new he(0.15, 0.15, 0.01), l.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new he(0.15, 0.15, 0.01), c.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, T = {
      X: [
        [new M(new _e(0.2, 0, 0.6, 4), s), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(new _e(0.2, 0, 0.6, 4), s), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, 0.3, 0]],
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new Vt(0.2, 0), s)]
      ],
      XY: [
        [new M(new he(0.2, 0.2, 0.01), s), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new he(0.2, 0.2, 0.01), s), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new he(0.2, 0.2, 0.01), s), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, R = {
      START: [
        [new M(new Vt(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new M(new Vt(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new Re(w(), n), null, null, null, "helper"]
      ],
      X: [
        [new Re(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Re(g, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Re(g, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, k = {
      XYZE: [
        [new M(C(0.5, 1), b), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new M(C(0.5, 0.5), a)]
      ],
      Y: [
        [new M(C(0.5, 0.5), r), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new M(C(0.5, 0.5), o), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new M(C(0.75, 1), p), null, [0, Math.PI / 2, 0]]
      ]
    }, D = {
      AXIS: [
        [new Re(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, V = {
      XYZE: [
        [new M(new gn(0.25, 10, 8), s)]
      ],
      X: [
        [new M(new Et(0.5, 0.1, 4, 24), s), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new M(new Et(0.5, 0.1, 4, 24), s), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new M(new Et(0.5, 0.1, 4, 24), s), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new M(new Et(0.75, 0.1, 2, 24), s)]
      ]
    }, Ce = {
      X: [
        [new M(x, a), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(y, a), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(x, a), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(x, r), [0, 0.5, 0]],
        [new M(y, r)],
        [new M(x, r), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(x, o), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new M(y, o), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new M(x, o), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new M(new he(0.15, 0.15, 0.01), h), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new he(0.15, 0.15, 0.01), l), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new he(0.15, 0.15, 0.01), c), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new he(0.1, 0.1, 0.1), m.clone())]
      ]
    }, ge = {
      X: [
        [new M(new _e(0.2, 0, 0.6, 4), s), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new M(new _e(0.2, 0, 0.6, 4), s), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, 0.3, 0]],
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new M(new _e(0.2, 0, 0.6, 4), s), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new M(new he(0.2, 0.2, 0.01), s), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new M(new he(0.2, 0.2, 0.01), s), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new M(new he(0.2, 0.2, 0.01), s), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new M(new he(0.2, 0.2, 0.2), s), [0, 0, 0]]
      ]
    }, ae = {
      X: [
        [new Re(g, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Re(g, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Re(g, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function K($) {
      const ke = new _t();
      for (const ce in $)
        for (let Ee = $[ce].length; Ee--; ) {
          const se = $[ce][Ee][0].clone(), Ue = $[ce][Ee][1], je = $[ce][Ee][2], Ne = $[ce][Ee][3], W = $[ce][Ee][4];
          se.name = ce, se.tag = W, Ue && se.position.set(Ue[0], Ue[1], Ue[2]), je && se.rotation.set(je[0], je[1], je[2]), Ne && se.scale.set(Ne[0], Ne[1], Ne[2]), se.updateMatrix();
          const oe = se.geometry.clone();
          oe.applyMatrix4(se.matrix), se.geometry = oe, se.renderOrder = 1 / 0, se.position.set(0, 0, 0), se.rotation.set(0, 0, 0), se.scale.set(1, 1, 1), ke.add(se);
        }
      return ke;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = K(S)), this.add(this.gizmo.rotate = K(k)), this.add(this.gizmo.scale = K(Ce)), this.add(this.picker.translate = K(T)), this.add(this.picker.rotate = K(V)), this.add(this.picker.scale = K(ge)), this.add(this.helper.translate = K(R)), this.add(this.helper.rotate = K(D)), this.add(this.helper.scale = K(ae)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const s = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : si;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let a = 0; a < n.length; a++) {
      const r = n[a];
      r.visible = !0, r.rotation.set(0, 0, 0), r.position.copy(this.worldPosition);
      let o;
      if (this.camera.isOrthographicCamera ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), r.scale.set(1, 1, 1).multiplyScalar(o * this.size / 4), r.tag === "helper") {
        r.visible = !1, r.name === "AXIS" ? (r.visible = !!this.axis, this.axis === "X" && (Q.setFromEuler(qt.set(0, 0, 0)), r.quaternion.copy(s).multiply(Q), Math.abs(X.copy(It).applyQuaternion(s).dot(this.eye)) > 0.9 && (r.visible = !1)), this.axis === "Y" && (Q.setFromEuler(qt.set(0, 0, Math.PI / 2)), r.quaternion.copy(s).multiply(Q), Math.abs(X.copy($e).applyQuaternion(s).dot(this.eye)) > 0.9 && (r.visible = !1)), this.axis === "Z" && (Q.setFromEuler(qt.set(0, Math.PI / 2, 0)), r.quaternion.copy(s).multiply(Q), Math.abs(X.copy(Lt).applyQuaternion(s).dot(this.eye)) > 0.9 && (r.visible = !1)), this.axis === "XYZE" && (Q.setFromEuler(qt.set(0, Math.PI / 2, 0)), X.copy(this.rotationAxis), r.quaternion.setFromRotationMatrix(Bs.lookAt(Ys, X, $e)), r.quaternion.multiply(Q), r.visible = this.dragging), this.axis === "E" && (r.visible = !1)) : r.name === "START" ? (r.position.copy(this.worldPositionStart), r.visible = this.dragging) : r.name === "END" ? (r.position.copy(this.worldPosition), r.visible = this.dragging) : r.name === "DELTA" ? (r.position.copy(this.worldPositionStart), r.quaternion.copy(this.worldQuaternionStart), de.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), de.applyQuaternion(this.worldQuaternionStart.clone().invert()), r.scale.copy(de), r.visible = this.dragging) : (r.quaternion.copy(s), this.dragging ? r.position.copy(this.worldPositionStart) : r.position.copy(this.worldPosition), this.axis && (r.visible = this.axis.search(r.name) !== -1));
        continue;
      }
      r.quaternion.copy(s), this.mode === "translate" || this.mode === "scale" ? (r.name === "X" && Math.abs(X.copy(It).applyQuaternion(s).dot(this.eye)) > 0.99 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "Y" && Math.abs(X.copy($e).applyQuaternion(s).dot(this.eye)) > 0.99 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "Z" && Math.abs(X.copy(Lt).applyQuaternion(s).dot(this.eye)) > 0.99 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "XY" && Math.abs(X.copy(Lt).applyQuaternion(s).dot(this.eye)) < 0.2 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "YZ" && Math.abs(X.copy(It).applyQuaternion(s).dot(this.eye)) < 0.2 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1), r.name === "XZ" && Math.abs(X.copy($e).applyQuaternion(s).dot(this.eye)) < 0.2 && (r.scale.set(1e-10, 1e-10, 1e-10), r.visible = !1)) : this.mode === "rotate" && (Kt.copy(s), X.copy(this.eye).applyQuaternion(Q.copy(s).invert()), r.name.search("E") !== -1 && r.quaternion.setFromRotationMatrix(Bs.lookAt(this.eye, Ys, $e)), r.name === "X" && (Q.setFromAxisAngle(It, Math.atan2(-X.y, X.z)), Q.multiplyQuaternions(Kt, Q), r.quaternion.copy(Q)), r.name === "Y" && (Q.setFromAxisAngle($e, Math.atan2(X.x, X.z)), Q.multiplyQuaternions(Kt, Q), r.quaternion.copy(Q)), r.name === "Z" && (Q.setFromAxisAngle(Lt, Math.atan2(X.y, X.x)), Q.multiplyQuaternions(Kt, Q), r.quaternion.copy(Q))), r.visible = r.visible && (r.name.indexOf("X") === -1 || this.showX), r.visible = r.visible && (r.name.indexOf("Y") === -1 || this.showY), r.visible = r.visible && (r.name.indexOf("Z") === -1 || this.showZ), r.visible = r.visible && (r.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), r.material._color = r.material._color || r.material.color.clone(), r.material._opacity = r.material._opacity || r.material.opacity, r.material.color.copy(r.material._color), r.material.opacity = r.material._opacity, this.enabled && this.axis && (r.name === this.axis || this.axis.split("").some(function(l) {
        return r.name === l;
      })) && (r.material.color.setHex(16776960), r.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class To extends M {
  constructor() {
    super(
      new mn(1e5, 1e5, 2, 2),
      new Qe({ visible: !1, wireframe: !0, side: Vi, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), Qt.copy(It).applyQuaternion(t === "local" ? this.worldQuaternion : si), Pt.copy($e).applyQuaternion(t === "local" ? this.worldQuaternion : si), At.copy(Lt).applyQuaternion(t === "local" ? this.worldQuaternion : si), X.copy(Pt), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            X.copy(this.eye).cross(Qt), De.copy(Qt).cross(X);
            break;
          case "Y":
            X.copy(this.eye).cross(Pt), De.copy(Pt).cross(X);
            break;
          case "Z":
            X.copy(this.eye).cross(At), De.copy(At).cross(X);
            break;
          case "XY":
            De.copy(At);
            break;
          case "YZ":
            De.copy(Qt);
            break;
          case "XZ":
            X.copy(At), De.copy(Pt);
            break;
          case "XYZ":
          case "E":
            De.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        De.set(0, 0, 0);
    }
    De.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Vs.lookAt(de.set(0, 0, 0), De, X), this.quaternion.setFromRotationMatrix(Vs)), super.updateMatrixWorld(e);
  }
}
class fe extends Xs {
  static DRAG_START = "Transform::dragStart";
  static DRAG_END = "Transform::dragEnd";
  static _instance;
  app;
  three;
  activeCamera;
  controls = /* @__PURE__ */ new Map();
  visibility = /* @__PURE__ */ new Map();
  setApp(e, t) {
    this.app = e, this.three = t, this.app.addEventListener(A.SET_SCENE, this.setScene);
  }
  clear() {
    for (const e of this.controls.values()) {
      e.detach(), e.disconnect();
      const t = e.getHelper();
      ze(t);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(e) {
    let t = this.controls.get(e);
    if (t === void 0) {
      const s = document.querySelector(".clickable");
      t = new vo(this.activeCamera, s), t.getHelper().name = e, t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: fe.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: fe.DRAG_END });
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
    return t === void 0 ? !1 : (t.detach(), t.disconnect(), ze(t.getHelper()), this.controls.delete(e), !0);
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
    return fe._instance || (fe._instance = new fe()), fe._instance;
  }
}
const Oo = new he(), Ri = new ue();
class Zs extends _t {
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
  draggedMat = new Qe();
  parentGroup;
  group;
  constructor(e, t) {
    const s = new Je(ot(0.5, 1, Math.random()), ot(0.5, 1, Math.random()), ot(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Zi({ color: s }), this.line = new Re(new gt(), this.lineMaterial), this.line.name = "line", this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = s, this.draggable = new _t(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new M(new gn(1.5), new Qe({ color: s })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new ni(), this.raycaster.params.Line.threshold = 3, this.enable();
  }
  enable() {
    document.addEventListener("pointerdown", this.onMouseClick);
  }
  disable() {
    document.removeEventListener("pointerdown", this.onMouseClick);
  }
  dispose = () => {
    this._transform && (this._transform.removeEventListener("objectChange", this.updateSpline), fe.instance.remove(this.name)), this.disable(), this.parentGroup.removeGroup(this.name);
  };
  hideTransform = () => {
    this._transform?.detach();
  };
  exportSpline = () => {
    const e = [];
    this.draggable.children.forEach((t) => {
      e.push([Me(t.position.x, 3), Me(t.position.y, 3), Me(t.position.z, 3)]);
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
      for (let s = 0; s < t; s++)
        this.addPoint(e[s], !1);
      this.addPoint(e[t]);
    } else
      this.addPoint(new P(-50, 0, 0), !1), this.addPoint(new P(50, 0, 0));
  };
  addPoint = (e, t = !0) => {
    const s = this.draggable.children.length, n = new M(Oo, this.draggedMat);
    return n.name = `point_${s}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), t && this.updateSpline(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = new P(
      ot(-this.offset, this.offset, Math.random()),
      ot(-this.offset, this.offset, Math.random()),
      ot(-this.offset, this.offset, Math.random())
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
    ze(e), this.updateSpline();
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
    if (!pe.instance || this._transform && !this._transform.getHelper().visible)
      return;
    const s = pe.instance.currentWindow.current.getBoundingClientRect();
    Ri.x = (e.clientX - s.x) / s.width * 2 - 1, Ri.y = -((e.clientY - s.y) / s.height) * 2 + 1, this.raycaster.setFromCamera(Ri, this.camera);
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
    this.parentGroup = e, this._transform = fe.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), this._transform.attach(t.length > 0 ? t[t.length - 1] : this), pe.instance?.scene.add(this._transform.getHelper());
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
            ze(this);
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
let Jt = 0;
class Mo extends _t {
  defaultScale = 10;
  _camera;
  group = null;
  app;
  constructor(e, t) {
    super(), this.name = "Spline Editor", this._camera = e, this.app = t, this.app.addEventListener(A.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = Y.addEditorGroup({
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
    this.app.removeEventListener(A.ADD_SPLINE, this.onAddSpline), Y.removeEditorGroup(this.name);
  }
  addSpline(e) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current), this.add(e);
  }
  createSpline = (e = []) => {
    const t = `Spline ${Jt + 1}`, s = new Zs(t, this._camera);
    return s.addPoints(e), this.addSpline(s), Jt++, s;
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
    const t = JSON.parse(e.value), s = `Spline ${Jt + 1}`, n = [];
    t.points.forEach((r) => {
      n.push(new P(r[0], r[1], r[2]));
    });
    const a = new Zs(s, this.camera);
    a.addPoints(n), this.addSpline(a), Jt++;
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
const Ws = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], Po = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", Ao = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==";
class pe extends Nt {
  static instance = null;
  app;
  scene = new Bi();
  renderer;
  currentScene;
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  helpersContainer = new ei();
  grid = new mo();
  interactionHelper = new ga(25);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial = new _a();
  normalsMaterial = new va();
  uvMaterial = new _o();
  wireframeMaterial = new Qe({
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
    super(e), this.app = e.app, this.canvasRef = Be(), this.containerRef = Be(), this.tlWindow = Be(), this.trWindow = Be(), this.blWindow = Be(), this.brWindow = Be();
    const t = e.three.app.appID, s = localStorage, n = s.getItem(`${t}_mode`);
    this.state = {
      mode: n !== null ? n : "Single",
      modeOpen: !1,
      renderModeOpen: !1,
      interactionMode: "Orbit",
      interactionModeOpen: !1,
      lastUpdate: Date.now()
    }, s.setItem(`${t}_mode`, this.state.mode), s.setItem(`${t}_tlCam`, s.getItem(`${t}_tlCam`) !== null ? s.getItem(`${t}_tlCam`) : "Debug"), s.setItem(`${t}_trCam`, s.getItem(`${t}_trCam`) !== null ? s.getItem(`${t}_trCam`) : "Orthographic"), s.setItem(`${t}_blCam`, s.getItem(`${t}_blCam`) !== null ? s.getItem(`${t}_blCam`) : "Front"), s.setItem(`${t}_brCam`, s.getItem(`${t}_brCam`) !== null ? s.getItem(`${t}_brCam`) : "Top"), s.setItem(`${t}_tlRender`, s.getItem(`${t}_tlRender`) !== null ? s.getItem(`${t}_tlRender`) : "Renderer"), s.setItem(`${t}_trRender`, s.getItem(`${t}_trRender`) !== null ? s.getItem(`${t}_trRender`) : "Renderer"), s.setItem(`${t}_blRender`, s.getItem(`${t}_blRender`) !== null ? s.getItem(`${t}_blRender`) : "Renderer"), s.setItem(`${t}_brRender`, s.getItem(`${t}_brRender`) !== null ? s.getItem(`${t}_brRender`) : "Renderer");
    const a = {
      Vector2: ue,
      Vector3: P,
      Vector4: Ta,
      Quaternion: be,
      Matrix4: ci,
      Spherical: ki,
      Box3: Oa,
      Sphere: Ma,
      Raycaster: ni
    };
    Le.install({ THREE: a }), this.setupScene(), this.setupTools();
    const r = localStorage.getItem(this.expandedCameraVisibility);
    this.cameraVisibility = r !== null ? r === "open" : !1, this.saveExpandedCameraVisibility();
    const o = localStorage.getItem(this.expandedLightVisibility);
    this.lightVisibility = o !== null ? o === "open" : !1, this.saveExpandedLightVisibility(), pe.instance = this;
  }
  componentDidMount() {
    this.setupRenderer(), this.enable(), this.assignControls(), this.resize(), this.play(), fe.instance.setApp(this.props.app, this.props.three), fe.instance.activeCamera = this.debugCamera;
  }
  componentDidUpdate(e, t, s) {
    t.mode !== this.state.mode && (this.assignControls(), this.resize());
  }
  componentWillUnmount() {
    this.disable(), Y.removeEditorGroup("View Settings");
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
          li,
          {
            title: "View",
            index: Ws.indexOf(this.state.mode),
            options: Ws,
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
          js,
          {
            name: "cameraHelper",
            icon: Po,
            selected: this.cameraVisibility,
            height: 24,
            top: 2,
            onClick: (t) => {
              if (this.cameraVisibility = t, this.saveExpandedCameraVisibility(), this.cameraHelpers.forEach((s) => {
                s.visible = t;
              }), this.selectedItem !== void 0 && !t) {
                const s = this.cameraHelpers.get(this.selectedItem.name);
                s !== void 0 && (s.visible = !0);
              }
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          js,
          {
            name: "lightHelper",
            icon: Ao,
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
    this.scene.name = "Debug Scene", this.scene.uuid = "", this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.grid.position.y = -1, this.helpersContainer.add(this.grid), this.interactionHelper.name = "interactionHelper", this.interactionHelper.visible = !1, this.helpersContainer.add(this.interactionHelper);
    const e = (a, r) => {
      const o = new Li(-100, 100, 100, -100, 0, 3e3);
      return o.name = a, o.position.copy(r), o.lookAt(0, 0, 0), this.cameras.set(a, o), o;
    }, t = 1e3;
    e("Top", new P(0, t, 0)), e("Bottom", new P(0, -t, 0)), e("Left", new P(-t, 0, 0)), e("Right", new P(t, 0, 0)), e("Front", new P(0, 0, t)), e("Back", new P(0, 0, -t)), e("Orthographic", new P(t, t, t)), e("UI", new P()), this.debugCamera = new ds(60, 1, 50, 5e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(500, 500, 500), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const s = localStorage, n = this.props.three.app.appID;
    this.tlCam = this.cameras.get(s.getItem(`${n}_tlCam`)), this.trCam = this.cameras.get(s.getItem(`${n}_trCam`)), this.blCam = this.cameras.get(s.getItem(`${n}_blCam`)), this.brCam = this.cameras.get(s.getItem(`${n}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top"));
  }
  setupTools() {
    Y.addEditorGroup({
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
    }), this.splineEditor = new Mo(this.currentCamera, this.app), this.splineEditor.initDebug(), this.scene.add(this.splineEditor);
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
    this.controls.forEach((e) => e.update()), this.cameraHelpers.forEach((e) => e.update()), this.lightHelpers.forEach((e) => {
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
    e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), this.app.addEventListener(A.SET_SCENE, this.sceneUpdate), this.app.addEventListener(A.ADD_CAMERA, this.addCamera), this.app.addEventListener(A.REMOVE_CAMERA, this.removeCamera), this.app.addEventListener(A.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const e = this.containerRef.current;
    e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), this.app.removeEventListener(A.SET_SCENE, this.sceneUpdate), this.app.removeEventListener(A.ADD_CAMERA, this.addCamera), this.app.removeEventListener(A.REMOVE_CAMERA, this.removeCamera), this.app.removeEventListener(A.SET_OBJECT, this.onSetSelectedItem);
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
    const a = s / n;
    this.cameras.forEach((r) => {
      r instanceof Li ? (r.left = s / -2, r.right = s / 2, r.top = n / 2, r.bottom = n / -2, r.name === "UI" && (r.position.x = this.width / 2, r.position.y = this.height / -2, r.position.z = 100), r.updateProjectionMatrix()) : r instanceof ds && (r.aspect = a, r.updateProjectionMatrix()), this.cameraHelpers.get(r.name)?.update();
    });
  };
  sceneUpdate = (e) => {
    this.clearLightHelpers(), this.scene.remove(this.currentScene), ze(this.currentScene);
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const s = new t();
      this.props.onSceneSet !== void 0 && this.props.onSceneSet(s), this.currentScene = s, this.props.three.scene = this.currentScene, this.scene.add(this.currentScene), this.sceneSet = !0, this.addLightHelpers();
    }
  };
  addCamera = (e) => {
    const t = e.value, s = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (s !== void 0) {
      const n = s;
      this.cameras.set(t.name, n);
      const a = new Ea(n);
      a.visible = this.cameraVisibility, this.cameraHelpers.set(n.name, a), this.scene.add(a), this.setState({ lastUpdate: Date.now() });
    }
  };
  removeCamera = (e) => {
    const t = this.cameraHelpers.get(e.value.name);
    t !== void 0 && (this.scene.remove(t), t.dispose()), this.cameras.delete(e.value.name), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new ue();
    this.renderer.getSize(t);
    const s = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = rt(s, 0, t.x, -1, 1), this.pointer.y = rt(n, 0, t.y, 1, -1);
    const a = t.x / 2, r = t.y / 2, o = () => {
      s < a ? this.pointer.x = rt(s, 0, a, -1, 1) : this.pointer.x = rt(s, a, t.x, -1, 1);
    }, l = () => {
      n < r ? this.pointer.y = rt(n, 0, r, 1, -1) : this.pointer.y = rt(n, r, t.y, 1, -1);
    };
    switch (this.state.mode) {
      case "Quad":
        o(), l();
        break;
      case "Side by Side":
        o();
        break;
      case "Stacked":
        l(), l();
        break;
    }
    if (this.updateCamera(s, n, a, r), this.state.interactionMode === "Orbit")
      return;
    const c = this.raycaster.intersectObjects(this.currentScene.children);
    c.length > 0 && this.interactionHelper.position.copy(c[0].point);
  };
  onClick = (e) => {
    if (this.state.interactionMode === "Orbit")
      return;
    const t = new ue();
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
        e.key === "0" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Le(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof M || this.selectedItem instanceof ba ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Le(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Le(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Le(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new Le(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (e.preventDefault(), this.clearControls(), this.cameraControls = new Le(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(zi(45), zi(45), !0), this.updateCameraControls(t));
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
    this.selectedItem !== void 0 && this.updateSelectedItemHelper(!1), this.selectedItem = this.currentScene.getObjectByProperty("uuid", e.value.uuid), this.selectedItem !== void 0 && (this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), fe.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = fe.instance.add(e.value.name), this.currentTransform.attach(this.selectedItem), this.scene.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform), this.updateSelectedItemHelper(!0));
  };
  updateSelectedItemHelper(e) {
    if (this.selectedItem !== void 0)
      if (this.cameraVisibility) {
        if (this.selectedItem.isLight === !0 && !this.lightVisibility) {
          const t = this.lightHelpers.get(this.selectedItem.name);
          t !== void 0 && (t.visible = e);
        }
      } else {
        const t = this.cameraHelpers.get(this.selectedItem.name);
        t !== void 0 && (t.visible = e);
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
            t = new xa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "HemisphereLight":
            t = new Sa(e, 250), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "RectAreaLight":
            t = new Wr(e), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
            break;
          case "PointLight":
            t = new wa(e, 100), t.name = `${e.name}Helper`, t.visible = this.lightVisibility, this.lightHelpers.set(e.name, t), this.helpersContainer.add(t);
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
    const n = new Xr(e, t);
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
    this.splineEditor.camera = this.currentCamera, this.raycaster.setFromCamera(this.pointer, this.currentCamera), this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), fe.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (e, t = !1) => {
    if (this.selectedItem === void 0)
      return;
    cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const s = 0.15, n = new $s();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const a = () => {
      const r = n.getDelta();
      this.cameraControls && this.cameraControls.update(r), t && (e.target.lerp(e.target0, s), e.object.position.lerp(e.position0, s), e.object.zoom = jt(e.object.zoom, e.zoom0, s), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(a);
    };
    a();
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
  drawTo(e, t, s, n, a, r) {
    switch (a.name) {
      case "Left":
      case "Right":
        this.grid.rotation.z = Math.PI / 2;
        break;
      case "Front":
      case "Back":
        this.grid.rotation.x = Math.PI / 2;
        break;
    }
    this.scene.overrideMaterial = r, this.renderer?.setViewport(e, t, s, n), this.renderer?.setScissor(e, t, s, n), this.renderer?.render(this.scene, a), this.grid.rotation.set(0, 0, 0);
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
      const a = this.height - n;
      this.drawTo(0, a, this.width, n, this.tlCam, e), this.drawTo(0, 0, this.width, n, this.trCam, t);
    }
  };
  drawQuad = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = this.getSceneOverride(this.blRender), n = this.getSceneOverride(this.brRender), a = Math.floor(this.width / 2), r = Math.floor(this.height / 2);
    let o = 0, l = 0;
    l = this.height - r, o = 0, this.drawTo(o, l, a, r, this.tlCam, e), o = a, this.drawTo(o, l, a, r, this.trCam, t), l = 0, o = 0, this.scene.overrideMaterial = s, this.drawTo(o, l, a, r, this.blCam, s), o = a, this.drawTo(o, l, a, r, this.brCam, n);
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
class di extends Nt {
  static instance;
  app;
  matrix = new ci();
  position = new P();
  rotation = new fn();
  scale = new P();
  open = !1;
  constructor(e) {
    super(e), this.app = e.app;
    const t = localStorage.getItem(this.expandedName), s = t !== null ? t === "open" : !1;
    this.open = s, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: s
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), di.instance = this;
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
        app: this.app,
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
      const a = n.getObjectByProperty("uuid", this.props.object.uuid);
      ie(a, e, s);
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
function Do(i, e, t) {
  function s() {
    return `${t.app.appID}_light`;
  }
  const n = localStorage.getItem(s()), a = n !== null ? n === "open" : !1;
  function r(l) {
    localStorage.setItem(s(), l ? "open" : "closed");
  }
  const o = [];
  if (i.lightInfo !== void 0)
    for (const l in i.lightInfo) {
      const c = i.lightInfo[l];
      c !== void 0 && (c.isColor !== void 0 ? o.push({
        title: Gs(l),
        prop: l,
        type: "color",
        value: c,
        onChange: (h, m) => {
          const p = new Je(m);
          t.updateObject(i.uuid, h, p);
          const f = t.getScene(i.uuid);
          if (f !== null) {
            const b = f.getObjectByProperty("uuid", i.uuid);
            ie(b, h, p);
          }
        }
      }) : o.push({
        title: Gs(l),
        prop: l,
        type: typeof c,
        value: c,
        step: typeof c == "number" ? 0.01 : void 0,
        onChange: (h, m) => {
          t.updateObject(i.uuid, h, m);
          const p = t.getScene(i.uuid);
          if (p !== null) {
            const f = p.getObjectByProperty("uuid", i.uuid);
            ie(f, h, m);
          }
        }
      }));
    }
  return /* @__PURE__ */ u.jsx(
    xe,
    {
      app: e,
      title: "Light",
      items: o,
      expanded: a,
      onToggle: (l) => {
        r(l);
      }
    }
  );
}
function Ro(i) {
  const e = i.object, t = i.three;
  function s() {
    return `${t.app.appID}_animation`;
  }
  const n = localStorage.getItem(s()), a = n !== null ? n === "open" : !1;
  function r(p) {
    localStorage.setItem(s(), p ? "open" : "closed");
  }
  const o = [], l = [];
  let c = 0;
  e.animations.forEach((p) => {
    c = Math.max(c, p.duration), p.duration > 0 && l.push({
      title: p.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: p.duration,
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
    items: l
  });
  let h;
  const m = t.getScene(e.uuid);
  if (m !== null) {
    const p = m.getObjectByProperty("uuid", e.uuid);
    if (p !== void 0) {
      const f = p.mixer;
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
        }), h = new Pa(p), pe.instance?.scene.add(h);
      }
    }
  }
  return et(() => () => {
    h !== void 0 && ze(h);
  }, []), /* @__PURE__ */ u.jsx(
    xe,
    {
      app: i.app,
      title: "Animation",
      items: o,
      expanded: a,
      onToggle: (p) => {
        r(p);
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
let le = { ...Yi };
function Io(i) {
  const [e, t] = B(-1);
  et(() => {
    function r(l) {
      le = { ...l.value }, t(Date.now());
    }
    function o() {
      le = { ...Yi }, t(Date.now());
    }
    return i.app.addEventListener(A.SET_SCENE, o), i.app.addEventListener(A.SET_OBJECT, r), () => {
      i.app.removeEventListener(A.SET_SCENE, o), i.app.removeEventListener(A.SET_OBJECT, r);
    };
  }, []);
  const s = le.type.toLowerCase(), n = le.animations.length > 0 || le.mixer !== void 0, a = s.search("mesh") > -1 || s.search("line") > -1 || s.search("points") > -1;
  return /* @__PURE__ */ u.jsx(
    oi,
    {
      app: i.app,
      label: "Inspector",
      button: le.uuid.length > 0 ? /* @__PURE__ */ u.jsx("button", { className: "remove", onClick: () => {
        fe.instance.remove(le.name), le = { ...Yi }, t(Date.now());
      } }) : void 0,
      children: /* @__PURE__ */ u.jsx("div", { id: "Inspector", className: i.class, children: le.uuid.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            ii,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: le.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            ii,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: le.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ u.jsx(
            ii,
            {
              type: "string",
              title: "UUID",
              prop: "uuid",
              value: le.uuid,
              disabled: !0
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(di, { object: le, app: i.app, three: i.three }),
          n ? /* @__PURE__ */ u.jsx(Ro, { app: i.app, object: le, three: i.three }) : null,
          s.search("camera") > -1 ? Zr(le, i.app, i.three) : null,
          s.search("light") > -1 ? Do(le, i.app, i.three) : null,
          a ? Yr(le, i.app, i.three) : null
        ] })
      ] }) }, e)
    },
    "Inspector"
  );
}
class Lo extends Nt {
  // Renderer
  app;
  autoClear = !0;
  autoClearColor = !0;
  autoClearDepth = !0;
  autoClearStencil = !0;
  outputColorSpace = us;
  localClippingEnabled = !1;
  clearColor = new Je(0);
  clearAlpha = 1;
  toneMapping = ps;
  toneMappingExposure = 1;
  constructor(e) {
    super(e), this.app = e.app;
    const t = localStorage.getItem(this.expandedName), s = t !== null ? t === "open" : !1;
    if (this.state = {
      expanded: s,
      lastUpdated: Date.now()
    }, this.saveExpanded(s), pe.instance) {
      const n = pe.instance.renderer;
      n && (this.autoClear = n.autoClear, this.autoClearColor = n.autoClearColor, this.autoClearDepth = n.autoClearDepth, this.autoClearStencil = n.autoClearStencil, this.outputColorSpace = n.outputColorSpace, this.localClippingEnabled = n.localClippingEnabled, this.clearAlpha = n.getClearAlpha(), this.toneMapping = n.toneMapping, this.toneMappingExposure = n.toneMappingExposure, n.getClearColor(this.clearColor));
    }
    this.app.addEventListener(A.ADD_RENDERER, this.onAddRenderer);
  }
  componentwillunmount() {
    this.app.removeEventListener(A.ADD_RENDERER, this.onAddRenderer);
  }
  onAddRenderer = (e) => {
    const t = e.value;
    if (this.autoClear = t.autoClear, this.autoClearColor = t.autoClearColor, this.autoClearDepth = t.autoClearDepth, this.autoClearStencil = t.autoClearStencil, this.outputColorSpace = t.outputColorSpace, this.localClippingEnabled = t.localClippingEnabled, this.clearAlpha = t.clearAlpha, this.toneMapping = t.toneMapping, this.toneMappingExposure = t.toneMappingExposure, this.clearColor.setStyle(t.clearColor, Ut), pt.enabled = t.colorManagement, pe.instance) {
      const s = pe.instance.renderer;
      s && (s.autoClear = this.autoClear, s.autoClearColor = this.autoClearColor, s.autoClearDepth = this.autoClearDepth, s.autoClearStencil = this.autoClearStencil, s.outputColorSpace = this.outputColorSpace, s.localClippingEnabled = this.localClippingEnabled, s.toneMapping = this.toneMapping, s.toneMappingExposure = this.toneMappingExposure, s.setClearColor(t.clearColor, this.clearAlpha));
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
        app: this.app,
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
            value: pt.enabled,
            onChange: (t, s) => {
              pt.enabled = s, e();
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
                value: us
              },
              {
                title: "Linear SRB Color Space",
                value: Ut
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
                value: ps
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
function ko(i) {
  const [e] = B([]), [t] = B([]), [s, n] = B(0), a = (l) => {
    const c = l.value;
    e.push(c), t.push(
      /* @__PURE__ */ u.jsx(
        oi,
        {
          app: i.app,
          label: `Scene: ${c.name}`,
          scene: c,
          open: !0,
          onRefresh: () => {
            i.three.refreshScene(c.name);
          },
          children: /* @__PURE__ */ u.jsx(Cs, { app: i.app, child: c, scene: c, three: i.three })
        },
        Math.random()
      )
    ), n(Date.now());
  }, r = (l) => {
    const c = l.value;
    for (let h = 0; h < e.length; h++)
      if (c.uuid === e[h].uuid) {
        e[h] = c, t[h] = /* @__PURE__ */ u.jsx(
          oi,
          {
            app: i.app,
            label: `Scene: ${c.name}`,
            scene: c,
            open: !0,
            onRefresh: () => {
              i.three.refreshScene(c.name);
            },
            children: /* @__PURE__ */ u.jsx(Cs, { app: i.app, child: c, scene: c, three: i.three })
          },
          Math.random()
        ), n(Date.now());
        return;
      }
  }, o = (l) => {
    const c = l.value;
    for (let h = 0; h < e.length; h++)
      if (c.uuid === e[h].uuid) {
        e.splice(h, 1), t.splice(h, 1), n(Date.now());
        return;
      }
  };
  return et(() => (i.app.addEventListener(A.ADD_SCENE, a), i.app.addEventListener(A.REFRESH_SCENE, r), i.app.addEventListener(A.REMOVE_SCENE, o), () => {
    i.app.removeEventListener(A.ADD_SCENE, a), i.app.removeEventListener(A.REFRESH_SCENE, r), i.app.removeEventListener(A.REMOVE_SCENE, o);
  }), []), /* @__PURE__ */ u.jsxs("div", { id: "SidePanel", children: [
    /* @__PURE__ */ u.jsx("div", { className: "scenes", children: t }, s),
    /* @__PURE__ */ u.jsx(Io, { app: i.app, three: i.three }),
    /* @__PURE__ */ u.jsx(Lo, { app: i.app, three: i.three }),
    /* @__PURE__ */ u.jsx(Y, { app: i.app, three: i.three })
  ] });
}
function sl(i) {
  return et(() => {
    function e(o) {
      let l = null;
      return i.three.scenes.forEach((c) => {
        o.search(c.uuid) > -1 && (l = c);
      }), l;
    }
    const t = (o) => {
      const l = o.value, h = e(l)?.getObjectByProperty("uuid", l);
      h !== void 0 && i.three.setObject(h);
    }, s = (o, l, c) => {
      const m = e(o)?.getObjectByProperty("uuid", o);
      m !== void 0 && ie(m, l, c);
    }, n = (o) => {
      const l = o.value, { key: c, value: h, uuid: m } = l;
      s(m, c, h);
    }, a = (o) => {
      const l = o.value, h = e(l.uuid)?.getObjectByProperty("uuid", l.uuid);
      if (h !== void 0) {
        const m = (p) => {
          const f = l.key.split(".");
          switch (f.length) {
            case 1:
              h[f[0]] = p;
              break;
            case 2:
              h[f[0]][f[1]] = p;
              break;
            case 3:
              h[f[0]][f[1]][f[2]] = p;
              break;
            case 4:
              h[f[0]][f[1]][f[2]][f[3]] = p;
              break;
            case 5:
              h[f[0]][f[1]][f[2]][f[3]][f[4]] = p;
              break;
          }
          h.material.needsUpdate = !0;
        };
        l.value.src.length > 0 ? En(l.value.src).then((p) => {
          p.offset.set(l.value.offset[0], l.value.offset[1]), p.repeat.set(l.value.repeat[0], l.value.repeat[1]), m(p);
        }) : m(null);
      }
    }, r = (o) => {
      const { key: l, uuid: c, value: h, subitem: m } = o.value, f = e(c)?.getObjectByProperty("uuid", c);
      if (f !== void 0)
        try {
          m !== void 0 ? pr(f, m)[l](h) : f[l](h);
        } catch (b) {
          console.log("Error requesting method:"), console.log(b), console.log(l), console.log(h);
        }
    };
    return i.app.addEventListener(A.GET_OBJECT, t), i.app.addEventListener(A.UPDATE_OBJECT, n), i.app.addEventListener(A.CREATE_TEXTURE, a), i.app.addEventListener(A.REQUEST_METHOD, r), () => {
      i.app.removeEventListener(A.GET_OBJECT, t), i.app.removeEventListener(A.UPDATE_OBJECT, n), i.app.removeEventListener(A.CREATE_TEXTURE, a), i.app.removeEventListener(A.REQUEST_METHOD, r);
    };
  }, []), null;
}
function Uo(i) {
  return /* @__PURE__ */ u.jsxs("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ u.jsx("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ u.jsx("div", { className: "footer", children: i.footer })
  ] });
}
function nl(i) {
  return /* @__PURE__ */ u.jsx(Uo, { children: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(
      pe,
      {
        app: i.app,
        three: i.three,
        scenes: i.scenes,
        onSceneResize: i.onSceneResize,
        onSceneSet: i.onSceneSet,
        onSceneUpdate: i.onSceneUpdate
      }
    ),
    /* @__PURE__ */ u.jsx(ko, { app: i.app, three: i.three })
  ] }) });
}
export {
  oi as Accordion,
  qo as AppRunner,
  Gi as BaseRemote,
  Ko as BaseScene,
  Cn as ChildObject,
  Cs as ContainerObject,
  Er as Draggable,
  yr as DraggableItem,
  br as Dropdown,
  Cr as DropdownItem,
  Uo as Editor,
  Xo as ElementProxy,
  or as ElementProxyReceiver,
  ti as ExportTexture,
  Io as Inspector,
  pe as MultiView,
  bn as NavButton,
  $o as ProxyManager,
  Ga as QualityType,
  Qo as RemoteComponents,
  tl as RemoteTheatre,
  il as RemoteThree,
  sl as SceneInspector,
  ko as SidePanel,
  Zs as Spline,
  Mo as SplineEditor,
  nl as ThreeEditor,
  A as ToolEvents,
  fe as Transform,
  Go as WebworkerEventHandlers,
  ri as capitalize,
  Xe as clamp,
  ms as colorToHex,
  Fa as copyToClipboard,
  Zo as cubicBezier,
  el as customizeTheatreElements,
  Bo as damp,
  Fo as defaultTheatreCallback,
  Xa as detectMaxFrameRate,
  zo as detectSettings,
  ze as dispose,
  yn as disposeMaterial,
  vs as disposeTexture,
  Yo as distance,
  Ni as hierarchyUUID,
  Ha as isColor,
  Ho as map,
  jt as mix,
  ai as noop,
  Ui as normalize,
  Wo as parseModelLite,
  za as randomID,
  ys as resetThreeObjects,
  Me as round,
  Vo as roundTo,
  Jo as theatreEditorApp,
  ji as totalThreeObjects
};
