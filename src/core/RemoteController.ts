// Core
import Application from './Application';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import type { BroadcastData } from './types';
import BaseRemote from './remote/BaseRemote';

export type RemoteCallback = (app: Application, remote: any, msg: BroadcastData) => void;
interface RemoteCall {
  remote: any;
  callback: RemoteCallback;
}

export default class RemoteController {
  appHandlers: RemoteCall[] = [];
  editorHandlers: RemoteCall[] = [];
  private _app!: Application;
  private static _instance: RemoteController;

  handleAppBroadcast = (msg: BroadcastData) => {
    this.appHandlers.forEach((remoteCall: RemoteCall) => {
      remoteCall.callback(this._app, remoteCall.remote, msg);
    });

    switch (msg.event) {
      case 'custom':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  };

  handleEditorBroadcast = (msg: BroadcastData) => {
    this.editorHandlers.forEach((remoteCall: RemoteCall) => {
      remoteCall.callback(this._app, remoteCall.remote, msg);
    });

    switch (msg.event) {
      case 'custom':
        // @ts-ignore
        debugDispatcher.dispatchEvent({ type: ToolEvents.CUSTOM, value: msg.data });
        break;
    }
  };

  set app(app: Application) {
    this._app = app;
    app.listen = (msg: BroadcastData) => {
      if (msg.target === 'editor') {
        this.handleEditorBroadcast(msg);
      } else {
        this.handleAppBroadcast(msg);
      }
    };
  }

  // Singleton

  static get instance(): RemoteController {
    if (RemoteController._instance === undefined) {
      RemoteController._instance = new RemoteController();
    }
    return RemoteController._instance;
  }
}
