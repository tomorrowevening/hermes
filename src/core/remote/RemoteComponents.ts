// Core
import { Application } from '../Application';
import BaseRemote from './BaseRemote';

/**
 * Communicates between custom React Components
 */
export default class RemoteComponents extends BaseRemote {
  constructor(app: Application, debug = false, editor = false) {
    super(app, 'RemoteComponents', debug, editor);
  }

  selectDropdown(dropdown: string, value: any) {
    this.send({
      event: 'selectComponent',
      target: 'app',
      data: {
        dropdown,
        value
      }
    });
  }

  updateDropdown(dropdown: string, list: string[]) {
    this.send({
      event: 'draggableListUpdate',
      target: 'app',
      data: {
        dropdown,
        value: list
      }
    });
  }
}
