import RemoteThree from '../../../../core/remote/RemoteThree';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from '../../types';
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
  function expandedName(): string {
    return `${three.name}_camera`;
  }

  const expandedValue = localStorage.getItem(expandedName());
  const expanded = expandedValue !== null ? expandedValue === 'open' : false;

  function saveExpanded(value: boolean) {
    localStorage.setItem(expandedName(), value ? 'open' : 'closed');
  }

  const items: any[] = [];

  if (object.perspectiveCameraInfo !== undefined) {
    for (const i in object.perspectiveCameraInfo) {
      items.push({
        title: prettyName(i),
        prop: i,
        type: 'number',
        step: 0.01,
        value: object.perspectiveCameraInfo[i],
        onChange: (prop: string, value: any) => {
          // App
          three.updateObject(object.uuid, prop, value);
          three.requestMethod(object.uuid, 'updateProjectionMatrix');

          // Editor
          const scene = three.getScene(object.uuid);
          if (scene !== null) {
            const child = scene.getObjectByProperty('uuid', object.uuid);
            if (child !== undefined) {
              setItemProps(child, prop, value);
              child['updateProjectionMatrix']();
            }
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
        value: object.orthographicCameraInfo![i],
        onChange: (prop: string, value: any) => {
          // App
          three.updateObject(object.uuid, prop, value);
          three.requestMethod(object.uuid, 'updateProjectionMatrix');

          // Editor
          const scene = three.getScene(object.uuid);
          if (scene !== null) {
            const child = scene.getObjectByProperty('uuid', object.uuid);
            if (child !== undefined) {
              setItemProps(child, prop, value);
              child['updateProjectionMatrix']();
            }
          }
        }
      });
    }
  }

  return (
    <InspectorGroup
      three={three}
      title='Camera'
      items={items}
      expanded={expanded}
      onToggle={(value: boolean) => {
        saveExpanded(value);
      }}
    />
  );
}
