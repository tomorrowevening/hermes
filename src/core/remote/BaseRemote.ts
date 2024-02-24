import Application from '../Application';
import { BroadcastData } from '../types';

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

  // Remote Controller

  // Receives App events
  handleApp(_: BroadcastData) {
    //
  }

  // Receives Editor events
  handleEditor(_: BroadcastData) {
    //
  }
}