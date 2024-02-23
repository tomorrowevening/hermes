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
    const onSetScene = (evt: any) => {
      setScene(evt.value);
    };
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, onSetScene);
    return () => {
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
