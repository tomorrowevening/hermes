// Core
import Application, { ToolEvents } from '../Application';
import { BroadcastData } from '../types';
import BaseRemote from './BaseRemote';

/**
 * Communicates between custom React Components
 */
export default class RemoteComponents extends BaseRemote {
  selectDropdown(dropdown: string, value: any) {
    this.app.send({
      event: 'selectComponent',
      target: 'app',
      data: {
        dropdown,
        value
      }
    });
  }

  updateDropdown(dropdown: string, list: string[]) {
    this.app.send({
      event: 'draggableListUpdate',
      target: 'app',
      data: {
        dropdown,
        value: list
      }
    });
  }

  override handleApp(app: Application, remote: BaseRemote, msg: BroadcastData): void {
    switch (msg.event) {
      case 'selectComponent':
        app.dispatchEvent({ type: ToolEvents.SELECT_DROPDOWN, value: msg.data });
        break;
      case 'draggableListUpdate':
        app.dispatchEvent({ type: ToolEvents.DRAG_UPDATE, value: msg.data });
        break;
    }
  }
}
