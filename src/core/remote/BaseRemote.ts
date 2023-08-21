import Application from '../Application'

export const noop = () => {}

export default class RemoteBase {
  protected app: Application

  constructor(app: Application) {
    this.app = app
  }

  dispose() {
    //
  }
}