import { colorToHex, randomID } from '@/editor/utils';
import { KeyboardEvent, useRef, useState } from 'react';
import { capitalize } from '@/editor/utils';
import InspectNumber from './InspectNumber';
import InspectVector2 from './InspectVector2';
import InspectGrid3 from './InspectGrid3';
import InspectGrid4 from './InspectGrid4';
import InspectImage from './InspectImage';
import { Color, LinearSRGBColorSpace } from 'three';
import { OptionInfo } from '@/core/types';

export type InspectorFieldType = 'string' |
  'field' |
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
  options?: OptionInfo[]
  onChange?: (prop: string, value: any) => void
  onKeyDown?: (evt: KeyboardEvent) => void
}

export default function InspectorField(props: InspectorFieldProps) {
  let propsValue = props.value;
  if (propsValue !== undefined) {
    if (propsValue.isColor !== undefined) {
      propsValue = colorToHex(props.value);
    } else if (props.type === 'color') {
      propsValue = colorToHex(new Color().setStyle(props.value, LinearSRGBColorSpace));
    }
  }

  const [fieldValue, setFieldValue] = useState(propsValue);
  const labelRef = useRef<HTMLElement>(null);

  const onChange = (evt: any) => {
    let value = evt.target.value;
    if (props.type === 'boolean') {
      value = evt.target.checked;
    } else if (props.type === 'option') {
      if (typeof props.value === 'number') {
        value = Number(value);
      } else if (typeof props.value === 'boolean') {
        value = Boolean(value);
      } else if (typeof props.value === 'object') {
        value = JSON.parse(value);
      }
      if (props.options !== undefined) {
        const total = props.options.length;
        for (let i = 0; i < total; i++) {
          const option = props.options[i];
          if (option.value === value) {
            break;
          }
        }
      }
    }
    setFieldValue(value);
    if (props.onChange !== undefined) props.onChange(props.prop !== undefined ? props.prop : props.title, value);
  };

  const style = {};
  if (props.disabled) {
    style['opacity'] = 0.8;
  }

  const textfield = props.type === 'field' ||  (props.type === 'string' && (fieldValue.length > 100 || fieldValue.search('\n') > -1));
  const block = textfield || props.type === 'image' || props.type === 'vector2';

  return (
    <div className={`field ${block ? 'block' : ''}`} style={style}>
      {props.type !== 'button' && (
        <span key='fieldLabel' ref={labelRef}>{capitalize(props.title)}</span>
      )}

      {props.type === 'string' && !textfield && (
        <input
          type='text'
          disabled={props.disabled}
          onChange={onChange}
          value={fieldValue}
          name={randomID()}
        />
      )}

      {(props.type === 'field' || (props.type === 'string' && textfield)) && (
        <textarea
          cols={50}
          rows={10}
          disabled={props.disabled !== undefined ? props.disabled : true}
          onChange={onChange}
          onKeyDown={(evt: KeyboardEvent) => {
            if (props.onKeyDown !== undefined) props.onKeyDown(evt);
          }}
          value={fieldValue}
          name={randomID()}
        />
      )}

      {props.type === 'boolean' && (
        <input
          type='checkbox'
          disabled={props.disabled}
          onChange={onChange}
          checked={fieldValue}
          name={randomID()}
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
          <input type='text' value={fieldValue.toString()} onChange={onChange} disabled={props.disabled} className='color' name={randomID()} />
          <input type='color' value={fieldValue} onChange={onChange} disabled={props.disabled} name={randomID()} />
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
        <InspectImage title={props.title} prop={props.prop} value={props.value} onChange={props.onChange} />
      )}

      {props.type === 'option' && (
        <>
          <select
            onChange={onChange}
            disabled={props.disabled}
            defaultValue={props.value}
            name={randomID()}
          >
            {props.options?.map((option, index) => (
              <option key={index} value={option.value}>{capitalize(option.title)}</option>
            ))}
          </select>
        </>
      )}

      {props.type === 'vector2' && (
        <InspectVector2 step={props.step} value={fieldValue} min={0} max={1} onChange={onChange} />
      )}

      {props.type === 'grid3' && (
        <InspectGrid3 step={props.step} value={fieldValue} onChange={onChange} />
      )}

      {props.type === 'grid4' && (
        <InspectGrid4 step={props.step} value={fieldValue} onChange={onChange} />
      )}

      {props.type === 'euler' && (
        <InspectGrid3 step={props.step} value={fieldValue} onChange={onChange} />
      )}
    </div>
  );
}