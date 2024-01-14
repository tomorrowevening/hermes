/// <reference types="react" />
type AccordionProps = {
    label: string;
    button?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
    open?: boolean;
    onToggle?: (value: boolean) => void;
};
export default function Accordion(props: AccordionProps): import("react/jsx-runtime").JSX.Element;
export {};
