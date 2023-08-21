/* eslint-disable @typescript-eslint/no-explicit-any */
// Libs
import { Component, ReactNode } from 'react'
// Models
import { debugDispatcher, ToolEvents } from '../global'
// Components
import '../scss/_sceneHierarchy.scss'
import ContainerObject from './ContainerObject'
import { SceneHierarchyState } from './types'

export default class SceneHierarchy extends Component {
  constructor(props: object | SceneHierarchyState) {
    super(props)
    this.state = {
      open: false,
      scene: null,
    } as SceneHierarchyState

    debugDispatcher.addEventListener(ToolEvents.REFRESH_SCENE, this.onUpdate)
    debugDispatcher.addEventListener(ToolEvents.SET_SCENE, this.onSetScene)
  }

  componentWillUnmount(): void {
    debugDispatcher.removeEventListener(ToolEvents.REFRESH_SCENE, this.onUpdate)
    debugDispatcher.removeEventListener(ToolEvents.SET_SCENE, this.onSetScene)
  }

  render(): ReactNode {
    const headerTitle = this.componentState.scene !== null ? `Hierarchy: ${this.componentState.scene.name}` : 'Hierarchy'
    return (
      <div id="SceneHierarchy">
        <div className="header">
          <button
            className="status"
            style={{
              backgroundPositionX: this.componentState.open ? '-14px' : '2px',
            }}
            onClick={this.toggleOpen}
          ></button>
          <span>{headerTitle}</span>
          <button className="refresh hideText" onClick={this.onRefresh}>
            Refresh
          </button>
        </div>
        {this.componentState.scene !== null && this.componentState.open ? <ContainerObject child={this.componentState.scene} /> : null}
    </div>
    )
  }

  // Private

  private onUpdate = () => {
    //
  }

  private toggleOpen = () => {
    this.setState(()=> ({
      open: !this.componentState.open,
    }))
  }

  private onRefresh = () => {
    debugDispatcher.dispatchEvent({ type: ToolEvents.INSPECT_ITEM, value: this.componentState.scene })
  }

  private onSetScene = (evt: any) => {
    console.log('SceneHierarchy::onSetScene', evt)
    this.setState(() => ({
      scene: evt.value
    }))
  }

  // Getters / Setters

  get componentState(): SceneHierarchyState {
    return this.state as SceneHierarchyState
  }
}