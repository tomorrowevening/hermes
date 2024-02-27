import React, { useEffect, useState } from 'react';
import studio from '@theatre/studio';
import { Events, app, threeDispatcher } from './constants';
import Editor from '../editor/Editor';
import Dropdown from '../editor/components/Dropdown';
import SidePanel from '../editor/sidePanel/SidePanel';
import MultiView from '../editor/multiView/MultiView';
import RemoteThree from '../core/remote/RemoteThree';
import RemoteController from '../core/RemoteController';
import RemoteComponents from '../core/remote/RemoteComponents';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import RemoteTweakpane from '../core/remote/RemoteTweakpane';
import { theatreApp, theatreEditor } from '../core/remote/theatreUtils';
import { theatreEditorApp } from '../editor/theatreUtils';
import { threeApp, threeEditor } from '../core/remote/threeUtils';
import { componentsApp } from '../core/remote/componentsUtils';
import { tweakpaneApp } from '../core/remote/tweakpaneUtils';
// Scenes
import BaseScene from './three/BaseScene';
import Scene1 from './three/Scene1';
import Scene2 from './three/Scene2';

// Referenced Scenes
const scenes: Map<string, any> = new Map();
scenes.set('Scene1', Scene1);
scenes.set('Scene2', Scene2);

export default function CustomEditor() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);

      RemoteController.instance.app = app;

      // Theatre
      const theatre = app.components.get('theatre') as RemoteTheatre;
      RemoteController.instance.appHandlers.push({ remote: theatre, callback: theatreApp });
      RemoteController.instance.editorHandlers.push({ remote: theatre, callback: theatreEditor });

      // Three
      const three = app.components.get('three') as RemoteThree;
      RemoteController.instance.appHandlers.push({ remote: three, callback: threeApp });
      RemoteController.instance.editorHandlers.push({ remote: three, callback: threeEditor });

      // Components
      const components = app.components.get('components') as RemoteComponents;
      RemoteController.instance.appHandlers.push({ remote: components, callback: componentsApp });

      // Tweakpane
      const tweakpane = app.components.get('debug') as RemoteTweakpane;
      RemoteController.instance.appHandlers.push({ remote: tweakpane, callback: tweakpaneApp });

      theatreEditorApp(app, theatre, studio);

      setLoaded(true);
    };
    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
  }, []);

  const three = app.components.get('three') as RemoteThree;
  return (
    <>
      {loaded && app.editor && (
        <Editor
          header={[
            <Dropdown
              title='Scenes'
              key='Scenes'
              options={[
                {
                  type: 'option',
                  title: 'Scene 1',
                  value: 'scene1',
                },
                {
                  type: 'option',
                  title: 'Scene 2',
                  value: 'scene2',
                },
              ]}
              onSelect={(value: string) => {
                app.send({
                  target: 'app',
                  event: 'selectComponent',
                  data: {
                    dropdown: 'Scenes',
                    value,
                  },
                });
              }}
            />
          ]}>
          <>
            <MultiView
              three={three}
              scenes={scenes}
              onSceneUpdate={(scene: any) => {
                // Custom callback for animation updates
                const baseScene = scene as BaseScene;
                baseScene.update();
              }}
            />
            <SidePanel three={three} />
          </>
        </Editor>
      )}
    </>
  );
}
