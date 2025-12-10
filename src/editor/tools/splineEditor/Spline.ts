// Libs
import {
  BoxGeometry,
  BufferGeometry,
  Camera,
  CatmullRomCurve3,
  Color,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Raycaster,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three';
import { lerp } from 'three/src/math/MathUtils';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { RefObject } from 'react';
// Tools
import MultiView from '../../multiView/MultiView';
import Transform from '../Transform';
import InspectorGroup from '../../sidePanel/inspector/InspectorGroup';
// Utils
import { copyToClipboard } from '../../utils';
import { roundTo } from '../../../utils/math';
import { dispose } from '../../../utils/three';
import SplineEditor from '.';

export type CurveType = 'catmullrom' | 'centripetal' | 'chordal';

const draggedGeom = new BoxGeometry();
const pointer = new Vector2();

export default class Spline extends Object3D {
  curve: CatmullRomCurve3 = new CatmullRomCurve3();
  line: Line;
  draggable: Object3D;
  curvePos: Mesh;
  
  // Variables
  tension = 0.5;
  closed = false;
  subdivide = 50;
  curveType: CurveType;
  offset = 1;

  private lineMaterial: LineBasicMaterial;
  private _camera: Camera;
  private _curvePercentage = 0;
  private _draggableScale = 10;
  private _transform?: TransformControls;
  private raycaster: Raycaster;
  private draggedMat = new MeshBasicMaterial();
  private parentGroup!: InspectorGroup;
  private group!: RefObject<InspectorGroup>;

  constructor(name: string, camera: Camera) {
    const color = new Color(lerp(0.5, 1, Math.random()), lerp(0.5, 1, Math.random()), lerp(0.5, 1, Math.random()));
    super();
    this.name = name;

    this.lineMaterial = new LineBasicMaterial({ color: color });
    this.line = new Line(new BufferGeometry(), this.lineMaterial);
    this.line.name = 'line';
    this.line.visible = false;
    this.add(this.line);

    this._camera = camera;
    this.curveType = 'catmullrom';

    this.draggedMat.color = color;
    this.draggable = new Object3D();
    this.draggable.name = 'draggablePoints';
    this.add(this.draggable);

    this.curvePos = new Mesh(new SphereGeometry(1.5), new MeshBasicMaterial({ color: color }));
    this.curvePos.name = 'curvePos';
    this.curvePos.scale.setScalar(this._draggableScale);
    this.curvePos.visible = false;
    this.add(this.curvePos);

    this.raycaster = new Raycaster();
    // @ts-ignore
    this.raycaster.params.Line.threshold = 3;

    this.enable();
  }

  enable() {
    document.addEventListener('pointerdown', this.onMouseClick);
  }

  disable() {
    document.removeEventListener('pointerdown', this.onMouseClick);
  }

  dispose = () => {
    if (this._transform) {
      this._transform.removeEventListener('objectChange', this.updateSpline);
      Transform.instance.remove(this.name);
    }

    this.disable();
    this.parentGroup.removeGroup(this.name);
  };

  hideTransform = () => {
    this._transform?.detach();
  };

  exportSpline = () => {
    const pts: Array<number[]> = [];
    this.draggable.children.forEach((child: Object3D) => {
      pts.push([
        roundTo(child.position.x, 3),
        roundTo(child.position.y, 3),
        roundTo(child.position.z, 3)
      ]);
    });
    copyToClipboard({
      name: this.name,
      points: pts,
      tension: this.tension,
      closed: this.closed,
      subdivide: this.subdivide,
      type: this.curveType,
    });
    console.log('Spline copied!');
  };

  showPoints = (visible = true) => {
    this.draggable.visible = visible;
  };

  // Modifiers

  addPoints = (pts: Array<Vector3> = []) => {
    if (pts.length > 0) {
      const total = pts.length - 1;
      for (let i = 0; i < total; i++) {
        this.addPoint(pts[i], false);
      }
      this.addPoint(pts[total]);
    }
  };

  addPoint = (position: Vector3, update = true): Mesh => {
    const index = this.draggable.children.length;
    const mesh = new Mesh(draggedGeom, this.draggedMat);
    mesh.name = `point_${index}`;
    mesh.position.copy(position);
    mesh.scale.setScalar(this._draggableScale);
    this.draggable.add(mesh);
    this._transform?.attach(mesh);

    const enoughPts = this.points.length > 1;
    if (enoughPts && update) this.updateSpline();
    this.line.visible = enoughPts;
    this.updateCurrentPoint();

    return mesh;
  };

  addNextPt = () => {
    const total = this.draggable.children.length;
    const pos = total > 1 ? this.draggable.children[total - 1].position.clone() : new Vector3();
    const mesh = this.addPoint(pos);
    // this._transform?.attach(mesh);

    this.updateField(mesh.position);
  };

  removePoint = (child: Object3D) => {
    if (this._transform?.object === child) {
      this._transform?.detach();
      const nextPt = this.draggable.children[this.draggable.children.length - 1];
      this._transform?.attach(nextPt);
      this.updateField(nextPt.position);
    }
    dispose(child);
    this.updateSpline();
  };

  removePointAt = (index: number) => {
    const child = this.draggable.children[index];
    this.removePoint(child);
  };

  removeSelectedPt = () => {
    if (this._transform?.object !== undefined) this.removePoint(this._transform?.object);
  };

  updateLastPoint(value: Vector3) {
    const total = this.draggable.children.length;
    if (total > 0) {
      this.draggable.children[total - 1].position.copy(value);
      this.updateSpline();
    }
  }

  updateSpline = () => {
    if (this.points.length < 2) return;
    this.curve = new CatmullRomCurve3(this.points, this.closed, this.curveType, this.tension);
    this.line.geometry.dispose();
    this.line.geometry = new BufferGeometry().setFromPoints(this.curve.getPoints(this.subdivide));
    this.curvePos.position.copy(this.getPointAt(this._curvePercentage));
  };

  updateField(position: Vector3) {
    this.group.current?.setField('Current Point', position);
  }

  // Handlers

  private onMouseClick = (evt: MouseEvent) => {
    if (!MultiView.instance || !MultiView.instance.currentWindow) return;

    if (this._transform && !this._transform.getHelper().visible) return;

    const element = MultiView.instance.currentWindow.current as HTMLDivElement;
    const bounds = element.getBoundingClientRect();
    pointer.x = ((evt.clientX - bounds.x) / bounds.width) * 2 - 1;
    pointer.y = -((evt.clientY - bounds.y) / bounds.height) * 2 + 1;
    //
    this.raycaster.setFromCamera(pointer, this.camera!);
    const intersects = this.raycaster.intersectObjects(this.draggable.children, false);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object !== this._transform?.object) {
        this._transform?.attach(object);
        this.updateField(object.position);
      }
    }
  };

  // Getters

  getPointAt(percentage: number): Vector3 {
    if (this.curve.points.length > 1) return this.curve.getPointAt(percentage);
    if (this.curve.points.length === 1) return this.curve.points[0];
    return new Vector3();
  }

  getTangentAt(percentage: number): Vector3 {
    return this.curve.getTangentAt(percentage);
  }

  get points(): Array<Vector3> {
    const pts: Array<Vector3> = [];
    this.draggable.children.forEach((child: Object3D) => {
      pts.push(child.position);
    });
    return pts;
  }

  get total() {
    return this.draggable.children.length;
  }

  get draggableScale(): number {
    return this._draggableScale;
  }

  set draggableScale(value: number) {
    this._draggableScale = value;
    this.draggable.children.forEach((child: Object3D) => child.scale.setScalar(value));
    this.curvePos.scale.setScalar(value);
  }

  get camera(): Camera {
    return this._camera;
  }

  set camera(value: Camera) {
    this._camera = value;
    if (this._transform !== undefined) this._transform.camera = value;
  }

  get curvePercentage(): number {
    return this._curvePercentage;
  }

  set curvePercentage(value: number) {
    this._curvePercentage = value;
    this.curvePos.position.copy(this.getPointAt(value));
  }

  // Debug

  private updateCurrentPoint() {
    if (this._transform?.object && this.group) {
      const obj = this._transform?.object;
      if (obj.name.search('point') > -1) {
        this.updateField(obj.position);
      }
    }
  }

  private onUpdateTransform = () => {
    this.updateCurrentPoint();
    this.updateSpline();
  };

  initDebug(parentGroup: InspectorGroup, visible: boolean) {
    const pts = this.draggable.children;
    this.visible = visible;
    this.parentGroup = parentGroup;
    this._transform = Transform.instance.add(this.name);
    this._transform.camera = this._camera;
    this._transform.addEventListener('objectChange', this.onUpdateTransform);
    if (pts.length > 0) this._transform.attach(pts[pts.length - 1]);
    MultiView.instance?.helpersContainer.add(this._transform.getHelper());

    const currentPoint = pts.length > 0 ? pts[pts.length - 1].position : { x: 0, y: 0, z: 0 };
    this.group = parentGroup.addGroup({
      title: this.name,
      expanded: visible,
      items: [
        {
          prop: 'Closed',
          type: 'boolean',
          value: this.closed,
        },
        {
          prop: 'Visible',
          type: 'boolean',
          value: this.visible,
        },
        {
          prop: 'Show Position',
          type: 'boolean',
          value: this.curvePos.visible,
        },
        {
          prop: 'Show Points',
          type: 'boolean',
          value: this.draggable.visible,
        },
        {
          prop: 'Color',
          type: 'color',
          value: `#${this.draggedMat.color.getHexString()}`,
        },
        {
          prop: 'Curve',
          type: 'option',
          options: [
            {
              title: 'Catmullrom',
              value: 'catmullrom'
            },
            {
              title: 'Centripetal',
              value: 'centripetal'
            },
            {
              title: 'Chordal',
              value: 'chordal'
            },
          ],
        },
        {
          prop: 'Draggable Scale',
          type: 'range',
          min: 0.01,
          max: 100,
          step: 0.01,
          value: this._draggableScale,
        },
        {
          prop: 'Subdivide',
          type: 'range',
          min: 1,
          max: 1000,
          step: 1,
          value: this.subdivide,
        },
        {
          prop: 'Tension',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.01,
          value: this.tension,
        },
        {
          prop: 'New Pt Offset',
          type: 'range',
          min: 0,
          max: 10,
          value: this.offset,
        },
        {
          prop: 'Curve At',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.01,
          value: 0,
        },
        {
          prop: 'Toggle Transform',
          type: 'button',
        },
        {
          prop: 'Add Point',
          type: 'button',
        },
        {
          prop: 'Remove Point',
          type: 'button',
        },
        {
          prop: 'Export',
          type: 'button',
        },
        {
          prop: 'Delete',
          type: 'button',
        },
        {
          prop: 'Current Point',
          type: 'grid3',
          value: currentPoint,
        },
      ],
      onUpdate: (prop: string, value: any) => {
        switch (prop) {
          case 'Closed':
            this.closed = value;
            this.updateSpline();
            break;
          case 'Visible':
            this.visible = value;
            break;
          case 'Color':
            this.lineMaterial.color.setStyle(value);
            this.draggedMat.color.setStyle(value);
            break;
          case 'Curve':
            this.curveType = value;
            this.updateSpline();
            break;
          case 'Draggable Scale':
            this.draggableScale = value;
            break;
          case 'Subdivide':
            this.subdivide = value;
            this.updateSpline();
            break;
          case 'Tension':
            this.tension = value;
            this.updateSpline();
            break;
          case 'New Pt Offset':
            this.offset = value;
            break;
          case 'Curve At':
            this.curvePos.position.copy(this.getPointAt(value));
            break;
          case 'Show Position':
            this.curvePos.visible = value;
            break;
          case 'Show Points':
            this.draggable.visible = value;
            break;
          case 'Toggle Transform':
            if (this._transform) {
              this._transform.getHelper().visible = !this._transform.getHelper().visible;
            }
            break;
          case 'Add Point':
            this.addNextPt();
            break;
          case 'Remove Point':
            this.removeSelectedPt();
            break;
          case 'Export':
            this.exportSpline();
            break;
          case 'Delete':
            (this.parent as SplineEditor).currentSpline = null;
            dispose(this);
            break;
          case 'Current Point':
            if (this.group.current && this._transform?.object) {
              const obj = this._transform?.object;
              if (obj.name.search('point') > -1) {
                obj.position.copy(value);
                this.updateSpline();
              }
            }
            break;
        }
      },
    });

    // debug points that exist
    this.draggable.children.forEach((obj: Object3D) => {
      this.debugPoint(obj as Mesh);
    });
  }

  private debugPoint = (mesh: Mesh) => {
    const name = mesh.name;
    // if (this.inputs.get(name) !== undefined) return;
    mesh.visible = this.draggable.visible;

    /*
    this.inputs.set(
      name,
      debugInput(this.pointsFolder, mesh, 'position', {
        label: name,
        onChange: () => {
          this.updateSpline();
        },
      }),
    );
    */
  };
}
