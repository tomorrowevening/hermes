import {
  CircleGeometry,
  DirectionalLight,
  HalfFloatType,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  Object3D,
  SphereGeometry,
  SpotLight,
} from 'three';
import CustomShaderMaterial from '../CustomShaderMaterial';
import { hierarchyUUID } from '../../../utils/three';
import FBXAnimation from '../FBXAnimation';
import { cubeTextures, textures } from '../loader';
import BaseScene from './BaseScene';
import RemoteTheatre from '../../../core/remote/RemoteTheatre';
import RemoteThree from '../../../core/remote/RemoteThree';

export default class Scene1 extends BaseScene {
  dance!: FBXAnimation;

  private customMat?: CustomShaderMaterial;

  constructor() {
    super();
    this.name = 'Scene1';
  }

  override init(): void {
    const envMap = cubeTextures.get('environment')!;
    this.background = envMap;

    this.camera.position.set(0, 50, 50);
    this.camera.lookAt(0, 50, 0);

    this.createLights();
    this.createWorld();
    this.createAnimation();
    hierarchyUUID(this);

    const three = this.app.components.get('three') as RemoteThree;
    three.addScene(this);
    three.setScene(this);
    three.addCamera(this.camera);
  }

  override dispose(): void {
    const three = this.app.components.get('three') as RemoteThree;
    three.removeCamera(this.camera);
    super.dispose();
  }

  private createLights() {
    const lights = new Object3D();
    lights.name = 'lights';
    this.add(lights);

    const sun = new DirectionalLight(0xffffff, 0.25);
    sun.name = 'sun';
    sun.castShadow = true;
    sun.position.set(0, 50, 50);
    const shadow = 1024;
    sun.shadow.camera.top = shadow;
    sun.shadow.camera.bottom = -shadow;
    sun.shadow.camera.left = - shadow;
    sun.shadow.camera.right = shadow;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 1000;
    sun.shadow.bias = -0.001;
    lights.add(sun);

    const hemi = new HemisphereLight(0x6fb4e2, 0xc46d27, 0.5);
    hemi.name = 'hemi';
    lights.add(hemi);

    const spotlight = new SpotLight(0xffffff, 3);
    spotlight.angle = 5.8;
    spotlight.decay = 0;
    spotlight.distance = 1000;
    spotlight.penumbra = Math.PI;
    spotlight.name = 'spotlight';
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.near = 10;
    spotlight.shadow.camera.far = 1000;
    spotlight.shadow.bias = -0.001;
    spotlight.position.set(-50, 200, 200);
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
    const floorMaterial = new MeshPhongMaterial({ map: gridTexture });
    const floor = new Mesh(new CircleGeometry(500, 36), floorMaterial);
    floor.name = 'floor';
    floor.receiveShadow = true;
    floor.rotateX(-Math.PI / 2);
    world.add(floor);

    this.dance = new FBXAnimation('Flair');
    this.dance.position.set(0, 0, 0);
    world.add(this.dance);

    this.createTestMaterials(world);
  }

  private createTestMaterials(world: Object3D) {
    const geom = new SphereGeometry(20);

    const items: Mesh[] = [];
    const mesh = new Mesh(geom, new MeshBasicMaterial({ name: 'BasicMaterial', transparent: true }));
    mesh.name = 'Basic';
    world.add(mesh);
    items.push(mesh);

    const mesh2 = new Mesh(geom, new MeshMatcapMaterial({ transparent: true }));
    mesh2.name = 'Matcap';
    world.add(mesh2);
    items.push(mesh2);

    const mesh5 = new Mesh(geom, new MeshPhongMaterial({ name: 'PhongMaterial', transparent: true }));
    mesh5.name = 'Phong';
    world.add(mesh5);
    items.push(mesh5);

    const mesh3 = new Mesh(geom, new MeshPhysicalMaterial({ name: 'PhysicalMaterial', transparent: true }));
    mesh3.name = 'Physical';
    world.add(mesh3);
    items.push(mesh3);

    // CustomMaterial
    const three = this.app.components.get('three') as RemoteThree;
    if (three.renderer.isWebGLRenderer) {
      this.customMat = new CustomShaderMaterial();
      const mesh4 = new Mesh(geom, this.customMat);
      mesh4.name = 'Shader';
      world.add(mesh4);
      items.push(mesh4);
    } else {
      // WebGPU
    }

    const spacing = 50;
    const total = items.length;
    const offset = ((total - 1) / 2) * spacing;
    for (let i = 0; i < total; i++) {
      const x = i * spacing - offset;
      items[i].position.set(x, 100, -150);
      items[i].castShadow = true;
    }
  }

  private createAnimation() {
    const theatre = this.app.components.get('theatre') as RemoteTheatre;
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
      'Break Dancer',
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

  override update() {
    this.clock.update();
    const delta = this.clock.getDelta();
    this.customMat?.update(delta);
    this.dance.update(delta);
  }
}
