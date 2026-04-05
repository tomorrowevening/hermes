// Libs
import { useEffect, useState } from 'react';
// Models
import { IS_DEV, IS_EDITOR } from '../constants';
// 
import ExampleApplication from '../three/ExampleApplication';
import RemoteSetup from './RemoteSetup';
import CustomEditor from '../CustomEditor';
import Loader from './Loader';
import App from './App';
import { loadAssets } from '../three/loader';

export default function AppWrapper() {
  const [app, setApp] = useState<ExampleApplication | null>(null);

  useEffect(() => {
    const instance = new ExampleApplication('Hermes Example', IS_DEV, IS_EDITOR);
    instance.detectSettings().then(() => setApp(instance));
  }, []);

  return (
    <>
      {app !== null && (
        <>
          {IS_DEV && <RemoteSetup app={app} />}
          {IS_EDITOR && <CustomEditor app={app} />}
          <Loader app={app} onLoad={loadAssets} />
          {app.isApp && <App app={app} />}
        </>
      )}
    </>
  );
}
