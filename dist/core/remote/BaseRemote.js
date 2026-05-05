class n {
  name;
  debug;
  editor;
  broadcastChannel;
  onMessageHandler;
  constructor(e, s = !1, a = !1) {
    this.name = e, this.debug = s, this.editor = a, s && (this.broadcastChannel = new BroadcastChannel(e), this.onMessageHandler = this.messageHandler.bind(this), this.broadcastChannel.addEventListener("message", this.onMessageHandler));
  }
  dispose() {
    this.broadcastChannel?.removeEventListener("message", this.onMessageHandler), this.broadcastChannel?.close();
  }
  // Broadcast
  send(e) {
    if (this.editor && e.target === "app" || !this.editor && e.target === "editor")
      try {
        this.broadcastChannel?.postMessage(e);
      } catch (a) {
        console.log("Hermes - Error sending message:"), console.log(a), console.log(e);
      }
  }
  messageHandler(e) {
    const s = e.data;
    s.target === "app" ? this.handleApp(s) : this.handleEditor(s);
  }
  handleApp(e) {
  }
  handleEditor(e) {
  }
}
export {
  n as default
};
