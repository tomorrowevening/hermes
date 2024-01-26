import { DirectionalLight, MeshMatcapMaterial, Object3D, SkinnedMesh, SpotLight, WebGLRenderer } from 'three';
import { IS_DEV, app } from '../constants';
import { hierarchyUUID } from '../../editor/utils';
import BaseScene from './BaseScene';
import FBXAnimation from './FBXAnimation';

export default class Scene2 extends BaseScene {
  dance!: FBXAnimation;

  constructor(renderer: WebGLRenderer) {
    super(renderer);
    this.name = 'Scene2';
    this.camera.position.set(0, 0, 125);
    this.camera.lookAt(0, 0, 0);

    this.createLights();
    this.createWorld();
    this.createAnimation();
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

  private createAnimation() {
    app.theatre.sheet(this.name);

    // Camera
    app.theatre.sheetObject(
      this.name,
      'Camera',
      {
        position: {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
        },
        rotation: {
          x: this.camera.rotation.x,
          y: this.camera.rotation.y,
          z: this.camera.rotation.z,
        },
      },
      (data: any) => {
        this.camera.position.set(data.position.x, data.position.y, data.position.z);
        this.camera.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
      }
    );

    // Dancer
    app.theatre.sheetObject(
      this.name,
      'Dancer',
      {
        position: {
          x: this.dance.position.x,
          y: this.dance.position.y,
          z: this.dance.position.z,
        },
        rotation: {
          x: this.dance.rotation.x,
          y: this.dance.rotation.y,
          z: this.dance.rotation.z,
        },
      },
      (data: any) => {
        this.dance.position.set(data.position.x, data.position.y, data.position.z);
        this.dance.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
      }
    );
  }

  override update(): void {
    const delta = this.clock.getDelta();
    this.dance.update(delta);
  }
}
