import { jsx as t, jsxs as a } from "react/jsx-runtime";
import { useRef as f, useState as m, useEffect as r } from "react";
import { setItemProps as g, determineIcon as b } from "./utils.js";
function v(e) {
  if (e.child === void 0)
    return console.log("Hermes - No child attached"), null;
  const d = f(null), [n, u] = m(!1), h = e.child.children.length > 0, o = [];
  return e.child.children.length > 0 && e.child.children.map((l, i) => {
    o.push(/* @__PURE__ */ t(v, { child: l, three: e.three }, i));
  }), r(() => {
    if (e.child) {
      const l = e.child.uuid.split(".")[0], i = e.three.getScene(l);
      if (i !== null)
        try {
          const c = i.getObjectByProperty("uuid", e.child.uuid);
          c !== void 0 ? d.current.style.opacity = c.visible ? "1" : "0.25" : console.log(`Hermes - Can't find child: ${e.child.uuid}`);
        } catch (c) {
          console.log("Error looking for child:", c), console.log(e.child), console.log(e.three.scenes), console.log(i);
        }
      else
        console.log(`Hermes (ChildObject) - Can't find Scene: ${l} with child UUID: ${e.child.uuid}`, e.three.scenes, e.three.scene, i);
    }
  }, [n]), /* @__PURE__ */ a("div", { className: "childObject", children: [
    /* @__PURE__ */ a("div", { className: "child", children: [
      h ? /* @__PURE__ */ t(
        "button",
        {
          className: "status",
          style: {
            backgroundPositionX: n ? "-14px" : "2px"
          },
          onClick: () => {
            u(!n);
          }
        }
      ) : null,
      /* @__PURE__ */ t(
        "button",
        {
          className: "name",
          style: {
            left: h ? "20px" : "5px"
          },
          onClick: () => {
            e.child !== void 0 ? (e.three.getObject(e.child.uuid), !n && h && u(!0)) : console.log("Hermes - No child attached...");
          },
          children: e.child.name.length > 0 ? `${e.child.name} (${e.child.type})` : `${e.child.type}::${e.child.uuid}`
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          className: "visibility",
          ref: d,
          onClick: () => {
            if (e.child) {
              const l = e.three.getScene(e.child.uuid);
              if (l !== null) {
                const i = l.getObjectByProperty("uuid", e.child.uuid);
                if (i !== void 0) {
                  const c = "visible", s = !i.visible;
                  d.current.style.opacity = s ? "1" : "0.25", e.three.updateObject(e.child.uuid, c, s), g(i, c, s);
                } else
                  console.log(`Hermes - Couldn't find object: ${e.child.uuid}`, l);
              } else
                console.log(`Hermes - Couldn't find object in scene: ${e.child.uuid}, ${e.child.name}`);
            }
          }
        }
      ),
      /* @__PURE__ */ t("div", { className: `icon ${b(e.child)}` })
    ] }),
    /* @__PURE__ */ t("div", { className: n ? "open" : "", children: /* @__PURE__ */ t("div", { className: "container", children: o }) })
  ] });
}
export {
  v as default
};
