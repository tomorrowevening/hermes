import { Mesh } from 'three';
import InfiniteGridMaterial from './InfiniteGridMaterial';
export default class InfiniteGridHelper extends Mesh {
    gridMaterial: InfiniteGridMaterial;
    constructor();
    update(): void;
}
