import Application from '../Application'

/**
 * Base class for remote-related extensions
 */
export default class BaseRemote {
  protected app: Application

  constructor(app: Application) {
    this.app = app
  }

  dispose() {
    //
  }
}