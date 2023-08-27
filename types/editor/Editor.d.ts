import { CSSProperties, Ref } from 'react';
import './scss/index.scss';
type EditorProps = {
    components?: JSX.Element | JSX.Element[];
    children?: JSX.Element | JSX.Element[];
    ref?: Ref<any>;
    style?: CSSProperties;
};
export default function Editor(props: EditorProps): import("react/jsx-runtime").JSX.Element;
export {};
