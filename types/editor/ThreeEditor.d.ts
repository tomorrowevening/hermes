import { Scene } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
interface ThreeEditorProps {
    three: RemoteThree;
    onSceneSet?: (scene: Scene) => void;
    onSceneUpdate?: (scene: Scene) => void;
    onSceneResize?: (scene: Scene, width: number, height: number) => void;
}
export default function ThreeEditor(props: ThreeEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
