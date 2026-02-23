import { Mesh, MeshNormalMaterial, SphereGeometry } from 'three';
import BaseScene from './BaseScene';
import { hierarchyUUID } from '../../../utils/three';
import RemoteThree from '../../../core/remote/RemoteThree';

export default class Scene3 extends BaseScene {
  constructor() {
    super();
    this.name = 'Scene3';
    this.camera.position.y = 0;
    this.camera.rotation.set(0, 0, 0);
  }

  override init(): void {
    const mesh = new Mesh(new SphereGeometry(50), new MeshNormalMaterial());
    mesh.name = 'mesh';
    this.add(mesh);

    const three = this.app.components.get('three') as RemoteThree;

    hierarchyUUID(this);

    three.addScene(this);
    three.addCamera(this.camera);
    three.setScene(this);
  }
}