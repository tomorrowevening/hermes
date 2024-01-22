// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import type { BroadcastData } from './types';

export default function RemoteController(app: Application, appHandlers: any[], editorHandlers: any[]) {
  function handleAppBroadcast(msg: BroadcastData) {
    appHandlers.forEach((handler: any) => handler(app, msg));
    switch (msg.event) {
      case 'custom':
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  function handleEditorBroadcast(msg: BroadcastData) {
    editorHandlers.forEach((handler: any) => handler(app, msg));
    switch (msg.event) {
      case 'custom':
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  // Begin app

  app.listen((msg: BroadcastData) => {
    if (app.editor) {
      handleEditorBroadcast(msg);
    } else {
      handleAppBroadcast(msg);
    }
  });
}
