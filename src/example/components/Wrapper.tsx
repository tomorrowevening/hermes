import React, { useEffect, useState } from 'react';
import { getProject } from '@theatre/core';
import { Events, app, threeDispatcher } from '../constants';
import { json, loadAssets } from '../three/loader';
import './App.css';
import App from './App';
import RemoteTheatre from '../../core/remote/RemoteTheatre';

export default function Wrapper() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      const theatre = app.components.get('theatre') as RemoteTheatre;
      const state = json.get('animation');
      theatre.project = getProject('RemoteApp', { state });
      theatre.project.ready.then(() => {
        setLoaded(true);
      });
    };

    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
    loadAssets();
  }, [setLoaded]);

  return (
    <>
      {!loaded && <p>Loading...</p>}
      {loaded && <App />}
    </>
  );
}
