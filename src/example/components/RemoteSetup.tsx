import studio from '@theatre/studio';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';

type RemoteProps = {
  app: Application
}

export default function RemoteSetup(props: RemoteProps) {
  const app = props.app;

  // Remote Theatre setup
  const theatre = app.components.get('theatre') as RemoteTheatre;
  theatre.studio = studio;
  theatre.handleEditorApp();

  return null;
}
