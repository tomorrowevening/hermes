import { jsx as p } from "react/jsx-runtime";
import { Component as l, createRef as h } from "react";
import m from "../Accordion.js";
import g from "./InspectorField.js";
import { capitalize as f } from "../../utils.js";
function v(a) {
  return "items" in a;
}
class i extends l {
  subgroupNames = [];
  subgroupElements = [];
  valueOverrides = /* @__PURE__ */ new Map();
  three;
  constructor(t) {
    super(t), this.three = t.three, this.state = { lastUpdated: Date.now() };
  }
  addGroup(t) {
    const e = [];
    t.items.forEach((s) => {
      e.push({
        type: s.type,
        prop: s.prop,
        title: s.title !== void 0 ? s.title : s.prop,
        value: s.value,
        min: s.min,
        max: s.max,
        step: s.step,
        options: s.options,
        disabled: s.disabled,
        onChange: (n, u) => {
          t.onUpdate(n, u);
        }
      });
    });
    const o = h(), r = /* @__PURE__ */ p(
      i,
      {
        three: this.props.three,
        ref: o,
        title: t.title,
        expanded: t.expanded,
        items: e
      },
      t.title
    );
    return this.subgroupNames.push(t.title), this.subgroupElements.push(r), this.setState({ lastUpdated: Date.now() }), o;
  }
  removeGroup(t) {
    const e = this.subgroupNames.length;
    for (let o = 0; o < e; o++) {
      const r = this.subgroupNames[o];
      if (t === r) {
        this.subgroupNames.splice(o, 1), this.subgroupElements.splice(o, 1), this.setState({ lastUpdated: Date.now() });
        return;
      }
    }
  }
  setField(t, e) {
    this.valueOverrides.set(t, e), this.setState({ lastUpdated: Date.now() });
  }
  render() {
    const t = [];
    return this.props.items.forEach((e) => {
      if (v(e))
        t.push(
          /* @__PURE__ */ p(i, { three: this.props.three, title: f(e.title), items: e.items }, e.title)
        );
      else {
        const o = this.valueOverrides.get(e.title), r = o !== void 0 ? o : e.value;
        t.push(
          /* @__PURE__ */ p(
            g,
            {
              title: e.title,
              prop: e.prop,
              value: r,
              type: e.type,
              min: e.min,
              max: e.max,
              step: e.step,
              disabled: e.disabled,
              options: e.options,
              onChange: (s, n) => {
                e.onChange !== void 0 && (this.valueOverrides.delete(e.title), e.onChange(s, n));
              },
              onKeyDown: (s) => {
                e.onKeyDown !== void 0 && e.onKeyDown(s);
              }
            },
            e.title
          )
        );
      }
    }), this.subgroupElements.forEach((e) => t.push(e)), /* @__PURE__ */ p(
      m,
      {
        three: this.props.three,
        label: this.props.title,
        open: this.props.expanded === !0,
        onToggle: (e) => {
          this.props.onToggle && this.props?.onToggle(e);
        },
        children: t
      }
    );
  }
}
export {
  i as default
};
