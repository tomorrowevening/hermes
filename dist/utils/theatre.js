import { types as n } from "@tomorrowevening/theatre-core";
import { useState as d, useEffect as p } from "react";
let c;
function v() {
  const [r, s] = d(c);
  return p(() => {
    c || import("@tomorrowevening/theatre-studio").then((e) => {
      c = e.default, c.initialize(), c.ui.hide(), s(c);
    });
  }, []), r;
}
function M(r, s, e, i) {
  i.sheetObject(r, s, {
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
    const a = t.transform;
    e.position.copy(a.position), e.rotation.copy(a.rotation), e.scale.copy(a.scale), e.visible = a.visible;
  });
}
const x = [
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
function f(r) {
  const s = typeof r;
  if (r === null || r.isTexture)
    return "texture";
  if (s === "boolean")
    return "boolean";
  if (s === "number")
    return "number";
  if (s === "string")
    return "string";
  if (s === "object") {
    if (r.isColor)
      return "color";
    if (r.isVector2)
      return "vector2";
    if (r.isVector3)
      return "vector3";
    if (r.isVector4)
      return "vector4";
    if (r.isMatrix2)
      return "matrix2";
    if (r.isMatrix3)
      return "matrix3";
    if (r.isMatrix4)
      return "matrix4";
    if (r.isEuler)
      return "euler";
    if (Array.isArray(r))
      return "array";
  }
  return "object";
}
function y(r) {
  const s = [];
  for (const i in r) {
    const t = x.find((o) => o === i), a = i.indexOf("_") === 0 || i.indexOf("is") === 0;
    if (!(t || a))
      if (i === "uniforms") {
        const o = r.uniforms;
        for (const m in o) {
          const b = o[m].value, u = f(b);
          u === "array" || u === "object" || s.push({
            name: `uniforms.${m}.value`,
            type: u,
            value: b
          });
        }
      } else {
        const o = f(r[i]);
        s.push({
          name: i,
          type: o,
          value: r[i]
        });
      }
  }
  return s.filter(
    (i) => i.type !== "array" && i.type !== "object" && i.type !== "texture"
  );
}
function h(r) {
  const s = {}, e = { nudgeMultiplier: 0.01 };
  return r.forEach((i) => {
    let t = i.value;
    switch (i.type) {
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
    if (i.name.includes(".")) {
      const a = i.name.split(".");
      let l = s;
      for (let o = 0; o < a.length - 1; o++) {
        const m = a[o];
        l[m] || (l[m] = {}), l = l[m];
      }
      l[a[a.length - 1]] = t;
    } else
      s[i.name] = t;
  }), s;
}
function g(r, s, e) {
  s.forEach((i) => {
    if (r[i.name] !== void 0)
      switch (i.type) {
        case "boolean":
        case "number":
          r[i.name] = e.material[i.name];
          break;
        case "color":
        case "euler":
        case "matrix2":
        case "matrix3":
        case "matrix4":
        case "vector2":
        case "vector3":
        case "vector4":
          r[i.name].copy(e.material[i.name]);
          break;
      }
  });
}
function k(r, s, e, i) {
  if (!e.isMaterial) return;
  const t = y(e), a = h(t);
  i.sheetObject(r, s, {
    material: a
  }, (l) => {
    g(e, t, l);
  });
}
export {
  k as animateObjectMaterial,
  M as animateObjectTransform,
  g as applyObjectMaterial,
  h as getObjectMaterialObject,
  y as getObjectMaterialProps,
  v as useStudio
};
