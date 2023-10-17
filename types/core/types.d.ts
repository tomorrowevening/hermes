export interface BroadcastData {
    target: ApplicationMode;
    event: EditorEvent;
    data: any;
}
export type ApplicationMode = 'app' | 'editor';
export type VoidCallback = () => void;
export type DataUpdateCallback = (data: any) => void;
export type EditorEvent = 'custom' | 'setSheet' | 'setSheetObject' | 'updateSheetObject' | 'updateTimeline' | 'addFolder' | 'bindObject' | 'updateBind' | 'addButton' | 'clickButton' | 'selectComponent' | 'setObject' | 'setScene' | 'draggableListUpdate';
export type VoidFunc = () => void;
export type BroadcastCallback = (data: BroadcastData) => void;
export type TheatreUpdateCallback = (data: any) => void;
export declare const noop: () => void;
export declare const defaultTheatreCallback: TheatreUpdateCallback;
