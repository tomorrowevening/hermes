import { CubeTexture, CubeTextureLoader, Group, Object3D, RepeatWrapping, Texture, TextureLoader } from 'three';
// @ts-ignore
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Events, threeDispatcher } from '../constants';
import { getProject } from '@theatre/core';
import Application from '../../core/Application';
import RemoteTheatre from '../../core/remote/RemoteTheatre';

export const cubeTextures: Map<string, CubeTexture> = new Map();
export const json: Map<string, any> = new Map();
export const models: Map<string, Group> = new Map();
export const textures: Map<string, Texture> = new Map();

export function loadCube(name: string, source: string[]): Promise<CubeTexture> {
  return new Promise((resolve, reject) => {
    new CubeTextureLoader()
      .setPath('images/milkyWay/')
      .load(source, (value: CubeTexture) => {
        cubeTextures.set(name, value);
        resolve(value);
      }, undefined, () => {
        reject();
      });
  });
}

export function loadModel(name: string, source: string): Promise<Group> {
  return new Promise((resolve, reject) => {
    new FBXLoader()
      .setPath('./models/')
      .loadAsync(source)
      .then((model: Group) => {
        // Shadows
        model.traverse((obj: Object3D) => {
          if (obj['isMesh']) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });

        models.set(name, model);
        resolve(model);
      })
      .catch((reason: any) => {
        console.log(`Couldn't load:`, source);
        console.log(reason);
        reject();
      });
  });
}

export function loadTexture(name: string, source: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    new TextureLoader()
      .load(source, (value: Texture) => {
        value.wrapS = RepeatWrapping;
        value.wrapT = RepeatWrapping;
        value.needsUpdate = true;
        textures.set(name, value);
        resolve(value);
      }, undefined, () => {
        reject();
      });
  });
}

export function loadJSON(name: string, source: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(source)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        json.set(name, data);
        resolve(data);
      })
      .catch(() => {
        console.log(`Couldn't load: ${source}`);
        reject();
      });
  });
}

export function loadAssets(app: Application): Promise<void> {
  return new Promise((resolve, reject) => {
    const assets: (() => Promise<any>)[] = [
      () => loadCube('environment', [
        'dark-s_px.jpg',
        'dark-s_nx.jpg',
        'dark-s_py.jpg',
        'dark-s_ny.jpg',
        'dark-s_pz.jpg',
        'dark-s_nz.jpg'
      ]),
      () => loadTexture('uv_grid', 'images/uv_grid_opengl.jpg'),
      () => loadModel('Flair', 'Flair.fbx'),
      () => loadJSON('animation', 'json/animation.json'),
    ];

    Promise.all(assets.map(load => load()))
      .then(() => {
        const theatre = app.components.get('theatre') as RemoteTheatre;
        const state = json.get('animation');
        theatre.project = getProject('RemoteApp', { state });
        theatre.project.ready.then(() => {
          threeDispatcher.dispatchEvent({ type: Events.LOAD_COMPLETE });
          resolve();
        });
      })
      .catch((reason) => {
        console.log(reason);
        reject();
      });
  });
}
