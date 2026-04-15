import type { BroadcastData } from '../types';
export default class BaseRemote {
    name: string;
    readonly debug: any;
    readonly editor: any;
    protected broadcastChannel?: BroadcastChannel;
    private onMessageHandler?;
    constructor(name: string, debug?: boolean, editor?: boolean);
    dispose(): void;
    protected send(data: BroadcastData): void;
    protected messageHandler(evt: MessageEvent): void;
    protected handleApp(msg: BroadcastData): void;
    protected handleEditor(msg: BroadcastData): void;
}
