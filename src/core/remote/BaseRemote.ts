import Application from '../Application'

export const noop = () => {}

export default class BaseRemote {
  protected app: Application

  constructor(app: Application) {
    this.app = app
  }

  dispose() {
    //
  }
}