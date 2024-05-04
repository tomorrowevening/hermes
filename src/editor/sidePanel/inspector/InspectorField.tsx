import { colorToHex } from '@/editor/utils';
import { KeyboardEvent, useRef, useState } from 'react';
import { noImage } from '@/editor/components/content';
import { uploadLocalImage } from './utils/InspectMaterial';
import { capitalize } from '@/editor/utils';
import InspectNumber from './InspectNumber';
import InspectVector2 from './InspectVector2';
import InspectGrid3 from './InspectGrid3';
import InspectGrid4 from './InspectGrid4';

export type InspectorFieldType = 'string' |
  'number' |
  'boolean' |
  'range' |
  'color' |
  'button' |
  'image' |
  'option' |
  'vector2' |
  'grid3' |
  'grid4' |
  'euler'

export interface InspectorFieldProps {
  title: string
  type: InspectorFieldType
  prop?: string
  value?: any
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  options?: any[]
  onChange?: (prop: string, value: any) => void
  onKeyDown?: (evt: KeyboardEvent) => void
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
  const imgRefRef = useRef<HTMLImageElement>(null);

  const onChange = (evt: any) => {
    let value = evt.target.value;
    if (props.type === 'boolean') {
      value = evt.target.checked;
    } else if (props.type === 'option') {
      // @ts-ignore
      value = props.options[value].value;
    }
    setFieldValue(value);
    if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.title, value);
  };

  const style = {};
  if (props.disabled) {
    style['opacity'] = 0.8;
  }

  const textfield = props.type === 'string' && (fieldValue.length > 100 || fieldValue.search('\n') > -1);
  const block = textfield || props.type === 'image' || props.type === 'vector2';

  return (
    <div className={`field ${block ? 'block' : ''}`} style={style}>
      {props.type !== 'button' && (
        <label key='fieldLabel' ref={labelRef}>{capitalize(props.title)}</label>
      )}

      {props.type === 'string' && !textfield && (
        <input
          type='text'
          disabled={props.disabled}
          onChange={onChange}
          value={fieldValue}
        />
      )}

      {props.type === 'string' && textfield && (
        <textarea
          cols={50}
          rows={10}
          disabled={props.disabled !== undefined ? props.disabled : true}
          onChange={onChange}
          onKeyDown={(evt: KeyboardEvent) => {
            if (props.onKeyDown !== undefined) props.onKeyDown(evt);
          }}
          value={fieldValue}
        />
      )}

      {props.type === 'boolean' && (
        <input
          type='checkbox'
          disabled={props.disabled}
          onChange={onChange}
          checked={fieldValue}
        />
      )}

      {props.type === 'number' && (
        <InspectNumber
          value={fieldValue}
          type={props.type}
          prop={props.prop !== undefined ? props.prop : props.title}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={props.disabled}
          labelRef={labelRef}
          onChange={props.onChange}
        />
      )}
      
      {props.type === 'range' && (
        <InspectNumber
          value={fieldValue}
          type={props.type}
          prop={props.prop !== undefined ? props.prop : props.title}
          min={props.min}
          max={props.max}
          step={props.step}
          disabled={props.disabled}
          labelRef={labelRef}
          onChange={props.onChange}
        />
      )}

      {props.type === 'color' && (
        <>
          <input type='text' value={fieldValue.toString()} onChange={onChange} disabled={props.disabled} className='color' />
          <input type='color' value={fieldValue} onChange={onChange} disabled={props.disabled} />
        </>
      )}

      {props.type === 'button' && (
        <button
          disabled={props.disabled}
          onClick={() => {
            if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.title, true);
          }}
        >
          {props.title}
        </button>
      )}

      {props.type === 'image' && (
        <img alt={props.title} ref={imgRefRef} onClick={() => {
          uploadLocalImage()
            .then((value: string) => {
              imgRefRef.current!.src = value;
              if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.title, value);
            });
        }} src={fieldValue.src.length > 0 ? fieldValue.src : noImage} />
      )}

      {props.type === 'option' && (
        <>
          <select onChange={onChange} disabled={props.disabled} defaultValue={props.value}>
            {props.options?.map((option, index) => (
              <option key={index} value={option.value}>{capitalize(option.title)}</option>
            ))}
          </select>
        </>
      )}

      {props.type === 'vector2' && (
        <InspectVector2 value={fieldValue} min={0} max={1} onChange={onChange} />
      )}

      {props.type === 'grid3' && (
        <InspectGrid3 value={fieldValue} onChange={onChange} />
      )}

      {props.type === 'grid4' && (
        <InspectGrid4 value={fieldValue} onChange={onChange} />
      )}

      {props.type === 'euler' && (
        <InspectGrid3 value={fieldValue} onChange={onChange} />
      )}
    </div>
  );
}