// Libs
import { useState } from 'react';
import { Reorder } from 'framer-motion';
// Components
import NavButton from './NavButton';
import DraggableItem from './DraggableItem';
import { DraggableProps } from './types';

export default function Draggable(props: DraggableProps) {
  const [expanded, setExpanded] = useState(false);
  const [list, setList] = useState<string[]>(props.options);

  const updateList = (updated: string[]) => {
    props.onDragComplete(updated);
    setList(updated);
  };

  const onDelete = (index: number) => {
    const newArray = [...list];
    newArray.splice(index, 1);
    updateList(newArray);
  };

  const elements: any[] = [];
  list.forEach((value: string, index: number) => {
    elements.push(<DraggableItem key={value} index={index} title={value} onDelete={onDelete} />);
  });

  let ddClassName = 'dropdown draggable';
  if (props.subdropdown) ddClassName += ' subdropdown';

  return (
    <div className={ddClassName} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <NavButton title={props.title} />
      <Reorder.Group axis='y' values={list} onReorder={updateList} style={{ visibility: expanded ? 'visible' : 'hidden' }}>
        {elements}
      </Reorder.Group>
    </div>
  );
}
