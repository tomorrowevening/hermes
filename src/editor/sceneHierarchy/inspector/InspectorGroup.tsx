import { useState } from 'react';
import InspectorField, { InspectorFieldProps } from './InspectorField';

export interface InspectorGroupProps {
  title: string
  expanded?: boolean
  items: InspectorFieldProps[]
}

export default function InspectorGroup(props: InspectorGroupProps) {
  const [expanded, setExpanded] = useState(props.expanded !== undefined ? props.expanded : false);

  function onChange(label: string, value: any) {
    console.log('onChange:', label, value);
  }

  const children: any[] = [];
  props.items.forEach((child: InspectorFieldProps) => {
    children.push(
      <InspectorField
        key={Math.random()}
        label={child.label}
        value={child.value}
        type={child.type}
        min={child.min}
        max={child.max}
        step={child.step}
        disabled={child.disabled}
        onChange={onChange}
      />
    );
  });

  return (
    <div className='group' key={Math.random()}>
      <button
        className='toggleBtn'
        onClick={() => { setExpanded(!expanded); }}
        style={{ backgroundPositionY: `${expanded ? 1 : -10}px` }}
      >
        <h4>{props.title}</h4>
      </button>
      <div className={`fieldItems ${expanded ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}