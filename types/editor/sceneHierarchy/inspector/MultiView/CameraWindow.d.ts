/// <reference types="react" />
import './CameraWindow.scss';
import { Camera } from 'three';
interface CameraWindowProps {
    camera: Camera;
    onSelect: (value: string) => void;
    options: string[];
}
declare const CameraWindow: import("react").ForwardRefExoticComponent<CameraWindowProps & import("react").RefAttributes<HTMLDivElement>>;
export default CameraWindow;
