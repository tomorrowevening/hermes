// Libs
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
//
import Application from '../Application'
import BaseRemote, { noop } from './BaseRemote'
import type { DataUpdateCallback, VoidCallback } from '../types'

export default class RemoteDebug extends BaseRemote {
  appTab: any = undefined
  systemTab: any = undefined
  utilsTab: any = undefined
  bindCBs: Map<string, DataUpdateCallback>
  buttonCBs: Map<string, VoidCallback>

  protected pane?: Pane | undefined = undefined
  protected appCallbacks = 0
  protected editorCallbacks = 0

  constructor(app: Application) {
    super(app)
    this.bindCBs = new Map()
    this.buttonCBs = new Map()

    if (app.editor) this.createGUI()
  }

  protected createGUI() {
    this.pane = new Pane({ title: 'GUI' })
    this.pane.registerPlugin(EssentialsPlugin)
    const guiElement = this.pane.element.parentElement as HTMLElement
    guiElement.style.left = '50%'
    guiElement.style.top = '0'
    guiElement.style.maxHeight = '100%'
    guiElement.style.overflowX = 'hidden'
    guiElement.style.overflowY = 'auto'
    guiElement.style.transform = 'translateX(-50%)'
    guiElement.style.width = '300px'
    guiElement.style.zIndex = '100'

    // @ts-ignore
    const tabs = this.pane.addTab({
      pages: [{ title: 'App' }, { title: 'System' }, { title: 'Tools' }],
    })
    this.appTab = tabs.pages[0]
    this.systemTab = tabs.pages[1]
    this.utilsTab = tabs.pages[2]
  }

  override dispose(): void {
    this.bindCBs.clear()
    this.buttonCBs.clear()
    this.appCallbacks = 0
    this.editorCallbacks = 0

    if (this.app.editor) {
      this.appTab?.dispose()
      this.systemTab?.dispose()
      this.utilsTab?.dispose()
      this.pane?.dispose()
      this.appTab = undefined
      this.systemTab = undefined
      this.utilsTab = undefined
      this.pane = undefined
    }
  }

  addFolder(name: string, params: any = undefined, parent: any = undefined) {
    if (this.app.editor) {
      if (this.pane === undefined) this.createGUI()

      const container = parent !== undefined ? parent : this.appTab
      return container.addFolder({
        title: name,
        ...params,
      })
    } else {
      this.app.send({
        event: 'addFolder',
        data: {
          name,
          params,
          parent
        }
      })
    }
  }

  get bindID(): string {
    return `debug_${Math.max(this.appCallbacks, this.editorCallbacks)}`
  }

  // Binding

  bind(obj: any, name: string, params: any, parent: any = undefined) {
    const bindID = this.bindID
    const callback = params.onChange !== undefined ? params.onChange : noop
    this.bindCBs.set(bindID, callback)

    if (this.app.editor) {
      if (this.pane === undefined) this.createGUI()

      const container = parent !== undefined ? parent : this.appTab
      container
        .addBinding(obj, name, params)
        .on('change', (evt: any) => {
          this.app.send({
            event: 'updateBind',
            data: {
              id: bindID,
              value: evt.value,
            }
          })
        })
      this.editorCallbacks++
    } else {
      this.app.send({
        event: 'bindObject',
        data: {
          id: bindID,
          name,
          params,
          parent
        }
      })
      this.appCallbacks++
    }
  }

  triggerBind(id: string, data: any) {
    const cb = this.bindCBs.get(id)
    if (cb !== undefined) cb(data)
    else console.warn(`No callback for: ${id}`, data)
  }

  // Buttons

  button(name: string, callback: VoidCallback, parent: any = undefined) {
    const bindID = this.bindID
    this.buttonCBs.set(bindID, callback)

    if (this.app.editor) {
      if (this.pane === undefined) this.createGUI()

      const container = parent !== undefined ? parent : this.appTab
      container
        .addButton({ title: name })
        .on('click', () => {
          this.app.send({
            event: 'clickButton',
            data: {
              id: bindID,
            }
          })
        })
      this.editorCallbacks++
    } else {
      this.app.send({
        event: 'addButton',
        data: {
          id: bindID,
          name,
          callback,
          parent
        }
      })
      this.appCallbacks++
    }
  }

  triggerButton(id: string) {
    const cb = this.buttonCBs.get(id)
    if (cb !== undefined) cb()
  }
}