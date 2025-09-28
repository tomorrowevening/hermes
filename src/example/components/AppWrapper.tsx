import { useEffect, useMemo, useState } from 'react';
import { IS_DEV, IS_EDITOR } from '../constants';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import RemoteSetup from './RemoteSetup';
import CustomEditor from '../CustomEditor';
import Wrapper from './Wrapper';
import { AppSettings } from '../../utils/detectSettings';

export default function AppWrapper() {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    Application.detectSettings(IS_DEV, IS_EDITOR).then((settings: AppSettings) => {
      const instance = new Application('ws://localhost:8080', settings);
      instance.addComponent('theatre', new RemoteTheatre(instance));
      instance.addComponent('three', new RemoteThree(instance));
      setApp(instance);
    });
  }, []);

  return (
    <>
      {app !== null && (
        <>
          {IS_DEV && <RemoteSetup app={app} />}
          {IS_EDITOR && <CustomEditor app={app} />}
          <Wrapper app={app} />
        </>
      )}
    </>
  );
}