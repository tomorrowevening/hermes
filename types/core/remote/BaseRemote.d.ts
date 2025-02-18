import { Application } from '../Application';
import type { BroadcastData } from '../types';
export default class BaseRemote {
    app: Application;
    constructor(app: Application);
    dispose(): void;
    handleApp(msg: BroadcastData): void;
    handleEditor(msg: BroadcastData): void;
}
