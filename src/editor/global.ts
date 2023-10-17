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
};
