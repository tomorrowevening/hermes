import studio from '@theatre/studio';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import { Events, threeDispatcher } from '../constants';

type RemoteProps = {
  app: Application
}

export default function RemoteSetup(props: RemoteProps) {
  const theatre = props.app.components.get('theatre') as RemoteTheatre;
  theatre.studio = studio;
  const onLoad = () => {
    threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
    theatre.handleEditorApp();
  };
  threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);

  return null;
}
