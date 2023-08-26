// Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import studio from '@theatre/studio'
// Models
import { app, IS_DEV } from './constants'
// Components
import './index.scss'
import App from './App'
import Editor from '../editor/Editor'
import Draggable from '../editor/components/Draggable'
import Dropdown from '../editor/components/Dropdown'
// Tools
import RemoteController from '../core/RemoteController'
import SceneHierarchy from '../editor/sceneHierarchy/SceneHierarchy'

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

            <Draggable
              title="Draggable Items"
              options={[
                'Item A',
                'Item B',
                'Item C',
                'Item D',
                'Item E',
              ]}
              onDragComplete={(options: string[]) => {
                app.components?.updateDropdown('Draggable Items', options)
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
