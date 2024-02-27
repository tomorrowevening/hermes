import Application from '../Application';
export default class BaseRemote {
    app: Application;
    constructor(app: Application);
    dispose(): void;
}
