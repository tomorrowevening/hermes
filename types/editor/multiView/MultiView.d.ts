import { WebGLRenderer } from 'three';
import { MultiViewMode } from './MultiViewData';
import './MultiView.scss';
import RemoteThree from '@/core/remote/RemoteThree';
interface MultiViewProps {
    renderer: WebGLRenderer;
    three: RemoteThree;
    mode?: MultiViewMode;
}
export default function MultiView(props: MultiViewProps): import("react/jsx-runtime").JSX.Element;
export {};