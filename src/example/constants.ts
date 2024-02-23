import { EventDispatcher } from 'three';
import Application from '../core/Application';
import RemoteComponents from '../core/remote/RemoteComponents';
import RemoteTheatre from '../core/remote/RemoteTheatre';
import RemoteThree from '../core/remote/RemoteThree';
import RemoteTweakpane from '../core/remote/RemoteTweakpane';
import { json } from './three/loader';
import BaseRemote from '../core/remote/BaseRemote';

export const IS_DEV = true;

class CustomApp extends Application {
  constructor() {
    super('ws://localhost:8080', IS_DEV);
  }

  override init(): Promise<void> {
    return new Promise((resolve) => {
      this.editor = IS_DEV && document.location.hash.search('editor') > -1;

      this.addComponent('theatre', new RemoteTheatre(this));
      this.addComponent('three', new RemoteThree(this));
      if (IS_DEV) {
        this.addComponent('components', new RemoteComponents(this));
        this.addComponent('debug', new RemoteTweakpane(this));
      }

      this.components.forEach((value: BaseRemote) => {
        value.handleEditorApp();
      });

      const state = json.get('animation');
      this.theatre.init('RemoteApp', { state }).then(() => {
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

export const app = new CustomApp();
export const threeDispatcher = new EventDispatcher();
export const Events = {
  LOAD_COMPLETE: 'Events::loadComplete'
};
