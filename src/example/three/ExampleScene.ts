import { CircleGeometry, CubeTexture, CubeTextureLoader, DirectionalLight, HemisphereLight, Mesh, MeshBasicMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Texture, TextureLoader } from 'three';
import CustomMaterial from './CustomMaterial';
import { hierarchyUUID } from '@/editor/utils';
import { IS_DEV } from '../constants';
import FBXAnimation from './FBXAnimation';

export default class ExampleScene extends Scene {
  camera!: PerspectiveCamera;
  envMap: CubeTexture;
  dance0!: FBXAnimation;
  dance1!: FBXAnimation;

  private customMat!: CustomMaterial;
  private lastUpdate = -1;

  constructor() {
    super();
    this.name = 'TestScene';
    this.envMap = new CubeTextureLoader()
      .setPath('images/milkyWay/')
      .load([
        'dark-s_px.jpg',
        'dark-s_nx.jpg',
        'dark-s_py.jpg',
        'dark-s_ny.jpg',
        'dark-s_pz.jpg',
        'dark-s_nz.jpg'
      ], (value: CubeTexture) => {
        this.background = value;
      });

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

    this.camera = new PerspectiveCamera(60, 1, 1, 2000);
    this.camera.name = 'Main';
    this.camera.position.set(0, 200, 300);
    this.camera.lookAt(0, 0, 0);
    cameras.add(this.camera);
  }

  private createLights() {
    const lights = new Object3D();
    lights.name = 'lights';
    this.add(lights);

    const sun = new DirectionalLight();
    sun.name = 'sun';
    sun.position.set(0, 50, 200);
    lights.add(sun);

    const hemi = new HemisphereLight(0x0000ff, 0xff0000);
    hemi.name = 'hemi';
    lights.add(hemi);
  }

  private createWorld() {
    const world = new Object3D();
    world.name = 'world';
    this.add(world);

    const floor = new Mesh(new CircleGeometry(500, 36), new MeshPhongMaterial({ color: 0x666666 }));
    floor.name = 'floor';
    floor.rotateX(-Math.PI / 2);
    world.add(floor);

    this.dance0 = new FBXAnimation('Thriller Part 2.fbx');
    this.dance0.position.x = -100;
    world.add(this.dance0);

    this.dance1 = new FBXAnimation('Thriller Part 4.fbx');
    this.dance1.position.x = 100;
    world.add(this.dance1);

    this.createTestMaterials(world);
  }

  private createTestMaterials(world: Object3D) {
    const geom = new SphereGeometry(20);

    const items: Mesh[] = [];
    const mesh = new Mesh(geom, new MeshBasicMaterial({ transparent: true, name: 'BasicMaterial' }));
    mesh.name = 'Basic';
    world.add(mesh);
    items.push(mesh);

    const mesh2 = new Mesh(geom, new MeshMatcapMaterial({}));
    mesh2.name = 'Matcap';
    world.add(mesh2);
    items.push(mesh2);

    const mesh5 = new Mesh(geom, new MeshPhongMaterial({ name: 'PhongMaterial' }));
    mesh5.name = 'Phong';
    world.add(mesh5);
    items.push(mesh5);

    const mesh3Mat = new MeshPhysicalMaterial({
      transparent: true,
      name: 'PhysicalMaterial',
    });
    new TextureLoader().load('images/uv_grid_opengl.jpg', (texture: Texture) => {
      mesh3Mat.map = texture;
      mesh3Mat.needsUpdate = true;
    });
    const mesh3 = new Mesh(geom, mesh3Mat);
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
      items[i].position.set(x, 100, -100);
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
  }
}
