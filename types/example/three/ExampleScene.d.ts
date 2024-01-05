import { PerspectiveCamera, Scene } from 'three';
export default class ExampleScene {
    scene: Scene;
    camera: PerspectiveCamera;
    private customMat;
    private lastUpdate;
    constructor();
    resize(width: number, height: number): void;
    update(): void;
}
