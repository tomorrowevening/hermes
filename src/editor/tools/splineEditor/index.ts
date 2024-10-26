import { Camera, CatmullRomCurve3, Object3D, Vector3 } from 'three';
import Spline from './Spline';
import DebugData from '@/editor/sidePanel/DebugData';

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
  public defaultScale = 1;
  private _camera: Camera;

  constructor(camera: Camera) {
    super();
    this.name = 'SplineEditor';
    this._camera = camera;
    this.visible = false;
  }

  dispose() {
    //
  }

  createSpline = (defaultPoints: Array<Vector3> = []): Spline => {
    const name = `spline_${splinesCreated}`;
    const spline = new Spline(name, this._camera);
    spline.draggableScale = this.defaultScale;
    spline.addPoints(defaultPoints);
    spline.hideTransform();
    spline.initDebug();
    this.add(spline);
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

  createSplineFromCurve = (curve: CatmullRomCurve3): Spline => {
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

  initDebug() {
    DebugData.addEditorGroup({
      title: 'Spline Editor',
      items: [],
      onUpdate: (prop: string, value: any) => {
        console.log(prop, value);
      },
    });
    /*
    debugButton(this.debugFolder, 'New Spline', this.createSpline);
    debugInput(this.debugFolder, this, 'visible');
    debugInput(this.debugFolder, this, 'defaultScale', {
      min: 0,
      max: 50,
      step: 0.01,
    });
    debugButton(this.debugFolder, 'Show Points', () => {
      this.showPoints(true);
    });
    debugButton(this.debugFolder, 'Hide Points', () => {
      this.showPoints(false);
    });
    */
  }

  showPoints = (visible = true) => {
    this.children.forEach((child: Object3D) => {
      const spline = child as Spline;
      spline.showPoints(visible);
    });
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
