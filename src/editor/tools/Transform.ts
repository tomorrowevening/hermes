// Libs
import { Camera, EventDispatcher } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
// Remote
import RemoteThree from '@/core/remote/RemoteThree';

export default class Transform extends EventDispatcher {
  static DRAG_START = 'Transform::dragStart';
  static DRAG_END = 'Transform::dragEnd';

  private static _instance: Transform;

  three!: RemoteThree;
  activeCamera!: Camera;
  controls: Map<string, TransformControls> = new Map();

  private visibility: Map<string, boolean> = new Map();
  private groups: string[] = [];

  clear(): void {
    for (const controls of this.controls.values()) {
      controls.detach();
      controls.dispose();
      controls.parent?.remove(controls);
    }
    this.controls = new Map();
    this.visibility = new Map();
  }

  add(name: string): TransformControls {
    let controls = this.controls.get(name);
    if (controls === undefined) {
      controls = new TransformControls(this.activeCamera, this.three.canvas!);
      controls.name = name;
      this.controls.set(name, controls);
      this.visibility.set(name, controls.visible);

      controls.addEventListener('mouseDown', () => {
        // @ts-ignore
        this.dispatchEvent({ type: TransformController.DRAG_START });
      });
      controls.addEventListener('mouseUp', () => {
        // @ts-ignore
        this.dispatchEvent({ type: TransformController.DRAG_END });
      });

      // Controls
      const groupName = `Controls: ${name}`;
      this.groups.push(groupName);
      this.three.addGroup({
        title: groupName,
        items: [
          {
            type: 'boolean',
            prop: 'enabled',
            value: controls.enabled,
          },
          {
            type: 'boolean',
            prop: 'visible',
            value: controls.visible,
          },
          {
            type: 'button',
            prop: 'Reset',
          },
          {
            type: 'option',
            prop: 'Mode',
            options: [
              {
                title: 'Translate',
                value: 'translate',
              },
              {
                title: 'Rotate',
                value: 'rotate',
              },
              {
                title: 'Scale',
                value: 'scale',
              },
            ],
          },
          {
            type: 'option',
            prop: 'Space',
            options: [
              {
                title: 'World',
                value: 'world',
              },
              {
                title: 'Local',
                value: 'local',
              },
            ],
          },
        ],
        onUpdate: (prop: string, value: any) => {
          if (controls === undefined) return;

          switch (prop) {
            case 'enabled':
              controls.enabled = value;
              break;
            case 'visible':
              controls.visible = value;
              break;
            case 'Reset':
              controls.reset();
              break;
            case 'Mode':
              controls.setMode(value);
              break;
            case 'Space':
              controls.setSpace(value);
              break;
          }
        },
      });
    }
    return controls;
  }

  get(name: string): TransformControls | undefined {
    return this.controls.get(name);
  }

  remove(name: string): boolean {
    const controls = this.get(name);
    if (controls === undefined) return false;
    controls.detach();
    controls.dispose();
    controls.parent?.remove(controls);
    this.controls.delete(name);
    return true;
  }

  enabled(value: boolean) {
    this.controls.forEach((controls: TransformControls) => {
      controls.enabled = value;
    });
  }

  updateCamera(camera: Camera): void {
    this.activeCamera = camera;
    this.controls.forEach((controls: TransformControls) => {
      controls.camera = camera;
    });
  }

  show() {
    this.controls.forEach((controls: TransformControls) => {
      const value = this.visibility.get(controls.name);
      if (value !== undefined) controls.visible = value;
    });
  }

  hide() {
    this.controls.forEach((controls: TransformControls) => {
      this.visibility.set(controls.name, controls.visible);
      controls.visible = false;
    });
  }

  public static get instance(): Transform {
    if (!Transform._instance) {
      Transform._instance = new Transform();
    }
    return Transform._instance;
  }
}
