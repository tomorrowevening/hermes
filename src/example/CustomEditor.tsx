import { useEffect } from 'react';
import { Application } from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';
// Views
import ThreeEditor from '../editor/ThreeEditor';
import BaseScene from './three/scenes/BaseScene';
import Scene1 from './three/scenes/Scene1';
import Scene2 from './three/scenes/Scene2';
import RTTScene from './three/scenes/RTTScene';
// Utils
import MultiView from '../editor/multiView/MultiView';
import { customizeTheatreElements } from '../editor/theatreUtils';

type CustomEditorProps = {
  app: Application
}

export default function CustomEditor(props: CustomEditorProps) {
  useEffect(() => {
    customizeTheatreElements();
  }, []);

  const scenes: Map<string, any> = new Map();
  scenes.set('Scene1', Scene1);
  scenes.set('Scene2', Scene2);
  scenes.set('RTTScene', RTTScene);

  return (
    <ThreeEditor
      three={props.app.components.get('three') as RemoteThree}
      scenes={scenes}
      onSceneSet={(scene: any) => {
        scene.setup(props.app, MultiView.instance?.renderer);
        scene.init();
      }}
      onSceneUpdate={(scene: any) => {
        // Custom callback for animation updates
        const baseScene = scene as BaseScene;
        baseScene.update();
      }}
    />
  );
}
