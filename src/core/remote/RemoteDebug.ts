// Libs
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
//
import Application from '../Application'
import RemoteBase from './BaseRemote'

export default class RemoteDebug extends RemoteBase {
  pane?: Pane | undefined = undefined
  appTab: any = undefined
  systemTab: any = undefined
  utilsTab: any = undefined

  constructor(app: Application) {
    super(app)

    if (app.editor) {
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
  }

  override dispose(): void {
    //
  }
}