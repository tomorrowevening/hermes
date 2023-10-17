// Libs
import { useState } from 'react';
// Components
import Draggable from './Draggable';
import Dropdown from './Dropdown';
import type { DropdownItemProps, DropdownOption } from './types';
// Utils
import { randomID } from '../utils';

export default function DropdownItem(props: DropdownItemProps) {
  const { option } = props;
  const [selected, setSelected] = useState('');

  let element = null;
  switch (option.type) {
    case 'draggable':
      element = (
        <Draggable
          title={option.title}
          options={option.value as Array<string>}
          onDragComplete={(options: string[]) => {
            if (option.onDragComplete !== undefined) option.onDragComplete(options);
          }}
          subdropdown={true}
        />
      );
      break;
    case 'dropdown':
      element = (
        <Dropdown
          title={option.title}
          options={option.value as Array<DropdownOption>}
          onSelect={option.onSelect}
          subdropdown={true}
        />
      );
      break;
    case 'option':
      element = (
        <button
          onClick={() => {
            if (option.onSelect !== undefined) option.onSelect(option.value);
            // Toggle selectable
            if (option.selectable) {
              if (selected !== option.title) {
                setSelected(option.title);
              } else {
                setSelected('');
              }
            }
          }}
        >
          {option.title}
        </button>
      );
      break;
  }

  return (
    <li className={selected === option.title ? 'selected' : ''} key={randomID()}>
      {element}
    </li>
  );
}
