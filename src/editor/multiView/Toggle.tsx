import { useState } from 'react';

type ToggleProps = {
  name: string;
  icon: string;
  selected: boolean;
  onClick: (selected: boolean) => void;
  height: number;
  width?: number;
  top?: number;
}

export default function Toggle(props: ToggleProps) {
  const [selected, setSelected] = useState(props.selected);
  const className = 'toggle' + (selected ? ' selected' : '');
  return (
    <button
      key={props.name}
      className={className}
      onClick={() => {
        const value = !selected;
        setSelected(value);
        props.onClick(value);
      }}
      style={{
        backgroundImage: `url(${props.icon})`,
        backgroundPositionX: 'center',
        backgroundPositionY: props.top !== undefined ? `${props.top}px` : 'center',
        backgroundSize: `${props.width !== undefined ? `${props.width}px` : '26px'} ${props.height}px`,
      }}
    ></button>
  );
}
