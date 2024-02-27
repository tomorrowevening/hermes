import Application from '../Application';
import RemoteComponents from './RemoteComponents';
import type { BroadcastData } from '../types';
import { ToolEvents, debugDispatcher } from '@/editor/global';

// Remote Controller

export function componentsApp(app: Application, remote: RemoteComponents, msg: BroadcastData) {
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
