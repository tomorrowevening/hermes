export function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalize(min: number, max: number, value: number) {
  return (value - min) / (max - min);
}

export function mix(min: number, max: number, value: number) {
  return min * (1 - value) + max * value;
}

export function map(min1: number, max1: number, min2: number, max2: number, value: number) {
  return mix(min2, max2, normalize(min1, max1, value));
}

export function distance(x: number, y: number): number {
  const d = x - y;
  return Math.sqrt(d * d);
}

export function round(value: number, precision: number = 1): number {
  return Number(value.toFixed(precision));
}

export function damp(start: number, end: number, easing: number, dt: number) {
  return mix(start, end, 1 - Math.exp(-easing * dt));
}

export function roundTo(value: number, digits = 1): number {
  return Number(value.toFixed(digits));
}

// Bezier

function isLinear(x0: number, y0: number, x1: number, y1: number): boolean {
  return x0 === y0 && x1 === y1;
}

function slopeFromT(t: number, A: number, B: number, C: number): number {
  return 1.0 / (3.0 * A * t * t + 2.0 * B * t + C);
}

function xFromT(t: number, A: number, B: number, C: number, D: number): number {
  return A * (t * t * t) + B * (t * t) + C * t + D;
}

function yFromT(t: number, E: number, F: number, G: number, H: number): number {
  const tt = t * t;
  return E * (tt * t) + F * tt + G * t + H;
}

/**
 * Cubic Bezier easing
 * @param percent A number between 0 - 1
 * @param x0 First vector X
 * @param y0 First vector Y
 * @param x1 Second vector X
 * @param y1 Second vector Y
 */
export function cubicBezier(percent: number, x0: number, y0: number, x1: number, y1: number): number {
  if (percent <= 0) return 0;
  if (percent >= 1) return 1;
  if (isLinear(x0, y0, x1, y1)) return percent; // linear

  const x0a = 0; // initial x
  const y0a = 0; // initial y
  const x1a = x0; // 1st influence x
  const y1a = y0; // 1st influence y
  const x2a = x1; // 2nd influence x
  const y2a = y1; // 2nd influence y
  const x3a = 1; // final x
  const y3a = 1; // final y

  const A = x3a - 3.0 * x2a + 3.0 * x1a - x0a;
  const B = 3.0 * x2a - 6.0 * x1a + 3.0 * x0a;
  const C = 3.0 * x1a - 3.0 * x0a;
  const D = x0a;

  const E = y3a - 3.0 * y2a + 3.0 * y1a - y0a;
  const F = 3.0 * y2a - 6.0 * y1a + 3.0 * y0a;
  const G = 3.0 * y1a - 3.0 * y0a;
  const H = y0a;

  let current = percent;
  for (let i = 0; i < 5; i++) {
    const currentx = xFromT(current, A, B, C, D);
    let currentslope = slopeFromT(current, A, B, C);
    if (currentslope === Infinity) currentslope = percent;
    current -= (currentx - percent) * currentslope;
    current = Math.min(Math.max(current, 0.0), 1.0);
  }

  return yFromT(current, E, F, G, H);
}

const toHex = (v: number) => {
  const n = Math.round(Math.min(1, Math.max(0, v)) * 255);
  return n.toString(16).padStart(2, '0');
};

export function rgbaToHex({ r, g, b, a = 1 }: { r: number; g: number; b: number; a?: number }) {
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  // Only include alpha if it's not fully opaque
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}
