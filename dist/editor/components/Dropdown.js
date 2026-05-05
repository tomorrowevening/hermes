import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { useState as a } from "react";
import m from "./NavButton.js";
import u from "./DropdownItem.js";
function w(e) {
  const [s, o] = a(!1), n = [];
  e.options.map((i, l) => {
    e.onSelect !== void 0 && (i.onSelect = e.onSelect), n.push(/* @__PURE__ */ t(u, { option: i }, l));
  });
  let d = "dropdown";
  return e.subdropdown && (d += " subdropdown"), /* @__PURE__ */ r(
    "div",
    {
      className: d,
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      children: [
        /* @__PURE__ */ t(m, { title: e.title }),
        /* @__PURE__ */ t(
          "ul",
          {
            style: { visibility: s ? "visible" : "hidden" },
            children: n
          }
        )
      ]
    }
  );
}
export {
  w as default
};
