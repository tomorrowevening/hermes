import { Camera, Scene, WebGLRenderer } from 'three';
import './MultiView.scss';
type MultiViewMode = 'Single' | 'Side by Side' | 'Stacked' | 'Quad';
interface MultiViewProps {
    scene: Scene;
    renderer: WebGLRenderer;
    cameras: Camera[];
    mode?: MultiViewMode;
}
export default function MultiView(props: MultiViewProps): import("react/jsx-runtime").JSX.Element;
export {};
