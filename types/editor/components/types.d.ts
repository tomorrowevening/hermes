export type DropdownType = 'option' | 'dropdown' | 'draggable';
export interface DropdownOption {
    title: string;
    value: any | Array<DropdownOption>;
    type: DropdownType;
    onSelect?: (value: any) => void;
    selectable?: boolean;
    onDragComplete?: (options: string[]) => void;
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
    onDragComplete?: (options: string[]) => void;
}
export interface DraggableItemProps {
    index: number;
    title: string;
    draggingIndex: number | null;
    onDelete: (index: number) => void;
    onDragStart: (value: number) => void;
    onDragOver: (value: number) => void;
    onDragEnd: () => void;
}
export interface DraggableProps {
    title: string;
    options: string[];
    onDragComplete: (options: string[]) => void;
    subdropdown?: boolean;
}
