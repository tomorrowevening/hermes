import Application from '../Application';
import BaseRemote from './BaseRemote';
export default class RemoteComponents extends BaseRemote {
    constructor(app: Application);
    selectDropdown(dropdown: string, value: any): void;
    updateDropdown(dropdown: string, list: string[]): void;
}
