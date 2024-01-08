import { Mesh, PlaneGeometry } from 'three';
import InfiniteGridMaterial from './InfiniteGridMaterial';

/**
 * Copied from:
 * https://github.com/theatre-js/theatre/blob/main/packages/r3f/src/extension/InfiniteGridHelper/index.ts
 */

export default class InfiniteGridHelper extends Mesh {
  constructor() {
    super(new PlaneGeometry(2, 2), new InfiniteGridMaterial());
    this.frustumCulled = false;
    this.name = 'InfiniteGridHelper';
    this.position.y = 0.1;
  }
}