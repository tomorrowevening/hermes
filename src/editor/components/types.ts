export type DropdownType = 'option' | 'dropdown' | 'draggable'

export interface DropdownOption {
  title: string
  value: any | Array<DropdownOption>
  type: DropdownType
  // Option
  onSelect?: (value: any) => void
  selectable?: boolean
  // Draggable
  onDragComplete?: (options: string[]) => void
}

export interface DropdownProps {
  title: string
  options: Array<DropdownOption>
  onSelect?: (value: any) => void
  subdropdown?: boolean
}

export interface DropdownItemProps {
  option: DropdownOption
  onSelect?: (value: any) => void
  // Draggable
  onDragComplete?: (options: string[]) => void
}

// Draggable

export interface DraggableItemProps {
  index: number
  title: string
  draggingIndex: number | null
  onDelete: (index: number) => void
  onDragStart: (value: number) => void
  onDragOver: (value: number) => void
  onDragEnd: () => void
}

export interface DraggableProps {
  title: string
  options: string[]
  onDragComplete: (options: string[]) => void
  subdropdown?: boolean
}
