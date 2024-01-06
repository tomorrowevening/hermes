import { AmbientLight, CubeTexture, CubeTextureLoader, DirectionalLight, HemisphereLight, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, SpotLight, SpotLightHelper, Texture, TextureLoader } from 'three'
import CustomMaterial from './CustomMaterial';
import { hierarchyUUID } from '@/editor/utils';

export default class ExampleScene extends Scene {
  camera!: PerspectiveCamera;

  private customMat!: CustomMaterial;
  private lastUpdate = -1;

  constructor() {
    super();
    this.name = 'TestScene';
    this.background = new CubeTextureLoader()
      .setPath('images/milkyWay/')
      .load([
        'dark-s_px.jpg',
        'dark-s_nx.jpg',
        'dark-s_py.jpg',
        'dark-s_ny.jpg',
        'dark-s_pz.jpg',
        'dark-s_nz.jpg'
      ]);

    this.createCameras();
    this.createLights();
    this.createWorld();

    this.lastUpdate = Date.now();
    hierarchyUUID(this);
    console.log(this);
  }

  private createCameras() {
    const cameras = new Object3D();
    cameras.name = 'cameras';
    this.add(cameras);

    this.camera = new PerspectiveCamera(60, 1, 1, 2000);
    this.camera.name = 'Main';
    this.camera.position.z = 300;
    cameras.add(this.camera);
  }

  private createLights() {
    const lights = new Object3D();
    lights.name = 'lights';
    this.add(lights);

    const ambient = new AmbientLight(0xffffff, 0.1);
    ambient.name = 'ambient';
    lights.add(ambient);

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

    const geom = new SphereGeometry(45);

    const mesh = new Mesh(geom, new MeshNormalMaterial({ name: 'NormalMaterial' }));
    mesh.name = 'Normal';
    world.add(mesh);

    const mesh2 = new Mesh(geom, new MeshBasicMaterial({ transparent: true, name: 'BasicMaterial' }));
    mesh2.name = 'Basic';
    mesh2.position.x = 100;
    world.add(mesh2);

    const mesh3Mat = new MeshPhysicalMaterial({
      transparent: true,
      name: 'PhysicalMaterial'
    });
    new TextureLoader().load('images/uv_grid_opengl.jpg', (texture: Texture) => {
      mesh3Mat.map = texture;
      mesh3Mat.needsUpdate = true;
    });
    const mesh3 = new Mesh(geom, mesh3Mat);
    mesh3.name = 'Physical';
    mesh3.position.x = -100;
    world.add(mesh3);

    // CustomMaterial
    this.customMat = new CustomMaterial();
    const mesh4 = new Mesh(geom, this.customMat);
    mesh4.name = 'Shader';
    mesh4.position.y = -100;
    world.add(mesh4);

    const mesh5 = new Mesh(geom, new MeshPhongMaterial({ name: 'PhongMaterial' }));
    mesh5.name = 'Phong';
    mesh5.position.y = 100;
    world.add(mesh5);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  // @ts-ignore
  override onBeforeRender() {
    const now = Date.now();
    const delta = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;
    this.customMat.update(delta);
  }
}
