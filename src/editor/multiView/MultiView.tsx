import { useEffect, useRef, useState } from 'react';
import { AxesHelper, Camera, CameraHelper, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CameraWindow, { Dropdown } from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';
import { cameras, controls, depthMaterial, helpers, ModeOptions, MultiViewMode, normalsMaterial, RenderMode, renderOptions, uvMaterial, wireframeMaterial } from './MultiViewData';
import './MultiView.scss';
import RemoteThree from '@/core/remote/RemoteThree';
import { ToolEvents, debugDispatcher } from '../global';
import { dispose } from '../utils';

let currentRenderMode: RenderMode = 'Renderer';

// Scene

const scene = new Scene();
scene.name = 'Debug Scene';

let currentScene = new Scene();
scene.add(currentScene);

const grid = new InfiniteGridHelper();
scene.add(grid);

const axisHelper = new AxesHelper(500);
axisHelper.name = 'axisHelper';
scene.add(axisHelper);

// Cameras

let tlCam = cameras.get('Debug')!;
let trCam = cameras.get('Orthographic')!;
let blCam = cameras.get('Front')!;
let brCam = cameras.get('Top')!;

interface MultiViewProps {
  three: RemoteThree;
  mode?: MultiViewMode;
}

export default function MultiView(props: MultiViewProps) {
  // States
  const [mode, setMode] = useState<MultiViewMode>(props.mode !== undefined ? props.mode : 'Quad');
  const [renderer, setRenderer] = useState<WebGLRenderer | null>(null);

  // References
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const sceneUpdate = () => {
      dispose(currentScene);
      scene.remove(currentScene);
      if (props.three.scene !== undefined) {
        currentScene = props.three.scene;
        scene.add(currentScene);
      }
    };
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, sceneUpdate);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, sceneUpdate);
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

  // Camera names
  const cameraOptions: string[] = [];
  cameras.forEach((_: Camera, key: string) => {
    cameraOptions.push(key);
  });

  return (
    <div className='multiview'>
      <canvas ref={canvasRef} />

      <div className={`cameras ${mode === 'Single' || mode === 'Stacked' ? 'single' : ''}`}>
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
        />
      </div>
    </div>
  );
}
