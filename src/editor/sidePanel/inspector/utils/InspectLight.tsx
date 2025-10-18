import { Color } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from '../../types';
import { setItemProps } from '../../utils';

function prettyName(value: string): string {
  switch (value) {
    case 'color': return 'Color';
    case 'intensity': return 'Intensity';
    case 'decay': return 'Decay';
    case 'distance': return 'Distance';
    case 'angle': return 'Angle';
    case 'penumbra': return 'Penumbra';
    case 'groundColor': return 'Ground Color';
    case 'width': return 'Width';
    case 'height': return 'Height';
  }
  return value;
}

export function InspectLight(object: RemoteObject, three: RemoteThree) {
  function expandedName(): string {
    return `${three.name}_light`;
  }

  const expandedValue = localStorage.getItem(expandedName());
  const expanded = expandedValue !== null ? expandedValue === 'open' : false;

  function saveExpanded(value: boolean) {
    localStorage.setItem(expandedName(), value ? 'open' : 'closed');
  }

  const items: any[] = [];
  if (object.lightInfo !== undefined) {
    for (const i in object.lightInfo) {
      const value = object.lightInfo[i];
      if (value === undefined) continue;

      if (value.isColor !== undefined) {
        items.push({
          title: prettyName(i),
          prop: i,
          type: 'color',
          value: value,
          onChange: (prop: string, value: any) => {
            const color = new Color(value);
            // App
            three.updateObject(object.uuid, prop, color);

            // Editor
            const scene = three.getScene(object.uuid);
            if (scene !== null) {
              const child = scene.getObjectByProperty('uuid', object.uuid);
              setItemProps(child, prop, color);
            }
          }
        });
      } else {
        items.push({
          title: prettyName(i),
          prop: i,
          type: typeof value,
          value: value,
					step: typeof value === 'number' ? 0.01 : undefined,
          onChange: (prop: string, value: any) => {
            // App
						three.updateObject(object.uuid, prop, value);

            // Editor
            const scene = three.getScene(object.uuid);
            if (scene !== null) {
              const child = scene.getObjectByProperty('uuid', object.uuid);
              setItemProps(child, prop, value);
            }
          }
        });
      }
    }
  }
  return (
    <InspectorGroup
      three={three}
      title='Light'
      items={items}
      expanded={expanded}
      onToggle={(value: boolean) => {
        saveExpanded(value);
      }}
    />
  );
}
