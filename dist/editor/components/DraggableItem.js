import { jsx as n, jsxs as a } from "react/jsx-runtime";
import t from "./icons/CloseIcon.js";
import i from "./icons/DragIcon.js";
function o(e) {
  return /* @__PURE__ */ n(
    "li",
    {
      className: `reorder-item ${e.draggingIndex === e.index ? "dragging" : ""}`,
      draggable: !0,
      onDragStart: () => e.onDragStart(e.index),
      onDragOver: (r) => {
        r.preventDefault(), e.onDragOver(e.index);
      },
      onDragEnd: e.onDragEnd,
      children: /* @__PURE__ */ a("div", { children: [
        i,
        /* @__PURE__ */ n("span", { children: e.title }),
        /* @__PURE__ */ n("button", { className: "closeIcon", onClick: () => e.onDelete(e.index), children: t })
      ] })
    }
  );
}
export {
  o as default
};
