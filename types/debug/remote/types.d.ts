export type EditorEvent = 'setSheet' | 'setSheetObject' | 'updateSheetObject' | 'updateTimeline' | 'addFolder' | 'bindObject' | 'updateBind' | 'addButton' | 'clickButton' | 'dropdownSelect';
export interface BroadcastData {
    event: EditorEvent;
    data: any;
}
export type noop = () => void;
export type BroadcastCallback = (data: BroadcastData) => void;
export type TheatreUpdateCallback = (data: any) => void;
export declare const defaultTheatreCallback: TheatreUpdateCallback;