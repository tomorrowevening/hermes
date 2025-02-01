import { useState } from 'react';
import Application, { ToolEvents } from '@/core/Application';
import { capitalize } from '@/editor/utils';

type AccordionProps = {
  app: Application
  label: string
  scene?: any
  button?: JSX.Element
  children?: JSX.Element | JSX.Element[]
  open?: boolean
  onToggle?: (value: boolean) => void
  onRefresh?: () => void
}

export default function Accordion(props: AccordionProps) {
  const [open, setOpen] = useState(props.open !== undefined ? props.open : true);
  const hide = !open || props.children === undefined;

  const onRemove = () => {
    props.app.dispatchEvent({ type: ToolEvents.REMOVE_SCENE, value: props.scene });
  };

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
      {props.onRefresh ? (
        <>
          <button className='refresh' onClick={props.onRefresh}></button>
          <button className='remove' onClick={onRemove}></button>
        </>
      ) : null}
      {props.button}
      <div className={open ? 'open' : ''} key={Math.random()}>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
