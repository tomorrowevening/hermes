import { jsxs as C, jsx as i } from "react/jsx-runtime";
import { useState as l, useEffect as D } from "react";
/* empty css                     */
import E from "./Accordion.js";
import m from "./ContainerObject.js";
import b from "./DebugData.js";
import L from "./inspector/Inspector.js";
import { ToolEvents as c } from "../../core/remote/RemoteThree.js";
function T(n) {
  const [r] = l([]), [h] = l([]), [R, a] = l(0), d = (o) => {
    const t = o.value;
    for (let e = 0; e < r.length; e++)
      if (t.uuid === r[e].uuid) return;
    r.push(t), h.push(
      /* @__PURE__ */ i(
        E,
        {
          three: n.three,
          label: `Scene: ${t.name}`,
          scene: t,
          open: !1,
          visible: !1,
          onRefresh: () => {
            n.three.refreshScene(t.name);
          },
          children: /* @__PURE__ */ i(m, { child: t, scene: t, three: n.three })
        },
        t.name
      )
    ), a(Date.now());
  }, u = (o) => {
    const t = o.value;
    for (let e = 0; e < r.length; e++)
      if (t.uuid === r[e].uuid) {
        r[e] = t, h[e] = /* @__PURE__ */ i(
          E,
          {
            three: n.three,
            label: `Scene: ${t.name}`,
            scene: t,
            open: h[e].props.open,
            visible: h[e].props.visible,
            onRefresh: () => {
              n.three.refreshScene(t.name);
            },
            children: /* @__PURE__ */ i(m, { child: t, scene: t, three: n.three })
          },
          t.name
        ), a(Date.now());
        return;
      }
  }, f = (o) => {
    const t = o.value;
    for (let e = 0; e < r.length; e++)
      if (t.uuid === r[e].uuid) {
        r.splice(e, 1), h.splice(e, 1), a(Date.now());
        return;
      }
  }, S = (o) => {
    const t = o.value.name;
    for (let e = 0; e < r.length; e++) {
      const s = r[e], v = s.name === t;
      h[e] = /* @__PURE__ */ i(
        E,
        {
          three: n.three,
          label: `Scene: ${s.name}`,
          scene: s,
          open: v,
          visible: v,
          onRefresh: () => {
            n.three.refreshScene(s.name);
          },
          children: /* @__PURE__ */ i(m, { child: s, scene: s, three: n.three })
        },
        s.name
      );
    }
    a(Date.now());
  };
  return D(() => (n.three.addEventListener(c.ADD_SCENE, d), n.three.addEventListener(c.SET_SCENE, S), n.three.addEventListener(c.REFRESH_SCENE, u), n.three.addEventListener(c.REMOVE_SCENE, f), () => {
    n.three.removeEventListener(c.ADD_SCENE, d), n.three.removeEventListener(c.SET_SCENE, S), n.three.removeEventListener(c.REFRESH_SCENE, u), n.three.removeEventListener(c.REMOVE_SCENE, f);
  }), []), /* @__PURE__ */ C("div", { id: "SidePanel", children: [
    /* @__PURE__ */ i("div", { className: "scenes", children: h }, R),
    /* @__PURE__ */ i(L, { three: n.three }),
    /* @__PURE__ */ i(b, { three: n.three })
  ] });
}
export {
  T as default
};
