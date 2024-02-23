import Application from '../Application';
import { BroadcastData } from '../types';
export default class BaseRemote {
    protected app: Application;
    constructor(app: Application);
    dispose(): void;
    handleApp(_: BroadcastData): void;
    handleEditor(_: BroadcastData): void;
    handleEditorApp(): void;
}
