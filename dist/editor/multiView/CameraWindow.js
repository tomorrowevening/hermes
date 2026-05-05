import { jsxs as f, jsx as d } from "react/jsx-runtime";
import { forwardRef as w, useState as l } from "react";
const x = (e) => {
  const [n, c] = l(e.options[e.index]), i = () => {
    e.onToggle(!e.open);
  }, a = (t) => {
    t !== n && (e.onSelect(t), c(t)), e.onToggle(!1);
  }, s = e.open ? `${e.options.length * 31 - 1}px` : "0px";
  return /* @__PURE__ */ f("div", { className: `dropdown ${e.up === !0 ? "up" : ""}`, children: [
    /* @__PURE__ */ d("div", { className: "dropdown-toggle", onClick: i, children: `${e.title}: ${n}` }),
    /* @__PURE__ */ d("ul", { className: "dropdown-menu", style: { height: s }, children: e.options.map((t) => /* @__PURE__ */ d("li", { onClick: () => a(t), children: t }, t)) })
  ] });
}, R = w(function(n, c) {
  const i = [
    "Renderer",
    "Depth",
    "Normals",
    "UVs",
    "Wireframe"
  ], [a, s] = l("Renderer"), [t, O] = l(!1), [u, g] = l(!1), [r, m] = l(!1);
  return /* @__PURE__ */ f("div", { className: `CameraWindow ${n.name}`, children: [
    /* @__PURE__ */ d("div", { ref: c, className: "clickable", onClick: () => {
      r && m(!1);
    } }),
    /* @__PURE__ */ f("div", { className: "options", children: [
      n.camera !== null && /* @__PURE__ */ d(
        x,
        {
          title: "Camera",
          index: n.options.indexOf(n.camera.name),
          open: r,
          options: n.options,
          onSelect: n.onSelectCamera,
          onToggle: (o) => {
            o && u && g(!1), m(o);
          },
          up: !0
        }
      ),
      /* @__PURE__ */ d(
        x,
        {
          title: "Mode",
          index: i.indexOf(a),
          open: u,
          options: i,
          onSelect: (o) => {
            if (o === a) return;
            const h = o;
            n.onSelectRenderMode(h), s(h);
          },
          onToggle: (o) => {
            o && r && m(!1), t && O(!1), g(o);
          },
          up: !0
        }
      )
    ] })
  ] });
});
export {
  x as Dropdown,
  R as default
};
