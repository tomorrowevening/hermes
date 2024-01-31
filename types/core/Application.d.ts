import BaseRemote from './remote/BaseRemote';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';
export default class Application {
    connection?: WebSocket | undefined;
    components: Map<string, any>;
    debugEnabled: boolean;
    listen?: BroadcastCallback;
    protected _mode: ApplicationMode;
    protected _connected: boolean;
    constructor(url: string, debugEnabled: boolean, editorHashtag?: string);
    addComponent(name: string, component: BaseRemote): void;
    dispose(): void;
    send(data: BroadcastData): void;
    private messageHandler;
    private openHandler;
    private closeHandler;
    get mode(): ApplicationMode;
    get isApp(): boolean;
    get editor(): boolean;
    set editor(value: boolean);
}
