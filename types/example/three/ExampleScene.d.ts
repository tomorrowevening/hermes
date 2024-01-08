import { CubeTexture, PerspectiveCamera, Scene } from 'three';
import FBXAnimation from './FBXAnimation';
export default class ExampleScene extends Scene {
    camera: PerspectiveCamera;
    envMap: CubeTexture;
    dance0: FBXAnimation;
    dance1: FBXAnimation;
    dance2: FBXAnimation;
    private customMat;
    private lastUpdate;
    constructor();
    private createCameras;
    private createLights;
    private createWorld;
    private createTestMaterials;
    resize(width: number, height: number): void;
    update(): void;
}
