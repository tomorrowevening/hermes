import { EventDispatcher } from 'three';

export const IS_DEV = true;
export const IS_EDITOR = IS_DEV && document.location.hash.search('editor') > -1;

export enum Events {
  LOAD_COMPLETE = 'Events::loadComplete'
}

type WebGLEvent = {
  [key in Events]: { value?: unknown }
}

export const threeDispatcher = new EventDispatcher<WebGLEvent>();
