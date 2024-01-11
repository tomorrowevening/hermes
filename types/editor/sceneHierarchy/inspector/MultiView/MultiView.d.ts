import { Camera, Scene, WebGLRenderer } from 'three';
import { MultiViewMode } from './MultiViewData';
import './MultiView.scss';
interface MultiViewProps {
    scene: Scene;
    renderer: WebGLRenderer;
    cameras: Camera[];
    mode?: MultiViewMode;
}
export default function MultiView(props: MultiViewProps): import("react/jsx-runtime").JSX.Element;
export {};
