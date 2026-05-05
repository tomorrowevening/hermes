import { Object3D as d, CatmullRomCurve3 as p, MeshBasicMaterial as g, Color as P, LineBasicMaterial as y, Line as _, BufferGeometry as u, Mesh as m, SphereGeometry as S, Raycaster as w, BoxGeometry as C, Vector3 as b, Vector2 as x } from "three/webgpu";
import { lerp as a } from "three/src/math/MathUtils.js";
import o from "../../multiView/MultiView.js";
import f from "../Transform.js";
import { copyToClipboard as k } from "../../utils.js";
import { roundTo as h } from "../../../utils/math.js";
import { dispose as v } from "../../../utils/three.js";
const M = new C(), l = new x();
class B extends d {
  curve = new p();
  line;
  draggable;
  curvePos;
  // Variables
  tension = 0.5;
  closed = !1;
  subdivide = 50;
  curveType;
  offset = 1;
  lineMaterial;
  _camera;
  _curvePercentage = 0;
  _draggableScale = 10;
  _transform;
  raycaster;
  draggedMat = new g();
  parentGroup;
  group;
  constructor(e, t) {
    const i = new P(a(0.5, 1, Math.random()), a(0.5, 1, Math.random()), a(0.5, 1, Math.random()));
    super(), this.name = e, this.lineMaterial = new y({ color: i }), this.line = new _(new u(), this.lineMaterial), this.line.name = "line", this.line.visible = !1, this.add(this.line), this._camera = t, this.curveType = "catmullrom", this.draggedMat.color = i, this.draggable = new d(), this.draggable.name = "draggablePoints", this.add(this.draggable), this.curvePos = new m(new S(1.5), new g({ color: i })), this.curvePos.name = "curvePos", this.curvePos.scale.setScalar(this._draggableScale), this.curvePos.visible = !1, this.add(this.curvePos), this.raycaster = new w(), this.raycaster.params.Line.threshold = 3, this.enable();
  }
  enable() {
    document.addEventListener("pointerdown", this.onMouseClick);
  }
  disable() {
    document.removeEventListener("pointerdown", this.onMouseClick);
  }
  dispose = () => {
    this._transform && (this._transform.removeEventListener("objectChange", this.updateSpline), f.instance.remove(this.name)), this.disable(), this.parentGroup.removeGroup(this.name);
  };
  hideTransform = () => {
    this._transform?.detach();
  };
  exportSpline = () => {
    const e = [];
    this.draggable.children.forEach((t) => {
      e.push([
        h(t.position.x, 3),
        h(t.position.y, 3),
        h(t.position.z, 3)
      ]);
    }), k({
      name: this.name,
      points: e,
      tension: this.tension,
      closed: this.closed,
      subdivide: this.subdivide,
      type: this.curveType
    }), console.log("Spline copied!");
  };
  showPoints = (e = !0) => {
    this.draggable.visible = e;
  };
  // Modifiers
  addPoints = (e = []) => {
    if (e.length > 0) {
      const t = e.length - 1;
      for (let i = 0; i < t; i++)
        this.addPoint(e[i], !1);
      this.addPoint(e[t]);
    }
  };
  addPoint = (e, t = !0) => {
    const i = this.draggable.children.length, r = new m(M, this.draggedMat);
    r.name = `point_${i}`, r.position.copy(e), r.scale.setScalar(this._draggableScale), this.draggable.add(r), this._transform?.attach(r);
    const n = this.points.length > 1;
    return n && t && this.updateSpline(), this.line.visible = n, this.updateCurrentPoint(), r;
  };
  addNextPt = () => {
    const e = this.draggable.children.length, t = e > 1 ? this.draggable.children[e - 1].position.clone() : new b(), i = this.addPoint(t);
    this.updateField(i.position);
  };
  removePoint = (e) => {
    if (this._transform?.object === e) {
      this._transform?.detach();
      const t = this.draggable.children[this.draggable.children.length - 1];
      this._transform?.attach(t), this.updateField(t.position);
    }
    v(e), this.updateSpline();
  };
  removePointAt = (e) => {
    const t = this.draggable.children[e];
    this.removePoint(t);
  };
  removeSelectedPt = () => {
    this._transform?.object !== void 0 && this.removePoint(this._transform?.object);
  };
  updateLastPoint(e) {
    const t = this.draggable.children.length;
    t > 0 && (this.draggable.children[t - 1].position.copy(e), this.updateSpline());
  }
  updateSpline = () => {
    this.points.length < 2 || (this.curve = new p(this.points, this.closed, this.curveType, this.tension), this.line.geometry.dispose(), this.line.geometry = new u().setFromPoints(this.curve.getPoints(this.subdivide)), this.curvePos.position.copy(this.getPointAt(this._curvePercentage)));
  };
  updateField(e) {
    this.group.current?.setField("Current Point", e);
  }
  // Handlers
  onMouseClick = (e) => {
    if (!o.instance || !o.instance.currentWindow || this._transform && !this._transform.getHelper().visible) return;
    const i = o.instance.currentWindow.current.getBoundingClientRect();
    l.x = (e.clientX - i.x) / i.width * 2 - 1, l.y = -((e.clientY - i.y) / i.height) * 2 + 1, this.raycaster.setFromCamera(l, this.camera);
    const r = this.raycaster.intersectObjects(this.draggable.children, !1);
    if (r.length > 0) {
      const n = r[0].object;
      n !== this._transform?.object && (this._transform?.attach(n), this.updateField(n.position));
    }
  };
  // Getters
  getPointAt(e) {
    return this.curve.points.length > 1 ? this.curve.getPointAt(e) : this.curve.points.length === 1 ? this.curve.points[0] : new b();
  }
  getTangentAt(e) {
    return this.curve.getTangentAt(e);
  }
  get points() {
    const e = [];
    return this.draggable.children.forEach((t) => {
      e.push(t.position);
    }), e;
  }
  get total() {
    return this.draggable.children.length;
  }
  get draggableScale() {
    return this._draggableScale;
  }
  set draggableScale(e) {
    this._draggableScale = e, this.draggable.children.forEach((t) => t.scale.setScalar(e)), this.curvePos.scale.setScalar(e);
  }
  get camera() {
    return this._camera;
  }
  set camera(e) {
    this._camera = e, this._transform !== void 0 && (this._transform.camera = e);
  }
  get curvePercentage() {
    return this._curvePercentage;
  }
  set curvePercentage(e) {
    this._curvePercentage = e, this.curvePos.position.copy(this.getPointAt(e));
  }
  // Debug
  updateCurrentPoint() {
    if (this._transform?.object && this.group) {
      const e = this._transform?.object;
      e.name.search("point") > -1 && this.updateField(e.position);
    }
  }
  onUpdateTransform = () => {
    this.updateCurrentPoint(), this.updateSpline();
  };
  initDebug(e, t) {
    const i = this.draggable.children;
    this.visible = t, this.parentGroup = e, this._transform = f.instance.add(this.name), this._transform.camera = this._camera, this._transform.addEventListener("objectChange", this.onUpdateTransform), i.length > 0 && this._transform.attach(i[i.length - 1]), o.instance?.helpersContainer.add(this._transform.getHelper());
    const r = i.length > 0 ? i[i.length - 1].position : { x: 0, y: 0, z: 0 };
    this.group = e.addGroup({
      title: this.name,
      expanded: t,
      items: [
        {
          prop: "Closed",
          type: "boolean",
          value: this.closed
        },
        {
          prop: "Visible",
          type: "boolean",
          value: this.visible
        },
        {
          prop: "Show Position",
          type: "boolean",
          value: this.curvePos.visible
        },
        {
          prop: "Show Points",
          type: "boolean",
          value: this.draggable.visible
        },
        {
          prop: "Color",
          type: "color",
          value: `#${this.draggedMat.color.getHexString()}`
        },
        {
          prop: "Curve",
          type: "option",
          options: [
            {
              title: "Catmullrom",
              value: "catmullrom"
            },
            {
              title: "Centripetal",
              value: "centripetal"
            },
            {
              title: "Chordal",
              value: "chordal"
            }
          ]
        },
        {
          prop: "Draggable Scale",
          type: "range",
          min: 0.01,
          max: 100,
          step: 0.01,
          value: this._draggableScale
        },
        {
          prop: "Subdivide",
          type: "range",
          min: 1,
          max: 1e3,
          step: 1,
          value: this.subdivide
        },
        {
          prop: "Tension",
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: this.tension
        },
        {
          prop: "New Pt Offset",
          type: "range",
          min: 0,
          max: 10,
          value: this.offset
        },
        {
          prop: "Curve At",
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: 0
        },
        {
          prop: "Toggle Transform",
          type: "button"
        },
        {
          prop: "Add Point",
          type: "button"
        },
        {
          prop: "Remove Point",
          type: "button"
        },
        {
          prop: "Export",
          type: "button"
        },
        {
          prop: "Delete",
          type: "button"
        },
        {
          prop: "Current Point",
          type: "grid3",
          value: r
        }
      ],
      onUpdate: (n, s) => {
        switch (n) {
          case "Closed":
            this.closed = s, this.updateSpline();
            break;
          case "Visible":
            this.visible = s;
            break;
          case "Color":
            this.lineMaterial.color.setStyle(s), this.draggedMat.color.setStyle(s);
            break;
          case "Curve":
            this.curveType = s, this.updateSpline();
            break;
          case "Draggable Scale":
            this.draggableScale = s;
            break;
          case "Subdivide":
            this.subdivide = s, this.updateSpline();
            break;
          case "Tension":
            this.tension = s, this.updateSpline();
            break;
          case "New Pt Offset":
            this.offset = s;
            break;
          case "Curve At":
            this.curvePos.position.copy(this.getPointAt(s));
            break;
          case "Show Position":
            this.curvePos.visible = s;
            break;
          case "Show Points":
            this.draggable.visible = s;
            break;
          case "Toggle Transform":
            this._transform && (this._transform.getHelper().visible = !this._transform.getHelper().visible);
            break;
          case "Add Point":
            this.addNextPt();
            break;
          case "Remove Point":
            this.removeSelectedPt();
            break;
          case "Export":
            this.exportSpline();
            break;
          case "Delete":
            this.parent.currentSpline = null, v(this);
            break;
          case "Current Point":
            if (this.group.current && this._transform?.object) {
              const c = this._transform?.object;
              c.name.search("point") > -1 && (c.position.copy(s), this.updateSpline());
            }
            break;
        }
      }
    }), this.draggable.children.forEach((n) => {
      this.debugPoint(n);
    });
  }
  debugPoint = (e) => {
    e.name, e.visible = this.draggable.visible;
  };
}
export {
  B as default
};
