import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { useEffect as i } from "react";
import n from "./Editor.js";
import o from "./multiView/MultiView.js";
import c from "./sidePanel/SidePanel.js";
import { textureFromSrc as m, setItemProps as d, getSubItem as s, stripScene as S, stripObject as f } from "./sidePanel/utils.js";
const h = { stripObject: f, stripScene: S, getSubItem: s, setItemProps: d, textureFromSrc: m };
function I(e) {
  return i(() => (e.three.setEditorUtils(h), () => e.three.setEditorUtils(void 0)), [e.three]), /* @__PURE__ */ r(n, { children: [
    /* @__PURE__ */ t(
      o,
      {
        three: e.three,
        scenes: e.scenes,
        onSceneAdd: e.onSceneAdd,
        onSceneResize: e.onSceneResize,
        onSceneUpdate: e.onSceneUpdate
      }
    ),
    /* @__PURE__ */ t(c, { three: e.three })
  ] });
}
export {
  I as default
};
