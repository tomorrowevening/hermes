// Libs
import type { ISheet } from '@theatre/core'
import studio from '@theatre/studio'
// Core
import Application from '../../core/Application'
import type { BroadcastData, EditorEvent } from './types'

export default function RemoteController(app: Application) {
  let activeSheet: ISheet | undefined = undefined

  // Application
  const showApp = () => {
    studio.ui.hide()

    app.listen((msg: BroadcastData) => {
      switch (msg.event) {
        case 'setSheet':
          const sheet = app.sheets.get(msg.data.sheet)
          if (sheet !== undefined) {
            activeSheet = sheet
            studio.setSelection([sheet])
          }
          break

        case 'setSheetObject':
          const sheetObj = app.sheetObjects.get(
            `${msg.data.sheet}_${msg.data.key}`,
          )
          if (sheetObj !== undefined) {
            studio.setSelection([sheetObj])
          }
          break

        case 'updateSheetObject':
          const sheetObjCB = app.sheetObjectCBs.get(msg.data.sheetObject)
          if (sheetObjCB !== undefined) sheetObjCB(msg.data.values)
          break

        case 'updateTimeline':
          activeSheet = app.sheets.get(msg.data.sheet)
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
            activeSheet = app.sheets.get(obj.address.sheetId)
            break

          case 'Theatre_SheetObject_PublicAPI':
            type = 'setSheetObject'
            id += `_${obj.address.objectKey}`
            data = {
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
