import { EventDispatcher } from 'three';

export enum ToolEvents {
  CUSTOM = 'ToolEvents::custom',
  // Components
  SELECT_DROPDOWN = 'ToolEvents::selectDropdown',
  DRAG_UPDATE = 'ToolEvents::dragUpdate',
  // SceneHierarchy
  ADD_SCENE = 'ToolEvents::addScene',
  REFRESH_SCENE = 'ToolEvents::refreshScene',
  REMOVE_SCENE = 'ToolEvents::removeScene',
  SET_SCENE = 'ToolEvents::setScene',
  GET_OBJECT = 'ToolEvents::getObject',
  SET_OBJECT = 'ToolEvents::setObject',
  UPDATE_OBJECT = 'ToolEvents::updateObject',
  CREATE_TEXTURE = 'ToolEvents::createTexture',
  REQUEST_METHOD = 'ToolEvents::requestMethod',
  // MultiView
  ADD_CAMERA = 'ToolEvents::addCamera',
  REMOVE_CAMERA = 'ToolEvents::removeCamera',
  // Custom
  ADD_GROUP = 'ToolEvents::addGroup',
  REMOVE_GROUP = 'ToolEvents::removeGroup',
  ADD_SPLINE = 'ToolEvents::addSpline',
  ADD_RENDERER = 'ToolEvents::addRenderer',
  UPDATE_RENDERER = 'ToolEvents::updateRenderer',
}

export type ToolEvent = {
  [key in ToolEvents]: { value?: unknown }
}

export const debugDispatcher = new EventDispatcher<ToolEvent>();
