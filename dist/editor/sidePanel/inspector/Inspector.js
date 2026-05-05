import { jsx as r, jsxs as m, Fragment as c } from "react/jsx-runtime";
import { useState as f, useEffect as E } from "react";
/* empty css               */
import p from "../Accordion.js";
import s from "./InspectorField.js";
import { InspectCamera as I } from "./utils/InspectCamera.js";
import { InspectMaterial as C } from "./utils/InspectMaterial.js";
import { InspectTransform as b } from "./utils/InspectTransform.js";
import { InspectLight as T } from "./utils/InspectLight.js";
import g from "./utils/InspectAnimation.js";
import L from "../../tools/Transform.js";
import { ToolEvents as n } from "../../../core/remote/RemoteThree.js";
const l = {
  name: "",
  uuid: "",
  type: "",
  visible: !1,
  matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  animations: [],
  material: void 0,
  perspectiveCameraInfo: void 0,
  orthographicCameraInfo: void 0,
  lightInfo: void 0,
  children: []
};
function R(t) {
  const [e, a] = f(l);
  E(() => {
    function h(v) {
      a(v.value);
    }
    function o() {
      a(l);
    }
    return t.three.addEventListener(n.CLEAR_OBJECT, o), t.three.addEventListener(n.SET_SCENE, o), t.three.addEventListener(n.SET_OBJECT, h), () => {
      t.three.removeEventListener(n.CLEAR_OBJECT, o), t.three.removeEventListener(n.SET_SCENE, o), t.three.removeEventListener(n.SET_OBJECT, h);
    };
  }, []);
  const i = e.type.toLowerCase(), d = e.animations.length > 0 || e.mixer !== void 0, u = i.search("mesh") > -1 || i.search("line") > -1 || i.search("points") > -1;
  return /* @__PURE__ */ r(
    p,
    {
      three: t.three,
      label: "Inspector",
      button: e.uuid.length > 0 ? /* @__PURE__ */ r("button", { className: "remove", onClick: () => {
        L.instance.remove(e.name), a(l);
      } }) : void 0,
      children: /* @__PURE__ */ r("div", { id: "Inspector", className: t.class, children: e.uuid.length > 0 && /* @__PURE__ */ m(c, { children: [
        /* @__PURE__ */ m(c, { children: [
          /* @__PURE__ */ r(
            s,
            {
              type: "string",
              title: "Name",
              prop: "name",
              value: e.name,
              disabled: !0
            }
          ),
          /* @__PURE__ */ r(
            s,
            {
              type: "string",
              title: "Type",
              prop: "type",
              value: e.type,
              disabled: !0
            }
          ),
          /* @__PURE__ */ r(
            s,
            {
              type: "string",
              title: "UUID",
              prop: "uuid",
              value: e.uuid,
              disabled: !0
            }
          )
        ] }),
        /* @__PURE__ */ m(c, { children: [
          /* @__PURE__ */ r(b, { object: e, three: t.three }),
          d ? /* @__PURE__ */ r(g, { object: e, three: t.three }) : null,
          i.search("camera") > -1 ? I(e, t.three) : null,
          i.search("light") > -1 ? T(e, t.three) : null,
          u ? C(e, t.three) : null
        ] })
      ] }) })
    },
    "Inspector"
  );
}
export {
  R as default
};
