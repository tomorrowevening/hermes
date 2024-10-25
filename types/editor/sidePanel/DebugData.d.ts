import { Component, ReactNode } from 'react';
import RemoteThree from '@/core/remote/RemoteThree';
import { GroupData } from '@/core/types';
interface DebugDataProps {
    three: RemoteThree;
}
type DebugDataState = {
    groups: any[];
    groupTitles: string[];
    lastUpdate: number;
};
export default class DebugData extends Component<DebugDataProps, DebugDataState> {
    static instance: DebugData | null;
    constructor(props: DebugDataProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): ReactNode;
    private addGroup;
    private removeGroup;
    static addEditorGroup(data: GroupData): void;
    static removeEditorGroup(name: string): void;
}
export {};
