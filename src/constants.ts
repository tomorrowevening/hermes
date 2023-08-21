import Application from './core/Application'

export const IS_DEV = import.meta.env.DEV
export const editorHashtag = 'editor'
export const app = new Application('RemoteApp')
