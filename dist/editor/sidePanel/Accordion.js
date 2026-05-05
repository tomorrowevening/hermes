import { jsxs as c, jsx as i, Fragment as r } from "react/jsx-runtime";
import { useState as s } from "react";
import { capitalize as u } from "../utils.js";
import { ToolEvents as b } from "../../core/remote/RemoteThree.js";
function C(e) {
  const [n, a] = s(e.open !== void 0 ? e.open : !1), [d, v] = s(e.visible !== void 0 ? e.visible : !1), h = !n || e.children === void 0, m = () => {
    e.three.dispatchEvent({ type: b.REMOVE_SCENE, value: e.scene });
  };
  return /* @__PURE__ */ c("div", { className: `accordion ${h ? "hide" : ""}`, children: [
    /* @__PURE__ */ c(
      "button",
      {
        className: "toggle",
        onClick: () => {
          const l = !n;
          e.onToggle !== void 0 && e.onToggle(l), a(l);
        },
        children: [
          /* @__PURE__ */ i(
            "p",
            {
              className: `status ${n ? "open" : ""}`,
              children: "Toggle"
            }
          ),
          /* @__PURE__ */ i("p", { className: "label", children: u(e.label) })
        ]
      }
    ),
    e.onRefresh ? /* @__PURE__ */ c(r, { children: [
      /* @__PURE__ */ i(
        "button",
        {
          className: "visibility",
          style: {
            opacity: d ? 1 : 0.25
          },
          onClick: () => {
            const t = e.three.getScene(e.scene.uuid);
            if (t) {
              const o = !t.visible;
              t.visible = o, v(o);
            }
          }
        }
      ),
      /* @__PURE__ */ i("button", { className: "refresh", onClick: e.onRefresh }),
      /* @__PURE__ */ i("button", { className: "remove", onClick: m })
    ] }) : null,
    e.button,
    /* @__PURE__ */ i("div", { className: n ? "open" : "", children: /* @__PURE__ */ i("div", { children: e.children }) })
  ] });
}
export {
  C as default
};
