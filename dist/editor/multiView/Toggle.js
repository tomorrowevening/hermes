import { jsx as i } from "react/jsx-runtime";
import { useState as d } from "react";
function u(e) {
  const [t, o] = d(e.selected), c = "toggle" + (t ? " selected" : "");
  return /* @__PURE__ */ i(
    "button",
    {
      className: c,
      onClick: () => {
        const n = !t;
        o(n), e.onClick(n);
      },
      style: {
        backgroundImage: `url(${e.icon})`,
        backgroundPositionX: "center",
        backgroundPositionY: e.top !== void 0 ? `${e.top}px` : "center",
        backgroundSize: `${e.width !== void 0 ? `${e.width}px` : "26px"} ${e.height}px`
      }
    },
    e.name
  );
}
export {
  u as default
};
