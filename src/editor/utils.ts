export function capitalize(value: string): string {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

export function copyToClipboard(data: any): string {
  const content = JSON.stringify(data);
  navigator.clipboard.writeText(content);
  return content;
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

export function colorToHex(obj: any) {
  const r = Math.round(obj.r * 255);
  const g = Math.round(obj.g * 255);
  const b = Math.round(obj.b * 255);

  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const red = toHex(r);
  const green = toHex(g);
  const blue = toHex(b);

  return '#' + red + green + blue;
}
