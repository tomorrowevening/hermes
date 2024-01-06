/// <reference types="react" />
import './CameraWindow.scss';
interface CameraWindowProps {
    index: number;
    onSelect: (value: string) => void;
    options: string[];
}
declare const CameraWindow: import("react").ForwardRefExoticComponent<CameraWindowProps & import("react").RefAttributes<HTMLDivElement>>;
export default CameraWindow;
