import { InspectorFieldProps } from './InspectorField';
export interface InspectorGroupProps {
    title: string;
    expanded?: boolean;
    items: InspectorFieldProps[] | InspectorGroupProps[];
    onToggle?: (value: boolean) => void;
}
export default function InspectorGroup(props: InspectorGroupProps): import("react/jsx-runtime").JSX.Element;
