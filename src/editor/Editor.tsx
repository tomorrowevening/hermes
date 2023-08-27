import { CSSProperties, Ref } from 'react'
import './scss/index.scss'

type EditorProps = {
  components?: JSX.Element | JSX.Element[]
  children?: JSX.Element | JSX.Element[]
  ref?: Ref<any>
  style?: CSSProperties
}

export default function Editor(props: EditorProps) {
  return (
    <div className="editor" ref={props.ref} style={props.style}>
      <div className="navBar">{props.children}</div>
      {props.components}
    </div>
  )
}
