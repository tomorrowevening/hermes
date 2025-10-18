import { Camera, Color, ColorManagement, Curve, EventDispatcher, EventListener, RenderTargetOptions, Scene, WebGLRenderTarget } from 'three';
import BaseRemote from './BaseRemote';
import { BroadcastData, GroupCallback, GroupData } from '../types';
import { stripObject, stripScene } from '@/editor/sidePanel/utils';
import { clamp } from '@/utils/math';
import { dispose, ExportTexture, hierarchyUUID, resetThreeObjects } from '@/utils/three';

export enum ToolEvents {
  CUSTOM = 'ToolEvents::custom',
  // Components
  SELECT_DROPDOWN = 'ToolEvents::selectDropdown',
  DRAG_UPDATE = 'ToolEvents::dragUpdate',
  // SceneHierarchy
  ADD_SCENE = 'ToolEvents::addScene',
  REFRESH_SCENE = 'ToolEvents::refreshScene',
  REMOVE_SCENE = 'ToolEvents::removeScene',
  SET_SCENE = 'ToolEvents::setScene',
  SET_OBJECT = 'ToolEvents::setObject',
  CLEAR_OBJECT = 'ToolEvents::clearObject',
  // MultiView
  ADD_CAMERA = 'ToolEvents::addCamera',
  REMOVE_CAMERA = 'ToolEvents::removeCamera',
  // Custom
  ADD_GROUP = 'ToolEvents::addGroup',
  REMOVE_GROUP = 'ToolEvents::removeGroup',
  ADD_SPLINE = 'ToolEvents::addSpline',
  ADD_RENDERER = 'ToolEvents::addRenderer',
  UPDATE_RENDERER = 'ToolEvents::updateRenderer',
}

export type ToolEvent = {
  [key in ToolEvents]: { value?: unknown }
}

export default class RemoteThree extends BaseRemote implements EventDispatcher<ToolEvent> {
  name: string;
  canvas: HTMLCanvasElement | null = null; // Canvas or OffscreenCanvas
  inputElement: any = null; // reference this to receive events
  scene?: Scene = undefined;
  scenes: Map<string, Scene> = new Map();
  renderer?: any = undefined;
  renderTargets: Map<string, WebGLRenderTarget> = new Map();
  private renderTargetsResize: Map<string, boolean> = new Map();
  private groups = new Map<string, GroupCallback>();
  private _listeners: { [K in ToolEvents]?: EventListener<ToolEvent[K], K, this>[] } = {};

  constructor(name: string, debug = false, editor = false) {
    super('RemoteThree', debug, editor);
    this.name = name;
  }

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

  // Event Dispatching (used for editor only)

  addEventListener<T extends ToolEvents>(type: T, listener: EventListener<ToolEvent[T], T, this>): void {
    if (this._listeners === undefined ) this._listeners = {};
		const listeners = this._listeners;
		if (listeners[type] === undefined) {
			listeners[type] = [];
		}

		if (listeners[type].indexOf(listener) === -1) {
			listeners[type].push(listener);
		}
  }

  hasEventListener<T extends ToolEvents>(type: T, listener: EventListener<ToolEvent[T], T, this>): boolean {
    const listeners = this._listeners;
		if (listeners === undefined) return false;
		return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
  }

  removeEventListener<T extends ToolEvents>(type: T, listener: EventListener<ToolEvent[T], T, this>): void {
    const listeners = this._listeners;
		if (listeners === undefined) return;
		const listenerArray = listeners[type];
		if (listenerArray !== undefined) {
			const index = listenerArray.indexOf(listener);
			if (index !== -1) {
				listenerArray.splice(index, 1);
			}
		}
  }

  dispatchEvent<T extends ToolEvents>(event: ToolEvent[T] & { type: T }): void {
    const listeners = this._listeners;
		if ( listeners === undefined ) return;
		const listenerArray = listeners[event.type];
		if ( listenerArray !== undefined ) {
			const eventWithTarget = { ...event, target: this };

			// Make a copy, in case listeners are removed while iterating.
			const array = listenerArray.slice(0);
			for ( let i = 0, l = array.length; i < l; i ++ ) {
				array[i].call(this, eventWithTarget);
			}
		}
  }

  // Objects

  getObject(uuid: string) {
    if (!this.debug) return;
    if (this.renderer !== undefined) ExportTexture.renderer = this.renderer;
    this.send({
      event: 'getObject',
      target: 'app',
      data: uuid,
    });
  }

  setObject(value: any) {
    if (this.renderer !== undefined) ExportTexture.renderer = this.renderer;
    const stripped = stripObject(value);
    this.send({
      event: 'setObject',
      target: 'editor',
      data: stripped,
    });
  }

  requestMethod(uuid: string, key: string, value?: any, subitem?: string) {
    this.send({
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
    this.send({
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
    this.send({
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
    this.send({
      event: 'addGroup',
      target: 'editor',
      data: JSON.stringify(data),
    });
  }

  removeGroup(name: string) {
    if (this.groups.get(name) === undefined) return;

    this.groups.delete(name);
    this.send({
      event: 'removeGroup',
      target: 'editor',
      data: name,
    });
  }

  updateGroup(group: string, prop: string, value: any) {
    this.send({
      event: 'updateGroup',
      target: 'app',
      data: JSON.stringify({ group, prop, value }),
    });
  }

  addSpline(spline: Curve<any>) {
    setTimeout(() => {
      this.send({
        event: 'addSpline',
        target: 'editor',
        data: JSON.stringify(spline.toJSON()),
      });
    }, 1);
  }

  // Renderer

  setRenderer(value: any, inputElement: any = null) {
    this.renderer = value;
    this.canvas = value.domElement;
    this.inputElement = inputElement !== null ? inputElement : this.canvas;

    if (!this.debug) return;

    const color = `#${value.getClearColor(new Color()).getHexString()}`;
    this.send({
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
        type: value.isWebGLRenderer ? 'WebGLRenderer' : 'WebGPURenderer',
      },
    });
  }

  updateRenderer(data: any) {
    this.send({
      event: 'updateRenderer',
      target: 'app',
      data,
    });
  }

  // Scenes

  addScene(value: Scene) {
    if (value === undefined) return;
    this.scenes.set(value.name, value);

    if (!this.debug) return;
    resetThreeObjects();
    hierarchyUUID(value);
    const stripped = stripScene(value);
    this.send({
      event: 'addScene',
      target: 'editor',
      data: stripped,
    });
  }

  refreshScene(value: string) {
    if (!this.debug) return;
    const scene = this.scenes.get(value);
    if (scene !== undefined) {
      const stripped = stripScene(scene);
      this.send({
        event: 'refreshScene',
        target: 'app',
        data: stripped,
      });
    }
  }

  removeScene(value: Scene) {
    if (value === undefined) return;
    this.scenes.delete(value.name);

    if (!this.debug) return;
    const stripped = stripScene(value);
    this.send({
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

    if (!this.debug) return;
    if (this.renderer !== undefined) ExportTexture.renderer = this.renderer;
    resetThreeObjects();
    hierarchyUUID(value);
    const stripped = stripScene(value);
    this.send({
      event: 'setScene',
      target: 'editor',
      data: stripped,
    });
  }

  // Cameras

  addCamera(camera: Camera) {
    if (!this.debug) return;
    const stripped = stripObject(camera);
    this.send({
      event: 'addCamera',
      target: 'editor',
      data: stripped,
    });
  }

  removeCamera(camera: Camera) {
    if (!this.debug) return;
    const stripped = stripObject(camera);
    this.send({
      event: 'removeCamera',
      target: 'editor',
      data: stripped,
    });
  }

  override handleApp(msg: BroadcastData): void {
    switch (msg.event) {
      case 'refreshScene':
        this.send({
          event: 'refreshScene',
          target: 'editor',
          data: stripScene(this.scenes.get(msg.data.name)!),
        });
        break;
      case 'updateRenderer':
        if (this.renderer) {
          // this.renderer.autoClear = msg.data.autoClear;
          this.renderer.autoClearColor = msg.data.autoClearColor;
          // this.renderer.autoClearDepth = msg.data.autoClearDepth;
          // this.renderer.autoClearStencil = msg.data.autoClearStencil;
          this.renderer.outputColorSpace = msg.data.outputColorSpace;
          this.renderer.localClippingEnabled = msg.data.localClippingEnabled;
          this.renderer.setClearColor(msg.data.clearColor, msg.data.clearAlpha);
          this.renderer.toneMapping = msg.data.toneMapping;
          this.renderer.toneMappingExposure = msg.data.toneMappingExposure;
          ColorManagement.enabled = msg.data.colorManagement;
        }
        break;
    }

    if (msg.event === 'updateGroup') {
      const groupData = JSON.parse(msg.data);
      const group = this.groups.get(groupData.group);
      group?.onUpdate(groupData.prop, groupData.value);
    }
  }

  override handleEditor(msg: BroadcastData): void {
    switch (msg.event) {
      case 'setObject':
        this.dispatchEvent({ type: ToolEvents.SET_OBJECT, value: msg.data });
        break;
      case 'addScene':
        this.dispatchEvent({ type: ToolEvents.ADD_SCENE, value: msg.data });
        break;
      case 'refreshScene':
        this.dispatchEvent({ type: ToolEvents.REFRESH_SCENE, value: msg.data });
        break;
      case 'removeScene':
        this.dispatchEvent({ type: ToolEvents.REMOVE_SCENE, value: msg.data });
        break;
      case 'setScene':
        this.dispatchEvent({ type: ToolEvents.SET_SCENE, value: msg.data });
        break;
      case 'addCamera':
        this.dispatchEvent({ type: ToolEvents.ADD_CAMERA, value: msg.data });
        break;
      case 'removeCamera':
        this.dispatchEvent({ type: ToolEvents.REMOVE_CAMERA, value: msg.data });
        break;
      case 'addGroup':
        this.dispatchEvent({ type: ToolEvents.ADD_GROUP, value: msg.data });
        break;
      case 'removeGroup':
        this.dispatchEvent({ type: ToolEvents.REMOVE_GROUP, value: msg.data });
        break;
      case 'addSpline':
        this.dispatchEvent({ type: ToolEvents.ADD_SPLINE, value: msg.data });
        break;
      case 'addRenderer':
        this.dispatchEvent({ type: ToolEvents.ADD_RENDERER, value: msg.data });
    }
  }

  // Renderer

  addRT(name: string, resize = true, params?: RenderTargetOptions) {
    const rt = new WebGLRenderTarget(32, 32, params);
    rt.texture.name = name;
    this.renderTargets.set(name, rt);
    this.renderTargetsResize.set(name, resize);
  }

  removeRT(name: string) {
    this.renderTargets.delete(name);
    this.renderTargetsResize.delete(name);
  }

  resize(width: number, height: number) {
    const dpr = this.dpr;
    this.renderTargets.forEach((renderTarget: WebGLRenderTarget, key: string) => {
      const resize = this.renderTargetsResize.get(key);
      if (resize) renderTarget.setSize(width * dpr, height * dpr);
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
