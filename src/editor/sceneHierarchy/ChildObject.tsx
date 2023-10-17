// Libs
import { useState } from 'react';
import { Object3D } from 'three';
// Models
import { debugDispatcher, ToolEvents } from '../global';
import { ChildObjectProps } from './types';
// Utils
import { determineIcon } from './utils';

export default function ChildObject(props: ChildObjectProps) {
  const [open, setOpen] = useState(false);

  let container = null;
  let hasChildren = false;
  if (props.child.children.length > 0) {
    hasChildren = true;
    const children: Array<any> = [];
    props.child.children.map((child: Object3D) => {
      children.push(<ChildObject child={child} key={Math.random()} />);
    });
    container = <div className={`container ${!open ? 'closed' : ''}`}>{children}</div>;
  }

  return (
    <div className="childObject" key={Math.random()}>
      <div className="child">
        {hasChildren ? (
          <button
            className="status"
            style={{
              backgroundPositionX: open ? '-14px' : '2px',
            }}
            onClick={() => {
              setOpen(!open);
            }}
          ></button>
        ) : null}
        <button
          className="name"
          style={{
            left: hasChildren ? '20px' : '5px',
          }}
          onClick={() => {
            debugDispatcher.dispatchEvent({ type: ToolEvents.GET_OBJECT, value: props.child });
          }}
        >
          {props.child.name.length > 0
            ? `${props.child.name} (${props.child.type})`
            : `${props.child.type}::${props.child.uuid}`}
        </button>
        <div className={`icon ${determineIcon(props.child)}`}></div>
      </div>
      {container}
    </div>
  );
}