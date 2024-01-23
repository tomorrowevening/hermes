// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import type { BroadcastData } from './types';
import { HandleAppRemoteComponents } from './remote/RemoteComponents';
import { HandleAppRemoteTheatre, HandleEditorRemoteTheatre } from './remote/RemoteTheatre';
import { HandleAppRemoteThree, HandleEditorRemoteThree } from './remote/RemoteThree';
import { HandleAppRemoteTweakpane } from './remote/RemoteTweakpane';

interface RemoteHandlers {
  components?: boolean
  theatre?: boolean
  three?: boolean
  tweakpane?: boolean
}

export default function RemoteController(app: Application, handlers: RemoteHandlers) {
  const appHandlers: any[] = [];
  const editorHandlers: any[] = [];

  if (handlers.components) {
    appHandlers.push(HandleAppRemoteComponents);
  }

  if (handlers.theatre) {
    appHandlers.push(HandleAppRemoteTheatre);
    HandleEditorRemoteTheatre(app);
  }

  if (handlers.three) {
    appHandlers.push(HandleAppRemoteThree);
    editorHandlers.push(HandleEditorRemoteThree);
  }
  if (handlers.tweakpane) {
    appHandlers.push(HandleAppRemoteTweakpane);
  }

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
