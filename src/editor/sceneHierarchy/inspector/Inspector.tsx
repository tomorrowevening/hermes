import { useEffect, useState } from "react";
import { CoreComponentProps, RemoteObject } from "../types";
import { ToolEvents, debugDispatcher } from "../../global";
import { app } from "@/example/constants";
import './inspector.scss';
import InspectorField from './InspectorField';
// Utils
import { InspectCamera } from "./utils/InspectCamera";
import { InspectMaterial } from "./utils/InspectMaterial";
import { InspectTransform } from "./utils/InspectTransform";
import { InspectLight } from "./utils/InspectLight";

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

  return (
    <div id="Inspector" className={props.class} key={lastRefresh}>
      {currentObject.uuid.length > 0 && (
        <>
          {/* Core */}
          <InspectorField
            type="string"
            title="Name"
            prop="name"
            value={currentObject.name}
            disabled={true}
          />
          <InspectorField
            type="string"
            title="Type"
            prop="type"
            value={currentObject.type}
            disabled={true}
          />
          <InspectorField
            type="string"
            title="UUID"
            prop="uuid"
            value={currentObject.uuid}
            disabled={true}
          />
          <InspectorField
            type="boolean"
            title="Visible"
            prop="visible"
            value={currentObject.visible}
            onChange={(key: string, value: any) => {
              app.three.updateObject(currentObject.uuid, key, value);
            }}
          />
          {/* Transform */}
          {InspectTransform(currentObject, app.three)}
          {/* Camera */}
          {currentObject.type.search('Camera') > -1 ? InspectCamera(currentObject, app.three) : null}
          {/* Light */}
          {currentObject.type.search('Light') > -1 ? InspectLight(currentObject, app.three) : null}
          {/* Material */}
          {currentObject.material !== undefined ? InspectMaterial(currentObject, app.three) : null}
        </>
      )}
    </div>
  );
}