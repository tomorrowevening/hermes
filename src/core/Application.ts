import type { IProjectConfig } from '@theatre/core'
//
import RemoteDebug from './remote/RemoteDebug'
import RemoteTheatre from './remote/RemoteTheatre'
import type { ApplicationMode } from './types'
import type { BroadcastCallback, BroadcastData } from '../debug/remote/types'

export default class Application {
  debug?: RemoteDebug
  theatre?: RemoteTheatre

  // Protected
  protected mode: ApplicationMode = 'listener'
  protected channel?: BroadcastChannel | undefined = undefined

  constructor(debugEnabled: boolean, editorHashtag: string) {
    this.editor = debugEnabled && document.location.hash.search(editorHashtag) > -1
    if (debugEnabled) this.channel = new BroadcastChannel('theatre')
  }

  setupGUI() {
    this.debug = new RemoteDebug(this)
  }

  setupTheatre(projectName: string, projectConfig?: IProjectConfig | undefined) {
    this.theatre = new RemoteTheatre(this, projectName, projectConfig)
  }

  dispose() {
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
