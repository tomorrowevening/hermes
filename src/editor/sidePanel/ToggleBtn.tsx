import { useState } from 'react';
import { capitalize } from '@/editor/utils';

type ToggleBtnProps = {
  expanded: boolean
  label: string
  onClick: (expanded: boolean) => void;
}

export default function ToggleBtn(props: ToggleBtnProps) {
  const [expanded, setExpanded] = useState(props.expanded);
  return (
    <button
      className='toggleBtn'
      onClick={() => {
        const value = !expanded;
        props.onClick(value);
        setExpanded(value);
      }}
      style={{
        backgroundPositionY: `${expanded ? 1 : -10}px`
      }}
    >
      <p>{capitalize(props.label)}</p>
    </button>
  );
}