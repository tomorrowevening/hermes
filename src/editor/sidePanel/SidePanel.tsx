// Libs
import { useEffect, useState } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
// Components
import '../scss/_sidePanel.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';
import { RemoteObject, SidePanelState } from './types';

export default function SidePanel(props: SidePanelState) {
  const [scenes] = useState<RemoteObject[]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  const onAddScene = (evt: any) => {
    scenes.push(evt.value);
    setLastUpdate(Date.now());
  };

  const onRemoveScene = (evt: any) => {
    const scene = evt.value;
    for (let i = 0; i < scenes.length; i++) {
      if (scene.uuid === scenes[i].uuid) {
        scenes.splice(i, 1);
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

  // Components
  const components: any[] = [];
  scenes.forEach((scene: any, index: number) => {
    components.push(
      <Accordion label={`Scene: ${scene.name}`} open={true} key={`scene_${index}`}>
        <ContainerObject child={scene} scene={scene} three={props.three} />
      </Accordion>
    );
  });

  return (
    <div id='SidePanel' key={`SidePanel ${lastUpdate}`}>
      {components}
      <Inspector three={props.three} />
    </div>
  );
}
