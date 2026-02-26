import { Color, Mesh } from 'three';
import InfiniteGridNodeMaterial from './InfiniteGridNodeMaterial';
import type { InfiniteGridProps } from './InfiniteGridMaterial';
export default class InfiniteGridHelperGPU extends Mesh {
    gridMaterial: InfiniteGridNodeMaterial;
    constructor(props?: InfiniteGridProps);
    get color(): Color;
    set color(value: Color);
    get gridOpacity(): number;
    set gridOpacity(value: number);
    get subgridOpacity(): number;
    set subgridOpacity(value: number);
}
