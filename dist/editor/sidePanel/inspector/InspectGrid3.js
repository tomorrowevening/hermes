import { jsxs as r, jsx as a } from "react/jsx-runtime";
import { useMemo as u, useRef as c } from "react";
import d from "./InspectNumber.js";
import { radToDeg as b, degToRad as x } from "three/src/math/MathUtils.js";
function z(n) {
  const f = n.value.x !== void 0 && n.value.y !== void 0 && n.value.z !== void 0, h = n.value.isEuler !== void 0, m = n.value.elements !== void 0, v = n.step !== void 0 ? n.step : 0.01, i = [];
  if (h) {
    const l = u(() => n.value, []);
    ["_x", "_y", "_z"].forEach((e) => {
      const t = c(null);
      i.push(
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ a("span", { ref: t, children: e.substring(1).toUpperCase() }),
          /* @__PURE__ */ a(
            d,
            {
              value: b(l[e]),
              type: "number",
              prop: e,
              step: 0.1,
              labelRef: t,
              onChange: (o, g) => {
                l[o] = x(g), n.onChange({ target: { value: l } });
              }
            }
          )
        ] }, e)
      );
    });
  } else if (f) {
    const l = u(() => n.value, []), s = (t, o) => {
      l[t] = o, n.onChange({ target: { value: l } });
    };
    ["x", "y", "z"].forEach((t) => {
      const o = c(null);
      i.push(
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ a("label", { ref: o, children: t.toUpperCase() }),
          /* @__PURE__ */ a(
            d,
            {
              value: l[t],
              type: "number",
              prop: t,
              step: v,
              labelRef: o,
              onChange: s
            }
          )
        ] }, t)
      );
    });
  } else if (m) {
    const l = u(() => n.value, []), s = (e, t) => {
      const o = Number(e);
      l.elements[o] = t, n.onChange({ target: { value: l } });
    };
    for (let e = 0; e < 9; e++) {
      const t = c(null);
      i.push(
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ a("label", { ref: t, children: e + 1 }),
          /* @__PURE__ */ a(
            d,
            {
              value: l.elements[e],
              type: "number",
              prop: e.toString(),
              step: v,
              labelRef: t,
              onChange: s
            }
          )
        ] }, e.toString())
      );
    }
  }
  return /* @__PURE__ */ a("div", { className: "grid3", children: i }, Math.random().toString());
}
export {
  z as default
};
