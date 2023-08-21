import Application from '../Application';
export declare const noop: () => void;
export default class RemoteBase {
    protected app: Application;
    constructor(app: Application);
    dispose(): void;
}
