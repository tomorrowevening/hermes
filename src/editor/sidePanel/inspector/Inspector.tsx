import { useEffect, useState } from 'react';
import { CoreComponentProps, RemoteObject } from '../types';
import { ToolEvents, debugDispatcher } from '../../global';
// Components
import './inspector.scss';
import Accordion from '../Accordion';
import InspectorField from './InspectorField';
// Utils
import { InspectCamera } from './utils/InspectCamera';
import { InspectMaterial } from './utils/InspectMaterial';
import { InspectTransform } from './utils/InspectTransform';
import { InspectLight } from './utils/InspectLight';
import { setItemProps } from '../utils';
import InspectAnimation from './utils/InspectAnimation';

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

    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, setScene);
    debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, setScene);
      debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    };
  }, []);

  const objType = currentObject.type.toLowerCase();
  const hasAnimation = currentObject.animations.length > 0
    || currentObject['mixer'] !== undefined;
  const hasMaterial = objType.search('mesh') > -1
    || objType.search('line') > -1
    || objType.search('points') > -1;

  return (
    <Accordion label='Inspector' key='Inspector'>
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
              <InspectorField
                type='boolean'
                title='Visible'
                prop='visible'
                value={currentObject.visible}
                onChange={(key: string, value: any) => {
                  props.three.updateObject(currentObject.uuid, key, value);
                  const child = props.three.scene?.getObjectByProperty('uuid', currentObject.uuid);
                  if (child !== undefined) setItemProps(child, key, value);
                }}
              />
            </>

            {/* Data */}
            <>
              {/* Transform */}
              {InspectTransform(currentObject, props.three)}
              {/* Animations */}
              {hasAnimation ? InspectAnimation(currentObject, props.three) : null}
              {/* Cameras */}
              {objType.search('camera') > -1 ? InspectCamera(currentObject, props.three) : null}
              {/* Lights */}
              {objType.search('light') > -1 ? InspectLight(currentObject, props.three) : null}
              {/* Material */}
              {hasMaterial ? InspectMaterial(currentObject, props.three) : null}
            </>
          </>
        )}
      </div>
    </Accordion>
  );
}