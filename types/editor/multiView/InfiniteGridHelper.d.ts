import { Color, Mesh } from 'three';
import InfiniteGridMaterial, { InfiniteGridProps } from './InfiniteGridMaterial';
export default class InfiniteGridHelper extends Mesh {
    gridMaterial: InfiniteGridMaterial;
    constructor(props?: InfiniteGridProps);
    get color(): Color;
    set color(value: Color);
    get gridOpacity(): number;
    set gridOpacity(value: number);
    get subgridOpacity(): number;
    set subgridOpacity(value: number);
}
