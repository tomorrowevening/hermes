import { useState } from 'react';
import { capitalize } from '../../editor/utils';
import RemoteThree, { ToolEvents } from '../../core/remote/RemoteThree';

type AccordionProps = {
  three: RemoteThree;
  label: string
  scene?: any
  button?: JSX.Element
  children?: JSX.Element | JSX.Element[]
  open?: boolean
  visible?: boolean
  onToggle?: (value: boolean) => void
  onRefresh?: () => void
}

export default function Accordion(props: AccordionProps) {
  const [open, setOpen] = useState(props.open !== undefined ? props.open : false);
  const [visible, setVisible] = useState(props.visible !== undefined ? props.visible : false);
  const hide = !open || props.children === undefined;

  const onRemove = () => {
    props.three.dispatchEvent({ type: ToolEvents.REMOVE_SCENE, value: props.scene });
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
          <button
            className='visibility'
            style={{
              opacity: visible ? 1 : 0.25,
            }}
            onClick={() => {
              const three = props.three;
              const scene = three.getScene(props.scene.uuid);
              if (scene) {
                const value = !scene.visible;
                scene.visible = value;
                setVisible(value);
              }
            }
          }></button>
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
