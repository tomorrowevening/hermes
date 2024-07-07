import { EventDispatcher } from 'three';
export declare const debugDispatcher: EventDispatcher<{}>;
export declare const ToolEvents: {
    CUSTOM: string;
    SELECT_DROPDOWN: string;
    DRAG_UPDATE: string;
    ADD_SCENE: string;
    REMOVE_SCENE: string;
    SET_SCENE: string;
    GET_OBJECT: string;
    SET_OBJECT: string;
    UPDATE_OBJECT: string;
    CREATE_TEXTURE: string;
    REQUEST_METHOD: string;
    ADD_CAMERA: string;
    REMOVE_CAMERA: string;
};
