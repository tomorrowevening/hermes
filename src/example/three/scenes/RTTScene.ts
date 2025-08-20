import {
  Color,
  DirectionalLight,
  Mesh,
  MeshNormalMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  RenderTarget,
  SphereGeometry,
  TorusKnotGeometry,
  Vector3,
} from 'three';
import { IS_DEV } from '../../constants';
import { hierarchyUUID } from '../../../utils/three';
import { cubeTextures } from '../loader';
import BaseScene from './BaseScene';
import RemoteThree from '../../../core/remote/RemoteThree';

const zero3 = new Vector3();

export default class RTTScene extends BaseScene {
  renderTarget: RenderTarget;
  mesh: Mesh;

  constructor() {
    super();
    this.name = 'RTTScene';
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(zero3);
  }

  override init(): void {
    const envMap = cubeTextures.get('environment')!.clone();
    this.background = envMap;

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

    const three = this.app.components.get('three') as RemoteThree;
    three.addScene(this);
    three.addCamera(this.camera);
  }

  override dispose(): void {
    const three = this.app.components.get('three') as RemoteThree;
    three.removeCamera(this.camera);
    three.removeScene(this);
    super.dispose();
  }

  override draw() {
    const time = this.clock.getElapsedTime();
    const radius = 100;
    const angle = time * 0.05 * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    this.camera.position.set(x, 0, z);
    this.camera.lookAt(zero3);

    // Draw
    if (this.renderer) {
      if (this.renderer.isWebGLRenderer) {
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.clear();
        this.renderer.render(this, this.camera);
        this.renderer.setRenderTarget(null);
      } else {
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.clearAsync();
        this.renderer.renderAsync(this, this.camera);
        this.renderer.setRenderTarget(null);
      }
    }
  }
}
