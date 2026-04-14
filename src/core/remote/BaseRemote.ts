import type { BroadcastData } from '../types';

/**
 * Base class for remote-related extensions
 */
export default class BaseRemote {
  name: string;
  readonly debug;
  readonly editor;
  protected broadcastChannel?: BroadcastChannel;
  private onMessageHandler?: any;

  constructor(name: string, debug = false, editor = false) {
    this.name = name;
    this.debug = debug;
    this.editor = editor;

    if (!debug) return;
    this.broadcastChannel = new BroadcastChannel(name);
    this.onMessageHandler = this.messageHandler.bind(this);
    this.broadcastChannel.addEventListener('message', this.onMessageHandler);
  }

  dispose() {
    this.broadcastChannel?.removeEventListener('message', this.onMessageHandler);
    this.broadcastChannel?.close();
  }

  // Broadcast

  protected send(data: BroadcastData) {
    const send = (this.editor && data.target === 'app') || (!this.editor && data.target === 'editor');
    if (send) {
      try {
        this.broadcastChannel?.postMessage(data);
      } catch (err: any) {
        console.log('Hermes - Error sending message:');
        console.log(err);
        console.log(data);
      }
    }
  }

  protected messageHandler(evt: MessageEvent) {
    const data: BroadcastData = evt.data;
    if (data.target === 'app') {
      this.handleApp(data);
    } else {
      this.handleEditor(data);
    }
  }

  protected handleApp(msg: BroadcastData) {
    //
  }

  protected handleEditor(msg: BroadcastData) {
    //
  }
}
