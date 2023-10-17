// Interfaces

export interface BroadcastData {
  target: ApplicationMode
  event: EditorEvent
  data: any
}

// Types

export type ApplicationMode = 'app' | 'editor'

export type VoidCallback = () => void

export type DataUpdateCallback = (data: any) => void

export type EditorEvent =
  | 'custom'
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
  | 'setObject'
  | 'setScene'
  | 'draggableListUpdate'

export type VoidFunc = () => void

export type BroadcastCallback = (data: BroadcastData) => void

export type TheatreUpdateCallback = (data: any) => void

// Consts

export const noop = () => {};

export const defaultTheatreCallback: TheatreUpdateCallback = () => {};

