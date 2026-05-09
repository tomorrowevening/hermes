import { getProject as _ } from "@tomorrowevening/theatre-core";
import $ from "./BaseRemote.js";
import { noop as g } from "../types.js";
function w(o) {
  return o != null && o.r !== void 0 && o.g !== void 0 && o.b !== void 0;
}
function P(o, e, t, i, h) {
  const s = 1 - o;
  return s * s * s * e + 3 * s * s * o * t + 3 * s * o * o * i + o * o * o * h;
}
function q(o, e, t) {
  if (o.type !== "bezier" || o.handles.length !== 4)
    throw new Error("Invalid keyframe data for Bézier interpolation.");
  const [i, h] = o.handles, s = (t - o.position) / (e.position - o.position);
  return P(
    s,
    o.value,
    o.value + i,
    e.value + h,
    e.value
  );
}
class B extends $ {
  project;
  sheets = /* @__PURE__ */ new Map();
  sheetObjects = /* @__PURE__ */ new Map();
  sheetObjectCBs = /* @__PURE__ */ new Map();
  sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  activeSheet;
  studio = void 0;
  constructor(e = !1, t = !1) {
    super("RemoteTheatre", e, t);
  }
  dispose() {
    this.project = void 0, this.sheets = /* @__PURE__ */ new Map(), this.sheetObjects = /* @__PURE__ */ new Map(), this.sheetObjectCBs = /* @__PURE__ */ new Map(), this.sheetObjectUnsubscribe = /* @__PURE__ */ new Map();
  }
  loadProject(e, t) {
    return this.project = _(e, { state: t }), new Promise((i, h) => {
      this.project?.ready.then(() => {
        if (t) {
          const s = t.sheetsById;
          for (const a in s) this.sheet(a);
        }
        i();
      }).catch(() => h());
    });
  }
  getSheetInstance(e, t) {
    return t !== void 0 ? `${e}-${t}` : e;
  }
  sheet(e, t) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const i = this.getSheetInstance(e, t);
    let h = this.sheets.get(i);
    return h !== void 0 || (h = this.project?.sheet(e, t), this.sheets.set(i, h)), h;
  }
  playSheet(e, t, i) {
    return new Promise((h) => {
      this.sheet(e, i)?.sequence.play(t).then((s) => h(s)), this.send({
        event: "playSheet",
        target: "editor",
        data: {
          sheet: e,
          instance: i,
          value: t
        }
      });
    });
  }
  pauseSheet(e, t) {
    this.sheet(e, t)?.sequence.pause(), this.send({
      event: "pauseSheet",
      target: "editor",
      data: {
        sheet: e,
        instance: t
      }
    });
  }
  clearSheetObjects(e) {
    this.sheetObjects.forEach((t, i) => {
      i.search(`${e}_`) > -1 && this.unsubscribe(t);
    });
  }
  sheetObject(e, t, i, h, s) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const a = this.sheet(e, s);
    if (a === void 0) return;
    const u = `${this.getSheetInstance(e, s)}_${t}`;
    let b = this.sheetObjects.get(u), j = i;
    b !== void 0 && (j = { ...i, ...b.value }), b = a.object(t, j, { reconfigure: !0 }), this.sheetObjects.set(u, b), this.sheetObjectCBs.set(u, h !== void 0 ? h : g);
    function v(d, p, n) {
      if (typeof n == "object")
        if (w(n))
          d[p] = {
            r: n.r,
            g: n.g,
            b: n.b,
            a: n.a
          };
        else
          for (const r in n) {
            const l = n[r];
            typeof l == "object" && v(n, r, l);
          }
    }
    const c = b.onValuesChange((d) => {
      const p = this.sheetObjectCBs.get(u);
      if (this.editor) {
        for (const n in d) {
          const r = d[n];
          typeof r == "object" && v(d, n, r);
        }
        this.send({
          event: "updateSheetObject",
          target: "app",
          data: {
            sheet: e,
            sheetObject: u,
            values: d
          }
        }), p && p(d);
      } else
        p && p(d);
    });
    return this.sheetObjectUnsubscribe.set(u, c), b;
  }
  getSheetObjectKeyframes(e, t, i) {
    const h = this.sheet(e);
    if (h === void 0) return [];
    const s = `${e}_${t}`, a = this.sheetObjects.get(s);
    return a === void 0 ? [] : h.sequence.__experimental_getKeyframes(a.props[i]);
  }
  getSheetObjectVectors(e, t) {
    const i = this.sheet(e);
    if (i === void 0) return [];
    const h = `${e}_${t}`, s = this.sheetObjects.get(h);
    if (s === void 0) return [];
    const a = [], f = i.sequence.__experimental_getKeyframes(s.props.x), u = i.sequence.__experimental_getKeyframes(s.props.y), b = i.sequence.__experimental_getKeyframes(s.props.z), j = /* @__PURE__ */ new Set();
    return f.forEach((c) => j.add(c.position)), u.forEach((c) => j.add(c.position)), b.forEach((c) => j.add(c.position)), Array.from(j).sort((c, d) => c - d).forEach((c) => {
      const d = (p, n) => {
        const r = p.find((S, y) => S.position <= n && (p[y + 1]?.position || 1 / 0) > n), l = p.find((S) => S.position > n);
        if (!r) return l?.value || 0;
        if (!l || r.position === n) return r.value;
        if (r.type === "bezier")
          return q(r, l, n);
        const O = (n - r.position) / (l.position - r.position);
        return r.value + O * (l.value - r.value);
      };
      a.push({
        position: c,
        x: d(f, c),
        y: d(u, c),
        z: d(b, c)
      });
    }), a;
  }
  update(e) {
  }
  unsubscribe(e) {
    if (this.project === void 0) {
      console.error("Theatre Project hasn't been created yet.");
      return;
    }
    const t = e.address.sheetId, i = e.address.objectKey;
    this.sheets.get(t)?.detachObject(i);
    const s = `${t}_${i}`, a = this.sheetObjectUnsubscribe.get(s);
    a !== void 0 && (this.sheetObjects.delete(s), this.sheetObjectCBs.delete(s), this.sheetObjectUnsubscribe.delete(s), a());
  }
  handleApp(e) {
    let t;
    switch (e.event) {
      case "setSheet":
        t = this.sheets.get(e.data.sheet), t !== void 0 ? this.studio?.setSelection([t]) : console.log(`Hermes - Can't set Sheet: ${e.data.sheet}`, t);
        break;
      case "setSheetObject":
        t = this.sheetObjects.get(`${e.data.sheet}_${e.data.key}`), t !== void 0 ? this.studio?.setSelection([t]) : console.log(`Hermes - Can't set Sheet Object: ${e.data.sheet}, ${e.data.key}: ${e.data.sheet}_${e.data.key}`, t);
        break;
      case "updateSheetObject":
        t = this.sheets.get(e.data.sheet), t !== void 0 && t.sequence.pause(), t = this.sheetObjectCBs.get(e.data.sheetObject), t !== void 0 ? t(e.data.values) : console.log(`Hermes - Can't update Sheet Object: ${e.data.sheetObject}, ${e.data.sheet}`, t);
        break;
      case "updateTimeline":
        t = this.sheets.get(e.data.sheet), t !== void 0 ? t.sequence.position = e.data.position : console.log(`Hermes - Can't update sheet position: ${e.data.sheet}, ${e.data.position}`);
        break;
    }
  }
  handleEditor(e) {
    switch (e.event) {
      case "playSheet":
        this.sheet(e.data.sheet, e.data.instance)?.sequence.play(e.data.value);
        break;
      case "pauseSheet":
        this.sheet(e.data.sheet, e.data.instance)?.sequence.pause();
        break;
    }
  }
  getSheetNames() {
    const e = [];
    return this.sheets.forEach((t, i) => {
      e.push(i);
    }), e;
  }
  handleEditorApp() {
    if (this.editor) {
      this.studio?.ui.restore(), this.studio?.onSelectionChange((h) => {
        h.length < 1 || h.forEach((s) => {
          let a = s.address.sheetId, f = "setSheet", u = {};
          switch (s.type) {
            case "Theatre_Sheet_PublicAPI":
              f = "setSheet", u = {
                sheet: s.address.sheetId
              }, this.activeSheet = this.sheets.get(s.address.sheetId);
              break;
            case "Theatre_SheetObject_PublicAPI":
              f = "setSheetObject", a += `_${s.address.objectKey}`, u = {
                id: a,
                sheet: s.address.sheetId,
                key: s.address.objectKey
              }, this.activeSheet = this.sheets.get(s.address.sheetId);
              break;
          }
          this.send({ event: f, target: "app", data: u });
        });
      });
      let e = -1;
      const t = () => {
        if (this.activeSheet !== void 0 && e !== this.activeSheet.sequence.position) {
          e = this.activeSheet.sequence.position;
          const h = this.activeSheet;
          this.send({
            event: "updateTimeline",
            target: "app",
            data: {
              position: e,
              sheet: h.address.sheetId
            }
          });
        }
      }, i = () => {
        t(), requestAnimationFrame(i);
      };
      t(), i();
    } else
      this.studio?.ui.hide();
  }
}
export {
  B as default
};
