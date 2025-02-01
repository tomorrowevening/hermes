import { Camera, Color, ColorManagement, Curve, RenderTargetOptions, Scene, WebGLRenderTarget, WebGLRenderer } from 'three';
import { Application, ToolEvents } from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData, GroupCallback, GroupData } from '../types';
import { stripObject, stripScene } from '@/editor/sidePanel/utils';
import { clamp } from '@/utils/math';
import { dispose, ExportTexture, hierarchyUUID, resetThreeObjects } from '@/utils/three';

export default class RemoteThree extends BaseRemote {
  canvas: HTMLCanvasElement | null = null; // Canvas or OffscreenCanvas
  inputElement: any = null; // reference this to receive events
  scene?: Scene = undefined;
  scenes: Map<string, Scene> = new Map();
  renderer?: WebGLRenderer = undefined;
  renderTargets: Map<string, WebGLRenderTarget> = new Map();

  private groups = new Map<string, GroupCallback>();

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
    if (this.renderer !== undefined) ExportTexture.renderer = this.renderer;
    this.app.send({
      event: 'getObject',
      target: 'app',
      data: uuid,
    });
  }

  setObject(value: any) {
    if (this.renderer !== undefined) ExportTexture.renderer = this.renderer;
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

  // Groups

  addGroup(data: GroupData) {
    if (this.groups.get(data.title) !== undefined) return;

    this.groups.set(data.title, {
      title: data.title,
      onUpdate: data.onUpdate,
    });
    this.app.send({
      event: 'addGroup',
      target: 'editor',
      data: JSON.stringify(data),
    });
  }

  removeGroup(name: string) {
    if (this.groups.get(name) === undefined) return;

    this.groups.delete(name);
    this.app.send({
      event: 'removeGroup',
      target: 'editor',
      data: name,
    });
  }

  updateGroup(group: string, prop: string, value: any) {
    this.app.send({
      event: 'updateGroup',
      target: 'app',
      data: JSON.stringify({ group, prop, value }),
    });
  }

  removeAllGroups() {
    this.groups.forEach((value: GroupCallback) => {
      const name = value.title;
      this.groups.delete(name);
      this.app.send({
        event: 'removeGroup',
        target: 'editor',
        data: name,
      });
    });
    this.groups.clear();
  }

  addSpline(spline: Curve<any>) {
    setTimeout(() => {
      this.app.send({
        event: 'addSpline',
        target: 'editor',
        data: JSON.stringify(spline.toJSON()),
      });
    }, 1);
  }

  // Renderer

  setRenderer(value: WebGLRenderer, inputElement: any = null) {
    this.renderer = value;
    this.canvas = value.domElement;
    this.inputElement = inputElement !== null ? inputElement : this.canvas;

    if (!this.app.debugEnabled) return;
    const color = `#${value.getClearColor(new Color()).getHexString()}`;
    this.app.send({
      event: 'addRenderer',
      target: 'editor',
      data: {
        autoClear: value.autoClear,
        autoClearColor: value.autoClearColor,
        autoClearDepth: value.autoClearDepth,
        autoClearStencil: value.autoClearStencil,
        outputColorSpace: value.outputColorSpace,
        localClippingEnabled: value.localClippingEnabled,
        clearColor: color,
        clearAlpha: value.getClearAlpha(),
        colorManagement: ColorManagement.enabled,
        toneMapping: value.toneMapping,
        toneMappingExposure: value.toneMappingExposure,
      },
    });
  }

  updateRenderer(data: any) {
    this.app.send({
      event: 'updateRenderer',
      target: 'app',
      data,
    });
  }

  // Scenes

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

  refreshScene(value: string) {
    if (!this.app.debugEnabled) return;
    const scene = this.scenes.get(value);
    if (scene !== undefined) {
      const stripped = stripScene(scene);
      this.app.send({
        event: 'refreshScene',
        target: 'app',
        data: stripped,
      });
    }
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
    this.scenes.forEach((value: Scene, key: string) => {
      if (uuid.search(key) > -1) scene = value;
    });
    return scene;
  }

  setScene(value: Scene) {
    if (value === undefined) return;
    this.scene = value;

    if (!this.app.debugEnabled) return;
    if (this.renderer !== undefined) ExportTexture.renderer = this.renderer;
    resetThreeObjects();
    hierarchyUUID(value);
    const stripped = stripScene(value);
    this.app.send({
      event: 'setScene',
      target: 'editor',
      data: stripped,
    });
  }

  // Cameras

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
    const three = remote as RemoteThree;
    switch (msg.event) {
      case 'getObject':
        app.dispatchEvent({ type: ToolEvents.GET_OBJECT, value: msg.data });
        break;
      case 'updateObject':
        app.dispatchEvent({ type: ToolEvents.UPDATE_OBJECT, value: msg.data });
        break;
      case 'createTexture':
        app.dispatchEvent({ type: ToolEvents.CREATE_TEXTURE, value: msg.data });
        break;
      case 'requestMethod':
        app.dispatchEvent({ type: ToolEvents.REQUEST_METHOD, value: msg.data });
        break;
      case 'refreshScene':
        app.send({
          event: 'refreshScene',
          target: 'editor',
          data: stripScene(three.scenes.get(msg.data.name)!),
        });
        break;
      case 'updateRenderer':
        if (three.renderer) {
          three.renderer.autoClear = msg.data.autoClear;
          three.renderer.autoClearColor = msg.data.autoClearColor;
          three.renderer.autoClearDepth = msg.data.autoClearDepth;
          three.renderer.autoClearStencil = msg.data.autoClearStencil;
          three.renderer.outputColorSpace = msg.data.outputColorSpace;
          three.renderer.localClippingEnabled = msg.data.localClippingEnabled;
          three.renderer.setClearColor(msg.data.clearColor, msg.data.clearAlpha);
          three.renderer.toneMapping = msg.data.toneMapping;
          three.renderer.toneMappingExposure = msg.data.toneMappingExposure;
          ColorManagement.enabled = msg.data.colorManagement;
        }
        break;
    }

    if (msg.event === 'updateGroup') {
      const groupData = JSON.parse(msg.data);
      const group = three.groups.get(groupData.group);
      group?.onUpdate(groupData.prop, groupData.value);
    }
  }

  override handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void {
    switch (msg.event) {
      case 'setObject':
        app.dispatchEvent({ type: ToolEvents.SET_OBJECT, value: msg.data });
        break;
      case 'addScene':
        app.dispatchEvent({ type: ToolEvents.ADD_SCENE, value: msg.data });
        break;
      case 'refreshScene':
        app.dispatchEvent({ type: ToolEvents.REFRESH_SCENE, value: msg.data });
        break;
      case 'removeScene':
        app.dispatchEvent({ type: ToolEvents.REMOVE_SCENE, value: msg.data });
        break;
      case 'setScene':
        app.dispatchEvent({ type: ToolEvents.SET_SCENE, value: msg.data });
        break;
      case 'addCamera':
        app.dispatchEvent({ type: ToolEvents.ADD_CAMERA, value: msg.data });
        break;
      case 'removeCamera':
        app.dispatchEvent({ type: ToolEvents.REMOVE_CAMERA, value: msg.data });
        break;
      case 'addGroup':
        app.dispatchEvent({ type: ToolEvents.ADD_GROUP, value: msg.data });
        break;
      case 'removeGroup':
        app.dispatchEvent({ type: ToolEvents.REMOVE_GROUP, value: msg.data });
        break;
      case 'addSpline':
        app.dispatchEvent({ type: ToolEvents.ADD_SPLINE, value: msg.data });
        break;
      case 'addRenderer':
        app.dispatchEvent({ type: ToolEvents.ADD_RENDERER, value: msg.data });
    }
  }

  // Renderer

  addRT(name: string, params?: RenderTargetOptions) {
    const rt = new WebGLRenderTarget(32, 32, params);
    rt.texture.name = name;
    this.renderTargets.set(name, rt);
  }

  resize(width: number, height: number) {
    const dpr = this.dpr;
    this.renderTargets.forEach((renderTarget: WebGLRenderTarget) => {
      renderTarget.setSize(width * dpr, height * dpr);
    });
    const update = !(this.renderer?.domElement instanceof OffscreenCanvas);
    this.renderer?.setSize(width, height, update);
  }

  set dpr(value: number) {
    this.renderer?.setPixelRatio(clamp(1, 2, value));
  }

  get dpr(): number {
    return this.renderer !== undefined ? this.renderer?.getPixelRatio() : 1;
  }

  get width(): number {
    return this.renderer !== undefined ? this.renderer.domElement.width / this.dpr : 0;
  }

  get height(): number {
    return this.renderer !== undefined ? this.renderer.domElement.height / this.dpr : 0;
  }
}
