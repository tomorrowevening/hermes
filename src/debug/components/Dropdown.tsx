/* eslint-disable @typescript-eslint/no-explicit-any */
// Libs
import { useState } from 'react'
// Views
import NavButton from './NavButton'
import DropdownItem from './DropdownItem'
import { DropdownOption, DropdownProps } from './types'

export default function Dropdown(props: DropdownProps) {
  const [expanded, setExpanded] = useState(false)

  const list: Array<any> = []
  {
    props.options.map((option: DropdownOption, index: number) => {
      if (props.onSelect !== undefined) {
        option.onSelect = props.onSelect
      }
      list.push(<DropdownItem option={option} key={index} />)
    })
  }

  let ddClassName = 'dropdown'
  if (props.subdropdown) ddClassName += ' subdropdown'

  return (
    <div className={ddClassName} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <NavButton title={props.title} />
      <ul style={{ visibility: expanded ? 'visible' : 'hidden' }}>{list}</ul>
    </div>
  )
}
