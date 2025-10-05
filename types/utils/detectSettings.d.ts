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
    supportWebGPU: boolean;
    quality: QualityType;
    dev: boolean;
    editor: boolean;
};
export declare function detectMaxFrameRate(callback: (fps: number) => void): void;
export declare function detectSettings(dev?: boolean, editor?: boolean): Promise<AppSettings>;
