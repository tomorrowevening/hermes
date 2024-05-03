// Libs
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AxesHelper,
  Camera,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Group,
  HemisphereLight,
  HemisphereLightHelper,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshNormalMaterial,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  Raycaster,
  RectAreaLight,
  Scene,
  SpotLight,
  SpotLightHelper,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mapLinear } from 'three/src/math/MathUtils';
import RemoteThree from '@/core/remote/RemoteThree';
import CameraWindow, { Dropdown } from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';
import { MultiViewMode, RenderMode } from './MultiViewData';
// Models
import { ToolEvents, debugDispatcher } from '../global';
// Components
import './MultiView.scss';
import UVMaterial from './UVMaterial';
// Utils
import { dispose } from '../utils';

let currentRenderMode: RenderMode = 'Renderer';

// Scene
let currentScene: any = undefined;
let useRaycaster = false;

// Cameras
let sceneSet = false;
let tlCam: any = null;
let trCam: any = null;
let blCam: any = null;
let brCam: any = null;

interface MultiViewProps {
  three: RemoteThree;
  scenes: Map<string, any>;
  onSceneSet?: (scene: Scene) => void;
  onSceneUpdate?: (scene: Scene) => void;
}

type LightHelper = DirectionalLightHelper | HemisphereLightHelper | RectAreaLightHelper | PointLightHelper | SpotLightHelper

export default function MultiView(props: MultiViewProps) {
  // Get Local Storage
  const appID = props.three.app.appID;
  const savedMode = localStorage.getItem(`${appID}_mode`);
  const tlCamName = localStorage.getItem(`${appID}_tlCam`) !== null ? localStorage.getItem(`${appID}_tlCam`) as string : 'Debug';
  const trCamName = localStorage.getItem(`${appID}_trCam`) !== null ? localStorage.getItem(`${appID}_trCam`) as string : 'Orthographic';
  const blCamName = localStorage.getItem(`${appID}_blCam`) !== null ? localStorage.getItem(`${appID}_blCam`) as string : 'Front';
  const brCamName = localStorage.getItem(`${appID}_brCam`) !== null ? localStorage.getItem(`${appID}_brCam`) as string : 'Top';

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

  const renderOptions: RenderMode[] = [
    'Renderer',
    'Depth',
    'Normals',
    'UVs',
    'Wireframe',
  ];

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

  // States
  const [mode, setMode] = useState<MultiViewMode>(savedMode !== null ? savedMode as MultiViewMode : 'Single');
  const [renderer, setRenderer] = useState<WebGLRenderer | null>(null);
  const [modeOpen, setModeOpen] = useState(false);
  const [renderModeOpen, setRenderModeOpen] = useState(false);
  const [interactionModeOpen, setInteractionModeOpen] = useState(false);
  const [, setLastUpdate] = useState(Date.now());

  // Save Local Storage
  localStorage.setItem(`${appID}_mode`, mode);
  localStorage.setItem(`${appID}_tlCam`, tlCamName);
  localStorage.setItem(`${appID}_trCam`, trCamName);
  localStorage.setItem(`${appID}_blCam`, blCamName);
  localStorage.setItem(`${appID}_brCam`, brCamName);

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

    tlCam = cameras.get(localStorage.getItem(`${appID}_tlCam`) as string)!;
    trCam = cameras.get(localStorage.getItem(`${appID}_trCam`) as string)!;
    blCam = cameras.get(localStorage.getItem(`${appID}_blCam`) as string)!;
    brCam = cameras.get(localStorage.getItem(`${appID}_brCam`) as string)!;
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

    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, sceneUpdate);
    debugDispatcher.addEventListener(ToolEvents.ADD_CAMERA, addCamera);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_CAMERA, removeCamera);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, sceneUpdate);
      debugDispatcher.removeEventListener(ToolEvents.ADD_CAMERA, addCamera);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_CAMERA, removeCamera);
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

    const onResize = () => {
      width = window.innerWidth - 300;
      height = window.innerHeight;
      bw = Math.floor(width / 2);
      bh = Math.floor(height / 2);
      renderer.setSize(width, height);

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
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          cameraHelpers.get(camera.name)?.update();
        }
      });
    };

    const drawSingle = () => {
      renderer.setViewport(0, 0, width, height);
      renderer.setScissor(0, 0, width, height);
      renderer.render(scene, tlCam);
    };

    const drawDouble = () => {
      if (mode === 'Side by Side') {
        renderer.setViewport(0, 0, bw, height);
        renderer.setScissor(0, 0, bw, height);
        renderer.render(scene, tlCam);

        renderer.setViewport(bw, 0, bw, height);
        renderer.setScissor(bw, 0, bw, height);
        renderer.render(scene, trCam);
      } else {
        const y = height - bh;
        renderer.setViewport(0, y, width, bh);
        renderer.setScissor(0, y, width, bh);
        renderer.render(scene, tlCam);

        renderer.setViewport(0, 0, width, bh);
        renderer.setScissor(0, 0, width, bh);
        renderer.render(scene, trCam);
      }
    };

    const drawQuad = () => {
      let x = 0;
      let y = 0;
      y = height - bh;

      // TL
      x = 0;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      renderer.render(scene, tlCam);

      // TR
      x = bw;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      renderer.render(scene, trCam);

      y = 0;

      // BL
      x = 0;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
      renderer.render(scene, blCam);

      // BR
      x = bw;
      renderer.setViewport(x, y, bw, bh);
      renderer.setScissor(x, y, bw, bh);
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
      const raycaster = new Raycaster();
      const pointer = new Vector2();

      const updateCamera = (mouseX: number, mouseY: number, hw: number, hh: number) => {
        switch (mode) {
          case 'Quad':
            if (mouseX < hw) {
              if (mouseY < hh) {
                raycaster.setFromCamera(pointer, tlCam);
              } else {
                raycaster.setFromCamera(pointer, blCam);
              }
            } else {
              if (mouseY < hh) {
                raycaster.setFromCamera(pointer, trCam);
              } else {
                raycaster.setFromCamera(pointer, brCam);
              }
            }
            break;
          case 'Side by Side':
            if (mouseX < hw) {
              raycaster.setFromCamera(pointer, tlCam);
            } else {
              raycaster.setFromCamera(pointer, trCam);
            }
            break;
          case 'Single':
            raycaster.setFromCamera(pointer, tlCam);
            break;
          case 'Stacked':
            if (mouseY < hh) {
              raycaster.setFromCamera(pointer, tlCam);
            } else {
              raycaster.setFromCamera(pointer, trCam);
            }
            break;
        }
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!useRaycaster) return;
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
        const intersects = raycaster.intersectObjects(currentScene.children);
        if (intersects.length > 0) interactionHelper.position.copy(intersects[0].point);
      };

      const onClick = (event: MouseEvent) => {
        if (!useRaycaster) return;

        const size = new Vector2();
        renderer!.getSize(size);
        if (event.clientX >= size.x) return;

        onMouseMove(event);

        const intersects = raycaster.intersectObjects(currentScene.children);
        if (intersects.length > 0) {
          props.three.getObject(intersects[0].object.uuid);
        }
      };

      const element = containerRef.current!;
      element.addEventListener('mousemove', onMouseMove, false);
      element.addEventListener('click', onClick, false);
      return () => {
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('click', onClick);
      };
    }
  }, [mode, renderer]);

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
                <CameraWindow camera={tlCam} options={cameraOptions} ref={tlWindow} onSelect={(value: string) => {
                  controls.get(tlCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(tlCam);
                    tlCam = camera;
                    localStorage.setItem(`${appID}_tlCam`, camera.name);
                    createControls(camera, tlWindow.current!);
                  }
                }} />
              </>
            )}

            {(mode === 'Side by Side' || mode === 'Stacked') && (
              <>
                <CameraWindow camera={tlCam} options={cameraOptions} ref={tlWindow} onSelect={(value: string) => {
                  controls.get(tlCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(tlCam);
                    tlCam = camera;
                    localStorage.setItem(`${appID}_tlCam`, camera.name);
                    createControls(camera, tlWindow.current!);
                  }
                }} />
                <CameraWindow camera={trCam} options={cameraOptions} ref={trWindow} onSelect={(value: string) => {
                  controls.get(trCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(trCam);
                    trCam = camera;
                    localStorage.setItem(`${appID}_trCam`, camera.name);
                    createControls(camera, trWindow.current!);
                  }
                }} />
              </>
            )}

            {mode === 'Quad' && (
              <>
                <CameraWindow camera={tlCam} options={cameraOptions} ref={tlWindow} onSelect={(value: string) => {
                  controls.get(tlCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(tlCam);
                    tlCam = camera;
                    localStorage.setItem(`${appID}_tlCam`, camera.name);
                    createControls(camera, tlWindow.current!);
                  }
                }} />
                <CameraWindow camera={trCam} options={cameraOptions} ref={trWindow} onSelect={(value: string) => {
                  controls.get(trCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(trCam);
                    trCam = camera;
                    localStorage.setItem(`${appID}_trCam`, camera.name);
                    createControls(camera, trWindow.current!);
                  }
                }} />
                <CameraWindow camera={blCam} options={cameraOptions} ref={blWindow} onSelect={(value: string) => {
                  controls.get(blCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(blCam);
                    blCam = camera;
                    localStorage.setItem(`${appID}_blCam`, camera.name);
                    createControls(camera, blWindow.current!);
                  }
                }} />
                <CameraWindow camera={brCam} options={cameraOptions} ref={brWindow} onSelect={(value: string) => {
                  controls.get(brCam.name)?.dispose();
                  const camera = cameras.get(value);
                  if (camera !== undefined) {
                    clearCamera(brCam);
                    brCam = camera;
                    localStorage.setItem(`${appID}_brCam`, camera.name);
                    createControls(camera, brWindow.current!);
                  }
                }} />
              </>
            )}
          </div>

          <div className='settings'>
            {/* Mode */}
            <Dropdown
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

            {/* Render Mode */}
            <Dropdown
              index={renderOptions.indexOf(currentRenderMode)}
              options={renderOptions}
              onSelect={(value: string) => {
                if (value === currentRenderMode) return;
                currentRenderMode = value as RenderMode;
                switch (currentRenderMode) {
                  case 'Depth':
                    scene.overrideMaterial = depthMaterial;
                    break;
                  case 'Normals':
                    scene.overrideMaterial = normalsMaterial;
                    break;
                  default:
                  case 'Renderer':
                    scene.overrideMaterial = null;
                    break;
                  case 'Wireframe':
                    scene.overrideMaterial = wireframeMaterial;
                    break;
                  case 'UVs':
                    scene.overrideMaterial = uvMaterial;
                    break;
                }
              }}
              open={renderModeOpen}
              onToggle={(value: boolean) => {
                if (modeOpen) setModeOpen(false);
                setRenderModeOpen(value);
                if (interactionModeOpen) setInteractionModeOpen(false);
              }}
            />

            {/* Interaction Mode */}
            <Dropdown
              index={0}
              options={[
                'Orbit Mode',
                'Selection Mode',
              ]}
              onSelect={(value: string) => {
                useRaycaster = value === 'Selection Mode';
                interactionHelper.visible = useRaycaster;
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
