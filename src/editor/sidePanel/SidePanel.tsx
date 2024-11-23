// Libs
import { ChangeEvent, useEffect, useState } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
import { RemoteObject, SidePanelState } from './types';
// Components
import '../scss/_sidePanel.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import DebugData from './DebugData';
import Inspector from './inspector/Inspector';
import InspectRenderer from './inspector/utils/InspectRenderer';

export default function SidePanel(props: SidePanelState) {
  const [scenes] = useState<RemoteObject[]>([]);
  const [sceneComponents] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  const onAddScene = (evt: any) => {
    const scene = evt.value;
    scenes.push(scene);
    sceneComponents.push(
      <Accordion
        label={`Scene: ${scene.name}`}
        scene={scene}
        open={true}
        key={Math.random()}
        onRefresh={() => {
          props.three.refreshScene(scene.name);
        }}
      >
        <ContainerObject child={scene} scene={scene} three={props.three} />
      </Accordion>
    );
    setLastUpdate(Date.now());
  };

  const onRefreshScene = (evt: any) => {
    const scene = evt.value;
    for (let i = 0; i < scenes.length; i++) {
      if (scene.uuid === scenes[i].uuid) {
        scenes[i] = scene;
        sceneComponents[i] = (
          <Accordion
            label={`Scene: ${scene.name}`}
            scene={scene}
            open={true}
            key={Math.random()}
            onRefresh={() => {
              props.three.refreshScene(scene.name);
            }}
          >
            <ContainerObject child={scene} scene={scene} three={props.three} />
          </Accordion>
        );
        setLastUpdate(Date.now());
        return;
      }
    }
  };

  const onRemoveScene = (evt: any) => {
    const scene = evt.value;
    for (let i = 0; i < scenes.length; i++) {
      if (scene.uuid === scenes[i].uuid) {
        scenes.splice(i, 1);
        sceneComponents.splice(i, 1);
        setLastUpdate(Date.now());
        return;
      }
    }
  };

  useEffect(() => {
    debugDispatcher.addEventListener(ToolEvents.ADD_SCENE, onAddScene);
    debugDispatcher.addEventListener(ToolEvents.REFRESH_SCENE, onRefreshScene);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.ADD_SCENE, onAddScene);
      debugDispatcher.removeEventListener(ToolEvents.REFRESH_SCENE, onRefreshScene);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    };
  }, []);

  return (
    <div id='SidePanel'>
      <div className='scenes' key={lastUpdate}>
        {sceneComponents}
      </div>
      <Inspector three={props.three} />
      <InspectRenderer three={props.three} />
      <DebugData three={props.three} />
    </div>
  );
}
