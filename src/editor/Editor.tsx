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
      <div className='header'>{props.header}</div>
      {props.children}
      <div className='footer'>{props.footer}</div>
    </div>
  );
}
