import { Scene } from 'three';
import { useEffect } from 'react';
import Editor from './Editor';
import MultiView from './multiView/MultiView';
import RemoteThree from '@/core/remote/RemoteThree';
import SidePanel from './sidePanel/SidePanel';
import { customizeTheatreElements } from './theatreUtils';

interface ThreeEditorProps {
  three: RemoteThree
  scenes: Map<string, any>
  onSceneSet?: (scene: Scene) => void
  onSceneUpdate?: (scene: Scene) => void
  onSceneResize?: (scene: Scene, width: number, height: number) => void
}

export default function ThreeEditor(props: ThreeEditorProps) {
  useEffect(() => {
    customizeTheatreElements();
  }, []);

  return (
    <Editor>
      <>
        <MultiView
          three={props.three}
          scenes={props.scenes}
          onSceneResize={props.onSceneResize}
          onSceneSet={props.onSceneSet}
          onSceneUpdate={props.onSceneUpdate}
        />
        <SidePanel three={props.three} />
      </>
    </Editor>
  );
}
