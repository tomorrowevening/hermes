// Libs
import { useEffect, useRef, useState } from 'react';
// Models
import { ChildObjectProps, RemoteObject } from './types';
// Utils
import { determineIcon, setItemProps } from './utils';

export default function ChildObject(props: ChildObjectProps) {
  const visibleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const hasChildren = props.child !== undefined && props.child.children.length > 0;
  const children: Array<any> = [];
  if (props.child !== undefined && props.child.children.length > 0) {
    props.child.children.map((child: RemoteObject, index: number) => {
      children.push(<ChildObject child={child} key={index} three={props.three} />);
    });
  }

  useEffect(() => {
    if (props.child) {
      const scene = props.three.getScene(props.child.uuid);
      if (scene !== null) {
        const child = scene.getObjectByProperty('uuid', props.child.uuid);
        if (child !== undefined) {
          visibleRef.current!.style.opacity = child.visible ? '1' : '0.25';
        }
      }
    }
  }, [open]);

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
            <button
              className='visibility'
              ref={visibleRef}
              onClick={() => {
                if (props.child) {
                  const scene = props.three.getScene(props.child.uuid);
                  if (scene !== null) {
                    const child = scene.getObjectByProperty('uuid', props.child.uuid);
                    if (child !== undefined) {
                      const key = 'visible';
                      const value = !child.visible;
                      visibleRef.current!.style.opacity = value ? '1' : '0.25';
                      props.three.updateObject(props.child.uuid, key, value);
                      setItemProps(child, key, value);
                    } else {
                      console.log(`Hermes - Couldn't find object: ${props.child.uuid}`, scene);
                    }
                  } else {
                    console.log(`Hermes - Couldn't find object in scene: ${props.child.uuid}, ${props.child.name}`);
                  }
                }
              }}
            ></button>
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