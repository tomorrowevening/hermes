import { EventDispatcher } from 'three';
import studio from '@theatre/studio';
import Application from '../core/Application';
import RemoteController from '../core/RemoteController';
import RemoteComponents from '../core/remote/RemoteComponents';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import RemoteThree from '../core/remote/RemoteThree';

export const IS_DEV = true;

export const app = new Application('ws://localhost:8080', IS_DEV);
const theatre = new RemoteTheatre(app);
const three = new RemoteThree(app);
app.addComponent('theatre', theatre);
app.addComponent('three', three);

if (IS_DEV) {
  theatre.studio = studio;
  const components = new RemoteComponents(app);
  app.addComponent('components', components);
  const appHandlers: any[] = [
    { remote: theatre, callback: theatre.handleApp },
    { remote: three, callback: three.handleApp },
    { remote: components, callback: components.handleApp },
  ];
  const editorHandlers: any[] = [
    { remote: theatre, callback: theatre.handleEditor },
    { remote: three, callback: three.handleEditor },
  ];
  RemoteController(app, appHandlers, editorHandlers);
  theatre.handleEditorApp(app, theatre);
}

export const threeDispatcher = new EventDispatcher();
export const Events = {
  LOAD_COMPLETE: 'Events::loadComplete'
};
