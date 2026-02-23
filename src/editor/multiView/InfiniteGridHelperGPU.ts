import { Mesh, PlaneGeometry } from 'three';
import InfiniteGridNodeMaterial from './InfiniteGridNodeMaterial';
import type { InfiniteGridProps } from './InfiniteGridMaterial';

export default class InfiniteGridHelperGPU extends Mesh {
  gridMaterial: InfiniteGridNodeMaterial;

  constructor(props?: InfiniteGridProps) {
    const material = new InfiniteGridNodeMaterial(props);
    super(new PlaneGeometry(), material);
    this.gridMaterial = material;
    this.frustumCulled = false;
    this.name = 'InfiniteGridHelper';
  }
}
