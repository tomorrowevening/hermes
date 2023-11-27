export type InspectorFieldType = 'string' | 'number' | 'boolean' | 'range';
export interface InspectorFieldProps {
    label: string;
    value: any;
    type: InspectorFieldType;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    onChange?: (label: string, value: any) => void;
}
export default function InspectorField(props: InspectorFieldProps): import("react/jsx-runtime").JSX.Element;
