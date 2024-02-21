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
    init(projectName: string, projectConfig?: IProjectConfig | undefined): Promise<void>;
    dispose(): void;
    sheet(name: string): ISheet | undefined;
    playSheet(name: string, params?: any): void;
    pauseSheet(name: string): void;
    clearSheetObjects(sheetName: string): void;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: DataUpdateCallback): ISheetObject | undefined;
    unsubscribe(sheetObject: ISheetObject): undefined;
}
export declare function HandleAppRemoteTheatre(app: Application, msg: BroadcastData): void;
export declare function UpdateRemoteTheatre(app: Application): void;
export declare function HandleEditorRemoteTheatre(app: Application, msg: BroadcastData): void;
