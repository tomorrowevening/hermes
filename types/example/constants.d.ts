import Application from '@/core/Application';
import RemoteComponents from '@/core/remote/RemoteComponents';
import RemoteTheatre from '@/core/remote/RemoteTheatre';
import RemoteThree from '@/core/remote/RemoteThree';
import RemoteTweakpane from '@/core/remote/RemoteTweakpane';
export declare const IS_DEV = true;
declare class CustomApp extends Application {
    constructor(name: string, debugEnabled: boolean, editorHashtag: string);
    get debug(): RemoteTweakpane;
    get debugComponents(): RemoteComponents;
    get theatre(): RemoteTheatre;
    get three(): RemoteThree;
}
export declare const app: CustomApp;
export {};
