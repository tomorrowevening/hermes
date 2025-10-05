import { useEffect, useState } from 'react';
import { IS_DEV, IS_EDITOR } from '../constants';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import RemoteSetup from './RemoteSetup';
import CustomEditor from '../CustomEditor';
import Wrapper from './Wrapper';

export default function AppWrapper() {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const instance = new Application('ws://localhost:8080');
    instance.detectSettings(IS_DEV, IS_EDITOR).then(() => {
      if (IS_DEV) instance.setupRemote();
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