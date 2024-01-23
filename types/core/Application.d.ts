import BaseRemote from './remote/BaseRemote';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';
export default class Application {
    channel?: BroadcastChannel | undefined;
    components: Map<string, any>;
    protected _mode: ApplicationMode;
    constructor(name: string, debugEnabled: boolean, editorHashtag?: string);
    addComponent(name: string, component: BaseRemote): void;
    dispose(): void;
    send(data: BroadcastData): void;
    listen(callback: BroadcastCallback): void;
    get mode(): ApplicationMode;
    get isApp(): boolean;
    get editor(): boolean;
    set editor(value: boolean);
}
