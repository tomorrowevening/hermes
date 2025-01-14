// Libs
import { useState } from 'react';
// Components
import NavButton from './NavButton';
import DraggableItem from './DraggableItem';
import { DraggableProps } from './types';

export default function Draggable(props: DraggableProps) {
  const [expanded, setExpanded] = useState(false);
  const [list, setList] = useState<string[]>(props.options);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const updateList = (updated: string[]) => {
    props.onDragComplete(updated);
    setList(updated);
  };

  const onDelete = (index: number) => {
    const newArray = [...list];
    newArray.splice(index, 1);
    updateList(newArray);
  };

  const onDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const onDragOver = (index: number) => {
    if (draggingIndex === index || draggingIndex === null) return;

    const updatedItems = [...list];
    const draggedItem = updatedItems.splice(draggingIndex, 1)[0];
    updatedItems.splice(index, 0, draggedItem);

    setDraggingIndex(index);
    setList(updatedItems);
  };

  const onDragEnd = () => {
    props.onDragComplete(list);
    setDraggingIndex(null);
  };

  let ddClassName = 'dropdown draggable';
  if (props.subdropdown) ddClassName += ' subdropdown';

  return (
    <div className={ddClassName} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <NavButton title={props.title} />
      <ul className='reorder-list' style={{ display: expanded ? 'block' : 'none' }}>
        {list.map((item: string, index: number) => (
          <DraggableItem
            key={item}
            title={item}
            index={index}
            draggingIndex={draggingIndex}
            onDelete={onDelete}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </div>
  );
}
