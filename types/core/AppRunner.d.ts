import { AppSettings } from '../utils/detectSettings';
export default class AppRunner {
    canvas: HTMLCanvasElement;
    inputElement: any;
    settings: AppSettings;
    protected playing: boolean;
    protected rafID: number;
    constructor(canvas: HTMLCanvasElement, inputElement: any, settings: AppSettings);
    dispose(): void;
    play(): void;
    stop(): void;
    update(): void;
    draw(): void;
    resize(width: number, height: number): void;
    protected onResize: (evt: any) => void;
    protected onUpdate: () => void;
}
