/* eslint-disable @typescript-eslint/no-explicit-any */
import { BufferAttribute, BufferGeometry, DoubleSide, InstancedMesh, Vector3 } from 'three';
import NodeMaterial from 'three/src/materials/nodes/NodeMaterial.js';
import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer.js';
import {
  uniform,
  max,
  dot,
  sin,
  mat3,
  uint,
  negate,
  instancedArray,
  cameraProjectionMatrix,
  cameraViewMatrix,
  positionLocal,
  modelWorldMatrix,
  sqrt,
  float,
  Fn,
  If,
  cos,
  Loop,
  Continue,
  normalize,
  instanceIndex,
  length,
  vertexIndex,
  vec3,
  vec4,
} from 'three/src/nodes/TSL.js';

class BirdGeometry extends BufferGeometry {
  constructor() {
    super();

    const points = 3 * 3;
    const vertices = new BufferAttribute(new Float32Array(points * 3), 3);

    this.setAttribute('position', vertices);

    let v = 0;

    function verts_push(verts: number[]) {
      for (let i = 0; i < verts.length; i++) {
        vertices.array[v++] = verts[i];
      }
    }

    const wingsSpan = 20;

    // Body
    verts_push([0, 0, -20, 0, -8, 10, 0, 0, 30]);

    // Left Wing
    verts_push([0, 0, -15, -wingsSpan, 0, 5, 0, 0, 15]);

    // Right Wing
    verts_push([0, 0, 15, wingsSpan, 0, 5, 0, 0, -15]);

    this.scale(0.2, 0.2, 0.2);
  }
}

const SPEED_LIMIT = 9.0;
const BOUNDS = 800,
  BOUNDS_HALF = BOUNDS / 2;

class BirdMaterial extends NodeMaterial {
  computeVelocity: any;
  computePosition: any;
  effectController = {
    separation: uniform(15.0).setName('separation'),
    alignment: uniform(20.0).setName('alignment'),
    cohesion: uniform(20.0).setName('cohesion'),
    freedom: uniform(0.75).setName('freedom'),
    now: uniform(0.0),
    deltaTime: uniform(0.0).setName('deltaTime'),
    rayOrigin: uniform(new Vector3()).setName('rayOrigin'),
    rayDirection: uniform(new Vector3()).setName('rayDirection'),
  };

  constructor(total: number) {
    super();

    // Initialize position, velocity, and phase values

    const positionArray = new Float32Array(total * 3);
    const velocityArray = new Float32Array(total * 3);
    const phaseArray = new Float32Array(total);

    for (let i = 0; i < total; i++) {
      const posX = Math.random() * BOUNDS - BOUNDS_HALF;
      const posY = Math.random() * BOUNDS - BOUNDS_HALF;
      const posZ = Math.random() * BOUNDS - BOUNDS_HALF;

      positionArray[i * 3 + 0] = posX;
      positionArray[i * 3 + 1] = posY;
      positionArray[i * 3 + 2] = posZ;

      const velX = Math.random() - 0.5;
      const velY = Math.random() - 0.5;
      const velZ = Math.random() - 0.5;

      velocityArray[i * 3 + 0] = velX * 10;
      velocityArray[i * 3 + 1] = velY * 10;
      velocityArray[i * 3 + 2] = velZ * 10;

      phaseArray[i] = 1;
    }

    // Labels applied to storage nodes and uniform nodes are reflected within the shader output,
    // and are useful for debugging purposes.

    const positionStorage = instancedArray(positionArray, 'vec3').setName('positionStorage');
    const velocityStorage = instancedArray(velocityArray, 'vec3').setName('velocityStorage');
    const phaseStorage = instancedArray(phaseArray, 'float').setName('phaseStorage');

    // The Pixel Buffer Object (PBO) is required to get the GPU computed data in the WebGL2 fallback.

    positionStorage.setPBO(true);
    velocityStorage.setPBO(true);
    phaseStorage.setPBO(true);

    // Animate bird mesh within vertex shader, then apply position offset to vertices.
    // Vertex shader Fns are called during getNodeType() before the builder stack is
    // initialised, so ANY assign op (addAssign/mulAssign/assign) or If()/Loop() will
    // throw. The Fn must be written purely functionally — no mutations.
    const birdVertexTSL = Fn(() => {
      const phase = phaseStorage.element(instanceIndex);
      const vel = normalize(velocityStorage.element(instanceIndex));

      // Wing flap: select() is a pure ternary — no stack needed.
      const isWingVertex = vertexIndex.equal(4).or(vertexIndex.equal(7));
      const wingY = isWingVertex.select(sin(phase).mul(5.0), float(0.0));
      const localPos = vec3(positionLocal.x, positionLocal.y.add(wingY), positionLocal.z);

      // Negate Z via vec3 construction instead of mulAssign.
      const velNegZ = vec3(vel.x, vel.y, negate(vel.z));
      const xz = length(velNegZ.xz);
      const cosry = velNegZ.x.div(xz);
      const sinry = velNegZ.z.div(xz);
      const cosrz = sqrt(velNegZ.y.mul(velNegZ.y).oneMinus());
      const sinrz = velNegZ.y;

      // Nodes must be negated with negate(). Using '-', their values will resolve to NaN.
      const maty = mat3(cosry, 0, negate(sinry), 0, 1, 0, sinry, 0, cosry);
      const matz = mat3(cosrz, sinrz, 0, negate(sinrz), cosrz, 0, 0, 0, 1);

      // add() instead of addAssign — purely functional.
      const worldPos = modelWorldMatrix.mul(localPos);
      const finalPos = maty.mul(matz).mul(worldPos).add(positionStorage.element(instanceIndex));

      return cameraProjectionMatrix.mul(cameraViewMatrix).mul(finalPos);
    }, 'vec4');

    this.vertexNode = birdVertexTSL();
    this.side = DoubleSide;

    this.fragmentNode = Fn(() => {
      return vec4(1, 0, 0, 1);
    })();

    // Define GPU Compute shaders.
    // Shaders are computationally identical to their GLSL counterparts outside of texture destructuring.
    // 'void' second arg → shaderNode.nodeType = 'void' → ShaderCallNodeInternal.getNodeType()
    // short-circuits via `return this.shaderNode.nodeType || this.getOutputNode(builder)...`
    // so the callback is never invoked during type inference (where currentStack is null).
    // It only runs inside setupOutput() when renderer.compute() calls builder.addStack() first.
    const computeVelocityFn = Fn(() => {
      // Define consts
      const PI = float(3.141592653589793);
      const PI_2 = PI.mul(2.0);
      const limit = float(SPEED_LIMIT).toVar('limit');

      // Destructure uniforms
      const { alignment, separation, cohesion, deltaTime, rayOrigin, rayDirection } = this.effectController;

      const zoneRadius = separation.add(alignment).add(cohesion).toConst();
      const separationThresh = separation.div(zoneRadius).toConst();
      const alignmentThresh = separation.add(alignment).div(zoneRadius).toConst();
      const zoneRadiusSq = zoneRadius.mul(zoneRadius).toConst();

      // Cache current bird's position and velocity outside the loop
      const birdIndex = instanceIndex.toConst('birdIndex');
      const position = positionStorage.element(birdIndex).toVar();
      const velocity = velocityStorage.element(birdIndex).toVar();

      // Add influence of pointer position to velocity using cached position
      const directionToRay = rayOrigin.sub(position).toConst();
      const projectionLength = dot(directionToRay, rayDirection).toConst();
      const closestPoint = rayOrigin.sub(rayDirection.mul(projectionLength)).toConst();
      const directionToClosestPoint = closestPoint.sub(position).toConst();
      const distanceToClosestPoint = length(directionToClosestPoint).toConst();
      const distanceToClosestPointSq = distanceToClosestPoint.mul(distanceToClosestPoint).toConst();

      const rayRadius = float(150.0).toConst();
      const rayRadiusSq = rayRadius.mul(rayRadius).toConst();

      // Check distance using strict node comparison or conditional
      // TSL If() requires builder stack context
      If(distanceToClosestPointSq.lessThan(rayRadiusSq), () => {
        const velocityAdjust = distanceToClosestPointSq.div(rayRadiusSq).sub(1.0).mul(deltaTime).mul(100.0);
        velocity.addAssign(normalize(directionToClosestPoint).mul(velocityAdjust));
        limit.addAssign(5.0);
      });

      // Attract flocks to center
      const dirToCenter = position.toVar();
      dirToCenter.y.mulAssign(2.5);
      velocity.subAssign(normalize(dirToCenter).mul(deltaTime).mul(5.0));

      Loop({ start: uint(0), end: uint(total), type: 'uint', condition: '<' }, ({ i }) => {
        If(i.equal(birdIndex), () => {
          Continue();
        });

        // Cache bird's position and velocity

        const birdPosition = positionStorage.element(i);
        const dirToBird = birdPosition.sub(position);
        const distToBird = length(dirToBird);

        If(distToBird.lessThan(0.0001), () => {
          Continue();
        });

        const distTototalq = distToBird.mul(distToBird);

        // Don't apply any changes to velocity if changes if the bird is outsize the zone's radius.
        If(distTototalq.greaterThan(zoneRadiusSq), () => {
          Continue();
        });

        // Determine which threshold the bird is flying within and adjust its velocity accordingly

        const percent = distTototalq.div(zoneRadiusSq);

        If(percent.lessThan(separationThresh), () => {
          // Separation - Move apart for comfort
          const velocityAdjust = separationThresh.div(percent).sub(1.0).mul(deltaTime);
          velocity.subAssign(normalize(dirToBird).mul(velocityAdjust));
        })
          .ElseIf(percent.lessThan(alignmentThresh), () => {
            // Alignment - fly the same direction
            const threshDelta = alignmentThresh.sub(separationThresh);
            const adjustedPercent = percent.sub(separationThresh).div(threshDelta);
            const birdVelocity = velocityStorage.element(i);

            const cosRange = cos(adjustedPercent.mul(PI_2));
            const cosRangeAdjust = float(0.5).sub(cosRange.mul(0.5)).add(0.5);
            const velocityAdjust = cosRangeAdjust.mul(deltaTime);
            velocity.addAssign(normalize(birdVelocity).mul(velocityAdjust));
          })
          .Else(() => {
            // Attraction / Cohesion - move closer
            const threshDelta = alignmentThresh.oneMinus();
            const adjustedPercent = threshDelta.equal(0.0).select(1.0, percent.sub(alignmentThresh).div(threshDelta));

            const cosRange = cos(adjustedPercent.mul(PI_2));
            const adj1 = cosRange.mul(-0.5);
            const adj2 = adj1.add(0.5);
            const adj3 = float(0.5).sub(adj2);

            const velocityAdjust = adj3.mul(deltaTime);
            velocity.addAssign(normalize(dirToBird).mul(velocityAdjust));
          });
      });

      If(length(velocity).greaterThan(limit), () => {
        velocity.assign(normalize(velocity).mul(limit));
      });

      // Write back the final velocity to storage
      velocityStorage.element(birdIndex).assign(velocity);
    }, 'void');

    this.computeVelocity = computeVelocityFn().compute(total);

    // Position
    const computePositionFn = Fn(
      () => {
        const { deltaTime } = this.effectController;
        positionStorage
          .element(instanceIndex)
          .addAssign(velocityStorage.element(instanceIndex).mul(deltaTime).mul(15.0));

        const velocity = velocityStorage.element(instanceIndex);
        const phase = phaseStorage.element(instanceIndex);

        const modValue = phase
          .add(deltaTime)
          .add(length(velocity.xz).mul(deltaTime).mul(3.0))
          .add(max(velocity.y, 0.0).mul(deltaTime).mul(6.0));
        phaseStorage.element(instanceIndex).assign(modValue.mod(62.83));
      },
      {
        name: 'computePosition',
        type: 'void',
      },
    );

    this.computePosition = computePositionFn().compute(total);
  }

  set delta(value: number) {
    this.effectController.deltaTime.value = value;
  }

  set now(value: number) {
    this.effectController.now.value = value;
  }
}

export default class Birds extends InstancedMesh {
  private birdMaterial?: BirdMaterial;

  constructor(total: number = 8192) {
    const birdMaterial = new BirdMaterial(total);
    super(new BirdGeometry(), birdMaterial, total);
    this.name = 'birds';
    this.birdMaterial = birdMaterial;
    this.rotation.y = Math.PI / 2;
    this.matrixAutoUpdate = false;
    this.frustumCulled = false;
    this.updateMatrix();
  }

  update(delta: number, now: number, renderer: WebGPURenderer) {
    if (this.birdMaterial) {
      this.birdMaterial.delta = delta;
      this.birdMaterial.now = now;
      renderer.computeAsync(this.birdMaterial.computeVelocity);
      renderer.computeAsync(this.birdMaterial.computePosition);
    }
  }
}
