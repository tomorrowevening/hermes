import { Component, ReactNode } from 'react';
import '../scss/_sceneHierarchy.scss';
import { SceneModes, SceneHierarchyState } from './types';
export default class SceneHierarchy extends Component {
    constructor(props: object | SceneHierarchyState);
    componentWillUnmount(): void;
    render(): ReactNode;
    private onRefresh;
    private toggleOpen;
    private setScene;
    private onSelectItem;
    get componentState(): SceneHierarchyState;
    get mode(): SceneModes;
    set mode(value: SceneModes);
}
