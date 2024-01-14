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
  }
  return value;
}

export function InspectLight(obj: RemoteObject, three: RemoteThree) {
  const items: any[] = [];
  if (obj.lightInfo !== undefined) {
    for (const i in obj.lightInfo) {
      const value = obj.lightInfo[i];
      if (value === undefined) continue;

      if (value.isColor !== undefined) {
        items.push({
          title: prettyName(i),
          prop: i,
          type: 'color',
          value: value,
          onChange: (prop: string, value: any) => {
            const color = new Color(value);
            three.updateObject(obj.uuid, prop, color);
            const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
            if (child !== undefined) setItemProps(child, prop, color);
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
						three.updateObject(obj.uuid, prop, value);
            const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
            if (child !== undefined) setItemProps(child, prop, value);
          }
        });
      }
    }
  }
  return (
    <InspectorGroup
      title="Light"
      items={items}
    />
  );
}
