import { Scene } from 'three';
import Editor from './Editor';
import MultiView from './multiView/MultiView';
import RemoteThree from '@/core/remote/RemoteThree';
import SidePanel from './sidePanel/SidePanel';

interface ThreeEditorProps {
  three: RemoteThree
  onSceneSet?: (scene: Scene) => void
  onSceneUpdate?: (scene: Scene) => void
  onSceneResize?: (scene: Scene, width: number, height: number) => void
}

export default function ThreeEditor(props: ThreeEditorProps) {
  return (
    <Editor>
      <>
        <MultiView
          three={props.three}
          onSceneResize={props.onSceneResize}
          onSceneSet={props.onSceneSet}
          onSceneUpdate={props.onSceneUpdate}
        />
        <SidePanel three={props.three} />
      </>
    </Editor>
  );
}
