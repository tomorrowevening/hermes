import { BackSide, CircleGeometry, DirectionalLight, HemisphereLight, Mesh, MeshBasicMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshPhysicalMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, SpotLight } from 'three';
import CustomMaterial from './CustomMaterial';
import { hierarchyUUID } from '../../editor/utils';
import { IS_DEV, app } from '../constants';
import FBXAnimation from './FBXAnimation';
import { cubeTextures, textures } from './loader';

export default class ExampleScene extends Scene {
  camera!: PerspectiveCamera;
  dance0!: FBXAnimation;
  dance1!: FBXAnimation;
  dance2!: FBXAnimation;

  private customMat!: CustomMaterial;
  private lastUpdate = -1;

  constructor() {
    super();
    this.name = 'TestScene';
    const envMap = cubeTextures.get('environment')!;
    this.background = envMap;

    if (app.editor) {
      const bg = new Mesh(new SphereGeometry(), new MeshBasicMaterial({ envMap: envMap, side: BackSide }));
      bg.name = 'bg';
      bg.scale.setScalar(1000);
      this.add(bg);
    }

    this.createCameras();
    this.createLights();
    this.createWorld();

    this.lastUpdate = Date.now();
    if (IS_DEV) hierarchyUUID(this);
  }

  private createCameras() {
    const cameras = new Object3D();
    cameras.name = 'cameras';
    this.add(cameras);

    this.camera = new PerspectiveCamera(90, 1, 10, 1000);
    this.camera.name = 'Main';
    this.camera.position.set(0, 100, 125);
    this.camera.lookAt(0, 50, 0);
    cameras.add(this.camera);
  }

  private createLights() {
    const lights = new Object3D();
    lights.name = 'lights';
    this.add(lights);

    const sun = new DirectionalLight(0xffffff, 0.25);
    sun.name = 'sun';
    sun.castShadow = true;
    sun.position.set(0, 50, 50);
    const shadow = 256;
    sun.shadow.camera.top = shadow;
    sun.shadow.camera.bottom = -shadow;
    sun.shadow.camera.left = - shadow;
    sun.shadow.camera.right = shadow;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 1000;
    sun.shadow.bias = 0.0001;
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

    this.dance0 = new FBXAnimation('Thriller2');
    this.dance0.position.set(-150, 0, -175);
    world.add(this.dance0);

    this.dance1 = new FBXAnimation('Flair');
    this.dance1.position.set(0, 0, 0);
    world.add(this.dance1);

    this.dance2 = new FBXAnimation('Thriller4');
    this.dance2.position.set(150, 0, -185);
    world.add(this.dance2);

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
    this.customMat = new CustomMaterial();
    const mesh4 = new Mesh(geom, this.customMat);
    mesh4.name = 'Shader';
    world.add(mesh4);
    items.push(mesh4);

    const spacing = 50;
    const total = items.length;
    const offset = ((total - 1) / 2) * spacing;
    for (let i = 0; i < total; i++) {
      const x = i * spacing - offset;
      items[i].position.set(x, 100, -150);
      items[i].castShadow = true;
    }
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    const now = Date.now();
    const delta = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;
    this.customMat.update(delta);
    this.dance0.update(delta);
    this.dance1.update(delta);
    this.dance2.update(delta);
  }
}
