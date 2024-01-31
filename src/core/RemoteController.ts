// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import type { BroadcastData } from './types';
import BaseRemote from './remote/BaseRemote';
import RemoteComponents, { HandleAppRemoteComponents } from './remote/RemoteComponents';
import RemoteTheatre, { HandleAppRemoteTheatre, HandleEditorRemoteTheatre, UpdateRemoteTheatre } from './remote/RemoteTheatre';
import RemoteThree, { HandleAppRemoteThree, HandleEditorRemoteThree } from './remote/RemoteThree';
import RemoteTweakpane, { HandleAppRemoteTweakpane } from './remote/RemoteTweakpane';

export default function RemoteController(app: Application) {
  const appHandlers: any[] = [];
  const editorHandlers: any[] = [];

  // Correct handlers based on the App's components
  app.components.forEach((value: BaseRemote) => {
    if (value instanceof RemoteComponents) {
      appHandlers.push(HandleAppRemoteComponents);
    } else if (value instanceof RemoteTheatre) {
      appHandlers.push(HandleAppRemoteTheatre);
      editorHandlers.push(HandleEditorRemoteTheatre);
      UpdateRemoteTheatre(app);
    }  else if (value instanceof RemoteThree) {
      appHandlers.push(HandleAppRemoteThree);
      editorHandlers.push(HandleEditorRemoteThree);
    } else if (value instanceof RemoteTweakpane) {
      appHandlers.push(HandleAppRemoteTweakpane);
    }
  });

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

  app.listen = (msg: BroadcastData) => {
    if (app.editor) {
      handleEditorBroadcast(msg);
    } else {
      handleAppBroadcast(msg);
    }
  };
}
