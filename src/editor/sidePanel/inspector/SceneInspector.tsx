import { useEffect } from 'react';
import { Scene, Texture } from 'three';
import RemoteThree from '@/core/remote/RemoteThree';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { getSubItem, setItemProps, textureFromSrc } from '../utils';

export interface SceneInspectorProps {
  three: RemoteThree
}

export default function SceneInspector(props: SceneInspectorProps) {
  useEffect(() => {
    function getScene(uuid: string): Scene | null {
      let scene: Scene | null = null;
      props.three.scenes.forEach((value: Scene) => {
        if (uuid.search(value.uuid) > -1) scene = value;
      });
      return scene;
    }

    const onGetObject = (evt: any) => {
      const uuid = evt.value;
      const scene = getScene(uuid);
      const child = scene?.getObjectByProperty('uuid', uuid);
      if (child !== undefined) {
        props.three.setObject(child);
      } else {
        console.log(`Hermes - can't find object: ${uuid}`, scene);
      }
    };
  
    const setChildProps = (uuid: string, key: string, value: any) => {
      const scene = getScene(uuid);
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

    debugDispatcher.addEventListener(ToolEvents.GET_OBJECT, onGetObject);
    debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
    debugDispatcher.addEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
    debugDispatcher.addEventListener(ToolEvents.REQUEST_METHOD, onRequestMethod);

    return () => {
      debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      debugDispatcher.removeEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
      debugDispatcher.removeEventListener(ToolEvents.REQUEST_METHOD, onRequestMethod);
    };
  }, []);

  return null;
}