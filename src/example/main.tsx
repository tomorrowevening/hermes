// Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import studio from '@theatre/studio'
// Models
import { IS_DEV } from './constants'
// Components
import './index.scss'
import App from './App'
import Editor from '../debug/Editor'
import { app } from './constants'
// Tools
import RemoteController from '../debug/remote/RemoteController'
import SceneHierarchy from '../debug/sceneHierarchy/SceneHierarchy'

// Debug tools
if (IS_DEV) {
  studio.initialize()
  RemoteController(app)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        <App />
        {app.editor ? (
        <Editor components={[<SceneHierarchy />]}></Editor>
        ) : null}
      </>
    ) : (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )}
  </>,
)
