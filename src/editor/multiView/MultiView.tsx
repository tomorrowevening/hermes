// Libs
import { Component, ReactNode, RefObject, createRef } from 'react';
import {
  AxesHelper,
  Box3,
  Camera,
  CameraHelper,
  Clock,
  DirectionalLight,
  DirectionalLightHelper,
  Group,
  HemisphereLight,
  HemisphereLightHelper,
  Material,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshNormalMaterial,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  Quaternion,
  Raycaster,
  RectAreaLight,
  Scene,
  SkinnedMesh,
  Sphere,
  Spherical,
  SpotLight,
  SpotLightHelper,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { degToRad, mapLinear } from 'three/src/math/MathUtils';
import CameraControls from 'camera-controls';
import RemoteThree from '@/core/remote/RemoteThree';
import CameraWindow, { Dropdown } from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';
import { InteractionMode, MultiViewMode, RenderMode } from './MultiViewData';
// Models
import { ToolEvents, debugDispatcher } from '../global';
// Components
import './MultiView.scss';
import UVMaterial from './UVMaterial';
// Tools
import SplineEditor from '../tools/splineEditor';
import Transform from '../tools/Transform';
// Utils
import { dispose, mix } from '../utils';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { InspectTransform } from '../sidePanel/inspector/utils/InspectTransform';

type LightHelper = DirectionalLightHelper | HemisphereLightHelper | RectAreaLightHelper | PointLightHelper | SpotLightHelper

type MultiViewProps = {
  three: RemoteThree;
  scenes: Map<string, any>;
  onSceneSet?: (scene: Scene) => void;
  onSceneUpdate?: (scene: Scene) => void;
  onSceneResize?: (scene: Scene, width: number, height: number) => void;
}

type MultiViewState = {
  mode: MultiViewMode;
  modeOpen: boolean;
  renderModeOpen: boolean;
  interactionMode: InteractionMode;
  interactionModeOpen: boolean;
  lastUpdate: number;
}

const ModeOptions: MultiViewMode[] = [
  'Single',
  'Side by Side',
  'Stacked',
  'Quad'
];

export default class MultiView extends Component<MultiViewProps, MultiViewState> {
  static instance: MultiView | null = null;

  scene = new Scene();
  renderer?: WebGLRenderer | null;
  currentScene?: Scene;
  cameras: Map<string, Camera> = new Map();
  controls: Map<string, OrbitControls> = new Map();
  currentCamera!: PerspectiveCamera | OrthographicCamera;

  private cameraHelpers: Map<string, CameraHelper> = new Map();
  private lightHelpers: Map<string, LightHelper> = new Map();
  private helpersContainer = new Group();
  private grid = new InfiniteGridHelper();
  private axisHelper = new AxesHelper(500);
  private interactionHelper = new AxesHelper(100);
  private currentTransform?: TransformControls;

  // Tools
  private splineEditor!: SplineEditor;

  // Override Materials
  private depthMaterial = new MeshDepthMaterial();
  private normalsMaterial = new MeshNormalMaterial();
  private uvMaterial =  new UVMaterial();
  private wireframeMaterial =  new MeshBasicMaterial({
    opacity: 0.33,
    transparent: true,
    wireframe: true
  });

  // Playback
  private playing = false;
  private rafID = -1;
  private width = 0;
  private height = 0;

  // Windows
  private sceneSet = false;
  private tlCam: any = null;
  private trCam: any = null;
  private blCam: any = null;
  private brCam: any = null;
  private tlRender: RenderMode = 'Renderer';
  private trRender: RenderMode = 'Renderer';
  private blRender: RenderMode = 'Renderer';
  private brRender: RenderMode = 'Renderer';

  // Interactions
  selectedItem: Object3D | undefined = undefined;
  private debugCamera!: PerspectiveCamera;
  private raycaster = new Raycaster();
  private pointer = new Vector2();
  private cameraControls: CameraControls | undefined = undefined;

  // References
  private canvasRef!: RefObject<HTMLCanvasElement>;
  private containerRef!: RefObject<HTMLDivElement>;
  private tlWindow!: RefObject<HTMLDivElement>;
  private trWindow!: RefObject<HTMLDivElement>;
  private blWindow!: RefObject<HTMLDivElement>;
  private brWindow!: RefObject<HTMLDivElement>;
  private currentWindow: any; // RefObject to one of the "windows"

  constructor(props: MultiViewProps) {
    super(props);

    // Refs
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.containerRef = createRef<HTMLDivElement>();
    this.tlWindow = createRef<HTMLDivElement>();
    this.trWindow = createRef<HTMLDivElement>();
    this.blWindow = createRef<HTMLDivElement>();
    this.brWindow = createRef<HTMLDivElement>();

    // States
    const appID = props.three.app.appID;
    const ls = localStorage;
    const savedMode = ls.getItem(`${appID}_mode`);

    this.state = {
      mode: savedMode !== null ? savedMode as MultiViewMode : 'Single',
      modeOpen: false,
      renderModeOpen: false,
      interactionMode: 'Orbit',
      interactionModeOpen: false,
      lastUpdate: Date.now(),
    };

    // Save Local Storage
    ls.setItem(`${appID}_mode`, this.state.mode);
    ls.setItem(`${appID}_tlCam`, ls.getItem(`${appID}_tlCam`) !== null ? ls.getItem(`${appID}_tlCam`) as string : 'Debug');
    ls.setItem(`${appID}_trCam`, ls.getItem(`${appID}_trCam`) !== null ? ls.getItem(`${appID}_trCam`) as string : 'Orthographic');
    ls.setItem(`${appID}_blCam`, ls.getItem(`${appID}_blCam`) !== null ? ls.getItem(`${appID}_blCam`) as string : 'Front');
    ls.setItem(`${appID}_brCam`, ls.getItem(`${appID}_brCam`) !== null ? ls.getItem(`${appID}_brCam`) as string : 'Top');
    ls.setItem(`${appID}_tlRender`, ls.getItem(`${appID}_tlRender`) !== null ? ls.getItem(`${appID}_tlRender`) as string : 'Renderer');
    ls.setItem(`${appID}_trRender`, ls.getItem(`${appID}_trRender`) !== null ? ls.getItem(`${appID}_trRender`) as string : 'Renderer');
    ls.setItem(`${appID}_blRender`, ls.getItem(`${appID}_blRender`) !== null ? ls.getItem(`${appID}_blRender`) as string : 'Renderer');
    ls.setItem(`${appID}_brRender`, ls.getItem(`${appID}_brRender`) !== null ? ls.getItem(`${appID}_brRender`) as string : 'Renderer');

    const THREE = {
      Vector2,
      Vector3,
      Vector4,
      Quaternion,
      Matrix4,
      Spherical,
      Box3,
      Sphere,
      Raycaster,
    };
    CameraControls.install({ THREE });
    this.setupScene();
    this.setupTools();

    // Static-access
    MultiView.instance = this;
  }

  componentDidMount(): void {
    this.setupRenderer();
    this.enable();
    this.assignControls();
    this.resize();
    this.play();
    this.splineEditor.initDebug();

    Transform.instance.three = this.props.three;
    Transform.instance.activeCamera = this.debugCamera;
  }

  componentDidUpdate(prevProps: Readonly<MultiViewProps>, prevState: Readonly<MultiViewState>, snapshot?: any): void {
    if (prevState.mode !== this.state.mode) {
      this.assignControls();
      this.resize();
    }
  }

  componentWillUnmount(): void {
    this.disable();
  }

  render(): ReactNode {
    const cameraOptions: string[] = [];
    this.cameras.forEach((_: Camera, key: string) => {
      cameraOptions.push(key);
    });

    return (
      <div className='multiview'>
        <canvas ref={this.canvasRef} />

        <div className={`cameras ${this.state.mode === 'Single' || this.state.mode === 'Stacked' ? 'single' : ''}`} ref={this.containerRef}>
          {this.state.mode === 'Single' && (
            <>
              <CameraWindow
                camera={this.tlCam}
                options={cameraOptions}
                ref={this.tlWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.tlCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.tlCam);
                    this.tlCam = camera;
                    localStorage.setItem(`${this.appID}_tlCam`, camera.name);
                    this.createControls(camera, this.tlWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.tlRender = value;
                  localStorage.setItem(`${this.appID}_tlRender`, value);
                }}
              />
            </>
          )}

          {(this.state.mode === 'Side by Side' || this.state.mode === 'Stacked') && (
            <>
              <CameraWindow
                camera={this.tlCam}
                options={cameraOptions}
                ref={this.tlWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.tlCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.tlCam);
                    this.tlCam = camera;
                    localStorage.setItem(`${this.appID}_tlCam`, camera.name);
                    this.createControls(camera, this.tlWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.tlRender = value;
                  localStorage.setItem(`${this.appID}_tlRender`, value);
                }}
              />
              <CameraWindow
                camera={this.trCam}
                options={cameraOptions}
                ref={this.trWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.trCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.trCam);
                    this.trCam = camera;
                    localStorage.setItem(`${this.appID}_trCam`, camera.name);
                    this.createControls(camera, this.trWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.trRender = value;
                  localStorage.setItem(`${this.appID}_trRender`, value);
                }}
              />
            </>
          )}

          {this.state.mode === 'Quad' && (
            <>
              <CameraWindow
                camera={this.tlCam}
                options={cameraOptions}
                ref={this.tlWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.tlCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.tlCam);
                    this.tlCam = camera;
                    localStorage.setItem(`${this.appID}_tlCam`, camera.name);
                    this.createControls(camera, this.tlWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.tlRender = value;
                  localStorage.setItem(`${this.appID}_tlRender`, value);
                }}
              />
              <CameraWindow
                camera={this.trCam}
                options={cameraOptions}
                ref={this.trWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.trCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.trCam);
                    this.trCam = camera;
                    localStorage.setItem(`${this.appID}_trCam`, camera.name);
                    this.createControls(camera, this.trWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.trRender = value;
                  localStorage.setItem(`${this.appID}_trRender`, value);
                }}
              />
              <CameraWindow
                camera={this.blCam}
                options={cameraOptions}
                ref={this.blWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.blCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.blCam);
                    this.blCam = camera;
                    localStorage.setItem(`${this.appID}_blCam`, camera.name);
                    this.createControls(camera, this.blWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.blRender = value;
                  localStorage.setItem(`${this.appID}_blRender`, value);
                }}
              />
              <CameraWindow
                camera={this.brCam}
                options={cameraOptions}
                ref={this.brWindow}
                onSelectCamera={(value: string) => {
                  this.controls.get(this.brCam.name)?.dispose();
                  const camera = this.cameras.get(value);
                  if (camera !== undefined) {
                    this.clearCamera(this.brCam);
                    this.brCam = camera;
                    localStorage.setItem(`${this.appID}_brCam`, camera.name);
                    this.createControls(camera, this.brWindow.current!);
                  }
                }}
                onSelectRenderMode={(value: RenderMode) => {
                  this.brRender = value;
                  localStorage.setItem(`${this.appID}_brRender`, value);
                }}
              />
            </>
          )}
        </div>

        <div className='settings' key={this.state.lastUpdate}>
          {/* Mode */}
          <Dropdown
            title='View'
            index={ModeOptions.indexOf(this.state.mode)}
            options={ModeOptions}
            onSelect={(value: string) => {
              if (value === this.state.mode) return;
              this.killControls();
              this.setState({ mode: value as MultiViewMode });
            }}
            open={this.state.modeOpen}
            onToggle={(value: boolean) => {
              this.setState({
                modeOpen: value,
                renderModeOpen: false,
                interactionModeOpen: false,
              });
            }}
          />

          {/* Interaction Mode */}
          <Dropdown
            title='Interact'
            index={this.state.interactionMode === 'Orbit' ? 0 : 1}
            options={[
              'Orbit Mode',
              'Selection Mode',
            ]}
            onSelect={(value: string) => {
              this.interactionHelper.visible = value === 'Selection Mode';
              this.setState({ interactionMode: this.interactionHelper.visible ? 'Selection' : 'Orbit' });
            }}
            open={this.state.interactionModeOpen}
            onToggle={(value: boolean) => {
              this.setState({
                modeOpen: false,
                renderModeOpen: false,
                interactionModeOpen: value,
              });
            }}
          />
        </div>
      </div>
    );
  }

  // Setup

  private setupRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvasRef.current!,
      stencil: false
    });
    this.renderer.autoClear = false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setClearColor(0x000000);
    this.props.three.renderer = this.renderer;
  }

  private setupScene() {
    this.scene.name = 'Debug Scene';
    this.scene.uuid = '';

    this.helpersContainer.name = 'helpers';
    this.scene.add(this.helpersContainer);

    this.helpersContainer.add(this.grid);

    this.axisHelper.name = 'axisHelper';
    this.helpersContainer.add(this.axisHelper);

    this.interactionHelper.name = 'interactionHelper';
    this.helpersContainer.add(this.interactionHelper);
    this.interactionHelper.visible = false;

    // Create default cameras

    const createOrtho = (name: string, position: Vector3) => {
      const camera = new OrthographicCamera(-100, 100, 100, -100, 50, 5000);
      camera.name = name;
      camera.position.copy(position);
      camera.lookAt(0, 0, 0);
      this.cameras.set(name, camera);
      return camera;
    };

    createOrtho('Top', new Vector3(0, 1000, 0));
    createOrtho('Bottom', new Vector3(0, -1000, 0));
    createOrtho('Left', new Vector3(-1000, 0, 0));
    createOrtho('Right', new Vector3(1000, 0, 0));
    createOrtho('Front', new Vector3(0, 0, 1000));
    createOrtho('Back', new Vector3(0, 0, -1000));
    createOrtho('Orthographic', new Vector3(1000, 1000, 1000));
    createOrtho('UI', new Vector3());

    this.debugCamera = new PerspectiveCamera(60, 1, 50, 5000);
    this.debugCamera.name = 'Debug';
    this.debugCamera.position.set(500, 500, 500);
    this.debugCamera.lookAt(0, 0, 0);
    this.cameras.set('Debug', this.debugCamera);

    // Assign cameras
    this.currentCamera = this.debugCamera;

    const ls = localStorage;
    const appID = this.props.three.app.appID;
    this.tlCam = this.cameras.get(ls.getItem(`${appID}_tlCam`) as string);
    this.trCam = this.cameras.get(ls.getItem(`${appID}_trCam`) as string);
    this.blCam = this.cameras.get(ls.getItem(`${appID}_blCam`) as string);
    this.brCam = this.cameras.get(ls.getItem(`${appID}_brCam`) as string);

    // In case a scene-specific camera was used and isn't available, defer to default cameras
    if (this.tlCam === undefined) this.tlCam = this.cameras.get('Debug');
    if (this.trCam === undefined) this.trCam = this.cameras.get('Orthographic');
    if (this.blCam === undefined) this.blCam = this.cameras.get('Front');
    if (this.brCam === undefined) this.brCam = this.cameras.get('Top');
  }

  private setupTools() {
    console.log('spline setup');
    this.splineEditor = new SplineEditor(this.currentCamera);
    this.scene.add(this.splineEditor);
  }

  // Public

  play() {
    this.playing = true;
    this.onUpdate();
  }

  pause() {
    this.playing = false;
    cancelAnimationFrame(this.rafID);
    this.rafID = -1;
  }

  toggleOrbitControls(value: boolean) {
    this.controls.forEach((orbit: OrbitControls) => {
      orbit.enabled = !value;
    });
  }

  // Playback

  private update() {
    // Updates
    this.controls.forEach((control: OrbitControls) => {
      control.update();
    });
    this.cameraHelpers.forEach((helper: CameraHelper) => {
      helper.update();
    });
    this.lightHelpers.forEach((helper: LightHelper) => {
      if (helper['update'] !== undefined) helper['update']();
    });

    if (this.props.onSceneUpdate !== undefined && this.sceneSet) this.props.onSceneUpdate(this.currentScene!);
  }

  private draw() {
    this.renderer?.clear();
    // console.log(this.state.mode);
    switch (this.state.mode) {
      case 'Single':
        this.drawSingle();
        break;
      case 'Side by Side':
      case 'Stacked':
        this.drawDouble();
        break;
      case 'Quad':
        this.drawQuad();
        break;
    }
  }

  private onUpdate = () => {
    if (!this.playing) return;
    this.update();
    this.draw();
    this.rafID = requestAnimationFrame(this.onUpdate);
  };

  // Events

  private enable() {
    const element = this.containerRef.current!;
    element.addEventListener('mousemove', this.onMouseMove);
    element.addEventListener('click', this.onClick);
    window.addEventListener('keydown', this.onKey);
    window.addEventListener('resize', this.resize);
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, this.sceneUpdate);
    debugDispatcher.addEventListener(ToolEvents.ADD_CAMERA, this.addCamera);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_CAMERA, this.removeCamera);
    debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, this.onSetSelectedItem);
  }

  private disable() {
    const element = this.containerRef.current!;
    element.removeEventListener('mousemove', this.onMouseMove);
    element.removeEventListener('click', this.onClick);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('resize', this.resize);
    debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, this.sceneUpdate);
    debugDispatcher.removeEventListener(ToolEvents.ADD_CAMERA, this.addCamera);
    debugDispatcher.removeEventListener(ToolEvents.REMOVE_CAMERA, this.removeCamera);
    debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, this.onSetSelectedItem);
  }

  private resize = () => {
    this.width = window.innerWidth - 300;
    this.height = window.innerHeight;
    const bw = Math.floor(this.width / 2);
    const bh = Math.floor(this.height / 2);
    this.props.three.resize(this.width, this.height);

    if (this.props.onSceneResize !== undefined && this.sceneSet && this.currentScene !== undefined) {
      this.props.onSceneResize(this.currentScene, this.width, this.height);
    }

    let cw = this.width;
    let ch = this.height;
    switch (this.state.mode) {
      case 'Side by Side':
        cw = bw;
        ch = this.height;
        break;
      case 'Stacked':
        cw = this.width;
        ch = bh;
        break;
      case 'Quad':
        cw = bw;
        ch = bh;
        break;
    }

    const aspect = cw / ch;
    this.cameras.forEach((camera) => {
      if (camera instanceof OrthographicCamera) {
        camera.left = cw / -2;
        camera.right = cw / 2;
        camera.top = ch / 2;
        camera.bottom = ch / -2;
        if (camera.name === 'UI') {
          camera.position.x = this.width / 2;
          camera.position.y = this.height / -2;
          camera.position.z = 100;
        }
        camera.updateProjectionMatrix();
      } else if (camera instanceof PerspectiveCamera) {
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        this.cameraHelpers.get(camera.name)?.update();
      }
    });
  };

  private sceneUpdate = (evt: any) => {
    this.helpersContainer.add(this.axisHelper);
    this.clearLightHelpers();
    this.scene.remove(this.currentScene!);
    dispose(this.currentScene!);

    const sceneClass = this.props.scenes.get(evt.value.name);
    if (sceneClass !== undefined) {
      const sceneInstance = new sceneClass();
      if (this.props.onSceneSet !== undefined) this.props.onSceneSet(sceneInstance);
      this.currentScene = sceneInstance;
      this.props.three.scene = this.currentScene;
      this.scene.add(this.currentScene!);
      this.sceneSet = true;
      this.addLightHelpers();
    }
  };

  private addCamera = (evt: any) => {
    const data = evt.value;
    const child = this.props.three.scene?.getObjectByProperty('uuid', data.uuid);
    if (child !== undefined) this.cameras.set(data.name, child as Camera);

    if (child instanceof PerspectiveCamera) {
      const helper = new CameraHelper(child);
      this.cameraHelpers.set(child.name, helper);
      this.scene.add(helper);
    }

    this.setState({ lastUpdate: Date.now() });
  };

  private removeCamera = (evt: any) => {
    const helper = this.cameraHelpers.get(evt.value.name);
    if (helper !== undefined) {
      this.scene.remove(helper);
      helper.dispose();
    }
    this.cameras.delete(evt.value.name);
    this.setState({ lastUpdate: Date.now() });
  };

  private onMouseMove = (event: MouseEvent) => {
    const size = new Vector2();
    this.renderer!.getSize(size);

    const mouseX = Math.min(event.clientX, size.x);
    const mouseY = Math.min(event.clientY, size.y);
    this.pointer.x = mapLinear(mouseX, 0, size.x, -1, 1);
    this.pointer.y = mapLinear(mouseY, 0, size.y, 1, -1);

    const hw = size.x / 2;
    const hh = size.y / 2;

    const sideBySide = () => {
      if (mouseX < hw) {
        this.pointer.x = mapLinear(mouseX, 0, hw, -1, 1);
      } else {
        this.pointer.x = mapLinear(mouseX, hw, size.x, -1, 1);
      }
    };

    const stacked = () => {
      if (mouseY < hh) {
        this.pointer.y = mapLinear(mouseY, 0, hh, 1, -1);
      } else {
        this.pointer.y = mapLinear(mouseY, hh, size.y, 1, -1);
      }
    };

    // mapLinear
    switch (this.state.mode) {
      case 'Quad':
        sideBySide();
        stacked();
        break;
      case 'Side by Side':
        sideBySide();
        break;
      case 'Stacked':
        stacked();
        stacked();
        break;
    }

    this.updateCamera(mouseX, mouseY, hw, hh);

    if (this.state.interactionMode === 'Orbit') return;
    const intersects = this.raycaster.intersectObjects(this.currentScene!.children);
    if (intersects.length > 0) this.interactionHelper.position.copy(intersects[0].point);
  };

  private onClick = (event: MouseEvent) => {
    if (this.state.interactionMode === 'Orbit') return;

    const size = new Vector2();
    this.renderer!.getSize(size);
    if (event.clientX >= size.x) return;

    this.onMouseMove(event);

    const intersects = this.raycaster.intersectObjects(this.currentScene!.children);
    if (intersects.length > 0) {
      this.props.three.getObject(intersects[0].object.uuid);
      this.interactionHelper.visible = false;
      this.setState({ interactionMode: 'Orbit', lastUpdate: Date.now() });
    }
  };

  private onKey = (evt: KeyboardEvent) => {
    if (this.selectedItem !== undefined) {
      if (evt.ctrlKey) {
        if (this.currentCamera.name === 'UI') return;

        const currentControls = this.controls.get(this.currentCamera.name)!;
        if (evt.key === '0') {
          this.clearControls();

          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          if (this.selectedItem instanceof Mesh || this.selectedItem instanceof SkinnedMesh) {
            this.selectedItem.geometry.computeBoundingBox();
            this.cameraControls.fitToBox(this.selectedItem.geometry.boundingBox, true);
          } else {
            this.cameraControls.fitToSphere(this.selectedItem, true);
          }
          this.updateCameraControls(currentControls, true);
        } else if (evt.key === '1') {
          this.clearControls();

          // Rotate to Front
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(0, Math.PI * 0.5, true);
          this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '2') {
          this.clearControls();

          // Rotate to Top
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(0, 0, true);
          this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '3') {
          this.clearControls();

          // Rotate to Right
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, true);
          this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '4') {
          this.clearControls();

          // Rotate to Back
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(Math.PI, Math.PI / 2, true);
          this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '5') {
          this.clearControls();

          // Rotate to Ortho
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(degToRad(45), degToRad(45), true);
          this.updateCameraControls(currentControls);
        }
      } else {
        if (this.currentTransform !== undefined) {
          switch (evt.key) {
            case 'r':
              this.currentTransform.setMode('rotate');
              break;
            case 's':
              this.currentTransform.setMode('scale');
              break;
            case 't':
              this.currentTransform.setMode('translate');
              break;
          }
        }
      }
    }
  };

  private onSetSelectedItem = (evt: any) => {
    this.selectedItem = this.currentScene!.getObjectByProperty('uuid', evt.value.uuid);
    if (this.selectedItem === undefined) return;

    if (this.currentTransform !== undefined) {
      this.currentTransform.removeEventListener('objectChange', this.onUpdateTransform);
      Transform.instance.remove(this.currentTransform.getHelper().name);
    }

    this.currentTransform = Transform.instance.add(evt.value.name);
    this.currentTransform.attach(this.selectedItem);
    this.scene.add(this.currentTransform.getHelper());
    this.currentTransform.addEventListener('objectChange', this.onUpdateTransform);
  };

  private onUpdateTransform = () => {
    if (this.selectedItem === undefined) return;
    this.props.three.updateObject(this.selectedItem.uuid, 'position', this.selectedItem.position);
    this.props.three.updateObject(this.selectedItem.uuid, 'rotation', {
      x: this.selectedItem.rotation.x,
      y: this.selectedItem.rotation.y,
      z: this.selectedItem.rotation.z,
    });
    this.props.three.updateObject(this.selectedItem.uuid, 'scale', this.selectedItem.scale);
    InspectTransform.instance.update();
  };

  // Utils

  private clearLightHelpers = () => {
    this.lightHelpers.forEach((helper: LightHelper) => {
      this.helpersContainer.remove(helper);
      helper.dispose();
    });
    this.lightHelpers.clear();
  };

  private addLightHelpers = () => {
    if (this.currentScene === undefined) return;

    this.currentScene.traverse((obj: Object3D) => {
      if (obj.type.search('Light') > -1) {
        let helper;
        switch (obj.type) {
          case 'DirectionalLight':
            helper = new DirectionalLightHelper(obj as DirectionalLight, 100);
            helper.name = `${obj.name}Helper`;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'HemisphereLight':
            helper = new HemisphereLightHelper(obj as HemisphereLight, 250);
            helper.name = `${obj.name}Helper`;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'RectAreaLight':
            helper = new RectAreaLightHelper(obj as RectAreaLight);
            helper.name = `${obj.name}Helper`;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'PointLight':
            helper = new PointLightHelper(obj as PointLight, 100);
            helper.name = `${obj.name}Helper`;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'SpotLight':
            helper = new SpotLightHelper(obj as SpotLight);
            helper.name = `${obj.name}Helper`;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
        }
      }
    });
  };

  private createControls(camera: Camera, element: HTMLDivElement) {
    // Previous items
    const prevControls = this.controls.get(camera.name);
    if (prevControls !== undefined) prevControls.dispose();
    this.controls.delete(camera.name);

    if (camera.name === 'UI') return;

    // New items
    const control = new OrbitControls(camera, element);
    control.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    control.dampingFactor = 0.05;
    switch (camera.name) {
      case 'Top':
      case 'Bottom':
      case 'Left':
      case 'Right':
      case 'Front':
      case 'Back':
        control.enableRotate = false;
        break;
    }
    this.controls.set(camera.name, control);
  }

  private clearCamera(camera: Camera) {
    const helper = this.cameraHelpers.get(camera.name);
    if (helper !== undefined) {
      this.scene.remove(helper);
      helper.dispose();
      this.cameraHelpers.delete(camera.name);
    }
    const control = this.controls.get(camera.name);
    if (control !== undefined) {
      control.dispose();
      this.controls.delete(camera.name);
    }
  }

  private killControls() {
    this.controls.forEach((value: OrbitControls, key: string) => {
      value.dispose();
      const helper = this.cameraHelpers.get(key);
      if (helper !== undefined) {
        this.scene.remove(helper);
        helper.dispose();
      }
      this.cameraHelpers.delete(key);
      this.controls.delete(key);
    });
    this.controls.clear();
    this.cameraHelpers.clear();
  }

  private assignControls() {
    switch (this.state.mode) {
      case 'Single':
        this.createControls(this.tlCam, this.tlWindow.current!);
        break;
      case 'Side by Side':
      case 'Stacked':
        this.createControls(this.tlCam, this.tlWindow.current!);
        this.createControls(this.trCam, this.trWindow.current!);
        break;
      case 'Quad':
        this.createControls(this.tlCam, this.tlWindow.current!);
        this.createControls(this.trCam, this.trWindow.current!);
        this.createControls(this.blCam, this.blWindow.current!);
        this.createControls(this.brCam, this.brWindow.current!);
        break;
    }
  }

  private updateCamera = (mouseX: number, mouseY: number, hw: number, hh: number) => {
    switch (this.state.mode) {
      case 'Quad':
        if (mouseX < hw) {
          if (mouseY < hh) {
            this.currentCamera = this.tlCam;
            this.raycaster.setFromCamera(this.pointer, this.tlCam);
          } else {
            this.currentCamera = this.blCam;
            this.raycaster.setFromCamera(this.pointer, this.blCam);
          }
        } else {
          if (mouseY < hh) {
            this.currentCamera = this.trCam;
            this.raycaster.setFromCamera(this.pointer, this.trCam);
          } else {
            this.currentCamera = this.brCam;
            this.raycaster.setFromCamera(this.pointer, this.brCam);
          }
        }
        break;
      case 'Side by Side':
        if (mouseX < hw) {
          this.currentCamera = this.tlCam;
          this.raycaster.setFromCamera(this.pointer, this.tlCam);
        } else {
          this.currentCamera = this.trCam;
          this.raycaster.setFromCamera(this.pointer, this.trCam);
        }
        break;
      case 'Single':
        this.currentCamera = this.tlCam;
        this.raycaster.setFromCamera(this.pointer, this.tlCam);
        break;
      case 'Stacked':
        if (mouseY < hh) {
          this.currentCamera = this.tlCam;
          this.raycaster.setFromCamera(this.pointer, this.tlCam);
        } else {
          this.currentCamera = this.trCam;
          this.raycaster.setFromCamera(this.pointer, this.trCam);
        }
        break;
    }

    this.splineEditor.camera = this.currentCamera;

    if (this.currentCamera === this.tlCam) {
      this.currentWindow = this.tlWindow;
    } else if (this.currentCamera === this.trCam) {
      this.currentWindow = this.trWindow;
    } else if (this.currentCamera === this.blCam) {
      this.currentWindow = this.blWindow;
    } else if (this.currentCamera === this.brCam) {
      this.currentWindow = this.brWindow;
    }

    Transform.instance.updateCamera(this.currentCamera, this.currentWindow.current);
  };

  private updateCameraControls = (control: OrbitControls, reposition = false) => {
    if (this.selectedItem === undefined) return;
    cancelAnimationFrame(this.rafID);
    this.rafID = -1;

    if (this.cameraControls) this.cameraControls.smoothTime = 0.1;

    const speed = 0.15;
    const clock = new Clock();
    clock.start();
    this.selectedItem.getWorldPosition(control.target0);

    const onUpdate = () => {
      // Update
      const delta = clock.getDelta();
      if (this.cameraControls) this.cameraControls.update(delta);

      if (reposition) {
        control.target.lerp(control.target0, speed);
        control.object.position.lerp(control.position0, speed);
        // @ts-ignore
        control.object.zoom = mix(control.object.zoom, control.zoom0, speed);
        // @ts-ignore
        control.object.updateProjectionMatrix();
        control.dispatchEvent( { type: 'change' } );
      }

      // Complete?
      const complete = clock.getElapsedTime() >= 0.5;
      if (complete) {
        cancelAnimationFrame(this.rafID);
        this.rafID = -1;
        this.clearControls();
      } else {
        this.rafID = requestAnimationFrame(onUpdate);
      }
    };
    onUpdate();
  };

  private clearControls = () => {
    if (this.cameraControls !== undefined) {
      this.cameraControls.disconnect();
      this.cameraControls.dispose();
      this.cameraControls = undefined;
    }
  };

  // Drawing

  private getSceneOverride(mode: RenderMode): Material | null {
    switch (mode) {
      case 'Depth':
        return this.depthMaterial;
      case 'Normals':
        return this.normalsMaterial;
      case 'Renderer':
        return null;
      case 'UVs':
        return this.uvMaterial;
      case 'Wireframe':
        return this.wireframeMaterial;
    }
    return null;
  }

  private drawSingle() {
    const material = this.getSceneOverride(this.tlRender);
    this.scene.overrideMaterial = material;
    this.renderer?.setViewport(0, 0, this.width, this.height);
    this.renderer?.setScissor(0, 0, this.width, this.height);
    this.renderer?.render(this.scene, this.tlCam);
  }

  private drawDouble = () => {
    const materialA = this.getSceneOverride(this.tlRender);
    const materialB = this.getSceneOverride(this.trRender);
    const bw = Math.floor(this.width / 2);
    const bh = Math.floor(this.height / 2);

    this.scene.overrideMaterial = materialA;
    if (this.state.mode === 'Side by Side') {
      this.renderer?.setViewport(0, 0, bw, this.height);
      this.renderer?.setScissor(0, 0, bw, this.height);
      this.renderer?.render(this.scene, this.tlCam);

      this.scene.overrideMaterial = materialB;
      this.renderer?.setViewport(bw, 0, bw, this.height);
      this.renderer?.setScissor(bw, 0, bw, this.height);
      this.renderer?.render(this.scene, this.trCam);
    } else {
      const y = this.height - bh;
      this.renderer?.setViewport(0, y, this.width, bh);
      this.renderer?.setScissor(0, y, this.width, bh);
      this.renderer?.render(this.scene, this.tlCam);

      this.scene.overrideMaterial = materialB;
      this.renderer?.setViewport(0, 0, this.width, bh);
      this.renderer?.setScissor(0, 0, this.width, bh);
      this.renderer?.render(this.scene, this.trCam);
    }
  };

  private drawQuad = () => {
    const materialA = this.getSceneOverride(this.tlRender);
    const materialB = this.getSceneOverride(this.trRender);
    const materialC = this.getSceneOverride(this.blRender);
    const materialD = this.getSceneOverride(this.brRender);
    const bw = Math.floor(this.width / 2);
    const bh = Math.floor(this.height / 2);
    let x = 0;
    let y = 0;
    y = this.height - bh;

    // TL
    x = 0;
    this.scene.overrideMaterial = materialA;
    this.renderer?.setViewport(x, y, bw, bh);
    this.renderer?.setScissor(x, y, bw, bh);
    this.renderer?.render(this.scene, this.tlCam);

    // TR
    x = bw;
    this.scene.overrideMaterial = materialB;
    this.renderer?.setViewport(x, y, bw, bh);
    this.renderer?.setScissor(x, y, bw, bh);
    this.renderer?.render(this.scene, this.trCam);

    y = 0;

    // BL
    x = 0;
    this.scene.overrideMaterial = materialC;
    this.renderer?.setViewport(x, y, bw, bh);
    this.renderer?.setScissor(x, y, bw, bh);
    this.renderer?.render(this.scene, this.blCam);

    // BR
    x = bw;
    this.scene.overrideMaterial = materialD;
    this.renderer?.setViewport(x, y, bw, bh);
    this.renderer?.setScissor(x, y, bw, bh);
    this.renderer?.render(this.scene, this.brCam);
  };

  // Getters

  get appID(): string {
    return this.props.three.app.appID;
  }

  get mode(): MultiViewMode {
    return this.state.mode;
  }

  get three(): RemoteThree {
    return this.props.three;
  }
}
