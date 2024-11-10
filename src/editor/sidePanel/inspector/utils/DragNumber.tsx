import { RefObject, useEffect, useState } from 'react';

interface DragProps {
  label: RefObject<HTMLLabelElement>
  input: RefObject<HTMLInputElement>
  sliderRef?: RefObject<HTMLInputElement>
  defaultValue: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

export default function DragNumber(props: DragProps) {
  const [fieldValue, setFieldValue] = useState(props.defaultValue);

  useEffect(() => {
    let mouseDown = false;
    let mouseStart = -1;
    let valueStart = 0;
    let value = props.defaultValue;
    let multiplyAmount = false;

    const onKeyEvent = (evt: KeyboardEvent) => {
      multiplyAmount = evt.ctrlKey;
    };

    const onMouseDown = (evt: MouseEvent) => {
      mouseDown = true;
      valueStart = Number(props.input.current?.value);
      mouseStart = evt.clientX;
      document.addEventListener('mouseup', onMouseUp, false);
      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('contextmenu', onMouseUp, false);
    };

    const onMouseMove = (evt: MouseEvent) => {
      if (!mouseDown) return;
      const deltaAmt = props.step !== undefined ? props.step : 1;
      const delta = (evt.clientX - mouseStart) * deltaAmt * (multiplyAmount ? 10 : 1);
      value = Number((valueStart + delta).toFixed(4));
      if (props.min !== undefined) value = Math.max(value, props.min);
      if (props.max !== undefined) value = Math.min(value, props.max);
      if (props.onChange !== undefined) props.onChange(value);
      setFieldValue(value);
    };

    const onMouseUp = () => {
      mouseDown = false;
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('contextmenu', onMouseUp);
    };

    const onChange = (evt: any) => {
      const newValue = Number(evt.target.value);
      setFieldValue(newValue);
    };

    const onSlide = (evt: any) => {
      const newValue = Number(evt.target.value);
      if (props.onChange !== undefined) props.onChange(newValue);
      setFieldValue(newValue);
    };

    props.input.current?.addEventListener('input', onChange);
    props.label.current?.addEventListener('mousedown', onMouseDown, false);
    if (props.sliderRef !== undefined) {
      props.sliderRef.current?.addEventListener('input', onSlide);
    }
    document.addEventListener('keydown', onKeyEvent, false);
    document.addEventListener('keyup', onKeyEvent, false);

    return () => {
      props.input.current?.removeEventListener('input', onChange);
      props.label.current?.removeEventListener('mousedown', onMouseDown);
      if (props.sliderRef !== undefined) {
        props.sliderRef.current?.removeEventListener('input', onSlide);
      }
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('contextmenu', onMouseUp);
      document.removeEventListener('keydown', onKeyEvent);
      document.addEventListener('keyup', onKeyEvent, false);
    };
  }, []);

  return fieldValue;
}