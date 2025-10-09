import { Application } from '../Application';
import type { BroadcastData } from '../types';

/**
 * Base class for remote-related extensions
 */
export default class BaseRemote {
  app: Application;
  protected debug = false;
  protected editor = false;
  protected broadcastChannel?: BroadcastChannel;

  constructor(app: Application, debug = false, editor = false) {
    this.app = app;
    this.debug = debug;
    this.editor = editor;

    if (!debug) return;
    this.broadcastChannel = new BroadcastChannel('Hermes');
    this.broadcastChannel.addEventListener('message', this.messageHandler);
  }

  dispose() {
    this.broadcastChannel?.removeEventListener('message', this.messageHandler);
  }

  // Broadcast

  protected send(data: BroadcastData) {
    const send = (this.editor && data.target === 'app') || (!this.editor && data.target === 'editor');
    if (send) this.broadcastChannel?.postMessage(data);
  }

  protected messageHandler = (evt: MessageEvent) => {
    const data: BroadcastData = evt.data;
    if (data.target === 'app') {
      this.handleApp(data);
    } else {
      this.handleEditor(data);
    }
  };

  protected handleApp(msg: BroadcastData) {
    //
  }

  protected handleEditor(msg: BroadcastData) {
    //
  }
}
