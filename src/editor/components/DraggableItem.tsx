// Libs
import { Reorder } from 'framer-motion'
// Components
import CloseIcon from './icons/CloseIcon'
import DragIcon from './icons/DragIcon'
import { DraggableItemProps } from './types'

export default function DraggableItem(props: DraggableItemProps) {
  return (
    <Reorder.Item key={props.title} value={props.title}>
      <div>
        {DragIcon}
        <span>{props.title}</span>
        <button className="closeIcon" onClick={() => {
          props.onDelete(props.index)
        }}>
          {CloseIcon}
        </button>
      </div>
    </Reorder.Item>
  )
}
