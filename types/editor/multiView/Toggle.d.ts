type ToggleProps = {
    name: string;
    icon: string;
    selected: boolean;
    onClick: (selected: boolean) => void;
    height: number;
    top: number;
};
export default function Toggle(props: ToggleProps): import("react/jsx-runtime").JSX.Element;
export {};
