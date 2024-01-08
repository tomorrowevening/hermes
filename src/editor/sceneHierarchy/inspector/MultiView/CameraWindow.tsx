import { ForwardedRef, forwardRef, useState } from 'react';
import { Camera } from 'three';

interface DropdownProps {
  index: number
  onSelect: (value: string) => void;
  options: string[];
}

export const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options[props.index]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: any) => {
    if (option !== selectedOption) {
      props.onSelect(option);
      setSelectedOption(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={handleToggle}>
        {selectedOption}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
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
  const index = props.options.indexOf(props.camera.name);
  return (
    <div className='CameraWindow'>
      <div ref={ref} className='clickable'></div>
      <Dropdown index={index} options={props.options} onSelect={props.onSelect} />
    </div>
  );
});

export default CameraWindow;
