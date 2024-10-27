import { EventDispatcher } from 'three';
export declare enum ToolEvents {
    CUSTOM = "ToolEvents::custom",
    SELECT_DROPDOWN = "ToolEvents::selectDropdown",
    DRAG_UPDATE = "ToolEvents::dragUpdate",
    ADD_SCENE = "ToolEvents::addScene",
    REFRESH_SCENE = "ToolEvents::refreshScene",
    REMOVE_SCENE = "ToolEvents::removeScene",
    SET_SCENE = "ToolEvents::setScene",
    GET_OBJECT = "ToolEvents::getObject",
    SET_OBJECT = "ToolEvents::setObject",
    UPDATE_OBJECT = "ToolEvents::updateObject",
    CREATE_TEXTURE = "ToolEvents::createTexture",
    REQUEST_METHOD = "ToolEvents::requestMethod",
    ADD_CAMERA = "ToolEvents::addCamera",
    REMOVE_CAMERA = "ToolEvents::removeCamera",
    ADD_GROUP = "ToolEvents::addGroup",
    REMOVE_GROUP = "ToolEvents::removeGroup",
    ADD_SPLINE = "ToolEvents::addSpline"
}
export type ToolEvent = {
    [key in ToolEvents]: {
        value?: unknown;
    };
};
export declare const debugDispatcher: EventDispatcher<ToolEvent>;
