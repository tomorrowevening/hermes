// Libs
import { Component, createRef, ReactNode, RefObject } from 'react';
// Models
import { Application, ToolEvents } from '@/core/Application';
import RemoteThree from '@/core/remote/RemoteThree';
import { GroupData, GroupItemData } from '@/core/types';
// Components
import InspectorGroup from './inspector/InspectorGroup';
import { InspectorFieldProps } from './inspector/InspectorField';

interface DebugDataProps {
  app: Application
  three: RemoteThree;
}

type DebugDataState = {
  lastUpdate: number;
}

export default class DebugData extends Component<DebugDataProps, DebugDataState> {
  static instance: DebugData;
  static groups: JSX.Element[] = [];
  static groupsRefs: RefObject<InspectorGroup>[] = [];
  static groupTitles: string[] = [];
  static app: Application;

  constructor(props: DebugDataProps) {
    super(props);
    this.state = { lastUpdate: Date.now() };
    DebugData.app = props.app;
    DebugData.instance = this;

    DebugData.app.addEventListener(ToolEvents.ADD_GROUP, this.addGroup);
    DebugData.app.addEventListener(ToolEvents.REMOVE_GROUP, this.removeGroup);
  }

  componentWillUnmount(): void {
    DebugData.app.removeEventListener(ToolEvents.ADD_GROUP, this.addGroup);
    DebugData.app.removeEventListener(ToolEvents.REMOVE_GROUP, this.removeGroup);
  }

  render(): ReactNode {
    return (
      <div className='customGroups' key={this.state.lastUpdate}>
        {DebugData.groups}
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
    
    DebugData.groups.push(
      <InspectorGroup
        app={DebugData.app}
        title={data.title}
        items={items}
        key={Math.random()}
      />
    );
    DebugData.groupTitles.push(data.title);
    this.setState({ lastUpdate: Date.now() });
  };

  private removeGroup = (evt: any) => {
    const name = evt.value;
    const total = DebugData.groupTitles.length;
    for (let i = 0; i < total; i++) {
      if (name === DebugData.groupTitles[i]) {
        DebugData.groups.splice(i, 1);
        DebugData.groupTitles.splice(i, 1);
        this.setState({ lastUpdate: Date.now() });
        return;
      }
    }
  };

  // Static

  static addEditorGroup(data: GroupData): RefObject<InspectorGroup> | null {
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

    const groupRef = createRef<InspectorGroup>();
    const group = (
      <InspectorGroup
        app={DebugData.app}
        ref={groupRef}
        title={data.title}
        items={items}
        key={Math.random()}
      />
    );
    DebugData.groups.push(group);
    DebugData.groupsRefs.push(groupRef);
    DebugData.groupTitles.push(data.title);
    return groupRef;
  }

  static removeEditorGroup(name: string) {
    const total = DebugData.groupTitles.length;
    for (let i = 0; i < total; i++) {
      if (name === DebugData.groupTitles[i]) {
        DebugData.groups.splice(i, 1);
        DebugData.groupTitles.splice(i, 1);
        DebugData.instance.setState({ lastUpdate: Date.now() });
        return;
      }
    }
  }

  static removeAllGroups() {
    for (let i = DebugData.groupTitles.length; i > 0; i--) {
      DebugData.groups.splice(i, 1);
      DebugData.groupTitles.splice(i, 1);
    }
    DebugData.instance.setState({ lastUpdate: Date.now() });
  }
}
