// Libs
import { useEffect, useState } from 'react';
// Models
import RemoteThree from '@/core/remote/RemoteThree';
import { debugDispatcher, ToolEvents } from '../global';
import { GroupData, GroupItemData } from '@/core/types';
// Components
import InspectorGroup from './inspector/InspectorGroup';
import { InspectorFieldProps } from './inspector/InspectorField';

interface CustomAccordionProps {
  three: RemoteThree;
}

export default function CustomAccordion(props: CustomAccordionProps) {
  const [groups] = useState<any[]>([]);
  const [groupTitles] = useState<string[]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    const addGroup = (evt: any) => {
      const data = JSON.parse(evt.value) as GroupData;
      const items: InspectorFieldProps[] = [];

      data.items.forEach((item: GroupItemData) => {
        items.push({
          title: item.title,
          type: item.type,
          value: item.value,
          prop: item.prop,
          min: item.min,
          max: item.max,
          step: item.step,
          onChange: (prop: string, value: any) => {
            props.three.updateGroup(data.title, prop, value);
          },
        });
      });
      
      groups.push(
        <InspectorGroup
          title={data.title}
          items={items}
          key={Math.random()}
        />
      );
      groupTitles.push(data.title);
      setLastUpdate(Date.now());
    };

    const removeGroup = (evt: any) => {
      const name = evt.value;
      const total = groupTitles.length;
      for (let i = 0; i < total; i++) {
        if (name === groupTitles[i]) {
          groups.splice(i, 1);
          groupTitles.splice(i, 1);
          setLastUpdate(Date.now());
          return;
        }
      }
    };

    debugDispatcher.addEventListener(ToolEvents.ADD_GROUP, addGroup);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_GROUP, removeGroup);

    return () => {
      debugDispatcher.removeEventListener(ToolEvents.ADD_GROUP, addGroup);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_GROUP, removeGroup);
    };
  }, []);

  return (
    <div className='customGroups' key={lastUpdate}>
      {groups}
    </div>
  );
}
