import { EventDispatcher } from 'three';
import Application from '../core/Application';
import RemoteComponents from '../core/remote/RemoteComponents';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import RemoteThree from '../core/remote/RemoteThree';
import RemoteTweakpane from '../core/remote/RemoteTweakpane';

export const IS_DEV = true;

export const app = new Application('ws://localhost:8080', IS_DEV);
app.addComponent('theatre', new RemoteTheatre(app));
app.addComponent('three', new RemoteThree(app));
if (IS_DEV) {
  app.addComponent('components', new RemoteComponents(app));
  app.addComponent('debug', new RemoteTweakpane(app));
}

export const threeDispatcher = new EventDispatcher();
export const Events = {
  LOAD_COMPLETE: 'Events::loadComplete'
};
