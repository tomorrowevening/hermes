import Application from '../Application';
export declare const noop: () => void;
export default class BaseRemote {
    protected app: Application;
    constructor(app: Application);
    dispose(): void;
}
