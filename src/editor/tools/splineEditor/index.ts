import { Camera, CatmullRomCurve3, Object3D, Vector3 } from 'three';
import { RefObject } from 'react';
import Spline from './Spline';
import { Application, ToolEvents } from '@/core/Application';
import DebugData from '@/editor/sidePanel/DebugData';
import InspectorGroup from '@/editor/sidePanel/inspector/InspectorGroup';

let splinesCreated = 0;

export type SplineJSON = {
  name: string
  points: Array<number[]>
  tension: number
  closed: boolean
  subdivide: number
  type: string
}

export default class SplineEditor extends Object3D {
  public defaultScale = 10;
  private _camera: Camera;
  private group: RefObject<InspectorGroup> | null = null;
  private app: Application;

  constructor(camera: Camera, app: Application) {
    super();
    this.name = 'Spline Editor';
    this._camera = camera;
    this.app = app;
    this.app.addEventListener(ToolEvents.ADD_SPLINE, this.onAddSpline);
  }

  initDebug() {
    this.group = DebugData.addEditorGroup({
      title: this.name,
      items: [
        {
          type: 'button',
          prop: 'New Spline',
        },
        {
          type: 'boolean',
          prop: 'Show Points',
          value: true,
        },
        {
          type: 'boolean',
          prop: 'Visible',
          value: this.visible,
        },
        {
          type: 'range',
          prop: 'Default Scale',
          min: 0,
          max: 50,
          step: 0.01,
          value: this.defaultScale,
        },
      ],
      onUpdate: (prop: string, value: any) => {
        switch (prop) {
          case 'New Spline':
            this.createSpline();
            break;
          case 'Show Points':
            this.showPoints(value);
            break;
          case 'Visible':
            this.visible = value;
            break;
          case 'Default Scale':
            this.defaultScale = value;
            break;
        }
      },
    });
  }

  dispose() {
    this.app.removeEventListener(ToolEvents.ADD_SPLINE, this.onAddSpline);
    DebugData.removeEditorGroup(this.name);
  }

  addSpline(spline: Spline) {
    spline.draggableScale = this.defaultScale;
    spline.hideTransform();
    if (this.group?.current !== null) spline.initDebug(this.group!.current);
    this.add(spline);
  }

  createSpline = (defaultPoints: Array<Vector3> = []): Spline => {
    const name = `Spline ${splinesCreated + 1}`;
    const spline = new Spline(name, this._camera);
    spline.addPoints(defaultPoints);
    this.addSpline(spline);
    splinesCreated++;
    return spline;
  };

  createSplineFromArray = (points: Array<number[]>): Spline => {
    const vectors: Array<Vector3> = [];
    points.forEach((pos: number[]) => {
      vectors.push(new Vector3(pos[0], pos[1], pos[2]));
    });
    return this.createSpline(vectors);
  };

  createSplineFromCatmullRom = (curve: CatmullRomCurve3): Spline => {
    return this.createSpline(curve.points);
  };

  createSplineFromJSON = (data: SplineJSON): Spline => {
    const spline = this.createSplineFromArray(data.points);
    spline.name = data.name;
    spline.closed = data.closed;
    spline.subdivide = data.subdivide;
    spline.tension = data.tension;
    // @ts-ignore
    spline.type = data.type;
    spline.updateSpline();
    return spline;
  };

  showPoints = (visible = true) => {
    this.children.forEach((child: Object3D) => {
      const spline = child as Spline;
      spline.showPoints(visible);
    });
  };

  private onAddSpline = (evt: any) => {
    const data = JSON.parse(evt.value);
    const name = `Spline ${splinesCreated + 1}`;
    const pts: Vector3[] = [];
    data.points.forEach((pt: number[]) => {
      pts.push(new Vector3(pt[0], pt[1], pt[2]));
    });
    const spline = new Spline(name, this.camera);
    spline.addPoints(pts);
    this.addSpline(spline);
    splinesCreated++;
  };

  get camera(): Camera {
    return this._camera;
  }

  set camera(value: Camera) {
    this._camera = value;
    this.children.forEach((spline: Object3D) => {
      const _spline = spline as Spline;
      _spline.camera = value;
    });
  }
}
