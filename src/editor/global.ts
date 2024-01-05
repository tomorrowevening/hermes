import { EventDispatcher } from 'three';

export const debugDispatcher = new EventDispatcher();

export const ToolEvents = {
  CUSTOM: 'ToolEvents::custom',
  // Components
  SELECT_DROPDOWN: 'ToolEvents::selectDropdown',
  DRAG_UPDATE: 'ToolEvents::dragUpdate',
  // SceneHierarchy
  GET_SCENE: 'ToolEvents::getScene',
  SET_SCENE: 'ToolEvents::setScene',
  GET_OBJECT: 'ToolEvents::getObject',
  SET_OBJECT: 'ToolEvents::setObject',
  UPDATE_OBJECT: 'ToolEvents::updateObject',
  CREATE_TEXTURE: 'ToolEvents::createTexture',
  REQUEST_METHOD: 'ToolEvents::requestMethod',
};
