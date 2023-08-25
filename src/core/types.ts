// Interfaces

export interface BroadcastData {
  event: EditorEvent
  data: any
}

// Types

export type ApplicationMode = 'listener' | 'editor'

export type VoidCallback = () => void

export type DataUpdateCallback = (data: any) => void

export type EditorEvent =
// Theatre
  | 'setSheet'
  | 'setSheetObject'
  | 'updateSheetObject'
  | 'updateTimeline'
// GUI
  | 'addFolder'
  | 'bindObject'
  | 'updateBind'
  | 'addButton'
  | 'clickButton'
// Components
  | 'selectComponent'
  | 'draggableListUpdate'

export type VoidFunc = () => void

export type BroadcastCallback = (data: BroadcastData) => void

export type TheatreUpdateCallback = (data: any) => void

// Consts

export const noop = () => {}

export const defaultTheatreCallback: TheatreUpdateCallback = () => {}

