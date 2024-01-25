// Libs
import { getProject } from '@theatre/core';
import type { IProject, IProjectConfig, ISheet, ISheetObject } from '@theatre/core';
import studio from '@theatre/studio';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { isColor } from '@/editor/utils';
import { BroadcastData, EditorEvent, noop } from '../types';
import type { DataUpdateCallback, VoidCallback } from '../types';
// import { ToolEvents, debugDispatcher } from '@/editor/global';

export default class RemoteTheatre extends BaseRemote {
  project: IProject | undefined;
  sheets: Map<string, ISheet> = new Map();
  sheetObjects: Map<string, ISheetObject> = new Map();
  sheetObjectCBs: Map<string, DataUpdateCallback> = new Map();
  sheetObjectUnsubscribe: Map<string, VoidCallback> = new Map();

  init(projectName: string, projectConfig?: IProjectConfig | undefined) {
    this.project = getProject(projectName, projectConfig);
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
}

let activeSheet: ISheet | undefined;

export function HandleAppRemoteTheatre(app: Application, msg: BroadcastData) {
  app.components.forEach((component: any) => {
    if (component instanceof RemoteTheatre) {
      let value = undefined;
      const theatre = component as RemoteTheatre;
      switch (msg.event) {
        case 'setSheet':
          // @ts-ignore
          value = theatre.sheets.get(msg.data.sheet);
          if (value !== undefined) {
            activeSheet = value as ISheet;
            studio.setSelection([value]);
          }
          break;
        case 'setSheetObject':
          // @ts-ignore
          value = theatre.sheetObjects.get(`${msg.data.sheet}_${msg.data.key}`);
          if (value !== undefined) {
            studio.setSelection([value]);
          }
          break;
        case 'updateSheetObject':
          // @ts-ignore
          value = theatre.sheetObjectCBs.get(msg.data.sheetObject);
          // @ts-ignore
          if (value !== undefined) value(msg.data.values);
          break;
        case 'updateTimeline':
          // @ts-ignore
          value = theatre.sheets.get(msg.data.sheet);
          if (activeSheet !== undefined) {
            (activeSheet as ISheet).sequence.position = msg.data.position;
          }
          break;
      }
    }
  });
}

export function HandleEditorRemoteTheatre(app: Application) {
  if (app.editor) {
    let theatre: RemoteTheatre;
    app.components.forEach((component: any) => {
      if (component instanceof RemoteTheatre) {
        theatre = component;
      }
    });
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
            activeSheet = theatre.sheets.get(obj.address.sheetId);
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
        app.send({ event: type, target: 'app', data: data });
      });
    });

    // Timeline
    let position = 0;
    const onRafUpdate = () => {
      if (
        activeSheet !== undefined &&
        position !== activeSheet.sequence.position
      ) {
        position = activeSheet.sequence.position;
        const t = activeSheet as ISheet;
        app.send({
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
