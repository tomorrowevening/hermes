import { PerspectiveCamera, WebGLRenderer } from 'three';
import RemoteThree from '../core/remote/RemoteThree';
export declare function inspectComposerPass(pass: any, three: RemoteThree, includeTextures?: boolean): void;
export declare function inspectComposer(composer: any, three: RemoteThree): void;
export declare function clearComposerGroups(three: RemoteThree): void;
export declare function generateCubemap(renderer: WebGLRenderer, camera: PerspectiveCamera, composer: any, size?: number): Promise<void>;
