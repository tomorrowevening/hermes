import { Scene } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
import { MultiViewMode } from './MultiViewData';
import './MultiView.scss';
interface MultiViewProps {
    three: RemoteThree;
    mode?: MultiViewMode;
    scenes: Map<string, any>;
    onSceneSet?: (scene: Scene) => void;
    onSceneUpdate?: (scene: Scene) => void;
}
export default function MultiView(props: MultiViewProps): import("react/jsx-runtime").JSX.Element;
export {};
