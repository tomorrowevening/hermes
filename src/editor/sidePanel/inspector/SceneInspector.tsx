import RemoteThree from '@/core/remote/RemoteThree';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { useEffect } from 'react';
import { Scene, Texture } from 'three';
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
      if (child !== undefined) props.three.setObject(child);
    };
  
    const setChildProps = (uuid: string, key: string, value: any) => {
      const scene = getScene(uuid);
      const child = scene?.getObjectByProperty('uuid', uuid);
      if (child !== undefined) {
        setItemProps(child, key, value);
      }
    };
  
    const onUpdateObject = (evt: any) => {
      const msg = evt.value;
      const { key, value, uuid } = msg;
      setChildProps(uuid, key, value);
    };
  
    const onCreateTexture = (evt: any) => {
      const data = evt.value;
      textureFromSrc(data.value).then((texture: Texture) => {
        setChildProps(data.uuid, data.key, texture);
        setChildProps(data.uuid, `material.needsUpdate`, true);
      });
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