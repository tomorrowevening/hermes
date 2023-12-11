export type InspectorFieldType = 'string' | 'number' | 'boolean' | 'range' | 'color';
export interface InspectorFieldProps {
    label: string;
    prop: string;
    value: any;
    type: InspectorFieldType;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    onChange?: (prop: string, value: any) => void;
}
export default function InspectorField(props: InspectorFieldProps): import("react/jsx-runtime").JSX.Element;
