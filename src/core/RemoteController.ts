// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import type { BroadcastData } from './types';

export type RemoteCallback = (app: Application, remote: any, msg: BroadcastData) => void;
interface RemoteCall {
  remote: any;
  callback: RemoteCallback;
}

export default function RemoteController(app: Application, appHandlers: RemoteCall[], editorHandlers: RemoteCall[]) {
   function handleAppBroadcast(msg: BroadcastData) {
    appHandlers.forEach((remoteCall: RemoteCall) => {
      remoteCall.callback(app, remoteCall.remote, msg);
    });

    switch (msg.event) {
      case 'custom':
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  function handleEditorBroadcast(msg: BroadcastData) {
    editorHandlers.forEach((remoteCall: RemoteCall) => {
      remoteCall.callback(app, remoteCall.remote, msg);
    });

    switch (msg.event) {
      case 'custom':
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  }

  app.listen = (msg: BroadcastData) => {
    if (msg.target === 'editor') {
      handleEditorBroadcast(msg);
    } else {
      handleAppBroadcast(msg);
    }
  };
}
