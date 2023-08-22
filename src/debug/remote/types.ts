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
  | 'dropdownSelect'

export interface BroadcastData {
  event: EditorEvent
  data: any
}

export type noop = () => void

export type BroadcastCallback = (data: BroadcastData) => void

export type TheatreUpdateCallback = (data: any) => void

// Default SheetObject.onValuesChange callback
export const defaultTheatreCallback: TheatreUpdateCallback = () => {}
