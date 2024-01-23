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

// Debug tools
if (IS_DEV) {
  studio.initialize();
  RemoteController(app, {
    components: true,
    theatre: true,
    three: true,
  });
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
