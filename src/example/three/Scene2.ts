import { Mesh, MeshMatcapMaterial, Object3D, SphereGeometry, WebGLRenderer } from "three";
import { IS_DEV } from "../constants";
import { hierarchyUUID } from "../../editor/utils";
import BaseScene from "./BaseScene";

export default class Scene2 extends BaseScene {
  constructor(renderer: WebGLRenderer) {
    super(renderer);
    this.name = 'Scene2';
    this.camera.position.set(0, 0, 125);
    this.camera.lookAt(0, 0, 0);

    this.createWorld();
    if (IS_DEV) hierarchyUUID(this);
  }

  private createWorld() {
    const world = new Object3D();
    world.name = 'world';
    this.add(world);

    const sphere = new Mesh(new SphereGeometry(50), new MeshMatcapMaterial());
    sphere.name = 'sphere';
    world.add(sphere);
  }
}
