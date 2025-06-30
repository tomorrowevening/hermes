import { Camera, CatmullRomCurve3, Object3D, Vector3 } from 'three';
import Spline from './Spline';
import { Application } from '@/core/Application';
export type SplineJSON = {
    name: string;
    points: Array<number[]>;
    tension: number;
    closed: boolean;
    subdivide: number;
    type: string;
};
export default class SplineEditor extends Object3D {
    defaultScale: number;
    currentSpline: Spline | null;
    private _camera;
    private group;
    private app;
    private splineDataText;
    constructor(camera: Camera, app: Application);
    initDebug(): void;
    dispose(): void;
    addSpline(spline: Spline): void;
    createSpline: (defaultPoints?: Array<Vector3>) => Spline;
    createSplineFromArray: (points: Array<number[]>) => Spline;
    createSplineFromCatmullRom: (curve: CatmullRomCurve3) => Spline;
    createSplineFromJSON: (data: SplineJSON) => Spline;
    showPoints: (visible?: boolean) => void;
    private onAddSpline;
    private isMouseDown;
    private enableClickToDraw;
    private disableClickToDraw;
    private onClickCanvas;
    private onMouseMove;
    private onMouseUp;
    private mouseToSplinePos;
    get camera(): Camera;
    set camera(value: Camera);
}
