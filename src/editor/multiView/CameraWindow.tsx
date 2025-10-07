import { ForwardedRef, forwardRef, useState } from 'react';
import { Camera } from 'three';
import { RenderMode } from './MultiViewData';

interface DropdownProps {
  index: number;
  open: boolean;
  title: string;
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

  const height = props.open ? `${props.options.length * 31 - 1}px` : '0px';

  return (
    <div className={`dropdown ${props.up === true ? 'up' : ''}`}>
      <div className='dropdown-toggle' onClick={handleToggle}>
        {`${props.title}: ${selectedOption}`}
      </div>
      <ul className='dropdown-menu' style={{ height: height }}>
        {props.options.map((option) => (
          <li key={option} onClick={() => handleSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface CameraWindowProps {
  name: string;
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
    <div className={`CameraWindow ${props.name}`}>
      <div ref={ref} className='clickable' onClick={() => {
        if (open) setOpen(false);
      }} />

      <div className='options'>
        {props.camera !== null && (
          <Dropdown
            title='Camera'
            index={props.options.indexOf(props.camera.name)}
            open={open}
            options={props.options}
            onSelect={props.onSelectCamera}
            onToggle={(value: boolean) => {
              if (value && renderModeOpen) setRenderModeOpen(false);
              setOpen(value);
            }}
            up={true}
          />
        )}
        <Dropdown
          title='Mode'
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
            if (value && open) setOpen(false);
            if (modeOpen) setModeOpen(false);
            setRenderModeOpen(value);
          }}
          up={true}
        />
      </div>
    </div>
  );
});

export default CameraWindow;
