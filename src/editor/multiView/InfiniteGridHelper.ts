import { Color, Mesh, PlaneGeometry } from 'three';
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