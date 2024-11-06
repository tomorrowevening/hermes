import React, { useEffect, useState } from 'react';
import RemoteThree from '../core/remote/RemoteThree';
// Models
import { Events, app, threeDispatcher } from './constants';
// Views
import ThreeEditor from '../editor/ThreeEditor';
import BaseScene from './three/scenes/BaseScene';
import Scene1 from './three/scenes/Scene1';
import Scene2 from './three/scenes/Scene2';
import RTTScene from './three/scenes/RTTScene';

export default function CustomEditor() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
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
          three={app.components.get('three') as RemoteThree}
          scenes={scenes}
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
