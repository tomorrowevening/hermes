import { ForwardedRef, forwardRef, useState } from 'react';
import { Camera } from 'three';

interface DropdownProps {
  index: number;
  open: boolean;
  onToggle: (value: boolean) => void;
  onSelect: (value: string) => void;
  options: string[];
  up?: boolean;
}

export const Dropdown = (props: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(props.options[props.index]);

  const handleToggle = () => {
    props.onToggle(!props.open);
  };

  const handleSelect = (option: any) => {
    if (option !== selectedOption) {
      props.onSelect(option);
      setSelectedOption(option);
    }
    props.onToggle(false);
  };

  return (
    <div className={`dropdown ${props.up === true ? 'up' : ''}`}>
      <div className='dropdown-toggle' onClick={handleToggle}>
        {selectedOption}
      </div>
      {props.open && (
        <ul className='dropdown-menu'>
          {props.options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface CameraWindowProps {
  camera: Camera
  onSelect: (value: string) => void;
  options: string[];
}

const CameraWindow = forwardRef(function CameraWindow(props: CameraWindowProps, ref: ForwardedRef<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const index = props.options.indexOf(props.camera.name);
  return (
    <div className='CameraWindow'>
      <div ref={ref} className='clickable' onClick={() => {
        if (open) setOpen(false);
      }} />
      <Dropdown
        index={index}
        open={open}
        options={props.options}
        onSelect={props.onSelect}
        onToggle={(value: boolean) => {
          setOpen(value);
        }}
        up={true}
      />
    </div>
  );
});

export default CameraWindow;
