import { ReactNode } from 'react';
import Application from '../core/Application';
import RemoteThree from '../core/remote/RemoteThree';
type HermesAppProps = {
    app: Application;
    renderEditor?: (three: RemoteThree) => ReactNode;
    onLoad?: (app: Application) => Promise<void>;
    renderLoading?: ReactNode;
    children?: (app: Application) => ReactNode;
};
export default function HermesApp(props: HermesAppProps): import("react/jsx-runtime").JSX.Element;
export {};
