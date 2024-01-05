import RemoteThree from "@/core/remote/RemoteThree";
import { ToolEvents, debugDispatcher } from "@/editor/global";
import { useEffect } from "react";
import { RepeatWrapping, Scene, Texture } from "three";

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
    if (child !== undefined) {
      const keys = key.split('.');
      const total = keys.length;
      switch (total) {
        case 1:
          // @ts-ignore
          child[keys[0]] = value;
          break;
        case 2:
          // @ts-ignore
          child[keys[0]][keys[1]] = value;
          break;
        case 3:
          // @ts-ignore
          child[keys[0]][keys[1]][keys[2]] = value;
          break;
        case 4:
          // @ts-ignore
          child[keys[0]][keys[1]][keys[2]][keys[3]] = value;
          break;
        case 5:
          // @ts-ignore
          child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value;
          break;
      }
    }
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

  useEffect(() => {
    debugDispatcher.addEventListener(ToolEvents.GET_OBJECT, onGetObject);
    debugDispatcher.addEventListener(ToolEvents.GET_SCENE, onGetScene);
    debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
    debugDispatcher.addEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      debugDispatcher.removeEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
    };
  }, []);

  return null;
}