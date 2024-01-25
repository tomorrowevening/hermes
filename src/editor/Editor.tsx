import { CSSProperties, Ref } from 'react';
import './scss/index.scss';

type EditorProps = {
  header?: JSX.Element | JSX.Element[]
  children?: JSX.Element | JSX.Element[]
  footer?: JSX.Element | JSX.Element[]
  ref?: Ref<any>
  style?: CSSProperties
}

export default function Editor(props: EditorProps) {
  return (
    <div className='editor' ref={props.ref} style={props.style}>
      <header>{props.header}</header>
      {props.children}
      <footer>{props.footer}</footer>
    </div>
  );
}
