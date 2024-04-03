import { LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshMatcapMaterial, Object3D, PlaneGeometry, Points, PointsMaterial, SkinnedMesh, SphereGeometry, SpotLight, WebGLRenderer } from 'three';
import { IS_DEV, app } from '../constants';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import { hierarchyUUID } from '../../editor/utils';
import BaseScene from './BaseScene';
import FBXAnimation from './FBXAnimation';
import { textures } from './loader';
import CustomMaterial from './CustomMaterial';

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

    const spotlight = new SpotLight(0xffffff, 3);
    spotlight.angle = 5.8;
    spotlight.decay = 0;
    spotlight.distance = 1000;
    spotlight.penumbra = Math.PI;
    spotlight.name = 'spotlight';
    spotlight.position.set(-250, 200, 200);
    spotlight.lookAt(0, 50, 0);
    lights.add(spotlight);
  }

  private createWorld() {
    const world = new Object3D();
    world.name = 'world';
    this.add(world);

    const gridTexture = textures.get('uv_grid')!;
    gridTexture.repeat.setScalar(10);
    gridTexture.needsUpdate = true;
    const floorMaterial = new MeshBasicMaterial({
      map: gridTexture,
    });
    const floor = new Mesh(new SphereGeometry(250, 36), floorMaterial);
    floor.name = 'floor';
    floor.receiveShadow = true;
    floor.position.y = -75;
    floor.scale.y = 0.1;
    world.add(floor);

    const points = new Points(new SphereGeometry(50), new PointsMaterial({ size: 2 }));
    points.name = 'points';
    points.position.x = -100;
    world.add(points);

    const lines = new LineSegments(new SphereGeometry(50), new LineBasicMaterial());
    lines.name = 'lines';
    lines.position.x = 100;
    world.add(lines);

    const testShader = new Mesh(new PlaneGeometry(100, 100), new CustomMaterial());
    testShader.name = 'testShader';
    testShader.position.z = -100;
    world.add(testShader);

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
    const theatre = app.components.get('theatre') as RemoteTheatre;
    theatre.sheet(this.name);

    // Camera
    theatre.sheetObject(
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
    theatre.sheetObject(
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

    theatre.playSheet(this.name, { iterationCount: Infinity });
  }

  override update(): void {
    const delta = this.clock.getDelta();
    this.dance.update(delta);
  }
}
