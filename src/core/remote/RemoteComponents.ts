// Core
import Application from '../Application'
import BaseRemote from './BaseRemote'

/**
 * Communicates between custom React Components
 */
export default class RemoteComponents extends BaseRemote {
  constructor(app: Application) {
    super(app)
  }

  selectDropdown(dropdown: string, value: any) {
    this.app.send({
      event: 'selectComponent',
      data: {
        dropdown,
        value
      }
    })
  }

  updateDropdown(dropdown: string, list: string[]) {
    this.app.send({
      event: 'draggableListUpdate',
      data: {
        dropdown,
        value: list
      }
    })
  }
}