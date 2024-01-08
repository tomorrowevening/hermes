import { Camera, Scene, WebGLRenderer } from 'three';
import './MultiView.scss';
export interface MultiViewProps {
    scene: Scene;
    renderer: WebGLRenderer;
    cameras: Camera[];
}
export default function MultiView(props: MultiViewProps): import("react/jsx-runtime").JSX.Element;