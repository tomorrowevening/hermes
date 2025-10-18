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
    const instance = new Application();
    instance.detectSettings(IS_DEV, IS_EDITOR).then(() => {
      instance.addComponent('theatre', new RemoteTheatre(instance, IS_DEV, IS_EDITOR));
      instance.addComponent('three', new RemoteThree(instance, IS_DEV, IS_EDITOR));
      setApp(instance);
    });
  }, []);

  return (
    <>
      {app !== null && (
        <>
          {app.debugEnabled && <RemoteSetup app={app} />}
          {app.editor && <CustomEditor app={app} />}
          <Wrapper app={app} />
        </>
      )}
    </>
  );
}