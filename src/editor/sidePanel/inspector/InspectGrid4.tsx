import { useMemo, useRef } from 'react';
import { Matrix4, Vector4 } from 'three';
import InspectNumber from './InspectNumber';

interface InspectGrid4Props {
  value: Vector4 | Matrix4;
  step?: number;
  onChange: (evt: any) => void;
}

export default function InspectGrid4(props: InspectGrid4Props) {
  const isVector = props.value['x'] !== undefined;
  const step = props.step !== undefined ? props.step : 0.01;
  const children: any[] = [];

  if (isVector) {
    const vector = useMemo(() => props.value as Vector4, []);
    const onChange = (prop: string, value: number) => {
      vector[prop] = value;
      props.onChange({ target: { value: vector } });
    };

    const params = ['x', 'y', 'z', 'w'];
    params.forEach((param: string) => {
      const labelRef = useRef<HTMLLabelElement>(null);
      children.push(
        <div key={param}>
          <label ref={labelRef}>{param.toUpperCase()}</label>
          <InspectNumber
            value={vector[param]}
            type='number'
            prop={param}
            step={step}
            labelRef={labelRef}
            onChange={onChange}
          />
        </div>
      );
    });
  } else {
    const matrix = useMemo(() => props.value as Matrix4, []);
    const onChange = (prop: string, value: number) => {
      const index = Number(prop);
      matrix.elements[index] = value;
      props.onChange({ target: { value: matrix } });
    };

    for (let i = 0; i < 16; i++) {
      const labelRef = useRef<HTMLLabelElement>(null);
      children.push(
        <div key={i.toString()}>
          <span ref={labelRef}>{i + 1}</span>
          <InspectNumber
            value={matrix.elements[i]}
            type='number'
            prop={i.toString()}
            step={step}
            labelRef={labelRef}
            onChange={onChange}
          />
        </div>
      );
    }
  }

  return (
    <div className='grid4'>{children}</div>
  );
}
