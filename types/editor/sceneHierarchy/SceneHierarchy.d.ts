import { Component, ReactNode } from 'react';
import '../scss/_sceneHierarchy.scss';
import { SceneHierarchyState } from './types';
export default class SceneHierarchy extends Component {
    constructor(props: object | SceneHierarchyState);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): ReactNode;
    private onRefresh;
    private setScene;
    get componentState(): SceneHierarchyState;
}
