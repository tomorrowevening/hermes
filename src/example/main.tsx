// Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import studio from '@theatre/studio'
// Models
import { app, IS_DEV } from './constants'
// Components
import './index.scss'
import App from './App'
import Editor from '../debug/Editor'
import Dropdown from '../debug/components/Dropdown'
// Tools
import RemoteController from '../debug/remote/RemoteController'
import SceneHierarchy from '../debug/sceneHierarchy/SceneHierarchy'

// Debug tools
if (IS_DEV) {
  studio.initialize()
  RemoteController(app)
}

//

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        <App />
        {app.editor ? (
          <Editor components={[
            <SceneHierarchy key="SceneHierarchy" />
          ]}>
            <Dropdown
              title="Scenes"
              options={[
                {
                  type: 'option',
                  title: 'Option 1',
                  value: 'opt1',
                },
                {
                  type: 'option',
                  title: 'Option 2',
                  value: 'opt2',
                },
              ]}
              onSelect={(value: string) => {
                app.components?.selectDropdown('Scenes', value)
              }}
            />
          </Editor>
        ) : null}
      </>
    ) : (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )}
  </>,
)
