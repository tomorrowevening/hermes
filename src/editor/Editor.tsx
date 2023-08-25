import './scss/index.scss'

type EditorProps = {
  components?: JSX.Element | JSX.Element[]
  children?: JSX.Element | JSX.Element[]
}

export default function Editor(props: EditorProps) {
  return (
    <div className="editor">
      <div className="navBar">{props.children}</div>
      {props.components}
    </div>
  )
}
