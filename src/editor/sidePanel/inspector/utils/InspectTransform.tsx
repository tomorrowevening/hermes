import { Euler, Matrix4, Vector3 } from 'three';
import { Component, ReactNode } from 'react';
import InspectorGroup from '../InspectorGroup';
import { RemoteObject } from '../../types';
import { setItemProps } from '../../utils';
import MultiView from '@/editor/multiView/MultiView';

type InspectTransformProps = {
  object: RemoteObject;
}

type InspectTransformState = {
  lastUpdated: number;
  expanded: boolean;
}

export class InspectTransform extends Component<InspectTransformProps, InspectTransformState> {
  static instance: InspectTransform;

  matrix = new Matrix4();
  position = new Vector3();
  rotation = new Euler();
  scale = new Vector3();
  open = false;

  constructor(props: InspectTransformProps) {
    super(props);

    this.state = {
      lastUpdated: 0,
      expanded: false,
    };

    // @ts-ignore
    this.matrix.elements = props.object.matrix;
    if (props.object.uuid.length > 0) {
      this.position.setFromMatrixPosition(this.matrix);
      this.rotation.setFromRotationMatrix(this.matrix);
      this.scale.setFromMatrixScale(this.matrix);
    }

    InspectTransform.instance = this;
  }

  update() {
    this.position.copy(MultiView.instance!.selectedItem!.position);
    this.rotation.copy(MultiView.instance!.selectedItem!.rotation);
    this.scale.copy(MultiView.instance!.selectedItem!.scale);
    this.setState({ lastUpdated: Date.now() });
  }

  render(): ReactNode {
    return (
      <InspectorGroup
        key={this.state.lastUpdated}
        title='Transform'
        expanded={this.open}
        items={[
          {
            title: 'Position',
            prop: 'position',
            type: 'grid3',
            step: 0.1,
            value: this.position,
            onChange: this.updateTransform,
          },
          {
            title: 'Rotation',
            prop: 'rotation',
            type: 'grid3',
            value: this.rotation,
            onChange: this.updateTransform,
          },
          {
            title: 'Scale',
            prop: 'scale',
            type: 'grid3',
            value: this.scale,
            onChange: this.updateTransform,
          },
          {
            title: 'Visible',
            prop: 'visible',
            type: 'boolean',
            value: InspectTransform.instance.props.object.visible,
            onChange: this.updateTransform,
          },
        ]}
        onToggle={(value: boolean) => {
          this.open = value;
        }}
      />
    );
  }

  private updateTransform(prop: string, value: any) {
    const realValue = prop === 'rotation' ? { x: value._x, y: value._y, z: value._z } : value;

    // App
    MultiView.instance?.three.updateObject(InspectTransform.instance.props.object.uuid, prop, realValue);

    // Editor
    const scene = MultiView.instance?.three.getScene(InspectTransform.instance.props.object.uuid);
    if (scene) {
      const child = scene.getObjectByProperty('uuid', InspectTransform.instance.props.object.uuid);
      setItemProps(child, prop, realValue);
    }
  }
}
