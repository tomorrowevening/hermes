import { ReactNode } from 'react';
import { Scene } from 'three';
import Application from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';
type HermesAppProps = {
    app: Application;
    scenes?: Map<string, any>;
    onSceneAdd?: (scene: any, app: Application, renderer: any) => void;
    onSceneUpdate?: (scene: any) => void;
    onSceneResize?: (scene: Scene, width: number, height: number) => void;
    renderEditor?: (app: Application, three: RemoteThree) => ReactNode;
    onLoad?: (app: Application) => Promise<void>;
    renderLoading?: ReactNode;
    children?: (app: Application) => ReactNode;
};
export default function HermesApp(props: HermesAppProps): import("react/jsx-runtime").JSX.Element;
export {};
