import { ReactNode, useEffect, useState } from 'react';
import Application from '../../core/Application';
import './App.css';

type LoaderProps = {
  app: Application
  onLoad: (app: Application) => Promise<void>
}

export default function Loader(props: LoaderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    props.onLoad(props.app).then(() => setLoaded(true));
  }, []);

  return (
    <>
      {!loaded && <p>Loading...</p>}
    </>
  );
}
