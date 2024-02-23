// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { BroadcastData } from './types';
import BaseRemote from './remote/BaseRemote';

export default function RemoteController(app: Application) {
  const appHandlers: any[] = [];
  const editorHandlers: any[] = [];

  // Correct handlers based on the App's components
  app.components.forEach((value: BaseRemote) => {
    appHandlers.push(value.handleApp);
    editorHandlers.push(value.handleEditor);
    value.handleEditorApp();
  });

  function handleAppBroadcast(msg: BroadcastData) {
    appHandlers.forEach((handler: any) => handler(app, msg));
    switch (msg.event) {
      case 'custom':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  function handleEditorBroadcast(msg: BroadcastData) {
    editorHandlers.forEach((handler: any) => handler(app, msg));
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
