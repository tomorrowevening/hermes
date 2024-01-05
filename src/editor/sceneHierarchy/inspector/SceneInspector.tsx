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

	const onUpdateObject = (evt: any) => {
		const msg = evt.value;
		const { key, value, uuid } = msg;
		const child = props.scene.getObjectByProperty('uuid', uuid);
		if (child !== undefined) {
			const keys = key.split('.');
			const total = keys.length;
			// console.log('update obj:', uuid, keys, total, value, typeof value);
			// console.log(child);
			switch (total) {
				case 1:
					// @ts-ignore
					child[key] = value;
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

	const onCreateTexture = (evt: any) => {
		const data = evt.value;
		const child = props.scene.getObjectByProperty('uuid', data.uuid);
		if (child !== undefined) {
			const img = new Image();
			img.onload = () => {
				const texture = new Texture(img);
				texture.wrapS = RepeatWrapping;
				texture.wrapT = RepeatWrapping;
				texture.needsUpdate = true;
				const keys = data.key.split('.');
				const total = keys.length;
				switch (total) {
					case 1:
						// @ts-ignore
						child[key] = texture;
						break;
					case 2:
						// @ts-ignore
						child[keys[0]][keys[1]] = texture;
						break;
					case 3:
						// @ts-ignore
						child[keys[0]][keys[1]][keys[2]] = texture;
						break;
					case 4:
						// @ts-ignore
						child[keys[0]][keys[1]][keys[2]][keys[3]] = texture;
						break;
					case 5:
						// @ts-ignore
						child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = texture;
						break;
				}
			};
			img.src = data.value;
		}
	};

	const onGetScene = () => {
		props.three.setScene(props.scene);
	};

	useEffect(() => {
		debugDispatcher.addEventListener(ToolEvents.GET_OBJECT, onGetObject);
		debugDispatcher.addEventListener(ToolEvents.GET_SCENE, onGetScene);
		debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
		debugDispatcher.addEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
		props.three.setScene(props.scene);
		return () => {
			debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      debugDispatcher.removeEventListener(ToolEvents.CREATE_TEXTURE, onCreateTexture);
		};
	}, []);

	return null;
}