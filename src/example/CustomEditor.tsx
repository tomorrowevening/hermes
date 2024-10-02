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
// Utils
import { customizeTheatreElements } from '../editor/theatreUtils';

// Referenced Scenes
const scenes: Map<string, any> = new Map();
scenes.set('Scene1', Scene1);
scenes.set('Scene2', Scene2);
scenes.set('RTTScene', RTTScene);

export default function CustomEditor() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      setTimeout(() => {
        customizeTheatreElements();
      }, 100);
      setLoaded(true);
    };
    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
  }, []);

  const three = app.components.get('three') as RemoteThree;
  return (
    <>
      {loaded && app.editor && (
        <ThreeEditor
          three={three}
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
