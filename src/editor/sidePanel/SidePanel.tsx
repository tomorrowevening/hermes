// Libs
import { Component, ReactNode } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
// Components
import '../scss/_sidePanel.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';
import { SidePanelState } from './types';
import RemoteThree from '@/core/remote/RemoteThree';

export default class SidePanel extends Component<SidePanelState> {
  private three: RemoteThree;

  constructor(props: SidePanelState) {
    super(props);
    this.state = {
      scene: props.scene !== undefined ? props.scene : null,
    };
    this.three = props.three;
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, this.setScene);
  }

  componentWillUnmount(): void {
    debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, this.setScene);
  }

  render(): ReactNode {
    const hasScene = this.componentState.scene !== null;
    const HierarchyName = 'Hierarchy - ' + (hasScene ? `${this.componentState.scene?.name}` : 'No Scene');
    return (
      <div id='SidePanel' key='SidePanel'>
        {(
          <>
            <Accordion label={HierarchyName} open={true}>
              <>
                {hasScene && (
                  <ContainerObject child={this.componentState.scene!} three={this.three} />
                )}
              </>
            </Accordion>

            <Inspector three={this.three} />
          </>
        )}
    </div>
    );
  }

  // Private

  private setScene = (evt: any) => {
    this.setState(() => ({
      scene: evt.value
    }));
  };

  // Getters / Setters

  get componentState(): SidePanelState {
    return this.state as SidePanelState;
  }
}