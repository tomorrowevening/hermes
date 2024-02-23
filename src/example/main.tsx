// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import studio from '@theatre/studio';
// Models
import { IS_DEV } from './constants';
// Components
import './index.scss';
import Wrapper from './components/Wrapper';
// Tools
import RemoteTheatre from '../core/remote/RemoteTheatre';

// Debug tools
if (IS_DEV) {
  studio.initialize({ __experimental_rafDriver: RemoteTheatre.getRafDriver() });
}

// React

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        <Wrapper />
      </>
    ) : (
      <React.StrictMode>
        <Wrapper />
      </React.StrictMode>
    )}
  </>,
);
