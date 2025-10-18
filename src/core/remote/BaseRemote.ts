import type { BroadcastData } from '../types';

/**
 * Base class for remote-related extensions
 */
export default class BaseRemote {
  name: string;
  protected _debug = false;
  protected _editor = false;
  protected broadcastChannel?: BroadcastChannel;

  constructor(name: string, debug = false, editor = false) {
    this.name = name;
    this._debug = debug;
    this._editor = editor;

    if (!debug) return;
    this.broadcastChannel = new BroadcastChannel(name);
    this.broadcastChannel.addEventListener('message', this.messageHandler);
  }

  dispose() {
    this.broadcastChannel?.removeEventListener('message', this.messageHandler);
    this.broadcastChannel?.close();
  }

  get debug(): boolean {
    return this._debug;
  }

  get editor(): boolean {
    return this._editor;
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
