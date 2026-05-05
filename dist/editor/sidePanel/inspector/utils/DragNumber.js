import { useState as L, useEffect as x } from "react";
function y(e) {
  const [f, a] = L(e.defaultValue);
  return x(() => {
    let m = !1, l = -1, v = 0, t = e.defaultValue, r = !1;
    const o = (n) => {
      r = n.ctrlKey;
    }, s = (n) => {
      m = !0, v = Number(e.input.current?.value), l = n.clientX, document.addEventListener("mouseup", u, !1), document.addEventListener("mousemove", i, !1), document.addEventListener("contextmenu", u, !1);
    }, i = (n) => {
      if (!m) return;
      const d = e.step !== void 0 ? e.step : 1, E = (n.clientX - l) * d * (r ? 10 : 1);
      t = Number((v + E).toFixed(4)), e.min !== void 0 && (t = Math.max(t, e.min)), e.max !== void 0 && (t = Math.min(t, e.max)), e.onChange !== void 0 && e.onChange(t), a(t);
    }, u = () => {
      m = !1, document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", i), document.removeEventListener("contextmenu", u);
    }, c = (n) => {
      const d = Number(n.target.value);
      e.onChange !== void 0 && e.onChange(d), a(d);
    };
    return e.label.current?.addEventListener("mousedown", s, !1), e.sliderRef !== void 0 && e.sliderRef.current?.addEventListener("input", c), document.addEventListener("keydown", o, !1), document.addEventListener("keyup", o, !1), () => {
      e.label.current?.removeEventListener("mousedown", s), e.sliderRef !== void 0 && e.sliderRef.current?.removeEventListener("input", c), document.removeEventListener("mouseup", u), document.removeEventListener("mousemove", i), document.removeEventListener("contextmenu", u), document.removeEventListener("keydown", o), document.addEventListener("keyup", o, !1);
    };
  }, []), f;
}
export {
  y as default
};
