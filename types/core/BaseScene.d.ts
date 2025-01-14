import { Clock, Group, Scene, WebGLRenderTarget } from 'three';
export default class BaseScene extends Scene {
    clock: Clock;
    protected cameras: Group;
    protected lights: Group;
    protected world: Group;
    constructor(name: string);
    init(): Promise<void>;
    protected setupLights(): Promise<void>;
    protected setupCameras(): Promise<void>;
    protected setupWorld(): Promise<void>;
    protected setupPost(): Promise<void>;
    protected setupAnimation(): Promise<void>;
    protected setupDebug(): Promise<void>;
    dispose(): void;
    update(): void;
    draw(renderTarget: WebGLRenderTarget | null): void;
    postDraw(): void;
    resize(width: number, height: number, updateStyle: boolean): void;
    show(): void;
    protected showComplete(): void;
    hide(): void;
    protected hideComplete(): void;
    protected enable(): void;
    protected disable(): void;
    get deltaTime(): number;
}
