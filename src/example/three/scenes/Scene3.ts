// Libs
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  PointLightHelper,
  RenderPipeline,
  WebGPURenderer,
} from 'three/webgpu';
import { pass, uniform, output, mrt, velocity, } from 'three/tsl';
import { motionBlur } from 'three/addons/tsl/display/MotionBlur.js';
import { fxaa } from 'three/addons/tsl/display/FXAANode.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import RemoteThree from '../../../core/remote/RemoteThree';
// Models
import { cubeTextures, textures } from '../loader';
// Views
import BaseScene from './BaseScene';
import Birds from '../Birds';
// Utils
import { hierarchyUUID } from '../../../utils/three';

export default class Scene3 extends BaseScene {
  birds?: Birds;
  controls?: OrbitControls;
  renderPipeline!: RenderPipeline;
  fpo!: Mesh;

  constructor() {
    super();
    this.name = 'Scene3';
    this.camera.position.set(0, 100, 500);
    this.camera.rotation.set(0, 0, 0);
  }

  override init(): void {
    const three = this.app.components.get('three') as RemoteThree;

    const envMap = cubeTextures.get('environment')!.clone();
    this.background = envMap;

    const sunLight = new DirectionalLight( '#ffffff', 0.15 );
    sunLight.position.set( 1, 4, 2 );
    sunLight.name = 'sunLight';
    this.add(sunLight);

    this.birds = new Birds();
    this.birds.useMRT = this.app.isApp;
    this.add(this.birds);

    const texture = textures.get('uv_grid')!.clone();
    texture!.needsUpdate = true;
    this.fpo = new Mesh(new BoxGeometry(50, 50, 50), new MeshStandardMaterial({ map: texture }));
    this.fpo.name = 'box';
    this.add(this.fpo);

    const radius = 500;
    ['#FF0000', '#00FF00', '#0000FF'].forEach((value: string, index: number) => {
      const percent = index / 3;
      const angle = Math.PI * 2 * percent;
      const light = new PointLight(value, 5, 1000, 0.05);
      light.name = `pointLight${index}`;
      light.position.x = Math.cos(angle) * radius;
      light.position.z = Math.sin(angle) * radius;
      this.add(light);

      const helper = new PointLightHelper(light, 100);
      this.add(helper);
    });

    // Post

    const blurAmount = uniform(1);
    const scenePass = pass(this, this.camera);

    scenePass.setMRT(mrt({
      output,
      velocity
    }));

    const beauty = scenePass.getTextureNode().toInspector( 'Color' );
    const vel = scenePass.getTextureNode( 'velocity' ).toInspector( 'Velocity' ).mul( blurAmount );
    const mBlur = motionBlur( beauty, vel );
    const fxaaPass = fxaa( mBlur );
    this.renderPipeline = new RenderPipeline( three.renderer! );
    this.renderPipeline.outputNode = fxaaPass;

    // Controls
    
    this.controls = new OrbitControls(this.camera, three.canvas);
    this.controls.enableDamping = true;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;

    if (this.app.isApp) {
      const gui = three.renderer!.inspector.createParameters( 'Motion Blur Settings' );
      gui.add( blurAmount, 'value', 0, 3 ).name( 'blur amount' );
    }

    hierarchyUUID(this);
    three.addScene(this);
    three.addCamera(this.camera);
    three.setScene(this);
  }

  override update(): void {
    const three = this.app.components.get('three') as RemoteThree;
    const renderer = three.renderer as WebGPURenderer;
    this.clock.update();
    const time = this.clock.getElapsed();
    this.birds?.savePrevCamera(this.camera);
    this.controls?.update();
    this.fpo.position.y = Math.sin(time * 6) * 25;
    this.fpo.rotation.y = time * Math.PI;
    this.birds?.update(this.clock.getDelta(), time, renderer);
  }

  override draw() {
    this.renderPipeline.render();
  }
}