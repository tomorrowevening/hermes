import { useEffect } from 'react';
import { Scene, Texture } from 'three';
import RemoteThree from '../../../core/remote/RemoteThree';
import { getSubItem, setItemProps, textureFromSrc } from '../utils';

export interface SceneInspectorProps {
  three: RemoteThree
}

/**
 * This belongs in the app, not the editor
 */
export default function SceneInspector(props: SceneInspectorProps) {
  useEffect(() => {
    function getScene(uuid: string): Scene | null {
      const minUUID = uuid.split('.')[0];
      if (props.three.scene && props.three.scene.uuid === minUUID) {
        return props.three.scene;
      }

      let scene: Scene | null = null;
      props.three.scenes.forEach((value: Scene) => {
        if (value.uuid.search(minUUID) > -1) scene = value;
      });
      return scene;
    }

    const onGetObject = (evt: any) => {
      const uuid = evt.value;
      const scene = getScene(uuid);
      if (!scene) {
        console.log(`Hermes (SceneInspector) - can't find scene for object: ${uuid}`, props.three.scenes);
        return;
      }

      const child = scene.getObjectByProperty('uuid', uuid);
      if (child !== undefined) {
        props.three.setObject(child);
      } else {
        console.log(`Hermes - can't find object: ${uuid}`, scene);
      }
    };
  
    const setChildProps = (uuid: string, key: string, value: any) => {
      const scene = getScene(uuid);
      if (!scene) {
        console.log(`Hermes (SceneInspector) - can't find scene to set object: ${uuid}, ${key}`, props.three.scenes);
        return;
      }

      const child = scene?.getObjectByProperty('uuid', uuid);
      if (child !== undefined) {
        setItemProps(child, key, value);
      } else {
        console.log(`Hermes - can't set object: ${uuid}`, scene);
      }
    };
  
    const onUpdateObject = (evt: any) => {
      const msg = evt.value;
      const { key, value, uuid } = msg;
      setChildProps(uuid, key, value);
    };
  
    const onCreateTexture = (evt: any) => {
      const data = evt.value;
      const scene = getScene(data.uuid);
      if (!scene) {
        console.log(`Hermes - can't create texture, can't find scene: ${data.uuid}`);
        return;
      }
      const child = scene?.getObjectByProperty('uuid', data.uuid);
      if (child !== undefined) {
        const onComplete = (value: Texture | null) => {
          const keys = data.key.split('.');
          const total = keys.length;
          switch (total) {
            case 1:
              child[keys[0]] = value;
              break;
            case 2:
              child[keys[0]][keys[1]] = value;
              break;
            case 3:
              child[keys[0]][keys[1]][keys[2]] = value;
              break;
            case 4:
              child[keys[0]][keys[1]][keys[2]][keys[3]] = value;
              break;
            case 5:
              child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value;
              break;
          }
          child['material']['needsUpdate'] = true;
        };
        if (data.value.src.length > 0) {
          textureFromSrc(data.value.src).then((texture: Texture) => {
            texture.offset.set(data.value.offset[0], data.value.offset[1]);
            texture.repeat.set(data.value.repeat[0], data.value.repeat[1]);
            onComplete(texture);
          });
        } else {
          onComplete(null);
        }
      }
    };
  
    const onRequestMethod = (evt: any) => {
      const { key, uuid, value, subitem } = evt.value;
      const scene = getScene(uuid);
      const child = scene?.getObjectByProperty('uuid', uuid);
      if (child !== undefined) {
        try {
          if (subitem !== undefined) {
            const target = getSubItem(child, subitem);
            target[key](value);
          } else {
            child[key](value);
          }
        } catch (err: any) {
          console.log('Error requesting method:');
          console.log(err);
          console.log(key);
          console.log(value);
        }
      }
    };

    const messageHandler = (evt: MessageEvent) => {
      const msg = evt.data;
      switch (msg.event) {
        case 'getObject':
          onGetObject({ value: msg.data });
          break;
          case 'updateObject':
            onUpdateObject({ value: msg.data });
            break;
          case 'createTexture':
            onCreateTexture({ value: msg.data });
            break;
          case 'requestMethod':
            onRequestMethod({ value: msg.data });
          break;
      }
    };

    const broadcastChannel = new BroadcastChannel('RemoteThree');
    broadcastChannel.addEventListener('message', messageHandler);
    return () => {
      broadcastChannel.removeEventListener('message', messageHandler);
      broadcastChannel.close();
    };
  }, []);

  return null;
}