import { Component, createRef, KeyboardEvent, ReactNode, RefObject } from 'react';
import Accordion from '../Accordion';
import InspectorField, { InspectorFieldProps } from './InspectorField';
import { capitalize } from '../../../editor/utils';
import { GroupData, GroupItemData } from '../../../core/types';
import RemoteThree from '../../../core/remote/RemoteThree';

function isGroup(obj: any): obj is InspectorGroupProps {
  return 'items' in obj;
}

export interface InspectorGroupProps {
  three: RemoteThree;
  title: string
  expanded?: boolean
  items: InspectorFieldProps[] | InspectorGroupProps[]
  onToggle?: (value: boolean) => void
}

type InspectorGroupState = {
  lastUpdated: number;
}

export default class InspectorGroup extends Component<InspectorGroupProps, InspectorGroupState> {
  subgroupNames: string[] = [];
  subgroupElements: JSX.Element[] = [];
  valueOverrides: Map<string, any> = new Map();
  three: RemoteThree;

  constructor(props: InspectorGroupProps) {
    super(props);
    this.three = props.three;
    this.state = { lastUpdated: Date.now() };
  }

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
        three={this.props.three}
        ref={elementRef}
        title={data.title}
        expanded={data.expanded}
        items={items}
        key={Math.random()}
      />
    );
    this.subgroupNames.push(data.title);
    this.subgroupElements.push(element);
    this.setState({ lastUpdated: Date.now() });

    return elementRef;
  }

  removeGroup(name: string) {
    const total = this.subgroupNames.length;
    for (let i = 0; i < total; i++) {
      const groupName = this.subgroupNames[i];
      if (name === groupName) {
        this.subgroupNames.splice(i, 1);
        this.subgroupElements.splice(i, 1);
        this.setState({ lastUpdated: Date.now() });
        return;
      }
    }
  }

  setField(name: string, value: any) {
    this.valueOverrides.set(name, value);
    this.setState({ lastUpdated: Date.now() });
  }

  render(): ReactNode {
    const children: any[] = [];
    this.props.items.forEach((child: InspectorFieldProps | InspectorGroupProps) => {
      if (isGroup(child)) {
        children.push(
          <InspectorGroup three={this.props.three} title={capitalize(child.title)} items={child.items} key={Math.random()} />
        );
      } else {
        const valueOverride = this.valueOverrides.get(child.title);
        const value = valueOverride !== undefined ? valueOverride : child.value;
        children.push(
          <InspectorField
            key={Math.random()}
            title={child.title}
            prop={child.prop}
            value={value}
            type={child.type}
            min={child.min}
            max={child.max}
            step={child.step}
            disabled={child.disabled}
            options={child.options}
            onChange={(prop: string, value: any) => {
              if (child.onChange !== undefined) {
                this.valueOverrides.delete(child.title);
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

    this.subgroupElements.forEach((node: any) => children.push(node));

    return (
      <Accordion
        three={this.props.three}
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
