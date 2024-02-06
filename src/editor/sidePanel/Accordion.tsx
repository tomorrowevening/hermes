import { useState } from 'react';
import { capitalize } from '@/editor/utils';

type AccordionProps = {
  label: string
  button?: JSX.Element
  children?: JSX.Element | JSX.Element[]
  open?: boolean
  onToggle?: (value: boolean) => void
}

export default function Accordion(props: AccordionProps) {
  const [open, setOpen] = useState(props.open !== undefined ? props.open : true);
  const hide = !open || props.children === undefined;

  return (
    <div className={`accordion ${hide ? 'hide' : ''}`}>
      <button
        className='toggle'
        onClick={() => {
          const value = !open;
          if (props.onToggle !== undefined) props.onToggle(value);
          setOpen(value);
        }}
      >
        <p
          className={`status ${open ? 'open' : ''}`}
        >
          Toggle
        </p>
        <p className='label'>{capitalize(props.label)}</p>
      </button>
      {props.button}
      <div className={open ? 'open' : ''}>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
