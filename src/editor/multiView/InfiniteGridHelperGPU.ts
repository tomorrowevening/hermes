import { Color, Mesh, PlaneGeometry } from 'three/webgpu';
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

  // Getters / Setters
  
  get color(): Color {
    return this.gridMaterial.color;
  }

  set color(value: Color) {
    this.gridMaterial.color = value;
  }

  get gridOpacity(): number {
    return this.gridMaterial.gridOpacity;
  }

  set gridOpacity(value: number) {
    this.gridMaterial.gridOpacity = value;
  }

  get subgridOpacity(): number {
    return this.gridMaterial.subgridOpacity;
  }

  set subgridOpacity(value: number) {
    this.gridMaterial.subgridOpacity = value;
  }
}
