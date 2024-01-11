// Libs
import { Component, ReactNode } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
// Components
import '../scss/_sceneHierarchy.scss';
import Accordion from './Accordion';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';
import { SceneHierarchyState } from './types';
import RemoteThree from '@/core/remote/RemoteThree';

export default class SceneHierarchy extends Component<SceneHierarchyState> {
  private three: RemoteThree;

  constructor(props: SceneHierarchyState) {
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
      <div id="SceneHierarchy" key="SceneHierarchy">
        {(
          <>
            <Accordion label={HierarchyName} open={true}>
              <>
                {hasScene && (
                  <ContainerObject child={this.componentState.scene!} three={this.three} />
                )}
              </>
            </Accordion>

            <Accordion label='Inspector'>
              <Inspector key="Inspector" three={this.three} />
            </Accordion>
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

  get componentState(): SceneHierarchyState {
    return this.state as SceneHierarchyState;
  }
}