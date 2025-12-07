import { Scene } from 'three';
import Editor from './Editor';
import MultiView from './multiView/MultiView';
import RemoteThree from '../core/remote/RemoteThree';
import SidePanel from './sidePanel/SidePanel';

interface ThreeEditorProps {
  three: RemoteThree
  scenes: Map<string, any>
  onSceneAdd?: (scene: Scene) => void
  onSceneUpdate?: (scene: Scene) => void
  onSceneResize?: (scene: Scene, width: number, height: number) => void
}

export default function ThreeEditor(props: ThreeEditorProps) {
  return (
    <Editor>
      <>
        <MultiView
          three={props.three}
          scenes={props.scenes}
          onSceneAdd={props.onSceneAdd}
          onSceneResize={props.onSceneResize}
          onSceneUpdate={props.onSceneUpdate}
        />
        <SidePanel three={props.three} />
      </>
    </Editor>
  );
}
