import RemoteThree from '../core/remote/RemoteThree';
import { PerspectiveCamera, WebGLRenderer } from 'three';
export declare function inspectComposer(composer: any, three: RemoteThree): void;
export declare function clearComposerGroups(three: RemoteThree): void;
export declare function generateCubemap(renderer: WebGLRenderer, camera: PerspectiveCamera, composer: any, size?: number): Promise<void>;
