import { Color, DoubleSide, GLSL3, ShaderMaterial } from 'three';
import glsl from 'glslify';
import vertex from './grid.vert';
import fragment from './grid.frag';

export type InfiniteGridProps = {
  divisions?: number
  scale?: number
  color?: Color
  distance?: number
  subgridOpacity?: number
  gridOpacity?: number
}

export default class InfiniteGridMaterial extends ShaderMaterial {
  constructor(props?: InfiniteGridProps) {
    super({
      extensions: {
        // @ts-ignore
        derivatives: true,
      },
      uniforms: {
        uScale: {
          value: props?.scale !== undefined ? props?.scale : 0.1,
        },
        uDivisions: {
          value: props?.divisions !== undefined ? props?.divisions : 10,
        },
        uColor: {
          value: props?.color !== undefined ? props?.color : new Color(0xffffff),
        },
        uDistance: {
          value: props?.distance !== undefined ? props?.distance : 10000,
        },
        uSubgridOpacity: {
          value: props?.subgridOpacity !== undefined ? props?.subgridOpacity : 0.15,
        },
        uGridOpacity: {
          value: props?.gridOpacity !== undefined ? props?.gridOpacity : 0.25,
        },
      },
      glslVersion: GLSL3,
      side: DoubleSide,
      transparent: true,
      name: 'InfiniteGrid',
      depthTest: false,
      depthWrite: false,
      vertexShader: glsl(vertex),
      fragmentShader: glsl(fragment),
    });
  }
}
