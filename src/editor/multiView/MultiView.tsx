import { useEffect, useRef, useState } from 'react';
import { AxesHelper, Camera, CameraHelper, Group, OrthographicCamera, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CameraWindow, { Dropdown } from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';
import { cameras, controls, depthMaterial, helpers, ModeOptions, MultiViewMode, normalsMaterial, RenderMode, renderOptions, uvMaterial, wireframeMaterial } from './MultiViewData';
import './MultiView.scss';
import RemoteThree from '@/core/remote/RemoteThree';
import { ToolEvents, debugDispatcher } from '../global';
import { dispose } from '../utils';
import { mapLinear } from 'three/src/math/MathUtils';

let currentRenderMode: RenderMode = 'Renderer';

// Scene

const scene = new Scene();
scene.name = 'Debug Scene';

let currentScene = new Scene();
scene.add(currentScene);

const helpersContainer = new Group();
helpersContainer.name = 'helpers';
scene.add(helpersContainer);

const grid = new InfiniteGridHelper();
helpersContainer.add(grid);

const axisHelper = new AxesHelper(500);
axisHelper.name = 'axisHelper';
helpersContainer.add(axisHelper);

const interactionHelper = new AxesHelper(100);
interactionHelper.name = 'interactionHelper';
helpersContainer.add(interactionHelper);
interactionHelper.visible = false;

let useRaycaster = false;

// Cameras

let tlCam = cameras.get('Debug')!;
let trCam = cameras.get('Orthographic')!;
let blCam = cameras.get('Front')!;
let brCam = cameras.get('Top')!;
let sceneSet = false;

interface MultiViewProps {
  three: RemoteThree;
  mode?: MultiViewMode;
  scenes: Map<string, any>;
  onSceneSet?: (scene: Scene) => void;
  onSceneUpdate?: (scene: Scene) => void;
}

export default function MultiView(props: MultiViewProps) {
  // States
  const [mode, setMode] = useState<MultiViewMode>(props.mode !== undefined ? props.mode : 'Single');
  const [renderer, setRenderer] = useState<WebGLRenderer | null>(null);
  const [modeOpen, setModeOpen] = useState(false);
  const [renderModeOpen, setRenderModeOpen] = useState(false);
  const [interactionModeOpen, setInteractionModeOpen] = useState(false);
  const [, setLastUpdate] = useState(Date.now());

  // References
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlWindow = useRef<HTMLDivElement>(null);
  const trWindow = useRef<HTMLDivElement>(null);
  const blWindow = useRef<HTMLDivElement>(null);
  const brWindow = useRef<HTMLDivElement>(null);

  const createControls = (camera: Camera, element: HTMLDivElement) => {
    // Previous items
    const prevControls = controls.get(camera.name);
    if (prevControls !== undefined) prevControls.dispose();
    controls.delete(camera.name);

    const prevHelper = helpers.get(camera.name);
    if (prevHelper !== undefined) {
      scene.remove(prevHelper);
      prevHelper.dispose();
    }
    helpers.delete(camera.name);

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
    
    if (camera instanceof PerspectiveCamera) {
      const helper = new CameraHelper(camera);
      helpers.set(camera.name, helper);
      scene.add(helper);
    }
  };

  const clearCamera = (camera: Camera) => {
    const helper = helpers.get(camera.name);
    if (helper !== undefined) {
      scene.remove(helper);
      helper.dispose();
      helpers.delete(camera.name);
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
      const helper = helpers.get(key);
      if (helper !== undefined) {
        scene.remove(helper);
        helper.dispose();
      }
      helpers.delete(key);
      controls.delete(key);
    });
    controls.clear();
    helpers.clear();
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
    setRenderer(instance);
  }, []);

  // Event handling
  useEffect(() => {
    const sceneUpdate = (evt: any) => {
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
      }
    };

    const addCamera = (evt: any) => {
      const data = evt.value;
      const child = props.three.scene?.getObjectByProperty('uuid', data.uuid);
      if (child !== undefined) cameras.set(data.name, child as Camera);
      setLastUpdate(Date.now());
    };

    const removeCamera = (evt: any) => {
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
          camera.updateProjectionMatrix();
        } else if (camera instanceof PerspectiveCamera) {
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          helpers.get(camera.name)?.update();
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

      <div className={`cameras ${mode === 'Single' || mode === 'Stacked' ? 'single' : ''}`} ref={containerRef}>
        {mode === 'Single' && (
          <>
            <CameraWindow camera={tlCam} options={cameraOptions} ref={tlWindow} onSelect={(value: string) => {
              controls.get(tlCam.name)?.dispose();
              const camera = cameras.get(value);
              if (camera !== undefined) {
                clearCamera(tlCam);
                tlCam = camera;
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
                createControls(camera, tlWindow.current!);
              }
            }} />
            <CameraWindow camera={trCam} options={cameraOptions} ref={trWindow} onSelect={(value: string) => {
              controls.get(trCam.name)?.dispose();
              const camera = cameras.get(value);
              if (camera !== undefined) {
                clearCamera(trCam);
                trCam = camera;
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
                createControls(camera, tlWindow.current!);
              }
            }} />
            <CameraWindow camera={trCam} options={cameraOptions} ref={trWindow} onSelect={(value: string) => {
              controls.get(trCam.name)?.dispose();
              const camera = cameras.get(value);
              if (camera !== undefined) {
                clearCamera(trCam);
                trCam = camera;
                createControls(camera, trWindow.current!);
              }
            }} />
            <CameraWindow camera={blCam} options={cameraOptions} ref={blWindow} onSelect={(value: string) => {
              controls.get(blCam.name)?.dispose();
              const camera = cameras.get(value);
              if (camera !== undefined) {
                clearCamera(blCam);
                blCam = camera;
                createControls(camera, blWindow.current!);
              }
            }} />
            <CameraWindow camera={brCam} options={cameraOptions} ref={brWindow} onSelect={(value: string) => {
              controls.get(brCam.name)?.dispose();
              const camera = cameras.get(value);
              if (camera !== undefined) {
                clearCamera(brCam);
                brCam = camera;
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
    </div>
  );
}
