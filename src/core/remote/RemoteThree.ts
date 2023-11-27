// Libs
import { Scene } from 'three';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { stripScene } from '@/editor/sceneHierarchy/utils';

export default class RemoteThree extends BaseRemote {
  public scene?: Scene | undefined = undefined;

  constructor(app: Application) {
    super(app);
  }

  setScene(value: any) {
    const stripped = stripScene(value);
    this.app.send({
      event: 'setScene',
      target: 'editor',
      data: stripped,
    });
  }
}
