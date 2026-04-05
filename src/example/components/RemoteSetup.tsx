import { useEffect } from 'react';
import studio from '@tomorrowevening/theatre-studio';
import Application from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';

type RemoteProps = {
  app: Application
}

export default function RemoteSetup(props: RemoteProps) {
  useEffect(() => {
    const theatre = props.app.components.get('theatre') as RemoteTheatre;
    theatre.studio = studio;
    theatre.handleEditorApp();
  }, []);

  return null;
}
