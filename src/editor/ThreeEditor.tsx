import { Scene } from 'three';
import Editor from './Editor';
import MultiView from './multiView/MultiView';
import Application from '@/core/Application';
import RemoteThree from '@/core/remote/RemoteThree';
import SidePanel from './sidePanel/SidePanel';

interface ThreeEditorProps {
  app: Application
  three: RemoteThree
  scenes: Map<string, any>
  onSceneSet?: (scene: Scene) => void
  onSceneUpdate?: (scene: Scene) => void
  onSceneResize?: (scene: Scene, width: number, height: number) => void
}

export default function ThreeEditor(props: ThreeEditorProps) {
  return (
    <Editor>
      <>
        <MultiView
          app={props.app}
          three={props.three}
          scenes={props.scenes}
          onSceneResize={props.onSceneResize}
          onSceneSet={props.onSceneSet}
          onSceneUpdate={props.onSceneUpdate}
        />
        <SidePanel app={props.app} three={props.three} />
      </>
    </Editor>
  );
}
