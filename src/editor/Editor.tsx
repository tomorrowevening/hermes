import { CSSProperties, forwardRef } from 'react';
import './scss/index.scss';

type EditorProps = {
  header?: JSX.Element | JSX.Element[]
  children?: JSX.Element | JSX.Element[]
  footer?: JSX.Element | JSX.Element[]
  style?: CSSProperties
}

const Editor = forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  return (
    <div className='editor' ref={ref} style={props.style}>
      {props.header && <div className='header'>{props.header}</div>}
      {props.children}
      {props.footer && <div className='footer'>{props.footer}</div>}
    </div>
  );
});

Editor.displayName = 'Editor';
export default Editor;
