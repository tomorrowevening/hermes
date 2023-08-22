// Libs
import { getProject } from '@theatre/core'
import type { IProject, IProjectConfig, ISheet, ISheetObject } from '@theatre/core'
//
import Application from '../Application'
import BaseRemote, { noop } from './BaseRemote'
import type { DataUpdateCallback, VoidCallback } from '../types'
import { isColor } from '../../debug/utils'

export default class RemoteTheatre extends BaseRemote {
  project: IProject | undefined
  sheets: Map<string, ISheet>
  sheetObjects: Map<string, ISheetObject>
  sheetObjectCBs: Map<string, DataUpdateCallback>
  sheetObjectUnsubscribe: Map<string, VoidCallback>

  constructor(app: Application, projectName: string, projectConfig?: IProjectConfig | undefined) {
    super(app)
    this.project = getProject(projectName, projectConfig)
    this.sheets = new Map()
    this.sheetObjects = new Map()
    this.sheetObjectCBs = new Map()
    this.sheetObjectUnsubscribe = new Map()
  }

  override dispose(): void {
    //
  }

  sheet(name: string): ISheet | undefined {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.')
      return undefined
    }

    let sheet = this.sheets.get(name)
    if (sheet !== undefined) return sheet

    sheet = this.project?.sheet(name)
    this.sheets.set(name, sheet)
    return sheet
  }

  sheetObject(
    sheetName: string,
    key: string,
    props: any,
    onUpdate?: DataUpdateCallback,
  ): ISheetObject | undefined {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.')
      return undefined
    }
    const sheet = this.sheets.get(sheetName)
    if (sheet === undefined) return undefined

    const objName = `${sheetName}_${key}`
    let obj = this.sheetObjects.get(objName)
    if (obj !== undefined) {
      obj = sheet.object(key, {...props, ...obj.value}, {reconfigure: true})
      return obj
    }

    obj = sheet.object(key, props)
    this.sheetObjects.set(objName, obj)
    this.sheetObjectCBs.set(objName, onUpdate !== undefined ? onUpdate : noop)

    const unsubscribe = obj.onValuesChange((values: any) => {
      if (this.app.editor) {
        for (const i in values) {
          const value = values[i]
          if (typeof value === 'object') {
            if (isColor(value)) {
              values[i] = {
                r: value.r,
                g: value.g,
                b: value.b,
                a: value.a,
              }
            }
          }
        }
        this.app.send({
          event: 'updateSheetObject',
          data: {
            sheetObject: objName,
            values: values,
          },
        })
      } else {
        const callback = this.sheetObjectCBs.get(objName)
        if (callback !== undefined) callback(values)
      }
    })
    this.sheetObjectUnsubscribe.set(objName, unsubscribe)

    return obj
  }

  unsubscribe(sheet: ISheetObject) {
    if (this.project === undefined) {
      console.error('Theatre Project hasn\'t been created yet.')
      return undefined
    }

    const id = `${sheet.address.sheetId}_${sheet.address.objectKey}`
    const unsubscribe = this.sheetObjectUnsubscribe.get(id)
    if (unsubscribe !== undefined) {
      unsubscribe()
    }
  }
}