import { EventDispatcher } from 'three';

// @ts-ignore
// export const IS_DEV = import.meta.env.DEV; // for production
export const IS_DEV = true; // to show the example
export const IS_EDITOR = IS_DEV && document.location.hash.search('editor') > -1;

export enum Events {
  LOAD_COMPLETE = 'Events::loadComplete'
}

type WebGLEvent = {
  [key in Events]: { value?: unknown }
}

export const threeDispatcher = new EventDispatcher<WebGLEvent>();
