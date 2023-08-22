import { Pane } from 'tweakpane';
import Application from '../Application';
import BaseRemote from './BaseRemote';
import type { DataUpdateCallback, VoidCallback } from '../types';
export default class RemoteDebug extends BaseRemote {
    appTab: any;
    systemTab: any;
    utilsTab: any;
    bindCBs: Map<string, DataUpdateCallback>;
    buttonCBs: Map<string, VoidCallback>;
    protected pane?: Pane | undefined;
    protected appCallbacks: number;
    protected editorCallbacks: number;
    constructor(app: Application);
    protected createGUI(): void;
    dispose(): void;
    addFolder(name: string, params?: any, parent?: any): any;
    get bindID(): string;
    bind(obj: any, name: string, params: any, parent?: any): void;
    triggerBind(id: string, data: any): void;
    button(name: string, callback: VoidCallback, parent?: any): void;
    triggerButton(id: string): void;
}
