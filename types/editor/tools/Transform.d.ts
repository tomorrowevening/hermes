import { Camera, EventDispatcher } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import RemoteThree from '@/core/remote/RemoteThree';
export default class Transform extends EventDispatcher {
    static DRAG_START: string;
    static DRAG_END: string;
    private static _instance;
    three: RemoteThree;
    activeCamera: Camera;
    controls: Map<string, TransformControls>;
    private visibility;
    private groups;
    clear(): void;
    add(name: string): TransformControls;
    get(name: string): TransformControls | undefined;
    remove(name: string): boolean;
    enabled(value: boolean): void;
    updateCamera(camera: Camera, element: HTMLElement): void;
    show(): void;
    hide(): void;
    static get instance(): Transform;
}
