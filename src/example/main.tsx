// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import studio from '@theatre/studio';
// Models
import { app, IS_DEV } from './constants';
// Components
import './index.scss';
import App from './components/App';
import CustomEditor from './CustomEditor';
// Tools
import RemoteController from '../core/RemoteController';
import { HandleAppRemoteComponents } from '../core/remote/RemoteComponents';
import { HandleAppRemoteTheatre, HandleEditorRemoteTheatre } from '../core/remote/RemoteTheatre';
import { HandleAppRemoteThree, HandleEditorRemoteThree } from '../core/remote/RemoteThree';
import { HandleAppRemoteTweakpane } from '../core/remote/RemoteTweakpane';

// Debug tools
if (IS_DEV) {
  studio.initialize();
  const appHandlers: any[] = [
    HandleAppRemoteComponents,
    HandleAppRemoteTheatre,
    HandleAppRemoteThree,
    HandleAppRemoteTweakpane,
  ];
  const editorHandlers: any[] = [
    HandleEditorRemoteThree,
  ];
  HandleEditorRemoteTheatre(app);
  RemoteController(app, appHandlers, editorHandlers);
}

// React

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        <App />
        {app.editor ? <CustomEditor /> : null}
      </>
    ) : (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )}
  </>,
);
