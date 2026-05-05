import { jsx as h } from "react/jsx-runtime";
import { Color as y } from "three";
import I from "../InspectorGroup.js";
import { setItemProps as d } from "../../utils.js";
function p(e) {
  switch (e) {
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
  return e;
}
function P(e, n) {
  function a() {
    return `${n.name}_light`;
  }
  const l = localStorage.getItem(a()), g = l !== null ? l === "open" : !1;
  function f(t) {
    localStorage.setItem(a(), t ? "open" : "closed");
  }
  const c = [];
  if (e.lightInfo !== void 0)
    for (const t in e.lightInfo) {
      const o = e.lightInfo[t];
      o !== void 0 && (o.isColor !== void 0 ? c.push({
        title: p(t),
        prop: t,
        type: "color",
        value: o,
        onChange: (r, u) => {
          const i = new y(u);
          n.updateObject(e.uuid, r, i);
          const s = n.getScene(e.uuid);
          if (s !== null) {
            const m = s.getObjectByProperty("uuid", e.uuid);
            d(m, r, i);
          }
        }
      }) : c.push({
        title: p(t),
        prop: t,
        type: typeof o,
        value: o,
        step: typeof o == "number" ? 0.01 : void 0,
        onChange: (r, u) => {
          n.updateObject(e.uuid, r, u);
          const i = n.getScene(e.uuid);
          if (i !== null) {
            const s = i.getObjectByProperty("uuid", e.uuid);
            d(s, r, u);
          }
        }
      }));
    }
  return /* @__PURE__ */ h(
    I,
    {
      three: n,
      title: "Light",
      items: c,
      expanded: g,
      onToggle: (t) => {
        f(t);
      }
    }
  );
}
export {
  P as InspectLight
};
