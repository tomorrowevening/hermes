import { useMemo, useRef } from 'react';
import { Matrix3, Vector3 } from 'three';
import InspectNumber from './InspectNumber';

interface InspectGrid3Props {
  value: Vector3 | Matrix3
  onChange: (evt: any) => void;
}

export default function InspectGrid3(props: InspectGrid3Props) {
  const isVector = props.value['x'] !== undefined;
  const children: any[] = [];

  if (isVector) {
    const vector = useMemo(() => props.value as Vector3, []);
    const onChange = (prop: string, value: number) => {
      vector[prop] = value;
      props.onChange({ target: { value: vector } });
    };

    const params = ['x', 'y', 'z'];
    params.forEach((param: string) => {
      const labelRef = useRef<HTMLLabelElement>(null);
      children.push(
        <div key={param}>
          <label ref={labelRef}>{param.toUpperCase()}</label>
          <InspectNumber
            value={vector.x}
            type='number'
            prop={param}
            step={0.01}
            labelRef={labelRef}
            onChange={onChange}
          />
        </div>
      );
    });
  } else {
    const matrix = useMemo(() => props.value as Matrix3, []);
    const onChange = (prop: string, value: number) => {
      const index = Number(prop);
      matrix.elements[index] = value;
      props.onChange({ target: { value: matrix } });
    };

    for (let i = 0; i < 9; i++) {
      const labelRef = useRef<HTMLLabelElement>(null);
      children.push(
        <div key={i.toString()}>
          <label ref={labelRef}>{i + 1}</label>
          <InspectNumber
            value={matrix.elements[i]}
            type='number'
            prop={i.toString()}
            step={0.01}
            labelRef={labelRef}
            onChange={onChange}
          />
        </div>
      );
    }
  }

  return (
    <div className='grid3'>{children}</div>
  );
}
