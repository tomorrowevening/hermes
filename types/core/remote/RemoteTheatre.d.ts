import { IProject, IRafDriver, ISheet, ISheetObject } from '@theatre/core';
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData, DataUpdateCallback, VoidCallback } from '../types';
export default class RemoteTheatre extends BaseRemote {
    project: IProject | undefined;
    sheets: Map<string, ISheet>;
    sheetObjects: Map<string, ISheetObject>;
    sheetObjectCBs: Map<string, DataUpdateCallback>;
    sheetObjectUnsubscribe: Map<string, VoidCallback>;
    activeSheet: ISheet | undefined;
    studio: any;
    static rafDriver?: IRafDriver | undefined;
    dispose(): void;
    sheet(name: string): ISheet | undefined;
    playSheet(name: string, params?: any): void;
    pauseSheet(name: string): void;
    clearSheetObjects(sheetName: string): void;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: DataUpdateCallback): ISheetObject | undefined;
    unsubscribe(sheetObject: ISheetObject): undefined;
    handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    handleEditorApp(app: Application, theatre: RemoteTheatre): void;
}
