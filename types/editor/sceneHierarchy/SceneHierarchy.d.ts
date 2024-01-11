import { Component, ReactNode } from 'react';
import '../scss/_sceneHierarchy.scss';
import { SceneHierarchyState } from './types';
export default class SceneHierarchy extends Component<SceneHierarchyState> {
    private three;
    constructor(props: SceneHierarchyState);
    componentWillUnmount(): void;
    render(): ReactNode;
    private setScene;
    get componentState(): SceneHierarchyState;
}
