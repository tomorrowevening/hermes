// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { BroadcastData } from './types';
import BaseRemote from './remote/BaseRemote';

export default function RemoteController(app: Application) {
  function handleAppBroadcast(msg: BroadcastData) {
    app.components.forEach((value: BaseRemote) => {
      value.handleApp(msg);
    });

    switch (msg.event) {
      case 'custom':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  function handleEditorBroadcast(msg: BroadcastData) {
    app.components.forEach((value: BaseRemote) => {
      value.handleEditor(msg);
    });

    switch (msg.event) {
      case 'custom':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  // Begin app

  app.listen = (msg: BroadcastData) => {
    if (msg.target === 'editor') {
      handleEditorBroadcast(msg);
    } else {
      handleAppBroadcast(msg);
    }
  };
}
