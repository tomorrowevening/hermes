// Libs
import { useState } from 'react';
import { Object3D } from 'three';
// Models
import { ChildObjectProps } from './types';
// Utils
import { determineIcon } from './utils';

export default function ChildObject(props: ChildObjectProps) {
  const [open, setOpen] = useState(false);

  const hasChildren = props.child !== undefined && props.child.children.length > 0;
  const children: Array<any> = [];
  if (props.child !== undefined && props.child.children.length > 0) {
    props.child.children.map((child: Object3D) => {
      children.push(<ChildObject child={child} key={Math.random()} three={props.three} />);
    });
  }

  return (
    <>
      {props.child !== undefined && (
        <div className='childObject' key={Math.random()}>
          <div className='child'>
            {hasChildren ? (
              <button
                className='status'
                style={{
                  backgroundPositionX: open ? '-14px' : '2px',
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              ></button>
            ) : null}
            <button
              className='name'
              style={{
                left: hasChildren ? '20px' : '5px',
              }}
              onClick={() => {
                if (props.child !== undefined) {
                  props.three.getObject(props.child.uuid);
                  if (!open) setOpen(true);
                }
              }}
            >
              {props.child.name.length > 0
                ? `${props.child.name} (${props.child.type})`
                : `${props.child.type}::${props.child.uuid}`}
            </button>
            <div className={`icon ${determineIcon(props.child)}`}></div>
          </div>
          <div className={open ? 'open' : ''}>
            <div className='container'>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}