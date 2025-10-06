import { useEffect, useRef, useState } from 'react';
import { clamp, mix, normalize, round } from '@/utils/math';
import DragNumber from './utils/DragNumber';
import { randomID } from '@/editor/utils';

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
  const xLabelRef = useRef<HTMLLabelElement>(null);
  const yLabelRef = useRef<HTMLLabelElement>(null);
  const minLabelRef = useRef<HTMLLabelElement>(null);
  const maxLabelRef = useRef<HTMLLabelElement>(null);

  // States
  const [x, setX] = useState(props.value.x);
  const [y, setY] = useState(props.value.y);
  const [bounds, setBounds] = useState({
    min: Math.min(props.min, Math.min(props.value.x, props.value.y)),
    max: Math.max(props.max, Math.max(props.value.x, props.value.y)),
  });
  const [mouseDown, setMouseDown] = useState(false);

  // Hooks

  DragNumber({
    label: xLabelRef,
    input: xRef,
    defaultValue: x,
    min: bounds.min,
    max: bounds.max,
    step: 0.01,
    onChange: (newValue: number) => {
      setX(newValue);
      props.onChange({ target: { value: { x: newValue, y } } });
    }
  });

  DragNumber({
    label: yLabelRef,
    input: yRef,
    defaultValue: y,
    min: bounds.min,
    max: bounds.max,
    step: 0.01,
    onChange: (newValue: number) => {
      setY(newValue);
      props.onChange({ target: { value: { x, y: newValue } } });
    }
  });

  DragNumber({
    label: minLabelRef,
    input: minRef,
    defaultValue: bounds.min,
    min: bounds.min - 1,
    max: bounds.max + 1,
    step: 0.01,
    onChange: (newValue: number) => {
      setBounds({ min: newValue, max: bounds.max });
    }
  });

  DragNumber({
    label: maxLabelRef,
    input: maxRef,
    defaultValue: bounds.max,
    min: bounds.min - 1,
    max: bounds.max + 1,
    step: 0.01,
    onChange: (newValue: number) => {
      setBounds({ min: bounds.min, max: newValue });
    }
  });

  // Mouse

  function onMouseDown() {
    if (mouseDown) return;
    window.addEventListener('mousemove', onMouseMove);
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
    const yPercent = 1 - (clamp(0, 99, evt.clientY - containerBounds.top) / 99);

    const xValue = round(mix(bounds.min, bounds.max, xPercent), 3);
    const yValue = round(mix(bounds.min, bounds.max, yPercent), 3);
    props.onChange({ target: { value: { x: xValue, y: yValue } } });
    setX(xValue);
    setY(yValue);
  }

  // Input

  function changeMin() {
    const min = Number(minRef.current!.value);
    setBounds({ min: min, max: bounds.max });

    if (x < min) setX(clamp(min, bounds.max, x));
    if (y < min) setY(clamp(min, bounds.max, y));
  }

  function changeMax() {
    const max = Number(maxRef.current!.value);
    setBounds({ min: bounds.min, max: max });

    if (x > max) setX(clamp(bounds.min, max, x));
    if (y > max) setY(clamp(bounds.min, max, y));
  }

  useEffect(() => {
    pointRef.current!.style.left = `${normalize(bounds.min, bounds.max, x) * 100}%`;
    pointRef.current!.style.top = `${(1 - normalize(bounds.min, bounds.max, y)) * 100}%`;
  }, [bounds, x, y]);

  const step = props.step !== undefined ? props.step : 0.01;

  return (
    <div className='vector2'>
      <div className='fields'>
        <div>
          <span ref={xLabelRef}>X</span>
          <input
            ref={xRef}
            type='number'
            value={x}
            min={bounds.min}
            max={bounds.max}
            step={step}
            name={randomID()}
            onChange={(evt: any) => {
              setX(evt.target.value);
              if (evt.target.value.length === 0) return;
              const value = Number(evt.target.value);
              if (isNaN(value)) return;
              props.onChange({ target: { value: { x: value, y } } });
              if (value < bounds.min) setBounds({ min: value, max: bounds.max });
            }}
          />
        </div>
        <div>
          <span ref={yLabelRef}>Y</span>
          <input
            ref={yRef}
            type='number'
            value={y}
            min={bounds.min}
            max={bounds.max}
            step={step}
            name={randomID()}
            onChange={(evt: any) => {
              setY(evt.target.value);
              if (evt.target.value.length === 0) return;
              const value = Number(evt.target.value);
              if (isNaN(value)) return;
              props.onChange({ target: { value: { x, y: value } } });
              if (value > bounds.max) setBounds({ min: bounds.min, max: value });
            }}
          />
        </div>
        <div>
          <span ref={minLabelRef}>Min</span>
          <input
            ref={minRef}
            type='number'
            value={bounds.min}
            step={step}
            name={randomID()}
            onChange={changeMin}
          />
        </div>
        <div>
          <span ref={maxLabelRef}>Max</span>
          <input
            ref={maxRef}
            type='number'
            value={bounds.max}
            step={step}
            name={randomID()}
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