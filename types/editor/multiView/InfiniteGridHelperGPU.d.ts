import { Mesh } from 'three';
import InfiniteGridNodeMaterial from './InfiniteGridNodeMaterial';
import type { InfiniteGridProps } from './InfiniteGridMaterial';
export default class InfiniteGridHelperGPU extends Mesh {
    gridMaterial: InfiniteGridNodeMaterial;
    constructor(props?: InfiniteGridProps);
}
