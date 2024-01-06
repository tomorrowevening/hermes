import { PerspectiveCamera, Scene } from 'three';
export default class ExampleScene extends Scene {
    camera: PerspectiveCamera;
    private customMat;
    private lastUpdate;
    constructor();
    resize(width: number, height: number): void;
    onBeforeRender(): void;
}
