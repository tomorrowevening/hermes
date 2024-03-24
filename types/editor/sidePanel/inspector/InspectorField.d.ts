export type InspectorFieldType = 'string' | 'number' | 'boolean' | 'range' | 'color' | 'button' | 'image' | 'option' | 'vector';
export interface InspectorFieldProps {
    title: string;
    type: InspectorFieldType;
    prop?: string;
    value?: any;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    options?: any[];
    onChange?: (prop: string, value: any) => void;
}
export default function InspectorField(props: InspectorFieldProps): import("react/jsx-runtime").JSX.Element;
