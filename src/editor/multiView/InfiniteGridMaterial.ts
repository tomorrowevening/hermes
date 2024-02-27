import { Color, DoubleSide, GLSL3, ShaderMaterial } from 'three';
import vertex from './InfiniteGrid.vert';
import fragment from './InfiniteGrid.frag';

type InfiniteGridProps = {
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
        derivatives: true,
      },
      glslVersion: GLSL3,
      side: DoubleSide,
      transparent: true,
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
      vertexShader: vertex,
      fragmentShader: fragment,
      name: 'InfiniteGrid',
      depthWrite: false,
    });
  }
}
