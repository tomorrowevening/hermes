import { useState } from 'react';

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
      <p>{props.label}</p>
    </button>
  );
}