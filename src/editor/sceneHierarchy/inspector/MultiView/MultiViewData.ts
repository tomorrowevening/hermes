import { Camera, CameraHelper, MeshBasicMaterial, MeshNormalMaterial, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import UVMaterial from './UVMaterial';

export type MultiViewMode = 'Single' | 'Side by Side' | 'Stacked' |'Quad';
export const ModeOptions: MultiViewMode[] = [
  'Single',
  'Side by Side',
  'Stacked',
  'Quad'
];

// Cameras

export const cameras: Map<string, Camera> = new Map();
export const controls: Map<string, OrbitControls> = new Map();
export const helpers: Map<string, CameraHelper> = new Map();
export const cameraOptions: string[] = [
  'Top',
  'Bottom',
  'Left',
  'Right',
  'Front',
  'Back',
  'Orthographic',
  'Debug',
];

export function createOrtho(name: string, position: Vector3) {
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

export const debugCamera = new PerspectiveCamera(60, 1, 50, 3000);
debugCamera.name = 'Debug';
debugCamera.position.set(500, 500, 500);
debugCamera.lookAt(0, 0, 0);
cameras.set('Debug', debugCamera);

// Rendering

export type RenderMode = 'Default' | 'Normals' | 'Wireframe' | 'UVs';
export const renderOptions: RenderMode[] = [
  'Default',
  'Normals',
  'Wireframe',
  'UVs',
];
export const normalsMaterial = new MeshNormalMaterial();
export const wireframeMaterial = new MeshBasicMaterial({
  opacity: 0.33,
  transparent: true,
  wireframe: true
});
export const uvMaterial = new UVMaterial();
