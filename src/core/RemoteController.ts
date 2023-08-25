// Libs
import type { ISheet } from '@theatre/core'
import studio from '@theatre/studio'
// Core
import Application from './Application'
import { ToolEvents, debugDispatcher } from '../editor/global'
import type { BroadcastData, EditorEvent } from './types'

export default function RemoteController(app: Application) {
  let activeSheet: ISheet | undefined = undefined

  // Application
  const showApp = () => {
    studio.ui.hide()

    app.listen((msg: BroadcastData) => {
      let value = undefined
      switch (msg.event) {
        // Components
        case 'draggableListUpdate':
          debugDispatcher.dispatchEvent({ type: ToolEvents.DRAG_UPDATE, value: msg.data })
          break
        case 'selectComponent':
          debugDispatcher.dispatchEvent({ type: ToolEvents.SELECT_DROPDOWN, value: msg.data })
          break

        // GUI Events
        case 'addFolder':
          app.debug?.addFolder(msg.data.name, msg.data.params, msg.data.parent)
          break
        case 'bindObject':
          app.debug?.bind(msg.data.name, msg.data.params, msg.data.parent)
          break
        case 'updateBind':
          app.debug?.triggerBind(msg.data.id, msg.data.value)
          break
        case 'addButton':
          app.debug?.button(msg.data.name, msg.data.callback, msg.data.parent)
          break
        case 'clickButton':
          app.debug?.triggerButton(msg.data.id)
          break

        // Theatre Events
        case 'setSheet':
          value = app.theatre?.sheets.get(msg.data.sheet)
          if (value !== undefined) {
            activeSheet = value
            studio.setSelection([value])
          }
          break
        case 'setSheetObject':
          value = app.theatre?.sheetObjects.get(`${msg.data.sheet}_${msg.data.key}`)
          if (value !== undefined) {
            studio.setSelection([value])
          }
          break
        case 'updateSheetObject':
          value = app.theatre?.sheetObjectCBs.get(msg.data.sheetObject)
          if (value !== undefined) value(msg.data.values)
          break
        case 'updateTimeline':
          activeSheet = app.theatre?.sheets.get(msg.data.sheet)
          if (activeSheet !== undefined) {
            activeSheet.sequence.position = msg.data.position
          }
          break
      }
    })
  }

  // Editor
  const showEditor = () => {
    studio.ui.restore()

    studio.onSelectionChange((value: any[]) => {
      if (value.length < 1) return

      value.forEach((obj: any) => {
        let id = obj.address.sheetId
        let type: EditorEvent = 'setSheet'
        let data = {}
        switch (obj.type) {
          case 'Theatre_Sheet_PublicAPI':
            type = 'setSheet'
            data = {
              sheet: obj.address.sheetId,
            }
            activeSheet = app.theatre?.sheets.get(obj.address.sheetId)
            break

          case 'Theatre_SheetObject_PublicAPI':
            type = 'setSheetObject'
            id += `_${obj.address.objectKey}`
            data = {
              id: id,
              sheet: obj.address.sheetId,
              key: obj.address.objectKey,
            }
            break
        }
        app.send({ event: type, data: data })
      })
    })

    // Timeline
    let position = 0
    const onRafUpdate = () => {
      if (
        activeSheet !== undefined &&
        position !== activeSheet.sequence.position
      ) {
        position = activeSheet.sequence.position
        const t = activeSheet as ISheet
        app.send({
          event: 'updateTimeline',
          data: {
            position: position,
            sheet: t.address.sheetId,
          },
        })
      }
    }
    const onRaf = () => {
      onRafUpdate()
      requestAnimationFrame(onRaf)
    }
    onRafUpdate() // Initial position
    onRaf()


  }

  app.editor ? showEditor() : showApp()
}
