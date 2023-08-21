/* eslint-disable @typescript-eslint/no-explicit-any */
// Libs
import { useState } from 'react'
// Components
import NavButton from './NavButton'
import DraggableItem from './DraggableItem'
import { DraggableProps } from './types'
// Utils
import { usePositionReorder } from '../hooks/usePositionReorder'

export default function Draggable(props: DraggableProps) {
  const [expanded, setExpanded] = useState(false)
  const [listedItems, setListedItems] = useState<string[]>(props.options)
  const [updatedList, updatePosition, updateOrder] = usePositionReorder(listedItems)

  const onDragComplete = () => {
    props.onDragComplete(updatedList)
  }

  const list: Array<any> = []
  {
    updatedList.map((name: string, index: number) =>
      list.push(
        <DraggableItem
          key={name}
          index={index}
          title={name}
          updateOrder={updateOrder}
          updatePosition={updatePosition}
          onDragComplete={onDragComplete}
          onDelete={() => {
            setListedItems(updatedList.splice(index, 1))
            onDragComplete()
          }}
        />,
      ),
    )
  }

  let ddClassName = 'dropdown draggable'
  if (props.subdropdown) ddClassName += ' subdropdown'

  return (
    <div className={ddClassName} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <NavButton title={props.title} />
      <ul style={{ visibility: expanded ? 'visible' : 'hidden' }}>{list}</ul>
    </div>
  )
}
