// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import studio from '@tomorrowevening/theatre-studio';
// Models
import { IS_DEV } from './constants';
// Components
import './index.scss';
import AppWrapper from './components/AppWrapper';

// Debug tools
if (IS_DEV) {
  studio.initialize();
}

// React

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {IS_DEV ? (
      <>
        <AppWrapper />
      </>
    ) : (
      <React.StrictMode>
        <AppWrapper />
      </React.StrictMode>
    )}
  </>,
);
