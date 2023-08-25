import type { IProjectConfig } from '@theatre/core';
import RemoteComponents from './remote/RemoteComponents';
import RemoteTheatre from './remote/RemoteTheatre';
import RemoteTweakpane from './remote/RemoteTweakpane';
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types';
export default class Application {
    components?: RemoteComponents;
    debug?: RemoteTweakpane;
    theatre?: RemoteTheatre;
    protected mode: ApplicationMode;
    protected channel?: BroadcastChannel | undefined;
    constructor(debugEnabled: boolean, editorHashtag: string);
    setupComponents(): void;
    setupGUI(): void;
    setupTheatre(projectName: string, projectConfig?: IProjectConfig | undefined): void;
    dispose(): void;
    send(data: BroadcastData): void;
    listen(callback: BroadcastCallback): void;
    get editor(): boolean;
    set editor(value: boolean);
}
