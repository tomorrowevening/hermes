import { jsxs as t, jsx as n } from "react/jsx-runtime";
import r from "./Editor.js";
import i from "./multiView/MultiView.js";
import o from "./sidePanel/SidePanel.js";
function f(e) {
  return /* @__PURE__ */ t(r, { children: [
    /* @__PURE__ */ n(
      i,
      {
        three: e.three,
        scenes: e.scenes,
        onSceneAdd: e.onSceneAdd,
        onSceneResize: e.onSceneResize,
        onSceneUpdate: e.onSceneUpdate
      }
    ),
    /* @__PURE__ */ n(o, { three: e.three })
  ] });
}
export {
  f as default
};
