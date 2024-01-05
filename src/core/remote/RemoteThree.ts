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
    this.app.send({
      event: 'getObject',
      target: 'app',
      data: uuid,
    });
  }

  setObject(value: any) {
    const stripped = stripObject(value);
    this.app.send({
      event: 'setObject',
      target: 'editor',
      data: stripped,
    });
  }

  requestMethod(uuid: string, key: string, value?: any) {
    this.app.send({
      event: 'requestMethod',
      target: 'app',
      data: {
        uuid,
        key,
        value
      },
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

  createTexture(uuid: string, key: string, value: any) {
    this.app.send({
      event: 'createTexture',
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
