import { useEffect, useRef, useState } from 'react';
import { clamp, mix, normalize, round } from '@/utils/math';

interface InspectVector2Props {
  min: number
  max: number
  value: any
  step?: number
  onChange: (evt: any) => void;
}

export default function InspectVector2(props: InspectVector2Props) {
  // Refs
  const xRef = useRef<HTMLInputElement>(null);
  const yRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);

  // States
  const [value, setValue] = useState(props.value);
  const [bounds, setBounds] = useState({
    min: Math.min(props.min, Math.min(props.value.x, props.value.y)),
    max: Math.max(props.max, Math.max(props.value.x, props.value.y)),
  });
  const [mouseDown, setMouseDown] = useState(false);

  function onMouseDown() {
    if (mouseDown) return;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseup', onMouseUp);
    setMouseDown(true);
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    setMouseDown(false);
  }

  function onMouseMove(evt: MouseEvent) {
    const containerBounds = containerRef.current!.getBoundingClientRect();
    const xPercent = clamp(0, 99, evt.clientX - containerBounds.left) / 99;
    const yPercent = clamp(0, 99, evt.clientY - containerBounds.top) / 99;

    const x = round(mix(bounds.min, bounds.max, xPercent), 3);
    const y = round(mix(bounds.min, bounds.max, yPercent), 3);
    props.onChange({ target: { value: { x, y } } });
    setValue({ x, y });
  }

  function changeInput(evt: any) {
    let x = value.x;
    let y = value.y;
    if (evt.target === xRef.current) {
      x = Number(evt.target.value);
    } else {
      y = Number(evt.target.value);
    }
    setValue({ x, y });
  }

  function changeMin() {
    const min = Number(minRef.current!.value);
    setBounds({ min: min, max: bounds.max });
    if (value.x < min || value.y < min) {
      setValue({ x: clamp(min, bounds.max, value.x), y: clamp(min, bounds.max, value.y) });
    }
  }

  function changeMax() {
    const max = Number(maxRef.current!.value);
    setBounds({ min: bounds.min, max: max });
    if (value.x > max || value.y > max) {
      setValue({ x: clamp(bounds.min, max, value.x), y: clamp(bounds.min, max, value.y) });
    }
  }

  useEffect(() => {
    const x = normalize(bounds.min, bounds.max, value.x);
    const y = normalize(bounds.min, bounds.max, value.y);
    pointRef.current!.style.left = `${x * 100}%`;
    pointRef.current!.style.top = `${y * 100}%`;
  }, [bounds, value]);

  const step = props.step !== undefined ? props.step : 0.01;

  return (
    <div className='vector2'>
      <div className='fields'>
        <div>
          <label>X:</label>
          <input
            ref={xRef}
            type='number'
            value={value.x}
            min={bounds.min}
            max={bounds.max}
            step={step}
            onChange={changeInput}
          />
        </div>
        <div>
          <label>Y:</label>
          <input
            ref={yRef}
            type='number'
            value={value.y}
            min={bounds.min}
            max={bounds.max}
            step={step}
            onChange={changeInput}
          />
        </div>
        <div>
          <label>Min:</label>
          <input
            ref={minRef}
            type='number'
            value={bounds.min}
            step={step}
            onChange={changeMin}
          />
        </div>
        <div>
          <label>Max:</label>
          <input
            ref={maxRef}
            type='number'
            value={bounds.max}
            step={step}
            onChange={changeMax}
          />
        </div>
      </div>
      <div className='input' ref={containerRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <div className='x' />
        <div className='y' />
        <div className='pt' ref={pointRef}></div>
      </div>
    </div>
  );
}