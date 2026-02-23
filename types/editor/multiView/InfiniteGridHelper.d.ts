import { Mesh } from 'three';
import InfiniteGridMaterial, { InfiniteGridProps } from './InfiniteGridMaterial';
export default class InfiniteGridHelper extends Mesh {
    gridMaterial: InfiniteGridMaterial;
    constructor(props?: InfiniteGridProps);
}
