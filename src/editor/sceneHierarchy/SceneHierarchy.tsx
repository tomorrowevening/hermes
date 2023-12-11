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
import { app } from '@/example/constants';

export default class SceneHierarchy extends Component {
  constructor(props: object | SceneHierarchyState) {
    super(props);
    this.state = {
      scene: null,
    } as SceneHierarchyState;
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
            <Accordion
              label={HierarchyName}
              button={(
                <button className='icon refresh hideText' onClick={this.onRefresh}>
                  Refresh
                </button>
              )}
              open={true}
            >
              <>
                {hasScene && <ContainerObject child={this.componentState.scene!} />}
              </>
            </Accordion>

            <Accordion label='Inspector'>
              <Inspector key="Inspector" />
            </Accordion>
          </>
        )}
    </div>
    );
  }

  // Private

  private onRefresh = () => {
    app.three.getScene();
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