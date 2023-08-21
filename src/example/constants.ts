import Application from '../core/Application'

export const IS_DEV = import.meta.env.DEV
export const app = new Application(IS_DEV, 'editor')

// Initiation, etc should happen once the app gets loaded..
// TODO Pass in loaded JSON
app.setupTheatre('RemoteApp')
if (IS_DEV) app.setupGUI()
