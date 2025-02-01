import React, { useMemo } from 'react';
import { IS_DEV, IS_EDITOR } from '../constants';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import RemoteSetup from './RemoteSetup';
import CustomEditor from '../CustomEditor';
import Wrapper from './Wrapper';

export default function AppWrapper() {
  const app = useMemo(() => {
    const instance = new Application('ws://localhost:8080', IS_DEV);
    instance.editor = IS_EDITOR;

    const theatre = new RemoteTheatre(instance);
    const three = new RemoteThree(instance);
    instance.addComponent('theatre', theatre);
    instance.addComponent('three', three);
    return instance;
  }, []);

  return (
    <>
      {IS_DEV && <RemoteSetup app={app} />}
      {IS_EDITOR && <CustomEditor app={app} />}
      <Wrapper app={app} />
    </>
  );
}