import { KeyboardEvent } from 'react';
import { OptionInfo } from '../../../core/types';
export type InspectorFieldType = 'string' | 'field' | 'number' | 'boolean' | 'range' | 'color' | 'button' | 'image' | 'option' | 'vector2' | 'grid3' | 'grid4' | 'euler';
export interface InspectorFieldProps {
    title: string;
    type: InspectorFieldType;
    prop?: string;
    value?: any;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    options?: OptionInfo[];
    onChange?: (prop: string, value: any) => void;
    onKeyDown?: (evt: KeyboardEvent) => void;
}
export default function InspectorField(props: InspectorFieldProps): import("react/jsx-runtime").JSX.Element;
