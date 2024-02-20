import RemoteThree from '@/core/remote/RemoteThree';
import { ToolEvents, debugDispatcher } from '@/editor/global';
import { useEffect } from 'react';
import { Texture } from 'three';
import { getSubItem, setItemProps, textureFromSrc } from '../utils';

export interface SceneInspectorProps {
  three: RemoteThree
}

export default function SceneInspector(props: SceneInspectorProps) {
  function hasScene() {
    if (props.three.scene === undefined) {
      console.log('No scene:', props.three);
      return false;
    }
    return true;
  }
  const onGetObject = (evt: any) => {
    if (!hasScene()) return;
    const child = props.three.scene?.getObjectByProperty('uuid', evt.value);
    if (child !== undefined) props.three.setObject(child);
  };

  const setChildProps = (uuid: string, key: string, value: any) => {
    if (!hasScene()) return;
    const child = props.three.scene?.getObjectByProperty('uuid', uuid);
    if (child !== undefined) {
      setItemProps(child, key, value);
    }
  };

  const onUpdateObject = (evt: any) => {
    if (!hasScene()) return;
    const msg = evt.value;
    const { key, value, uuid } = msg;
    setChildProps(uuid, key, value);
  };

  const onCreateTexture = (evt: any) => {
    if (!hasScene()) return;
    const data = evt.value;
    textureFromSrc(data.value).then((texture: Texture) => {
      setChildProps(data.uuid, data.key, texture);
      setChildProps(data.uuid, `material.needsUpdate`, true);
    });
  };

  const onRequestMethod = (evt: any) => {
    if (!hasScene()) return;
    const { key, uuid, value, subitem } = evt.value;
    const child = props.three.scene?.getObjectByProperty('uuid', uuid);
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

  useEffect(() => {
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