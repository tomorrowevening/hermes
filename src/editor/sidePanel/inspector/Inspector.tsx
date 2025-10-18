import { useEffect, useState } from 'react';
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
import Transform from '../../../editor/tools/Transform';
import { ToolEvents } from '../../../core/remote/RemoteThree';

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

export default function Inspector(props: CoreComponentProps) {
  const [currentObject, setCurrentObject] = useState<RemoteObject>(defaultObject);

  useEffect(() => {
    function onSelectItem(evt: any) {
      setCurrentObject(evt.value as RemoteObject);
    }

    function setScene() {
      setCurrentObject(defaultObject);
    }

    props.three.addEventListener(ToolEvents.CLEAR_OBJECT, setScene);
    props.three.addEventListener(ToolEvents.SET_SCENE, setScene);
    props.three.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    return () => {
      props.three.removeEventListener(ToolEvents.CLEAR_OBJECT, setScene);
      props.three.removeEventListener(ToolEvents.SET_SCENE, setScene);
      props.three.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
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
      three={props.three}
      label='Inspector'
      key='Inspector'
      button={
        currentObject.uuid.length > 0 ? (
          <button className='remove' onClick={() => {
            Transform.instance.remove(currentObject.name);
            setCurrentObject(defaultObject);
          }}></button>
        ) : undefined
      }
    >
      <div id='Inspector' className={props.class}>
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
              <InspectTransform object={currentObject} three={props.three} />
              {/* Animations */}
              {hasAnimation ? <InspectAnimation object={currentObject} three={props.three} /> : null}
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