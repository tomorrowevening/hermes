// Libs
import { motion } from 'framer-motion'
import { useState } from 'react'
// Components
import CloseIcon from './icons/CloseIcon'
import DragIcon from './icons/DragIcon'
import { DraggableItemProps } from './types'
// Utils
import useMeasurePosition from '../hooks/useMeasurePosition'

export default function DraggableItem(props: DraggableItemProps) {
  const [dragging, setDragging] = useState(false)
  const itemRef = useMeasurePosition((pos) => props.updatePosition(props.index, pos))

  return (
    <li>
      <motion.div
        style={{
          zIndex: dragging ? 2 : 1,
        }}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={1}
        layout
        ref={itemRef}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false)
          props.onDragComplete()
        }}
        animate={{
          scale: dragging ? 1.05 : 1,
        }}
        // onViewportBoxUpdate={(_, delta) => {
        //   dragging && props.updateOrder(props.index, delta.y.translate)
        // }}
        drag="y"
      >
        {DragIcon}
        <span>{props.title}</span>
        <button className="closeIcon" onClick={props.onDelete}>
          {CloseIcon}
        </button>
      </motion.div>
    </li>
  )
}
