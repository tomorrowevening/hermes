import { jsx as t } from "react/jsx-runtime";
import s from "./ChildObject.js";
function r(e) {
  const c = [];
  return e.child?.children.map((n, i) => {
    c.push(/* @__PURE__ */ t(s, { child: n, scene: e.scene, three: e.three }, i));
  }), /* @__PURE__ */ t("div", { className: `scene ${e.class !== void 0 ? e.class : ""}`, children: c });
}
export {
  r as default
};
