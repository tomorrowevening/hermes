import { types as n } from "@tomorrowevening/theatre-core";
import { useState as d, useEffect as p } from "react";
let m;
function v() {
  const [i, s] = d(m);
  return p(() => {
    m || import("@tomorrowevening/theatre-studio").then((e) => {
      m = e.default, m.initialize(), m.ui.hide(), s(m);
    });
  }, []), i;
}
async function E() {
  for (; !document.getElementById("theatrejs-studio-root"); )
    await new Promise((r) => setTimeout(r, 100));
  const i = document.getElementById("theatrejs-studio-root");
  if (i === null || i.shadowRoot === null) return;
  const s = i.shadowRoot.getElementById("pointer-root");
  if (s === null) return;
  const e = s.children[0];
  if (e !== null) {
    try {
      const t = e.children[1].children[1];
      t.parentElement?.removeChild(t);
    } catch {
    }
    try {
      const r = e.children[3];
      r.style.top = "0", r.style.right = "300px";
    } catch {
    }
  }
}
function O(i, s, e, r) {
  r.sheetObject(i, s, {
    transform: {
      position: {
        x: e.position.x,
        y: e.position.y,
        z: e.position.z
      },
      rotation: {
        x: e.rotation.x,
        y: e.rotation.y,
        z: e.rotation.z
      },
      scale: {
        x: e.scale.x,
        y: e.scale.y,
        z: e.scale.z
      },
      visible: e.visible
    }
  }, (t) => {
    const o = t.transform;
    e.position.copy(o.position), e.rotation.copy(o.rotation), e.scale.copy(o.scale), e.visible = o.visible;
  });
}
const h = [
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
function f(i) {
  const s = typeof i;
  if (i === null || i.isTexture)
    return "texture";
  if (s === "boolean")
    return "boolean";
  if (s === "number")
    return "number";
  if (s === "string")
    return "string";
  if (s === "object") {
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
function y(i) {
  const s = [];
  for (const r in i) {
    const t = h.find((a) => a === r), o = r.indexOf("_") === 0 || r.indexOf("is") === 0;
    if (!(t || o))
      if (r === "uniforms") {
        const a = i.uniforms;
        for (const c in a) {
          const b = a[c].value, u = f(b);
          u === "array" || u === "object" || s.push({
            name: `uniforms.${c}.value`,
            type: u,
            value: b
          });
        }
      } else {
        const a = f(i[r]);
        s.push({
          name: r,
          type: a,
          value: i[r]
        });
      }
  }
  return s.filter(
    (r) => r.type !== "array" && r.type !== "object" && r.type !== "texture"
  );
}
function x(i) {
  const s = {}, e = { nudgeMultiplier: 0.01 };
  return i.forEach((r) => {
    let t = r.value;
    switch (r.type) {
      case "color":
        t = n.rgba({ r: t.r, g: t.g, b: t.b, a: 1 });
        break;
      case "number":
        t = n.number(t, e);
        break;
      case "euler":
      case "vector3":
        t = {
          x: n.number(t.x, e),
          y: n.number(t.y, e),
          z: n.number(t.z, e)
        };
        break;
      case "vector2":
        t = {
          x: n.number(t.x, e),
          y: n.number(t.y, e)
        };
        break;
      case "vector4":
        t = {
          x: n.number(t.x, e),
          y: n.number(t.y, e),
          z: n.number(t.z, e),
          w: n.number(t.w, e)
        };
        break;
      case "matrix2":
        t = {
          0: n.number(t.elements[0], e),
          1: n.number(t.elements[1], e),
          2: n.number(t.elements[2], e),
          3: n.number(t.elements[3], e)
        };
        break;
      case "matrix3":
        t = {
          0: n.number(t.elements[0], e),
          1: n.number(t.elements[1], e),
          2: n.number(t.elements[2], e),
          3: n.number(t.elements[3], e),
          4: n.number(t.elements[4], e),
          5: n.number(t.elements[5], e),
          6: n.number(t.elements[6], e),
          7: n.number(t.elements[7], e),
          8: n.number(t.elements[8], e)
        };
        break;
      case "matrix4":
        t = {
          0: n.number(t.elements[0], e),
          1: n.number(t.elements[1], e),
          2: n.number(t.elements[2], e),
          3: n.number(t.elements[3], e),
          4: n.number(t.elements[4], e),
          5: n.number(t.elements[5], e),
          6: n.number(t.elements[6], e),
          7: n.number(t.elements[7], e),
          8: n.number(t.elements[8], e),
          9: n.number(t.elements[9], e),
          10: n.number(t.elements[10], e),
          11: n.number(t.elements[11], e),
          12: n.number(t.elements[12], e),
          13: n.number(t.elements[13], e),
          14: n.number(t.elements[14], e),
          15: n.number(t.elements[15], e)
        };
        break;
    }
    if (r.name.includes(".")) {
      const o = r.name.split(".");
      let l = s;
      for (let a = 0; a < o.length - 1; a++) {
        const c = o[a];
        l[c] || (l[c] = {}), l = l[c];
      }
      l[o[o.length - 1]] = t;
    } else
      s[r.name] = t;
  }), s;
}
function g(i, s, e) {
  s.forEach((r) => {
    if (i[r.name] !== void 0)
      switch (r.type) {
        case "boolean":
        case "number":
          i[r.name] = e.material[r.name];
          break;
        case "color":
        case "euler":
        case "matrix2":
        case "matrix3":
        case "matrix4":
        case "vector2":
        case "vector3":
        case "vector4":
          i[r.name].copy(e.material[r.name]);
          break;
      }
  });
}
function M(i, s, e, r) {
  if (!e.isMaterial) return;
  const t = y(e), o = x(t);
  r.sheetObject(i, s, {
    material: o
  }, (l) => {
    g(e, t, l);
  });
}
export {
  M as animateObjectMaterial,
  O as animateObjectTransform,
  g as applyObjectMaterial,
  E as customizeTheatreElements,
  x as getObjectMaterialObject,
  y as getObjectMaterialProps,
  v as useStudio
};
