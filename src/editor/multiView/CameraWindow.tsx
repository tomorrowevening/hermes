import { ForwardedRef, forwardRef, useState } from 'react';
import { Camera } from 'three';
import { RenderMode } from './MultiViewData';

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
  onSelectCamera: (value: string) => void;
  onSelectRenderMode: (value: RenderMode) => void;
  options: string[];
}

const CameraWindow = forwardRef(function CameraWindow(props: CameraWindowProps, ref: ForwardedRef<HTMLDivElement>) {
  const renderOptions: RenderMode[] = [
    'Renderer',
    'Depth',
    'Normals',
    'UVs',
    'Wireframe',
  ];

  // States
  const [currentRenderMode, setCurrentRenderMode] = useState<RenderMode>('Renderer');
  const [modeOpen, setModeOpen] = useState(false);
  const [renderModeOpen, setRenderModeOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className='CameraWindow'>
      <div ref={ref} className='clickable' onClick={() => {
        if (open) setOpen(false);
      }} />
      <Dropdown
        index={renderOptions.indexOf(currentRenderMode)}
        open={renderModeOpen}
        options={renderOptions}
        onSelect={(value: string) => {
          if (value === currentRenderMode) return;
          const newRenderMode = value as RenderMode;
          props.onSelectRenderMode(newRenderMode);
          setCurrentRenderMode(newRenderMode);
        }}
        onToggle={(value: boolean) => {
          if (modeOpen) setModeOpen(false);
          setRenderModeOpen(value);
        }}
        up={true}
      />
      <Dropdown
        index={props.options.indexOf(props.camera.name)}
        open={open}
        options={props.options}
        onSelect={props.onSelectCamera}
        onToggle={(value: boolean) => {
          setOpen(value);
        }}
        up={true}
      />
    </div>
  );
});

export default CameraWindow;
