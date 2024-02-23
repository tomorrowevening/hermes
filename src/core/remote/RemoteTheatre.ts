// Libs
import { createRafDriver, getProject } from '@theatre/core';
import { IProject, IProjectConfig, IRafDriver, ISheet, ISheetObject } from '@theatre/core';
import studio from '@theatre/studio';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { isColor } from '@/editor/utils';
import { BroadcastData, DataUpdateCallback, EditorEvent, VoidCallback, noop } from '../types';

let activeSheet: ISheet | undefined;
export default class RemoteTheatre extends BaseRemote {
  project: IProject | undefined;
  sheets: Map<string, ISheet> = new Map();
  sheetObjects: Map<string, ISheetObject> = new Map();
  sheetObjectCBs: Map<string, DataUpdateCallback> = new Map();
  sheetObjectUnsubscribe: Map<string, VoidCallback> = new Map();

  private static rafDriver: IRafDriver | null = null;

  init(projectName: string, projectConfig?: IProjectConfig | undefined): Promise<void> {
    this.project = getProject(projectName, projectConfig);
    return this.project.ready;
  }

  override dispose(): void {
    this.project = undefined;
    this.sheets = new Map();
    this.sheetObjects = new Map();
    this.sheetObjectCBs = new Map();
    this.sheetObjectUnsubscribe = new Map();
  }

  sheet(name: string): ISheet | undefined {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.');
      return undefined;
    }

    let sheet = this.sheets.get(name);
    if (sheet !== undefined) return sheet;

    sheet = this.project?.sheet(name);
    this.sheets.set(name, sheet);
    return sheet;
  }

  playSheet(name: string, params?: any) {
    this.sheet(name)?.sequence.play(params);

    this.app.send({
      event: 'playSheet',
      target: 'editor',
      data: {
        sheet: name,
        value: params,
      },
    });
  }

  pauseSheet(name: string) {
    this.sheet(name)?.sequence.pause();

    this.app.send({
      event: 'pauseSheet',
      target: 'editor',
      data: {
        sheet: name,
      },
    });
  }

  clearSheetObjects(sheetName: string) {
    this.sheetObjects.forEach((value: ISheetObject, key: string) => {
      const sameSheet = key.search(`${sheetName}_`) > -1;
      if (sameSheet) this.unsubscribe(value);
    });
  }

  sheetObject(
    sheetName: string,
    key: string,
    props: any,
    onUpdate?: DataUpdateCallback,
  ): ISheetObject | undefined {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.');
      return undefined;
    }
    const sheet = this.sheet(sheetName);
    if (sheet === undefined) return undefined;

    const objName = `${sheetName}_${key}`;
    let obj = this.sheetObjects.get(objName);
    if (obj !== undefined) {
      obj = sheet.object(key, {...props, ...obj.value}, {reconfigure: true});
    } else {
      obj = sheet.object(key, props);
    }

    this.sheetObjects.set(objName, obj);
    this.sheetObjectCBs.set(objName, onUpdate !== undefined ? onUpdate : noop);

    const unsubscribe = obj.onValuesChange((values: any) => {
      if (this.app.editor) {
        for (const i in values) {
          const value = values[i];
          if (typeof value === 'object') {
            if (isColor(value)) {
              values[i] = {
                r: value.r,
                g: value.g,
                b: value.b,
                a: value.a,
              };
            }
          }
        }
        this.app.send({
          event: 'updateSheetObject',
          target: 'app',
          data: {
            sheet: sheetName,
            sheetObject: objName,
            values: values,
          },
        });
      }

      const callback = this.sheetObjectCBs.get(objName);
      if (callback !== undefined) callback(values);
    });
    this.sheetObjectUnsubscribe.set(objName, unsubscribe);

    return obj;
  }

  unsubscribe(sheetObject: ISheetObject) {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.');
      return undefined;
    }

    const sheetName = sheetObject.address.sheetId;
    const sheetObjectName = sheetObject.address.objectKey;
    const sheet = this.sheets.get(sheetName);
    sheet?.detachObject(sheetObjectName);
    
    const id = `${sheetName}_${sheetObjectName}`;
    const unsubscribe = this.sheetObjectUnsubscribe.get(id);
    if (unsubscribe !== undefined) {
      this.sheetObjects.delete(id);
      this.sheetObjectCBs.delete(id);
      this.sheetObjectUnsubscribe.delete(id);
      unsubscribe();
    }
  }

  // Remote Controller

  // Receives App events
  override handleApp(msg: BroadcastData) {
    let value: any = undefined;
    switch (msg.event) {
      case 'setSheet':
        value = this.sheets.get(msg.data.sheet);
        if (value !== undefined) {
          activeSheet = value as ISheet;
          studio.setSelection([value]);
        }
        break;
      case 'setSheetObject':
        value = this.sheetObjects.get(`${msg.data.sheet}_${msg.data.key}`);
        if (value !== undefined) {
          studio.setSelection([value]);
        }
        break;
      case 'updateSheetObject':
        value = this.sheets.get(msg.data.sheet); // pause current animation
        if (value !== undefined) value.sequence.pause();
        value = this.sheetObjectCBs.get(msg.data.sheetObject);
        if (value !== undefined) value(msg.data.values);
        break;
      case 'updateTimeline':
        value = this.sheets.get(msg.data.sheet);
        if (activeSheet !== undefined) {
          activeSheet.sequence.position = msg.data.position;
        }
        break;
    }
  }

  // Receives Editor events
  override handleEditor(msg: BroadcastData) {
    if (this.app.editor) {
      switch (msg.event) {
        case 'playSheet':
          this.sheet(msg.data.sheet)?.sequence.play(msg.data.value);
          break;
        case 'pauseSheet':
          this.sheet(msg.data.sheet)?.sequence.pause();
          break;
      }
    }
  }

  // Runs only in-editor
  override handleEditorApp() {
    if (this.app.editor) {
      studio.ui.restore();
      studio.onSelectionChange((value: any[]) => {
        if (value.length < 1) return;
  
        value.forEach((obj: any) => {
          let id = obj.address.sheetId;
          let type: EditorEvent = 'setSheet';
          let data = {};
          switch (obj.type) {
            case 'Theatre_Sheet_PublicAPI':
              type = 'setSheet';
              data = {
                sheet: obj.address.sheetId,
              };
              activeSheet = this.sheets.get(obj.address.sheetId);
              break;
  
            case 'Theatre_SheetObject_PublicAPI':
              type = 'setSheetObject';
              id += `_${obj.address.objectKey}`;
              data = {
                id: id,
                sheet: obj.address.sheetId,
                key: obj.address.objectKey,
              };
              break;
          }
          this.app.send({ event: type, target: 'app', data: data });
        });
      });
  
      // Timeline
      let position = 0;
      const onRafUpdate = () => {
        // RemoteTheatre.getRafDriver().tick(performance.now());
  
        if (
          activeSheet !== undefined &&
          position !== activeSheet.sequence.position
        ) {
          position = activeSheet.sequence.position;
          const t = activeSheet as ISheet;
          this.app.send({
            event: 'updateTimeline',
            target: 'app',
            data: {
              position: position,
              sheet: t.address.sheetId,
            },
          });
        }
      };
      const onRaf = () => {
        onRafUpdate();
        requestAnimationFrame(onRaf);
      };
      onRafUpdate(); // Initial position
      onRaf();
    } else {
      studio.ui.hide();
    }
  }

  public static getRafDriver(): IRafDriver {
    if (!RemoteTheatre.rafDriver) {
      RemoteTheatre.rafDriver = createRafDriver();
    }
    return RemoteTheatre.rafDriver;
  }
}
