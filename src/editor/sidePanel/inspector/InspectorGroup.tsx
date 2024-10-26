import { Component, createRef, KeyboardEvent, ReactNode, RefObject } from 'react';
import Accordion from '../Accordion';
import InspectorField, { InspectorFieldProps } from './InspectorField';
import { capitalize } from '@/editor/utils';
import { GroupData, GroupItemData } from '@/core/types';

export interface InspectorGroupProps {
  title: string
  expanded?: boolean
  items: InspectorFieldProps[] | InspectorGroupProps[]
  onToggle?: (value: boolean) => void
}

function isGroup(obj: any): obj is InspectorGroupProps {
  return 'items' in obj;
}

export default class InspectorGroup extends Component<InspectorGroupProps> {
  subgroups: any[] = [];

  addGroup(data: GroupData): RefObject<InspectorGroup> {
    const items: InspectorFieldProps[] = [];

    data.items.forEach((item: GroupItemData) => {
      items.push({
        type: item.type,
        prop: item.prop,
        title: item.title !== undefined ? item.title : item.prop,
        value: item.value,
        min: item.min,
        max: item.max,
        step: item.step,
        options: item.options,
        disabled: item.disabled,
        onChange: (prop: string, value: any) => {
          data.onUpdate(prop, value);
        },
      });
    });

    const elementRef = createRef<InspectorGroup>();
    const element = (
      <InspectorGroup
        ref={elementRef}
        title={data.title}
        items={items}
        key={Math.random()}
      />
    );
    this.subgroups.push(element);
    return elementRef;
  }

  render(): ReactNode {
    const children: any[] = [];
    this.props.items.forEach((child: InspectorFieldProps | InspectorGroupProps) => {
      if (isGroup(child)) {
        children.push(
          <InspectorGroup title={capitalize(child.title)} items={child.items} key={Math.random()} />
        );
      } else {
        children.push(
          <InspectorField
            key={Math.random()}
            title={child.title}
            prop={child.prop}
            value={child.value}
            type={child.type}
            min={child.min}
            max={child.max}
            step={child.step}
            disabled={child.disabled}
            options={child.options}
            onChange={(prop: string, value: any) => {
              if (child.onChange !== undefined) {
                child.onChange(prop, value);
              }
            }}
            onKeyDown={(evt: KeyboardEvent) => {
              if (child.onKeyDown !== undefined) {
                child.onKeyDown(evt);
              }
            }}
          />
        );
      }
    });

    this.subgroups.forEach((node: any) => children.push(node));

    return (
      <Accordion
        label={this.props.title}
        open={this.props.expanded === true}
        onToggle={(value: boolean) => {
          if (this.props.onToggle) this.props?.onToggle(value);
        }}
      >
        {children}
      </Accordion>
    );
  }
}
