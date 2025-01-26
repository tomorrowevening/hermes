export declare enum QualityType {
    'High' = 0,
    'Medium' = 1,
    'Low' = 2
}
export type AppSettings = {
    dpr: number;
    fps: number;
    width: number;
    height: number;
    mobile: boolean;
    supportOffScreenCanvas: boolean;
    quality: QualityType;
};
export declare function detectMaxFrameRate(callback: (fps: number) => void): void;
export declare function detectSettings(canvas: HTMLCanvasElement): Promise<AppSettings>;
