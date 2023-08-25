export interface BroadcastData {
    event: EditorEvent;
    data: any;
}
export type ApplicationMode = 'listener' | 'editor';
export type VoidCallback = () => void;
export type DataUpdateCallback = (data: any) => void;
export type EditorEvent = 'setSheet' | 'setSheetObject' | 'updateSheetObject' | 'updateTimeline' | 'addFolder' | 'bindObject' | 'updateBind' | 'addButton' | 'clickButton' | 'selectComponent' | 'draggableListUpdate';
export type VoidFunc = () => void;
export type BroadcastCallback = (data: BroadcastData) => void;
export type TheatreUpdateCallback = (data: any) => void;
export declare const noop: () => void;
export declare const defaultTheatreCallback: TheatreUpdateCallback;
