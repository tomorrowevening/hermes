// Libs
import { Scene } from 'three';
// Core
import Application from '../Application';
import BaseRemote from './BaseRemote';
import { stripObject, stripScene } from '@/editor/sceneHierarchy/utils';

export default class RemoteThree extends BaseRemote {
  public scene?: Scene | undefined = undefined;

  constructor(app: Application) {
    super(app);
  }

  getObject(uuid: string) {
    console.log('RemoteThree::getObject:', uuid);
    this.app.send({
      event: 'getObject',
      target: 'app',
      data: uuid,
    });
  }

  setObject(value: any) {
    console.log('RemoteThree::setObject:', value);
    const stripped = stripObject(value);
    this.app.send({
      event: 'setObject',
      target: 'editor',
      data: stripped,
    });
  }

  updateObject(uuid: string, key: string, value: any) {
    this.app.send({
      event: 'updateObject',
      target: 'app',
      data: {
        uuid,
        key,
        value
      },
    });
  }

  getScene() {
    this.app.send({
      event: 'getScene',
      target: 'app',
    });
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
