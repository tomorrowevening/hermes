import studio from '@theatre/studio';
import { Application } from '../../core/Application';
import RemoteComponents from '../../core/remote/RemoteComponents';
import RemoteTheatre from '../../core/remote/RemoteTheatre';
import RemoteThree from '../../core/remote/RemoteThree';
import { Events, threeDispatcher } from '../constants';

type RemoteProps = {
  app: Application
}

export default function RemoteSetup(props: RemoteProps) {
  const theatre = props.app.components.get('theatre') as RemoteTheatre;
  const three = props.app.components.get('three') as RemoteThree;
  theatre.studio = studio;
  const components = new RemoteComponents(props.app);
  props.app.addComponent('components', components);
  props.app.appHandlers = [
    { remote: theatre, callback: theatre.handleApp },
    { remote: three, callback: three.handleApp },
    { remote: components, callback: components.handleApp },
  ];
  props.app.editorHandlers = [
    { remote: theatre, callback: theatre.handleEditor },
    { remote: three, callback: three.handleEditor },
  ];

  const onLoad = () => {
    threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
    theatre.handleEditorApp(props.app, theatre);
  };
  threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);

  return null;
}
