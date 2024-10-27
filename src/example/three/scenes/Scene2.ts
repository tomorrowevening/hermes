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
  SkinnedMesh,
  SphereGeometry,
  SplineCurve,
  SpotLight,
  Vector2,
  WebGLRenderer,
} from 'three';
// @ts-ignore
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { IS_DEV, app } from '../../constants';
import RemoteTheatre from '../../../core/remote/RemoteTheatre';
import { hierarchyUUID } from '../../../editor/utils';
import BaseScene from './BaseScene';
import FBXAnimation from '../FBXAnimation';
import { cubeTextures, textures } from '../loader';
import RemoteThree from '../../../core/remote/RemoteThree';
import CustomMaterial from '../CustomMaterial';
import RTTScene from './RTTScene';

const customGroupName = 'Custom Group';

export default class Scene2 extends BaseScene {
  dance!: FBXAnimation;
  rttScene!: RTTScene;
  speed = 1;

  constructor(renderer: WebGLRenderer) {
    super(renderer);
    this.name = 'Scene2';
    this.camera.position.set(0, 100, 125);
    this.camera.lookAt(0, 50, 0);

    this.createLights();
    this.createWorld();
    this.createAnimation();
    if (IS_DEV) hierarchyUUID(this);

    const three = app.components.get('three') as RemoteThree;
    three.addScene(this);
    three.setScene(this);
    three.addCamera(this.camera);
    if (three.renderer) this.renderer = three.renderer;
  }

  override dispose(): void {
    const three = app.components.get('three') as RemoteThree;
    three.removeGroup(customGroupName);
    three.removeScene(this.rttScene);
    super.dispose();
  }

  private createLights() {
    RectAreaLightUniformsLib.init();

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

    const rectLight = new RectAreaLight(0xff0000, 1, 300, 100);
    rectLight.name = 'rectLight';
    rectLight.position.set(250, 100, 100);
    rectLight.lookAt(0, 50, 0);
    lights.add(rectLight);
  }

  private createWorld() {
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

    this.rttScene = new RTTScene();
    const three = app.components.get('three') as RemoteThree;
    three.addScene(this.rttScene);

    const rttMat = new MeshBasicMaterial();
    rttMat.map = this.rttScene.renderTarget.texture;
    const rttExample = new Mesh(new PlaneGeometry(100, 100), rttMat);
    rttExample.name = 'rttExample';
    rttExample.position.set(-120, 50, -100);
    world.add(rttExample);

    const testShader = new Mesh(new PlaneGeometry(100, 100), new CustomMaterial());
    testShader.name = 'testShader';
    testShader.position.set(0, 50, -100);
    world.add(testShader);

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
    const theatre = app.components.get('theatre') as RemoteTheatre;
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

    theatre.playSheet(this.name, { iterationCount: Infinity });
  }

  override update(): void {
    const delta = this.clock.getDelta();
    this.dance.update(delta * this.speed);
    if (this.renderer) this.rttScene.draw(this.clock.getElapsedTime(), this.renderer);
  }
}
