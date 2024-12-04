// Libs
import { IProject, ISheet, ISheetObject } from '@theatre/core';
import { Vector3 } from 'three';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData, DataUpdateCallback, EditorEvent, VoidCallback, noop } from '../types';
// Utils
import { isColor } from '../../editor/utils';

type KeyframeData = {
  position: number
  value: number
  type: string
  handles: number[]
}

type KeyframeVector = {
  position: number
  x: number
  y: number
  z: number
}

// Cubic Bézier formula
function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t;
  return (
    u * u * u * p0 +
    3 * u * u * t * p1 +
    3 * u * t * t * p2 +
    t * t * t * p3
  );
}

function interpolateBezierValue(
  prevKeyframe: KeyframeData,
  nextKeyframe: KeyframeData,
  position: number
): number {
  if (prevKeyframe.type !== 'bezier' || prevKeyframe.handles.length !== 4) {
    throw new Error('Invalid keyframe data for Bézier interpolation.');
  }

  const [h1Y, h2Y] = prevKeyframe.handles;

  // Normalize the time within the segment
  const t = (position - prevKeyframe.position) / (nextKeyframe.position - prevKeyframe.position);

  return cubicBezier(
    t,
    prevKeyframe.value,
    prevKeyframe.value + h1Y,
    nextKeyframe.value + h2Y,
    nextKeyframe.value
  );
}

export default class RemoteTheatre extends BaseRemote {
  project: IProject | undefined;
  sheets: Map<string, ISheet> = new Map();
  sheetObjects: Map<string, ISheetObject> = new Map();
  sheetObjectCBs: Map<string, DataUpdateCallback> = new Map();
  sheetObjectUnsubscribe: Map<string, VoidCallback> = new Map();
  activeSheet: ISheet | undefined;
  studio: any = undefined;

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
    // Use referenced sheet
    let sheet = this.sheets.get(sheetID);
    if (sheet !== undefined) return sheet;

    // Create Sheet
    sheet = this.project?.sheet(name, instanceId);
    this.sheets.set(sheetID, sheet);
    return sheet;
  }

  playSheet(name: string, params?: any, instanceId?: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Play locally
      const rafParams = params !== undefined ? {...params} : {};
      this.sheet(name, instanceId)?.sequence.play(rafParams).then((complete: boolean) => resolve(complete));

      // Remotely
      this.app.send({
        event: 'playSheet',
        target: 'editor',
        data: {
          sheet: name,
          instance: instanceId,
          value: params,
        },
      });
    });
  }

  pauseSheet(name: string, instanceId?: string) {
    // Play locally
    this.sheet(name, instanceId)?.sequence.pause();

    // Remotely
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
    let objProps = props;
    if (obj !== undefined) {
      objProps = {...props, ...obj.value}, {reconfigure: true};
    }
    obj = sheet.object(key, objProps);

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

  getSheetObjectKeyframes(sheetName: string, sheetObject: string, prop: string): any[] {
    const sheet = this.sheet(sheetName);
    if (sheet === undefined) return [];

    const name = `${sheetName}_${sheetObject}`;
    const sheetObjects = this.sheetObjects.get(name);
    if (sheetObjects === undefined) return [];

    return sheet.sequence.__experimental_getKeyframes(sheetObjects.props[prop]);
  }

  getSheetObjectVectors(sheetName: string, sheetObject: string): KeyframeVector[] {
    const sheet = this.sheet(sheetName);
    if (sheet === undefined) return [];

    const name = `${sheetName}_${sheetObject}`;
    const sheetObjects = this.sheetObjects.get(name);
    if (sheetObjects === undefined) return [];

    const keyframes: KeyframeVector[] = [];
    const x = sheet.sequence.__experimental_getKeyframes(sheetObjects.props.x);
    const y = sheet.sequence.__experimental_getKeyframes(sheetObjects.props.y);
    const z = sheet.sequence.__experimental_getKeyframes(sheetObjects.props.z);

    // Create a Set of all unique positions
    const uniquePositions = new Set<number>();
    x.forEach((kf) => uniquePositions.add(kf.position));
    y.forEach((kf) => uniquePositions.add(kf.position));
    z.forEach((kf) => uniquePositions.add(kf.position));

    // Sort positions
    const sortedPositions = Array.from(uniquePositions).sort((a, b) => a - b);
    sortedPositions.forEach((position) => {
      const interpolateValue = (
        // keyframes: KeyframeData[],
        keyframes: any[],
        position: number
      ): number => {
        const prevKeyframe = keyframes.find((kf, i) => {
          return kf.position <= position && (keyframes[i + 1]?.position || Infinity) > position;
        });
  
        const nextKeyframe = keyframes.find((kf) => kf.position > position);
  
        if (!prevKeyframe) return nextKeyframe?.value || 0;
        if (!nextKeyframe || prevKeyframe.position === position) return prevKeyframe.value;
  
        if (prevKeyframe.type === 'bezier') {
          return interpolateBezierValue(prevKeyframe, nextKeyframe, position);
        }
  
        // Linear interpolation for non-bezier keyframes
        const t = (position - prevKeyframe.position) / (nextKeyframe.position - prevKeyframe.position);
        return prevKeyframe.value + t * (nextKeyframe.value - prevKeyframe.value);
      };
  
      keyframes.push({
        position,
        x: interpolateValue(x, position),
        y: interpolateValue(y, position),
        z: interpolateValue(z, position),
      });
    });
    return keyframes;
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
