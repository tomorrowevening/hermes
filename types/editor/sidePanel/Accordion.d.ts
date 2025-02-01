import { Application } from '@/core/Application';
type AccordionProps = {
    app: Application;
    label: string;
    scene?: any;
    button?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
    open?: boolean;
    onToggle?: (value: boolean) => void;
    onRefresh?: () => void;
};
export default function Accordion(props: AccordionProps): import("react/jsx-runtime").JSX.Element;
export {};
