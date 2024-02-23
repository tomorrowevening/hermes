import BaseRemote from './BaseRemote';
import { BroadcastData } from '../types';
export default class RemoteComponents extends BaseRemote {
    selectDropdown(dropdown: string, value: any): void;
    updateDropdown(dropdown: string, list: string[]): void;
    handleApp(msg: BroadcastData): void;
}
