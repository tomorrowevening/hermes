import RemoteThree from "@/core/remote/RemoteThree";
import InspectorGroup from "../InspectorGroup";
import { InspectorFieldProps } from '../InspectorField';
import { AnimationClipInfo, RemoteObject } from '../../types';
import { setItemProps } from "../../utils";

export default function InspectAnimation(obj: RemoteObject, three: RemoteThree) {
  const items: InspectorFieldProps[] = [];
  obj.animations.forEach((value: AnimationClipInfo) => {
    // Add animation
    items.push({
      title: 'Name',
      type: 'string',
      prop: 'name',
      value: value.name,
      disabled: true,
      onChange: (prop: string, value: any) => {
        three.updateObject(obj.uuid, prop, value);
        const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
        if (child !== undefined) setItemProps(child, prop, value);
      },
    });
    items.push({
      title: 'Duration',
      type: 'number',
      prop: 'duration',
      value: value.duration,
      disabled: true,
      onChange: (prop: string, value: any) => {
        three.updateObject(obj.uuid, prop, value);
        const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
        if (child !== undefined) setItemProps(child, prop, value);
      },
    });
    items.push({
      title: 'Blend Mode',
      type: 'number',
      prop: 'blendMode',
      value: value.blendMode,
      disabled: true,
      onChange: (prop: string, value: any) => {
        three.updateObject(obj.uuid, prop, value);
        const child = three.scene?.getObjectByProperty('uuid', obj.uuid);
        if (child !== undefined) setItemProps(child, prop, value);
      },
    });
  });
  return (
    <InspectorGroup title="Animations" items={items} />
  );
}
