import { Euler, Matrix4, Vector3 } from 'three';
import { Component, ReactNode } from 'react';
import { RemoteObject } from '../../types';
type InspectTransformProps = {
    object: RemoteObject;
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
}
export {};
