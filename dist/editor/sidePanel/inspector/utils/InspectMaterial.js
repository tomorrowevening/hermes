import { jsx as v, Fragment as z } from "react/jsx-runtime";
import { Color as G, FrontSide as W, BackSide as H, DoubleSide as K, ZeroFactor as I, OneFactor as R, SrcColorFactor as N, OneMinusSrcColorFactor as k, SrcAlphaFactor as F, OneMinusSrcAlphaFactor as E, DstAlphaFactor as T, OneMinusDstAlphaFactor as b, DstColorFactor as x, OneMinusDstColorFactor as w, SrcAlphaSaturateFactor as Z, ConstantColorFactor as P, OneMinusConstantColorFactor as U, ConstantAlphaFactor as _, OneMinusConstantAlphaFactor as L, AddEquation as J, SubtractEquation as Q, ReverseSubtractEquation as V, MinEquation as X, MaxEquation as Y, NoBlending as j, NormalBlending as ee, AdditiveBlending as te, SubtractiveBlending as ne, MultiplyBlending as ae, CustomBlending as re } from "three";
import D from "../InspectorGroup.js";
import { setItemProps as M, textureFromSrc as ie } from "../../utils.js";
import { ComputeNode as se } from "three/webgpu";
function ue(e) {
  return !(e === "defaultAttributeValues" || e === "forceSinglePass" || e === "linecap" || e === "linejoin" || e === "linewidth" || e === "normalMapType" || e === "precision" || e === "shadowSide" || e === "uniformsGroups" || e === "uniformsNeedUpdate" || e === "userData" || e === "version" || e === "wireframeLinecap" || e === "wireframeLinejoin" || e === "wireframeLinewidth" || e.slice(0, 4) === "clip" || e.slice(0, 7) === "polygon" || e.slice(0, 7) === "stencil" || e.slice(0, 2) === "is");
}
function ce(e) {
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
  return e;
}
function C(e) {
  switch (e) {
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
  return e;
}
function q(e) {
  const t = e.toLowerCase();
  return t.search("intensity") > -1 || t === "anisotropyrotation" || t === "blendalpha" || t === "bumpscale" || t === "clearcoatroughness" || t === "displacementbias" || t === "displacementscale" || t === "metalness" || t === "opacity" || t === "reflectivity" || t === "refractionratio" || t === "roughness" || t === "sheenroughness";
}
function $e() {
  const e = document.createElement("input");
  return e.type = "file", new Promise((t, n) => {
    e.addEventListener("change", function() {
      if (e.files === null)
        n();
      else {
        const r = e.files[0], i = new FileReader();
        i.onload = function(o) {
          t(o.target.result);
        }, i.readAsDataURL(r);
      }
    }), e.click();
  });
}
const le = [
  {
    title: "Front",
    value: W
  },
  {
    title: "Back",
    value: H
  },
  {
    title: "Double",
    value: K
  }
], oe = [
  {
    title: "No Blending",
    value: j
  },
  {
    title: "Normal",
    value: ee
  },
  {
    title: "Additive",
    value: te
  },
  {
    title: "Subtractive",
    value: ne
  },
  {
    title: "Multiply",
    value: ae
  },
  {
    title: "Custom",
    value: re
  }
], pe = [
  {
    title: "Add",
    value: J
  },
  {
    title: "Subtract",
    value: Q
  },
  {
    title: "Reverse Subtract",
    value: V
  },
  {
    title: "Min",
    value: X
  },
  {
    title: "Max",
    value: Y
  }
], de = [
  {
    title: "Zero",
    value: I
  },
  {
    title: "One",
    value: R
  },
  {
    title: "Src Color",
    value: N
  },
  {
    title: "One Minus Src Color",
    value: k
  },
  {
    title: "Src Alpha",
    value: F
  },
  {
    title: "One Minus Src Alpha",
    value: E
  },
  {
    title: "Dst Alpha",
    value: T
  },
  {
    title: "One Minus Dst Alpha",
    value: b
  },
  {
    title: "Dst Color",
    value: x
  },
  {
    title: "One Minus Dst Color",
    value: w
  },
  {
    title: "Src Alpha Saturate",
    value: Z
  },
  {
    title: "Constant Color",
    value: P
  },
  {
    title: "One Minus Constant Color",
    value: U
  },
  {
    title: "Constant Alpha",
    value: _
  },
  {
    title: "One Minus Constant Alpha",
    value: L
  }
], me = [
  {
    title: "Zero",
    value: I
  },
  {
    title: "One",
    value: R
  },
  {
    title: "Src Color",
    value: N
  },
  {
    title: "One Minus Src Color",
    value: k
  },
  {
    title: "Src Alpha",
    value: F
  },
  {
    title: "One Minus Src Alpha",
    value: E
  },
  {
    title: "Dst Alpha",
    value: T
  },
  {
    title: "One Minus Dst Alpha",
    value: b
  },
  {
    title: "Dst Color",
    value: x
  },
  {
    title: "One Minus Dst Color",
    value: w
  },
  {
    title: "Constant Color",
    value: P
  },
  {
    title: "One Minus Constant Color",
    value: U
  },
  {
    title: "Constant Alpha",
    value: _
  },
  {
    title: "One Minus Constant Alpha",
    value: L
  }
];
function S(e, t) {
  e.needsUpdate = !0, e.type = "option", e.options = t;
}
function he(e, t, n, r) {
  return {
    type: "boolean",
    title: C(e),
    prop: e,
    value: t,
    needsUpdate: !0,
    onChange: (i, o) => {
      r.updateObject(n.uuid, `material.${e}`, o), r.updateObject(n.uuid, "material.needsUpdate", !0);
      const s = r.getScene(n.uuid);
      if (s !== null) {
        const a = s.getObjectByProperty("uuid", n.uuid);
        M(a, `material.${e}`, o);
      }
    }
  };
}
function Me(e, t, n, r) {
  const i = {
    type: "number",
    title: C(e),
    prop: e,
    value: t,
    min: void 0,
    max: void 0,
    step: 0.01,
    needsUpdate: !0,
    onChange: (o, s) => {
      r.updateObject(n.uuid, `material.${e}`, s), r.updateObject(n.uuid, "material.needsUpdate", !0);
      const a = r.getScene(n.uuid);
      if (a !== null) {
        const m = a.getObjectByProperty("uuid", n.uuid);
        M(m, `material.${e}`, s);
      }
    }
  };
  switch (e) {
    case "blending":
      S(i, oe);
      break;
    case "blendDst":
      S(i, me);
      break;
    case "blendEquation":
      S(i, pe);
      break;
    case "blendSrc":
      S(i, de);
      break;
    case "side":
      S(i, le);
      break;
  }
  return q(e) && (i.value = Number(t), i.type = "range", i.min = Math.min(0, i.value), i.max = Math.max(1, i.value), i.step = 0.01), i;
}
function ge(e, t, n, r) {
  const i = {
    type: "string",
    title: C(e),
    prop: e,
    value: t,
    needsUpdate: !0,
    onChange: (s, a) => {
      r.updateObject(n.uuid, `material.${e}`, a), r.updateObject(n.uuid, "material.needsUpdate", !0);
      const m = r.getScene(n.uuid);
      if (m !== null) {
        const c = m.getObjectByProperty("uuid", n.uuid);
        M(c, `material.${e}`, a);
      }
    },
    onKeyDown: (s) => {
    }
  };
  return (e === "vertexShader" || e === "fragmentShader") && (i.type = "field", i.disabled = !1, i.latest = i.value, i.onChange = (s, a) => {
    i.latest = a, r.updateObject(n.uuid, `material.${e}`, a);
    const m = r.getScene(n.uuid);
    if (m !== null) {
      const c = m.getObjectByProperty("uuid", n.uuid);
      M(c, `material.${e}`, a);
    }
  }, i.onKeyDown = (s) => {
    if (s.key === "Enter" && (s.altKey || s.metaKey)) {
      r.updateObject(n.uuid, "material.needsUpdate", !0);
      const a = r.getScene(n.uuid);
      if (a !== null) {
        const m = a.getObjectByProperty("uuid", n.uuid);
        M(m, "material.needsUpdate", !0);
      }
    }
  }), i;
}
function fe(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z === void 0;
}
function ye(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w === void 0;
}
function Se(e) {
  return e.x !== void 0 && e.y !== void 0 && e.z !== void 0 && e.w !== void 0;
}
function O(e) {
  e.sort((t, n) => t.title < n.title ? -1 : t.title > n.title ? 1 : 0);
}
function y(e, t, n, r, i = "", o = !1) {
  const s = C(e).split(".")[0].replaceAll("[", "").replaceAll("]", ""), a = i.length > 0 ? `${i}.${e}` : e, m = typeof t;
  if (m === "object" && t !== null && t.__isUniform === !0)
    return y(`${e}.value`, t.value, n, r, i, o);
  if (m === "boolean" || m === "string")
    return {
      title: s,
      prop: a,
      type: m,
      value: t,
      disabled: o,
      onChange: (c, l) => {
        r.updateObject(n.uuid, `material.${a}`, l);
        const u = r.getScene(n.uuid);
        if (u !== null) {
          const p = u.getObjectByProperty("uuid", n.uuid);
          M(p, `material.${a}`, l);
        }
      }
    };
  if (m === "number") {
    const c = {
      title: s,
      prop: a,
      type: "number",
      value: t,
      step: 0.01,
      disabled: o,
      onChange: (l, u) => {
        r.updateObject(n.uuid, `material.${a}`, u);
        const p = r.getScene(n.uuid);
        if (p !== null) {
          const d = p.getObjectByProperty("uuid", n.uuid);
          M(d, `material.${a}`, u);
        }
      }
    };
    return q(s) && (c.type = "range", c.min = 0, c.max = 1), c;
  } else {
    if (t.isColor)
      return {
        title: s,
        prop: a,
        type: "color",
        value: t,
        disabled: o,
        onChange: (c, l) => {
          const u = new G(l);
          r.updateObject(n.uuid, `material.${a}`, u);
          const p = r.getScene(n.uuid);
          if (p !== null) {
            const d = p.getObjectByProperty("uuid", n.uuid);
            M(d, `material.${a}`, u);
          }
        }
      };
    if (Array.isArray(t)) {
      const c = [];
      for (const l in t) {
        const u = t[l], p = `[${l.toString()}]`;
        if (u.value !== void 0) {
          const d = y(`${p}.value`, u.value, n, r, a, o);
          d !== void 0 && c.push(d);
        } else {
          const d = y(p, u, n, r, a, o);
          d !== void 0 && c.push(d);
        }
      }
      if (c.length > 0)
        return O(c), {
          title: s,
          items: c
        };
    } else {
      if (fe(t))
        return {
          title: s,
          prop: a,
          type: "vector2",
          value: t,
          disabled: o,
          onChange: (c, l) => {
            r.updateObject(n.uuid, `material.${a}`, l);
            const u = r.getScene(n.uuid);
            if (u !== null) {
              const p = u.getObjectByProperty("uuid", n.uuid);
              M(p, `material.${a}`, l);
            }
          }
        };
      if (ye(t))
        return {
          title: s,
          prop: a,
          type: "grid3",
          value: t,
          disabled: o,
          onChange: (c, l) => {
            r.updateObject(n.uuid, `material.${a}`, l);
            const u = r.getScene(n.uuid);
            if (u !== null) {
              const p = u.getObjectByProperty("uuid", n.uuid);
              M(p, `material.${a}`, l);
            }
          }
        };
      if (Se(t))
        return {
          title: s,
          prop: a,
          type: "grid4",
          value: t,
          disabled: o,
          onChange: (c, l) => {
            r.updateObject(n.uuid, `material.${a}`, l);
            const u = r.getScene(n.uuid);
            if (u !== null) {
              const p = u.getObjectByProperty("uuid", n.uuid);
              M(p, `material.${a}`, l);
            }
          }
        };
      if (t.isEuler)
        return {
          title: s,
          prop: a,
          type: "euler",
          value: t,
          disabled: o,
          onChange: (c, l) => {
            r.updateObject(n.uuid, `material.${a}`, l);
            const u = r.getScene(n.uuid);
            if (u !== null) {
              const p = u.getObjectByProperty("uuid", n.uuid);
              M(p, `material.${a}`, l);
            }
          }
        };
      if (t.src !== void 0)
        return {
          title: s,
          type: "image",
          value: t,
          disabled: o,
          onChange: (c, l) => {
            const u = ce(e), p = i.length > 0 ? `${i}.${u}` : u;
            r.createTexture(n.uuid, `material.${p}`, l);
            const d = r.getScene(n.uuid);
            if (d !== null) {
              const A = d.getObjectByProperty("uuid", n.uuid);
              if (A !== void 0) {
                const B = (g) => {
                  const f = A.material, h = p.split(".");
                  switch (h.length) {
                    case 1:
                      f[h[0]] = g;
                      break;
                    case 2:
                      f[h[0]][h[1]] = g;
                      break;
                    case 3:
                      f[h[0]][h[1]][h[2]] = g;
                      break;
                    case 4:
                      f[h[0]][h[1]][h[2]][h[3]] = g;
                      break;
                    case 5:
                      f[h[0]][h[1]][h[2]][h[3]][h[4]] = g;
                      break;
                  }
                  f.needsUpdate = !0;
                };
                l.src.length > 0 ? ie(l.src).then((g) => {
                  g.offset.set(l.offset[0], l.offset[1]), g.repeat.set(l.repeat[0], l.repeat[1]), B(g);
                }) : B(null);
              }
            }
          }
        };
      if (t.elements !== void 0)
        return {
          title: s,
          prop: a,
          type: t.elements.length > 9 ? "grid4" : "grid3",
          value: t,
          disabled: o,
          onChange: (c, l) => {
            r.updateObject(n.uuid, `material.${a}`, l);
            const u = r.getScene(n.uuid);
            if (u !== null) {
              const p = u.getObjectByProperty("uuid", n.uuid);
              M(p, `material.${a}`, l);
            }
          }
        };
      {
        const c = [], l = e === "defines" || e === "extensions";
        try {
          for (const u in t) {
            const p = t[u];
            if (p !== void 0)
              if (p.value !== void 0) {
                const d = y(`${u}.value`, p.value, n, r, a, l);
                d !== void 0 && c.push(d);
              } else {
                const d = y(u, p, n, r, a, l);
                d !== void 0 && c.push(d);
              }
          }
        } catch {
          console.log("Hermes - Issue cycling through material object:", e, t);
        }
        if (c.length > 0)
          return O(c), {
            title: s,
            items: c
          };
      }
    }
  }
}
function $(e, t, n) {
  const r = [];
  for (const i in e) {
    if (!ue(i) || i.search("Node") > -1 || e[i] instanceof se)
      continue;
    const o = typeof e[i], s = e[i];
    if (o === "boolean")
      r.push(he(i, s, t, n));
    else if (o === "number")
      r.push(Me(i, s, t, n));
    else if (o === "string")
      r.push(ge(i, s, t, n));
    else if (o === "object") {
      const a = y(i, s, t, n);
      a !== void 0 && r.push(a);
    } else s !== void 0 && console.log("Hermes - Other Material Prop Type:", i, o, s);
  }
  return O(r), r.push({
    title: "Update Material",
    type: "button",
    onChange: () => {
      n.updateObject(t.uuid, "material.needsUpdate", !0);
      const i = n.getScene(t.uuid);
      if (i !== null) {
        const o = i.getObjectByProperty("uuid", t.uuid);
        M(o, "material.needsUpdate", !0);
      }
    }
  }), r;
}
function Ie(e, t) {
  function n() {
    return `${t.name}_material`;
  }
  const r = localStorage.getItem(n()), i = r !== null ? r === "open" : !1;
  function o(a) {
    localStorage.setItem(n(), a ? "open" : "closed");
  }
  const s = e.material;
  if (Array.isArray(s)) {
    const a = [], m = s.length;
    for (let c = 0; c < m; c++)
      a.push(
        /* @__PURE__ */ v(
          D,
          {
            three: t,
            title: `Material ${c}`,
            items: $(s[c], e, t)
          },
          `Material ${c}`
        )
      );
    return /* @__PURE__ */ v(z, { children: a });
  } else
    return /* @__PURE__ */ v(
      D,
      {
        three: t,
        title: "Material",
        items: $(s, e, t),
        expanded: i,
        onToggle: (a) => {
          o(a);
        }
      }
    );
}
export {
  Ie as InspectMaterial,
  ue as acceptedMaterialNames,
  q as clampedNames,
  ce as imageNames,
  $ as inspectMaterialItems,
  C as prettyName,
  $e as uploadLocalImage
};
