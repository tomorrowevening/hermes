// Libs
import { useEffect, useState } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
// Components
import '../scss/_sidePanel.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';
import { SidePanelState } from './types';

export default function SidePanel(props: SidePanelState) {
  const [scene, setScene] = useState(props.scene);

  useEffect(() => {
    const onAddScene = (evt: any) => {
      console.log('add scene:', evt.value);
    };

    const onRemoveScene = (evt: any) => {
      console.log('remove scene:', evt.value);
    };

    const onSetScene = (evt: any) => {
      setScene(evt.value);
    };

    debugDispatcher.addEventListener(ToolEvents.ADD_SCENE, onAddScene);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, onSetScene);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.ADD_SCENE, onAddScene);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
      debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, onSetScene);
    };
  }, []);

  const hasScene = scene !== null;
  const HierarchyName = 'Hierarchy - ' + (hasScene ? `${scene?.name}` : 'No Scene');

  return (
    <div id='SidePanel' key='SidePanel'>
      <Accordion label={HierarchyName} open={true}>
      <>
        {hasScene && <ContainerObject child={scene!} three={props.three} />}
      </>
    </Accordion>
    <Inspector three={props.three} />
  </div>
  );
}
