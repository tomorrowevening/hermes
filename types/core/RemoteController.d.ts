import Application from './Application';
import type { BroadcastData } from './types';
export type RemoteCallback = (app: Application, remote: any, msg: BroadcastData) => void;
interface RemoteCall {
    remote: any;
    callback: RemoteCallback;
}
export default class RemoteController {
    appHandlers: RemoteCall[];
    editorHandlers: RemoteCall[];
    private _app;
    private static _instance;
    handleAppBroadcast: (msg: BroadcastData) => void;
    handleEditorBroadcast: (msg: BroadcastData) => void;
    set app(app: Application);
    static get instance(): RemoteController;
}
export {};
