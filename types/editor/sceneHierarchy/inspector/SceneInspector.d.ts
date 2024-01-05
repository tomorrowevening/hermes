import RemoteThree from "@/core/remote/RemoteThree";
import { Scene } from "three";
export interface SceneInspectorProps {
    scene: Scene;
    three: RemoteThree;
}
export default function SceneInspector(props: SceneInspectorProps): null;
