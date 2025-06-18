import { Component, ReactNode } from 'react';
import { Application } from '@/core/Application';
import RemoteThree from '@/core/remote/RemoteThree';
type InspectRendererProps = {
    app: Application;
    three: RemoteThree;
};
type InspectRendererState = {
    expanded: boolean;
    lastUpdated: number;
};
export default class InspectRenderer extends Component<InspectRendererProps, InspectRendererState> {
    private app;
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
    private type;
    constructor(props: InspectRendererProps);
    componentwillunmount(): void;
    private onAddRenderer;
    render(): ReactNode;
    private saveExpanded;
    get expandedName(): string;
}
export {};
