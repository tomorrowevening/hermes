import { types as R, getProject as fs } from "@tomorrowevening/theatre-core";
import { useState as L, useEffect as Ee, useRef as z, useMemo as qe, Component as Qe, createRef as ue, forwardRef as gs } from "react";
import { BufferGeometry as ht, Float32BufferAttribute as Ne, OrthographicCamera as dt, Texture as Yt, Scene as zi, MeshBasicMaterial as ut, Mesh as Fe, LinearSRGBColorSpace as Xe, ObjectLoader as vs, AnimationMixer as _s, AnimationClip as Cs, Matrix4 as jt, AlwaysStencilFunc as ai, ReplaceStencilOp as Oe, NotEqualStencilFunc as oi, EqualStencilFunc as li, KeepStencilOp as we, NormalBlending as Hi, AddEquation as Je, SrcAlphaFactor as vt, OneMinusSrcAlphaFactor as _t, CustomBlending as Ct, OneFactor as yt, DstColorFactor as Qt, OneMinusDstColorFactor as Jt, WebGLRenderTarget as Bi, RGBAFormat as ys, EventDispatcher as Vi, RepeatWrapping as ci, Color as le, ColorManagement as ye, FrontSide as bs, BackSide as Es, DoubleSide as ei, ZeroFactor as Gi, SrcColorFactor as Yi, OneMinusSrcColorFactor as $i, DstAlphaFactor as Wi, OneMinusDstAlphaFactor as Zi, SrcAlphaSaturateFactor as Ss, ConstantColorFactor as qi, OneMinusConstantColorFactor as Ki, ConstantAlphaFactor as Xi, OneMinusConstantAlphaFactor as ji, SubtractEquation as Os, ReverseSubtractEquation as ws, MinEquation as xs, MaxEquation as Ts, NoBlending as Ms, AdditiveBlending as As, SubtractiveBlending as Rs, MultiplyBlending as Ps, ShaderMaterial as Qi, GLSL3 as Ds, PlaneGeometry as Ji, BoxGeometry as Is, Vector2 as ke, Object3D as $t, CatmullRomCurve3 as hi, LineBasicMaterial as Us, Line as Ls, SphereGeometry as ks, Raycaster as pt, Vector3 as W, Group as Ns, AxesHelper as Fs, Sphere as zs, Box3 as Hs, Spherical as Bs, Quaternion as Vs, Vector4 as Gs, WebGLRenderer as lt, MeshDepthMaterial as Ys, MeshNormalMaterial as $s, PerspectiveCamera as di, CameraHelper as Ws, SkinnedMesh as Zs, SpotLightHelper as qs, PointLightHelper as Ks, HemisphereLightHelper as Xs, DirectionalLightHelper as js, Clock as Qs, Euler as Js, SkeletonHelper as en, SRGBColorSpace as ui, NoToneMapping as pi, NoColorSpace as tn, LinearToneMapping as sn, ReinhardToneMapping as nn, CineonToneMapping as rn, ACESFilmicToneMapping as an, AgXToneMapping as on, NeutralToneMapping as ln, CustomToneMapping as cn } from "three";
import { jsx as f, jsxs as M, Fragment as K } from "react/jsx-runtime";
import { radToDeg as hn, degToRad as Wt, lerp as Ot, mapLinear as xe } from "three/src/math/MathUtils.js";
import { NodeMaterial as dn, MeshBasicNodeMaterial as es, WebGPURenderer as wt, MeshNormalNodeMaterial as un } from "three/webgpu";
import { RectAreaLightHelper as pn } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { OrbitControls as mn } from "three/examples/jsm/controls/OrbitControls.js";
import { uniform as Te, varyingProperty as fn, Fn as xt, positionLocal as gn, vec3 as vn, cameraPosition as et, float as Z, fwidth as _n, abs as mi, fract as Cn, min as Tt, max as fi, distance as yn, log as gi, pow as vi, floor as bn, mix as _i, If as En, lessThanEqual as Sn, Discard as On, vec4 as ti, remapClamp as wn, linearDepth as xn, uv as Tn } from "three/tsl";
import { TransformControls as Mn } from "three/examples/jsm/controls/TransformControls.js";
const mt = () => {
}, va = () => {
};
function ft(i) {
  return i.substring(0, 1).toUpperCase() + i.substring(1);
}
function An(i) {
  const e = JSON.stringify(i);
  return navigator.clipboard.writeText(e), e;
}
function $() {
  return Math.round(Math.random() * 1e6).toString();
}
function Rn(i) {
  return i.r !== void 0 && i.g !== void 0 && i.b !== void 0;
}
function Ci(i) {
  const e = Math.round(i.r * 255), t = Math.round(i.g * 255), s = Math.round(i.b * 255), n = (c) => {
    const l = c.toString(16);
    return l.length === 1 ? "0" + l : l;
  }, a = n(e), r = n(t), o = n(s);
  return "#" + a + r + o;
}
function Mt(i, e, t, s) {
  return new (t || (t = Promise))(function(n, a) {
    function r(l) {
      try {
        c(s.next(l));
      } catch (h) {
        a(h);
      }
    }
    function o(l) {
      try {
        c(s.throw(l));
      } catch (h) {
        a(h);
      }
    }
    function c(l) {
      var h;
      l.done ? n(l.value) : (h = l.value, h instanceof t ? h : new t(function(d) {
        d(h);
      })).then(r, o);
    }
    c((s = s.apply(i, [])).next());
  });
}
const Pn = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function yi(i) {
  return i = i.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1");
}
const ts = typeof window > "u", ne = (() => {
  if (ts) return;
  const { userAgent: i, platform: e, maxTouchPoints: t } = window.navigator, s = /(iphone|ipod|ipad)/i.test(i), n = e === "iPad" || e === "MacIntel" && t > 0 && !window.MSStream;
  return { isIpad: n, isMobile: /android/i.test(i) || s || n, isSafari12: /Version\/12.+Safari/.test(i), isFirefox: /Firefox/.test(i) };
})();
function Dn(i, e, t) {
  if (!t) return [e];
  const s = function(l) {
    const h = `
    precision highp float;
    attribute vec3 aPosition;
    varying float vvv;
    void main() {
      vvv = 0.31622776601683794;
      gl_Position = vec4(aPosition, 1.0);
    }
  `, d = `
    precision highp float;
    varying float vvv;
    void main() {
      vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
      enc = fract(enc);
      enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
      gl_FragColor = enc;
    }
  `, u = l.createShader(35633), m = l.createShader(35632), C = l.createProgram();
    if (!(m && u && C)) return;
    l.shaderSource(u, h), l.shaderSource(m, d), l.compileShader(u), l.compileShader(m), l.attachShader(C, u), l.attachShader(C, m), l.linkProgram(C), l.detachShader(C, u), l.detachShader(C, m), l.deleteShader(u), l.deleteShader(m), l.useProgram(C);
    const v = l.createBuffer();
    l.bindBuffer(34962, v), l.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
    const y = l.getAttribLocation(C, "aPosition");
    l.vertexAttribPointer(y, 3, 5126, !1, 0, 0), l.enableVertexAttribArray(y), l.clearColor(1, 1, 1, 1), l.clear(16384), l.viewport(0, 0, 1, 1), l.drawArrays(4, 0, 3);
    const g = new Uint8Array(4);
    return l.readPixels(0, 0, 1, 1, 6408, 5121, g), l.deleteProgram(C), l.deleteBuffer(v), g.join("");
  }(i), n = "801621810", a = "8016218135", r = "80162181161", o = ne?.isIpad ? [["a7", r, 12], ["a8", a, 15], ["a8x", a, 15], ["a9", a, 15], ["a9x", a, 15], ["a10", a, 15], ["a10x", a, 15], ["a12", n, 15], ["a12x", n, 15], ["a12z", n, 15], ["a14", n, 15], ["a15", n, 15], ["m1", n, 15], ["m2", n, 15]] : [["a7", r, 12], ["a8", a, 12], ["a9", a, 15], ["a10", a, 15], ["a11", n, 15], ["a12", n, 15], ["a13", n, 15], ["a14", n, 15], ["a15", n, 15], ["a16", n, 15], ["a17", n, 15]];
  let c;
  return s === "80162181255" ? c = o.filter(([, , l]) => l >= 14) : (c = o.filter(([, l]) => l === s), c.length || (c = o)), c.map(([l]) => `apple ${l} gpu`);
}
class bi extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
const At = [], Ei = [];
function In(i, e) {
  if (i === e) return 0;
  const t = i;
  i.length > e.length && (i = e, e = t);
  let s = i.length, n = e.length;
  for (; s > 0 && i.charCodeAt(~-s) === e.charCodeAt(~-n); ) s--, n--;
  let a, r = 0;
  for (; r < s && i.charCodeAt(r) === e.charCodeAt(r); ) r++;
  if (s -= r, n -= r, s === 0) return n;
  let o, c, l = 0, h = 0, d = 0;
  for (; h < s; ) Ei[h] = i.charCodeAt(r + h), At[h] = ++h;
  for (; d < n; ) for (a = e.charCodeAt(r + d), o = d++, l = d, h = 0; h < s; h++) c = a === Ei[h] ? o : o + 1, o = At[h], l = At[h] = o > l ? c > l ? l + 1 : c : c > o ? o + 1 : c;
  return l;
}
function Un(i) {
  return i != null;
}
const Ln = ({ mobileTiers: i = [0, 15, 30, 60], desktopTiers: e = [0, 15, 30, 60], override: t = {}, glContext: s, failIfMajorPerformanceCaveat: n = !1, benchmarksURL: a = "https://unpkg.com/detect-gpu@5.0.70/dist/benchmarks" } = {}) => Mt(void 0, void 0, void 0, function* () {
  const r = {};
  if (ts) return { tier: 0, type: "SSR" };
  const { isIpad: o = !!ne?.isIpad, isMobile: c = !!ne?.isMobile, screenSize: l = window.screen, loadBenchmarks: h = (b) => Mt(void 0, void 0, void 0, function* () {
    const O = yield fetch(`${a}/${b}`).then((w) => w.json());
    if (parseInt(O.shift().split(".")[0], 10) < 4) throw new bi("Detect GPU benchmark data is out of date. Please update to version 4x");
    return O;
  }) } = t;
  let { renderer: d } = t;
  const u = (b, O, w, D, x) => ({ device: x, fps: D, gpu: w, isMobile: c, tier: b, type: O });
  let m, C = "";
  if (d) d = yi(d), m = [d];
  else {
    const b = s || function(w, D = !1) {
      const x = { alpha: !1, antialias: !1, depth: !1, failIfMajorPerformanceCaveat: D, powerPreference: "high-performance", stencil: !1 };
      w && delete x.powerPreference;
      const N = window.document.createElement("canvas"), J = N.getContext("webgl", x) || N.getContext("experimental-webgl", x);
      return J ?? void 0;
    }(ne?.isSafari12, n);
    if (!b) return u(0, "WEBGL_UNSUPPORTED");
    const O = ne?.isFirefox ? null : b.getExtension("WEBGL_debug_renderer_info");
    if (d = O ? b.getParameter(O.UNMASKED_RENDERER_WEBGL) : b.getParameter(b.RENDERER), !d) return u(1, "FALLBACK");
    C = d, d = yi(d), m = function(w, D, x) {
      return D === "apple gpu" ? Dn(w, D, x) : [D];
    }(b, d, c);
  }
  const v = (yield Promise.all(m.map(function(b) {
    var O;
    return Mt(this, void 0, void 0, function* () {
      const w = ((B) => {
        const X = c ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
        for (const oe of X) if (B.includes(oe)) return oe;
      })(b);
      if (!w) return;
      const D = `${c ? "m" : "d"}-${w}${o ? "-ipad" : ""}.json`, x = r[D] = (O = r[D]) !== null && O !== void 0 ? O : h(D);
      let N;
      try {
        N = yield x;
      } catch (B) {
        if (B instanceof bi) throw B;
        return;
      }
      const J = function(B) {
        var X;
        const oe = (B = B.replace(/\([^)]+\)/, "")).match(/\d+/) || B.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
        return (X = oe?.join("").replace(/\W|amd/g, "")) !== null && X !== void 0 ? X : "";
      }(b);
      let ae = N.filter(([, B]) => B === J);
      ae.length || (ae = N.filter(([B]) => B.includes(b)));
      const me = ae.length;
      if (me === 0) return;
      const Se = b.split(/[.,()\[\]/\s]/g).sort().filter((B, X, oe) => X === 0 || B !== oe[X - 1]).join(" ");
      let fe, [cs, , , , hs] = me > 1 ? ae.map((B) => [B, In(Se, B[2])]).sort(([, B], [, X]) => B - X)[0][0] : ae[0], St = Number.MAX_VALUE;
      const { devicePixelRatio: ni } = window, ds = l.width * ni * l.height * ni;
      for (const B of hs) {
        const [X, oe] = B, ms = X * oe, ri = Math.abs(ds - ms);
        ri < St && (St = ri, fe = B);
      }
      if (!fe) return;
      const [, , us, ps] = fe;
      return [St, us, cs, ps];
    });
  }))).filter(Un).sort(([b = Number.MAX_VALUE, O], [w = Number.MAX_VALUE, D]) => b === w ? O - D : b - w);
  if (!v.length) {
    const b = Pn.find((O) => d.includes(O));
    return b ? u(0, "BLOCKLISTED", b) : u(1, "FALLBACK", `${d} (${C})`);
  }
  const [, y, g, _] = v[0];
  if (y === -1) return u(0, "BLOCKLISTED", g, y, _);
  const E = c ? i : e;
  let S = 0;
  for (let b = 0; b < E.length; b++) y >= E[b] && (S = b);
  return u(S, "BENCHMARK", g, y, _);
});
function kn(i) {
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
function Nn(i = !1, e = !1) {
  return new Promise((t) => {
    Ln().then((s) => {
      let n = !1;
      const a = document.createElement("canvas"), r = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (n = "transferControlToOffscreen" in a, r) {
        const c = navigator.userAgent.match(/version\/(\d+)/i);
        n = (c ? parseInt(c[1]) : 0) >= 17;
      }
      const o = {
        dpr: devicePixelRatio,
        fps: 30,
        width: innerWidth,
        height: innerHeight,
        mobile: s.isMobile !== void 0 ? s.isMobile : !1,
        supportOffScreenCanvas: n,
        supportWebGPU: !!navigator.gpu,
        quality: "Low",
        dev: i,
        editor: e
      };
      s.tier === 3 ? o.quality = "High" : s.tier === 2 && (o.quality = "Medium"), kn((c) => {
        o.fps = c, t(o);
      });
    });
  });
}
function Ce(i, e, t) {
  return Math.min(e, Math.max(i, t));
}
function Zt(i, e, t) {
  return (t - i) / (e - i);
}
function je(i, e, t) {
  return i * (1 - t) + e * t;
}
function _a(i, e, t, s, n) {
  return je(t, s, Zt(i, e, n));
}
function Ca(i, e) {
  const t = i - e;
  return Math.sqrt(t * t);
}
function ya(i, e, t, s) {
  return je(i, e, 1 - Math.exp(-t * s));
}
function te(i, e = 1) {
  return Number(i.toFixed(e));
}
function ba(i, e, t, s) {
  return Math.atan2(s - e, t - i);
}
function Fn(i, e, t, s) {
  return i === e && t === s;
}
function zn(i, e, t, s) {
  return 1 / (3 * e * i * i + 2 * t * i + s);
}
function Hn(i, e, t, s, n) {
  return e * (i * i * i) + t * (i * i) + s * i + n;
}
function Bn(i, e, t, s, n) {
  const a = i * i;
  return e * (a * i) + t * a + s * i + n;
}
function Ea(i, e, t, s, n) {
  if (i <= 0) return 0;
  if (i >= 1) return 1;
  if (Fn(e, t, s, n)) return i;
  const a = 0, r = 0, o = e, c = t, l = s, h = n, d = 1, u = 1, m = d - 3 * l + 3 * o - a, C = 3 * l - 6 * o + 3 * a, v = 3 * o - 3 * a, y = a, g = u - 3 * h + 3 * c - r, _ = 3 * h - 6 * c + 3 * r, E = 3 * c - 3 * r, S = r;
  let b = i;
  for (let O = 0; O < 5; O++) {
    const w = Hn(b, m, C, v, y);
    let D = zn(b, m, C, v);
    D === 1 / 0 && (D = i), b -= (w - i) * D, b = Math.min(Math.max(b, 0), 1);
  }
  return Bn(b, g, _, E, S);
}
const tt = (i) => Math.round(Math.min(1, Math.max(0, i)) * 255).toString(16).padStart(2, "0");
function Sa({ r: i, g: e, b: t, a: s = 1 }) {
  const n = `#${tt(i)}${tt(e)}${tt(t)}`;
  return s < 1 ? `${n}${tt(s)}` : n;
}
let Me;
function Oa() {
  const [i, e] = L(Me);
  return Ee(() => {
    Me || import("@tomorrowevening/theatre-studio").then((t) => {
      Me = t.default, Me.initialize(), Me.ui.hide(), e(Me);
    });
  }, []), i;
}
async function wa() {
  for (; !document.getElementById("theatrejs-studio-root"); )
    await new Promise((s) => setTimeout(s, 100));
  const i = document.getElementById("theatrejs-studio-root");
  if (i === null || i.shadowRoot === null) return;
  const e = i.shadowRoot.getElementById("pointer-root");
  if (e === null) return;
  const t = e.children[0];
  if (t !== null) {
    try {
      const n = t.children[1].children[1];
      n.parentElement?.removeChild(n);
    } catch {
    }
    try {
      const s = t.children[3];
      s.style.top = "0", s.style.right = "300px";
    } catch {
    }
  }
}
function xa(i, e, t, s) {
  s.sheetObject(i, e, {
    transform: {
      position: {
        x: t.position.x,
        y: t.position.y,
        z: t.position.z
      },
      rotation: {
        x: t.rotation.x,
        y: t.rotation.y,
        z: t.rotation.z
      },
      scale: {
        x: t.scale.x,
        y: t.scale.y,
        z: t.scale.z
      },
      visible: t.visible
    }
  }, (n) => {
    const a = n.transform;
    t.position.copy(a.position), t.rotation.copy(a.rotation), t.scale.copy(a.scale), t.visible = a.visible;
  });
}
const Vn = [
  "allowOverride",
  "alphaHash",
  "alphaTest",
  "alphaToCoverage",
  "blendAlpha",
  "blendColor",
  "blendDst",
  "blendDstAlpha",
  "blendEquation",
  "blendEquationAlpha",
  "blendSrc",
  "blendSrcAlpha",
  "blending",
  "clipIntersection",
  "clipShadows",
  "clipping",
  "clippingPlanes",
  "colorWrite",
  "combine",
  "defaultAttributeValues",
  "defines",
  "depthFunc",
  "depthTest",
  "depthWrite",
  "dithering",
  "extensions",
  "fog",
  "forceSinglePass",
  "fragmentShader",
  "glslVersion",
  "id",
  "index0AttributeName",
  "index1AttributeName",
  "index2AttributeName",
  "index3AttributeName",
  "index4AttributeName",
  "isMaterial",
  "lights",
  "linewidth",
  "name",
  "needsUpdate",
  "polygonOffset",
  "polygonOffsetFactor",
  "polygonOffsetUnits",
  "precision",
  "premultipliedAlpha",
  "shadowSide",
  "side",
  "stencilFail",
  "stencilFunc",
  "stencilFuncMask",
  "stencilRef",
  "stencilWrite",
  "stencilWriteMask",
  "stencilZFail",
  "stencilZPass",
  "toneMapped",
  "transparent",
  "type",
  "uniformsGroups",
  "uniformsNeedUpdate",
  "userData",
  "uuid",
  "version",
  "vertexColors",
  "vertexShader",
  "visible",
  "wireframe",
  "wireframeLinewidth",
  "wireframeLinecap",
  "wireframeLinejoin"
];
function Si(i) {
  const e = typeof i;
  if (i === null || i.isTexture)
    return "texture";
  if (e === "boolean")
    return "boolean";
  if (e === "number")
    return "number";
  if (e === "string")
    return "string";
  if (e === "object") {
    if (i.isColor)
      return "color";
    if (i.isVector2)
      return "vector2";
    if (i.isVector3)
      return "vector3";
    if (i.isVector4)
      return "vector4";
    if (i.isMatrix2)
      return "matrix2";
    if (i.isMatrix3)
      return "matrix3";
    if (i.isMatrix4)
      return "matrix4";
    if (i.isEuler)
      return "euler";
    if (Array.isArray(i))
      return "array";
  }
  return "object";
}
function Gn(i) {
  const e = [];
  for (const s in i) {
    const n = Vn.find((o) => o === s), a = s.indexOf("_") === 0 || s.indexOf("is") === 0;
    if (!(n || a))
      if (s === "uniforms") {
        const o = i.uniforms;
        for (const c in o) {
          const l = o[c].value, h = Si(l);
          h === "array" || h === "object" || e.push({
            name: `uniforms.${c}.value`,
            type: h,
            value: l
          });
        }
      } else {
        const o = Si(i[s]);
        e.push({
          name: s,
          type: o,
          value: i[s]
        });
      }
  }
  return e.filter(
    (s) => s.type !== "array" && s.type !== "object" && s.type !== "texture"
  );
}
function Yn(i) {
  const e = {}, t = { nudgeMultiplier: 0.01 };
  return i.forEach((s) => {
    let n = s.value;
    switch (s.type) {
      case "color":
        n = R.rgba({ r: n.r, g: n.g, b: n.b, a: 1 });
        break;
      case "number":
        n = R.number(n, t);
        break;
      case "euler":
      case "vector3":
        n = {
          x: R.number(n.x, t),
          y: R.number(n.y, t),
          z: R.number(n.z, t)
        };
        break;
      case "vector2":
        n = {
          x: R.number(n.x, t),
          y: R.number(n.y, t)
        };
        break;
      case "vector4":
        n = {
          x: R.number(n.x, t),
          y: R.number(n.y, t),
          z: R.number(n.z, t),
          w: R.number(n.w, t)
        };
        break;
      case "matrix2":
        n = {
          0: R.number(n.elements[0], t),
          1: R.number(n.elements[1], t),
          2: R.number(n.elements[2], t),
          3: R.number(n.elements[3], t)
        };
        break;
      case "matrix3":
        n = {
          0: R.number(n.elements[0], t),
          1: R.number(n.elements[1], t),
          2: R.number(n.elements[2], t),
          3: R.number(n.elements[3], t),
          4: R.number(n.elements[4], t),
          5: R.number(n.elements[5], t),
          6: R.number(n.elements[6], t),
          7: R.number(n.elements[7], t),
          8: R.number(n.elements[8], t)
        };
        break;
      case "matrix4":
        n = {
          0: R.number(n.elements[0], t),
          1: R.number(n.elements[1], t),
          2: R.number(n.elements[2], t),
          3: R.number(n.elements[3], t),
          4: R.number(n.elements[4], t),
          5: R.number(n.elements[5], t),
          6: R.number(n.elements[6], t),
          7: R.number(n.elements[7], t),
          8: R.number(n.elements[8], t),
          9: R.number(n.elements[9], t),
          10: R.number(n.elements[10], t),
          11: R.number(n.elements[11], t),
          12: R.number(n.elements[12], t),
          13: R.number(n.elements[13], t),
          14: R.number(n.elements[14], t),
          15: R.number(n.elements[15], t)
        };
        break;
    }
    if (s.name.includes(".")) {
      const a = s.name.split(".");
      let r = e;
      for (let o = 0; o < a.length - 1; o++) {
        const c = a[o];
        r[c] || (r[c] = {}), r = r[c];
      }
      r[a[a.length - 1]] = n;
    } else
      e[s.name] = n;
  }), e;
}
function $n(i, e, t) {
  e.forEach((s) => {
    if (i[s.name] !== void 0)
      switch (s.type) {
        case "boolean":
        case "number":
          i[s.name] = t.material[s.name];
          break;
        case "color":
        case "euler":
        case "matrix2":
        case "matrix3":
        case "matrix4":
        case "vector2":
        case "vector3":
        case "vector4":
          i[s.name].copy(t.material[s.name]);
          break;
      }
  });
}
function Ta(i, e, t, s) {
  if (!t.isMaterial) return;
  const n = Gn(t), a = Yn(n);
  s.sheetObject(i, e, {
    material: a
  }, (r) => {
    $n(t, n, r);
  });
}
const ii = new ht();
ii.setAttribute("position", new Ne([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3));
ii.setAttribute("normal", new Ne([0, 0, 1, 0, 0, 1], 3));
ii.setAttribute("uv", new Ne([0, 0, 2, 0, 0, 2], 2));
const Ma = new dt(-0.5, 0.5, 0.5, -0.5, 0, 100), Oi = (i) => {
  i?.dispose();
}, is = (i) => {
  if (i)
    if (Array.isArray(i))
      i.forEach((e) => is(e));
    else {
      for (const e in i) {
        const t = i[e];
        t !== null && t instanceof Yt && Oi(t);
      }
      if (i.isShaderMaterial === !0) {
        const e = i;
        for (const t in e.uniforms) {
          const s = e.uniforms[t];
          s.value !== null && s.value instanceof Yt && Oi(s.value);
        }
      }
      i.dispose();
    }
}, ce = (i) => {
  if (i) {
    for (; i.children.length > 0; ) {
      const e = i.children[0];
      e.type === "Audio" ? (e.pause(), e.parent && e.parent.remove(e)) : ce(e);
    }
    if (i.parent && i.parent.remove(i), i.isMesh) {
      const e = i;
      e.geometry?.dispose(), is(e.material);
    }
    i.dispose !== void 0 && i.dispose();
  }
};
let qt = 0;
const it = () => {
  qt = 0;
}, $e = (i) => {
  if (!i) return;
  let e = i.name.replaceAll(" ", "").replaceAll("/", ".");
  if (e.length === 0 && (e = `obj_${qt}`, qt++), i.parent !== null && i.parent.uuid.length > 0 && (e = `${i.parent.uuid}.${e}`), i.uuid = e, i.isMesh !== void 0) {
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
  i.children.forEach((t) => $e(t));
};
class pe {
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
      this.camera = new dt(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new zi(), this.material = new ut();
      const t = new ht();
      t.setAttribute("position", new Ne([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), t.setAttribute("normal", new Ne([0, 0, 1, 0, 0, 1], 3)), t.setAttribute("uv", new Ne([0, 0, 2, 0, 0, 2], 2));
      const s = new Fe(t, this.material);
      this.scene.add(s);
    }
    if (e.isRenderTargetTexture)
      this.material.map = e, this.renderer.render(this.scene, this.camera);
    else {
      const t = this.renderer.outputColorSpace, s = e.colorSpace;
      this.renderer.outputColorSpace = Xe, e.colorSpace = Xe, this.material.map = e, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = t, e.colorSpace = s;
    }
    return this.renderer.domElement;
  }
}
function Aa(i) {
  return new Promise((e) => {
    const t = new vs();
    t.parseAsync(i.scene).then((s) => {
      const n = new _s(s);
      if (i.animations.length > 0) {
        const r = i.animations.map((c) => Cs.parse(c));
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
const Ra = (i, e, t, s) => {
  i.setRenderTarget(s), i.clear(), i.render(e, t);
};
function Wn(i, e, t, s) {
  i.applyMatrix4(new jt().makeTranslation(e, -t, -s));
}
function Pa(i) {
  i.computeBoundingBox();
  const e = i.boundingBox, t = (e.max.x - e.min.x) / 2, s = (e.max.y - e.min.y) / 2;
  Wn(i, t, s, 0);
}
function Da(i, e, t) {
  i.left = e / -2, i.right = e / 2, i.top = t / 2, i.bottom = t / -2, i.position.x = e / 2, i.position.y = t / -2, i.updateProjectionMatrix();
}
function Ia(i, e, t) {
  const s = 1.7777777777777777, n = e / t;
  let a = e, r = t;
  n > s ? a = t * s : r = e / s, i.left = a / -2, i.right = a / 2, i.top = r / 2, i.bottom = r / -2, i.updateProjectionMatrix();
}
function Ua() {
  let e = "transferControlToOffscreen" in document.createElement("canvas");
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    const s = navigator.userAgent.match(/version\/(\d+)/i);
    e = (s ? parseInt(s[1]) : 0) >= 17;
  }
  return e;
}
function La(i, e, t = !0, s = !1) {
  i.renderOrder = -e;
  const n = i.material;
  Array.isArray(n) ? n.forEach((a) => {
    a.colorWrite = t, a.depthWrite = s, a.stencilWrite = !0, a.stencilRef = e, a.stencilFunc = ai, a.stencilFail = Oe, a.stencilZFail = Oe, a.stencilZPass = Oe;
  }) : (n.colorWrite = t, n.depthWrite = s, n.stencilWrite = !0, n.stencilRef = e, n.stencilFunc = ai, n.stencilFail = Oe, n.stencilZFail = Oe, n.stencilZPass = Oe);
}
function ka(i, e, t = !1) {
  const s = i.material;
  Array.isArray(s) ? s.forEach((n) => {
    n.stencilWrite = !0, n.stencilRef = e, n.stencilFunc = t ? oi : li, n.stencilFail = we, n.stencilZFail = we, n.stencilZPass = we;
  }) : (s.stencilWrite = !0, s.stencilRef = e, s.stencilFunc = t ? oi : li, s.stencilFail = we, s.stencilZFail = we, s.stencilZPass = we);
}
function Na(i) {
  i.blending = Hi, i.blendEquation = Je, i.blendSrc = vt, i.blendDst = _t, i.needsUpdate = !0;
}
function Fa(i) {
  i.blending = Ct, i.blendEquation = Je, i.blendSrc = vt, i.blendDst = yt, i.needsUpdate = !0;
}
function za(i) {
  i.blending = Ct, i.blendEquation = Je, i.blendSrc = Qt, i.blendDst = _t, i.needsUpdate = !0;
}
function Ha(i) {
  i.blending = Ct, i.blendEquation = Je, i.blendSrc = Jt, i.blendDst = yt, i.needsUpdate = !0;
}
let Kt = [];
function Zn(i, e, t = !0) {
  pe.renderer = e.renderer;
  const s = [];
  s.push({
    type: "boolean",
    prop: "Enabled",
    value: i.enabled
  });
  let n = (r, o) => {
    console.log("Default Handle Pass:", r, o);
  };
  if (i.name === "EffectPass")
    i.effects.forEach((r) => {
      r.uniforms.size > 0 && r.uniforms.forEach((o, c) => {
        if (c === "map") return;
        const l = `${r.name.replace("Effect", "")} ${c}`;
        if (o.value === null && t)
          s.push({
            prop: c,
            title: l,
            type: "image",
            value: {
              offset: [0, 0],
              repeat: [1, 1],
              src: ""
            }
          });
        else if (o.value.isTexture && t) {
          const h = o.value, d = pe.renderToBlob(h);
          s.push({
            prop: c,
            title: l,
            type: "image",
            value: {
              offset: [h.offset.x, h.offset.y],
              repeat: [h.repeat.x, h.repeat.y],
              src: d
            }
          });
        } else typeof o.value == "number" ? s.push({
          prop: c,
          title: l,
          type: "number",
          value: o.value,
          step: 0.01
        }) : typeof o.value == "string" ? s.push({
          prop: c,
          title: l,
          type: "string",
          value: o.value
        }) : typeof o.value == "boolean" && s.push({
          prop: c,
          title: l,
          type: "boolean",
          value: o.value
        });
      });
    }), n = (r, o) => {
      i.effects.forEach((c) => {
        c.uniforms.size > 0 && c.uniforms.forEach((l, h) => {
          h === r && (l.value = o);
        });
      });
    };
  else if (i.name === "ShaderPass") {
    const r = i.fullscreenMaterial;
    for (const o in r.uniforms) {
      if (o === "inputBuffer" || o === "map") continue;
      const c = r.uniforms[o], l = `${r.name.replace("Material", "")} ${o}`;
      if (c.value === null && t)
        s.push({
          title: l,
          prop: o,
          type: "image",
          value: {
            offset: [0, 0],
            repeat: [1, 1],
            src: ""
          }
        });
      else if (c.value.isTexture && t) {
        const h = c.value, d = pe.renderToBlob(h);
        s.push({
          title: l,
          prop: o,
          type: "image",
          value: {
            offset: [h.offset.x, h.offset.y],
            repeat: [h.repeat.x, h.repeat.y],
            src: d
          }
        });
      } else typeof c.value == "number" ? s.push({
        title: l,
        prop: o,
        type: "number",
        value: c.value,
        step: 0.01
      }) : typeof c.value == "string" ? s.push({
        title: l,
        prop: o,
        type: "string",
        value: c.value
      }) : typeof c.value == "boolean" && s.push({
        title: l,
        prop: o,
        type: "boolean",
        value: c.value
      });
    }
    n = (o, c) => {
      const l = r.uniforms[o];
      l.value = c;
    };
  } else
    return;
  const a = `${i.name}: ${i.scene.name}`;
  e.addGroup({
    title: a,
    items: s,
    onUpdate: (r, o) => {
      r === "Enabled" ? i.enabled = o : n(r, o);
    }
  }), Kt.push(a);
}
function Ba(i, e) {
  i.passes.forEach((t) => {
    Zn(t, e);
  });
}
function Va(i) {
  Kt.forEach((e) => {
    i.removeGroup(e);
  }), Kt = [];
}
function Ga(i, e, t, s = 1024) {
  return new Promise((n) => {
    const a = e.aspect, r = e.fov, o = e.rotation.clone(), c = t.outputBuffer;
    e.aspect = 1, e.fov = 90, e.updateProjectionMatrix();
    const l = new Bi(s, s, {
      format: ys,
      depthBuffer: !0,
      stencilBuffer: !1
    });
    t.outputBuffer = l, Ae(i, l, e, "nx", t, s).then(() => {
      Ae(i, l, e, "ny", t, s).then(() => {
        Ae(i, l, e, "nz", t, s).then(() => {
          Ae(i, l, e, "px", t, s).then(() => {
            Ae(i, l, e, "py", t, s).then(() => {
              Ae(i, l, e, "pz", t, s).then(() => {
                e.aspect = a, e.fov = r, e.rotation.copy(o), e.updateMatrixWorld(), e.updateProjectionMatrix(), t.outputBuffer = c, l.dispose(), n();
              });
            });
          });
        });
      });
    });
  });
}
function Ae(i, e, t, s, n, a) {
  return new Promise((r) => {
    const o = Math.PI / 2;
    switch (s) {
      case "nx":
        t.rotation.set(0, -o, 0);
        break;
      case "ny":
        t.rotation.set(-o, 0, Math.PI);
        break;
      case "nz":
        t.rotation.set(0, 0, 0);
        break;
      case "px":
        t.rotation.set(0, o, 0);
        break;
      case "py":
        t.rotation.set(o, 0, Math.PI);
        break;
      case "pz":
        t.rotation.set(0, Math.PI, 0);
        break;
    }
    t.updateMatrixWorld(), n.render();
    const c = new Uint8Array(a * a * 4);
    i.readRenderTargetPixels(e, 0, 0, a, a, c);
    const l = document.createElement("canvas");
    l.width = l.height = a;
    const h = l.getContext("2d"), d = h.createImageData(a, a);
    d.data.set(c), h.putImageData(d, 0, 0);
    const u = document.createElement("canvas");
    u.width = u.height = a;
    const m = u.getContext("2d");
    m.translate(0, a), m.scale(1, -1), m.drawImage(l, 0, 0);
    const C = u.toDataURL("image/png"), v = document.createElement("a");
    v.href = C, v.download = `${t.name}_${s}.png`, document.body.appendChild(v), v.click(), v.remove(), r();
  });
}
const Re = si([
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
]), qn = si([
  "clientX",
  "clientY",
  "deltaX",
  "deltaY",
  "deltaMode"
]), Kn = si([
  "ctrlKey",
  "metaKey",
  "shiftKey",
  "keyCode"
]);
function Xn(i, e) {
  i.preventDefault(), qn(i, e);
}
function jn(i) {
  i.preventDefault();
}
function Qn(i, e, t) {
  for (const s of e)
    t[s] = i[s];
}
function si(i) {
  return function(t, s) {
    const n = { type: t.type };
    Qn(t, i, n), s(n);
  };
}
function Rt(i, e) {
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
const Jn = {
  37: !0,
  // left
  38: !0,
  // up
  39: !0,
  // right
  40: !0
  // down
};
function er(i, e) {
  const { keyCode: t } = i;
  Jn[t] && (i.preventDefault(), Kn(i, e));
}
const Ya = {
  contextmenu: jn,
  mousedown: Re,
  mousemove: Re,
  mouseup: Re,
  pointerdown: Re,
  pointermove: Re,
  pointerup: Re,
  touchstart: Rt,
  touchmove: Rt,
  touchend: Rt,
  wheel: Xn,
  keydown: er
};
let tr = 0;
class $a {
  id;
  worker;
  constructor(e, t, s) {
    this.id = tr++, this.worker = t;
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
      e.addEventListener(r, (c) => {
        o(c, n);
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
class ir extends Vi {
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
    e.preventDefault = mt, e.stopPropagation = mt, this.dispatchEvent(e);
  }
  focus() {
  }
  getRootNode() {
    return this;
  }
}
class Wa {
  targets = {};
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }
  makeProxy(e) {
    const { id: t } = e, s = new ir();
    this.targets[t] = s;
  }
  getProxy(e) {
    return this.targets[e];
  }
  handleEvent(e) {
    this.targets[e.id]?.handleEvent(e.data);
  }
}
class Za {
  assets = {
    audio: /* @__PURE__ */ new Map(),
    image: /* @__PURE__ */ new Map(),
    json: /* @__PURE__ */ new Map(),
    model: /* @__PURE__ */ new Map(),
    video: /* @__PURE__ */ new Map()
  };
  components = /* @__PURE__ */ new Map();
  settings = {
    dpr: 1,
    fps: 30,
    width: 0,
    height: 0,
    mobile: !1,
    supportOffScreenCanvas: !1,
    supportWebGPU: !1,
    quality: "Low",
    dev: !1,
    editor: !1
  };
  onUpdateCallback;
  // Protected
  playing = !1;
  rafID = -1;
  dispose() {
    this.pause(), this.components.forEach((e) => e.dispose()), this.components.clear();
  }
  detectSettings(e = !1, t = !1) {
    return new Promise((s) => {
      Nn(e, t).then((n) => {
        this.settings = n, s();
      });
    });
  }
  // Playback
  update() {
  }
  draw() {
  }
  play = () => {
    this.playing || (this.playing = !0, this.onUpdate());
  };
  pause = () => {
    this.playing && (this.playing = !1, cancelAnimationFrame(this.rafID), this.rafID = -1);
  };
  onUpdate = () => {
    this.update(), this.isApp && this.draw(), this.onUpdateCallback && this.onUpdateCallback(), this.rafID = requestAnimationFrame(this.onUpdate);
  };
  // Remote Components
  addComponent(e, t) {
    this.components.set(e, t);
  }
  // Getters
  get debugEnabled() {
    return this.settings.dev;
  }
  get isApp() {
    return !this.editor;
  }
  set isApp(e) {
    this.editor = !e;
  }
  get editor() {
    return this.settings.editor;
  }
  set editor(e) {
    this.settings.editor = e;
  }
}
class ss {
  name;
  _debug = !1;
  _editor = !1;
  broadcastChannel;
  constructor(e, t = !1, s = !1) {
    this.name = e, this._debug = t, this._editor = s, t && (this.broadcastChannel = new BroadcastChannel(e), this.broadcastChannel.addEventListener("message", this.messageHandler.bind(this)));
  }
  dispose() {
    this.broadcastChannel?.removeEventListener("message", this.messageHandler.bind(this)), this.broadcastChannel?.close();
  }
  get debug() {
    return this._debug;
  }
  get editor() {
    return this._editor;
  }
  // Broadcast
  send(e) {
    if (this.editor && e.target === "app" || !this.editor && e.target === "editor")
      try {
        this.broadcastChannel?.postMessage(e);
      } catch (s) {
        console.log("Hermes - Error sending message:"), console.log(s), console.log(e);
      }
  }
  messageHandler(e) {
    const t = e.data;
    t.target === "app" ? this.handleApp(t) : this.handleEditor(t);
  }
  handleApp(e) {
  }
  handleEditor(e) {
  }
}
function sr(i, e, t, s, n) {
  const a = 1 - i;
  return a * a * a * e + 3 * a * a * i * t + 3 * a * i * i * s + i * i * i * n;
}
function nr(i, e, t) {
  if (i.type !== "bezier" || i.handles.length !== 4)
    throw new Error("Invalid keyframe data for Bézier interpolation.");
  const [s, n] = i.handles, a = (t - i.position) / (e.position - i.position);
  return sr(
    a,
    i.value,
    i.value + s,
    e.value + n,
    e.value
  );
}
class qa extends ss {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  studio = void 0;
  constructor(e = !1, t = !1) {
    super("RemoteTheatre", e, t);
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  loadProject(e, t) {
    return this.project = fs(e, { state: t }), new Promise((s, n) => {
      this.project?.ready.then(() => {
        if (t) {
          const a = t.sheetsById;
          for (const r in a) this.sheet(r);
        }
        s();
      }).catch(() => n());
    });
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
      this.sheet(e, s)?.sequence.play(t).then((a) => n(a)), this.send({
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
    this.sheet(e, t)?.sequence.pause(), this.send({
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
    if (r === void 0) return;
    const c = `${this.getSheetInstance(e, a)}_${t}`;
    let l = this.sheetObjects.get(c), h = s;
    l !== void 0 && (h = { ...s, ...l.value }), l = r.object(t, h, { reconfigure: !0 }), this.sheetObjects.set(c, l), this.sheetObjectCBs.set(c, n !== void 0 ? n : mt);
    function d(m, C, v) {
      if (typeof v == "object")
        if (Rn(v))
          m[C] = {
            r: v.r,
            g: v.g,
            b: v.b,
            a: v.a
          };
        else
          for (const y in v) {
            const g = v[y];
            typeof g == "object" && d(v, y, g);
          }
    }
    const u = l.onValuesChange((m) => {
      const C = this.sheetObjectCBs.get(c);
      if (this.editor) {
        for (const v in m) {
          const y = m[v];
          typeof y == "object" && d(m, v, y);
        }
        this.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: e,
            sheetObject: c,
            values: m
          }
        }), C && C(m);
      } else
        C && C(m);
    });
    return this.sheetObjectUnsubscribe.set(c, u), l;
  }
  getSheetObjectKeyframes(e, t, s) {
    const n = this.sheet(e);
    if (n === void 0) return [];
    const a = `${e}_${t}`, r = this.sheetObjects.get(a);
    return r === void 0 ? [] : n.sequence.__experimental_getKeyframes(r.props[s]);
  }
  getSheetObjectVectors(e, t) {
    const s = this.sheet(e);
    if (s === void 0) return [];
    const n = `${e}_${t}`, a = this.sheetObjects.get(n);
    if (a === void 0) return [];
    const r = [], o = s.sequence.__experimental_getKeyframes(a.props.x), c = s.sequence.__experimental_getKeyframes(a.props.y), l = s.sequence.__experimental_getKeyframes(a.props.z), h = /* @__PURE__ */ new Set();
    return o.forEach((u) => h.add(u.position)), c.forEach((u) => h.add(u.position)), l.forEach((u) => h.add(u.position)), Array.from(h).sort((u, m) => u - m).forEach((u) => {
      const m = (C, v) => {
        const y = C.find((E, S) => E.position <= v && (C[S + 1]?.position || 1 / 0) > v), g = C.find((E) => E.position > v);
        if (!y) return g?.value || 0;
        if (!g || y.position === v) return y.value;
        if (y.type === "bezier")
          return nr(y, g, v);
        const _ = (v - y.position) / (g.position - y.position);
        return y.value + _ * (g.value - y.value);
      };
      r.push({
        position: u,
        x: m(o, u),
        y: m(c, u),
        z: m(l, u)
      });
    }), r;
  }
  update(e) {
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
  handleApp(e) {
    let t;
    switch (e.event) {
      case "setSheet":
        t = this.sheets.get(e.data.sheet), t !== void 0 ? this.studio?.setSelection([t]) : console.log(`Hermes - Can't set Sheet: ${e.data.sheet}`, t);
        break;
      case "setSheetObject":
        t = this.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), t !== void 0 ? this.studio?.setSelection([t]) : console.log(`Hermes - Can't set Sheet Object: ${e.data.sheet}, ${e.data.key}: ${e.data.sheet}_${e.data.key}`, t);
        break;
      case "updateSheetObject":
        t = this.sheets.get(e.data.sheet), t !== void 0 && t.sequence.pause(), t = this.sheetObjectCBs.get(e.data.sheetObject), t !== void 0 ? t(e.data.values) : console.log(`Hermes - Can't update Sheet Object: ${e.data.sheetObject}, ${e.data.sheet}`, t);
        break;
      case "updateTimeline":
        t = this.sheets.get(e.data.sheet), t !== void 0 ? t.sequence.position = e.data.position : console.log(`Hermes - Can't update sheet position: ${e.data.sheet}, ${e.data.position}`);
        break;
    }
  }
  handleEditor(e) {
    switch (e.event) {
      case "playSheet":
        this.sheet(e.data.sheet, e.data.instance)?.sequence.play(e.data.value);
        break;
      case "pauseSheet":
        this.sheet(e.data.sheet, e.data.instance)?.sequence.pause();
        break;
    }
  }
  getSheetNames() {
    const e = [];
    return this.sheets.forEach((t, s) => {
      e.push(s);
    }), e;
  }
  handleEditorApp() {
    if (this.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((n) => {
        n.length < 1 || n.forEach((a) => {
          let r = a.address.sheetId, o = "setSheet", c = {};
          switch (a.type) {
            case "Theatre_Sheet_PublicAPI":
              o = "setSheet", c = {
                sheet: a.address.sheetId
              }, this.activeSheet = this.sheets.get(a.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              o = "setSheetObject", r += `_${a.address.objectKey}`, c = {
                id: r,
                sheet: a.address.sheetId,
                key: a.address.objectKey
              }, this.activeSheet = this.sheets.get(a.address.sheetId);
              break;
          }
          this.send({ event: o, target: "app", data: c });
        });
      });
      let e = -1;
      const t = () => {
        if (this.activeSheet !== void 0 && e !== this.activeSheet.sequence.position) {
          e = this.activeSheet.sequence.position;
          const n = this.activeSheet;
          this.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: e,
              sheet: n.address.sheetId
            }
          });
        }
      }, s = () => {
        t(), requestAnimationFrame(s);
      };
      t(), s();
    } else
      this.studio?.ui.hide();
  }
}
function rr(i) {
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
function he(i) {
  const e = {
    name: i.name,
    type: i.type,
    uuid: i.uuid,
    children: []
  };
  return i.children.forEach((t) => {
    e.children.push(he(t));
  }), e;
}
function ar(i) {
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
function or(i) {
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
function Pe(i) {
  const e = {};
  for (const t in i) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || or(t)) continue;
    const s = typeof i[t], n = i[t];
    switch (s) {
      case "boolean":
      case "number":
      case "string":
        e[t] = n;
        break;
      case "object":
        n !== null ? (e[t] = n, n.isTexture ? e[t] = {
          src: pe.renderToBlob(n),
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
  return i.anisotropy !== void 0 && (e.anisotropy = i.anisotropy), i.clearcoat !== void 0 && (e.clearcoat = i.clearcoat), i.iridescence !== void 0 && (e.iridescence = i.iridescence), i.dispersion !== void 0 && (e.dispersion = i.dispersion), i.sheen !== void 0 && (e.sheen = i.sheen), i.transmission !== void 0 && (e.transmission = i.transmission), i.transmission !== void 0 && (e.transmission = i.transmission), e;
}
function Pt(i) {
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
        n.push(Pe(a));
      }), e.material = n;
    } else
      e.material = Pe(s.material);
  } else if (t.search("points") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((a) => {
        n.push(Pe(a));
      }), e.material = n;
    } else
      e.material = Pe(s.material);
  } else if (t.search("line") > -1) {
    const s = i;
    if (Array.isArray(s.material)) {
      const n = [];
      s.material.forEach((a) => {
        n.push(Pe(a));
      }), e.material = n;
    } else
      e.material = Pe(s.material);
  } else t.search("camera") > -1 ? i.type === "PerspectiveCamera" ? e.perspectiveCameraInfo = {
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
function lr(i, e) {
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
function cr(i, e) {
  for (const t in e) i[t] = e[t];
}
function V(i, e, t) {
  if (i === void 0) {
    console.log(`Hermes - Can't set props: ${e}`, t);
    return;
  }
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
    r != null ? cr(r, t) : console.log(`Hermes - Can't set props because target isn't found: ${e}`, t);
  }
}
function ns(i) {
  return new Promise((e, t) => {
    const s = new Image();
    s.onload = () => {
      const n = new Yt(s);
      n.wrapS = ci, n.wrapT = ci, n.needsUpdate = !0, e(n);
    }, s.onerror = t, s.src = i;
  });
}
var P = /* @__PURE__ */ ((i) => (i.CUSTOM = "ToolEvents::custom", i.SELECT_DROPDOWN = "ToolEvents::selectDropdown", i.DRAG_UPDATE = "ToolEvents::dragUpdate", i.ADD_SCENE = "ToolEvents::addScene", i.REFRESH_SCENE = "ToolEvents::refreshScene", i.REMOVE_SCENE = "ToolEvents::removeScene", i.SET_SCENE = "ToolEvents::setScene", i.SET_OBJECT = "ToolEvents::setObject", i.CLEAR_OBJECT = "ToolEvents::clearObject", i.ADD_CAMERA = "ToolEvents::addCamera", i.REMOVE_CAMERA = "ToolEvents::removeCamera", i.ADD_GROUP = "ToolEvents::addGroup", i.REMOVE_GROUP = "ToolEvents::removeGroup", i.ADD_SPLINE = "ToolEvents::addSpline", i.ADD_RENDERER = "ToolEvents::addRenderer", i.UPDATE_RENDERER = "ToolEvents::updateRenderer", i))(P || {});
class Ka extends ss {
  name;
  canvas = null;
  // Canvas or OffscreenCanvas
  inputElement = null;
  // reference this to receive events
  scene = void 0;
  scenes = /* @__PURE__ */ new Map();
  renderer = void 0;
  renderTargets = /* @__PURE__ */ new Map();
  renderTargetsResize = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  _listeners = {};
  constructor(e, t = !1, s = !1) {
    super("RemoteThree", t, s), this.name = e;
  }
  dispose() {
    this.scenes.forEach((e) => {
      ce(e);
    }), this.scenes.clear(), this.scene && ce(this.scene), this.renderTargets.forEach((e) => {
      e.dispose();
    }), this.renderTargets.clear(), this.renderer?.dispose();
  }
  // Event Dispatching (used for editor only)
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const s = this._listeners;
    s[e] === void 0 && (s[e] = []), s[e].indexOf(t) === -1 && s[e].push(t);
  }
  hasEventListener(e, t) {
    const s = this._listeners;
    return s === void 0 ? !1 : s[e] !== void 0 && s[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const s = this._listeners;
    if (s === void 0) return;
    const n = s[e];
    if (n !== void 0) {
      const a = n.indexOf(t);
      a !== -1 && n.splice(a, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const s = t[e.type];
    if (s !== void 0) {
      const n = { ...e, target: this }, a = s.slice(0);
      for (let r = 0, o = a.length; r < o; r++)
        a[r].call(this, n);
    }
  }
  // Objects
  /**
   * Searches ALL active scenes
   */
  getObjectByUUID(e) {
    const t = e.split(".")[0], s = this.scenes.get(t);
    if (s !== void 0)
      return s.getObjectByProperty("uuid", e);
  }
  getObject(e) {
    if (!this.debug) return;
    this.renderer !== void 0 && (pe.renderer = this.renderer);
    const t = this.getObjectByUUID(e);
    t && this.setObject(t);
  }
  setObject(e) {
    this.renderer !== void 0 && (pe.renderer = this.renderer);
    const t = Pt(e);
    this.dispatchEvent({ type: "ToolEvents::setObject", value: t });
  }
  requestMethod(e, t, s, n) {
    const a = this.getObjectByUUID(e);
    if (a)
      try {
        n !== void 0 ? lr(a, n)[t](s) : a[t](s);
      } catch (r) {
        console.log("Hermes - Error requesting method:", e, t, s), console.log(r);
      }
  }
  updateObject(e, t, s) {
    this.send({
      event: "updateObject",
      target: "app",
      // used by both
      data: {
        uuid: e,
        key: t,
        value: s
      }
    });
  }
  createTexture(e, t, s) {
    this.send({
      event: "createTexture",
      target: "app",
      // used by both
      data: {
        uuid: e,
        key: t,
        value: s
      }
    });
  }
  onUpdateObject(e, t, s) {
    const n = this.getObjectByUUID(e);
    n && V(n, t, s);
  }
  onCreateTexture(e, t, s) {
    const n = this.getObjectByUUID(e);
    if (n) {
      const a = (r) => {
        const o = t.split(".");
        switch (o.length) {
          case 1:
            n[o[0]] = r;
            break;
          case 2:
            n[o[0]][o[1]] = r;
            break;
          case 3:
            n[o[0]][o[1]][o[2]] = r;
            break;
          case 4:
            n[o[0]][o[1]][o[2]][o[3]] = r;
            break;
          case 5:
            n[o[0]][o[1]][o[2]][o[3]][o[4]] = r;
            break;
        }
        n.material.needsUpdate = !0;
      };
      s.src.length > 0 ? ns(s.src).then((r) => {
        r.offset.set(s.offset[0], s.offset[1]), r.repeat.set(s.repeat[0], s.repeat[1]), a(r);
      }) : a(null);
    }
  }
  // Groups
  addGroup(e) {
    this.groups.get(e.title) === void 0 && (this.groups.set(e.title, {
      title: e.title,
      onUpdate: e.onUpdate
    }), this.send({
      event: "addGroup",
      target: "editor",
      data: JSON.stringify(e)
    }));
  }
  removeGroup(e) {
    this.groups.get(e) !== void 0 && (this.groups.delete(e), this.send({
      event: "removeGroup",
      target: "editor",
      data: e
    }));
  }
  updateGroup(e, t, s) {
    this.send({
      event: "updateGroup",
      target: "app",
      data: JSON.stringify({ group: e, prop: t, value: s })
    });
  }
  addSplineCurve(e) {
    setTimeout(() => {
      this.send({
        event: "addSpline",
        target: "editor",
        data: JSON.stringify(e.toJSON())
      });
    }, 1);
  }
  addSplineObject(e) {
    setTimeout(() => {
      this.send({
        event: "addSpline",
        target: "editor",
        data: JSON.stringify(e)
      });
    }, 1);
  }
  // Renderer
  setRenderer(e, t = null) {
    if (this.renderer = e, this.canvas = e.domElement, this.inputElement = t !== null ? t : this.canvas, !this.debug) return;
    const s = `#${e.getClearColor(new le()).getHexString()}`;
    this.send({
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
        colorManagement: ye.enabled,
        toneMapping: e.toneMapping,
        toneMappingExposure: e.toneMappingExposure,
        type: e.isWebGLRenderer ? "WebGLRenderer" : "WebGPURenderer"
      }
    });
  }
  updateRenderer(e) {
    this.send({
      event: "updateRenderer",
      target: "app",
      data: e
    });
  }
  // Scenes
  addScene(e) {
    if (e === void 0 || (this.scenes.set(e.name, e), !this.debug)) return;
    it(), $e(e);
    const t = he(e);
    this.send({
      event: "addScene",
      target: "editor",
      data: t
    });
  }
  refreshScene(e) {
    if (!this.debug) return;
    const t = this.scenes.get(e);
    if (t !== void 0) {
      const s = he(t);
      this.send({
        event: "refreshScene",
        target: "app",
        data: s
      });
    }
  }
  removeScene(e) {
    if (e === void 0 || (this.scenes.delete(e.name), !this.debug)) return;
    const t = he(e);
    this.send({
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
    return this.scene !== void 0 && this.scene.uuid.search(e) > -1 ? this.scene : (this.scenes.forEach((s, n) => {
      e.search(n) > -1 && (t = s);
    }), t);
  }
  setScene(e) {
    if (e === void 0 || (this.scene = e, !this.debug)) return;
    this.renderer !== void 0 && (pe.renderer = this.renderer), it(), $e(e);
    const t = he(e);
    this.send({
      event: "setScene",
      target: "editor",
      data: t
    });
  }
  requestSize() {
    this.send({
      event: "requestSize",
      target: "app"
    });
  }
  requestRenderer() {
    this.send({
      event: "requestRenderer",
      target: "app"
    });
  }
  requestScene() {
    this.send({
      event: "requestScene",
      target: "app"
    });
  }
  // Cameras
  addCamera(e) {
    if (!this.debug) return;
    const t = Pt(e);
    this.send({
      event: "addCamera",
      target: "editor",
      data: t
    });
  }
  removeCamera(e) {
    if (!this.debug) return;
    const t = Pt(e);
    this.send({
      event: "removeCamera",
      target: "editor",
      data: t
    });
  }
  handleApp(e) {
    switch (e.event) {
      case "refreshScene":
        this.send({
          event: "refreshScene",
          target: "editor",
          data: he(this.scenes.get(e.data.name))
        });
        break;
      case "updateRenderer":
        this.renderer && (this.renderer.autoClearColor = e.data.autoClearColor, this.renderer.outputColorSpace = e.data.outputColorSpace, this.renderer.localClippingEnabled = e.data.localClippingEnabled, this.renderer.setClearColor(e.data.clearColor, e.data.clearAlpha), this.renderer.toneMapping = e.data.toneMapping, this.renderer.toneMappingExposure = e.data.toneMappingExposure, ye.enabled = e.data.colorManagement);
        break;
      case "requestRenderer":
        if (this.renderer !== void 0) {
          const t = `#${this.renderer.getClearColor(new le()).getHexString()}`;
          this.send({
            event: "addRenderer",
            target: "editor",
            data: {
              autoClear: this.renderer.autoClear,
              autoClearColor: this.renderer.autoClearColor,
              autoClearDepth: this.renderer.autoClearDepth,
              autoClearStencil: this.renderer.autoClearStencil,
              outputColorSpace: this.renderer.outputColorSpace,
              localClippingEnabled: this.renderer.localClippingEnabled,
              clearColor: t,
              clearAlpha: this.renderer.getClearAlpha(),
              colorManagement: ye.enabled,
              toneMapping: this.renderer.toneMapping,
              toneMappingExposure: this.renderer.toneMappingExposure,
              type: this.renderer.isWebGLRenderer ? "WebGLRenderer" : "WebGPURenderer"
            }
          });
        }
        break;
      case "requestScene":
        this.scenes.forEach((t) => {
          it(), $e(t), this.send({
            event: "addScene",
            target: "editor",
            data: he(t)
          });
        }), this.scene !== void 0 && (this.renderer !== void 0 && (pe.renderer = this.renderer), it(), $e(this.scene), this.send({
          event: "setScene",
          target: "editor",
          data: he(this.scene)
        }));
        break;
    }
    if (e.event === "updateGroup") {
      const t = JSON.parse(e.data);
      this.groups.get(t.group)?.onUpdate(t.prop, t.value);
    }
  }
  handleEditor(e) {
    switch (e.event) {
      case "addScene":
        this.dispatchEvent({ type: "ToolEvents::addScene", value: e.data });
        break;
      case "refreshScene":
        this.dispatchEvent({ type: "ToolEvents::refreshScene", value: e.data });
        break;
      case "removeScene":
        this.dispatchEvent({ type: "ToolEvents::removeScene", value: e.data });
        break;
      case "setScene":
        this.dispatchEvent({ type: "ToolEvents::setScene", value: e.data });
        break;
      case "addCamera":
        this.dispatchEvent({ type: "ToolEvents::addCamera", value: e.data });
        break;
      case "removeCamera":
        this.dispatchEvent({ type: "ToolEvents::removeCamera", value: e.data });
        break;
      case "addGroup":
        this.dispatchEvent({ type: "ToolEvents::addGroup", value: e.data });
        break;
      case "removeGroup":
        this.dispatchEvent({ type: "ToolEvents::removeGroup", value: e.data });
        break;
      case "addSpline":
        this.dispatchEvent({ type: "ToolEvents::addSpline", value: e.data });
        break;
      case "addRenderer":
        this.dispatchEvent({ type: "ToolEvents::addRenderer", value: e.data });
    }
  }
  messageHandler(e) {
    const t = e.data;
    if (t.event === "updateObject") {
      this.onUpdateObject(t.data.uuid, t.data.key, t.data.value);
      return;
    } else if (t.event === "createTexture") {
      this.onCreateTexture(t.data.uuid, t.data.key, t.data.value);
      return;
    } else if (t.event === "requestSize") {
      t.target === "app" ? this.send({
        event: "requestSize",
        target: "editor",
        data: {
          width: this.width,
          height: this.height
        }
      }) : this.scenes.forEach((s) => {
        s.resize !== void 0 && s.resize(t.data.width, t.data.height);
      });
      return;
    }
    t.target === "app" ? this.handleApp(t) : this.handleEditor(t);
  }
  // Renderer
  addRT(e, t = !0, s) {
    const n = new Bi(32, 32, s);
    n.texture.name = e, this.renderTargets.set(e, n), this.renderTargetsResize.set(e, t);
  }
  removeRT(e) {
    this.renderTargets.delete(e), this.renderTargetsResize.delete(e);
  }
  resize(e, t) {
    const s = this.dpr;
    this.renderTargets.forEach((a, r) => {
      this.renderTargetsResize.get(r) && a.setSize(e * s, t * s);
    });
    const n = !(this.renderer?.domElement instanceof OffscreenCanvas);
    this.renderer?.setSize(e, t, n);
  }
  set dpr(e) {
    this.renderer?.setPixelRatio(Ce(1, 2, e));
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
function rs(i) {
  return i.title.search("<") > -1 ? /* @__PURE__ */ f("button", { className: "svg", dangerouslySetInnerHTML: { __html: i.title } }) : /* @__PURE__ */ f("button", { children: i.title });
}
const hr = /* @__PURE__ */ M("svg", { className: "closeIcon", width: "14", height: "14", fill: "none", stroke: "#666666", strokeMiterlimit: "10", children: [
  /* @__PURE__ */ f("circle", { cx: "7", cy: "7", r: "6" }),
  /* @__PURE__ */ f("line", { x1: "4", y1: "4", x2: "10", y2: "10" }),
  /* @__PURE__ */ f("line", { x1: "4", y1: "10", x2: "10", y2: "4" })
] }), dr = /* @__PURE__ */ f("svg", { className: "dragIcon", width: "14", height: "14", fill: "#666666", stroke: "none", children: /* @__PURE__ */ f(
  "path",
  {
    d: `M10.43,4H3.57C3.26,4,3,4.22,3,4.5v1C3,5.78,3.26,6,3.57,6h6.86C10.74,6,11,5.78,11,5.5v-1\r
C11,4.22,10.74,4,10.43,4z M10.43,8H3.57C3.26,8,3,8.22,3,8.5v1C3,9.78,3.26,10,3.57,10h6.86C10.74,10,11,9.78,11,9.5v-1\r
C11,8.22,10.74,8,10.43,8z`
  }
) });
function ur(i) {
  return /* @__PURE__ */ f(
    "li",
    {
      className: `reorder-item ${i.draggingIndex === i.index ? "dragging" : ""}`,
      draggable: !0,
      onDragStart: () => i.onDragStart(i.index),
      onDragOver: (e) => {
        e.preventDefault(), i.onDragOver(i.index);
      },
      onDragEnd: i.onDragEnd,
      children: /* @__PURE__ */ M("div", { children: [
        dr,
        /* @__PURE__ */ f("span", { children: i.title }),
        /* @__PURE__ */ f("button", { className: "closeIcon", onClick: () => i.onDelete(i.index), children: hr })
      ] })
    }
  );
}
function pr(i) {
  const [e, t] = L(!1), [s, n] = L(i.options), [a, r] = L(null), o = (m) => {
    i.onDragComplete(m), n(m);
  }, c = (m) => {
    const C = [...s];
    C.splice(m, 1), o(C);
  }, l = (m) => {
    r(m);
  }, h = (m) => {
    if (a === m || a === null) return;
    const C = [...s], v = C.splice(a, 1)[0];
    C.splice(m, 0, v), r(m), n(C);
  }, d = () => {
    i.onDragComplete(s), r(null);
  };
  let u = "dropdown draggable";
  return i.subdropdown && (u += " subdropdown"), /* @__PURE__ */ M("div", { className: u, onMouseEnter: () => t(!0), onMouseLeave: () => t(!1), children: [
    /* @__PURE__ */ f(rs, { title: i.title }),
    /* @__PURE__ */ f("ul", { className: "reorder-list", style: { display: e ? "block" : "none" }, children: s.map((m, C) => /* @__PURE__ */ f(
      ur,
      {
        title: m,
        index: C,
        draggingIndex: a,
        onDelete: c,
        onDragStart: l,
        onDragOver: h,
        onDragEnd: d
      },
      m
    )) })
  ] });
}
function mr(i) {
  const [e, t] = L(!1), s = [];
  i.options.map((a, r) => {
    i.onSelect !== void 0 && (a.onSelect = i.onSelect), s.push(/* @__PURE__ */ f(fr, { option: a }, r));
  });
  let n = "dropdown";
  return i.subdropdown && (n += " subdropdown"), /* @__PURE__ */ M(
    "div",
    {
      className: n,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1),
      children: [
        /* @__PURE__ */ f(rs, { title: i.title }),
        /* @__PURE__ */ f(
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
function fr(i) {
  const { option: e } = i, [t, s] = L("");
  let n;
  switch (e.type) {
    case "draggable":
      n = /* @__PURE__ */ f(
        pr,
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
      n = /* @__PURE__ */ f(
        mr,
        {
          title: e.title,
          options: e.value,
          onSelect: e.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      n = /* @__PURE__ */ f(
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
  return /* @__PURE__ */ f("li", { className: t === e.title ? "selected" : "", children: n }, $());
}
function Ke(i) {
  const [e, t] = L(i.open !== void 0 ? i.open : !1), [s, n] = L(i.visible !== void 0 ? i.visible : !1), a = !e || i.children === void 0, r = () => {
    i.three.dispatchEvent({ type: P.REMOVE_SCENE, value: i.scene });
  };
  return /* @__PURE__ */ M("div", { className: `accordion ${a ? "hide" : ""}`, children: [
    /* @__PURE__ */ M(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const o = !e;
          i.onToggle !== void 0 && i.onToggle(o), t(o);
        },
        children: [
          /* @__PURE__ */ f(
            "p",
            {
              className: `status ${e ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ f("p", { className: "label", children: ft(i.label) })
        ]
      }
    ),
    i.onRefresh ? /* @__PURE__ */ M(K, { children: [
      /* @__PURE__ */ f(
        "button",
        {
          className: "visibility",
          style: {
            opacity: s ? 1 : 0.25
          },
          onClick: () => {
            const c = i.three.getScene(i.scene.uuid);
            if (c) {
              const l = !c.visible;
              c.visible = l, n(l);
            }
          }
        }
      ),
      /* @__PURE__ */ f("button", { className: "refresh", onClick: i.onRefresh }),
      /* @__PURE__ */ f("button", { className: "remove", onClick: r })
    ] }) : null,
    i.button,
    /* @__PURE__ */ f("div", { className: e ? "open" : "", children: /* @__PURE__ */ f("div", { children: i.children }) }, Math.random())
  ] });
}
function as(i) {
  if (i.child === void 0)
    return console.log("Hermes - No child attached"), null;
  const e = z(null), [t, s] = L(!1), n = i.child.children.length > 0, a = [];
  return i.child.children.length > 0 && i.child.children.map((r, o) => {
    a.push(/* @__PURE__ */ f(as, { child: r, three: i.three }, o));
  }), Ee(() => {
    if (i.child) {
      const r = i.child.uuid.split(".")[0], o = i.three.getScene(r);
      if (o !== null)
        try {
          const c = o.getObjectByProperty("uuid", i.child.uuid);
          c !== void 0 ? e.current.style.opacity = c.visible ? "1" : "0.25" : console.log(`Hermes - Can't find child: ${i.child.uuid}`);
        } catch (c) {
          console.log("Error looking for child:", c), console.log(i.child), console.log(i.three.scenes), console.log(o);
        }
      else
        console.log(`Hermes (ChildObject) - Can't find Scene: ${r} with child UUID: ${i.child.uuid}`, i.three.scenes, i.three.scene, o);
    }
  }, [t]), /* @__PURE__ */ M("div", { className: "childObject", children: [
    /* @__PURE__ */ M("div", { className: "child", children: [
      n ? /* @__PURE__ */ f(
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
      /* @__PURE__ */ f(
        "button",
        {
          className: "name",
          style: {
            left: n ? "20px" : "5px"
          },
          onClick: () => {
            i.child !== void 0 ? (i.three.getObject(i.child.uuid), !t && n && s(!0)) : console.log("Hermes - No child attached...");
          },
          children: i.child.name.length > 0 ? `${i.child.name} (${i.child.type})` : `${i.child.type}::${i.child.uuid}`
        }
      ),
      /* @__PURE__ */ f(
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
                  const c = "visible", l = !o.visible;
                  e.current.style.opacity = l ? "1" : "0.25", i.three.updateObject(i.child.uuid, c, l), V(o, c, l);
                } else
                  console.log(`Hermes - Couldn't find object: ${i.child.uuid}`, r);
              } else
                console.log(`Hermes - Couldn't find object in scene: ${i.child.uuid}, ${i.child.name}`);
            }
          }
        }
      ),
      /* @__PURE__ */ f("div", { className: `icon ${rr(i.child)}` })
    ] }),
    /* @__PURE__ */ f("div", { className: t ? "open" : "", children: /* @__PURE__ */ f("div", { className: "container", children: a }) })
  ] }, Math.random());
}
function Dt(i) {
  const e = [];
  return i.child?.children.map((t, s) => {
    e.push(/* @__PURE__ */ f(as, { child: t, scene: i.scene, three: i.three }, s));
  }), /* @__PURE__ */ f("div", { className: `scene ${i.class !== void 0 ? i.class : ""}`, children: e });
}
function We(i) {
  const [e, t] = L(i.defaultValue);
  return Ee(() => {
    let s = !1, n = -1, a = 0, r = i.defaultValue, o = !1;
    const c = (m) => {
      o = m.ctrlKey;
    }, l = (m) => {
      s = !0, a = Number(i.input.current?.value), n = m.clientX, document.addEventListener("mouseup", d, !1), document.addEventListener("mousemove", h, !1), document.addEventListener("contextmenu", d, !1);
    }, h = (m) => {
      if (!s) return;
      const C = i.step !== void 0 ? i.step : 1, v = (m.clientX - n) * C * (o ? 10 : 1);
      r = Number((a + v).toFixed(4)), i.min !== void 0 && (r = Math.max(r, i.min)), i.max !== void 0 && (r = Math.min(r, i.max)), i.onChange !== void 0 && i.onChange(r), t(r);
    }, d = () => {
      s = !1, document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d);
    }, u = (m) => {
      const C = Number(m.target.value);
      i.onChange !== void 0 && i.onChange(C), t(C);
    };
    return i.label.current?.addEventListener("mousedown", l, !1), i.sliderRef !== void 0 && i.sliderRef.current?.addEventListener("input", u), document.addEventListener("keydown", c, !1), document.addEventListener("keyup", c, !1), () => {
      i.label.current?.removeEventListener("mousedown", l), i.sliderRef !== void 0 && i.sliderRef.current?.removeEventListener("input", u), document.removeEventListener("mouseup", d), document.removeEventListener("mousemove", h), document.removeEventListener("contextmenu", d), document.removeEventListener("keydown", c), document.addEventListener("keyup", c, !1);
    };
  }, []), e;
}
function be(i) {
  const e = z(null), t = z(null), [s, n] = L(i.value);
  return We({
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
  }), /* @__PURE__ */ M(K, { children: [
    i.type === "number" && /* @__PURE__ */ f(
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
        name: $(),
        onChange: (a) => {
          if (n(a.target.value), a.target.value.length === 0) return;
          const r = Number(a.target.value);
          isNaN(r) || i.onChange !== void 0 && i.onChange(i.prop, r);
        }
      }
    ),
    i.type === "range" && /* @__PURE__ */ M(K, { children: [
      /* @__PURE__ */ f(
        "input",
        {
          type: "text",
          value: s.toString(),
          disabled: i.disabled,
          ref: e,
          className: "min",
          name: $(),
          onChange: (a) => {
            if (a.target.value.length === 0) return;
            const r = Number(a.target.value);
            isNaN(r) || (n(r), i.onChange !== void 0 && i.onChange(i.prop, r));
          }
        }
      ),
      /* @__PURE__ */ f(
        "input",
        {
          disabled: i.disabled,
          type: "range",
          value: s,
          min: i.min,
          max: i.max,
          step: i.step,
          ref: t,
          name: $(),
          onChange: mt
        }
      )
    ] })
  ] });
}
function gr(i) {
  const e = z(null), t = z(null), s = z(null), n = z(null), a = z(null), r = z(null), o = z(null), c = z(null), l = z(null), h = z(null), [d, u] = L(i.value.x), [m, C] = L(i.value.y), [v, y] = L({
    min: Math.min(i.min, Math.min(i.value.x, i.value.y)),
    max: Math.max(i.max, Math.max(i.value.x, i.value.y))
  }), [g, _] = L(!1);
  We({
    label: o,
    input: e,
    defaultValue: d,
    min: v.min,
    max: v.max,
    step: 0.01,
    onChange: (x) => {
      u(x), i.onChange({ target: { value: { x, y: m } } });
    }
  }), We({
    label: c,
    input: t,
    defaultValue: m,
    min: v.min,
    max: v.max,
    step: 0.01,
    onChange: (x) => {
      C(x), i.onChange({ target: { value: { x: d, y: x } } });
    }
  }), We({
    label: l,
    input: s,
    defaultValue: v.min,
    min: v.min - 1,
    max: v.max + 1,
    step: 0.01,
    onChange: (x) => {
      y({ min: x, max: v.max });
    }
  }), We({
    label: h,
    input: n,
    defaultValue: v.max,
    min: v.min - 1,
    max: v.max + 1,
    step: 0.01,
    onChange: (x) => {
      y({ min: v.min, max: x });
    }
  });
  function E() {
    g || (window.addEventListener("mousemove", b), window.addEventListener("mouseup", S), _(!0));
  }
  function S() {
    window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", S), _(!1);
  }
  function b(x) {
    const N = a.current.getBoundingClientRect(), J = Ce(0, 99, x.clientX - N.left) / 99, ae = 1 - Ce(0, 99, x.clientY - N.top) / 99, me = te(je(v.min, v.max, J), 3), Se = te(je(v.min, v.max, ae), 3);
    i.onChange({ target: { value: { x: me, y: Se } } }), u(me), C(Se);
  }
  function O() {
    const x = Number(s.current.value);
    y({ min: x, max: v.max }), d < x && u(Ce(x, v.max, d)), m < x && C(Ce(x, v.max, m));
  }
  function w() {
    const x = Number(n.current.value);
    y({ min: v.min, max: x }), d > x && u(Ce(v.min, x, d)), m > x && C(Ce(v.min, x, m));
  }
  Ee(() => {
    r.current.style.left = `${Zt(v.min, v.max, d) * 100}%`, r.current.style.top = `${(1 - Zt(v.min, v.max, m)) * 100}%`;
  }, [v, d, m]);
  const D = i.step !== void 0 ? i.step : 0.01;
  return /* @__PURE__ */ M("div", { className: "vector2", children: [
    /* @__PURE__ */ M("div", { className: "fields", children: [
      /* @__PURE__ */ M("div", { children: [
        /* @__PURE__ */ f("span", { ref: o, children: "X" }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: e,
            type: "number",
            value: d,
            min: v.min,
            max: v.max,
            step: D,
            name: $(),
            onChange: (x) => {
              if (u(x.target.value), x.target.value.length === 0) return;
              const N = Number(x.target.value);
              isNaN(N) || (i.onChange({ target: { value: { x: N, y: m } } }), N < v.min && y({ min: N, max: v.max }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ M("div", { children: [
        /* @__PURE__ */ f("span", { ref: c, children: "Y" }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: t,
            type: "number",
            value: m,
            min: v.min,
            max: v.max,
            step: D,
            name: $(),
            onChange: (x) => {
              if (C(x.target.value), x.target.value.length === 0) return;
              const N = Number(x.target.value);
              isNaN(N) || (i.onChange({ target: { value: { x: d, y: N } } }), N > v.max && y({ min: v.min, max: N }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ M("div", { children: [
        /* @__PURE__ */ f("span", { ref: l, children: "Min" }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: s,
            type: "number",
            value: v.min,
            step: D,
            name: $(),
            onChange: O
          }
        )
      ] }),
      /* @__PURE__ */ M("div", { children: [
        /* @__PURE__ */ f("span", { ref: h, children: "Max" }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: n,
            type: "number",
            value: v.max,
            step: D,
            name: $(),
            onChange: w
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ M("div", { className: "input", ref: a, onMouseDown: E, onMouseUp: S, children: [
      /* @__PURE__ */ f("div", { className: "x" }),
      /* @__PURE__ */ f("div", { className: "y" }),
      /* @__PURE__ */ f("div", { className: "pt", ref: r })
    ] })
  ] });
}
function wi(i) {
  const e = i.value.x !== void 0 && i.value.y !== void 0 && i.value.z !== void 0, t = i.value.isEuler !== void 0, s = i.value.elements !== void 0, n = i.step !== void 0 ? i.step : 0.01, a = [];
  if (t) {
    const r = qe(() => i.value, []);
    ["_x", "_y", "_z"].forEach((c) => {
      const l = z(null);
      a.push(
        /* @__PURE__ */ M("div", { children: [
          /* @__PURE__ */ f("span", { ref: l, children: c.substring(1).toUpperCase() }),
          /* @__PURE__ */ f(
            be,
            {
              value: hn(r[c]),
              type: "number",
              prop: c,
              step: 0.1,
              labelRef: l,
              onChange: (h, d) => {
                r[h] = Wt(d), i.onChange({ target: { value: r } });
              }
            }
          )
        ] }, c)
      );
    });
  } else if (e) {
    const r = qe(() => i.value, []), o = (l, h) => {
      r[l] = h, i.onChange({ target: { value: r } });
    };
    ["x", "y", "z"].forEach((l) => {
      const h = z(null);
      a.push(
        /* @__PURE__ */ M("div", { children: [
          /* @__PURE__ */ f("label", { ref: h, children: l.toUpperCase() }),
          /* @__PURE__ */ f(
            be,
            {
              value: r[l],
              type: "number",
              prop: l,
              step: n,
              labelRef: h,
              onChange: o
            }
          )
        ] }, l)
      );
    });
  } else if (s) {
    const r = qe(() => i.value, []), o = (c, l) => {
      const h = Number(c);
      r.elements[h] = l, i.onChange({ target: { value: r } });
    };
    for (let c = 0; c < 9; c++) {
      const l = z(null);
      a.push(
        /* @__PURE__ */ M("div", { children: [
          /* @__PURE__ */ f("label", { ref: l, children: c + 1 }),
          /* @__PURE__ */ f(
            be,
            {
              value: r.elements[c],
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
  return /* @__PURE__ */ f("div", { className: "grid3", children: a }, Math.random().toString());
}
function vr(i) {
  const e = i.value.x !== void 0, t = i.step !== void 0 ? i.step : 0.01, s = [];
  if (e) {
    const n = qe(() => i.value, []), a = (o, c) => {
      n[o] = c, i.onChange({ target: { value: n } });
    };
    ["x", "y", "z", "w"].forEach((o) => {
      const c = z(null);
      s.push(
        /* @__PURE__ */ M("div", { children: [
          /* @__PURE__ */ f("label", { ref: c, children: o.toUpperCase() }),
          /* @__PURE__ */ f(
            be,
            {
              value: n[o],
              type: "number",
              prop: o,
              step: t,
              labelRef: c,
              onChange: a
            }
          )
        ] }, o)
      );
    });
  } else {
    const n = qe(() => i.value, []), a = (r, o) => {
      const c = Number(r);
      n.elements[c] = o, i.onChange({ target: { value: n } });
    };
    for (let r = 0; r < 16; r++) {
      const o = z(null);
      s.push(
        /* @__PURE__ */ M("div", { children: [
          /* @__PURE__ */ f("span", { ref: o, children: r + 1 }),
          /* @__PURE__ */ f(
            be,
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
  return /* @__PURE__ */ f("div", { className: "grid4", children: s });
}
function _r(i) {
  return !(i === "defaultAttributeValues" || i === "forceSinglePass" || i === "linecap" || i === "linejoin" || i === "linewidth" || i === "normalMapType" || i === "precision" || i === "shadowSide" || i === "uniformsGroups" || i === "uniformsNeedUpdate" || i === "userData" || i === "version" || i === "wireframeLinecap" || i === "wireframeLinejoin" || i === "wireframeLinewidth" || i.slice(0, 4) === "clip" || i.slice(0, 7) === "polygon" || i.slice(0, 7) === "stencil" || i.slice(0, 2) === "is");
}
function Cr(i) {
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
function bt(i) {
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
function os(i) {
  const e = i.toLowerCase();
  return e.search("intensity") > -1 || e === "anisotropyrotation" || e === "blendalpha" || e === "bumpscale" || e === "clearcoatroughness" || e === "displacementbias" || e === "displacementscale" || e === "metalness" || e === "opacity" || e === "reflectivity" || e === "refractionratio" || e === "roughness" || e === "sheenroughness";
}
function yr() {
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
const br = [
  {
    title: "Front",
    value: bs
  },
  {
    title: "Back",
    value: Es
  },
  {
    title: "Double",
    value: ei
  }
], Er = [
  {
    title: "No Blending",
    value: Ms
  },
  {
    title: "Normal",
    value: Hi
  },
  {
    title: "Additive",
    value: As
  },
  {
    title: "Subtractive",
    value: Rs
  },
  {
    title: "Multiply",
    value: Ps
  },
  {
    title: "Custom",
    value: Ct
  }
], Sr = [
  {
    title: "Add",
    value: Je
  },
  {
    title: "Subtract",
    value: Os
  },
  {
    title: "Reverse Subtract",
    value: ws
  },
  {
    title: "Min",
    value: xs
  },
  {
    title: "Max",
    value: Ts
  }
], Or = [
  {
    title: "Zero",
    value: Gi
  },
  {
    title: "One",
    value: yt
  },
  {
    title: "Src Color",
    value: Yi
  },
  {
    title: "One Minus Src Color",
    value: $i
  },
  {
    title: "Src Alpha",
    value: vt
  },
  {
    title: "One Minus Src Alpha",
    value: _t
  },
  {
    title: "Dst Alpha",
    value: Wi
  },
  {
    title: "One Minus Dst Alpha",
    value: Zi
  },
  {
    title: "Dst Color",
    value: Qt
  },
  {
    title: "One Minus Dst Color",
    value: Jt
  },
  {
    title: "Src Alpha Saturate",
    value: Ss
  },
  {
    title: "Constant Color",
    value: qi
  },
  {
    title: "One Minus Constant Color",
    value: Ki
  },
  {
    title: "Constant Alpha",
    value: Xi
  },
  {
    title: "One Minus Constant Alpha",
    value: ji
  }
], wr = [
  {
    title: "Zero",
    value: Gi
  },
  {
    title: "One",
    value: yt
  },
  {
    title: "Src Color",
    value: Yi
  },
  {
    title: "One Minus Src Color",
    value: $i
  },
  {
    title: "Src Alpha",
    value: vt
  },
  {
    title: "One Minus Src Alpha",
    value: _t
  },
  {
    title: "Dst Alpha",
    value: Wi
  },
  {
    title: "One Minus Dst Alpha",
    value: Zi
  },
  {
    title: "Dst Color",
    value: Qt
  },
  {
    title: "One Minus Dst Color",
    value: Jt
  },
  {
    title: "Constant Color",
    value: qi
  },
  {
    title: "One Minus Constant Color",
    value: Ki
  },
  {
    title: "Constant Alpha",
    value: Xi
  },
  {
    title: "One Minus Constant Alpha",
    value: ji
  }
];
function ze(i, e) {
  i.needsUpdate = !0, i.type = "option", i.options = e;
}
function xr(i, e, t, s) {
  return {
    type: "boolean",
    title: bt(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (n, a) => {
      s.updateObject(t.uuid, `material.${i}`, a), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const r = s.getScene(t.uuid);
      if (r !== null) {
        const o = r.getObjectByProperty("uuid", t.uuid);
        V(o, `material.${i}`, a);
      }
    }
  };
}
function Tr(i, e, t, s) {
  const n = {
    type: "number",
    title: bt(i),
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
        const c = o.getObjectByProperty("uuid", t.uuid);
        V(c, `material.${i}`, r);
      }
    }
  };
  switch (i) {
    case "blending":
      ze(n, Er);
      break;
    case "blendDst":
      ze(n, wr);
      break;
    case "blendEquation":
      ze(n, Sr);
      break;
    case "blendSrc":
      ze(n, Or);
      break;
    case "side":
      ze(n, br);
      break;
  }
  return os(i) && (n.value = Number(e), n.type = "range", n.min = Math.min(0, n.value), n.max = Math.max(1, n.value), n.step = 0.01), n;
}
function Mr(i, e, t, s) {
  const n = {
    type: "string",
    title: bt(i),
    prop: i,
    value: e,
    needsUpdate: !0,
    onChange: (r, o) => {
      s.updateObject(t.uuid, `material.${i}`, o), s.updateObject(t.uuid, "material.needsUpdate", !0);
      const c = s.getScene(t.uuid);
      if (c !== null) {
        const l = c.getObjectByProperty("uuid", t.uuid);
        V(l, `material.${i}`, o);
      }
    },
    onKeyDown: (r) => {
    }
  };
  return (i === "vertexShader" || i === "fragmentShader") && (n.type = "field", n.disabled = !1, n.latest = n.value, n.onChange = (r, o) => {
    n.latest = o, s.updateObject(t.uuid, `material.${i}`, o);
    const c = s.getScene(t.uuid);
    if (c !== null) {
      const l = c.getObjectByProperty("uuid", t.uuid);
      V(l, `material.${i}`, o);
    }
  }, n.onKeyDown = (r) => {
    if (r.key === "Enter" && (r.altKey || r.metaKey)) {
      s.updateObject(t.uuid, "material.needsUpdate", !0);
      const o = s.getScene(t.uuid);
      if (o !== null) {
        const c = o.getObjectByProperty("uuid", t.uuid);
        V(c, "material.needsUpdate", !0);
      }
    }
  }), n;
}
function Ar(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z === void 0;
}
function Rr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w === void 0;
}
function Pr(i) {
  return i.x !== void 0 && i.y !== void 0 && i.z !== void 0 && i.w !== void 0;
}
function Xt(i) {
  i.sort((e, t) => e.title < t.title ? -1 : e.title > t.title ? 1 : 0);
}
function Ze(i, e, t, s, n = "", a = !1) {
  const r = bt(i).split(".")[0].replaceAll("[", "").replaceAll("]", ""), o = n.length > 0 ? `${n}.${i}` : i, c = typeof e;
  if (c === "boolean" || c === "string")
    return {
      title: r,
      prop: o,
      type: c,
      value: e,
      disabled: a,
      onChange: (l, h) => {
        s.updateObject(t.uuid, `material.${o}`, h);
        const d = s.getScene(t.uuid);
        if (d !== null) {
          const u = d.getObjectByProperty("uuid", t.uuid);
          V(u, `material.${o}`, h);
        }
      }
    };
  if (c === "number") {
    const l = {
      title: r,
      prop: o,
      type: "number",
      value: e,
      step: 0.01,
      disabled: a,
      onChange: (h, d) => {
        s.updateObject(t.uuid, `material.${o}`, d);
        const u = s.getScene(t.uuid);
        if (u !== null) {
          const m = u.getObjectByProperty("uuid", t.uuid);
          V(m, `material.${o}`, d);
        }
      }
    };
    return os(r) && (l.type = "range", l.min = 0, l.max = 1), l;
  } else {
    if (e.isColor)
      return {
        title: r,
        prop: o,
        type: "color",
        value: e,
        disabled: a,
        onChange: (l, h) => {
          const d = new le(h);
          s.updateObject(t.uuid, `material.${o}`, d);
          const u = s.getScene(t.uuid);
          if (u !== null) {
            const m = u.getObjectByProperty("uuid", t.uuid);
            V(m, `material.${o}`, d);
          }
        }
      };
    if (Array.isArray(e)) {
      const l = [];
      for (const h in e) {
        const d = e[h], u = `[${h.toString()}]`;
        if (d.value !== void 0) {
          const m = Ze(`${u}.value`, d.value, t, s, o, a);
          m !== void 0 && l.push(m);
        } else {
          const m = Ze(u, d, t, s, o, a);
          m !== void 0 && l.push(m);
        }
      }
      if (l.length > 0)
        return Xt(l), {
          title: r,
          items: l
        };
    } else {
      if (Ar(e))
        return {
          title: r,
          prop: o,
          type: "vector2",
          value: e,
          disabled: a,
          onChange: (l, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const d = s.getScene(t.uuid);
            if (d !== null) {
              const u = d.getObjectByProperty("uuid", t.uuid);
              V(u, `material.${o}`, h);
            }
          }
        };
      if (Rr(e))
        return {
          title: r,
          prop: o,
          type: "grid3",
          value: e,
          disabled: a,
          onChange: (l, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const d = s.getScene(t.uuid);
            if (d !== null) {
              const u = d.getObjectByProperty("uuid", t.uuid);
              V(u, `material.${o}`, h);
            }
          }
        };
      if (Pr(e))
        return {
          title: r,
          prop: o,
          type: "grid4",
          value: e,
          disabled: a,
          onChange: (l, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const d = s.getScene(t.uuid);
            if (d !== null) {
              const u = d.getObjectByProperty("uuid", t.uuid);
              V(u, `material.${o}`, h);
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
          onChange: (l, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const d = s.getScene(t.uuid);
            if (d !== null) {
              const u = d.getObjectByProperty("uuid", t.uuid);
              V(u, `material.${o}`, h);
            }
          }
        };
      if (e.src !== void 0)
        return {
          title: r,
          type: "image",
          value: e,
          disabled: a,
          onChange: (l, h) => {
            const d = Cr(i), u = n.length > 0 ? `${n}.${d}` : d;
            s.createTexture(t.uuid, `material.${u}`, h);
            const m = s.getScene(t.uuid);
            if (m !== null) {
              const C = m.getObjectByProperty("uuid", t.uuid);
              if (C !== void 0) {
                const v = (y) => {
                  const g = C.material, _ = u.split(".");
                  switch (_.length) {
                    case 1:
                      g[_[0]] = y;
                      break;
                    case 2:
                      g[_[0]][_[1]] = y;
                      break;
                    case 3:
                      g[_[0]][_[1]][_[2]] = y;
                      break;
                    case 4:
                      g[_[0]][_[1]][_[2]][_[3]] = y;
                      break;
                    case 5:
                      g[_[0]][_[1]][_[2]][_[3]][_[4]] = y;
                      break;
                  }
                  g.needsUpdate = !0;
                };
                h.src.length > 0 ? ns(h.src).then((y) => {
                  y.offset.set(h.offset[0], h.offset[1]), y.repeat.set(h.repeat[0], h.repeat[1]), v(y);
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
          onChange: (l, h) => {
            s.updateObject(t.uuid, `material.${o}`, h);
            const d = s.getScene(t.uuid);
            if (d !== null) {
              const u = d.getObjectByProperty("uuid", t.uuid);
              V(u, `material.${o}`, h);
            }
          }
        };
      {
        const l = [], h = i === "defines" || i === "extensions";
        try {
          for (const d in e) {
            const u = e[d];
            if (u !== void 0)
              if (u.value !== void 0) {
                const m = Ze(`${d}.value`, u.value, t, s, o, h);
                m !== void 0 && l.push(m);
              } else {
                const m = Ze(d, u, t, s, o, h);
                m !== void 0 && l.push(m);
              }
          }
        } catch {
          console.log("Hermes - Issue cycling through material object:", i, e);
        }
        if (l.length > 0)
          return Xt(l), {
            title: r,
            items: l
          };
      }
    }
  }
}
function xi(i, e, t) {
  const s = [];
  for (const n in i) {
    if (!_r(n) || n.search("Node") > -1) continue;
    const a = typeof i[n], r = i[n];
    if (a === "boolean")
      s.push(xr(n, r, e, t));
    else if (a === "number")
      s.push(Tr(n, r, e, t));
    else if (a === "string")
      s.push(Mr(n, r, e, t));
    else if (a === "object") {
      const o = Ze(n, r, e, t);
      o !== void 0 && s.push(o);
    } else r !== void 0 && console.log("Hermes - Other Material Prop Type:", n, a, r);
  }
  return Xt(s), s.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      t.updateObject(e.uuid, "material.needsUpdate", !0);
      const n = t.getScene(e.uuid);
      if (n !== null) {
        const a = n.getObjectByProperty("uuid", e.uuid);
        V(a, "material.needsUpdate", !0);
      }
    }
  }), s;
}
function Dr(i, e) {
  function t() {
    return `${e.name}_material`;
  }
  const s = localStorage.getItem(t()), n = s !== null ? s === "open" : !1;
  function a(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const r = i.material;
  if (Array.isArray(r)) {
    const o = [], c = r.length;
    for (let l = 0; l < c; l++)
      o.push(
        /* @__PURE__ */ f(
          Q,
          {
            three: e,
            title: `Material ${l}`,
            items: xi(r[l], i, e)
          },
          `Material ${l}`
        )
      );
    return /* @__PURE__ */ f(K, { children: o });
  } else
    return /* @__PURE__ */ f(
      Q,
      {
        three: e,
        title: "Material",
        items: xi(r, i, e),
        expanded: n,
        onToggle: (o) => {
          a(o);
        }
      }
    );
}
const Ti = "data:image/gif;base64,R0lGODlhDgFkAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZGJhM2RhM2I1LCAyMDIzLzEyLzE1LTEwOjQyOjM3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjUuNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDk3M0NEODAxQjQxMUVGODVGNENDMkUyMUExNDk1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDk3M0NEOTAxQjQxMUVGODVGNENDMkUyMUExNDk1NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4ODc3Qzg5MDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4ODc3QzhBMDFCMzExRUY4NUY0Q0MyRTIxQTE0OTU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAA4BZAAAAv+Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqTkJAGDQ+dnpuekmGgAKejpKuiZqmprKqoZKGyrbOlqrejub6xvLGyw8TFzcprurGuvqybxq7ETbrItsCz0l7Zpc+6p9/cS967w9/S2FTF0u/mzehK4Oqz3eTl9vf4+fr7/P3+//DzCgwIEECxo8iDChwoUMGzp8CDGixIkUK1q8iDGjxo0XHDt6/AgypMiRJEuaPIkypcqVLFt+KwAAOw==";
function Ir(i) {
  const e = i.step !== void 0 ? i.step : 0.01, t = z(null), s = z(null), n = z(null), a = z(null), r = z(null), [o] = L(i.value), [c, l] = L(i.value.offset[0]), [h, d] = L(i.value.offset[1]), [u, m] = L(i.value.repeat[0]), [C, v] = L(i.value.repeat[1]);
  function y(_, E, S, b, O) {
    if (i.onChange !== void 0) {
      const w = i.prop !== void 0 ? i.prop : i.title;
      i.onChange(w, {
        src: _,
        offset: [E, S],
        repeat: [b, O]
      });
    }
  }
  function g(_) {
    const E = t.current.src, S = _.target.value;
    switch (_.target) {
      case s.current:
        l(S), y(E, S, h, u, C);
        break;
      case n.current:
        d(S), y(E, c, S, u, C);
        break;
      case a.current:
        m(S), y(E, c, h, S, C);
        break;
      case r.current:
        v(S), y(E, c, h, u, S);
        break;
    }
  }
  return /* @__PURE__ */ M("div", { className: "imageField", children: [
    /* @__PURE__ */ f("img", { alt: i.title, ref: t, onClick: () => {
      yr().then((_) => {
        t.current.src = _, y(_, c, h, u, C);
      });
    }, src: o.src.length > 0 ? o.src : Ti }),
    /* @__PURE__ */ M("div", { className: "fields", children: [
      /* @__PURE__ */ M("div", { children: [
        /* @__PURE__ */ f("span", { children: "Offset:" }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: s,
            type: "number",
            value: c,
            step: e,
            name: $(),
            onChange: g
          }
        ),
        /* @__PURE__ */ f(
          "input",
          {
            ref: n,
            type: "number",
            value: h,
            step: e,
            name: $(),
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ M("div", { children: [
        /* @__PURE__ */ f("span", { children: "Repeat:" }),
        /* @__PURE__ */ f(
          "input",
          {
            ref: a,
            type: "number",
            value: u,
            step: e,
            name: $(),
            onChange: g
          }
        ),
        /* @__PURE__ */ f(
          "input",
          {
            ref: r,
            type: "number",
            value: C,
            step: e,
            name: $(),
            onChange: g
          }
        )
      ] }),
      /* @__PURE__ */ f("button", { onClick: () => {
        y("", c, h, u, C), t.current.src = Ti;
      }, children: "Clear" })
    ] })
  ] });
}
function ct(i) {
  let e = i.value;
  e !== void 0 && (e.isColor !== void 0 ? e = Ci(i.value) : i.type === "color" && (e = Ci(new le().setStyle(i.value, Xe))));
  const [t, s] = L(e), n = z(null), a = (l) => {
    let h = l.target.value;
    if (i.type === "boolean")
      h = l.target.checked;
    else if (i.type === "option" && (typeof i.value == "number" ? h = Number(h) : typeof i.value == "boolean" ? h = !!h : typeof i.value == "object" && (h = JSON.parse(h)), i.options !== void 0)) {
      const d = i.options.length;
      for (let u = 0; u < d && i.options[u].value !== h; u++)
        ;
    }
    s(h), i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, h);
  }, r = {};
  i.disabled && (r.opacity = 0.8);
  const o = i.type === "field" || i.type === "string" && (t.length > 100 || t.search(`
`) > -1), c = o || i.type === "image" || i.type === "vector2";
  return /* @__PURE__ */ M("div", { className: `field ${c ? "block" : ""}`, style: r, children: [
    i.type !== "button" && /* @__PURE__ */ f("span", { ref: n, children: ft(i.title) }, "fieldLabel"),
    i.type === "string" && !o && /* @__PURE__ */ f(
      "input",
      {
        type: "text",
        disabled: i.disabled,
        onChange: a,
        value: t,
        name: $()
      }
    ),
    (i.type === "field" || i.type === "string" && o) && /* @__PURE__ */ f(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: i.disabled !== void 0 ? i.disabled : !0,
        onChange: a,
        onKeyDown: (l) => {
          i.onKeyDown !== void 0 && i.onKeyDown(l);
        },
        value: t,
        name: $()
      }
    ),
    i.type === "boolean" && /* @__PURE__ */ f(
      "input",
      {
        type: "checkbox",
        disabled: i.disabled,
        onChange: a,
        checked: t,
        name: $()
      }
    ),
    i.type === "number" && /* @__PURE__ */ f(
      be,
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
    i.type === "range" && /* @__PURE__ */ f(
      be,
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
    i.type === "color" && /* @__PURE__ */ M(K, { children: [
      /* @__PURE__ */ f("input", { type: "text", value: t.toString(), onChange: a, disabled: i.disabled, className: "color", name: $() }),
      /* @__PURE__ */ f("input", { type: "color", value: t, onChange: a, disabled: i.disabled, name: $() })
    ] }),
    i.type === "button" && /* @__PURE__ */ f(
      "button",
      {
        disabled: i.disabled,
        onClick: () => {
          i.onChange !== void 0 && i.onChange(i.prop !== void 0 ? i.prop : i.title, !0);
        },
        children: i.title
      }
    ),
    i.type === "image" && /* @__PURE__ */ f(Ir, { title: i.title, prop: i.prop, value: i.value, onChange: i.onChange }),
    i.type === "option" && /* @__PURE__ */ f(K, { children: /* @__PURE__ */ f(
      "select",
      {
        onChange: a,
        disabled: i.disabled,
        defaultValue: i.value,
        name: $(),
        children: i.options?.map((l, h) => /* @__PURE__ */ f("option", { value: l.value, children: ft(l.title) }, h))
      }
    ) }),
    i.type === "vector2" && /* @__PURE__ */ f(gr, { step: i.step, value: t, min: 0, max: 1, onChange: a }),
    i.type === "grid3" && /* @__PURE__ */ f(wi, { step: i.step, value: t, onChange: a }),
    i.type === "grid4" && /* @__PURE__ */ f(vr, { step: i.step, value: t, onChange: a }),
    i.type === "euler" && /* @__PURE__ */ f(wi, { step: i.step, value: t, onChange: a })
  ] });
}
function Ur(i) {
  return "items" in i;
}
class Q extends Qe {
  subgroupNames = [];
  subgroupElements = [];
  valueOverrides = /* @__PURE__ */ new Map();
  three;
  constructor(e) {
    super(e), this.three = e.three, this.state = { lastUpdated: Date.now() };
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
    const s = ue(), n = /* @__PURE__ */ f(
      Q,
      {
        three: this.props.three,
        ref: s,
        title: e.title,
        expanded: e.expanded,
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
      if (Ur(t))
        e.push(
          /* @__PURE__ */ f(Q, { three: this.props.three, title: ft(t.title), items: t.items }, Math.random())
        );
      else {
        const s = this.valueOverrides.get(t.title), n = s !== void 0 ? s : t.value;
        e.push(
          /* @__PURE__ */ f(
            ct,
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
    }), this.subgroupElements.forEach((t) => e.push(t)), /* @__PURE__ */ f(
      Ke,
      {
        three: this.props.three,
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
class I extends Qe {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  static three;
  constructor(e) {
    super(e), this.state = { lastUpdate: Date.now() }, I.instance = this, I.three = e.three, e.three.addEventListener(P.ADD_GROUP, this.addGroup), e.three.addEventListener(P.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    this.props.three.removeEventListener(P.ADD_GROUP, this.addGroup), this.props.three.removeEventListener(P.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ f("div", { className: "customGroups", children: I.groups }, this.state.lastUpdate);
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
    }), I.groups.push(
      /* @__PURE__ */ f(
        Q,
        {
          three: this.props.three,
          title: t.title,
          items: s
        },
        Math.random()
      )
    ), I.groupTitles.push(t.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (e) => {
    const t = e.value, s = I.groupTitles.length;
    for (let n = 0; n < s; n++)
      if (t === I.groupTitles[n]) {
        I.groups.splice(n, 1), I.groupTitles.splice(n, 1), this.setState({ lastUpdate: Date.now() });
        return;
      }
  };
  // Static
  static addEditorGroup(e) {
    const t = I.groupTitles.length;
    for (let r = 0; r < t; r++)
      if (I.groupTitles[r] === e.title)
        return I.groupsRefs[r];
    const s = [];
    e.items.forEach((r) => {
      s.push({
        type: r.type,
        prop: r.prop,
        title: r.title !== void 0 ? r.title : r.prop,
        value: r.value,
        min: r.min,
        max: r.max,
        step: r.step,
        options: r.options,
        disabled: r.disabled,
        onChange: (o, c) => {
          e.onUpdate(o, c);
        }
      });
    }), e.subgroups && e.subgroups.length > 0 && e.subgroups.forEach((r) => {
      const o = [];
      r.items.forEach((c) => {
        o.push({
          type: c.type,
          prop: c.prop,
          title: c.title !== void 0 ? c.title : c.prop,
          value: c.value,
          min: c.min,
          max: c.max,
          step: c.step,
          options: c.options,
          disabled: c.disabled,
          onChange: (l, h) => {
            r.onUpdate(l, h);
          }
        });
      }), s.push({
        three: I.three,
        title: r.title,
        expanded: r.expanded,
        items: o
      });
    });
    const n = ue(), a = /* @__PURE__ */ f(
      Q,
      {
        three: I.three,
        ref: n,
        title: e.title,
        expanded: e.expanded,
        items: s
      },
      Math.random()
    );
    return I.groups.push(a), I.groupsRefs.push(n), I.groupTitles.push(e.title), setTimeout(() => {
      I.instance.setState({ lastUpdate: Date.now() });
    }, 0), n;
  }
  static removeEditorGroup(e) {
    const t = I.groupTitles.length;
    for (let s = 0; s < t; s++)
      if (e === I.groupTitles[s]) {
        I.groups.splice(s, 1), I.groupTitles.splice(s, 1), I.instance.setState({ lastUpdate: Date.now() });
        return;
      }
  }
  static removeAllGroups() {
    for (let e = I.groupTitles.length; e > 0; e--)
      I.groups.splice(e, 1), I.groupTitles.splice(e, 1);
    I.instance.setState({ lastUpdate: Date.now() });
  }
}
function Mi(i) {
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
function Lr(i, e) {
  function t() {
    return `${e.name}_camera`;
  }
  const s = localStorage.getItem(t()), n = s !== null ? s === "open" : !1;
  function a(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const r = [];
  if (i.perspectiveCameraInfo !== void 0)
    for (const o in i.perspectiveCameraInfo)
      r.push({
        title: Mi(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: i.perspectiveCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(i.uuid, c, l), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const h = e.getScene(i.uuid);
          if (h !== null) {
            const d = h.getObjectByProperty("uuid", i.uuid);
            d !== void 0 && (V(d, c, l), d.updateProjectionMatrix());
          }
        }
      });
  else if (i.orthographicCameraInfo !== void 0)
    for (const o in i.orthographicCameraInfo)
      r.push({
        title: Mi(o),
        prop: o,
        type: "number",
        step: 0.01,
        value: i.orthographicCameraInfo[o],
        onChange: (c, l) => {
          e.updateObject(i.uuid, c, l), e.requestMethod(i.uuid, "updateProjectionMatrix");
          const h = e.getScene(i.uuid);
          if (h !== null) {
            const d = h.getObjectByProperty("uuid", i.uuid);
            d !== void 0 && (V(d, c, l), d.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ f(
    Q,
    {
      three: e,
      title: "Camera",
      items: r,
      expanded: n,
      onToggle: (o) => {
        a(o);
      }
    }
  );
}
/*!
 * camera-controls
 * https://github.com/yomotsu/camera-controls
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const H = {
  LEFT: 1,
  RIGHT: 2,
  MIDDLE: 4
}, p = Object.freeze({
  NONE: 0,
  ROTATE: 1,
  TRUCK: 2,
  SCREEN_PAN: 4,
  OFFSET: 8,
  DOLLY: 16,
  ZOOM: 32,
  TOUCH_ROTATE: 64,
  TOUCH_TRUCK: 128,
  TOUCH_SCREEN_PAN: 256,
  TOUCH_OFFSET: 512,
  TOUCH_DOLLY: 1024,
  TOUCH_ZOOM: 2048,
  TOUCH_DOLLY_TRUCK: 4096,
  TOUCH_DOLLY_SCREEN_PAN: 8192,
  TOUCH_DOLLY_OFFSET: 16384,
  TOUCH_DOLLY_ROTATE: 32768,
  TOUCH_ZOOM_TRUCK: 65536,
  TOUCH_ZOOM_OFFSET: 131072,
  TOUCH_ZOOM_SCREEN_PAN: 262144,
  TOUCH_ZOOM_ROTATE: 524288
}), De = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function ge(i) {
  return i.isPerspectiveCamera;
}
function de(i) {
  return i.isOrthographicCamera;
}
const Ie = Math.PI * 2, Ai = Math.PI / 2, ls = 1e-5, He = Math.PI / 180;
function ee(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function F(i, e = ls) {
  return Math.abs(i) < e;
}
function k(i, e, t = ls) {
  return F(i - e, t);
}
function Ri(i, e) {
  return Math.round(i / e) * e;
}
function Be(i) {
  return isFinite(i) ? i : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Ve(i) {
  return Math.abs(i) < Number.MAX_VALUE ? i : i * (1 / 0);
}
function st(i, e, t, s, n = 1 / 0, a) {
  s = Math.max(1e-4, s);
  const r = 2 / s, o = r * a, c = 1 / (1 + o + 0.48 * o * o + 0.235 * o * o * o);
  let l = i - e;
  const h = e, d = n * s;
  l = ee(l, -d, d), e = i - l;
  const u = (t.value + r * l) * a;
  t.value = (t.value - r * u) * c;
  let m = e + (l + u) * c;
  return h - i > 0 == m > h && (m = h, t.value = (m - h) / a), m;
}
function Pi(i, e, t, s, n = 1 / 0, a, r) {
  s = Math.max(1e-4, s);
  const o = 2 / s, c = o * a, l = 1 / (1 + c + 0.48 * c * c + 0.235 * c * c * c);
  let h = e.x, d = e.y, u = e.z, m = i.x - h, C = i.y - d, v = i.z - u;
  const y = h, g = d, _ = u, E = n * s, S = E * E, b = m * m + C * C + v * v;
  if (b > S) {
    const fe = Math.sqrt(b);
    m = m / fe * E, C = C / fe * E, v = v / fe * E;
  }
  h = i.x - m, d = i.y - C, u = i.z - v;
  const O = (t.x + o * m) * a, w = (t.y + o * C) * a, D = (t.z + o * v) * a;
  t.x = (t.x - o * O) * l, t.y = (t.y - o * w) * l, t.z = (t.z - o * D) * l, r.x = h + (m + O) * l, r.y = d + (C + w) * l, r.z = u + (v + D) * l;
  const x = y - i.x, N = g - i.y, J = _ - i.z, ae = r.x - y, me = r.y - g, Se = r.z - _;
  return x * ae + N * me + J * Se > 0 && (r.x = y, r.y = g, r.z = _, t.x = (r.x - y) / a, t.y = (r.y - g) / a, t.z = (r.z - _) / a), r;
}
function It(i, e) {
  e.set(0, 0), i.forEach((t) => {
    e.x += t.clientX, e.y += t.clientY;
  }), e.x /= i.length, e.y /= i.length;
}
function Ut(i, e) {
  return de(i) ? (console.warn(`${e} is not supported in OrthographicCamera`), !0) : !1;
}
class kr {
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
var Lt;
const Nr = "2.10.1", nt = 1 / 8, Fr = /Mac/.test((Lt = globalThis?.navigator) === null || Lt === void 0 ? void 0 : Lt.platform);
let T, Di, rt, kt, q, A, U, Ue, Ge, ie, se, ve, Ii, Ui, j, Ye, Le, Li, Nt, ki, Ft, zt, at;
class re extends kr {
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
    T = e.THREE, Di = Object.freeze(new T.Vector3(0, 0, 0)), rt = Object.freeze(new T.Vector3(0, 1, 0)), kt = Object.freeze(new T.Vector3(0, 0, 1)), q = new T.Vector2(), A = new T.Vector3(), U = new T.Vector3(), Ue = new T.Vector3(), Ge = new T.Vector3(), ie = new T.Vector3(), se = new T.Vector3(), ve = new T.Vector3(), Ii = new T.Vector3(), Ui = new T.Vector3(), j = new T.Spherical(), Ye = new T.Spherical(), Le = new T.Box3(), Li = new T.Box3(), Nt = new T.Sphere(), ki = new T.Quaternion(), Ft = new T.Quaternion(), zt = new T.Matrix4(), at = new T.Raycaster();
  }
  /**
   * list all ACTIONs
   * @category Statics
   */
  static get ACTION() {
    return p;
  }
  /**
   * @deprecated Use `cameraControls.mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.
   */
  set verticalDragToForward(e) {
    console.warn("camera-controls: `verticalDragToForward` was removed. Use `mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.");
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
    super(), this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.minDistance = Number.EPSILON, this.maxDistance = 1 / 0, this.infinityDolly = !1, this.minZoom = 0.01, this.maxZoom = 1 / 0, this.smoothTime = 0.25, this.draggingSmoothTime = 0.125, this.maxSpeed = 1 / 0, this.azimuthRotateSpeed = 1, this.polarRotateSpeed = 1, this.dollySpeed = 1, this.dollyDragInverted = !1, this.truckSpeed = 2, this.dollyToCursor = !1, this.dragToOffset = !1, this.boundaryFriction = 0, this.restThreshold = 0.01, this.colliderMeshes = [], this.cancel = () => {
    }, this._enabled = !0, this._state = p.NONE, this._viewport = null, this._changedDolly = 0, this._changedZoom = 0, this._hasRested = !0, this._boundaryEnclosesCamera = !1, this._needsUpdate = !0, this._updatedLastTime = !1, this._elementRect = new DOMRect(), this._isDragging = !1, this._dragNeedsUpdate = !0, this._activePointers = [], this._lockedPointer = null, this._interactiveArea = new DOMRect(0, 0, 1, 1), this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._isUserControllingOffset = !1, this._isUserControllingZoom = !1, this._lastDollyDirection = De.NONE, this._thetaVelocity = { value: 0 }, this._phiVelocity = { value: 0 }, this._radiusVelocity = { value: 0 }, this._targetVelocity = new T.Vector3(), this._focalOffsetVelocity = new T.Vector3(), this._zoomVelocity = { value: 0 }, this._truckInternal = (g, _, E, S) => {
      let b, O;
      if (ge(this._camera)) {
        const w = A.copy(this._camera.position).sub(this._target), D = this._camera.getEffectiveFOV() * He, x = w.length() * Math.tan(D * 0.5);
        b = this.truckSpeed * g * x / this._elementRect.height, O = this.truckSpeed * _ * x / this._elementRect.height;
      } else if (de(this._camera)) {
        const w = this._camera;
        b = this.truckSpeed * g * (w.right - w.left) / w.zoom / this._elementRect.width, O = this.truckSpeed * _ * (w.top - w.bottom) / w.zoom / this._elementRect.height;
      } else
        return;
      S ? (E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y, this._focalOffsetEnd.z, !0) : this.truck(b, 0, !0), this.forward(-O, !0)) : E ? this.setFocalOffset(this._focalOffsetEnd.x + b, this._focalOffsetEnd.y + O, this._focalOffsetEnd.z, !0) : this.truck(b, O, !0);
    }, this._rotateInternal = (g, _) => {
      const E = Ie * this.azimuthRotateSpeed * g / this._elementRect.height, S = Ie * this.polarRotateSpeed * _ / this._elementRect.height;
      this.rotate(E, S, !0);
    }, this._dollyInternal = (g, _, E) => {
      const S = Math.pow(0.95, -g * this.dollySpeed), b = this._sphericalEnd.radius, O = this._sphericalEnd.radius * S, w = ee(O, this.minDistance, this.maxDistance), D = w - O;
      this.infinityDolly && this.dollyToCursor ? this._dollyToNoClamp(O, !0) : this.infinityDolly && !this.dollyToCursor ? (this.dollyInFixed(D, !0), this._dollyToNoClamp(w, !0)) : this._dollyToNoClamp(w, !0), this.dollyToCursor && (this._changedDolly += (this.infinityDolly ? O : w) - b, this._dollyControlCoord.set(_, E)), this._lastDollyDirection = Math.sign(-g);
    }, this._zoomInternal = (g, _, E) => {
      const S = Math.pow(0.95, g * this.dollySpeed), b = this._zoom, O = this._zoom * S;
      this.zoomTo(O, !0), this.dollyToCursor && (this._changedZoom += O - b, this._dollyControlCoord.set(_, E));
    }, typeof T > "u" && console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."), this._camera = e, this._yAxisUpSpace = new T.Quaternion().setFromUnitVectors(this._camera.up, rt), this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert(), this._state = p.NONE, this._target = new T.Vector3(), this._targetEnd = this._target.clone(), this._focalOffset = new T.Vector3(), this._focalOffsetEnd = this._focalOffset.clone(), this._spherical = new T.Spherical().setFromVector3(A.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)), this._sphericalEnd = this._spherical.clone(), this._lastDistance = this._spherical.radius, this._zoom = this._camera.zoom, this._zoomEnd = this._zoom, this._lastZoom = this._zoom, this._nearPlaneCorners = [
      new T.Vector3(),
      new T.Vector3(),
      new T.Vector3(),
      new T.Vector3()
    ], this._updateNearPlaneCorners(), this._boundary = new T.Box3(new T.Vector3(-1 / 0, -1 / 0, -1 / 0), new T.Vector3(1 / 0, 1 / 0, 1 / 0)), this._cameraUp0 = this._camera.up.clone(), this._target0 = this._target.clone(), this._position0 = this._camera.position.clone(), this._zoom0 = this._zoom, this._focalOffset0 = this._focalOffset.clone(), this._dollyControlCoord = new T.Vector2(), this.mouseButtons = {
      left: p.ROTATE,
      middle: p.DOLLY,
      right: p.TRUCK,
      wheel: ge(this._camera) ? p.DOLLY : de(this._camera) ? p.ZOOM : p.NONE
    }, this.touches = {
      one: p.TOUCH_ROTATE,
      two: ge(this._camera) ? p.TOUCH_DOLLY_TRUCK : de(this._camera) ? p.TOUCH_ZOOM_TRUCK : p.NONE,
      three: p.TOUCH_TRUCK
    };
    const s = new T.Vector2(), n = new T.Vector2(), a = new T.Vector2(), r = (g) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const S = this._domElement.getBoundingClientRect(), b = g.clientX / S.width, O = g.clientY / S.height;
        if (b < this._interactiveArea.left || b > this._interactiveArea.right || O < this._interactiveArea.top || O > this._interactiveArea.bottom)
          return;
      }
      const _ = g.pointerType !== "mouse" ? null : (g.buttons & H.LEFT) === H.LEFT ? H.LEFT : (g.buttons & H.MIDDLE) === H.MIDDLE ? H.MIDDLE : (g.buttons & H.RIGHT) === H.RIGHT ? H.RIGHT : null;
      if (_ !== null) {
        const S = this._findPointerByMouseButton(_);
        S && this._disposePointer(S);
      }
      if ((g.buttons & H.LEFT) === H.LEFT && this._lockedPointer)
        return;
      const E = {
        pointerId: g.pointerId,
        clientX: g.clientX,
        clientY: g.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton: _
      };
      this._activePointers.push(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), this._isDragging = !0, u(g);
    }, o = (g) => {
      g.cancelable && g.preventDefault();
      const _ = g.pointerId, E = this._lockedPointer || this._findPointerById(_);
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
          (!this._isDragging && this._lockedPointer || this._isDragging && (g.buttons & H.LEFT) === H.LEFT) && (this._state = this._state | this.mouseButtons.left), this._isDragging && (g.buttons & H.MIDDLE) === H.MIDDLE && (this._state = this._state | this.mouseButtons.middle), this._isDragging && (g.buttons & H.RIGHT) === H.RIGHT && (this._state = this._state | this.mouseButtons.right);
        m();
      }
    }, c = (g) => {
      const _ = this._findPointerById(g.pointerId);
      if (!(_ && _ === this._lockedPointer)) {
        if (_ && this._disposePointer(_), g.pointerType === "touch")
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
        C();
      }
    };
    let l = -1;
    const h = (g) => {
      if (!this._domElement || !this._enabled || this.mouseButtons.wheel === p.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const O = this._domElement.getBoundingClientRect(), w = g.clientX / O.width, D = g.clientY / O.height;
        if (w < this._interactiveArea.left || w > this._interactiveArea.right || D < this._interactiveArea.top || D > this._interactiveArea.bottom)
          return;
      }
      if (g.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === p.ROTATE || this.mouseButtons.wheel === p.TRUCK) {
        const O = performance.now();
        l - O < 1e3 && this._getClientRect(this._elementRect), l = O;
      }
      const _ = Fr ? -1 : -3, E = g.deltaMode === 1 || g.ctrlKey ? g.deltaY / _ : g.deltaY / (_ * 10), S = this.dollyToCursor ? (g.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, b = this.dollyToCursor ? (g.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case p.ROTATE: {
          this._rotateInternal(g.deltaX, g.deltaY), this._isUserControllingRotate = !0;
          break;
        }
        case p.TRUCK: {
          this._truckInternal(g.deltaX, g.deltaY, !1, !1), this._isUserControllingTruck = !0;
          break;
        }
        case p.SCREEN_PAN: {
          this._truckInternal(g.deltaX, g.deltaY, !1, !0), this._isUserControllingTruck = !0;
          break;
        }
        case p.OFFSET: {
          this._truckInternal(g.deltaX, g.deltaY, !0, !1), this._isUserControllingOffset = !0;
          break;
        }
        case p.DOLLY: {
          this._dollyInternal(-E, S, b), this._isUserControllingDolly = !0;
          break;
        }
        case p.ZOOM: {
          this._zoomInternal(-E, S, b), this._isUserControllingZoom = !0;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    }, d = (g) => {
      if (!(!this._domElement || !this._enabled)) {
        if (this.mouseButtons.right === re.ACTION.NONE) {
          const _ = g instanceof PointerEvent ? g.pointerId : 0, E = this._findPointerById(_);
          E && this._disposePointer(E), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c);
          return;
        }
        g.preventDefault();
      }
    }, u = (g) => {
      if (!this._enabled)
        return;
      if (It(this._activePointers, q), this._getClientRect(this._elementRect), s.copy(q), n.copy(q), this._activePointers.length >= 2) {
        const E = q.x - this._activePointers[1].clientX, S = q.y - this._activePointers[1].clientY, b = Math.sqrt(E * E + S * S);
        a.set(0, b);
        const O = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5, w = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        n.set(O, w);
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
        !this._lockedPointer && (g.buttons & H.LEFT) === H.LEFT && (this._state = this._state | this.mouseButtons.left), (g.buttons & H.MIDDLE) === H.MIDDLE && (this._state = this._state | this.mouseButtons.middle), (g.buttons & H.RIGHT) === H.RIGHT && (this._state = this._state | this.mouseButtons.right);
      ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._sphericalEnd.theta = this._spherical.theta, this._sphericalEnd.phi = this._spherical.phi, this._thetaVelocity.value = 0, this._phiVelocity.value = 0), ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.SCREEN_PAN) === p.SCREEN_PAN || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_SCREEN_PAN) === p.TOUCH_SCREEN_PAN || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_SCREEN_PAN) === p.TOUCH_DOLLY_SCREEN_PAN || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_ZOOM_SCREEN_PAN) === p.TOUCH_DOLLY_SCREEN_PAN) && (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0)), ((this._state & p.DOLLY) === p.DOLLY || (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_SCREEN_PAN) === p.TOUCH_DOLLY_SCREEN_PAN || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE) && (this._sphericalEnd.radius = this._spherical.radius, this._radiusVelocity.value = 0), ((this._state & p.ZOOM) === p.ZOOM || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_ZOOM_SCREEN_PAN) === p.TOUCH_ZOOM_SCREEN_PAN || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._zoomEnd = this._zoom, this._zoomVelocity.value = 0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0)), this.dispatchEvent({ type: "controlstart" });
    }, m = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = !1, It(this._activePointers, q);
      const _ = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement ? this._lockedPointer || this._activePointers[0] : null, E = _ ? -_.deltaX : n.x - q.x, S = _ ? -_.deltaY : n.y - q.y;
      if (n.copy(q), ((this._state & p.ROTATE) === p.ROTATE || (this._state & p.TOUCH_ROTATE) === p.TOUCH_ROTATE || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) && (this._rotateInternal(E, S), this._isUserControllingRotate = !0), (this._state & p.DOLLY) === p.DOLLY || (this._state & p.ZOOM) === p.ZOOM) {
        const b = this.dollyToCursor ? (s.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, O = this.dollyToCursor ? (s.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0, w = this.dollyDragInverted ? -1 : 1;
        (this._state & p.DOLLY) === p.DOLLY ? (this._dollyInternal(w * S * nt, b, O), this._isUserControllingDolly = !0) : (this._zoomInternal(w * S * nt, b, O), this._isUserControllingZoom = !0);
      }
      if ((this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_ZOOM) === p.TOUCH_ZOOM || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK || (this._state & p.TOUCH_DOLLY_SCREEN_PAN) === p.TOUCH_DOLLY_SCREEN_PAN || (this._state & p.TOUCH_ZOOM_SCREEN_PAN) === p.TOUCH_ZOOM_SCREEN_PAN || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_ZOOM_ROTATE) === p.TOUCH_ZOOM_ROTATE) {
        const b = q.x - this._activePointers[1].clientX, O = q.y - this._activePointers[1].clientY, w = Math.sqrt(b * b + O * O), D = a.y - w;
        a.set(0, w);
        const x = this.dollyToCursor ? (n.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, N = this.dollyToCursor ? (n.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        (this._state & p.TOUCH_DOLLY) === p.TOUCH_DOLLY || (this._state & p.TOUCH_DOLLY_ROTATE) === p.TOUCH_DOLLY_ROTATE || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_DOLLY_SCREEN_PAN) === p.TOUCH_DOLLY_SCREEN_PAN || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET ? (this._dollyInternal(D * nt, x, N), this._isUserControllingDolly = !0) : (this._zoomInternal(D * nt, x, N), this._isUserControllingZoom = !0);
      }
      ((this._state & p.TRUCK) === p.TRUCK || (this._state & p.TOUCH_TRUCK) === p.TOUCH_TRUCK || (this._state & p.TOUCH_DOLLY_TRUCK) === p.TOUCH_DOLLY_TRUCK || (this._state & p.TOUCH_ZOOM_TRUCK) === p.TOUCH_ZOOM_TRUCK) && (this._truckInternal(E, S, !1, !1), this._isUserControllingTruck = !0), ((this._state & p.SCREEN_PAN) === p.SCREEN_PAN || (this._state & p.TOUCH_SCREEN_PAN) === p.TOUCH_SCREEN_PAN || (this._state & p.TOUCH_DOLLY_SCREEN_PAN) === p.TOUCH_DOLLY_SCREEN_PAN || (this._state & p.TOUCH_ZOOM_SCREEN_PAN) === p.TOUCH_ZOOM_SCREEN_PAN) && (this._truckInternal(E, S, !1, !0), this._isUserControllingTruck = !0), ((this._state & p.OFFSET) === p.OFFSET || (this._state & p.TOUCH_OFFSET) === p.TOUCH_OFFSET || (this._state & p.TOUCH_DOLLY_OFFSET) === p.TOUCH_DOLLY_OFFSET || (this._state & p.TOUCH_ZOOM_OFFSET) === p.TOUCH_ZOOM_OFFSET) && (this._truckInternal(E, S, !0, !1), this._isUserControllingOffset = !0), this.dispatchEvent({ type: "control" });
    }, C = () => {
      It(this._activePointers, q), n.copy(q), this._dragNeedsUpdate = !1, (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) && (this._isDragging = !1), this._activePointers.length === 0 && this._domElement && (this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this.dispatchEvent({ type: "controlend" }));
    };
    this.lockPointer = () => {
      !this._enabled || !this._domElement || (this.cancel(), this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      }, this._activePointers.push(this._lockedPointer), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.requestPointerLock(), this._domElement.ownerDocument.addEventListener("pointerlockchange", v), this._domElement.ownerDocument.addEventListener("pointerlockerror", y), this._domElement.ownerDocument.addEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.addEventListener("pointerup", c), u());
    }, this.unlockPointer = () => {
      var g, _, E;
      this._lockedPointer !== null && (this._disposePointer(this._lockedPointer), this._lockedPointer = null), (g = this._domElement) === null || g === void 0 || g.ownerDocument.exitPointerLock(), (_ = this._domElement) === null || _ === void 0 || _.ownerDocument.removeEventListener("pointerlockchange", v), (E = this._domElement) === null || E === void 0 || E.ownerDocument.removeEventListener("pointerlockerror", y), this.cancel();
    };
    const v = () => {
      this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement || this.unlockPointer();
    }, y = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (g) => {
      this._domElement = g, this._domElement.style.touchAction = "none", this._domElement.style.userSelect = "none", this._domElement.style.webkitUserSelect = "none", this._domElement.addEventListener("pointerdown", r), this._domElement.addEventListener("pointercancel", c), this._domElement.addEventListener("wheel", h, { passive: !1 }), this._domElement.addEventListener("contextmenu", d);
    }, this._removeAllEventListeners = () => {
      this._domElement && (this._domElement.style.touchAction = "", this._domElement.style.userSelect = "", this._domElement.style.webkitUserSelect = "", this._domElement.removeEventListener("pointerdown", r), this._domElement.removeEventListener("pointercancel", c), this._domElement.removeEventListener("wheel", h, { passive: !1 }), this._domElement.removeEventListener("contextmenu", d), this._domElement.ownerDocument.removeEventListener("pointermove", o, { passive: !1 }), this._domElement.ownerDocument.removeEventListener("pointerup", c), this._domElement.ownerDocument.removeEventListener("pointerlockchange", v), this._domElement.ownerDocument.removeEventListener("pointerlockerror", y));
    }, this.cancel = () => {
      this._state !== p.NONE && (this._state = p.NONE, this._activePointers.length = 0, C());
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
    this._interactiveArea.width = ee(e.width, 0, 1), this._interactiveArea.height = ee(e.height, 0, 1), this._interactiveArea.x = ee(e.x, 0, 1 - this._interactiveArea.width), this._interactiveArea.y = ee(e.y, 0, 1 - this._interactiveArea.height);
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
    const n = ee(e, this.minAzimuthAngle, this.maxAzimuthAngle), a = ee(t, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = n, this._sphericalEnd.phi = a, this._sphericalEnd.makeSafe(), this._needsUpdate = !0, s || (this._spherical.theta = this._sphericalEnd.theta, this._spherical.phi = this._sphericalEnd.phi);
    const r = !s || k(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && k(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
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
    return this._isUserControllingDolly = !1, this._lastDollyDirection = De.NONE, this._changedDolly = 0, this._dollyToNoClamp(ee(e, this.minDistance, this.maxDistance), t);
  }
  _dollyToNoClamp(e, t = !1) {
    const s = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      const r = this._collisionTest(), o = k(r, this._spherical.radius);
      if (!(s > e) && o)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, r);
    } else
      this._sphericalEnd.radius = e;
    this._needsUpdate = !0, t || (this._spherical.radius = this._sphericalEnd.radius);
    const a = !t || k(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    this._targetEnd.add(this._getCameraDirection(Ge).multiplyScalar(e)), t || this._target.copy(this._targetEnd);
    const s = !t || k(this._target.x, this._targetEnd.x, this.restThreshold) && k(this._target.y, this._targetEnd.y, this.restThreshold) && k(this._target.z, this._targetEnd.z, this.restThreshold);
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
    this._isUserControllingZoom = !1, this._zoomEnd = ee(e, this.minZoom, this.maxZoom), this._needsUpdate = !0, t || (this._zoom = this._zoomEnd);
    const s = !t || k(this._zoom, this._zoomEnd, this.restThreshold);
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
    this._camera.updateMatrix(), ie.setFromMatrixColumn(this._camera.matrix, 0), se.setFromMatrixColumn(this._camera.matrix, 1), ie.multiplyScalar(e), se.multiplyScalar(-t);
    const n = A.copy(ie).add(se), a = U.copy(this._targetEnd).add(n);
    return this.moveTo(a.x, a.y, a.z, s);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(e, t = !1) {
    A.setFromMatrixColumn(this._camera.matrix, 0), A.crossVectors(this._camera.up, A), A.multiplyScalar(e);
    const s = U.copy(this._targetEnd).add(A);
    return this.moveTo(s.x, s.y, s.z, t);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(e, t = !1) {
    return A.copy(this._camera.up).multiplyScalar(e), this.moveTo(this._targetEnd.x + A.x, this._targetEnd.y + A.y, this._targetEnd.z + A.z, t);
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
    const a = A.set(e, t, s).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, a, this.boundaryFriction), this._needsUpdate = !0, n || this._target.copy(this._targetEnd);
    const r = !n || k(this._target.x, this._targetEnd.x, this.restThreshold) && k(this._target.y, this._targetEnd.y, this.restThreshold) && k(this._target.z, this._targetEnd.z, this.restThreshold);
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
    const o = A.set(e, t, s).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
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
    const c = [], l = e.isBox3 ? Le.copy(e) : Le.setFromObject(e);
    l.isEmpty() && (console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"), Promise.resolve());
    const h = Ri(this._sphericalEnd.theta, Ai), d = Ri(this._sphericalEnd.phi, Ai);
    c.push(this.rotateTo(h, d, t));
    const u = A.setFromSpherical(this._sphericalEnd).normalize(), m = ki.setFromUnitVectors(u, kt), C = k(Math.abs(u.y), 1);
    C && m.multiply(Ft.setFromAxisAngle(rt, h)), m.multiply(this._yAxisUpSpaceInverse);
    const v = Li.makeEmpty();
    U.copy(l.min).applyQuaternion(m), v.expandByPoint(U), U.copy(l.min).setX(l.max.x).applyQuaternion(m), v.expandByPoint(U), U.copy(l.min).setY(l.max.y).applyQuaternion(m), v.expandByPoint(U), U.copy(l.max).setZ(l.min.z).applyQuaternion(m), v.expandByPoint(U), U.copy(l.min).setZ(l.max.z).applyQuaternion(m), v.expandByPoint(U), U.copy(l.max).setY(l.min.y).applyQuaternion(m), v.expandByPoint(U), U.copy(l.max).setX(l.min.x).applyQuaternion(m), v.expandByPoint(U), U.copy(l.max).applyQuaternion(m), v.expandByPoint(U), v.min.x -= n, v.min.y -= r, v.max.x += a, v.max.y += o, m.setFromUnitVectors(kt, u), C && m.premultiply(Ft.invert()), m.premultiply(this._yAxisUpSpace);
    const y = v.getSize(A), g = v.getCenter(U).applyQuaternion(m);
    if (ge(this._camera)) {
      const _ = this.getDistanceToFitBox(y.x, y.y, y.z, s);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.dollyTo(_, t)), c.push(this.setFocalOffset(0, 0, 0, t));
    } else if (de(this._camera)) {
      const _ = this._camera, E = _.right - _.left, S = _.top - _.bottom, b = s ? Math.max(E / y.x, S / y.y) : Math.min(E / y.x, S / y.y);
      c.push(this.moveTo(g.x, g.y, g.z, t)), c.push(this.zoomTo(b, t)), c.push(this.setFocalOffset(0, 0, 0, t));
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
    const s = [], a = "isObject3D" in e ? re.createBoundingSphere(e, Nt) : Nt.copy(e);
    if (s.push(this.moveTo(a.center.x, a.center.y, a.center.z, t)), ge(this._camera)) {
      const r = this.getDistanceToFitSphere(a.radius);
      s.push(this.dollyTo(r, t));
    } else if (de(this._camera)) {
      const r = this._camera.right - this._camera.left, o = this._camera.top - this._camera.bottom, c = 2 * a.radius, l = Math.min(r / c, o / c);
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
  setLookAt(e, t, s, n, a, r, o = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = De.NONE, this._changedDolly = 0;
    const c = U.set(n, a, r), l = A.set(e, t, s);
    this._targetEnd.copy(c), this._sphericalEnd.setFromVector3(l.sub(c).applyQuaternion(this._yAxisUpSpace)), this.normalizeRotations(), this._needsUpdate = !0, o || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const h = !o || k(this._target.x, this._targetEnd.x, this.restThreshold) && k(this._target.y, this._targetEnd.y, this.restThreshold) && k(this._target.z, this._targetEnd.z, this.restThreshold) && k(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && k(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && k(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
  lerpLookAt(e, t, s, n, a, r, o, c, l, h, d, u, m, C = !1) {
    this._isUserControllingRotate = !1, this._isUserControllingDolly = !1, this._isUserControllingTruck = !1, this._lastDollyDirection = De.NONE, this._changedDolly = 0;
    const v = A.set(n, a, r), y = U.set(e, t, s);
    j.setFromVector3(y.sub(v).applyQuaternion(this._yAxisUpSpace));
    const g = Ue.set(h, d, u), _ = U.set(o, c, l);
    Ye.setFromVector3(_.sub(g).applyQuaternion(this._yAxisUpSpace)), this._targetEnd.copy(v.lerp(g, m));
    const E = Ye.theta - j.theta, S = Ye.phi - j.phi, b = Ye.radius - j.radius;
    this._sphericalEnd.set(j.radius + b * m, j.phi + S * m, j.theta + E * m), this.normalizeRotations(), this._needsUpdate = !0, C || (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    const O = !C || k(this._target.x, this._targetEnd.x, this.restThreshold) && k(this._target.y, this._targetEnd.y, this.restThreshold) && k(this._target.z, this._targetEnd.z, this.restThreshold) && k(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && k(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && k(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
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
    const a = this.getPosition(A), r = this.setLookAt(a.x, a.y, a.z, e, t, s, n);
    return this._sphericalEnd.phi = ee(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle), r;
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
    const a = !n || k(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && k(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && k(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
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
    this._camera.updateMatrixWorld(), ie.setFromMatrixColumn(this._camera.matrixWorldInverse, 0), se.setFromMatrixColumn(this._camera.matrixWorldInverse, 1), ve.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const n = A.set(e, t, s), a = n.distanceTo(this._camera.position), r = n.sub(this._camera.position);
    ie.multiplyScalar(r.x), se.multiplyScalar(r.y), ve.multiplyScalar(r.z), A.copy(ie).add(se).add(ve), A.z = A.z + a, this.dollyTo(a, !1), this.setFocalOffset(-A.x, A.y, -A.z, !1), this.moveTo(e, t, s, !1);
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
    this._viewport = this._viewport || new T.Vector4(), typeof e == "number" ? this._viewport.set(e, t, s, n) : this._viewport.copy(e);
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
    if (Ut(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const a = e / t, r = this._camera.getEffectiveFOV() * He, o = this._camera.aspect;
    return ((n ? a > o : a < o) ? t : e / o) * 0.5 / Math.tan(r * 0.5) + s * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(e) {
    if (Ut(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const t = this._camera.getEffectiveFOV() * He, s = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2, n = 1 < this._camera.aspect ? t : s;
    return e / Math.sin(n * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(e, t = !0) {
    return (e && e.isVector3 ? e : new T.Vector3()).copy(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(e, t = !0) {
    return (e && e.isVector3 ? e : new T.Vector3()).setFromSpherical(t ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(t ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(e, t = !0) {
    return (e || new T.Spherical()).copy(t ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(e, t = !0) {
    return (e && e.isVector3 ? e : new T.Vector3()).copy(t ? this._focalOffsetEnd : this._focalOffset);
  }
  /**
   * Normalize camera azimuth angle rotation between 0 and 360 degrees.
   * @category Methods
   */
  normalizeRotations() {
    this._sphericalEnd.theta = this._sphericalEnd.theta % Ie, this._sphericalEnd.theta < 0 && (this._sphericalEnd.theta += Ie), this._spherical.theta += Ie * Math.round((this._sphericalEnd.theta - this._spherical.theta) / Ie);
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
    if (!k(this._camera.up.x, this._cameraUp0.x) || !k(this._camera.up.y, this._cameraUp0.y) || !k(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const s = this.getPosition(A);
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
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, rt), this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const e = A.subVectors(this._target, this._camera.position).normalize(), t = U.crossVectors(e, this._camera.up);
    this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld();
    const s = this.getPosition(A);
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
    const t = this._sphericalEnd.theta - this._spherical.theta, s = this._sphericalEnd.phi - this._spherical.phi, n = this._sphericalEnd.radius - this._spherical.radius, a = Ii.subVectors(this._targetEnd, this._target), r = Ui.subVectors(this._focalOffsetEnd, this._focalOffset), o = this._zoomEnd - this._zoom;
    if (F(t))
      this._thetaVelocity.value = 0, this._spherical.theta = this._sphericalEnd.theta;
    else {
      const d = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = st(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, d, 1 / 0, e), this._needsUpdate = !0;
    }
    if (F(s))
      this._phiVelocity.value = 0, this._spherical.phi = this._sphericalEnd.phi;
    else {
      const d = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = st(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, d, 1 / 0, e), this._needsUpdate = !0;
    }
    if (F(n))
      this._radiusVelocity.value = 0, this._spherical.radius = this._sphericalEnd.radius;
    else {
      const d = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = st(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, d, this.maxSpeed, e), this._needsUpdate = !0;
    }
    if (F(a.x) && F(a.y) && F(a.z))
      this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd);
    else {
      const d = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      Pi(this._target, this._targetEnd, this._targetVelocity, d, this.maxSpeed, e, this._target), this._needsUpdate = !0;
    }
    if (F(r.x) && F(r.y) && F(r.z))
      this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd);
    else {
      const d = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      Pi(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, d, this.maxSpeed, e, this._focalOffset), this._needsUpdate = !0;
    }
    if (F(o))
      this._zoomVelocity.value = 0, this._zoom = this._zoomEnd;
    else {
      const d = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = st(this._zoom, this._zoomEnd, this._zoomVelocity, d, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (ge(this._camera) && this._changedDolly !== 0) {
        const d = this._spherical.radius - this._lastDistance, u = this._camera, m = this._getCameraDirection(Ge), C = A.copy(m).cross(u.up).normalize();
        C.lengthSq() === 0 && (C.x = 1);
        const v = U.crossVectors(C, m), y = this._sphericalEnd.radius * Math.tan(u.getEffectiveFOV() * He * 0.5), _ = (this._sphericalEnd.radius - d - this._sphericalEnd.radius) / this._sphericalEnd.radius, E = Ue.copy(this._targetEnd).add(C.multiplyScalar(this._dollyControlCoord.x * y * u.aspect)).add(v.multiplyScalar(this._dollyControlCoord.y * y)), S = A.copy(this._targetEnd).lerp(E, _), b = this._lastDollyDirection === De.IN && this._spherical.radius <= this.minDistance, O = this._lastDollyDirection === De.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (b || O)) {
          this._sphericalEnd.radius -= d, this._spherical.radius -= d;
          const D = U.copy(m).multiplyScalar(-d);
          S.add(D);
        }
        this._boundary.clampPoint(S, S);
        const w = U.subVectors(S, this._targetEnd);
        this._targetEnd.copy(S), this._target.add(w), this._changedDolly -= d, F(this._changedDolly) && (this._changedDolly = 0);
      } else if (de(this._camera) && this._changedZoom !== 0) {
        const d = this._zoom - this._lastZoom, u = this._camera, m = A.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (u.near + u.far) / (u.near - u.far)).unproject(u), C = U.set(0, 0, -1).applyQuaternion(u.quaternion), v = Ue.copy(m).add(C.multiplyScalar(-m.dot(u.up))), g = -(this._zoom - d - this._zoom) / this._zoom, _ = this._getCameraDirection(Ge), E = this._targetEnd.dot(_), S = A.copy(this._targetEnd).lerp(v, g), b = S.dot(_), O = _.multiplyScalar(b - E);
        S.sub(O), this._boundary.clampPoint(S, S);
        const w = U.subVectors(S, this._targetEnd);
        this._targetEnd.copy(S), this._target.add(w), this._changedZoom -= d, F(this._changedZoom) && (this._changedZoom = 0);
      }
    }
    this._camera.zoom !== this._zoom && (this._camera.zoom = this._zoom, this._camera.updateProjectionMatrix(), this._updateNearPlaneCorners(), this._needsUpdate = !0), this._dragNeedsUpdate = !0;
    const c = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, c), this._spherical.makeSafe(), this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target), this._camera.lookAt(this._target), (!F(this._focalOffset.x) || !F(this._focalOffset.y) || !F(this._focalOffset.z)) && (ie.setFromMatrixColumn(this._camera.matrix, 0), se.setFromMatrixColumn(this._camera.matrix, 1), ve.setFromMatrixColumn(this._camera.matrix, 2), ie.multiplyScalar(this._focalOffset.x), se.multiplyScalar(-this._focalOffset.y), ve.multiplyScalar(this._focalOffset.z), A.copy(ie).add(se).add(ve), this._camera.position.add(A), this._camera.updateMatrixWorld()), this._boundaryEnclosesCamera && this._encloseToBoundary(this._camera.position.copy(this._target), A.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    const h = this._needsUpdate;
    return h && !this._updatedLastTime ? (this._hasRested = !1, this.dispatchEvent({ type: "wake" }), this.dispatchEvent({ type: "update" })) : h ? (this.dispatchEvent({ type: "update" }), F(t, this.restThreshold) && F(s, this.restThreshold) && F(n, this.restThreshold) && F(a.x, this.restThreshold) && F(a.y, this.restThreshold) && F(a.z, this.restThreshold) && F(r.x, this.restThreshold) && F(r.y, this.restThreshold) && F(r.z, this.restThreshold) && F(o, this.restThreshold) && !this._hasRested && (this._hasRested = !0, this.dispatchEvent({ type: "rest" }))) : !h && this._updatedLastTime && this.dispatchEvent({ type: "sleep" }), this._lastDistance = this._spherical.radius, this._lastZoom = this._zoom, this._updatedLastTime = h, this._needsUpdate = !1, h;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: Be(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: Be(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: Be(this.maxPolarAngle),
      minAzimuthAngle: Be(this.minAzimuthAngle),
      maxAzimuthAngle: Be(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      target: this._targetEnd.toArray(),
      position: A.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
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
    this.enabled = s.enabled, this.minDistance = s.minDistance, this.maxDistance = Ve(s.maxDistance), this.minZoom = s.minZoom, this.maxZoom = Ve(s.maxZoom), this.minPolarAngle = s.minPolarAngle, this.maxPolarAngle = Ve(s.maxPolarAngle), this.minAzimuthAngle = Ve(s.minAzimuthAngle), this.maxAzimuthAngle = Ve(s.maxAzimuthAngle), this.smoothTime = s.smoothTime, this.draggingSmoothTime = s.draggingSmoothTime, this.dollySpeed = s.dollySpeed, this.truckSpeed = s.truckSpeed, this.dollyToCursor = s.dollyToCursor, this._target0.fromArray(s.target0), this._position0.fromArray(s.position0), this._zoom0 = s.zoom0, this._focalOffset0.fromArray(s.focalOffset0), this.moveTo(s.target[0], s.target[1], s.target[2], t), j.setFromVector3(A.fromArray(s.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)), this.rotateTo(j.theta, j.phi, t), this.dollyTo(j.radius, t), this.zoomTo(s.zoom, t), this.setFocalOffset(s.focalOffset[0], s.focalOffset[1], s.focalOffset[2], t), this._needsUpdate = !0;
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
    e.setAttribute("data-camera-controls-version", Nr), this._addAllEventListeners(e), this._getClientRect(this._elementRect);
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
    const a = U.copy(t).add(e), o = this._boundary.clampPoint(a, Ue).sub(a), c = o.lengthSq();
    if (c === 0)
      return e.add(t);
    if (c === n)
      return e;
    if (s === 0)
      return e.add(t).add(o);
    {
      const l = 1 + s * c / t.dot(o);
      return e.add(U.copy(t).multiplyScalar(l)).add(o.multiplyScalar(1 - s));
    }
  }
  _updateNearPlaneCorners() {
    if (ge(this._camera)) {
      const e = this._camera, t = e.near, s = e.getEffectiveFOV() * He, n = Math.tan(s * 0.5) * t, a = n * e.aspect;
      this._nearPlaneCorners[0].set(-a, -n, 0), this._nearPlaneCorners[1].set(a, -n, 0), this._nearPlaneCorners[2].set(a, n, 0), this._nearPlaneCorners[3].set(-a, n, 0);
    } else if (de(this._camera)) {
      const e = this._camera, t = 1 / e.zoom, s = e.left * t, n = e.right * t, a = e.top * t, r = e.bottom * t;
      this._nearPlaneCorners[0].set(s, a, 0), this._nearPlaneCorners[1].set(n, a, 0), this._nearPlaneCorners[2].set(n, r, 0), this._nearPlaneCorners[3].set(s, r, 0);
    }
  }
  // lateUpdate
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1) || Ut(this._camera, "_collisionTest"))
      return e;
    const s = this._getTargetDirection(Ge);
    zt.lookAt(Di, s, this._camera.up);
    for (let n = 0; n < 4; n++) {
      const a = U.copy(this._nearPlaneCorners[n]);
      a.applyMatrix4(zt);
      const r = Ue.addVectors(this._target, a);
      at.set(r, s), at.far = this._spherical.radius + 1;
      const o = at.intersectObjects(this.colliderMeshes);
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
  static createBoundingSphere(e, t = new T.Sphere()) {
    const s = t, n = s.center;
    Le.makeEmpty(), e.traverseVisible((r) => {
      r.isMesh && Le.expandByObject(r);
    }), Le.getCenter(n);
    let a = 0;
    return e.traverseVisible((r) => {
      if (!r.isMesh)
        return;
      const o = r;
      if (!o.geometry)
        return;
      const c = o.geometry.clone();
      c.applyMatrix4(o.matrixWorld);
      const h = c.attributes.position;
      for (let d = 0, u = h.count; d < u; d++)
        A.fromBufferAttribute(h, d), a = Math.max(a, n.distanceToSquared(A));
    }), s.radius = Math.sqrt(a), s;
  }
}
const gt = (i) => {
  const [e, t] = L(i.options[i.index]), s = () => {
    i.onToggle(!i.open);
  }, n = (r) => {
    r !== e && (i.onSelect(r), t(r)), i.onToggle(!1);
  }, a = i.open ? `${i.options.length * 31 - 1}px` : "0px";
  return /* @__PURE__ */ M("div", { className: `dropdown ${i.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ f("div", { className: "dropdown-toggle", onClick: s, children: `${i.title}: ${e}` }),
    /* @__PURE__ */ f("ul", { className: "dropdown-menu", style: { height: a }, children: i.options.map((r) => /* @__PURE__ */ f("li", { onClick: () => n(r), children: r }, r)) })
  ] });
}, _e = gs(function(e, t) {
  const s = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [n, a] = L("Renderer"), [r, o] = L(!1), [c, l] = L(!1), [h, d] = L(!1);
  return /* @__PURE__ */ M("div", { className: `CameraWindow ${e.name}`, children: [
    /* @__PURE__ */ f("div", { ref: t, className: "clickable", onClick: () => {
      h && d(!1);
    } }),
    /* @__PURE__ */ M("div", { className: "options", children: [
      e.camera !== null && /* @__PURE__ */ f(
        gt,
        {
          title: "Camera",
          index: e.options.indexOf(e.camera.name),
          open: h,
          options: e.options,
          onSelect: e.onSelectCamera,
          onToggle: (u) => {
            u && c && l(!1), d(u);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ f(
        gt,
        {
          title: "Mode",
          index: s.indexOf(n),
          open: c,
          options: s,
          onSelect: (u) => {
            if (u === n) return;
            const m = u;
            e.onSelectRenderMode(m), a(m);
          },
          onToggle: (u) => {
            u && h && d(!1), r && o(!1), l(u);
          },
          up: !0
        }
      )
    ] })
  ] });
}), zr = `out vec3 worldPosition;
uniform float uDistance;

void main() {
  // Scale the plane by the drawing distance
  worldPosition = position.xzy * uDistance;
  worldPosition.xz += cameraPosition.xz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}`, Hr = `out vec4 fragColor;
in vec3 worldPosition;
uniform float uDivisions;
uniform float uScale;
uniform vec3 uColor;
uniform float uDistance;
uniform float uGridOpacity;
uniform float uSubgridOpacity;

#define minAlpha 0.00784313725490196

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

  if (fragColor.a <= minAlpha) discard;
}`;
class Br extends Qi {
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
          value: e?.color !== void 0 ? e?.color : new le(16777215)
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
      glslVersion: Ds,
      side: ei,
      transparent: !0,
      name: "InfiniteGrid",
      vertexShader: zr,
      fragmentShader: Hr
    });
  }
  // Getters / Setters
  get color() {
    return this.uniforms.uColor.value;
  }
  set color(e) {
    this.uniforms.uColor.value = e;
  }
  get gridOpacity() {
    return this.uniforms.uGridOpacity.value;
  }
  set gridOpacity(e) {
    this.uniforms.uGridOpacity.value = e;
  }
  get subgridOpacity() {
    return this.uniforms.uSubgridOpacity.value;
  }
  set subgridOpacity(e) {
    this.uniforms.uSubgridOpacity.value = e;
  }
}
class Vr extends Fe {
  gridMaterial;
  constructor(e) {
    const t = new Br(e);
    super(new Ji(), t), this.gridMaterial = t, this.frustumCulled = !1, this.name = "InfiniteGridHelper";
  }
  // Getters / Setters
  get color() {
    return this.gridMaterial.color;
  }
  set color(e) {
    this.gridMaterial.color = e;
  }
  get gridOpacity() {
    return this.gridMaterial.gridOpacity;
  }
  set gridOpacity(e) {
    this.gridMaterial.gridOpacity = e;
  }
  get subgridOpacity() {
    return this.gridMaterial.subgridOpacity;
  }
  set subgridOpacity(e) {
    this.gridMaterial.subgridOpacity = e;
  }
}
class Gr extends dn {
  uScale;
  uDivisions;
  uColor;
  uDistance;
  uSubgridOpacity;
  uGridOpacity;
  constructor(e) {
    super(), this.name = "InfiniteGrid", this.side = ei, this.transparent = !0, this.uScale = Te(e?.scale ?? 0.1), this.uDivisions = Te(e?.divisions ?? 10), this.uColor = Te(e?.color ?? new le(16777215)), this.uDistance = Te(e?.distance ?? 1e4), this.uSubgridOpacity = Te(e?.subgridOpacity ?? 0.15), this.uGridOpacity = Te(e?.gridOpacity ?? 0.25);
    const { uScale: t, uDivisions: s, uColor: n, uDistance: a, uSubgridOpacity: r, uGridOpacity: o } = this, c = fn("vec3", "vWorldPosition");
    this.positionNode = xt(() => {
      const h = gn.xzy.mul(a).add(
        vn(et.x, Z(0), et.z)
      );
      return c.assign(h), h;
    })();
    const l = xt(([h]) => {
      const d = c.xz.div(h), u = _n(d), m = mi(Cn(d.sub(0.5)).sub(0.5)).div(u).div(2), C = Tt(m.x, m.y);
      return Z(1).sub(Tt(C, Z(1)));
    });
    this.outputNode = xt(() => {
      const h = c, d = fi(Z(200), mi(et.y.sub(h.y))), u = Z(yn(et, h)), m = gi(d).div(gi(s)), C = vi(s, bn(m)), v = C.mul(s), y = v.mul(s), g = l(C.mul(t)), _ = l(v.mul(t)), E = l(y.mul(t)), S = d.sub(C).div(v.sub(C)), b = Z(0.3), O = fi(
        S.sub(Z(1)).add(b),
        Z(0)
      ).div(b), w = g.mul(
        vi(Z(1).sub(Tt(u.div(a), Z(1))), Z(3))
      ), D = Z(0.5), x = w.sub(O).mul(r), N = _i(
        x,
        w.mul(o).sub(
          O.mul(o.sub(r)).mul(D)
        ),
        _
      ), J = Z(_i(N, w.mul(o), E));
      return En(Sn(J, Z(1 / 127)), () => {
        On();
      }), ti(n, J);
    })();
  }
  // Getters / Setters
  get color() {
    return this.uColor.value;
  }
  set color(e) {
    this.uColor.value = e;
  }
  get gridOpacity() {
    return this.uGridOpacity.value;
  }
  set gridOpacity(e) {
    this.uGridOpacity.value = e;
  }
  get subgridOpacity() {
    return this.uSubgridOpacity.value;
  }
  set subgridOpacity(e) {
    this.uSubgridOpacity.value = e;
  }
}
class Yr extends Fe {
  gridMaterial;
  constructor(e) {
    const t = new Gr(e);
    super(new Ji(), t), this.gridMaterial = t, this.frustumCulled = !1, this.name = "InfiniteGridHelper";
  }
  // Getters / Setters
  get color() {
    return this.gridMaterial.color;
  }
  set color(e) {
    this.gridMaterial.color = e;
  }
  get gridOpacity() {
    return this.gridMaterial.gridOpacity;
  }
  set gridOpacity(e) {
    this.gridMaterial.gridOpacity = e;
  }
  get subgridOpacity() {
    return this.gridMaterial.subgridOpacity;
  }
  set subgridOpacity(e) {
    this.gridMaterial.subgridOpacity = e;
  }
}
function Ht(i) {
  const [e, t] = L(i.selected), s = "toggle" + (e ? " selected" : "");
  return /* @__PURE__ */ f(
    "button",
    {
      className: s,
      onClick: () => {
        const n = !e;
        t(n), i.onClick(n);
      },
      style: {
        backgroundImage: `url(${i.icon})`,
        backgroundPositionX: "center",
        backgroundPositionY: i.top !== void 0 ? `${i.top}px` : "center",
        backgroundSize: `${i.width !== void 0 ? `${i.width}px` : "26px"} ${i.height}px`
      }
    },
    i.name
  );
}
class $r extends es {
  constructor() {
    super();
    const e = wn(xn(), 0.1, 0.5, 0, 1).oneMinus();
    this.colorNode = ti(e, e, e, 1);
  }
}
const Wr = `#include <common>
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
}`, Zr = `
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>
  if (opacity < 0.015) discard;
  gl_FragColor = vec4(vec3(vUv, 0.0), opacity);
}`;
class qr extends Qi {
  constructor() {
    super({
      defines: {
        USE_UV: ""
      },
      uniforms: {
        opacity: { value: 1 }
      },
      vertexShader: Wr,
      fragmentShader: Zr,
      transparent: !0
    });
  }
}
class Kr extends es {
  constructor() {
    super(), this.colorNode = ti(Tn(), 0, 1);
  }
}
class Y extends Vi {
  static DRAG_START = "Transform::dragStart";
  static DRAG_END = "Transform::dragEnd";
  static _instance;
  three;
  activeCamera;
  controls = /* @__PURE__ */ new Map();
  visibility = /* @__PURE__ */ new Map();
  setApp(e) {
    this.three = e, this.three.addEventListener(P.SET_SCENE, this.setScene);
  }
  clear() {
    for (const e of this.controls.values()) {
      e.detach(), e.disconnect();
      const t = e.getHelper();
      ce(t);
    }
    this.controls = /* @__PURE__ */ new Map(), this.visibility = /* @__PURE__ */ new Map();
  }
  add(e) {
    let t = this.controls.get(e);
    if (t === void 0) {
      const s = document.querySelector(".clickable");
      t = new Mn(this.activeCamera, s), t.getHelper().name = e, t.setSize(0.5), t.setSpace("local"), this.controls.set(e, t), this.visibility.set(e, !0), t.addEventListener("mouseDown", () => {
        this.dispatchEvent({ type: Y.DRAG_START });
      }), t.addEventListener("mouseUp", () => {
        this.dispatchEvent({ type: Y.DRAG_END });
      }), t.addEventListener("dragging-changed", (n) => {
        G.instance?.toggleOrbitControls(n.value);
      });
    }
    return t;
  }
  get(e) {
    return this.controls.get(e);
  }
  remove(e) {
    const t = this.get(e);
    return t === void 0 ? !1 : (t.detach(), t.disconnect(), ce(t.getHelper()), this.controls.delete(e), !0);
  }
  enabled(e) {
    this.controls.forEach((t) => {
      t.enabled = e;
    });
  }
  updateCamera(e, t) {
    this.activeCamera = e, this.controls.forEach((s) => {
      s.camera !== e && (s.camera = e, e.getWorldPosition(s.cameraPosition), e.getWorldQuaternion(s.cameraQuaternion)), s.domElement !== t && (s.disconnect(), s.domElement = t, s.connect(t));
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
    return Y._instance || (Y._instance = new Y()), Y._instance;
  }
}
const Xr = new Is(), Bt = new ke();
class Vt extends $t {
  curve = new hi();
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
  draggedMat = new ut();
  parentGroup;
  group;
  constructor(e, t) {
    const s = new le(Ot(0.5, 1, Math.random()), Ot(0.5, 1, Math.random()), Ot(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new Us({ color: s }), this.line = new Ls(new ht(), this.lineMaterial), this.line.name = "line", this.line.visible = !1, this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = s, this.draggable = new $t(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new Fe(new ks(1.5), new ut({ color: s })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new pt(), this.raycaster.params.Line.threshold = 3, this.enable();
  }
  enable() {
    document.addEventListener("pointerdown", this.onMouseClick);
  }
  disable() {
    document.removeEventListener("pointerdown", this.onMouseClick);
  }
  dispose = () => {
    this._transform && (this._transform.removeEventListener("objectChange", this.updateSpline), Y.instance.remove(this.name)), this.disable(), this.parentGroup.removeGroup(this.name);
  };
  hideTransform = () => {
    this._transform?.detach();
  };
  exportSpline = () => {
    const e = [];
    this.draggable.children.forEach((t) => {
      e.push([
        te(t.position.x, 3),
        te(t.position.y, 3),
        te(t.position.z, 3)
      ]);
    }), An({
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
    }
  };
  addPoint = (e, t = !0) => {
    const s = this.draggable.children.length, n = new Fe(Xr, this.draggedMat);
    n.name = `point_${s}`, n.position.copy(e), n.scale.setScalar(this._draggableScale), this.draggable.add(n), this._transform?.attach(n);
    const a = this.points.length > 1;
    return a && t && this.updateSpline(), this.line.visible = a, this.updateCurrentPoint(), n;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = e > 1 ? this.draggable.children[e - 1].position.clone() : new W(), s = this.addPoint(t);
    this.updateField(s.position);
  };
  removePoint = (e) => {
    if (this._transform?.object === e) {
      this._transform?.detach();
      const t = this.draggable.children[this.draggable.children.length - 1];
      this._transform?.attach(t), this.updateField(t.position);
    }
    ce(e), this.updateSpline();
  };
  removePointAt = (e) => {
    const t = this.draggable.children[e];
    this.removePoint(t);
  };
  removeSelectedPt = () => {
    this._transform?.object !== void 0 && this.removePoint(this._transform?.object);
  };
  updateLastPoint(e) {
    const t = this.draggable.children.length;
    t > 0 && (this.draggable.children[t - 1].position.copy(e), this.updateSpline());
  }
  updateSpline = () => {
    this.points.length < 2 || (this.curve = new hi(this.points, this.closed, this.curveType, this.tension), this.line.geometry.dispose(), this.line.geometry = new ht().setFromPoints(this.curve.getPoints(this.subdivide)), this.curvePos.position.copy(this.getPointAt(this._curvePercentage)));
  };
  updateField(e) {
    this.group.current?.setField("Current Point", e);
  }
  // Handlers
  onMouseClick = (e) => {
    if (!G.instance || !G.instance.currentWindow || this._transform && !this._transform.getHelper().visible) return;
    const s = G.instance.currentWindow.current.getBoundingClientRect();
    Bt.x = (e.clientX - s.x) / s.width * 2 - 1, Bt.y = -((e.clientY - s.y) / s.height) * 2 + 1, this.raycaster.setFromCamera(Bt, this.camera);
    const n = this.raycaster.intersectObjects(this.draggable.children, !1);
    if (n.length > 0) {
      const a = n[0].object;
      a !== this._transform?.object && (this._transform?.attach(a), this.updateField(a.position));
    }
  };
  // Getters
  getPointAt(e) {
    return this.curve.points.length > 1 ? this.curve.getPointAt(e) : this.curve.points.length === 1 ? this.curve.points[0] : new W();
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
  updateCurrentPoint() {
    if (this._transform?.object && this.group) {
      const e = this._transform?.object;
      e.name.search("point") > -1 && this.updateField(e.position);
    }
  }
  onUpdateTransform = () => {
    this.updateCurrentPoint(), this.updateSpline();
  };
  initDebug(e, t) {
    const s = this.draggable.children;
    this.visible = t, this.parentGroup = e, this._transform = Y.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), s.length > 0 && this._transform.attach(s[s.length - 1]), G.instance?.helpersContainer.add(this._transform.getHelper());
    const n = s.length > 0 ? s[s.length - 1].position : { x: 0, y: 0, z: 0 };
    this.group = e.addGroup({
      title: this.name,
      expanded: t,
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
          max: 1e3,
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
          value: n
        }
      ],
      onUpdate: (a, r) => {
        switch (a) {
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
            this.parent.currentSpline = null, ce(this);
            break;
          case "Current Point":
            if (this.group.current && this._transform?.object) {
              const o = this._transform?.object;
              o.name.search("point") > -1 && (o.position.copy(r), this.updateSpline());
            }
            break;
        }
      }
    }), this.draggable.children.forEach((a) => {
      this.debugPoint(a);
    });
  }
  debugPoint = (e) => {
    e.name, e.visible = this.draggable.visible;
  };
}
let ot = 0;
class jr extends $t {
  defaultScale = 10;
  currentSpline = null;
  _camera;
  group = null;
  three;
  splineDataText = "";
  constructor(e, t) {
    super(), this.name = "Spline Editor", this._camera = e, this.three = t, this.three.addEventListener(P.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = I.addEditorGroup({
      title: this.name,
      items: [
        {
          type: "field",
          prop: "Spline Data",
          value: "",
          disabled: !1
        },
        {
          type: "button",
          prop: "Import Spline"
        },
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
          prop: "Draw Mode",
          value: !1
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
          case "Spline Data":
            this.splineDataText = t;
            break;
          case "Import Spline":
            this.createSplineFromJSON(JSON.parse(this.splineDataText));
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
          case "Draw Mode":
            t ? this.enableClickToDraw() : this.disableClickToDraw();
            break;
        }
      }
    });
  }
  dispose() {
    this.three.removeEventListener(P.ADD_SPLINE, this.onAddSpline), I.removeEditorGroup(this.name);
  }
  addSpline(e, t) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current, t), this.add(e), this.currentSpline = e;
  }
  createSpline = (e = []) => {
    const t = `Spline ${ot + 1}`, s = new Vt(t, this._camera);
    return s.addPoints(e), this.addSpline(s, !0), ot++, s;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((s) => {
      t.push(new W(s[0], s[1], s[2]));
    }), this.createSpline(t);
  };
  createSplineFromCatmullRom = (e) => this.createSpline(e.points);
  createSplineFromJSON = (e) => {
    const t = [];
    e.points.forEach((n) => {
      t.push(new W(n[0], n[1], n[2]));
    });
    const s = new Vt(e.name, this._camera);
    return s.closed = e.closed, s.subdivide = e.subdivide, s.tension = e.tension, s.type = e.type, s.addPoints(t), s.updateSpline(), this.addSpline(s, !1), s;
  };
  showPoints = (e = !0) => {
    this.children.forEach((t) => {
      t.showPoints(e);
    });
  };
  onAddSpline = (e) => {
    const t = JSON.parse(e.value), s = t.name !== void 0 ? t.name : `Spline ${ot + 1}`, n = new Vt(s, this.camera);
    t.tension !== void 0 && (n.tension = t.tension), t.closed !== void 0 && (n.closed = t.closed), t.subdivide !== void 0 && (n.subdivide = t.subdivide), t.type !== void 0 && (n.curveType = t.type);
    const a = [];
    t.points.forEach((r) => {
      a.push(new W(r[0], r[1], r[2]));
    }), n.addPoints(a), this.addSpline(n, !1), ot++;
  };
  isMouseDown = !1;
  enableClickToDraw() {
    document.querySelectorAll(".clickable").forEach((e) => {
      e.addEventListener("mousedown", this.onClickCanvas), e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("mouseup", this.onMouseUp);
    });
  }
  disableClickToDraw() {
    document.querySelectorAll(".clickable").forEach((e) => {
      e.removeEventListener("mousedown", this.onClickCanvas), e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("mouseup", this.onMouseUp);
    });
  }
  onClickCanvas = (e) => {
    if (e.button !== 0) return;
    if (this._camera.type !== "OrthographicCamera") {
      console.warn("Spline Editor - 3D Camera not supported in Draw Mode");
      return;
    }
    const s = e.target.getBoundingClientRect(), n = (e.clientX - s.left) / s.width * 2 - 1, a = -((e.clientY - s.top) / s.height) * 2 + 1;
    if (G.instance) {
      const o = new pt();
      o.setFromCamera(new ke(n, a), this._camera);
      const c = o.intersectObjects(G.instance.helpersContainer.children, !0);
      for (let l = 0; l < c.length; l++) {
        const h = c[l];
        if (!(h.object.isLine || h.object.isTransformControlsPlane) && h.object.isObject3D)
          return;
      }
    }
    this.currentSpline === null && (this.currentSpline = this.createSpline());
    const r = this.mouseToSplinePos(n, a, s.width, s.height);
    this.currentSpline?.addPoint(r), this.isMouseDown = !0;
  };
  onMouseMove = (e) => {
    if (!this.isMouseDown) return;
    const s = e.target.getBoundingClientRect(), n = (e.clientX - s.left) / s.width * 2 - 1, a = -((e.clientY - s.top) / s.height) * 2 + 1, r = this.mouseToSplinePos(n, a, s.width, s.height);
    this.currentSpline?.updateLastPoint(r), this.currentSpline?.updateField(r);
  };
  onMouseUp = () => {
    this.isMouseDown = !1;
  };
  mouseToSplinePos(e, t, s, n) {
    const a = new W(), r = Math.PI / 2, o = this._camera, c = o.zoom, l = o.rotation.x === -6123233995736766e-32 && o.rotation.y === 0 && o.rotation.z === 0, h = o.rotation.x === -Math.PI && o.rotation.y === 12246467991473532e-32 && o.rotation.z === Math.PI, d = o.rotation.x === -6162975822039155e-48 && o.rotation.y === -r && o.rotation.z === 0, u = o.rotation.x === -6162975822039155e-48 && o.rotation.y === r && o.rotation.z === 0, m = o.rotation.x === -1.5707953264174506 && o.rotation.y === 0 && o.rotation.z === 0, C = o.rotation.x === 1.5707953264174506 && o.rotation.y === 0 && o.rotation.z === 0;
    let v = e, y = t;
    h || u ? v *= -1 : m && (y *= -1);
    const g = s / 2 / c, _ = n / 2 / c;
    if (this.currentSpline === null && (this.currentSpline = this.createSpline()), l || h) {
      const E = v * g + o.position.x, S = y * _ + o.position.y;
      a.set(E, S, 0);
    } else if (d || u) {
      const E = v * g + o.position.z, S = y * _ + o.position.y;
      a.set(0, S, E);
    } else if (m || C) {
      const E = v * g + o.position.x, S = y * _ + o.position.z;
      a.set(E, 0, S);
    }
    return a;
  }
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
const Ni = [
  "Single",
  "Side by Side",
  "Stacked",
  "Quad"
], Qr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC", Jr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==", ea = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQ0lEQVQ4jWP8////fwYqAxYozUhFM/8zkaKYWIWkGEq0b0ZdSjQY5i79TyWagRGaTUdzFEEw6lLqGzqwLoVVJ1StpwA9sBwbUqAh5gAAAABJRU5ErkJggg==";
class G extends Qe {
  static instance = null;
  scene;
  renderer;
  currentScene;
  scenes = /* @__PURE__ */ new Map();
  cameras = /* @__PURE__ */ new Map();
  controls = /* @__PURE__ */ new Map();
  currentCamera;
  currentWindow;
  // RefObject to one of the "windows"
  helpersContainer = new Ns();
  grid;
  cameraHelpers = /* @__PURE__ */ new Map();
  lightHelpers = /* @__PURE__ */ new Map();
  interactionHelper = new Fs(25);
  currentTransform;
  // Tools
  splineEditor;
  // Override Materials
  depthMaterial;
  normalsMaterial;
  uvMaterial;
  wireframeMaterial = new ut({
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
  gridVisibility = !0;
  rendererReady = !1;
  // Interactions
  selectedItem = void 0;
  debugCamera;
  raycaster = new pt();
  pointer = new ke();
  cameraControls = void 0;
  // References
  canvasRef;
  containerRef;
  tlWindow;
  trWindow;
  blWindow;
  brWindow;
  editorCameras = [
    "Top",
    "Bottom",
    "Left",
    "Right",
    "Front",
    "Back",
    "Orthographic",
    "UI",
    "Debug"
  ];
  constructor(e) {
    super(e), this.props.three.addEventListener(P.ADD_RENDERER, this.setupRenderer), this.scene = new zi(), this.scene.name = this.scene.uuid = "", this.canvasRef = ue(), this.containerRef = ue(), this.tlWindow = ue(), this.trWindow = ue(), this.blWindow = ue(), this.brWindow = ue();
    const t = e.three.name, s = localStorage, n = s.getItem(`${t}_mode`);
    this.state = {
      mode: n !== null ? n : "Single",
      modeOpen: !1,
      renderModeOpen: !1,
      interactionMode: "Orbit",
      interactionModeOpen: !1,
      lastUpdate: Date.now()
    }, s.setItem(`${t}_mode`, this.state.mode), s.setItem(`${t}_tlCam`, s.getItem(`${t}_tlCam`) !== null ? s.getItem(`${t}_tlCam`) : "Debug"), s.setItem(`${t}_trCam`, s.getItem(`${t}_trCam`) !== null ? s.getItem(`${t}_trCam`) : "Orthographic"), s.setItem(`${t}_blCam`, s.getItem(`${t}_blCam`) !== null ? s.getItem(`${t}_blCam`) : "Front"), s.setItem(`${t}_brCam`, s.getItem(`${t}_brCam`) !== null ? s.getItem(`${t}_brCam`) : "Top"), s.setItem(`${t}_tlRender`, s.getItem(`${t}_tlRender`) !== null ? s.getItem(`${t}_tlRender`) : "Renderer"), s.setItem(`${t}_trRender`, s.getItem(`${t}_trRender`) !== null ? s.getItem(`${t}_trRender`) : "Renderer"), s.setItem(`${t}_blRender`, s.getItem(`${t}_blRender`) !== null ? s.getItem(`${t}_blRender`) : "Renderer"), s.setItem(`${t}_brRender`, s.getItem(`${t}_brRender`) !== null ? s.getItem(`${t}_brRender`) : "Renderer");
    const a = {
      Vector2: ke,
      Vector3: W,
      Vector4: Gs,
      Quaternion: Vs,
      Matrix4: jt,
      Spherical: Bs,
      Box3: Hs,
      Sphere: zs,
      Raycaster: pt
    };
    re.install({ THREE: a }), this.setupScene(), this.setupTools();
    const r = localStorage.getItem(this.expandedCameraVisibility);
    r !== null && (this.cameraVisibility = r === "open"), this.saveExpandedCameraVisibility();
    const o = localStorage.getItem(this.expandedLightVisibility);
    o !== null && (this.lightVisibility = o === "open"), this.saveExpandedLightVisibility();
    const c = localStorage.getItem(this.expandedGridVisibility);
    c !== null && (this.gridVisibility = c === "open"), this.grid && (this.grid.visible = this.gridVisibility), this.saveExpandedGridVisibility(), G.instance = this;
  }
  componentDidMount() {
    this.enable(), this.assignControls(), this.resize(), this.play(), Y.instance.setApp(this.props.three), Y.instance.activeCamera = this.debugCamera, this.props.three.requestRenderer();
  }
  componentDidUpdate(e, t, s) {
    t.mode !== this.state.mode && (this.assignControls(), this.resize());
  }
  componentWillUnmount() {
    this.disable(), this.clear(), I.removeEditorGroup("View Settings");
  }
  render() {
    const e = [];
    return this.cameras.forEach((t, s) => {
      e.push(s);
    }), /* @__PURE__ */ M("div", { className: "multiview", children: [
      /* @__PURE__ */ f("canvas", { ref: this.canvasRef }),
      /* @__PURE__ */ M("div", { className: `cameras ${this.state.mode === "Single" || this.state.mode === "Stacked" ? "single" : ""}`, ref: this.containerRef, children: [
        this.state.mode === "Single" && /* @__PURE__ */ f(K, { children: /* @__PURE__ */ f(
          _e,
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
        (this.state.mode === "Side by Side" || this.state.mode === "Stacked") && /* @__PURE__ */ M(K, { children: [
          /* @__PURE__ */ f(
            _e,
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
          /* @__PURE__ */ f(
            _e,
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
        this.state.mode === "Quad" && /* @__PURE__ */ M(K, { children: [
          /* @__PURE__ */ f(
            _e,
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
          /* @__PURE__ */ f(
            _e,
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
          /* @__PURE__ */ f(
            _e,
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
          /* @__PURE__ */ f(
            _e,
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
      /* @__PURE__ */ M("div", { className: "settings", children: [
        /* @__PURE__ */ f(
          gt,
          {
            title: "View",
            index: Ni.indexOf(this.state.mode),
            options: Ni,
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
        /* @__PURE__ */ f(
          gt,
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
        /* @__PURE__ */ f(
          Ht,
          {
            name: "cameraHelper",
            icon: Qr,
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
        /* @__PURE__ */ f(
          Ht,
          {
            name: "lightHelper",
            icon: Jr,
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
        ),
        /* @__PURE__ */ f(
          Ht,
          {
            name: "gridHelper",
            icon: ea,
            selected: this.gridVisibility,
            height: 21,
            width: 21,
            onClick: (t) => {
              this.setGridVisibility(t);
            }
          }
        )
      ] }, this.state.lastUpdate)
    ] });
  }
  // Setup
  setupRenderer = (e) => {
    this.renderer && this.renderer.dispose(), this.rendererReady = !1;
    const t = this.canvasRef.current;
    this.props.three.canvas = t;
    const s = e.value;
    s.type === "WebGLRenderer" ? (this.renderer = new lt({
      canvas: t,
      stencil: !1
    }), this.depthMaterial = new Ys(), this.normalsMaterial = new $s(), this.uvMaterial = new qr(), this.grid = new Vr(), this.scene.add(this.grid), this.rendererReady = !0) : s.type === "WebGPURenderer" && (this.renderer = new wt({
      canvas: t,
      stencil: !1
    }), this.grid = new Yr(), this.scene.add(this.grid)), this.renderer && (this.renderer.autoClear = !1, this.renderer.shadowMap.enabled = !0, this.renderer.setClearColor(0), this.renderer.setPixelRatio(devicePixelRatio), this.renderer.setScissorTest(!0), this.resize(), this.props.three.renderer = this.renderer, this.depthMaterial = new $r(), this.normalsMaterial = new un(), this.uvMaterial = new Kr(), s.type === "WebGPURenderer" && this.renderer.init().then(() => {
      this.rendererReady = !0;
    })), this.props.three.requestScene();
  };
  setupScene() {
    this.helpersContainer.name = "helpers", this.scene.add(this.helpersContainer), this.interactionHelper.name = "interactionHelper", this.interactionHelper.visible = !1, this.helpersContainer.add(this.interactionHelper);
    const e = (a, r) => {
      const o = new dt(-100, 100, 100, -100, 0, 3e3);
      return o.name = a, o.position.copy(r), o.lookAt(0, 0, 0), this.cameras.set(a, o), o;
    }, t = 1e3;
    e("Top", new W(0, t, 0)), e("Bottom", new W(0, -t, 0)), e("Left", new W(-t, 0, 0)), e("Right", new W(t, 0, 0)), e("Front", new W(0, 0, t)), e("Back", new W(0, 0, -t)), e("Orthographic", new W(t, t, t)), e("UI", new W()), this.debugCamera = new di(60, 1, 0.01, 3e3), this.debugCamera.name = "Debug", this.debugCamera.position.set(300, 300, 300), this.debugCamera.lookAt(0, 0, 0), this.cameras.set("Debug", this.debugCamera), this.currentCamera = this.debugCamera;
    const s = localStorage, n = this.props.three.name;
    this.tlCam = this.cameras.get(s.getItem(`${n}_tlCam`)), this.trCam = this.cameras.get(s.getItem(`${n}_trCam`)), this.blCam = this.cameras.get(s.getItem(`${n}_blCam`)), this.brCam = this.cameras.get(s.getItem(`${n}_brCam`)), this.tlCam === void 0 && (this.tlCam = this.cameras.get("Debug")), this.trCam === void 0 && (this.trCam = this.cameras.get("Orthographic")), this.blCam === void 0 && (this.blCam = this.cameras.get("Front")), this.brCam === void 0 && (this.brCam = this.cameras.get("Top")), I.addEditorGroup({
      title: "Editor",
      items: [
        {
          type: "button",
          prop: "Hide All Transforms"
        },
        {
          type: "button",
          prop: "Resize"
        }
      ],
      onUpdate: (a, r) => {
        switch (a) {
          case "Hide All Transforms":
            Y.instance.hide();
            break;
          case "Resize":
            this.resize();
            break;
        }
      },
      subgroups: [
        {
          title: "Debug Camera",
          items: [
            {
              type: "range",
              prop: "Near",
              step: 1e-4,
              min: 1e-3,
              max: 1e3,
              value: this.debugCamera.near
            },
            {
              type: "range",
              prop: "Far",
              step: 1e-3,
              min: 1e-3,
              max: 1e4,
              value: this.debugCamera.far
            }
          ],
          onUpdate: (a, r) => {
            switch (a) {
              case "Near":
                this.debugCamera.near = r, this.debugCamera.updateProjectionMatrix();
                break;
              case "Far":
                this.debugCamera.far = r, this.debugCamera.updateProjectionMatrix();
                break;
            }
          }
        },
        {
          title: "Grid",
          items: [
            {
              type: "number",
              prop: "Position",
              value: 0
            },
            {
              type: "color",
              prop: "Color",
              value: "#FFFFFF"
            },
            {
              type: "range",
              prop: "Grid Opacity",
              value: 0.25,
              min: 0,
              max: 1,
              step: 0.01
            },
            {
              type: "range",
              prop: "Subgrid Opacity",
              value: 0.15,
              min: 0,
              max: 1,
              step: 0.01
            }
          ],
          onUpdate: (a, r) => {
            switch (a) {
              case "Position":
                this.grid && (this.grid.position.y = r);
                break;
              case "Color":
                this.grid && this.grid.color.setStyle(r);
                break;
              case "Grid Opacity":
                this.grid && (this.grid.gridOpacity = r);
                break;
              case "Subgrid Opacity":
                this.grid && (this.grid.subgridOpacity = r);
                break;
            }
          }
        }
      ]
    });
  }
  setupTools() {
    this.splineEditor = new jr(this.currentCamera, this.three), this.splineEditor.initDebug(), this.helpersContainer.add(this.splineEditor);
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
  clear() {
    this.three.dispatchEvent({ type: P.CLEAR_OBJECT }), I.removeAllGroups(), this.clearLightHelpers(), this.clearControls(), this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), Y.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = void 0, Y.instance.clear(), this.cameras.forEach((e) => {
      this.editorCameras.indexOf(e.name) < 0 && this.three.dispatchEvent({ type: P.REMOVE_CAMERA, value: e });
    }), this.currentCamera = this.debugCamera, this.currentScene = void 0, this.scenes.forEach((e) => {
      this.three.dispatchEvent({ type: P.REMOVE_SCENE, value: e });
    }), this.scenes.clear();
  }
  setGridVisibility(e) {
    this.gridVisibility = e, this.saveExpandedGridVisibility(), this.grid && (this.grid.visible = e);
  }
  // Playback
  update() {
    this.renderer && this.rendererReady && this.renderer?.clear(), this.controls.forEach((e) => e.update()), this.cameraHelpers.forEach((e) => e.update()), this.lightHelpers.forEach((e) => {
      e.update !== void 0 && e.update();
    }), this.props.onSceneUpdate !== void 0 && this.currentScene !== void 0 && this.props.onSceneUpdate(this.currentScene);
  }
  draw() {
    if (this.rendererReady)
      switch (this.renderer && this.renderer?.clear(), this.state.mode) {
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
    e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("click", this.onClick), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.resize), this.three.addEventListener(P.ADD_SCENE, this.addScene), this.three.addEventListener(P.SET_SCENE, this.sceneUpdate), this.three.addEventListener(P.REMOVE_SCENE, this.removeScene), this.three.addEventListener(P.ADD_CAMERA, this.addCamera), this.three.addEventListener(P.REMOVE_CAMERA, this.removeCamera), this.three.addEventListener(P.SET_OBJECT, this.onSetSelectedItem);
  }
  disable() {
    const e = this.containerRef.current;
    e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("click", this.onClick), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.resize), this.three.removeEventListener(P.ADD_SCENE, this.addScene), this.three.removeEventListener(P.SET_SCENE, this.sceneUpdate), this.three.removeEventListener(P.ADD_CAMERA, this.addCamera), this.three.removeEventListener(P.REMOVE_CAMERA, this.removeCamera), this.three.removeEventListener(P.SET_OBJECT, this.onSetSelectedItem);
  }
  resize = () => {
    this.width = window.innerWidth - 300, this.height = window.innerHeight, this.renderer?.setSize(this.width, this.height);
    const e = Math.floor(this.width / 2), t = Math.floor(this.height / 2);
    this.props.three.resize(this.width, this.height), this.props.onSceneResize !== void 0 && this.currentScene !== void 0 && this.props.onSceneResize(this.currentScene, this.width, this.height);
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
      r instanceof dt ? (r.left = s / -2, r.right = s / 2, r.top = n / 2, r.bottom = n / -2, r.name === "UI" && (r.position.x = this.width / 2, r.position.y = this.height / -2, r.position.z = 100), r.updateProjectionMatrix()) : r instanceof di && (r.aspect = a, r.updateProjectionMatrix()), this.cameraHelpers.get(r.name)?.update();
    });
  };
  addScene = (e) => {
    const t = this.props.scenes.get(e.value.name);
    if (t !== void 0) {
      const s = new t();
      s.visible = !1, this.props.onSceneAdd !== void 0 && this.props.onSceneAdd(s), this.props.three.scene = s, this.scenes.set(e.value.name, s), this.scene.add(s);
    } else
      console.log("Hermes - Scene not found:", e.value.name, this.props.scenes);
  };
  sceneUpdate = (e) => {
    this.currentScene !== void 0 && (this.currentScene.visible = !1, this.clearLightHelpers());
    const t = this.scene.getObjectByName(e.value.name);
    t !== void 0 && (this.currentScene = t, this.currentScene.visible = !0, this.addLightHelpers(this.currentScene));
  };
  removeScene = (e) => {
    const t = e.value.name;
    this.scenes.delete(t);
    const s = this.scene.getObjectByName(t);
    s && setTimeout(() => {
      ce(s);
    }, 100), this.clearLightHelpers();
  };
  addCamera = (e) => {
    const t = e.value, s = t.uuid, n = this.props.three.scene?.getObjectByProperty("uuid", t.uuid);
    if (n !== void 0) {
      const a = n;
      this.cameras.set(s, a);
      const r = new Ws(a);
      r.visible = this.cameraVisibility, this.cameraHelpers.set(s, r), this.helpersContainer.add(r), this.setState({ lastUpdate: Date.now() });
    }
  };
  removeCamera = (e) => {
    const s = e.value.uuid, n = this.cameraHelpers.get(s);
    n !== void 0 && (this.helpersContainer.remove(n), n.dispose()), this.cameras.delete(s), this.setState({ lastUpdate: Date.now() });
  };
  onMouseMove = (e) => {
    const t = new ke();
    this.renderer?.getSize(t);
    const s = Math.min(e.clientX, t.x), n = Math.min(e.clientY, t.y);
    this.pointer.x = xe(s, 0, t.x, -1, 1), this.pointer.y = xe(n, 0, t.y, 1, -1);
    const a = t.x / 2, r = t.y / 2, o = () => {
      s < a ? this.pointer.x = xe(s, 0, a, -1, 1) : this.pointer.x = xe(s, a, t.x, -1, 1);
    }, c = () => {
      n < r ? this.pointer.y = xe(n, 0, r, 1, -1) : this.pointer.y = xe(n, r, t.y, 1, -1);
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
    if (this.updateCamera(s, n, a, r), this.state.interactionMode === "Orbit" || this.currentScene === void 0) return;
    const l = this.raycaster.intersectObjects(this.currentScene.children);
    l.length > 0 && this.interactionHelper.position.copy(l[0].point);
  };
  onClick = (e) => {
    if (this.state.interactionMode === "Orbit" || this.currentScene === void 0) return;
    const t = new ke();
    if (this.renderer.getSize(t), e.clientX >= t.x) return;
    this.onMouseMove(e);
    const s = this.raycaster.intersectObjects(this.currentScene.children);
    s.length > 0 && (this.props.three.getObject(s[0].object.uuid), this.interactionHelper.visible = !1, this.setState({ interactionMode: "Orbit", lastUpdate: Date.now() }));
  };
  onKey = (e) => {
    if (this.selectedItem !== void 0) {
      if (e.ctrlKey) {
        if (this.currentCamera.name === "UI") return;
        const t = this.controls.get(this.currentCamera.name);
        e.key === "0" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new re(this.currentCamera, this.currentWindow.current), this.selectedItem instanceof Fe || this.selectedItem instanceof Zs ? (this.selectedItem.geometry.computeBoundingBox(), this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, !0)) : this.cameraControls.fitToSphere(this.selectedItem, !0), this.updateCameraControls(t, !0)) : e.key === "1" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new re(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, Math.PI * 0.5, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "2" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new re(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(0, 0, !0), this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "3" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new re(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, !0), this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, !0), this.updateCameraControls(t)) : e.key === "4" ? (e.preventDefault(), this.clearControls(), this.cameraControls = new re(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Math.PI, Math.PI / 2, !0), this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, !0), this.updateCameraControls(t)) : e.key === "5" && (e.preventDefault(), this.clearControls(), this.cameraControls = new re(this.currentCamera, this.currentWindow.current), this.cameraControls.rotateTo(Wt(45), Wt(45), !0), this.updateCameraControls(t));
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
    this.selectedItem !== void 0 && this.updateSelectedItemHelper(!1), this.selectedItem = void 0;
    const t = e.value.uuid;
    if (this.scenes.forEach((s) => {
      t.search(s.uuid) > -1 && (this.selectedItem = s.getObjectByProperty("uuid", t));
    }), this.selectedItem === void 0) {
      console.log(`Hermes - Can't find selected item: ${e.value.uuid}, ${e.value.name}`);
      return;
    }
    this.currentTransform !== void 0 && (this.currentTransform.removeEventListener("objectChange", this.onUpdateTransform), Y.instance.remove(this.currentTransform.getHelper().name)), this.currentTransform = Y.instance.add(e.value.name), this.currentTransform && (this.currentTransform.attach(this.selectedItem), this.helpersContainer.add(this.currentTransform.getHelper()), this.currentTransform.addEventListener("objectChange", this.onUpdateTransform)), this.updateSelectedItemHelper(!0);
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
    }), this.props.three.updateObject(this.selectedItem.uuid, "scale", this.selectedItem.scale), Et.instance.update());
  };
  // Utils
  clearLightHelpers = () => {
    this.lightHelpers.forEach((e) => {
      this.helpersContainer.remove(e), e.dispose();
    }), this.lightHelpers.clear();
  };
  addLightHelpers = (e) => {
    e.traverse((t) => {
      if (t.type.search("Light") > -1) {
        let s;
        switch (t.type) {
          case "DirectionalLight":
            s = new js(t, 100), s.name = `${t.name}Helper`, s.visible = this.lightVisibility, this.lightHelpers.set(t.name, s), this.helpersContainer.add(s);
            break;
          case "HemisphereLight":
            s = new Xs(t, 250), s.name = `${t.name}Helper`, s.visible = this.lightVisibility, this.lightHelpers.set(t.name, s), this.helpersContainer.add(s);
            break;
          case "RectAreaLight":
            s = new pn(t), s.name = `${t.name}Helper`, s.visible = this.lightVisibility, this.lightHelpers.set(t.name, s), this.helpersContainer.add(s);
            break;
          case "PointLight":
            s = new Ks(t, 100), s.name = `${t.name}Helper`, s.visible = this.lightVisibility, this.lightHelpers.set(t.name, s), this.helpersContainer.add(s);
            break;
          case "SpotLight":
            s = new qs(t), s.name = `${t.name}Helper`, s.visible = this.lightVisibility, this.lightHelpers.set(t.name, s), this.helpersContainer.add(s);
            break;
        }
      }
    });
  };
  createControls(e, t) {
    const s = this.controls.get(e.name);
    if (s !== void 0 && s.dispose(), this.controls.delete(e.name), e.name === "UI") return;
    const n = new mn(e, t);
    switch (n.enableDamping = !0, n.dampingFactor = 0.1, e.name) {
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
    t !== void 0 && (this.helpersContainer.remove(t), t.dispose(), this.cameraHelpers.delete(e.name));
    const s = this.controls.get(e.name);
    s !== void 0 && (s.dispose(), this.controls.delete(e.name));
  }
  killControls() {
    this.controls.forEach((e, t) => {
      e.dispose();
      const s = this.cameraHelpers.get(t);
      s !== void 0 && (this.helpersContainer.remove(s), s.dispose()), this.cameraHelpers.delete(t), this.controls.delete(t);
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
    this.splineEditor.camera = this.currentCamera, this.raycaster.setFromCamera(this.pointer, this.currentCamera), this.currentCamera === this.tlCam ? this.currentWindow = this.tlWindow : this.currentCamera === this.trCam ? this.currentWindow = this.trWindow : this.currentCamera === this.blCam ? this.currentWindow = this.blWindow : this.currentCamera === this.brCam && (this.currentWindow = this.brWindow), Y.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };
  updateCameraControls = (e, t = !1) => {
    if (this.selectedItem === void 0) return;
    cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.cameraControls && (this.cameraControls.smoothTime = 0.1);
    const s = 0.15, n = new Qs();
    n.start(), this.selectedItem.getWorldPosition(e.target0);
    const a = () => {
      const r = n.getDelta();
      this.cameraControls && this.cameraControls.update(r), t && (e.target.lerp(e.target0, s), e.object.position.lerp(e.position0, s), e.object.zoom = je(e.object.zoom, e.zoom0, s), e.object.updateProjectionMatrix(), e.dispatchEvent({ type: "change" })), n.getElapsedTime() >= 0.5 ? (cancelAnimationFrame(this.cameraControlsRafID), this.cameraControlsRafID = -1, this.clearControls()) : this.cameraControlsRafID = requestAnimationFrame(a);
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
  saveExpandedGridVisibility() {
    localStorage.setItem(this.expandedGridVisibility, this.gridVisibility ? "open" : "closed");
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
        this.grid && (this.grid.rotation.z = Math.PI / 2);
        break;
      case "Front":
      case "Back":
        this.grid && (this.grid.rotation.x = Math.PI / 2);
        break;
    }
    this.scene.overrideMaterial = r, this.renderer && (this.renderer?.setScissor(e, t, s, n), this.renderer?.setViewport(e, t, s, n), this.renderer?.render(this.scene, a)), this.grid && this.grid.rotation.set(0, 0, 0);
  }
  drawSingle() {
    const e = this.getSceneOverride(this.tlRender);
    this.drawTo(0, 0, this.width, this.height, this.tlCam, e);
  }
  drawDouble = () => {
    const e = this.getSceneOverride(this.tlRender), t = this.getSceneOverride(this.trRender), s = Math.floor(this.width / 2), n = Math.floor(this.height / 2), a = this.renderer instanceof wt;
    if (this.state.mode === "Side by Side")
      this.drawTo(0, 0, s, this.height, this.tlCam, e), this.drawTo(s, 0, s, this.height, this.trCam, t);
    else {
      const r = this.height - n;
      a ? (this.drawTo(0, 0, this.width, n, this.tlCam, e), this.drawTo(0, r, this.width, n, this.trCam, t)) : (this.drawTo(0, r, this.width, n, this.tlCam, e), this.drawTo(0, 0, this.width, n, this.trCam, t));
    }
  };
  drawQuad = () => {
    const e = this.renderer instanceof wt, t = this.getSceneOverride(this.tlRender), s = this.getSceneOverride(this.trRender), n = this.getSceneOverride(this.blRender), a = this.getSceneOverride(this.brRender), r = Math.floor(this.width / 2), o = Math.floor(this.height / 2), c = this.height - o;
    let l = 0, h = e ? 0 : this.height - o;
    l = 0, this.drawTo(l, h, r, o, this.tlCam, t), l = r, this.drawTo(l, h, r, o, this.trCam, s), h = e ? c : 0, l = 0, this.scene.overrideMaterial = n, this.drawTo(l, h, r, o, this.blCam, n), l = r, this.drawTo(l, h, r, o, this.brCam, a);
  };
  // Getters
  get appID() {
    return this.props.three.name;
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
  get expandedGridVisibility() {
    return `${this.appID}_multiviewGridVisibility`;
  }
}
class Et extends Qe {
  static instance;
  matrix = new jt();
  position = new W();
  rotation = new Js();
  scale = new W();
  open = !1;
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), s = t !== null ? t === "open" : !1;
    this.open = s, this.saveExpanded(), this.state = {
      lastUpdated: 0,
      expanded: s
    }, this.matrix.elements = e.object.matrix, e.object.uuid.length > 0 && (this.position.setFromMatrixPosition(this.matrix), this.rotation.setFromRotationMatrix(this.matrix), this.scale.setFromMatrixScale(this.matrix)), Et.instance = this;
  }
  update() {
    if (G.instance) {
      const e = G.instance.selectedItem;
      if (e === void 0) return;
      this.position.x = te(e.position.x, 3), this.position.y = te(e.position.y, 3), this.position.z = te(e.position.z, 3), this.rotation.copy(e.rotation), this.scale.x = te(e.scale.x, 3), this.scale.y = te(e.scale.y, 3), this.scale.z = te(e.scale.z, 3), this.setState({ lastUpdated: Date.now() });
    }
  }
  render() {
    return /* @__PURE__ */ f(
      Q,
      {
        three: this.props.three,
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
      V(a, e, s);
    }
  };
  saveExpanded() {
    localStorage.setItem(this.expandedName, this.open ? "open" : "closed");
  }
  get expandedName() {
    return `${this.props.three.name}_transform`;
  }
}
function Fi(i) {
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
function ta(i, e) {
  function t() {
    return `${e.name}_light`;
  }
  const s = localStorage.getItem(t()), n = s !== null ? s === "open" : !1;
  function a(o) {
    localStorage.setItem(t(), o ? "open" : "closed");
  }
  const r = [];
  if (i.lightInfo !== void 0)
    for (const o in i.lightInfo) {
      const c = i.lightInfo[o];
      c !== void 0 && (c.isColor !== void 0 ? r.push({
        title: Fi(o),
        prop: o,
        type: "color",
        value: c,
        onChange: (l, h) => {
          const d = new le(h);
          e.updateObject(i.uuid, l, d);
          const u = e.getScene(i.uuid);
          if (u !== null) {
            const m = u.getObjectByProperty("uuid", i.uuid);
            V(m, l, d);
          }
        }
      }) : r.push({
        title: Fi(o),
        prop: o,
        type: typeof c,
        value: c,
        step: typeof c == "number" ? 0.01 : void 0,
        onChange: (l, h) => {
          e.updateObject(i.uuid, l, h);
          const d = e.getScene(i.uuid);
          if (d !== null) {
            const u = d.getObjectByProperty("uuid", i.uuid);
            V(u, l, h);
          }
        }
      }));
    }
  return /* @__PURE__ */ f(
    Q,
    {
      three: e,
      title: "Light",
      items: r,
      expanded: n,
      onToggle: (o) => {
        a(o);
      }
    }
  );
}
function ia(i) {
  const e = i.object, t = i.three;
  function s() {
    return `${t.name}_animation`;
  }
  const n = localStorage.getItem(s()), a = n !== null ? n === "open" : !1;
  function r(u) {
    localStorage.setItem(s(), u ? "open" : "closed");
  }
  const o = [], c = [];
  let l = 0;
  e.animations.forEach((u) => {
    l = Math.max(l, u.duration), u.duration > 0 && c.push({
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
  }), o.push({
    title: "Animations",
    items: c
  });
  let h;
  const d = t.getScene(e.uuid);
  if (d !== null) {
    const u = d.getObjectByProperty("uuid", e.uuid);
    if (u !== void 0) {
      const m = u.mixer;
      if (m !== void 0) {
        const v = [
          {
            title: "Time Scale",
            type: "range",
            value: m.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (y, g) => {
              m.timeScale = g, t.updateObject(e.uuid, "mixer.timeScale", g);
            }
          }
        ];
        v.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            m.stopAllAction(), t.requestMethod(e.uuid, "stopAllAction", void 0, "mixer");
          }
        }), o.push({
          title: "Mixer",
          items: v
        }), h = new en(u), G.instance?.scene.add(h);
      }
    }
  }
  return Ee(() => () => {
    h !== void 0 && ce(h);
  }, []), /* @__PURE__ */ f(
    Q,
    {
      three: i.three,
      title: "Animation",
      items: o,
      expanded: a,
      onToggle: (u) => {
        r(u);
      }
    }
  );
}
const Gt = {
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
function sa(i) {
  const [e, t] = L(Gt);
  Ee(() => {
    function r(c) {
      t(c.value);
    }
    function o() {
      t(Gt);
    }
    return i.three.addEventListener(P.CLEAR_OBJECT, o), i.three.addEventListener(P.SET_SCENE, o), i.three.addEventListener(P.SET_OBJECT, r), () => {
      i.three.removeEventListener(P.CLEAR_OBJECT, o), i.three.removeEventListener(P.SET_SCENE, o), i.three.removeEventListener(P.SET_OBJECT, r);
    };
  }, []);
  const s = e.type.toLowerCase(), n = e.animations.length > 0 || e.mixer !== void 0, a = s.search("mesh") > -1 || s.search("line") > -1 || s.search("points") > -1;
  return a && console.log(s, e), /* @__PURE__ */ f(
    Ke,
    {
      three: i.three,
      label: "Inspector",
      button: e.uuid.length > 0 ? /* @__PURE__ */ f("button", { className: "remove", onClick: () => {
        Y.instance.remove(e.name), t(Gt);
      } }) : void 0,
      children: /* @__PURE__ */ f("div", { id: "Inspector", className: i.class, children: e.uuid.length > 0 && /* @__PURE__ */ M(K, { children: [
        /* @__PURE__ */ M(K, { children: [
          /* @__PURE__ */ f(
            ct,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: e.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ f(
            ct,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: e.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ f(
            ct,
            {
              type: "string",
              title: "UUID",
              prop: "uuid",
              value: e.uuid,
              disabled: !0
            }
          )
        ] }),
        /* @__PURE__ */ M(K, { children: [
          /* @__PURE__ */ f(Et, { object: e, three: i.three }),
          n ? /* @__PURE__ */ f(ia, { object: e, three: i.three }) : null,
          s.search("camera") > -1 ? Lr(e, i.three) : null,
          s.search("light") > -1 ? ta(e, i.three) : null,
          a ? Dr(e, i.three) : null
        ] })
      ] }) })
    },
    "Inspector"
  );
}
class na extends Qe {
  // Renderer
  autoClear = !0;
  autoClearColor = !0;
  autoClearDepth = !0;
  autoClearStencil = !0;
  outputColorSpace = ui;
  localClippingEnabled = !1;
  clearColor = new le(0);
  clearAlpha = 1;
  toneMapping = pi;
  toneMappingExposure = 1;
  type = "";
  constructor(e) {
    super(e);
    const t = localStorage.getItem(this.expandedName), s = t !== null ? t === "open" : !1;
    if (this.state = {
      expanded: s,
      lastUpdated: Date.now()
    }, this.saveExpanded(s), G.instance) {
      const n = G.instance.renderer;
      n && (this.autoClear = n.autoClear, this.autoClearColor = n.autoClearColor, this.autoClearDepth = n.autoClearDepth, this.autoClearStencil = n.autoClearStencil, this.clearAlpha = n.getClearAlpha(), this.toneMapping = n.toneMapping, this.toneMappingExposure = n.toneMappingExposure, n instanceof lt && (this.localClippingEnabled = n.localClippingEnabled, n.getClearColor(this.clearColor)));
    }
    this.props.three.addEventListener(P.ADD_RENDERER, this.onAddRenderer);
  }
  componentwillunmount() {
    this.props.three.removeEventListener(P.ADD_RENDERER, this.onAddRenderer);
  }
  onAddRenderer = (e) => {
    const t = e.value;
    if (this.autoClear = t.autoClear, this.autoClearColor = t.autoClearColor, this.autoClearDepth = t.autoClearDepth, this.autoClearStencil = t.autoClearStencil, this.outputColorSpace = t.outputColorSpace, this.localClippingEnabled = t.localClippingEnabled, this.clearAlpha = t.clearAlpha, this.type = t.type, this.toneMapping = t.toneMapping, this.toneMappingExposure = t.toneMappingExposure, this.clearColor.setStyle(t.clearColor, Xe), ye.enabled = t.colorManagement, G.instance) {
      const s = G.instance.renderer;
      s && (s.autoClearColor = this.autoClearColor, s.outputColorSpace = this.outputColorSpace, s instanceof lt && (s.localClippingEnabled = this.localClippingEnabled), s.toneMapping = this.toneMapping, s.toneMappingExposure = this.toneMappingExposure, s.setClearColor(t.clearColor, this.clearAlpha));
    }
    this.setState({ lastUpdated: Date.now() });
  };
  render() {
    const e = () => {
      if (G.instance) {
        const t = G.instance.renderer;
        t && (t.autoClearColor = this.autoClearColor, t.outputColorSpace = this.outputColorSpace, t instanceof lt && (t.localClippingEnabled = this.localClippingEnabled), t.toneMapping = this.toneMapping, t.toneMappingExposure = this.toneMappingExposure, t.setClearColor(this.clearColor.getStyle(), this.clearAlpha), this.props.three.updateRenderer({
          autoClear: this.autoClear,
          autoClearColor: this.autoClearColor,
          autoClearDepth: this.autoClearDepth,
          autoClearStencil: this.autoClearStencil,
          outputColorSpace: this.outputColorSpace,
          localClippingEnabled: this.localClippingEnabled,
          clearAlpha: this.clearAlpha,
          clearColor: this.clearColor.getStyle(),
          colorManagement: ye.enabled,
          toneMapping: this.toneMapping,
          toneMappingExposure: this.toneMappingExposure
        }));
      }
    };
    return /* @__PURE__ */ f(
      Q,
      {
        three: this.props.three,
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
            title: "Color Management",
            value: ye.enabled,
            onChange: (t, s) => {
              ye.enabled = s, e();
            }
          },
          {
            type: "option",
            title: "Color Space",
            value: this.outputColorSpace,
            options: [
              {
                title: "No Color Space",
                value: tn
              },
              {
                title: "SRB Color Space",
                value: ui
              },
              {
                title: "Linear SRB Color Space",
                value: Xe
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
                value: pi
              },
              {
                title: "Linear ",
                value: sn
              },
              {
                title: "Reinhard",
                value: nn
              },
              {
                title: "Cineon ",
                value: rn
              },
              {
                title: "ACES Filmic",
                value: an
              },
              {
                title: "AgX",
                value: on
              },
              {
                title: "Neutral",
                value: ln
              },
              {
                title: "Custom",
                value: cn
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
          },
          {
            type: "string",
            title: "Type",
            value: this.type,
            disabled: !0
          },
          {
            type: "button",
            title: "Resize Scenes from Source",
            onChange: () => {
              this.props.three.requestSize();
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
    return `${this.props.three.name}_renderer`;
  }
}
function ra(i) {
  const [e] = L([]), [t] = L([]), [s, n] = L(0), a = (l) => {
    const h = l.value;
    e.push(h), t.push(
      /* @__PURE__ */ f(
        Ke,
        {
          three: i.three,
          label: `Scene: ${h.name}`,
          scene: h,
          open: !1,
          visible: !1,
          onRefresh: () => {
            i.three.refreshScene(h.name);
          },
          children: /* @__PURE__ */ f(Dt, { child: h, scene: h, three: i.three })
        },
        h.name
      )
    ), n(Date.now());
  }, r = (l) => {
    const h = l.value;
    for (let d = 0; d < e.length; d++)
      if (h.uuid === e[d].uuid) {
        e[d] = h, t[d] = /* @__PURE__ */ f(
          Ke,
          {
            three: i.three,
            label: `Scene: ${h.name}`,
            scene: h,
            open: t[d].props.open,
            visible: t[d].props.visible,
            onRefresh: () => {
              i.three.refreshScene(h.name);
            },
            children: /* @__PURE__ */ f(Dt, { child: h, scene: h, three: i.three })
          },
          h.name
        ), n(Date.now());
        return;
      }
  }, o = (l) => {
    const h = l.value;
    for (let d = 0; d < e.length; d++)
      if (h.uuid === e[d].uuid) {
        e.splice(d, 1), t.splice(d, 1), n(Date.now());
        return;
      }
  }, c = (l) => {
    const h = l.value.name;
    for (let d = 0; d < e.length; d++) {
      const u = e[d], m = u.name === h;
      t[d] = /* @__PURE__ */ f(
        Ke,
        {
          three: i.three,
          label: `Scene: ${u.name}`,
          scene: u,
          open: m,
          visible: m,
          onRefresh: () => {
            i.three.refreshScene(u.name);
          },
          children: /* @__PURE__ */ f(Dt, { child: u, scene: u, three: i.three })
        },
        u.name
      );
    }
    n(Date.now());
  };
  return Ee(() => (i.three.addEventListener(P.ADD_SCENE, a), i.three.addEventListener(P.SET_SCENE, c), i.three.addEventListener(P.REFRESH_SCENE, r), i.three.addEventListener(P.REMOVE_SCENE, o), () => {
    i.three.removeEventListener(P.ADD_SCENE, a), i.three.removeEventListener(P.SET_SCENE, c), i.three.removeEventListener(P.REFRESH_SCENE, r), i.three.removeEventListener(P.REMOVE_SCENE, o);
  }), []), /* @__PURE__ */ M("div", { id: "SidePanel", children: [
    /* @__PURE__ */ f("div", { className: "scenes", children: t }, s),
    /* @__PURE__ */ f(sa, { three: i.three }),
    /* @__PURE__ */ f(na, { three: i.three }),
    /* @__PURE__ */ f(I, { three: i.three })
  ] });
}
function aa(i) {
  return /* @__PURE__ */ M("div", { className: "editor", ref: i.ref, style: i.style, children: [
    /* @__PURE__ */ f("div", { className: "header", children: i.header }),
    i.children,
    /* @__PURE__ */ f("div", { className: "footer", children: i.footer })
  ] });
}
function Xa(i) {
  return /* @__PURE__ */ f(aa, { children: /* @__PURE__ */ M(K, { children: [
    /* @__PURE__ */ f(
      G,
      {
        three: i.three,
        scenes: i.scenes,
        onSceneAdd: i.onSceneAdd,
        onSceneResize: i.onSceneResize,
        onSceneUpdate: i.onSceneUpdate
      }
    ),
    /* @__PURE__ */ f(ra, { three: i.three })
  ] }) });
}
export {
  Ke as Accordion,
  Za as Application,
  ss as BaseRemote,
  as as ChildObject,
  Dt as ContainerObject,
  $r as DepthNodeMaterial,
  pr as Draggable,
  ur as DraggableItem,
  mr as Dropdown,
  fr as DropdownItem,
  aa as Editor,
  $a as ElementProxy,
  ir as ElementProxyReceiver,
  pe as ExportTexture,
  Vr as InfiniteGridHelper,
  Yr as InfiniteGridHelperGPU,
  Br as InfiniteGridMaterial,
  Gr as InfiniteGridNodeMaterial,
  sa as Inspector,
  G as MultiView,
  rs as NavButton,
  Wa as ProxyManager,
  qa as RemoteTheatre,
  Ka as RemoteThree,
  ra as SidePanel,
  Vt as Spline,
  jr as SplineEditor,
  Xa as ThreeEditor,
  Y as Transform,
  qr as UVMaterial,
  Kr as UVNodeMaterial,
  Ya as WebworkerEventHandlers,
  Wn as anchorGeometry,
  Pa as anchorGeometryTL,
  Ta as animateObjectMaterial,
  xa as animateObjectTransform,
  $n as applyObjectMaterial,
  ft as capitalize,
  Ce as clamp,
  Va as clearComposerGroups,
  Ci as colorToHex,
  An as copyToClipboard,
  La as createMask,
  Ea as cubicBezier,
  wa as customizeTheatreElements,
  ya as damp,
  va as defaultTheatreCallback,
  kn as detectMaxFrameRate,
  Nn as detectSettings,
  ce as dispose,
  is as disposeMaterial,
  Oi as disposeTexture,
  Ca as distance,
  Ga as generateCubemap,
  ba as getAngle,
  Yn as getObjectMaterialObject,
  Gn as getObjectMaterialProps,
  $e as hierarchyUUID,
  Ba as inspectComposer,
  Zn as inspectComposerPass,
  Rn as isColor,
  _a as map,
  je as mix,
  mt as noop,
  Zt as normalize,
  Ma as orthoCamera,
  Aa as parseModelLite,
  $ as randomID,
  Ra as renderToTexture,
  it as resetThreeObjects,
  Sa as rgbaToHex,
  te as roundTo,
  Fa as setMaterialBlendAdd,
  za as setMaterialBlendMultiply,
  Na as setMaterialBlendNormal,
  Ha as setMaterialBlendScreen,
  Ua as supportsOffscreenCanvas,
  qt as totalThreeObjects,
  ii as triangle,
  Da as updateCameraOrtho,
  Ia as updateCameraOrtho16x9,
  ka as useMask,
  Oa as useStudio
};
