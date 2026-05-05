import { jsx as d } from "react/jsx-runtime";
import { Component as a, createRef as f } from "react";
import { ToolEvents as l } from "../../core/remote/RemoteThree.js";
import u from "./inspector/InspectorGroup.js";
class t extends a {
  static instance;
  static groups = [];
  static groupsRefs = [];
  static groupTitles = [];
  static three;
  constructor(s) {
    super(s), this.state = { lastUpdate: Date.now() }, t.instance = this, t.three = s.three, s.three.addEventListener(l.ADD_GROUP, this.addGroup), s.three.addEventListener(l.REMOVE_GROUP, this.removeGroup);
  }
  componentWillUnmount() {
    this.props.three.removeEventListener(l.ADD_GROUP, this.addGroup), this.props.three.removeEventListener(l.REMOVE_GROUP, this.removeGroup);
  }
  render() {
    return /* @__PURE__ */ d("div", { className: "customGroups", children: t.groups }, this.state.lastUpdate);
  }
  // Events
  addGroup = (s) => {
    const i = JSON.parse(s.value), p = [];
    i.items.forEach((o) => {
      p.push({
        type: o.type,
        prop: o.prop,
        title: o.title !== void 0 ? o.title : o.prop,
        value: o.value,
        min: o.min,
        max: o.max,
        step: o.step,
        options: o.options,
        disabled: o.disabled,
        onChange: (h, e) => {
          this.props.three.updateGroup(i.title, h, e);
        }
      });
    }), t.groups.push(
      /* @__PURE__ */ d(
        u,
        {
          three: this.props.three,
          title: i.title,
          items: p
        },
        i.title
      )
    ), t.groupTitles.push(i.title), this.setState({ lastUpdate: Date.now() });
  };
  removeGroup = (s) => {
    const i = s.value, p = t.groupTitles.length;
    for (let o = 0; o < p; o++)
      if (i === t.groupTitles[o]) {
        t.groups.splice(o, 1), t.groupTitles.splice(o, 1), this.setState({ lastUpdate: Date.now() });
        return;
      }
  };
  // Static
  static addEditorGroup(s) {
    const i = t.groupTitles.length;
    for (let e = 0; e < i; e++)
      if (t.groupTitles[e] === s.title)
        return t.groupsRefs[e];
    const p = [];
    s.items.forEach((e) => {
      p.push({
        type: e.type,
        prop: e.prop,
        title: e.title !== void 0 ? e.title : e.prop,
        value: e.value,
        min: e.min,
        max: e.max,
        step: e.step,
        options: e.options,
        disabled: e.disabled,
        onChange: (n, r) => {
          s.onUpdate(n, r);
        }
      });
    }), s.subgroups && s.subgroups.length > 0 && s.subgroups.forEach((e) => {
      const n = [];
      e.items.forEach((r) => {
        n.push({
          type: r.type,
          prop: r.prop,
          title: r.title !== void 0 ? r.title : r.prop,
          value: r.value,
          min: r.min,
          max: r.max,
          step: r.step,
          options: r.options,
          disabled: r.disabled,
          onChange: (c, v) => {
            e.onUpdate(c, v);
          }
        });
      }), p.push({
        three: t.three,
        title: e.title,
        expanded: e.expanded,
        items: n
      });
    });
    const o = f(), h = /* @__PURE__ */ d(
      u,
      {
        three: t.three,
        ref: o,
        title: s.title,
        expanded: s.expanded,
        items: p
      },
      s.title
    );
    return t.groups.push(h), t.groupsRefs.push(o), t.groupTitles.push(s.title), setTimeout(() => {
      t.instance?.setState({ lastUpdate: Date.now() });
    }, 0), o;
  }
  static removeEditorGroup(s) {
    const i = t.groupTitles.length;
    for (let p = 0; p < i; p++)
      if (s === t.groupTitles[p]) {
        t.groups.splice(p, 1), t.groupTitles.splice(p, 1), t.instance?.setState({ lastUpdate: Date.now() });
        return;
      }
  }
  static removeAllGroups() {
    t.groups = [], t.groupTitles = [], t.groupsRefs = [], t.instance?.setState({ lastUpdate: Date.now() });
  }
}
export {
  t as default
};
