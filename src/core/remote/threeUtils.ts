import Application from '../Application';
import RemoteThree from './RemoteThree';
import type { BroadcastData } from '../types';
import { ToolEvents, debugDispatcher } from '@/editor/global';

// Remote Controller

// Receives App events
export function threeApp(app: Application, remote: RemoteThree, msg: BroadcastData) {
  switch (msg.event) {
    case 'getObject':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.GET_OBJECT, value: msg.data });
      break;
    case 'updateObject':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.UPDATE_OBJECT, value: msg.data });
      break;
    case 'createTexture':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.CREATE_TEXTURE, value: msg.data });
      break;
    case 'requestMethod':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.REQUEST_METHOD, value: msg.data });
      break;
  }
}

// Receives Editor events
export function threeEditor(app: Application, remote: RemoteThree, msg: BroadcastData) {
  switch (msg.event) {
    case 'setObject':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.SET_OBJECT, value: msg.data });
      break;
    case 'setScene':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.SET_SCENE, value: msg.data });
      break;
    case 'addCamera':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.ADD_CAMERA, value: msg.data });
      break;
    case 'removeCamera':
      // @ts-ignore
      debugDispatcher.dispatchEvent({ type: ToolEvents.REMOVE_CAMERA, value: msg.data });
      break;
  }
}
