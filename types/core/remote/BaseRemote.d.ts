import Application from '../Application';
import type { BroadcastData } from '../types';
export default class BaseRemote {
    app: Application;
    constructor(app: Application);
    dispose(): void;
    handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void;
    handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData): void;
}
