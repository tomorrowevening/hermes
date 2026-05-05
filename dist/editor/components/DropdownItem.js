import { jsx as o } from "react/jsx-runtime";
import { useState as a } from "react";
import s from "./Draggable.js";
import c from "./Dropdown.js";
import { randomID as p } from "../utils.js";
function g(i) {
  const { option: e } = i, [l, r] = a("");
  let t;
  switch (e.type) {
    case "draggable":
      t = /* @__PURE__ */ o(
        s,
        {
          title: e.title,
          options: e.value,
          onDragComplete: (n) => {
            e.onDragComplete !== void 0 && e.onDragComplete(n);
          },
          subdropdown: !0
        }
      );
      break;
    case "dropdown":
      t = /* @__PURE__ */ o(
        c,
        {
          title: e.title,
          options: e.value,
          onSelect: e.onSelect,
          subdropdown: !0
        }
      );
      break;
    case "option":
      t = /* @__PURE__ */ o(
        "button",
        {
          onClick: () => {
            e.onSelect !== void 0 && e.onSelect(e.value), e.selectable && (l !== e.title ? r(e.title) : r(""));
          },
          children: e.title
        }
      );
      break;
  }
  return /* @__PURE__ */ o("li", { className: l === e.title ? "selected" : "", children: t }, p());
}
export {
  g as default
};
