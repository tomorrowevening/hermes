import { RefObject, useEffect, useRef, useState } from 'react';
import { InspectorFieldType } from './InspectorField';
import DragNumber from './utils/DragNumber';
import { noop } from '@/core/types';
import { randomID } from '@/editor/utils';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);

  // Hooks
  DragNumber({
    label: props.labelRef,
    input: inputRef,
    sliderRef: sliderRef,
    defaultValue: value,
    min: props.min,
    max: props.max,
    step: props.step,
    onChange: (newValue: number) => {
      setValue(newValue);
      if (props.onChange !== undefined) props.onChange(props.prop, newValue);
    }
  });

  return (
    <>
      {props.type === 'number' && (
        <input
          alt={props.alt}
          className={props.className}
          ref={inputRef}
          type='number'
          value={value}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={props.disabled}
          name={randomID()}
          onChange={(evt: any) => {
            setValue(evt.target.value);
            if (evt.target.value.length === 0) return;
            const value = Number(evt.target.value);
            if (isNaN(value)) return;
            if (props.onChange !== undefined) props.onChange(props.prop, value);
          }}
        />
      )}

      {props.type === 'range' && (
        <>
          <input
            type='text'
            value={value.toString()}
            disabled={props.disabled}
            ref={inputRef}
            className='min'
            name={randomID()}
            onChange={(evt: any) => {
              if (evt.target.value.length === 0) return;
              const updatedValue = Number(evt.target.value);
              if (isNaN(updatedValue)) return;
              setValue(updatedValue);
              if (props.onChange !== undefined) props.onChange(props.prop, updatedValue);
            }}
          />
          <input
            disabled={props.disabled}
            type='range'
            value={value}
            min={props.min}
            max={props.max}
            step={props.step}
            ref={sliderRef}
            name={randomID()}
            onChange={noop}
          />
        </>
      )}
    </>
  );
}
