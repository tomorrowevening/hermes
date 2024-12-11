import { Mesh, PlaneGeometry } from 'three';
import InfiniteGridMaterial, { InfiniteGridProps } from './InfiniteGridMaterial';

/**
 * Copied from:
 * https://github.com/theatre-js/theatre/blob/main/packages/r3f/src/extension/InfiniteGridHelper/index.ts
 */

export default class InfiniteGridHelper extends Mesh {
  gridMaterial: InfiniteGridMaterial;

  constructor(props?: InfiniteGridProps) {
    const material = new InfiniteGridMaterial(props);
    super(new PlaneGeometry(), material);
    this.gridMaterial = material;
    this.frustumCulled = false;
    this.name = 'InfiniteGridHelper';
  }

  update() {
    this.gridMaterial.needsUpdate = true;
  }
}