/// <reference types="react" />
type AccordionProps = {
    label: string;
    scene?: any;
    button?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
    open?: boolean;
    onToggle?: (value: boolean) => void;
    canRefresh?: boolean;
};
export default function Accordion(props: AccordionProps): import("react/jsx-runtime").JSX.Element;
export {};
