import { useEffect, useState } from 'react';
import { Application, ToolEvents } from '@/core/Application';
import { CoreComponentProps, RemoteObject } from '../types';
// Components
import './inspector.scss';
import Accordion from '../Accordion';
import InspectorField from './InspectorField';
// Utils
import { InspectCamera } from './utils/InspectCamera';
import { InspectMaterial } from './utils/InspectMaterial';
import { InspectTransform } from './utils/InspectTransform';
import { InspectLight } from './utils/InspectLight';
import InspectAnimation from './utils/InspectAnimation';
import Transform from '@/editor/tools/Transform';

const defaultObject: RemoteObject = {
  name: '',
  uuid: '',
  type: '',
  visible: false,
  matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  animations: [],
  material: undefined,
  perspectiveCameraInfo: undefined,
  orthographicCameraInfo: undefined,
  lightInfo: undefined,
  children: [],
};
let currentObject = {...defaultObject};

export default function Inspector(props: CoreComponentProps) {
  const [lastUpdated, setLastUpdated] = useState<number>(-1);

  useEffect(() => {
    function onSelectItem(evt: any) {
      const obj = evt.value as RemoteObject;
      currentObject = {...obj};
      setLastUpdated(Date.now());
    }

    function setScene() {
      currentObject = {...defaultObject};
      setLastUpdated(Date.now());
    }

    props.app.addEventListener(ToolEvents.SET_SCENE, setScene);
    props.app.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    return () => {
      props.app.removeEventListener(ToolEvents.SET_SCENE, setScene);
      props.app.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    };
  }, []);

  const objType = currentObject.type.toLowerCase();
  const hasAnimation = currentObject.animations.length > 0
    || currentObject['mixer'] !== undefined;
  const hasMaterial = objType.search('mesh') > -1
    || objType.search('line') > -1
    || objType.search('points') > -1;

  return (
    <Accordion
      app={props.app}
      label='Inspector'
      key='Inspector'
      button={
        currentObject.uuid.length > 0 ? (
          <button className='remove' onClick={() => {
            Transform.instance.remove(currentObject.name);
            currentObject = {...defaultObject};
            setLastUpdated(Date.now());
          }}></button>
        ) : undefined
      }
    >
      <div id='Inspector' className={props.class} key={lastUpdated}>
        {currentObject.uuid.length > 0 && (
          <>
            {/* Core */}
            <>
              <InspectorField
                type='string'
                title='Name'
                prop='name'
                value={currentObject.name}
                disabled={true}
              />
              <InspectorField
                type='string'
                title='Type'
                prop='type'
                value={currentObject.type}
                disabled={true}
              />
              <InspectorField
                type='string'
                title='UUID'
                prop='uuid'
                value={currentObject.uuid}
                disabled={true}
              />
            </>

            {/* Data */}
            <>
              {/* Transform */}
              <InspectTransform object={currentObject} app={props.app} three={props.three} />
              {/* Animations */}
              {hasAnimation ? <InspectAnimation app={props.app} object={currentObject} three={props.three} /> : null}
              {/* Cameras */}
              {objType.search('camera') > -1 ? InspectCamera(currentObject, props.app, props.three) : null}
              {/* Lights */}
              {objType.search('light') > -1 ? InspectLight(currentObject, props.app, props.three) : null}
              {/* Material */}
              {hasMaterial ? InspectMaterial(currentObject, props.app, props.three) : null}
            </>
          </>
        )}
      </div>
    </Accordion>
  );
}