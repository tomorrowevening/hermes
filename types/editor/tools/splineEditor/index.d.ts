import { Camera, CatmullRomCurve3, Object3D, Vector3 } from 'three';
import Spline from './Spline';
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
    private _camera;
    private group;
    constructor(camera: Camera);
    initDebug(): void;
    dispose(): void;
    addSpline(spline: Spline): void;
    createSpline: (defaultPoints?: Array<Vector3>) => Spline;
    createSplineFromArray: (points: Array<number[]>) => Spline;
    createSplineFromCatmullRom: (curve: CatmullRomCurve3) => Spline;
    createSplineFromJSON: (data: SplineJSON) => Spline;
    showPoints: (visible?: boolean) => void;
    private onAddSpline;
    get camera(): Camera;
    set camera(value: Camera);
}
