import { IProject, IRafDriver, ISheet, ISheetObject } from '@theatre/core';
import BaseRemote from './BaseRemote';
import { DataUpdateCallback, VoidCallback } from '../types';
export default class RemoteTheatre extends BaseRemote {
    project: IProject | undefined;
    sheets: Map<string, ISheet>;
    sheetObjects: Map<string, ISheetObject>;
    sheetObjectCBs: Map<string, DataUpdateCallback>;
    sheetObjectUnsubscribe: Map<string, VoidCallback>;
    activeSheet: ISheet | undefined;
    static rafDriver?: IRafDriver | undefined;
    dispose(): void;
    sheet(name: string): ISheet | undefined;
    playSheet(name: string, params?: any): void;
    pauseSheet(name: string): void;
    clearSheetObjects(sheetName: string): void;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: DataUpdateCallback): ISheetObject | undefined;
    unsubscribe(sheetObject: ISheetObject): undefined;
}
