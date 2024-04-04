import { Material, Mesh, Object3D, Texture } from 'three';

export function capitalize(value: string): string {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

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

export function round(value: number, precision: number = 1): number {
  return Number(value.toFixed(precision));
}

export let totalThreeObjects = 0;
export const resetThreeObjects = () => {
  totalThreeObjects = 0;
};
export const hierarchyUUID = (object: Object3D): void => {
  if (!object) return;

  let uuid = object.name.replace(' ', '');
  // fallback in case there's no name
  if (uuid.length === 0) {
    uuid = `obj_${totalThreeObjects}`;
    totalThreeObjects++;
  }
  // inherit parent's UUID for hierarchy
  if (object.parent !== null && object.parent.uuid.length > 0) {
    uuid = `${object.parent.uuid}.${uuid}`;
  }
  object.uuid = uuid;

  // Iterate children
  object.children.forEach((child: Object3D) => {
    hierarchyUUID(child);
  });
};

// Dispose

export const disposeTexture = (texture?: Texture): void => {
  texture?.dispose();
};

// Dispose material
export const disposeMaterial = (material?: Material | Material[]): void => {
  if (!material) return;

  if (Array.isArray(material)) {
    material.forEach((mat: Material) => mat.dispose());
  } else {
    material.dispose();
  }
};

// Dispose object
export const dispose = (object: Object3D): void => {
  if (!object) return;

  // Dispose children
  while (object.children.length > 0) {
    const child = object.children[0];
    if (child.type === 'Audio') {
      // @ts-ignore
      child.pause();
      if (child.parent) {
        child.parent.remove(child);
      }
    } else {
      dispose(child);
    }
  }

  // Dispose object
  if (object.parent) object.parent.remove(object);
  // @ts-ignore
  if (object.isMesh) {
    const mesh = object as Mesh;
    mesh.geometry?.dispose();
    disposeMaterial(mesh.material);
  }

  // @ts-ignore
  if (object.dispose !== undefined) object.dispose();
};
