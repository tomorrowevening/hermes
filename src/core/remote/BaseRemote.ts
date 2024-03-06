import Application from '../Application';
import type { BroadcastData } from '../types';

/**
 * Base class for remote-related extensions
 */
export default class BaseRemote {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  dispose() {
    //
  }

  handleApp(app: Application, remote: BaseRemote, msg: BroadcastData) {
    //
  }

  handleEditor(app: Application, remote: BaseRemote, msg: BroadcastData) {
    //
  }
}
