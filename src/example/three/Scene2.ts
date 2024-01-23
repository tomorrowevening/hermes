import { DirectionalLight, MeshMatcapMaterial, Object3D, SkinnedMesh, SpotLight, WebGLRenderer } from "three";
import { IS_DEV } from "../constants";
import { hierarchyUUID } from "../../editor/utils";
import BaseScene from "./BaseScene";
import FBXAnimation from "./FBXAnimation";

export default class Scene2 extends BaseScene {
  dance!: FBXAnimation;

  constructor(renderer: WebGLRenderer) {
    super(renderer);
    this.name = 'Scene2';
    this.camera.position.set(0, 0, 125);
    this.camera.lookAt(0, 0, 0);

    this.createLights();
    this.createWorld();
    if (IS_DEV) hierarchyUUID(this);
  }

  private createLights() {
    const lights = new Object3D();
    lights.name = 'lights';
    this.add(lights);

    const sun = new DirectionalLight(0xffffff, 0.25);
    sun.name = 'sun';
    sun.castShadow = true;
    sun.position.set(0, 50, 50);
    lights.add(sun);

    const spotlight = new SpotLight(0xffffff, 3);
    spotlight.angle = 5.8;
    spotlight.decay = 0;
    spotlight.distance = 1000;
    spotlight.penumbra = Math.PI;
    spotlight.name = 'spotlight';
    spotlight.position.set(-50, 200, 200);
    spotlight.lookAt(0, 50, 0);
    lights.add(spotlight);
  }

  private createWorld() {
    const world = new Object3D();
    world.name = 'world';
    this.add(world);

    this.dance = new FBXAnimation('Flair');
    this.dance.name = 'flair';
    this.dance.traverse((obj: Object3D) => {
      if (obj instanceof SkinnedMesh) {
        const mesh = obj as SkinnedMesh;
        mesh.material = new MeshMatcapMaterial();
      }
    });
    world.add(this.dance);
  }

  override update(): void {
    const delta = this.clock.getDelta();
    this.dance.update(delta);
  }
}
