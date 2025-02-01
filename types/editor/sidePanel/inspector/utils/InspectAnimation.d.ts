import RemoteThree from '@/core/remote/RemoteThree';
import { RemoteObject } from '../../types';
import Application from '@/core/Application';
type InspectAnimationProps = {
    app: Application;
    object: RemoteObject;
    three: RemoteThree;
};
export default function InspectAnimation(props: InspectAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
