// Components
import SceneHierarchy from './sceneHierarchy/SceneHierarchy'

type EditorProps = {
  children?: JSX.Element | JSX.Element[]
}

export default function Editor(props: EditorProps) {
  return (
    <div className="editor">
      <div className="navBar">{props.children}</div>
      <SceneHierarchy />
    </div>
  )
}
