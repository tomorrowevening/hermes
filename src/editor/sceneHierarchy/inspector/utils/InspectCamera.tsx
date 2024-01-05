import RemoteThree from '@/core/remote/RemoteThree';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from "../../types";
import { setItemProps } from '../../utils';

function prettyName(name: string): string {
  switch (name) {
    case 'fov': return 'FOV';
    case 'zoom': return 'Zoom';
    case 'near': return 'Near';
    case 'far': return 'Far';
    case 'focus': return 'Focus';
    case 'aspect': return 'Aspect';
    case 'filmGauge': return 'Film Gauge';
    case 'filmOffset': return 'Film Offset';
    case 'left': return 'Left';
    case 'right': return 'Right';
    case 'top': return 'Top';
    case 'bottom': return 'Bottom';
  }
  return name;
}

export function InspectCamera(object: RemoteObject, three: RemoteThree): any {
  const items: any[] = [];

  if (object.perspectiveCameraInfo !== undefined) {
    for (const i in object.perspectiveCameraInfo) {
      items.push({
        title: prettyName(i),
        prop: i,
        type: 'number',
        step: 0.01,
        // @ts-ignore
        value: object.perspectiveCameraInfo[i],
        onChange: (prop: string, value: any) => {
          three.updateObject(object.uuid, prop, value);
          three.requestMethod(object.uuid, 'updateProjectionMatrix');

          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) {
            setItemProps(child, prop, value);
            // @ts-ignore
            child.updateProjectionMatrix();
          }
        }
      });
    }
  } else if (object.orthographicCameraInfo !== undefined) {
    for (const i in object.orthographicCameraInfo) {
      items.push({
        title: prettyName(i),
        prop: i,
        type: 'number',
        step: 0.01,
        // @ts-ignore
        value: object.perspectiveCameraInfo[i],
        onChange: (prop: string, value: any) => {
          three.updateObject(object.uuid, prop, value);
          three.requestMethod(object.uuid, 'updateProjectionMatrix');

          const child = three.scene?.getObjectByProperty('uuid', object.uuid);
          if (child !== undefined) {
            setItemProps(child, prop, value);
            // @ts-ignore
            child.updateProjectionMatrix();
          }
        }
      });
    }
  }

  return (
    <InspectorGroup
      title="Camera"
      items={items}
    />
  );
}
