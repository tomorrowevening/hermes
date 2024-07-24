/// <reference types="react" />
import { Camera } from 'three';
import { RenderMode } from './MultiViewData';
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
    onSelectCamera: (value: string) => void;
    onSelectRenderMode: (value: RenderMode) => void;
    options: string[];
}
declare const CameraWindow: import("react").ForwardRefExoticComponent<CameraWindowProps & import("react").RefAttributes<HTMLDivElement>>;
export default CameraWindow;
