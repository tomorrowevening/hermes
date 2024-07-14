import { Camera, RenderTargetOptions, Scene, WebGLRenderTarget, WebGLRenderer } from 'three';
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData } from '../types';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { stripObject, stripScene } from '@/editor/sidePanel/utils';
import { clamp, dispose, hierarchyUUID, resetThreeObjects } from '@/editor/utils';

export default class RemoteThree extends BaseRemote {
  scene?: Scene = undefined;
  scenes: Map<string, Scene> = new Map();
  renderer?: WebGLRenderer = undefined;
  renderTargets: Map<string, WebGLRenderTarget> = new Map();

  override dispose(): void {
    this.scenes.forEach((scene: Scene) => {
      dispose(scene);
    });
    this.scenes.clear();
    if (this.scene) dispose(this.scene);

    this.renderTargets.forEach((value: WebGLRenderTarget) => {
      value.dispose();
    });
    this.renderTargets.clear();
    this.renderer?.dispose();
  }

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

  addScene(value: Scene) {
    if (value === undefined) return;
    this.scenes.set(value.name, value);

    if (!this.app.debugEnabled) return;
    resetThreeObjects();
    hierarchyUUID(value);
    const stripped = stripScene(value);
    this.app.send({
      event: 'addScene',
      target: 'editor',
      data: stripped,
    });
  }

  removeScene(value: Scene) {
    if (value === undefined) return;
    this.scenes.delete(value.name);

    if (!this.app.debugEnabled) return;
    const stripped = stripScene(value);
    this.app.send({
      event: 'removeScene',
      target: 'editor',
      data: stripped,
    });
  }

  removeAllScenes() {
    this.scenes.forEach((scene: Scene) => this.removeScene(scene));
  }

  getScene(uuid: string): Scene | null {
    let scene: Scene | null = null;
    this.scenes.forEach((value: Scene) => {
      if (uuid.search(value.uuid) > -1) {
        scene = value;
      }
    });
    return scene;
  }

  setScene(value: Scene) {
    if (value === undefined) return;
    this.scene = value;

    if (!this.app.debugEnabled) return;
    resetThreeObjects();
    hierarchyUUID(value);
    const stripped = stripScene(value);
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
      case 'addScene':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.ADD_SCENE, value: msg.data });
        break;
      case 'removeScene':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.REMOVE_SCENE, value: msg.data });
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

  private rendererWidth = 300;
  private rendererHeight = 150;

  addRT(name: string, params?: RenderTargetOptions) {
    const rt = new WebGLRenderTarget(32, 32, params);
    rt.texture.name = name;
    this.renderTargets.set(name, rt);
  }

  resize(width: number, height: number) {
    const dpr = this.dpr;
    this.rendererWidth = width;
    this.rendererHeight = height;
    this.renderTargets.forEach((renderTarget: WebGLRenderTarget) => {
      renderTarget.setSize(width * dpr, height * dpr);
    });
    this.renderer?.setSize(width, height);
  }

  set dpr(value: number) {
    this.renderer?.setPixelRatio(clamp(1, 2, value));
  }

  get dpr(): number {
    return this.renderer !== undefined ? this.renderer?.getPixelRatio() : 1;
  }

  get width(): number {
    return this.rendererWidth;
  }

  get height(): number {
    return this.rendererHeight;
  }

  get canvas(): HTMLCanvasElement | null {
    return this.renderer !== undefined ? this.renderer?.domElement : null;
  }
}
