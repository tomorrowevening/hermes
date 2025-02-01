import { Scene } from 'three';
import Application from '@/core/Application';
import RemoteThree from '@/core/remote/RemoteThree';
interface ThreeEditorProps {
    app: Application;
    three: RemoteThree;
    scenes: Map<string, any>;
    onSceneSet?: (scene: Scene) => void;
    onSceneUpdate?: (scene: Scene) => void;
    onSceneResize?: (scene: Scene, width: number, height: number) => void;
}
export default function ThreeEditor(props: ThreeEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
