// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import studio from '@theatre/studio';
// Models
import { app, IS_DEV } from './constants';
// Components
import './index.scss';
import CustomEditor from './CustomEditor';
import Wrapper from './components/Wrapper';

// Debug tools
if (IS_DEV) {
  studio.initialize();
}

// React

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        {app.editor && <CustomEditor />}
        <Wrapper />
      </>
    ) : (
      <React.StrictMode>
        <Wrapper />
      </React.StrictMode>
    )}
  </>,
);
