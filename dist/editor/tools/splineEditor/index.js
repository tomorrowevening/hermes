import { Object3D as M, Vector3 as m, Raycaster as P, Vector2 as x } from "three";
import w from "./Spline.js";
import D from "../../sidePanel/DebugData.js";
import g from "../../multiView/MultiView.js";
import { ToolEvents as C } from "../../../core/remote/RemoteThree.js";
let S = 0;
class N extends M {
  defaultScale = 10;
  currentSpline = null;
  _camera;
  group = null;
  three;
  splineDataText = "";
  constructor(e, t) {
    super(), this.name = "Spline Editor", this._camera = e, this.three = t, this.three.addEventListener(C.ADD_SPLINE, this.onAddSpline);
  }
  initDebug() {
    this.group = D.addEditorGroup({
      title: this.name,
      items: [
        {
          type: "field",
          prop: "Spline Data",
          value: "",
          disabled: !1
        },
        {
          type: "button",
          prop: "Import Spline"
        },
        {
          type: "button",
          prop: "New Spline"
        },
        {
          type: "boolean",
          prop: "Show Points",
          value: !0
        },
        {
          type: "boolean",
          prop: "Draw Mode",
          value: !1
        },
        {
          type: "boolean",
          prop: "Visible",
          value: this.visible
        },
        {
          type: "range",
          prop: "Default Scale",
          min: 0,
          max: 50,
          step: 0.01,
          value: this.defaultScale
        }
      ],
      onUpdate: (e, t) => {
        switch (e) {
          case "New Spline":
            this.createSpline();
            break;
          case "Spline Data":
            this.splineDataText = t;
            break;
          case "Import Spline":
            this.createSplineFromJSON(JSON.parse(this.splineDataText));
            break;
          case "Show Points":
            this.showPoints(t);
            break;
          case "Visible":
            this.visible = t;
            break;
          case "Default Scale":
            this.defaultScale = t;
            break;
          case "Draw Mode":
            t ? this.enableClickToDraw() : this.disableClickToDraw();
            break;
        }
      }
    });
  }
  dispose() {
    this.three.removeEventListener(C.ADD_SPLINE, this.onAddSpline), D.removeEditorGroup(this.name);
  }
  addSpline(e, t) {
    e.draggableScale = this.defaultScale, e.hideTransform(), this.group?.current !== null && e.initDebug(this.group.current, t), this.add(e), this.currentSpline = e;
  }
  createSpline = (e = []) => {
    const t = `Spline ${S + 1}`, i = new w(t, this._camera);
    return i.addPoints(e), this.addSpline(i, !0), S++, i;
  };
  createSplineFromArray = (e) => {
    const t = [];
    return e.forEach((i) => {
      t.push(new m(i[0], i[1], i[2]));
    }), this.createSpline(t);
  };
  createSplineFromCatmullRom = (e) => this.createSpline(e.points);
  createSplineFromJSON = (e) => {
    const t = [];
    e.points.forEach((n) => {
      t.push(new m(n[0], n[1], n[2]));
    });
    const i = new w(e.name, this._camera);
    return i.closed = e.closed, i.subdivide = e.subdivide, i.tension = e.tension, i.type = e.type, i.addPoints(t), i.updateSpline(), this.addSpline(i, !1), i;
  };
  showPoints = (e = !0) => {
    this.children.forEach((t) => {
      t.showPoints(e);
    });
  };
  onAddSpline = (e) => {
    const t = JSON.parse(e.value), i = t.name !== void 0 ? t.name : `Spline ${S + 1}`, n = new w(i, this.camera);
    t.tension !== void 0 && (n.tension = t.tension), t.closed !== void 0 && (n.closed = t.closed), t.subdivide !== void 0 && (n.subdivide = t.subdivide), t.type !== void 0 && (n.curveType = t.type);
    const s = [];
    t.points.forEach((r) => {
      s.push(new m(r[0], r[1], r[2]));
    }), n.addPoints(s), this.addSpline(n, !1), S++;
  };
  isMouseDown = !1;
  enableClickToDraw() {
    document.querySelectorAll(".clickable").forEach((e) => {
      e.addEventListener("mousedown", this.onClickCanvas), e.addEventListener("mousemove", this.onMouseMove), e.addEventListener("mouseup", this.onMouseUp);
    });
  }
  disableClickToDraw() {
    document.querySelectorAll(".clickable").forEach((e) => {
      e.removeEventListener("mousedown", this.onClickCanvas), e.removeEventListener("mousemove", this.onMouseMove), e.removeEventListener("mouseup", this.onMouseUp);
    });
  }
  onClickCanvas = (e) => {
    if (e.button !== 0) return;
    if (this._camera.type !== "OrthographicCamera") {
      console.warn("Spline Editor - 3D Camera not supported in Draw Mode");
      return;
    }
    const i = e.target.getBoundingClientRect(), n = (e.clientX - i.left) / i.width * 2 - 1, s = -((e.clientY - i.top) / i.height) * 2 + 1;
    if (g.instance) {
      const o = new P();
      o.setFromCamera(new x(n, s), this._camera);
      const c = o.intersectObjects(g.instance.helpersContainer.children, !0);
      for (let l = 0; l < c.length; l++) {
        const a = c[l];
        if (!(a.object.isLine || a.object.isTransformControlsPlane) && a.object.isObject3D)
          return;
      }
    }
    this.currentSpline === null && (this.currentSpline = this.createSpline());
    const r = this.mouseToSplinePos(n, s, i.width, i.height);
    this.currentSpline?.addPoint(r), this.isMouseDown = !0;
  };
  onMouseMove = (e) => {
    if (!this.isMouseDown) return;
    const i = e.target.getBoundingClientRect(), n = (e.clientX - i.left) / i.width * 2 - 1, s = -((e.clientY - i.top) / i.height) * 2 + 1, r = this.mouseToSplinePos(n, s, i.width, i.height);
    this.currentSpline?.updateLastPoint(r), this.currentSpline?.updateField(r);
  };
  onMouseUp = () => {
    this.isMouseDown = !1;
  };
  mouseToSplinePos(e, t, i, n) {
    const s = new m(), r = Math.PI / 2, o = this._camera, c = o.zoom, l = o.rotation.x === -6123233995736766e-32 && o.rotation.y === 0 && o.rotation.z === 0, a = o.rotation.x === -Math.PI && o.rotation.y === 12246467991473532e-32 && o.rotation.z === Math.PI, E = o.rotation.x === -6162975822039155e-48 && o.rotation.y === -r && o.rotation.z === 0, v = o.rotation.x === -6162975822039155e-48 && o.rotation.y === r && o.rotation.z === 0, y = o.rotation.x === -1.5707953264174506 && o.rotation.y === 0 && o.rotation.z === 0, k = o.rotation.x === 1.5707953264174506 && o.rotation.y === 0 && o.rotation.z === 0;
    let p = e, d = t;
    a || v ? p *= -1 : y && (d *= -1);
    const f = i / 2 / c, b = n / 2 / c;
    if (this.currentSpline === null && (this.currentSpline = this.createSpline()), l || a) {
      const h = p * f + o.position.x, u = d * b + o.position.y;
      s.set(h, u, 0);
    } else if (E || v) {
      const h = p * f + o.position.z, u = d * b + o.position.y;
      s.set(0, u, h);
    } else if (y || k) {
      const h = p * f + o.position.x, u = d * b + o.position.z;
      s.set(h, 0, u);
    }
    return s;
  }
  get camera() {
    return this._camera;
  }
  set camera(e) {
    this._camera = e, this.children.forEach((t) => {
      const i = t;
      i.camera = e;
    });
  }
}
export {
  N as default
};
