import { Color, ShaderMaterial } from 'three';
export type InfiniteGridProps = {
    divisions?: number;
    scale?: number;
    color?: Color;
    distance?: number;
    subgridOpacity?: number;
    gridOpacity?: number;
};
export default class InfiniteGridMaterial extends ShaderMaterial {
    constructor(props?: InfiniteGridProps);
}
