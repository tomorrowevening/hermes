import { useEffect } from 'react';
import { Application } from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';
// Views
import ThreeEditor from '../editor/ThreeEditor';
import BaseScene from './three/scenes/BaseScene';
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

  return (
    <ThreeEditor
      three={props.app.components.get('three') as RemoteThree}
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
