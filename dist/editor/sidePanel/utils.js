import { Texture as m, RepeatWrapping as c } from "three";
import { ExportTexture as f } from "../../utils/threeEditorDebug.js";
function k(e) {
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
function p(e) {
  const s = {
    name: e.name,
    type: e.type,
    uuid: e.uuid,
    children: []
  };
  return e.children.forEach((t) => {
    s.children.push(p(t));
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
  for (const t in e) {
    const r = e[t];
    if (r !== null && typeof r == "object" && Object.prototype.hasOwnProperty.call(r, "value")) {
      const a = r.value;
      a == null ? s[t] = { value: l } : a.isTexture ? s[t] = { value: u(a) } : s[t] = { value: a };
    } else
      r == null ? s[t] = l : r.isTexture ? s[t] = u(r) : s[t] = r;
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
  for (const t in e) {
    if (t.substring(0, 1) === "_" || t.substring(0, 2) === "is" || h(t)) continue;
    const r = typeof e[t], n = e[t];
    switch (r) {
      case "boolean":
      case "number":
      case "string":
        s[t] = n;
        break;
      case "object":
        if (n !== null)
          if (n.isTexture)
            s[t] = {
              src: f.renderToBlob(n),
              offset: [n.offset.x, n.offset.y],
              repeat: [n.repeat.x, n.repeat.y]
            };
          else if (n.isUniformNode) {
            const a = n.value;
            s[t] = {
              __isUniform: !0,
              value: a?.isTexture ? { src: f.renderToBlob(a), offset: [a.offset.x, a.offset.y], repeat: [a.repeat.x, a.repeat.y] } : a
            };
          } else t === "uniforms" ? s[t] = d(n) : t.search("Node") > -1 || (s[t] = n);
        else
          t === "glslVersion" ? s[t] = "" : t.search("Node") > -1 || (s[t] = {
            src: "",
            offset: [0, 0],
            repeat: [1, 1]
          });
        break;
    }
  }
  return e.anisotropy !== void 0 && (s.anisotropy = e.anisotropy), e.clearcoat !== void 0 && (s.clearcoat = e.clearcoat), e.iridescence !== void 0 && (s.iridescence = e.iridescence), e.dispersion !== void 0 && (s.dispersion = e.dispersion), e.sheen !== void 0 && (s.sheen = e.sheen), e.transmission !== void 0 && (s.transmission = e.transmission), e.transmission !== void 0 && (s.transmission = e.transmission), s;
}
function C(e) {
  const s = document.createElement("canvas"), t = s.getContext("2d");
  return s.width = e.width, s.height = e.height, t.drawImage(e, 0, 0), s.toDataURL("image/png");
}
function g(e) {
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
  e.animations.forEach((r) => {
    s.animations.push({
      name: r.name,
      duration: r.duration,
      blendMode: r.blendMode
    });
  });
  const t = e.type.toLowerCase();
  if (t.search("mesh") > -1) {
    const r = e;
    if (Array.isArray(r.material)) {
      const n = [];
      r.material.forEach((a) => {
        n.push(o(a));
      }), s.material = n;
    } else
      s.material = o(r.material);
  } else if (t.search("points") > -1) {
    const r = e;
    if (Array.isArray(r.material)) {
      const n = [];
      r.material.forEach((a) => {
        n.push(o(a));
      }), s.material = n;
    } else
      s.material = o(r.material);
  } else if (t.search("line") > -1) {
    const r = e;
    if (Array.isArray(r.material)) {
      const n = [];
      r.material.forEach((a) => {
        n.push(o(a));
      }), s.material = n;
    } else
      s.material = o(r.material);
  } else t.search("camera") > -1 ? e.type === "PerspectiveCamera" ? s.perspectiveCameraInfo = {
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
  }) : t.search("light") > -1 && (s.lightInfo = {
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
function y(e, s) {
  const t = s.split(".");
  switch (t.length) {
    case 1:
      return e[t[0]];
    case 2:
      return e[t[0]][t[1]];
    case 3:
      return e[t[0]][t[1]][t[2]];
    case 4:
      return e[t[0]][t[1]][t[2]][t[3]];
    case 5:
      return e[t[0]][t[1]][t[2]][t[3]][t[4]];
    case 6:
      return e[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]];
  }
}
function v(e, s) {
  for (const t in s) e[t] = s[t];
}
function w(e, s, t) {
  if (e === void 0) {
    console.log(`Hermes - Can't set props: ${s}`, t);
    return;
  }
  const r = s.split("."), n = r.length;
  if (typeof t != "object")
    switch (n) {
      case 1:
        e[r[0]] = t;
        break;
      case 2:
        e[r[0]][r[1]] = t;
        break;
      case 3:
        e[r[0]][r[1]][r[2]] = t;
        break;
      case 4:
        e[r[0]][r[1]][r[2]][r[3]] = t;
        break;
      case 5:
        e[r[0]][r[1]][r[2]][r[3]][r[4]] = t;
        break;
    }
  else {
    let i;
    switch (n) {
      case 1:
        i = e[r[0]];
        break;
      case 2:
        i = e[r[0]][r[1]];
        break;
      case 3:
        i = e[r[0]][r[1]][r[2]];
        break;
      case 4:
        i = e[r[0]][r[1]][r[2]][r[3]];
        break;
      case 5:
        i = e[r[0]][r[1]][r[2]][r[3]][r[4]];
        break;
    }
    i != null ? v(i, t) : console.log(`Hermes - Can't set props because target isn't found: ${s}`, t);
  }
}
function x(e) {
  return new Promise((s, t) => {
    const r = new Image();
    r.onload = () => {
      const n = new m(r);
      n.wrapS = c, n.wrapT = c, n.needsUpdate = !0, s(n);
    }, r.onerror = t, r.src = e;
  });
}
const E = { stripObject: g, stripScene: p, getSubItem: y, setItemProps: w, textureFromSrc: x };
export {
  E as EDITOR_UTILS,
  C as convertImageToBase64,
  k as determineIcon,
  y as getSubItem,
  w as setItemProps,
  g as stripObject,
  p as stripScene,
  x as textureFromSrc
};
