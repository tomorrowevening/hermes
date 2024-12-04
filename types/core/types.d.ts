import { InspectorFieldType } from '@/editor/sidePanel/inspector/InspectorField';
export interface BroadcastData {
    target: ApplicationMode;
    event: EditorEvent;
    data?: any;
}
export type OptionInfo = {
    title: string;
    value: any;
};
export interface GroupItemData {
    type: InspectorFieldType;
    prop: string;
    title?: string;
    value?: any;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    options?: OptionInfo[];
}
export interface GroupData {
    title: string;
    items: GroupItemData[];
    onUpdate: (prop: string, value: any) => void;
}
export interface GroupCallback {
    title: string;
    onUpdate: (prop: string, value: any) => void;
}
export type ApplicationMode = 'app' | 'editor';
export type VoidCallback = () => void;
export type DataUpdateCallback = (data: any) => void;
export type EditorEvent = 'custom' | 'setSheet' | 'setSheetObject' | 'updateSheetObject' | 'updateTimeline' | 'playSheet' | 'pauseSheet' | 'getObject' | 'setObject' | 'updateObject' | 'addScene' | 'refreshScene' | 'removeScene' | 'setScene' | 'createTexture' | 'requestMethod' | 'addCamera' | 'removeCamera' | 'addSpline' | 'addRenderer' | 'updateRenderer' | 'addFolder' | 'bindObject' | 'updateBind' | 'addButton' | 'clickButton' | 'selectComponent' | 'draggableListUpdate' | 'addGroup' | 'removeGroup' | 'updateGroup';
export type VoidFunc = () => void;
export type BroadcastCallback = (data: BroadcastData) => void;
export type TheatreUpdateCallback = (data: any) => void;
export declare const noop: () => void;
export declare const defaultTheatreCallback: TheatreUpdateCallback;
