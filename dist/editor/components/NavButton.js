import { jsx as e } from "react/jsx-runtime";
function l(t) {
  return t.title.search("<") > -1 ? /* @__PURE__ */ e("button", { className: "svg", dangerouslySetInnerHTML: { __html: t.title } }) : /* @__PURE__ */ e("button", { children: t.title });
}
export {
  l as default
};
