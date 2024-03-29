/// <reference types="react" />
import { Camera } from 'three';
interface DropdownProps {
    index: number;
    open: boolean;
    onToggle: (value: boolean) => void;
    onSelect: (value: string) => void;
    options: string[];
    up?: boolean;
}
export declare const Dropdown: (props: DropdownProps) => import("react/jsx-runtime").JSX.Element;
interface CameraWindowProps {
    camera: Camera;
    onSelect: (value: string) => void;
    options: string[];
}
declare const CameraWindow: import("react").ForwardRefExoticComponent<CameraWindowProps & import("react").RefAttributes<HTMLDivElement>>;
export default CameraWindow;
