import { DirectionalLight, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshPhysicalMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, Texture, TextureLoader, WebGLRenderer } from 'three'
import CustomMaterial from './CustomMaterial';

export default class ExampleScene {
  renderer: WebGLRenderer;
  scene: Scene;

  private camera: PerspectiveCamera;
  private customMat: CustomMaterial;
  private lastUpdate = -1;

  constructor() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);

    // Scene

    this.scene = new Scene();
    this.scene.name = 'Example Scene';

    // Cameras

    const cameras = new Object3D();
    cameras.name = 'cameras';
    this.scene.add(cameras);

    this.camera = new PerspectiveCamera(60, 1, 1, 2000);
    this.camera.name = 'mainCamera';
    this.camera.position.z = 300;
    cameras.add(this.camera);

    // Lighting

    const sun = new DirectionalLight();
    sun.name = 'sun';
    sun.position.set(0, 50, 200);
    this.scene.add(sun);

    // World
    
    const world = new Object3D();
    world.name = 'world';
    this.scene.add(world);

    const geom = new SphereGeometry(45);

    const mesh = new Mesh(geom, new MeshNormalMaterial({ name: 'normalMaterial' }));
    mesh.name = 'sphere-normal';
    world.add(mesh);

    const mesh2 = new Mesh(geom, new MeshBasicMaterial({ transparent: true, name: 'basicMaterial', wireframe: true }));
    mesh2.name = 'sphere-basic';
    mesh2.position.x = 100;
    world.add(mesh2);

    const mesh3Mat = new MeshPhysicalMaterial({
      transparent: true,
      name: 'physicalMaterial'
    });
    new TextureLoader().load('uv_grid_opengl.jpg', (texture: Texture) => {
      mesh3Mat.map = texture;
      mesh3Mat.needsUpdate = true;
    });
    const mesh3 = new Mesh(geom, mesh3Mat);
    mesh3.name = 'sphere-physical';
    mesh3.position.x = -100;
    world.add(mesh3);

    // CustomMaterial
    this.customMat = new CustomMaterial();
    const mesh4 = new Mesh(geom, this.customMat);
    mesh4.name = 'sphere-shader';
    mesh4.position.y = -100;
    world.add(mesh4);

    this.lastUpdate = Date.now();
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  draw() {
    const now = Date.now();
    const delta = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;
    this.customMat.update(delta);
    this.renderer.render(this.scene, this.camera);
  }
}
