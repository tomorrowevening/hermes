import { AnimationMixer, Object3D } from "three";
export default class FBXAnimation extends Object3D {
    mixer?: AnimationMixer;
    constructor(source: string);
    update(delta: number): void;
}
