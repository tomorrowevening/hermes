export type DropdownType = 'option' | 'dropdown' | 'draggable';
export interface DropdownOption {
    title: string;
    value: any | Array<DropdownOption>;
    type: DropdownType;
    onSelect?: (value: any) => void;
    selectable?: boolean;
    onDragComplete?: (options: Array<string>) => void;
}
export interface DropdownProps {
    title: string;
    options: Array<DropdownOption>;
    onSelect?: (value: any) => void;
    subdropdown?: boolean;
}
export interface DropdownItemProps {
    option: DropdownOption;
    onSelect?: (value: any) => void;
    onDragComplete?: (options: Array<string>) => void;
}
export interface DraggableItemProps {
    index: number;
    title: string;
    onDelete: (index: number) => void;
}
export interface DraggableProps {
    title: string;
    options: Array<string>;
    onDragComplete: (options: Array<string>) => void;
    subdropdown?: boolean;
}
