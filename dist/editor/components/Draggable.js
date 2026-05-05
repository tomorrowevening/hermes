import { jsxs as x, jsx as r } from "react/jsx-runtime";
import { useState as l } from "react";
import I from "./NavButton.js";
import v from "./DraggableItem.js";
function E(n) {
  const [g, d] = l(!1), [o, i] = l(n.options), [s, a] = l(null), m = (e) => {
    n.onDragComplete(e), i(e);
  }, u = (e) => {
    const t = [...o];
    t.splice(e, 1), m(t);
  }, p = (e) => {
    a(e);
  }, f = (e) => {
    if (s === e || s === null) return;
    const t = [...o], b = t.splice(s, 1)[0];
    t.splice(e, 0, b), a(e), i(t);
  }, D = () => {
    n.onDragComplete(o), a(null);
  };
  let c = "dropdown draggable";
  return n.subdropdown && (c += " subdropdown"), /* @__PURE__ */ x("div", { className: c, onMouseEnter: () => d(!0), onMouseLeave: () => d(!1), children: [
    /* @__PURE__ */ r(I, { title: n.title }),
    /* @__PURE__ */ r("ul", { className: "reorder-list", style: { display: g ? "block" : "none" }, children: o.map((e, t) => /* @__PURE__ */ r(
      v,
      {
        title: e,
        index: t,
        draggingIndex: s,
        onDelete: u,
        onDragStart: p,
        onDragOver: f,
        onDragEnd: D
      },
      e
    )) })
  ] });
}
export {
  E as default
};
