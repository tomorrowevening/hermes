import RemoteThree from '@/core/remote/RemoteThree';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { useEffect, useState } from 'react';
import { Scene, Texture } from 'three';
import { getSubItem, setItemProps, textureFromSrc } from '../utils';

export interface SceneInspectorProps {
  three: RemoteThree
}

export default function SceneInspector(props: SceneInspectorProps) {
  const [scenes] = useState<Scene[]>([]);

  useEffect(() => {
    console.log('SceneInspector');

    function getScene(uuid: string): Scene | null {
      console.log(scenes, uuid);
      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        if (uuid.search(scene.uuid) > -1) return scene;
      }
      return null;
    }

    const onAddScene = (evt: any) => {
      console.log('add scene to inspector:', evt.value);
    };

    const onRemoveScene = (evt: any) => {
      console.log('remove scene to inspector:', evt.value);
    };

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

    debugDispatcher.addEventListener(ToolEvents.ADD_SCENE, onAddScene);
    debugDispatcher.addEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
    debugDispatcher.addEventListener(ToolEvents.GET_OBJECT, onGetObject);
    debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
    debugDispatcher.addEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
    debugDispatcher.addEventListener(ToolEvents.REQUEST_METHOD, onRequestMethod);

    return () => {
      debugDispatcher.removeEventListener(ToolEvents.ADD_SCENE, onAddScene);
      debugDispatcher.removeEventListener(ToolEvents.REMOVE_SCENE, onRemoveScene);
      debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      debugDispatcher.removeEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
      debugDispatcher.removeEventListener(ToolEvents.REQUEST_METHOD, onRequestMethod);
    };
  }, []);

  return null;
}