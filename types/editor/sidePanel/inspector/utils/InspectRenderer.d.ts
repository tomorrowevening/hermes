import { Component, ReactNode } from 'react';
import RemoteThree from '../../../../core/remote/RemoteThree';
type InspectRendererProps = {
    three: RemoteThree;
};
type InspectRendererState = {
    expanded: boolean;
    lastUpdated: number;
};
export default class InspectRenderer extends Component<InspectRendererProps, InspectRendererState> {
    private autoClearColor;
    private outputColorSpace;
    private clearColor;
    private clearAlpha;
    private toneMapping;
    private toneMappingExposure;
    private type;
    constructor(props: InspectRendererProps);
    componentWillUnmount(): void;
    private onAddRenderer;
    render(): ReactNode;
    private saveExpanded;
    get expandedName(): string;
}
export {};
