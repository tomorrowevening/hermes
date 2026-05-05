import { jsx as l } from "react/jsx-runtime";
import g from "../InspectorGroup.js";
import { setItemProps as p } from "../../utils.js";
function d(e) {
  switch (e) {
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
  return e;
}
function C(e, r) {
  function s() {
    return `${r.name}_camera`;
  }
  const c = localStorage.getItem(s()), f = c !== null ? c === "open" : !1;
  function m(t) {
    localStorage.setItem(s(), t ? "open" : "closed");
  }
  const i = [];
  if (e.perspectiveCameraInfo !== void 0)
    for (const t in e.perspectiveCameraInfo)
      i.push({
        title: d(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.perspectiveCameraInfo[t],
        onChange: (a, o) => {
          r.updateObject(e.uuid, a, o), r.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = r.getScene(e.uuid);
          if (u !== null) {
            const n = u.getObjectByProperty("uuid", e.uuid);
            n !== void 0 && (p(n, a, o), n.updateProjectionMatrix());
          }
        }
      });
  else if (e.orthographicCameraInfo !== void 0)
    for (const t in e.orthographicCameraInfo)
      i.push({
        title: d(t),
        prop: t,
        type: "number",
        step: 0.01,
        value: e.orthographicCameraInfo[t],
        onChange: (a, o) => {
          r.updateObject(e.uuid, a, o), r.requestMethod(e.uuid, "updateProjectionMatrix");
          const u = r.getScene(e.uuid);
          if (u !== null) {
            const n = u.getObjectByProperty("uuid", e.uuid);
            n !== void 0 && (p(n, a, o), n.updateProjectionMatrix());
          }
        }
      });
  return /* @__PURE__ */ l(
    g,
    {
      three: r,
      title: "Camera",
      items: i,
      expanded: f,
      onToggle: (t) => {
        m(t);
      }
    }
  );
}
export {
  C as InspectCamera
};
