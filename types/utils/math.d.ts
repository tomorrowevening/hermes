export declare function clamp(min: number, max: number, value: number): number;
export declare function normalize(min: number, max: number, value: number): number;
export declare function mix(min: number, max: number, value: number): number;
export declare function map(min1: number, max1: number, min2: number, max2: number, value: number): number;
export declare function distance(x: number, y: number): number;
export declare function round(value: number, precision?: number): number;
export declare function damp(start: number, end: number, easing: number, dt: number): number;
export declare function roundTo(value: number, digits?: number): number;
export declare function cubicBezier(percent: number, x0: number, y0: number, x1: number, y1: number): number;
