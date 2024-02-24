import React, { useEffect, useState } from 'react';
import { Events, IS_DEV, app, threeDispatcher } from '../constants';
import { loadAssets } from '../three/loader';
import './App.css';
import App from './App';
import RemoteController from '../../core/RemoteController';
import CustomEditor from '../CustomEditor';

export default function Wrapper() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      app.init().then(() => {
        RemoteController(app);
        setLoaded(true);
      });
    };
    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
    loadAssets();
  }, [setLoaded]);

  return (
    <>
      {!loaded && <p>Loading...</p>}
      {loaded && (
        <>
          {app.editor ? <CustomEditor /> : null}
          <App />
        </>
      )}
    </>
  );
}
