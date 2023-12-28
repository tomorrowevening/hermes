import { DirectionalLight, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshPhysicalMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'

export default class ExampleScene {
	renderer: WebGLRenderer;
	scene: Scene;

	private camera: PerspectiveCamera;

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

    const mesh = new Mesh(new SphereGeometry(50), new MeshNormalMaterial())
    mesh.name = 'sphere'
    world.add(mesh)

    const mesh2 = new Mesh(new SphereGeometry(50), new MeshBasicMaterial({ transparent: true }))
    mesh2.name = 'sphere2'
    mesh2.position.x = 100;
    world.add(mesh2);

    const mesh3 = new Mesh(new SphereGeometry(50), new MeshPhysicalMaterial({ transparent: true }))
    mesh3.name = 'sphere3'
    mesh3.position.x = -100;
    world.add(mesh3);
	}

	resize(width: number, height: number) {
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(width, height)
	}

	draw() {
		this.renderer.render(this.scene, this.camera);
	}
}
