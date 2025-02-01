import { Application } from '../Application';
import { BroadcastData } from '../types';
import BaseRemote from './BaseRemote';
export default class RemoteComponents extends BaseRemote {
    selectDropdown(dropdown: string, value: any): void;
    updateDropdown(dropdown: string, list: string[]): void;
    handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void;
}
