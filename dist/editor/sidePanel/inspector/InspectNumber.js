import { jsxs as f, Fragment as g, jsx as m } from "react/jsx-runtime";
import { useRef as r, useState as b } from "react";
import h from "./utils/DragNumber.js";
import { noop as c } from "../../../core/types.js";
import { randomID as u } from "../../utils.js";
function s(e) {
  const i = r(null), d = r(null), [t, l] = b(e.value);
  return h({
    label: e.labelRef,
    input: i,
    sliderRef: d,
    defaultValue: t,
    min: e.min,
    max: e.max,
    step: e.step,
    onChange: (a) => {
      l(a), e.onChange !== void 0 && e.onChange(e.prop, a);
    }
  }), /* @__PURE__ */ f(g, { children: [
    e.type === "number" && /* @__PURE__ */ m(
      "input",
      {
        alt: e.alt,
        className: e.className,
        ref: i,
        type: "number",
        value: t,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        name: u(),
        onChange: (a) => {
          if (l(a.target.value), a.target.value.length === 0) return;
          const n = Number(a.target.value);
          isNaN(n) || e.onChange !== void 0 && e.onChange(e.prop, n);
        }
      }
    ),
    e.type === "range" && /* @__PURE__ */ f(g, { children: [
      /* @__PURE__ */ m(
        "input",
        {
          type: "text",
          value: t.toString(),
          disabled: e.disabled,
          ref: i,
          className: "min",
          name: u(),
          onChange: (a) => {
            if (a.target.value.length === 0) return;
            const n = Number(a.target.value);
            isNaN(n) || (l(n), e.onChange !== void 0 && e.onChange(e.prop, n));
          }
        }
      ),
      /* @__PURE__ */ m(
        "input",
        {
          disabled: e.disabled,
          type: "range",
          value: t,
          min: e.min,
          max: e.max,
          step: e.step,
          ref: d,
          name: u(),
          onChange: c
        }
      )
    ] })
  ] });
}
export {
  s as default
};
