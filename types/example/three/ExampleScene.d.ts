import { Scene, WebGLRenderer } from 'three';
export default class ExampleScene {
    renderer: WebGLRenderer;
    scene: Scene;
    private camera;
    private customMat;
    private lastUpdate;
    constructor();
    resize(width: number, height: number): void;
    draw(): void;
}
