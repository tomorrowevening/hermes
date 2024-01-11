import { EventDispatcher } from 'three';

export const debugDispatcher = new EventDispatcher();

export const ToolEvents = {
  CUSTOM: 'ToolEvents::custom',
  // Components
  SELECT_DROPDOWN: 'ToolEvents::selectDropdown',
  DRAG_UPDATE: 'ToolEvents::dragUpdate',
  // SceneHierarchy
  SET_SCENE: 'ToolEvents::setScene',
  GET_OBJECT: 'ToolEvents::getObject',
  SET_OBJECT: 'ToolEvents::setObject',
  UPDATE_OBJECT: 'ToolEvents::updateObject',
  CREATE_TEXTURE: 'ToolEvents::createTexture',
  REQUEST_METHOD: 'ToolEvents::requestMethod',
  // MultiView
  ADD_CAMERA: 'ToolEvents::addCamera',
  REMOVE_CAMERA: 'ToolEvents::removeCamera',
};
