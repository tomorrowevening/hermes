// Libs
import { useEffect, useState } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
import { RemoteObject, SidePanelState } from './types';
// Components
import '../scss/_sidePanel.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';

export default function SidePanel(props: SidePanelState) {
  const [scenes] = useState<RemoteObject[]>([]);
  const [sceneComponents] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  const onAddScene = (evt: any) => {
    const scene = evt.value;
    scenes.push(scene);
    sceneComponents.push(
      <Accordion label={`Scene: ${scene.name}`} scene={scene} open={true} key={Math.random()} canRefresh={true}>
        <ContainerObject child={scene} scene={scene} three={props.three} />
      </Accordion>
    );
    setLastUpdate(Date.now());
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
    debugDispatcher.addEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.ADD_SCENE, onAddScene);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    };
  }, []);

  return (
    <div id='SidePanel'>
      <div key={lastUpdate}>
        {sceneComponents}
      </div>
      <Inspector three={props.three} />
    </div>
  );
}
