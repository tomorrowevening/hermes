import { colorToHex } from "@/editor/utils";
import { useEffect, useRef, useState } from "react";

export type InspectorFieldType = 'string' | 'number' | 'boolean' | 'range' | 'color' | 'button'

export interface InspectorFieldProps {
  label: string
  type: InspectorFieldType
  prop?: string
  value?: any
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (prop: string, value: any) => void
}

export default function InspectorField(props: InspectorFieldProps) {
  let propsValue = props.value;
  if (propsValue !== undefined) {
    if (propsValue.isColor !== undefined) {
      propsValue = colorToHex(props.value);
    }
  }
  const [fieldValue, setFieldValue] = useState(propsValue);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (evt: any) => {
    let value = evt.target.value;
    if (props.type === 'boolean') value = evt.target.checked;
    setFieldValue(value);
    if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.label, value);
  };

  useEffect(() => {
    let mouseDown = false;
    let mouseStart = -1;
    let valueStart = 0;
    const onMouseDown = (evt: MouseEvent) => {
      mouseDown = true;
      valueStart = Number(fieldValue);
      mouseStart = evt.clientX;
    };
    const onMouseMove = (evt: MouseEvent) => {
      if (!mouseDown) return;
      const deltaAmt = props.step !== undefined ? props.step : 1;
      const delta = (evt.clientX - mouseStart) * deltaAmt;
      const value = valueStart + delta;
      if (inputRef.current !== null) inputRef.current.value = value.toString();
      // setFieldValue(value);
      if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.label, value);
    };
    const onMouseUp = () => {
      mouseDown = false;
    };

    const useMouse = props.type === 'number';
    if (useMouse) {
      labelRef.current?.addEventListener('mousedown', onMouseDown, false);
      document.addEventListener('mouseup', onMouseUp, false);
      document.addEventListener('mousemove', onMouseMove, false);
    }
    return () => {
      if (useMouse) {
        labelRef.current?.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [fieldValue]);

  return (
    <div className="field">
      {props.type !== 'button' && (
        <label key="fieldLabel" ref={labelRef}>{props.label}</label>
      )}
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
          ref={inputRef}
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

      {props.type === 'button' && (
        <button
          onClick={() => {
            if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.label, true);
          }}
        >
          {props.label}
        </button>
      )}
    </div>
  );
}