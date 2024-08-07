import { Euler, Matrix3, Vector3 } from 'three';
interface InspectGrid3Props {
    value: Vector3 | Matrix3 | Euler;
    step?: number;
    onChange: (evt: any) => void;
}
export default function InspectGrid3(props: InspectGrid3Props): import("react/jsx-runtime").JSX.Element;
export {};
