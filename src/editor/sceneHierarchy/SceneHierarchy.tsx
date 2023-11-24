// Libs
import { Component, ReactNode } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
// Components
import '../scss/_sceneHierarchy.scss';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';
import { SceneModes, SceneHierarchyState } from './types';

export default class SceneHierarchy extends Component {
  constructor(props: object | SceneHierarchyState) {
    super(props);
    this.state = {
      mode: 'Hierarchy',
      open: false,
      scene: null,
    } as SceneHierarchyState;
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, this.setScene);
  }

  componentWillUnmount(): void {
    debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, this.setScene);
  }

  render(): ReactNode {
    const hasScene = this.componentState.scene !== null;
    const openHierarchy = this.componentState.open && this.mode === 'Hierarchy';
    return (
      <div id="SceneHierarchy" key="SceneHierarchy">
        <ul id='options'>
          {hasScene && this.mode === 'Hierarchy' && (
            <>
              <li className='icon'>
                <button
                  className='status'
                  onClick={this.toggleOpen}
                  style={{
                    backgroundPositionX: this.componentState.open ? '-14px' : '2px',
                  }}
                >
                  Toggle
                </button>
              </li>
              <li className='icon'>
                <button className='refresh' onClick={this.onRefresh}>
                  Refresh
                </button>
              </li>
            </>
          )}
          <li className={this.mode === 'Hierarchy' ? 'selected' : ''}>
            <button onClick={() => { this.mode = 'Hierarchy'; }}>Hierarchy</button>
          </li>
          <li className={this.mode === 'Inspector' ? 'selected' : ''}>
            <button onClick={() => { this.mode = 'Inspector'; }}>Inspector</button>
          </li>
        </ul>
        {/* {hasScene && ( */}
        {(
          // <div className={this.componentState.open ? '' : 'hidden'}>
          <div>
            {hasScene && <ContainerObject class={openHierarchy ? '' : 'hidden'} child={this.componentState.scene!} />}
            <Inspector class={this.mode === 'Inspector' ? '' : 'hidden'} key="Inspector" />
          </div>
        )}
    </div>
    );
  }

  // Private

  private onRefresh = () => {
    debugDispatcher.dispatchEvent({ type: ToolEvents.SET_SCENE, value: this.componentState.scene });
  };

  private toggleOpen = () => {
    this.setState(()=> ({
      open: !this.componentState.open,
    }));
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

  get mode(): SceneModes {
    return this.componentState.mode;
  }

  set mode(value: SceneModes) {
    this.setState(() => ({ mode: value }));
  }
}