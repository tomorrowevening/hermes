import { colorToHex } from "@/editor/utils";
import { useState } from "react";

export type InspectorFieldType = 'string' | 'number' | 'boolean' | 'range' | 'color'

export interface InspectorFieldProps {
  label: string
  prop: string
  value: any
  type: InspectorFieldType
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (prop: string, value: any) => void
}

export default function InspectorField(props: InspectorFieldProps) {
  let propsValue = props.value;
  if (props.value.isColor !== undefined) {
    propsValue = colorToHex(props.value);
  }
  const [fieldValue, setFieldValue] = useState(propsValue);

  const onChange = (evt: any) => {
    let value = evt.target.value;
    if (props.type === 'boolean') value = evt.target.checked;
    setFieldValue(value);
    if (props.onChange !== undefined) props.onChange(props.prop, value);
  };

  return (
    <div className="field">
      <label key="fieldLabel">{props.label}</label>
      {props.type === 'string' && (
        <input
          type="text"
          disabled={props.disabled}
          onChange={onChange}
          value={fieldValue}
        />
      )}

      {props.type === 'boolean' && (
        <input
          type="checkbox"
          disabled={props.disabled}
          onChange={onChange}
          checked={fieldValue}
        />
      )}

      {props.type === 'number' && (
        <input
          type="number"
          value={fieldValue}
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={onChange}
        />
      )}
      
      {props.type === 'range' && (
        <>
          <input type="text" value={fieldValue.toString()} onChange={onChange} className="min" />
          <input
            disabled={props.disabled}
            type="range"
            value={fieldValue}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={onChange}
          />
        </>
      )}

      {props.type === 'color' && (
        <>
          <input type="text" value={fieldValue.toString()} onChange={onChange} className="color" />
          <input type="color" value={fieldValue} onChange={onChange} />
        </>
      )}
    </div>
  );
}