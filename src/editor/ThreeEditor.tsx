import { useEffect } from 'react';
import { Scene } from 'three';
import Editor from './Editor';
import MultiView from './multiView/MultiView';
import RemoteThree from '../core/remote/RemoteThree';
import SidePanel from './sidePanel/SidePanel';
import { getSubItem, setItemProps, stripObject, stripScene, textureFromSrc } from './sidePanel/utils';

const EDITOR_UTILS = { stripObject, stripScene, getSubItem, setItemProps, textureFromSrc };

interface ThreeEditorProps {
  three: RemoteThree
  scenes: Map<string, any>
  onSceneAdd?: (scene: Scene) => void
  onSceneUpdate?: (scene: Scene) => void
  onSceneResize?: (scene: Scene, width: number, height: number) => void
}

export default function ThreeEditor(props: ThreeEditorProps) {
  useEffect(() => {
    props.three.setEditorUtils(EDITOR_UTILS);
    return () => props.three.setEditorUtils(undefined);
  }, [props.three]);

  return (
    <Editor>
      <MultiView
        three={props.three}
        scenes={props.scenes}
        onSceneAdd={props.onSceneAdd}
        onSceneResize={props.onSceneResize}
        onSceneUpdate={props.onSceneUpdate}
      />
      <SidePanel three={props.three} />
    </Editor>
  );
}
