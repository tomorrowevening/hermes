import { RefObject, useEffect, useRef, useState } from 'react';
import { InspectorFieldType } from './InspectorField';
import DragNumber from './utils/DragNumber';
import { noop } from '@/core/types';

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

  // Hooks
  const inputValue = DragNumber({
    label: props.labelRef,
    input: inputRef,
    sliderRef: sliderRef,
    defaultValue: props.value,
    min: props.min,
    max: props.max,
    step: props.step,
    onChange: (value: number) => {
      if (props.onChange !== undefined) props.onChange(props.prop, value);
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
          value={inputValue}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={props.disabled}
          onChange={(evt: any) => {
            const value = Number(evt.target.value);
            if (props.onChange !== undefined) props.onChange(props.prop, value);
          }}
        />
      )}

      {props.type === 'range' && (
        <>
          <input
            type='text'
            value={inputValue.toString()}
            disabled={props.disabled}
            ref={inputRef}
            className='min'
            onChange={(evt: any) => {
              const value = Number(evt.target.value);
              if (props.onChange !== undefined) props.onChange(props.prop, value);
            }}
          />
          <input
            disabled={props.disabled}
            type='range'
            value={inputValue}
            min={props.min}
            max={props.max}
            step={props.step}
            ref={sliderRef}
            onChange={noop}
          />
        </>
      )}
    </>
  );
}
