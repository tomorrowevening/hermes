import { RefObject } from 'react';
import { InspectorFieldType } from './InspectorField';
export interface InspectNumberProps {
    alt?: string;
    value: number;
    prop: string;
    type: InspectorFieldType;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    labelRef: RefObject<HTMLElement>;
    onChange?: (prop: string, value: number) => void;
}
export default function InspectNumber(props: InspectNumberProps): import("react/jsx-runtime").JSX.Element;
