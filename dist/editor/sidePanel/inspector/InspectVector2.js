import { jsxs as o, jsx as m } from "react/jsx-runtime";
import { useRef as l, useState as d, useEffect as k } from "react";
import { normalize as Y, clamp as s, roundTo as j, mix as I } from "../../../utils/math.js";
import v from "./utils/DragNumber.js";
import { randomID as h } from "../../utils.js";
function J(a) {
  const C = l(null), M = l(null), g = l(null), b = l(null), R = l(null), y = l(null), p = l(null), w = l(null), L = l(null), D = l(null), [i, c] = d(a.value.x), [u, f] = d(a.value.y), [e, r] = d({
    min: Math.min(a.min, Math.min(a.value.x, a.value.y)),
    max: Math.max(a.max, Math.max(a.value.x, a.value.y))
  }), [P, E] = d(!1);
  v({
    label: p,
    input: C,
    defaultValue: i,
    min: e.min,
    max: e.max,
    step: 0.01,
    onChange: (n) => {
      c(n), a.onChange({ target: { value: { x: n, y: u } } });
    }
  }), v({
    label: w,
    input: M,
    defaultValue: u,
    min: e.min,
    max: e.max,
    step: 0.01,
    onChange: (n) => {
      f(n), a.onChange({ target: { value: { x: i, y: n } } });
    }
  }), v({
    label: L,
    input: g,
    defaultValue: e.min,
    min: e.min - 1,
    max: e.max + 1,
    step: 0.01,
    onChange: (n) => {
      r({ min: n, max: e.max });
    }
  }), v({
    label: D,
    input: b,
    defaultValue: e.max,
    min: e.min - 1,
    max: e.max + 1,
    step: 0.01,
    onChange: (n) => {
      r({ min: e.min, max: n });
    }
  });
  function $() {
    P || (window.addEventListener("mousemove", V), window.addEventListener("mouseup", N), E(!0));
  }
  function N() {
    window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", N), E(!1);
  }
  function V(n) {
    const t = R.current.getBoundingClientRect(), T = s(0, 99, n.clientX - t.left) / 99, U = 1 - s(0, 99, n.clientY - t.top) / 99, B = j(I(e.min, e.max, T), 3), X = j(I(e.min, e.max, U), 3);
    a.onChange({ target: { value: { x: B, y: X } } }), c(B), f(X);
  }
  function z() {
    const n = Number(g.current.value);
    r({ min: n, max: e.max }), i < n && c(s(n, e.max, i)), u < n && f(s(n, e.max, u));
  }
  function S() {
    const n = Number(b.current.value);
    r({ min: e.min, max: n }), i > n && c(s(e.min, n, i)), u > n && f(s(e.min, n, u));
  }
  k(() => {
    y.current.style.left = `${Y(e.min, e.max, i) * 100}%`, y.current.style.top = `${(1 - Y(e.min, e.max, u)) * 100}%`;
  }, [e, i, u]);
  const x = a.step !== void 0 ? a.step : 0.01;
  return /* @__PURE__ */ o("div", { className: "vector2", children: [
    /* @__PURE__ */ o("div", { className: "fields", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ m("span", { ref: p, children: "X" }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: C,
            type: "number",
            value: i,
            min: e.min,
            max: e.max,
            step: x,
            name: h(),
            onChange: (n) => {
              if (c(n.target.value), n.target.value.length === 0) return;
              const t = Number(n.target.value);
              isNaN(t) || (a.onChange({ target: { value: { x: t, y: u } } }), t < e.min && r({ min: t, max: e.max }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ m("span", { ref: w, children: "Y" }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: M,
            type: "number",
            value: u,
            min: e.min,
            max: e.max,
            step: x,
            name: h(),
            onChange: (n) => {
              if (f(n.target.value), n.target.value.length === 0) return;
              const t = Number(n.target.value);
              isNaN(t) || (a.onChange({ target: { value: { x: i, y: t } } }), t > e.max && r({ min: e.min, max: t }));
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ m("span", { ref: L, children: "Min" }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: g,
            type: "number",
            value: e.min,
            step: x,
            name: h(),
            onChange: z
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ m("span", { ref: D, children: "Max" }),
        /* @__PURE__ */ m(
          "input",
          {
            ref: b,
            type: "number",
            value: e.max,
            step: x,
            name: h(),
            onChange: S
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "input", ref: R, onMouseDown: $, onMouseUp: N, children: [
      /* @__PURE__ */ m("div", { className: "x" }),
      /* @__PURE__ */ m("div", { className: "y" }),
      /* @__PURE__ */ m("div", { className: "pt", ref: y })
    ] })
  ] });
}
export {
  J as default
};
