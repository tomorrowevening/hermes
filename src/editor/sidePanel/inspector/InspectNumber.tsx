import { RefObject, useEffect, useRef, useState } from 'react';
import { InspectorFieldType } from './InspectorField';

export interface InspectNumberProps {
  alt?: string
  value: number
  prop: string
  type: InspectorFieldType
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  labelRef: RefObject<HTMLLabelElement>
  onChange?: (prop: string, value: number) => void
}

export default function InspectNumber(props: InspectNumberProps) {
  // References
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  // States
  const [fieldValue, setFieldValue] = useState(props.value);

  // Handlers
  const onChange = (evt: any) => {
    const value = Number(evt.target.value);
    setFieldValue(value);
    if (props.onChange !== undefined) props.onChange(props.prop, value);
  };

  // Mouse dragging
  useEffect(() => {
    let mouseDown = false;
    let mouseStart = -1;
    let valueStart = 0;
    let value = Number(fieldValue);

    const onMouseDown = (evt: MouseEvent) => {
      mouseDown = true;
      valueStart = Number(value);
      mouseStart = evt.clientX;
    };

    const onMouseMove = (evt: MouseEvent) => {
      if (!mouseDown) return;
      const deltaAmt = props.step !== undefined ? props.step : 1;
      const delta = (evt.clientX - mouseStart) * deltaAmt;
      value = Number((valueStart + delta).toFixed(4));
      if (props.min !== undefined) value = Math.max(value, props.min);
      if (props.max !== undefined) value = Math.min(value, props.max);
      if (inputRef.current !== null) inputRef.current.value = value.toString();
      if (props.type === 'range') {
        if (sliderRef.current !== null) sliderRef.current.value = value.toString();
      }
      if (props.onChange !== undefined) props.onChange(props.prop, value);
    };

    const onMouseUp = () => {
      mouseDown = false;
    };

    const onRightClick = () => {
      mouseDown = false;
    };

    props.labelRef.current?.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('contextmenu', onRightClick, false);
    return () => {
      props.labelRef.current?.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('contextmenu', onRightClick);
    };
  }, [fieldValue]);

  return (
    <>
      {props.type === 'number' && (
        <input
          alt={props.alt}
          className={props.className}
          ref={inputRef}
          type='number'
          value={fieldValue}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={props.disabled}
          onChange={onChange}
        />
      )}

      {props.type === 'range' && (
        <>
          <input type='text' value={fieldValue.toString()} onChange={onChange} disabled={props.disabled} ref={inputRef} className='min' />
          <input
            disabled={props.disabled}
            type='range'
            value={fieldValue}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={onChange}
            ref={sliderRef}
          />
        </>
      )}
    </>
  );
}
