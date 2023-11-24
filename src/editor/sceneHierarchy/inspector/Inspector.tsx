import { useEffect } from "react";
import { CoreComponentProps } from "../types";
import { ToolEvents, debugDispatcher } from "../../global";
import './inspector.scss';
import InspectorField from './InspectorField';
import InspectorGroup from './InspectorGroup';

export default function Inspector(props: CoreComponentProps) {
  useEffect(() => {
    function onSelectItem(evt: any) {
      console.log('onSelectItem:', evt);
    }

    debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, onSelectItem);
    };
  }, []);

  return (
    <div id="Inspector" className={props.class}>
      <InspectorField type="string" label="Name" value={"Obj Name"} disabled={true} />
      <InspectorField type="string" label="Type" value={"Obj Type"} disabled={true} />
      <InspectorField type="string" label="UUID" value={"Obj UUID"} disabled={true} />
      <InspectorGroup
        title="Transform"
        items={[
          {
            label: 'Visible',
            type: 'boolean',
            value: true,
          },
          {
            label: 'Position X',
            type: 'number',
            value: 0,
            step: 0.01,
          },
          {
            label: 'Position Y',
            type: 'number',
            value: 0,
            step: 0.01,
          },
          {
            label: 'Position Z',
            type: 'number',
            value: 0,
            step: 0.01,
          },
          {
            label: 'Rotation X',
            type: 'number',
            value: 0,
            min: -Math.PI,
            max: Math.PI,
            step: 0.01,
          },
          {
            label: 'Rotation Y',
            type: 'number',
            value: 0,
            min: -Math.PI,
            max: Math.PI,
            step: 0.01,
          },
          {
            label: 'Rotation Z',
            type: 'number',
            value: 0,
            min: -Math.PI,
            max: Math.PI,
            step: 0.01,
          },
          {
            label: 'Scale X',
            type: 'number',
            value: 1,
            step: 0.01,
          },
          {
            label: 'Scale Y',
            type: 'number',
            value: 1,
            step: 0.01,
          },
          {
            label: 'Scale Z',
            type: 'number',
            value: 1,
            step: 0.01,
          },
        ]}
      />
      <InspectorGroup
        title="Material"
        items={[
          {
            label: 'Type',
            type: 'string',
            value: 'ShaderMaterial',
            disabled: true,
          },
        ]}
      />

      {/* <div className="transform">
        <header>Transform</header>
        <ul></ul>
      </div>
      <div className="material">
        <header>Material</header>
        <ul></ul>
      </div> */}
    </div>
  );
}