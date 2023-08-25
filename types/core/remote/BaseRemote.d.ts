import Application from '../Application';
export default class BaseRemote {
    protected app: Application;
    constructor(app: Application);
    dispose(): void;
}
