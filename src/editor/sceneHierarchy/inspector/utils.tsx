import { Color, Euler, Matrix4, Vector3 } from 'three';
// import InspectorField from './InspectorField';
import InspectorGroup from './InspectorGroup';
import { RemoteMaterial, RemoteObject } from "../types";
import RemoteThree from '@/core/remote/RemoteThree';

// Cameras

export function inspectCamera(): any[] {
	const items: any[] = [];
	return items;
}

// Lights

// Materials

export function inspectMaterialItems(material: RemoteMaterial, object: RemoteObject, three: RemoteThree): any[] {
	const items: any[] = [];
	for (const i in material) {
		// @ts-ignore
		const propType = typeof material[i];
		// @ts-ignore
		const value = material[i];
		if (propType === 'boolean' || propType === 'number' || propType === 'string') {
			items.push({
				label: i,
				prop: i,
				type: propType,
				value: value,
				onChange: (prop: string, value: any) => {
					three.updateObject(object.uuid, `material.${prop}`, Number(value));
				},
			});
		} else if (propType === 'object') {
			if (value.isColor) {
				items.push({
					label: i,
					prop: i,
					type: 'color',
					value: value,
					onChange: (prop: string, value: any) => {
						three.updateObject(object.uuid, `material.${prop}`, new Color(value));
					},
				});
			}
		} else if (value !== undefined) {
			// @ts-ignore
			console.log('other:', i, propType, value);
		}
	}
	// items.push({
	// 	label: 'Update Material',
	// 	type: 'button',
	// 	onChange: (prop: string) => {
	// 		console.log('clicked!', prop);
	// 	},
	// });
	return items;
}
// RemoteMaterial | RemoteMaterial[]
export function InspectMaterial(object: RemoteObject, three: RemoteThree): any {
	const material = object.material!;
	if (Array.isArray(material)) {
		const items: any[] = [];
		const total = material.length;
		for (let i = 0; i < total; i++) {
			items.push(
				<InspectorGroup
					title={`Material ${i}`}
					items={inspectMaterialItems(material[i], object, three)}
				/>
			);
		}
		return <>{items}</>;
	} else {
		return (
			<InspectorGroup
				title="Material"
				items={inspectMaterialItems(material, object, three)}
			/>
		);
	}
	return null;
}

// Transforms

export function InspectTransform(obj: RemoteObject, three: RemoteThree) {
	const matrix = new Matrix4();
  matrix.elements = obj.matrix;
  const position = new Vector3();
  const rotation = new Euler();
  const scale = new Vector3();
  if (obj.uuid.length > 0) {
    position.setFromMatrixPosition(matrix);
    rotation.setFromRotationMatrix(matrix);
    scale.setFromMatrixScale(matrix);
  }

	const updateTransform = (prop: string, value: any) => {
		three.updateObject(obj.uuid, prop, value);
	};

	return (
		<InspectorGroup
			title="Transform"
			items={[
				{
					label: 'Position X',
					prop: 'position.x',
					type: 'number',
					value: position.x,
					onChange: updateTransform,
				},
				{
					label: 'Position Y',
					prop: 'position.y',
					type: 'number',
					value: position.y,
					onChange: updateTransform,
				},
				{
					label: 'Position Z',
					prop: 'position.z',
					type: 'number',
					value: position.z,
					onChange: updateTransform,
				},
				{
					label: 'Rotation X',
					prop: 'rotation.x',
					type: 'number',
					value: rotation.x,
					min: -Math.PI,
					max: Math.PI,
					step: 0.01,
					onChange: updateTransform,
				},
				{
					label: 'Rotation Y',
					prop: 'rotation.y',
					type: 'number',
					value: rotation.y,
					min: -Math.PI,
					max: Math.PI,
					step: 0.01,
					onChange: updateTransform,
				},
				{
					label: 'Rotation Z',
					prop: 'rotation.z',
					type: 'number',
					value: rotation.z,
					min: -Math.PI,
					max: Math.PI,
					step: 0.01,
					onChange: updateTransform,
				},
				{
					label: 'Scale X',
					prop: 'scale.x',
					type: 'number',
					value: scale.x,
					step: 0.01,
					onChange: updateTransform,
				},
				{
					label: 'Scale Y',
					prop: 'scale.y',
					type: 'number',
					value: scale.y,
					step: 0.01,
					onChange: updateTransform,
				},
				{
					label: 'Scale Z',
					prop: 'scale.z',
					type: 'number',
					value: scale.z,
					step: 0.01,
					onChange: updateTransform,
				},
			]}
		/>
	);
}
