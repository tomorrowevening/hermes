// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import studio from '@theatre/studio';
// Models
import { IS_DEV } from './constants';
// Components
import './index.scss';
import CustomEditor from './CustomEditor';
import Wrapper from './components/Wrapper';
// Tools
import RemoteTheatre from '../core/remote/RemoteTheatre';
import { createRafDriver } from '@theatre/core';

// Debug tools
RemoteTheatre.rafDriver = createRafDriver();
if (IS_DEV) {
  studio.initialize({ __experimental_rafDriver: RemoteTheatre.rafDriver });
}

// React

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        <CustomEditor />
        <Wrapper />
      </>
    ) : (
      <React.StrictMode>
        <Wrapper />
      </React.StrictMode>
    )}
  </>,
);
