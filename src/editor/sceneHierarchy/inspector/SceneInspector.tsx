import RemoteThree from "@/core/remote/RemoteThree";
import { ToolEvents, debugDispatcher } from "@/editor/global";
import { useEffect } from "react";
import { RepeatWrapping, Scene, Texture } from "three";
import { setItemProps } from "../utils";

export interface SceneInspectorProps {
  scene: Scene
  three: RemoteThree
}

export default function SceneInspector(props: SceneInspectorProps) {
  const onGetObject = (evt: any) => {
    const child = props.scene.getObjectByProperty('uuid', evt.value);
    if (child !== undefined) props.three.setObject(child);
  };

  const setChildProps = (uuid: string, key: string, value: any) => {
    const child = props.scene.getObjectByProperty('uuid', uuid);
    if (child !== undefined) setItemProps(child, key, value);
  };

  const onUpdateObject = (evt: any) => {
    const msg = evt.value;
    const { key, value, uuid } = msg;
    setChildProps(uuid, key, value);
  };

  const onCreateTexture = (evt: any) => {
    const data = evt.value;
    const img = new Image();
    img.onload = () => {
      const texture = new Texture(img);
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.needsUpdate = true;
      setChildProps(data.uuid, data.key, texture);
    };
    img.src = data.value;
  };

  const onGetScene = () => {
    props.three.setScene(props.scene);
  };

  const onRequestMethod = (evt: any) => {
    const { key, uuid, value } = evt.value;
    const child = props.scene.getObjectByProperty('uuid', uuid);
    if (child !== undefined) {
      try {
        // @ts-ignore
        child[key](value);
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
    debugDispatcher.addEventListener(ToolEvents.GET_SCENE, onGetScene);
    debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
    debugDispatcher.addEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
    debugDispatcher.addEventListener(ToolEvents.REQUEST_METHOD, onRequestMethod);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      debugDispatcher.removeEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
      debugDispatcher.removeEventListener(ToolEvents.REQUEST_METHOD, onRequestMethod);
    };
  }, []);

  return null;
}