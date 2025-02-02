import { Application, RemoteCall } from '../Application';
import type { BroadcastData } from '../types';

/**
 * Base class for remote-related extensions
 */
export default class BaseRemote {
  app: Application;

  constructor(app: Application) {
    this.app = app;
    this.app.appHandlers.push({ remote: this, callback: this.handleApp.bind(this) });
    this.app.editorHandlers.push({ remote: this, callback: this.handleEditor.bind(this) });
  }

  dispose() {
    const index = this.app.appHandlers.findIndex((rc: RemoteCall) => rc.remote === this);
    if (index > -1) {
      this.app.appHandlers.splice(index, 1);
      this.app.editorHandlers.splice(index, 1);
    }
  }

  handleApp(msg: BroadcastData) {
    //
  }

  handleEditor(msg: BroadcastData) {
    //
  }
}
