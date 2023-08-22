import Application from '../Application'
import BaseRemote from './BaseRemote'

export default class RemoteComponents extends BaseRemote {
  constructor(app: Application) {
    super(app)
  }

  selectDropdown(dropdown: string, value: any) {
    this.app.send({
      event: 'dropdownSelect',
      data: {
        dropdown,
        value
      }
    })
  }
}