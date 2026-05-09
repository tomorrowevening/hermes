import { Texture as r } from "three";
const o = (s) => {
  s?.dispose();
}, f = (s) => {
  if (s) {
    if (Array.isArray(s)) {
      s.forEach((i) => f(i));
      return;
    }
    for (const i in s) {
      const e = s[i];
      e instanceof r && o(e);
    }
    if (s.isShaderMaterial === !0) {
      const i = s;
      for (const e in i.uniforms) {
        const n = i.uniforms[e];
        n?.value instanceof r && o(n.value);
      }
    }
    s.dispose();
  }
}, p = (s) => {
  if (s) {
    for (; s.children.length > 0; ) {
      const i = s.children[0];
      i.type === "Audio" ? (i.pause(), i.parent && i.parent.remove(i)) : p(i);
    }
    if (s.parent && s.parent.remove(s), s.isMesh) {
      const i = s;
      i.geometry?.dispose(), f(i.material);
    }
    typeof s.dispose == "function" && s.dispose();
  }
};
export {
  p as dispose,
  f as disposeMaterial,
  o as disposeTexture
};
