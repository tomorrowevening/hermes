import { PerspectiveCamera, Scene } from 'three';
export default class ExampleScene extends Scene {
    camera: PerspectiveCamera;
    private customMat;
    private lastUpdate;
    constructor();
    private createCameras;
    private createLights;
    private createWorld;
    resize(width: number, height: number): void;
    onBeforeRender(): void;
}
