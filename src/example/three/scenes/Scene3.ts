import { Mesh, MeshNormalMaterial, SphereGeometry } from 'three';
import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer.js';
import BaseScene from './BaseScene';
import { hierarchyUUID } from '../../../utils/three';
import RemoteThree from '../../../core/remote/RemoteThree';
import Birds from '../Birds';

export default class Scene3 extends BaseScene {
  birds?: Birds;

  constructor() {
    super();
    this.name = 'Scene3';
    this.camera.position.y = 0;
    this.camera.rotation.set(0, 0, 0);
  }

  override init(): void {
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(new SphereGeometry(50), material);
    mesh.name = 'mesh';
    this.add(mesh);

    this.birds = new Birds();
    this.add(this.birds);

    const three = this.app.components.get('three') as RemoteThree;

    hierarchyUUID(this);

    three.addScene(this);
    three.addCamera(this.camera);
    three.setScene(this);
  }

  override update(): void {
    const three = this.app.components.get('three') as RemoteThree;
    const renderer = three.renderer as WebGPURenderer;
    this.clock.update();
    this.birds?.update(this.clock.getDelta(), this.clock.getElapsed(), renderer);
  }
}