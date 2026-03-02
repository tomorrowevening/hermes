import {
  CircleGeometry,
  Color,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshPhysicalMaterial,
  Object3D,
  PlaneGeometry,
  Points,
  PointsMaterial,
  RectAreaLight,
  RenderPipeline,
  SkinnedMesh,
  SphereGeometry,
  SpotLight,
} from 'three/webgpu';
import { pass, uniform, output, mrt, velocity } from 'three/tsl';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { motionBlur } from 'three/addons/tsl/display/MotionBlur.js';
import RemoteTheatre from '../../../core/remote/RemoteTheatre';
import { dispose, hierarchyUUID } from '../../../utils/three';
import BaseScene from './BaseScene';
import FBXAnimation from '../FBXAnimation';
import { cubeTextures, textures } from '../loader';
import RemoteThree from '../../../core/remote/RemoteThree';
// import CustomShaderMaterial from '../CustomShaderMaterial';
import RTTScene from './RTTScene';
import Application from '../../../core/Application';

const customGroupName = 'Custom Group';

export default class Scene2 extends BaseScene {
  dance!: FBXAnimation;
  rttScene: RTTScene;
  speed = 1;
  renderPipeline!: RenderPipeline;

  constructor() {
    super();
    this.name = 'Scene2';

    this.rttScene = new RTTScene();
  }

  override setup(app: Application, renderer?: any): void {
    super.setup(app, renderer);
    this.rttScene.setup(app, renderer);
  }

  override init(): void {
    this.rttScene.init();

    const three = this.app.components.get('three') as RemoteThree;

    this.camera.position.set(0, 50, 75);
    this.camera.lookAt(0, 50, 0);

    this.createLights();
    this.createWorld();
    this.createAnimation();
    hierarchyUUID(this);

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

    this.renderPipeline = new RenderPipeline( three.renderer! );
    this.renderPipeline.outputNode = mBlur;

    if (this.app.isApp) {
      const gui = three.renderer!.inspector.createParameters( 'Motion Blur Settings' );
      gui.add( blurAmount, 'value', 0, 3 ).name( 'blur amount' );
    }

    three.addScene(this);
    three.addCamera(this.camera);
    three.setScene(this);

    if (three.renderer) this.renderer = three.renderer;
  }

  override dispose(): void {
    const three = this.app.components.get('three') as RemoteThree;
    three.removeCamera(this.camera);
    three.removeGroup(customGroupName);
    dispose(this.rttScene);
    super.dispose();
  }

  private createLights() {
    const three = this.app.components.get('three') as RemoteThree;
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

    // Rect Light
    if (three.renderer !== undefined && three.renderer.isWebGLRenderer) {
      RectAreaLightUniformsLib.init();
      const rectLight = new RectAreaLight(0xff0000, 1, 300, 100);
      rectLight.name = 'rectLight';
      rectLight.position.set(250, 100, 100);
      rectLight.lookAt(0, 50, 0);
      lights.add(rectLight);
    }
  }

  private createWorld() {
    const three = this.app.components.get('three') as RemoteThree;
    const envMap = cubeTextures.get('environment')!.clone();
    this.background = envMap;
    
    const world = new Object3D();
    world.name = 'world';
    this.add(world);

    const gridTexture = textures.get('uv_grid')!;
    gridTexture.repeat.setScalar(10);
    gridTexture.needsUpdate = true;
    const floorMaterial = new MeshPhysicalMaterial({
      map: gridTexture,
      envMap: envMap,
    });
    const floor = new Mesh(new CircleGeometry(250, 36), floorMaterial);
    floor.name = 'floor';
    floor.receiveShadow = true;
    floor.position.y = -2;
    floor.rotateX(-Math.PI / 2);
    world.add(floor);

    const points = new Points(new SphereGeometry(50), new PointsMaterial({ size: 0.5 }));
    points.name = 'points';
    points.position.set(-100, 50, 0);
    world.add(points);

    const lines = new LineSegments(new SphereGeometry(50), new LineBasicMaterial());
    lines.name = 'lines';
    lines.position.set(100, 50, 0);
    world.add(lines);

    const rttMat = new MeshBasicMaterial();
    rttMat.map = this.rttScene.renderTarget.texture;
    const rttExample = new Mesh(new PlaneGeometry(100, 100), rttMat);
    rttExample.name = 'rttExample';
    rttExample.position.set(-75, 50, -125);
    world.add(rttExample);

    if (three.renderer.isWebGLRenderer) {
      // const testShader = new Mesh(new PlaneGeometry(100, 100), new CustomShaderMaterial());
      // testShader.name = 'customShaderMaterial';
      // testShader.position.set(75, 50, -125);
      // world.add(testShader);
    } else {
      // WebGPU
      rttExample.scale.y = -1;
    }

    this.dance = new FBXAnimation('Flair');
    this.dance.name = 'flair';
    this.dance.traverse((obj: Object3D) => {
      if (obj instanceof SkinnedMesh) {
        const mesh = obj as SkinnedMesh;
        mesh.material = new MeshMatcapMaterial();
      }
    });
    world.add(this.dance);

    // Custom Groups
    three.addGroup({
      title: customGroupName,
      items: [
        {
          title: 'Speed',
          prop: 'speed',
          value: 1,
          min: 0,
          max: 2,
          step: 0.01,
          type: 'range',
        },
        {
          title: 'Name',
          prop: 'name',
          value: 'Hello World!',
          type: 'string',
        },
        {
          title: 'Color',
          prop: 'color',
          value: new Color(0xff0000),
          // value: 0xff0000,
          type: 'color',
        },
      ],
      onUpdate: (prop: string, value: any) => {
        console.log(prop, value);
        switch (prop) {
          case 'speed':
            this.speed = value;
            break;
        }
      }
    });
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
  }

  override update(): void {
    this.clock.update();
    const delta = this.clock.getDelta();
    this.dance.update(delta * this.speed);
    this.rttScene.update();
    this.rttScene.draw();
  }

  override draw() {
    this.renderPipeline.render();
  }

  override resize(width: number, height: number): void {
    super.resize(width, height);
    this.rttScene.resize(width, height);
  }
}
