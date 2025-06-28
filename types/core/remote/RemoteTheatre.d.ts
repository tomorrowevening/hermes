import { IProject, ISheet, ISheetObject } from '@theatre/core';
import BaseRemote from './BaseRemote';
import { BroadcastData, DataUpdateCallback, VoidCallback } from '../types';
import { Application } from '../Application';
type KeyframeVector = {
    position: number;
    x: number;
    y: number;
    z: number;
};
export default class RemoteTheatre extends BaseRemote {
    project: IProject | undefined;
    sheets: Map<string, ISheet>;
    sheetObjects: Map<string, ISheetObject>;
    sheetObjectCBs: Map<string, DataUpdateCallback>;
    sheetObjectUnsubscribe: Map<string, VoidCallback>;
    activeSheet: ISheet | undefined;
    studio: any;
    constructor(app: Application);
    dispose(): void;
    getSheetInstance(name: string, instanceId?: string): string;
    sheet(name: string, instanceId?: string): ISheet | undefined;
    playSheet(name: string, params?: any, instanceId?: string): Promise<boolean>;
    pauseSheet(name: string, instanceId?: string): void;
    clearSheetObjects(sheetName: string): void;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: DataUpdateCallback, instanceId?: string): ISheetObject | undefined;
    getSheetObjectKeyframes(sheetName: string, sheetObject: string, prop: string): any[];
    getSheetObjectVectors(sheetName: string, sheetObject: string): KeyframeVector[];
    unsubscribe(sheetObject: ISheetObject): undefined;
    handleApp(msg: BroadcastData): void;
    handleEditor(msg: BroadcastData): void;
    handleEditorApp(): void;
}
export {};
