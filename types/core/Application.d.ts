import type { IProject, IProjectConfig, ISheet, ISheetObject } from '@theatre/core';
import type { ApplicationMode, noop, TheatreUpdateCallback } from './types';
import type { BroadcastCallback, BroadcastData } from '../debug/remote/types';
export default class Application {
    protected mode: ApplicationMode;
    protected channel?: BroadcastChannel | undefined;
    project: IProject;
    sheets: Map<string, ISheet>;
    sheetObjects: Map<string, ISheetObject>;
    sheetObjectCBs: Map<string, TheatreUpdateCallback>;
    sheetObjectUnsubscribe: Map<string, noop>;
    constructor(debugEnabled: boolean, editorHashtag: string);
    setProject(projectName: string, projectConfig?: IProjectConfig | undefined): void;
    get editor(): boolean;
    set editor(value: boolean);
    send(data: BroadcastData): void;
    listen(callback: BroadcastCallback): void;
    sheet(name: string): ISheet;
    sheetObject(sheetName: string, key: string, props: any, onUpdate?: TheatreUpdateCallback): ISheetObject | undefined;
    unsubscribe(sheet: ISheetObject): void;
}
