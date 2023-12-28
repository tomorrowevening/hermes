import { Scene, WebGLRenderer } from 'three';
export default class ExampleScene {
    renderer: WebGLRenderer;
    scene: Scene;
    private camera;
    constructor();
    resize(width: number, height: number): void;
    draw(): void;
}
