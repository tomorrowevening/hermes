import { useState } from 'react';
import { Matrix3, Vector3 } from 'three';
// import InspectNumber from './InspectNumber';

interface InspectGrid3Props {
  value: Vector3 | Matrix3
  onChange: (evt: any) => void;
}

export default function InspectGrid3(props: InspectGrid3Props) {
  // States
  const [fieldValue, setFieldValue] = useState(props.value);

  // Events
  const onChangeVector = (evt: any) => {
    const { alt, value } = evt.target;
    const updated = {...fieldValue} as Vector3;
    updated[alt] = Number(value);
    console.log(alt, updated);
    setFieldValue(updated);
    props.onChange({ target: { value: updated } });
  };

  // const onChangeVector = (prop: string, value: number) => {
  //   const updated = {...fieldValue} as Vector3;
  //   updated[prop] = Number(value);
  //   console.log(prop, value, updated);
  //   setFieldValue(updated);
  //   props.onChange({ target: { value: updated } });
  // };

  const onChangeMatrix = (evt: any) => {
    const { alt, value } = evt.target;
    const index = Number(alt);
    const updated = {...fieldValue} as Matrix3;
    updated.elements[index] = Number(value);
    setFieldValue(updated);
  };

  const children: any[] = [];
  if (props.value['elements'] === undefined) {
    const vector = fieldValue as Vector3;
    const params = ['x', 'y', 'z'];
    params.forEach((value: string) => {
      children.push(
        <div key={value}>
          <label>{value.toUpperCase()}</label>
          <input
            alt={value}
            type='number'
            value={vector[value]}
            step={0.01}
            onChange={onChangeVector}
          />
        </div>
      );
      // const labelRef = useRef<HTMLLabelElement>(null);
      // children.push(
      //   <div key={value}>
      //     <label ref={labelRef}>{value.toUpperCase()}</label>
      //     <InspectNumber
      //       alt={value}
      //       value={vector[value]}
      //       prop={value}
      //       step={0.01}
      //       labelRef={labelRef}
      //       type='number'
      //       onChange={onChangeVector}
      //     />
      //   </div>
      // );
    });
  } else {
    const matrix = fieldValue as Matrix3;
    for (let i = 0; i < 9; i++) {
      const name = (i + 1).toString();
      children.push(
        <div key={name}>
          <label>{name}</label>
          <input
            alt={i.toString()}
            type='number'
            value={matrix.elements[i]}
            step={0.01}
            onChange={onChangeMatrix}
          />
        </div>
      );
    }
  }

  return (
    <div className='grid3'>{children}</div>
  );
}
