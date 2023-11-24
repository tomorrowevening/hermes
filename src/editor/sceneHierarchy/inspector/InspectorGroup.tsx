import { useState } from 'react';
import InspectorField, { InspectorFieldProps } from './InspectorField';

export interface InspectorGroupProps {
  title: string
  expanded?: boolean
  items: InspectorFieldProps[]
}

// children?: JSX.Element | JSX.Element[]

export default function InspectorGroup(props: InspectorGroupProps) {
  const [expanded, setExpanded] = useState(props.expanded !== undefined ? props.expanded : false);

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
        onChange={child.onChange}
      />
    );
  });

  return (
    <div className='group' key={Math.random()}>
      <button
        className='toggleBtn'
        onClick={() => { setExpanded(!expanded); }}
        style={{ opacity: expanded ? 1 : 0.5 }}
      >
        Toggle
      </button>
      <h4>{props.title}</h4>
      <div className={expanded ? '' : 'hidden'}>
        {children}
      </div>
    </div>
  );
}