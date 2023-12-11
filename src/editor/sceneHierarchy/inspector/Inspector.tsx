import { useEffect, useState } from "react";
import { CoreComponentProps, RemoteObject } from "../types";
import { ToolEvents, debugDispatcher } from "../../global";
import { app } from "@/example/constants";
import './inspector.scss';
import InspectorField from './InspectorField';
// Utils
import { InspectMaterial, InspectTransform } from './utils';

export default function Inspector(props: CoreComponentProps) {
  const [lastRefresh, setLastRefresh] = useState(-1);
  const [currentObject, setCurrentObject] = useState<RemoteObject>({
    name: '',
    uuid: '',
    type: '',
    visible: false,
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  });

  useEffect(() => {
    function onSelectItem(evt: any) {
      const obj = evt.value as RemoteObject;
      setCurrentObject(obj);
      setLastRefresh(Date.now());
    }

    debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    };
  }, []);

  const isCamera = currentObject.type === 'OrthographicCamera' || currentObject.type === 'PerspectiveCamera';

  return (
    <div id="Inspector" className={props.class} key={lastRefresh}>
      {currentObject.uuid.length > 0 && (
        <>
          {/* Core */}
          <InspectorField
            type="string"
            label="Name"
            prop="name"
            value={currentObject.name}
            disabled={true}
          />
          <InspectorField
            type="string"
            label="Type"
            prop="type"
            value={currentObject.type}
            disabled={true}
          />
          <InspectorField
            type="string"
            label="UUID"
            prop="uuid"
            value={currentObject.uuid}
            disabled={true}
          />
          <InspectorField
            type="boolean"
            label="Visible"
            prop="visible"
            value={currentObject.visible}
            onChange={(key: string, value: any) => {
              app.three.updateObject(currentObject.uuid, key, value);
            }}
          />
          {/* Transform */}
          {InspectTransform(currentObject, app.three)}
          {/* Material */}
          {currentObject.material !== undefined ? InspectMaterial(currentObject, app.three) : null}
          {/* Camera */}
          {isCamera ? null : null}
        </>
      )}
    </div>
  );
}