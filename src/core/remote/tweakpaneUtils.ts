import Application from '../Application';
import RemoteTweakpane from './RemoteTweakpane';
import type { BroadcastData } from '../types';

// Remote Controller

// Receives App events
export function tweakpaneApp(app: Application, remote: RemoteTweakpane, msg: BroadcastData) {
  switch (msg.event) {
    case 'addFolder':
      remote.addFolder(msg.data.name, msg.data.params, msg.data.parent);
      break;
    case 'bindObject':
      remote.bind(msg.data.name, msg.data.params, msg.data.parent);
      break;
    case 'updateBind':
      remote.triggerBind(msg.data.id, msg.data.value);
      break;
    case 'addButton':
      remote.button(msg.data.name, msg.data.callback, msg.data.parent);
      break;
    case 'clickButton':
      remote.triggerButton(msg.data.id);
      break;
  }
}