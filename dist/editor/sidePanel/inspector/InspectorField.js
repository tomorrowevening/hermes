import { jsxs as v, jsx as t, Fragment as g } from "react/jsx-runtime";
import { colorToHex as h, capitalize as C, randomID as o } from "../../utils.js";
import { useState as w, useRef as N, useEffect as V } from "react";
import x from "./InspectNumber.js";
import r from "./InspectVector2.js";
import I from "./InspectGrid3.js";
import D from "./InspectGrid4.js";
import F from "./InspectImage.js";
import { Color as j, LinearSRGBColorSpace as G } from "three";
function T(e) {
  let n = e.value;
  n !== void 0 && (n.isColor !== void 0 ? n = h(e.value) : e.type === "color" && (n = h(new j().setStyle(e.value, G))));
  const [i, f] = w(n), c = N(null);
  V(() => {
    f(n);
  }, [n]);
  const a = (d) => {
    let l = d.target.value;
    if (e.type === "boolean")
      l = d.target.checked;
    else if (e.type === "option" && (typeof e.value == "number" ? l = Number(l) : typeof e.value == "boolean" ? l = !!l : typeof e.value == "object" && (l = JSON.parse(l)), e.options !== void 0)) {
      const S = e.options.length;
      for (let m = 0; m < S && e.options[m].value !== l; m++)
        ;
    }
    f(l), e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, l);
  }, y = {};
  e.disabled && (y.opacity = 0.8);
  const b = typeof i == "string" ? i : String(i ?? ""), u = e.type === "field" || e.type === "string" && (b.length > 100 || b.search(`
`) > -1), k = u || e.type === "image" || e.type === "vector2";
  return /* @__PURE__ */ v("div", { className: `field ${k ? "block" : ""}`, style: y, children: [
    e.type !== "button" && /* @__PURE__ */ t("span", { ref: c, children: C(e.title) }, "fieldLabel"),
    e.type === "string" && !u && /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        disabled: e.disabled,
        onChange: a,
        value: i,
        name: o()
      }
    ),
    (e.type === "field" || e.type === "string" && u) && /* @__PURE__ */ t(
      "textarea",
      {
        cols: 50,
        rows: 10,
        disabled: e.disabled !== void 0 ? e.disabled : !0,
        onChange: a,
        onKeyDown: (d) => {
          e.onKeyDown !== void 0 && e.onKeyDown(d);
        },
        value: i,
        name: o()
      }
    ),
    e.type === "boolean" && /* @__PURE__ */ t(
      "input",
      {
        type: "checkbox",
        disabled: e.disabled,
        onChange: a,
        checked: i,
        name: o()
      }
    ),
    e.type === "number" && /* @__PURE__ */ t(
      x,
      {
        value: i,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: c,
        onChange: e.onChange
      }
    ),
    e.type === "range" && /* @__PURE__ */ t(
      x,
      {
        value: i,
        type: e.type,
        prop: e.prop !== void 0 ? e.prop : e.title,
        min: e.min,
        max: e.max,
        step: e.step,
        disabled: e.disabled,
        labelRef: c,
        onChange: e.onChange
      }
    ),
    e.type === "color" && /* @__PURE__ */ v(g, { children: [
      /* @__PURE__ */ t("input", { type: "text", value: i.toString(), onChange: a, disabled: e.disabled, className: "color", name: o() }),
      /* @__PURE__ */ t("input", { type: "color", value: i, onChange: a, disabled: e.disabled, name: o() })
    ] }),
    e.type === "button" && /* @__PURE__ */ t(
      "button",
      {
        disabled: e.disabled,
        onClick: () => {
          e.onChange !== void 0 && e.onChange(e.prop !== void 0 ? e.prop : e.title, !0);
        },
        children: e.title
      }
    ),
    e.type === "image" && /* @__PURE__ */ t(F, { title: e.title, prop: e.prop, value: e.value, onChange: e.onChange }),
    e.type === "option" && /* @__PURE__ */ t(g, { children: /* @__PURE__ */ t(
      "select",
      {
        onChange: a,
        disabled: e.disabled,
        value: i,
        name: o(),
        children: e.options?.map((d, l) => /* @__PURE__ */ t("option", { value: d.value, children: C(d.title) }, l))
      }
    ) }),
    e.type === "vector2" && /* @__PURE__ */ t(r, { step: e.step, value: i, min: 0, max: 1, onChange: a }),
    e.type === "grid3" && /* @__PURE__ */ t(I, { step: e.step, value: i, onChange: a }),
    e.type === "grid4" && /* @__PURE__ */ t(D, { step: e.step, value: i, onChange: a }),
    e.type === "euler" && /* @__PURE__ */ t(I, { step: e.step, value: i, onChange: a })
  ] });
}
export {
  T as default
};
