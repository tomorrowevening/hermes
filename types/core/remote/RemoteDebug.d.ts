import { Pane } from 'tweakpane';
import Application from '../Application';
import RemoteBase from './BaseRemote';
import type { DataUpdateCallback } from '../types';
export default class RemoteDebug extends RemoteBase {
    appTab: any;
    systemTab: any;
    utilsTab: any;
    bindCBs: Map<string, DataUpdateCallback>;
    protected pane?: Pane | undefined;
    protected timesBound: number;
    constructor(app: Application);
    dispose(): void;
    addFolder(name: string, params?: any, parent?: any): any;
    bind(name: string, obj: any, params: any, parent?: any): void;
    updateBind(id: string, data: any): void;
}
