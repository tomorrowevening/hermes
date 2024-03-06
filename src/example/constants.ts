import { EventDispatcher } from 'three';
import studio from '@theatre/studio';
import Application from '../core/Application';
import RemoteController from '../core/RemoteController';
import RemoteComponents from '../core/remote/RemoteComponents';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import RemoteThree from '../core/remote/RemoteThree';
import RemoteTweakpane from '../core/remote/RemoteTweakpane';
import { theatreApp, theatreEditor } from '../core/remote/theatreUtils';
import { theatreEditorApp } from '../editor/theatreUtils';
import { threeApp, threeEditor } from '../core/remote/threeUtils';
import { componentsApp } from '../core/remote/componentsUtils';
import { tweakpaneApp } from '../core/remote/tweakpaneUtils';

export const IS_DEV = true;

export const app = new Application('ws://localhost:8080', IS_DEV);
app.addComponent('theatre', new RemoteTheatre(app));
app.addComponent('three', new RemoteThree(app));
if (IS_DEV) {
  app.addComponent('components', new RemoteComponents(app));
  app.addComponent('debug', new RemoteTweakpane(app));

  const theatre = app.components.get('theatre') as RemoteTheatre;
  const three = app.components.get('three') as RemoteThree;
  const components = app.components.get('components') as RemoteComponents;
  const tweakpane = app.components.get('debug') as RemoteTweakpane;
  const appHandlers: any[] = [
    { remote: theatre, callback: theatreApp },
    { remote: three, callback: threeApp },
    { remote: components, callback: componentsApp },
    { remote: tweakpane, callback: tweakpaneApp },
  ];
  const editorHandlers: any[] = [
    { remote: theatre, callback: theatreEditor },
    { remote: three, callback: threeEditor },
  ];
  RemoteController(app, appHandlers, editorHandlers);
  theatreEditorApp(app, theatre, studio);
}

export const threeDispatcher = new EventDispatcher();
export const Events = {
  LOAD_COMPLETE: 'Events::loadComplete'
};
