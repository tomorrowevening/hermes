import type { IProjectConfig } from '@theatre/core';
import RemoteDebug from './remote/RemoteDebug';
import RemoteTheatre from './remote/RemoteTheatre';
import type { ApplicationMode } from './types';
import type { BroadcastCallback, BroadcastData } from '../debug/remote/types';
export default class Application {
    debug?: RemoteDebug;
    theatre?: RemoteTheatre;
    protected mode: ApplicationMode;
    protected channel?: BroadcastChannel | undefined;
    constructor(debugEnabled: boolean, editorHashtag: string);
    setupGUI(): void;
    setupTheatre(projectName: string, projectConfig?: IProjectConfig | undefined): void;
    dispose(): void;
    send(data: BroadcastData): void;
    listen(callback: BroadcastCallback): void;
    get editor(): boolean;
    set editor(value: boolean);
}
