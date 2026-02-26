import { Color } from 'three';
import { NodeMaterial } from 'three/webgpu';
import type { InfiniteGridProps } from './InfiniteGridMaterial';
export default class InfiniteGridNodeMaterial extends NodeMaterial {
    readonly uScale: any;
    readonly uDivisions: any;
    readonly uColor: any;
    readonly uDistance: any;
    readonly uSubgridOpacity: any;
    readonly uGridOpacity: any;
    constructor(props?: InfiniteGridProps);
    get color(): Color;
    set color(value: Color);
    get gridOpacity(): number;
    set gridOpacity(value: number);
    get subgridOpacity(): number;
    set subgridOpacity(value: number);
}
