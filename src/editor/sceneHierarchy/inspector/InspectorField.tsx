import { useState } from "react";

export type InspectorFieldType = 'string' | 'number' | 'boolean'

export interface InspectorFieldProps {
  label: string
  value: any
  type: InspectorFieldType
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: any) => void
}

export default function InspectorField(props: InspectorFieldProps) {
  const [fieldValue, setFieldValue] = useState(props.value);

  const onChange = (evt: any) => {
    const value = evt.target.value;
    setFieldValue(value);
    if (props.onChange !== undefined) props.onChange(value);
  };

  const useNumber = props.type === 'number';
  const useRange = props.min !== undefined || props.max !== undefined || props.step !== undefined;

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
      
      {useNumber && useRange && (
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
      {useNumber && !useRange && (
        <input type="text" value={fieldValue.toString()} onChange={onChange} />
      )}

      {props.type === 'boolean' && (
        <input
          type="checkbox"
          disabled={props.disabled}
          onChange={onChange}
          value={fieldValue}
        />
      )}
    </div>
  );
}