// Core
import { ToolEvents, debugDispatcher } from '@/editor/global';
import BaseRemote from './BaseRemote';
import { BroadcastData } from '../types';

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

  // Remote Controller

  // Receives App events
  override handleApp(msg: BroadcastData) {
    switch (msg.event) {
      case 'selectComponent':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.SELECT_DROPDOWN, value: msg.data });
        break;
      case 'draggableListUpdate':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.DRAG_UPDATE, value: msg.data });
        break;
    }
  }
}
