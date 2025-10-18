import { useEffect, useState } from 'react';
import { IS_DEV, IS_EDITOR } from '../constants';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import RemoteSetup from './RemoteSetup';
import CustomEditor from '../CustomEditor';
import Wrapper from './Wrapper';
// Scenes
import Scene1 from '../three/scenes/Scene1';
import Scene2 from '../three/scenes/Scene2';
import RTTScene from '../three/scenes/RTTScene';

export default function AppWrapper() {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const instance = new Application();
    instance.detectSettings(IS_DEV, IS_EDITOR).then(() => {
      // TheatreJS
      instance.addComponent('theatre', new RemoteTheatre(IS_DEV, IS_EDITOR));

      // ThreeJS
      const scenes: Map<string, any> = new Map();
      scenes.set('Scene1', Scene1);
      scenes.set('Scene2', Scene2);
      scenes.set('RTTScene', RTTScene);
      const three = new RemoteThree('Hermes Example', IS_DEV, IS_EDITOR);
      three.scenes = scenes;
      instance.addComponent('three', three);

      // Ready
      setApp(instance);
    });
  }, []);

  return (
    <>
      {app !== null && (
        <>
          {app.debugEnabled && <RemoteSetup app={app} />}
          {app.editor && <CustomEditor app={app} />}
          <Wrapper app={app} />
        </>
      )}
    </>
  );
}