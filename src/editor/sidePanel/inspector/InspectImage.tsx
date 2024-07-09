import { useEffect, useRef, useState } from 'react';
import { uploadLocalImage } from './utils/InspectMaterial';
import { noImage } from '@/editor/components/content';

type InspectImageProps = {
  title: string
  prop?: string
  value?: any
  onChange?: (prop: string, value: any) => void
}

export default function InspectImage(props: InspectImageProps) {
  // References
  const imgRefRef = useRef<HTMLImageElement>(null);
  const offXRef = useRef<HTMLInputElement>(null);
  const offYRef = useRef<HTMLInputElement>(null);
  const repeatXRef = useRef<HTMLInputElement>(null);
  const repeatYRef = useRef<HTMLInputElement>(null);

  // States
  const [fieldValue] = useState(props.value);
  const [offsetX, setOffsetX] = useState(props.value.offset[0]);
  const [offsetY, setOffsetY] = useState(props.value.offset[1]);
  const [repeatX, setRepeatX] = useState(props.value.repeat[0]);
  const [repeatY, setRepeatY] = useState(props.value.repeat[1]);

  function onChange(src: string, ox: number, oy: number, rx: number, ry: number) {
    if (props.onChange !== undefined) {
      const title = props.prop !== undefined ? props.prop : props.title;
      props.onChange(title, {
        src: src,
        offset: [ox, oy],
        repeat: [rx, ry],
      });
    }
  }

  function changeInput(evt: any) {
    const src = imgRefRef.current!.src;
    const value = evt.target.value;
    switch (evt.target) {
      case offXRef.current:
        setOffsetX(value);
        onChange(src, value, offsetY, repeatX, repeatY);
        break;
      case offYRef.current:
        setOffsetY(value);
        onChange(src, offsetX, value, repeatX, repeatY);
        break;
      case repeatXRef.current:
        setRepeatX(value);
        onChange(src, offsetX, offsetY, value, repeatY);
        break;
      case repeatYRef.current:
        setRepeatY(value);
        onChange(src, offsetX, offsetY, repeatX, value);
        break;
    }
  }

  return (
    <div className='imageField'>
      <img alt={props.title} ref={imgRefRef} onClick={() => {
          uploadLocalImage()
            .then((value: string) => {
              imgRefRef.current!.src = value;
              onChange(value, offsetX, offsetY, repeatX, repeatY);
            });
        }} src={fieldValue.src.length > 0 ? fieldValue.src : noImage} />
      <div className='fields'>
        <div>
          <label>Offset:</label>
          <input
            ref={offXRef}
            type='number'
            value={offsetX}
            step={0.01}
            onChange={changeInput}
          />
          <input
            ref={offYRef}
            type='number'
            value={offsetY}
            step={0.01}
            onChange={changeInput}
          />
        </div>
        <div>
          <label>Repeat:</label>
          <input
            ref={repeatXRef}
            type='number'
            value={repeatX}
            step={0.01}
            onChange={changeInput}
          />
          <input
            ref={repeatYRef}
            type='number'
            value={repeatY}
            step={0.01}
            onChange={changeInput}
          />
        </div>
      </div>
    </div>
  );
}
