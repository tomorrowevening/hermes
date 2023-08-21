import Application from './core/Application'

export const IS_DEV = import.meta.env.DEV
export const app = new Application(IS_DEV, 'editor')
// TODO Pass in loaded JSON
app.setProject('RemoteApp')
