import { useEffect, useRef } from 'react';
import { AxesHelper, Camera, CameraHelper, OrthographicCamera, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './MultiView.scss';
import CameraWindow from './CameraWindow';
import InfiniteGridHelper from './InfiniteGridHelper';

export interface MultiViewProps {
  scene: Scene;
  renderer: WebGLRenderer;
  cameras: Camera[]
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

createOrtho('Top', new Vector3(0, 1000, 0));
createOrtho('Bottom', new Vector3(0, -1000, 0));
createOrtho('Left', new Vector3(-1000, 0, 0));
createOrtho('Right', new Vector3(1000, 0, 0));
createOrtho('Front', new Vector3(0, 0, 1000));
createOrtho('Back', new Vector3(0, 0, -1000));
createOrtho('Orthographic', new Vector3(1000, 1000, 1000));

export default function MultiView(props: MultiViewProps) {
  const tlWindow = useRef<HTMLDivElement>(null);
  const trWindow = useRef<HTMLDivElement>(null);
  const blWindow = useRef<HTMLDivElement>(null);
  const brWindow = useRef<HTMLDivElement>(null);

  let tlCam = cameras.get('Top')!;
  let trCam = cameras.get('Right')!;
  let blCam = cameras.get('Front')!;
  let brCam = cameras.get('Orthographic')!;
  let scene = props.scene;

  const createControls = (camera: Camera, element: HTMLDivElement) => {
    // Previous items
    const prevControls = controls.get(camera.name);
    if (prevControls !== undefined) prevControls.dispose();
    controls.delete(camera.name);

    const prevHelper = helpers.get(camera.name);
    if (prevHelper !== undefined) prevHelper.dispose();
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
    
    const helper = new CameraHelper(camera);
    helpers.set(camera.name, helper);
    // scene.add(helper);
  };

  useEffect(() => {
    scene = new Scene();
    scene.name = 'Debug Scene';
    scene.add(props.scene);
    // Helpers
    scene.add(new InfiniteGridHelper());
    const axisHelper = new AxesHelper(500);
    axisHelper.name = 'axisHelper';
    scene.add(axisHelper);

    const size = props.renderer.getSize(new Vector2());
    let width = size.x;
    let height = size.y;
    let bw = Math.floor(width / 2);
    let bh = Math.floor(height / 2);
    let raf = -1;

    createControls(tlCam, tlWindow.current!);
    createControls(trCam, trWindow.current!);
    createControls(blCam, blWindow.current!);
    createControls(brCam, brWindow.current!);

    const onResize = () => {
      width = window.innerWidth - 300;
      height = window.innerHeight;
      bw = Math.floor(width / 2);
      bh = Math.floor(height / 2);
      // Cameras
      cameras.forEach((camera) => {
        if (camera instanceof OrthographicCamera) {
          camera.left = width / -2;
          camera.right = width / 2;
          camera.top = height / 2;
          camera.bottom = height / -2;
          camera.updateProjectionMatrix();
        } else if (camera instanceof PerspectiveCamera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      });
    };

    const onUpdate = () => {
      controls.forEach((control: OrbitControls) => {
        control.update();
      });

      let x = 0;
      let y = 0;

      props.renderer.clear();
      y = height - bh;

      // TL
      if (tlCam !== undefined) {
        x = 0;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(scene, tlCam);
      }

      // TR
      if (trCam !== undefined) {
        x = bw;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(scene, trCam);
      }

      y = 0;

      // BL
      if (tlCam !== undefined) {
        x = 0;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(scene, blCam);
      }

      // BR
      if (trCam !== undefined) {
        x = bw;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(scene, brCam);
      }

      raf = requestAnimationFrame(onUpdate);
    };

    // Start rendering
    window.addEventListener('resize', onResize);
    onResize();
    onUpdate();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      raf = -1;
    };
  }, []);

  const options: string[] = [
    'Top',
    'Bottom',
    'Left',
    'Right',
    'Front',
    'Back',
    'Orthographic',
  ];
  props.cameras.forEach((camera: Camera) => {
    cameras.set(camera.name, camera);
    options.push(camera.name);
  });

  return (
    <div className='multiview'>
      <CameraWindow index={0} options={options} ref={tlWindow} onSelect={(value: string) => {
        controls.get(tlCam.name)?.dispose();
        const camera = cameras.get(value);
        if (camera !== undefined) {
          tlCam = camera;
          createControls(camera, tlWindow.current!);
        }
      }} />
      <CameraWindow index={2} options={options} ref={trWindow} onSelect={(value: string) => {
        controls.get(trCam.name)?.dispose();
        const camera = cameras.get(value);
        if (camera !== undefined) {
          trCam = camera;
          createControls(camera, trWindow.current!);
        }
      }} />
      <CameraWindow index={4} options={options} ref={blWindow} onSelect={(value: string) => {
        controls.get(blCam.name)?.dispose();
        const camera = cameras.get(value);
        if (camera !== undefined) {
          blCam = camera;
          createControls(camera, blWindow.current!);
        }
      }} />
      <CameraWindow index={6} options={options} ref={brWindow} onSelect={(value: string) => {
        controls.get(brCam.name)?.dispose();
        const camera = cameras.get(value);
        if (camera !== undefined) {
          brCam = camera;
          createControls(camera, brWindow.current!);
        }
      }} />
    </div>
  );
}
