import { Component, ReactNode } from 'react';
import '../scss/_sidePanel.scss';
import { SidePanelState } from './types';
export default class SidePanel extends Component<SidePanelState> {
    private three;
    constructor(props: SidePanelState);
    componentWillUnmount(): void;
    render(): ReactNode;
    private setScene;
    get componentState(): SidePanelState;
}
