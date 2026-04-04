import type { BroadcastData } from '../types';
export default class BaseRemote {
    name: string;
    protected _debug: boolean;
    protected _editor: boolean;
    protected broadcastChannel?: BroadcastChannel;
    constructor(name: string, debug?: boolean, editor?: boolean);
    dispose(): void;
    get debug(): boolean;
    get editor(): boolean;
    protected send(data: BroadcastData): void;
    protected messageHandler: (evt: MessageEvent) => void;
    protected handleApp(msg: BroadcastData): void;
    protected handleEditor(msg: BroadcastData): void;
}
