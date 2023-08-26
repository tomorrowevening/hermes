import { Component, ReactNode } from 'react';
import '../scss/_sceneHierarchy.scss';
import { SceneHierarchyState } from './types';
export default class SceneHierarchy extends Component {
    constructor(props: object | SceneHierarchyState);
    componentWillUnmount(): void;
    render(): ReactNode;
    private onUpdate;
    private toggleOpen;
    private onRefresh;
    private onSetScene;
    get componentState(): SceneHierarchyState;
}
