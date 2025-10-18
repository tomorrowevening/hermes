import { Euler, Matrix4, Vector3 } from 'three';
import { Component, ReactNode } from 'react';
import { RemoteObject } from '../../types';
import RemoteThree from '../../../../core/remote/RemoteThree';
type InspectTransformProps = {
    object: RemoteObject;
    three: RemoteThree;
};
type InspectTransformState = {
    lastUpdated: number;
    expanded: boolean;
};
export declare class InspectTransform extends Component<InspectTransformProps, InspectTransformState> {
    static instance: InspectTransform;
    matrix: Matrix4;
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    open: boolean;
    constructor(props: InspectTransformProps);
    update(): void;
    render(): ReactNode;
    private updateTransform;
    private saveExpanded;
    get expandedName(): string;
}
export {};
