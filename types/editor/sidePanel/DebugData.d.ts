import { Component, ReactNode, RefObject } from 'react';
import RemoteThree from '@/core/remote/RemoteThree';
import { GroupData } from '@/core/types';
import InspectorGroup from './inspector/InspectorGroup';
interface DebugDataProps {
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
    static three: RemoteThree;
    constructor(props: DebugDataProps);
    componentWillUnmount(): void;
    render(): ReactNode;
    private addGroup;
    private removeGroup;
    static addEditorGroup(data: GroupData): RefObject<InspectorGroup> | null;
    static removeEditorGroup(name: string): void;
    static removeAllGroups(): void;
}
export {};
