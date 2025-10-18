import studio from '@theatre/studio';
import { Application } from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import SceneInspector from '../../editor/sidePanel/inspector/SceneInspector';

type RemoteProps = {
  app: Application
}

export default function RemoteSetup(props: RemoteProps) {
  const app = props.app;
  const three = app.components.get('three') as RemoteThree;

  // Remote Theatre setup
  const theatre = app.components.get('theatre') as RemoteTheatre;
  theatre.studio = studio;
  theatre.handleEditorApp();

  return <SceneInspector three={three} />;
}
