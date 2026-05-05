import { jsx as t, Fragment as r } from "react/jsx-runtime";
import { useState as u, useEffect as l } from "react";
function m(i) {
  const {
    app: e,
    renderEditor: n,
    onLoad: o,
    renderLoading: s = null,
    children: c
  } = i, [a, d] = u(!1);
  if (l(() => {
    e.detectSettings().then(() => {
      o ? o(e).then(() => d(!0)) : d(!0);
    });
  }, []), !a) return /* @__PURE__ */ t(r, { children: s });
  if (e.editor && n) {
    const f = e.components.get("three");
    return /* @__PURE__ */ t(r, { children: n(f) });
  }
  return /* @__PURE__ */ t(r, { children: c?.(e) });
}
export {
  m as default
};
