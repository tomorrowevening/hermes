import CloseIcon from './icons/CloseIcon';
import DragIcon from './icons/DragIcon';
import { DraggableItemProps } from './types';

export default function DraggableItem(props: DraggableItemProps) {
  return (
    <li
      className={`reorder-item ${props.draggingIndex === props.index ? 'dragging' : ''}`}
      draggable
      onDragStart={() => props.onDragStart(props.index)}
      onDragOver={(e) => {
        e.preventDefault();
        props.onDragOver(props.index);
      }}
      onDragEnd={props.onDragEnd}
    >
      <div>
        {DragIcon}
        <span>{props.title}</span>
        <button className='closeIcon' onClick={() => props.onDelete(props.index)}>
          {CloseIcon}
        </button>
      </div>
    </li>
  );
}
