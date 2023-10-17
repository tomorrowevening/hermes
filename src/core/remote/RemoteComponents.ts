// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { stripScene } from '@/editor/sceneHierarchy/utils';

/**
 * Communicates between custom React Components
 */
export default class RemoteComponents extends BaseRemote {
  constructor(app: Application) {
    super(app);
  }

  selectDropdown(dropdown: string, value: any) {
    this.app.send({
      event: 'selectComponent',
      target: 'app',
      data: {
        dropdown,
        value
      }
    });
  }

  setScene(value: any) {
    const stripped = stripScene(value);
    this.app.send({
      event: 'setScene',
      target: 'editor',
      data: stripped,
    });
  }

  updateDropdown(dropdown: string, list: string[]) {
    this.app.send({
      event: 'draggableListUpdate',
      target: 'app',
      data: {
        dropdown,
        value: list
      }
    });
  }
}