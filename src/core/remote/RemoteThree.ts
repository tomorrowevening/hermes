import { Camera, Scene, WebGLRenderer } from 'three';
import BaseRemote from './BaseRemote';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { stripObject, stripScene } from '@/editor/sidePanel/utils';
import { clamp, hierarchyUUID, resetThreeObjects } from '@/editor/utils';
import Application from '../Application';
import { BroadcastData } from '../types';

export default class RemoteThree extends BaseRemote {
  scene?: Scene = undefined;
  renderer?: WebGLRenderer = undefined;

  getObject(uuid: string) {
    if (!this.app.debugEnabled) return;
    this.app.send({
      event: 'getObject',
      target: 'app',
      data: uuid,
    });
  }

  setObject(value: any) {
    const stripped = stripObject(value);
    this.app.send({
      event: 'setObject',
      target: 'editor',
      data: stripped,
    });
  }

  requestMethod(uuid: string, key: string, value?: any, subitem?: string) {
    this.app.send({
      event: 'requestMethod',
      target: 'app',
      data: {
        uuid,
        key,
        value,
        subitem,
      },
    });
  }

  updateObject(uuid: string, key: string, value: any) {
    this.app.send({
      event: 'updateObject',
      target: 'app',
      data: {
        uuid,
        key,
        value
      },
    });
  }

  createTexture(uuid: string, key: string, value: any) {
    this.app.send({
      event: 'createTexture',
      target: 'app',
      data: {
        uuid,
        key,
        value
      },
    });
  }

  setScene(value: Scene) {
    if (value === undefined) return;
    this.scene = value;

    if (!this.app.debugEnabled) return;
    resetThreeObjects();
    hierarchyUUID(this.scene);
    const stripped = stripScene(this.scene);
    this.app.send({
      event: 'setScene',
      target: 'editor',
      data: stripped,
    });
  }

  addCamera(camera: Camera) {
    if (!this.app.debugEnabled) return;
    const stripped = stripObject(camera);
    this.app.send({
      event: 'addCamera',
      target: 'editor',
      data: stripped,
    });
  }

  removeCamera(camera: Camera) {
    if (!this.app.debugEnabled) return;
    const stripped = stripObject(camera);
    this.app.send({
      event: 'removeCamera',
      target: 'editor',
      data: stripped,
    });
  }
  
  override handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void {
    switch (msg.event) {
      case 'getObject':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.GET_OBJECT, value: msg.data });
        break;
      case 'updateObject':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.UPDATE_OBJECT, value: msg.data });
        break;
      case 'createTexture':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.CREATE_TEXTURE, value: msg.data });
        break;
      case 'requestMethod':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.REQUEST_METHOD, value: msg.data });
        break;
    }
  }
  
  override handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void {
    switch (msg.event) {
      case 'setObject':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.SET_OBJECT, value: msg.data });
        break;
      case 'setScene':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.SET_SCENE, value: msg.data });
        break;
      case 'addCamera':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.ADD_CAMERA, value: msg.data });
        break;
      case 'removeCamera':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.REMOVE_CAMERA, value: msg.data });
        break;
    }
  }

  // Renderer

  resize(width: number, height: number) {
    this.renderer?.setSize(width, height);
  }

  set dpr(value: number) {
    this.renderer?.setPixelRatio(clamp(1, 2, value));
  }

  get dpr(): number {
    return this.renderer !== undefined ? this.renderer?.getPixelRatio() : 1;
  }

  get width(): number {
    return this.renderer !== undefined ? this.renderer?.domElement.width / this.dpr : 0;
  }

  get height(): number {
    return this.renderer !== undefined ? this.renderer?.domElement.height / this.dpr : 0;
  }

  get canvas(): HTMLCanvasElement | null {
    return this.renderer !== undefined ? this.renderer?.domElement : null;
  }
}
