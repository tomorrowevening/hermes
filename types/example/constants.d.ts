import Application from '@/core/Application';
import RemoteComponents from '@/core/remote/RemoteComponents';
import RemoteTheatre from '@/core/remote/RemoteTheatre';
import RemoteTweakpane from '@/core/remote/RemoteTweakpane';
export declare const IS_DEV: boolean;
declare class CustomApp extends Application {
    constructor(name: string, debugEnabled: boolean, editorHashtag: string);
    get debug(): RemoteTweakpane;
    get debugComponents(): RemoteComponents;
    get theatre(): RemoteTheatre;
}
export declare const app: CustomApp;
export {};
