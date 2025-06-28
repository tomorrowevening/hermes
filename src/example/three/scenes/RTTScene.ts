import {
  Color,
  DirectionalLight,
  Mesh,
  MeshNormalMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  RenderTarget,
  Scene,
  SphereGeometry,
  TorusKnotGeometry,
  Vector3,
} from 'three';
import { IS_DEV } from '../../constants';
import { hierarchyUUID } from '../../../utils/three';
import { cubeTextures } from '../loader';

const zero3 = new Vector3();

export default class RTTScene extends Scene {
  renderTarget: RenderTarget;
  camera: PerspectiveCamera;
  mesh: Mesh;

  constructor() {
    super();
    this.name = 'RTTScene';

    const envMap = cubeTextures.get('environment')!.clone();
    this.background = envMap;

    this.camera = new PerspectiveCamera(60, 1, 10, 2000);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(zero3);

    const light = new DirectionalLight(new Color(0xffffff), 1);
    light.name = 'sun';
    this.add(light);

    this.mesh = new Mesh(
      new TorusKnotGeometry(10, 3, 100, 6),
      new MeshPhysicalMaterial({ envMap: envMap, envMapIntensity: 10 })
    );
    this.mesh.name = 'normalMesh';
    this.add(this.mesh);

    const ball = new Mesh(new SphereGeometry(10), new MeshNormalMaterial());
    ball.name = 'ball';
    ball.position.set(25, 25, 0);
    this.add(ball);

    const floor = new Mesh(
      new PlaneGeometry(200, 200),
      new MeshPhysicalMaterial({
        envMap: envMap,
      })
    );
    floor.name = 'floor';
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -20, 0);
    this.add(floor);

    this.renderTarget = new RenderTarget(512, 512);

    if (IS_DEV) hierarchyUUID(this);
  }

  draw(time: number, renderer: any) {
    const radius = 100;
    const angle = time * 0.05 * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    this.camera.position.set(x, 0, z);
    this.camera.lookAt(zero3);

    // Draw
    if (renderer.isWebGLRenderer) {
      renderer.setRenderTarget(this.renderTarget);
      renderer.render(this, this.camera);
      renderer.setRenderTarget(null);
    } else {
      renderer.setRenderTarget(this.renderTarget);
      renderer.renderAsync(this, this.camera);
      renderer.setRenderTarget(null);
    }
  }
}
