export function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

export function distance(x: number, y: number): number {
  const d = x - y;
  return Math.sqrt(d * d);
}

export function randomID(): string {
  return Math.round(Math.random() * 1000000).toString();
}

export function isColor(obj: any) {
  return (
    obj.r !== undefined &&
    obj.g !== undefined &&
    obj.b !== undefined
  );
}
