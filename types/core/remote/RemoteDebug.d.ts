import { Pane } from 'tweakpane';
import Application from '../Application';
import RemoteBase from './BaseRemote';
export default class RemoteDebug extends RemoteBase {
    pane?: Pane | undefined;
    appTab: any;
    systemTab: any;
    utilsTab: any;
    constructor(app: Application);
    dispose(): void;
}
