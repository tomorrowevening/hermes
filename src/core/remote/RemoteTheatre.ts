// Libs
import { IProject, IRafDriver, ISheet, ISheetObject } from '@theatre/core';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData, DataUpdateCallback, EditorEvent, VoidCallback, noop } from '../types';
// Utils
import { isColor } from '../../editor/utils';

export default class RemoteTheatre extends BaseRemote {
  project: IProject | undefined;
  sheets: Map<string, ISheet> = new Map();
  sheetObjects: Map<string, ISheetObject> = new Map();
  sheetObjectCBs: Map<string, DataUpdateCallback> = new Map();
  sheetObjectUnsubscribe: Map<string, VoidCallback> = new Map();
  activeSheet: ISheet | undefined;
  studio: any = undefined;

  public static rafDriver?: IRafDriver | undefined = undefined;

  override dispose(): void {
    this.project = undefined;
    this.sheets = new Map();
    this.sheetObjects = new Map();
    this.sheetObjectCBs = new Map();
    this.sheetObjectUnsubscribe = new Map();
  }

  getSheetInstance(name: string, instanceId?: string): string {
    return instanceId !== undefined ? `${name}-${instanceId}` : name;
  }

  sheet(name: string, instanceId?: string): ISheet | undefined {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.');
      return undefined;
    }

    const sheetID = this.getSheetInstance(name, instanceId);
    let sheet = this.sheets.get(sheetID);
    if (sheet !== undefined) return sheet;

    sheet = this.project?.sheet(name, instanceId);
    this.sheets.set(sheetID, sheet);
    return sheet;
  }

  playSheet(name: string, params?: any, instanceId?: string): Promise<boolean> {
    this.app.send({
      event: 'playSheet',
      target: 'editor',
      data: {
        sheet: name,
        instance: instanceId,
        value: params,
      },
    });

    return new Promise((resolve) => {
      const rafParams = params !== undefined ? {...params} : {};
      rafParams.rafDriver = RemoteTheatre.rafDriver;
      this.sheet(name, instanceId)?.sequence.play(rafParams).then((complete: boolean) => resolve(complete));
    });
  }

  pauseSheet(name: string, instanceId?: string) {
    this.sheet(name, instanceId)?.sequence.pause();

    this.app.send({
      event: 'pauseSheet',
      target: 'editor',
      data: {
        sheet: name,
        instance: instanceId,
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
    instanceId?: string,
  ): ISheetObject | undefined {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.');
      return undefined;
    }
    const sheet = this.sheet(sheetName, instanceId);
    if (sheet === undefined) return undefined;

    const sheetID = this.getSheetInstance(sheetName, instanceId);
    const objName = `${sheetID}_${key}`;
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

  override handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void {
    const theatre = remote as RemoteTheatre;
    let value: any = undefined;
    switch (msg.event) {
      case 'setSheet':
        value = theatre.sheets.get(msg.data.sheet);
        if (value !== undefined) {
          theatre.activeSheet = value as ISheet;
          this.studio?.setSelection([value]);
        }
        break;
      case 'setSheetObject':
        value = theatre.sheetObjects.get(`${msg.data.sheet}_${msg.data.key}`);
        if (value !== undefined) {
          this.studio?.setSelection([value]);
        }
        break;
      case 'updateSheetObject':
        value = theatre.sheets.get(msg.data.sheet); // pause current animation
        if (value !== undefined) value.sequence.pause();
        value = theatre.sheetObjectCBs.get(msg.data.sheetObject);
        if (value !== undefined) value(msg.data.values);
        break;
      case 'updateTimeline':
        value = theatre.sheets.get(msg.data.sheet);
        if (theatre.activeSheet !== undefined) {
          theatre.activeSheet.sequence.position = msg.data.position;
        }
        break;
    }
  }

  override handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void {
    if (app.editor) {
      const theatre = remote as RemoteTheatre;
      switch (msg.event) {
        case 'playSheet':
          theatre.sheet(msg.data.sheet, msg.data.instance)?.sequence.play(msg.data.value);
          break;
        case 'pauseSheet':
          theatre.sheet(msg.data.sheet, msg.data.instance)?.sequence.pause();
          break;
      }
    }
  }

  handleEditorApp(app: Application, theatre: RemoteTheatre) {
    if (app.editor) {
      this.studio?.ui.restore();
      this.studio?.onSelectionChange((value: any[]) => {
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
              theatre.activeSheet = theatre.sheets.get(obj.address.sheetId);
              break;
  
            case 'Theatre_SheetObject_PublicAPI':
              type = 'setSheetObject';
              id += `_${obj.address.objectKey}`;
              data = {
                id: id,
                sheet: obj.address.sheetId,
                key: obj.address.objectKey,
              };
              theatre.activeSheet = theatre.sheets.get(obj.address.sheetId);
              break;
          }
          app.send({ event: type, target: 'app', data: data });
        });
      });
  
      // Timeline
      let position = -1;
      const onRafUpdate = () => {
        if (
          theatre.activeSheet !== undefined &&
          position !== theatre.activeSheet.sequence.position
        ) {
          position = theatre.activeSheet.sequence.position;
          const t = theatre.activeSheet as ISheet;
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
      this.studio?.ui.hide();
    }
  }
}
