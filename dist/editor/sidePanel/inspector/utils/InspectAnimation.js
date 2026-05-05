import { jsx as f } from "react/jsx-runtime";
import { useEffect as g } from "react";
import { SkeletonHelper as v } from "three";
import A from "../InspectorGroup.js";
import S from "../../../multiView/MultiView.js";
import { dispose as b } from "../../../../utils/three.js";
function I(a) {
  const t = a.object, i = a.three;
  function l() {
    return `${i.name}_animation`;
  }
  const s = localStorage.getItem(l()), h = s !== null ? s === "open" : !1;
  function x(e) {
    localStorage.setItem(l(), e ? "open" : "closed");
  }
  const r = [], m = [];
  let u = 0;
  t.animations.forEach((e) => {
    u = Math.max(u, e.duration), e.duration > 0 && m.push({
      title: e.name,
      items: [
        {
          title: "Duration",
          type: "number",
          value: e.duration,
          disabled: !0
        },
        {
          title: "Blend Mode",
          type: "option",
          disabled: !0,
          options: [
            {
              title: "Normal",
              value: 2500
            },
            {
              title: "Additive",
              value: 2501
            }
          ]
        }
      ]
    });
  }), r.push({
    title: "Animations",
    items: m
  });
  let o;
  const d = i.getScene(t.uuid);
  if (d !== null) {
    const e = d.getObjectByProperty("uuid", t.uuid);
    if (e !== void 0) {
      const n = e.mixer;
      if (n !== void 0) {
        const c = [
          {
            title: "Time Scale",
            type: "range",
            value: n.timeScale,
            step: 0.01,
            min: -1,
            max: 2,
            onChange: (y, p) => {
              n.timeScale = p, i.updateObject(t.uuid, "mixer.timeScale", p);
            }
          }
        ];
        c.push({
          title: "Stop All",
          type: "button",
          onChange: () => {
            n.stopAllAction(), i.requestMethod(t.uuid, "stopAllAction", void 0, "mixer");
          }
        }), r.push({
          title: "Mixer",
          items: c
        }), o = new v(e), S.instance?.scene.add(o);
      }
    }
  }
  return g(() => () => {
    o !== void 0 && b(o);
  }, []), /* @__PURE__ */ f(
    A,
    {
      three: a.three,
      title: "Animation",
      items: r,
      expanded: h,
      onToggle: (e) => {
        x(e);
      }
    }
  );
}
export {
  I as default
};
