import BaseRemote from './remote/BaseRemote';
import { ApplicationMode, BroadcastCallback, BroadcastData } from './types';
export default class Application {
    components: Map<string, any>;
    listen?: BroadcastCallback;
    protected _debugEnabled: boolean;
    protected _broadcastChannel?: BroadcastChannel | undefined;
    protected _webSocket?: WebSocket | undefined;
    protected _mode: ApplicationMode;
    protected _connected: boolean;
    protected _useBC: boolean;
    constructor(id: string, debugEnabled: boolean, useBC?: boolean);
    addComponent(name: string, component: BaseRemote): void;
    dispose(): void;
    send(data: BroadcastData): void;
    private messageHandler;
    private openHandler;
    private closeHandler;
    get connected(): boolean;
    get debugEnabled(): boolean;
    get mode(): ApplicationMode;
    get isApp(): boolean;
    get editor(): boolean;
    set editor(value: boolean);
}
