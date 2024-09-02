import { useMemo, useRef } from 'react';
import { Euler, Matrix3, Vector3 } from 'three';
import InspectNumber from './InspectNumber';

interface InspectGrid3Props {
  value: Vector3 | Matrix3 | Euler;
  step?: number;
  onChange: (evt: any) => void;
}

export default function InspectGrid3(props: InspectGrid3Props) {
  const isVector = props.value['x'] !== undefined && props.value['y'] !== undefined && props.value['z'] !== undefined;
  const isEuler = props.value['isEuler'] !== undefined;
  const isMatrix = props.value['elements'] !== undefined;
  const step = props.step !== undefined ? props.step : 0.01;
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
  } else if (isEuler) {
    const euler = useMemo(() => props.value as Euler, []);
    const onChange = (prop: string, value: number) => {
      euler[prop] = value;
      props.onChange({ target: { value: euler } });
    };

    const params = ['_x', '_y', '_z'];
    params.forEach((param: string) => {
      const labelRef = useRef<HTMLLabelElement>(null);
      children.push(
        <div key={param}>
          <label ref={labelRef}>{param.substring(1).toUpperCase()}</label>
          <InspectNumber
            value={euler[param]}
            type='number'
            prop={param}
            step={step}
            labelRef={labelRef}
            onChange={onChange}
          />
        </div>
      );
    });
  } else if (isMatrix) {
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
            step={step}
            labelRef={labelRef}
            onChange={onChange}
          />
        </div>
      );
    }
  }

  return (
    <div className='grid3' key={Math.random().toString()}>{children}</div>
  );
}
