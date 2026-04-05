import { CSSProperties } from 'react';
import './scss/index.scss';
type EditorProps = {
    header?: JSX.Element | JSX.Element[];
    children?: JSX.Element | JSX.Element[];
    footer?: JSX.Element | JSX.Element[];
    style?: CSSProperties;
};
declare const Editor: import("react").ForwardRefExoticComponent<EditorProps & import("react").RefAttributes<HTMLDivElement>>;
export default Editor;
