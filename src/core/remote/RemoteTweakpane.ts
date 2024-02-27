// Libs
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { DataUpdateCallback, VoidCallback, noop } from '../types';

export default class RemoteTweakpane extends BaseRemote {
  bindCBs: Map<string, DataUpdateCallback>;
  buttonCBs: Map<string, VoidCallback>;

  protected pane?: Pane | undefined = undefined;
  protected appCallbacks = 0;
  protected editorCallbacks = 0;
  protected inspectorFolder: any = undefined;

  constructor(app: Application) {
    super(app);
    this.bindCBs = new Map();
    this.buttonCBs = new Map();

    if (app.editor) this.createGUI();
  }

  protected createGUI() {
    this.pane = new Pane({ title: 'GUI' });
    this.pane.registerPlugin(EssentialsPlugin);
  }

  override dispose(): void {
    this.bindCBs.clear();
    this.buttonCBs.clear();
    this.appCallbacks = 0;
    this.editorCallbacks = 0;

    if (this.app.editor) {
      this.pane?.dispose();
      this.pane = undefined;
    }
  }

  addFolder(name: string, params: any = undefined, parent: any = undefined) {
    if (this.app.editor) {
      if (this.pane === undefined) this.createGUI();

      const container = parent !== undefined ? parent : this.pane;
      return container.addFolder({
        title: name,
        ...params,
      });
    } else {
      this.app.send({
        event: 'addFolder',
        target: 'app',
        data: {
          name,
          params,
          parent
        }
      });
    }
  }

  get bindID(): string {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`;
  }

  // Binding

  bind(obj: any, name: string, params: any, parent: any = undefined) {
    const bindID = this.bindID;
    const callback = params.onChange !== undefined ? params.onChange : noop;
    this.bindCBs.set(bindID, callback);

    if (this.app.editor) {
      if (this.pane === undefined) this.createGUI();

      const container = parent !== undefined ? parent : this.pane;
      container
        .addBinding(obj, name, params)
        .on('change', (evt: any) => {
          this.app.send({
            event: 'updateBind',
            target: 'app',
            data: {
              id: bindID,
              value: evt.value,
            }
          });
        });
      this.editorCallbacks++;
    } else {
      this.app.send({
        event: 'bindObject',
        target: 'app',
        data: {
          id: bindID,
          name,
          params,
          parent
        }
      });
      this.appCallbacks++;
    }
  }

  triggerBind(id: string, data: any) {
    const cb = this.bindCBs.get(id);
    if (cb !== undefined) cb(data);
    else console.warn(`No callback for: ${id}`, data);
  }

  // Buttons

  button(name: string, callback: VoidCallback, parent: any = undefined) {
    const bindID = this.bindID;
    this.buttonCBs.set(bindID, callback);

    if (this.app.editor) {
      if (this.pane === undefined) this.createGUI();

      const container = parent !== undefined ? parent : this.pane;
      container
        .addButton({ title: name })
        .on('click', () => {
          this.app.send({
            event: 'clickButton',
            target: 'app',
            data: {
              id: bindID,
            }
          });
        });
      this.editorCallbacks++;
    } else {
      this.app.send({
        event: 'addButton',
        target: 'app',
        data: {
          id: bindID,
          name,
          callback,
          parent
        }
      });
      this.appCallbacks++;
    }
  }

  triggerButton(id: string) {
    const cb = this.buttonCBs.get(id);
    if (cb !== undefined) cb();
  }

  // Inspector

  createInspector() {
    this.inspectorFolder = this.addFolder('Inspector', this.pane);
  }

  clearInspector() {
    const total = this.inspectorFolder.children.length - 1;
    for (let i = total; i > -1; --i) {
      this.inspectorFolder.remove(this.inspectorFolder.children[i]);
    }
  }
}
