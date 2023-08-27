// Libs
import type { IProjectConfig } from '@theatre/core'
// Core
import RemoteComponents from './remote/RemoteComponents'
import RemoteTheatre from './remote/RemoteTheatre'
import RemoteTweakpane from './remote/RemoteTweakpane'
import type { ApplicationMode, BroadcastCallback, BroadcastData } from './types'

export default class Application {
  components?: RemoteComponents
  debug?: RemoteTweakpane
  theatre?: RemoteTheatre

  // Protected
  protected mode: ApplicationMode = 'listener'
  protected channel?: BroadcastChannel | undefined = undefined

  constructor(name: string, debugEnabled: boolean, editorHashtag: string) {
    this.editor = debugEnabled && document.location.hash.search(editorHashtag) > -1
    if (debugEnabled) this.channel = new BroadcastChannel(name)
  }

  setupComponents() {
    this.components = new RemoteComponents(this)
  }

  setupGUI() {
    this.debug = new RemoteTweakpane(this)
  }

  setupTheatre(projectName: string, projectConfig?: IProjectConfig | undefined) {
    this.theatre = new RemoteTheatre(this, projectName, projectConfig)
  }

  dispose() {
    this.components?.dispose()
    this.debug?.dispose()
    this.theatre?.dispose()
  }

  // Remote

  send(data: BroadcastData) {
    if (this.mode === 'editor' && this.channel !== undefined) {
      this.channel.postMessage(data)
    }
  }

  listen(callback: BroadcastCallback) {
    if (this.mode === 'listener' && this.channel !== undefined) {
      this.channel.onmessage = (event: MessageEvent) => {
        callback(event.data)
      }
    }
  }

  // Getters / Setters

  get editor(): boolean {
    return this.mode === 'editor'
  }

  set editor(value: boolean) {
    if (value) {
      this.mode = 'editor'
      document.title += ' - Editor'
    }
  }
}
