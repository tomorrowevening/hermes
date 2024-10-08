// Libs
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AxesHelper,
  Box3,
  BufferGeometry,
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
// Utils
import { dispose, mix } from '../utils';

// Scene
let currentScene: Scene;

// Cameras
let sceneSet = false;
let tlCam: any = null;
let trCam: any = null;
let blCam: any = null;
let brCam: any = null;
let tlRender: RenderMode = 'Renderer';
let trRender: RenderMode = 'Renderer';
let blRender: RenderMode = 'Renderer';
let brRender: RenderMode = 'Renderer';

interface MultiViewProps {
  three: RemoteThree;
  scenes: Map<string, any>;
  onSceneSet?: (scene: Scene) => void;
  onSceneUpdate?: (scene: Scene) => void;
  onSceneResize?: (scene: Scene, width: number, height: number) => void;
}

type LightHelper = DirectionalLightHelper | HemisphereLightHelper | RectAreaLightHelper | PointLightHelper | SpotLightHelper

export default function MultiView(props: MultiViewProps) {
  const appID = props.three.app.appID;

  // Memo
  const cameras: Map<string, Camera> = useMemo(() => new Map(), []);
  const controls: Map<string, OrbitControls> = useMemo(() => new Map(), []);
  const cameraHelpers: Map<string, CameraHelper> = useMemo(() => new Map(), []);
  const lightHelpers: Map<string, LightHelper> = useMemo(() => new Map(), []);
  const scene = useMemo(() => new Scene(), []);
  const helpersContainer = useMemo(() => new Group(), []);
  const grid = useMemo(() => new InfiniteGridHelper(), []);
  const axisHelper = useMemo(() => new AxesHelper(500), []);
  const interactionHelper = useMemo(() => new AxesHelper(100), []);
  const depthMaterial = useMemo(() => new MeshDepthMaterial(), []);
  const normalsMaterial = useMemo(() => new MeshNormalMaterial(), []);
  const uvMaterial = useMemo(() => new UVMaterial(), []);
  const wireframeMaterial = useMemo(() => new MeshBasicMaterial({
    opacity: 0.33,
    transparent: true,
    wireframe: true
  }), []);

  function createOrtho(name: string, position: Vector3) {
    const camera = new OrthographicCamera(-100, 100, 100, -100, 50, 5000);
    camera.name = name;
    camera.position.copy(position);
    camera.lookAt(0, 0, 0);
    cameras.set(name, camera);
    return camera;
  }

  const ModeOptions: MultiViewMode[] = [
    'Single',
    'Side by Side',
    'Stacked',
    'Quad'
  ];

  // References
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlWindow = useRef<HTMLDivElement>(null);
  const trWindow = useRef<HTMLDivElement>(null);
  const blWindow = useRef<HTMLDivElement>(null);
  const brWindow = useRef<HTMLDivElement>(null);

  // Get Local Storage
  const ls = localStorage;
  const savedMode = ls.getItem(`${appID}_mode`);

  // States
  const [mode, setMode] = useState<MultiViewMode>(savedMode !== null ? savedMode as MultiViewMode : 'Single');
  const [renderer, setRenderer] = useState<WebGLRenderer | null>(null);
  const [modeOpen, setModeOpen] = useState(false);
  const [renderModeOpen, setRenderModeOpen] = useState(false);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('Orbit');
  const [interactionModeOpen, setInteractionModeOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Save Local Storage
  ls.setItem(`${appID}_mode`, mode);
  ls.setItem(`${appID}_tlCam`, ls.getItem(`${appID}_tlCam`) !== null ? ls.getItem(`${appID}_tlCam`) as string : 'Debug');
  ls.setItem(`${appID}_trCam`, ls.getItem(`${appID}_trCam`) !== null ? ls.getItem(`${appID}_trCam`) as string : 'Orthographic');
  ls.setItem(`${appID}_blCam`, ls.getItem(`${appID}_blCam`) !== null ? ls.getItem(`${appID}_blCam`) as string : 'Front');
  ls.setItem(`${appID}_brCam`, ls.getItem(`${appID}_brCam`) !== null ? ls.getItem(`${appID}_brCam`) as string : 'Top');
  ls.setItem(`${appID}_tlRender`, ls.getItem(`${appID}_tlRender`) !== null ? ls.getItem(`${appID}_tlRender`) as string : 'Renderer');
  ls.setItem(`${appID}_trRender`, ls.getItem(`${appID}_trRender`) !== null ? ls.getItem(`${appID}_trRender`) as string : 'Renderer');
  ls.setItem(`${appID}_blRender`, ls.getItem(`${appID}_blRender`) !== null ? ls.getItem(`${appID}_blRender`) as string : 'Renderer');
  ls.setItem(`${appID}_brRender`, ls.getItem(`${appID}_brRender`) !== null ? ls.getItem(`${appID}_brRender`) as string : 'Renderer');

  const createControls = (camera: Camera, element: HTMLDivElement) => {
    // Previous items
    const prevControls = controls.get(camera.name);
    if (prevControls !== undefined) prevControls.dispose();
    controls.delete(camera.name);

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
    controls.set(camera.name, control);
  };

  const clearCamera = (camera: Camera) => {
    const helper = cameraHelpers.get(camera.name);
    if (helper !== undefined) {
      scene.remove(helper);
      helper.dispose();
      cameraHelpers.delete(camera.name);
    }
    const control = controls.get(camera.name);
    if (control !== undefined) {
      control.dispose();
      controls.delete(camera.name);
    }
  };

  const killControls = () => {
    controls.forEach((value: OrbitControls, key: string) => {
      value.dispose();
      const helper = cameraHelpers.get(key);
      if (helper !== undefined) {
        scene.remove(helper);
        helper.dispose();
      }
      cameraHelpers.delete(key);
      controls.delete(key);
    });
    controls.clear();
    cameraHelpers.clear();
  };

  const assignControls = () => {
    switch (mode) {
      case 'Single':
        createControls(tlCam, tlWindow.current!);
        break;
      case 'Side by Side':
      case 'Stacked':
        createControls(tlCam, tlWindow.current!);
        createControls(trCam, trWindow.current!);
        break;
      case 'Quad':
        createControls(tlCam, tlWindow.current!);
        createControls(trCam, trWindow.current!);
        createControls(blCam, blWindow.current!);
        createControls(brCam, brWindow.current!);
        break;
    }
  };

  // Renderer
  useEffect(() => {
    const instance = new WebGLRenderer({
      canvas: canvasRef.current!,
      stencil: false
    });
    instance.autoClear = false;
    instance.shadowMap.enabled = true;
    instance.setPixelRatio(devicePixelRatio);
    instance.setClearColor(0x000000);
    props.three.renderer = instance;
    setRenderer(instance);
  }, []);

  // Setup Scene
  useEffect(() => {
    // Scene
    scene.name = 'Debug Scene';
    scene.uuid = '';

    helpersContainer.name = 'helpers';
    scene.add(helpersContainer);

    helpersContainer.add(grid);

    axisHelper.name = 'axisHelper';
    helpersContainer.add(axisHelper);

    interactionHelper.name = 'interactionHelper';
    helpersContainer.add(interactionHelper);
    interactionHelper.visible = false;

    // Cameras
    createOrtho('Top', new Vector3(0, 1000, 0));
    createOrtho('Bottom', new Vector3(0, -1000, 0));
    createOrtho('Left', new Vector3(-1000, 0, 0));
    createOrtho('Right', new Vector3(1000, 0, 0));
    createOrtho('Front', new Vector3(0, 0, 1000));
    createOrtho('Back', new Vector3(0, 0, -1000));
    createOrtho('Orthographic', new Vector3(1000, 1000, 1000));
    createOrtho('UI', new Vector3());

    const debugCamera = new PerspectiveCamera(60, 1, 50, 5000);
    debugCamera.name = 'Debug';
    debugCamera.position.set(500, 500, 500);
    debugCamera.lookAt(0, 0, 0);
    cameras.set('Debug', debugCamera);

    tlCam = cameras.get(ls.getItem(`${appID}_tlCam`) as string);
    trCam = cameras.get(ls.getItem(`${appID}_trCam`) as string);
    blCam = cameras.get(ls.getItem(`${appID}_blCam`) as string);
    brCam = cameras.get(ls.getItem(`${appID}_brCam`) as string);

    // In case a scene-specific camera was used and isn't available, defer to default cameras
    if (tlCam === undefined) tlCam = cameras.get('Debug');
    if (trCam === undefined) trCam = cameras.get('Orthographic');
    if (blCam === undefined) blCam = cameras.get('Front');
    if (brCam === undefined) brCam = cameras.get('Top');
  }, []);

  // Event handling
  useEffect(() => {
    const clearLightHelpers = () => {
      lightHelpers.forEach((helper: LightHelper) => {
        helpersContainer.remove(helper);
        helper.dispose();
      });
      lightHelpers.clear();
    };

    const addLightHelpers = () => {
      currentScene.traverse((obj: Object3D) => {
        if (obj.type.search('Light') > -1) {
          let helper;
          switch (obj.type) {
            case 'DirectionalLight':
              helper = new DirectionalLightHelper(obj as DirectionalLight, 100);
              helper.name = `${obj.name}Helper`;
              lightHelpers.set(obj.name, helper);
              helpersContainer.add(helper);
              break;
            case 'HemisphereLight':
              helper = new HemisphereLightHelper(obj as HemisphereLight, 250);
              helper.name = `${obj.name}Helper`;
              lightHelpers.set(obj.name, helper);
              helpersContainer.add(helper);
              break;
            case 'RectAreaLight':
              helper = new RectAreaLightHelper(obj as RectAreaLight);
              helper.name = `${obj.name}Helper`;
              lightHelpers.set(obj.name, helper);
              helpersContainer.add(helper);
              break;
            case 'PointLight':
              helper = new PointLightHelper(obj as PointLight, 100);
              helper.name = `${obj.name}Helper`;
              lightHelpers.set(obj.name, helper);
              helpersContainer.add(helper);
              break;
            case 'SpotLight':
              helper = new SpotLightHelper(obj as SpotLight);
              helper.name = `${obj.name}Helper`;
              lightHelpers.set(obj.name, helper);
              helpersContainer.add(helper);
              break;
          }
        }
      });
    };

    const sceneUpdate = (evt: any) => {
      helpersContainer.add(axisHelper);
      clearLightHelpers();
      dispose(currentScene);
      scene.remove(currentScene);

      const sceneClass = props.scenes.get(evt.value.name);
      if (sceneClass !== undefined) {
        const sceneInstance = new sceneClass();
        if (props.onSceneSet !== undefined) props.onSceneSet(sceneInstance);
        currentScene = sceneInstance;
        props.three.scene = currentScene;
        scene.add(currentScene);
        sceneSet = true;
        addLightHelpers();
      }
    };

    const addCamera = (evt: any) => {
      const data = evt.value;
      const child = props.three.scene?.getObjectByProperty('uuid', data.uuid);
      if (child !== undefined) cameras.set(data.name, child as Camera);

      if (child instanceof PerspectiveCamera) {
        const helper = new CameraHelper(child);
        cameraHelpers.set(child.name, helper);
        scene.add(helper);
      }

      setLastUpdate(Date.now());
    };

    const removeCamera = (evt: any) => {
      const helper = cameraHelpers.get(evt.value.name);
      if (helper !== undefined) {
        scene.remove(helper);
        helper.dispose();
      }
      cameras.delete(evt.value.name);
      setLastUpdate(Date.now());
    };

    const onSelectItem = (evt: any) => {
      const child = currentScene.getObjectByProperty('uuid', evt.value.uuid);
      if (child) child.add(axisHelper);
    };

    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, sceneUpdate);
    debugDispatcher.addEventListener(ToolEvents.ADD_CAMERA, addCamera);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_CAMERA, removeCamera);
    debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, sceneUpdate);
      debugDispatcher.removeEventListener(ToolEvents.ADD_CAMERA, addCamera);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_CAMERA, removeCamera);
      debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    };
  }, []);

  // Resize handling + drawing
  useEffect(() => {
    if (renderer === null) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let bw = Math.floor(width / 2);
    let bh = Math.floor(height / 2);
    let raf = -1;

    const fpoGeom = new BufferGeometry();
    const fpoMaterial = new MeshBasicMaterial();
    const fpoGroup = new Group();

    const onResize = () => {
      width = window.innerWidth - 300;
      height = window.innerHeight;
      bw = Math.floor(width / 2);
      bh = Math.floor(height / 2);
      props.three.resize(width, height);

      if (props.onSceneResize !== undefined && sceneSet) {
        props.onSceneResize(currentScene, width, height);
      }

      let cw = width;
      let ch = height;
      switch (mode) {
        case 'Side by Side':
          cw = bw;
          ch = height;
          break;
        case 'Stacked':
          cw = width;
          ch = bh;
          break;
        case 'Quad':
          cw = bw;
          ch = bh;
          break;
      }

      const aspect = cw / ch;
      cameras.forEach((camera) => {
        if (camera instanceof OrthographicCamera) {
          camera.left = cw / -2;
          camera.right = cw / 2;
          camera.top = ch / 2;
          camera.bottom = ch / -2;
          if (camera.name === 'UI') {
            camera.position.x = width / 2;
            camera.position.y = height / -2;
            camera.position.z = 100;
          }
          camera.updateProjectionMatrix();
        } else if (camera instanceof PerspectiveCamera) {
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
          cameraHelpers.get(camera.name)?.update();
        }
      });
    };

    function getSceneOverride(mode: RenderMode): Material | null {
      switch (mode) {
        case 'Depth':
          return depthMaterial;
        case 'Normals':
          return normalsMaterial;
        case 'Renderer':
          return null;
        case 'UVs':
          return uvMaterial;
        case 'Wireframe':
          return wireframeMaterial;
      }
      return null;
    }

    const drawSingle = () => {
      const material = getSceneOverride(tlRender);
      scene.overrideMaterial = material;
      renderer.setViewport(0, 0, width, height);
      renderer.setScissor(0, 0, width, height);
      currentScene?.onBeforeRender(renderer, currentScene, tlCam, fpoGeom, fpoMaterial, fpoGroup);
      renderer.render(scene, tlCam);
    };

    const drawDouble = () => {
      const materialA = getSceneOverride(tlRender);
      const materialB = getSceneOverride(trRender);
      scene.overrideMaterial = materialA;
      if (mode === 'Side by Side') {
        renderer.setViewport(0, 0, bw, height);
        renderer.setScissor(0, 0, bw, height);
        currentScene?.onBeforeRender(renderer, currentScene, tlCam, fpoGeom, fpoMaterial, fpoGroup);
        renderer.render(scene, tlCam);

        scene.overrideMaterial = materialB;
        renderer.setViewport(bw, 0, bw, height);
        renderer.setScissor(bw, 0, bw, height);
        currentScene?.onBeforeRender(renderer, currentScene, trCam, fpoGeom, fpoMaterial, fpoGroup);
        renderer.render(scene, trCam);
      } else {
        const y = height - bh;
        renderer.setViewport(0, y, width, bh);
        renderer.setScissor(0, y, width, bh);
        currentScene?.onBeforeRender(renderer, currentScene, tlCam, fpoGeom, fpoMaterial, fpoGroup);
        renderer.render(scene, tlCam);

        scene.overrideMaterial = materialB;
        renderer.setViewport(0, 0, width, bh);
        renderer.setScissor(0, 0, width, bh);
        currentScene?.onBeforeRender(renderer, currentScene, trCam, fpoGeom, fpoMaterial, fpoGroup);
        renderer.render(scene, trCam);
      }
    };

    const drawQuad = () => {
      const materialA = getSceneOverride(tlRender);
      const materialB = getSceneOverride(trRender);
      const materialC = getSceneOverride(blRender);
      const materialD = getSceneOverride(brRender);
      let x = 0;
      let y = 0;
      y = height - bh;

      // TL
      x = 0;
      scene.overrideMaterial = materialA;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      currentScene?.onBeforeRender(renderer, currentScene, tlCam, fpoGeom, fpoMaterial, fpoGroup);
      renderer.render(scene, tlCam);

      // TR
      x = bw;
      scene.overrideMaterial = materialB;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      currentScene?.onBeforeRender(renderer, currentScene, trCam, fpoGeom, fpoMaterial, fpoGroup);
      renderer.render(scene, trCam);

      y = 0;

      // BL
      x = 0;
      scene.overrideMaterial = materialC;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      currentScene?.onBeforeRender(renderer, currentScene, blCam, fpoGeom, fpoMaterial, fpoGroup);
      renderer.render(scene, blCam);

      // BR
      x = bw;
      scene.overrideMaterial = materialD;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      currentScene?.onBeforeRender(renderer, currentScene, brCam, fpoGeom, fpoMaterial, fpoGroup);
      renderer.render(scene, brCam);
    };

    const onUpdate = () => {
      // Updates
      controls.forEach((control: OrbitControls) => {
        control.update();
      });
      cameraHelpers.forEach((helper: CameraHelper) => {
        helper.update();
      });
      lightHelpers.forEach((helper: LightHelper) => {
        if (helper['update'] !== undefined) helper['update']();
      });

      if (props.onSceneUpdate !== undefined && sceneSet) props.onSceneUpdate(currentScene);

      // Drawing
      renderer.clear();
      switch (mode) {
        case 'Single':
          drawSingle();
          break;
        case 'Side by Side':
        case 'Stacked':
          drawDouble();
          break;
        case 'Quad':
          drawQuad();
          break;
      }

      raf = requestAnimationFrame(onUpdate);
    };

    // Start rendering
    assignControls();
    window.addEventListener('resize', onResize);
    onResize();
    onUpdate();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      raf = -1;
    };
  }, [mode, renderer]);

  // Raycaster
  useEffect(() => {
    if (renderer !== null) {
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
      const raycaster = new Raycaster();
      const pointer = new Vector2();
      let currentCamera = tlCam;
      let currentWindow = tlWindow;
      let selectedItem: Object3D | undefined = undefined;
      let cameraControls: CameraControls | undefined = undefined;
      let raf = -1;

      const updateCamera = (mouseX: number, mouseY: number, hw: number, hh: number) => {
        switch (mode) {
          case 'Quad':
            if (mouseX < hw) {
              if (mouseY < hh) {
                currentCamera = tlCam;
                raycaster.setFromCamera(pointer, tlCam);
              } else {
                currentCamera = blCam;
                raycaster.setFromCamera(pointer, blCam);
              }
            } else {
              if (mouseY < hh) {
                currentCamera = trCam;
                raycaster.setFromCamera(pointer, trCam);
              } else {
                currentCamera = brCam;
                raycaster.setFromCamera(pointer, brCam);
              }
            }
            break;
          case 'Side by Side':
            if (mouseX < hw) {
              currentCamera = tlCam;
              raycaster.setFromCamera(pointer, tlCam);
            } else {
              currentCamera = trCam;
              raycaster.setFromCamera(pointer, trCam);
            }
            break;
          case 'Single':
            currentCamera = tlCam;
            raycaster.setFromCamera(pointer, tlCam);
            break;
          case 'Stacked':
            if (mouseY < hh) {
              currentCamera = tlCam;
              raycaster.setFromCamera(pointer, tlCam);
            } else {
              currentCamera = trCam;
              raycaster.setFromCamera(pointer, trCam);
            }
            break;
        }

        if (currentCamera === tlCam) {
          currentWindow = tlWindow;
        } else if (currentCamera === trCam) {
          currentWindow = trWindow;
        } else if (currentCamera === blCam) {
          currentWindow = blWindow;
        } else if (currentCamera === brCam) {
          currentWindow = brWindow;
        }
      };

      const onMouseMove = (event: MouseEvent) => {
        const size = new Vector2();
        renderer!.getSize(size);

        const mouseX = Math.min(event.clientX, size.x);
        const mouseY = Math.min(event.clientY, size.y);
        pointer.x = mapLinear(mouseX, 0, size.x, -1, 1);
        pointer.y = mapLinear(mouseY, 0, size.y, 1, -1);

        const hw = size.x / 2;
        const hh = size.y / 2;

        const sideBySide = () => {
          if (mouseX < hw) {
            pointer.x = mapLinear(mouseX, 0, hw, -1, 1);
          } else {
            pointer.x = mapLinear(mouseX, hw, size.x, -1, 1);
          }
        };

        const stacked = () => {
          if (mouseY < hh) {
            pointer.y = mapLinear(mouseY, 0, hh, 1, -1);
          } else {
            pointer.y = mapLinear(mouseY, hh, size.y, 1, -1);
          }
        };

        // mapLinear
        switch (mode) {
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

        updateCamera(mouseX, mouseY, hw, hh);

        if (interactionMode === 'Orbit') return;
        const intersects = raycaster.intersectObjects(currentScene.children);
        if (intersects.length > 0) interactionHelper.position.copy(intersects[0].point);
      };

      const onClick = (event: MouseEvent) => {
        if (interactionMode === 'Orbit') return;

        const size = new Vector2();
        renderer!.getSize(size);
        if (event.clientX >= size.x) return;

        onMouseMove(event);

        const intersects = raycaster.intersectObjects(currentScene.children);
        if (intersects.length > 0) {
          props.three.getObject(intersects[0].object.uuid);
          interactionHelper.visible = false;
          setInteractionMode('Orbit');
          setLastUpdate(Date.now());
        }
      };

      const updateCameraControls = (control: OrbitControls, reposition = false) => {
        if (selectedItem === undefined) return;
        cancelAnimationFrame(raf);
        raf = -1;

        if (cameraControls) cameraControls.smoothTime = 0.1;

        const speed = 0.15;
        const clock = new Clock();
        clock.start();
        selectedItem.getWorldPosition(control.target0);

        const onUpdate = () => {
          // Update
          const delta = clock.getDelta();
          if (cameraControls) cameraControls.update(delta);

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
            cancelAnimationFrame(raf);
            raf = -1;
            clearControls();
          } else {
            raf = requestAnimationFrame(onUpdate);
          }
        };
        onUpdate();
      };

      const clearControls = () => {
        if (cameraControls !== undefined) {
          cameraControls.disconnect();
          cameraControls.dispose();
          cameraControls = undefined;
        }
      };

      const onKey = (evt: KeyboardEvent) => {
        if (selectedItem !== undefined) {
          if (evt.ctrlKey) {
            if (currentCamera.name === 'UI') return;

            const currentControls = controls.get(currentCamera.name)!;
            if (evt.key === '0') {
              clearControls();

              cameraControls = new CameraControls(currentCamera, currentWindow.current!);
              if (selectedItem instanceof Mesh || selectedItem instanceof SkinnedMesh) {
                selectedItem.geometry.computeBoundingBox();
                cameraControls.fitToBox(selectedItem.geometry.boundingBox, true);
              } else {
                cameraControls.fitToSphere(selectedItem, true);
              }
              updateCameraControls(currentControls, true);
            } else if (evt.key === '1') {
              clearControls();
  
              // Rotate to Front
              cameraControls = new CameraControls(currentCamera, currentWindow.current!);
              cameraControls.rotateTo(0, Math.PI * 0.5, true);
              cameraControls.moveTo(selectedItem.position.x, selectedItem.position.y, 0, true);
              updateCameraControls(currentControls);
            } else if (evt.key === '2') {
              clearControls();
  
              // Rotate to Top
              cameraControls = new CameraControls(currentCamera, currentWindow.current!);
              cameraControls.rotateTo(0, 0, true);
              cameraControls.moveTo(selectedItem.position.x, 0, selectedItem.position.z, true);
              updateCameraControls(currentControls);
            } else if (evt.key === '3') {
              clearControls();
  
              // Rotate to Right
              cameraControls = new CameraControls(currentCamera, currentWindow.current!);
              cameraControls.rotateTo(Math.PI / 2, Math.PI / 2, true);
              cameraControls.moveTo(0, selectedItem.position.y, selectedItem.position.z, true);
              updateCameraControls(currentControls);
            } else if (evt.key === '4') {
              clearControls();
  
              // Rotate to Back
              cameraControls = new CameraControls(currentCamera, currentWindow.current!);
              cameraControls.rotateTo(Math.PI, Math.PI / 2, true);
              cameraControls.moveTo(selectedItem.position.x, selectedItem.position.y, 0, true);
              updateCameraControls(currentControls);
            } else if (evt.key === '5') {
              clearControls();
  
              // Rotate to Ortho
              cameraControls = new CameraControls(currentCamera, currentWindow.current!);
              cameraControls.rotateTo(degToRad(45), degToRad(45), true);
              updateCameraControls(currentControls);
            }
          }
        }
      };

      const onSelectItem = (evt: any) => {
        selectedItem = currentScene.getObjectByProperty('uuid', evt.value.uuid);
      };

      const element = containerRef.current!;
      element.addEventListener('mousemove', onMouseMove, false);
      element.addEventListener('click', onClick, false);
      window.addEventListener('keydown', onKey, false);
      debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
      return () => {
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('click', onClick);
        window.removeEventListener('keydown', onKey);
        debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
      };
    }
  }, [mode, renderer, interactionMode]);

  // Camera names
  const cameraOptions: string[] = [];
  cameras.forEach((_: Camera, key: string) => {
    cameraOptions.push(key);
  });

  return (
    <div className='multiview'>
      <canvas ref={canvasRef} />

      {renderer !== null && (
        <>
          <div className={`cameras ${mode === 'Single' || mode === 'Stacked' ? 'single' : ''}`} ref={containerRef}>
            {mode === 'Single' && (
              <>
                <CameraWindow
                  camera={tlCam}
                  options={cameraOptions}
                  ref={tlWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(tlCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(tlCam);
                      tlCam = camera;
                      ls.setItem(`${appID}_tlCam`, camera.name);
                      createControls(camera, tlWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    tlRender = value;
                    ls.setItem(`${appID}_tlRender`, value);
                  }}
                />
              </>
            )}

            {(mode === 'Side by Side' || mode === 'Stacked') && (
              <>
                <CameraWindow
                  camera={tlCam}
                  options={cameraOptions}
                  ref={tlWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(tlCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(tlCam);
                      tlCam = camera;
                      ls.setItem(`${appID}_tlCam`, camera.name);
                      createControls(camera, tlWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    tlRender = value;
                    ls.setItem(`${appID}_tlRender`, value);
                  }}
                />
                <CameraWindow
                  camera={trCam}
                  options={cameraOptions}
                  ref={trWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(trCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(trCam);
                      trCam = camera;
                      ls.setItem(`${appID}_trCam`, camera.name);
                      createControls(camera, trWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    trRender = value;
                    ls.setItem(`${appID}_trRender`, value);
                  }}
                />
              </>
            )}

            {mode === 'Quad' && (
              <>
                <CameraWindow
                  camera={tlCam}
                  options={cameraOptions}
                  ref={tlWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(tlCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(tlCam);
                      tlCam = camera;
                      ls.setItem(`${appID}_tlCam`, camera.name);
                      createControls(camera, tlWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    tlRender = value;
                    ls.setItem(`${appID}_tlRender`, value);
                  }}
                />
                <CameraWindow
                  camera={trCam}
                  options={cameraOptions}
                  ref={trWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(trCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(trCam);
                      trCam = camera;
                      ls.setItem(`${appID}_trCam`, camera.name);
                      createControls(camera, trWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    trRender = value;
                    ls.setItem(`${appID}_trRender`, value);
                  }}
                />
                <CameraWindow
                  camera={blCam}
                  options={cameraOptions}
                  ref={blWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(blCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(blCam);
                      blCam = camera;
                      ls.setItem(`${appID}_blCam`, camera.name);
                      createControls(camera, blWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    blRender = value;
                    ls.setItem(`${appID}_blRender`, value);
                  }}
                />
                <CameraWindow
                  camera={brCam}
                  options={cameraOptions}
                  ref={brWindow}
                  onSelectCamera={(value: string) => {
                    controls.get(brCam.name)?.dispose();
                    const camera = cameras.get(value);
                    if (camera !== undefined) {
                      clearCamera(brCam);
                      brCam = camera;
                      ls.setItem(`${appID}_brCam`, camera.name);
                      createControls(camera, brWindow.current!);
                    }
                  }}
                  onSelectRenderMode={(value: RenderMode) => {
                    brRender = value;
                    ls.setItem(`${appID}_brRender`, value);
                  }}
                />
              </>
            )}
          </div>

          <div className='settings' key={lastUpdate}>
            {/* Mode */}
            <Dropdown
              title='View'
              index={ModeOptions.indexOf(mode)}
              options={ModeOptions}
              onSelect={(value: string) => {
                if (value === mode) return;
                killControls();
                setMode(value as MultiViewMode);
              }}
              open={modeOpen}
              onToggle={(value: boolean) => {
                setModeOpen(value);
                if (renderModeOpen) setRenderModeOpen(false);
                if (interactionModeOpen) setInteractionModeOpen(false);
              }}
            />

            {/* Interaction Mode */}
            <Dropdown
              title='Interact'
              index={interactionMode === 'Orbit' ? 0 : 1}
              options={[
                'Orbit Mode',
                'Selection Mode',
              ]}
              onSelect={(value: string) => {
                interactionHelper.visible = value === 'Selection Mode';
                setInteractionMode(interactionHelper.visible ? 'Selection' : 'Orbit');
              }}
              open={interactionModeOpen}
              onToggle={(value: boolean) => {
                if (modeOpen) setModeOpen(false);
                if (renderModeOpen) setRenderModeOpen(false);
                setInteractionModeOpen(value);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
