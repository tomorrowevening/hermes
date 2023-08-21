/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProject, type IProject, type ISheet, type ISheetObject } from '@theatre/core'
//
import { editorHashtag, IS_DEV } from '../constants'
import type { ApplicationMode, noop, TheatreUpdateCallback } from './types'
import type { BroadcastCallback, BroadcastData } from '../debug/remote/types'
import { isColor } from '../debug/utils'

const _noop = () => {}

export default class Application {
  protected mode: ApplicationMode = 'listener'
  protected channel?: BroadcastChannel | undefined = undefined

  // Theatre
  project: IProject
  sheets: Map<string, ISheet>
  sheetObjects: Map<string, ISheetObject>
  sheetObjectCBs: Map<string, TheatreUpdateCallback>
  sheetObjectUnsubscribe: Map<string, noop>

  constructor(projectName: string, projectConfig?: any) {
    this.editor = IS_DEV && document.location.hash.search(editorHashtag) > -1
    if (IS_DEV) this.channel = new BroadcastChannel('theatre')

    // Theatre
    this.project = getProject(projectName, projectConfig)
    this.sheets = new Map()
    this.sheetObjects = new Map()
    this.sheetObjectCBs = new Map()
    this.sheetObjectUnsubscribe = new Map()
  }

  get editor(): boolean {
    return this.mode === 'editor'
  }

  set editor(value: boolean) {
    if (value) {
      this.mode = 'editor'
      document.title += ' - Editor'
    }
  }

  // Remote

  send(data: BroadcastData) {
    if (this.mode === 'editor' && this.channel !== undefined) {
      this.channel.postMessage(data)
    }
  }

  listen(callback: BroadcastCallback) {
    if (this.mode === 'listener' && this.channel !== undefined) {
      this.channel.onmessage = (event: MessageEvent<any>) => {
        callback(event.data)
      }
    }
  }

  // Theatre

  sheet(name: string): ISheet {
    let sheet: any = this.sheets.get(name)
    if (sheet !== undefined) return sheet

    sheet = this.project.sheet(name)
    this.sheets.set(name, sheet)
    return sheet
  }

  sheetObject(
    sheetName: string,
    key: string,
    props: any,
    onUpdate?: TheatreUpdateCallback,
  ): ISheetObject | undefined {
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
    this.sheetObjectCBs.set(objName, onUpdate !== undefined ? onUpdate : _noop)

    const unsubscribe = obj.onValuesChange((values: any) => {
      if (this.editor) {
        for (let i in values) {
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
        this.send({
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
    const id = `${sheet.address.sheetId}_${sheet.address.objectKey}`
    const unsubscribe = this.sheetObjectUnsubscribe.get(id)
    if (unsubscribe !== undefined) {
      unsubscribe()
    }
  }

  // TODO Debug
}
