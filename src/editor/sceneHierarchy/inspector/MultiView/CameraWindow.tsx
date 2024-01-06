import { ForwardedRef, forwardRef, useState } from 'react';
import './CameraWindow.scss';

interface DropdownProps {
  index: number
  onSelect: (value: string) => void;
  options: string[];
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options[props.index]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: any) => {
    props.onSelect(option);
    setSelectedOption(option);
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
  index: number
  onSelect: (value: string) => void;
  options: string[];
}

const CameraWindow = forwardRef(function CameraWindow(props: CameraWindowProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div className='CameraWindow'>
      <div ref={ref} className='clickable'></div>
      <Dropdown index={props.index} options={props.options} onSelect={props.onSelect} />
    </div>
  );
});

export default CameraWindow;
