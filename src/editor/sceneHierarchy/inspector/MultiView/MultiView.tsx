import { useEffect, useRef, useState } from 'react';
import { AxesHelper, Camera, CameraHelper, MeshBasicMaterial, MeshNormalMaterial, OrthographicCamera, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CameraWindow, { Dropdown } from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';
import './MultiView.scss';

type MultiViewMode = 'Single' | 'Side by Side' | 'Stacked' |'Quad';
const ModeOptions: MultiViewMode[] = [
  'Single',
  'Side by Side',
  'Stacked',
  'Quad'
];
interface MultiViewProps {
  scene: Scene;
  renderer: WebGLRenderer;
  cameras: Camera[];
  mode?: MultiViewMode;
}

const cameras: Map<string, Camera> = new Map();
const controls: Map<string, OrbitControls> = new Map();
const helpers: Map<string, CameraHelper> = new Map();

function createOrtho(name: string, position: Vector3) {
  const camera = new OrthographicCamera(-100, 100, 100, -100, 50, 3000);
  camera.name = name;
  camera.position.copy(position);
  camera.lookAt(0, 0, 0);
  cameras.set(name, camera);
  return camera;
}

// Cameras

createOrtho('Top', new Vector3(0, 1000, 0));
createOrtho('Bottom', new Vector3(0, -1000, 0));
createOrtho('Left', new Vector3(-1000, 0, 0));
createOrtho('Right', new Vector3(1000, 0, 0));
createOrtho('Front', new Vector3(0, 0, 1000));
createOrtho('Back', new Vector3(0, 0, -1000));
createOrtho('Orthographic', new Vector3(1000, 1000, 1000));

const debugCamera = new PerspectiveCamera(60, 1, 50, 3000);
debugCamera.name = 'Debug';
debugCamera.position.set(500, 500, 500);
debugCamera.lookAt(0, 0, 0);
cameras.set('Debug', debugCamera);

type RenderMode = 'Default' | 'Normals' | 'Wireframe';
let currentRenderMode: RenderMode = 'Default';
const renderOptions: RenderMode[] = [
  'Default',
  'Normals',
  'Wireframe',
];
const normalsMaterial = new MeshNormalMaterial();
const wireframeMaterial = new MeshBasicMaterial({
  opacity: 0.33,
  transparent: true,
  wireframe: true
});

const scene = new Scene();

export default function MultiView(props: MultiViewProps) {
  const [mode, setMode] = useState<MultiViewMode>(props.mode !== undefined ? props.mode : 'Quad');

  const tlWindow = useRef<HTMLDivElement>(null);
  const trWindow = useRef<HTMLDivElement>(null);
  const blWindow = useRef<HTMLDivElement>(null);
  const brWindow = useRef<HTMLDivElement>(null);

  let tlCam = cameras.get('Debug')!;
  let trCam = cameras.get('Orthographic')!;
  let blCam = cameras.get('Front')!;
  let brCam = cameras.get('Top')!;

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

  // Add scene + helpers
  useEffect(() => {
    scene.name = 'Debug Scene';
    scene.add(props.scene);

    const grid = new InfiniteGridHelper();
    scene.add(grid);

    const axisHelper = new AxesHelper(500);
    axisHelper.name = 'axisHelper';
    scene.add(axisHelper);
  }, []);

  // Resize handling + drawing
  useEffect(() => {
    const size = props.renderer.getSize(new Vector2());
    let width = size.x;
    let height = size.y;
    let bw = Math.floor(width / 2);
    let bh = Math.floor(height / 2);
    let raf = -1;

    const onResize = () => {
      width = window.innerWidth - 300;
      height = window.innerHeight;
      bw = Math.floor(width / 2);
      bh = Math.floor(height / 2);

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
      props.renderer.setViewport(0, 0, width, height);
      props.renderer.setScissor(0, 0, width, height);
      props.renderer.render(scene, tlCam);
    };

    const drawDouble = () => {
      if (mode === 'Side by Side') {
        props.renderer.setViewport(0, 0, bw, height);
        props.renderer.setScissor(0, 0, bw, height);
        props.renderer.render(scene, tlCam);

        props.renderer.setViewport(bw, 0, bw, height);
        props.renderer.setScissor(bw, 0, bw, height);
        props.renderer.render(scene, trCam);
      } else {
        const y = height - bh;
        props.renderer.setViewport(0, y, width, bh);
        props.renderer.setScissor(0, y, width, bh);
        props.renderer.render(scene, tlCam);

        props.renderer.setViewport(0, 0, width, bh);
        props.renderer.setScissor(0, 0, width, bh);
        props.renderer.render(scene, trCam);
      }
    };

    const drawQuad = () => {
      let x = 0;
      let y = 0;
      y = height - bh;

      // TL
      x = 0;
      props.renderer.setViewport(x, y, bw, bh);
      props.renderer.setScissor(x, y, bw, bh);
      props.renderer.render(scene, tlCam);

      // TR
      x = bw;
      props.renderer.setViewport(x, y, bw, bh);
      props.renderer.setScissor(x, y, bw, bh);
      props.renderer.render(scene, trCam);

      y = 0;

      // BL
      x = 0;
      props.renderer.setViewport(x, y, bw, bh);
      props.renderer.setScissor(x, y, bw, bh);
      props.renderer.render(scene, blCam);

      // BR
      x = bw;
      props.renderer.setViewport(x, y, bw, bh);
      props.renderer.setScissor(x, y, bw, bh);
      props.renderer.render(scene, brCam);
    };

    const onUpdate = () => {
      // Updates
      controls.forEach((control: OrbitControls) => {
        control.update();
      });
      props.scene['update']();

      // Drawing
      props.renderer.clear();
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
  }, [mode]);

  const cameraOptions: string[] = [
    'Top',
    'Bottom',
    'Left',
    'Right',
    'Front',
    'Back',
    'Orthographic',
    'Debug',
  ];
  props.cameras.forEach((camera: Camera) => {
    cameras.set(camera.name, camera);
    cameraOptions.push(camera.name);
  });

  return (
    <div className='multiview'>
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
          index={0}
          options={renderOptions}
          onSelect={(value: string) => {
            if (value === currentRenderMode) return;
            currentRenderMode = value as RenderMode;
            switch (currentRenderMode) {
              case 'Default':
                scene.overrideMaterial = null;
                break;
              case 'Normals':
                scene.overrideMaterial = normalsMaterial;
                break;
              case 'Wireframe':
                scene.overrideMaterial = wireframeMaterial;
                break;
            }
          }}
        />
      </div>
    </div>
  );
}
