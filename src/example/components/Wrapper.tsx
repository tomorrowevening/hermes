import React, { useEffect, useState } from 'react';
import { Events, threeDispatcher } from '../constants';
import { loadAssets } from '../three/loader';
import './App.css';
import App from './App';

export default function Wrapper() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      setLoaded(true);
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
