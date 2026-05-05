import { Texture as p, RepeatWrapping as c } from "three";
import { ExportTexture as f } from "../../utils/three.js";
function w(e) {
  if (e.name === "cameras")
    return "camera";
  if (e.name === "interactive")
    return "interactive";
  if (e.name === "lights")
    return "light";
  if (e.name === "ui")
    return "ui";
  if (e.name === "utils")
    return "utils";
  const s = e.type;
  return s.search("Helper") > -1 ? "icon_utils" : s.search("Camera") > -1 ? "camera" : s.search("Light") > -1 ? "light" : "obj3D";
}
function m(e) {
  const s = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((r) => {
    s.children.push(m(r));
  }), s;
}
function u(e) {
  return {
    src: e.image?.src ?? "",
    offset: [e.offset.x, e.offset.y],
    repeat: [e.repeat.x, e.repeat.y]
  };
}
const l = { src: "", offset: [0, 0], repeat: [1, 1] };
function d(e) {
  const s = {};
  for (const r in e) {
    const t = e[r];
    if (t !== null && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "value")) {
      const i = t.value;
      i == null ? s[r] = { value: l } : i.isTexture ? s[r] = { value: u(i) } : s[r] = { value: i };
    } else
      t == null ? s[r] = l : t.isTexture ? s[r] = u(t) : s[r] = t;
  }
  return s;
}
function h(e) {
  switch (e) {
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
function o(e) {
  const s = {};
  for (const r in e) {
    if (r.substring(0, 1) === "_" || r.substring(0, 2) === "is" || h(r)) continue;
    const t = typeof e[r], n = e[r];
    switch (t) {
      case "boolean":
      case "number":
      case "string":
        s[r] = n;
        break;
      case "object":
        if (n !== null)
          if (n.isTexture)
            s[r] = {
              src: f.renderToBlob(n),
              offset: [n.offset.x, n.offset.y],
              repeat: [n.repeat.x, n.repeat.y]
            };
          else if (n.isUniformNode) {
            const i = n.value;
            s[r] = {
              __isUniform: !0,
              value: i?.isTexture ? { src: f.renderToBlob(i), offset: [i.offset.x, i.offset.y], repeat: [i.repeat.x, i.repeat.y] } : i
            };
          } else r === "uniforms" ? s[r] = d(n) : r.search("Node") > -1 || (s[r] = n);
        else
          r === "glslVersion" ? s[r] = "" : r.search("Node") > -1 || (s[r] = {
            src: "",
            offset: [0, 0],
            repeat: [1, 1]
          });
        break;
    }
  }
  return e.anisotropy !== void 0 && (s.anisotropy = e.anisotropy), e.clearcoat !== void 0 && (s.clearcoat = e.clearcoat), e.iridescence !== void 0 && (s.iridescence = e.iridescence), e.dispersion !== void 0 && (s.dispersion = e.dispersion), e.sheen !== void 0 && (s.sheen = e.sheen), e.transmission !== void 0 && (s.transmission = e.transmission), e.transmission !== void 0 && (s.transmission = e.transmission), s;
}
function x(e) {
  e.updateMatrix();
  const s = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    visible: e.visible,
    matrix: e.matrix.elements,
    animations: [],
    material: void 0,
    perspectiveCameraInfo: void 0,
    orthographicCameraInfo: void 0,
    lightInfo: void 0,
    children: []
  };
  e.animations.forEach((t) => {
    s.animations.push({
      name: t.name,
      duration: t.duration,
      blendMode: t.blendMode
    });
  });
  const r = e.type.toLowerCase();
  if (r.search("mesh") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const n = [];
      t.material.forEach((i) => {
        n.push(o(i));
      }), s.material = n;
    } else
      s.material = o(t.material);
  } else if (r.search("points") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const n = [];
      t.material.forEach((i) => {
        n.push(o(i));
      }), s.material = n;
    } else
      s.material = o(t.material);
  } else if (r.search("line") > -1) {
    const t = e;
    if (Array.isArray(t.material)) {
      const n = [];
      t.material.forEach((i) => {
        n.push(o(i));
      }), s.material = n;
    } else
      s.material = o(t.material);
  } else r.search("camera") > -1 ? e.type === "PerspectiveCamera" ? s.perspectiveCameraInfo = {
    fov: e.fov,
    zoom: e.zoom,
    near: e.near,
    far: e.far,
    focus: e.focus,
    aspect: e.aspect,
    filmGauge: e.filmGauge,
    filmOffset: e.filmOffset
  } : e.type === "OrthographicCamera" && (s.orthographicCameraInfo = {
    zoom: e.zoom,
    near: e.near,
    far: e.far,
    left: e.left,
    right: e.right,
    top: e.top,
    bottom: e.bottom
  }) : r.search("light") > -1 && (s.lightInfo = {
    color: e.color,
    intensity: e.intensity,
    decay: e.decay,
    distance: e.distance,
    angle: e.angle,
    penumbra: e.penumbra,
    groundColor: e.groundColor,
    width: e.width,
    height: e.height
  });
  return s;
}
function T(e, s) {
  const r = s.split(".");
  switch (r.length) {
    case 1:
      return e[r[0]];
    case 2:
      return e[r[0]][r[1]];
    case 3:
      return e[r[0]][r[1]][r[2]];
    case 4:
      return e[r[0]][r[1]][r[2]][r[3]];
    case 5:
      return e[r[0]][r[1]][r[2]][r[3]][r[4]];
    case 6:
      return e[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]];
  }
}
function y(e, s) {
  for (const r in s) e[r] = s[r];
}
function k(e, s, r) {
  if (e === void 0) {
    console.log(`Hermes - Can't set props: ${s}`, r);
    return;
  }
  const t = s.split("."), n = t.length;
  if (typeof r != "object")
    switch (n) {
      case 1:
        e[t[0]] = r;
        break;
      case 2:
        e[t[0]][t[1]] = r;
        break;
      case 3:
        e[t[0]][t[1]][t[2]] = r;
        break;
      case 4:
        e[t[0]][t[1]][t[2]][t[3]] = r;
        break;
      case 5:
        e[t[0]][t[1]][t[2]][t[3]][t[4]] = r;
        break;
    }
  else {
    let a;
    switch (n) {
      case 1:
        a = e[t[0]];
        break;
      case 2:
        a = e[t[0]][t[1]];
        break;
      case 3:
        a = e[t[0]][t[1]][t[2]];
        break;
      case 4:
        a = e[t[0]][t[1]][t[2]][t[3]];
        break;
      case 5:
        a = e[t[0]][t[1]][t[2]][t[3]][t[4]];
        break;
    }
    a != null ? y(a, r) : console.log(`Hermes - Can't set props because target isn't found: ${s}`, r);
  }
}
function C(e) {
  return new Promise((s, r) => {
    const t = new Image();
    t.onload = () => {
      const n = new p(t);
      n.wrapS = c, n.wrapT = c, n.needsUpdate = !0, s(n);
    }, t.onerror = r, t.src = e;
  });
}
export {
  w as determineIcon,
  T as getSubItem,
  k as setItemProps,
  x as stripObject,
  m as stripScene,
  C as textureFromSrc
};
