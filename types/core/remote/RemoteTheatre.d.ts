import type { IProject, IProjectConfig, ISheet, ISheetObject } from '@theatre/core';
import Application from '../Application';
import RemoteBase from './BaseRemote';
import type { noop, TheatreUpdateCallback } from '../types';
export default class RemoteTheatre extends RemoteBase {
    project: IProject | undefined;
    sheets: Map<string, ISheet>;
    sheetObjects: Map<string, ISheetObject>;
    sheetObjectCBs: Map<string, TheatreUpdateCallback>;
    sheetObjectUnsubscribe: Map<string, noop>;
    constructor(app: Application, projectName: string, projectConfig?: IProjectConfig | undefined);
    dispose(): void;
    sheet(name: string): ISheet | undefined;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: TheatreUpdateCallback): ISheetObject | undefined;
    unsubscribe(sheet: ISheetObject): undefined;
}
