// Libs
import { Component, ReactNode } from 'react';
// Models
import { debugDispatcher, ToolEvents } from '../global';
// Components
import '../scss/_sceneHierarchy.scss';
import ContainerObject from './ContainerObject';
import Inspector from './inspector/Inspector';
import { SceneModes, SceneHierarchyState } from './types';
import { app } from '@/example/constants';

type SectionProps = {
  label: string
  button?: JSX.Element
  children?: JSX.Element | JSX.Element[]
}
function Section(props: SectionProps) {
  return (
    <div className='section'>
      <h1>{props.label} {props.button}</h1>
      {props.children}
    </div>
  );
}

export default class SceneHierarchy extends Component {
  constructor(props: object | SceneHierarchyState) {
    super(props);
    this.state = {
      mode: 'Hierarchy',
      open: false,
      scene: null,
    } as SceneHierarchyState;
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, this.setScene);
    debugDispatcher.addEventListener(ToolEvents.SET_OBJECT, this.onSelectItem);
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  componentWillUnmount(): void {
    debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, this.setScene);
    debugDispatcher.removeEventListener(ToolEvents.SET_OBJECT, this.onSelectItem);
  }

  render(): ReactNode {
    const hasScene = this.componentState.scene !== null;
    const HierarchyName = 'Hierarchy' + (hasScene ? `: ${this.componentState.scene?.name}` : '');
    return (
      <div id="SceneHierarchy" key="SceneHierarchy">
        {(
          <>
            <Section
              label={HierarchyName}
              button={(
                <button className='icon refresh hideText' onClick={this.onRefresh}>
                  Refresh
                </button>
              )}
            >
              <>
                {hasScene && <ContainerObject child={this.componentState.scene!} />}
              </>
            </Section>
            <Section label='Inspector'>
              <Inspector key="Inspector" />
            </Section>
          </>
        )}
    </div>
    );
  }

  // Private

  private onRefresh = () => {
    app.three.getScene();
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

  private onSelectItem = () => {
    this.mode = 'Inspector';
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