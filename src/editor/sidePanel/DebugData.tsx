// Libs
import { Component, ReactNode } from 'react';
// Models
import RemoteThree from '@/core/remote/RemoteThree';
import { debugDispatcher, ToolEvents } from '../global';
import { GroupData, GroupItemData } from '@/core/types';
// Components
import InspectorGroup from './inspector/InspectorGroup';
import { InspectorFieldProps } from './inspector/InspectorField';

interface DebugDataProps {
  three: RemoteThree;
}

type DebugDataState = {
  groups: any[];
  groupTitles: string[];
  lastUpdate: number;
}

export default class DebugData extends Component<DebugDataProps, DebugDataState> {
  static instance: DebugData | null = null;

  constructor(props: DebugDataProps) {
    super(props);
    this.state = {
      groups: [],
      groupTitles: [],
      lastUpdate: Date.now(),
    };
    DebugData.instance = this;
  }

  componentDidMount(): void {
    debugDispatcher.addEventListener(ToolEvents.ADD_GROUP, this.addGroup);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_GROUP, this.removeGroup);
  }

  componentWillUnmount(): void {
    debugDispatcher.removeEventListener(ToolEvents.ADD_GROUP, this.addGroup);
    debugDispatcher.removeEventListener(ToolEvents.REMOVE_GROUP, this.removeGroup);
  }

  render(): ReactNode {
    return (
      <div className='customGroups' key={this.state.lastUpdate}>
        {this.state.groups}
      </div>
    );
  }

  // Events

  private addGroup = (evt: any) => {
    const data = JSON.parse(evt.value) as GroupData;
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
          this.props.three.updateGroup(data.title, prop, value);
        },
      });
    });
    
    this.state.groups.push(
      <InspectorGroup
        title={data.title}
        items={items}
        key={Math.random()}
      />
    );
    this.state.groupTitles.push(data.title);
    this.setState({ lastUpdate: Date.now() });
  };

  private removeGroup = (evt: any) => {
    const name = evt.value;
    const total = this.state.groupTitles.length;
    for (let i = 0; i < total; i++) {
      if (name === this.state.groupTitles[i]) {
        this.state.groups.splice(i, 1);
        this.state.groupTitles.splice(i, 1);
        this.setState({ lastUpdate: Date.now() });
        return;
      }
    }
  };

  // Static

  static addEditorGroup(data: GroupData) {
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
    
    DebugData.instance!.state.groups.push(
      <InspectorGroup
        title={data.title}
        items={items}
        key={Math.random()}
      />
    );
    DebugData.instance!.state.groupTitles.push(data.title);
    DebugData.instance!.setState({ lastUpdate: Date.now() });
  }

  static removeEditorGroup(name: string) {
    DebugData.instance!.removeGroup({ value: name });
  }
}
