import { BufferGeometry as M, OrthographicCamera as y, Texture as g, Scene as T, MeshBasicMaterial as O, Float32BufferAttribute as l, Mesh as B, LinearSRGBColorSpace as m, ObjectLoader as R, AnimationMixer as D, AnimationClip as W, Matrix4 as Z, AlwaysStencilFunc as v, ReplaceStencilOp as o, NotEqualStencilFunc as A, EqualStencilFunc as w, KeepStencilOp as c, NormalBlending as q, AddEquation as u, SrcAlphaFactor as F, OneMinusSrcAlphaFactor as b, CustomBlending as f, OneFactor as x, DstColorFactor as P, OneMinusDstColorFactor as U } from "three";
const h = new M();
h.setAttribute("position", new l([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3));
h.setAttribute("normal", new l([0, 0, 1, 0, 0, 1], 3));
h.setAttribute("uv", new l([0, 0, 2, 0, 0, 2], 2));
const I = new y(-0.5, 0.5, 0.5, -0.5, 0, 100), S = (e) => {
  e?.dispose();
}, C = (e) => {
  if (e)
    if (Array.isArray(e))
      e.forEach((t) => C(t));
    else {
      for (const t in e) {
        const n = e[t];
        n !== null && n instanceof g && S(n);
      }
      if (e.isShaderMaterial === !0) {
        const t = e;
        for (const n in t.uniforms) {
          const i = t.uniforms[n];
          i.value !== null && i.value instanceof g && S(i.value);
        }
      }
      e.dispose();
    }
}, L = (e) => {
  if (e) {
    for (; e.children.length > 0; ) {
      const t = e.children[0];
      t.type === "Audio" ? (t.pause(), t.parent && t.parent.remove(t)) : L(t);
    }
    if (e.parent && e.parent.remove(e), e.isMesh) {
      const t = e;
      t.geometry?.dispose(), C(t.material);
    }
    e.dispose !== void 0 && e.dispose();
  }
};
let d = 0;
const N = () => {
  d = 0;
}, $ = (e) => {
  if (!e) return;
  let t = e.name.replaceAll(" ", "").replaceAll("/", ".");
  if (t.length === 0 && (t = `obj_${d}`, d++), e.parent !== null && e.parent.uuid.length > 0 && (t = `${e.parent.uuid}.${t}`), e.uuid = t, e.isMesh !== void 0) {
    const n = e;
    if (Array.isArray(n.material))
      n.material.forEach((i, s) => {
        i.uuid = `${t}.material.${s}`;
      });
    else {
      const i = n.material;
      i.uuid = `${t}.material`;
    }
  }
  e.children.forEach((n) => $(n));
};
class V {
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
  static renderToBlob(t) {
    this.init();
    const n = t.repeat.clone(), i = t.offset.clone();
    if (t.repeat.set(1, 1), t.offset.set(0, 0), this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);
      const s = t.image;
      if (s != null && s.width > 0) {
        this.canvas.title = t.sourceFile;
        const r = this.canvas.width / s.width, a = this.renderToCanvas(t);
        this.context.drawImage(a, 0, 0, s.width * r, s.height * r);
      }
    }
    return t.repeat.copy(n), t.offset.copy(i), this.canvas.toDataURL("image/png");
  }
  static renderToCanvas(t) {
    if (this.material === null) {
      this.camera = new y(-0.5, 0.5, 0.5, -0.5, 0, 100), this.scene = new T(), this.material = new O();
      const n = new M();
      n.setAttribute("position", new l([-0.5, -0.5, 0, 1.5, -0.5, 0, -0.5, 1.5, 0], 3)), n.setAttribute("normal", new l([0, 0, 1, 0, 0, 1], 3)), n.setAttribute("uv", new l([0, 0, 2, 0, 0, 2], 2));
      const i = new B(n, this.material);
      this.scene.add(i);
    }
    if (t.isRenderTargetTexture)
      this.material.map = t, this.renderer.render(this.scene, this.camera);
    else {
      const n = this.renderer.outputColorSpace, i = t.colorSpace;
      this.renderer.outputColorSpace = m, t.colorSpace = m, this.material.map = t, this.renderer.render(this.scene, this.camera), this.renderer.outputColorSpace = n, t.colorSpace = i;
    }
    return this.renderer.domElement;
  }
}
function H(e) {
  return new Promise((t) => {
    const n = new R();
    n.parseAsync(e.scene).then((i) => {
      const s = new D(i);
      if (e.animations.length > 0) {
        const a = e.animations.map((E) => W.parse(E));
        s.clipAction(a[0]).play(), s.getRoot().animations = e.animations, s.getRoot().mixer = s;
      }
      const r = [];
      e.cameras && e.cameras.length > 0 && e.cameras.forEach((a) => {
        const p = n.parse(a);
        r.push(p);
      }), t({
        animations: e.animations,
        model: i,
        mixer: s,
        cameras: r
      });
    });
  });
}
const K = (e, t, n, i) => {
  e.setRenderTarget(i), e.clear(), e.render(t, n);
};
function G(e, t, n, i) {
  e.applyMatrix4(new Z().makeTranslation(t, -n, -i));
}
function _(e) {
  e.computeBoundingBox();
  const t = e.boundingBox, n = (t.max.x - t.min.x) / 2, i = (t.max.y - t.min.y) / 2;
  G(e, n, i, 0);
}
function z(e, t, n) {
  e.left = t / -2, e.right = t / 2, e.top = n / 2, e.bottom = n / -2, e.position.x = t / 2, e.position.y = n / -2, e.updateProjectionMatrix();
}
function J(e, t, n) {
  const i = 1.7777777777777777, s = t / n;
  let r = t, a = n;
  s > i ? r = n * i : a = t / i, e.left = r / -2, e.right = r / 2, e.top = a / 2, e.bottom = a / -2, e.updateProjectionMatrix();
}
function Q() {
  let t = "transferControlToOffscreen" in document.createElement("canvas");
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    const i = navigator.userAgent.match(/version\/(\d+)/i);
    t = (i ? parseInt(i[1]) : 0) >= 17;
  }
  return t;
}
function X(e, t, n = !0, i = !1) {
  e.renderOrder = -t;
  const s = e.material;
  Array.isArray(s) ? s.forEach((r) => {
    r.colorWrite = n, r.depthWrite = i, r.stencilWrite = !0, r.stencilRef = t, r.stencilFunc = v, r.stencilFail = o, r.stencilZFail = o, r.stencilZPass = o;
  }) : (s.colorWrite = n, s.depthWrite = i, s.stencilWrite = !0, s.stencilRef = t, s.stencilFunc = v, s.stencilFail = o, s.stencilZFail = o, s.stencilZPass = o);
}
function Y(e, t, n = !1) {
  const i = e.material;
  Array.isArray(i) ? i.forEach((s) => {
    s.stencilWrite = !0, s.stencilRef = t, s.stencilFunc = n ? A : w, s.stencilFail = c, s.stencilZFail = c, s.stencilZPass = c;
  }) : (i.stencilWrite = !0, i.stencilRef = t, i.stencilFunc = n ? A : w, i.stencilFail = c, i.stencilZFail = c, i.stencilZPass = c);
}
function j(e) {
  e.blending = q, e.blendEquation = u, e.blendSrc = F, e.blendDst = b, e.needsUpdate = !0;
}
function ee(e) {
  e.blending = f, e.blendEquation = u, e.blendSrc = F, e.blendDst = x, e.needsUpdate = !0;
}
function te(e) {
  e.blending = f, e.blendEquation = u, e.blendSrc = P, e.blendDst = b, e.needsUpdate = !0;
}
function ne(e) {
  e.blending = f, e.blendEquation = u, e.blendSrc = U, e.blendDst = x, e.needsUpdate = !0;
}
export {
  V as ExportTexture,
  G as anchorGeometry,
  _ as anchorGeometryTL,
  X as createMask,
  L as dispose,
  C as disposeMaterial,
  S as disposeTexture,
  $ as hierarchyUUID,
  I as orthoCamera,
  H as parseModelLite,
  K as renderToTexture,
  N as resetThreeObjects,
  ee as setMaterialBlendAdd,
  te as setMaterialBlendMultiply,
  j as setMaterialBlendNormal,
  ne as setMaterialBlendScreen,
  Q as supportsOffscreenCanvas,
  d as totalThreeObjects,
  h as triangle,
  z as updateCameraOrtho,
  J as updateCameraOrtho16x9,
  Y as useMask
};
