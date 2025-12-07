// Libs
import { useEffect, useState } from 'react';
// Models
import { RemoteObject, SidePanelState } from './types';
// Components
import '../scss/sidePanel.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import DebugData from './DebugData';
import Inspector from './inspector/Inspector';
import InspectRenderer from './inspector/utils/InspectRenderer';
import { ToolEvents } from '../../core/remote/RemoteThree';

export default function SidePanel(props: SidePanelState) {
  const [scenes] = useState<RemoteObject[]>([]);
  const [sceneComponents] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  const onAddScene = (evt: any) => {
    const scene = evt.value;
    scenes.push(scene);
    sceneComponents.push(
      <Accordion
        three={props.three}
        label={`Scene: ${scene.name}`}
        key={scene.name}
        scene={scene}
        open={false}
        visible={false}
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
            three={props.three}
            label={`Scene: ${scene.name}`}
            key={scene.name}
            scene={scene}
            open={sceneComponents[i].props.open}
            visible={sceneComponents[i].props.visible}
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

  const onSetScene = (evt: any) => {
    const name = evt.value.name;
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      if (scene.name === name) {
        sceneComponents[i] = (
          <Accordion
            three={props.three}
            label={`Scene: ${scene.name}`}
            key={scene.name}
            scene={scene}
            open={true}
            visible={true}
            onRefresh={() => {
              props.three.refreshScene(scene.name);
            }}
          >
            <ContainerObject child={scene} scene={scene} three={props.three} />
          </Accordion>
        );
        break;
      }
    }
    setLastUpdate(Date.now());
  };

  useEffect(() => {
    props.three.addEventListener(ToolEvents.ADD_SCENE, onAddScene);
    props.three.addEventListener(ToolEvents.SET_SCENE, onSetScene);
    props.three.addEventListener(ToolEvents.REFRESH_SCENE, onRefreshScene);
    props.three.addEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    return () => {
      props.three.removeEventListener(ToolEvents.ADD_SCENE, onAddScene);
      props.three.removeEventListener(ToolEvents.SET_SCENE, onSetScene);
      props.three.removeEventListener(ToolEvents.REFRESH_SCENE, onRefreshScene);
      props.three.removeEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
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
