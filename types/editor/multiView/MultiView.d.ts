import { Scene } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
import './MultiView.scss';
interface MultiViewProps {
    three: RemoteThree;
    scenes: Map<string, any>;
    onSceneSet?: (scene: Scene) => void;
    onSceneUpdate?: (scene: Scene) => void;
    onSceneResize?: (scene: Scene, width: number, height: number) => void;
}
export default function MultiView(props: MultiViewProps): import("react/jsx-runtime").JSX.Element;
export {};
