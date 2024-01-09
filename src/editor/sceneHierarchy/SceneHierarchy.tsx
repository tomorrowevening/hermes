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

  componentDidMount(): void {
    this.onRefresh();
  }

  componentWillUnmount(): void {
    debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, this.setScene);
  }

  render(): ReactNode {
    const hasScene = this.componentState.scene !== null;
    const HierarchyName = 'Hierarchy' + (hasScene ? `: ${this.componentState.scene?.name}` : '');
    return (
      <div id="SceneHierarchy" key="SceneHierarchy">
        {(
          <>
            {hasScene && (
              <Accordion
                label={HierarchyName}
                button={(
                  <button className='icon refresh hideText' onClick={this.onRefresh}>
                    Refresh
                  </button>
                )}
                open={true}
              >
                <ContainerObject child={this.componentState.scene!} three={this.three} />
              </Accordion>
            )}

            <Accordion label='Inspector'>
              <Inspector key="Inspector" three={this.three} />
            </Accordion>
          </>
        )}
    </div>
    );
  }

  // Private

  private onRefresh = () => {
    this.three.getScene();
  };

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