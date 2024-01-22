import type { IProject, IProjectConfig, ISheet, ISheetObject } from '@theatre/core';
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { BroadcastData } from '../types';
import type { DataUpdateCallback, VoidCallback } from '../types';
export default class RemoteTheatre extends BaseRemote {
    project: IProject | undefined;
    sheets: Map<string, ISheet>;
    sheetObjects: Map<string, ISheetObject>;
    sheetObjectCBs: Map<string, DataUpdateCallback>;
    sheetObjectUnsubscribe: Map<string, VoidCallback>;
    constructor(app: Application, projectName: string, projectConfig?: IProjectConfig | undefined);
    dispose(): void;
    sheet(name: string): ISheet | undefined;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: DataUpdateCallback): ISheetObject | undefined;
    unsubscribe(sheet: ISheetObject): undefined;
}
export declare function HandleAppRemoteTheatre(app: Application, msg: BroadcastData): void;
export declare function HandleEditorRemoteTheatre(app: Application): void;
