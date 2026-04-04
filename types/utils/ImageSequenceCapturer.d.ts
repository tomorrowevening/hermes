export interface ImageSequenceCapturerOptions {
    format?: 'png' | 'jpeg' | 'webp';
    quality?: number;
    prefix?: string;
    padLength?: number;
    maxQueue?: number;
    fps?: number;
    onProgress?: (captured: number, encoded: number) => void;
    onError?: (err: Error) => void;
}
export declare class ImageSequenceCapturer {
    private readonly worker;
    private readonly source;
    private readonly transfer;
    private readonly ctx;
    private readonly opts;
    private _capturing;
    private _captured;
    private _encoded;
    private _pending;
    private _lastFrameTime;
    private frames;
    constructor(canvas: HTMLCanvasElement, options?: ImageSequenceCapturerOptions);
    get isCapturing(): boolean;
    get framesCaptured(): number;
    get framesEncoded(): number;
    get isIdle(): boolean;
    resize(): void;
    start(): void;
    stop(): void;
    captureFrame(): boolean;
    flush(): Promise<void>;
    download(): Promise<void>;
    reset(): void;
    destroy(): void;
}
