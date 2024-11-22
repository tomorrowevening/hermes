export function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalize(min: number, max: number, value: number) {
  return (value - min) / (max - min);
}

export function mix(min: number, max: number, value: number) {
  return min * (1 - value) + max * value;
}

export function distance(x: number, y: number): number {
  const d = x - y;
  return Math.sqrt(d * d);
}

export function round(value: number, precision: number = 1): number {
  return Number(value.toFixed(precision));
}
