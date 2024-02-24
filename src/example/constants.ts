import { EventDispatcher } from 'three';
import { getProject } from '@theatre/core';
import Application from '../core/Application';
import RemoteComponents from '../core/remote/RemoteComponents';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import RemoteThree from '../core/remote/RemoteThree';
import RemoteTweakpane from '../core/remote/RemoteTweakpane';
import { json } from './three/loader';

export const IS_DEV = true;

class CustomApp extends Application {
  override init(): Promise<void> {
    return new Promise((resolve) => {
      this.editor = IS_DEV && document.location.hash.search('editor') > -1;

      const theatre = new RemoteTheatre(this);
      this.addComponent('theatre', theatre);
      this.addComponent('three', new RemoteThree(this));
      if (IS_DEV) {
        this.addComponent('components', new RemoteComponents(this));
        this.addComponent('debug', new RemoteTweakpane(this));
      }

      const state = json.get('animation');
      theatre.project = getProject('RemoteApp', { state });
      theatre.project.ready.then(() => {
        resolve();
      });
    });
  }

  // Components

  get debug(): RemoteTweakpane {
    return this.components.get('debug') as RemoteTweakpane;
  }

  get debugComponents(): RemoteComponents {
    return this.components.get('components') as RemoteComponents;
  }

  get theatre(): RemoteTheatre {
    return this.components.get('theatre') as RemoteTheatre;
  }

  get three(): RemoteThree {
    return this.components.get('three') as RemoteThree;
  }
}

export const app = new CustomApp('ws://localhost:8080', IS_DEV);
export const threeDispatcher = new EventDispatcher();
export const Events = {
  LOAD_COMPLETE: 'Events::loadComplete'
};
