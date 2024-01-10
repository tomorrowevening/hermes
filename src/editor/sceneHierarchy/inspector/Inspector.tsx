import { useEffect, useState } from "react";
import { CoreComponentProps, RemoteObject } from "../types";
import { ToolEvents, debugDispatcher } from "../../global";
import './inspector.scss';
import InspectorField from './InspectorField';
// Utils
import { InspectCamera } from "./utils/InspectCamera";
import { InspectMaterial } from "./utils/InspectMaterial";
import { InspectTransform } from "./utils/InspectTransform";
import { InspectLight } from "./utils/InspectLight";
import { setItemProps } from "../utils";

export default function Inspector(props: CoreComponentProps) {
  const [lastRefresh, setLastRefresh] = useState(-1);
  const [currentObject, setCurrentObject] = useState<RemoteObject>({
    name: '',
    uuid: '',
    type: '',
    visible: false,
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    material: undefined,
    perspectiveCameraInfo: undefined,
    orthographicCameraInfo: undefined,
    lightInfo: undefined,
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
          <>
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
            {/* Cameras */}
            {currentObject.orthographicCameraInfo !== undefined || currentObject.perspectiveCameraInfo !== undefined ? InspectCamera(currentObject, props.three) : null}
            {/* Lights */}
            {currentObject.lightInfo !== undefined ? InspectLight(currentObject, props.three) : null}
            {/* Material */}
            {currentObject.material !== undefined ? InspectMaterial(currentObject, props.three) : null}
          </>
        </>
      )}
    </div>
  );
}