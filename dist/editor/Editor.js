import { jsxs as t, jsx as r } from "react/jsx-runtime";
import { forwardRef as a } from "react";
/* empty css                */
const i = a((e, d) => /* @__PURE__ */ t("div", { className: "editor", ref: d, style: e.style, children: [
  e.header && /* @__PURE__ */ r("div", { className: "header", children: e.header }),
  e.children,
  e.footer && /* @__PURE__ */ r("div", { className: "footer", children: e.footer })
] }));
i.displayName = "Editor";
export {
  i as default
};
