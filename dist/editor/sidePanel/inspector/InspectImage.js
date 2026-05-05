import { jsxs as g, jsx as n } from "react/jsx-runtime";
import { useRef as u, useState as i } from "react";
import { uploadLocalImage as w } from "./utils/InspectMaterial.js";
import { noImage as I } from "../../components/content.js";
import { randomID as v } from "../../utils.js";
function q(e) {
  const m = e.step !== void 0 ? e.step : 0.01, d = u(null), p = u(null), C = u(null), R = u(null), b = u(null), [k] = i(e.value), [r, X] = i(e.value.offset[0]), [c, Y] = i(e.value.offset[1]), [f, y] = i(e.value.repeat[0]), [l, x] = i(e.value.repeat[1]);
  function s(a, o, t, O, j) {
    if (e.onChange !== void 0) {
      const N = e.prop !== void 0 ? e.prop : e.title;
      e.onChange(N, {
        src: a,
        offset: [o, t],
        repeat: [O, j]
      });
    }
  }
  function h(a) {
    const o = d.current.src, t = a.target.value;
    switch (a.target) {
      case p.current:
        X(t), s(o, t, c, f, l);
        break;
      case C.current:
        Y(t), s(o, r, t, f, l);
        break;
      case R.current:
        y(t), s(o, r, c, t, l);
        break;
      case b.current:
        x(t), s(o, r, c, f, t);
        break;
    }
  }
  return /* @__PURE__ */ g("div", { className: "imageField", children: [
    /* @__PURE__ */ n("img", { alt: e.title, ref: d, onClick: () => {
      w().then((a) => {
        d.current.src = a, s(a, r, c, f, l);
      });
    }, src: k.src.length > 0 ? k.src : I }),
    /* @__PURE__ */ g("div", { className: "fields", children: [
      /* @__PURE__ */ g("div", { children: [
        /* @__PURE__ */ n("span", { children: "Offset:" }),
        /* @__PURE__ */ n(
          "input",
          {
            ref: p,
            type: "number",
            value: r,
            step: m,
            name: v(),
            onChange: h
          }
        ),
        /* @__PURE__ */ n(
          "input",
          {
            ref: C,
            type: "number",
            value: c,
            step: m,
            name: v(),
            onChange: h
          }
        )
      ] }),
      /* @__PURE__ */ g("div", { children: [
        /* @__PURE__ */ n("span", { children: "Repeat:" }),
        /* @__PURE__ */ n(
          "input",
          {
            ref: R,
            type: "number",
            value: f,
            step: m,
            name: v(),
            onChange: h
          }
        ),
        /* @__PURE__ */ n(
          "input",
          {
            ref: b,
            type: "number",
            value: l,
            step: m,
            name: v(),
            onChange: h
          }
        )
      ] }),
      /* @__PURE__ */ n("button", { onClick: () => {
        s("", r, c, f, l), d.current.src = I;
      }, children: "Clear" })
    ] })
  ] });
}
export {
  q as default
};
