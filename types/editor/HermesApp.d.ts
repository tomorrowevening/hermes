import { ReactNode } from 'react';
import { Scene } from 'three';
import Application from '../core/Application';
type HermesAppProps = {
    app: Application;
    scenes: Map<string, any>;
    onSceneAdd?: (scene: any) => void;
    onSceneUpdate?: (scene: any) => void;
    onSceneResize?: (scene: Scene, width: number, height: number) => void;
    onLoad?: (app: Application) => Promise<void>;
    renderLoading?: ReactNode;
    children?: (app: Application) => ReactNode;
};
export default function HermesApp(props: HermesAppProps): import("react/jsx-runtime").JSX.Element;
export {};
