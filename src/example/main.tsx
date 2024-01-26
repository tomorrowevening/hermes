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
import RemoteTheatre from '../core/remote/RemoteTheatre';

// Debug tools
if (IS_DEV) {
  studio.initialize({ __experimental_rafDriver: RemoteTheatre.getRafDriver() });
  if (app.isApp) studio.ui.hide();
  RemoteController(app);
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
