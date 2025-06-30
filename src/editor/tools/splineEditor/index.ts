import { Camera, CatmullRomCurve3, CircleGeometry, Mesh, MeshBasicMaterial, MeshNormalMaterial, Object3D, OrthographicCamera, Raycaster, SphereGeometry, Vector2, Vector3 } from 'three';
import { RefObject } from 'react';
import Spline from './Spline';
import { Application, ToolEvents } from '@/core/Application';
import DebugData from '@/editor/sidePanel/DebugData';
import InspectorGroup from '@/editor/sidePanel/inspector/InspectorGroup';
import MultiView from '@/editor/multiView/MultiView';

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
  currentSpline: Spline | null = null;
  private _camera: Camera;
  private group: RefObject<InspectorGroup> | null = null;
  private app: Application;
  private splineDataText = '';

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
          type: 'field',
          prop: 'Spline Data',
          value: '',
          disabled: false,
        },
        {
          type: 'button',
          prop: 'Import Spline',
        },
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
          prop: 'Draw Mode',
          value: false,
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
          case 'Spline Data':
            this.splineDataText = value;
            break;
          case 'Import Spline':
            this.createSplineFromJSON(JSON.parse(this.splineDataText));
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
          case 'Draw Mode':
            value ? this.enableClickToDraw() : this.disableClickToDraw();
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
    this.currentSpline = spline;
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
    const vectors: Array<Vector3> = [];
    data.points.forEach((pos: number[]) => {
      vectors.push(new Vector3(pos[0], pos[1], pos[2]));
    });

    const spline = new Spline(data.name, this._camera);
    spline.closed = data.closed;
    spline.subdivide = data.subdivide;
    spline.tension = data.tension;
    // @ts-ignore
    spline.type = data.type;
    spline.addPoints(vectors);
    spline.updateSpline();
    this.addSpline(spline);
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

  private isMouseDown = false;

  private enableClickToDraw() {
    document.querySelectorAll('.clickable').forEach((element) => {
      (element as HTMLDivElement).addEventListener('mousedown', this.onClickCanvas);
      (element as HTMLDivElement).addEventListener('mousemove', this.onMouseMove);
      (element as HTMLDivElement).addEventListener('mouseup', this.onMouseUp);
    });
  }

  private disableClickToDraw() {
    document.querySelectorAll('.clickable').forEach((element) => {
      (element as HTMLDivElement).removeEventListener('mousedown', this.onClickCanvas);
      (element as HTMLDivElement).removeEventListener('mousemove', this.onMouseMove);
      (element as HTMLDivElement).removeEventListener('mouseup', this.onMouseUp);
    });
  }

  private onClickCanvas = (event: MouseEvent) => {
    if (event.button !== 0) return;
    if (this._camera.type !== 'OrthographicCamera') {
      console.warn('Spline Editor - 3D Camera not supported in Draw Mode');
      return;
    }

    const clickable = event.target as HTMLDivElement;
    const rect = clickable.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Ensure we don't collide with the Transform tools:
    if (MultiView.instance) {
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(x, y), this._camera);
      const intersects = raycaster.intersectObjects(MultiView.instance.helpersContainer.children, true);
      for (let i = 0; i < intersects.length; i++) {
        const intersect = intersects[i];
        // @ts-ignore
        if (intersect.object.isLine || intersect.object.isTransformControlsPlane) {
          continue;
        } else {
          // @ts-ignore
          if (intersect.object.isObject3D) return;
        }
      }
    }
    
    // Not add to Spline
    if (this.currentSpline === null) this.currentSpline = this.createSpline();

    // Add point
    const pos = this.mouseToSplinePos(x, y, rect.width, rect.height);
    this.currentSpline?.addPoint(pos);
    this.isMouseDown = true;
  };

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isMouseDown) return;

    // Move dragged item
    const clickable = event.target as HTMLDivElement;
    const rect = clickable.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const pos = this.mouseToSplinePos(x, y, rect.width, rect.height);
    this.currentSpline?.updateLastPoint(pos);
  };

  private onMouseUp = () => {
    this.isMouseDown = false;
  };

  private mouseToSplinePos(normX: number, normY: number, elementWidth: number, elementHeight: number): Vector3 {
    const pos = new Vector3();
    const HALF_PI = Math.PI / 2;
    const ortho = this._camera as OrthographicCamera;
    const zoom = ortho.zoom;
    const frontCamera = ortho.rotation.x === -6.123233995736766e-17 && ortho.rotation.y === 0 && ortho.rotation.z === 0;
    const backCamera = ortho.rotation.x === -Math.PI && ortho.rotation.y === 1.2246467991473532e-16 && ortho.rotation.z === Math.PI;
    const leftCamera = ortho.rotation.x === -6.162975822039155e-33 && ortho.rotation.y === -HALF_PI && ortho.rotation.z === 0;
    const rightCamera = ortho.rotation.x === -6.162975822039155e-33 && ortho.rotation.y === HALF_PI && ortho.rotation.z === 0;
    const topCamera = ortho.rotation.x === -1.5707953264174506 && ortho.rotation.y === 0 && ortho.rotation.z === 0;
    const bottomCamera = ortho.rotation.x === 1.5707953264174506 && ortho.rotation.y === 0 && ortho.rotation.z === 0;
    
    // Invert coordinates if-needed
    let x = normX;
    let y = normY;
    if (backCamera) {
      x *= -1;
    } else if (rightCamera) {
      x *= -1;
    } else if (topCamera) {
      y *= -1;
    }

    const width = elementWidth / 2 / zoom;
    const height = elementHeight / 2 / zoom;
    
    // Not add to Spline
    if (this.currentSpline === null) this.currentSpline = this.createSpline();
    if (frontCamera || backCamera) {
      const posX = x * width + ortho.position.x;
      const posY = y * height + ortho.position.y;
      pos.set(posX, posY, 0);
    } else if (leftCamera || rightCamera) {
      const posZ = x * width + ortho.position.z;
      const posY = y * height + ortho.position.y;
      pos.set(0, posY, posZ);
    } else if (topCamera || bottomCamera) {
      const posX = x * width + ortho.position.x;
      const posZ = y * height + ortho.position.z;
      pos.set(posX, 0, posZ);
    }

    return pos;
  }

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
