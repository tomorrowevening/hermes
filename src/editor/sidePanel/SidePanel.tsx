// Libs
import { useEffect, useState } from 'react';
// Models
import { Application, ToolEvents } from '@/core/Application';
import { RemoteObject, SidePanelState } from './types';
// Components
import '../scss/sidePanel.scss';
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
        app={props.app}
        label={`Scene: ${scene.name}`}
        scene={scene}
        open={true}
        key={Math.random()}
        onRefresh={() => {
          props.three.refreshScene(scene.name);
        }}
      >
        <ContainerObject app={props.app} child={scene} scene={scene} three={props.three} />
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
            app={props.app}
            label={`Scene: ${scene.name}`}
            scene={scene}
            open={true}
            key={Math.random()}
            onRefresh={() => {
              props.three.refreshScene(scene.name);
            }}
          >
            <ContainerObject app={props.app} child={scene} scene={scene} three={props.three} />
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
    props.app.addEventListener(ToolEvents.ADD_SCENE, onAddScene);
    props.app.addEventListener(ToolEvents.REFRESH_SCENE, onRefreshScene);
    props.app.addEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    return () => {
      props.app.removeEventListener(ToolEvents.ADD_SCENE, onAddScene);
      props.app.removeEventListener(ToolEvents.REFRESH_SCENE, onRefreshScene);
      props.app.removeEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    };
  }, []);

  return (
    <div id='SidePanel'>
      <div className='scenes' key={lastUpdate}>
        {sceneComponents}
      </div>
      <Inspector app={props.app} three={props.three} />
      <InspectRenderer app={props.app} three={props.three} />
      <DebugData app={props.app} three={props.three} />
    </div>
  );
}
