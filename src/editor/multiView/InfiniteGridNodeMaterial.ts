import { Color, DoubleSide } from 'three';
import { NodeMaterial } from 'three/webgpu';
import {
  abs,
  cameraPosition,
  Discard,
  distance,
  float,
  floor,
  Fn,
  fract,
  fwidth,
  If,
  lessThanEqual,
  log,
  max,
  min,
  mix,
  positionLocal,
  pow,
  uniform,
  varyingProperty,
  vec3,
  vec4,
} from 'three/tsl';
import type { InfiniteGridProps } from './InfiniteGridMaterial';

export default class InfiniteGridNodeMaterial extends NodeMaterial {
  readonly uScale;
  readonly uDivisions;
  readonly uColor;
  readonly uDistance;
  readonly uSubgridOpacity;
  readonly uGridOpacity;

  constructor(props?: InfiniteGridProps) {
    super();
    this.name = 'InfiniteGrid';
    this.side = DoubleSide;
    this.transparent = true;

    this.uScale = uniform(props?.scale ?? 0.1);
    this.uDivisions = uniform(props?.divisions ?? 10);
    this.uColor = uniform(props?.color ?? new Color(0xffffff));
    this.uDistance = uniform(props?.distance ?? 10000);
    this.uSubgridOpacity = uniform(props?.subgridOpacity ?? 0.15);
    this.uGridOpacity = uniform(props?.gridOpacity ?? 0.25);

    const { uScale, uDivisions, uColor, uDistance, uSubgridOpacity, uGridOpacity } = this;

    // Varying to pass world position from vertex to fragment
    const vWorldPosition = varyingProperty('vec3', 'vWorldPosition');

    // Vertex: scale a unit plane by uDistance and follow camera XZ so the grid
    // is always centered under the camera at world Y = 0.
    // positionNode overrides the local geometry position; since InfiniteGridHelper
    // is always at the origin the model matrix is identity, so local ≡ world here.
    this.positionNode = Fn(() => {
      const wp = positionLocal.xzy.mul(uDistance).add(
        vec3(cameraPosition.x, float(0), cameraPosition.z),
      );
      vWorldPosition.assign(wp);
      return wp;
    })();

    // Returns 1 where a grid line falls, 0 elsewhere, with AA via screen-space derivatives
    const getGrid = Fn(([gapSize]: [any]) => {
      const wpdiv = vWorldPosition.xz.div(gapSize);
      // fwidth gives the rate of change in screen-space, used for AA
      const fw = fwidth(wpdiv);
      // Shift by -0.5/+0.5 so both sides of each line get the same fade
      const grid = abs(fract(wpdiv.sub(0.5)).sub(0.5)).div(fw).div(2.0);
      const gridLine = min(grid.x, grid.y);
      return float(1.0).sub(min(gridLine, float(1.0)));
    });

    // Fragment: three levels of grid (subgrid, grid, next grid) fade in/out
    // as the camera zooms, producing the same logarithmic LOD as the GLSL version.
    this.outputNode = Fn(() => {
      const wp = vWorldPosition;

      // Vertical distance to the grid plane drives the LOD power selection
      const camDistToPlane = max(float(200), abs(cameraPosition.y.sub(wp.y)));
      // True distance to the fragment for the radial fade-out
      const camDistToFrag = float(distance(cameraPosition, wp));

      // Compute the three nested grid levels for the current camera distance
      const logRatio = log(camDistToPlane).div(log(uDivisions));
      const subGridPower = pow(uDivisions, floor(logRatio));
      const gridPower = subGridPower.mul(uDivisions);
      const nextGridPower = gridPower.mul(uDivisions);

      const subgrid = getGrid(subGridPower.mul(uScale));
      const grid = getGrid(gridPower.mul(uScale));
      const nextGrid = getGrid(nextGridPower.mul(uScale));

      // How far through the current LOD step we are (0 → 1)
      const stepPercentage = camDistToPlane.sub(subGridPower).div(gridPower.sub(subGridPower));
      const fadeRange = float(0.3);
      // Fade percentage kicks in during the last fadeRange of the step
      const fadePercentage = max(
        stepPercentage.sub(float(1)).add(fadeRange),
        float(0),
      ).div(fadeRange);

      // Cubic radial fade so the grid dissolves at the draw distance
      const baseOpacity = subgrid.mul(
        pow(float(1).sub(min(camDistToFrag.div(uDistance), float(1))), float(3)),
      );

      // Blend subgrid → grid → next-grid opacities with a smoothing coefficient
      const fadeCoefficient = float(0.5);
      const alphaSubgrid = baseOpacity.sub(fadePercentage).mul(uSubgridOpacity);
      const alphaGrid = mix(
        alphaSubgrid,
        baseOpacity.mul(uGridOpacity).sub(
          fadePercentage.mul(uGridOpacity.sub(uSubgridOpacity)).mul(fadeCoefficient),
        ),
        grid,
      );
      const alphaFinal = float(mix(alphaGrid, baseOpacity.mul(uGridOpacity), nextGrid));

      // Discard nearly-invisible fragments (matches minAlpha = 1/127 from GLSL)
      If(lessThanEqual(alphaFinal, float(1.0 / 127.0)), () => {
        Discard();
      });

      return vec4(uColor, alphaFinal);
    })();
  }

  // Getters / Setters

  get color(): Color {
    return this.uColor.value;
  }

  set color(value: Color) {
    this.uColor.value = value;
  }

  get gridOpacity(): number {
    return this.uGridOpacity.value;
  }

  set gridOpacity(value: number) {
    this.uGridOpacity.value = value;
  }
  
  get subgridOpacity(): number {
    return this.uSubgridOpacity.value;
  }
  
  set subgridOpacity(value: number) {
    this.uSubgridOpacity.value = value;
  }
}
