import { RefObject } from 'react';
interface DragProps {
    label: RefObject<HTMLElement>;
    input: RefObject<HTMLInputElement>;
    sliderRef?: RefObject<HTMLInputElement>;
    defaultValue: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
}
export default function DragNumber(props: DragProps): number;
export {};
