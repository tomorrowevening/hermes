import { Audio, Material, Mesh, Object3D, ShaderMaterial, Texture } from 'three';

export const disposeTexture = (texture?: Texture): void => {
  texture?.dispose();
};

export const disposeMaterial = (material?: Material | Material[]): void => {
  if (!material) return;

  if (Array.isArray(material)) {
    material.forEach((mat: Material) => disposeMaterial(mat));
    return;
  }

  // Dispose material texture slots.
  for (const i in material) {
    const prop = (material as any)[i];
    if (prop instanceof Texture) {
      disposeTexture(prop as Texture);
    }
  }

  // Dispose shader uniforms that contain textures.
  if ((material as any).isShaderMaterial === true) {
    const shaderMat = material as ShaderMaterial;
    for (const i in shaderMat.uniforms) {
      const uniform = shaderMat.uniforms[i];
      if (uniform?.value instanceof Texture) {
        disposeTexture(uniform.value as Texture);
      }
    }
  }

  material.dispose();
};

export const dispose = (object: Object3D): void => {
  if (!object) return;

  while (object.children.length > 0) {
    const child = object.children[0];
    if (child.type === 'Audio') {
      (child as Audio).pause();
      if (child.parent) {
        child.parent.remove(child);
      }
    } else {
      dispose(child);
    }
  }

  if (object.parent) object.parent.remove(object);

  if ((object as any).isMesh) {
    const mesh = object as Mesh;
    mesh.geometry?.dispose();
    disposeMaterial(mesh.material);
  }

  if (typeof (object as any).dispose === 'function') {
    (object as any).dispose();
  }
};
