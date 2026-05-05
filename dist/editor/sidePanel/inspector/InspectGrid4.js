import { jsxs as a, jsx as s } from "react/jsx-runtime";
import { useMemo as u, useRef as d } from "react";
import m from "./InspectNumber.js";
function b(n) {
  const f = n.value.x !== void 0, i = n.step !== void 0 ? n.step : 0.01, r = [];
  if (f) {
    const o = u(() => n.value, []), c = (e, l) => {
      o[e] = l, n.onChange({ target: { value: o } });
    };
    ["x", "y", "z", "w"].forEach((e) => {
      const l = d(null);
      r.push(
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ s("label", { ref: l, children: e.toUpperCase() }),
          /* @__PURE__ */ s(
            m,
            {
              value: o[e],
              type: "number",
              prop: e,
              step: i,
              labelRef: l,
              onChange: c
            }
          )
        ] }, e)
      );
    });
  } else {
    const o = u(() => n.value, []), c = (t, e) => {
      const l = Number(t);
      o.elements[l] = e, n.onChange({ target: { value: o } });
    };
    for (let t = 0; t < 16; t++) {
      const e = d(null);
      r.push(
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ s("span", { ref: e, children: t + 1 }),
          /* @__PURE__ */ s(
            m,
            {
              value: o.elements[t],
              type: "number",
              prop: t.toString(),
              step: i,
              labelRef: e,
              onChange: c
            }
          )
        ] }, t.toString())
      );
    }
  }
  return /* @__PURE__ */ s("div", { className: "grid4", children: r });
}
export {
  b as default
};
