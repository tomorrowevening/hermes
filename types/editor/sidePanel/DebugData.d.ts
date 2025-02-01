import { Component, ReactNode, RefObject } from 'react';
import { Application } from '@/core/Application';
import RemoteThree from '@/core/remote/RemoteThree';
import { GroupData } from '@/core/types';
import InspectorGroup from './inspector/InspectorGroup';
interface DebugDataProps {
    app: Application;
    three: RemoteThree;
}
type DebugDataState = {
    lastUpdate: number;
};
export default class DebugData extends Component<DebugDataProps, DebugDataState> {
    static instance: DebugData;
    static groups: JSX.Element[];
    static groupsRefs: RefObject<InspectorGroup>[];
    static groupTitles: string[];
    static app: Application;
    constructor(props: DebugDataProps);
    componentWillUnmount(): void;
    render(): ReactNode;
    private addGroup;
    private removeGroup;
    static addEditorGroup(data: GroupData): RefObject<InspectorGroup> | null;
    static removeEditorGroup(name: string): void;
}
export {};
