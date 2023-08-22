import { EventDispatcher } from 'three';

export const debugDispatcher = new EventDispatcher()

export const ToolEvents = {
  // Components
  SELECT_DROPDOWN: 'ToolEvents::selectDropdown',
  // SceneHierarchy
  INSPECT_ITEM: 'ToolEvents::inspectItem',
  REFRESH_SCENE: 'ToolEvents::refreshScene',
  SET_SCENE: 'ToolEvents::setScene',
}
