import { InspectorFieldProps } from './InspectorField';
export interface InspectorGroupProps {
    title: string;
    expanded?: boolean;
    items: InspectorFieldProps[];
}
export default function InspectorGroup(props: InspectorGroupProps): import("react/jsx-runtime").JSX.Element;
