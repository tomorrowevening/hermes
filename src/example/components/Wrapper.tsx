import React, { useEffect, useState } from 'react';
import { Events, threeDispatcher } from '../constants';
import { loadAssets } from '../three/loader';
import './App.css';
import App from './App';
import Application from '../../core/Application';

type WrapperProps = {
  app: Application
}

export default function Wrapper(props: WrapperProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      setLoaded(true);
    };

    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
    loadAssets(props.app);
  }, [setLoaded]);

  return (
    <>
      {!loaded && <p>Loading...</p>}
      {loaded && props.app.isApp && <App app={props.app} />}
    </>
  );
}
