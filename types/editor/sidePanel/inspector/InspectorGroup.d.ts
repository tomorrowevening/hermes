import { Component, ReactNode, RefObject } from 'react';
import { InspectorFieldProps } from './InspectorField';
import { GroupData } from '@/core/types';
import Application from '@/core/Application';
export interface InspectorGroupProps {
    app: Application;
    title: string;
    expanded?: boolean;
    items: InspectorFieldProps[] | InspectorGroupProps[];
    onToggle?: (value: boolean) => void;
}
type InspectorGroupState = {
    lastUpdated: number;
};
export default class InspectorGroup extends Component<InspectorGroupProps, InspectorGroupState> {
    subgroupNames: string[];
    subgroupElements: JSX.Element[];
    valueOverrides: Map<string, any>;
    app: Application;
    constructor(props: InspectorGroupProps);
    addGroup(data: GroupData): RefObject<InspectorGroup>;
    removeGroup(name: string): void;
    setField(name: string, value: any): void;
    render(): ReactNode;
}
export {};
