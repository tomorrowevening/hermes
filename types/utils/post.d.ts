import RemoteThree from '@/core/remote/RemoteThree';
import { EffectComposer } from 'postprocessing';
import { PerspectiveCamera, WebGLRenderer } from 'three';
export declare function inspectComposer(composer: EffectComposer, three: RemoteThree): void;
export declare function clearComposerGroups(three: RemoteThree): void;
export declare function generateCubemap(renderer: WebGLRenderer, camera: PerspectiveCamera, composer: EffectComposer, size?: number): Promise<void>;
