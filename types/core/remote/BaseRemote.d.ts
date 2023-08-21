import Application from '../Application';
export default class RemoteBase {
    protected app: Application;
    constructor(app: Application);
    dispose(): void;
}
