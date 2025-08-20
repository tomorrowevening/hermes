import { useEffect, useState } from 'react';
import { Application } from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';
// Models
import { Events, threeDispatcher } from './constants';
// Views
import ThreeEditor from '../editor/ThreeEditor';
import BaseScene from './three/scenes/BaseScene';
import Scene1 from './three/scenes/Scene1';
import Scene2 from './three/scenes/Scene2';
import RTTScene from './three/scenes/RTTScene';
// Utils
import { customizeTheatreElements } from '../editor/theatreUtils';
import MultiView from '../editor/multiView/MultiView';

type CustomEditorProps = {
  app: Application
}

export default function CustomEditor(props: CustomEditorProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      customizeTheatreElements();
      setLoaded(true);
    };
    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
  }, []);

  const scenes: Map<string, any> = new Map();
  scenes.set('Scene1', Scene1);
  scenes.set('Scene2', Scene2);
  scenes.set('RTTScene', RTTScene);

  return (
    <>
      {loaded && (
        <ThreeEditor
          app={props.app}
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
      )}
    </>
  );
}
