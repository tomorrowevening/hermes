import { Component, ReactNode } from 'react';
import RemoteThree from '@/core/remote/RemoteThree';
type InspectRendererProps = {
    three: RemoteThree;
};
type InspectRendererState = {
    expanded: boolean;
    lastUpdated: number;
};
export default class InspectRenderer extends Component<InspectRendererProps, InspectRendererState> {
    private autoClear;
    private autoClearColor;
    private autoClearDepth;
    private autoClearStencil;
    private outputColorSpace;
    private localClippingEnabled;
    private clearColor;
    private clearAlpha;
    private toneMapping;
    private toneMappingExposure;
    constructor(props: InspectRendererProps);
    componentwillunmount(): void;
    private onAddRenderer;
    render(): ReactNode;
    private saveExpanded;
    get expandedName(): string;
}
export {};
