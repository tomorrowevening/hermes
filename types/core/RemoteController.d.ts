import Application from './Application';
import type { BroadcastData } from './types';
export type RemoteCallback = (app: Application, remote: any, msg: BroadcastData) => void;
interface RemoteCall {
    remote: any;
    callback: RemoteCallback;
}
export default function RemoteController(app: Application, appHandlers: RemoteCall[], editorHandlers: RemoteCall[]): void;
export {};
