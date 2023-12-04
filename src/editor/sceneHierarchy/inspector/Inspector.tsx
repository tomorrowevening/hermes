import { useEffect, useState } from "react";
import { Euler, Matrix4, Vector3 } from "three";
import { CoreComponentProps, RemoteObject } from "../types";
import { ToolEvents, debugDispatcher } from "../../global";
// import { app } from "@/example/constants";
import './inspector.scss';
import InspectorField from './InspectorField';
import InspectorGroup from './InspectorGroup';

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

  const matrix = new Matrix4();
  matrix.elements = currentObject.matrix;
  const position = new Vector3();
  const rotation = new Euler();
  const scale = new Vector3();
  if (currentObject.uuid.length > 0) {
    position.setFromMatrixPosition(matrix);
    rotation.setFromRotationMatrix(matrix);
    scale.setFromMatrixScale(matrix);
  }

  const materialItems: any[] = [];
  const hasMaterial = currentObject.material !== undefined;
  if (hasMaterial) {
    for (const i in currentObject.material) {
      // @ts-ignore
      const propType = typeof currentObject.material[i];
      // @ts-ignore
      const value = currentObject.material[i];
      if (propType === 'boolean' || propType === 'number' || propType === 'string') {
        materialItems.push({
          label: i,
          type: propType,
          value: value,
        });
      } else if (propType === 'object') {
        if (value.isColor) {
          materialItems.push({
            label: i,
            type: 'color',
            value: value,
          });
        }
      } else if (value !== undefined) {
        // @ts-ignore
        console.log('other:', i, propType, value);
      }
    }
  }

  return (
    <div id="Inspector" className={props.class} key={lastRefresh}>
      {currentObject.uuid.length > 0 && (
        <>
          <InspectorField type="string" label="Name" value={currentObject.name} disabled={true} />
          <InspectorField type="string" label="Type" value={currentObject.type} disabled={true} />
          <InspectorField type="string" label="UUID" value={currentObject.uuid} disabled={true} />
          {/* <InspectorField
            type="boolean"
            label="Visible"
            value={currentObject.visible}
            onChange={(label: string, value: any) => {
              console.log('Send GUI change:', label, value);
              app.three.updateObject(currentObject.uuid, 'visible', value);
            }}
          /> */}
          
          <InspectorGroup
            title="Transform"
            items={[
              {
                label: 'Visible',
                type: 'boolean',
                value: currentObject.visible,
              },
              {
                label: 'Position X',
                type: 'number',
                value: position.x,
                step: 0.01,
              },
              {
                label: 'Position Y',
                type: 'number',
                value: position.y,
                step: 0.01,
              },
              {
                label: 'Position Z',
                type: 'number',
                value: position.z,
                step: 0.01,
              },
              {
                label: 'Rotation X',
                type: 'number',
                value: rotation.x,
                min: -Math.PI,
                max: Math.PI,
                step: 0.01,
              },
              {
                label: 'Rotation Y',
                type: 'number',
                value: rotation.y,
                min: -Math.PI,
                max: Math.PI,
                step: 0.01,
              },
              {
                label: 'Rotation Z',
                type: 'number',
                value: rotation.z,
                min: -Math.PI,
                max: Math.PI,
                step: 0.01,
              },
              {
                label: 'Scale X',
                type: 'number',
                value: scale.x,
                step: 0.01,
              },
              {
                label: 'Scale Y',
                type: 'number',
                value: scale.y,
                step: 0.01,
              },
              {
                label: 'Scale Z',
                type: 'number',
                value: scale.z,
                step: 0.01,
              },
            ]}
          />
          {hasMaterial && (
            <InspectorGroup
              title="Material"
              items={materialItems}
            />
          )}
        </>
      )}
    </div>
  );
}