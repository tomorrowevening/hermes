import { useEffect } from 'react';
import { Camera, OrthographicCamera, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import './MultiView.scss';
import CameraWindow from './CameraWindow';

export interface MultiViewProps {
  scene: Scene;
  renderer: WebGLRenderer;
  cameras: Camera[]
}

const regionSize = 200;
const cameras: Map<string, Camera> = new Map();

function createOrtho(name: string, position: Vector3) {
  const camera = new OrthographicCamera(-regionSize, regionSize, regionSize, -regionSize, 1, 2000);
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
  let tlCam = cameras.get('Top')!;
  let trCam = cameras.get('Left')!;
  let blCam = cameras.get('Front')!;
  let brCam = cameras.get('Orthographic')!;

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
      let x = 0;
      let y = 0;

      props.renderer.clear();
      y = height - bh;

      // TL
      if (tlCam !== undefined) {
        x = 0;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(props.scene, tlCam);
      }

      // TR
      if (trCam !== undefined) {
        x = bw;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(props.scene, trCam);
      }

      y = 0;

      // BL
      if (tlCam !== undefined) {
        x = 0;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(props.scene, blCam);
      }

      // BR
      if (trCam !== undefined) {
        x = bw;
        props.renderer.setViewport(x, y, bw, bh);
        props.renderer.setScissor(x, y, bw, bh);
        props.renderer.render(props.scene, brCam);
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
      <CameraWindow index={0} options={options} onSelect={(value: string) => {
        const camera = cameras.get(value);
        if (camera !== undefined) tlCam = camera;
      }} />
      <CameraWindow index={2} options={options} onSelect={(value: string) => {
        const camera = cameras.get(value);
        if (camera !== undefined) trCam = camera;
      }} />
      <CameraWindow index={4} options={options} onSelect={(value: string) => {
        const camera = cameras.get(value);
        if (camera !== undefined) blCam = camera;
      }} />
      <CameraWindow index={6} options={options} onSelect={(value: string) => {
        const camera = cameras.get(value);
        if (camera !== undefined) brCam = camera;
      }} />
    </div>
  );
}
