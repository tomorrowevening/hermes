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
  MeshPhysicalMaterial,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
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
  WebGLRenderer
} from 'three';
import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { degToRad, mapLinear } from 'three/src/math/MathUtils';
import CameraControls from 'camera-controls';
import RemoteThree from '@/core/remote/RemoteThree';
import CameraWindow, { Dropdown } from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';
import { InteractionMode, MultiViewMode, RenderMode } from './MultiViewData';
import { Application, ToolEvents } from '@/core/Application';
// Components
import './MultiView.scss';
import DebugData from '../sidePanel/DebugData';
import { InspectTransform } from '../sidePanel/inspector/utils/InspectTransform';
import Toggle from './Toggle';
import UVMaterial from './UVMaterial';
// Tools
import SplineEditor from '../tools/splineEditor';
import Transform from '../tools/Transform';
// Utils
import { mix } from '@/utils/math';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { dispose } from '@/utils/three';

type LightHelper = DirectionalLightHelper | HemisphereLightHelper | RectAreaLightHelper | PointLightHelper | SpotLightHelper

type MultiViewProps = {
  app: Application
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
  connected: boolean;
}

const ModeOptions: MultiViewMode[] = [
  'Single',
  'Side by Side',
  'Stacked',
  'Quad'
];

// eslint-disable-next-line max-len
const cameraIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVRYhe2YT4hNcRTHP48xpmYaNAvRyEQxEhnKQljYsRm9/EmSyJiMFAsMZWNhJYoNIUVJ2VGiyb9ZzIpMpkQSahbGv9GMYWrM+1rc2zjvzvvdd+99rzdvMd+6de75nd+5387vnN/v/G5KEuWMKRNNIB8mCRaKiiL5qQb2ApuBuUAV0Ad0AJeB3sSeJRX6LJbULTf6JTUn9Z+KWMUpPyp/Avoa4CNQZ3Sj/lNpdL/xottR7AjOkHRUUpekN5I6JbVLavDH75lIfZN0UFKTpCWS0pJem/HeJBEMG6yV1ONYtgFJbZJ+GF1jDh+zJb03NuliEuwMkMo4yErS2RA/LcbuYVyCrm1mA7Dal/8Cu4FG4JD/HsTTkCy6a+SVMTPQuc1sBKb78nHghi+/A+YBxwL2lbhRY+ThuARdEVxu5JdGFvACr0otdoZ8Y4+Rn0Sn5sFFsMvI6YB9MzA1YJ8mN8k1wAHzfj4uQVdyrpI0aJL7oqTtkq4FiqPLyCOSbktqlbRL0jlJQ2b8QdwCUZ4qvhRStZL0XFK1pMd57CRvq5mfhKBriRfiFUMY6oD7eOdwPlQAN4G10dfWg+uouwXsiOssAj4AC+JMcEWwvnAuOTEr7gTXPmg34zagOwkbIIOXAo9CbDYBrcBXYN+4UUdy2sRflyS5zVNlfPX7ugpJW5V9nI7mmh+lYU0lCZ2B3TOnAVuAk0BTwC5nuhWro46KauBOQJch5OpRaoIW34GreGf+YZdRqS9NAj4Bp4ClQDvwOWxCqSM4ADQEdKE5XvbXzlITrAVe4TW+M6NMKDXBFLAMuAD0ACfIc7pMZBXXA2cY3/xmodQRHAL2A2+NLtj8ZiEKwUL/z2WMPAJcAVYALWSf8dZuDFGWeBHwKxm3sWYhiGG8Tfo6sA2vSfiSy4GrH3wGrDcfKSSKKf6v1E9yF0XK9Q1XBPuMXMw8HXTonQFwETwNzMFr64v1jzgFHIk9ybHEZYPJo65QlD3Bf2/Q/eaHPiSWAAAAAElFTkSuQmCC';
// eslint-disable-next-line max-len
const lightIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETklEQVRYhe2YXYhVVRTHf3d0/JhyUrMpFbImM+whSa3Mynww+4AeIgiKoozooQ+KyMyXIAujF6OXqHyI6iEKKYgIP/owsjSFqCkprdDUTEcjbWZ0HHV+Pex1ucfb9Z57Z9REXHA4Z++99l7/s/ZZ/7X2KaiczNLwfwPIk9MA+yunNMAG4DHgV+BvoB3YFff2TPstYEyfrajVroI6Sr1GvahsbJC63HzZq04pmztSvU5tVRuqYRiYg78JeBR4HPg5ntdmxovz9wJfA3uAxuibDLQCA+IqynnAQuBuYCnwMLC1rx48U12U8cZqdWqMDcx4cI16qTpYbVKHqa+ovWUeHKsujn7VL9ULq2HI+wY7gVeBJdGeFu3J4ZUiy/cAXeHRRuAQsC/GC0B3eG4BcH/0tUV7czUAeVsMsBF4Kha9HZgCvAncAuwPnXHA0wFuGLANuDrGuoGDwFxgTqzzQ7RX5FrP2eLsdb76vnogtme6+nE8H1YPlQXHwbi3q9eqn0e7Tb25VrsF68vFY0lb1AGcDTwItGQ8tQM4AIwGmqP/EPAu8A0wElgJfFGzxTo8mKWXu9Rd4ZF96jvqjSbauEC9Sn1O3R463epLaku99voCsFXdkAH3kNpcQW+IiT/bQne3eufxBtioPqP2mKhioXpWzpxb1T8C5Ifh4ZptVoriRmAIKdrI3Lujf3bobAPeJpF0NVkKrAFuI9HTOBIxnxFrF4OgQKKr/dnJlQA+AcwABgOHA4zAamA5cE7orQL+zAEHiWI+A2bFC7aSguheYCgpqAphZz3wSB7AecCICv2TgH8oFRib4gVqka0k0h8CXAxMBW6ooDejFoCvA9OBQUAvKWM0kDz4XUZvNKXtyZMWUl7vBbaQXq457PeEziDgx/KJlQAuIPFdMcEXv5OdYWBP9M8k8VpnDQCvB4aTSrCNJB5cSdrW3tBpIJVnR0qdUTxAfdGUOVTnmwqEanNmqltC/9OgqePKg5eom8PgdvW+oJ9Kupera0O3U50TL3lcAaI+oHaF4R3qa6Z822wq0Saq89T1lmSxOrxeW/Xm4uGkiqQDmECKuKHxHW0HdpMiewSpvGqKeR8Ay0iBsYIjg6261PE2o9Q3Yqv+MqWxO9R1Hl12qs+q49Vlppy82pSr+5xJKsko4AXgHlJ0t5NIeg3wLXAlqZhtIUV8J6nmWwX8QiLjdhL5TwMWkY4R6/rrwYKlMr1Y321QZ/vfwBijPqm+rF4Wc7PjE9QllurGVeoV5gRNHsAm9fnMom3qrKPoTjKdMXaYyrFygEWQ72XWW24qhPu8xcUc2UU6O8wFPjmK7jhgPHAuMJGUGQ6U6WwE5sfzTXGvei7KA9hFOiR9D/wOfFVFt4dS2tpfRe83Ur7/CPiJakfOGgBCypubatArl2r8VfOax/LfzABKtePAzHO/5FgC7KBEzB2kOrDfUm8mOeFySv9+OyFyGmB/5aQH+C9BVKmVCNuMZgAAAABJRU5ErkJggg==';
// eslint-disable-next-line max-len
const gridIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQ0lEQVQ4jWP8////fwYqAxYozUhFM/8zkaKYWIWkGEq0b0ZdSjQY5i79TyWagRGaTUdzFEEw6lLqGzqwLoVVJ1StpwA9sBwbUqAh5gAAAABJRU5ErkJggg==`;

export default class MultiView extends Component<MultiViewProps, MultiViewState> {
  static instance: MultiView | null = null;

  app: Application;
  scene: Scene;
  renderer?: WebGLRenderer | WebGPURenderer | null;
  currentScene?: Scene;
  scenes: Map<string, Scene> = new Map();
  cameras: Map<string, Camera> = new Map();
  controls: Map<string, OrbitControls> = new Map();
  currentCamera!: PerspectiveCamera | OrthographicCamera;
  currentWindow: any; // RefObject to one of the "windows"
  helpersContainer = new Group();

  private cameraHelpers: Map<string, CameraHelper> = new Map();
  private lightHelpers: Map<string, LightHelper> = new Map();
  private grid = new InfiniteGridHelper();
  private interactionHelper = new AxesHelper(25);
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
  private cameraControlsRafID = -1;
  private width = 0;
  private height = 0;

  // Windows
  private tlCam: any = null;
  private trCam: any = null;
  private blCam: any = null;
  private brCam: any = null;
  private tlRender: RenderMode = 'Renderer';
  private trRender: RenderMode = 'Renderer';
  private blRender: RenderMode = 'Renderer';
  private brRender: RenderMode = 'Renderer';
  private cameraVisibility = true;
  private lightVisibility = true;
  private gridVisibility = true;

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
  private editorCameras = [
    'Top',
    'Bottom',
    'Left',
    'Right',
    'Front',
    'Back',
    'Orthographic',
    'UI',
    'Debug',
  ];

  constructor(props: MultiViewProps) {
    super(props);

    this.app = props.app;
    this.app.addEventListener(ToolEvents.ADD_RENDERER, this.setupRenderer);

    this.scene = new Scene();
    this.scene.name = this.scene.uuid = '';

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
      connected: false,
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

    const expandedCameraVisibility = localStorage.getItem(this.expandedCameraVisibility);
    if (expandedCameraVisibility !== null) this.cameraVisibility = expandedCameraVisibility === 'open';
    this.saveExpandedCameraVisibility();

    const expandedLightVisibility = localStorage.getItem(this.expandedLightVisibility);
    if (expandedLightVisibility !== null) this.lightVisibility = expandedLightVisibility === 'open';
    this.saveExpandedLightVisibility();

    const expandedGridVisibility = localStorage.getItem(this.expandedGridVisibility);
    if (expandedGridVisibility !== null) this.gridVisibility = expandedGridVisibility === 'open';
    this.grid.visible = this.gridVisibility;
    this.saveExpandedGridVisibility();

    // Static-access
    MultiView.instance = this;
  }

  componentDidMount(): void {
    this.enable();
    this.assignControls();
    this.resize();
    this.play();

    Transform.instance.setApp(this.props.app, this.props.three);
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
    this.clear();
    DebugData.removeEditorGroup('View Settings');
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
                name='tl'
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
                name='tl'
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
                name='tr'
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
                name='tl'
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
                name='tr'
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
                name='bl'
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
                name='br'
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
              localStorage.setItem(`${this.appID}_mode`, value);
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

          <Toggle
            name='cameraHelper'
            icon={cameraIcon}
            selected={this.cameraVisibility}
            height={24}
            top={2}
            onClick={(selected: boolean) => {
              this.cameraVisibility = selected;
              this.saveExpandedCameraVisibility();
              this.cameraHelpers.forEach((helper: CameraHelper) => {
                helper.visible = selected;
              });

              if (this.selectedItem !== undefined) {
                if (!selected) {
                  const helper = this.cameraHelpers.get(this.selectedItem.name);
                  if (helper !== undefined) helper.visible = true;
                }
              }
            }}
          />

          <Toggle
            name='lightHelper'
            icon={lightIcon}
            selected={this.lightVisibility}
            height={24}
            top={4}
            onClick={(selected: boolean) => {
              this.lightVisibility = selected;
              this.saveExpandedLightVisibility();
              this.lightHelpers.forEach((helper: LightHelper) => {
                helper.visible = selected;
              });

              if (this.selectedItem !== undefined) {
                if (!selected && this.selectedItem['isLight'] === true) {
                  const helper = this.lightHelpers.get(this.selectedItem.name);
                  if (helper !== undefined) helper.visible = true;
                }
              }
            }}
          />

          <Toggle
            name='gridHelper'
            icon={gridIcon}
            selected={this.gridVisibility}
            height={21}
            width={21}
            onClick={(selected: boolean) => {
              this.gridVisibility = selected;
              this.saveExpandedGridVisibility();
              this.grid.visible = selected;
            }}
          />

        </div>

        {!this.state.connected && <div className='connectionStatus'>Disconnected</div>}
      </div>
    );
  }

  // Setup

  private setupRenderer = (evt: any) => {
    if (this.renderer) {
      this.renderer.dispose();
    }

    const canvas = this.canvasRef.current!;
    this.props.three.canvas = canvas;
    const data = evt.value;
    if (data.type === 'WebGLRenderer') {
      this.renderer = new WebGLRenderer({
        canvas: canvas,
        stencil: false
      });
      this.grid.visible = true;
    } else if (data.type === 'WebGPURenderer') {
      this.renderer = new WebGPURenderer({
        canvas: canvas,
        stencil: false
      });
      this.grid.visible = false;
    }

    if (this.renderer) {
      this.renderer.autoClear = false;
      this.renderer.shadowMap.enabled = true;
      this.renderer.setPixelRatio(devicePixelRatio);
      this.renderer.setClearColor(0x000000);
      this.resize();
      this.props.three.renderer = this.renderer;
      this.onRemoteConnected();
    }
  };

  private setupScene() {
    this.helpersContainer.name = 'helpers';
    this.scene.add(this.helpersContainer);

    this.grid.position.y = -1;
    this.scene.add(this.grid);

    this.interactionHelper.name = 'interactionHelper';
    this.interactionHelper.visible = false;
    this.helpersContainer.add(this.interactionHelper);

    // Create default cameras

    const createOrtho = (name: string, position: Vector3) => {
      const camera = new OrthographicCamera(-100, 100, 100, -100, 0, 3000);
      camera.name = name;
      camera.position.copy(position);
      camera.lookAt(0, 0, 0);
      this.cameras.set(name, camera);
      return camera;
    };

    const dist = 1000;
    createOrtho('Top', new Vector3(0, dist, 0));
    createOrtho('Bottom', new Vector3(0, -dist, 0));
    createOrtho('Left', new Vector3(-dist, 0, 0));
    createOrtho('Right', new Vector3(dist, 0, 0));
    createOrtho('Front', new Vector3(0, 0, dist));
    createOrtho('Back', new Vector3(0, 0, -dist));
    createOrtho('Orthographic', new Vector3(dist, dist, dist));
    createOrtho('UI', new Vector3());

    this.debugCamera = new PerspectiveCamera(60, 1, 0.01, 3000);
    this.debugCamera.name = 'Debug';
    this.debugCamera.position.set(300, 300, 300);
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
    this.splineEditor = new SplineEditor(this.currentCamera, this.app);
    this.splineEditor.initDebug();
    this.helpersContainer.add(this.splineEditor);
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

  clear() {
    this.app.dispatchEvent({ type: ToolEvents.CLEAR_OBJECT });
    DebugData.removeAllGroups();

    // Helpers
    this.clearLightHelpers();
    this.clearControls();

    // Transforms
    if (this.currentTransform !== undefined) {
      this.currentTransform.removeEventListener('objectChange', this.onUpdateTransform);
      Transform.instance.remove(this.currentTransform.getHelper().name);
    }
    this.currentTransform = undefined;
    Transform.instance.clear();

    // Cameras
    this.cameras.forEach((value: Camera) => {
      const index = this.editorCameras.indexOf(value.name);
      if (index < 0) {
        const helper = this.cameraHelpers.get(value.uuid);
        if (helper) {
          helper.parent?.remove(helper);
          this.helpersContainer.remove(helper);
          helper.dispose();
        }
        this.cameraHelpers.delete(value.uuid);
      }
    });
    this.currentCamera = this.debugCamera;

    // Clear Scenes
    this.currentScene = undefined;
    this.scenes.forEach((value: Scene) => {
      this.app.dispatchEvent({ type: ToolEvents.REMOVE_SCENE, value: value });
    });
    this.scenes.clear();
  }

  // Playback

  private update() {
    if (this.renderer) {
      if (this.renderer instanceof WebGLRenderer) {
        this.renderer?.clear();
      } else if (this.renderer instanceof WebGPURenderer) {
        this.renderer?.clearAsync();
      }
    }
    // Updates
    this.controls.forEach((control: OrbitControls) => control.update());
    this.cameraHelpers.forEach((helper: CameraHelper) => helper.update());
    this.lightHelpers.forEach((helper: LightHelper) => {
      if (helper['update'] !== undefined) helper['update']();
    });
    if (this.props.onSceneUpdate !== undefined && this.currentScene !== undefined) {
      this.props.onSceneUpdate(this.currentScene);
    }
  }

  private draw() {
    if (this.renderer) {
      if (this.renderer instanceof WebGLRenderer) {
        this.renderer?.clear();
      } else if (this.renderer instanceof WebGPURenderer) {
        this.renderer?.clearAsync();
      }
    }
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
    this.app.addEventListener(ToolEvents.ADD_SCENE, this.addScene);
    this.app.addEventListener(ToolEvents.SET_SCENE, this.sceneUpdate);
    this.app.addEventListener(ToolEvents.REMOVE_SCENE, this.removeScene);
    this.app.addEventListener(ToolEvents.ADD_CAMERA, this.addCamera);
    this.app.addEventListener(ToolEvents.REMOVE_CAMERA, this.removeCamera);
    this.app.addEventListener(ToolEvents.SET_OBJECT, this.onSetSelectedItem);
    this.app.addEventListener(ToolEvents.REMOTE_CONNECTED, this.onRemoteConnected);
    this.app.addEventListener(ToolEvents.REMOTE_DISCONNECTED, this.onRemoteDisconnected);
  }

  private disable() {
    const element = this.containerRef.current!;
    element.removeEventListener('mousemove', this.onMouseMove);
    element.removeEventListener('click', this.onClick);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('resize', this.resize);
    this.app.removeEventListener(ToolEvents.ADD_SCENE, this.addScene);
    this.app.removeEventListener(ToolEvents.SET_SCENE, this.sceneUpdate);
    this.app.removeEventListener(ToolEvents.ADD_CAMERA, this.addCamera);
    this.app.removeEventListener(ToolEvents.REMOVE_CAMERA, this.removeCamera);
    this.app.removeEventListener(ToolEvents.SET_OBJECT, this.onSetSelectedItem);
    this.app.removeEventListener(ToolEvents.REMOTE_CONNECTED, this.onRemoteConnected);
    this.app.removeEventListener(ToolEvents.REMOTE_DISCONNECTED, this.onRemoteDisconnected);
  }

  private resize = () => {
    this.width = window.innerWidth - 300;
    this.height = window.innerHeight;

    this.renderer?.setSize(this.width, this.height);
    const bw = Math.floor(this.width / 2);
    const bh = Math.floor(this.height / 2);
    this.props.three.resize(this.width, this.height);

    if (this.props.onSceneResize !== undefined && this.currentScene !== undefined) {
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
      }
      this.cameraHelpers.get(camera.name)?.update();
    });
  };

  private addScene = (evt: any) => {
    const sceneClass = this.props.scenes.get(evt.value.name);
    if (sceneClass !== undefined) {
      const sceneInstance = new sceneClass();
      sceneInstance.visible = false;
      if (this.props.onSceneSet !== undefined) this.props.onSceneSet(sceneInstance);
      this.props.three.scene = sceneInstance;
      this.scenes.set(evt.value.name, sceneInstance);
      this.scene.add(sceneInstance);
    }
  };

  private sceneUpdate = (evt: any) => {
    // Previous scene
    if (this.currentScene !== undefined) {
      this.currentScene.visible = false;
      this.clearLightHelpers();
    }

    // New scene
    const scene = this.scene.getObjectByName(evt.value.name);
    if (scene !== undefined) {
      this.currentScene = scene as Scene;
      this.currentScene.visible = true;
      this.addLightHelpers(this.currentScene);
    }
  };

  private removeScene = (evt: any) => {
    const name = evt.value.name;
    this.scenes.delete(name);
    const child = this.scene.getObjectByName(name);
    if (child) {
      // Wait to delete so React has enough time to update
      setTimeout(() => {
        dispose(child);
      }, 100);
    }
    this.clearLightHelpers();
  };

  private addCamera = (evt: any) => {
    const data = evt.value;
    const cameraName = data.uuid;
    const child = this.props.three.scene?.getObjectByProperty('uuid', data.uuid);
    if (child !== undefined) {
      const camera = child as Camera;
      this.cameras.set(cameraName, camera);

      const helper = new CameraHelper(camera);
      helper.visible = this.cameraVisibility;
      this.cameraHelpers.set(cameraName, helper);
      this.helpersContainer.add(helper);

      this.setState({ lastUpdate: Date.now() });
    }
  };

  private removeCamera = (evt: any) => {
    const data = evt.value;
    const cameraName = data.uuid;
    const helper = this.cameraHelpers.get(cameraName);
    if (helper !== undefined) {
      this.helpersContainer.remove(helper);
      helper.dispose();
    }
    this.cameras.delete(cameraName);
    this.setState({ lastUpdate: Date.now() });
  };

  private onMouseMove = (event: MouseEvent) => {
    const size = new Vector2();
    this.renderer?.getSize(size);

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

    if (this.state.interactionMode === 'Orbit' || this.currentScene === undefined) return;
    const intersects = this.raycaster.intersectObjects(this.currentScene!.children);
    if (intersects.length > 0) this.interactionHelper.position.copy(intersects[0].point);
  };

  private onClick = (event: MouseEvent) => {
    if (this.state.interactionMode === 'Orbit' || this.currentScene === undefined) return;

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
          evt.preventDefault();
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
          evt.preventDefault();
          this.clearControls();

          // Rotate to Front
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(0, Math.PI * 0.5, true);
          this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '2') {
          evt.preventDefault();
          this.clearControls();

          // Rotate to Top
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(0, 0, true);
          this.cameraControls.moveTo(this.selectedItem.position.x, 0, this.selectedItem.position.z, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '3') {
          evt.preventDefault();
          this.clearControls();

          // Rotate to Right
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, true);
          this.cameraControls.moveTo(0, this.selectedItem.position.y, this.selectedItem.position.z, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '4') {
          evt.preventDefault();
          this.clearControls();

          // Rotate to Back
          this.cameraControls = new CameraControls(this.currentCamera, this.currentWindow.current!);
          this.cameraControls.rotateTo(Math.PI, Math.PI / 2, true);
          this.cameraControls.moveTo(this.selectedItem.position.x, this.selectedItem.position.y, 0, true);
          this.updateCameraControls(currentControls);
        } else if (evt.key === '5') {
          evt.preventDefault();
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
            case 'q':
              this.currentTransform.setSpace(this.currentTransform.space === 'local' ? 'world' : 'local');
              break;
          }
        }
      }
    }
  };

  private onSetSelectedItem = (evt: any) => {
    // Unselect
    if (this.selectedItem !== undefined) {
      this.updateSelectedItemHelper(false);
    }

    this.selectedItem = undefined;
    const uuid = evt.value.uuid;
    this.scenes.forEach((scene: Scene) => {
      if (uuid.search(scene.uuid) > -1) {
        this.selectedItem = scene.getObjectByProperty('uuid', uuid);
      }
    });

    if (this.selectedItem === undefined) {
      console.log(`Hermes - Can't find selected item: ${evt.value.uuid}, ${evt.value.name}`);
      return;
    }

    if (this.currentTransform !== undefined) {
      this.currentTransform.removeEventListener('objectChange', this.onUpdateTransform);
      Transform.instance.remove(this.currentTransform.getHelper().name);
    }

    this.currentTransform = Transform.instance.add(evt.value.name);
    this.currentTransform.attach(this.selectedItem);
    this.helpersContainer.add(this.currentTransform.getHelper());
    this.currentTransform.addEventListener('objectChange', this.onUpdateTransform);

    this.updateSelectedItemHelper(true);
  };

  private updateSelectedItemHelper(visible: boolean) {
    if (this.selectedItem === undefined) return;

    if (!this.cameraVisibility) {
      const helper = this.cameraHelpers.get(this.selectedItem.name);
      if (helper !== undefined) helper.visible = visible;
    } else if (this.selectedItem['isLight'] === true && !this.lightVisibility) {
      const helper = this.lightHelpers.get(this.selectedItem.name);
      if (helper !== undefined) helper.visible = visible;
    }
  }

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

  private onRemoteConnected = () => {
    this.setState({ connected: true });
  };

  private onRemoteDisconnected = () => {
    this.clear();
    this.setState({ connected: false });
  };

  // Utils

  private clearLightHelpers = () => {
    this.lightHelpers.forEach((helper: LightHelper) => {
      this.helpersContainer.remove(helper);
      helper.dispose();
    });
    this.lightHelpers.clear();
  };

  private addLightHelpers = (scene: Scene) => {
    scene.traverse((obj: Object3D) => {
      if (obj.type.search('Light') > -1) {
        let helper;
        switch (obj.type) {
          case 'DirectionalLight':
            helper = new DirectionalLightHelper(obj as DirectionalLight, 100);
            helper.name = `${obj.name}Helper`;
            helper.visible = this.lightVisibility;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'HemisphereLight':
            helper = new HemisphereLightHelper(obj as HemisphereLight, 250);
            helper.name = `${obj.name}Helper`;
            helper.visible = this.lightVisibility;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'RectAreaLight':
            helper = new RectAreaLightHelper(obj as RectAreaLight);
            helper.name = `${obj.name}Helper`;
            helper.visible = this.lightVisibility;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'PointLight':
            helper = new PointLightHelper(obj as PointLight, 100);
            helper.name = `${obj.name}Helper`;
            helper.visible = this.lightVisibility;
            this.lightHelpers.set(obj.name, helper);
            this.helpersContainer.add(helper);
            break;
          case 'SpotLight':
            helper = new SpotLightHelper(obj as SpotLight);
            helper.name = `${obj.name}Helper`;
            helper.visible = this.lightVisibility;
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
    control.dampingFactor = 0.1;
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
      this.helpersContainer.remove(helper);
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
        this.helpersContainer.remove(helper);
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
        if (mouseY < hh) {
          // Top
          if (mouseX < hw) {
            this.currentCamera = this.tlCam;
          } else {
            this.currentCamera = this.trCam;
          }
        } else {
          // Bottom
          if (mouseX < hw) {
            this.currentCamera = this.blCam;
          } else {
            this.currentCamera = this.brCam;
          }
        }
        break;
      case 'Side by Side':
        if (mouseX < hw) {
          this.currentCamera = this.tlCam;
        } else {
          this.currentCamera = this.trCam;
        }
        break;
      case 'Single':
        this.currentCamera = this.tlCam;
        break;
      case 'Stacked':
        if (mouseY < hh) {
          this.currentCamera = this.tlCam;
        } else {
          this.currentCamera = this.trCam;
        }
        break;
    }

    this.splineEditor.camera = this.currentCamera;
    this.raycaster.setFromCamera(this.pointer, this.currentCamera);

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
    cancelAnimationFrame(this.cameraControlsRafID);
    this.cameraControlsRafID = -1;

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
        cancelAnimationFrame(this.cameraControlsRafID);
        this.cameraControlsRafID = -1;
        this.clearControls();
      } else {
        this.cameraControlsRafID = requestAnimationFrame(onUpdate);
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

  private saveExpandedCameraVisibility() {
    localStorage.setItem(this.expandedCameraVisibility, this.cameraVisibility ? 'open' : 'closed');
  }

  private saveExpandedLightVisibility() {
    localStorage.setItem(this.expandedLightVisibility, this.lightVisibility ? 'open' : 'closed');
  }

  private saveExpandedGridVisibility() {
    localStorage.setItem(this.expandedGridVisibility, this.gridVisibility ? 'open' : 'closed');
  }

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

  private drawTo(x: number, y: number, width: number, height: number, camera: Camera, material: Material | null) {
    switch (camera.name) {
      case 'Left':
      case 'Right':
        this.grid.rotation.z = Math.PI / 2;
        break;
      case 'Front':
      case 'Back':
        this.grid.rotation.x = Math.PI / 2;
        break;
    }

    this.scene.overrideMaterial = material;
    if (this.renderer) {
      this.renderer?.setViewport(x, y, width, height);
      this.renderer?.setScissor(x, y, width, height);
      if (this.renderer instanceof WebGLRenderer) {
        this.renderer?.render(this.scene, camera);
      } else if (this.renderer instanceof WebGPURenderer) {
        this.renderer?.renderAsync(this.scene, camera);
      }
    }
    this.grid.rotation.set(0, 0, 0);
  }

  private drawSingle() {
    const material = this.getSceneOverride(this.tlRender);
    this.drawTo(0, 0, this.width, this.height, this.tlCam, material);
  }

  private drawDouble = () => {
    const materialA = this.getSceneOverride(this.tlRender);
    const materialB = this.getSceneOverride(this.trRender);
    const bw = Math.floor(this.width / 2);
    const bh = Math.floor(this.height / 2);

    if (this.state.mode === 'Side by Side') {
      this.drawTo(0, 0, bw, this.height, this.tlCam, materialA);
      this.drawTo(bw, 0, bw, this.height, this.trCam, materialB);
    } else {
      const y = this.height - bh;
      this.drawTo(0, y, this.width, bh, this.tlCam, materialA);
      this.drawTo(0, 0, this.width, bh, this.trCam, materialB);
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
    this.drawTo(x, y, bw, bh, this.tlCam, materialA);

    // TR
    x = bw;
    this.drawTo(x, y, bw, bh, this.trCam, materialB);

    y = 0;

    // BL
    x = 0;
    this.scene.overrideMaterial = materialC;
    this.drawTo(x, y, bw, bh, this.blCam, materialC);

    // BR
    x = bw;
    this.drawTo(x, y, bw, bh, this.brCam, materialD);
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

  get expandedCameraVisibility(): string {
    return `${this.appID}_multiviewCameraVisibility`;
  }

  get expandedLightVisibility(): string {
    return `${this.appID}_multiviewLightVisibility`;
  }

  get expandedGridVisibility(): string {
    return `${this.appID}_multiviewGridVisibility`;
  }
}
